// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-transform-react-remove-prop-types']
            }
        }),
        compression({ algorithm: 'gzip' }) // Precompress files
    ],
    build: {
        minify: 'esbuild',
        cssCodeSplit: true,
    },
    server: {
        host: '0.0.0.0',
        proxy: {
           
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
            '/assets': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            }
        },
    },
});