import { saveProfile } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { Notice, PageHeader, Panel, fieldClass, hintClass, labelClass, primaryClass } from "@/components/admin/ui";
import { redirectOnApiError } from "@/lib/admin-problem";
import { apiGet, type ApiProfile } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

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
    redirectOnApiError(error);
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Profile"
        description="This is the identity block on the home page: name, role, contact links, and the short summary."
      />
      <Notice saved={query.saved} error={query.error} />

      <form action={saveProfile} className="grid gap-5">
        <Panel title="Identity" description="Shown in the hero and about sections.">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Name
              <input className={fieldClass} name="name" required defaultValue={profile.name} />
            </label>
            <label className={labelClass}>
              Role
              <input className={fieldClass} name="role" required defaultValue={profile.role} />
            </label>
            <label className={labelClass}>
              Location
              <input className={fieldClass} name="location" required defaultValue={profile.location} />
            </label>
            <label className={labelClass}>
              Origin
              <input className={fieldClass} name="origin" required defaultValue={profile.origin} />
            </label>
          </div>
        </Panel>

        <Panel title="Contact" description="Email, phone, and social links used across the site.">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Email
              <input className={fieldClass} name="email" required defaultValue={profile.email} />
            </label>
            <label className={labelClass}>
              Email link
              <input className={fieldClass} name="emailHref" required defaultValue={profile.emailHref} />
              <span className={hintClass}>Usually a mailto or Gmail compose URL.</span>
            </label>
            <label className={labelClass}>
              Phone
              <input className={fieldClass} name="phone" required defaultValue={profile.phone} />
            </label>
            <label className={labelClass}>
              Phone link
              <input className={fieldClass} name="phoneHref" required defaultValue={profile.phoneHref} />
            </label>
            <label className={labelClass}>
              LinkedIn
              <input className={fieldClass} name="linkedin" required defaultValue={profile.linkedin} />
            </label>
            <label className={labelClass}>
              GitHub
              <input className={fieldClass} name="github" required defaultValue={profile.github} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Resume path
              <input className={fieldClass} name="resume" required defaultValue={profile.resume} />
              <span className={hintClass}>Public path such as /Shine-Aung-Khant-Resume.pdf</span>
            </label>
          </div>
        </Panel>

        <Panel title="Summary">
          <label className={labelClass}>
            About text
            <textarea className={fieldClass} name="summary" required rows={5} defaultValue={profile.summary} />
          </label>
        </Panel>

        <div className="sticky bottom-4 z-10 flex justify-end">
          <SubmitButton className={`${primaryClass} shadow-[0_12px_40px_-18px_rgba(28,25,21,0.65)]`} pendingLabel="Saving…">
            Save profile
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
