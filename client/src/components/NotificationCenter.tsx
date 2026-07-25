/**
 * Notification Center
 * Threat alerts, CVE alerts, system notifications
 */
import { useState } from "react";
import { Bell, Shield, Bug, AlertTriangle, Info, X, Check } from "lucide-react";

interface Notification {
  id: number;
  type: "threat" | "cve" | "system" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.ReactNode;
}

const notifications: Notification[] = [
  { id: 1, type: "threat", title: "DDoS Saldırısı Tespit Edildi", message: "192.168.x.x IP'sinden yoğun trafik tespit edildi. Otomatik bloklandı.", time: "2 dk önce", read: false, icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 2, type: "cve", title: "CVE-2026-12847 - Kritik Zafiyet", message: "Linux Kernel privilege escalation zafiyeti yayınlandı. Acil güncelleme gerekli.", time: "15 dk önce", read: false, icon: <Bug className="w-4 h-4" /> },
  { id: 3, type: "system", title: "AI Risk Score Güncellendi", message: "Güvenlik risk skorunuz 42/100 olarak güncellendi. Orta seviye risk.", time: "1 saat önce", read: false, icon: <Shield className="w-4 h-4" /> },
  { id: 4, type: "info", title: "Günlük Rapor Hazır", message: "24 saatlik güvenlik raporu ve istatistikler kullanılabilir.", time: "3 saat önce", read: true, icon: <Info className="w-4 h-4" /> },
  { id: 5, type: "threat", title: "Phishing Kampanyası Algılandı", message: "Yeni phishing kampanyası tespit edildi. E-posta filtreleri güncellendi.", time: "5 saat önce", read: true, icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 6, type: "cve", title: "CVE-2026-13120 - K8s Auth Bypass", message: "Kubernetes API authentication bypass zafiyeti. Yama mevcut.", time: "8 saat önce", read: true, icon: <Bug className="w-4 h-4" /> },
];

const typeStyles: Record<string, { bg: string; color: string }> = {
  threat: { bg: "rgba(239,68,68,0.08)", color: "#EF4444" },
  cve: { bg: "rgba(249,115,22,0.08)", color: "#F97316" },
  system: { bg: "rgba(0,229,160,0.08)", color: "#00E5A0" },
  info: { bg: "rgba(56,189,248,0.08)", color: "#38BDF8" },
};

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter(n => !n.read).length;

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-[0.97] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: unreadCount > 0 ? "#EF4444" : "#64748B",
        }}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center mono text-[9px] font-bold text-white"
            style={{ background: "#EF4444", boxShadow: "0 0 8px rgba(239,68,68,0.5)" }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className="absolute right-0 top-full mt-2 w-80 z-50 glass rounded-xl overflow-hidden"
            style={{
              borderColor: "rgba(0,229,160,0.15)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0,229,160,0.05)",
            }}
          >
            {/* Panel Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: "rgba(0,229,160,0.1)" }}>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" style={{ color: "#00E5A0" }} />
                <span className="mono text-xs font-semibold" style={{ color: "#E2E8F0" }}>Bildirimler</span>
                <span className="mono text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                  {unreadCount} yeni
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={markAllRead}
                  className="mono text-[10px] px-2 py-0.5 rounded transition-colors hover:bg-white/5"
                  style={{ color: "#64748B" }}
                >
                  Tümünü Okundu İşaretle
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-white/5" style={{ color: "#64748B" }}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-[380px] overflow-y-auto">
              {items.map((item) => {
                const style = typeStyles[item.type];
                return (
                  <div
                    key={item.id}
                    className="px-4 py-3 border-b transition-colors"
                    style={{
                      borderColor: "rgba(0,229,160,0.04)",
                      background: !item.read ? `${style.bg}` : "transparent",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${style.color}15`, color: style.color }}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs font-medium" style={{ color: "#E2E8F0" }}>{item.title}</span>
                          {!item.read && <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.color }} />}
                        </div>
                        <p className="text-[11px] leading-relaxed" style={{ color: "#94A3B8" }}>{item.message}</p>
                        <span className="mono text-[10px] mt-1 block" style={{ color: "#334155" }}>{item.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel Footer */}
            <div className="px-4 py-2.5 border-t" style={{ borderColor: "rgba(0,229,160,0.08)" }}>
              <div className="flex items-center justify-between">
                <span className="mono text-[10px]" style={{ color: "#334155" }}>{items.length} toplam bildirim</span>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3" style={{ color: "#00E5A0" }} />
                  <span className="mono text-[10px]" style={{ color: "#00E5A0" }}>Sistem Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
