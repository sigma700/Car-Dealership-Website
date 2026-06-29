"use client";
import {useEffect, useRef, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({onComplete}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // ── Simulate loading progress ────────────────────────────
  useEffect(() => {
    if (prefersReduced) {
      setTimeout(() => onComplete(), 400);
      return;
    }

    // Phase 1: quick start (0 → 30)
    const phase1 = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 30) {
            clearInterval(interval);
            return 30;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 0);

    // Phase 2: middle chunk (30 → 85)
    const phase2 = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            clearInterval(interval);
            return 85;
          }
          return prev + 1;
        });
      }, 45);
      return () => clearInterval(interval);
    }, 600);

    // Phase 3: finish (85 → 100) then trigger exit
    const phase3 = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsExiting(true), 200);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 1400);

    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(phase3);
    };
  }, [prefersReduced, onComplete]);

  // ── Exit animation ──────────────────────────────────────
  useEffect(() => {
    if (!isExiting || prefersReduced) return;
    const exitTimer = setTimeout(onComplete, 900);
    return () => clearTimeout(exitTimer);
  }, [isExiting, prefersReduced, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          ref={containerRef}
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          initial={{opacity: 1}}
          exit={{y: "-100%", opacity: 0}}
          transition={{duration: 0.8, ease: [0.87, 0, 0.13, 1]}}
        >
          {/* Logo */}
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
            transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
          >
            <img
              src="https://res.cloudinary.com/dnadawobi/image/upload/v1782515261/Al-ahsan_Logo_bcs077.png"
              alt="Al Husnain"
              className="h-12 w-auto"
            />
          </motion.div>

          {/* Progress bar */}
          <div className="relative mt-10 w-72 md:w-80 h-px bg-[#BCBEC0]/20 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-[#BCBEC0] origin-left"
              initial={{scaleX: 0}}
              animate={{scaleX: progress / 100}}
              transition={{duration: 0.2, ease: "linear"}}
            />
          </div>

          {/* Percentage */}
          <motion.span
            className="mt-4 font-mono text-xs text-[#BCBEC0]/50 tabular-nums"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.2, duration: 0.4}}
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
