/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light': {
          'primary': '#f9fafe',
          'secondary': '#ffffff',
          'text': '#000000', 
          'text-accent': '#5800ff',
          'text-button': '#f9fafe'
        },
        'dark': {
          'primary': '#101A36',
          'secondary': '#1E2A47',
          'text': '#72ffff',
          'text-accent': '#8136f0',
          'text-button': '#f9fafe',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

