import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      components: '/src/components',
      hooks: '/src/hooks/',
      constants: '/src/constants/'
    }
  },
  base: '/traducation-fx-test-task/'
})
