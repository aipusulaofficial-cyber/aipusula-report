/**
 * Global Cyber Attack Map
 * SVG-based interactive world map with animated attack indicators
 * No external map API dependency
 */
import { useEffect, useState, useRef, useCallback } from "react";

interface AttackEvent {
  id: number;
  x: number;
  y: number;
  country: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  from: string;
  to: string;
}

const attackTypes = ["DDoS", "Malware", "Phishing", "Ransomware", "APT", "SQL Inj", "Zero-Day"];

const attackRegions = [
  { name: "North America", x: 120, y: 160 },
  { name: "South America", x: 170, y: 310 },
  { name: "Europe", x: 310, y: 140 },
  { name: "Africa", x: 320, y: 270 },
  { name: "Russia", x: 380, y: 110 },
  { name: "Middle East", x: 370, y: 200 },
  { name: "India", x: 430, y: 220 },
  { name: "China", x: 500, y: 175 },
  { name: "Japan", x: 560, y: 165 },
  { name: "Southeast Asia", x: 520, y: 250 },
  { name: "Australia", x: 560, y: 330 },
  { name: "South Korea", x: 540, y: 175 },
];

const severities: ("critical" | "high" | "medium" | "low")[] = ["critical", "high", "medium", "low"];

const severityColors = {
  critical: "#EF4444",
  high: "#F97316",
  medium: "#FCD34D",
  low: "#38BDF8",
};

function generateAttacks(count: number): AttackEvent[] {
  const attacks: AttackEvent[] = [];
  for (let i = 0; i < count; i++) {
    const from = attackRegions[Math.floor(Math.random() * attackRegions.length)];
    const to = attackRegions[Math.floor(Math.random() * attackRegions.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    attacks.push({
      id: i,
      x: to.x + (Math.random() - 0.5) * 60,
      y: to.y + (Math.random() - 0.5) * 40,
      country: to.name,
      type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
      severity,
      from: from.name,
      to: to.name,
    });
  }
  return attacks;
}

export function AttackMap() {
  const [attacks, setAttacks] = useState<AttackEvent[]>([]);
  const [hoveredAttack, setHoveredAttack] = useState<AttackEvent | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setAttacks(generateAttacks(30));
    intervalRef.current = setInterval(() => {
      setAttacks(generateAttacks(30));
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPulsePhase(p => (p + 1) % 4);
    }, 500);
    return () => clearInterval(phaseInterval);
  }, []);

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,229,160,0.1)", background: "rgba(0,229,160,0.02)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#EF4444", boxShadow: "0 0 8px #EF4444" }} />
          <span className="mono text-xs uppercase tracking-widest" style={{ color: "#38BDF8" }}>Global Attack Map</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="mono text-[10px]" style={{ color: "#64748B" }}>{attacks.length} ACTIVE ATTACKS</span>
          <div className="flex items-center gap-2">
            {Object.entries(severityColors).map(([key, color]) => (
              <div key={key} className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
                <span className="mono text-[9px] uppercase" style={{ color: "#64748B" }}>{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SVG World Map */}
      <div className="relative" style={{ background: "radial-gradient(ellipse at center, #0a1a2e 0%, #050B14 100%)" }}>
        <svg viewBox="0 0 700 400" className="w-full h-[280px]">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse">
              <path d="M 35 0 L 0 0 0 35" fill="none" stroke="rgba(0,229,160,0.04)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="700" height="400" fill="url(#grid)" />

          {/* Simplified continent outlines */}
          {/* North America */}
          <path d="M 80,120 Q 100,100 130,110 Q 150,105 170,115 Q 180,130 175,150 Q 165,170 150,180 Q 130,190 110,185 Q 90,175 85,155 Q 75,140 80,120" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.12)" strokeWidth="1" />
          {/* South America */}
          <path d="M 155,230 Q 165,220 180,230 Q 190,250 185,270 Q 180,290 170,300 Q 160,310 150,300 Q 140,280 145,260 Q 150,240 155,230" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.12)" strokeWidth="1" />
          {/* Europe */}
          <path d="M 280,110 Q 300,100 320,105 Q 335,110 340,125 Q 335,140 320,145 Q 300,150 285,140 Q 275,130 280,110" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.12)" strokeWidth="1" />
          {/* Africa */}
          <path d="M 295,175 Q 310,165 330,170 Q 345,185 340,210 Q 335,240 325,265 Q 315,280 305,275 Q 295,260 290,240 Q 285,215 295,175" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.12)" strokeWidth="1" />
          {/* Russia/Asia */}
          <path d="M 340,90 Q 370,80 410,85 Q 450,90 490,100 Q 520,105 540,110 Q 550,120 545,135 Q 530,145 500,140 Q 460,135 420,130 Q 380,125 350,120 Q 340,110 340,90" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.12)" strokeWidth="1" />
          {/* India */}
          <path d="M 420,185 Q 435,180 445,190 Q 450,210 445,230 Q 440,245 430,250 Q 420,245 415,230 Q 410,210 420,185" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.12)" strokeWidth="1" />
          {/* China/SE Asia */}
          <path d="M 460,140 Q 480,135 510,140 Q 530,150 540,165 Q 535,180 520,190 Q 500,200 480,195 Q 465,185 460,165 Q 455,150 460,140" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.12)" strokeWidth="1" />
          {/* Australia */}
          <path d="M 530,300 Q 545,290 565,295 Q 580,305 575,320 Q 570,335 555,340 Q 540,345 530,335 Q 525,320 530,300" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.12)" strokeWidth="1" />

          {/* Attack lines */}
          {attacks.map((attack) => {
            const from = attackRegions.find(r => r.name === attack.from);
            if (!from) return null;
            const color = severityColors[attack.severity];
            const midX = (from.x + attack.x) / 2;
            const midY = Math.min(from.y, attack.y) - 30 - Math.random() * 20;
            return (
              <path
                key={`line-${attack.id}`}
                d={`M ${from.x},${from.y} Q ${midX},${midY} ${attack.x},${attack.y}`}
                fill="none"
                stroke={color}
                strokeWidth={attack.severity === "critical" ? 1.5 : 0.8}
                opacity={0.3 + Math.random() * 0.2}
                style={{ transition: "all 0.5s" }}
              />
            );
          })}

          {/* Attack dots with pulse */}
          {attacks.map((attack) => {
            const color = severityColors[attack.severity];
            const pulseScale = 1 + Math.sin(pulsePhase * 1.5 + attack.id) * 0.3;
            return (
              <g
                key={`dot-${attack.id}`}
                onMouseEnter={() => setHoveredAttack(attack)}
                onMouseLeave={() => setHoveredAttack(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Pulse ring */}
                <circle
                  cx={attack.x}
                  cy={attack.y}
                  r={6 * pulseScale}
                  fill="none"
                  stroke={color}
                  strokeWidth="0.5"
                  opacity={0.3}
                />
                {/* Main dot */}
                <circle
                  cx={attack.x}
                  cy={attack.y}
                  r={attack.severity === "critical" ? 4 : 3}
                  fill={color}
                  filter={`drop-shadow(0 0 4px ${color})`}
                />
              </g>
            );
          })}

          {/* Region labels */}
          {attackRegions.map(region => (
            <text
              key={region.name}
              x={region.x}
              y={region.y + 50}
              textAnchor="middle"
              fill="rgba(100,116,139,0.4)"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
            >
              {region.name}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredAttack && (
          <div
            className="absolute z-30 px-3 py-2 rounded-lg glass pointer-events-none"
            style={{
              left: `${(hoveredAttack.x / 700) * 100}%`,
              top: `${(hoveredAttack.y / 400) * 100}%`,
              transform: "translate(-50%, -120%)",
              borderColor: severityColors[hoveredAttack.severity],
              minWidth: "180px",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="mono text-[10px] font-semibold" style={{ color: severityColors[hoveredAttack.severity] }}>
                {hoveredAttack.type}
              </span>
              <span className="mono text-[9px] px-1 py-0.5 rounded" style={{ background: `${severityColors[hoveredAttack.severity]}15`, color: severityColors[hoveredAttack.severity] }}>
                {hoveredAttack.severity}
              </span>
            </div>
            <div className="mono text-[10px]" style={{ color: "#94A3B8" }}>
              {hoveredAttack.from} → {hoveredAttack.to}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-2 flex items-center justify-between border-t" style={{ borderColor: "rgba(0,229,160,0.08)", background: "rgba(5,11,20,0.6)" }}>
        <span className="mono text-[10px]" style={{ color: "#334155" }}>Auto-refresh: 4s · Hover for details</span>
        <span className="mono text-[10px]" style={{ color: "#334155" }}>
          Critical: {attacks.filter(a => a.severity === "critical").length} ·
          High: {attacks.filter(a => a.severity === "high").length}
        </span>
      </div>
    </div>
  );
}
