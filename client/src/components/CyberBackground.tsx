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

// ─── Configuration ───────────────────────────────────────────────────────────
const DESKTOP_CONFIG = {
  particleCount: 40,
  nodeCount: 18,
  particleConnectionDist: 100,
  nodeConnectionDist: 180,
  mouseInfluenceRadius: 180,
  particleSpeed: 0.12,
  nodeSpeed: 0.25,
};

const MOBILE_CONFIG = {
  particleCount: 15,
  nodeCount: 8,
  particleConnectionDist: 70,
  nodeConnectionDist: 120,
  mouseInfluenceRadius: 120,
  particleSpeed: 0.08,
  nodeSpeed: 0.15,
};

const COLORS = {
  primary: "0, 229, 255",
  secondary: "56, 189, 248",
  accent: "0, 255, 156",
};

// ─── Noise Texture Overlay ───────────────────────────────────────────────────
function NoiseTexture() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay" as const,
        opacity: 0.4,
      }}
      aria-hidden="true"
    />
  );
}

// ─── Depth Layers (GPU-friendly gradients) ───────────────────────────────────
function DepthLayers() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Top-right deep gradient */}
      <div
        className="absolute top-[-25%] right-[-15%] rounded-full"
        style={{
          width: "65vw",
          height: "65vw",
          background: "radial-gradient(ellipse_at_center, #16212E 0%, transparent 60%)",
          opacity: 0.3,
          willChange: "transform, opacity",
        }}
      />
      {/* Bottom-left aurora glow */}
      <div
        className="absolute bottom-[-30%] left-[-15%] rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(ellipse_at_center, #00E5FF 0%, transparent 60%)",
          opacity: 0.03,
          animation: "aurora-pulse 14s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      {/* Ambient stars */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMC41IiBmaWxsPSIjRjVGOUZGIiBvcGFjaXR5PSIwLjIiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNTAiIHI9IjAuNSIgZmlsbD0iI0Y1RjlGRiIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')`,
          opacity: 0.4,
        }}
      />
      <style>{`
        @keyframes aurora-pulse {
          0%, 100% { opacity: 0.03; transform: scale(1); }
          50% { opacity: 0.06; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

// ─── Earth & Network Geometry ────────────────────────────────────────────────
function EarthNetwork() {
  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        zIndex: 0,
        top: "50%",
        right: "-5%",
        transform: "translateY(-50%)",
        width: "680px",
        height: "680px",
        animation: "float-element 24s ease-in-out infinite",
        willChange: "transform",
      }}
    >
      {/* Ambient Glow Core */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "#00E5FF", opacity: 0.04, filter: "blur(80px)" }}
      />

      {/* Earth Vector */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative overflow-hidden"
          style={{
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            border: "1px solid rgba(42,59,79,0.6)",
            boxShadow: "0 0 30px rgba(0,229,255,0.05)",
            background: "rgba(10,12,13,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Optical Precision Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(transparent 49.8%, rgba(42,59,79,0.3) 50%, transparent 50.2%), linear-gradient(90deg, transparent 49.8%, rgba(42,59,79,0.3) 50%, transparent 50.2%)",
              backgroundSize: "34px 34px",
            }}
          />

          {/* Geometric Neural Framework */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340">
            <path d="M102,102 L238,102 L272,170 L238,238 L102,238 L68,170 Z" fill="none" stroke="rgba(0,229,255,0.15)" strokeWidth="0.5" />
            <path d="M102,102 L238,238 M238,102 L102,238 M68,170 L272,170 M170,34 L170,306" fill="none" stroke="rgba(0,229,255,0.1)" strokeWidth="0.5" />
            <circle cx="170" cy="170" r="2.5" fill="#00E5FF" style={{ opacity: 0.9 }} />
            <circle cx="102" cy="102" r="1.5" fill="#00E5FF" style={{ opacity: 0.5 }} />
            <circle cx="238" cy="102" r="2" fill="#00D9A6" style={{ opacity: 0.8 }} />
            <circle cx="272" cy="170" r="1.5" fill="#00E5FF" style={{ opacity: 0.6 }} />
            <circle cx="238" cy="238" r="1.5" fill="#00E5FF" style={{ opacity: 0.5 }} />
            <circle cx="102" cy="238" r="2" fill="#00FF9C" style={{ opacity: 0.7 }} />
            <circle cx="68" cy="170" r="1.5" fill="#00E5FF" style={{ opacity: 0.5 }} />
          </svg>

          {/* Scanner Line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              width: "1px",
              background: "rgba(0,229,255,0.4)",
              boxShadow: "0 0 8px #00E5FF",
              animation: "scanner-sweep 10s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              willChange: "transform, opacity",
            }}
          />
        </div>
      </div>

      {/* Orbit Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full"
          style={{
            width: "520px",
            height: "520px",
            border: "1px solid rgba(42,59,79,0.4)",
            animation: "orbit-spin 90s linear infinite",
            willChange: "transform",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "740px",
            height: "740px",
            border: "1px solid rgba(0,229,255,0.06)",
            animation: "orbit-spin-reverse 120s linear infinite",
            willChange: "transform",
          }}
        />
      </div>

      <style>{`
        @keyframes float-element {
          0%, 100% { transform: translateY(-50%) translateZ(0); }
          50% { transform: translateY(calc(-50% - 4px)) translateZ(0); }
        }
        @keyframes scanner-sweep {
          0% { transform: translateX(-20px); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translateX(360px); opacity: 0; }
        }
        @keyframes orbit-spin {
          0% { transform: rotateX(74deg) rotateZ(0deg) translateZ(0); }
          100% { transform: rotateX(74deg) rotateZ(360deg) translateZ(0); }
        }
        @keyframes orbit-spin-reverse {
          0% { transform: rotateX(74deg) rotateZ(360deg) translateZ(0); }
          100% { transform: rotateX(74deg) rotateZ(0deg) translateZ(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Canvas Particle Field ───────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
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

    nodesRef.current = Array.from({ length: config.nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * config.nodeSpeed,
      vy: (Math.random() - 0.5) * config.nodeSpeed,
      radius: Math.random() * 3 + 1.5,
      connections: 0,
    }));

    const animate = (timestamp: number) => {
      const dt = Math.min((timestamp - prevTimestamp.current) / 16.67, 3);
      prevTimestamp.current = timestamp;

      if (!ctx || !canvas) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;

      ctx.clearRect(0, 0, cw, ch);

      const scrollY = window.scrollY;
      const parallaxX = (mouseRef.current.x - cw / 2) * 0.015;
      const parallaxY = (mouseRef.current.y - ch / 2) * 0.015;

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        if (!reducedMotion.current) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.mouseInfluenceRadius && dist > 0) {
            const force = (1 - dist / config.mouseInfluenceRadius) * 0.2;
            p.x -= (dx / dist) * force * dt;
            p.y -= (dy / dist) * force * dt;
          }
        }

        const lifeRatio = p.life / p.maxLife;
        let alpha = p.opacity;
        if (lifeRatio < 0.1) alpha *= lifeRatio / 0.1;
        else if (lifeRatio > 0.8) alpha *= (1 - lifeRatio) / 0.2;

        if (p.x < -10) p.x = cw + 10;
        if (p.x > cw + 10) p.x = -10;
        if (p.y < -10) p.y = ch + 10;
        if (p.y > ch + 10) p.y = -10;

        if (p.life > p.maxLife) {
          p.x = Math.random() * cw;
          p.y = Math.random() * ch;
          p.life = 0;
          p.maxLife = Math.random() * 600 + 300;
          p.opacity = Math.random() * 0.4 + 0.1;
        }

        ctx.beginPath();
        ctx.arc(p.x + parallaxX, p.y + parallaxY - scrollY * 0.008, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS.primary}, ${alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.particleConnectionDist) {
            const opacity = (1 - dist / config.particleConnectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x + parallaxX, a.y + parallaxY - scrollY * 0.008);
            ctx.lineTo(b.x + parallaxX, b.y + parallaxY - scrollY * 0.008);
            ctx.strokeStyle = `rgba(${COLORS.primary}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        if (n.x < -20) n.x = cw + 20;
        if (n.x > cw + 20) n.x = -20;
        if (n.y < -20) n.y = ch + 20;
        if (n.y > ch + 20) n.y = -20;

        if (n.x < 0 || n.x > cw) n.vx *= -1;
        if (n.y < 0 || n.y > ch) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.nodeConnectionDist) {
            const opacity = (1 - dist / config.nodeConnectionDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(n.x + parallaxX, n.y + parallaxY - scrollY * 0.008);
            ctx.lineTo(m.x + parallaxX, m.y + parallaxY - scrollY * 0.008);
            ctx.strokeStyle = `rgba(${COLORS.secondary}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const nx = n.x + parallaxX;
        const ny = n.y + parallaxY - scrollY * 0.008;
        ctx.beginPath();
        ctx.arc(nx, ny, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS.secondary}, 0.3)`;
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
      style={{ zIndex: 0, opacity: 0.5 }}
      aria-hidden="true"
    />
  );
}

// ─── Combined Background ────────────────────────────────────────────────────
export function CyberBackground() {
  return (
    <>
      <DepthLayers />
      <ParticleField />
      <EarthNetwork />
      <NoiseTexture />
    </>
  );
}
