import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Languages, Search } from 'lucide-react'
import { tx, useI18n } from '../i18n'
import { LANG_NAMES } from '../i18n/strings'
import type { Route } from '../lib/router'
import type { Lang } from '../data/types'
import type { Key } from '../i18n/strings'
import { A } from './ui'
import { Logo } from './Logo'

interface NavItem {
  key: Key
  href: string
  route: Route['name']
  short: Record<Lang, string>
  /** Shown in the desktop bar; the others are in the "More" menu. Phones scroll through all of them. */
  main?: boolean
}

const NAV: readonly NavItem[] = [
  { key: 'navTree', href: '/tree', route: 'tree', main: true, short: { en: 'Tree', fr: 'Arbre', ar: 'الشجرة', es: 'Árbol' } },
  { key: 'navSahaba', href: '/sahaba', route: 'sahaba', main: true, short: { en: 'Sahaba', fr: 'Sahaba', ar: 'الصحابة', es: 'Sahaba' } },
  { key: 'navDuas', href: '/duas', route: 'duas', main: true, short: { en: 'Duas', fr: 'Invocations', ar: 'الأدعية', es: 'Súplicas' } },
  { key: 'navTimes', href: '/times', route: 'times', main: true, short: { en: 'Times', fr: 'Horaires', ar: 'المواقيت', es: 'Horarios' } },
  { key: 'navIslam', href: '/islam', route: 'islam', main: true, short: { en: 'Islam', fr: 'L’islam', ar: 'الإسلام', es: 'El islam' } },
  { key: 'navStories', href: '/stories', route: 'stories', main: true, short: { en: 'Stories', fr: 'Récits', ar: 'القصص', es: 'Relatos' } },
  { key: 'navNature', href: '/nature', route: 'nature', main: true, short: { en: 'Nature', fr: 'Nature', ar: 'الكائنات', es: 'Naturaleza' } },
  { key: 'mapView', href: '/map', route: 'map', main: true, short: { en: 'Map', fr: 'Carte', ar: 'الخريطة', es: 'Mapa' } },
  { key: 'navHour', href: '/hour', route: 'hour', short: { en: 'The Hour', fr: 'L’Heure', ar: 'الساعة', es: 'La Hora' } },
  { key: 'navTimeline', href: '/timeline', route: 'timeline', short: { en: 'Timeline', fr: 'Chronologie', ar: 'التسلسل', es: 'Cronología' } },
  { key: 'navScience', href: '/science', route: 'science', short: { en: 'Miracles', fr: 'Miracles', ar: 'الإعجاز', es: 'Milagros' } },
  { key: 'navStature', href: '/stature', route: 'stature', short: { en: 'Stature', fr: 'Stature', ar: 'القامة', es: 'Estatura' } },
  { key: 'navScriptures', href: '/scriptures', route: 'scriptures', short: { en: 'Scriptures', fr: 'Livres', ar: 'الكتب', es: 'Libros' } },
  { key: 'navSources', href: '/sources', route: 'sources', short: { en: 'Sources', fr: 'Sources', ar: 'المصادر', es: 'Fuentes' } },
]

const MORE: Record<Lang, string> = { en: 'More', fr: 'Plus', ar: 'المزيد', es: 'Más' }

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
      <div className="mx-auto flex h-16 w-full max-w-[1720px] items-center justify-between gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6">
        <A href="/" className="flex shrink-0 items-center gap-2 rounded-full pe-1 sm:pe-2" aria-label={`${t('brand')} — ${t('navHome')}`}>
          <Logo className="size-7 sm:size-8" />
          <span className="flex flex-col leading-none">
            <span className="ar-name gold-text text-base sm:text-lg font-bold">شجرة</span>
            {lang !== 'ar' && <span className="text-[0.58rem] sm:text-[0.62rem] tracking-[0.24em] text-ink-3 uppercase">Shajara</span>}
          </span>
        </A>

        <nav aria-label={tx(lang, 'Main', 'Principal', 'القائمة الرئيسية', 'Principal')} className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 2xl:gap-1.5 min-w-0">
          {NAV.filter((n) => n.main).map((n) => (
            <A
              key={n.href}
              href={n.href}
              title={t(n.key)}
              aria-label={t(n.key)}
              aria-current={route.name === n.route ? 'page' : undefined}
              className={`rounded-full whitespace-nowrap shrink-0 px-2 py-1 text-[11px] xl:px-2.5 xl:text-xs 2xl:px-3 2xl:text-[13px] transition-all duration-200 ${
                route.name === n.route
                  ? 'bg-white/10 text-gold-2 font-semibold shadow-sm ring-1 ring-gold/25'
                  : 'text-ink-2 hover:text-ink hover:bg-white/5'
              }`}
            >
              {n.short[lang] ?? t(n.key)}
            </A>
          ))}
          <MoreMenu route={route} />
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 xl:gap-2">
          <button
            type="button"
            onClick={onSearch}
            className="flex h-8 sm:h-9 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 xl:px-2.5 text-xs text-ink-2 transition-colors hover:border-gold/40 hover:text-ink shrink-0"
            aria-label={t('search')}
            title={`${t('search')} (Ctrl+K)`}
          >
            <Search className="size-3.5 xl:size-4" aria-hidden="true" />
            <span className="sr-only 2xl:not-sr-only">{t('search')}</span>
            <kbd aria-hidden="true" className="hidden rounded border border-white/15 px-1.5 text-[0.62rem] text-ink-3 min-[1680px]:inline">Ctrl K</kbd>
          </button>
          <LanguageMenu />
        </div>
      </div>
      <nav aria-label={tx(lang, 'Main', 'Principal', 'القائمة الرئيسية', 'Principal')} className="flex items-center gap-1 overflow-x-auto border-t border-white/5 px-3 py-1.5 whitespace-nowrap lg:hidden no-scrollbar">
        {NAV.map((n) => (
          <A
            key={n.href}
            href={n.href}
            title={t(n.key)}
            aria-current={route.name === n.route ? 'page' : undefined}
            className={`rounded-full px-2.5 py-1 text-[0.75rem] shrink-0 whitespace-nowrap ${route.name === n.route ? 'bg-white/10 text-gold-2 font-semibold ring-1 ring-gold/25' : 'text-ink-2'}`}
          >
            {n.short[lang] ?? t(n.key)}
          </A>
        ))}
      </nav>
    </header>
  )
}

/** The pages that do not fit in the desktop bar. */
function MoreMenu({ route }: { route: Route }) {
  const { lang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const items = NAV.filter((n) => !n.main)
  const active = items.some((n) => n.route === route.name)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => setOpen(false), [route.name])

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] xl:px-2.5 xl:text-xs 2xl:px-3 2xl:text-[13px] transition-colors ${
          active ? 'bg-white/10 text-gold-2 font-semibold ring-1 ring-gold/25' : 'text-ink-2 hover:text-ink hover:bg-white/5'
        }`}
      >
        {MORE[lang]}
        <ChevronDown aria-hidden="true" className={`size-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div role="menu" className="absolute end-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-gold/30 bg-night-surface/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          {items.map((n) => (
            <A
              key={n.href}
              href={n.href}
              role="menuitem"
              aria-current={route.name === n.route ? 'page' : undefined}
              className={`block rounded-xl px-3 py-2 text-sm transition-colors ${route.name === n.route ? 'bg-gold/15 text-gold font-semibold' : 'text-ink-2 hover:bg-white/10 hover:text-ink'}`}
            >
              {t(n.key)}
            </A>
          ))}
        </div>
      )}
    </div>
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
        aria-label={`${LANG_NAMES[lang]} — ${t('language')}`}
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
          {(['ar', 'fr', 'en', 'es'] as Lang[]).map((l) => {
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

