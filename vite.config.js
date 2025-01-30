import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Chef-Claude/', // Nome do seu repositório GitHub
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})