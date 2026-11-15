import { useEffect, useRef, useState, type RefObject } from 'react'
import { FileImage, FileType2, ImageDown, Loader2, Printer } from 'lucide-react'
import { tx, useI18n } from '../i18n'

type Format = 'svg' | 'png' | 'pdf'

/** "Poster" menu for the tree: SVG, high-resolution PNG, or the print dialog (save as PDF). */
export function PosterButton({ svg, content }: { svg: RefObject<SVGSVGElement | null>; content: RefObject<SVGGElement | null> }) {
  const { lang } = useI18n()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState<Format | null>(null)
  const [failed, setFailed] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const title = tx(lang, 'The family tree of the prophets', 'L’arbre généalogique des prophètes', 'شجرة نسب الأنبياء', 'El árbol genealógico de los profetas')
  const subtitle = tx(
    lang,
    'From Adam to Muhammad ﷺ, after the Qur’an, the hadith and the classical historians',
    'D’Adam à Muhammad ﷺ, d’après le Coran, les hadiths et les historiens classiques',
    'من آدم إلى محمد ﷺ، من القرآن والحديث وكتب المؤرخين',
    'De Adán a Muhammad ﷺ, según el Corán, los hadices y los historiadores clásicos',
  )
  const footer = 'shajara-prophets.vercel.app'

  const run = async (f: Format) => {
    if (!svg.current || !content.current) return
    setBusy(f)
    setFailed(false)
    try {
      const { posterSvg, downloadPng, downloadSvg, printPoster } = await import('../lib/poster')
      const p = await posterSvg(svg.current, content.current, { title, subtitle, footer, rtl: lang === 'ar' })
      const name = `shajara-tree-${lang}`
      if (f === 'svg') downloadSvg(p.markup, `${name}.svg`)
      else if (f === 'png') await downloadPng(p.markup, p.width, p.height, `${name}.png`)
      else if (!printPoster(p.markup, p.width, p.height, title)) setFailed(true)
      setOpen(false)
    } catch {
      setFailed(true)
    } finally {
      setBusy(null)
    }
  }

  const label = tx(lang, 'Poster', 'Affiche', 'ملصق', 'Póster')
  const items: { f: Format; icon: typeof FileImage; text: string }[] = [
    { f: 'svg', icon: FileType2, text: tx(lang, 'SVG (any size, for printing)', 'SVG (toute taille, pour l’impression)', 'SVG (بأي حجم، للطباعة)', 'SVG (cualquier tamaño, para imprimir)') },
    { f: 'png', icon: FileImage, text: tx(lang, 'PNG (high resolution)', 'PNG (haute résolution)', 'PNG (دقة عالية)', 'PNG (alta resolución)') },
    { f: 'pdf', icon: Printer, text: tx(lang, 'Print or save as PDF', 'Imprimer ou enregistrer en PDF', 'طباعة أو حفظ PDF', 'Imprimir o guardar como PDF') },
  ]

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="glass flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-gold shadow-md transition-colors hover:border-gold/50 hover:bg-gold/15"
        title={tx(lang, 'Download the whole tree as a poster', 'Télécharger tout l’arbre en affiche', 'تنزيل الشجرة كاملة ملصقًا', 'Descargar todo el árbol como póster')}
      >
        {busy ? <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> : <ImageDown className="size-3.5" aria-hidden="true" />}
        <span className="hidden sm:inline">{label}</span>
      </button>
      {open && (
        <div role="menu" className="glass-strong absolute bottom-full end-0 z-40 mb-2 w-64 rounded-2xl p-1.5 shadow-2xl">
          {items.map(({ f, icon: Icon, text }) => (
            <button
              key={f}
              type="button"
              role="menuitem"
              disabled={busy !== null}
              onClick={() => void run(f)}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-start text-sm text-ink transition-colors hover:bg-gold/10 disabled:opacity-50"
            >
              <Icon className="size-4 shrink-0 text-gold" aria-hidden="true" /> {text}
            </button>
          ))}
          <p className="px-3 pb-1.5 pt-1 text-[0.7rem] leading-snug text-ink-3">
            {tx(lang, 'The whole tree, labels in the current language.', 'Tout l’arbre, avec les noms dans la langue choisie.', 'الشجرة كاملة بأسماء اللغة الحالية.', 'Todo el árbol, con los nombres en el idioma actual.')}
          </p>
          {failed && <p className="px-3 pb-1.5 text-[0.7rem] text-lvl-disputed">{tx(lang, 'The export failed. Please try again.', 'L’export a échoué. Réessayez.', 'تعذّر التصدير، حاول مرة أخرى.', 'La exportación falló. Inténtalo de nuevo.')}</p>}
        </div>
      )}
    </div>
  )
}
