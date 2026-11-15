// Places and their prayer-time method. Kept apart from the prayer engine (adhan) so the header clock and the
// shared place context load without it.

export type MethodId = 'morocco' | 'mwl' | 'ummalqura' | 'egyptian' | 'isna' | 'turkey'

export interface Place {
  id: string
  name: { en: string; fr: string; ar: string; es: string }
  lat: number
  lng: number
  /** IANA time zone; the device's own zone for "my location". */
  tz: string
  method: MethodId
}

const p = (id: string, en: string, fr: string, ar: string, es: string, lat: number, lng: number, tz: string, method: MethodId): Place => ({
  id, name: { en, fr, ar, es }, lat, lng, tz, method,
})

export const PLACES: Place[] = [
  p('rabat', 'Rabat', 'Rabat', 'الرباط', 'Rabat', 34.0209, -6.8416, 'Africa/Casablanca', 'morocco'),
  p('casablanca', 'Casablanca', 'Casablanca', 'الدار البيضاء', 'Casablanca', 33.5731, -7.5898, 'Africa/Casablanca', 'morocco'),
  p('fes', 'Fez', 'Fès', 'فاس', 'Fez', 34.0181, -5.0078, 'Africa/Casablanca', 'morocco'),
  p('marrakech', 'Marrakesh', 'Marrakech', 'مراكش', 'Marrakech', 31.6295, -7.9811, 'Africa/Casablanca', 'morocco'),
  p('tangier', 'Tangier', 'Tanger', 'طنجة', 'Tánger', 35.7595, -5.834, 'Africa/Casablanca', 'morocco'),
  p('agadir', 'Agadir', 'Agadir', 'أكادير', 'Agadir', 30.4278, -9.5981, 'Africa/Casablanca', 'morocco'),
  p('oujda', 'Oujda', 'Oujda', 'وجدة', 'Uchda', 34.6814, -1.9086, 'Africa/Casablanca', 'morocco'),
  p('makkah', 'Makkah', 'La Mecque', 'مكة المكرمة', 'La Meca', 21.4225, 39.8262, 'Asia/Riyadh', 'ummalqura'),
  p('madinah', 'Madinah', 'Médine', 'المدينة المنورة', 'Medina', 24.4672, 39.6111, 'Asia/Riyadh', 'ummalqura'),
  p('cairo', 'Cairo', 'Le Caire', 'القاهرة', 'El Cairo', 30.0444, 31.2357, 'Africa/Cairo', 'egyptian'),
  p('istanbul', 'Istanbul', 'Istanbul', 'إسطنبول', 'Estambul', 41.0082, 28.9784, 'Europe/Istanbul', 'turkey'),
  p('paris', 'Paris', 'Paris', 'باريس', 'París', 48.8566, 2.3522, 'Europe/Paris', 'mwl'),
  p('brussels', 'Brussels', 'Bruxelles', 'بروكسل', 'Bruselas', 50.8503, 4.3517, 'Europe/Brussels', 'mwl'),
  p('madrid', 'Madrid', 'Madrid', 'مدريد', 'Madrid', 40.4168, -3.7038, 'Europe/Madrid', 'mwl'),
  p('london', 'London', 'Londres', 'لندن', 'Londres', 51.5074, -0.1278, 'Europe/London', 'mwl'),
  p('newyork', 'New York', 'New York', 'نيويورك', 'Nueva York', 40.7128, -74.006, 'America/New_York', 'isna'),
]

/** The method a location most likely follows, from rough country boxes; the reader can change it. */
export function guessMethod(lat: number, lng: number): MethodId {
  if (lat > 27 && lat < 36 && lng > -13.5 && lng < -1) return 'morocco'
  if (lat > 16 && lat < 32.5 && lng > 34.5 && lng < 55.7) return 'ummalqura'
  if (lat > 22 && lat < 31.7 && lng > 25 && lng < 35) return 'egyptian'
  if (lat > 35.8 && lat < 42.2 && lng > 26 && lng < 45) return 'turkey'
  if (lat > 15 && lat < 72 && lng > -170 && lng < -50) return 'isna'
  return 'mwl'
}
