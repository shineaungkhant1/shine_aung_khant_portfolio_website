import { randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";

export const ACCESS_COOKIE = "portfolio_access";
export const REFRESH_COOKIE = "portfolio_refresh";
export const DEVICE_COOKIE = "portfolio_device";

const ACCESS_MAX_AGE = 15 * 60;
const REFRESH_MAX_AGE = 60 * 60 * 24 * 14;
const DEVICE_MAX_AGE = 60 * 60 * 24 * 365;

function cookieBase() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

export function accessExpired(token: string | undefined, skewMs = 60_000) {
  if (!token) return true;
  const parts = token.split(".");
  if (parts.length !== 3) return true;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as { exp?: unknown };
    return typeof payload.exp !== "number" || payload.exp * 1000 <= Date.now() + skewMs;
  } catch {
    return true;
  }
}

export async function readAccessToken() {
  const forwarded = (await headers()).get("x-portfolio-access");
  if (forwarded) return forwarded;
  return (await cookies()).get(ACCESS_COOKIE)?.value ?? null;
}

export async function readRefreshToken() {
  const forwarded = (await headers()).get("x-portfolio-refresh");
  if (forwarded) return forwarded;
  return (await cookies()).get(REFRESH_COOKIE)?.value ?? null;
}

export async function readDeviceId() {
  const existing = (await cookies()).get(DEVICE_COOKIE)?.value;
  if (existing && /^[A-Za-z0-9_-]{8,128}$/.test(existing)) return existing;
  return randomBytes(32).toString("hex");
}

function apiBase() {
  return (process.env.API_URL ?? "http://localhost:8080").replace(/\/$/, "");
}

export async function isAdmin() {
  const access = await readAccessToken();
  if (!access || accessExpired(access, 0)) {
    return Boolean(await readRefreshToken());
  }
  try {
    const response = await fetch(`${apiBase()}/api/auth/session`, {
      headers: { Authorization: `Bearer ${access}` },
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function setDeviceCookie(deviceId: string) {
  (await cookies()).set(DEVICE_COOKIE, deviceId, { ...cookieBase(), maxAge: DEVICE_MAX_AGE });
}

export async function setTokenCookies(accessToken: string, refreshToken: string) {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, accessToken, { ...cookieBase(), maxAge: ACCESS_MAX_AGE });
  jar.set(REFRESH_COOKIE, refreshToken, { ...cookieBase(), maxAge: REFRESH_MAX_AGE });
}

export async function clearTokenCookies() {
  const jar = await cookies();
  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
}
