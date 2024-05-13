/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Nunito"', "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D3B66",
          900: "#D3E2E5",
          800: "#F5F8FA",
        },
        secondary: {
          DEFAULT: "#F15156",
          900: "#E44449",
          800: "#F75F64 ",
          700: "#FC8686",
        },
        tertiary: {
          DEFAULT: "#F4D35E",
        },
        green: {
          DEFAULT: "#3CDC8C",
        },
      },
    },
  },
  plugins: [],
};
