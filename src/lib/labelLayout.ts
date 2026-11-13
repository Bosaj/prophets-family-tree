import type { Lang } from '../data/types'
import { pathPoint } from './relations'

/**
 * Placement of the relation names drawn on the lines of both trees.
 *
 * Every label keeps the same size on screen whatever the zoom (it is drawn at `labelScale(k)` inside the zoomed
 * group). Before a label is drawn, it is moved along its own line until it covers no node (orb, name, date pill)
 * and no label placed before it. A label that finds no free place is hidden, except a label the reader asked for
 * (a line of the selected person or a highlighted line): it goes where it covers the least.
 */

export interface Box {
  x0: number
  y0: number
  x1: number
  y1: number
}

export interface LabelRequest {
  key: string
  text: string
  /** SVG path of the line, in tree coordinates. */
  d: string
  /** Shown even when no free place exists. Forced labels are placed first. */
  force?: boolean
}

export interface PlacedLabel {
  x: number
  y: number
  /** True when the label could not avoid every node or label (forced labels only). */
  crowded: boolean
}

/** Height of the label pill, in screen pixels. */
export const LABEL_H = 18
const LABEL_PAD_X = 14
/** Free space kept around a label, in screen pixels. */
const GAP = 3
/** Points tried along the line, from the middle outwards. */
const STOPS = [0.5, 0.42, 0.58, 0.34, 0.66, 0.27, 0.73, 0.2, 0.8, 0.14, 0.86]

export const labelFont = (lang: Lang) =>
  lang === 'ar' ? '600 11px "Reem Kufi Variable", serif' : '600 10.5px "Sora Variable", "Reem Kufi Variable", sans-serif'

/** Labels keep one size on screen; they stop growing below 50 % zoom and stop shrinking above 160 %. */
export const labelScale = (k: number) => 1 / Math.min(Math.max(k, 0.5), 1.6)

const widths = new Map<string, number>()
let ctx: CanvasRenderingContext2D | null | undefined

/** Width of `text` in `font`, measured with a canvas once the web fonts are ready, estimated before that. */
export function textWidth(text: string, font: string): number {
  const key = `${font}|${text}`
  const known = widths.get(key)
  if (known !== undefined) return known
  const size = Number(font.match(/(\d+(?:\.\d+)?)px/)?.[1] ?? 11)
  const estimate = text.length * size * (/[؀-ۿ]/.test(text) ? 0.5 : 0.56)
  if (ctx === undefined) {
    const jsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)
    ctx = typeof document === 'undefined' || jsdom ? null : document.createElement('canvas').getContext('2d')
  }
  if (!ctx) return estimate
  ctx.font = font
  const w = ctx.measureText(text).width || estimate
  // cache only real measurements: a width taken before the font loads is the fallback font's
  if (typeof document !== 'undefined' && document.fonts?.status === 'loaded') widths.set(key, w)
  return w
}

export const labelWidth = (text: string, lang: Lang) => textWidth(text, labelFont(lang)) + LABEL_PAD_X

/**
 * The space a node takes: its orb, and the block of its Arabic name, Latin name and date pill under it.
 * `rows` lists the text rows under the orb with their baseline (y), font size and width.
 */
export function nodeBoxes(x: number, y: number, r: number, rows: { y: number; size: number; w: number }[], extra: Box[] = []): Box[] {
  const boxes: Box[] = [{ x0: x - r - 2, y0: y - r - 2, x1: x + r + 2, y1: y + r + 2 }]
  if (rows.length) {
    const w = Math.max(...rows.map((row) => row.w))
    const top = Math.min(...rows.map((row) => row.y - row.size))
    const bottom = Math.max(...rows.map((row) => row.y + row.size * 0.35))
    boxes.push({ x0: x - w / 2 - 2, y0: y + top, x1: x + w / 2 + 2, y1: y + bottom })
  }
  for (const b of extra) boxes.push({ x0: x + b.x0, y0: y + b.y0, x1: x + b.x1, y1: y + b.y1 })
  return boxes
}

const overlap = (a: Box, b: Box) => {
  const w = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)
  const h = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0)
  return w > 0 && h > 0 ? w * h : 0
}

/** Positions for the labels, in tree coordinates; `null` for a label left out for lack of room. */
export function placeLabels(requests: LabelRequest[], obstacles: Box[], scale: number, lang: Lang): Map<string, PlacedLabel | null> {
  const out = new Map<string, PlacedLabel | null>()
  const placed: Box[] = []
  const order = [...requests].sort((a, b) => Number(!!b.force) - Number(!!a.force))
  for (const req of order) {
    const hw = (labelWidth(req.text, lang) / 2 + GAP) * scale
    const hh = (LABEL_H / 2 + GAP) * scale
    let best: { x: number; y: number; box: Box; cost: number } | null = null
    // on the line first; then, for short lines squeezed between two nodes, just beside it
    search: for (const side of [0, -1, 1]) {
      for (const t of STOPS) {
        const p = pathPoint(req.d, t)
        if (side) {
          const a = pathPoint(req.d, Math.max(0, t - 0.02))
          const b = pathPoint(req.d, Math.min(1, t + 0.02))
          const len = Math.hypot(b.x - a.x, b.y - a.y) || 1
          // unit normal to the line, pointing "up" for a horizontal line
          let nx = -(b.y - a.y) / len
          let ny = (b.x - a.x) / len
          if (ny > 0 || (ny === 0 && nx > 0)) { nx = -nx; ny = -ny }
          const shift = side * (Math.abs(nx) * hw + Math.abs(ny) * hh + 1.5 * scale)
          p.x += nx * shift
          p.y += ny * shift
        }
        const box = { x0: p.x - hw, y0: p.y - hh, x1: p.x + hw, y1: p.y + hh }
        let cost = 0
        for (const o of obstacles) cost += overlap(box, o)
        for (const o of placed) cost += overlap(box, o) * 2
        // a label beside its line must stay readable as that line's: never prefer it over an equal one on the line
        if (side) cost += 0.01
        if (!best || cost < best.cost) best = { x: p.x, y: p.y, box, cost }
        if (cost === 0) break search
      }
      if (best && best.cost <= 0.01) break
    }
    // below 1 square unit the only cost is the small preference for the line itself: the place is free
    const free = !!best && best.cost < 1
    if (best && (free || req.force)) {
      placed.push(best.box)
      out.set(req.key, { x: best.x, y: best.y, crowded: !free })
    } else {
      out.set(req.key, null)
    }
  }
  return out
}
