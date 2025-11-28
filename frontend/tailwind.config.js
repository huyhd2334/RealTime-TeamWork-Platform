/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(120, 80%, 50%)",
        background: "var(--background)",
        foreground: "var(--foreground)"
      },
      borderRadius: {
        lg: "var(--radius)"
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
};
