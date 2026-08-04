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

const tests = [
  ...routes.map((route) => ({ route, name: "desktop", width: 1440, height: 900 })),
  { route: "/", name: "mobile", width: 390, height: 844 },
  { route: "/", name: "tablet", width: 1024, height: 768 },
  { route: "/work/sginnovate-brand-identity/", name: "mobile", width: 390, height: 844 },
  { route: "/work/sginnovate-brand-identity/", name: "tablet", width: 1024, height: 768 },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
page.setDefaultNavigationTimeout(20_000);
const failures = [];

await mkdir("artifacts/image-motion-audit", { recursive: true });

const setScrollPosition = async (position) => {
  await page.evaluate((nextPosition) => {
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
    window.scrollTo(0, nextPosition);
    window.dispatchEvent(new Event("scroll"));
  }, position);
  await page.waitForTimeout(220);
};

const waitForImages = async () => {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
    const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
    const step = Math.max(320, Math.floor(window.innerHeight * 0.72));
    const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    for (let position = 0; position <= maximum; position += step) {
      window.scrollTo(0, position);
      window.dispatchEvent(new Event("scroll"));
      await pause(36);
    }
    window.scrollTo(0, maximum);
    window.dispatchEvent(new Event("scroll"));
    await pause(180);
    const images = Array.from(document.querySelectorAll(".site-page main img, .site-page footer img"));
    const decodeImages = Promise.all(
      images.map((image) => image.decode?.().catch(() => undefined)),
    );
    await Promise.race([decodeImages, pause(8_000)]);
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("scroll"));
    await pause(220);
  });
};

for (const test of tests) {
  const label = `${test.name} ${test.route}`;
  try {
    await page.setViewportSize({ width: test.width, height: test.height });
    await page.goto(`${baseUrl}${test.route}`, { waitUntil: "load" });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await waitForImages();

    const result = await page.evaluate(() => {
      const isVisible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };

      const numbering = [];
      document
        .querySelectorAll(
          "[class*='projectNumber'], [class*='archiveNumber'], [data-project-number], [data-image-number]",
        )
        .forEach((element) => {
          if (isVisible(element)) numbering.push(`visible retired number: ${element.textContent?.trim()}`);
        });

      const targetedNumberSelectors = [
        ".brand-project-margin > span",
        ".brand-story-fields section > span:first-child",
        ".brand-project-gallery figcaption > span:first-child",
      ];
      targetedNumberSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          const text = element.textContent?.trim() ?? "";
          if (isVisible(element) && /^\d{1,3}$/.test(text)) {
            numbering.push(`${selector}: ${text}`);
          }
        });
      });

      const heroContext = document.querySelector(".site-page--project [class*='heroMeta'] p:first-child");
      if (heroContext && /^\d{1,3}\s*\//.test(heroContext.textContent?.trim() ?? "")) {
        numbering.push(`project hero: ${heroContext.textContent?.trim()}`);
      }

      document.querySelectorAll(".brand-proof-card > small").forEach((element) => {
        const text = element.textContent?.trim() ?? "";
        if (/^\d{1,3}\s*\//.test(text)) numbering.push(`service proof: ${text}`);
      });

      const imageProblems = [];
      const images = Array.from(
        document.querySelectorAll(
          ".site-page main img[data-quality-image='true'], .site-page footer img[data-quality-image='true']",
        ),
      );

      images.forEach((image, index) => {
        const rect = image.getBoundingClientRect();
        const style = getComputedStyle(image);
        const imageLabel = image.getAttribute("src") || image.getAttribute("alt") || `image-${index + 1}`;
        if (!image.naturalWidth || !image.naturalHeight) {
          imageProblems.push(`${imageLabel}: missing intrinsic dimensions`);
          return;
        }
        if (rect.width > image.naturalWidth + 1.25) {
          imageProblems.push(
            `${imageLabel}: horizontally upscaled ${rect.width.toFixed(1)} > ${image.naturalWidth}`,
          );
        }
        if (rect.height > image.naturalHeight + 1.25) {
          imageProblems.push(
            `${imageLabel}: vertically upscaled ${rect.height.toFixed(1)} > ${image.naturalHeight}`,
          );
        }
        if (image.currentSrc.includes("/_next/image")) {
          imageProblems.push(`${imageLabel}: re-encoded through Next image optimisation`);
        }
        if (style.filter !== "none") imageProblems.push(`${imageLabel}: filter is ${style.filter}`);
        if (style.transform !== "none") imageProblems.push(`${imageLabel}: image itself is transformed`);

        const excluded = image.closest("header, [data-archive-preview], [data-no-scroll-motion]");
        const target = image.closest("figure") ?? image.parentElement;
        if (
          !excluded &&
          image.naturalWidth >= 240 &&
          image.naturalHeight >= 180 &&
          !target?.hasAttribute("data-scroll-image-motion")
        ) {
          imageProblems.push(`${imageLabel}: missing scroll-motion target`);
        }
      });

      return {
        numbering,
        imageProblems,
        imageCount: images.length,
        motionCount: document.querySelectorAll("[data-scroll-image-motion]").length,
      };
    });

    let motionProblem = null;
    const motionTarget = page.locator("[data-scroll-image-motion]").first();
    if ((await motionTarget.count()) > 0) {
      const geometry = await motionTarget.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          documentTop: rect.top + window.scrollY,
          maximumScroll: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
        };
      });
      const upperPosition = Math.min(
        geometry.maximumScroll,
        Math.max(0, geometry.documentTop - test.height * 0.82),
      );
      const lowerPosition = Math.min(
        geometry.maximumScroll,
        Math.max(0, geometry.documentTop - test.height * 0.12),
      );

      await setScrollPosition(upperPosition);
      const firstValue = await motionTarget.evaluate((element) =>
        getComputedStyle(element).getPropertyValue("--scroll-image-y").trim(),
      );
      await setScrollPosition(lowerPosition);
      const secondValue = await motionTarget.evaluate((element) =>
        getComputedStyle(element).getPropertyValue("--scroll-image-y").trim(),
      );

      const firstNumber = Number.parseFloat(firstValue);
      const secondNumber = Number.parseFloat(secondValue);
      if (
        !firstValue ||
        !secondValue ||
        !Number.isFinite(firstNumber) ||
        !Number.isFinite(secondNumber) ||
        Math.abs(firstNumber - secondNumber) < 0.5
      ) {
        motionProblem = `motion variable did not change (${firstValue || "empty"} → ${secondValue || "empty"})`;
      }
    }

    const problems = [...result.numbering, ...result.imageProblems];
    if (motionProblem) problems.push(motionProblem);

    if (problems.length) {
      failures.push({ label, problems });
      const safeName = `${test.name}-${test.route === "/" ? "home" : test.route.replaceAll("/", "-")}`;
      await page.screenshot({
        path: `artifacts/image-motion-audit/${safeName}.png`,
        fullPage: true,
      });
      console.error(`FAIL ${label}`);
      problems.forEach((problem) => console.error(`  ${problem}`));
    } else {
      console.log(`PASS ${label} · images ${result.imageCount} · motion targets ${result.motionCount}`);
    }
  } catch (error) {
    failures.push({ label, problems: [String(error)] });
    console.error(`FAIL ${label}\n  ${String(error)}`);
  }
}

await browser.close();

if (failures.length) {
  console.error(`\nImage motion, quality and numbering audit failed: ${failures.length} test case(s).`);
  process.exit(1);
}

console.log(`\nImage motion, quality and numbering audit passed: ${tests.length} rendered test cases.`);
