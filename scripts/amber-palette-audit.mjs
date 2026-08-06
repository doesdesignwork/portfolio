import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";
const cssPath = "app/amber-gunmetal.css";
const css = await readFile(cssPath, "utf8");
const failures = [];

const requiredSource = [
  "--brand-signal: #5a4fcf;",
  "--brand-signal-on-dark: #c4cf4f;",
  "--brand-signal-bright: var(--brand-signal-on-dark);",
];

for (const token of requiredSource) {
  if (!css.includes(token)) {
    failures.push(`missing palette source token: ${token}`);
  }
}

for (const retired of ["#ffbf00", "#0057ff", "#4dd8ff"]) {
  if (css.toLowerCase().includes(retired)) {
    failures.push(`retired colour remains in ${cssPath}: ${retired}`);
  }
}

const routes = [
  "/",
  "/cv/",
  "/services/brand-identity-design-singapore/",
  "/services/experiential-exhibition-design-singapore/",
  "/services/packaging-product-design-singapore/",
  "/work/modajar-fashion-brand-identity/",
  "/work/dow-chinaplas-exhibition-design/",
  "/work/sginnovate-brand-identity/",
];

const expected = {
  ink: "rgb(37, 42, 46)",
  violet: "rgb(90, 79, 207)",
  lime: "rgb(196, 207, 79)",
};

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
page.setDefaultNavigationTimeout(20_000);

for (const route of routes) {
  try {
    await page.goto(new URL(route, baseUrl), { waitUntil: "domcontentloaded" });
    await page.evaluate(async () => document.fonts.ready);

    const issues = await page.evaluate(
      ({ expectedColours, currentRoute }) => {
        const problems = [];
        const root = getComputedStyle(document.documentElement);
        const normalise = (value) => value.replace(/\s+/g, " ").trim();

        const tokens = {
          ink: normalise(root.getPropertyValue("--brand-ink")),
          violet: normalise(root.getPropertyValue("--brand-signal")),
          lime: normalise(root.getPropertyValue("--brand-signal-on-dark")),
        };

        if (tokens.ink.toLowerCase() !== "#252a2e") {
          problems.push(`unexpected --brand-ink: ${tokens.ink}`);
        }
        if (tokens.violet.toLowerCase() !== "#5a4fcf") {
          problems.push(`unexpected --brand-signal: ${tokens.violet}`);
        }
        if (tokens.lime.toLowerCase() !== "#c4cf4f") {
          problems.push(`unexpected --brand-signal-on-dark: ${tokens.lime}`);
        }

        const visible = (element) => {
          if (!(element instanceof HTMLElement)) return false;
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number(style.opacity) > 0.01 &&
            rect.width > 1 &&
            rect.height > 1
          );
        };

        const retired = new Set([
          "rgb(255, 191, 0)",
          "rgb(0, 87, 255)",
          "rgb(77, 216, 255)",
        ]);

        for (const element of [...document.querySelectorAll("body *")].filter(visible)) {
          if (["IMG", "PICTURE", "VIDEO", "CANVAS", "SOURCE"].includes(element.tagName)) {
            continue;
          }

          const style = getComputedStyle(element);
          const values = [
            style.color,
            style.backgroundColor,
            style.borderTopColor,
            style.borderRightColor,
            style.borderBottomColor,
            style.borderLeftColor,
            style.outlineColor,
          ].map(normalise);

          if (values.some((value) => retired.has(value))) {
            const label = (element.textContent ?? "")
              .trim()
              .replace(/\s+/g, " ")
              .slice(0, 54);
            problems.push(`retired colour visible on ${element.tagName.toLowerCase()} "${label}"`);
            break;
          }
        }

        const checkColour = (selector, expectedColour, label) => {
          const element = document.querySelector(selector);
          if (!element || !visible(element)) return;
          const actual = normalise(getComputedStyle(element).color);
          if (actual !== expectedColour) {
            problems.push(`${label} should be ${expectedColour}, found ${actual}`);
          }
        };

        if (currentRoute === "/") {
          checkColour("#top h1 em", expectedColours.violet, "hero paper accent");
          checkColour(
            'aside[data-side-index] nav a[aria-current="location"]',
            expectedColours.violet,
            "paper side-index accent",
          );
          checkColour(
            ".brand-home-manifesto h2",
            expectedColours.lime,
            "gunmetal manifesto accent",
          );
          checkColour(
            "#about .brand-capability-matrix h3",
            expectedColours.lime,
            "gunmetal capability accent",
          );
          checkColour(
            'footer [data-contact-link] > span',
            expectedColours.lime,
            "gunmetal footer accent",
          );
        }

        if (currentRoute === "/cv/") {
          checkColour(".brand-cv-section > h2", expectedColours.violet, "CV paper heading");
          checkColour(".brand-cta > p", expectedColours.lime, "CV gunmetal CTA label");
        }

        if (currentRoute.startsWith("/work/")) {
          checkColour(
            ".brand-project-story h2",
            expectedColours.lime,
            "project gunmetal story heading",
          );
          checkColour(
            ".brand-project-gallery h2",
            expectedColours.violet,
            "project paper gallery heading",
          );
        }

        return problems;
      },
      { expectedColours: expected, currentRoute: route },
    );

    failures.push(...issues.map((issue) => `${route}: ${issue}`));
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

await browser.close();

if (failures.length) {
  console.error("Dual-accent palette audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  "Dual-accent palette audit passed: #5A4FCF on paper and #C4CF4F on gunmetal.",
);
