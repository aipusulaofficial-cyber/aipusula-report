# AIPUSULA Report

A production reporting surface for turning AI engineering results and evidence into a reviewable report artifact.

## What this project does
The application serves a report-oriented web surface and an API for report content. The server handles JSON requests, correlation IDs, latency measurement, compression, static assets and the React application fallback.

## Runtime architecture
```text
Report data -> API boundary -> report application -> production static surface -> reviewable evidence
```

The server exposes `/api/posts` and application routing. Request IDs and latency are captured for diagnosis, while errors are handled by the server error boundary.

## Engineering contracts
- Report inputs are validated at the application boundary.
- Generated content must not contain credentials or secrets.
- Versioned inputs should produce reproducible output.
- Production behavior is tested separately from development-only behavior.

## Delivery
CI, production tests and security/SBOM checks are executable gates. The repository contains the reporting application and production server rather than a documentation-only mock.

## Evidence
- Server: [server/index.ts](server/index.ts)
- Engineering contract: [docs/PRINCIPAL-ENGINEERING.md](docs/PRINCIPAL-ENGINEERING.md)
- CI: [.github/workflows/ci.yml](.github/workflows/ci.yml)

**Engineering chain:** Code → Contract → Test → Security → Runtime → Observability → Deployment → Evidence.