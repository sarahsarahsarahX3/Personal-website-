"use client";

import { useEffect, useMemo, useState } from "react";

function ArrowUpIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M12 5l-6 6m6-6l6 6M12 5v14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollToTop = () => {
    const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-surface/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(255,255,255,0.08),rgba(0,0,0,0))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 pb-28 md:pt-20 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="max-w-2xl">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/40 px-4 py-2 text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <ArrowUpIcon />
              Back to top
            </button>
            <h2 className="mt-3 font-display text-3xl md:text-4xl tracking-tight leading-[1.05]">
              Thanks for scrolling.
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                Quick Links
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <a
                  href="mailto:dawsone.sarah@gmail.com"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  dawsone.sarah@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/sarah-dawsone/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs font-mono uppercase tracking-widest text-text-secondary/60">
            © {year} Sarah Dawson
          </p>
        </div>
      </div>
    </footer>
  );
}
