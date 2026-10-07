/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f7f9',
          100: '#d6eef3',
          200: '#c4dfe6',
          600: '#388697',
          800: '#2c444e',
        }
      }
    },
  },
  plugins: [],
}