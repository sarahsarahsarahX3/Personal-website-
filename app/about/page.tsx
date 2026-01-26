"use client";

import { motion, useReducedMotion } from "framer-motion";
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
            {/* Full-bleed background (footer-inspired) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(255,255,255,0.08),rgba(0,0,0,0))]" />
                <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px]" />
                <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/60" />
                {/* Rotating bar visual anchored to headshot center */}
                <motion.svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    className="absolute h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.36] mix-blend-screen transform-gpu"
                    animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                    transition={prefersReducedMotion ? undefined : { duration: 42, repeat: Infinity, ease: "linear" }}
                    style={{
                        left: anchor ? `${anchor.x}px` : "50%",
                        top: anchor ? `${anchor.y}px` : "50%",
                        willChange: "transform",
                    }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="none"
                        stroke="rgba(255,255,255,0.20)"
                        strokeWidth="0.22"
                        strokeDasharray="0.6 1.6"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="none"
                        stroke="rgba(255,59,48,0.70)"
                        strokeWidth="0.34"
                        strokeDasharray="8 28"
                        strokeLinecap="round"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="22"
                        fill="none"
                        stroke="rgba(255,255,255,0.14)"
                        strokeWidth="0.22"
                        strokeDasharray="0.6 2.2"
                    />
                    <circle cx="50" cy="50" r="1.25" fill="rgba(255,255,255,0.16)" />
                </motion.svg>
                <motion.svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    className="absolute h-[170vmax] w-[170vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.22] mix-blend-screen transform-gpu"
                    animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                    transition={prefersReducedMotion ? undefined : { duration: 64, repeat: Infinity, ease: "linear" }}
                    style={{
                        left: anchor ? `${anchor.x}px` : "50%",
                        top: anchor ? `${anchor.y}px` : "50%",
                        willChange: "transform",
                    }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="rgba(255,255,255,0.10)"
                        strokeWidth="0.20"
                        strokeDasharray="0.6 2.6"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="0.22"
                        strokeDasharray="2 16"
                        strokeLinecap="round"
                    />
                </motion.svg>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-20 pb-24 md:pt-22 md:pb-28 lg:pt-24 lg:pb-32">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    <div className="min-w-0">
                        <header className="max-w-2xl">
                            <p className="text-xs font-mono uppercase tracking-widest text-accent">Sarah Dawson</p>
                            <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight leading-[1.03]">About</h1>
                        </header>

                        <section aria-label="Portrait" className="relative mt-10">
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
                    </div>

                    <section aria-label="Bio" className="rounded-3xl border border-white/10 bg-surface-alt/10 p-6 md:p-7 lg:mt-11">
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
        </main>
    );
}
