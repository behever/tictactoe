/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'retro': ['Courier New', 'monospace'],
      },
      colors: {
        'neon-pink': '#FF10F0',
        'neon-blue': '#00FFF0',
        'neon-yellow': '#FFFF00',
        'neon-green': '#39FF14',
        'retro-purple': '#8B00FF',
        'retro-bg': '#0F0F23',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        retro80s: {
          "primary": "#FF10F0",
          "secondary": "#00FFF0",
          "accent": "#FFFF00",
          "neutral": "#1a1a2e",
          "base-100": "#0F0F23",
          "info": "#00FFF0",
          "success": "#39FF14",
          "warning": "#FFFF00",
          "error": "#FF1744",
        },
      },
    ],
  },
}