/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Based on the existing website's green colors
        primary: "#01793f",
        secondary: "#4caf50",
        accent: "#8bc34a",
      },
    },
  },
  plugins: [],
}
