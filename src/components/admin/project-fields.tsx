import type { Project } from "@/lib/data";
import { fieldClass, labelClass } from "@/components/admin/ui";

const categories = ["Streaming", "Commerce", "Education", "Delivery"];

export function ProjectFields({ project }: { project?: Project }) {
  return (
    <div className="grid gap-4">
      {project?.slug ? <input type="hidden" name="originalSlug" value={project.slug} /> : null}
      <label className={labelClass}>
        Name
        <input className={fieldClass} name="name" required defaultValue={project?.name ?? ""} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Slug
          <input className={fieldClass} name="slug" defaultValue={project?.slug ?? ""} placeholder="Generated from the name if empty" />
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
      </label>
      <label className={labelClass}>
        What you did
        <textarea className={fieldClass} name="points" rows={4} defaultValue={project?.points.join("\n") ?? ""} placeholder="One point per line" />
      </label>
      <label className={labelClass}>
        Stack
        <textarea className={fieldClass} name="stack" rows={3} defaultValue={project?.stack.join("\n") ?? ""} placeholder="One item per line" />
      </label>
      <label className={labelClass}>
        App Store URL
        <input className={fieldClass} name="appStore" defaultValue={project?.appStore ?? ""} />
      </label>
      <label className={labelClass}>
        Play Store URL
        <input className={fieldClass} name="playStore" defaultValue={project?.playStore ?? ""} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={Boolean(project?.featured)} />
        Show on the home page
      </label>
    </div>
  );
}
