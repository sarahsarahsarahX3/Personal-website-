"use client";

import { useRef } from "react";
import { motion, useAnimationControls, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Ticker } from "@/app/components/ui/Ticker";
import { Constellation } from "@/app/components/home/Constellation";

export function Hero() {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const sweepControls = useAnimationControls();
    const { scrollY } = useScroll();
    const y = useSpring(useTransform(scrollY, [0, 500], [0, 200]), { stiffness: 100, damping: 20 });
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const runSweep = async () => {
        const heading = headlineRef.current;
        if (!heading) return;

        const sweepWidth = 180;
        const rect = heading.getBoundingClientRect();
        const startX = -sweepWidth;
        const endX = rect.width + sweepWidth;

        sweepControls.stop();
        sweepControls.set({ x: startX, opacity: 0 });
        await sweepControls.start({
            x: [startX, endX],
            opacity: [0, 1, 1, 0],
            transition: {
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.15, 0.85, 1],
            },
        });
    };

    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden">
            {/* Background Gradient Spot */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <Constellation className="opacity-50" particleCount={60} connectDistance={85} mouseRadius={170} />

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center items-center text-center">
                <motion.div style={{ y, opacity }} className="w-full max-w-4xl space-y-6">
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

                    <div className="relative w-full">
                        <h1
                            ref={headlineRef}
                            className="w-full text-center text-[11vw] leading-[0.85] font-display font-medium tracking-tight cursor-default mix-blend-exclusion"
                            onMouseEnter={runSweep}
                        >
                            <span className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="block relative"
                                >
                                    <span className="relative z-10">PORTFOLIO</span>

                                    {/* "Reveal the story" wipe */}
                                    <motion.span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 overflow-hidden"
                                        style={{ width: 180 }}
                                        initial={{ x: -180, opacity: 0 }}
                                        animate={sweepControls}
                                    >
                                        <span
                                            className="absolute inset-0 text-transparent bg-clip-text"
                                            style={{
                                                backgroundImage:
                                                    "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A//www.w3.org/2000/svg'%20width%3D'600'%20height%3D'110'%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'transparent'/%3E%3Ctext%20x%3D'50%25'%20y%3D'62%25'%20text-anchor%3D'middle'%20font-family%3D'ui-monospace%2CSFMono-Regular%2CMenlo%2CMonaco%2CConsolas%2CLiberation%20Mono%2CCourier%20New%2Cmonospace'%20font-size%3D'34'%20fill%3D'rgba(255%2C255%2C255%2C0.75)'%20letter-spacing%3D'2'%3Ecampaigns%20%E2%80%A2%20editorial%20%E2%80%A2%20growth%3C/text%3E%3C/svg%3E\")",
                                                backgroundRepeat: "repeat",
                                                backgroundPosition: "center",
                                                backgroundSize: "600px 110px",
                                            }}
                                        >
                                            PORTFOLIO
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-sm opacity-70" />
                                    </motion.span>
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
                    speed={70}
                />
            </motion.div>
        </section>
    );
}
