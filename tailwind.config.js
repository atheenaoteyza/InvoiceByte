/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#ffffff",
          text: "#000000",
        },
        dark: {
          bg: "#1e2139",
          text: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
