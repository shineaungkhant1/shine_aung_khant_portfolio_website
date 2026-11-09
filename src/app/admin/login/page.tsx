import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "@/app/admin/actions";
import { BackgroundWash } from "@/components/background-wash";
import { PendingField, SubmitButton } from "@/components/admin/submit-button";
import { fieldClass, labelClass, primaryClass } from "@/components/admin/ui";
import { isAdmin } from "@/lib/admin-session";

function loginError(error: string) {
  if (error === "rate") return "Too many attempts. Try again in a few minutes.";
  if (error === "api") return "The API is not running.";
  if (error === "config") return "Sign-in is not configured.";
  if (error === "session") return "This account is signed in on another device.";
  return "That password did not match.";
}

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <>
      <BackgroundWash />
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
        <div className="rounded-[1.8rem] border border-line bg-card/95 p-7 shadow-[0_24px_80px_-48px_rgba(28,25,21,0.55)] backdrop-blur-md sm:p-8">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">Admin</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight">Sign in</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Use the portfolio admin password to edit profile, projects, and career details.
          </p>
          {process.env.NODE_ENV === "production" ? null : (
            <p className="mt-3 text-sm text-muted">Local password is changeme until you set ADMIN_PASSWORD.</p>
          )}
          {error ? (
            <p role="alert" className="mt-5 rounded-2xl border border-clay/35 bg-[color-mix(in_srgb,var(--clay)_10%,var(--card))] px-4 py-3 text-sm text-clay">
              {loginError(error)}
            </p>
          ) : null}
          <form action={login} className="mt-7 grid gap-5">
            <label className={labelClass}>
              Password
              <PendingField
                className={fieldClass}
                type="password"
                name="password"
                required
                autoFocus
                autoComplete="current-password"
                placeholder="Enter admin password"
              />
            </label>
            <SubmitButton className={`${primaryClass} w-full`} pendingLabel="Signing in…">
              Continue
            </SubmitButton>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/" className="transition hover:text-ink">
            ← Back to site
          </Link>
        </p>
      </main>
    </>
  );
}
