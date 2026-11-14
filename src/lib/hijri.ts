/**
 * Hijri dates, computed in the browser.
 * - Umm al-Qura: Saudi Arabia's official calendar (ICU `islamic-umalqura`).
 * - Astronomical: ICU `islamic`, months from the computed new moon.
 * - Civil: the arithmetical (tabular) calendar, ICU `islamic-civil`.
 * - Morocco: each month starts when the Ministry of Habous announces the crescent; the date is counted
 *   from the last announcement on record, and says so when the next one is due.
 * - Turkey: the Diyanet calendar, read from the public Aladhan API, with the astronomical date as fallback.
 */

import type { L4 } from '../data/types'

export type CalMethod = 'umalqura' | 'astronomical' | 'civil'

export interface HDate {
  y: number
  m: number
  d: number
}

const CALENDAR: Record<CalMethod, string> = { umalqura: 'islamic-umalqura', astronomical: 'islamic', civil: 'islamic-civil' }
const formats = new Map<string, Intl.DateTimeFormat>()

/** The Hijri date of `date` as seen in `timeZone` (the civil day there). */
export function hijri(date: Date, method: CalMethod = 'umalqura', timeZone = 'UTC'): HDate {
  const key = `${method}|${timeZone}`
  let f = formats.get(key)
  if (!f) {
    f = new Intl.DateTimeFormat(`en-u-ca-${CALENDAR[method]}-nu-latn`, { timeZone, day: 'numeric', month: 'numeric', year: 'numeric' })
    formats.set(key, f)
  }
  const parts = f.formatToParts(date)
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? NaN)
  return { y: get('year'), m: get('month'), d: get('day') }
}

/** "YYYY-MM-DD" of the civil day of `date` in `timeZone`. */
export function civilDay(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}

const dayNumber = (ymd: string) => {
  const [y, m, d] = ymd.split('-').map(Number) as [number, number, number]
  return Math.round(Date.UTC(y, m - 1, d) / 86_400_000)
}

/** Months whose start Morocco's Ministry of Habous announced, oldest first. Add each new announcement here. */
export const MOROCCO_STARTS: { y: number; m: number; start: string; source: L4 }[] = [
  // Bulletin officiel no. 7556 is dated 17 Jumada al-Ula 1448 = 29 October 2026, so the month began on 13 October.
  {
    y: 1448,
    m: 5,
    start: '2026-10-13',
    source: {
      en: 'Bulletin officiel 7556 (17 Jumada al-Ula 1448 = 29 Oct 2026)',
      fr: 'Bulletin officiel 7556 (17 Joumada al-Oula 1448 = 29 oct. 2026)',
      ar: 'الجريدة الرسمية 7556 (17 جمادى الأولى 1448 = 29 أكتوبر 2026)',
      es: 'Bulletin officiel 7556 (17 de Yumada al-Ula 1448 = 29 oct. 2026)',
    },
  },
  // Crescent seen on the evening of 29 Jumada al-Ula (10 November 2026): announced by the Ministry that evening.
  {
    y: 1448,
    m: 6,
    start: '2026-11-11',
    source: {
      en: 'Ministry of Habous and Islamic Affairs, announcement of 10 Nov 2026',
      fr: 'Ministère des Habous et des Affaires islamiques, communiqué du 10 nov. 2026',
      ar: 'بلاغ وزارة الأوقاف والشؤون الإسلامية، 10 نونبر 2026',
      es: 'Ministerio de Habous y Asuntos Islámicos, comunicado del 10 nov. 2026',
    },
  },
]

export type MoroccoStatus = 'official' | 'pending' | 'estimate'

/**
 * Morocco's date for `now`: counted from the last announced month start. Day 30 depends on the crescent
 * looked for on the evening of the 29th, so it is "pending" until the Ministry's next announcement is added.
 */
export function moroccoDate(now: Date, starts = MOROCCO_STARTS): { date: HDate; status: MoroccoStatus; source?: L4 } {
  const today = dayNumber(civilDay(now, 'Africa/Casablanca'))
  const anchor = [...starts].reverse().find((a) => dayNumber(a.start) <= today)
  if (anchor) {
    const d = today - dayNumber(anchor.start) + 1
    if (d <= 29) return { date: { y: anchor.y, m: anchor.m, d }, status: 'official', source: anchor.source }
    if (d === 30) return { date: { y: anchor.y, m: anchor.m, d }, status: 'pending', source: anchor.source }
  }
  return { date: hijri(now, 'umalqura', 'Africa/Casablanca'), status: 'estimate' }
}

/** Turkey's Diyanet date for the civil day of `now` in Istanbul, or null when the API cannot be reached. */
export async function diyanetDate(now: Date, signal?: AbortSignal): Promise<HDate | null> {
  const [y, m, d] = civilDay(now, 'Europe/Istanbul').split('-')
  try {
    const r = await fetch(`https://api.aladhan.com/v1/gToH/${d}-${m}-${y}?calendarMethod=DIYANET`, { signal })
    if (!r.ok) return null
    const h = (await r.json())?.data?.hijri
    const out = { y: Number(h?.year), m: Number(h?.month?.number), d: Number(h?.day) }
    return Number.isFinite(out.y) && out.m >= 1 && out.m <= 12 && out.d >= 1 && out.d <= 30 ? out : null
  } catch {
    return null
  }
}

/**
 * The next Gregorian day (from `from`, counted in Umm al-Qura) on which the Hijri date is month `m`, day `d`,
 * and the number of days until it. Looks up to 400 days ahead.
 */
export function nextOccurrence(m: number, d: number, from: Date): { date: Date; days: number; h: HDate } | null {
  const base = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), 12)
  for (let i = 0; i <= 400; i++) {
    const date = new Date(base + i * 86_400_000)
    const h = hijri(date)
    if (h.m === m && h.d === d) return { date, days: i, h }
  }
  return null
}

/** Mean lengths used to compare the two kinds of year. */
export const SOLAR_YEAR_DAYS = 365.2422
export const LUNAR_YEAR_DAYS = 354.3671

/** How many lunar (Hijri) years last as long as `solarYears` solar years. */
export const solarToLunar = (solarYears: number) => (solarYears * SOLAR_YEAR_DAYS) / LUNAR_YEAR_DAYS
