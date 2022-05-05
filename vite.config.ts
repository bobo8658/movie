import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  base: './',
  server: {
    port: 4000,
    open: true,
    cors: true,
    proxy:{
      "/api":{
        target:"http://47.95.192.39:8080",
        rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true,
      }
      // "/api":{
      //   target:"http://39.108.183.234:8080"
      // }
    }
  }
})
