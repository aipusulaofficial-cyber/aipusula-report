/**
 * Cloudflare Pages build script.
 * Runs ONLY the Vite frontend build — no server bundling, no Worker entry point.
 * This is called by Cloudflare Pages during deployment.
 *
 * Usage: node build-pages.mjs
 */
import { execSync } from "node:child_process";

console.log("[build-pages] Building for Cloudflare Pages (static only)...");

// Ensure install completed
execSync("pnpm install --frozen-lockfile", { stdio: "inherit" });

// Run Vite build only — outputs to dist/public/
execSync("DEPLOY_TARGET=cloudflare NODE_ENV=production npx vite build", {
  stdio: "inherit",
});

console.log("[build-pages] Build complete. Output in dist/public/");
