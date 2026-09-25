import { describe, expect, it } from "vitest";
import { createApp } from "./index";

describe("report service contract", () => {
  it("creates an Express application", () => {
    const app = createApp();
    expect(typeof app).toBe("function");
  });
});
