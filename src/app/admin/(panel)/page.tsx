import Link from "next/link";
import { ApiError, apiGet, type ApiCertification, type ApiEducation, type ApiExperience, type ApiProject } from "@/lib/portfolio-api";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  try {
    const [projects, experience, education, certifications] = await Promise.all([
      apiGet<ApiProject[]>("/api/projects"),
      apiGet<ApiExperience[]>("/api/experience"),
      apiGet<ApiEducation[]>("/api/education"),
      apiGet<ApiCertification[]>("/api/certifications"),
    ]);

    const cards = [
      { href: "/admin/projects", label: "Projects", count: projects.length },
      { href: "/admin/experience", label: "Experience", count: experience.length },
      { href: "/admin/education", label: "Education", count: education.length },
      { href: "/admin/certifications", label: "Certificates", count: certifications.length },
    ];

    return (
      <div>
        <h1 className="font-serif text-4xl tracking-tight">Overview</h1>
        <p className="mt-3 max-w-xl text-muted">
          Edits here are saved in the API. The public site reads them when API_URL is set. Project images stay in the public folder.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {cards.map((card) => (
            <li key={card.href}>
              <Link href={card.href} className="block rounded-[1.2rem] border border-line bg-card p-5 hover:border-ink">
                <p className="font-serif text-4xl tracking-tight">{card.count}</p>
                <p className="mt-2 text-muted">{card.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    const message = error instanceof ApiError ? error.message : "The API could not be reached.";
    return (
      <div>
        <h1 className="font-serif text-4xl tracking-tight">Overview</h1>
        <p className="mt-4 max-w-xl text-clay">{message}</p>
      </div>
    );
  }
}
