"use client";

import { useEffect } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

/**
 * Clerk owns authentication; Convex owns the user row. This effect is the only
 * bridge, and it runs only after Convex has accepted the Clerk session token.
 */
export default function StoreUser() {
  const { isAuthenticated } = useConvexAuth();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;
    void storeUser().catch(() => {
      // Do not log the error object: it could contain identity claims.
      if (!cancelled) console.error("LendLoop: user sync failed.");
    });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, storeUser]);

  return null;
}
