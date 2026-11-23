import type { Doc, Id } from "../_generated/dataModel";
import type { MutationCtx, QueryCtx } from "../_generated/server";
import { appError } from "./errors";

/** Roles come only from the users table — never from client args or Clerk metadata. */
export async function getCurrentUser(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  return await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .unique();
}

export async function requireUser(ctx: QueryCtx | MutationCtx): Promise<Doc<"users">> {
  const user = await getCurrentUser(ctx);
  if (!user) {
    appError("UNAUTHENTICATED", "You must be signed in to do that.");
  }
  return user;
}

export async function requireAdmin(ctx: QueryCtx | MutationCtx): Promise<Doc<"users">> {
  const user = await requireUser(ctx);
  if (user.role !== "admin") {
    appError("FORBIDDEN", "Admin access is required.");
  }
  return user;
}

export function assertOwnerOrAdmin(user: Doc<"users">, ownerId: Id<"users">): void {
  if (user.role === "admin") return;
  if (user._id !== ownerId) {
    appError("FORBIDDEN", "You do not have access to that resource.");
  }
}
