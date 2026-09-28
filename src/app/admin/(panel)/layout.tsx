import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BackgroundWash } from "@/components/background-wash";
import { logout } from "@/app/admin/actions";
import { isAdmin } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/certifications", label: "Certificates" },
];

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <>
      <BackgroundWash />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:grid-cols-[11rem_1fr]">
        <aside className="flex flex-col gap-6">
          <div>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">Admin</p>
            <p className="mt-1 font-serif text-2xl tracking-tight">Portfolio</p>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 md:flex-col" aria-label="Admin">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted hover:text-ink">
                {link.label}
              </Link>
            ))}
            <Link href="/" className="text-sm text-muted hover:text-ink">
              View site
            </Link>
          </nav>
          <form action={logout}>
            <button type="submit" className="text-sm text-muted hover:text-ink">
              Log out
            </button>
          </form>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
