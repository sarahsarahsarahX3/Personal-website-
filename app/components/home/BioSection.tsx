"use client";

import { useEffect, useRef } from "react";
import styles from "./BioSection.module.css";

function YearsIcon() {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon} aria-hidden="true">
      <circle cx="24" cy="24" r="16" className={styles.strokeSoft} />
      <path d="M24 14v10l7 4" className={styles.stroke} />
      <g className={styles.orbit}>
        <circle cx="24" cy="8" r="2.2" className={styles.accentFill} />
      </g>
    </svg>
  );
}

function BrandsIcon() {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon} aria-hidden="true">
      <rect x="12" y="12" width="24" height="24" rx="8" className={styles.strokeSoft} />
      <rect
        x="16"
        y="20"
        width="4"
        height="14"
        rx="2"
        className={styles.drift}
        style={{ ["--delay" as string]: "0s" }}
        fill="currentColor"
        opacity="0.55"
      />
      <rect
        x="22"
        y="16"
        width="4"
        height="18"
        rx="2"
        className={styles.drift}
        style={{ ["--delay" as string]: "-0.6s" }}
        fill="currentColor"
        opacity="0.55"
      />
      <rect
        x="28"
        y="22"
        width="4"
        height="12"
        rx="2"
        className={styles.drift}
        style={{ ["--delay" as string]: "-1.2s" }}
        fill="currentColor"
        opacity="0.55"
      />
      <path d="M18 36h12" className={styles.accentStroke} />
    </svg>
  );
}

function ViewsIcon() {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon} aria-hidden="true">
      <rect x="10" y="14" width="28" height="20" rx="6" className={styles.strokeSoft} />
      <path d="M16 20h16" className={styles.stroke} />
      <path d="M16 24h12" className={styles.strokeSoft} />
      <path d="M16 28h14" className={styles.strokeSoft} />
      <g className={styles.scan}>
        <path d="M14 19h20" className={styles.accentStroke} />
      </g>
    </svg>
  );
}

function CollaborationIcon() {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon} aria-hidden="true">
      <path d="M16 28l8-10 8 10" className={styles.strokeSoft} />
      <path d="M16 28h16" className={styles.strokeSoft} />
      <circle
        cx="16"
        cy="28"
        r="2.6"
        className={styles.pulse}
        style={{ ["--delay" as string]: "0s" }}
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="24"
        cy="18"
        r="2.6"
        className={styles.pulse}
        style={{ ["--delay" as string]: "-1.2s" }}
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="32"
        cy="28"
        r="2.6"
        className={styles.pulse}
        style={{ ["--delay" as string]: "-2.4s" }}
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="24" cy="33" r="2.2" className={styles.accentFill} />
    </svg>
  );
}

function AssetsIcon() {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon} aria-hidden="true">
      <rect x="14" y="12" width="20" height="24" rx="6" className={styles.strokeSoft} />
      <path d="M18 18h12" className={styles.stroke} />
      <path d="M18 22h9" className={styles.strokeSoft} />
      <path d="M18 26h12" className={styles.strokeSoft} />
      <path d="M18 30h10" className={styles.strokeSoft} />
      <g className={styles.scan}>
        <path d="M16 16h16" className={styles.accentStroke} />
      </g>
    </svg>
  );
}

function MarketsIcon() {
  return (
    <svg viewBox="0 0 48 48" className={styles.icon} aria-hidden="true">
      <circle cx="24" cy="24" r="16" className={styles.strokeSoft} />
      <path d="M8 24h32" className={styles.strokeSoft} />
      <path d="M24 8c6 6 6 26 0 32" className={styles.strokeSoft} />
      <path d="M24 8c-6 6-6 26 0 32" className={styles.strokeSoft} />
      <g className={styles.orbit}>
        <circle cx="24" cy="8" r="2.1" className={styles.accentFill} />
      </g>
      <path d="M16 31c2.2 2.2 5 3.4 8 3.4 3 0 5.8-1.2 8-3.4" className={styles.accentStroke} />
    </svg>
  );
}

export function BioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

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

  const highlights = [
    { key: "years", Icon: YearsIcon, value: "7+", label: "Years of Experience" },
    { key: "fortune", Icon: BrandsIcon, value: "3", label: "Fortune 100 Companies" },
    { key: "assets", Icon: AssetsIcon, value: "1,000+", label: "Assets / Year" },
    { key: "views", Icon: ViewsIcon, value: "15M+", label: "Views" },
    { key: "partnerships", Icon: CollaborationIcon, value: "50+", label: "Brand Partnerships" },
    { key: "markets", Icon: MarketsIcon, value: "Global Markets", label: "U.S. & CANADA" },
  ] as const;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-bio-title"
      className={`pt-32 pb-16 md:pt-44 md:pb-20 lg:pt-48 lg:pb-24 ${styles.section}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-y-10 md:gap-y-0 md:gap-x-10 items-start md:items-center">
          <div className={`col-span-12 md:col-span-10 md:col-start-2 ${styles.body}`}>
            <div className="relative max-w-[60ch] mx-auto text-center md:mx-0 md:text-left">
              <h2 id="home-bio-title" className="sr-only">
                About
              </h2>
              <p className="text-xl md:text-2xl leading-snug tracking-tight text-text-primary">
                Hi, I’m Sarah Dawson.
              </p>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-text-secondary">
                I lead content, campaign, and editorial initiatives for brands across integrated channels.
              </p>
              <ul
                aria-label="Highlights"
                className="mt-6 grid grid-cols-2 gap-5 sm:gap-x-10 sm:gap-y-10"
              >
                {highlights.map(({ key, Icon, value, label }, index) => (
                  <li
                    key={key}
                    className={`w-full text-text-secondary ${styles.highlight}`}
                    style={{ ["--i" as string]: String(index) }}
                  >
                    <div className="grid grid-cols-[40px_1fr] items-start gap-3 sm:grid-cols-[44px_1fr] sm:gap-4">
                      <Icon />
                      <div className="min-w-0">
                        <div className="text-lg leading-tight text-text-primary sm:text-2xl md:text-3xl">
                          {value}
                        </div>
                        <div className="mt-2 text-[10px] uppercase leading-snug tracking-[0.16em] text-text-secondary/70 sm:text-xs sm:tracking-widest">
                          {label}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
