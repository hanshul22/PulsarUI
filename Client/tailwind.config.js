export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0B0E18',
          light: '#1A1F35',
          accent: '#6366F1',
          highlight: '#818CF8',
          text: '#E2E8F0',
          // Light mode colors
          lightBg: '#F8FAFC',
          lightText: '#1E293B',
          lightAccent: '#F1F5F9',
          lightHover: '#E2E8F0',
          lightBorder: '#CBD5E1'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}