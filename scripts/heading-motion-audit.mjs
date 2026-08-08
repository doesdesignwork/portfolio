import { chromium } from "playwright";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/cv/",
  "/services/brand-identity-design-singapore/",
  "/work/sginnovate-brand-identity/",
  "/work/healthhub-caregiver-ux/",
];

const browser = await chromium.launch({ headless: true });
const failures = [];

const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

for (const route of routes) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(new URL(route, baseUrl).toString(), {
    waitUntil: "domcontentloaded",
    timeout: 15_000,
  });
  await page.evaluate(async () => document.fonts.ready);
  await page.waitForTimeout(220);

  const coverage = await page.evaluate(() => {
    const candidates = Array.from(
      document.querySelectorAll(
        ".site-page main h1, .site-page main h2, .site-page main h3, .site-page article h1, .site-page article h2, .site-page article h3, .site-page footer h2, .site-page footer h3",
      ),
    ).filter((heading) => {
      if (!(heading instanceof HTMLElement)) return false;
      const style = getComputedStyle(heading);
      const rect = heading.getBoundingClientRect();
      const size = Number.parseFloat(style.fontSize);
      const visible = style.display !== "none" && style.visibility !== "hidden" && rect.width > 1 && rect.height > 1;
      return visible && (heading.tagName !== "H3" || size >= 24);
    });

    const missing = candidates
      .filter(
        (heading) =>
          heading.getAttribute("data-scroll-heading-motion") !== "true" ||
          heading.getAttribute("data-scroll-heading-kinetic") !== "scale",
      )
      .map((heading) => `${heading.tagName.toLowerCase()}: ${(heading.textContent ?? "").trim().slice(0, 70)}`);

    const measurable = candidates
      .map((heading) => ({
        text: (heading.textContent ?? "").trim().slice(0, 70),
        top: heading.getBoundingClientRect().top + window.scrollY,
      }))
      .find((heading) => heading.top > window.innerHeight * 1.15);

    return {
      count: candidates.length,
      missing,
      measurable,
    };
  });

  const problems = [];
  if (!coverage.count) problems.push("No display headings found");
  if (coverage.missing.length) {
    problems.push(`Missing kinetic markers: ${coverage.missing.join(" | ")}`);
  }

  if (coverage.measurable) {
    const firstScroll = Math.max(0, coverage.measurable.top - 900 * 0.66);
    const secondScroll = Math.max(0, coverage.measurable.top - 900 * 0.28);

    await page.evaluate((position) => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, position);
      window.dispatchEvent(new Event("scroll"));
    }, firstScroll);
    await pause(180);

    const firstScale = await page.evaluate((text) => {
      const headings = Array.from(document.querySelectorAll('[data-scroll-heading-kinetic="scale"]'));
      const heading = headings.find((item) => (item.textContent ?? "").trim().slice(0, 70) === text);
      return heading instanceof HTMLElement
        ? getComputedStyle(heading).getPropertyValue("--scroll-heading-scale").trim()
        : "";
    }, coverage.measurable.text);

    await page.evaluate((position) => {
      window.scrollTo(0, position);
      window.dispatchEvent(new Event("scroll"));
    }, secondScroll);
    await pause(180);

    const secondScale = await page.evaluate((text) => {
      const headings = Array.from(document.querySelectorAll('[data-scroll-heading-kinetic="scale"]'));
      const heading = headings.find((item) => (item.textContent ?? "").trim().slice(0, 70) === text);
      return heading instanceof HTMLElement
        ? getComputedStyle(heading).getPropertyValue("--scroll-heading-scale").trim()
        : "";
    }, coverage.measurable.text);

    const firstNumber = Number.parseFloat(firstScale);
    const secondNumber = Number.parseFloat(secondScale);
    if (
      !Number.isFinite(firstNumber) ||
      !Number.isFinite(secondNumber) ||
      Math.abs(firstNumber - secondNumber) < 0.015 ||
      Math.max(firstNumber, secondNumber) < 1.01
    ) {
      problems.push(`Kinetic scale did not show an overshoot-and-settle change (${firstScale || "empty"} → ${secondScale || "empty"})`);
    }
  } else {
    problems.push("No below-the-fold heading available for kinetic-scale measurement");
  }

  if (problems.length) {
    failures.push({ route, problems });
    console.error(`FAIL ${route}`);
    problems.forEach((problem) => console.error(`  - ${problem}`));
  } else {
    console.log(`PASS ${route} · ${coverage.count} display headings covered`);
  }

  await context.close();
}

const reducedContext = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(new URL("/", baseUrl).toString(), {
  waitUntil: "domcontentloaded",
  timeout: 15_000,
});
await reducedPage.evaluate(async () => document.fonts.ready);
await reducedPage.waitForTimeout(160);

const reduced = await reducedPage.evaluate(() => {
  const heading = document.querySelector('[data-scroll-heading-motion="true"]');
  if (!(heading instanceof HTMLElement)) return { found: false, transform: "", opacity: "" };
  const style = getComputedStyle(heading);
  return { found: true, transform: style.transform, opacity: style.opacity };
});

if (!reduced.found || reduced.transform !== "none" || Number.parseFloat(reduced.opacity) < 0.99) {
  failures.push({
    route: "/ reduced-motion",
    problems: [`Reduced motion did not resolve to a static heading (${reduced.transform || "missing"}, opacity ${reduced.opacity || "missing"})`],
  });
  console.error(`FAIL reduced motion · transform ${reduced.transform || "missing"} · opacity ${reduced.opacity || "missing"}`);
} else {
  console.log("PASS reduced motion · headings resolve to static rendering");
}

await reducedContext.close();
await browser.close();

if (failures.length) {
  console.error(`\nKinetic heading motion audit failed: ${failures.length} test case(s).`);
  process.exit(1);
}

console.log(`\nKinetic heading motion audit passed across ${routes.length} representative routes.`);
