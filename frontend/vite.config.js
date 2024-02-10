import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import "dotenv/config";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      '/api': "https://hacktu.onrender.com"
    }
  },
  plugins: [react()],
})
