import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import {
  Shield, Brain, Smartphone, TrendingUp, DollarSign, Users, Code2,
  Lock, Zap, CheckSquare, AlertTriangle, Globe, ChevronRight, Star,
  Database, Server, Layers, GitBranch, Target, Award, BarChart2,
  ArrowRight, ExternalLink, Clock, Cpu, Eye, FileCode, Search
} from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { AttackMap } from "@/components/AttackMap";
import { LiveThreatCounter, AIRiskScore } from "@/components/EnterpriseWidgets";
import { CVEFeed } from "@/components/CVEFeed";
import { SecurityNews } from "@/components/SecurityNews";
import { NotificationCenter } from "@/components/NotificationCenter";
import { AdvancedSearch } from "@/components/AdvancedSearch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/useMobile";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Data ────────────────────────────────────────────────────────────────────

const marketGrowthData = [
  { year: "2022", market: 14.2, ai_cyber: 10.5 },
  { year: "2023", market: 18.7, ai_cyber: 15.8 },
  { year: "2024", market: 25.4, ai_cyber: 22.6 },
  { year: "2025", market: 30.7, ai_cyber: 29.6 },
  { year: "2026", market: 39.2, ai_cyber: 38.5 },
  { year: "2027", market: 50.1, ai_cyber: 49.2 },
  { year: "2028", market: 63.8, ai_cyber: 63.0 },
  { year: "2030", market: 93.8, ai_cyber: 93.0 },
];

const competitorData = [
  { subject: "AI Yetenekleri", ChatGPT: 95, Claude: 88, Gemini: 87, Perplexity: 72, AIPUSULA: 82 },
  { subject: "Güvenlik Odağı", ChatGPT: 40, Claude: 50, Gemini: 48, Perplexity: 38, AIPUSULA: 98 },
  { subject: "Fiyat/Değer", ChatGPT: 70, Claude: 68, Gemini: 80, Perplexity: 62, AIPUSULA: 82 },
  { subject: "Mobil Deneyim", ChatGPT: 62, Claude: 52, Gemini: 72, Perplexity: 60, AIPUSULA: 90 },
  { subject: "Veri Gizliliği", ChatGPT: 50, Claude: 72, Gemini: 42, Perplexity: 58, AIPUSULA: 92 },
  { subject: "Gerçek Zamanlı", ChatGPT: 55, Claude: 48, Gemini: 60, Perplexity: 85, AIPUSULA: 88 },
];

const revenueData = [
  { month: "Ay 1", free: 500, pro: 0, enterprise: 0 },
  { month: "Ay 3", free: 2000, pro: 800, enterprise: 0 },
  { month: "Ay 6", free: 5000, pro: 3500, enterprise: 1200 },
  { month: "Ay 9", free: 8000, pro: 8000, enterprise: 5000 },
  { month: "Ay 12", free: 12000, pro: 18000, enterprise: 15000 },
];

const revenueShareData = [
  { name: "Abonelik", value: 55, color: "#00E5A0" },
  { name: "Kurumsal", value: 30, color: "#38BDF8" },
  { name: "API Kullanımı", value: 15, color: "#F97316" },
];

const roadmapData = [
  { month: "Ay 1-2", phase: "Temel Altyapı", tasks: ["Auth sistemi", "CI/CD pipeline", "Dashboard UI", "Veritabanı şeması"], color: "#00E5A0", status: "critical" },
  { month: "Ay 3-4", phase: "AI Entegrasyonu", tasks: ["Chat motoru", "AI Tools kataloğu", "Phishing analizörü", "Kod tarayıcı"], color: "#38BDF8", status: "high" },
  { month: "Ay 5-6", phase: "Güvenlik Motoru", tasks: ["URL/IP tarayıcı", "CVE takibi", "Haber akışı", "Tehdit haritası"], color: "#F97316", status: "high" },
  { month: "Ay 7-8", phase: "Mobil Uygulama", tasks: ["React Native geliştirme", "Push bildirimleri", "Offline destek", "Play Store hazırlık"], color: "#A78BFA", status: "medium" },
  { month: "Ay 9-10", phase: "Entegrasyon & Test", tasks: ["E2E testler", "Performans opt.", "Penetrasyon testi", "Beta kullanıcıları"], color: "#FB7185", status: "medium" },
  { month: "Ay 11-12", phase: "Lansman", tasks: ["Play Store yayın", "Pazarlama kampanyası", "Enterprise satış", "Yatırımcı sunumu"], color: "#FCD34D", status: "launch" },
];

const techStack = [
  { layer: "Frontend Web", tech: "React + TypeScript + TailwindCSS", reason: "Tip güvenliği, geniş ekosistem, hızlı geliştirme", icon: <Code2 className="w-4 h-4" /> },
  { layer: "Mobil Uygulama", tech: "React Native (Expo)", reason: "iOS + Android tek kod tabanı, Play Store uyumlu", icon: <Smartphone className="w-4 h-4" /> },
  { layer: "Backend API", tech: "Node.js (NestJS)", reason: "Modüler mimari, TypeScript, WebSocket desteği", icon: <Server className="w-4 h-4" /> },
  { layer: "AI Servisleri", tech: "Python (FastAPI)", reason: "ML kütüphaneleri, async, otomatik API dokümantasyonu", icon: <Brain className="w-4 h-4" /> },
  { layer: "Veritabanı", tech: "PostgreSQL + Redis + Neo4j", reason: "İlişkisel + önbellek + grafik (tehdit ilişkileri)", icon: <Database className="w-4 h-4" /> },
  { layer: "DevOps", tech: "Docker + Kubernetes (AWS EKS)", reason: "Container orchestration, sıfır kesinti deployment", icon: <Layers className="w-4 h-4" /> },
  { layer: "CI/CD", tech: "GitHub Actions + Terraform", reason: "Otomatik build, test, deployment ve altyapı kodu", icon: <GitBranch className="w-4 h-4" /> },
  { layer: "Güvenlik", tech: "HashiCorp Vault + WAF + OAuth 2.0", reason: "Sır yönetimi, DDoS koruması, kimlik doğrulama", icon: <Lock className="w-4 h-4" /> },
];

const securityLayers = [
  { layer: "Ağ Katmanı", tech: "Cloudflare WAF + DDoS Koruması", level: 95, color: "#00E5A0" },
  { layer: "Kimlik Doğrulama", tech: "OAuth 2.0 + JWT + MFA", level: 98, color: "#38BDF8" },
  { layer: "Veri Şifreleme", tech: "AES-256 + TLS 1.3", level: 100, color: "#A78BFA" },
  { layer: "AI Güvenliği", tech: "Prompt Injection Koruması + Guardrails", level: 88, color: "#F97316" },
  { layer: "Sır Yönetimi", tech: "HashiCorp Vault", level: 96, color: "#FCD34D" },
  { layer: "İzleme/SIEM", tech: "Prometheus + Grafana + IDS/IPS", level: 85, color: "#FB7185" },
];

const checklistItems = [
  { id: 1, task: "Proje deposu (GitHub/GitLab) oluşturuldu", priority: "P0", category: "Altyapı" },
  { id: 2, task: "CI/CD pipeline kuruldu (GitHub Actions)", priority: "P0", category: "Altyapı" },
  { id: 3, task: "Docker ve Kubernetes altyapısı hazırlandı", priority: "P0", category: "Altyapı" },
  { id: 4, task: "OAuth 2.0 + MFA kimlik doğrulama uygulandı", priority: "P0", category: "Güvenlik" },
  { id: 5, task: "Zero-Trust güvenlik mimarisi kuruldu", priority: "P0", category: "Güvenlik" },
  { id: 6, task: "Dashboard sayfası tamamlandı", priority: "P1", category: "UI/UX" },
  { id: 7, task: "AI Chat motoru entegre edildi", priority: "P1", category: "AI" },
  { id: 8, task: "AI Tools kataloğu oluşturuldu", priority: "P1", category: "AI" },
  { id: 9, task: "Security Scanner motoru geliştirildi", priority: "P1", category: "Güvenlik" },
  { id: 10, task: "News/CVE akışı kuruldu", priority: "P2", category: "İçerik" },
  { id: 11, task: "Profile ve abonelik yönetimi tamamlandı", priority: "P2", category: "UI/UX" },
  { id: 12, task: "Mobil uygulama (iOS + Android) geliştirildi", priority: "P2", category: "Mobil" },
  { id: 13, task: "Play Store ve App Store uyumluluk kontrolleri yapıldı", priority: "P2", category: "Mobil" },
  { id: 14, task: "Penetrasyon testi ve güvenlik denetimi tamamlandı", priority: "P3", category: "Güvenlik" },
  { id: 15, task: "Beta test geri bildirimleri işlendi", priority: "P3", category: "Test" },
  { id: 16, task: "Lansman planı ve pazarlama materyalleri hazırlandı", priority: "P3", category: "Pazarlama" },
];

const competitors = [
  { name: "ChatGPT", company: "OpenAI", price: "$20/ay", ai: 95, security: 40, privacy: 50, mobile: 62, value: 70, total: 63, color: "#74AA9C" },
  { name: "Claude", company: "Anthropic", price: "$20/ay", ai: 88, security: 50, privacy: 72, mobile: 52, value: 68, total: 66, color: "#CC785C" },
  { name: "Gemini", company: "Google", price: "$20/ay", ai: 87, security: 48, privacy: 42, mobile: 72, value: 80, total: 66, color: "#4285F4" },
  { name: "Perplexity", company: "Perplexity AI", price: "$20/ay", ai: 72, security: 38, privacy: 58, mobile: 60, value: 62, total: 58, color: "#1FB8CD" },
  { name: "AIPUSULA", company: "AIPUSULA", price: "$19.99/ay", ai: 82, security: 98, privacy: 92, mobile: 90, value: 82, total: 89, color: "#00E5A0" },
];

// ─── Animated Counter ────────────────────────────────────────────────────────
// ─── Radar Compass SVG ───────────────────────────────────────────────────────
function RadarCompass() {
  return (
    <div className="relative w-44 h-44 flex-shrink-0">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)",
        animation: "radarPulseBg 3s ease-in-out infinite"
      }} />
      <svg viewBox="0 0 240 240" className="w-full h-full relative" style={{ opacity: 0.85 }}>
        {/* Outer rings */}
        {[110, 90, 70, 50, 30, 12].map((r, i) => (
          <circle key={i} cx="120" cy="120" r={r} fill="none" 
            stroke={i === 0 ? "rgba(0,229,160,0.12)" : "rgba(0,229,160,0.15)"} 
            strokeWidth="1" 
            strokeDasharray={i % 2 === 0 ? "4 6" : "2 4"} />
        ))}
        {/* Cross hairs */}
        <line x1="120" y1="10" x2="120" y2="230" stroke="rgba(0,229,160,0.1)" strokeWidth="0.5" />
        <line x1="10" y1="120" x2="230" y2="120" stroke="rgba(0,229,160,0.1)" strokeWidth="0.5" />
        <line x1="43" y1="43" x2="197" y2="197" stroke="rgba(0,229,160,0.06)" strokeWidth="0.5" />
        <line x1="197" y1="43" x2="43" y2="197" stroke="rgba(0,229,160,0.06)" strokeWidth="0.5" />
        {/* Sweep cone */}
        <path d="M120 120 L120 14 A106 106 0 0 1 150 20 Z" fill="rgba(0,229,160,0.1)" />
        {/* Sweep line */}
        <line x1="120" y1="120" x2="120" y2="14" stroke="#00E5A0" strokeWidth="2" opacity="0.9" strokeLinecap="round" />
        <line x1="120" y1="120" x2="150" y2="20" stroke="#00E5A0" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        {/* Blips */}
        <circle cx="155" cy="75" r="4" fill="#00E5A0" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.15;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="95" r="3" fill="#38BDF8" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.1;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="170" cy="140" r="3.5" fill="#F97316" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.15;0.8" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="90" cy="160" r="2.5" fill="#A78BFA" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        {/* Center dot */}
        <circle cx="120" cy="120" r="5" fill="#00E5A0" />
        <circle cx="120" cy="120" r="10" fill="none" stroke="#00E5A0" strokeWidth="1" opacity="0.4" />
        <circle cx="120" cy="120" r="15" fill="none" stroke="#00E5A0" strokeWidth="0.5" opacity="0.2">
          <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Labels */}
        <text x="118" y="8" fill="rgba(0,229,160,0.6)" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">N</text>
        <text x="118" y="238" fill="rgba(0,229,160,0.5)" fontSize="8" fontFamily="JetBrains Mono">S</text>
        <text x="4" y="124" fill="rgba(0,229,160,0.5)" fontSize="8" fontFamily="JetBrains Mono">W</text>
        <text x="228" y="124" fill="rgba(0,229,160,0.5)" fontSize="8" fontFamily="JetBrains Mono">E</text>
      </svg>
      {/* Rotating sweep animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full" style={{ animation: "radarSpin 6s linear infinite", transformOrigin: "center" }}>
          <svg viewBox="0 0 240 240" className="w-full h-full">
            <defs>
              <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0,229,160,0)" />
                <stop offset="100%" stopColor="rgba(0,229,160,0.15)" />
              </linearGradient>
            </defs>
            <path d="M120 120 L120 14 A106 106 0 0 1 165 30 Z" fill="url(#sweepGrad)" />
          </svg>
        </div>
      </div>
      <style>{`@keyframes radarSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <style>{`@keyframes radarPulseBg { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
    </div>
  );
}

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle, accent = "#00E5A0" }: { icon: React.ReactNode; title: string; subtitle: string; accent?: string }) {
  return (
    <div className="mb-6 section-glow-green">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg glass" style={{ borderColor: `${accent}30` }}>
          <div style={{ color: accent }}>{icon}</div>
        </div>
        <span className="mono text-xs uppercase tracking-widest" style={{ color: accent, textShadow: `0 0 12px ${accent}40` }}>
          {subtitle}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif", textShadow: "0 0 40px rgba(0,229,160,0.15)" }}>
        {title}
      </h2>
      <div className="mt-2 h-px w-24" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80, transparent)` }} />
    </div>
  );
}


// ─── System Status Bar ───────────────────────────────────────────────────────
function SystemStatusBar() {
  const statuses = [
    { label: "PLATFORM", value: "OPERATIONAL", color: "#00E5A0" },
    { label: "AI ENGINE", value: "ONLINE", color: "#00E5A0" },
    { label: "THREAT MONITOR", value: "ACTIVE", color: "#F97316" },
    { label: "CONTENT FEED", value: "LIVE", color: "#38BDF8" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3 py-1.5 px-2 border-b" style={{ borderColor: "rgba(0,229,160,0.08)", background: "rgba(0,229,160,0.02)" }}>
      <span className="mono text-xs" style={{ color: "#334155" }}>SYS://AIPUSULA-v1.0</span>
      <div className="h-3 w-px" style={{ background: "rgba(0,229,160,0.15)" }} />
      {statuses.map((s, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 4px ${s.color}` }} />
          <span className="mono text-xs" style={{ color: "#475569" }}>{s.label}:</span>
          <span className="mono text-xs font-medium" style={{ color: s.color }}>{s.value}</span>
        </div>
      ))}
      <div className="ml-auto mono text-xs" style={{ color: "#334155" }}>
        {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState("ai-world");
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [activeCompetitor, setActiveCompetitor] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const navItems = [
    { id: "ai-world", label: "AI Dünyası", icon: <Brain className="w-4 h-4" /> },
    { id: "ai-tools", label: "AI Araçları", icon: <Cpu className="w-4 h-4" /> },
    { id: "ai-monetize", label: "AI ile Kazanç", icon: <DollarSign className="w-4 h-4" /> },
    { id: "digital-world", label: "Dijital Dünya", icon: <Globe className="w-4 h-4" /> },
    { id: "cybersecurity", label: "Siber Güvenlik", icon: <Shield className="w-4 h-4" /> },
    { id: "competitors", label: "Rakip Analizi", icon: <Target className="w-4 h-4" /> },
    { id: "roadmap", label: "Yol Haritası", icon: <GitBranch className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen" style={{ background: isDark ? "#0A0C0D" : "#F8FAFC", fontFamily: "Inter, sans-serif" }}>
      {/* ── Cyber Background (reference architecture) ── */}
      {isDark && <CyberBackground />}
      {/* ── Top Navigation ── */}
      <header className="sticky top-0 z-50 border-b glass" style={{ borderColor: isDark ? "rgba(0,229,160,0.2)" : "rgba(0,229,160,0.15)" }}>
        <div className="container flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center pulse-dot" style={{ background: "linear-gradient(135deg, #00E5A0, #38BDF8)", color: "#00E5A0" }}>
              <Shield className="w-3.5 h-3.5 text-black" />
            </div>
            <div>
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", color: isDark ? "#FFFFFF" : "#0F172A" }}>AIPUSULA</span>
              <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full mono" style={{ background: "rgba(0,229,160,0.15)", color: "#00E5A0" }}>MVP</span>
            </div>
          </div>
          <div className="hidden xl:flex items-center gap-0.5">
            {navItems.slice(0, 7).map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30"
                style={{
                  color: activeTab === item.id ? "#00E5A0" : (isDark ? "#94A3B8" : "#64748B"),
                  background: activeTab === item.id ? "rgba(0,229,160,0.1)" : "transparent",
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AdvancedSearch />
            <NotificationCenter />
            <span className="hidden sm:inline text-xs mono" style={{ color: "#94A3B8" }}>Temmuz 2026</span>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00E5A0" }} />
          </div>
        </div>
      </header>

      {/* ── System Status Bar ── */}
      <SystemStatusBar />

      {/* ── Hero Section (Two-Column) ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "110px" }}>
        {/* Wireframe Earth - positioned in section, not in container */}
        <div
          className="hidden lg:block absolute right-0 top-1/2 pointer-events-none"
          style={{
            transform: "translateY(-50%)",
            width: "320px",
            height: "320px",
            zIndex: 0,
            opacity: 0.62,
          }}
        >
          {/* Ambient Glow Core */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: "#00E5FF", filter: "blur(60px)", opacity: 0.09 }}
          />

          {/* Earth Sphere with Float Animation */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: "heroFloat 24s ease-in-out infinite" }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: "170px",
                height: "170px",
                borderRadius: "50%",
                border: "1px solid rgba(42,59,79,0.5)",
                boxShadow: "0 0 30px rgba(0,229,255,0.04), inset 0 0 40px rgba(0,229,255,0.02)",
                background: "rgba(10,12,13,0.5)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Optical Precision Grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(transparent 49.8%, rgba(42,59,79,0.28) 50%, transparent 50.2%), linear-gradient(90deg, transparent 49.8%, rgba(42,59,79,0.28) 50%, transparent 50.2%)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Geometric Neural Framework - SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 170 170">
                <path d="M42,42 L128,42 L148,85 L128,128 L42,128 L22,85 Z" fill="none" stroke="rgba(0,229,255,0.16)" strokeWidth="0.5" />
                <path d="M58,58 L112,58 L122,85 L112,112 L58,112 L48,85 Z" fill="none" stroke="rgba(0,229,255,0.12)" strokeWidth="0.4" />
                <path d="M42,42 L128,128 M128,42 L42,128 M22,85 L148,85 M85,15 L85,155" fill="none" stroke="rgba(0,229,255,0.1)" strokeWidth="0.4" />
                <path d="M58,58 L112,112 M112,58 L58,112" fill="none" stroke="rgba(0,229,255,0.08)" strokeWidth="0.3" />
                <circle cx="85" cy="85" r="30" fill="none" stroke="rgba(0,229,255,0.08)" strokeWidth="0.3" />
                <circle cx="85" cy="85" r="50" fill="none" stroke="rgba(0,229,255,0.05)" strokeWidth="0.3" />
                <circle cx="85" cy="85" r="3.5" fill="#00E5FF" opacity="0.9" />
                <circle cx="42" cy="42" r="1.8" fill="#00E5FF" opacity="0.55" />
                <circle cx="128" cy="42" r="2.2" fill="#00D9A6" opacity="0.75" />
                <circle cx="148" cy="85" r="1.8" fill="#00E5FF" opacity="0.6" />
                <circle cx="128" cy="128" r="1.8" fill="#00E5FF" opacity="0.55" />
                <circle cx="42" cy="128" r="2.2" fill="#00FF9C" opacity="0.7" />
                <circle cx="22" cy="85" r="1.8" fill="#00E5FF" opacity="0.55" />
                <circle cx="58" cy="58" r="1.2" fill="#00E5FF" opacity="0.45" />
                <circle cx="112" cy="58" r="1.2" fill="#00D9A6" opacity="0.45" />
                <circle cx="112" cy="112" r="1.2" fill="#00E5FF" opacity="0.45" />
                <circle cx="58" cy="112" r="1.2" fill="#00FF9C" opacity="0.45" />
                <line x1="85" y1="85" x2="42" y2="42" stroke="rgba(0,229,255,0.12)" strokeWidth="0.3" />
                <line x1="85" y1="85" x2="128" y2="42" stroke="rgba(0,229,255,0.12)" strokeWidth="0.3" />
                <line x1="85" y1="85" x2="148" y2="85" stroke="rgba(0,229,255,0.12)" strokeWidth="0.3" />
                <line x1="85" y1="85" x2="128" y2="128" stroke="rgba(0,229,255,0.12)" strokeWidth="0.3" />
                <line x1="85" y1="85" x2="42" y2="128" stroke="rgba(0,229,255,0.12)" strokeWidth="0.3" />
                <line x1="85" y1="85" x2="22" y2="85" stroke="rgba(0,229,255,0.12)" strokeWidth="0.3" />
              </svg>

              {/* GPU-Optimized Scanner Line */}
              <div
                className="absolute top-0 bottom-0"
                style={{
                  width: "1px",
                  background: "rgba(0,229,255,0.35)",
                  boxShadow: "0 0 6px #00E5FF",
                  willChange: "transform, opacity",
                  animation: "heroScanner 10s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                  left: "30px",
                }}
              />
            </div>
          </div>

          {/* Orbit Ring System */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full"
              style={{
                width: "230px",
                height: "230px",
                border: "1px solid rgba(42,59,79,0.35)",
                animation: "heroOrbit 90s linear infinite",
                willChange: "transform",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "270px",
                height: "270px",
                border: "1px solid rgba(0,229,255,0.06)",
                animation: "heroOrbit 120s linear infinite",
                willChange: "transform",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "320px",
                height: "320px",
                border: "1px solid rgba(0,229,255,0.04)",
                animation: "heroOrbit 150s linear infinite",
                willChange: "transform",
              }}
            />
          </div>

          {/* Subtle network extension dots outside sphere */}
          <div className="absolute inset-0">
            <div className="absolute" style={{ top: "8%", right: "3%", width: "2px", height: "2px", borderRadius: "50%", background: "#00E5FF", opacity: 0.35 }} />
            <div className="absolute" style={{ top: "22%", right: "-2%", width: "1.5px", height: "1.5px", borderRadius: "50%", background: "#00D9A6", opacity: 0.3 }} />
            <div className="absolute" style={{ bottom: "12%", right: "6%", width: "2px", height: "2px", borderRadius: "50%", background: "#00FF9C", opacity: 0.3 }} />
            <div className="absolute" style={{ bottom: "28%", right: "-4%", width: "1.5px", height: "1.5px", borderRadius: "50%", background: "#00E5FF", opacity: 0.25 }} />
            <div className="absolute" style={{ top: "38%", right: "-6%", width: "1px", height: "1px", borderRadius: "50%", background: "#00E5FF", opacity: 0.2 }} />
            <div className="absolute" style={{ top: "55%", right: "-3%", width: "1px", height: "1px", borderRadius: "50%", background: "#00D9A6", opacity: 0.2 }} />
          </div>
        </div>

        <div className="container relative z-10 py-2">
          <div className="flex items-center gap-6">
            {/* LEFT: Title + Subtitle + Description (45-50%) */}
            <div className="flex-1 max-w-[55%] relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-px w-6" style={{ background: "#00E5A0" }} />
                <span className="mono text-xs uppercase tracking-widest" style={{ color: "#00E5A0" }}>// ARTIFICIAL INTELLIGENCE & DIGITAL WORLD</span>
              </div>
              <h1 className="font-black leading-none" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.02em" }}>
                <span className="text-white">AI</span><span style={{ color: "#00E5A0", textShadow: "0 0 40px rgba(0,229,160,0.4)" }}>PUSULA</span>
              </h1>
              <div className="mono text-xs mt-1" style={{ color: "#38BDF8", letterSpacing: "0.15em" }}>
                THE COMPASS OF AI & THE DIGITAL WORLD
              </div>
              <p className="text-sm mt-1.5 leading-relaxed max-w-md" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
                A premium platform that bridges artificial intelligence, digital tools, and cybersecurity for the modern professional. Discover AI tools, learn to monetize with AI, and stay protected in the digital world.
              </p>
            </div>


          </div>
        </div>
        {/* Enterprise gradient subtle overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(0,229,160,0.02) 0%, transparent 40%, rgba(0,229,255,0.02) 100%)",
            zIndex: 0,
          }}
        />
      </section>
      {/* ── AI-Powered Platform Capabilities ── */}
      <section className="container pb-1">
        <div className="mb-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-6" style={{ background: "#00E5A0" }} />
            <span className="mono text-xs uppercase tracking-widest" style={{ color: "#00E5A0" }}>CORE CAPABILITIES</span>
          </div>
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif", textShadow: "0 0 30px rgba(0,229,160,0.1)" }}>
            AI-Powered Platform Capabilities
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            {
              title: "AI Assistant",
              desc: "Autonomous threat detection and response powered by advanced machine learning models.",
              icon: <Brain className="w-5 h-5" stroke="1.5" />,
              color: "#00E5A0"
            },
            {
              title: "AI Tools Catalog",
              desc: "Curated library of 500+ AI tools for writing, coding, design, marketing, and productivity.",
              icon: <Cpu className="w-5 h-5" stroke="1.5" />,
              color: "#38BDF8"
            },
            {
              title: "Digital Content Studio",
              desc: "AI-powered content creation for social media, blogs, presentations, and video scripts.",
              icon: <FileCode className="w-5 h-5" stroke="1.5" />,
              color: "#A78BFA"
            },
            {
              title: "AI Monetization Hub",
              desc: "Business ideas, revenue strategies, and AI-driven income generation frameworks.",
              icon: <DollarSign className="w-5 h-5" stroke="1.5" />,
              color: "#F97316"
            },
            {
              title: "Cybersecurity Scanner",
              desc: "Automated vulnerability scanning engine that identifies and classifies threats in real-time.",
              icon: <Shield className="w-5 h-5" stroke="1.5" />,
              color: "#FCD34D"
            },
            {
              title: "Threat Intelligence",
              desc: "Real-time threat feeds aggregated from global cybersecurity intelligence networks.",
              icon: <Globe className="w-5 h-5" stroke="1.5" />,
              color: "#FB7185"
            },
            {
              title: "Workflow Automation",
              desc: "Streamline operations with AI-driven workflow orchestration and scheduling.",
              icon: <Zap className="w-5 h-5" stroke="1.5" />,
              color: "#00E5A0"
            },
            {
              title: "API & Integrations",
              desc: "Extensible platform architecture with REST APIs and third-party connectors.",
              icon: <Code2 className="w-5 h-5" stroke="1.5" />,
              color: "#38BDF8"
            },
          ].map((cap, i) => (
            <div key={i} className="glass card-glow p-3 rounded-xl cursor-pointer transition-all duration-200 ease-out hover:translate-y-[-2px] hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30" style={{ willChange: "transform" }}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${cap.color}15`, color: cap.color }}>
                  {cap.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white mb-1 leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {cap.title}
                  </div>
                  <div className="text-xs leading-relaxed transition-colors duration-200 group-hover:text-gray-500" style={{ color: "#64748B" }}>
                    {cap.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sidebar + Content Layout ── */}
      <div className="container pb-4">
        <div className="flex gap-3">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-16">
              <div className="glass rounded p-0 overflow-hidden animated-border">
                <div className="px-3 py-1.5 flex items-center gap-2" style={{ background: "rgba(0,229,160,0.05)", borderBottom: "1px solid rgba(0,229,160,0.1)" }}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: "#FCD34D" }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: "#00E5A0" }} />
                  </div>
                  <span className="mono text-xs" style={{ color: "#334155" }}>navigation.sys</span>
                </div>
                <div className="p-2">
                <p className="mono text-xs uppercase tracking-widest mb-2 px-1" style={{ color: "#334155" }}>// INDEX</p>
                <nav className="space-y-0.5">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-sm transition-all duration-200 ease-out text-left cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30"
                      style={{
                        color: activeTab === item.id ? "#00E5A0" : (isDark ? "#64748B" : "#475569"),
                        background: activeTab === item.id ? "rgba(0,229,160,0.08)" : "transparent",
                        borderLeft: activeTab === item.id ? "2px solid #00E5A0" : "2px solid transparent",
                        fontFamily: activeTab === item.id ? "JetBrains Mono, monospace" : "inherit",
                        fontSize: "0.75rem",
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-2 pt-2 border-t" style={{ borderColor: "rgba(0,229,160,0.08)" }}>
                  <div className="mono text-xs px-1" style={{ color: "#1E3A2F" }}>
                    <div>AIPUSULA-MVP-v1.0</div>
                    <div style={{ color: "#00E5A0" }}>● SYSTEM READY</div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-6">

            {/* ── Sütun 1: AI Dünyası ── */}
            <section id="ai-world">
              <SectionHeader
                icon={<Brain className="w-5 h-5" />}
                title="AI Dünyası"
                subtitle="01 — Yapay Zekâ Haberleri, Modeller & Trendler"
                accent="#00E5A0"
              />
              {/* Son AI Haberleri */}
              <div className="grid lg:grid-cols-3 gap-4 mb-6">
                <div className="lg:col-span-2 glass rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: "#00E5A0", boxShadow: "0 0 8px #00E5A0" }} />
                    Son AI Haberleri
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: "OpenAI GPT-5: Multimodal Reasoning & Agentic AI", tag: "Yeni Model", date: "2 saat önce", color: "#00E5A0" },
                      { title: "Anthropic Claude 4: Uzun Bağlam Penceresi ve Tool Use", tag: "Güncelleme", date: "6 saat önce", color: "#38BDF8" },
                      { title: "Google DeepMind: AlphaFold 3 Protein Yapı Tahmini", tag: "Araştırma", date: "12 saat önce", color: "#A78BFA" },
                      { title: "Meta Llama 4: Açık Kaynak LLM Geliştirmeleri", tag: "Açık Kaynak", date: "1 gün önce", color: "#F97316" },
                      { title: "AI Agent Ecosystem: Autonomous Task Execution", tag: "Trend", date: "1 gün önce", color: "#FB7185" },
                    ].map((news, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: news.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{news.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="mono text-xs px-1.5 py-0.5 rounded" style={{ background: `${news.color}15`, color: news.color }}>{news.tag}</span>
                            <span className="text-xs" style={{ color: "#475569" }}>{news.date}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 flex-shrink-0 mt-2" style={{ color: "#334155" }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Yeni AI Modelleri */}
                  <div className="glass rounded-xl p-5">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      <Cpu className="w-4 h-4" style={{ color: "#38BDF8" }} />
                      Yeni AI Modelleri
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        { name: "GPT-5", provider: "OpenAI", desc: "Agentic AI, Multimodal", color: "#00E5A0" },
                        { name: "Claude 4", provider: "Anthropic", desc: "200K context, Tool use", color: "#38BDF8" },
                        { name: "Gemini 2.0", provider: "Google", desc: "Multimodal, Long context", color: "#A78BFA" },
                        { name: "Llama 4", provider: "Meta", desc: "Open source, 405B params", color: "#F97316" },
                      ].map((m, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${m.color}15`, color: m.color }}>{m.name[0]}</div>
                          <div>
                            <div className="text-sm font-medium text-white">{m.name}</div>
                            <div className="text-xs" style={{ color: "#64748B" }}>{m.provider} · {m.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* AI Trendleri */}
                  <div className="glass rounded-xl p-5">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      <TrendingUp className="w-4 h-4" style={{ color: "#FB7185" }} />
                      AI Trendleri
                    </h4>
                    <div className="space-y-2">
                      {["AI Agents & Autonomous Systems", "Multimodal AI", "Edge AI & On-Device ML", "AI-Powered Coding Assistants", "RAG & Knowledge Graphs"].map((trend, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="mono text-xs" style={{ color: "#334155" }}>{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-xs" style={{ color: "#94A3B8" }}>{trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Editör Seçimi & Öne Çıkan */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="glass rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    <Star className="w-4 h-4" style={{ color: "#FCD34D" }} />
                    Editör Seçimi
                  </h3>
                  <div className="space-y-2">
                    {[
                      { title: "AI ile Üretkenlik: 2026 Rehberi", category: "Rehber" },
                      { title: "OpenAI vs Anthropic vs Google: Karşılaştırma", category: "Analiz" },
                      { title: "Kendi AI Agent'ınızı Oluşturma", category: "Eğitim" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FCD34D" }} />
                        <span className="text-sm text-white">{item.title}</span>
                        <span className="ml-auto mono text-xs" style={{ color: "#FCD34D" }}>{item.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    <Award className="w-4 h-4" style={{ color: "#A78BFA" }} />
                    Öne Çıkan Makaleler
                  </h3>
                  <div className="space-y-2">
                    {[
                      { title: "RAG Mimarisi: Enterprise AI için Derinlemesine İnceleme", views: "12.4K" },
                      { title: "AI Kod Asistanları: Cursor, Copilot, Windsurf Karşılaştırması", views: "8.7K" },
                      { title: "Multimodal AI: Metin, Görüntü ve Ses Birleştirme", views: "6.2K" },
                    ].map((article, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
                        <span className="mono text-xs" style={{ color: "#A78BFA" }}>#{i + 1}</span>
                        <span className="text-sm text-white flex-1">{article.title}</span>
                        <span className="text-xs" style={{ color: "#475569" }}>{article.views}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            {/* Sayfa Planlaması */}
            <h3 className="text-xl font-semibold text-white mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Sayfa Planlaması</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "AI World", icon: <Brain className="w-5 h-5" />, desc: "AI eğitim içerikleri, rehberler, yeni teknoloji analizleri ve yapay zekâ trendleri", color: "#00E5A0" },
                { name: "AI Tools", icon: <Cpu className="w-5 h-5" />, desc: "500+ AI araç kataloğu, karşılaştırma, puanlama ve kullanım rehberleri", color: "#38BDF8" },
                { name: "AI Monetize", icon: <DollarSign className="w-5 h-5" />, desc: "AI ile kazanç yolları, iş fikirleri, gelir modelleri ve pasif gelir stratejileri", color: "#F97316" },
                { name: "Digital World", icon: <Globe className="w-5 h-5" />, desc: "Teknoloji haberleri, yazılım dünyası, dijital dönüşüm ve yenilikçi projeler", color: "#A78BFA" },
                { name: "Cybersecurity", icon: <Shield className="w-5 h-5" />, desc: "Tehdit analizi, zafiyet tarama, güvenlik tavsiyeleri ve kurumsal koruma", color: "#FB7185" },
                { name: "Profile", icon: <Users className="w-5 h-5" />, desc: "Kullanıcı profili, abonelik yönetimi, MFA ayarları, API anahtarı yönetimi", color: "#FCD34D" },
              ].map((page, i) => (
                <div key={i} className="glass rounded-xl p-5 hover:scale-[1.02] transition-all duration-300 card-glow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-lg" style={{ background: `${page.color}15`, color: page.color, boxShadow: `0 0 15px ${page.color}20` }}>
                      {page.icon}
                    </div>
                    <span className="font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{page.name}</span>
                    <span className="ml-auto mono text-xs" style={{ color: page.color }}>0{i + 1}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{page.desc}</p>
                  <div className="mt-3 h-px" style={{ background: `linear-gradient(90deg, ${page.color}40, transparent)` }} />
                </div>
              ))}
            </div>

            {/* Pazar Analizi - AI Dünyası altında */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Pazar Analizi</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "AI Siber Güvenlik Pazarı (2026)", value: "$39.2B", change: "+27.8%", color: "#00E5A0" },
                  { label: "Toplam Siber Güvenlik Pazarı", value: "$248B", change: "+13.4%", color: "#38BDF8" },
                  { label: "2030 Hedef Pazar Büyüklüğü", value: "$93.8B", change: "CAGR 22%", color: "#A78BFA" },
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-xl p-5">
                    <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{stat.value}</div>
                    <div className="text-sm mb-2" style={{ color: "#94A3B8" }}>{stat.label}</div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs" style={{ background: `${stat.color}15`, color: stat.color }}>
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-white mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>AI Siber Güvenlik Pazar Büyümesi (Milyar $)</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={marketGrowthData}>
                    <defs>
                      <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="year" stroke="#475569" tick={{ fill: "#64748B", fontSize: 12 }} />
                    <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: "#0D1B2A", border: "1px solid rgba(0,229,160,0.2)", borderRadius: "8px", color: "#E2E8F0" }}
                      formatter={(v: number) => [`$${v}B`, ""]}
                    />
                    <Legend wrapperStyle={{ color: "#94A3B8" }} />
                    <Area type="monotone" dataKey="market" name="Toplam Pazar" stroke="#38BDF8" fill="url(#blueGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="ai_cyber" name="AI Siber Güvenlik" stroke="#00E5A0" fill="url(#greenGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            </section>

            {/* ── Sütun 2: Dijital Dünya ── */}
            <section id="digital-world">
              <SectionHeader
                icon={<Globe className="w-5 h-5" />}
                title="Dijital Dünya"
                subtitle="02 — Teknoloji & Yazılım Dünyası"
                accent="#A78BFA"
              />
              <div className="space-y-3 mb-8">
                {techStack.map((item, i) => (
                  <div key={i} className="glass rounded-xl p-4 flex items-start gap-4 hover:border-purple-500/30 transition-colors duration-300 card-glow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78BFA]/30">
                    <div className="p-2 rounded-lg flex-shrink-0 mt-0.5" style={{ background: "rgba(167,139,250,0.15)", color: "#A78BFA" }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-medium text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.layer}</span>
                        <span className="mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(167,139,250,0.1)", color: "#A78BFA" }}>{item.tech}</span>
                      </div>
                      <p className="text-xs" style={{ color: "#64748B" }}>{item.reason}</p>
                    </div>
                    <span className="mono text-xs flex-shrink-0" style={{ color: "#334155" }}>#{String(i + 1).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>

              {/* Klasör Yapısı */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  <FileCode className="w-4 h-4" style={{ color: "#A78BFA" }} />
                  Klasör Yapısı (MVP)
                </h3>
                <pre className="mono text-xs leading-relaxed overflow-x-auto" style={{ color: "#64748B" }}>
{`aipusula/
├── frontend-web/          # React + TailwindCSS
│   └── src/
│       ├── components/    # Reusable UI bileşenleri
│       ├── pages/         # Dashboard, Chat, Scanner vb.
│       ├── services/      # API client katmanı
│       ├── hooks/         # Custom React hooks
│       └── store/         # State management (Zustand)
├── mobile-app/            # React Native (Expo)
│   └── src/
│       ├── screens/       # Her sayfa için ekran
│       ├── navigation/    # React Navigation
│       └── components/    # Mobil UI bileşenleri
├── backend/               # NestJS
│   └── src/modules/
│       ├── auth/          # Kimlik doğrulama
│       ├── ai-tools/      # AI araçları
│       ├── chat/          # Sohbet motoru
│       ├── scanner/       # Güvenlik tarayıcı
│       └── news/          # Haber akışı
├── ai-services/           # Python FastAPI
│   ├── models/            # AI modelleri
│   └── scanners/          # Güvenlik tarayıcı mantığı
└── infra/                 # Terraform, Docker`}
                </pre>
              </div>
            </section>

            {/* ── Sütun 2: AI Araçları ── */}
            <section id="ai-tools">
              <SectionHeader
                icon={<Cpu className="w-5 h-5" />}
                title="AI Araçları"
                subtitle="02 — AI Tools Kataloğu & Karşılaştırma"
                accent="#38BDF8"
              />
              {/* Öne Çıkan AI Araçları */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {[
                  { name: "ChatGPT", provider: "OpenAI", category: "Sohbet & İçerik", desc: "GPT-4o ile multimodal AI asistanı. Yazı, kod, analiz ve görsel üretme.", rating: 4.8, color: "#74AA9C" },
                  { name: "Claude", provider: "Anthropic", category: "Sohbet & Analiz", desc: "Uzun bağlam penceresi ve güvenli AI asistanı. Araştırma ve kodlama.", rating: 4.7, color: "#CC785C" },
                  { name: "Gemini", provider: "Google", desc: "Google'ın multimodal AI modeli. Arama entegrasyonu ve gerçek zamanlı bilgi.", category: "Sohbet & Arama", rating: 4.5, color: "#4285F4" },
                  { name: "Cursor", provider: "Cursor Inc.", category: "Kod Geliştirme", desc: "AI-powered code editor. Autocomplete, refactor ve code review.", rating: 4.9, color: "#38BDF8" },
                  { name: "Perplexity", provider: "Perplexity AI", category: "Araştırma & Arama", desc: "AI-powered search engine. Gerçek zamanlı yanıtlar ve kaynaklar.", rating: 4.6, color: "#1FB8CD" },
                  { name: "Runway", provider: "Runway ML", category: "Video & Görsel", desc: "AI video generation, editing ve VFX. Gen-3 Alpha modeli.", rating: 4.4, color: "#A78BFA" },
                  { name: "Midjourney", provider: "Midjourney", category: "Görsel Üretim", desc: "AI image generation. Sanatsal ve fotogerçekçi görseller.", rating: 4.7, color: "#FB7185" },
                  { name: "ElevenLabs", provider: "ElevenLabs", category: "Ses & Konuşma", desc: "AI voice cloning, text-to-speech ve ses üretimi.", rating: 4.5, color: "#F97316" },
                  { name: "Manus", provider: "Manus AI", category: "Otonom AI Agent", desc: "Tam otonom AI ajandalar. Araştırma, kodlama ve otomasyon.", rating: 4.6, color: "#FCD34D" },
                ].map((tool, i) => (
                  <div key={i} className="glass rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 card-glow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8]/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${tool.color}15`, color: tool.color }}>{tool.name[0]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{tool.name}</span>
                          <span className="mono text-xs" style={{ color: "#475569" }}>#{i + 1}</span>
                        </div>
                        <div className="text-xs" style={{ color: "#64748B" }}>{tool.provider}</div>
                      </div>
                    </div>
                    <span className="mono text-xs px-1.5 py-0.5 rounded mb-2 inline-block" style={{ background: `${tool.color}10`, color: tool.color }}>{tool.category}</span>
                    <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>{tool.desc}</p>
                    <div className="mt-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-3 h-3" style={{ color: j < Math.floor(tool.rating) ? "#FCD34D" : "#334155", fill: j < Math.floor(tool.rating) ? "#FCD34D" : "none" }} />
                      ))}
                      <span className="ml-1 text-xs" style={{ color: "#64748B" }}>{tool.rating}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Araç Kategorileri */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>AI Araç Kategorileri</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Yazı & İçerik", desc: "AI writing assistants, blog generators, content optimizers", color: "#00E5A0", icon: <FileCode className="w-4 h-4" /> },
                    { title: "Kod & Geliştirme", desc: "AI code assistants, debuggers, automated testing tools", color: "#38BDF8", icon: <Code2 className="w-4 h-4" /> },
                    { title: "Tasarım & Görsel", desc: "AI image generators, design tools, logo makers", color: "#A78BFA", icon: <Cpu className="w-4 h-4" /> },
                    { title: "Video & Ses", desc: "AI video editors, voice synthesis, podcast generators", color: "#F97316", icon: <Zap className="w-4 h-4" /> },
                    { title: "Veri & Analiz", desc: "AI data analysts, chart generators, insight tools", color: "#FCD34D", icon: <BarChart2 className="w-4 h-4" /> },
                    { title: "Otomasyon", desc: "Workflow automation, scheduling, task management AI", color: "#FB7185", icon: <Database className="w-4 h-4" /> },
                  ].map((cat, i) => (
                    <div key={i} className="glass rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 card-glow cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.icon}</div>
                        <span className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{cat.title}</span>
                      </div>
                      <p className="text-xs" style={{ color: "#64748B" }}>{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Sütun 3: AI ile Kazanç ── */}
            <section id="ai-monetize">
              <SectionHeader
                icon={<DollarSign className="w-5 h-5" />}
                title="AI ile Kazanç"
                subtitle="03 — AI ile Gelir Üretme Yolları & Eğitimi"
                accent="#F97316"
              />
              {/* Kazanç Yolları */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { title: "AI Freelancing", desc: "AI araçlarıyla content writing, code development ve tasarım hizmetleri sunarak gelir elde edin.", icon: <Users className="w-5 h-5" />, color: "#F97316", examples: ["AI Content Writer", "AI Code Developer", "AI Graphic Designer"] },
                  { title: "Prompt Engineering", desc: "Etkili prompt yazma becerisi kazanın. Enterprise firmalar bu hizmeti yüksek ücretlerle satın alıyor.", icon: <Code2 className="w-5 h-5" />, color: "#00E5A0", examples: ["Prompt Templates Satışı", "LLM Fine-tuning", "Enterprise Consulting"] },
                  { title: "AI SaaS Ürünleri", desc: "Niche AI araçları geliştirin ve abonelik bazlı gelir modeliyle sürdürülebilir kazanç yaratın.", icon: <Layers className="w-5 h-5" />, color: "#38BDF8", examples: ["AI Writing Tool", "AI Resume Builder", "AI Image Editor"] },
                  { title: "YouTube & TikTok AI", desc: "AI araçlarıyla içerik üretin. Video script, thumbnail, ses ve edit işlemlerini otomatikleştirin.", icon: <Eye className="w-5 h-5" />, color: "#A78BFA", examples: ["AI Script Generator", "AI Thumbnail Maker", "AI Voice Cloning"] },
                  { title: "Affiliate Marketing", desc: "AI araçlarını tanıtın ve affiliate programlarıyla pasif gelir oluşturun.", icon: <ExternalLink className="w-5 h-5" />, color: "#FCD34D", examples: ["ChatGPT Plus Referral", "AI Tool Reviews", "Comparison Sites"] },
                  { title: "AI Otomasyon Danışmanlığı", desc: "İşletmelere AI otomasyon çözümleri sunarak yüksek değerli danışmanlık hizmetleri verin.", icon: <Zap className="w-5 h-5" />, color: "#FB7185", examples: ["Workflow Automation", "Chatbot Deployment", "Data Pipeline AI"] },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-xl p-5 hover:scale-[1.02] transition-all duration-300 card-glow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F97316]/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-lg" style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div>
                      <span className="font-semibold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.title}</span>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "#94A3B8" }}>{item.desc}</p>
                    <div className="space-y-1">
                      {item.examples.map((ex, j) => (
                        <div key={j} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full" style={{ background: item.color }} />
                          <span className="text-xs" style={{ color: "#64748B" }}>{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Başarı Hikayeleri & Vaka Analizleri */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="glass rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    <Award className="w-4 h-4" style={{ color: "#F97316" }} />
                    Başarı Hikayeleri
                  </h3>
                  <div className="space-y-3">
                    {[
                      { person: "Freelance Yazar", income: "$4,200/ay", method: "ChatGPT + Jasper ile AI-assisted content writing", tag: "Content" },
                      { person: "Solo Developer", income: "$12,800/ay", method: "AI SaaS: Otomatik resume builder + ATS optimizer", tag: "SaaS" },
                      { person: "YouTube Kanalı", income: "$6,500/ay", method: "AI ile günlük video içerik üretimi ve monetizasyon", tag: "Video" },
                    ].map((story, i) => (
                      <div key={i} className="p-3 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">{story.person}</span>
                          <span className="mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(249,115,22,0.1)", color: "#F97316" }}>{story.income}</span>
                        </div>
                        <p className="text-xs" style={{ color: "#94A3B8" }}>{story.method}</p>
                        <span className="mono text-xs mt-1 inline-block" style={{ color: "#475569" }}>{story.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    <Target className="w-4 h-4" style={{ color: "#38BDF8" }} />
                    Vaka Analizleri
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: "AI ile E-ticaret: Otomatik Ürün Açıklamaları", revenue: "+340%", metric: "Dönüşüm oranı artışı" },
                      { title: "Prompt Engineering ile AI Agent Gelir Modeli", revenue: "$28K", metric: "İlk 6 ay gelir" },
                      { title: "AI Video Üretimi: Pasif Gelir Stratejisi", revenue: "12 ay", metric: "Break-even süresi" },
                    ].map((cs, i) => (
                      <div key={i} className="p-3 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">{cs.title}</span>
                          <span className="mono text-xs font-bold" style={{ color: "#00E5A0" }}>{cs.revenue}</span>
                        </div>
                        <span className="text-xs" style={{ color: "#475569" }}>{cs.metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── 5. UI/UX Tasarım ── */}
            <section id="ux">
              <SectionHeader
                icon={<Cpu className="w-5 h-5" />}
                title="UI/UX Tasarım Sistemi"
                subtitle="06 — Renk, Tipografi ve Bileşenler"
                accent="#FCD34D"
              />
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Renk Paleti */}
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Renk Paleti</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Ana Arka Plan", hex: "#050B14", role: "Sayfa arkaplanı" },
                      { name: "Kart Arka Plan", hex: "#112240", role: "Kart ve panel" },
                      { name: "Vurgu (Neon Yeşil)", hex: "#00E5A0", role: "Butonlar, başarı" },
                      { name: "Bilgi (Elektrik Mavi)", hex: "#38BDF8", role: "Bilgi mesajları" },
                      { name: "Uyarı (Turuncu)", hex: "#F97316", role: "Tehdit uyarıları" },
                      { name: "Hata (Kırmızı)", hex: "#EF4444", role: "Kritik zafiyetler" },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex-shrink-0 border" style={{ background: c.hex, borderColor: "rgba(255,255,255,0.1)" }} />
                        <div className="flex-1">
                          <div className="text-sm text-white">{c.name}</div>
                          <div className="text-xs mono" style={{ color: "#475569" }}>{c.hex} — {c.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Tipografi */}
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Tipografi Sistemi</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Space Grotesk</div>
                      <div className="text-xs mono" style={{ color: "#475569" }}>Başlıklar — Bold 700 / SemiBold 600</div>
                    </div>
                    <div>
                      <div className="text-lg text-white mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Inter Regular</div>
                      <div className="text-xs mono" style={{ color: "#475569" }}>Gövde metni — Regular 400 / Medium 500</div>
                    </div>
                    <div>
                      <div className="text-sm mb-1 mono" style={{ color: "#00E5A0" }}>JetBrains Mono</div>
                      <div className="text-xs mono" style={{ color: "#475569" }}>Kod, veri, teknik içerik — 400/500</div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg" style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.1)" }}>
                      <div className="text-xs" style={{ color: "#94A3B8" }}>
                        Tüm etkileşimli öğeler minimum <strong style={{ color: "#00E5A0" }}>44×44px</strong> dokunma alanına sahiptir (WCAG 2.1 AA standardı).
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performans Optimizasyonları */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-white mb-5 flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  <Zap className="w-4 h-4" style={{ color: "#FCD34D" }} />
                  Performans Optimizasyonları
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Redis Önbellekleme", desc: "Sık kullanılan AI yanıtları ve tarama sonuçları önbellekte tutulur. API yükü %60 azalır.", metric: "60% ↓ API Yükü" },
                    { title: "CDN Entegrasyonu", desc: "Statik dosyalar ve model ağırlıkları Cloudflare CDN üzerinden düşük gecikmeyle sunulur.", metric: "<50ms Gecikme" },
                    { title: "Lazy Loading", desc: "Yalnızca aktif modüller yüklenir. Code splitting ile ilk yükleme süresi minimuma indirilir.", metric: "40% ↓ Bundle" },
                    { title: "WebSocket Streaming", desc: "AI yanıtları parçalı biçimde iletilir. Kullanıcı ilk token'ı 200ms içinde görür.", metric: "<200ms TTFT" },
                    { title: "DB Optimizasyonu", desc: "PostgreSQL'de query plan analizi, indeksleme ve PgBouncer connection pooling.", metric: "10x Sorgu Hızı" },
                    { title: "Asenkron İşleme", desc: "Uzun süren taramalar RabbitMQ üzerinden arka planda çalışır, UI bloke olmaz.", metric: "0ms UI Blokaj" },
                  ].map((opt, i) => (
                    <div key={i} className="p-4 rounded-lg" style={{ background: "rgba(252,211,77,0.03)", border: "1px solid rgba(252,211,77,0.1)" }}>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-white">{opt.title}</span>
                        <span className="mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(252,211,77,0.1)", color: "#FCD34D" }}>{opt.metric}</span>
                      </div>
                      <p className="text-xs" style={{ color: "#64748B" }}>{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── 6. Rakip Analizi ── */}
            <section id="competitors">
              <SectionHeader
                icon={<Target className="w-5 h-5" />}
                title="Rakip Analizi"
                subtitle="06 — Pazar Konumlandırma"
                accent="#FB7185"
              />
              {/* Competitor Table */}
              <div className="glass rounded-xl overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <th className="text-left p-4 font-semibold" style={{ color: "#94A3B8", fontFamily: "Space Grotesk, sans-serif" }}>Platform</th>
                        <th className="text-center p-4 font-semibold" style={{ color: "#94A3B8" }}>AI Yetenekleri</th>
                        <th className="text-center p-4 font-semibold" style={{ color: "#94A3B8" }}>Güvenlik</th>
                        <th className="text-center p-4 font-semibold" style={{ color: "#94A3B8" }}>Gizlilik</th>
                        <th className="text-center p-4 font-semibold" style={{ color: "#94A3B8" }}>Mobil</th>
                        <th className="text-center p-4 font-semibold" style={{ color: "#94A3B8" }}>Fiyat</th>
                        <th className="text-center p-4 font-semibold" style={{ color: "#94A3B8" }}>Toplam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitors.map((c, i) => (
                        <tr
                          key={i}
                          className="transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#00E5A0]/30"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.03)",
                            background: c.name === "AIPUSULA" ? "rgba(0,229,160,0.05)" : (activeCompetitor === c.name ? "rgba(255,255,255,0.03)" : "transparent"),
                          }}
                          onMouseEnter={() => setActiveCompetitor(c.name)}
                          onMouseLeave={() => setActiveCompetitor(null)}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                              <div>
                                <div className="font-medium" style={{ color: c.name === "AIPUSULA" ? "#00E5A0" : "#E2E8F0" }}>{c.name}</div>
                                <div className="text-xs" style={{ color: "#475569" }}>{c.company}</div>
                              </div>
                            </div>
                          </td>
                          {[c.ai, c.security, c.privacy, c.mobile].map((score, j) => (
                            <td key={j} className="p-4 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <span className="font-mono text-sm" style={{ color: score >= 80 ? "#00E5A0" : score >= 60 ? "#FCD34D" : "#FB7185" }}>{score}</span>
                                <div className="w-12 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                                  <div className="h-1 rounded-full" style={{ width: `${score}%`, background: score >= 80 ? "#00E5A0" : score >= 60 ? "#FCD34D" : "#FB7185" }} />
                                </div>
                              </div>
                            </td>
                          ))}
                          <td className="p-4 text-center mono text-xs" style={{ color: "#64748B" }}>{c.price}</td>
                          <td className="p-4 text-center">
                            <span className="font-bold mono" style={{ color: c.name === "AIPUSULA" ? "#00E5A0" : "#E2E8F0", fontSize: "1rem" }}>{c.total}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Çok Boyutlu Karşılaştırma</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <RadarChart data={competitorData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748B", fontSize: 11 }} />
                    <Radar name="AIPUSULA" dataKey="AIPUSULA" stroke="#00E5A0" fill="#00E5A0" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="ChatGPT" dataKey="ChatGPT" stroke="#74AA9C" fill="#74AA9C" fillOpacity={0.05} strokeWidth={1.5} />
                    <Radar name="Claude" dataKey="Claude" stroke="#CC785C" fill="#CC785C" fillOpacity={0.05} strokeWidth={1.5} />
                    <Radar name="Gemini" dataKey="Gemini" stroke="#4285F4" fill="#4285F4" fillOpacity={0.05} strokeWidth={1.5} />
                    <Legend wrapperStyle={{ color: "#94A3B8", fontSize: "12px" }} />
                    <Tooltip contentStyle={{ background: "#0D1B2A", border: "1px solid rgba(0,229,160,0.2)", borderRadius: "8px", color: "#E2E8F0" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* ── 7. Yol Haritası ── */}
            <section id="roadmap">
              <SectionHeader
                icon={<GitBranch className="w-5 h-5" />}
                title="12 Aylık Geliştirme Yol Haritası"
                subtitle="07 — MVP'den Tam Sürüme"
                accent="#A78BFA"
              />
              <div className="space-y-4">
                {roadmapData.map((phase, i) => (
                  <div key={i} className="glass rounded-xl p-5 hover:scale-[1.01] transition-all duration-300 card-glow cursor-pointer" style={{ borderLeft: `3px solid ${phase.color}` }}>
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="mono text-xs" style={{ color: phase.color }}>{phase.month}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${phase.color}15`, color: phase.color }}>
                            {phase.status === "critical" ? "KRİTİK" : phase.status === "high" ? "YÜKSEK" : phase.status === "launch" ? "LANSMAN" : "ORTA"}
                          </span>
                        </div>
                        <h4 className="font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{phase.phase}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.tasks.map((task, j) => (
                          <span key={j} className="text-xs px-2 py-1 rounded-md" style={{ background: "rgba(255,255,255,0.04)", color: "#64748B", border: "1px solid rgba(255,255,255,0.06)" }}>
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Sütun 5: Siber Güvenlik ── */}
            <section id="cybersecurity">
              <SectionHeader
                icon={<Shield className="w-5 h-5" />}
                title="Siber Güvenlik"
                subtitle="05 — Tehdit Haritası, Zafiyetler & Güvenlik"
                accent="#FB7185"
              />

              {/* Global Attack Map + Live Threat Counter */}
              <div className="grid lg:grid-cols-3 gap-4 mb-6">
                <div className="lg:col-span-2">
                  <AttackMap />
                </div>
                <div className="space-y-4">
                  <LiveThreatCounter />
                </div>
              </div>

              {/* AI Risk Score + CVE Feed */}
              <div className="grid lg:grid-cols-2 gap-4 mb-6">
                <AIRiskScore />
                <CVEFeed />
              </div>

              {/* Security News */}
              <div className="mb-6">
                <SecurityNews />
              </div>

              {/* Güvenlik Mimarisi */}
              <div className="glass rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-5 h-5" style={{ color: "#FB7185" }} />
                  <p className="text-sm" style={{ color: "#94A3B8" }}>
                    AIPUSULA'nın güvenlik mimarisi <strong style={{ color: "#FB7185" }}>Zero-Trust prensibi</strong> üzerine inşa edilmiştir. Hiçbir bileşen varsayılan olarak güvenilir kabul edilmez; her istek doğrulanır.
                  </p>
                </div>
                <div className="space-y-4">
                  {securityLayers.map((layer, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div>
                          <span className="text-sm font-medium text-white">{layer.layer}</span>
                          <span className="ml-2 text-xs mono" style={{ color: "#475569" }}>{layer.tech}</span>
                        </div>
                        <span className="mono text-sm font-bold" style={{ color: layer.color }}>{layer.level}%</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${layer.level}%`, background: `linear-gradient(90deg, ${layer.color}, ${layer.color}80)`, boxShadow: `0 0 8px ${layer.color}60` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Veri Şifreleme", items: ["AES-256 (at-rest)", "TLS 1.3 (in-transit)", "End-to-end şifreleme", "Key rotation politikası"], color: "#00E5A0", icon: <Lock className="w-4 h-4" /> },
                  { title: "AI Güvenliği (LLM)", items: ["Prompt injection koruması", "Output guardrails", "Hassas veri filtreleme", "Model davranış izleme"], color: "#38BDF8", icon: <Brain className="w-4 h-4" /> },
                  { title: "Erişim Kontrolü", items: ["RBAC + ABAC modeli", "MFA zorunluluğu", "Session yönetimi", "API rate limiting"], color: "#A78BFA", icon: <Shield className="w-4 h-4" /> },
                  { title: "İzleme & Yanıt", items: ["IDS/IPS entegrasyonu", "SIEM bağlantısı", "Otomatik tehdit yanıtı", "Penetrasyon testi"], color: "#F97316", icon: <Eye className="w-4 h-4" /> },
                ].map((sec, i) => (
                  <div key={i} className="glass rounded-xl p-5 card-glow">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg" style={{ background: `${sec.color}15`, color: sec.color }}>{sec.icon}</div>
                      <span className="font-semibold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{sec.title}</span>
                    </div>
                    <div className="space-y-1.5">
                      {sec.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full" style={{ background: sec.color }} />
                          <span className="text-xs" style={{ color: "#64748B" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── MVP Kontrol Listesi ── */}
            <section id="checklist">
              <SectionHeader
                icon={<CheckSquare className="w-5 h-5" />}
                title="MVP Kontrol Listesi"
                subtitle="08 — Lansman Öncesi Doğrulama"
                accent="#FCD34D"
              />
              <div className="glass rounded-xl p-6 mb-4">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm" style={{ color: "#94A3B8" }}>
                    Tamamlanan: <strong style={{ color: "#00E5A0" }}>{checkedItems.length}</strong> / {checklistItems.length}
                  </p>
                  <div className="flex-1 mx-6 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(checkedItems.length / checklistItems.length) * 100}%`, background: "linear-gradient(90deg, #00E5A0, #38BDF8)" }}
                    />
                  </div>
                  <span className="mono text-sm" style={{ color: "#00E5A0" }}>{Math.round((checkedItems.length / checklistItems.length) * 100)}%</span>
                </div>
                <div className="space-y-2">
                  {checklistItems.map((item) => {
                    const priorityColors: Record<string, string> = { P0: "#EF4444", P1: "#F97316", P2: "#FCD34D", P3: "#94A3B8" };
                    const isChecked = checkedItems.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30 active:scale-[0.99]"
                        style={{ background: isChecked ? "rgba(0,229,160,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${isChecked ? "rgba(0,229,160,0.2)" : "rgba(255,255,255,0.04)"}` }}
                        onClick={() => toggleCheck(item.id)}
                      >
                        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: isChecked ? "#00E5A0" : "rgba(255,255,255,0.05)", border: isChecked ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
                          {isChecked && <span className="text-black text-xs font-bold">✓</span>}
                        </div>
                        <span className="flex-1 text-sm" style={{ color: isChecked ? "#64748B" : "#E2E8F0", textDecoration: isChecked ? "line-through" : "none" }}>
                          {item.task}
                        </span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="mono text-xs px-1.5 py-0.5 rounded" style={{ background: `${priorityColors[item.priority]}15`, color: priorityColors[item.priority] }}>{item.priority}</span>
                          <span className="text-xs" style={{ color: "#334155" }}>{item.category}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t py-8 glass" style={{ borderColor: "rgba(0,229,160,0.15)" }}>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center pulse-dot" style={{ background: "linear-gradient(135deg, #00E5A0, #38BDF8)", color: "#00E5A0" }}>
              <Shield className="w-3 h-3 text-black" />
            </div>
            <span className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>AIPUSULA</span>
            <span className="text-xs" style={{ color: "#475569" }}>MVP Platform Raporu — Temmuz 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs mono" style={{ color: "#475569" }}>v1.0.0-MVP</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#00E5A0", color: "#00E5A0" }} />
              <span className="text-xs" style={{ color: "#475569" }}>Hazır</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
