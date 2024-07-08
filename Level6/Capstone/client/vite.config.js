import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true,
      },
      "/auth":{//Add this to proxy
        //auth requests
          target: "http://localhost:9000/",
          changeOrigin:true
      }
    },
  }
})
