// The twelve Hijri month names, without the rest of the calendar page, for the header clock and the home card.
// A test checks they match MONTHS in hijri.ts.
import type { L4 } from './types'

export const MONTH_NAMES: L4[] = [
  { en: "Muharram", fr: "Mouharram", ar: "محرم", es: "Muharram" },
  { en: "Safar", fr: "Safar", ar: "صفر", es: "Safar" },
  { en: "Rabi‘ al-Awwal", fr: "Rabi‘ al-Awwal", ar: "ربيع الأول", es: "Rabi‘ al-Awwal" },
  { en: "Rabi‘ al-Akhir", fr: "Rabi‘ al-Akhir", ar: "ربيع الآخر", es: "Rabi‘ al-Ajir" },
  { en: "Jumada al-Ula", fr: "Joumada al-Oula", ar: "جمادى الأولى", es: "Yumada al-Ula" },
  { en: "Jumada al-Akhirah", fr: "Joumada al-Akhira", ar: "جمادى الآخرة", es: "Yumada al-Ajira" },
  { en: "Rajab", fr: "Rajab", ar: "رجب", es: "Rayab" },
  { en: "Sha‘ban", fr: "Cha‘ban", ar: "شعبان", es: "Sha‘ban" },
  { en: "Ramadan", fr: "Ramadan", ar: "رمضان", es: "Ramadán" },
  { en: "Shawwal", fr: "Chawwal", ar: "شوال", es: "Shawwal" },
  { en: "Dhu al-Qa‘dah", fr: "Dhou al-Qa‘da", ar: "ذو القعدة", es: "Dhu al-Qa‘da" },
  { en: "Dhu al-Hijjah", fr: "Dhou al-Hijja", ar: "ذو الحجة", es: "Dhu al-Hiyya" },
]
