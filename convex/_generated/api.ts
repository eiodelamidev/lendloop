/* eslint-disable */
/**
 * Generated API references.
 *
 * Temporary local stub: `npx convex dev` regenerates this from the deployment.
 */
import type { ApiFromModules, FilterApi, FunctionReference } from "convex/server";
import { anyApi } from "convex/server";
import type * as identity from "../identity.js";
import type * as users from "../users.js";

type FullApi = ApiFromModules<{
  identity: typeof identity;
  users: typeof users;
}>;

export const api: FilterApi<typeof fullApiForType, FunctionReference<any, "public">> =
  anyApi as any;
export const internal: FilterApi<
  typeof fullApiForType,
  FunctionReference<any, "internal">
> = anyApi as any;

declare const fullApiForType: FullApi;
