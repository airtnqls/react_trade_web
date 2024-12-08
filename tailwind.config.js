/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 이 부분이 중요합니다.  src 폴더 내 모든 파일을 포함하도록 수정해야 합니다.
  ],
  theme: {
    extend: {
      // ... 기존 설정 ...
    },
  },
  plugins: [],
  corePlugins: {
    // ... 기존 설정 ...
  },
};