/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'dark',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'main':'#ff735e',
        'gradient1':'#ff0844',
        'gradient2':'#ffb199',
        'lightGradient1':'#fdfbfb',
        'lightGradient2':'#ebedee',
        'darkGradient1':'#29323c',
        'darkGradient2':'#485563'
      },
      
    }
  },
  plugins: [],
}
