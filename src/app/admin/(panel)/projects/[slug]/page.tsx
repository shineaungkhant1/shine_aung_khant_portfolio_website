import { notFound } from "next/navigation";
import { deleteProject, updateProject } from "@/app/admin/actions";
import { ProjectFields } from "@/components/admin/project-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { Notice, dangerClass, primaryClass } from "@/components/admin/ui";
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
    <div>
      <h1 className="font-serif text-4xl tracking-tight">{project.name}</h1>
      <div className="mt-4">
        <Notice saved={query.saved} error={query.error} />
      </div>
      <form action={updateProject} className="mt-6 max-w-2xl">
        <ProjectFields project={project} />
        <SubmitButton className={`${primaryClass} mt-6`} pendingLabel="Saving…">
          Save project
        </SubmitButton>
      </form>
      <form action={deleteProject} className="mt-4">
        <input type="hidden" name="slug" value={project.slug} />
        <SubmitButton className={dangerClass} pendingLabel="Deleting…" confirmMessage="Delete this project?">
          Delete project
        </SubmitButton>
      </form>
    </div>
  );
}
