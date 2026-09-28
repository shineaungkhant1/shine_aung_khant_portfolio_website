import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/icons";
import { ProjectCover, ProjectIcon } from "@/components/project-visual";
import { StoreLinks } from "@/components/store-links";
import { getProjects } from "@/lib/content";

type Params = { slug: string };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <Link href="/work" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowIcon direction="left" />
        All work
      </Link>
      <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:gap-5">
        <ProjectIcon slug={project.slug} name={project.name} size={88} />
        <div className="min-w-0">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">{project.category}</p>
          <h1 className="mt-2 font-serif text-[clamp(2.4rem,8vw,5rem)] leading-[0.95] tracking-tight">
            {project.name}
          </h1>
        </div>
      </div>
      <p className="mt-5 max-w-2xl text-xl text-muted">{project.summary}</p>
      <ProjectCover slug={project.slug} name={project.name} />
      <div className="mt-8">
        <StoreLinks project={project} prominent />
      </div>

      <dl className="reveal mt-12 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
        <div>
          <dt className="text-xs tracking-[0.16em] text-muted uppercase">Organization</dt>
          <dd className="mt-2">{project.org}</dd>
        </div>
        <div>
          <dt className="text-xs tracking-[0.16em] text-muted uppercase">When</dt>
          <dd className="mt-2">{project.period}</dd>
        </div>
        <div>
          <dt className="text-xs tracking-[0.16em] text-muted uppercase">Result</dt>
          <dd className="mt-2">{project.outcome ?? "Shipped to users."}</dd>
        </div>
      </dl>

      <div className="reveal mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serif text-3xl tracking-tight">What I did</h2>
          <ul className="mt-5 grid gap-4">
            {project.points.map((point) => (
              <li key={point} className="border-t border-line pt-4 text-lg leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl tracking-tight">Stack</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item} className="chip rounded-full border border-line px-3 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav className="mt-14 grid gap-3 sm:mt-16 sm:grid-cols-2" aria-label="More projects">
        <Link
          href={`/work/${previous.slug}`}
          className="card-lift group rounded-[1.2rem] border border-line bg-card p-5"
        >
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.16em] text-muted uppercase">
            <ArrowIcon direction="left" />
            Previous
          </span>
          <span className="mt-2 block font-serif text-2xl tracking-tight">{previous.name}</span>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="card-lift group rounded-[1.2rem] border border-line bg-card p-5 sm:text-right"
        >
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.16em] text-muted uppercase sm:justify-end">
            Next
            <ArrowIcon />
          </span>
          <span className="mt-2 block font-serif text-2xl tracking-tight">{next.name}</span>
        </Link>
      </nav>
    </article>
  );
}
