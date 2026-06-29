"use client";
import {useRef, useState} from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import Button from "@/components/Button";
import CTABand from "@/components/CTABand";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const benefits = [
  {
    title: "Trade-In Value",
    description:
      "Receive a competitive market valuation backed by industry experience.",
    icon: (
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Fast & Convenient",
    description:
      "Avoid the stress of selling privately — we handle the entire process.",
    icon: (
      <path
        d="M13 2 3 14h7l-1 8 11-12h-7z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Flexible Financing",
    description: "Offset your vehicle's value against your next purchase.",
    icon: (
      <path
        d="M3 10h18M7 15h2M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Trusted Local Dealer",
    description:
      "Serving customers across Kenya with transparent transactions.",
    icon: (
      <path
        d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const steps = [
  {
    step: "01",
    title: "Submit Details",
    description: "Submit your vehicle details.",
  },
  {
    step: "02",
    title: "Get Valuation",
    description: "Receive an estimated valuation.",
  },
  {
    step: "03",
    title: "Inspection",
    description: "Visit for physical inspection.",
  },
  {
    step: "04",
    title: "Drive Away",
    description: "Drive away in your new vehicle.",
  },
];

const documents = [
  "National ID / Passport",
  "Original Logbook",
  "Valid Insurance",
  "Service History (if available)",
  "Spare Keys",
  "KRA PIN",
];

const whyPoints = [
  "Competitive Offers",
  "Transparent Process",
  "Same-Day Valuation",
  "Nationwide Support",
  "Secure Ownership Transfer",
];

const testimonials = [
  {
    name: "James M.",
    role: "Nairobi",
    quote:
      "They gave me a better offer than I expected and handled everything professionally.",
    rating: 5,
  },
  {
    name: "Wanjiru K.",
    role: "Nairobi",
    quote:
      "The valuation was fast and fair. I drove out in my new car the same week.",
    rating: 5,
  },
  {
    name: "Otieno A.",
    role: "Mombasa Road",
    quote:
      "No haggling, no stress. The team made trading in my old SUV effortless.",
    rating: 5,
  },
];

const brands = [
  "Toyota",
  "Mercedes-Benz",
  "BMW",
  "Land Rover",
  "Audi",
  "Lexus",
  "Subaru",
  "Nissan",
];

const transmissions = ["Automatic", "Manual"];
const fuels = ["Petrol", "Diesel", "Hybrid", "Electric"];
const conditions = ["Excellent", "Good", "Fair", "Needs Repair"];

/* ───────────────────────────────────────────────
   Ambient background layer (subtle moving glow + grain)
   ─────────────────────────────────────────────── */
function AmbientLayer({tone = "dark"}: {tone?: "dark" | "light"}) {
  const prefersReduced = usePrefersReducedMotion();
  const glow = tone === "dark" ? "rgba(188,190,192,0.10)" : "rgba(0,0,0,0.05)";
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <motion.div
        className="absolute -top-1/3 -left-1/4 w-[60%] h-[60%] rounded-full blur-3xl"
        style={{background: glow}}
        animate={
          prefersReduced
            ? {}
            : {x: [0, 40, 0], y: [0, 30, 0], opacity: [0.5, 0.85, 0.5]}
        }
        transition={{duration: 26, repeat: Infinity, ease: "easeInOut"}}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full blur-3xl"
        style={{background: glow}}
        animate={
          prefersReduced
            ? {}
            : {x: [0, -30, 0], y: [0, -20, 0], opacity: [0.4, 0.7, 0.4]}
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

function Stars({count}: {count: number}) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({length: 5}).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < count ? "#BCBEC0" : "none"}
          stroke="#BCBEC0"
          strokeWidth="1.5"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.05});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const fadeUp = (delay: number) => ({
    hidden: {y: 28, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {duration: 1.1, ease: EASE, delay},
    },
  });

  const maskLeft = (delay: number) => ({
    hidden: {clipPath: "inset(0 100% 0 0)", opacity: 0},
    visible: {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: {duration: 1.3, ease: EASE_OUT_EXPO, delay},
    },
  });

  const badges = [
    "Instant Valuation",
    "Fair Market Pricing",
    "All Brands Accepted",
    "Secure Transactions",
  ];

  const scrollToEstimator = () => {
    document.getElementById("estimator")?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{minHeight: "100svh"}}
      aria-label="Trade-In Your Vehicle"
    >
      <motion.div
        className="absolute inset-0"
        initial={{scale: 1.08, opacity: 0}}
        animate={inView ? {scale: 1, opacity: 1} : {}}
        transition={{duration: 1.6, ease: EASE}}
      >
        <motion.div
          className="absolute inset-0"
          style={prefersReduced ? {} : {scale: imageScale, y: imageY}}
        >
          <img
            src="https://res.cloudinary.com/dnadawobi/image/upload/v1782717932/ChatGPT_Image_Jun_29_2026_10_24_42_AM_ln145k.png"
            alt="Trade in your luxury vehicle"
            className="w-full h-full object-cover object-[60%_50%]"
            fetchPriority="high"
            loading="eager"
          />
        </motion.div>
      </motion.div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex items-center min-h-[100svh] px-6 md:px-14 lg:px-20 xl:px-28">
        <motion.div
          className="w-full max-w-3xl"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{visible: {transition: {staggerChildren: 0.12}}}}
        >
          <motion.p
            variants={fadeUp(0.15)}
            className="text-[13px] tracking-[0.3em] uppercase text-white/60 mb-8 font-semibold"
          >
            TRADE-IN PROGRAM
          </motion.p>

          <div className="overflow-hidden mb-3 w-full">
            <motion.h1
              variants={maskLeft(0.3)}
              className="text-[clamp(2.4rem,5.6vw,5.4rem)] font-bold text-white leading-[1.05] tracking-[-0.02em]"
            >
              Upgrade Your Drive with a
              <br />
              Hassle-Free Trade-In
            </motion.h1>
          </div>

          <motion.p
            variants={fadeUp(0.55)}
            className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-lg"
          >
            Get a fair market valuation for your current vehicle and trade it in
            towards your next luxury car. Fast, transparent and convenient.
          </motion.p>

          <motion.div
            variants={fadeUp(0.7)}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <motion.div
              whileHover={prefersReduced ? {} : {scale: 1.03}}
              whileTap={{scale: 0.98}}
              transition={{duration: 0.3, ease: EASE}}
            >
              <Button variant="primary" size="lg" onClick={scrollToEstimator}>
                Get Free Valuation
              </Button>
            </motion.div>
            <motion.div
              whileHover={prefersReduced ? {} : {scale: 1.03}}
              whileTap={{scale: 0.98}}
              transition={{duration: 0.3, ease: EASE}}
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => (window.location.href = "tel:+254743155777")}
              >
                Call Us
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp(0.85)}
            className="flex flex-wrap gap-x-8 gap-y-3"
          >
            {badges.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BCBEC0]" />
                <span className="text-[11px] tracking-[0.15em] uppercase text-white/50 font-medium">
                  {b}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});
  const prefersReduced = usePrefersReducedMotion();
  const fadeUp = (delay: number) => ({
    hidden: {y: 28, opacity: 0, rotate: -1},
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {duration: 0.9, ease: EASE, delay},
    },
  });
  return (
    <section
      ref={ref}
      className="relative bg-[#0d0d0d] py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <AmbientLayer tone="dark" />
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-16">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 md:mb-20 max-w-xl"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-medium">
            Why Trade In
          </p>
          <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-[0.95]">
            Built for a
            <br />
            <span className="text-[#BCBEC0] italic">seamless upgrade.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              variants={fadeUp(0.1 + i * 0.08)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      y: -8,
                      boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }
              }
              transition={{type: "spring", stiffness: 260, damping: 22}}
              className="group relative rounded-2xl p-8 border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 30% 0%, rgba(188,190,192,0.12), transparent 60%)",
                }}
              />
              <motion.div
                className="relative w-12 h-12 rounded-full border border-[#BCBEC0]/30 flex items-center justify-center mb-6"
                animate={prefersReduced ? {} : {y: [0, -3, 0]}}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#BCBEC0"
                  strokeWidth="1.5"
                >
                  {b.icon}
                </svg>
              </motion.div>
              <h3 className="font-bold text-lg text-white mb-2">{b.title}</h3>
              <p className="text-sm text-[#BCBEC0]/55 leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start 70%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const fadeUp = (delay: number) => ({
    hidden: {y: 28, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {duration: 0.9, ease: EASE, delay},
    },
  });
  return (
    <section
      ref={ref}
      className="relative bg-[#fafafa] py-20 md:py-28 lg:py-36"
    >
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-16">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-medium">
            The Process
          </p>
          <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl text-black leading-[0.95]">
            How It
            <br />
            <span className="text-[#BCBEC0] italic">Works.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-black/10 overflow-hidden">
            <motion.div
              className="h-full bg-black origin-left"
              style={{scaleX: lineScale}}
            />
          </div>
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              variants={fadeUp(0.15 + i * 0.15)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative flex flex-col items-start lg:items-center lg:text-center"
            >
              <div className="relative z-10 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm mb-6">
                {s.step}
              </div>
              <h3 className="font-bold text-lg text-black mb-2">{s.title}</h3>
              <p className="text-sm text-black/50 leading-relaxed max-w-[220px]">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TradeInEstimator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.15});
  const prefersReduced = usePrefersReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fadeUp = (delay: number) => ({
    hidden: {y: 22, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {duration: 0.7, ease: EASE, delay},
    },
  });

  const inputClass =
    "w-full rounded-xl bg-black/40 border border-white/15 text-white placeholder:text-white/30 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-[#BCBEC0] focus:shadow-[0_0_0_3px_rgba(188,190,192,0.15)]";
  const labelClass =
    "block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2 font-medium";

  return (
    <section
      id="estimator"
      ref={ref}
      className="relative bg-black py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <AmbientLayer tone="dark" />
      <div className="relative max-w-[1000px] mx-auto px-6 md:px-16">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-medium">
            Free Estimate
          </p>
          <h2 className="font-bold text-3xl md:text-5xl text-white leading-[0.95] mb-4">
            Tell Us About
            <br />
            <span className="text-[#BCBEC0] italic">Your Vehicle.</span>
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            Share a few details and our team will be in touch with a fair,
            no-obligation valuation.
          </p>
        </motion.div>

        <motion.div
          initial={{opacity: 0, scale: 0.97}}
          animate={inView ? {opacity: 1, scale: 1} : {}}
          transition={{duration: 0.9, ease: EASE, delay: 0.15}}
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 md:p-12"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial="hidden"
                animate="visible"
                exit={{opacity: 0, transition: {duration: 0.3}}}
                variants={{visible: {transition: {staggerChildren: 0.06}}}}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div variants={fadeUp(0)}>
                  <label className={labelClass}>Vehicle Brand</label>
                  <select required className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select brand
                    </option>
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </motion.div>
                <motion.div variants={fadeUp(0.02)}>
                  <label className={labelClass}>Vehicle Model</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Land Cruiser Prado"
                    className={inputClass}
                  />
                </motion.div>
                <motion.div variants={fadeUp(0.04)}>
                  <label className={labelClass}>Year</label>
                  <input
                    required
                    type="number"
                    min={1990}
                    max={2026}
                    placeholder="e.g. 2021"
                    className={inputClass}
                  />
                </motion.div>
                <motion.div variants={fadeUp(0.06)}>
                  <label className={labelClass}>Mileage (km)</label>
                  <input
                    required
                    type="number"
                    min={0}
                    placeholder="e.g. 45000"
                    className={inputClass}
                  />
                </motion.div>
                <motion.div variants={fadeUp(0.08)}>
                  <label className={labelClass}>Transmission</label>
                  <select required className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select transmission
                    </option>
                    {transmissions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </motion.div>
                <motion.div variants={fadeUp(0.1)}>
                  <label className={labelClass}>Fuel Type</label>
                  <select required className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select fuel type
                    </option>
                    {fuels.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </motion.div>
                <motion.div variants={fadeUp(0.12)}>
                  <label className={labelClass}>Condition</label>
                  <select required className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select condition
                    </option>
                    {conditions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </motion.div>
                <motion.div variants={fadeUp(0.14)}>
                  <label className={labelClass}>Expected Price (KES)</label>
                  <input
                    required
                    type="number"
                    min={0}
                    placeholder="e.g. 3,500,000"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div
                  variants={fadeUp(0.18)}
                  className="md:col-span-2 pt-2"
                >
                  <motion.div
                    whileHover={prefersReduced ? {} : {scale: 1.015}}
                    whileTap={{scale: 0.98}}
                    transition={{duration: 0.3, ease: EASE}}
                  >
                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      Request Free Valuation
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{opacity: 0, y: 16, scale: 0.96}}
                animate={{opacity: 1, y: 0, scale: 1}}
                transition={{duration: 0.6, ease: EASE_OUT_EXPO}}
                className="flex flex-col items-center text-center py-10"
              >
                <motion.div
                  initial={{scale: 0, rotate: -90}}
                  animate={{scale: 1, rotate: 0}}
                  transition={{duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.1}}
                  className="w-16 h-16 rounded-full bg-[#BCBEC0]/15 border border-[#BCBEC0]/40 flex items-center justify-center mb-6"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#BCBEC0"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
                <h3 className="font-bold text-2xl text-white mb-3">
                  Request Received
                </h3>
                <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                  Thank you! Our team will contact you shortly with your
                  valuation.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function RequiredDocuments() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});
  const slideSide = (i: number, delay: number) => ({
    hidden: {x: i % 2 === 0 ? -40 : 40, opacity: 0},
    visible: {
      x: 0,
      opacity: 1,
      transition: {duration: 0.8, ease: EASE, delay},
    },
  });
  return (
    <section className="relative bg-[#fafafa] py-20 md:py-28 lg:py-36">
      <div ref={ref} className="max-w-[1440px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{y: 28, opacity: 0}}
          animate={inView ? {y: 0, opacity: 1} : {}}
          transition={{duration: 0.9, ease: EASE}}
          className="mb-14 md:mb-20 max-w-xl"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-medium">
            Be Prepared
          </p>
          <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl text-black leading-[0.95]">
            Required
            <br />
            <span className="text-[#BCBEC0] italic">Documents.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, i) => (
            <motion.div
              key={doc}
              variants={slideSide(i, 0.08 * i)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{y: -4, boxShadow: "0 18px 40px rgba(0,0,0,0.08)"}}
              transition={{type: "spring", stiffness: 260, damping: 22}}
              className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white px-6 py-5"
            >
              <motion.div
                initial={{rotate: -40, opacity: 0}}
                animate={inView ? {rotate: 0, opacity: 1} : {}}
                transition={{duration: 0.6, ease: EASE, delay: 0.1 + 0.08 * i}}
                className="w-9 h-9 rounded-full bg-black flex items-center justify-center flex-shrink-0"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#BCBEC0"
                  strokeWidth="2.5"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <span className="text-sm font-medium text-black">{doc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyTradeWithUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});
  const prefersReduced = usePrefersReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const scrollToEstimator = () => {
    document.getElementById("estimator")?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <section
      ref={ref}
      className="relative bg-black py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <AmbientLayer tone="dark" />
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          ref={imgRef}
          initial={{opacity: 0, scale: 1.06}}
          animate={inView ? {opacity: 1, scale: 1} : {}}
          transition={{duration: 1.1, ease: EASE}}
          className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4]"
        >
          <motion.img
            src="https://res.cloudinary.com/dnadawobi/image/upload/v1782523344/3377768468886339_oxtqkl.jpg"
            alt="Premium dealership experience"
            className="w-full h-[120%] object-cover"
            style={prefersReduced ? {} : {y: parallaxY}}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 28}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.9, delay: 0.15, ease: EASE}}
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-medium">
            Why Trade With Us
          </p>
          <h2 className="font-bold text-3xl md:text-5xl text-white leading-[0.95] mb-8">
            A trade-in process
            <br />
            <span className="text-[#BCBEC0] italic">built on trust.</span>
          </h2>
          <ul className="space-y-4 mb-10">
            {whyPoints.map((p, i) => (
              <motion.li
                key={p}
                initial={{opacity: 0, x: -16}}
                animate={inView ? {opacity: 1, x: 0} : {}}
                transition={{duration: 0.6, ease: EASE, delay: 0.2 + i * 0.08}}
                className="flex items-center gap-3"
              >
                <span className="text-[#BCBEC0] text-lg">✔</span>
                <span className="text-sm md:text-base text-white/70">{p}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div
            whileHover={prefersReduced ? {} : {scale: 1.03}}
            whileTap={{scale: 0.98}}
            transition={{duration: 0.3, ease: EASE}}
            className="inline-block"
          >
            <Button variant="primary" size="lg" onClick={scrollToEstimator}>
              Start Your Trade-In <span className="ml-2">→</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});
  const fadeUp = (delay: number) => ({
    hidden: {y: 28, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {duration: 0.9, ease: EASE, delay},
    },
  });
  return (
    <section
      ref={ref}
      className="relative bg-[#fafafa] py-20 md:py-28 lg:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-medium">
            Client Reflections
          </p>
          <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl text-black leading-[0.95]">
            What Our
            <br />
            <span className="text-[#BCBEC0] italic">Clients Say.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp(0.1 + i * 0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{y: -8, boxShadow: "0 24px 50px rgba(0,0,0,0.1)"}}
              transition={{type: "spring", stiffness: 250, damping: 22}}
              className="rounded-2xl border border-black/10 bg-white p-8 flex flex-col"
            >
              <Stars count={t.rating} />
              <p className="text-sm text-black/70 leading-relaxed italic mb-8 flex-1">
                “{t.quote}”
              </p>
              <footer className="border-t border-black/10 pt-5">
                <p className="text-sm font-bold text-black">{t.name}</p>
                <p className="text-xs text-[#BCBEC0] font-medium tracking-wider uppercase">
                  {t.role}
                </p>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TradeInPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={pageRef} className="bg-black">
      <HeroSection />
      <BenefitsSection />
      <HowItWorks />
      <TradeInEstimator />
      <RequiredDocuments />
      <WhyTradeWithUs />
      <Testimonials />
      <CTABand />
    </div>
  );
}
