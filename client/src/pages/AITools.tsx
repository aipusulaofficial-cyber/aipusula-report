/**
 * AIPUSULA — AI Araçları Sayfası
 * Color: Blue (#38BDF8)
 * Layout: PRODUCT CATALOG — Search-first hero + featured tools + category grid + catalog with filters + comparison + reviews
 * Scroll-to-section navigation
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Cpu, Search, Star, Filter, ChevronRight, Zap, Clock,
  Layers, Eye, ArrowRight, BookOpen, TrendingUp, Award,
  Check, X, SlidersHorizontal,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/contexts/ThemeContext";

const BRAND_COLOR = "#38BDF8";

// ─── AI Tool Catalog ─────────────────────────────────────────────────────────
const aiTools = [
  { name: "ChatGPT", company: "OpenAI", category: "Sohbet", rating: 4.8, users: "200M+", pricing: "Ücretsiz / $20", features: ["Multimodal", "Plugin", "Custom GPT", "Voice"], isNew: false, trending: true, slug: "chatgpt", desc: "OpenAI'nin çok modlu sohbet modelidir. Metin, görsel ve ses işleme kapasitesine sahiptir." },
  { name: "Claude", company: "Anthropic", category: "Sohbet", rating: 4.7, users: "50M+", pricing: "Ücretsiz / $20", features: ["200K Context", "Artifacts", "Projects", "Vision"], isNew: false, trending: true, slug: "claude", desc: "Anthropic'in güvenlik odaklı sohbet modelidir. 200K token bağlam penceresine sahiptir." },
  { name: "Gemini", company: "Google", category: "Sohbet", rating: 4.5, users: "100M+", pricing: "Ücretsiz / $20", features: ["Google Entegre", "Multimodal", "Code", "Web"], isNew: false, trending: false, slug: "gemini", desc: "Google'ın çok modlu AI modelidir. Google ekosisteminde derin entegrasyon sunar." },
  { name: "Midjourney", company: "Midjourney", category: "Görsel", rating: 4.9, users: "16M+", pricing: "$10-$60", features: ["Fotoğraf Gerçekçi", "Stil Transfer", "Remix", "V6 Model"], isNew: false, trending: true, slug: "midjourney", desc: "Foto-gerçekçi görsel üretim aracıdır. V6 model ile profesyonel kalitede sanat eserleri oluşturabilir." },
  { name: "Cursor", company: "Cursor AI", category: "Kod", rating: 4.9, users: "5M+", pricing: "Ücretsiz / $20", features: ["Tab Complete", "Chat", "Edit", "Multi-file"], isNew: true, trending: true, slug: "cursor", desc: "AI-native kod editörüdür. Tab completion, chat ve multi-file edit ile kod yazma hızını 3x artırır." },
  { name: "Perplexity", company: "Perplexity AI", category: "Arama", rating: 4.6, users: "10M+", pricing: "Ücretsiz / $20", features: ["Gerçek Zamanlı", "Kaynak", "Collection", "Space"], isNew: false, trending: false, slug: "perplexity", desc: "Kaynak göstererek arama yapan AI motorudur. Gerçek zamanlı bilgi güncelleme sunar." },
  { name: "Runway ML", company: "Runway", category: "Video", rating: 4.4, users: "2M+", pricing: "$12-$76", features: ["Gen-3", "Video Edit", "Motion Brush", "Image-to-Video"], isNew: true, trending: true, slug: "runway-ml", desc: "AI tabanlı video üretim ve düzenleme platformudur. Gen-3 modeli ile fotogerçekçi video oluşturabilir." },
  { name: "ElevenLabs", company: "ElevenLabs", category: "Ses", rating: 4.7, users: "3M+", pricing: "Ücretsiz / $5+", features: ["TTS", "Voice Clone", "Dubbing", "Speech-to-Speech"], isNew: false, trending: false, slug: "elevenlabs", desc: "En gelişmiş AI ses üretimi ve klonlama platformudur. Voice clone kalitesi mükemmeldir." },
  { name: "Copilot", company: "Microsoft", category: "Kod", rating: 4.6, users: "30M+", pricing: "$10-$39", features: ["IDE Entegre", "Agent Mode", "Review", "Chat"], isNew: false, trending: true, slug: "copilot", desc: "Microsoft'un AI kod asistanıdır. IDE entegrasyonu ile kod yazımını hızlandırır." },
  { name: "Sunno", company: "Sunno AI", category: "Ses", rating: 4.5, users: "1M+", pricing: "Ücretsiz / $8", features: ["Müzik Üretimi", "Söz Yazımı", "Stil Kontrol"], isNew: true, trending: true, slug: "sunno", desc: "AI müzik üretimi platformudur. Söz yazımından tam müzik üretimine kadar her şeyi destekler." },
];

// ─── Categories ──────────────────────────────────────────────────────────────
const toolCategories = [
  { name: "Sohbet & Asistan", count: 45, color: "#38BDF8", icon: <Cpu className="w-5 h-5" />, desc: "ChatGPT, Claude, Gemini gibi sohbet botları" },
  { name: "Görsel Üretimi", count: 32, color: "#A78BFA", icon: <Layers className="w-5 h-5" />, desc: "Midjourney, DALL-E, Stable Diffusion" },
  { name: "Kod & Geliştirme", count: 28, color: "#00E5A0", icon: <Zap className="w-5 h-5" />, desc: "Cursor, Copilot, Codeium" },
  { name: "Video & Animasyon", count: 18, color: "#FB7185", icon: <Eye className="w-5 h-5" />, desc: "Runway, Pika Labs, HeyGen" },
  { name: "Ses & Müzik", count: 15, color: "#FCD34D", icon: <BookOpen className="w-5 h-5" />, desc: "ElevenLabs, Sunno, Murf AI" },
  { name: "Arama & Araştırma", count: 12, color: "#38BDF8", icon: <Search className="w-5 h-5" />, desc: "Perplexity, You.com, Arc Search" },
  { name: "Yazı & İçerik", count: 38, color: "#A78BFA", icon: <BookOpen className="w-5 h-5" />, desc: "Jasper, Copy.ai, Writesonic" },
  { name: "Veri & Analitik", count: 22, color: "#00E5A0", icon: <TrendingUp className="w-5 h-5" />, desc: "Julius AI, DataChat, Tableau AI" },
];

// ─── Featured Tools (side-by-side comparison) ────────────────────────────────
const featuredTools = [
  { name: "Cursor", company: "Cursor AI", rating: 4.9, desc: "AI-native kod editörü. Tab completion, chat ve multi-file edit ile kod yazma hızını 3x artırır.", features: ["Tab Complete", "Chat Edit", "Multi-file", "Agent Mode"], color: "#00E5A0", slug: "cursor" },
  { name: "Midjourney", company: "Midjourney", rating: 4.9, desc: "Foto-gerçekçi görsel üretim. V6 model ile profesyonel kalitede sanat eserleri oluşturabilirsiniz.", features: ["V6 Model", "Remix", "Stil Transfer", "Upscale"], color: "#A78BFA", slug: "midjourney" },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
const reviews = [
  { tool: "ChatGPT", title: "Günlük iş akışının vazgeçilmezi", rating: 5, date: "2 gün önce", text: "Custom GPT özelliği ile özel asistanlar oluşturmak harika. Günlük e-posta yazımı ve analiz için vazgeçilmez oldu." },
  { tool: "Cursor", title: "Kod yazma deneyimini değiştirdi", rating: 5, date: "1 hafta önce", text: "Tab autocomplete ve multi-file edit özellikleri ile kod yazma hızım 3 katına çıktı. Kesinlikle tavsiye ederim." },
  { tool: "Midjourney", title: "Yaratıcılığın yeni boyutu", rating: 4, date: "3 gün önce", text: "V6 model ile foto-gerçekçi görseller üretmek inanılmaz. Ancak fiyatı biraz yüksek." },
  { tool: "ElevenLabs", title: "En iyi TTS çözümü", rating: 5, date: "5 gün önce", text: "Voice clone kalitesi mükemmel. YouTube seslendirme için artık insan konuşmacıya ihtiyacım yok." },
  { tool: "Perplexity", title: "Araştırma devrimine öncülük ediyor", rating: 5, date: "1 hafta önce", text: "Kaynak göstererek cevap vermesi akademik araştırmalar için çok değerli. Google aramasının yerini almaya başladı." },
];

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

export default function AITools() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState("katalog");
  const [sortBy, setSortBy] = useState<"rating" | "name" | "new">("rating");

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

  const filteredTools = aiTools
    .filter(t => !activeCategory || t.category === activeCategory)
    .filter(t => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "new") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });

  const sections = [
    { id: "katalog", label: "Katalog", icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: "kategoriler", label: "Kategoriler", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "karsilastirmalar", label: "Karşılaştırmalar", icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
    { id: "incelemeler", label: "İncelemeler", icon: <Star className="w-3.5 h-3.5" /> },
  ];

  return (
    <AppShell>
      {/* ── Hero: Search-First Layout ── */}
      <section className="relative overflow-hidden py-6 intel-grid-bg intel-scanline intel-corner">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 30% 40%, ${BRAND_COLOR}08 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${BRAND_COLOR}04 0%, transparent 50%)`,
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
          <p className="text-sm mt-2 max-w-lg" style={{ color: "#64748B" }}>
            500+ AI araç kataloğu, detaylı karşılaştırmalar ve kullanıcı incelemeleri ile doğru aracı bulun.
          </p>

          {/* Search Bar */}
          <div className="mt-4 flex items-center gap-2 max-w-lg">
            <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg glass" style={{ border: `1px solid ${BRAND_COLOR}20` }}>
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#64748B" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Araç, kategori veya özellik ara..."
                className="bg-transparent text-sm text-white placeholder:text-slate-500 outline-none w-full"
              />
            </div>
            <button className="px-4 py-2.5 rounded-lg text-xs font-medium transition-all" style={{ background: `${BRAND_COLOR}15`, color: BRAND_COLOR, border: `1px solid ${BRAND_COLOR}30` }}>
              Ara
            </button>
          </div>

          {/* Quick Stats + Tool Radar */}
          <div className="flex items-start gap-4 mt-4">
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Araç", value: "512", icon: <Cpu className="w-3.5 h-3.5" /> },
                { label: "Kategori", value: "8", icon: <Layers className="w-3.5 h-3.5" /> },
                { label: "Yeni", value: "12", icon: <Zap className="w-3.5 h-3.5" /> },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div style={{ color: BRAND_COLOR }}>{s.icon}</div>
                  <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", color: BRAND_COLOR }}>{s.value}</span>
                  <span className="text-xs" style={{ color: "#475569" }}>{s.label}</span>
                </div>
              ))}
            </div>
            {/* Tool Radar mini */}
            <div className="ml-auto hidden lg:block">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,229,160,0.04)", border: "1px solid rgba(0,229,160,0.12)" }}>
                <svg viewBox="0 0 30 30" className="w-6 h-6" style={{ opacity: 0.6 }}>
                  <circle cx="15" cy="15" r="13" fill="none" stroke="#00E5A0" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="15" cy="15" r="6" fill="none" stroke="#00E5A0" strokeWidth="0.3" />
                  <circle cx="15" cy="15" r="1.5" fill="#00E5A0" />
                </svg>
                <span className="text-[10px] mono" style={{ color: "#00E5A0" }}>ARAÇ RADAR</span>
                <span className="text-[10px]" style={{ color: "#475569" }}>8 domain</span>
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
        {/* ── KATALOG: Filterable Grid ── */}
        <div data-section id="katalog">
          <SectionHeader id="katalog" label="Katalog" title="AI Araç Kataloğu" icon={<Cpu className="w-4 h-4" />} />

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button onClick={() => setActiveCategory(null)}
              className="px-2.5 py-1 rounded-full text-xs transition-all"
              style={{
                color: !activeCategory ? BRAND_COLOR : "#64748B",
                background: !activeCategory ? `${BRAND_COLOR}10` : "transparent",
                border: !activeCategory ? `1px solid ${BRAND_COLOR}30` : "1px solid rgba(255,255,255,0.06)",
              }}>
              Tümü ({aiTools.length})
            </button>
            {Array.from(new Set(aiTools.map(t => t.category))).map(cat => {
              const count = aiTools.filter(t => t.category === cat).length;
              const catColor = toolCategories.find(c => c.name.includes(cat))?.color || BRAND_COLOR;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="px-2.5 py-1 rounded-full text-xs transition-all"
                  style={{
                    color: activeCategory === cat ? catColor : "#64748B",
                    background: activeCategory === cat ? `${catColor}10` : "transparent",
                    border: activeCategory === cat ? `1px solid ${catColor}30` : "1px solid rgba(255,255,255,0.06)",
                  }}>
                  {cat} ({count})
                </button>
              );
            })}
            <div className="ml-auto flex items-center gap-1">
              <span className="text-[10px] mono" style={{ color: "#475569" }}>SIRALA:</span>
              {(["rating", "name", "new"] as const).map(s => (
                <button key={s} onClick={() => setSortBy(s)}
                  className="px-2 py-0.5 rounded text-[10px] mono transition-all"
                  style={{
                    color: sortBy === s ? BRAND_COLOR : "#64748B",
                    background: sortBy === s ? `${BRAND_COLOR}10` : "transparent",
                  }}>
                  {s === "rating" ? "PUAN" : s === "name" ? "İSİM" : "YENİ"}
                </button>
              ))}
            </div>
          </div>

          {/* Featured tools (side by side) */}
          {(!activeCategory && !searchQuery) && (
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {featuredTools.map((tool, i) => (
                <Link key={i} href={`/detay/ai-araclari/arac/${tool.slug}`}>
                <div className="glass rounded-xl p-5 relative overflow-hidden transition-all duration-300 hover:bg-white/[0.02] cursor-pointer" style={{ borderLeft: `3px solid ${tool.color}` }}>
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: `${tool.color}15`, color: tool.color }}>ÖNE ÇIKAN</span>
                  </div>
                  <h3 className="font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem" }}>{tool.name}</h3>
                  <div className="text-xs mb-2" style={{ color: "#64748B" }}>{tool.company}</div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "#94A3B8" }}>{tool.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tool.features.map((f, j) => (
                      <span key={j} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${tool.color}08`, color: tool.color }}>{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-3 h-3" style={{ color: j < Math.floor(tool.rating) ? tool.color : "#334155", fill: j < Math.floor(tool.rating) ? tool.color : "transparent" }} />
                      ))}
                    </div>
                    <span className="font-bold text-sm" style={{ color: tool.color, fontFamily: "Space Grotesk, sans-serif" }}>{tool.rating}</span>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          )}

          {/* Tool Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool, i) => {
              const catColor = toolCategories.find(c => c.name.includes(tool.category))?.color || BRAND_COLOR;
              return (
                <Link key={i} href={`/detay/ai-araclari/arac/${tool.slug}`}>
                <div className="glass rounded-xl p-4 transition-all duration-300 hover:scale-[1.01] group cursor-pointer" style={{ borderTop: `2px solid ${catColor}` }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{tool.name}</h3>
                      <span className="text-[10px]" style={{ color: "#64748B" }}>{tool.company}</span>
                    </div>
                    <div className="flex gap-1">
                      {tool.isNew && (
                        <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.15)", color: "#00E5A0" }}>YENİ</span>
                      )}
                      {tool.trending && (
                        <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>TREND</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-2.5 h-2.5" style={{ color: j < Math.floor(tool.rating) ? catColor : "#334155", fill: j < Math.floor(tool.rating) ? catColor : "transparent" }} />
                    ))}
                    <span className="text-[10px] mono" style={{ color: "#475569" }}>{tool.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {tool.features.slice(0, 3).map((f, j) => (
                      <span key={j} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: `${catColor}08`, color: catColor }}>{f}</span>
                    ))}
                    {tool.features.length > 3 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#64748B" }}>+{tool.features.length - 3}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px]" style={{ color: "#64748B" }}>
                    <span className="mono">{tool.pricing}</span>
                    <span>{tool.users}</span>
                  </div>
                </div>
                </Link>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-10">
              <Search className="w-8 h-8 mx-auto mb-3" style={{ color: "#334155" }} />
              <p className="text-sm" style={{ color: "#64748B" }}>Aramanızla eşleşen araç bulunamadı.</p>
            </div>
          )}
        </div>

        {/* ── KATEGORİLER: Large Category Grid ── */}
        <div data-section id="kategoriler">
          <SectionHeader id="kategoriler" label="Kategoriler" title="Araç Kategorileri" icon={<Layers className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolCategories.map((cat, i) => (
              <button key={i} onClick={() => { setActiveCategory(cat.name.includes("Sohbet") ? "Sohbet" : cat.name.split(" ")[0]); scrollTo("katalog"); }}
                className="glass rounded-xl p-5 text-left transition-all duration-300 hover:scale-[1.02]" style={{ borderLeft: `3px solid ${cat.color}` }}>
                <div className="mb-2" style={{ color: cat.color }}>{cat.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{cat.name}</h3>
                <p className="text-[10px] mb-2" style={{ color: "#64748B" }}>{cat.desc}</p>
                <span className="text-xs mono" style={{ color: cat.color }}>{cat.count} Araç</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── KARŞILAŞTIRMALAR: Full Comparison Table ── */}
        <div data-section id="karsilastirmalar">
          <SectionHeader id="karsilastirmalar" label="Karşılaştırmalar" title="Detaylı Karşılaştırma" icon={<SlidersHorizontal className="w-4 h-4" />} />

          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BRAND_COLOR}20` }}>
                    {["Araç", "Kategori", "Fiyat", "Kullanıcı", "Puan", "Öne Çıkan"].map(h => (
                      <th key={h} className="p-4 text-left text-xs mono uppercase tracking-wider" style={{ color: BRAND_COLOR }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aiTools.map((tool, i) => {
                    const catColor = toolCategories.find(c => c.name.includes(tool.category))?.color || BRAND_COLOR;
                    return (
                      <Link key={i} href={`/detay/ai-araclari/arac/${tool.slug}`}>
                      <tr className="border-b transition-colors hover:bg-white/[0.02] cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                        <td className="p-4">
                          <div className="font-semibold text-white">{tool.name}</div>
                          <div className="text-[10px]" style={{ color: "#64748B" }}>{tool.company}</div>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: `${catColor}10`, color: catColor }}>{tool.category}</span>
                        </td>
                        <td className="p-4 text-xs mono" style={{ color: BRAND_COLOR }}>{tool.pricing}</td>
                        <td className="p-4 text-xs" style={{ color: "#64748B" }}>{tool.users}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-sm" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{tool.rating}</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className="w-2.5 h-2.5" style={{ color: j < Math.floor(tool.rating) ? catColor : "#334155", fill: j < Math.floor(tool.rating) ? catColor : "transparent" }} />
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-0.5">
                            {tool.features.slice(0, 2).map((f, j) => (
                              <span key={j} className="text-[9px] px-1 py-0.5 rounded" style={{ background: `${BRAND_COLOR}06`, color: BRAND_COLOR }}>{f}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                      </Link>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── İNCELEMELER: Testimonial Cards ── */}
        <div data-section id="incelemeler">
          <SectionHeader id="incelemeler" label="İncelemeler" title="Kullanıcı İncelemeleri" icon={<Star className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <Link key={i} href={`/detay/ai-araclari/arac/${review.tool.toLowerCase()}`}>
              <div className="glass rounded-xl p-5 transition-all duration-300 cursor-pointer hover:bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-sm text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{review.tool}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3" style={{ color: BRAND_COLOR, fill: BRAND_COLOR }} />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: "#475569" }}>{review.date}</span>
                </div>
                <p className="text-sm italic" style={{ color: "#94A3B8" }}>"{review.text}"</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
