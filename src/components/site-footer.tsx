import { getProfile } from "@/lib/content";

export async function SiteFooter() {
  const profile = await getProfile();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a className="nav-link" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="nav-link" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="nav-link" href={profile.emailHref} target="_blank" rel="noreferrer">Email</a>
          <a className="nav-link" href={profile.resume} data-resume-preview>
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
