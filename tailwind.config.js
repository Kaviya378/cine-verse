/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#8B5CF6',   // Neon Purple
          secondary: '#6366F1', // Indigo Secondary
          accent: '#A78BFA',    // Violet Accent
          dark: '#111827',      // Background Dark Slate
          surface: '#1F2937',   // Surface Slate
          card: '#374151',      // Card Slate
          light: '#F9FAFB',     // Text
          gray: '#F9FAFB',      // Text
          muted: '#D1D5DB',     // Secondary Text
          subtle: '#374151',    // Dividers/Borders
          black: '#0B0F17',     // Darker Accent Background
        }
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
        'cinema': '0 0 20px rgba(139, 92, 246, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
