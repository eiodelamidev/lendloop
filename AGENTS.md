# LendLoop: project rules

Product: neighborhood tool-lending board. Company name LendLoop. Tagline: "Borrow what you need. Lend what you don't."
Stack: Next.js (App Router) + TypeScript + Tailwind, Clerk (auth), Convex (data + backend), n8n (automation, Docker or n8n Cloud).

## Roles and rules (enforced in Convex functions, never only in the UI)

- Roles: admin, user. Stored in the Convex users table. Never trust a role sent by the client.
- user: create/edit/delete only own listings; act only on loans involving own tools or own borrowing.
- admin: remove any listing, view all loans, mark a lender as Trusted Lender.
- Public (no auth): read-only list of available tools showing name and category ONLY. No ids, no owner info.

## Domain

- Tool: name, category, condition, short description, owner. Soft delete (deletedAt).
- Loan states: pending -> approved | declined | cancelled(by borrower); approved -> returned. Others are terminal.
- Dates are YYYY-MM-DD strings, inclusive ranges, compared in UTC. Overdue = approved, not returned, endDate < today.
- Availability is derived in queries (no approved loan covering today), never stored.

## Automation contract

- Convex -> n8n: signed webhook on loan created/status change, via an outbox table with retries and backoff.
- n8n -> Convex: signed HTTP endpoints (overdue loans, reminder write-back, workflow-error report).
- Two different secrets, one per direction. HMAC-SHA256 over "timestamp.body" with 5-minute skew tolerance, constant-time compare.
- Write-backs are idempotent via a unique idempotencyKey. Retried calls must not create duplicates.
- Data minimization: each payload contains only fields the receiver needs.
- No secrets in code, git, or exported workflow JSON.

## Conventions

- Convex: argument and return validators on every function, indexes (no table scans), ConvexError({code, message}) for expected errors, shared helpers in convex/lib/.
- Strict TypeScript, no `any`. Small modules. Comments explain WHY.
- Check current official docs for Clerk, Convex and Next.js setup because APIs change.

## Working agreement

- Before coding, list the files you will create or change. After coding, run typecheck, lint and tests, then summarize what you did and any deviation from this file.
- Never commit secrets. Keep .env.example current.
