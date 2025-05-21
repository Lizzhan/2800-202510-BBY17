import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
