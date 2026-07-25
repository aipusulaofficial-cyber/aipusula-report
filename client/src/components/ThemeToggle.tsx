/**
 * Theme Toggle - Light/Dark Theme Switcher
 * Preserves Cyber Noir dark theme, adds polished light theme
 */
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-[0.97] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5A0]/30"
      style={{
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
        border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
        color: isDark ? "#FCD34D" : "#92400E",
      }}
      title={theme === "dark" ? "Açık tema" : "Koyu tema"}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
