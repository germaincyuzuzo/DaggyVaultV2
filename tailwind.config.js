/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f6f5f8',
          100: '#ece9f1',
          200: '#d2c9de',
          300: '#b4a4c7',
          400: '#8d6da4',
          500: '#6e4c89',
          600: '#5b3a72',
          700: '#4b315e',
          800: '#3f2b4f',
          900: '#362645',
        },
      },
    },
  },
  plugins: [],
}
