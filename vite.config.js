import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '5173-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer',
      '5175-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer',
      '5174-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer',
      'manus.computer',
      '.manus.computer'
    ],
    middlewareMode: false
  },
  preview: {
    host: '0.0.0.0',
    port: 5173
  }
})
