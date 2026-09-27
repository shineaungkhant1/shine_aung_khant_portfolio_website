import Image from "next/image";
import { projectMedia } from "@/lib/data";

export function ProjectIcon({
  slug,
  name,
  size = 64,
}: {
  slug: string;
  name: string;
  size?: number;
}) {
  const media = projectMedia[slug];
  if (!media) return null;

  return (
    <Image
      src={media.icon}
      alt={`${name} app icon`}
      width={size}
      height={size}
      className="app-icon rounded-[1.15rem] border border-line bg-white object-contain"
    />
  );
}

export function ProjectCover({ slug, name }: { slug: string; name: string }) {
  const cover = projectMedia[slug]?.cover;
  if (!cover) return null;

  return (
    <div className="media-in mt-8 overflow-hidden rounded-[1.6rem] border border-line bg-card">
      <Image
        src={cover}
        alt={`${name} artwork from the app`}
        width={1400}
        height={900}
        className="max-h-72 w-full object-contain transition duration-500 hover:scale-[1.02] sm:max-h-[520px]"
      />
    </div>
  );
}
