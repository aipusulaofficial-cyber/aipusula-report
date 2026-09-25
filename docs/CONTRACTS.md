# Contracts

## HTTP
- `GET /health/live` returns `{ "status": "ok" }`.
- `GET /health/ready` returns `{ "status": "ready" }`.
- API responses expose `x-request-id` and `x-correlation-id`.
- JSON API requests are limited to 1 MB.
- Unsupported API content types return HTTP 415.
- Unknown API routes return structured HTTP 404 responses.

## Change safety
Changes to public response fields or health semantics require tests and migration notes.
