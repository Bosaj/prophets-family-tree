import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Languages, Search } from 'lucide-react'
import { useI18n } from '../i18n'
import { LANG_NAMES } from '../i18n/strings'
import type { Route } from '../lib/router'
import type { Lang } from '../data/types'
import { A } from './ui'
import { Logo } from './Logo'

const NAV = [
  { key: 'navTree', href: '/tree', route: 'tree' },
  { key: 'navSahaba', href: '/sahaba', route: 'sahaba' },
  { key: 'navScience', href: '/science', route: 'science' },
  { key: 'mapView', href: '/map', route: 'map' },
  { key: 'navTimeline', href: '/timeline', route: 'timeline' },
  { key: 'navStature', href: '/stature', route: 'stature' },
  { key: 'navStories', href: '/stories', route: 'stories' },
  { key: 'navNature', href: '/nature', route: 'nature' },
  { key: 'navScriptures', href: '/scriptures', route: 'scriptures' },
  { key: 'navSources', href: '/sources', route: 'sources' },
] as const

export function Header({ route, onSearch }: { route: Route; onSearch: () => void }) {
  const { t, lang } = useI18n()
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
      <div className="mx-auto flex h-16 w-full max-w-[1720px] items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <A href="/" className="flex shrink-0 items-center gap-2.5 rounded-full pe-2" aria-label={`${t('brand')} — ${t('navHome')}`}>
          <Logo className="size-8" />
          <span className="flex flex-col leading-none">
            <span className="ar-name gold-text text-lg font-bold">شجرة</span>
            {lang !== 'ar' && <span className="text-[0.62rem] tracking-[0.28em] text-ink-3 uppercase">Shajara</span>}
          </span>
        </A>

        <nav aria-label="Main" className="hidden min-[1100px]:flex items-center justify-center gap-1 min-[1280px]:gap-1.5 min-[1480px]:gap-2">
          {NAV.map((n) => (
            <A
              key={n.href}
              href={n.href}
              aria-current={route.name === n.route ? 'page' : undefined}
              className={`rounded-full whitespace-nowrap shrink-0 px-2.5 py-1.5 text-xs min-[1280px]:px-3 min-[1280px]:text-[0.82rem] min-[1480px]:px-3.5 min-[1480px]:text-sm transition-all duration-200 ${
                route.name === n.route
                  ? 'bg-white/10 text-gold-2 font-medium shadow-sm ring-1 ring-gold/25'
                  : 'text-ink-2 hover:text-ink hover:bg-white/5'
              }`}
            >
              {t(n.key)}
            </A>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onSearch}
            className="flex h-9 min-w-9 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 min-[1280px]:px-3 text-xs min-[1280px]:text-sm text-ink-2 transition-colors hover:border-gold/40 hover:text-ink shrink-0"
            aria-label={t('search')}
          >
            <Search className="size-3.5 min-[1280px]:size-4" aria-hidden="true" />
            <span className="sr-only min-[1280px]:not-sr-only">{t('search')}</span>
            <kbd aria-hidden="true" className="hidden rounded border border-white/15 px-1.5 text-[0.65rem] text-ink-3 min-[1400px]:inline">Ctrl K</kbd>
          </button>
          <LanguageMenu />
        </div>
      </div>
      <nav aria-label="Main mobile" className="flex items-center gap-1 overflow-x-auto border-t border-white/5 px-3 py-1.5 whitespace-nowrap min-[1100px]:hidden no-scrollbar">
        {NAV.map((n) => (
          <A
            key={n.href}
            href={n.href}
            aria-current={route.name === n.route ? 'page' : undefined}
            className={`rounded-full px-3 py-1 text-[0.75rem] shrink-0 whitespace-nowrap ${route.name === n.route ? 'bg-white/10 text-gold-2 font-medium ring-1 ring-gold/25' : 'text-ink-2'}`}
          >
            {t(n.key)}
          </A>
        ))}
      </nav>
    </header>
  )
}

function LanguageMenu() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', onDocClick)
      document.addEventListener('keydown', onKey)
    }
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('language')}
        className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 min-[1280px]:px-3 text-xs min-[1280px]:text-sm text-ink-2 transition-all hover:border-gold/50 hover:bg-white/10 hover:text-ink focus:outline-none focus:ring-2 focus:ring-gold/40"
      >
        <Languages className="size-3.5 min-[1280px]:size-4 text-gold" aria-hidden="true" />
        <span className="font-medium text-ink">{LANG_NAMES[lang]}</span>
        <ChevronDown
          className={`size-3 text-ink-3 transition-transform duration-200 ${open ? 'rotate-180 text-gold' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t('language')}
          className="absolute end-0 top-full mt-2 w-44 overflow-hidden rounded-2xl border border-gold/30 bg-night-surface/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {(['ar', 'fr', 'en'] as Lang[]).map((l) => {
            const isSelected = l === lang
            return (
              <button
                key={l}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLang(l)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-start text-sm transition-colors ${
                  isSelected
                    ? 'bg-gold/15 text-gold font-semibold'
                    : 'text-ink-2 hover:bg-white/10 hover:text-ink'
                }`}
              >
                <span className={l === 'ar' ? 'font-bold font-["Reem_Kufi_Variable",_serif] text-base' : ''}>
                  {LANG_NAMES[l]}
                </span>
                {isSelected && <Check className="size-4 text-gold" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

