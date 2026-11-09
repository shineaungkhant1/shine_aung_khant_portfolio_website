export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-live="polite" className="grid gap-8">
      <div className="border-b border-line pb-6">
        <div className="h-3 w-16 animate-pulse rounded bg-line" />
        <div className="mt-3 h-10 w-48 animate-pulse rounded-lg bg-line" />
        <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-line" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-36 animate-pulse rounded-[1.4rem] border border-line bg-card" />
        ))}
      </div>
    </div>
  );
}
