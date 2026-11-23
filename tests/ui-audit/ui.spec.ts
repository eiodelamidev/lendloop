import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const label = process.env.AUDIT_LABEL ?? "after";
const shotDir = path.resolve(".docs/ui-audit/screenshots", label);

test.beforeAll(async () => {
  await mkdir(shotDir, { recursive: true });
});

test("public page: light", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.screenshot({
    path: path.join(shotDir, "public-light.png"),
    fullPage: true,
  });
});

test("public page: dark", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.screenshot({
    path: path.join(shotDir, "public-dark.png"),
    fullPage: true,
  });
  await context.close();
});

test("public hero: reduced motion stops the decorative animation", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const hero = page.locator(".hero-wash");
  if ((await hero.count()) > 0) {
    const animationName = await hero.evaluate(
      (node) => getComputedStyle(node).animationName,
    );
    expect(animationName).toBe("none");
  }
  await context.close();
});

test("dashboard signed-out state", async ({ page }) => {
  test.skip(label === "before", "Baseline commit has no dashboard route.");
  await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await page.screenshot({
    path: path.join(shotDir, "dashboard-signed-out.png"),
    fullPage: true,
  });
});

test("admin state", async ({ page }) => {
  test.skip(label === "before", "Baseline commit has no admin route.");
  await page.goto("/admin", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Admin" })).toBeVisible();
  await page.screenshot({
    path: path.join(shotDir, "admin.png"),
    fullPage: true,
  });
});
