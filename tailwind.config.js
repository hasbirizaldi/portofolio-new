export default {
  darkMode: "class", // penting!
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        ku: "0 4px 25px rgba(172, 107, 52, 0.2)",
        dark: "3px 3px 8px #ffffff60",
      },
    },
  },
  plugins: [],
};
