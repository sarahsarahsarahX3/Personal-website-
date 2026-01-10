"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface TickerProps {
    items: string[];
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}

export function Ticker({ items, direction = "left", speed = 20, className }: TickerProps) {
    // `speed` is a relative rate where smaller = slower.
    // We convert it to a duration so the marquee feels consistent even when the page is busy (e.g. scrolling).
    const duration = 225 / Math.max(1, speed);

    return (
        <div className={cn("relative flex overflow-hidden whitespace-nowrap mask-gradient-x", className)}>
            <motion.div
                className="flex gap-16 py-4 transform-gpu will-change-transform"
                animate={{ x: direction === "left" ? "-50%" : "50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration,
                }}
            >
                {[...items, ...items, ...items, ...items].map((item, i) => ( // Repeat 4x to ensure smooth loop
                    <span key={i} className="text-sm font-light tracking-widest uppercase text-text-secondary/60">
                        {item}
                    </span>
                ))}
            </motion.div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-surface via-transparent to-surface" />
        </div>
    );
}
