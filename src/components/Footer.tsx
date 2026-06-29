import Link from "next/link";

const models = [
  {label: "Aurelian S", slug: "aurelian-s"},
  {label: "Aurelian X", slug: "aurelian-x"},
  {label: "Grand Tourer", slug: "grand-tourer"},
];

const legalLinks = [
  {label: "Privacy Policy", href: "/legal/privacy"},
  {label: "Terms of Service", href: "/legal/terms"},
  {label: "Cookie Policy", href: "/legal/cookies"},
  {label: "Sitemap", href: "/sitemap"},
];

export default function Footer() {
  return (
    <footer className="border-t border-[#BCBEC0]/20 bg-black">
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img
                src="https://res.cloudinary.com/dnadawobi/image/upload/v1782515261/Al-ahsan_Logo_bcs077.png"
                alt="Al Husnain"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-[#BCBEC0]/70 leading-relaxed mt-3 max-w-xs">
              Curated luxury automobiles for the discerning driver. Experience
              performance, craftsmanship, and service beyond compare.
            </p>
            <div className="flex gap-4 mt-6">
              {["Instagram", "LinkedIn", "YouTube"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-xs text-[#BCBEC0]/40 hover:text-white transition-colors tracking-wider uppercase"
                  aria-label={`Follow us on ${platform}`}
                >
                  {platform.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Models */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/80 mb-4 uppercase">
              Models
            </h4>
            <ul className="space-y-2.5">
              {models.map((model) => (
                <li key={model.slug}>
                  <Link
                    href={`/models/${model.slug}`}
                    className="text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                  >
                    {model.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/models"
                  className="text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                >
                  All Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Bespoke */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/80 mb-4 uppercase">
              Bespoke
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/bespoke"
                  className="text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                >
                  Bespoke Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Ownership */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/80 mb-4 uppercase">
              Ownership
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/ownership"
                  className="text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                >
                  See the process
                </Link>
              </li>
            </ul>
          </div>

          {/* Inventory */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/80 mb-4 uppercase">
              Inventory
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/inventory"
                  className="text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                >
                  Find a Dealer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Legal + Contact details */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/80 mb-4 uppercase">
              Contact
            </h4>
            <ul className="space-y-2.5 mb-6">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                >
                  Get in Touch
                </Link>
              </li>

              {/* Phone numbers */}
              <li>
                <a
                  href="tel:+254743155777"
                  className="flex items-center gap-2 text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
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
                  <span>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider block leading-none mb-0.5">
                      Sales
                    </span>
                    +254 743 155777
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+254740567858"
                  className="flex items-center gap-2 text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
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
                  <span>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider block leading-none mb-0.5">
                      Service
                    </span>
                    +254 740 567858
                  </span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:alahsanmotors@gmail.com"
                  className="flex items-center gap-2 text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  alahsanmotors@gmail.com
                </a>
              </li>
            </ul>

            <h4 className="text-xs font-semibold tracking-widest text-white/80 mb-4 uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#BCBEC0]/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#BCBEC0]/20">
        <div className="max-w-[1440px] mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BCBEC0]/40">
          <p>© 2025 Al Husnain Motors. All rights reserved.</p>
          <p className="font-mono tracking-wider">
            KSh prices shown. Taxes &amp; registration may apply.
          </p>
        </div>
      </div>
    </footer>
  );
}
