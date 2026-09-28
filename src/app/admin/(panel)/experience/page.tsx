import { createExperience, deleteExperience, updateExperience } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { Notice, dangerClass, fieldClass, labelClass, primaryClass, secondaryClass } from "@/components/admin/ui";
import { ApiError, apiGet, type ApiExperience } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

function ExperienceForm({ item, action, submit }: { item?: ApiExperience; action: (formData: FormData) => Promise<void>; submit: string }) {
  return (
    <form action={action} className="grid gap-3 rounded-[1.2rem] border border-line bg-card p-4">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClass}>
          Role
          <input className={fieldClass} name="role" required defaultValue={item?.role ?? ""} />
        </label>
        <label className={labelClass}>
          Organization
          <input className={fieldClass} name="org" required defaultValue={item?.org ?? ""} />
        </label>
        <label className={labelClass}>
          Place
          <input className={fieldClass} name="place" required defaultValue={item?.place ?? ""} />
        </label>
        <label className={labelClass}>
          Period
          <input className={fieldClass} name="period" required defaultValue={item?.period ?? ""} />
        </label>
      </div>
      <label className={labelClass}>
        Points
        <textarea className={fieldClass} name="points" rows={4} defaultValue={item?.points.join("\n") ?? ""} placeholder="One point per line" />
      </label>
      <div className="flex flex-wrap gap-3">
        <SubmitButton className={item ? secondaryClass : primaryClass} pendingLabel={item ? "Saving…" : "Adding…"}>
          {submit}
        </SubmitButton>
      </div>
    </form>
  );
}

export default async function ExperienceAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const query = await searchParams;
  let items: ApiExperience[];
  try {
    items = await apiGet<ApiExperience[]>("/api/experience");
  } catch (error) {
    const message = error instanceof ApiError ? error.message : "The API could not be reached.";
    return <p className="text-clay">{message}</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight">Experience</h1>
      <div className="mt-4">
        <Notice saved={query.saved} error={query.error} />
      </div>
      <div className="mt-6 grid gap-4">
        <ExperienceForm action={createExperience} submit="Add role" />
        {items.map((item) => (
          <div key={item.id} className="grid gap-3">
            <ExperienceForm item={item} action={updateExperience} submit="Save role" />
            <form action={deleteExperience}>
              <input type="hidden" name="id" value={item.id} />
              <SubmitButton className={dangerClass} pendingLabel="Deleting…" confirmMessage={`Delete ${item.role}?`}>
                Delete {item.role}
              </SubmitButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
