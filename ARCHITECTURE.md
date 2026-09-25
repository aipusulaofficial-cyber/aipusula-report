# Architecture

## System boundary
The report application separates the browser delivery surface from the Express API boundary. The server owns static asset delivery, health signals, request correlation, and API error semantics.

## Reliability controls
- JSON request bodies are bounded to 1 MB.
- Request and correlation IDs are propagated on API responses.
- Liveness and readiness endpoints are explicit.
- API misses return structured JSON rather than falling through to the SPA route.
- Invalid server ports fail fast during startup.

## Production evolution
Persistent content, authentication/authorization, external telemetry, and durable job processing should be introduced behind explicit adapters rather than coupled to route handlers.
