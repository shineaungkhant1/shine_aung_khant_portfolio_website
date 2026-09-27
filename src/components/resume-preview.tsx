"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowIcon, DownloadIcon } from "@/components/icons";
import { profile } from "@/lib/data";

const pages = [
  {
    src: "/resume/page-1.png",
    links: [
      {
        label: "Email Shine Aung Khant",
        href: "https://mail.google.com/mail/?view=cm&fs=1&to=shineaungkhant1@gmail.com",
        left: "37.82%",
        top: "17.5%",
        width: "19.88%",
        height: "1.3%",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/shine-aung-khant",
        left: "37.82%",
        top: "20.05%",
        width: "33.09%",
        height: "1.3%",
      },
      {
        label: "GitHub",
        href: "https://github.com/shineaungkhant1",
        left: "37.82%",
        top: "22.7%",
        width: "25.82%",
        height: "1.3%",
      },
      {
        label: "Flutter Developer Certificate",
        href: "https://drive.google.com/drive/folders/1Mdl13YRT59k_RtjT4-Cq11rWFYNzIx5H",
        left: "1.94%",
        top: "53.2%",
        width: "24.48%",
        height: "1.45%",
      },
      {
        label: "Advanced Java Certificate",
        href: "https://drive.google.com/drive/folders/18TwUmtbzciJB4dM7PUdSKXqKq_9VVCzD",
        left: "1.82%",
        top: "55.5%",
        width: "19.51%",
        height: "1.35%",
      },
      {
        label: "PHP Programming Professional Certificate",
        href: "https://drive.google.com/drive/folders/1Rvke1J47QfDX5PFLmZ0jVycUoMbXeZb2",
        left: "1.94%",
        top: "57.9%",
        width: "23.52%",
        height: "3.2%",
      },
      {
        label: "Google Cybersecurity Professional Certificate",
        href: "https://www.coursera.org/account/accomplishments/professional-cert/CVIQJ9IQX49D",
        left: "1.94%",
        top: "62.1%",
        width: "25.7%",
        height: "3.2%",
      },
      {
        label: "EF SET English Certificate",
        href: "https://cert.efset.org/en/L14RPP",
        left: "1.94%",
        top: "66.2%",
        width: "19.75%",
        height: "1.5%",
      },
      {
        label: "Recommendation letter",
        href: "https://drive.google.com/file/d/1gO3RiV2DeGbyiVJvlo8ZlUZ2NiGZjitb/view",
        left: "3.52%",
        top: "95.85%",
        width: "25.46%",
        height: "3.1%",
      },
    ],
  },
  { src: "/resume/page-2.png", links: [] },
  { src: "/resume/page-3.png", links: [] },
];

export function ResumePreview() {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"enter" | "next" | "prev">("enter");

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest("[data-resume-preview]");
      if (!trigger) return;
      event.preventDefault();
      setIndex(0);
      setDirection("enter");
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => setShown(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") turn(1);
      if (event.key === "ArrowLeft") turn(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setShown(false);
    window.setTimeout(() => setOpen(false), 420);
  }

  function turn(step: number) {
    setIndex((current) => {
      const next = Math.min(pages.length - 1, Math.max(0, current + step));
      if (next === current) return current;
      setDirection(step > 0 ? "next" : "prev");
      return next;
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close resume preview"
        className={`resume-backdrop absolute inset-0 bg-ink/85 ${shown ? "is-in" : ""}`}
        onClick={close}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex h-full w-full flex-col px-4 py-4 outline-none sm:px-8"
      >
        <div className={`flex w-full shrink-0 items-center justify-between text-paper ${shown ? "resume-backdrop is-in" : "resume-backdrop"}`}>
          <p id={titleId} className="font-serif text-2xl tracking-tight">
            Resume
          </p>
          <button type="button" onClick={close} className="press h-10 rounded-full px-3 text-sm hover:text-clay">
            Close
          </button>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden py-4">
          <div className={`resume-sheet relative flex h-full max-w-full items-center justify-center ${shown ? "is-in" : ""}`}>
            <div key={`${index}-${direction}`} className="relative max-h-full">
              <div aria-hidden="true" className="absolute inset-x-3 top-2 -bottom-2 rounded-sm bg-white/55 shadow-lg" />
              <img
                src={pages[index].src}
                alt={`Resume page ${index + 1} of ${pages.length}`}
                className={`resume-page relative block h-auto max-h-[calc(100dvh-9rem)] w-auto max-w-full rounded-sm bg-white object-contain shadow-2xl ${
                  direction === "next" ? "is-next" : direction === "prev" ? "is-prev" : ""
                }`}
              />
              {pages[index].links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="resume-hotspot absolute z-10"
                  style={{ left: link.left, top: link.top, width: link.width, height: link.height }}
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={`flex w-full shrink-0 flex-wrap items-center justify-between gap-3 ${shown ? "resume-backdrop is-in" : "resume-backdrop"}`}>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => turn(-1)}
              disabled={index === 0}
              className="press inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm text-paper hover:text-clay disabled:opacity-40"
            >
              <ArrowIcon direction="left" />
              Previous
            </button>
            <p className="text-sm text-paper/80">
              {index + 1} / {pages.length}
            </p>
            <button
              type="button"
              onClick={() => turn(1)}
              disabled={index === pages.length - 1}
              className="press inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm text-paper hover:text-clay disabled:opacity-40"
            >
              Next
              <ArrowIcon />
            </button>
          </div>
          <a
            href={profile.resume}
            download="Shine-Aung-Khant-Resume.pdf"
            className="press inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 text-sm whitespace-nowrap text-ink hover:bg-clay hover:text-paper"
          >
            <DownloadIcon />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
