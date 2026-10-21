import { buildLayout, lineage, relativesOf, type LayoutFilterOptions } from './layout'
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

    const getR = (id: string) => rtl.nodes.find((n) => n.id === id)!
    const getL = (id: string) => ltr.nodes.find((n) => n.id === id)!

    // In both RTL and LTR, wives should have the exact same X as their prophet husband (vertical line)
    expect(getR('hawwa').x).toBe(getR('adam').x)
    expect(getL('hawwa').x).toBe(getL('adam').x)

    expect(getR('hajar').x).toBe(getR('ibrahim').x)
    expect(getR('sarah').x).toBe(getR('ibrahim').x)
    expect(getL('hajar').x).toBe(getL('ibrahim').x)
    expect(getL('sarah').x).toBe(getL('ibrahim').x)

    expect(getR('safura').x).toBe(getR('musa').x)
    expect(getL('safura').x).toBe(getL('musa').x)

    const wivesOfMuhammad = ['khadijah', 'mariyah', 'sawdah', 'aisha', 'hafsah', 'zaynab_khuzaymah', 'umm_salamah', 'zaynab_jahsh', 'juwayriyah', 'umm_habibah', 'safiyyah', 'maymunah']
    for (const wid of wivesOfMuhammad) {
      expect(getR(wid).x).toBe(getR('muhammad').x)
      expect(getL(wid).x).toBe(getL('muhammad').x)
    }

    const vert = buildLayout(true, false)
    expect(vert.nodes).toHaveLength(people.length)
    const getV = (id: string) => vert.nodes.find((n) => n.id === id)!
    // In vertical layout (phones), spouses are horizontal to their prophet husband (exact same Y)
    expect(getV('hawwa').y).toBe(getV('adam').y)
    expect(getV('hawwa').x).not.toBe(getV('adam').x)
    expect(getV('safura').y).toBe(getV('musa').y)
    expect(getV('safura').x).not.toBe(getV('musa').x)
    expect(getV('hajar').y).toBe(getV('ibrahim').y)
    expect(getV('sarah').y).toBe(getV('ibrahim').y)

    for (const wid of wivesOfMuhammad) {
      expect(getV(wid).y).toBe(getV('muhammad').y)
    }

    // Helper to find true visual overlaps in any layout
    const checkOverlaps = (layoutNodes: typeof rtl.nodes) => {
      const issues: string[] = []
      for (let i = 0; i < layoutNodes.length; i++) {
        for (let j = i + 1; j < layoutNodes.length; j++) {
          const a = layoutNodes[i]!
          const b = layoutNodes[j]!
          const dx = Math.abs(a.x - b.x)
          const dy = Math.abs(a.y - b.y)
          const hasProphet = a.person.kind === 'prophet' || b.person.kind === 'prophet'
          const minVerticalGap = hasProphet ? 85 : 70
          if (dx < 35 && dy < minVerticalGap) {
            issues.push(`Column overlap: ${a.id} & ${b.id} [dx=${dx.toFixed(0)}, dy=${dy.toFixed(0)}]`)
          } else if (dx < 55 && dy < 55) {
            issues.push(`Direct overlap: ${a.id} & ${b.id} [dx=${dx.toFixed(0)}, dy=${dy.toFixed(0)}]`)
          }
        }
      }
      return issues
    }

    const filterPermutations: LayoutFilterOptions[] = []
    for (const includeFamily of [true, false]) {
      for (const showSpouses of [true, false]) {
        for (const showChildren of [true, false]) {
          for (const showExtendedFamily of [true, false]) {
            filterPermutations.push({ includeFamily, showSpouses, showChildren, showExtendedFamily })
          }
        }
      }
    }

    // Verify all 16 filter permutations have ZERO overlaps in RTL, LTR, and Vertical orientations
    for (const f of filterPermutations) {
      const layoutRtl = buildLayout(f, true, true)
      const layoutLtr = buildLayout(f, true, false)
      const layoutVert = buildLayout(f, false, false)

      expect(checkOverlaps(layoutRtl.nodes)).toEqual([])
      expect(checkOverlaps(layoutLtr.nodes)).toEqual([])
      expect(checkOverlaps(layoutVert.nodes)).toEqual([])
    }
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
    expect(parsePath('/p/zaynab_khuzaymah')).toEqual({ name: 'person', id: 'zaynab_khuzaymah' })
    expect(parsePath('/tree', '?focus=isa')).toEqual({ name: 'tree', focus: 'isa' })
    expect(parsePath('/timeline/')).toEqual({ name: 'timeline' })
    expect(parsePath('/stature/')).toEqual({ name: 'stature' })
    expect(parsePath('/stories/')).toEqual({ name: 'stories' })
    expect(parsePath('/nope')).toEqual({ name: 'notfound' })
    expect(hrefOf({ name: 'tree', focus: 'nuh' })).toBe('/tree?focus=nuh')
    expect(hrefOf({ name: 'stature' })).toBe('/stature')
    expect(hrefOf({ name: 'stories' })).toBe('/stories')
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
