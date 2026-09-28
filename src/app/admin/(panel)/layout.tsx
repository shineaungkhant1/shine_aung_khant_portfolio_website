import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BackgroundWash } from "@/components/background-wash";
import { AdminNav } from "@/components/admin/admin-nav";
import { SubmitButton } from "@/components/admin/submit-button";
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
          <AdminNav links={links} />
          <form action={logout}>
            <SubmitButton className="text-sm text-muted hover:text-ink" pendingLabel="Signing out…">
              Log out
            </SubmitButton>
          </form>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
