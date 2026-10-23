import fs from 'node:fs'
import path from 'node:path'
import { people, byId, prophets, heavens } from './people'
import { links, treeParent } from './links'
import { parseRef, refLabel, refUrl } from './sources'
import type { Fact, L3 } from './types'
import { allTextRefs } from './verified'
import { SACRED_SITES, ROUTES } from '../components/TopographyMap'

const facts = (p: (typeof people)[number]): Fact[] =>
  [p.title, p.role, p.era, p.sentTo, p.place, p.scripture, p.lifespan, p.marriage, p.children, ...(p.signs ?? []), ...(p.notes ?? [])].filter(Boolean) as Fact[]

function eachL3(v: unknown, visit: (l: L3, where: string) => void, where = '') {
  if (!v || typeof v !== 'object') return
  const o = v as Record<string, unknown>
  if (typeof o.en === 'string' && typeof o.fr === 'string' && typeof o.ar === 'string') return visit(o as unknown as L3, where)
  for (const [k, x] of Object.entries(o)) eachL3(x, visit, `${where}.${k}`)
}

describe('dataset', () => {
  it('has the 25 prophets named in the Qur’an, with unique ids', () => {
    expect(prophets).toHaveLength(25)
    expect(new Set(people.map((p) => p.id)).size).toBe(people.length)
  })

  it('has every text in Arabic, French and English', () => {
    const missing: string[] = []
    for (const p of people) eachL3(p, (l, w) => (['en', 'fr', 'ar'] as const).forEach((k) => !l[k].trim() && missing.push(`${p.id}${w}.${k}`)))
    for (const k of links) eachL3(k, (l, w) => (['en', 'fr', 'ar'] as const).forEach((x) => !l[x].trim() && missing.push(`${k.from}->${k.to}${w}.${x}`)))
    expect(missing).toEqual([])
  })

  it('writes Arabic text in Arabic script', () => {
    for (const p of people) expect(p.name.ar, p.id).toMatch(/[؀-ۿ]/)
    for (const p of people) expect(p.story.ar, p.id).toMatch(/[؀-ۿ]{3}/)
  })

  it('links only known people, and every person is reachable from Adam', () => {
    for (const k of links) {
      expect(byId.has(k.from), k.from).toBe(true)
      expect(byId.has(k.to), k.to).toBe(true)
    }
    for (const p of people) {
      if (p.id === 'adam') continue
      let cur: string | undefined = p.id
      const seen = new Set<string>()
      while (cur && cur !== 'adam') {
        expect(seen.has(cur), `cycle at ${cur}`).toBe(false)
        seen.add(cur)
        cur = treeParent.get(cur)?.from
      }
      expect(cur, `${p.id} is not connected to Adam`).toBe('adam')
    }
  })

  it('backs every Qur’an-level fact with a Qur’an verse, and every hadith-level fact with a hadith or the sira', () => {
    for (const p of people) {
      for (const f of facts(p)) {
        const refs = (f.r ?? []).map(parseRef)
        if (f.l === 'quran') expect(refs.some((r) => r.kind === 'quran'), `${p.id}: ${f.t.en}`).toBe(true)
        if (f.l === 'hadith') expect(refs.some((r) => r.kind === 'hadith' || (r.kind === 'book' && r.key === 'sira')), `${p.id}: ${f.t.en}`).toBe(true)
      }
    }
    for (const k of links) {
      const refs = (k.r ?? []).map(parseRef)
      if (k.l === 'quran') expect(refs.some((r) => r.kind === 'quran'), `${k.from}->${k.to}`).toBe(true)
      if (k.l === 'hadith') expect(refs.some((r) => r.kind === 'hadith'), `${k.from}->${k.to}`).toBe(true)
    }
  })

  it('uses well-formed references only', () => {
    for (const r of allTextRefs()) {
      const p = parseRef(r)
      if (p.kind === 'quran') {
        expect(p.s).toBeGreaterThanOrEqual(1)
        expect(p.s).toBeLessThanOrEqual(114)
        expect(p.to).toBeGreaterThanOrEqual(p.a)
      }
    }
    expect(refUrl('20:9-98')).toBe('https://quran.com/20/9-98')
    expect(refUrl('bukhari:3207')).toBe('https://sunnah.com/bukhari:3207')
    expect(refLabel('2:31', 'en')).toContain('2:31')
    expect(() => parseRef('nonsense')).toThrow()
  })

  it('lists the prophets of the seven heavens as in Sahih al-Bukhari 3207', () => {
    expect(heavens.map((h) => h.ids.join('+'))).toEqual(['adam', 'yahya+isa', 'yusuf', 'idris', 'harun', 'musa', 'ibrahim'])
    for (const h of heavens) for (const id of h.ids) expect(byId.get(id)?.heaven).toBe(h.n)
  })

  it('has an encoded scene for every image it references', () => {
    for (const p of people) {
      if (!p.image) continue
      for (const v of ['2048.webp', '960.webp', '2048.avif', '960.avif']) {
        expect(fs.existsSync(path.resolve('public/img', `${p.image}-${v}`)), `${p.image}-${v}`).toBe(true)
      }
    }
  })

  it('has comprehensive, authentic sacred sites and prophetic routes in TopographyMap', () => {
    expect(SACRED_SITES.length).toBeGreaterThanOrEqual(30)
    for (const site of SACRED_SITES) {
      expect(site.id).toBeTruthy()
      expect(site.lat).toBeGreaterThan(-15)
      expect(site.lat).toBeLessThan(55)
      expect(site.lng).toBeGreaterThan(-15)
      expect(site.lng).toBeLessThan(130)
      expect(site.name.en).toBeTruthy()
      expect(site.name.fr).toBeTruthy()
      expect(site.name.ar).toMatch(/[؀-ۿ]/)
      if (site.prophetId) {
        expect(byId.has(site.prophetId), `site ${site.id} references invalid prophet ${site.prophetId}`).toBe(true)
      }
    }

    expect(ROUTES.length).toBeGreaterThanOrEqual(7)
    for (const route of ROUTES) {
      expect(route.id).toBeTruthy()
      expect(route.color).toMatch(/^#[0-9a-f]{6}$/i)
      expect(byId.has(route.prophetId), `route ${route.id} references invalid prophet ${route.prophetId}`).toBe(true)
      expect(route.coords.length).toBeGreaterThanOrEqual(4)
      expect(route.stops.length).toBeGreaterThanOrEqual(4)
      for (const stop of route.stops) {
        expect(stop.name.en).toBeTruthy()
        expect(stop.name.fr).toBeTruthy()
        expect(stop.name.ar).toMatch(/[؀-ۿ]/)
        expect(stop.lat).toBeGreaterThan(-15)
        expect(stop.lat).toBeLessThan(55)
        expect(stop.lng).toBeGreaterThan(-15)
        expect(stop.lng).toBeLessThan(130)
      }
    }
  })
})

describe('extra datasets keep the source rules', () => {
  it('never shows an invented height as a stated one', async () => {
    const { STATURE_SCALE_DATA, PROPHETIC_DESCRIPTIONS } = await import('./stature')
    for (const s of STATURE_SCALE_DATA) {
      if (!s.heightStated) expect(s.level, s.id).toBeDefined()
    }
    for (const id of ['people_of_ad', 'thamud_ancient', 'musa_era']) {
      expect(STATURE_SCALE_DATA.find((s) => s.id === id)?.heightStated, id).toBe(false)
    }
    // Portraits must not give a height in metres: the sources do not.
    for (const d of PROPHETIC_DESCRIPTIONS) expect(d.heightEstimate.en, d.id).not.toMatch(/\d(\.\d+)?\s*m\b/)
  })

  it('labels weak pre-Adamic reports and explains why', async () => {
    const { PRE_ADAM_ENTITIES } = await import('./preAdam')
    for (const e of PRE_ADAM_ENTITIES) {
      expect(e.level, e.id).toBeDefined()
      if (e.level === 'disputed') expect(e.caution?.en, e.id).toBeTruthy()
    }
    expect(PRE_ADAM_ENTITIES.find((e) => e.id === 'nasnas')?.level).toBe('disputed')
    expect(PRE_ADAM_ENTITIES.find((e) => e.id === 'hinn_binn')?.level).toBe('disputed')
  })

  it('has a Qur’an verse for every creature marked as from the Qur’an, and credits every photo', async () => {
    const { QURAN_SUNNAH_ANIMALS, QURAN_SUNNAH_PLANTS } = await import('./nature')
    const credits = (await import('./photoCredits.json')).default as Record<string, { license: string }>
    for (const e of [...QURAN_SUNNAH_ANIMALS, ...QURAN_SUNNAH_PLANTS]) {
      if (e.source !== 'sunnah') expect(e.quranRefs.length, e.id).toBeGreaterThan(0)
      if (fs.existsSync(path.resolve('public/nature', `${e.id}.jpg`))) expect(credits[e.id]?.license, `credit for ${e.id}`).toBeTruthy()
    }
  })

  it('links only DOIs, or a book page, for research papers', async () => {
    const { SCIENTIFIC_FACTS } = await import('./science')
    for (const f of SCIENTIFIC_FACTS) for (const p of f.papers) expect(p.doiOrUrl, f.id).toMatch(/^https:\/\/(doi\.org\/10\.|openlibrary\.org\/)/)
  })
})
