"use client";
import {useRef, useState, useEffect} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";
import Link from "next/link";
import Button from "@/components/Button";

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const SPRING_SMOOTH = {stiffness: 50, damping: 20, mass: 1};
const SPRING_PRECISE = {stiffness: 80, damping: 22, mass: 1};

/* ─── DATA ─── */
const contactCards = [
  {
    title: "Sales",
    desc: "From test drives to vehicle sourcing – our sales team is ready to help.",
    phone: "+254 700 000 001",
    email: "sales@husein.co.ke",
    button: "Speak to Sales",
  },
  {
    title: "Service & Maintenance",
    desc: "Schedule a service, request a pick‑up, or enquire about your 5‑year plan.",
    phone: "+254 700 000 002",
    email: "service@husein.co.ke",
    button: "Book Service",
  },
  {
    title: "General Enquiries",
    desc: "For any other questions – we'll respond within 15 minutes.",
    phone: "+254 700 000 000",
    email: "info@husein.co.ke",
    button: "Get in Touch",
  },
];

const faqs = [
  {
    q: "Do I need an appointment to visit?",
    a: "Appointments are recommended so we can dedicate a specialist to you. Walk‑ins are always welcome, but a scheduled visit ensures a premium experience.",
  },
  {
    q: "Can I reserve a vehicle online?",
    a: "Yes. Contact our sales team by phone or WhatsApp, and we'll place a 48‑hour hold on any available vehicle.",
  },
  {
    q: "Do you offer financing?",
    a: "We have partnerships with leading Kenyan banks. Our specialists will present the best options during your consultation.",
  },
  {
    q: "Can you deliver a vehicle to Mombasa or Kisumu?",
    a: "Absolutely. We offer secure, climate‑controlled delivery nationwide.",
  },
  {
    q: "How quickly will someone respond?",
    a: "Sales enquiries are typically answered within 15 minutes. Financing and service requests within 1 hour.",
  },
];

/* ─── ANIMATED INDICATOR ─── */
function AnimatedIndicator({status}: {status: "open" | "closed"}) {
  return (
    <div className="flex items-center gap-2">
      <motion.span
        className={`w-2 h-2 rounded-full ${status === "open" ? "bg-emerald-400" : "bg-red-400"}`}
        animate={{scale: [1, 1.3, 1]}}
        transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
      />
      <span className="text-xs font-mono tracking-wider text-[#BCBEC0]/60">
        {status === "open" ? "Open now" : "Closed"}
      </span>
    </div>
  );
}

/* ─── STICKY TEST DRIVE / CALLBACK SEQUENCE ─── */
const enquirySteps = [
  {
    label: "Type",
    options: [
      "Test Drive",
      "Vehicle Enquiry",
      "Financing",
      "Trade‑In",
      "Other",
    ],
  },
  {
    label: "Vehicle Interest",
    options: ["Sedan", "SUV", "Coupe", "Pickup", "Luxury", "Not sure yet"],
  },
  {label: "Preferred Contact", options: ["Phone Call", "WhatsApp", "Email"]},
  {label: "Your Details", placeholder: "Name, phone number, and any notes…"},
];

function CallbackSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const stepProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, enquirySteps.length],
  );
  useEffect(() => {
    const unsub = stepProgress.on("change", (v) => {
      setActiveStep(Math.min(Math.floor(v), enquirySteps.length - 1));
    });
    return () => unsub();
  }, [stepProgress]);

  return (
    <section
      ref={sectionRef}
      style={{height: `${enquirySteps.length * 100}vh`}}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center bg-black overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(188,190,192,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-lg mx-auto px-6 w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.5, ease: EASE_OUT}}
              className="text-center"
            >
              <h3 className="text-2xl font-display text-white mb-8">
                {enquirySteps[activeStep].label}
              </h3>
              {activeStep < enquirySteps.length - 1 ? (
                <div className="flex flex-wrap justify-center gap-3">
                  {enquirySteps[activeStep].options.map((opt) => (
                    <button
                      key={opt}
                      className="px-5 py-3 rounded-full bg-white/5 border border-[#BCBEC0]/20 text-sm text-[#BCBEC0] hover:bg-[#BCBEC0]/10 hover:border-[#BCBEC0]/50 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    rows={4}
                    placeholder={enquirySteps[activeStep].placeholder}
                    className="w-full bg-black border border-[#BCBEC0]/20 rounded-xl p-4 text-sm text-white placeholder-[#BCBEC0]/40 focus:outline-none focus:border-[#BCBEC0]/50 resize-none"
                  />
                  <Button variant="secondary" size="lg" href="/submit">
                    Submit Enquiry <span className="ml-2">→</span>
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {enquirySteps.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full"
                animate={{
                  width: i === activeStep ? 32 : 8,
                  backgroundColor:
                    i === activeStep ? "#BCBEC0" : "#BCBEC0" + "33",
                }}
                transition={{duration: 0.3}}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const {scrollYProgress: heroScroll} = useScroll({
    target: pageRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "15%"]);

  return (
    <div ref={pageRef} className="bg-black">
      {/* ─── HERO ─── */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-[-4%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnadawobi/image/upload/v1782397148/pexels-ehaan-deva-2149036462-35474224_g94xjh.jpg')",
            y: prefersReduced ? 0 : heroY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10" />

        {/* Centered glass form */}
        <div className="relative z-20 flex items-center justify-center h-full px-6 md:px-16">
          <motion.div
            initial={{opacity: 0, y: 30, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
            className="w-full max-w-2xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
                Get in touch
              </h2>
              <p className="text-sm text-[#BCBEC0]/70 max-w-sm mx-auto">
                Fill in the form below and we'll respond within 15 minutes.
              </p>
            </div>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-black border border-[#BCBEC0]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-[#BCBEC0]/40 focus:outline-none focus:border-[#BCBEC0]/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-black border border-[#BCBEC0]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-[#BCBEC0]/40 focus:outline-none focus:border-[#BCBEC0]/50 transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-black border border-[#BCBEC0]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-[#BCBEC0]/40 focus:outline-none focus:border-[#BCBEC0]/50 transition-colors"
              />
              <select className="w-full bg-black border border-[#BCBEC0]/20 rounded-xl px-4 py-3 text-sm text-[#BCBEC0] focus:outline-none focus:border-[#BCBEC0]/50 transition-colors appearance-none">
                <option value="" disabled selected>
                  Select Service / Query
                </option>
                <option value="sales">Sales Enquiry</option>
                <option value="service">Service & Maintenance</option>
                <option value="general">General Enquiry</option>
                <option value="test-drive">Book a Test Drive</option>
                <option value="trade-in">Trade‑In Valuation</option>
                <option value="financing">Financing Options</option>
              </select>
              <textarea
                rows={4}
                placeholder="Tell us a little about what you're looking for..."
                className="w-full bg-black border border-[#BCBEC0]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-[#BCBEC0]/40 focus:outline-none focus:border-[#BCBEC0]/50 transition-colors resize-none"
              />
              <Button variant="secondary" size="lg" href="/submit">
                Send Message <span className="ml-2">→</span>
              </Button>
              <p className="text-[10px] text-[#BCBEC0]/40 text-center">
                We'll never share your details. Read our{" "}
                <Link
                  href="/legal/privacy"
                  className="underline hover:text-white"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1.2, duration: 0.8}}
          className="absolute bottom-8 right-8 md:right-16 z-20 flex items-center gap-3 text-[#BCBEC0]/30"
        >
          <motion.div
            className="w-8 h-px bg-[#BCBEC0]/30"
            animate={{scaleX: [0, 1, 0]}}
            transition={{duration: 2.5, repeat: Infinity, ease: "easeInOut"}}
            style={{originX: 0}}
          />
          <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ─── CONTACT DESTINATIONS ─── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactCards.map((card, i) => (
            <ContactCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </section>

      <DealerLocator />
      <CallbackSequence />
      <BusinessHours />
      <MapSection />
      <FAQSection />
      <FinalCTA />
      <LegalSection />
    </div>
  );
}

/* ─── CONTACT CARD ─── */
function ContactCard({
  card,
  index,
}: {
  card: (typeof contactCards)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});
  const prefersReduced = usePrefersReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 30}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 0.7, delay: index * 0.1, ease: EASE_OUT_EXPO}}
      whileHover={prefersReduced ? {} : {y: -4, scale: 1.01}}
      className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-500 border border-[#BCBEC0]/40"
    >
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/40 to-transparent" />
      <h3 className="font-display text-xl text-black mb-3">{card.title}</h3>
      <p className="text-sm text-[#BCBEC0]/70 leading-relaxed mb-6">
        {card.desc}
      </p>
      <div className="space-y-2 mb-6 text-sm text-black font-mono">
        <p>{card.phone}</p>
        <p>{card.email}</p>
      </div>
      <Button
        variant="secondary"
        size="sm"
        href={`tel:${card.phone.replace(/\s/g, "")}`}
      >
        {card.button} <span className="ml-2">→</span>
      </Button>
    </motion.div>
  );
}

/* ─── DEALER LOCATOR ─── */
function DealerLocator() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.3});
  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-16 bg-black overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{opacity: 0, x: -40}}
          animate={inView ? {opacity: 1, x: 0} : {}}
          transition={{duration: 0.9, ease: EASE_OUT_EXPO}}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
        >
          <img
            src="https://res.cloudinary.com/dnadawobi/image/upload/v1782396327/pexels-nikola-kolev-2438142-17888840_1_iyaeqj.jpg"
            alt="Showroom"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-xs tracking-widest text-[#BCBEC0] uppercase mb-1">
              Nairobi · Karen
            </p>
            <p className="text-lg font-display text-white">
              Showroom &amp; Service Centre
            </p>
          </div>
        </motion.div>
        <div>
          <motion.p
            initial={{opacity: 0, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
            className="text-xs tracking-[0.2em] text-[#BCBEC0] uppercase mb-4"
          >
            Visit Our Showroom
          </motion.p>
          <motion.h2
            initial={{opacity: 0, y: 20}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO}}
            className="text-3xl md:text-4xl font-display text-white leading-[0.95] mb-6"
          >
            Experience the collection
            <br />
            <span className="text-[#BCBEC0] italic">in person.</span>
          </motion.h2>
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO}}
            className="space-y-4 text-sm text-[#BCBEC0]/70 mb-8"
          >
            <p>123 Karen Road, Nairobi, Kenya</p>
            <p>
              Ample secure parking · Climate‑controlled showroom · Private
              consultation suites
            </p>
          </motion.div>
          <Button variant="secondary" size="sm" href="https://maps.google.com">
            Get Directions <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── BUSINESS HOURS ─── */
function BusinessHours() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.3});
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const isOpen =
    (day >= 1 && day <= 5 && hours >= 8 && hours < 18) ||
    (day === 6 && hours >= 9 && hours < 15);
  return (
    <section ref={ref} className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto text-center">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
        >
          <p className="text-xs tracking-[0.2em] text-[#BCBEC0] uppercase mb-4">
            Business Hours
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-black leading-[1.1] mb-10">
            When to
            <br />
            <span className="text-[#BCBEC0]">reach us.</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-2xl mx-auto">
            <div className="flex-1 bg-white/70 rounded-2xl p-8 shadow-sm border border-[#BCBEC0]/40">
              <p className="text-sm font-medium text-black mb-4">
                Sales &amp; Showroom
              </p>
              <div className="text-xs text-[#BCBEC0]/70 space-y-1">
                <p>Mon–Fri: 8am–6pm</p>
                <p>Sat: 9am–3pm</p>
                <p>Sun: Closed</p>
              </div>
              <div className="mt-4">
                <AnimatedIndicator status={isOpen ? "open" : "closed"} />
                <p className="text-[10px] text-[#BCBEC0]/50 mt-2 font-mono">
                  Typically responds within 15 minutes
                </p>
              </div>
            </div>
            <div className="flex-1 bg-white/70 rounded-2xl p-8 shadow-sm border border-[#BCBEC0]/40">
              <p className="text-sm font-medium text-black mb-4">
                Service &amp; Finance
              </p>
              <div className="text-xs text-[#BCBEC0]/70 space-y-1">
                <p>Mon–Fri: 8am–5pm</p>
                <p>Sat: 9am–1pm</p>
                <p>Sun: Closed</p>
              </div>
              <div className="mt-4">
                <AnimatedIndicator
                  status={
                    day >= 1 && day <= 5 && hours >= 8 && hours < 17
                      ? "open"
                      : "closed"
                  }
                />
                <p className="text-[10px] text-[#BCBEC0]/50 mt-2 font-mono">
                  Typically responds within 1 hour
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MAP SECTION ─── */
function MapSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.2});
  return (
    <section
      ref={ref}
      className="relative py-24 px-6 md:px-16 bg-black overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{opacity: 0, scale: 0.96}}
          animate={inView ? {opacity: 1, scale: 1} : {}}
          transition={{duration: 0.9, ease: EASE_OUT_EXPO}}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.79131163498!2d36.77058477496574!3d-1.3000421986876103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b8984d9187f%3A0x9d0543493b9b510c!2sAl%20Ahsan%20Motors%20Ltd!5e0!3m2!1sen!2ske!4v1782400262373!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{border: 0}}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Al Husnain Motors location"
            className="absolute inset-0"
          />
          <motion.div
            className="absolute top-4 left-4 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 border border-[#BCBEC0]/30 z-10"
            animate={{y: [0, -4, 0]}}
            transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
          >
            <span className="text-xs font-mono text-[#BCBEC0]">
              Al Husnain Motors
            </span>
          </motion.div>
        </motion.div>
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
          >
            <p className="text-xs tracking-[0.2em] text-[#BCBEC0] uppercase mb-4">
              Location
            </p>
            <h2 className="text-3xl md:text-4xl font-display text-white leading-[0.95] mb-6">
              Visit our
              <br />
              <span className="text-[#BCBEC0] italic">flagship showroom.</span>
            </h2>
            <div className="space-y-3 text-sm text-[#BCBEC0]/70">
              <p>123 Karen Road, Nairobi, Kenya</p>
              <p>
                Ample secure parking · Wheelchair accessible · Refreshments
                available
              </p>
            </div>
            <Button variant="secondary" size="sm" href="tel:+254700000000">
              Call for Directions <span className="ml-2">→</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ACCORDION ─── */
function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.15});
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section ref={ref} className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <motion.div
            initial={{opacity: 0, x: -16}}
            animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.7, ease: EASE_OUT_EXPO}}
          >
            <p className="text-xs tracking-[0.2em] text-[#BCBEC0] uppercase mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-display text-black leading-[0.95]">
              You ask.
              <br />
              <span className="text-[#BCBEC0] italic">We answer.</span>
            </h2>
          </motion.div>
        </div>
        <div className="lg:col-span-8 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0, y: 10}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{delay: 0.1 * i, duration: 0.5}}
              className="bg-white/70 rounded-xl border border-[#BCBEC0]/40 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left text-black font-display text-sm md:text-base"
              >
                {faq.q}
                <motion.span
                  animate={{rotate: open === i ? 45 : 0}}
                  className="text-[#BCBEC0] text-lg"
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
                    transition={{duration: 0.3, ease: EASE_OUT}}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-[#BCBEC0]/70 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, amount: 0.3});
  const prefersReduced = usePrefersReducedMotion();
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const springBgY = useSpring(bgY, SPRING_SMOOTH);
  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 px-6 md:px-16"
      style={{background: "#000000"}}
    >
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? {} : {y: springBgY}}
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 100%, #BCBEC0 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/30 to-transparent" />
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{opacity: 0, y: 28}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.8, ease: EASE_OUT_EXPO}}
        >
          <p className="text-[10px] tracking-[0.4em] text-[#BCBEC0] uppercase mb-6 font-mono">
            Al Husnain Motors
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.9] mb-6">
            Your next vehicle is waiting
          </h2>
          <p className="text-sm text-[#BCBEC0]/70 mb-12 max-w-sm mx-auto leading-relaxed">
            Our specialists are ready to help you discover the perfect vehicle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" href="tel:+254700000000">
              Call Now <span className="ml-2">→</span>
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Schedule Visit <span className="ml-2">→</span>
            </Button>
            <Button variant="outline" size="lg" href="/inventory">
              View Inventory <span className="ml-2">→</span>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#BCBEC0]/20 to-transparent" />
    </section>
  );
}

/* ─── LEGAL + PRIVACY ─── */
function LegalSection() {
  return (
    <div className="bg-black border-t border-[#BCBEC0]/20 px-6 md:px-16 py-6">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#BCBEC0]/40 font-mono tracking-wider">
        <p>© 2025 Al Husnain Motors. All rights reserved.</p>
        <p>
          By contacting us, you agree to our{" "}
          <Link href="/legal/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/legal/terms" className="underline hover:text-white">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
