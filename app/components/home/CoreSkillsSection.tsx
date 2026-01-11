"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FlaskConical,
  Megaphone,
  PenLine,
  Search,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

type Skill = {
  key: string;
  name: string;
  blurb: string;
  Icon: LucideIcon;
};

const skills: Skill[] = [
  {
    key: "brand-storytelling",
    name: "Brand Storytelling",
    blurb: "Craft clear, compelling narratives that connect brand, audience, and purpose across marketing touchpoints.",
    Icon: Sparkles,
  },
  {
    name: "SEO + AEO Strategy",
    blurb: "Develop and optimize content strategies that improve discoverability, search visibility, and audience growth across traditional and AI-driven search.",
    Icon: Search,
    key: "seo-aeo",
  },
  {
    key: "integrated-marketing-campaigns",
    name: "Integrated Marketing Campaigns",
    blurb: "Develop content that supports brand growth, customer engagement, integrated campaigns, product launches, and seasonal initiatives.",
    Icon: Megaphone,
  },
  {
    key: "copywriting",
    name: "Copywriting",
    blurb: "Write and optimize conversion-focused copy across digital channels, aligning messaging with brand strategy, audience intent, and campaign objectives.",
    Icon: PenLine,
  },
  {
    key: "editorial-governance",
    name: "Editorial Governance",
    blurb: "Define editorial standards and steward brand voice to ensure consistency, quality, and clarity at scale.",
    Icon: FileText,
  },
  {
    key: "performance-marketing",
    name: "Performance Marketing",
    blurb: "Apply data and performance insights to optimize content, campaigns, and messaging for engagement, conversion, and measurable results.",
    Icon: Target,
  },
  {
    key: "subject-matter-expertise",
    name: "Subject-Matter Expertise",
    blurb: "Translate expert insight into accurate, on-brand content across beauty, health, technology, and science.",
    Icon: FlaskConical,
  },
  {
    key: "cross-functional-collaboration",
    name: "Cross-Functional Collaboration",
    blurb: "Partner across marketing, design, product, and education teams to deliver content at scale.",
    Icon: Users,
  },
];

type PreviewState = {
  skill: Skill;
  placement: "top" | "bottom";
};

export function CoreSkillsSection() {
  const [activeKey, setActiveKey] = useState(skills[0]?.key ?? "");
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [supportsHover, setSupportsHover] = useState(true);
  const hidePreviewTimeoutRef = useRef<number | null>(null);
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const previewXSpring = useSpring(previewX, { stiffness: 420, damping: 38, mass: 0.6 });
  const previewYSpring = useSpring(previewY, { stiffness: 420, damping: 38, mass: 0.6 });

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    if (!mediaQuery) return;

    const update = () => setSupportsHover(mediaQuery.matches);
    update();

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    // Safari fallback
    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  useEffect(() => {
    const onScroll = () => setPreview(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (hidePreviewTimeoutRef.current) window.clearTimeout(hidePreviewTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!preview || supportsHover) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-core-skill]")) return;
      setPreview(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [preview, supportsHover]);

  const updatePreviewPosition = (target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const tooltipWidth = 296;
    const tooltipHeight = 132;
    const offset = 12;

    const xMin = offset;
    const xMax = window.innerWidth - offset - tooltipWidth;
    const x = Math.min(xMax, Math.max(xMin, rect.left + rect.width / 2 - tooltipWidth / 2));

    const yMin = offset + tooltipHeight / 2;
    const yMax = window.innerHeight - offset - tooltipHeight / 2;

    const canPlaceTop = rect.top - offset - tooltipHeight >= offset;
    const preferredCenterY = canPlaceTop
      ? rect.top - offset - tooltipHeight / 2
      : rect.bottom + offset + tooltipHeight / 2;
    const y = Math.min(yMax, Math.max(yMin, preferredCenterY));

    const placement: PreviewState["placement"] = canPlaceTop ? "top" : "bottom";

    previewX.set(x);
    previewY.set(y - tooltipHeight / 2);
    return placement;
  };

  const showPreview = (skill: Skill, target: HTMLElement) => {
    if (hidePreviewTimeoutRef.current) {
      window.clearTimeout(hidePreviewTimeoutRef.current);
      hidePreviewTimeoutRef.current = null;
    }

    const placement = updatePreviewPosition(target);
    setPreview({ skill, placement });
  };

  const hidePreview = () => {
    if (!supportsHover) return;
    hidePreviewTimeoutRef.current = window.setTimeout(() => setPreview(null), 120);
  };

  return (
    <div className="relative isolate py-40 md:py-44 lg:py-52 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[-18%] top-[-25%] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[-18%] top-[10%] h-[520px] w-[520px] rounded-full bg-accent/8 blur-3xl" />
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.26] lg:opacity-[0.32] bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:34px_34px]" />
        {/* Coarse grid for desktop depth */}
        <div className="hidden lg:block absolute inset-0 opacity-[0.16] bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:170px_170px]" />
      </div>

      {/* Overlay grid so it stays visible (including over cards) */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.12] lg:opacity-[0.18] mix-blend-overlay bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:34px_34px]" />

      <div className="mx-auto w-full max-w-5xl px-6 relative z-20">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display">Where I Create Value</h2>
            </div>
            <div className="hidden md:block font-mono text-xs tracking-widest uppercase text-text-secondary/60">
              Hover to explore
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill, index) => {
              const isActive = skill.key === activeKey;
              const Icon = skill.Icon;

              return (
                <motion.button
                  key={skill.key}
                  type="button"
                  data-core-skill
                  onMouseEnter={(e) => {
                    setActiveKey(skill.key);
                    if (supportsHover) showPreview(skill, e.currentTarget);
                  }}
                  onMouseLeave={hidePreview}
                  onFocus={(e) => {
                    setActiveKey(skill.key);
                    showPreview(skill, e.currentTarget);
                  }}
                  onBlur={hidePreview}
                  onClick={(e) => {
                    setActiveKey(skill.key);
                    if (supportsHover) return;
                    if (preview?.skill.key === skill.key) {
                      setPreview(null);
                      return;
                    }
                    showPreview(skill, e.currentTarget);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "group relative min-h-[116px] rounded-2xl border border-white/10 bg-surface-alt/10 p-3 text-left",
                    "transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35",
                    isActive && "border-white/15 bg-surface-alt/20",
                    !isActive && "hover:border-white/15 hover:bg-surface-alt/15",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-xs tracking-widest text-text-secondary/70">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-2 text-[14px] font-medium leading-snug tracking-tight text-text-primary">
                        {skill.name}
                      </div>
                    </div>
                    <div className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-white/15">
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 transition-colors duration-300",
                          isActive ? "text-accent/90" : "text-text-secondary/80 group-hover:text-text-primary",
                        )}
                      />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute left-3 right-3 bottom-3 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
                      isActive && "opacity-100",
                    )}
                  >
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.header>

        <div className="h-14 md:h-16" />
      </div>

      {/* Floating skill preview */}
      {preview ? (
        <motion.div
          key={preview.skill.key}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-50 w-[296px] pointer-events-none"
          style={{
            left: previewXSpring,
            top: previewYSpring,
          }}
        >
          <div className="rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-px shadow-2xl shadow-black/60">
            <div className="rounded-xl border border-white/10 bg-surface/90 backdrop-blur-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm font-medium tracking-tight">{preview.skill.name}</div>
                <span className="font-mono text-[10px] tracking-widest text-text-secondary/70 uppercase">
                  Description
                </span>
              </div>
              <div className="mt-2 text-sm text-text-secondary leading-relaxed">
                {preview.skill.blurb}
              </div>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>
          </div>
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border border-white/10 bg-surface/90",
              "left-1/2 -translate-x-1/2",
              preview.placement === "top" ? "-bottom-1.5" : "-top-1.5",
            )}
          />
        </motion.div>
      ) : null}
    </div>
  );
}
