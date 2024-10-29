import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        dmSerifDisplay: ["DM Serif Display", "serif"],
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      backgroundImage: {
        'corper-bg': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/corperBg.png')"
      },
      
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        70: '70%',
        80: '80%',
        90: '90%',
        100: '100%',

      },
    },
  },
  plugins: [],
});
