/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#FF385C',
        'airbnb-light-blue': '#00A699',
        'airbnb-dark-blue': '#007A87',
        'airbnb-dark-gray': '#484848',
        'airbnb-light-gray': '#767676',
        'airbnb-yellow': '#FFB400',
        'airbnb-white': '#f5f0f8',
        "dark-purple": "#230046",
        "light-white": "rgba(255,255,255,0.17)",
        "dark": "#141414"
      }
    },
  },
  plugins: [],
};
