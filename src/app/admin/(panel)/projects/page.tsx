import Link from "next/link";
import { EmptyState, Notice, PageHeader, primaryClass } from "@/components/admin/ui";
import { redirectOnApiError } from "@/lib/admin-problem";
import { apiGet, type ApiProject } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const query = await searchParams;
  let projects: ApiProject[];
  try {
    projects = await apiGet<ApiProject[]>("/api/projects");
  } catch (error) {
    redirectOnApiError(error);
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Projects"
        description="Manage case studies and which ones appear on the home page."
        actions={
          <Link href="/admin/projects/new" className={primaryClass}>
            New project
          </Link>
        }
      />
      <Notice saved={query.saved} error={query.error} />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          body="Create the first project to populate the work section."
          action={
            <Link href="/admin/projects/new" className={primaryClass}>
              New project
            </Link>
          }
        />
      ) : (
        <ul className="overflow-hidden rounded-[1.4rem] border border-line bg-card">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className={`flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)] ${
                index > 0 ? "border-t border-line" : ""
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-medium">{project.name}</p>
                  {project.featured ? (
                    <span className="rounded-full bg-[color-mix(in_srgb,var(--moss)_16%,transparent)] px-2.5 py-0.5 text-xs text-moss">
                      Featured
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 truncate text-sm text-muted">
                  {project.category} · {project.org} · {project.period}
                </p>
              </div>
              <Link
                href={`/admin/projects/${project.slug}`}
                className="shrink-0 rounded-full px-3 py-2 text-sm text-clay transition hover:bg-[color-mix(in_srgb,var(--clay)_10%,transparent)]"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
