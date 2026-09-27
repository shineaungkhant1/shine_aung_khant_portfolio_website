import Link from "next/link";
import { ProjectIcon } from "@/components/project-visual";
import { StoreLinks } from "@/components/store-links";
import type { Project } from "@/lib/data";

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
}) {
  return (
    <article className="card-lift group relative flex h-full flex-col rounded-[1.4rem] border border-line bg-card p-5 sm:p-6">
      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-[1] rounded-[1.4rem]"
      >
        <span className="sr-only">{project.name}</span>
      </Link>
      <div
        className={`pointer-events-none relative z-[2] grid gap-4 ${
          featured ? "sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <ProjectIcon slug={project.slug} name={project.name} size={featured ? 84 : 64} />
          {!featured ? (
            <p className="text-xs tracking-[0.16em] text-muted uppercase">
              {index !== undefined ? `${String(index).padStart(2, "0")} · ` : ""}
              {project.category}
            </p>
          ) : null}
        </div>
        <div>
          {featured ? (
            <p className="text-xs tracking-[0.16em] text-muted uppercase">{project.category}</p>
          ) : null}
          <h3 className="mt-1 font-serif text-[1.7rem] leading-tight tracking-tight transition-colors duration-300 group-hover:text-clay sm:text-3xl">
            {project.name}
          </h3>
          <p className={`mt-2 text-muted ${featured ? "max-w-2xl" : "line-clamp-3"}`}>{project.summary}</p>
          {project.outcome ? <p className="mt-3 text-sm leading-relaxed">{project.outcome}</p> : null}
          <p className="mt-3 text-sm text-muted">{project.org}</p>
        </div>
      </div>
      <div className="relative z-[3] mt-auto pt-5">
        <StoreLinks project={project} />
      </div>
    </article>
  );
}
