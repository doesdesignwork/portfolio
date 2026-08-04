import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";

const routes = [
  "/",
  "/cv/",
  "/services/brand-identity-design-singapore/",
  "/services/experiential-exhibition-design-singapore/",
  "/services/packaging-product-design-singapore/",
  "/work/modajar-fashion-brand-identity/",
  "/work/brewerkz-beer-packaging/",
  "/work/american-express-dbs-card-concepts/",
  "/work/sunsilk-unilever-packaging-design/",
  "/work/herdsman-retail-branding-perth/",
  "/work/100-pasir-panjang-property-branding/",
  "/work/beneo-palatinit-product-visualisation/",
  "/work/dow-chinaplas-exhibition-design/",
  "/work/raffles-institution-identity-design/",
  "/work/beneo-functional-food-product-concepts/",
  "/work/passion-group-hospitality-brand-architecture/",
  "/work/munch-food-retail-brand-identity/",
  "/work/sginnovate-brand-identity/",
  "/work/skechers-collaboration-footwear-concepts/",
  "/work/unilever-beauty-packaging/",
];

const viewports = [
  { name: "mobile-320", width: 320, height: 720 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet-600", width: 600, height: 960 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-820", width: 820, height: 1180 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });

// Width and height attributes preserve image geometry while avoiding the cost
// and variability of loading the full portfolio image inventory in CI.
await context.route("**/*", async (route) => {
  const type = route.request().resourceType();
  if (["image", "media"].includes(type)) {
    await route.abort();
    return;
  }
  await route.continue();
});

const page = await context.newPage();
page.setDefaultNavigationTimeout(15_000);
const failures = [];

await mkdir("artifacts/image-caption-audit", { recursive: true });

function safeName(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");
}

async function openRenderedPage(url) {
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15_000 });
      await page.waitForLoadState("load", { timeout: 5_000 }).catch(() => {});
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      await page.waitForTimeout(80);
      return;
    } catch (error) {
      lastError = error;
      await page.waitForTimeout(250);
    }
  }

  throw lastError;
}

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();

    try {
      await openRenderedPage(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ route, viewport, issues: [`navigation failure: ${message}`] });
      console.error(`FAIL ${viewport.name} ${route}`);
      console.error(`  - navigation failure: ${message}`);
      continue;
    }

    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
        .site-page img,
        .site-page figure,
        .site-page [data-project-caption] {
          transform: none !important;
        }
      `,
    });

    const issues = await page.evaluate(() => {
      const problems = [];
      const tolerance = 2;

      const isVisible = (element) => {
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

      const label = (element) => {
        const text = (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 70);
        const classes = [...element.classList]
          .slice(0, 2)
          .map((item) => `.${item}`)
          .join("");
        return `${element.tagName.toLowerCase()}${classes}${text ? ` “${text}”` : ""}`;
      };

      const checkHorizontalAlignment = (image, caption, description) => {
        const imageRect = image.getBoundingClientRect();
        const captionRect = caption.getBoundingClientRect();
        const leftDelta = Math.abs(imageRect.left - captionRect.left);
        const rightDelta = Math.abs(imageRect.right - captionRect.right);

        if (leftDelta > tolerance || rightDelta > tolerance) {
          problems.push(
            `${description} edge mismatch: left ${leftDelta.toFixed(1)}px, right ${rightDelta.toFixed(1)}px in ${label(caption)}`,
          );
        }

        if (captionRect.top < imageRect.bottom - tolerance) {
          problems.push(`${description} overlaps image in ${label(caption)}`);
        }

        if (captionRect.left < -tolerance || captionRect.right > window.innerWidth + tolerance) {
          problems.push(`${description} escapes viewport in ${label(caption)}`);
        }
      };

      const captionFigures = [...document.querySelectorAll("figure")].filter((figure) =>
        figure.querySelector("figcaption"),
      );

      for (const figure of captionFigures) {
        const image = figure.querySelector("img");
        const caption = figure.querySelector("figcaption");

        if (!(image instanceof HTMLImageElement) || !(caption instanceof HTMLElement)) {
          problems.push(`captioned figure missing image or caption: ${label(figure)}`);
          continue;
        }

        if (!isVisible(image) || !isVisible(caption)) continue;
        checkHorizontalAlignment(image, caption, "figure caption");
      }

      for (const caption of document.querySelectorAll("[data-project-caption]")) {
        if (!(caption instanceof HTMLElement) || !isVisible(caption)) continue;
        const card = caption.closest("a");
        const image = card?.querySelector("img");
        if (!(image instanceof HTMLImageElement) || !isVisible(image)) {
          problems.push(`project caption missing visible image: ${label(caption)}`);
          continue;
        }
        checkHorizontalAlignment(image, caption, "project-card caption");
      }

      if (
        document.querySelector(".site-page--project") &&
        captionFigures.length === 0
      ) {
        problems.push("case-study page contains no captioned figures");
      }

      return [...new Set(problems)];
    });

    if (issues.length > 0) {
      failures.push({ route, viewport, issues });
      await page.screenshot({
        path: `artifacts/image-caption-audit/${safeName(route)}-${viewport.name}.png`,
        fullPage: true,
      });
      console.error(`FAIL ${viewport.name} ${route}`);
      for (const issue of issues) console.error(`  - ${issue}`);
    } else {
      console.log(`PASS ${viewport.name} ${route}`);
    }
  }
}

await browser.close();

if (failures.length > 0) {
  console.error(
    `\nImage-caption audit failed in ${failures.length} route/viewport combinations.`,
  );
  process.exit(1);
}

console.log(
  `\nImage-caption alignment passed: ${routes.length} routes × ${viewports.length} viewports.`,
);
