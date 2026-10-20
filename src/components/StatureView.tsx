import { useState } from 'react'
import {
  ArrowDownUp,
  BookOpen,
  ExternalLink,
  Ruler,
  Sparkles,
} from 'lucide-react'
import { useI18n } from '../i18n'
import { STATURE_SCALE_DATA, PROPHETIC_DESCRIPTIONS } from '../data/stature'
import { A } from './ui'

export function StatureView() {
  const { pick, lang } = useI18n()
  const [selectedScaleId, setSelectedScaleId] = useState<string>('adam_primordial')
  const [selectedProphetId, setSelectedProphetId] = useState<string>('muhammad_desc')
  const [unit, setUnit] = useState<'metric' | 'imperial' | 'cubits'>('metric')

  const activeScale = STATURE_SCALE_DATA.find((s) => s.id === selectedScaleId) ?? STATURE_SCALE_DATA[0]!
  const activeDesc = PROPHETIC_DESCRIPTIONS.find((p) => p.id === selectedProphetId) ?? PROPHETIC_DESCRIPTIONS[0]!

  const formatHeight = (meters: number, cubits?: number) => {
    switch (unit) {
      case 'cubits':
        return cubits ? `${cubits} ${lang === 'ar' ? 'ذراعاً' : 'cubits'}` : `${(meters / 0.5).toFixed(1)} ${lang === 'ar' ? 'ذراعاً' : 'cubits'}`
      case 'imperial': {
        const totalInches = meters * 39.3701
        const feet = Math.floor(totalInches / 12)
        const inches = Math.round(totalInches % 12)
        return `${feet}′ ${inches}″ (${(meters * 3.28084).toFixed(1)} ft)`
      }
      case 'metric':
      default:
        return `${meters.toFixed(1)} m (${Math.round(meters * 100)} cm)`
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

      {/* Interactive Scale Comparison Visualizer */}
      <div className="grid gap-8 lg:grid-cols-12 mb-20">
        {/* Left: Interactive Vertical Height Bars */}
        <div className="glass rounded-3xl p-6 lg:col-span-7 flex flex-col justify-between">
          <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-3">
              {lang === 'ar' ? 'مخطط الارتفاع النسبي (نسبة إلى 30 متراً)' : 'Relative Height Chart (up to 30 meters)'}
            </span>
            <span className="text-xs font-mono text-gold-2">
              Max: 30.0m / 60 cubits
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
                    <span className="font-mono text-xs font-bold text-gold-2">
                      {formatHeight(item.heightMeters, item.heightCubits)}
                    </span>
                  </div>

                  {/* Meter Bar */}
                  <div className="h-3 w-full rounded-full bg-night/80 overflow-hidden border border-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
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
                {lang === 'ar' ? 'الارتفاع الموثق' : 'Attested Height'}
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
            <span>{lang === 'ar' ? 'مصدر معتمد في الصحيحين' : 'Sourced from Sahih Collections'}</span>
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
