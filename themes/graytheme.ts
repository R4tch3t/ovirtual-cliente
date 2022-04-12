import { createTheme } from "@nextui-org/react"

// 2. Call `createTheme` and pass your custom values
export const graytheme = createTheme({
  type: "gray",
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primary: '#4ADE7B',
      primaryDark: '$green600',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: '#ff4ecd',
      background: '$gray100'
      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})