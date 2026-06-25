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
    <footer className="border-t border-smoke/20 bg-obsidian">
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block font-display text-xl tracking-widest text-gold hover:text-gold/80 transition-colors mb-4"
            >
              AL HUSNAIN
            </Link>
            <p className="text-sm text-platinum/50 leading-relaxed mt-3 max-w-xs">
              Curated luxury automobiles for the discerning driver. Experience
              performance, craftsmanship, and service beyond compare.
            </p>
            <div className="flex gap-4 mt-6">
              {["Instagram", "LinkedIn", "YouTube"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-xs text-platinum/40 hover:text-gold transition-colors tracking-wider uppercase"
                  aria-label={`Follow us on ${platform}`}
                >
                  {platform.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Models */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-silver/80 mb-4 uppercase">
              Models
            </h4>
            <ul className="space-y-2.5">
              {models.map((model) => (
                <li key={model.slug}>
                  <Link
                    href={`/models/${model.slug}`}
                    className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                  >
                    {model.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/models"
                  className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                >
                  All Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Bespoke */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-silver/80 mb-4 uppercase">
              Bespoke
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/bespoke"
                  className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                >
                  Bespoke Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Ownership */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-silver/80 mb-4 uppercase">
              Ownership
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/ownership#concierge"
                  className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                >
                  Concierge
                </Link>
              </li>
              <li>
                <Link
                  href="/ownership#maintenance"
                  className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                >
                  Maintenance
                </Link>
              </li>
              <li>
                <Link
                  href="/ownership#track"
                  className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                >
                  Track Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/ownership"
                  className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                >
                  All Ownership
                </Link>
              </li>
            </ul>
          </div>

          {/* Dealers */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-silver/80 mb-4 uppercase">
              Dealers
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/dealers"
                  className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                >
                  Find a Dealer
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-silver/80 mb-4 uppercase">
              About
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Legal */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-silver/80 mb-4 uppercase">
              Contact
            </h4>
            <ul className="space-y-2.5 mb-6">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
                >
                  Get in Touch
                </Link>
              </li>
            </ul>
            <h4 className="text-xs font-semibold tracking-widest text-silver/80 mb-4 uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-platinum/50 hover:text-gold transition-colors duration-300"
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
      <div className="border-t border-smoke/10">
        <div className="max-w-[1440px] mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-platinum/40">
          <p>© 2025 Al Husnain Group. All rights reserved.</p>
          <p className="font-mono tracking-wider">
            AED prices shown. Taxes &amp; registration may apply.
          </p>
        </div>
      </div>
    </footer>
  );
}
