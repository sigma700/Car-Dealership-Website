"use client";
import {useState} from "react";
import {useNavScroll} from "@/hooks/useNavScroll";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Button from "@/components/Button";

const navLinks = [
  {label: "Home", href: "/"},
  {label: "Inventory", href: "/inventory"},
  {label: "Trade-In", href: "/trade-in"},
  {label: "Ownership", href: "/ownership"},
  {label: "Contact", href: "/contact"},
];

export default function Navigation() {
  const scrollVariant = useNavScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTransparent = scrollVariant === "transparent";

  const linkClass = isTransparent
    ? "text-white/80 hover:text-white"
    : "text-[#BCBEC0] hover:text-white";
  const utilityClass = isTransparent
    ? "text-white/70 hover:text-white"
    : "text-[#BCBEC0]/70 hover:text-white";

  return (
    <>
      <div className="fixed top-[18px] left-4 right-4 md:left-8 lg:left-8 md:right-8 lg:right-8 z-50 flex justify-center">
        <header
          className="w-full max-w-[1400px] flex items-center h-[68px] px-6 md:px-8 lg:px-10 rounded-[18px] transition-all duration-400"
          style={{
            background: "rgba(10,10,10,0.45)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 40px rgba(0,0,0,.35)",
          }}
        >
          <Link href="/" className="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dnadawobi/image/upload/v1782515261/Al-ahsan_Logo_bcs077.png"
              alt="Al Ahsan"
              className="h-9 w-auto"
            />
          </Link>

          <nav
            className="hidden lg:flex items-center flex-1 justify-center gap-9 xl:gap-11"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm tracking-wide transition-all duration-300 ${linkClass} hover:-translate-y-[1px]`}
              >
                <span className="relative inline-block">
                  {link.label}
                  <span className="absolute left-1/2 -bottom-1.5 h-px w-0 -translate-x-1/2 bg-[#BCBEC0] transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:gap-5">
            <Link
              href="/account"
              className={`hidden sm:flex items-center gap-1.5 text-sm transition-colors duration-300 ${utilityClass}`}
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

            <Button
              onClick={() => (window.location.href = "/contact")}
              variant="outline"
              size="sm"
              className="relative flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm text-white transition-all duration-300 hover:shadow-[0_0_18px_rgba(188,190,192,0.45)]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(6px)",
              }}
            >
              <span className="text-lg leading-none">+</span> Book Test Drive
            </Button>

            <a
              href="tel:+254743155777"
              className={`hidden lg:flex items-center gap-2 text-sm font-light transition-colors duration-300 ${utilityClass}`}
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
              +254 743 155 777
            </a>

            <button
              className="lg:hidden ml-1 p-2"
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
      </div>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        models={[]}
      />

      <div className="h-[104px]" />
    </>
  );
}
