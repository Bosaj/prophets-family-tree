import type { L3, Level, Ref } from './types'

export const BOOKS: Record<string, L3> = {
  qisas: {
    en: 'Ibn Kathir, Qisas al-Anbiya (Stories of the Prophets), and the classical commentaries',
    fr: 'Ibn Kathir, Qisas al-Anbiya (Histoires des prophètes), et les commentaires classiques',
    ar: 'ابن كثير، قصص الأنبياء، وكتب التفسير',
  },
  tabari: {
    en: 'Al-Tabari, Tarikh al-Rusul wa al-Muluk (History of Prophets and Kings)',
    fr: 'Al-Tabari, Tarikh al-Rusul wa al-Muluk (Histoire des prophètes et des rois)',
    ar: 'الطبري، تاريخ الرسل والملوك',
  },
  sira: {
    en: 'Ibn Hisham, al-Sira al-Nabawiyya, and the hadith collections',
    fr: 'Ibn Hicham, al-Sira al-Nabawiyya, et les recueils de hadiths',
    ar: 'ابن هشام، السيرة النبوية، وكتب الحديث',
  },
  bible: {
    en: 'The Biblical account, as reported by historians — not an Islamic source',
    fr: 'Le récit biblique, rapporté par les historiens — pas une source islamique',
    ar: 'الرواية التوراتية كما ينقلها المؤرخون — ليست مصدرًا إسلاميًّا',
  },
  historians: {
    en: 'Estimates of modern historians — not from Islamic sources',
    fr: 'Estimations des historiens modernes — pas des sources islamiques',
    ar: 'تقديرات المؤرخين المعاصرين — لا من المصادر الإسلامية',
  },
}

const HADITH_BOOK: Record<string, L3> = {
  bukhari: { en: 'Sahih al-Bukhari', fr: 'Sahih al-Bukhari', ar: 'صحيح البخاري' },
  muslim: { en: 'Sahih Muslim', fr: 'Sahih Muslim', ar: 'صحيح مسلم' },
  tirmidhi: { en: 'Jami‘ al-Tirmidhi', fr: 'Jami‘ at-Tirmidhi', ar: 'جامع الترمذي' },
}

export type ParsedRef =
  | { kind: 'quran'; s: number; a: number; to: number; raw: Ref }
  | { kind: 'hadith'; book: string; n: number; raw: Ref }
  | { kind: 'book'; key: string; raw: Ref }

export function parseRef(raw: Ref): ParsedRef {
  const q = /^(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?$/.exec(raw)
  if (q) {
    const a = Number(q[2])
    return { kind: 'quran', s: Number(q[1]), a, to: q[3] ? Number(q[3]) : a, raw }
  }
  const h = /^(bukhari|muslim|tirmidhi):(\d+)$/.exec(raw)
  if (h) return { kind: 'hadith', book: h[1]!, n: Number(h[2]), raw }
  const b = /^book:([a-z]+)$/.exec(raw)
  if (b && BOOKS[b[1]!]) return { kind: 'book', key: b[1]!, raw }
  throw new Error(`Bad source reference: ${raw}`)
}

export function refLabel(raw: Ref, lang: keyof L3): string {
  const p = parseRef(raw)
  if (p.kind === 'quran') {
    // Isolate the numbers left-to-right so "20:9–98" never flips inside Arabic text.
    const span = `⁦${p.to > p.a ? `${p.s}:${p.a}–${p.to}` : `${p.s}:${p.a}`}⁩`
    return lang === 'ar' ? `القرآن ${span}` : lang === 'fr' ? `Coran ${span}` : `Qur’an ${span}`
  }
  if (p.kind === 'hadith') return `${HADITH_BOOK[p.book]![lang]} ⁦${p.n}⁩`
  return BOOKS[p.key]![lang]
}

export function refUrl(raw: Ref): string | null {
  const p = parseRef(raw)
  if (p.kind === 'quran') return `https://quran.com/${p.s}/${p.a}${p.to > p.a ? `-${p.to}` : ''}`
  if (p.kind === 'hadith') return `https://sunnah.com/${p.book}:${p.n}`
  return null
}

export const LEVELS: Level[] = ['quran', 'hadith', 'tradition', 'disputed']
