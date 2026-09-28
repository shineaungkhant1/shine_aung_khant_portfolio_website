import { createCertification, deleteCertification, updateCertification } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { Notice, dangerClass, fieldClass, labelClass, primaryClass, secondaryClass } from "@/components/admin/ui";
import { ApiError, apiGet, type ApiCertification } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

export default async function CertificationsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const query = await searchParams;
  let items: ApiCertification[];
  try {
    items = await apiGet<ApiCertification[]>("/api/certifications");
  } catch (error) {
    const message = error instanceof ApiError ? error.message : "The API could not be reached.";
    return <p className="text-clay">{message}</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight">Certificates</h1>
      <div className="mt-4">
        <Notice saved={query.saved} error={query.error} />
      </div>
      <div className="mt-6 grid max-w-2xl gap-4">
        <form action={createCertification} className="grid gap-3 rounded-[1.2rem] border border-line bg-card p-4">
          <label className={labelClass}>
            Title
            <input className={fieldClass} name="title" required />
          </label>
          <label className={labelClass}>
            Link
            <input className={fieldClass} name="href" required />
          </label>
          <SubmitButton className={primaryClass} pendingLabel="Adding…">
            Add certificate
          </SubmitButton>
        </form>
        {items.map((item) => (
          <div key={item.id} className="grid gap-3">
            <form action={updateCertification} className="grid gap-3 rounded-[1.2rem] border border-line bg-card p-4">
              <input type="hidden" name="id" value={item.id} />
              <label className={labelClass}>
                Title
                <input className={fieldClass} name="title" required defaultValue={item.title} />
              </label>
              <label className={labelClass}>
                Link
                <input className={fieldClass} name="href" required defaultValue={item.href} />
              </label>
              <SubmitButton className={secondaryClass} pendingLabel="Saving…">
                Save
              </SubmitButton>
            </form>
            <form action={deleteCertification}>
              <input type="hidden" name="id" value={item.id} />
              <SubmitButton className={dangerClass} pendingLabel="Deleting…" confirmMessage="Delete this certificate?">
                Delete
              </SubmitButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
