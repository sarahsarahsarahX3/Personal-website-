"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Ticker } from "@/app/components/ui/Ticker";
import { Constellation } from "@/app/components/home/Constellation";

export function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    const { scrollY } = useScroll();
    const y = useSpring(useTransform(scrollY, [0, 500], [0, 200]), { stiffness: 100, damping: 20 });
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-8 overflow-hidden">
            {/* Background Gradient Spot */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <Constellation className="opacity-50" particleCount={60} connectDistance={85} mouseRadius={170} />

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center items-center text-center">
                <motion.div style={{ y, opacity }} className="space-y-6 max-w-4xl">
                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-text-secondary text-lg md:text-xl font-light tracking-wide"
                        >
                            Sarah Dawson
                        </motion.p>
                    </div>

                    <div className="relative inline-block">
                        <h1
                            className="text-[11vw] leading-[0.85] font-display font-medium tracking-tight cursor-default mix-blend-exclusion"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <span className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="block relative"
                                >
                                    <span className="relative z-10">
                                        PORTFOLIO
                                    </span>

                                    {/* Video Reveal Hover Effect */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: isHovered ? 1 : 0 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-0 bg-white/5 z-0 origin-left"
                                    >
                                        <video
                                            className="w-full h-full object-cover opacity-60 mix-blend-multiply grayscale"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            // Using a reliable placeholder video (abstract ink)
                                            src="https://cdn.coverr.co/videos/coverr-abstract-colorful-ink-in-water-5282/1080p.mp4"
                                        />
                                    </motion.div>
                                </motion.span>
                            </span>
                        </h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-text-secondary text-lg md:text-xl text-balance"
                    >
                        Strategy. Storytelling. Growth.
                        <div className="mt-6 flex items-center justify-center gap-2 text-white text-sm">
                            <span>Scroll to explore</span> <ArrowDownRight size={14} />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer Ticker */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="w-full border-t border-white/5 pt-8"
            >
                <Ticker
                    items={[
                        "Storytelling",
                        "Content Marketing",
                        "SEO + AEO Strategy",
                        "Integrated Campaigns",
                        "Copywriting",
                        "Content Creation",
                        "Digital Publishing",
                        "Editorial Leadership",
                        "Communications",
                    ]}
                    speed={60}
                />
            </motion.div>
        </section>
    );
}
