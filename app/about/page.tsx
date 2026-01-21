"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <main className="relative min-h-screen bg-surface flex flex-col md:flex-row overflow-hidden">
            {/* Full-bleed background (across both columns) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-black/80" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/55" />
                <div className="absolute inset-y-0 left-0 w-[70%] bg-[radial-gradient(60%_65%_at_30%_35%,rgba(255,255,255,0.12),rgba(0,0,0,0))]" />
            </div>

            {/* Visual Side (Left on Desktop) */}
            <section className="relative z-10 w-full md:w-1/2 h-[52vh] md:h-auto flex items-center justify-center px-8 md:px-14">
                {/* Rotating bars anchored to headshot center */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                    <motion.div
                        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                        transition={prefersReducedMotion ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
                        className="absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-35 blur-2xl transform-gpu"
                        style={{
                            background:
                                "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg 320deg, rgba(255,255,255,0.55) 360deg)",
                            WebkitMaskImage:
                                "radial-gradient(circle, transparent 0 52%, rgba(0,0,0,1) 56% 66%, transparent 70%)",
                            maskImage:
                                "radial-gradient(circle, transparent 0 52%, rgba(0,0,0,1) 56% 66%, transparent 70%)",
                            willChange: "transform",
                        }}
                    />
                    <motion.div
                        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                        transition={prefersReducedMotion ? undefined : { duration: 34, repeat: Infinity, ease: "linear" }}
                        className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-2xl transform-gpu"
                        style={{
                            background:
                                "conic-gradient(from 180deg, rgba(255,59,48,0) 0deg 330deg, rgba(255,59,48,0.55) 360deg)",
                            WebkitMaskImage:
                                "radial-gradient(circle, transparent 0 50%, rgba(0,0,0,1) 54% 62%, transparent 66%)",
                            maskImage:
                                "radial-gradient(circle, transparent 0 50%, rgba(0,0,0,1) 54% 62%, transparent 66%)",
                            willChange: "transform",
                        }}
                    />
                </div>

                <figure className="w-full">
                    <div className="mx-auto w-full max-w-[300px] md:max-w-[360px]">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-inset ring-white/15 bg-black/20">
                            <Image
                                src="/images/IMG_8516_edited.jpg"
                                alt="Headshot of Sarah Dawson"
                                fill
                                sizes="(min-width: 768px) 360px, 70vw"
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
                </figure>
            </section>

            {/* Content Side (Right on Desktop) */}
            <section className="relative z-10 w-full md:w-1/2 min-h-screen flex items-center p-8 md:p-20 pt-20 pb-32 md:pb-32 lg:pb-40 bg-surface/85 backdrop-blur-md md:bg-transparent md:backdrop-blur-0">
                <div className="max-w-xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display mb-8 leading-tight"
                    >
                        About
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 text-lg text-text-secondary leading-relaxed"
                    >
                        <p>
                            I’m Sarah Dawson, a marketing professional who leads content, campaign, and editorial initiatives for brands across integrated channels. My work focuses on building clear, consistent messaging and executing at scale across content systems, campaigns, and brand communications.
                        </p>
                        <p>
                            Over the past seven years, I’ve worked with Fortune 100 companies and established brands in beauty, retail, media, and science. I’ve delivered high-impact work across digital, social, editorial, broadcast, and experiential platforms. My background spans growth marketing, editorial operations, and integrated campaigns, which allows me to move between strategy and execution while staying focused on outcomes.
                        </p>
                        <p>
                            If you’re interested in working together, you can reach me through the contact page via email or LinkedIn.
                        </p>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
