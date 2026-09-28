export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-line" />
      <p className="mt-4 text-sm text-muted">Loading…</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-[1.2rem] border border-line bg-card" />
        ))}
      </div>
    </div>
  );
}
