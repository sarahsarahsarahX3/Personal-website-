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

export function BioSection() {
  const [headshotSrc, setHeadshotSrc] = useState("/images/IMG_8516_edited.jpg");

  return (
    <section aria-labelledby="home-bio-title" className="py-32 md:py-44 lg:py-48">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-y-10 md:gap-y-0 md:gap-x-10 items-start md:items-center">
          <figure className="col-span-12 sm:col-span-6 md:col-span-4 md:col-start-2 flex justify-center md:block">
            <div className="relative aspect-[4/5] w-full max-w-[320px] rounded-3xl ring-1 ring-inset ring-white/15 overflow-hidden">
              <Image
                src={headshotSrc}
                alt="Headshot of Sarah Dawson"
                fill
                sizes="(min-width: 768px) 320px, 70vw"
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
                Hello, my name is Sarah Dawson.
              </p>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-text-secondary">
                I specialize in creating marketing-led content that strengthens brand voice, grows audiences, and performs across channels.
              </p>

              <ul
                aria-label="Highlights"
                className="mt-12 grid grid-cols-2 gap-x-10 gap-y-12 justify-items-center md:justify-items-start"
              >
                <li className="flex flex-col items-center gap-3 text-center text-text-secondary md:flex-row md:items-start md:gap-4 md:text-left">
                  <YearsIcon />
                  <div className="min-w-0">
                    <div className="text-2xl md:text-3xl text-text-primary leading-none">7+</div>
                    <div className="mt-2 text-xs uppercase tracking-widest text-text-secondary/70">
                      Years Experience
                    </div>
                  </div>
                </li>

                <li className="flex flex-col items-center gap-3 text-center text-text-secondary md:flex-row md:items-start md:gap-4 md:text-left">
                  <BrandsIcon />
                  <div className="min-w-0">
                    <div className="text-2xl md:text-3xl text-text-primary leading-none">3</div>
                    <div className="mt-2 text-xs uppercase tracking-widest text-text-secondary/70">
                      Fortune 500 Companies
                    </div>
                  </div>
                </li>

                <li className="flex flex-col items-center gap-3 text-center text-text-secondary md:flex-row md:items-start md:gap-4 md:text-left">
                  <ViewsIcon />
                  <div className="min-w-0">
                    <div className="text-2xl md:text-3xl text-text-primary leading-none">15M+</div>
                    <div className="mt-2 text-xs uppercase tracking-widest text-text-secondary/70">Views</div>
                  </div>
                </li>

                <li className="flex flex-col items-center gap-3 text-center text-text-secondary md:flex-row md:items-start md:gap-4 md:text-left">
                  <CollaborationIcon />
                  <div className="min-w-0">
                    <div className="text-2xl md:text-3xl text-text-primary leading-none">50+</div>
                    <div className="mt-2 text-xs uppercase tracking-widest text-text-secondary/70">
                      Brand Collaborations
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
