const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/domain/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', ...defaultTheme.fontFamily.sans]
      },
      minWidth: {
        'unset': 'unset',
        '1/4': '25%',
        '300': '300px',
        '480': '480px'
      },
      maxWidth: {
        '300': '300px'
      },
      flex: {
        '2': '2 2 0%'
      },
      screens: {
        'xs': '425px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
