'use client';

import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 23;
const START_FRAME = 1;

const getFramePath = (index: number) => {
    const frameNumber = (index + START_FRAME).toString().padStart(3, '0');
    return `/aiFrames/ezgif-frame-${frameNumber}.jpg`;
};

export default function CloudScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Map scroll progress
    const { scrollYProgress } = useScroll({
        offset: ['start start', 'end end'],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload all images
    useEffect(() => {
        let loadCount = 0;

        const images: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = getFramePath(i);

            img.onload = () => {
                loadCount++;
                if (loadCount === FRAME_COUNT) {
                    imagesRef.current = images;
                    setIsLoaded(true);
                }
            };

            img.onerror = () => {
                loadCount++;
                if (loadCount === FRAME_COUNT) {
                    imagesRef.current = images;
                    setIsLoaded(true);
                }
            };

            images.push(img);
        }
    }, []);

    const render = useCallback((index: number) => {
        if (!isLoaded || !imagesRef.current.length || !canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const safeIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index)));
        const img = imagesRef.current[safeIndex];

        if (!img || !img.complete) return;

        // Set canvas size based on window
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.scale(dpr, dpr);

        // Calculate scaling to fit image to screen
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width - img.width * scale) / 2;
        const y = (height - img.height * scale) / 2;

        ctx.fillStyle = '#0b1f24';
        ctx.fillRect(0, 0, width, height);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [isLoaded]);

    // Listen to scroll and render
    useMotionValueEvent(currentIndex, "change", (latest) => {
        render(latest);
    });

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            render(currentIndex.get());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [render, currentIndex]);

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) {
            render(0);
        }
    }, [isLoaded, render]);

    return (
        <div ref={containerRef} className="h-[400vh] relative">
            <div className="fixed inset-0 z-0 bg-[#0b1f24] pointer-events-none">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                />
            </div>
        </div>
    );
}
