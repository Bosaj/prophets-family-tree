import { useState } from 'react'
import { BookOpen, Check, Copy, HandHeart, History, Sunrise } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4 } from '../data/types'
import { HARDSHIP_DUAS, LIFE_ERAS, LIFE_MOMENTS, type LifeEra, type Supplication } from '../data/duas'
import { ADHKAR } from '../data/awqat'
import { HISN, type HisnItem } from '../data/hisn'
import { A, LevelChip, RefChip, useOpenVerse } from './ui'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

const UI = {
  hisnKicker: t('Supplications for every day', 'Invocations de chaque jour', 'أذكار اليوم والليلة', 'Súplicas de cada día'),
  hisnTitle: t('What to say, moment by moment', 'Que dire, à chaque moment', 'ماذا تقول في كل حال', 'Qué decir en cada momento'),
  hisnLead: t(
    'The words the Prophet ﷺ said and taught for the moments of each day: waking, leaving home, eating, travelling, illness, worry, rain. Each is quoted in full from the hadith that reports it and checked against that text; outside al-Bukhari and Muslim, its grade is shown.',
    'Les paroles que le Prophète ﷺ disait et enseignait pour les moments de chaque jour : le réveil, la sortie, le repas, le voyage, la maladie, le souci, la pluie. Chacune est citée en entier du hadith qui la rapporte et vérifiée sur ce texte ; hors al-Bukhari et Muslim, son degré est indiqué.',
    'ما كان النبي ﷺ يقوله ويعلّمه في أحوال اليوم: الاستيقاظ والخروج والطعام والسفر والمرض والهم والمطر. كل ذكر منقول كاملًا من الحديث الذي رواه ومراجَع على نصه، ويُذكر حكمه إن كان في غير الصحيحين.',
    'Las palabras que el Profeta ﷺ decía y enseñaba para los momentos de cada día: al despertar, al salir, al comer, al viajar, en la enfermedad, la preocupación o la lluvia. Cada una se cita completa del hadiz que la transmite y se verifica con ese texto; fuera de al-Bujari y Muslim, se indica su grado.',
  ),
  life: t('The supplications of his life', 'Les invocations de sa vie', 'أدعيته في محطات حياته', 'Las súplicas de su vida'),
  lifeLead: t(
    'What he said to Allah at Ta’if, in the cave, at Badr and on his last day is now on the page about Islam, with the story of each moment.',
    'Ce qu’il dit à Allah à Ta’if, dans la grotte, à Badr et à son dernier jour est désormais sur la page de l’islam, avec le récit de chaque moment.',
    'ما ناجى به ربه في الطائف والغار وبدر ويومه الأخير صار في صفحة الإسلام، مع قصة كل محطة.',
    'Lo que dijo a Allah en Ta’if, en la cueva, en Badr y en su último día está ahora en la página del islam, con la historia de cada momento.',
  ),
  lifeCta: t('Read them', 'Les lire', 'اقرأها', 'Leerlas'),
  kicker: t('Supplications of the Prophet ﷺ', 'Invocations du Prophète ﷺ', 'أدعية النبي ﷺ', 'Súplicas del Profeta ﷺ'),
  title: t('What he said at each moment of his life', 'Ce qu’il disait à chaque moment de sa vie', 'ما قاله في كل محطة من حياته', 'Lo que dijo en cada momento de su vida'),
  lead: t(
    'From the persecution in Makkah to his last breath, the words he addressed to Allah, each quoted from the hadith that reports it and checked against that text.',
    'Des persécutions de La Mecque à son dernier souffle, les paroles qu’il adressa à Allah, chacune citée du hadith qui la rapporte et vérifiée sur ce texte.',
    'من أذى مكة إلى آخر أنفاسه، كلماته التي ناجى بها ربه، كل منها منقول من الحديث الذي رواه ومراجَع على نصه.',
    'De la persecución en La Meca a su último aliento, las palabras que dirigió a Allah, cada una citada del hadiz que la transmite y verificada con ese texto.',
  ),
  all: t('All', 'Toutes', 'الكل', 'Todas'),
  hardship: t('In hardship', 'Dans l’épreuve', 'في الشدائد', 'En la dificultad'),
  hardshipLead: t('What he said, and taught, for the hard moments everyone meets.', 'Ce qu’il disait, et enseignait, pour les moments durs que chacun rencontre.', 'ما كان يقوله ويعلّمه لكل شدة تمر بالإنسان.', 'Lo que decía, y enseñaba, para los momentos duros que todos atraviesan.'),
  daily: t('The Times page shows each remembrance at its hour, for your place.', 'La page des Horaires montre chaque invocation à son heure, pour votre lieu.', 'صفحة المواقيت تعرض كل ذكر في وقته بحسب مكانك.', 'La página de Horarios muestra cada recuerdo a su hora, para tu lugar.'),
  dailyCta: t('Open the times of the day', 'Ouvrir les horaires du jour', 'افتح مواقيت اليوم', 'Abrir los horarios del día'),
  readVerse: t('Read the verse', 'Lire le verset', 'اقرأ الآية', 'Leer el versículo'),
  copy: t('Copy', 'Copier', 'نسخ', 'Copiar'),
  copied: t('Copied', 'Copié', 'نُسخ', 'Copiado'),
  times: t('times', 'fois', 'مرات', 'veces'),
}

export function DuaCard({ d, compact = false }: { d: Supplication; compact?: boolean }) {
  const { pick, lang } = useI18n()
  const openVerse = useOpenVerse()
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(d.ar).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      },
      () => {},
    )
  }
  return (
    <div className={`min-w-0 break-words rounded-2xl border ${d.l === 'disputed' ? 'border-lvl-disputed/30 bg-lvl-disputed/[0.04]' : 'border-gold/20 bg-gold/[0.04]'} ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
      {d.ar && (
        <p lang="ar" dir="rtl" className={`font-hadith leading-[2.1] text-gold-2 text-pretty ${compact ? 'text-xl' : 'text-2xl sm:text-[1.7rem]'}`}>
          {d.ar}
        </p>
      )}
      <p className={`${d.ar ? 'mt-3' : ''} text-sm leading-relaxed text-ink-2 sm:text-base`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {pick(d.meaning)}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <LevelChip level={d.l} />
        {d.grade && <span className={`chip ${d.l === 'disputed' ? 'text-lvl-disputed' : 'text-ink-2'}`}>{pick(d.grade)}</span>}
        {d.count && (
          <span className="chip text-gold">
            ×{d.count} {pick(UI.times)}
          </span>
        )}
        {d.r.map((r) => (
          <RefChip key={r} r={r} />
        ))}
        {d.verse && !d.r.includes(d.verse) && (
          <button type="button" className="ref" onClick={() => openVerse(d.verse!)}>
            <BookOpen aria-hidden="true" className="size-3" /> {pick(UI.readVerse)} <bdi>{d.verse}</bdi>
          </button>
        )}
        {d.ar && (
          <button type="button" onClick={copy} className="ref ms-auto" aria-live="polite">
            {copied ? <Check aria-hidden="true" className="size-3" /> : <Copy aria-hidden="true" className="size-3" />}
            {pick(copied ? UI.copied : UI.copy)}
          </button>
        )}
      </div>
    </div>
  )
}

function resolve(it: HisnItem): (Supplication & { when?: L4; title?: L4 }) | undefined {
  if ('ar' in it) return it
  if (it.from === 'adhkar') return ADHKAR[it.id]
  return HARDSHIP_DUAS.find((d) => d.id === it.id)
}

/** The Prophet's supplications at the moments of his life, by era. Shown on the page about Islam. */
export function LifeDuas() {
  const { pick, lang } = useI18n()
  const [era, setEra] = useState<LifeEra | 'all'>('all')
  const moments = LIFE_MOMENTS.filter((m) => era === 'all' || m.era === era)
  return (
    <>
      <nav aria-label={pick(UI.kicker)} className="mb-10 flex flex-wrap gap-2">
        {[{ id: 'all' as const, label: UI.all }, ...LIFE_ERAS].map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setEra(e.id)}
            aria-pressed={era === e.id}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              era === e.id ? 'bg-gold/15 text-gold ring-1 ring-gold/40' : 'border border-white/10 text-ink-2 hover:border-white/25 hover:text-ink'
            }`}
          >
            {pick(e.label)}
          </button>
        ))}
      </nav>
      <ol className="relative space-y-10 border-s border-gold/20 ps-6 sm:ps-10">
        {moments.map((m) => (
          <li key={m.id} id={m.id} className="relative">
            <span aria-hidden="true" className="absolute -start-[1.95rem] top-1.5 size-3 rounded-full bg-gold shadow-[0_0_12px_rgba(233,198,123,0.7)] sm:-start-[2.95rem]" />
            <p className="text-xs font-medium uppercase tracking-wider text-gold/80">{pick(m.when)}</p>
            <h3 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">{pick(m.title)}</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-2" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              {pick(m.story)}
            </p>
            <div className="mt-4 space-y-3">
              {m.duas.map((d) => (
                <DuaCard key={d.id} d={d} />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

export function DuasView() {
  const { pick } = useI18n()
  const [cat, setCat] = useState<string>('all')
  const cats = HISN.filter((c) => cat === 'all' || c.id === cat)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="reveal mx-auto mb-10 max-w-2xl text-center">
        <p className="kicker inline-flex items-center justify-center gap-2">
          <HandHeart aria-hidden="true" className="size-3.5" /> {pick(UI.hisnKicker)}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          <span className="gold-text">{pick(UI.hisnTitle)}</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink-2">{pick(UI.hisnLead)}</p>
      </header>

      <nav aria-label={pick(UI.hisnKicker)} className="mb-10 flex flex-wrap justify-center gap-2">
        {[{ id: 'all', title: UI.all }, ...HISN].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            aria-pressed={cat === c.id}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              cat === c.id ? 'bg-gold/15 text-gold ring-1 ring-gold/40' : 'border border-white/10 text-ink-2 hover:border-white/25 hover:text-ink'
            }`}
          >
            {pick(c.title)}
          </button>
        ))}
      </nav>

      <div className="space-y-14">
        {cats.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`h-${c.id}`} className="scroll-mt-24">
            <h2 id={`h-${c.id}`} className="text-2xl font-semibold text-ink">{pick(c.title)}</h2>
            <div className="mt-5 grid gap-4">
              {c.items.map((it) => {
                const d = resolve(it)
                if (!d) return null
                const label = d.when ?? d.title
                return (
                  <div key={d.id}>
                    {label && <p className="mb-2 text-sm font-medium text-gold">{pick(label)}</p>}
                    <DuaCard d={d} compact />
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <aside className="glass mt-14 flex flex-col items-center gap-3 rounded-3xl p-6 text-center sm:flex-row sm:text-start">
        <History aria-hidden="true" className="size-8 shrink-0 text-gold" />
        <div className="flex-1">
          <p className="font-semibold text-ink">{pick(UI.life)}</p>
          <p className="mt-1 text-sm text-ink-2">{pick(UI.lifeLead)}</p>
        </div>
        <A href="/islam#life" className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-night transition-transform hover:scale-[1.02] active:scale-[0.98]">
          {pick(UI.lifeCta)}
        </A>
      </aside>

      <aside className="mt-4 flex flex-col items-center gap-3 rounded-3xl border border-white/10 p-6 text-center sm:flex-row sm:text-start">
        <Sunrise aria-hidden="true" className="size-8 shrink-0 text-gold" />
        <p className="flex-1 text-ink-2">{pick(UI.daily)}</p>
        <A href="/times" className="rounded-full border border-gold/40 px-5 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/10">
          {pick(UI.dailyCta)}
        </A>
      </aside>
    </div>
  )
}
