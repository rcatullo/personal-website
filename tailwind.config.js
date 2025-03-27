/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    linearBorderGradients: {
      colors: {
        'brown-platinum': ['#a97125', '#ca9f55', '#e6e5df']
      }
    },
    extend: {
      colors: {
        'dirty-brown': '#a97125',
        'aztec-gold': '#ca9f55',
        'platinum': '#e6e5df'
      }
    },
  },
  variants: {
    linearBorderGradients: [],
  },
  plugins: [
    require('tailwindcss-border-gradients')(),
    function({ addComponents }) {
      addComponents({
        '.katex .base': {
          'background': 'linear-gradient(to right, #a97125, #ca9f55, #e6e5df)',
          'background-clip': 'text'
        }
      })
    }
  ],
}

