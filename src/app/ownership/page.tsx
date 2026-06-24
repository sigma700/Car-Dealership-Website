"use client";
import {useRef, useEffect} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import Link from "next/link";

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

const ownershipPillars = [
  {
    title: "Concierge",
    body: "Your personal assistant for every journey, 24/7.",
    icon: "✦",
    detail: "Available 24/7 via phone, chat, or in‑person.",
  },
  {
    title: "Maintenance",
    body: "5-year service plan included with every Veloura.",
    icon: "◆",
    detail: "Covers all scheduled servicing, parts, and labour.",
  },
  {
    title: "Track Experience",
    body: "Complimentary track day with your purchase.",
    icon: "◈",
    detail: "Professional instruction and full hospitality included.",
  },
];

export default function OwnershipPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Ken Burns drift for hero
  const bgX = useMotionValue(0);
  const bgScale = useMotionValue(1);

  useEffect(() => {
    if (prefersReduced) return;
    const xAnim = animate(bgX, [0, -4, 0, 4, 0], {
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    });
    const scaleAnim = animate(bgScale, [1, 1.04, 1, 1.04, 1], {
      duration: 35,
      repeat: Infinity,
      ease: "linear",
    });
    return () => {
      xAnim.stop();
      scaleAnim.stop();
    };
  }, [prefersReduced, bgX, bgScale]);

  const {scrollYProgress: heroScroll} = useScroll({
    target: pageRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0.3, 0.5], [1, 0]);
  const heroOverlayY = useTransform(heroScroll, [0.2, 0.5], ["100%", "0%"]);

  return (
    <div ref={pageRef} className="bg-void">
      {/* ─── Hero Section ─── */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnadawobi/image/upload/v1782324270/pexels-garvin-st-villier-719266-3311574_qx8c1p.jpg')",
            x: prefersReduced ? 0 : bgX,
            scale: prefersReduced ? 1 : bgScale,
            opacity: prefersReduced ? 1 : heroOpacity,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[#f0f1f3] z-10"
          style={{y: prefersReduced ? "0%" : heroOverlayY}}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/80 to-transparent z-20" />
        <div className="relative z-30 flex flex-col justify-center h-full max-w-[1440px] mx-auto px-6 md:px-16">
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
            className="text-xs md:text-sm tracking-[0.3em] text-gold mb-4"
          >
            OWNERSHIP
          </motion.p>
          <motion.h1
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1}}
            className="text-4xl md:text-6xl lg:text-7xl font-display text-chrome leading-[0.92] max-w-2xl"
          >
            Beyond the
            <br />
            <span className="text-gold">drive.</span>
          </motion.h1>
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3}}
            className="text-base md:text-xl text-silver/70 mt-6 max-w-lg"
          >
            A curated ownership experience that extends far beyond the key
            handover.
          </motion.p>
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.5}}
            className="mt-8"
          >
            <a
              href="/contact?subject=ownership"
              className="btn-slide btn-slide-gold px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
            >
              <span>Discover Ownership</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Intro Section ─── */}
      <OwnershipIntro />

      {/* ─── Pillars Section (Concierge, Maintenance, Track) ─── */}
      <OwnershipPillars />

      {/* ─── Stats / Why Autopedia Ownership ─── */}
      <OwnershipStats />

      {/* ─── CTA Section ─── */}
      <OwnershipCTA />
    </div>
  );
}

function OwnershipIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.3});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Dark slides up (opposite of Bespoke intro) to match the cream→dark shift
  const darkY = useTransform(scrollYProgress, [0.1, 0.4], ["100%", "0%"]);
  const darkOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const headingColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#1A1A1A", "#E8E9EC"],
  );
  const subColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#5A4E3C", "#C8CAD0"],
  );
  const goldColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#7A6038", "#B8955A"],
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#f0f1f3]" />
      <motion.div
        className="absolute inset-0 bg-[#0A0A0B] z-0"
        style={{
          y: prefersReduced ? "0%" : darkY,
          opacity: prefersReduced ? 1 : darkOpacity,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f0f1f3]/60 via-transparent to-transparent pointer-events-none z-5" />

      <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{opacity: 0, x: -40}}
          animate={inView ? {opacity: 1, x: 0} : {}}
          transition={{duration: 0.9, ease: EASE_OUT_EXPO}}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl"
        >
          <img
            src="https://res.cloudinary.com/dnadawobi/image/upload/v1782325000/pexels-tima-miroshnichenko-6872167_ia5xri.jpg"
            alt="Ownership experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>

        <div>
          <motion.p
            initial={{opacity: 0, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
            className="text-xs tracking-[0.2em] mb-4"
            style={{color: goldColor}}
          >
            EFFORTLESS OWNERSHIP
          </motion.p>
          <motion.h2
            initial={{opacity: 0, y: 20}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO}}
            className="text-3xl md:text-4xl font-display leading-[0.95] mb-6"
            style={{color: headingColor}}
          >
            Your time.
            <br />
            <span style={{color: goldColor}}>Our commitment.</span>
          </motion.h2>
          <motion.p
            initial={{opacity: 0, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO}}
            className="text-base leading-relaxed mb-6"
            style={{color: subColor}}
          >
            Ownership with Autopedia means a completely tailored after‑sales
            experience. From annual servicing and roadside assistance to
            exclusive track days, every detail is designed around you.
          </motion.p>
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO}}
            className="flex gap-6 text-sm font-mono tracking-wider"
            style={{color: goldColor}}
          >
            <span>✦ 5‑Year Service Plan</span>
            <span>✦ 24/7 Concierge</span>
            <span>✦ Track Day Included</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OwnershipPillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.2});
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 bg-[#f0f1f3] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.2em] text-amber-800 mb-3">
            THE PILLARS
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-[#1A1A1A] leading-[1.1]">
            Complete peace
            <br />
            <span className="text-gold">of mind.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ownershipPillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{opacity: 0, y: 40}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.8, delay: 0.1 * i, ease: EASE_OUT_EXPO}}
              className={`group relative bg-white rounded-2xl p-8 flex flex-col items-start overflow-hidden transition-all duration-500 shadow-md hover:shadow-xl ${
                prefersReduced ? "" : "hover:-translate-y-2"
              }`}
            >
              {/* Cream overlay (slides up on hover, but bg is white so maybe gold tint) */}
              <div className="absolute inset-0 z-0 rounded-2xl bg-gold/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

              <div className="relative z-10 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <span className="text-gold text-xl transition-transform duration-500 group-hover:scale-110">
                  {pillar.icon}
                </span>
              </div>
              <h3 className="relative z-10 text-xl font-display text-[#1A1A1A] mb-2">
                {pillar.title}
              </h3>
              <p className="relative z-10 text-sm text-[#5A4E3C] leading-relaxed mb-4">
                {pillar.body}
              </p>
              <p
                className={`relative z-10 text-xs text-gold/70 leading-relaxed transition-opacity duration-500 ${
                  prefersReduced ? "" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {pillar.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OwnershipStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.15});

  const stats = [
    {value: "5", label: "Year Service Plan", suffix: ""},
    {value: "24/7", label: "Concierge Access", suffix: ""},
    {value: "100%", label: "Parts & Labour Covered", suffix: ""},
    {value: "1", label: "Track Day per Year", suffix: ""},
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 bg-[#0A0A0B] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.2em] text-gold/80 mb-3">
            BY THE NUMBERS
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-chrome leading-[1.1]">
            Everything
            <br />
            <span className="text-gold">included.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{opacity: 0, y: 30}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.7, delay: 0.1 * i, ease: EASE_OUT_EXPO}}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-display text-gold mb-2">
                {stat.value}
                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
              </p>
              <p className="text-sm text-silver/60 tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OwnershipCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.3});

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 bg-[#f0f1f3] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto text-center">
        <motion.p
          className="text-xs tracking-[0.2em] uppercase mb-5 text-amber-800"
          initial={{opacity: 0, y: 10}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
        >
          BEGIN YOUR OWNERSHIP JOURNEY
        </motion.p>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-display leading-[1.1] mb-6 text-[#1A1A1A]"
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO}}
        >
          Ready to experience
          <br />
          <span className="text-gold">the difference?</span>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto text-[#5A4E3C]"
          initial={{opacity: 0, y: 10}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO}}
        >
          Schedule a private consultation to learn more about our ownership
          programmes.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO}}
        >
          <a
            href="/contact?subject=ownership"
            className="btn-slide btn-slide-gold px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
          >
            <span>Schedule Consultation</span>
          </a>
          <a
            href="/brochure?type=ownership"
            className="btn-slide btn-slide-black px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
          >
            <span>Download Brochure</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
