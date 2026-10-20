import { useMemo, useState } from 'react'
import { Calendar, ChevronDown, ChevronUp, Clock, Sparkles } from 'lucide-react'
import { useI18n } from '../i18n'
import { people } from '../data/people'
import type { Person } from '../data/types'
import { hrefOf } from '../lib/router'
import { A, LevelChip, Refs, Scene, SubName } from './ui'
import { formatDate } from '../lib/dates'

/** Statements in the Qur'an that fix the order between two prophets. */
const ANCHORS: Record<number, { ref: string; en: string; fr: string; ar: string }> = {
  4: { ref: '7:69', en: '‘Ad came after the people of Nuh.', fr: '‘Ad vint après le peuple de Nuh.', ar: 'جعل الله عادًا خلفاء من بعد قوم نوح.' },
  5: { ref: '7:74', en: 'Thamud came after ‘Ad.', fr: 'Thamud vint après ‘Ad.', ar: 'جعل الله ثمود خلفاء من بعد عاد.' },
  10: { ref: '40:34', en: 'Yusuf had come to Egypt before Musa.', fr: 'Yusuf était venu en Égypte avant Musa.', ar: 'جاء يوسف أهل مصر من قبل موسى.' },
  12: { ref: '2:246', en: 'The kingship of Dawud came after Musa.', fr: 'La royauté de Dawud vint après Musa.', ar: 'كان ملك داود من بعد موسى.' },
  18: { ref: '5:46', en: '‘Isa followed in the footsteps of the earlier prophets.', fr: '‘Isa suivit les traces des prophètes précédents.', ar: 'قفّى الله على آثارهم بعيسى ابن مريم.' },
  19: { ref: '33:40', en: 'Muhammad ﷺ is the last of the prophets.', fr: 'Muhammad ﷺ est le dernier des prophètes.', ar: 'محمد ﷺ خاتم النبيين.' },
}

type TimelineMode = 'dual' | 'hijri' | 'gregorian'

interface EraGroup {
  id: string
  title: { en: string; fr: string; ar: string }
  range: [number, number]
}

const ERAS: EraGroup[] = [
  { id: 'all', title: { en: 'All Eras', fr: 'Toutes les époques', ar: 'جميع العصور' }, range: [1, 19] },
  { id: 'dawn', title: { en: 'Dawn of Humankind', fr: 'L’aube de l’humanité', ar: 'فجر البشرية والطوفان' }, range: [1, 3] },
  { id: 'arab', title: { en: 'Ancient Arab Prophets', fr: 'Prophètes arabes anciens', ar: 'الأنبياء العرب القدماء' }, range: [4, 5] },
  { id: 'patriarchs', title: { en: 'The Patriarchal Era', fr: 'L’époque patriarcale', ar: 'عصر الخليل إبراهيم والآباء' }, range: [6, 10] },
  { id: 'mosaic', title: { en: 'Exodus & Prophethood', fr: 'L’Exode et l’Alliance', ar: 'عصر موسى والخروج' }, range: [11, 11] },
  { id: 'kingdom', title: { en: 'Kingdom of Israel', fr: 'Le Royaume d’Israël', ar: 'عصر الملوك وأنprophets بني إسرائيل' }, range: [12, 16] },
  { id: 'messianic', title: { en: 'The Messianic Dawn', fr: 'L’aube messianique', ar: 'عصر زكريا ويحيى وعيسى' }, range: [17, 18] },
  { id: 'final', title: { en: 'The Seal of Prophecy', fr: 'Le Sceau de la prophétie', ar: 'عصر الرسالة المحمدية الخاتمة' }, range: [19, 19] },
]

export function Timeline() {
  const { t, pick, lang } = useI18n()
  const [estimates, setEstimates] = useState(true)
  const [mode, setMode] = useState<TimelineMode>('dual')
  const [activeEra, setActiveEra] = useState<string>('all')

  const groups = useMemo(() => {
    const selectedEra = (ERAS.find((e) => e.id === activeEra) ?? ERAS[0])!
    const m = new Map<number, Person[]>()
    for (const p of people) {
      if (p.kind !== 'prophet') continue
      if (p.order < selectedEra.range[0] || p.order > selectedEra.range[1]) continue
      m.set(p.order, [...(m.get(p.order) ?? []), p])
    }
    return [...m.entries()].sort((a, b) => a[0] - b[0])
  }, [activeEra])

  return (
    <div className="mx-auto max-w-5xl px-4 pt-32 pb-24 sm:px-6 sm:pt-28">
      <header className="mx-auto max-w-2xl text-center">
        <p className="kicker">{t('timelineKicker')}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{t('timelineTitle')}</h1>
        <p className="mt-5 text-pretty text-ink-2 sm:text-lg">{t('timelineLead')}</p>

        {/* Dual Mode & Display Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="glass inline-flex items-center rounded-full p-1 text-xs">
            <button
              type="button"
              onClick={() => setMode('dual')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-medium transition-colors ${
                mode === 'dual' ? 'bg-gold/25 text-gold-2' : 'text-ink-3 hover:text-ink'
              }`}
            >
              <Clock className="size-3.5" aria-hidden="true" />
              <span>{t('timelineDual')}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('hijri')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-medium transition-colors ${
                mode === 'hijri' ? 'bg-gold/25 text-gold-2' : 'text-ink-3 hover:text-ink'
              }`}
            >
              <Calendar className="size-3.5" aria-hidden="true" />
              <span>{t('timelineHijri')}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('gregorian')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-medium transition-colors ${
                mode === 'gregorian' ? 'bg-gold/25 text-gold-2' : 'text-ink-3 hover:text-ink'
              }`}
            >
              <Calendar className="size-3.5" aria-hidden="true" />
              <span>{t('timelineGregorian')}</span>
            </button>
          </div>

          <label className="glass inline-flex cursor-pointer items-center gap-2.5 rounded-full px-4 py-2 text-xs">
            <input
              type="checkbox"
              checked={estimates}
              onChange={(e) => setEstimates(e.target.checked)}
              className="size-3.5 accent-[#e9c67b]"
            />
            <span>{t('showEstimates')}</span>
          </label>
        </div>

        {/* Era Navigation Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {ERAS.map((era) => (
            <button
              key={era.id}
              type="button"
              onClick={() => setActiveEra(era.id)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                activeEra === era.id
                  ? 'border border-gold/40 bg-gold/15 text-gold-2 font-medium'
                  : 'border border-white/5 bg-white/[0.02] text-ink-3 hover:text-ink hover:border-white/20'
              }`}
            >
              {era.title[lang]}
            </button>
          ))}
        </div>
      </header>

      <ol className="relative mt-16">
        <div aria-hidden="true" className="absolute inset-y-0 start-5 w-px -translate-x-1/2 rtl:translate-x-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent md:start-1/2 md:-translate-x-1/2 md:rtl:translate-x-1/2" />
        {groups.map(([order, group], gi) => {
          const anchor = ANCHORS[order]
          const side = gi % 2 === 0
          return (
            <li key={order} className="relative mb-12 ps-14 md:mb-16 md:ps-0">
              {anchor && (
                <div className="mb-8 flex md:justify-center relative z-20">
                  <div className="glass inline-flex max-w-lg flex-wrap items-center justify-center gap-2 rounded-2xl border border-gold/30 bg-night-surface/90 px-4 py-2 text-xs text-ink-2 shadow-lg backdrop-blur-md text-center">
                    <span className="font-semibold text-gold-2">{anchor[lang]}</span>
                    <Refs refs={[anchor.ref]} />
                  </div>
                </div>
              )}
              <div className="relative">
                <span aria-hidden="true" className="absolute -start-9 top-7 grid size-3.5 -translate-x-1/2 place-items-center rtl:translate-x-1/2 md:start-1/2 md:-translate-x-1/2 md:rtl:translate-x-1/2 z-10">
                  <span className="absolute size-3.5 rounded-full bg-gold shadow-[0_0_18px_4px_rgb(233_198_123/0.65)]" />
                  <span className="absolute size-4 animate-[pulse-ring_2.8s_ease-out_infinite] rounded-full border border-gold/70" />
                </span>
                <div className={`md:w-1/2 ${side ? 'md:pe-12' : 'md:ms-auto md:ps-12'}`}>
                  {group.length > 1 && <p className="mb-2 text-xs font-semibold text-gold">{t('contemporaries')}</p>}
                  <div className="grid gap-4">
                    {group.map((p) => (
                      <Card key={p.id} p={p} estimates={estimates} mode={mode} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="sr-only">{group.map((p) => pick(p.name)).join(', ')}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Card({ p, estimates, mode }: { p: Person; estimates: boolean; mode: TimelineMode }) {
  const { pick, t, lang } = useI18n()
  const [expanded, setExpanded] = useState(false)
  const showEra = p.era && (p.era.l !== 'disputed' || estimates || p.era.r?.some((r) => !r.startsWith('book:')))

  const hasDates = p.dates && (p.dates.hijriBorn || p.dates.gregorianBorn || p.dates.born)
  const hasEvents = p.events && p.events.length > 0

  return (
    <div className="glass group overflow-hidden rounded-3xl transition-colors hover:border-gold/40 shadow-lg">
      <A href={hrefOf({ name: 'person', id: p.id })} className="flex overflow-hidden">
        <div className="relative w-28 shrink-0 overflow-hidden sm:w-36">
          <Scene image={p.image} sizes="160px" className="h-full w-full transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-night/60 rtl:bg-gradient-to-l" />
        </div>
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-baseline justify-between gap-2">
            <p className="ar-name gold-text text-3xl font-bold">{p.name.ar}</p>
            {p.ululAzm && <span className="text-[0.65rem] text-gold">{t('ululBadge')}</span>}
          </div>
          <p className="text-sm text-ink">
            <SubName p={p} />
          </p>

          {/* Dual Timeline Dates */}
          {hasDates && p.dates && (
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-ink-2">
              {(mode === 'dual' || mode === 'hijri') && p.dates.hijriBorn && (
                <span className="rounded-md border border-gold/20 bg-gold/10 px-2 py-0.5 text-gold-2">
                  {formatDate(p.dates.hijriBorn, lang)}
                </span>
              )}
              {(mode === 'dual' || mode === 'gregorian') && p.dates.gregorianBorn && (
                <span className="rounded-md border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 text-sky-200">
                  {formatDate(p.dates.gregorianBorn, lang)}
                </span>
              )}
            </div>
          )}

          {p.sentTo && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-2">{pick(p.sentTo.t)}</p>}

          {showEra && p.era && (
            <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-ink-3">
              <span>{pick(p.era.t)}</span>
              <LevelChip level={p.era.l} />
            </p>
          )}
        </div>
      </A>

      {/* Expandable Life Events Section */}
      {hasEvents && p.events && (
        <div className="border-t border-white/5 bg-white/[0.02] px-4 py-2 text-xs">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex w-full items-center justify-between text-ink-3 hover:text-gold transition-colors py-1"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="size-3 text-gold" aria-hidden="true" />
              <span>{t('lifeEvents')}</span>
              <span className="text-[0.65rem] opacity-70">({p.events.length})</span>
            </span>
            {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>

          {expanded && (
            <ol className="mt-2 space-y-2 pb-2 pt-1 border-s-2 border-gold/20 ps-3 ms-1 text-ink-2">
              {p.events.map((ev) => (
                <li key={ev.id} className="relative">
                  <span className="absolute -start-[17px] top-1 size-2 rounded-full bg-gold" />
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-ink text-xs">{pick(ev.title)}</p>
                    <div className="flex items-center gap-1.5 shrink-0 font-mono text-[0.68rem]">
                      {ev.yearHijri && (
                        <span className="rounded bg-gold/10 px-1.5 py-0.5 text-gold-2">
                          {formatDate(ev.yearHijri, lang)}
                        </span>
                      )}
                      {ev.yearBceCe && (
                        <span className="rounded bg-sky-400/10 px-1.5 py-0.5 text-sky-200">
                          {formatDate(ev.yearBceCe, lang)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[0.75rem] text-ink-3 mt-0.5 leading-relaxed">{pick(ev.desc)}</p>
                  {ev.refs && (
                    <div className="mt-1">
                      <Refs refs={ev.refs} />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  )
}
