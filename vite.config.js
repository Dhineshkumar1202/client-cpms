import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://cpmsapp-q59f2p6k.b4a.run',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
