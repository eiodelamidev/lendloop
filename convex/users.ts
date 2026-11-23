import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { internalMutation, mutation, query } from "./_generated/server";
import { appError } from "./lib/errors";
import { roleValidator } from "./lib/validators";

/** Only these fields leave the server — never tokenIdentifier or clerkId. */
const userViewValidator = v.object({
  _id: v.id("users"),
  name: v.string(),
  email: v.string(),
  role: roleValidator,
  trustedLender: v.boolean(),
});

function toUserView(user: Doc<"users">) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    trustedLender: user.trustedLender,
  };
}

/**
 * Idempotent upsert called once after sign-in. It never accepts a role from
 * args: privilege can only change through the CLI-only promoteToAdmin below.
 */
export const store = mutation({
  args: {},
  returns: userViewValidator,
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      appError("UNAUTHENTICATED", "You must be signed in.");
    }
    // Notifications need a real address; an unverified one must not be stored.
    if (!identity.email || !identity.emailVerified) {
      appError("EMAIL_REQUIRED", "A verified email is required.");
    }

    const existing = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (existing) {
      const name = identity.name ?? existing.name;
      await ctx.db.patch(existing._id, {
        clerkId: identity.subject,
        name,
        email: identity.email,
      });
      return toUserView({ ...existing, name, email: identity.email });
    }

    const id = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      clerkId: identity.subject,
      name: identity.name ?? "Member",
      email: identity.email,
      role: "user",
      trustedLender: false,
      createdAt: Date.now(),
    });

    const created = await ctx.db.get(id);
    if (!created) {
      appError("NOT_FOUND", "User could not be read after creation.");
    }
    return toUserView(created);
  },
});

export const me = query({
  args: {},
  returns: v.union(userViewValidator, v.null()),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    return user ? toUserView(user) : null;
  },
});

/**
 * Internal (CLI-only) so the first admin can be promoted without already
 * needing admin rights. Not callable from the browser.
 */
export const promoteToAdmin = internalMutation({
  args: { email: v.string() },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!user) {
      appError("NOT_FOUND", "No user exists with that email.");
    }
    await ctx.db.patch(user._id, { role: "admin" });
    return user._id;
  },
});
