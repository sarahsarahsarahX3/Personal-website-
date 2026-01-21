"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/app/lib/utils";
import { ProjectPager } from "@/app/components/work/ProjectPager";

type SectionLink = { id: string; label: string };

type HubArea = {
  id: string;
  title: string;
  description: string;
  artifactTitle: string;
  artifactNote: string;
};

const project = {
  number: "Project #6",
  title: "Digital Editorial Content Hub",
  subtitle: "Editorial Operations and Digital Publishing",
  overview:
    "Managed a digital editorial content hub from planning through publication, ensuring consistent messaging, reliable workflows, and clean execution across templates, modules, and governance standards.",
  role: "Editorial Operations and Content Management",
  snapshot: [
    {
      title: "Editorial Hub Management",
      description: "Own the system behind planning, publishing, and upkeep.",
    },
    {
      title: "Template and Module System",
      description: "Maintain reusable page patterns and content components.",
    },
    {
      title: "Governance and QA",
      description: "Standards for voice, accuracy, accessibility, and SEO.",
    },
    {
      title: "Performance Maintenance",
      description: "Support refresh cycles and quality improvements over time.",
    },
  ],
  impactBullets: [
    "Improved consistency across pages through shared templates and standards.",
    "Reduced friction in approvals with clear handoffs and documentation.",
    "Strengthened editorial reliability with QA checkpoints and publishing hygiene.",
    "Enabled scalable production by keeping systems organized and repeatable.",
  ],
  tools: [
    "Editorial Operations",
    "Content Governance",
    "Digital Publishing",
    "Information Architecture",
    "Workflow Design",
    "Content QA",
    "Cross-Functional Collaboration",
  ],
} as const;

const hubAreas: HubArea[] = [
  {
    id: "ia",
    title: "Information Architecture",
    description:
      "Designed and maintained taxonomy, navigation, and content structure so users can find what they need and editors can publish consistently.",
    artifactTitle: "Taxonomy and Navigation Map",
    artifactNote: "Add a sitemap or taxonomy screenshot here.",
  },
  {
    id: "calendar",
    title: "Editorial Planning",
    description:
      "Planned topics, cadence, and dependencies across stakeholders, aligning editorial priorities to business needs and channel requirements.",
    artifactTitle: "Editorial Calendar Snapshot",
    artifactNote: "Add a calendar screenshot or planning doc preview here.",
  },
  {
    id: "workflow",
    title: "Publishing Workflow",
    description:
      "Built a repeatable workflow from brief to publish, including review loops, asset readiness, and final QA checks before release.",
    artifactTitle: "Workflow Rail",
    artifactNote: "Add a workflow diagram or checklist preview here.",
  },
  {
    id: "standards",
    title: "Governance and QA",
    description:
      "Maintained editorial standards for voice, clarity, accuracy, and accessibility with documented guidelines and consistent checks.",
    artifactTitle: "Standards Checklist",
    artifactNote: "Add a style guide or QA checklist preview here.",
  },
  {
    id: "maintenance",
    title: "Content Maintenance",
    description:
      "Supported ongoing content health through updates, refresh cycles, and optimization passes to keep performance stable over time.",
    artifactTitle: "Refresh Log",
    artifactNote: "Add a before/after snapshot or refresh tracker preview here.",
  },
];

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "hub", label: "Hub System" },
  { id: "workflow", label: "Workflow" },
  { id: "governance", label: "Governance" },
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
      <div className={cn("mt-6", contentClassName)}>{children}</div>
    </section>
  );
}

function WindowFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-surface-alt/10">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-surface/40 px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
        </div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">{title}</p>
        <span aria-hidden="true" className="text-text-secondary/50">
          ⌄
        </span>
      </div>
      <div className="bg-surface/30">{children}</div>
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
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
    <aside className="hidden lg:block lg:sticky lg:top-20 h-fit">
      <div className="w-[320px] rounded-3xl border border-white/10 bg-surface-alt/10 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">On this page</p>
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">
            {Math.round(progress * 100)}%
          </p>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-accent/60" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>

        <nav aria-label="On this page" className="mt-6 grid gap-1">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full rounded-2xl px-4 py-3 text-left transition-colors",
                  "border border-transparent hover:border-white/10 hover:bg-white/[0.04]",
                  active ? "bg-white/[0.06] text-text-primary" : "text-text-secondary",
                )}
              >
                <span className="text-xs font-mono uppercase tracking-widest">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">More</p>
          <div className="mt-3 grid gap-2">
            <Link
              href="/work"
              className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-surface/40 px-4 py-3 text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors"
            >
              <span className="text-xs font-mono uppercase tracking-widest">Selected Work</span>
              <span aria-hidden="true" className="text-text-secondary/60">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

function HubSystem() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(hubAreas[0]?.id ?? "");
  const active = hubAreas.find((area) => area.id === activeId) ?? hubAreas[0]!;

  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
      <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">System Areas</p>
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">
            {String(hubAreas.findIndex((a) => a.id === activeId) + 1).padStart(2, "0")}/{String(hubAreas.length).padStart(2, "0")}
          </p>
        </div>

        <div role="tablist" aria-label="Hub areas" className="mt-4 grid gap-2">
          {hubAreas.map((area, index) => {
            const isActive = area.id === activeId;
            return (
              <button
                key={area.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`hub-panel-${area.id}`}
                id={`hub-tab-${area.id}`}
                onClick={() => setActiveId(area.id)}
                onMouseEnter={() => setActiveId(area.id)}
                className={cn(
                  "w-full rounded-2xl border px-4 py-3 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  isActive ? "border-white/20 bg-white/5" : "border-white/10 bg-surface/40 hover:border-white/20 hover:bg-white/5",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary/70">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-display text-base leading-snug text-text-primary">{area.title}</p>
                  </div>
                  <span aria-hidden="true" className={cn("text-text-secondary/60", isActive && "text-accent/80")}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-text-secondary/70">
          Hover or click a system area to view details.
        </p>
      </div>

      <div
        role="tabpanel"
        id={`hub-panel-${active.id}`}
        aria-labelledby={`hub-tab-${active.id}`}
        className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Selected</p>
          <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight">
            {active.title}
          </h3>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">
            {active.description}
          </p>
        </div>

        <div className="mt-8">
          <WindowFrame title={active.artifactTitle}>
            <div className="p-5 md:p-6">
              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-5">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.55] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:26px_26px]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
                  />
                  <div className="relative">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Artifact placeholder</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {active.artifactNote}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-surface/40 p-5">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Common checks</p>
                  <ul className="mt-4 grid gap-3 text-sm text-text-secondary">
                    {[
                      "Template integrity",
                      "Content hierarchy",
                      "Linking and navigation",
                      "Accessibility and QA",
                      "Publishing readiness",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span aria-hidden="true" className="mt-[0.6rem] h-2 w-2 rounded-full bg-accent/70" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </WindowFrame>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const idx = hubAreas.findIndex((a) => a.id === active.id);
              const next = hubAreas[idx >= hubAreas.length - 1 ? 0 : idx + 1];
              setActiveId(next?.id ?? active.id);
            }}
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-mono uppercase tracking-widest bg-text-primary text-surface hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            Next Area
          </button>
          <button
            type="button"
            onClick={() => scrollToId("workflow", scrollBehavior)}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-surface/40 px-5 py-2.5 text-sm font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            View Workflow
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DigitalEditorialContentHubClient() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(sectionLinks.map((s) => s.id));

  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  const overviewChips = useMemo(
    () => [
      { label: "Role", value: project.role },
      { label: "Focus", value: "Digital publishing operations" },
      { label: "Primary goal", value: "Reliable editorial system" },
    ],
    [],
  );

  return (
    <main className="min-h-screen bg-surface pt-20 pb-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="min-w-0">
            <section id="overview" className="scroll-mt-16">
              <p className="text-xs font-mono uppercase tracking-widest text-accent">{project.number}</p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.03]">
                {project.title}
              </h1>
              <p className="mt-4 text-xl md:text-2xl tracking-tight text-text-secondary">{project.subtitle}</p>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Overview</p>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">{project.overview}</p>
                  <div className="mt-8">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">My Role</p>
                    <p className="mt-2 text-base md:text-base text-text-secondary">{project.role}</p>
                  </div>
                </div>

                <div className="h-full rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8 flex flex-col">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Hub snapshot</p>
                  <div className="mt-5 grid gap-5">
                    {project.snapshot.map((item) => (
                      <div key={item.title}>
                        <p className="font-display text-xl leading-none">{item.title}</p>
                        <p className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-text-secondary/80">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      onClick={() => scrollToId("hub", scrollBehavior)}
                      className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-mono uppercase tracking-widest bg-text-primary text-surface hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                    >
                      View Hub System
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-2">
                {overviewChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/40 px-3 py-2 text-xs text-text-secondary"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-text-secondary/70">
                      {chip.label}
                    </span>
                    <span className="text-text-secondary">{chip.value}</span>
                  </span>
                ))}
              </div>

              <div className="mt-10">
                <WindowFrame title="Editorial Content Hub Interface (Placeholder)">
                  <div className="p-5 md:p-6">
                    <div className="grid gap-5 md:grid-cols-[1fr_0.9fr] md:items-center">
                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-6">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-[0.55] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:26px_26px]"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -left-16 -bottom-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
                        />
                        <div className="relative">
                          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                            Add hub screenshot
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                            Replace this placeholder with a homepage or section view of the editorial hub.
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-3">
                        {[
                          { k: "Navigation", v: "Taxonomy and pathways for discovery" },
                          { k: "Modules", v: "Reusable cards and section patterns" },
                          { k: "Governance", v: "Standards and quality checks" },
                        ].map((row) => (
                          <div key={row.k} className="rounded-2xl border border-white/10 bg-surface/40 p-5">
                            <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">{row.k}</p>
                            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{row.v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </WindowFrame>
              </div>
            </section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="hub" title="Hub System" subtitle="Select an area for details." contentClassName="mt-8">
              <HubSystem />
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="workflow" title="Workflow" subtitle="A structured path from brief to publish." contentClassName="mt-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                <div className="relative">
                  <span aria-hidden="true" className="absolute left-[34px] top-4 bottom-4 w-px bg-accent/25" />
                  <ol className="grid gap-2 text-sm md:text-base text-text-secondary" aria-label="Workflow steps">
                    {[
                      "Brief and requirements aligned across stakeholders.",
                      "Draft production using templates and module guidelines.",
                      "Editorial review for voice, clarity, and accuracy.",
                      "QA checks for formatting, links, accessibility, and SEO hygiene.",
                      "Publish and validate across surfaces (web and owned channels).",
                      "Ongoing maintenance through updates and refresh cycles.",
                    ].map((item, index) => (
                      <li key={item}>
                        <div className="w-full rounded-2xl border border-white/10 bg-surface-alt/10 px-4 py-3 text-left">
                          <span className="grid grid-cols-[28px_1fr] gap-4 items-start">
                            <span className="relative justify-self-center mt-[0.35rem]" aria-hidden="true">
                              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface/40 text-[11px] font-mono text-text-secondary">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </span>
                            <span className="text-sm md:text-base leading-relaxed text-text-secondary">{item}</span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Reusable artifacts</p>
                  <div className="mt-5 grid gap-3">
                    {[
                      { title: "Publishing checklist", note: "Add a checklist or SOP preview." },
                      { title: "Template library", note: "Add template screenshots or links." },
                      { title: "Content QA rubric", note: "Add a QA rubric or style guide excerpt." },
                    ].map((card) => (
                      <div key={card.title} className="rounded-2xl border border-white/10 bg-surface/40 p-5">
                        <p className="font-display text-lg leading-none">{card.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{card.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="governance" title="Governance" subtitle="Standards that keep the hub consistent." contentClassName="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "Voice and messaging",
                    description: "Documented standards to keep language consistent across pages and modules.",
                  },
                  {
                    title: "Accuracy and review",
                    description: "Clear approval steps and checks for sensitive or technical content.",
                  },
                  {
                    title: "Accessibility and quality",
                    description: "Baseline checks to support readability, contrast, link integrity, and structure.",
                  },
                  {
                    title: "Search hygiene",
                    description: "Guidelines for headings, internal linking, metadata, and scannability.",
                  },
                ].map((card) => (
                  <div key={card.title} className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-7">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">Standard</p>
                    <h3 className="mt-3 font-display text-2xl tracking-tight">{card.title}</h3>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-text-secondary">{card.description}</p>
                  </div>
                ))}
              </div>
            </Section>

            <div className="mt-16 border-t border-white/10" />

            <Section id="impact" title="Impact" subtitle="Select a KPI for details.">
              <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-8">
                <p className="text-sm md:text-base leading-relaxed text-text-secondary">
                  This work focused on operational clarity and editorial consistency. The impact shows up in reliability, repeatability, and the quality of execution across the hub.
                </p>
                <ul className="mt-6 grid gap-3 text-sm md:text-base text-text-secondary">
                  {project.impactBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-[0.6rem] h-2 w-2 rounded-full bg-accent/70" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
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
              <ProjectPager currentSlug="digital-editorial-content-hub" layout="inline" />
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

