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

// ─── Hero background images ──────────────────────────────────
const HERO_IMAGES = [
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

  // ── Crossfade state ──────────────────────────────────────────
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (reduced) return; // no animation for reduced motion
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % HERO_IMAGES.length);
    }, 6000); // longer display time for a more relaxed feel
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
      style={{height: "92vh", minHeight: 640}}
      aria-label="Al Husnain Motors – Premium automotive experience"
    >
      {/* ── Background crossfade ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={reduced ? {} : {y: imgY}}
        >
          <AnimatePresence>
            <motion.img
              key={current}
              src={HERO_IMAGES[current]}
              alt={`Slide ${current + 1}`}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 1.8, ease: "easeInOut"}}
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority={current === 0 ? "high" : "auto"}
              style={{willChange: "opacity"}}
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
                    The only place you need for your next car
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

      {/* No carousel controls – only subtle crossfade */}
    </section>
  );
}
