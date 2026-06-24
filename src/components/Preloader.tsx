"use client";
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({onComplete}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setTimeout(() => onComplete(), 400);
      return;
    }

    // Simulate asset loading (replace with real asset listeners)
    const tl = gsap.timeline();
    tl.to(
      {val: 0},
      {
        val: 30,
        duration: 0.6,
        ease: "power2.in",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      },
    );

    const loadTl = gsap.timeline({delay: 0.6});
    loadTl.to(
      {val: 30},
      {
        val: 85,
        duration: 0.8,
        ease: "power2.in",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      },
    );
    loadTl.to(
      {val: 85},
      {
        val: 100,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
        onComplete: () => setTimeout(() => setIsExiting(true), 200),
      },
    );

    return () => {
      tl.kill();
      loadTl.kill();
    };
  }, [prefersReduced, onComplete]);

  useEffect(() => {
    if (!isExiting || prefersReduced) return;
    const tl = gsap.timeline({onComplete});
    tl.to(wordmarkRef.current, {
      y: -24,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    })
      .to(
        barRef.current,
        {scaleX: 0, transformOrigin: "right", duration: 0.4, ease: "power2.in"},
        "<0.1",
      )
      .to(
        containerRef.current,
        {yPercent: -100, duration: 0.8, ease: "power4.inOut"},
        "-=0.15",
      );

    return () => tl.kill();
  }, [isExiting, prefersReduced, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={wordmarkRef}
        className="text-2xl font-display tracking-[0.25em] text-gold uppercase"
      >
        AUTOPEDIA
      </div>
      <div className="relative mt-8 w-80 h-px bg-smoke overflow-hidden">
        <div
          ref={barRef}
          className="absolute inset-0 bg-gold origin-left"
          style={{transform: `scaleX(${progress / 100})`}}
        />
      </div>
      <span className="mt-3 font-mono text-xs text-platinum/50 tabular-nums">
        {progress}%
      </span>
    </div>
  );
}
