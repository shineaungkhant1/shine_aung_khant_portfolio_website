import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS = "portfolio_access";
const REFRESH = "portfolio_refresh";
const DEVICE = "portfolio_device";
const ACCESS_MAX_AGE = 15 * 60;
const REFRESH_MAX_AGE = 60 * 60 * 24 * 14;

function expired(token: string | undefined) {
  if (!token) return true;
  const parts = token.split(".");
  if (parts.length !== 3) return true;
  try {
    const padded = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), "="));
    const payload = JSON.parse(json) as { exp?: unknown };
    return typeof payload.exp !== "number" || payload.exp * 1000 <= Date.now() + 60_000;
  } catch {
    return true;
  }
}

function apiBase() {
  return (process.env.API_URL ?? "http://localhost:8080").replace(/\/$/, "");
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const access = request.cookies.get(ACCESS)?.value;
  const refresh = request.cookies.get(REFRESH)?.value;
  const deviceId = request.cookies.get(DEVICE)?.value;
  if (!expired(access) || !refresh || !deviceId) {
    return NextResponse.next();
  }

  try {
    const refreshed = await fetch(`${apiBase()}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh, deviceId }),
      cache: "no-store",
    });
    if (!refreshed.ok) {
      return signedOut(request);
    }
    const body = (await refreshed.json()) as { accessToken?: string; refreshToken?: string };
    if (!body.accessToken || !body.refreshToken) {
      return signedOut(request);
    }
    const headers = new Headers(request.headers);
    headers.set("x-portfolio-access", body.accessToken);
    headers.set("x-portfolio-refresh", body.refreshToken);
    const response = NextResponse.next({ request: { headers } });
    const secure = process.env.NODE_ENV === "production";
    response.cookies.set(ACCESS, body.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: ACCESS_MAX_AGE,
    });
    response.cookies.set(REFRESH, body.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: REFRESH_MAX_AGE,
    });
    return response;
  } catch {
    return NextResponse.next();
  }
}

function signedOut(request: NextRequest) {
  const login = NextResponse.redirect(new URL("/admin/login?error=session", request.url));
  login.cookies.delete(ACCESS);
  login.cookies.delete(REFRESH);
  return login;
}

export const config = {
  matcher: ["/admin/:path*"],
};
