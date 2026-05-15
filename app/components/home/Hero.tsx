"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
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
                <motion.div style={{ y, opacity }} className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6">
                    <div className="flex w-full justify-center overflow-hidden">
                        <motion.p
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center text-text-secondary text-lg md:text-base font-light tracking-wide"
                        >
                            WELCOME TO MY
                        </motion.p>
                    </div>

                    <div className="relative flex w-full justify-center">
                        <h1
                            className="w-full text-center text-[clamp(3.5rem,8vw,10rem)] leading-[0.9] font-display font-medium tracking-[-0.02em] cursor-default mix-blend-exclusion"
                        >
                            <span className="block overflow-hidden py-[0.06em]">
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
                        className="w-full text-text-secondary text-lg md:text-xl"
                    >
                        <div className="flex w-full items-center justify-center text-white text-sm">
                            <span>SCROLL TO EXPLORE</span>
                            <ArrowDownRight size={14} className="ml-2" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div className="w-full" aria-hidden="true" />
        </section>
    );
}
