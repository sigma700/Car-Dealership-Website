"use client";

import {useRef, useState, useEffect} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  AnimatePresence,
  MotionValue,
} from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Easings
// ─────────────────────────────────────────────────────────────────────────────
const EXPO = [0.19, 1, 0.22, 1] as const;
const OUT = [0.16, 1, 0.3, 1] as const;
const SOFT = [0.25, 0.46, 0.45, 0.94] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Journey stages — single source of truth for CONTENT
// ─────────────────────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "inspection",
    index: "01",
    title: "Vehicle Inspection",
    headline: "Every vehicle.\nInspected.",
    sub: "Multi-point assessment",
    body: "Before any vehicle earns its place in our inventory, it undergoes a rigorous multi-point inspection by certified technicians. Mechanical, electrical, structural, nothing is overlooked.",
    trust: "Verified to our standard. Not the industry average.",
    src: "https://res.cloudinary.com/dnadawobi/image/upload/v1782777629/ChatGPT_Image_Jun_30_2026_02_52_13_AM_l0m7nd.png",
    alt: "Certified technician performing a detailed inspection of a luxury SUV in a professional workshop",
    bgFrom: "#070707",
    orbX: "22%",
    orbY: "35%",
  },
  {
    id: "documents",
    index: "02",
    title: "Ownership Verification",
    headline: "Clean title.\nGuaranteed.",
    sub: "Ownership documentation",
    body: "We verify every vehicle's ownership history, outstanding finance and title status before purchase. You receive a complete history report and clean ownership documentation.",
    trust: "No surprises after signing. That is our commitment.",
    src: "https://res.cloudinary.com/dnadawobi/image/upload/v1782777660/ChatGPT_Image_Jun_30_2026_02_54_06_AM_rpure3.png",
    alt: "Professional advisor and client reviewing official vehicle ownership documents in a premium office",
    bgFrom: "#090909",
    orbX: "75%",
    orbY: "28%",
  },
  {
    id: "tradein",
    index: "03",
    title: "Trade-In Valuation",
    headline: "Your vehicle.\nValued fairly.",
    sub: "Transparent trade-in",
    body: "We assess your current vehicle at market value, independently and transparently. The valuation is presented clearly, with no negotiation games. Fair to both sides.",
    trust: "What we offer is what your vehicle is worth.",
    src: "https://res.cloudinary.com/dnadawobi/image/upload/v1782777682/ChatGPT_Image_Jun_30_2026_02_55_07_AM_ser8nf.png",
    alt: "Professional conducting a thorough valuation assessment of a premium vehicle exterior",
    bgFrom: "#0b0b0b",
    orbX: "30%",
    orbY: "60%",
  },
  {
    id: "payment",
    index: "04",
    title: "Secure Payment",
    headline: "Financing.\nSimplified.",
    sub: "Flexible payment options",
    body: "Through trusted Kenyan financial partners, we structure payment plans that fit your life, not the other way around. All terms are presented in plain language before anything is signed.",
    trust: "Transparent numbers. No hidden fees. No pressure.",
    src: "https://res.cloudinary.com/dnadawobi/image/upload/v1782777701/ChatGPT_Image_Jun_30_2026_02_56_07_AM_s9ijfc.png",
    alt: "Professional financial consultation in a premium modern office environment",
    bgFrom: "#0a0a0a",
    orbX: "65%",
    orbY: "50%",
  },
  {
    id: "delivery",
    index: "05",
    title: "Vehicle Delivery",
    headline: "The moment.\nYours.",
    sub: "White-glove delivery",
    body: "Every delivery is handled with the same care as the sale itself. Vehicle presentation, documentation handover, and a final walkthrough, the beginning of your ownership story.",
    trust: "This is not the end of the process. It is the beginning.",
    src: "https://res.cloudinary.com/dnadawobi/image/upload/v1782777583/ChatGPT_Image_Jun_30_2026_02_56_58_AM_mxuvoo.png",
    alt: "Elegant vehicle key handover between advisor and new owner in a premium showroom",
    bgFrom: "#080808",
    orbX: "50%",
    orbY: "25%",
  },
  {
    id: "ownership",
    index: "06",
    title: "Ownership Support",
    headline: "With you.\nLong after.",
    sub: "After-sales partnership",
    body: "We handle NTSA transfers, logbook updates and insurance introductions. Our advisors remain available, not to sell you something, but because your continued confidence matters.",
    trust: "We measure success by how you feel a year after purchase.",
    src: "https://res.cloudinary.com/dnadawobi/image/upload/v1782777551/ChatGPT_Image_Jun_30_2026_02_58_18_AM_tjvlcm.png",
    alt: "Luxury vehicle on an open road at golden hour, representing the freedom of confident ownership",
    bgFrom: "#090909",
    orbX: "78%",
    orbY: "70%",
  },
] as const;

const TOTAL = STAGES.length;

const TRUST_SIGNALS = [
  {label: "Verified Vehicles", icon: "✓"},
  {label: "NTSA Transfer Support", icon: "✓"},
  {label: "Fair Trade-In Valuations", icon: "✓"},
  {label: "After-Sales Assistance", icon: "✓"},
  {label: "Financing Guidance", icon: "✓"},
] as const;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH
//
// One hook. One scroll listener. One discrete integer.
// Stage boundaries are quantized — each stage owns an equal, fixed segment
// of total scroll progress. There is no continuous/fractional value derived
// from scroll that any child component uses to compute its own stage.
//
// activeStage only changes when scrollYProgress crosses a hard boundary
// (i / TOTAL). Every visual element below subscribes to this single integer,
// not to scrollYProgress directly.
// ─────────────────────────────────────────────────────────────────────────────
function useActiveStage(scrollYProgress: MotionValue<number>) {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const stage = clamp(Math.floor(v * TOTAL), 0, TOTAL - 1);
      setActiveStage((prev) => (prev === stage ? prev : stage));
    });
  }, [scrollYProgress]);

  return activeStage;
}

// ─────────────────────────────────────────────────────────────────────────────
// GrainOverlay
// ─────────────────────────────────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[60] opacity-[0.028] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
      }}
    />
  );
}

function Divider({inView, delay = 0}: {inView: boolean; delay?: number}) {
  return (
    <motion.div
      className="w-full h-px"
      style={{background: "rgba(255,255,255,0.065)"}}
      initial={{scaleX: 0, originX: 0}}
      animate={inView ? {scaleX: 1} : {}}
      transition={{duration: 1.1, ease: EXPO, delay}}
      aria-hidden
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop: Vertical Journey Indicator (right rail)
// Reads activeStage (number prop) — no independent scroll math.
// The line-fill beneath each dot still reads the continuous spring, since
// that's a decorative fill-in-progress affordance, not a "synchronized
// content" element per the brief — it never controls text/image/caption.
// ─────────────────────────────────────────────────────────────────────────────
function JourneyIndicator({
  activeStage,
  scrollProgress,
}: {
  activeStage: number;
  scrollProgress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className="hidden lg:flex flex-col items-center gap-0 absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 z-30"
      aria-hidden
    >
      {STAGES.map((stage, i) => {
        const isActive = activeStage === i;
        const lineProgress = useTransform(scrollProgress, (v: number) => {
          const start = i / TOTAL;
          const end = (i + 1) / TOTAL;
          return clamp((v - start) / (end - start), 0, 1);
        });

        return (
          <div key={stage.id} className="flex flex-col items-center">
            <motion.span
              className="absolute right-5 text-[8px] tracking-[0.28em] uppercase text-[#BCBEC0] font-medium whitespace-nowrap pr-1"
              animate={{opacity: isActive ? 0.55 : 0}}
              transition={{duration: 0.3, ease: SOFT}}
            >
              {stage.title}
            </motion.span>

            <motion.div
              className="rounded-full bg-[#BCBEC0] shrink-0"
              animate={{
                width: isActive ? 4 : 3,
                height: isActive ? 4 : 3,
                opacity: isActive ? 1 : 0.22,
                boxShadow: isActive
                  ? "0 0 8px 2px rgba(188,190,192,0.25)"
                  : "none",
              }}
              transition={{duration: 0.3, ease: SOFT}}
            />

            {i < TOTAL - 1 && (
              <div
                className="relative w-px overflow-hidden"
                style={{height: 28}}
              >
                <div className="absolute inset-0 bg-white/[0.06]" />
                <motion.div
                  className="absolute inset-x-0 top-0 bg-[#BCBEC0]/40"
                  style={{
                    scaleY: reduced ? 0 : lineProgress,
                    originY: 0,
                    height: "100%",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop: Editorial copy (left column)
// Reads activeStage directly as a prop. No internal scroll subscription,
// no internal stage derivation. Headline/body/trust/stage-number all key
// off the exact same integer the image uses, so they change on the same
// render pass.
// ─────────────────────────────────────────────────────────────────────────────
function EditorialCopy({
  inView,
  activeStage,
}: {
  inView: boolean;
  activeStage: number;
}) {
  const stage = STAGES[activeStage];

  return (
    <div className="flex flex-col justify-center h-full max-w-[480px]">
      <motion.p
        className="text-[9px] tracking-[0.44em] uppercase font-medium mb-8"
        style={{color: "rgba(188,190,192,0.28)"}}
        initial={{opacity: 0, y: 10}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.85, ease: EXPO, delay: 0.08}}
      >
        Why Al Ahsan
      </motion.p>

      <motion.p
        className="text-[9px] tracking-[0.3em] uppercase font-medium mb-3"
        style={{color: "rgba(188,190,192,0.18)"}}
        initial={{opacity: 0}}
        animate={inView ? {opacity: 1} : {}}
        transition={{duration: 0.7, ease: OUT, delay: 0.14}}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={stage.id}
            initial={{opacity: 0, y: 6}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -6}}
            transition={{duration: 0.4, ease: SOFT}}
          >
            {stage.index} - {stage.title}
          </motion.span>
        </AnimatePresence>
      </motion.p>

      {/* Headline — crossfade + lift, replaces clip-path reveal */}
      <div className="overflow-hidden mb-9" style={{minHeight: "8rem"}}>
        <AnimatePresence mode="wait">
          <motion.h2
            key={stage.id}
            className="font-bold text-white leading-[0.9] tracking-[-0.03em] whitespace-pre-line"
            style={{fontSize: "clamp(2rem, 3.8vw, 4.2rem)"}}
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -14}}
            transition={{duration: 0.55, ease: EXPO}}
          >
            {stage.headline}
          </motion.h2>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={stage.id}
          className="text-[13px] md:text-[14px] leading-[1.92] mb-9 max-w-[380px]"
          style={{color: "rgba(188,190,192,0.38)"}}
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -8}}
          transition={{duration: 0.5, ease: OUT}}
        >
          {stage.body}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={stage.id}
          className="text-[11px] tracking-[0.06em] italic mb-9"
          style={{color: "rgba(188,190,192,0.22)"}}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.45, ease: OUT}}
        >
          {stage.trust}
        </motion.p>
      </AnimatePresence>

      <Divider inView={inView} delay={0.5} />

      <motion.div
        className="relative mt-8 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.055)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        initial={{opacity: 0, y: 14}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.9, ease: EXPO, delay: 0.6}}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.09) 35%, rgba(255,255,255,0.09) 65%, transparent 100%)",
          }}
        />
        <div className="px-5 py-4 flex flex-col gap-[2px]">
          {TRUST_SIGNALS.map(({label, icon}, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-3 py-[7px]"
              initial={{opacity: 0, x: -8}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.6, ease: OUT, delay: 0.68 + i * 0.07}}
            >
              <span
                className="text-[10px] shrink-0"
                style={{color: "rgba(188,190,192,0.3)"}}
              >
                {icon}
              </span>
              <span
                className="text-[11px] md:text-[12px] tracking-[0.05em] font-medium"
                style={{color: "rgba(188,190,192,0.58)"}}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop: Image sequence (right column)
//
// Replaced: continuous per-image clip-path reveal driven by independent
// segmentProgress() math (the actual source of the desync).
//
// Now: a single <AnimatePresence> swap keyed on activeStage. Only the
// currently active stage's image is ever mounted. Transition is a
// crossfade + scale, exactly as the brief requests, and it fires on the
// identical render as the copy swap because both read the same
// activeStage integer — there is no independent progress calculation
// left in this component.
// ─────────────────────────────────────────────────────────────────────────────
function ImageSequence({
  inView,
  activeStage,
}: {
  inView: boolean;
  activeStage: number;
}) {
  const reduced = useReducedMotion();
  const stage = STAGES[activeStage];

  return (
    <motion.div
      className="flex flex-col"
      initial={{opacity: 0, y: 32}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 1.1, ease: EXPO, delay: 0.28}}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-[#0c0c0c]"
        style={{
          aspectRatio: "3 / 4",
          boxShadow:
            "0 48px 120px rgba(0,0,0,0.82), 0 0 0 1px rgba(255,255,255,0.035)",
        }}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={stage.id}
            src={stage.src}
            alt={stage.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading={activeStage === 0 ? "eager" : "lazy"}
            fetchPriority={activeStage === 0 ? "high" : "auto"}
            initial={reduced ? {opacity: 0} : {opacity: 0, scale: 1.06}}
            animate={reduced ? {opacity: 1} : {opacity: 1, scale: 1}}
            exit={reduced ? {opacity: 0} : {opacity: 0, scale: 0.985}}
            transition={{duration: 0.7, ease: EXPO}}
          />
        </AnimatePresence>

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.015) 100%)",
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 65%, transparent 100%)",
            padding: "2.5rem 1.5rem 1.5rem",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -6}}
              transition={{duration: 0.45, ease: OUT}}
            >
              <p
                className="text-[10px] tracking-[0.34em] uppercase font-medium mb-1"
                style={{color: "rgba(188,190,192,0.38)"}}
              >
                {stage.sub}
              </p>
              <p
                className="text-[15px] md:text-[17px] font-semibold tracking-[-0.01em]"
                style={{color: "rgba(255,255,255,0.82)"}}
              >
                {stage.headline.replace("\n", " ")}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none" aria-hidden>
          <AnimatePresence mode="wait">
            <motion.span
              key={stage.id}
              className="text-[9px] tracking-[0.38em] font-medium block"
              style={{color: "rgba(188,190,192,0.2)"}}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.35}}
            >
              {stage.index}
            </motion.span>
          </AnimatePresence>
        </div>

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)"}}
          aria-hidden
        />
      </div>

      <div className="flex items-center gap-3 mt-5 px-1">
        <div className="flex items-center gap-[6px]">
          {STAGES.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-[#BCBEC0] shrink-0"
              animate={{
                width: 3,
                height: 3,
                opacity: activeStage === i ? 1 : 0.18,
              }}
              transition={{duration: 0.3, ease: SOFT}}
              aria-hidden
            />
          ))}
        </div>

        <span
          className="text-[9px] tracking-[0.3em] font-medium tabular-nums"
          style={{color: "rgba(188,190,192,0.24)"}}
        >
          {stage.index} / {String(TOTAL).padStart(2, "0")}
        </span>

        <div
          className="flex-1 h-px"
          style={{background: "rgba(255,255,255,0.05)"}}
          aria-hidden
        />

        <motion.span
          className="text-[8px] tracking-[0.28em] uppercase font-medium"
          style={{color: "rgba(188,190,192,0.14)"}}
          animate={{opacity: [0.4, 0.85, 0.4]}}
          transition={{duration: 3.2, repeat: Infinity, ease: "easeInOut"}}
        >
          Scroll
        </motion.span>
      </div>

      <motion.p
        className="mt-5 text-[11px] leading-[1.85] tracking-[0.02em] max-w-[320px]"
        style={{color: "rgba(188,190,192,0.2)"}}
        initial={{opacity: 0}}
        animate={inView ? {opacity: 1} : {}}
        transition={{duration: 1.1, ease: OUT, delay: 0.72}}
      >
        Each vehicle passes through the same process, regardless of price point.
        That is the Al Ahsan standard.
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop: Evolving background
// Continuous by design — background color/orb drift is ambient texture,
// not "synchronized content" per your list. Left on the spring so it still
// feels alive between stage changes rather than snapping.
// ─────────────────────────────────────────────────────────────────────────────
function EvolvingBackground({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const bgColor = useTransform(
    scrollProgress,
    STAGES.map((_, i) => i / TOTAL),
    STAGES.map((s) => s.bgFrom),
  );

  const orbX = useTransform(
    scrollProgress,
    STAGES.map((_, i) => i / TOTAL),
    STAGES.map((s) => s.orbX),
  );
  const orbY = useTransform(
    scrollProgress,
    STAGES.map((_, i) => i / TOTAL),
    STAGES.map((s) => s.orbY),
  );

  const orbOpacity = useTransform(
    scrollProgress,
    [0, 0.15, 0.85, 1],
    [0.1, 0.16, 0.12, 0.05],
  );

  const exitDark = useTransform(scrollProgress, [0.88, 1], [0, 0.7]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{backgroundColor: bgColor}}
      aria-hidden
    >
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: orbX,
          top: orbY,
          width: "65vmax",
          height: "65vmax",
          opacity: orbOpacity,
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle at center, rgba(210,210,210,0.08) 0%, rgba(150,150,150,0.018) 55%, transparent 75%)",
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: "85%",
          top: "15%",
          width: "30vmax",
          height: "30vmax",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.014) 0%, transparent 70%)",
        }}
        animate={{scale: [1, 1.18, 0.94, 1], opacity: [0.5, 0.85, 0.6, 0.5]}}
        transition={{duration: 15, repeat: Infinity, ease: "easeInOut"}}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: "12%",
          top: "80%",
          width: "22vmax",
          height: "22vmax",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.01) 0%, transparent 70%)",
        }}
        animate={{scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4]}}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-black"
        style={{opacity: exitDark}}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile: Stage card — unchanged in spirit; mobile already uses one
// IntersectionObserver per card, which is inherently "discrete," so no
// architectural change needed here per your brief (it was the desktop
// continuous-progress maths that caused desync).
// ─────────────────────────────────────────────────────────────────────────────
function MobileStageCard({
  stage,
  index,
}: {
  stage: (typeof STAGES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: false, amount: 0.35});
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="relative w-full"
      style={{marginTop: index === 0 ? 0 : "-2rem"}}
      initial={{opacity: 0, y: 40, scale: 0.97}}
      animate={
        inView
          ? {opacity: 1, y: 0, scale: 1}
          : {opacity: 0.3, y: 20, scale: 0.97}
      }
      transition={reduced ? {duration: 0} : {duration: 0.65, ease: OUT}}
    >
      <div
        className="relative w-full overflow-hidden rounded-3xl"
        style={{aspectRatio: "4 / 3"}}
      >
        <img
          src={stage.src}
          alt={stage.alt}
          className="w-full h-full object-cover"
          loading={index < 2 ? "eager" : "lazy"}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)",
          }}
        />
        <div className="absolute top-4 left-4">
          <span
            className="text-[9px] tracking-[0.38em] font-medium"
            style={{color: "rgba(188,190,192,0.4)"}}
          >
            {stage.index}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p
            className="text-[10px] tracking-[0.28em] uppercase font-medium mb-1"
            style={{color: "rgba(188,190,192,0.5)"}}
          >
            {stage.sub}
          </p>
          <p
            className="text-[17px] font-semibold tracking-[-0.01em] whitespace-pre-line leading-[1.15]"
            style={{color: "rgba(255,255,255,0.85)"}}
          >
            {stage.headline}
          </p>
        </div>
      </div>

      <motion.div
        className="relative mx-3 -mt-6 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(18,18,18,0.92)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)",
          }}
        />
        <div className="p-5">
          <p
            className="text-[13px] leading-[1.88] mb-4"
            style={{color: "rgba(188,190,192,0.45)"}}
          >
            {stage.body}
          </p>
          <p
            className="text-[11px] italic tracking-[0.04em]"
            style={{color: "rgba(188,190,192,0.22)"}}
          >
            {stage.trust}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileProgressBar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = Math.min(1, scrollY / docH);
      setActive(clamp(Math.floor(ratio * TOTAL), 0, TOTAL - 1));
    }
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex items-center gap-2 px-6 py-4 overflow-x-auto scrollbar-none">
      {STAGES.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2 shrink-0">
          <motion.span
            className="text-[9px] tracking-[0.22em] uppercase font-medium whitespace-nowrap"
            animate={{
              color:
                active === i
                  ? "rgba(188,190,192,0.72)"
                  : "rgba(188,190,192,0.2)",
              scale: active === i ? 1.05 : 1,
            }}
            transition={{duration: 0.4, ease: SOFT}}
          >
            {s.title}
          </motion.span>
          {i < TOTAL - 1 && (
            <span style={{color: "rgba(188,190,192,0.1)", fontSize: 8}}>·</span>
          )}
        </div>
      ))}
    </div>
  );
}

function MobileTrustCards() {
  return (
    <div className="flex flex-col gap-3 px-6 mt-10">
      <p
        className="text-[9px] tracking-[0.42em] uppercase font-medium mb-2"
        style={{color: "rgba(188,190,192,0.28)"}}
      >
        Our Commitment
      </p>
      {TRUST_SIGNALS.map(({label, icon}, i) => {
        const ref = useRef<HTMLDivElement>(null);
        const inView = useInView(ref, {once: true, amount: 0.5});
        return (
          <motion.div
            key={label}
            ref={ref}
            className="relative rounded-xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.055)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            initial={{opacity: 0, y: 12}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.55, ease: OUT, delay: i * 0.07}}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)",
              }}
            />
            <div className="flex items-center gap-3 px-4 py-3.5">
              <span
                className="text-[11px] shrink-0"
                style={{color: "rgba(188,190,192,0.35)"}}
              >
                {icon}
              </span>
              <span
                className="text-[12px] font-medium tracking-[0.04em]"
                style={{color: "rgba(188,190,192,0.6)"}}
              >
                {label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function MobileCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.5});

  return (
    <motion.div
      ref={ref}
      className="mx-6 mt-10 mb-16 relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.024)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
      }}
      initial={{opacity: 0, y: 20}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 0.8, ease: EXPO}}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.09) 40%, rgba(255,255,255,0.09) 60%, transparent)",
        }}
      />
      <div className="p-7 text-center">
        <p
          className="text-[10px] tracking-[0.38em] uppercase font-medium mb-4"
          style={{color: "rgba(188,190,192,0.28)"}}
        >
          Ready to begin
        </p>
        <h3
          className="font-semibold mb-2 tracking-[-0.02em]"
          style={{
            fontSize: "clamp(1.35rem, 5vw, 1.7rem)",
            color: "rgba(255,255,255,0.88)",
          }}
        >
          Find your next vehicle.
        </h3>
        <p
          className="text-[12px] leading-[1.8] mb-7"
          style={{color: "rgba(188,190,192,0.36)"}}
        >
          Browse our verified inventory or speak with an advisor.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="/inventory"
            className="block rounded-xl px-6 py-3.5 text-[12px] tracking-[0.1em] uppercase font-semibold text-center transition-opacity hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.09)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.82)",
            }}
          >
            Browse Inventory
          </a>
          <a
            href="/contact"
            className="block rounded-xl px-6 py-3.5 text-[12px] tracking-[0.1em] uppercase font-medium text-center transition-opacity hover:opacity-70"
            style={{color: "rgba(188,190,192,0.4)"}}
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function MobileView() {
  return (
    <div className="lg:hidden bg-[#080808] min-h-screen">
      <div
        className="sticky top-0 z-50 overflow-hidden"
        style={{
          background: "rgba(8,8,8,0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <MobileProgressBar />
      </div>

      <div className="px-6 pt-12 pb-8">
        <p
          className="text-[9px] tracking-[0.44em] uppercase font-medium mb-4"
          style={{color: "rgba(188,190,192,0.28)"}}
        >
          Why Al Ahsan
        </p>
        <h2
          className="font-bold text-white leading-[0.92] tracking-[-0.03em]"
          style={{fontSize: "clamp(2rem, 8vw, 2.6rem)"}}
        >
          More than a dealership.
        </h2>
        <h2
          className="font-light italic leading-[0.92] tracking-[-0.01em] mt-1"
          style={{
            fontSize: "clamp(2rem, 8vw, 2.6rem)",
            color: "rgba(188,190,192,0.28)",
          }}
        >
          A trusted partner.
        </h2>
        <p
          className="text-[13px] leading-[1.9] mt-6 max-w-[340px]"
          style={{color: "rgba(188,190,192,0.38)"}}
        >
          Purchasing a vehicle is one of the most significant commitments you
          will make. We take that seriously.
        </p>
      </div>

      <div className="flex flex-col gap-6 px-4 pb-4">
        {STAGES.map((stage, i) => (
          <MobileStageCard key={stage.id} stage={stage} index={i} />
        ))}
      </div>

      <MobileTrustCards />

      <MobileCTA />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop: Complete view
//
// activeStage is computed exactly once here via useActiveStage(), then
// passed down as a plain prop to EditorialCopy, ImageSequence, and
// JourneyIndicator. None of those three perform their own derivation —
// they only render whatever activeStage they're given. This is the fix:
// one render-triggering state update fans out to every synchronized
// element on the same commit.
// ─────────────────────────────────────────────────────────────────────────────
function DesktopView() {
  const reduced = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(outerRef, {once: true, amount: 0.05});

  const {scrollYProgress} = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: reduced ? 999 : 52,
    damping: reduced ? 999 : 17,
  });

  const activeStage = useActiveStage(springProgress);

  return (
    <div
      ref={outerRef}
      className="hidden lg:block relative w-full"
      style={{height: reduced ? "auto" : `${TOTAL * 110}vh`}}
    >
      <div
        className={
          reduced ? "relative w-full" : "sticky top-0 w-full overflow-hidden"
        }
        style={reduced ? {} : {height: "100svh"}}
      >
        <EvolvingBackground scrollProgress={springProgress} />

        <GrainOverlay />

        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 pointer-events-none z-40"
          style={{
            background:
              "linear-gradient(to bottom, #070707 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-40"
          style={{
            background: "linear-gradient(to top, #070707 0%, transparent 100%)",
          }}
        />

        <motion.div
          className="absolute top-0 left-10 right-24 xl:right-28 h-px z-30"
          style={{background: "rgba(255,255,255,0.04)"}}
          initial={{scaleX: 0, originX: 0}}
          animate={inView ? {scaleX: 1} : {}}
          transition={{duration: 1.5, ease: EXPO, delay: 0.04}}
          aria-hidden
        />

        <div
          className="relative z-20 w-full grid grid-cols-2 gap-16 xl:gap-24 items-center px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-28"
          style={
            reduced
              ? {paddingTop: "8rem", paddingBottom: "8rem"}
              : {height: "100svh"}
          }
        >
          <EditorialCopy inView={inView} activeStage={activeStage} />
          <ImageSequence inView={inView} activeStage={activeStage} />
        </div>

        <JourneyIndicator
          activeStage={activeStage}
          scrollProgress={springProgress}
        />
      </div>
    </div>
  );
}

export default function WhyAlAhsan() {
  return (
    <section aria-label="Why choose Al Ahsan Motors">
      <DesktopView />
      <MobileView />
    </section>
  );
}
