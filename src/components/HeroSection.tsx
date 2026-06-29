"use client";

import {useRef, useState, useEffect, useCallback} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Button from "@/components/Button";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";

// ─── Motion easing ───────────────────────────────────────────
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

const TRUST_BADGES = [
  "Certified Vehicles",
  "Nationwide Delivery",
  "Trusted Financing",
];

// ─── Carousel images ──────────────────────────────────────────
const CAROUSEL_IMAGES = [
  "https://res.cloudinary.com/dnadawobi/image/upload/v1782517744/%D0%A4%D0%BE%D1%82%D0%BE_BMW_M5_F90_hukdsx.jpg",
  "https://res.cloudinary.com/dnadawobi/image/upload/v1782517718/HD_wallpaper__2014_au_spec_autobiography_awd_luxury_range_rover_sport_ei4ghs.jpg",
  "https://res.cloudinary.com/dnadawobi/image/upload/v1782517766/The_Audi_R8__A_Blend_of_Luxury_and_Performance___2025_Audi_R8___Audi_R8_Review_tiv36v.jpg",
  "https://res.cloudinary.com/dnadawobi/image/upload/v1782517838/248753579413903251_sc8dal.jpg",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  // ── Scroll parallax ──────────────────────────────────────────
  const {scrollY} = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollY, [0, 700], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const contentSpring = useSpring(contentOpacity, {stiffness: 80, damping: 20});

  // ── Carousel state ────────────────────────────────────────────
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % CAROUSEL_IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (p) => (p - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length,
    );
  }, []);

  // Auto‑advance every 5 seconds
  useEffect(() => {
    if (reduced) return; // no auto‑play for reduced motion preference
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, reduced]);

  // ── Slide variants ────────────────────────────────────────────
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: {type: "spring", stiffness: 300, damping: 30},
        opacity: {duration: 0.4},
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: {type: "spring", stiffness: 300, damping: 30},
        opacity: {duration: 0.4},
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
      style={{height: "92vh", minHeight: 640}}
      aria-label="Autocar – Buy and sell vehicles"
    >
      {/* ── Background carousel ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={reduced ? {} : {y: imgY}}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={current}
              src={CAROUSEL_IMAGES[current]}
              alt={`Slide ${current + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority={current === 0 ? "high" : "auto"}
              style={{willChange: "transform"}}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Cinematic overlay ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.52) 48%, rgba(0,0,0,0.12) 100%)",
        }}
        aria-hidden
      />
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
        className="absolute inset-x-0 z-20 flex items-center"
        style={{
          top: "72px",
          bottom: 0,
          opacity: reduced ? 1 : contentSpring,
        }}
      >
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
            {/* Left: text block */}
            <div className="flex-1 max-w-[560px]">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <motion.p
                  variants={fadeUp}
                  className="text-[11px] tracking-[0.3em] uppercase text-[#BCBEC0]/60 mb-6 font-medium"
                >
                  Premium Automotive Marketplace
                </motion.p>

                <div className="overflow-hidden mb-4">
                  <motion.h1
                    variants={clipReveal}
                    className="text-[clamp(2.4rem,5.5vw,5.5rem)] font-bold text-white leading-[1.05] tracking-[-0.02em]"
                  >
                    The Easiest Way To Buy And Sell Vehicles
                  </motion.h1>
                </div>

                <motion.p
                  variants={fadeUp}
                  className="text-base md:text-lg text-[#BCBEC0]/80 leading-relaxed mb-8 max-w-[440px]"
                >
                  Find the right price and dealer.
                </motion.p>

                <motion.div variants={fadeUp} className="mb-10">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-black text-white border-0 rounded-none px-10 py-4 text-base font-medium hover:bg-gray-900 transition"
                  >
                    Learn More <span className="ml-2">→</span>
                  </Button>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap gap-x-8 gap-y-2"
                >
                  {TRUST_BADGES.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5 text-[12px] tracking-[0.08em] text-[#BCBEC0]/50"
                    >
                      <span className="text-[#BCBEC0]/30">✓</span>
                      {item}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Carousel controls ── */}
      <div className="absolute inset-y-0 left-0 z-30 flex items-center px-4">
        <button
          onClick={goPrev}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:border-white/50 hover:text-white/70 transition pointer-events-auto"
          aria-label="Previous slide"
        >
          ‹
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 z-30 flex items-center px-4">
        <button
          onClick={goNext}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:border-white/50 hover:text-white/70 transition pointer-events-auto"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
