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
                        Hi, I’m Sarah Dawson.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 text-lg text-text-secondary leading-relaxed"
                    >
                        <p>
                            I’m a marketing professional who focuses on clear messaging, strong execution, and work that actually performs. I’ve spent the last several years helping brands figure out what they need to say, how to say it, and where it should live, across content, campaigns, and brand communications.
                        </p>
                        <p>
                            My background spans growth marketing, editorial, and integrated campaigns, which means I’m comfortable moving between data, strategy, and creative work without losing the thread. I care about structure, consistency, and outcomes, and I’m especially good at turning complex ideas into messaging people can understand and act on.
                        </p>
                        <p>
                            For inquiries or collaboration, please get in touch via the contact page.
                        </p>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
