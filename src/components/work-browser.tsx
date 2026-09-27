"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { categories, type Category, type Project } from "@/lib/data";

export function WorkBrowser({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  );

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 border-b border-line bg-paper/90 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto" role="tablist" aria-label="Filter projects">
            {categories.map((category) => {
              const selected = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(category)}
                  className={`press h-10 shrink-0 rounded-full border px-3 text-sm ${
                    selected ? "border-ink bg-ink text-paper" : "border-line text-muted hover:text-ink"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <p className="shrink-0 text-sm text-muted tabular-nums">{visible.length}</p>
        </div>
      </div>
      <ul key={filter} className="page-enter mt-6 grid gap-4 lg:grid-cols-2">
        {visible.map((project, index) => (
          <li key={project.slug} className="reveal">
            <ProjectCard project={project} index={index + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}
