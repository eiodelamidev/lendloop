"use client";

import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Button from "@/components/ui/Button";

export default function SiteHeader() {
  const me = useQuery(api.users.me);

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center gap-4 px-5">
        <Link href="/" className="text-body font-bold tracking-tight text-foreground">
          LendLoop
        </Link>

        <Show when="signed-in">
          <nav aria-label="Main" className="ml-4 flex items-center gap-4 text-small">
            <Link className="text-muted-foreground hover:text-foreground" href="/dashboard">
              Dashboard
            </Link>
            {me?.role === "admin" ? (
              <Link className="text-muted-foreground hover:text-foreground" href="/admin">
                Admin
              </Link>
            ) : null}
          </nav>
        </Show>

        <div className="ml-auto flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button size="sm">Sign in</Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
