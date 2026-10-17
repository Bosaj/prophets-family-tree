import { useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { people } from '../data/people'
import type { Person } from '../data/types'
import { hrefOf } from '../lib/router'
import { A, LevelChip, Refs, Scene, SubName } from './ui'

/** Statements in the Qur'an that fix the order between two prophets. */
const ANCHORS: Record<number, { ref: string; en: string; fr: string; ar: string }> = {
  4: { ref: '7:69', en: '‘Ad came after the people of Nuh.', fr: '‘Ad vint après le peuple de Nuh.', ar: 'جعل الله عادًا خلفاء من بعد قوم نوح.' },
  5: { ref: '7:74', en: 'Thamud came after ‘Ad.', fr: 'Thamud vint après ‘Ad.', ar: 'جعل الله ثمود خلفاء من بعد عاد.' },
  10: { ref: '40:34', en: 'Yusuf had come to Egypt before Musa.', fr: 'Yusuf était venu en Égypte avant Musa.', ar: 'جاء يوسف أهل مصر من قبل موسى.' },
  12: { ref: '2:246', en: 'The kingship of Dawud came after Musa.', fr: 'La royauté de Dawud vint après Musa.', ar: 'كان ملك داود من بعد موسى.' },
  18: { ref: '5:46', en: '‘Isa followed in the footsteps of the earlier prophets.', fr: '‘Isa suivit les traces des prophètes précédents.', ar: 'قفّى الله على آثارهم بعيسى ابن مريم.' },
  19: { ref: '33:40', en: 'Muhammad ﷺ is the last of the prophets.', fr: 'Muhammad ﷺ est le dernier des prophètes.', ar: 'محمد ﷺ خاتم النبيين.' },
}

export function Timeline() {
  const { t, pick, lang } = useI18n()
  const [estimates, setEstimates] = useState(false)

  const groups = useMemo(() => {
    const m = new Map<number, Person[]>()
    for (const p of people) if (p.kind === 'prophet') m.set(p.order, [...(m.get(p.order) ?? []), p])
    return [...m.entries()].sort((a, b) => a[0] - b[0])
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-4 pt-32 pb-24 sm:px-6 sm:pt-28">
      <header className="mx-auto max-w-2xl text-center">
        <p className="kicker">{t('timelineKicker')}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{t('timelineTitle')}</h1>
        <p className="mt-5 text-pretty text-ink-2 sm:text-lg">{t('timelineLead')}</p>
        <label className="glass mt-7 inline-flex cursor-pointer items-center gap-3 rounded-full px-4 py-2 text-sm">
          <input type="checkbox" checked={estimates} onChange={(e) => setEstimates(e.target.checked)} className="size-4 accent-[#e9c67b]" />
          {t('showEstimates')}
        </label>
      </header>

      <ol className="relative mt-16">
        <div aria-hidden="true" className="absolute inset-y-0 start-5 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent md:start-1/2" />
        {groups.map(([order, group], gi) => {
          const anchor = ANCHORS[order]
          const side = gi % 2 === 0
          return (
            <li key={order} className="relative mb-10 ps-14 md:mb-14 md:ps-0">
              {anchor && (
                <div className="mb-6 flex md:justify-center">
                  <p className="glass inline-flex max-w-md flex-wrap items-center gap-2 rounded-2xl px-4 py-2 text-xs text-ink-2">
                    <span>{anchor[lang]}</span>
                    <Refs refs={[anchor.ref]} />
                  </p>
                </div>
              )}
              <span aria-hidden="true" className="absolute start-5 top-8 grid size-3 -translate-x-1/2 place-items-center rtl:translate-x-1/2 md:start-1/2">
                <span className="absolute size-3 rounded-full bg-gold shadow-[0_0_18px_4px_rgb(233_198_123/0.55)]" />
                <span className="absolute size-3 animate-[pulse-ring_2.8s_ease-out_infinite] rounded-full border border-gold" />
              </span>
              <div className={`md:w-1/2 ${side ? 'md:pe-12' : 'md:ms-auto md:ps-12'}`}>
                {group.length > 1 && <p className="mb-2 text-xs text-gold">{t('contemporaries')}</p>}
                <div className="grid gap-3">
                  {group.map((p) => (
                    <Card key={p.id} p={p} estimates={estimates} />
                  ))}
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

function Card({ p, estimates }: { p: Person; estimates: boolean }) {
  const { pick, t } = useI18n()
  const showEra = p.era && (p.era.l !== 'disputed' || estimates || p.era.r?.some((r) => !r.startsWith('book:')))
  return (
    <A href={hrefOf({ name: 'person', id: p.id })} className="glass group flex overflow-hidden rounded-3xl transition-colors hover:border-gold/40">
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
        {p.sentTo && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-2">{pick(p.sentTo.t)}</p>}
        {showEra && p.era && (
          <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-ink-3">
            <span>{pick(p.era.t)}</span>
            <LevelChip level={p.era.l} />
          </p>
        )}
      </div>
    </A>
  )
}
