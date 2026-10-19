import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin(),
    ViteImageOptimizer({
      png: {
        quality: 60,
        compressionLevel: 9,
      },
      jpeg: {
        quality: 65,
      },
      webp: {
        quality: 65,
      },
      includePublic: true,
      logStats: true,
    }),
  ],
});