/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        slack : ['Slackey'," cursive"],
       },
       animation: {
        blob: "blob 4s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: " translate(0px , 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px , -50px) scale(1.4)",
          },
          "66%": {
            transform: " translate(-20px , 20px) scale(0.7)",
          },
          "100%": {
            transform: " translate(0px , 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
