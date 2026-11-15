import { describe, expect, it } from 'vitest'
import { fastingIcs, kindOf, upcomingFastDays } from './fastDays'

const pick = (v: { en: string }) => v.en

describe('fasting days', () => {
  it('names the recommended days and the Eids', () => {
    expect(kindOf({ y: 1448, m: 6, d: 13 })).toBe('white')
    expect(kindOf({ y: 1448, m: 9, d: 14 })).toBeNull() // Ramadan is fasted anyway
    expect(kindOf({ y: 1448, m: 12, d: 13 })).toBeNull() // a day of tashriq
    expect(kindOf({ y: 1448, m: 12, d: 14 })).toBe('white')
    expect(kindOf({ y: 1448, m: 12, d: 9 })).toBe('arafah')
    expect(kindOf({ y: 1449, m: 1, d: 10 })).toBe('ashura')
    expect(kindOf({ y: 1448, m: 10, d: 1 })).toBe('fitr')
  })

  it('counts Morocco from the Habous announcement: 1 Jumada al-Akhirah 1448 = 11 Nov 2026', () => {
    const days = upcomingFastDays(new Date('2026-11-15T10:00:00Z'), 'Africa/Casablanca', 30)
    const white = days.filter((d) => d.kind === 'white' && d.h.m === 6).map((d) => d.day)
    expect(white).toEqual(['2026-11-23', '2026-11-24', '2026-11-25'])
    expect(days.find((d) => d.day === '2026-11-23')!.estimate).toBe(false)
  })

  it('writes a valid calendar with an alarm the evening before', () => {
    const days = upcomingFastDays(new Date('2026-11-15T10:00:00Z'), 'Asia/Riyadh', 60)
    const ics = fastingIcs(days, pick as never, new Date('2026-11-15T00:00:00Z'))
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true)
    expect(ics.trimEnd().endsWith('END:VCALENDAR')).toBe(true)
    expect(ics.match(/BEGIN:VEVENT/g)!.length).toBe(days.length)
    expect(ics).toContain('TRIGGER:-PT4H')
    // every physical line is at most 75 octets
    for (const line of ics.split('\r\n')) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75)
  })
})
