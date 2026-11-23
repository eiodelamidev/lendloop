/// <reference types="vite/client" />

import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { api, internal } from "./_generated/api";
import type { QueryCtx } from "./_generated/server";
import { requireAdmin, requireUser } from "./lib/auth";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

function asUser(t: ReturnType<typeof convexTest>, email: string, name: string) {
  return t.withIdentity({
    tokenIdentifier: `https://clerk.test|${email}`,
    subject: email,
    email,
    emailVerified: true,
    name,
  });
}

describe("users.store", () => {
  test("creates a user with the default role and minimal view", async () => {
    const t = convexTest(schema, modules);
    const ada = asUser(t, "ada@example.test", "Ada");

    const stored = await ada.mutation(api.users.store);

    expect(stored.role).toBe("user");
    expect(stored.name).toBe("Ada");
    expect(Object.keys(stored).sort()).toEqual(
      ["_id", "email", "name", "role", "trustedLender"].sort(),
    );
  });

  test("is idempotent and never duplicates rows", async () => {
    const t = convexTest(schema, modules);
    const ada = asUser(t, "ada@example.test", "Ada");

    const first = await ada.mutation(api.users.store);
    const second = await ada.mutation(api.users.store);

    expect(second._id).toEqual(first._id);
    const all = await t.run((ctx) => ctx.db.query("users").collect());
    expect(all).toHaveLength(1);
  });

  test("refreshes the display name on repeat sign-in", async () => {
    const t = convexTest(schema, modules);
    const ada = asUser(t, "ada@example.test", "Ada");
    await ada.mutation(api.users.store);

    const renamed = t.withIdentity({
      tokenIdentifier: "https://clerk.test|ada@example.test",
      subject: "ada@example.test",
      email: "ada@example.test",
      emailVerified: true,
      name: "Ada Lovelace",
    });
    const stored = await renamed.mutation(api.users.store);

    expect(stored.name).toBe("Ada Lovelace");
  });

  test("rejects unauthenticated callers", async () => {
    const t = convexTest(schema, modules);

    await expect(t.mutation(api.users.store)).rejects.toThrowError(
      "You must be signed in",
    );
  });

  test("rejects an unverified email", async () => {
    const t = convexTest(schema, modules);
    const unverified = t.withIdentity({
      tokenIdentifier: "https://clerk.test|unverified",
      subject: "unverified",
      email: "unverified@example.test",
      emailVerified: false,
    });

    await expect(
      unverified.mutation(api.users.store),
    ).rejects.toThrowError("verified email");
  });

  test("me returns null when signed out and the view when signed in", async () => {
    const t = convexTest(schema, modules);
    expect(await t.query(api.users.me)).toBeNull();

    const ada = asUser(t, "ada@example.test", "Ada");
    await ada.mutation(api.users.store);
    expect((await ada.query(api.users.me))?.email).toBe("ada@example.test");
  });
});

describe("roles", () => {
  test("promoteToAdmin flips the role", async () => {
    const t = convexTest(schema, modules);
    const ada = asUser(t, "ada@example.test", "Ada");
    await ada.mutation(api.users.store);

    await t.mutation(internal.users.promoteToAdmin, {
      email: "ada@example.test",
    });

    expect((await ada.query(api.users.me))?.role).toBe("admin");
  });

  test("promoteToAdmin fails for an unknown email", async () => {
    const t = convexTest(schema, modules);

    await expect(
      t.mutation(internal.users.promoteToAdmin, { email: "nobody@example.test" }),
    ).rejects.toThrowError("No user exists");
  });

  test("requireUser and requireAdmin deny unsigned callers", async () => {
    const t = convexTest(schema, modules);

    await expect(t.query(async (ctx) => requireUser(ctx as unknown as QueryCtx))).rejects.toThrowError(
      "signed in",
    );
    await expect(t.query(async (ctx) => requireAdmin(ctx as unknown as QueryCtx))).rejects.toThrowError(
      "signed in",
    );
  });

  test("requireAdmin denies a normal user", async () => {
    const t = convexTest(schema, modules);
    const ada = asUser(t, "ada@example.test", "Ada");
    await ada.mutation(api.users.store);

    await expect(
      ada.query(async (ctx) => requireAdmin(ctx as unknown as QueryCtx)),
    ).rejects.toThrowError("Admin access");
  });

  test("requireAdmin allows a promoted user", async () => {
    const t = convexTest(schema, modules);
    const ada = asUser(t, "ada@example.test", "Ada");
    await ada.mutation(api.users.store);
    await t.mutation(internal.users.promoteToAdmin, {
      email: "ada@example.test",
    });

    await expect(ada.query(async (ctx) => requireAdmin(ctx as unknown as QueryCtx))).resolves.toMatchObject({
      role: "admin",
    });
  });
});
