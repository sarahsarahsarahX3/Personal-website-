"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

export default function ContactPage() {
    const [copied, setCopied] = useState(false);
    const email = "hello@sarah-jenkins.com";

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
                    Let's start a conversation
                </motion.p>

                <div className="relative group cursor-pointer" onClick={handleCopy}>
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-8xl lg:text-9xl font-display leading-none hover:text-white/80 transition-colors"
                    >
                        hello@
                        <br />
                        sarah-jenkins
                        <br />
                        .com
                    </motion.h1>

                    <motion.div
                        className="absolute top-0 right-0 md:top-1/2 md:-right-20 p-4 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
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
                    </motion.div>
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {["LinkedIn", "Twitter", "Instagram", "Dribbble"].map((social, i) => (
                        <motion.a
                            key={social}
                            href="#"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="text-lg text-text-secondary hover:text-accent transition-colors block border-t border-white/10 pt-4"
                        >
                            {social}
                        </motion.a>
                    ))}
                </div>
            </div>
        </main>
    );
}
