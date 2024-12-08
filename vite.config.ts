import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist', // 빌드 결과물이 dist 폴더에 생성됩니다.
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
