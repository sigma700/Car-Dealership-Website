"use client";
import {useRef, useMemo} from "react";
import {motion, useScroll, useTransform, useInView} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import Link from "next/link";
import Button from "@/components/Button"; // new reusable button

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const models = [
  {
    name: "Aurelian S",
    tagline: "Performance.",
    price: 185000,
    slug: "aurelian-s",
    accent: "#BCBEC0",
    label: "01",
    spec: "4.2s · 612 hp · Saloon",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782256146/pexels-vadutskevich-15513826_lcsqla.jpg",
  },
  {
    name: "Aurelian X",
    tagline: "Command.",
    price: 210000,
    slug: "aurelian-x",
    accent: "#BCBEC0",
    label: "02",
    spec: "5.1s · 503 hp · SUV",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782258013/kai-winckler-SVRpPD2p0RQ-unsplash_yabar2.jpg",
  },
  {
    name: "Grand Tourer",
    tagline: "Distance.",
    price: 245000,
    slug: "grand-tourer",
    accent: "#BCBEC0",
    label: "03",
    spec: "3.8s · 680 hp · GT Coupé",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782258039/mustafa-fatemi-ZLjirtjrjYg-unsplash_bhv7ln.jpg",
  },
];

function ModelCard({
  model,
  index,
  sectionInView,
}: {
  model: (typeof models)[0];
  index: number;
  sectionInView: boolean;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const entryDelay = index * 0.14;

  return (
    <motion.article
      initial={prefersReduced ? {opacity: 0} : {opacity: 0, y: 70, scale: 0.94}}
      animate={
        sectionInView
          ? prefersReduced
            ? {opacity: 1}
            : {opacity: 1, y: 0, scale: 1}
          : {}
      }
      transition={{
        duration: 1.1,
        delay: entryDelay,
        ease: EASE_OUT_EXPO,
      }}
      className="will-change-transform"
      itemScope
      itemType="https://schema.org/Car"
    >
      <div className="group relative rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] transition-shadow duration-700 border border-[#BCBEC0]/30 hover:border-[#BCBEC0]/60">
        <div className="relative overflow-hidden h-72">
          <img
            src={model.image}
            alt={`${model.name} – ${model.spec}`}
            itemProp="image"
            className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10 opacity-80 group-hover:opacity-60 transition-opacity duration-700"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
          <span
            className="absolute top-4 left-4 font-mono text-xs tracking-widest text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded z-10"
            aria-hidden="true"
          >
            {model.label}
          </span>
          <span
            className="absolute bottom-4 left-4 z-10 text-xs font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
            style={{color: model.accent}}
          >
            {model.tagline}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <h3 className="font-display text-xl text-black" itemProp="name">
            {model.name}
          </h3>
          <p
            className="text-sm text-[#BCBEC0]/70"
            itemProp="vehicleConfiguration"
          >
            {model.spec}
          </p>
          <p className="text-lg font-mono text-[#BCBEC0]" itemProp="offers">
            AED {model.price.toLocaleString()}
          </p>
          <div className="flex gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              href={`/models/${model.slug}`}
            >
              View Details
              <span className="ml-2">→</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              href={`/contact?model=${model.slug}`}
            >
              Book Test Drive
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ScrollCoverCard({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0.15, 0.35], ["60%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.15, 0.35], [0.2, 0.55]);

  return (
    <motion.div
      className="sticky z-20 mx-auto max-w-[600px]"
      style={{
        bottom: "3rem",
        translateY: prefersReduced ? "0%" : translateY,
        opacity: prefersReduced ? 1 : opacity,
      }}
    >
      <div className="cover-card relative rounded-2xl p-8 text-center shadow-2xl border border-[#BCBEC0]/20 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: prefersReduced ? 0.3 : glow,
            background:
              "radial-gradient(circle at 50% 0%, rgba(188,190,192,0.35), transparent 65%)",
          }}
        />
        <p className="relative text-xs tracking-widest text-[#BCBEC0] mb-2">
          JOIN 1,200+ UAE DRIVERS
        </p>
        <h3 className="relative text-2xl font-display text-white mb-3">
          Your perfect drive is waiting
        </h3>
        <p className="relative text-sm text-[#BCBEC0]/70 mb-6">
          New inventory added weekly – these models move fast.
        </p>
        <Button variant="secondary" size="sm" href="/models">
          Browse Current Inventory
          <span className="ml-2">→</span>
        </Button>
      </div>
    </motion.div>
  );
}

function SectionHeading({
  inView,
  headingColor,
  subColor,
  ruleColor,
}: {
  inView: boolean;
  headingColor: any;
  subColor: any;
  ruleColor: any;
}) {
  return (
    <div className="mb-12">
      <motion.p
        className="text-xs tracking-widest mb-3"
        style={{color: subColor}}
        initial={{opacity: 0, x: -16}}
        animate={inView ? {opacity: 1, x: 0} : {}}
        transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
      >
        BEST SELLING
      </motion.p>
      <div className="overflow-hidden">
        <motion.h2
          className="font-display leading-[0.88] tracking-tight"
          style={{fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: headingColor}}
          initial={{y: "105%"}}
          animate={inView ? {y: "0%"} : {}}
          transition={{duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.1}}
        >
          Curated. Certified. Delivered.
        </motion.h2>
      </div>
      <motion.p
        className="text-sm md:text-base mt-3 max-w-xl"
        style={{color: subColor}}
        initial={{opacity: 0}}
        animate={inView ? {opacity: 1} : {}}
        transition={{duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO}}
      >
        Hand‑selected pre‑owned luxury, ready for your driveway tomorrow.
      </motion.p>
      <motion.div
        className="mt-6 h-px origin-left"
        style={{backgroundColor: ruleColor}}
        initial={{scaleX: 0}}
        animate={inView ? {scaleX: 1} : {}}
        transition={{duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.25}}
      />
    </div>
  );
}

export default function ModelsPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.15});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const headingColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#FFFFFF", "#000000"],
  );
  const subColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#BCBEC0", "#000000"],
  );
  const ruleColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#BCBEC0", "#000000"],
  );
  const footerTextColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#BCBEC0", "#000000"],
  );
  const footerBorderColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#BCBEC0", "#000000"],
  );
  const linkColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#BCBEC0", "#000000"],
  );
  const sweepX = useTransform(scrollYProgress, [0, 1], ["-30%", "130%"]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: models.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Car",
          name: m.name,
          image: m.image,
          offers: {
            "@type": "Offer",
            priceCurrency: "AED",
            price: m.price,
          },
        },
      })),
    }),
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-8 overflow-hidden min-h-[150vh]"
      aria-labelledby="collection-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#FFFFFF",
          scale: prefersReduced ? 1 : scale,
          opacity: prefersReduced ? 1 : opacity,
          willChange: "transform, opacity",
        }}
      />

      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            translateX: sweepX,
            background:
              "linear-gradient(100deg, transparent 0%, rgba(188,190,192,0.08) 45%, rgba(188,190,192,0.16) 50%, rgba(188,190,192,0.08) 55%, transparent 100%)",
            width: "60%",
            mixBlendMode: "multiply",
          }}
        />
      )}

      <div className="relative max-w-[1440px] mx-auto z-10">
        <h2 id="collection-heading" className="sr-only">
          The Collection – Curated, Certified, Delivered
        </h2>
        <SectionHeading
          inView={inView}
          headingColor={headingColor}
          subColor={subColor}
          ruleColor={ruleColor}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {models.map((model, i) => (
            <ModelCard
              key={model.slug}
              model={model}
              index={i}
              sectionInView={inView}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 flex items-center justify-between border-t pt-6"
          style={{borderColor: footerBorderColor}}
          initial={{opacity: 0}}
          animate={inView ? {opacity: 1} : {}}
          transition={{delay: 0.6, duration: 0.7, ease: EASE_OUT}}
        >
          <motion.span
            className="font-mono text-xs tracking-widest"
            style={{color: footerTextColor}}
          >
            {models.length} MODELS AVAILABLE
          </motion.span>
          <motion.div style={{color: linkColor}}>
            <Link
              href="/models"
              className="font-mono text-xs tracking-widest transition-colors duration-300 hover:opacity-80"
            >
              VIEW ALL →
            </Link>
          </motion.div>
        </motion.div>

        <ScrollCoverCard sectionRef={sectionRef} />
      </div>
    </section>
  );
}
