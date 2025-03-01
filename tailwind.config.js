/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
      colors: {
        border: "hsl(0 0% 30%)",
        input: "hsl(0 0% 15%)",
        background: "hsl(0 0% 0%)",
        foreground: "hsl(0 0% 98%)",
        primary: {
          DEFAULT: "hsl(0 0% 20%)",
          foreground: "hsl(0 0% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 10%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 15%)",
          foreground: "hsl(0 0% 85%)",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}