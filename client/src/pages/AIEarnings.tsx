/**
 * AIPUSULA — AI ile Kazanç Sayfası
 * Color: Gold (#FCD34D)
 * Layout: Hero + Income streams grid + Guide cards + Success stories + YouTube
 */
import { useState } from "react";
import {
  DollarSign, TrendingUp, Target, Users, BookOpen, ArrowRight,
  ChevronRight, Zap, Star, Clock, Award, Play, Monitor,
  Briefcase, Lightbulb,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/contexts/ThemeContext";

const BRAND_COLOR = "#FCD34D";

// ─── Income Streams ──────────────────────────────────────────────────────────
const incomeStreams = [
  { title: "AI Freelancing", monthly: "$2K–$15K", difficulty: "Orta", icon: <Briefcase className="w-5 h-5" />, desc: "AI araçlarını kullanarak içerik, tasarım ve yazılım hizmetleri satışı", examples: "ChatGPT yazımı, Midjourney tasarımı, veri analizi" },
  { title: "SaaS Ürünleri", monthly: "$5K–$50K", difficulty: "Zor", icon: <Monitor className="w-5 h-5" />, desc: "AI tabanlı yazılım ürünleri geliştirme ve abonelik satışı", examples: "AI chatbot, içerik üretim aracı, otomasyon platformu" },
  { title: "YouTube Otomasyonu", monthly: "$1K–$20K", difficulty: "Orta", icon: <Play className="w-5 h-5" />, desc: "AI ile video üretim, senaryo yazımı ve SEO optimizasyonu", examples: "Teknoloji kanalı, eğitim içerikleri, haber kanalı" },
  { title: "Affiliate Pazarlama", monthly: "$500–$8K", difficulty: "Kolay", icon: <Target className="w-5 h-5" />, desc: "AI araçları için affiliate linkleri ile komisyon kazanma", examples: "AI araç incelemeleri, karşılaştırma siteleri, blog" },
  { title: "Online Kurs Satışı", monthly: "$1K–$30K", difficulty: "Orta", icon: <BookOpen className="w-5 h-5" />, desc: "AI kullanımı hakkında online kurs ve eğitim satışı", examples: "ChatGPT mastery, AI içerik üretimi, prompt engineering" },
  { title: "AI Danışmanlığı", monthly: "$3K–$25K", difficulty: "Zor", icon: <Users className="w-5 h-5" />, desc: "Şirketlere AI entegrasyonu ve strateji danışmanlığı", examples: "Enterprise AI, süreç otomasyonu, veri stratejisi" },
];

// ─── Guides ──────────────────────────────────────────────────────────────────
const guides = [
  { title: "AI Freelancing ile Aylık $5K Kazanç Rehberi", readTime: "12 dk", category: "Freelance", level: "Başlangıç" },
  { title: "ChatGPT ile İçerik Üretimi: Tam Rehber", readTime: "18 dk", category: "İçerik", level: "Orta" },
  { title: "AI ile SaaS Ürün Geliştirme Adım Adım", readTime: "25 dk", category: "SaaS", level: "İleri" },
  { title: "YouTube AI Otomasyonu: Sıfırdan Başlangıç", readTime: "15 dk", category: "YouTube", level: "Başlangıç" },
  { title: "Prompt Engineering ile Gelir Artırma", readTime: "10 dk", category: "Teknik", level: "Orta" },
  { title: "AI Affiliate Pazarlama Stratejileri", readTime: "8 dk", category: "Pazarlama", level: "Başlangıç" },
];

// ─── Success Stories ─────────────────────────────────────────────────────────
const successStories = [
  { name: "Elif Y.", income: "$8,200/ay", method: "AI İçerik Üretimi", story: "ChatGPT ve Midjourney kullanarak kurumsal müşterilere içerik hizmeti sunuyorum. 6 ayda gelirim 3 katına çıktı.", avatar: "EY" },
  { name: "Can K.", income: "$15,000/ay", method: "AI SaaS", story: "AI destekli müşteri hizmetleri chatbot platformu geliştirdim. 3 ayda 200+ abone buldum.", avatar: "CK" },
  { name: "Zeynep A.", income: "$5,400/ay", method: "YouTube Otomasyonu", story: "AI ile günde 3 video üretiyorum. 4 ayda 50K aboneye ulaştım ve AdSense gelirim sürekli artıyor.", avatar: "ZA" },
  { name: "Mehmet S.", income: "$22,000/ay", method: "AI Danışmanlığı", story: "Enterprise şirketlere AI entegrasyonu danışmanlığı veriyorum. Her proje $5K-$15K arasında.", avatar: "MS" },
];

// ─── YouTube Ideas ───────────────────────────────────────────────────────────
const youtubeIdeas = [
  { title: "ChatGPT ile Günde 1 Saat Çalışarak $100 Kazanma", views: "245K", likes: "12.3K" },
  { title: "AI ile YouTube Kanalınızı 10x Büyütün", views: "189K", likes: "9.8K" },
  { title: "Freelancerlar İçin AI Araçları Rehberi 2026", views: "156K", likes: "7.2K" },
  { title: "AI ile SaaS Kurma: Sıfırdan $10K/ay", views: "312K", likes: "18.1K" },
];

export default function AIEarnings() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"rehberler" | "is-fikirleri" | "freelance" | "youtube" | "basari-hikayeleri">("is-fikirleri");

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
              03 — AI İLE KAZANÇ REHBERLERİ & İŞ FİKİRLERİ
            </span>
          </div>
          <h1 className="font-bold leading-tight" style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}>
            AI ile Kazanç
          </h1>
          <div className="h-px w-24 mt-3" style={{ background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_COLOR}60, transparent)` }} />
          <p className="text-sm mt-3 max-w-lg" style={{ color: "#64748B" }}>
            Yapay zekâ araçlarını kullanarak gelir elde etmenin kanıtlanmış yolları. Rehberler, iş fikirleri ve gerçek başarı hikayeleri.
          </p>
          <div className="flex flex-wrap gap-5 mt-5">
            {[
              { label: "Kazanç Rehberi", value: "38", icon: <BookOpen className="w-3.5 h-3.5" /> },
              { label: "İş Fikri", value: "24", icon: <Lightbulb className="w-3.5 h-3.5" /> },
              { label: "Başarı Hikayesi", value: "15", icon: <Award className="w-3.5 h-3.5" /> },
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
              GELİR STRATEJİ: 6 AKTİF
            </div>
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              REHBER: 38 PARÇA
            </div>
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              BAŞARI HİKAYESİ: 15 KAYNAK
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <div className="flex items-center gap-1 mt-6 overflow-x-auto pb-1">
        {[
          { id: "is-fikirleri" as const, label: "İş Fikirleri", icon: <Lightbulb className="w-3.5 h-3.5" /> },
          { id: "rehberler" as const, label: "Rehberler", icon: <BookOpen className="w-3.5 h-3.5" /> },
          { id: "freelance" as const, label: "Freelance", icon: <Briefcase className="w-3.5 h-3.5" /> },
          { id: "youtube" as const, label: "YouTube", icon: <Play className="w-3.5 h-3.5" /> },
          { id: "basari-hikayeleri" as const, label: "Başarı Hikayeleri", icon: <Award className="w-3.5 h-3.5" /> },
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
        {activeTab === "is-fikirleri" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incomeStreams.map((stream, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]" style={{ borderTop: `2px solid ${BRAND_COLOR}` }}>
                <div className="mb-3" style={{ color: BRAND_COLOR }}>{stream.icon}</div>
                <h3 className="font-semibold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{stream.title}</h3>
                <p className="text-xs mb-3" style={{ color: "#64748B" }}>{stream.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem" }}>{stream.monthly}</span>
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{
                    background: stream.difficulty === "Kolay" ? "rgba(0,229,160,0.15)" : stream.difficulty === "Orta" ? "rgba(252,211,77,0.15)" : "rgba(239,68,68,0.15)",
                    color: stream.difficulty === "Kolay" ? "#00E5A0" : stream.difficulty === "Orta" ? "#FCD34D" : "#EF4444",
                  }}>{stream.difficulty}</span>
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#475569" }}>{stream.examples}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "rehberler" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {guides.map((guide, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] group" style={{ borderLeft: `3px solid ${BRAND_COLOR}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>{guide.category}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(0,229,160,0.1)", color: "#00E5A0" }}>{guide.level}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{guide.title}</h3>
                <div className="flex items-center gap-3 text-xs" style={{ color: "#64748B" }}>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{guide.readTime}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: BRAND_COLOR }}>
                    Oku <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "freelance" && (
          <div className="space-y-4">
            <div className="glass rounded-xl p-6">
              <h3 className="font-bold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>AI Freelance Platformları</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { platform: "Upwork", category: "Genel", avgRate: "$35/saat", demand: "Çok Yüksek" },
                  { platform: "Fiverr", category: "Mikro İşler", avgRate: "$25-200/proje", demand: "Yüksek" },
                  { platform: "Toptal", category: "Elite", avgRate: "$80/saat", demand: "Orta" },
                  { platform: "bionluk", category: "TR", avgRate: "₺500-5K/proje", demand: "Yüksek" },
                ].map((p, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="font-bold text-white text-sm">{p.platform}</div>
                    <div className="text-xs" style={{ color: "#64748B" }}>{p.category}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs mono" style={{ color: BRAND_COLOR }}>{p.avgRate}</span>
                      <span className="text-[10px] mono" style={{ color: "#00E5A0" }}>{p.demand}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "youtube" && (
          <div className="space-y-4">
            {youtubeIdeas.map((video, i) => (
              <div key={i} className="glass rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:bg-white/[0.02]">
                <div className="w-16 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${BRAND_COLOR}10` }}>
                  <Play className="w-5 h-5" style={{ color: BRAND_COLOR }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{video.title}</h3>
                  <div className="flex items-center gap-3 text-xs mt-1" style={{ color: "#64748B" }}>
                    <span>{video.views} görüntülenme</span>
                    <span>{video.likes} beğeni</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "basari-hikayeleri" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {successStories.map((story, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black" style={{ background: BRAND_COLOR, fontFamily: "Space Grotesk, sans-serif" }}>
                    {story.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{story.name}</div>
                    <div className="text-xs" style={{ color: "#64748B" }}>{story.method}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-bold" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{story.income}</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>"{story.story}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
