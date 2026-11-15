import { useEffect, useMemo } from 'react'
import { BellRing, CalendarPlus } from 'lucide-react'
import { useI18n } from '../i18n'
import { FAST_INFO, FAST_QUOTES, FAST_UI } from '../data/fasting'
import { MONTH_NAMES } from '../data/hijriMonths'
import type { Lang } from '../data/types'
import { downloadIcs, fastingIcs, upcomingFastDays, type FastDay } from '../lib/fastDays'
import { civilDay } from '../lib/hijri'
import { usePlace } from '../lib/place'
import { DuaCard } from './DuasView'
import { A, LevelChip, RefChip } from './ui'

const LOCALE: Record<Lang, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-MA', es: 'es-ES' }

function useFastDays(days = 365): FastDay[] {
  const { place, now } = usePlace()
  const today = now.toDateString()
  // Recomputed once a day (and when the place changes), not every minute.
  return useMemo(() => upcomingFastDays(now, place.tz, days), [today, place.tz, days])
}

/** The next fasting days for the reader's place, with a calendar file to add them with reminders. */
export function FastingReminders() {
  const { pick, lang } = useI18n()
  const { place } = usePlace()
  const list = useFastDays()
  // The three white days of a month are one card.
  const groups = useMemo(() => {
    const out: FastDay[][] = []
    for (const f of list) {
      const last = out[out.length - 1]
      if (f.kind === 'white' && last && last[0]!.kind === 'white' && last[0]!.h.m === f.h.m) last.push(f)
      else out.push([f])
    }
    return out.slice(0, 6)
  }, [list])

  useEffect(() => {
    if (location.hash !== '#reminders') return
    // after the page above has laid out
    const id = setTimeout(() => document.getElementById('reminders')?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' }), 250)
    return () => clearTimeout(id)
  }, [])

  const fmt = (day: string, withDay = true) =>
    new Intl.DateTimeFormat(LOCALE[lang], { weekday: withDay ? 'long' : undefined, day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${day}T12:00:00Z`))
  const range = (g: FastDay[]) => (g.length === 1 ? fmt(g[0]!.day) : `${fmt(g[0]!.day)} – ${fmt(g[g.length - 1]!.day)}`)
  const hRange = (g: FastDay[]) => `${g.length === 1 ? g[0]!.h.d : `${g[0]!.h.d}–${g[g.length - 1]!.h.d}`} ${pick(MONTH_NAMES[g[0]!.h.m - 1]!)}`

  return (
    <section id="reminders" aria-labelledby="reminders-h" className="mb-14 scroll-mt-24">
      <h2 id="reminders-h" className="flex items-center gap-2.5 text-2xl font-semibold text-ink sm:text-3xl">
        <BellRing aria-hidden="true" className="size-6 text-gold" /> {pick(FAST_UI.title)}
      </h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink-2 text-pretty">{pick(FAST_UI.lead)}</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {groups.map((g) => {
          const f = g[0]!
          const info = FAST_INFO[f.kind]
          return (
            <li key={f.day} className={`rounded-2xl border p-4 ${info.rule === 'forbidden' ? 'border-white/10 bg-white/[0.03]' : 'border-gold/20 bg-gold/[0.04]'}`}>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <span className="font-semibold text-ink">{range(g)}</span>
                <span className="text-ink-3">{hRange(g)}</span>
                {g.some((x) => x.estimate) && <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[0.7rem] text-ink-3">{pick(FAST_UI.estimate)}</span>}
              </p>
              <p className={`mt-1 font-medium ${info.rule === 'forbidden' ? 'text-ink-2' : 'text-gold-2'}`}>{pick(info.title)}</p>
              <p className="mt-0.5 text-sm text-ink-2">{pick(info.why)}</p>
            </li>
          )
        })}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => downloadIcs(fastingIcs(list, pick))}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-night transition-transform active:scale-95"
        >
          <CalendarPlus aria-hidden="true" className="size-4" /> {pick(FAST_UI.add)}
        </button>
        <span className="text-xs text-ink-3">{pick(place.name)}</span>
      </div>
      <p className="mt-3 max-w-2xl text-xs leading-relaxed text-ink-3">{pick(FAST_UI.estimateNote)}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {FAST_QUOTES.map((d) => (
          <DuaCard key={d.id} d={d} compact />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <LevelChip level="hadith" />
        {['tirmidhi:761', 'muslim:1162', 'muslim:1134', 'bukhari:1992', 'muslim:1141'].map((r) => (
          <RefChip key={r} r={r} />
        ))}
      </div>
    </section>
  )
}

/** A line on the home page when today or tomorrow is a fasting day (or an Eid) at the reader's place. */
export function FastBanner() {
  const { pick } = useI18n()
  const { place, now } = usePlace()
  const f = useFastDays(2)[0]
  if (!f) return null
  const info = FAST_INFO[f.kind]
  const when = f.day === civilDay(now, place.tz) ? FAST_UI.today : FAST_UI.tomorrow
  const rule = info.rule === 'forbidden' ? FAST_UI.noFast : info.rule === 'sunnah' ? FAST_UI.recommended : null
  return (
    <A href="/hijri#reminders" className="mt-3 flex max-w-xl items-center gap-2.5 rounded-2xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm text-ink transition-colors hover:border-gold/60">
      <BellRing aria-hidden="true" className="size-4 shrink-0 text-gold" />
      <span>
        <span className="font-semibold text-gold-2">{pick(when)}</span> · {pick(info.title)}
        {rule && <span className="text-ink-2"> · {pick(rule)}</span>}
      </span>
    </A>
  )
}
