// eslint-disable-next-line @typescript-eslint/no-var-requires
import tailwind_scrollbar_hide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f7931a",
      },
    },
  },
  extend: {},
  plugins: [tailwind_scrollbar_hide],
};
