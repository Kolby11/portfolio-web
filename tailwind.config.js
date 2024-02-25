/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: {
          background: {
            DEFAULT: '#0A0A0A',
          },
          text: {
            DEFAULT: '#FFFFFF',
          },
          primary: {
            DEFAULT: '#FFFFFF',
          },
          secondary: {
            DEFAULT: '#9C9A9A',
          },
        },
        light: {
          background: {
            DEFAULT: '#FFFFFF',
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
