import { useState } from 'react'
import { BookOpen, Check, Copy, HandHeart, Sunrise } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L4 } from '../data/types'
import { HARDSHIP_DUAS, LIFE_ERAS, LIFE_MOMENTS, type LifeEra, type Supplication } from '../data/duas'
import { A, LevelChip, RefChip, useOpenVerse } from './ui'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

const UI = {
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
  daily: t('Morning, evening and bedtime remembrances are on the Times page.', 'Les invocations du matin, du soir et du coucher sont sur la page des Horaires.', 'أذكار الصباح والمساء والنوم في صفحة المواقيت.', 'Los recuerdos de la mañana, la tarde y antes de dormir están en la página de Horarios.'),
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
    <div className={`rounded-2xl border ${d.l === 'disputed' ? 'border-lvl-disputed/30 bg-lvl-disputed/[0.04]' : 'border-gold/20 bg-gold/[0.04]'} ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
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

export function DuasView() {
  const { pick, lang } = useI18n()
  const [era, setEra] = useState<LifeEra | 'all'>('all')
  const moments = LIFE_MOMENTS.filter((m) => era === 'all' || m.era === era)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="reveal mx-auto mb-10 max-w-2xl text-center">
        <p className="kicker inline-flex items-center justify-center gap-2">
          <HandHeart aria-hidden="true" className="size-3.5" /> {pick(UI.kicker)}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          <span className="gold-text">{pick(UI.title)}</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink-2">{pick(UI.lead)}</p>
      </header>

      <nav aria-label={pick(UI.kicker)} className="mb-10 flex flex-wrap justify-center gap-2">
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
            <h2 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">{pick(m.title)}</h2>
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

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">{pick(UI.hardship)}</h2>
        <p className="mt-2 text-ink-2">{pick(UI.hardshipLead)}</p>
        <div className="mt-6 grid gap-4">
          {HARDSHIP_DUAS.map((d) => (
            <div key={d.id}>
              <p className="mb-2 text-sm font-medium text-gold">{pick(d.when)}</p>
              <DuaCard d={d} compact />
            </div>
          ))}
        </div>
      </section>

      <aside className="glass mt-14 flex flex-col items-center gap-3 rounded-3xl p-6 text-center sm:flex-row sm:text-start">
        <Sunrise aria-hidden="true" className="size-8 shrink-0 text-gold" />
        <p className="flex-1 text-ink-2">{pick(UI.daily)}</p>
        <A href="/times" className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-night transition-transform hover:scale-[1.02] active:scale-[0.98]">
          {pick(UI.dailyCta)}
        </A>
      </aside>
    </div>
  )
}
