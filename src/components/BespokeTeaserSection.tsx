"use client";

import {useRef} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import Button from "@/components/Button";

// ── Easing ───────────────────────────────────────────────────────────
const EXPO = [0.19, 1, 0.22, 1] as const;
const OUT = [0.16, 1, 0.3, 1] as const;

// ── Images ───────────────────────────────────────────────────────────
const IMAGES = [
  {
    src: "https://res.cloudinary.com/dnadawobi/image/upload/v1782323660/pexels-mikebirdy-18231618_g1ljyu.jpg",
    alt: "Al Husnain Bespoke — commissioned exterior, sculpted in light",
  },
  {
    src: "https://res.cloudinary.com/dnadawobi/image/upload/v1782374774/pexels-entero-37208709_1_gzygzc.jpg",
    alt: "Hand-selected Nappa leather — interior atelier",
  },
  {
    src: "https://res.cloudinary.com/dnadawobi/image/upload/v1782319817/pexels-chris-clark-1933184-5608576_u83gbw.jpg",
    alt: "Bespoke finish under studio light — no two alike",
  },
] as const;

const TOTAL = IMAGES.length;

// ── Helpers ──────────────────────────────────────────────────────────
// Maps global scroll progress [0,1] to a per-image reveal value [0,1]
// Each image occupies an equal share of the scroll range.
// Image i is fully revealed when progress >= (i+1)/TOTAL
function segmentProgress(progress: number, index: number): number {
  const start = index / TOTAL;
  const end = (index + 1) / TOTAL;
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

// ── Left column: static copy ─────────────────────────────────────────
function EditorialCopy({inView}: {inView: boolean}) {
  return (
    <div className="flex flex-col justify-center h-full max-w-[420px]">
      {/* Eyebrow */}
      <motion.p
        className="text-[9px] tracking-[0.42em] uppercase text-[#BCBEC0]/38 font-medium mb-8"
        initial={{opacity: 0, y: 10}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.85, ease: EXPO, delay: 0.1}}
      >
        Bespoke Atelier · By Invitation Only
      </motion.p>

      {/* Headline */}
      <div className="overflow-hidden mb-1">
        <motion.h2
          className="font-display font-bold text-white leading-[0.91] tracking-[-0.03em]"
          style={{fontSize: "clamp(2.6rem,5vw,4.6rem)"}}
          initial={{clipPath: "inset(0 100% 0 0)", opacity: 0}}
          animate={inView ? {clipPath: "inset(0 0% 0 0)", opacity: 1} : {}}
          transition={{duration: 1.1, ease: EXPO, delay: 0.22}}
        >
          Your imagination.
        </motion.h2>
      </div>
      <div className="overflow-hidden mb-9">
        <motion.h2
          className="font-display font-light text-[#BCBEC0]/42 leading-[0.91] tracking-[-0.01em] italic"
          style={{fontSize: "clamp(2.6rem,5vw,4.6rem)"}}
          initial={{clipPath: "inset(0 100% 0 0)", opacity: 0}}
          animate={inView ? {clipPath: "inset(0 0% 0 0)", opacity: 1} : {}}
          transition={{duration: 1.1, ease: EXPO, delay: 0.34}}
        >
          Our craft.
        </motion.h2>
      </div>

      {/* Body */}
      <motion.p
        className="text-[13px] md:text-[14px] text-[#BCBEC0]/45 leading-[1.88] mb-10 max-w-[340px]"
        initial={{opacity: 0, y: 12}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.9, ease: OUT, delay: 0.48}}
      >
        No two Al Husnain Bespoke vehicles are ever alike. Each begins not with
        a catalogue, but with a private dialogue — and ends as the only one of
        its kind in existence.
      </motion.p>

      {/* Rule */}
      <motion.div
        className="w-full h-px bg-white/[0.07] mb-10"
        initial={{scaleX: 0, originX: 0}}
        animate={inView ? {scaleX: 1} : {}}
        transition={{duration: 1.05, ease: EXPO, delay: 0.56}}
        aria-hidden
      />

      {/* CTA */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center gap-5"
        initial={{opacity: 0, y: 10}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.8, ease: OUT, delay: 0.64}}
      >
        <Button variant="secondary" size="lg" href="/bespoke">
          Explore the Atelier
        </Button>
        <span className="text-[9px] tracking-[0.26em] uppercase text-[#BCBEC0]/22 font-medium">
          By Appointment Only
        </span>
      </motion.div>

      {/* Trust marks */}
      <motion.div
        className="flex flex-wrap gap-x-6 gap-y-2 mt-8"
        initial={{opacity: 0}}
        animate={inView ? {opacity: 1} : {}}
        transition={{duration: 0.8, ease: OUT, delay: 0.76}}
      >
        {["Private Consultation", "Worldwide Delivery", "Lifetime Support"].map(
          (item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] text-[#BCBEC0]/20 uppercase"
            >
              <span aria-hidden className="text-[#BCBEC0]/12">
                ✦
              </span>
              {item}
            </span>
          ),
        )}
      </motion.div>
    </div>
  );
}

// ── Right column: scroll-driven image sequence ────────────────────────
function ImageSequence({
  scrollProgress,
  inView,
}: {
  scrollProgress: ReturnType<typeof useSpring>;
  inView: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  // Per-image reveal progress (0 → 1) derived from spring
  const p0 = useTransform(scrollProgress, (v) => segmentProgress(v, 0));
  const p1 = useTransform(scrollProgress, (v) => segmentProgress(v, 1));
  const p2 = useTransform(scrollProgress, (v) => segmentProgress(v, 2));
  const progresses = [p0, p1, p2];

  // Clip-path reveal: right edge sweeps from 100% → 0%
  const clip0 = useTransform(
    p0,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const clip1 = useTransform(
    p1,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const clip2 = useTransform(
    p2,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const clips = [clip0, clip1, clip2];

  // Scale 1.05 → 1.0 during reveal
  const scale0 = useTransform(p0, [0, 1], [1.05, 1.0]);
  const scale1 = useTransform(p1, [0, 1], [1.05, 1.0]);
  const scale2 = useTransform(p2, [0, 1], [1.05, 1.0]);
  const scales = [scale0, scale1, scale2];

  // Active image index (0-based) for progress label
  const activeIndex = useTransform(scrollProgress, (v) => {
    if (v >= 2 / TOTAL) return 2;
    if (v >= 1 / TOTAL) return 1;
    return 0;
  });

  // Format "01 / 03" etc.
  const labelText = useTransform(
    activeIndex,
    (i: number) =>
      `${String(i + 1).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`,
  );

  // Dot opacity: active = full, inactive = dim
  const dotOpacity = (i: number) =>
    useTransform(activeIndex, (active: number) => (active === i ? 1 : 0.22));

  return (
    <motion.div
      className="flex flex-col"
      initial={{opacity: 0, y: 24}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 1.05, ease: EXPO, delay: 0.3}}
    >
      {/* Image frame — fixed aspect, all images identical dimensions */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-[#111] shadow-[0_32px_80px_rgba(0,0,0,0.65)]"
        style={{aspectRatio: "3 / 4"}}
      >
        {/* Base image (always visible) */}
        <img
          src={IMAGES[0].src}
          alt={IMAGES[0].alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />

        {/* Images 1 & 2 — revealed via clip-path sweep */}
        {IMAGES.slice(1).map((img, i) => {
          const idx = i + 1;
          return (
            <motion.div
              key={img.src}
              className="absolute inset-0"
              style={reduced ? {} : {clipPath: clips[idx]}}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                style={reduced ? {} : {scale: scales[idx]}}
              />
            </motion.div>
          );
        })}

        {/* Subtle inner shadow — editorial framing */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
          aria-hidden
        />
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-4 mt-5 px-1">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {IMAGES.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-[#BCBEC0]"
              style={{
                width: 4,
                height: 4,
                opacity: reduced ? (i === 0 ? 1 : 0.22) : dotOpacity(i),
              }}
              aria-hidden
            />
          ))}
        </div>

        {/* Counter */}
        <motion.span
          className="text-[10px] tracking-[0.28em] text-[#BCBEC0]/32 font-medium tabular-nums"
          style={{opacity: reduced ? 1 : undefined}}
        >
          {reduced ? `01 / ${String(TOTAL).padStart(2, "0")}` : labelText}
        </motion.span>

        {/* Thin rule — fills remaining space */}
        <div className="flex-1 h-px bg-white/[0.06]" aria-hidden />
      </div>
    </motion.div>
  );
}

// ── Root export ───────────────────────────────────────────────────────
export default function BespokeTeaserSection() {
  const reduced = usePrefersReducedMotion();

  // Outer wrapper — 300vh scroll distance
  const outerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(outerRef, {once: true, amount: 0.08});

  const {scrollYProgress} = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Clamp to [0, 1] and smooth it
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const springProgress = useSpring(rawProgress, {
    stiffness: reduced ? 999 : 60,
    damping: reduced ? 999 : 20,
  });

  return (
    // Outer scroll container — defines total scroll distance
    <div
      ref={outerRef}
      className="relative w-full bg-[#0a0a0a]"
      style={{height: reduced ? "auto" : "300vh"}}
      aria-label="Bespoke programme teaser"
    >
      {/* Sticky inner — stays in viewport while outer scrolls */}
      <div
        className={
          reduced ? "relative w-full" : "sticky top-0 w-full overflow-hidden"
        }
        style={reduced ? {} : {height: "100svh"}}
      >
        {/* Top + bottom fade vignettes for page blending */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-50"
          style={{
            background: "linear-gradient(to bottom, #0a0a0a, transparent)",
          }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-50"
          style={{background: "linear-gradient(to top, #0a0a0a, transparent)"}}
          aria-hidden
        />

        {/* Two-column layout */}
        <div
          className={`
            relative z-10 w-full h-full
            grid grid-cols-1 lg:grid-cols-2
            gap-12 lg:gap-16 xl:gap-24
            items-center
            px-8 md:px-14 lg:px-20 xl:px-28
            ${reduced ? "py-20 md:py-28" : ""}
          `}
          style={reduced ? {} : {height: "100svh"}}
        >
          {/* LEFT — static copy */}
          <EditorialCopy inView={inView} />

          {/* RIGHT — scroll-driven image sequence */}
          <ImageSequence scrollProgress={springProgress} inView={inView} />
        </div>
      </div>
    </div>
  );
}
