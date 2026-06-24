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
import {
  MdOutlineStyle,
  MdOutlineTexture,
  MdOutlineForest,
  MdOutlineHexagon,
} from "react-icons/md";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import Link from "next/link";

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

// Updated material options with React Icons
const materialOptions = [
  {
    name: "Bridge of Weir Leather",
    description: "Full‑grain, aniline‑dyed hides from Scotland.",
    color: "#8B5A2B",
    icon: MdOutlineStyle,
  },
  {
    name: "Alcantara®",
    description: "Suede‑like microfiber for a technical, modern finish.",
    color: "#2C2C2C",
    icon: MdOutlineTexture,
  },
  {
    name: "Open‑Pore Timber",
    description: "Hand‑selected veneers with a matte, natural feel.",
    color: "#6B4E31",
    icon: MdOutlineForest,
  },
  {
    name: "Forged Carbon",
    description:
      "Lightweight, high‑strength composite with a unique marbled pattern.",
    color: "#1A1A1A",
    icon: MdOutlineHexagon,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Private Consultation",
    description:
      "Meet your personal design advisor at our atelier or via video call. We’ll explore your taste, lifestyle, and desires.",
  },
  {
    step: "02",
    title: "Design & Curation",
    description:
      "Our artisans craft a fully personalized specification—paint, leather, stitching, and hidden details only you will know.",
  },
  {
    step: "03",
    title: "Artisan Build",
    description:
      "Your vehicle enters our dedicated bespoke bay. Every element is hand‑fitted by a single master technician over 12 weeks.",
  },
  {
    step: "04",
    title: "Private Unveiling",
    description:
      "We deliver your creation to your chosen location and walk you through every crafted detail before you take the wheel.",
  },
];

export default function BespokePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Ken Burns drift values
  const bgX = useMotionValue(0);
  const bgScale = useMotionValue(1);

  // Start continuous drift (only if motion is allowed)
  useEffect(() => {
    if (prefersReduced) return;

    const xAnimation = animate(bgX, [0, -5, 0, 5, 0], {
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    });
    const scaleAnimation = animate(bgScale, [1, 1.05, 1, 1.05, 1], {
      duration: 35,
      repeat: Infinity,
      ease: "linear",
    });

    return () => {
      xAnimation.stop();
      scaleAnimation.stop();
    };
  }, [prefersReduced, bgX, bgScale]);

  // Scroll‑driven animations for hero overlay and text (unchanged)
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
        {/* Background image with Ken Burns drift */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnadawobi/image/upload/v1782319817/pexels-chris-clark-1933184-5608576_u83gbw.jpg')",
            x: prefersReduced ? 0 : bgX,
            scale: prefersReduced ? 1 : bgScale,
            opacity: prefersReduced ? 1 : heroOpacity,
          }}
        />

        {/* Sliding cream overlay that reveals as you scroll */}
        <motion.div
          className="absolute inset-0 bg-[#f0f1f3] z-10"
          style={{
            y: prefersReduced ? "0%" : heroOverlayY,
          }}
        />

        {/* Dark gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/80 to-transparent z-20" />

        {/* Hero content */}
        <div className="relative z-30 flex flex-col justify-center h-full max-w-[1440px] mx-auto px-6 md:px-16">
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
            className="text-xs md:text-sm tracking-[0.3em] text-gold mb-4"
          >
            BESPOKE ATELIER
          </motion.p>

          <motion.h1
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1}}
            className="text-4xl md:text-6xl lg:text-7xl font-display text-chrome leading-[0.92] max-w-2xl"
          >
            Your imagination,
            <br />
            <span className="text-gold">our craft.</span>
          </motion.h1>

          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3}}
            className="text-base md:text-xl text-silver/70 mt-6 max-w-lg"
          >
            No two Autopedia Bespoke vehicles are ever the same. Yours will be
            the only one in the world.
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.5}}
            className="mt-8"
          >
            <a
              href="/contact?subject=bespoke"
              className="btn-slide btn-slide-gold px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
            >
              <span>Begin Your Commission</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Introduction Section ─── */}
      <BespokeIntro />

      {/* ─── Materials Section ─── */}
      <MaterialsShowcase />

      {/* ─── Process Section ─── */}
      <ProcessSection />

      {/* ─── Gallery Section ─── */}
      <GallerySection />

      {/* ─── CTA Section ─── */}
      <BespokeCTA />
    </div>
  );
}

function BespokeIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.3});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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
  const statColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#8A8278", "rgba(200,202,208,0.7)"],
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
            src="https://res.cloudinary.com/dnadawobi/image/upload/v1782320227/pexels-criticalimagery-36646940_t8ifsu.jpg"
            alt="Bespoke atelier interior"
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
            THE AUTOPEDIA DIFFERENCE
          </motion.p>

          <motion.h2
            initial={{opacity: 0, y: 20}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO}}
            className="text-3xl md:text-4xl font-display leading-[0.95] mb-6"
            style={{color: headingColor}}
          >
            Beyond the standard
            <br />
            <span style={{color: goldColor}}>specification.</span>
          </motion.h2>

          <motion.p
            initial={{opacity: 0, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO}}
            className="text-base leading-relaxed mb-6"
            style={{color: subColor}}
          >
            Our bespoke programme invites you to step inside the creative
            process. From the first sketch to the final stitch, every decision
            is yours. Choose from over 12,000 colours, rare materials, and
            personalised monograms – all executed by our master artisans.
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO}}
            className="flex gap-6 text-sm font-mono tracking-wider"
            style={{color: statColor}}
          >
            <span>✦ 12,000+ Colour Options</span>
            <span>✦ 8 Leather Grades</span>
            <span>✦ 6‑Month Average Build</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MaterialsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.2});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const angle = useTransform(scrollYProgress, [0, 0.3], [0, 135]);
  const dynamicGradient = useTransform(
    angle,
    (a) => `linear-gradient(${a}deg, #0A0A0B 50%, #f0f1f3 50%)`,
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 overflow-hidden"
      style={{backgroundColor: "#0A0A0B"}}
    >
      {prefersReduced && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0A0A0B 50%, #f0f1f3 50%)",
          }}
        />
      )}

      {!prefersReduced && (
        <motion.div
          className="absolute inset-0"
          style={{background: dynamicGradient}}
        />
      )}

      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] text-gold mb-3">
            MATERIALS & FINISHES
          </p>

          <motion.h2
            initial={{opacity: 0}}
            animate={inView ? {opacity: 1} : {}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
            className="text-3xl md:text-5xl font-display leading-[1.1]"
            style={{
              color: "#ffffff",
              mixBlendMode: "difference",
            }}
          >
            Curated for the
            <br />
            <span
              style={{
                color: "#ffffff",
                mixBlendMode: "difference",
              }}
            >
              connoisseur.
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materialOptions.map((mat, i) => {
            const Icon = mat.icon; // React component
            return (
              <motion.div
                key={mat.name}
                initial={{opacity: 0, y: 40}}
                animate={inView ? {opacity: 1, y: 0} : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1 * i,
                  ease: EASE_OUT_EXPO,
                }}
                className="group relative bg-graphite rounded-2xl p-6 flex flex-col items-start overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute inset-0 z-0 rounded-2xl bg-[#f0f1f3] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                <div className="relative z-10 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-5 h-5 text-gold" />
                </div>

                <h3 className="relative z-10 text-lg font-display text-silver mb-2 group-hover:text-gray-800 transition-colors">
                  {mat.name}
                </h3>

                <p className="relative z-10 text-sm text-platinum/60 leading-relaxed group-hover:text-gray-600 transition-colors">
                  {mat.description}
                </p>

                <span
                  className="relative z-10 mt-4 w-6 h-6 rounded-full border border-gold/30"
                  style={{backgroundColor: mat.color}}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.15});

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 bg-[#f0f1f3] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{opacity: 0, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
            className="text-xs tracking-[0.2em] text-amber-800 mb-3"
          >
            THE JOURNEY
          </motion.p>

          <motion.h2
            initial={{opacity: 0, y: 20}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1}}
            className="text-3xl md:text-5xl font-display text-[#1A1A1A] leading-[1.1]"
          >
            From vision to
            <br />
            <span className="text-gold">reality.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 right-0">
            <motion.div
              className="h-[2px] bg-gold/30 origin-left"
              initial={{scaleX: 0}}
              animate={inView ? {scaleX: 1} : {}}
              transition={{duration: 1.0, delay: 0.5, ease: EASE_OUT_EXPO}}
            />
          </div>

          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{opacity: 0, y: 30}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: EASE_OUT_EXPO,
              }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.div
                className="relative z-10 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-4 overflow-hidden"
                initial={{scale: 0}}
                animate={inView ? {scale: 1} : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.15,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gold/20 rounded-full"
                  initial={{scale: 0}}
                  animate={inView ? {scale: 1} : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + i * 0.15,
                    ease: "easeOut",
                  }}
                />
                <span className="relative z-10 text-gold font-mono text-sm tracking-wider">
                  {step.step}
                </span>
              </motion.div>

              <h3 className="text-xl font-display text-[#1A1A1A] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#5A4E3C] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.1});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageProps = [
    {
      opacity: useTransform(scrollYProgress, [0, 0.25], [0, 1]),
      y: useTransform(scrollYProgress, [0, 0.25], [40, 0]),
    },
    {
      opacity: useTransform(scrollYProgress, [0.2, 0.45], [0, 1]),
      y: useTransform(scrollYProgress, [0.2, 0.45], [40, 0]),
    },
    {
      opacity: useTransform(scrollYProgress, [0.4, 0.65], [0, 1]),
      y: useTransform(scrollYProgress, [0.4, 0.65], [40, 0]),
    },
    {
      opacity: useTransform(scrollYProgress, [0.6, 0.85], [0, 1]),
      y: useTransform(scrollYProgress, [0.6, 0.85], [40, 0]),
    },
  ];

  const galleryImages = [
    "https://res.cloudinary.com/dnadawobi/image/upload/v1782323660/pexels-mikebirdy-18231618_g1ljyu.jpg",
    "https://res.cloudinary.com/dnadawobi/image/upload/v1782323634/pexels-memet-oz-296480690-17436155_fr9swt.jpg",
    "https://res.cloudinary.com/dnadawobi/image/upload/v1782323605/pexels-criticalimagery-36646951_dbo8vc.jpg",
    "https://res.cloudinary.com/dnadawobi/image/upload/v1782323546/pexels-bulat843-1243575272-30589157_hlkzbj.jpg",
  ];

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
            PAST COMMISSIONS
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-[#1A1A1A] leading-[1.1]">
            A glimpse of
            <br />
            <span className="text-gold">what’s possible.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              style={
                prefersReduced
                  ? {}
                  : {opacity: imageProps[i].opacity, y: imageProps[i].y}
              }
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              <img
                src={src}
                alt={`Bespoke commission ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white text-sm font-display tracking-wider">
                  Commission #{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, delay: 0.6}}
          className="mt-10 text-center"
        >
          <Link
            href="/contact?subject=bespoke-portfolio"
            className="btn-slide btn-slide-black px-8 py-3 text-base font-medium tracking-wide inline-flex items-center justify-center"
          >
            <span>Request Full Portfolio</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function BespokeCTA() {
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
          START YOUR COMMISSION
        </motion.p>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-display leading-[1.1] mb-6 text-[#1A1A1A]"
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO}}
        >
          Let’s create your
          <br />
          <span className="text-gold">masterpiece.</span>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto text-[#5A4E3C]"
          initial={{opacity: 0, y: 10}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO}}
        >
          Our bespoke advisors are ready to guide you through every detail. No
          obligation – just a conversation about what’s possible.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO}}
        >
          <a
            href="/contact?subject=bespoke"
            className="btn-slide btn-slide-gold px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
          >
            <span>Schedule Consultation</span>
          </a>
          <a
            href="/brochure?type=bespoke"
            className="btn-slide btn-slide-black px-8 py-3 text-base md:text-lg font-medium tracking-wide inline-flex items-center justify-center"
          >
            <span>Download Brochure</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
