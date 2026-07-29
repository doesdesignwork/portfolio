"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const revealLines = (
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  start = "top 82%",
) =>
  gsap.from(targets, {
    yPercent: 108,
    autoAlpha: 0,
    clipPath: "inset(0 0 100% 0)",
    duration: 0.88,
    stagger: 0.1,
    ease: "power4.out",
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse",
    },
  });

// ScrollTrigger owns the entrance states; reduced-motion users bypass them entirely.
export function ScrollMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const scope = document.querySelector<HTMLElement>(".site-shell");
    if (!scope) return;

    let isActive = true;
    const compact = window.matchMedia("(max-width: 720px)").matches;

    const context = gsap.context(() => {
      gsap.to(".scroll-progress span", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      });

      gsap.from(".site-header", {
        y: -18,
        autoAlpha: 0,
        duration: 0.38,
        ease: "power4.out",
      });

      const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      heroTimeline
        .from(".hero-eyebrow", {
          x: compact ? -18 : -34,
          autoAlpha: 0,
          duration: 0.28,
        }, 0)
        .from(
          ".hero h1 > *",
          {
            yPercent: 24,
            autoAlpha: 0.62,
            duration: 0.46,
            stagger: 0.05,
          },
          0.06,
        )
        .from(
          ".hero-support > *",
          { y: compact ? 12 : 18, autoAlpha: 0.58, duration: 0.32, stagger: 0.04 },
          0.22,
        )
        .from(
          ".hero-work-preview figure > div",
          {
            clipPath: (index: number) =>
              index % 2 === 0
                ? "inset(0 28% 0 0)"
                : "inset(0 0 0 28%)",
            duration: 0.42,
            stagger: 0.05,
          },
          0.28,
        )
        .from(
          ".hero-work-preview img",
          {
            xPercent: (index: number) => (index % 2 === 0 ? -4 : 4),
            scale: 1.05,
            duration: 0.5,
            stagger: 0.05,
          },
          0.28,
        )
        .from(
          ".hero-work-preview figcaption",
          {
            y: 14,
            autoAlpha: 0.5,
            duration: 0.28,
            stagger: 0.05,
          },
          0.5,
        );

      const heroScroll = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      heroScroll
        .to(".hero-heading", { yPercent: -10, autoAlpha: 0.35 }, 0)
        .to(".hero-support", { yPercent: -18, autoAlpha: 0 }, 0)
        .to(".hero-work-main", { yPercent: -8 }, 0)
        .to(".hero-work-secondary", { yPercent: 8 }, 0);

      revealLines(".manifesto h2 span", ".manifesto");

      gsap.from(".manifesto p", {
        x: compact ? 34 : 92,
        autoAlpha: 0,
        duration: 0.78,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 64%",
          toggleActions: "play none none reverse",
        },
      });

      const workHeading = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
      workHeading
        .from(".work-heading > p", {
          x: compact ? -24 : -54,
          autoAlpha: 0,
          duration: 0.48,
          ease: "power4.out",
        })
        .from(
          ".work-heading h2",
          {
            yPercent: 72,
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.78,
            ease: "power4.out",
          },
          "-=0.28",
        )
        .from(
          ".work-heading > span",
          {
            x: compact ? 30 : 76,
            autoAlpha: 0,
            duration: 0.66,
            ease: "power4.out",
          },
          "-=0.44",
        );

      gsap.utils.toArray<HTMLElement>(".featured-project").forEach((project, index) => {
        const media = project.querySelector(".featured-project-media");
        const image = project.querySelector("img");
        const captionItems = project.querySelectorAll(".project-caption > *");
        const fromLeft = index % 2 === 0;
        const projectTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        projectTimeline
          .fromTo(media, {
            clipPath: fromLeft
              ? "inset(0 100% 0 0)"
              : "inset(0 0 0 100%)",
          }, {
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.02,
            ease: "power4.inOut",
          })
          .fromTo(image, {
            xPercent: fromLeft ? -9 : 9,
            scale: 1.1,
          }, {
            xPercent: 0,
            scale: 1,
            duration: 1.08,
            ease: "power4.out",
          }, 0)
          .from(captionItems, {
            x: fromLeft ? -28 : 28,
            autoAlpha: 0,
            duration: 0.48,
            stagger: 0.055,
            ease: "power3.out",
          }, "-=0.42");

        gsap.fromTo(image, {
          yPercent: -4,
        }, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });

      const moreWorkHeading = gsap.timeline({
        scrollTrigger: {
          trigger: ".more-work-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
      moreWorkHeading
        .from(".more-work-kicker", {
          x: compact ? -22 : -48,
          autoAlpha: 0,
          duration: 0.42,
          ease: "power4.out",
        })
        .from(".more-work-heading h3", {
          yPercent: 82,
          autoAlpha: 0,
          clipPath: "inset(0 0 100% 0)",
          duration: 0.82,
          ease: "power4.out",
        }, "-=0.22")
        .from(".more-work-heading p", {
          x: compact ? 28 : 72,
          autoAlpha: 0,
          duration: 0.66,
          ease: "power4.out",
        }, "-=0.46");

      gsap.utils.toArray<HTMLElement>(".selected-project").forEach((project, index) => {
        const media = project.querySelector(".selected-project-media");
        const image = project.querySelector("img");
        const copy = project.querySelector(".selected-project-copy");
        const fromLeft = index % 2 === 0;
        const projectTimeline = gsap.timeline({
          delay: (index % 2) * 0.08,
          scrollTrigger: {
            trigger: project,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        projectTimeline
          .fromTo(media, {
            clipPath: fromLeft
              ? "inset(0 100% 0 0)"
              : "inset(0 0 0 100%)",
          }, {
            clipPath: "inset(0 0% 0 0%)",
            duration: 0.82,
            ease: "power4.inOut",
          })
          .fromTo(image, {
            xPercent: fromLeft ? -8 : 8,
            scale: 1.09,
          }, {
            xPercent: 0,
            scale: 1,
            duration: 0.9,
            ease: "power4.out",
          }, 0)
          .from(copy, {
            x: fromLeft ? -20 : 20,
            autoAlpha: 0,
            duration: 0.42,
            ease: "power3.out",
          }, "-=0.34");

        gsap.fromTo(image, {
          yPercent: -4.5,
        }, {
          yPercent: 4.5,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.65,
          },
        });
      });

      revealLines(".about-heading h2 span", ".about-heading");

      const aboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      aboutTimeline
        .from(".about-copy > *", {
          x: compact ? -28 : -72,
          autoAlpha: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: "power4.out",
        })
        .from(".career-ledger > div", {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.72,
          stagger: 0.09,
          ease: "power4.inOut",
        }, "-=0.48")
        .from(".career-ledger dt, .career-ledger dd", {
          x: compact ? 20 : 40,
          autoAlpha: 0,
          duration: 0.46,
          stagger: 0.045,
          ease: "power3.out",
        }, "-=0.56");

      gsap.from(".capability-index li", {
        x: (index: number) => (index % 2 === 0 ? -34 : 34),
        autoAlpha: 0,
        duration: 0.62,
        stagger: 0.07,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".capability-index",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      revealLines(".process-heading h2 span", ".process-heading");

      gsap.from(".process-section li", {
        x: compact ? 34 : 84,
        autoAlpha: 0,
        clipPath: "inset(0 0 0 100%)",
        duration: 0.76,
        stagger: 0.11,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".process-section ol",
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });

      revealLines(".contact-section h2 span", ".contact-section", "top 78%");

      gsap.from(".contact-links a", {
        x: (index: number) => (index % 2 === 0 ? -48 : 48),
        autoAlpha: 0,
        duration: 0.68,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-links",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".footer-line > *", {
        y: 24,
        autoAlpha: 0,
        duration: 0.46,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-line",
          start: "top 94%",
          toggleActions: "play none none reverse",
        },
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
