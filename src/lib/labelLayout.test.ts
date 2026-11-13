import { describe, expect, it } from 'vitest'
import { labelScale, labelWidth, LABEL_H, nodeBoxes, placeLabels, type Box } from './labelLayout'

const boxOf = (x: number, y: number, text: string, scale = 1): Box => {
  const hw = (labelWidth(text, 'en') / 2) * scale
  const hh = (LABEL_H / 2) * scale
  return { x0: x - hw, y0: y - hh, x1: x + hw, y1: y + hh }
}
const hits = (a: Box, b: Box) => Math.min(a.x1, b.x1) > Math.max(a.x0, b.x0) && Math.min(a.y1, b.y1) > Math.max(a.y0, b.y0)

describe('placeLabels', () => {
  const line = 'M 0 0 C 0 200 0 200 0 400'

  it('puts a label in the middle of a free line', () => {
    const p = placeLabels([{ key: 'a', text: 'son', d: line }], [], 1, 'en').get('a')
    expect(p).toMatchObject({ x: 0, y: 200, crowded: false })
  })

  it('moves a label off a node that sits on the middle of its line', () => {
    const node = nodeBoxes(0, 180, 14, [{ y: 34, size: 15, w: 120 }])
    const p = placeLabels([{ key: 'a', text: 'his teacher', d: line }], node, 1, 'en').get('a')!
    expect(p).not.toBeNull()
    for (const b of node) expect(hits(boxOf(p.x, p.y, 'his teacher'), b)).toBe(false)
  })

  it('never lets two labels cover each other', () => {
    const reqs = ['son', 'grandson', 'heir', 'student'].map((text, i) => ({ key: String(i), text, d: line }))
    const placed = [...placeLabels(reqs, [], 1, 'en').entries()].filter(([, p]) => p)
    expect(placed.length).toBeGreaterThan(1)
    const boxes = placed.map(([k, p]) => boxOf(p!.x, p!.y, reqs[Number(k)]!.text))
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) expect(hits(boxes[i]!, boxes[j]!)).toBe(false)
  })

  it('hides a label with no free place, but always shows a forced one', () => {
    const wall: Box[] = [{ x0: -500, y0: -500, x1: 500, y1: 900 }]
    const out = placeLabels(
      [
        { key: 'free', text: 'wife', d: line },
        { key: 'forced', text: 'wife', d: line, force: true },
      ],
      wall,
      1,
      'en',
    )
    expect(out.get('free')).toBeNull()
    expect(out.get('forced')).toMatchObject({ crowded: true })
  })
})

describe('labelScale', () => {
  it('keeps labels one size on screen between 50 % and 160 % zoom', () => {
    expect(labelScale(1)).toBe(1)
    expect(labelScale(0.5)).toBe(2)
    expect(labelScale(0.2)).toBe(2)
    expect(labelScale(3)).toBeCloseTo(1 / 1.6)
  })
})
