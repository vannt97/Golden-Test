/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      // screens: {
      //   DEFAULT: "100%",
      // },
    },
    extend: {
      colors: {
        "header-color": "#ff9900",
        "main-color": "#fff0c3",
        "main-text-color": "#cc7b24",
        "blue-color": "#296bff",
        "text-color-gradient": "",
        "yellow-dark-color": "#cc7b24",
        "yellow-dark-color-2": "#ff7900",
        "form-color": "#fce191",
        "border-input-color": "#fcad35",
        "brown-color": "#926613",
        "blue-color-1": "#1883c6",
        "red-color": "#f25300",
        "orange-color": "#fc950c",
        "orange-dark-color": "#fe7200",
        "organe-gradient-color": "#fbd26e",
      },
      zIndex: {
        1: "1",
      },
    },
  },
  plugins: [],
};
