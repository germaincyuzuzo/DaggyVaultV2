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
          50: '#fff0f0',
          100: '#ffdede',
          200: '#ffbdbd',
          300: '#ff8c8c',
          400: '#ff5252',
          500: '#ff2020',
          600: '#e10600',
          700: '#c20000',
          800: '#a10000',
          900: '#870000',
        },
      },
    },
  },
  plugins: [],
}
