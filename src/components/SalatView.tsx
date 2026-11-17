import type { ReactNode } from 'react'
import { BookOpen, Clock, Droplets, HandHeart, Info, ListChecks, Sparkles, Undo2, Users, Star } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4 } from '../data/types'
import { ADHKAR, PRAYERS } from '../data/awqat'
import { HOW_MODEL, HOW_STEPS, PRAYER_PLAN, SALAT_BEFORE, SALAT_WHAT, SUNNAH_STEPS, WUDU_STEPS, type Pose, type SalatStep } from '../data/salat'
import { JAMAA_STEPS, OTHER_PRAYERS, SAHW_STEPS } from '../data/salatMore'
import { DuaCard } from './DuasView'
import { Step } from './HourView'
import { A, LevelChip, q, RefChip } from './ui'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

const UI = {
  kicker: t('The pillar of the religion', 'Le pilier de la religion', 'عماد الدين', 'El pilar de la religión'),
  title: t('The prayer', 'La prière', 'الصلاة', 'La oración'),
  lead: t(
    'What the prayer is, what comes before it, the ablution, how to pray step by step, and the voluntary prayers of the Sunnah. Every step cites its verse or hadith; every hadith is copied from its source and checked.',
    'Ce qu’est la prière, ce qui la précède, les ablutions, comment prier pas à pas, et les prières surérogatoires de la Sunna. Chaque étape cite son verset ou son hadith ; chaque hadith est copié de sa source et vérifié.',
    'ما الصلاة، وما يسبقها، والوضوء، وصفة الصلاة خطوة خطوة، والسنن والنوافل. كل خطوة بدليلها من آية أو حديث، وكل حديث منقول من مصدره ومراجَع عليه.',
    'Qué es la oración, qué la precede, la ablución, cómo rezar paso a paso y las oraciones voluntarias de la Sunna. Cada paso cita su aleya o su hadiz; cada hadiz está copiado de su fuente y verificado.',
  ),
  what: t('What the prayer is', 'Ce qu’est la prière', 'ما الصلاة', 'Qué es la oración'),
  before: t('Before you pray', 'Avant de prier', 'قبل الصلاة', 'Antes de rezar'),
  beforeLead: t('The conditions without which the prayer is not valid.', 'Les conditions sans lesquelles la prière n’est pas valide.', 'شروط لا تصح الصلاة إلا بها.', 'Las condiciones sin las cuales la oración no es válida.'),
  wudu: t('The ablution (wudu), step by step', 'Les ablutions (wudu), pas à pas', 'الوضوء خطوة خطوة', 'La ablución (wudu), paso a paso'),
  wuduLead: t(
    'As Allah describes it in Surat al-Ma’idah and as the Companions showed it.',
    'Telles qu’Allah les décrit dans la sourate al-Ma’ida et telles que les Compagnons les ont montrées.',
    'كما وصفه الله في سورة المائدة وكما أراه الصحابة.',
    'Tal como Allah la describe en la sura al-Ma’ida y como la mostraron los Compañeros.',
  ),
  how: t('How to pray, step by step', 'Comment prier, pas à pas', 'صفة الصلاة خطوة خطوة', 'Cómo rezar, paso a paso'),
  howLead: t(
    'One rak‘ah is: standing and reciting, bowing, rising, prostrating, sitting, prostrating again. The table shows how the rak‘ahs of each prayer follow one another.',
    'Une rak‘a, c’est : debout et récitation, inclinaison, redressement, prosternation, position assise, nouvelle prosternation. Le tableau montre l’enchaînement des rak‘as de chaque prière.',
    'الركعة: قيام وقراءة، ثم ركوع، ثم رفع، ثم سجود، ثم جلوس، ثم سجود ثانٍ. ويبيّن الجدول ترتيب ركعات كل صلاة.',
    'Una rak‘a es: de pie y recitación, inclinación, incorporación, postración, sentado, segunda postración. La tabla muestra cómo se suceden las rak‘as de cada oración.',
  ),
  plan: t('The five prayers at a glance', 'Les cinq prières en un coup d’œil', 'الصلوات الخمس في لمحة', 'Las cinco oraciones de un vistazo'),
  prayer: t('Prayer', 'Prière', 'الصلاة', 'Oración'),
  rakah: t('Rak‘ah {n}', 'Rak‘a {n}', 'الركعة {n}', 'Rak‘a {n}'),
  fatihaSurah: t('al-Fatihah + surah', 'al-Fatiha + sourate', 'الفاتحة وسورة', 'al-Fátiha + sura'),
  fatihaOnly: t('al-Fatihah', 'al-Fatiha', 'الفاتحة', 'al-Fátiha'),
  aloud: t('aloud', 'à voix haute', 'جهرًا', 'en voz alta'),
  silent: t('silent', 'à voix basse', 'سرًّا', 'en silencio'),
  firstSit: t('first tashahhud', 'premier tachahhud', 'التشهد الأول', 'primer tashahhud'),
  lastSit: t('last tashahhud + salam', 'dernier tachahhud + salam', 'التشهد الأخير والتسليم', 'último tashahhud + salam'),
  sunnah: t('The voluntary prayers of the Sunnah', 'Les prières surérogatoires de la Sunna', 'السنن والنوافل', 'Las oraciones voluntarias de la Sunna'),
  sunnahLead: t(
    'Prayers the Prophet ﷺ kept or encouraged beyond the five; they complete what is missing in the obligatory ones.',
    'Des prières que le Prophète ﷺ accomplissait ou encourageait en plus des cinq ; elles complètent ce qui manque aux obligatoires.',
    'صلوات داوم عليها النبي ﷺ أو رغّب فيها زيادة على الخمس، ويُجبر بها نقص الفرائض.',
    'Oraciones que el Profeta ﷺ mantenía o animaba a rezar además de las cinco; completan lo que falta en las obligatorias.',
  ),
  after: t('After the prayer', 'Après la prière', 'بعد الصلاة', 'Después de la oración'),
  times: t('Prayer times for your place', 'Horaires de prière de votre lieu', 'مواقيت الصلاة في مكانك', 'Horarios de oración de tu lugar'),
  duas: t('More supplications', 'Plus d’invocations', 'المزيد من الأدعية', 'Más súplicas'),
  schools: t(
    'The steps follow the hadith. The four Sunni schools differ on some details (what is obligatory or recommended, the hands, raising them); the notes give the Maliki practice followed in Morocco. Every authentic way is valid: follow the scholars of your country, and learn from someone who prays.',
    'Les étapes suivent les hadiths. Les quatre écoles sunnites divergent sur certains détails (obligatoire ou recommandé, les mains, leur élévation) ; les notes donnent la pratique malikite suivie au Maroc. Toute manière authentique est valable : suivez les savants de votre pays, et apprenez auprès de quelqu’un qui prie.',
    'الخطوات على ما ورد في الحديث، وتختلف المذاهب الأربعة في بعض التفاصيل (الواجب والمستحب، ووضع اليدين، ورفعهما)، وتذكر الحواشي ما عليه المالكية في المغرب. وكل صفة صحّت مجزئة، فاتبع علماء بلدك وتعلّم ممن يصلي.',
    'Los pasos siguen los hadices. Las cuatro escuelas sunníes difieren en algunos detalles (lo obligatorio o recomendado, las manos, levantarlas); las notas dan la práctica malikí seguida en Marruecos. Toda forma auténtica es válida: sigue a los sabios de tu país y aprende de alguien que reza.',
  ),
  posture: t('Position', 'Position', 'الهيئة', 'Postura'),
  oneRakah: t('One rak‘ah, from the takbir to the salam', 'Une rak‘a, du takbir au salam', 'ركعة واحدة من التكبير إلى التسليم', 'Una rak‘a, del takbir al salam'),
}

const RAKAHS: Record<number, L4> = {
  2: t('2 rak‘ahs', '2 rak‘as', 'ركعتان', '2 rak‘as'),
  3: t('3 rak‘ahs', '3 rak‘as', 'ثلاث ركعات', '3 rak‘as'),
  4: t('4 rak‘ahs', '4 rak‘as', 'أربع ركعات', '4 rak‘as'),
}

const POSE_LABEL: Record<Pose, L4> = {
  stand: t('Standing', 'Debout', 'قيام', 'De pie'),
  bow: t('Bowing', 'Incliné', 'ركوع', 'Inclinado'),
  prostrate: t('Prostrating', 'Prosterné', 'سجود', 'Postrado'),
  sit: t('Sitting', 'Assis', 'جلوس', 'Sentado'),
  salam: t('Salam', 'Salam', 'تسليم', 'Salam'),
}

/** A small faceless line figure of the body's position. */
export function PoseFigure({ pose, className = 'size-10' }: { pose: Pose; className?: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <line x1="3" y1="38.5" x2="37" y2="38.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
      {pose === 'stand' && (
        <g {...common}>
          <circle cx="20" cy="6.5" r="3.4" />
          <path d="M20 10.5v13M20 23.5l-2.5 13.5M20 23.5l2.5 13.5M20 13l-3.5 10M20 13l3.5 10" />
        </g>
      )}
      {pose === 'bow' && (
        <g {...common}>
          <circle cx="8" cy="19" r="3.2" />
          <path d="M12 20h14M26 20l-1 17M26 20l2.5 17M15 20.5l9 6.5M15 20.5l10 5" />
        </g>
      )}
      {pose === 'prostrate' && (
        <g {...common}>
          <circle cx="8" cy="34.5" r="3.2" />
          <path d="M11.5 33l13-8M24.5 25l3 12M27.5 37h8M14 31l-1.5 6.5M16 30l-0.5 7" />
        </g>
      )}
      {(pose === 'sit' || pose === 'salam') && (
        <g {...common}>
          <circle cx={pose === 'salam' ? 17 : 15} cy="9" r="3.4" />
          <path d="M15 13v16M15 29l11 2M26 31l-1 6M25 37H11M15 16l8 12" />
          {pose === 'salam' && <path d="M23 6.5a6 6 0 0 1 3 5M26 11.5l1.8-2.2M26 11.5l-2.6-.6" strokeWidth={1.8} />}
        </g>
      )}
    </svg>
  )
}

function Section({ id, icon, title, lead, children }: { id: string; icon: ReactNode; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mb-16 scroll-mt-24">
      <h2 id={`${id}-h`} className="flex items-center gap-2.5 text-2xl font-semibold text-ink sm:text-3xl">
        <span className="text-gold">{icon}</span>
        {title}
      </h2>
      {lead && <p className="mt-3 max-w-2xl leading-relaxed text-ink-2 text-pretty">{lead}</p>}
      {children}
    </section>
  )
}

function Steps({ steps }: { steps: SalatStep[] }) {
  const { pick } = useI18n()
  return (
    <ol className="relative mt-8 space-y-10 border-s border-gold/20 ps-6 sm:ps-10">
      {steps.map((s, i) => (
        <Step
          key={s.id}
          s={s}
          n={i + 1}
          icon={
            s.pose && (
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-gold/25 bg-gold/[0.06] text-gold" title={pick(POSE_LABEL[s.pose])}>
                <PoseFigure pose={s.pose} />
                <span className="sr-only">
                  {q(pick(UI.posture))}: {q(pick(POSE_LABEL[s.pose]))}
                </span>
              </span>
            )
          }
        />
      ))}
    </ol>
  )
}

/** The rak‘ahs of each obligatory prayer, in order, with what is recited and where one sits. */
function PrayerTable() {
  const { pick, lang } = useI18n()
  const name = (id: string) => PRAYERS.find((p) => p.id === id)!.name
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
      <h3 className="border-b border-white/10 bg-night-2/60 px-5 py-3 text-base font-semibold text-ink">{q(pick(UI.plan))}</h3>
      <ul className="divide-y divide-white/10">
        {PRAYER_PLAN.map((p) => (
          <li key={p.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
            <div className="w-32 shrink-0">
              <p className="font-semibold text-gold-2">{q(pick(name(p.id)))}</p>
              <p className="text-xs text-ink-3">{q(pick(RAKAHS[p.rakahs]!))}</p>
            </div>
            <ol className="flex min-w-0 flex-wrap items-stretch gap-1.5" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              {Array.from({ length: p.rakahs }, (_, i) => {
                const n = i + 1
                const sitAfter = n === 2 && p.rakahs > 2 ? 'first' : n === p.rakahs ? 'last' : null
                return (
                  <li key={n} className="flex items-stretch gap-1.5">
                    <span className="flex flex-col justify-center rounded-xl border border-gold/20 bg-gold/[0.05] px-2.5 py-1.5 text-xs leading-snug">
                      <span className="font-semibold text-ink">{pick(UI.rakah).replace('{n}', String(n))}</span>
                      <span className="text-ink-2">{q(pick(n <= 2 ? UI.fatihaSurah : UI.fatihaOnly))}</span>
                      <span className="text-ink-3">{q(pick(n <= p.aloud ? UI.aloud : UI.silent))}</span>
                    </span>
                    {sitAfter && (
                      <span className={`flex items-center rounded-xl px-2.5 py-1.5 text-xs font-medium ${sitAfter === 'last' ? 'bg-gold text-night' : 'border border-white/15 bg-white/5 text-ink-2'}`}>
                        {q(pick(sitAfter === 'last' ? UI.lastSit : UI.firstSit))}
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  )
}

const JUMP: { id: string; label: L4 }[] = [
  { id: 'what', label: UI.what },
  { id: 'before', label: UI.before },
  { id: 'wudu', label: t('Ablution', 'Ablutions', 'الوضوء', 'Ablución') },
  { id: 'how', label: t('How to pray', 'Comment prier', 'صفة الصلاة', 'Cómo rezar') },
  { id: 'sahw', label: t('Fixing the prayer', 'Réparer la prière', 'سجود السهو', 'Reparar la oración') },
  { id: 'imam', label: t('Behind an imam', 'Derrière un imam', 'خلف الإمام', 'Tras un imam') },
  { id: 'sunnah', label: t('Sunnah prayers', 'Prières de la Sunna', 'السنن', 'Oraciones de la Sunna') },
  { id: 'other', label: t('Other prayers', 'Autres prières', 'صلوات أخرى', 'Otras oraciones') },
  { id: 'after', label: UI.after },
]

const MORE = {
  sahw: t('If you forget or make a mistake', 'Si vous oubliez ou vous trompez', 'إذا نسيت أو أخطأت في صلاتك', 'Si olvidas o te equivocas'),
  sahwLead: t(
    'A forgotten step, an extra rak‘ah or a doubt is repaired with two prostrations; the prayer is not lost.',
    'Une étape oubliée, une rak‘a en trop ou un doute se répare par deux prosternations ; la prière n’est pas perdue.',
    'نسيان ركن أو زيادة ركعة أو الشك يُجبر بسجدتين، ولا تبطل الصلاة.',
    'Un paso olvidado, una rak‘a de más o una duda se reparan con dos postraciones; la oración no se pierde.',
  ),
  imam: t('Praying behind an imam', 'Prier derrière un imam', 'الصلاة خلف الإمام', 'Rezar tras un imam'),
  imamLead: t(
    'How to follow the imam, what not to do, and what to do when you arrive late.',
    'Comment suivre l’imam, ce qu’il ne faut pas faire, et que faire quand on arrive en retard.',
    'كيف تتابع الإمام، وما يُنهى عنه، وماذا تفعل إذا فاتك بعض الصلاة.',
    'Cómo seguir al imam, qué no hacer y qué hacer si llegas tarde.',
  ),
  other: t('Other prayers', 'Les autres prières', 'صلوات أخرى', 'Otras oraciones'),
  otherLead: t(
    'The funeral prayer, istikharah, the two Eids, Friday, the traveller’s prayer and the eclipse prayer.',
    'La prière funéraire, l’istikhara, les deux Aïds, le vendredi, la prière du voyageur et celle de l’éclipse.',
    'صلاة الجنازة والاستخارة والعيدين والجمعة وصلاة المسافر وصلاة الكسوف.',
    'La oración fúnebre, la istijara, los dos Eid, el viernes, la oración del viajero y la del eclipse.',
  ),
}

export function SalatView() {
  const { pick } = useI18n()
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="reveal mx-auto mb-8 max-w-2xl text-center">
        <p className="kicker inline-flex items-center justify-center gap-2">
          <Sparkles aria-hidden="true" className="size-3.5" /> {q(pick(UI.kicker))}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          <span className="gold-text">{q(pick(UI.title))}</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink-2">{q(pick(UI.lead))}</p>
      </header>

      <nav aria-label={pick(UI.title)} className="mb-12 flex flex-wrap justify-center gap-2">
        {JUMP.map((j) => (
          <a key={j.id} href={`#${j.id}`} className="ref">
            {q(pick(j.label))}
          </a>
        ))}
      </nav>

      {/* One rak‘ah, as figures */}
      <ol aria-label={pick(UI.oneRakah)} className="mx-auto mb-14 flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-3">
        {(['stand', 'bow', 'stand', 'prostrate', 'sit', 'prostrate', 'sit', 'salam'] as Pose[]).map((p, i) => (
          <li key={i} className="flex w-[4.6rem] flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-1 py-2.5 text-gold">
            <PoseFigure pose={p} className="size-11" />
            <span className="text-center text-[0.68rem] leading-tight text-ink-2">{q(pick(POSE_LABEL[p]))}</span>
          </li>
        ))}
      </ol>

      <Section id="what" icon={<BookOpen aria-hidden="true" className="size-6" />} title={pick(UI.what)}>
        <Steps steps={SALAT_WHAT} />
      </Section>

      <Section id="before" icon={<ListChecks aria-hidden="true" className="size-6" />} title={pick(UI.before)} lead={pick(UI.beforeLead)}>
        <Steps steps={SALAT_BEFORE} />
        <p className="mt-6">
          <A href="/times" className="ref">
            <Clock aria-hidden="true" className="size-3" /> {q(pick(UI.times))}
          </A>
        </p>
      </Section>

      <Section id="wudu" icon={<Droplets aria-hidden="true" className="size-6" />} title={pick(UI.wudu)} lead={pick(UI.wuduLead)}>
        <Steps steps={WUDU_STEPS} />
      </Section>

      <Section id="how" icon={<HandHeart aria-hidden="true" className="size-6" />} title={pick(UI.how)} lead={pick(UI.howLead)}>
        <div className="mt-8 rounded-3xl border border-gold/20 bg-gold/[0.03] p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-ink text-balance sm:text-xl">{q(pick(HOW_MODEL.title))}</h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-ink-2 text-pretty">{q(pick(HOW_MODEL.text))}</p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <LevelChip level={HOW_MODEL.l} />
            {HOW_MODEL.r.map((r) => (
              <RefChip key={r} r={r} />
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {HOW_MODEL.quotes!.map((d) => (
              <DuaCard key={d.id} d={d} compact />
            ))}
          </div>
        </div>
        <PrayerTable />
        <Steps steps={HOW_STEPS} />
      </Section>

      <Section id="sahw" icon={<Undo2 aria-hidden="true" className="size-6" />} title={pick(MORE.sahw)} lead={pick(MORE.sahwLead)}>
        <Steps steps={SAHW_STEPS} />
      </Section>

      <Section id="imam" icon={<Users aria-hidden="true" className="size-6" />} title={pick(MORE.imam)} lead={pick(MORE.imamLead)}>
        <Steps steps={JAMAA_STEPS} />
      </Section>

      <Section id="sunnah" icon={<Sparkles aria-hidden="true" className="size-6" />} title={pick(UI.sunnah)} lead={pick(UI.sunnahLead)}>
        <Steps steps={SUNNAH_STEPS} />
      </Section>

      <Section id="other" icon={<Star aria-hidden="true" className="size-6" />} title={pick(MORE.other)} lead={pick(MORE.otherLead)}>
        <Steps steps={OTHER_PRAYERS} />
      </Section>

      <Section id="after" icon={<HandHeart aria-hidden="true" className="size-6" />} title={pick(UI.after)}>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <DuaCard d={ADHKAR['after-prayer']!} />
          <DuaCard d={ADHKAR['tasbih-after-prayer']!} />
        </div>
        <p className="mt-6 flex flex-wrap gap-2">
          <A href="/duas" className="ref">
            {q(pick(UI.duas))}
          </A>
          <A href="/times" className="ref">
            <Clock aria-hidden="true" className="size-3" /> {q(pick(UI.times))}
          </A>
        </p>
      </Section>

      <aside className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-ink-2 sm:p-6">
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
        <p>{q(pick(UI.schools))}</p>
      </aside>
    </div>
  )
}
