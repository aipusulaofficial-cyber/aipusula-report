import compression from "compression";
import express from "express";
import { createServer } from "http";
import path from "path";
import crypto from "crypto";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  // JSON desteği
  app.use(express.json({ limit: "1mb" }));

  app.use((req, res, next) => {
    const requestId = req.header("x-request-id") || crypto.randomUUID();
    const correlationId = req.header("x-correlation-id") || requestId;
    const started = process.hrtime.bigint();
    res.setHeader("x-request-id", requestId);
    res.setHeader("x-correlation-id", correlationId);
    res.on("finish", () => {
      const latencyMs = Number(process.hrtime.bigint() - started) / 1_000_000;
      res.setHeader("x-latency-ms", latencyMs.toFixed(3));
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

  // Request correlation and safe API boundary
  app.use((req, res, next) => {
    const requestId = req.header("x-request-id") || crypto.randomUUID();
    const correlationId = req.header("x-correlation-id") || requestId;
    res.setHeader("x-request-id", requestId);
    res.setHeader("x-correlation-id", correlationId);
    next();
  });

  app.post("/api/posts", (req, res) => {
    if (!req.is("application/json")) {
      res.status(415).json({ success: false, message: "application/json required" });
      return;
    }

    const payload = req.body;

    res.json({
      success: true,
      message: "API çalışıyor",
      data: req.body,
    });
  });

  // React Router
  app.get("*", (_req, res) => {
    res.set("Cache-Control", "public, max-age=0, must-revalidate");
    res.sendFile(path.join(staticPath, "index.html"));
  });

  app.use("/api", (_req, res) => {
    res.status(404).json({ success: false, message: "API route not found" });
  });

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled request error", err);
    res.status(500).json({ success: false, message: "Internal server error" });
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
