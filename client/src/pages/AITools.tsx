/**
 * AIPUSULA — AI Araçları Sayfası
 * Color: Blue (#38BDF8)
 * Layout: Hero + Featured tool grid + Category filter + Comparison table + Reviews
 */
import { useState } from "react";
import {
  Cpu, Search, Star, Filter, ChevronRight, Zap, Clock,
  Check, X, Layers, Eye, ArrowRight, BookOpen,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/contexts/ThemeContext";

const BRAND_COLOR = "#38BDF8";

// ─── AI Tool Catalog ─────────────────────────────────────────────────────────
const aiTools = [
  { name: "ChatGPT", company: "OpenAI", category: "Sohbet", rating: 4.8, users: "200M+", pricing: "Ücretsiz / $20", features: ["Multimodal", "Plugin", "Custom GPT", "Voice"], isNew: false },
  { name: "Claude", company: "Anthropic", category: "Sohbet", rating: 4.7, users: "50M+", pricing: "Ücretsiz / $20", features: ["200K Context", "Artifacts", "Projects", "Vision"], isNew: false },
  { name: "Gemini", company: "Google", category: "Sohbet", rating: 4.5, users: "100M+", pricing: "Ücretsiz / $20", features: ["Google Entegre", "Multimodal", "Code", "Web"], isNew: false },
  { name: "Midjourney", company: "Midjourney", category: "Görsel", rating: 4.9, users: "16M+", pricing: "$10-$60", features: ["Fotoğraf Gerçekçi", "Stil Transfer", "Remix", "V6 Model"], isNew: false },
  { name: "Cursor", company: "Cursor AI", category: "Kod", rating: 4.9, users: "5M+", pricing: "Ücretsiz / $20", features: ["Tab Complete", "Chat", "Edit", "Multi-file"], isNew: true },
  { name: "Perplexity", company: "Perplexity AI", category: "Arama", rating: 4.6, users: "10M+", pricing: "Ücretsiz / $20", features: ["Gerçek Zamanlı", "Kaynak", "Collection", "Space"], isNew: false },
  { name: "Runway ML", company: "Runway", category: "Video", rating: 4.4, users: "2M+", pricing: "$12-$76", features: ["Gen-3", "Video Edit", "Motion Brush", "Image-to-Video"], isNew: true },
  { name: "ElevenLabs", company: "ElevenLabs", category: "Ses", rating: 4.7, users: "3M+", pricing: "Ücretsiz / $5+", features: ["TTS", "Voice Clone", "Dubbing", "Speech-to-Speech"], isNew: false },
];

// ─── Categories ──────────────────────────────────────────────────────────────
const toolCategories = [
  { name: "Sohbet & Asistan", count: 45, color: "#38BDF8", icon: <Cpu className="w-4 h-4" /> },
  { name: "Görsel Üretimi", count: 32, color: "#A78BFA", icon: <Layers className="w-4 h-4" /> },
  { name: "Kod & Geliştirme", count: 28, color: "#00E5A0", icon: <Zap className="w-4 h-4" /> },
  { name: "Video & Animasyon", count: 18, color: "#FB7185", icon: <Eye className="w-4 h-4" /> },
  { name: "Ses & Müzik", count: 15, color: "#FCD34D", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Arama & Araştırma", count: 12, color: "#38BDF8", icon: <Search className="w-4 h-4" /> },
  { name: "Yazı & İçerik", count: 38, color: "#A78BFA", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Veri & Analitik", count: 22, color: "#00E5A0", icon: <Layers className="w-4 h-4" /> },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
const reviews = [
  { tool: "ChatGPT", title: "Günlük iş akışının vazgeçilmezi", rating: 5, date: "2 gün önce", text: "Custom GPT özelliği ile özel asistanlar oluşturmak harika. Günlük e-posta yazımı ve analiz için vazgeçilmez oldu." },
  { tool: "Cursor", title: "Kod yazma deneyimini değiştirdi", rating: 5, date: "1 hafta önce", text: "Tab autocomplete ve multi-file edit özellikleri ile kod yazma hızım 3 katına çıktı. Kesinlikle tavsiye ederim." },
  { tool: "Midjourney", title: "Yaratıcılığın yeni boyutu", rating: 4, date: "3 gün önce", text: "V6 model ile foto-gerçekçi görseller üretmek inanılmaz. Ancak fiyatı biraz yüksek." },
  { tool: "ElevenLabs", title: "En iyi TTS çözümü", rating: 5, date: "5 gün önce", text: "Voice clone kalitesi mükemmel. YouTube seslendirme için artık insan konuşmacıya ihtiyacım yok." },
];

export default function AITools() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"katalog" | "kategoriler" | "karsilastirmalar" | "incelemeler">("katalog");

  const filteredTools = activeCategory
    ? aiTools.filter(t => t.category === activeCategory || t.category === getCategoryName(activeCategory))
    : aiTools;

  function getCategoryName(cat: string): string {
    return cat;
  }

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
              02 — AI ARAÇLARI KATALOĞU & KARŞILAŞTIRMA
            </span>
          </div>
          <h1 className="font-bold leading-tight" style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}>
            AI Araçları
          </h1>
          <div className="h-px w-24 mt-3" style={{ background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_COLOR}60, transparent)` }} />
          <p className="text-sm mt-3 max-w-lg" style={{ color: "#64748B" }}>
            500'den fazla AI araç kataloğu, detaylı karşılaştırmalar ve kullanıcı incelemeleri ile doğru aracı bulun.
          </p>

          {/* Intel Data Strip */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              KATALOG: 512 ARAÇ
            </div>
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              KATEGORİ: 8 BÖLÜM
            </div>
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              GÜNCELLEME: 12 ARAÇ YENİ
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <div className="flex items-center gap-1 mt-6 overflow-x-auto pb-1">
        {[
          { id: "katalog" as const, label: "Katalog", icon: <Cpu className="w-3.5 h-3.5" /> },
          { id: "kategoriler" as const, label: "Kategoriler", icon: <Layers className="w-3.5 h-3.5" /> },
          { id: "karsilastirmalar" as const, label: "Karşılaştırmalar", icon: <Filter className="w-3.5 h-3.5" /> },
          { id: "incelemeler" as const, label: "İncelemeler", icon: <Star className="w-3.5 h-3.5" /> },
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
        {activeTab === "katalog" && (
          <>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <button onClick={() => setActiveCategory(null)}
                className="px-2.5 py-1 rounded-full text-xs transition-all"
                style={{
                  color: !activeCategory ? BRAND_COLOR : "#64748B",
                  background: !activeCategory ? `${BRAND_COLOR}10` : "transparent",
                  border: !activeCategory ? `1px solid ${BRAND_COLOR}30` : "1px solid rgba(255,255,255,0.06)",
                }}>
                Tümü
              </button>
              {toolCategories.map(cat => (
                <button key={cat.name} onClick={() => setActiveCategory(cat.name.split(" ")[0])}
                  className="px-2.5 py-1 rounded-full text-xs transition-all"
                  style={{
                    color: activeCategory === cat.name.split(" ")[0] ? cat.color : "#64748B",
                    background: activeCategory === cat.name.split(" ")[0] ? `${cat.color}10` : "transparent",
                    border: activeCategory === cat.name.split(" ")[0] ? `1px solid ${cat.color}30` : "1px solid rgba(255,255,255,0.06)",
                  }}>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Tool Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool, i) => (
                <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] group" style={{ borderTop: `2px solid ${BRAND_COLOR}` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{tool.name}</h3>
                      <span className="text-xs" style={{ color: "#475569" }}>{tool.company}</span>
                    </div>
                    {tool.isNew && (
                      <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.15)", color: "#00E5A0" }}>YENİ</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3 h-3" style={{ color: j < Math.floor(tool.rating) ? BRAND_COLOR : "#334155", fill: j < Math.floor(tool.rating) ? BRAND_COLOR : "transparent" }} />
                    ))}
                    <span className="text-xs mono" style={{ color: "#475569" }}>{tool.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tool.features.map((f, j) => (
                      <span key={j} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${BRAND_COLOR}08`, color: BRAND_COLOR }}>{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs" style={{ color: "#475569" }}>
                    <span>{tool.pricing}</span>
                    <span>{tool.users}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "kategoriler" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolCategories.map((cat, i) => (
              <button key={i} onClick={() => { setActiveCategory(cat.name.split(" ")[0]); setActiveTab("katalog"); }}
                className="glass rounded-xl p-5 text-left transition-all duration-300 hover:scale-[1.02]" style={{ borderLeft: `3px solid ${cat.color}` }}>
                <div className="mb-2" style={{ color: cat.color }}>{cat.icon}</div>
                <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{cat.name}</h3>
                <span className="text-xs mono" style={{ color: cat.color }}>{cat.count} Araç</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === "karsilastirmalar" && (
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BRAND_COLOR}20` }}>
                    {["Araç", "Kategori", "Fiyat", "Kullanıcı", "Puan"].map(h => (
                      <th key={h} className="p-4 text-left text-xs mono uppercase tracking-wider" style={{ color: BRAND_COLOR }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aiTools.map((tool, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                      <td className="p-4 font-semibold text-white">{tool.name}</td>
                      <td className="p-4 text-xs" style={{ color: "#64748B" }}>{tool.category}</td>
                      <td className="p-4 text-xs mono" style={{ color: BRAND_COLOR }}>{tool.pricing}</td>
                      <td className="p-4 text-xs" style={{ color: "#64748B" }}>{tool.users}</td>
                      <td className="p-4">
                        <span className="font-bold" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{tool.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "incelemeler" && (
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <div key={i} className="glass rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-sm text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{review.tool}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3" style={{ color: BRAND_COLOR, fill: BRAND_COLOR }} />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: "#475569" }}>{review.date}</span>
                </div>
                <p className="text-sm" style={{ color: "#94A3B8" }}>"{review.text}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
