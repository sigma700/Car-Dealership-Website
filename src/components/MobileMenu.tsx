"use client";
import {motion, AnimatePresence, useReducedMotion} from "framer-motion";
import Link from "next/link";
import {useEffect, useRef} from "react";
import {usePathname} from "next/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  models: {name: string; slug: string}[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  {label: "Home", href: "/"},
  {label: "Inventory", href: "/inventory"},
  {label: "Trade-In", href: "/trade-in"},
  {label: "Ownership", href: "/ownership"},
  {label: "Contact", href: "/contact"},
];

export default function MobileMenu({open, onClose}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion(); // Framer Motion hook

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const firstFocusable = menuRef.current?.querySelector(
        "a, button",
      ) as HTMLElement;
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const listVariants = {
    hidden: {},
    visible: {
      transition: {staggerChildren: 0.06, delayChildren: 0.2},
    },
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 24, filter: "blur(8px)"},
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {duration: 0.6, ease: EASE},
    },
  };

  return (
    <>
      {/* Page scale/blur/darken wrapper trigger */}
      <style jsx global>{`
        body {
          transition: filter 0.6s
            ${prefersReducedMotion ? "linear" : "cubic-bezier(0.22,1,0.36,1)"};
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            layoutId="mobile-glass-nav"
            initial={{
              borderRadius: 18,
              opacity: 0,
            }}
            animate={{
              borderRadius: 0,
              opacity: 1,
            }}
            exit={{
              borderRadius: 18,
              opacity: 0,
              transition: {duration: 0.45, ease: EASE},
            }}
            transition={{duration: 0.7, ease: EASE}}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden lg:hidden"
            style={{
              background: "rgba(10,10,10,0.72)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Ambient layers */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              aria-hidden
            >
              <motion.div
                className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full blur-3xl"
                style={{background: "rgba(188,190,192,0.12)"}}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {x: [0, 30, 0], y: [0, 20, 0], opacity: [0.5, 0.8, 0.5]}
                }
                transition={{duration: 18, repeat: Infinity, ease: "easeInOut"}}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-full blur-3xl"
                style={{background: "rgba(255,255,255,0.07)"}}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        x: [0, -25, 0],
                        y: [0, -15, 0],
                        opacity: [0.4, 0.65, 0.4],
                      }
                }
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 100%, rgba(0,0,0,0.5), transparent 60%)",
                }}
              />
            </div>

            {/* Header row with close button */}
            <div className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-6">
              <img
                src="https://res.cloudinary.com/dnadawobi/image/upload/v1782515261/Al-ahsan_Logo_bcs077.png"
                alt="Al Ahsan"
                className="h-8 w-auto"
              />
              <motion.button
                onClick={onClose}
                aria-label="Close menu"
                whileHover={
                  prefersReducedMotion ? {} : {scale: 1.06, rotate: 90}
                }
                whileTap={{scale: 0.92}}
                transition={{type: "spring", stiffness: 300, damping: 20}}
                className="flex items-center justify-center w-12 h-12 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 10px 30px rgba(0,0,0,.35)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#BCBEC0"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Navigation links */}
            <motion.nav
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-12 gap-2"
              aria-label="Mobile navigation links"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group relative flex items-center gap-4 py-3"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-dot"
                          className="w-2 h-2 rounded-full bg-[#BCBEC0]"
                          style={{boxShadow: "0 0 12px rgba(188,190,192,0.8)"}}
                        />
                      )}
                      <span
                        className={`relative inline-block text-4xl font-light tracking-tight transition-all duration-300 ${
                          isActive ? "text-white" : "text-white/70"
                        } group-hover:text-white group-hover:translate-x-1.5`}
                      >
                        {link.label}
                        <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#BCBEC0] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 px-6 md:px-10 mb-6"
            >
              <PremiumCTA
                onClose={onClose}
                reducedMotion={!!prefersReducedMotion}
              />
            </motion.div>

            {/* Contact footer */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 px-6 md:px-10 pb-8 pb-[calc(env(safe-area-inset-bottom)+2rem)]"
            >
              <div
                className="rounded-2xl overflow-hidden divide-y"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <a
                  href="tel:+254743155777"
                  className="flex items-center gap-3 px-5 py-4 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <span aria-hidden>📞</span> +254 743 155 777
                </a>
                <a
                  href="mailto:alahsanmotors@gmail.com"
                  className="flex items-center gap-3 px-5 py-4 text-sm text-white/70 hover:text-white transition-colors"
                  style={{borderTop: "1px solid rgba(255,255,255,0.08)"}}
                >
                  <span aria-hidden>✉</span> alahsanmotors@gmail.com
                </a>
                <div
                  className="flex items-center gap-3 px-5 py-4 text-sm text-white/50"
                  style={{borderTop: "1px solid rgba(255,255,255,0.08)"}}
                >
                  <span aria-hidden>📍</span> Nairobi, Kenya
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PremiumCTA({
  onClose,
  reducedMotion,
}: {
  onClose: () => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      whileHover={reducedMotion ? {} : {scale: 1.02}}
      whileTap={{scale: 0.97}}
      transition={{type: "spring", stiffness: 300, damping: 22}}
      className="relative"
    >
      <Link
        href="/contact"
        onClick={onClose}
        className="relative flex items-center justify-center w-full overflow-hidden rounded-full text-base font-medium text-white tracking-wide"
        style={{
          height: 56,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 12px 40px rgba(0,0,0,.35)",
        }}
      >
        {!reducedMotion && (
          <motion.span
            className="absolute inset-y-0 w-1/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
            animate={{left: ["-40%", "140%"]}}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <span className="text-lg leading-none">+</span> Book Test Drive
        </span>
      </Link>
    </motion.div>
  );
}
