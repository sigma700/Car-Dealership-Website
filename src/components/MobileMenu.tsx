"use client";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";
import {useEffect, useRef} from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  models: {name: string; slug: string}[];
}

export default function MobileMenu({open, onClose, models}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Focus trap basic
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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="fixed inset-0 z-40 bg-black/70"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            ref={menuRef}
            initial={{x: "100%"}}
            animate={{x: 0}}
            exit={{x: "100%"}}
            transition={{duration: 0.35, ease: [0.19, 1, 0.22, 1]}}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-void p-8 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <button
              onClick={onClose}
              className="self-end text-platinum hover:text-silver mb-8"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Accordion for Models */}
            <details className="mb-4">
              <summary className="text-md font-display text-silver cursor-pointer pb-2">
                Models
              </summary>
              <div className="ml-4 mt-2 space-y-2">
                {models.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/models/${m.slug}`}
                    onClick={onClose}
                    className="block text-sm text-platinum hover:text-gold transition-colors"
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
            </details>

            <Link
              href="/bespoke"
              onClick={onClose}
              className="text-md font-display text-silver mb-4"
            >
              Bespoke
            </Link>
            <Link
              href="/ownership"
              onClick={onClose}
              className="text-md font-display text-silver mb-4"
            >
              Ownership
            </Link>
            <Link
              href="/dealers"
              onClick={onClose}
              className="text-md font-display text-silver mb-4"
            >
              Dealers
            </Link>
            <div className="mt-auto">
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full text-center py-3 bg-gold text-black rounded-full font-body tracking-wide"
              >
                Book Test Drive
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
