"use client";
import {useRef, useMemo, useState} from "react";
import {motion, useScroll, useTransform, useInView} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import {useRouter} from "next/navigation";
import Button from "@/components/Button";
import {
  BUDGET_BANDS,
  filtersToParams,
  type PreviewFilters,
} from "@/lib/inventoryFilters";

/* ─── Easing ─────────────────────────────────── */
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ─── Data ───────────────────────────────────── */
const allVehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Land Cruiser 300",
    year: 2023,
    mileage: 16000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 18000000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/537949421_18065065625464881_6680344420159837064_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzcwNDY2NjY5Mjc3NzEzNjg0Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=6943jGku8H4Q7kNvwF4VQId&_nc_oc=Adrs8BHyfsPukilj1YdJX8TATjV0JWDoSBZUPvVU5_it3CSP4wF1URNtd34NwJgoXGI&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=7COww0ZtXTT2g0UiAKKiVw&_nc_ss=7a22e&oh=00_Af_Tj_fKNE7cmCxFEdPla8TGijNXbyhoaypt4sN-sSCDVA&oe=6A4768BC",
    isNewArrival: true,
    isPriceReduced: true,
    isPopular: true,
    isLimitedAvailability: true,
    chassis: "V35A-FTS",
    engineSize: 3500,
    exteriorColor: "Black",
    interiorColor: "Black",
    driveType: "4WD",
    engine: "3.5L V6 Twin-Turbo",
    hasSunroof: true,
    trust: ["Inspection Passed", "Finance Available"],
    slug: "toyota-land-cruiser-300",
  },
  {
    id: 3,
    brand: "Mazda",
    model: "CX-5",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 3800000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/730779657_18098934323464881_3501621813302169595_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzkyNzg4MzE2NzA4MjU4NjU4NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=brLJBoCPqXIQ7kNvwGUHBdB&_nc_oc=AdqzXQop2kb6QVcaRddkf9vthb_Sw90yvjr1uVp0XmkdqYurz31dEgRCrgRSROvl2Bg&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=DASQm_93lBRfOAQk5XswQA&_nc_ss=7a22e&oh=00_Af_xZyoZQtAN8BaoEq_ThosXcnv49Ifm6py78Yno8yrxXg&oe=6A47960F",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "KF2P-326377",
    engineSize: 2200,
    exteriorColor: "Blue",
    interiorColor: "Black",
    driveType: "4WD",
    engine: "2.2L SkyActiv-D Diesel",
    hasSunroof: false,
    trust: ["Verified Mileage", "Import Certified"],
    slug: "mazda-cx-5",
  },
  {
    id: 5,
    brand: "Audi",
    model: "Q7",
    year: 2020,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 11500000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/529002119_18063748313464881_4349924247781516819_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzY5NTI0ODk5NDI0NTc3NjA1Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=HLvOUMGxC0oQ7kNvwElziXQ&_nc_oc=AdpOWCgQgPAPJw13JBUKqmbF54JqslcyBhz1vPR4L-v12tqGLtZq6aUxoE6W0zBKohs&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=A2jJTjNvKgnvC0cQ5ShoGA&_nc_ss=7a22e&oh=00_Af8mf_qYLvtb8CTWCOaVcSDKqycyvZ9EPXPU7RBUzYh_Sg&oe=6A479966",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    exteriorColor: "Pearl White",
    chassis: "4M",
    engineSize: 3000,
    interiorColor: "Black",
    driveType: "Quattro AWD",
    engine: "3.0L V6 TFSI",
    hasSunroof: true,
    trust: ["Inspection Passed", "Finance Available"],
    slug: "audi-q7",
  },
  {
    id: 8,
    brand: "Toyota",
    model: "Hilux",
    year: 2021,
    mileage: 0,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 3100000,
    bodyType: "Pickup",
    availability: "In Stock",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/717025850_18096407294464881_2338474806698816026_n.jpg?stp=dst-jpg_e35_s1080x1080_tt6&_nc_cat=106&ig_cache_key=MzkxMjU5MzEyOTc4ODc3MjQyMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=rTW4AEmwgXAQ7kNvwFPPsHe&_nc_oc=AdrdH4nOak0KKH-IeAyczsfDR--SX8NR_MX1B07haRyC7_pjWUOq3SaMtGCp1C8HIMM&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=MY_I_sjh8i1rK8hV8RpsrA&_nc_ss=7a22e&oh=00_Af8AQ-byqNddyotLgv8dIBBKQdjUKtIOVDIphobI8jFWEA&oe=6A47931B",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
    chassis: "GUN125-3923208",
    engineSize: 2400,
    exteriorColor: "Black",
    interiorColor: "Black",
    driveType: "4WD",
    engine: "2.4L 2GD-FTV Turbo Diesel",
    hasSunroof: false,
    trust: ["Verified Mileage", "Accident Free"],
    slug: "toyota-hilux",
  },
];

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

const bodyTypes = ["Sedan", "SUV", "Coupe", "Pickup", "Convertible"];

/* ─── AnimatedSelect ─────────────────────────── */
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
        aria-disabled={disabled}
        className={[
          "w-full bg-transparent border-b text-sm py-3 pr-8 focus:outline-none appearance-none transition-colors duration-200 cursor-pointer",
          disabled ? "opacity-40 cursor-not-allowed" : "",
          hasValue
            ? "border-black text-black"
            : "border-[#9a9a9a] text-[#3a3a3a] focus:border-[#6a6a6a]",
        ].join(" ")}
        style={{paddingLeft: 0}}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute right-1 top-1/2 pointer-events-none text-[#888]"
        animate={{rotate: hasValue ? 180 : 0, y: "-50%"}}
        transition={
          prefersReduced
            ? {duration: 0}
            : {type: "spring", stiffness: 260, damping: 24}
        }
      >
        <polyline points="6 9 12 15 18 9" />
      </motion.svg>
    </div>
  );
}

/* ─── Trust Indicators ───────────────────────── */
function TrustIndicators({items}: {items: string[]}) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-[#555] uppercase font-medium"
        >
          <span
            aria-hidden
            className="inline-block w-1 h-1 rounded-full bg-[#888] flex-shrink-0"
          />
          {item}
        </span>
      ))}
    </div>
  );
}

/* ─── Vehicle Card ───────────────────────────── */
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
  const entryDelay = index * 0.1;

  const whatsappHref = `https://wa.me/254700000000?text=${encodeURIComponent(
    `Hi, I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model} listed at KSh ${vehicle.price.toLocaleString()}.`,
  )}`;
  const router = useRouter();

  return (
    <motion.article
      initial={prefersReduced ? {opacity: 0} : {opacity: 0, y: 40}}
      animate={sectionInView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 0.75, delay: entryDelay, ease: EASE_OUT_EXPO}}
      className="will-change-transform"
      itemScope
      itemType="https://schema.org/Car"
    >
      <motion.div
        className="flex flex-col h-full group relative rounded-xl overflow-hidden bg-white border border-[#d8d8d8]"
        whileHover={prefersReduced ? {} : {y: -3}}
        transition={{duration: 0.35, ease: EASE_OUT}}
        style={{boxShadow: "0 2px 16px rgba(0,0,0,0.08)"}}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#f0f0f0]">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            itemProp="image"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          />

          {/* Availability — top left */}
          <span className="absolute top-3.5 left-3.5 text-[9px] tracking-[0.18em] uppercase text-white/95 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
            {vehicle.availability}
          </span>

          {/* New arrival — top right */}
          {vehicle.isNewArrival && (
            <span className="absolute top-3.5 right-3.5 text-[9px] tracking-[0.16em] uppercase text-white/85 border border-white/35 px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/12 font-medium">
              Recently Added
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="p-6 flex flex-col flex-1">
          {/* Brand */}
          <p className="text-[10px] tracking-[0.24em] uppercase text-[#777] mb-1 font-medium">
            {vehicle.brand}
          </p>

          {/* Model */}
          <h3
            className="font-semibold text-[17px] text-[#111] leading-snug tracking-[-0.01em] mb-0.5"
            itemProp="name"
          >
            {vehicle.model}
          </h3>

          {/* Year */}
          <p className="text-[11px] text-[#888] mb-4 font-medium">
            {vehicle.year}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-5">
            {[
              vehicle.mileage === 0
                ? "0 km"
                : `${vehicle.mileage.toLocaleString()} km`,
              vehicle.transmission,
              vehicle.fuel,
              vehicle.driveType,
            ].map((spec) => (
              <span
                key={spec}
                className="text-[11px] text-[#555] flex items-center gap-1.5 font-medium"
              >
                <span
                  aria-hidden
                  className="w-[3px] h-[3px] rounded-full bg-[#aaa] flex-shrink-0"
                />
                {spec}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e8e8e8] mb-5" />

          {/* Price */}
          <p
            className="text-[22px] font-semibold text-[#111] tracking-[-0.02em] leading-none mb-1"
            itemProp="offers"
          >
            KSh {vehicle.price.toLocaleString()}
          </p>
          <p className="text-[11px] text-[#777] tracking-[0.04em] mb-5 font-medium">
            Finance available · Trade-in accepted
          </p>

          {/* Trust indicators */}
          {vehicle.trust && vehicle.trust.length > 0 && (
            <TrustIndicators items={vehicle.trust} />
          )}

          <div className="flex-1 min-h-[1rem]" />

          {/* CTAs */}
          <div className="flex items-center gap-3 mt-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push(`/inventory/${vehicle.slug}`)}
              className="flex-1 justify-center"
            >
              View Details
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${vehicle.brand} ${vehicle.model} on WhatsApp`}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#d0d0d0] text-[#888] hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-200 flex-shrink-0"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.76.46 3.4 1.261 4.828L2 22l5.335-1.396A9.952 9.952 0 0012.004 22c5.514 0 9.997-4.483 9.997-9.997 0-5.515-4.483-9.998-9.997-10zm0 18.305a8.303 8.303 0 01-4.23-1.156l-.302-.18-3.168.831.845-3.088-.199-.317A8.288 8.288 0 013.706 12c0-4.576 3.724-8.3 8.3-8.3 4.577 0 8.3 3.724 8.3 8.3-.001 4.576-3.724 8.308-8.302 8.308z" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ─── Search Card ────────────────────────────── */
function SearchInventoryCard({inView}: {inView: boolean}) {
  const router = useRouter();
  const [filters, setFilters] = useState<PreviewFilters>({
    make: "",
    model: "",
    bodyType: "",
    budget: "",
  });

  const availableModels = useMemo(() => {
    if (!filters.make) return [];
    return [
      ...new Set(
        allVehicles.filter((v) => v.brand === filters.make).map((v) => v.model),
      ),
    ].sort();
  }, [filters.make]);

  const handleSearch = () => {
    const params = filtersToParams(filters);
    router.push(`/inventory?${params.toString()}`);
  };

  const activeCount = [
    filters.make,
    filters.model,
    filters.bodyType,
    filters.budget,
  ].filter(Boolean).length;

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 0.7, delay: 0.5, ease: EASE_OUT_EXPO}}
      className="mt-16 border border-[#e0e0e0] bg-white rounded-xl p-8 md:p-10"
      style={{boxShadow: "0 4px 32px rgba(0,0,0,0.07)"}}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#888] mb-1.5 font-medium">
            Inventory Search
          </p>
          <h3 className="text-xl font-semibold text-[#111] tracking-[-0.01em]">
            Find your vehicle
          </h3>
        </div>
        <p className="text-[12px] text-[#666] max-w-xs leading-relaxed font-medium">
          Over 360 verified vehicles across all makes and price ranges.
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
        <div>
          <label
            htmlFor="preview-make"
            className="block text-[10px] tracking-[0.2em] uppercase text-[#666] mb-2 font-semibold"
          >
            Make
          </label>
          <AnimatedSelect
            value={filters.make}
            onChange={(v) =>
              setFilters((prev) => ({...prev, make: v, model: ""}))
            }
            options={brandsList}
            placeholder="Any make"
          />
        </div>

        <div>
          <label
            htmlFor="preview-model"
            className="block text-[10px] tracking-[0.2em] uppercase text-[#666] mb-2 font-semibold"
          >
            Model
          </label>
          <AnimatedSelect
            value={filters.model}
            onChange={(v) => setFilters((prev) => ({...prev, model: v}))}
            options={availableModels}
            placeholder={filters.make ? "Any model" : "Select make first"}
            disabled={!filters.make}
          />
        </div>

        <div>
          <label
            htmlFor="preview-body"
            className="block text-[10px] tracking-[0.2em] uppercase text-[#666] mb-2 font-semibold"
          >
            Body Type
          </label>
          <AnimatedSelect
            value={filters.bodyType}
            onChange={(v) => setFilters((prev) => ({...prev, bodyType: v}))}
            options={bodyTypes}
            placeholder="Any type"
          />
        </div>

        <div>
          <label
            htmlFor="preview-budget"
            className="block text-[10px] tracking-[0.2em] uppercase text-[#666] mb-2 font-semibold"
          >
            Budget
          </label>
          <AnimatedSelect
            value={filters.budget}
            onChange={(v) => setFilters((prev) => ({...prev, budget: v}))}
            options={BUDGET_BANDS.map((b) => b.label)}
            placeholder="Any budget"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[11px] text-[#777] tracking-wide font-medium">
          All vehicles include inspection report · Finance available on most
          models
        </p>
        <div className="flex items-center gap-3 shrink-0">
          {activeCount > 0 && (
            <button
              onClick={() =>
                setFilters({make: "", model: "", bodyType: "", budget: ""})
              }
              className="text-[11px] text-[#888] hover:text-[#333] transition-colors duration-200 underline underline-offset-2"
            >
              Clear
            </button>
          )}
          <Button variant="primary" size="md" onClick={handleSearch}>
            Search Inventory
            {activeCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-[9px] font-bold">
                {activeCount}
              </span>
            )}
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section Heading ────────────────────────── */
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
    <div className="mb-14">
      <motion.p
        className="text-[11px] tracking-[0.34em] uppercase font-semibold mb-4 text-[#777]"
        initial={{opacity: 0, x: -12}}
        animate={inView ? {opacity: 1, x: 0} : {}}
        transition={{duration: 0.65, ease: EASE_OUT_EXPO}}
      >
        Featured Vehicles
      </motion.p>

      <div className="overflow-hidden mb-4">
        <motion.h2
          id="collection-heading"
          className="font-semibold leading-[0.92] tracking-[-0.025em]"
          style={{fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: headingColor}}
          initial={{y: "108%"}}
          animate={inView ? {y: "0%"} : {}}
          transition={{duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.08}}
        >
          Premium vehicles,
          <br />
          <span style={{color: subColor, fontWeight: 300, fontStyle: "italic"}}>
            fully verified.
          </span>
        </motion.h2>
      </div>

      <motion.p
        className="text-[14px] leading-[1.85] max-w-lg text-[#555] font-medium"
        initial={{opacity: 0}}
        animate={inView ? {opacity: 1} : {}}
        transition={{duration: 0.65, delay: 0.26, ease: EASE_OUT_EXPO}}
      >
        Every vehicle passes our inspection, ownership verification, and
        documentation process before it reaches you. No surprises.
      </motion.p>

      <motion.div
        className="mt-7 h-px origin-left"
        style={{backgroundColor: ruleColor, opacity: 0.25}}
        initial={{scaleX: 0}}
        animate={inView ? {scaleX: 1} : {}}
        transition={{duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.18}}
      />
    </div>
  );
}

/* ─── Main export ────────────────────────────── */
export default function ModelsPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, {once: true, amount: 0.1});

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  const headingColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#FFFFFF", "#0a0a0a"],
  );
  const subColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#BCBEC0", "#555555"],
  );
  const ruleColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#BCBEC0", "#BCBEC0"],
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
            priceCurrency: "KES",
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
      className="relative py-28 md:py-36 px-6 md:px-16 overflow-hidden"
      aria-labelledby="collection-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      {/* Background scale-in */}
      <motion.div
        className="absolute inset-0 z-0 bg-white"
        style={
          prefersReduced
            ? {}
            : {scale, opacity, willChange: "transform, opacity"}
        }
      />

      {/* Subtle sweep */}
      {!prefersReduced && (
        <motion.div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            translateX: sweepX,
            background:
              "linear-gradient(100deg, transparent 0%, rgba(188,190,192,0.05) 45%, rgba(188,190,192,0.10) 50%, rgba(188,190,192,0.05) 55%, transparent 100%)",
            width: "60%",
            mixBlendMode: "multiply",
          }}
        />
      )}

      <div className="relative max-w-[1440px] mx-auto z-10">
        <SectionHeading
          inView={inView}
          headingColor={headingColor}
          subColor={subColor}
          ruleColor={ruleColor}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {allVehicles.map((v, i) => (
            <FeaturedVehicleCard
              key={v.id}
              vehicle={v}
              index={i}
              sectionInView={inView}
            />
          ))}
        </div>

        <SearchInventoryCard inView={inView} />

        <motion.div
          className="mt-12 flex justify-center"
          initial={{opacity: 0}}
          animate={inView ? {opacity: 1} : {}}
          transition={{duration: 0.55, delay: 0.65, ease: EASE_OUT_EXPO}}
        >
          <Button variant="primary" size="lg" href="/inventory">
            View Full Inventory
            <span className="ml-2">→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
