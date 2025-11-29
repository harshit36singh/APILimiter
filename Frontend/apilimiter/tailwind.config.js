/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#D4FF00", // that glowing yellow
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"], // or any bold font
      },
    },
  },
  plugins: [],
};

