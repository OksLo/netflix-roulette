import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/netflix-roulette/',
  plugins: [react()],
  resolve: {
    alias: {
      'src/': `${path.resolve(__dirname, 'src')}/`
    }
  }
})
