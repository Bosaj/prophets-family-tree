import { createContext, useContext, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { BookOpen, ExternalLink, ScrollText } from 'lucide-react'
import { navigate, withBase } from '../lib/router'
import { useI18n } from '../i18n'
import { LEVEL_TEXT } from '../i18n/strings'
import { parseRef, refLabel, refUrl } from '../data/sources'

/** Public asset prefix: '/' on Vercel, '/prophets-family-tree/' on GitHub Pages. */
export const ASSET = import.meta.env.BASE_URL
import type { Fact, Level, Person, Ref } from '../data/types'

/** In-app link: plain <a> for crawlers and middle-click, client-side navigation otherwise. */
export function A({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const fullHref = withBase(href)
  return (
    <a
      href={fullHref}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        navigate(fullHref)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

const LEVEL_COLOR: Record<Level, string> = {
  quran: 'text-lvl-quran',
  hadith: 'text-lvl-hadith',
  tradition: 'text-lvl-tradition',
  disputed: 'text-lvl-disputed',
}
export const LEVEL_STROKE: Record<Level, string> = {
  quran: 'var(--color-lvl-quran)',
  hadith: 'var(--color-lvl-hadith)',
  tradition: 'var(--color-lvl-tradition)',
  disputed: 'var(--color-lvl-disputed)',
}

export function LevelChip({ level, className = '' }: { level: Level; className?: string }) {
  const { lang } = useI18n()
  const info = LEVEL_TEXT[lang][level]
  return (
    <span className={`chip ${LEVEL_COLOR[level]} ${className}`} title={info.desc}>
      <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-current" />
      {info.name}
    </span>
  )
}

/** Opens Qur'an passages in the verse sheet. Provided by <App>. */
export const VerseContext = createContext<(ref: Ref) => void>(() => {})
export const useOpenVerse = () => useContext(VerseContext)

export function RefChip({ r }: { r: Ref }) {
  const { lang } = useI18n()
  const open = useOpenVerse()
  const p = parseRef(r)
  const label = refLabel(r, lang)
  if (p.kind === 'quran') {
    return (
      <button type="button" className="ref" onClick={() => open(r)}>
        <BookOpen aria-hidden="true" className="size-3" />
        <bdi>{label}</bdi>
      </button>
    )
  }
  const url = refUrl(r)
  if (url) {
    return (
      <a className="ref" href={url} target="_blank" rel="noopener noreferrer">
        <ScrollText aria-hidden="true" className="size-3" />
        <bdi>{label}</bdi>
        <ExternalLink aria-hidden="true" className="size-2.5 opacity-60" />
      </a>
    )
  }
  return (
    <span className="ref cursor-default">
      <ScrollText aria-hidden="true" className="size-3" />
      <bdi>{label}</bdi>
    </span>
  )
}

export function Refs({ refs }: { refs?: Ref[] }) {
  if (!refs?.length) return null
  return (
    <span className="mt-2 flex flex-wrap gap-1.5">
      {refs.map((r) => (
        <RefChip key={r} r={r} />
      ))}
    </span>
  )
}

/** A sourced statement: text, level chip, references. */
export function FactText({ fact, className = '' }: { fact: Fact; className?: string }) {
  const { pick } = useI18n()
  return (
    <div className={className}>
      <p className="leading-relaxed text-ink">{pick(fact.t)}</p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <LevelChip level={fact.l} />
        {fact.r?.map((r) => (
          <RefChip key={r} r={r} />
        ))}
      </div>
    </div>
  )
}

export function Section({ id, kicker, title, lead, children, className = '' }: { id?: string; kicker: string; title: string; lead?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="kicker">{kicker}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">{title}</h2>
        {lead && <p className="mt-5 text-base leading-relaxed text-pretty text-ink-2 sm:text-lg">{lead}</p>}
      </div>
      {children}
    </section>
  )
}

/** Scene image with a cinematic fallback gradient when a person has no picture. */
export function Scene({ image, className = '', alt = '', eager = false, sizes = '100vw' }: { image?: string; className?: string; alt?: string; eager?: boolean; sizes?: string }) {
  if (!image) {
    return (
      <div aria-hidden="true" className={`bg-[radial-gradient(120%_90%_at_50%_0%,#2a2b6a_0%,#0b0e26_55%,#04050d_100%)] ${className}`}>
        <div className="h-full w-full bg-[radial-gradient(1px_1px_at_20%_30%,#fff8_50%,transparent_51%),radial-gradient(1px_1px_at_70%_20%,#fff6_50%,transparent_51%),radial-gradient(1.5px_1.5px_at_40%_70%,#ffe9b380_50%,transparent_51%),radial-gradient(1px_1px_at_85%_60%,#fff5_50%,transparent_51%)]" />
      </div>
    )
  }
  return (
    <picture>
      <source type="image/avif" srcSet={`${ASSET}img/${image}-960.avif 960w, ${ASSET}img/${image}-2048.avif 2048w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${ASSET}img/${image}-960.webp 960w, ${ASSET}img/${image}-2048.webp 2048w`} sizes={sizes} />
      <img
        src={`${ASSET}img/${image}-2048.webp`}
        alt={alt}
        width={2048}
        height={1152}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        className={`object-cover ${className}`}
      />
    </picture>
  )
}

/** The line under a big Arabic name: the Latin name (Arabic UI) or the local name plus its Biblical form. */
export function SubName({ p, className = '' }: { p: Person; className?: string }) {
  const { lang, pick } = useI18n()
  if (lang === 'ar') return <span dir="ltr" className={className}>{p.alt?.en ?? p.name.en}</span>
  return (
    <span className={className}>
      {pick(p.name)}
      {p.alt && <span className="text-ink-3"> · {pick(p.alt)}</span>}
    </span>
  )
}
