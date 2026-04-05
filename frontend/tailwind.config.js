/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#0F6E56',
          mid: '#1D9E75',
          light: '#E1F5EE',
          soft: '#9FE1CB',
          dark: '#0d5e48',
        },
        amber: {
          DEFAULT: '#BA7517',
          light: '#FAEEDA',
        },
        bg: '#fafaf8',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
