/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your custom semantic colors
        primary: '#818cf8',       // indigo-400 (matches your gradient)
        secondary: '#c084fc',     // purple-400 (matches your gradient)
        accent: '#f472b6',        // pink-400 (matches your gradient)
        background: '#09090b',    // zinc-950
        surface: '#18181b',       // zinc-900
        muted: '#71717a',         // zinc-500
        'text-primary': '#f4f4f5', // zinc-100 (lighter for better contrast)
        
        // Additional colors from your Hero component
        'text-secondary': '#a1a1aa', // zinc-400 (for subtitles)
        'text-tertiary': '#71717a',  // zinc-500 (for descriptions)
        
        // Extended zinc palette for flexibility
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        }
      },
      // Gradient configuration for easy reuse
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #818cf8, #c084fc, #f472b6)',
      },
    },
  },
  plugins: [],
}