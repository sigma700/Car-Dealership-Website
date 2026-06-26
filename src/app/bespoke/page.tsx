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
import CTABand from "@/components/CTABand";
import Button from "@/components/Button";

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// ─── ANIMATED COUNT UP ───────────────────────────────────────────
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

// ─── DATA ─────────────────────────────────────────────────────────
const materials = [
  {
    id: "leather",
    name: "Bridge of Weir Leather",
    origin: "Perthshire, Scotland",
    description:
      "Full-grain aniline hides, hand-selected for consistency of grain and depth of colour. Each hide is treated using century-old methods that no synthetic can replicate.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782374774/pexels-entero-37208709_1_gzygzc.jpg",
    swatches: ["#3D1C02", "#8B5A2B", "#C8966A", "#F0D5B0", "#1A0E05"],
  },
  {
    id: "alcantara",
    name: "Alcantara®",
    origin: "Umbria, Italy",
    description:
      "A microfibre of exceptional precision — softer than suede, more durable than leather. Favoured by aerospace engineers and couture houses alike.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782374829/pexels-oguz-kaan-boga-19166252-17315566_1_wps0cz.jpg",
    swatches: ["#0A0A0B", "#2C2C3A", "#4A3F52", "#8A7A90", "#C5B8CC"],
  },
  {
    id: "timber",
    name: "Open-Pore Timber",
    origin: "Black Forest, Germany",
    description:
      "Hand-selected veneers bookmatched across surfaces for continuous grain. Left unsealed to preserve the warmth and texture of living wood.",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782374883/pexels-saif-allah-dawoud-576915631-29370663_1_epxhzj.jpg",
    swatches: ["#2A1505", "#6B4E31", "#9C7349", "#C8A97A", "#E8D5B0"],
  },
  {
    id: "carbon",
    name: "Forged Carbon",
    origin: "Composites Laboratory",
    description:
      "Each panel is individually pressed under 120 tonnes of force, creating a pattern unique to that component. No two pieces are ever identical.",
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
      "A dedicated bespoke advisor meets with you at our atelier or in your own environment. We discuss not just specification, but aspiration, how you live, how you travel, what the vehicle means to you.",
    detail: "Typically 2–3 hours · NDA signed · No obligation",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782325000/pexels-tima-miroshnichenko-6872167_ia5xri.jpg",
  },
  {
    step: "02",
    title: "Design Atelier",
    subtitle: "Rendered in three dimensions.",
    description:
      "Our design team translates your brief into photorealistic renders. You review every surface, every stitch line, every material boundary before a single component is ordered.",
    detail: "2–4 weeks · Unlimited revisions · Physical swatches delivered",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782320227/pexels-criticalimagery-36646940_t8ifsu.jpg",
  },
  {
    step: "03",
    title: "Material Selection",
    subtitle: "Handled. Held. Chosen.",
    description:
      "Physical samples of every selected material are presented in person. You approve the exact hide, the precise veneer sheet, the specific carbon weave — not a catalogue representation.",
    detail: "In-person appointment · Full sample library · Artisan present",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782319817/pexels-chris-clark-1933184-5608576_u83gbw.jpg",
  },
  {
    step: "04",
    title: "Commission Approval",
    subtitle: "Signed. Sealed. Begun.",
    description:
      "A formal commission document records every specification decision. Your vehicle enters the production queue and is assigned to a single master technician who will build it from start to finish.",
    detail: "6–18 week build · Progress reports · Dedicated contact",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371001/pexels-silverkblack-36729868_qzw5pq.jpg",
  },
  {
    step: "05",
    title: "Master Craftsmanship",
    subtitle: "Built to outlast.",
    description:
      "Every hour of labour is traceable to the individual artisan. We maintain a build diary, photographs, notes, measurements, that becomes part of the vehicle's permanent record.",
    detail: "12-week average build · 2,000+ hours invested · QC at every stage",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371027/pexels-19x14-8478259_poygkp.jpg",
  },
  {
    step: "06",
    title: "Private Delivery",
    subtitle: "The moment arrives.",
    description:
      "Your vehicle is transported in an enclosed, climate-controlled transporter. Your advisor is present for the unveiling, walks you through every detail, and ensures everything is precisely as commissioned.",
    detail: "Venue of your choice · Advisor present · Build diary presented",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782371019/pexels-andy-lee-222330306-38132275_tdklhs.jpg",
  },
];

const commissions = [
  {
    name: "Commission No. 47",
    code: "Sahara Noir",
    story:
      "Conceived for desert driving. A matte black exterior with sand-coloured Alcantara interior and embossed topographic stitching.",
    materials: "Matte Black · Alcantara · Brass Hardware",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782323660/pexels-mikebirdy-18231618_g1ljyu.jpg",
  },
  {
    name: "Commission No. 61",
    code: "Prussian Blue",
    story:
      "A collector's interpretation of a 1960s grand tourer — deep metallic blue with hand-stitched tan leather and polished wood.",
    materials: "Metallic Blue · Bridge of Weir Tan · Walnut Veneer",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782323634/pexels-memet-oz-296480690-17436155_fr9swt.jpg",
  },
  {
    name: "Commission No. 78",
    code: "Glacier White",
    story:
      "Inspired by Scandinavian minimalism. White on white with ice-blue stitching and exposed forged carbon on every trim surface.",
    materials: "Pearl White · Ice Alcantara · Forged Carbon",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782323605/pexels-criticalimagery-36646951_dbo8vc.jpg",
  },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function BespokePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={pageRef} className="bg-black">
      <HeroSection />
      <ExclusivitySignal />
      <MaterialImmersion />
      <BespokeProcess />
      <PastCommissions />
      <SocialProof />
      <CTABand />
    </div>
  );
}

// ─── HERO ───────────────────────────────────────────
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);
  const vigY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-8%"]);
  const bgX = useMotionValue(0);
  const bgScale = useMotionValue(1.06);
  useEffect(() => {
    if (prefersReduced) return;
    const x = animate(bgX, [0, -2.5, 0, 2.5, 0], {
      duration: 32,
      repeat: Infinity,
      ease: "linear",
    });
    const s = animate(bgScale, [1.06, 1.09, 1.06, 1.09, 1.06], {
      duration: 38,
      repeat: Infinity,
      ease: "linear",
    });
    return () => {
      x.stop();
      s.stop();
    };
  }, [prefersReduced, bgX, bgScale]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-[-4%] will-change-transform"
        style={prefersReduced ? {} : {y: bgY, x: bgX, scale: bgScale}}
      >
        <img
          src="https://res.cloudinary.com/dnadawobi/image/upload/v1782319817/pexels-chris-clark-1933184-5608576_u83gbw.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-10"
        style={prefersReduced ? {} : {y: vigY}}
        initial={{
          background: "linear-gradient(to top, black 100%, black 100%)",
        }}
        animate={{
          background: "linear-gradient(to top, black 0%, rgba(0,0,0,0) 60%)",
        }}
        transition={{duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.4}}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-20" />
      <div
        className="absolute inset-0 z-20 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <motion.div
        className="relative z-30 flex flex-col justify-end h-full max-w-[1440px] mx-auto px-6 md:px-16 pb-20 md:pb-28"
        style={prefersReduced ? {} : {y: textY, opacity}}
      >
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{y: "110%"}}
            animate={{y: "0%"}}
            transition={{duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.9}}
            className="font-display text-5xl md:text-8xl lg:text-[7.5rem] text-white leading-[0.86] tracking-tight"
          >
            Your imagination.
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{y: "110%"}}
            animate={{y: "0%"}}
            transition={{duration: 1.2, ease: EASE_OUT_EXPO, delay: 1.05}}
            className="font-display text-5xl md:text-8xl lg:text-[7.5rem] text-[#BCBEC0] italic leading-[0.86] tracking-tight"
          >
            Our craft.
          </motion.h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 max-w-5xl">
          <motion.p
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.25}}
            className="text-sm md:text-base text-[#BCBEC0]/60 max-w-xs leading-relaxed"
          >
            No two Al Husnain Bespoke vehicles are ever the same. Yours will be
            the only one in existence.
          </motion.p>
          <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.4}}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              variant="secondary"
              size="md"
              href="/contact?subject=bespoke"
            >
              Begin Your Commission <span className="ml-2">→</span>
            </Button>
            <Button variant="outline" size="md" href="#process">
              Discover the Process <span className="ml-2">→</span>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 2.0, duration: 0.8}}
          className="absolute bottom-8 right-8 md:right-16 flex items-center gap-3 text-[#BCBEC0]/25"
        >
          <motion.div
            className="w-8 h-px bg-[#BCBEC0]/25"
            animate={{scaleX: [0, 1, 0]}}
            transition={{duration: 2.5, repeat: Infinity, ease: "easeInOut"}}
            style={{originX: 0}}
          />
          <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── EXCLUSIVITY SIGNAL ───────────────────────────────────────────
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
            className="text-[10px] tracking-[0.3em] text-[#BCBEC0]/60 uppercase"
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
            <span className="text-[#BCBEC0] font-mono">
              24 bespoke commissions
            </span>{" "}
            per year. Each receives a dedicated advisor, atelier time, and a
            build slot that cannot be traded.
          </motion.p>
          <motion.div
            initial={{opacity: 0, x: 16}}
            animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO}}
          >
            <a
              href="/contact?subject=bespoke-availability"
              className="text-[10px] tracking-[0.25em] text-[#BCBEC0] uppercase border-b border-[#BCBEC0]/30 pb-px hover:border-[#BCBEC0] transition-colors whitespace-nowrap"
            >
              Check Availability →
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── MATERIAL IMMERSION ───────────────────────────────────────────
function MaterialImmersion() {
  const [activeMat, setActiveMat] = useState(0);
  const [activeSwatchIndex, setActiveSwatchIndex] = useState(2);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.15});
  const mat = materials[activeMat];

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
                className="font-display text-4xl md:text-6xl text-white leading-[0.9]"
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
            Every material in our atelier is sourced from a single supplier,
            verified by our craftspeople, and held to the same standard as a
            bespoke suit.
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
                className="w-full flex items-center justify-between py-5 border-b border-[#BCBEC0]/20 text-left group"
              >
                <div>
                  <motion.span
                    animate={{opacity: i === activeMat ? 1 : 0.35}}
                    className="block font-display text-base text-white mb-0.5 group-hover:text-[#BCBEC0] transition-colors duration-300"
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
          <div className="lg:col-span-5 relative" style={{minHeight: 520}}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMat}
                className="relative overflow-hidden"
                style={{height: 520}}
                initial={{opacity: 0, scale: 1.04}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.97}}
                transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
              >
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black pointer-events-none"
                  initial={{scaleY: 1}}
                  animate={{scaleY: 0}}
                  style={{originY: "top"}}
                  transition={{duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-[#BCBEC0] uppercase mb-1">
                    {mat.origin}
                  </p>
                  <p className="font-display text-lg text-white">{mat.name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div
            className="lg:col-span-4 flex flex-col justify-between"
            style={{minHeight: 520}}
          >
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
                    <p className="text-[10px] tracking-[0.25em] text-[#BCBEC0]/30 uppercase mb-4">
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

// ─── BESPOKE PROCESS (STICKY PIN) ────────────────────────────────
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
            <span className="font-mono text-[10px] tracking-[0.3em] text-black/40 uppercase">
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
                    className="font-mono text-[10px] tracking-wider text-[#BCBEC0] w-6 flex-shrink-0"
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
              <p className="text-[10px] tracking-[0.25em] text-[#BCBEC0] uppercase mb-2">
                {stage.subtitle}
              </p>
              <h2 className="font-display text-3xl md:text-4xl xl:text-5xl text-black leading-[0.92] mb-5">
                {stage.title}
              </h2>
              <p className="text-sm text-[#BCBEC0]/75 leading-relaxed mb-6 max-w-sm">
                {stage.description}
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#BCBEC0]/60 mb-8">
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
            <p className="text-[10px] tracking-[0.2em] text-[#BCBEC0]/35 uppercase mb-1">
              Speak directly with our atelier
            </p>
            <a
              href="tel:+97100000000"
              className="font-mono text-sm text-[#BCBEC0] hover:text-white transition-colors"
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

// ─── PAST COMMISSIONS ─────────────────────────────────────────────
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
                className="font-display text-4xl md:text-6xl text-white leading-[0.9]"
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
            Each commission is a private document. The vehicles shown here are
            displayed with the permission of their owners.
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
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#BCBEC0]/40">
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
                  className="font-display text-xl mb-1"
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

// ─── SOCIAL PROOF ─────────────────────────────────────────────────
function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});
  const stats = [
    {value: 147, label: "Bespoke Commissions Completed", suffix: ""},
    {value: 6, label: "Average Build Duration", suffix: " months"},
    {value: 100, label: "Client Satisfaction Rate", suffix: "%"},
    {value: 12000, label: "Colour Options Available", suffix: "+"},
  ];
  const testimonials = [
    {
      quote:
        "The advisor understood immediately what I wanted, something that didn't exist anywhere else. Six months later, it does.",
      author: "F.A.R.",
      role: "Commission No. 61",
    },
    {
      quote:
        "Every sample was presented in person. Every decision felt significant. That's what made it feel worth the wait.",
      author: "M.K.N.",
      role: "Commission No. 47",
    },
  ];

  return (
    <div
      ref={ref}
      className="bg-white py-28 md:py-40 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-b border-black/10 pb-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0, y: 20}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.7, delay: i * 0.08, ease: EASE_OUT_EXPO}}
            >
              <div className="font-mono text-3xl md:text-4xl text-[#BCBEC0] leading-none mb-2">
                <CountUp end={s.value} />
                <span className="text-xl">{s.suffix}</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] text-black/50 uppercase leading-tight">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mb-16">
          <div className="overflow-hidden">
            <motion.h2
              initial={{y: "105%"}}
              animate={inView ? {y: "0%"} : {}}
              transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
              className="font-display text-4xl md:text-6xl text-black leading-[0.9]"
            >
              Words from
              <br />
              <span className="text-[#BCBEC0] italic">our commissioners.</span>
            </motion.h2>
          </div>
        </div>
        <div className="border-t border-black/10">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{opacity: 0, y: 20}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.12,
                ease: EASE_OUT_EXPO,
              }}
              className="grid grid-cols-12 items-start gap-6 py-10 border-b border-black/10"
            >
              <span className="col-span-1 font-mono text-[10px] text-[#BCBEC0]/40 mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="col-span-12 lg:col-span-8 font-display text-2xl md:text-3xl text-black italic leading-[1.25]">
                "{t.quote}"
              </p>
              <footer className="col-span-12 lg:col-span-3 lg:col-start-10 text-right">
                <p className="text-xs text-black font-medium mb-0.5">
                  {t.author}
                </p>
                <p className="text-[10px] tracking-[0.15em] text-[#BCBEC0]/40 uppercase">
                  {t.role}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}
