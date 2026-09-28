"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ resumeHref }: { resumeHref: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [bar, setBar] = useState({ x: 0, width: 0, visible: false });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    if (open) {
      setMounted(true);
      const frame = window.requestAnimationFrame(() => setShown(true));
      document.body.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      return () => {
        window.cancelAnimationFrame(frame);
        document.body.style.overflow = "";
        main?.removeAttribute("inert");
        footer?.removeAttribute("inert");
      };
    }

    setShown(false);
    document.body.style.overflow = "";
    main?.removeAttribute("inert");
    footer?.removeAttribute("inert");
    const timer = window.setTimeout(() => setMounted(false), 220);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const bar = progress.current;
    if (!bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const value = max > 0 ? doc.scrollTop / max : 0;
      bar.style.transform = `scaleX(${value})`;
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
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function placeBar(target: HTMLElement | null) {
    if (!target) {
      setBar((current) => ({ ...current, visible: false }));
      return;
    }
    setBar({ x: target.offsetLeft, width: target.offsetWidth, visible: true });
  }

  useEffect(() => {
    const measure = () => {
      const current = navRef.current?.querySelector<HTMLElement>("[data-nav-current]");
      if (!current || current.offsetWidth === 0) {
        setBar((value) => (value.visible ? { ...value, visible: false } : value));
        return;
      }
      const x = current.offsetLeft;
      const width = current.offsetWidth;
      setBar((value) =>
        value.x === x && value.width === width && value.visible ? value : { x, width, visible: true },
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href === "/#contact" && pathname === "/") {
      event.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("contact")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
    window.setTimeout(() => setOpen(false), 0);
  }

  return (
    <>
    <header className="sticky top-0 z-40">
      <div className="relative border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-line/70" aria-hidden="true">
        <div ref={progress} className="h-full origin-left bg-clay" style={{ transform: "scaleX(0)" }} />
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
        <Link
          href="/"
          className="min-w-0 truncate font-serif text-base tracking-tight sm:text-lg"
          onClick={() => setOpen(false)}
        >
          Shine Aung Khant
        </Link>
        <div className="flex shrink-0 items-center gap-1 sm:gap-5">
          <nav
            ref={navRef}
            className="relative hidden items-center gap-7 text-sm text-muted md:flex"
            aria-label="Primary"
            onMouseLeave={() => placeBar(navRef.current?.querySelector<HTMLElement>("[data-nav-current]") ?? null)}
          >
            {links.map((link) => {
              const current = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-nav-current={current ? "" : undefined}
                  onClick={(event) => handleNavClick(event, link.href)}
                  onMouseEnter={(event) => placeBar(event.currentTarget)}
                  className={`relative py-1 transition-colors duration-200 ${current ? "text-ink" : "hover:text-ink"}`}
                  aria-current={current ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={resumeHref}
              data-resume-preview
              className="relative py-1 transition-colors duration-200 hover:text-ink"
              onMouseEnter={(event) => placeBar(event.currentTarget)}
            >
              Resume
            </a>
            <span
              className="nav-indicator"
              style={{
                width: bar.width,
                transform: `translateX(${bar.x}px)`,
                opacity: bar.visible ? 1 : 0,
              }}
            />
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 items-center px-2 text-sm text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      </div>
    </header>
      {mounted ? (
        <div
          className={`mobile-nav fixed inset-x-0 top-16 bottom-0 z-30 bg-paper/95 backdrop-blur-md transition duration-200 md:hidden ${
            shown ? "is-in opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <nav id="mobile-nav" className="px-5 py-4" aria-label="Mobile">
            <ul className="grid gap-1 text-2xl">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-12 items-center border-b border-line"
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={(event) => handleNavClick(event, link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={resumeHref}
                  data-resume-preview
                  className="flex min-h-12 items-center"
                  onClick={() => {
                    window.setTimeout(() => setOpen(false), 0);
                  }}
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
