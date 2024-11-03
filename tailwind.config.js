// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "var(--primary-color)",
        secondaryColor: "var(--socendary-color)",
      },
      screens: {
        'xs': '390px',    // Extra small devices like small phones
        'sm': '640px',     // Small devices (default in Tailwind)
        'md': '768px',     // Medium devices (default in Tailwind)
        'lg': '1024px',    // Large devices (default in Tailwind)
        'xl': '1280px',    // Extra large devices (default in Tailwind)
        '2xl': '1536px',   // 2x Extra large devices (default in Tailwind)
        '3xl': '1920px',   // 3x Extra large devices (custom)
      },
      backgroundImage: {
        authBG: "url(./assets/loginBG.webp)",
      },
    },
  },
  plugins: [],
};