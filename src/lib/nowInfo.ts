import { currentPart, dayTimes, nextPrayer, type Place } from './prayerTimes'
import { hijriForPlace } from './hijri'

/** Noon of the calendar day `offset` days from `now` in time zone `tz`, as a Date for the prayer engine. */
export function dayIn(tz: string, now: Date, offset: number): Date {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
  const [y, m, d] = parts.split('-').map(Number) as [number, number, number]
  return new Date(Date.UTC(y, m - 1, d + offset, 12))
}

/** What "now" means at a place: the part of the day, the next prayer, today's times and the Hijri date. */
export function nowInfo(place: Place, now: Date) {
  const today = dayTimes(place, dayIn(place.tz, now, 0))
  const yesterday = dayTimes(place, dayIn(place.tz, now, -1))
  const tomorrow = dayTimes(place, dayIn(place.tz, now, 1))
  return {
    today,
    part: currentPart(now, today, yesterday),
    next: nextPrayer(now, today, tomorrow),
    hijri: hijriForPlace(now, place.tz),
    /** The Hijri day begins at Maghrib: after it, this is the date of the night that has begun. */
    nightOf: now >= today.maghrib ? hijriForPlace(new Date(now.getTime() + 86_400_000), place.tz).date : null,
  }
}
