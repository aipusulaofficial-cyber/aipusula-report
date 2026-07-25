import { useState, useEffect } from "react";

// AIPUSULA DNA: ENTERPRISE PERFORMANCE ENGINE
// Hardware-accelerated, calm, and mathematically precise animations
// Matches reference HTML/CSS background architecture exactly.

// ─── Noise Texture Overlay ───────────────────────────────────────────────────
// Optimized Noise Texture - Combined into a single highly-efficient pseudo-element
function NoiseTexture() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay" as const,
      }}
      aria-hidden="true"
    />
  );
}

// ─── Depth Layers (GPU-friendly gradients) ───────────────────────────────────
// Depth Layers (Simplified DOM, GPU-friendly gradients)
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
        className="absolute bottom-[-30%] left-[-15%] rounded-full aurora-glow"
        style={{
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(ellipse_at_center, #00E5FF 0%, transparent 60%)",
          opacity: 0.03,
          willChange: "transform, opacity",
        }}
      />

      {/* Ambient Stars (Reduced density for less noise) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMC41IiBmaWxsPSIjRjVGOUZGIiBvcGFjaXR5PSIwLjIiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNTAiIHI9IjAuNSIgZmlsbD0iI0Y1RjlGRiIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')`,
          opacity: 0.4,
        }}
      />
    </div>
  );
}

// ─── Earth & Network Geometry ────────────────────────────────────────────────
function EarthNetwork() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  return (
    <div
      className="fixed pointer-events-none float-element"
      style={{
        zIndex: 0,
        top: "45%",
        right: "-8%",
        transform: "translateY(-50%)",
        width: "500px",
        height: "500px",
        willChange: "transform",
      }}
    >
      {/* Ambient Glow Core */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "#00E5FF", opacity: 0.04, filter: "blur(60px)" }}
      />

      {/* Earth Vector (Engineered, strictly geometric network) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative overflow-hidden"
          style={{
            width: "250px",
            height: "250px",
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
              backgroundImage:
                "linear-gradient(transparent 49.8%, rgba(42,59,79,0.3) 50%, transparent 50.2%), linear-gradient(90deg, transparent 49.8%, rgba(42,59,79,0.3) 50%, transparent 50.2%)",
              backgroundSize: "25px 25px",
            }}
          />

          {/* Geometric Neural Framework */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 250 250">
            {/* Precise, engineered paths (no chaotic webs) */}
            <path
              d="M75,75 L175,75 L200,125 L175,175 L75,175 L50,125 Z"
              fill="none"
              stroke="rgba(0,229,255,0.15)"
              strokeWidth="0.5"
            />
            <path
              d="M75,75 L175,175 M175,75 L75,175 M50,125 L200,125 M125,25 L125,225"
              fill="none"
              stroke="rgba(0,229,255,0.1)"
              strokeWidth="0.5"
            />

            {/* Strategic Data Nodes */}
            <circle cx="125" cy="125" r="2.5" fill="#00E5FF" style={{ opacity: 0.9 }} />
            <circle cx="75" cy="75" r="1.5" fill="#00E5FF" style={{ opacity: 0.5 }} />
            <circle cx="175" cy="75" r="2" fill="#00D9A6" style={{ opacity: 0.8 }} />
            <circle cx="200" cy="125" r="1.5" fill="#00E5FF" style={{ opacity: 0.6 }} />
            <circle cx="175" cy="175" r="1.5" fill="#00E5FF" style={{ opacity: 0.5 }} />
            <circle cx="75" cy="175" r="2" fill="#00FF9C" style={{ opacity: 0.7 }} />
            <circle cx="50" cy="125" r="1.5" fill="#00E5FF" style={{ opacity: 0.5 }} />
          </svg>

          {/* GPU-Optimized Scanner */}
          <div
            className="absolute top-0 bottom-0 scanner-line"
            style={{
              width: "1px",
              background: "rgba(0,229,255,0.4)",
              boxShadow: "0 0 8px #00E5FF",
              willChange: "transform, opacity",
            }}
          />
        </div>
      </div>

      {/* Essential Orbit System (Reduced to absolute minimum for elegance) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Inner precise ring */}
        <div
          className="rounded-full orbit-ring"
          style={{
            width: "380px",
            height: "380px",
            border: "1px solid rgba(42,59,79,0.4)",
            willChange: "transform",
          }}
        />
        {/* Outer faint ring */}
        <div
          className="absolute rounded-full orbit-ring-reverse"
          style={{
            width: "540px",
            height: "540px",
            border: "1px solid rgba(0,229,255,0.06)",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}

// ─── Global Styles (Keyframes) ──────────────────────────────────────────────
function BackgroundStyles() {
  return (
    <style>{`
      /* AIPUSULA DNA: ENTERPRISE PERFORMANCE ENGINE */
      /* Hardware-accelerated, calm, and mathematically precise animations */

      @keyframes pulse-opacity {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateZ(0); }
        50% { transform: translateY(-4px) translateZ(0); } /* Subdued for enterprise feel */
      }
      @keyframes orbit-spin {
        0% { transform: rotateX(74deg) rotateZ(0deg) translateZ(0); }
        100% { transform: rotateX(74deg) rotateZ(360deg) translateZ(0); }
      }
      @keyframes orbit-spin-reverse {
        0% { transform: rotateX(74deg) rotateZ(360deg) translateZ(0); }
        100% { transform: rotateX(74deg) rotateZ(0deg) translateZ(0); }
      }
      @keyframes scanner-sweep {
        0% { transform: translateX(-20px); opacity: 0; }
        15% { opacity: 0.6; }
        85% { opacity: 0.6; }
        100% { transform: translateX(270px); opacity: 0; }
      }
      @keyframes map-pulse {
        0%, 100% { opacity: 0.5; transform: scale(1) translateZ(0); }
        50% { opacity: 1; transform: scale(1.15) translateZ(0); }
      }

      .aurora-glow { animation: pulse-opacity 14s ease-in-out infinite; }
      .float-element { animation: float 24s ease-in-out infinite; }
      .orbit-ring { animation: orbit-spin 90s linear infinite; }
      .orbit-ring-reverse { animation: orbit-spin-reverse 120s linear infinite; }
      .scanner-line { animation: scanner-sweep 10s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      .threat-node { animation: map-pulse 4s ease-in-out infinite; transform-origin: center; }
    `}</style>
  );
}

// ─── Combined Background ────────────────────────────────────────────────────
// Matches reference HTML/CSS exactly: DepthLayers + Stars + EarthNetwork + NoiseTexture
// NO canvas particle field — reference uses minimal SVG stars only
export function CyberBackground() {
  return (
    <>
      <BackgroundStyles />
      <DepthLayers />
      <EarthNetwork />
      <NoiseTexture />
    </>
  );
}
