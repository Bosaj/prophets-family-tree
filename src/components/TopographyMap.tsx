import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BookOpen,
  GitBranch,
  Globe,
  Landmark,
  Maximize2,
  Minus,
  Mountain,
  Navigation,
  Plus,
  RotateCcw,
  X,
} from 'lucide-react'
import { useI18n } from '../i18n'
import { byId, prophets } from '../data/people'
import { hrefOf } from '../lib/router'
import { A, FactText, Scene } from './ui'

interface View {
  k: number
  x: number
  y: number
}

const MAP_W = 1600
const MAP_H = 1200

// Geo bounding box: Longitude 26°E to 53°E, Latitude 12°N to 39°N
const LNG_MIN = 26.0
const LNG_MAX = 53.0
const LAT_MIN = 12.0
const LAT_MAX = 39.0

function project(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * MAP_W
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * MAP_H
  return { x, y }
}

const ERAS = [
  { id: 'all', label: { en: 'All Eras', fr: 'Toutes époques', ar: 'جميع العصور' } },
  { id: 'primordial', label: { en: 'Primordial', fr: 'Origines', ar: 'البدايات الأولى' }, ids: ['adam', 'idris', 'nuh'] },
  { id: 'arabia', label: { en: 'Ancient Arabia', fr: 'Arabie antique', ar: 'العرب القدماء' }, ids: ['hud', 'salih'] },
  { id: 'abrahamic', label: { en: 'Abrahamic', fr: 'Abrahamique', ar: 'العهد الإبراهيمي' }, ids: ['ibrahim', 'lut', 'ismail', 'ishaq', 'yaqub', 'yusuf'] },
  { id: 'israelite', label: { en: 'Mosaic & Israelite', fr: 'Mosaïque et Rois', ar: 'موسى وملوك إسرائيل' }, ids: ['ayyub', 'shuayb', 'musa', 'harun', 'dhulkifl', 'dawud', 'sulayman', 'ilyas', 'alyasa', 'yunus'] },
  { id: 'prophetic', label: { en: 'Messianic & Seal', fr: 'Messianique et Sceau', ar: 'المسيح وخاتم النبيين' }, ids: ['zakariya', 'yahya', 'isa', 'muhammad'] },
]

export function TopographyMap({ focus }: { focus?: string }) {
  const { t, pick, lang } = useI18n()
  const box = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<View>({ k: 0.65, x: -120, y: -80 })
  const [glide, setGlide] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(focus ?? null)
  const [activeEra, setActiveEra] = useState<string>('all')

  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ d: number; k: number } | null>(null)
  const moved = useRef(false)
  const downProphet = useRef<string | null>(null)

  const activeProphetIds = useMemo(() => {
    if (activeEra === 'all') return new Set(prophets.map((p) => p.id))
    const eraObj = ERAS.find((e) => e.id === activeEra)
    return new Set(eraObj?.ids ?? [])
  }, [activeEra])

  const selectedPerson = selectedId ? byId.get(selectedId) : undefined

  // Center on a specific prophet marker
  const centerOn = useCallback(
    (id: string) => {
      const p = byId.get(id)
      if (!p?.topography?.mapCoordinates || !box.current) return
      const { lat, lng } = p.topography.mapCoordinates
      const pt = project(lat, lng)
      const cw = box.current.clientWidth
      const ch = box.current.clientHeight
      const targetK = Math.max(1.0, Math.min(1.8, view.k < 0.9 ? 1.25 : view.k))
      const offsetX = cw >= 768 && lang !== 'ar' ? -180 : cw >= 768 && lang === 'ar' ? 180 : 0
      setGlide(true)
      setView({
        k: targetK,
        x: cw / 2 - pt.x * targetK + offsetX,
        y: ch / 2 - pt.y * targetK,
      })
    },
    [lang, view.k],
  )

  const fit = useCallback(() => {
    if (!box.current) return
    const cw = box.current.clientWidth
    const ch = box.current.clientHeight
    const k = Math.min(cw / MAP_W, ch / MAP_H) * 1.05
    setGlide(true)
    setView({
      k: Math.max(0.4, Math.min(1.2, k)),
      x: (cw - MAP_W * k) / 2,
      y: (ch - MAP_H * k) / 2,
    })
  }, [])

  useEffect(() => {
    if (focus) {
      setSelectedId(focus)
      centerOn(focus)
    } else {
      fit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus])

  const zoomAt = (factor: number, cx: number, cy: number) => {
    setView((v) => {
      const k = Math.max(0.35, Math.min(2.8, v.k * factor))
      const f = k / v.k
      return { k, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f }
    })
  }

  const onWheel = (e: React.WheelEvent) => {
    setGlide(false)
    const r = box.current!.getBoundingClientRect()
    zoomAt(Math.exp(-e.deltaY * 0.0014), e.clientX - r.left, e.clientY - r.top)
  }

  useEffect(() => {
    const el = box.current
    if (!el) return
    const stop = (e: WheelEvent) => e.preventDefault()
    el.addEventListener('wheel', stop, { passive: false })
    return () => el.removeEventListener('wheel', stop)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    downProphet.current = (e.target as Element).closest('[data-marker]')?.getAttribute('data-marker') ?? null
    moved.current = false
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setGlide(false)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
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
      const target = Math.max(0.35, Math.min(2.8, (pinch.current.k * d) / pinch.current.d))
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
    if (e.type === 'pointerup' && !wasPan && downProphet.current && !moved.current) {
      const id = downProphet.current
      setSelectedId((prev) => (prev === id ? null : id))
      centerOn(id)
    }
    downProphet.current = null
  }

  const zoomBtn = (f: number) => {
    if (!box.current) return
    setGlide(true)
    zoomAt(f, box.current.clientWidth / 2, box.current.clientHeight / 2)
  }

  return (
    <div className="relative h-full w-full overflow-hidden select-none bg-night">
      {/* Interactive Canvas */}
      <div
        ref={box}
        className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          preserveAspectRatio="xMidYMid meet"
          role="group"
          aria-label={t('mapTitle')}
        >
          <defs>
            <radialGradient id="map-water-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0b172a" />
              <stop offset="100%" stopColor="#050b14" />
            </radialGradient>
            <radialGradient id="map-glow-gold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(233, 198, 123, 0.7)" />
              <stop offset="100%" stopColor="rgba(233, 198, 123, 0)" />
            </radialGradient>
            <radialGradient id="map-marker-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#ffe699" />
              <stop offset="75%" stopColor="#d4a342" />
              <stop offset="100%" stopColor="#8a6327" />
            </radialGradient>
            <pattern id="ancient-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(233, 198, 123, 0.04)" strokeWidth="0.8" />
            </pattern>
          </defs>

          <g
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
              transformOrigin: '0 0',
              transition: glide ? 'transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)' : 'none',
            }}
          >
            {/* Background Grid & Terrains */}
            <rect width={MAP_W} height={MAP_H} fill="#0d0a1a" />
            <rect width={MAP_W} height={MAP_H} fill="url(#ancient-grid)" />

            {/* Stylized Coastal Water Bodies */}
            {/* Mediterranean Sea */}
            <path
              d="M 0 0 L 700 0 L 680 180 L 590 280 L 520 330 L 460 380 L 410 460 L 330 480 L 260 520 L 150 560 L 0 580 Z"
              fill="#06101e"
              stroke="#132742"
              strokeWidth="1.5"
            />
            <text x="280" y="220" fill="rgba(80, 140, 200, 0.3)" fontSize="20" fontFamily="serif" fontStyle="italic" letterSpacing="4">
              THE MEDITERRANEAN SEA · بحر الروم
            </text>

            {/* Red Sea & Gulf of Suez/Aqaba */}
            <path
              d="M 440 450 L 455 530 L 490 620 L 550 740 L 630 870 L 740 1020 L 770 1120 L 810 1200 L 730 1200 L 660 1060 L 570 910 L 480 770 L 410 650 L 370 550 L 350 490 Z"
              fill="#061222"
              stroke="#132b49"
              strokeWidth="1.5"
            />
            <text x="560" y="850" fill="rgba(80, 140, 200, 0.28)" fontSize="18" fontFamily="serif" fontStyle="italic" letterSpacing="4" transform="rotate(45, 560, 850)">
              THE RED SEA · البحر الأحمر
            </text>

            {/* Persian / Arabian Gulf */}
            <path
              d="M 1100 480 L 1180 540 L 1260 620 L 1380 720 L 1490 820 L 1600 890 L 1600 680 L 1480 560 L 1320 440 L 1180 400 Z"
              fill="#061222"
              stroke="#132b49"
              strokeWidth="1.5"
            />
            <text x="1350" y="600" fill="rgba(80, 140, 200, 0.25)" fontSize="18" fontFamily="serif" fontStyle="italic" letterSpacing="4" transform="rotate(25, 1350, 600)">
              ARABIAN GULF · الخليج العربي
            </text>

            {/* River Systems */}
            {/* The Nile River */}
            <path
              d="M 330 480 Q 320 600 325 720 T 310 900 T 340 1100 T 360 1200"
              fill="none"
              stroke="#1a4168"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Nile Delta Branches */}
            <path d="M 330 480 L 290 450 M 330 480 L 360 450 M 330 480 L 330 435" fill="none" stroke="#1a4168" strokeWidth="2.5" />

            {/* Tigris River */}
            <path
              d="M 900 120 Q 950 220 1020 340 T 1140 490"
              fill="none"
              stroke="#1a4168"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Euphrates River */}
            <path
              d="M 760 130 Q 820 220 900 320 T 1040 450 T 1140 490"
              fill="none"
              stroke="#1a4168"
              strokeWidth="3.0"
              strokeLinecap="round"
            />

            {/* Jordan River & Dead Sea */}
            <path d="M 520 330 L 522 385" fill="none" stroke="#1a4168" strokeWidth="2.5" />
            <ellipse cx="523" cy="400" rx="6" ry="16" fill="#143252" stroke="#1a4168" strokeWidth="1.5" />

            {/* Ancient Region Watermark Labels */}
            <text x="960" y="270" fill="rgba(233, 198, 123, 0.12)" fontSize="32" fontFamily="Reem Kufi Variable, serif" fontWeight="bold" letterSpacing="8">
              بلاد الرافدين · MESOPOTAMIA
            </text>
            <text x="470" y="290" fill="rgba(233, 198, 123, 0.12)" fontSize="28" fontFamily="Reem Kufi Variable, serif" fontWeight="bold" letterSpacing="6">
              بلاد الشام · THE LEVANT
            </text>
            <text x="680" y="680" fill="rgba(233, 198, 123, 0.14)" fontSize="38" fontFamily="Reem Kufi Variable, serif" fontWeight="bold" letterSpacing="10">
              الحجاز · AL-HIJAZ
            </text>
            <text x="210" y="720" fill="rgba(233, 198, 123, 0.12)" fontSize="30" fontFamily="Reem Kufi Variable, serif" fontWeight="bold" letterSpacing="8">
              وادي النيل · NILE VALLEY
            </text>
            <text x="920" y="1080" fill="rgba(233, 198, 123, 0.11)" fontSize="32" fontFamily="Reem Kufi Variable, serif" fontWeight="bold" letterSpacing="8">
              الأحقاف وحضرموت · AL-AHQAF
            </text>

            {/* Historic Migration & Mission Routes */}
            {/* Ibrahim's Route: Ur -> Harran -> Levant (Hebron) -> Egypt -> Makkah */}
            <g opacity="0.6">
              <path
                d="M 1060 430 Q 860 170 820 160 T 520 350 T 330 480 T 700 880 T 520 350"
                fill="none"
                stroke="#e9c67b"
                strokeWidth="1.6"
                strokeDasharray="6 8"
                className="edge-flow"
              />
            </g>

            {/* Musa's Route: Egypt -> Madyan -> Sinai -> Wilderness */}
            <g opacity="0.55">
              <path
                d="M 340 480 L 460 550 L 430 520 L 520 400"
                fill="none"
                stroke="#7ec8e3"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
            </g>

            {/* Hijrah Route: Makkah -> Madinah */}
            <g opacity="0.75">
              <path
                d="M 700 880 L 690 730"
                fill="none"
                stroke="#f4a7bb"
                strokeWidth="2.2"
                strokeDasharray="5 5"
                className="edge-flow"
              />
            </g>

            {/* Prophet Geographic Markers */}
            {prophets.map((p) => {
              if (!p.topography?.mapCoordinates) return null
              const { lat, lng } = p.topography.mapCoordinates
              const pt = project(lat, lng)
              const active = selectedId === p.id
              const inEra = activeProphetIds.has(p.id)
              const r = active ? 16 : p.ululAzm ? 13 : 10

              return (
                <g
                  key={p.id}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  opacity={inEra ? 1 : 0.18}
                  className="cursor-pointer transition-all duration-500"
                  data-marker={p.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                      ev.preventDefault()
                      setSelectedId((prev) => (prev === p.id ? null : p.id))
                      centerOn(p.id)
                    }
                  }}
                >
                  {/* Aura Glow */}
                  <circle
                    r={r * 3.5}
                    fill="url(#map-glow-gold)"
                    opacity={active ? 1 : 0.4}
                    className={active ? 'animate-pulse' : ''}
                  />

                  {/* Outer active orbit */}
                  {active && (
                    <circle
                      r={r + 8}
                      fill="none"
                      stroke="#fbe6b0"
                      strokeWidth={1.8}
                      strokeDasharray="3 4"
                      className="orbit"
                    />
                  )}

                  {/* Marker Core Orb */}
                  <circle
                    r={r}
                    fill="url(#map-marker-grad)"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                    className="drop-shadow-[0_2px_12px_rgba(233,198,123,0.8)]"
                  />

                  {/* Arabic Label */}
                  <text
                    y={r + 20}
                    textAnchor="middle"
                    fontFamily="Reem Kufi Variable, serif"
                    fontSize={active ? 20 : 16}
                    fontWeight={700}
                    fill={active ? '#fff6dc' : '#fbe6b0'}
                    className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                  >
                    {p.name.ar}
                  </text>

                  {/* Translation & Region badge */}
                  {lang !== 'ar' && (
                    <text
                      y={r + 36}
                      textAnchor="middle"
                      fontFamily="Sora Variable, sans-serif"
                      fontSize={10.5}
                      fill="#e2dfeb"
                      fontWeight={500}
                      className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                    >
                      {pick(p.name)}
                    </text>
                  )}
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Top Floating Header & Filter Toolbar */}
      <div className="absolute inset-x-4 top-3 flex flex-wrap items-center justify-between gap-2 sm:inset-x-6 sm:top-5">
        <div className="glass flex flex-wrap items-center gap-1.5 rounded-full p-1.5 text-xs shadow-lg">
          {/* Switch to Tree View */}
          <A
            href="/tree"
            className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 font-medium text-ink-2 hover:border-gold/50 hover:text-gold transition-colors"
            title={t('treeView')}
          >
            <GitBranch className="size-3.5" aria-hidden="true" />
            <span>{t('treeView')}</span>
          </A>

          {/* Era Filters */}
          <div className="hidden items-center gap-1 md:flex">
            {ERAS.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setActiveEra(e.id)}
                className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                  activeEra === e.id
                    ? 'bg-gold/25 font-semibold text-gold-2'
                    : 'text-ink-3 hover:text-ink'
                }`}
              >
                {pick(e.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Map Controls */}
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
            onClick={fit}
            className="glass grid size-10 place-items-center rounded-full text-ink hover:border-gold/50 shadow-md"
            aria-label={t('fit')}
            title={t('fit')}
          >
            <Maximize2 className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              fit()
              setSelectedId(null)
            }}
            className="glass grid size-10 place-items-center rounded-full text-ink hover:border-gold/50 shadow-md"
            aria-label={t('resetView')}
            title={t('resetView')}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Selected Location Inspector Dossier (Slide-out Sheet) */}
      {selectedPerson && selectedPerson.topography && (
        <aside
          aria-label={pick(selectedPerson.name)}
          className={`glass-strong absolute inset-y-0 z-30 flex w-full flex-col border-white/10 shadow-2xl transition-transform duration-500 sm:max-w-md ${
            lang === 'ar' ? 'start-0 border-e' : 'end-0 border-s'
          }`}
        >
          {/* Header Banner */}
          <div className="relative h-44 w-full shrink-0 overflow-hidden bg-night">
            <Scene image={selectedPerson.image} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="glass absolute top-3 end-3 grid size-8 place-items-center rounded-full text-ink hover:text-white"
              aria-label={t('close')}
            >
              <X className="size-4" />
            </button>
            <div className="absolute bottom-3 inset-x-4">
              <span className="ar-name gold-text text-3xl font-bold">{selectedPerson.name.ar}</span>
              <p className="text-sm font-medium text-ink">
                {lang !== 'ar' ? pick(selectedPerson.name) : selectedPerson.alt ? selectedPerson.alt.en : ''}
              </p>
            </div>
          </div>

          {/* Dossier Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
            {/* Coordinates & Region */}
            <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-gold">
                <span className="font-semibold uppercase flex items-center gap-1.5">
                  <Globe className="size-3.5" /> {t('region')}
                </span>
                {selectedPerson.topography.mapCoordinates && (
                  <span className="font-mono text-ink-3">
                    {selectedPerson.topography.mapCoordinates.lat.toFixed(2)}°N, {selectedPerson.topography.mapCoordinates.lng.toFixed(2)}°E
                  </span>
                )}
              </div>
              <p className="font-medium text-ink">{pick(selectedPerson.topography.region)}</p>
              <p className="text-xs text-ink-3">
                <span className="text-ink-2 font-medium">{t('modernCountries')}:</span> {pick(selectedPerson.topography.modernCountries)}
              </p>
            </div>

            {/* Mission Route */}
            {selectedPerson.topography.missionRoute && (
              <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                <span className="text-xs font-semibold text-gold uppercase flex items-center gap-1.5">
                  <Navigation className="size-3.5" /> {t('missionRoute')}
                </span>
                <p className="mt-2 text-xs leading-relaxed text-ink-2">
                  {pick(selectedPerson.topography.missionRoute)}
                </p>
              </div>
            )}

            {/* Burial Site */}
            {selectedPerson.topography.burialSite && (
              <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                <span className="text-xs font-semibold text-gold uppercase flex items-center gap-1.5">
                  <Landmark className="size-3.5" /> {t('burialSite')}
                </span>
                <div className="mt-2 text-xs">
                  <FactText fact={selectedPerson.topography.burialSite} />
                </div>
              </div>
            )}

            {/* Sacred Sites List */}
            {selectedPerson.topography.sacredSites && selectedPerson.topography.sacredSites.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-2 flex items-center gap-1.5">
                  <Mountain className="size-3.5 text-gold" /> {t('sacredSites')}
                </h4>
                <div className="space-y-2">
                  {selectedPerson.topography.sacredSites.map((site, idx) => (
                    <div key={idx} className="rounded-xl border border-white/5 bg-white/5 p-3">
                      <div className="flex items-center gap-2 text-gold-2">
                        <span className="ar-name font-bold text-base">{site.name.ar}</span>
                        {lang !== 'ar' && <span className="text-xs text-ink font-medium">· {pick(site.name)}</span>}
                      </div>
                      {site.desc && <p className="mt-1 text-xs text-ink-3 leading-relaxed">{pick(site.desc)}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-white/10 p-4 flex gap-2">
            <A
              href={`/p/${selectedPerson.id}`}
              className="btn btn-primary flex-1 justify-center text-xs"
            >
              <BookOpen className="size-3.5" /> {t('openProfile')}
            </A>
            <A
              href={hrefOf({ name: 'tree', focus: selectedPerson.id })}
              className="btn btn-ghost text-xs"
              title={t('navTree')}
            >
              <GitBranch className="size-3.5" /> {t('navTree')}
            </A>
          </div>
        </aside>
      )}
    </div>
  )
}
