import { useEffect, useMemo, useRef, useState } from 'react'
import { CornerDownLeft, Search as SearchIcon } from 'lucide-react'
import { useI18n } from '../i18n'
import { people } from '../data/people'
import type { Person } from '../data/types'
import { hrefOf, navigate } from '../lib/router'

/** Remove Arabic diacritics and Latin accents so "ibrahim", "Ibrâhîm" and "إبْرَاهِيم" all match. */
export function fold(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[̀-ًͯ-ٰٟۖ-ۭ‘’'`ʿʾ-]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .toLowerCase()
}

function haystack(p: Person): string {
  const parts = [p.name.en, p.name.fr, p.name.ar, p.alt?.en, p.alt?.fr, p.sentTo?.t.en, p.sentTo?.t.fr, p.sentTo?.t.ar, p.title?.t.en, p.title?.t.fr, p.title?.t.ar]
  for (const s of p.signs ?? []) parts.push(s.t.en, s.t.fr, s.t.ar)
  return fold(parts.filter(Boolean).join(' | '))
}

const INDEX = people.map((p) => ({ p, h: haystack(p), n: fold(`${p.name.en} ${p.name.fr} ${p.name.ar} ${p.alt?.en ?? ''} ${p.alt?.fr ?? ''}`) }))

export function search(q: string): Person[] {
  const f = fold(q.trim())
  if (!f) return [...people].filter((p) => p.kind === 'prophet').sort((a, b) => a.order - b.order)
  return INDEX.filter((x) => x.h.includes(f))
    .sort((a, b) => Number(b.n.includes(f)) - Number(a.n.includes(f)) || a.p.order - b.p.order)
    .map((x) => x.p)
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, pick } = useI18n()
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const results = useMemo(() => search(q).slice(0, 12), [q])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      setQ('')
      setActive(0)
      requestAnimationFrame(() => input.current?.focus())
    }
    if (!open && d.open) d.close()
  }, [open])

  const go = (p?: Person) => {
    if (!p) return
    onClose()
    navigate(hrefOf({ name: 'person', id: p.id }))
  }

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      aria-label={t('search')}
      className="mx-auto mt-[12vh] w-[min(92vw,640px)] max-w-none overflow-hidden rounded-3xl border-0 bg-transparent p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="glass-strong rounded-3xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-5">
          <SearchIcon className="size-5 text-gold" aria-hidden="true" />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, results.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              } else if (e.key === 'Enter') go(results[active])
            }}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `sr-${results[active]!.id}` : undefined}
            className="h-16 w-full bg-transparent text-lg outline-none placeholder:text-ink-3"
          />
        </div>
        <ul id="search-results" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="p-6 text-center text-ink-3">{t('noResults')}</li>}
          {results.map((p, i) => (
            <li
              key={p.id}
              id={`sr-${p.id}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(p)}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 ${i === active ? 'bg-white/10' : ''}`}
            >
              <span className="ar-name gold-text w-24 shrink-0 text-2xl font-bold">{p.name.ar}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-ink">{pick(p.name)}</span>
                {p.sentTo && <span className="block truncate text-xs text-ink-3">{pick(p.sentTo.t)}</span>}
              </span>
              {i === active && <CornerDownLeft className="size-4 text-ink-3 rtl:-scale-x-100" aria-hidden="true" />}
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  )
}
