import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Relative asset paths so the build works under /lift-log/ on GitHub Pages.
  base: './',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // Date tests run in New York time so a UTC shortcut would fail them.
    env: { TZ: 'America/New_York' },
  },
})
