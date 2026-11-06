import { Compass, HeartHandshake, Sparkles } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4 } from '../data/types'
import { FAITH, INTRO, PILLARS, QUESTIONS, type Point } from '../data/islam'
import { A, LevelChip, RefChip } from './ui'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

const UI = {
  kicker: t('For everyone', 'Pour tous', 'للجميع', 'Para todos'),
  title: t('What is Islam?', 'Qu’est-ce que l’islam ?', 'ما هو الإسلام؟', '¿Qué es el islam?'),
  lead: t(
    'A short, sourced introduction for readers who are not Muslim: what Muslims believe, what they do, and why. Every verse opens in the Qur’an, with a translation in your language.',
    'Une introduction courte et sourcée pour les lecteurs non musulmans : ce que croient les musulmans, ce qu’ils font, et pourquoi. Chaque verset s’ouvre dans le Coran, avec une traduction dans votre langue.',
    'مدخل قصير موثّق لغير المسلمين: ماذا يعتقد المسلمون، وماذا يفعلون، ولماذا. كل آية تُفتح في المصحف مع ترجمتها.',
    'Una introducción breve y con fuentes para lectores no musulmanes: qué creen los musulmanes, qué hacen y por qué. Cada versículo se abre en el Corán, con una traducción en tu idioma.',
  ),
  pillars: t('The five pillars', 'Les cinq piliers', 'أركان الإسلام الخمسة', 'Los cinco pilares'),
  pillarsLead: t('“Islam is built on five”, said the Prophet ﷺ. Each pillar, what it is, and why Muslims keep it.', '« L’islam est bâti sur cinq », a dit le Prophète ﷺ. Chaque pilier, ce qu’il est, et pourquoi les musulmans l’accomplissent.', '«بُني الإسلام على خمس». كل ركن: ما هو، ولماذا يحافظ عليه المسلمون.', '«El islam está construido sobre cinco», dijo el Profeta ﷺ. Cada pilar, qué es y por qué los musulmanes lo cumplen.'),
  what: t('What', 'Quoi', 'ما هو', 'Qué'),
  why: t('Why', 'Pourquoi', 'لماذا', 'Por qué'),
  faith: t('The six articles of faith', 'Les six piliers de la foi', 'أركان الإيمان الستة', 'Los seis artículos de fe'),
  faithLead: t('When the angel Jibril asked the Prophet ﷺ what faith is, he answered: to believe in', 'Quand l’ange Jibril demanda au Prophète ﷺ ce qu’est la foi, il répondit : croire en', 'لما سأل جبريل النبي ﷺ عن الإيمان قال: أن تؤمن بـ', 'Cuando el ángel Yibril preguntó al Profeta ﷺ qué es la fe, respondió: creer en'),
  ihsan: t('And excellence (ihsan)', 'Et l’excellence (ihsan)', 'والإحسان', 'Y la excelencia (ihsan)'),
  ihsanText: t(
    '“To worship Allah as though you see Him; and if you do not see Him, He sees you.”',
    '« Adorer Allah comme si tu Le voyais ; et si tu ne Le vois pas, Lui te voit. »',
    '«أن تعبد الله كأنك تراه، فإن لم تكن تراه فإنه يراك».',
    '«Adorar a Allah como si Lo vieras; y si no Lo ves, Él te ve».',
  ),
  questions: t('Common questions', 'Questions fréquentes', 'أسئلة شائعة', 'Preguntas frecuentes'),
  more: t('Keep reading', 'Pour aller plus loin', 'للمزيد', 'Para seguir'),
  moreTree: t('The prophets, from Adam to Muhammad ﷺ', 'Les prophètes, d’Adam à Muhammad ﷺ', 'الأنبياء من آدم إلى محمد ﷺ', 'Los profetas, de Adán a Muhammad ﷺ'),
  moreDuas: t('The Prophet’s supplications', 'Les invocations du Prophète', 'أدعية النبي ﷺ', 'Las súplicas del Profeta'),
  moreTimes: t('A Muslim’s day', 'La journée d’un musulman', 'يوم المسلم', 'El día de un musulmán'),
  note: t(
    'This page is an introduction, not a fatwa. To learn more, read a translation of the Qur’an or visit a local mosque: visitors are welcome.',
    'Cette page est une introduction, pas une fatwa. Pour en savoir plus, lisez une traduction du Coran ou visitez une mosquée près de chez vous : les visiteurs y sont bienvenus.',
    'هذه الصفحة مدخل تعريفي وليست فتوى. للاستزادة اقرأ ترجمة للقرآن أو زر مسجدًا قريبًا، فالزوار مرحّب بهم.',
    'Esta página es una introducción, no una fetua. Para saber más, lee una traducción del Corán o visita una mezquita cercana: los visitantes son bienvenidos.',
  ),
}

function Sourced({ p }: { p: Point }) {
  const { pick } = useI18n()
  return (
    <div className="glass rounded-3xl p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-ink">{pick(p.title)}</h3>
      <p className="mt-2 leading-relaxed text-ink-2">{pick(p.text)}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <LevelChip level={p.l} />
        {p.r.map((r) => <RefChip key={r} r={r} />)}
      </div>
    </div>
  )
}

export function IslamView() {
  const { pick } = useI18n()
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="reveal mx-auto mb-12 max-w-2xl text-center">
        <p className="kicker inline-flex items-center justify-center gap-2">
          <Compass aria-hidden="true" className="size-3.5" /> {pick(UI.kicker)}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          <span className="gold-text">{pick(UI.title)}</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink-2 sm:text-lg">{pick(UI.lead)}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {INTRO.map((p, i) => <Sourced key={i} p={p} />)}
      </div>

      <section className="mt-20" aria-labelledby="pillars">
        <h2 id="pillars" className="text-3xl font-semibold text-ink sm:text-4xl">{pick(UI.pillars)}</h2>
        <p className="mt-3 max-w-2xl text-ink-2">{pick(UI.pillarsLead)}</p>
        <ol className="mt-8 space-y-4">
          {PILLARS.map((p) => (
            <li key={p.id} className="grid gap-4 rounded-3xl border border-gold/20 bg-gold/[0.03] p-5 sm:grid-cols-[5rem_1fr] sm:p-7">
              <div className="flex items-center gap-3 sm:flex-col sm:items-start">
                <span className="grid size-12 place-items-center rounded-2xl bg-gold/15 text-xl font-semibold text-gold tabular-nums">{p.n}</span>
                <span lang="ar" className="font-naskh text-lg text-gold-2">{p.arabic}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-ink">{pick(p.name)}</h3>
                <dl className="mt-3 grid gap-3 md:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-3">{pick(UI.what)}</dt>
                    <dd className="mt-1 leading-relaxed text-ink-2">{pick(p.what)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-gold/80">{pick(UI.why)}</dt>
                    <dd className="mt-1 leading-relaxed text-ink-2">{pick(p.why)}</dd>
                  </div>
                </dl>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.r.map((r) => <RefChip key={r} r={r} />)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20" aria-labelledby="faith">
        <h2 id="faith" className="text-3xl font-semibold text-ink sm:text-4xl">{pick(UI.faith)}</h2>
        <p className="mt-3 max-w-2xl text-ink-2">{pick(UI.faithLead)}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FAITH.map((f, i) => (
            <li key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="font-semibold text-ink">{pick(f.name)}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{pick(f.text)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-3xl border border-lvl-hadith/30 bg-lvl-hadith/[0.05] p-5">
          <p className="flex items-center gap-2 font-semibold text-lvl-hadith">
            <Sparkles aria-hidden="true" className="size-4" /> {pick(UI.ihsan)}
          </p>
          <p className="mt-2 text-lg leading-relaxed text-ink">{pick(UI.ihsanText)}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <LevelChip level="hadith" />
            <RefChip r="muslim:8" />
            <RefChip r="bukhari:50" />
          </div>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="questions">
        <h2 id="questions" className="text-3xl font-semibold text-ink sm:text-4xl">{pick(UI.questions)}</h2>
        <div className="mt-6 grid gap-4">
          {QUESTIONS.map((q, i) => <Sourced key={i} p={q} />)}
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-white/10 p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-ink">
          <HeartHandshake aria-hidden="true" className="size-5 text-gold" /> {pick(UI.more)}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          <li><A href="/tree" className="ref">{pick(UI.moreTree)}</A></li>
          <li><A href="/duas" className="ref">{pick(UI.moreDuas)}</A></li>
          <li><A href="/times" className="ref">{pick(UI.moreTimes)}</A></li>
        </ul>
        <p className="mt-5 text-sm text-ink-3">{pick(UI.note)}</p>
      </section>
    </div>
  )
}
