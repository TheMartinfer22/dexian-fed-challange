/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dexian-purple': 'rgba(184,155,224,0.52)',
        'dexian-purple2': '#d6cbe7',
        'dexian-purple3': '#9650ff',
        'dexian-purple-light': '#efe6fb',
        'dexian-yellow': '#d3fd00',
        'dexian-pink': '#f7d7c4',
      }
    },
  },
  plugins: [],
}
