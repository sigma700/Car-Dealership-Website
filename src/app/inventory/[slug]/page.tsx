"use client";

import {useEffect, useRef, useState, useMemo, useCallback} from "react";
import {useParams, useRouter, notFound} from "next/navigation";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import {allVehicles, getRecommendations} from "@/lib/vehicles";
import type {Vehicle} from "@/lib/vehicles";
import Button from "@/components/Button"; // <-- new import

/* ─── Easing ─────────────────────────────────── */
const EXPO = [0.19, 1, 0.22, 1] as const;
const OUT = [0.16, 1, 0.3, 1] as const;

/* ─── Dark mode hook (fixed) ─────────────────── */
function useDarkMode() {
  const [dark, setDark] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("theme");
    let initialDark = false;
    if (stored) {
      initialDark = stored === "dark";
    } else {
      initialDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, isMounted]);

  const toggle = () => setDark((d) => !d);

  return {dark, toggle};
}

/* ─── Breadcrumb ─────────────────────────────── */
function Breadcrumb({vehicle}: {vehicle: Vehicle}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-[11px] tracking-[0.1em] text-[#777] dark:text-[#BCBEC0]/50">
        {[
          {label: "Home", href: "/"},
          {label: "Inventory", href: "/inventory"},
          {label: vehicle.brand, href: `/inventory?make=${vehicle.brand}`},
          {label: vehicle.model, href: null},
        ].map((crumb, i, arr) => (
          <li key={crumb.label} className="flex items-center gap-2">
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-black dark:text-white font-medium">
                {crumb.label}
              </span>
            )}
            {i < arr.length - 1 && (
              <span aria-hidden className="text-[#BCBEC0]/30">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ─── Dark Mode Toggle ───────────────────────── */
function DarkModeToggle({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      onClick={onToggle}
      className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#777] dark:text-[#BCBEC0]/50 hover:text-black dark:hover:text-white transition-colors duration-200"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={{scale: 0.96}}
    >
      <span
        className="w-8 h-4 rounded-full border border-[#BCBEC0]/30 dark:border-[#BCBEC0]/20 relative flex items-center px-0.5 transition-colors duration-300"
        style={{backgroundColor: dark ? "#1a1a1a" : "transparent"}}
      >
        <motion.span
          className="w-3 h-3 rounded-full bg-[#BCBEC0] block"
          animate={{x: dark ? 16 : 0}}
          transition={{type: "spring", stiffness: 400, damping: 28}}
        />
      </span>
      {dark ? "Light" : "Dark"}
    </motion.button>
  );
}

/* ─── Vehicle Gallery ────────────────────────── */
function VehicleGallery({vehicle}: {vehicle: Vehicle}) {
  const images = useMemo(() => {
    const imgs = [vehicle.image, ...(vehicle.images ?? [])].filter(
      Boolean,
    ) as string[];
    return imgs.length ? imgs : ["/placeholder-vehicle.jpg"];
  }, [vehicle]);

  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const prev = useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <div className="w-full">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-[#f5f5f5] dark:bg-[#141414]"
        style={{aspectRatio: "16/10"}}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const delta = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
          setTouchStart(null);
        }}
        role="img"
        aria-label={`${vehicle.brand} ${vehicle.model} — image ${active + 1} of ${images.length}`}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading={active === 0 ? "eager" : "lazy"}
            decoding="async"
            initial={reduced ? {opacity: 0} : {opacity: 0}}
            animate={{opacity: 1}}
            exit={reduced ? {opacity: 0} : {opacity: 0}}
            transition={{duration: 0.4, ease: OUT}}
          />
        </AnimatePresence>

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
        />

        <span className="absolute top-4 left-4 text-[9px] tracking-[0.18em] uppercase text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {vehicle.availability}
        </span>

        {images.length > 1 && (
          <span className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] text-white/60 tabular-nums">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/45 hover:text-white transition-all duration-200"
              aria-label="Previous image"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/45 hover:text-white transition-all duration-200"
              aria-label="Next image"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BCBEC0] rounded-lg overflow-hidden"
              aria-label={`View image ${i + 1}`}
              aria-pressed={active === i}
            >
              <div
                className="relative overflow-hidden rounded-lg transition-all duration-300"
                style={{
                  width: 72,
                  height: 48,
                  outline:
                    active === i
                      ? "1.5px solid #BCBEC0"
                      : "1.5px solid transparent",
                  opacity: active === i ? 1 : 0.5,
                }}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Spec Row ───────────────────────────────── */
function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | undefined;
}) {
  if (value === undefined || value === null || value === "") return null;
  const display =
    typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);

  return (
    <div className="flex items-baseline justify-between py-3.5 border-b border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8 last:border-0">
      <span className="text-[11px] tracking-[0.12em] uppercase text-[#777] dark:text-[#BCBEC0]/45 font-medium">
        {label}
      </span>
      <span className="text-sm text-black dark:text-white font-medium text-right max-w-[55%]">
        {display}
      </span>
    </div>
  );
}

/* ─── Specifications Grid ────────────────────── */
function Specifications({vehicle}: {vehicle: Vehicle}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.1});

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 16}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 0.7, ease: EXPO, delay: 0.1}}
    >
      <h2 className="text-[11px] tracking-[0.28em] uppercase text-[#777] dark:text-[#BCBEC0]/45 font-medium mb-1">
        Specifications
      </h2>
      <h3 className="text-xl font-semibold text-black dark:text-white tracking-tight mb-6">
        Full vehicle details
      </h3>

      <div className="rounded-xl border border-[#BCBEC0]/15 dark:border-[#BCBEC0]/10 overflow-hidden">
        <div className="px-5 divide-y-0 dark:bg-[#111]">
          <SpecRow label="Year" value={vehicle.year} />
          <SpecRow
            label="Mileage"
            value={
              vehicle.mileage === 0
                ? "0 km"
                : `${vehicle.mileage.toLocaleString()} km`
            }
          />
          <SpecRow label="Transmission" value={vehicle.transmission} />
          <SpecRow label="Fuel Type" value={vehicle.fuel} />
          <SpecRow label="Drive Type" value={vehicle.driveType} />
          <SpecRow label="Engine" value={vehicle.engine} />
          <SpecRow label="Engine Capacity" value={`${vehicle.engineSize}cc`} />
          <SpecRow label="Body Type" value={vehicle.bodyType} />
          <SpecRow label="Exterior Colour" value={vehicle.exteriorColor} />
          <SpecRow label="Interior Colour" value={vehicle.interiorColor} />
          <SpecRow label="Chassis" value={vehicle.chassis} />
          <SpecRow label="Sunroof" value={vehicle.hasSunroof} />
          {vehicle.seatingCapacity && (
            <SpecRow
              label="Seating Capacity"
              value={`${vehicle.seatingCapacity} seats`}
            />
          )}
          <SpecRow label="Availability" value={vehicle.availability} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Features ───────────────────────────────── */
function Features({features}: {features: string[]}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.1});

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 16}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 0.7, ease: EXPO, delay: 0.12}}
    >
      <h2 className="text-[11px] tracking-[0.28em] uppercase text-[#777] dark:text-[#BCBEC0]/45 font-medium mb-1">
        Equipment
      </h2>
      <h3 className="text-xl font-semibold text-black dark:text-white tracking-tight mb-6">
        Standard features
      </h3>
      <div className="flex flex-wrap gap-2">
        {features.map((f) => (
          <span
            key={f}
            className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full border border-[#BCBEC0]/20 dark:border-[#BCBEC0]/15 text-[#1a1a1a] dark:text-[#BCBEC0]/80 bg-[#f8f8f8] dark:bg-[#1a1a1a]"
          >
            <span
              aria-hidden
              className="w-1 h-1 rounded-full bg-[#BCBEC0]/60 flex-shrink-0"
            />
            {f}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Purchase Card ───────────────────────────── */
function PurchaseCard({vehicle}: {vehicle: Vehicle}) {
  const router = useRouter(); // <-- needed for navigation
  const whatsappHref = `https://wa.me/254700000000?text=${encodeURIComponent(
    `Hi, I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model} listed at KSh ${vehicle.price.toLocaleString()}.`,
  )}`;

  const trust = [
    "Inspection Passed",
    "Verified Ownership",
    "Accident Free",
    "Import Certified",
    "Documentation Verified",
  ];

  return (
    <div className="rounded-xl border border-[#BCBEC0]/18 dark:border-[#BCBEC0]/10 overflow-hidden bg-white dark:bg-[#111] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="px-6 pt-6 pb-5 border-b border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8">
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#777] dark:text-[#BCBEC0]/40 mb-1">
          Asking Price
        </p>
        <p className="text-[28px] font-semibold text-black dark:text-white tracking-[-0.025em] leading-none mb-3">
          KSh {vehicle.price.toLocaleString()}
        </p>
        <div className="flex flex-col gap-1">
          {[
            "Finance Available",
            "Trade-ins Accepted",
            "Nationwide Delivery",
          ].map((item) => (
            <span
              key={item}
              className="text-[11px] text-[#1a1a1a] dark:text-[#BCBEC0]/55 flex items-center gap-1.5"
            >
              <span
                aria-hidden
                className="w-1 h-1 rounded-full bg-[#BCBEC0]/50 flex-shrink-0"
              />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 py-5 flex flex-col gap-3">
        {/* ─── Schedule Test Drive ─── */}
        <Button
          variant="primary"
          fullWidth
          size="md"
          onClick={() => router.push("/contact")}
        >
          Schedule Test Drive
        </Button>

        {/* ─── WhatsApp Enquiry (link) ─── */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-5 flex items-center justify-center gap-2 border border-[#BCBEC0]/25 dark:border-[#BCBEC0]/15 text-black dark:text-white text-[12px] font-medium tracking-[0.08em] uppercase rounded-lg hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-200"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.76.46 3.4 1.261 4.828L2 22l5.335-1.396A9.952 9.952 0 0012.004 22c5.514 0 9.997-4.483 9.997-9.997 0-5.515-4.483-9.998-9.997-10zm0 18.305a8.303 8.303 0 01-4.23-1.156l-.302-.18-3.168.831.845-3.088-.199-.317A8.288 8.288 0 013.706 12c0-4.576 3.724-8.3 8.3-8.3 4.577 0 8.3 3.724 8.3 8.3-.001 4.576-3.724 8.308-8.302 8.308z" />
          </svg>
          WhatsApp Enquiry
        </a>

        {/* ─── Call Dealer (phone link) ─── */}
        <a
          href="tel:+254700000000"
          className="w-full py-2.5 px-5 text-center text-[11px] tracking-[0.08em] uppercase text-[#777] dark:text-[#BCBEC0]/45 hover:text-black dark:hover:text-white transition-colors duration-200"
        >
          Call Dealer → +254 700 000 000
        </a>
      </div>

      <div className="px-6 py-5 border-t border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#888] dark:text-[#BCBEC0]/35 mb-3">
          Verified Details
        </p>
        <div className="flex flex-col gap-2">
          {trust.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[11px] font-medium text-[#1a1a1a] dark:text-[#BCBEC0]/70"
            >
              <span aria-hidden className="text-[10px] text-[#BCBEC0]/50">
                ✓
              </span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 py-5 border-t border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#BCBEC0]/15 dark:bg-[#BCBEC0]/8 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-semibold text-[#1a1a1a] dark:text-[#BCBEC0]/60">
              AA
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-black dark:text-white truncate">
              Al Ahsan Motors
            </p>
            <p className="text-[10px] text-[#777] dark:text-[#BCBEC0]/40 flex items-center gap-2">
              <span>★★★★★</span>
              <span>·</span>
              <span>Responds within 1 hour</span>
            </p>
            <p className="text-[10px] text-[#888] dark:text-[#BCBEC0]/35 mt-0.5">
              Mon–Sat · 8am–6pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Recommendation Card ────────────────────── */
function RecommendationCard({vehicle}: {vehicle: Vehicle}) {
  const reduced = usePrefersReducedMotion();
  const whatsappHref = `https://wa.me/254700000000?text=${encodeURIComponent(
    `Hi, I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model}.`,
  )}`;

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden border border-[#BCBEC0]/15 dark:border-[#BCBEC0]/10 bg-white dark:bg-[#111]"
      whileHover={reduced ? {} : {y: -2}}
      transition={{duration: 0.3, ease: OUT}}
      style={{boxShadow: "0 2px 12px rgba(0,0,0,0.05)"}}
    >
      <div className="relative overflow-hidden" style={{aspectRatio: "16/10"}}>
        {vehicle.image ? (
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#f4f4f4] dark:bg-[#1a1a1a] flex items-center justify-center">
            <span className="text-[#BCBEC0]/30 text-xs tracking-wider uppercase">
              No image
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 text-[9px] tracking-[0.16em] uppercase text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {vehicle.availability}
        </span>
      </div>

      <div className="p-4">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#777] dark:text-[#BCBEC0]/40 mb-0.5">
          {vehicle.brand}
        </p>
        <h4 className="text-[14px] font-semibold text-black dark:text-white tracking-tight leading-snug mb-1">
          {vehicle.model}
        </h4>
        <p className="text-[11px] text-[#666] dark:text-[#BCBEC0]/40 mb-3">
          {vehicle.year} ·{" "}
          {vehicle.mileage === 0
            ? "0 km"
            : `${vehicle.mileage.toLocaleString()} km`}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold text-black dark:text-white tracking-[-0.015em]">
            KSh {vehicle.price.toLocaleString()}
          </p>
          <Link
            href={`/inventory/${vehicle.slug}`}
            className="text-[10px] tracking-[0.12em] uppercase text-[#777] dark:text-[#BCBEC0]/45 hover:text-black dark:hover:text-white transition-colors duration-200 border-b border-[#BCBEC0]/25 dark:border-[#BCBEC0]/15 pb-px hover:border-black dark:hover:border-white"
          >
            View →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Prev / Next Nav ────────────────────────── */
function VehicleNav({currentSlug}: {currentSlug: string}) {
  const slugs = allVehicles.map((v) => v.slug);
  const idx = slugs.indexOf(currentSlug);
  const prevSlug = idx > 0 ? slugs[idx - 1] : null;
  const nextSlug = idx < slugs.length - 1 ? slugs[idx + 1] : null;

  if (!prevSlug && !nextSlug) return null;

  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8">
      {prevSlug ? (
        <Link
          href={`/inventory/${prevSlug}`}
          className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#777] dark:text-[#BCBEC0]/45 hover:text-black dark:hover:text-white transition-colors duration-200"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Previous Vehicle
        </Link>
      ) : (
        <span />
      )}
      {nextSlug && (
        <Link
          href={`/inventory/${nextSlug}`}
          className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#777] dark:text-[#BCBEC0]/45 hover:text-black dark:hover:text-white transition-colors duration-200"
        >
          Next Vehicle
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      )}
    </div>
  );
}

/* ─── Mobile Sticky CTA ──────────────────────── */
function MobileStickyBar({vehicle}: {vehicle: Vehicle}) {
  const {scrollY} = useScroll();
  const router = useRouter(); // <-- needed for navigation
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setVisible(v > 300));
  }, [scrollY]);

  const whatsappHref = `https://wa.me/254700000000?text=${encodeURIComponent(
    `Hi, I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model}.`,
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{y: "100%"}}
          animate={{y: 0}}
          exit={{y: "100%"}}
          transition={{duration: 0.35, ease: EXPO}}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(188,190,192,0.15)",
          }}
        >
          <div className="flex items-center gap-3 px-5 py-3 pb-safe max-w-lg mx-auto">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[#777] tracking-wide">
                {vehicle.brand} {vehicle.model}
              </p>
              <p className="text-[15px] font-semibold text-black tracking-tight leading-none">
                KSh {vehicle.price.toLocaleString()}
              </p>
            </div>
            {/* ─── WhatsApp (link) ─── */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-4 py-2.5 border border-[#BCBEC0]/25 text-[11px] font-medium tracking-[0.08em] uppercase text-black rounded-lg hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-200"
            >
              WhatsApp
            </a>
            {/* ─── Book Drive (Button) ─── */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/contact")}
              className="flex-shrink-0" // added to prevent stretching
            >
              Book Drive
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Page ───────────────────────────────────── */
export default function VehicleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const {dark, toggle} = useDarkMode();
  const reduced = usePrefersReducedMotion();

  const slug = params.slug as string;
  const vehicle = useMemo(
    () => allVehicles.find((v) => v.slug === slug) ?? null,
    [slug],
  );

  const recommendations = useMemo(
    () => (vehicle ? getRecommendations(vehicle, 4) : []),
    [vehicle],
  );

  const mainRef = useRef<HTMLDivElement>(null);
  const mainInView = useInView(mainRef, {once: true, amount: 0.05});

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0e0e0e] px-6">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#777] mb-3">
          404
        </p>
        <h1 className="text-2xl font-semibold text-black dark:text-white mb-6">
          Vehicle not found
        </h1>
        <Link
          href="/inventory"
          className="text-[12px] tracking-[0.12em] uppercase text-[#777] border-b border-[#BCBEC0]/25 pb-px hover:text-black hover:border-black transition-colors duration-200"
        >
          Back to Inventory →
        </Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.brand} ${vehicle.model}`,
    description: vehicle.description ?? "",
    image: vehicle.image ?? "",
    brand: {"@type": "Brand", name: vehicle.brand},
    modelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    vehicleTransmission: vehicle.transmission,
    fuelType: vehicle.fuel,
    driveWheelConfiguration: vehicle.driveType,
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: vehicle.price,
      availability:
        vehicle.availability === "In Stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/LimitedAvailability",
      seller: {
        "@type": "AutoDealer",
        name: "Al Ahsan Motors",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      <div
        className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-colors duration-300"
        ref={mainRef}
      >
        <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#0e0e0e]/90 backdrop-blur-md border-b border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8">
          <div className="max-w-[1440px] mx-auto px-6 md:px-14 h-14 flex items-center justify-between">
            <Link
              href="/inventory"
              className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#777] dark:text-[#BCBEC0]/45 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Inventory
            </Link>

            <Link
              href="/"
              className="text-[13px] font-semibold tracking-[-0.01em] text-black dark:text-white"
            >
              Al Ahsan Motors
            </Link>

            <DarkModeToggle dark={dark} onToggle={toggle} />
          </div>
        </div>

        <motion.main
          className="max-w-[1440px] mx-auto px-6 md:px-14 py-10 md:py-14"
          initial={{opacity: 0}}
          animate={mainInView ? {opacity: 1} : {}}
          transition={{duration: 0.6, ease: OUT}}
        >
          <Breadcrumb vehicle={vehicle} />

          <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
            <div className="w-full lg:w-[65%] min-w-0">
              <VehicleGallery vehicle={vehicle} />

              <motion.div
                className="mt-8 mb-6"
                initial={{opacity: 0, y: 12}}
                animate={mainInView ? {opacity: 1, y: 0} : {}}
                transition={{duration: 0.6, ease: EXPO, delay: 0.08}}
              >
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#777] dark:text-[#BCBEC0]/40 mb-1">
                  {vehicle.brand}
                </p>
                <h1 className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold text-black dark:text-white tracking-[-0.025em] leading-[1.1] mb-3">
                  {vehicle.model}
                </h1>
                <p className="text-[13px] text-[#222] dark:text-[#BCBEC0]/55 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{vehicle.year}</span>
                  <span aria-hidden className="text-[#BCBEC0]/30">
                    ·
                  </span>
                  <span>{vehicle.transmission}</span>
                  <span aria-hidden className="text-[#BCBEC0]/30">
                    ·
                  </span>
                  <span>{vehicle.fuel}</span>
                  <span aria-hidden className="text-[#BCBEC0]/30">
                    ·
                  </span>
                  <span>
                    {vehicle.mileage === 0
                      ? "0 km"
                      : `${vehicle.mileage.toLocaleString()} km`}
                  </span>
                </p>
              </motion.div>

              <motion.div
                className="lg:hidden mb-8 pb-8 border-b border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8"
                initial={{opacity: 0}}
                animate={mainInView ? {opacity: 1} : {}}
                transition={{duration: 0.5, ease: EXPO, delay: 0.12}}
              >
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#777] dark:text-[#BCBEC0]/35 mb-1">
                  Asking Price
                </p>
                <p className="text-[26px] font-semibold text-black dark:text-white tracking-[-0.025em] leading-none mb-3">
                  KSh {vehicle.price.toLocaleString()}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  {[
                    "Finance Available",
                    "Trade-ins Accepted",
                    "Nationwide Delivery",
                  ].map((item) => (
                    <span
                      key={item}
                      className="text-[11px] text-[#1a1a1a] dark:text-[#BCBEC0]/50 flex items-center gap-1.5"
                    >
                      <span
                        aria-hidden
                        className="w-1 h-1 rounded-full bg-[#BCBEC0]/50"
                      />
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              {vehicle.description && (
                <motion.div
                  className="mb-10"
                  initial={{opacity: 0, y: 12}}
                  animate={mainInView ? {opacity: 1, y: 0} : {}}
                  transition={{duration: 0.6, ease: EXPO, delay: 0.14}}
                >
                  <p className="text-[13px] md:text-[14px] text-[#1a1a1a] dark:text-[#BCBEC0]/60 leading-[1.9]">
                    {vehicle.description}
                  </p>
                </motion.div>
              )}

              <div className="lg:hidden mb-10">
                <PurchaseCard vehicle={vehicle} />
              </div>

              <div className="mb-10">
                <Specifications vehicle={vehicle} />
              </div>

              {vehicle.features && vehicle.features.length > 0 && (
                <div className="mb-10">
                  <Features features={vehicle.features} />
                </div>
              )}

              <VehicleNav currentSlug={vehicle.slug} />
            </div>

            <div className="hidden lg:block w-full lg:w-[35%] flex-shrink-0">
              <div className="sticky top-20">
                <PurchaseCard vehicle={vehicle} />
              </div>
            </div>
          </div>

          {recommendations.length > 0 && (
            <section className="mt-20 pt-12 border-t border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8">
              <motion.div
                initial={{opacity: 0, y: 16}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.1}}
                transition={{duration: 0.7, ease: EXPO}}
                className="mb-8"
              >
                <p className="text-[11px] tracking-[0.28em] uppercase text-[#777] dark:text-[#BCBEC0]/40 mb-1">
                  You May Also Like
                </p>
                <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight">
                  Similar vehicles
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {recommendations.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.1}}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.08,
                      ease: EXPO,
                    }}
                  >
                    <RecommendationCard vehicle={v} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </motion.main>

        <MobileStickyBar vehicle={vehicle} />
      </div>
    </>
  );
}
