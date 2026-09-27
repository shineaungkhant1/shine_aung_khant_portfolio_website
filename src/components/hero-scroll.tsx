"use client";

import { useEffect, useRef } from "react";

export function HeroScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const distance = Math.max(rect.height * 0.72, 1);
      const leave = Math.min(1, Math.max(0, -rect.top / distance));
      node.style.setProperty("--leave", leave.toFixed(3));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className="hero-scroll mx-auto grid max-w-6xl items-center gap-8 px-5 pt-8 pb-12 sm:gap-12 sm:pt-14 sm:pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20">
      {children}
    </section>
  );
}
