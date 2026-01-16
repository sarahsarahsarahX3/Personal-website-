"use client";

import { useEffect, useRef } from "react";

type FlowFieldProps = {
    className?: string;
    fixed?: boolean;
    particleCount?: number;
    connectDistance?: number;
    interactionRadius?: number;
    trailOpacity?: number;
};

export function FlowField({
    className = "",
    fixed = true,
    particleCount = 200,
    connectDistance = 100,
    interactionRadius = 100,
    trailOpacity = 0.05,
}: FlowFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
            if (prefersReducedMotion) return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let hue = 0;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        class Particle {
            x: number;
            y: number;
            speedX: number;
            speedY: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.size = Math.random() * 2 + 0.1;
                this.color = `hsl(${hue}, 100%, 50%)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Interactive mouse physics
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < interactionRadius) {
                    this.speedX -= dx / 50;
                    this.speedY -= dy / 50;
                }

                // Friction
                this.speedX *= 0.98;
                this.speedY *= 0.98;

                // Bounce off walls
                if (this.x > canvas!.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas!.height || this.y < 0) this.speedY = -this.speedY;

                // Color cycle
                this.color = `hsl(${hue}, 70%, 60%)`;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Trail effect
            ctx.fillStyle = `rgba(8, 8, 8, ${trailOpacity})`; // Match surface color with low opacity
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            // Connect particles
            connect();

            hue += 0.5;
            animationFrameId = requestAnimationFrame(animate);
        };

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectDistance) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / (connectDistance * 10)})`; // Fade out line
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        const setPointer = (clientX: number, clientY: number) => {
            mouse.x = clientX;
            mouse.y = clientY;
        };

        const handlePointerMove = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
        const handlePointerDown = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
        const handleMouseMoveFallback = (e: MouseEvent) => setPointer(e.clientX, e.clientY);

        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerdown", handlePointerDown, { passive: true });
        window.addEventListener("mousemove", handleMouseMoveFallback, { passive: true });

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("mousemove", handleMouseMoveFallback);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={[
                fixed ? "fixed" : "absolute",
                "inset-0 w-full h-full bg-surface pointer-events-none",
                className,
            ].join(" ")}
        />
    );
}
