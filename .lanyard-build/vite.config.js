import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    outDir: '../demos/lanyard',
    emptyOutDir: true,
    // 内联体积阈值设小，glb 等资源走文件、便于缓存
    assetsInlineLimit: 0
  }
});
