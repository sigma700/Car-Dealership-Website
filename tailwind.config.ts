import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0B",
        void: "#111114",
        graphite: "#1C1C21",
        smoke: "#2A2A31",
        platinum: "#C8CAD0",
        silver: "#E8E9EC",
        chrome: "#F0F1F3",
        gold: {
          DEFAULT: "#B8955A",
          dim: "#7A6038",
          glow: "rgba(184,149,90,0.15)",
        },
        error: "#C0392B",
        success: "#27AE60",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: ["0.64rem", {lineHeight: "1.2"}],
        sm: ["0.8rem", {lineHeight: "1.2"}],
        base: ["1rem", {lineHeight: "1.65"}],
        md: ["1.25rem", {lineHeight: "1.65"}],
        lg: ["1.563rem", {lineHeight: "1.1"}],
        xl: ["1.953rem", {lineHeight: "1.1"}],
        "2xl": ["2.441rem", {lineHeight: "1.1"}],
        "3xl": ["3.052rem", {lineHeight: "0.92"}],
        "4xl": ["4.768rem", {lineHeight: "0.92"}],
        "5xl": ["7.451rem", {lineHeight: "0.92"}],
      },
      letterSpacing: {
        tight: "-0.02em",
        normal: "0em",
        wide: "0.08em",
        wider: "0.15em",
        widest: "0.25em",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      transitionDuration: {
        fast: "200ms",
        normal: "400ms",
        slow: "600ms",
        xslow: "1000ms",
        hero: "2400ms",
      },
    },
  },
  plugins: [],
};
export default config;
