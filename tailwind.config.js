/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "440px",
      md: "680px",
      lg: "786px",
      xl: "928px",
      "2xl": "1440px",
    },
  },
  plugins: [],
};
