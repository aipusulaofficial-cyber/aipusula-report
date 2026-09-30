import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Server } from "node:http";
import { createApp } from "./index";

describe("API request boundary", () => {
  let server: Server;
  let baseURL: string;

  beforeAll(async () => {
    server = await new Promise<Server>((resolve) => {
      const instance = createApp().listen(0, "127.0.0.1", () => resolve(instance));
    });
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("port unavailable");
    baseURL = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    if (server) await new Promise<void>((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()));
  });

  it("returns JSON 404 for unmatched API paths, not SPA HTML", async () => {
    const res = await fetch(`${baseURL}/api/does-not-exist`);
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect((await res.json()).success).toBe(false);
  });

  it("preserves correlation header and responds to valid JSON", async () => {
    const res = await fetch(`${baseURL}/api/posts`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-request-id": "case-1" },
      body: JSON.stringify({ title: "test" }),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("x-request-id")).toBe("case-1");
    expect((await res.json()).data.title).toBe("test");
  });
});
