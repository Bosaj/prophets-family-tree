import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  BookOpen,
  Calendar,
  Check,
  Compass,
  Droplets,
  GitBranch,
  Globe,
  Heart,
  Landmark,
  Map,
  MapPin,
  Milestone,
  Mountain,
  Navigation,
  Share2,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react'
import { useI18n } from '../i18n'
import type { Key } from '../i18n/strings'
import { byId, people } from '../data/people'
import type { Fact, Person as P } from '../data/types'
import { refLabel } from '../data/sources'
import { relativesOf } from '../lib/layout'
import { formatDate } from '../lib/dates'
import { hrefOf } from '../lib/router'
import { A, FactText, LevelChip, Refs, Scene, useOpenVerse } from './ui'
import { NotFound } from './NotFound'
import { SCRIPTURES_BY_PROPHET } from '../data/scriptures'
import { ScripturesModal } from './ScripturesModal'

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
  const [showScriptureModal, setShowScriptureModal] = useState(false)
  const relatives = useMemo(() => (p ? relativesOf(p.id) : []), [p])
  const scriptureBook = p ? SCRIPTURES_BY_PROPHET.get(p.id) : null

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
              <span className="ar-name gold-text block text-[clamp(4rem,2rem+9vw,9rem)] leading-[1.3] font-bold drop-shadow-[0_10px_50px_rgb(233_198_123/0.3)] pt-6 pb-2 -mt-6 -mb-2">{p.name.ar}</span>
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
              {p.topography && (
                <A href={`/map?focus=${p.id}`} className="btn btn-ghost">
                  <Compass className="size-4 text-gold" aria-hidden="true" /> {t('mapView')}
                </A>
              )}
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

        {/* scholarly biography */}
        {p.biography && p.biography.length > 0 && (
          <section aria-labelledby="biography-heading" className="glass mt-8 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-gold" aria-hidden="true" />
              <h2 id="biography-heading" className="text-2xl font-semibold text-ink">
                {t('fullBiography')}
              </h2>
            </div>
            <div className="mt-6 space-y-6">
              {p.biography.map((para, bIdx) => (
                <div key={bIdx} className="relative ps-4 border-s-2 border-gold/40">
                  <p className={`text-pretty text-ink-2 ${lang === 'ar' ? 'naskh text-xl leading-[2.2]' : 'text-base leading-relaxed sm:text-lg text-ink/90'}`}>
                    {pick(para)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* facts */}
        <section aria-label={pick(p.name)} className="mt-6 grid gap-4 sm:grid-cols-2">
          {FACTS.map(({ key, label }) => {
            const fact = p[key] as Fact | undefined
            if (!fact) return null
            return (
              <div key={key} className="glass rounded-3xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="mb-2 text-xs tracking-wide text-ink-3 uppercase">{t(label)}</h3>
                  <FactText fact={fact} />
                </div>
                {key === 'scripture' && scriptureBook && (
                  <div className="mt-4 pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 rounded-xl overflow-hidden border border-amber-400/40 shadow-md bg-black/40">
                        <img
                          src={`${import.meta.env.BASE_URL}scriptures/${scriptureBook.id}.png`}
                          alt={scriptureBook.transliteration}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-amber-200 font-serif">{scriptureBook.title.ar} · {pick(scriptureBook.title)}</p>
                        <p className="text-[11px] text-amber-300/70 font-mono">
                          {pick(scriptureBook.originalLanguage)} • {scriptureBook.id === 'quran' ? (lang === 'ar' ? 'نص موحد محفوظ' : '1 Preserved Text') : `${scriptureBook.versionsCount} ${lang === 'ar' ? 'روايات' : 'traditions'}`}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowScriptureModal(true)}
                      className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold bg-gradient-to-r from-amber-500/30 to-amber-600/30 hover:from-amber-500/40 hover:to-amber-600/40 text-amber-200 border border-amber-400/50 transition-all shadow-sm cursor-pointer"
                    >
                      <BookOpen className="size-3.5 text-amber-300" />
                      <span>
                        {lang === 'ar'
                          ? `استكشف تاريخ المخطوطات والروايات (${scriptureBook.id === 'quran' ? 'نص موحد' : `${scriptureBook.versionsCount} روايات`})`
                          : `Explore Textual History & Manuscripts (${scriptureBook.id === 'quran' ? '1 Preserved Text' : `${scriptureBook.versionsCount} Traditions`})`}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </section>

        {/* sacred topography & geography */}
        {p.topography && (
          <section aria-labelledby="topography-heading" className="glass mt-8 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 id="topography-heading" className="flex items-center gap-2 text-2xl font-semibold">
                <MapPin className="size-5 text-gold" aria-hidden="true" />
                {t('topographyTitle')}
              </h2>
              {p.topography.mapCoordinates && (
                <A
                  href={`/map?focus=${p.id}`}
                  className="btn btn-ghost text-xs border border-gold/30 hover:bg-gold/15"
                >
                  <Compass className="size-3.5 text-gold" />
                  <span>{t('viewMap')}</span>
                  <span className="font-mono text-gold-2">({p.topography.mapCoordinates.lat.toFixed(2)}°N, {p.topography.mapCoordinates.lng.toFixed(2)}°E)</span>
                </A>
              )}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* Historical Region */}
              <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gold uppercase">
                  <Globe className="size-3.5" />
                  <span>{t('region')}</span>
                </div>
                <p className="mt-2 text-base font-medium text-ink">{pick(p.topography.region)}</p>
              </div>

              {/* Modern Countries */}
              <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gold uppercase">
                  <Map className="size-3.5" />
                  <span>{t('modernCountries')}</span>
                </div>
                <p className="mt-2 text-base font-medium text-ink">{pick(p.topography.modernCountries)}</p>
              </div>
            </div>

            {/* Mission & Migration Route */}
            {p.topography.missionRoute && (
              <div className="mt-4 rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gold uppercase">
                  <Navigation className="size-3.5" />
                  <span>{t('missionRoute')}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-2 sm:text-base">{pick(p.topography.missionRoute)}</p>
              </div>
            )}

            {/* Burial Place / Tomb */}
            {p.topography.burialSite && (
              <div className="mt-4 rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gold uppercase">
                  <Landmark className="size-3.5" />
                  <span>{t('burialSite')}</span>
                </div>
                <div className="mt-2">
                  <FactText fact={p.topography.burialSite} />
                </div>
              </div>
            )}

            {/* Sacred Sites */}
            {p.topography.sacredSites && p.topography.sacredSites.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold tracking-wider text-ink-3 uppercase">{t('sacredSites')}</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {p.topography.sacredSites.map((site, sIdx) => {
                    const SiteIcon = site.type === 'mountain' ? Mountain : site.type === 'river' || site.type === 'sea' ? Waves : site.type === 'well' ? Droplets : site.type === 'city' ? Landmark : Compass
                    return (
                      <div key={sIdx} className="rounded-2xl border border-white/5 bg-night-surface/40 p-4 hover:border-gold/30 transition-colors">
                        <div className="flex items-center gap-2 text-gold">
                          <SiteIcon className="size-4 shrink-0" />
                          <span className="ar-name font-bold text-lg text-gold-2">{site.name.ar}</span>
                          {lang !== 'ar' && <span className="text-sm text-ink font-medium">· {pick(site.name)}</span>}
                        </div>
                        {site.desc && (
                          <p className="mt-2 text-xs leading-relaxed text-ink-3 sm:text-sm">{pick(site.desc)}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* chronology & dates */}
        {p.dates && (p.dates.born || p.dates.died || p.dates.hijriBorn || p.dates.hijriDied || p.dates.gregorianBorn || p.dates.gregorianDied) && (
          <section aria-labelledby="dates-heading" className="glass mt-8 rounded-3xl p-6 sm:p-8">
            <h2 id="dates-heading" className="flex items-center gap-2 text-2xl font-semibold">
              <Calendar className="size-5 text-gold" aria-hidden="true" />
              {t('dates')}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {(p.dates.born || p.dates.hijriBorn || p.dates.gregorianBorn) && (
                <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                  <span className="text-xs font-semibold tracking-wider text-gold uppercase">
                    {t('born')}
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {p.dates.hijriBorn && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink-3">{t('timelineHijri')}</span>
                        <span className="font-mono font-medium text-ink">{formatDate(p.dates.hijriBorn, lang)}</span>
                      </div>
                    )}
                    {p.dates.gregorianBorn && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink-3">{t('timelineGregorian')}</span>
                        <span className="font-mono font-medium text-ink">{formatDate(p.dates.gregorianBorn, lang)}</span>
                      </div>
                    )}
                    {p.dates.born && (
                      <div className="mt-2">
                        <FactText fact={p.dates.born} />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {(p.dates.died || p.dates.hijriDied || p.dates.gregorianDied) && (
                <div className="rounded-2xl border border-white/5 bg-night-surface/60 p-4">
                  <span className="text-xs font-semibold tracking-wider text-gold uppercase">
                    {t('died')}
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {p.dates.hijriDied && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink-3">{t('timelineHijri')}</span>
                        <span className="font-mono font-medium text-ink">{formatDate(p.dates.hijriDied, lang)}</span>
                      </div>
                    )}
                    {p.dates.gregorianDied && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ink-3">{t('timelineGregorian')}</span>
                        <span className="font-mono font-medium text-ink">{formatDate(p.dates.gregorianDied, lang)}</span>
                      </div>
                    )}
                    {p.dates.died && (
                      <div className="mt-2">
                        <FactText fact={p.dates.died} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* major life events */}
        {p.events && p.events.length > 0 && (
          <section aria-labelledby="events-heading" className="mt-12">
            <h2 id="events-heading" className="flex items-center gap-2 text-2xl font-semibold">
              <Milestone className="size-5 text-gold" aria-hidden="true" />
              {t('lifeEvents')}
            </h2>
            <div className="relative mt-8 space-y-8 border-s-2 border-gold/25 ps-6 ms-3">
              {p.events.map((ev) => (
                <div key={ev.id} className="group relative">
                  <span className="absolute -start-[31px] top-1.5 size-3.5 rounded-full border-2 border-night bg-gold shadow-[0_0_12px_rgba(233,198,123,0.8)]" aria-hidden="true" />
                  <div className="glass rounded-3xl p-6 transition-colors hover:border-gold/40">
                    <div className="flex flex-wrap items-center gap-2">
                      {ev.yearHijri && (
                        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-gold">
                          {formatDate(ev.yearHijri, lang)}
                        </span>
                      )}
                      {ev.yearBceCe && (
                        <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-xs text-ink-3">
                          {formatDate(ev.yearBceCe, lang)}
                        </span>
                      )}
                      {ev.era && (
                        <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-ink-3">
                          {pick(ev.era)}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-ink sm:text-xl">
                      <span className="ar-name gold-text me-2">{ev.title.ar}</span>
                      {lang !== 'ar' && <span>· {pick(ev.title)}</span>}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2 sm:text-base">
                      {pick(ev.desc)}
                    </p>
                    {ev.refs && (
                      <div className="mt-3">
                        <Refs refs={ev.refs} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* parents */}
        {p.parents && (p.parents.father || p.parents.mother || p.parents.fosterMother) && (
          <section aria-labelledby="parents-heading" className="mt-12">
            <h2 id="parents-heading" className="flex items-center gap-2 text-2xl font-semibold">
              <Users className="size-5 text-gold" aria-hidden="true" />
              {t('father')} & {t('mother')}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.parents.father && (
                <div className="glass rounded-3xl p-5">
                  <span className="text-xs font-semibold tracking-wider text-ink-3 uppercase">{t('father')}</span>
                  <div className="mt-2">
                    <p className="ar-name gold-text text-2xl font-bold">{p.parents.father.t.ar}</p>
                    <p className="text-sm text-ink">{pick(p.parents.father.t)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <LevelChip level={p.parents.father.l} />
                    {p.parents.father.r && <Refs refs={p.parents.father.r} />}
                  </div>
                </div>
              )}
              {p.parents.mother && (
                <div className="glass rounded-3xl p-5">
                  <span className="text-xs font-semibold tracking-wider text-ink-3 uppercase">{t('mother')}</span>
                  <div className="mt-2">
                    <p className="ar-name gold-text text-2xl font-bold">{p.parents.mother.t.ar}</p>
                    <p className="text-sm text-ink">{pick(p.parents.mother.t)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <LevelChip level={p.parents.mother.l} />
                    {p.parents.mother.r && <Refs refs={p.parents.mother.r} />}
                  </div>
                </div>
              )}
              {p.parents.fosterMother && (
                <div className="glass rounded-3xl p-5">
                  <span className="text-xs font-semibold tracking-wider text-ink-3 uppercase">{t('fosterMother')}</span>
                  <div className="mt-2">
                    <p className="ar-name gold-text text-2xl font-bold">{p.parents.fosterMother.t.ar}</p>
                    <p className="text-sm text-ink">{pick(p.parents.fosterMother.t)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <LevelChip level={p.parents.fosterMother.l} />
                    {p.parents.fosterMother.r && <Refs refs={p.parents.fosterMother.r} />}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* spouses */}
        {p.spouses && p.spouses.length > 0 && (
          <section aria-labelledby="spouses-heading" className="mt-12">
            <h2 id="spouses-heading" className="flex items-center gap-2 text-2xl font-semibold">
              <Heart className="size-5 text-rose-400" aria-hidden="true" />
              {t('spouses')}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.spouses.map((s, idx) => (
                <div key={idx} className="glass rounded-3xl border-rose-500/20 p-5">
                  <p className="ar-name text-2xl font-bold text-rose-200">{s.t.ar}</p>
                  <p className="text-sm text-ink">{pick(s.t)}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <LevelChip level={s.l} />
                    {s.r && <Refs refs={s.r} />}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* children */}
        {p.allChildren && p.allChildren.length > 0 && (
          <section aria-labelledby="children-heading" className="mt-12">
            <h2 id="children-heading" className="flex items-center gap-2 text-2xl font-semibold">
              <Baby className="size-5 text-emerald-400" aria-hidden="true" />
              {t('allChildren')}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.allChildren.map((c, idx) => (
                <div key={idx} className="glass rounded-3xl border-emerald-500/20 p-5">
                  <p className="ar-name text-2xl font-bold text-emerald-200">{c.t.ar}</p>
                  <p className="text-sm text-ink">{pick(c.t)}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <LevelChip level={c.l} />
                    {c.r && <Refs refs={c.r} />}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* siblings */}
        {p.siblings && p.siblings.length > 0 && (
          <section aria-labelledby="siblings-heading" className="mt-12">
            <h2 id="siblings-heading" className="flex items-center gap-2 text-2xl font-semibold">
              <Users className="size-5 text-amber-400" aria-hidden="true" />
              {t('brothers')}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.siblings.map((sib, idx) => (
                <div key={idx} className="glass rounded-3xl border-amber-500/20 p-5">
                  <p className="ar-name text-2xl font-bold text-amber-200">{sib.t.ar}</p>
                  <p className="text-sm text-ink">{pick(sib.t)}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <LevelChip level={sib.l} />
                    {sib.r && <Refs refs={sib.r} />}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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

      {showScriptureModal && scriptureBook && (
        <ScripturesModal
          initialBookId={scriptureBook.id}
          onClose={() => setShowScriptureModal(false)}
        />
      )}
    </article>
  )
}
