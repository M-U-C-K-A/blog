// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        alami: ["var(--font-alami)"],
        ciguatera: ["var(--font-ciguatera)"],
        mooxy: ["var(--font-mooxy)"],
        radon: ["var(--font-radon)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
