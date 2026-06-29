"use client";

import {useRef, useState, useEffect} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import Button from "@/components/Button";
import CTABand from "@/components/CTABand";

// ─── Easing ─────────────────────────────────────────────────────────
const EXPO = [0.19, 1, 0.22, 1] as const;
const OUT = [0.16, 1, 0.3, 1] as const;

// ─── Data ───────────────────────────────────────────────────────────
const JOURNEY = [
  {
    step: "01",
    title: "Selection",
    description:
      "Choose from our hand-curated collection of certified vehicles. Every acquisition is supported by transparent documentation, a full inspection report, and a personal handover schedule built around you.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371001/pexels-silverkblack-36729868_qzw5pq.jpg",
    stat: "48h",
    statLabel: "Average acquisition time",
  },
  {
    step: "02",
    title: "Delivery",
    description:
      "Your vehicle is delivered to your home, office, or any location across Kenya. A dedicated specialist arrives with it, walks you through every feature, and ensures everything is precisely to your standard.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371019/pexels-andy-lee-222330306-38132275_tdklhs.jpg",
    stat: "100%",
    statLabel: "Doorstep delivery rate",
  },
  {
    step: "03",
    title: "Dedicated Support",
    description:
      "A personal advisor remains available throughout your ownership — for service scheduling, documentation, insurance liaison, or simply answering questions. One number. Always answered.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782325000/pexels-tima-miroshnichenko-6872167_ia5xri.jpg",
    stat: "24/7",
    statLabel: "Advisor availability",
  },
  {
    step: "04",
    title: "Maintenance",
    description:
      "Our service plan covers all scheduled maintenance using genuine parts and factory-trained technicians. We collect your vehicle and return it to you — your schedule is never interrupted.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371027/pexels-19x14-8478259_poygkp.jpg",
    stat: "3yr",
    statLabel: "Comprehensive coverage",
  },
  {
    step: "05",
    title: "Community",
    description:
      "Ownership brings access to a private community of like-minded collectors and executives. Driving events, private previews, and curated experiences — designed for those who appreciate the finer things.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371036/pexels-giona-mason-1751396-19200994_grsc8g.jpg",
    stat: "8+",
    statLabel: "Owner events per year",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The level of attention after purchase was something I had never experienced at a dealership before. They genuinely treat you as a long-term client, not a transaction.",
    author: "James K.",
    role: "CEO, Nairobi",
    initial: "J",
  },
  {
    quote:
      "I've bought cars from dealers in London and Dubai. Al Husnain gave me the same standard of experience here in Kenya. That is rare and genuinely impressive.",
    author: "Amina W.",
    role: "Managing Director",
    initial: "A",
  },
  {
    quote:
      "They collected my car for service, left a courtesy vehicle, and returned it detailed and on time. I didn't lift a finger. That is what premium ownership should feel like.",
    author: "David M.",
    role: "Entrepreneur",
    initial: "D",
  },
];

const FAQS = [
  {
    question: "What does the service plan include?",
    answer:
      "All manufacturer-scheduled maintenance including genuine parts, labour, and a full inspection at each interval. We handle collection and return at no additional cost — your time is valuable.",
  },
  {
    question: "How does delivery work?",
    answer:
      "We deliver to any location across Kenya. Our specialist arrives with the vehicle, conducts a complete orientation, and ensures you're fully comfortable before leaving. There is no rush.",
  },
  {
    question: "Can I customise my ownership package?",
    answer:
      "Yes. Extended warranty, additional coverage tiers, and bespoke service agreements are all available. We tailor each arrangement to the client's specific needs.",
  },
  {
    question: "Is financing available?",
    answer:
      "We have relationships with a number of Kenyan financial institutions and can facilitate competitive vehicle financing. Your advisor will walk through the most suitable options during your consultation.",
  },
];

// ─── Page ───────────────────────────────────────────────────────────
export default function OwnershipPage() {
  return (
    <div className="bg-black">
      <OwnershipHero />
      <TrustStrip />
      <OwnershipJourneySection />
      <DeliverySection />
      <SupportSection />
      <MaintenanceSection />
      <EventsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTABand />
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────
function OwnershipHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const springImgY = useSpring(imgY, {stiffness: 55, damping: 18});
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -36]);
  const indicatorOp = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Ownership programme"
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={reduced ? {} : {y: springImgY}}
        >
          <img
            src="https://res.cloudinary.com/dnadawobi/image/upload/v1782370812/pexels-ai25studioai-7144207_sv0es8.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            style={{willChange: "transform"}}
          />
        </motion.div>

        {/* Vignette — even, not directional */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.68) 100%)",
              "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 32%, transparent 62%, rgba(0,0,0,0.52) 100%)",
            ].join(", "),
          }}
          aria-hidden
        />

        {/* Film grain */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{opacity: 0.028, mixBlendMode: "overlay"}}
          aria-hidden
        >
          <filter id="hg">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hg)" />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        style={reduced ? {} : {opacity: contentOpacity, y: contentY}}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-[9px] md:text-[10px] tracking-[0.38em] uppercase text-[#BCBEC0]/45 font-medium mb-8"
          initial={{opacity: 0, y: 8}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1.0, ease: EXPO, delay: 0.1}}
        >
          Al Husnain · Ownership Programme
        </motion.p>

        {/* Headline */}
        <h1
          className="leading-none mb-8"
          aria-label="Ownership that continues long after delivery."
        >
          <div className="overflow-hidden">
            <motion.span
              className="block font-display font-bold text-white tracking-tight"
              style={{fontSize: "clamp(2.6rem,7.8vw,7.5rem)", lineHeight: 0.9}}
              initial={{clipPath: "inset(0 100% 0 0)", opacity: 0}}
              animate={{clipPath: "inset(0 0% 0 0)", opacity: 1}}
              transition={{duration: 1.15, ease: EXPO, delay: 0.22}}
            >
              Ownership that continues
            </motion.span>
          </div>
          <div className="overflow-hidden mt-1">
            <motion.span
              className="block font-display font-bold text-[#BCBEC0] tracking-tight"
              style={{fontSize: "clamp(2.6rem,7.8vw,7.5rem)", lineHeight: 0.9}}
              initial={{clipPath: "inset(0 100% 0 0)", opacity: 0}}
              animate={{clipPath: "inset(0 0% 0 0)", opacity: 1}}
              transition={{duration: 1.15, ease: EXPO, delay: 0.33}}
            >
              long after delivery.
            </motion.span>
          </div>
        </h1>

        {/* Subline */}
        <motion.p
          className="text-sm md:text-[15px] text-[#BCBEC0]/60 leading-[1.8] mb-10"
          style={{maxWidth: "min(540px, 88vw)"}}
          initial={{opacity: 0, y: 14}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.9, ease: OUT, delay: 0.52}}
        >
          Every vehicle we sell comes with a complete support structure —
          personal advisors, doorstep maintenance, and a community built for
          those who expect more from their dealership.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.85, ease: OUT, delay: 0.66}}
        >
          <Button variant="secondary" size="lg">
            Speak to an Advisor
          </Button>
        </motion.div>

        {/* Subtle trust line */}
        <motion.p
          className="mt-8 text-[10px] tracking-[0.2em] uppercase text-[#BCBEC0]/28"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1.0, duration: 0.8}}
        >
          Nairobi · Est. 2010 · Authorised by leading manufacturers
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1.3, duration: 0.7}}
        style={reduced ? {} : {opacity: indicatorOp}}
        aria-hidden
      >
        <span className="text-[8px] tracking-[0.32em] uppercase text-[#BCBEC0]/30">
          Scroll
        </span>
        <motion.div
          className="w-px bg-[#BCBEC0]/22 origin-top"
          animate={{scaleY: [0.3, 1, 0.3]}}
          transition={{duration: 2.2, repeat: Infinity, ease: "easeInOut"}}
          style={{height: 28}}
        />
      </motion.div>
    </section>
  );
}

// ─── Trust strip ─────────────────────────────────────────────────────
function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.5});

  const STATS = [
    {value: "1,200+", label: "Vehicles Delivered"},
    {value: "14yr", label: "In the Kenyan Market"},
    {value: "98%", label: "Client Retention"},
    {value: "KSh 8B+", label: "Vehicles Transacted"},
  ];

  return (
    <div ref={ref} className="border-t border-b border-[#BCBEC0]/15 bg-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#BCBEC0]/15">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{opacity: 0, y: 14}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, delay: i * 0.08, ease: EXPO}}
            className="flex flex-col items-center md:items-start gap-1 px-6 py-6 md:py-0 first:pl-0 md:first:pl-0"
          >
            <span className="font-display text-2xl md:text-3xl text-[#BCBEC0] font-semibold">
              {s.value}
            </span>
            <span className="text-[10px] tracking-[0.18em] text-[#BCBEC0]/38 uppercase">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Ownership journey (scroll-driven) ───────────────────────────────
function OwnershipJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActive(Math.min(Math.floor(v * JOURNEY.length), JOURNEY.length - 1));
    });
  }, [scrollYProgress]);

  return (
    <div
      ref={sectionRef}
      style={{height: `${JOURNEY.length * 100}vh`}}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex">
        {/* Image panel */}
        <div className="relative w-full lg:w-[58%] h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{opacity: 0, scale: 1.04}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.97}}
              transition={{duration: 0.75, ease: EXPO}}
            >
              <img
                src={JOURNEY[active].image}
                alt={JOURNEY[active].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Step watermark */}
          <div
            className="absolute bottom-10 left-8 font-display font-bold leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(5rem,12vw,9rem)",
              color: "rgba(188,190,192,0.10)",
            }}
            aria-hidden
          >
            {JOURNEY[active].step}
          </div>

          {/* Stat */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.45, ease: EXPO}}
              className="absolute bottom-10 right-8 text-right"
            >
              <p className="font-display text-3xl text-[#BCBEC0] font-semibold">
                {JOURNEY[active].stat}
              </p>
              <p className="text-[10px] tracking-[0.18em] text-[#BCBEC0]/45 uppercase mt-1">
                {JOURNEY[active].statLabel}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content panel — desktop */}
        <div className="hidden lg:flex w-[42%] h-full flex-col justify-between bg-black px-10 xl:px-16 py-16 border-l border-[#BCBEC0]/15">
          <div>
            <p className="text-[10px] tracking-[0.32em] text-[#BCBEC0]/50 uppercase mb-14 font-medium">
              The Ownership Journey
            </p>
            <nav className="space-y-5" aria-label="Journey steps">
              {JOURNEY.map((step, i) => (
                <motion.button
                  key={step.step}
                  onClick={() => {
                    if (!sectionRef.current) return;
                    const top =
                      window.scrollY +
                      sectionRef.current.getBoundingClientRect().top;
                    const slice =
                      sectionRef.current.scrollHeight / JOURNEY.length;
                    window.scrollTo({
                      top: top + i * slice + 1,
                      behavior: "smooth",
                    });
                  }}
                  animate={{opacity: i === active ? 1 : 0.28}}
                  transition={{duration: 0.4}}
                  className="flex items-center gap-4 w-full text-left"
                >
                  <span className="text-[11px] tracking-wider text-[#BCBEC0] font-mono w-6 flex-shrink-0">
                    {step.step}
                  </span>
                  <div
                    className="flex-1 h-px transition-all duration-500"
                    style={{
                      background:
                        i === active ? "#BCBEC0" : "rgba(188,190,192,0.2)",
                      transform: `scaleX(${i === active ? 1 : 0.4})`,
                      transformOrigin: "left",
                    }}
                  />
                  <span
                    className="text-sm transition-colors duration-300"
                    style={{color: i === active ? "#fff" : "#BCBEC0"}}
                  >
                    {step.title}
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -12}}
              transition={{duration: 0.5, ease: EXPO}}
              className="space-y-5"
            >
              <h2 className="font-display text-4xl xl:text-5xl text-white leading-[0.92] font-bold">
                {JOURNEY[active].title}
              </h2>
              <p className="text-sm text-[#BCBEC0]/52 leading-relaxed max-w-sm">
                {JOURNEY[active].description}
              </p>
              <a
                href="/contact?subject=ownership"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#BCBEC0] uppercase group"
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

          <div className="border-t border-[#BCBEC0]/15 pt-6">
            <p className="text-[10px] tracking-[0.18em] text-[#BCBEC0]/28 uppercase mb-1">
              Speak to a specialist
            </p>
            <a
              href="tel:+254700000000"
              className="text-sm text-[#BCBEC0] hover:text-white transition-colors duration-300"
            >
              +254 700 000 000
            </a>
          </div>
        </div>

        {/* Mobile overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.45, ease: EXPO}}
            className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent px-6 pb-10 pt-24"
          >
            <p className="text-[10px] tracking-[0.28em] text-[#BCBEC0]/55 uppercase mb-2">
              {JOURNEY[active].step} — Journey
            </p>
            <h2 className="font-display text-3xl text-white font-bold mb-3">
              {JOURNEY[active].title}
            </h2>
            <p className="text-xs text-[#BCBEC0]/55 leading-relaxed">
              {JOURNEY[active].description}
            </p>
            <div className="flex gap-2 mt-5">
              {JOURNEY.map((_, i) => (
                <div
                  key={i}
                  className="h-px transition-all duration-500"
                  style={{
                    width: i === active ? 28 : 14,
                    background:
                      i === active ? "#BCBEC0" : "rgba(188,190,192,0.22)",
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

// ─── Shared section wrapper ──────────────────────────────────────────
function SectionShell({
  children,
  bg = "bg-white",
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${bg}`}>{children}</section>
  );
}

// ─── Delivery ───────────────────────────────────────────────────────
function DeliverySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});

  return (
    <SectionShell>
      <section ref={ref}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-5">
              <motion.p
                initial={{opacity: 0, x: -14}}
                animate={inView ? {opacity: 1, x: 0} : {}}
                transition={{duration: 0.7, ease: EXPO}}
                className="text-[10px] tracking-[0.32em] text-[#BCBEC0] uppercase mb-5 font-medium"
              >
                Doorstep Delivery
              </motion.p>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{y: "105%"}}
                  animate={inView ? {y: "0%"} : {}}
                  transition={{duration: 1.0, ease: EXPO, delay: 0.12}}
                  className="font-display text-4xl md:text-5xl lg:text-6xl text-black leading-[0.9] font-bold"
                >
                  Arrives precisely
                  <br />
                  <span className="text-[#BCBEC0] italic">as expected.</span>
                </motion.h2>
              </div>
            </div>

            <motion.div
              className="lg:col-span-6 lg:col-start-7"
              initial={{opacity: 0, y: 20}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.85, ease: EXPO, delay: 0.28}}
            >
              <p className="text-sm text-black/60 leading-relaxed mb-8 max-w-md">
                We deliver to any address across Kenya. A specialist arrives
                with your vehicle, conducts a full orientation, and ensures
                every setting and feature is to your liking before leaving.
              </p>
              <ul className="space-y-3 mb-9">
                {[
                  "Fully enclosed transport across Kenya",
                  "Personal specialist accompanies every delivery",
                  "Delivery time and location chosen by you",
                  "All paperwork completed on-site",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{opacity: 0, x: 14}}
                    animate={inView ? {opacity: 1, x: 0} : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.38 + i * 0.07,
                      ease: EXPO,
                    }}
                    className="flex items-center gap-3 text-xs text-black/55 tracking-wide"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#BCBEC0] flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Button variant="primary" size="md">
                Arrange Your Delivery
              </Button>
            </motion.div>
          </div>

          {/* Full-width image reveal */}
          <motion.div
            className="relative h-[65vh] overflow-hidden rounded-xl"
            initial={{clipPath: "inset(0 38% 0 38%)"}}
            animate={inView ? {clipPath: "inset(0 0% 0 0%)"} : {}}
            transition={{duration: 1.4, ease: EXPO, delay: 0.08}}
          >
            <img
              src="https://res.cloudinary.com/dnadawobi/image/upload/v1782371278/pexels-roman-chernov-812606789-38164944_1_b7fizs.jpg"
              alt="White-glove vehicle delivery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/25" />
          </motion.div>
        </div>
      </section>
    </SectionShell>
  );
}

// ─── Support ─────────────────────────────────────────────────────────
function SupportSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.15});

  const PILLARS = [
    {
      icon: "◈",
      title: "Always Available",
      body: "Your advisor is reachable by call, WhatsApp, or email. Response times are measured in minutes, not days.",
    },
    {
      icon: "◎",
      title: "Service Coordination",
      body: "We schedule, collect, and return your vehicle for every service appointment. You don't need to manage a thing.",
    },
    {
      icon: "◇",
      title: "Documentation",
      body: "Insurance renewals, logbook transfers, and compliance paperwork — handled accurately and on time.",
    },
    {
      icon: "◉",
      title: "Discretion",
      body: "Every client interaction is handled with the confidentiality and professionalism that high-profile buyers require.",
    },
  ];

  return (
    <SectionShell bg="bg-black">
      <section ref={ref} className="py-28 md:py-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
            <div>
              <motion.p
                initial={{opacity: 0, x: -14}}
                animate={inView ? {opacity: 1, x: 0} : {}}
                transition={{duration: 0.7, ease: EXPO}}
                className="text-[10px] tracking-[0.32em] text-[#BCBEC0]/55 uppercase mb-4 font-medium"
              >
                Dedicated Support
              </motion.p>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{y: "105%"}}
                  animate={inView ? {y: "0%"} : {}}
                  transition={{duration: 1.0, ease: EXPO, delay: 0.1}}
                  className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[0.9] font-bold"
                >
                  One contact.
                  <br />
                  <span className="text-[#BCBEC0] italic">Every need.</span>
                </motion.h2>
              </div>
            </div>
            <motion.p
              initial={{opacity: 0, y: 18}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.8, delay: 0.22, ease: EXPO}}
              className="text-sm text-[#BCBEC0]/45 leading-relaxed max-w-md lg:ml-auto"
            >
              From the day you collect your vehicle, a named advisor takes
              personal responsibility for your ownership experience.
            </motion.p>
          </div>

          <div className="border-t border-[#BCBEC0]/15">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{opacity: 0}}
                animate={inView ? {opacity: 1} : {}}
                transition={{duration: 0.7, delay: 0.1 + i * 0.09, ease: EXPO}}
                className="group grid grid-cols-12 items-center gap-4 py-7 border-b border-[#BCBEC0]/15 hover:border-[#BCBEC0]/28 transition-colors duration-500 cursor-default"
              >
                <span className="col-span-1 text-[11px] font-mono text-[#BCBEC0]/20 group-hover:text-[#BCBEC0]/38 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="col-span-1 text-lg text-[#BCBEC0]/35 group-hover:text-[#BCBEC0] transition-colors duration-350 hidden md:block"
                  aria-hidden
                >
                  {p.icon}
                </span>
                <h3 className="col-span-4 md:col-span-3 text-base md:text-lg text-white group-hover:text-[#BCBEC0] transition-colors duration-300 font-semibold">
                  {p.title}
                </h3>
                <p className="col-span-7 md:col-span-6 text-xs text-[#BCBEC0]/38 leading-relaxed group-hover:text-[#BCBEC0]/62 transition-colors duration-350">
                  {p.body}
                </p>
                <span
                  className="col-span-1 text-[#BCBEC0] justify-self-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
                  aria-hidden
                >
                  →
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, delay: 0.58, ease: EXPO}}
            className="mt-12"
          >
            <Button variant="outline" size="md">
              Enquire About Support
            </Button>
          </motion.div>
        </div>
      </section>
    </SectionShell>
  );
}

// ─── Maintenance ─────────────────────────────────────────────────────
function MaintenanceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.18});

  return (
    <SectionShell>
      <section ref={ref}>
        <div className="flex flex-col lg:flex-row min-h-[80vh]">
          <div className="w-full lg:w-1/2 px-6 md:px-16 py-24 md:py-32 flex flex-col justify-center">
            <motion.p
              initial={{opacity: 0, x: -14}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.7, ease: EXPO}}
              className="text-[10px] tracking-[0.32em] text-[#BCBEC0] uppercase mb-6 font-medium"
            >
              Maintenance & Care
            </motion.p>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 1.0, ease: EXPO, delay: 0.1}}
                className="font-display text-4xl md:text-5xl lg:text-6xl text-black leading-[0.9] font-bold"
              >
                Three years of
                <br />
                <span className="text-[#BCBEC0] italic">
                  complete certainty.
                </span>
              </motion.h2>
            </div>
            <motion.p
              initial={{opacity: 0, y: 14}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.8, delay: 0.25, ease: EXPO}}
              className="text-sm text-black/58 leading-relaxed max-w-md mb-10"
            >
              Every vehicle includes a comprehensive service plan covering
              scheduled maintenance, genuine parts, and qualified labour. We
              collect your vehicle and return it to you — your calendar is never
              disrupted.
            </motion.p>

            <div className="grid grid-cols-3 gap-5 mb-10 border-t border-black/10 pt-8">
              {[
                {value: "3", unit: "yr", label: "Full Coverage"},
                {value: "100%", unit: "", label: "Genuine Parts"},
                {value: "0", unit: " KSh", label: "Hidden Charges"},
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{opacity: 0, y: 18}}
                  animate={inView ? {opacity: 1, y: 0} : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.32 + i * 0.08,
                    ease: EXPO,
                  }}
                >
                  <div className="font-display text-3xl md:text-4xl text-[#BCBEC0] leading-none mb-1 font-bold">
                    {s.value}
                    <span className="text-base">{s.unit}</span>
                  </div>
                  <div className="text-[10px] tracking-[0.14em] text-[#BCBEC0]/45 uppercase">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.blockquote
              initial={{opacity: 0, x: -14}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.8, delay: 0.5, ease: EXPO}}
              className="border-l-2 border-[#BCBEC0]/50 pl-5"
            >
              <p className="text-sm text-black/55 italic leading-relaxed mb-2">
                "They collect my car, leave a courtesy vehicle, and return it
                detailed and on time. I didn't lift a finger."
              </p>
              <footer className="text-[10px] tracking-[0.18em] text-[#BCBEC0]/60 uppercase">
                David M. — Entrepreneur, Nairobi
              </footer>
            </motion.blockquote>
          </div>

          <motion.div
            className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-full overflow-hidden"
            initial={{clipPath: "inset(0 0 100% 0)"}}
            animate={inView ? {clipPath: "inset(0 0 0% 0)"} : {}}
            transition={{duration: 1.2, ease: EXPO, delay: 0.15}}
          >
            <img
              src="https://res.cloudinary.com/dnadawobi/image/upload/v1782371027/pexels-19x14-8478259_poygkp.jpg"
              alt="Vehicle maintenance and care"
              className="w-full h-full object-cover min-h-[50vh]"
            />
          </motion.div>
        </div>
      </section>
    </SectionShell>
  );
}

// ─── Events ──────────────────────────────────────────────────────────
function EventsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.12});

  return (
    <SectionShell bg="bg-black">
      <section ref={ref} className="py-28 md:py-40 px-6 md:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end mb-16 gap-8">
            <div className="lg:col-span-6">
              <motion.p
                initial={{opacity: 0, x: -14}}
                animate={inView ? {opacity: 1, x: 0} : {}}
                transition={{duration: 0.7, ease: EXPO}}
                className="text-[10px] tracking-[0.32em] text-[#BCBEC0]/55 uppercase mb-4 font-medium"
              >
                Owner Community
              </motion.p>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{y: "105%"}}
                  animate={inView ? {y: "0%"} : {}}
                  transition={{duration: 1.0, ease: EXPO, delay: 0.1}}
                  className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[0.9] font-bold"
                >
                  More than
                  <br />
                  <span className="text-[#BCBEC0] italic">a purchase.</span>
                </motion.h2>
              </div>
            </div>
            <motion.p
              initial={{opacity: 0, y: 14}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.8, delay: 0.22, ease: EXPO}}
              className="lg:col-span-4 lg:col-start-9 text-sm text-[#BCBEC0]/38 leading-relaxed"
            >
              Access to private driving experiences, curated gatherings, and
              owner-only previews across Kenya and East Africa.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
            <motion.div
              initial={{opacity: 0, y: 36}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 1.0, ease: EXPO, delay: 0.18}}
              className="lg:col-span-5 relative overflow-hidden group"
              style={{minHeight: 480}}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{scale: 1.025}}
                transition={{duration: 0.7, ease: OUT}}
              >
                <img
                  src="https://res.cloudinary.com/dnadawobi/image/upload/v1782323660/pexels-mikebirdy-18231618_g1ljyu.jpg"
                  alt="Private driving experience"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7">
                <p className="text-[9px] tracking-[0.28em] text-[#BCBEC0]/60 uppercase mb-1">
                  Annual
                </p>
                <h3 className="text-xl text-white font-bold font-display">
                  Private Driving Experience
                </h3>
              </div>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 lg:gap-5">
              <motion.div
                initial={{opacity: 0, y: 36}}
                animate={inView ? {opacity: 1, y: 0} : {}}
                transition={{duration: 1.0, ease: EXPO, delay: 0.3}}
                className="relative overflow-hidden group"
                style={{minHeight: 230}}
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{scale: 1.025}}
                  transition={{duration: 0.7, ease: OUT}}
                >
                  <img
                    src="https://res.cloudinary.com/dnadawobi/image/upload/v1782323634/pexels-memet-oz-296480690-17436155_fr9swt.jpg"
                    alt="Owner gathering"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-lg text-white font-bold font-display">
                    Owner Gatherings
                  </h3>
                </div>
              </motion.div>

              <motion.div
                initial={{opacity: 0, y: 36}}
                animate={inView ? {opacity: 1, y: 0} : {}}
                transition={{duration: 1.0, ease: EXPO, delay: 0.4}}
                className="relative overflow-hidden flex flex-col items-center justify-center text-center px-8 border border-[#BCBEC0]/15"
                style={{minHeight: 200}}
              >
                <span className="font-display text-4xl text-[#BCBEC0] mb-2 font-bold">
                  8+
                </span>
                <span className="text-[10px] tracking-[0.22em] text-[#BCBEC0]/38 uppercase">
                  Exclusive events per year
                </span>
                <a
                  href="/contact?subject=events"
                  className="mt-6 text-[10px] tracking-[0.18em] text-[#BCBEC0]/55 uppercase border-b border-[#BCBEC0]/22 pb-px hover:text-[#BCBEC0] hover:border-[#BCBEC0]/55 transition-colors duration-300"
                >
                  View Calendar →
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </SectionShell>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.18});

  return (
    <SectionShell>
      <section ref={ref} className="py-28 md:py-40 px-6 md:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-18 md:mb-24">
            <motion.p
              initial={{opacity: 0, x: -14}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.7, ease: EXPO}}
              className="text-[10px] tracking-[0.32em] text-[#BCBEC0] uppercase mb-4 font-medium"
            >
              Client Voices
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 1.0, ease: EXPO, delay: 0.1}}
                className="font-display text-4xl md:text-5xl lg:text-6xl text-black leading-[0.9] font-bold"
              >
                Trusted by those
                <br />
                <span className="text-[#BCBEC0] italic">who know quality.</span>
              </motion.h2>
            </div>
          </div>

          <div className="border-t border-black/10">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote
                key={t.author}
                initial={{opacity: 0, y: 20}}
                animate={inView ? {opacity: 1, y: 0} : {}}
                transition={{duration: 0.8, delay: 0.1 + i * 0.12, ease: EXPO}}
                className="group grid grid-cols-12 items-start gap-5 py-10 border-b border-black/10 hover:border-[#BCBEC0]/22 transition-colors duration-500"
              >
                <div className="col-span-1 hidden lg:flex">
                  <div className="w-8 h-8 rounded-full bg-[#BCBEC0]/10 border border-[#BCBEC0]/18 flex items-center justify-center">
                    <span className="text-xs text-[#BCBEC0] font-medium">
                      {t.initial}
                    </span>
                  </div>
                </div>
                <p className="col-span-12 lg:col-span-8 text-xl md:text-2xl text-black leading-[1.32] italic group-hover:text-[#BCBEC0] transition-colors duration-350 font-semibold font-display">
                  "{t.quote}"
                </p>
                <footer className="col-span-12 lg:col-span-3 lg:col-start-10 text-right">
                  <p className="text-xs text-black font-semibold tracking-wide mb-0.5">
                    {t.author}
                  </p>
                  <p className="text-[10px] tracking-[0.14em] text-[#BCBEC0]/45 uppercase">
                    {t.role}
                  </p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </SectionShell>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────
function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.12});
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionShell bg="bg-black">
      <section ref={ref} className="py-28 md:py-40 px-6 md:px-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          {/* Left */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <motion.p
              initial={{opacity: 0, x: -14}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.7, ease: EXPO}}
              className="text-[10px] tracking-[0.32em] text-[#BCBEC0]/55 uppercase mb-4 font-medium"
            >
              Questions
            </motion.p>
            <div className="overflow-hidden mb-5">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 1.0, ease: EXPO, delay: 0.1}}
                className="font-display text-3xl md:text-4xl text-white leading-[0.9] font-bold"
              >
                Answered
                <br />
                <span className="text-[#BCBEC0] italic">clearly.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{opacity: 0, y: 12}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.7, delay: 0.25, ease: EXPO}}
              className="text-xs text-[#BCBEC0]/38 leading-relaxed mb-8"
            >
              Still have questions? Speak directly with one of our specialists —
              no scripts, no call centres.
            </motion.p>
            <motion.div
              initial={{opacity: 0}}
              animate={inView ? {opacity: 1} : {}}
              transition={{duration: 0.7, delay: 0.38}}
            >
              <Button variant="secondary" size="md">
                Call a Specialist
              </Button>
            </motion.div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 lg:col-start-6 border-t border-[#BCBEC0]/15">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{opacity: 0}}
                animate={inView ? {opacity: 1} : {}}
                transition={{duration: 0.6, delay: 0.1 + i * 0.08, ease: EXPO}}
                className="border-b border-[#BCBEC0]/15"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                  aria-expanded={open === i}
                >
                  <span className="text-base md:text-lg text-white group-hover:text-[#BCBEC0] transition-colors duration-300 leading-snug font-semibold">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{rotate: open === i ? 45 : 0}}
                    transition={{duration: 0.28, ease: OUT}}
                    className="text-[#BCBEC0]/55 text-xl mt-0.5 flex-shrink-0"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{height: 0, opacity: 0}}
                      animate={{height: "auto", opacity: 1}}
                      exit={{height: 0, opacity: 0}}
                      transition={{duration: 0.38, ease: OUT}}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-[#BCBEC0]/45 leading-relaxed pb-7 max-w-lg">
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
    </SectionShell>
  );
}
