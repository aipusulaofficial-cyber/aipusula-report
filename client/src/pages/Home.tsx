/**
 * AIPUSULA Ana Sayfa
 * Design: Cyber Noir — Dark Brutalism meets Cyberpunk Professionalism
 * Color: #00E5A0 (neon green signature), #38BDF8 (info), #F97316/#EF4444 (threats)
 * Typography: Space Grotesk (display), JetBrains Mono (data), Inter (body)
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Brain, Cpu, DollarSign, Globe, Shield, TrendingUp,
  ChevronRight, Zap, Clock, ArrowRight
} from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Category Overview Cards ─────────────────────────────────────────────────
const categoryCards = [
  {
    id: "yapay-zeka",
    path: "/yapay-zeka",
    label: "Yapay Zekâ",
    subtitle: "Haberler, Modeller & Trendler",
    description: "GPT-5, Claude 4, Gemini 2.0 ve sektörün en güncel gelişmeleri",
    color: "#06B6D4",
    icon: <Brain className="w-5 h-5" />,
    stat: "247+ Makale",
    statLabel: "Bu hafta",
  },
  {
    id: "ai-araclari",
    path: "/ai-araclari",
    label: "AI Araçları",
    subtitle: "Katalog & Karşılaştırma",
    description: "500+ AI araç kataloğu, detaylı karşılaştırmalar ve kullanım rehberleri",
    color: "#38BDF8",
    icon: <Cpu className="w-5 h-5" />,
    stat: "512 Araç",
    statLabel: "Katalogda",
  },
  {
    id: "ai-ile-kazanc",
    path: "/ai-ile-kazanc",
    label: "AI ile Kazanç",
    subtitle: "Rehberler & İş Fikirleri",
    description: "Freelancing, SaaS, YouTube, affiliate — AI ile gelir üretme yolları",
    color: "#FCD34D",
    icon: <DollarSign className="w-5 h-5" />,
    stat: "38 Rehber",
    statLabel: "Hazır",
  },
  {
    id: "dijital-dunya",
    path: "/dijital-dunya",
    label: "Dijital Dünya",
    subtitle: "Teknoloji & Yazılım",
    description: "Yazılım ekosistemi, bulut teknolojileri, Web3 ve dijital girişimler",
    color: "#A78BFA",
    icon: <Globe className="w-5 h-5" />,
    stat: "1.2K+ İçerik",
    statLabel: "Arşivde",
  },
  {
    id: "siber-guvenlik",
    path: "/siber-guvenlik",
    label: "Siber Güvenlik",
    subtitle: "Tehdit Analizi & Koruması",
    description: "Gerçek zamanlı tehdit izleme, CVE analizi ve güvenlik araçları",
    color: "#F97316",
    icon: <Shield className="w-5 h-5" />,
    stat: "12 Canlı",
    statLabel: "Tehdit uyarısı",
  },
];

// ─── Recent Activity ─────────────────────────────────────────────────────────
const recentActivity = [
  { title: "OpenAI GPT-5: Multimodal Reasoning & Agentic AI", category: "Yapay Zekâ", time: "2 saat önce", color: "#06B6D4" },
  { title: "Cursor 2.0 — AI Kod Asistanı Güncellemesi", category: "AI Araçları", time: "4 saat önce", color: "#38BDF8" },
  { title: "AI Freelancing ile Aylık $5K Kazanç Rehberi", category: "AI ile Kazanç", time: "6 saat önce", color: "#FCD34D" },
  { title: "React 20 ile Server Components Yaygınlaşıyor", category: "Dijital Dünya", time: "8 saat önce", color: "#A78BFA" },
  { title: "CVE-2026-12847: Linux Kernel Yetki Yükseltme", category: "Siber Güvenlik", time: "12 saat önce", color: "#F97316" },
];

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AppShell>
      {isDark && <CyberBackground />}

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden py-8 intel-grid-bg intel-scanline">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(0,229,160,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(56,189,248,0.04) 0%, transparent 50%)",
        }} />

        <div className="relative z-10">
          {/* Breadcrumb-style label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ background: "#00E5A0" }} />
            <span className="mono text-xs uppercase tracking-[0.25em]" style={{ color: "#00E5A0" }}>
              // YAPAY ZEKÂ & DİJİTAL DÜNYA
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-black leading-none" style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
          }}>
            <span>AI</span><span style={{ color: "#00E5A0", textShadow: "0 0 60px rgba(0,229,160,0.5), 0 0 120px rgba(0,229,160,0.2)" }}>PUSULA</span>
          </h1>

          <div className="mono text-[0.85rem] mt-3" style={{
            color: "#38BDF8",
            letterSpacing: "0.2em",
            textShadow: "0 0 20px rgba(56,189,248,0.3)",
          }}>
            YAPAY ZEKÂ & DİJİTAL DÜNYA'NIN PUSULASI
          </div>

          <p className="text-sm mt-3 max-w-xl leading-relaxed" style={{ color: "#64748B" }}>
            Yapay zekâ, dijital araçlar ve siber güvenliği birleştiren premium platform.
            Her kategori kendi uzmanlığıyla öne çıkan bağımsız bir içerik merkezi olarak tasarlandı.
          </p>

          {/* Intel Data Strip */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="data-strip">
              KATEGORİ: 5 AKTİF
            </div>
            <div className="data-strip">
              İÇERİK: 1,247 PARÇA
            </div>
            <div className="data-strip">
              GÜNCELLEME: {currentTime.toLocaleTimeString('tr-TR')}
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 mt-5">
            {[
              { value: "5", label: "Kategori", color: "#00E5A0" },
              { value: "512", label: "AI Araç", color: "#38BDF8" },
              { value: "247", label: "Makale", color: "#A78BFA" },
              { value: "24/7", label: "Tehdit İzleme", color: "#F97316" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.25rem", color: s.color }}>
                  {s.value}
                </span>
                <span className="mono text-xs" style={{ color: "#475569" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Hub Grid ── */}
      <section className="mt-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(0,229,160,0.3), rgba(0,229,160,0.1), transparent)" }} />
          <span className="mono text-xs uppercase tracking-widest" style={{ color: "#00E5A0" }}>İçerik Merkezleri</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, rgba(0,229,160,0.3), rgba(0,229,160,0.1), transparent)" }} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryCards.map((cat) => (
            <Link key={cat.id} href={cat.path}>
              <div className="glass rounded-xl p-5 h-full cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                style={{ borderLeft: `3px solid ${cat.color}` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg" style={{ background: `${cat.color}10` }}>
                    <div style={{ color: cat.color }}>{cat.icon}</div>
                  </div>
                  <span className="mono text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${cat.color}10`, color: cat.color }}>
                    {cat.stat}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {cat.label}
                </h3>
                <p className="text-xs mb-2" style={{ color: cat.color }}>{cat.subtitle}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{cat.description}</p>
                <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: cat.color, opacity: 0.7 }}>
                  <span>Keşfet</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent Activity Feed ── */}
      <section className="mt-10">
        <div className="flex items-center gap-3 mb-5">
          <Clock className="w-4 h-4" style={{ color: "#38BDF8" }} />
          <span className="mono text-xs uppercase tracking-widest" style={{ color: "#38BDF8" }}>Son Aktivite</span>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 border-b last:border-b-0 transition-colors hover:bg-white/[0.02]"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}40` }} />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-white">{item.title}</span>
              </div>
              <span className="text-xs flex-shrink-0 px-2 py-0.5 rounded-full" style={{ background: `${item.color}10`, color: item.color }}>
                {item.category}
              </span>
              <span className="text-xs flex-shrink-0" style={{ color: "#475569" }}>{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Platform Metrics ── */}
      <section className="mt-10">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4" style={{ color: "#00E5A0" }} />
            <span className="mono text-xs uppercase tracking-widest" style={{ color: "#00E5A0" }}>Platform Metrikleri</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Aktif Kullanıcı", value: "12,847", change: "+12.4%", color: "#00E5A0" },
              { label: "Toplam İçerik", value: "1,247", change: "+28", color: "#38BDF8" },
              { label: "Günlük Görüntüleme", value: "48.2K", change: "+8.1%", color: "#A78BFA" },
              { label: "Ortalama Süre", value: "4:32", change: "+0:18", color: "#FCD34D" },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="text-xs mb-1" style={{ color: "#475569" }}>{m.label}</div>
                <div className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.5rem", color: m.color }}>{m.value}</div>
                <div className="text-xs mt-1" style={{ color: "#00E5A0" }}>{m.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Access ── */}
      <section className="mt-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "AI Araçlarını Keşfet", path: "/ai-araclari", color: "#38BDF8", icon: <Cpu className="w-4 h-4" /> },
            { label: "Son Güvenlik Uyarıları", path: "/siber-guvenlik", color: "#F97316", icon: <Shield className="w-4 h-4" /> },
            { label: "AI ile Kazanmaya Başla", path: "/ai-ile-kazanc", color: "#FCD34D", icon: <DollarSign className="w-4 h-4" /> },
          ].map((cta, i) => (
            <Link key={i} href={cta.path}>
              <button className="w-full flex items-center gap-3 px-5 py-4 rounded-xl glass text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                style={{ border: `1px solid ${cta.color}20` }}>
                <div className="p-2 rounded-lg" style={{ background: `${cta.color}10`, color: cta.color }}>
                  {cta.icon}
                </div>
                <span className="text-sm font-medium text-white flex-1">{cta.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: cta.color }} />
              </button>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
