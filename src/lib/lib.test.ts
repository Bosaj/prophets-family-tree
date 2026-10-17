import { buildLayout, lineage, relativesOf } from './layout'
import { parsePath, hrefOf } from './router'
import { loadPassage } from './quran'
import { fold, search } from '../components/Search'
import { people } from '../data/people'

describe('layout', () => {
  it('draws everyone, or only the prophets', () => {
    expect(buildLayout(true).nodes).toHaveLength(people.length)
    expect(buildLayout(false).nodes).toHaveLength(25)
  })

  it('lays out sideways, and mirrors for Arabic', () => {
    const ltr = buildLayout(true, true, false)
    const rtl = buildLayout(true, true, true)
    const adamL = ltr.nodes.find((n) => n.id === 'adam')!
    const adamR = rtl.nodes.find((n) => n.id === 'adam')!
    const isaL = ltr.nodes.find((n) => n.id === 'isa')!
    expect(adamL.x).toBeLessThan(isaL.x)
    expect(adamR.x).toBeGreaterThan(rtl.nodes.find((n) => n.id === 'isa')!.x)
    expect(ltr.width).toBeGreaterThan(ltr.height)
  })

  it('traces lineage back to Adam', () => {
    expect(lineage('isa')).toEqual(['isa', 'maryam', 'imran', 'yaqub', 'ishaq', 'ibrahim', 'azar', 'nuh', 'idris', 'shith', 'adam'])
    expect(lineage('muhammad').slice(0, 3)).toEqual(['muhammad', 'ismail', 'ibrahim'])
  })

  it('finds relatives from both sides of a link', () => {
    const musa = relativesOf('musa').map((r) => `${r.rel}:${r.person.id}`)
    expect(musa).toContain('relSibling:harun')
    expect(musa).toContain('relAncestor:yaqub')
    const isa = relativesOf('isa').map((r) => `${r.rel}:${r.person.id}`)
    expect(isa).toEqual(expect.arrayContaining(['relParent:maryam', 'relCousin:yahya']))
  })
})

describe('router', () => {
  it('parses and builds paths', () => {
    expect(parsePath('/')).toEqual({ name: 'home' })
    expect(parsePath('/p/musa')).toEqual({ name: 'person', id: 'musa' })
    expect(parsePath('/tree', '?focus=isa')).toEqual({ name: 'tree', focus: 'isa' })
    expect(parsePath('/timeline/')).toEqual({ name: 'timeline' })
    expect(parsePath('/nope')).toEqual({ name: 'notfound' })
    expect(hrefOf({ name: 'tree', focus: 'nuh' })).toBe('/tree?focus=nuh')
  })
})

describe('search', () => {
  it('ignores accents, diacritics and hamza forms', () => {
    expect(fold('Ibrâhîm')).toBe('ibrahim')
    expect(fold('إبْرَاهِيم')).toBe(fold('ابراهيم'))
  })
  it('finds by name, Biblical name, Arabic name and story words', () => {
    expect(search('ibrahim')[0]?.id).toBe('ibrahim')
    expect(search('Moses')[0]?.id).toBe('musa')
    expect(search('ابراهيم')[0]?.id).toBe('ibrahim')
    expect(search('camel').map((p) => p.id)).toContain('salih')
    expect(search('')).toHaveLength(25)
  })
})

describe('Qur’an loader', () => {
  it('requests the right range and editions, and strips the basmala from verse 1', async () => {
    const urls: string[] = []
    const fake = (async (url: string) => {
      urls.push(url)
      return new Response(
        JSON.stringify({
          data: [
            { name: 'سُورَةُ العَلَقِ', englishName: "Al-'Alaq", ayahs: [{ number: 6098, numberInSurah: 1, text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱقْرَأْ بِٱسْمِ رَبِّكَ' }] },
            { name: '', englishName: '', ayahs: [{ number: 6098, numberInSurah: 1, text: 'Recite in the name of your Lord' }] },
          ],
        }),
      )
    }) as typeof fetch
    const p = await loadPassage('96:1', 'en', fake)
    expect(urls[0]).toBe('https://api.alquran.cloud/v1/surah/96/editions/quran-uthmani,en.sahih?offset=0&limit=1')
    expect(p.ayahs[0]!.arabic).toBe('ٱقْرَأْ بِٱسْمِ رَبِّكَ')
    expect(p.ayahs[0]!.translation).toMatch(/Recite/)
  })
})
