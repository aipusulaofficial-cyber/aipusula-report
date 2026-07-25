import { useEffect, useRef, useCallback, useMemo } from "react";
import { useIsMobile } from "@/hooks/useMobile";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number;
}

interface AuroraLayer {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  hue: number;
  speed: number;
  phase: number;
}

// ─── Configuration ───────────────────────────────────────────────────────────
const DESKTOP_CONFIG = {
  particleCount: 60,
  nodeCount: 25,
  particleConnectionDist: 120,
  nodeConnectionDist: 200,
  mouseInfluenceRadius: 200,
  particleSpeed: 0.15,
  nodeSpeed: 0.3,
};

const MOBILE_CONFIG = {
  particleCount: 20,
  nodeCount: 10,
  particleConnectionDist: 80,
  nodeConnectionDist: 150,
  mouseInfluenceRadius: 150,
  particleSpeed: 0.1,
  nodeSpeed: 0.2,
};

const COLORS = {
  primary: "0, 229, 160",
  secondary: "56, 189, 248",
  accent: "167, 139, 250",
};

// ─── Canvas Background Component ─────────────────────────────────────────────
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<Node[]>([]);
  const prevTimestamp = useRef(0);
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const w = window.innerWidth;
    const h = window.innerHeight;
    particlesRef.current = Array.from({ length: config.particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * config.particleSpeed,
      vy: (Math.random() - 0.5) * config.particleSpeed,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      life: 0,
      maxLife: Math.random() * 600 + 300,
    }));

    // Initialize nodes
    nodesRef.current = Array.from({ length: config.nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * config.nodeSpeed,
      vy: (Math.random() - 0.5) * config.nodeSpeed,
      radius: Math.random() * 3 + 1.5,
      connections: 0,
    }));

    const animate = (timestamp: number) => {
      const dt = Math.min((timestamp - prevTimestamp.current) / 16.67, 3); // Normalize to ~60fps
      prevTimestamp.current = timestamp;

      if (!ctx || !canvas) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;

      ctx.clearRect(0, 0, cw, ch);

      const scrollY = window.scrollY;
      const parallaxX = (mouseRef.current.x - cw / 2) * 0.02;
      const parallaxY = (mouseRef.current.y - ch / 2) * 0.02;

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        // Mouse influence
        if (!reducedMotion.current) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.mouseInfluenceRadius && dist > 0) {
            const force = (1 - dist / config.mouseInfluenceRadius) * 0.3;
            p.x -= (dx / dist) * force * dt;
            p.y -= (dy / dist) * force * dt;
          }
        }

        // Fade in/out
        const lifeRatio = p.life / p.maxLife;
        let alpha = p.opacity;
        if (lifeRatio < 0.1) alpha *= lifeRatio / 0.1;
        else if (lifeRatio > 0.8) alpha *= (1 - lifeRatio) / 0.2;

        // Wrap around
        if (p.x < -10) p.x = cw + 10;
        if (p.x > cw + 10) p.x = -10;
        if (p.y < -10) p.y = ch + 10;
        if (p.y > ch + 10) p.y = -10;

        // Reset if life expired
        if (p.life > p.maxLife) {
          p.x = Math.random() * cw;
          p.y = Math.random() * ch;
          p.life = 0;
          p.maxLife = Math.random() * 600 + 300;
          p.opacity = Math.random() * 0.4 + 0.1;
        }

        ctx.beginPath();
        ctx.arc(p.x + parallaxX, p.y + parallaxY - scrollY * 0.01, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS.primary}, ${alpha})`;
        ctx.fill();
      }

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.particleConnectionDist) {
            const opacity = (1 - dist / config.particleConnectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x + parallaxX, a.y + parallaxY - scrollY * 0.01);
            ctx.lineTo(b.x + parallaxX, b.y + parallaxY - scrollY * 0.01);
            ctx.strokeStyle = `rgba(${COLORS.primary}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes (neural network)
      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        // Wrap
        if (n.x < -20) n.x = cw + 20;
        if (n.x > cw + 20) n.x = -20;
        if (n.y < -20) n.y = ch + 20;
        if (n.y > ch + 20) n.y = -20;

        // Bounce off edges softly
        if (n.x < 0 || n.x > cw) n.vx *= -1;
        if (n.y < 0 || n.y > ch) n.vy *= -1;

        // Draw connections to other nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.nodeConnectionDist) {
            const opacity = (1 - dist / config.nodeConnectionDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(n.x + parallaxX, n.y + parallaxY - scrollY * 0.01);
            ctx.lineTo(m.x + parallaxX, m.y + parallaxY - scrollY * 0.01);
            ctx.strokeStyle = `rgba(${COLORS.secondary}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node
        const nx = n.x + parallaxX;
        const ny = n.y + parallaxY - scrollY * 0.01;
        ctx.beginPath();
        ctx.arc(nx, ny, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS.secondary}, 0.4)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, n.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS.secondary}, 0.1)`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [config]);

  useEffect(() => {
    const cleanup = init();
    return () => cleanup?.();
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}

// ─── Aurora Effect ───────────────────────────────────────────────────────────
export function AuroraEffect() {
  const isMobile = useIsMobile();
  if (isMobile) return null; // Skip aurora on mobile for performance

  const layers = useMemo<AuroraLayer[]>(() => [
    { id: 1, x: 10, y: 20, width: 60, height: 40, hue: 160, speed: 0.008, phase: 0 },
    { id: 2, x: 30, y: 10, width: 50, height: 35, hue: 200, speed: 0.006, phase: 1.5 },
    { id: 3, x: 60, y: 30, width: 55, height: 45, hue: 270, speed: 0.01, phase: 3 },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {layers.map((layer) => (
        <div
          key={layer.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${layer.x}%`,
            top: `${layer.y}%`,
            width: `${layer.width}%`,
            height: `${layer.height}%`,
            background: `radial-gradient(ellipse, hsla(${layer.hue}, 80%, 50%, 0.04), transparent 70%)`,
            animation: `aurora${layer.id} 20s ease-in-out infinite alternate`,
            animationDelay: `${layer.phase}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes aurora1 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: translate(5%, -3%) scale(1.1) rotate(2deg); opacity: 0.8; }
          100% { transform: translate(-3%, 2%) scale(0.95) rotate(-1deg); opacity: 0.5; }
        }
        @keyframes aurora2 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.5; }
          50% { transform: translate(-4%, 4%) scale(1.05) rotate(-2deg); opacity: 0.7; }
          100% { transform: translate(3%, -2%) scale(0.9) rotate(1deg); opacity: 0.4; }
        }
        @keyframes aurora3 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: translate(3%, 3%) scale(1.08) rotate(1deg); opacity: 0.6; }
          100% { transform: translate(-2%, -4%) scale(0.92) rotate(-2deg); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

// ─── Radar Scan Rings ────────────────────────────────────────────────────────
export function RadarRings() {
  const isMobile = useIsMobile();
  const ringCount = isMobile ? 1 : 3;
  const sizes = [300, 500, 700];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: sizes[i] || 400,
            height: sizes[i] || 400,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(0, 229, 160, 0.04)",
            animation: `radarPulse${i} ${3 + i * 2}s ease-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes radarPulse0 {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          30% { opacity: 0.6; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes radarPulse1 {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
          40% { opacity: 0.4; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes radarPulse2 {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
          50% { opacity: 0.3; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
      `}</style>
    </div>
  );
}

// ─── Binary Data Stream ──────────────────────────────────────────────────────
export function BinaryStreams() {
  const isMobile = useIsMobile();
  if (isMobile) return null; // Skip on mobile

  const streams = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${Math.random() * 100}%`,
      speed: 15 + Math.random() * 25,
      delay: Math.random() * 10,
      content: ["01001", "11010", "A3F8C", "0xDEAD", "0xBEEF", "SYS", "NET", "DATA"][Math.floor(Math.random() * 8)],
    })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {streams.map((s) => (
        <div
          key={s.id}
          className="absolute mono text-xs"
          style={{
            left: s.left,
            top: s.top,
            color: `rgba(0, 229, 160, 0.06)`,
            animation: `binaryFall${s.id} ${s.speed}s linear infinite`,
            animationDelay: `${s.delay}s`,
            writingMode: "vertical-rl",
            letterSpacing: "0.5em",
            fontSize: "10px",
            userSelect: "none",
          }}
        >
          {s.content.repeat(20)}
        </div>
      ))}
      <style>{`
        ${streams.map((s) => `
          @keyframes binaryFall${s.id} {
            0% { transform: translateY(-100%); opacity: 0; }
            5% { opacity: 0.6; }
            95% { opacity: 0.6; }
            100% { transform: translateY(${window.innerHeight + 100}px); opacity: 0; }
          }
        `).join("")}
      `}</style>
    </div>
  );
}

// ─── Combined Background ────────────────────────────────────────────────────
export function CyberBackground() {
  return (
    <>
      <ParticleField />
      <AuroraEffect />
      <RadarRings />
      <BinaryStreams />
    </>
  );
}
