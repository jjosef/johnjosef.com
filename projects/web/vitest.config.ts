import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { defineConfig, UserConfigExport } from 'vitest/config';

const testConfig = {
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/tests/setup.js'],
  },
};

// Not sure why this doesn't work properly with TS and need the `as UserConfigExport`
export default defineConfig(testConfig as UserConfigExport);
