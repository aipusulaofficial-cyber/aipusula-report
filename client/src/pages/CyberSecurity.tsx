/**
 * AIPUSULA — Siber Güvenlik Sayfası
 * Color: Orange/Red (#F97316 / #EF4444)
 * Layout: Hero + Live threat stats + Attack Map + CVE Feed + Security News + Tools + Analysis
 */
import { useState, useEffect } from "react";
import {
  Shield, AlertTriangle, Map, Bug, Newspaper, Wrench, BarChart2,
  ArrowRight, ChevronRight, Clock, Globe, Server, Lock, Eye, Zap,
  TrendingUp, Target,
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
];

// ─── Security Analysis ───────────────────────────────────────────────────────
const analyses = [
  { title: "2026 Q2 Ransomware Raporu", type: "Yıllık Rapor", date: "Temmuz 2026", summary: "Ransomware saldırıları %35 artış gösterdi. Sağlık ve finans sektörleri en çok hedef alındı." },
  { title: "Cloud Güvenlik Durumu Değerlendirmesi", type: "Analiz", date: "Haziran 2026", summary: "Bulut yapılandırma hataları hâlâ en yaygın saldırı vektörü. %68 oranında bulut ihlali yapılandırma hatasından kaynaklanıyor." },
  { title: "Zero-Trust Mimarisi: Uygulama Rehberi", type: "Rehber", date: "Temmuz 2026", summary: "Sıfır güven mimarisinin kurumsal ortamlara uygulanması adım adım açıklanıyor." },
  { title: "AI Tabanlı Saldırı Vektörleri", type: "Araştırma", date: "Haziran 2026", summary: "Deepfake ses klonlama ve AI phishing saldırılarının tespit yöntemleri." },
];

export default function CyberSecurity() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"attack-map" | "threat-intelligence" | "cve-feed" | "guvenlik-haberleri" | "guvenlik-araclari" | "guvenlik-analizleri">("attack-map");
  const [liveThreats, setLiveThreats] = useState(12847);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveThreats(prev => prev + Math.floor(Math.random() * 5) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppShell>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-8 intel-grid-bg intel-scanline intel-corner">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 20% 50%, ${BRAND_COLOR}08 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, ${THREAT_COLOR}04 0%, transparent 50%)`,
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
          <p className="text-sm mt-3 max-w-lg" style={{ color: "#64748B" }}>
            Gerçek zamanlı tehdit izleme, CVE analizi ve güvenlik araçları ile dijital dünyada güvende kalın.
          </p>

          {/* Live Threat Stats */}
          <div className="flex flex-wrap gap-6 mt-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: THREAT_COLOR }} />
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.25rem", color: THREAT_COLOR }}>
                {liveThreats.toLocaleString()}
              </span>
              <span className="text-xs" style={{ color: "#475569" }}>Aktif Tehdit</span>
            </div>
            <div className="flex items-center gap-2">
              <Bug className="w-4 h-4" style={{ color: BRAND_COLOR }} />
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem", color: BRAND_COLOR }}>142</span>
              <span className="text-xs" style={{ color: "#475569" }}>Yeni CVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: "#00E5A0" }} />
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem", color: "#00E5A0" }}>24/7</span>
              <span className="text-xs" style={{ color: "#475569" }}>İzleme</span>
            </div>
          </div>

          {/* Intel Data Strip */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="data-strip" style={{ borderLeftColor: THREAT_COLOR, background: `${THREAT_COLOR}06` }}>
              TEHDİT SEVİYESİ: KRİTİK
            </div>
            <div className="data-strip" style={{ borderLeftColor: BRAND_COLOR, background: `${BRAND_COLOR}06` }}>
              GLOBAL SÖLDİRİ: {liveThreats.toLocaleString()} AKTİF
            </div>
            <div className="data-strip" style={{ borderLeftColor: "#00E5A0", background: `rgba(0,229,160,0.06)` }}>
              KORUMA: AKTİF
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <div className="flex items-center gap-1 mt-6 overflow-x-auto pb-1">
        {[
          { id: "attack-map" as const, label: "Attack Map", icon: <Map className="w-3.5 h-3.5" /> },
          { id: "threat-intelligence" as const, label: "Tehdit İstihbaratı", icon: <Eye className="w-3.5 h-3.5" /> },
          { id: "cve-feed" as const, label: "CVE Feed", icon: <Bug className="w-3.5 h-3.5" /> },
          { id: "guvenlik-haberleri" as const, label: "Güvenlik Haberleri", icon: <Newspaper className="w-3.5 h-3.5" /> },
          { id: "guvenlik-araclari" as const, label: "Güvenlik Araçları", icon: <Wrench className="w-3.5 h-3.5" /> },
          { id: "guvenlik-analizleri" as const, label: "Güvenlik Analizleri", icon: <BarChart2 className="w-3.5 h-3.5" /> },
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
        {activeTab === "attack-map" && (
          <div>
            <AttackMap />
          </div>
        )}

        {activeTab === "threat-intelligence" && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <LiveThreatCounter />
              <AIRiskScore />
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-bold text-white mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Son Tehdit Uyarıları</h3>
              <div className="space-y-2">
                {[
                  { severity: "Kritik", name: "Log4j Yeni Varyant", target: "Java Sunucular", time: "12 dk önce", color: "#EF4444" },
                  { severity: "Yüksek", name: "Supply Chain Saldırısı", target: "npm Paketleri", time: "1 saat önce", color: "#F97316" },
                  { severity: "Orta", name: "Brute Force Kampanyası", target: "SSH Sunucular", time: "3 saat önce", color: "#FCD34D" },
                  { severity: "Düşük", name: "Port Taraması", target: "Kamu IP'leri", time: "6 saat önce", color: "#00E5A0" },
                ].map((threat, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: `${threat.color}06`, border: `1px solid ${threat.color}15` }}>
                    <span className="text-[10px] mono px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `${threat.color}15`, color: threat.color }}>{threat.severity}</span>
                    <div className="flex-1">
                      <span className="text-sm text-white">{threat.name}</span>
                      <span className="text-xs ml-2" style={{ color: "#64748B" }}>→ {threat.target}</span>
                    </div>
                    <span className="text-xs" style={{ color: "#475569" }}>{threat.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "cve-feed" && (
          <CVEFeed />
        )}

        {activeTab === "guvenlik-haberleri" && (
          <SecurityNews />
        )}

        {activeTab === "guvenlik-araclari" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityTools.map((tool, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]" style={{ borderTop: `2px solid ${BRAND_COLOR}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-4 h-4" style={{ color: BRAND_COLOR }} />
                  <h3 className="font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{tool.name}</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>{tool.category}</span>
                  <span className="text-[10px] mono px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#64748B" }}>{tool.type}</span>
                </div>
                <p className="text-xs" style={{ color: "#64748B" }}>{tool.desc}</p>
                {tool.stars !== "N/A" && (
                  <span className="text-xs mono mt-2 block" style={{ color: "#475569" }}>★ {tool.stars}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "guvenlik-analizleri" && (
          <div className="space-y-4">
            {analyses.map((analysis, i) => (
              <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-full" style={{ background: `${BRAND_COLOR}10`, color: BRAND_COLOR }}>{analysis.type}</span>
                  <span className="text-xs" style={{ color: "#475569" }}>{analysis.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{analysis.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{analysis.summary}</p>
                <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: BRAND_COLOR }}>
                  <span>Raporu Oku</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
