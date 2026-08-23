import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        manikstu: {
          green: "#4A8C3F",
          red: "#D4342C",
          leaf: "#3A7030",
          cream: "#FDF6EC",
          gold: "#C4952A",
          brown: "#6B4423",
        },
        saura: {
          red: "#9F5233",
          white: "#F5F0E8",
        },
        charcoal: "#1A1A1A",
        grey: "#5A5A5A",
        "light-grey": "#E5E5E5",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
