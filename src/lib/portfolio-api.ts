import "server-only";
import type { CertificationItem, EducationItem, ExperienceItem, Profile, Project } from "@/lib/data";

export class ApiError extends Error {}

function base() {
  return (process.env.API_URL ?? "http://localhost:8080").replace(/\/$/, "");
}

function authorization() {
  const username = process.env.API_USERNAME ?? "admin";
  const password = process.env.API_PASSWORD ?? (process.env.NODE_ENV === "production" ? "" : "changeme");
  if (!password) {
    throw new ApiError("Set API_PASSWORD so the admin can call the API.");
  }
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${base()}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        Authorization: authorization(),
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
    throw new ApiError(body?.error ?? `The API returned ${response.status}`);
  }
  return (await response.json()) as T;
}

export function apiGet<T>(path: string) {
  return request<T>(path);
}

export function apiSend<T>(path: string, method: "POST" | "PUT", body: unknown) {
  return request<T>(path, { method, body: JSON.stringify(body) });
}

export function apiDelete(path: string) {
  return request<void>(path, { method: "DELETE" });
}

export type ApiProfile = Profile;
export type ApiProject = Project;
export type ApiExperience = ExperienceItem;
export type ApiEducation = EducationItem;
export type ApiCertification = CertificationItem;
