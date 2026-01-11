"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Home, Briefcase, BookOpen, FlaskConical, Mail, User } from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/work", icon: Briefcase },
    { name: "Articles", href: "/insights", icon: BookOpen },
    { name: "About", href: "/about", icon: User },
    { name: "Lab", href: "/lab", icon: FlaskConical },
    { name: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-md md:max-w-none">
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                className={cn(
                    "flex items-center justify-between md:justify-center gap-1 md:gap-2 p-2 rounded-full",
                    "bg-surface/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-x-auto md:overflow-x-visible md:overflow-visible no-scrollbar"
                )}
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "relative flex items-center justify-center px-3 py-3 md:px-4 rounded-full transition-colors duration-300 group shrink-0",
                                isActive ? "text-surface" : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-text-primary rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            <span className="relative z-10 flex items-center gap-2">
                                <Icon size={18} className={cn("transition-transform group-hover:scale-110", isActive && "text-surface")} />
                                <span
                                    className={cn(
                                        "text-sm font-medium transition-all duration-300",
                                        isActive ? "inline-block" : "hidden md:hidden group-hover:md:inline-block"
                                    )}
                                >
                                    {item.name}
                                </span>
                            </span>
                        </Link>
                    );
                })}
            </motion.nav>
        </div>
    );
}
