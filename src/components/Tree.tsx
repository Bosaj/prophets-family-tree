import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Maximize2, Minus, Plus, Users, X } from 'lucide-react'
import { useI18n } from '../i18n'
import { buildLayout, lineage, type TreeNode } from '../lib/layout'
import { treeParent } from '../data/links'
import { byId } from '../data/people'
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
  const [family, setFamily] = useState(true)
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.innerWidth > window.innerHeight * 1.05)
  const layout = useMemo(() => buildLayout(family, wide, lang === 'ar'), [family, wide, lang])
  const [selected, setSelected] = useState<string | null>(focus ?? null)
  const box = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<View>({ k: 0.5, x: 0, y: 0 })
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ d: number; k: number } | null>(null)
  const moved = useRef(false)
  const downNode = useRef<string | null>(null)
  /** Animate the next view change (buttons, fit, reveal) but never drags, pinches or the wheel. */
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

  // Fit on first render and whenever the layout changes; center on the focused person if any.
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
    // Block page scroll while zooming the tree with the wheel / trackpad.
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

  /** Pan so the selected star is not hidden under the details panel. */
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
            <radialGradient id="orb-family" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor="#eef1ff" />
              <stop offset="0.5" stopColor="#a9b5ec" />
              <stop offset="1" stopColor="#3b4377" />
            </radialGradient>
            <radialGradient id="halo" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgb(233 198 123 / 0.45)" />
              <stop offset="1" stopColor="rgb(233 198 123 / 0)" />
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
                <g key={i} opacity={dim ? 0.18 : 1} className="transition-opacity duration-500">
                  <path
                    d={e.d}
                    fill="none"
                    stroke={LEVEL_STROKE[e.link.l]}
                    strokeOpacity={e.arc ? 0.55 : 0.7}
                    strokeWidth={onPath ? 2.6 : e.arc ? 1.2 : 1.6}
                    strokeDasharray={dashed ? (e.arc ? '2 6' : '6 7') : undefined}
                    strokeLinecap="round"
                  />
                  {onPath && <path d={e.d} fill="none" stroke="#fff6dc" strokeWidth={2.4} className="edge-flow" strokeLinecap="round" />}
                </g>
              )
            })}
            {layout.nodes.map((n) => {
              const prophet = n.person.kind === 'prophet'
              const active = selected === n.id
              const onPath = path.has(n.id)
              const dim = selected && !onPath
              const r = prophet ? (n.person.ululAzm ? 17 : 13) : 9
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x},${n.y})`}
                  opacity={dim ? 0.35 : 1}
                  className="cursor-pointer transition-opacity duration-500 focus:outline-none"
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
                  <circle r={r * 3.2} fill="url(#halo)" opacity={active ? 1 : onPath ? 0.75 : prophet ? 0.45 : 0.2} />
                  {active && <circle r={r + 6} fill="none" stroke="#fbe6b0" strokeWidth={1.2} opacity={0.9} />}
                  <circle r={r} fill={prophet ? 'url(#orb-gold)' : 'url(#orb-family)'} />
                  {n.person.ululAzm && <circle r={r + 3.5} fill="none" stroke="#e9c67b" strokeOpacity={0.7} strokeWidth={0.8} strokeDasharray="1.5 3" />}
                  <text y={r + 24} textAnchor="middle" fontFamily="Reem Kufi Variable, serif" fontSize={prophet ? 22 : 16} fill={prophet ? '#fbe6b0' : '#c9d0f5'} fontWeight={600}>
                    {n.person.name.ar}
                  </text>
                  {lang !== 'ar' && (
                    <text y={r + 44} textAnchor="middle" fontFamily="Sora Variable, sans-serif" fontSize={12.5} fill="#c3bdd2" letterSpacing={0.4}>
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
          <div className="absolute end-3 top-3 flex flex-col gap-2 sm:end-5 sm:top-5">
            {[
              { f: 1.25, icon: Plus, label: t('zoomIn') },
              { f: 0.8, icon: Minus, label: t('zoomOut') },
            ].map(({ f, icon: Icon, label }) => (
              <button key={label} type="button" onClick={() => zoomBtn(f)} className="glass grid size-10 place-items-center rounded-full text-ink hover:border-gold/50" aria-label={label} title={label}>
                <Icon className="size-4" aria-hidden="true" />
              </button>
            ))}
            <button type="button" onClick={() => { setGlide(true); fit() }} className="glass grid size-10 place-items-center rounded-full text-ink hover:border-gold/50" aria-label={t('fit')} title={t('fit')}>
              <Maximize2 className="size-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setFamily((v) => !v)} aria-pressed={family} className={`glass grid size-10 place-items-center rounded-full hover:border-gold/50 ${family ? 'text-gold-2' : 'text-ink-3'}`} aria-label={t('showFamily')} title={t('showFamily')}>
              <Users className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="glass pointer-events-none absolute start-3 bottom-3 hidden max-w-xs rounded-2xl p-4 text-xs text-ink-2 sm:start-5 sm:bottom-5 md:block">
            <p className="mb-2 font-semibold text-ink">{t('legend')}</p>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2"><svg width="34" height="6" aria-hidden="true"><line x1="0" y1="3" x2="34" y2="3" stroke="var(--color-lvl-quran)" strokeWidth="2" /></svg>{t('linkParent')}</li>
              <li className="flex items-center gap-2"><svg width="34" height="6" aria-hidden="true"><line x1="0" y1="3" x2="34" y2="3" stroke="var(--color-lvl-tradition)" strokeWidth="2" strokeDasharray="6 5" /></svg>{t('linkDescendant')}</li>
              <li className="flex items-center gap-2"><svg width="34" height="6" aria-hidden="true"><line x1="0" y1="3" x2="34" y2="3" stroke="var(--color-lvl-hadith)" strokeWidth="1.6" strokeDasharray="2 5" /></svg>{t('linkArc')}</li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <LevelChip level="quran" />
              <LevelChip level="hadith" />
              <LevelChip level="tradition" />
              <LevelChip level="disputed" />
            </div>
          </div>

          {!sel && (
            <p className="glass pointer-events-none absolute inset-x-0 bottom-4 mx-auto w-fit max-w-[90%] rounded-full px-4 py-2 text-center text-xs text-ink-2 md:bottom-auto md:top-5">
              {t('traceHint')}
            </p>
          )}

          {sel && (
            <aside
              aria-live="polite"
              className="glass-strong absolute inset-x-2 bottom-2 max-h-[55%] overflow-y-auto rounded-3xl p-5 sm:inset-x-auto sm:end-20 sm:top-5 sm:bottom-5 sm:max-h-none sm:w-96"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="ar-name gold-text text-4xl font-bold">{sel.name.ar}</p>
                  <p className="mt-1 text-lg text-ink">
                    <SubName p={sel} />
                  </p>
                </div>
                <button type="button" onClick={() => setSelected(null)} className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 hover:bg-white/10" aria-label={t('close')}>
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              {sel.title && <FactText fact={sel.title} className="mt-4 text-sm" />}
              {sel.sentTo && (
                <div className="mt-4 text-sm">
                  <p className="mb-1 text-xs text-ink-3">{t('sentTo')}</p>
                  <FactText fact={sel.sentTo} />
                </div>
              )}
              {selLink && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm">
                  <p className="text-xs text-ink-3">
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
