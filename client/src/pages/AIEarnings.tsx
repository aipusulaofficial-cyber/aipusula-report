/**
 * AIPUSULA — AI ile Kazanç Sayfası
 * Color: Gold (#FCD34D)
 * Layout: REVENUE FUNNEL — Income ladder hero + featured guide + business ideas grid + freelance platforms + YouTube + success stories
 * Scroll-to-section navigation
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  DollarSign, TrendingUp, Target, Users, BookOpen, ArrowRight,
  ChevronRight, Zap, Star, Clock, Award, Play, Monitor,
  Briefcase, Lightbulb, ArrowUpRight, BarChart3,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/contexts/ThemeContext";

const BRAND_COLOR = "#FCD34D";

// ─── Income Streams ──────────────────────────────────────────────────────────
const incomeStreams = [
  { title: "AI Freelancing", monthly: "$2K–$15K", difficulty: "Orta", timeToFirst: "2-4 hafta", icon: <Briefcase className="w-5 h-5" />, desc: "AI araçlarını kullanarak içerik, tasarım ve yazılım hizmetleri satışı", examples: "ChatGPT yazımı, Midjourney tasarımı, veri analizi", bar: 55, slug: "ai-freelancing" },
  { title: "SaaS Ürünleri", monthly: "$5K–$50K", difficulty: "Zor", timeToFirst: "2-6 ay", icon: <Monitor className="w-5 h-5" />, desc: "AI tabanlı yazılım ürünleri geliştirme ve abonelik satışı", examples: "AI chatbot, içerik üretim aracı, otomasyon platformu", bar: 80, slug: "saas-urunleri" },
  { title: "YouTube Otomasyonu", monthly: "$1K–$20K", difficulty: "Orta", timeToFirst: "1-3 ay", icon: <Play className="w-5 h-5" />, desc: "AI ile video üretim, senaryo yazımı ve SEO optimizasyonu", examples: "Teknoloji kanalı, eğitim içerikleri, haber kanalı", bar: 45, slug: "youtube-otomasyon" },
  { title: "Affiliate Pazarlama", monthly: "$500–$8K", difficulty: "Kolay", timeToFirst: "1-2 hafta", icon: <Target className="w-5 h-5" />, desc: "AI araçları için affiliate linkleri ile komisyon kazanma", examples: "AI araç incelemeleri, karşılaştırma siteleri, blog", bar: 30, slug: "affiliate-pazarlama" },
  { title: "Online Kurs Satışı", monthly: "$1K–$30K", difficulty: "Orta", timeToFirst: "1-2 ay", icon: <BookOpen className="w-5 h-5" />, desc: "AI kullanımı hakkında online kurs ve eğitim satışı", examples: "ChatGPT mastery, AI içerik üretimi, prompt engineering", bar: 50, slug: "online-kurs-satis" },
  { title: "AI Danışmanlığı", monthly: "$3K–$25K", difficulty: "Zor", timeToFirst: "1-3 ay", icon: <Users className="w-5 h-5" />, desc: "Şirketlere AI entegrasyonu ve strateji danışmanlığı", examples: "Enterprise AI, süreç otomasyonu, veri stratejisi", bar: 70, slug: "ai-danismanlik" },
];

// ─── Guides ──────────────────────────────────────────────────────────────────
const guides = [
  { title: "AI Freelancing ile Aylık $5K Kazanç Rehberi", readTime: "12 dk", category: "Freelance", level: "Başlangıç", difficulty: "Kolay", slug: "ai-freelancing-5k" },
  { title: "ChatGPT ile İçerik Üretimi: Tam Rehber", readTime: "18 dk", category: "İçerik", level: "Orta", difficulty: "Orta", slug: "chatgpt-icerik-uretimi" },
  { title: "AI ile SaaS Ürün Geliştirme Adım Adım", readTime: "25 dk", category: "SaaS", level: "İleri", difficulty: "Zor", slug: "ai-saas-gelistirme" },
  { title: "YouTube AI Otomasyonu: Sıfırdan Başlangıç", readTime: "15 dk", category: "YouTube", level: "Başlangıç", difficulty: "Kolay", slug: "youtube-ai-otomasyon" },
  { title: "Prompt Engineering ile Gelir Artırma", readTime: "10 dk", category: "Teknik", level: "Orta", difficulty: "Orta", slug: "prompt-engineering-gelir" },
  { title: "AI Affiliate Pazarlama Stratejileri", readTime: "8 dk", category: "Pazarlama", level: "Başlangıç", difficulty: "Kolay", slug: "ai-affiliate-pazarlama" },
  { title: "AI Danışmanlığı: Kurumsal Satış Süreci", readTime: "20 dk", category: "Danışmanlık", level: "İleri", difficulty: "Zor", slug: "ai-danismanlik-kurumsal" },
  { title: "Midjourney ile Dijital Sanat Satışı", readTime: "14 dk", category: "Sanat", level: "Orta", difficulty: "Orta", slug: "midjourney-sanat-satisi" },
];

// ─── Success Stories ─────────────────────────────────────────────────────────
const successStories = [
  { name: "Elif Y.", income: "$8,200/ay", method: "AI İçerik Üretimi", story: "ChatGPT ve Midjourney kullanarak kurumsal müşterilere içerik hizmeti sunuyorum. 6 ayda gelirim 3 katına çıktı.", avatar: "EY", months: "6 ay", slug: "elif-y-icerik" },
  { name: "Can K.", income: "$15,000/ay", method: "AI SaaS", story: "AI destekli müşteri hizmetleri chatbot platformu geliştirdim. 3 ayda 200+ abone buldum.", avatar: "CK", months: "8 ay", slug: "can-k-saas" },
  { name: "Zeynep A.", income: "$5,400/ay", method: "YouTube Otomasyonu", story: "AI ile günde 3 video üretiyorum. 4 ayda 50K aboneye ulaştım ve AdSense gelirim sürekli artıyor.", avatar: "ZA", months: "4 ay", slug: "zeynep-a-youtube" },
  { name: "Mehmet S.", income: "$22,000/ay", method: "AI Danışmanlığı", story: "Enterprise şirketlere AI entegrasyonu danışmanlığı veriyorum. Her proje $5K-$15K arasında.", avatar: "MS", months: "12 ay", slug: "mehmet-s-danismanlik" },
];

// ─── Freelance Platforms ─────────────────────────────────────────────────────
const freelancePlatforms = [
  { platform: "Upwork", category: "Genel", avgRate: "$35/saat", demand: "Çok Yüksek", demandColor: "#00E5A0", slug: "upwork" },
  { platform: "Fiverr", category: "Mikro İşler", avgRate: "$25-200/proje", demand: "Yüksek", demandColor: "#00E5A0", slug: "fiverr" },
  { platform: "Toptal", category: "Elite", avgRate: "$80/saat", demand: "Orta", demandColor: "#FCD34D", slug: "toptal" },
  { platform: "bionluk", category: "TR", avgRate: "₺500-5K/proje", demand: "Yüksek", demandColor: "#00E5A0", slug: "bionluk" },
];

// ─── YouTube Ideas ───────────────────────────────────────────────────────────
const youtubeIdeas = [
  { title: "ChatGPT ile Günde 1 Saat Çalışarak $100 Kazanma", views: "245K", likes: "12.3K", duration: "18:42" },
  { title: "AI ile YouTube Kanalınızı 10x Büyütün", views: "189K", likes: "9.8K", duration: "22:15" },
  { title: "Freelancerlar İçin AI Araçları Rehberi 2026", views: "156K", likes: "7.2K", duration: "15:30" },
  { title: "AI ile SaaS Kurma: Sıfırdan $10K/ay", views: "312K", likes: "18.1K", duration: "28:45" },
  { title: "Prompt Engineering: Tam Kurs", views: "421K", likes: "24.5K", duration: "1:12:00" },
];

// ─── Prompt Tips ─────────────────────────────────────────────────────────────
const promptTips = [
  { title: "Rol Atama Tekniği", desc: "\"Sen deneyimli bir dijital pazarlama uzmanısın\" — AI'a belirli bir rol vererek daha uzman yanıtlar alın.", code: "As an expert [role], create [output] for [audience] using [method]." },
  { title: "Chain-of-Thought Prompting", desc: "AI'dan adım adım düşünmesini isteyin. Karmaşık görevlerde doğruluk artışı sağlar.", code: "Think step by step. First [step 1], then [step 2], finally [output]." },
  { title: "Few-Shot Learning", desc: "2-3 örnek vererek AI'ın istediğiniz formatı anlamasını sağlayın.", code: "Example 1: [input] → [output]\nExample 2: [input] → [output]\nNow: [new input] →" },
  { title: "Output Format Belirtme", desc: "Tablo, JSON, Markdown veya belirli bir yapı isteyerek kullanım kolaylığını artırın.", code: "Format as a markdown table with columns: [col1], [col2], [col3]." },
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

export default function AIEarnings() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [scrollActive, setScrollActive] = useState("is-fikirleri");

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
    { id: "is-fikirleri", label: "İş Fikirleri", icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { id: "rehberler", label: "Rehberler", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "freelance", label: "Freelance", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: "youtube", label: "YouTube", icon: <Play className="w-3.5 h-3.5" /> },
    { id: "basari-hikayeleri", label: "Başarı Hikayeleri", icon: <Award className="w-3.5 h-3.5" /> },
  ];

  return (
    <AppShell>
      {/* ── Hero: Revenue Potential Layout ── */}
      <section className="relative overflow-hidden py-6 intel-grid-bg intel-scanline intel-corner">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 30% 40%, ${BRAND_COLOR}08 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${BRAND_COLOR}04 0%, transparent 50%)`,
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
          <p className="text-sm mt-2 max-w-lg" style={{ color: "#64748B" }}>
            Yapay zekâ araçlarını kullanarak gelir elde etmenin kanıtlanmış yolları. Rehberler, iş fikirleri ve gerçek başarı hikayeleri.
          </p>

          {/* Revenue Signal Board */}
          <div className="mt-4 flex items-start gap-4">
            <div className="flex-1 p-4 rounded-lg" style={{ background: `${BRAND_COLOR}05`, border: `1px solid ${BRAND_COLOR}15` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs mono" style={{ color: "#64748B" }}>POTANSİYEL AYLIK GELİR</span>
                <span className="text-xs mono" style={{ color: "#00E5A0" }}>6 AKTİF STRATEJİ</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.75rem", color: "#00E5A0" }}>$50K</span>
                <span className="text-xs mb-1" style={{ color: "#64748B" }}>aylık potansiyel</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <ArrowUpRight className="w-4 h-4" style={{ color: "#00E5A0" }} />
                  <span className="text-xs font-bold" style={{ color: "#00E5A0" }}>AI pazarı +35% YoY</span>
                </div>
              </div>
            </div>
            {/* Signal indicators mini */}
            <div className="hidden lg:flex flex-col gap-1.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,229,160,0.04)", border: "1px solid rgba(0,229,160,0.12)" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00E5A0" }} />
                <span className="text-[10px] mono" style={{ color: "#00E5A0" }}>KAZANÇ SİNYALİ</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(252,211,77,0.04)", border: "1px solid rgba(252,211,77,0.12)" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FCD34D" }} />
                <span className="text-[10px] mono" style={{ color: "#FCD34D" }}>3.2K ÇALIŞMAKTA</span>
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
        {/* ── İŞ FİKİRLERİ: Income Ladder ── */}
        <div data-section id="is-fikirleri">
          <SectionHeader id="is-fikirleri" label="İş Fikirleri" title="Gelir Stratejileri" icon={<Lightbulb className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incomeStreams.map((stream, i) => (
              <Link key={i} href={`/detay/ai-ile-kazanc/guide/${stream.slug}`}>
              <div className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div style={{ color: BRAND_COLOR }}>{stream.icon}</div>
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{
                    background: stream.difficulty === "Kolay" ? "rgba(0,229,160,0.15)" : stream.difficulty === "Orta" ? "rgba(252,211,77,0.15)" : "rgba(239,68,68,0.15)",
                    color: stream.difficulty === "Kolay" ? "#00E5A0" : stream.difficulty === "Orta" ? "#FCD34D" : "#EF4444",
                  }}>{stream.difficulty}</span>
                </div>
                <h3 className="font-semibold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{stream.title}</h3>
                <p className="text-xs mb-3" style={{ color: "#64748B" }}>{stream.desc}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem" }}>{stream.monthly}</span>
                  <span className="text-[10px]" style={{ color: "#64748B" }}>{stream.timeToFirst} ilk gelir</span>
                </div>
                {/* Difficulty bar */}
                <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="h-full rounded-full" style={{ width: `${stream.bar}%`, background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_COLOR}60)` }} />
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#475569" }}>{stream.examples}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── REHBERLER: Guide Cards ── */}
        <div data-section id="rehberler">
          <SectionHeader id="rehberler" label="Rehberler" title="Adım Adım Rehberler" icon={<BookOpen className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 gap-4">
            {guides.map((guide, i) => (
              <Link key={i} href={`/detay/ai-ile-kazanc/guide/${guide.slug}`}>
              <div className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] group cursor-pointer" style={{ borderLeft: `3px solid ${BRAND_COLOR}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>{guide.category}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{
                    background: guide.difficulty === "Kolay" ? "rgba(0,229,160,0.1)" : guide.difficulty === "Orta" ? "rgba(252,211,77,0.1)" : "rgba(239,68,68,0.1)",
                    color: guide.difficulty === "Kolay" ? "#00E5A0" : guide.difficulty === "Orta" ? "#FCD34D" : "#EF4444",
                  }}>{guide.level}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{guide.title}</h3>
                <div className="flex items-center gap-3 text-xs" style={{ color: "#64748B" }}>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{guide.readTime}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: BRAND_COLOR }}>
                    Oku <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── FREELANCE: Platform Comparison ── */}
        <div data-section id="freelance">
          <SectionHeader id="freelance" label="Freelance" title="Freelance Platformları" icon={<Briefcase className="w-4 h-4" />} />

          <div className="glass rounded-xl p-5">
            <div className="grid sm:grid-cols-2 gap-4">
              {freelancePlatforms.map((p, i) => (
                <Link key={i} href={`/detay/ai-ile-kazanc/guide/${p.slug}`}>
                <div className="p-4 rounded-lg transition-all hover:bg-white/[0.02] cursor-pointer" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-white text-sm">{p.platform}</div>
                    <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: `${p.demandColor}10`, color: p.demandColor }}>{p.demand} Talep</span>
                  </div>
                  <div className="text-xs mb-2" style={{ color: "#64748B" }}>{p.category}</div>
                  <div className="text-xs mono" style={{ color: BRAND_COLOR }}>{p.avgRate}</div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── YOUTUBE: Video Grid ── */}
        <div data-section id="youtube">
          <SectionHeader id="youtube" label="YouTube" title="YouTube AI Otomasyonu" icon={<Play className="w-4 h-4" />} />

          <div className="space-y-3">
            {youtubeIdeas.map((video, i) => (
              <Link key={i} href={`/detay/ai-ile-kazanc/video/${i}`}>
              <div className="glass rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:bg-white/[0.02] cursor-pointer">
                <div className="w-20 h-14 rounded-lg flex items-center justify-center flex-shrink-0 relative" style={{ background: `${BRAND_COLOR}08` }}>
                  <Play className="w-5 h-5" style={{ color: BRAND_COLOR }} />
                  <span className="absolute bottom-1 right-1 text-[9px] mono px-1 rounded" style={{ background: "rgba(0,0,0,0.7)", color: "#94A3B8" }}>{video.duration}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{video.title}</h3>
                  <div className="flex items-center gap-3 text-xs mt-1" style={{ color: "#64748B" }}>
                    <span>{video.views} görüntülenme</span>
                    <span>{video.likes} beğeni</span>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── BAŞARI HİKAYELERİ: Testimonial Cards ── */}
        <div data-section id="basari-hikayeleri">
          <SectionHeader id="basari-hikayeleri" label="Başarı Hikayeleri" title="Gerçek Başarı Hikayeleri" icon={<Award className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 gap-4">
            {successStories.map((story, i) => (
              <Link key={i} href={`/detay/ai-ile-kazanc/basari/${story.slug}`}>
              <div className="glass rounded-xl p-5 transition-all duration-300 cursor-pointer hover:bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black" style={{ background: BRAND_COLOR, fontFamily: "Space Grotesk, sans-serif" }}>
                    {story.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{story.name}</div>
                    <div className="text-xs" style={{ color: "#64748B" }}>{story.method}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{story.income}</div>
                    <div className="text-[10px]" style={{ color: "#475569" }}>{story.months} sürdü</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>"{story.story}"</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
