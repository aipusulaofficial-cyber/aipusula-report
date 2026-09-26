# AIPUSULA Report

Production-oriented reporting surface for AI engineering evidence.

## Principal engineering contract

- **Evidence integrity:** report inputs, versions, and generated artifacts are traceable.
- **Determinism:** identical versioned inputs produce reproducible report output.
- **Validation:** malformed report data is rejected at the boundary.
- **Security:** no secrets or credentials are embedded in generated reports.
- **Operability:** build and production checks run through GitHub Actions before release.
- **Auditability:** material changes are represented by reviewable commits and CI evidence.

## Quality gates

1. Type-check and build.
2. Validate report contracts and representative rendering paths.
3. Run security/dependency/SBOM checks.
4. Verify the production artifact rather than relying on development-only behavior.

## Engineering standard

This repository follows the portfolio-wide Principal engineering standard: explicit contracts, bounded work, deterministic tests, least privilege, observable failures, and documented operational trade-offs.
