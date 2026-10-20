import { ArrowRight, BookOpen, ChevronDown, Compass, GitBranch, Hourglass, Leaf, Ruler, ShieldCheck } from 'lucide-react'
import { useI18n } from '../i18n'
import { LEVEL_TEXT } from '../i18n/strings'
import { byId, heavens, people, prophets, ululAzm } from '../data/people'
import { LEVELS } from '../data/sources'
import { hrefOf } from '../lib/router'
import { A, LevelChip, Refs, Scene, Section } from './ui'
import { Tree } from './Tree'
import { VERIFIED_REFS } from '../data/verified'

export function Home() {
  const { t, pick, lang } = useI18n()
  const chapters = [...people].filter((p) => p.kind === 'prophet').sort((a, b) => a.order - b.order)

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 sm:items-center sm:pb-0">
        <div className="absolute inset-0 -z-10">
          <Scene image="hero" eager className="animate-drift h-full w-full" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/20 to-night" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent_0%,rgb(4_5_13/0.55)_100%)]" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 pt-28 sm:px-6">
          <div className="reveal max-w-3xl">
            <p className="kicker">{t('tagline')}</p>
            <h1 className="mt-5">
              <span className="ar-name gold-text block text-[clamp(3.6rem,2rem+8vw,8.5rem)] leading-[1.3] font-bold drop-shadow-[0_8px_40px_rgb(233_198_123/0.25)] pt-6 pb-2 -mt-6 -mb-2">شجرة الأنبياء</span>
              {lang !== 'ar' && <span className="mt-2 block text-2xl font-light tracking-[0.3em] text-ink/90 uppercase sm:text-3xl">Shajara</span>}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-ink-2 sm:text-lg">{t('heroLead')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <A href="/tree" className="btn btn-gold">
                <GitBranch className="size-4" aria-hidden="true" /> {t('exploreTree')}
              </A>
              <A href="/map" className="btn btn-ghost">
                <Compass className="size-4" aria-hidden="true" /> {t('mapView')}
              </A>
              <A href="/stature" className="btn btn-ghost">
                <Ruler className="size-4" aria-hidden="true" /> {t('navStature')}
              </A>
              <A href="/stories" className="btn btn-ghost">
                <BookOpen className="size-4" aria-hidden="true" /> {t('navStories')}
              </A>
              <A href="/nature" className="btn btn-ghost">
                <Leaf className="size-4" aria-hidden="true" /> {t('navNature')}
              </A>
              <A href="/timeline" className="btn btn-ghost">
                <Hourglass className="size-4" aria-hidden="true" /> {t('openTimeline')}
              </A>
            </div>
          </div>

          <dl className="reveal mt-14 grid max-w-3xl grid-cols-3 gap-3 [animation-delay:200ms] sm:gap-5">
            {[
              { n: prophets.length, k: t('statProphets') },
              { n: 5, k: t('statUlul') },
              { n: VERIFIED_REFS, k: t('statRefs') },
            ].map((s) => (
              <div key={s.k} className="glass flex flex-col-reverse rounded-2xl p-3 sm:p-5">
                <dt className="mt-1 text-[0.7rem] leading-snug text-ink-3 sm:text-sm">{s.k}</dt>
                <dd className="gold-text text-2xl font-bold tabular-nums sm:text-4xl">{s.n}</dd>
              </div>
            ))}
          </dl>
        </div>
        <a href="#chapters" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-ink-3 hover:text-gold sm:block" aria-label={t('chaptersTitle')}>
          <ChevronDown className="size-6 animate-bounce" aria-hidden="true" />
        </a>
      </section>

      {/* CHAPTERS */}
      <Section id="chapters" kicker={t('chaptersKicker')} title={t('chaptersTitle')} lead={t('chaptersLead')}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((p, i) => (
            <li key={p.id} className={i === 0 || i === chapters.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <A href={hrefOf({ name: 'person', id: p.id })} className="group relative block aspect-[16/11] overflow-hidden rounded-3xl border border-white/10 bg-night-2">
                <Scene image={p.image} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="h-full w-full transition-transform duration-[1.6s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(60%_50%_at_50%_100%,rgb(233_198_123/0.18),transparent)]" />
                <span className="absolute start-4 top-4 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[0.7rem] text-ink-2 tabular-nums backdrop-blur">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {p.ululAzm && <span className="absolute end-4 top-4 rounded-full border border-gold/40 bg-black/30 px-2.5 py-1 text-[0.7rem] text-gold-2 backdrop-blur">{t('ululBadge')}</span>}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="ar-name gold-text text-4xl font-bold">{p.name.ar}</p>
                  <p className="mt-1 flex items-center gap-2 text-ink">
                    <span className="font-semibold">{pick(p.name)}</span>
                    {p.alt && lang !== 'ar' && <span className="text-sm text-ink-3">· {pick(p.alt)}</span>}
                  </p>
                  {p.sentTo && <p className="mt-1.5 line-clamp-1 text-sm text-ink-2">{pick(p.sentTo.t)}</p>}
                </div>
              </A>
            </li>
          ))}
        </ol>
      </Section>

      {/* TREE TEASER */}
      <Section kicker={t('treeKicker')} title={t('treeTitle')} lead={t('treeLead')}>
        <Tree mini />
        <div className="mt-6 text-center">
          <A href="/tree" className="btn btn-ghost">
            {t('treeOpen')} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </A>
        </div>
      </Section>

      {/* SEVEN HEAVENS */}
      <Section kicker={t('heavensKicker')} title={t('heavensTitle')} lead={t('heavensLead')}>
        <Heavens />
        <div className="mt-6 flex justify-center">
          <Refs refs={['17:1', '53:13-18', 'bukhari:3207']} />
        </div>
      </Section>

      {/* ULUL AZM */}
      <Section kicker={t('ululKicker')} title={t('ululTitle')} lead={pick(ululAzm.t)}>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {['nuh', 'ibrahim', 'musa', 'isa', 'muhammad'].map((id) => {
            const p = byId.get(id)!
            return (
              <li key={id}>
                <A href={hrefOf({ name: 'person', id })} className="glass group flex h-full flex-col items-center rounded-3xl px-3 py-6 text-center transition-colors hover:border-gold/40">
                  <span className="ar-name gold-text text-3xl font-bold transition-transform duration-500 group-hover:-translate-y-0.5">{p.name.ar}</span>
                  <span className="mt-2 text-sm text-ink">{pick(p.name)}</span>
                  {p.title && <span className="mt-2 line-clamp-2 text-xs text-ink-3">{pick(p.title.t)}</span>}
                </A>
              </li>
            )
          })}
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
          <LevelChip level={ululAzm.l} />
          <Refs refs={ululAzm.r} />
        </div>
      </Section>

      {/* STATURE & STORIES TEASERS */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-strong relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all hover:border-gold/40 sm:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold-2">
                  <Ruler className="size-5" />
                </span>
                <div>
                  <p className="kicker">{t('statureKicker')}</p>
                  <h3 className="text-xl font-bold text-ink sm:text-2xl">{t('statureTitle')}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{t('statureLead')}</p>
            </div>
            <div className="mt-6">
              <A href="/stature" className="btn btn-ghost text-sm">
                {t('navStature')} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </A>
            </div>
          </div>

          <div className="glass-strong relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all hover:border-gold/40 sm:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold-2">
                  <BookOpen className="size-5" />
                </span>
                <div>
                  <p className="kicker">{t('storiesKicker')}</p>
                  <h3 className="text-xl font-bold text-ink sm:text-2xl">{t('storiesTitle')}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{t('storiesLead')}</p>
            </div>
            <div className="mt-6">
              <A href="/stories" className="btn btn-ghost text-sm">
                {t('navStories')} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </A>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <Section kicker={t('methodKicker')} title={t('methodTitle')} lead={t('methodLead')}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LEVELS.map((l) => (
            <li key={l} className="glass rounded-3xl p-5">
              <LevelChip level={l} />
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{LEVEL_TEXT[lang][l].desc}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-ink-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
          {t('noImages')}
        </p>
        <div className="mt-6 text-center">
          <A href="/sources" className="btn btn-ghost">
            {t('methodOpen')} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </A>
        </div>
      </Section>
    </>
  )
}

/** Seven concentric orbits; each heaven shows the prophet(s) met there. */
function Heavens() {
  const { pick, t } = useI18n()
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[640px]">
      <svg viewBox="-320 -320 640 640" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="core" r="50%">
            <stop offset="0" stopColor="#fff4d0" />
            <stop offset="0.4" stopColor="rgb(233 198 123 / 0.6)" />
            <stop offset="1" stopColor="rgb(233 198 123 / 0)" />
          </radialGradient>
        </defs>
        <circle r="70" fill="url(#core)" />
        {heavens.map((h) => (
          <circle key={h.n} r={50 + h.n * 37} fill="none" stroke="rgb(233 198 123)" strokeOpacity={0.12 + h.n * 0.04} strokeWidth={1} strokeDasharray={h.n % 2 ? '2 6' : undefined} />
        ))}
      </svg>
      <ol className="absolute inset-0">
        {heavens.map((h, i) => {
          const radius = 50 + h.n * 37
          const angle = -90 + i * 51.4
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius
          return (
            <li key={h.n} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + (x / 640) * 100}%`, top: `${50 + (y / 640) * 100}%` }}>
              <div className="glass-strong flex flex-col items-center rounded-2xl px-2.5 py-1.5 text-center shadow-[0_0_30px_-8px_rgb(233_198_123/0.5)] sm:px-3.5 sm:py-2">
                <span className="text-[0.6rem] text-gold sm:text-[0.68rem]">{t('heavenBadge', { n: h.n })}</span>
                {h.ids.map((id) => (
                  <A key={id} href={hrefOf({ name: 'person', id })} className="ar-name inline-flex min-h-6 min-w-6 items-center justify-center px-1 text-sm font-semibold text-ink hover:text-gold-2 sm:text-lg">
                    {byId.get(id)!.name.ar}
                    <span className="sr-only"> — {pick(byId.get(id)!.name)}</span>
                  </A>
                ))}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
