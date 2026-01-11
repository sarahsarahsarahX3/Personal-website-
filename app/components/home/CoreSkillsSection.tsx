"use client";

import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { cn } from "@/app/lib/utils";
import styles from "./CoreSkillsSection.module.css";
import { CoreSkillViz, type CoreSkillVizId } from "@/app/components/home/CoreSkillViz";

type ValueArea = {
  id: CoreSkillVizId;
  index: string;
  title: string;
  description: string;
};

const valueAreas: ValueArea[] = [
  {
    id: "integrated-marketing-campaigns",
    index: "01",
    title: "Integrated Campaigns",
    description:
      "Develop content that supports brand growth, customer engagement, integrated campaigns, product launches, and seasonal initiatives.",
  },
  {
    id: "copywriting",
    index: "02",
    title: "Copywriting",
    description:
      "Write and optimize conversion-focused copy across digital channels, aligning messaging with brand strategy, audience intent, and campaign objectives.",
  },
  {
    id: "editorial-governance",
    index: "03",
    title: "Editorial Leadership",
    description:
      "Define editorial standards and steward brand voice to ensure consistency, quality, and clarity at scale.",
  },
  {
    id: "seo-aeo",
    index: "04",
    title: "SEO + AEO Strategy",
    description:
      "Develop and optimize content strategies that improve discoverability, search visibility, and audience growth across traditional and AI-driven search.",
  },
  {
    id: "performance-marketing",
    index: "05",
    title: "Performance Marketing",
    description:
      "Apply data and performance insights to optimize content, campaigns, and messaging for engagement, conversion, and measurable results.",
  },
  {
    id: "brand-storytelling",
    index: "06",
    title: "Brand Storytelling",
    description:
      "Craft clear, compelling narratives that connect brand, audience, and purpose across marketing touchpoints.",
  },
  {
    id: "cross-functional-collaboration",
    index: "07",
    title: "Cross-Functional Collaboration",
    description: "Partner across marketing, design, product, and education teams to deliver content at scale.",
  },
];

export function CoreSkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeArea = useMemo(() => valueAreas[activeIndex] ?? valueAreas[0]!, [activeIndex]);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const count = valueAreas.length;
    if (count === 0) return;

    const key = event.key;
    const isVerticalNav = key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End";
    if (!isVerticalNav) return;
    event.preventDefault();

    const nextIndex =
      key === "Home"
        ? 0
        : key === "End"
          ? count - 1
          : key === "ArrowDown"
            ? (activeIndex + 1) % count
            : (activeIndex - 1 + count) % count;

    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section aria-labelledby="where-i-create-value-title" className="py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="flex items-baseline justify-between gap-6">
          <h2
            id="where-i-create-value-title"
            className="w-full font-display text-3xl md:text-4xl tracking-tight text-center md:text-left"
          >
            Core Competencies
          </h2>
        </header>

        <div className="mt-12 grid gap-10 md:grid-cols-[340px_minmax(0,708px)] md:gap-14">
          {/* Left column: value areas */}
          <div className="md:sticky md:top-28 self-start">
            {/* Mobile: accordion */}
            <div className="md:hidden rounded-2xl border border-white/10 bg-surface-alt/10 backdrop-blur-sm">
              <ul role="list" className="divide-y divide-white/10">
                {valueAreas.map((area, index) => {
                  const isActive = index === activeIndex;
                  const isOpen = index === openIndex;
                  const triggerId = `value-acc-trigger-${area.id}`;
                  const regionId = `value-acc-panel-${area.id}`;

                  return (
                    <li key={area.id} className="relative">
                      <button
                        id={triggerId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={regionId}
                        onClick={() => {
                          setActiveIndex(index);
                          setOpenIndex(index);
                        }}
                        className={cn(
                          "group w-full text-left px-5 py-4",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-inset",
                          "transition-colors duration-200",
                          "border-l-2 border-l-transparent",
                          isActive ? "bg-white/6 border-l-accent/80" : "hover:bg-white/3 hover:border-l-white/15",
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <span
                              className={cn(
                                "font-mono text-xs tracking-widest",
                                isActive ? "text-accent/90" : "text-text-secondary/65 group-hover:text-text-secondary",
                              )}
                            >
                              {area.index}
                            </span>
                            <span
                              className={cn(
                                "truncate text-[15px] tracking-tight",
                                isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary",
                              )}
                            >
                              {area.title}
                            </span>
                          </div>

                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-6 w-px bg-white/10 transition-colors duration-200",
                              isActive ? "bg-accent/55" : "bg-white/10 group-hover:bg-white/20",
                            )}
                          />
                        </div>
                      </button>

                      <div
                        id={regionId}
                        role="region"
                        aria-labelledby={triggerId}
                        className={cn("px-5 pb-5 -mt-1", styles.accordion, isOpen && styles.accordionOpen)}
                      >
                        <div className={styles.accordionInner}>
                          <div className="pt-3 text-sm leading-relaxed text-text-secondary">{area.description}</div>
                          <div className="mt-5 h-[220px] rounded-xl border border-white/10 overflow-hidden">
                            <CoreSkillViz id={area.id} />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Desktop: tabs */}
            <div
              role="tablist"
              aria-label="Core Competencies"
              aria-orientation="vertical"
              className="hidden md:block rounded-2xl border border-white/10 bg-surface-alt/10 backdrop-blur-sm"
            >
              <ul role="list" className="divide-y divide-white/10">
                {valueAreas.map((area, index) => {
                  const isActive = index === activeIndex;
                  const tabId = `value-tab-${area.id}`;

                  return (
                    <li key={area.id} className="relative">
                      <button
                        ref={(node) => {
                          tabRefs.current[index] = node;
                        }}
                        id={tabId}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="value-detail-panel"
                        tabIndex={isActive ? 0 : -1}
                        onKeyDown={onTabKeyDown}
                        onFocus={() => setActiveIndex(index)}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          "group w-full text-left px-6 py-5",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-inset",
                          "transition-colors duration-200",
                          "border-l-2 border-l-transparent",
                          isActive ? "bg-white/6 border-l-accent/80" : "hover:bg-white/3 hover:border-l-white/15",
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <span
                              className={cn(
                                "font-mono text-xs tracking-widest",
                                isActive ? "text-accent/90" : "text-text-secondary/65 group-hover:text-text-secondary",
                              )}
                            >
                              {area.index}
                            </span>
                            <span
                              className={cn(
                                "truncate text-[15px] tracking-tight",
                                isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary",
                              )}
                            >
                              {area.title}
                            </span>
                          </div>

                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-6 w-px bg-white/10 transition-colors duration-200",
                              isActive ? "bg-accent/55" : "bg-white/10 group-hover:bg-white/20",
                            )}
                          />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right column: contextual content */}
          <div className="hidden md:block">
            <div
              id="value-detail-panel"
              role="tabpanel"
              aria-labelledby={`value-tab-${activeArea.id}`}
              className="rounded-2xl border border-white/10 bg-surface-alt/10 backdrop-blur-sm p-7 md:p-8 md:h-[521px]"
            >
              <div key={activeArea.id} className={cn("flex h-full flex-col", styles.detailInner)}>
                <div className="font-mono text-xs tracking-widest text-text-secondary/70">{activeArea.index}</div>
                <h3 className="mt-3 text-2xl md:text-[28px] font-display tracking-tight">
                  {activeArea.title}
                </h3>

                <p className="mt-6 text-base leading-relaxed text-text-secondary max-w-2xl">
                  {activeArea.description}
                </p>

                <div className="mt-auto pt-8">
                  <div className="h-[220px] md:h-[260px] rounded-xl border border-white/10 overflow-hidden">
                    <CoreSkillViz id={activeArea.id} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 hidden md:block font-mono text-[11px] tracking-widest uppercase text-text-secondary/55">
              Use ↑/↓ to navigate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
