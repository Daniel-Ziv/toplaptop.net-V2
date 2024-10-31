// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Covers all files in src folder
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}" // Adds NextUI theme path

    
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['ui-sans-serif', 'system-ui'],
      'body': ['ui-sans-serif', 'system-ui'],
    }
  },
  
  plugins: [nextui()],
};