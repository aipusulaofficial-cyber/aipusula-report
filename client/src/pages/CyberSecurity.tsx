/**
 * AIPUSULA — Siber Güvenlik Sayfası
 * Color: Red/Orange (#F97316 / #EF4444)
 * Layout: SECURITY OPS CENTER — Threat dashboard hero + attack map + CVE feed + threat intel + tools + analysis
 * Scroll-to-section navigation — NOT tabs (keeps widgets from existing components)
 */
import { useState, useEffect } from "react";
import {
  Shield, AlertTriangle, Map, Bug, Newspaper, Wrench, BarChart2,
  ArrowRight, ChevronRight, Clock, Globe, Server, Lock, Eye, Zap,
  TrendingUp, Target, AlertOctagon, Radio, Activity,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AttackMap } from "@/components/AttackMap";
import { LiveThreatCounter, AIRiskScore } from "@/components/EnterpriseWidgets";
import { CVEFeed } from "@/components/CVEFeed";
import { SecurityNews } from "@/components/SecurityNews";
import { useTheme } from "@/contexts/ThemeContext";

const BRAND_COLOR = "#F97316";
const THREAT_COLOR = "#EF4444";

// ─── Security Tools ──────────────────────────────────────────────────────────
const securityTools = [
  { name: "Nmap", category: "Ağ Taraması", type: "Açık Kaynak", desc: "Ağ keşfi ve güvenlik denetimi aracı", stars: "24K" },
  { name: "Wireshark", category: "Paket Analizi", type: "Açık Kaynak", desc: "Ağ trafiği yakalama ve analiz", stars: "18K" },
  { name: "Metasploit", category: "Sızma Testi", type: "Açık Kaynak", desc: "Güvenlik açıkları exploitation framework", stars: "32K" },
  { name: "Burp Suite", category: "Web Güvenlik", type: "Ücretsiz/Pro", desc: "Web uygulama güvenlik test aracı", stars: "N/A" },
  { name: "CrowdStrike", category: "Endpoint", type: "Enterprise", desc: "AI destekli tehdit algılama ve yanıt", stars: "N/A" },
  { name: "Cloudflare WAF", category: "WAF", type: "Freemium", desc: "Web uygulama güvenlik duvarı ve DDoS koruma", stars: "N/A" },
  { name: "OWASP ZAP", category: "Web Güvenlik", type: "Açık Kaynak", desc: "Web uygulaması zafiyet tarayıcı", stars: "11K" },
  { name: "Snort", category: "IDS/IPS", type: "Açık Kaynak", desc: "Gerçek zamanlı ağ trafiği analizi ve saldırı tespiti", stars: "7K" },
];

// ─── Security Analysis ───────────────────────────────────────────────────────
const analyses = [
  { title: "2026 Q2 Ransomware Raporu", type: "Yıllık Rapor", date: "Temmuz 2026", summary: "Ransomware saldırıları %35 artış gösterdi. Sağlık ve finans sektörleri en çok hedef alındı.", severity: "Kritik" },
  { title: "Cloud Güvenlik Durumu Değerlendirmesi", type: "Analiz", date: "Haziran 2026", summary: "Bulut yapılandırma hataları hâlâ en yaygın saldırı vektörü. %68 oranında bulut ihlali yapılandırma hatasından kaynaklanıyor.", severity: "Yüksek" },
  { title: "Zero-Trust Mimarisi: Uygulama Rehberi", type: "Rehber", date: "Temmuz 2026", summary: "Sıfır güven mimarisinin kurumsal ortamlara uygulanması adım adım açıklanıyor.", severity: "Bilgi" },
  { title: "AI Tabanlı Saldırı Vektörleri", type: "Araştırma", date: "Haziran 2026", summary: "Deepfake ses klonlama ve AI phishing saldırılarının tespit yöntemleri.", severity: "Yüksek" },
  { title: "Supply Chain Saldırıları: 2026 Trendleri", type: "Analiz", date: "Temmuz 2026", summary: "npm ve PyPI ekosistemlerindeki supply chain saldırıları %200 arttı.", severity: "Kritik" },
];

// ─── Recent Threat Alerts ────────────────────────────────────────────────────
const recentAlerts = [
  { severity: "Kritik", name: "Log4j Yeni Varyant", target: "Java Sunucular", time: "12 dk önce", color: "#EF4444" },
  { severity: "Yüksek", name: "Supply Chain Saldırısı", target: "npm Paketleri", time: "1 saat önce", color: "#F97316" },
  { severity: "Orta", name: "Brute Force Kampanyası", target: "SSH Sunucular", time: "3 saat önce", color: "#FCD34D" },
  { severity: "Düşük", name: "Port Taraması", target: "Kamu IP'leri", time: "6 saat önce", color: "#00E5A0" },
  { severity: "Kritik", name: "Zero-Day: Windows Kernel", target: "Windows 10/11", time: "8 saat önce", color: "#EF4444" },
  { severity: "Yüksek", name: "Ransomware: LockBit 4.0", target: "KOBİ Sunucuları", time: "12 saat önce", color: "#F97316" },
];

// ─── Threat Categories ───────────────────────────────────────────────────────
const threatCategories = [
  { name: "Ransomware", count: 1847, change: "+35%", color: "#EF4444", icon: <Lock className="w-4 h-4" /> },
  { name: "Phishing", count: 3201, change: "+22%", color: "#F97316", icon: <Eye className="w-4 h-4" /> },
  { name: "DDoS", count: 892, change: "+18%", color: "#FCD34D", icon: <Server className="w-4 h-4" /> },
  { name: "Malware", count: 2456, change: "+28%", color: "#FB7185", icon: <Bug className="w-4 h-4" /> },
  { name: "Supply Chain", count: 312, change: "+200%", color: "#A78BFA", icon: <AlertOctagon className="w-4 h-4" /> },
  { name: "Zero-Day", count: 47, change: "+15%", color: "#EF4444", icon: <Zap className="w-4 h-4" /> },
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

export default function CyberSecurity() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [liveThreats, setLiveThreats] = useState(12847);
  const [scrollActive, setScrollActive] = useState("attack-map");

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveThreats(prev => prev + Math.floor(Math.random() * 5) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    { id: "attack-map", label: "Attack Map", icon: <Map className="w-3.5 h-3.5" /> },
    { id: "tehdit-istihbarati", label: "Tehdit İstihbaratı", icon: <Eye className="w-3.5 h-3.5" /> },
    { id: "cve-feed", label: "CVE Feed", icon: <Bug className="w-3.5 h-3.5" /> },
    { id: "guvenlik-haberleri", label: "Güvenlik Haberleri", icon: <Newspaper className="w-3.5 h-3.5" /> },
    { id: "guvenlik-araclari", label: "Güvenlik Araçları", icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: "guvenlik-analizleri", label: "Güvenlik Analizleri", icon: <BarChart2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <AppShell>
      {/* ── Hero: Security Operations Center Layout ── */}
      <section className="relative overflow-hidden py-6 intel-grid-bg intel-scanline intel-corner">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 20% 50%, ${THREAT_COLOR}08 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, ${BRAND_COLOR}04 0%, transparent 50%)`,
        }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ background: BRAND_COLOR }} />
            <span className="mono text-xs uppercase tracking-[0.25em]" style={{ color: BRAND_COLOR }}>
              05 — SİBER GÜVENLİK: TEHDİT ANALİZİ & KORUMASI
            </span>
          </div>
          <h1 className="font-bold leading-tight" style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}>
            Siber Güvenlik
          </h1>
          <div className="h-px w-24 mt-3" style={{ background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_COLOR}60, transparent)` }} />
          <p className="text-sm mt-2 max-w-lg" style={{ color: "#64748B" }}>
            Gerçek zamanlı tehdit izleme, CVE analizi ve güvenlik araçları ile dijital dünyada güvende kalın.
          </p>

          {/* Threat Status Bar */}
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: THREAT_COLOR }} />
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.25rem", color: THREAT_COLOR }}>
                {liveThreats.toLocaleString()}
              </span>
              <span className="text-xs" style={{ color: "#475569" }}>Aktif Tehdit</span>
            </div>
            <div className="h-6 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div className="flex items-center gap-2">
              <Bug className="w-4 h-4" style={{ color: BRAND_COLOR }} />
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem", color: BRAND_COLOR }}>142</span>
              <span className="text-xs" style={{ color: "#475569" }}>Yeni CVE</span>
            </div>
            <div className="h-6 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: "#00E5A0" }} />
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem", color: "#00E5A0" }}>24/7</span>
              <span className="text-xs" style={{ color: "#475569" }}>İzleme</span>
            </div>

            {/* Threat level badge */}
            <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <AlertTriangle className="w-3.5 h-3.5" style={{ color: THREAT_COLOR }} />
              <span className="text-xs mono font-bold" style={{ color: THREAT_COLOR }}>TEHDİT SEVİYESİ: KRİTİK</span>
            </div>
          </div>

          {/* Threat Category Mini Bars */}
          <div className="flex flex-wrap gap-2 mt-4">
            {threatCategories.slice(0, 4).map((tc, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: `${tc.color}06`, border: `1px solid ${tc.color}15` }}>
                <div style={{ color: tc.color }}>{tc.icon}</div>
                <span className="text-[10px] mono" style={{ color: tc.color }}>{tc.name}</span>
                <span className="text-[10px] mono" style={{ color: "#00E5A0" }}>{tc.change}</span>
              </div>
            ))}
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
        {/* ── ATTACK MAP: Full Width ── */}
        <div data-section id="attack-map">
          <SectionHeader id="attack-map" label="Attack Map" title="Global Saldırı Haritası" icon={<Map className="w-4 h-4" />} />
          <AttackMap />
        </div>

        {/* ── TEHDİT İSTİHBARATI: Dual Widget + Alert Feed ── */}
        <div data-section id="tehdit-istihbarati">
          <SectionHeader id="tehdit-istihbarati" label="Tehdit İstihbaratı" title="Tehdit İstihbarat Merkezi" icon={<Eye className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <LiveThreatCounter />
            <AIRiskScore />
          </div>

          {/* Threat Category Grid */}
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            {threatCategories.map((tc, i) => (
              <div key={i} className="glass rounded-xl p-4 transition-all duration-300 hover:scale-[1.01]" style={{ borderLeft: `3px solid ${tc.color}` }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div style={{ color: tc.color }}>{tc.icon}</div>
                    <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{tc.name}</h3>
                  </div>
                  <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: `${tc.color}10`, color: tc.color }}>{tc.change}</span>
                </div>
                <div className="text-xs mono" style={{ color: "#64748B" }}>{tc.count.toLocaleString()} aktif</div>
              </div>
            ))}
          </div>

          {/* Recent Alerts */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-bold text-white mb-3 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Son Tehdit Uyarıları</h3>
            <div className="space-y-2">
              {recentAlerts.map((alert, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-white/[0.02]" style={{ background: `${alert.color}04`, border: `1px solid ${alert.color}10` }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: alert.color }} />
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `${alert.color}12`, color: alert.color }}>{alert.severity}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-white">{alert.name}</span>
                    <span className="text-xs ml-2" style={{ color: "#64748B" }}>→ {alert.target}</span>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: "#475569" }}>{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CVE FEED ── */}
        <div data-section id="cve-feed">
          <SectionHeader id="cve-feed" label="CVE Feed" title="CVE Güvenlik Açığı Beslemesi" icon={<Bug className="w-4 h-4" />} />
          <CVEFeed />
        </div>

        {/* ── GÜVENLİK HABERLERİ ── */}
        <div data-section id="guvenlik-haberleri">
          <SectionHeader id="guvenlik-haberleri" label="Güvenlik Haberleri" title="Güvenlik Haberleri" icon={<Newspaper className="w-4 h-4" />} />
          <SecurityNews />
        </div>

        {/* ── GÜVENLİK ARAÇLARI ── */}
        <div data-section id="guvenlik-araclari">
          <SectionHeader id="guvenlik-araclari" label="Güvenlik Araçları" title="Güvenlik Araç Kataloğu" icon={<Wrench className="w-4 h-4" />} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityTools.map((tool, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] group" style={{ borderLeft: `3px solid ${BRAND_COLOR}` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                    <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{tool.name}</h3>
                  </div>
                  <span className="text-[10px] mono px-1.5 py-0.5 rounded-full" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>{tool.type}</span>
                </div>
                <span className="text-[10px] mono px-2 py-0.5 rounded-full inline-block mb-2" style={{ background: "rgba(255,255,255,0.04)", color: "#64748B" }}>{tool.category}</span>
                <p className="text-xs mb-2" style={{ color: "#64748B" }}>{tool.desc}</p>
                {tool.stars !== "N/A" && (
                  <span className="text-[10px] mono" style={{ color: "#475569" }}>★ {tool.stars}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── GÜVENLİK ANALİZLERİ ── */}
        <div data-section id="guvenlik-analizleri">
          <SectionHeader id="guvenlik-analizleri" label="Güvenlik Analizleri" title="Güvenlik Analiz Raporları" icon={<BarChart2 className="w-4 h-4" />} />

          <div className="space-y-4">
            {analyses.map((analysis, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.02]">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{
                        background: analysis.severity === "Kritik" ? "rgba(239,68,68,0.15)" : analysis.severity === "Yüksek" ? "rgba(249,115,22,0.15)" : analysis.severity === "Bilgi" ? "rgba(56,189,248,0.1)" : "rgba(167,139,250,0.1)",
                        color: analysis.severity === "Kritik" ? "#EF4444" : analysis.severity === "Yüksek" ? "#F97316" : analysis.severity === "Bilgi" ? "#38BDF8" : "#A78BFA",
                      }}>{analysis.severity}</span>
                      <span className="text-[10px] mono px-1.5 py-0.5 rounded" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>{analysis.type}</span>
                      <span className="text-xs" style={{ color: "#475569" }}>{analysis.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{analysis.title}</h3>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mt-2" style={{ color: "#64748B" }}>{analysis.summary}</p>
                <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: BRAND_COLOR }}>
                  <span>Raporu Oku</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
