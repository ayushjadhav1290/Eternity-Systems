'use client';

import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ScrollContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showChat, setShowChat] = useState(false);

    // Track window scroll primarily, or container if we want local.
    // Since the layout relies on the body scrolling 400vh, we use window scroll.
    const { scrollYProgress } = useScroll({
        offset: ['start start', 'end end']
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.9 && !showChat) {
            setShowChat(true);
        }
    });

    // Opacity Transforms
    // 0% - Hero: Visible 0-10%, fades out by 20%
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const heroPointerEvents = useTransform(scrollYProgress, (v) => v < 0.2 ? 'auto' : 'none');

    // 30% - Left Text: Fades in 20-30%, stays, fades out 40-50%
    const section1Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const section1Y = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [50, 0, 0, -50]);

    // 60% - Right Text: Fades in 50-60%, stays, fades out 70-80%
    const section2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const section2Y = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [50, 0, 0, -50]);

    // 90% - CTA: Fades in starting at 85%, fully visible by 95% (approx 2nd last frame of 23 frames)
    // 23 frames. Frame 21 is ~91%. Frame 22 is ~95%.
    const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const ctaY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);
    const ctaPointerEvents = useTransform(scrollYProgress, (v) => v > 0.9 ? 'auto' : 'none');

    return (
        <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none h-[400vh]">

            {/* Hero Section */}
            <motion.div
                style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointerEvents }}
                className="fixed top-0 left-0 w-full h-screen flex flex-col items-start justify-start p-6 md:p-12"
            >
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-left">Nebula Cloud</h1>
                <p className="text-2xl md:text-3xl text-white/70 font-light text-left pl-2">A minimal digital infrastructure.</p>
            </motion.div>

            {/* Section 1 */}
            <motion.div
                style={{ opacity: section1Opacity, y: section1Y }}
                className="fixed top-0 left-0 w-full h-screen flex items-center px-10 md:px-24"
            >
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-white">Modular Architecture</h2>
                </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: section2Opacity, y: section2Y }}
                className="fixed top-0 right-0 w-full h-screen flex items-center justify-end px-10 md:px-24"
            >
                <div className="max-w-xl text-right">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-white">Connected Databases</h2>
                </div>
            </motion.div>


            {/* Persistent Floating Chat Button */}
            <motion.a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, x: "-50%" }}
                animate={{
                    opacity: showChat ? 1 : 0,
                    scale: showChat ? 1 : 0.8,
                    x: "-50%",
                    pointerEvents: showChat ? 'auto' : 'none'
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="fixed bottom-8 left-1/2 z-[9999] flex items-center gap-3 px-8 py-4 bg-white rounded-full text-[#0b1f24] font-bold text-lg group shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
                <span className="font-bold">Chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </motion.a>

        </div>
    );
}
