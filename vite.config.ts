import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath } from 'node:url'

const base = process.env.VITE_BASE || (process.env.GITHUB_PAGES ? '/prophets-family-tree/' : '/')
const cleanBase = base.endsWith('/') ? base : `${base}/`

/** Preload the display fonts so the calligraphic title doesn't reflow when they arrive. */
function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const fonts = Object.keys(ctx.bundle ?? {}).filter((f) => /(reem-kufi-arabic-wght-normal|sora-latin-wght-normal)-[\w-]+\.woff2$/.test(f))
        return { html, tags: fonts.map((f) => ({ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `${cleanBase}${f}`, crossorigin: '' }, injectTo: 'head' as const })) }
      },
    },
  }
}

export default defineConfig({
  base: cleanBase,
  // Public source maps: the project is open source, and they let browsers and Lighthouse map errors to code.
  build: { sourcemap: true },
  plugins: [
    preloadFonts(),
    react(),
    tailwindcss(),
    VitePWA({
      // A new worker takes over at once (so readers on an old version move too); the app registers it itself
      // (src/components/UpdatePrompt.tsx) and decides when to reload into the new version.
      registerType: 'autoUpdate',
      injectRegister: false,
      pwaAssets: { config: true },
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'شجرة الأنبياء · Shajara — The Tree of the Prophets',
        short_name: 'Shajara',
        description: 'The family tree and timeline of the Prophets named in the Qur’an, with sources.',
        lang: 'ar',
        theme_color: '#04050d',
        background_color: '#04050d',
        display: 'standalone',
        start_url: cleanBase,
        categories: ['education', 'books'],
      },
      workbox: {
        // Without these the new worker waits until every tab is closed, which kept readers on old versions.
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        navigateFallback: `${cleanBase}index.html`,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://api.alquran.cloud',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'quran-api', expiration: { maxEntries: 300 } },
          },
          {
            urlPattern: ({ url }) => /\/(img|nature|scriptures)\//.test(url.pathname),
            handler: 'CacheFirst',
            options: { cacheName: 'scenes', expiration: { maxEntries: 80 } },
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    css: false,
    alias: { 'virtual:pwa-register/react': fileURLToPath(new URL('./src/test/pwa-register-react.ts', import.meta.url)) },
  },
})
