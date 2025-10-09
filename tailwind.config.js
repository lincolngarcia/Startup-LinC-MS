/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: "_",
  theme: {
    extend: {},
    colors: {
      adminSuperGray: "#777777",
      adminDarkGray: "#ACACAC",
      adminGray: "#e0e0e0",
      adminBlue: "#1432FF",
      adminRed: "#E84B57",
    },
  },
  plugins: [],
}

