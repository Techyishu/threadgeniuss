import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
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
        cyber: {
          dark: "#0A0F1E",
          darker: "#070B14",
          blue: "#33C3F0",
          purple: "#8B5CF6",
          pink: "#D946EF",
          neon: {
            blue: "#0EA5E9",
            purple: "#7E69AB",
            pink: "#EC4899"
          }
        },
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
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        neonPulse: {
          "0%, 100%": {
            textShadow: "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #33C3F0, 0 0 80px #33C3F0, 0 0 90px #33C3F0, 0 0 100px #33C3F0, 0 0 150px #33C3F0"
          },
          "50%": {
            textShadow: "0 0 4px #fff, 0 0 10px #fff, 0 0 18px #fff, 0 0 38px #33C3F0, 0 0 73px #33C3F0, 0 0 80px #33C3F0, 0 0 94px #33C3F0, 0 0 140px #33C3F0"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        neonPulse: "neonPulse 2.5s infinite",
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #0A0F1E 0%, #33C3F0 100%)",
        "glow-gradient": "linear-gradient(90deg, #8B5CF6 0%, #33C3F0 100%)",
        "neon-grid": "linear-gradient(transparent 0%, #33C3F0 2%, transparent 2.5%), linear-gradient(90deg, transparent 0%, #33C3F0 2%, transparent 2.5%)",
      },
      boxShadow: {
        neon: "0 0 5px theme('colors.cyber.blue'), 0 0 20px theme('colors.cyber.blue')",
        "neon-strong": "0 0 5px theme('colors.cyber.blue'), 0 0 20px theme('colors.cyber.blue'), 0 0 40px theme('colors.cyber.blue')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;