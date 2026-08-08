import { chromium } from "playwright";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";
const minimumFontSize = 16;

const viewports = [
  { name: "mobile-320", width: 320, height: 720 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1180", width: 1180, height: 820 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const routes = ["/", "/work/healthhub-caregiver-ux/"];
const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of viewports) {
  for (const route of routes) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const runtimeErrors = [];

    page.on("pageerror", (error) => runtimeErrors.push(`pageerror: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`);
    });

    await page.goto(new URL(route, baseUrl).toString(), {
      waitUntil: "domcontentloaded",
      timeout: 15_000,
    });
    await page.evaluate(async () => document.fonts.ready);
    await page.waitForTimeout(100);

    const result = await page.evaluate(({ route, minimumFontSize }) => {
      const root = document.querySelector(".site-page");
      if (!(root instanceof HTMLElement)) {
        return { overflow: true, undersized: ["Missing .site-page"], assertions: ["Missing site root"] };
      }

      const overflow = document.documentElement.scrollWidth > window.innerWidth + 1;
      const undersized = [];

      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          Number(style.opacity) > 0.01 &&
          rect.width > 1 &&
          rect.height > 1 &&
          element.getAttribute("aria-hidden") !== "true"
        );
      };

      for (const element of root.querySelectorAll("*")) {
        if (!(element instanceof HTMLElement) || !visible(element)) continue;
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName)) continue;

        const directText = [...element.childNodes]
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .map((node) => node.textContent ?? "")
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        if (!directText) continue;
        const size = Number.parseFloat(getComputedStyle(element).fontSize);
        const allowedMinimum = element.closest("aside[data-side-index] nav") ? 14 : minimumFontSize;
        if (Number.isFinite(size) && size < allowedMinimum - 0.05) {
          undersized.push(`${element.tagName.toLowerCase()} ${size}px: ${directText.slice(0, 64)}`);
        }
      }

      const assertions = [];
      if (route === "/") {
        const about = [...document.querySelectorAll("header nav a")].find(
          (link) => link.textContent?.trim() === "About",
        );
        if (!(about instanceof HTMLElement) || !visible(about)) {
          assertions.push("About navigation is not visible");
        }

        const productLink = document.querySelector('a[href="/work/healthhub-caregiver-ux/"]');
        if (!(productLink instanceof HTMLElement) || !visible(productLink)) {
          assertions.push("HealthHub product-practice case study is not visible");
        }

        const roleLink = document.querySelector('a[href^="mailto:g@doesdesignwork.com?subject=Role"]');
        const projectLink = document.querySelector('a[href^="mailto:g@doesdesignwork.com?subject=Project"]');
        if (!roleLink) assertions.push("Discuss a role conversion path is missing");
        if (!projectLink) assertions.push("Discuss a project conversion path is missing");
      }

      if (route === "/work/healthhub-caregiver-ux/") {
        if (!root.classList.contains("site-page--healthhub")) {
          assertions.push("HealthHub route quality marker is missing");
        }
        if (!document.body.textContent?.includes("not a commissioned HealthHub feature")) {
          assertions.push("Academic/non-commissioned disclosure is missing");
        }
        if (!document.body.textContent?.includes("Research synthesis")) {
          assertions.push("UX research evidence is missing");
        }
      }

      return { overflow, undersized, assertions };
    }, { route, minimumFontSize });

    if (result.overflow || result.undersized.length || result.assertions.length || runtimeErrors.length) {
      failures.push({ viewport: viewport.name, route, ...result, runtimeErrors });
      console.error(`FAIL ${viewport.name} ${route}`);
      if (result.overflow) console.error("  - horizontal overflow detected");
      for (const issue of result.undersized.slice(0, 12)) console.error(`  - undersized: ${issue}`);
      for (const issue of result.assertions) console.error(`  - assertion: ${issue}`);
      for (const issue of runtimeErrors.slice(0, 8)) console.error(`  - runtime: ${issue}`);
    } else {
      console.log(`PASS ${viewport.name} ${route}`);
    }

    await context.close();
  }
}

await browser.close();

if (failures.length) {
  console.error(`\nTransition-proof audit failed in ${failures.length} route/viewport combinations.`);
  process.exit(1);
}

console.log("\nTransition-proof audit passed across homepage and HealthHub capstone.");
