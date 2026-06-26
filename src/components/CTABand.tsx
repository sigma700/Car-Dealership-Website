"use client";
import {useRef} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import Button from "@/components/Button";

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const SPRING_SMOOTH = {stiffness: 50, damping: 20, mass: 1};

export default function CTABand() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.3});
  const prefersReduced = usePrefersReducedMotion();

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const springBgY = useSpring(bgY, SPRING_SMOOTH);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 px-6 md:px-16"
      style={{background: "#000000"}}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? {} : {y: springBgY}}
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
          }}
        />
      </motion.div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

      {/* Silver radial glow */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 100%, #BCBEC0 0%, transparent 70%)",
        }}
      />

      {/* Top separator line */}
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/30 to-transparent" />

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{opacity: 0, y: 28}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-6 font-mono">
            Al Husnain Motors
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.9] mb-6">
            Your next vehicle is waiting
          </h2>
          <p className="text-sm text-[#BCBEC0]/70 mb-12 max-w-sm mx-auto leading-relaxed">
            Our specialists are ready to help you discover the perfect vehicle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="md" href="tel:+254700000000">
              Call Now <span className="ml-2">→</span>
            </Button>
            <Button variant="outline" size="md" href="/contact">
              Schedule Visit <span className="ml-2">→</span>
            </Button>
            <Button variant="outline" size="md" href="/inventory">
              View Inventory <span className="ml-2">→</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator line */}
      <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/20 to-transparent" />
    </section>
  );
}
