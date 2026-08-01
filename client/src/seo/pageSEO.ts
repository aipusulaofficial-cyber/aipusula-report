export type SEOPage =
  | "home"
  | "ai"
  | "tools"
  | "earn"
  | "digital"
  | "cyber";

export const pageSEO = {
  home: {
    title:
      "AIPUSULA | Yapay Zekâ Araçları, AI Haberleri ve Siber Güvenlik",

    description:
      "Yapay zekâ araçları, AI haberleri, siber güvenlik, teknoloji rehberleri ve dijital dünya.",

    canonical: "https://aipusula.net/",

    image: "https://aipusula.net/og-image.png"
  },

  ai: {
    title:
      "Yapay Zekâ Dünyası | AIPUSULA",

    description:
      "Yapay zekâ dünyasındaki son gelişmeler, modeller ve teknolojiler.",

    canonical:
      "https://aipusula.net/yapay-zeka",

    image:
      "https://aipusula.net/og-image.png"
  },

  tools: {
    title:
      "En İyi AI Araçları | AIPUSULA",

    description:
      "ChatGPT, Gemini, Claude ve en iyi yapay zekâ araçları.",

    canonical:
      "https://aipusula.net/ai-araclari",

    image:
      "https://aipusula.net/og-image.png"
  },

  earn: {
    title:
      "AI ile Para Kazanma | AIPUSULA",

    description:
      "Yapay zekâ ile gelir elde etme yöntemleri.",

    canonical:
      "https://aipusula.net/ai-ile-kazanc",

    image:
      "https://aipusula.net/og-image.png"
  },

  digital: {
    title:
      "Dijital Dünya | AIPUSULA",

    description:
      "Teknoloji, internet ve dijital yaşam.",

    canonical:
      "https://aipusula.net/dijital-dunya",

    image:
      "https://aipusula.net/og-image.png"
  },

  cyber: {
    title:
      "Siber Güvenlik | AIPUSULA",

    description:
      "Siber güvenlik haberleri ve rehberleri.",

    canonical:
      "https://aipusula.net/siber-guvenlik",

    image:
      "https://aipusula.net/og-image.png"
  }
} as const;
