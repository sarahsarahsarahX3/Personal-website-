"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

type Audience = "Beauty Pros" | "Founders" | "Creators" | "Retail" | "Consumers";
type Channel = "Search" | "Social" | "Email" | "Editorial" | "Video";
type Angle = "Proof" | "Desire" | "Authority" | "Community" | "Curiosity";

const audiences: Audience[] = ["Beauty Pros", "Founders", "Creators", "Retail", "Consumers"];
const channels: Channel[] = ["Search", "Social", "Email", "Editorial", "Video"];
const angles: Angle[] = ["Proof", "Desire", "Authority", "Community", "Curiosity"];

function buildWavePath({
    width,
    height,
    amplitude,
    frequency,
}: {
    width: number;
    height: number;
    amplitude: number;
    frequency: number;
}) {
    const midY = height / 2;
    const steps = 64;
    const points = Array.from({ length: steps + 1 }, (_, i) => {
        const t = i / steps;
        const x = t * width;
        const y = midY + Math.sin(t * Math.PI * 2 * frequency) * amplitude;
        return { x, y };
    });

    return `M ${points.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L ")}`;
}

function clamp01(n: number) {
    return Math.max(0, Math.min(1, n));
}

function scoreFromSelection({
    audience,
    channel,
    angle,
    clarity,
    tension,
}: {
    audience: Audience;
    channel: Channel;
    angle: Angle;
    clarity: number;
    tension: number;
}) {
    const base = 0.55;
    const channelBoost: Record<Channel, number> = {
        Search: 0.2,
        Editorial: 0.12,
        Email: 0.08,
        Social: 0.1,
        Video: 0.1,
    };
    const angleBoost: Record<Angle, number> = {
        Proof: 0.14,
        Authority: 0.12,
        Curiosity: 0.11,
        Desire: 0.1,
        Community: 0.09,
    };
    const audienceBoost: Record<Audience, number> = {
        "Beauty Pros": 0.12,
        Founders: 0.1,
        Creators: 0.08,
        Retail: 0.06,
        Consumers: 0.07,
    };

    const clarityScore = clamp01(clarity / 100);
    const tensionScore = clamp01(tension / 100);

    const searchIntent = clamp01(base + channelBoost[channel] + angleBoost[angle] + clarityScore * 0.2);
    const retention = clamp01(base + (1 - Math.abs(tensionScore - 0.55)) * 0.25 + audienceBoost[audience]);
    const conversion = clamp01(base + clarityScore * 0.25 + (angle === "Proof" ? 0.1 : 0) + (channel === "Email" ? 0.05 : 0));

    return {
        searchIntent,
        retention,
        conversion,
    };
}

function emitAnalytics(event: string, payload: Record<string, unknown>) {
    try {
        window.dispatchEvent(
            new CustomEvent("portfolio:analytics", {
                detail: { event, ...payload },
            })
        );
    } catch {
        // no-op
    }
}

export function StoryEngine() {
    const [audience, setAudience] = useState<Audience>("Beauty Pros");
    const [channel, setChannel] = useState<Channel>("Search");
    const [angle, setAngle] = useState<Angle>("Curiosity");
    const [clarity, setClarity] = useState(72);
    const [tension, setTension] = useState(58);

    const wave = useMemo(() => {
        const frequencyByChannel: Record<Channel, number> = {
            Search: 2.2,
            Email: 1.8,
            Editorial: 1.5,
            Social: 2.8,
            Video: 2.4,
        };
        return buildWavePath({
            width: 560,
            height: 120,
            amplitude: 8 + (tension / 100) * 22,
            frequency: frequencyByChannel[channel],
        });
    }, [tension, channel]);

    const signal = useMemo(() => {
        const { searchIntent, retention, conversion } = scoreFromSelection({
            audience,
            channel,
            angle,
            clarity,
            tension,
        });
        return {
            searchIntent,
            retention,
            conversion,
        };
    }, [audience, channel, angle, clarity, tension]);

    const story = useMemo(() => {
        const hookTemplates: Record<Angle, string[]> = {
            Curiosity: [
                "What happens when {audience} stop scrolling—and start leaning in?",
                "The tiny shift that makes {audience} pay attention (fast).",
            ],
            Proof: [
                "The numbers don’t lie: {audience} respond to clarity.",
                "Here’s what actually moved the needle for {audience}.",
            ],
            Desire: [
                "Make {audience} want it before they understand it.",
                "Turn attention into intent—without losing the magic.",
            ],
            Authority: [
                "Define the point of view. Then dominate the category.",
                "Credibility first. Conversion follows.",
            ],
            Community: [
                "Build a world {audience} want to belong to.",
                "From audience to advocates—in one narrative arc.",
            ],
        };

        const supportTemplates: Record<Channel, string[]> = {
            Search: [
                "Lead with answers. Then layer in story—so search becomes trust.",
                "Structure the narrative for humans and algorithms: headings, intent, and proof.",
            ],
            Social: [
                "Hook in 1 second, reward in 3, and invite response in 10.",
                "A scroll-stopping opener + a shareable takeaway = compounding reach.",
            ],
            Email: [
                "Subject line as promise. Body as payoff. CTA as next chapter.",
                "Personal, precise, and frictionless—so the click feels inevitable.",
            ],
            Editorial: [
                "A clear thesis, a sharp POV, and imagery that carries the mood.",
                "Narrative structure that reads like culture—not content.",
            ],
            Video: [
                "Start with contrast. Build tension. Land the benefit in one line.",
                "Make the story visible: motion, rhythm, and a satisfying reveal.",
            ],
        };

        const ctaByChannel: Record<Channel, string> = {
            Search: "Explore the full case study",
            Social: "Save + share the takeaway",
            Email: "Open the next chapter",
            Editorial: "Read the feature",
            Video: "Watch the story unfold",
        };

        const pick = (arr: string[]) => arr[Math.floor((clarity + tension + arr.length) % arr.length)];
        const token = (s: string) => s.replace("{audience}", audience);

        return {
            hook: token(pick(hookTemplates[angle])),
            support: token(pick(supportTemplates[channel])),
            cta: ctaByChannel[channel],
        };
    }, [audience, channel, angle, clarity, tension]);

    return (
        <section className="border-t border-white/10">
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-5">
                        <p className="text-xs uppercase tracking-widest text-text-secondary/70 font-mono mb-4">
                            Story Engine
                        </p>
                        <h2 className="text-4xl md:text-5xl font-display leading-tight">
                            Storytelling meets signal.
                        </h2>
                        <p className="mt-4 text-text-secondary text-lg">
                            Dial in audience, channel, and angle—then watch the narrative (and the metrics) shift.
                        </p>

                        <div className="mt-10 space-y-6">
                            <fieldset>
                                <legend className="text-xs uppercase tracking-widest text-text-secondary/70 font-mono mb-3">
                                    Audience
                                </legend>
                                <div className="flex flex-wrap gap-2">
                                    {audiences.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            className={cn(
                                                "px-4 py-2 rounded-full border text-xs uppercase tracking-widest transition-colors",
                                                audience === item
                                                    ? "border-accent/60 text-accent bg-white/5"
                                                    : "border-white/10 text-text-secondary bg-transparent hover:bg-white/5 hover:border-white/25"
                                            )}
                                            onClick={() => {
                                                setAudience(item);
                                                emitAnalytics("story_engine_select", { field: "audience", value: item });
                                            }}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="text-xs uppercase tracking-widest text-text-secondary/70 font-mono mb-3">
                                    Channel
                                </legend>
                                <div className="flex flex-wrap gap-2">
                                    {channels.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            className={cn(
                                                "px-4 py-2 rounded-full border text-xs uppercase tracking-widest transition-colors",
                                                channel === item
                                                    ? "border-accent/60 text-accent bg-white/5"
                                                    : "border-white/10 text-text-secondary bg-transparent hover:bg-white/5 hover:border-white/25"
                                            )}
                                            onClick={() => {
                                                setChannel(item);
                                                emitAnalytics("story_engine_select", { field: "channel", value: item });
                                            }}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="text-xs uppercase tracking-widest text-text-secondary/70 font-mono mb-3">
                                    Angle
                                </legend>
                                <div className="flex flex-wrap gap-2">
                                    {angles.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            className={cn(
                                                "px-4 py-2 rounded-full border text-xs uppercase tracking-widest transition-colors",
                                                angle === item
                                                    ? "border-accent/60 text-accent bg-white/5"
                                                    : "border-white/10 text-text-secondary bg-transparent hover:bg-white/5 hover:border-white/25"
                                            )}
                                            onClick={() => {
                                                setAngle(item);
                                                emitAnalytics("story_engine_select", { field: "angle", value: item });
                                            }}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="text-xs uppercase tracking-widest text-text-secondary/70 font-mono">
                                        Clarity
                                    </span>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={clarity}
                                        onChange={(e) => setClarity(Number(e.target.value))}
                                        onPointerUp={() => emitAnalytics("story_engine_adjust", { field: "clarity", value: clarity })}
                                        className="mt-3 w-full accent-[color:var(--color-accent)]"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-xs uppercase tracking-widest text-text-secondary/70 font-mono">
                                        Tension
                                    </span>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={tension}
                                        onChange={(e) => setTension(Number(e.target.value))}
                                        onPointerUp={() => emitAnalytics("story_engine_adjust", { field: "tension", value: tension })}
                                        className="mt-3 w-full accent-[color:var(--color-accent)]"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <motion.div
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 relative overflow-hidden"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
                                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
                            </div>

                            <div className="relative">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1 rounded-full border border-white/10 text-[11px] uppercase tracking-widest text-text-secondary bg-white/5">
                                        {audience}
                                    </span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 text-[11px] uppercase tracking-widest text-text-secondary bg-white/5">
                                        {channel}
                                    </span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 text-[11px] uppercase tracking-widest text-text-secondary bg-white/5">
                                        {angle}
                                    </span>
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="rounded-xl border border-white/10 bg-surface/40 px-4 py-3">
                                        <div className="text-xs font-mono text-text-secondary/70 uppercase tracking-widest">
                                            Search Intent
                                        </div>
                                        <div className="mt-2 text-2xl font-display">
                                            {Math.round(signal.searchIntent * 100)}%
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-surface/40 px-4 py-3">
                                        <div className="text-xs font-mono text-text-secondary/70 uppercase tracking-widest">
                                            Retention
                                        </div>
                                        <div className="mt-2 text-2xl font-display">
                                            {Math.round(signal.retention * 100)}%
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-surface/40 px-4 py-3">
                                        <div className="text-xs font-mono text-text-secondary/70 uppercase tracking-widest">
                                            Conversion
                                        </div>
                                        <div className="mt-2 text-2xl font-display">
                                            {Math.round(signal.conversion * 100)}%
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="text-xs font-mono text-text-secondary/70 uppercase tracking-widest">
                                        Signal Wave
                                    </div>
                                    <svg viewBox="0 0 560 120" className="mt-3 w-full h-[120px]">
                                        <defs>
                                            <linearGradient id="waveGrad" x1="0" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
                                                <stop offset="0" stopColor="rgba(255,255,255,0.15)" />
                                                <stop offset="0.5" stopColor="rgba(255,255,255,0.35)" />
                                                <stop offset="1" stopColor="rgba(255,255,255,0.15)" />
                                            </linearGradient>
                                        </defs>
                                        <motion.path
                                            d={wave}
                                            fill="none"
                                            stroke="url(#waveGrad)"
                                            strokeWidth={2.5}
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                        <motion.path
                                            d={wave}
                                            fill="none"
                                            stroke="rgba(255,255,255,0.12)"
                                            strokeWidth={8}
                                            strokeLinecap="round"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </svg>
                                </div>

                                <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                    <div className="md:col-span-8">
                                        <div className="text-xs font-mono text-text-secondary/70 uppercase tracking-widest">
                                            Narrative Output
                                        </div>
                                        <div className="mt-3 space-y-3">
                                            <p className="text-xl md:text-2xl font-display leading-snug">
                                                {story.hook}
                                            </p>
                                            <p className="text-text-secondary leading-relaxed">
                                                {story.support}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-4">
                                        <div className="text-xs font-mono text-text-secondary/70 uppercase tracking-widest">
                                            Next Action
                                        </div>
                                        <button
                                            type="button"
                                            className={cn(
                                                "mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl",
                                                "border border-white/10 bg-white/10 hover:bg-white/15 transition-colors",
                                                "text-xs uppercase tracking-widest text-text-primary"
                                            )}
                                            onClick={() => emitAnalytics("story_engine_cta_click", { cta: story.cta })}
                                            data-analytics="story_engine_cta"
                                        >
                                            {story.cta}
                                        </button>
                                        <p className="mt-3 text-xs text-text-secondary">
                                            This is a live, client-side demo—perfect for showing creative + strategic thinking.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

