import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path" // 🚀 1. Import path module

// https://vitejs.dev
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 🚀 2. Map "@" to "src"
    },
  },
  server: {
  port: 5174, // You can change this to any port you prefer
},
})
