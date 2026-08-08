"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const protectedParents = "script, style, noscript, code, pre, kbd, samp";

const protectCompoundWords = (root: HTMLElement) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    const parent = node.parentElement;
    const value = node.textContent ?? "";

    if (parent && !parent.closest(protectedParents) && value.includes("-")) {
      const protectedValue = value.replace(/([A-Za-z0-9])-(?=[A-Za-z0-9])/g, "$1‑");
      if (protectedValue !== value) node.textContent = protectedValue;
    }

    node = walker.nextNode();
  }
};

export default function TypographyGuard() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const root = document.querySelector<HTMLElement>(".site-page");
      if (root) protectCompoundWords(root);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
