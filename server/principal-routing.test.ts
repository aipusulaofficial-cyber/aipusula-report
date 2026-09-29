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
});
