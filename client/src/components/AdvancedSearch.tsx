/**
 * Advanced Search - Custom Modal
 * Search across tools, CVEs, news and content
 * Custom implementation to avoid Radix Dialog React 19 issues
 */
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Search, Shield, Bug, Newspaper, Layers, TrendingUp, GitBranch, DollarSign, CheckSquare, Brain, Cpu, FileCode, Globe, X, ArrowRight } from "lucide-react";

interface SearchItem {
  id: string;
  label: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  scrollId?: string;
}

const searchItems: SearchItem[] = [
  // Sections
  { id: "s1", label: "AI Dünyası", description: "Yapay zekâ haberleri, modeller ve trendler", category: "Bölümler", icon: <Brain className="w-4 h-4" />, scrollId: "ai-world" },
  { id: "s2", label: "Dijital Dünya", description: "Teknoloji stack ve sistem tasarımı", category: "Bölümler", icon: <Globe className="w-4 h-4" />, scrollId: "digital-world" },
  { id: "s3", label: "AI Araçları", description: "AI araçları kataloğu ve karşılaştırma", category: "Bölümler", icon: <Cpu className="w-4 h-4" />, scrollId: "ai-tools" },
  { id: "s4", label: "AI ile Kazanç", description: "AI ile gelir üretme yolları ve eğitimi", category: "Bölümler", icon: <DollarSign className="w-4 h-4" />, scrollId: "ai-monetize" },
  { id: "s5", label: "Siber Güvenlik", description: "Tehdit haritası, zafiyetler ve güvenlik", category: "Bölümler", icon: <Shield className="w-4 h-4" />, scrollId: "cybersecurity" },
  { id: "s6", label: "UI/UX Tasarım", description: "Renk, tipografi ve bileşen sistemleri", category: "Bölümler", icon: <FileCode className="w-4 h-4" />, scrollId: "ux" },
  { id: "s7", label: "Rakip Analizi", description: "ChatGPT, Claude, Gemini karşılaştırma", category: "Bölümler", icon: <TrendingUp className="w-4 h-4" />, scrollId: "competitors" },
  { id: "s8", label: "Yol Haritası", description: "MVP'den tam sürüme geliştirme planı", category: "Bölümler", icon: <GitBranch className="w-4 h-4" />, scrollId: "roadmap" },
  { id: "s9", label: "Kontrol Listesi", description: "Lansman öncesi doğrulama kontrol listesi", category: "Bölümler", icon: <CheckSquare className="w-4 h-4" />, scrollId: "checklist" },

  // CVEs
  { id: "c1", label: "CVE-2026-12847", description: "Linux Kernel Ayrıcalık Yükseltme (CVSS 9.8)", category: "CVE", icon: <Bug className="w-4 h-4" /> },
  { id: "c2", label: "CVE-2026-12901", description: "Apache HTTP Sunucu Uzak Kod Yürütme (CVSS 9.6)", category: "CVE", icon: <Bug className="w-4 h-4" /> },
  { id: "c3", label: "CVE-2026-13120", description: "Kubernetes API Kimlik Doğrulama Atlatma (CVSS 9.4)", category: "CVE", icon: <Bug className="w-4 h-4" /> },
  { id: "c4", label: "CVE-2026-12950", description: "Docker Konteyner Kaçışı (CVSS 9.2)", category: "CVE", icon: <Bug className="w-4 h-4" /> },

  // AI Tools
  { id: "a1", label: "AI Chat Motoru", description: "Yapay zekâ destekli güvenlik asistanı", category: "AI Araçları", icon: <Brain className="w-4 h-4" /> },
  { id: "a2", label: "Kod Tarayıcı", description: "Otomatik kod zafiyet analizi", category: "AI Araçları", icon: <FileCode className="w-4 h-4" /> },
  { id: "a3", label: "Phishing Analizörü", description: "E-posta ve URL tehdit analizi", category: "AI Araçları", icon: <Shield className="w-4 h-4" /> },
  { id: "a4", label: "CVE Takip Sistemi", description: "Otomatik zafiyet izleme ve bildirim", category: "AI Araçları", icon: <Bug className="w-4 h-4" /> },

  // News
  { id: "n1", label: "DDoS Saldırıları Artıyor", description: "Küresel DDoS saldırılarında %45 artış", category: "Haberler", icon: <Newspaper className="w-4 h-4" /> },
  { id: "n2", label: "AB Siber Güvenlik Yasası", description: "DGA kapsamında yeni güvenlik gereksinimleri", category: "Haberler", icon: <Newspaper className="w-4 h-4" /> },
];

const categoryColors: Record<string, string> = {
  "Bölümler": "#00E5A0",
  "CVE": "#EF4444",
  "AI Araçları": "#A78BFA",
  "Haberler": "#38BDF8",
};

export function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return searchItems;
    const q = query.toLowerCase();
    return searchItems.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [query]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    setQuery("");
    if (item.scrollId) {
      document.getElementById(item.scrollId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.info(`${item.label} — Yakında`, { description: item.description });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 sm:p-2.5 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-[0.97] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30 touch-target-sm"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "#64748B",
        }}
      >
        <Search className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-50" style={{ background: "rgba(5,11,20,0.7)", backdropFilter: "blur(4px)" }} onClick={() => { setIsOpen(false); setQuery(""); }} />

          {/* Modal */}
          <div
            className="fixed inset-x-0 top-[15%] mx-auto max-w-lg z-50 glass rounded-xl overflow-hidden px-3 sm:px-0"
            style={{
              borderColor: "rgba(0,229,160,0.15)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,160,0.05)",
            }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-b" style={{ borderColor: "rgba(0,229,160,0.1)" }}>
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#00E5A0" }} />
              <input
                type="text"
                placeholder="Ara... (bölümler, CVE'ler, araçlar, haberler)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent text-sm sm:text-base outline-none placeholder:text-gray-600 min-w-0"
                style={{ color: "#E2E8F0" }}
              />
              <div className="flex items-center gap-1 flex-shrink-0">
                <kbd className="hidden sm:inline px-1.5 py-0.5 rounded mono text-[9px]" style={{ background: "rgba(255,255,255,0.05)", color: "#64748B", border: "1px solid rgba(255,255,255,0.1)" }}>ESC</kbd>
                <button onClick={() => { setIsOpen(false); setQuery(""); }} className="p-1 rounded hover:bg-white/5" style={{ color: "#64748B" }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center">
                  <Search className="w-6 h-6 mx-auto mb-2" style={{ color: "#334155" }} />
                  <p className="text-sm" style={{ color: "#64748B" }}>Sonuç bulunamadı</p>
                </div>
              ) : (
                Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category}>
                    <div className="px-4 py-2">
                      <span className="mono text-[10px] uppercase tracking-widest" style={{ color: categoryColors[category] || "#64748B" }}>
                        {category}
                      </span>
                    </div>
                    {items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left transition-colors hover:bg-white/[0.03] touch-target-sm"
                      >
                        <div style={{ color: categoryColors[item.category] || "#64748B" }}>{item.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm" style={{ color: "#E2E8F0" }}>{item.label}</div>
                          <div className="text-[11px]" style={{ color: "#64748B" }}>{item.description}</div>
                        </div>
                        {item.scrollId && (
                          <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: "#334155" }} />
                        )}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t flex items-center justify-between" style={{ borderColor: "rgba(0,229,160,0.08)" }}>
              <span className="mono text-[10px]" style={{ color: "#334155" }}>Ctrl+K ile açın · {filteredItems.length} sonuç</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
