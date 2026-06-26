"use client";
import {useState, useRef, useEffect, useMemo, useCallback} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  MotionValue,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import CTABand from "@/components/CTABand";

/* ─── EASING & CONSTANTS ─── */
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const SPRING_SMOOTH = {stiffness: 60, damping: 20, mass: 1};

/* ─── Sliding Buttons ─── */
function SlidingWhiteButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();
  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide overflow-hidden rounded-lg group"
      style={{backgroundColor: "#FFFFFF"}}
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      <motion.span
        className="absolute inset-0 bg-black"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      <motion.span
        className="relative z-10 ml-2 text-black group-hover:text-white transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function SlidingOutlineButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();
  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide overflow-hidden rounded-lg group border border-white"
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
        {children}
      </span>
      <motion.span
        className="relative z-10 ml-2 text-white group-hover:text-black transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function SlidingWhiteButtonLg({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();
  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide overflow-hidden rounded-lg group"
      style={{backgroundColor: "#FFFFFF"}}
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      <motion.span
        className="absolute inset-0 bg-black"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      <motion.span
        className="relative z-10 ml-2 text-black group-hover:text-white transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function SlidingOutlineButtonLg({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();
  return (
    <motion.a
      href={href}
      className="relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide overflow-hidden rounded-lg group border border-white"
      whileHover={prefersReduced ? {} : {scale: 1.02}}
      whileTap={prefersReduced ? {} : {scale: 0.98}}
    >
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{y: "100%"}}
        whileHover={{y: "0%"}}
        transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
      />
      <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
        {children}
      </span>
      <motion.span
        className="relative z-10 ml-2 text-white group-hover:text-black transition-colors duration-300"
        whileHover={{x: 4}}
        transition={{duration: 0.25}}
      >
        →
      </motion.span>
    </motion.a>
  );
}

/* ─── DATA ─── */
const brands = [
  {
    name: "BMW",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mercedes-Benz",
    count: 18,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Toyota",
    count: 52,
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Lamborghini",
    count: 7,
    image:
      "https://images.unsplash.com/photo-1597723954153-b3cb8b0c1e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Subaru",
    count: 15,
    image:
      "https://images.unsplash.com/photo-1611651338412-84094e6a1c3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Range Rover",
    count: 11,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Porsche",
    count: 9,
    image:
      "https://images.unsplash.com/photo-1611859266238-4c0f5e3f8f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Audi",
    count: 14,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

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
    isNewArrival: true,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
  },
  {
    id: 2,
    brand: "BMW",
    model: "X5",
    year: 2022,
    mileage: 22000,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 280000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1607853202273-2c8f1d7a2b7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: false,
    isPriceReduced: true,
    isPopular: false,
    isLimitedAvailability: false,
  },
  {
    id: 3,
    brand: "BMW",
    model: "330i",
    year: 2023,
    mileage: 5000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 195000,
    bodyType: "Sedan",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: false,
    isLimitedAvailability: true,
  },
  {
    id: 4,
    brand: "Mercedes-Benz",
    model: "C200",
    year: 2023,
    mileage: 8000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 230000,
    bodyType: "Sedan",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: true,
    isPriceReduced: false,
    isPopular: false,
    isLimitedAvailability: false,
  },
  {
    id: 5,
    brand: "Mercedes-Benz",
    model: "GLE",
    year: 2022,
    mileage: 19000,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 340000,
    bodyType: "SUV",
    availability: "Reserved",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: false,
    isPriceReduced: true,
    isPopular: true,
    isLimitedAvailability: false,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: true,
  },
  {
    id: 7,
    brand: "Toyota",
    model: "Land Cruiser Prado",
    year: 2022,
    mileage: 30000,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 210000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: false,
    isPriceReduced: true,
    isPopular: true,
    isLimitedAvailability: false,
  },
  {
    id: 8,
    brand: "Toyota",
    model: "Hilux",
    year: 2023,
    mileage: 10000,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 165000,
    bodyType: "Pickup",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: true,
    isPriceReduced: false,
    isPopular: false,
    isLimitedAvailability: false,
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
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: true,
  },
  {
    id: 10,
    brand: "Subaru",
    model: "Forester",
    year: 2022,
    mileage: 25000,
    transmission: "CVT",
    fuel: "Petrol",
    price: 95000,
    bodyType: "SUV",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1610368722285-3d7e5e6c5b01?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: false,
    isPriceReduced: true,
    isPopular: false,
    isLimitedAvailability: false,
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
    isNewArrival: true,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: false,
  },
  {
    id: 12,
    brand: "Range Rover",
    model: "Defender",
    year: 2022,
    mileage: 18000,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 350000,
    bodyType: "SUV",
    availability: "Reserved",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: false,
    isPriceReduced: true,
    isPopular: false,
    isLimitedAvailability: true,
  },
  {
    id: 13,
    brand: "Porsche",
    model: "911 Carrera",
    year: 2023,
    mileage: 4000,
    transmission: "PDK",
    fuel: "Petrol",
    price: 650000,
    bodyType: "Coupe",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: true,
    isLimitedAvailability: true,
  },
  {
    id: 14,
    brand: "Audi",
    model: "A8",
    year: 2023,
    mileage: 9000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 380000,
    bodyType: "Sedan",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNewArrival: false,
    isPriceReduced: false,
    isPopular: false,
    isLimitedAvailability: false,
  },
];

function getModelsForBrand(brand: string) {
  return [
    ...new Set(
      allVehicles.filter((v) => v.brand === brand).map((v) => v.model),
    ),
  ].sort();
}

function AnimatedCounter({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.5});
  const prefersReduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setCount(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, prefersReduced]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── BRAND CARD ─── */
function BrandCard({
  brand,
  isSelected,
  onClick,
  index,
}: {
  brand: (typeof brands)[0];
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(cardRef, {once: true, amount: 0.2});
  return (
    <motion.button
      ref={cardRef}
      onClick={onClick}
      initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 24}}
      animate={
        inView
          ? {opacity: 1, y: 0}
          : prefersReduced
            ? {opacity: 1}
            : {opacity: 0, y: 24}
      }
      transition={{duration: 0.6, delay: index * 0.07, ease: EASE_OUT_EXPO}}
      className="group relative overflow-hidden rounded-2xl bg-black aspect-[4/5] flex flex-col items-center justify-end p-6 text-center cursor-pointer"
      style={{
        boxShadow: isSelected
          ? "0 0 0 1.5px #BCBEC0, 0 8px 32px rgba(0,0,0,0.6)"
          : "0 4px 24px rgba(0,0,0,0.4)",
      }}
      whileHover={
        prefersReduced
          ? {}
          : {scale: 1.025, boxShadow: "0 12px 40px rgba(0,0,0,0.7)"}
      }
      transition={{duration: 0.35, ease: EASE_OUT_EXPO}}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={brand.image}
          alt={brand.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          whileHover={prefersReduced ? {} : {scale: 1.06}}
          transition={{duration: 0.7, ease: EASE_OUT}}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#BCBEC0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[#BCBEC0]/20 group-hover:bg-[#BCBEC0]/50 transition-colors duration-500" />
      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          className="font-mono text-3xl text-[#BCBEC0] mb-1 tabular-nums"
          initial={{opacity: 0}}
          animate={inView ? {opacity: 1} : {}}
          transition={{delay: index * 0.07 + 0.3, duration: 0.5}}
        >
          {brand.count}
        </motion.span>
        <h3 className="text-lg font-display text-white mb-0.5 leading-tight">
          {brand.name}
        </h3>
        <p className="text-[11px] text-[#BCBEC0]/50 tracking-wide">
          vehicles available
        </p>
      </div>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#BCBEC0] flex items-center justify-center text-black text-xs font-bold"
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0, opacity: 0}}
            transition={{type: "spring", stiffness: 400, damping: 22}}
          >
            ✓
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.button>
  );
}

/* ─── MODEL SELECTOR ─── */
function ModelSelector({
  brand,
  selectedModel,
  onSelectModel,
}: {
  brand: string;
  selectedModel: string | null;
  onSelectModel: (m: string | null) => void;
}) {
  const models = useMemo(() => getModelsForBrand(brand), [brand]);
  return (
    <motion.div
      initial={{opacity: 0, y: -8}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -8}}
      transition={{duration: 0.3}}
      className="flex flex-wrap gap-3 justify-center py-6"
    >
      <button
        onClick={() => onSelectModel(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${!selectedModel ? "bg-[#BCBEC0] text-black shadow-md" : "bg-black border border-[#BCBEC0]/30 text-[#BCBEC0] hover:bg-black/80"}`}
      >
        All Models
      </button>
      {models.map((m) => (
        <button
          key={m}
          onClick={() => onSelectModel(m)}
          className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${selectedModel === m ? "bg-[#BCBEC0] text-black shadow-md" : "bg-black border border-[#BCBEC0]/30 text-[#BCBEC0] hover:bg-black/80"}`}
        >
          {m}
        </button>
      ))}
    </motion.div>
  );
}

/* ─── FILTER BAR ─── */
function FilterBar({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: (f: any) => void;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const bodyTypes = [
    "Sedan",
    "SUV",
    "Coupe",
    "Convertible",
    "Pickup",
    "Hatchback",
  ];
  const fuels = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const transmissions = ["Automatic", "Manual", "CVT", "PDK", "DSG"];
  return (
    <div className="border-t border-b border-[#BCBEC0]/20 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {bodyTypes.slice(0, 4).map((b) => (
            <button
              key={b}
              onClick={() =>
                setFilters({
                  ...filters,
                  bodyType: filters.bodyType === b ? "" : b,
                })
              }
              className={`px-3 py-1.5 rounded-full text-xs tracking-wide transition-all duration-300 ${filters.bodyType === b ? "bg-[#BCBEC0] text-black shadow-sm" : "bg-black border border-[#BCBEC0]/30 text-[#BCBEC0] hover:bg-black/80"}`}
            >
              {b}
            </button>
          ))}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3 py-1.5 rounded-full text-xs tracking-wide bg-black border border-[#BCBEC0]/30 text-[#BCBEC0] hover:bg-black/80 underline"
          >
            {showAdvanced ? "Less Filters" : "All Filters"}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#BCBEC0]/40">
            {filters.minPrice ? `KSh ${filters.minPrice}+` : "Any price"}
          </span>
          {Object.values(filters).some((v) => v) && (
            <button
              onClick={() => setFilters({})}
              className="text-xs text-[#BCBEC0] underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
      {showAdvanced && (
        <motion.div
          initial={{height: 0, opacity: 0}}
          animate={{height: "auto", opacity: 1}}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
        >
          <div className="flex gap-2 items-center col-span-2 md:col-span-1">
            <input
              type="number"
              placeholder="Min price"
              value={filters.minPrice || ""}
              onChange={(e) =>
                setFilters({...filters, minPrice: e.target.value})
              }
              className="w-full bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0] placeholder-[#BCBEC0]/40"
            />
            <span className="text-[#BCBEC0]/40">–</span>
            <input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                setFilters({...filters, maxPrice: e.target.value})
              }
              className="w-full bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0] placeholder-[#BCBEC0]/40"
            />
          </div>
          <select
            value={filters.fuel || ""}
            onChange={(e) => setFilters({...filters, fuel: e.target.value})}
            className="bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0]"
          >
            <option value="">Fuel Type</option>
            {fuels.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select
            value={filters.transmission || ""}
            onChange={(e) =>
              setFilters({...filters, transmission: e.target.value})
            }
            className="bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0]"
          >
            <option value="">Transmission</option>
            {transmissions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min year"
            value={filters.minYear || ""}
            onChange={(e) => setFilters({...filters, minYear: e.target.value})}
            className="bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0]"
          />
          <select
            value={filters.availability || ""}
            onChange={(e) =>
              setFilters({...filters, availability: e.target.value})
            }
            className="bg-black border border-[#BCBEC0]/30 rounded-lg px-3 py-2 text-xs text-[#BCBEC0]"
          >
            <option value="">Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
          </select>
        </motion.div>
      )}
    </div>
  );
}

/* ─── VEHICLE CARD ─── */
function VehicleCard({
  vehicle,
  onSave,
  saved,
  index = 0,
}: {
  vehicle: (typeof allVehicles)[0];
  onSave: () => void;
  saved: boolean;
  index?: number;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, {once: true, amount: 0.1});
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 28}}
      animate={
        inView
          ? {opacity: 1, y: 0}
          : prefersReduced
            ? {opacity: 1}
            : {opacity: 0, y: 28}
      }
      exit={{opacity: 0, scale: 0.97}}
      transition={{
        duration: 0.55,
        delay: prefersReduced ? 0 : (index % 3) * 0.08,
        ease: EASE_OUT_EXPO,
      }}
      className="group relative bg-black rounded-2xl overflow-hidden flex flex-col"
      style={{boxShadow: "0 4px 24px rgba(0,0,0,0.5)"}}
      whileHover={
        prefersReduced ? {} : {y: -3, boxShadow: "0 16px 48px rgba(0,0,0,0.7)"}
      }
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <motion.img
          src={vehicle.image}
          alt={vehicle.model}
          className="w-full h-full object-cover"
          whileHover={prefersReduced ? {} : {scale: 1.06}}
          transition={{duration: 0.7, ease: EASE_OUT}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {vehicle.isNewArrival && (
            <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium">
              New Arrival
            </span>
          )}
          {vehicle.isPriceReduced && (
            <span className="bg-[#BCBEC0]/90 backdrop-blur-sm text-black text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium">
              Price Reduced
            </span>
          )}
          {vehicle.isLimitedAvailability && (
            <span className="bg-white/60 backdrop-blur-sm text-black text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium">
              Limited
            </span>
          )}
        </div>
        <button
          onClick={onSave}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-sm hover:bg-white/80 hover:text-black transition-all duration-300"
          aria-label={saved ? "Remove from saved" : "Save vehicle"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-display text-white leading-tight">
            {vehicle.brand}{" "}
            <span className="text-[#BCBEC0]/80">{vehicle.model}</span>
          </h3>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ml-2 font-mono ${vehicle.availability === "In Stock" ? "bg-white/15 text-white border border-white/20" : "bg-[#BCBEC0]/15 text-[#BCBEC0] border border-[#BCBEC0]/20"}`}
          >
            {vehicle.availability}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#BCBEC0]/55 mb-5 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#BCBEC0]/50" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#BCBEC0]/50" />
            {vehicle.mileage.toLocaleString()} km
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#BCBEC0]/50" />
            {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#BCBEC0]/50" />
            {vehicle.fuel}
          </span>
        </div>
        <div className="mt-auto pt-3 border-t border-[#BCBEC0]/20">
          <p className="text-2xl font-mono text-[#BCBEC0] mb-4 tabular-nums">
            KSh {vehicle.price.toLocaleString()}
          </p>
          <div className="flex flex-wrap gap-2">
            <SlidingWhiteButton href={`/inventory/${vehicle.id}`}>
              View Details
            </SlidingWhiteButton>
            <SlidingOutlineButton
              href={`https://wa.me/254700000000?text=I'm interested in the ${vehicle.brand} ${vehicle.model}`}
            >
              WhatsApp
            </SlidingOutlineButton>
            <SlidingOutlineButton href={`tel:+254700000000`}>
              Call
            </SlidingOutlineButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FEATURED COLLECTION ─── */
function FeaturedCollection({
  title,
  vehicles,
  savedVehicles,
  onSave,
}: {
  title: string;
  vehicles: typeof allVehicles;
  savedVehicles: number[];
  onSave: (id: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {once: true, amount: 0.15});
  const prefersReduced = usePrefersReducedMotion();
  return (
    <section
      ref={sectionRef}
      className="max-w-[1440px] mx-auto px-6 md:px-16 py-16"
    >
      <motion.div
        initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 16}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.6, ease: EASE_OUT_EXPO}}
        className="mb-8 flex items-end justify-between"
      >
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#BCBEC0] uppercase mb-2 font-mono">
            Collection
          </p>
          <h2 className="font-display text-3xl text-white">{title}</h2>
        </div>
        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-[#BCBEC0]/20 to-transparent" />
        <span className="text-xs text-[#BCBEC0]/40 font-mono shrink-0">
          {vehicles.length} vehicles
        </span>
      </motion.div>
      <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide">
        {vehicles.map((v, i) => (
          <motion.div
            key={v.id}
            className="snap-start shrink-0 w-[300px] md:w-[340px]"
            initial={prefersReduced ? {opacity: 1} : {opacity: 0, x: 20}}
            animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.5, delay: i * 0.08, ease: EASE_OUT_EXPO}}
          >
            <VehicleCard
              vehicle={v}
              saved={savedVehicles.includes(v.id)}
              onSave={() => onSave(v.id)}
              index={i}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── FINANCE CTA ─── */
function FinanceCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.25});
  const prefersReduced = usePrefersReducedMotion();
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const springBgY = useSpring(bgY, SPRING_SMOOTH);
  const stats = [
    {value: 500, suffix: "+", label: "Vehicles Financed"},
    {value: 15, suffix: "+", label: "Banking Partners"},
    {value: 48, suffix: "hr", label: "Avg. Approval Time"},
  ];
  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 px-6 md:px-16"
      style={{background: "#000000"}}
    >
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? {} : {y: springBgY}}
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, #BCBEC0 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[1440px] mx-auto">
        <motion.div
          initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 24}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            Financing
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.9] mb-5">
            Own Your Dream Vehicle
          </h2>
          <p className="text-sm text-[#BCBEC0]/55 max-w-md mx-auto mb-10 leading-relaxed">
            Tailored financing solutions for every budget. Get pre-approved in
            minutes, drive away within 48 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <SlidingWhiteButtonLg href="/finance">
              Calculate Financing
            </SlidingWhiteButtonLg>
            <SlidingOutlineButtonLg href="/finance/pre-approval">
              Get Pre-Approved
            </SlidingOutlineButtonLg>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#BCBEC0]/20 rounded-2xl overflow-hidden max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 16}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.1,
                ease: EASE_OUT_EXPO,
              }}
              className="bg-black/80 backdrop-blur-sm px-8 py-8 text-center"
            >
              <p className="text-3xl font-mono text-[#BCBEC0] mb-1 tabular-nums">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-[#BCBEC0]/50 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-center text-[11px] text-[#BCBEC0]/30 mt-8"
          initial={{opacity: 0}}
          animate={inView ? {opacity: 1} : {}}
          transition={{delay: 0.7}}
        >
          Financing available through KCB, Equity Bank, NCBA, Co-op Bank and
          more
        </motion.p>
      </div>
    </section>
  );
}

/* ─── TRUST SECTION ─── */
const SP_SLOW = {stiffness: 35, damping: 16, mass: 1};
const SP_SMOOTH_TS = {stiffness: 55, damping: 20, mass: 1};
const SP_PRECISE_TS = {stiffness: 90, damping: 24, mass: 1};
const TOTAL_SCREENS = 12;

function trustPointDefs() {
  return [
    {
      title: "150-Point Inspection",
      desc: "Every vehicle passes our rigorous multi-point inspection before listing.",
      icon: "inspection",
    },
    {
      title: "Verified Mileage",
      desc: "Odometer readings independently verified. No hidden surprises.",
      icon: "gauge",
    },
    {
      title: "Full History Reports",
      desc: "Complete ownership, accident, and service history for every vehicle.",
      icon: "document",
    },
    {
      title: "Warranty Options",
      desc: "Extended warranty packages available on all certified vehicles.",
      icon: "shield",
    },
    {
      title: "Flexible Financing",
      desc: "Partnerships with Kenya's leading banks for competitive rates.",
      icon: "finance",
    },
    {
      title: "Nationwide Delivery",
      desc: "Secure delivery to Nairobi, Mombasa, Kisumu and all major cities.",
      icon: "delivery",
    },
  ];
}
const TRUST_POINTS = trustPointDefs();
const NAV_LABELS = [
  "Inspection",
  "Mileage",
  "History",
  "Warranty",
  "Financing",
  "Delivery",
];
const CARD_W = TRUST_POINTS.map((_, i) => ({
  enter: 0.46 + i * 0.062,
  peak: 0.49 + i * 0.062,
  exit: i === 5 ? 0.85 : 0.53 + i * 0.062,
}));

function AutomotiveIcon({type, className}: {type: string; className?: string}) {
  const base = "stroke-[#BCBEC0]/30 fill-none stroke-[0.8]";
  switch (type) {
    case "inspection":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          {Array.from({length: 10}).map((_, i) => (
            <line
              key={`h${i}`}
              x1="10"
              y1={10 + i * 20}
              x2="190"
              y2={10 + i * 20}
              className={base}
            />
          ))}
          {Array.from({length: 10}).map((_, i) => (
            <line
              key={`v${i}`}
              x1={10 + i * 20}
              y1="10"
              x2={10 + i * 20}
              y2="190"
              className={base}
            />
          ))}
          <path
            d="M40 130 L50 110 L80 95 L120 95 L150 110 L160 130 L40 130Z"
            className="stroke-[#BCBEC0]/50 fill-none stroke-[1.2]"
          />
          <circle
            cx="65"
            cy="130"
            r="12"
            className="stroke-[#BCBEC0]/50 fill-none stroke-[1.2]"
          />
          <circle
            cx="135"
            cy="130"
            r="12"
            className="stroke-[#BCBEC0]/50 fill-none stroke-[1.2]"
          />
          <circle
            cx="100"
            cy="112"
            r="20"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[0.8]"
          />
          <line
            x1="100"
            y1="88"
            x2="100"
            y2="100"
            className="stroke-[#BCBEC0]/60 stroke-[0.8]"
          />
          <line
            x1="100"
            y1="124"
            x2="100"
            y2="136"
            className="stroke-[#BCBEC0]/60 stroke-[0.8]"
          />
          <line
            x1="76"
            y1="112"
            x2="88"
            y2="112"
            className="stroke-[#BCBEC0]/60 stroke-[0.8]"
          />
          <line
            x1="112"
            y1="112"
            x2="124"
            y2="112"
            className="stroke-[#BCBEC0]/60 stroke-[0.8]"
          />
          <line x1="30" y1="80" x2="40" y2="80" className={base} />
          <line x1="160" y1="80" x2="170" y2="80" className={base} />
          <line x1="100" y1="150" x2="100" y2="165" className={base} />
        </svg>
      );
    case "gauge":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          <path
            d="M 40 140 A 70 70 0 1 1 160 140"
            className="stroke-[#BCBEC0]/30 fill-none stroke-[1]"
          />
          {Array.from({length: 11}).map((_, i) => {
            const a = -210 + i * 24;
            const r = (Math.PI / 180) * a;
            const x1 = 100 + 60 * Math.cos(r);
            const y1 = 140 + 60 * Math.sin(r);
            const x2 = 100 + 52 * Math.cos(r);
            const y2 = 140 + 52 * Math.sin(r);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="stroke-[#BCBEC0]/40 stroke-[0.8]"
              />
            );
          })}
          <line
            x1="100"
            y1="140"
            x2="128"
            y2="72"
            className="stroke-[#BCBEC0]/70 stroke-[1.5]"
            strokeLinecap="round"
          />
          <circle
            cx="100"
            cy="140"
            r="6"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[1.2]"
          />
          <circle cx="100" cy="140" r="2" className="fill-[#BCBEC0]/50" />
          <text
            x="42"
            y="168"
            className="fill-[#BCBEC0]/30 text-[8px] font-mono"
          >
            0
          </text>
          <text
            x="152"
            y="168"
            className="fill-[#BCBEC0]/30 text-[8px] font-mono"
          >
            300
          </text>
        </svg>
      );
    case "document":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          <rect
            x="65"
            y="52"
            width="80"
            height="100"
            rx="3"
            className="stroke-[#BCBEC0]/15 fill-none stroke-[0.8]"
          />
          <rect
            x="60"
            y="48"
            width="80"
            height="100"
            rx="3"
            className="stroke-[#BCBEC0]/20 fill-none stroke-[0.8]"
          />
          <rect
            x="55"
            y="44"
            width="80"
            height="100"
            rx="3"
            className="stroke-[#BCBEC0]/40 fill-none stroke-[1]"
          />
          <line
            x1="67"
            y1="68"
            x2="123"
            y2="68"
            className="stroke-[#BCBEC0]/40 stroke-[0.8]"
          />
          <line
            x1="67"
            y1="80"
            x2="123"
            y2="80"
            className="stroke-[#BCBEC0]/30 stroke-[0.8]"
          />
          <line
            x1="67"
            y1="92"
            x2="110"
            y2="92"
            className="stroke-[#BCBEC0]/30 stroke-[0.8]"
          />
          <line
            x1="67"
            y1="104"
            x2="120"
            y2="104"
            className="stroke-[#BCBEC0]/30 stroke-[0.8]"
          />
          <line
            x1="67"
            y1="116"
            x2="105"
            y2="116"
            className="stroke-[#BCBEC0]/30 stroke-[0.8]"
          />
          <path
            d="M80 128 L88 136 L108 116"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[1.5]"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          <path
            d="M100 30 L160 55 L160 105 C160 145 130 170 100 180 C70 170 40 145 40 105 L40 55 Z"
            className="stroke-[#BCBEC0]/40 fill-none stroke-[1]"
          />
          <path
            d="M100 50 L145 68 L145 108 C145 136 124 155 100 162 C76 155 55 136 55 108 L55 68 Z"
            className="stroke-[#BCBEC0]/20 fill-none stroke-[0.8]"
          />
          <path
            d="M78 105 L92 119 L124 90"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[2]"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[0, 1].map((i) => (
            <path
              key={i}
              d={`M100 ${38 + i * 8} L${152 - i * 5} ${58 + i * 6} L${152 - i * 5} ${108 + i * 5} C${152 - i * 5} ${140 + i * 4} ${126 - i * 3} ${158 + i * 3} 100 ${165 + i * 3}`}
              className="stroke-[#BCBEC0]/10 fill-none stroke-[0.5]"
            />
          ))}
        </svg>
      );
    case "finance":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="30" y1={y} x2="175" y2={y} className={base} />
          ))}
          <rect
            x="40"
            y="100"
            width="18"
            height="60"
            className="stroke-[#BCBEC0]/30 fill-[#BCBEC0]/10 stroke-[0.8]"
          />
          <rect
            x="68"
            y="80"
            width="18"
            height="80"
            className="stroke-[#BCBEC0]/40 fill-[#BCBEC0]/15 stroke-[0.8]"
          />
          <rect
            x="96"
            y="60"
            width="18"
            height="100"
            className="stroke-[#BCBEC0]/50 fill-[#BCBEC0]/20 stroke-[0.8]"
          />
          <rect
            x="124"
            y="40"
            width="18"
            height="120"
            className="stroke-[#BCBEC0]/60 fill-[#BCBEC0]/25 stroke-[0.8]"
          />
          <rect
            x="152"
            y="55"
            width="18"
            height="105"
            className="stroke-[#BCBEC0]/45 fill-[#BCBEC0]/18 stroke-[0.8]"
          />
          <polyline
            points="49,100 77,80 105,60 133,40 161,55"
            className="stroke-[#BCBEC0]/60 fill-none stroke-[1.2]"
            strokeLinejoin="round"
          />
          <line
            x1="30"
            y1="160"
            x2="175"
            y2="160"
            className="stroke-[#BCBEC0]/40 stroke-[1]"
          />
          <line
            x1="30"
            y1="30"
            x2="30"
            y2="160"
            className="stroke-[#BCBEC0]/40 stroke-[1]"
          />
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden>
          <path
            d="M85 30 L110 28 L128 40 L140 55 L145 75 L150 95 L155 115 L148 135 L138 155 L120 165 L105 172 L90 168 L72 158 L58 140 L50 118 L48 95 L52 72 L62 52 L75 38 Z"
            className="stroke-[#BCBEC0]/30 fill-none stroke-[1]"
          />
          <line
            x1="100"
            y1="55"
            x2="100"
            y2="155"
            className="stroke-[#BCBEC0]/25 stroke-[0.8]"
            strokeDasharray="4 4"
          />
          <line
            x1="62"
            y1="100"
            x2="148"
            y2="105"
            className="stroke-[#BCBEC0]/25 stroke-[0.8]"
            strokeDasharray="4 4"
          />
          <line
            x1="70"
            y1="65"
            x2="140"
            y2="148"
            className="stroke-[#BCBEC0]/15 stroke-[0.6]"
            strokeDasharray="3 6"
          />
          {[
            [100, 105],
            [118, 148],
            [72, 88],
            [95, 60],
            [130, 90],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={i === 0 ? 5 : 3}
                className="stroke-[#BCBEC0]/60 fill-none stroke-[1]"
              />
              <circle cx={cx} cy={cy} r={1.5} className="fill-[#BCBEC0]/50" />
            </g>
          ))}
          <text
            x="106"
            y="108"
            className="fill-[#BCBEC0]/40 font-mono"
            fontSize="7"
          >
            Nairobi
          </text>
        </svg>
      );
    default:
      return null;
  }
}

function BackgroundDepthLayer({progress}: {progress: MotionValue<number>}) {
  const y1 = useSpring(useTransform(progress, [0, 1], ["0%", "-12%"]), SP_SLOW);
  const y2 = useSpring(useTransform(progress, [0, 1], ["0%", "-6%"]), SP_SLOW);
  const op = useTransform(progress, [0, 0.06, 0.9, 1.0], [0, 1, 1, 0]);
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{opacity: op}}
      aria-hidden
    >
      <motion.div className="absolute inset-0" style={{y: y1}}>
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="trust-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#BCBEC0"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trust-grid)" />
        </svg>
      </motion.div>
      <motion.div className="absolute inset-0" style={{y: y2}}>
        <div className="absolute top-[15%] left-[5%] font-display text-[22vw] text-[#BCBEC0]/[0.025] leading-none select-none">
          TRUST
        </div>
        <div className="absolute bottom-[10%] right-[3%] font-display text-[18vw] text-[#BCBEC0]/[0.02] leading-none select-none">
          EARNED
        </div>
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(255,255,255,0.7) 100%)",
        }}
      />
    </motion.div>
  );
}

function ForegroundAccentLayer({progress}: {progress: MotionValue<number>}) {
  const y = useSpring(useTransform(progress, [0, 1], ["0%", "8%"]), SP_SLOW);
  const op = useTransform(progress, [0, 0.08, 0.88, 1.0], [0, 1, 1, 0]);
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{opacity: op}}
      aria-hidden
    >
      <motion.div className="absolute inset-0" style={{y}}>
        <div className="absolute top-[18%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/15 to-transparent" />
        <div className="absolute bottom-[18%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/15 to-transparent" />
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#BCBEC0]/20" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#BCBEC0]/20" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#BCBEC0]/20" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#BCBEC0]/20" />
      </motion.div>
    </motion.div>
  );
}

function VerticalNavRail({
  progress,
  activeCard,
}: {
  progress: MotionValue<number>;
  activeCard: number;
}) {
  const op = useTransform(progress, [0.42, 0.48, 0.8, 0.85], [0, 1, 1, 0]);
  return (
    <motion.div
      className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 z-30"
      style={{opacity: op}}
      aria-hidden
    >
      <div className="absolute right-[3px] top-0 bottom-0 w-px bg-[#BCBEC0]/40" />
      <motion.div
        className="absolute right-[3px] top-0 w-px bg-[#BCBEC0] origin-top"
        style={{scaleY: useTransform(progress, [0.46, CARD_W[5].peak], [0, 1])}}
      />
      {NAV_LABELS.map((label, i) => {
        const isActive = activeCard === i;
        const isPast = activeCard > i;
        return (
          <div key={label} className="relative flex items-center gap-2">
            <span
              className={`text-[9px] font-mono tracking-[0.15em] uppercase transition-all duration-500 ${isActive ? "text-black opacity-100" : isPast ? "text-[#BCBEC0]/60 opacity-70" : "text-[#BCBEC0]/30 opacity-50"}`}
            >
              {String(i + 1).padStart(2, "0")} {label}
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? "bg-[#BCBEC0] scale-150" : isPast ? "bg-[#BCBEC0]/50" : "bg-[#BCBEC0]/30"}`}
            />
          </div>
        );
      })}
    </motion.div>
  );
}

function TrustCardPanel({
  point,
  index,
  total,
  progress,
}: {
  point: (typeof TRUST_POINTS)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const w = CARD_W[index];
  const isVisible = useTransform(progress, (v) =>
    v >= w.enter && v < w.exit ? 1 : 0,
  );
  return (
    <motion.div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-6 md:px-20 pointer-events-none"
      style={{opacity: isVisible}}
    >
      <div className="w-full max-w-3xl">
        <div
          className="relative bg-white/75 backdrop-blur-md rounded-3xl overflow-hidden"
          style={{
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
            border: "1px solid rgba(188,190,192,0.7)",
          }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/50 to-transparent" />
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-64 flex-shrink-0 flex items-center justify-center p-10 md:p-12 border-b md:border-b-0 md:border-r border-[#BCBEC0]/30">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(188,190,192,0.06) 0%, transparent 70%)",
                }}
              />
              <AutomotiveIcon
                type={point.icon}
                className="w-40 h-40 relative z-10"
              />
            </div>
            <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#BCBEC0] uppercase">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-[#BCBEC0]/30">
                  <div
                    className="h-full bg-[#BCBEC0]"
                    style={{width: `${((index + 1) / total) * 100}%`}}
                  />
                </div>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-black leading-tight mb-5">
                {point.title}
              </h3>
              <p className="text-base text-[#BCBEC0]/65 leading-relaxed max-w-sm">
                {point.desc}
              </p>
              <div className="flex gap-2 mt-10">
                {Array.from({length: total}).map((_, j) => (
                  <div
                    key={j}
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-700 ${j <= index ? "bg-[#BCBEC0]" : "bg-[#BCBEC0]/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/20 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

function FinalMosaicTS({progress}: {progress: MotionValue<number>}) {
  const rawOp = useTransform(progress, [0.82, 0.9, 0.96, 1.0], [0, 1, 1, 0]);
  const rawScale = useTransform(
    progress,
    [0.82, 0.9, 0.96, 1.0],
    [0.96, 1, 1, 0.97],
  );
  const opacity = useSpring(rawOp, SP_SMOOTH_TS);
  const scale = useSpring(rawScale, SP_PRECISE_TS);
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 overflow-y-auto pointer-events-none"
      style={{opacity, scale}}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            Why Al Husnain
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-black leading-[0.9] mb-4">
            Trusted By Thousands
            <br />
            <span className="text-[#BCBEC0]">Across Kenya</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-[#BCBEC0]/40" />
            <p className="text-sm text-[#BCBEC0]/60">
              Over a decade of serving Kenya's most discerning vehicle buyers.
            </p>
            <div className="w-16 h-px bg-[#BCBEC0]/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#BCBEC0]/30 rounded-2xl overflow-hidden mb-8">
          {[
            {value: 12, suffix: "+", label: "Years in Business"},
            {value: 3200, suffix: "+", label: "Vehicles Sold"},
            {value: 98, suffix: "%", label: "Customer Satisfaction"},
            {value: 6, suffix: "", label: "Financing Partners"},
          ].map((m) => (
            <div key={m.label} className="bg-white/90 px-6 py-8 text-center">
              <p className="text-3xl md:text-4xl font-mono text-black mb-1 tabular-nums leading-none">
                {m.value.toLocaleString()}
                {m.suffix}
              </p>
              <p className="text-[11px] text-[#BCBEC0]/55 tracking-wide uppercase font-mono mt-1">
                {m.label}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRUST_POINTS.map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm rounded-xl px-5 py-5 border border-[#BCBEC0]/40 flex items-start gap-4"
              style={{boxShadow: "0 2px 12px rgba(0,0,0,0.06)"}}
            >
              <AutomotiveIcon
                type={item.icon}
                className="w-12 h-12 flex-shrink-0 opacity-80"
              />
              <div>
                <h4 className="text-sm font-display text-black mb-1 leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-[#BCBEC0]/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({progress}: {progress: MotionValue<number>}) {
  const rawOp = useTransform(progress, [0, 0.05, 0.15, 0.22], [0, 1, 1, 0]);
  const rawScale = useTransform(progress, [0.08, 0.18], [1, 0.6]);
  const rawY = useTransform(progress, [0.08, 0.22], ["0%", "-28%"]);
  const opacity = useSpring(rawOp, SP_SMOOTH_TS);
  const scale = useSpring(rawScale, SP_PRECISE_TS);
  const y = useSpring(rawY, SP_PRECISE_TS);
  return (
    <motion.div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none px-6"
      style={{opacity, scale, y, transformOrigin: "top center"}}
    >
      <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
        Why Al Husnain
      </p>
      <h2
        className="font-display text-black leading-[0.9] mb-5"
        style={{fontSize: "clamp(3.5rem, 10vw, 8rem)"}}
      >
        Trust is earned
      </h2>
      <p className="text-base text-[#BCBEC0]/60 max-w-md mx-auto leading-relaxed">
        Over a decade of serving Kenya's most discerning vehicle buyers.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="w-16 h-px bg-[#BCBEC0]/40" />
        <div className="w-2 h-2 rounded-full border border-[#BCBEC0]/40" />
        <div className="w-16 h-px bg-[#BCBEC0]/40" />
      </div>
    </motion.div>
  );
}

function ScrollHintBar({progress}: {progress: MotionValue<number>}) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const hintOp = useTransform(progress, [0, 0.05, 0.14], [1, 1, 0]);
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#BCBEC0]/20">
        <motion.div
          className="h-full bg-gradient-to-r from-[#BCBEC0] to-white origin-left"
          style={{scaleX}}
        />
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{opacity: hintOp}}
        aria-hidden
      >
        <p className="text-[9px] tracking-[0.35em] text-[#BCBEC0]/40 uppercase font-mono">
          Scroll to explore
        </p>
        <motion.div
          className="w-px h-7 bg-gradient-to-b from-[#BCBEC0]/50 to-transparent"
          animate={{scaleY: [1, 0.3, 1]}}
          transition={{repeat: Infinity, duration: 1.6, ease: "easeInOut"}}
        />
      </motion.div>
    </>
  );
}

export function TrustSection() {
  const prefersReduced = usePrefersReducedMotion();
  if (prefersReduced) return <StaticTrustSection />;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 28,
    damping: 24,
    mass: 1.4,
    restDelta: 0.001,
  });
  const [activeCard, setActiveCard] = useState(-1);
  useEffect(() => {
    return progress.on("change", (v) => {
      let active = -1;
      CARD_W.forEach((w, i) => {
        if (v >= w.peak && v < w.exit + 0.06) active = i;
      });
      setActiveCard(active);
    });
  }, [progress]);
  const bgColor = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 0.92, 1.0],
    ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  );
  return (
    <div
      ref={wrapperRef}
      style={{height: `${TOTAL_SCREENS * 100}vh`}}
      className="relative"
    >
      <motion.div
        className="sticky top-0 h-screen overflow-hidden"
        style={{backgroundColor: bgColor, scale: 1, opacity: 1}}
      >
        <BackgroundDepthLayer progress={progress} />
        <ForegroundAccentLayer progress={progress} />
        <SectionHeader progress={progress} />
        {TRUST_POINTS.map((tp, i) => (
          <TrustCardPanel
            key={tp.title}
            point={tp}
            index={i}
            total={TRUST_POINTS.length}
            progress={progress}
          />
        ))}
        <FinalMosaicTS progress={progress} />
        <VerticalNavRail progress={progress} activeCard={activeCard} />
        <ScrollHintBar progress={progress} />
      </motion.div>
    </div>
  );
}

function StaticTrustSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.15});
  return (
    <section ref={ref} className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            Why Al Husnain
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-black leading-[0.9] mb-4">
            Trust is earned
          </h2>
          <p className="text-sm text-[#BCBEC0]/70 max-w-md mx-auto">
            Over a decade of serving Kenya's most discerning vehicle buyers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_POINTS.map((item, i) => (
            <div
              key={i}
              className="bg-white/60 rounded-xl p-6 border border-[#BCBEC0]/40 flex items-start gap-4"
            >
              <AutomotiveIcon
                type={item.icon}
                className="w-12 h-12 flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-display text-black mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#BCBEC0]/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.15});
  const prefersReduced = usePrefersReducedMotion();
  const testimonials = [
    {
      quote:
        "The vehicle exceeded every expectation. The handover was seamless — from first inquiry to driving away took less than two days.",
      author: "Khalid A.",
      role: "Business Owner",
      location: "Nairobi",
      vehicle: "Toyota Land Cruiser Prado",
    },
    {
      quote:
        "Al Husnain made financing straightforward. I was driving my dream car within the week. The team is transparent — no pressure, no hidden costs.",
      author: "Layla M.",
      role: "Entrepreneur",
      location: "Mombasa",
      vehicle: "BMW X5",
    },
    {
      quote:
        "Transparent pricing, thorough inspection reports. I have purchased three vehicles through Al Husnain and will continue to be a client.",
      author: "Omar S.",
      role: "Collector",
      location: "Karen, Nairobi",
      vehicle: "Range Rover Sport",
    },
  ];
  return (
    <section ref={ref} className="bg-black py-24 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.6, ease: EASE_OUT_EXPO}}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            Client Stories
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.9]">
            What our clients say
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 20}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{
                delay: 0.15 + i * 0.12,
                duration: 0.6,
                ease: EASE_OUT_EXPO,
              }}
              className="group relative bg-black rounded-2xl p-8 border border-[#BCBEC0]/20 flex flex-col overflow-hidden"
              style={{boxShadow: "0 4px 32px rgba(0,0,0,0.4)"}}
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      borderColor: "rgba(188,190,192,0.3)",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                    }
              }
            >
              <div
                className={`absolute inset-0 z-0 rounded-2xl bg-white transform translate-y-full group-hover:translate-y-0 ${prefersReduced ? "" : "transition-transform duration-500 ease-out"}`}
              />
              <span
                className="absolute top-6 right-7 text-5xl font-serif leading-none select-none z-10 text-[#BCBEC0]/15 group-hover:text-[#BCBEC0]/25 transition-colors duration-500"
                aria-hidden
              >
                "
              </span>
              <p className="relative z-10 text-sm text-[#BCBEC0]/75 leading-relaxed mb-6 flex-1 group-hover:text-black/80 transition-colors duration-500">
                {t.quote}
              </p>
              <div className="relative z-10 h-px bg-[#BCBEC0]/20 mb-5 group-hover:bg-black/10 transition-colors duration-500" />
              <footer className="relative z-10 flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium mb-0.5 text-white group-hover:text-black transition-colors duration-500">
                    {t.author}
                  </p>
                  <p className="text-xs text-[#BCBEC0]/45 group-hover:text-[#BCBEC0]/70 transition-colors duration-500">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-[#BCBEC0]/30 mt-0.5 font-mono group-hover:text-[#BCBEC0]/50 transition-colors duration-500">
                    {t.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono uppercase tracking-wide text-[#BCBEC0]/60 group-hover:text-black transition-colors duration-500">
                    Purchased
                  </p>
                  <p className="text-xs text-[#BCBEC0]/50 mt-0.5 group-hover:text-[#BCBEC0]/70 transition-colors duration-500">
                    {t.vehicle}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function InventoryPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({});
  const [savedVehicles, setSavedVehicles] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const prefersReduced = usePrefersReducedMotion();

  const brandSectionRef = useRef<HTMLElement>(null);
  const inventoryRef = useRef<HTMLDivElement>(null);
  const inventorySectionRef = useRef<HTMLElement>(null);
  const scrollToInventory = () =>
    inventoryRef.current?.scrollIntoView({behavior: "smooth", block: "start"});

  const filteredVehicles = useMemo(() => {
    let list = allVehicles;
    if (selectedBrand) list = list.filter((v) => v.brand === selectedBrand);
    if (selectedModel) list = list.filter((v) => v.model === selectedModel);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (v) =>
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q),
      );
    }
    if (filters.bodyType)
      list = list.filter((v) => v.bodyType === filters.bodyType);
    if (filters.fuel) list = list.filter((v) => v.fuel === filters.fuel);
    if (filters.transmission)
      list = list.filter((v) => v.transmission === filters.transmission);
    if (filters.availability)
      list = list.filter((v) => v.availability === filters.availability);
    if (filters.minPrice)
      list = list.filter((v) => v.price >= Number(filters.minPrice));
    if (filters.maxPrice)
      list = list.filter((v) => v.price <= Number(filters.maxPrice));
    if (filters.minYear)
      list = list.filter((v) => v.year >= Number(filters.minYear));
    return list;
  }, [selectedBrand, selectedModel, filters, searchQuery]);

  const shouldShowVehicles =
    selectedBrand !== null || searchQuery.trim().length > 0;
  const newArrivals = shouldShowVehicles
    ? filteredVehicles.filter((v) => v.isNewArrival)
    : [];
  const priceReduced = shouldShowVehicles
    ? filteredVehicles.filter((v) => v.isPriceReduced)
    : [];
  const limitedAvailability = shouldShowVehicles
    ? filteredVehicles.filter((v) => v.isLimitedAvailability)
    : [];

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSearchQuery("");
    scrollToInventory();
  };
  const handleSave = (id: number) => {
    setSavedVehicles((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-black transition-colors duration-700">
      <div className="h-[72px]" />
      <section
        ref={brandSectionRef}
        className="max-w-[1440px] mx-auto px-6 md:px-16 py-20"
      >
        <motion.div
          initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
          className="text-center mb-14"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-4 font-mono">
            The Collection
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white leading-[0.9] mb-4">
            Select a car brand
          </h1>
          <p className="text-sm text-[#BCBEC0]/50 max-w-lg mx-auto leading-relaxed">
            Choose a manufacturer to explore our curated inventory of premium
            vehicles, each fully inspected and ready for Kenya's roads.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {brands.map((brand, i) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              isSelected={selectedBrand === brand.name}
              onClick={() => handleBrandClick(brand.name)}
              index={i}
            />
          ))}
        </div>
      </section>
      <div className="max-w-[1440px] mx-auto px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/20 to-transparent" />
      </div>
      <section
        ref={inventorySectionRef}
        className="max-w-[1440px] mx-auto px-6 md:px-16 py-12"
      >
        <div ref={inventoryRef} />
        <motion.div
          initial={prefersReduced ? {opacity: 1} : {opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.3}}
          transition={{duration: 0.6, ease: EASE_OUT_EXPO}}
          className="mb-8"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-2 font-mono">
            Inventory
          </p>
          <h2 className="font-display text-3xl text-white">
            {shouldShowVehicles
              ? selectedBrand
                ? `${selectedBrand} Vehicles`
                : `Results for "${searchQuery}"`
              : "Find Your Vehicle"}
          </h2>
        </motion.div>
        <motion.div
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.1}}
          className="mb-8 relative max-w-2xl mx-auto"
        >
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BCBEC0]/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedBrand(null);
                setSelectedModel(null);
              }}
              className="w-full bg-black border border-[#BCBEC0]/30 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-[#BCBEC0]/40 focus:outline-none focus:border-[#BCBEC0]/50 transition-colors duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BCBEC0]/40 hover:text-[#BCBEC0] transition-colors"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-[10px] text-[#BCBEC0]/30 mt-2 text-center">
            Type a brand or model name to see matching vehicles
          </p>
        </motion.div>
        {shouldShowVehicles && (
          <>
            <AnimatePresence>
              {selectedBrand && (
                <motion.div
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 10}}
                  className="mb-6"
                >
                  <ModelSelector
                    brand={selectedBrand}
                    selectedModel={selectedModel}
                    onSelectModel={(model) => setSelectedModel(model)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <FilterBar filters={filters} setFilters={setFilters} />
            <div className="flex items-center justify-between mt-6 mb-6">
              <p className="text-sm text-[#BCBEC0]/50 font-mono">
                <span className="text-[#BCBEC0]">
                  {filteredVehicles.length}
                </span>{" "}
                vehicles found
              </p>
              {selectedBrand && (
                <button
                  onClick={() => {
                    setSelectedBrand(null);
                    setSelectedModel(null);
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#BCBEC0] hover:text-white transition-colors underline"
                >
                  ← Back to all brands
                </button>
              )}
            </div>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredVehicles.map((v, i) => (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    saved={savedVehicles.includes(v.id)}
                    onSave={() => handleSave(v.id)}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
            {filteredVehicles.length === 0 && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="text-center py-20"
              >
                <p className="text-[#BCBEC0]/40 text-sm mb-4">
                  No vehicles match your current filters.
                </p>
                <button
                  onClick={() => {
                    setFilters({});
                    setSelectedBrand(null);
                    setSelectedModel(null);
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#BCBEC0] underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </>
        )}
        {!shouldShowVehicles && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="text-center py-24"
          >
            <div className="max-w-md mx-auto">
              <span className="text-4xl mb-6 block opacity-20">🚗</span>
              <p className="text-[#BCBEC0]/40 text-lg mb-2">
                Your next vehicle awaits
              </p>
              <p className="text-[#BCBEC0]/30 text-sm">
                Use the search bar above or select a brand from the showroom to
                explore our inventory.
              </p>
            </div>
          </motion.div>
        )}
      </section>
      <div className="max-w-[1440px] mx-auto px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/20 to-transparent" />
      </div>
      {shouldShowVehicles && (
        <>
          {newArrivals.length > 0 && (
            <FeaturedCollection
              title="New Arrivals"
              vehicles={newArrivals}
              savedVehicles={savedVehicles}
              onSave={handleSave}
            />
          )}
          {priceReduced.length > 0 && (
            <FeaturedCollection
              title="Price Reduced"
              vehicles={priceReduced}
              savedVehicles={savedVehicles}
              onSave={handleSave}
            />
          )}
          {limitedAvailability.length > 0 && (
            <FeaturedCollection
              title="Limited Availability"
              vehicles={limitedAvailability}
              savedVehicles={savedVehicles}
              onSave={handleSave}
            />
          )}
        </>
      )}
      <TrustSection />
      <TestimonialsSection />
      <CTABand />
    </div>
  );
}
