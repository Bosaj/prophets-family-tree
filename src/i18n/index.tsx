import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L3, Lang } from '../data/types'
import { STRINGS, type Key } from './strings'

const STORE = 'shajara:lang'

/** Same rule as the inline script in index.html, so the first paint never flips direction. */
export function initialLang(): Lang {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) ?? 'null') as Lang | null
    if (saved === 'ar' || saved === 'fr' || saved === 'en') return saved
  } catch {
    /* storage blocked */
  }
  const n = (typeof navigator !== 'undefined' ? navigator.language : '').toLowerCase()
  return n.startsWith('fr') ? 'fr' : n.startsWith('en') ? 'en' : 'ar'
}

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (k: Key, vars?: Record<string, string | number>) => string
  pick: (v: L3) => string
  dir: 'rtl' | 'ltr'
}

const I18n = createContext<Ctx | null>(null)

export function I18nProvider({ children, lang: forced }: { children: ReactNode; lang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(() => forced ?? initialLang())

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORE, JSON.stringify(l))
    } catch {
      /* storage blocked */
    }
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      pick: (v) => v[lang],
      t: (k, vars) => {
        let s = STRINGS[lang][k]
        if (vars) for (const [name, val] of Object.entries(vars)) s = s.replace(`{${name}}`, String(val))
        return s
      },
    }),
    [lang, setLang],
  )
  return <I18n.Provider value={value}>{children}</I18n.Provider>
}

export function useI18n(): Ctx {
  const c = useContext(I18n)
  if (!c) throw new Error('useI18n outside I18nProvider')
  return c
}
