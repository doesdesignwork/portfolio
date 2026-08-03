"use client";

import { useEffect } from "react";

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

export default function PortfolioMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    root.classList.add("motion-enabled");

    if (reduceMotion.matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      root.classList.add("motion-reduced");
      return () => {
        root.classList.remove("motion-enabled", "motion-reduced");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    const cleanups: Array<() => void> = [];

    if (finePointer.matches) {
      const magneticItems = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnetic]"),
      );

      magneticItems.forEach((item) => {
        const handleMove = (event: PointerEvent) => {
          const bounds = item.getBoundingClientRect();
          const relativeX = event.clientX - (bounds.left + bounds.width / 2);
          const relativeY = event.clientY - (bounds.top + bounds.height / 2);
          const x = clamp((relativeX / bounds.width) * 30, -15, 15);
          const y = clamp((relativeY / bounds.height) * 30, -15, 15);

          item.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
          item.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
          item.setAttribute("data-magnetic-active", "true");
        };

        const handleLeave = () => {
          item.style.setProperty("--mag-x", "0px");
          item.style.setProperty("--mag-y", "0px");
          item.removeAttribute("data-magnetic-active");
        };

        item.addEventListener("pointermove", handleMove);
        item.addEventListener("pointerleave", handleLeave);
        item.addEventListener("blur", handleLeave, true);

        cleanups.push(() => {
          item.removeEventListener("pointermove", handleMove);
          item.removeEventListener("pointerleave", handleLeave);
          item.removeEventListener("blur", handleLeave, true);
        });
      });
    }

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      root.classList.remove("motion-enabled", "motion-reduced");
    };
  }, []);

  return null;
}
