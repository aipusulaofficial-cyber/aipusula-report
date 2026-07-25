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
    <div className="relative w-72 h-72 flex-shrink-0">
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
    <div className="mb-10 section-glow-green">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 rounded-lg glass" style={{ borderColor: `${accent}30` }}>
          <div style={{ color: accent }}>{icon}</div>
        </div>
        <span className="mono text-xs uppercase tracking-widest" style={{ color: accent, textShadow: `0 0 12px ${accent}40` }}>
          {subtitle}
        </span>
      </div>
      <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif", textShadow: "0 0 40px rgba(0,229,160,0.15)" }}>
        {title}
      </h2>
      <div className="mt-3 h-px w-32" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80, transparent)` }} />
    </div>
  );
}


// ─── System Status Bar ───────────────────────────────────────────────────────
function SystemStatusBar() {
  const statuses = [
    { label: "THREAT LEVEL", value: "ELEVATED", color: "#F97316" },
    { label: "AI ENGINE", value: "ONLINE", color: "#00E5A0" },
    { label: "SCANNER", value: "ACTIVE", color: "#00E5A0" },
    { label: "CVE FEED", value: "LIVE", color: "#38BDF8" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-4 py-2 px-4 border-b" style={{ borderColor: "rgba(0,229,160,0.08)", background: "rgba(0,229,160,0.02)" }}>
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
  const [activeTab, setActiveTab] = useState("overview");
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [activeCompetitor, setActiveCompetitor] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const navItems = [
    { id: "dashboard", label: "Güvenlik Merkezi", icon: <Shield className="w-4 h-4" /> },
    { id: "overview", label: "Genel Bakış", icon: <Eye className="w-4 h-4" /> },
    { id: "market", label: "Pazar Analizi", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "architecture", label: "Mimari", icon: <Layers className="w-4 h-4" /> },
    { id: "security", label: "Güvenlik", icon: <Shield className="w-4 h-4" /> },
    { id: "ux", label: "UI/UX Tasarım", icon: <Cpu className="w-4 h-4" /> },
    { id: "competitors", label: "Rakip Analizi", icon: <Target className="w-4 h-4" /> },
    { id: "roadmap", label: "Yol Haritası", icon: <GitBranch className="w-4 h-4" /> },
    { id: "revenue", label: "Gelir Modeli", icon: <DollarSign className="w-4 h-4" /> },
    { id: "checklist", label: "Kontrol Listesi", icon: <CheckSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen grid-bg" style={{ background: "#050B14", fontFamily: "Inter, sans-serif" }}>
      {/* ── Cyber Background ── */}
      {!isMobile && <CyberBackground />}
      {/* ── Noise Texture ── */}
      <div className="noise-overlay" />
      {/* ── Top Navigation ── */}
      <header className="sticky top-0 z-50 border-b glass" style={{ borderColor: "rgba(0,229,160,0.2)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center pulse-dot" style={{ background: "linear-gradient(135deg, #00E5A0, #38BDF8)", color: "#00E5A0" }}>
              <Shield className="w-4 h-4 text-black" />
            </div>
            <div>
              <span className="font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem" }}>AIPUSULA</span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full mono" style={{ background: "rgba(0,229,160,0.15)", color: "#00E5A0" }}>MVP Raporu</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.slice(0, 5).map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all duration-200"
                style={{
                  color: activeTab === item.id ? "#00E5A0" : "#94A3B8",
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

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden hex-bg hero-glow" style={{ minHeight: "560px" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 15% 60%, rgba(0,229,160,0.12) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(56,189,248,0.09) 0%, transparent 45%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.8) 0%, transparent 60%), radial-gradient(ellipse at 30% 30%, rgba(167,139,250,0.04) 0%, transparent 40%)" }} />
        <div className="container relative z-10 py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            {/* Left: Text */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: "#00E5A0" }} />
                <span className="mono text-xs uppercase tracking-widest" style={{ color: "#00E5A0" }}>// YAPAY ZEKÂ & SİBER GÜVENLİK PLATFORMU</span>
              </div>
              <h1 className="font-black leading-none mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(3.5rem, 8vw, 6rem)", letterSpacing: "-0.02em" }}>
                <span className="text-white">AI</span><span style={{ color: "#00E5A0", textShadow: "0 0 40px rgba(0,229,160,0.4)" }}>PUSULA</span>
              </h1>
              <div className="mono text-sm mb-6" style={{ color: "#38BDF8", letterSpacing: "0.15em" }}>
                GÜVENLİĞİN YAPAY ZEKÂ PUSULASI
              </div>
              <div className="mb-6 p-4 rounded" style={{ background: "rgba(0,229,160,0.04)", borderLeft: "3px solid #00E5A0" }}>
                <p className="text-base leading-relaxed" style={{ color: "#94A3B8" }}>
                  Yapay zekâ yeteneklerini siber güvenlik uzmanlığıyla birleştiren dünya standartlarında bir platform için kapsamlı <strong style={{ color: "#E2E8F0" }}>mimari, strateji ve geliştirme planı</strong>.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { label: "Proje Mimarisi", color: "#00E5A0" },
                  { label: "Güvenlik Tasarımı", color: "#38BDF8" },
                  { label: "Rakip Analizi", color: "#A78BFA" },
                  { label: "12 Ay Yol Haritası", color: "#F97316" },
                  { label: "Gelir Modeli", color: "#FCD34D" },
                ].map(tag => (
                  <span key={tag.label} className="px-3 py-1 rounded text-xs mono" style={{ borderLeft: `2px solid ${tag.color}`, color: tag.color, background: `${tag.color}08` }}>
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Bölüm", value: "9" },
                  { label: "Sayfa", value: "6" },
                  { label: "Kontrol", value: "16" },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 rounded-lg glass" style={{ borderColor: "rgba(0,229,160,0.15)" }}>
                    <div className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#00E5A0", textShadow: "0 0 20px rgba(0,229,160,0.3)" }}>{s.value}</div>
                    <div className="mono text-xs mt-1" style={{ color: "#64748B" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: Radar */}
              <div className="hidden lg:flex flex-col items-center gap-4">
              <RadarCompass />
              <div className="glass rounded-lg px-4 py-2">
                <div className="mono text-xs text-center" style={{ color: "#475569" }}>
                  THREAT DETECTION RADAR<br />
                  <span style={{ color: "#00E5A0", textShadow: "0 0 10px rgba(0,229,160,0.5)" }}>3 ACTIVE SIGNALS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KPI Cards ── */}
      <section className="container pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Pazar Büyüklüğü (2026)", value: 39.2, suffix: "B$", icon: <Globe className="w-5 h-5" />, color: "#00E5A0", desc: "AI Siber Güvenlik" },
            { label: "CAGR Büyüme Oranı", value: 27.8, suffix: "%", icon: <TrendingUp className="w-5 h-5" />, color: "#38BDF8", desc: "2025-2026 arası" },
            { label: "Hedef Kullanıcı", value: 50000, suffix: "+", icon: <Users className="w-5 h-5" />, color: "#A78BFA", desc: "12. Ayda" },
            { label: "Geliştirme Süresi", value: 12, suffix: " Ay", icon: <Clock className="w-5 h-5" />, color: "#F97316", desc: "MVP → Tam Sürüm" },
          ].map((kpi, i) => (
            <div key={i} className="glass card-glow p-5 rounded-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: `${kpi.color}15`, color: kpi.color }}>
                  {kpi.icon}
                </div>
                <span className="mono text-xs" style={{ color: "#475569" }}>#{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                <AnimatedCounter target={kpi.value} suffix={kpi.suffix} />
              </div>
              <div className="text-xs font-medium mb-0.5" style={{ color: kpi.color }}>{kpi.label}</div>
              <div className="text-xs" style={{ color: "#475569" }}>{kpi.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sidebar + Content Layout ── */}
      <div className="container pb-20">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-20">
              <div className="glass rounded p-0 overflow-hidden animated-border">
                <div className="px-4 py-3 flex items-center gap-2" style={{ background: "rgba(0,229,160,0.05)", borderBottom: "1px solid rgba(0,229,160,0.1)" }}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: "#FCD34D" }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: "#00E5A0" }} />
                  </div>
                  <span className="mono text-xs" style={{ color: "#334155" }}>navigation.sys</span>
                </div>
                <div className="p-3">
                <p className="mono text-xs uppercase tracking-widest mb-3 px-1" style={{ color: "#334155" }}>// INDEX</p>
                <nav className="space-y-1">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-all duration-200 text-left"
                      style={{
                        color: activeTab === item.id ? "#00E5A0" : "#64748B",
                        background: activeTab === item.id ? "rgba(0,229,160,0.08)" : "transparent",
                        borderLeft: activeTab === item.id ? "2px solid #00E5A0" : "2px solid transparent",
                        fontFamily: activeTab === item.id ? "JetBrains Mono, monospace" : "inherit",
                        fontSize: "0.8rem",
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-4 pt-3 border-t" style={{ borderColor: "rgba(0,229,160,0.08)" }}>
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
          <main className="flex-1 min-w-0 space-y-20">

            {/* ── Enterprise Dashboard (New) ── */}
            <section id="dashboard">
              <SectionHeader
                icon={<Shield className="w-5 h-5" />}
                title="Enterprise Güvenlik Merkezi"
                subtitle="00 — Canlı Güvenlik Operasyon Merkezi"
                accent="#38BDF8"
              />
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AttackMap />
                </div>
                <div className="space-y-6">
                  <LiveThreatCounter />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-6 mt-6">
                <AIRiskScore />
                <CVEFeed />
              </div>
              <div className="mt-6">
                <SecurityNews />
              </div>
            </section>

            {/* ── 1. Genel Bakış ── */}
            <section id="overview">
              <SectionHeader
                icon={<Eye className="w-5 h-5" />}
                title="Yönetici Özeti"
                subtitle="01 — Genel Bakış"
              />
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Platform Vizyonu</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                    AIPUSULA, yapay zekâ yeteneklerini siber güvenlik uzmanlığıyla birleştiren çok katmanlı bir platform olarak tasarlanmıştır. Bireysel kullanıcılar ve kurumsal müşteriler için AI destekli güvenlik tarama, tehdit analizi ve akıllı asistan hizmetleri sunar.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#00E5A0", color: "#00E5A0" }} />
                    <span className="text-xs mono" style={{ color: "#00E5A0" }}>Güvenliğin Yapay Zekâ Pusulası</span>
                  </div>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Temel Farklılaşma</h3>
                  <div className="space-y-3">
                    {[
                      "AI + Siber Güvenlik entegrasyonu (piyasada tek)",
                      "Gerçek zamanlı tehdit tarama ve analizi",
                      "Mobil öncelikli tasarım ve Play Store desteği",
                      "Kurumsal API erişimi ve özel izleme",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#00E5A0" }} />
                        <span className="text-sm" style={{ color: "#94A3B8" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sayfa Planlaması */}
              <h3 className="text-xl font-semibold text-white mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Sayfa Planlaması</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Dashboard", icon: <BarChart2 className="w-5 h-5" />, desc: "Güvenlik skor kartı, AI kullanım istatistikleri, canlı tehdit haritası, son 24 saat aktivitesi", color: "#00E5A0" },
                  { name: "AI Tools", icon: <Brain className="w-5 h-5" />, desc: "Zafiyet analizörü, kod güvenlik tarayıcısı, phishing metin analizörü, zararlı yazılım tarayıcısı", color: "#38BDF8" },
                  { name: "Chat", icon: <Cpu className="w-5 h-5" />, desc: "Multi-modal AI asistan, geçmiş konuşmalar, dosya yükleme, güvenlik kaynaklı yanıtlar", color: "#A78BFA" },
                  { name: "News", icon: <Globe className="w-5 h-5" />, desc: "CVE duyuruları, güvenlik haberleri, tehdit seviyesi filtreleme, sektör analizleri", color: "#F97316" },
                  { name: "Security Scanner", icon: <Search className="w-5 h-5" />, desc: "URL/IP/Domain tarama, gerçek zamanlı ilerleme, zafiyet puanı, PDF rapor indirme", color: "#FB7185" },
                  { name: "Profile", icon: <Users className="w-5 h-5" />, desc: "Kullanıcı profili, abonelik yönetimi, MFA ayarları, API anahtarı yönetimi", color: "#FCD34D" },
                ].map((page, i) => (
                  <div key={i} className="glass rounded-xl p-5 hover:scale-[1.02] transition-all duration-300 card-glow" style={{ cursor: "default" }}>
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
            </section>

            {/* ── 2. Pazar Analizi ── */}
            <section id="market">
              <SectionHeader
                icon={<TrendingUp className="w-5 h-5" />}
                title="Pazar Analizi"
                subtitle="02 — Büyüme ve Fırsatlar"
                accent="#38BDF8"
              />
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
            </section>

            {/* ── 3. Mimari ── */}
            <section id="architecture">
              <SectionHeader
                icon={<Layers className="w-5 h-5" />}
                title="Proje Mimarisi"
                subtitle="03 — Teknoloji Yığını"
                accent="#A78BFA"
              />
              <div className="space-y-3 mb-8">
                {techStack.map((item, i) => (
                  <div key={i} className="glass rounded-xl p-4 flex items-start gap-4 hover:border-purple-500/30 transition-colors duration-300 card-glow">
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

            {/* ── 4. Güvenlik ── */}
            <section id="security">
              <SectionHeader
                icon={<Shield className="w-5 h-5" />}
                title="Güvenlik Mimarisi"
                subtitle="04 — Zero-Trust Güvenlik"
                accent="#FB7185"
              />
              <div className="glass rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-5 h-5" style={{ color: "#F97316" }} />
                  <p className="text-sm" style={{ color: "#94A3B8" }}>
                    AIPUSULA'nın güvenlik mimarisi <strong style={{ color: "#F97316" }}>Zero-Trust prensibi</strong> üzerine inşa edilmiştir. Hiçbir bileşen varsayılan olarak güvenilir kabul edilmez; her istek doğrulanır.
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

            {/* ── 5. UI/UX Tasarım ── */}
            <section id="ux">
              <SectionHeader
                icon={<Cpu className="w-5 h-5" />}
                title="UI/UX Tasarım Sistemi"
                subtitle="05 — Renk, Tipografi ve Bileşenler"
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
                          className="transition-colors duration-150 cursor-pointer"
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
                  <div key={i} className="glass rounded-xl p-5 hover:scale-[1.01] transition-all duration-300 card-glow" style={{ borderLeft: `3px solid ${phase.color}` }}>
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

            {/* ── 8. Gelir Modeli ── */}
            <section id="revenue">
              <SectionHeader
                icon={<DollarSign className="w-5 h-5" />}
                title="Gelir Modeli"
                subtitle="08 — Monetizasyon Stratejisi"
                accent="#00E5A0"
              />
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { plan: "Free", price: "$0", period: "Sonsuza dek", features: ["Temel AI sohbet", "Günde 5 tarama", "Sınırlı haber akışı", "Topluluk desteği"], color: "#94A3B8", highlight: false },
                  { plan: "Pro", price: "$19.99", period: "/ay", features: ["Sınırsız AI araçları", "Günde 50 tarama", "CVE öncelikli bildirim", "Öncelikli destek", "API erişimi (1000 req/gün)"], color: "#00E5A0", highlight: true },
                  { plan: "Enterprise", price: "Özel", period: "Fiyat", features: ["Sınırsız her şey", "Özel güvenlik izleme", "SLA garantisi", "Dedicated destek", "Custom entegrasyonlar"], color: "#38BDF8", highlight: false },
                ].map((plan, i) => (
                  <div key={i} className="glass rounded-xl p-6 relative card-glow" style={{ borderColor: plan.highlight ? "rgba(0,229,160,0.4)" : undefined, boxShadow: plan.highlight ? "0 0 30px rgba(0,229,160,0.1)" : undefined }}>
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#00E5A0", color: "#050B14" }}>
                        En Popüler
                      </div>
                    )}
                    <div className="mb-4">
                      <div className="text-sm mb-2" style={{ color: plan.color }}>{plan.plan}</div>
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{plan.price}</span>
                        <span className="text-sm mb-1" style={{ color: "#475569" }}>{plan.period}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {plan.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: plan.color }} />
                          <span className="text-xs" style={{ color: "#94A3B8" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Tahmini Gelir Büyümesi ($)</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} />
                      <YAxis stroke="#475569" tick={{ fill: "#64748B", fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "#0D1B2A", border: "1px solid rgba(0,229,160,0.2)", borderRadius: "8px", color: "#E2E8F0" }} />
                      <Legend wrapperStyle={{ color: "#94A3B8", fontSize: "11px" }} />
                      <Bar dataKey="free" name="Free" fill="#334155" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="pro" name="Pro" fill="#00E5A0" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="enterprise" name="Enterprise" fill="#38BDF8" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Gelir Dağılımı (12. Ay)</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={revenueShareData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                        {revenueShareData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#0D1B2A", border: "1px solid rgba(0,229,160,0.2)", borderRadius: "8px", color: "#E2E8F0" }} formatter={(v) => [`${v}%`, ""]} />
                      <Legend wrapperStyle={{ color: "#94A3B8", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* ── 9. Kontrol Listesi ── */}
            <section id="checklist">
              <SectionHeader
                icon={<CheckSquare className="w-5 h-5" />}
                title="MVP Kontrol Listesi"
                subtitle="09 — Lansman Öncesi Doğrulama"
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
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150"
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
