module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: (theme) => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
      animation: {
        fade: 'fadeIn 1.5s ease-in-out',
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
