"use client";
import {useState} from "react";
import {useNavScroll} from "@/hooks/useNavScroll";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

// Sample model data for the mega menu (replace with real data later)
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
      ? "bg-void border-b border-smoke"
      : scrollVariant === "translucent"
        ? "bg-void/70 backdrop-blur-xl"
        : "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-8 transition-colors duration-400 ${navBg}`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`text-lg font-display tracking-widest uppercase ${
            isTransparent ? "text-chrome" : "text-gold"
          }`}
        >
          Al Husnain
        </Link>

        {/* Desktop nav links */}
        <nav
          className="hidden lg:flex items-center ml-16 space-x-10"
          aria-label="Main navigation"
        >
          {/* Models with mega menu */}
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen("models")}
            onMouseLeave={() => setMegaMenuOpen(null)}
          >
            <button
              className={`text-sm tracking-wide transition-colors ${
                isTransparent
                  ? "text-chrome/80 hover:text-chrome"
                  : "text-platinum hover:text-silver"
              }`}
            >
              Models
            </button>
            {megaMenuOpen === "models" && (
              <MegaMenu
                models={demoModels}
                onClose={() => setMegaMenuOpen(null)}
              />
            )}
          </div>

          <Link
            href="/bespoke"
            className={`text-sm tracking-wide ${isTransparent ? "text-chrome/80 hover:text-chrome" : "text-platinum hover:text-silver"} transition-colors`}
          >
            Bespoke
          </Link>

          <Link
            href="/ownership"
            className={`text-sm tracking-wide ${isTransparent ? "text-chrome/80 hover:text-chrome" : "text-platinum hover:text-silver"} transition-colors`}
          >
            Ownership
          </Link>

          <Link
            href="/dealers"
            className={`text-sm tracking-wide ${isTransparent ? "text-chrome/80 hover:text-chrome" : "text-platinum hover:text-silver"} transition-colors`}
          >
            Dealers
          </Link>

          <Link
            href="/about"
            className={`text-sm tracking-wide ${isTransparent ? "text-chrome/80 hover:text-chrome" : "text-platinum hover:text-silver"} transition-colors`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`text-sm tracking-wide ${isTransparent ? "text-chrome/80 hover:text-chrome" : "text-platinum hover:text-silver"} transition-colors`}
          >
            Contact
          </Link>
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-4">
          {/* RegionSwitcher placeholder */}
          <button className="text-sm text-platinum/60 hover:text-platinum transition-colors">
            UAE
          </button>

          {/* CTA – standard btn-slide */}
          <a
            href="/contact"
            className="btn-slide btn-slide-gold px-6 py-2 text-sm font-medium tracking-wide inline-flex items-center justify-center"
          >
            <span>Book Test Drive</span>
          </a>

          {/* Hamburger (mobile) */}
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

      {/* Spacer to push content below nav */}
      <div className="h-[72px]" />
    </>
  );
}
