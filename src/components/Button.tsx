"use client";

import React, {useRef} from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  type HTMLMotionProps,
} from "framer-motion";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const EASING = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.55;

const SIZE_MAP: Record<ButtonSize, {height: string; px: string; text: string}> =
  {
    sm: {height: "40px", px: "20px", text: "0.8125rem"},
    md: {height: "48px", px: "28px", text: "0.875rem"},
    lg: {height: "56px", px: "36px", text: "0.9375rem"},
  };

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

type TokenSet = {
  bg: string;
  fg: string;
  border: string;
  hoverBg: string;
  hoverFg: string;
  shadow: string;
  focusRing: string;
};

const TOKENS: Record<string, TokenSet> = {
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
  // fallback – uses primary tokens
  fallback: {
    bg: "#000000",
    fg: "#FFFFFF",
    border: "1px solid #000000",
    hoverBg: "#FFFFFF",
    hoverFg: "#000000",
    shadow: "0 2px 12px rgba(0,0,0,0.18)",
    focusRing: "0 0 0 2px #fff, 0 0 0 4px #000",
  },
};

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

    // fallback to primary if unknown variant
    const tokenKey = TOKENS[variant] ? variant : "fallback";
    const t = TOKENS[tokenKey];

    const disabledBg = "#BCBEC0";
    const disabledFg = "#666666";
    const disabledBorder = "1px solid transparent";

    const containerStyle: React.CSSProperties = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height,
      width: fullWidth ? "100%" : undefined,
      padding: `0 ${px}`,
      borderRadius: 12,
      border: isDisabled ? disabledBorder : t.border,
      background: isDisabled ? disabledBg : t.bg,
      color: isDisabled ? disabledFg : t.fg,
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
                <Spinner color={isDisabled ? disabledFg : t.fg} />
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
              <Spinner color={isDisabled ? disabledFg : t.fg} />
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
