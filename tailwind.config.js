/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",  // 필요시 브랜드 색상 추가
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', "sans-serif"],
      }
    },
  },
  plugins: [],
}
