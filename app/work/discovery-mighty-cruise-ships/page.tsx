"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/app/lib/utils";
import { ProjectPager } from "@/app/components/work/ProjectPager";

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

type TripPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

const project = {
  title: "Mighty Cruise Ships",
  subtitle: "Travel Documentary Series",
  role: "Production Assistant",
  overview:
    "Provided editorial and production support for Mighty Cruise Ships, a Discovery Channel documentary series. Contributed to the episode featuring the MS Roald Amundsen, the world’s first hybrid-powered expedition cruise ship. The project focused on translating complex engineering, environmental innovation, and real-world tourism expeditions into compelling storytelling for a global audience.",
  logline:
    "A hybrid-powered expedition cruise ship meets extreme conditions, cutting-edge engineering, and human resilience at sea.",
  snapshot: [
    { label: "Episode", value: 'Season 4, Episode 7: "MS Roald Amundsen"' },
    {
      label: "Primary Goal",
      value: "Document the world’s first hybrid-powered cruise ship on its voyage across Antarctica.",
    },
    { label: "Content Categories", value: "Travel · Tourism · Expedition · Maritime Engineering · Environment" },
    { label: "Distribution", value: "Aired in 150+ countries" },
  ] satisfies SnapshotRow[],
  storytellingFocus: [
    "Translate complex systems into clear, audience-first narrative beats.",
    "Balance technical accuracy with momentum, tension, and clarity.",
    "Spotlight environmental innovation without losing the human story.",
    "Shape a cohesive episode arc from live conditions and changing variables.",
  ],
  productionSupport: [
    "Supported production and editorial coordination across field and post workflows.",
    "Helped organize story inputs, notes, and select moments for episode assembly.",
    "Assisted with production logistics and deliverables to keep the episode on track.",
    "Maintained consistency with broadcast standards, tone, and documentary conventions.",
  ],
  impactKpis: [
    {
      id: "international-distribution",
      title: "International Distribution",
      description:
        "Supported editorial packaging and deliverables suitable for international broadcast distribution and localization workflows.",
    },
    {
      id: "flagship-series",
      title: "Flagship Series Contribution",
      description:
        "Contributed to a Discovery Channel documentary franchise by supporting episode-level production and editorial coordination.",
    },
    {
      id: "broadcast-delivery",
      title: "Broadcast Delivery",
      description:
        "Maintained reliable handoffs and supporting materials across production and post to keep delivery organized and standards-aligned.",
    },
    {
      id: "long-form-engagement",
      title: "Long-Form Engagement",
      description:
        "Helped keep complex engineering and expedition challenges clear and watchable through audience-first storytelling structure.",
    },
    {
      id: "series-reputation",
      title: "Series Reputation",
      description:
        "Protected tone and documentary integrity through detail-oriented support that reinforced trust in the series’ storytelling.",
    },
  ] satisfies ImpactKpi[],
  tools: [
    "Production Support",
    "Editorial Coordination",
    "Story Notes",
    "Broadcast Standards",
    "Cross-Functional Collaboration",
    "Creative Production",
    "Travel & Tourism Marketing",
    "Storytelling",
  ],
} as const;

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "focus", label: "Storytelling Focus" },
  { id: "support", label: "Production Support" },
  { id: "impact", label: "Impact" },
  { id: "tools", label: "Tools" },
];

const episodeClips = [
  {
    title: "Hurtigruten UK · Roald Amundsen clip",
    src: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FHurtigrutenUK%2Fvideos%2F1772286852926623%2F&show_text=false&width=1280&height=720&t=0",
  },
] as const;

const tripPhotos = [
  { src: "/0503f44f-70ec-4bcb-94e3-581515061189.jpg", alt: "Mighty Cruise Ships expedition photo" },
  { src: "/IMG_3193.png", alt: "Mighty Cruise Ships expedition photo" },
  { src: "/IMG_0424.jpg", alt: "Mighty Cruise Ships expedition photo" },
  { src: "/hi.jpg", alt: "Mighty Cruise Ships expedition photo" },
  { src: "/IMG_3938_edited.jpg", alt: "Mighty Cruise Ships expedition photo" },
  { src: "/P1020912.JPG", alt: "Mighty Cruise Ships expedition photo" },
  { src: "/f873d7ce-df5b-40c3-8ae5-503f74aafe41.jpg", alt: "Mighty Cruise Ships expedition photo" },
  { src: "/support.png", alt: "Mighty Cruise Ships expedition photo" },
] satisfies TripPhoto[];

const marketingMaterials = [
  {
    src: "/Mighty%20Cruise%20Ships%20Project%20Thumbnail.png",
    alt: "Mighty Cruise Ships show poster",
    caption: "Show poster",
  },
  {
    src: "/MCS%20Apple%20Tv.png",
    alt: "Mighty Cruise Ships marketing material",
    caption: "Apple TV",
  },
  {
    src: "/MCS%20City%20TV%20SS.png",
    alt: "Mighty Cruise Ships marketing material",
    caption: "City TV",
  },
  {
    src: "/MCS%20tile%202.png",
    alt: "Mighty Cruise Ships marketing material",
    caption: "Digital tile",
  },
] satisfies TripPhoto[];

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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-surface-alt/10",
        "px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-text-secondary",
        "text-center leading-snug whitespace-normal",
        "sm:w-auto sm:justify-start sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-widest sm:leading-normal sm:text-left",
      )}
    >
      {children}
    </span>
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
        {subtitle ? (
          <p className="mt-2 text-xs font-mono uppercase tracking-widest text-text-secondary/70">{subtitle}</p>
        ) : null}
      </header>
      <div className={cn("mt-8", contentClassName)}>{children}</div>
    </section>
  );
}

function RailList({ ariaLabel, items }: { ariaLabel: string; items: string[] }) {
  return (
    <div className="relative mt-10">
      <span aria-hidden="true" className="absolute left-[30px] top-4 bottom-4 w-px bg-accent/25" />
      <ol className="grid gap-2 text-sm md:text-base text-text-secondary" aria-label={ariaLabel}>
        {items.map((item) => (
          <li key={item}>
            <div className="w-full rounded-2xl border border-white/10 bg-surface-alt/10 px-4 py-3">
              <span className="grid grid-cols-[28px_1fr] gap-4 items-start">
                <span className="relative justify-self-center mt-[0.7rem]" aria-hidden="true">
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

function TripPhotoGallery({ photos }: { photos: TripPhoto[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

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

      if (!photos.length) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((value) => (value === null ? 0 : (value + 1) % photos.length));
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((value) => (value === null ? 0 : (value - 1 + photos.length) % photos.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, photos]);

  if (!photos.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
        <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Expedition photos</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">A photo gallery for Antarctica field moments.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={cn(
                "aspect-[4/5] rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent",
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
        <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Expedition photos</p>
        <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">{photos.length} frames</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20",
              "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
              "transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
            aria-label={`Open photo ${index + 1}`}
          >
            <div className="relative aspect-[4/5] w-full">
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/35" />
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/70">Frame {index + 1}</span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">View</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activePhoto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded photo viewer"
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
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
                <p className="min-w-0 flex-1 truncate text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                  Photo {activeIndex! + 1} of {photos.length}
                </p>
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

              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="grid gap-4 p-4 md:grid-cols-[1fr_220px] md:gap-6 md:p-6">
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20">
                    <img
                      src={activePhoto.src}
                      alt={activePhoto.alt}
                      className="w-full h-auto max-h-[62vh] md:max-h-[66vh] object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Caption</p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {activePhoto.caption ?? activePhoto.alt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveIndex((value) => (value === null ? 0 : (value - 1 + photos.length) % photos.length))
                        }
                        className={cn(
                          "inline-flex items-center justify-center rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
                          "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                        )}
                      >
                        ← Prev
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveIndex((value) => (value === null ? 0 : (value + 1) % photos.length))}
                        className={cn(
                          "inline-flex items-center justify-center rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
                          "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                        )}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MarketingMaterialsGallery({ items }: { items: TripPhoto[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

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

      if (!items.length) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((value) => (value === null ? 0 : (value + 1) % items.length));
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((value) => (value === null ? 0 : (value - 1 + items.length) % items.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items]);

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Marketing materials</p>
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">0 assets</p>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          A space for posters, key art, and campaign assets.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={cn(
                "aspect-[3/4] rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent",
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
        <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Marketing materials</p>
        <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">{items.length} assets</p>
      </div>

      <div className="relative mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "snap-start shrink-0 w-[220px] sm:w-[260px] md:w-[300px] lg:w-[320px]",
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
                "transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              )}
              aria-label={`Open asset ${index + 1}`}
            >
              <div className="relative aspect-[3/4] w-full">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25" />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4">
                <p className="text-[11px] font-mono uppercase tracking-widest text-white/70">
                  {item.caption ?? `Asset ${index + 1}`}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface-alt/10 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface-alt/10 to-transparent" />
      </div>

      {activeItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded asset viewer"
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
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
                <p className="min-w-0 flex-1 truncate text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                  Asset {activeIndex! + 1} of {items.length}
                </p>
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

              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="grid gap-4 p-4 md:grid-cols-[1fr_220px] md:gap-6 md:p-6">
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20">
                    <img
                      src={activeItem.src}
                      alt={activeItem.alt}
                      className="w-full h-auto max-h-[62vh] md:max-h-[66vh] object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Label</p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {activeItem.caption ?? activeItem.alt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveIndex((value) => (value === null ? 0 : (value - 1 + items.length) % items.length))
                        }
                        className={cn(
                          "inline-flex items-center justify-center rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
                          "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                        )}
                      >
                        ← Prev
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveIndex((value) => (value === null ? 0 : (value + 1) % items.length))}
                        className={cn(
                          "inline-flex items-center justify-center rounded-full border border-white/10 bg-surface-alt/10 px-4 py-2",
                          "text-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                        )}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function DiscoveryMightyCruiseShipsProjectPage() {
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
      <MobileJumpBar
        items={sectionLinks}
        activeId={activeSection}
        progress={progress}
        onNavigate={(id) => scrollToId(id, scrollBehavior)}
      />

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
            <section id="overview" className="scroll-mt-16">
              <p className="text-xs font-mono uppercase tracking-widest text-accent">Project #3</p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.03]">
                <em className="italic">Mighty Cruise Ships</em>
              </h1>
              <p className="mt-4 text-xl md:text-2xl tracking-tight text-text-secondary">{project.subtitle}</p>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Overview</p>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">
                    Provided editorial and production support for <em className="italic">Mighty Cruise Ships</em>, a
                    Discovery Channel documentary series. Contributed to the episode featuring the MS Roald Amundsen,
                    the world’s first hybrid-powered expedition cruise ship. The project focused on translating complex
                    engineering, environmental innovation, and real-world tourism expeditions into compelling
                    storytelling for a global audience.
                  </p>

                  <div className="mt-8">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">My Role</p>
                    <p className="mt-2 text-base md:text-base text-text-secondary">{project.role}</p>
                  </div>
                </div>

                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Project snapshot</p>
                  <div className="mt-5 grid gap-5">
                    {snapshotCards.map((row) => (
                      <div key={row.label} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                          {row.label}
                        </p>
                        <p className="mt-2 text-base md:text-lg tracking-tight text-text-primary/90">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <figure
                className={cn(
                  "mt-10 overflow-hidden rounded-[28px]",
                  "border border-white/10 bg-[#0b0b0e]",
                  "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
                )}
                aria-label="TV preview"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/35 px-5 py-3">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-white/25" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                  </div>
                  <p className="min-w-0 flex-1 truncate text-[11px] font-mono uppercase tracking-widest text-text-secondary/75 text-center">
                    “Roald Amundsen” (Season 4, Ep 7): Commercial Preview
                  </p>
                  <span aria-hidden="true" className="text-text-secondary/50">
                    ⏵
                  </span>
                </div>

                <div className="bg-black/20 p-5 md:p-6">
                  <div
                    className={cn(
                      "mx-auto w-full max-w-[720px]",
                      "rounded-[22px] border border-white/10 bg-black/30 overflow-hidden",
                      "ring-1 ring-inset ring-white/5",
                    )}
                  >
                    <div className="relative aspect-video w-full">
                      {episodeClips.map((clip) => (
                        <iframe
                          key={clip.src}
                          src={clip.src}
                          title={clip.title}
                          className="absolute inset-0 h-full w-full"
                          loading="lazy"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ))}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_30%,rgba(255,255,255,0.06),rgba(0,0,0,0))]"
                      />
                    </div>
                  </div>

                  <div aria-hidden="true" className="mx-auto mt-5 h-2 w-32 rounded-full bg-white/8" />
                </div>
              </figure>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="focus" title="Storytelling Focus" subtitle="Editorial clarity · documentary pacing">
              <RailList ariaLabel="Storytelling focus points" items={[...project.storytellingFocus]} />
            </Section>

            <div className="mt-10">
              <TripPhotoGallery photos={tripPhotos} />
            </div>

            <div className="mt-16 border-t border-white/10" />

            <Section id="support" title="Production & Editorial Support" subtitle="Support across production and editorial workflow">
              <RailList ariaLabel="Production and editorial support points" items={[...project.productionSupport]} />
              <div className="mt-10">
                <MarketingMaterialsGallery items={marketingMaterials} />
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="impact" title="Impact" subtitle="Select a KPI for details.">
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
                            isActive
                              ? "bg-white/5 text-text-primary"
                              : "text-text-secondary hover:text-text-primary hover:bg-white/5",
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
                  <WindowFrame title="Impact & Broadcast Reach">
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
                  <Pill key={tool}>{tool}</Pill>
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

            <div className="w-full max-w-[784px]">
              <ProjectPager currentSlug="discovery-mighty-cruise-ships" layout="inline" />
            </div>
          </div>

          <DesktopRail
            items={sectionLinks}
            activeId={activeSection}
            progress={progress}
            onNavigate={(id) => scrollToId(id, scrollBehavior)}
          />
        </div>
      </div>
    </main>
  );
}
