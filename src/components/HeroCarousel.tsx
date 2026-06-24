"use client";
import {useState, useEffect, useRef, useCallback} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";

interface HeroCarouselProps {
  images: string[];
}

export default function HeroCarousel({images}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (prefersReduced || isPaused) return;
    timerRef.current = setInterval(advance, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance, isPaused, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className="absolute inset-0 -z-10">
        <img
          src={images[0]}
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 -z-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 1.2, ease: "easeInOut"}}
        />
      </AnimatePresence>
    </div>
  );
}
