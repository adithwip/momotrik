const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/domain/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '425px',
      ...defaultTheme.screens
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
