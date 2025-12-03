import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',  // QUAN TRỌNG: Để base là root cho Netlify
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false
  }
})