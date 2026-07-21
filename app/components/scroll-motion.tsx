"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const scope = document.querySelector<HTMLElement>(".site-shell");
    if (!scope) return;

    let isActive = true;
    const context = gsap.context(() => {
      gsap.from(".site-header", {
        autoAlpha: 0,
        y: -16,
        duration: 0.5,
        ease: "power3.out",
      });

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.45 })
        .from(
          ".hero h1 > *",
          { autoAlpha: 0, yPercent: 72, duration: 0.8, stagger: 0.09 },
          "-=0.18",
        )
        .from(
          ".hero-support > *",
          { autoAlpha: 0, y: 22, duration: 0.5, stagger: 0.08 },
          "-=0.38",
        )
        .from(
          ".hero-work-preview figure",
          { autoAlpha: 0, y: 34, duration: 0.68, stagger: 0.1 },
          "-=0.22",
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
        autoAlpha: 0,
        yPercent: 45,
        duration: 0.78,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 76%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".manifesto p", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 66%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".work-heading > *", {
        autoAlpha: 0,
        y: 28,
        duration: 0.68,
        stagger: 0.08,
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
            autoAlpha: 0,
            y: 34,
            clipPath: "inset(0 0 12% 0)",
            duration: 0.78,
            ease: "power3.out",
          })
          .from(
            captionItems,
            { autoAlpha: 0, y: 14, duration: 0.42, stagger: 0.045, ease: "power2.out" },
            "-=0.38",
          );
      });

      gsap.from(".more-work-heading > *", {
        autoAlpha: 0,
        y: 26,
        duration: 0.64,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".more-work-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.set(".selected-project", { autoAlpha: 0, y: 26, scale: 0.985 });
      ScrollTrigger.batch(".selected-project", {
        start: "top 88%",
        onEnter: (items) => {
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.58,
            stagger: 0.055,
            ease: "power3.out",
            clearProps: "transform",
            overwrite: true,
          });
        },
        onLeaveBack: (items) => {
          gsap.to(items, {
            autoAlpha: 0,
            y: 26,
            scale: 0.985,
            duration: 0.42,
            stagger: 0.035,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });

      gsap.from(".about-heading h2 span", {
        autoAlpha: 0,
        yPercent: 42,
        duration: 0.74,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-content > *", {
        autoAlpha: 0,
        y: 30,
        duration: 0.68,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".capability-index span", {
        autoAlpha: 0,
        y: 18,
        duration: 0.48,
        stagger: 0.055,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".capability-index",
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".process-heading h2 span", {
        autoAlpha: 0,
        yPercent: 42,
        duration: 0.74,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".process-section li", {
        autoAlpha: 0,
        y: 24,
        duration: 0.56,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-section ol",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-section h2 span", {
        autoAlpha: 0,
        yPercent: 42,
        duration: 0.76,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-links a", {
        autoAlpha: 0,
        y: 22,
        duration: 0.52,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-links",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      const snapSections = gsap.utils.toArray<HTMLElement>("[data-snap-section]");
      ScrollTrigger.create({
        id: "section-snap",
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        snap: {
          snapTo: (progress) => {
            const maxScroll = ScrollTrigger.maxScroll(window);
            if (!maxScroll) return progress;

            const snapPoints = snapSections.map((section) =>
              gsap.utils.clamp(0, 1, section.offsetTop / maxScroll),
            );
            const nearest = snapPoints.reduce((closest, point) =>
              Math.abs(point - progress) < Math.abs(closest - progress) ? point : closest,
            snapPoints[0] ?? progress);
            const distance = Math.abs(nearest - progress) * maxScroll;
            const snapRange = Math.min(window.innerHeight * 0.3, 280);

            return distance <= snapRange ? nearest : progress;
          },
          delay: 0.05,
          duration: { min: 0.18, max: 0.38 },
          ease: "power2.inOut",
          inertia: false,
        },
      });
    }, scope);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(() => {
      if (isActive) refresh();
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
