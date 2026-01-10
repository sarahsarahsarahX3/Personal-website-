"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Ticker } from "@/app/components/ui/Ticker";

export function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    const { scrollY } = useScroll();
    const y = useSpring(useTransform(scrollY, [0, 500], [0, 200]), { stiffness: 100, damping: 20 });
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-screen flex flex-col justify-between pt-8 pb-8 overflow-hidden">
            {/* Background Gradient Spot */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center">
                <motion.div style={{ y, opacity }} className="space-y-4">
                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-text-secondary text-lg md:text-xl font-light tracking-wide mb-4"
                        >
                            Sarah Dawson
                        </motion.p>
                    </div>

                    <div className="lg:grid lg:grid-cols-[1fr_20rem] lg:items-center lg:gap-12">
                        <h1
                            className="text-[clamp(3.5rem,12vw,8.5rem)] leading-[0.85] font-display font-medium tracking-tight cursor-default mix-blend-exclusion"
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
                                        className="absolute inset-0 bg-accent z-0 origin-left"
                                    >
                                        <video
                                            className="w-full h-full object-cover opacity-60 mix-blend-multiply grayscale"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            src="https://cdn.coverr.co/videos/coverr-abstract-colorful-ink-in-water-5282/1080p.mp4"
                                        />
                                    </motion.div>
                                </motion.span>
                            </span>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-10 lg:mt-0"
                        >
                            <div className="text-sm text-text-secondary text-balance">
                                Brand alchemy, digital growth, and storytelling that earns attention.
                                <div className="mt-5 flex items-center gap-2 text-white">
                                    <span>Scroll to explore</span> <ArrowDownRight size={14} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
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
                        "Integrated Marketing",
                        "Campaigns",
                        "Copywriting",
                        "SEO Strategy",
                        "Brand Storytelling",
                        "Content Creation",
                        "Editorial Leadership",
                        "Digital Content Management",
                    ]}
                    speed={35}
                />
            </motion.div>
        </section>
    );
}
