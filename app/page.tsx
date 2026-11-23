"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "../convex/_generated/api";

/** Phase 0B smoke test: the subject below comes from Convex, not Clerk. */
function IdentityProof() {
  const subject = useQuery(api.identity.subject);

  return (
    <p className="text-sm text-neutral-500">
      {subject === undefined
        ? "Asking Convex who you are…"
        : `Convex sees token subject: ${subject}`}
    </p>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">LendLoop</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">
        Borrow what you need. Lend what you don&apos;t.
      </p>

      <Unauthenticated>
        <SignInButton mode="modal">
          <button className="rounded-md bg-neutral-900 px-4 py-2 text-white dark:bg-white dark:text-neutral-900">
            Sign in to lend or borrow
          </button>
        </SignInButton>
      </Unauthenticated>

      <Authenticated>
        <UserButton />
        <IdentityProof />
      </Authenticated>
    </main>
  );
}
