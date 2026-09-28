export const dynamic = "force-dynamic";

export default async function AdminProblemPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; message?: string }>;
}) {
  const { reason, message } = await searchParams;
  const unauthorized = reason === "unauthorized";

  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-muted uppercase">Admin</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight">{unauthorized ? "API rejected the password" : "The dashboard could not load"}</h1>
      {unauthorized ? (
        <div className="mt-4 max-w-xl space-y-3 text-sm text-muted">
          <p>You are signed in to the site. The API answered Unauthorized, so the overview was not opened.</p>
          <p>On Vercel, API_USERNAME must be admin and API_PASSWORD must be the password the API is actually using. Save those, redeploy the site, then open the dashboard again.</p>
        </div>
      ) : (
        <p className="mt-4 max-w-xl text-sm text-clay">{message || "The API could not be reached."}</p>
      )}
    </div>
  );
}
