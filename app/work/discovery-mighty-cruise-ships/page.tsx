"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/app/lib/utils";

type SectionLink = { id: string; label: string };

type SnapshotRow = {
  label: string;
  value: string;
};

const project = {
  title: "Discovery Channel × Mighty Cruise Ships",
  subtitle: "Travel, Exploration, and Documentary Storytelling",
  role: "Production Assistant",
  overview:
    "Led editorial and production support for Mighty Cruise Ships, a Discovery Channel documentary series, contributing to the episode featuring the MS Roald Amundsen, the world’s first hybrid-powered expedition cruise ship. The project focused on translating complex engineering, environmental innovation, and real-world expedition challenges into compelling, broadcast-ready storytelling for a global audience.",
  logline:
    "A hybrid-powered expedition cruise ship meets extreme conditions, cutting-edge engineering, and human resilience at sea.",
  snapshot: [
    { label: "Format", value: "Broadcast Documentary Series" },
    { label: "Episode Focus", value: "MS Roald Amundsen (hybrid-powered expedition ship)" },
    { label: "Primary Goal", value: "Travel and Exploration Storytelling" },
    { label: "Focus Areas", value: "Travel · Engineering · Environment · Expedition Challenges" },
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
  impact: [
    {
      label: "International Distribution",
      value: "Supported editorial packaging and deliverables suitable for international broadcast distribution and localization workflows.",
    },
    {
      label: "Flagship Series Contribution",
      value: "Contributed to a Discovery Channel documentary franchise by supporting episode-level production and editorial coordination.",
    },
    {
      label: "Broadcast Delivery",
      value: "Maintained reliable handoffs and supporting materials across production and post to keep delivery organized and standards-aligned.",
    },
    {
      label: "Long-Form Engagement",
      value: "Helped keep complex engineering and expedition challenges clear and watchable through audience-first storytelling structure.",
    },
    {
      label: "Series Reputation",
      value: "Protected tone and documentary integrity through detail-oriented support that reinforced trust in the series’ storytelling.",
    },
  ] satisfies SnapshotRow[],
  tools: ["Production Support", "Editorial Coordination", "Story Notes", "Broadcast Standards", "Cross-Functional Collaboration"],
} as const;

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "focus", label: "Storytelling Focus" },
  { id: "support", label: "Production Support" },
  { id: "impact", label: "Impact" },
  { id: "tools", label: "Tools" },
];

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

        <div className="mt-3 h-px w-full bg-white/10 overflow-hidden">
          <div className="h-full bg-accent/80" style={{ width: `${progress * 100}%` }} />
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
          <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">On this page</p>
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

          <div className="mt-5">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-text-secondary/60">
              <span>Read</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="mt-2 h-px w-full bg-white/10 overflow-hidden">
              <div className="h-full bg-accent/80" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
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

export default function DiscoveryMightyCruiseShipsProjectPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
  const progress = useScrollProgress();
  const activeSection = useActiveSection(sectionLinks.map((s) => s.id));

  const snapshotCards = useMemo(() => project.snapshot, []);

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
                {project.title}
              </h1>
              <p className="mt-4 text-xl md:text-2xl tracking-tight text-text-secondary">{project.subtitle}</p>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Overview</p>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">{project.overview}</p>

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

              <figure className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-surface-alt/10">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-surface/40 px-4 py-3">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
                  </div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                    Episode visuals placeholder
                  </p>
                  <span aria-hidden="true" className="text-text-secondary/50">
                    ⌄
                  </span>
                </div>

                <div className="bg-surface/30">
                  <div className="aspect-[16/9] w-full">
                    <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                      Add 1–3 stills or production frames
                    </div>
                  </div>
                </div>
                <figcaption className="sr-only">Episode visuals placeholder</figcaption>
              </figure>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="focus" title="Storytelling Focus" subtitle="Editorial clarity · documentary pacing">
              <RailList ariaLabel="Storytelling focus points" items={[...project.storytellingFocus]} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="support" title="Production & Editorial Support" subtitle="Support across production and editorial workflow">
              <RailList ariaLabel="Production and editorial support points" items={[...project.productionSupport]} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="impact" title="Impact" subtitle="Impact & Broadcast Reach">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {project.impact.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-surface-alt/10 p-5">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{item.label}</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.value}</p>
                  </div>
                ))}
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="tools" title="Tools" contentClassName="mt-6">
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
