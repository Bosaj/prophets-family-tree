import { useState, useMemo } from 'react'
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
} from 'lucide-react'
import { useI18n } from '../i18n'
import {
  SAHABA_FIGURES,
  SAHABA_ERAS,
  type SahabaEra,
  type SahabaFigure,
} from '../data/sahaba'

export function SahabaTree({ focus }: { focus?: string }) {
  const { lang, pick } = useI18n()
  const [selectedEra, setSelectedEra] = useState<SahabaEra | 'all'>('all')
  const [query, setQuery] = useState('')
  const [activeFigure, setActiveFigure] = useState<SahabaFigure | null>(() => {
    if (focus) {
      return SAHABA_FIGURES.find((f) => f.id === focus) ?? null
    }
    return null
  })
  const [viewMode, setViewMode] = useState<'cards' | 'lineage'>('cards')

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-950/30 via-night-2 to-night-1 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -end-16 -top-16 size-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -start-16 -bottom-16 size-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3 shadow-sm">
              <Crown className="size-3.5 text-amber-400" />
              <span>
                {lang === 'ar'
                  ? 'سلسلة الخلافة الراشدة والأشراف وسلالات آل البيت المستمرة'
                  : 'Rightly Guided Caliphs, Companions & Living Sharifi Dynasties'}
              </span>
            </div>
            <h1 className="ar-name text-3xl sm:text-5xl font-extrabold tracking-tight text-ink mb-3 gold-text">
              {lang === 'ar'
                ? 'شجرة الصحابة والخلفاء وسلالات النبي ﷺ إلى اليوم'
                : lang === 'fr'
                ? 'Arbre des Sahaba, Califes et Descendance du Prophète ﷺ'
                : 'Tree of Sahaba, Caliphs & Prophetic Lineages to the Present'}
            </h1>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              {lang === 'ar'
                ? 'توثيق شامل وموثّق لنسب رسول الله ﷺ وأهل بيته الأطهار، والخلفاء الراشدين، والعشرة المبشرين بالجنة، والدول الإسلامية التاريخية (الأموية، العباسية، الأندلس، والعثمانية)، وصولاً إلى السلالات الحسنية المتصلة النسب الحاكمة اليوم (المملكة المغربية للملك محمد السادس والمملكة الأردنية للملك عبد الله الثاني).'
                : lang === 'fr'
                ? 'Documentation historique et généalogique depuis le Prophète ﷺ, les 5 Califes bien guidés, les califats historiques, jusqu’aux dynasties chérifiennes régnantes aujourd’hui (Maroc et Jordanie).'
                : 'Comprehensive genealogical documentation tracing from Prophet Muhammad ﷺ, the Rightly Guided Caliphs, the Ten Promised Paradise, and historic caliphates, down to the continuous Hasanid dynasties ruling today in Morocco (King Mohammed VI) and Jordan (King Abdullah II).'}
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex flex-row md:flex-col gap-3 shrink-0">
            <div className="glass rounded-2xl px-5 py-3 border border-emerald-500/20 text-center">
              <span className="block text-2xl font-bold font-mono text-emerald-400">14+</span>
              <span className="text-[0.7rem] text-ink-3">
                {lang === 'ar' ? 'قرناً من التاريخ' : 'Centuries'}
              </span>
            </div>
            <div className="glass rounded-2xl px-5 py-3 border border-amber-500/20 text-center">
              <span className="block text-2xl font-bold font-mono text-amber-300">100%</span>
              <span className="text-[0.7rem] text-ink-3">
                {lang === 'ar' ? 'نسب نبوي متصل' : 'Continuous Lineage'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Eras, Search & View Switcher */}
      <div className="mb-8 space-y-4">
        {/* Era Filters */}
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

        {/* Search & Layout Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'ابحث باسم الصحابي، اللقب، الخلافة أو الإنجاز...'
                  : 'Search by companion, caliph, era, or achievement...'
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
                onClick={() => setViewMode('cards')}
                className={`rounded-full px-3 py-1 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'cards' ? 'bg-emerald-500 text-night font-bold shadow-md' : 'text-ink-3 hover:text-ink'
                }`}
              >
                <Layers className="size-3.5" />
                <span>{lang === 'ar' ? 'بطاقات السير' : 'Biographical Cards'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('lineage')}
                className={`rounded-full px-3 py-1 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'lineage' ? 'bg-emerald-500 text-night font-bold shadow-md' : 'text-ink-3 hover:text-ink'
                }`}
              >
                <GitCommit className="size-3.5" />
                <span>{lang === 'ar' ? 'سلسلة النسب المتصلة' : 'Continuous Lineage Tree'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'cards' ? (
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
                      ) : fig.roleCategory === 'rashidun_caliph' ? (
                        '👑'
                      ) : fig.roleCategory === 'modern_monarch' ? (
                        '🇲🇦'
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

                {/* Reign / Life Dates Pill */}
                <div className="flex flex-wrap items-center gap-2 mb-3 text-[0.7rem] font-mono text-ink-3">
                  {fig.reignDates && (
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-emerald-300 flex items-center gap-1">
                      <Crown className="size-3 text-amber-400" />
                      <span>{fig.reignDates.ah} ({fig.reignDates.ce})</span>
                    </span>
                  )}
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-ink-3">
                    {fig.lifeDates.death.ah}
                  </span>
                </div>

                {/* Brief Biography Snippet */}
                <p className="text-xs text-ink-2 leading-relaxed line-clamp-3 mb-4">
                  {pick(fig.biography)}
                </p>
              </div>

              {/* Bottom Tags & Burial Location */}
              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[0.7rem] text-ink-3">
                <span className="flex items-center gap-1 truncate max-w-[65%]">
                  <MapPin className="size-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{pick(fig.burialPlace)}</span>
                </span>
                <span className="text-emerald-400 font-semibold group-hover:underline">
                  {lang === 'ar' ? 'التفاصيل والنسب ←' : 'Details & Lineage →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Continuous Lineage Tree View (Chronological Chain of Succession) */
        <div className="relative rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="ar-name text-xl font-bold text-ink gold-text">
                {lang === 'ar'
                  ? 'سلسلة النسب النبوي الشريف والخلافة الموصولة'
                  : 'Unbroken Chain of Prophetic Descent & Successive Caliphates'}
              </h2>
              <p className="text-xs text-ink-3">
                {lang === 'ar'
                  ? 'من النبي الخاتم ﷺ عبر السبطين الحسن والحسين، وحتى ملوك المغرب والأردن في العصر الحاضر'
                  : 'From Prophet Muhammad ﷺ through Al-Hasan and Al-Husayn to modern monarchs'}
              </p>
            </div>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-y-0 before:start-6 before:w-0.5 before:bg-gradient-to-b before:from-gold before:via-emerald-500 before:to-purple-500">
            {filteredFigures.map((fig, idx) => (
              <div
                key={fig.id}
                onClick={() => setActiveFigure(fig)}
                className="relative ps-14 group cursor-pointer"
              >
                {/* Node Dot */}
                <div
                  className="absolute start-3 top-3 -translate-x-1/2 size-7 rounded-full border-2 border-white/80 flex items-center justify-center text-[0.65rem] font-bold shadow-lg transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: fig.symbolColor,
                    color: '#fff',
                  }}
                >
                  {idx + 1}
                </div>

                {/* Lineage Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4.5 transition-all group-hover:border-emerald-500/50 group-hover:bg-white/[0.06]">
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
                    {fig.reignDates && (
                      <span className="font-mono text-xs text-amber-300 rounded-full bg-amber-500/10 px-2.5 py-0.5 border border-amber-500/20 w-fit">
                        {fig.reignDates.ah} · {fig.reignDates.ce}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-3 font-mono mb-2 line-clamp-1">
                    {pick(fig.title)}
                  </p>
                  <p className="text-xs text-emerald-300/90 leading-relaxed font-serif bg-emerald-950/20 rounded-xl p-2.5 border border-emerald-500/15">
                    <strong className="text-ink-2">{lang === 'ar' ? 'النسب الشريف: ' : 'Lineage: '}</strong>
                    {pick(fig.lineage)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Figure Modal / Slide-over Drawer */}
      {activeFigure && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveFigure(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-emerald-500/30 bg-night-1 p-6 sm:p-8 shadow-2xl text-ink"
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
                ) : activeFigure.roleCategory === 'rashidun_caliph' ? (
                  '👑'
                ) : activeFigure.roleCategory === 'modern_monarch' ? (
                  '🇲🇦'
                ) : (
                  '★'
                )}
              </div>
              <div>
                <h2 className="ar-name text-2xl font-bold text-ink gold-text flex items-center gap-2">
                  <span>{pick(activeFigure.name)}</span>
                  {activeFigure.honorific && (
                    <span className="text-xs font-normal text-emerald-400">
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
                    {activeFigure.lifeDates.death.ah}
                  </span>
                </div>
              </div>
            </div>

            {/* Noble Lineage Block */}
            <div className="mb-6 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1.5 uppercase tracking-wider">
                <GitCommit className="size-3.5" />
                <span>{lang === 'ar' ? 'سلسلة النسب الشريف' : 'Noble Lineage'}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-1 leading-relaxed font-serif">
                {pick(activeFigure.lineage)}
              </p>
              {activeFigure.mother && (
                <p className="text-xs text-ink-3 mt-2 border-t border-emerald-500/10 pt-2">
                  <strong className="text-ink-2">{lang === 'ar' ? 'الأم: ' : 'Mother: '}</strong>
                  {pick(activeFigure.mother)}
                </p>
              )}
            </div>

            {/* Biography */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2">
                {lang === 'ar' ? 'السيرة والتاريخ' : 'Biography & History'}
              </h4>
              <p className="text-sm text-ink-2 leading-relaxed">
                {pick(activeFigure.biography)}
              </p>
            </div>

            {/* Prophetic Hadith Praise (if any) */}
            {activeFigure.propheticPraise && (
              <div className="mb-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 p-4.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
                  <Sparkles className="size-3.5 text-amber-400" />
                  <span>
                    {lang === 'ar'
                      ? 'الثناء النبوي الشريف والحديث الصحيح'
                      : 'Prophetic Praise in Authentic Hadith'}
                  </span>
                </div>
                <p className="ar-name text-base font-medium text-amber-100 leading-relaxed mb-2 font-serif text-center sm:text-start">
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
