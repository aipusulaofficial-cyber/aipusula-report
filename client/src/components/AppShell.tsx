/**
 * AIPUSULA AppShell — Premium Cyber Noir layout
 * Mobile-responsive: sticky header with safe-area, 44px touch targets,
 * smooth mobile menu, content offset for sticky nav.
 */
import { useState, useEffect, useCallback } from "react";
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
      { label: "Tehdit İstihbaratı", path: "/siber-guvenlik#tehdit-istihbarati" },
      { label: "CVE Feed", path: "/siber-guvenlik#cve-feed" },
      { label: "Güvenlik Haberleri", path: "/siber-guvenlik#guvenlik-haberleri" },
      { label: "Güvenlik Araçları", path: "/siber-guvenlik#guvenlik-araclari" },
      { label: "Güvenlik Analizleri", path: "/siber-guvenlik#guvenlik-analizleri" },
    ],
  },
];

export function getCurrentCategory(pathname: string): Category {
  if (pathname === "/") return categories[0];
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

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  const closeNav = useCallback(() => setMobileNavOpen(false), []);

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
      <header
        className="sticky top-0 z-50 border-b glass"
        style={{
          borderColor: isDark ? `${currentCat.color}25` : `${currentCat.color}20`,
          /* Safe area offset so notch doesn't cover nav */
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-1.5" style={{ minHeight: "48px" }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30">
            <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #00E5A0, #00E5A060)", boxShadow: "0 0 12px rgba(0,229,160,0.3)" }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#0A0C0D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.05rem", color: isDark ? "#FFFFFF" : "#0F172A", letterSpacing: "0.04em" }}>AIPUSULA</span>
              <span className="text-xs px-1.5 py-0.5 rounded mono hidden sm:inline" style={{ background: "rgba(0,229,160,0.1)", color: "#00E5A0", border: "1px solid rgba(0,229,160,0.2)" }}>MVP</span>
            </div>
          </Link>

          {/* Desktop Nav — only xl+ */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {categories.map(cat => {
              const isActive = cat.id === 'home'
                ? location === '/' || location === ''
                : location.startsWith(cat.path);
              return (
                <Link key={cat.id} href={cat.path}>
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30"
                    style={{
                      color: isActive ? cat.color : (isDark ? "#94A3B8" : "#64748B"),
                      background: isActive ? `${cat.color}10` : "transparent",
                      border: isActive ? `1px solid ${cat.color}30` : '1px solid transparent',
                      fontWeight: isActive ? 600 : 400,
                      boxShadow: isActive ? `0 0 12px ${cat.color}15` : 'none',
                    }}
                  >
                    <span style={{ opacity: isActive ? 1 : 0.7 }}>{cat.icon}</span>
                    <span>{cat.label}</span>
                    {isActive && <span className="w-1 h-1 rounded-full ml-0.5 animate-pulse" style={{ background: cat.color }} />}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <AdvancedSearch />
            <NotificationCenter />
            <span className="hidden lg:inline text-xs mono" style={{ color: "#94A3B8" }}>Temmuz 2026</span>
            <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "#00E5A0", boxShadow: "0 0 6px #00E5A0" }} />

            {/* Mobile hamburger — 44px touch target */}
            <button
              className="xl:hidden flex items-center justify-center rounded-md transition-colors"
              style={{ width: "40px", height: "40px", background: "transparent" }}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Menüyü aç/kapat"
            >
              {mobileNavOpen ? <X className="w-5 h-5" style={{ color: currentCat.color }} /> : <Menu className="w-5 h-5" style={{ color: currentCat.color }} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Nav Overlay ── */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 xl:hidden"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
          onClick={closeNav}
        >
          <nav
            className="container py-6 space-y-1 max-h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 24px)" }}
          >
            {/* Current category indicator */}
            <div className="mb-4 px-4 py-2 rounded-lg" style={{ background: `${currentCat.color}08`, border: `1px solid ${currentCat.color}20` }}>
              <div className="flex items-center gap-2">
                <span className="mono text-[10px] uppercase tracking-widest" style={{ color: currentCat.color }}>AKTİF BÖLÜM</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {currentCat.icon}
                <span className="text-sm font-semibold" style={{ color: currentCat.color, fontFamily: "Space Grotesk, sans-serif" }}>{currentCat.label}</span>
              </div>
            </div>

            {categories.map(cat => {
              const isActive = cat.id === 'home'
                ? location === '/' || location === ''
                : location.startsWith(cat.path);
              return (
                <Link key={cat.id} href={cat.path}>
                  <div
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 cursor-pointer"
                    style={{
                      color: isActive ? cat.color : (isDark ? "#E2E8F0" : "#1E293B"),
                      background: isActive ? `${cat.color}10` : "transparent",
                      border: isActive ? `1px solid ${cat.color}30` : '1px solid transparent',
                      minHeight: "44px",
                    }}
                  >
                    <span style={{ opacity: isActive ? 1 : 0.6 }}>{cat.icon}</span>
                    <span className="flex-1 font-medium text-sm">{cat.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cat.color }} />}
                    <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ opacity: 0.4 }} />
                  </div>
                </Link>
              );
            })}

            {/* Quick links from sidebar */}
            {currentCat.sidebarItems.length > 0 && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <p className="mono text-[10px] uppercase tracking-widest px-4 mb-2" style={{ color: "#475569" }}>Bölüm Navigasyonu</p>
                {currentCat.sidebarItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.path}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-md transition-all hover:bg-white/[0.03]"
                    style={{ minHeight: "40px", color: "#94A3B8" }}
                    onClick={(e) => {
                      const hash = item.path.split('#')[1];
                      if (hash) {
                        e.preventDefault();
                        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                        closeNav();
                      }
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: currentCat.color, opacity: 0.5 }} />
                    <span className="text-sm">{item.label}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Footer in mobile nav */}
            <div className="mt-6 pt-4 border-t flex items-center gap-2 px-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: currentCat.color }} />
              <span className="mono text-[10px]" style={{ color: "#475569" }}>AIPUSULA MVP v1.0 — Hazır</span>
            </div>
          </nav>
        </div>
      )}

      {/* ── System Status Bar ── */}
      <div
        className="flex flex-wrap items-center gap-2 sm:gap-3 py-1 px-3 border-b intel-grid-bg"
        style={{
          borderColor: `rgba(0,229,160,0.06)`,
          background: `rgba(0,229,160,0.02)`,
          fontSize: "11px",
        }}
      >
        <span className="mono" style={{ color: "#334155", whiteSpace: "nowrap" }}>SYS://AIPUSULA-v1.0</span>
        <div className="h-3 w-px" style={{ background: `rgba(0,229,160,0.12)` }} />
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#00E5A0", boxShadow: `0 0 4px #00E5A0` }} />
          <span className="mono" style={{ color: "#475569", whiteSpace: "nowrap" }}>AKTİF BÖLÜM:</span>
          <span className="mono font-medium" style={{ color: currentCat.color, whiteSpace: "nowrap" }}>{currentCat.label}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <span className="status-indicator" style={{ color: "#00E5A0" }}>ONLINE</span>
          <span className="mono" style={{ color: "#334155" }}>|</span>
          <span className="mono" style={{ color: "#475569" }}>LAT: 39.9255° N</span>
          <span className="mono" style={{ color: "#475569" }}>LON: 32.8662° E</span>
        </div>
      </div>

      {/* ── Content Layout ── */}
      <div className="container pb-6">
        <div className="flex gap-4">
          {/* Sidebar — desktop only, hidden on mobile */}
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
                          style={{ color: "#64748B", fontSize: "0.75rem" }}
                          onClick={(e) => {
                            const hash = item.path.split('#')[1];
                            if (hash) {
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
                    <div className="mt-3 pt-2 border-t flex items-center justify-center py-2" style={{ borderColor: `${currentCat.color}08` }}>
                      <svg viewBox="0 0 40 40" className="w-8 h-8" style={{ opacity: 0.3 }}>
                        <circle cx="20" cy="20" r="18" fill="none" stroke={currentCat.color} strokeWidth="0.5" strokeDasharray="2 4" />
                        <circle cx="20" cy="20" r="12" fill="none" stroke={currentCat.color} strokeWidth="0.3" strokeDasharray="1 3" />
                        <circle cx="20" cy="20" r="2" fill={currentCat.color} opacity="0.8" />
                        <line x1="20" y1="2" x2="20" y2="38" stroke={currentCat.color} strokeWidth="0.3" opacity="0.3" />
                        <line x1="2" y1="20" x2="38" y2="20" stroke={currentCat.color} strokeWidth="0.3" opacity="0.3" />
                      </svg>
                    </div>
                    <div className="mono text-xs px-1 space-y-0.5">
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
            <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #00E5A0, #00E5A060)", boxShadow: "0 0 8px rgba(0,229,160,0.25)" }}>
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#0A0C0D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
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
