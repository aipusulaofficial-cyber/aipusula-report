/**
 * Theme Toggle - Light/Dark Theme Switcher
 * Preserves Cyber Noir dark theme, adds polished light theme
 */
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        color: "#FCD34D",
      }}
      title={theme === "dark" ? "Açık tema" : "Koyu tema"}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
