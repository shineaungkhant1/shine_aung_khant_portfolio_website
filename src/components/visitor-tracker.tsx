"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const STORAGE_KEY = "portfolio-visitor-id";

function visitorId() {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      return existing;
    }
    const created = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, created);
    return created;
  } catch {
    return null;
  }
}

function shouldSkip(path: string) {
  if (!path || path.startsWith("/admin") || path.startsWith("/api")) {
    return true;
  }
  if (typeof navigator !== "undefined" && "webdriver" in navigator && navigator.webdriver) {
    return true;
  }
  return false;
}

function sendPageview(path: string, id: string) {
  const payload = JSON.stringify({ path, visitorId: id });
  const blob = new Blob([payload], { type: "application/json" });
  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    if (navigator.sendBeacon("/api/pageview", blob)) {
      return;
    }
  }
  void fetch("/api/pageview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (shouldSkip(pathname)) {
      return;
    }
    const id = visitorId();
    if (!id) {
      return;
    }
    sendPageview(pathname, id);
  }, [pathname]);

  return null;
}
