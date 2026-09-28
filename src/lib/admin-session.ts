import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "portfolio_admin";

function sessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  if (process.env.NODE_ENV === "production") return "";
  return "dev-admin-session";
}

function expectedToken() {
  return createHmac("sha256", sessionSecret()).update("portfolio-admin").digest("hex");
}

export function adminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV === "production") return "";
  return "changeme";
}

export async function isAdmin() {
  const secret = sessionSecret();
  if (!secret) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const actual = Buffer.from(value);
  const expected = Buffer.from(expectedToken());
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

export async function setAdminCookie() {
  (await cookies()).set(COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearAdminCookie() {
  (await cookies()).delete(COOKIE);
}
