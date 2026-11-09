import type { Project } from "@/lib/data";
import { fieldClass, hintClass, labelClass } from "@/components/admin/ui";

const categories = ["Streaming", "Commerce", "Education", "Delivery"];

export function ProjectFields({ project }: { project?: Project }) {
  return (
    <div className="grid gap-5">
      {project?.slug ? <input type="hidden" name="originalSlug" value={project.slug} /> : null}

      <label className={labelClass}>
        Name
        <input className={fieldClass} name="name" required defaultValue={project?.name ?? ""} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Slug
          <input
            className={fieldClass}
            name="slug"
            defaultValue={project?.slug ?? ""}
            placeholder="Generated from the name if empty"
          />
          <span className={hintClass}>URL key for /work/your-slug</span>
        </label>
        <label className={labelClass}>
          Category
          <select className={fieldClass} name="category" defaultValue={project?.category ?? "Streaming"}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Organization
          <input className={fieldClass} name="org" required defaultValue={project?.org ?? ""} />
        </label>
        <label className={labelClass}>
          Period
          <input className={fieldClass} name="period" required defaultValue={project?.period ?? ""} />
        </label>
      </div>

      <label className={labelClass}>
        Summary
        <textarea className={fieldClass} name="summary" required rows={3} defaultValue={project?.summary ?? ""} />
      </label>

      <label className={labelClass}>
        Outcome
        <input className={fieldClass} name="outcome" defaultValue={project?.outcome ?? ""} />
        <span className={hintClass}>Optional result line, such as retention or download growth.</span>
      </label>

      <label className={labelClass}>
        What you did
        <textarea
          className={fieldClass}
          name="points"
          rows={4}
          defaultValue={project?.points.join("\n") ?? ""}
          placeholder="One point per line"
        />
      </label>

      <label className={labelClass}>
        Stack
        <textarea
          className={fieldClass}
          name="stack"
          rows={3}
          defaultValue={project?.stack.join("\n") ?? ""}
          placeholder="One item per line"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          App Store URL
          <input className={fieldClass} name="appStore" defaultValue={project?.appStore ?? ""} />
        </label>
        <label className={labelClass}>
          Play Store URL
          <input className={fieldClass} name="playStore" defaultValue={project?.playStore ?? ""} />
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-line bg-paper px-4 py-3 text-sm">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={Boolean(project?.featured)}
          className="mt-0.5 size-4 accent-[var(--ink)]"
        />
        <span>
          <span className="font-medium text-ink">Show on the home page</span>
          <span className="mt-1 block text-muted">Featured projects appear in the selected work section.</span>
        </span>
      </label>
    </div>
  );
}
