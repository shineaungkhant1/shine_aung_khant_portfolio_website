import Link from "next/link";
import { PageHeader, primaryClass, secondaryClass } from "@/components/admin/ui";
import { redirectOnApiError } from "@/lib/admin-problem";
import { apiGet, type ApiCertification, type ApiEducation, type ApiExperience, type ApiProject } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  try {
    const [projects, experience, education, certifications] = await Promise.all([
      apiGet<ApiProject[]>("/api/projects"),
      apiGet<ApiExperience[]>("/api/experience"),
      apiGet<ApiEducation[]>("/api/education"),
      apiGet<ApiCertification[]>("/api/certifications"),
    ]);

    const featured = projects.filter((project) => project.featured).length;
    const cards = [
      {
        href: "/admin/projects",
        label: "Projects",
        count: projects.length,
        detail: featured ? `${featured} featured on the home page` : "None featured yet",
      },
      {
        href: "/admin/experience",
        label: "Experience",
        count: experience.length,
        detail: "Roles and work history",
      },
      {
        href: "/admin/education",
        label: "Education",
        count: education.length,
        detail: "Schools and programs",
      },
      {
        href: "/admin/certifications",
        label: "Certificates",
        count: certifications.length,
        detail: "Links visitors can open",
      },
    ];

    return (
      <div className="grid gap-8">
        <PageHeader
          title="Overview"
          description="Edit the content that powers the public portfolio. Changes save to the API and show on the site after the next refresh."
          actions={
            <>
              <Link href="/admin/projects/new" className={primaryClass}>
                New project
              </Link>
              <Link href="/admin/profile" className={secondaryClass}>
                Edit profile
              </Link>
            </>
          }
        />

        <ul className="grid gap-3 sm:grid-cols-2">
          {cards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="group block rounded-[1.4rem] border border-line bg-card p-5 transition hover:border-ink/40 hover:bg-[color-mix(in_srgb,var(--card)_88%,var(--ink))]"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-muted">{card.label}</p>
                  <span className="text-sm text-muted transition group-hover:text-ink">Open →</span>
                </div>
                <p className="mt-4 font-serif text-5xl tracking-tight">{card.count}</p>
                <p className="mt-3 text-sm text-muted">{card.detail}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    redirectOnApiError(error);
  }
}
