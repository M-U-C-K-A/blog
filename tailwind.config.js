// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alami: ["var(--font-alami)"],
        ciguatera: ["var(--font-ciguatera)"],
        mooxy: ["var(--font-mooxy)"],
        radon: ["var(--font-radon)"],
      },
    },
  },
  plugins: [],
}
