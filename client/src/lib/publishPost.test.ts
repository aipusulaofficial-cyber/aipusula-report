import { describe, expect, it, vi } from "vitest";
import { publishPost, validateDraft, type PublishDraft } from "./publishPost";

const valid: PublishDraft = {
  title: " Rapor ", category: "yapay-zeka", summary: " Özet ", content: " İçerik ",
};

describe("frontend publishing contract", () => {
  it("trims fields and rejects invalid input", () => {
    expect(validateDraft(valid)).toEqual({
      title: "Rapor", category: "yapay-zeka", summary: "Özet", content: "İçerik",
    });
    expect(() => validateDraft({ ...valid, title: "" })).toThrow("zorunludur");
    expect(() => validateDraft({ ...valid, category: "invalid" })).toThrow("kategori");
  });

  it("posts sanitized data on the success path", async () => {
    const request = vi.fn().mockResolvedValue({
      ok: true, json: async () => ({ success: true, message: "ok" }),
    });
    await expect(publishPost(valid, request)).resolves.toEqual({ success: true, message: "ok" });
    expect(JSON.parse(request.mock.calls[0][1].body)).toEqual(validateDraft(valid));
  });
});
