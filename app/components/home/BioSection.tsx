"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./BioSection.module.css";

type Highlight = {
  key: string;
  Icon: () => React.ReactNode;
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

function IconFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon} aria-hidden="true">
      <rect x="6" y="6" width="36" height="36" rx="12" className={styles.iconPanel} />
      <rect x="6" y="6" width="36" height="36" rx="12" className={styles.iconBorder} />
      {children}
    </svg>
  );
}

function YearsIcon() {
  return (
    <IconFrame>
      <circle cx="24" cy="24" r="11" className={styles.iconRing} />
      <path d="M24 24V16.2" className={styles.iconGlyph} />
      <path d="M24 24L30.6 27.4" className={styles.iconGlyph} />
      <circle cx="24" cy="24" r="2" className={styles.iconAccentDot} />
      <path d="M16.6 32.2h14.8" className={styles.iconTick} />
    </IconFrame>
  );
}

function FortuneIcon() {
  return (
    <IconFrame>
      <path d="M24 14.6l9.6 5.6v10.9L24 36.4l-9.6-5.3V20.2L24 14.6Z" className={styles.iconGlyph} />
      <path d="M18.8 27.6v5.9" className={styles.iconGlyph} />
      <path d="M24 23.8v9.7" className={styles.iconGlyph} />
      <path d="M29.2 25.8v7.7" className={styles.iconGlyph} />
      <path d="M15.2 20.2L24 25l8.8-4.8" className={styles.iconTick} />
      <path d="M24 14.6v10.4" className={styles.iconTick} />
    </IconFrame>
  );
}

function ViewsIcon() {
  return (
    <IconFrame>
      <path
        d="M13.8 27.8c3.6-7 7.1 2.4 9.4-0.7 2.3-3.1 5.9-9.2 11.9-3.1"
        className={styles.iconGlyph}
      />
      <path d="M14 22h20" className={styles.iconTick} strokeDasharray="2 5" />
      <circle cx="14" cy="27.8" r="1.7" className={styles.iconAccentDot} style={{ opacity: 0.55 }} />
      <circle cx="23.2" cy="27.1" r="1.7" className={styles.iconAccentDot} style={{ opacity: 0.35 }} />
      <circle cx="35.1" cy="24.7" r="1.7" className={styles.iconAccentDot} style={{ opacity: 0.45 }} />
      <path d="M16.2 33.6h15.6" className={styles.iconTick} />
    </IconFrame>
  );
}

function PartnershipsIcon() {
  return (
    <IconFrame>
      <circle cx="20.4" cy="25.4" r="7.2" className={styles.iconTick} />
      <circle cx="27.6" cy="23.4" r="7.2" className={styles.iconGlyph} />
      <path d="M18.2 30.4c1.9 2.4 5.6 3.3 8.8 2.2" className={styles.iconTick} />
      <path d="M24.2 20.4c1.9-2 5.2-2 7.1 0" className={styles.iconTick} strokeDasharray="1.4 3.1" />
      <circle cx="27.6" cy="23.4" r="1.9" className={styles.iconAccentDot} style={{ opacity: 0.5 }} />
    </IconFrame>
  );
}

function AssetsIcon() {
  return (
    <IconFrame>
      <rect x="16.2" y="16.4" width="17.4" height="14.4" rx="4" className={styles.iconTick} />
      <rect x="18.2" y="18.6" width="17.4" height="14.4" rx="4" className={styles.iconTick} style={{ opacity: 0.55 }} />
      <rect x="20.2" y="20.8" width="17.4" height="14.4" rx="4" className={styles.iconGlyph} />
      <path d="M23.4 26.6h10.8" className={styles.iconTick} />
      <path d="M23.4 30.4h8.6" className={styles.iconTick} strokeDasharray="2 4" />
    </IconFrame>
  );
}

function MarketsIcon() {
  return (
    <IconFrame>
      <circle cx="24" cy="24" r="11" className={styles.iconGlyph} />
      <path d="M13 24h22" className={styles.iconTick} />
      <path d="M24 13.2c4.8 5 4.8 15.6 0 21.6" className={styles.iconTick} />
      <path d="M24 13.2c-4.8 5-4.8 15.6 0 21.6" className={styles.iconTick} style={{ opacity: 0.6 }} />
      <path d="M16.2 17.7c3.3-2.8 12.3-2.8 15.6 0" className={styles.iconTick} strokeDasharray="1.4 3.2" />
      <path d="M16.2 30.3c3.3 2.8 12.3 2.8 15.6 0" className={styles.iconTick} strokeDasharray="1.4 3.2" />
      <circle cx="35" cy="24" r="1.7" className={styles.iconAccentDot} style={{ opacity: 0.55 }} />
    </IconFrame>
  );
}

const HIGHLIGHTS: readonly Highlight[] = [
  { key: "years", Icon: YearsIcon, value: "7+", label: "Years of Experience" },
  { key: "fortune", Icon: FortuneIcon, value: "3", label: "Fortune 500 Brands" },
  { key: "views", Icon: ViewsIcon, value: "15M+", label: "Views Generated" },
  { key: "partnerships", Icon: PartnershipsIcon, value: "50+", label: "Brand & Creator Partnerships" },
  { key: "assets", Icon: AssetsIcon, value: "1,000+", label: "Assets Produced Annually" },
  { key: "markets", Icon: MarketsIcon, value: "Global Markets", label: "U.S. & Canada" },
] as const;

export function BioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [counters, setCounters] = useState<Record<string, number>>({});
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
	                className="mt-9 mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-8 gap-y-10 sm:mt-10 sm:gap-x-12 sm:gap-y-12 md:grid-cols-3 md:gap-x-14"
	              >
                {HIGHLIGHTS.map(({ key, Icon, value, label }, index) => {
                  const counterConfig = counterConfigs[key];
                  const displayValue =
                    counterConfig && typeof counters[key] === "number"
                      ? formatCounterValue(counters[key], counterConfig)
                      : value;

                  return (
                  <li
                    key={key}
                    className={`w-full text-text-secondary ${styles.highlight}`}
                    style={{ ["--i" as string]: String(index) }}
                  >
                    <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                      <Icon />
                      <div className="min-w-0">
                      <div className="font-display text-2xl leading-none text-text-primary sm:text-3xl">
                        {displayValue}
                      </div>
                      <div className="mt-2 text-[10px] font-mono uppercase leading-snug tracking-[0.16em] text-text-secondary/70 sm:text-xs sm:tracking-widest">
                        {label}
                      </div>
                      </div>
                    </div>
	                  </li>
	                  );
	                })}
	              </ul>

	              <p className="mt-8 md:mt-12 text-xs md:text-base leading-relaxed text-text-secondary/60">
	                Metrics reflect cumulative impact across broadcast, digital, and editorial work.
	              </p>
	            </div>
	          </div>
	        </div>
      </div>
    </section>
  );
}
