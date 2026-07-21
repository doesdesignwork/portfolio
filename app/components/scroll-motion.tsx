"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const scope = document.querySelector<HTMLElement>(".site-shell");
    if (!scope) return;

    const context = gsap.context(() => {
      gsap.from(".site-header", {
        autoAlpha: 0,
        y: -18,
        duration: 0.55,
        ease: "power3.out",
      });

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".hero-eyebrow", { autoAlpha: 0, y: 18, duration: 0.5 })
        .from(
          ".hero h1 > *",
          { autoAlpha: 0, yPercent: 105, duration: 0.82, stagger: 0.11 },
          "-=0.22",
        )
        .from(
          ".hero-support > *",
          { autoAlpha: 0, y: 26, duration: 0.55, stagger: 0.1 },
          "-=0.4",
        )
        .from(
          ".hero-work-preview figure",
          { autoAlpha: 0, y: 46, duration: 0.72, stagger: 0.12 },
          "-=0.25",
        );

      gsap.to(".hero h1 span", {
        xPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero h1 em", {
        xPercent: 3,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-work-main img", {
        scale: 1.07,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-work-preview",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 46,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".featured-project", {
        autoAlpha: 0,
        y: 54,
        duration: 0.78,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-work",
          start: "top 84%",
        },
      });

      gsap.from(".selected-project", {
        autoAlpha: 0,
        y: 38,
        duration: 0.68,
        stagger: 0.055,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".selected-work",
          start: "top 84%",
        },
      });

      gsap.to(".about-heading h2", {
        xPercent: -2.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".contact-section h2", {
        xPercent: 2.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });
    }, scope);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, []);

  return null;
}
