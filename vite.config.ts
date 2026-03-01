import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize bundle size
    target: 'es2020',
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'chess': ['chess.js', 'react-chessboard'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-separator', '@radix-ui/react-slot'],
        },
        // Optimize chunk naming
        chunkFileNames: 'assets/[name]-[hash:8].js',
        entryFileNames: 'assets/[name]-[hash:8].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (info.endsWith('.css')) {
            return 'assets/[name]-[hash:8][extname]';
          }
          if (info.endsWith('.mp3') || info.endsWith('.wav')) {
            return 'sounds/[name][extname]';
          }
          return 'assets/[name]-[hash:8][extname]';
        },
      },
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps for production (optional, can be disabled for smaller builds)
    sourcemap: false,
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false,
    },
  },
});
