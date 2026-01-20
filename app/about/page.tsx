"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-surface flex flex-col md:flex-row">
            {/* Visual Side (Left on Desktop) */}
            <section className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden bg-black flex items-center justify-center">
                {/* Abstract "WebGL-like" CSS composition */}
                <div className="absolute inset-0 opacity-50">
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

                {/* Floating Text Mesh effect */}
                <div className="relative z-10 text-center mix-blend-difference">
                    <h2 className="text-[10vw] font-display leading-none text-white opacity-80">
                        VISION
                        <br />
                        ARY
                    </h2>
                </div>
            </section>

            {/* Content Side (Right on Desktop) */}
            <section className="w-full md:w-1/2 min-h-screen flex items-center p-8 md:p-20 pt-20 pb-32 md:pb-20">
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
                        <div className="pt-2">
                            <p className="text-base font-mono uppercase tracking-widest text-text-secondary/70">
                                My career highlights include:
                            </p>
                            <ul className="mt-4 space-y-3 pl-5 text-lg leading-relaxed text-text-secondary list-disc">
                                <li>7+ years of experience leading content, campaign, and editorial initiatives.</li>
                                <li>
                                    Fortune 100 experience, partnering with three Fortune 100 companies across beauty, retail, and media.
                                </li>
                                <li>15M+ total views generated across digital, social, editorial, and broadcast platforms.</li>
                                <li>1,000+ assets delivered annually, supporting large-scale, multichannel programs.</li>
                                <li>50+ brand and partner collaborations, including creators, influencers, and strategic partners.</li>
                                <li>Global market experience, spanning U.S., Canadian, and international audiences.</li>
                                <li>Broadcast media contributor for Discovery Channel properties, including Daily Planet and Mighty Cruise Ships.</li>
                                <li>SEO-led editorial growth expertise, building content systems designed for long-term performance.</li>
                            </ul>
                        </div>
                        <p>
                            If you’re interested in working together, you can reach me through the contact page via email or LinkedIn.
                        </p>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
