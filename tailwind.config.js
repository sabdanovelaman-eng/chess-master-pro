module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chess: {
          light: '#f0d9b5',
          dark: '#b58863',
          primary: '#1e3c72',
          secondary: '#2a5298',
          success: '#4CAF50',
        }
      },
      backgroundImage: {
        'gradient-chess': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      }
    },
  },
  plugins: [],
}