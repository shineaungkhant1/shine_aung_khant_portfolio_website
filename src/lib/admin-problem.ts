import { redirect } from "next/navigation";
import { ApiError } from "@/lib/portfolio-api";

export function redirectOnApiError(error: unknown): never {
  if (error instanceof ApiError && (error.status === 401 || error.message === "Unauthorized")) {
    redirect("/admin/login?error=session");
  }
  const message = error instanceof ApiError ? error.message : "The API could not be reached.";
  redirect(`/admin/problem?reason=error&message=${encodeURIComponent(message)}`);
}
