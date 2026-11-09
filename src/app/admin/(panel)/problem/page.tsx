import Link from "next/link";
import { PageHeader, secondaryClass } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminProblemPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; message?: string }>;
}) {
  const { reason, message } = await searchParams;
  const unauthorized = reason === "unauthorized";

  return (
    <div className="grid gap-6">
      <PageHeader
        title={unauthorized ? "Session rejected by the API" : "The dashboard could not load"}
        description={
          unauthorized
            ? "You are signed into the site, but the API rejected the request. Sign out and sign in again after the API password and Vercel API_URL are aligned."
            : message || "The API could not be reached."
        }
      />
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/login" className={secondaryClass}>
          Back to sign in
        </Link>
        <Link href="/" className={secondaryClass}>
          View site
        </Link>
      </div>
    </div>
  );
}
