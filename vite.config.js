import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/chef-claude/', // Use "/" se for apenas para Vercel
  plugins: [react()],
});