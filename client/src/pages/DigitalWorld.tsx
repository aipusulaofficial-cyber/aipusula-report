/**
 * AIPUSULA — Dijital Dünya Sayfası
 * Color: Purple (#A78BFA)
 * Layout: Hero + Tech news grid + Software tools + Cloud + Startups + Web trends
 */
import { useState } from "react";
import {
  Globe, Code2, Smartphone, Cloud, Monitor, Rocket,
  ArrowRight, ChevronRight, TrendingUp, Zap, Server,
  GitBranch, Database, Layers, Star, Clock,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/contexts/ThemeContext";

const BRAND_COLOR = "#A78BFA";

// ─── Tech News ───────────────────────────────────────────────────────────────
const techNews = [
  { title: "Apple Vision Pro 2: Yeni Uzay Hesaplama Deneyimi", summary: "Apple, Vision Pro 2 ile uzay bilişim deneyimini tamamen yeniden tasarlıyor. Daha hafif tasarım ve geliştirilmiş passthrough.", time: "3 saat önce", tag: "Mobil", tagColor: "#A78BFA" },
  { title: "Linux Kernel 6.12: Performans ve Güvenlik Güncellemeleri", summary: "Yeni kernel sürümü %15 performans artışı ve birçok güvenlik yaması içeriyor.", time: "5 saat önce", tag: "Yazılım", tagColor: "#00E5A0" },
  { title: "AWS Re:Invent 2026: Yeni Bulut Hizmetleri Tanıtıldı", summary: "Amazon, yeni AI hizmetleri ve düşük gecikmeli veritabanı çözümlerini duyurdu.", time: "8 saat önce", tag: "Bulut", tagColor: "#38BDF8" },
  { title: "WebGPU Tarayıcı Desteği Yaygınlaşıyor", summary: "WebGPU artık tüm büyük tarayıcılarda destekleniyor. WebGL'in yerini alması bekleniyor.", time: "12 saat önce", tag: "Web", tagColor: "#FCD34D" },
  { title: "Türkiye Girişim Ekosistemi: $2.1M Yatırım Turu", summary: "İstanbul merkezli fintech girişimi, Seri A turunda $2.1M yatırım aldı.", time: "1 gün önce", tag: "Girişim", tagColor: "#FB7185" },
  { title: "Rust Programlama Dili: Kurumsal Benimseme Artıyor", summary: "Microsoft, Google ve Amazon'da Rust kullanımı %40 arttı. Güvenli bellek yönetimi çekiyor.", time: "2 gün önce", tag: "Yazılım", tagColor: "#00E5A0" },
];

// ─── Software Trends ─────────────────────────────────────────────────────────
const softwareTools = [
  { name: "React 20", category: "Frontend", status: "Stable", adoption: "Yüksek", icon: <Code2 className="w-4 h-4" /> },
  { name: "Next.js 15", category: "Framework", status: "Stable", adoption: "Yüksek", icon: <Zap className="w-4 h-4" /> },
  { name: "Bun 2.0", category: "Runtime", status: "Beta", adoption: "Orta", icon: <Server className="w-4 h-4" /> },
  { name: "Tailwind CSS 4", category: "CSS", status: "Stable", adoption: "Yüksek", icon: <Layers className="w-4 h-4" /> },
  { name: "Docker + Kubernetes", category: "DevOps", status: "Stable", adoption: "Çok Yüksek", icon: <Database className="w-4 h-4" /> },
  { name: "Git + GitHub Actions", category: "CI/CD", status: "Stable", adoption: "Çok Yüksek", icon: <GitBranch className="w-4 h-4" /> },
];

// ─── Cloud Providers ─────────────────────────────────────────────────────────
const cloudProviders = [
  { name: "AWS", marketShare: "32%", services: "200+", pricing: "Pay-as-you-go", strength: "En geniş hizmet yelpazesi" },
  { name: "Azure", marketShare: "23%", services: "150+", pricing: "Enterprise odaklı", strength: "Microsoft ekosistemi" },
  { name: "Google Cloud", marketShare: "11%", services: "120+", pricing: "Kullanım başına", strength: "AI/ML hizmetleri" },
  { name: "Cloudflare", marketShare: "5%", services: "50+", pricing: "Freemium", strength: "Edge computing & CDN" },
];

// ─── Startups ────────────────────────────────────────────────────────────────
const startups = [
  { name: "Getir", sector: "Hızlı Teslimat", funding: "$1.6B", stage: "IPO Hazırlığı", location: "İstanbul" },
  { name: "Trendyol", sector: "E-Ticaret", funding: "$2.2B", stage: "Halka Açık", location: "İstanbul" },
  { name: "Peak Games", sector: "Oyun", funding: "$1.8B", stage: "Satın Alındı", location: "İstanbul" },
  { name: "Fenerbahçe Teknoloji", sector: "SporTech", funding: "$50M", stage: "Seri B", location: "İstanbul" },
  { name: "Netsis", sector: "ERP", funding: "$120M", stage: "Seri C", location: "İstanbul" },
  { name: "Masternaut", sector: "IoT/Filo", funding: "$85M", stage: "Seri B", location: "İstanbul" },
];

// ─── Web Trends ──────────────────────────────────────────────────────────────
const webTrends = [
  { title: "Server Components", growth: "+180%", desc: "React Server Components ile SSR/SSG birleşiyor" },
  { title: "Edge Computing", growth: "+120%", desc: "Edge'de çalışan uygulama mimarisi yaygınlaşıyor" },
  { title: "AI-Generated UI", growth: "+200%", desc: "AI ile otomatik UI üretim araçları" },
  { title: "WebAssembly", growth: "+85%", desc: "Native hızda web uygulamaları" },
];

export default function DigitalWorld() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"teknoloji" | "yazilim" | "mobil" | "bulut" | "web" | "girisimler">("teknoloji");

  return (
    <AppShell>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-8 intel-grid-bg intel-scanline intel-corner">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 20% 50%, ${BRAND_COLOR}08 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, ${BRAND_COLOR}04 0%, transparent 50%)`,
        }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ background: BRAND_COLOR }} />
            <span className="mono text-xs uppercase tracking-[0.25em]" style={{ color: BRAND_COLOR }}>
              04 — DİJİTAL DÜNYA: TEKNOLOJİ, YAZILIM & GİRİŞİMLER
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
          <p className="text-sm mt-3 max-w-lg" style={{ color: "#64748B" }}>
            Teknoloji ekosistemi, yazılım araçları, bulut servisleri ve dijital girişimlerin nabzını tutun.
          </p>
          <div className="flex flex-wrap gap-5 mt-5">
            {[
              { label: "Teknoloji Haberi", value: "324", icon: <Globe className="w-3.5 h-3.5" /> },
              { label: "Araç İnceleme", value: "89", icon: <Monitor className="w-3.5 h-3.5" /> },
              { label: "Girişim Profili", value: "42", icon: <Rocket className="w-3.5 h-3.5" /> },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div style={{ color: BRAND_COLOR }}>{s.icon}</div>
                <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem", color: BRAND_COLOR }}>{s.value}</span>
                <span className="text-xs" style={{ color: "#475569" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Intel Data Strip */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              EKOSİSTEM: 6 SEKTÖR
            </div>
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              HABER: 324 PARÇA
            </div>
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              GİRİŞİM: 42 PROFİL
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <div className="flex items-center gap-1 mt-6 overflow-x-auto pb-1">
        {[
          { id: "teknoloji" as const, label: "Teknoloji", icon: <Globe className="w-3.5 h-3.5" /> },
          { id: "yazilim" as const, label: "Yazılım", icon: <Code2 className="w-3.5 h-3.5" /> },
          { id: "mobil" as const, label: "Mobil", icon: <Smartphone className="w-3.5 h-3.5" /> },
          { id: "bulut" as const, label: "Bulut", icon: <Cloud className="w-3.5 h-3.5" /> },
          { id: "web" as const, label: "Web", icon: <Monitor className="w-3.5 h-3.5" /> },
          { id: "girisimler" as const, label: "Girişimler", icon: <Rocket className="w-3.5 h-3.5" /> },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap"
            style={{
              color: activeTab === tab.id ? BRAND_COLOR : "#64748B",
              background: activeTab === tab.id ? `${BRAND_COLOR}10` : "transparent",
              border: activeTab === tab.id ? `1px solid ${BRAND_COLOR}30` : "1px solid transparent",
            }}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="mt-4">
        {activeTab === "teknoloji" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {techNews.map((news, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]" style={{ borderTop: `2px solid ${news.tagColor}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: `${news.tagColor}15`, color: news.tagColor }}>{news.tag}</span>
                  <span className="text-xs" style={{ color: "#475569" }}>{news.time}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{news.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{news.summary}</p>
                <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: BRAND_COLOR }}>
                  <span>Devamını Oku</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "yazilim" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {softwareTools.map((tool, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]" style={{ borderLeft: `3px solid ${BRAND_COLOR}` }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: BRAND_COLOR }}>
                  {tool.icon}
                  <h3 className="font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{tool.name}</h3>
                </div>
                <div className="text-xs" style={{ color: "#64748B" }}>{tool.category}</div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{
                    background: tool.status === "Stable" ? "rgba(0,229,160,0.15)" : "rgba(252,211,77,0.15)",
                    color: tool.status === "Stable" ? "#00E5A0" : "#FCD34D",
                  }}>{tool.status}</span>
                  <span className="text-xs" style={{ color: "#475569" }}>{tool.adoption}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "mobil" && (
          <div className="space-y-4">
            <div className="glass rounded-xl p-6">
              <h3 className="font-bold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Mobil Geliştirme Araçları 2026</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "React Native", platform: "Cross-platform", note: "iOS + Android tek kodbase" },
                  { name: "Flutter", platform: "Cross-platform", note: "Dart, Material Design 3" },
                  { name: "SwiftUI", platform: "iOS", note: "Apple ekosistemi" },
                  { name: "Kotlin Multiplatform", platform: "Cross-platform", note: "Native performans" },
                  { name: "Expo", platform: "React Native", note: "Kolay deployment" },
                  { name: "Ionic", platform: "Hybrid", note: "Web teknolojileri" },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="font-semibold text-white text-sm">{item.name}</div>
                    <div className="text-xs" style={{ color: BRAND_COLOR }}>{item.platform}</div>
                    <div className="text-xs mt-1" style={{ color: "#64748B" }}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "bulut" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {cloudProviders.map((provider, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]" style={{ borderLeft: `3px solid ${BRAND_COLOR}` }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{provider.name}</h3>
                  <span className="font-bold" style={{ color: BRAND_COLOR, fontFamily: "Space Grotesk, sans-serif" }}>{provider.marketShare}</span>
                </div>
                <div className="text-xs" style={{ color: "#64748B" }}>{provider.services} hizmet</div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs" style={{ color: BRAND_COLOR }}>{provider.pricing}</span>
                </div>
                <p className="text-xs mt-2" style={{ color: "#94A3B8" }}>{provider.strength}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "web" && (
          <div className="space-y-3">
            {webTrends.map((trend, i) => (
              <div key={i} className="glass rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:bg-white/[0.02]">
                <span className="mono text-xs font-bold w-6" style={{ color: BRAND_COLOR }}>0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{trend.title}</h3>
                  <p className="text-xs" style={{ color: "#64748B" }}>{trend.desc}</p>
                </div>
                <span className="font-bold text-sm" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{trend.growth}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "girisimler" && (
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BRAND_COLOR}20` }}>
                    {["Girişim", "Sektör", "Fon", "Aşama", "Konum"].map(h => (
                      <th key={h} className="p-4 text-left text-xs mono uppercase tracking-wider" style={{ color: BRAND_COLOR }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {startups.map((s, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                      <td className="p-4 font-semibold text-white">{s.name}</td>
                      <td className="p-4 text-xs" style={{ color: "#64748B" }}>{s.sector}</td>
                      <td className="p-4 text-xs mono" style={{ color: "#00E5A0" }}>{s.funding}</td>
                      <td className="p-4">
                        <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{
                          background: s.stage === "Halka Açık" ? "rgba(0,229,160,0.15)" : s.stage === "Seri C" ? "rgba(56,189,248,0.15)" : "rgba(167,139,250,0.15)",
                          color: s.stage === "Halka Açık" ? "#00E5A0" : s.stage === "Seri C" ? "#38BDF8" : BRAND_COLOR,
                        }}>{s.stage}</span>
                      </td>
                      <td className="p-4 text-xs" style={{ color: "#64748B" }}>{s.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
