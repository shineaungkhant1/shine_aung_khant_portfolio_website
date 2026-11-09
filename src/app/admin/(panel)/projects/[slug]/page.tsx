import { notFound } from "next/navigation";
import { deleteProject, updateProject } from "@/app/admin/actions";
import { ProjectFields } from "@/components/admin/project-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { BackLink, Notice, PageHeader, Panel, dangerClass, primaryClass } from "@/components/admin/ui";
import { redirectOnApiError } from "@/lib/admin-problem";
import { ApiError, apiGet, type ApiProject } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  let project: ApiProject;
  try {
    project = await apiGet<ApiProject>(`/api/projects/${slug}`);
  } catch (error) {
    if (error instanceof ApiError && error.message === "Project not found") notFound();
    redirectOnApiError(error);
  }

  return (
    <div className="grid gap-6">
      <div>
        <BackLink href="/admin/projects">Projects</BackLink>
        <div className="mt-4">
          <PageHeader
            title={project.name}
            description={`${project.category} · ${project.org} · ${project.period}`}
          />
        </div>
      </div>
      <Notice saved={query.saved} error={query.error} />

      <form action={updateProject} className="grid gap-5">
        <Panel title="Project details">
          <ProjectFields project={project} />
        </Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SubmitButton className={primaryClass} pendingLabel="Saving…">
            Save project
          </SubmitButton>
        </div>
      </form>

      <Panel title="Danger zone" description="Deleting removes this project from the API and the public site.">
        <form action={deleteProject}>
          <input type="hidden" name="slug" value={project.slug} />
          <SubmitButton className={dangerClass} pendingLabel="Deleting…" confirmMessage="Delete this project?">
            Delete project
          </SubmitButton>
        </form>
      </Panel>
    </div>
  );
}
