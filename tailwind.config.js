/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#001847', // Custom blue color from Figma
        'gradient': '#0667FD' // The gradient color on the login screen is a combination of custom-blue and this color
      },
    },
  },
  plugins: [],
};
