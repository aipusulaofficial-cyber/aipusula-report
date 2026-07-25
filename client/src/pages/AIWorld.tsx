/**
 * AIPUSULA — Yapay Zekâ Sayfası
 * Color: Cyan (#06B6D4)
 * Layout: EDITORIAL MAGAZINE — Featured hero article + news grid + model carousel + trends + research + events
 * Scroll-to-section navigation (NOT tabs)
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Brain, Zap, TrendingUp, BookOpen, Calendar, ArrowRight,
  Clock, Eye, ChevronRight, Layers, Sparkles, ChevronDown,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/contexts/ThemeContext";

const BRAND_COLOR = "#06B6D4";

// ─── AI News Data ────────────────────────────────────────────────────────────
const featuredNews = {
  title: "OpenAI GPT-5: Multimodal Reasoning & Agentic AI",
  summary: "GPT-5, gerçek dünya etkileşimi ve otonom görev yürütme kapasitesiyle yeni bir dönemi başlatıyor. Agentic AI, sadece yanıtlar üretmekle kalmayıp, kompleks iş akışlarını kendi başına yönetebiliyor.",
  tag: "Öne Çıkan",
  tagColor: "#06B6D4",
  time: "2 saat önce",
  readTime: "8 dk",
};

const aiNews = [
  { title: "Anthropic Claude 4: Uzun Bağlam Pencereleri ve Tool Use", summary: "200K token bağlam penceresi ve gelişmiş araç kullanımı ile Claude 4, iş akışlarını dönüştürüyor.", time: "4 saat önce", tag: "Güncelleme", tagColor: "#A78BFA" },
  { title: "Google DeepMind: AlphaFold 3 Protein Yapı Tahmini", summary: "AlphaFold 3, ilaç keşfini hızlandıran protein yapı tahmininde %30 daha yüksek doğruluk sunuyor.", time: "6 saat önce", tag: "Araştırma", tagColor: "#38BDF8" },
  { title: "Meta Llama 4: Açık Kaynak LLM Geliştirmeleri", summary: "405B parametreli Llama 4, açık kaynak dünyasında en güçlü model olarak öne çıkıyor.", time: "8 saat önce", tag: "Açık Kaynak", tagColor: "#FCD34D" },
  { title: "AI Agent Ekosistemi: Otonom Görev Yürütme", summary: "AI ajanları artık e-posta yönetimi, kod yazımı ve veri analizi gibi karmaşık görevleri otonom yürütüyor.", time: "12 saat önce", tag: "Trend", tagColor: "#F97316" },
  { title: "Microsoft Copilot: Enterprise AI Entegrasyonu", summary: "Microsoft 365 ekosistemine entegre Copilot, kurumsal üretkenliği dönüştürüyor.", time: "1 gün önce", tag: "Enterprise", tagColor: "#00E5A0" },
  { title: "AI Safety: Yeni Düzenleme Standartları", summary: "AB AI Act ve ABD düzenlemeleri, AI sistemleri için yeni güvenlik standartları getiriyor.", time: "1 gün önce", tag: "Düzenleme", tagColor: "#FB7185" },
];

// ─── AI Models ───────────────────────────────────────────────────────────────
const aiModels = [
  { name: "GPT-5", company: "OpenAI", params: "Otonom AI", type: "Çok Modlu", strength: "95%", color: "#06B6D4", desc: "Çok modlu reasoning ve agentic görev yürütme" },
  { name: "Claude 4", company: "Anthropic", params: "200K bağlam", type: "Araç Kullanımı", strength: "88%", color: "#A78BFA", desc: "Uzun bağlam ve gelişmiş tool use" },
  { name: "Gemini 2.0", company: "Google", params: "Çok modlu", type: "Uzun Bağlam", strength: "87%", color: "#38BDF8", desc: "Google ekosistem entegrasyonu" },
  { name: "Llama 4", company: "Meta", params: "405B parametre", type: "Açık Kaynak", strength: "82%", color: "#FCD34D", desc: "En güçlü açık kaynak model" },
  { name: "Mistral Large", company: "Mistral AI", params: "248B parametre", type: "Multilingual", strength: "78%", color: "#FB7185", desc: "Avrupa merkezli güçlü model" },
  { name: "Groq LPU", company: "Groq", params: "Ultra hızlı", type: "Inference Engine", strength: "91%", color: "#00E5A0", desc: "En hızlı inference motoru" },
];

// ─── Trends ──────────────────────────────────────────────────────────────────
const aiTrends = [
  { title: "Agentic AI", growth: "+340%", desc: "Otonom AI ajanları iş akışlarını dönüştürüyor", bar: 94 },
  { title: "Multimodal Modeller", growth: "+180%", desc: "Metin, görsel ve ses entegrasyonu", bar: 78 },
  { title: "On-Device AI", growth: "+220%", desc: "Cihazda çalışan AI modelleri", bar: 82 },
  { title: "AI Coding Assistants", growth: "+150%", desc: "Kod üretimi ve debug otomasyonu", bar: 72 },
  { title: "RAG Sistemleri", growth: "+120%", desc: "Retrieval-Augmented Generation yaygınlaşıyor", bar: 65 },
  { title: "AI Safety & Alignment", growth: "+95%", desc: "Güvenli AI geliştirme önceliği artıyor", bar: 55 },
];

// ─── Research Papers ─────────────────────────────────────────────────────────
const researchPapers = [
  { title: "Chain-of-Thought Reasoning in Large Language Models", authors: "OpenAI Research", date: "Temmuz 2026", citations: 2847, journal: "NeurIPS 2026" },
  { title: "Scaling Laws for Neural Language Models: Revisited", authors: "Anthropic", date: "Haziran 2026", citations: 1923, journal: "ICML 2026" },
  { title: "Emergent Abilities of Large Language Models", authors: "Google Brain", date: "Mayıs 2026", citations: 3156, journal: "Nature AI" },
  { title: "Self-Play Fine-Tuning for Aligned AI", authors: "OpenAI", date: "Temmuz 2026", citations: 1445, journal: "AAAI 2026" },
  { title: "Retrieval-Augmented Generation: A Survey", authors: "DeepMind", date: "Haziran 2026", citations: 2201, journal: "ACL 2026" },
];

// ─── Events ──────────────────────────────────────────────────────────────────
const events = [
  { title: "AI Summit Istanbul 2026", date: "15 Ağustos 2026", location: "İstanbul, TR", type: "Konferans", desc: "Türkiye'nin en büyük AI konferansı. 50+ konuşmacı, 2000+ katılımcı." },
  { title: "LLM Developer Conference", date: "22 Ağustos 2026", location: "Online", type: "Konferans", desc: "Büyük dil modelleri geliştiricileri için teknik konferans." },
  { title: "AI Safety Workshop", date: "1 Eylül 2026", location: "Londra, UK", type: "Workshop", desc: "AI güvenliği ve hizalama üzerine pratik workshop." },
  { title: "Open Source AI Hackathon", date: "10 Eylül 2026", location: "Online", type: "Hackathon", desc: "48 saatlik açık kaynak AI hackathonu. $50K ödül." },
  { title: "AGI Research Symposium", date: "25 Eylül 2026", location: "San Francisco, USA", type: "Sempozyum", desc: "AGI araştırmaları üzerine akademik sempozyum." },
];

// ─── Section Component ───────────────────────────────────────────────────────
function SectionHeader({ id, label, title, icon }: { id: string; label: string; title: string; icon: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24 mb-6">
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

export default function AIWorld() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [scrollActive, setScrollActive] = useState("haberler");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrollActive(entry.target.id);
          }
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
    { id: "haberler", label: "Haberler", icon: <Zap className="w-3.5 h-3.5" /> },
    { id: "modeller", label: "Modeller", icon: <Brain className="w-3.5 h-3.5" /> },
    { id: "trendler", label: "Trendler", icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: "arastirmalar", label: "Araştırmalar", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "etkinlikler", label: "Etkinlikler", icon: <Calendar className="w-3.5 h-3.5" /> },
  ];

  return (
    <AppShell>
      {/* ── Hero: Featured Article Layout ── */}
      <section className="relative overflow-hidden py-6 intel-grid-bg intel-scanline intel-corner">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 30% 40%, ${BRAND_COLOR}08 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${BRAND_COLOR}04 0%, transparent 50%)`,
        }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ background: BRAND_COLOR }} />
            <span className="mono text-xs uppercase tracking-[0.25em]" style={{ color: BRAND_COLOR }}>
              01 — YAPAY ZEKÂ HABERLERİ, MODELLER & TRENDLER
            </span>
          </div>
          <h1 className="font-bold leading-tight" style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}>
            Yapay Zekâ Dünyası
          </h1>
          <div className="h-px w-24 mt-3" style={{ background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_COLOR}60, transparent)` }} />
          <p className="text-sm mt-2 max-w-lg" style={{ color: "#64748B" }}>
            Sektörün en güncel gelişmelerini, modellerin karşılaştırmalarını ve trend analizlerini tek bir merkezde takip edin.
          </p>

          <div className="flex items-start gap-4 mt-4">
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Makale", value: "247", icon: <BookOpen className="w-3.5 h-3.5" /> },
                { label: "Model", value: "28", icon: <Brain className="w-3.5 h-3.5" /> },
                { label: "Trend", value: "15", icon: <TrendingUp className="w-3.5 h-3.5" /> },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div style={{ color: BRAND_COLOR }}>{s.icon}</div>
                  <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", color: BRAND_COLOR }}>{s.value}</span>
                  <span className="text-xs" style={{ color: "#475569" }}>{s.label}</span>
                </div>
              ))}
            </div>
            {/* AI Signal Desk mini */}
            <div className="ml-auto hidden lg:block">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,229,160,0.04)", border: "1px solid rgba(0,229,160,0.12)" }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00E5A0", boxShadow: "0 0 4px #00E5A0" }} />
                <span className="text-[10px] mono" style={{ color: "#00E5A0" }}>AI SİNYAL DEĞİŞİMİ</span>
                <span className="text-[10px] mono" style={{ color: "#475569" }}>|</span>
                <span className="text-[10px] mono" style={{ color: "#00E5A0" }}>5 YENİ MODEL</span>
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
        {/* ── HABERLER: Featured + Grid Layout ── */}
        <div data-section id="haberler">
          <SectionHeader id="haberler" label="Haberler" title="Son Gelişmeler" icon={<Zap className="w-4 h-4" />} />

          {/* Featured Article */}
          <div className="glass rounded-xl p-6 mb-5" style={{ borderLeft: `3px solid ${BRAND_COLOR}` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] mono px-2.5 py-0.5 rounded-full" style={{ background: `${featuredNews.tagColor}20`, color: featuredNews.tagColor }}>{featuredNews.tag}</span>
              <span className="text-xs" style={{ color: "#475569" }}>{featuredNews.time}</span>
              <span className="text-xs flex items-center gap-1" style={{ color: "#64748B" }}><Clock className="w-3 h-3" />{featuredNews.readTime} okuma</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{featuredNews.title}</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#94A3B8" }}>{featuredNews.summary}</p>
            <div className="flex items-center gap-1 text-sm" style={{ color: BRAND_COLOR }}>
              <span>Devamını Oku</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* News Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {aiNews.map((news, i) => (
              <div key={i} className="glass rounded-xl p-4 transition-all duration-300 hover:scale-[1.01] group" style={{ borderTop: `2px solid ${news.tagColor}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: `${news.tagColor}15`, color: news.tagColor }}>{news.tag}</span>
                  <span className="text-xs" style={{ color: "#475569" }}>{news.time}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{news.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{news.summary}</p>
                <div className="flex items-center gap-1 mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: BRAND_COLOR }}>
                  <span>Devamını Oku</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MODELLER: Horizontal Comparison Cards ── */}
        <div data-section id="modeller">
          <SectionHeader id="modeller" label="Modeller" title="Güncel AI Modelleri" icon={<Brain className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiModels.map((model, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]" style={{ borderLeft: `3px solid ${model.color}` }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.05rem" }}>{model.name}</h3>
                  <span className="font-bold text-sm" style={{ color: model.color, fontFamily: "Space Grotesk, sans-serif" }}>{model.strength}</span>
                </div>
                <div className="text-xs mb-2" style={{ color: "#64748B" }}>{model.company} · {model.params}</div>
                <p className="text-xs mb-3" style={{ color: "#94A3B8" }}>{model.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: `${model.color}10`, color: model.color }}>{model.type}</span>
                </div>
                {/* Mini strength bar */}
                <div className="mt-3 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{
                    width: model.strength,
                    background: `linear-gradient(90deg, ${model.color}, ${model.color}80)`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRENDLER: Ranked List with Progress Bars ── */}
        <div data-section id="trendler">
          <SectionHeader id="trendler" label="Trendler" title="Yükselen Trendler" icon={<TrendingUp className="w-4 h-4" />} />

          <div className="glass rounded-xl p-5">
            <div className="space-y-4">
              {aiTrends.map((trend, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className="mono text-xs font-bold w-6" style={{ color: BRAND_COLOR }}>{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{trend.title}</h3>
                    </div>
                    <span className="font-bold text-xs" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{trend.growth}</span>
                  </div>
                  <p className="text-xs mb-2 pl-9" style={{ color: "#64748B" }}>{trend.desc}</p>
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full ml-9" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="h-full rounded-full transition-all duration-700 ease-out" style={{
                      width: `${trend.bar}%`,
                      background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_COLOR}60)`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ARAŞTIRMALAR: Academic Paper List ── */}
        <div data-section id="arastirmalar">
          <SectionHeader id="arastirmalar" label="Araştırmalar" title="Araştırma Makaleleri" icon={<Layers className="w-4 h-4" />} />

          <div className="space-y-3">
            {researchPapers.map((paper, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.02] group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-1.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{paper.title}</h3>
                    <div className="flex items-center gap-3 text-xs" style={{ color: "#64748B" }}>
                      <span>{paper.authors}</span>
                      <span>{paper.journal}</span>
                      <span>{paper.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                    <Eye className="w-3 h-3" style={{ color: BRAND_COLOR }} />
                    <span className="mono text-xs" style={{ color: BRAND_COLOR }}>{paper.citations.toLocaleString()}</span>
                    <span className="text-[10px]" style={{ color: "#475569" }}>atıf</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ETKİNLİKLER: Timeline Layout ── */}
        <div data-section id="etkinlikler">
          <SectionHeader id="etkinlikler" label="Etkinlikler" title="Yaklaşan Etkinlikler" icon={<Calendar className="w-4 h-4" />} />

          <div className="relative pl-6">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${BRAND_COLOR}, ${BRAND_COLOR}20, transparent)` }} />

            <div className="space-y-5">
              {events.map((event, i) => (
                <div key={i} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 top-5 w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: BRAND_COLOR, background: `${BRAND_COLOR}20` }} />

                  <div className="glass rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{event.title}</h3>
                      <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>{event.type}</span>
                    </div>
                    <p className="text-xs mb-3" style={{ color: "#94A3B8" }}>{event.desc}</p>
                    <div className="flex items-center gap-4 text-xs" style={{ color: "#64748B" }}>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
