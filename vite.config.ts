import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

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
  plugins: [
    preloadFonts(),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
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
        globPatterns: ['**/*.{js,css,html,svg,woff2}', 'img/*-960.webp'],
        navigateFallback: `${cleanBase}index.html`,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://api.alquran.cloud',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'quran-api', expiration: { maxEntries: 300 } },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/img/'),
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
  },
})
