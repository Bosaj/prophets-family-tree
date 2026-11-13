import { useState, useMemo } from 'react'
import {
  BookOpen,
  CheckCircle2,
  Layers,
  Lightbulb,
  Search,
  Users,
} from 'lucide-react'
import { useI18n, tx } from '../i18n'
import {
  SALIHIN_DATA,
  QURANIC_STORIES,
} from '../data/salihin'
import { LevelChip, RefChip, WithQuran, useOpenVerse } from './ui'
import { SALIHIN_STEPS } from '../data/salihinDetail'
import type { L4 } from '../data/types'

const STEPS_TITLE: L4 = { en: 'The story, step by step', fr: 'L’histoire, pas à pas', ar: 'القصة خطوة خطوة', es: 'La historia, paso a paso' }

export function SalihinView() {
  const { t, pick, lang } = useI18n()
  const openVerse = useOpenVerse()

  const [activeTab, setActiveTab] = useState<'salihin' | 'stories'>('salihin')
  const [salihinCategory, setSalihinCategory] = useState<string>('all')
  const [storyTheme, setStoryTheme] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [selectedFigureId, setSelectedFigureId] = useState<string | null>(null)
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)

  const CATEGORIES: { id: string; label: Record<string, string> }[] = [
    { id: 'all', label: { en: 'All Righteous', fr: 'Tous les vertueux', ar: 'جميع الصالحين' } },
    { id: 'women_of_faith', label: { en: 'Women of Faith', fr: 'Femmes de foi', ar: 'نساء مؤمنات' } },
    { id: 'sages_and_rulers', label: { en: 'Sages & Just Kings', fr: 'Sages et Rois justes', ar: 'حكماء وملوك عادلون' } },
    { id: 'believers_under_trials', label: { en: 'Heroes under Trials', fr: 'Éprouvés héroïques', ar: 'أبطال الثبات على الدين' } },
    { id: 'companions', label: { en: 'Righteous Companions', fr: 'Compagnons dévoués', ar: 'أصحاب وتلاميذ' } },
  ]

  const THEMES: { id: string; label: Record<string, string> }[] = [
    { id: 'all', label: { en: 'All Stories', fr: 'Tous les récits', ar: 'جميع القصص' } },
    { id: 'faith_vs_tyranny', label: { en: 'Faith vs Tyranny', fr: 'Foi contre tyrannie', ar: 'الإيمان في وجه الطغيان' } },
    { id: 'wisdom_and_counsel', label: { en: 'Wisdom & Counsel', fr: 'Sagesse et conseil', ar: 'الحكمة والموعظة' } },
    { id: 'warnings_and_retribution', label: { en: 'Warnings & Lessons', fr: 'Avertissements et leçons', ar: 'العبر والوعيد' } },
    { id: 'covenants', label: { en: 'Divine Covenants', fr: 'Alliances divines', ar: 'العهود والمواثيق' } },
  ]

  const filteredSalihin = useMemo(() => {
    return SALIHIN_DATA.filter((item) => {
      if (salihinCategory !== 'all' && item.category !== salihinCategory) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        item.name.en.toLowerCase().includes(q) ||
        item.name.fr.toLowerCase().includes(q) ||
        item.name.ar.includes(q) ||
        item.title.en.toLowerCase().includes(q) ||
        item.summary.en.toLowerCase().includes(q)
      )
    })
  }, [salihinCategory, query])

  const filteredStories = useMemo(() => {
    return QURANIC_STORIES.filter((item) => {
      if (storyTheme !== 'all' && item.theme !== storyTheme) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        item.title.en.toLowerCase().includes(q) ||
        item.title.fr.toLowerCase().includes(q) ||
        item.title.ar.includes(q) ||
        item.summary.en.toLowerCase().includes(q)
      )
    })
  }, [storyTheme, query])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="reveal text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold">
          <BookOpen className="size-3.5" />
          <span>{tx(lang, 'Quranic Stories & The Righteous', 'Récits du Coran & Les Vertueux', 'قصص القرآن والصالحون', 'Relatos coránicos y los justos')}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          <span className="ar-name gold-text block mb-2">{tx(lang, 'The Righteous & Great Stories of the Qur’an', 'Les justes et les grands récits du Coran', 'أعلام الصالحين وعبر قصص التنزيل', 'Los justos y los grandes relatos del Corán')}</span>
          <span className="text-xl sm:text-2xl font-light text-ink-2">
            {tx(lang, 'The virtuous men, women, and parabolic narratives preserved across the Holy Scripture', 'Les hommes et femmes vertueux ainsi que les grands récits immortalisés dans le Coran', 'سير الصالحين والصالحات وقصص الأمم السابقة المذكورة في محكم التنزيل', 'Hombres y mujeres virtuosos y relatos ejemplares conservados en el Libro sagrado')}
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-ink-3 leading-relaxed">
          <WithQuran text={tx(lang, '"There was certainly in their stories a lesson for those of understanding." (Qur’an 12:111). Discover timeless models of faith, wisdom, and moral courage.', '« Il y a dans leurs récits une leçon pour les gens doués d’intelligence. » (Coran 12:111). Explorez les modèles de foi, de sagesse et de courage.', 'قال الله تعالى: ﴿لَقَدْ كَانَ فِي قَصَصِهِمْ عِبْرَةٌ لِّأُولِي الْأَلْبَابِ﴾. استكشف مواقف الإيمان الراسخ والحكمة الربانية والعبر التاريخية الخالدة.', '«En sus relatos hay una lección para los dotados de entendimiento» (Corán 12:111). Descubre modelos de fe, sabiduría y valentía moral.')} />
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div className="glass flex max-w-full items-center p-1.5 rounded-3xl sm:rounded-full border border-gold/30 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setActiveTab('salihin')
              setQuery('')
            }}
            className={`flex min-w-0 items-center gap-2 rounded-full px-3 py-2.5 text-xs sm:px-5 sm:text-sm text-start font-semibold transition-all ${
              activeTab === 'salihin'
                ? 'bg-gold text-night shadow-[0_0_15px_rgba(233,198,123,0.5)]'
                : 'text-ink-2 hover:text-ink'
            }`}
          >
            <Users className="size-4" />
            <span>{tx(lang, 'The Righteous (As-Salihin)', 'Les Vertueux (As-Salihin)', 'الصالحون في القرآن', 'Los justos (as-Salihin)')}</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-mono">{SALIHIN_DATA.length}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('stories')
              setQuery('')
            }}
            className={`flex min-w-0 items-center gap-2 rounded-full px-3 py-2.5 text-xs sm:px-5 sm:text-sm text-start font-semibold transition-all ${
              activeTab === 'stories'
                ? 'bg-gold text-night shadow-[0_0_15px_rgba(233,198,123,0.5)]'
                : 'text-ink-2 hover:text-ink'
            }`}
          >
            <Layers className="size-4" />
            <span>{tx(lang, 'Stories of the Qur’an', 'Récits du Coran', 'قصص القرآن وعبره', 'Relatos del Corán')}</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-mono">{QURANIC_STORIES.length}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Category / Theme Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {activeTab === 'salihin'
            ? CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSalihinCategory(cat.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    salihinCategory === cat.id
                      ? 'bg-gold/25 font-semibold text-gold-2 border border-gold/40'
                      : 'glass text-ink-3 hover:text-ink'
                  }`}
                >
                  {cat.label[lang] || cat.label.en}
                </button>
              ))
            : THEMES.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setStoryTheme(th.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    storyTheme === th.id
                      ? 'bg-gold/25 font-semibold text-gold-2 border border-gold/40'
                      : 'glass text-ink-3 hover:text-ink'
                  }`}
                >
                  {th.label[lang] || th.label.en}
                </button>
              ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="size-4 absolute start-3 top-1/2 -translate-y-1/2 text-ink-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tx(lang, 'Search names, stories, verses...', 'Rechercher noms, récits, versets…', 'ابحث في الأسماء والقصص...', 'Buscar nombres, relatos, versículos…')}
            className="w-full rounded-full border border-white/10 bg-night-surface/60 ps-9 pe-4 py-2 text-xs text-ink placeholder:text-ink-3 focus:border-gold/50 focus:outline-none"
          />
        </div>
      </div>

      {/* AS-SALIHIN GRID */}
      {activeTab === 'salihin' && (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredSalihin.map((fig) => {
            const isExpanded = selectedFigureId === fig.id
            return (
              <div
                key={fig.id}
                className={`glass rounded-3xl p-6 sm:p-7 transition-all duration-300 border ${
                  isExpanded ? 'border-gold/60 shadow-[0_0_30px_rgba(233,198,123,0.15)]' : 'hover:border-gold/30'
                }`}
              >
                {/* Header: Key Virtue chip & Era badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="chip text-gold text-xs leading-normal whitespace-normal text-start max-w-full">{pick(fig.keyVirtue)}</span>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[0.7rem] text-ink-3 font-mono shrink-0">
                    {pick(fig.era)}
                  </span>
                </div>

                <div className="mt-3.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-ink leading-tight flex flex-wrap items-baseline gap-2">
                    <span className="ar-name gold-text text-2xl sm:text-3xl">{fig.name.ar}</span>
                    {lang !== 'ar' && <span className="text-base sm:text-lg font-light text-ink-2">· {pick(fig.name)}</span>}
                  </h3>
                  <p className="mt-1 text-xs text-gold-2 font-medium">{pick(fig.title)}</p>
                </div>

                <p className="mt-4 text-sm text-ink-2 leading-relaxed">
                  {pick(fig.summary)}
                </p>

                {/* Verses references */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {fig.quranRefs.map((ref) => (
                    <button
                      key={ref}
                      type="button"
                      onClick={() => openVerse(ref)}
                      className="rounded-full bg-gold/15 border border-gold/30 px-2.5 py-0.5 text-xs font-mono text-gold hover:bg-gold/30 transition-colors"
                      title={t('readQuran')}
                    >
                      {ref}
                    </button>
                  ))}
                </div>

                {/* Expand Story Details */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setSelectedFigureId(isExpanded ? null : fig.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
                  >
                    <span>{isExpanded ? (tx(lang, 'Hide Detailed Story', 'Masquer le récit détaillé', 'إخفاء التفاصيل', 'Ocultar el relato detallado')) : (tx(lang, 'Read Full Story & Lessons', 'Lire le récit complet et ses leçons', 'قراءة القصة والعبر', 'Leer el relato completo y sus lecciones'))}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-4 reveal">
                      <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                        <h4 className="text-xs font-semibold text-gold uppercase mb-2">
                          {tx(lang, 'The Quranic Narrative', 'Le récit coranique', 'السياق والقصة القرآنية', 'El relato coránico')}
                        </h4>
                        <p className={`text-xs text-ink-2 leading-relaxed ${lang === 'ar' ? 'naskh text-sm' : ''}`}>
                          {pick(fig.story)}
                        </p>
                      </div>

                      {SALIHIN_STEPS[fig.id] && (
                        <div className="rounded-2xl border border-gold/20 bg-gold/[0.04] p-4">
                          <h4 className="text-xs font-semibold text-gold uppercase mb-3">{pick(STEPS_TITLE)}</h4>
                          <ol className="space-y-3">
                            {SALIHIN_STEPS[fig.id]!.map((step, i) => (
                              <li key={i} className="flex gap-3">
                                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold/15 text-[0.7rem] font-semibold text-gold tabular-nums">{i + 1}</span>
                                <div>
                                  <p className="text-sm leading-relaxed text-ink-2">{pick(step.text)}</p>
                                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                                    <LevelChip level={step.l} />
                                    {step.r.map((r) => <RefChip key={r} r={r} />)}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                        <h4 className="text-xs font-semibold text-gold uppercase mb-2 flex items-center gap-1.5">
                          <Lightbulb className="size-3.5" />
                          <span>{tx(lang, 'Core Lessons & Virtues', 'Leçons et vertus essentielles', 'الدروس والعبر المستفادة', 'Lecciones y virtudes esenciales')}</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-ink-2">
                          {fig.lessons.map((les, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="size-3.5 text-gold shrink-0 mt-0.5" />
                              <span>{pick(les)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* QURANIC STORIES GRID */}
      {activeTab === 'stories' && (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredStories.map((story) => {
            const isExpanded = selectedStoryId === story.id
            return (
              <div
                key={story.id}
                className={`glass rounded-3xl p-6 sm:p-7 transition-all duration-300 border ${
                  isExpanded ? 'border-gold/60 shadow-[0_0_30px_rgba(233,198,123,0.15)]' : 'hover:border-gold/30'
                }`}
              >
                {/* Header: Surah chip & Setting badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="chip text-gold text-xs leading-normal whitespace-normal text-start max-w-full">{pick(story.surahName)}</span>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[0.7rem] text-ink-3 font-mono shrink-0">
                    {pick(story.historicalSetting)}
                  </span>
                </div>

                <div className="mt-3.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-ink leading-tight flex flex-wrap items-baseline gap-2">
                    <span className="ar-name gold-text text-2xl sm:text-3xl">{story.title.ar}</span>
                    {lang !== 'ar' && <span className="text-base sm:text-lg font-light text-ink-2">· {pick(story.title)}</span>}
                  </h3>
                </div>

                <p className="mt-4 text-sm text-ink-2 leading-relaxed">
                  {pick(story.summary)}
                </p>

                {/* Verses references */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {story.verses.map((ref) => (
                    <button
                      key={ref}
                      type="button"
                      onClick={() => openVerse(ref)}
                      className="rounded-full bg-gold/15 border border-gold/30 px-2.5 py-0.5 text-xs font-mono text-gold hover:bg-gold/30 transition-colors"
                      title={t('readQuran')}
                    >
                      {ref}
                    </button>
                  ))}
                </div>

                {/* Expand Story Details */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setSelectedStoryId(isExpanded ? null : story.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
                  >
                    <span>{isExpanded ? (tx(lang, 'Hide Lessons', 'Masquer les leçons', 'إخفاء الدروس', 'Ocultar las lecciones')) : (tx(lang, 'Explore Core Lessons', 'Découvrir les leçons essentielles', 'استعراض الدروس المستفادة', 'Descubrir las lecciones esenciales'))}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-4 reveal">
                      <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                        <h4 className="text-xs font-semibold text-gold uppercase mb-2 flex items-center gap-1.5">
                          <Lightbulb className="size-3.5" />
                          <span>{tx(lang, 'Core Spiritual Lessons', 'Leçons spirituelles essentielles', 'العبر والدروس الخالدة', 'Lecciones espirituales esenciales')}</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-ink-2">
                          {story.coreLessons.map((les, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="size-3.5 text-gold shrink-0 mt-0.5" />
                              <span>{pick(les)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
