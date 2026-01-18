"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/app/lib/utils";

type SectionLink = { id: string; label: string };

type Metric = {
  id: string;
  listTitle: string;
  title: string;
  kpiLabel: string;
  description: string;
  value?: string;
};

type SnapshotCard = { title: string; value: string };

const deliverables = {
  articlePdf: {
    title: "SalonCentric Uplifts Black Beauty Excellence This New York Fashion Week SS 2024",
    fileName: "SalonCentric Uplifts Black Beauty Excellence This New York Fashion Week SS 2024.pdf",
  },
} as const;

const project = {
  title: "SalonCentric × New York Fashion Week",
  subtitle: "Integrated Campaign and Content Production",
  overview:
    "Led integrated campaign content for SalonCentric’s New York Fashion Week activation, including extending the live event into a multi-channel brand campaign across digital, social, and email. The campaign positioned SalonCentric as a thought leader and industry insider through culturally relevant storytelling, including coverage of the Black Beauty Excellence Luncheon.",
  role: "Copywriter and Campaign Content Lead",
  objective:
    "Anchored brand communications and campaign storytelling in the energy and cultural relevance of New York Fashion Week by highlighting professional artistry, backstage access, and inclusive industry moments. Positioned SalonCentric as an insider brand connected to fashion’s most influential stage, balancing prestige storytelling with performance-aware copy across experiential, social, and owned channels.",
  messagingIntro:
    "Define a campaign narrative that transformed NYFW moments into scalable, multi-channel brand storytelling by:",
  messagingBullets: [
    "Spotlighting professional artists through runway and backstage access.",
    "Positioning SalonCentric as a thought leader through clear, consistent brand communications during fashion’s most influential moment.",
    "Balancing prestige storytelling with performance-driven copy.",
    "Maintaining a unified narrative across live production and post-production event content.",
  ],
  productionIntro: "Produced campaign content and live-event coverage across channels, including:",
  productionBullets: [
    "Wrote campaign copy for social, email, and supporting digital assets.",
    "Supported real-time and post-event content tied to runway and cultural moments.",
    "Collaborated with experiential, social, brand, and email teams.",
    "Ensured brand voice consistency across paid, organic, and owned channels.",
    "Extended campaign lifespan through post-event amplification.",
  ],
  audience: [
    { label: "B2B", value: "Licensed beauty professionals and salon decision-makers" },
    { label: "DTC (Owned)", value: "SalonCentric web and email audiences" },
    { label: "Influencer & Media", value: "Fashion and beauty creators and cultural partners" },
    { label: "Industry", value: "Educators, brand partners, and key stakeholders" },
  ],
  snapshot: [
    { title: "Total Campaign Impressions", value: "1M+" },
    { title: "Multi-Channel Activation", value: "EXPERIENTIAL · SOCIAL · EDITORIAL · EMAIL · DIGITAL · PAID · OWNED · PR" },
    { title: "Headlining Industry Moment", value: "ALIGNED WITH NEW YORK FASHION WEEK" },
  ],
  channels: ["Experiential", "Social", "Email", "Digital", "Paid", "PR"],
  tools: [
    "Campaign Content Production",
    "Integrated Marketing",
    "Brand Communications",
    "Social & Email Copywriting",
    "Experiential Campaign Support",
    "Cross-Functional Collaboration",
    "Brand Messaging",
  ],
} as const;

const metrics: Metric[] = [
  {
    id: "total-impressions",
    value: "1M+",
    listTitle: "Total Campaign Impressions (1M+)",
    title: "Total Campaign Impressions",
    kpiLabel: "Campaign Reach",
    description:
      "Delivered 1M+ impressions across social, email, and digital channels through integrated campaign content tied to New York Fashion Week.",
  },
  {
    id: "social-engagement",
    listTitle: "Social Reach & Engagement",
    title: "Social Reach & Engagement",
    kpiLabel: "Content Performance",
    description:
      "Drove strong reach and engagement by translating live runway and backstage moments into platform-native social content.",
  },
  {
    id: "email-lift",
    listTitle: "Email Engagement Lift",
    title: "Email Engagement Lift",
    kpiLabel: "Owned Channel Engagement",
    description:
      "Supported increased engagement across NYFW-themed email campaigns aligned with the broader campaign narrative.",
  },
  {
    id: "amplification",
    listTitle: "Cross-Channel Content Amplification",
    title: "Cross-Channel Content Amplification",
    kpiLabel: "Integrated Execution",
    description:
      "Extended the impact of the in-person activation by coordinating content across experiential, social, and owned channels.",
  },
  {
    id: "brand-visibility",
    listTitle: "Brand Visibility During NYFW",
    title: "Brand Visibility During NYFW",
    kpiLabel: "Brand Presence",
    description:
      "Strengthened SalonCentric’s visibility and authority within the professional beauty space during a high-profile fashion event.",
  },
];

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "messaging", label: "Strategy" },
  { id: "production", label: "Execution" },
  { id: "results", label: "Results" },
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

function useIsMobileView() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(max-width: 768px)");
    if (!mq) return;
    const update = () => setIsMobileView(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    (mq as unknown as { addListener?: (listener: () => void) => void }).addListener?.(update);
    return () => {
      mq.removeEventListener?.("change", update);
      (mq as unknown as { removeListener?: (listener: () => void) => void }).removeListener?.(update);
    };
  }, []);

  return isMobileView;
}

function useVideoPosters(sources: string[]) {
  const [posters, setPosters] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    const capturePoster = (src: string) =>
      new Promise<string | null>((resolve) => {
        const video = document.createElement("video");
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.crossOrigin = "anonymous";
        video.src = src;

        const clean = () => {
          video.pause();
          video.removeAttribute("src");
          video.load();
        };

        const fail = () => {
          clean();
          resolve(null);
        };

        const onLoaded = async () => {
          try {
            const duration = Number.isFinite(video.duration) ? video.duration : 0;
            const targetTime = duration > 0 ? Math.min(0.5, Math.max(0.12, duration * 0.05)) : 0.12;
            video.currentTime = targetTime;

            await new Promise<void>((r) => {
              const onSeeked = () => r();
              video.addEventListener("seeked", onSeeked, { once: true });
            });

            const canvas = document.createElement("canvas");
            canvas.width = Math.max(1, video.videoWidth || 1);
            canvas.height = Math.max(1, video.videoHeight || 1);
            const ctx = canvas.getContext("2d");
            if (!ctx) return fail();

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const data = canvas.toDataURL("image/jpeg", 0.82);
            clean();
            resolve(data || null);
          } catch {
            fail();
          }
        };

        video.addEventListener("loadeddata", onLoaded, { once: true });
        video.addEventListener("error", fail, { once: true });
      });

    const run = async () => {
      for (const src of sources) {
        if (cancelled) return;
        if (posters[src]) continue;
        const data = await capturePoster(src);
        if (cancelled) return;
        if (!data) continue;
        setPosters((prev) => (prev[src] ? prev : { ...prev, [src]: data }));
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources.join("|")]);

  return posters;
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

function SquiggleMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 10"
      className={cn("h-2.5 w-5 shrink-0 text-accent/90", className)}
    >
      <path
        d="M1 6 C4 1 8 9 12 4 C16 -1 20 9 23 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({
  id,
  title,
  subtitle,
  titleClassName,
  children,
  contentClassName,
}: {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  titleClassName?: string;
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 pt-10">
      <header className="max-w-3xl">
        <h2
          id={`${id}-title`}
          className={cn(
            "font-display text-[22px] sm:text-3xl md:text-2xl tracking-tight text-text-primary/90",
            titleClassName,
          )}
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
      className={cn(
        "md:hidden sticky top-0 z-20",
        "bg-surface/85 backdrop-blur-md border-b border-white/10",
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-3">
        <div className="flex items-center gap-3">
          <p className="shrink-0 text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
            On this page
          </p>

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

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
            >
              ▾
            </span>
          </div>

          <p className="shrink-0 text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
            {Math.round(progress * 100)}%
          </p>
        </div>

        <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
          <div className="h-full bg-accent/60" style={{ width: `${Math.round(progress * 100)}%` }} />
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
    <aside className="hidden lg:block sticky top-14 self-start">
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
      </div>
    </aside>
  );
}

function WindowFrame({
  title,
  titleClassName,
  actions,
  children,
}: {
  title: string;
  titleClassName?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
        </div>
        <p
          className={cn(
            "min-w-0 flex-1 truncate text-xs font-mono uppercase tracking-widest text-text-secondary/70",
            titleClassName,
          )}
        >
          {title}
        </p>
        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : (
          <span aria-hidden="true" className="h-6 w-6 rounded-full border border-white/10 bg-surface/40" />
        )}
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}

function PlaceholderBlock({ label }: { label: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10",
        "before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]",
        "before:bg-[size:28px_28px] before:opacity-60",
      )}
    >
      <div className="relative flex min-h-[220px] items-end p-4 md:min-h-[260px]">
        <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{label}</p>
      </div>
    </div>
  );
}

function RailList({
  ariaLabel,
  items,
}: {
  ariaLabel: string;
  items: string[];
}) {
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

function ResultsAccordion({
  metrics,
  activeId,
  onSelect,
}: {
  metrics: Metric[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 lg:hidden">
      {metrics.map((metric) => {
        const isOpen = metric.id === activeId;
        return (
          <div
            key={metric.id}
            className={cn(
              "rounded-2xl border border-white/10 bg-surface-alt/10 overflow-hidden",
              "transition-colors",
              isOpen ? "bg-white/5 border-white/20" : "bg-surface-alt/10",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`metric-accordion-panel-${metric.id}`}
              onClick={() => onSelect(metric.id)}
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
                <p className="font-display text-base leading-snug text-text-primary line-clamp-2">{metric.listTitle}</p>
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
              id={`metric-accordion-panel-${metric.id}`}
              aria-hidden={!isOpen}
              className={cn(
                "overflow-hidden",
                "transition-[max-height,opacity,transform] duration-300",
                isOpen ? "max-h-[999px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
              )}
            >
              <div className="px-5 pb-5">
                <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Key performance indicator:</p>
                <h4 className="mt-3 font-display text-xl tracking-tight text-text-primary">{metric.kpiLabel}</h4>
                <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">{metric.description}</p>
                <div className="mt-6 grid gap-4">
                  <PlaceholderBlock label="KPI chart placeholder" />
                  <PlaceholderBlock label="Reporting screenshot placeholder" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SalonCentricNyfwProjectPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const progress = useScrollProgress();
  const isMobileView = useIsMobileView();
  const videoPosters = useVideoPosters([
    "/NYFW Social Reel 2.mov",
    "/NYFW Social Reel 3.mov",
    "/BBR Luncheon Reel 1.mov",
  ]);
  const [activeMetricId, setActiveMetricId] = useState(metrics[0]?.id ?? "");
  const activeMetric = useMemo(() => metrics.find((m) => m.id === activeMetricId) ?? metrics[0], [activeMetricId]);
  const activeSection = useActiveSection(sectionLinks.map((s) => s.id));
  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  const snapshotCards = useMemo<SnapshotCard[]>(
    () =>
      project.snapshot.map((item) => {
        if (item.title === "Multi-Channel Activation" || item.title === "Headlining Industry Moment") {
          return { title: item.value, value: item.title };
        }
        return { title: item.title, value: item.value };
      }),
    [],
  );

  const deliverablePdfHref = useMemo(() => `/${encodeURIComponent(deliverables.articlePdf.fileName)}`, []);
  const deliverablePdfPreviewSrc = useMemo(
    () =>
      isMobileView
        ? deliverablePdfHref
        : `${deliverablePdfHref}#view=FitH&toolbar=0&navpanes=0`,
    [deliverablePdfHref, isMobileView],
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
              <p className="text-xs font-mono uppercase tracking-widest text-accent">Project #2</p>
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

                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8 flex flex-col">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Campaign snapshot</p>

                  <div className="mt-5 grid gap-5">
                    {snapshotCards.map((card) => (
                      <div key={card.title}>
                        <p className="font-display text-[24px] leading-none">{card.value}</p>
                        <p className="mt-2 flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/80">
                          <SquiggleMark />
                          {card.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
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

              <figure className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-surface-alt/10">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-surface/40 px-4 py-3">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
                  </div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                    New York Fashion Week SS 2024
                  </p>
                  <span aria-hidden="true" className="text-text-secondary/50">
                    ⌄
                  </span>
                </div>

                <div className="bg-surface/30">
                  <div className="aspect-[16/9] w-full">
                    <img
                      src="/Header Image.png"
                      alt="SalonCentric × New York Fashion Week header image"
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
                <figcaption className="sr-only">Header image placeholder</figcaption>
              </figure>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="messaging" title="Campaign Messaging Strategy" contentClassName="mt-6">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">{project.messagingIntro}</p>
              <RailList ariaLabel="Campaign messaging points" items={[...project.messagingBullets]} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="production" title="Campaign Execution" contentClassName="mt-6">
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">{project.productionIntro}</p>
              <RailList ariaLabel="Content production points" items={[...project.productionBullets]} />
            </Section>

            <section id="deliverables" aria-labelledby="deliverables-title" className="scroll-mt-16 pt-10">
              <div className="flex items-end justify-between gap-6 pb-2">
                <h2
                  id="deliverables-title"
                  className="font-display text-[22px] sm:text-3xl md:text-2xl tracking-tight text-text-primary/90"
                >
                  Results
                </h2>
              </div>

              <div className="mt-8 grid gap-6">
                <WindowFrame
                  title="ARTICLE PREVIEW"
                  titleClassName="text-xs font-mono uppercase tracking-widest text-text-secondary/70"
                  actions={
                    <a
                      href={deliverablePdfHref}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-surface/40 px-3",
                        "text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                      )}
                    >
                      Open ↗
                    </a>
                  }
                >
                  <div className="rounded-2xl border border-white/10 bg-surface/40 overflow-hidden">
                    <div
                      className={cn(
                        "h-[75vh] min-h-[520px] lg:h-[62vh] lg:min-h-[420px] w-full",
                        "overflow-auto md:overflow-hidden",
                      )}
                      style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
                    >
                      {deliverablePdfHref ? (
                        isMobileView ? (
                          <object
                            data={deliverablePdfHref}
                            type="application/pdf"
                            aria-label={deliverables.articlePdf.title}
                            className="h-full w-full"
                          >
                            <iframe title={deliverables.articlePdf.title} src={deliverablePdfHref} className="h-full w-full border-0" />
                          </object>
                        ) : (
                          <iframe title={deliverables.articlePdf.title} src={deliverablePdfPreviewSrc} className="h-full w-full border-0" />
                        )
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                          Add a PDF file
                        </div>
                      )}
                    </div>
                  </div>
                </WindowFrame>

                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { src: "/NYFW Social Post 1.png", alt: "NYFW social post screenshot 1" },
                    { src: "/NYFW BBR Social Post 2.png", alt: "NYFW social post screenshot 2" },
                  ].map((post) => (
                    <WindowFrame key={post.src} title="Instagram post screenshot">
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40">
                        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              aria-hidden="true"
                              className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                                Instagram
                              </p>
                              <p className="truncate text-sm tracking-tight text-text-primary">saloncentric</p>
                            </div>
                          </div>
                          <span aria-hidden="true" className="text-text-secondary/60">
                            •••
                          </span>
                        </div>

                        <div className="p-2">
                          <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10">
                            <div className="relative aspect-[668/597] w-full bg-surface/30">
                              <img
                                src={post.src}
                                alt={post.alt}
                                className="h-full w-full object-contain"
                                loading="lazy"
                                decoding="async"
                              />
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/[0.04] to-black/[0.16]"
                              />
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </WindowFrame>
                  ))}
                </div>

                <WindowFrame title="NYFW & BBR LUNCHEON SOCIAL REELS">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                            Reels
                          </p>
                          <p className="truncate text-sm tracking-tight text-text-primary">saloncentric</p>
                        </div>
                      </div>
                      <span aria-hidden="true" className="text-text-secondary/60">
                        •••
                      </span>
                    </div>

                    <div className="p-3">
                      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                        {[
                          { src: "/NYFW Insta Social Reel_1.mov", label: "NYFW reel 1", poster: "/NYFW Social Reel SS 1 Pre.png" },
                          {
                            src: "/NYFW Social Reel 2.mov",
                            label: "NYFW reel 2",
                            poster: videoPosters["/NYFW Social Reel 2.mov"] ?? "/Header Image.png",
                          },
                          {
                            src: "/NYFW Social Reel 3.mov",
                            label: "NYFW reel 3",
                            poster: videoPosters["/NYFW Social Reel 3.mov"] ?? "/Header Image.png",
                          },
                          {
                            src: "/BBR Luncheon Reel 1.mov",
                            label: "BBR luncheon reel 1",
                            poster: videoPosters["/BBR Luncheon Reel 1.mov"] ?? "/NYFW BBR Social Post 2.png",
                          },
                        ].map((reel) => (
                          <div
                            key={reel.src}
                            className={cn(
                              "snap-start shrink-0",
                              "w-[220px] sm:w-[260px] md:w-[300px]",
                              "rounded-[26px] border border-white/10 bg-black/30 overflow-hidden",
                            )}
                          >
                            <div className="relative aspect-[9/16] w-full">
                              <video
                                src={reel.src}
                                poster={reel.poster}
                                controls
                                playsInline
                                preload="metadata"
                                className="h-full w-full object-cover"
                                aria-label={reel.label}
                              />
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-black/0"
                              />
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-black/0"
                              />
                              <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full border border-white/15 bg-black/35 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-white/80">
                                  Reel
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] text-text-secondary/70">
                        Swipe to view reels.
                      </p>
                    </div>
                  </div>
                </WindowFrame>
              </div>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <section id="results" aria-labelledby="results-title" className="scroll-mt-16 pt-10">
              <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2
                    id="results-title"
                    className="font-display text-[22px] sm:text-3xl md:text-2xl tracking-tight text-text-primary/90"
                  >
                    Results
                  </h2>
                  <p className="mt-2 text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                    Select a KPI to view the data.
                  </p>
                </div>
                <p className="text-xs text-text-secondary/70">Source: Campaign reporting.</p>
              </div>

              <ResultsAccordion metrics={metrics} activeId={activeMetricId} onSelect={setActiveMetricId} />

              <div className="mt-8 hidden lg:grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="space-y-2 rounded-2xl border border-white/10 bg-surface-alt/10 p-2">
                    {metrics.map((metric) => {
                      const isActive = metric.id === activeMetricId;
                      return (
                        <button
                          key={metric.id}
                          type="button"
                          onClick={() => setActiveMetricId(metric.id)}
                          className={cn(
                            "w-full rounded-xl px-4 py-3 text-left text-[13px] leading-snug transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                            isActive
                              ? "bg-white/5 text-text-primary"
                              : "text-text-secondary hover:text-text-primary hover:bg-white/5",
                          )}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span>{metric.listTitle}</span>
                            {metric.value ? (
                              <span className="rounded-full border border-white/10 bg-surface/30 px-2 py-0.5 text-[11px] font-mono text-text-secondary">
                                {metric.value}
                              </span>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <WindowFrame title="Key Performance Indicator:">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                      {activeMetric.kpiLabel}
                    </p>
                    <h3 className="mt-3 font-display text-xl tracking-tight text-text-primary">{activeMetric.title}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">{activeMetric.description}</p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <PlaceholderBlock label="KPI chart placeholder" />
                      <PlaceholderBlock label="Reporting screenshot placeholder" />
                    </div>
                  </WindowFrame>
                </div>
              </div>
            </section>

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
