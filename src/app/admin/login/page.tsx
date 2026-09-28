import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { login } from "@/app/admin/actions";
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
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">Admin</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight">Sign in</h1>
      {process.env.NODE_ENV === "production" ? null : (
        <p className="mt-3 text-sm text-muted">Local password is changeme until you set ADMIN_PASSWORD.</p>
      )}
      {error ? <p className="mt-4 text-sm text-clay">{loginError(error)}</p> : null}
      <form action={login} className="mt-8 grid gap-4">
        <label className={labelClass}>
          Password
          <PendingField className={fieldClass} type="password" name="password" required autoFocus />
        </label>
        <SubmitButton className={primaryClass} pendingLabel="Signing in…">
          Continue
        </SubmitButton>
      </form>
    </main>
  );
}
