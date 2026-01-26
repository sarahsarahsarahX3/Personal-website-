"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  { key: "partnerships", value: "50+", label: "Brand & Creator Partnerships" },
  { key: "assets", value: "1,000+", label: "Assets Produced Annually" },
  { key: "markets", value: "Global Markets", label: "U.S. & Canada" },
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
      className={`pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24 ${styles.section}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-y-10 md:gap-y-0 md:gap-x-10 items-start md:items-center">
          <div className={`col-span-12 md:col-span-10 md:col-start-2 ${styles.body}`}>
            <div className="relative mx-auto text-center">
              <div className="mx-auto max-w-[60ch]">
                <h2 id="home-bio-title" className="sr-only">
                  About
                </h2>
	                <p
	                  data-text="Hi, I’m Sarah Dawson."
	                  className={`font-display text-3xl md:text-3xl leading-[1.1] tracking-tight text-text-primary ${styles.headline}`}
	                >
	                  Hi, I’m Sarah Dawson.
	                </p>
                <p
                  data-text="MY TRACK RECORD"
                  className={`mt-5 text-xs font-mono uppercase tracking-[0.26em] text-text-secondary/75 ${styles.subheading}`}
                >
                  MY TRACK RECORD
                </p>
              </div>

	              <ul
	                aria-label="Highlights"
	                className={`mt-14 mx-auto grid w-full max-w-5xl grid-cols-2 items-start justify-items-center gap-x-10 gap-y-10 text-center sm:mt-16 sm:gap-x-14 sm:gap-y-12 md:grid-cols-3 md:justify-items-start md:gap-x-16 md:gap-y-14 md:text-left lg:gap-x-20 lg:gap-y-16 ${styles.metrics} ${metricsRevealed ? styles.metricsRevealed : ""}`}
	              >
                {HIGHLIGHTS.map(({ key, value, label }, index) => {
                  const counterConfig = counterConfigs[key];
                  const displayValue =
                    counterConfig && typeof counters[key] === "number"
                      ? formatCounterValue(counters[key], counterConfig)
                      : value;

                  return (
                  <li
                    key={key}
                    className={`w-full max-w-[22ch] md:max-w-none ${styles.metric}`}
                    style={{ ["--i" as string]: String(index) }}
                  >
                    <div className="min-w-0">
                      <div className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none text-text-primary">
                        {displayValue}
                      </div>
                      <div className="mt-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-text-secondary/75 leading-snug">
                        {label}
                      </div>
                    </div>
	                  </li>
	                  );
	                })}
	              </ul>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
