/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "#111827",
        cardBg: "#1f2937",
        primary: "#9ca3af",
        font: "#988CFA",
        secondaryFont: "#717FD1",
        fields: "#374151",
      },
    },
  },
  plugins: [],
};
