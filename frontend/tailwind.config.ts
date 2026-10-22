import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        manikstu: {
          green: "#174B32", // Forest Green — covers, headings, section bands, key data
          red: "#D4342C",
          leaf: "#174B32", // Forest Green (was Leaf Green #78A65A) — agricultural line art and supporting charts
          cream: "#F8F6EE", // Heritage Ivory — branded interiors and light backgrounds
          gold: "#DCA72B", // Harvest Gold — small accents, section numbers, key statistics
          brown: "#6B4423",
          sage: "#EAF0E6", // Soft Sage — cards, alternate table fills and subtle panels
        },
        saura: {
          red: "#9F5233",
          white: "#F5F0E8",
        },
        charcoal: "#26352E", // Charcoal — primary body text
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
