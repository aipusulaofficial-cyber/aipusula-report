import { describe, expect, it } from "vitest";
import { validateDraft } from "./publishPost";

describe("client validation", () => {
  it("rejects an empty title", () => {
    expect(() => validateDraft({title:"",category:"yapay-zeka",summary:"ok",content:"ok"})).toThrow();
  });
});
