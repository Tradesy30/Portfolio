"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

// Debounce function with proper TypeScript types
function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

const ICONS = [
    "/icons/nextjs.svg",
    "/icons/nodejs.svg",
    "/icons/react.svg",
    "/icons/tailwind.svg",
    "/icons/typescript.svg",
    "/icons/framer-motion.svg",
    "/icons/git.svg",
    "/icons/javascript.svg",
    "/icons/mongodb.svg"
];

interface FloatingIcon {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    iconIndex: number;
    opacity: number;
    image: HTMLImageElement;
}

interface FloatingIconsProps {
    className?: string;
}

const ICON_SIZE = 30; // Smaller icons (was 40)
const BOX_PADDING = 10; // Slightly reduced padding to match smaller size (was 12)
const MOVEMENT_SPEED = 1.5; // Increased from 0.75 for faster movement
const ROTATION_SPEED = 0.003;
const BOX_SIZE = ICON_SIZE + (BOX_PADDING * 2);
const MAX_SPEED = 1.6; // Increased from 0.8 to match new movement speed
const DAMPING = 0.98; // Damping factor to gradually reduce speed

const clampSpeed = (speed: number): number => {
    return Math.max(-MAX_SPEED, Math.min(MAX_SPEED, speed));
};

const checkCollision = (icon1: FloatingIcon, icon2: FloatingIcon): boolean => {
    const dx = icon1.x - icon2.x;
    const dy = icon1.y - icon2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Check if they're exactly touching or overlapping
    return distance <= BOX_SIZE;
};

const resolveCollision = (icon1: FloatingIcon, icon2: FloatingIcon): void => {
    // Calculate the distance and direction between icons
    const dx = icon2.x - icon1.x;
    const dy = icon2.y - icon1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If there's any overlap, separate the icons immediately
    if (distance < BOX_SIZE) {
        const overlap = BOX_SIZE - distance;
        const angle = Math.atan2(dy, dx);

        // Move icons apart along their center line
        const moveX = overlap * Math.cos(angle) / 2;
        const moveY = overlap * Math.sin(angle) / 2;

        // Immediately separate the icons
        icon1.x -= moveX;
        icon1.y -= moveY;
        icon2.x += moveX;
        icon2.y += moveY;
    }

    // Calculate normalized collision normal
    const normalX = dx / distance;
    const normalY = dy / distance;

    // Calculate relative velocity
    const relativeVelocityX = icon2.speedX - icon1.speedX;
    const relativeVelocityY = icon2.speedY - icon1.speedY;

    // Calculate relative velocity along the normal
    const velocityAlongNormal = (relativeVelocityX * normalX) + (relativeVelocityY * normalY);

    // Don't resolve if objects are moving apart
    if (velocityAlongNormal > 0) return;

    // More elastic bounce for livelier interaction
    const bounce = 0.85;

    // Calculate impulse
    const impulse = -(1 + bounce) * velocityAlongNormal;

    // Apply impulse with reduced damping for more responsive bounces
    const impulsex = impulse * normalX;
    const impulsey = impulse * normalY;

    // Update velocities with minimal damping
    icon1.speedX = clampSpeed(icon1.speedX - impulsex);
    icon1.speedY = clampSpeed(icon1.speedY - impulsey);
    icon2.speedX = clampSpeed(icon2.speedX + impulsex);
    icon2.speedY = clampSpeed(icon2.speedY + impulsey);

    // Add a very small rotation on collision
    const rotationImpulse = 0.0005;
    icon1.rotationSpeed += (Math.random() - 0.5) * rotationImpulse;
    icon2.rotationSpeed += (Math.random() - 0.5) * rotationImpulse;
};

export default function FloatingIcons({ className = "h-full w-full" }: FloatingIconsProps): React.ReactElement {
    const { resolvedTheme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const iconsRef = useRef<FloatingIcon[]>([]);
    const animationFrameIdRef = useRef<number | null>(null);
    const loadedImages = useRef<HTMLImageElement[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const createIcon = useCallback((canvas: HTMLCanvasElement, index: number): FloatingIcon => {
        const scale = window.devicePixelRatio || 1;
        const width = canvas.width / scale;
        const height = canvas.height / scale;
        return {
            x: BOX_SIZE + Math.random() * (width - BOX_SIZE * 2),
            y: BOX_SIZE + Math.random() * (height - BOX_SIZE * 2),
            speedX: (Math.random() - 0.5) * MOVEMENT_SPEED,
            speedY: (Math.random() - 0.5) * MOVEMENT_SPEED,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * ROTATION_SPEED,
            iconIndex: index,
            opacity: 0.6,
            image: loadedImages.current[index]
        };
    }, []);

    const initIcons = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
        const scale = window.devicePixelRatio || 1;

        canvas.width = window.innerWidth * scale;
        canvas.height = window.innerHeight * scale;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(scale, scale);

        if (iconsRef.current.length === 0) {
            iconsRef.current = ICONS.map((_, index) => createIcon(canvas, index));
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [createIcon]);

    const drawIcon = useCallback((ctx: CanvasRenderingContext2D, icon: FloatingIcon) => {
        ctx.save();
        ctx.translate(icon.x, icon.y);
        ctx.rotate(icon.rotation);
        ctx.globalAlpha = icon.opacity;

        // Draw the box background with enhanced glow effect
        const boxColor = resolvedTheme === 'dark' ? 'rgba(17, 24, 39, 0.3)' : 'rgba(23, 23, 23, 0.3)';
        const glowColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';

        // Outer box glow
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 20;
        ctx.fillStyle = boxColor;
        ctx.beginPath();
        ctx.roundRect(-BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE, BOX_SIZE, 8);
        ctx.fill();

        // Inner box glow
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(-BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE, BOX_SIZE, 8);
        ctx.fill();

        // Draw the border with glow
        ctx.strokeStyle = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Reset shadow for icon
        ctx.shadowBlur = 0;

        // Draw the icon with glow effect
        // Outer glow
        ctx.shadowColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 15;
        ctx.globalAlpha = icon.opacity * 0.5;
        ctx.drawImage(
            icon.image,
            -ICON_SIZE / 2 - 2,
            -ICON_SIZE / 2 - 2,
            ICON_SIZE + 4,
            ICON_SIZE + 4
        );

        // Middle glow
        ctx.shadowBlur = 8;
        ctx.globalAlpha = icon.opacity * 0.7;
        ctx.drawImage(
            icon.image,
            -ICON_SIZE / 2 - 1,
            -ICON_SIZE / 2 - 1,
            ICON_SIZE + 2,
            ICON_SIZE + 2
        );

        // Main icon
        ctx.shadowBlur = 4;
        ctx.globalAlpha = icon.opacity;
        ctx.drawImage(
            icon.image,
            -ICON_SIZE / 2,
            -ICON_SIZE / 2,
            ICON_SIZE,
            ICON_SIZE
        );

        ctx.restore();
    }, [resolvedTheme]);

    useEffect(() => {
        const loadImages = async () => {
            const images = await Promise.all(ICONS.map(src => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                });
            }));
            loadedImages.current = images;

            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d", {
                alpha: true,
                willReadFrequently: false
            });
            if (!ctx) return;

            initIcons(canvas, ctx);

            let lastTime = performance.now();
            const fps = 60;
            const frameInterval = 1000 / fps;

            const animate = (currentTime: number) => {
                if (!canvas || !ctx) return;

                const deltaTime = currentTime - lastTime;
                if (deltaTime >= frameInterval) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Update positions with deltaTime
                    const timeScale = deltaTime / frameInterval;
                    iconsRef.current.forEach(icon => {
                        const nextX = icon.x + (icon.speedX * timeScale);
                        const nextY = icon.y + (icon.speedY * timeScale);

                        const halfBox = BOX_SIZE / 2;
                        const scale = window.devicePixelRatio || 1;
                        const width = canvas.width / scale;
                        const height = canvas.height / scale;

                        if (nextX >= halfBox && nextX <= width - halfBox) {
                            icon.x = nextX;
                        } else {
                            icon.speedX = clampSpeed(-icon.speedX * 0.9);
                            icon.x = icon.x + (icon.speedX * timeScale);
                        }

                        if (nextY >= halfBox && nextY <= height - halfBox) {
                            icon.y = nextY;
                        } else {
                            icon.speedY = clampSpeed(-icon.speedY * 0.9);
                            icon.y = icon.y + (icon.speedY * timeScale);
                        }

                        icon.rotation += icon.rotationSpeed * timeScale;
                        icon.speedX *= Math.pow(0.995, timeScale);
                        icon.speedY *= Math.pow(0.995, timeScale);
                        icon.rotationSpeed *= Math.pow(0.995, timeScale);

                        // Ensure minimum speed
                        const minSpeed = 0.1;
                        if (Math.abs(icon.speedX) < minSpeed) icon.speedX = Math.sign(icon.speedX || 1) * minSpeed;
                        if (Math.abs(icon.speedY) < minSpeed) icon.speedY = Math.sign(icon.speedY || 1) * minSpeed;
                    });

                    // Check collisions
                    for (let i = 0; i < iconsRef.current.length; i++) {
                        for (let j = i + 1; j < iconsRef.current.length; j++) {
                            if (checkCollision(iconsRef.current[i], iconsRef.current[j])) {
                                resolveCollision(iconsRef.current[i], iconsRef.current[j]);
                            }
                        }
                    }

                    // Draw all icons
                    iconsRef.current.forEach(icon => {
                        drawIcon(ctx, icon);
                    });

                    lastTime = currentTime - (deltaTime % frameInterval);
                }

                animationFrameIdRef.current = requestAnimationFrame(animate);
            };

            animate(performance.now());

            const debouncedResize = debounce(() => {
                const scale = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * scale;
                canvas.height = window.innerHeight * scale;
                canvas.style.width = `${window.innerWidth}px`;
                canvas.style.height = `${window.innerHeight}px`;
                ctx.scale(scale, scale);
            }, 250);

            window.addEventListener('resize', debouncedResize);

            return () => {
                if (animationFrameIdRef.current) {
                    cancelAnimationFrame(animationFrameIdRef.current);
                }
                window.removeEventListener('resize', debouncedResize);
            };
        };

        loadImages();
    }, [initIcons, drawIcon]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    transform: 'translate3d(0,0,0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                    imageRendering: 'auto',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
}