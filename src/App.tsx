import { useCallback, useEffect, useState } from 'react'
import { GithubMark } from './components/GithubMark'
import { useI18n } from './i18n'
import { useRoute } from './lib/router'
import { Starfield } from './components/Starfield'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Tree } from './components/Tree'
import { TopographyMap } from './components/TopographyMap'
import { Timeline } from './components/Timeline'
import { StatureView } from './components/StatureView'
import { SalihinView } from './components/SalihinView'
import { NatureView } from './components/NatureView'
import { SahabaTree } from './components/SahabaTree'
import { ScienceView } from './components/ScienceView'
import { Person } from './components/Person'
import { REPO, Sources } from './components/Sources'
import { ScripturesView } from './components/ScripturesView'
import { NotFound } from './components/NotFound'
import { SearchDialog } from './components/Search'
import { VerseSheet } from './components/VerseSheet'
import { VerseContext } from './components/ui'
import { Logo } from './components/Logo'

export default function App() {
  const route = useRoute()
  const { t, lang } = useI18n()
  const [verse, setVerse] = useState<string | null>(null)
  const [searching, setSearching] = useState(false)
  const openVerse = useCallback((r: string) => setVerse(r), [])

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearching(true)
      } else if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setSearching(true)
      }
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])

  // Close any sheet when the page changes (route objects are rebuilt each render, so compare by value).
  const routeKey = JSON.stringify(route)
  useEffect(() => {
    setVerse(null)
    setSearching(false)
  }, [routeKey])

  const page = (() => {
    switch (route.name) {
      case 'home':
        return <Home />
      case 'tree':
        return (
          <div className="fixed inset-x-0 top-[6.5rem] bottom-0 lg:top-16">
            <Tree key={route.focus ?? 'all'} focus={route.focus} />
          </div>
        )
      case 'map':
        return (
          <div className="fixed inset-x-0 top-[6.5rem] bottom-0 lg:top-16">
            <TopographyMap key={route.focus ?? 'all'} focus={route.focus} />
          </div>
        )
      case 'timeline':
        return <Timeline />
      case 'stature':
        return <StatureView />
      case 'stories':
        return <SalihinView />
      case 'nature':
        return <NatureView />
      case 'sahaba':
        return <SahabaTree key={route.focus ?? 'all'} focus={route.focus} />
      case 'science':
        return <ScienceView />
      case 'scriptures':
        return <ScripturesView initialBookId={route.book} />
      case 'sources':
        return <Sources />
      case 'person':
        return <Person key={route.id} id={route.id} />
      default:
        return <NotFound />
    }
  })()

  return (
    <VerseContext.Provider value={openVerse}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-night">
        {t('skip')}
      </a>
      <Starfield density={route.name === 'tree' || route.name === 'map' ? 0.7 : 1} />
      <Header route={route} onSearch={() => setSearching(true)} />
      <main id="main" className={route.name !== 'home' && route.name !== 'tree' && route.name !== 'map' ? 'pt-28 lg:pt-20' : undefined}>
        {page}
      </main>
      {route.name !== 'tree' && route.name !== 'map' && (
        <footer className="border-t border-white/5">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center text-sm text-ink-3 sm:flex-row sm:justify-between sm:text-start">
            <div className="flex items-center gap-3">
              <Logo className="size-7" />
              <span>
                {lang === 'ar' ? (
                  <>
                    مشروع مفتوح المصدر من{' '}
                    <a
                      href="https://www.linkedin.com/in/oussama-elhadji/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline font-semibold transition-colors"
                    >
                      أسامة الحاجي
                    </a>
                    .
                  </>
                ) : lang === 'fr' ? (
                  <>
                    Un projet open-source par{' '}
                    <a
                      href="https://www.linkedin.com/in/oussama-elhadji/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline font-semibold transition-colors"
                    >
                      Oussama EL HADJI
                    </a>
                    .
                  </>
                ) : (
                  <>
                    An open-source work by{' '}
                    <a
                      href="https://www.linkedin.com/in/oussama-elhadji/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline font-semibold transition-colors"
                    >
                      Oussama EL HADJI
                    </a>
                    .
                  </>
                )}
              </span>
            </div>
            <p className="max-w-md text-xs">{t('disclaimer')}</p>
            <a href={REPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
              <GithubMark className="size-4" /> GitHub
            </a>
          </div>
        </footer>
      )}
      <VerseSheet refId={verse} onClose={() => setVerse(null)} />
      <SearchDialog open={searching} onClose={() => setSearching(false)} />
    </VerseContext.Provider>
  )
}
