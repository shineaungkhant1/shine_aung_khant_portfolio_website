import Link from "next/link";

export function Notice({ saved, error }: { saved?: string; error?: string }) {
  if (error) {
    return (
      <p
        role="alert"
        className="rounded-2xl border border-clay/35 bg-[color-mix(in_srgb,var(--clay)_10%,var(--card))] px-4 py-3 text-sm text-clay"
      >
        {error}
      </p>
    );
  }
  if (saved) {
    return (
      <p
        role="status"
        className="rounded-2xl border border-moss/35 bg-[color-mix(in_srgb,var(--moss)_10%,var(--card))] px-4 py-3 text-sm text-moss"
      >
        Saved. The public site will pick this up on the next refresh.
      </p>
    );
  }
  return null;
}

export function PageHeader({
  eyebrow = "Admin",
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">{eyebrow}</p>
        <h1 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div> : null}
    </header>
  );
}

export function Panel({
  children,
  title,
  description,
  className = "",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={`rounded-[1.4rem] border border-line bg-card p-5 sm:p-6 ${className}`}>
      {title ? (
        <div className="mb-5 border-b border-line pb-4">
          <h2 className="font-serif text-xl tracking-tight">{title}</h2>
          {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-[1.4rem] border border-dashed border-line bg-card/60 px-6 py-10 text-center">
      <p className="font-serif text-2xl tracking-tight">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-muted transition hover:text-ink">
      ← {children}
    </Link>
  );
}

export const fieldClass =
  "mt-1.5 w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-ink focus:ring-2 focus:ring-ink/10 disabled:opacity-60";
export const labelClass = "block text-sm font-medium text-ink";
export const hintClass = "mt-1.5 text-xs leading-relaxed text-muted";
export const primaryClass =
  "inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm text-paper transition hover:bg-clay disabled:cursor-wait disabled:opacity-60";
export const secondaryClass =
  "inline-flex h-11 items-center justify-center rounded-full border border-line bg-transparent px-5 text-sm text-ink transition hover:border-ink disabled:cursor-wait disabled:opacity-60";
export const dangerClass =
  "inline-flex h-11 items-center justify-center rounded-full border border-clay/40 px-5 text-sm text-clay transition hover:border-clay hover:bg-[color-mix(in_srgb,var(--clay)_8%,transparent)] disabled:cursor-wait disabled:opacity-60";
export const ghostClass = "inline-flex h-11 items-center justify-center rounded-full px-3 text-sm text-muted transition hover:text-ink";
