"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/app/lib/utils";

export default function ContactPage() {
    const [copied, setCopied] = useState(false);
    const email = "dawsone.sarah@gmail.com";
    const [localPart, domain] = email.split("@");
    const [domainName, domainTld] = domain?.split(".") ?? ["", ""];

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen px-6 py-28 md:py-32 flex items-center">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
                <div className="absolute top-24 -right-24 h-[520px] w-[520px] rounded-full bg-accent/8 blur-3xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="mx-auto w-full max-w-5xl relative">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs md:text-sm uppercase tracking-widest text-text-secondary/80 mb-10 md:mb-12"
                >
                    LET’S CONNECT
                </motion.p>

                <div
                    className={cn(
                        "relative group cursor-pointer rounded-3xl border border-white/10 bg-surface-alt/10 backdrop-blur-sm",
                        "p-6 md:p-10",
                        "transition-colors duration-200 hover:border-white/15 hover:bg-surface-alt/15",
                        "focus-within:border-white/15",
                    )}
                    role="button"
                    tabIndex={0}
                    onClick={handleCopy}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleCopy();
                        }
                    }}
                    aria-label="Copy email address"
                >
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="pr-14 text-4xl md:text-7xl lg:text-8xl font-display leading-[0.95] tracking-tight text-white/95 group-hover:text-white transition-colors"
                    >
                        {localPart}@
                        <br />
                        {domainName}
                        <br />
                        .{domainTld}
                    </motion.h1>

                    <motion.button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCopy();
                        }}
                        aria-label={copied ? "Copied" : "Copy email"}
                        className={cn(
                            "absolute top-4 right-4 md:top-6 md:right-6",
                            "p-3 rounded-full border border-white/10 bg-surface/50 backdrop-blur-md",
                            "opacity-100 transition-colors",
                            "hover:border-white/15 hover:bg-surface/70",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.div
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Check className="text-green-400" size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="copy"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Copy className="text-white" size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    <div className="mt-8 md:mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="mt-10 md:mt-12">
                    {[{ label: "LinkedIn", href: "https://www.linkedin.com/in/sarah-dawsone/" }].map((social, i) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className={cn(
                                "inline-flex items-center justify-between gap-4",
                                "w-full max-w-sm",
                                "rounded-2xl border border-white/10 bg-surface-alt/10 px-5 py-4",
                                "text-base md:text-lg text-text-secondary transition-colors",
                                "hover:text-text-primary hover:border-white/15 hover:bg-surface-alt/15",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                            )}
                        >
                            <span>{social.label}</span>
                            <ArrowUpRight className="h-4 w-4 text-text-secondary/70" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </main>
    );
}
