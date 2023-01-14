/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins", "sans-serif"]
      }
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "100-2": "100% 2px"
    }
  },
  plugins: []
};
