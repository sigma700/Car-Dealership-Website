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

// ─── SLIDING BUTTONS ─────────────────────────────────────────────

function SlidingWhiteButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-8 py-3 text-base md:text-lg font-medium tracking-wide overflow-hidden rounded-lg group"
      style={{backgroundColor: "#FFFFFF"}}
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      {/* Sliding overlay – dark slides up from bottom */}
      <motion.span
        className="absolute inset-0 bg-black"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      {/* Text */}
      <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      {/* Arrow */}
      <motion.span
        className="relative z-10 ml-2 text-black group-hover:text-white transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function SlidingOutlineButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-8 py-3 text-base md:text-lg font-medium tracking-wide overflow-hidden rounded-lg group border border-white"
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      {/* Sliding overlay – white slides up from bottom */}
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      {/* Text */}
      <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
        {children}
      </span>
      {/* Arrow */}
      <motion.span
        className="relative z-10 ml-2 text-white group-hover:text-black transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

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
            "radial-gradient(ellipse at 50% 60%, transparent 30%, rgba(0,0,0,0.55) 100%)",
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
                className="absolute inset-0 bg-[#BCBEC0] origin-left"
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
      className="absolute bottom-0 left-0 h-px bg-[#BCBEC0]/60 origin-left z-10"
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
      <span className="text-[#BCBEC0] font-mono text-xl md:text-2xl leading-none">
        {value}
      </span>
      <span className="text-[#BCBEC0]/60 text-sm">{label}</span>
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
        className="absolute inset-0 bg-gradient-to-br from-black via-black/40 to-black -z-10"
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
            <span className="inline-block text-xs md:text-sm tracking-widest text-[#BCBEC0] bg-black/80 backdrop-blur px-3 py-1 w-fit uppercase">
              UAE'S PREMIER LUXURY DESTINATION
            </span>
          </motion.div>

          {/* H1 */}
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-display text-white leading-[0.9] tracking-tight"
            >
              Al Husnain
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-2xl text-[#BCBEC0] mt-4 max-w-xl leading-snug"
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

          {/* CTAs – sliding vertical animation buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <SlidingWhiteButton href="/inventory">
              Browse Inventory
            </SlidingWhiteButton>
            <SlidingOutlineButton href="/contact">
              Book a Test Drive
            </SlidingOutlineButton>
            <SlidingOutlineButton href="/sell">
              Value Your Trade
            </SlidingOutlineButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-[#BCBEC0]/70 text-xs tracking-widest gap-1.5"
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
          className="w-px bg-[#BCBEC0]/40"
          animate={{height: ["16px", "32px", "16px"]}}
          transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
        />
      </motion.div>
    </section>
  );
}
