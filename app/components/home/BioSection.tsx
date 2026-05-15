"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BriefcaseBusiness, Building2, Eye } from "lucide-react";
import styles from "./BioSection.module.css";

type Highlight = {
  key: string;
  value: string;
  label: string;
};

type CounterConfig = {
  target: number;
  prefix: string;
  suffix: string;
  useGrouping: boolean;
  decimals: number;
};

function parseCounterValue(raw: string): CounterConfig | null {
  const value = raw.trim();
  const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numberRaw, suffix] = match;
  const numeric = Number(numberRaw.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return null;

  const decimals = numberRaw.includes(".") ? numberRaw.split(".")[1]?.length ?? 0 : 0;
  const useGrouping = numberRaw.includes(",") || numeric >= 1000;

  return { target: numeric, prefix, suffix: suffix.trim(), useGrouping, decimals };
}

function formatCounterValue(value: number, config: CounterConfig) {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: config.decimals,
    minimumFractionDigits: config.decimals,
    useGrouping: config.useGrouping,
  });

  return `${config.prefix}${formatter.format(value)}${config.suffix}`;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const HIGHLIGHTS: readonly Highlight[] = [
  { key: "years", value: "7+", label: "Years of Experience" },
  { key: "fortune", value: "3", label: "Fortune 500 Brands" },
  { key: "views", value: "15M+", label: "Views Generated Across Platforms" },
] as const;

export function BioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [counters, setCounters] = useState<Record<string, number>>({});
  const [metricsRevealed, setMetricsRevealed] = useState(false);
  const hasAnimated = useRef(false);

  const counterConfigs = useMemo(() => {
    const entries = HIGHLIGHTS.map((item) => [item.key, parseCounterValue(item.value)] as const);
    return Object.fromEntries(entries) as Record<string, CounterConfig | null>;
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = Boolean(media?.matches);

    if (prefersReducedMotion) {
      element.style.setProperty("--bio-progress", "1");
      setMetricsRevealed(true);
      return;
    }

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    let raf: number | null = null;
    let active = false;
    let lastProgress = -1;

    const computeProgress = () => {
      if (!active) return;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      const start = viewportHeight * 0.92;
      const end = viewportHeight * 0.36;
      const raw = (start - rect.top) / (start - end);
      const progress = clamp01(raw);

      if (Math.abs(progress - lastProgress) > 0.002) {
        element.style.setProperty("--bio-progress", progress.toFixed(3));
        lastProgress = progress;
      }

      raf = window.requestAnimationFrame(computeProgress);
    };

    const startLoop = () => {
      if (active) return;
      active = true;
      lastProgress = -1;
      raf = window.requestAnimationFrame(computeProgress);
    };

    const stopLoop = () => {
      active = false;
      if (raf != null) window.cancelAnimationFrame(raf);
      raf = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) startLoop();
        else stopLoop();
      },
      { root: null, rootMargin: "240px 0px 240px 0px", threshold: 0 },
    );

    observer.observe(element);

    const onResize = () => {
      if (!active) return;
      lastProgress = -1;
    };

    window.addEventListener("resize", onResize);

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (media?.matches) {
      setMetricsRevealed(true);
      return;
    }

    let didReveal = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || didReveal) return;
        didReveal = true;
        setMetricsRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = Boolean(media?.matches);

    const activeConfigs = Object.entries(counterConfigs).filter(([, config]) => Boolean(config)) as Array<
      [string, CounterConfig]
    >;

    if (!activeConfigs.length) return;

    if (prefersReducedMotion) {
      const final: Record<string, number> = {};
      for (const [key, config] of activeConfigs) final[key] = config.target;
      setCounters(final);
      hasAnimated.current = true;
      return;
    }

    let raf = 0;

    const start = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const durationMs = 1800;
      const startTime = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - startTime) / durationMs));
        const eased = easeOutCubic(t);

        const next: Record<string, number> = {};
        for (const [key, config] of activeConfigs) {
          const current = config.target * eased;
          next[key] = config.decimals ? Number(current.toFixed(config.decimals)) : Math.round(current);
        }

        setCounters(next);

        if (t < 1) raf = window.requestAnimationFrame(tick);
      };

      raf = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) start();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
    };
  }, [counterConfigs]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-bio-title"
      className={`pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 ${styles.section}`}
    >
      <div className={`mx-auto w-full max-w-6xl px-6 ${styles.body}`}>
        <h2 id="home-bio-title" className="sr-only">
          About
        </h2>

        <div className="mx-auto max-w-4xl text-center">
          <p
            data-text="Hello, my name is Sarah Dawson."
            className={`font-display text-3xl leading-[1.08] tracking-tight text-text-primary md:text-4xl lg:text-5xl ${styles.headline}`}
          >
            Hello, my name is Sarah Dawson.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base tracking-tight text-text-secondary md:text-lg">
            I'm a marketing and communications professional specializing in content production, management, and strategy.
          </p>
          <p
            data-text="MY TRACK RECORD"
            className={`mt-10 text-sm font-display uppercase tracking-[0.14em] text-text-secondary/90 md:text-base ${styles.subheading}`}
          >
            MY TRACK RECORD
          </p>
        </div>

        <ul
          aria-label="Highlights"
          className={`mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 md:gap-10 ${styles.metrics} ${metricsRevealed ? styles.metricsRevealed : ""}`}
        >
          {HIGHLIGHTS.map(({ key, value, label }, index) => {
            const counterConfig = counterConfigs[key];
            const displayValue =
              counterConfig && typeof counters[key] === "number"
                ? formatCounterValue(counters[key], counterConfig)
                : value;
            const Icon = key === "years" ? BriefcaseBusiness : key === "fortune" ? Building2 : Eye;

            return (
              <li
                key={key}
                className={`w-full rounded-2xl border border-white/10 bg-surface/20 p-5 text-center md:p-6 ${styles.metric}`}
                style={{ ["--i" as string]: String(index) }}
              >
                <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-surface/30 text-text-secondary/80">
                  <Icon size={17} />
                </span>
                <div className="mt-4 font-display tabular-nums text-4xl leading-[0.98] tracking-tight text-text-primary md:text-5xl">
                  {displayValue}
                </div>
                <div className="mx-auto mt-3 max-w-[22ch] text-[10px] font-mono uppercase tracking-[0.18em] leading-relaxed text-text-secondary/70 sm:text-xs">
                  {label}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
