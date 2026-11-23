import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const url = process.env.AUDIT_URL ?? "http://127.0.0.1:3101/";
const label = process.env.AUDIT_LABEL ?? "after";
const outDir = path.resolve(".docs/ui-audit/lighthouse", label);
await mkdir(outDir, { recursive: true });

const base = path.join(outDir, "report").replaceAll("\\", "/");
const chromeFlags =
  "--headless=new --no-sandbox --disable-dev-shm-usage --disable-gpu";
const args = [
  "exec",
  "lighthouse",
  url,
  "--output=json",
  "--output=html",
  `--output-path=${base}`,
  "--only-categories=performance,accessibility,best-practices,seo",
  `--chrome-flags="${chromeFlags}"`,
  "--quiet",
];

if (process.env.CHROME_PATH) {
  args.push(`--chrome-path=${process.env.CHROME_PATH}`);
}

const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
await new Promise((resolve, reject) => {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  child.on("error", reject);
  child.on("exit", (code) => {
    if (code === 0) resolve(undefined);
    else reject(new Error(`Lighthouse exited with code ${code}`));
  });
});

const report = JSON.parse(await readFile(`${base}.json`, "utf8"));
const categories = Object.fromEntries(
  Object.entries(report.categories ?? {}).map(([key, value]) => [
    key,
    value.score,
  ]),
);
const metricIds = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
];
const metrics = Object.fromEntries(
  metricIds.map((id) => [id, report.audits?.[id]?.displayValue ?? null]),
);

await writeFile(
  path.join(outDir, "summary.json"),
  JSON.stringify({ url, label, categories, metrics }, null, 2),
);
console.log(`Lighthouse report saved to ${outDir}`);
