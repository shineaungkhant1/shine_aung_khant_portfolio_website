import { createProject } from "@/app/admin/actions";
import { ProjectFields } from "@/components/admin/project-fields";
import { Notice, primaryClass } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const query = await searchParams;

  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight">New project</h1>
      <div className="mt-4">
        <Notice error={query.error} />
      </div>
      <form action={createProject} className="mt-6 max-w-2xl">
        <ProjectFields />
        <button className={`${primaryClass} mt-6`} type="submit">
          Create project
        </button>
      </form>
    </div>
  );
}
