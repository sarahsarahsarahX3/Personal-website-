"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, BriefcaseBusiness, Building2, Megaphone, Sparkles } from "lucide-react";

const HIGHLIGHTS = [
  { key: "years", value: "7+", label: "Years of Experience" },
  { key: "fortune", value: "3", label: "Fortune 500 Brands" },
  { key: "collab", value: "80+", label: "Brand Collaborations" },
  { key: "views", value: "1M+", label: "Views Generated" },
  { key: "campaigns", value: "50+", label: "Campaigns and Product Launches" },
] as const;

export function KeyHighlightsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="key-highlights-title" className="pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-3xl bg-surface-alt/10 px-2 py-2 md:px-3 md:py-3">
          <header className="mb-8 px-3 pt-3 md:mb-10 md:px-5 md:pt-5 lg:mb-12">
            <h2
              id="key-highlights-title"
              className="text-sm md:text-base font-display uppercase tracking-[0.16em] text-text-secondary/90"
            >
              Key Highlights
            </h2>
          </header>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-5 lg:gap-5">
            {HIGHLIGHTS.map((item, index) => {
              const Icon =
                item.key === "years"
                  ? BriefcaseBusiness
                  : item.key === "fortune"
                    ? Building2
                    : item.key === "collab"
                      ? Sparkles
                      : item.key === "views"
                        ? Activity
                        : Megaphone;

              return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                className="group rounded-2xl bg-surface/20 px-5 py-5 md:px-6 md:py-6 lg:min-h-[168px] text-center"
              >
                <div className="flex items-center justify-center">
                  <div className="relative inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center">
                    {reduceMotion ? null : (
                      <>
                        <motion.svg
                          viewBox="0 0 64 64"
                          className="pointer-events-none absolute inset-0 h-full w-full"
                          initial={{ pathLength: 0, opacity: 0.25 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.75, delay: 0.14 + index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                          <motion.circle
                            cx="32"
                            cy="32"
                            r="29"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            className="text-text-secondary/40"
                            strokeLinecap="round"
                          />
                        </motion.svg>
                        <motion.span
                          className="pointer-events-none absolute inset-0 rounded-full border border-accent/45"
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileHover={{ opacity: [0, 0.5, 0], scale: [0.85, 1.18, 1.28] }}
                          transition={{ duration: 0.65, ease: "easeOut" }}
                        />
                      </>
                    )}
                    <motion.span
                      className="relative inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-surface/45 text-text-secondary/80"
                      initial={reduceMotion ? undefined : { opacity: 0, scale: 0.88 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.45, delay: 0.2 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                    >
                      <Icon size={26} />
                    </motion.span>
                  </div>
                </div>
                <p className="mt-5 font-display text-3xl md:text-4xl tracking-tight leading-none text-text-primary">{item.value}</p>
                <p className="mt-3 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.17em] leading-relaxed text-text-secondary/75">
                  {item.label}
                </p>
              </motion.li>
            );
          })}
          </ul>
        </div>
      </div>
    </section>
  );
}
