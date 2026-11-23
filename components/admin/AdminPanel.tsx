"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

function TablePlaceholder({ title, detail }: { title: string; detail: string }) {
  return (
    <Card className="p-5">
      <h2 className="text-subheading font-semibold">{title}</h2>
      <p className="mt-1 text-small text-muted-foreground">{detail}</p>
      <div className="mt-4 overflow-hidden rounded-md border border-border">
        <table className="w-full text-left text-small">
          <thead className="bg-surface-muted text-muted-foreground">
            <tr>
              <th scope="col" className="px-3 py-2 font-semibold">
                Status
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-4">
                <Badge>Waiting</Badge>
              </td>
              <td className="px-3 py-4 text-muted-foreground">No rows to display.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function AdminPanel() {
  const me = useQuery(api.users.me);

  if (me === undefined) {
    return <p className="text-small text-muted-foreground">Checking access…</p>;
  }

  if (me?.role !== "admin") {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-subheading font-semibold">Admin access required</h2>
        <p className="mt-1 text-small text-muted-foreground">
          This view is hidden for non-admins. Convex functions remain the real
          permission boundary.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <TablePlaceholder
        title="Failed deliveries"
        detail="Outbound webhook attempts that still need attention."
      />
      <TablePlaceholder
        title="Workflow errors"
        detail="Deduplicated automation failures reported by n8n."
      />
      <TablePlaceholder
        title="Trusted lenders"
        detail="Members who have been marked as trusted by an admin."
      />
    </div>
  );
}
