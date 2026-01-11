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
    return (
        <div className={cn("relative flex overflow-hidden whitespace-nowrap mask-gradient-x", className)}>
            <motion.div
                className="flex items-center py-4"
                animate={{ x: direction === "left" ? "-50%" : "50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {[...items, ...items, ...items, ...items].map((item, i) => ( // Repeat 4x to ensure smooth loop
                    <span
                        key={i}
                        className="text-sm font-light tracking-widest uppercase text-text-secondary/60 px-6 after:inline-block after:align-middle after:ml-6 after:content-['•'] after:text-text-secondary/25"
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-surface via-transparent to-surface" />
        </div>
    );
}
