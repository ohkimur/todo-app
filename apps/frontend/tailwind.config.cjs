/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-grey': '#f6f7f8',
        'cool-grey-two': '#a1a4ad',
        'cool-grey': '#9ea3b2',
        'dark-blue-grey': '#1f2a4b',
        'dark-sky-blue': '#4a77e5',
        'off-white': '#e1e1e1',
        silver: '#d7dae0',
      },
      fontFamily: {
        sans: ['MarkPro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
