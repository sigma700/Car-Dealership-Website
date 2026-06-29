"use client";
import {useRef, useMemo, useState} from "react";
import {motion, useScroll, useTransform, useInView} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import {useRouter} from "next/navigation";
import Button from "@/components/Button";

/* ───────────────────────────────────────────────
   Easing
   ─────────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────────────────────────────
   Data – real vehicles (subset)
   ─────────────────────────────────────────────── */
const allVehicles = [
  {
    id: 1,
    brand: "BMW",
    model: "M5",
    year: 2023,
    mileage: 15000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 320000,
    bodyType: "Sedan",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    brand: "Mercedes-Benz",
    model: "S-Class",
    year: 2023,
    mileage: 1200,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 550000,
    bodyType: "Sedan",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    brand: "Lamborghini",
    model: "Urus",
    year: 2023,
    mileage: 3000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 950000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1607863557027-68d4d2b3c16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    brand: "Range Rover",
    model: "Sport",
    year: 2023,
    mileage: 6000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 420000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

/* Full brands list for the dropdown */
const brandsList = [
  "BMW",
  "Mercedes-Benz",
  "Toyota",
  "Lamborghini",
  "Subaru",
  "Range Rover",
  "Porsche",
  "Audi",
];

/* All body types from the full dataset */
const bodyTypes = ["Sedan", "SUV", "Coupe", "Pickup", "Convertible"];

/* ───────────────────────────────────────────────
   Animated Select Dropdown (arrow fix)
   ─────────────────────────────────────────────── */
function AnimatedSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const hasValue = value !== "";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full bg-black border rounded-none px-4 py-3 text-sm text-white focus:outline-none appearance-none pr-10 transition-colors duration-500 ${
          hasValue
            ? "border-white"
            : "border-[#BCBEC0]/30 focus:border-[#BCBEC0]"
        } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute right-3 top-1/2 pointer-events-none"
        initial={{rotate: 0, y: "-50%", color: "#BCBEC0"}}
        animate={{
          rotate: hasValue ? 180 : 0,
          y: "-50%",
          color: hasValue ? "#FFFFFF" : "#BCBEC0",
        }}
        transition={
          prefersReduced
            ? {duration: 0}
            : {type: "spring", stiffness: 200, damping: 22}
        }
      >
        <polyline points="6 9 12 15 18 9" />
      </motion.svg>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Featured Vehicle Card – font updated
   ─────────────────────────────────────────────── */
function FeaturedVehicleCard({
  vehicle,
  index,
  sectionInView,
}: {
  vehicle: (typeof allVehicles)[0];
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
      <div className="flex flex-col h-full group relative rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] transition-shadow duration-700 border border-[#BCBEC0]/30 hover:border-[#BCBEC0]/60">
        <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            itemProp="image"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
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
          {/* Badge – now matches Hero’s trust‑badge style */}
          <span className="absolute top-4 left-4 text-[12px] tracking-[0.08em] text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded z-10">
            {vehicle.availability}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Card title – use font-bold instead of font-display */}
          <h3 className="font-bold text-xl text-black" itemProp="name">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p
            className="text-sm text-[#BCBEC0]/70"
            itemProp="vehicleConfiguration"
          >
            {vehicle.year} · {vehicle.mileage.toLocaleString()} km ·{" "}
            {vehicle.transmission} · {vehicle.fuel}
          </p>

          <div className="flex-1" />

          {/* Price – remove font-mono, keep normal weight */}
          <p className="text-lg text-[#BCBEC0]" itemProp="offers">
            AED {vehicle.price.toLocaleString()}
          </p>
          <div className="flex gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              href={`/inventory/${vehicle.id}`}
            >
              View Details
              <span className="ml-2">→</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              href={`/contact?model=${encodeURIComponent(vehicle.model)}`}
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

/* ───────────────────────────────────────────────
   Search Card – font updated
   ─────────────────────────────────────────────── */
function SearchInventoryCard() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const availableModels = useMemo(() => {
    if (!make) return [];
    const models = new Set(
      allVehicles.filter((v) => v.brand === make).map((v) => v.model),
    );
    return Array.from(models).sort();
  }, [make]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    if (bodyType) params.set("bodyType", bodyType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-16 bg-white rounded-2xl shadow-2xl border border-[#BCBEC0]/20 p-8 md:p-10">
      {/* Card heading – font-bold instead of font-display */}
      <h3 className="font-bold text-2xl md:text-3xl text-black mb-6">
        Find Your Next Vehicle
      </h3>
      <p className="text-sm text-[#BCBEC0]/70 mb-8">
        Use the filters below to search our complete inventory.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnimatedSelect
          value={make}
          onChange={(v) => {
            setMake(v);
            setModel("");
          }}
          options={brandsList}
          placeholder="All Makes"
        />

        <AnimatedSelect
          value={model}
          onChange={(v) => setModel(v)}
          options={availableModels}
          placeholder="All Models"
          disabled={!make}
        />

        <AnimatedSelect
          value={bodyType}
          onChange={(v) => setBodyType(v)}
          options={bodyTypes}
          placeholder="All Types"
        />

        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-black border border-[#BCBEC0]/30 rounded-none px-3 py-3 text-sm text-white placeholder-[#BCBEC0]/40 focus:outline-none focus:border-[#BCBEC0]"
          />
          <span className="text-[#BCBEC0]/50 text-sm">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-black border border-[#BCBEC0]/30 rounded-none px-3 py-3 text-sm text-white placeholder-[#BCBEC0]/40 focus:outline-none focus:border-[#BCBEC0]"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="primary" size="md" onClick={handleSearch}>
          Search Inventory
          <span className="ml-2">→</span>
        </Button>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Section Heading – font updated
   ─────────────────────────────────────────────── */
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
      {/* Small tag – now matches Hero’s badge style */}
      <motion.p
        className="text-[11px] tracking-[0.3em] uppercase mb-3 font-medium"
        style={{color: subColor}}
        initial={{opacity: 0, x: -16}}
        animate={inView ? {opacity: 1, x: 0} : {}}
        transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
      >
        FEATURED VEHICLES
      </motion.p>
      <div className="overflow-hidden">
        {/* Main heading – font-bold instead of font-display */}
        <motion.h2
          className="font-bold leading-[0.88] tracking-tight"
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

/* ───────────────────────────────────────────────
   Main Section (unchanged layout)
   ─────────────────────────────────────────────── */
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

  const sweepX = useTransform(scrollYProgress, [0, 1], ["-30%", "130%"]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: allVehicles.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Car",
          name: `${v.brand} ${v.model}`,
          image: v.image,
          offers: {
            "@type": "Offer",
            priceCurrency: "AED",
            price: v.price,
          },
        },
      })),
    }),
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 md:px-16 overflow-hidden"
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
          Featured Vehicles – Curated, Certified, Delivered
        </h2>
        <SectionHeading
          inView={inView}
          headingColor={headingColor}
          subColor={subColor}
          ruleColor={ruleColor}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allVehicles.map((v, i) => (
            <FeaturedVehicleCard
              key={v.id}
              vehicle={v}
              index={i}
              sectionInView={inView}
            />
          ))}
        </div>

        <SearchInventoryCard />

        <div className="mt-12 flex justify-center">
          <Button variant="primary" size="lg" href="/inventory">
            View Full Inventory
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
