import Link from "next/link";
import { Notice, primaryClass } from "@/components/admin/ui";
import { ApiError, apiGet, type ApiProject } from "@/lib/portfolio-api";

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
    const message = error instanceof ApiError ? error.message : "The API could not be reached.";
    return <p className="text-clay">{message}</p>;
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-serif text-4xl tracking-tight">Projects</h1>
        <Link href="/admin/projects/new" className={primaryClass}>
          New project
        </Link>
      </div>
      <div className="mt-4">
        <Notice saved={query.saved} error={query.error} />
      </div>
      {projects.length === 0 ? <p className="mt-6 text-sm text-muted">No projects yet.</p> : null}
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {projects.map((project) => (
          <li key={project.slug} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="font-medium">{project.name}</p>
              <p className="text-sm text-muted">
                {project.category} · {project.org}
              </p>
            </div>
            <Link href={`/admin/projects/${project.slug}`} className="text-sm text-clay">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
