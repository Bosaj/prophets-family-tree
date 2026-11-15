// Upcoming fasting days for a place, and a calendar file (.ics) with a reminder the evening before each.
import { FAST_INFO, FAST_UI, type FastKind } from '../data/fasting'
import { MONTH_NAMES } from '../data/hijriMonths'
import type { L4 } from '../data/types'
import { civilDay, hijri, moroccoDate, type HDate } from './hijri'

export interface FastDay {
  kind: FastKind
  /** Civil date "YYYY-MM-DD" at the place. */
  day: string
  h: HDate
  /** Computed rather than announced: can move by a day. */
  estimate: boolean
}

const DAY = 86_400_000

/** The Hijri date of a civil day at a place: Morocco's announced months, Umm al-Qura elsewhere. */
export function hijriOfDay(day: string, tz: string): { h: HDate; estimate: boolean } {
  const noon = new Date(`${day}T12:00:00Z`)
  if (tz === 'Africa/Casablanca') {
    const m = moroccoDate(noon)
    return { h: m.date, estimate: m.status !== 'official' }
  }
  return { h: hijri(noon, 'umalqura', 'UTC'), estimate: tz !== 'Asia/Riyadh' }
}

/** Which fasting day (if any) a Hijri date is. */
export function kindOf(h: HDate): FastKind | null {
  if (h.m === 9 && h.d === 1) return 'ramadan'
  if (h.m === 10 && h.d === 1) return 'fitr'
  if (h.m === 12 && h.d === 9) return 'arafah'
  if (h.m === 12 && h.d === 10) return 'adha'
  if (h.m === 1 && h.d === 9) return 'tasua'
  if (h.m === 1 && h.d === 10) return 'ashura'
  // The white days, except in Ramadan (already fasted) and on 13 Dhu al-Hijjah (a day of tashriq)
  if ((h.d === 13 || h.d === 14 || h.d === 15) && h.m !== 9 && !(h.m === 12 && h.d === 13)) return 'white'
  return null
}

/** The fasting days from today at the place, for `days` days. */
export function upcomingFastDays(now: Date, tz: string, days = 365): FastDay[] {
  const today = civilDay(now, tz)
  const base = Date.parse(`${today}T12:00:00Z`)
  const out: FastDay[] = []
  for (let i = 0; i < days; i++) {
    const day = new Date(base + i * DAY).toISOString().slice(0, 10)
    const { h, estimate } = hijriOfDay(day, tz)
    const kind = kindOf(h)
    if (kind) out.push({ kind, day, h, estimate })
  }
  return out
}

/* ------------------------------------------------------------------ calendar file */

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
const enc = new TextEncoder()

/** Folds a content line at 75 octets without splitting a character (RFC 5545 §3.1). */
function fold(line: string): string {
  const parts: string[] = []
  let cur = ''
  let bytes = 0
  for (const ch of line) {
    const b = enc.encode(ch).length
    if (bytes + b > (parts.length ? 74 : 75)) {
      parts.push(cur)
      cur = ''
      bytes = 0
    }
    cur += ch
    bytes += b
  }
  parts.push(cur)
  return parts.join('\r\n ')
}

const compact = (day: string) => day.replace(/-/g, '')
const nextDay = (day: string) => new Date(Date.parse(`${day}T12:00:00Z`) + DAY).toISOString().slice(0, 10)

/** A calendar of the given fasting days, in the reader's language, each with an alarm at 20:00 the evening before. */
export function fastingIcs(list: FastDay[], pick: (v: L4) => string, stamp = new Date()): string {
  const dtstamp = stamp.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shajara//Fasting days//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${esc(pick(FAST_UI.calName))}`,
  ]
  for (const f of list) {
    const info = FAST_INFO[f.kind]
    const hText = `${f.h.d} ${pick(MONTH_NAMES[f.h.m - 1]!)} ${f.h.y}`
    const state = info.rule === 'forbidden' ? pick(FAST_UI.noFast) : info.rule === 'sunnah' ? pick(FAST_UI.recommended) : ''
    const summary = `${pick(info.title)} · ${hText}${state ? ` · ${state}` : ''}`
    const desc = [pick(info.why), f.estimate ? `${pick(FAST_UI.estimate)}: ${pick(FAST_UI.estimateNote)}` : '', 'https://shajara-prophets.vercel.app/hijri#reminders']
      .filter(Boolean)
      .join('\n')
    lines.push(
      'BEGIN:VEVENT',
      `UID:${f.kind}-${compact(f.day)}@shajara-prophets.vercel.app`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${compact(f.day)}`,
      `DTEND;VALUE=DATE:${compact(nextDay(f.day))}`,
      `SUMMARY:${esc(summary)}`,
      `DESCRIPTION:${esc(desc)}`,
      'TRANSP:TRANSPARENT',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${esc(`${pick(FAST_UI.reminder)}: ${summary}`)}`,
      'TRIGGER:-PT4H',
      'END:VALARM',
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')
  return lines.map(fold).join('\r\n') + '\r\n'
}

/** Starts the download of the calendar file. */
export function downloadIcs(text: string, name = 'shajara-fasting-days.ics') {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
