import { defineConfig } from "@playwright/test";

const label = process.env.AUDIT_LABEL ?? "after";

export default defineConfig({
  testDir: "./tests/ui-audit",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 180_000,
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: `.docs/ui-audit/playwright/${label}/report`,
        open: "never",
      },
    ],
  ],
  outputDir: `.docs/ui-audit/playwright/${label}/results`,
  use: {
    baseURL: process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3101",
    navigationTimeout: 180_000,
    ...(process.env.AUDIT_BROWSER_CHANNEL
      ? { channel: process.env.AUDIT_BROWSER_CHANNEL }
      : {}),
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    reducedMotion: "no-preference",
    trace: "retain-on-failure",
  },
});
