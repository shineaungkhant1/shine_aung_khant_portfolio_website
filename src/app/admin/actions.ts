"use server";

import { timingSafeEqual } from "node:crypto";
import { redirect, unstable_rethrow } from "next/navigation";
import { adminPassword, clearAdminCookie, isAdmin, setAdminCookie } from "@/lib/admin-session";
import { ApiError, apiDelete, apiSend, type ApiProject } from "@/lib/portfolio-api";

function same(input: string, expected: string) {
  const actual = Buffer.from(input);
  const wanted = Buffer.from(expected);
  if (actual.length !== wanted.length) return false;
  return timingSafeEqual(actual, wanted);
}

function message(error: unknown) {
  if (error instanceof ApiError) return error.message;
  return "Could not save that change.";
}

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

async function attempt(path: string, action: () => Promise<void>) {
  await requireAdmin();
  try {
    await action();
  } catch (error) {
    unstable_rethrow(error);
    redirect(`${path}?error=${encodeURIComponent(message(error))}`);
  }
  redirect(`${path}?saved=1`);
}

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function lines(formData: FormData, name: string) {
  return text(formData, name)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function login(formData: FormData) {
  const expected = adminPassword();
  const password = text(formData, "password");
  if (!expected || !same(password, expected)) {
    redirect("/admin/login?error=1");
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logout() {
  await clearAdminCookie();
  redirect("/admin/login");
}

export async function saveProfile(formData: FormData) {
  await attempt("/admin/profile", () =>
    apiSend("/api/profile", "PUT", {
      name: text(formData, "name"),
      role: text(formData, "role"),
      location: text(formData, "location"),
      origin: text(formData, "origin"),
      email: text(formData, "email"),
      emailHref: text(formData, "emailHref"),
      phone: text(formData, "phone"),
      phoneHref: text(formData, "phoneHref"),
      linkedin: text(formData, "linkedin"),
      github: text(formData, "github"),
      resume: text(formData, "resume"),
      summary: text(formData, "summary"),
    }),
  );
}

function projectBody(formData: FormData) {
  return {
    slug: text(formData, "slug"),
    name: text(formData, "name"),
    category: text(formData, "category"),
    org: text(formData, "org"),
    period: text(formData, "period"),
    summary: text(formData, "summary"),
    outcome: text(formData, "outcome"),
    points: lines(formData, "points"),
    stack: lines(formData, "stack"),
    appStore: text(formData, "appStore"),
    playStore: text(formData, "playStore"),
    featured: formData.get("featured") === "on",
  };
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  try {
    const project = await apiSend<ApiProject>("/api/projects", "POST", projectBody(formData));
    redirect(`/admin/projects/${project.slug}?saved=1`);
  } catch (error) {
    unstable_rethrow(error);
    redirect(`/admin/projects/new?error=${encodeURIComponent(message(error))}`);
  }
}

export async function updateProject(formData: FormData) {
  const slug = text(formData, "originalSlug");
  await requireAdmin();
  try {
    const project = await apiSend<ApiProject>(`/api/projects/${slug}`, "PUT", projectBody(formData));
    redirect(`/admin/projects/${project.slug}?saved=1`);
  } catch (error) {
    unstable_rethrow(error);
    redirect(`/admin/projects/${slug}?error=${encodeURIComponent(message(error))}`);
  }
}

export async function deleteProject(formData: FormData) {
  const slug = text(formData, "slug");
  await attempt("/admin/projects", () => apiDelete(`/api/projects/${slug}`));
}

export async function createExperience(formData: FormData) {
  await attempt("/admin/experience", () =>
    apiSend("/api/experience", "POST", {
      role: text(formData, "role"),
      org: text(formData, "org"),
      place: text(formData, "place"),
      period: text(formData, "period"),
      points: lines(formData, "points"),
    }),
  );
}

export async function updateExperience(formData: FormData) {
  const id = text(formData, "id");
  await attempt("/admin/experience", () =>
    apiSend(`/api/experience/${id}`, "PUT", {
      role: text(formData, "role"),
      org: text(formData, "org"),
      place: text(formData, "place"),
      period: text(formData, "period"),
      points: lines(formData, "points"),
    }),
  );
}

export async function deleteExperience(formData: FormData) {
  await attempt("/admin/experience", () => apiDelete(`/api/experience/${text(formData, "id")}`));
}

export async function createEducation(formData: FormData) {
  await attempt("/admin/education", () =>
    apiSend("/api/education", "POST", {
      title: text(formData, "title"),
      org: text(formData, "org"),
      period: text(formData, "period"),
    }),
  );
}

export async function updateEducation(formData: FormData) {
  const id = text(formData, "id");
  await attempt("/admin/education", () =>
    apiSend(`/api/education/${id}`, "PUT", {
      title: text(formData, "title"),
      org: text(formData, "org"),
      period: text(formData, "period"),
    }),
  );
}

export async function deleteEducation(formData: FormData) {
  await attempt("/admin/education", () => apiDelete(`/api/education/${text(formData, "id")}`));
}

export async function createCertification(formData: FormData) {
  await attempt("/admin/certifications", () =>
    apiSend("/api/certifications", "POST", {
      title: text(formData, "title"),
      href: text(formData, "href"),
    }),
  );
}

export async function updateCertification(formData: FormData) {
  const id = text(formData, "id");
  await attempt("/admin/certifications", () =>
    apiSend(`/api/certifications/${id}`, "PUT", {
      title: text(formData, "title"),
      href: text(formData, "href"),
    }),
  );
}

export async function deleteCertification(formData: FormData) {
  await attempt("/admin/certifications", () => apiDelete(`/api/certifications/${text(formData, "id")}`));
}
