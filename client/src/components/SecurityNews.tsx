/**
 * Real-Time Cyber Security News Feed
 * Live cybersecurity news with category filters
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Newspaper, Clock, ExternalLink } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  category: string;
  source: string;
  timeAgo: string;
  summary: string;
  url: string;
  slug?: string;
}

const newsItems: NewsItem[] = [
  { id: 1, title: "Microsoft Azure'da Kritik Güvenlik Açığı Kapatıldı", category: "Bulut", source: "TechCrunch", timeAgo: "12 dk önce", summary: "Azure Active Directory'deki zafiyet, yetkisiz erişim riski oluşturuyordu. Microsoft acil yama yayınladı.", url: "#", slug: "azure-guvenlik-acigi" },
  { id: 2, title: "NATO Ülkelerine Yönelik APT Saldırıları Artıyor", category: "Devlet Destekli", source: "Reuters", timeAgo: "45 dk önce", summary: "Siber güvenlik firmaları, NATO ülkelerine yönelik organize saldırı kampanyası tespit etti.", url: "#", slug: "nato-apt-saldirilar" },
  { id: 3, title: "Yapay Zeka Destekli Phishing Saldırıları %340 Arttı", category: "AI Tehditleri", source: "Dark Reading", timeAgo: "1 saat önce", summary: "LLM tabanlı phishing kampanyaları geleneksel yöntemlere göre çok daha başarılı oluyor.", url: "#", slug: "ai-phishing-artis" },
  { id: 4, title: "Google Chrome 0-Day Zafiyeti Hızlıca İstismar Ediliyor", category: "Tarayıcı", source: "The Hacker News", timeAgo: "2 saat önce", summary: "Chrome'daki bellek bozulma zafiyeti, aktif olarak istismar ediliyor. Acil güncelleme öneriliyor.", url: "#", slug: "chrome-zero-day" },
  { id: 5, title: "Avrupa DGA (Dijital İşlemler Yasası) Kapsamında Teknoloji Devlerine Rekor Ceza", category: "Regülasyon", source: "EU Observer", timeAgo: "3 saat önce", summary: "AB, siber güvenlik ihlali nedeniyle büyük teknoloji şirketlerine 2 milyar Euro ceza kesti.", url: "#", slug: "eu-dga-ceza" },
  { id: 6, title: "Ransomware Grupları Sağlık Sektörünü Hedefliyor", category: "Ransomware", source: "BleepingComputer", timeAgo: "4 saat önce", summary: "LockBit benzeri gruplar hastane sistemlerini şifreleyerek fidye talep ediyor.", url: "#", slug: "ransomware-saglik" },
  { id: 7, title: "Supply Chain Saldırıları için Yeni Framework Yayınlandı", category: "Araştırma", source: "NIST", timeAgo: "5 saat önce", summary: "NIST, yazılım tedarik zinciri güvenliği için yeni değerlendirme çerçevesi yayınladı.", url: "#", slug: "supply-chain-framework" },
  { id: 8, title: "IoT Cihazlarında Toplu Zafiyet Tespit Edildi", category: "IoT", source: "ZDNet", timeAgo: "6 saat önce", summary: "50 milyondan fazla IoT cihazında aynı güvenlik açığı bulundu. Firmware güncellemesi gerekli.", url: "#", slug: "iot-zafiyet" },
];

const categories = ["Tümü", "Bulut", "AI Tehditleri", "Ransomware", "Devlet Destekli", "Regülasyon", "Araştırma", "IoT", "Tarayıcı"];

const categoryColors: Record<string, string> = {
  "Bulut": "#38BDF8",
  "AI Tehditleri": "#A78BFA",
  "Ransomware": "#EF4444",
  "Devlet Destekli": "#F97316",
  "Regülasyon": "#FCD34D",
  "Araştırma": "#00E5A0",
  "IoT": "#FB7185",
  "Tarayıcı": "#64748B",
};

export function SecurityNews() {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredNews = useMemo(() => {
    if (activeCategory === "Tümü") return newsItems;
    return newsItems.filter(n => n.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: "rgba(0,229,160,0.1)" }}>
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4" style={{ color: "#38BDF8" }} />
          <span className="mono text-xs uppercase tracking-widest" style={{ color: "#38BDF8" }}>
            SİBER GÜVENLİK HABERLERİ
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00E5A0" }} />
          <span className="mono text-[10px]" style={{ color: "#64748B" }}>CANLI</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-3 flex items-center gap-1.5 overflow-x-auto border-b" style={{ borderColor: "rgba(0,229,160,0.06)" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-2.5 py-1 rounded-full text-[10px] mono whitespace-nowrap transition-all flex-shrink-0"
            style={{
              background: activeCategory === cat
                ? `${(categoryColors[cat] || "#00E5A0")}15`
                : "transparent",
              color: activeCategory === cat
                ? (categoryColors[cat] || "#00E5A0")
                : "#64748B",
              border: `1px solid ${activeCategory === cat ? `${(categoryColors[cat] || "#00E5A0")}30` : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="max-h-[360px] overflow-y-auto">
        {filteredNews.map((news) => {
          const catColor = categoryColors[news.category] || "#00E5A0";
          return (
            <Link key={news.id} href={`/detay/siber-guvenlik/haber/${news.slug}`}>
            <div className="px-4 py-3 border-b hover:bg-white/[0.02] transition-colors cursor-pointer" style={{ borderColor: "rgba(0,229,160,0.04)" }}>
              <div className="flex items-start gap-3">
                <div className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0" style={{ background: catColor, opacity: 0.4 }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="mono text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${catColor}10`, color: catColor }}>
                      {news.category}
                    </span>
                    <span className="text-[10px]" style={{ color: "#475569" }}>{news.source}</span>
                    <span className="text-[10px] ml-auto" style={{ color: "#334155" }}>{news.timeAgo}</span>
                  </div>
                  <h4 className="text-sm font-medium leading-snug" style={{ color: "#E2E8F0" }}>{news.title}</h4>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "#64748B" }}>{news.summary}</p>
                </div>
              </div>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
