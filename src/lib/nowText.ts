// Texts and formatting shared by the header clock and the home card, kept light (no prayer engine, no page data).
import type { L4, Lang } from '../data/types'
import { MONTH_NAMES } from '../data/hijriMonths'
import type { HDate } from './hijri'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })
export const LOCALE: Record<Lang, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-MA', es: 'es-ES' }
const ERA: Record<Lang, string> = { en: 'AH', fr: 'H', ar: 'هـ', es: 'H' }

export const NOW_UI = {
  label: t('Your place and time', 'Votre lieu et votre heure', 'مكانك ووقتك', 'Tu lugar y tu hora'),
  device: t('This device', 'Cet appareil', 'هذا الجهاز', 'Este dispositivo'),
  place: t('Place', 'Lieu', 'المكان', 'Lugar'),
  locate: t('Use my location', 'Utiliser ma position', 'استعمل موقعي', 'Usar mi ubicación'),
  locating: t('Locating…', 'Localisation…', 'جارٍ تحديد الموقع…', 'Localizando…'),
  denied: t('Location unavailable: choose a city.', 'Position indisponible : choisissez une ville.', 'تعذر تحديد الموقع: اختر مدينة.', 'Ubicación no disponible: elige una ciudad.'),
  now: t('Now', 'Maintenant', 'الآن', 'Ahora'),
  next: t('Next prayer', 'Prochaine prière', 'الصلاة القادمة', 'Próxima oración'),
  nightOf: t('Since Maghrib: the night of', 'Depuis le Maghrib : la nuit du', 'منذ المغرب: ليلة', 'Desde el Magrib: la noche del'),
  times: t('Prayer times and the day', 'Horaires et la journée', 'المواقيت واليوم', 'Horarios y el día'),
  calendar: t('The Hijri calendar', 'Le calendrier hégirien', 'التقويم الهجري', 'El calendario hégira'),
  estimate: t('estimate', 'estimation', 'تقدير', 'estimación'),
}

export function hijriText(h: HDate, lang: Lang, pick: (v: L4) => string) {
  return `${h.d} ${pick(MONTH_NAMES[h.m - 1]!)} ${h.y} ${ERA[lang]}`
}

