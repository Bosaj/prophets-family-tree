// Checks every supplication and remembrance against the hadith it cites.
//  1. The Arabic words (or the `src` fragments, for texts that join two narrations) appear in the first
//     hadith of `r`, in order, ignoring vowel marks and punctuation (fawazahmed0/hadith-api, Arabic).
//  2. Every hadith and Qur'an reference of the duas, the day guide and the prayers exists.
//  3. Every Abu Dawud and Tirmidhi entry shows a grade, and the grade printed by the API is listed.
// Muslim is matched by its ‘Abd al-Baqi number (the numbering sunnah.com links use).
// Run: npm run verify:duas   (needs network)
import { LIFE_MOMENTS, HARDSHIP_DUAS } from '../src/data/duas.ts'
import { ADHKAR, DAY_PARTS, FRIDAY, PRAYERS } from '../src/data/awqat.ts'
import { parseRef } from '../src/data/sources.ts'
import { HOUR_PARTS, HOUR_QUOTES } from '../src/data/hour.ts'
import { HIJRI_QUOTES, HIJRI_REFS } from '../src/data/hijri.ts'

const BASES = ['https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1', 'https://raw.githubusercontent.com/fawazahmed0/hadith-api/1']

async function getJson(path) {
  for (const base of BASES) {
    for (let i = 0; i < 3; i++) {
      try {
        const r = await fetch(`${base}/${path}`)
        if (r.status === 404) break
        if (r.ok) return await r.json()
      } catch {
        /* retry */
      }
      await new Promise((res) => setTimeout(res, 400 * 2 ** i))
    }
  }
  return null
}

/** Letters only: no vowel marks, one form of alif, ya, ta marbuta and hamza seats, no spaces. */
export const norm = (s) =>
  s
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[^ء-ي]/g, '')

let muslim = null
const cache = new Map()
async function hadithText(book, n) {
  const key = `${book}:${n}`
  if (cache.has(key)) return cache.get(key)
  let ar = null
  let grades = []
  if (book === 'muslim') {
    muslim ??= (await getJson('editions/ara-muslim.min.json'))?.hadiths ?? []
    const hs = muslim.filter((h) => Math.floor(Number(h.arabicnumber)) === n)
    ar = hs.length ? hs.map((h) => h.text).join(' ') : null
  } else {
    const j = await getJson(`editions/ara-${book}/${n}.json`)
    ar = j?.hadiths?.map((h) => h.text).join(' ') ?? null
    if (ar && book !== 'bukhari') {
      const e = await getJson(`editions/eng-${book}/${n}.json`)
      grades = (e?.hadiths?.[0]?.grades ?? []).map((g) => `${g.name}: ${g.grade}`)
    }
  }
  const v = { ar, grades }
  cache.set(key, v)
  return v
}

/** Each comma-separated part of the text must appear in the source, in order. */
function contains(source, text) {
  const hay = norm(source)
  let from = 0
  for (const part of text.split(/[،,؛.…]/)) {
    const needle = norm(part)
    if (!needle) continue
    const at = hay.indexOf(needle, from)
    if (at < 0) return part.trim()
    from = at + needle.length
  }
  return null
}

const items = [
  ...LIFE_MOMENTS.flatMap((m) => m.duas.map((d) => ({ where: `duas/${m.id}/${d.id}`, ...d }))),
  ...HARDSHIP_DUAS.map((d) => ({ where: `duas/hardship/${d.id}`, ...d })),
  ...Object.values(ADHKAR).map((d) => ({ where: `adhkar/${d.id}`, ...d })),
  // 2.7.0: the beginning of creation, the signs of the Hour and the end
  ...HOUR_QUOTES,
  // 2.8.0: the Hijri calendar, its months and the two Eids
  ...HIJRI_QUOTES,
]
const refsOnly = [
  ...DAY_PARTS.flatMap((p) => p.guide.map((g, i) => ({ where: `day/${p.id}/${i}`, r: g.r }))),
  { where: 'day/friday', r: FRIDAY.r },
  ...PRAYERS.map((p) => ({ where: `prayer/${p.id}`, r: p.r ?? [] })),
]

// Pages added in 2.5.0 that quote no Arabic but cite sources: every reference must exist.
const { INTRO, PILLARS, QUESTIONS } = await import('../src/data/islam.ts')
const { SAHABA_STORIES } = await import('../src/data/sahabaStories.ts')
const { SALIHIN_STEPS } = await import('../src/data/salihinDetail.ts')
const { WHY_MENTIONED } = await import('../src/data/natureWisdom.ts')
refsOnly.push(
  ...[...INTRO, ...PILLARS, ...QUESTIONS].map((p, i) => ({ where: `islam/${i}`, r: p.r })),
  ...Object.entries(SAHABA_STORIES).flatMap(([id, s]) => [...s.challenges, ...s.sacrifices].map((p, i) => ({ where: `sahaba/${id}/${i}`, r: p.r }))),
  ...Object.entries(SALIHIN_STEPS).flatMap(([id, steps]) => steps.map((p, i) => ({ where: `salihin/${id}/${i}`, r: p.r }))),
  ...Object.entries(WHY_MENTIONED).map(([id, w]) => ({ where: `nature/${id}`, r: w.r })),
  ...HOUR_PARTS.flatMap((p) => p.steps.map((st) => ({ where: `hour/${p.id}/${st.id}`, r: st.r }))),
  ...HIJRI_REFS,
)

// Ayah counts per surah, to check that every Qur'an reference points at verses that exist.
const meta = (await (await fetch('https://api.alquran.cloud/v1/meta')).json()).data.surahs.references
const ayahs = Object.fromEntries(meta.map((s) => [s.number, s.numberOfAyahs]))

const problems = []
let checked = 0

for (const it of [...items, ...refsOnly]) {
  for (const raw of it.r ?? []) {
    const p = parseRef(raw)
    if (p.kind === 'quran' && !(ayahs[p.s] && p.to <= ayahs[p.s] && p.a >= 1 && p.a <= p.to)) problems.push(`${it.where}: Qur'an ${raw} does not exist`)
  }
  if (it.verse) {
    const p = parseRef(it.verse)
    if (p.kind === 'quran' && !(ayahs[p.s] && p.to <= ayahs[p.s])) problems.push(`${it.where}: verse ${it.verse} does not exist`)
  }
}

for (const it of items) {
  for (const raw of it.r) {
    const p = parseRef(raw)
    if (p.kind === 'hadith') {
      const { ar } = await hadithText(p.book, p.n)
      if (!ar) problems.push(`${it.where}: ${raw} not found`)
    }
  }
  const first = parseRef(it.r[0])
  if (first.kind !== 'hadith') continue
  const { ar, grades } = await hadithText(first.book, first.n)
  if (!ar) continue
  const parts = it.src ?? (it.ar ? [it.ar.replace(/…$/, '')] : [])
  for (const part of parts) {
    const missing = contains(ar, part)
    if (missing) problems.push(`${it.where}: "${missing}" is not in ${it.r[0]}`)
    else checked++
  }
  if (['abudawud', 'tirmidhi', 'nasai', 'ibnmajah'].includes(first.book)) {
    if (!it.grade) problems.push(`${it.where}: ${it.r[0]} needs a grade`)
    console.log(`  ${it.r[0]} — ${grades.join('; ') || 'no grade in the API'}`)
  }
}

for (const it of refsOnly) {
  for (const raw of it.r) {
    const p = parseRef(raw)
    if (p.kind !== 'hadith') continue
    const { ar } = await hadithText(p.book, p.n)
    if (!ar) problems.push(`${it.where}: ${raw} not found`)
  }
}

console.log(`\n${checked} Arabic texts found in their sources.`)
if (problems.length) {
  console.log(`${problems.length} problem(s):`)
  for (const p of problems) console.log('  ✗ ' + p)
  process.exit(1)
}
console.log('All supplications match their sources.')
