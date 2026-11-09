import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BackgroundWash } from "@/components/background-wash";
import { AdminNav } from "@/components/admin/admin-nav";
import { SubmitButton } from "@/components/admin/submit-button";
import { ghostClass } from "@/components/admin/ui";
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
      <div className="mx-auto min-h-screen max-w-6xl px-5 py-6 md:py-10">
        <div className="grid gap-6 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="md:sticky md:top-8 md:self-start">
            <div className="rounded-[1.6rem] border border-line bg-card/90 p-5 backdrop-blur-md">
              <div className="flex items-start justify-between gap-3 md:block">
                <div>
                  <p className="text-xs tracking-[0.16em] text-muted uppercase">Admin</p>
                  <p className="mt-1 font-serif text-2xl tracking-tight">Portfolio</p>
                  <p className="mt-2 hidden text-sm text-muted md:block">Edit the live site content.</p>
                </div>
                <Link href="/" className={`${ghostClass} md:hidden`} target="_blank" rel="noreferrer">
                  View site
                </Link>
              </div>

              <div className="mt-5 border-t border-line pt-5">
                <AdminNav links={links} />
              </div>

              <div className="mt-5 hidden border-t border-line pt-5 md:grid md:gap-2">
                <Link href="/" className={ghostClass} target="_blank" rel="noreferrer">
                  View site ↗
                </Link>
                <form action={logout}>
                  <SubmitButton className={`${ghostClass} w-full justify-start px-3.5`} pendingLabel="Signing out…">
                    Log out
                  </SubmitButton>
                </form>
              </div>
            </div>

            <form action={logout} className="mt-3 md:hidden">
              <SubmitButton className={`${ghostClass} px-1`} pendingLabel="Signing out…">
                Log out
              </SubmitButton>
            </form>
          </aside>

          <main className="min-w-0 pb-10">{children}</main>
        </div>
      </div>
    </>
  );
}
