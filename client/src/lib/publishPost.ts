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
