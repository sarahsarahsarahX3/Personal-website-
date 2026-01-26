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

function useSvgId(prefix: string) {
  const raw = useId();
  return `${prefix}-${raw.replace(/[:]/g, "")}`;
}

function IconShell({
  uid,
  dur = "8s",
  delay = "0s",
  children,
}: {
  uid: string;
  dur?: string;
  delay?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={styles.icon}
      aria-hidden="true"
      style={{ ["--iconDur" as string]: dur, ["--iconDelay" as string]: delay }}
    >
      <defs>
        <radialGradient id={`${uid}-panel`} cx="32%" cy="28%" r="84%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        <linearGradient id={`${uid}-border`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="75%" stopColor="rgba(255,59,48,0.25)" />
          <stop offset="100%" stopColor="rgba(255,59,48,0.06)" />
        </linearGradient>

        <linearGradient id={`${uid}-ink`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.88)" />
          <stop offset="65%" stopColor="rgba(255,255,255,0.70)" />
          <stop offset="100%" stopColor="rgba(255,59,48,0.72)" />
        </linearGradient>

        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="rgba(0,0,0,0.55)" floodOpacity="1" />
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255,59,48,0.10)" floodOpacity="1" />
        </filter>

        <clipPath id={`${uid}-clip`}>
          <rect x="6" y="6" width="36" height="36" rx="12" />
        </clipPath>
      </defs>

      <g filter={`url(#${uid}-glow)`}>
        <rect x="6" y="6" width="36" height="36" rx="12" fill={`url(#${uid}-panel)`} className={styles.panelBase} />
        <rect
          x="6"
          y="6"
          width="36"
          height="36"
          rx="12"
          fill="none"
          stroke={`url(#${uid}-border)`}
          strokeWidth="1.2"
          className={styles.panelBorder}
        />

        <g clipPath={`url(#${uid}-clip)`}>
          <g className={styles.glyphWrap}>{children}</g>
          <path
            d="M-10 8 L20 -10 L60 30 L30 52 Z"
            className={styles.sheen}
            fill="rgba(255,255,255,0.08)"
          />
        </g>

        <circle cx="14" cy="14" r="1.6" className={styles.accentDot} />
      </g>
    </svg>
  );
}

function YearsIcon() {
  const uid = useSvgId("bio-years");
  return (
    <IconShell uid={uid} dur="9.5s" delay="-1.4s">
      <circle cx="24" cy="24" r="10" className={styles.strokeMuted} />
      <path d="M24 24V16.5" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} />
      <path d="M24 24L30 27" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} opacity="0.86" />
      <circle cx="24" cy="24" r="2.1" className={styles.coreDot} />
      <circle
        cx="24"
        cy="24"
        r="10"
        className={styles.traceRing}
        strokeLinecap="round"
        strokeDasharray="6 52"
      />
    </IconShell>
  );
}

function BrandsIcon() {
  const uid = useSvgId("bio-fortune");
  return (
    <IconShell uid={uid} dur="10.5s" delay="-2.1s">
      <path
        d="M24 14.5l9.2 5.3v9.1L24 33.4l-9.2-4.5v-9.1L24 14.5Z"
        className={styles.strokeMuted}
      />
      <path d="M20 25.2v6.6" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} />
      <path d="M24 22.2v9.6" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} opacity="0.95" />
      <path d="M28 23.8v8" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} opacity="0.8" />
      <path
        d="M24 14.5l9.2 5.3v9.1L24 33.4l-9.2-4.5v-9.1L24 14.5Z"
        className={styles.tracePath}
        strokeDasharray="3 11"
      />
    </IconShell>
  );
}

function ViewsIcon() {
  const uid = useSvgId("bio-views");
  return (
    <IconShell uid={uid} dur="8.6s" delay="-1.7s">
      <path d="M16 28c3.6-7 7 2.6 9.2-0.6 2.2-3.2 5.8-9.2 11.8-3.2" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} />
      <path d="M16 22h20" className={styles.strokeMuted} strokeDasharray="2 5" />
      <path
        d="M16 28c3.6-7 7 2.6 9.2-0.6 2.2-3.2 5.8-9.2 11.8-3.2"
        className={styles.tracePath}
        strokeDasharray="3 11"
      />
      <circle cx="16" cy="28" r="1.4" className={styles.coreDot} style={{ opacity: 0.55 }} />
      <circle cx="25.2" cy="27.4" r="1.4" className={styles.coreDot} style={{ opacity: 0.35 }} />
    </IconShell>
  );
}

function CollaborationIcon() {
  const uid = useSvgId("bio-collab");
  return (
    <IconShell uid={uid} dur="9.2s" delay="-2.4s">
      <circle cx="20.5" cy="25" r="7" className={styles.strokeMuted} />
      <circle cx="27.5" cy="23" r="7" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} opacity="0.92" />
      <path d="M23.8 20.2c2.2 0 4 1.8 4 4" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} opacity="0.7" />
      <circle cx="27.5" cy="23" r="7" className={styles.traceRing} strokeDasharray="7 60" strokeLinecap="round" />
    </IconShell>
  );
}

function AssetsIcon() {
  const uid = useSvgId("bio-assets");
  return (
    <IconShell uid={uid} dur="10.8s" delay="-1.1s">
      <rect x="15" y="16" width="18" height="15" rx="4" className={styles.strokeMuted} />
      <rect x="17.5" y="18.5" width="18" height="15" rx="4" className={styles.strokeMuted} opacity="0.55" />
      <rect x="20" y="21" width="18" height="15" rx="4" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} />
      <path d="M23.5 27h10" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} opacity="0.72" />
      <rect x="20" y="21" width="18" height="15" rx="4" className={styles.tracePath} strokeDasharray="3 11" />
    </IconShell>
  );
}

function MarketsIcon() {
  const uid = useSvgId("bio-markets");
  return (
    <IconShell uid={uid} dur="11.6s" delay="-2.8s">
      <circle cx="24" cy="24" r="10" className={styles.strokeMain} stroke={`url(#${uid}-ink)`} />
      <path d="M14 24h20" className={styles.strokeMuted} />
      <path d="M24 14c4.4 4.7 4.4 14.3 0 20" className={styles.strokeMuted} />
      <path d="M24 14c-4.4 4.7-4.4 14.3 0 20" className={styles.strokeMuted} opacity="0.65" />
      <path d="M16.5 18.3c3.2-2.7 12.8-2.7 15 0" className={styles.strokeMuted} strokeDasharray="1.5 3.6" />
      <circle cx="24" cy="24" r="10" className={styles.traceRing} strokeDasharray="5 54" strokeLinecap="round" />
    </IconShell>
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
