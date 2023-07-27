/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "#f9fafd",
        cardBg: "#ffffff",
        sidebar: "#181818",
       
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
};
