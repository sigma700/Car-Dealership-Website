"use client";

import {useRef} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import Button from "@/components/Button";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";

const EXPO = [0.19, 1, 0.22, 1] as const;
const OUT = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: {transition: {staggerChildren: 0.12, delayChildren: 0.25}},
};

const clipReveal = {
  hidden: {clipPath: "inset(0 100% 0 0)", opacity: 0},
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {duration: 1.1, ease: EXPO},
  },
};

const fadeUp = {
  hidden: {y: 24, opacity: 0},
  visible: {y: 0, opacity: 1, transition: {duration: 0.85, ease: OUT}},
};

const TRUST_ITEMS = [
  {value: "15+", label: "Years of Excellence"},
  {value: "10,000+", label: "Satisfied Clients"},
];

const TRUST_BADGES = [
  "Certified Vehicles",
  "Nationwide Delivery",
  "Trusted Financing",
];

const INDICATORS = [
  "15+ Years Experience",
  "Certified Vehicles",
  "Nationwide Delivery",
];

// Gentle perpetual float for the trust card
function useFloat(amplitude = 6, period = 4000) {
  const y = useMotionValue(0);
  const reduced = usePrefersReducedMotion();
  useAnimationFrame((t) => {
    if (reduced) return;
    y.set(Math.sin((t / period) * Math.PI * 2) * amplitude);
  });
  return y;
}

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const {scrollY} = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollY, [0, 700], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const contentSpring = useSpring(contentOpacity, {stiffness: 80, damping: 20});

  const cardFloat = useFloat(5, 4200);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
      style={{height: "92vh", minHeight: 640}}
      aria-label="About Al Husnain Motors"
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={reduced ? {} : {y: imgY}}
        >
          <img
            src="https://res.cloudinary.com/dnadawobi/image/upload/v1782261216/pexels-introspectivedsgn-5864155_czizzw.jpg"
            alt=""
            className="w-full h-full object-cover object-[40%_50%]"
            fetchPriority="high"
            style={{willChange: "transform"}}
          />
        </motion.div>
      </div>

      {/* ── Cinematic overlay — softer than before, preserves image detail ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.52) 48%, rgba(0,0,0,0.12) 100%)",
        }}
        aria-hidden
      />
      {/* Bottom edge fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: 100,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* ── Main content ── */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center"
        style={reduced ? {} : {opacity: contentSpring}}
      >
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
            {/* Left: editorial text block */}
            <div className="flex-1 max-w-[520px]">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                {/* Eyebrow */}
                <motion.p
                  variants={fadeUp}
                  className="text-[10px] tracking-[0.28em] uppercase text-[#BCBEC0]/60 mb-8 font-medium"
                >
                  Since 2009 · Dubai, UAE
                </motion.p>

                {/* Single H1 with two typographic weights */}
                <h1 className="mb-10 leading-none tracking-tight">
                  <div className="overflow-hidden mb-1">
                    <motion.span
                      variants={clipReveal}
                      className="block text-[clamp(2rem,4.5vw,4rem)] font-display font-light text-white/70 tracking-[0.04em]"
                      style={{letterSpacing: "0.05em"}}
                    >
                      Built on
                    </motion.span>
                  </div>
                  <div className="overflow-hidden">
                    <motion.span
                      variants={clipReveal}
                      className="block text-[clamp(3.2rem,7.5vw,7rem)] font-display font-bold text-white leading-[0.88] tracking-[-0.02em]"
                    >
                      INTEGRITY.
                    </motion.span>
                  </div>
                </h1>

                {/* Supporting paragraph */}
                <motion.p
                  variants={fadeUp}
                  className="text-sm md:text-[15px] text-[#BCBEC0]/70 leading-[1.75] mb-10 max-w-[460px]"
                >
                  For fifteen years, Al Husnain Motors has set the standard for
                  pre-owned luxury in the UAE. Every vehicle we present is
                  hand-selected, rigorously inspected, and sold with complete
                  transparency — because our reputation is the only guarantee
                  that matters.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row gap-3 mb-8"
                >
                  <Button variant="secondary" size="lg">
                    Our Story
                  </Button>
                  <Button variant="outline" size="lg">
                    Meet the Team
                  </Button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap gap-x-6 gap-y-2"
                >
                  {INDICATORS.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5 text-[11px] tracking-[0.1em] text-[#BCBEC0]/45"
                    >
                      <span className="text-[#BCBEC0]/35">✓</span>
                      {item}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right: floating trust card */}
            <motion.div
              className="flex-shrink-0 self-center lg:self-auto"
              initial={{opacity: 0, x: 20}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: 0.9, duration: 1.0, ease: OUT}}
              style={reduced ? {} : {y: cardFloat}}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 16,
                  boxShadow:
                    "0 24px 48px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.06) inset",
                  minWidth: 220,
                  maxWidth: 260,
                }}
              >
                {/* Stats */}
                {TRUST_ITEMS.map(({value, label}, i) => (
                  <div
                    key={label}
                    className="px-7 py-5"
                    style={
                      i < TRUST_ITEMS.length - 1
                        ? {borderBottom: "1px solid rgba(255,255,255,0.07)"}
                        : {}
                    }
                  >
                    <p className="font-display font-semibold text-white text-3xl leading-none mb-1 tracking-tight">
                      {value}
                    </p>
                    <p className="text-[11px] text-[#BCBEC0]/50 tracking-[0.12em] uppercase">
                      {label}
                    </p>
                  </div>
                ))}

                {/* Divider */}
                <div
                  className="mx-7"
                  style={{height: 1, background: "rgba(255,255,255,0.07)"}}
                />

                {/* Badge list */}
                <div className="px-7 py-5 flex flex-col gap-2.5">
                  {TRUST_BADGES.map((badge) => (
                    <p
                      key={badge}
                      className="flex items-center gap-2.5 text-[12px] text-[#BCBEC0]/60 tracking-wide"
                    >
                      <span className="text-[#BCBEC0]/35 text-[10px]">✓</span>
                      {badge}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
