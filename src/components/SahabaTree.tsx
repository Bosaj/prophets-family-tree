import { useState, useMemo, useRef } from 'react'
import {
  Search,
  Crown,
  Sparkles,
  MapPin,
  X,
  ChevronRight,
  GitCommit,
  CheckCircle2,
  Award,
  Layers,
  Clock,
  BookOpen,
  Users,
  Quote,
  Milestone,
  Plus,
  Minus,
  RotateCcw,
  GitBranch,
} from 'lucide-react'
import { useI18n } from '../i18n'
import {
  SAHABA_FIGURES,
  SAHABA_ERAS,
  type SahabaEra,
  type SahabaFigure,
} from '../data/sahaba'

interface TreeLink {
  from: string
  to: string
  label?: string
  type: 'lineage' | 'succession' | 'hadith' | 'mentorship'
}

// Tree Coordinates Layout (Root at Prophet Muhammad ﷺ, branching through Ahl al-Bayt, Rashidun, Hadith Masters, Dynasties)
const NODE_COORDS: Record<string, { x: number; y: number; tier: number }> = {
  // Tier 0: The Prophet ﷺ
  prophet_muhammad: { x: 500, y: 120, tier: 0 },

  // Tier 1: Core Household & Companions
  fatimah_az_zahra: { x: 300, y: 320, tier: 1 },
  ali_ibn_abi_talib: { x: 440, y: 320, tier: 1 },
  abu_bakr: { x: 620, y: 320, tier: 1 },
  umar_ibn_khattab: { x: 780, y: 320, tier: 1 },
  uthman_ibn_affan: { x: 940, y: 320, tier: 1 },
  abu_hurairah: { x: 1100, y: 320, tier: 1 },
  hamzah_ibn_abd_muttalib: { x: 140, y: 320, tier: 1 },

  // Tier 2: Grandsons & Mubasharun & Luminaries
  hasan_ibn_ali: { x: 260, y: 520, tier: 2 },
  husayn_ibn_ali: { x: 380, y: 520, tier: 2 },
  talhah_ibn_ubaydillah: { x: 540, y: 520, tier: 2 },
  zubayr_ibn_awwam: { x: 680, y: 520, tier: 2 },
  abdurrahman_ibn_awf: { x: 820, y: 520, tier: 2 },
  sad_ibn_abi_waqqas: { x: 960, y: 520, tier: 2 },
  khalid_ibn_walid: { x: 100, y: 520, tier: 2 },
  bilal_ibn_rabah: { x: -30, y: 520, tier: 2 },

  // Tier 3: Hadith Masters & Caliphate Founders
  imam_bukhari: { x: 1100, y: 720, tier: 3 },
  said_ibn_zayd: { x: 680, y: 720, tier: 3 },
  abu_ubaydah_jarrah: { x: 820, y: 720, tier: 3 },
  salman_al_farsi: { x: -30, y: 720, tier: 3 },
  muawiyah_i: { x: 960, y: 720, tier: 3 },
  idris_i: { x: 120, y: 720, tier: 3 },

  // Tier 4: Hadith Compilation & Caliphate Golden Age
  imam_muslim: { x: 1100, y: 920, tier: 4 },
  abdalmalik_marwan: { x: 860, y: 920, tier: 4 },
  umar_ibn_abd_al_aziz: { x: 980, y: 920, tier: 4 },
  abu_jafar_mansur: { x: 680, y: 920, tier: 4 },
  abdalrahman_i_cordoba: { x: 540, y: 920, tier: 4 },
  moulay_ali_cherif: { x: 220, y: 920, tier: 4 },
  sharif_hussein_hejaz: { x: 360, y: 920, tier: 4 },

  // Tier 5: Abbasid & Andalusian Zenith, Ottoman Origins
  harun_al_rashid: { x: 680, y: 1120, tier: 5 },
  abdalrahman_iii_cordoba: { x: 540, y: 1120, tier: 5 },
  osman_i: { x: 840, y: 1120, tier: 5 },

  // Tier 6: High Imperial Ottoman & 20th-century Sovereigns
  al_mamun: { x: 680, y: 1320, tier: 6 },
  mehmed_ii_fatih: { x: 840, y: 1320, tier: 6 },
  mohammed_v_morocco: { x: 220, y: 1240, tier: 6 },
  king_hussein_jordan: { x: 360, y: 1240, tier: 6 },

  // Tier 7: Modern Monarchs & Ottoman Caliphs
  selim_i_yavuz: { x: 840, y: 1520, tier: 7 },
  king_mohammed_vi: { x: 220, y: 1480, tier: 7 },
  king_abdullah_ii: { x: 360, y: 1480, tier: 7 },

  // Tier 8: Late Ottomans
  suleiman_the_magnificent: { x: 840, y: 1720, tier: 8 },
  abdulhamid_ii: { x: 840, y: 1920, tier: 8 },
}

const TREE_LINKS: TreeLink[] = [
  // Prophetic Household (Lineage)
  { from: 'prophet_muhammad', to: 'fatimah_az_zahra', type: 'lineage', label: 'ابنة' },
  { from: 'prophet_muhammad', to: 'ali_ibn_abi_talib', type: 'lineage', label: 'ابن عم وصهر' },
  { from: 'fatimah_az_zahra', to: 'hasan_ibn_ali', type: 'lineage', label: 'ابن' },
  { from: 'fatimah_az_zahra', to: 'husayn_ibn_ali', type: 'lineage', label: 'ابن' },
  { from: 'ali_ibn_abi_talib', to: 'hasan_ibn_ali', type: 'lineage', label: 'ابن' },
  { from: 'ali_ibn_abi_talib', to: 'husayn_ibn_ali', type: 'lineage', label: 'ابن' },

  // Rashidun Succession
  { from: 'prophet_muhammad', to: 'abu_bakr', type: 'succession', label: 'الخليفة الأول' },
  { from: 'abu_bakr', to: 'umar_ibn_khattab', type: 'succession', label: 'الخليفة الثاني' },
  { from: 'umar_ibn_khattab', to: 'uthman_ibn_affan', type: 'succession', label: 'الخليفة الثالث' },
  { from: 'uthman_ibn_affan', to: 'ali_ibn_abi_talib', type: 'succession', label: 'الخليفة الرابع' },
  { from: 'ali_ibn_abi_talib', to: 'hasan_ibn_ali', type: 'succession', label: 'الخليفة الخامس' },

  // Hadith Transmission Chain (Abu Hurairah -> Bukhari -> Muslim)
  { from: 'prophet_muhammad', to: 'abu_hurairah', type: 'hadith', label: 'رواية السنة' },
  { from: 'abu_hurairah', to: 'imam_bukhari', type: 'hadith', label: 'أسانيد الصحيح' },
  { from: 'imam_bukhari', to: 'imam_muslim', type: 'mentorship', label: 'أستاذ وتلميذ' },

  // Continuous Prophetic Dynasties to Today
  // Hasanid -> Idrisids
  { from: 'hasan_ibn_ali', to: 'idris_i', type: 'lineage', label: 'حفيد' },
  // Hasanid -> Alaouites of Morocco
  { from: 'hasan_ibn_ali', to: 'moulay_ali_cherif', type: 'lineage', label: 'سلالة حسنية' },
  { from: 'moulay_ali_cherif', to: 'mohammed_v_morocco', type: 'lineage', label: 'سلاطين علويون' },
  { from: 'mohammed_v_morocco', to: 'king_mohammed_vi', type: 'lineage', label: 'ملك المغرب الحالي' },
  // Hasanid -> Hashemites of Jordan
  { from: 'hasan_ibn_ali', to: 'sharif_hussein_hejaz', type: 'lineage', label: 'شرفاء مكة' },
  { from: 'sharif_hussein_hejaz', to: 'king_hussein_jordan', type: 'lineage', label: 'ملوك الأردن' },
  { from: 'king_hussein_jordan', to: 'king_abdullah_ii', type: 'lineage', label: 'ملك الأردن الحالي' },

  // Umayyads & Cordoba
  { from: 'uthman_ibn_affan', to: 'muawiyah_i', type: 'succession', label: 'بنو أمية' },
  { from: 'muawiyah_i', to: 'abdalmalik_marwan', type: 'succession' },
  { from: 'abdalmalik_marwan', to: 'umar_ibn_abd_al_aziz', type: 'succession' },
  { from: 'abdalmalik_marwan', to: 'abdalrahman_i_cordoba', type: 'lineage', label: 'صقر قريش بالأندلس' },
  { from: 'abdalrahman_i_cordoba', to: 'abdalrahman_iii_cordoba', type: 'succession', label: 'خلافة قرطبة' },

  // Abbasids
  { from: 'prophet_muhammad', to: 'abu_jafar_mansur', type: 'lineage', label: 'بنو العباس' },
  { from: 'abu_jafar_mansur', to: 'harun_al_rashid', type: 'succession', label: 'العصر الذهبي' },
  { from: 'harun_al_rashid', to: 'al_mamun', type: 'succession', label: 'بيت الحكمة' },

  // Ottomans
  { from: 'muawiyah_i', to: 'osman_i', type: 'succession', label: 'انتقال السيادة' },
  { from: 'osman_i', to: 'mehmed_ii_fatih', type: 'succession', label: 'فتح القسطنطينية' },
  { from: 'mehmed_ii_fatih', to: 'selim_i_yavuz', type: 'succession', label: 'أول خليفة عثماني' },
  { from: 'selim_i_yavuz', to: 'suleiman_the_magnificent', type: 'succession', label: 'القانوني' },
  { from: 'suleiman_the_magnificent', to: 'abdulhamid_ii', type: 'succession', label: 'حامي القدس' },

  // Companions & Luminaries
  { from: 'prophet_muhammad', to: 'hamzah_ibn_abd_muttalib', type: 'lineage', label: 'عم وأخ رضاعة' },
  { from: 'prophet_muhammad', to: 'talhah_ibn_ubaydillah', type: 'mentorship' },
  { from: 'prophet_muhammad', to: 'zubayr_ibn_awwam', type: 'mentorship' },
  { from: 'prophet_muhammad', to: 'abdurrahman_ibn_awf', type: 'mentorship' },
  { from: 'prophet_muhammad', to: 'sad_ibn_abi_waqqas', type: 'mentorship' },
  { from: 'prophet_muhammad', to: 'said_ibn_zayd', type: 'mentorship' },
  { from: 'prophet_muhammad', to: 'abu_ubaydah_jarrah', type: 'mentorship' },
  { from: 'prophet_muhammad', to: 'khalid_ibn_walid', type: 'mentorship' },
  { from: 'prophet_muhammad', to: 'bilal_ibn_rabah', type: 'mentorship' },
  { from: 'prophet_muhammad', to: 'salman_al_farsi', type: 'mentorship' },
]

export function SahabaTree({ focus }: { focus?: string }) {
  const { lang, pick } = useI18n()
  const [selectedEra, setSelectedEra] = useState<SahabaEra | 'all'>('all')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState<'tree' | 'timeline' | 'cards'>('tree')
  const [activeFigure, setActiveFigure] = useState<SahabaFigure | null>(() => {
    if (focus) {
      return SAHABA_FIGURES.find((f) => f.id === focus) ?? null
    }
    return null
  })

  // Canvas Pan & Zoom State for the Interactive Tree View
  const [zoom, setZoom] = useState<number>(0.85)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 120, y: 50 })
  const isDragging = useRef(false)
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement | null>(null)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag when clicking background, not on interactive nodes
    if ((e.target as HTMLElement).closest('.tree-node-interactive')) return
    isDragging.current = true
    lastMousePos.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMousePos.current.x
    const dy = e.clientY - lastMousePos.current.y
    lastMousePos.current = { x: e.clientX, y: e.clientY }
    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      isDragging.current = false
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    }
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92
    setZoom((z) => Math.max(0.35, Math.min(1.8, z * zoomFactor)))
  }

  const resetView = () => {
    setZoom(0.85)
    setPan({ x: 120, y: 50 })
  }

  // Filtered Figures
  const filteredFigures = useMemo(() => {
    return SAHABA_FIGURES.filter((fig) => {
      if (selectedEra !== 'all' && fig.era !== selectedEra) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        fig.name.en.toLowerCase().includes(q) ||
        fig.name.fr.toLowerCase().includes(q) ||
        fig.name.ar.includes(q) ||
        fig.title.en.toLowerCase().includes(q) ||
        fig.title.ar.includes(q) ||
        fig.lineage.en.toLowerCase().includes(q) ||
        fig.lineage.ar.includes(q) ||
        fig.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [selectedEra, query])

  // Active Ancestry / Lineage Highlight Set
  const activeLineageIds = useMemo(() => {
    if (!activeFigure) return new Set<string>()
    const set = new Set<string>()
    set.add(activeFigure.id)

    // Traverse upwards
    let current: string | undefined = activeFigure.id
    while (current) {
      set.add(current)
      const link = TREE_LINKS.find((l) => l.to === current)
      current = link ? link.from : undefined
    }
    return set
  }, [activeFigure])

  // Chronologically Sorted Figures for the Timeline
  const chronologicalFigures = useMemo(() => {
    return [...filteredFigures].sort((a, b) => {
      const getYear = (fig: SahabaFigure) => {
        const text = fig.lifeDates.birth?.ah || fig.lifeDates.death.ah
        if (text.includes('BH')) {
          const num = parseInt(text, 10) || 50
          return -num
        }
        return parseInt(text, 10) || 100
      }
      return getYear(a) - getYear(b)
    })
  }, [filteredFigures])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-950/30 via-night-2 to-night-1 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -end-16 -top-16 size-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -start-16 -bottom-16 size-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3 shadow-sm">
              <Crown className="size-3.5 text-amber-400" />
              <span>
                {lang === 'ar'
                  ? 'شجرة الصحابة والخلافة وحفظة الحديث والسلالات النبوية إلى اليوم'
                  : 'Tree of Companions, Caliphs, Hadith Masters & Living Prophetic Dynasties'}
              </span>
            </div>
            <h1 className="ar-name text-3xl sm:text-5xl font-extrabold tracking-tight text-ink mb-3 gold-text">
              {lang === 'ar'
                ? 'شجرة الصحابة والخلفاء وأئمة الحديث وسلالات النبي ﷺ'
                : lang === 'fr'
                ? 'Arbre des Sahaba, Califes, Maîtres du Hadith & Descendance Prophétique'
                : 'Tree of Sahaba, Caliphs, Hadith Masters & Prophetic Lineage to Present'}
            </h1>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              {lang === 'ar'
                ? 'شجرة تفاعلية جامعة لنسب وسيرة رسول الله ﷺ، والخلفاء الراشدين، والعشرة المبشرين بالجنة، وأكابر حفظة السُنّة وأئمة الحديث (أبو هريرة، البخاري، ومسلم)، والدول الإسلامية الكبرى، مع سلالات آل البيت المستمرة حتى ملك المغرب محمد السادس وملك الأردن عبد الله الثاني.'
                : lang === 'fr'
                ? 'Arbre généalogique interactif reliant le Prophète ﷺ, les 5 Califes bien guidés, les Dix Promis au Paradis, les maîtres du Hadith (Abou Hourayra, Al-Boukhari, Muslim) et les dynasties chérifiennes régnantes.'
                : 'Interactive genealogical and succession star tree spanning from Prophet Muhammad ﷺ, the Rightly Guided Caliphs, the Hadith Masters (Abu Hurairah, Al-Bukhari, Muslim), historic empires, down to living Hasanid monarchs in Morocco and Jordan.'}
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-row md:flex-col gap-3 shrink-0">
            <div className="glass rounded-2xl px-5 py-3 border border-emerald-500/20 text-center">
              <span className="block text-2xl font-bold font-mono text-emerald-400">1400+</span>
              <span className="text-[0.7rem] text-ink-3">
                {lang === 'ar' ? 'عاماً من التاريخ الموصول' : 'Years of History'}
              </span>
            </div>
            <div className="glass rounded-2xl px-5 py-3 border border-cyan-500/20 text-center">
              <span className="block text-2xl font-bold font-mono text-cyan-300">5,374+</span>
              <span className="text-[0.7rem] text-ink-3">
                {lang === 'ar' ? 'حديثاً محفوظاً ومسنداً' : 'Hadiths Preserved'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Eras, Search & View Switcher */}
      <div className="mb-6 space-y-4">
        {/* Era Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {SAHABA_ERAS.map((era) => {
            const isSelected = selectedEra === era.id
            return (
              <button
                key={era.id}
                type="button"
                onClick={() => setSelectedEra(era.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'shadow-lg scale-102 border-transparent text-night'
                    : 'glass text-ink-2 hover:text-ink hover:border-white/20'
                }`}
                style={{
                  backgroundColor: isSelected ? era.badgeColor : undefined,
                  color: isSelected ? '#09090b' : undefined,
                }}
              >
                <span>{pick(era.label)}</span>
              </button>
            )
          })}
        </div>

        {/* Search & Layout View Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'ابحث باسم الصحابي، الخليفة، الإمام، الكتاب، أو الإنجاز...'
                  : 'Search companion, caliph, Bukhari, Muslim, quote, or reign...'
              }
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pe-4 ps-10 text-xs sm:text-sm text-ink placeholder-ink-3 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('tree')}
                className={`rounded-full px-3.5 py-1.5 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'tree' ? 'bg-emerald-500 text-night font-bold shadow-md' : 'text-ink-3 hover:text-ink'
                }`}
              >
                <GitBranch className="size-3.5" />
                <span>{lang === 'ar' ? 'الشجرة التفاعلية' : 'Interactive Tree'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                className={`rounded-full px-3.5 py-1.5 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'timeline' ? 'bg-emerald-500 text-night font-bold shadow-md' : 'text-ink-3 hover:text-ink'
                }`}
              >
                <Clock className="size-3.5" />
                <span>{lang === 'ar' ? 'الخط الزمني' : 'Timeline'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`rounded-full px-3.5 py-1.5 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'cards' ? 'bg-emerald-500 text-night font-bold shadow-md' : 'text-ink-3 hover:text-ink'
                }`}
              >
                <Layers className="size-3.5" />
                <span>{lang === 'ar' ? 'بطاقات السير' : 'Dossiers'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1. INTERACTIVE FULL 2D CONSTELLATION TREE CANVAS (LIKE PROPHETS TREE) */}
      {viewMode === 'tree' && (
        <div className="relative rounded-3xl border border-white/10 bg-night-1 overflow-hidden shadow-2xl h-[750px] select-none">
          {/* Floating Canvas Controls */}
          <div className="absolute top-4 end-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-night-2/90 backdrop-blur-md px-3 py-1.5 shadow-xl">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
              className="p-1 text-ink-3 hover:text-ink transition-colors cursor-pointer"
              title="Zoom In"
            >
              <Plus className="size-4" />
            </button>
            <span className="font-mono text-xs text-gold px-1">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.35, z - 0.15))}
              className="p-1 text-ink-3 hover:text-ink transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="size-4" />
            </button>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <button
              type="button"
              onClick={resetView}
              className="p-1 text-ink-3 hover:text-ink transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>

          {/* Interactive Legend Pill */}
          <div className="absolute top-4 start-4 z-20 hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-night-2/80 backdrop-blur-md px-3.5 py-1 text-xs text-ink-3">
            <span className="inline-block size-2.5 rounded-full bg-emerald-400" />
            <span>{lang === 'ar' ? 'الخلفاء الراشدون' : 'Rashidun'}</span>
            <span className="inline-block size-2.5 rounded-full bg-cyan-400 ms-2" />
            <span>{lang === 'ar' ? 'أئمة الحديث (البخاري ومسلم)' : 'Hadith Masters'}</span>
            <span className="inline-block size-2.5 rounded-full bg-amber-400 ms-2" />
            <span>{lang === 'ar' ? 'آل البيت والنسب النبوي' : 'Prophetic Lineage'}</span>
          </div>

          {/* 2D Drag & Zoom Canvas Surface */}
          <div
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing touch-none relative overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onWheel={handleWheel}
          >
            <div
              className="absolute inset-0 origin-top-left transition-transform duration-75"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              {/* Connecting Curved SVG Bezier Lines */}
              <svg className="absolute inset-0 w-[1600px] h-[2200px] pointer-events-none overflow-visible">
                <defs>
                  <linearGradient id="linkGradLineage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="linkGradHadith" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="linkGradSuccession" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.75" />
                  </linearGradient>
                </defs>

                {TREE_LINKS.map((link, idx) => {
                  const fromCoord = NODE_COORDS[link.from]
                  const toCoord = NODE_COORDS[link.to]
                  if (!fromCoord || !toCoord) return null

                  const isGlowing =
                    activeLineageIds.has(link.from) && activeLineageIds.has(link.to)

                  const startX = fromCoord.x + 90
                  const startY = fromCoord.y + 60
                  const endX = toCoord.x + 90
                  const endY = toCoord.y

                  const midY = (startY + endY) / 2
                  const pathD = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`

                  let strokeColor = 'rgba(255, 255, 255, 0.15)'
                  if (isGlowing) strokeColor = '#facc15'
                  else if (link.type === 'hadith' || link.type === 'mentorship') strokeColor = 'url(#linkGradHadith)'
                  else if (link.type === 'lineage') strokeColor = 'url(#linkGradLineage)'
                  else strokeColor = 'url(#linkGradSuccession)'

                  return (
                    <g key={idx}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={isGlowing ? 3.5 : 1.8}
                        strokeDasharray={link.type === 'mentorship' ? '4 4' : undefined}
                        className={isGlowing ? 'drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : ''}
                      />
                    </g>
                  )
                })}
              </svg>

              {/* Render Nodes */}
              {SAHABA_FIGURES.map((fig) => {
                const coord = NODE_COORDS[fig.id]
                if (!coord) return null

                const isSelected = activeFigure?.id === fig.id
                const isInActiveLineage = activeLineageIds.has(fig.id)

                return (
                  <div
                    key={fig.id}
                    onClick={() => setActiveFigure(fig)}
                    style={{
                      left: `${coord.x}px`,
                      top: `${coord.y}px`,
                    }}
                    className={`tree-node-interactive absolute w-48 sm:w-52 rounded-2xl border p-3.5 transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-md ${
                      isSelected
                        ? 'border-gold bg-night-2/95 shadow-[0_0_25px_rgba(234,179,8,0.4)] scale-105 z-30'
                        : isInActiveLineage
                        ? 'border-emerald-400/80 bg-night-2/90 shadow-[0_0_15px_rgba(16,185,129,0.25)] z-20'
                        : 'border-white/10 bg-night-2/75 hover:border-white/30 hover:bg-night-2/90 z-10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div
                        className="size-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border border-white/20 shadow-sm"
                        style={{
                          backgroundColor: `${fig.symbolColor}25`,
                          color: fig.symbolColor,
                        }}
                      >
                        {fig.roleCategory === 'prophet' ? (
                          'ﷺ'
                        ) : fig.roleCategory === 'hadith_master' ? (
                          '📜'
                        ) : fig.roleCategory === 'rashidun_caliph' ? (
                          '👑'
                        ) : (
                          '★'
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="ar-name text-xs sm:text-sm font-bold text-ink truncate gold-text">
                          {pick(fig.name)}
                        </h4>
                        <p className="text-[0.65rem] text-ink-3 truncate">
                          {pick(fig.title)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[0.65rem] font-mono text-ink-3 pt-1 border-t border-white/5">
                      <span>{fig.lifeDates.death.ah}</span>
                      {fig.hadithsNarrated && (
                        <span className="text-cyan-300 font-semibold">
                          {fig.hadithsNarrated} {lang === 'ar' ? 'حديث' : 'Hadiths'}
                        </span>
                      )}
                      {fig.reignDates && (
                        <span className="text-amber-300 truncate max-w-[80px]">
                          {fig.reignDates.ah}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom Historical Epoch Ruler */}
          <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-night-2/90 backdrop-blur-md px-4 py-2 flex items-center justify-between overflow-x-auto no-scrollbar text-[0.68rem] font-mono text-ink-3">
            <span className="text-gold font-bold">{lang === 'ar' ? 'الحقب التاريخية:' : 'Epochs:'}</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300">1–11 AH (النبوة)</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">11–41 AH (الراشدون)</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">59–261 AH (تدوين الحديث)</span>
            <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-300">41–132 AH (الأمويون)</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">132–656 AH (العباسيون)</span>
            <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-300">699–1342 AH (العثمانيون)</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">1041 AH – اليوم (الأشراف)</span>
          </div>
        </div>
      )}

      {/* 2. CHRONOLOGICAL TIMELINE VIEW */}
      {viewMode === 'timeline' && (
        <div className="relative rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-10 shadow-2xl">
          <div className="mb-8 pb-4 border-b border-white/10">
            <h2 className="ar-name text-2xl font-bold text-ink gold-text mb-1">
              {lang === 'ar' ? 'الخط الزمني الموثق للصحابة والخلفاء وأئمة الحديث' : 'Chronological Timeline of Companions, Caliphs & Hadith Masters'}
            </h2>
            <p className="text-xs text-ink-3">
              {lang === 'ar'
                ? 'تسلسل زمني دقيق يبين ولادة ووفاة وأهم أحداث وسير قادة الأمة وحفظة الحديث'
                : 'Exact chronological milestones across 14 centuries of Islamic history'}
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-y-0 before:start-6 before:w-0.5 before:bg-gradient-to-b before:from-gold via-cyan-500 to-purple-500">
            {chronologicalFigures.map((fig, idx) => (
              <div
                key={fig.id}
                onClick={() => setActiveFigure(fig)}
                className="relative ps-14 group cursor-pointer"
              >
                {/* Timeline Dot */}
                <div
                  className="absolute start-3 top-3.5 -translate-x-1/2 size-7 rounded-full border-2 border-white/80 flex items-center justify-center text-[0.65rem] font-bold shadow-lg transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: fig.symbolColor,
                    color: '#fff',
                  }}
                >
                  {idx + 1}
                </div>

                {/* Timeline Item Box */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all group-hover:border-cyan-500/50 group-hover:bg-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="ar-name text-base font-bold text-ink group-hover:text-gold transition-colors">
                        {pick(fig.name)}
                      </span>
                      {fig.honorific && (
                        <span className="text-[0.68rem] text-emerald-400">
                          {fig.honorific}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {fig.reignDates && (
                        <span className="text-amber-300 rounded-full bg-amber-500/10 px-2.5 py-0.5 border border-amber-500/20">
                          {fig.reignDates.ah} ({fig.reignDates.ce})
                        </span>
                      )}
                      <span className="text-ink-3 rounded-full bg-white/5 px-2.5 py-0.5 border border-white/10">
                        {fig.lifeDates.death.ah}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-ink-3 font-medium mb-3">
                    {pick(fig.title)}
                  </p>

                  <p className="text-xs text-ink-2 leading-relaxed mb-3 line-clamp-2">
                    {pick(fig.biography)}
                  </p>

                  {/* Highlights Bar */}
                  <div className="flex flex-wrap items-center gap-3 text-[0.7rem] pt-2 border-t border-white/5 text-ink-3">
                    {fig.hadithsNarrated && (
                      <span className="text-cyan-300 font-semibold flex items-center gap-1">
                        <BookOpen className="size-3" />
                        <span>{fig.hadithsNarrated} {lang === 'ar' ? 'حديثاً مروياً ومسنداً' : 'Hadiths'}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-emerald-400" />
                      <span>{pick(fig.burialPlace)}</span>
                    </span>
                    <span className="text-cyan-400 font-semibold group-hover:underline ms-auto">
                      {lang === 'ar' ? 'الملف الكامل ←' : 'Full Dossier →'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. BIOGRAPHICAL CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFigures.map((fig) => (
            <div
              key={fig.id}
              onClick={() => setActiveFigure(fig)}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/[0.07] hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md shrink-0 border border-white/20"
                      style={{
                        backgroundColor: `${fig.symbolColor}25`,
                        color: fig.symbolColor,
                      }}
                    >
                      {fig.roleCategory === 'prophet' ? (
                        'ﷺ'
                      ) : fig.roleCategory === 'hadith_master' ? (
                        '📜'
                      ) : fig.roleCategory === 'rashidun_caliph' ? (
                        '👑'
                      ) : (
                        '★'
                      )}
                    </div>
                    <div>
                      <h3 className="ar-name text-lg font-bold text-ink group-hover:text-gold transition-colors flex items-center gap-1.5">
                        <span>{pick(fig.name)}</span>
                        {fig.honorific && (
                          <span className="text-[0.68rem] font-normal text-emerald-400">
                            {fig.honorific}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-ink-3 font-medium line-clamp-1">
                        {pick(fig.title)}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-ink-3 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1 rtl:rotate-180" />
                </div>

                {/* Dates & Narrations Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-3 text-[0.7rem] font-mono text-ink-3">
                  {fig.reignDates && (
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-emerald-300 flex items-center gap-1">
                      <Crown className="size-3 text-amber-400" />
                      <span>{fig.reignDates.ah} ({fig.reignDates.ce})</span>
                    </span>
                  )}
                  {fig.hadithsNarrated && (
                    <span className="rounded-full bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 text-cyan-300 font-bold">
                      {fig.hadithsNarrated} {lang === 'ar' ? 'حديث' : 'Hadiths'}
                    </span>
                  )}
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-ink-3">
                    {fig.lifeDates.death.ah}
                  </span>
                </div>

                <p className="text-xs text-ink-2 leading-relaxed line-clamp-3 mb-4">
                  {pick(fig.biography)}
                </p>
              </div>

              {/* Bottom Burial Site & Action */}
              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[0.7rem] text-ink-3">
                <span className="flex items-center gap-1 truncate max-w-[65%]">
                  <MapPin className="size-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{pick(fig.burialPlace)}</span>
                </span>
                <span className="text-emerald-400 font-semibold group-hover:underline">
                  {lang === 'ar' ? 'الملف والسيرة الكاملة ←' : 'Full Dossier →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EXPANSIVE PROPHET-LIKE FULL DOSSIER DRAWER / MODAL */}
      {activeFigure && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveFigure(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border border-emerald-500/30 bg-night-1 p-6 sm:p-9 shadow-2xl text-ink"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveFigure(null)}
              className="absolute end-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-ink-3 hover:text-ink hover:border-white/30 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="size-16 rounded-2xl flex items-center justify-center text-2xl font-bold border-2 border-white/20 shadow-xl"
                style={{
                  backgroundColor: `${activeFigure.symbolColor}25`,
                  color: activeFigure.symbolColor,
                }}
              >
                {activeFigure.roleCategory === 'prophet' ? (
                  'ﷺ'
                ) : activeFigure.roleCategory === 'hadith_master' ? (
                  '📜'
                ) : activeFigure.roleCategory === 'rashidun_caliph' ? (
                  '👑'
                ) : (
                  '★'
                )}
              </div>
              <div>
                <h2 className="ar-name text-2xl sm:text-3xl font-bold text-ink gold-text flex items-center gap-2">
                  <span>{pick(activeFigure.name)}</span>
                  {activeFigure.honorific && (
                    <span className="text-sm font-normal text-emerald-400">
                      {activeFigure.honorific}
                    </span>
                  )}
                </h2>
                <p className="text-sm text-ink-2 font-medium">
                  {pick(activeFigure.title)}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-ink-3 font-mono">
                  {activeFigure.reignDates && (
                    <span className="text-amber-400 font-semibold">
                      {lang === 'ar' ? 'الخلافة: ' : 'Reign: '}
                      {activeFigure.reignDates.ah} ({activeFigure.reignDates.ce})
                    </span>
                  )}
                  <span>·</span>
                  <span>
                    {lang === 'ar' ? 'الوفاة: ' : 'Passed: '}
                    {activeFigure.lifeDates.death.ah} ({activeFigure.lifeDates.death.ce})
                  </span>
                  {activeFigure.hadithsNarrated && (
                    <>
                      <span>·</span>
                      <span className="text-cyan-300 font-bold">
                        {activeFigure.hadithsNarrated} {lang === 'ar' ? 'حديثاً مسنداً' : 'Hadiths'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Noble Lineage Block */}
            <div className="mb-6 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1.5 uppercase tracking-wider">
                <GitCommit className="size-3.5" />
                <span>{lang === 'ar' ? 'النسب الشريف والأصل' : 'Noble Ancestry & Lineage'}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-1 leading-relaxed font-serif">
                {pick(activeFigure.lineage)}
              </p>
              {activeFigure.mother && (
                <p className="text-xs text-ink-3 mt-2 border-t border-emerald-500/10 pt-2">
                  <strong className="text-ink-2">{lang === 'ar' ? 'الأم الكريمة: ' : 'Mother: '}</strong>
                  {pick(activeFigure.mother)}
                </p>
              )}
            </div>

            {/* Biography */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2">
                {lang === 'ar' ? 'السيرة والتاريخ والجهاد' : 'Biography & Life Mission'}
              </h4>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                {pick(activeFigure.biography)}
              </p>
            </div>

            {/* Authentic Hadith Praise / Scholarly Testimony */}
            {activeFigure.propheticPraise && (
              <div className="mb-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 p-4.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
                  <Sparkles className="size-3.5 text-amber-400" />
                  <span>
                    {lang === 'ar'
                      ? 'الثناء النبوي الشريف وشهادة أئمة الإسلام'
                      : 'Prophetic Praise & Scholarly Testimony'}
                  </span>
                </div>
                <p className="ar-name text-sm sm:text-base font-medium text-amber-100 leading-relaxed mb-2 font-serif text-center sm:text-start">
                  {activeFigure.propheticPraise.ar}
                </p>
                {lang !== 'ar' && (
                  <p className="text-xs text-ink-2 italic mb-2">
                    "{lang === 'fr' ? activeFigure.propheticPraise.fr : activeFigure.propheticPraise.en}"
                  </p>
                )}
                <div className="text-[0.7rem] text-amber-400/80 font-mono text-end">
                  {activeFigure.propheticPraise.hadithSource}
                </div>
              </div>
            )}

            {/* Authored Works / Masterpieces (For Bukhari, Muslim, etc.) */}
            {activeFigure.works && activeFigure.works.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="size-3.5 text-cyan-400" />
                  <span>{lang === 'ar' ? 'المصنفات والمؤلفات الخالدة' : 'Authored Works & Masterpieces'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeFigure.works.map((w, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs text-cyan-200 font-medium flex items-center gap-2"
                    >
                      <span className="size-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{pick(w)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teachers & Students Grid (For Hadith Masters) */}
            {(activeFigure.teachers || activeFigure.students) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {activeFigure.teachers && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-ink-3 uppercase tracking-wider mb-2">
                      <Users className="size-3.5 text-amber-400" />
                      <span>{lang === 'ar' ? 'كبار الشيوخ والأساتذة' : 'Eminent Teachers'}</span>
                    </span>
                    <ul className="space-y-1.5 text-ink-2">
                      {activeFigure.teachers.map((t, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-amber-400 shrink-0" />
                          <span>{pick(t)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeFigure.students && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-ink-3 uppercase tracking-wider mb-2">
                      <Users className="size-3.5 text-cyan-400" />
                      <span>{lang === 'ar' ? 'كبار التلاميذ والرواة' : 'Prominent Disciples & Transmitters'}</span>
                    </span>
                    <ul className="space-y-1.5 text-ink-2">
                      {activeFigure.students.map((s, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-cyan-400 shrink-0" />
                          <span>{pick(s)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Golden Quotes / Maxims */}
            {activeFigure.famousQuotes && activeFigure.famousQuotes.length > 0 && (
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-gold mb-2">
                  <Quote className="size-3.5" />
                  <span>{lang === 'ar' ? 'من درر أقوالهم ووصاياهم' : 'Golden Maxims & Quotes'}</span>
                </div>
                {activeFigure.famousQuotes.map((q, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <p className="ar-name text-sm text-ink-1 font-serif leading-relaxed">
                      "{q.ar}"
                    </p>
                    {lang !== 'ar' && (
                      <p className="text-xs text-ink-3 italic">
                        "{lang === 'fr' ? q.fr : q.en}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Milestones Timeline */}
            {activeFigure.milestones && activeFigure.milestones.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Milestone className="size-3.5 text-emerald-400" />
                  <span>{lang === 'ar' ? 'محطات تاريخية فارقة في حياته' : 'Historical Life Milestones'}</span>
                </h4>
                <div className="space-y-2">
                  {activeFigure.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-ink-2 flex items-start gap-3"
                    >
                      <span className="font-mono text-emerald-400 font-bold shrink-0 mt-0.5">
                        {m.yearAH}
                      </span>
                      <div>
                        <div className="font-semibold text-ink-1">{pick(m.title)}</div>
                        <p className="text-ink-3 text-[0.72rem] mt-0.5">{pick(m.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Major Achievements */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="size-3.5 text-emerald-400" />
                <span>{lang === 'ar' ? 'المآثر والإنجازات الكبرى' : 'Major Achievements'}</span>
              </h4>
              <ul className="space-y-2">
                {activeFigure.achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-ink-2 leading-relaxed"
                  >
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pick(ach)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Burial Place Footer */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-ink-3">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-emerald-400" />
                <span>{lang === 'ar' ? 'المرقد الشريف:' : 'Burial Location:'}</span>
                <strong className="text-ink-2 font-medium">{pick(activeFigure.burialPlace)}</strong>
              </span>
              <button
                type="button"
                onClick={() => setActiveFigure(null)}
                className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-night hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
