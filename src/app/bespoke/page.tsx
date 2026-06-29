"use client";
import {useRef, useEffect, useState} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import Button from "@/components/Button";
import CTABand from "@/components/CTABand";

/* ───────────────────────────────────────────────
   Constants
   ─────────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────────────────────────────
   Animated Counter
   ─────────────────────────────────────────────── */
function CountUp({end, duration = 2}: {end: number; duration?: number}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.5});
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, end, duration]);
  return <span ref={ref}>{value.toLocaleString()}</span>;
}

/* ───────────────────────────────────────────────
   Data (unchanged)
   ─────────────────────────────────────────────── */
const materials = [
  {
    id: "leather",
    name: "Bridge of Weir Leather",
    origin: "Perthshire, Scotland",
    description:
      "Full‑grain aniline hides, hand‑selected for consistency of grain and depth of colour.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782374774/pexels-entero-37208709_1_gzygzc.jpg",
    swatches: ["#3D1C02", "#8B5A2B", "#C8966A", "#F0D5B0", "#1A0E05"],
  },
  {
    id: "alcantara",
    name: "Alcantara®",
    origin: "Umbria, Italy",
    description:
      "A microfibre of exceptional precision — softer than suede, more durable than leather.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782374829/pexels-oguz-kaan-boga-19166252-17315566_1_wps0cz.jpg",
    swatches: ["#0A0A0B", "#2C2C3A", "#4A3F52", "#8A7A90", "#C5B8CC"],
  },
  {
    id: "timber",
    name: "Open‑Pore Timber",
    origin: "Black Forest, Germany",
    description:
      "Hand‑selected veneers bookmatched across surfaces for continuous grain.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782374883/pexels-saif-allah-dawoud-576915631-29370663_1_epxhzj.jpg",
    swatches: ["#2A1505", "#6B4E31", "#9C7349", "#C8A97A", "#E8D5B0"],
  },
  {
    id: "carbon",
    name: "Forged Carbon",
    origin: "Composites Laboratory",
    description:
      "Each panel is individually pressed under 120 tonnes of force.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782374911/pexels-ishankulshrestha69-7662116_1_gm0irn.jpg",
    swatches: ["#0A0A0B", "#1A1A1A", "#2A2A2A", "#3A3A3A", "#505050"],
  },
];

const processStages = [
  {
    step: "01",
    title: "Private Consultation",
    subtitle: "Your vision, captured.",
    description:
      "A dedicated bespoke advisor meets with you at our atelier or in your own environment.",
    detail: "Typically 2–3 hours · NDA signed · No obligation",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782523047/23221754319967420_ymvzr0.jpg",
  },
  {
    step: "02",
    title: "Design Atelier",
    subtitle: "Rendered in three dimensions.",
    description:
      "Our design team translates your brief into photorealistic renders.",
    detail: "2–4 weeks · Unlimited revisions · Physical swatches delivered",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782523344/3377768468886339_oxtqkl.jpg",
  },
  {
    step: "03",
    title: "Material Selection",
    subtitle: "Handled. Held. Chosen.",
    description:
      "Physical samples of every selected material are presented in person.",
    detail: "In‑person appointment · Full sample library · Artisan present",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782523117/105342078781774240_gcy7uj.jpg",
  },
  {
    step: "04",
    title: "Commission Approval",
    subtitle: "Signed. Sealed. Begun.",
    description:
      "A formal commission document records every specification decision.",
    detail: "6–18 week build · Progress reports · Dedicated contact",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782523159/Agreement_on_important_issues_uasmnt.jpg",
  },
  {
    step: "05",
    title: "Master Craftsmanship",
    subtitle: "Built to outlast.",
    description: "Every hour of labour is traceable to the individual artisan.",
    detail: "12‑week average build · 2,000+ hours invested · QC at every stage",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371027/pexels-19x14-8478259_poygkp.jpg",
  },
  {
    step: "06",
    title: "Private Delivery",
    subtitle: "The moment arrives.",
    description:
      "Your vehicle is transported in an enclosed, climate‑controlled transporter.",
    detail: "Venue of your choice · Advisor present · Build diary presented",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782523237/440156563603415946_a1kweq.jpg",
  },
];

const commissions = [
  {
    name: "Commission No. 47",
    code: "Sahara Noir",
    story:
      "Conceived for desert driving. A matte black exterior with sand‑coloured Alcantara interior.",
    materials: "Matte Black · Alcantara · Brass Hardware",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782323660/pexels-mikebirdy-18231618_g1ljyu.jpg",
  },
  {
    name: "Commission No. 61",
    code: "Prussian Blue",
    story:
      "A collector's interpretation of a 1960s grand tourer — deep metallic blue.",
    materials: "Metallic Blue · Bridge of Weir Tan · Walnut Veneer",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782323634/pexels-memet-oz-296480690-17436155_fr9swt.jpg",
  },
  {
    name: "Commission No. 78",
    code: "Glacier White",
    story:
      "Inspired by Scandinavian minimalism. White on white with exposed carbon.",
    materials: "Pearl White · Ice Alcantara · Forged Carbon",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782323605/pexels-criticalimagery-36646951_dbo8vc.jpg",
  },
];

/* ───────────────────────────────────────────────
   🚗 HERO – with reusable Button component
   ─────────────────────────────────────────────── */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.05});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const springImageY = useSpring(imageY, {stiffness: 30, damping: 14});

  const driftX = useMotionValue(0);
  useEffect(() => {
    if (prefersReduced) return;
    const controls = animate(driftX, [0, -2, 0, 2, 0], {
      duration: 42,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [prefersReduced, driftX]);

  const maskLeft = (delay: number) => ({
    hidden: {clipPath: "inset(0 100% 0 0)", opacity: 0},
    visible: {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: {duration: 1.3, ease: EASE_OUT_EXPO, delay},
    },
  });
  const fadeUp = (delay: number) => ({
    hidden: {y: 22, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {duration: 1.1, ease: EASE_OUT, delay},
    },
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{minHeight: "100svh"}}
      aria-label="LuxeDrive – Discover the world on wheels"
    >
      {/* Full‑bleed image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: prefersReduced ? "0%" : springImageY,
          x: prefersReduced ? 0 : driftX,
        }}
      >
        <img
          src="https://res.cloudinary.com/dnadawobi/image/upload/v1782522730/samuele-errico-piccarini-FMbWFDiVRPs-unsplash_1_zqwplw.jpg"
          alt="Luxury car for rent"
          className="w-full h-full object-cover object-[65%_50%]"
          fetchPriority="high"
          loading="eager"
        />
      </motion.div>

      {/* Left‑weighted gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.10) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[100svh] px-6 md:px-14 lg:px-20 xl:px-28">
        <motion.div
          className="w-full"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {transition: {staggerChildren: 0.12}},
          }}
        >
          {/* Brand name */}
          <motion.p
            variants={fadeUp(0.15)}
            className="text-[13px] tracking-[0.3em] uppercase text-white/60 mb-8 font-semibold"
          >
            AL AHASAN
          </motion.p>

          {/* Main headline – now full width */}
          <div className="overflow-hidden mb-3 w-full">
            <motion.h1
              variants={maskLeft(0.3)}
              className="text-[clamp(2.6rem,6vw,6rem)] font-bold text-white leading-[1.05] tracking-[-0.02em]"
            >
              DISCOVER A VARIETY OF MODS
              <br />
            </motion.h1>
          </div>

          {/* Subheading – constrained for readability */}
          <motion.p
            variants={fadeUp(0.55)}
            className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-lg"
          >
            with our car rental service
          </motion.p>

          {/* CTA – replaced static <a> with reusable <Button /> */}
          <motion.div variants={fadeUp(0.7)}>
            <Button variant="primary" size="lg" href="/vehicles">
              Rent Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   Exclusivity Signal
   ─────────────────────────────────────────────── */
function ExclusivitySignal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.5});
  return (
    <div ref={ref} className="bg-black border-t border-b border-[#BCBEC0]/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <motion.p
            initial={{opacity: 0, x: -16}}
            animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
            className="text-[10px] tracking-[0.3em] text-[#BCBEC0]/60 uppercase font-medium"
          >
            Strictly Limited
          </motion.p>
          <motion.p
            initial={{opacity: 0}}
            animate={inView ? {opacity: 1} : {}}
            transition={{duration: 0.8, delay: 0.1}}
            className="text-sm text-[#BCBEC0]/50 text-center max-w-lg"
          >
            We accept a maximum of{" "}
            <span className="text-[#BCBEC0] font-bold">
              24 bespoke commissions
            </span>{" "}
            per year.
          </motion.p>
          <motion.div
            initial={{opacity: 0, x: 16}}
            animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO}}
          >
            <a
              href="/contact?subject=bespoke-availability"
              className="text-[10px] tracking-[0.25em] text-[#BCBEC0] uppercase border-b border-[#BCBEC0]/30 pb-px hover:border-[#BCBEC0] transition-colors whitespace-nowrap font-medium"
            >
              Check Availability →
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Material Immersion (unchanged)
   ─────────────────────────────────────────────── */
function MaterialImmersion() {
  const [activeMat, setActiveMat] = useState(0);
  const [activeSwatchIndex, setActiveSwatchIndex] = useState(2);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.15});
  const mat = materials[activeMat];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-20 md:py-28 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end mb-12 lg:mb-16 gap-8">
          <div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
                className="font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-[0.9]"
              >
                Curated for the
                <br />
                <span className="text-[#BCBEC0] italic">connoisseur.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{opacity: 0, y: 16}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO}}
            className="text-sm text-[#BCBEC0]/40 leading-relaxed max-w-md lg:ml-auto"
          >
            Every material in our atelier is sourced from a single supplier.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 space-y-0 border-t border-[#BCBEC0]/20">
            {materials.map((m, i) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMat(i);
                  setActiveSwatchIndex(2);
                }}
                className="w-full flex items-center justify-between py-4 lg:py-5 border-b border-[#BCBEC0]/20 text-left group"
              >
                <div>
                  <motion.span
                    animate={{opacity: i === activeMat ? 1 : 0.35}}
                    className="block font-bold text-base text-white mb-0.5 group-hover:text-[#BCBEC0] transition-colors duration-300"
                  >
                    {m.name}
                  </motion.span>
                  <span className="text-[10px] tracking-[0.2em] text-[#BCBEC0]/30 uppercase">
                    {m.origin}
                  </span>
                </div>
                <motion.span
                  animate={{
                    opacity: i === activeMat ? 1 : 0,
                    x: i === activeMat ? 0 : -8,
                  }}
                  className="text-[#BCBEC0] text-sm"
                >
                  →
                </motion.span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMat}
                className="relative overflow-hidden rounded-xl"
                initial={{opacity: 0, scale: 1.04}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.97}}
                transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
              >
                <div className="aspect-[4/5] lg:aspect-auto lg:h-[520px]">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 bg-black pointer-events-none"
                  initial={{scaleY: 1}}
                  animate={{scaleY: 0}}
                  style={{originY: "top"}}
                  transition={{duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-[10px] tracking-[0.3em] text-[#BCBEC0] uppercase mb-1 font-medium">
                    {mat.origin}
                  </p>
                  <p className="font-bold text-lg text-white">{mat.name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMat}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -12}}
                transition={{duration: 0.55, ease: EASE_OUT_EXPO}}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <p className="text-sm text-[#BCBEC0]/55 leading-relaxed mb-8">
                    {mat.description}
                  </p>
                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.25em] text-[#BCBEC0]/30 uppercase mb-4 font-medium">
                      Available Finishes
                    </p>
                    <div className="flex gap-3">
                      {mat.swatches.map((hex, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveSwatchIndex(i)}
                          className="relative"
                          aria-label={`Colour option ${i + 1}`}
                        >
                          <motion.div
                            className="w-8 h-8 rounded-full border-2 transition-all duration-300"
                            style={{backgroundColor: hex}}
                            animate={{
                              borderColor:
                                i === activeSwatchIndex
                                  ? "#BCBEC0"
                                  : "transparent",
                              scale: i === activeSwatchIndex ? 1.2 : 1,
                            }}
                            transition={{duration: 0.3}}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 border-t border-[#BCBEC0]/20 pt-6">
                  <Button
                    variant="secondary"
                    size="md"
                    href="/contact?subject=bespoke-materials"
                  >
                    Request Sample Portfolio <span className="ml-2">→</span>
                  </Button>
                  <p className="text-[10px] tracking-[0.15em] text-[#BCBEC0]/20 uppercase">
                    Physical samples delivered within 48h
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   Bespoke Process (unchanged)
   ─────────────────────────────────────────────── */
function BespokeProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * processStages.length),
        processStages.length - 1,
      );
      setActiveStage(idx);
    });
    return () => unsub();
  }, [scrollYProgress]);
  const stage = processStages[activeStage];

  return (
    <div
      id="process"
      ref={sectionRef}
      style={{height: `${processStages.length * 100}vh`}}
      className="relative bg-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-[55%] h-[45vh] lg:h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              className="absolute inset-0"
              initial={{opacity: 0, scale: 1.05}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.97}}
              transition={{duration: 0.75, ease: EASE_OUT_EXPO}}
            >
              <img
                src={stage.image}
                alt={stage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10">
            <motion.div
              className="h-full bg-[#BCBEC0] origin-left"
              animate={{scaleX: (activeStage + 1) / processStages.length}}
              transition={{duration: 0.5, ease: EASE_OUT}}
            />
          </div>
          <div className="absolute top-8 left-8">
            <span className="text-[10px] tracking-[0.3em] text-black/40 uppercase font-medium">
              Stage {stage.step} of {processStages.length}
            </span>
          </div>
        </div>
        <div className="w-full lg:w-[45%] flex flex-col bg-white px-8 md:px-12 xl:px-16 py-12 lg:py-0 lg:justify-between lg:pt-16 lg:pb-12 border-l border-black/8">
          <div>
            <div className="space-y-3 mb-12">
              {processStages.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!sectionRef.current) return;
                    const el = sectionRef.current;
                    const topOfSection =
                      el.getBoundingClientRect().top + window.scrollY;
                    const sliceH = el.scrollHeight / processStages.length;
                    window.scrollTo({
                      top: topOfSection + i * sliceH + 1,
                      behavior: "smooth",
                    });
                  }}
                  className="flex items-center gap-4 w-full text-left"
                >
                  <motion.span
                    animate={{opacity: i === activeStage ? 1 : 0.25}}
                    className="text-[10px] tracking-wider text-[#BCBEC0] w-6 flex-shrink-0 font-medium"
                  >
                    {s.step}
                  </motion.span>
                  <motion.div
                    className="flex-1 h-px origin-left"
                    animate={{
                      scaleX: i === activeStage ? 1 : 0.3,
                      backgroundColor:
                        i === activeStage ? "#BCBEC0" : "#00000022",
                    }}
                    transition={{duration: 0.4}}
                  />
                  <motion.span
                    animate={{
                      opacity: i === activeStage ? 1 : 0.3,
                      color: i === activeStage ? "#000000" : "#BCBEC0",
                    }}
                    className="text-xs font-medium text-right"
                  >
                    {s.title}
                  </motion.span>
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -12}}
              transition={{duration: 0.5, ease: EASE_OUT_EXPO}}
              className="flex-1 flex flex-col justify-end"
            >
              <p className="text-[10px] tracking-[0.25em] text-[#BCBEC0] uppercase mb-2 font-medium">
                {stage.subtitle}
              </p>
              <h2 className="font-bold text-3xl md:text-4xl xl:text-5xl text-black leading-[0.92] mb-5">
                {stage.title}
              </h2>
              <p className="text-sm text-[#BCBEC0]/75 leading-relaxed mb-6 max-w-sm">
                {stage.description}
              </p>
              <p className="text-[10px] tracking-[0.2em] text-[#BCBEC0]/60 mb-8 font-medium">
                {stage.detail}
              </p>
              <Button
                variant="secondary"
                size="md"
                href="/contact?subject=bespoke"
              >
                Begin This Journey <span className="ml-2">→</span>
              </Button>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 pt-6 border-t border-black/8">
            <p className="text-[10px] tracking-[0.2em] text-[#BCBEC0]/35 uppercase mb-1 font-medium">
              Speak directly with our atelier
            </p>
            <a
              href="tel:+97100000000"
              className="font-medium text-sm text-[#BCBEC0] hover:text-white transition-colors"
            >
              +971 00 000 0000
            </a>
          </div>
        </div>
        <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {processStages.map((_, i) => (
            <div
              key={i}
              className="h-px transition-all duration-400"
              style={{
                width: i === activeStage ? 24 : 12,
                background: i === activeStage ? "#BCBEC0" : "#00000033",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Past Commissions (unchanged)
   ─────────────────────────────────────────────── */
function PastCommissions() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.15});
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end mb-16 gap-8">
          <div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
                className="font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-[0.9]"
              >
                A glimpse of
                <br />
                <span className="text-[#BCBEC0] italic">what's possible.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{opacity: 0, y: 16}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO}}
            className="text-sm text-[#BCBEC0]/35 leading-relaxed max-w-md lg:ml-auto"
          >
            Each commission is a private document.
          </motion.p>
        </div>
        <div className="border-t border-[#BCBEC0]/20">
          {commissions.map((c, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0}}
              animate={inView ? {opacity: 1} : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.12,
                ease: EASE_OUT_EXPO,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group grid grid-cols-12 items-center gap-4 py-8 border-b border-[#BCBEC0]/20 cursor-pointer"
            >
              <div className="col-span-1 hidden lg:block">
                <span className="text-[10px] tracking-[0.2em] text-[#BCBEC0]/40 font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <motion.div
                className="col-span-2 hidden lg:block overflow-hidden"
                style={{height: 80}}
                animate={{opacity: hoveredIdx === i ? 1 : 0.4}}
                transition={{duration: 0.4}}
              >
                <motion.img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover"
                  animate={{scale: hoveredIdx === i ? 1 : 1.08}}
                  transition={{duration: 0.6, ease: EASE_OUT}}
                />
              </motion.div>
              <div className="col-span-12 lg:col-span-4">
                <motion.p
                  animate={{color: hoveredIdx === i ? "#BCBEC0" : "#FFFFFF"}}
                  transition={{duration: 0.3}}
                  className="font-bold text-xl mb-1"
                >
                  {c.code}
                </motion.p>
                <p className="text-xs text-[#BCBEC0]/35">{c.name}</p>
              </div>
              <motion.p
                className="col-span-12 lg:col-span-4 text-xs text-[#BCBEC0]/40 leading-relaxed"
                animate={{opacity: hoveredIdx === i ? 0.7 : 0.35}}
                transition={{duration: 0.4}}
              >
                {c.story}
              </motion.p>
              <motion.div
                className="col-span-12 lg:col-span-1 text-right hidden lg:block"
                animate={{opacity: hoveredIdx === i ? 1 : 0}}
              >
                <span className="text-[#BCBEC0] text-sm">→</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{opacity: 0, y: 16}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, delay: 0.5, ease: EASE_OUT_EXPO}}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="outline"
            size="md"
            href="/contact?subject=bespoke-portfolio"
          >
            Request Full Portfolio <span className="ml-2">→</span>
          </Button>
          <Button variant="outline" size="md" href="/contact?subject=bespoke">
            Begin Your Commission <span className="ml-2">→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   Social Proof (unchanged)
   ─────────────────────────────────────────────── */
function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});

  const records = [
    {
      id: "commissions",
      value: "147",
      label: "Bespoke Commissions Completed",
      detail: "Commission archive · 01–147",
      image:
        "https://res.cloudinary.com/dnadawobi/image/upload/v1782374774/pexels-entero-37208709_1_gzygzc.jpg",
    },
    {
      id: "craft",
      value: "6",
      suffix: " months",
      label: "Average Build Duration",
      detail: "From first sketch to final stitch",
      image:
        "https://res.cloudinary.com/dnadawobi/image/upload/v1782371027/pexels-19x14-8478259_poygkp.jpg",
    },
    {
      id: "satisfaction",
      value: "100",
      suffix: "%",
      label: "Client Satisfaction",
      detail: "Based on post‑delivery interviews",
      image:
        "https://res.cloudinary.com/dnadawobi/image/upload/v1782323634/pexels-memet-oz-296480690-17436155_fr9swt.jpg",
    },
    {
      id: "colour",
      value: "12,000",
      suffix: "+",
      label: "Colour Options Available",
      detail: "Across leather, paint & stitching",
      image:
        "https://res.cloudinary.com/dnadawobi/image/upload/v1782374829/pexels-oguz-kaan-boga-19166252-17315566_1_wps0cz.jpg",
    },
  ];

  const testimonials = [
    {
      quote:
        "The level of detail exceeded anything I’ve experienced with Rolls‑Royce or Bentley. Every decision became part of the story of the car. The finished vehicle carries a presence that no production car can match.",
      author: "F.A.R.",
      role: "Commission No. 61",
      image:
        "https://res.cloudinary.com/dnadawobi/image/upload/v1782323660/pexels-mikebirdy-18231618_g1ljyu.jpg",
    },
    {
      quote:
        "By the end of the process, it no longer felt like purchasing a vehicle. It felt like commissioning a piece of functional art. The team’s patience and expertise transformed a vague idea into something tangible and deeply personal.",
      author: "M.K.N.",
      role: "Commission No. 47",
      image:
        "https://res.cloudinary.com/dnadawobi/image/upload/v1782323605/pexels-criticalimagery-36646951_dbo8vc.jpg",
    },
  ];

  const fadeUp = (delay: number) => ({
    hidden: {y: 24, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {duration: 0.9, ease: EASE_OUT, delay},
    },
  });

  return (
    <div
      ref={ref}
      className="bg-white py-24 md:py-36 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-medium">
            The Archive
          </p>
          <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl text-black leading-[0.9]">
            Commission
            <br />
            <span className="text-[#BCBEC0] italic">Records.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 md:mb-36">
          {records.map((rec, i) => (
            <motion.div
              key={rec.id}
              variants={fadeUp(0.1 + i * 0.06)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group relative bg-white border border-[#BCBEC0]/20 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start transition-shadow hover:shadow-xl hover:border-[#BCBEC0]/40"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
                <img
                  src={rec.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="font-bold text-2xl md:text-3xl text-black tabular-nums">
                    {rec.value}
                  </span>
                  {rec.suffix && (
                    <span className="font-medium text-lg text-[#BCBEC0]">
                      {rec.suffix}
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-black mb-1.5">
                  {rec.label}
                </p>
                <p className="text-xs text-[#BCBEC0]/60 font-medium tracking-wide">
                  {rec.detail}
                </p>
              </div>
              <div className="absolute top-4 right-4 text-[#BCBEC0]/20">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="8" y1="8" x2="8" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-black/10 pt-20 md:pt-28">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-medium">
              Client Reflections
            </p>
            <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl text-black leading-[0.9]">
              Words from
              <br />
              <span className="text-[#BCBEC0] italic">our commissioners.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                variants={fadeUp(0.2 + i * 0.1)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="relative flex flex-col"
              >
                <span
                  className="absolute -top-2 -left-1 text-5xl font-serif leading-none text-[#BCBEC0]/20 select-none"
                  aria-hidden
                >
                  “
                </span>
                <p className="text-sm md:text-lg text-black/80 leading-relaxed italic mb-8 flex-1 max-w-md">
                  {t.quote}
                </p>
                <footer className="flex items-center gap-4 border-t border-black/10 pt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
                    <img
                      src={t.image}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{t.author}</p>
                    <p className="text-xs text-[#BCBEC0]/60 font-medium tracking-wider uppercase">
                      {t.role}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>

        <motion.p
          className="text-center text-[10px] tracking-[0.3em] text-[#BCBEC0]/40 mt-20 font-medium uppercase"
          variants={fadeUp(0.5)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          Each commission is a private document. Images shown with owner
          permission.
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Main Page
   ─────────────────────────────────────────────── */
export default function BespokePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={pageRef} className="bg-black">
      <HeroSection />
      <ExclusivitySignal />
      <MaterialImmersion />
      <div className="hidden lg:block">
        <BespokeProcess />
      </div>
      <PastCommissions />
      <SocialProof />
      <CTABand />
    </div>
  );
}
