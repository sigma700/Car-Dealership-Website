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

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

export default function BespokeTeaserSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.3});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax background moves slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const springBgY = useSpring(bgY, {stiffness: 60, damping: 18});

  // Content animation
  const contentY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] md:h-[90vh] overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('pexels-masoodaslami-19429389.jpg')",
          y: prefersReduced ? "0%" : springBgY,
          willChange: "transform",
        }}
      />

      {/* Gradient overlay — darker left side for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-[1440px] mx-auto"
        style={prefersReduced ? {} : {y: contentY, opacity: contentOpacity}}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-xs md:text-sm tracking-widest text-[#BCBEC0] mb-3"
          initial={{opacity: 0, x: -16}}
          animate={inView ? {opacity: 1, x: 0} : {}}
          transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
        >
          BESPOKE
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-display text-white leading-[0.92] mb-4 max-w-xl"
          initial={{opacity: 0, y: 30}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO}}
        >
          Crafted for the particular.
        </motion.h2>

        {/* Subhead — sells the benefit */}
        <motion.p
          className="text-md md:text-xl text-[#BCBEC0]/80 max-w-md mb-8"
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO}}
        >
          Tailor every stitch, every finish, every detail to your taste. Our
          bespoke atelier transforms your vision into reality.
        </motion.p>

        {/* CTA — primary white button */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.6, delay: 0.35, ease: EASE_OUT_EXPO}}
        >
          <a
            href="/bespoke"
            className="btn-slide btn-slide-white px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
          >
            <span className="text-black">Explore Bespoke</span>
          </a>
        </motion.div>

        {/* Optional: small stat line */}
        <motion.div
          className="mt-6 flex flex-wrap gap-6 text-xs text-[#BCBEC0]/50 font-mono tracking-wider"
          initial={{opacity: 0}}
          animate={inView ? {opacity: 1} : {}}
          transition={{duration: 0.8, delay: 0.5}}
        >
          <span>✦ 100% Hand‑crafted</span>
          <span>✦ 12‑Week Build Time</span>
          <span>✦ Worldwide Delivery</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
