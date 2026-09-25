# Principal Engineering Contract

## Required controls
- API boundaries have explicit input and error semantics.
- Request correlation is observable.
- Health endpoints distinguish operational probes from browser routing.
- Work and request bodies are bounded.
- CI validates type safety, build output, and service contracts.
- Security and dependency provenance remain release gates.

## Review checklist
Architecture, API contracts, failure behavior, observability, tests, security, deployment behavior, and exact-commit CI results must be reviewed for material changes.
