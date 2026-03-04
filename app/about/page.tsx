"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
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
                            </div>
                            <figcaption className="sr-only">Portrait</figcaption>
                        </figure>
                    </section>

                    <section
                        aria-label="Bio"
                        className="lg:pt-4 lg:border-l lg:border-white/10 lg:pl-12"
                    >
                        <div className="max-w-[68ch]">
                            <div className="space-y-7 md:space-y-8 text-[1rem] sm:text-[1.03rem] lg:text-[1.06rem] leading-[1.82] text-text-secondary/95">
                                <p>
                                    I am a Senior Copywriter and Content Strategist with more than seven years of experience partnering with Fortune 500 brands across beauty, fashion, and lifestyle categories to build authority, grow organic audiences, and produce content that performs at every stage of the funnel. I work at the intersection of editorial strategy, SEO, and brand storytelling, collaborating with marketing teams and brand leaders who need a senior creative who can think strategically and execute to a high standard without missing a beat.
                                </p>
                                <p>
                                    My experience is rooted in the beauty industry, one of the most competitive and content-saturated verticals in digital media, where earning and sustaining organic visibility requires both strategic precision and a genuine understanding of what consumers are looking for. At P&G Beauty, I led content strategy for HairCode.com, developing authoritative, consumer-first content that aligned search intent with brand expertise. At SalonCentric, I owned the Pro Beauty Central editorial platform, leading content strategy, franchise development, and full production lifecycles across Haircare, Color, Cutting, Styling, Nails, Beauty, Business, and Community categories for 80+ brand partners. My work spanned web, social, email, retail, and experiential channels, including directing editorial coverage at New York Fashion Week.
                                </p>
                                <p>
                                    My career has taken me from the frozen landscapes of Antarctica, where I filmed a documentary series for Discovery Channel, to the front rows of New York Fashion Week, where I directed editorial coverage for L'Oréal USA. Some might call it an unconventional career path. I call it an unusually broad creative skillset that positively informs everything I bring to branded content today. Most notably, the common thread throughout all of my work is my genuine curiosity about the world and my ability to find the story worth telling in any environment, for any audience.
                                </p>
                                <p>If you are looking for someone who brings both creative rigor and strategic depth to branded content, I would love to connect.</p>
                            </div>

                            <div className="mt-12 flex flex-wrap items-center gap-3">
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
