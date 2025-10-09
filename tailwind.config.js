/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: "_",
  theme: {
    colors: {
      adminSuperGray: "#777777",
      adminDarkGray: "#ACACAC",
      adminGray: "#e0e0e0",
      adminBlue: "#1432FF",
      adminRed: "#E84B57",
    },
    extend: {},
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}

