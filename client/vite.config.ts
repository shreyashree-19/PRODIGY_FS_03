import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // Falls back down the list until one responds
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});

