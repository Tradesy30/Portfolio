"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

interface SparklesProps {
    id?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    particleDensity?: number;
    className?: string;
    particleColor?: string;
    speed?: number;
    particleGlow?: boolean;
}

// Debounce function with proper TypeScript types
function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export default function Sparkles({
    id = "sparkles",
    background = "transparent",
    minSize = 2.0,
    maxSize = 4.0,
    particleDensity = 25,
    className = "h-full w-full",
    particleColor = "#38bdf8",
    speed = 1,
    particleGlow = true,
}: SparklesProps): React.ReactElement {
    const { resolvedTheme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameIdRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const currentParticleColor = resolvedTheme === 'dark' ? particleColor : '#0c4a6e';

    const initParticles = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
        const scale = window.devicePixelRatio || 1;

        canvas.width = window.innerWidth * scale;
        canvas.height = window.innerHeight * scale;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(scale, scale);

        if (particlesRef.current.length === 0) {
            particlesRef.current = Array.from({ length: particleDensity }, () =>
                new Particle(canvas, currentParticleColor, minSize, maxSize, speed)
            );
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [particleDensity, currentParticleColor, minSize, maxSize, speed]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", {
            alpha: true,
            willReadFrequently: false
        });
        if (!ctx) return;

        initParticles(canvas, ctx);

        let lastTime = performance.now();
        const fps = 60;
        const frameInterval = 1000 / fps;

        const animate = (currentTime: number): void => {
            if (!canvas || !ctx) return;

            const deltaTime = currentTime - lastTime;
            if (deltaTime >= frameInterval) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const timeScale = deltaTime / frameInterval;
                // Update and draw particles
                particlesRef.current.forEach((p) => {
                    p.update(timeScale);
                    p.draw(ctx, particleGlow);
                });

                lastTime = currentTime - (deltaTime % frameInterval);
            }
            animationFrameIdRef.current = requestAnimationFrame(animate);
        };

        animationFrameIdRef.current = requestAnimationFrame((time) => animate(time));

        const debouncedResize = debounce(() => {
            const scale = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * scale;
            canvas.height = window.innerHeight * scale;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(scale, scale);
        }, 250);

        window.addEventListener("resize", debouncedResize);

        return () => {
            window.removeEventListener("resize", debouncedResize);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [initParticles, particleGlow]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <canvas
                ref={canvasRef}
                id={id}
                className="absolute inset-0 -z-20"
                style={{
                    background,
                    transform: 'translate3d(0,0,0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform'
                }}
            />
        </div>
    );
}

// Type-safe Particle class
class Particle {
    readonly canvas: HTMLCanvasElement;
    readonly color: string;
    x: number = 0;
    y: number = 0;
    size: number = 0;
    speedX: number = 0;
    speedY: number = 0;
    opacity: number = 0;

    constructor(canvas: HTMLCanvasElement, color: string, minSize: number, maxSize: number, speed: number) {
        this.canvas = canvas;
        this.color = color;
        this.reset(minSize, maxSize, speed);
    }

    reset(minSize: number, maxSize: number, speed: number): void {
        const scale = window.devicePixelRatio || 1;
        const margin = maxSize * 2;
        this.x = margin + Math.random() * ((this.canvas.width / scale) - margin * 2);
        this.y = margin + Math.random() * ((this.canvas.height / scale) - margin * 2);
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.opacity = Math.random() * 0.3 + 0.7;
    }

    checkCollision(other: Particle): boolean {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.size + other.size;
        return distance <= minDistance;
    }

    resolveCollision(other: Particle): void {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.size + other.size;

        // If there's any overlap, separate the particles immediately
        if (distance < minDistance) {
            const overlap = minDistance - distance;
            const angle = Math.atan2(dy, dx);

            // Move particles apart along their center line
            const moveX = overlap * Math.cos(angle) / 2;
            const moveY = overlap * Math.sin(angle) / 2;

            // Immediately separate the particles
            this.x -= moveX;
            this.y -= moveY;
            other.x += moveX;
            other.y += moveY;
        }

        // Calculate normalized collision normal
        const normalX = dx / distance;
        const normalY = dy / distance;

        // Calculate relative velocity
        const relativeVelocityX = other.speedX - this.speedX;
        const relativeVelocityY = other.speedY - this.speedY;

        // Calculate relative velocity along the normal
        const velocityAlongNormal = (relativeVelocityX * normalX) + (relativeVelocityY * normalY);

        // Don't resolve if objects are moving apart
        if (velocityAlongNormal > 0) return;

        // More elastic bounce for livelier interaction
        const bounce = 0.85;

        // Calculate impulse
        const impulse = -(1 + bounce) * velocityAlongNormal;
        const impulsex = impulse * normalX;
        const impulsey = impulse * normalY;

        // Update velocities
        this.speedX -= impulsex;
        this.speedY -= impulsey;
        other.speedX += impulsex;
        other.speedY += impulsey;

        // Adjust opacity on collision
        const opacityChange = 0.1;
        this.opacity = Math.max(0.1, Math.min(0.6, this.opacity + (Math.random() - 0.5) * opacityChange));
        other.opacity = Math.max(0.1, Math.min(0.6, other.opacity + (Math.random() - 0.5) * opacityChange));
    }

    update(timeScale: number = 1): void {
        const nextX = this.x + (this.speedX * timeScale);
        const nextY = this.y + (this.speedY * timeScale);

        const scale = window.devicePixelRatio || 1;
        const margin = this.size * 2;

        if (nextX >= margin && nextX <= this.canvas.width / scale - margin) {
            this.x = nextX;
        } else {
            this.speedX *= -0.9;
            this.x = this.x + (this.speedX * timeScale);
        }

        if (nextY >= margin && nextY <= this.canvas.height / scale - margin) {
            this.y = nextY;
        } else {
            this.speedY *= -0.9;
            this.y = this.y + (this.speedY * timeScale);
        }

        this.speedX *= Math.pow(0.995, timeScale);
        this.speedY *= Math.pow(0.995, timeScale);

        const minSpeed = 0.1;
        if (Math.abs(this.speedX) < minSpeed) this.speedX = Math.sign(this.speedX || 1) * minSpeed;
        if (Math.abs(this.speedY) < minSpeed) this.speedY = Math.sign(this.speedY || 1) * minSpeed;

        this.opacity += (Math.random() - 0.5) * 0.01 * timeScale;
        this.opacity = Math.max(0.7, Math.min(1.0, this.opacity));
    }

    draw(ctx: CanvasRenderingContext2D, glow: boolean): void {
        ctx.save();

        if (glow) {
            // Largest outer glow
            ctx.globalAlpha = this.opacity * 0.5;
            ctx.shadowBlur = this.size * 15;
            ctx.shadowColor = this.color;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
            ctx.fill();

            // Large outer glow
            ctx.globalAlpha = this.opacity * 0.7;
            ctx.shadowBlur = this.size * 8;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
            ctx.fill();

            // Middle glow
            ctx.globalAlpha = this.opacity * 0.8;
            ctx.shadowBlur = this.size * 4;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = this.size * 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 0.2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}
