import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Baby, Calendar, Heart, Maximize2, Minus, Plus, Sparkles, Users, X } from 'lucide-react'
import { useI18n } from '../i18n'
import { buildLayout, lineage, type TreeNode, type LayoutFilterOptions } from '../lib/layout'
import { treeParent } from '../data/links'
import { byId } from '../data/people'
import type { Kind } from '../data/types'
import { hrefOf, navigate } from '../lib/router'
import { A, FactText, LEVEL_STROKE, LevelChip, Refs, SubName } from './ui'

interface View {
  k: number
  x: number
  y: number
}

const MIN_K = 0.25
const MAX_K = 2.6

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
  const [glide, setGlide] = useState(false)

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
    if (e.type === 'pointerup' && !wasPan && downNode.current) select(downNode.current)
    downNode.current = null
  }

  function select(id: string) {
    if (moved.current) return
    if (mini) {
      navigate(hrefOf({ name: 'tree', focus: id }))
      return
    }
    setSelected((s) => (s === id ? null : id))
    reveal(id)
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
            <radialGradient id="orb-gold" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor="#fff8e3" />
              <stop offset="0.45" stopColor="#f0cf86" />
              <stop offset="1" stopColor="#8a6327" />
            </radialGradient>
            <radialGradient id="orb-spouse" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor="#fff0f5" />
              <stop offset="0.5" stopColor="#f4a7bb" />
              <stop offset="1" stopColor="#7a2948" />
            </radialGradient>
            <radialGradient id="orb-child" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor="#e8f4fd" />
              <stop offset="0.5" stopColor="#7ec8e3" />
              <stop offset="1" stopColor="#1d5b79" />
            </radialGradient>
            <radialGradient id="orb-family" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor="#eef1ff" />
              <stop offset="0.5" stopColor="#a9b5ec" />
              <stop offset="1" stopColor="#3b4377" />
            </radialGradient>
            <radialGradient id="halo-gold" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgb(233 198 123 / 0.55)" />
              <stop offset="1" stopColor="rgb(233 198 123 / 0)" />
            </radialGradient>
            <radialGradient id="halo-spouse" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgb(244 167 187 / 0.5)" />
              <stop offset="1" stopColor="rgb(244 167 187 / 0)" />
            </radialGradient>
            <radialGradient id="halo-child" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgb(126 200 227 / 0.5)" />
              <stop offset="1" stopColor="rgb(126 200 227 / 0)" />
            </radialGradient>
            <radialGradient id="halo-family" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgb(169 181 236 / 0.45)" />
              <stop offset="1" stopColor="rgb(169 181 236 / 0)" />
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
              const onPath = path.has(e.link.from) && path.has(e.link.to) && !e.arc
              const dim = selected && !onPath
              const dashed = e.link.type !== 'parent' || e.arc
              return (
                <g key={i} opacity={dim ? 0.16 : 1} className="transition-opacity duration-500">
                  <path
                    d={e.d}
                    fill="none"
                    stroke={LEVEL_STROKE[e.link.l]}
                    strokeOpacity={e.arc ? 0.55 : 0.75}
                    strokeWidth={onPath ? 2.8 : e.arc ? 1.2 : 1.7}
                    strokeDasharray={dashed ? (e.arc ? '2 6' : '6 7') : undefined}
                    strokeLinecap="round"
                  />
                  {onPath && (
                    <path
                      d={e.d}
                      fill="none"
                      stroke="#fff6dc"
                      strokeWidth={2.6}
                      className="edge-flow"
                      strokeLinecap="round"
                    />
                  )}
                </g>
              )
            })}
            {layout.nodes.map((n) => {
              const prophet = n.person.kind === 'prophet'
              const spouse = n.person.kind === 'spouse'
              const child = n.person.kind === 'child'
              const active = selected === n.id
              const onPath = path.has(n.id)
              const dim = selected && !onPath
              const r = prophet ? (n.person.ululAzm ? 17 : 13) : spouse ? 11 : child ? 10 : 9
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
                      stroke={prophet ? '#fbe6b0' : spouse ? '#f4a7bb' : child ? '#7ec8e3' : '#c9d0f5'}
                      strokeWidth={1.5}
                      strokeDasharray="2 3"
                      className="orbit"
                    />
                  )}
                  <circle r={r} fill={orbForKind(n.person.kind)} />
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
                    fill={prophet ? '#fbe6b0' : spouse ? '#fddde6' : child ? '#d7f0fa' : '#c9d0f5'}
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
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                      showSpouses ? 'bg-rose-500/20 text-rose-300' : 'text-ink-3 hover:text-ink'
                    }`}
                    title={t('showWives')}
                  >
                    <Heart className="size-3.5" aria-hidden="true" />
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

            {/* Zoom / Fit Controls */}
            <div className="flex items-center gap-2">
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
            </div>
          </div>

          {/* Legend */}
          <div className="glass pointer-events-none absolute start-3 bottom-3 hidden max-w-xs rounded-2xl p-4 text-xs text-ink-2 sm:start-5 sm:bottom-5 md:block">
            <p className="mb-2 font-semibold text-ink">{t('legend')}</p>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2">
                <svg width="34" height="6" aria-hidden="true">
                  <line x1="0" y1="3" x2="34" y2="3" stroke="var(--color-lvl-quran)" strokeWidth="2" />
                </svg>
                {t('linkParent')}
              </li>
              <li className="flex items-center gap-2">
                <svg width="34" height="6" aria-hidden="true">
                  <line x1="0" y1="3" x2="34" y2="3" stroke="var(--color-lvl-tradition)" strokeWidth="2" strokeDasharray="6 5" />
                </svg>
                {t('linkDescendant')}
              </li>
              <li className="flex items-center gap-2">
                <svg width="34" height="6" aria-hidden="true">
                  <line x1="0" y1="3" x2="34" y2="3" stroke="var(--color-lvl-hadith)" strokeWidth="1.6" strokeDasharray="2 5" />
                </svg>
                {t('linkArc')}
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
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
                      {sel.dates.hijriBorn} ({sel.dates.gregorianBorn})
                    </p>
                  )}
                  {sel.dates.hijriDied && (
                    <p className="text-ink-2">
                      <span className="text-gold">{t('died')}: </span>
                      {sel.dates.hijriDied} ({sel.dates.gregorianDied})
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
        </>
      )}
      {mini && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
      )}
    </div>
  )
}
