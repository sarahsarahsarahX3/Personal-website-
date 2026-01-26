"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
    const prefersReducedMotion = useReducedMotion();
    const containerRef = useRef<HTMLElement | null>(null);
    const headshotRef = useRef<HTMLDivElement | null>(null);
    const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const node = headshotRef.current;
        if (!container || !node) return;

        const update = () => {
            const containerRect = container.getBoundingClientRect();
            const rect = node.getBoundingClientRect();
            if (!rect.width || !rect.height) return;

            const next = {
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top + rect.height / 2,
            };

            setAnchor((prev) => {
                if (!prev) return next;
                if (Math.abs(prev.x - next.x) > 0.5 || Math.abs(prev.y - next.y) > 0.5) return next;
                return prev;
            });
        };

        update();

        let raf = 0;
        const schedule = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };

        const resizeObserver = new ResizeObserver(() => schedule());
        resizeObserver.observe(node);
        resizeObserver.observe(container);
        window.addEventListener("resize", schedule);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", schedule);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <main ref={containerRef} className="relative min-h-screen bg-surface overflow-hidden">
            {/* Full-bleed background (across both columns) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-black/80" />
                <svg
                    aria-hidden="true"
                    viewBox="0 0 1200 800"
                    preserveAspectRatio="xMidYMid slice"
                    className={`absolute inset-0 h-full w-full opacity-[0.55] mix-blend-screen ${prefersReducedMotion ? "" : "wireDrift"}`}
                >
                    <defs>
                        <pattern id="wireGrid" width="72" height="72" patternUnits="userSpaceOnUse">
                            <path
                                d="M 72 0 H 0 V 72"
                                fill="none"
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="1"
                            />
                        </pattern>
                        <pattern id="wireDiag" width="72" height="72" patternUnits="userSpaceOnUse">
                            <path
                                d="M 0 72 L 72 0"
                                fill="none"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>

                    <rect width="1200" height="800" fill="url(#wireGrid)" opacity="0.6" />
                    <rect width="1200" height="800" fill="url(#wireDiag)" opacity="0.55" />

                    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <g stroke="rgba(255,255,255,0.14)" strokeWidth="1.2">
                            <path d="M 110 190 L 380 110 L 620 180 L 900 120 L 1120 210" />
                            <path d="M 80 520 L 330 420 L 600 510 L 860 440 L 1140 540" />
                            <path d="M 210 740 L 420 610 L 710 720 L 980 640" />

                            <path d="M 110 190 L 330 420 L 80 520 L 110 190" />
                            <path d="M 380 110 L 600 510 L 330 420 L 380 110" />
                            <path d="M 620 180 L 860 440 L 600 510 L 620 180" />
                            <path d="M 900 120 L 1140 540 L 860 440 L 900 120" />
                        </g>

                        <g
                            className={prefersReducedMotion ? undefined : "wireDash"}
                            stroke="rgba(255,59,48,0.42)"
                            strokeWidth="1.6"
                            strokeDasharray="6 14"
                        >
                            <path d="M 110 190 L 620 180 L 1120 210" />
                            <path d="M 80 520 L 600 510 L 1140 540" />
                            <path d="M 210 740 L 710 720 L 980 640" />
                        </g>
                    </g>
                </svg>

                {/* Subtle focus halo anchored to headshot */}
                <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 opacity-[0.55]"
                    style={{
                        left: anchor ? `${anchor.x}px` : "50%",
                        top: anchor ? `${anchor.y}px` : "50%",
                        width: "720px",
                        height: "720px",
                        background:
                            "radial-gradient(circle at center, rgba(255,59,48,0.16), rgba(255,255,255,0.08), rgba(0,0,0,0) 62%)",
                        filter: "blur(1px)",
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/55" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_65%_at_30%_35%,rgba(255,255,255,0.10),rgba(0,0,0,0))]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-20 pb-24 md:pt-22 md:pb-28 lg:pt-24 lg:pb-32">
                <header className="max-w-2xl">
                    <p className="text-xs font-mono uppercase tracking-widest text-accent">Sarah Dawson</p>
                    <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight leading-[1.03]">About</h1>
                </header>

                <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16 items-start">
                    <section aria-label="Portrait" className="relative">
                        <figure className="relative">
                            <div className="lg:-ml-4 xl:-ml-8">
                                <div className="mx-auto w-full max-w-[292px] sm:max-w-[320px] md:max-w-[360px] lg:mx-0">
                                    <div
                                        ref={headshotRef}
                                        className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-inset ring-white/15 bg-black/20"
                                    >
                                        <Image
                                            src="/images/IMG_8516_edited.jpg"
                                            alt="Headshot of Sarah Dawson"
                                            fill
                                            sizes="(min-width: 1024px) 360px, 70vw"
                                            className="object-cover saturate-[0.98] contrast-[1.02]"
                                            priority
                                        />
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_35%,rgba(255,255,255,0.12),rgba(0,0,0,0))]"
                                        />
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/[0.06] to-black/[0.22]"
                                        />
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                                        />
                                    </div>
                                </div>
                            </div>
                            <figcaption className="sr-only">Portrait</figcaption>
                        </figure>
                    </section>

                    <section
                        aria-label="Bio"
                        className="lg:pt-6 lg:border-l lg:border-white/10 lg:pl-10"
                    >
                        <div className="max-w-xl">
                            <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
                                <p>
                                    I am a marketing professional who spearheads content, campaign, and editorial initiatives for top global brands across integrated channels. My work focuses on building clear, consistent messaging and executing at scale across content systems, campaigns, and brand communications.
                                </p>
                                <p>
                                    Over the past seven years, I’ve worked with Fortune 100 companies and established brands in beauty, retail, media, and science. I’ve delivered high-impact work across digital, social, editorial, broadcast, and experiential platforms. My background spans growth marketing, editorial operations, and integrated campaigns, which allows me to move between strategy and execution while staying focused on outcomes.
                                </p>
                                <p>If you’re interested in working together, you can reach me through the contact page via email or LinkedIn.</p>
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-3">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-mono uppercase tracking-widest bg-text-primary text-surface hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                                >
                                    Contact
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <style jsx>{`
                @keyframes wireDash {
                    to {
                        stroke-dashoffset: -1200;
                    }
                }
                @keyframes wireDrift {
                    0%,
                    100% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    50% {
                        transform: translate3d(10px, -8px, 0) scale(1.01);
                    }
                }
                .wireDash {
                    animation: wireDash 110s linear infinite;
                }
                .wireDrift {
                    animation: wireDrift 28s ease-in-out infinite;
                    will-change: transform;
                }
                @media (prefers-reduced-motion: reduce) {
                    .wireDash,
                    .wireDrift {
                        animation: none !important;
                    }
                }
            `}</style>
        </main>
    );
}
