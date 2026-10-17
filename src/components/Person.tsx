import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, GitBranch, Share2, Sparkles } from 'lucide-react'
import { useI18n } from '../i18n'
import type { Key } from '../i18n/strings'
import { byId, people } from '../data/people'
import type { Fact, Person as P } from '../data/types'
import { refLabel } from '../data/sources'
import { relativesOf } from '../lib/layout'
import { hrefOf } from '../lib/router'
import { A, FactText, LevelChip, Refs, Scene, useOpenVerse } from './ui'
import { NotFound } from './NotFound'

const FACTS: { key: keyof P & ('role' | 'sentTo' | 'place' | 'scripture' | 'era' | 'lifespan' | 'marriage' | 'children'); label: Key }[] = [
  { key: 'role', label: 'role' },
  { key: 'sentTo', label: 'sentTo' },
  { key: 'place', label: 'place' },
  { key: 'scripture', label: 'scripture' },
  { key: 'era', label: 'era' },
  { key: 'lifespan', label: 'lifespan' },
  { key: 'marriage', label: 'marriage' },
  { key: 'children', label: 'children' },
]

const ordered = [...people].sort((a, b) => a.order - b.order || (a.kind === b.kind ? 0 : a.kind === 'prophet' ? -1 : 1))

export function Person({ id }: { id: string }) {
  const { t, pick, lang } = useI18n()
  const openVerse = useOpenVerse()
  const p = byId.get(id)
  const [copied, setCopied] = useState(false)
  const relatives = useMemo(() => (p ? relativesOf(p.id) : []), [p])

  useEffect(() => {
    if (p) document.title = `${p.name.ar} · ${pick(p.name)} — ${t('brand')}`
    return () => {
      document.title = 'شجرة الأنبياء · Shajara — The Tree of the Prophets'
    }
  }, [p, pick, t])

  if (!p) return <NotFound />

  const i = ordered.findIndex((x) => x.id === p.id)
  const prev = ordered[i - 1]
  const next = ordered[i + 1]

  const share = async () => {
    const url = location.href
    try {
      if (navigator.share) await navigator.share({ title: `${p.name.ar} · ${pick(p.name)}`, url })
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      /* cancelled */
    }
  }

  return (
    <article>
      {/* banner */}
      <header className="relative isolate flex min-h-[78svh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Scene image={p.image} eager className="animate-drift h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/30 to-night" />
        </div>
        <div className="mx-auto w-full max-w-5xl px-4 pt-32 pb-12 sm:px-6">
          <div className="reveal">
            <div className="flex flex-wrap items-center gap-2">
              {p.kind === 'family' && <span className="chip text-lvl-tradition">{t('familyMember')}</span>}
              {p.ululAzm && <span className="chip text-gold">{t('ululBadge')}</span>}
              {p.heaven && <span className="chip text-lvl-hadith">{t('heavenBadge', { n: p.heaven })}</span>}
            </div>
            <h1 className="mt-4">
              <span className="ar-name gold-text block text-[clamp(4rem,2rem+9vw,9rem)] leading-none font-bold drop-shadow-[0_10px_50px_rgb(233_198_123/0.3)]">{p.name.ar}</span>
              <span className="mt-3 block text-2xl font-light text-ink sm:text-3xl">
                {lang === 'ar' ? (
                  <span dir="ltr">{p.alt ? p.alt.en : p.name.en}</span>
                ) : (
                  <>
                    {pick(p.name)}
                    {p.alt && <span className="text-ink-3"> · {pick(p.alt)}</span>}
                  </>
                )}
              </span>
            </h1>
            {p.title && (
              <div className="mt-5 max-w-2xl">
                <p className="text-lg text-gold-2 italic sm:text-xl">{pick(p.title.t)}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <LevelChip level={p.title.l} />
                  <Refs refs={p.title.r} />
                </div>
              </div>
            )}
            <div className="mt-7 flex flex-wrap gap-2">
              <A href={hrefOf({ name: 'tree', focus: p.id })} className="btn btn-ghost">
                <GitBranch className="size-4" aria-hidden="true" /> {t('navTree')}
              </A>
              <button type="button" onClick={share} className="btn btn-ghost">
                {copied ? <Check className="size-4" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}
                {copied ? t('copied') : t('share')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        {/* story */}
        <section aria-labelledby="story" className="glass rounded-3xl p-6 sm:p-10">
          <h2 id="story" className="kicker">{t('story')}</h2>
          <p className={`mt-4 text-pretty text-ink ${lang === 'ar' ? 'naskh text-2xl leading-[2.1]' : 'text-lg leading-relaxed sm:text-xl'}`}>{pick(p.story)}</p>
          {p.mentions && (
            <p className="mt-6 text-sm text-ink-3" title={t('mentionsHint')}>
              {t('mentions', { n: p.mentions })} <span className="opacity-70">({t('mentionsHint')})</span>
            </p>
          )}
        </section>

        {/* facts */}
        <section aria-label={pick(p.name)} className="mt-6 grid gap-4 sm:grid-cols-2">
          {FACTS.map(({ key, label }) => {
            const fact = p[key] as Fact | undefined
            if (!fact) return null
            return (
              <div key={key} className="glass rounded-3xl p-5">
                <h3 className="mb-2 text-xs tracking-wide text-ink-3 uppercase">{t(label)}</h3>
                <FactText fact={fact} />
              </div>
            )
          })}
        </section>

        {/* signs */}
        {p.signs && p.signs.length > 0 && (
          <section aria-labelledby="signs" className="mt-12">
            <h2 id="signs" className="flex items-center gap-2 text-2xl font-semibold">
              <Sparkles className="size-5 text-gold" aria-hidden="true" /> {t('signs')}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {p.signs.map((s, k) => (
                <li key={k} className="glass relative overflow-hidden rounded-3xl p-5">
                  <span aria-hidden="true" className="absolute -end-6 -top-6 size-24 rounded-full bg-gold/10 blur-2xl" />
                  <FactText fact={s} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* notes */}
        {p.notes && p.notes.length > 0 && (
          <section aria-labelledby="notes" className="mt-12">
            <h2 id="notes" className="text-2xl font-semibold">{t('notes')}</h2>
            <ul className="mt-5 space-y-3">
              {p.notes.map((s, k) => (
                <li key={k} className="glass rounded-3xl p-5">
                  <FactText fact={s} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* family */}
        {relatives.length > 0 && (
          <section aria-labelledby="family" className="mt-12">
            <h2 id="family" className="text-2xl font-semibold">{t('family')}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatives.map((r) => (
                <li key={`${r.rel}-${r.person.id}`}>
                  <A href={hrefOf({ name: 'person', id: r.person.id })} className="glass group block h-full rounded-3xl p-5 transition-colors hover:border-gold/40">
                    <p className="text-xs text-ink-3">{t(r.rel)}</p>
                    <p className="ar-name gold-text mt-1 text-3xl font-bold">{r.person.name.ar}</p>
                    <p className="text-sm text-ink">{pick(r.person.name)}</p>
                    {r.link.note && <p className="mt-2 text-xs leading-relaxed text-ink-2">{pick(r.link.note)}</p>}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <LevelChip level={r.link.l} />
                    </div>
                  </A>
                  {r.link.r && (
                    <div className="px-2">
                      <Refs refs={r.link.r} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* verses */}
        {p.verses.length > 0 && (
          <section aria-labelledby="verses" className="mt-12">
            <h2 id="verses" className="flex items-center gap-2 text-2xl font-semibold">
              <BookOpen className="size-5 text-gold" aria-hidden="true" /> {t('readQuran')}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {p.verses.map((v) => (
                <li key={v}>
                  <button type="button" onClick={() => openVerse(v)} className="glass group flex w-full items-center justify-between gap-3 rounded-3xl p-5 text-start transition-colors hover:border-gold/40">
                    <span>
                      <span className="block text-lg font-semibold text-ink">
                        <bdi>{refLabel(v, lang)}</bdi>
                      </span>
                      <span className="text-sm text-ink-3">{t('showVerses')}</span>
                    </span>
                    <BookOpen className="size-5 text-gold transition-transform group-hover:scale-110" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* prev / next */}
        <nav aria-label={`${t('prev')} / ${t('next')}`} className="mt-16 grid grid-cols-2 gap-3">
          {prev ? (
            <A href={hrefOf({ name: 'person', id: prev.id })} className="glass group flex items-center gap-3 rounded-3xl p-4 hover:border-gold/40">
              <ArrowLeft className="size-5 shrink-0 text-gold rtl:rotate-180" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-xs text-ink-3">{t('prev')}</span>
                <span className="ar-name block truncate text-xl text-ink">{prev.name.ar}</span>
              </span>
            </A>
          ) : (
            <span />
          )}
          {next && (
            <A href={hrefOf({ name: 'person', id: next.id })} className="glass group flex items-center justify-end gap-3 rounded-3xl p-4 text-end hover:border-gold/40">
              <span className="min-w-0">
                <span className="block text-xs text-ink-3">{t('next')}</span>
                <span className="ar-name block truncate text-xl text-ink">{next.name.ar}</span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-gold rtl:rotate-180" aria-hidden="true" />
            </A>
          )}
        </nav>
      </div>
    </article>
  )
}
