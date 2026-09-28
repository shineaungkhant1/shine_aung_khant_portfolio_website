import "server-only";
import { readAccessToken } from "@/lib/admin-session";
import type { CertificationItem, EducationItem, ExperienceItem, Profile, Project } from "@/lib/data";

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

function base() {
  const url = (process.env.API_URL ?? "http://localhost:8080").replace(/\/$/, "");
  if (process.env.NODE_ENV === "production" && !url.startsWith("https://")) {
    throw new ApiError("Set API_URL to an https address.");
  }
  return url;
}

async function authorization() {
  const access = await readAccessToken();
  if (!access) {
    throw new ApiError("Unauthorized", 401);
  }
  return `Bearer ${access}`;
}

async function request<T>(path: string, init?: RequestInit, authenticated = true): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${base()}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        ...(authenticated ? { Authorization: await authorization() } : {}),
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiError("The API is not running. In the backend folder, run ./mvnw spring-boot:run");
  }

  if (response.status === 204) return undefined as T;
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new ApiError(body?.error ?? `The API returned ${response.status}`, response.status);
  }
  return (await response.json()) as T;
}

export function apiGet<T>(path: string) {
  return request<T>(path);
}

export function apiSend<T>(path: string, method: "POST" | "PUT", body: unknown) {
  return request<T>(path, { method, body: JSON.stringify(body) });
}

export function apiPublic<T>(path: string, method: "POST", body: unknown) {
  return request<T>(path, { method, body: JSON.stringify(body) }, false);
}

export function apiDelete(path: string) {
  return request<void>(path, { method: "DELETE" });
}

export type ApiProfile = Profile;
export type ApiProject = Project;
export type ApiExperience = ExperienceItem;
export type ApiEducation = EducationItem;
export type ApiCertification = CertificationItem;
