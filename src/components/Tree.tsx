import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Baby,
  Calendar,
  Clock,
  Compass,
  Heart,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Users,
  X,
  Layers,
  Flame,
  BookOpen,
  Info,
} from 'lucide-react'
import { useI18n } from '../i18n'
import type { Key } from '../i18n/strings'
import { buildLayout, lineage, type TreeNode, type LayoutFilterOptions, type TreeEdge } from '../lib/layout'
import { treeParent } from '../data/links'
import { byId } from '../data/people'
import type { Kind } from '../data/types'
import { hrefOf, navigate } from '../lib/router'
import { A, FactText, LEVEL_STROKE, LevelChip, Refs, SubName, RefChip } from './ui'
import { formatDate, formatBirthDeath } from '../lib/dates'
import { PRE_ADAM_ENTITIES, type PreAdamEntity } from '../data/preAdam'

interface View {
  k: number
  x: number
  y: number
}

export type EdgeKind = 'parent' | 'descendant' | 'spouse' | 'sibling' | 'cousin' | 'guardian'

export function getEdgeKind(e: TreeEdge): EdgeKind {
  if (e.isMarriage) return 'spouse'
  if (e.link.type === 'sibling') return 'sibling'
  if (e.link.type === 'cousin') return 'cousin'
  if (e.link.type === 'guardian') return 'guardian'
  if (e.link.type === 'descendant') return 'descendant'
  return 'parent'
}

const KIND_STRING_KEY: Record<EdgeKind, Key> = {
  parent: 'linkParent',
  descendant: 'linkDescendant',
  spouse: 'linkSpouse',
  sibling: 'linkSibling',
  cousin: 'linkCousin',
  guardian: 'linkGuardian',
}

const EDGE_KIND_COLOR: Record<EdgeKind, string> = {
  parent: '#e9c67b',
  descendant: '#d4a342',
  spouse: '#e63946',
  sibling: '#38bdf8',
  cousin: '#c084fc',
  guardian: '#34d399',
}

const MIN_K = 0.25
const MAX_K = 2.6

const TREE_EPOCHS = [
  { id: 'pre_adam', target: 'pre_adam', label: { en: 'Before Adam', fr: 'Avant Adam', ar: 'ما قبل آدم' }, dates: 'c. Primordial' },
  { id: 'primordial', target: 'adam', label: { en: 'Primordial', fr: 'Primordial', ar: 'عهد البدء' }, dates: 'c. 4000+ BCE' },
  { id: 'deluge', target: 'nuh', label: { en: 'The Deluge', fr: 'Le Déluge', ar: 'الطوفان' }, dates: 'c. 3000 BCE' },
  { id: 'patriarchs', target: 'ibrahim', label: { en: 'Patriarchs', fr: 'Patriarches', ar: 'الخليل والآباء' }, dates: 'c. 1900 BCE' },
  { id: 'mosaic', target: 'musa', label: { en: 'Mosaic Era', fr: 'Ère Mosaïque', ar: 'الكليم والخروج' }, dates: 'c. 1300 BCE' },
  { id: 'kings', target: 'dawud', label: { en: 'Kingdoms', fr: 'Royaumes', ar: 'الملك والحكمة' }, dates: 'c. 1000 BCE' },
  { id: 'messianic', target: 'isa', label: { en: 'Messianic', fr: 'Messianique', ar: 'المسيح والآيات' }, dates: 'c. 1–33 CE' },
  { id: 'final', target: 'muhammad', label: { en: 'Final Seal', fr: 'Sceau Final', ar: 'الرسالة الخاتمة' }, dates: '570–632 CE / 11 AH' },
]

export function Tree({ focus, mini = false }: { focus?: string; mini?: boolean }) {
  const { t, pick, lang } = useI18n()
  const [includeFamily, setIncludeFamily] = useState(true)
  const [showSpouses, setShowSpouses] = useState(true)
  const [showChildren, setShowChildren] = useState(true)
  const [showExtended, setShowExtended] = useState(true)
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.innerWidth > window.innerHeight * 1.05)

  const filterOpts = useMemo<LayoutFilterOptions>(() => ({
    includeFamily,
    showSpouses,
    showChildren,
    showExtendedFamily: showExtended,
  }), [includeFamily, showSpouses, showChildren, showExtended])

  const layout = useMemo(() => buildLayout(filterOpts, wide, lang === 'ar'), [filterOpts, wide, lang])
  const [selected, setSelected] = useState<string | null>(focus ?? null)
  const box = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<View>({ k: 0.5, x: 0, y: 0 })
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ d: number; k: number } | null>(null)
  const moved = useRef(false)
  const downNode = useRef<string | null>(null)
  const downEdge = useRef<string | null>(null)
  const [glide, setGlide] = useState(false)

  const [activeLegendKind, setActiveLegendKind] = useState<EdgeKind | null>(null)
  const [hoveredEdge, setHoveredEdge] = useState<{ edge: TreeEdge; kind: EdgeKind; x: number; y: number } | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<{ edge: TreeEdge; kind: EdgeKind } | null>(null)
  const [hoveredLegendKind, setHoveredLegendKind] = useState<EdgeKind | null>(null)
  const [showMobileLegend, setShowMobileLegend] = useState(false)
  const [showPreAdamModal, setShowPreAdamModal] = useState(false)

  const activeKind: EdgeKind | null =
    activeLegendKind ??
    hoveredLegendKind ??
    (selectedEdge ? selectedEdge.kind : (hoveredEdge ? hoveredEdge.kind : null))

  const highlightedCount = useMemo(() => {
    if (!activeKind) return 0
    return layout.edges.filter((e) => getEdgeKind(e) === activeKind).length
  }, [layout.edges, activeKind])

  const activeEdgeInfo = useMemo(() => {
    const item = selectedEdge ?? hoveredEdge
    if (!item) return null
    const from = byId.get(item.edge.link.from)
    const to = byId.get(item.edge.link.to)
    if (!from || !to) return null
    return {
      edge: item.edge,
      kind: item.kind,
      from,
      to,
      refs: item.edge.link.r,
      level: item.edge.link.l,
    }
  }, [selectedEdge, hoveredEdge])

  const path = useMemo(() => new Set(selected ? lineage(selected) : []), [selected])
  const nodeById = useMemo(() => new Map(layout.nodes.map((n) => [n.id, n])), [layout])

  const fit = useCallback(
    (centerOn?: TreeNode) => {
      const el = box.current
      if (!el) return
      const cw = el.clientWidth
      const ch = el.clientHeight
      if (centerOn) {
        const k = Math.min(1.1, Math.max(0.7, view.k))
        setView({ k, x: cw / 2 - centerOn.x * k, y: ch / 2.4 - centerOn.y * k })
        return
      }
      const k = Math.max(MIN_K, Math.min(1, Math.min(cw / layout.width, ch / layout.height) * 0.96))
      setView({ k, x: (cw - layout.width * k) / 2, y: (ch - layout.height * k) / 2 })
    },
    [layout, view.k],
  )

  useEffect(() => {
    const n = focus ? nodeById.get(focus) : undefined
    fit(n)
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setWide(el.clientWidth > el.clientHeight * 1.05)
      fit(focus ? nodeById.get(focus) : undefined)
    })
    ro.observe(el)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout])

  const zoomAt = (factor: number, cx: number, cy: number) =>
    setView((v) => {
      const k = Math.max(MIN_K, Math.min(MAX_K, v.k * factor))
      const f = k / v.k
      return { k, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f }
    })

  const onWheel = (e: React.WheelEvent) => {
    if (mini) return
    setGlide(false)
    const r = box.current!.getBoundingClientRect()
    zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top)
  }

  useEffect(() => {
    const el = box.current
    if (!el || mini) return
    const stop = (e: WheelEvent) => e.preventDefault()
    el.addEventListener('wheel', stop, { passive: false })
    return () => el.removeEventListener('wheel', stop)
  }, [mini])

  const onPointerDown = (e: React.PointerEvent) => {
    downNode.current = (e.target as Element).closest('[data-node]')?.getAttribute('data-node') ?? null
    downEdge.current = (e.target as Element).closest('[data-edge-idx]')?.getAttribute('data-edge-idx') ?? null
    moved.current = false
    if (mini) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setGlide(false)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    moved.current = false
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = { d: Math.hypot(a!.x - b!.x, a!.y - b!.y), k: view.k }
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId)
    if (!prev) return
    const next = { x: e.clientX, y: e.clientY }
    pointers.current.set(e.pointerId, next)
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      const d = Math.hypot(a!.x - b!.x, a!.y - b!.y)
      const r = box.current!.getBoundingClientRect()
      const cx = (a!.x + b!.x) / 2 - r.left
      const cy = (a!.y + b!.y) / 2 - r.top
      const target = Math.max(MIN_K, Math.min(MAX_K, (pinch.current.k * d) / pinch.current.d))
      setView((v) => {
        const f = target / v.k
        return { k: target, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f }
      })
      moved.current = true
      return
    }
    const dx = next.x - prev.x
    const dy = next.y - prev.y
    if (Math.abs(dx) + Math.abs(dy) > 2) moved.current = true
    setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }))
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const wasPan = pointers.current.size > 1
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (e.type === 'pointerup' && !wasPan && !moved.current) {
      if (downNode.current) {
        select(downNode.current)
        setSelectedEdge(null)
      } else if (downEdge.current !== null) {
        const idx = Number(downEdge.current)
        const edge = layout.edges[idx]
        if (edge) {
          const kind = getEdgeKind(edge)
          setSelectedEdge((cur) => (cur?.edge === edge ? null : { edge, kind }))
          setSelected(null)
        }
      } else {
        setSelectedEdge(null)
      }
    }
    downNode.current = null
    downEdge.current = null
  }

  function select(id: string) {
    if (moved.current) return
    if (mini) {
      navigate(hrefOf({ name: 'tree', focus: id }))
      return
    }
    setSelected((s) => (s === id ? null : id))
    setSelectedEdge(null)
    reveal(id)
  }

  const jumpToPerson = (id: string) => {
    setSelected(id)
    reveal(id)
    setSelectedEdge(null)
  }

  const jumpToEpoch = (targetId: string) => {
    if (targetId === 'pre_adam') {
      setShowPreAdamModal(true)
      reveal('adam')
      return
    }
    setGlide(true)
    setSelected(targetId)
    reveal(targetId)
  }

  function reveal(id: string) {
    const el = box.current
    const n = nodeById.get(id)
    if (!el || !n) return
    const cw = el.clientWidth
    const ch = el.clientHeight
    const desktop = cw >= 640
    setGlide(true)
    setView((v) => {
      const sx = v.x + n.x * v.k
      const sy = v.y + n.y * v.k
      if (desktop) {
        const panel = 480
        const freeStart = lang === 'ar' ? panel : 0
        const freeEnd = lang === 'ar' ? cw : cw - panel
        if (sx > freeStart + 60 && sx < freeEnd - 60 && sy > 80 && sy < ch - 60) return v
        return { ...v, x: v.x + ((freeStart + freeEnd) / 2 - sx), y: v.y + (ch / 2 - sy) }
      }
      const freeBottom = ch * 0.45
      if (sy > 70 && sy < freeBottom - 30 && sx > 30 && sx < cw - 30) return v
      return { ...v, x: v.x + (cw / 2 - sx), y: v.y + (freeBottom / 2 - sy) }
    })
  }

  const zoomBtn = (f: number) => {
    const el = box.current!
    setGlide(true)
    zoomAt(f, el.clientWidth / 2, el.clientHeight / 2)
  }

  const sel = selected ? byId.get(selected) : undefined
  const selLink = selected ? treeParent.get(selected) : undefined

  const orbForKind = (kind: Kind) => {
    switch (kind) {
      case 'prophet': return 'url(#orb-gold)'
      case 'spouse': return 'url(#orb-spouse)'
      case 'child': return 'url(#orb-child)'
      case 'family':
      default: return 'url(#orb-family)'
    }
  }

  const haloForKind = (kind: Kind) => {
    switch (kind) {
      case 'prophet': return 'url(#halo-gold)'
      case 'spouse': return 'url(#halo-spouse)'
      case 'child': return 'url(#halo-child)'
      case 'family':
      default: return 'url(#halo-family)'
    }
  }

  return (
    <div className={`relative overflow-hidden ${mini ? 'h-[440px] rounded-3xl border border-white/10 bg-night/40 sm:h-[520px]' : 'h-full'}`}>
      <div
        ref={box}
        className={`absolute inset-0 touch-none select-none ${mini ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg width="100%" height="100%" role="group" aria-label={t('navTree')}>
          <defs>
            <radialGradient id="orb-gold" cx="45%" cy="35%" r="65%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.35" stopColor="#ffe699" />
              <stop offset="0.75" stopColor="#d4a342" />
              <stop offset="1" stopColor="#8a6327" />
            </radialGradient>
            <radialGradient id="orb-spouse" cx="35%" cy="30%" r="70%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.25" stopColor="#ff758f" />
              <stop offset="0.65" stopColor="#e63946" />
              <stop offset="0.9" stopColor="#a4161a" />
              <stop offset="1" stopColor="#590d22" />
            </radialGradient>
            <radialGradient id="orb-child" cx="45%" cy="35%" r="65%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.35" stopColor="#bae6fd" />
              <stop offset="0.75" stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0369a1" />
            </radialGradient>
            <radialGradient id="orb-family" cx="45%" cy="35%" r="65%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.35" stopColor="#e0e7ff" />
              <stop offset="0.75" stopColor="#818cf8" />
              <stop offset="1" stopColor="#4338ca" />
            </radialGradient>
            <radialGradient id="halo-gold" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgb(233 198 123 / 0.65)" />
              <stop offset="1" stopColor="rgb(233 198 123 / 0)" />
            </radialGradient>
            <radialGradient id="halo-spouse" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgba(230, 57, 70, 0.75)" />
              <stop offset="0.55" stopColor="rgba(217, 4, 41, 0.35)" />
              <stop offset="1" stopColor="rgba(155, 17, 30, 0)" />
            </radialGradient>
            <radialGradient id="halo-child" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgb(56 189 248 / 0.6)" />
              <stop offset="1" stopColor="rgb(56 189 248 / 0)" />
            </radialGradient>
            <radialGradient id="halo-family" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgb(129 140 248 / 0.55)" />
              <stop offset="1" stopColor="rgb(129 140 248 / 0)" />
            </radialGradient>
          </defs>
          <g
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
              transformOrigin: '0 0',
              transition: glide ? 'transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)' : 'none',
            }}
          >
            {layout.edges.map((e, i) => {
              const kind = getEdgeKind(e)
              const onPath = path.has(e.link.from) && path.has(e.link.to) && !e.arc
              const isMarriage = e.isMarriage
              const isSibling = kind === 'sibling'
              const isCousin = kind === 'cousin'
              const isGuardian = kind === 'guardian'

              const isKindHighlighted = activeKind === kind
              const isDirectlyActive = selectedEdge?.edge === e || hoveredEdge?.edge === e
              const isHighlighted = isKindHighlighted || isDirectlyActive

              const isDimmedByKind = activeKind !== null && !isKindHighlighted
              const isDimmedByNode = selected !== null && !onPath
              const dim = isDimmedByKind || (activeKind === null && isDimmedByNode)

              const strokeColor = isMarriage
                ? '#e63946'
                : isSibling
                  ? '#38bdf8'
                  : isCousin
                    ? '#c084fc'
                    : isGuardian
                      ? '#34d399'
                      : LEVEL_STROKE[e.link.l]

              const strokeDash = isMarriage
                ? '3 3'
                : isSibling
                  ? '4 3'
                  : isCousin
                    ? '2 4'
                    : isGuardian
                      ? '7 3 2 3'
                      : e.link.type === 'descendant'
                        ? '6 7'
                        : undefined

              const strokeWidth = isHighlighted
                ? (isMarriage ? 4.2 : 3.8)
                : isMarriage
                  ? 2.2
                  : onPath
                    ? 2.8
                    : e.arc
                      ? 1.8
                      : 1.7

              const strokeOpacity = isHighlighted
                ? 1
                : isDimmedByKind
                  ? 0.1
                  : dim
                    ? 0.16
                    : isMarriage
                      ? 0.95
                      : e.arc
                        ? 0.85
                        : 0.75

              const glowClass = isHighlighted
                ? kind === 'spouse'
                  ? 'edge-glow-marriage'
                  : kind === 'sibling'
                    ? 'edge-glow-sibling'
                    : kind === 'cousin'
                      ? 'edge-glow-cousin'
                      : kind === 'guardian'
                        ? 'edge-glow-guardian'
                        : kind === 'descendant'
                          ? 'edge-glow-descendant'
                          : 'edge-glow-parent'
                : ''

              return (
                <g
                  key={i}
                  data-edge-idx={i}
                  opacity={strokeOpacity}
                  className="transition-all duration-300 pointer-events-auto"
                >
                  {/* Outer bloom stroke when glowing */}
                  {isHighlighted && (
                    <path
                      d={e.d}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth + 5}
                      strokeOpacity={0.4}
                      strokeLinecap="round"
                      className={glowClass}
                    />
                  )}

                  {/* Main visible line */}
                  <path
                    d={e.d}
                    fill="none"
                    stroke={isHighlighted ? '#ffffff' : strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDash}
                    strokeLinecap="round"
                    className={glowClass}
                  />

                  {/* Marriage union circular badge */}
                  {isMarriage && e.union && (
                    <g transform={`translate(${e.union.x},${e.union.y})`}>
                      <circle
                        r={isHighlighted ? 6 : 4}
                        fill="#e63946"
                        stroke="#ffffff"
                        strokeWidth={isHighlighted ? 1.8 : 1}
                        className={isHighlighted ? 'animate-pulse' : ''}
                      />
                      <circle
                        r={isHighlighted ? 12 : 7}
                        fill="none"
                        stroke="rgba(230, 57, 70, 0.6)"
                        strokeWidth={isHighlighted ? 1.5 : 0.8}
                      />
                    </g>
                  )}

                  {/* Flowing particle animation on path */}
                  {onPath && !isMarriage && !isHighlighted && (
                    <path
                      d={e.d}
                      fill="none"
                      stroke="#fff6dc"
                      strokeWidth={2.6}
                      className="edge-flow"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Wide transparent hit target for effortless hover/click */}
                  <path
                    d={e.d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={22}
                    strokeLinecap="round"
                    className="cursor-pointer"
                    onPointerEnter={(evt) => {
                      setHoveredEdge({ edge: e, kind, x: evt.clientX, y: evt.clientY })
                    }}
                    onPointerLeave={() => {
                      setHoveredEdge((cur) => (cur?.edge === e ? null : cur))
                    }}
                  />
                </g>
              )
            })}

            {/* Pre-Adamic Realm Cosmic Anchor above Adam */}
            {nodeById.has('adam') && (() => {
              const adam = nodeById.get('adam')!
              const py = adam.y - 75
              const px = adam.x
              return (
                <g
                  className="cursor-pointer group/preadam"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowPreAdamModal(true)
                  }}
                >
                  <line
                    x1={px}
                    y1={py + 16}
                    x2={px}
                    y2={adam.y - 20}
                    stroke="rgba(233,198,123,0.35)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  {/* Cosmic Aura */}
                  <circle cx={px} cy={py} r={24} fill="rgba(245,158,11,0.12)" className="animate-pulse" />
                  <circle cx={px} cy={py} r={14} fill="rgba(30,27,75,0.92)" stroke="#e9c67b" strokeWidth="1.5" />
                  <circle cx={px} cy={py} r={4} fill="#ffe699" />
                  {/* Floating Pill Label */}
                  <rect
                    x={px - 84}
                    y={py - 34}
                    width={168}
                    height={22}
                    rx={11}
                    fill="rgba(10,12,24,0.95)"
                    stroke="rgba(233,198,123,0.55)"
                    strokeWidth="1"
                    className="shadow-lg"
                  />
                  <text
                    x={px}
                    y={py - 20}
                    textAnchor="middle"
                    fill="#ffe699"
                    fontSize="10"
                    fontWeight="bold"
                    className="select-none font-sans"
                  >
                    {lang === 'ar' ? '✨ عالم ما قبل آدم (الجن والحن والبن)' : '✨ Pre-Adamic Realm (Jinn & Hinn)'}
                  </text>
                </g>
              )
            })()}

            {layout.nodes.map((n) => {
              const prophet = n.person.kind === 'prophet'
              const spouse = n.person.kind === 'spouse'
              const child = n.person.kind === 'child'
              const active = selected === n.id
              const onPath = path.has(n.id)
              const dim = selected && !onPath
              const r = prophet ? (n.person.ululAzm ? 17 : 13) : spouse ? 11 : child ? 10 : 9
              const dateLabelRaw = (() => {
                if (n.person.era) return pick(n.person.era.t)
                if (n.person.dates) {
                  const d = n.person.dates
                  if (d.hijriBorn && d.hijriDied) return `${formatDate(d.hijriBorn, lang)} – ${formatDate(d.hijriDied, lang)}`
                  if (d.gregorianBorn && d.gregorianDied) return `${formatDate(d.gregorianBorn, lang)} – ${formatDate(d.gregorianDied, lang)}`
                  if (d.born?.t) return pick(d.born.t)
                }
                return null
              })()
              const dateLabel = dateLabelRaw
                ? dateLabelRaw.length > 28
                  ? (dateLabelRaw.includes('،') ? dateLabelRaw.split('،')[0] : dateLabelRaw.slice(0, 26) + '…')
                  : dateLabelRaw
                : null
              const pillW = dateLabel ? Math.max(88, Math.min(220, dateLabel.length * 7.5 + 24)) : 0
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x},${n.y})`}
                  opacity={dim ? 0.35 : 1}
                  className={`cursor-pointer transition-all duration-500 focus:outline-none ${active ? 'celestial-node-glow' : ''}`}
                  role="button"
                  tabIndex={mini ? -1 : 0}
                  aria-pressed={active}
                  data-node={n.id}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                      ev.preventDefault()
                      moved.current = false
                      select(n.id)
                    }
                  }}
                >
                  <circle
                    r={r * 3.4}
                    fill={haloForKind(n.person.kind)}
                    opacity={active ? 1 : onPath ? 0.8 : prophet ? 0.5 : 0.25}
                  />
                  {active && (
                    <circle
                      r={r + 7}
                      fill="none"
                      stroke={prophet ? '#fbe6b0' : spouse ? '#ff4d6d' : child ? '#7ec8e3' : '#c9d0f5'}
                      strokeWidth={1.5}
                      strokeDasharray="2 3"
                      className="orbit"
                    />
                  )}
                  <circle
                    r={r}
                    fill={orbForKind(n.person.kind)}
                    stroke="#ffffff"
                    strokeWidth={1.2}
                    strokeOpacity={0.75}
                  />
                  {n.person.ululAzm && (
                    <circle
                      r={r + 4}
                      fill="none"
                      stroke="#e9c67b"
                      strokeOpacity={0.85}
                      strokeWidth={1}
                      strokeDasharray="2 3"
                      className="orbit"
                    />
                  )}
                  <text
                    y={r + 24}
                    textAnchor="middle"
                    fontFamily="Reem Kufi Variable, serif"
                    fontSize={prophet ? 22 : 16}
                    fill={prophet ? '#fbe6b0' : spouse ? '#ff758f' : child ? '#d7f0fa' : '#c9d0f5'}
                    fontWeight={600}
                    className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  >
                    {n.person.name.ar}
                  </text>
                  {lang !== 'ar' && (
                    <text
                      y={r + 44}
                      textAnchor="middle"
                      fontFamily="Sora Variable, sans-serif"
                      fontSize={12}
                      fill="#c3bdd2"
                      letterSpacing={0.4}
                      className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                    >
                      {pick(n.person.name)}
                    </text>
                  )}
                  {dateLabel && (
                    <g transform={`translate(0, ${r + (lang !== 'ar' ? 62 : 46)})`}>
                      <rect
                        x={-pillW / 2}
                        y="-9"
                        width={pillW}
                        height="18"
                        rx="9"
                        fill="rgba(16, 12, 30, 0.9)"
                        stroke={prophet ? 'rgba(233, 198, 123, 0.45)' : spouse ? 'rgba(230, 57, 70, 0.45)' : 'rgba(255, 255, 255, 0.2)'}
                        strokeWidth="0.8"
                      />
                      <text
                        y="3.5"
                        textAnchor="middle"
                        fontSize="9.5"
                        fill={prophet ? '#f6e3b4' : spouse ? '#ff85a1' : '#cbd5e1'}
                        fontFamily="Sora Variable, sans-serif"
                        fontWeight={500}
                        letterSpacing="0.2"
                      >
                        {dateLabel}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {!mini && (
        <>
          {/* Top Filter Toolbar */}
          <div className="absolute inset-x-4 top-3 flex flex-wrap items-center justify-between gap-2 sm:inset-x-6 sm:top-5">
            <div className="glass flex flex-wrap items-center gap-1.5 rounded-full p-1.5 text-xs shadow-lg">
              <button
                type="button"
                onClick={() => setIncludeFamily((v) => !v)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors ${
                  includeFamily ? 'bg-gold/25 text-gold-2' : 'text-ink-3 hover:text-ink'
                }`}
                title={t('showFamily')}
              >
                <Users className="size-3.5" aria-hidden="true" />
                <span>{includeFamily ? t('showFamily') : t('filterProphets')}</span>
              </button>

              {includeFamily && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowSpouses((v) => !v)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all ${
                      showSpouses ? 'bg-rose-600/30 text-rose-200 border border-rose-500/40 shadow-[0_0_12px_rgba(230,57,70,0.3)]' : 'text-ink-3 hover:text-ink'
                    }`}
                    title={t('showWives')}
                  >
                    <Heart className="size-3.5 fill-current" aria-hidden="true" />
                    <span>{t('showWives')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowChildren((v) => !v)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                      showChildren ? 'bg-sky-500/20 text-sky-300' : 'text-ink-3 hover:text-ink'
                    }`}
                    title={t('showChildren')}
                  >
                    <Baby className="size-3.5" aria-hidden="true" />
                    <span>{t('showChildren')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowExtended((v) => !v)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                      showExtended ? 'bg-indigo-500/20 text-indigo-300' : 'text-ink-3 hover:text-ink'
                    }`}
                    title={t('showExtendedFamily')}
                  >
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    <span>{t('showExtendedFamily')}</span>
                  </button>
                </>
              )}
            </div>

            {/* Zoom / Fit Controls & Map View Toggle */}
            <div className="flex items-center gap-2">
              <A
                href="/map"
                className="glass flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-gold hover:border-gold/50 hover:bg-gold/15 shadow-md transition-colors"
                title={t('mapView')}
              >
                <Compass className="size-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{t('mapView')}</span>
              </A>

              {[
                { f: 1.25, icon: Plus, label: t('zoomIn') },
                { f: 0.8, icon: Minus, label: t('zoomOut') },
              ].map(({ f, icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => zoomBtn(f)}
                  className="glass grid size-10 place-items-center rounded-full text-ink hover:border-gold/50 shadow-md"
                  aria-label={label}
                  title={label}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setGlide(true)
                  fit()
                }}
                className="glass grid size-10 place-items-center rounded-full text-ink hover:border-gold/50 shadow-md"
                aria-label={t('fit')}
                title={t('fit')}
              >
                <Maximize2 className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setGlide(true)
                  fit()
                  setSelected(null)
                }}
                className="glass grid size-10 place-items-center rounded-full text-ink hover:border-gold/50 shadow-md"
                aria-label={t('resetView')}
                title={t('resetView')}
              >
                <RotateCcw className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Top Banner when an edge kind is highlighted across the tree */}
          {activeLegendKind && (
            <div className="glass pointer-events-auto absolute top-4 inset-x-0 mx-auto w-fit max-w-[90%] rounded-full px-4 py-2 text-center text-xs text-ink flex items-center gap-3 shadow-2xl border border-gold/40 z-30 backdrop-blur-md animate-fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-gold animate-spin-slow" />
                <span>
                  {t('edgeHighlightActive')}: <strong className="text-gold font-semibold">{t(KIND_STRING_KEY[activeLegendKind])}</strong> ({highlightedCount} {t('legendLines')})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveLegendKind(null)}
                className="ms-1.5 rounded-full bg-white/10 hover:bg-white/20 px-2 py-0.5 text-[0.65rem] font-medium text-ink transition-colors flex items-center gap-1 cursor-pointer"
                title={t('clearHighlight')}
              >
                <X className="size-3" />
                <span>{t('clearHighlight')}</span>
              </button>
            </div>
          )}

          {/* Interactive Edge Floating Relationship Card */}
          {activeEdgeInfo && (
            <div className="glass-strong pointer-events-auto absolute top-4 end-4 z-30 w-80 max-w-[calc(100vw-2rem)] rounded-2xl p-4 shadow-2xl border border-white/15 backdrop-blur-xl animate-fade-in">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: EDGE_KIND_COLOR[activeEdgeInfo.kind], color: EDGE_KIND_COLOR[activeEdgeInfo.kind] }}
                  />
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-ink">
                    {t(KIND_STRING_KEY[activeEdgeInfo.kind])}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEdge(null)
                    setHoveredEdge(null)
                  }}
                  className="rounded-full p-1 text-ink-3 hover:bg-white/10 hover:text-ink transition-colors cursor-pointer"
                  aria-label={t('close')}
                >
                  <X className="size-3.5" />
                </button>
              </div>

              {/* Connected persons */}
              <div className="mt-3 flex items-center justify-between gap-2 text-xs bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => jumpToPerson(activeEdgeInfo.from.id)}
                  className="text-start hover:text-gold transition-colors font-medium text-ink min-w-0 flex-1 cursor-pointer"
                >
                  <span className="block truncate">{pick(activeEdgeInfo.from.name)}</span>
                  <span className="ar-name block text-xs text-gold truncate">{activeEdgeInfo.from.name.ar}</span>
                </button>
                <span className="text-ink-3 text-xs shrink-0 px-1">➔</span>
                <button
                  type="button"
                  onClick={() => jumpToPerson(activeEdgeInfo.to.id)}
                  className="text-end hover:text-gold transition-colors font-medium text-ink min-w-0 flex-1 cursor-pointer"
                >
                  <span className="block truncate">{pick(activeEdgeInfo.to.name)}</span>
                  <span className="ar-name block text-xs text-gold truncate">{activeEdgeInfo.to.name.ar}</span>
                </button>
              </div>

              {/* Scripture & Hadith Reference Chips */}
              {activeEdgeInfo.refs && activeEdgeInfo.refs.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                  {activeEdgeInfo.refs.map((r) => (
                    <RefChip key={r} r={r} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile Legend Toggle Button */}
          <button
            type="button"
            onClick={() => setShowMobileLegend((s) => !s)}
            className="glass pointer-events-auto md:hidden absolute start-3 bottom-14 z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-ink shadow-lg border border-white/10 cursor-pointer"
          >
            <Layers className="size-3.5 text-gold" />
            <span>{t('legend')}</span>
          </button>

          {/* Specific Categorized Interactive Legend */}
          <div
            className={`glass pointer-events-auto absolute start-3 bottom-24 md:bottom-3 z-20 max-w-xs rounded-2xl p-3.5 text-xs text-ink-2 sm:start-5 sm:bottom-5 ${
              showMobileLegend ? 'block' : 'hidden'
            } md:block shadow-2xl backdrop-blur-xl border border-white/10`}
          >
            <div className="mb-2 font-bold text-ink text-[0.8rem] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="size-3.5 text-gold" />
                {t('legend')}
              </span>
              {activeLegendKind && (
                <button
                  type="button"
                  onClick={() => setActiveLegendKind(null)}
                  className="text-[0.65rem] text-gold-2 hover:text-gold underline cursor-pointer"
                >
                  {t('clearHighlight')}
                </button>
              )}
            </div>

            {/* Lineage & Marriage */}
            <div className="space-y-1 pb-2 border-b border-white/5">
              <span className="text-[0.65rem] font-semibold text-gold tracking-wider uppercase block mb-1">
                {t('legendLineage')}
              </span>

              {/* Parent & Child */}
              <button
                type="button"
                onClick={() => setActiveLegendKind((k) => (k === 'parent' ? null : 'parent'))}
                onPointerEnter={() => setHoveredLegendKind('parent')}
                onPointerLeave={() => setHoveredLegendKind(null)}
                className={`w-full flex items-center justify-between gap-2 px-2 py-1 rounded-xl transition-all text-start cursor-pointer ${
                  activeKind === 'parent'
                    ? 'bg-gold/20 ring-1.5 ring-gold text-ink shadow-[0_0_12px_rgba(233,198,123,0.35)]'
                    : 'hover:bg-white/5 text-ink-2'
                }`}
                title={t('legendHighlightTip')}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg width="30" height="6" aria-hidden="true" className="shrink-0">
                    <line x1="0" y1="3" x2="30" y2="3" stroke="var(--color-lvl-quran)" strokeWidth="2.5" />
                  </svg>
                  <span className="text-[0.7rem] font-medium truncate text-ink">{t('linkParent')}</span>
                </div>
                {activeKind === 'parent' && <Sparkles className="size-3 text-gold shrink-0 animate-pulse" />}
              </button>

              {/* Descendant */}
              <button
                type="button"
                onClick={() => setActiveLegendKind((k) => (k === 'descendant' ? null : 'descendant'))}
                onPointerEnter={() => setHoveredLegendKind('descendant')}
                onPointerLeave={() => setHoveredLegendKind(null)}
                className={`w-full flex items-center justify-between gap-2 px-2 py-1 rounded-xl transition-all text-start cursor-pointer ${
                  activeKind === 'descendant'
                    ? 'bg-gold/20 ring-1.5 ring-gold text-ink shadow-[0_0_12px_rgba(233,198,123,0.35)]'
                    : 'hover:bg-white/5 text-ink-2'
                }`}
                title={t('legendHighlightTip')}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg width="30" height="6" aria-hidden="true" className="shrink-0">
                    <line x1="0" y1="3" x2="30" y2="3" stroke="var(--color-lvl-tradition)" strokeWidth="2" strokeDasharray="6 5" />
                  </svg>
                  <span className="text-[0.7rem] font-medium truncate text-ink-2">{t('linkDescendant')}</span>
                </div>
                {activeKind === 'descendant' && <Sparkles className="size-3 text-gold shrink-0 animate-pulse" />}
              </button>

              {/* Spouse / Marriage */}
              <button
                type="button"
                onClick={() => setActiveLegendKind((k) => (k === 'spouse' ? null : 'spouse'))}
                onPointerEnter={() => setHoveredLegendKind('spouse')}
                onPointerLeave={() => setHoveredLegendKind(null)}
                className={`w-full flex items-center justify-between gap-2 px-2 py-1 rounded-xl transition-all text-start cursor-pointer ${
                  activeKind === 'spouse'
                    ? 'bg-rose-500/20 ring-1.5 ring-rose-500 text-rose-200 shadow-[0_0_12px_rgba(230,57,70,0.35)]'
                    : 'hover:bg-white/5 text-ink-2'
                }`}
                title={t('legendHighlightTip')}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg width="30" height="6" aria-hidden="true" className="shrink-0">
                    <line x1="0" y1="3" x2="30" y2="3" stroke="#e63946" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="15" cy="3" r="2.5" fill="#e63946" stroke="#ffffff" strokeWidth="0.8" />
                  </svg>
                  <span className="text-[0.7rem] font-medium truncate text-rose-300">{t('linkSpouse')}</span>
                </div>
                {activeKind === 'spouse' && <Sparkles className="size-3 text-rose-400 shrink-0 animate-pulse" />}
              </button>
            </div>

            {/* Specific Lateral Arcs */}
            <div className="space-y-1 pt-2 pb-2 border-b border-white/5">
              <span className="text-[0.65rem] font-semibold text-sky-400 tracking-wider uppercase block mb-1">
                {t('legendBonds')}
              </span>

              {/* Sibling */}
              <button
                type="button"
                onClick={() => setActiveLegendKind((k) => (k === 'sibling' ? null : 'sibling'))}
                onPointerEnter={() => setHoveredLegendKind('sibling')}
                onPointerLeave={() => setHoveredLegendKind(null)}
                className={`w-full flex items-center justify-between gap-2 px-2 py-1 rounded-xl transition-all text-start cursor-pointer ${
                  activeKind === 'sibling'
                    ? 'bg-sky-500/20 ring-1.5 ring-sky-400 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                    : 'hover:bg-white/5 text-ink-2'
                }`}
                title={t('legendHighlightTip')}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg width="30" height="6" aria-hidden="true" className="shrink-0">
                    <line x1="0" y1="3" x2="30" y2="3" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />
                  </svg>
                  <span className="text-[0.7rem] font-medium truncate text-sky-300">{t('linkSibling')}</span>
                </div>
                {activeKind === 'sibling' && <Sparkles className="size-3 text-sky-400 shrink-0 animate-pulse" />}
              </button>

              {/* Cousin */}
              <button
                type="button"
                onClick={() => setActiveLegendKind((k) => (k === 'cousin' ? null : 'cousin'))}
                onPointerEnter={() => setHoveredLegendKind('cousin')}
                onPointerLeave={() => setHoveredLegendKind(null)}
                className={`w-full flex items-center justify-between gap-2 px-2 py-1 rounded-xl transition-all text-start cursor-pointer ${
                  activeKind === 'cousin'
                    ? 'bg-purple-500/20 ring-1.5 ring-purple-400 text-purple-200 shadow-[0_0_12px_rgba(192,132,252,0.35)]'
                    : 'hover:bg-white/5 text-ink-2'
                }`}
                title={t('legendHighlightTip')}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg width="30" height="6" aria-hidden="true" className="shrink-0">
                    <line x1="0" y1="3" x2="30" y2="3" stroke="#c084fc" strokeWidth="2" strokeDasharray="2 4" />
                  </svg>
                  <span className="text-[0.7rem] font-medium truncate text-purple-300">{t('linkCousin')}</span>
                </div>
                {activeKind === 'cousin' && <Sparkles className="size-3 text-purple-400 shrink-0 animate-pulse" />}
              </button>

              {/* Guardian */}
              <button
                type="button"
                onClick={() => setActiveLegendKind((k) => (k === 'guardian' ? null : 'guardian'))}
                onPointerEnter={() => setHoveredLegendKind('guardian')}
                onPointerLeave={() => setHoveredLegendKind(null)}
                className={`w-full flex items-center justify-between gap-2 px-2 py-1 rounded-xl transition-all text-start cursor-pointer ${
                  activeKind === 'guardian'
                    ? 'bg-emerald-500/20 ring-1.5 ring-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.35)]'
                    : 'hover:bg-white/5 text-ink-2'
                }`}
                title={t('legendHighlightTip')}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg width="30" height="6" aria-hidden="true" className="shrink-0">
                    <line x1="0" y1="3" x2="30" y2="3" stroke="#34d399" strokeWidth="2" strokeDasharray="7 3 2 3" />
                  </svg>
                  <span className="text-[0.7rem] font-medium truncate text-emerald-300">{t('linkGuardian')}</span>
                </div>
                {activeKind === 'guardian' && <Sparkles className="size-3 text-emerald-400 shrink-0 animate-pulse" />}
              </button>
            </div>

            {/* Tip */}
            <p className="mt-2 text-[0.62rem] text-ink-3 italic leading-tight">
              {t('legendHighlightTip')}
            </p>

            {/* Level Chips */}
            <div className="mt-2 flex flex-wrap gap-1">
              <LevelChip level="quran" />
              <LevelChip level="hadith" />
              <LevelChip level="tradition" />
              <LevelChip level="disputed" />
            </div>
          </div>

          {!sel && (
            <p className="glass pointer-events-none absolute inset-x-0 bottom-4 mx-auto w-fit max-w-[90%] rounded-full px-4 py-2 text-center text-xs text-ink-2 md:bottom-5">
              {t('traceHint')}
            </p>
          )}

          {/* Side Drawer Inspector */}
          {sel && (
            <aside
              aria-live="polite"
              className="glass-strong absolute inset-x-2 bottom-2 max-h-[60%] overflow-y-auto rounded-3xl p-5 shadow-2xl sm:inset-x-auto sm:end-6 sm:top-20 sm:bottom-6 sm:max-h-none sm:w-[26rem]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[0.65rem] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gold">
                      {sel.kind === 'prophet' ? t('navTree') : sel.kind === 'spouse' ? t('showWives') : sel.kind === 'child' ? t('showChildren') : t('showExtendedFamily')}
                    </span>
                    {sel.ululAzm && <span className="text-[0.65rem] text-gold">{t('ululBadge')}</span>}
                  </div>
                  <p className="ar-name gold-text text-4xl font-bold">{sel.name.ar}</p>
                  <p className="mt-1 text-lg text-ink">
                    <SubName p={sel} />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 hover:bg-white/10"
                  aria-label={t('close')}
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              {sel.title && <FactText fact={sel.title} className="mt-4 text-sm" />}

              {/* Parents (Father & Mother) */}
              {sel.parents && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <p className="font-semibold text-ink-3 mb-1.5 uppercase tracking-wider">{t('family')}</p>
                  {sel.parents.father && (
                    <div className="mb-1">
                      <span className="text-gold font-medium">{t('father')}: </span>
                      <FactText fact={sel.parents.father} />
                    </div>
                  )}
                  {sel.parents.mother && (
                    <div className="mb-1">
                      <span className="text-gold font-medium">{t('mother')}: </span>
                      <FactText fact={sel.parents.mother} />
                    </div>
                  )}
                  {sel.parents.fosterMother && (
                    <div>
                      <span className="text-gold font-medium">{t('fosterMother')}: </span>
                      <FactText fact={sel.parents.fosterMother} />
                    </div>
                  )}
                </div>
              )}

              {/* Spouses */}
              {sel.spouses && sel.spouses.length > 0 && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <p className="font-semibold text-rose-300 mb-1.5 uppercase tracking-wider">{t('showWives')}</p>
                  <div className="space-y-1">
                    {sel.spouses.map((sp, idx) => (
                      <FactText key={idx} fact={sp} />
                    ))}
                  </div>
                </div>
              )}

              {/* Children */}
              {sel.allChildren && sel.allChildren.length > 0 && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <p className="font-semibold text-sky-300 mb-1.5 uppercase tracking-wider">{t('showChildren')}</p>
                  <div className="space-y-1">
                    {sel.allChildren.map((ch, idx) => (
                      <FactText key={idx} fact={ch} />
                    ))}
                  </div>
                </div>
              )}

              {/* Dates & Lifespan */}
              {sel.dates && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-300 mb-1.5 uppercase tracking-wider">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    <span>{t('dates')}</span>
                  </div>
                  {sel.dates.hijriBorn && (
                    <p className="text-ink-2">
                      <span className="text-gold">{t('born')}: </span>
                      <span className="font-mono font-medium">{formatBirthDeath(sel.dates.hijriBorn, sel.dates.gregorianBorn, lang)}</span>
                    </p>
                  )}
                  {sel.dates.hijriDied && (
                    <p className="text-ink-2">
                      <span className="text-gold">{t('died')}: </span>
                      <span className="font-mono font-medium">{formatBirthDeath(sel.dates.hijriDied, sel.dates.gregorianDied, lang)}</span>
                    </p>
                  )}
                  {sel.dates.born && !sel.dates.hijriBorn && <FactText fact={sel.dates.born} />}
                </div>
              )}

              {/* Life Events Milestone Quick Preview */}
              {sel.events && sel.events.length > 0 && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <div className="flex items-center justify-between font-semibold text-gold mb-1.5 uppercase tracking-wider">
                    <span>{t('lifeEvents')}</span>
                    <span className="text-[0.65rem] opacity-75">{t('eventsCount', { n: sel.events.length })}</span>
                  </div>
                  <ul className="space-y-1 text-ink-2">
                    {sel.events.slice(0, 3).map((ev) => (
                      <li key={ev.id} className="flex items-start gap-1.5">
                        <span className="text-gold font-bold">·</span>
                        <span>{pick(ev.title)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {sel.sentTo && (
                <div className="mt-3 text-xs">
                  <p className="mb-1 font-semibold text-ink-3 uppercase">{t('sentTo')}</p>
                  <FactText fact={sel.sentTo} />
                </div>
              )}

              {selLink && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <p className="text-ink-3">
                    {pick(byId.get(selLink.from)!.name)} → {pick(sel.name)}
                  </p>
                  {selLink.note && <p className="mt-1 text-ink-2">{pick(selLink.note)}</p>}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <LevelChip level={selLink.l} />
                    <Refs refs={selLink.r} />
                  </div>
                </div>
              )}

              <A href={hrefOf({ name: 'person', id: sel.id })} className="btn btn-gold mt-5 w-full justify-center">
                {t('openProfile')} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </A>
            </aside>
          )}

          {/* Bottom Floating Time-Space Epoch Ruler */}
          <div className="absolute inset-x-4 bottom-4 z-10 flex justify-center pointer-events-none sm:inset-x-6 sm:bottom-6">
            <div className="glass pointer-events-auto flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full p-1.5 shadow-2xl border border-gold/30 bg-night-surface/95 backdrop-blur-md scrollbar-none">
              <div className="flex items-center gap-1.5 ps-2.5 pe-1 text-xs font-semibold text-gold">
                <Clock className="size-3.5" />
                <span className="hidden sm:inline">{lang === 'ar' ? 'العصور الزمانية:' : 'Epochs:'}</span>
              </div>
              {TREE_EPOCHS.map((ep) => {
                const active = selected && lineage(selected).includes(ep.target)
                return (
                  <button
                    key={ep.id}
                    type="button"
                    onClick={() => jumpToEpoch(ep.target)}
                    className={`group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-all ${
                      active
                        ? 'bg-gold text-night font-bold shadow-[0_0_12px_rgba(233,198,123,0.5)]'
                        : 'text-ink-2 hover:bg-white/10 hover:text-ink'
                    }`}
                    title={`${ep.label[lang]} (${formatDate(ep.dates, lang)})`}
                  >
                    <span>{ep.label[lang]}</span>
                    <span className={`text-[0.65rem] opacity-75 ${active ? 'text-night font-mono' : 'text-gold-2 font-mono'}`}>
                      {formatDate(ep.dates.split(' ')[0], lang)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
      {mini && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
      )}
      {showPreAdamModal && <TreePreAdamModal onClose={() => setShowPreAdamModal(false)} />}
    </div>
  )
}

function TreePreAdamModal({ onClose }: { onClose: () => void }) {
  const { pick, lang } = useI18n()
  const [selectedEntity, setSelectedEntity] = useState<PreAdamEntity | null>(null)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-gold/40 bg-night-2 p-6 sm:p-8 shadow-2xl no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 rounded-full bg-white/10 p-2 text-ink-2 hover:bg-white/20 hover:text-ink cursor-pointer"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-start gap-3.5 mb-6">
          <div className="size-12 rounded-2xl bg-amber-500/20 border border-gold/40 flex items-center justify-center shrink-0 shadow-inner">
            <Flame className="size-6 text-gold animate-pulse" />
          </div>
          <div>
            <span className="text-[0.68rem] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/25">
              {lang === 'ar' ? 'فصل تمهيدي في شجرة الأنبياء' : 'Primordial Prologue'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
              {lang === 'ar' ? 'عالم ما قبل آدم: الجن، الحن، والبن، والنسناس' : 'The Pre-Adamic Realm: Jinn, Hinn, Binn & Nasnas'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-2 mt-1.5 leading-relaxed">
              {lang === 'ar'
                ? 'آدم عليه السلام هو أبو البشر، لكن كتب التفسير والتاريخ الإسلامي (كابن كثير والطبري) وثقت وجود أمم أرضية وخلق مادي مكلّف سبق وجود بني آدم في الأرض؛ كالجن المخلوقين من نار السموم، والحن والبن والنسناس الذين أفسدوا وسفكوا الدماء.'
                : 'Prophet Adam (peace be upon him) is the Father of Humankind. Classical Islamic sources document the earlier inhabitants of Earth before Adam was appointed as Khalifah, explaining the Angels’ inquiry regarding corruption and bloodshed.'}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PRE_ADAM_ENTITIES.map((entity) => {
            const isSelected = selectedEntity?.id === entity.id
            return (
              <div
                key={entity.id}
                onClick={() => setSelectedEntity(isSelected ? null : entity)}
                className={`rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-gold bg-gold/[0.08] shadow-[0_0_20px_rgba(233,198,123,0.25)]'
                    : 'border-white/10 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.06]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-ink text-base group-hover:text-gold transition-colors">
                        {pick(entity.name)}
                      </h3>
                      <p className="text-xs text-gold-2 font-medium mt-0.5">{pick(entity.subTitle)}</p>
                    </div>
                    <span className="text-xs font-mono text-ink-3 bg-white/5 px-2 py-0.5 rounded shrink-0">
                      {pick(entity.era)}
                    </span>
                  </div>

                  <div className="my-3 rounded-xl bg-night-3/70 p-3 border border-white/5">
                    <p className="text-xs text-ink-2 leading-relaxed">
                      {pick(entity.summary)}
                    </p>
                  </div>

                  <div className="text-[0.72rem] text-ink-3 space-y-1">
                    <p><strong className="text-gold/90">{lang === 'ar' ? 'طبيعة الخلق:' : 'Nature:'}</strong> {pick(entity.nature)}</p>
                    {entity.scientificCorrelation && (
                      <p><strong className="text-sky-300">{lang === 'ar' ? 'الربط العلمي والإحاثي:' : 'Paleontological link:'}</strong> {pick(entity.scientificCorrelation)}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Refs refs={entity.quranRefs} />
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-gold-2 transition-colors cursor-pointer"
                  >
                    <BookOpen className="size-3.5" />
                    <span>{isSelected ? (lang === 'ar' ? 'إغلاق الأدلة' : 'Collapse') : (lang === 'ar' ? 'أقوال العلماء والمصادر' : 'Scholarly Sources')}</span>
                  </button>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-gold/20 space-y-3 animate-fadeIn">
                    <div className="rounded-xl bg-black/40 p-3.5 border border-gold/20">
                      <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Info className="size-3.5" />
                        <span>{lang === 'ar' ? 'التفصيل العقدي والتاريخي:' : 'Theological & Historical Detail:'}</span>
                      </h4>
                      <p className="text-xs text-ink leading-relaxed">
                        {pick(entity.detailedDescription)}
                      </p>
                    </div>

                    {entity.scholarlySources.map((s, idx) => (
                      <div key={idx} className="rounded-xl bg-white/[0.02] p-3 border border-white/10">
                        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-gold mb-1">
                          <span>{pick(s.author)}</span>
                          <span className="text-[0.68rem] text-ink-3 italic">{pick(s.work)}</span>
                        </div>
                        <blockquote className="text-xs text-ink-2 italic border-s-2 border-gold/40 ps-2.5 my-1 font-serif">
                          {pick(s.citation)}
                        </blockquote>
                      </div>
                    ))}

                    <div className="rounded-xl bg-amber-500/10 p-3 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                      <strong className="text-gold block mb-1">{lang === 'ar' ? 'الخلاصة الإيمانية:' : 'Creed & Theological Note:'}</strong>
                      {pick(entity.theologicalContext)}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
