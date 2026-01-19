"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

type SectionLink = { id: string; label: string };

type SnapshotRow = {
  label: string;
  value: string;
};

type ImpactKpi = {
  id: string;
  title: string;
  description: string;
};

type VideoClip = {
  title: string;
  src: string;
  poster?: string;
  kind: "file" | "embed";
};

type SocialEmbed = {
  title: string;
  src: string;
  width?: number;
  height?: number;
};

const project = {
  title: "Discovery Channel: Daily Planet",
  subtitle: "Science News Magazine Series",
  roleTitle: "Production Assistant",
  overview:
    "Supported production and editorial workflows for Daily Planet, Discovery Channel’s flagship science and technology series. Contributed to fast-paced, high-volume broadcast production by helping translate complex scientific topics into clear, accurate, and engaging storytelling across multiple weekly segments.",
  roleScope: ["Broadcast newsroom support for a daily science news program."],
  snapshot: [
    { label: "Format", value: "Broadcast Television Series" },
    { label: "Production Model", value: "5 Episodes Per Week" },
    { label: "Viewership", value: "1.3M+ Weekly Viewers" },
    { label: "Editorial Focus", value: "Science · Technology · Innovation · Wildlife" },
  ] satisfies SnapshotRow[],
  editorialFocus: [
    "Contributed story ideas during daily editorial pitch meetings, shaping segment direction within a fast-paced broadcast newsroom.",
    "Supported high-volume story segment development under tight, 24-hour production cycles and same-day delivery timelines.",
    "Translated complex scientific concepts into accessible, audience-friendly narratives.",
    "Maintained editorial accuracy, clarity, and pacing across varied segment formats.",
    "Supported consistent tone and storytelling standards week to week.",
  ],
  productionSupport: [
    "Coordinated day-to-day production needs across multiple segments and timelines.",
    "Provided research and scripting support, including source gathering and story inputs.",
    "Managed assets, documentation, and handoffs to support post-production workflows.",
    "Supported producers, editors, and hosts with schedules, notes, and deliverables.",
    "Helped ensure reliable, on-time delivery in a high-volume broadcast environment.",
  ],
  impactKpis: [
    {
      id: "weekly-delivery",
      title: "Consistent Weekly Delivery",
      description:
        "Supported reliable, repeatable workflows that help a weekly program ship on time across multiple segments and production timelines.",
    },
    {
      id: "multi-segment-throughput",
      title: "Multi-Segment Throughput",
      description:
        "Supported fast-turn segment production by keeping moving parts organized, trackable, and ready for handoff across parallel storylines.",
    },
    {
      id: "editorial-credibility",
      title: "Editorial Accuracy and Credibility",
      description:
        "Helped maintain science-first rigor through organized research inputs, careful documentation, and detail-oriented support during scripting and production.",
    },
    {
      id: "broadcast-standards",
      title: "Broadcast Standards Alignment",
      description:
        "Supported clean delivery by maintaining documentation and asset organization that aligns with broadcast standards and post-production workflows.",
    },
    {
      id: "production-reliability",
      title: "Production Reliability at Scale",
      description:
        "Contributed to smooth coordination in a high-volume environment by keeping schedules, notes, and assets clean, findable, and ready for handoff.",
    },
    {
      id: "audience-accessibility",
      title: "Accessible Science Storytelling",
      description:
        "Supported clarity and pacing so complex science and technology topics stayed approachable for broad audiences without losing accuracy.",
    },
    {
      id: "tone-consistency",
      title: "Consistent Editorial Tone",
      description:
        "Helped support a consistent narrative tone across segments by maintaining clear story inputs, notes, and documentation for producers and editors.",
    },
  ] satisfies ImpactKpi[],
  tools: [
    "Science storytelling",
    "Broadcast production workflows",
    "Editorial support",
    "Research coordination",
    "Asset management",
    "Cross-functional collaboration",
  ],
} as const;

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "focus", label: "Editorial Approach" },
  { id: "support", label: "Production Support" },
  { id: "impact", label: "Impact" },
  { id: "tools", label: "Tools" },
];

const headerImage = {
  title: "DAILY PLANET ON-SET STUDIO",
  src: "/Daily%20Planet%20Set.jpg",
  alt: "Daily Planet on-set studio frame",
} as const;

const dailyPlanetClips = [
  {
    title: "The Easter Bunny: Gigantic Edition",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1624452390937260%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "Sharks: A Man’s Best Friend",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1694189590630206%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "Inside the Toronto Zoo’s IVF Clinic",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1682665248449307%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "The Clever Dog Lab",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1679922312056934%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "Australia’s Mary River Turtle",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1676770252372140%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "The Story of Ziggy Star, The Seal",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1672868082762357%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "The Big Montreal Biodome Move",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1670361973012968%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "Wildlife Photography with Chris Gillette",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1670193526363146%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "Discovering the Rariphotic Zone",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1664543106928188%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "Saving the Santa Cruz Island Horses",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1664522366930262%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "Ziyology: Master Sewers",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1664477796934719%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "The Jazz Singers of the Sea",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1657508370964995%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "Gorilla Census",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1651594218223077%2F&width=720&show_text=false&height=405&appId",
  },
  {
    title: "Artificial Penguin Nest",
    kind: "embed",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fvideos%2F1650908161625016%2F&width=720&show_text=false&height=405&appId",
  },
] satisfies VideoClip[];

const dailyPlanetFacebookPosts = [
  {
    title: "Daily Planet post · pfbid0HwW5AD7wBqbpNgSriZecxKbsZdsRNoFh2cRrKRJH74QpGrz6ZUzK7e2h4BpQbq4xl",
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fposts%2Fpfbid0HwW5AD7wBqbpNgSriZecxKbsZdsRNoFh2cRrKRJH74QpGrz6ZUzK7e2h4BpQbq4xl&show_text=true&width=500",
    width: 500,
    height: 714,
  },
  {
    title: "Daily Planet post · pfbid02j94QL4CWHWeJodh3AavAtjsm1SFP8k2QorWLB72x892JedEHayhspqUGA8xCVjzQl",
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyPlanet%2Fposts%2Fpfbid02j94QL4CWHWeJodh3AavAtjsm1SFP8k2QorWLB72x892JedEHayhspqUGA8xCVjzQl&show_text=true&width=500",
    width: 500,
    height: 751,
  },
] satisfies SocialEmbed[];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, scrollTop / max)));
    };

    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => setWidth(node.getBoundingClientRect().width);
    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return { ref, width } as const;
}

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!ids.length) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        const id = (visible[0]?.target as HTMLElement | undefined)?.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.1, 0.25] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function scrollToId(id: string, behavior: ScrollBehavior) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior, block: "start" });
}

function MobileJumpBar({
  items,
  activeId,
  progress,
  onNavigate,
}: {
  items: SectionLink[];
  activeId: string;
  progress: number;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Jump to section"
      className={cn("md:hidden sticky top-0 z-20", "bg-surface/85 backdrop-blur-md border-b border-white/10")}
    >
      <div className="h-1 w-full bg-white/10 overflow-hidden" aria-hidden="true">
        <div className="h-full bg-accent/60" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-3">
        <div className="flex items-center gap-3">
          <p className="shrink-0 text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">On this page</p>

          <div className="relative min-w-0 flex-1">
            <select
              value={activeId}
              onChange={(event) => onNavigate(event.target.value)}
              className={cn(
                "w-full appearance-none rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2 pr-10",
                "text-[11px] font-mono uppercase tracking-widest text-text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              )}
              aria-label="Select section"
            >
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
              ⌄
            </span>
          </div>

          <div className="shrink-0 text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
            {Math.round(progress * 100)}%
          </div>
        </div>
      </div>
    </nav>
  );
}

function DesktopRail({
  items,
  activeId,
  progress,
  onNavigate,
}: {
  items: SectionLink[];
  activeId: string;
  progress: number;
  onNavigate: (id: string) => void;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-6">
        <div className="rounded-2xl border border-white/10 bg-surface-alt/10 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">On this page</p>
            <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">{Math.round(progress * 100)}%</p>
          </div>
          <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
            <div className="h-full bg-accent/60" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>

          <ul className="mt-4 space-y-2" role="list">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                      isActive
                        ? "bg-white/5 border border-white/15 text-text-primary"
                        : "border border-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 hover:border-white/10",
                    )}
                  >
                    <span className="text-sm tracking-tight">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function WindowFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
        </div>
        <p className="min-w-0 flex-1 truncate text-xs font-mono uppercase tracking-widest text-text-secondary/70">{title}</p>
        <span aria-hidden="true" className="h-6 w-6 rounded-full border border-white/10 bg-surface/40" />
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
  contentClassName,
}: {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 pt-10">
      <header className="max-w-3xl">
        <h2
          id={`${id}-title`}
          className="font-display text-[22px] sm:text-3xl md:text-2xl tracking-tight text-text-primary/90"
        >
          {title}
        </h2>
        {subtitle ? <p className="mt-2 text-xs font-mono uppercase tracking-widest text-text-secondary/70">{subtitle}</p> : null}
      </header>
      <div className={cn("mt-8", contentClassName)}>{children}</div>
    </section>
  );
}

function RailList({
  ariaLabel,
  items,
  className,
}: {
  ariaLabel: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={cn("relative mt-10", className)}>
      <span aria-hidden="true" className="absolute left-[30px] top-4 bottom-4 w-px bg-accent/25" />
      <ol className="grid gap-2 text-sm md:text-base text-text-secondary" aria-label={ariaLabel}>
        {items.map((item) => (
          <li key={item}>
            <div className="w-full rounded-2xl border border-white/10 bg-surface-alt/10 px-4 py-3">
              <span className="grid grid-cols-[28px_1fr] gap-4 items-center">
                <span className="relative justify-self-center self-center" aria-hidden="true">
                  <span className="absolute inset-0 -m-[7px] rounded-full border border-white/10" />
                  <span className="relative block h-2.5 w-2.5 rounded-full bg-accent/70" />
                </span>
                <span className="leading-relaxed">{item}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TvFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[28px]",
        "border border-white/10 bg-[#0b0b0e]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
      )}
      aria-label="TV frame"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/35 px-5 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <p className="min-w-0 flex-1 truncate text-[11px] font-mono uppercase tracking-widest text-text-secondary/75 text-center">
          {title}
        </p>
        <span aria-hidden="true" className="text-text-secondary/50">
          ⏵
        </span>
      </div>

      <div className="bg-black/20 p-5 md:p-6">
        <div
          className={cn(
            "mx-auto w-full max-w-[920px]",
            "rounded-[22px] border border-white/10 bg-black/30 overflow-hidden",
            "ring-1 ring-inset ring-white/5",
          )}
        >
          {children}
        </div>

        <div aria-hidden="true" className="mx-auto mt-5 h-2 w-32 rounded-full bg-white/8" />
      </div>
    </figure>
  );
}

function LegacyVideoClipsRail({ clips }: { clips: VideoClip[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeClip = activeIndex === null ? null : clips[activeIndex];
  const railRef = useRef<HTMLDivElement | null>(null);

  const segmentLabel = "Daily Planet Episode Segment";
  const getDisplayTitle = (title: string, index: number) => {
    const normalized = title.trim();
    if (/^segment id\\b/i.test(normalized)) return `Episode Segment ${index + 1}`;
    return normalized;
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
        return;
      }
      if (!clips.length) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((value) => (value === null ? 0 : (value + 1) % clips.length));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((value) => (value === null ? 0 : (value - 1 + clips.length) % clips.length));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, clips]);

  if (!clips.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">EPISODE SEGMENTS</p>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">0 segments</p>
        </div>
        <p className="mt-3 text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">Swipe to browse →</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Add clips to the <span className="font-mono">dailyPlanetClips</span> array (supports local files or embed URLs).
        </p>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={cn(
                "shrink-0 w-[240px] sm:w-[280px]",
                "aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">EPISODE SEGMENTS</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => railRef.current?.scrollBy({ left: -360, behavior: prefersReducedMotion ? "auto" : "smooth" })}
            className={cn(
              "hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-surface/30",
              "text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
            aria-label="Scroll segments left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => railRef.current?.scrollBy({ left: 360, behavior: prefersReducedMotion ? "auto" : "smooth" })}
            className={cn(
              "hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-surface/30",
              "text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
            aria-label="Scroll segments right"
          >
            →
          </button>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">{clips.length} segments</p>
        </div>
      </div>
      <p className="mt-3 text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">Swipe or use arrows to browse →</p>

      <div className="relative mt-6">
        <div
          ref={railRef}
          className={cn(
            "flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory",
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30",
          )}
        >
          {clips.map((clip, index) => (
            <button
              key={clip.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "snap-start shrink-0 w-[240px] sm:w-[280px] md:w-[320px]",
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
                "transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              )}
              aria-label={`Open clip ${index + 1}`}
            >
              <div className="relative aspect-video w-full">
                {clip.kind === "embed" ? (
                  <iframe
                    src={clip.src}
                    title=""
                    aria-hidden="true"
                    tabIndex={-1}
                    className="absolute inset-0 h-full w-full pointer-events-none opacity-95"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : clip.poster ? (
                  <img
                    src={clip.poster}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-black/0" aria-hidden="true" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/35" />
                <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/70">Clip {index + 1}</span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/70">Play</span>
                </div>
              </div>

              <div className="px-4 py-3">
                <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">{segmentLabel}</p>
                <p className="mt-1 text-sm leading-snug text-text-primary/90 line-clamp-2">{getDisplayTitle(clip.title, index)}</p>
              </div>
            </button>
          ))}
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface-alt/10 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface-alt/10 to-transparent" />
      </div>

      {activeClip ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded clip viewer"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 px-4 py-8"
          onClick={() => setActiveIndex(null)}
        >
          <div className="mx-auto flex min-h-full w-full max-w-5xl items-center justify-center">
            <div
              className={cn(
                "w-full overflow-hidden rounded-2xl border border-white/10 bg-surface/90 backdrop-blur",
                "shadow-[0_30px_80px_rgba(0,0,0,0.6)]",
                "flex max-h-[85vh] flex-col",
                prefersReducedMotion ? "" : "transition-[transform,opacity] duration-200",
              )}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
                <p className="min-w-0 flex-1 truncate text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                  Clip {activeIndex! + 1} of {clips.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((value) => (value === null ? 0 : (value - 1 + clips.length) % clips.length))}
                    className={cn(
                      "inline-flex items-center justify-center rounded-full border border-white/10 bg-surface/40 px-3 py-1.5",
                      "text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    )}
                    aria-label="Previous episode segment"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((value) => (value === null ? 0 : (value + 1) % clips.length))}
                    className={cn(
                      "inline-flex items-center justify-center rounded-full border border-white/10 bg-surface/40 px-3 py-1.5",
                      "text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    )}
                    aria-label="Next episode segment"
                  >
                    Next →
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    className={cn(
                      "inline-flex items-center justify-center rounded-full border border-white/10 bg-surface/40 px-3 py-1.5",
                      "text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    )}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="p-4 md:p-6">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    {activeClip.kind === "embed" ? (
                      <div className="relative aspect-video w-full">
                        <iframe
                          src={activeClip.src}
                          title={activeClip.title}
                          className="absolute inset-0 h-full w-full"
                          loading="lazy"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <video
                        src={activeClip.src}
                        className="h-full w-full"
                        controls
                        playsInline
                        preload="metadata"
                        poster={activeClip.poster}
                      />
                    )}
                  </div>
                  <p className="mt-4 text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">{segmentLabel}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {getDisplayTitle(activeClip.title, activeIndex!)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VideoClipsRail({ clips }: { clips: VideoClip[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeClip = clips[activeIndex] ?? clips[0];

  useEffect(() => {
    if (!clips.length) return;
    if (activeIndex < 0 || activeIndex >= clips.length) setActiveIndex(0);
  }, [activeIndex, clips.length]);

  const onPrevious = () => setActiveIndex((value) => (clips.length ? (value - 1 + clips.length) % clips.length : 0));
  const onNext = () => setActiveIndex((value) => (clips.length ? (value + 1) % clips.length : 0));

  if (!clips.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">EPISODE SEGMENTS</p>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">0 segments</p>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Add clips to the <span className="font-mono">dailyPlanetClips</span> array (supports local files or embed URLs).
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={cn(
                "aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">EPISODE SEGMENTS</p>
        <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">{clips.length} segments</p>
      </div>
      <p className="mt-3 text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">Select a segment to view.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="lg:hidden">
          <label
            className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70"
            htmlFor="daily-planet-segment-select"
          >
            Choose a segment
          </label>
          <div className="relative mt-2">
            <select
              id="daily-planet-segment-select"
              value={String(activeIndex)}
              onChange={(event) => setActiveIndex(Number(event.target.value))}
              className={cn(
                "w-full appearance-none rounded-2xl border border-white/10 bg-surface/40 px-4 py-3 pr-10",
                "text-[11px] font-mono uppercase tracking-widest text-text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              )}
              aria-label="Select a Daily Planet episode segment"
            >
              {clips.map((clip, index) => (
                <option key={clip.src} value={String(index)}>
                  {clip.title}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
              ⌄
            </span>
          </div>
        </div>

        <div className="hidden lg:block">
          <div
            className="max-h-[560px] overflow-auto pr-2"
            role="listbox"
            aria-label="Daily Planet episode segments"
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                onNext();
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                onPrevious();
              }
            }}
          >
            <div className="space-y-2">
              {clips.map((clip, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={clip.src}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-full rounded-2xl border bg-surface/40 p-3 text-left transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                      isActive ? "border-white/25 bg-white/5" : "border-white/10 hover:border-white/20 hover:bg-white/5",
                    )}
                  >
                    <div className="grid grid-cols-[132px_1fr] gap-4 items-center">
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/30">
                        {clip.kind === "embed" ? (
                          <iframe
                            src={clip.src}
                            title=""
                            aria-hidden="true"
                            tabIndex={-1}
                            className="absolute inset-0 h-full w-full pointer-events-none opacity-95"
                            loading="lazy"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : clip.poster ? (
                          <img
                            src={clip.poster}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent" aria-hidden="true" />
                        )}
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                        <div
                          aria-hidden="true"
                          className={cn(
                            "absolute left-2 top-2 rounded-full border border-white/10 bg-black/35 px-2 py-1",
                            "text-[10px] font-mono uppercase tracking-widest text-white/80",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary/70">
                          Daily Planet Episode Segment
                        </p>
                        <p className="mt-1 text-sm leading-snug text-text-primary">{clip.title}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <WindowFrame title="Daily Planet Episode Segment">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">Daily Planet Episode Segment</p>
                <h3 className="mt-2 font-display text-xl tracking-tight text-text-primary">{activeClip.title}</h3>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={onPrevious}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
                    "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  )}
                  aria-label="Previous episode segment"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
                    "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  )}
                  aria-label="Next episode segment"
                >
                  Next →
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              {activeClip.kind === "embed" ? (
                <div className="relative aspect-video w-full">
                  <iframe
                    src={activeClip.src}
                    title={`Daily Planet Episode Segment - ${activeClip.title}`}
                    className={cn("absolute inset-0 h-full w-full", prefersReducedMotion ? "" : "transition-opacity duration-300")}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video
                  src={activeClip.src}
                  className="h-full w-full"
                  controls
                  playsInline
                  preload="metadata"
                  poster={activeClip.poster}
                />
              )}
            </div>
          </WindowFrame>
        </div>
      </div>
    </div>
  );
}

function FacebookPosts({ posts }: { posts: SocialEmbed[] }) {
  const hasAny = posts.length > 0;

  if (!hasAny) {
    return (
      <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">FACEBOOK POSTS + IMAGES</p>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">0 items</p>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Add 2 Facebook embed URLs to <span className="font-mono">dailyPlanetFacebookPosts</span>.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent" aria-hidden="true" />
          <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">FACEBOOK POSTS + IMAGES</p>
        <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">
          {posts.length} items
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {posts.map((post) => (
          <FacebookPostCard key={post.src} post={post} />
        ))}
      </div>
    </div>
  );
}

function FacebookPostCard({ post }: { post: SocialEmbed }) {
  const embedWidth = post.width ?? 500;
  const embedHeight = post.height ?? 740;
  const { ref, width: containerWidth } = useContainerWidth<HTMLDivElement>();

  const maxScale = 0.92;
  const fallbackWidth = 360;
  const scale = Math.min(maxScale, (containerWidth || fallbackWidth) / embedWidth);
  const scaledHeight = Math.round(embedHeight * scale);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-3">
      <div ref={ref} className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <div className="relative w-full" style={{ height: scaledHeight }}>
          <iframe
            src={post.src}
            title={post.title}
            width={embedWidth}
            height={embedHeight}
            className="pointer-events-none absolute left-0 top-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            style={{
              width: embedWidth,
              height: embedHeight,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ImpactAccordion({
  items,
  activeId,
  onSelect,
}: {
  items: ImpactKpi[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 lg:hidden">
      {items.map((item) => {
        const isOpen = item.id === activeId;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border border-white/10 bg-surface-alt/10 overflow-hidden",
              "transition-colors",
              isOpen ? "bg-white/5 border-white/20" : "bg-surface-alt/10",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`impact-accordion-panel-${item.id}`}
              onClick={() => onSelect(isOpen ? "" : item.id)}
              className={cn(
                "group relative w-full px-5 py-4 pl-11 text-left",
                "before:absolute before:left-5 before:top-6 before:h-2.5 before:w-2.5 before:rounded-full before:border before:transition-all before:duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                isOpen
                  ? "before:border-accent/40 before:bg-accent/90 before:shadow-[0_0_0_4px_rgba(255,59,48,0.14)]"
                  : "before:border-white/15 before:bg-transparent hover:before:border-white/25 hover:before:bg-white/10",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-display text-base leading-snug text-text-primary">{item.title}</p>
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-surface/40 text-text-secondary transition-transform duration-200",
                    isOpen ? "rotate-180" : "rotate-0",
                  )}
                >
                  ▾
                </span>
              </div>
            </button>

            <div
              id={`impact-accordion-panel-${item.id}`}
              aria-hidden={!isOpen}
              className={cn(
                "overflow-hidden",
                "transition-[max-height,opacity,transform] duration-300",
                isOpen ? "max-h-[999px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
              )}
            >
              <div className="px-5 pb-5">
                <p className="text-[13px] leading-relaxed text-text-secondary">{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function DiscoveryDailyPlanetProjectPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
  const progress = useScrollProgress();
  const activeSection = useActiveSection(sectionLinks.map((s) => s.id));

  const snapshotCards = useMemo(() => project.snapshot, []);
  const [activeImpactId, setActiveImpactId] = useState(project.impactKpis[0]?.id ?? "");
  const activeImpact = useMemo(
    () => project.impactKpis.find((item) => item.id === activeImpactId) ?? project.impactKpis[0],
    [activeImpactId],
  );

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <MobileJumpBar items={sectionLinks} activeId={activeSection} progress={progress} onNavigate={(id) => scrollToId(id, scrollBehavior)} />

      <div className="mx-auto w-full max-w-6xl px-6 pt-10 md:pt-16 pb-24 md:pb-32">
        <header className="flex items-center">
          <Link
            href="/work"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
              "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
          >
            <span aria-hidden="true">←</span>
            <span>Back to Projects</span>
          </Link>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <section className="scroll-mt-16" id="overview">
              <p className="text-xs font-mono uppercase tracking-widest text-accent">Project #4</p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.03]">
                <span>Discovery Channel:</span> <em className="italic">Daily Planet</em>
              </h1>
              <p className="mt-4 text-xl md:text-2xl tracking-tight text-text-secondary">{project.subtitle}</p>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Overview</p>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">{project.overview}</p>
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">My Role</p>
                    <p className="mt-2 text-base text-text-secondary">{project.roleTitle}</p>
                    {project.roleScope[0] ? (
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.roleScope[0]}</p>
                    ) : null}
                  </div>
                </div>

                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Project snapshot</p>
                  <div className="mt-5 grid gap-5">
                    {snapshotCards.map((row) => (
                      <div key={row.label} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/70">{row.label}</p>
                        <p className="mt-2 text-base md:text-lg tracking-tight text-text-primary/90">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <div className="pt-10">
              <TvFrame title={headerImage.title}>
                <div className="relative aspect-video w-full">
                  <img
                    src={headerImage.src}
                    alt={headerImage.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_30%,rgba(255,255,255,0.06),rgba(0,0,0,0))]"
                  />
                </div>
              </TvFrame>
            </div>

            <div className="mt-16 border-t border-white/10" />

            <Section id="focus" title="Editorial Approach & Storytelling">
              <RailList ariaLabel="Editorial and storytelling focus" items={[...project.editorialFocus]} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="support" title="Production Support">
              <RailList ariaLabel="Production and editorial support" items={[...project.productionSupport]} />
              <div className="mt-10">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Final deliverables</p>
                <div className="mt-6">
                  <LegacyVideoClipsRail clips={dailyPlanetClips} />
                </div>
              </div>
              <div className="mt-10">
                <FacebookPosts posts={dailyPlanetFacebookPosts} />
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="impact" title="Impact" subtitle="SELECT A KPI TO VIEW MORE">
              <div>
                <ImpactAccordion items={project.impactKpis as unknown as ImpactKpi[]} activeId={activeImpactId} onSelect={setActiveImpactId} />
              </div>

              <div className="mt-8 hidden lg:grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="space-y-2 rounded-2xl border border-white/10 bg-surface-alt/10 p-2">
                    {project.impactKpis.map((item) => {
                      const isActive = item.id === activeImpactId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveImpactId(item.id)}
                          className={cn(
                            "w-full rounded-xl px-4 py-3 text-left text-[13px] leading-snug transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                            isActive ? "bg-white/5 text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-white/5",
                          )}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span>{item.title}</span>
                            <span aria-hidden="true" className={cn("text-text-secondary/50", isActive && "text-accent/80")}>
                              ↗
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <WindowFrame title="Impact">
                    <h3 className="font-display text-xl tracking-tight text-text-primary">{activeImpact?.title}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">{activeImpact?.description}</p>
                  </WindowFrame>
                </div>
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="tools" title="Tools & Skills" contentClassName="mt-6">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className={cn(
                      "inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-surface-alt/10",
                      "px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-text-secondary",
                      "text-center leading-snug whitespace-normal",
                      "sm:w-auto sm:justify-start sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-widest sm:leading-normal sm:text-left",
                    )}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <footer className="pt-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => scrollToId("overview", scrollBehavior)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
                    "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  )}
                >
                  <span aria-hidden="true">↑</span>
                  <span>Back to top</span>
                </button>

                <div className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">
                  {Math.round(progress * 100)}% read
                </div>
              </div>
            </footer>
          </div>

          <DesktopRail items={sectionLinks} activeId={activeSection} progress={progress} onNavigate={(id) => scrollToId(id, scrollBehavior)} />
        </div>
      </div>
    </main>
  );
}
