import { cache } from "react";
import {
  certifications as staticCertifications,
  education as staticEducation,
  experience as staticExperience,
  profile as staticProfile,
  projects as staticProjects,
  type CertificationItem,
  type EducationItem,
  type ExperienceItem,
  type Profile,
  type Project,
} from "@/lib/data";

async function readOr<T>(path: string, fallback: T): Promise<T> {
  const base = process.env.API_URL?.replace(/\/$/, "");
  if (!base) return fallback;

  try {
    const response = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export const getProfile = cache(() => readOr<Profile>("/api/profile", staticProfile));
export const getProjects = cache(() => readOr<Project[]>("/api/projects", staticProjects));
export const getExperience = cache(() => readOr<ExperienceItem[]>("/api/experience", staticExperience));
export const getEducation = cache(() => readOr<EducationItem[]>("/api/education", staticEducation));
export const getCertifications = cache(() => readOr<CertificationItem[]>("/api/certifications", staticCertifications));
