/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'mb': '530px',
      // => @media (min-width: 576px) { ... }
      'tb': '690px',
      // => @media (min-width: 576px) { ... }
      'sm': '960px',
      // => @media (min-width: 576px) { ... }

      'md': '1200px',
      // => @media (min-width: 1200px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  
  plugins: [],
}
