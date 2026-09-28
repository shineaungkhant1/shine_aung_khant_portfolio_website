import { saveProfile } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { Notice, fieldClass, labelClass, primaryClass } from "@/components/admin/ui";
import { ApiError, apiGet, type ApiProfile } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

const fields = [
  ["name", "Name"],
  ["role", "Role"],
  ["location", "Location"],
  ["origin", "Origin"],
  ["email", "Email"],
  ["emailHref", "Email link"],
  ["phone", "Phone"],
  ["phoneHref", "Phone link"],
  ["linkedin", "LinkedIn"],
  ["github", "GitHub"],
  ["resume", "Resume path"],
] as const;

export default async function ProfileAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const query = await searchParams;
  let profile: ApiProfile;
  try {
    profile = await apiGet<ApiProfile>("/api/profile");
  } catch (error) {
    const message = error instanceof ApiError ? error.message : "The API could not be reached.";
    return <p className="text-clay">{message}</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight">Profile</h1>
      <div className="mt-4">
        <Notice saved={query.saved} error={query.error} />
      </div>
      <form action={saveProfile} className="mt-6 grid max-w-2xl gap-4">
        {fields.map(([name, label]) => (
          <label key={name} className={labelClass}>
            {label}
            <input className={fieldClass} name={name} required defaultValue={profile[name]} />
          </label>
        ))}
        <label className={labelClass}>
          Summary
          <textarea className={fieldClass} name="summary" required rows={5} defaultValue={profile.summary} />
        </label>
        <SubmitButton className={primaryClass} pendingLabel="Saving…">
          Save profile
        </SubmitButton>
      </form>
    </div>
  );
}
