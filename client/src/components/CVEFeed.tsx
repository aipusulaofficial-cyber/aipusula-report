/**
 * Critical CVE Feed - Last 24 Hours
 * Latest critical CVEs with severity badges, CVSS score, search
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Bug, Search, ExternalLink, Clock } from "lucide-react";

interface CVEItem {
  id: string;
  title: string;
  severity: "KRİTİK" | "YÜKSEK" | "ORTA" | "DÜŞÜK";
  cvss: number;
  publishDate: string;
  affected: string;
  description: string;
}

const cvePool: CVEItem[] = [
  { id: "CVE-2026-12847", title: "Linux Kernel Yetki Yükseltme", severity: "KRİTİK", cvss: 9.8, publishDate: "2026-07-24", affected: "Linux Kernel 6.x", description: "Yerel yetki yükseltme zafiyeti, root erişimi sağlıyor." },
  { id: "CVE-2026-12901", title: "Apache HTTP Sunucu RCE", severity: "KRİTİK", cvss: 9.6, publishDate: "2026-07-24", affected: "Apache 2.4.x", description: "Uzaktan kod çalıştırma, sunucu ele geçirme riski." },
  { id: "CVE-2026-13055", title: "OpenSSL Bellek Bozulması", severity: "YÜKSEK", cvss: 8.4, publishDate: "2026-07-24", affected: "OpenSSL 3.x", description: "Bellek bozulması zafiyeti, hizmet kesintisine yol açabilir." },
  { id: "CVE-2026-12783", title: "PostgreSQL Injection Açığı", severity: "YÜKSEK", cvss: 8.1, publishDate: "2026-07-24", affected: "PostgreSQL 15-16", description: "SQL injection vektörü, veritabanı sızıntısı riski." },
  { id: "CVE-2026-13120", title: "Kubernetes API Kimlik Atlama", severity: "KRİTİK", cvss: 9.4, publishDate: "2026-07-25", affected: "Kubernetes 1.28-1.30", description: "Kimlik doğrulama atlaması, küme ele geçirme riski." },
  { id: "CVE-2026-12650", title: "Node.js Prototip Kirlenmesi", severity: "YÜKSEK", cvss: 7.8, publishDate: "2026-07-24", affected: "Node.js 20.x", description: "Prototip kirlenmesi, RCE'ye kadar giden zincir." },
  { id: "CVE-2026-13200", title: "Nginx Dizin Atlama", severity: "ORTA", cvss: 6.5, publishDate: "2026-07-25", affected: "Nginx 1.24-1.26", description: "Dizin atlaması, hassas dosya erişimi riski." },
  { id: "CVE-2026-12950", title: "Docker Container Kaçış", severity: "KRİTİK", cvss: 9.2, publishDate: "2026-07-25", affected: "Docker 24.x-25.x", description: "Container kaçış zafiyeti, host sisteme erişim." },
  { id: "CVE-2026-13080", title: "Redis Uzaktan Kod Çalıştırma", severity: "YÜKSEK", cvss: 8.7, publishDate: "2026-07-25", affected: "Redis 7.x", description: "Uzaktan kod çalıştırma, sunucu ele geçirme." },
  { id: "CVE-2026-12500", title: "Android Kernel DoS", severity: "ORTA", cvss: 5.5, publishDate: "2026-07-24", affected: "Android 14-15", description: "Hizmet kesintisi, cihaz kilitleme riski." },
  { id: "CVE-2026-13150", title: "WordPress Eklenti XSS", severity: "ORTA", cvss: 6.1, publishDate: "2026-07-25", affected: "WordPress 6.x Eklentiler", description: "Stored XSS, kullanıcı oturum çalma riski." },
  { id: "CVE-2026-12400", title: "Windows Defender Atlama", severity: "YÜKSEK", cvss: 7.5, publishDate: "2026-07-24", affected: "Windows 11 23H2", description: "Antivirüs atlama, zararlı yazılım dağıtımı." },
];

const severityStyles: Record<string, { bg: string; text: string; border: string }> = {
  "KRİTİK": { bg: "rgba(239,68,68,0.1)", text: "#EF4444", border: "rgba(239,68,68,0.3)" },
  "YÜKSEK": { bg: "rgba(249,115,22,0.1)", text: "#F97316", border: "rgba(249,115,22,0.3)" },
  "ORTA": { bg: "rgba(252,211,77,0.1)", text: "#FCD34D", border: "rgba(252,211,77,0.3)" },
  "DÜŞÜK": { bg: "rgba(56,189,248,0.1)", text: "#38BDF8", border: "rgba(56,189,248,0.3)" },
};

export function CVEFeed() {
  const [search, setSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("TÜMÜ");

  const filteredCVEs = useMemo(() => {
    return cvePool
      .filter(cve => filterSeverity === "TÜMÜ" || cve.severity === filterSeverity)
      .filter(cve =>
        cve.id.toLowerCase().includes(search.toLowerCase()) ||
        cve.title.toLowerCase().includes(search.toLowerCase()) ||
        cve.affected.toLowerCase().includes(search.toLowerCase())
      );
  }, [search, filterSeverity]);

  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: "rgba(0,229,160,0.1)" }}>
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4" style={{ color: "#EF4444" }} />
          <span className="mono text-xs uppercase tracking-widest" style={{ color: "#EF4444" }}>
            Kritik CVE'ler (24s)
          </span>
        </div>
        <span className="mono text-[10px]" style={{ color: "#64748B" }}>{cvePool.length} Zafiyet</span>
      </div>

      {/* Search & Filter */}
      <div className="px-4 py-3 flex flex-wrap gap-2 border-b" style={{ borderColor: "rgba(0,229,160,0.06)" }}>
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5" style={{ color: "#64748B" }} />
          <input
            type="text"
            placeholder="CVE ID, başlık veya ürün ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
            style={{ color: "#E2E8F0" }}
          />
        </div>
        <div className="flex items-center gap-1">
          {["TÜMÜ", "KRİTİK", "YÜKSEK", "ORTA"].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className="px-2 py-1 rounded text-[10px] mono uppercase transition-all"
              style={{
                background: filterSeverity === sev
                  ? (severityStyles[sev]?.bg || "rgba(255,255,255,0.05)")
                  : "transparent",
                color: filterSeverity === sev
                  ? (severityStyles[sev]?.text || "#E2E8F0")
                  : "#64748B",
                border: `1px solid ${filterSeverity === sev ? (severityStyles[sev]?.border || "rgba(255,255,255,0.1)") : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* CVE List */}
      <div className="max-h-[360px] overflow-y-auto">
        {filteredCVEs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm" style={{ color: "#64748B" }}>Sonuç bulunamadı</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(0,229,160,0.04)" }}>
            {filteredCVEs.map((cve) => {
              const style = severityStyles[cve.severity];
              return (
                <Link key={cve.id} href={`/detay/siber-guvenlik/cve/${cve.id}`}>
                <div className="px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="mono text-xs font-semibold" style={{ color: "#00E5A0" }}>{cve.id}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] mono font-semibold" style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}>
                          {cve.severity}
                        </span>
                        <span className="mono text-[10px]" style={{ color: "#64748B" }}>CVSS: {cve.cvss}</span>
                      </div>
                      <p className="text-sm font-medium truncate" style={{ color: "#E2E8F0" }}>{cve.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{cve.affected}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" style={{ color: "#334155" }} />
                      <span className="mono text-[10px]" style={{ color: "#334155" }}>{cve.publishDate}</span>
                    </div>
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: "#475569" }}>{cve.description}</p>
                </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
