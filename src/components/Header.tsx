import { useEffect, useState } from 'react'
import { Languages, Search } from 'lucide-react'
import { useI18n } from '../i18n'
import { LANG_NAMES } from '../i18n/strings'
import type { Route } from '../lib/router'
import type { Lang } from '../data/types'
import { A } from './ui'
import { Logo } from './Logo'

const NAV = [
  { key: 'navTree', href: '/tree', route: 'tree' },
  { key: 'navTimeline', href: '/timeline', route: 'timeline' },
  { key: 'navSources', href: '/sources', route: 'sources' },
] as const

export function Header({ route, onSearch }: { route: Route; onSearch: () => void }) {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const solid = scrolled || route.name !== 'home'

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${solid ? 'glass-strong border-x-0 border-t-0' : 'border-b border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <A href="/" className="flex items-center gap-2.5 rounded-full pe-2" aria-label={`${t('brand')} — ${t('navHome')}`}>
          <Logo className="size-8" />
          <span className="flex flex-col leading-none">
            <span className="ar-name gold-text text-lg font-bold">شجرة</span>
            {lang !== 'ar' && <span className="text-[0.62rem] tracking-[0.28em] text-ink-3 uppercase">Shajara</span>}
          </span>
        </A>

        <nav aria-label="Main" className="ms-auto hidden items-center gap-1 sm:flex">
          {NAV.map((n) => (
            <A
              key={n.href}
              href={n.href}
              aria-current={route.name === n.route ? 'page' : undefined}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${route.name === n.route ? 'bg-white/10 text-gold-2' : 'text-ink-2 hover:text-ink'}`}
            >
              {t(n.key)}
            </A>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-1.5 sm:ms-2">
          <button type="button" onClick={onSearch} className="flex h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-ink-2 hover:border-gold/40 hover:text-ink">
            <Search className="size-4" aria-hidden="true" />
            <span className="sr-only md:not-sr-only">{t('search')}</span>
            <kbd aria-hidden="true" className="hidden rounded border border-white/15 px-1.5 text-[0.65rem] text-ink-3 md:inline">Ctrl K</kbd>
          </button>
          <label className="relative flex h-10 items-center rounded-full border border-white/10 bg-white/5 ps-3 text-sm text-ink-2 hover:border-gold/40">
            <Languages className="size-4" aria-hidden="true" />
            <span className="sr-only">{t('language')}</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="h-full cursor-pointer appearance-none bg-transparent ps-2 pe-3 text-ink outline-none"
            >
              {(['ar', 'fr', 'en'] as Lang[]).map((l) => (
                <option key={l} value={l} className="bg-night-2">
                  {LANG_NAMES[l]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <nav aria-label="Main mobile" className="flex justify-center gap-1 border-t border-white/5 px-4 pb-2 sm:hidden">
        {NAV.map((n) => (
          <A
            key={n.href}
            href={n.href}
            aria-current={route.name === n.route ? 'page' : undefined}
            className={`rounded-full px-4 py-2 text-[0.8rem] ${route.name === n.route ? 'bg-white/10 text-gold-2' : 'text-ink-2'}`}
          >
            {t(n.key)}
          </A>
        ))}
      </nav>
    </header>
  )
}
