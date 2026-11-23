import type { Metadata } from "next";
import Link from "next/link";
import { Show, SignInButton } from "@clerk/nextjs";
import DashboardView from "@/components/dashboard/DashboardView";
import { buttonStyles } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <main id="main-content" className="mx-auto max-w-5xl px-5 py-10">
      <header className="mb-8">
        <p className="text-small font-semibold uppercase tracking-[0.18em] text-primary">
          Your space
        </p>
        <h1 className="mt-2 text-heading font-semibold">Dashboard</h1>
        <p className="mt-1 text-small text-muted-foreground">
          Manage your tools, loans and profile.
        </p>
      </header>

      <Show when="signed-out">
        <div className="rounded-lg border border-border bg-surface p-8 text-center shadow-card">
          <h2 className="text-subheading font-semibold">Sign in to continue</h2>
          <p className="mt-1 text-small text-muted-foreground">
            Your dashboard is private to you.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <SignInButton mode="modal">
              <button type="button" className={buttonStyles()}>
                Sign in
              </button>
            </SignInButton>
            <Link href="/" className={buttonStyles({ variant: "secondary" })}>
              Back home
            </Link>
          </div>
        </div>
      </Show>

      <Show when="signed-in">
        <DashboardView />
      </Show>
    </main>
  );
}
