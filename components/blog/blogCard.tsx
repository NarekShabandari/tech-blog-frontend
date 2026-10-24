import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  cover_image: string;
  created_at: string;
  tags: string[];
}

export function BlogCard({
  slug,
  title,
  cover_image,
  created_at,
  tags,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="h-full rounded-xl border border-(--border) bg-(--surface) overflow-hidden hover:border-accent transition-colors duration-200">
        <div className="relative aspect-video overflow-hidden bg-(--subtle)">
          <Image
            src={cover_image}
            alt={title}
            fill
            loading="eager"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-5">
          {/* Category tag */}
          <span className="font-mono text-[10px] font-bold tracking-widest text-accent uppercase">
            {tags[0]}
          </span>

          {/* Title */}
          <h2 className="mt-2 text-base font-semibold leading-snug text-(--text) group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h2>

          {/* Meta */}
          <div className="mt-4 flex items-center justify-between">
            <time className="font-mono text-[11px] text-(--muted)">
              {new Date(created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
