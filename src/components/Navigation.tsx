"use client";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useNavScroll} from "@/hooks/useNavScroll";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Button from "@/components/Button";

// Sample model data (unchanged)
const demoModels = [
  {
    name: "Aurelian S",
    tagline: "Performance without compromise.",
    slug: "aurelian-s",
    startingPrice: 185000,
    navImage: "/images/model-placeholder.jpg",
  },
  {
    name: "Aurelian X",
    tagline: "SUV redefined.",
    slug: "aurelian-x",
    startingPrice: 210000,
    navImage: "/images/model-placeholder.jpg",
  },
  {
    name: "Grand Tourer",
    tagline: "Distance dissolves.",
    slug: "grand-tourer",
    startingPrice: 245000,
    navImage: "/images/model-placeholder.jpg",
  },
];

export default function Navigation() {
  const scrollVariant = useNavScroll();
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTransparent = scrollVariant === "transparent";

  const navBg =
    scrollVariant === "solid"
      ? "bg-black border-b border-[#BCBEC0]/20"
      : scrollVariant === "translucent"
        ? "bg-black/70 backdrop-blur-xl"
        : "bg-transparent";

  const linkClass = isTransparent
    ? "text-white/80 hover:text-white"
    : "text-[#BCBEC0] hover:text-white";
  const utilityClass = isTransparent
    ? "text-white/70 hover:text-white"
    : "text-[#BCBEC0]/70 hover:text-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-8 md:px-16 lg:px-24 xl:px-32 transition-colors duration-400 ${navBg}`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="https://res.cloudinary.com/dnadawobi/image/upload/v1782515261/Al-ahsan_Logo_bcs077.png"
            alt="Al Ahsan"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden lg:flex items-center flex-1 justify-center gap-10 xl:gap-12"
          aria-label="Main navigation"
        >
          {/* Models – with animated dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen("models")}
            onMouseLeave={() => setMegaMenuOpen(null)}
          >
            <button
              className={`text-sm tracking-wide transition-colors flex items-center gap-1 ${linkClass}`}
            >
              Models
              {/* Rotating chevron arrow */}
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{rotate: megaMenuOpen === "models" ? 180 : 0}}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>

            {/* Animated dropdown container */}
            <AnimatePresence>
              {megaMenuOpen === "models" && (
                <motion.div
                  key="mega-menu"
                  initial={{opacity: 0, y: -6, scale: 0.98}}
                  animate={{opacity: 1, y: 0, scale: 1}}
                  exit={{opacity: 0, y: -6, scale: 0.98}}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                  }}
                  className="absolute top-full left-0 right-0 w-max min-w-[720px]"
                >
                  <MegaMenu
                    models={demoModels}
                    onClose={() => setMegaMenuOpen(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/bespoke"
            className={`text-sm tracking-wide transition-colors ${linkClass}`}
          >
            Bespoke
          </Link>

          <Link
            href="/ownership"
            className={`text-sm tracking-wide transition-colors ${linkClass}`}
          >
            Ownership
          </Link>

          <Link
            href="/inventory"
            className={`text-sm tracking-wide transition-colors ${linkClass}`}
          >
            Inventory
          </Link>

          <Link
            href="/contact"
            className={`text-sm tracking-wide transition-colors ${linkClass}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right utilities */}
        <div className="ml-auto flex items-center gap-4 lg:gap-6">
          {/* My Account */}
          <Link
            href="/account"
            className={`hidden sm:flex items-center gap-1.5 text-sm transition-colors ${utilityClass}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            My Account
          </Link>

          {/* Book Test Drive – using Button */}
          <Button
            href="/contact"
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 px-4 py-2 border border-white/30 rounded text-sm text-white hover:bg-white/10 transition-colors"
          >
            <span className="text-lg leading-none">+</span> Book Test Drive
          </Button>

          {/* Phone number */}
          <a
            href="tel:+971501234567"
            className={`hidden lg:flex items-center gap-2 text-sm transition-colors ${utilityClass}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            +971 50 123 4567
          </a>

          {/* Hamburger */}
          <button
            className="lg:hidden ml-2 p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        models={demoModels}
      />

      {/* Spacer */}
      <div className="h-[72px]" />
    </>
  );
}
