/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1766FF',
      },
      fontFamily: {
        helvetica: ['Helvetica Now Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
};