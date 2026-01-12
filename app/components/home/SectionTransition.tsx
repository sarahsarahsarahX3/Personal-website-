"use client";

import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

type SectionTransitionProps = {
  className?: string;
  children: ReactNode;
};

export function SectionTransition({ className, children }: SectionTransitionProps) {
  return (
    <section className={cn("relative", className)}>
      <div className="relative">{children}</div>
    </section>
  );
}
