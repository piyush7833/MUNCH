/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  lightMode:'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing:{
        's':"90vh"
      },
    },
  },
  plugins: [],
}
