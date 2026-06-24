export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  outExpo: [0.19, 1, 0.22, 1] as const,
  inOut: [0.87, 0, 0.13, 1] as const,
} as const;

export const DUR = {
  instant: 0.08,
  fast: 0.18,
  normal: 0.35,
  slow: 0.6,
  xslow: 1.0,
  hero: 2.4,
} as const;

export const STAGGER = {
  tight: 0.04,
  normal: 0.08,
  loose: 0.14,
} as const;
