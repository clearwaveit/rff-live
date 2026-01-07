import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      height: {
        '85': '340px',      // md:h-85 - tall images
        '157': '157px',     // h-157 - short images  
        '315': '315px',     // h-315 - medium images
      },
    }
  },
  plugins: []
} satisfies Config
