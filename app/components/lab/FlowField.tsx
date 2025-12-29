"use client";

import { useEffect, useRef } from "react";

export function FlowField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 200; // Number of particles
        let mouse = { x: 0, y: 0 };
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

                if (distance < 100) {
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
            ctx.fillStyle = "rgba(8, 8, 8, 0.05)"; // Match surface color with low opacity
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

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1000})`; // Fade out line
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const handleTouchMove = (e: TouchEvent) => {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full bg-surface pointer-events-none"
        />
    );
}
