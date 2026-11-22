# LendLoop

Borrow what you need. Lend what you don't.

A neighborhood tool-lending board built as a take-home for a Full-Stack Developer
role at Fluence International, Inc.

Stack: Next.js (App Router) + TypeScript + Tailwind, Clerk for auth, Convex for
data and server-side authorization, n8n for automation.

## Status

This repository is at the scaffold stage. The build follows a 10-phase plan;
the detailed working notes, copyable prompts and reference links live in
`.docs/`, which is intentionally gitignored so it stays local to this machine.

Repo-facing documentation is written in later phases:

- `docs/SECURITY.md` — threat model (Phase 7)
- `docs/PRODUCTION.md` — what would change in production (Phase 8)
- `n8n/README.md` — local n8n setup (Phase 5)
- `n8n/TESTING.md` — manual automation tests (Phase 6)

`AGENTS.md` at the repo root holds the rules that every agent session reads
before changing code.

## Local development

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000. On this machine, use `npm.cmd` rather than bare
`npm` (the PowerShell shim hangs). See `.docs/08-local-setup-runbook.md` for
accounts, keys, Convex, Clerk and the n8n tunnel setup before Phases 0B onward.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the App Router dev server (webpack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Tests, n8n workflows and deployment configuration are added in Phases 1–9.
