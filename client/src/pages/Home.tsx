/**
 * AIPUSULA Ana Sayfa
 * Design: Cyber Noir — Dark Brutalism meets Cyberpunk Professionalism
 * Color: #00E5A0 (neon green signature), #38BDF8 (info), #F97316/#EF4444 (threats)
 * Typography: Space Grotesk (display), JetBrains Mono (data), Inter (body)
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Brain, Cpu, DollarSign, Globe, Shield,
  ChevronRight, Clock, ArrowRight,
  BookOpen, TrendingUp, Star
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
  {
    id: "rehberler",
    path: "/yapay-zeka",
    label: "Rehberler & Eğitim",
    subtitle: "Başlangıç, Prompt & Yol Haritaları",
    description: "Başlangıç rehberleri, prompt mühendisliği, öğrenme yol haritaları ve eğitim içerikleri",
    color: "#00E5A0",
    icon: <BookOpen className="w-5 h-5" />,
    stat: "64+ Rehber",
    statLabel: "Güncel",
  },
  {
    id: "trendler",
    path: "/yapay-zeka",
    label: "Trendler & Analizler",
    subtitle: "Haftanın Trendleri & Raporlar",
    description: "Haftalık trendler, AI raporları, pazar analizleri ve gelecek öngörüleri",
    color: "#EC4899",
    icon: <TrendingUp className="w-5 h-5" />,
    stat: "15 Trend",
    statLabel: "Aktif",
  },
  {
    id: "editor-secimi",
    path: "/ai-araclari",
    label: "Editörün Seçimi",
    subtitle: "En İyi Makaleler & Keşifler",
    description: "En iyi makaleler, öne çıkan AI araçları, haftanın keşifleri ve özel dosyalar",
    color: "#F59E0B",
    icon: <Star className="w-5 h-5" />,
    stat: "24 Seçim",
    statLabel: "Haftalık",
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
      <section className="relative overflow-hidden py-3 intel-grid-bg intel-scanline">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 15% 50%, rgba(0,229,160,0.06) 0%, transparent 50%), radial-gradient(ellipse at 85% 40%, rgba(56,189,248,0.04) 0%, transparent 40%)",
        }} />

        <div className="relative z-10 flex items-center justify-between gap-8">
          {/* Left: Title + description */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-px w-6" style={{ background: "#00E5A0" }} />
              <span className="mono text-[0.6rem] uppercase tracking-[0.25em]" style={{ color: "#00E5A0" }}>
                // YAPAY ZEKÂ & DİJİTAL DÜNYA
              </span>
            </div>
            <h1 className="font-black leading-[0.88]" style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
            }}>
              <span>AI</span><span style={{ color: "#00E5A0", textShadow: "0 0 60px rgba(0,229,160,0.5), 0 0 120px rgba(0,229,160,0.2)" }}>PUSULA</span>
            </h1>
            <div className="mono text-[0.65rem] mt-1" style={{
              color: "#38BDF8",
              letterSpacing: "0.2em",
              textShadow: "0 0 20px rgba(56,189,248,0.3)",
            }}>
              YAPAY ZEKÂ & DİJİTAL DÜNYA'NIN PUSULASI
            </div>
            <p className="text-[0.75rem] mt-1.5 max-w-md leading-relaxed" style={{ color: "#64748B" }}>
              Yapay zekâ, dijital araçlar ve siber güvenliği birleştiren premium platform.
              Her kategori kendi uzmanlığıyla öne çıkan bağımsız bir içerik merkezi olarak tasarlandı.
            </p>
          </div>

          {/* Right: Animated AI Network Visualization */}
          <div className="flex-1 flex items-center justify-end">
            <div className="relative w-64 h-32">
              {/* Canvas-based animated network */}
              <canvas
                ref={(el) => {
                  if (!el || el.dataset.bound) return;
                  el.dataset.bound = "1";
                  const ctx = el.getContext("2d")!;
                  const w = (el.width = el.offsetWidth * 2);
                  const h = (el.height = el.offsetHeight * 2);
                  ctx.scale(2, 2);
                  const realW = el.offsetWidth;
                  const realH = el.offsetHeight;

                  // Nodes
                  const nodes = Array.from({ length: 18 }, () => ({
                    x: Math.random() * realW,
                    y: Math.random() * realH,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: 1.5 + Math.random() * 2,
                    color: ["#00E5A0", "#38BDF8", "#A78BFA"][Math.floor(Math.random() * 3)],
                  }));

                  let animId: number;
                  const draw = () => {
                    ctx.clearRect(0, 0, realW, realH);
                    // Update positions
                    nodes.forEach(n => {
                      n.x += n.vx;
                      n.y += n.vy;
                      if (n.x < 0 || n.x > realW) n.vx *= -1;
                      if (n.y < 0 || n.y > realH) n.vy *= -1;
                    });

                    // Draw connections
                    const maxDist = 70;
                    for (let i = 0; i < nodes.length; i++) {
                      for (let j = i + 1; j < nodes.length; j++) {
                        const dx = nodes[i].x - nodes[j].x;
                        const dy = nodes[i].y - nodes[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < maxDist) {
                          const alpha = (1 - dist / maxDist) * 0.3;
                          ctx.beginPath();
                          ctx.moveTo(nodes[i].x, nodes[i].y);
                          ctx.lineTo(nodes[j].x, nodes[j].y);
                          ctx.strokeStyle = `rgba(0, 229, 160, ${alpha})`;
                          ctx.lineWidth = 0.5;
                          ctx.stroke();
                        }
                      }
                    }

                    // Draw nodes with glow
                    nodes.forEach(n => {
                      ctx.beginPath();
                      ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
                      ctx.fillStyle = n.color.replace(")", ", 0.08)").replace("rgb", "rgba");
                      ctx.fill();
                      ctx.beginPath();
                      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                      ctx.fillStyle = n.color;
                      ctx.fill();
                    });

                    animId = requestAnimationFrame(draw);
                  };
                  draw();
                }}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Hub Grid (8 Discovery Centers) ── */}
      <section className="mt-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(0,229,160,0.3), rgba(0,229,160,0.1), transparent)" }} />
          <span className="mono text-xs uppercase tracking-widest" style={{ color: "#00E5A0" }}>İçerik Merkezleri</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, rgba(0,229,160,0.3), rgba(0,229,160,0.1), transparent)" }} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categoryCards.map((cat) => (
            <Link key={cat.id} href={cat.path}>
              <div className="glass rounded-lg p-3 cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                style={{ borderLeft: `3px solid ${cat.color}` }}>
                <div className="flex items-start justify-between mb-1.5">
                  <div className="p-1 rounded-md" style={{ background: `${cat.color}10` }}>
                    <div style={{ color: cat.color }}>{cat.icon}</div>
                  </div>
                  <span className="mono text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${cat.color}10`, color: cat.color }}>
                    {cat.stat}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-0.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {cat.label}
                </h3>
                <p className="text-[11px] mb-0.5" style={{ color: cat.color }}>{cat.subtitle}</p>
                <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "#64748B" }}>{cat.description}</p>
                <div className="flex items-center gap-1 mt-1.5 text-[11px]" style={{ color: cat.color, opacity: 0.7 }}>
                  <span>Keşfet</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent Activity Feed ── */}
      <section className="mt-3">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-4 h-4" style={{ color: "#38BDF8" }} />
          <span className="mono text-xs uppercase tracking-widest" style={{ color: "#38BDF8" }}>Son Aktivite</span>
        </div>

        <div className="glass rounded-lg overflow-hidden">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 border-b last:border-b-0 transition-colors hover:bg-white/[0.02]"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}40` }} />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-white">{item.title}</span>
              </div>
              <span className="text-xs flex-shrink-0 px-2 py-0.5 rounded-full" style={{ background: `${item.color}10`, color: item.color }}>
                {item.category}
              </span>
              <span className="text-xs flex-shrink-0 whitespace-nowrap" style={{ color: "#475569" }}>{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Platform Metrics — REMOVED ── */}

      {/* ── Quick Access ── */}
      <section className="mt-3">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "AI Araçlarını Keşfet", path: "/ai-araclari", color: "#38BDF8", icon: <Cpu className="w-4 h-4" /> },
            { label: "Son Güvenlik Uyarıları", path: "/siber-guvenlik", color: "#F97316", icon: <Shield className="w-4 h-4" /> },
            { label: "AI ile Kazanmaya Başla", path: "/ai-ile-kazanc", color: "#FCD34D", icon: <DollarSign className="w-4 h-4" /> },
          ].map((cta, i) => (
            <Link key={i} href={cta.path}>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg glass text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                style={{ border: `1px solid ${cta.color}20` }}>
                <div className="p-1.5 rounded-md" style={{ background: `${cta.color}10`, color: cta.color }}>
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
