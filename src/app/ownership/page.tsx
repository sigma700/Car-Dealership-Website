"use client";
import {useRef, useEffect, useState, useCallback} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  AnimatePresence,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.87, 0, 0.13, 1] as const;

// ─── DATA ─────────────────────────────────────────────────────────
const ownershipJourney = [
  {
    step: "01",
    title: "Purchase",
    description:
      "Select from our curated collection. Every acquisition includes a full concierge walkthrough, documentation handling, and a personal delivery schedule built around your calendar.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371001/pexels-silverkblack-36729868_qzw5pq.jpg",
    stat: "48h",
    statLabel: "Average acquisition time",
  },
  {
    step: "02",
    title: "White Glove Delivery",
    description:
      "Your vehicle arrives at your chosen location in a climate-controlled transporter. A dedicated specialist unveils the car, configures every setting, and walks you through each detail.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371019/pexels-andy-lee-222330306-38132275_tdklhs.jpg",
    stat: "100%",
    statLabel: "Home delivery rate",
  },
  {
    step: "03",
    title: "Concierge Programme",
    description:
      "A personal concierge is assigned to you 24/7 — from restaurant reservations to last-minute travel arrangements. Think of it as a lifestyle assistant, included with every vehicle.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782325000/pexels-tima-miroshnichenko-6872167_ia5xri.jpg",
    stat: "24/7",
    statLabel: "Dedicated availability",
  },
  {
    step: "04",
    title: "Maintenance & Care",
    description:
      "Our 5-year comprehensive service plan covers every scheduled maintenance, genuine parts, and labour. Complimentary collection and delivery ensure your schedule is never disrupted.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371027/pexels-19x14-8478259_poygkp.jpg",
    stat: "5yr",
    statLabel: "Full coverage included",
  },
  {
    step: "05",
    title: "Exclusive Events",
    description:
      "Private track days, lifestyle gatherings, and curated owner experiences. Ownership grants access to a calendar of events designed around the Al Husnain community.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371036/pexels-giona-mason-1751396-19200994_grsc8g.jpg",
    stat: "12+",
    statLabel: "Exclusive events per year",
  },
];

const testimonials = [
  {
    quote:
      "Al Husnain redefined what I thought a car buying experience could be. From the first call to the handover, everything felt personal and effortless.",
    author: "Saeed Al Maktoum",
    role: "Businessman & Collector",
    initial: "S",
  },
  {
    quote:
      "The concierge programme is incredible. They once arranged a last-minute private jet transfer for me while my car was being serviced. Above and beyond.",
    author: "Aisha Noor",
    role: "Managing Director",
    initial: "A",
  },
  {
    quote:
      "I never thought maintenance could be so effortless. They collect my car, leave a courtesy vehicle, and return it polished. Every single time.",
    author: "Rashid Al Balushi",
    role: "Entrepreneur",
    initial: "R",
  },
];

const faqs = [
  {
    question: "What does the 5-year service plan include?",
    answer:
      "All scheduled maintenance, genuine parts, and labour as specified in the service booklet. It also covers brake pads, wiper blades, and a full vehicle inspection at each interval , with complimentary collection and delivery.",
  },
  {
    question: "How does the concierge service work?",
    answer:
      "Upon purchase, you're assigned a dedicated concierge reachable 24/7 via phone, WhatsApp, or email. They handle reservations, travel bookings, service scheduling, and any lifestyle requests.",
  },
  {
    question: "Can I customise my ownership plan?",
    answer:
      "Yes. While the standard package includes the 5-year service plan, concierge, and track day access, we tailor additional coverage, extended warranties, and event access to your preferences.",
  },
  {
    question: "Is financing available?",
    answer:
      "We have partnerships with leading regional banks offering competitive rates. Our specialists will present the most suitable options based on your situation during your consultation.",
  },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function OwnershipPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const bgX = useMotionValue(0);
  const bgScale = useMotionValue(1);

  useEffect(() => {
    if (prefersReduced) return;
    const x = animate(bgX, [0, -3, 0, 3, 0], {
      duration: 28,
      repeat: Infinity,
      ease: "linear",
    });
    const s = animate(bgScale, [1, 1.03, 1, 1.03, 1], {
      duration: 34,
      repeat: Infinity,
      ease: "linear",
    });
    return () => {
      x.stop();
      s.stop();
    };
  }, [prefersReduced, bgX, bgScale]);

  const {scrollYProgress: heroScroll} = useScroll({
    target: pageRef,
    offset: ["start start", "30vh start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(heroScroll, [0.6, 1], [1, 0]);
  const contentY = useTransform(heroScroll, [0, 1], ["0%", "12%"]);

  return (
    <div ref={pageRef} className="bg-[#0A0A0B]">
      {/* ─── HERO ─── */}
      <section className="relative h-screen overflow-hidden">
        {/* BG layer — slowest (0.6x) */}
        <motion.div
          className="absolute inset-[-4%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnadawobi/image/upload/v1782370812/pexels-ai25studioai-7144207_sv0es8.jpg')",
            x: prefersReduced ? 0 : bgX,
            scale: prefersReduced ? 1 : bgScale,
            y: prefersReduced ? 0 : heroY,
          }}
        />

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/90 via-[#0A0A0B]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/70 via-transparent to-[#0A0A0B]/30 z-10" />

        {/* Foreground grain texture (pure CSS, premium feel) */}
        <div
          className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Content — foreground (1x) */}
        <motion.div
          className="relative z-30 flex flex-col justify-end h-full max-w-[1440px] mx-auto px-6 md:px-16 pb-20 md:pb-28"
          style={prefersReduced ? {} : {y: contentY, opacity: heroOpacity}}
        >
          <motion.p
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1.0, ease: EASE_OUT_EXPO}}
            className="text-[10px] md:text-xs tracking-[0.35em] text-[#B8955A] mb-8 uppercase"
          >
            Ownership Redefined
          </motion.p>

          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{y: "110%"}}
              animate={{y: "0%"}}
              transition={{duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.1}}
              className="text-5xl md:text-8xl lg:text-[7rem] font-display text-[#F0F1F3] leading-[0.88] tracking-tight"
            >
              Beyond the
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{y: "110%"}}
              animate={{y: "0%"}}
              transition={{duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.18}}
              className="text-5xl md:text-8xl lg:text-[7rem] font-display text-[#B8955A] leading-[0.88] tracking-tight italic"
            >
              drive.
            </motion.h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 max-w-5xl">
            <motion.p
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.4}}
              className="text-sm md:text-base text-[#C8CAD0]/60 max-w-xs leading-relaxed"
            >
              A curated ownership experience that extends far beyond the key
              handover.
            </motion.p>

            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.55}}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/contact?subject=ownership"
                className="btn-slide btn-slide-gold px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
              >
                <span>Schedule Consultation</span>
              </a>
              <a
                href="/models"
                className="btn-slide btn-slide-black px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
              >
                <span>Explore Models</span>
              </a>
            </motion.div>
          </div>

          {/* Scroll nudge */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 1.2, duration: 0.8}}
            className="absolute bottom-8 right-8 md:right-16 flex items-center gap-3 text-[#C8CAD0]/30"
          >
            <motion.div
              className="w-8 h-px bg-[#C8CAD0]/30"
              animate={{scaleX: [0, 1, 0]}}
              transition={{duration: 2.5, repeat: Infinity, ease: "easeInOut"}}
              style={{originX: 0}}
            />
            <span className="text-[9px] tracking-[0.3em] uppercase">
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <TrustStrip />

      {/* ─── OWNERSHIP JOURNEY ─── */}
      <OwnershipJourneySection />

      {/* ─── WHITE GLOVE ─── */}
      <WhiteGloveDelivery />

      {/* ─── CONCIERGE ─── */}
      <ConciergeProgramme />

      {/* ─── MAINTENANCE ─── */}
      <MaintenanceCare />

      {/* ─── EVENTS ─── */}
      <ExclusiveEvents />

      {/* ─── TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── FAQ ─── */}
      <FAQSection />

      {/* ─── FINAL CTA ─── */}
      <FinalCTA />
    </div>
  );
}

// ─── TRUST STRIP ─────────────────────────────────────────────────
function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.5});
  const stats = [
    {value: "2,400+", label: "Vehicles Delivered"},
    {value: "98%", label: "Client Satisfaction"},
    {value: "14yr", label: "Market Presence"},
    {value: "AED 2B+", label: "Vehicles Transacted"},
  ];
  return (
    <div ref={ref} className="border-t border-b border-[#2A2A31] bg-[#111114]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#2A2A31]">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{opacity: 0, y: 16}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, delay: i * 0.08, ease: EASE_OUT_EXPO}}
            className="flex flex-col items-center md:items-start gap-1 md:px-10 first:pl-0"
          >
            <span className="font-mono text-2xl md:text-3xl text-[#B8955A]">
              {s.value}
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[#C8CAD0]/40 uppercase">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── OWNERSHIP JOURNEY (TRUE sticky pin) ─────────────────────────
function OwnershipJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * ownershipJourney.length),
        ownershipJourney.length - 1,
      );
      setActiveStep(idx);
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div
      ref={sectionRef}
      style={{height: `${ownershipJourney.length * 100}vh`}}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex">
        {/* Left: pinned image panel (60%) */}
        <div className="relative w-full lg:w-[58%] h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              className="absolute inset-0"
              initial={{opacity: 0, scale: 1.04}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.98}}
              transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
            >
              <img
                src={ownershipJourney[activeStep].image}
                alt={ownershipJourney[activeStep].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/30 via-transparent to-[#0A0A0B]/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/70 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="absolute bottom-10 left-8 font-mono text-[8rem] leading-none font-bold select-none pointer-events-none"
            style={{color: "rgba(184,149,90,0.12)"}}
          >
            {ownershipJourney[activeStep].step}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.5, ease: EASE_OUT_EXPO}}
              className="absolute bottom-10 right-8 text-right"
            >
              <div className="font-mono text-3xl text-[#B8955A]">
                {ownershipJourney[activeStep].stat}
              </div>
              <div className="text-[10px] tracking-[0.2em] text-[#C8CAD0]/50 uppercase mt-1">
                {ownershipJourney[activeStep].statLabel}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: text panel (40%) */}
        <div className="hidden lg:flex w-[42%] h-full flex-col justify-between bg-[#0A0A0B] px-10 xl:px-16 py-16 border-l border-[#2A2A31]">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-[#B8955A] uppercase mb-16">
              The Journey
            </p>
            <div className="space-y-6">
              {ownershipJourney.map((step, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    if (!sectionRef.current) return;
                    const rect = sectionRef.current.getBoundingClientRect();
                    const topOfSection = window.scrollY + rect.top;
                    const sliceHeight =
                      sectionRef.current.scrollHeight / ownershipJourney.length;
                    window.scrollTo({
                      top: topOfSection + i * sliceHeight + 1,
                      behavior: "smooth",
                    });
                  }}
                  className="flex items-center gap-5 w-full text-left group"
                  animate={{opacity: i === activeStep ? 1 : 0.3}}
                  transition={{duration: 0.4}}
                >
                  <span
                    className="font-mono text-[11px] tracking-wider transition-colors duration-300"
                    style={{color: i === activeStep ? "#B8955A" : "#C8CAD0"}}
                  >
                    {step.step}
                  </span>
                  <div className="flex-1">
                    <div
                      className="h-px transition-all duration-500"
                      style={{
                        background: i === activeStep ? "#B8955A" : "#2A2A31",
                        width: i === activeStep ? "100%" : "40%",
                      }}
                    />
                  </div>
                  <span
                    className="font-display text-sm transition-colors duration-300"
                    style={{color: i === activeStep ? "#F0F1F3" : "#C8CAD0"}}
                  >
                    {step.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{opacity: 0, y: 24}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -16}}
              transition={{duration: 0.55, ease: EASE_OUT_EXPO}}
              className="space-y-6"
            >
              <h2 className="font-display text-4xl xl:text-5xl text-[#F0F1F3] leading-[0.92]">
                {ownershipJourney[activeStep].title}
              </h2>
              <p className="text-sm text-[#C8CAD0]/55 leading-relaxed max-w-sm">
                {ownershipJourney[activeStep].description}
              </p>
              <a
                href="/contact?subject=ownership"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#B8955A] uppercase group"
              >
                <span>Enquire about this stage</span>
                <motion.span
                  animate={{x: [0, 4, 0]}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </AnimatePresence>

          <div className="border-t border-[#2A2A31] pt-6">
            <p className="text-[10px] tracking-[0.2em] text-[#C8CAD0]/30 uppercase mb-1">
              Speak to a specialist
            </p>
            <a
              href="tel:+97100000000"
              className="font-mono text-sm text-[#B8955A] hover:text-[#D4B07A] transition-colors"
            >
              +971 00 000 0000
            </a>
          </div>
        </div>

        {/* Mobile: bottom text band */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.5, ease: EASE_OUT_EXPO}}
            className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0B] to-transparent px-6 pb-8 pt-20"
          >
            <p className="text-[10px] tracking-[0.3em] text-[#B8955A] uppercase mb-2">
              {ownershipJourney[activeStep].step} — The Journey
            </p>
            <h2 className="font-display text-3xl text-[#F0F1F3] mb-3">
              {ownershipJourney[activeStep].title}
            </h2>
            <p className="text-xs text-[#C8CAD0]/60 leading-relaxed max-w-sm">
              {ownershipJourney[activeStep].description}
            </p>
            <div className="flex gap-2 mt-5">
              {ownershipJourney.map((_, i) => (
                <div
                  key={i}
                  className="h-px transition-all duration-500"
                  style={{
                    width: i === activeStep ? 32 : 16,
                    background: i === activeStep ? "#B8955A" : "#2A2A31",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── WHITE GLOVE DELIVERY (Image after text) ─────────────────────
function WhiteGloveDelivery() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.25});
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section ref={sectionRef} className="relative bg-[#F0F1F3] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-20">
        {/* Text first */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            className="lg:col-span-2 hidden lg:block"
            initial={{opacity: 0}}
            animate={inView ? {opacity: 1} : {}}
            transition={{duration: 1, delay: 0.4}}
          >
            <span className="font-mono text-[6rem] leading-none text-[#B8955A]/15 select-none">
              02
            </span>
          </motion.div>

          <div className="lg:col-span-5">
            <motion.p
              initial={{opacity: 0, x: -16}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2}}
              className="text-[10px] tracking-[0.35em] text-[#7A6038] uppercase mb-5"
            >
              Delivery
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.25}}
                className="font-display text-4xl md:text-6xl text-[#1A1A1A] leading-[0.9]"
              >
                Arrives in
                <br />
                <span className="text-[#B8955A] italic">perfection.</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={{opacity: 0, y: 24}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.4}}
          >
            <p className="text-sm text-[#5A4E3C]/80 leading-relaxed mb-8">
              Your vehicle is delivered in a fully enclosed, climate-controlled
              transporter. A dedicated specialist will unveil it at your chosen
              location, walk you through every detail, and ensure everything is
              precisely to your liking before you take the wheel.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Enclosed, climate-controlled transport",
                "Personal orientation by a specialist",
                "Your choice of time and location",
                "Full documentation handled on-site",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{opacity: 0, x: 16}}
                  animate={inView ? {opacity: 1, x: 0} : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.07,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="flex items-center gap-3 text-xs text-[#5A4E3C] tracking-wide"
                >
                  <span className="w-1 h-1 rounded-full bg-[#B8955A] flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <a
              href="/contact?subject=delivery"
              className="btn-slide btn-slide-black px-8 py-3 text-base font-medium tracking-wide inline-flex items-center justify-center"
            >
              <span>Arrange Delivery</span>
            </a>
          </motion.div>
        </div>

        {/* Image after text — full bleed clip reveal */}
        <motion.div
          className="relative mt-16 h-[70vh] overflow-hidden rounded-2xl"
          initial={{clipPath: "inset(0 40% 0 40%)"}}
          animate={inView ? {clipPath: "inset(0 0% 0 0%)"} : {}}
          transition={{duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.1}}
        >
          <div className="w-full h-full">
            <img
              src="https://res.cloudinary.com/dnadawobi/image/upload/v1782371278/pexels-roman-chernov-812606789-38164944_1_b7fizs.jpg"
              alt="White glove delivery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F0F1F3] via-transparent to-[#F0F1F3]/30" />
          </div>
        </motion.div>

        {/* Marquee */}
        <motion.div
          className="mt-16 overflow-hidden border-t border-[#1A1A1A]/10 pt-6"
          style={
            prefersReduced
              ? {}
              : {
                  x: useTransform(
                    useScroll({
                      target: sectionRef,
                      offset: ["start end", "end start"],
                    }).scrollYProgress,
                    [0, 1],
                    ["4%", "-4%"],
                  ),
                }
          }
        >
          <p className="font-display text-[3.5rem] md:text-[5rem] text-[#1A1A1A]/05 whitespace-nowrap leading-none tracking-tight select-none">
            WHITE GLOVE DELIVERY · ANYWHERE IN THE UAE · WHITE GLOVE DELIVERY ·
            ANYWHERE IN THE UAE ·
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CONCIERGE PROGRAMME ──────────────────────────────────────
function ConciergeProgramme() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.2});

  const pillars = [
    {
      icon: "◈",
      title: "24/7 Availability",
      body: "Call, message, or email. Your dedicated concierge responds in under 4 minutes, any time of day.",
    },
    {
      icon: "◎",
      title: "Travel & Dining",
      body: "Flights, hotels, restaurants, and transfers — arranged before you ask.",
    },
    {
      icon: "◇",
      title: "Vehicle Care",
      body: "Service scheduling, collection, delivery, and detailing — we manage every detail.",
    },
    {
      icon: "◉",
      title: "Lifestyle Requests",
      body: "Events, gifting, security arrangements, and anything else that needs to be handled discreetly.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0B] overflow-hidden py-28 md:py-40"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(184,149,90,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(184,149,90,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <div>
            <motion.p
              initial={{opacity: 0, x: -16}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
              className="text-[10px] tracking-[0.35em] text-[#B8955A] uppercase mb-4"
            >
              Concierge Programme
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
                className="font-display text-4xl md:text-6xl text-[#F0F1F3] leading-[0.9]"
              >
                Life,
                <br />
                <span className="text-[#B8955A] italic">simplified.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO}}
            className="text-sm text-[#C8CAD0]/50 leading-relaxed max-w-md lg:ml-auto"
          >
            From the moment you take ownership, a dedicated specialist becomes
            an extension of your life. No request is too small. No detail goes
            unnoticed.
          </motion.p>
        </div>

        <div className="border-t border-[#2A2A31]">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0}}
              animate={inView ? {opacity: 1} : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.09,
                ease: EASE_OUT_EXPO,
              }}
              className="group grid grid-cols-12 items-center gap-6 py-7 border-b border-[#2A2A31] hover:border-[#B8955A]/30 transition-colors duration-500 cursor-default"
            >
              <span className="col-span-1 font-mono text-xs text-[#C8CAD0]/20 group-hover:text-[#B8955A]/40 transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-1 text-xl text-[#B8955A]/40 group-hover:text-[#B8955A] transition-colors duration-400">
                {p.icon}
              </span>
              <h3 className="col-span-3 font-display text-lg md:text-xl text-[#F0F1F3] group-hover:text-[#B8955A] transition-colors duration-300">
                {p.title}
              </h3>
              <p className="col-span-6 text-xs text-[#C8CAD0]/40 leading-relaxed group-hover:text-[#C8CAD0]/70 transition-colors duration-400">
                {p.body}
              </p>
              <motion.span className="col-span-1 text-[#B8955A] text-sm justify-self-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{opacity: 0, y: 16}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, delay: 0.6, ease: EASE_OUT_EXPO}}
          className="mt-12"
        >
          <a
            href="/contact?subject=concierge"
            className="btn-slide btn-slide-dark px-8 py-3 text-base font-medium tracking-wide inline-flex items-center justify-center"
          >
            <span>Enquire About Concierge</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MAINTENANCE & CARE ───────────────────────────────────────
function MaintenanceCare() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.2});

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F0F1F3]">
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        <div className="w-full lg:w-1/2 px-6 md:px-16 py-24 md:py-32 flex flex-col justify-center">
          <motion.p
            initial={{opacity: 0, x: -16}}
            animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
            className="text-[10px] tracking-[0.35em] text-[#7A6038] uppercase mb-6"
          >
            Maintenance & Care
          </motion.p>
          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{y: "105%"}}
              animate={inView ? {y: "0%"} : {}}
              transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
              className="font-display text-4xl md:text-6xl text-[#1A1A1A] leading-[0.9]"
            >
              Five years of
              <br />
              <span className="text-[#B8955A] italic">absolute certainty.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{opacity: 0, y: 16}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.25, ease: EASE_OUT_EXPO}}
            className="text-sm text-[#5A4E3C]/80 leading-relaxed max-w-md mb-10"
          >
            Every Al Husnain vehicle comes with a comprehensive 5-year service
            plan that removes uncertainty from ownership entirely. Genuine
            parts, certified technicians, and collection on demand.
          </motion.p>

          <div className="grid grid-cols-3 gap-6 mb-10 border-t border-[#1A1A1A]/10 pt-8">
            {[
              {value: "5", unit: "Years", label: "Full Coverage"},
              {value: "100%", unit: "", label: "Genuine Parts"},
              {value: "0", unit: "AED", label: "Hidden Costs"},
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{opacity: 0, y: 20}}
                animate={inView ? {opacity: 1, y: 0} : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <div className="font-mono text-3xl md:text-4xl text-[#B8955A] leading-none mb-1">
                  {s.value}
                  {s.unit && <span className="text-base ml-0.5">{s.unit}</span>}
                </div>
                <div className="text-[10px] tracking-[0.15em] text-[#5A4E3C]/50 uppercase">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.blockquote
            initial={{opacity: 0, x: -16}}
            animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.8, delay: 0.5, ease: EASE_OUT_EXPO}}
            className="border-l-2 border-[#B8955A] pl-5"
          >
            <p className="text-sm text-[#5A4E3C] italic leading-relaxed mb-2">
              "They collect my car, leave a courtesy vehicle, and return it
              polished. Every single time."
            </p>
            <footer className="text-[10px] tracking-[0.2em] text-[#7A6038] uppercase">
              Rashid Al Balushi — Entrepreneur
            </footer>
          </motion.blockquote>
        </div>

        <motion.div
          className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-full overflow-hidden"
          initial={{clipPath: "inset(0 0 100% 0)"}}
          animate={inView ? {clipPath: "inset(0 0 0% 0)"} : {}}
          transition={{duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.15}}
        >
          <img
            src="https://res.cloudinary.com/dnadawobi/image/upload/v1782371027/pexels-19x14-8478259_poygkp.jpg"
            alt="Maintenance and care"
            className="w-full h-full object-cover min-h-[50vh]"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── EXCLUSIVE EVENTS ─────────────────────────────────────────
function ExclusiveEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.15});

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0B] py-28 md:py-40 overflow-hidden px-6 md:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end mb-16 gap-8">
          <div className="lg:col-span-6">
            <motion.p
              initial={{opacity: 0, x: -16}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
              className="text-[10px] tracking-[0.35em] text-[#B8955A] uppercase mb-4"
            >
              Exclusive Events
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
                className="font-display text-4xl md:text-6xl text-[#F0F1F3] leading-[0.9]"
              >
                More than
                <br />
                <span className="text-[#B8955A] italic">just cars.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{opacity: 0, y: 16}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO}}
            className="lg:col-span-4 lg:col-start-9 text-sm text-[#C8CAD0]/40 leading-relaxed"
          >
            Ownership opens doors to a curated calendar of private track days,
            lifestyle gatherings, and owner-only experiences throughout the
            year.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <motion.div
            initial={{opacity: 0, y: 40}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.2}}
            className="lg:col-span-5 relative overflow-hidden group"
            style={{minHeight: 520}}
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{scale: 1.03}}
              transition={{duration: 0.7, ease: EASE_OUT}}
            >
              <img
                src="https://res.cloudinary.com/dnadawobi/image/upload/v1782323660/pexels-mikebirdy-18231618_g1ljyu.jpg"
                alt="Track experience"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-[9px] tracking-[0.3em] text-[#B8955A] uppercase mb-1">
                Annual
              </p>
              <h3 className="font-display text-xl text-[#F0F1F3]">
                Track Experience
              </h3>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4 lg:gap-6">
            <motion.div
              initial={{opacity: 0, y: 40}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.32}}
              className="relative overflow-hidden col-span-2 group"
              style={{minHeight: 250}}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{scale: 1.03}}
                transition={{duration: 0.7, ease: EASE_OUT}}
              >
                <img
                  src="https://res.cloudinary.com/dnadawobi/image/upload/v1782323634/pexels-memet-oz-296480690-17436155_fr9swt.jpg"
                  alt="Lifestyle gathering"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-display text-lg text-[#F0F1F3]">
                  Lifestyle Gatherings
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 40}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.4}}
              className="relative overflow-hidden col-span-2 group"
              style={{minHeight: 240}}
            >
              <div className="absolute inset-0 bg-[#111114] border border-[#2A2A31]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <span className="font-mono text-4xl text-[#B8955A] mb-2">
                  12+
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#C8CAD0]/40 uppercase">
                  Exclusive events per year
                </span>
                <a
                  href="/contact?subject=events"
                  className="mt-6 text-[10px] tracking-[0.2em] text-[#B8955A] uppercase border-b border-[#B8955A]/30 pb-px hover:border-[#B8955A] transition-colors"
                >
                  View Event Calendar →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────
function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.2});

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F0F1F3] py-28 md:py-40 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.p
              initial={{opacity: 0, x: -16}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
              className="text-[10px] tracking-[0.35em] text-[#7A6038] uppercase mb-4"
            >
              Client Voices
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
                className="font-display text-4xl md:text-6xl text-[#1A1A1A] leading-[0.9]"
              >
                Trusted by
                <br />
                <span className="text-[#B8955A] italic">
                  discerning owners.
                </span>
              </motion.h2>
            </div>
          </div>
        </div>

        <div className="space-y-0 border-t border-[#1A1A1A]/10">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{opacity: 0, y: 24}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.12,
                ease: EASE_OUT_EXPO,
              }}
              className="group grid grid-cols-12 items-start gap-6 py-10 border-b border-[#1A1A1A]/10 hover:border-[#B8955A]/20 transition-colors duration-500"
            >
              <div className="col-span-1 hidden lg:flex">
                <div className="w-9 h-9 rounded-full bg-[#B8955A]/10 border border-[#B8955A]/20 flex items-center justify-center">
                  <span className="font-mono text-xs text-[#B8955A]">
                    {t.initial}
                  </span>
                </div>
              </div>
              <p className="col-span-12 lg:col-span-8 font-display text-xl md:text-2xl text-[#1A1A1A] leading-[1.3] italic group-hover:text-[#3A3A3A] transition-colors duration-300">
                "{t.quote}"
              </p>
              <footer className="col-span-12 lg:col-span-3 lg:col-start-10 text-right">
                <p className="text-xs text-[#1A1A1A] font-medium tracking-wide mb-0.5">
                  {t.author}
                </p>
                <p className="text-[10px] tracking-[0.15em] text-[#5A4E3C]/50 uppercase">
                  {t.role}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────
function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.15});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0B] py-28 md:py-40 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <motion.p
            initial={{opacity: 0, x: -16}}
            animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
            className="text-[10px] tracking-[0.35em] text-[#B8955A] uppercase mb-4"
          >
            FAQ
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{y: "105%"}}
              animate={inView ? {y: "0%"} : {}}
              transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
              className="font-display text-4xl text-[#F0F1F3] leading-[0.9] mb-6"
            >
              You ask.
              <br />
              <span className="text-[#B8955A] italic">We answer.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{opacity: 0, y: 14}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, delay: 0.25, ease: EASE_OUT_EXPO}}
            className="text-xs text-[#C8CAD0]/40 leading-relaxed mb-8"
          >
            Still have questions? Our specialists are available to speak with
            you directly.
          </motion.p>
          <motion.div
            initial={{opacity: 0}}
            animate={inView ? {opacity: 1} : {}}
            transition={{duration: 0.7, delay: 0.35}}
          >
            <a
              href="tel:+97100000000"
              className="btn-slide btn-slide-gold px-8 py-3 text-base font-medium tracking-wide inline-flex items-center justify-center"
            >
              <span>Call a Specialist</span>
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 border-t border-[#2A2A31]">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0}}
              animate={inView ? {opacity: 1} : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.08,
                ease: EASE_OUT_EXPO,
              }}
              className="border-b border-[#2A2A31]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-7 text-left group"
              >
                <span className="font-display text-base md:text-lg text-[#F0F1F3] group-hover:text-[#B8955A] transition-colors duration-300 leading-snug">
                  {faq.question}
                </span>
                <motion.span
                  animate={{rotate: openIndex === i ? 45 : 0}}
                  transition={{duration: 0.3, ease: EASE_OUT}}
                  className="text-[#B8955A] text-xl mt-0.5 flex-shrink-0"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: "auto", opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{duration: 0.4, ease: EASE_OUT}}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[#C8CAD0]/50 leading-relaxed pb-7 max-w-lg">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ─────────────────────────────────────────────────
function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.25});
  const prefersReduced = usePrefersReducedMotion();

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "10%"]);
  const springBgY = useSpring(bgY, {stiffness: 60, damping: 20, mass: 1});

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 px-6 md:px-16"
      style={{background: "#12100d"}}
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

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12100d]/80 via-[#12100d]/50 to-[#12100d]/90" />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 100%, #C4A46B 0%, transparent 70%)",
        }}
      />

      {/* Top separator line */}
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#B8955A]/30 to-transparent" />

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={prefersReduced ? {} : {opacity: 0, y: 28}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
        >
          <p className="text-[10px] tracking-[0.4em] text-[#B8955A] uppercase mb-6 font-mono">
            Al Husnain Ownership
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-[#F0F1F3] leading-[0.9] mb-6">
            Ready to experience
            <br />
            <span className="text-[#B8955A] italic">the difference?</span>
          </h2>
          <p className="text-sm text-[#C8CAD0]/55 mb-12 max-w-sm mx-auto leading-relaxed">
            Our ownership specialists are standing by to craft a programme
            tailored to your life. No obligation – just a conversation.
          </p>

          {/* CTA buttons – same design as Inventory page */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a
              href="/contact?subject=ownership"
              className="btn-slide btn-slide-gold px-8 py-3.5 text-sm font-medium"
            >
              <span>Schedule Consultation</span>
            </a>
            <a
              href="/contact?subject=test-drive"
              className="btn-slide btn-slide-black px-8 py-3.5 text-sm font-medium"
            >
              <span>Book Test Drive</span>
            </a>
          </div>

          {/* Contact row – adds trust and immediacy */}
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="tel:+254700000000"
              className="flex items-center gap-2 text-sm text-[#C8CAD0]/60 hover:text-[#B8955A] transition-colors duration-300 group"
            >
              <span className="w-8 h-8 rounded-full border border-[#2A2A31] group-hover:border-[#B8955A]/40 flex items-center justify-center text-xs transition-colors duration-300">
                ☎
              </span>
              <span className="font-mono">+254 700 000 000</span>
            </a>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#C8CAD0]/60 hover:text-[#B8955A] transition-colors duration-300 group"
            >
              <span className="w-8 h-8 rounded-full border border-[#2A2A31] group-hover:border-[#B8955A]/40 flex items-center justify-center text-xs transition-colors duration-300">
                ✉
              </span>
              <span className="font-mono">WhatsApp Us</span>
            </a>
            <span className="flex items-center gap-2 text-sm text-[#C8CAD0]/40">
              <span className="w-8 h-8 rounded-full border border-[#1A1A1E] flex items-center justify-center text-xs">
                ⌚
              </span>
              <span className="font-mono">Mon–Sat, 8am–6pm</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator line */}
      <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#2A2A31] to-transparent" />
    </section>
  );
}
