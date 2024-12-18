/// <reference types="vitest" />

import path from 'path';
import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export const ViteConfig: UserConfigExport = {
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};

export default defineConfig(ViteConfig);
