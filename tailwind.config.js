/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    fontFamily: {
      display: ['Dancing Script', 'cursive'],
    },
    extend: {
      colors: {
        green: {
          DEFAULT: '#9ACD9F',
          dark: '#7FB985'
        },
      },
    },
  },
  plugins: [],
}
