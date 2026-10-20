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
export const NODE_H = 132

export interface LayoutFilterOptions {
  includeFamily?: boolean
  showSpouses?: boolean
  showChildren?: boolean
  showExtendedFamily?: boolean
}

/**
 * Lay the tree out top-down (phones) or sideways (wide screens).
 * Sideways, generations flow left to right, or right to left when `rtl`.
 * Wives are positioned in-line with their prophet spouses, and children
 * branch from the union of both parents.
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
    // Spouses will be positioned in-line alongside their prophet partner, not as hierarchy children
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
    .nodeSize(horizontal ? [86, 290] : [NODE_W, NODE_H])
    .separation((a, b) => (a.parent === b.parent ? 1.1 : 1.35))(root)

  // Map temporary positions from d3 layout
  const tempPos = new Map<string, { x: number; y: number; depth: number }>()
  laid.each((n: HierarchyPointNode<Raw>) => {
    tempPos.set(n.data.id, { x: n.x, y: n.y, depth: n.depth })
  })

  // 2. Position visible spouses in-line with their prophet husband
  const spousePositions = new Map<string, { x: number; y: number; depth: number }>()

  // Hawwa with Adam
  if (visible('hawwa') && tempPos.has('adam')) {
    const a = tempPos.get('adam')!
    spousePositions.set('hawwa', {
      x: a.x + (horizontal ? 0 : 130),
      y: a.y + (horizontal ? 90 : 0),
      depth: a.depth,
    })
  }

  // Sarah & Hajar with Ibrahim
  if (tempPos.has('ibrahim')) {
    const ib = tempPos.get('ibrahim')!
    if (visible('sarah')) {
      spousePositions.set('sarah', {
        x: ib.x + (horizontal ? 0 : -130),
        y: ib.y + (horizontal ? -90 : 0),
        depth: ib.depth,
      })
    }
    if (visible('hajar')) {
      spousePositions.set('hajar', {
        x: ib.x + (horizontal ? 0 : 130),
        y: ib.y + (horizontal ? 90 : 0),
        depth: ib.depth,
      })
    }
  }

  // Safura with Musa
  if (visible('safura') && tempPos.has('musa')) {
    const m = tempPos.get('musa')!
    const harunPos = tempPos.get('harun')
    const offset = harunPos && harunPos.x > m.x ? -130 : 130
    spousePositions.set('safura', {
      x: m.x + (horizontal ? 0 : offset),
      y: m.y + (horizontal ? -90 : 0),
      depth: m.depth,
    })
  }

  // Wives of Muhammad ﷺ
  if (tempPos.has('muhammad')) {
    const mh = tempPos.get('muhammad')!
    const rightWives = ['khadijah', 'sawdah', 'aisha', 'hafsah', 'zaynab_khuzaymah', 'umm_salamah'].filter(visible)
    const leftWives = ['mariyah', 'zaynab_jahsh', 'juwayriyah', 'umm_habibah', 'safiyyah', 'maymunah'].filter(visible)

    rightWives.forEach((wid, idx) => {
      const step = (idx + 1) * 125
      spousePositions.set(wid, {
        x: mh.x + (horizontal ? 0 : step),
        y: mh.y + (horizontal ? (idx + 1) * 85 : 0),
        depth: mh.depth,
      })
    })

    leftWives.forEach((wid, idx) => {
      const step = (idx + 1) * -125
      spousePositions.set(wid, {
        x: mh.x + (horizontal ? 0 : step),
        y: mh.y + (horizontal ? (idx + 1) * -85 : 0),
        depth: mh.depth,
      })
    })
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

  const pad = 95
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

  // 3. Marriage edges between prophet and in-line spouse
  for (const [spouseId, husbandId] of Object.entries(SPOUSE_OF)) {
    if (!visible(spouseId) || !pos.has(spouseId) || !pos.has(husbandId)) continue
    const h = pos.get(husbandId)!
    const s = pos.get(spouseId)!
    const midX = (h.x + s.x) / 2
    const midY = (h.y + s.y) / 2
    const d = `M ${h.x} ${h.y} L ${s.x} ${s.y}`
    edges.push({
      link: { from: husbandId, to: spouseId, type: 'spouse', l: 'hadith' },
      arc: false,
      d,
      isMarriage: true,
      union: { x: midX, y: midY },
    })
  }

  // 4. Descent edges
  laid.each((n) => {
    if (!n.parent) return
    const childId = n.data.id
    const fatherId = n.parent.data.id
    const childPos = pos.get(childId)!
    const motherId = CHILD_MOTHER[childId]
    const hasMother = motherId && visible(motherId) && pos.has(motherId)

    let startX: number
    let startY: number
    let unionPt: { x: number; y: number } | undefined

    if (hasMother) {
      // Child branches from the union of BOTH parents!
      const fatherPos = pos.get(fatherId)!
      const motherPos = pos.get(motherId)!
      startX = (fatherPos.x + motherPos.x) / 2
      startY = (fatherPos.y + motherPos.y) / 2
      unionPt = { x: startX, y: startY }
    } else {
      const fatherPos = pos.get(fatherId)!
      startX = fatherPos.x
      startY = fatherPos.y
    }

    const link = treeParent.get(childId)
    const shown: Link = link && link.from === fatherId ? link : { from: fatherId, to: childId, type: 'descendant', l: 'tradition' }

    if (horizontal) {
      const midX = (startX + childPos.x) / 2
      edges.push({
        link: shown,
        arc: false,
        d: `M${startX + 22 * dir},${startY} C${midX},${startY} ${midX},${childPos.y} ${childPos.x - 22 * dir},${childPos.y}`,
        union: unionPt,
      })
    } else {
      const midY = (startY + childPos.y) / 2
      edges.push({
        link: shown,
        arc: false,
        d: `M${startX},${startY + 24} C${startX},${midY} ${childPos.x},${midY} ${childPos.x},${childPos.y - 26}`,
        union: unionPt,
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

