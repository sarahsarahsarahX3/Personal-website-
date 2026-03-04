"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function AboutPage() {
    const containerRef = useRef<HTMLElement | null>(null);
    const headshotRef = useRef<HTMLDivElement | null>(null);
    const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const portraitY = useTransform(scrollYProgress, [0, 0.5, 1], [28, 0, -22]);
    const portraitRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-1.5, 0, 1.2]);
    const portraitScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 1.018]);

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
        window.addEventListener("scroll", schedule, { passive: true });

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", schedule);
            window.removeEventListener("scroll", schedule);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <main ref={containerRef} className="relative min-h-screen bg-surface overflow-hidden">
            {/* Full-bleed background (across both columns) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-black/85" />
                <div
                    className="absolute inset-0 opacity-[0.28] [mask-image:radial-gradient(60%_65%_at_50%_35%,#000,transparent)]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_28%_30%,rgba(255,255,255,0.08),rgba(0,0,0,0))]" />

                {/* Subtle focus halo anchored to headshot */}
                <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 opacity-[0.55]"
                    style={{
                        left: anchor ? `${anchor.x}px` : "50%",
                        top: anchor ? `${anchor.y}px` : "50%",
                        width: "720px",
                        height: "720px",
                        background:
                            "radial-gradient(circle at center, rgba(255,255,255,0.10), rgba(255,59,48,0.08), rgba(0,0,0,0) 62%)",
                        filter: "blur(1px)",
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/55" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_65%_at_30%_35%,rgba(255,255,255,0.10),rgba(0,0,0,0))]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-[4.5rem] pb-[5.5rem] md:pt-20 md:pb-24 lg:pt-[5.5rem] lg:pb-28">
                <header className="max-w-2xl">
                    <p className="text-xs font-mono uppercase tracking-widest text-accent">Sarah Dawson</p>
                    <h1 className="mt-3 font-display text-4xl md:text-5xl tracking-tight leading-[1.03]">About</h1>
                </header>

                <div className="mt-8 grid gap-9 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12 items-start">
                    <section aria-label="Portrait" className="relative lg:pt-1">
                        <figure className="relative">
                            <motion.div
                                className="lg:-ml-2 xl:-ml-4"
                                style={
                                    reduceMotion
                                        ? undefined
                                        : {
                                              y: portraitY,
                                              rotate: portraitRotate,
                                              scale: portraitScale,
                                          }
                                }
                            >
                                <div className="mx-auto w-full max-w-[276px] sm:max-w-[304px] md:max-w-[336px] lg:max-w-[352px] lg:mx-0">
                                    <div
                                        ref={headshotRef}
                                        className="about-headshot relative aspect-[2/3] overflow-hidden rounded-[28px] ring-1 ring-inset ring-white/15 bg-black/20"
                                        onContextMenu={(event) => event.preventDefault()}
                                        onDragStart={(event) => event.preventDefault()}
                                    >
                                        <Image
                                            src="/Sarah_Headshot.jpeg"
                                            alt="Headshot of Sarah Dawson"
                                            fill
                                            sizes="(min-width: 1024px) 560px, (min-width: 640px) 420px, 92vw"
                                            unoptimized
                                            className="object-cover saturate-[1.08] contrast-[1.14] brightness-[1.03]"
                                            draggable={false}
                                            priority
                                        />
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_35%,rgba(255,255,255,0.08),rgba(0,0,0,0))]"
                                        />
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/[0.03] to-black/[0.12]"
                                        />
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                            <figcaption className="sr-only">Portrait</figcaption>
                        </figure>
                    </section>

                    <section
                        aria-label="Bio"
                        className="lg:pt-1 lg:border-l lg:border-white/10 lg:pl-10"
                    >
                        <div className="max-w-[60ch]">
                            <div className="space-y-6 md:space-y-7 text-[0.94rem] sm:text-[0.97rem] lg:text-[1rem] leading-[1.74] text-text-secondary/95">
                                <p>
                                    Hello! I’m a Senior Copywriter and Content Strategist with more than seven years of experience working with Fortune 500 beauty, fashion, and lifestyle brands to build captivating content and grow organic audiences.
                                </p>
                                <p>
                                    My experience is rooted in the beauty and fashion industry, one of the most competitive and content-saturated fields in digital media. Earning and sustaining organic visibility in this space requires strategic precision and a deep understanding of consumer needs. For example, at P&G Beauty, I led content for HairCode.com, creating articles and guides that helped readers understand hair care while improving search visibility and engagement. At SalonCentric, I managed the Pro Beauty Central editorial platform and oversaw content across major beauty categories for more than 80 brand partners. My work has appeared across websites, social media, email campaigns, retail materials, and live events, including directing L’Oréal USA’s editorial coverage at New York Fashion Week.
                                </p>
                                <p>
                                    My career has taken me from filming a Discovery Channel documentary in Antarctica to directing editorial coverage at New York Fashion Week for L’Oréal USA. Some might call it an unconventional path. I see it as a broad creative background that shapes how I approach storytelling today. The common thread throughout my work is genuine curiosity and a drive to find the story worth telling in any environment, for any audience.
                                </p>
                                <p>If you’re looking for someone who brings thoughtful storytelling and data-driven strategy to branded content, let’s connect.</p>
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
                .about-headshot {
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    user-select: none;
                }
            `}</style>
        </main>
    );
}
