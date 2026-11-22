/**
 * Placeholder home page.
 *
 * Phase 3 replaces this with the public read-only tool grid (tools.listPublic)
 * and the Clerk sign-in control. Keeping it static for now proves the
 * App Router + Tailwind scaffold renders before any backend is wired.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">LendLoop</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">
        Borrow what you need. Lend what you don&apos;t.
      </p>
      <p className="text-sm text-neutral-500">
        Scaffold ready. Authentication, data and automation land in Phases 0–4.
      </p>
    </main>
  );
}
