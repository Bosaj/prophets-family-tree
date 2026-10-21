import { hierarchy, tree, type HierarchyPointNode } from 'd3-hierarchy'
import { links, treeParent, CHILD_MOTHER, SPOUSE_OF } from '../data/links'
import { byId, people } from '../data/people'
import type { Link, Person } from '../data/types'

export interface TreeNode {
  id: string
  person: Person
  x: number
  y: number
  depth: number
}

export interface TreeEdge {
  link: Link
  /** SVG path for the edge. */
  d: string
  /** Arcs connect relatives that are not parent/child in the drawing. */
  arc: boolean
  isMarriage?: boolean
  union?: { x: number; y: number }
}

export interface TreeLayout {
  nodes: TreeNode[]
  edges: TreeEdge[]
  width: number
  height: number
}

/** Drawing order of siblings, left to right, chosen to avoid crossings. */
const CHILD_ORDER = [
  'hawwa', 'qabil', 'habil', 'shith', 'idris',
  'sam', 'ham', 'yafith', 'yam', 'nuh', 'hud', 'salih', 'azar',
  'sarah', 'hajar', 'ibrahim', 'ismail',
  'khadijah', 'sawdah', 'aisha', 'hafsah', 'zaynab_khuzaymah', 'umm_salamah', 'zaynab_jahsh', 'juwayriyah', 'umm_habibah', 'safiyyah', 'maymunah', 'mariyah',
  'qasim', 'abdullah_m', 'ibrahim_m', 'zaynab_m', 'ruqayyah', 'umm_kulthum', 'fatimah',
  'muhammad',
  'lut', 'shuayb', 'ishaq', 'ayyub', 'dhulkifl',
  'yaqub', 'binyamin', 'yusuf', 'safura', 'musa', 'harun',
  'ilyas', 'dawud', 'sulayman', 'alyasa', 'yunus', 'zakariya', 'yahya',
  'imran', 'maryam', 'isa',
]
const rank = (id: string) => {
  const i = CHILD_ORDER.indexOf(id)
  return i < 0 ? 999 : i
}

interface Raw {
  id: string
  children: Raw[]
}

export const NODE_W = 108
export const NODE_H = 175

export interface LayoutFilterOptions {
  includeFamily?: boolean
  showSpouses?: boolean
  showChildren?: boolean
  showExtendedFamily?: boolean
}

/**
 * Lay the tree out top-down (phones) or sideways (wide screens).
 * Sideways, generations flow left to right, or right to left when `rtl`.
 * Wives and prophets are arranged in vertical lines, with children
 * descending directly from both parents along the vertical lineage.
 */
export function buildLayout(
  filterOpts: boolean | LayoutFilterOptions = true,
  horizontal = false,
  rtl = false,
): TreeLayout {
  const visible = (id: string) => {
    const p = byId.get(id)
    if (!p) return false
    if (p.kind === 'prophet') return true
    if (typeof filterOpts === 'boolean') return filterOpts
    const { includeFamily = true, showSpouses = true, showChildren = true, showExtendedFamily = true } = filterOpts
    if (!includeFamily) return false
    if (p.kind === 'spouse') return showSpouses
    if (p.kind === 'child') return showChildren
    if (p.kind === 'family') return showExtendedFamily
    return true
  }

  // 1. Build hierarchy of non-spouse nodes
  const kids = new Map<string, string[]>()
  for (const p of people) {
    if (p.id === 'adam' || !visible(p.id)) continue
    // Spouses will be positioned vertically in-line between their prophet husband and children
    if (p.kind === 'spouse') continue

    let parent = treeParent.get(p.id)?.from
    while (parent && !visible(parent)) parent = treeParent.get(parent)?.from
    if (!parent) continue
    kids.set(parent, [...(kids.get(parent) ?? []), p.id])
  }

  const make = (id: string): Raw => ({
    id,
    children: (kids.get(id) ?? []).sort((a, b) => rank(a) - rank(b)).map(make),
  })
  const root = hierarchy<Raw>(make('adam'), (d) => d.children)
  const laid = tree<Raw>()
    .nodeSize(horizontal ? [105, 300] : [NODE_W, NODE_H])
    .separation((a, b) => {
      const hasMusa = a.data.id === 'musa' || b.data.id === 'musa'
      const hasMh = a.data.id === 'muhammad' || b.data.id === 'muhammad'
      if (hasMh) return 2.8
      if (hasMusa) return 2.2
      return a.parent === b.parent ? 1.15 : 1.4
    })(root)

  // Map temporary positions from d3 layout
  const tempPos = new Map<string, { x: number; y: number; depth: number }>()
  laid.each((n: HierarchyPointNode<Raw>) => {
    tempPos.set(n.data.id, { x: n.x, y: n.y, depth: n.depth })
  })

  // 2. Position visible spouses in a vertical line with their prophet husband
  const spousePositions = new Map<string, { x: number; y: number; depth: number }>()

  // Hawwa: in horizontal mode, placed below Adam along the vertical line.
  // In vertical mode (phones): Hawwa is placed HORIZONTALLY beside Adam on the same generation tier!
  if (visible('hawwa') && tempPos.has('adam')) {
    const a = tempPos.get('adam')!
    spousePositions.set('hawwa', {
      x: horizontal ? a.x + 125 : a.x + (rtl ? -115 : 115),
      y: a.y,
      depth: a.depth + 0.5,
    })
  }

  // Sarah & Hajar vertically in-line with Ibrahim
  // In horizontal mode, placed below Ibrahim on the vertical line (Nuh's descendants are above Ibrahim,
  // so below Ibrahim is 100% empty space, completely avoiding Yafith, Yam, or Hud)
  // In vertical mode (phones): placed horizontally beside Ibrahim in-line with their respective sons!
  if (tempPos.has('ibrahim')) {
    const ib = tempPos.get('ibrahim')!
    const ismailPos = tempPos.get('ismail')
    const ishaqPos = tempPos.get('ishaq')

    if (visible('hajar')) {
      spousePositions.set('hajar', {
        x: horizontal ? ib.x + 120 : (ismailPos ? ismailPos.x : ib.x - 110),
        y: ib.y,
        depth: ib.depth + 0.5,
      })
    }
    if (visible('sarah')) {
      spousePositions.set('sarah', {
        x: horizontal ? ib.x + 240 : (ishaqPos ? ishaqPos.x : ib.x + 110),
        y: ib.y,
        depth: ib.depth + 0.5,
      })
    }
  }

  // Safura vertically below Musa in horizontal mode, or horizontally beside Musa in vertical phone mode
  if (visible('safura') && tempPos.has('musa')) {
    const m = tempPos.get('musa')!
    spousePositions.set('safura', {
      x: horizontal ? m.x + 115 : m.x + (rtl ? -110 : 110),
      y: m.y,
      depth: m.depth + 0.5,
    })
  }

  // Wives of Muhammad ﷺ
  if (tempPos.has('muhammad')) {
    const mh = tempPos.get('muhammad')!
    const kKids = ['qasim', 'abdullah_m', 'zaynab_m', 'ruqayyah', 'umm_kulthum', 'fatimah'].filter((id) => tempPos.has(id))
    const firstKid = kKids[0]
    const lastKid = kKids[kKids.length - 1]
    const kCenterX = firstKid && lastKid && tempPos.has(firstKid) && tempPos.has(lastKid)
      ? (tempPos.get(firstKid)!.x + tempPos.get(lastKid)!.x) / 2
      : mh.x + 115
    const ibrahimX = tempPos.get('ibrahim_m')?.x ?? (mh.x - 115)

    // Khadijah: placed in line with her children or adjacent to Muhammad
    if (visible('khadijah')) {
      const kX = !horizontal && Math.abs(kCenterX - mh.x) < 40 ? mh.x + 115 : kCenterX
      spousePositions.set('khadijah', {
        x: horizontal ? mh.x + 125 : kX,
        y: mh.y,
        depth: mh.depth + 0.5,
      })
    }

    // Mariyah: aligned with her son Ibrahim or adjacent to Muhammad
    if (visible('mariyah')) {
      const mX = !horizontal && Math.abs(ibrahimX - mh.x) < 40 ? mh.x - 115 : (tempPos.has('ibrahim_m') ? ibrahimX : mh.x - 115)
      spousePositions.set('mariyah', {
        x: horizontal ? (tempPos.has('ibrahim_m') ? ibrahimX : mh.x - 105) : mX,
        y: mh.y,
        depth: mh.depth + 0.5,
      })
    }

    // The other 10 wives of the Prophet (Ummahat al-Mu'minin)
    // In horizontal mode: placed above Mariyah and Muhammad along the open vertical generation line
    // In vertical mode (phones): placed along the single continuous HORIZONTAL line of wives on the open flank
    const upperWives = [
      'sawdah',
      'aisha',
      'hafsah',
      'zaynab_khuzaymah',
      'umm_salamah',
      'zaynab_jahsh',
      'juwayriyah',
      'umm_habibah',
      'safiyyah',
      'maymunah',
    ].filter(visible)

    if (horizontal) {
      const baseTopX = Math.min(mh.x - 105, ibrahimX)
      upperWives.forEach((wid, idx) => {
        const step = (idx + 1) * 95
        spousePositions.set(wid, {
          x: baseTopX - step,
          y: mh.y,
          depth: mh.depth + 0.5,
        })
      })
    } else {
      const allKidsX = ['qasim', 'abdullah_m', 'ibrahim_m', 'zaynab_m', 'ruqayyah', 'umm_kulthum', 'fatimah']
        .map((id) => tempPos.get(id)?.x)
        .filter((v): v is number => typeof v === 'number')
      const mariyahPos = spousePositions.get('mariyah')?.x ?? (mh.x - 115)
      const minChildX = Math.min(mh.x - 115, mariyahPos - 115, ...allKidsX)

      upperWives.forEach((wid, idx) => {
        spousePositions.set(wid, {
          x: minChildX - (idx + 1) * 115,
          y: mh.y,
          depth: mh.depth + 0.5,
        })
      })
    }
  }

  // Compute overall bounding box
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  for (const p of [...tempPos.values(), ...spousePositions.values()]) {
    minX = Math.min(minX, p.x)
    maxX = Math.max(maxX, p.x)
    minY = Math.min(minY, p.y)
    maxY = Math.max(maxY, p.y)
  }

  const pad = horizontal ? 360 : 250
  const widthRaw = maxX - minX + pad * 2
  const heightRaw = maxY - minY + pad * 2

  const nodes: TreeNode[] = []
  const pos = new Map<string, { x: number; y: number }>()

  const registerNode = (id: string, rawX: number, rawY: number, depth: number) => {
    let finalX: number
    let finalY: number
    if (horizontal) {
      const d = rawY - minY + pad
      finalX = rtl ? heightRaw - d : d
      finalY = rawX - minX + pad
    } else {
      finalX = rawX - minX + pad
      finalY = rawY - minY + pad
    }
    pos.set(id, { x: finalX, y: finalY })
    nodes.push({ id, person: byId.get(id)!, x: finalX, y: finalY, depth })
  }

  for (const [id, p] of tempPos.entries()) {
    registerNode(id, p.x, p.y, p.depth)
  }
  for (const [id, p] of spousePositions.entries()) {
    registerNode(id, p.x, p.y, p.depth)
  }

  const dir = rtl ? -1 : 1
  const edges: TreeEdge[] = []

  // 3. Vertical marriage edges from prophet down to wives
  for (const [spouseId, husbandId] of Object.entries(SPOUSE_OF)) {
    if (!visible(spouseId) || !pos.has(spouseId) || !pos.has(husbandId)) continue
    const h = pos.get(husbandId)!
    const s = pos.get(spouseId)!
    let d: string
    if (horizontal) {
      if (Math.abs(h.x - s.x) < 2) {
        const startY = s.y > h.y ? h.y + 18 : h.y - 18
        const endY = s.y > h.y ? s.y - 16 : s.y + 16
        d = `M ${h.x},${startY} L ${s.x},${endY}`
      } else {
        const midX = (h.x + s.x) / 2
        d = `M ${h.x + 22 * dir},${h.y} C ${midX},${h.y} ${midX},${s.y} ${s.x - 20 * dir},${s.y}`
      }
    } else {
      // VERTICAL MODE (phones / narrow screens):
      // Spouses are horizontal to their husband on the same generational tier (y === h.y)
      if (Math.abs(h.y - s.y) < 2) {
        const startX = s.x > h.x ? h.x + 18 : h.x - 18
        const endX = s.x > h.x ? s.x - 16 : s.x + 16
        d = `M ${startX},${h.y} L ${endX},${s.y}`
      } else {
        const midX = (h.x + s.x) / 2
        const startX = s.x > h.x ? h.x + 20 : h.x - 20
        const endX = s.x > h.x ? s.x - 18 : s.x + 18
        d = `M ${startX},${h.y} C ${midX},${h.y} ${midX},${s.y} ${endX},${s.y}`
      }
    }
    edges.push({
      link: { from: husbandId, to: spouseId, type: 'spouse', l: 'hadith' },
      arc: false,
      d,
      isMarriage: true,
      union: { x: s.x, y: s.y },
    })
  }

  // 4. Descent edges: when mother is visible, child branches vertically from mother!
  laid.each((n) => {
    if (!n.parent) return
    const childId = n.data.id
    const fatherId = n.parent.data.id
    const childPos = pos.get(childId)!
    const motherId = CHILD_MOTHER[childId]
    const hasMother = motherId && visible(motherId) && pos.has(motherId)

    let startX: number
    let startY: number
    let sourceId: string

    if (hasMother) {
      const motherPos = pos.get(motherId)!
      startX = motherPos.x
      startY = motherPos.y
      sourceId = motherId
    } else {
      const fatherPos = pos.get(fatherId)!
      startX = fatherPos.x
      startY = fatherPos.y
      sourceId = fatherId
    }

    const link = treeParent.get(childId)
    const shown: Link = link && link.from === fatherId
      ? link
      : { from: sourceId, to: childId, type: 'child', l: 'tradition' }

    if (horizontal) {
      const midX = (startX + childPos.x) / 2
      edges.push({
        link: shown,
        arc: false,
        d: `M${startX + 22 * dir},${startY} C${midX},${startY} ${midX},${childPos.y} ${childPos.x - 22 * dir},${childPos.y}`,
        union: hasMother ? { x: startX, y: startY } : undefined,
      })
    } else {
      const midY = (startY + childPos.y) / 2
      const d = startX === childPos.x
        ? `M${startX},${startY + 20} L${childPos.x},${childPos.y - 26}`
        : `M${startX},${startY + 20} C${startX},${midY} ${childPos.x},${midY} ${childPos.x},${childPos.y - 26}`
      edges.push({
        link: shown,
        arc: false,
        d,
        union: hasMother ? { x: startX, y: startY } : undefined,
      })
    }
  })

  // 5. Arcs for siblings, cousins, guardians
  for (const k of links) {
    if (!['sibling', 'cousin', 'guardian'].includes(k.type)) continue
    const a = pos.get(k.from)
    const b = pos.get(k.to)
    if (!a || !b) continue
    if (horizontal) {
      const lift = Math.max(46, Math.abs(a.y - b.y) * 0.35)
      const side = Math.max(a.x * dir, b.x * dir) * dir + lift * dir
      edges.push({ link: k, arc: true, d: `M${a.x + 20 * dir},${a.y} C${side},${a.y} ${side},${b.y} ${b.x + 20 * dir},${b.y}` })
    } else {
      const lift = Math.max(40, Math.abs(a.x - b.x) * 0.35)
      const top = Math.min(a.y, b.y) - lift
      edges.push({ link: k, arc: true, d: `M${a.x},${a.y - 22} C${a.x},${top} ${b.x},${top} ${b.x},${b.y - 22}` })
    }
  }

  const finalWidth = horizontal ? heightRaw : widthRaw
  const finalHeight = horizontal ? widthRaw : heightRaw

  return { nodes, edges, width: finalWidth, height: finalHeight }
}

/** Ids from a person up to Adam, following the tree parents. */
export function lineage(id: string): string[] {
  const out = [id]
  let cur = treeParent.get(id)?.from
  while (cur) {
    out.push(cur)
    cur = treeParent.get(cur)?.from
  }
  return out
}

export interface Relative {
  person: Person
  link: Link
  /** Relation key as seen from the profile owner. */
  rel:
    | 'relParent' | 'relChild' | 'relAncestor' | 'relDescendant' | 'relSibling' | 'relCousin'
    | 'relGuardian' | 'relWard' | 'relUncle' | 'relNephew' | 'relMaybeParent' | 'relMaybeChild'
    | 'relSpouse' | 'relSon' | 'relDaughter'
}

export function relativesOf(id: string): Relative[] {
  const out: Relative[] = []
  for (const k of links) {
    const other = k.from === id ? k.to : k.to === id ? k.from : null
    if (!other) continue
    const person = byId.get(other)!
    const out_ = k.from === id
    const rel: Relative['rel'] = (() => {
      switch (k.type) {
        case 'parent': return out_ ? 'relChild' : 'relParent'
        case 'child': return out_ ? 'relChild' : 'relParent'
        case 'spouse': return 'relSpouse'
        case 'descendant': return out_ ? 'relDescendant' : 'relAncestor'
        case 'sibling': return 'relSibling'
        case 'cousin': return 'relCousin'
        case 'guardian': return out_ ? 'relWard' : 'relGuardian'
        case 'nephew': return out_ ? 'relNephew' : 'relUncle'
        case 'maybe-parent': return out_ ? 'relMaybeChild' : 'relMaybeParent'
      }
    })()
    out.push({ person, link: k, rel })
  }
  const order: Relative['rel'][] = ['relSpouse', 'relParent', 'relAncestor', 'relMaybeParent', 'relGuardian', 'relUncle', 'relSibling', 'relCousin', 'relChild', 'relSon', 'relDaughter', 'relWard', 'relNephew', 'relDescendant', 'relMaybeChild']
  return out.sort((a, b) => order.indexOf(a.rel) - order.indexOf(b.rel) || a.person.order - b.person.order)
}

