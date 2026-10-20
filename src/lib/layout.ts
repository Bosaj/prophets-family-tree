import { hierarchy, tree, type HierarchyPointNode } from 'd3-hierarchy'
import { links, treeParent } from '../data/links'
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


  // Build the drawing tree. When family members are hidden, their children attach to the nearest visible ancestor.
  const kids = new Map<string, string[]>()
  for (const p of people) {
    if (p.id === 'adam' || !visible(p.id)) continue
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
    .nodeSize(horizontal ? [82, 280] : [NODE_W, NODE_H])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.25))(root)

  let minB = Infinity
  let maxB = -Infinity
  let maxD = 0
  laid.each((n) => {
    minB = Math.min(minB, n.x)
    maxB = Math.max(maxB, n.x)
    maxD = Math.max(maxD, n.y)
  })
  const pad = 90
  const breadth = maxB - minB + pad * 2
  const length = maxD + pad * 2
  const nodes: TreeNode[] = []
  const pos = new Map<string, { x: number; y: number }>()
  laid.each((n: HierarchyPointNode<Raw>) => {
    const b = n.x - minB + pad
    const d = n.y + pad
    const x = horizontal ? (rtl ? length - d : d) : b
    const y = horizontal ? b : d
    pos.set(n.data.id, { x, y })
    nodes.push({ id: n.data.id, person: byId.get(n.data.id)!, x, y, depth: n.depth })
  })
  const dir = rtl ? -1 : 1

  const edges: TreeEdge[] = []
  laid.each((n) => {
    if (!n.parent) return
    const from = pos.get(n.parent.data.id)!
    const to = pos.get(n.data.id)!
    const link = treeParent.get(n.data.id)
    // A link whose source was hidden is shown as a generic descendant link.
    const shown: Link = link && link.from === n.parent.data.id ? link : { from: n.parent.data.id, to: n.data.id, type: 'descendant', l: 'tradition' }
    if (horizontal) {
      const midX = (from.x + to.x) / 2
      edges.push({ link: shown, arc: false, d: `M${from.x + 22 * dir},${from.y} C${midX},${from.y} ${midX},${to.y} ${to.x - 22 * dir},${to.y}` })
    } else {
      const midY = (from.y + to.y) / 2
      edges.push({ link: shown, arc: false, d: `M${from.x},${from.y + 26} C${from.x},${midY} ${to.x},${midY} ${to.x},${to.y - 26}` })
    }
  })
  for (const k of links) {
    if (!['sibling', 'cousin', 'guardian'].includes(k.type)) continue
    const a = pos.get(k.from)
    const b = pos.get(k.to)
    if (!a || !b) continue
    if (horizontal) {
      // Bulge towards later generations so the arc stays clear of the labels under each node.
      const lift = Math.max(46, Math.abs(a.y - b.y) * 0.35)
      const side = Math.max(a.x * dir, b.x * dir) * dir + lift * dir
      edges.push({ link: k, arc: true, d: `M${a.x + 20 * dir},${a.y} C${side},${a.y} ${side},${b.y} ${b.x + 20 * dir},${b.y}` })
    } else {
      const lift = Math.max(40, Math.abs(a.x - b.x) * 0.35)
      const top = Math.min(a.y, b.y) - lift
      edges.push({ link: k, arc: true, d: `M${a.x},${a.y - 22} C${a.x},${top} ${b.x},${top} ${b.x},${b.y - 22}` })
    }
  }

  return horizontal ? { nodes, edges, width: length, height: breadth } : { nodes, edges, width: breadth, height: length }
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

