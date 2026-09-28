import { createEducation, deleteEducation, updateEducation } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { Notice, dangerClass, fieldClass, labelClass, primaryClass, secondaryClass } from "@/components/admin/ui";
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
    <div>
      <h1 className="font-serif text-4xl tracking-tight">Education</h1>
      <div className="mt-4">
        <Notice saved={query.saved} error={query.error} />
      </div>
      <div className="mt-6 grid max-w-2xl gap-4">
        <form action={createEducation} className="grid gap-3 rounded-[1.2rem] border border-line bg-card p-4">
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
          <SubmitButton className={primaryClass} pendingLabel="Adding…">
            Add education
          </SubmitButton>
        </form>
        {items.map((item) => (
          <div key={item.id} className="grid gap-3">
            <form action={updateEducation} className="grid gap-3 rounded-[1.2rem] border border-line bg-card p-4">
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
              <SubmitButton className={secondaryClass} pendingLabel="Saving…">
                Save
              </SubmitButton>
            </form>
            <form action={deleteEducation}>
              <input type="hidden" name="id" value={item.id} />
              <SubmitButton className={dangerClass} pendingLabel="Deleting…" confirmMessage="Delete this education?">
                Delete
              </SubmitButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
