import { useEffect, useRef, useState } from 'react'
import { CloudCheck, RefreshCw, WifiOff } from 'lucide-react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useI18n, tx } from '../i18n'
import { hrefOf, useRoute } from '../lib/router'

const CHECK_EVERY = 30 * 60_000
const RELOADED_KEY = 'shajara:reloaded-for-update'

/**
 * Keeps every reader on the latest version.
 * - The service worker takes over as soon as a new version is published (also for readers still on an older
 *   version), and the site checks for one every 30 minutes and whenever the tab comes back.
 * - Once the new version is in place, the page reloads into it at once when the tab is in the background or on
 *   the reader's next page change; a bar offers to reload right away.
 * - If a page's code from an older version can no longer be loaded (a deploy replaced it), the page reloads once
 *   instead of failing.
 * - The first visit says when the site is saved for offline reading; offline, a notice says the saved copy is shown.
 */
export function UpdatePrompt() {
  const { lang } = useI18n()
  // The page's path as a string: the route object is new on every render.
  const page = hrefOf(useRoute())
  const lastPage = useRef(page)
  const [updated, setUpdated] = useState(false)
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine))

  const {
    offlineReady: [offlineReady, setOfflineReady],
  } = useRegisterSW({
    immediate: true,
    onNeedReload() {
      setUpdated(true)
    },
    onRegisteredSW(_url: string, reg: ServiceWorkerRegistration | undefined) {
      if (!reg) return
      const check = () => {
        if (navigator.onLine) reg.update().catch(() => {})
      }
      setInterval(check, CHECK_EVERY)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') check()
      })
    },
  })

  // A fresh load is the new version: allow the one-time chunk reload again for the next deploy.
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOADED_KEY)
      } catch {
        /* storage blocked */
      }
    }, 10_000)
    return () => clearTimeout(t)
  }, [])

  // The new version is in place: reload when nobody is looking, or on the next page change.
  useEffect(() => {
    if (!updated) return
    if (document.visibilityState === 'hidden') {
      location.reload()
      return
    }
    const onHide = () => {
      if (document.visibilityState === 'hidden') location.reload()
    }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [updated])

  useEffect(() => {
    if (updated && page !== lastPage.current) location.reload()
    lastPage.current = page
  }, [page, updated])

  // A chunk of the old version is gone after a deploy: reload once into the new one.
  useEffect(() => {
    const onPreloadError = (e: Event) => {
      try {
        if (sessionStorage.getItem(RELOADED_KEY)) return
        sessionStorage.setItem(RELOADED_KEY, '1')
      } catch {
        /* storage blocked: reload anyway */
      }
      e.preventDefault()
      location.reload()
    }
    window.addEventListener('vite:preloadError', onPreloadError)
    return () => window.removeEventListener('vite:preloadError', onPreloadError)
  }, [])

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  useEffect(() => {
    if (!offlineReady) return
    const t = setTimeout(() => setOfflineReady(false), 6000)
    return () => clearTimeout(t)
  }, [offlineReady, setOfflineReady])

  const bar = 'fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-md items-center gap-3 rounded-2xl border bg-night-surface/95 p-3 shadow-2xl backdrop-blur-xl'

  if (updated) {
    return (
      <div role="status" className={`${bar} border-gold/40 text-sm text-ink`}>
        <RefreshCw aria-hidden="true" className="size-4 shrink-0 text-gold" />
        <span className="min-w-0 flex-1">{tx(lang, 'A new version of the site is ready.', 'Une nouvelle version du site est prête.', 'نسخة جديدة من الموقع جاهزة.', 'Hay una nueva versión del sitio.')}</span>
        <button type="button" onClick={() => location.reload()} className="shrink-0 rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-night transition-transform active:scale-95">
          {tx(lang, 'Reload', 'Recharger', 'تحديث', 'Recargar')}
        </button>
      </div>
    )
  }
  if (!online) {
    return (
      <div role="status" className={`${bar} border-white/15 text-xs text-ink-2`}>
        <WifiOff aria-hidden="true" className="size-4 shrink-0 text-gold" />
        <span className="min-w-0 flex-1">
          {tx(
            lang,
            'Offline: the saved copy of the site is shown. Prayer times, the Hijri date and the supplications still work.',
            'Hors ligne : la copie enregistrée du site est affichée. Les horaires de prière, la date hégirienne et les invocations fonctionnent.',
            'دون اتصال: تُعرض النسخة المحفوظة من الموقع. مواقيت الصلاة والتاريخ الهجري والأدعية تعمل.',
            'Sin conexión: se muestra la copia guardada del sitio. Los horarios de oración, la fecha hégira y las súplicas siguen funcionando.',
          )}
        </span>
      </div>
    )
  }
  if (offlineReady) {
    return (
      <div role="status" className={`${bar} border-white/15 text-xs text-ink-2`}>
        <CloudCheck aria-hidden="true" className="size-4 shrink-0 text-gold" />
        <span className="min-w-0 flex-1">
          {tx(lang, 'The site is saved on this device and works offline.', 'Le site est enregistré sur cet appareil et fonctionne hors ligne.', 'حُفظ الموقع على هذا الجهاز ويعمل دون اتصال.', 'El sitio está guardado en este dispositivo y funciona sin conexión.')}
        </span>
      </div>
    )
  }
  return null
}
