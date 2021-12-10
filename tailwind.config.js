const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/domain/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          main: '#142135',
          light: '#2c3749',
          dark: '#121e30',
        },
      },
      minWidth: {
        unset: 'unset',
        '1/4': '25%',
        300: '300px',
        480: '480px',
      },
      maxWidth: {
        300: '300px',
      },
      flex: {
        2: '2 2 0%',
      },
      screens: {
        xs: '425px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
