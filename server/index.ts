import compression from "compression";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable gzip/brotli compression for all responses
  app.use(compression({
    threshold: 0, // Compress all responses regardless of size
    filter: (_req, res) => {
      if (res.getHeader("x-no-compression")) return false;
      return compression.filter(_req, res);
    },
  }));

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Cache immutable assets (JS, CSS) for 1 year with fingerprinted filenames
  app.use(
    "/assets",
    express.static(path.join(staticPath, "assets"), {
      immutable: true,
      maxAge: "365d",
    })
  );

  // Cache manus internal assets for 1 hour
  app.use(
    "/__manus__",
    express.static(path.join(staticPath, "__manus__"), {
      maxAge: "1h",
    })
  );

  // Default static serving for other files
  app.use(express.static(staticPath, { maxAge: "1d" }));

  // Handle client-side routing - serve index.html for all routes
  // Add cache headers for HTML responses
  app.get("*", (_req, res) => {
    res.set("Cache-Control", "public, max-age=0, must-revalidate");
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
