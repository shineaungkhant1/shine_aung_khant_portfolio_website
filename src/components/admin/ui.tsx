export function Notice({ saved, error }: { saved?: string; error?: string }) {
  if (error) {
    return <p className="rounded-xl border border-clay/40 bg-card px-4 py-3 text-sm text-clay">{error}</p>;
  }
  if (saved) {
    return <p className="rounded-xl border border-moss/40 bg-card px-4 py-3 text-sm">Saved.</p>;
  }
  return null;
}

export const fieldClass = "mt-1 w-full rounded-xl border border-line bg-card px-3 py-2 text-sm outline-none focus:border-ink";
export const labelClass = "block text-sm";
export const primaryClass = "inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm text-paper hover:bg-clay";
export const secondaryClass = "inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-sm hover:border-ink";
export const dangerClass = "inline-flex h-11 items-center justify-center rounded-full border border-clay/50 px-5 text-sm text-clay";
