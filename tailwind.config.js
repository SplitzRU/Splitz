/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#1a1a1a',
          100: '#2d2d2d',
          200: '#404040',
          300: '#525252',
          400: '#666666',
          500: '#808080',
          600: '#999999',
          700: '#b3b3b3',
          800: '#cccccc',
          900: '#e6e6e6',
        },
        accent: {
          50: '#ffe8f5',
          100: '#ffd1eb',
          200: '#ffa3d7',
          300: '#ff75c3',
          400: '#ff47af',
          500: '#ff1a9b',
          600: '#ec0087',
          700: '#c70073',
          800: '#a1005e',
          900: '#7c0049',
        },
      },
    },
  },
  plugins: [],
}

