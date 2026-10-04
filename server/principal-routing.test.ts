import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createServer, type Server } from "node:http";
import { once } from "node:events";
import { createApp, normalizeHttpError, startServer } from "./index";

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
      body: JSON.stringify({ title: "Evidence", category: "yapay-zeka", summary: "Summary", content: "Content" }),
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("x-request-id")).toBe("test-request-id");
    expect(response.headers.get("x-correlation-id")).toBe("test-correlation-id");
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toEqual({ title: "Evidence", category: "yapay-zeka", summary: "Summary", content: "Content" });
  });

  it("rejects incomplete report payloads with HTTP 422", async () => {
    const response = await fetch(base + "/api/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Only title" }),
    });
    expect(response.status).toBe(422);
    expect((await response.json()).success).toBe(false);
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


  it("replaces oversized request identifiers instead of reflecting them", async () => {
    const supplied = "z".repeat(200);
    const response = await fetch(`${base}/api/missing`, {
      headers: { "x-request-id": supplied },
    });
    expect(response.status).toBe(404);
    expect(response.headers.get("x-request-id")).toMatch(/^[0-9a-f-]{36}$/i);
    expect(response.headers.get("x-request-id")).not.toBe(supplied);
  });

  it("returns HTTP 400 for invalid JSON syntax", async () => {
    const response = await fetch(`${base}/api/posts`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: '{"unclosed":',
    });
    expect(response.status).toBe(400);
    expect((await response.json()).message).toBe("Invalid request body");
  });

  it("returns HTTP 413 for oversized JSON input", async () => {
    const response = await fetch(`${base}/api/posts`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: "x".repeat(1024 * 1024 + 1) }),
    });
    expect(response.status).toBe(413);
    expect((await response.json()).message).toBe("Request body too large");
  });


  it("replaces invalid correlation IDs with the validated request ID", async () => {
    const response = await fetch(`${base}/api/missing`, {
      headers: {
        "x-request-id": "known-good-id",
        "x-correlation-id": "x".repeat(200),
      },
    });
    expect(response.status).toBe(404);
    expect(response.headers.get("x-request-id")).toBe("known-good-id");
    expect(response.headers.get("x-correlation-id")).toBe("known-good-id");
  });


  it.each(["0", "70000", "invalid"])(
    "refuses invalid server port %s before binding a listener",
    (configuredPort) => {
      const originalPort = process.env.PORT;
      try {
        process.env.PORT = configuredPort;
        expect(() => startServer()).toThrow("PORT must be 1-65535");
      } finally {
        if (originalPort === undefined) delete process.env.PORT;
        else process.env.PORT = originalPort;
      }
    }
  );

});


describe("HTTP error status normalization", () => {
  it("preserves HTTP 400 and 413 as client errors", () => {
    expect(normalizeHttpError({ status: 400 })).toEqual({ status: 400, message: "Invalid request body" });
    expect(normalizeHttpError({ status: 413 })).toEqual({ status: 413, message: "Request body too large" });
  });

  it("normalizes unexpected and malformed errors to safe 500 responses", () => {
    for (const err of [null, undefined, new Error("secret"), { status: 404 }, { status: "400" }]) {
      expect(normalizeHttpError(err)).toEqual({ status: 500, message: "Internal server error" });
    }
  });
});
