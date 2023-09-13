import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3rem",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      scale: {
        "101": "1.01",
        "102": "1.02",
        "103": "1.03",
      },
      spacing: {
        "120": "30rem",
        "160": "40rem",
      },
      screens: {
        sx: { min: "0px", max: "549px" },
        sm: { min: "550px", max: "819px" },
        md: { min: "820px", max: "1099px" },
        lg: { min: "1100px", max: "1279px" },
        xl: { min: "1280px" },
      },
      gridAutoColumns: {
        "5fr": "minmax(0, 5fr)",
      },
    },
  },
  plugins: [],
};
export default config;
