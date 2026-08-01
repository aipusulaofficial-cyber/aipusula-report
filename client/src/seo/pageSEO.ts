export type SEOKey =
  | "home"
  | "ai"
  | "tools"
  | "earn"
  | "digital"
  | "cyber";

export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  image: string;
}

export const pageSEO: Record<SEOKey, SEOData> = {
  home: {
    title: "AIPUSULA | Yapay Zekâ, AI Araçları ve Siber Güvenlik",
    description:
      "Yapay zekâ araçları, AI haberleri, ChatGPT, Gemini, Claude, siber güvenlik ve dijital dünya içerikleri.",
    canonical: "https://aipusula.net/",
    keywords:
      "AIPUSULA, yapay zekâ, AI, ChatGPT, Gemini, Claude, siber güvenlik",
    image: "https://aipusula.net/og-image.png",
  },

  ai: {
    title: "Yapay Zekâ Dünyası | AIPUSULA",
    description:
      "Yapay zekâ haberleri, LLM modelleri, OpenAI, Google Gemini ve AI dünyasındaki gelişmeler.",
    canonical: "https://aipusula.net/yapay-zeka",
    keywords:
      "yapay zekâ, AI haberleri, GPT-5, Claude, Gemini",
    image: "https://aipusula.net/og-image.png",
  },

  tools: {
    title: "AI Araçları | AIPUSULA",
    description:
      "En iyi yapay zekâ araçları, karşılaştırmalar ve kullanım rehberleri.",
    canonical: "https://aipusula.net/ai-araclari",
    keywords:
      "AI araçları, ChatGPT, Claude, Gemini, Midjourney",
    image: "https://aipusula.net/og-image.png",
  },

  earn: {
    title: "AI ile Para Kazanma | AIPUSULA",
    description:
      "Yapay zekâ ile gelir elde etme yolları, iş fikirleri ve rehberler.",
    canonical: "https://aipusula.net/ai-ile-kazanc",
    keywords:
      "AI ile para kazanma, yapay zekâ gelir",
    image: "https://aipusula.net/og-image.png",
  },

  digital: {
    title: "Dijital Dünya | AIPUSULA",
    description:
      "Teknoloji, yazılım, internet ve dijital dönüşüm içerikleri.",
    canonical: "https://aipusula.net/dijital-dunya",
    keywords:
      "teknoloji, dijital dünya, yazılım",
    image: "https://aipusula.net/og-image.png",
  },

  cyber: {
    title: "Siber Güvenlik | AIPUSULA",
    description:
      "Siber güvenlik haberleri, CVE analizleri ve güvenlik rehberleri.",
    canonical: "https://aipusula.net/siber-guvenlik",
    keywords:
      "siber güvenlik, CVE, hacking, güvenlik",
    image: "https://aipusula.net/og-image.png",
  },
};
     