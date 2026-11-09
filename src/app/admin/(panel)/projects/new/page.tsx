import { createProject } from "@/app/admin/actions";
import { ProjectFields } from "@/components/admin/project-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { BackLink, Notice, PageHeader, Panel, primaryClass } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const query = await searchParams;

  return (
    <div className="grid gap-6">
      <div>
        <BackLink href="/admin/projects">Projects</BackLink>
        <div className="mt-4">
          <PageHeader title="New project" description="Add a case study. Images still live in the public folder." />
        </div>
      </div>
      <Notice error={query.error} />
      <form action={createProject} className="grid gap-5">
        <Panel title="Project details">
          <ProjectFields />
        </Panel>
        <div className="flex justify-end">
          <SubmitButton className={primaryClass} pendingLabel="Creating…">
            Create project
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
