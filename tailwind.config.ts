import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-manrope)", "sans-serif"],
        secondary: ["var(--font-noto-sans-thai)", "sans-serif"],
        paragraph: ["var(--font-satoshi)", "sans-serif"],
      },
      perspective: {
        "1000": "1000px",
      },
      rotate: {
        "20": "20deg",
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        unblur: "unblur 1s ease-out forwards 0.2s",
        unblur2: "unblur 0.65s ease-out forwards",
        unblurWave: "unblurWave 1.5s ease-out forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        unblur: {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0px)", opacity: "1" },
        },
        unblurWave: {
          "0%": {
            filter: "blur(10px)",
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "50%": {
            filter: "blur(5px)",
            opacity: "0.5",
            transform: "translateY(5px)",
          },
          "100%": {
            filter: "blur(0px)",
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 8px)",
      },
    },
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms"),
    require("tailwindcss-animate"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animate-ease": (value: string) => ({
            animationTimingFunction: value,
          }),
        },
        { values: theme("transitionTimingFunction") },
      );
    }),
  ],
};

export default config;
