"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

type SectionLink = { id: string; label: string };

type MediaItem = {
  id: string;
  title: string;
  imageSrc?: string;
};

type Metric = {
  id: string;
  label: string;
  value: string;
  detail?: string;
};

const project = {
  title: "Procter & Gamble Beauty Content Hub",
  subtitle: "Growth Marketing and Content Strategy",
  overview:
    "This project focused on developing and optimizing SEO-driven editorial content for Procter & Gamble’s consumer-facing content hub to improve organic traffic and search visibility across beauty, health, and wellness topics.",
  role: "Copywriter & Content Strategist",
  objective:
    "Increase monthly organic traffic and search visibility for P&G Beauty’s owned content platform while delivering clear, expert-validated educational content designed to perform sustainably over time.",
  strategyIntro:
    "I implemented an SEO-led editorial strategy grounded in search intent, content structure, and credibility. The approach focused on:",
  strategyBullets: [
    "Mapping topics to high-intent user queries and audience needs",
    "Structuring content for clarity, scannability, and discoverability",
    "Optimizing for SEO, AEO, and GEO to support traditional and generative search",
    "Embedding subject-matter expert validation into the editorial workflow",
    "Designing evergreen content built to compound in performance",
  ],
  executionBullets: [
    "Wrote and published 50+ long-form, consumer-facing articles",
    "Conducted keyword research and SERP analysis to guide topic selection",
    "Optimized headlines, content structure, internal linking, and metadata",
    "Collaborated with scientists and subject-matter experts to validate claims",
    "Refreshed existing content based on performance insights",
    "Tracked and analyzed results using SEMrush and Google Analytics",
  ],
  resultsBullets: [
    "Increased monthly organic users from 110K to 250K (+126%) in four months",
    "Achieved 17.6% average month-over-month organic growth",
    "Generated 139.78K+ new organic sessions per month",
    "Raised domain authority to 44 with 4.52K backlinks and 788 referring domains",
    "Improved rankings and visibility across high-intent, evergreen content categories",
  ],
  tools: [
    "SEO & AEO Strategy",
    "Editorial Planning",
    "Long-Form Writing",
    "Search Intent Analysis",
    "SEMrush",
    "Google Analytics",
    "Performance Optimization",
    "Expert Collaboration",
  ],
} as const;

const metrics: Metric[] = [
  { id: "users", label: "Monthly organic search traffic", value: "110K → 250K" },
  { id: "growth", label: "Organic growth within four months", value: "+126%" },
  { id: "mom", label: "Average MoM organic growth", value: "17.6%" },
  { id: "sessions", label: "New organic sessions per month", value: "139.78K+" },
  { id: "authority", label: "Authority and backlinks", value: "DA 44", detail: "4.52K backlinks · 788 referring domains" },
];

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "strategy", label: "Strategy" },
  { id: "execution", label: "Execution" },
  { id: "results", label: "Results" },
  { id: "tools", label: "Tools" },
];

const articleMedia: MediaItem[] = [
  { id: "a1", title: "Digital article screenshot 01" },
  { id: "a2", title: "Digital article screenshot 02" },
  { id: "a3", title: "Digital article screenshot 03" },
  { id: "a4", title: "Digital article screenshot 04" },
  { id: "a5", title: "Digital article screenshot 05" },
  { id: "a6", title: "Digital article screenshot 06" },
];

const chartMedia: MediaItem[] = [
  { id: "c1", title: "Performance chart 01" },
  { id: "c2", title: "Performance chart 02" },
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-surface-alt/10 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-text-secondary">
      {children}
    </span>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 pt-10">
      <header className="max-w-3xl">
        <h2
          id={`${id}-title`}
          className="font-display text-2xl md:text-3xl tracking-tight text-text-secondary/85"
        >
          {title}
        </h2>
      </header>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function MobileJumpBar({
  items,
  activeId,
  onNavigate,
}: {
  items: SectionLink[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Jump to section"
      className={cn(
        "md:hidden sticky top-0 z-20",
        "bg-surface/85 backdrop-blur-md border-b border-white/10",
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[11px] font-mono uppercase tracking-widest transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                isActive
                  ? "bg-white/5 border-white/20 text-text-primary"
                  : "bg-surface-alt/10 border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5",
              )}
            >
              {item.label}
            </button>
          );
        })}
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
    <aside className="hidden xl:block sticky top-14 self-start">
      <div className="grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-surface-alt/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">On this page</p>
            <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">
              {Math.round(progress * 100)}%
            </p>
          </div>

          <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-accent/60" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>

          <ul className="mt-4 space-y-1.5">
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

        <div
          key={activeId}
          className={cn("rounded-2xl border border-white/10 bg-surface-alt/10 p-4", "transition-opacity duration-300")}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Overview</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.overview}</p>
        </div>
      </div>
    </aside>
  );
}

function MetricTabs({
  metrics,
  highlights,
  charts,
  onOpenChart,
}: {
  metrics: Metric[];
  highlights: Record<string, string>;
  charts: MediaItem[];
  onOpenChart: (id: string) => void;
}) {
  const [active, setActive] = useState(metrics[0]?.id ?? "");
  const activeMetric = metrics.find((m) => m.id === active) ?? metrics[0]!;

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div>
        <div role="tablist" aria-label="Result metrics" className="grid gap-2">
          {metrics.map((metric) => {
            const selected = metric.id === active;
            return (
              <button
                key={metric.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`metric-panel-${metric.id}`}
                id={`metric-tab-${metric.id}`}
                onClick={() => setActive(metric.id)}
                className={cn(
                  "rounded-2xl border bg-surface-alt/10 px-5 py-4 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  selected ? "border-white/25 bg-white/5" : "border-white/10 hover:bg-white/5 hover:border-white/20",
                )}
              >
                <p className="font-display text-2xl leading-none text-text-primary">{metric.value}</p>
                <p className="mt-2 text-xs font-mono uppercase tracking-widest text-text-secondary/80">
                  {metric.label}
                  {metric.detail ? ` · ${metric.detail}` : ""}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`metric-panel-${activeMetric.id}`}
        aria-labelledby={`metric-tab-${activeMetric.id}`}
        className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Highlight</p>
        <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight">{activeMetric.label}</h3>
        <p className="mt-5 text-base md:text-lg leading-relaxed text-text-secondary">
          {highlights[activeMetric.id] ?? ""}
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {charts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenChart(item.id)}
              className={cn(
                "group overflow-hidden rounded-2xl border border-white/10 bg-surface/40 text-left",
                "hover:border-white/20 hover:bg-white/5 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              )}
            >
              <div className="aspect-[16/10] bg-surface/40">
                {item.imageSrc ? (
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-4 text-center text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                    Add chart
                  </div>
                )}
              </div>
              <div className="px-4 py-3">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiagramCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-7">
      <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{title}</p>
      {subtitle ? <p className="mt-3 text-sm text-text-secondary">{subtitle}</p> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function NodeDiagram({
  nodes,
  activeIndex,
}: {
  nodes: Array<{ x: number; y: number }>;
  activeIndex: number;
}) {
  const path = nodes
    .map((node, index) => `${index === 0 ? "M" : "L"} ${node.x} ${node.y}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="Process diagram" className="w-full h-auto">
      <path d={path} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeLinecap="round" />

      {nodes.map((node, index) => {
        const isActive = index === activeIndex;
        return (
          <g key={`${node.x}-${node.y}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={7.5}
              fill="rgba(255,255,255,0.03)"
              stroke={isActive ? "rgba(255,59,48,0.9)" : "rgba(255,255,255,0.18)"}
              strokeWidth={isActive ? 2 : 1.25}
              style={{ transition: "stroke 200ms ease, stroke-width 200ms ease" }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={3.25}
              fill={isActive ? "rgba(255,59,48,0.95)" : "rgba(255,255,255,0.28)"}
              style={{ transition: "fill 200ms ease" }}
            />
          </g>
        );
      })}
    </svg>
  );
}

function useModal() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  return {
    open,
    activeId,
    closeButtonRef,
    openWith: (id: string) => {
      setActiveId(id);
      setOpen(true);
    },
    close: () => setOpen(false),
  };
}

function MediaGrid({ items, onOpen }: { items: MediaItem[]; onOpen: (id: string) => void }) {
  return (
    <ul role="list" className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onOpen(item.id)}
            className={cn(
              "group w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10",
              "hover:bg-white/5 hover:border-white/20 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
          >
            <div className="aspect-[4/3] bg-surface/40">
              {item.imageSrc ? (
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center px-4 text-center text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                  Add image
                </div>
              )}
            </div>
            <div className="px-4 py-3">
              <p className="text-sm tracking-tight text-text-primary line-clamp-2">{item.title}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Modal({
  open,
  title,
  imageSrc,
  onClose,
  closeButtonRef,
}: {
  open: boolean;
  title: string;
  imageSrc?: string;
  onClose: () => void;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 grid place-items-center p-6">
      <button type="button" aria-label="Close modal" onClick={onClose} className="absolute inset-0 bg-black/70" />
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-surface">
        <div className="flex items-center justify-between gap-6 border-b border-white/10 px-5 py-4">
          <p className="text-sm tracking-tight text-text-primary">{title}</p>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-surface-alt/10",
              "text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            )}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="bg-surface-alt/10">
          <div className="aspect-[16/10] w-full">
            {imageSrc ? (
              <img src={imageSrc} alt={title} className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                Add an imageSrc for this item
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PAndGBeautyContentHubProjectPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(sectionLinks.map((s) => s.id));
  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
  const [activeStrategyIndex, setActiveStrategyIndex] = useState(0);
  const [activeExecutionIndex, setActiveExecutionIndex] = useState(0);

  const highlights = useMemo<Record<string, string>>(
    () => ({
      users: "Increased monthly organic users from 110K to 250K (+126%) in four months",
      growth: "Increased monthly organic users from 110K to 250K (+126%) in four months",
      mom: "Achieved 17.6% average month-over-month organic growth",
      sessions: "Generated 139.78K+ new organic sessions per month",
      authority: "Raised domain authority to 44 with 4.52K backlinks and 788 referring domains",
    }),
    [],
  );

  const { open, activeId, closeButtonRef, openWith, close } = useModal();
  const activeMedia = useMemo(() => {
    const all = [...articleMedia, ...chartMedia];
    return all.find((item) => item.id === activeId) ?? all[0]!;
  }, [activeId]);

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <MobileJumpBar
        items={sectionLinks}
        activeId={activeSection}
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

        <div className="mt-10 grid gap-10 xl:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <section id="overview" className="scroll-mt-16">
              <p className="text-xs font-mono uppercase tracking-widest text-accent">Project #1</p>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.03]">
                {project.title}
              </h1>
              <p className="mt-4 text-xl md:text-2xl tracking-tight text-text-secondary">{project.subtitle}</p>

              <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Objective</p>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">{project.objective}</p>

                  <div className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">My Role:</span>
                    <span className="text-sm md:text-base text-text-secondary">Copywriter and Content Strategist</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Quick results</p>
                  <div className="mt-5 grid gap-4">
                    <div>
                      <p className="font-display text-3xl leading-none">110K → 250K</p>
                      <p className="mt-2 whitespace-nowrap text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/80">
                        Monthly organic search traffic
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-3xl leading-none">+126%</p>
                      <p className="mt-2 whitespace-nowrap text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/80">
                        Organic growth in four months
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => scrollToId("results", scrollBehavior)}
                        className={cn(
                          "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-mono uppercase tracking-widest",
                          "bg-text-primary text-surface hover:bg-white transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                        )}
                      >
                        View Results
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="strategy" title="Strategy">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">{project.strategyIntro}</p>

              <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
                <ul className="grid gap-3 text-sm md:text-base text-text-secondary">
                  {project.strategyBullets.map((bullet, index) => {
                    const isActive = index === activeStrategyIndex;
                    return (
                      <li key={bullet}>
                        <button
                          type="button"
                          onClick={() => setActiveStrategyIndex(index)}
                          onMouseEnter={() => setActiveStrategyIndex(index)}
                          onFocus={() => setActiveStrategyIndex(index)}
                          className={cn(
                            "group w-full rounded-2xl border bg-surface-alt/10 px-5 py-4 text-left transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                            isActive ? "border-white/20 bg-white/5" : "border-white/10 hover:border-white/20 hover:bg-white/5",
                          )}
                        >
                          <span className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className={cn(
                                "inline-flex h-2.5 w-2.5 shrink-0 rounded-full translate-y-[0.45em]",
                                isActive ? "bg-accent" : "bg-accent/70 group-hover:bg-accent/90",
                              )}
                            />
                            <span className="leading-relaxed">{bullet}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <DiagramCard title="Strategy map" subtitle="Hover or tap a pillar to highlight.">
                  <NodeDiagram
                    activeIndex={activeStrategyIndex}
                    nodes={[
                      { x: 18, y: 18 },
                      { x: 78, y: 28 },
                      { x: 26, y: 52 },
                      { x: 74, y: 64 },
                      { x: 34, y: 84 },
                    ]}
                  />
                </DiagramCard>
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="execution" title="Execution">
              <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <ol className="grid gap-3">
                  {(project.executionBullets as unknown as string[]).map((step, index) => {
                    const isActive = index === activeExecutionIndex;
                    return (
                      <li key={step}>
                        <button
                          type="button"
                          onClick={() => setActiveExecutionIndex(index)}
                          onMouseEnter={() => setActiveExecutionIndex(index)}
                          onFocus={() => setActiveExecutionIndex(index)}
                          className={cn(
                            "group w-full rounded-2xl border bg-surface-alt/10 px-5 py-4 text-left transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                            isActive ? "border-white/20 bg-white/5" : "border-white/10 hover:border-white/20 hover:bg-white/5",
                          )}
                        >
                          <span className="flex items-start gap-3">
                            <span className="mt-[2px] inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface/40 text-[11px] font-mono text-text-secondary">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm md:text-base leading-relaxed text-text-secondary">{step}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>

                <DiagramCard title="Execution flow" subtitle="A single workflow, tuned over time.">
                  <NodeDiagram
                    activeIndex={activeExecutionIndex}
                    nodes={[
                      { x: 22, y: 14 },
                      { x: 78, y: 26 },
                      { x: 28, y: 44 },
                      { x: 74, y: 58 },
                      { x: 30, y: 74 },
                      { x: 70, y: 88 },
                    ]}
                  />
                </DiagramCard>
              </div>

              <div className="mt-10">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Digital articles</p>
                <div className="mt-6">
                  <MediaGrid items={articleMedia} onOpen={openWith} />
                </div>
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="results" title="Results">
              <MetricTabs metrics={metrics} highlights={highlights} charts={chartMedia} onOpenChart={openWith} />
              <div className="mt-10 grid gap-3 max-w-3xl text-sm md:text-base text-text-secondary">
                {project.resultsBullets.map((line) => (
                  <p key={line} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="tools" title="Tools & Capabilities">
              <div className="flex flex-wrap gap-2">
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

      <Modal
        open={open}
        title={activeMedia?.title ?? "Preview"}
        imageSrc={activeMedia?.imageSrc}
        onClose={close}
        closeButtonRef={closeButtonRef}
      />
    </main>
  );
}
