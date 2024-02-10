import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import "dotenv/config";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      '/api': process.env.REACT_APP_API_URL ||'http://localhost:5000'
    }
  },
  plugins: [react()],
})
