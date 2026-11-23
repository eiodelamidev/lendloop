import Link from "next/link";
import { Show, SignInButton } from "@clerk/nextjs";
import PublicToolsGrid from "@/components/public/PublicToolsGrid";
import { buttonStyles } from "@/components/ui/Button";

export default function Home() {
  return (
    <main id="main-content" className="relative overflow-hidden">
      <div className="hero-wash" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
        <section aria-labelledby="hero-heading" className="max-w-3xl">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-primary">
            Neighbourhood tool lending
          </p>
          <h1 id="hero-heading" className="mt-4 text-display font-bold tracking-tight text-foreground">
            Borrow what you need.
            <span className="block text-primary">Lend what you don&apos;t.</span>
          </h1>
          <p className="mt-6 max-w-xl text-subheading text-muted-foreground">
            A simple board for sharing tools with people nearby. List what you own,
            request what you need, and keep every loan in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button type="button" className={buttonStyles()}>
                  Sign in to lend or borrow
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard" className={buttonStyles()}>
                Go to dashboard
              </Link>
            </Show>
            <Link href="#available-tools" className={buttonStyles({ variant: "secondary" })}>
              Browse tools
            </Link>
          </div>
        </section>

        <PublicToolsGrid items={[]} />
      </div>
    </main>
  );
}
