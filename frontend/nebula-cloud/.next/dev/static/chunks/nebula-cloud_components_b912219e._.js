(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/nebula-cloud/components/CloudScroll.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CloudScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const FRAME_COUNT = 23;
const START_FRAME = 1;
const getFramePath = (index)=>{
    const frameNumber = (index + START_FRAME).toString().padStart(3, '0');
    return `/aiFrames/ezgif-frame-${frameNumber}.jpg`;
};
function CloudScroll() {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Map scroll progress
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        offset: [
            'start start',
            'end end'
        ]
    });
    const currentIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        0,
        FRAME_COUNT - 1
    ]);
    // Preload all images
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CloudScroll.useEffect": ()=>{
            let loadCount = 0;
            const images = [];
            for(let i = 0; i < FRAME_COUNT; i++){
                const img = new Image();
                img.src = getFramePath(i);
                img.onload = ({
                    "CloudScroll.useEffect": ()=>{
                        loadCount++;
                        if (loadCount === FRAME_COUNT) {
                            imagesRef.current = images;
                            setIsLoaded(true);
                        }
                    }
                })["CloudScroll.useEffect"];
                img.onerror = ({
                    "CloudScroll.useEffect": ()=>{
                        loadCount++;
                        if (loadCount === FRAME_COUNT) {
                            imagesRef.current = images;
                            setIsLoaded(true);
                        }
                    }
                })["CloudScroll.useEffect"];
                images.push(img);
            }
        }
    }["CloudScroll.useEffect"], []);
    const render = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CloudScroll.useCallback[render]": (index)=>{
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
        }
    }["CloudScroll.useCallback[render]"], [
        isLoaded
    ]);
    // Listen to scroll and render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(currentIndex, "change", {
        "CloudScroll.useMotionValueEvent": (latest)=>{
            render(latest);
        }
    }["CloudScroll.useMotionValueEvent"]);
    // Handle window resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CloudScroll.useEffect": ()=>{
            const handleResize = {
                "CloudScroll.useEffect.handleResize": ()=>{
                    render(currentIndex.get());
                }
            }["CloudScroll.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "CloudScroll.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["CloudScroll.useEffect"];
        }
    }["CloudScroll.useEffect"], [
        render,
        currentIndex
    ]);
    // Initial render when loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CloudScroll.useEffect": ()=>{
            if (isLoaded) {
                render(0);
            }
        }
    }["CloudScroll.useEffect"], [
        isLoaded,
        render
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "h-[400vh] relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-0 bg-[#0b1f24] pointer-events-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "w-full h-full block"
            }, void 0, false, {
                fileName: "[project]/nebula-cloud/components/CloudScroll.tsx",
                lineNumber: 120,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/nebula-cloud/components/CloudScroll.tsx",
            lineNumber: 119,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/nebula-cloud/components/CloudScroll.tsx",
        lineNumber: 118,
        columnNumber: 9
    }, this);
}
_s(CloudScroll, "ScZDxYG//Glo0PqpYttHhz2JIuI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"]
    ];
});
_c = CloudScroll;
var _c;
__turbopack_context__.k.register(_c, "CloudScroll");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/nebula-cloud/components/ScrollContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nebula-cloud/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ScrollContent() {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showChat, setShowChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Track window scroll primarily, or container if we want local.
    // Since the layout relies on the body scrolling 400vh, we use window scroll.
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        offset: [
            'start start',
            'end end'
        ]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(scrollYProgress, "change", {
        "ScrollContent.useMotionValueEvent": (latest)=>{
            if (latest > 0.9 && !showChat) {
                setShowChat(true);
            }
        }
    }["ScrollContent.useMotionValueEvent"]);
    // Opacity Transforms
    // 0% - Hero: Visible 0-10%, fades out by 20%
    const heroOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.1,
        0.2
    ], [
        1,
        1,
        0
    ]);
    const heroY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.2
    ], [
        0,
        -50
    ]);
    const heroPointerEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, {
        "ScrollContent.useTransform[heroPointerEvents]": (v)=>v < 0.2 ? 'auto' : 'none'
    }["ScrollContent.useTransform[heroPointerEvents]"]);
    // 30% - Left Text: Fades in 20-30%, stays, fades out 40-50%
    const section1Opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.2,
        0.3,
        0.4,
        0.5
    ], [
        0,
        1,
        1,
        0
    ]);
    const section1Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.2,
        0.3,
        0.4,
        0.5
    ], [
        50,
        0,
        0,
        -50
    ]);
    // 60% - Right Text: Fades in 50-60%, stays, fades out 70-80%
    const section2Opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.5,
        0.6,
        0.7,
        0.8
    ], [
        0,
        1,
        1,
        0
    ]);
    const section2Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.5,
        0.6,
        0.7,
        0.8
    ], [
        50,
        0,
        0,
        -50
    ]);
    // 90% - CTA: Fades in starting at 85%, fully visible by 95% (approx 2nd last frame of 23 frames)
    // 23 frames. Frame 21 is ~91%. Frame 22 is ~95%.
    const ctaOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.85,
        0.95
    ], [
        0,
        1
    ]);
    const ctaY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.85,
        0.95
    ], [
        50,
        0
    ]);
    const ctaPointerEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, {
        "ScrollContent.useTransform[ctaPointerEvents]": (v)=>v > 0.9 ? 'auto' : 'none'
    }["ScrollContent.useTransform[ctaPointerEvents]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "absolute inset-0 z-10 pointer-events-none h-[400vh]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                style: {
                    opacity: heroOpacity,
                    y: heroY,
                    pointerEvents: heroPointerEvents
                },
                className: "fixed top-0 left-0 w-full h-screen flex flex-col items-start justify-start p-6 md:p-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-left",
                        children: "Nebula Cloud"
                    }, void 0, false, {
                        fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                        lineNumber: 50,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl md:text-3xl text-white/70 font-light text-left pl-2",
                        children: "A minimal digital infrastructure."
                    }, void 0, false, {
                        fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                style: {
                    opacity: section1Opacity,
                    y: section1Y
                },
                className: "fixed top-0 left-0 w-full h-screen flex items-center px-10 md:px-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-white",
                        children: "Modular Architecture"
                    }, void 0, false, {
                        fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                        lineNumber: 60,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                    lineNumber: 59,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                style: {
                    opacity: section2Opacity,
                    y: section2Y
                },
                className: "fixed top-0 right-0 w-full h-screen flex items-center justify-end px-10 md:px-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-xl text-right",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-white",
                        children: "Connected Databases"
                    }, void 0, false, {
                        fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                        lineNumber: 70,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                    lineNumber: 69,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                href: "http://localhost:3001",
                target: "_blank",
                rel: "noopener noreferrer",
                initial: {
                    opacity: 0,
                    scale: 0.8,
                    x: "-50%"
                },
                animate: {
                    opacity: showChat ? 1 : 0,
                    scale: showChat ? 1 : 0.8,
                    x: "-50%",
                    pointerEvents: showChat ? 'auto' : 'none'
                },
                whileHover: {
                    scale: 1.1
                },
                transition: {
                    duration: 0.5
                },
                className: "fixed bottom-8 left-1/2 z-[9999] flex items-center gap-3 px-8 py-4 bg-white rounded-full text-[#0b1f24] font-bold text-lg group shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold",
                        children: "Chat"
                    }, void 0, false, {
                        fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        className: "group-hover:translate-x-1 transition-transform",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                        }, void 0, false, {
                            fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                        lineNumber: 92,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/nebula-cloud/components/ScrollContent.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, this);
}
_s(ScrollContent, "Ond9ZN5JsrwaLfY++jGOFpS2hrg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$nebula$2d$cloud$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = ScrollContent;
var _c;
__turbopack_context__.k.register(_c, "ScrollContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=nebula-cloud_components_b912219e._.js.map