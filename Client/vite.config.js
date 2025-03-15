// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/socket.io': {
                target: 'http://localhost:3000', // Your backend server
                ws: true, // Enable WebSocket proxying
                changeOrigin: true,
            },
            '/api':{
              target: 'http://localhost:3000',
              changeOrigin: true,
            }
        },
    },
});