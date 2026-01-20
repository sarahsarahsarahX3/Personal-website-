"use client";

import { motion } from "framer-motion";

function AccentMark({ children }: { children: React.ReactNode }) {
    return (
        <span className="relative inline-flex">
            <span className="relative z-10 text-text-primary">{children}</span>
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-1 bottom-[0.08em] h-[0.7em] rounded-sm bg-accent/10"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-1 bottom-[0.08em] h-px bg-accent/40"
            />
        </span>
    );
}

function MetricLead({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-mono text-[13px] uppercase tracking-widest text-accent/90">{children}</span>
    );
}

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
                            I’m Sarah Dawson, a marketing professional who leads{" "}
                            <AccentMark>content, campaign, and editorial initiatives</AccentMark> for brands across integrated channels. My work focuses on building{" "}
                            <AccentMark>clear, consistent messaging</AccentMark> and executing at scale across{" "}
                            <AccentMark>content systems, campaigns, and brand communications</AccentMark>.
                        </p>
                        <p>
                            Over the past seven years, I’ve worked with <AccentMark>Fortune 100 companies</AccentMark> and established brands in beauty, retail, media, and science. I’ve delivered high-impact work across digital, social, editorial, broadcast, and experiential platforms. My background spans{" "}
                            <AccentMark>growth marketing</AccentMark>, <AccentMark>editorial operations</AccentMark>, and <AccentMark>integrated campaigns</AccentMark>, which allows me to move between strategy and execution while staying focused on outcomes.
                        </p>
                        <div className="pt-2">
                            <p className="text-base font-mono uppercase tracking-widest text-text-secondary/70">
                                My career highlights include:
                            </p>
                            <ul className="mt-5 grid gap-3">
                                <li className="grid grid-cols-[12px_1fr] gap-4">
                                    <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 rounded-full bg-accent/70" />
                                    <span><MetricLead>7+</MetricLead> years of experience leading content, campaign, and editorial initiatives.</span>
                                </li>
                                <li className="grid grid-cols-[12px_1fr] gap-4">
                                    <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 rounded-full bg-accent/70" />
                                    <span><MetricLead>Fortune 100</MetricLead> experience, partnering with three Fortune 100 companies across beauty, retail, and media.</span>
                                </li>
                                <li className="grid grid-cols-[12px_1fr] gap-4">
                                    <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 rounded-full bg-accent/70" />
                                    <span><MetricLead>15M+</MetricLead> total views generated across digital, social, editorial, and broadcast platforms.</span>
                                </li>
                                <li className="grid grid-cols-[12px_1fr] gap-4">
                                    <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 rounded-full bg-accent/70" />
                                    <span><MetricLead>1,000+</MetricLead> assets delivered annually, supporting large-scale, multichannel programs.</span>
                                </li>
                                <li className="grid grid-cols-[12px_1fr] gap-4">
                                    <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 rounded-full bg-accent/70" />
                                    <span><MetricLead>50+</MetricLead> brand and partner collaborations, including creators, influencers, and strategic partners.</span>
                                </li>
                                <li className="grid grid-cols-[12px_1fr] gap-4">
                                    <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 rounded-full bg-accent/70" />
                                    <span><MetricLead>Global</MetricLead> market experience, spanning U.S., Canadian, and international audiences.</span>
                                </li>
                                <li className="grid grid-cols-[12px_1fr] gap-4">
                                    <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 rounded-full bg-accent/70" />
                                    <span><MetricLead>Broadcast</MetricLead> media contributor for Discovery Channel properties, including Daily Planet and Mighty Cruise Ships.</span>
                                </li>
                                <li className="grid grid-cols-[12px_1fr] gap-4">
                                    <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 rounded-full bg-accent/70" />
                                    <span><MetricLead>SEO-led</MetricLead> editorial growth expertise, building content systems designed for long-term performance.</span>
                                </li>
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
