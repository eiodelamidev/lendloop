import { clerkMiddleware } from "@clerk/nextjs/server";

// Routes are public by default. Authorization for /app and /app/admin is
// enforced in Convex functions; this proxy only exposes Clerk auth state.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
