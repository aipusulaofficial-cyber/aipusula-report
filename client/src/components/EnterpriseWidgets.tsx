/**
 * Enterprise Widgets
 * Live Threat Counter, AI Risk Score, and Security Gauges
 */
import { useEffect, useState, useRef } from "react";
import { Shield, AlertTriangle, Activity, Lock, Bug } from "lucide-react";

// ─── Live Threat Counter ─────────────────────────────────────────────────────
interface ThreatStat {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
  unit?: string;
}

function AnimatedValue({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function LiveThreatCounter() {
  const [stats, setStats] = useState<ThreatStat[]>([
    { label: "Günlük Saldırı", value: 847291, color: "#EF4444", icon: <AlertTriangle className="w-4 h-4" /> },
    { label: "Engellenen Tehdit", value: 723847, color: "#00E5A0", icon: <Shield className="w-4 h-4" /> },
    { label: "Aktif Botnet", value: 34821, color: "#F97316", icon: <Bug className="w-4 h-4" /> },
    { label: "Sıfır Gün Zafiyet", value: 12, color: "#FCD34D", icon: <Activity className="w-4 h-4" /> },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(s => ({
        ...s,
        value: s.value + Math.floor(Math.random() * 500) - 100,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#EF4444", boxShadow: "0 0 8px #EF4444" }} />
        <span className="mono text-xs uppercase tracking-widest" style={{ color: "#EF4444" }}>
          Live Threat Statistics
        </span>
        <span className="mono text-[10px] ml-auto" style={{ color: "#334155" }}>Auto-refresh 3s</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-lg p-3" style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}15` }}>
            <div className="flex items-center gap-2 mb-2">
              <div style={{ color: stat.color }}>{stat.icon}</div>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "#64748B" }}>{stat.label}</span>
            </div>
            <div className="text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <AnimatedValue target={Math.max(0, stat.value)} duration={1500} />
            </div>
            <div className="mt-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div
                className="h-1 rounded-full transition-all duration-1000"
                style={{ width: `${60 + Math.random() * 35}%`, background: `linear-gradient(90deg, ${stat.color}, ${stat.color}60)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AI Risk Score Gauge ─────────────────────────────────────────────────────
interface RiskScore {
  score: number;
  level: "Low" | "Medium" | "High" | "Critical";
  reasons: string[];
  color: string;
}

function generateRiskScore(): RiskScore {
  const score = Math.floor(Math.random() * 40) + 35;
  let level: RiskScore["level"], color: string;
  if (score >= 70) { level = "Critical"; color = "#EF4444"; }
  else if (score >= 55) { level = "High"; color = "#F97316"; }
  else if (score >= 40) { level = "Medium"; color = "#FCD34D"; }
  else { level = "Low"; color = "#00E5A0"; }

  const reasonPool = [
    "12 yeni kritik CVE tespit edildi (son 24 saat)",
    "Güneydoğu Asya'dan DDoS saldırılarında artış",
    "Yapay zeka destekli phishing kampanyaları yayılıyor",
    "3 büyük kurumsal veri ihlali raporlandı",
    "Kritik altyapı zafiyetlerinde artış",
    "Ransomware grupları yeni teknikler kullanıyor",
    "Supply chain saldırıları %23 arttı",
    "Mobil cihaz hedefli saldırılar artıyor",
    "API güvenlik açıkları en çok istismar ediliyor",
    "IoT botnetleri genişliyor",
  ];

  const reasons = reasonPool.sort(() => Math.random() - 0.5).slice(0, 4);
  return { score, level, reasons, color };
}

export function AIRiskScore() {
  const [risk, setRisk] = useState<RiskScore>(generateRiskScore());
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [risk.score]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRisk(generateRiskScore());
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (risk.score / 100) * circumference;

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: risk.color, boxShadow: `0 0 8px ${risk.color}` }} />
        <span className="mono text-xs uppercase tracking-widest" style={{ color: risk.color }}>
          AI Security Risk Score
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Gauge */}
        <div className="relative flex-shrink-0">
          <svg width="120" height="120" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke={risk.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
              style={{ transition: "stroke-dashoffset 1s ease-out, stroke 0.5s" }}
            />
            <text x="50" y="46" textAnchor="middle" className="font-bold" fill="white" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "18px" }}>
              {risk.score}
            </text>
            <text x="50" y="58" textAnchor="middle" fill={risk.color} style={{ fontSize: "8px", fontWeight: 600 }}>
              /100
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center mt-6">
              <span className="mono text-xs font-semibold px-2 py-0.5 rounded" style={{ background: `${risk.color}15`, color: risk.color }}>
                {risk.level}
              </span>
            </div>
          </div>
        </div>

        {/* Reasons */}
        <div className="flex-1 min-w-0">
          <p className="mono text-[10px] uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>
            Risk Factors (AI Analyzed)
          </p>
          <div className="space-y-2">
            {risk.reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: risk.color }} />
                <span className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
