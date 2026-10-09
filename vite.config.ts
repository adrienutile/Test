import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Site web navigateur : compilation statique pour GitHub Pages, sans PWA.
export default defineConfig({
  base: '/Test/',
  plugins: [react()],
  build: { sourcemap: false, target: 'es2022' }
});
