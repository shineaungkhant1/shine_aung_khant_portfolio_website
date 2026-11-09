import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function apiBase() {
  return (process.env.API_URL ?? "http://localhost:8080").replace(/\/$/, "");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  try {
    await fetch(`${apiBase()}/api/analytics/pageview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": request.headers.get("user-agent") ?? "portfolio-site",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    // Tracking must never break browsing.
  }

  return new NextResponse(null, { status: 204 });
}
