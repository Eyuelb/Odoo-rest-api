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
      'xl': '1920px'
      // => @media (min-width: 1920px) { ... }
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }

  },
  
  plugins: [],
}
