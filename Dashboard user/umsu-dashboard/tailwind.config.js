/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E1F5EE',
          100: '#9FE1CB',
          200: '#5DCAA5',
          300: '#1D9E75',
          400: '#0F6E56',
          500: '#0d5e48',
          600: '#0a4e3c',
          700: '#083d2f',
        },
        amber: {
          50: '#FAEEDA',
          100: '#FAC775',
          400: '#BA7517',
          600: '#854F0B',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease both',
        'slide-up': 'slideUp 0.4s ease both',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
