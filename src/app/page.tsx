import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { HeroPortrait } from "@/components/hero-portrait";
import { HeroScroll } from "@/components/hero-scroll";
import { ArrowIcon, DownloadIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { profile, projects } from "@/lib/data";

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);
  const onAStore = projects.filter((project) => project.appStore || project.playStore).length;

  return (
    <>
      <HeroScroll>
        <div>
          <p className="enter text-xs tracking-[0.18em] text-muted uppercase">
            {profile.role} · {profile.location}
          </p>
          <h1 className="enter enter-1 mt-4 font-serif text-[clamp(2.8rem,10vw,6.4rem)] leading-[0.9] tracking-tight">
            Shine
            <br />
            Aung Khant
          </h1>
          <p className="enter enter-2 mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.summary}</p>
          <div className="enter enter-3 mt-8 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="press inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm whitespace-nowrap text-paper hover:bg-clay"
            >
              See the work
              <ArrowIcon />
            </Link>
            <a
              href={profile.emailHref}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-line px-5 text-sm whitespace-nowrap hover:border-ink"
            >
              Email me
            </a>
            <a
              href={profile.resume}
              data-resume-preview
              className="press inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm whitespace-nowrap hover:border-ink"
            >
              <DownloadIcon />
              View resume
            </a>
          </div>
        </div>
        <div className="enter enter-4">
          <HeroPortrait />
        </div>
      </HeroScroll>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">Selected work</p>
              <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">Apps people can download</h2>
            </div>
            <Link href="/work" className="inline-flex shrink-0 items-center gap-1.5 text-sm text-clay">
              All projects
              <ArrowIcon />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {featured.map((project, index) => (
              <li key={project.slug} className={`reveal ${index === 0 ? "sm:col-span-2" : ""}`}>
                <ProjectCard project={project} featured={index === 0} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="reveal border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:gap-10 sm:py-16">
          <div>
            <p className="font-serif text-4xl tracking-tight sm:text-5xl">{projects.length}</p>
            <p className="mt-2 text-muted">Flutter apps in this portfolio, from streaming to campus tools.</p>
          </div>
          <div>
            <p className="font-serif text-4xl tracking-tight sm:text-5xl">{onAStore}</p>
            <p className="mt-2 text-muted">of them are on the App Store, Google Play, or both.</p>
          </div>
          <div>
            <a
              href={profile.resume}
              data-resume-preview
              className="font-serif text-4xl tracking-tight transition-colors duration-200 hover:text-clay sm:text-5xl"
            >
              Resume
            </a>
            <p className="mt-2 text-muted">Open it first, then download if you want to send it.</p>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
