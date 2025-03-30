/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#f6c8fa",
        'topgreen':"#80CBC4",
        'custom-purple':"#eb34de",
        'slots':"#A020F0",
        'buttonblue':"#3480eb"

      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [],
}