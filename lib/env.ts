import { z } from "zod";

/**
 * Public env is imported by client components, so it only reads NEXT_PUBLIC_*
 * values. Server-only keys are parsed lazily to keep them out of the browser
 * bundle and to avoid breaking a build that never calls a server helper.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_CONVEX_URL: z.string().url("NEXT_PUBLIC_CONVEX_URL must be a URL"),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required"),
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

const serverEnvSchema = z.object({
  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
});

export function getServerEnv() {
  return serverEnvSchema.parse({
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  });
}
