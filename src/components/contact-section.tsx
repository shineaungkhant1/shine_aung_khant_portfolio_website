import { profile } from "@/lib/data";

export function ContactSection() {
  return (
    <section id="contact" className="reveal scroll-mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:py-20 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs tracking-[0.16em] text-muted uppercase">Contact</p>
          <h2 className="mt-3 max-w-md font-serif text-4xl tracking-tight sm:text-5xl">
            Tell me about the app you need shipped.
          </h2>
        </div>
        <ul className="grid content-end gap-1 text-lg">
          <li>
            <a className="nav-link inline-flex min-h-11 items-center hover:text-clay" href={profile.emailHref} target="_blank" rel="noreferrer">
              {profile.email}
            </a>
          </li>
          <li>
            <a className="nav-link inline-flex min-h-11 items-center hover:text-clay" href={profile.phoneHref}>
              {profile.phone}
            </a>
          </li>
          <li>
            <a className="nav-link inline-flex min-h-11 items-center hover:text-clay" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="nav-link inline-flex min-h-11 items-center hover:text-clay" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="nav-link inline-flex min-h-11 items-center hover:text-clay" href={profile.resume} data-resume-preview>
              View resume
            </a>
          </li>
          <li className="text-muted">
            {profile.location} · from {profile.origin}
          </li>
        </ul>
      </div>
    </section>
  );
}
