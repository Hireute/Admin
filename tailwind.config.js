// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }




export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        text_purple: "#7F0284",
        text_gray: "#2D2F34",
      },
      backgroundColor: {
        bg_purple: "#7F0284",
      },
         },
  },
  plugins: [],
};
