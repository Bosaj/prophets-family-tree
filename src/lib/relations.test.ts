import { describe, expect, it } from 'vitest'
import { links } from '../data/links'
import { pathPoint, relationLabel } from './relations'

const link = (from: string, to: string) => links.find((k) => k.from === from && k.to === to)!

describe('relation names on the tree', () => {
  it('names Lut as Ibrahim’s nephew, never his son', () => {
    const l = relationLabel(link('ibrahim', 'lut'))
    expect(l.en).toBe('Nephew')
    expect(l.ar).toBe('ابن أخيه')
    expect(l.en).not.toMatch(/son/i)
  })

  it('uses son, daughter and wife from the person’s gender', () => {
    expect(relationLabel(link('ibrahim', 'ismail')).en).toBe('Son')
    expect(relationLabel(link('imran', 'maryam')).ar).toBe('ابنته')
    expect(relationLabel(link('muhammad', 'fatimah')).en).toBe('Daughter')
    expect(relationLabel(link('muhammad', 'khadijah')).en).toBe('Wife')
    expect(relationLabel(link('maryam', 'isa')).ar).toBe('ابنها')
  })

  it('keeps uncertain links uncertain', () => {
    expect(relationLabel(link('ayyub', 'dhulkifl')).en).toBe('Possibly his son')
    expect(relationLabel(link('nuh', 'hud')).en).toBe('Descendant')
  })

  it('names every link in all four languages', () => {
    for (const k of links) {
      const l = relationLabel(k)
      for (const lang of ['en', 'fr', 'ar', 'es'] as const) expect(l[lang], `${k.from} → ${k.to} (${lang})`).toBeTruthy()
    }
  })
})

describe('pathPoint', () => {
  it('finds points on straight and curved paths', () => {
    expect(pathPoint('M0,0 L10,20', 0.5)).toEqual({ x: 5, y: 10 })
    expect(pathPoint('M 0 0 C 0 50, 100 50, 100 100', 0.5)).toEqual({ x: 50, y: 50 })
  })
})
