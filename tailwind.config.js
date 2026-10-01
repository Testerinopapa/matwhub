/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // MATW Custom Brand Tokens
        matw: {
          navy: {
            50: "#f0f4f9",
            100: "#d9e2ef",
            200: "#b3c5df",
            300: "#809fca",
            400: "#4d76b1",
            500: "#275498",
            600: "#1b407a",
            700: "#153362",
            800: "#0c2340", // MATW signature deep navy
            900: "#08182d",
            950: "#040e1b",
          },
          crimson: {
            50: "#fff1f3",
            100: "#ffe4e7",
            200: "#fecdd4",
            300: "#fda4b2",
            400: "#fb7187",
            500: "#f43f5e",
            600: "#e11d48", // MATW campaign crimson / hot pink
            700: "#be123c",
            800: "#9f1239",
            900: "#881337",
          },
          cyan: {
            50: "#f0f9ff",
            100: "#e0f2fe",
            200: "#bae6fd",
            300: "#7dd3fc",
            400: "#38bdf8",
            500: "#0ea5e9", // MATW relief blue
            600: "#0284c7",
            700: "#0369a1",
            800: "#075985",
            900: "#0c4a6e",
          },
          gold: {
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b", // MATW legacy amber/gold
            600: "#d97706",
            700: "#b45309",
            800: "#92400e",
            900: "#78350f",
          },
          emerald: {
            50: "#ecfdf5",
            100: "#d1fae5",
            200: "#a7f3d0",
            300: "#6ee7b7",
            400: "#34d399",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
            800: "#065f46",
            900: "#064e3b",
          },
          sand: {
            50: "#faf9f6",
            100: "#f5f3ee",
            200: "#eae6dd",
            300: "#dbd4c4",
            400: "#c7bba6",
          }
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        "matw-card": "0 1px 3px 0 rgba(12, 35, 64, 0.05), 0 1px 2px -1px rgba(12, 35, 64, 0.05)",
        "matw-elevated": "0 10px 25px -5px rgba(12, 35, 64, 0.08), 0 8px 10px -6px rgba(12, 35, 64, 0.04)",
        "matw-glow": "0 0 20px -3px rgba(225, 29, 72, 0.25)",
      },
    },
  },
  plugins: [],
};
