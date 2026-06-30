"use client";

import {useRef, useState, useEffect, useCallback} from "react";
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
// ─── Journey ───────────────────────────────────────────────────────────

const JOURNEY = [
  {
    step: "01",
    title: "Vehicle Verification",
    subtitle: "Buy with complete confidence.",
    description:
      "We verify every vehicle's ownership through NTSA records, inspect the chassis and engine numbers, and ensure there are no outstanding loans or legal restrictions.",
    detail:
      "NTSA verification · Chassis & engine inspection · Ownership confirmed",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782719892/ChatGPT_Image_Jun_29_2026_10_57_45_AM_w6d8ch.png",
  },
  {
    step: "02",
    title: "Professional Inspection",
    subtitle: "Every detail examined.",
    description:
      "Our experienced technicians perform a comprehensive mechanical and cosmetic inspection to ensure the vehicle meets our quality standards before any transaction.",
    detail:
      "Mechanical assessment · Road test · Exterior & interior inspection",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782720341/ChatGPT_Image_Jun_29_2026_11_05_28_AM_gp9pbz.png",
  },
  {
    step: "03",
    title: "Documentation",
    subtitle: "Everything prepared correctly.",
    description:
      "We guide both buyer and seller through all required documentation, including identification, KRA PIN verification, insurance requirements, and the sale agreement.",
    detail: "Sale agreement · KRA PIN verification · Insurance guidance",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782720870/ChatGPT_Image_Jun_29_2026_11_14_18_AM_bvlxlj.png",
  },
  {
    step: "04",
    title: "NTSA Transfer",
    subtitle: "Handled digitally.",
    description:
      "The ownership transfer is initiated through the NTSA eCitizen portal, where seller and buyer securely complete the digital transfer process.",
    detail: "Seller initiation · Buyer acceptance · Secure online transfer",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782719132/ChatGPT_Image_Jun_29_2026_10_45_12_AM_ezr0ex.png",
  },
  {
    step: "05",
    title: "Secure Payment",
    subtitle: "Safe for both parties.",
    description:
      "Payment is completed using secure and traceable methods such as bank transfers, bankers' cheques, financing, or approved trade-in arrangements.",
    detail:
      "Bank transfer · Bank finance · Trade-in support · No cash required",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782719512/ChatGPT_Image_Jun_29_2026_10_51_36_AM_yvjcwd.png",
  },
  {
    step: "06",
    title: "Logbook Collection",
    subtitle: "Ownership officially yours.",
    description:
      "Once NTSA approves the transfer, the new logbook is collected from your selected NTSA office, completing your ownership journey.",
    detail: "Typically 3 working days · SMS notification · Collect new logbook",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782719266/ChatGPT_Image_Jun_29_2026_10_47_33_AM_fh0rej.png",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "AL Ahsen Motors: A Beacon of Excellence in Automotive Excellence in Nairobi Kenya 🇰🇪",
    author: "Bilal Fish Hachery",
    role: "Google Reviewer",
    initial: "B",
  },
  {
    quote:
      "They have great selection of whips🚗💯There's something for everyone 😉 👌🏾",
    author: "Joel Ndoho",
    role: "Local Guide · 17 reviews",
    initial: "J",
  },
  {
    quote:
      "Their gentleness and customer service can make you want to buy more than one car",
    author: "Esther Kavee",
    role: "Google Reviewer",
    initial: "E",
  },
  {
    quote: "Superb",
    author: "Owuor Otieno",
    role: "Local Guide · 21 reviews",
    initial: "O",
  },
  {
    quote: "It's amazing",
    author: "Ahsan Mehmood",
    role: "Google Reviewer",
    initial: "A",
  },
  {
    quote: "Good atmosphere",
    author: "Akram Ak",
    role: "Local Guide · 114 reviews",
    initial: "A",
  },
];

const FAQS = [
  {
    question: "What does the service plan include?",
    answer:
      "All manufacturer-scheduled maintenance including genuine parts, labour, and a full inspection at each interval. We handle collection and return at no additional cost, your time is valuable.",
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

// ─── Data for Sourcing & Latest Arrivals ────────────────────────────
const SOURCING_CAPABILITIES = [
  {value: "Local", label: "Sourced Within Kenya"},
  {value: "Int'l", label: "Imported On Request"},
  {value: "Any", label: "Make, Model, Specification"},
];

type ArrivalStatus = "Available" | "Reserved" | "Coming Soon";

interface Arrival {
  name: string;
  year: string;
  mileage: string;
  transmission: string;
  fuel: string;
  price: string;
  status: ArrivalStatus;
  image: string;
}

const LATEST_ARRIVALS: Arrival[] = [
  {
    name: "Range Rover Autobiography",
    year: "2022",
    mileage: "18,400 km",
    transmission: "Automatic",
    fuel: "Petrol",
    price: "KSh 14.2M",
    status: "Available",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/696079488_18093854960464881_8054968166366360808_n.jpg?stp=dst-jpg_e35_s720x720_tt6&_nc_cat=105&ig_cache_key=Mzg5NzAyMTc1NTY2MTg3NDY1Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=m8_Ewrn3ftoQ7kNvwEyaEG8&_nc_oc=AdoBLc_hNYF1HdwwTqLU2nHbrRxq8bqdu68NJigfACN3WCxrqWRKeUFUyKsfJheZE94&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=sWR-35dDM_e4m26tPl2yNg&_nc_ss=7a22e&oh=00_AQAkBFbnfHceCrRmDcoEnnli9oSDSNPJaJnmc6yeVdFpOQ&oe=6A48E410",
  },
  {
    name: "BMW M5 Competition",
    year: "2021",
    mileage: "22,100 km",
    transmission: "Automatic",
    fuel: "Petrol",
    price: "KSh 11.8M",
    status: "Reserved",
    image:
      "https://res.cloudinary.com/dnadawobi/image/upload/v1782517744/%D0%A4%D0%BE%D1%82%D0%BE_BMW_M5_F90_hukdsx.jpg",
  },
  {
    name: "Audi Q7 V10",
    year: "2023",
    mileage: "6,900 km",
    transmission: "Automatic",
    fuel: "Petrol",
    price: "KSh 19.5M",
    status: "Available",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/623272978_18082034687464881_113464055509776147_n.jpg?stp=dst-jpg_e35_p640x640_sh2.08_tt6&_nc_cat=108&ig_cache_key=MzgxOTU2MzA3MzE1NDA2NTA0NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=cuvsTCFyqEEQ7kNvwGJ8gl9&_nc_oc=AdoE7vv_or8VHn39AXkglAslst8XYkL5XZTYKAtmdyLhQQQJmPwTIMOz_T7KaEZiMaI&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=DJ22XcQV3XZTsLlpoGO8Jw&_nc_ss=7a22e&oh=00_AQD3YqITWacVs5LOWdaWibhiVuwjMRghV_Peunib63mT1g&oe=6A490F45",
  },
  {
    name: "Mercedes-Benz G63 AMG",
    year: "2022",
    mileage: "14,300 km",
    transmission: "Automatic",
    fuel: "Petrol",
    price: "KSh 22.4M",
    status: "Coming Soon",
    image:
      "https://scontent-mba2-1.cdninstagram.com/v/t51.82787-15/696060296_18093907523464881_6392031925380848544_n.jpg?stp=dst-jpg_e35_s1080x1080_tt6&_nc_cat=100&ig_cache_key=Mzg5NzM5NzYzNjE4MzkwOTM3Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=weDd_oHXvCAQ7kNvwFT4tSB&_nc_oc=AdqNuoWxmHdqiuXBJ-Zkzv0Wh_6Z4TzfFkKaYY03aMEaWLsooaP7b44E_1HOJ0dFMCM&_nc_ad=z-m&_nc_cid=1695&_nc_zt=23&_nc_ht=scontent-mba2-1.cdninstagram.com&_nc_gid=sWR-35dDM_e4m26tPl2yNg&_nc_ss=7a22e&oh=00_AQA2WXiWzamhlBq4JQOg8ZD6ITkwW9MZ5KKtKjNyVxu_lw&oe=6A48DBDF",
  },
];

const STATUS_STYLES: Record<ArrivalStatus, string> = {
  Available: "text-[#BCBEC0] border-[#BCBEC0]/40",
  Reserved: "text-[#BCBEC0]/45 border-[#BCBEC0]/20",
  "Coming Soon": "text-[#BCBEC0]/45 border-[#BCBEC0]/20",
};

// ─── Page ───────────────────────────────────────────────────────────
export default function OwnershipPage() {
  return (
    <div className="bg-black">
      <OwnershipHero />
      <TrustStrip />
      <OwnershipJourneySection />
      <DeliverySection />
      <SupportSection />
      <SourcingSection /> {/* replaced MaintenanceSection */}
      <LatestArrivalsSection /> {/* replaced EventsSection */}
      <TestimonialsSection />
      <FAQSection />
      <CTABand />
    </div>
  );
}

// ─── Hero (unchanged) ───────────────────────────────────────────────
function OwnershipHero() {
  // ... exact same content as provided ...
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const springImgY = useSpring(imgY, {stiffness: 90, damping: 24});
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
          transition={{duration: 0.7, ease: EXPO, delay: 0.06}}
        >
          Al Husnain · Ownership Programme
        </motion.p>

        {/* Headline */}
        <h1
          className="mb-8"
          aria-label="Ownership that continues long after delivery."
        >
          <div className="overflow-hidden pb-[0.06em]">
            <motion.span
              className="block font-display font-bold text-white tracking-tight"
              style={{
                fontSize: "clamp(2.4rem, 6.8vw, 6.4rem)",
                lineHeight: 1.05,
              }}
              initial={{clipPath: "inset(0 100% -10% 0)", opacity: 0}}
              animate={{clipPath: "inset(0 0% -10% 0)", opacity: 1}}
              transition={{duration: 0.85, ease: EXPO, delay: 0.16}}
            >
              Kenya's trusted destination
            </motion.span>
          </div>
          <div className="overflow-hidden mt-1 pb-[0.06em]">
            <motion.span
              className="block font-display font-bold text-[#BCBEC0] tracking-tight"
              style={{
                fontSize: "clamp(2.4rem, 6.8vw, 6.4rem)",
                lineHeight: 1.05,
              }}
              initial={{clipPath: "inset(0 100% -10% 0)", opacity: 0}}
              animate={{clipPath: "inset(0 0% -10% 0)", opacity: 1}}
              transition={{duration: 0.85, ease: EXPO, delay: 0.24}}
            >
              for premium vehicles.
            </motion.span>
          </div>
        </h1>

        {/* Subline */}
        <motion.p
          className="text-sm md:text-[15px] text-[#BCBEC0]/60 leading-[1.8] mb-10"
          style={{maxWidth: "min(540px, 88vw)"}}
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.65, ease: OUT, delay: 0.38}}
        >
          Every vehicle we sell comes with a complete support structure ,
          personal advisors, doorstep maintenance, and a community built for
          those who expect more from their dealership.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, ease: OUT, delay: 0.48}}
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
          transition={{delay: 0.7, duration: 0.55}}
        >
          Nairobi · Est. 2010 · Authorised by leading manufacturers
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.9, duration: 0.5}}
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

// ─── Trust strip (unchanged) ────────────────────────────────────────
function TrustStrip() {
  // ... exact same content as provided ...
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
            initial={{opacity: 0, y: 12}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.5, delay: i * 0.06, ease: EXPO}}
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

// ─── Ownership journey (unchanged) ──────────────────────────────────
function OwnershipJourneySection() {
  // ... exact same content as provided ...
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
              initial={{opacity: 0, scale: 1.025}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.985}}
              transition={{duration: 0.45, ease: EXPO}}
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
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -6}}
              transition={{duration: 0.3, ease: EXPO}}
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
                  transition={{duration: 0.25}}
                  className="flex items-center gap-4 w-full text-left"
                >
                  <span className="text-[11px] tracking-wider text-[#BCBEC0] font-mono w-6 flex-shrink-0">
                    {step.step}
                  </span>
                  <div
                    className="flex-1 h-px transition-all duration-300"
                    style={{
                      background:
                        i === active ? "#BCBEC0" : "rgba(188,190,192,0.2)",
                      transform: `scaleX(${i === active ? 1 : 0.4})`,
                      transformOrigin: "left",
                    }}
                  />
                  <span
                    className="text-[13px] leading-snug transition-colors duration-200 truncate min-w-0"
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
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.32, ease: EXPO}}
              className="space-y-5"
            >
              <h2 className="font-display text-3xl xl:text-4xl text-white leading-[1.05] font-bold">
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
                    duration: 1.6,
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
              className="text-sm text-[#BCBEC0] hover:text-white transition-colors duration-200"
            >
              +254 700 000 000
            </a>
          </div>
        </div>

        {/* Mobile overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.3, ease: EXPO}}
            className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent px-6 pb-10 pt-24"
          >
            <p className="text-[10px] tracking-[0.28em] text-[#BCBEC0]/55 uppercase mb-2">
              {JOURNEY[active].step} — Journey
            </p>
            <h2 className="font-display text-2xl text-white font-bold mb-3 leading-[1.08]">
              {JOURNEY[active].title}
            </h2>
            <p className="text-xs text-[#BCBEC0]/55 leading-relaxed">
              {JOURNEY[active].description}
            </p>
            <div className="flex gap-2 mt-5">
              {JOURNEY.map((_, i) => (
                <div
                  key={i}
                  className="h-px transition-all duration-300"
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

// ─── Shared section wrapper (unchanged) ─────────────────────────────
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

// ─── Delivery (unchanged) ──────────────────────────────────────────
function DeliverySection() {
  // ... exact same content as provided ...
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});

  return (
    <SectionShell>
      <section ref={ref}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-5">
              <motion.p
                initial={{opacity: 0, x: -12}}
                animate={inView ? {opacity: 1, x: 0} : {}}
                transition={{duration: 0.5, ease: EXPO}}
                className="text-[10px] tracking-[0.32em] text-[#BCBEC0] uppercase mb-5 font-medium"
              >
                Doorstep Delivery
              </motion.p>
              <div className="overflow-hidden pb-[0.06em]">
                <motion.h2
                  initial={{y: "105%"}}
                  animate={inView ? {y: "0%"} : {}}
                  transition={{duration: 0.7, ease: EXPO, delay: 0.08}}
                  className="font-display text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] font-bold"
                >
                  Arrives precisely
                  <br />
                  <span className="text-[#BCBEC0] italic">as expected.</span>
                </motion.h2>
              </div>
            </div>

            <motion.div
              className="lg:col-span-6 lg:col-start-7"
              initial={{opacity: 0, y: 16}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.55, ease: EXPO, delay: 0.18}}
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
                    initial={{opacity: 0, x: 12}}
                    animate={inView ? {opacity: 1, x: 0} : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.26 + i * 0.05,
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
            transition={{duration: 0.9, ease: EXPO, delay: 0.05}}
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

// ─── Support (unchanged) ────────────────────────────────────────────
function SupportSection() {
  // ... exact same content as provided ...
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
      body: "Insurance renewals, logbook transfers, and compliance paperwork , handled accurately and on time.",
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
                initial={{opacity: 0, x: -12}}
                animate={inView ? {opacity: 1, x: 0} : {}}
                transition={{duration: 0.5, ease: EXPO}}
                className="text-[10px] tracking-[0.32em] text-[#BCBEC0]/55 uppercase mb-4 font-medium"
              >
                Dedicated Support
              </motion.p>
              <div className="overflow-hidden pb-[0.06em]">
                <motion.h2
                  initial={{y: "105%"}}
                  animate={inView ? {y: "0%"} : {}}
                  transition={{duration: 0.7, ease: EXPO, delay: 0.07}}
                  className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] font-bold"
                >
                  One contact.
                  <br />
                  <span className="text-[#BCBEC0] italic">Every need.</span>
                </motion.h2>
              </div>
            </div>
            <motion.p
              initial={{opacity: 0, y: 14}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.55, delay: 0.16, ease: EXPO}}
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
                transition={{
                  duration: 0.45,
                  delay: 0.06 + i * 0.06,
                  ease: EXPO,
                }}
                className="group grid grid-cols-12 items-center gap-4 py-7 border-b border-[#BCBEC0]/15 hover:border-[#BCBEC0]/28 transition-colors duration-300 cursor-default"
              >
                <span className="col-span-1 text-[11px] font-mono text-[#BCBEC0]/20 group-hover:text-[#BCBEC0]/38 transition-colors duration-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="col-span-1 text-lg text-[#BCBEC0]/35 group-hover:text-[#BCBEC0] transition-colors duration-200 hidden md:block"
                  aria-hidden
                >
                  {p.icon}
                </span>
                <h3 className="col-span-4 md:col-span-3 text-base md:text-lg text-white group-hover:text-[#BCBEC0] transition-colors duration-200 font-semibold">
                  {p.title}
                </h3>
                <p className="col-span-7 md:col-span-6 text-xs text-[#BCBEC0]/38 leading-relaxed group-hover:text-[#BCBEC0]/62 transition-colors duration-200">
                  {p.body}
                </p>
                <span
                  className="col-span-1 text-[#BCBEC0] justify-self-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block"
                  aria-hidden
                >
                  →
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{opacity: 0, y: 12}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.5, delay: 0.42, ease: EXPO}}
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

// ─── NEW: Sourcing Section ──────────────────────────────────────────
function SourcingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.18});

  return (
    <SectionShell>
      <section ref={ref}>
        <div className="flex flex-col lg:flex-row-reverse min-h-[80vh]">
          <div className="w-full lg:w-1/2 px-6 md:px-16 py-24 md:py-32 flex flex-col justify-center">
            <motion.p
              initial={{opacity: 0, x: 12}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.5, ease: EXPO}}
              className="text-[10px] tracking-[0.32em] text-[#BCBEC0] uppercase mb-6 font-medium"
            >
              Vehicle Sourcing
            </motion.p>

            <div className="overflow-hidden mb-6 pb-[0.06em]">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 0.7, ease: EXPO, delay: 0.07}}
                className="font-display text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] font-bold"
              >
                If it exists,
                <br />
                <span className="text-[#BCBEC0] italic">we'll find it.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{opacity: 0, y: 12}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.55, delay: 0.18, ease: EXPO}}
              className="text-sm text-black/58 leading-relaxed max-w-md mb-10"
            >
              Not every vehicle is in our current inventory. Tell us the make,
              model, and specification you're looking for , locally or
              internationally , and our specialists handle sourcing, inspection,
              and documentation from start to finish.
            </motion.p>

            <div className="grid grid-cols-3 gap-5 mb-10 border-t border-black/10 pt-8">
              {SOURCING_CAPABILITIES.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{opacity: 0, y: 14}}
                  animate={inView ? {opacity: 1, y: 0} : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.22 + i * 0.06,
                    ease: EXPO,
                  }}
                >
                  <div className="font-display text-2xl md:text-3xl text-[#BCBEC0] leading-none mb-1 font-bold">
                    {s.value}
                  </div>
                  <div className="text-[10px] tracking-[0.14em] text-[#BCBEC0]/45 uppercase">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{opacity: 0, y: 10}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.5, delay: 0.32, ease: EXPO}}
              className="flex flex-col sm:flex-row sm:items-center gap-5"
            >
              <Button variant="primary" size="md">
                Request a Vehicle
              </Button>
              <a
                href="/contact?subject=sourcing"
                className="text-[11px] tracking-[0.2em] text-black/45 uppercase border-b border-black/20 pb-px hover:text-black hover:border-black/45 transition-colors duration-200 w-fit"
              >
                Speak to a Specialist
              </a>
            </motion.div>
          </div>

          <motion.div
            className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-full overflow-hidden"
            initial={{clipPath: "inset(0 0 100% 0)"}}
            animate={inView ? {clipPath: "inset(0 0 0% 0)"} : {}}
            transition={{duration: 0.75, ease: EXPO, delay: 0.1}}
          >
            <img
              src="https://res.cloudinary.com/dnadawobi/image/upload/v1782786541/ChatGPT_Image_Jun_30_2026_05_28_38_AM_pnzyzc.png"
              alt="Specialist reviewing a sourced vehicle before inspection"
              className="w-full h-full object-cover min-h-[50vh]"
            />
          </motion.div>
        </div>
      </section>
    </SectionShell>
  );
}

// ─── NEW: Latest Arrivals Section ───────────────────────────────────
function LatestArrivalsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.1});

  return (
    <SectionShell bg="bg-black">
      <section ref={ref} className="py-28 md:py-40 px-6 md:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end mb-16 gap-8">
            <div className="lg:col-span-6">
              <motion.p
                initial={{opacity: 0, x: -12}}
                animate={inView ? {opacity: 1, x: 0} : {}}
                transition={{duration: 0.5, ease: EXPO}}
                className="text-[10px] tracking-[0.32em] text-[#BCBEC0]/55 uppercase mb-4 font-medium"
              >
                Latest Arrivals
              </motion.p>
              <div className="overflow-hidden pb-[0.06em]">
                <motion.h2
                  initial={{y: "105%"}}
                  animate={inView ? {y: "0%"} : {}}
                  transition={{duration: 0.7, ease: EXPO, delay: 0.07}}
                  className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] font-bold"
                >
                  Recently added
                  <br />
                  <span className="text-[#BCBEC0] italic">
                    to the collection.
                  </span>
                </motion.h2>
              </div>
            </div>
            <motion.p
              initial={{opacity: 0, y: 12}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.55, delay: 0.16, ease: EXPO}}
              className="lg:col-span-4 lg:col-start-9 text-sm text-[#BCBEC0]/38 leading-relaxed"
            >
              Every vehicle below has completed our full inspection and
              documentation process and is ready for handover.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#BCBEC0]/15">
            {LATEST_ARRIVALS.map((car, i) => (
              <motion.a
                key={car.name}
                href={`/inventory?vehicle=${encodeURIComponent(car.name)}`}
                initial={{opacity: 0, y: 24}}
                animate={inView ? {opacity: 1, y: 0} : {}}
                transition={{duration: 0.55, delay: i * 0.08, ease: EXPO}}
                className="group relative bg-black overflow-hidden"
              >
                <div
                  className="relative overflow-hidden"
                  style={{aspectRatio: "4 / 3"}}
                >
                  <motion.img
                    src={car.image}
                    alt={`${car.name}, ${car.year}`}
                    className="w-full h-full object-cover"
                    whileHover={{scale: 1.04}}
                    transition={{duration: 0.6, ease: OUT}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span
                    className={`absolute top-4 left-4 text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 border rounded-full backdrop-blur-sm bg-black/30 ${STATUS_STYLES[car.status]}`}
                  >
                    {car.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base md:text-lg text-white font-semibold font-display group-hover:text-[#BCBEC0] transition-colors duration-200">
                      {car.name}
                    </h3>
                    <span className="text-sm text-[#BCBEC0] font-medium whitespace-nowrap ml-4">
                      {car.price}
                    </span>
                  </div>
                  <p className="text-[11px] tracking-wide text-[#BCBEC0]/40 mb-4">
                    {car.year} · {car.mileage} · {car.transmission} · {car.fuel}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#BCBEC0]/50 group-hover:text-[#BCBEC0] transition-colors duration-200">
                    View Details
                    <span className="relative inline-block w-4 overflow-hidden h-px bg-[#BCBEC0]/30 group-hover:bg-[#BCBEC0]/60 transition-colors duration-200" />
                    <motion.span
                      className="inline-block"
                      initial={{x: 0}}
                      whileHover={{x: 3}}
                      transition={{duration: 0.2}}
                    >
                      →
                    </motion.span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{opacity: 0, y: 12}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.5, delay: 0.4, ease: EXPO}}
            className="mt-12 flex justify-center"
          >
            <Button variant="outline" size="md">
              View Full Inventory
            </Button>
          </motion.div>
        </div>
      </section>
    </SectionShell>
  );
}

// ─── Testimonials Carousel (unchanged) ─────────────────────────────
function TestimonialsSection() {
  // ... exact same content as provided ...
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.18});
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  }, []);

  // Auto‑advance every 6 seconds
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  const pauseAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resumeAuto = () => {
    pauseAuto();
    intervalRef.current = setInterval(next, 6000);
  };

  return (
    <SectionShell>
      <section
        ref={ref}
        className="py-28 md:py-40 px-6 md:px-16"
        onMouseEnter={pauseAuto}
        onMouseLeave={resumeAuto}
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="mb-18 md:mb-24">
            <motion.p
              initial={{opacity: 0, x: -12}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.5, ease: EXPO}}
              className="text-[10px] tracking-[0.32em] text-[#555] uppercase mb-4 font-medium"
            >
              Client Voices
            </motion.p>
            <div className="overflow-hidden pb-[0.06em]">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 0.7, ease: EXPO, delay: 0.07}}
                className="font-display text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] font-bold"
              >
                Trusted by those
                <br />
                <span className="text-[#4B4B4B] italic">who know quality.</span>
              </motion.h2>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative border-t border-gray-300 pt-12">
            <div className="min-h-[280px] md:min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current}
                  initial={{opacity: 0, y: 18}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -12}}
                  transition={{duration: 0.35, ease: EXPO}}
                  className="grid grid-cols-12 items-start gap-5 pb-10"
                >
                  <div className="col-span-1 hidden lg:flex">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-400 flex items-center justify-center">
                      <span className="text-xs text-gray-700 font-medium">
                        {TESTIMONIALS[current].initial}
                      </span>
                    </div>
                  </div>
                  <p className="col-span-12 lg:col-span-8 text-xl md:text-2xl text-black leading-[1.32] italic font-semibold font-display">
                    "{TESTIMONIALS[current].quote}"
                  </p>
                  <footer className="col-span-12 lg:col-span-3 lg:col-start-10 text-right">
                    <p className="text-xs text-black font-semibold tracking-wide mb-0.5">
                      {TESTIMONIALS[current].author}
                    </p>
                    <p className="text-[10px] tracking-[0.14em] text-[#4B4B4B] uppercase">
                      {TESTIMONIALS[current].role}
                    </p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Controls – dark, highly visible */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-700 hover:border-gray-600 hover:text-black transition-colors duration-200"
                  aria-label="Previous testimonial"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 4L6 8L10 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-700 hover:border-gray-600 hover:text-black transition-colors duration-200"
                  aria-label="Next testimonial"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      i === current
                        ? "bg-gray-700 scale-100"
                        : "bg-gray-400 scale-75 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionShell>
  );
}

// ─── FAQ (unchanged) ────────────────────────────────────────────────
function FAQSection() {
  // ... exact same content as provided ...
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
              initial={{opacity: 0, x: -12}}
              animate={inView ? {opacity: 1, x: 0} : {}}
              transition={{duration: 0.5, ease: EXPO}}
              className="text-[10px] tracking-[0.32em] text-[#BCBEC0]/55 uppercase mb-4 font-medium"
            >
              Questions
            </motion.p>
            <div className="overflow-hidden mb-5 pb-[0.06em]">
              <motion.h2
                initial={{y: "105%"}}
                animate={inView ? {y: "0%"} : {}}
                transition={{duration: 0.7, ease: EXPO, delay: 0.07}}
                className="font-display text-3xl md:text-4xl text-white leading-[1.05] font-bold"
              >
                Answered
                <br />
                <span className="text-[#BCBEC0] italic">clearly.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{opacity: 0, y: 10}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.5, delay: 0.18, ease: EXPO}}
              className="text-xs text-[#BCBEC0]/38 leading-relaxed mb-8"
            >
              Still have questions? Speak directly with one of our specialists —
              no scripts, no call centres.
            </motion.p>
            <motion.div
              initial={{opacity: 0}}
              animate={inView ? {opacity: 1} : {}}
              transition={{duration: 0.5, delay: 0.26}}
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
                transition={{duration: 0.4, delay: 0.06 + i * 0.06, ease: EXPO}}
                className="border-b border-[#BCBEC0]/15"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                  aria-expanded={open === i}
                >
                  <span className="text-base md:text-lg text-white group-hover:text-[#BCBEC0] transition-colors duration-200 leading-snug font-semibold">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{rotate: open === i ? 45 : 0}}
                    transition={{duration: 0.2, ease: OUT}}
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
                      transition={{duration: 0.28, ease: OUT}}
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
