"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Tabs from "@/components/ui/Tabs";
import ToolForm from "@/components/dashboard/ToolForm";
import LoanRequestDialog from "@/components/dashboard/LoanRequestDialog";

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-surface-muted p-6 text-center">
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-small text-muted-foreground">{detail}</p>
    </div>
  );
}

export default function DashboardView() {
  const [requestOpen, setRequestOpen] = useState(false);
  const me = useQuery(api.users.me);
  const subject = useQuery(api.identity.subject);

  const toolsTab = (
    <div className="grid gap-6">
      <Card className="p-5">
        <h2 className="text-subheading font-semibold">Your tools</h2>
        <div className="mt-4">
          <EmptyState
            title="No tools yet"
            detail="Add a tool when the tool functions are available."
          />
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-subheading font-semibold">Add a tool</h2>
        <p className="mt-1 text-small text-muted-foreground">
          This form previews the fields we will send to Convex.
        </p>
        <div className="mt-5">
          <ToolForm />
        </div>
      </Card>
    </div>
  );

  const loansTab = (
    <div className="grid gap-6">
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-subheading font-semibold">Your loans</h2>
            <p className="mt-1 text-small text-muted-foreground">
              Requests and active loans will appear here.
            </p>
          </div>
          <Button onClick={() => setRequestOpen(true)}>Request a tool</Button>
        </div>
        <div className="mt-5">
          <EmptyState
            title="Nothing to show"
            detail="Borrowing and lending activity will be listed here."
          />
        </div>
      </Card>
      <LoanRequestDialog open={requestOpen} onClose={() => setRequestOpen(false)} />
    </div>
  );

  const profileTab = (
    <Card className="p-5">
      <h2 className="text-subheading font-semibold">Profile</h2>
      {me === undefined ? (
        <p className="mt-4 text-small text-muted-foreground">Loading your profile…</p>
      ) : (
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-small text-muted-foreground">Name</dt>
            <dd className="font-medium">{me?.name ?? "Not set"}</dd>
          </div>
          <div>
            <dt className="text-small text-muted-foreground">Email</dt>
            <dd className="font-medium">{me?.email ?? "Not set"}</dd>
          </div>
          <div>
            <dt className="text-small text-muted-foreground">Role</dt>
            <dd className="mt-1">
              <Badge tone={me?.role === "admin" ? "accent" : "neutral"}>
                {me?.role ?? "Unknown"}
              </Badge>
            </dd>
          </div>
          <div>
            <dt className="text-small text-muted-foreground">Trusted lender</dt>
            <dd className="font-medium">{me?.trustedLender ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="text-small text-muted-foreground">Convex connection</dt>
            <dd className="font-medium">
              {subject === undefined ? "Checking…" : subject ? "Connected" : "Signed out"}
            </dd>
          </div>
        </dl>
      )}
    </Card>
  );

  return (
    <Tabs
      label="Dashboard sections"
      items={[
        { id: "tools", label: "Tools", content: toolsTab },
        { id: "loans", label: "Loans", content: loansTab },
        { id: "profile", label: "Profile", content: profileTab },
      ]}
    />
  );
}
