"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";
import { ProjectPager } from "@/app/components/work/ProjectPager";

type SectionLink = { id: string; label: string };

type SnapshotCard = { title: string; value: string };

type PdfItem = {
  id: string;
  title: string;
  fileName?: string;
};

const deliverables = {
  articlePdf: {
    title: "SalonCentric AANHPI Integrated Campaign Article",
    fileName: "SalonCentric Celebrates AANHPI Coffee & Culture Fireside Chat.pdf",
  },
} as const;

const artistSpotlightPdfs: PdfItem[] = [
  { id: "mark-dolan", title: "Artist Spotlight: Mark Dolan", fileName: "Artist Spotlight: Mark Dolan.pdf" },
  { id: "emily-chen", title: "Artist Spotlight: Emily Chen", fileName: "Artist Spotlight: Emily Chen.pdf" },
  { id: "alyx-liu", title: "Artist Spotlight: Alyx Liu", fileName: "Artist Spotlight: Alyx Liu.pdf" },
  { id: "nick-barose", title: "Artist Spotlight: Nick Barose", fileName: "Artist Spotlight: Nick Barose.pdf" },
  { id: "philip-wolff", title: "Artist Spotlight: Philip Wolff", fileName: "Artist Spotlight: Philip Wolff.pdf" },
  { id: "winnie-huang", title: "Artist Spotlight: Winnie Huang", fileName: "Artist Spotlight: Winnie Huang.pdf" },
];

const project = {
  title: "SalonCentric x AANHPI Heritage Month",
  subtitle: "Integrated Campaign",
  overview:
    "Developed influencer and brand partner content for SalonCentric’s Asian American, Native Hawaiian, and Pacific Islander (AANHPI) Heritage Month campaign, using creator-led storytelling to support cultural relevance, brand credibility, and community engagement. The campaign paired authentic voices with clear brand messaging and multi-channel amplification across owned, organic, and paid platforms.",
  role: "Copywriter",
  snapshot: [
    { title: "Integrated Cultural Marketing", value: "AANHPI brand activations and live interviews" },
    { title: "Inclusive Brand Storytelling", value: "Authentic AANHPI voices and lived experiences" },
    { title: "Influencer Partnerships", value: "Collaborations with AANHPI beauty creators" },
    { title: "Multi-Channel Touchpoints", value: "Social, digital, and paid campaign rollout" },
    { title: "Beauty Professional Spotlights", value: "Featuring AANHPI stylists and industry leaders" },
  ],
  strategyBullets: [
    "Selected creators based on audience relevance, cultural credibility, and brand alignment.",
    "Partnered with creators and brands that reflected AANHPI values and professional beauty expertise.",
    "Balanced authentic creator expression with clear messaging guardrails.",
  ],
  messagingBullets: [
    "Developed creator briefs outlining key messages, tone, and brand voice.",
    "Defined guardrails to ensure consistency across creator content.",
    "Reviewed and refined copy to maintain narrative alignment.",
    "Coordinated approvals across internal teams and partners.",
  ],
  resultsBullets: [
    "Expanded reach and visibility through creator and paid amplification.",
    "Strong engagement across creator and brand-owned content.",
    "Reinforced SalonCentric’s commitment to AANHPI representation and inclusive storytelling.",
  ],
  tools: [
    "Influencer Marketing",
    "Integrated Campaigns",
    "Brand & Campaign Copywriting",
    "Creator Briefs",
    "Messaging Governance",
    "Cross-Functional Collaboration",
    "Integrated Marketing",
  ],
} as const;

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "strategy", label: "Strategy" },
  { id: "messaging", label: "Messaging" },
  { id: "deliverables", label: "Final Deliverables" },
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

function VideoWithAutoPoster({
  src,
  ariaLabel,
  className,
}: {
  src: string;
  ariaLabel: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [poster, setPoster] = useState<string>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let canceled = false;
    let captured = false;

    const capture = () => {
      if (canceled) return;
      if (captured) return;
      if (!video.videoWidth || !video.videoHeight) return;

      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        if (!canceled && dataUrl) {
          setPoster(dataUrl);
          captured = true;
        }
      } catch {
        // ignore capture errors
      }
    };

    const seekToCoverFrame = () => {
      if (canceled || captured) return;
      try {
        const duration = Number.isFinite(video.duration) ? video.duration : 0;
        const targetTime = duration > 0 ? Math.min(0.12, duration * 0.02) : 0.12;
        if (video.currentTime !== targetTime) video.currentTime = targetTime;
      } catch {
        // ignore seek errors
      }
    };

    const onLoadedMetadata = () => seekToCoverFrame();
    const onSeeked = () => window.requestAnimationFrame(() => capture());
    const onLoadedData = () => window.requestAnimationFrame(() => capture());

    if (video.readyState >= 1) onLoadedMetadata();
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onLoadedData);
    return () => {
      canceled = true;
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      className={cn("h-full w-full object-cover", className)}
      aria-label={ariaLabel}
    />
  );
}

function getPublicFileHref(fileName?: string) {
  return fileName ? `/${encodeURIComponent(fileName)}` : undefined;
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

export default function SalonCentricAanhpiProjectPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const progress = useScrollProgress();
  const isMobileView = useIsMobileView();
  const activeSection = useActiveSection(sectionLinks.map((s) => s.id));
  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
  const [activeArtistPdfId, setActiveArtistPdfId] = useState<string>(artistSpotlightPdfs[0]?.id ?? "");

  const snapshotCards = useMemo<SnapshotCard[]>(
    () => project.snapshot.map((item) => ({ title: item.title, value: item.value })),
    [],
  );

  const articlePdfHref = useMemo(() => {
    const fileName = deliverables.articlePdf.fileName;
    return getPublicFileHref(fileName);
  }, []);

  const articlePdfPreviewSrc = useMemo(() => {
    if (!articlePdfHref) return undefined;
    return isMobileView ? articlePdfHref : `${articlePdfHref}#view=FitH&toolbar=0&navpanes=0`;
  }, [articlePdfHref, isMobileView]);

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
              <p className="text-xs font-mono uppercase tracking-widest text-accent">Project #5</p>
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
                    <p className="mt-2 text-base text-text-secondary">{project.role}</p>
                  </div>
                </div>

                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8 flex flex-col">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                    Campaign snapshot
                  </p>

                  <div className="mt-5 grid gap-5">
                    {snapshotCards.map((card) => (
                      <div key={card.title}>
                        <p className="font-display text-[22px] leading-none">{card.title}</p>
                        <p className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/80">
                          {card.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      onClick={() => scrollToId("impact", scrollBehavior)}
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

              <div className="mt-8">
                <figure className="mx-auto w-full overflow-hidden rounded-3xl border border-white/10 bg-surface-alt/10 md:max-w-[520px]">
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-surface/40 px-4 py-3">
                      <div className="flex items-center gap-2" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
                      </div>
                      <p className="min-w-0 truncate text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                      AANHPI CAMPAIGN POSTER
                      </p>
                      <span aria-hidden="true" className="h-6 w-6 rounded-full border border-white/10 bg-surface/40" />
                  </div>

                  <div className="bg-surface/30">
                    <div className="mx-auto w-full max-w-[420px] py-5 md:py-7">
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40">
                        <div className="relative aspect-[1429/2000] w-full bg-surface/20">
                          <img
                            src="/AANHPI%20Project_Poster.png"
                            alt="SalonCentric AANHPI campaign poster"
                            className="h-full w-full object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/[0.03] to-black/[0.18]"
                          />
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <figcaption className="sr-only">AANHPI campaign poster image</figcaption>
                </figure>
              </div>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="strategy" title="Campaign Strategy" contentClassName="mt-6">
              <RailList ariaLabel="Campaign strategy points" items={[...project.strategyBullets]} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="messaging" title="Campaign Messaging" contentClassName="mt-6">
              <RailList ariaLabel="Campaign messaging points" items={[...project.messagingBullets]} />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="deliverables" title="Final Deliverables" contentClassName="mt-6">
              <WindowFrame
                title="ARTICLE PREVIEW"
                actions={
                  articlePdfHref ? (
                    <a
                      href={articlePdfHref}
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
                  ) : null
                }
              >
                <div className="rounded-2xl border border-white/10 bg-surface/40 overflow-hidden">
                  <div
                    className={cn(
                      "h-[75vh] min-h-[520px] lg:h-[60vh] lg:min-h-[420px] w-full",
                      "overflow-auto md:overflow-hidden",
                    )}
                    style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
                  >
                    {articlePdfPreviewSrc ? (
                      isMobileView ? (
                        <object
                          data={articlePdfHref}
                          type="application/pdf"
                          aria-label={deliverables.articlePdf.title}
                          className="h-full w-full"
                        >
                          <iframe title={deliverables.articlePdf.title} src={articlePdfHref} className="h-full w-full border-0" />
                        </object>
                      ) : (
                        <iframe title={deliverables.articlePdf.title} src={articlePdfPreviewSrc} className="h-full w-full border-0" />
                      )
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                        Add a PDF file
                      </div>
                    )}
                  </div>
                </div>
              </WindowFrame>

              <WindowFrame title="SOCIAL MEDIA POSTS + IMAGES">
                <div className="grid gap-6">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface/40 px-4 py-3">
                      <p className="min-w-0 truncate text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                        INSTAGRAM REELS
                      </p>
                      <span aria-hidden="true" className="text-text-secondary/50">
                        ⌄
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory md:justify-center md:overflow-visible md:pb-0 md:snap-none">
                        {[
                          { src: "/AANHPI Soical Video 2.mov", label: "AANHPI Instagram reel 2" },
                          { src: "/AANHPI Social Video 1.mov", label: "AANHPI Instagram reel 1" },
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
                              <VideoWithAutoPoster src={reel.src} ariaLabel={reel.label} />
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
                      <p className="mt-2 text-[11px] text-text-secondary/70">Swipe to view reels.</p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface/40 px-4 py-3">
                      <p className="min-w-0 truncate text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                        SOCIAL POST SCREENSHOTS
                      </p>
                      <span aria-hidden="true" className="text-text-secondary/50">
                        ⌄
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {[
                          { src: "/AANHPI Soical Post.png", alt: "AANHPI social post screenshot 1" },
                          { src: "/AANHPI Soical Post 2.png", alt: "AANHPI social post screenshot 2" },
                        ].map((post) => (
                          <div key={post.src} className="overflow-hidden rounded-2xl border border-white/10 bg-surface/30">
                            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
                              <div className="flex min-w-0 items-center gap-3">
                                <span
                                  aria-hidden="true"
                                  className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]"
                                />
                                <div className="min-w-0">
                                  <p className="truncate text-[10px] font-mono uppercase tracking-widest text-text-secondary/70">
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
                              <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40">
                                <div className="relative aspect-[673/594] w-full bg-surface/20">
                                  <img
                                    src={post.src}
                                    alt={post.alt}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                  <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/[0.03] to-black/[0.18]"
                                  />
                                  <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </WindowFrame>

              <WindowFrame title="AANHPI ARTIST SPOTLIGHT ARTICLES">
                {(() => {
                  const items = artistSpotlightPdfs.map((pdf) => ({
                    ...pdf,
                    href: getPublicFileHref(pdf.fileName),
                  }));
                  const active =
                    items.find((item) => item.id === activeArtistPdfId) ?? items[0] ?? null;
                  const previewSrc = active?.href
                    ? isMobileView
                      ? active.href
                      : `${active.href}#page=1&view=FitH&toolbar=0&navpanes=0`
                    : undefined;

                  if (isMobileView) {
                    return (
                      <div className="grid gap-3">
                        {items.map((pdf) => {
                          const isOpen = pdf.id === active?.id;
                          return (
                            <div
                              key={pdf.id}
                              className="overflow-hidden rounded-2xl border border-white/10 bg-surface-alt/10"
                            >
                              <button
                                type="button"
                                onClick={() => setActiveArtistPdfId(isOpen ? "" : pdf.id)}
                                aria-expanded={isOpen}
                                className={cn(
                                  "flex w-full items-start justify-between gap-4 px-4 py-3 text-left",
                                  "transition-colors hover:bg-white/[0.04]",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                                )}
                              >
                                <span className="min-w-0">
                                  <span className="block truncate text-sm tracking-tight text-text-primary">
                                    {pdf.title}
                                  </span>
                                  <span className="mt-1 block text-[10px] font-mono uppercase tracking-widest text-text-secondary/60">
                                    {pdf.href ? "Tap to preview" : "Add a PDF file"}
                                  </span>
                                </span>
                                <span aria-hidden="true" className="mt-1 text-text-secondary/70">
                                  {isOpen ? "–" : "+"}
                                </span>
                              </button>

                              {isOpen ? (
                                <div className="border-t border-white/10 bg-surface/30 p-3">
                                  <div className="mb-3 flex items-center justify-between gap-3">
                                    <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                                      Preview
                                    </p>
                                    {pdf.href ? (
                                      <a
                                        href={pdf.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={cn(
                                          "inline-flex h-8 items-center justify-center rounded-full border border-white/10 bg-surface/40 px-3",
                                          "text-[11px] font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                                        )}
                                      >
                                        Open ↗
                                      </a>
                                    ) : null}
                                  </div>

                                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40">
                                    <div
                                      className="h-[70vh] min-h-[520px] w-full overflow-auto"
                                      style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
                                    >
                                      {pdf.href ? (
                                        <object
                                          data={pdf.href}
                                          type="application/pdf"
                                          aria-label={pdf.title}
                                          className="h-full w-full"
                                        >
                                          <iframe title={pdf.title} src={pdf.href} className="h-full w-full border-0" />
                                        </object>
                                      ) : (
                                        <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                                          Add a PDF file
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  return (
                    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
                      <div className="grid gap-2">
                        {items.map((pdf) => {
                          const isActive = pdf.id === active?.id;
                          return (
                            <button
                              key={pdf.id}
                              type="button"
                              onClick={() => setActiveArtistPdfId(pdf.id)}
                              aria-pressed={isActive}
                              className={cn(
                                "w-full rounded-2xl border bg-surface-alt/10 p-4 text-left transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                                isActive
                                  ? "border-white/20 bg-white/[0.06] text-text-primary"
                                  : "border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/[0.06]",
                              )}
                            >
                              <p className="text-sm tracking-tight">{pdf.title}</p>
                              <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-text-secondary/60">
                                {pdf.href ? "Preview available" : "Add a PDF file"}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      <div className="min-w-0">
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40">
                          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-alt/10 px-4 py-3">
                            <p className="min-w-0 truncate text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">
                              Preview
                            </p>
                            {active?.href ? (
                              <a
                                href={active.href}
                                target="_blank"
                                rel="noreferrer"
                                className={cn(
                                  "inline-flex h-8 items-center justify-center rounded-full border border-white/10 bg-surface/40 px-3",
                                  "text-[11px] font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                                )}
                              >
                                Open ↗
                              </a>
                            ) : (
                              <span aria-hidden="true" className="h-6 w-6 rounded-full border border-white/10 bg-surface/40" />
                            )}
                          </div>

                          <div className="bg-surface/30">
                            <div
                              className={cn(
                                "h-[60vh] min-h-[420px] lg:h-[520px] w-full",
                                "overflow-auto md:overflow-hidden",
                              )}
                              style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
                            >
                              {previewSrc ? (
                                isMobileView ? (
                                  <object
                                    data={active?.href}
                                    type="application/pdf"
                                    aria-label={active?.title ?? "Artist spotlight PDF preview"}
                                    className="h-full w-full"
                                  >
                                    <iframe
                                      title={active?.title ?? "Artist spotlight PDF preview"}
                                      src={active?.href}
                                      className="h-full w-full border-0"
                                      loading="lazy"
                                    />
                                  </object>
                                ) : (
                                  <iframe
                                    title={active?.title ?? "Artist spotlight PDF preview"}
                                    src={previewSrc}
                                    className="h-full w-full border-0"
                                    loading="lazy"
                                  />
                                )
                              ) : (
                                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                                  Add a PDF file
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </WindowFrame>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="impact" title="Impact" contentClassName="mt-6">
              <RailList ariaLabel="Results and impact points" items={[...project.resultsBullets]} />
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
              <ProjectPager currentSlug="saloncentric-aanhpi" layout="inline" />
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
