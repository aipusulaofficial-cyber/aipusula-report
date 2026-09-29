import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createServer, type Server } from "node:http";
import { once } from "node:events";
import { createApp } from "./index";

let server: Server;
let base: string;

beforeAll(async () => {
  server = createServer(createApp());
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("No test listener");
  base = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  if (server) await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
});

describe("HTTP API routing", () => {
  it("returns JSON 404 for unknown API GET routes instead of SPA content", async () => {
    const response = await fetch(`${base}/api/unknown`);
    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect((await response.json()).success).toBe(false);
  });

  it("echoes a valid JSON payload and propagates request identifiers", async () => {
    const response = await fetch(`${base}/api/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-request-id": "test-request-id",
        "x-correlation-id": "test-correlation-id",
      },
      body: JSON.stringify({ title: "evidence" }),
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("x-request-id")).toBe("test-request-id");
    expect(response.headers.get("x-correlation-id")).toBe("test-correlation-id");
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toEqual({ title: "evidence" });
  });

  it("rejects unsupported content types with HTTP 415", async () => {
    const response = await fetch(`${base}/api/posts`, {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "text instead of JSON",
    });
    expect(response.status).toBe(415);
    expect((await response.json()).success).toBe(false);
  });

  it("returns JSON 404 for unknown API POST routes", async () => {
    const response = await fetch(`${base}/api/missing`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    });
    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
  });

  it("generates request and correlation identifiers when absent", async () => {
    const response = await fetch(`${base}/api/missing`);
    expect(response.status).toBe(404);
    const requestId = response.headers.get("x-request-id");
    expect(requestId).toMatch(/^[0-9a-f-]{36}$/i);
    expect(response.headers.get("x-correlation-id")).toBe(requestId);
  });

});
