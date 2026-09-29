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
  it("rejects HTTP failure and a denied result", async () => {
    await expect(publishPost(valid, vi.fn().mockResolvedValue({
      ok: false, json: async () => ({ success: true, message: "HTTP failed" }),
    }))).rejects.toThrow("HTTP failed");
    await expect(publishPost(valid, vi.fn().mockResolvedValue({
      ok: true, json: async () => ({ success: false, message: "Denied" }),
    }))).rejects.toThrow("Denied");
  });

  it("rejects transport failures, malformed JSON and unknown responses", async () => {
    await expect(publishPost(valid, vi.fn().mockRejectedValue(new Error("network"))))
      .rejects.toThrow("Ağ bağlantısı");
    await expect(publishPost(valid, vi.fn().mockResolvedValue({
      ok: true, json: async () => { throw new Error("malformed"); },
    }))).rejects.toThrow("geçersiz yanıt");
    await expect(publishPost(valid, vi.fn().mockResolvedValue({
      ok: true, json: async () => ({ other: true }),
    }))).rejects.toThrow("geçersiz yanıt");
  });

});
