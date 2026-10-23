// Audits every dataset (not only people/links) against the real texts.
//   node scripts/audit-content.mjs [--json out.json]
// 1. Qur'an references exist.
// 2. Arabic Qur'an text typed in the data matches the Mushaf (diacritics ignored).
// 3. Hadith references exist, and quoted English text matches the hadith it cites.
import fs from 'node:fs'
import { people, ululAzm } from '../src/data/people.ts'
import { links } from '../src/data/links.ts'
import { QURAN_SUNNAH_ANIMALS, QURAN_SUNNAH_PLANTS } from '../src/data/nature.ts'
import { SCIENTIFIC_FACTS } from '../src/data/science.ts'
import { FAMOUS_ANGELS, PRE_ADAM_ENTITIES } from '../src/data/preAdam.ts'
import { STATURE_SCALE_DATA, PROPHETIC_DESCRIPTIONS } from '../src/data/stature.ts'
import { SAHABA_FIGURES } from '../src/data/sahaba.ts'
import { SALIHIN_DATA, QURANIC_STORIES } from '../src/data/salihin.ts'
import { SCRIPTURES } from '../src/data/scriptures.ts'

const out = { quranMissing: [], arabicMismatch: [], hadithMissing: [], hadithMismatch: [], doiMissing: [], unverifiable: [] }

// ---------- collect ----------
const quranRefs = [] // { where, ref }
const arabic = [] // { where, s, a, to, text }
const hadith = [] // { where, book, n, claim }

const addQ = (where, ref) => ref && quranRefs.push({ where, ref: String(ref).trim() })
const BOOKS = [
  [/bukh[aā]r[iī]/i, 'bukhari'],
  [/muslim/i, 'muslim'],
  [/tirmidh[iī]/i, 'tirmidhi'],
  [/ab[uiī]\s*d[aā]w[uū]d/i, 'abudawud'],
  [/nas[aā]['’]?[iī]/i, 'nasai'],
  [/ibn\s*m[aā]jah/i, 'ibnmajah'],
  [/muwatt?a|malik/i, 'malik'],
]
function addH(where, source, number, claim) {
  const s = `${source ?? ''} ${number ?? ''}`
  // split "Sahih al-Bukhari (119, 99), Sahih Muslim (2492)" into book chunks
  const parts = s.split(/(?=Sahih|Sunan|Jami|Musnad|Muwatta|Al-|Shama|Siyar|Tadhkirat|Tafsir)/i).filter((x) => x.trim())
  let any = false
  for (const part of parts) {
    const hit = BOOKS.find(([re]) => re.test(part))
    if (!hit) {
      if (/\d/.test(part) || /musnad|mustadrak|mu['’]?jam|tafsir|siyar|shama/i.test(part)) out.unverifiable.push({ where, source: part.trim() })
      continue
    }
    const nums = [...part.replace(/\(\d+\/\d+\)/g, '').matchAll(/\b(\d{1,5})\b/g)].map((m) => Number(m[1]))
    if (!nums.length) {
      out.unverifiable.push({ where, source: part.trim(), why: 'no number' })
      continue
    }
    for (const n of nums) hadith.push({ where, book: hit[1], n, claim })
    any = true
  }
  return any
}

for (const p of people) {
  const facts = [p.title, p.role, p.era, p.sentTo, p.place, p.scripture, p.lifespan, p.marriage, p.children, ...(p.signs ?? []), ...(p.notes ?? [])]
  for (const f of facts) for (const r of f?.r ?? []) if (!r.startsWith('book:') && !r.includes(':') === false) {
    if (/^(bukhari|muslim|tirmidhi):/.test(r)) { const [b, n] = r.split(':'); hadith.push({ where: `people.${p.id}`, book: b, n: Number(n) }) }
    else if (/^\d/.test(r)) addQ(`people.${p.id}`, r)
  }
  for (const r of p.verses ?? []) addQ(`people.${p.id}.verses`, r)
}
for (const k of links) for (const r of k.r ?? []) {
  if (/^(bukhari|muslim|tirmidhi):/.test(r)) { const [b, n] = r.split(':'); hadith.push({ where: `link.${k.from}-${k.to}`, book: b, n: Number(n) }) }
  else if (/^\d/.test(r)) addQ(`link.${k.from}-${k.to}`, r)
}
for (const r of ululAzm.r ?? []) addQ('ululAzm', r)

for (const e of [...QURAN_SUNNAH_ANIMALS, ...QURAN_SUNNAH_PLANTS]) {
  for (const r of e.quranRefs ?? []) addQ(`nature.${e.id}`, r)
  for (const h of e.hadithRefs ?? []) addH(`nature.${e.id}`, h.book, h.number, h.text?.en)
  if (e.arabicCalligraphy) arabic.push({ where: `nature.${e.id}.arabicCalligraphy`, refs: e.quranRefs ?? [], text: e.arabicCalligraphy, phrase: true })
}
for (const f of SCIENTIFIC_FACTS) {
  for (const r of f.quranRefs ?? []) addQ(`science.${f.id}`, r)
  for (const h of f.hadithRefs ?? []) addH(`science.${f.id}`, h.book, h.number, h.text?.en)
  if (f.quranVerseText) arabic.push({ where: `science.${f.id}.quranVerseText`, refs: f.quranRefs ?? [], text: f.quranVerseText.ar, phrase: true })
}
for (const a of FAMOUS_ANGELS) {
  for (const r of a.quranRefs ?? []) addQ(`angel.${a.id}`, r)
  for (const h of a.hadithRefs ?? []) addH(`angel.${a.id}`, h, '', a.appearance?.en)
}
for (const e of PRE_ADAM_ENTITIES) {
  for (const r of e.quranRefs ?? []) addQ(`preAdam.${e.id}`, r)
  for (const a of e.famousAngels ?? []) for (const h of a.hadithRefs ?? []) addH(`preAdam.${e.id}.${a.id}`, h, '')
}
for (const s of STATURE_SCALE_DATA) if (s.textRef) {
  if (/^(bukhari|muslim|tirmidhi):/.test(s.textRef)) { const [b, n] = s.textRef.split(':'); hadith.push({ where: `stature.${s.id}`, book: b, n: Number(n), claim: s.hadithText?.en }) }
  else addQ(`stature.${s.id}`, s.textRef)
}
for (const d of PROPHETIC_DESCRIPTIONS) for (const n of d.authenticNarrations ?? []) addH(`description.${d.id}`, n.source, n.hadithNumber, n.text?.en)
for (const s of SAHABA_FIGURES) if (s.propheticPraise?.hadithSource) addH(`sahaba.${s.id}`, s.propheticPraise.hadithSource, '', s.propheticPraise.en)
for (const s of SALIHIN_DATA) for (const r of s.quranRefs ?? []) addQ(`salihin.${s.id}`, r)
for (const s of QURANIC_STORIES) for (const r of s.verses ?? []) addQ(`story.${s.id}`, r)
for (const b of SCRIPTURES) for (const q of b.quranReferences ?? []) {
  addQ(`scripture.${b.id}`, `${q.surah}:${q.ayah}`)
  arabic.push({ where: `scripture.${b.id}.${q.surah}:${q.ayah}`, refs: [`${q.surah}:${q.ayah}`], text: q.arabicText })
}

// ---------- Qur'an ----------
const clean = (await (await fetch('https://api.alquran.cloud/v1/quran/quran-simple-clean')).json()).data.surahs
const parse = (ref) => {
  const m = /^(\d{1,3}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?$/.exec(ref.replace(/\s+/g, ''))
  return m ? { s: +m[1], a: +m[2], to: m[3] ? +m[3] : +m[2] } : null
}
for (const { where, ref } of quranRefs) {
  const p = parse(ref)
  const s = p && clean[p.s - 1]
  if (!p || !s || p.a < 1 || p.to > s.ayahs.length || p.to < p.a) out.quranMissing.push({ where, ref })
}
const norm = (t) => t
  .normalize('NFKD')
  .replace(/[ً-ٰٟۖ-ۭـ࣓-ࣿ]/g, '')
  .replace(/[ٱأإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ء/g, '')
  .replace(/[^ء-ي]/g, '')
for (const x of arabic) {
  const want = norm(x.text ?? '')
  // Arabic with no Qur'an reference is a hadith quotation or a title, not a verse.
  if (!want || !x.refs.length) continue
  const texts = x.refs.map(parse).filter(Boolean).map((p) => clean[p.s - 1]?.ayahs.slice(p.a - 1, p.to).map((a) => a.text).join(' ') ?? '')
  const real = norm(texts.join(' '))
  if (!real.includes(want)) out.arabicMismatch.push({ where: x.where, refs: x.refs, typed: x.text.slice(0, 120), mushaf: texts.join(' ').slice(0, 160) })
}

// ---------- every ﴿…﴾ quotation in the source code must be Qur'an text ----------
{
  const { readdirSync, statSync, readFileSync } = fs
  const files = []
  const walk = (d) => { for (const f of readdirSync(d)) { const p = `${d}/${f}`; if (statSync(p).isDirectory()) walk(p); else if (/\.(ts|tsx)$/.test(f) && !/test/.test(f)) files.push(p) } }
  walk('src')
  const mushaf = norm(clean.flatMap((s) => s.ayahs.map((a) => a.text)).join(' '))
  out.bracketMismatch = []
  for (const f of files) {
    const src = readFileSync(f, 'utf8')
    for (const m of src.matchAll(/﴿([^﴾]{3,600})﴾/g)) {
      const parts = m[1].split(/\.{3}|…/).map(norm).filter((x) => x.length > 6)
      if (!parts.every((p) => mushaf.includes(p))) out.bracketMismatch.push({ where: `${f}:${src.slice(0, m.index).split(String.fromCharCode(10)).length}`, text: m[1].slice(0, 100) })
    }
  }
}

// ---------- hadith ----------
const muslim = (await (await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.min.json')).json()).hadiths
const cache = new Map()
async function hadithText(book, n) {
  const key = `${book}:${n}`
  if (cache.has(key)) return cache.get(key)
  let text = ''
  if (book === 'muslim') text = muslim.filter((h) => Math.floor(Number(h.arabicnumber)) === n).map((h) => h.text).join(' ')
  else {
    try {
      const j = await (await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${book}/${n}.json`)).json()
      text = (j.hadiths ?? []).map((h) => h.text).join(' ')
      // Some English editions have the number but no translated text; the hadith still exists.
      if (!text.trim() && (j.hadiths ?? []).some((h) => Number(h.hadithnumber) === n)) text = ' (exists, no English text) '
    } catch { text = '' }
  }
  cache.set(key, text)
  return text
}
const STOP = new Set('which their there these those about after before would could should shall while where whose being under other again every never ever into from with that this have been were they them then than what when will your yours upon unto over said says allah prophet messenger peace blessings narrated people said'.split(' '))
const words = (t) => [...new Set((t ?? '').toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter((w) => w.length > 4 && !STOP.has(w)))]
for (const h of hadith) {
  const text = await hadithText(h.book, h.n)
  if (!text.trim()) { out.hadithMissing.push({ where: h.where, ref: `${h.book}:${h.n}` }); continue }
  if (h.claim && text.trim() !== '(exists, no English text)') {
    const w = words(h.claim)
    const real = text.toLowerCase()
    const hits = w.filter((x) => real.includes(x.slice(0, Math.max(5, x.length - 2))))
    const score = w.length ? hits.length / w.length : 1
    if (score < 0.3) out.hadithMismatch.push({ where: h.where, ref: `${h.book}:${h.n}`, score: +score.toFixed(2), claim: h.claim.slice(0, 140), real: text.replace(/\s+/g, ' ').slice(0, 160) })
  }
}

// ---------- DOIs ----------
const dois = SCIENTIFIC_FACTS.flatMap((f) => f.papers.map((p) => ({ where: `science.${f.id}`, url: p.doiOrUrl })))
for (const d of dois) {
  const m = /doi\.org\/(.+)$/.exec(d.url)
  if (!m) continue
  const j = await (await fetch(`https://doi.org/api/handles/${m[1]}`)).json().catch(() => ({}))
  if (j.responseCode !== 1) out.doiMissing.push(d)
}

const summary = `Qur'an refs: ${quranRefs.length} (missing ${out.quranMissing.length}) · typed Arabic: ${arabic.length} (mismatch ${out.arabicMismatch.length}) · hadith refs: ${hadith.length} (missing ${out.hadithMissing.length}, text mismatch ${out.hadithMismatch.length}) · ﴿﴾ quotes not in the Mushaf: ${out.bracketMismatch.length} · DOIs: ${dois.length} (not found ${out.doiMissing.length}) · unverifiable sources: ${out.unverifiable.length}`
console.log(summary)
const jsonAt = process.argv.indexOf('--json')
if (jsonAt > 0) fs.writeFileSync(process.argv[jsonAt + 1], JSON.stringify(out, null, 2))
// Hard failures: a reference that does not exist, Qur'an text typed wrongly, or a DOI that does not resolve.
// Text mismatches are a heuristic (paraphrases score low), so they are printed for review but do not fail.
for (const m of out.hadithMismatch) console.log(`  review: ${m.where} ${m.ref} (score ${m.score})`)
const hard = out.quranMissing.length + out.arabicMismatch.length + out.bracketMismatch.length + out.hadithMissing.length + out.doiMissing.length
if (hard) console.log(JSON.stringify({ quranMissing: out.quranMissing, arabicMismatch: out.arabicMismatch, bracketMismatch: out.bracketMismatch, hadithMissing: out.hadithMissing, doiMissing: out.doiMissing }, null, 2))
process.exit(hard ? 1 : 0)
