"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-x-4 gap-y-2 md:flex-col" aria-label="Admin">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={active ? "text-sm text-ink" : "text-sm text-muted hover:text-ink"}
          >
            {link.label}
          </Link>
        );
      })}
      <Link href="/" className="text-sm text-muted hover:text-ink">
        View site
      </Link>
    </nav>
  );
}
