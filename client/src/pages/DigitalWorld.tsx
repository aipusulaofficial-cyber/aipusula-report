/**
 * AIPUSULA — Dijital Dünya Sayfası
 * Color: Purple (#A78BFA)
 * Layout: TECH ECOSYSTEM — Radar dashboard hero + tech pulse + software landscape + cloud matrix + startup tracker + web trends
 * Scroll-to-section navigation with unique dashboard-style presentation
 */
import { useState, useEffect } from "react";
import {
  Globe, Code2, Smartphone, Cloud, Monitor, Rocket,
  ArrowRight, ChevronRight, TrendingUp, Zap, Server,
  GitBranch, Database, Layers, Star, Clock, Activity,
  Shield, Cpu, Wifi, Terminal, HardDrive, BarChart3,
  ArrowUpRight, ArrowDownRight, Box,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/contexts/ThemeContext";

const BRAND_COLOR = "#A78BFA";

// ─── Tech Pulse ──────────────────────────────────────────────────────────────
const techPulse = [
  { title: "Apple Vision Pro 2: Yeni Uzay Hesaplama Deneyimi", category: "Mobil", time: "3 saat önce", urgent: true },
  { title: "Linux Kernel 6.12: %15 Performans Artışı", category: "Yazılım", time: "5 saat önce", urgent: false },
  { title: "AWS Re:Invent 2026: Yeni Bulut Hizmetleri", category: "Bulut", time: "8 saat önce", urgent: false },
  { title: "WebGPU Tarayıcı Desteği Yaygınlaşıyor", category: "Web", time: "12 saat önce", urgent: false },
  { title: "Türkiye Girişim: $2.1M Yatırım Turu", category: "Girişim", time: "1 gün önce", urgent: false },
  { title: "Rust Kurumsal Benimseme %40 Arttı", category: "Yazılım", time: "2 gün önce", urgent: false },
  { title: "Samsung Galaxy AI: On-Device LLM Entegrasyonu", category: "Mobil", time: "2 gün önce", urgent: false },
  { title: "Cloudflare Workers AI: Edge Computing Devrimi", category: "Bulut", time: "3 gün önce", urgent: false },
];

// ─── Software Landscape ──────────────────────────────────────────────────────
const softwareLandscape = [
  { name: "React 20", category: "Frontend", status: "Stable", adoption: "Yüksek", trend: "+12%", trendUp: true, users: "8.5M", icon: <Code2 className="w-4 h-4" /> },
  { name: "Next.js 15", category: "Framework", status: "Stable", adoption: "Yüksek", trend: "+18%", trendUp: true, users: "3.2M", icon: <Zap className="w-4 h-4" /> },
  { name: "TypeScript 5.5", category: "Dil", status: "Stable", adoption: "Yüksek", trend: "+8%", trendUp: true, users: "5.1M", icon: <Terminal className="w-4 h-4" /> },
  { name: "Tailwind CSS 4", category: "CSS", status: "Stable", adoption: "Yüksek", trend: "+25%", trendUp: true, users: "4.8M", icon: <Layers className="w-4 h-4" /> },
  { name: "Rust", category: "Dil", status: "Stable", adoption: "Artıyor", trend: "+40%", trendUp: true, users: "2.1M", icon: <Shield className="w-4 h-4" /> },
  { name: "Bun Runtime", category: "Runtime", status: "Beta", adoption: "Artıyor", trend: "+35%", trendUp: true, users: "800K", icon: <Cpu className="w-4 h-4" /> },
  { name: "Deno 2.0", category: "Runtime", status: "Stable", adoption: "Orta", trend: "+15%", trendUp: true, users: "650K", icon: <Server className="w-4 h-4" /> },
  { name: "Hono", category: "Framework", status: "Stable", adoption: "Artıyor", trend: "+60%", trendUp: true, users: "420K", icon: <Zap className="w-4 h-4" /> },
];

// ─── Cloud Matrix ────────────────────────────────────────────────────────────
const cloudProviders = [
  { name: "AWS", marketShare: "32%", services: 200, regions: 33, highlight: "AI/ML (SageMaker, Bedrock)", color: "#FB923C" },
  { name: "Azure", marketShare: "23%", services: 150, regions: 60, highlight: "Enterprise (Copilot, OpenAI)", color: "#38BDF8" },
  { name: "GCP", marketShare: "11%", services: 120, regions: 35, highlight: "Data/AI (Vertex AI, BigQuery)", color: "#A78BFA" },
  { name: "Cloudflare", marketShare: "Yükselen", services: 80, regions: 310, highlight: "Edge (Workers AI, R2)", color: "#FCD34D" },
  { name: "Vercel", marketShare: "Yükselen", services: 40, regions: 18, highlight: "Frontend (Edge Functions)", color: "#FFFFFF" },
  { name: "Supabase", marketShare: "Yükselen", services: 25, regions: 8, highlight: "BaaS (PostgreSQL, Auth)", color: "#00E5A0" },
];

// ─── Startup Tracker ─────────────────────────────────────────────────────────
const startups = [
  { name: "FinAI", sector: "Fintech", funding: "$12M (Seri A)", stage: "Erken", founders: "İstanbul", val: "$45M", icon: <DollarSign className="w-4 h-4" /> },
  { name: "DevMind", sector: "DevTools", funding: "$5M (Seed)", stage: "Seed", founders: "Ankara", val: "$15M", icon: <Code2 className="w-4 h-4" /> },
  { name: "HealthNet", sector: "Healthtech", funding: "$25M (Seri B)", stage: "Büyüme", founders: "İzmir", val: "$80M", icon: <Activity className="w-4 h-4" /> },
  { name: "EduTech Pro", sector: "EdTech", funding: "$8M (Seri A)", stage: "Erken", founders: "İstanbul", val: "$30M", icon: <Monitor className="w-4 h-4" /> },
  { name: "LogiFlow", sector: "Logistics", funding: "$35M (Seri B)", stage: "Büyüme", founders: "İstanbul", val: "$120M", icon: <Box className="w-4 h-4" /> },
  { name: "CyberShield", sector: "Cybersecurity", funding: "$18M (Seri A)", stage: "Erken", founders: "Ankara", val: "$55M", icon: <Shield className="w-4 h-4" /> },
];

// ─── Web Trends ──────────────────────────────────────────────────────────────
const webTrends = [
  { trend: "WebGPU", impact: "Yüksek", status: "Yaygınlaşıyor", desc: "WebGL'in yerini alıyor. GPU tabanlı rendering ve hesaplama." },
  { trend: "Edge Computing", impact: "Yüksek", status: "Büyüyor", desc: "Cloudflare Workers, Vercel Edge Functions ile düşük gecikme." },
  { trend: "Server Components", impact: "Orta", status: "Benimseniyor", desc: "React Server Components ile sunucu tarafı rendering." },
  { trend: "WASM", impact: "Orta", status: "Yaygınlaşıyor", desc: "WebAssembly ile tarayıcıda native hızda kod çalıştırma." },
  { trend: "AI-Powered Web", impact: "Çok Yüksek", status: "Patlama", desc: "AI entegre web uygulamaları ve otomatik içerik üretimi." },
  { trend: "Progressive Web Apps", impact: "Orta", status: "Stabil", desc: "Native app deneyimi sunan web uygulamaları." },
];

// Import DollarSign for startup data
import { DollarSign } from "lucide-react";

function SectionHeader({ id, label, title, icon }: { id: string; label: string; title: string; icon: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24 mb-5">
      <div className="flex items-center gap-3 mb-3">
        <div style={{ color: BRAND_COLOR }}>{icon}</div>
        <span className="mono text-xs uppercase tracking-[0.2em]" style={{ color: BRAND_COLOR }}>{label}</span>
      </div>
      <h2 className="font-bold" style={{
        fontFamily: "Space Grotesk, sans-serif",
        fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
        color: "#FFFFFF",
        letterSpacing: "-0.01em",
      }}>{title}</h2>
      <div className="h-px w-16 mt-2" style={{ background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_COLOR}40, transparent)` }} />
    </div>
  );
}

export default function DigitalWorld() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [scrollActive, setScrollActive] = useState("teknoloji");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setScrollActive(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sections = [
    { id: "teknoloji", label: "Teknoloji", icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "yazilim", label: "Yazılım", icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: "mobil", label: "Mobil", icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: "bulut", label: "Bulut", icon: <Cloud className="w-3.5 h-3.5" /> },
    { id: "web", label: "Web", icon: <Monitor className="w-3.5 h-3.5" /> },
    { id: "girisimler", label: "Girişimler", icon: <Rocket className="w-3.5 h-3.5" /> },
  ];

  return (
    <AppShell>
      {/* ── Hero: Tech Radar Dashboard Layout ── */}
      <section className="relative overflow-hidden py-6 intel-grid-bg intel-scanline intel-corner">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 30% 40%, ${BRAND_COLOR}08 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${BRAND_COLOR}04 0%, transparent 50%)`,
        }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ background: BRAND_COLOR }} />
            <span className="mono text-xs uppercase tracking-[0.25em]" style={{ color: BRAND_COLOR }}>
              04 — DİJİTAL DÜNYA TEKNOLOJİ EKOSİSTEMİ
            </span>
          </div>
          <h1 className="font-bold leading-tight" style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}>
            Dijital Dünya
          </h1>
          <div className="h-px w-24 mt-3" style={{ background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_COLOR}60, transparent)` }} />
          <p className="text-sm mt-2 max-w-lg" style={{ color: "#64748B" }}>
            Teknoloji, yazılım, mobil, bulut, web ve girişim ekosisteminin tek noktadan izleme merkezi.
          </p>

          <div className="flex items-start gap-6 mt-4">
            {/* Tech Pulse Strip */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" style={{ color: "#00E5A0" }} />
                <span className="font-bold text-sm" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>8</span>
                <span className="text-xs" style={{ color: "#64748B" }}>Aktif Gelişme</span>
              </div>
              <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="flex items-center gap-2">
                <Rocket className="w-3.5 h-3.5" style={{ color: BRAND_COLOR }} />
                <span className="font-bold text-sm" style={{ color: BRAND_COLOR, fontFamily: "Space Grotesk, sans-serif" }}>142</span>
                <span className="text-xs" style={{ color: "#64748B" }}>Girişim</span>
              </div>
              <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" style={{ color: "#FCD34D" }} />
                <span className="font-bold text-sm" style={{ color: "#FCD34D", fontFamily: "Space Grotesk, sans-serif" }}>$1.8B</span>
                <span className="text-xs" style={{ color: "#64748B" }}>Toplam Yatırım</span>
              </div>
            </div>
            {/* Ecosystem Radar Mini-Viz */}
            <div className="ml-auto hidden lg:block">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,229,160,0.04)", border: "1px solid rgba(0,229,160,0.15)" }}>
                <svg viewBox="0 0 60 60" className="w-10 h-10" style={{ opacity: 0.7 }}>
                  <circle cx="30" cy="30" r="28" fill="none" stroke="#00E5A0" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="30" cy="30" r="18" fill="none" stroke="#00E5A0" strokeWidth="0.3" strokeDasharray="2 4" />
                  <circle cx="30" cy="30" r="8" fill="none" stroke="#00E5A0" strokeWidth="0.3" />
                  <circle cx="30" cy="30" r="2" fill="#00E5A0" />
                  {/* Orbiting dots */}
                  <circle cx="54" cy="30" r="2.5" fill="#00E5A0" opacity="0.6">
                    <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="12s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="30" cy="8" r="2" fill="#A78BFA" opacity="0.5">
                    <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="16s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="14" cy="46" r="1.5" fill="#FCD34D" opacity="0.4">
                    <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="20s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div>
                  <div className="text-[10px] mono" style={{ color: "#00E5A0" }}>EKO SİSTEM TARAMASI</div>
                  <div className="text-[10px]" style={{ color: "#475569" }}>6 domain aktif</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Section Nav ── */}
      <div className="sticky top-14 z-40 py-2 border-b" style={{ background: "rgba(10,12,13,0.9)", borderColor: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
          {sections.map(sec => (
            <button key={sec.id} onClick={() => scrollTo(sec.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                color: scrollActive === sec.id ? BRAND_COLOR : "#64748B",
                background: scrollActive === sec.id ? `${BRAND_COLOR}10` : "transparent",
                border: scrollActive === sec.id ? `1px solid ${BRAND_COLOR}30` : "1px solid transparent",
              }}>
              {sec.icon}{sec.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-10">
        {/* ── TEKNOLOJİ: Tech Pulse Feed ── */}
        <div data-section id="teknoloji">
          <SectionHeader id="teknoloji" label="Teknoloji" title="Teknoloji Nabzı" icon={<Globe className="w-4 h-4" />} />

          <div className="glass rounded-xl p-5">
            {/* Urgent ticker */}
            {techPulse.filter(n => n.urgent).map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg mb-3" style={{ background: "rgba(0,229,160,0.04)", border: "1px solid rgba(0,229,160,0.1)" }}>
                <div className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse" />
                <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.15)", color: "#00E5A0" }}>ACİL</span>
                <h3 className="text-sm font-semibold text-white flex-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.title}</h3>
                <span className="text-xs" style={{ color: "#64748B" }}>{item.time}</span>
              </div>
            ))}

            {/* Regular feed */}
            <div className="space-y-2">
              {techPulse.filter(n => !n.urgent).map((item, i) => {
                const catColors: Record<string, string> = { "Mobil": "#A78BFA", "Yazılım": "#00E5A0", "Bulut": "#38BDF8", "Web": "#FCD34D", "Girişim": "#FB7185" };
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-white/[0.02]">
                    <span className="text-[10px] mono px-2 py-0.5 rounded-full flex-shrink-0" style={{
                      background: `${catColors[item.category] || BRAND_COLOR}10`,
                      color: catColors[item.category] || BRAND_COLOR,
                    }}>{item.category}</span>
                    <h3 className="text-sm text-white flex-1">{item.title}</h3>
                    <span className="text-xs flex-shrink-0" style={{ color: "#475569" }}>{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── YAZILIM: Software Landscape Grid ── */}
        <div data-section id="yazilim">
          <SectionHeader id="yazilim" label="Yazılım" title="Yazılım Ekosistemi" icon={<Code2 className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {softwareLandscape.map((tool, i) => (
              <div key={i} className="glass rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-2">
                  <div style={{ color: BRAND_COLOR }}>{tool.icon}</div>
                  <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{
                    background: tool.trendUp ? "rgba(0,229,160,0.1)" : "rgba(239,68,68,0.1)",
                    color: tool.trendUp ? "#00E5A0" : "#EF4444",
                  }}>
                    {tool.trendUp ? <ArrowUpRight className="w-2.5 h-2.5 inline" /> : <ArrowDownRight className="w-2.5 h-2.5 inline" />}
                    {tool.trend}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{tool.name}</h3>
                <div className="text-[10px] mb-2" style={{ color: "#64748B" }}>{tool.category} · {tool.users} kullanıcı</div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] mono px-1.5 py-0.5 rounded" style={{ background: `${BRAND_COLOR}08`, color: BRAND_COLOR }}>{tool.status}</span>
                  <span className="text-[10px]" style={{ color: "#475569" }}>{tool.adoption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBİL: Mobile Tech Feed ── */}
        <div data-section id="mobil">
          <SectionHeader id="mobil" label="Mobil" title="Mobil Teknoloji" icon={<Smartphone className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Apple Vision Pro 2", desc: "Hafif tasarım, geliştirilmiş passthrough ve yeni uzay hesaplama deneyimi. M4 çip ile 10 saat pil ömrü.", spec: "M4 çip · 16GB RAM · 4K+ per eye", brand: "Apple" },
              { title: "Samsung Galaxy AI", desc: "On-device LLM entegrasyonu ile cihaz üzerinde AI çalıştırma. Gizlilik odaklı yaklaşım.", spec: "Snapdragon 8 Gen 4 · 12GB RAM · On-device AI", brand: "Samsung" },
              { title: "Google Pixel 10 Pro", desc: "Gemini Nano ile tam on-device AI. Fotoğraf düzenleme ve gerçek zamanlı çeviri.", spec: "Tensor G4 · 16GB RAM · Gemini Nano", brand: "Google" },
              { title: "Huawei HarmonyOS 5", desc: "Çoklu cihaz senkronizasyonu ve kendi app ekosistemi. ABD kısıtlamalarından bağımsız.", spec: "Kirin 9100 · 12GB RAM · HarmonyOS 5", brand: "Huawei" },
            ].map((device, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                  <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{device.title}</h3>
                  <span className="ml-auto text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>{device.brand}</span>
                </div>
                <p className="text-xs mb-3" style={{ color: "#94A3B8" }}>{device.desc}</p>
                <div className="text-[10px] mono px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.03)", color: "#64748B" }}>{device.spec}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BULUT: Cloud Provider Matrix ── */}
        <div data-section id="bulut">
          <SectionHeader id="bulut" label="Bulut" title="Bulut Sağlayıcıları" icon={<Cloud className="w-4 h-4" />} />

          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BRAND_COLOR}20` }}>
                    {["Sağlayıcı", "Pazar Payı", "Hizmet", "Bölge", "Öne Çıkan"].map(h => (
                      <th key={h} className="p-4 text-left text-xs mono uppercase tracking-wider" style={{ color: BRAND_COLOR }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cloudProviders.map((provider, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm" style={{ background: provider.color }} />
                          <span className="font-semibold text-white">{provider.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold" style={{ color: provider.color, fontFamily: "Space Grotesk, sans-serif" }}>{provider.marketShare}</span>
                      </td>
                      <td className="p-4 text-xs mono" style={{ color: "#94A3B8" }}>{provider.services}</td>
                      <td className="p-4 text-xs mono" style={{ color: "#64748B" }}>{provider.regions}</td>
                      <td className="p-4">
                        <span className="text-xs" style={{ color: provider.color }}>{provider.highlight}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── WEB: Web Trends Timeline ── */}
        <div data-section id="web">
          <SectionHeader id="web" label="Web" title="Web Teknoloji Trendleri" icon={<Monitor className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {webTrends.map((trend, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]" style={{ borderLeft: `3px solid ${BRAND_COLOR}` }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{trend.trend}</h3>
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{
                    background: trend.status === "Patlama" ? "rgba(0,229,160,0.15)" : trend.status === "Yaygınlaşıyor" ? "rgba(252,211,77,0.15)" : trend.status === "Büyüyor" ? "rgba(56,189,248,0.15)" : "rgba(167,139,250,0.1)",
                    color: trend.status === "Patlama" ? "#00E5A0" : trend.status === "Yaygınlaşıyor" ? "#FCD34D" : trend.status === "Büyüyor" ? "#38BDF8" : BRAND_COLOR,
                  }}>{trend.status}</span>
                </div>
                <p className="text-xs mb-3" style={{ color: "#64748B" }}>{trend.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] mono px-1.5 py-0.5 rounded" style={{ background: `${BRAND_COLOR}08`, color: BRAND_COLOR }}>{trend.impact} Etki</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── GİRİŞİMLER: Startup Tracker ── */}
        <div data-section id="girisimler">
          <SectionHeader id="girisimler" label="Girişimler" title="Girişim Takip Merkezi" icon={<Rocket className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {startups.map((startup, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] group" style={{ borderTop: `2px solid ${BRAND_COLOR}` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div style={{ color: BRAND_COLOR }}>{startup.icon}</div>
                    <h3 className="font-bold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{startup.name}</h3>
                  </div>
                  <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>{startup.sector}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="mono text-[10px]" style={{ color: "#475569" }}>YATIRIM</span>
                    <div className="font-bold" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{startup.funding}</div>
                  </div>
                  <div>
                    <span className="mono text-[10px]" style={{ color: "#475569" }}>VALUATION</span>
                    <div className="font-bold" style={{ color: BRAND_COLOR, fontFamily: "Space Grotesk, sans-serif" }}>{startup.val}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px]" style={{ color: "#64748B" }}>
                  <span>{startup.founders}</span>
                  <span className="mono">{startup.stage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
