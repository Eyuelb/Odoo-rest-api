import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createProxyMiddleware } from 'http-proxy-middleware'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 4173, // you can replace this port with any port
  },
  resolve:{
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@views", replacement: "/src/views" },
      { find: "@routes", replacement: "/src/routes" },
      { find: "@stateManagment", replacement: "/src/stateManagment" },
      { find: "@themeManagment", replacement: "/src/themeManagment" },
      { find: "@services", replacement: "/src/services" },

    ]
  },
})