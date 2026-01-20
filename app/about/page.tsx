"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
            <section className="w-full md:w-1/2 min-h-screen flex items-center p-8 md:p-20 pt-20">
                <div className="max-w-xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-display mb-8 leading-tight"
                    >
                        Hi, I&apos;m Sarah Dawson.
                        <span className="block text-xl md:text-2xl font-sans text-text-secondary mt-4 font-normal">
                            Marketing Strategist & Creative Director
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 text-lg text-text-secondary leading-relaxed"
                    >
                        <p>
                            I operate at the intersection of data and daydreaming. For the past decade, I've helped brands find their voice in a crowded digital landscape, not by shouting louder, but by speaking more clearly.
                        </p>
                        <p>
                            My approach is rooted in "Narrative Architecture"—building campaigns that have structural integrity, designed to withstand the shifting winds of algorithms and trends.
                        </p>
                        <p>
                            When I'm not dissecting user behavior, I'm experimenting with creative coding, collecting vintage design annuals, or searching for the perfect espresso.
                        </p>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
