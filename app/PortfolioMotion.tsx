"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const lerp = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

export default function PortfolioMotion() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hero = document.querySelector<HTMLElement>("[data-editorial-hero]");
    const heroPrimary = document.querySelector<HTMLElement>("[data-hero-primary]");
    const heroSecondary = document.querySelector<HTMLElement>("[data-hero-secondary]");
    const siteHeader = document.querySelector<HTMLElement>("[data-site-header]");
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-heading], [data-reveal]"),
    );
    const cleanups: Array<() => void> = [];

    root.classList.add("editorial-motion-ready");

    let frame = 0;

    const updateHero = () => {
      frame = 0;

      if (siteHeader) {
        siteHeader.dataset.scrollState = window.scrollY > 36 ? "scrolled" : "top";
      }

      if (!hero || !heroPrimary || !heroSecondary || reduceMotion.matches) return;

      const heroTop = hero.offsetTop;
      const usableDistance = Math.max(window.innerHeight * 0.72, hero.offsetHeight * 0.55);
      const progress = clamp((window.scrollY - heroTop) / usableDistance, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 2.2);

      const weight = Math.round(lerp(280, 760, eased));
      const opticalSize = lerp(72, 36, eased);
      const tracking = lerp(-0.055, -0.035, eased);
      const scaleX = lerp(0.985, 1.015, eased);

      heroPrimary.style.setProperty("--hero-weight", String(weight));
      heroPrimary.style.setProperty("--hero-opsz", opticalSize.toFixed(2));
      heroPrimary.style.letterSpacing = `${tracking.toFixed(4)}em`;
      heroPrimary.style.transform = `scaleX(${scaleX.toFixed(4)})`;

      const revealProgress = clamp((progress - 0.18) / 0.56, 0, 1);
      heroSecondary.style.opacity = String(lerp(0.18, 1, revealProgress));
      heroSecondary.style.transform = `translateY(${lerp(18, 0, revealProgress).toFixed(2)}px)`;
      heroSecondary.style.clipPath = `inset(${lerp(52, 0, revealProgress).toFixed(2)}% 0 0 0)`;
    };

    const queueHeroUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHero);
    };

    window.addEventListener("scroll", queueHeroUpdate, { passive: true });
    window.addEventListener("resize", queueHeroUpdate);
    updateHero();

    let observer: IntersectionObserver | null = null;

    if (reduceMotion.matches) {
      root.classList.add("motion-reduced");
      revealTargets.forEach((target) => target.classList.add("is-editorial-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).classList.add("is-editorial-visible");
            observer?.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px",
        },
      );

      revealTargets.forEach((target) => observer?.observe(target));
    }

    if (!reduceMotion.matches && finePointer.matches) {
      const projectLinks = Array.from(
        document.querySelectorAll<HTMLElement>("[data-project-link]"),
      );

      projectLinks.forEach((link) => {
        const media = link.querySelector<HTMLElement>("[data-project-preview]");
        if (!media) return;

        const setRotateX = gsap.quickTo(media, "rotateX", {
          duration: 0.22,
          ease: "power3.out",
        });
        const setRotateY = gsap.quickTo(media, "rotateY", {
          duration: 0.22,
          ease: "power3.out",
        });
        const setX = gsap.quickTo(media, "x", {
          duration: 0.28,
          ease: "power3.out",
        });
        const setY = gsap.quickTo(media, "y", {
          duration: 0.28,
          ease: "power3.out",
        });
        const setZ = gsap.quickTo(media, "z", {
          duration: 0.26,
          ease: "power3.out",
        });

        gsap.set(media, {
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
        });

        const handleMove = (event: PointerEvent) => {
          const bounds = link.getBoundingClientRect();
          const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
          const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
          const nx = x * 2 - 1;
          const ny = y * 2 - 1;

          setRotateX(ny * -1);
          setRotateY(nx * 1.5);
          setX(nx * 2.5);
          setY(ny * 2);
          setZ(8);
        };

        const reset = () => {
          setRotateX(0);
          setRotateY(0);
          setX(0);
          setY(0);
          setZ(0);
        };

        link.addEventListener("pointermove", handleMove);
        link.addEventListener("pointerleave", reset);
        link.addEventListener("blur", reset, true);

        cleanups.push(() => {
          link.removeEventListener("pointermove", handleMove);
          link.removeEventListener("pointerleave", reset);
          link.removeEventListener("blur", reset, true);
        });
      });
    }

    return () => {
      observer?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", queueHeroUpdate);
      window.removeEventListener("resize", queueHeroUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("editorial-motion-ready", "motion-reduced");
    };
  }, []);

  return null;
}
