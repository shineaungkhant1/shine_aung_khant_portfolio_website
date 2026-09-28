import type { Metadata } from "next";
import { WorkBrowser } from "@/components/work-browser";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Flutter apps shipped by Shine Aung Khant for streaming, commerce, education, and delivery.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 pt-10 pb-14 sm:pt-14">
      <p className="enter text-xs tracking-[0.16em] text-muted uppercase">Work</p>
      <h1 className="enter enter-1 mt-3 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        Mobile products, with store links only where a public listing exists.
      </h1>
      <p className="enter enter-2 mt-4 max-w-2xl text-muted">
        Streaming and shopping apps are from AXRA Tech. The learning apps are from Strategy First.
        Delivery apps are freelance client work.
      </p>
      <div className="mt-10">
        <WorkBrowser projects={projects} />
      </div>
    </div>
  );
}
