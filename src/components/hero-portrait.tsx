"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HeroPortrait() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const shift = Math.min(window.scrollY * 0.08, 36);
      node.style.translate = `0 ${shift}px`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure className="mx-auto w-full max-w-64 sm:max-w-xs lg:mx-0 lg:max-w-none">
      <div ref={frame} className="media-in relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-line">
        <Image
          src="/portrait.jpg"
          alt="Portrait of Shine Aung Khant"
          fill
          priority
          sizes="(min-width: 1024px) 380px, 256px"
          className="object-cover object-[center_15%]"
        />
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        Mid Flutter Developer at AXRA Tech. Studying BSc Computer Science.
      </figcaption>
    </figure>
  );
}
