import type { Lang } from '../data/types'
import { parseRef } from '../data/sources'

/** Translation shown under the Uthmani text, per site language (Arabic gets al-Tafsir al-Muyassar). */
export const TRANSLATION: Record<Lang, string> = { en: 'en.sahih', fr: 'fr.hamidullah', ar: 'ar.muyassar' }

export interface Ayah {
  surah: number
  ayah: number
  /** Global ayah number (1-6236), used for the recitation file. */
  number: number
  arabic: string
  translation: string
}

export interface Passage {
  surahName: string
  surahNameEn: string
  ayahs: Ayah[]
}

const MAX_AYAHS = 12
const cache = new Map<string, Promise<Passage>>()

export const audioUrl = (number: number) => `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${number}.mp3`

interface ApiAyah {
  number: number
  numberInSurah: number
  text: string
}
interface ApiEdition {
  ayahs: ApiAyah[]
  name: string
  englishName: string
}

/** Fetch a passage (at most MAX_AYAHS verses) with the Uthmani text and a translation. */
export function loadPassage(ref: string, lang: Lang, fetcher: typeof fetch = fetch): Promise<Passage> {
  const p = parseRef(ref)
  if (p.kind !== 'quran') return Promise.reject(new Error('not a Qur’an reference'))
  const key = `${ref}|${lang}`
  const hit = cache.get(key)
  if (hit) return hit
  const limit = Math.min(p.to - p.a + 1, MAX_AYAHS)
  const url = `https://api.alquran.cloud/v1/surah/${p.s}/editions/quran-uthmani,${TRANSLATION[lang]}?offset=${p.a - 1}&limit=${limit}`
  const job = fetcher(url)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return r.json() as Promise<{ data: ApiEdition[] }>
    })
    .then(({ data }) => {
      const [uth, tr] = data
      if (!uth || !tr) throw new Error('missing edition')
      return {
        surahName: uth.name,
        surahNameEn: uth.englishName,
        ayahs: uth.ayahs.map((a, i) => ({
          surah: p.s,
          ayah: a.numberInSurah,
          number: a.number,
          arabic: stripBasmala(a.text, p.s, a.numberInSurah),
          translation: tr.ayahs[i]?.text ?? '',
        })),
      }
    })
  job.catch(() => cache.delete(key))
  cache.set(key, job)
  return job
}

/** The API prefixes verse 1 of each surah (except 1 and 9) with the basmala; show it separately. */
function stripBasmala(text: string, s: number, a: number): string {
  if (a !== 1 || s === 1 || s === 9 || !text.startsWith('بِسْمِ')) return text
  const parts = text.split(' ')
  return parts.length > 4 ? parts.slice(4).join(' ') : text
}

/** Arabic-Indic digits for verse markers. */
export const arabicDigits = (n: number) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]!)
