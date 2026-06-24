"use client";
import {useState, useEffect} from "react";

export function useNavScroll() {
  const [variant, setVariant] = useState<
    "transparent" | "translucent" | "solid"
  >("transparent");

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (y > 80) setVariant("solid");
      else if (y > 1) setVariant("translucent");
      else setVariant("transparent");
    };
    window.addEventListener("scroll", handler, {passive: true});
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return variant;
}
