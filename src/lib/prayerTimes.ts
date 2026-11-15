import { CalculationMethod, CalculationParameters, Coordinates, HighLatitudeRule, PrayerTimes, SunnahTimes } from 'adhan'
import type { DayPartId } from '../data/awqat'

import type { MethodId, Place } from './places'
export { PLACES, guessMethod, type MethodId, type Place } from './places'

/**
 * Parameters of each method. Morocco follows the Ministry of Habous: Fajr at 19°, ‘Isha at 17°, and
 * Dhuhr +5 min, ‘Asr +1, Maghrib +5. Checked on 2026-11-01..06 against the Ministry's table for Rabat:
 * Fajr, sunrise, Dhuhr, Maghrib and ‘Isha match to the minute, ‘Asr within one minute.
 */
export function methodParams(m: MethodId, coords: Coordinates): CalculationParameters {
  let params: CalculationParameters
  switch (m) {
    case 'morocco':
      params = CalculationMethod.Other()
      params.fajrAngle = 19
      params.ishaAngle = 17
      params.methodAdjustments = { fajr: 0, sunrise: 0, dhuhr: 5, asr: 1, maghrib: 5, isha: 0 }
      break
    case 'ummalqura':
      params = CalculationMethod.UmmAlQura()
      break
    case 'egyptian':
      params = CalculationMethod.Egyptian()
      break
    case 'isna':
      params = CalculationMethod.NorthAmerica()
      break
    case 'turkey':
      params = CalculationMethod.Turkey()
      break
    default:
      params = CalculationMethod.MuslimWorldLeague()
  }
  params.highLatitudeRule = HighLatitudeRule.recommended(coords)
  return params
}


export interface DayTimes {
  fajr: Date
  sunrise: Date
  dhuhr: Date
  asr: Date
  maghrib: Date
  isha: Date
  /** Start of the last third of the coming night. */
  lastThird: Date
}

export function dayTimes(place: Pick<Place, 'lat' | 'lng' | 'method'>, date: Date): DayTimes {
  const coords = new Coordinates(place.lat, place.lng)
  const params = methodParams(place.method, coords)
  const pt = new PrayerTimes(coords, date, params)
  const sunnah = new SunnahTimes(pt)
  return { fajr: pt.fajr, sunrise: pt.sunrise, dhuhr: pt.dhuhr, asr: pt.asr, maghrib: pt.maghrib, isha: pt.isha, lastThird: sunnah.lastThirdOfTheNight }
}

const MIN = 60_000

/** Which part of the day guide `now` falls in. The edges around sunrise, noon and sunset are approximate. */
export function currentPart(now: Date, today: DayTimes, yesterday: DayTimes): DayPartId {
  const n = now.getTime()
  if (n < today.fajr.getTime()) return n >= yesterday.lastThird.getTime() ? 'lastThird' : 'isha'
  if (n < today.sunrise.getTime()) return 'fajr'
  if (n < today.sunrise.getTime() + 15 * MIN) return 'sunrise'
  if (n < today.dhuhr.getTime() - 10 * MIN) return 'duha'
  if (n < today.dhuhr.getTime()) return 'zenith'
  if (n < today.asr.getTime()) return 'dhuhr'
  if (n < today.maghrib.getTime() - 15 * MIN) return 'asr'
  if (n < today.maghrib.getTime()) return 'sunset'
  if (n < today.isha.getTime()) return 'maghrib'
  if (n < today.lastThird.getTime()) return 'isha'
  return 'lastThird'
}

export type PrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'
const ORDER: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

/** The next of the five prayers after `now`, looking into tomorrow after ‘Isha. */
export function nextPrayer(now: Date, today: DayTimes, tomorrow: DayTimes): { key: PrayerKey; at: Date } {
  for (const key of ORDER) if (today[key].getTime() > now.getTime()) return { key, at: today[key] }
  return { key: 'fajr', at: tomorrow.fajr }
}
