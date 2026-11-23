import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import SiteHeader from "@/components/SiteHeader";
import StoreUser from "@/components/StoreUser";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LendLoop",
    template: "%s · LendLoop",
  },
  description:
    "Borrow what you need. Lend what you don't. A neighbourhood tool-lending board.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ConvexClientProvider>
            <a className="skip-link" href="#main-content">
              Skip to main content
            </a>
            <SiteHeader />
            {children}
            <footer className="border-t border-border py-8 text-center text-small text-muted-foreground">
              LendLoop · Borrow what you need. Lend what you don&apos;t.
            </footer>
            <StoreUser />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
