import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2B67E8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        manrope: ["var(--font-manrope)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
