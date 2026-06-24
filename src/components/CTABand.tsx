"use client";
import {useRef} from "react";
import {motion, useScroll, useTransform, useInView} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

export default function CTABand() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.3});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ─── Unique background animation: cream slides up from the bottom ───
  const creamY = useTransform(scrollYProgress, [0.1, 0.4], ["100%", "0%"]);
  const creamOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Gold shimmer that moves upward with the cream edge
  const shimmerY = useTransform(scrollYProgress, [0.1, 0.4], ["100%", "0%"]);
  const shimmerOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.5],
    [0, 0.3, 0],
  );

  // ─── Text colour transitions (light → dark) ───
  const headingColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#E8E9EC", "#1A1A1A"],
  );
  const subColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#C8CAD0", "#5A4E3C"],
  );
  const goldColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#B8955A", "#7A6038"],
  );
  const trustColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["rgba(200,202,208,0.4)", "rgba(60,60,60,0.6)"],
  );

  // ─── Decorative corners animate with the background ───
  const cornerOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* 1. Dark base (permanent) */}
      <div className="absolute inset-0 bg-[#0A0A0B]" />

      {/* 2. Cream layer – slides up from the bottom */}
      <motion.div
        className="absolute inset-0 z-0 bg-[#F5F0EB]"
        style={{
          y: prefersReduced ? "0%" : creamY,
          opacity: prefersReduced ? 1 : creamOpacity,
        }}
      />

      {/* 3. Gold shimmer – follows the rising edge */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            y: shimmerY,
            opacity: shimmerOpacity,
            background:
              "linear-gradient(to top, rgba(184,149,90,0.25) 0%, transparent 70%)",
            height: "40%",
          }}
        />
      )}

      {/* 4. Subtle geometric dot pattern (kept, fades in with cream) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: useTransform(scrollYProgress, [0.15, 0.4], [0, 0.03]),
          backgroundImage:
            "radial-gradient(circle at 30% 40%, #C8A84E 1px, transparent 1px), radial-gradient(circle at 70% 60%, #C8A84E 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            className="text-xs tracking-[0.2em] uppercase mb-5"
            style={{color: goldColor}}
            initial={{opacity: 0, y: 12}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
          >
            Begin Your Journey
          </motion.p>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h2
              id="cta-heading"
              className="text-3xl md:text-5xl lg:text-6xl font-display leading-[1.1] mb-6"
              style={{color: headingColor}}
              initial={prefersReduced ? {opacity: 0} : {y: "100%"}}
              animate={
                inView ? (prefersReduced ? {opacity: 1} : {y: "0%"}) : {}
              }
              transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
            >
              Let&apos;s get to know your
              <br />
              <span style={{color: goldColor}}>preferences.</span>
            </motion.h2>
          </div>

          {/* Subhead */}
          <motion.p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{color: subColor}}
            initial={{opacity: 0, y: 14}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3}}
          >
            We&apos;ll craft a tailored proposal based on your unique needs. No
            generic templates, no pressure. Just expert guidance from our
            dedicated specialists.
          </motion.p>

          {/* Buttons – unified sliding style */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
            initial={{opacity: 0, y: 18}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.45}}
          >
            <a
              href="/contact"
              className="btn-slide btn-slide-gold px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
            >
              <span>Schedule a Consultation</span>
            </a>
            <a
              href="/brochure"
              className="btn-slide btn-slide-black px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
            >
              <span>Request a Brochure</span>
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono tracking-wide"
            style={{color: trustColor}}
            initial={{opacity: 0}}
            animate={inView ? {opacity: 1} : {}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.6}}
          ></motion.div>
        </div>

        {/* Decorative corner borders – fade in as cream appears */}
        <motion.div
          className="absolute left-8 bottom-8 w-12 h-12 border-l border-b border-gold/20 hidden lg:block"
          style={{opacity: cornerOpacity}}
        />
        <motion.div
          className="absolute right-8 top-8 w-12 h-12 border-r border-t border-gold/20 hidden lg:block"
          style={{opacity: cornerOpacity}}
        />
      </div>
    </section>
  );
}
