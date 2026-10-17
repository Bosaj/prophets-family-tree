import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Pause, Play, X } from 'lucide-react'
import { useI18n } from '../i18n'
import { arabicDigits, audioUrl, loadPassage, type Passage } from '../lib/quran'
import { parseRef, refLabel, refUrl } from '../data/sources'

/** Modal sheet that shows a Qur'an passage, loaded live, with translation and recitation. */
export function VerseSheet({ refId, onClose }: { refId: string | null; onClose: () => void }) {
  const { t, lang } = useI18n()
  const dialog = useRef<HTMLDialogElement>(null)
  const [state, setState] = useState<{ ref: string; data?: Passage; error?: boolean } | null>(null)
  const [playing, setPlaying] = useState<number | null>(null)
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (refId && !d.open) d.showModal()
    if (!refId && d.open) d.close()
  }, [refId])

  useEffect(() => {
    if (!refId) return
    let live = true
    setState({ ref: refId })
    loadPassage(refId, lang)
      .then((data) => live && setState({ ref: refId, data }))
      .catch(() => live && setState({ ref: refId, error: true }))
    return () => {
      live = false
    }
  }, [refId, lang])

  useEffect(() => {
    if (!refId) {
      audio.current?.pause()
      setPlaying(null)
    }
  }, [refId])

  const play = (i: number) => {
    const ayahs = state?.data?.ayahs
    if (!ayahs) return
    if (playing === i) {
      audio.current?.pause()
      setPlaying(null)
      return
    }
    audio.current?.pause()
    const el = new Audio(audioUrl(ayahs[i]!.number))
    audio.current = el
    el.onended = () => (i + 1 < ayahs.length ? play(i + 1) : setPlaying(null))
    el.onerror = () => setPlaying(null)
    void el.play().catch(() => setPlaying(null))
    setPlaying(i)
  }

  const p = refId ? parseRef(refId) : null
  const url = refId ? refUrl(refId) : null

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      aria-labelledby="verse-title"
      className="m-0 mt-auto max-h-[88dvh] w-full max-w-none overflow-hidden rounded-t-3xl border-0 bg-transparent p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:m-auto sm:max-h-[84dvh] sm:max-w-2xl sm:rounded-3xl"
    >
      <div className="glass-strong flex max-h-[88dvh] flex-col sm:max-h-[84dvh] sm:rounded-3xl">
        <header className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div>
            <p className="kicker">{t('readQuran')}</p>
            <h2 id="verse-title" className="mt-1 text-lg font-semibold">
              {state?.data ? (
                <>
                  <span className="ar-name">{state.data.surahName}</span>
                  <span className="mx-2 text-ink-3">·</span>
                </>
              ) : null}
              <bdi>{refId ? refLabel(refId, lang) : ''}</bdi>
            </h2>
          </div>
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-full border border-white/10 hover:bg-white/10" aria-label={t('close')}>
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-5">
          {!state?.data && !state?.error && <p className="py-10 text-center text-ink-3">{t('loading')}</p>}
          {state?.error && <p className="py-10 text-center text-lvl-disputed">{t('verseError')}</p>}
          {state?.data && (
            <ol className="space-y-6">
              {state.data.ayahs.map((a, i) => (
                <li key={a.number} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                  <p className="quran-text text-gold-2" lang="ar">
                    {a.arabic} <span className="text-gold-3">﴿{arabicDigits(a.ayah)}﴾</span>
                  </p>
                  {a.translation && (
                    <p lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`mt-3 leading-relaxed text-ink-2 ${lang === 'ar' ? 'naskh text-lg' : 'text-[0.95rem]'}`}>
                      {a.translation}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <button type="button" onClick={() => play(i)} className="ref" aria-pressed={playing === i}>
                      {playing === i ? <Pause className="size-3" aria-hidden="true" /> : <Play className="size-3" aria-hidden="true" />}
                      {playing === i ? t('pause') : t('listen')} · <bdi>{a.surah}:{a.ayah}</bdi>
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}
          {p?.kind === 'quran' && p.to - p.a + 1 > 12 && state?.data && (
            <p className="mt-4 text-center text-sm text-ink-3">
              <bdi>{p.s}:{p.a}–{p.a + 11}</bdi> / <bdi>{p.s}:{p.a}–{p.to}</bdi>
            </p>
          )}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3 text-xs text-ink-3">
          <span>
            {t('translation')} · {t('recitation')}
          </span>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gold hover:text-gold-2">
              {t('openQuranCom')} <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          )}
        </footer>
      </div>
    </dialog>
  )
}
