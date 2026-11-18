import { ArrowDown, BookMarked, HelpCircle, Landmark, ListChecks, ScrollText, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { useI18n } from '../i18n'
import type { L4 } from '../data/types'
import { CHAIN, CHAIN_TEXT, COMPARE, COMPARE_REFS, CONDITIONS, GRADES, OBJECTIONS, SAFEGUARDS, TIMELINE, type HsPoint } from '../data/hadithScience'
import { DuaCard } from './DuasView'
import { A, LevelChip, q, RefChip } from './ui'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

const UI = {
  kicker: t('The Sunnah', 'La Sunna', 'السنة النبوية', 'La Sunna'),
  title: t('How the hadith were preserved', 'Comment les hadiths ont été préservés', 'كيف حُفظ الحديث النبوي', 'Cómo se preservaron los hadices'),
  lead: t(
    'Who carried the Prophet’s words, how they were written down, how each report was tested, and why inventing one without being caught was so hard. Written for anyone who wants to check the method, Muslim or not.',
    'Qui a porté les paroles du Prophète, comment elles ont été écrites, comment chaque récit a été vérifié, et pourquoi en inventer un sans être démasqué était si difficile. Écrit pour quiconque veut vérifier la méthode, musulman ou non.',
    'من حمل كلام النبي ﷺ، وكيف دُوّن، وكيف فُحص كل حديث، ولماذا كان وضع حديث دون أن ينكشف صعبًا جدًّا. لكل من أراد أن يتحقق من المنهج، مسلمًا كان أو غير مسلم.',
    'Quién transmitió las palabras del Profeta, cómo se pusieron por escrito, cómo se comprobó cada relato y por qué era tan difícil inventar uno sin ser descubierto. Para cualquiera que quiera comprobar el método, musulmán o no.',
  ),
  jump: t('On this page', 'Sur cette page', 'في هذه الصفحة', 'En esta página'),
  what: t('What a hadith is', 'Ce qu’est un hadith', 'ما هو الحديث', 'Qué es un hadiz'),
  whatLead: t(
    'Every hadith has two parts: the chain of the people who passed it on (isnad) and the text itself (matn). Here is the first hadith of Sahih al-Bukhari.',
    'Tout hadith a deux parties : la chaîne des personnes qui l’ont transmis (isnad) et le texte lui-même (matn). Voici le premier hadith du Sahih d’al-Bukhari.',
    'لكل حديث جزآن: الإسناد، وهو سلسلة من نقلوه، والمتن، وهو النص نفسه. وهذا أول حديث في صحيح البخاري.',
    'Todo hadiz tiene dos partes: la cadena de quienes lo transmitieron (isnad) y el texto mismo (matn). Este es el primer hadiz del Sahih de al-Bujari.',
  ),
  isnad: t('The chain (isnad)', 'La chaîne (isnad)', 'الإسناد', 'La cadena (isnad)'),
  matn: t('The text (matn)', 'Le texte (matn)', 'المتن', 'El texto (matn)'),
  chainNote: t(
    'Each person heard it from the one above him. The books of narrators record where each lived, when he died and whom he met, so every link can be checked. The first links are single: only ‘Umar, then ‘Alqamah, then al-Taymi. Scholars accepted it because each of them is known for his precision; from Yahya ibn Sa‘id onward, many narrated it, so the later copies can be compared.',
    'Chacun l’a entendu de celui qui est au-dessus de lui. Les livres des transmetteurs notent où chacun vivait, quand il est mort et qui il a rencontré, afin que chaque maillon puisse être vérifié. Les premiers maillons sont uniques : seulement ‘Umar, puis ‘Alqama, puis at-Taymi. Les savants l’ont accepté parce que chacun est connu pour sa précision ; à partir de Yahya ibn Sa‘id, beaucoup l’ont transmis, et les copies postérieures peuvent être comparées.',
    'سمعه كل راوٍ ممن فوقه، وتذكر كتب الرجال بلد كل واحد ووفاته ومن لقي، فيمكن فحص كل حلقة. وأول السند فرد: عمر ثم علقمة ثم التيمي، وقبله العلماء لأن كلًّا منهم معروف بالضبط والإتقان، ثم رواه عن يحيى بن سعيد خلق كثير فأمكنت مقابلة الروايات.',
    'Cada uno lo oyó del que está encima. Los libros de transmisores registran dónde vivió cada uno, cuándo murió y a quién conoció, de modo que cada eslabón puede comprobarse. Los primeros eslabones son únicos: solo ‘Umar, luego ‘Alqama, luego at-Taymi. Los sabios lo aceptaron porque cada uno es conocido por su precisión; desde Yahya ibn Sa‘id lo transmitieron muchos, y las copias posteriores pueden compararse.',
  ),
  history: t('How the hadith were collected', 'Comment les hadiths ont été rassemblés', 'كيف جُمع الحديث', 'Cómo se reunieron los hadices'),
  historyLead: t('From the Prophet’s lifetime to the great collections and the books on narrators.', 'Du vivant du Prophète aux grands recueils et aux livres sur les transmetteurs.', 'من حياة النبي ﷺ إلى دواوين السنة وكتب الرجال.', 'De la vida del Profeta a las grandes colecciones y los libros sobre los transmisores.'),
  tests: t('How a hadith is tested', 'Comment un hadith est vérifié', 'كيف يُفحص الحديث', 'Cómo se comprueba un hadiz'),
  testsLead: t('A report is called authentic (sahih) only when it passes five tests.', 'Un récit n’est dit authentique (sahih) que s’il passe cinq tests.', 'لا يُسمّى الحديث صحيحًا إلا إذا اجتاز خمسة شروط.', 'Un relato solo se llama auténtico (sahih) si pasa cinco pruebas.'),
  grades: t('The grades', 'Les degrés', 'درجات الحديث', 'Los grados'),
  safe: t('Why forging a hadith was hard', 'Pourquoi forger un hadith était difficile', 'لماذا كان الوضع صعبًا', 'Por qué era difícil falsificar un hadiz'),
  safeLead: t('Lies were attempted. These are the reasons they were found out, and the reasons honest mistakes were caught.', 'Des mensonges ont été tentés. Voici pourquoi ils ont été démasqués, et pourquoi les erreurs de bonne foi ont été repérées.', 'وقعت محاولات للكذب، وهذه أسباب انكشافها، وأسباب ظهور الخطأ غير المقصود.', 'Hubo intentos de mentir. Estas son las razones por las que se descubrieron, y por las que se detectaron los errores de buena fe.'),
  compare: t('The Qur’an and the hadith', 'Le Coran et le hadith', 'القرآن والحديث', 'El Corán y el hadiz'),
  compareLead: t(
    'Muslims believe God promised to preserve His revelation, and that the Prophet ﷺ was sent to explain it. But the two were not passed on the same way, and Muslim scholars never claimed they were.',
    'Les musulmans croient que Dieu a promis de préserver Sa révélation, et que le Prophète ﷺ a été envoyé pour l’expliquer. Mais les deux n’ont pas été transmis de la même manière, et les savants musulmans ne l’ont jamais prétendu.',
    'يؤمن المسلمون بأن الله تكفّل بحفظ الذكر، وأن النبي ﷺ بُعث ليبيّنه. لكن القرآن والحديث لم يُنقلا بطريقة واحدة، ولم يدّعِ العلماء ذلك.',
    'Los musulmanes creen que Dios prometió preservar Su revelación y que el Profeta ﷺ fue enviado para explicarla. Pero ambos no se transmitieron del mismo modo, y los sabios musulmanes nunca lo afirmaron.',
  ),
  quran: t('Qur’an', 'Coran', 'القرآن', 'Corán'),
  hadith: t('Hadith', 'Hadith', 'الحديث', 'Hadiz'),
  objections: t('Common objections', 'Objections fréquentes', 'اعتراضات شائعة', 'Objeciones frecuentes'),
  close: t(
    'This page explains a method; it does not ask anyone to accept a report without checking it. Every hadith on this site shows its source and, outside al-Bukhari and Muslim, its grade.',
    'Cette page explique une méthode ; elle ne demande à personne d’accepter un récit sans le vérifier. Chaque hadith de ce site indique sa source et, hors al-Bukhari et Muslim, son degré.',
    'تشرح هذه الصفحة منهجًا، ولا تطلب من أحد قبول خبر دون تثبّت. وكل حديث في هذا الموقع يذكر مصدره، ويذكر حكمه إن كان في غير الصحيحين.',
    'Esta página explica un método; no pide a nadie aceptar un relato sin comprobarlo. Cada hadiz de este sitio indica su fuente y, fuera de al-Bujari y Muslim, su grado.',
  ),
  islam: t('What is Islam?', 'Qu’est-ce que l’islam ?', 'ما هو الإسلام؟', '¿Qué es el islam?'),
  sources: t('Sources of this site', 'Sources de ce site', 'مصادر الموقع', 'Fuentes de este sitio'),
}

const JUMP: { id: string; label: L4 }[] = [
  { id: 'what', label: UI.what },
  { id: 'history', label: UI.history },
  { id: 'tests', label: UI.tests },
  { id: 'safe', label: UI.safe },
  { id: 'compare', label: UI.compare },
  { id: 'objections', label: UI.objections },
]

function Section({ id, icon, title, lead, children }: { id: string; icon: ReactNode; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mt-20 scroll-mt-24">
      <h2 id={`${id}-h`} className="flex items-center gap-2 text-2xl font-semibold text-ink text-balance sm:text-3xl">
        <span className="text-gold">{icon}</span> {title}
      </h2>
      {lead && <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-ink-2">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  )
}

function Refs({ p }: { p: Pick<HsPoint, 'l' | 'r'> }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      <LevelChip level={p.l} />
      {p.r.map((r) => (
        <RefChip key={r} r={r} />
      ))}
    </div>
  )
}

function Card({ p, n }: { p: HsPoint; n?: number }) {
  const { pick } = useI18n()
  return (
    <div className="glass min-w-0 rounded-3xl p-5 sm:p-6">
      <h3 className="flex items-start gap-3 text-lg font-semibold text-ink text-balance">
        {n !== undefined && <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold/15 text-sm text-gold tabular-nums">{n}</span>}
        <span>{q(pick(p.title))}</span>
      </h3>
      <p className="mt-2 leading-relaxed text-pretty text-ink-2">{q(pick(p.text))}</p>
      <Refs p={p} />
      {p.quotes && (
        <div className="mt-4 space-y-3">
          {p.quotes.map((d) => (
            <DuaCard key={d.id} d={d} compact />
          ))}
        </div>
      )}
    </div>
  )
}

export function HadithView() {
  const { pick, lang } = useI18n()
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="reveal mx-auto mb-10 max-w-2xl text-center">
        <p className="kicker inline-flex items-center justify-center gap-2">
          <ScrollText aria-hidden="true" className="size-3.5" /> {pick(UI.kicker)}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          <span className="gold-text">{pick(UI.title)}</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink-2 sm:text-lg">{pick(UI.lead)}</p>
      </header>

      <nav aria-label={pick(UI.jump)} className="flex flex-wrap justify-center gap-2">
        {JUMP.map((j) => (
          <a key={j.id} href={`#${j.id}`} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-ink-2 transition-colors hover:border-gold/40 hover:text-ink">
            {pick(j.label)}
          </a>
        ))}
      </nav>

      <Section id="what" icon={<BookMarked aria-hidden="true" className="size-6" />} title={pick(UI.what)} lead={pick(UI.whatLead)}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div className="glass rounded-3xl p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">{pick(UI.isnad)}</p>
            <ol className="mt-4 space-y-1">
              {CHAIN.map((c, i) => (
                <li key={i} className="flex flex-col items-center text-center">
                  <div className={`w-full rounded-2xl border px-4 py-2.5 ${i === 0 ? 'border-gold/50 bg-gold/10' : 'border-white/10 bg-white/[0.03]'}`}>
                    <p className={`font-semibold ${i === 0 ? 'text-gold-2' : 'text-ink'}`}>{pick(c.name)}</p>
                    <p className="mt-0.5 text-xs text-ink-3 text-pretty">{pick(c.note)}</p>
                  </div>
                  {i < CHAIN.length - 1 && <ArrowDown aria-hidden="true" className="my-1 size-4 text-gold/60" />}
                </li>
              ))}
            </ol>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">{pick(UI.matn)}</p>
            <div className="mt-4">
              <DuaCard d={CHAIN_TEXT} />
            </div>
            <p className="mt-5 leading-relaxed text-pretty text-ink-2">{pick(UI.chainNote)}</p>
          </div>
        </div>
      </Section>

      <Section id="history" icon={<Landmark aria-hidden="true" className="size-6" />} title={pick(UI.history)} lead={pick(UI.historyLead)}>
        <ol className="relative space-y-10 border-s border-gold/20 ps-6 sm:ps-10">
          {TIMELINE.map((p) => (
            <li key={p.id} className="relative">
              <span aria-hidden="true" className="absolute -start-[1.95rem] top-1.5 size-3 rounded-full bg-gold shadow-[0_0_12px_rgba(233,198,123,0.7)] sm:-start-[2.95rem]" />
              <p className="text-xs font-medium uppercase tracking-wider text-gold/80">{pick(p.when)}</p>
              <h3 className="mt-1 text-xl font-semibold text-ink text-balance">{q(pick(p.title))}</h3>
              <p className="mt-2 max-w-3xl leading-relaxed text-pretty text-ink-2" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {q(pick(p.text))}
              </p>
              <Refs p={p} />
              {p.quotes && (
                <div className="mt-4 grid gap-3">
                  {p.quotes.map((d) => (
                    <DuaCard key={d.id} d={d} compact />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="tests" icon={<ListChecks aria-hidden="true" className="size-6" />} title={pick(UI.tests)} lead={pick(UI.testsLead)}>
        <div className="grid gap-4 sm:grid-cols-2">
          {CONDITIONS.map((p, i) => (
            <Card key={p.id} p={p} n={i + 1} />
          ))}
        </div>
        <h3 className="mt-10 text-xl font-semibold text-ink">{pick(UI.grades)}</h3>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GRADES.map((g, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <dt className="font-semibold text-gold-2">{pick(g.name)}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-pretty text-ink-2">{pick(g.text)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="safe" icon={<ShieldCheck aria-hidden="true" className="size-6" />} title={pick(UI.safe)} lead={pick(UI.safeLead)}>
        <div className="grid gap-4 md:grid-cols-2">
          {SAFEGUARDS.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </Section>

      <Section id="compare" icon={<BookMarked aria-hidden="true" className="size-6" />} title={pick(UI.compare)} lead={pick(UI.compareLead)}>
        <div className="space-y-3">
          {COMPARE.map((c, i) => (
            <div key={i} className="grid gap-3 rounded-3xl border border-white/10 p-4 sm:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1fr)] sm:p-5">
              <p className="font-semibold text-gold">{pick(c.topic)}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">{pick(UI.quran)}</p>
                <p className="mt-1 text-sm leading-relaxed text-pretty text-ink-2">{pick(c.quran)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">{pick(UI.hadith)}</p>
                <p className="mt-1 text-sm leading-relaxed text-pretty text-ink-2">{pick(c.hadith)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {COMPARE_REFS.map((r) => (
            <RefChip key={r} r={r} />
          ))}
        </div>
      </Section>

      <Section id="objections" icon={<HelpCircle aria-hidden="true" className="size-6" />} title={pick(UI.objections)}>
        <div className="grid gap-4">
          {OBJECTIONS.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </Section>

      <aside className="mt-16 rounded-3xl border border-gold/25 bg-gold/[0.04] p-6 sm:p-8">
        <p className="leading-relaxed text-pretty text-ink-2">{pick(UI.close)}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          <li>
            <A href="/islam" className="ref">{pick(UI.islam)}</A>
          </li>
          <li>
            <A href="/sources" className="ref">{pick(UI.sources)}</A>
          </li>
        </ul>
      </aside>
    </div>
  )
}
