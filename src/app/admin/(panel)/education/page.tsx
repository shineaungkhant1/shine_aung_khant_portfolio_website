import { createEducation, deleteEducation, updateEducation } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import {
  Notice,
  PageHeader,
  Panel,
  dangerClass,
  fieldClass,
  labelClass,
  primaryClass,
  secondaryClass,
} from "@/components/admin/ui";
import { redirectOnApiError } from "@/lib/admin-problem";
import { apiGet, type ApiEducation } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

export default async function EducationAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const query = await searchParams;
  let items: ApiEducation[];
  try {
    items = await apiGet<ApiEducation[]>("/api/education");
  } catch (error) {
    redirectOnApiError(error);
  }

  return (
    <div className="grid gap-6">
      <PageHeader title="Education" description="Schools and programs listed on the public site." />
      <Notice saved={query.saved} error={query.error} />

      <Panel title="Add education">
        <form action={createEducation} className="grid gap-4">
          <label className={labelClass}>
            Title
            <input className={fieldClass} name="title" required />
          </label>
          <label className={labelClass}>
            School
            <input className={fieldClass} name="org" required />
          </label>
          <label className={labelClass}>
            Period
            <input className={fieldClass} name="period" required />
          </label>
          <div>
            <SubmitButton className={primaryClass} pendingLabel="Adding…">
              Add education
            </SubmitButton>
          </div>
        </form>
      </Panel>

      <div className="grid gap-4">
        {items.map((item) => (
          <Panel key={item.id} title={item.title} description={`${item.org} · ${item.period}`}>
            <form action={updateEducation} className="grid gap-4">
              <input type="hidden" name="id" value={item.id} />
              <label className={labelClass}>
                Title
                <input className={fieldClass} name="title" required defaultValue={item.title} />
              </label>
              <label className={labelClass}>
                School
                <input className={fieldClass} name="org" required defaultValue={item.org} />
              </label>
              <label className={labelClass}>
                Period
                <input className={fieldClass} name="period" required defaultValue={item.period} />
              </label>
              <div>
                <SubmitButton className={secondaryClass} pendingLabel="Saving…">
                  Save
                </SubmitButton>
              </div>
            </form>
            <form action={deleteEducation} className="mt-4 border-t border-line pt-4">
              <input type="hidden" name="id" value={item.id} />
              <SubmitButton className={dangerClass} pendingLabel="Deleting…" confirmMessage="Delete this education?">
                Delete
              </SubmitButton>
            </form>
          </Panel>
        ))}
      </div>
    </div>
  );
}
