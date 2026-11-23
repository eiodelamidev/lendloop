import type { AuthConfig } from "convex/server";

/**
 * Clerk issues the JWT; Convex validates it against the issuer domain.
 * CLERK_JWT_ISSUER_DOMAIN is set on the Convex deployment, not in .env.local.
 */
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
