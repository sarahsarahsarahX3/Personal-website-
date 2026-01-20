"use client";

import { useState } from "react";
import Image from "next/image";
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
  const [headshotSrc, setHeadshotSrc] = useState("/images/IMG_8516_edited.jpg");
  const highlights = [
    { key: "years", Icon: YearsIcon, value: "7+", label: "Years of Experience" },
    { key: "fortune", Icon: BrandsIcon, value: "3", label: "Fortune 100 Companies" },
    { key: "assets", Icon: AssetsIcon, value: "1,000+", label: "Assets / Year" },
    { key: "views", Icon: ViewsIcon, value: "15M+", label: "Views" },
    { key: "partnerships", Icon: CollaborationIcon, value: "50+", label: "Brand Partnerships" },
    { key: "markets", Icon: MarketsIcon, value: "Global Markets", label: "U.S. & CANADA" },
  ] as const;

  return (
    <section aria-labelledby="home-bio-title" className="pt-32 pb-16 md:pt-44 md:pb-20 lg:pt-48 lg:pb-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-y-10 md:gap-y-0 md:gap-x-10 items-start md:items-center">
          <figure className="col-span-12 sm:col-span-6 md:col-span-4 md:col-start-2 flex justify-center md:block">
            <div className="relative aspect-[4/5] w-full max-w-[260px] sm:max-w-[320px] rounded-3xl ring-1 ring-inset ring-white/15 overflow-hidden">
              <Image
                src={headshotSrc}
                alt="Headshot of Sarah Dawson"
                fill
                sizes="(min-width: 768px) 320px, 60vw"
                className="object-cover"
                priority
                onError={() => setHeadshotSrc("/images/IMG_5668_edited.jpg")}
              />
            </div>
          </figure>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
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
              <p className="mt-10 text-xs font-mono uppercase tracking-widest text-text-secondary/70">
                My career highlights include:
              </p>

              <ul
                aria-label="Highlights"
                className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:gap-6"
              >
                {highlights.map(({ key, Icon, value, label }) => (
                  <li
                    key={key}
                    className="w-full px-1 py-2 text-text-secondary md:px-0 md:py-3"
                  >
                    <div className="grid grid-cols-[48px_1fr] items-center gap-4">
                      <Icon />
                      <div className="min-w-0">
                        <div className="min-h-[2.2rem] text-2xl md:text-3xl leading-tight text-text-primary whitespace-nowrap">
                          {value}
                        </div>
                        <div className="mt-2 min-h-[2.2rem] text-xs uppercase leading-snug tracking-widest text-text-secondary/70 whitespace-nowrap">
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
