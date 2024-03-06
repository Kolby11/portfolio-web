/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: {
          background: {
            DEFAULT: '#0A0A0A',
          },
          text: {
            DEFAULT: '#edeff2',
          },
          primary: {
            DEFAULT: '#edeff2',
          },
          secondary: {
            DEFAULT: '#9C9A9A',
          },
        },
        light: {
          background: {
            DEFAULT: '#e4e7ed',
          },
          text: {
            DEFAULT: '#0A0A0A',
          },
          primary: {
            DEFAULT: '#0A0A0A',
          },
          secondary: {
            DEFAULT: '#9C9A9A',
          },
        },
      },
    },
  },
  plugins: [],
}
