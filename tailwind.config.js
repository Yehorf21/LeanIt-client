/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/modules/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-primary': '#030409',
        'text-secondary': '#2A2A2A',
        primary: '#1D2A57',
        secondary: '#FDF00E',
        'additional': '#C8ACFD',
        'additional-light': '#EEE6FE',
      },
      fontFamily: {
        main: ['DM Sans', 'sans-serif'],
        secondary: ['Paytone One', 'sans-serif'],
      },
      fontSize: {
        '180': '180px',
        '130': '130px',
        '80': '80px',
        '64': '64px',
        '48': '48px',
        '38': '38px',
        '32': '32px',
        '28': '28px',
        '24': '24px',
        '22': '22px',
        '20': '20px',
        '16': '16px',
        '14': '14px',
      },
      backgroundImage: {
        'header-left': `url('/images/header-left.png')`,
        'header-right': `url('/images/header-right.png')`,
        'what-we-do': `url('/images/what-we-do.png')`,
        'what-we-are': `url('/images/what-we-are.png')`,
        'logo': `url('/icons/logo.svg')`,
        'search': `url('/icons/search.svg')`,
        'menu': `url('/icons/menu.svg')`,
      },
      screens: {
        'desktop': '1440px',
        'huge': '1441px',
        xl: '1260px',
      }
    },
  },
  plugins: [],
}

