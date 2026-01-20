"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Ticker } from "@/app/components/ui/Ticker";
import { Constellation } from "@/app/components/home/Constellation";

export function Hero() {
    const { scrollY } = useScroll();
    const y = useSpring(useTransform(scrollY, [0, 500], [0, 200]), { stiffness: 100, damping: 20 });
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-[100svh] md:min-h-screen flex flex-col overflow-hidden">
            {/* Background Gradient Spot */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <Constellation className="opacity-70" particleCount={60} connectDistance={85} mouseRadius={170} />

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center items-center text-center pb-24 md:pb-0">
                <motion.div style={{ y, opacity }} className="w-full max-w-4xl space-y-6">
                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full text-center text-text-secondary text-lg md:text-xl font-light tracking-wide"
                        >
                            WELCOME
                        </motion.p>
                    </div>

                    <div className="relative w-full">
                        <h1
                            className="w-full text-center text-[10.2vw] md:text-[9.6vw] leading-[0.86] font-display font-medium tracking-[-0.02em] cursor-default mix-blend-exclusion"
                        >
                            <span className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="block relative"
                                >
                                    <span className="relative z-10">PORTFOLIO</span>
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
                className="w-full border-y border-white/5 py-5"
            >
                <Ticker
                    items={[
                        "Strategy",
                        "Storytelling",
                        "Growth",
                    ]}
                    speed={90}
                    showSeparator={false}
                />
            </motion.div>
        </section>
    );
}
