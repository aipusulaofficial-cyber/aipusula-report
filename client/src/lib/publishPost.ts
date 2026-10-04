export type PublishDraft = {
  title: string;
  category: string;
  summary: string;
  content: string;
};

export function validateDraft(draft: PublishDraft): PublishDraft {
  const cleaned = {
    title: draft.title.trim(),
    category: draft.category.trim(),
    summary: draft.summary.trim(),
    content: draft.content.trim(),
  };
  if (!cleaned.title || !cleaned.summary || !cleaned.content) {
    throw new Error("Başlık, özet ve içerik zorunludur.");
  }
  if (!["yapay-zeka", "ai-araclari", "ai-ile-kazanc", "dijital-dunya", "siber-guvenlik"].includes(cleaned.category)) {
    throw new Error("Geçersiz kategori.");
  }
  return cleaned;
}

export async function publishPost(
  draft: PublishDraft,
  fetcher: typeof fetch = fetch,
): Promise<{ success: boolean; message: string }> {
  const payload = validateDraft(draft);
  let response: Response;
  try {
    response = await fetcher("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Ağ bağlantısı hatası. Tekrar deneyin.");
  }
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error("Sunucudan geçersiz yanıt alındı.");
  }
  if (typeof data !== "object" || data === null || !("success" in data)) {
    throw new Error("Sunucudan geçersiz yanıt alındı.");
  }
  const result = data as { success?: boolean; message?: unknown };
  if (!response.ok || result.success !== true) {
    throw new Error(typeof result.message === "string" && result.message.trim()
      ? result.message : "İçerik yayınlanamadı.");
  }
  return {
    success: true,
    message: typeof result.message === "string" ? result.message : "İçerik alındı.",
  };
}
