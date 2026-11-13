import { Hourglass, Info } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4 } from '../data/types'
import { HOUR_CLOSE, HOUR_FRAME, HOUR_PARTS, type HourStep, type SignStatus } from '../data/hour'
import { DuaCard } from './DuasView'
import { A, LevelChip, RefChip } from './ui'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

const UI = {
  kicker: t('From the first creation to the last day', 'De la première création au dernier jour', 'من أول الخلق إلى آخر يوم', 'De la primera creación al último día'),
  title: t('The beginning and the end', 'Le commencement et la fin', 'البداية والنهاية', 'El comienzo y el fin'),
  lead: t(
    'How creation began, the signs the Prophet ﷺ gave of the Hour, and how the world ends, told only from the Qur’an and authentic hadith. Every quote is copied from its source and checked; where scholars differ, the page says so.',
    'Comment la création a commencé, les signes de l’Heure donnés par le Prophète ﷺ, et comment le monde finit, racontés uniquement d’après le Coran et les hadiths authentiques. Chaque citation est copiée de sa source et vérifiée ; quand les savants divergent, la page le dit.',
    'كيف بدأ الخلق، وما أخبر به النبي ﷺ من أشراط الساعة، وكيف ينتهي العالم، من القرآن والحديث الصحيح وحدهما. كل نص منقول من مصدره ومراجَع عليه، وحيث اختلف العلماء ذُكر الخلاف.',
    'Cómo comenzó la creación, los signos de la Hora que dio el Profeta ﷺ, y cómo termina el mundo, contados solo desde el Corán y los hadices auténticos. Cada cita está copiada de su fuente y verificada; donde los sabios difieren, la página lo dice.',
  ),
  differ: t('Where scholars differ', 'Divergence des savants', 'خلاف العلماء', 'Donde los sabios difieren'),
  close: t('What have you prepared for it?', 'Qu’as-tu préparé pour elle ?', 'ماذا أعددت لها؟', '¿Qué has preparado para ella?'),
  closeLead: t(
    'The Prophet ﷺ turned the question “when?” into the question that matters.',
    'Le Prophète ﷺ changea la question « quand ? » en la question qui compte.',
    'حوّل النبي ﷺ سؤال «متى؟» إلى السؤال الذي ينفع.',
    'El Profeta ﷺ convirtió la pregunta «¿cuándo?» en la pregunta que importa.',
  ),
  moreTree: t('The prophets, from Adam to Muhammad ﷺ', 'Les prophètes, d’Adam à Muhammad ﷺ', 'الأنبياء من آدم إلى محمد ﷺ', 'Los profetas, de Adán a Muhammad ﷺ'),
  moreDuas: t('The Prophet’s supplications', 'Les invocations du Prophète', 'أدعية النبي ﷺ', 'Las súplicas del Profeta'),
  note: t(
    'Only Allah knows when the Hour comes. Which signs have already happened is the scholars’ reading of history, not revelation.',
    'Seul Allah sait quand vient l’Heure. Quels signes se sont déjà produits relève de la lecture de l’histoire par les savants, non de la révélation.',
    'لا يعلم وقت الساعة إلا الله، وتحديد ما وقع من الأشراط قراءة العلماء للتاريخ، لا وحيٌ منزل.',
    'Solo Allah sabe cuándo llega la Hora. Qué signos ya ocurrieron es la lectura de la historia por los sabios, no revelación.',
  ),
}

const STATUS: Record<SignStatus, { label: L4; className: string }> = {
  past: { label: t('Has come to pass', 'S’est réalisé', 'وقع', 'Ya ocurrió'), className: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' },
  now: { label: t('Many scholars see it today', 'Beaucoup de savants le voient aujourd’hui', 'يراه كثير من العلماء اليوم', 'Muchos sabios lo ven hoy'), className: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
  future: { label: t('Still to come', 'Encore à venir', 'لم يقع بعد', 'Aún por venir'), className: 'border-sky-400/30 bg-sky-400/10 text-sky-300' },
}

function Step({ s, n }: { s: HourStep; n: number }) {
  const { pick, lang } = useI18n()
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  return (
    <li id={s.id} className="relative min-w-0 scroll-mt-24">
      <span aria-hidden="true" className="absolute -start-[2.05rem] top-0.5 grid size-5 place-items-center rounded-full bg-night-2 text-[0.65rem] font-semibold text-gold ring-1 ring-gold/50 sm:-start-[3.05rem]">
        {n}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold text-ink text-balance sm:text-xl">{pick(s.title)}</h3>
        {s.status && <span className={`rounded-full border px-2.5 py-0.5 text-xs ${STATUS[s.status].className}`}>{pick(STATUS[s.status].label)}</span>}
      </div>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-2 text-pretty" dir={dir}>
        {pick(s.text)}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <LevelChip level={s.l} />
        {s.r.map((r) => (
          <RefChip key={r} r={r} />
        ))}
      </div>
      {s.quotes && (
        <div className="mt-4 space-y-3">
          {s.quotes.map((d) => (
            <DuaCard key={d.id} d={d} compact />
          ))}
        </div>
      )}
      {s.note && (
        <aside className="mt-4 flex gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-ink-2" dir={dir}>
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
          <p>
            <span className="font-semibold text-ink">{pick(UI.differ)}. </span>
            {pick(s.note)}
          </p>
        </aside>
      )}
    </li>
  )
}

export function HourView() {
  const { pick } = useI18n()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="reveal mx-auto mb-10 max-w-2xl text-center">
        <p className="kicker inline-flex items-center justify-center gap-2">
          <Hourglass aria-hidden="true" className="size-3.5" /> {pick(UI.kicker)}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          <span className="gold-text">{pick(UI.title)}</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink-2">{pick(UI.lead)}</p>
      </header>

      <div className="mb-10">
        <DuaCard d={HOUR_FRAME} />
      </div>

      <nav aria-label={pick(UI.title)} className="mb-12 flex flex-wrap justify-center gap-2">
        {HOUR_PARTS.map((p, i) => (
          <a key={p.id} href={`#part-${p.id}`} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-ink-2 transition-colors hover:border-gold/40 hover:text-gold">
            <span className="me-1.5 font-semibold text-gold">{i + 1}</span>
            {pick(p.title)}
          </a>
        ))}
      </nav>

      {HOUR_PARTS.map((p, i) => (
        <section key={p.id} id={`part-${p.id}`} className="mb-16 scroll-mt-20">
          <p className="text-xs font-medium uppercase tracking-wider text-gold/80">{`${i + 1} / ${HOUR_PARTS.length}`}</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink text-balance sm:text-3xl">{pick(p.title)}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-2 text-pretty">{pick(p.lead)}</p>
          <ol className="relative mt-8 space-y-10 border-s border-gold/20 ps-6 sm:ps-10">
            {p.steps.map((s, j) => (
              <Step key={s.id} s={s} n={j + 1} />
            ))}
          </ol>
        </section>
      ))}

      <section className="glass rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-ink">{pick(UI.close)}</h2>
        <p className="mt-2 text-ink-2">{pick(UI.closeLead)}</p>
        <div className="mt-5">
          <DuaCard d={HOUR_CLOSE} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <A href="/tree" className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-night transition-transform hover:scale-[1.02] active:scale-[0.98]">
            {pick(UI.moreTree)}
          </A>
          <A href="/duas" className="rounded-full border border-gold/40 px-5 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/10">
            {pick(UI.moreDuas)}
          </A>
        </div>
      </section>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-ink-3">{pick(UI.note)}</p>
    </div>
  )
}
