import type { Project } from "@/lib/data";

export function StoreLinks({
  project,
  prominent = false,
}: {
  project: Pick<Project, "name" | "appStore" | "playStore">;
  prominent?: boolean;
}) {
  if (!project.appStore && !project.playStore) {
    return (
      <p className="text-sm text-muted">Client delivery</p>
    );
  }

  const className = prominent
    ? "press inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm text-paper hover:bg-clay"
    : "press inline-flex h-10 items-center rounded-full border border-line px-3 text-sm hover:border-clay hover:text-clay";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.appStore ? (
        <a className={className} href={project.appStore} target="_blank" rel="noreferrer">
          App Store
          <span className="sr-only"> for {project.name}</span>
        </a>
      ) : null}
      {project.playStore ? (
        <a
          className={prominent ? className : `${className} hover:border-moss hover:text-moss`}
          href={project.playStore}
          target="_blank"
          rel="noreferrer"
        >
          Google Play
          <span className="sr-only"> for {project.name}</span>
        </a>
      ) : null}
    </div>
  );
}
