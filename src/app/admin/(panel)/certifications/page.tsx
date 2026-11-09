import { createCertification, deleteCertification, updateCertification } from "@/app/admin/actions";
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
import { apiGet, type ApiCertification } from "@/lib/portfolio-api";

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
    redirectOnApiError(error);
  }

  return (
    <div className="grid gap-6">
      <PageHeader title="Certificates" description="Credential titles and the links visitors open from the resume and about pages." />
      <Notice saved={query.saved} error={query.error} />

      <Panel title="Add certificate">
        <form action={createCertification} className="grid gap-4">
          <label className={labelClass}>
            Title
            <input className={fieldClass} name="title" required />
          </label>
          <label className={labelClass}>
            Link
            <input className={fieldClass} name="href" required placeholder="https://" />
            <span className={hintClass}>Use a public URL to the certificate or folder.</span>
          </label>
          <div>
            <SubmitButton className={primaryClass} pendingLabel="Adding…">
              Add certificate
            </SubmitButton>
          </div>
        </form>
      </Panel>

      <div className="grid gap-4">
        {items.map((item) => (
          <Panel key={item.id} title={item.title}>
            <form action={updateCertification} className="grid gap-4">
              <input type="hidden" name="id" value={item.id} />
              <label className={labelClass}>
                Title
                <input className={fieldClass} name="title" required defaultValue={item.title} />
              </label>
              <label className={labelClass}>
                Link
                <input className={fieldClass} name="href" required defaultValue={item.href} />
              </label>
              <div>
                <SubmitButton className={secondaryClass} pendingLabel="Saving…">
                  Save
                </SubmitButton>
              </div>
            </form>
            <form action={deleteCertification} className="mt-4 border-t border-line pt-4">
              <input type="hidden" name="id" value={item.id} />
              <SubmitButton className={dangerClass} pendingLabel="Deleting…" confirmMessage="Delete this certificate?">
                Delete
              </SubmitButton>
            </form>
          </Panel>
        ))}
      </div>
    </div>
  );
}
