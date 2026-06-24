"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {useRouter} from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string, onAfter?: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({children}: {children: ReactNode}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const startTransition = useCallback(
    (href: string, onAfter?: () => void) => {
      setIsTransitioning(true);
      const overlay = document.getElementById("page-transition-overlay");
      if (overlay) {
        // Animate overlay in, navigate, then animate out
        gsap
          .timeline()
          .set(overlay, {
            scaleY: 0,
            transformOrigin: "bottom",
            display: "block",
          })
          .to(overlay, {scaleY: 1, duration: 0.4, ease: "power3.in"})
          .call(() => {
            router.push(href);
            onAfter?.();
          })
          .to(overlay, {
            yPercent: -100,
            duration: 0.5,
            ease: "power3.inOut",
            delay: 0.1,
          })
          .set(overlay, {display: "none", yPercent: 0})
          .call(() => setIsTransitioning(false));
      } else {
        router.push(href);
        setIsTransitioning(false);
      }
    },
    [router],
  );

  return (
    <TransitionContext.Provider value={{isTransitioning, startTransition}}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}
