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
          dark: '#0F172A', // Adjusted for better contrast
          light: '#1E293B',
          accent: '#6366F1',
          highlight: '#818CF8',
          text: '#F1F5F9',
          // Light mode colors
          lightBg: '#F8FAFC',
          lightText: '#1E293B',
          lightAccent: '#F1F5F9',
          lightHover: '#E2E8F0',
          lightBorder: '#CBD5E1'
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(99, 102, 241, 0.3))' },
          '50%': { filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.6))' },
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}