"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

type SectionTransitionProps = {
  className?: string;
  children: ReactNode;
};

export function SectionTransition({ className, children }: SectionTransitionProps) {
  return (
    <motion.section
      className={cn("relative border-t border-white/5", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        show: {},
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-px origin-left bg-white/5"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative">{children}</div>
    </motion.section>
  );
}
