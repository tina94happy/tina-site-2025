module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "lofi": {
          "purple": "#7c3aed",
          "dark": "#312e81",
          "blue": "#60a5fa",
          "pink": "#f472b6",
          "accent": "#fbbf24",
        }
      },
      fontFamily: {
        poppins: [
          'var(--font-poppins)',
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}; 