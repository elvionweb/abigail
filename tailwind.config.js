/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        romantic: { dark: "#1A0A0F", card: "#2A1218", deeper: "#0D0508" },
        rosegold: "#C9706A",
        coral: "#E8856A",
        burgundy: "#6B0F1A",
        crimson: "#8B1A2A",
        gold: "#D4AF37",
        blush: "#F4A7B9",
        cream: "#FDF6F0",
        offwhite: "#F5EDE8",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        body: ["DM Sans", "sans-serif"],
        cursive: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
