import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@locales': path.resolve(__dirname, 'src/locales'),
      '@shadcn': path.resolve(__dirname, 'src/shadcn'),
    },
  },
})
