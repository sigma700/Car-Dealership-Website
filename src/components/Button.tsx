"use client";

import React, {useRef} from "react";
import {motion, useReducedMotion, AnimatePresence} from "framer-motion";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

// ─────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────

const EASING = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.55;

const SIZE_MAP: Record<ButtonSize, {height: string; px: string; text: string}> =
  {
    sm: {height: "40px", px: "20px", text: "0.8125rem"},
    md: {height: "48px", px: "28px", text: "0.875rem"},
    lg: {height: "56px", px: "36px", text: "0.9375rem"},
  };

// ─────────────────────────────────────────────────────────
// Spinner
// ─────────────────────────────────────────────────────────

const Spinner: React.FC<{color: string}> = ({color}) => (
  <motion.span
    aria-hidden
    style={{
      display: "block",
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: `1.5px solid transparent`,
      borderTopColor: color,
      borderRightColor: color,
    }}
    animate={{rotate: 360}}
    transition={{repeat: Infinity, duration: 0.9, ease: "linear"}}
  />
);

// ─────────────────────────────────────────────────────────
// Button
// ─────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled = false,
      style,
      ...rest
    },
    ref,
  ) => {
    const prefersReduced = useReducedMotion();
    const isDisabled = disabled || loading;

    const {height, px, text} = SIZE_MAP[size];

    // ── Per-variant design tokens ──────────────────────────

    type TokenSet = {
      bg: string;
      fg: string;
      border: string;
      hoverBg: string; // fill color that sweeps in
      hoverFg: string; // text color after fill
      shadow: string;
      focusRing: string;
    };

    const tokens: Record<ButtonVariant, TokenSet> = {
      primary: {
        bg: "#000000",
        fg: "#FFFFFF",
        border: "1px solid #000000",
        hoverBg: "#FFFFFF",
        hoverFg: "#000000",
        shadow: "0 2px 12px rgba(0,0,0,0.18)",
        focusRing: "0 0 0 2px #fff, 0 0 0 4px #000",
      },
      secondary: {
        bg: "#FFFFFF",
        fg: "#000000",
        border: "1px solid #BCBEC0",
        hoverBg: "#000000",
        hoverFg: "#FFFFFF",
        shadow: "0 2px 8px rgba(0,0,0,0.08)",
        focusRing: "0 0 0 2px #000, 0 0 0 4px #BCBEC0",
      },
      outline: {
        bg: "transparent",
        fg: "#000000",
        border: "1px solid #000000",
        hoverBg: "#000000",
        hoverFg: "#FFFFFF",
        shadow: "none",
        focusRing: "0 0 0 2px #fff, 0 0 0 4px #000",
      },
      ghost: {
        bg: "transparent",
        fg: "#000000",
        border: "1px solid transparent",
        hoverBg: "#000000",
        hoverFg: "#FFFFFF",
        shadow: "none",
        focusRing: "0 0 0 2px #fff, 0 0 0 4px #BCBEC0",
      },
    };

    const t = tokens[variant];

    // ── Shared container styles ────────────────────────────

    const containerStyle: React.CSSProperties = {
      position: "relative",
      display: isDisabled ? "inline-flex" : "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height,
      width: fullWidth ? "100%" : undefined,
      padding: `0 ${px}`,
      borderRadius: 12,
      border: isDisabled ? "1px solid transparent" : t.border,
      background: isDisabled ? "#BCBEC0" : t.bg,
      color: isDisabled ? "#666666" : t.fg,
      fontSize: text,
      fontWeight: 500,
      letterSpacing: "0.02em",
      lineHeight: 1,
      cursor: isDisabled ? "not-allowed" : "pointer",
      overflow: "hidden",
      userSelect: "none",
      boxShadow: isDisabled ? "none" : t.shadow,
      outline: "none",
      WebkitTapHighlightColor: "transparent",
      ...style,
    };

    // ── Reduced-motion path ────────────────────────────────
    // Simple color crossfade, no clip-path morph.

    if (prefersReduced) {
      return (
        <motion.button
          ref={ref}
          disabled={isDisabled}
          whileTap={isDisabled ? undefined : {scale: 0.97}}
          transition={{type: "spring", stiffness: 400, damping: 30}}
          whileFocus={{boxShadow: t.focusRing}}
          whileHover={
            isDisabled
              ? undefined
              : {
                  background: t.hoverBg,
                  color: t.hoverFg,
                  transition: {duration: 0.2},
                }
          }
          style={containerStyle}
          aria-busy={loading}
          aria-disabled={isDisabled}
          {...rest}
        >
          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <motion.span
                key="spinner"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.15}}
                style={{display: "flex"}}
              >
                <Spinner color={t.fg} />
              </motion.span>
            ) : (
              <motion.span
                key="label"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.15}}
              >
                {children}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      );
    }

    // ── Full animation path ────────────────────────────────
    // Technique: A fill layer expands via scaleX from left.
    // Two text layers are stacked — one clipped to the unexpanded
    // region (original fg), one clipped to the expanded fill (hover fg).
    // clip-path on the text mirrors the fill layer in real time via
    // CSS custom property driven by a Framer Motion motion value,
    // keeping both perfectly synchronised without JS-per-frame reads.
    //
    // We use CSS @keyframes injected once into the document for the
    // clip-path mirror approach, driven by a data-attribute toggle.
    // This is the most GPU-friendly path available in React without
    // a canvas/WebGL solution.

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        whileTap={isDisabled ? undefined : {scale: 0.97}}
        transition={{type: "spring", stiffness: 380, damping: 28}}
        whileFocus={{boxShadow: t.focusRing}}
        style={containerStyle}
        aria-busy={loading}
        aria-disabled={isDisabled}
        initial="idle"
        whileHover={isDisabled ? undefined : "hovered"}
        {...rest}
      >
        {/* ── Fill layer that morphs in from left ── */}
        {!isDisabled && (
          <motion.span
            aria-hidden
            variants={{
              idle: {scaleX: 0, originX: 0},
              hovered: {
                scaleX: 1,
                originX: 0,
                transition: {duration: DURATION, ease: EASING},
              },
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: t.hoverBg,
              borderRadius: "inherit",
              transformOrigin: "left center",
              pointerEvents: "none",
            }}
          />
        )}

        {/* ── Label / spinner ── */}
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.span
              key="spinner"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.18}}
              style={{
                display: "flex",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Spinner color={isDisabled ? "#666666" : t.fg} />
            </motion.span>
          ) : (
            <motion.span
              key="label"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.18}}
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
              }}
            >
              {/*
               * Text color crossover:
               * The base text sits above the fill layer (z:1) in the
               * original fg color. As the white/black fill sweeps in
               * underneath, we simultaneously fade the text toward the
               * hover color. The fill layer's scaleX goes 0→1 over
               * DURATION with the same easing, so both arrive together.
               * This is the cleanest cross-browser approach that avoids
               * clip-path on text (which has Safari quirks) while
               * keeping a single React element tree.
               */}
              <motion.span
                variants={{
                  idle: {color: t.fg},
                  hovered: {
                    color: t.hoverFg,
                    transition: {duration: DURATION, ease: EASING},
                  },
                }}
                style={{display: "contents"}}
              >
                {children}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
