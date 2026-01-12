"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/app/lib/utils";

type ConstellationProps = {
  className?: string;
  particleCount?: number;
  connectDistance?: number;
  mouseRadius?: number;
  particleSpeed?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function Constellation({
  className,
  particleCount = 70,
  connectDistance = 90,
  mouseRadius = 160,
  particleSpeed = 0.28,
}: ConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse = { x: 0, y: 0, active: false };
    const particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * particleSpeed,
          vy: (Math.random() - 0.5) * particleSpeed,
        });
      }
    };

    const handleResize = () => {
      resize();
      init();
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      mouse.active = true;
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      // Particles
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        ctx.fillStyle = "rgba(255,255,255,0.42)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.active) {
        // Connections only near cursor
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i]!;
          const amx = a.x - mouse.x;
          const amy = a.y - mouse.y;
          const distToMouseA = Math.sqrt(amx * amx + amy * amy);
          if (distToMouseA > mouseRadius) continue;

          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j]!;
            const bmx = b.x - mouse.x;
            const bmy = b.y - mouse.y;
            const distToMouseB = Math.sqrt(bmx * bmx + bmy * bmy);
            if (distToMouseB > mouseRadius) continue;

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > connectDistance) continue;

            const proximity = 1 - dist / connectDistance;
            const mouseProximity = 1 - Math.max(distToMouseA, distToMouseB) / mouseRadius;
            const alpha = Math.max(0, 0.36 * proximity * mouseProximity);

            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Cursor glow
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouseRadius);
        gradient.addColorStop(0, "rgba(255,59,48,0.08)");
        gradient.addColorStop(1, "rgba(255,59,48,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(step);
    };

    resize();
    init();
    step();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [connectDistance, mouseRadius, particleCount, particleSpeed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full pointer-events-none", className)}
    />
  );
}
