/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FCE9E7',
          100: '#F8D3CF',
          200: '#F1A8A0',
          300: '#E97D71',
          400: '#E25243',
          500: '#C75146', // Main primary color
          600: '#A13F37',
          700: '#7C2E29',
          800: '#571F1A',
          900: '#32110E',
        },
        secondary: {
          50: '#EFEDF5',
          100: '#DEDCEB',
          200: '#BDB9D7',
          300: '#9C96C3',
          400: '#7C73AF',
          500: '#6B5B95', // Main secondary color
          600: '#554978',
          700: '#40375A',
          800: '#2A243D',
          900: '#15121F',
        },
        accent: {
          50: '#FDF6E3',
          100: '#FCEDC7',
          200: '#F9DC8F',
          300: '#F5CA57',
          400: '#E9B44C', // Main accent color
          500: '#D69C30',
          600: '#AD7D26',
          700: '#845E1D',
          800: '#5B3F13',
          900: '#32200A',
        },
        success: {
          500: '#10B981', // Main success color
        },
        warning: {
          500: '#F59E0B', // Main warning color 
        },
        error: {
          500: '#EF4444', // Main error color
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}