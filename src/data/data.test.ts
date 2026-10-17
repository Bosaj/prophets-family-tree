import fs from 'node:fs'
import path from 'node:path'
import { people, byId, prophets, heavens } from './people'
import { links, treeParent } from './links'
import { parseRef, refLabel, refUrl } from './sources'
import type { Fact, L3 } from './types'
import { allTextRefs } from './verified'

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
})
