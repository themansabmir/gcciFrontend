/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "#f9f9f9",
        cardBg: "#ffffff",
        sidebar: "#253042",

        sidebarHover:"",
        font: "#25C935",
        secondaryFont: "#080c0d",
        fields: "#374151",

        text: "#080c0d",
        background: "#f9fbfb",

        secondary: "#dfd9c8",
        accent: "#8a5160",
        primary: "#25C935",
      },
    },
  },
  plugins: [],
}
);