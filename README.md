# LendLoop

Borrow what you need. Lend what you don't.

A neighborhood tool-lending board built as a take-home for a Full-Stack Developer
role at Fluence International, Inc.

Stack: Next.js (App Router) + TypeScript + Tailwind, Clerk for auth, Convex for
data and server-side authorization, n8n for automation.

## Status

This repository is being built in phases. Phase 0B (Clerk + Convex wiring) and
Phase 1 (schema, users, RBAC helpers) are implemented locally; live verification
still needs Convex and Clerk credentials. The build follows a 10-phase plan;
the detailed working notes, copyable prompts and reference links live in
`.docs/`, which is intentionally gitignored so it stays local to this machine.

Repo-facing documentation is written in later phases:

- `docs/SECURITY.md` — threat model (Phase 7)
- `docs/PRODUCTION.md` — what would change in production (Phase 8)
- `n8n/README.md` — local n8n setup (Phase 5)
- `n8n/TESTING.md` — manual automation tests (Phase 6)

## Design rules

- Roles (`admin`, `user`) live in the Convex `users` table and are checked inside
  Convex functions; the client never supplies a role.
- Public reads expose only tool name and category.
- Automation payloads are minimized, signed in both directions, and idempotent.
- Secrets are set as environment variables; no real values are committed.

## Local development

```powershell
pnpm.cmd install
copy .env.example .env.local
# fill in .env.local, then:
pnpm.cmd run dev:convex
pnpm.cmd run dev
```

Open http://localhost:3000. On this machine, bare `npm` hangs and `npm.cmd
install` stalled while resolving the tree; use `pnpm.cmd` instead. Convex-side
secrets belong on the deployment via `npx convex env set`, never in `.env.local`.
See `.docs/08-local-setup-runbook.md` for accounts, keys and the n8n tunnel setup.
The files in `convex/_generated` are local stubs until `pnpm.cmd run dev:convex`
runs against a real deployment; rerun that command and commit the regenerated
files when credentials are available.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the App Router dev server (webpack) |
| `npm run dev:convex` | Run Convex dev and regenerate `convex/_generated` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |

n8n workflows and deployment configuration are added in later phases.
