import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        primary: '#ffffff',
        secondary: '#fff7ed',
        text: '#000000',
      },
      fontFamily: {
        arvo: ['var(--font-arvo)'],
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
};
export default config;
