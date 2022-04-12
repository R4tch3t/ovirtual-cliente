const colors = require('tailwindcss/colors');
//import colors from "tailwindcss/colors"
const tailwindConfig = {
  content: [
    //"./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./subPages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
        uagrojo: '#a32431'
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),
  require('@tailwindcss/line-clamp')],
}

module.exports = tailwindConfig
