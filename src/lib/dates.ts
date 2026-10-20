import type { Lang } from '../data/types'

/**
 * Translates era and year abbreviations (BH, AH, BCE, CE, c.) across English, French, and Arabic.
 * Examples:
 *  - "9 BH" -> en: "9 BH", fr: "9 av. H", ar: "9 ق.هـ"
 *  - "610 CE" -> en: "610 CE", fr: "610 ap. J.-C.", ar: "610 م"
 *  - "11 AH" -> en: "11 AH", fr: "11 H", ar: "11 هـ"
 *  - "c. 1300 BCE" -> en: "c. 1300 BCE", fr: "env. 1300 av. J.-C.", ar: "حوالي 1300 ق.م"
 */
export function formatDate(raw: string | undefined | null, lang: Lang): string {
  if (!raw) return ''
  let res = raw.trim()

  if (lang === 'ar') {
    res = res
      .replace(/\bc\.\s*/gi, 'حوالي ')
      .replace(/\bcirca\s*/gi, 'حوالي ')
      .replace(/\bBH\b/gi, 'ق.هـ')
      .replace(/\bAH\b/gi, 'هـ')
      .replace(/\bBCE\b/gi, 'ق.م')
      .replace(/\bCE\b/gi, 'م')
      .replace(/\bBC\b/gi, 'ق.م')
      .replace(/\bAD\b/gi, 'م')
  } else if (lang === 'fr') {
    res = res
      .replace(/\bc\.\s*/gi, 'env. ')
      .replace(/\bcirca\s*/gi, 'env. ')
      .replace(/\bBH\b/gi, 'av. H')
      .replace(/\bAH\b/gi, 'H')
      .replace(/\bBCE\b/gi, 'av. J.-C.')
      .replace(/\bCE\b/gi, 'ap. J.-C.')
      .replace(/\bBC\b/gi, 'av. J.-C.')
      .replace(/\bAD\b/gi, 'ap. J.-C.')
  } else {
    // English defaults
    res = res
      .replace(/\bav\.\s*H\b/gi, 'BH')
      .replace(/\bav\.\s*J\.-C\.\b/gi, 'BCE')
      .replace(/\bap\.\s*J\.-C\.\b/gi, 'CE')
      .replace(/ق\.هـ/g, 'BH')
      .replace(/ق\.م/g, 'BCE')
  }
  return res
}

/**
 * Formats a combined birth or death date string with Hijri & Gregorian in 3 languages.
 * E.g. hijri="9 BH", gregorian="610 CE":
 *  - en: "9 BH (610 CE)"
 *  - fr: "9 av. H (610 ap. J.-C.)"
 *  - ar: "9 ق.هـ (610 م)"
 */
export function formatBirthDeath(
  hijri: string | undefined | null,
  gregorian: string | undefined | null,
  lang: Lang,
): string {
  const h = hijri ? formatDate(hijri, lang) : ''
  const g = gregorian ? formatDate(gregorian, lang) : ''
  if (h && g) return `${h} (${g})`
  if (h) return h
  if (g) return g
  return ''
}
