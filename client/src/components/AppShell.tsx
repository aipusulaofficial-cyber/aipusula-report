/**
 * AIPUSULA AppShell — Premium Cyber Noir layout
 * Top navigation + Context-aware sidebar + Content area + Footer
 * Each category has its own color identity.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Brain, Cpu, DollarSign, Globe, Shield, Home as HomeIcon,
  Menu, X, ChevronRight, Search, Bell, Moon, Sun
} from "lucide-react";
import { NotificationCenter } from "./NotificationCenter";
import { AdvancedSearch } from "./AdvancedSearch";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/useMobile";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Category Definitions ────────────────────────────────────────────────────
export interface Category {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  color: string;
  colorDim: string;
  sidebarItems: { label: string; path: string }[];
}

export const categories: Category[] = [
  {
    id: "home",
    label: "Ana Sayfa",
    path: "/",
    icon: <HomeIcon className="w-4 h-4" />,
    color: "#00E5A0",
    colorDim: "rgba(0,229,160,0.1)",
    sidebarItems: [],
  },
  {
    id: "yapay-zeka",
    label: "Yapay Zekâ",
    path: "/yapay-zeka",
    icon: <Brain className="w-4 h-4" />,
    color: "#06B6D4",
    colorDim: "rgba(6,182,212,0.1)",
    sidebarItems: [
      { label: "Haberler", path: "/yapay-zeka#haberler" },
      { label: "Modeller", path: "/yapay-zeka#modeller" },
      { label: "Trendler", path: "/yapay-zeka#trendler" },
      { label: "Araştırmalar", path: "/yapay-zeka#arastirmalar" },
      { label: "Etkinlikler", path: "/yapay-zeka#etkinlikler" },
    ],
  },
  {
    id: "ai-araclari",
    label: "AI Araçları",
    path: "/ai-araclari",
    icon: <Cpu className="w-4 h-4" />,
    color: "#38BDF8",
    colorDim: "rgba(56,189,248,0.1)",
    sidebarItems: [
      { label: "Katalog", path: "/ai-araclari#katalog" },
      { label: "Kategoriler", path: "/ai-araclari#kategoriler" },
      { label: "Karşılaştırmalar", path: "/ai-araclari#karsilastirmalar" },
      { label: "İncelemeler", path: "/ai-araclari#incelemeler" },
    ],
  },
  {
    id: "ai-ile-kazanc",
    label: "AI ile Kazanç",
    path: "/ai-ile-kazanc",
    icon: <DollarSign className="w-4 h-4" />,
    color: "#FCD34D",
    colorDim: "rgba(252,211,77,0.1)",
    sidebarItems: [
      { label: "Rehberler", path: "/ai-ile-kazanc#rehberler" },
      { label: "İş Fikirleri", path: "/ai-ile-kazanc#is-fikirleri" },
      { label: "Freelance", path: "/ai-ile-kazanc#freelance" },
      { label: "YouTube", path: "/ai-ile-kazanc#youtube" },
      { label: "Başarı Hikayeleri", path: "/ai-ile-kazanc#basari-hikayeleri" },
    ],
  },
  {
    id: "dijital-dunya",
    label: "Dijital Dünya",
    path: "/dijital-dunya",
    icon: <Globe className="w-4 h-4" />,
    color: "#A78BFA",
    colorDim: "rgba(167,139,250,0.1)",
    sidebarItems: [
      { label: "Teknoloji", path: "/dijital-dunya#teknoloji" },
      { label: "Yazılım", path: "/dijital-dunya#yazilim" },
      { label: "Mobil", path: "/dijital-dunya#mobil" },
      { label: "Bulut", path: "/dijital-dunya#bulut" },
      { label: "Web", path: "/dijital-dunya#web" },
      { label: "Girişimler", path: "/dijital-dunya#girisimler" },
    ],
  },
  {
    id: "siber-guvenlik",
    label: "Siber Güvenlik",
    path: "/siber-guvenlik",
    icon: <Shield className="w-4 h-4" />,
    color: "#F97316",
    colorDim: "rgba(249,115,22,0.1)",
    sidebarItems: [
      { label: "Attack Map", path: "/siber-guvenlik#attack-map" },
      { label: "Threat Intelligence", path: "/siber-guvenlik#threat-intelligence" },
      { label: "CVE Feed", path: "/siber-guvenlik#cve-feed" },
      { label: "Güvenlik Haberleri", path: "/siber-guvenlik#guvenlik-haberleri" },
      { label: "Güvenlik Araçları", path: "/siber-guvenlik#guvenlik-araclari" },
      { label: "Güvenlik Analizleri", path: "/siber-guvenlik#guvenlik-analizleri" },
    ],
  },
];

export function getCurrentCategory(pathname: string): Category {
  if (pathname === "/") return categories[0];
  // Match the most specific path (longest match first)
  const cat = [...categories.slice(1)].sort((a, b) => b.path.length - a.path.length).find(c => pathname === c.path || pathname.startsWith(c.path));
  return cat || categories[0];
}

// ─── AppShell Component ──────────────────────────────────────────────────────
export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const currentCat = getCurrentCategory(location);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: isDark ? "#0A0C0D" : "#F8FAFC", fontFamily: "Inter, sans-serif" }}>
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]" style={{ background: "transparent" }}>
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: `linear-gradient(90deg, ${currentCat.color}, ${currentCat.color}80)`,
            boxShadow: `0 0 8px ${currentCat.color}40`,
          }}
        />
      </div>

      {/* ── Top Navigation ── */}
      <header className="sticky top-0 z-50 border-b glass" style={{ borderColor: isDark ? `${currentCat.color}25` : `${currentCat.color}20` }}>
        <div className="container flex items-center justify-between py-1.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center pulse-dot" style={{ background: `linear-gradient(135deg, ${currentCat.color}, ${currentCat.color}80)`, color: currentCat.color }}>
              <Shield className="w-3.5 h-3.5 text-black" />
            </div>
            <div>
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", color: isDark ? "#FFFFFF" : "#0F172A" }}>AIPUSULA</span>
              <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full mono" style={{ background: `${currentCat.color}15`, color: currentCat.color }}>MVP</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {categories.slice(1).map(cat => (
              <Link key={cat.id} href={cat.path}>
                <button
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30"
                  style={{
                    color: location.startsWith(cat.path) ? cat.color : (isDark ? "#94A3B8" : "#64748B"),
                    background: location.startsWith(cat.path) ? `${cat.color}10` : "transparent",
                  }}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AdvancedSearch />
            <NotificationCenter />
            <span className="hidden sm:inline text-xs mono" style={{ color: "#94A3B8" }}>Temmuz 2026</span>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: currentCat.color }} />

            {/* Mobile hamburger */}
            <button
              className="xl:hidden p-1.5 rounded-md hover:bg-white/5 transition-colors"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? <X className="w-5 h-5" style={{ color: currentCat.color }} /> : <Menu className="w-5 h-5" style={{ color: currentCat.color }} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
          <nav className="container py-6 space-y-1">
            {categories.map(cat => (
              <Link key={cat.id} href={cat.path}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 text-left"
                  style={{
                    color: location.startsWith(cat.path) ? cat.color : (isDark ? "#E2E8F0" : "#1E293B"),
                    background: location.startsWith(cat.path) ? `${cat.color}08` : "transparent",
                  }}
                >
                  {cat.icon}
                  {cat.label}
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* ── System Status Bar ── */}
      <div className="flex flex-wrap items-center gap-3 py-0.5 px-3 border-b intel-grid-bg" style={{ borderColor: `rgba(0,229,160,0.06)`, background: `rgba(0,229,160,0.02)` }}>
        <span className="mono text-xs" style={{ color: "#334155" }}>SYS://AIPUSULA-v1.0</span>
        <div className="h-3 w-px" style={{ background: `rgba(0,229,160,0.12)` }} />
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00E5A0", boxShadow: `0 0 4px #00E5A0` }} />
          <span className="mono text-xs" style={{ color: "#475569" }}>AKTİF BÖLÜM:</span>
          <span className="mono text-xs font-medium" style={{ color: currentCat.color }}>{currentCat.label}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 ml-auto">
          <span className="status-indicator" style={{ color: "#00E5A0" }}>ONLINE</span>
          <span className="mono text-xs" style={{ color: "#334155" }}>|</span>
          <span className="mono text-xs" style={{ color: "#475569" }}>LAT: 39.9255° N</span>
          <span className="mono text-xs" style={{ color: "#475569" }}>LON: 32.8662° E</span>
        </div>
      </div>

      {/* ── Content Layout ── */}
      <div className="container pb-6">
        <div className="flex gap-4">
          {/* Sidebar — context-aware */}
          {currentCat.sidebarItems.length > 0 && !isMobile && (
            <aside className="hidden lg:block w-52 flex-shrink-0">
              <div className="sticky top-14">
                <div className="glass rounded p-0 overflow-hidden intel-corner" style={{ animation: "borderGlow 4s ease-in-out infinite" }}>
                  <div className="px-3 py-1.5 flex items-center gap-2" style={{ background: `${currentCat.color}05`, borderBottom: `1px solid ${currentCat.color}10` }}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: "#FCD34D" }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: currentCat.color }} />
                    </div>
                    <span className="mono text-xs" style={{ color: "#334155" }}>navigation.sys</span>
                    <span className="ml-auto mono text-[10px]" style={{ color: "#475569" }}>{Math.round(scrollProgress)}%</span>
                  </div>
                  <div className="h-0.5" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="h-full transition-all duration-150 ease-out" style={{
                      width: `${scrollProgress}%`,
                      background: `linear-gradient(90deg, ${currentCat.color}, ${currentCat.color}80)`,
                      boxShadow: `0 0 6px ${currentCat.color}30`,
                    }} />
                  </div>
                  <div className="p-2">
                    <p className="mono text-xs uppercase tracking-widest mb-2 px-1" style={{ color: "#334155" }}>// {currentCat.label}</p>
                    <nav className="space-y-0.5">
                      {currentCat.sidebarItems.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.path}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded text-sm transition-all duration-200 ease-out hover:bg-white/[0.03] text-left"
                          style={{
                            color: "#64748B",
                            fontSize: "0.75rem",
                          }}
                          onClick={(e) => {
                            // Check if it's a hash navigation on the same page
                            const hash = item.path.split('#')[1];
                            if (hash && window.location.pathname === item.path.split('#')[0]) {
                              e.preventDefault();
                              document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          <div className="w-1 h-1 rounded-full" style={{ background: currentCat.color, opacity: 0.5 }} />
                          {item.label}
                        </a>
                      ))}
                    </nav>
                    {/* Mini compass */}
                    <div className="mt-3 pt-2 border-t flex items-center justify-center py-2" style={{ borderColor: `${currentCat.color}08` }}>
                      <svg viewBox="0 0 40 40" className="w-8 h-8" style={{ opacity: 0.3 }}>
                        <circle cx="20" cy="20" r="18" fill="none" stroke={currentCat.color} strokeWidth="0.5" strokeDasharray="2 4" />
                        <circle cx="20" cy="20" r="12" fill="none" stroke={currentCat.color} strokeWidth="0.3" strokeDasharray="1 3" />
                        <circle cx="20" cy="20" r="2" fill={currentCat.color} opacity="0.8" />
                        <line x1="20" y1="2" x2="20" y2="38" stroke={currentCat.color} strokeWidth="0.3" opacity="0.3" />
                        <line x1="2" y1="20" x2="38" y2="20" stroke={currentCat.color} strokeWidth="0.3" opacity="0.3" />
                      </svg>
                    </div>
                    <div className="mono text-xs px-1 space-y-0.5" style={{ color: "#1E3A2F" }}>
                      <div className="text-[10px]" style={{ color: "#334155" }}>AIPUSULA-MVP-v1.0</div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00E5A0", boxShadow: "0 0 4px #00E5A0" }} />
                        <span style={{ color: "#00E5A0" }}>SİSTEM HAZIR</span>
                      </div>
                      <div className="text-[10px]" style={{ color: "#334155" }}>ID:{Math.floor(Math.random()*9000+1000)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t py-6 glass" style={{ borderColor: `${currentCat.color}15` }}>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center pulse-dot" style={{ background: `linear-gradient(135deg, ${currentCat.color}, ${currentCat.color}80)`, color: currentCat.color }}>
              <Shield className="w-3 h-3 text-black" />
            </div>
            <span className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>AIPUSULA</span>
            <span className="text-xs" style={{ color: "#475569" }}>MVP Platform — Temmuz 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs mono" style={{ color: "#475569" }}>v1.0.0-MVP</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: currentCat.color }} />
              <span className="text-xs" style={{ color: "#475569" }}>Hazır</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
