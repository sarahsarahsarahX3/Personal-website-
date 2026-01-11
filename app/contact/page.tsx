"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

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
        <main className="min-h-screen pt-32 pb-40 px-6 flex flex-col justify-center">
            <div className="container mx-auto max-w-4xl">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-text-secondary text-lg uppercase tracking-widest mb-8"
                >
                    LET’S CONNECT
                </motion.p>

                <div
                    className="relative group cursor-pointer"
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
                        className="pr-14 md:pr-0 text-4xl md:text-7xl lg:text-8xl font-display leading-none hover:text-white/80 transition-colors"
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
                        className="absolute top-2 right-2 md:top-1/2 md:left-full md:right-auto md:ml-6 md:-translate-y-1/2 p-3 rounded-full bg-white/10 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity backdrop-blur-md"
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
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[{ label: "LinkedIn", href: "https://www.linkedin.com/in/sarah-dawsone/" }].map((social, i) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="text-lg text-text-secondary hover:text-accent transition-colors block border-t border-white/10 pt-4"
                        >
                            {social.label}
                        </motion.a>
                    ))}
                </div>
            </div>
        </main>
    );
}
