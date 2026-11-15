import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Clock } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4 } from '../data/types'
import { usePlace } from '../lib/place'
import { LOCALE, NOW_UI } from '../lib/nowText'

const Panel = lazy(() => import('./PlaceClockPanel'))

/** The header chip: the time at the reader's place. Its panel (prayer engine, day guide) loads only when opened. */
export function PlaceClock() {
  const { pick, lang } = useI18n()
  const { place, now } = usePlace()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const time = (d: Date, tz: string) => new Intl.DateTimeFormat(LOCALE[lang], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(d)
  const cityName = pick(place.name as L4)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`${pick(NOW_UI.label)}: ${cityName} ${time(now, place.tz)}`}
        className="flex h-8 sm:h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 xl:px-2.5 text-xs text-ink-2 transition-colors hover:border-gold/40 hover:text-ink"
      >
        <Clock className="size-3.5" aria-hidden="true" />
        <span className="font-semibold tabular-nums text-gold-2">{time(now, place.tz)}</span>
        <span className="hidden max-w-[7rem] truncate 2xl:inline">{cityName}</span>
      </button>
      {open && (
        <Suspense fallback={null}>
          <Panel onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </div>
  )
}
