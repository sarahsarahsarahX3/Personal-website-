"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Globe2,
  Megaphone,
  MessageSquareText,
  PenLine,
  Search,
  Sparkles,
  Target,
  Waves,
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
    key: "storytelling",
    name: "Storytelling",
    blurb: "Narratives that clarify positioning and earn attention without losing performance.",
    Icon: Sparkles,
  },
  {
    key: "content-marketing",
    name: "Content Marketing",
    blurb: "Editorial systems and channel strategy that compound over time.",
    Icon: FileText,
  },
  {
    key: "seo-aeo",
    name: "SEO + AEO Strategy",
    blurb: "Search intent, structure, and answers that win in modern discovery.",
    Icon: Search,
  },
  {
    key: "integrated-campaigns",
    name: "Integrated Campaigns",
    blurb: "Launch planning across paid/owned/earned—aligned creative + measurable lift.",
    Icon: Megaphone,
  },
  {
    key: "copywriting",
    name: "Copywriting",
    blurb: "Voice-led, conversion-aware copy across headlines, hooks, and long-form.",
    Icon: PenLine,
  },
  {
    key: "content-creation",
    name: "Content Creation",
    blurb: "From concept to publish-ready assets that look good and read clearly.",
    Icon: Target,
  },
  {
    key: "digital-publishing",
    name: "Digital Publishing",
    blurb: "CMS workflows, packaging, and distribution built for reach and retention.",
    Icon: Globe2,
  },
  {
    key: "editorial-leadership",
    name: "Editorial Leadership",
    blurb: "Quality, cadence, and standards that keep teams shipping consistently.",
    Icon: Waves,
  },
  {
    key: "communications",
    name: "Communications",
    blurb: "Messaging and narratives that align stakeholders and land with audiences.",
    Icon: MessageSquareText,
  },
];

export function CoreSkillsSection() {
  const [activeKey, setActiveKey] = useState(skills[0]?.key ?? "");
  const active = useMemo(() => skills.find((s) => s.key === activeKey) ?? skills[0]!, [activeKey]);

  return (
    <div className="relative py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-18%] top-[-25%] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[-18%] top-[10%] h-[520px] w-[520px] rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-display">Core Skills</h2>
              <div className="mt-4 text-text-secondary text-lg text-balance">
                Capabilities, refined.
              </div>
            </div>
            <div className="hidden md:block font-mono text-xs tracking-widest uppercase text-text-secondary/60">
              Hover to explore
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[22rem_1fr] lg:items-start">
            <div className="rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-md p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="font-mono text-xs tracking-widest uppercase text-text-secondary/70">
                  Active
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <active.Icon className="h-5 w-5 text-accent/90" />
                </div>
                <div>
                  <div className="text-xl font-medium tracking-tight">{active.name}</div>
                  <div className="mt-2 text-text-secondary leading-relaxed">{active.blurb}</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-accent/70 via-white/25 to-accent/70"
                    style={{
                      width: `${Math.min(100, 18 + skills.findIndex((s) => s.key === activeKey) * 9)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill, index) => {
                const isActive = skill.key === activeKey;
                const Icon = skill.Icon;

                return (
                  <motion.button
                    key={skill.key}
                    type="button"
                    onMouseEnter={() => setActiveKey(skill.key)}
                    onFocus={() => setActiveKey(skill.key)}
                    onClick={() => setActiveKey(skill.key)}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "group relative rounded-2xl border border-white/10 bg-surface-alt/10 p-5 text-left",
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
                        <div className="mt-3 text-lg font-medium tracking-tight">{skill.name}</div>
                      </div>
                      <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-white/15">
                        <Icon className={cn("h-4 w-4 transition-colors duration-300", isActive ? "text-accent/90" : "text-text-secondary/80 group-hover:text-text-primary")} />
                      </div>
                    </div>

                    <div className="pointer-events-none absolute left-5 right-5 bottom-5 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className={cn("pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300", isActive && "opacity-100")}>
                      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.header>
      </div>
    </div>
  );
}
