import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2021',
    rollupOptions: {
      input: path.resolve(__dirname, 'views/js/index.js'),
      output: {
        entryFileNames: 'bundle.js',
        dir: path.resolve(__dirname, 'public', 'assets'),
      },
    },
  },
  server: {
    strictPort: true,
    open: false,
  },
  logLevel: 'error',
});
