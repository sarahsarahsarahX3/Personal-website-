"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { PROJECT_NAV } from "@/app/lib/projectNav";

function NavCard({
  direction,
  href,
  title,
  thumbnail,
  disabled,
}: {
  direction: "prev" | "next";
  href: string;
  title: string;
  thumbnail: string;
  disabled?: boolean;
}) {
  const Arrow = direction === "prev" ? ChevronLeft : ChevronRight;
  const align = direction === "prev" ? "justify-start" : "justify-end";
  const textAlign = direction === "prev" ? "text-left" : "text-right";

  const inner = (
    <div
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-surface/70 px-3 py-3",
        "backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.06]",
        disabled && "opacity-40 pointer-events-none",
      )}
    >
      {direction === "prev" ? <Arrow size={18} className="shrink-0 text-white/70" /> : null}

      <div className={cn("flex min-w-0 flex-1 items-center gap-3", align)}>
        {direction === "prev" ? (
          <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20">
            <Image src={thumbnail} alt="" fill className="object-cover" sizes="56px" />
          </div>
        ) : null}

        <div className={cn("min-w-0", textAlign)}>
          <div className="text-[10px] font-mono uppercase tracking-widest text-text-secondary/70">
            {direction === "prev" ? "Previous" : "Next"}
          </div>
          <div className="mt-1 truncate text-sm text-text-primary/90 group-hover:text-text-primary">
            {title}
          </div>
        </div>

        {direction === "next" ? (
          <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20">
            <Image src={thumbnail} alt="" fill className="object-cover" sizes="56px" />
          </div>
        ) : null}
      </div>

      {direction === "next" ? <Arrow size={18} className="shrink-0 text-white/70" /> : null}
    </div>
  );

  if (disabled) return inner;
  return (
    <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-2xl">
      {inner}
    </Link>
  );
}

export function ProjectPager({
  currentSlug,
  layout = "fixed",
  className,
}: {
  currentSlug: string;
  layout?: "fixed" | "rail" | "inline";
  className?: string;
}) {
  const index = PROJECT_NAV.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return null;

  const prev = PROJECT_NAV[index - 1];
  const next = PROJECT_NAV[index + 1];

  const gridClassName =
    layout === "rail" ? "grid gap-3" : "grid gap-3 sm:grid-cols-2";

  const grid = (
    <div className={cn(gridClassName, className)}>
      {prev ? (
        <NavCard
          direction="prev"
          href={`/work/${prev.slug}`}
          title={prev.title}
          thumbnail={prev.thumbnail}
        />
      ) : (
        <NavCard
          direction="prev"
          href="/work"
          title="Selected Work"
          thumbnail={PROJECT_NAV[index].thumbnail}
          disabled
        />
      )}

      {next ? (
        <NavCard
          direction="next"
          href={`/work/${next.slug}`}
          title={next.title}
          thumbnail={next.thumbnail}
        />
      ) : (
        <NavCard
          direction="next"
          href="/work"
          title="Selected Work"
          thumbnail={PROJECT_NAV[index].thumbnail}
          disabled
        />
      )}
    </div>
  );

  if (layout === "inline") {
    return <div className={cn("mt-12", className)}>{grid}</div>;
  }

  if (layout === "rail") {
    return grid;
  }

  // fixed
  return (
    <>
      <div className="h-[84px] md:h-[96px]" aria-hidden="true" />
      <div className={cn("fixed inset-x-0 bottom-0 z-40", "pb-[calc(env(safe-area-inset-bottom)+0.75rem)]")}>
        <div className="mx-auto w-full max-w-6xl px-6">
          {grid}
        </div>
      </div>
    </>
  );
}
