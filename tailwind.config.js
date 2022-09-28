/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "screen-75": "75vw",
      },
      height: {
        128: "512px",
      },
    },
  },
  plugins: [],
};
