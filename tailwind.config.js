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
          primary: '#E50914',   // Cinematic Red
          secondary: '#B20710', // Darker Red
          accent: '#FF3D47',    // Lighter Red Highlight
          dark: '#000000',      // Pure Black Base
          surface: '#141414',   // Surface Black
          card: 'rgba(20, 20, 20, 0.8)', // Card backdrop black
          light: '#FFFFFF',     // Clean White Text
          gray: '#E5E5E5',      // High-contrast Gray
          muted: '#808080',     // Muted Gray
          subtle: '#333333',    // Borders/Dividers
          black: '#050505',     // True Darker Accent
        }
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
        'cinema': '0 0 20px rgba(229, 9, 20, 0.35)',
        'neon-pink': '0 0 20px rgba(229, 9, 20, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'ai-gradient': 'linear-gradient(120deg, #FF3D47 0%, #E50914 50%, #B20710 100%)',
        'ai-radial': 'radial-gradient(circle at center, rgba(229, 9, 20, 0.15) 0%, rgba(178, 7, 16, 0.05) 50%, transparent 100%)',
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
