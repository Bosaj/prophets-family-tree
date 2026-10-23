import { ExternalLink } from 'lucide-react'
import { GithubMark } from './GithubMark'
import { useI18n } from '../i18n'
import { LEVEL_TEXT } from '../i18n/strings'
import { BOOKS, LEVELS } from '../data/sources'
import { LevelChip } from './ui'
import { VERIFIED_REFS } from '../data/verified'
import photoCredits from '../data/photoCredits.json'

export const REPO = 'https://github.com/Bosaj/prophets-family-tree'

export function Sources() {
  const { t, lang } = useI18n()
  return (
    <div className="mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6 sm:pt-28">
      <header className="text-center">
        <p className="kicker">{t('sourcesKicker')}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{t('sourcesTitle')}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-ink-2 sm:text-lg">{t('methodLead')}</p>
      </header>

      <section aria-labelledby="levels" className="mt-14">
        <h2 id="levels" className="text-2xl font-semibold">{t('levelsTitle')}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {LEVELS.map((l) => (
            <li key={l} className="glass rounded-3xl p-5">
              <LevelChip level={l} />
              <p className="mt-3 leading-relaxed text-ink-2">{LEVEL_TEXT[lang][l].desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="rules" className="mt-14">
        <h2 id="rules" className="text-2xl font-semibold">{t('rulesTitle')}</h2>
        <ol className="mt-5 space-y-3">
          {(['rule1', 'rule2', 'rule3', 'rule4', 'rule5'] as const).map((k, i) => (
            <li key={k} className="glass flex gap-4 rounded-3xl p-5">
              <span className="gold-text text-2xl font-bold tabular-nums">{i + 1}</span>
              <p className="leading-relaxed text-ink-2">{t(k)}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-center text-sm text-ink-3">
          {VERIFIED_REFS} · {t('statRefs')}
        </p>
      </section>

      <section aria-labelledby="books" className="mt-14">
        <h2 id="books" className="text-2xl font-semibold">{t('booksTitle')}</h2>
        <ul className="mt-5 space-y-2">
          {Object.entries(BOOKS).map(([k, v]) => (
            <li key={k} className="glass rounded-2xl px-5 py-3 text-ink-2">
              {v[lang]}
            </li>
          ))}
          <li className="glass rounded-2xl px-5 py-3 text-ink-2">
            <a className="inline-flex items-center gap-1 text-gold hover:text-gold-2" href="https://alquran.cloud/api" target="_blank" rel="noopener noreferrer">
              Al Quran Cloud API <ExternalLink className="size-3" aria-hidden="true" />
            </a>{' '}
            · <a className="inline-flex items-center gap-1 text-gold hover:text-gold-2" href="https://sunnah.com" target="_blank" rel="noopener noreferrer">sunnah.com <ExternalLink className="size-3" aria-hidden="true" /></a>{' '}
            · <a className="inline-flex items-center gap-1 text-gold hover:text-gold-2" href="https://github.com/fawazahmed0/hadith-api" target="_blank" rel="noopener noreferrer">hadith-api <ExternalLink className="size-3" aria-hidden="true" /></a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="photos" className="mt-14">
        <h2 id="photos" className="text-2xl font-semibold">{lang === 'ar' ? 'حقوق الصور' : lang === 'fr' ? 'Crédits photo' : 'Photo credits'}</h2>
        <p className="mt-3 text-sm text-ink-2">
          {lang === 'ar'
            ? 'صور الكائنات من ويكيميديا كومنز بتراخيصها المذكورة؛ والمناظر الطبيعية مولّدة للمشروع ولا تصوّر أي نبي أو إنسان.'
            : lang === 'fr'
            ? 'Les photos d’animaux et de plantes viennent de Wikimedia Commons sous les licences indiquées ; les paysages sont générés pour le projet et ne représentent aucun prophète ni personne.'
            : 'Animal and plant photos come from Wikimedia Commons under the licences listed; landscapes are generated for the project and depict no prophet or person.'}
        </p>
        <ul className="mt-4 grid gap-2 text-xs text-ink-3 sm:grid-cols-2">
          {Object.entries(photoCredits as Record<string, { page?: string; author: string; license: string; generated?: boolean }>)
            .filter(([, c]) => !c.generated)
            .map(([id, c]) => (
              <li key={id} className="glass rounded-xl px-3 py-2">
                <span className="font-mono text-ink-2">{id}</span> ·{' '}
                <a href={c.page} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-gold">
                  {c.author}
                </a>{' '}
                · {c.license}
              </li>
            ))}
        </ul>
      </section>

      <section aria-labelledby="report" className="glass mt-14 rounded-3xl p-6 text-center sm:p-10">
        <h2 id="report" className="text-2xl font-semibold">{t('reportTitle')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-2">{t('reportLead')}</p>
        <a href={`${REPO}/issues/new?labels=accuracy&title=Accuracy:%20`} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-6">
          <GithubMark className="size-4" /> {t('reportCta')}
        </a>
        <p className="mt-6 text-sm text-ink-3">{t('disclaimer')}</p>
      </section>
    </div>
  )
}
