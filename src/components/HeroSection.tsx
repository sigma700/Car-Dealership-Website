"use client";
import {useState, useEffect, useRef, useCallback} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";

// ─── EASING CONSTANTS ────────────────────────────────────────────
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_IN_OUT = [0.87, 0, 0.13, 1] as const;

// ─── CAROUSEL ────────────────────────────────────────────────────
interface HeroCarouselProps {
  images: string[];
  scrollY: ReturnType<typeof useMotionValue<number>>;
}

function HeroCarousel({images, scrollY}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  const imgY = useTransform(scrollY, [0, 600], ["0%", "22%"]);
  const imgScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  const advance = useCallback(() => {
    setIndex((p) => (p + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (prefersReduced || isPaused) return;
    timerRef.current = setInterval(advance, 5500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance, isPaused, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className="absolute inset-0 -z-10">
        <img
          src={images[0]}
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{opacity: 0, scale: 1.06}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.98}}
          transition={{
            opacity: {duration: 1.4, ease: EASE_IN_OUT},
            scale: {duration: 1.8, ease: EASE_OUT},
          }}
          style={{y: imgY, scale: imgScale}}
        >
          <img
            src={images[index]}
            alt=""
            className="w-full h-full object-cover"
            fetchPriority={index === 0 ? "high" : "auto"}
            style={{willChange: "transform"}}
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, transparent 30%, rgba(10,10,11,0.55) 100%)",
        }}
      />

      <ProgressBar
        key={index}
        duration={5500}
        paused={isPaused}
        reduced={prefersReduced}
      />

      <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative w-6 h-px bg-white/20 overflow-hidden"
          >
            {i === index && (
              <motion.span
                className="absolute inset-0 bg-[#B8955A] origin-left"
                initial={{scaleX: 0}}
                animate={{scaleX: 1}}
                transition={{duration: 5.5, ease: "linear"}}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({
  duration,
  paused,
  reduced,
}: {
  duration: number;
  paused: boolean;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-px bg-[#B8955A]/60 origin-left z-10"
      initial={{scaleX: 0}}
      animate={{scaleX: paused ? undefined : 1}}
      transition={{duration: duration / 1000, ease: "linear"}}
    />
  );
}

// ─── CONTENT VARIANTS ─────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {staggerChildren: 0.1, delayChildren: 0.3},
  },
};

const lineVariants = {
  hidden: {y: "110%", opacity: 0},
  visible: {
    y: "0%",
    opacity: 1,
    transition: {duration: 0.9, ease: EASE_OUT_EXPO},
  },
};

const fadeUp = {
  hidden: {y: 28, opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
    transition: {duration: 0.75, ease: EASE_OUT},
  },
};

// ─── STAT ITEM ────────────────────────────────────────────────────
function StatItem({value, label}: {value: string; label: string}) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-0.5">
      <span className="text-[#B8955A] font-mono text-xl md:text-2xl leading-none">
        {value}
      </span>
      <span className="text-[#C8CAD0]/60 text-sm">{label}</span>
    </motion.div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────
const dealershipImages = [
  "https://res.cloudinary.com/dnadawobi/image/upload/v1782256076/pexels-introspectivedsgn-5864164_s1ocof.jpg",
  "https://res.cloudinary.com/dnadawobi/image/upload/v1782256105/igor-constantino-Ba4Ym_aC01c-unsplash_vmcgig.jpg",
  "https://res.cloudinary.com/dnadawobi/image/upload/v1782256105/igor-constantino-Ba4Ym_aC01c-unsplash_vmcgig.jpg",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const {scrollY} = useScroll();

  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 340], [1, 0]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.55, 0.82]);

  const springContentY = useSpring(contentY, {stiffness: 80, damping: 20});

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <HeroCarousel images={dealershipImages} scrollY={scrollY} />

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B] via-[#0A0A0B]/40 to-[#0A0A0B] -z-10"
        style={prefersReduced ? {} : {opacity: overlayOpacity}}
      />

      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-16"
        style={
          prefersReduced ? {} : {y: springContentY, opacity: contentOpacity}
        }
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="overflow-hidden mb-4">
            <span className="inline-block text-xs md:text-sm tracking-widest text-[#B8955A] bg-[#1C1C21]/80 backdrop-blur px-3 py-1 w-fit uppercase">
              UAE'S PREMIER LUXURY DESTINATION
            </span>
          </motion.div>

          {/* H1 */}
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-display text-[#F0F1F3] leading-[0.9] tracking-tight"
            >
              Al Husnain
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-2xl text-[#E8E9EC] mt-4 max-w-xl leading-snug"
          >
            Curated pre‑owned vehicles. Transparent pricing. Concierge delivery.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-x-10 gap-y-4 mt-8 text-sm md:text-base"
          >
            <StatItem value="120+" label="Vehicles in stock" />
            <StatItem value="48h" label="Test drive delivery" />
            <StatItem value="5yr" label="Warranty included" />
          </motion.div>

          {/* CTAs – standard btn-slide links, no magnetic effect */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/inventory"
              className="btn-slide btn-slide-gold px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
            >
              <span>Browse Inventory</span>
            </a>
            <a
              href="/contact"
              className="btn-slide btn-slide-black px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
            >
              <span>Book a Test Drive</span>
            </a>
            <a
              href="/sell"
              className="btn-slide btn-slide-black px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
            >
              <span>Value Your Trade</span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-[#C8CAD0]/70 text-xs tracking-widest gap-1.5"
        initial={{opacity: 0, y: 12}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 1.4, duration: 0.7, ease: EASE_OUT}}
        style={
          prefersReduced
            ? {}
            : {opacity: useTransform(scrollY, [0, 200], [1, 0])}
        }
      >
        <span>EXPLORE</span>
        <motion.div
          className="w-px bg-[#C8CAD0]/40"
          animate={{height: ["16px", "32px", "16px"]}}
          transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
        />
      </motion.div>
    </section>
  );
}
