"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger owns the entrance states; reduced-motion users bypass them entirely.
export function ScrollMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const scope = document.querySelector<HTMLElement>(".site-shell");
    if (!scope) return;

    let isActive = true;

    const context = gsap.context(() => {
      gsap.from(".site-header", {
        y: -10,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power3.out",
      });

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".hero-eyebrow", { y: 24, autoAlpha: 0, duration: 0.42 })
        .from(
          ".hero h1 > *",
          { yPercent: 56, autoAlpha: 0, duration: 0.72, stagger: 0.08 },
          "-=0.2",
        )
        .from(
          ".hero-support > *",
          { y: 36, autoAlpha: 0, duration: 0.56, stagger: 0.08 },
          "-=0.42",
        )
        .from(
          ".hero-work-preview figure",
          {
            y: 72,
            autoAlpha: 0,
            scale: 0.96,
            clipPath: "inset(14% 0 0 0)",
            duration: 0.82,
            stagger: 0.12,
          },
          "-=0.32",
        );

      gsap.to(".hero h1", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-work-main img", {
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-work-preview",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".manifesto h2 span", {
        yPercent: 72,
        autoAlpha: 0,
        duration: 0.88,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".manifesto p", {
        y: 52,
        autoAlpha: 0,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 68%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".work-heading > *", {
        y: 56,
        autoAlpha: 0,
        duration: 0.78,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".featured-project").forEach((project) => {
        const media = project.querySelector(".featured-project-media");
        const captionItems = project.querySelectorAll(".project-caption > *");
        const projectTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });

        projectTimeline
          .from(media, {
            y: 96,
            autoAlpha: 0,
            scale: 0.95,
            clipPath: "inset(18% 0 0 0)",
            duration: 0.94,
            ease: "power3.out",
          })
          .from(
            captionItems,
            {
              y: 28,
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.07,
              ease: "power2.out",
            },
            "-=0.48",
          );
      });

      gsap.from(".more-work-heading > *", {
        y: 54,
        autoAlpha: 0,
        duration: 0.76,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".more-work-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".selected-project").forEach((project, index) => {
        const media = project.querySelector(".selected-project-media");
        const copy = project.querySelector(".selected-project-copy");
        const projectTimeline = gsap.timeline({
          delay: (index % 4) * 0.08,
          scrollTrigger: {
            trigger: project,
            start: "top 91%",
            toggleActions: "play none none reverse",
          },
        });

        projectTimeline
          .from(media, {
            y: 76,
            autoAlpha: 0,
            scale: 0.94,
            clipPath: "inset(16% 0 0 0)",
            duration: 0.86,
            ease: "power3.out",
          })
          .from(
            copy,
            {
              y: 24,
              autoAlpha: 0,
              duration: 0.46,
              ease: "power2.out",
            },
            "-=0.42",
          );
      });

      gsap.from(".about-heading h2 span", {
        yPercent: 68,
        autoAlpha: 0,
        duration: 0.84,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      const aboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      aboutTimeline
        .from(".about-copy > *", {
          y: 52,
          autoAlpha: 0,
          duration: 0.74,
          stagger: 0.1,
          ease: "power3.out",
        })
        .from(
          ".career-ledger > div",
          {
            y: 42,
            autoAlpha: 0,
            duration: 0.62,
            stagger: 0.09,
            ease: "power2.out",
          },
          "-=0.42",
        );

      gsap.from(".capability-index li", {
        y: 42,
        autoAlpha: 0,
        duration: 0.62,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".capability-index",
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".process-heading h2 span", {
        yPercent: 68,
        autoAlpha: 0,
        duration: 0.84,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".process-section li", {
        y: 58,
        autoAlpha: 0,
        duration: 0.72,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-section ol",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-section h2 span", {
        yPercent: 68,
        autoAlpha: 0,
        duration: 0.84,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-links a", {
        y: 52,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-links",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".footer-line > *", {
        y: 28,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-line",
          start: "top 94%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils
        .toArray<HTMLImageElement>(
          ".featured-project-media img, .selected-project-media img",
        )
        .forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -2.5, scale: 1.07 },
            {
              yPercent: 2.5,
              scale: 1.015,
              ease: "none",
              scrollTrigger: {
                trigger: image.closest(
                  ".featured-project, .selected-project",
                ),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });

    }, scope);

    const refresh = () => ScrollTrigger.refresh();
    const layoutImages = Array.from(
      scope.querySelectorAll<HTMLImageElement>(".hero img, .featured-work img"),
    );
    Promise.all([
      document.fonts.ready,
      ...layoutImages.map((image) => image.decode().catch(() => undefined)),
    ]).then(() => {
      if (!isActive) return;
      window.requestAnimationFrame(() => {
        if (!isActive) return;
        refresh();
      });
    });
    window.addEventListener("load", refresh, { once: true });
    window.requestAnimationFrame(refresh);

    return () => {
      isActive = false;
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, []);

  return null;
}
