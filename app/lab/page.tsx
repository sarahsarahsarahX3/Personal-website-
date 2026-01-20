"use client";

import { motion } from "framer-motion";
import { FlowField } from "@/app/components/lab/FlowField";

export default function LabPage() {
    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Canvas Background */}
            <FlowField />

            {/* Overlay Content */}
            <div className="relative z-10 w-full min-h-[100svh] flex flex-col justify-between p-8 pb-[calc(7rem+env(safe-area-inset-bottom))] md:p-20 md:pb-20 pointer-events-none">

                {/* Header */}
                <header>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-display"
                    >
                        The Lab
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-text-secondary text-lg max-w-sm mt-4"
                    >
                        Experiment 001: <span className="text-white">Neural Particle Flow</span>
                        <br />
                        <span className="text-xs uppercase tracking-widest text-accent">Interactive Canvas API</span>
                    </motion.p>
                </header>

                {/* Footer Instructions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex justify-between items-end"
                >
                    <div className="text-sm text-text-secondary">
                        <p>Move cursor to interact</p>
                        <p>Physics-based collision system</p>
                    </div>

                    <div className="backdrop-blur-md bg-white/5 border border-white/10 p-4 rounded-xl max-w-xs">
                        <p className="text-xs text-text-secondary">
                            "Creativity is the power to connect the seemingly unconnected."
                        </p>
                        <p className="text-xs text-accent mt-2 font-mono">
                    // rendering at 60fps
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
