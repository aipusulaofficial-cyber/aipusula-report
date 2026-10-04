import compression from "compression";
import express from "express";
import { createServer } from "http";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const allowedCategories = new Set([
  "yapay-zeka",
  "ai-araclari",
  "ai-ile-kazanc",
  "dijital-dunya",
  "siber-guvenlik",
]);

export function validatePostPayload(value: unknown): { title: string; category: string; summary: string; content: string } {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("invalid post payload");
  }
  const raw = value as Record<string, unknown>;
  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  const category = typeof raw.category === "string" ? raw.category.trim() : "";
  const summary = typeof raw.summary === "string" ? raw.summary.trim() : "";
  const content = typeof raw.content === "string" ? raw.content.trim() : "";
  if (!title || !summary || !content || !allowedCategories.has(category)) {
    throw new Error("invalid post payload");
  }
  if (title.length > 200 || summary.length > 2_000 || content.length > 200_000) {
    throw new Error("post payload fields exceed limits");
  }
  return { title, category, summary, content };
}

function safeRequestId(value: string | undefined, fallback: string): string {
  return value && /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$/.test(value)
    ? value
    : fallback;
}

export function normalizeHttpError(err: unknown): { status: number; message: string } {
  const incomingStatus =
    typeof err === "object" && err !== null && "status" in err ? err.status : undefined;
  if (incomingStatus === 400) return { status: 400, message: "Invalid request body" };
  if (incomingStatus === 413) return { status: 413, message: "Request body too large" };
  return { status: 500, message: "Internal server error" };
}

export function createApp() {
  const app = express();

  // JSON desteği
  app.use(express.json({ limit: "1mb" }));

  app.use((req, res, next) => {
    const requestId = safeRequestId(req.header("x-request-id"), crypto.randomUUID());
    const correlationId = safeRequestId(req.header("x-correlation-id"), requestId);
    const started = process.hrtime.bigint();
    res.setHeader("x-request-id", requestId);
    res.setHeader("x-correlation-id", correlationId);
    res.on("finish", () => {
      const latencyMs = Number(process.hrtime.bigint() - started) / 1_000_000;
      console.info(JSON.stringify({
        event: "http_request",
        request_id: requestId,
        method: req.method,
        path: req.path,
        status: res.statusCode,
        latency_ms: Number(latencyMs.toFixed(3)),
      }));
    });
    next();
  });

  // Gzip/Brotli sıkıştırma
  app.use(
    compression({
      threshold: 0,
      filter: (_req, res) => {
        if (res.getHeader("x-no-compression")) return false;
        return compression.filter(_req, res);
      },
    })
  );

  // Statik dosya yolu
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Asset cache
  app.use(
    "/assets",
    express.static(path.join(staticPath, "assets"), {
      immutable: true,
      maxAge: "365d",
    })
  );

  // Manus cache
  app.use(
    "/__manus__",
    express.static(path.join(staticPath, "__manus__"), {
      maxAge: "1h",
    })
  );

  // Diğer statik dosyalar
  app.use(express.static(staticPath, { maxAge: "1d" }));

  app.post("/api/posts", (req, res) => {
    if (!req.is("application/json")) {
      res.status(415).json({ success: false, message: "application/json required" });
      return;
    }

    let payload;
    try {
      payload = validatePostPayload(req.body);
    } catch (error) {
      res.status(422).json({ success: false, message: error instanceof Error ? error.message : "invalid post payload" });
      return;
    }

    res.json({
      success: true,
      message: "API çalışıyor",
      data: payload,
    });
  });

  app.use("/api", (_req, res) => {
    res.status(404).json({ success: false, message: "API route not found" });
  });

  // React Router
  app.get("*", (_req, res) => {
    res.set("Cache-Control", "public, max-age=0, must-revalidate");
    res.sendFile(path.join(staticPath, "index.html"));
  });

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const error = normalizeHttpError(err);
    if (error.status === 500) console.error("Unhandled request error", err);
    res.status(error.status).json({ success: false, message: error.message });
  });

  return app;
}

export function startServer() {
  const app = createApp();
  const server = createServer(app);
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be 1-65535");
  server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
  return server;
}

if (process.env.NODE_ENV !== "test") startServer();
