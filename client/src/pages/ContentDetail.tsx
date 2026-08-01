/**
 * AIPUSULA — Content Detail Page
 * Shared template for all content types: articles, guides, tools, models, events, CVEs, reports, etc.
 * Route pattern: /detay/:category/:type/:slug
 */
import { Link, useParams } from "wouter";
import {
  ArrowLeft, Clock, Eye, Calendar, MapPin, BarChart3,
  Shield, Bug, AlertTriangle, Award, BookOpen, Cpu,
  ExternalLink, TrendingUp, Users, Star, Tag, Globe,
  Server, Code2, Layers, ChevronRight, Zap,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import SEO from "@/components/SEO";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Content Data Registry ──────────────────────────────────────────────────
// All content items from all pages, mapped by slug for detail page lookup

const contentRegistry: Record<string, Record<string, Record<string, any>>> = {
  // ── Yapay Zekâ ──
  "yapay-zeka": {
    haber: {
      "gpt5-multimodal": {
        title: "OpenAI GPT-5: Multimodal Reasoning & Agentic AI",
        tag: "Öne Çıkan", tagColor: "#06B6D4",
        time: "2 saat önce", readTime: "8 dk",
        summary: "GPT-5, gerçek dünya etkileşimi ve otonom görev yürütme kapasitesiyle yeni bir dönemi başlatıyor. Agentic AI, sadece yanıtlar üretmekle kalmayıp, kompleks iş akışlarını kendi başına yönetebiliyor.",
        body: "GPT-5'nin en çarpıcı özelliği, çok modlu reasoning kapasitesidir. Metin, görsel ve ses girişlerini aynı anda işleyebilen bu model, önceki nesillerden farklı olarak agentic görev yürütme yeteneğine sahiptir.\n\n**Agentic AI Nedir?**\nGPT-5, basit chatbot sınırlarını aşarak karmaşık iş akışlarını otonom olarak yönetebilmektedir. E-posta yönetimi, veri analizi, kod yazımı ve araştırma gibi görevleri tek bir prompt ile başlatabilir.\n\n**Multimodal Yetenekler**\nDokümanları okuyup özetleme, görselleri analiz edip rapor oluşturma ve ses kayıtlarını transkribe edip analiz etme gibi çok modlu işlemler tek bir modelde birleşmiştir.\n\n**Enterprise Entegrasyonu**\nAPI desteği, güvenlik katmanları ve özelleştirilebilir model davranışı ile kurumsal ortamlara hazır olarak gelmektedir.",
        category: "Yapay Zekâ", color: "#06B6D4",
      },
      "claude4-tool-use": {
        title: "Anthropic Claude 4: Uzun Bağlam Pencereleri ve Tool Use",
        tag: "Güncelleme", tagColor: "#A78BFA",
        time: "4 saat önce", readTime: "6 dk",
        summary: "200K token bağlam penceresi ve gelişmiş araç kullanımı ile Claude 4, iş akışlarını dönüştürüyor.",
        body: "Claude 4, Anthropic'ın en gelişmiş modeli olarak 200K token bağlam penceresi sunmaktadır. Bu, yaklaşık 150.000 kelime veya 500 sayfalık bir dokümanın tek seferde işlenebilmesi anlamına gelmektedir.\n\n**Tool Use Geliştirmeleri**\nClaude 4'ün araç kullanımı, önceki versiyonlara göre önemli ölçüde geliştirilmiştir. Model, dosya sistemi, terminal, web tarayıcı ve API endpoint'lerini doğal bir şekilde kullanabilmektedir.\n\n**Safety Özellikleri**\nConstitutional AI yaklaşımı ile eğitilen Claude 4, zararlı içeriği tespit etme ve reddetme konusunda sektörde öncü konumdadır.",
        category: "Yapay Zekâ", color: "#A78BFA",
      },
      "alphafold3-protein": {
        title: "Google DeepMind: AlphaFold 3 Protein Yapı Tahmini",
        tag: "Araştırma", tagColor: "#38BDF8",
        time: "6 saat önce", readTime: "5 dk",
        summary: "AlphaFold 3, ilaç keşfini hızlandıran protein yapı tahmininde %30 daha yüksek doğruluk sunuyor.",
        body: "AlphaFold 3, sadece protein yapılarını değil, DNA, RNA ve ligand-protein komplekslerini de yüksek doğrulukla tahmin edebilmektedir. Bu gelişme, ilaç keşif süreçlerini önemli ölçüde hızlandırmaktadır.\n\n**Doğruluk Artışı**\nÖnceki versiyona göre %30 daha yüksek doğruluk, özellikle kritik hedef proteinlerde deneysel yöntemlere yakın sonuçlar vermektedir.\n\n**Etki Alanları**\nİlaç keşfi, genetik hastalıklar, biyogüvenlik ve biyolojik araştırma alanlarında çığır açıcı sonuçlar beklenmektedir.",
        category: "Yapay Zekâ", color: "#38BDF8",
      },
      "llama4-open-source": {
        title: "Meta Llama 4: Açık Kaynak LLM Geliştirmeleri",
        tag: "Açık Kaynak", tagColor: "#FCD34D",
        time: "8 saat önce", readTime: "7 dk",
        summary: "405B parametreli Llama 4, açık kaynak dünyasında en güçlü model olarak öne çıkıyor.",
        body: "Llama 4, Meta'nın açık kaynak yapay zeka stratejisinin en güçlü temsilcisidir. 405 milyar parametre ile proprietary modellere rakip olmaktadır.\n\n**Açık Kaynak Etkisi**\nLlama 4'ün açık kaynak olarak yayınlanması, araştırmacıların ve geliştiricilerin modeli özelleştirmesine olanak tanımaktadır.\n\n**Performans**\nMMLU, GSM8K ve HumanEval benchmark'larında GPT-4 ve Claude 3'e yakın sonuçlar göstermektedir.",
        category: "Yapay Zekâ", color: "#FCD34D",
      },
      "ai-agent-ecosystem": {
        title: "AI Agent Ekosistemi: Otonom Görev Yürütme",
        tag: "Trend", tagColor: "#F97316",
        time: "12 saat önce", readTime: "6 dk",
        summary: "AI ajanları artık e-posta yönetimi, kod yazımı ve veri analizi gibi karmaşık görevleri otonom yürütüyor.",
        body: "AI ajanları, belirli hedefler doğrultusunda kendi başına görev planlayabilen ve yürütebilen yapay zeka sistemleridir. Bu paradigma, iş akışı otomasyonunu yeni bir seviyeye taşımaktadır.\n\n**Ajan Mimarisi**\nModern AI ajanları, düşünme-düşünme-düşünme döngüsü ile karmaşık görevleri alt görevlere ayırabilmektedir.\n\n**Kullanım Alanları**\nKod geliştirme, veri analizi, müşteri hizmetleri, araştırma ve içerik üretimi alanlarında yaygınlaşmaktadır.",
        category: "Yapay Zekâ", color: "#F97316",
      },
      "ms-copilot-enterprise": {
        title: "Microsoft Copilot: Enterprise AI Entegrasyonu",
        tag: "Enterprise", tagColor: "#00E5A0",
        time: "1 gün önce", readTime: "5 dk",
        summary: "Microsoft 365 ekosistemine entegre Copilot, kurumsal üretkenliği dönüştürüyor.",
        body: "Microsoft Copilot, Word, Excel, PowerPoint, Outlook ve Teams ile derin entegrasyon sunmaktadır. Kurumsal kullanıcılar, günlük iş akışlarını AI destekli asistan ile hızlandırabilmektedir.\n\n**Entegrasyon Derinliği**\nCopilot, Microsoft 365 ekosistemine natif olarak entegre olmuştur. Verilerinizi okuyabilir, e-postalarınızı yönetebilir ve toplantılarınızı organize edebilir.\n\n**Güvenlik**\nKurumsal güvenlik politikalarına uyumlu veri işleme ve Microsoft Defender entegrasyonu ile güvenli AI deneyimi sunmaktadır.",
        category: "Yapay Zekâ", color: "#00E5A0",
      },
      "ai-safety-regulation": {
        title: "AI Safety: Yeni Düzenleme Standartları",
        tag: "Düzenleme", tagColor: "#FB7185",
        time: "1 gün önce", readTime: "7 dk",
        summary: "AB AI Act ve ABD düzenlemeleri, AI sistemleri için yeni güvenlik standartları getiriyor.",
        body: "AB AI Act, dünyada yapay zeka düzenlemeleri konusunda öncü mevzuattır. Risk bazlı sınıflandırma sistemi ile AI sistemlerini kabul edilemez risk, yüksek risk, sınırlı risk ve minimal risk kategorilerine ayırmaktadır.\n\n**AB AI Act**\nYüksek riskli AI sistemleri için uygunluk değerlendirmesi, şeffaflık gereklilikleri ve insan gözetimi zorunluluğu getirilmektedir.\n\n**ABD Yaklaşımı**\nABD'nin yaklaşımı daha esnek olup, sektör bazlı düzenlemeleri tercih etmektedir.",
        category: "Yapay Zekâ", color: "#FB7185",
      },
    },
    model: {
      "gpt-5": { name: "GPT-5", company: "OpenAI", params: "Otonom AI", type: "Çok Modlu", strength: "95%", color: "#06B6D4", desc: "Çok modlu reasoning ve agentic görev yürütme", body: "GPT-5, OpenAI'nin en gelişmiş çok modlu modelidir. Agentic görev yürütme, kod yazımı ve karmaşık muhakeme kapasiteleri ile öne çıkmaktadır." },
      "claude-4": { name: "Claude 4", company: "Anthropic", params: "200K bağlam", type: "Araç Kullanımı", strength: "88%", color: "#A78BFA", desc: "Uzun bağlam ve gelişmiş tool use", body: "Claude 4, 200K token bağlam penceresi ve gelişmiş araç kullanımı ile iş akışlarını dönüştürmektedir." },
      "gemini-2": { name: "Gemini 2.0", company: "Google", params: "Çok modlu", type: "Uzun Bağlam", strength: "87%", color: "#38BDF8", desc: "Google ekosistem entegrasyonu", body: "Gemini 2.0, Google ekosistemine derin entegrasyon sunarak arama, doküman ve e-posta işlemlerini tek bir modelle yönetmektedir." },
      "llama-4": { name: "Llama 4", company: "Meta", params: "405B parametre", type: "Açık Kaynak", strength: "82%", color: "#FCD34D", desc: "En güçlü açık kaynak model", body: "405B parametreli Llama 4, açık kaynak dünyasında en güçlü modeldir. MIT lisansı ile özgürce kullanılabilir." },
      "mistral-large": { name: "Mistral Large", company: "Mistral AI", params: "248B parametre", type: "Multilingual", strength: "78%", color: "#FB7185", desc: "Avrupa merkezli güçlü model", body: "Mistral Large, çok dilli yetenekleri ve Avrupa merkezli veri işleme politikası ile öne çıkmaktadır." },
      "groq-lpu": { name: "Groq LPU", company: "Groq", params: "Ultra hızlı", type: "Inference Engine", strength: "91%", color: "#00E5A0", desc: "En hızlı inference motoru", body: "Groq LPU, özel çip mimarisi ile saniyede 800+ token üretme kapasitesine sahip en hızlı inference motorudur." },
    },
    trend: {
      "agentic-ai": { title: "Agentic AI", growth: "+340%", desc: "Otonom AI ajanları iş akışlarını dönüştürüyor", body: "Agentic AI, yapay zekanın en hızlı büyüyen kategorisidir. +340% büyüme ile iş akışları, müşteri hizmetleri ve veri analizi alanlarında devrim yaratmaktadır." },
      "multimodal": { title: "Multimodal Modeller", growth: "+180%", desc: "Metin, görsel ve ses entegrasyonu", body: "Multimodal modeller, metin, görsel ve ses verilerini aynı anda işleyebilen yeni nesil AI sistemleridir." },
      "on-device-ai": { title: "On-Device AI", growth: "+220%", desc: "Cihazda çalışan AI modelleri", body: "On-Device AI, veri gizliliği ve düşük gecikme avantajları ile mobil ve edge cihazlarda yaygınlaşmaktadır." },
      "ai-coding": { title: "AI Coding Assistants", growth: "+150%", desc: "Kod üretimi ve debug otomasyonu", body: "AI kod asistanları, geliştiricilerin verimliliğini 2-3 katına çıkarmaktadır. Cursor, Copilot ve Codeium bu alanda öncüdür." },
      "rag-systems": { title: "RAG Sistemleri", growth: "+120%", desc: "Retrieval-Augmented Generation yaygınlaşıyor", body: "RAG sistemleri, LLM'lerin halüsinasyon sorununu azaltarak güncel ve güvenilir yanıtlar üretmesini sağlamaktadır." },
      "ai-safety": { title: "AI Safety & Alignment", growth: "+95%", desc: "Güvenli AI geliştirme önceliği artıyor", body: "AI güvenliği ve hizalama araştırmaları, model kapasiteleri arttıkça kritik önem kazanmaktadır." },
    },
    arastirma: {
      "cot-reasoning": { title: "Chain-of-Thought Reasoning in Large Language Models", authors: "OpenAI Research", date: "Temmuz 2026", citations: 2847, journal: "NeurIPS 2026", body: "Bu çalışma, büyük dil modellerinin adım adım muhakeme yeteneklerini sistematik olarak incelemektedir. Chain-of-Thought prompting'in model performansına etkisi deneysel olarak kanıtlanmıştır." },
      "scaling-laws": { title: "Scaling Laws for Neural Language Models: Revisited", authors: "Anthropic", date: "Haziran 2026", citations: 1923, journal: "ICML 2026", body: "Bu araştırma, nöral dil modellerinin ölçekleme yasalarını güncel verilerle yeniden incelemekte ve yeni kırılım noktalarını tespit etmektedir." },
      "emergent-abilities": { title: "Emergent Abilities of Large Language Models", authors: "Google Brain", date: "Mayıs 2026", citations: 3156, journal: "Nature AI", body: "Büyük dil modellerinin beklenmedik yetenekleri, model boyutu belirli bir eşiği aştığında ortaya çıkmaktadır. Bu çalışma, ortaya çıkan yeteneklerin mekanizmalarını analiz etmektedir." },
      "self-play-ft": { title: "Self-Play Fine-Tuning for Aligned AI", authors: "OpenAI", date: "Temmuz 2026", citations: 1445, journal: "AAAI 2026", body: "Kendi kendini eğiten AI sistemleri, hizalanmış davranışları pekiştirmek için self-play mekanizmalarını kullanmaktadır." },
      "rag-survey": { title: "Retrieval-Augmented Generation: A Survey", authors: "DeepMind", date: "Haziran 2026", citations: 2201, journal: "ACL 2026", body: "RAG yaklaşımlarının kapsamlı bir literatür taraması. Vektör veritabanları, yeniden sıralama ve hibrit arama stratejileri karşılaştırılmaktadır." },
    },
    etkinlik: {
      "ai-summit-istanbul": { title: "AI Summit Istanbul 2026", date: "15 Ağustos 2026", location: "İstanbul, TR", type: "Konferans", desc: "Türkiye'nin en büyük AI konferansı. 50+ konuşmacı, 2000+ katılımcı.", body: "AI Summit Istanbul 2026, Türkiye'nin en büyük yapay zeka konferansıdır. 50'den fazla uluslararası ve yerel konuşmacı, 2000'den fazla katılımcı ile AI dünyasının nabzını tutmaktadır." },
      "llm-dev-conf": { title: "LLM Developer Conference", date: "22 Ağustos 2026", location: "Online", type: "Konferans", desc: "Büyük dil modelleri geliştiricileri için teknik konferans.", body: "LLM Developer Conference, büyük dil modelleri üzerine çalışan geliştiriciler için teknik derinliğe sahip bir konferanstır. Fine-tuning, RAG, agent mimarisi ve model eval konuları işlenmektedir." },
      "ai-safety-workshop": { title: "AI Safety Workshop", date: "1 Eylül 2026", location: "Londra, UK", type: "Workshop", desc: "AI güvenliği ve hizalama üzerine pratik workshop.", body: "AI Safety Workshop, yapay zeka güvenliği ve hizalama üzerine pratik bir workshop'tır. Red teaming, interpretability ve alignment testing konuları ele alınmaktadır." },
      "oss-ai-hackathon": { title: "Open Source AI Hackathon", date: "10 Eylül 2026", location: "Online", type: "Hackathon", desc: "48 saatlik açık kaynak AI hackathonu. $50K ödül.", body: "48 saatlik açık kaynak AI hackathonu, geliştiricilerin açık kaynak AI projeleri üzerinde çalıştığı rekabetçi bir etkinlik. $50K ödül havuzu ile çekici bir fırsattır." },
      "agi-symposium": { title: "AGI Research Symposium", date: "25 Eylül 2026", location: "San Francisco, USA", type: "Sempozyum", desc: "AGI araştırmaları üzerine akademik sempozyum.", body: "AGI Research Symposium, genel yapay zeka araştırmaları üzerine akademik bir sempozyum. Öğrenme, muhakeme ve genel yetenekler üzerine teorik ve deneysel çalışmalar sunulmaktadır." },
    },
  },

  // ── AI Araçları ──
  "ai-araclari": {
    arac: {
      "chatgpt": { name: "ChatGPT", company: "OpenAI", category: "Sohbet", rating: 4.8, users: "200M+", pricing: "Ücretsiz / $20", features: ["Multimodal", "Plugin", "Custom GPT", "Voice"], color: "#00E5A0", desc: "Dünyanın en popüler AI sohbet asistanı. GPT-4 tabanlı, çok modlu yetenekleri ile metin, görsel ve ses işlemleri.", body: "ChatGPT, OpenAI tarafından geliştirilen ve dünyanın en popüler AI sohbet asistanıdır. 200 milyondan fazla kullanıcı ile günlük iş akışlarında vazgeçilmez bir araç haline gelmiştir.\n\n**Temel Özellikler**\nMultimodal yetenekler, özel GPT oluşturma, plugin desteği ve sesli etkileşim ile zengin bir deneyim sunar.\n\n**Fiyatlandırma**\nÜcretsiz kullanım ile temel özelliklere erişim, Plus abonelik ile gelişmiş modellere erişim sağlanmaktadır." },
      "claude": { name: "Claude", company: "Anthropic", category: "Sohbet", rating: 4.7, users: "50M+", pricing: "Ücretsiz / $20", features: ["200K Context", "Artifacts", "Projects", "Vision"], color: "#A78BFA", desc: "Gelişmiş reasoning ve uzun bağlam penceresi ile öne çıkan AI asistan.", body: "Claude, Anthropic tarafından geliştirilen ve güvenlik odaklı yaklaşımı ile bilinen AI asistanıdır. 200K token bağlam penceresi ve Artifacts özelliği ile öne çıkmaktadır." },
      "gemini": { name: "Gemini", company: "Google", category: "Sohbet", rating: 4.5, users: "100M+", pricing: "Ücretsiz / $20", features: ["Google Entegre", "Multimodal", "Code", "Web"], color: "#38BDF8", desc: "Google ekosistemine entegre çok modlu AI asistan.", body: "Gemini, Google'un çok modlu AI modeli olup arama, Gmail, Docs ve Drive ile derin entegrasyon sunmaktadır." },
      "midjourney": { name: "Midjourney", company: "Midjourney", category: "Görsel", rating: 4.9, users: "16M+", pricing: "$10-$60", features: ["Fotoğraf Gerçekçi", "Stil Transfer", "Remix", "V6 Model"], color: "#A78BFA", desc: "Foto-gerçekçi görsel üretim. V6 model ile profesyonel kalitede sanat eserleri.", body: "Midjourney, yapay zeka ile foto-gerçekçi görsel üreten öncü platformdur. V6 modeli ile profesyonel kalitede sanat eserleri oluşturabilirsiniz." },
      "cursor": { name: "Cursor", company: "Cursor AI", category: "Kod", rating: 4.9, users: "5M+", pricing: "Ücretsiz / $20", features: ["Tab Complete", "Chat", "Edit", "Multi-file"], color: "#00E5A0", desc: "AI-native kod editörü. Kod yazma hızını 3x artırır.", body: "Cursor, AI-native bir kod editörüdür. Tab complete, chat edit ve multi-file edit özellikleri ile kod yazma hızını önemli ölçüde artırır." },
      "perplexity": { name: "Perplexity", company: "Perplexity AI", category: "Arama", rating: 4.6, users: "10M+", pricing: "Ücretsiz / $20", features: ["Gerçek Zamanlı", "Kaynak", "Collection", "Space"], color: "#38BDF8", desc: "Gerçek zamanlı kaynaklı AI arama motoru.", body: "Perplexity, gerçek zamanlı web araması yapabilen ve kaynak gösteren AI arama motorudur. Araştırmalar için ideal bir çözümdür." },
      "runway": { name: "Runway ML", company: "Runway", category: "Video", rating: 4.4, users: "2M+", pricing: "$12-$76", features: ["Gen-3", "Video Edit", "Motion Brush", "Image-to-Video"], color: "#FB7185", desc: "AI destekli video üretim ve düzenleme platformu.", body: "Runway ML, Gen-3 modeli ile profesyonel kalitede video üretimi sağlayan AI platformudur." },
      "elevenlabs": { name: "ElevenLabs", company: "ElevenLabs", category: "Ses", rating: 4.7, users: "3M+", pricing: "Ücretsiz / $5+", features: ["TTS", "Voice Clone", "Dubbing", "Speech-to-Speech"], color: "#A78BFA", desc: "En gelişmiş AI ses ve TTS platformu.", body: "ElevenLabs, en gelişmiş AI ses üretimi ve klonlama platformudur. Voice clone kalitesi mükemmel seviyededir." },
      "copilot": { name: "Copilot", company: "Microsoft", category: "Kod", rating: 4.6, users: "30M+", pricing: "$10-$39", features: ["IDE Entegre", "Agent Mode", "Review", "Chat"], color: "#38BDF8", desc: "Microsoft'un AI kod asistanı. IDE'lere derin entegrasyon.", body: "GitHub Copilot, Microsoft ve GitHub tarafından geliştirilen AI kod asistanıdır. IDE'lere derin entegrasyon sunar." },
      "sunno": { name: "Sunno", company: "Sunno AI", category: "Ses", rating: 4.5, users: "1M+", pricing: "Ücretsiz / $8", features: ["Müzik Üretimi", "Söz Yazımı", "Stil Kontrol"], color: "#FCD34D", desc: "AI destekli müzik üretimi platformu.", body: "Sunno AI, metin prompt'undan profesyonel kalitede müzik üreten AI platformudur." },
    },
  },

  // ── AI ile Kazanç ──
  "ai-ile-kazanc": {
    rehber: {
      "ai-freelancing-5k": { title: "AI Freelancing ile Aylık $5K Kazanç Rehberi", readTime: "12 dk", category: "Freelance", level: "Başlangıç", difficulty: "Kolay", color: "#FCD34D", body: "AI araçlarını kullanarak freelance kazanç elde etmenin kapsamlı rehberi.\n\n**1. Başlangıç**\nChatGPT, Midjourney ve diğer AI araçlarını öğrenin. Upwork veya Fiverr'da profil oluşturun.\n\n**2. Niş Seçimi**\nİçerik yazımı, görsel tasarım veya veri analizi gibi alanlarda uzmanlaşın.\n\n**3. Portfolyo**\nAI ile ürettiğiniz çalışmaları portfolyo olarak sergileyin.\n\n**4. Fiyatlandırma**\nPazar araştırması yaparak rekabetçi fiyatlar belirleyin.\n\n**5. Büyüme**\nMüşteri yorumları ve tekrar eden işler ile gelirinizi artırın." },
      "chatgpt-icerik-uretimi": { title: "ChatGPT ile İçerik Üretimi: Tam Rehber", readTime: "18 dk", category: "İçerik", level: "Orta", difficulty: "Orta", color: "#FCD34D", body: "ChatGPT ile profesyonel kalitede içerik üretiminin kapsamlı rehberi.\n\n**Prompt Mühendisliği**\nEtkili prompt'lar yazarak ChatGPT'nin kalitesini artırın.\n\n**SEO Uyumu**\nAnahtar kelime araştırması ve SEO optimizasyonu ile içeriklerinizi arama sonuçlarında öne çıkarın.\n\n**İçerik Türleri**\nBlog yazıları, sosyal medya içerikleri, e-posta kampanyaları ve ürün açıklamaları." },
      "ai-saas-gelistirme": { title: "AI ile SaaS Ürün Geliştirme Adım Adım", readTime: "25 dk", category: "SaaS", level: "İleri", difficulty: "Zor", color: "#FCD34D", body: "AI tabanlı SaaS ürünleri geliştirmenin kapsamlı rehberi.\n\n**Fikir Doğrulama**\nMVP test etme ve pazar ihtiyacını doğrulama yöntemleri.\n\n**Teknik Mimari**\nAI API'leri, veritabanı seçimi ve ölçeklenebilir mimari tasarımı.\n\n**Lansman Stratejisi**\nProduct Hunt lansmanı, erken kullanıcı edinme ve growth hacking teknikleri." },
      "youtube-ai-otomasyon": { title: "YouTube AI Otomasyonu: Sıfırdan Başlangıç", readTime: "15 dk", category: "YouTube", level: "Başlangıç", difficulty: "Kolay", color: "#FCD34D", body: "AI araçlarını kullanarak YouTube kanalınızı büyütmenin rehberi.\n\n**Senaryo Yazımı**\nChatGPT ile video senaryoları oluşturma.\n\n**Görsel Üretim**\nMidjourney ve DALL-E ile thumbnail ve görsel içerik üretimi.\n\n**Seslendirme**\nElevenLabs ile profesyonel seslendirme.\n\n**SEO Optimizasyonu**\nVideo başlıkları, açıklamaları ve etiketleri için AI destekli optimizasyon." },
      "prompt-engineering-gelir": { title: "Prompt Engineering ile Gelir Artırma", readTime: "10 dk", category: "Teknik", level: "Orta", difficulty: "Orta", color: "#FCD34D", body: "Prompt mühendisliği becerilerini geliştirerek gelirinizi artırmanın rehberi.\n\n**Temel Teknikler**\nRol atama, zincirleme düşünme ve few-shot öğrenme.\n\n**Gelişmiş Teknikler**\nTemperatur ayarı, çıktı formatı belirtme ve sistem prompt optimizasyonu.\n\n**Gelir Modelleri**\nPrompt satış platformları, danışmanlık ve eğitim içeriği oluşturma." },
      "ai-affiliate-pazarlama": { title: "AI Affiliate Pazarlama Stratejileri", readTime: "8 dk", category: "Pazarlama", level: "Başlangıç", difficulty: "Kolay", color: "#FCD34D", body: "AI araçlarını kullanarak affiliate pazarlama gelirinizi artırmanın rehberi.\n\n**Niş Seçimi**\nAI araçları, SaaS ürünleri ve dijital hizmetler en kârlı niş alanlarıdır.\n\n**İçerik Stratejisi**\nİnceleme yazıları, karşılaştırma içerikleri ve kullanım rehberleri.\n\n**Trafik Kaynakları**\nSEO, sosyal medya ve e-posta pazarlaması ile trafik çekme." },
      "ai-danismanlik-kurumsal": { title: "AI Danışmanlığı: Kurumsal Satış Süreci", readTime: "20 dk", category: "Danışmanlık", level: "İleri", difficulty: "Zor", color: "#FCD34D", body: "Kurumsal şirketlere AI danışmanlığı sunmanın kapsamlı rehberi.\n\n**Yetkinlik Geliştirme**\nAI teknolojileri, iş süreçleri ve değişim yönetimi konularında uzmanlaşın.\n\n**Paketleme**\nDeğerlendirme, strateji ve uygulama paketleri oluşturun.\n\n**Müşteri Edinme**\nLinkedIn, konferanslar ve referans ağı ile kurumsal müşteri edinme." },
      "midjourney-sanat-satisi": { title: "Midjourney ile Dijital Sanat Satışı", readTime: "14 dk", category: "Sanat", level: "Orta", difficulty: "Orta", color: "#FCD34D", body: "Midjourney ile oluşturduğunuz dijital sanat eserlerini satmanın rehberi.\n\n**Stil Geliştirme**\nTutarlı ve tanınabilir bir sanat stili oluşturun.\n\n**Satış Kanalları**\nEtsy, Redbubble, Society6 ve kendi e-ticaret siteniz.\n\n**Lisanslama**\nStok görsel platformlarında lisans satışı." },
    },
    hikaye: {
      "elif-y-icerik": { name: "Elif Y.", income: "$8,200/ay", method: "AI İçerik Üretimi", story: "ChatGPT ve Midjourney kullanarak kurumsal müşterilere içerik hizmeti sunuyorum. 6 ayda gelirim 3 katına çıktı.", avatar: "EY", months: "6 ay", color: "#FCD34D" },
      "can-k-saas": { name: "Can K.", income: "$15,000/ay", method: "AI SaaS", story: "AI destekli müşteri hizmetleri chatbot platformu geliştirdim. 3 ayda 200+ abone buldum.", avatar: "CK", months: "8 ay", color: "#FCD34D" },
      "zeynep-a-youtube": { name: "Zeynep A.", income: "$5,400/ay", method: "YouTube Otomasyonu", story: "AI ile günde 3 video üretiyorum. 4 ayda 50K aboneye ulaştım ve AdSense gelirim sürekli artıyor.", avatar: "ZA", months: "4 ay", color: "#FCD34D" },
      "mehmet-s-danismanlik": { name: "Mehmet S.", income: "$22,000/ay", method: "AI Danışmanlığı", story: "Enterprise şirketlere AI entegrasyonu danışmanlığı veriyorum. Her proje $5K-$15K arasında.", avatar: "MS", months: "12 ay", color: "#FCD34D" },
    },
  },

  // ── Dijital Dünya ──
  "dijital-dunya": {
    teknoloji: {
      "apple-vision-pro-2": { title: "Apple Vision Pro 2: Yeni Uzay Hesaplama Deneyimi", category: "Mobil", time: "3 saat önce", color: "#A78BFA", body: "Apple Vision Pro 2, uzay bilgisayar deneyimini yeni bir seviyeye taşıyor. Daha hafif tasarım, geliştirilmiş passthrough kalitesi ve uzun pil ömrü ile öne çıkıyor." },
      "linux-kernel-612": { title: "Linux Kernel 6.12: %15 Performans Artışı", category: "Yazılım", time: "5 saat önce", color: "#A78BFA", body: "Linux Kernel 6.12, önceki versiyona göre %15 performans artışı ve yeni dosya sistemi desteği sunuyor." },
      "aws-reinvent-2026": { title: "AWS Re:Invent 2026: Yeni Bulut Hizmetleri", category: "Bulut", time: "8 saat önce", color: "#A78BFA", body: "AWS Re:Invent 2026'da tanıtılan yeni AI/ML hizmetleri ve serverless özellikleri." },
      "webgpu-adoption": { title: "WebGPU Tarayıcı Desteği Yaygınlaşıyor", category: "Web", time: "12 saat önce", color: "#A78BFA", body: "WebGPU, WebGL'in yerini alarak GPU tabanlı rendering ve hesaplama imkanı sunuyor." },
      "turkey-startup-funding": { title: "Türkiye Girişim: $2.1M Yatırım Turu", category: "Girişim", time: "1 gün önce", color: "#A78BFA", body: "Türk teknoloji girişimi $2.1M Seri A yatırım turunu tamamladı." },
      "rust-adoption": { title: "Rust Kurumsal Benimseme %40 Arttı", category: "Yazılım", time: "2 gün önce", color: "#A78BFA", body: "Rust programlama dili, kurumsal ortamlarda %40 benimsenme artışı gösterdi." },
      "samsung-galaxy-ai": { title: "Samsung Galaxy AI: On-Device LLM Entegrasyonu", category: "Mobil", time: "2 gün önce", color: "#A78BFA", body: "Samsung, Galaxy AI ile cihazda çalışan büyük dil modelleri sunuyor." },
      "cloudflare-workers-ai": { title: "Cloudflare Workers AI: Edge Computing Devrimi", category: "Bulut", time: "3 gün önce", color: "#A78BFA", body: "Cloudflare Workers AI, edge computing ile düşük gecikmeli AI inference sunuyor." },
    },
    yazilim: {
      "react-20": { name: "React 20", category: "Frontend", status: "Stable", adoption: "Yüksek", trend: "+12%", trendUp: true, users: "8.5M", color: "#A78BFA", body: "React 20, Server Components ve Concurrent Mode ile modern web geliştirmeyi yeniden tanımlıyor." },
      "nextjs-15": { name: "Next.js 15", category: "Framework", status: "Stable", adoption: "Yüksek", trend: "+18%", trendUp: true, users: "3.2M", color: "#A78BFA", body: "Next.js 15, App Router ve Server Actions ile full-stack React geliştirmeyi kolaylaştırıyor." },
      "typescript-55": { name: "TypeScript 5.5", category: "Dil", status: "Stable", adoption: "Yüksek", trend: "+8%", trendUp: true, users: "5.1M", color: "#A78BFA", body: "TypeScript 5.5, daha iyi tip çıkarımı ve performans iyileştirmeleri sunuyor." },
      "tailwind-4": { name: "Tailwind CSS 4", category: "CSS", status: "Stable", adoption: "Yüksek", trend: "+25%", trendUp: true, users: "4.8M", color: "#A78BFA", body: "Tailwind CSS 4, yeni motor ve daha hızlı derleme ile modern CSS geliştirme deneyimi sunuyor." },
      "rust": { name: "Rust", category: "Dil", status: "Stable", adoption: "Artıyor", trend: "+40%", trendUp: true, users: "2.1M", color: "#A78BFA", body: "Rust, bellek güvenliği ve performans ile sistem programlamasında yükseliyor." },
      "bun-runtime": { name: "Bun Runtime", category: "Runtime", status: "Beta", adoption: "Artıyor", trend: "+35%", trendUp: true, users: "800K", color: "#A78BFA", body: "Bun, Node.js'e alternatif hızlı JavaScript runtime ve paket yöneticisi." },
      "deno-2": { name: "Deno 2.0", category: "Runtime", status: "Stable", adoption: "Orta", trend: "+15%", trendUp: true, users: "650K", color: "#A78BFA", body: "Deno 2.0, TypeScript natif desteği ve güvenlik odaklı mimarisi ile öne çıkıyor." },
      "hono": { name: "Hono", category: "Framework", status: "Stable", adoption: "Artıyor", trend: "+60%", trendUp: true, users: "420K", color: "#A78BFA", body: "Hono, ultra hızlı web framework olup edge ve serverless ortamları için tasarlanmıştır." },
    },
    bulut: {
      "aws": { name: "AWS", marketShare: "32%", services: 200, regions: 33, highlight: "AI/ML (SageMaker, Bedrock)", color: "#FB923C", body: "Amazon Web Services, bulut pazarının lideri olarak AI/ML hizmetlerinde öne çıkıyor." },
      "azure": { name: "Azure", marketShare: "23%", services: 150, regions: 60, highlight: "Enterprise (Copilot, OpenAI)", color: "#38BDF8", body: "Microsoft Azure, enterprise AI ve OpenAI entegrasyonu ile büyüüyor." },
      "gcp": { name: "GCP", marketShare: "11%", services: 120, regions: 35, highlight: "Data/AI (Vertex AI, BigQuery)", color: "#A78BFA", body: "Google Cloud Platform, veri ve AI hizmetlerinde güçlü konumda." },
      "cloudflare": { name: "Cloudflare", marketShare: "Yükselen", services: 80, regions: 310, highlight: "Edge (Workers AI, R2)", color: "#FCD34D", body: "Cloudflare, edge computing ve Workers AI ile yükselen bulut sağlayıcısı." },
      "vercel": { name: "Vercel", marketShare: "Yükselen", services: 40, regions: 18, highlight: "Frontend (Edge Functions)", color: "#FFFFFF", body: "Vercel, frontend developer deneyimi ve edge functions ile öne çıkıyor." },
      "supabase": { name: "Supabase", marketShare: "Yükselen", services: 25, regions: 8, highlight: "BaaS (PostgreSQL, Auth)", color: "#00E5A0", body: "Supabase, açık kaynak Firebase alternatifi olarak BaaS pazarında büyüyor." },
    },
    girisim: {
      "finai": { name: "FinAI", sector: "Fintech", funding: "$12M (Seri A)", stage: "Erken", founders: "İstanbul", val: "$45M", color: "#A78BFA", body: "FinAI, yapay zeka destekli finansal analiz ve yatırım danışmanlığı sunan fintech girişimidir." },
      "devmind": { name: "DevMind", sector: "DevTools", funding: "$5M (Seed)", stage: "Seed", founders: "Ankara", val: "$15M", color: "#A78BFA", body: "DevMind, AI destekli yazılım geliştirme araçları sunan devtools girişimidir." },
      "healthnet": { name: "HealthNet", sector: "Healthtech", funding: "$25M (Seri B)", stage: "Büyüme", founders: "İzmir", val: "$80M", color: "#A78BFA", body: "HealthNet, yapay zeka ile sağlık verisi analizi ve teşhis desteği sunan healthtech girişimidir." },
      "edutech-pro": { name: "EduTech Pro", sector: "EdTech", funding: "$8M (Seri A)", stage: "Erken", founders: "İstanbul", val: "$30M", color: "#A78BFA", body: "EduTech Pro, AI destekli kişiselleştirilmiş eğitim platformu sunan edtech girişimidir." },
      "logiflow": { name: "LogiFlow", sector: "Logistics", funding: "$35M (Seri B)", stage: "Büyüme", founders: "İstanbul", val: "$120M", color: "#A78BFA", body: "LogiFlow, AI destekli lojistik optimizasyonu sunan supply chain girişimidir." },
      "cybershield": { name: "CyberShield", sector: "Cybersecurity", funding: "$18M (Seri A)", stage: "Erken", founders: "Ankara", val: "$55M", color: "#A78BFA", body: "CyberShield, AI destekli tehdit algılama ve yanıt platformu sunan cybersecurity girişimidir." },
    },
    web: {
      "webgpu": { trend: "WebGPU", impact: "Yüksek", status: "Yaygınlaşıyor", desc: "WebGL'in yerini alıyor. GPU tabanlı rendering ve hesaplama.", body: "WebGPU, WebGL'in yerini alarak tarayıcıda GPU tabanlı rendering ve paralel hesaplama imkanı sunmaktadır." },
      "edge-computing": { trend: "Edge Computing", impact: "Yüksek", status: "Büyüyor", desc: "Cloudflare Workers, Vercel Edge Functions ile düşük gecikme.", body: "Edge computing, kullanıcıya yakın sunucularda kod çalıştırarak düşük gecikmeli deneyim sunmaktadır." },
      "server-components": { trend: "Server Components", impact: "Orta", status: "Benimseniyor", desc: "React Server Components ile sunucu tarafı rendering.", body: "React Server Components, sunucu tarafında bileşenleri render ederek daha hızlı sayfa yükleme sağlamaktadır." },
      "wasm": { trend: "WASM", impact: "Orta", status: "Yaygınlaşıyor", desc: "WebAssembly ile tarayıcıda native hızda kod çalıştırma.", body: "WebAssembly, tarayıcıda C/C++/Rust gibi dillerde yazılmış kodları native hızda çalıştırmaktadır." },
      "ai-powered-web": { trend: "AI-Powered Web", impact: "Çok Yüksek", status: "Patlama", desc: "AI entegre web uygulamaları ve otomatik içerik üretimi.", body: "AI entegre web uygulamaları, otomatik içerik üretimi ve kişiselleştirilmiş deneyim sunmaktadır." },
      "pwa": { trend: "Progressive Web Apps", impact: "Orta", status: "Stabil", desc: "Native app deneyimi sunan web uygulamaları.", body: "Progressive Web Apps, web teknolojileri ile native uygulama deneyimi sunmaktadır." },
    },
  },

  // ── Siber Güvenlik ──
  "siber-guvenlik": {
    cve: {
      "CVE-2026-12847": { id: "CVE-2026-12847", title: "Linux Kernel Yetki Yükseltme", severity: "KRİTİK", cvss: 9.8, publishDate: "2026-07-24", affected: "Linux Kernel 6.x", description: "Yerel yetki yükseltme zafiyeti, root erişimi sağlıyor.", body: "Linux Kernel 6.x sürümlerinde tespit edilen yerel yetki yükseltme zafiyeti, saldırganların normal kullanıcı ayrıcalıklarından root erişimine kadar yükseltmesini sağlamaktadır. Acil yama uygulanması önerilmektedir.", color: "#EF4444" },
      "CVE-2026-12901": { id: "CVE-2026-12901", title: "Apache HTTP Sunucu RCE", severity: "KRİTİK", cvss: 9.6, publishDate: "2026-07-24", affected: "Apache 2.4.x", description: "Uzaktan kod çalıştırma, sunucu ele geçirme riski.", body: "Apache HTTP Server 2.4.x sürümlerinde tespit edilen uzaktan kod çalıştırma zafiyeti, sunucu ele geçirme riski oluşturmaktadır.", color: "#EF4444" },
      "CVE-2026-13055": { id: "CVE-2026-13055", title: "OpenSSL Bellek Bozulması", severity: "YÜKSEK", cvss: 8.4, publishDate: "2026-07-24", affected: "OpenSSL 3.x", description: "Bellek bozulması zafiyeti, hizmet kesintisine yol açabilir.", body: "OpenSSL 3.x sürümlerinde tespit edilen bellek bozulması zafiyeti, hizmet kesintisine ve potansiyel veri sızıntısına yol açabilir.", color: "#F97316" },
      "CVE-2026-12783": { id: "CVE-2026-12783", title: "PostgreSQL Injection Açığı", severity: "YÜKSEK", cvss: 8.1, publishDate: "2026-07-24", affected: "PostgreSQL 15-16", description: "SQL injection vektörü, veritabanı sızıntısı riski.", body: "PostgreSQL 15 ve 16 sürümlerinde tespit edilen SQL injection zafiyeti, veritabanı sızıntısı riski oluşturmaktadır.", color: "#F97316" },
      "CVE-2026-13120": { id: "CVE-2026-13120", title: "Kubernetes API Kimlik Atlama", severity: "KRİTİK", cvss: 9.4, publishDate: "2026-07-25", affected: "Kubernetes 1.28-1.30", description: "Kimlik doğrulama atlaması, küme ele geçirme riski.", body: "Kubernetes API'de tespit edilen kimlik doğrulama atlaması zafiyeti, küme ele geçirme riski oluşturmaktadır.", color: "#EF4444" },
      "CVE-2026-12650": { id: "CVE-2026-12650", title: "Node.js Prototip Kirlenmesi", severity: "YÜKSEK", cvss: 7.8, publishDate: "2026-07-24", affected: "Node.js 20.x", description: "Prototip kirlenmesi, RCE'ye kadar giden zincir.", body: "Node.js 20.x sürümlerinde tespit edilen prototip kirlenmesi zafiyeti, RCE'ye kadar giden saldırı zinciri oluşturmaktadır.", color: "#F97316" },
      "CVE-2026-13200": { id: "CVE-2026-13200", title: "Nginx Dizin Atlama", severity: "ORTA", cvss: 6.5, publishDate: "2026-07-25", affected: "Nginx 1.24-1.26", description: "Dizin atlaması, hassas dosya erişimi riski.", body: "Nginx 1.24-1.26 sürümlerinde tespit edilen dizin atlama zafiyeti, hassas dosya erişimi riski oluşturmaktadır.", color: "#FCD34D" },
      "CVE-2026-12950": { id: "CVE-2026-12950", title: "Docker Container Kaçış", severity: "KRİTİK", cvss: 9.2, publishDate: "2026-07-25", affected: "Docker 24.x-25.x", description: "Container kaçış zafiyeti, host sisteme erişim.", body: "Docker 24.x-25.x sürümlerinde tespit edilen container kaçış zafiyeti, host sisteme erişim riski oluşturmaktadır.", color: "#EF4444" },
      "CVE-2026-13080": { id: "CVE-2026-13080", title: "Redis Uzaktan Kod Çalıştırma", severity: "YÜKSEK", cvss: 8.7, publishDate: "2026-07-25", affected: "Redis 7.x", description: "Uzaktan kod çalıştırma, sunucu ele geçirme.", body: "Redis 7.x sürümlerinde tespit edilen uzaktan kod çalıştırma zafiyeti, sunucu ele geçirme riski oluşturmaktadır.", color: "#F97316" },
      "CVE-2026-12500": { id: "CVE-2026-12500", title: "Android Kernel DoS", severity: "ORTA", cvss: 5.5, publishDate: "2026-07-24", affected: "Android 14-15", description: "Hizmet kesintisi, cihaz kilitleme riski.", body: "Android 14 ve 15 sürümlerinde tespit edilen hizmet kesintisi zafiyeti, cihaz kilitleme riski oluşturmaktadır.", color: "#FCD34D" },
      "CVE-2026-13150": { id: "CVE-2026-13150", title: "WordPress Eklenti XSS", severity: "ORTA", cvss: 6.1, publishDate: "2026-07-25", affected: "WordPress 6.x Eklentiler", description: "Stored XSS, kullanıcı oturum çalma riski.", body: "WordPress 6.x eklentilerinde tespit edilen stored XSS zafiyeti, kullanıcı oturum çalma riski oluşturmaktadır.", color: "#FCD34D" },
      "CVE-2026-12400": { id: "CVE-2026-12400", title: "Windows Defender Atlama", severity: "YÜKSEK", cvss: 7.5, publishDate: "2026-07-24", affected: "Windows 11 23H2", description: "Antivirüs atlama, zararlı yazılım dağıtımı.", body: "Windows 11 23H2 sürümünde tespit edilen Defender atlama zafiyeti, zararlı yazılım dağıtımı riski oluşturmaktadır.", color: "#F97316" },
    },
    haber: {
      "azure-guvenlik-acigi": { title: "Microsoft Azure'da Kritik Güvenlik Açığı Kapatıldı", category: "Bulut", source: "TechCrunch", timeAgo: "12 dk önce", summary: "Azure Active Directory'deki zafiyet, yetkisiz erişim riski oluşturuyordu. Microsoft acil yama yayınladı.", color: "#38BDF8", body: "Microsoft Azure Active Directory'de tespit edilen kritik güvenlik açığı, yetkisiz erişim riski oluşturuyordu. Microsoft, acil olarak güvenlik yaması yayınladı ve tüm müşterilere güncelleme uygulamasını tavsiye etti." },
      "nato-apt-saldirilar": { title: "NATO Ülkelerine Yönelik APT Saldırıları Artıyor", category: "Devlet Destekli", source: "Reuters", timeAgo: "45 dk önce", summary: "Siber güvenlik firmaları, NATO ülkelerine yönelik organize saldırı kampanyası tespit etti.", color: "#F97316", body: "Birçok siber güvenlik firması, NATO ülkelerine yönelik organize bir APT (Gelişmiş Kalıcı Tehdit) saldırı kampanyası tespit etti. Saldırılar özellikle savunma ve enerji sektörlerini hedef almaktadır." },
      "ai-phishing-artis": { title: "Yapay Zeka Destekli Phishing Saldırıları %340 Arttı", category: "AI Tehditleri", source: "Dark Reading", timeAgo: "1 saat önce", summary: "LLM tabanlı phishing kampanyaları geleneksel yöntemlere göre çok daha başarılı oluyor.", color: "#A78BFA", body: "LLM tabanlı phishing kampanyaları, geleneksel yöntemlere göre çok daha başarılı olmaktadır. AI tarafından oluşturulan e-postalar, dilbilgisi hataları içermediği için tespit edilmesi daha zordur." },
      "chrome-zero-day": { title: "Google Chrome 0-Day Zafiyeti Hızlıca İstismar Ediliyor", category: "Tarayıcı", source: "The Hacker News", timeAgo: "2 saat önce", summary: "Chrome'daki bellek bozulma zafiyeti, aktif olarak istismar ediliyor. Acil güncelleme öneriliyor.", color: "#FB7185", body: "Google Chrome tarayıcısında tespit edilen bellek bozulma zafiyeti, aktif olarak istismar edilmektedir. Kullanıcıların acilen tarayıcılarını güncellemesi önerilmektedir." },
      "eu-dga-ceza": { title: "Avrupa DGA Kapsamında Teknoloji Devlerine Rekor Ceza", category: "Regülasyon", source: "EU Observer", timeAgo: "3 saat önce", summary: "AB, siber güvenlik ihlali nedeniyle büyük teknoloji şirketlerine 2 milyar Euro ceza kesti.", color: "#FCD34D", body: "Avrupa Birliği, Dijital İşlemler Yasası (DGA) kapsamında siber güvenlik ihlali nedeniyle büyük teknoloji şirketlerine 2 milyar Euro ceza kesti. Bu, tarihteki en büyük siber güvenlik cezasıdır." },
      "ransomware-saglik": { title: "Ransomware Grupları Sağlık Sektörünü Hedefliyor", category: "Ransomware", source: "BleepingComputer", timeAgo: "4 saat önce", summary: "LockBit benzeri gruplar hastane sistemlerini şifreleyerek fidye talep ediyor.", color: "#EF4444", body: "LockBit benzeri ransomware grupları, sağlık sektörünü hedef alarak hastane sistemlerini şifrelemekte ve fidye talep etmektedir. Sağlık sektörü, kritik altyapısı nedeniyle yüksek risk altındadır." },
      "supply-chain-framework": { title: "Supply Chain Saldırıları için Yeni Framework Yayınlandı", category: "Araştırma", source: "NIST", timeAgo: "5 saat önce", summary: "NIST, yazılım tedarik zinciri güvenliği için yeni değerlendirme çerçevesi yayınladı.", color: "#00E5A0", body: "NIST, yazılım tedarik zinciri güvenliği için yeni bir değerlendirme çerçevesi yayınladı. Bu çerçeve, yazılım bileşenlerinin güvenliğini sistematik olarak değerlendirmeyi hedeflemektedir." },
      "iot-zafiyet": { title: "IoT Cihazlarında Toplu Zafiyet Tespit Edildi", category: "IoT", source: "ZDNet", timeAgo: "6 saat önce", summary: "50 milyondan fazla IoT cihazında aynı güvenlik açığı bulundu. Firmware güncellemesi gerekli.", color: "#38BDF8", body: "50 milyondan fazla IoT cihazında aynı güvenlik açığı tespit edildi. Kullanıcıların cihazlarını acilen güncellemesi önerilmektedir." },
    },
    analiz: {
      "ransomware-rapor-2026-q2": { title: "2026 Q2 Ransomware Raporu", type: "Yıllık Rapor", date: "Temmuz 2026", summary: "Ransomware saldırıları %35 artış gösterdi. Sağlık ve finans sektörleri en çok hedef alındı.", severity: "Kritik", color: "#EF4444", body: "2026'nın ikinci çeyreğinde ransomware saldırıları %35 artış gösterdi. Sağlık ve finans sektörleri en çok hedef alınan alanlar oldu. LockBit 4.0 ve ALPHV varyantları en aktif gruplar olarak kaydedildi." },
      "cloud-guvenlik": { title: "Cloud Güvenlik Durumu Değerlendirmesi", type: "Analiz", date: "Haziran 2026", summary: "Bulut yapılandırma hataları hâlâ en yaygın saldırı vektörü. %68 oranında bulut ihlali yapılandırma hatasından kaynaklanıyor.", severity: "Yüksek", color: "#F97316", body: "Bulut yapılandırma hataları, %68 oranında bulut ihlalinden kaynaklanmaktadır. Yanlış IAM yapılandırmaları, açık S3 bucket'ları ve eksik şifreleme en yaygın sorunlardır." },
      "zero-trust-mimarisi": { title: "Zero-Trust Mimarisi: Uygulama Rehberi", type: "Rehber", date: "Temmuz 2026", summary: "Sıfır güven mimarisinin kurumsal ortamlara uygulanması adım adım açıklanıyor.", severity: "Bilgi", color: "#00E5A0", body: "Zero-Trust mimarisi, hiçbir kullanıcı veya cihazın varsayılan olarak güvenilir olmadığını varsayar. Her erişim isteği doğrulanmalı ve en az ayrıcalık ilkesine göre sınırlandırılmalıdır." },
      "ai-saldiri-vektorleri": { title: "AI Tabanlı Saldırı Vektörleri", type: "Araştırma", date: "Haziran 2026", summary: "Deepfake ses klonlama ve AI phishing saldırılarının tespit yöntemleri.", severity: "Yüksek", color: "#F97316", body: "Deepfake ses klonlama ve AI tabanlı phishing saldırıları, geleneksel güvenlik araçları ile tespit edilememektedir. AI destekli güvenlik çözümleri bu tehditlere karşı etkili olmaktadır." },
      "supply-chain-trendleri": { title: "Supply Chain Saldırıları: 2026 Trendleri", type: "Analiz", date: "Temmuz 2026", summary: "npm ve PyPI ekosistemlerindeki supply chain saldırıları %200 arttı.", severity: "Kritik", color: "#EF4444", body: "npm ve PyPI ekosistemlerindeki supply chain saldırıları %200 arttı. Typosquatting, dependency confusion ve kötü amaçlı paket yüklemeleri en yaygın saldırı vektörleridir." },
    },
    arac: {
      "nmap": { name: "Nmap", category: "Ağ Taraması", type: "Açık Kaynak", desc: "Ağ keşfi ve güvenlik denetimi aracı", stars: "24K", color: "#F97316", body: "Nmap, açık kaynaklı ağ keşfi ve güvenlik denetimi aracıdır. Port taraması, OS tespiti ve servis versiyonu belirleme özellikleri ile öne çıkar." },
      "wireshark": { name: "Wireshark", category: "Paket Analizi", type: "Açık Kaynak", desc: "Ağ trafiği yakalama ve analiz", stars: "18K", color: "#F97316", body: "Wireshark, ağ trafiği yakalama ve analiz aracıdır. Protokol analizi, filtreleme ve görselleştirme özellikleri ile network troubleshooting için vazgeçilmezdir." },
      "metasploit": { name: "Metasploit", category: "Sızma Testi", type: "Açık Kaynak", desc: "Güvenlik açıkları exploitation framework", stars: "32K", color: "#F97316", body: "Metasploit, güvenlik açıklarını istismar etmek için kullanılan açık kaynaklı framework'tür. Penetration testing ve güvenlik değerlendirmesi için kullanılır." },
      "burp-suite": { name: "Burp Suite", category: "Web Güvenlik", type: "Ücretsiz/Pro", desc: "Web uygulama güvenlik test aracı", stars: "N/A", color: "#F97316", body: "Burp Suite, web uygulama güvenlik test aracıdır. Proxy, scanner, intruder ve repeater modülleri ile web uygulamalarındaki güvenlik açıklarını tespit eder." },
      "crowdstrike": { name: "CrowdStrike", category: "Endpoint", type: "Enterprise", desc: "AI destekli tehdit algılama ve yanıt", stars: "N/A", color: "#F97316", body: "CrowdStrike, AI destekli endpoint güvenlik platformudur. Gerçek zamanlı tehdit algılama, otomatik yanıt ve tehdit araştırma özellikleri sunar." },
      "cloudflare-waf": { name: "Cloudflare WAF", category: "WAF", type: "Freemium", desc: "Web uygulama güvenlik duvarı ve DDoS koruma", stars: "N/A", color: "#F97316", body: "Cloudflare WAF, web uygulama güvenlik duvarı ve DDoS koruma hizmetidir. OWASP Top 10 açıklarına karşı koruma ve özel kurallar oluşturma imkanı sunar." },
      "owasp-zap": { name: "OWASP ZAP", category: "Web Güvenlik", type: "Açık Kaynak", desc: "Web uygulaması zafiyet tarayıcı", stars: "11K", color: "#F97316", body: "OWASP ZAP, açık kaynaklı web uygulama zafiyet tarayıcısıdır. Aktif ve pasif tarama ile güvenlik açıklarını otomatik olarak tespit eder." },
      "snort": { name: "Snort", category: "IDS/IPS", type: "Açık Kaynak", desc: "Gerçek zamanlı ağ trafiği analizi ve saldırı tespiti", stars: "7K", color: "#F97316", body: "Snort, gerçek zamanlı ağ trafiği analizi ve saldırı tespiti yapan açık kaynaklı IDS/IPS sistemidir." },
    },
  },
};

// ─── Category Color Map ──────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  "yapay-zeka": "#06B6D4",
  "ai-araclari": "#38BDF8",
  "ai-ile-kazanc": "#FCD34D",
  "dijital-dunya": "#A78BFA",
  "siber-guvenlik": "#F97316",
};

const categoryLabels: Record<string, string> = {
  "yapay-zeka": "Yapay Zekâ",
  "ai-araclari": "AI Araçları",
  "ai-ile-kazanc": "AI ile Kazanç",
  "dijital-dunya": "Dijital Dünya",
  "siber-guvenlik": "Siber Güvenlik",
};

// ─── Detail Page Component ───────────────────────────────────────────────────
function ContentDetailPage() {
  const { category, type, slug } = useParams();
  const catColor = categoryColors[category || ""] || "#00E5A0";
  const catLabel = categoryLabels[category || ""] || category;
  const catData = contentRegistry[category || ""]?.[type || ""]?.[slug || ""];
  const { theme } = useTheme();

  // For types that don't have registry entries (tehdit, uyari, video, basari), generate fallback
  const isRegistryOptional = ["tehdit", "uyari", "video", "basari"].includes(type || "");
  const safeCatData = catData || {
    title: slug?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "İçerik",
    slug: slug,
    description: "Bu içerik, AIPUSULA platformunda daha detaylı olarak sunulacaktır.",
    body: "Bu içerik, AIPUSULA platformunda daha detaylı olarak sunulacaktır. Lütfen ilgili kategori sayfasından daha fazla bilgi edinebilirsiniz.",
  };

  if (!catData && !isRegistryOptional) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="text-6xl mb-4" style={{ color: catColor }}>?</div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>İçerik Bulunamadı</h1>
          <p className="text-sm mb-6" style={{ color: "#64748B" }}>Aradığınız içerik mevcut değil veya kaldırılmış olabilir.</p>
          <Link href="/" className="px-6 py-3 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-80"
            style={{ background: catColor }}>{catLabel} Sayfasına Dön</Link>
        </div>
      </AppShell>
    );
  }

  const backPath = `/${category}`;

  // ── Render: News / Article / Rehber / Guide type ──
  if (type === "haber" || type === "rehber" || type === "teknoloji" || type === "web" || type === "girisim" || type === "guide") {
    if (type === "guide") {
      const rehberData = contentRegistry[category || ""]?.rehber?.[slug || ""];
      if (!rehberData) {
        return (
          <AppShell>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <div className="text-6xl mb-4" style={{ color: catColor }}>?</div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>İçerik Bulunamadı</h1>
              <p className="text-sm mb-6" style={{ color: "#64748B" }}>Aradığınız içerik mevcut değil veya kaldırılmış olabilir.</p>
              <Link href={backPath} className="px-6 py-3 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-80" style={{ background: catColor }}>{catLabel} Sayfasına Dön</Link>
            </div>
          </AppShell>
        );
      }
      const d = rehberData;
      return (
        <AppShell>
          <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span style={{ color: catColor }}>Rehber</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="mono text-xs px-2.5 py-0.5 rounded-full" style={{ background: `${catColor}10`, color: catColor }}>{d.category}</span>
              <span className="text-xs" style={{ color: "#64748B" }}>{d.level}</span>
              <span className="flex items-center gap-1 text-xs" style={{ color: "#64748B" }}><Clock className="w-3 h-3" />{d.readTime}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white mb-6 break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{d.title}</h1>
            <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />
            <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
              {d.body.split("\n\n").map((para: string, i: number) => (
                <p key={i} className="mb-4">
                  {para.split("\n").map((line: string, j: number) => (
                    line.startsWith("**")
                      ? <strong key={j} className="text-white">{line.replace(/\*\*/g, "")}</strong>
                      : <span key={j}>{line}</span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </AppShell>
      );
    }
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>{catData.title}</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            {catData.tag && (
              <span className="inline-block text-[10px] mono px-2.5 py-0.5 rounded-full mb-3"
                style={{ background: `${catData.tagColor || catColor}20`, color: catData.tagColor || catColor }}>
                {catData.tag}
              </span>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3 break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {catData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: "#64748B" }}>
              {catData.time && <span>{catData.time}</span>}
              {catData.readTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{catData.readTime} okuma</span>}
              {catData.date && <span>{catData.date}</span>}
              {catData.source && <span>{catData.source}</span>}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          {/* Body */}
          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            {(catData.body as string).split("\n\n").map((para: string, i: number) => (
              <p key={i} className="mb-4">
                {para.split("\n").map((line: string, j: number) => (
                  line.startsWith("**")
                    ? <strong key={j} className="text-white">{line.replace(/\*\*/g, "")}</strong>
                    : <span key={j}>{line}</span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: CVE type ──
  if (type === "cve") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>CVE Detayları</span>
          </div>

          {/* Severity Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="mono text-xs px-3 py-1 rounded-full font-bold"
              style={{
                background: catData.severity === "KRİTİK" ? "rgba(239,68,68,0.15)" : catData.severity === "YÜKSEK" ? "rgba(249,115,22,0.15)" : "rgba(252,211,77,0.15)",
                color: catData.severity === "KRİTİK" ? "#EF4444" : catData.severity === "YÜKSEK" ? "#F97316" : "#FCD34D",
              }}>
              {catData.severity}
            </span>
            <span className="text-xs" style={{ color: "#475569" }}>CVSS {catData.cvss}</span>
          </div>

          {/* Title */}
          <h1 className="text-lg sm:text-xl font-bold text-white mb-2 break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {catData.id}: {catData.title}
          </h1>

          <div className="flex items-center gap-4 text-xs mb-6" style={{ color: "#64748B" }}>
            <span className="flex items-center gap-1"><Bug className="w-3 h-3" />{catData.affected}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{catData.publishDate}</span>
          </div>

          {/* Divider */}
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          {/* Description */}
          <div className="text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>
            <p className="mb-4">{catData.description}</p>
            <p>{catData.body}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: Security Tool (siber-guvenlik) — must come BEFORE generic arac ──
  if (type === "arac" && category === "siber-guvenlik") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Güvenlik Aracı</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-white mb-2 break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs" style={{ color: "#64748B" }}>
            <span className="px-2.5 py-0.5 rounded-full" style={{ background: `${catColor}10`, color: catColor }}>{catData.category}</span>
            <span>{catData.type}</span>
            {catData.stars !== "N/A" && <span>GitHub {catData.stars} stars</span>}
          </div>
          <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>{catData.desc}</p>
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />
          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>{catData.body}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: AI Tool type (ai-araclari) ──
  if (type === "arac") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>{catData.name}</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-lg sm:text-2xl font-bold text-white break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: `${catData.color}10`, color: catData.color }}>{catData.category}</span>
            </div>
            <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>{catData.desc}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "#64748B" }}>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{catData.users} kullanıcı</span>
              <span className="flex items-center gap-1"><Award className="w-3 h-3" />{catData.rating}/5.0</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3" />{catData.pricing}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {catData.features.map((f: string, i: number) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: `${catColor}08`, color: catColor, border: `1px solid ${catColor}20` }}>
                {f}
              </span>
            ))}
          </div>

          {/* Body */}
          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            {catData.body.split("\n\n").map((para: string, i: number) => (
              <p key={i} className="mb-4">
                {para.split("\n").map((line: string, j: number) => (
                  line.startsWith("**")
                    ? <strong key={j} className="text-white">{line.replace(/\*\*/g, "")}</strong>
                    : <span key={j}>{line}</span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: Model type ──
  if (type === "model") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Model Detayları</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg sm:text-2xl font-bold text-white break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.name}</h1>
            <span className="text-xl font-bold" style={{ color: catData.color, fontFamily: "Space Grotesk, sans-serif" }}>{catData.strength}</span>
          </div>
          <p className="text-sm mb-2" style={{ color: "#64748B" }}>{catData.company} · {catData.params} · {catData.type}</p>
          <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>{catData.desc}</p>

          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>{catData.body}</p>
          </div>

          <div className="mt-6 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full" style={{ width: catData.strength, background: `linear-gradient(90deg, ${catData.color}, ${catData.color}80)` }} />
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: Trend type ──
  if (type === "trend") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Trend Analizi</span>
          </div>

          <h1 className="text-lg sm:text-2xl font-bold text-white mb-2 break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.title}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="mono text-sm font-bold" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{catData.growth}</span>
            <span className="text-xs" style={{ color: "#64748B" }}>{catData.desc}</span>
          </div>

          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>{catData.body}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: Event type ──
  if (type === "etkinlik") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Etkinlik</span>
          </div>

          <h1 className="text-lg sm:text-2xl font-bold text-white mb-3 break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-2 text-xs" style={{ color: "#64748B" }}>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{catData.date}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{catData.location}</span>
            <span className="mono text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${catColor}10`, color: catColor }}>{catData.type}</span>
          </div>
          <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>{catData.desc}</p>

          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>{catData.body}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: Research type ──
  if (type === "arastirma") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Araştırma</span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-white mb-2 break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs" style={{ color: "#64748B" }}>
            <span>{catData.authors}</span>
            <span>{catData.journal}</span>
            <span>{catData.date}</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" style={{ color: catColor }} />{catData.citations.toLocaleString()} atıf</span>
          </div>

          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>{catData.body}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: Success Story ──
  if (type === "hikaye") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Başarı Hikayesi</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ background: `${catData.color}15`, color: catData.color, border: `2px solid ${catData.color}30` }}>
              {catData.avatar}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.name}</h1>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#64748B" }}>
                <span>{catData.method}</span>
                <span>·</span>
                <span>{catData.months}</span>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <div className="text-lg sm:text-xl font-bold" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{catData.income}</div>
              <span className="text-[10px]" style={{ color: "#475569" }}>Aylık Gelir</span>
            </div>
          </div>

          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          <blockquote className="text-sm leading-relaxed italic pl-4 border-l-2" style={{ color: "#CBD5E1", borderColor: catColor }}>
            {catData.story}
          </blockquote>
        </div>
      </AppShell>
    );
  }

  // ── Render: Security Analysis/Report ──
  if (type === "analiz") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Güvenlik Analizi</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="mono text-xs px-2.5 py-0.5 rounded-full"
              style={{
                background: catData.severity === "Kritik" ? "rgba(239,68,68,0.15)" : catData.severity === "Yüksek" ? "rgba(249,115,22,0.15)" : "rgba(252,211,77,0.15)",
                color: catData.severity === "Kritik" ? "#EF4444" : catData.severity === "Yüksek" ? "#F97316" : catData.color,
              }}>
              {catData.severity}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: `${catColor}10`, color: catColor }}>{catData.type}</span>
            <span className="text-xs" style={{ color: "#475569" }}>{catData.date}</span>
          </div>

          <h1 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.title}</h1>
          <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>{catData.summary}</p>

          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>{catData.body}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: Software / Cloud / Startup (DigitalWorld subtypes) ──
  if (type === "yazilim" || type === "bulut" || type === "girisim") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Detaylar</span>
          </div>

          <h1 className="text-lg sm:text-2xl font-bold text-white mb-2 break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs" style={{ color: "#64748B" }}>
            {catData.category && <span className="px-2.5 py-0.5 rounded-full" style={{ background: `${catColor}10`, color: catColor }}>{catData.category}</span>}
            {catData.sector && <span className="px-2.5 py-0.5 rounded-full" style={{ background: `${catColor}10`, color: catColor }}>{catData.sector}</span>}
            {catData.status && <span>{catData.status}</span>}
            {catData.adoption && <span>Benimseme: {catData.adoption}</span>}
            {catData.trend && <span className="flex items-center gap-0.5"><TrendingUp className="w-3 h-3" style={{ color: catData.trendUp ? "#00E5A0" : "#EF4444" }} />{catData.trend}</span>}
            {catData.users && <span>{catData.users} kullanıcı</span>}
            {catData.funding && <span>Fon: {catData.funding}</span>}
            {catData.stage && <span>Aşama: {catData.stage}</span>}
            {catData.val && <span>Değerleme: {catData.val}</span>}
            {catData.marketShare && <span>Pazar: {catData.marketShare}</span>}
            {catData.highlight && <span>{catData.highlight}</span>}
          </div>

          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>{catData.body}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: video type ──
  if (type === "video") {
    const videoIndex = parseInt(slug || "0");
    const videoTitles = [
      "ChatGPT ile Günde 1 Saat Çalışarak $100 Kazanma",
      "AI ile YouTube Kanalınızı 10x Büyütün",
      "Freelancerlar İçin AI Araçları Rehberi 2026",
      "AI ile SaaS Kurma: Sıfırdan $10K/ay",
      "Prompt Engineering: Tam Kurs",
    ];
    const videoData = { title: videoTitles[videoIndex] || "YouTube AI Videosu", category: "YouTube", color: catColor };
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Video</span>
          </div>
          <div className="glass rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" style={{ color: catColor }} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{videoData.title}</h1>
            </div>
            <div className="flex items-center gap-3 text-xs" style={{ color: "#64748B" }}>
              <span className="px-2.5 py-0.5 rounded-full" style={{ background: `${catColor}10`, color: catColor }}>{videoData.category}</span>
              <span>AIPUSULA</span>
            </div>
          </div>
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />
          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>Bu video, AI araçlarını kullanarak gelir elde etmenin pratik yollarını anlatmaktadır. ChatGPT, Midjourney, ElevenLabs ve diğer AI araçlarının günlük iş akışına entegrasyonu, prompt mühendisliği teknikleri ve otomasyon stratejileri ele alınmaktadır.</p>
            <p className="mt-4">AIPUSULA platformunda AI ile kazanç alanında daha fazla rehber, başarı hikayesi ve teknik kaynak bulabilirsiniz.</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: basari type ──
  if (type === "basari") {
    const hikayeData = contentRegistry[category || ""]?.hikaye?.[slug || ""];
    if (!hikayeData) {
      return (
        <AppShell>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="text-6xl mb-4" style={{ color: catColor }}>?</div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>İçerik Bulunamadı</h1>
            <p className="text-sm mb-6" style={{ color: "#64748B" }}>Aradığınız içerik mevcut değil veya kaldırılmış olabilir.</p>
            <Link href={backPath} className="px-6 py-3 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-80" style={{ background: catColor }}>{catLabel} Sayfasına Dön</Link>
          </div>
        </AppShell>
      );
    }
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Başarı Hikayesi</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: `${hikayeData.color}15`, color: hikayeData.color, border: `2px solid ${hikayeData.color}30` }}>{hikayeData.avatar}</div>
            <div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{hikayeData.name}</h1>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#64748B" }}><span>{hikayeData.method}</span><span>·</span><span>{hikayeData.months}</span></div>
            </div>
            <div className="text-right sm:text-right">
              <div className="text-lg sm:text-xl font-bold" style={{ color: "#00E5A0", fontFamily: "Space Grotesk, sans-serif" }}>{hikayeData.income}</div>
              <span className="text-[10px]" style={{ color: "#475569" }}>Aylık Gelir</span>
            </div>
          </div>
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />
          <blockquote className="text-sm leading-relaxed italic pl-4 border-l-2" style={{ color: "#CBD5E1", borderColor: catColor }}>{hikayeData.story}</blockquote>
        </div>
      </AppShell>
    );
  }

  // ── Render: tehdit type ──
  if (type === "tehdit") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Tehdit Profili</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="mono text-xs px-3 py-1 rounded-full font-bold" style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>YÜKSEK</span>
            <span className="text-xs" style={{ color: "#64748B" }}>Siber Tehdit</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{safeCatData.title}</h1>
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />
          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>{safeCatData.description || safeCatData.body || "Bu tehdit profili, AIPUSULA siber güvenlik ekibi tarafından takip edilmektedir. Daha fazla bilgi için güvenlik haberleri bölümünü ziyaret edebilirsiniz."}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Render: uyari type ──
  if (type === "uyari") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span style={{ color: catColor }}>Güvenlik Uyarısı</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="mono text-xs px-3 py-1 rounded-full font-bold" style={{ background: "rgba(249,115,22,0.15)", color: "#F97316" }}>YÜKSEK</span>
            <span className="text-xs" style={{ color: "#64748B" }}>{catData.time || "Son güncelleme"}</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{safeCatData.title}</h1>
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />
          <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
            <p>{safeCatData.description || safeCatData.body || "Bu güvenlik uyarısı, AIPUSULA siber güvenlik ekibi tarafından takip edilmektedir. Sistemlerinizi güncel tutmanız ve güvenlik önlemlerini artırmanız önerilmektedir."}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Default fallback ──
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 text-xs" style={{ color: "#475569" }}>
          <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link href={backPath} className="hover:text-white transition-colors">{catLabel}</Link>
        </div>

        <h1 className="text-lg sm:text-2xl font-bold text-white mb-2 break-words" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{catData.title || catData.name}</h1>
        {catData.summary && <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>{catData.summary}</p>}

        <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}30, transparent)` }} />

        <div className="text-sm leading-[1.8]" style={{ color: "#CBD5E1" }}>
          <p>{catData.body}</p>
        </div>
      </div>
    </AppShell>
  );
}

export default function ContentDetail() {
  const { category, type, slug } = useParams();
  const registryType = type === "guide" ? "rehber" : type || "";
  const categoryData = contentRegistry[category || ""]?.[registryType]?.[slug || ""];
  const title = categoryData?.title || categoryData?.name || slug?.replace(/-/g, " ") || "İçerik";
  const description = categoryData?.summary || categoryData?.desc || categoryData?.body || "AIPUSULA içerik detayları.";
  const canonical = `https://aipusula.net/detay/${category || ""}/${type || ""}/${slug || ""}`;
  const categoryLabel = categoryLabels[category || ""] || category || "İçerik";

  return (
    <>
      <SEO
        title={`${title} | AIPUSULA`}
        description={description.slice(0, 160)}
        canonical={canonical}
        type="article"
        breadcrumbs={[
          { name: "Ana Sayfa", url: "https://aipusula.net/" },
          { name: categoryLabel, url: `https://aipusula.net/${category || ""}` },
          { name: title, url: canonical },
        ]}
        article={{ author: "AIPUSULA" }}
      />
      <ContentDetailPage />
    </>
  );
}
