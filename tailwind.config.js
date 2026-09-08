/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6D28D9',
          dark: '#5B21B6',
          soft: '#F4EEFF',
          border: '#E4D9FB',
        },
        ink: '#1A1A1A',
        muted: '#78767E',
        line: '#EDEBE7',
        surface: '#F7F6F4',
        success: '#067A57',
        successSoft: '#E6F6F1',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: { xl2: '20px' },
      boxShadow: {
        card: '0 1px 2px rgba(18, 16, 26, 0.04), 0 8px 24px -16px rgba(18, 16, 26, 0.25)',
        sheet: '0 -12px 40px -16px rgba(18, 16, 26, 0.35)',
      },
      maxWidth: { app: '520px' },
      keyframes: {
        slideUp: { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        slideUp: 'slideUp 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        fadeIn: 'fadeIn 160ms ease-out',
      },
    },
  },
  plugins: [],
};
