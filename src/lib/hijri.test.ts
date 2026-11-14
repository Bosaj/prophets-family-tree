import { describe, expect, it } from 'vitest'
import { hijri, moroccoDate, nextOccurrence, solarToLunar } from './hijri'

const noon = (ymd: string) => new Date(`${ymd}T12:00:00Z`)

describe('hijri', () => {
  it('gives the Umm al-Qura date', () => {
    expect(hijri(noon('2026-11-13'))).toEqual({ y: 1448, m: 6, d: 3 })
    expect(hijri(noon('2026-11-11'))).toEqual({ y: 1448, m: 6, d: 1 })
  })

  it('differs by method', () => {
    expect(hijri(noon('2026-11-13'), 'civil').d).toBe(2)
    expect(hijri(noon('2026-11-13'), 'astronomical').d).toBe(4)
  })
})

describe('moroccoDate', () => {
  it('matches Bulletin officiel 7556: 17 Jumada al-Ula 1448 = 29 October 2026', () => {
    expect(moroccoDate(noon('2026-10-29'))).toMatchObject({ date: { y: 1448, m: 5, d: 17 }, status: 'official' })
  })

  it('matches the Ministry: 1 Jumada al-Akhirah 1448 = 11 November 2026', () => {
    expect(moroccoDate(noon('2026-11-11'))).toMatchObject({ date: { y: 1448, m: 6, d: 1 }, status: 'official' })
    expect(moroccoDate(noon('2026-11-13'))).toMatchObject({ date: { y: 1448, m: 6, d: 3 }, status: 'official' })
  })

  it('says day 30 is pending until the next announcement, then falls back to an estimate', () => {
    expect(moroccoDate(noon('2026-12-10')).status).toBe('pending')
    expect(moroccoDate(noon('2026-12-20')).status).toBe('estimate')
  })
})

describe('nextOccurrence', () => {
  it('finds the next 1 Shawwal', () => {
    const next = nextOccurrence(10, 1, noon('2026-11-13'))!
    expect(next.h).toEqual({ y: 1448, m: 10, d: 1 })
    expect(next.days).toBeGreaterThan(100)
    expect(next.days).toBeLessThan(140)
  })
})

describe('solarToLunar', () => {
  it('turns 300 solar years into about 309 lunar years (18:25, as Ibn Kathir explains)', () => {
    expect(solarToLunar(300)).toBeCloseTo(309.2, 1)
  })
})
