import { describe, expect, it } from 'vitest'
import { PLACES, currentPart, dayTimes, guessMethod, nextPrayer } from './prayerTimes'

const utc = (d: Date) => d.toISOString().slice(11, 16)
const rabat = PLACES.find((p) => p.id === 'rabat')!

describe('prayer times', () => {
  it('matches the Moroccan Ministry of Habous table for Rabat, 6 November 2026 (UTC)', () => {
    const d = dayTimes(rabat, new Date(Date.UTC(2026, 10, 6, 12)))
    // Ministry table: 05:21 06:51 12:16 15:09 17:35 18:51
    expect(utc(d.fajr)).toBe('05:21')
    expect(utc(d.sunrise)).toBe('06:51')
    expect(utc(d.dhuhr)).toBe('12:16')
    expect(['15:08', '15:09', '15:10']).toContain(utc(d.asr))
    expect(utc(d.maghrib)).toBe('17:35')
    expect(utc(d.isha)).toBe('18:51')
  })

  it('guesses the local method from the coordinates', () => {
    expect(guessMethod(34.02, -6.84)).toBe('morocco')
    expect(guessMethod(21.42, 39.83)).toBe('ummalqura')
    expect(guessMethod(40.42, -3.7)).toBe('mwl')
    expect(guessMethod(40.71, -74.0)).toBe('isna')
  })

  it('finds the part of the day and the next prayer', () => {
    const day = new Date(Date.UTC(2026, 10, 6, 12))
    const today = dayTimes(rabat, day)
    const yesterday = dayTimes(rabat, new Date(Date.UTC(2026, 10, 5, 12)))
    const tomorrow = dayTimes(rabat, new Date(Date.UTC(2026, 10, 7, 12)))
    expect(currentPart(new Date(Date.UTC(2026, 10, 6, 5, 40)), today, yesterday)).toBe('fajr')
    expect(currentPart(new Date(Date.UTC(2026, 10, 6, 9, 0)), today, yesterday)).toBe('duha')
    expect(currentPart(new Date(Date.UTC(2026, 10, 6, 13, 0)), today, yesterday)).toBe('dhuhr')
    expect(currentPart(new Date(Date.UTC(2026, 10, 6, 4, 0)), today, yesterday)).toBe('lastThird')
    expect(nextPrayer(new Date(Date.UTC(2026, 10, 6, 13, 0)), today, tomorrow).key).toBe('asr')
    expect(nextPrayer(new Date(Date.UTC(2026, 10, 6, 22, 0)), today, tomorrow)).toMatchObject({ key: 'fajr', at: tomorrow.fajr })
  })
})
