import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { DownloadIcon } from "@/components/icons";
import { skillGroups } from "@/lib/data";
import { getCertifications, getEducation, getExperience, getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Experience, education, and skills of Flutter developer Shine Aung Khant.",
};

export default async function AboutPage() {
  const [profile, experience, education, certifications] = await Promise.all([
    getProfile(),
    getExperience(),
    getEducation(),
    getCertifications(),
  ]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="enter text-xs tracking-[0.16em] text-muted uppercase">About</p>
        <h1 className="enter enter-1 mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-6xl">
          I build the app, then I get it onto the stores.
        </h1>
        <a
          href={profile.resume}
          data-resume-preview
          className="press enter enter-2 mt-6 inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 text-sm whitespace-nowrap text-paper hover:bg-clay"
        >
          <DownloadIcon />
          View resume
        </a>
        <div className="enter enter-3 mt-8 grid gap-8 text-lg leading-relaxed text-muted md:grid-cols-2">
          <p>
            I am {profile.name}, a Flutter developer from {profile.origin}, currently based in{" "}
            {profile.location}. At AXRA Tech I ship streaming and commerce apps. Before that I built
            the learning apps students at Strategy First actually open: campus tools, KG–12 lessons,
            and a lighter version for phones with little RAM.
          </p>
          <p>
            I am studying for a UK BSc (Hons) in Computer Science at Strategy First International
            College. I also trained students during the college AI hackathon.
          </p>
        </div>

        <section className="reveal mt-16">
          <h2 className="font-serif text-3xl tracking-tight">Experience</h2>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {experience.map((job) => (
              <li key={`${job.org}-${job.period}`} className="reveal grid gap-3 py-7 sm:gap-4 lg:grid-cols-[16rem_1fr]">
                <div>
                  <p className="font-medium">{job.role}</p>
                  <p className="mt-1 text-muted">
                    {job.org} · {job.place}
                  </p>
                  <p className="mt-1 text-sm text-muted">{job.period}</p>
                </div>
                <ul className="grid gap-2 text-muted">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="reveal mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl tracking-tight">Education</h2>
            <ul className="mt-5 grid gap-5">
              {education.map((item) => (
                <li key={item.title}>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted">{item.org}</p>
                  <p className="text-sm text-muted">{item.period}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-3xl tracking-tight">Certificates</h2>
            <ul className="mt-5 grid gap-3 text-muted">
              {certifications.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="nav-link text-ink hover:text-clay"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="reveal mt-16">
          <h2 className="font-serif text-3xl tracking-tight">Skills</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-xs tracking-[0.16em] text-muted uppercase">{group.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip rounded-full border border-line px-3 py-1 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
      <ContactSection />
    </>
  );
}
