import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata: Metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <main id="main-content" className="mx-auto max-w-5xl px-5 py-10">
      <header className="mb-8">
        <p className="text-small font-semibold uppercase tracking-[0.18em] text-primary">
          Operations
        </p>
        <h1 className="mt-2 text-heading font-semibold">Admin</h1>
        <p className="mt-1 text-small text-muted-foreground">
          Delivery failures, automation errors and trusted lenders.
        </p>
      </header>

      <AdminPanel />
    </main>
  );
}
