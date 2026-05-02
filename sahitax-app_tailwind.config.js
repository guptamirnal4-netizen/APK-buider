/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#0F766E",
          soft: "#CCFBF1",
          dark: "#0d5d56",
        },
        ink: "#0A0A0A",
        body: "#1F2937",
        muted: "#6B7280",
        warn: "#B91C1C",
        bgsoft: "#FAFAFA",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
