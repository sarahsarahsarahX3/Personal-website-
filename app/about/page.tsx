"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-surface flex flex-col md:flex-row">
            {/* Visual Side (Left on Desktop) */}
            <section className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden bg-black flex items-center justify-center">
                {/* Abstract "WebGL-like" CSS composition */}
                <div className="absolute inset-0 opacity-40">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                            filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-30 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            rotate: [360, 0],
                            scale: [1.2, 1, 1.2],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_180deg,transparent_0_340deg,var(--color-accent)_360deg)] opacity-20 blur-3xl mix-blend-screen"
                    />
                </div>

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"
                />

                <figure className="relative z-10 w-full px-8 md:px-14">
                    <div className="mx-auto w-full max-w-[360px] md:max-w-[420px]">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-inset ring-white/15 bg-black/20">
                            <Image
                                src="/images/IMG_8516_edited.jpg"
                                alt="Headshot of Sarah Dawson"
                                fill
                                sizes="(min-width: 768px) 420px, 70vw"
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
            <section className="w-full md:w-1/2 min-h-screen flex items-center p-8 md:p-20 pt-20 pb-32 md:pb-32 lg:pb-40">
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
