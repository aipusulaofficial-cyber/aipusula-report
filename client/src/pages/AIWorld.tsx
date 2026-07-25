/**
 * AIPUSULA — Yapay Zekâ Sayfası
 * Color: Cyan (#06B6D4)
 * Layout: Full-width hero + 3-column news grid + featured models + trends
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Brain, Zap, TrendingUp, BookOpen, Calendar, ArrowRight,
  Clock, Star, Eye, ChevronRight, Layers, Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/contexts/ThemeContext";

const BRAND_COLOR = "#06B6D4";

// ─── AI News Data ────────────────────────────────────────────────────────────
const aiNews = [
  { title: "OpenAI GPT-5: Multimodal Reasoning & Agentic AI", summary: "GPT-5, gerçek dünya etkileşimi ve otonom görev yürütme kapasitesiyle yeni bir dönemi başlatıyor.", time: "2 saat önce", tag: "Yeni Model", tagColor: "#06B6D4" },
  { title: "Anthropic Claude 4: Uzun Bağlam Pencereleri ve Tool Use", summary: "200K token bağlam penceresi ve gelişmiş araç kullanımı ile Claude 4, iş akışlarını dönüştürüyor.", time: "4 saat önce", tag: "Güncelleme", tagColor: "#A78BFA" },
  { title: "Google DeepMind: AlphaFold 3 Protein Yapı Tahmini", summary: "AlphaFold 3, ilaç keşfini hızlandıran protein yapı tahmininde %30 daha yüksek doğruluk sunuyor.", time: "6 saat önce", tag: "Araştırma", tagColor: "#38BDF8" },
  { title: "Meta Llama 4: Açık Kaynak LLM Geliştirmeleri", summary: "405B parametreli Llama 4, açık kaynak dünyasında en güçlü model olarak öne çıkıyor.", time: "8 saat önce", tag: "Açık Kaynak", tagColor: "#FCD34D" },
  { title: "AI Agent Ekosistemi: Otonom Görev Yürütme", summary: "AI ajanları artık e-posta yönetimi, kod yazımı ve veri analizi gibi karmaşık görevleri otonom yürütüyor.", time: "12 saat önce", tag: "Trend", tagColor: "#F97316" },
  { title: "Microsoft Copilot: Enterprise AI Entegrasyonu", summary: "Microsoft 365 ekosistemine entegre Copilot, kurumsal üretkenliği dönüştürüyor.", time: "1 gün önce", tag: "Enterprise", tagColor: "#00E5A0" },
];

// ─── AI Models ───────────────────────────────────────────────────────────────
const aiModels = [
  { name: "GPT-5", company: "OpenAI", params: "Otonom AI", type: "Çok Modlu", strength: "95%", color: "#06B6D4" },
  { name: "Claude 4", company: "Anthropic", params: "200K bağlam", type: "Araç Kullanımı", strength: "88%", color: "#A78BFA" },
  { name: "Gemini 2.0", company: "Google", params: "Çok modlu", type: "Uzun Bağlam", strength: "87%", color: "#38BDF8" },
  { name: "Llama 4", company: "Meta", params: "405B parametre", type: "Açık Kaynak", strength: "82%", color: "#FCD34D" },
  { name: "Mistral Large", company: "Mistral AI", params: "248B parametre", type: "Multilingual", strength: "78%", color: "#FB7185" },
  { name: "Groq LPU", company: "Groq", params: "Ultra hızlı", type: "Inference Engine", strength: "91%", color: "#00E5A0" },
];

// ─── Trends ──────────────────────────────────────────────────────────────────
const aiTrends = [
  { title: "Agentic AI", growth: "+340%", desc: "Otonom AI ajanları iş akışlarını dönüştürüyor" },
  { title: "Multimodal Modeller", growth: "+180%", desc: "Metin, görsel ve ses entegrasyonu" },
  { title: "On-Device AI", growth: "+220%", desc: "Cihazda çalışan AI modelleri" },
  { title: "AI Coding Assistants", growth: "+150%", desc: "Kod üretimi ve debug otomasyonu" },
  { title: "RAG Sistemleri", growth: "+120%", desc: "Retrieval-Augmented Generation yaygınlaşıyor" },
  { title: "AI Safety & Alignment", growth: "+95%", desc: "Güvenli AI geliştirme önceliği artıyor" },
];

// ─── Research Papers ─────────────────────────────────────────────────────────
const researchPapers = [
  { title: "Chain-of-Thought Reasoning in Large Language Models", authors: "OpenAI Research", date: "Temmuz 2026", citations: 2847 },
  { title: "Scaling Laws for Neural Language Models: Revisited", authors: "Anthropic", date: "Haziran 2026", citations: 1923 },
  { title: "Emergent Abilities of Large Language Models", authors: "Google Brain", date: "Mayıs 2026", citations: 3156 },
  { title: "Self-Play Fine-Tuning for Aligned AI", authors: "OpenAI", date: "Temmuz 2026", citations: 1445 },
];

// ─── Events ──────────────────────────────────────────────────────────────────
const events = [
  { title: "AI Summit Istanbul 2026", date: "15 Ağustos 2026", location: "İstanbul, TR", type: "Konferans" },
  { title: "LLM Developer Conference", date: "22 Ağustos 2026", location: "Online", type: "Konferans" },
  { title: "AI Safety Workshop", date: "1 Eylül 2026", location: "Londra, UK", type: "Workshop" },
  { title: "Open Source AI Hackathon", date: "10 Eylül 2026", location: "Online", type: "Hackathon" },
];

export default function AIWorld() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"haberler" | "modeller" | "trendler" | "arastirmalar" | "etkinlikler">("haberler");

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
          <p className="text-sm mt-3 max-w-lg" style={{ color: "#64748B" }}>
            Sektörün en güncel gelişmelerini, modellerin karşılaştırmalarını ve trend analizlerini tek bir merkezde takip edin.
          </p>

          {/* Intel Data Strip */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              TARAMA: AKTİF
            </div>
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              MODEL VERİ: 28 KAYNAK
            </div>
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              TREND ANALİZ: 15 PARÇA
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-5 mt-5">
            {[
              { label: "Son Makaleler", value: "247", icon: <BookOpen className="w-3.5 h-3.5" /> },
              { label: "AI Modelleri", value: "28", icon: <Brain className="w-3.5 h-3.5" /> },
              { label: "Trend Analizleri", value: "15", icon: <TrendingUp className="w-3.5 h-3.5" /> },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div style={{ color: BRAND_COLOR }}>{s.icon}</div>
                <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem", color: BRAND_COLOR }}>{s.value}</span>
                <span className="text-xs" style={{ color: "#475569" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <div className="flex items-center gap-1 mt-6 overflow-x-auto pb-1">
        {[
          { id: "haberler" as const, label: "Haberler", icon: <Zap className="w-3.5 h-3.5" /> },
          { id: "modeller" as const, label: "Modeller", icon: <Brain className="w-3.5 h-3.5" /> },
          { id: "trendler" as const, label: "Trendler", icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { id: "arastirmalar" as const, label: "Araştırmalar", icon: <Layers className="w-3.5 h-3.5" /> },
          { id: "etkinlikler" as const, label: "Etkinlikler", icon: <Calendar className="w-3.5 h-3.5" /> },
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
        {activeTab === "haberler" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {aiNews.map((news, i) => (
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

        {activeTab === "modeller" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiModels.map((model, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]" style={{ borderLeft: `3px solid ${model.color}` }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem" }}>{model.name}</h3>
                  <span className="font-bold" style={{ color: model.color, fontFamily: "Space Grotesk, sans-serif" }}>{model.strength}</span>
                </div>
                <div className="text-xs" style={{ color: "#475569" }}>{model.company}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: `${model.color}10`, color: model.color }}>{model.type}</span>
                </div>
                <div className="text-xs mt-2" style={{ color: "#64748B" }}>{model.params}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "trendler" && (
          <div className="space-y-3">
            {aiTrends.map((trend, i) => (
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

        {activeTab === "arastirmalar" && (
          <div className="space-y-3">
            {researchPapers.map((paper, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300">
                <h3 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{paper.title}</h3>
                <div className="flex items-center gap-3 text-xs" style={{ color: "#64748B" }}>
                  <span>{paper.authors}</span>
                  <span>{paper.date}</span>
                  <span className="mono" style={{ color: BRAND_COLOR }}>{paper.citations.toLocaleString()} atıf</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "etkinlikler" && (
          <div className="space-y-3">
            {events.map((event, i) => (
              <div key={i} className="glass rounded-xl p-5 flex items-center gap-4 transition-all duration-300">
                <div className="p-2.5 rounded-lg" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{event.title}</h3>
                  <div className="flex items-center gap-3 text-xs mt-1" style={{ color: "#64748B" }}>
                    <span>{event.date}</span>
                    <span>{event.location}</span>
                    <span className="mono" style={{ color: BRAND_COLOR }}>{event.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
