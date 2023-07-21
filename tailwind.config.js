/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      monoton: ["monoton", "sans-serif"],
      quicksand: ["quicksand", "sans-serif"],
    },
    screens: {
      sm: "440px",
      md: "568px",
      lg: "768px",
      xl: "929px",
      "2xl": "1440px",
    },
  },

  plugins: [],
};
