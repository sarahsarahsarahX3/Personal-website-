"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
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

type LiquidVariant = "years" | "fortune" | "views" | "partnerships" | "assets" | "markets";

const LIQUID_SHAPES: Record<LiquidVariant, string> = {
  years: "M24 7.2c7 0 13.8 3.2 15.9 9.1 2.1 5.9-0.5 14.2-5.8 18.3-5.3 4.1-14.2 5.4-20.4 2.4-6.2-3-10.1-10.6-8.9-17.2C5.9 13.6 11.8 7.2 24 7.2z",
  fortune: "M24 8c6.3 0 12.5 2.2 15.3 6.9 2.8 4.7 2 11.6-0.9 17-2.9 5.4-7.9 8.9-14.4 8.9-6.5 0-12.6-3.5-15.6-9-3-5.5-3.7-12.5-0.8-17.1C10.5 10.1 17.7 8 24 8z",
  views: "M24 9c8 0 16.2 2.8 18.2 8.8 2 6-1.7 14.5-7.8 18.2-6.1 3.7-15.6 3-22.1-0.8-6.5-3.8-10-10.8-8.2-16.8C6.1 12.4 16 9 24 9z",
  partnerships:
    "M24 7.8c7.4 0 12.4 3.6 15.2 8.4 2.8 4.8 3.2 11.1 0.5 16-2.7 4.9-8.7 8.6-15.7 8.6-7 0-13.4-3.8-16.2-8.8-2.8-5-1.6-11.3 1.2-16.1C12 11.1 16.7 7.8 24 7.8z",
  assets:
    "M24 7.5c6.4 0 11.1 2.7 13.9 7.1 2.8 4.4 3.7 10.6 1.5 16.1-2.2 5.5-7.6 9.8-15.4 9.8-7.8 0-13.6-4.3-15.8-9.9-2.2-5.6-0.6-12 2.1-16.3C13 10 17.6 7.5 24 7.5z",
  markets:
    "M24 7.6c7.5 0 14.8 4 16 11.2 1.2 7.2-3.7 15.7-10.9 19.2-7.2 3.5-16.6 1.9-22.1-3.4-5.5-5.3-6.9-14.4-2.9-20.6C8.1 7.8 16.5 7.6 24 7.6z",
};

function LiquidDetails({ variant, wireId }: { variant: LiquidVariant; wireId: string }) {
  const wire = `url(#${wireId})`;

  switch (variant) {
    case "years":
      return (
        <>
          <path d="M14 24a10 10 0 0 1 20 0" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.1" />
          <path d="M24 16.5v9.2l6.2 3.6" fill="none" stroke={wire} strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="24" cy="16.5" r="1.15" fill="rgba(255,255,255,0.24)" />
          <circle cx="30.2" cy="29.3" r="1.2" fill="rgba(255,59,48,0.65)" />
        </>
      );
    case "fortune":
      return (
        <>
          <path d="M16 31h16" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.1" />
          <path d="M18 31V19" fill="none" stroke={wire} strokeWidth="1.25" strokeLinecap="round" />
          <path d="M24 31V16.5" fill="none" stroke={wire} strokeWidth="1.25" strokeLinecap="round" opacity="0.9" />
          <path d="M30 31V22" fill="none" stroke={wire} strokeWidth="1.25" strokeLinecap="round" opacity="0.75" />
          <circle cx="24" cy="16.5" r="1.2" fill="rgba(255,59,48,0.65)" />
        </>
      );
    case "views":
      return (
        <>
          <path
            d="M14 28c3.2-6.6 6.4 2.6 8.6-0.6 2.2-3.2 5.8-9.4 11.4-3.2"
            fill="none"
            stroke={wire}
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path d="M14 22h20" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.05" strokeDasharray="2 4" />
          <circle cx="14" cy="28" r="1.15" fill="rgba(255,255,255,0.22)" />
          <circle cx="22.6" cy="27.4" r="1.15" fill="rgba(255,59,48,0.6)" />
          <circle cx="34" cy="24.2" r="1.15" fill="rgba(255,59,48,0.6)" />
        </>
      );
    case "partnerships":
      return (
        <>
          <path d="M16 30l8-10 8 10" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.1" />
          <path d="M16 30h16" fill="none" stroke={wire} strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          <circle cx="16" cy="30" r="1.35" fill="rgba(255,59,48,0.6)" />
          <circle cx="24" cy="20" r="1.35" fill="rgba(255,255,255,0.22)" />
          <circle cx="32" cy="30" r="1.35" fill="rgba(255,59,48,0.6)" />
        </>
      );
    case "assets":
      return (
        <>
          <path d="M17 20.5h14" fill="none" stroke={wire} strokeWidth="1.15" strokeLinecap="round" />
          <path d="M17 24.6h12.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.05" strokeLinecap="round" />
          <path d="M17 28.7h13.2" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.05" strokeLinecap="round" />
          <path d="M17 32.8h10.6" fill="none" stroke={wire} strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
          <circle cx="31" cy="20.5" r="1.1" fill="rgba(255,59,48,0.6)" />
        </>
      );
    case "markets":
      return (
        <>
          <path d="M14 24h20" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.1" />
          <path d="M24 14c5 5 5 15 0 20" fill="none" stroke={wire} strokeWidth="1.1" strokeLinecap="round" />
          <path d="M24 14c-5 5-5 15 0 20" fill="none" stroke={wire} strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
          <path d="M16 18c3.6-3.2 16.4-3.2 20 0" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.05" />
          <circle cx="34" cy="24" r="1.25" fill="rgba(255,59,48,0.6)" />
        </>
      );
    default:
      return null;
  }
}

function LiquidIcon({ variant }: { variant: LiquidVariant }) {
  const rawId = useId();
  const uid = `${variant}-${rawId.replace(/[:]/g, "")}`;

  const shape = LIQUID_SHAPES[variant];

  const dur =
    variant === "markets"
      ? "11s"
      : variant === "assets"
        ? "10.4s"
        : variant === "fortune"
          ? "10s"
          : variant === "views"
            ? "9s"
            : variant === "partnerships"
              ? "9.6s"
              : "9.4s";

  const phase =
    variant === "markets"
      ? "-2.1s"
      : variant === "assets"
        ? "-1.2s"
        : variant === "fortune"
          ? "-2.6s"
          : variant === "views"
            ? "-1.8s"
            : variant === "partnerships"
              ? "-2.2s"
              : "-1.5s";

  const wireId = `${uid}-wire`;

  return (
    <svg viewBox="0 0 48 48" className={styles.icon} aria-hidden="true" style={{ ["--dur" as string]: dur }}>
      <defs>
        <radialGradient id={`${uid}-fill`} cx="32%" cy="24%" r="78%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.36)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="58%" stopColor="rgba(255,59,48,0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
        </radialGradient>

        <radialGradient id={`${uid}-sheen`} cx="38%" cy="26%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.78)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        <linearGradient id={wireId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="42%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="70%" stopColor="rgba(255,59,48,0.55)" />
          <stop offset="100%" stopColor="rgba(255,59,48,0)" />
        </linearGradient>

        <pattern id={`${uid}-scan`} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 0H6" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <path d="M0 3H6" stroke="rgba(255,59,48,0.045)" strokeWidth="1" />
        </pattern>

        <filter id={`${uid}-soft`} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(0,0,0,0.55)" floodOpacity="1" />
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(255,59,48,0.12)" floodOpacity="1" />
        </filter>

        <filter id={`${uid}-blur`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.35" />
        </filter>

        <clipPath id={`${uid}-clip`}>
          <path d={shape} />
        </clipPath>
      </defs>

      <g className={styles.liquidFloat} style={{ animationDelay: phase }} filter={`url(#${uid}-soft)`}>
        <path d={shape} fill={`url(#${uid}-fill)`} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

        <g clipPath={`url(#${uid}-clip)`} opacity="0.98">
          <rect x="0" y="0" width="48" height="48" fill={`url(#${uid}-scan)`} opacity="0.22" />
          <LiquidDetails variant={variant} wireId={wireId} />
        </g>

        <ellipse
          cx="19"
          cy="15"
          rx="14"
          ry="10"
          fill={`url(#${uid}-sheen)`}
          filter={`url(#${uid}-blur)`}
          className={styles.liquidSheen}
        />

        <path
          d="M14 34c5 5 15 5 20 0"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1.1"
          opacity="0.45"
          strokeLinecap="round"
        />

        <circle cx="35.2" cy="34.2" r="2.05" fill="rgba(255,59,48,0.55)" className={styles.liquidPulse} />
        <circle cx="35.2" cy="34.2" r="4.7" fill="rgba(255,59,48,0.10)" className={styles.liquidPulse} />
      </g>
    </svg>
  );
}

function YearsIcon() {
  return (
    <LiquidIcon variant="years" />
  );
}

function BrandsIcon() {
  return (
    <LiquidIcon variant="fortune" />
  );
}

function ViewsIcon() {
  return (
    <LiquidIcon variant="views" />
  );
}

function CollaborationIcon() {
  return (
    <LiquidIcon variant="partnerships" />
  );
}

function AssetsIcon() {
  return (
    <LiquidIcon variant="assets" />
  );
}

function MarketsIcon() {
  return (
    <LiquidIcon variant="markets" />
  );
}

const HIGHLIGHTS: readonly Highlight[] = [
  { key: "years", Icon: YearsIcon, value: "7+", label: "Years of Experience" },
  { key: "fortune", Icon: BrandsIcon, value: "3", label: "Fortune 500 Brands" },
  { key: "views", Icon: ViewsIcon, value: "15M+", label: "Views Generated" },
  { key: "partnerships", Icon: CollaborationIcon, value: "50+", label: "Brand & Creator Partnerships" },
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
