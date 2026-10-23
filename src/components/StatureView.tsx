import { useState } from 'react'
import {
  ArrowDownUp,
  BookOpen,
  ExternalLink,
  Layers,
  Ruler,
  Sparkles,
} from 'lucide-react'
import { useI18n } from '../i18n'
import { STATURE_SCALE_DATA, PROPHETIC_DESCRIPTIONS } from '../data/stature'
import { A, LevelChip } from './ui'

export function StatureView() {
  const { pick, lang } = useI18n()
  const [selectedScaleId, setSelectedScaleId] = useState<string>('adam_primordial')
  const [selectedProphetId, setSelectedProphetId] = useState<string>('muhammad_desc')
  const [unit, setUnit] = useState<'metric' | 'imperial' | 'cubits'>('metric')
  const [stageZoom, setStageZoom] = useState<'full' | 'megafauna' | 'humanoid'>('full')

  const activeScale = STATURE_SCALE_DATA.find((s) => s.id === selectedScaleId) ?? STATURE_SCALE_DATA[0]!
  const activeDesc = PROPHETIC_DESCRIPTIONS.find((p) => p.id === selectedProphetId) ?? PROPHETIC_DESCRIPTIONS[0]!

  const formatHeight = (meters: number, cubits?: number) => {
    switch (unit) {
      case 'cubits':
        return cubits
          ? `${cubits} ${lang === 'ar' ? 'ذراعاً' : lang === 'fr' ? 'coudées' : 'cubits'}`
          : `${(meters / 0.5).toFixed(1)} ${lang === 'ar' ? 'ذراعاً' : lang === 'fr' ? 'coudées' : 'cubits'}`
      case 'imperial': {
        const totalInches = meters * 39.3701
        const feet = Math.floor(totalInches / 12)
        const inches = Math.round(totalInches % 12)
        return `${feet}′ ${inches}″ (${(meters * 3.28084).toFixed(1)} ${lang === 'ar' ? 'قدم' : 'ft'})`
      }
      case 'metric':
      default:
        return `${meters.toFixed(1)} ${lang === 'ar' ? 'م' : 'm'} (${Math.round(meters * 100)} ${lang === 'ar' ? 'سم' : 'cm'})`
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="reveal text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold">
          <Ruler className="size-3.5" />
          <span>{lang === 'ar' ? 'المقاييس النبوية والهيئة' : lang === 'fr' ? 'Dimensions & Apparence' : 'Prophetic Stature & Form'}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          <span className="ar-name gold-text block mb-2">{lang === 'ar' ? 'هيئة الأنبياء ومقاييس الأجساد عبر العصور' : 'Stature of the Prophets Across History'}</span>
          <span className="text-xl sm:text-2xl font-light text-ink-2">
            {lang === 'ar'
              ? 'دراسة وثائقية مقارنة مستندة إلى صحيح الأحاديث والآيات القرآنية'
              : lang === 'fr'
              ? 'Une étude documentaire et comparative basée sur les textes authentiques'
              : 'Authentic textual descriptions and historical body scale compared to humanity today'}
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-ink-3 leading-relaxed">
          {lang === 'ar'
            ? 'خلق الله آدم عليه السلام طوله ستون ذراعاً، ولم يزل الخلق ينقص بعده عبر الأجيال حتى استقر على ما هو عليه اليوم، وسيعود أهل الجنة إلى هيئة آدم وكماله.'
            : lang === 'fr'
            ? 'Allah créa Adam d’une stature de 60 coudées (~30 mètres). La taille des hommes a décru au fil des millénaires pour se stabiliser à l’époque prophétique, avant d’être restaurée au Paradis.'
            : 'Allah created Adam sixty cubits tall (~30 meters). The stature of humankind gradually decreased over ancient epochs until reaching the modern baseline, to be gloriously restored in Paradise.'}
        </p>
      </div>

      {/* Unit Selector Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <ArrowDownUp className="size-5 text-gold" />
          <span>{lang === 'ar' ? 'مقارنة الطول والقامة' : lang === 'fr' ? 'Échelle comparative de taille' : 'Human Stature Scale Comparison'}</span>
        </h2>
        <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-xs">
          <button
            type="button"
            onClick={() => setUnit('metric')}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${unit === 'metric' ? 'bg-gold text-night font-bold' : 'text-ink-2 hover:text-ink'}`}
          >
            {lang === 'ar' ? 'متري (م)' : 'Metric (m)'}
          </button>
          <button
            type="button"
            onClick={() => setUnit('imperial')}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${unit === 'imperial' ? 'bg-gold text-night font-bold' : 'text-ink-2 hover:text-ink'}`}
          >
            {lang === 'ar' ? 'إمبراطوري (قدم)' : 'Imperial (ft)'}
          </button>
          <button
            type="button"
            onClick={() => setUnit('cubits')}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${unit === 'cubits' ? 'bg-gold text-night font-bold' : 'text-ink-2 hover:text-ink'}`}
          >
            {lang === 'ar' ? 'الأذرع (ذراع)' : 'Cubits (ذراع)'}
          </button>
        </div>
      </div>

      {/* Interactive Silhouette & Dinosaur Comparison Theater */}
      <div className="glass rounded-3xl p-6 sm:p-8 mb-12 border border-gold/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <Layers className="size-4" />
              <span>{lang === 'ar' ? 'مسرح مقارنة الظلال والقامة الحقيقية مع الكائنات والديناصورات' : 'Interactive Silhouette & Prehistoric Scale Stage'}</span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-ink-3">
              {lang === 'ar'
                ? 'قارن طول قامة آدم عليه السلام (30 متراً) وقوم عاد وثمود وموسى عليه السلام جنباً إلى جنب مع كائنات الأرض والديناصورات المنقرضة على أرضية واحدة وبظلال واقعية'
                : 'Direct standing scale comparison between Adam (30m), ancient giants, prophets, dinosaurs (Sauropod & T-Rex), and megafauna.'}
            </p>
          </div>

          {/* Scale Zoom Controls */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 text-xs">
            <button
              type="button"
              onClick={() => setStageZoom('full')}
              className={`rounded-full px-3.5 py-1.5 font-medium transition-all ${
                stageZoom === 'full' ? 'bg-gold text-night font-bold shadow-[0_0_12px_rgba(233,198,123,0.5)]' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {lang === 'ar' ? 'الكل (30م)' : '0–30m Full'}
            </button>
            <button
              type="button"
              onClick={() => setStageZoom('megafauna')}
              className={`rounded-full px-3.5 py-1.5 font-medium transition-all ${
                stageZoom === 'megafauna' ? 'bg-gold text-night font-bold shadow-[0_0_12px_rgba(233,198,123,0.5)]' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {lang === 'ar' ? 'العمالقة والديناصورات (12م)' : '0–12m Megafauna'}
            </button>
            <button
              type="button"
              onClick={() => setStageZoom('humanoid')}
              className={`rounded-full px-3.5 py-1.5 font-medium transition-all ${
                stageZoom === 'humanoid' ? 'bg-gold text-night font-bold shadow-[0_0_12px_rgba(233,198,123,0.5)]' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {lang === 'ar' ? 'تقريب بشري (4.5م)' : '0–4.5m Humanoid'}
            </button>
          </div>
        </div>

        {/* SVG Silhouette Stage */}
        <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-gradient-to-b from-night-surface/90 via-night/95 to-black p-2 sm:p-4">
          <svg viewBox="0 0 1000 420" className="w-full min-w-[720px] select-none" role="img" aria-label="Scale Stage">
            <defs>
              <linearGradient id="ground-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(233, 198, 123, 0.45)" />
                <stop offset="12%" stopColor="rgba(35, 30, 52, 0.95)" />
                <stop offset="100%" stopColor="rgba(10, 8, 20, 0.99)" />
              </linearGradient>
            </defs>

            {/* Grid measurement lines */}
            {stageZoom === 'full' && (
              <>
                {[0, 5, 10, 15, 20, 25, 30].map((m) => {
                  const y = 360 - m * 10
                  return (
                    <g key={m} opacity="0.35">
                      <line x1="45" y1={y} x2="985" y2={y} stroke={m === 0 ? '#e9c67b' : '#64748b'} strokeDasharray={m === 0 ? undefined : '3 4'} strokeWidth={m === 0 ? 1.5 : 0.8} />
                      <text x="35" y={y + 3.5} textAnchor="end" fontSize="9.5" fill="#e9c67b" fontFamily="monospace">
                        {m} {lang === 'ar' ? 'م' : 'm'}
                      </text>
                    </g>
                  )
                })}
              </>
            )}

            {stageZoom === 'megafauna' && (
              <>
                {[0, 2, 4, 6, 8, 10, 12].map((m) => {
                  const y = 360 - m * 26
                  return (
                    <g key={m} opacity="0.35">
                      <line x1="45" y1={y} x2="985" y2={y} stroke={m === 0 ? '#e9c67b' : '#64748b'} strokeDasharray={m === 0 ? undefined : '3 4'} strokeWidth={m === 0 ? 1.5 : 0.8} />
                      <text x="35" y={y + 3.5} textAnchor="end" fontSize="9.5" fill="#e9c67b" fontFamily="monospace">
                        {m} {lang === 'ar' ? 'م' : 'm'}
                      </text>
                    </g>
                  )
                })}
              </>
            )}

            {stageZoom === 'humanoid' && (
              <>
                {[0, 1, 2, 3, 4].map((m) => {
                  const y = 360 - m * 72
                  return (
                    <g key={m} opacity="0.35">
                      <line x1="45" y1={y} x2="985" y2={y} stroke={m === 0 ? '#e9c67b' : '#64748b'} strokeDasharray={m === 0 ? undefined : '3 4'} strokeWidth={m === 0 ? 1.5 : 0.8} />
                      <text x="35" y={y + 3.5} textAnchor="end" fontSize="9.5" fill="#e9c67b" fontFamily="monospace">
                        {m} {lang === 'ar' ? 'م' : 'm'}
                      </text>
                    </g>
                  )
                })}
              </>
            )}

            {/* Ground surface */}
            <rect x="0" y="360" width="1000" height="60" fill="url(#ground-gradient)" />
            <line x1="0" y1="360" x2="1000" y2="360" stroke="#e9c67b" strokeWidth="1.5" strokeOpacity="0.8" />

            {/* Figures Rendered According to Zoom Mode */}
            {stageZoom === 'full' && (
              <>
                {/* Adam (30m) */}
                <g onClick={() => setSelectedScaleId('adam_primordial')}>
                  <HumanSilhouette
                    h={300}
                    x={130}
                    groundY={360}
                    active={selectedScaleId === 'adam_primordial'}
                    label={lang === 'ar' ? 'آدم (30م / 60 ذراعاً)' : 'Adam (30m / 60 cubits)'}
                  />
                </g>

                {/* Sauropod / Diplodocus (12m head height) */}
                <g onClick={() => setSelectedScaleId('sauropod_diplodocus')}>
                  <SauropodSilhouette
                    h={120}
                    x={350}
                    groundY={360}
                    active={selectedScaleId === 'sauropod_diplodocus'}
                    label={lang === 'ar' ? 'سوروبود (12م)' : 'Sauropod (12m)'}
                  />
                </g>

                {/* People of 'Ad (7.5m) */}
                <g onClick={() => setSelectedScaleId('people_of_ad')}>
                  <HumanSilhouette
                    h={75}
                    x={530}
                    groundY={360}
                    active={selectedScaleId === 'people_of_ad'}
                    label={lang === 'ar' ? 'عاد (≈7.5م)' : "‘Ad (≈7.5m)"}
                  />
                </g>

                {/* Giraffe (5.5m) */}
                <g onClick={() => setSelectedScaleId('tall_giraffe')}>
                  <GiraffeSilhouette
                    h={55}
                    x={635}
                    groundY={360}
                    active={selectedScaleId === 'tall_giraffe'}
                    label={lang === 'ar' ? 'زرافة (5.5م)' : 'Giraffe (5.5m)'}
                  />
                </g>

                {/* T-Rex (4.5m) */}
                <g onClick={() => setSelectedScaleId('trex_apex')}>
                  <TRexSilhouette
                    h={45}
                    x={735}
                    groundY={360}
                    active={selectedScaleId === 'trex_apex'}
                    label={lang === 'ar' ? 'تي-ريكس (4.5م)' : 'T-Rex (4.5m)'}
                  />
                </g>

                {/* Thamud (≈4m) */}
                <g onClick={() => setSelectedScaleId('thamud_ancient')}>
                  <HumanSilhouette
                    h={40}
                    x={830}
                    groundY={360}
                    active={selectedScaleId === 'thamud_ancient'}
                    label={lang === 'ar' ? 'ثمود (≈4م)' : 'Thamud (≈4m)'}
                  />
                </g>

                {/* African Elephant (3.5m) */}
                <g onClick={() => setSelectedScaleId('african_elephant')}>
                  <ElephantSilhouette
                    h={35}
                    x={905}
                    groundY={360}
                    active={selectedScaleId === 'african_elephant'}
                    label={lang === 'ar' ? 'فيل (3.5م)' : 'Elephant (3.5m)'}
                  />
                </g>

                {/* Musa (≈2.1m) */}
                <g onClick={() => setSelectedScaleId('musa_era')}>
                  <HumanSilhouette
                    h={21}
                    x={955}
                    groundY={360}
                    active={selectedScaleId === 'musa_era'}
                    label={lang === 'ar' ? 'موسى (≈2.1م)' : 'Musa (≈2.1m)'}
                  />
                </g>

                {/* Modern Human (1.75m) */}
                <g onClick={() => setSelectedScaleId('modern_human')}>
                  <HumanSilhouette
                    h={17.5}
                    x={985}
                    groundY={360}
                    active={selectedScaleId === 'modern_human'}
                    label={lang === 'ar' ? 'المعاصر (1.75م)' : 'Modern (1.75m)'}
                  />
                </g>
              </>
            )}

            {stageZoom === 'megafauna' && (
              <>
                {/* Sauropod / Diplodocus (12m -> 312px) */}
                <g onClick={() => setSelectedScaleId('sauropod_diplodocus')}>
                  <SauropodSilhouette
                    h={312}
                    x={180}
                    groundY={360}
                    active={selectedScaleId === 'sauropod_diplodocus'}
                    label={lang === 'ar' ? 'سوروبود العملاق (12م / 24 ذراعاً)' : 'Giant Sauropod (12m)'}
                  />
                </g>

                {/* People of 'Ad (7.5m -> 195px) */}
                <g onClick={() => setSelectedScaleId('people_of_ad')}>
                  <HumanSilhouette
                    h={195}
                    x={390}
                    groundY={360}
                    active={selectedScaleId === 'people_of_ad'}
                    label={lang === 'ar' ? 'قوم عاد (7.5م / 15 ذراعاً)' : "People of ‘Ad (7.5m)"}
                  />
                </g>

                {/* Giraffe (5.5m -> 143px) */}
                <g onClick={() => setSelectedScaleId('tall_giraffe')}>
                  <GiraffeSilhouette
                    h={143}
                    x={510}
                    groundY={360}
                    active={selectedScaleId === 'tall_giraffe'}
                    label={lang === 'ar' ? 'الزرافة (5.5م)' : 'Giraffe (5.5m)'}
                  />
                </g>

                {/* T-Rex (4.5m -> 117px) */}
                <g onClick={() => setSelectedScaleId('trex_apex')}>
                  <TRexSilhouette
                    h={117}
                    x={630}
                    groundY={360}
                    active={selectedScaleId === 'trex_apex'}
                    label={lang === 'ar' ? 'تي-ريكس (4.5م)' : 'T-Rex (4.5m)'}
                  />
                </g>

                {/* Thamud (4m -> 104px) */}
                <g onClick={() => setSelectedScaleId('thamud_ancient')}>
                  <HumanSilhouette
                    h={104}
                    x={740}
                    groundY={360}
                    active={selectedScaleId === 'thamud_ancient'}
                    label={lang === 'ar' ? 'ثمود (4م / 8 أذرع)' : 'Thamud (≈4m)'}
                  />
                </g>

                {/* Elephant (3.5m -> 91px) */}
                <g onClick={() => setSelectedScaleId('african_elephant')}>
                  <ElephantSilhouette
                    h={91}
                    x={830}
                    groundY={360}
                    active={selectedScaleId === 'african_elephant'}
                    label={lang === 'ar' ? 'فيل إفريقي (3.5م)' : 'Elephant (3.5m)'}
                  />
                </g>

                {/* Musa (2.1m -> 54.6px) */}
                <g onClick={() => setSelectedScaleId('musa_era')}>
                  <HumanSilhouette
                    h={54.6}
                    x={915}
                    groundY={360}
                    active={selectedScaleId === 'musa_era'}
                    label={lang === 'ar' ? 'موسى (≈2.1م)' : 'Musa (≈2.1m)'}
                  />
                </g>

                {/* Modern Human (1.75m -> 45.5px) */}
                <g onClick={() => setSelectedScaleId('modern_human')}>
                  <HumanSilhouette
                    h={45.5}
                    x={970}
                    groundY={360}
                    active={selectedScaleId === 'modern_human'}
                    label={lang === 'ar' ? 'المعاصر (1.75م)' : 'Modern (1.75m)'}
                  />
                </g>
              </>
            )}

            {stageZoom === 'humanoid' && (
              <>
                {/* T-Rex (4.5m -> 324px) */}
                <g onClick={() => setSelectedScaleId('trex_apex')}>
                  <TRexSilhouette
                    h={324}
                    x={170}
                    groundY={360}
                    active={selectedScaleId === 'trex_apex'}
                    label={lang === 'ar' ? 'تي-ريكس المفترس (4.5م)' : 'T-Rex Apex (4.5m)'}
                  />
                </g>

                {/* Thamud (4m -> 288px) */}
                <g onClick={() => setSelectedScaleId('thamud_ancient')}>
                  <HumanSilhouette
                    h={288}
                    x={360}
                    groundY={360}
                    active={selectedScaleId === 'thamud_ancient'}
                    label={lang === 'ar' ? 'قوم ثمود (4م / 8 أذرع)' : 'Thamud Giant (4m)'}
                  />
                </g>

                {/* Elephant (3.5m -> 252px) */}
                <g onClick={() => setSelectedScaleId('african_elephant')}>
                  <ElephantSilhouette
                    h={252}
                    x={540}
                    groundY={360}
                    active={selectedScaleId === 'african_elephant'}
                    label={lang === 'ar' ? 'الفيل الإفريقي (3.5م)' : 'African Elephant (3.5m)'}
                  />
                </g>

                {/* Musa (2.1m -> 151px) */}
                <g onClick={() => setSelectedScaleId('musa_era')}>
                  <HumanSilhouette
                    h={151.2}
                    x={740}
                    groundY={360}
                    active={selectedScaleId === 'musa_era'}
                    label={lang === 'ar' ? 'موسى عليه السلام (2.1م)' : 'Prophet Musa (≈2.1m)'}
                  />
                </g>

                {/* Modern Human (1.75m -> 126px) */}
                <g onClick={() => setSelectedScaleId('modern_human')}>
                  <HumanSilhouette
                    h={126}
                    x={890}
                    groundY={360}
                    active={selectedScaleId === 'modern_human'}
                    label={lang === 'ar' ? 'الإنسان المعاصر (1.75م)' : 'Modern Human (1.75m)'}
                  />
                </g>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Interactive Scale Comparison Visualizer */}
      <div className="grid gap-8 lg:grid-cols-12 mb-20">
        {/* Left: Interactive Vertical Height Bars */}
        <div className="glass rounded-3xl p-6 lg:col-span-7 flex flex-col justify-between">
          <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-3">
              {lang === 'ar' ? 'مخطط الارتفاع النسبي (نسبة إلى 30 متراً)' : 'Relative Height Chart (up to 30 meters)'}
            </span>
            <span className="text-xs font-mono text-gold-2">
              {lang === 'ar'
                ? 'الحد الأقصى: 30.0 م / 60 ذراعاً'
                : lang === 'fr'
                ? 'Max : 30,0 m / 60 coudées'
                : 'Max: 30.0m / 60 cubits'}
            </span>
          </div>

          {/* SVG Visual Height Bars */}
          <div className="space-y-4">
            {STATURE_SCALE_DATA.map((item) => {
              const active = item.id === selectedScaleId
              const percentage = Math.min(100, Math.max(6, (item.heightMeters / 30.0) * 100))
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedScaleId(item.id)}
                  className={`group cursor-pointer rounded-2xl p-3.5 transition-all duration-300 border ${
                    active ? 'border-gold/60 bg-gold/10 shadow-[0_0_20px_rgba(233,198,123,0.15)]' : 'border-white/5 bg-night-surface/40 hover:border-gold/30 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className={`font-semibold flex items-center gap-2 ${active ? 'text-gold' : 'text-ink'}`}>
                      <span className={`size-2.5 rounded-full ${active ? 'bg-gold animate-pulse' : 'bg-white/20'}`} />
                      {pick(item.name)}
                    </span>
                    <span className="flex items-center gap-2">
                      {item.level && <LevelChip level={item.level} />}
                      <span className="font-mono text-xs font-bold text-gold-2">
                        {item.heightStated ? '' : '≈ '}
                        {formatHeight(item.heightMeters, item.heightCubits)}
                      </span>
                    </span>
                  </div>

                  {/* Meter Bar */}
                  <div className="h-3 w-full rounded-full bg-night/80 overflow-hidden border border-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${item.heightStated ? '' : 'opacity-60 [background-image:repeating-linear-gradient(90deg,transparent_0_6px,rgb(0_0_0/0.35)_6px_9px)]'} ${
                        active
                          ? 'bg-gradient-to-r from-gold-3 via-gold to-gold-2 shadow-[0_0_12px_rgba(233,198,123,0.8)]'
                          : 'bg-white/20 group-hover:bg-gold/40'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[0.7rem] text-ink-3">
                    <span>{pick(item.era)}</span>
                    <span>
                      {item.scaleRatio === 1
                        ? (lang === 'ar' ? 'المقياس الأساسي المعاصر' : 'Modern Baseline')
                        : `${item.scaleRatio.toFixed(1)}x ${lang === 'ar' ? 'ضعف الإنسان الحالي' : 'modern human'}`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Selected Scale Detail Dossier */}
        <div className="glass rounded-3xl p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between border-gold/30">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="size-4" />
              <span>{lang === 'ar' ? 'التفاصيل التوثيقية للمقياس' : 'Documentary Scale Details'}</span>
            </div>
            <h3 className="mt-3 text-2xl font-bold text-ink">
              {pick(activeScale.name)}
            </h3>
            <p className="mt-1 text-xs text-gold-2 font-mono">
              {pick(activeScale.era)}
            </p>

            <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/5 p-4 text-center">
              <span className="text-xs uppercase tracking-wider text-ink-3 block">
                {activeScale.heightStated
                  ? lang === 'ar' ? 'الارتفاع المذكور' : lang === 'fr' ? 'Taille indiquée' : 'Stated height'
                  : lang === 'ar' ? 'ارتفاع توضيحي — لم يذكره نص' : lang === 'fr' ? 'Taille illustrative — aucun texte ne la donne' : 'Illustrative height — no text gives it'}
              </span>
              <span className="mt-1 block text-3xl font-extrabold text-gold font-mono">
                {formatHeight(activeScale.heightMeters, activeScale.heightCubits)}
              </span>
              {activeScale.heightCubits && (
                <span className="text-xs text-ink-2 block mt-1">
                  ({activeScale.heightCubits} {lang === 'ar' ? 'ذراعاً شرعياً' : 'prophetic cubits'}) · {activeScale.scaleRatio}x {lang === 'ar' ? 'طول اليوم' : 'modern height'}
                </span>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-2">
              {pick(activeScale.description)}
            </p>

            {activeScale.hadithText && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-night/80 p-4">
                <div className="flex items-center gap-1.5 text-xs text-gold font-semibold mb-2">
                  <BookOpen className="size-3.5" />
                  <span>{lang === 'ar' ? 'النص والحديث الشريف' : 'Textual Citation'}</span>
                </div>
                <p className={`text-xs leading-relaxed text-ink-2 ${lang === 'ar' ? 'naskh text-sm' : 'italic'}`}>
                  {pick(activeScale.hadithText)}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-ink-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              {activeScale.level ? <LevelChip level={activeScale.level} /> : <span>{lang === 'ar' ? 'قياس علمي' : lang === 'fr' ? 'Mesure scientifique' : 'Scientific measurement'}</span>}
            </span>
            {activeScale.textRef && <span className="font-mono text-gold-2">{activeScale.textRef}</span>}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative my-16 text-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
        <span className="relative glass px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-gold uppercase">
          {lang === 'ar' ? 'الشمائل النبوية والأوصاف الخلقية' : 'The Prophetic Portraits & Physical Traits'}
        </span>
      </div>

      {/* Prophet Physical Descriptions Section */}
      <div className="mb-14">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">
              {lang === 'ar' ? 'أوصاف الأنبياء كما رآهم النبي ﷺ وميزتهم النصوص' : 'Physical Appearance of the Prophets in Authentic Hadith'}
            </h2>
            <p className="mt-1 text-sm text-ink-3">
              {lang === 'ar'
                ? 'كيف كان يبدو الأنبياء؟ اللون، القامة، الوجه، والشعر مقارنة بالبشر اليوم'
                : 'Complexion, build, hair, and facial traits compared to modern humans'}
            </p>
          </div>

          {/* Prophet Picker Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {PROPHETIC_DESCRIPTIONS.map((pd) => {
              const active = pd.id === selectedProphetId
              return (
                <button
                  key={pd.id}
                  type="button"
                  onClick={() => setSelectedProphetId(pd.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    active ? 'bg-gold text-night shadow-[0_0_15px_rgba(233,198,123,0.5)]' : 'glass text-ink hover:text-gold hover:border-gold/40'
                  }`}
                >
                  <span className="ar-name me-1">{pd.name.ar}</span>
                  {lang !== 'ar' && <span>· {pick(pd.name)}</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Prophet Physical Description Card */}
        <div className="glass rounded-3xl p-6 sm:p-10 border-gold/30">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div>
              <span className="chip text-gold text-xs font-semibold">{pick(activeDesc.honorific)}</span>
              <h3 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
                <span className="ar-name gold-text me-3">{activeDesc.name.ar}</span>
                {lang !== 'ar' && <span className="font-light text-ink-2">· {pick(activeDesc.name)}</span>}
              </h3>
            </div>
            <div className="text-end">
              <span className="text-xs uppercase tracking-wider text-ink-3 block">
                {lang === 'ar' ? 'القامة والهيئة' : 'Stature Category'}
              </span>
              <span className="font-medium text-gold-2 text-base">
                {pick(activeDesc.statureCategory)}
              </span>
              <span className="block text-xs text-ink-3 font-mono mt-0.5">
                {pick(activeDesc.heightEstimate)}
              </span>
            </div>
          </div>

          {/* Characteristics Bento Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {/* Complexion */}
            <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-5">
              <span className="text-xs font-semibold tracking-wider text-gold uppercase block mb-2">
                {lang === 'ar' ? 'اللون والبشرة' : 'Complexion & Skin'}
              </span>
              <p className={`text-sm text-ink leading-relaxed ${lang === 'ar' ? 'naskh text-base' : ''}`}>
                {pick(activeDesc.complexion)}
              </p>
            </div>

            {/* Hair and Beard */}
            <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-5">
              <span className="text-xs font-semibold tracking-wider text-gold uppercase block mb-2">
                {lang === 'ar' ? 'الشعر واللحية' : 'Hair & Beard'}
              </span>
              <p className={`text-sm text-ink leading-relaxed ${lang === 'ar' ? 'naskh text-base' : ''}`}>
                {pick(activeDesc.hairAndBeard)}
              </p>
            </div>

            {/* Physique and Build */}
            <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-5">
              <span className="text-xs font-semibold tracking-wider text-gold uppercase block mb-2">
                {lang === 'ar' ? 'البنية والمنكبان' : 'Physique & Build'}
              </span>
              <p className={`text-sm text-ink leading-relaxed ${lang === 'ar' ? 'naskh text-base' : ''}`}>
                {pick(activeDesc.physiqueAndBuild)}
              </p>
            </div>

            {/* Facial Features */}
            <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-5">
              <span className="text-xs font-semibold tracking-wider text-gold uppercase block mb-2">
                {lang === 'ar' ? 'ملامح الوجه والعينين' : 'Facial Features & Eyes'}
              </span>
              <p className={`text-sm text-ink leading-relaxed ${lang === 'ar' ? 'naskh text-base' : ''}`}>
                {pick(activeDesc.facialFeatures)}
              </p>
            </div>

            {/* Demeanor & Presence */}
            <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-5">
              <span className="text-xs font-semibold tracking-wider text-gold uppercase block mb-2">
                {lang === 'ar' ? 'الهيبة والمشية والخلق' : 'Demeanor & Aura'}
              </span>
              <p className={`text-sm text-ink leading-relaxed ${lang === 'ar' ? 'naskh text-base' : ''}`}>
                {pick(activeDesc.demeanorAndPresence)}
              </p>
            </div>

            {/* Comparison with Modern Human */}
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <span className="text-xs font-semibold tracking-wider text-gold uppercase block mb-2">
                {lang === 'ar' ? 'المقارنة مع الإنسان المعاصر' : 'Compared to Humans Today'}
              </span>
              <p className={`text-sm text-ink-2 leading-relaxed ${lang === 'ar' ? 'naskh text-base' : ''}`}>
                {pick(activeDesc.comparisonWithModern)}
              </p>
            </div>
          </div>

          {/* Authentic Narrations Section */}
          <div className="rounded-2xl border border-white/10 bg-night/80 p-6">
            <h4 className="text-xs font-semibold tracking-wider text-gold uppercase mb-4 flex items-center gap-2">
              <BookOpen className="size-4" />
              <span>{lang === 'ar' ? 'نصوص الأحاديث النبوية المعتمدة' : 'Authentic Hadith Records'}</span>
            </h4>
            <div className="space-y-4">
              {activeDesc.authenticNarrations.map((narration, nIdx) => (
                <div key={nIdx} className="border-s-2 border-gold/40 ps-4 py-1">
                  <div className="flex items-center gap-2 text-xs text-gold-2 mb-1">
                    <span className="font-semibold">{narration.source}</span>
                    {narration.hadithNumber && <span className="font-mono">#{narration.hadithNumber}</span>}
                  </div>
                  <p className={`text-sm text-ink-2 leading-relaxed ${lang === 'ar' ? 'naskh text-base' : 'italic'}`}>
                    {pick(narration.text)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Link to Profile */}
          <div className="mt-8 flex justify-end">
            <A
              href={`/p/${activeDesc.prophetId}`}
              className="btn btn-ghost text-xs border border-gold/40 hover:bg-gold/15 flex items-center gap-2"
            >
              <span>{lang === 'ar' ? 'فتح السيرة الكاملة' : 'View Full Prophet Profile'}</span>
              <ExternalLink className="size-3.5" />
            </A>
          </div>
        </div>
      </div>
    </div>
  )
}

function HumanSilhouette({ h, x, groundY, active, label }: { h: number; x: number; groundY: number; active: boolean; label: string }) {
  const shadowRx = Math.max(7, h * 0.16)
  const shadowRy = Math.max(2.5, h * 0.04)
  return (
    <g className="cursor-pointer transition-all duration-300">
      {/* Ground shadow */}
      <ellipse cx={x} cy={groundY + 2.5} rx={shadowRx} ry={shadowRy} fill="rgba(0,0,0,0.6)" />
      {/* Active halo */}
      {active && (
        <ellipse cx={x} cy={groundY - h / 2} rx={Math.max(12, h * 0.2)} ry={h * 0.52} fill="rgba(233, 198, 123, 0.15)" />
      )}
      {/* Height pillar. No human figure is drawn: people, and above all the Prophets, are never depicted. */}
      <rect
        x={x - Math.max(5, h * 0.07)}
        y={groundY - h}
        width={Math.max(10, h * 0.14)}
        height={h}
        rx={Math.max(5, h * 0.07)}
        fill={active ? 'url(#pillar-active)' : 'rgba(233,198,123,0.18)'}
        stroke={active ? '#e9c67b' : 'rgba(255,255,255,0.25)'}
        strokeWidth="1.2"
      />
      <defs>
        <linearGradient id="pillar-active" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe6b0" />
          <stop offset="1" stopColor="#a8823c" />
        </linearGradient>
      </defs>
      {/* Label above */}
      <text
        x={x}
        y={groundY - h - 8}
        textAnchor="middle"
        fontSize={Math.max(9, Math.min(12, h * 0.12))}
        fill={active ? '#fbe6b0' : '#c3bdd2'}
        fontWeight={active ? 700 : 500}
        className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
      >
        {label}
      </text>
    </g>
  )
}

function SauropodSilhouette({ h, x, groundY, active, label }: { h: number; x: number; groundY: number; active: boolean; label: string }) {
  const s = h / 100
  return (
    <g className="cursor-pointer transition-all duration-300">
      <ellipse cx={x} cy={groundY + 3.5} rx={h * 0.75} ry={Math.max(4, h * 0.08)} fill="rgba(0,0,0,0.6)" />
      {active && (
        <ellipse cx={x} cy={groundY - h * 0.45} rx={h * 0.85} ry={h * 0.55} fill="rgba(233, 198, 123, 0.12)" />
      )}
      <g transform={`translate(${x}, ${groundY - h}) scale(${s})`}>
        <path
          d="M -70,8 C -75,6 -80,10 -76,14 C -70,18 -55,30 -42,50 C -36,58 -32,68 -30,72 L -33,98 C -33,100 -27,100 -27,98 L -24,76 L -16,76 L -18,98 C -18,100 -12,100 -12,98 L -10,74 C -2,72 8,72 20,74 L 22,98 C 22,100 28,100 28,98 L 26,76 L 36,76 L 34,98 C 34,100 40,100 40,98 L 42,70 C 58,68 85,60 115,50 C 120,48 120,44 112,45 C 80,48 50,52 35,50 C 20,40 -5,40 -25,48 C -35,35 -48,20 -60,10 Z"
          fill={active ? '#fbe6b0' : '#181524'}
          stroke={active ? '#e9c67b' : 'rgba(255,255,255,0.2)'}
          strokeWidth="1.2"
        />
      </g>
      <text x={x} y={groundY - h - 8} textAnchor="middle" fontSize={11} fill={active ? '#fbe6b0' : '#c3bdd2'} fontWeight={active ? 700 : 500}>
        {label}
      </text>
    </g>
  )
}

function TRexSilhouette({ h, x, groundY, active, label }: { h: number; x: number; groundY: number; active: boolean; label: string }) {
  const s = h / 100
  return (
    <g className="cursor-pointer transition-all duration-300">
      <ellipse cx={x} cy={groundY + 2.5} rx={h * 0.55} ry={Math.max(3, h * 0.08)} fill="rgba(0,0,0,0.6)" />
      {active && (
        <ellipse cx={x} cy={groundY - h * 0.45} rx={h * 0.65} ry={h * 0.55} fill="rgba(233, 198, 123, 0.12)" />
      )}
      <g transform={`translate(${x}, ${groundY - h}) scale(${s})`}>
        <path
          d="M -42,8 C -50,12 -52,22 -44,26 C -38,28 -34,22 -32,24 C -28,34 -24,42 -18,48 L -24,56 C -25,58 -22,60 -20,58 L -14,52 C -8,52 2,54 8,62 L 6,98 C 6,100 12,100 14,98 L 18,72 L 26,98 C 26,100 32,100 34,98 L 32,68 C 45,65 70,55 95,45 C 100,43 98,40 92,42 C 68,48 45,48 30,42 C 16,36 -2,32 -18,22 C -24,14 -32,6 -42,8 Z"
          fill={active ? '#fbe6b0' : '#181524'}
          stroke={active ? '#e9c67b' : 'rgba(255,255,255,0.2)'}
          strokeWidth="1.2"
        />
      </g>
      <text x={x} y={groundY - h - 8} textAnchor="middle" fontSize={10} fill={active ? '#fbe6b0' : '#c3bdd2'} fontWeight={active ? 700 : 500}>
        {label}
      </text>
    </g>
  )
}

function GiraffeSilhouette({ h, x, groundY, active, label }: { h: number; x: number; groundY: number; active: boolean; label: string }) {
  const s = h / 100
  return (
    <g className="cursor-pointer transition-all duration-300">
      <ellipse cx={x} cy={groundY + 2.5} rx={h * 0.3} ry={Math.max(2, h * 0.06)} fill="rgba(0,0,0,0.6)" />
      {active && (
        <ellipse cx={x} cy={groundY - h * 0.45} rx={h * 0.35} ry={h * 0.55} fill="rgba(233, 198, 123, 0.12)" />
      )}
      <g transform={`translate(${x}, ${groundY - h}) scale(${s})`}>
        <path
          d="M -16,4 C -20,6 -20,12 -16,14 L -8,46 C -12,48 -16,55 -16,62 L -18,98 C -18,100 -14,100 -14,98 L -11,68 L -6,68 L -8,98 C -8,100 -4,100 -4,98 L -2,66 C 8,64 16,66 20,70 L 18,98 C 18,100 22,100 22,98 L 24,72 L 28,98 C 28,100 32,100 32,98 L 30,66 C 30,56 22,50 14,50 C 4,50 -2,44 -4,35 L -10,8 C -10,5 -13,3 -16,4 Z"
          fill={active ? '#fbe6b0' : '#181524'}
          stroke={active ? '#e9c67b' : 'rgba(255,255,255,0.2)'}
          strokeWidth="1.2"
        />
      </g>
      <text x={x} y={groundY - h - 8} textAnchor="middle" fontSize={10} fill={active ? '#fbe6b0' : '#c3bdd2'} fontWeight={active ? 700 : 500}>
        {label}
      </text>
    </g>
  )
}

function ElephantSilhouette({ h, x, groundY, active, label }: { h: number; x: number; groundY: number; active: boolean; label: string }) {
  const s = h / 100
  return (
    <g className="cursor-pointer transition-all duration-300">
      <ellipse cx={x} cy={groundY + 2.5} rx={h * 0.45} ry={Math.max(3, h * 0.07)} fill="rgba(0,0,0,0.6)" />
      {active && (
        <ellipse cx={x} cy={groundY - h * 0.45} rx={h * 0.5} ry={h * 0.55} fill="rgba(233, 198, 123, 0.12)" />
      )}
      <g transform={`translate(${x}, ${groundY - h}) scale(${s})`}>
        <path
          d="M -26,18 C -36,20 -44,32 -42,50 C -42,65 -48,75 -44,80 C -40,84 -38,76 -36,65 L -32,98 C -32,100 -24,100 -24,98 L -22,66 L -14,66 L -16,98 C -16,100 -8,100 -8,98 L -6,64 C 6,64 16,64 22,68 L 20,98 C 20,100 28,100 28,98 L 30,68 L 36,98 C 36,100 44,100 44,98 L 42,58 C 42,38 30,22 10,20 C -4,18 -18,16 -26,18 Z"
          fill={active ? '#fbe6b0' : '#181524'}
          stroke={active ? '#e9c67b' : 'rgba(255,255,255,0.2)'}
          strokeWidth="1.2"
        />
        {/* Ivory Tusk */}
        <path d="M -36,46 C -44,52 -46,62 -40,65 C -42,58 -38,50 -32,46 Z" fill="#ffffff" />
      </g>
      <text x={x} y={groundY - h - 8} textAnchor="middle" fontSize={10} fill={active ? '#fbe6b0' : '#c3bdd2'} fontWeight={active ? 700 : 500}>
        {label}
      </text>
    </g>
  )
}
