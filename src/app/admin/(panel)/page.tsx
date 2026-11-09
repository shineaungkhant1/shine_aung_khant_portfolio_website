import Link from "next/link";
import { PageHeader, Panel, primaryClass, secondaryClass } from "@/components/admin/ui";
import { VisitorsChart } from "@/components/admin/visitors-chart";
import { redirectOnApiError } from "@/lib/admin-problem";
import {
  apiGet,
  type ApiAnalyticsSummary,
  type ApiCertification,
  type ApiEducation,
  type ApiExperience,
  type ApiProject,
} from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

const emptyAnalytics: ApiAnalyticsSummary = {
  todayViews: 0,
  todayVisitors: 0,
  weekViews: 0,
  weekVisitors: 0,
  last7Days: [],
  topPages: [],
};

export default async function AdminHomePage() {
  try {
    const [projects, experience, education, certifications, analytics] = await Promise.all([
      apiGet<ApiProject[]>("/api/projects"),
      apiGet<ApiExperience[]>("/api/experience"),
      apiGet<ApiEducation[]>("/api/education"),
      apiGet<ApiCertification[]>("/api/certifications"),
      apiGet<ApiAnalyticsSummary>("/api/analytics/summary").catch(() => emptyAnalytics),
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

        <Panel title="Visitors" description="Anonymous page views from the public site. Admin routes are excluded.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Views today", value: analytics.todayViews },
              { label: "Visitors today", value: analytics.todayVisitors },
              { label: "Views · 7 days", value: analytics.weekViews },
              { label: "Visitors · 7 days", value: analytics.weekVisitors },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-paper/70 px-4 py-4">
                <p className="text-xs tracking-[0.14em] text-muted uppercase">{stat.label}</p>
                <p className="mt-3 font-serif text-4xl tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <VisitorsChart days={analytics.last7Days} />

            <div>
              <p className="text-sm font-medium text-ink">Top pages</p>
              {analytics.topPages.length === 0 ? (
                <p className="mt-4 text-sm text-muted">No public visits recorded yet.</p>
              ) : (
                <ul className="mt-4 grid gap-3">
                  {analytics.topPages.map((page) => (
                    <li key={page.path} className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="truncate font-medium text-ink">{page.path}</span>
                      <span className="shrink-0 text-muted">
                        {page.views} views · {page.uniqueVisitors} visitors
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Panel>

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
