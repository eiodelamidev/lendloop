import { v } from "convex/values";
import { query } from "./_generated/server";

/**
 * Phase 0B smoke test: proves the Clerk JWT reached Convex and was validated.
 * Returns only the token subject — no personal data.
 */
export const subject = query({
  args: {},
  returns: v.union(v.string(), v.null()),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    return identity?.subject ?? null;
  },
});
