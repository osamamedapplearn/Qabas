import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { qabasAdminApi } from './admin/vite-plugin-admin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Local-only content API for /admin — dev server only, never built.
    qabasAdminApi(),
  ],
  server: {
    port: 3000,
    host: true
  }
})
