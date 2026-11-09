import { createExperience, deleteExperience, updateExperience } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import {
  Notice,
  PageHeader,
  Panel,
  dangerClass,
  fieldClass,
  hintClass,
  labelClass,
  primaryClass,
  secondaryClass,
} from "@/components/admin/ui";
import { redirectOnApiError } from "@/lib/admin-problem";
import { apiGet, type ApiExperience } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

function ExperienceForm({
  item,
  action,
  submit,
}: {
  item?: ApiExperience;
  action: (formData: FormData) => Promise<void>;
  submit: string;
}) {
  return (
    <form action={action} className="grid gap-4">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
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
        <textarea
          className={fieldClass}
          name="points"
          rows={4}
          defaultValue={item?.points.join("\n") ?? ""}
          placeholder="One point per line"
        />
        <span className={hintClass}>Each line becomes a bullet on the public site.</span>
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
    redirectOnApiError(error);
  }

  return (
    <div className="grid gap-6">
      <PageHeader title="Experience" description="Roles and bullet points that appear in the about / career sections." />
      <Notice saved={query.saved} error={query.error} />

      <Panel title="Add a role" description="Create a new experience entry.">
        <ExperienceForm action={createExperience} submit="Add role" />
      </Panel>

      <div className="grid gap-4">
        {items.map((item) => (
          <Panel key={item.id} title={item.role} description={`${item.org} · ${item.place} · ${item.period}`}>
            <ExperienceForm item={item} action={updateExperience} submit="Save role" />
            <form action={deleteExperience} className="mt-4 border-t border-line pt-4">
              <input type="hidden" name="id" value={item.id} />
              <SubmitButton className={dangerClass} pendingLabel="Deleting…" confirmMessage={`Delete ${item.role}?`}>
                Delete role
              </SubmitButton>
            </form>
          </Panel>
        ))}
      </div>
    </div>
  );
}
