import { useState, useMemo, useRef } from 'react'
import {
  Search,
  BookOpen,
  ExternalLink,
  Sparkles,
  FileText,
  Clock,
  CheckCircle,
  Play,
  Pause,
} from 'lucide-react'
import { useI18n } from '../i18n'
import {
  SCIENTIFIC_FACTS,
  SCIENCE_CATEGORIES,
  type ScienceCategory,
} from '../data/science'
import { audioUrl, loadPassage } from '../lib/quran'

export function ScienceView() {
  const { lang, pick } = useI18n()
  const [selectedCat, setSelectedCat] = useState<ScienceCategory | 'all'>('all')
  const [query, setQuery] = useState('')

  // Qur'an Verse Recitation Audio State
  const [playingAyahId, setPlayingAyahId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playVerseAudio = async (verseRef: string, factId: string) => {
    if (playingAyahId === factId) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setPlayingAyahId(null)
      return
    }

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    try {
      const passage = await loadPassage(verseRef, lang)
      if (passage.ayahs.length > 0) {
        const firstAyah = passage.ayahs[0]!
        const url = audioUrl(firstAyah.number)
        const audio = new Audio(url)
        audioRef.current = audio
        setPlayingAyahId(factId)

        audio.onended = () => {
          setPlayingAyahId(null)
          audioRef.current = null
        }
        audio.onerror = () => {
          setPlayingAyahId(null)
          audioRef.current = null
        }

        await audio.play()
      }
    } catch {
      setPlayingAyahId(null)
      audioRef.current = null
    }
  }

  const filteredFacts = useMemo(() => {
    return SCIENTIFIC_FACTS.filter((f) => {
      if (selectedCat !== 'all' && f.category !== selectedCat) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        f.title.en.toLowerCase().includes(q) ||
        f.title.fr.toLowerCase().includes(q) ||
        f.title.ar.includes(q) ||
        f.subtitle.en.toLowerCase().includes(q) ||
        f.subtitle.ar.includes(q) ||
        f.modernDiscovery.en.toLowerCase().includes(q) ||
        f.papers.some(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.authors.toLowerCase().includes(q) ||
            p.journal.toLowerCase().includes(q)
        )
      )
    })
  }, [selectedCat, query])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-sky-950/30 via-night-2 to-night-1 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -end-16 -top-16 size-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -start-16 -bottom-16 size-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300 mb-3 shadow-sm">
              <Sparkles className="size-3.5 text-amber-400" />
              <span>
                {lang === 'ar'
                  ? 'آيات وأحاديث يقرؤها بعض المفسرين مع الاكتشافات الحديثة'
                  : lang === 'fr'
                  ? 'Versets et hadiths que certains commentateurs lisent à la lumière des découvertes modernes'
                  : 'Verses and hadith that some commentators read alongside modern findings'}
              </span>
            </div>
            <h1 className="ar-name text-3xl sm:text-5xl font-extrabold tracking-tight text-ink mb-3 gold-text">
              {lang === 'ar'
                ? 'القرآن والسنة والعلم الحديث'
                : lang === 'fr'
                ? 'Le Coran, la Sunna et la science moderne'
                : 'The Qur’an, the Sunnah and Modern Science'}
            </h1>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              {lang === 'ar'
                ? 'كل بطاقة تضع الآية أو الحديث بجانب بحث علمي حقيقي منشور برابط DOI تم التحقق منه.'
                : lang === 'fr'
                ? 'Chaque fiche place un verset ou un hadith à côté d’une recherche réellement publiée, avec un lien DOI vérifié.'
                : 'Each card places a verse or hadith next to real published research, with a checked DOI link.'}
            </p>
            <p role="note" className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-100/90 sm:text-sm">
              {lang === 'ar'
                ? 'تنبيه: ربط آية باكتشاف حديث تفسيرٌ علميٌّ اجتهاديٌّ (التفسير العلمي) وليس نصًّا قطعيًّا، وقد حذّر كثير من العلماء من حمل القرآن على نظريات قد تتغير. الآية صادقة في كل حال، والبحث العلمي يُقرأ على أنه سياق لا برهان.'
                : lang === 'fr'
                ? 'Attention : relier un verset à une découverte moderne est une interprétation (tafsir ‘ilmi), non un texte catégorique. Beaucoup de savants mettent en garde contre le fait de lier le Coran à des théories qui peuvent changer. Le verset reste vrai dans tous les cas ; la recherche est un contexte, pas une preuve.'
                : 'Note: linking a verse to a modern discovery is an interpretation (tafsir ‘ilmi), not a definitive text. Many scholars warn against tying the Qur’an to theories that may change. The verse stays true either way; the research is context, not proof.'}
            </p>
          </div>

          {/* Peer-Reviewed Credibility Badge */}
          <div className="glass rounded-2xl p-5 border border-sky-500/20 text-center shrink-0">
            <span className="block text-3xl font-bold font-mono text-sky-400">{SCIENTIFIC_FACTS.reduce((n, f) => n + f.papers.length, 0)}</span>
            <span className="text-xs font-semibold text-ink-1 block mt-0.5">
              {lang === 'ar' ? 'بحثًا منشورًا، روابطها مُتحقَّق منها' : lang === 'fr' ? 'publications, liens vérifiés' : 'publications, links checked'}
            </span>
            <span className="text-[0.68rem] text-ink-3 block mt-1">
              Nature · Lancet · PNAS
            </span>
          </div>
        </div>
      </div>

      {/* Categories Bar & Search */}
      <div className="mb-8 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {SCIENCE_CATEGORIES.map((cat) => {
            const isSelected = selectedCat === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gold text-night font-bold shadow-md scale-102'
                    : 'glass text-ink-2 hover:text-ink hover:border-white/20'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{pick(cat.label)}</span>
              </button>
            )
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'ابحث بالآية، السورة، التخصص، الباحث أو المجلة العلمية...'
                : 'Search by verse, topic, scientist, or journal...'
            }
            className="w-full rounded-full border border-white/10 bg-white/5 py-2 pe-4 ps-10 text-xs sm:text-sm text-ink placeholder-ink-3 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      {/* Facts List Grid */}
      <div className="space-y-6">
        {filteredFacts.map((fact) => {
          const hasQuranVerse = Boolean(fact.quranVerseText)
          const isReciting = playingAyahId === fact.id

          return (
            <article
              key={fact.id}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6 sm:p-8 transition-all hover:border-sky-500/40 hover:bg-white/[0.05] shadow-lg"
            >
              {/* Header Meta: Category Pill & Surah Ref */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-sky-500/15 border border-sky-400/30 px-3 py-1 text-xs font-bold text-sky-300 flex items-center gap-1.5">
                    <Sparkles className="size-3 text-amber-400" />
                    <span>{pick(fact.title)}</span>
                  </span>
                  {fact.quranRefs && (
                    <span className="font-mono text-xs text-amber-400/90 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5">
                      {lang === 'ar' ? 'سورة ' : 'Surah '}
                      {fact.quranVerseText ? pick(fact.quranVerseText.surahName) : ''} [{fact.quranRefs.join(', ')}]
                    </span>
                  )}
                </div>

                {hasQuranVerse && fact.quranRefs?.[0] && (
                  <button
                    type="button"
                    onClick={() => playVerseAudio(fact.quranRefs![0]!, fact.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isReciting
                        ? 'border border-amber-400 bg-amber-500/25 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-pulse'
                        : 'border border-white/15 bg-white/5 text-ink-2 hover:text-ink hover:border-white/30'
                    }`}
                  >
                    {isReciting ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                    <span>{isReciting ? (lang === 'ar' ? 'إيقاف التلاوة' : 'Pause Recitation') : (lang === 'ar' ? 'استماع للآية' : 'Recite Ayah')}</span>
                  </button>
                )}
              </div>

              {/* Subtitle / Key Claim */}
              <p className="text-sm sm:text-base text-ink-1 font-medium mb-5 leading-relaxed">
                {pick(fact.subtitle)}
              </p>

              {/* Quran Verse Display Box */}
              {fact.quranVerseText && (
                <div className="mb-6 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-5">
                  <div className="flex items-center justify-between text-xs text-amber-300/80 mb-2 font-mono">
                    <span className="flex items-center gap-1">
                      <BookOpen className="size-3.5 text-amber-400" />
                      <span>{lang === 'ar' ? 'النص القرآني الشريف' : 'Holy Qur\'an Verse'}</span>
                    </span>
                    <span>{fact.quranVerseText.ayah}</span>
                  </div>
                  <p className="ar-name text-xl sm:text-2xl font-serif text-amber-100 leading-loose text-center sm:text-start mb-3 drop-shadow-sm font-semibold">
                    ﴿ {fact.quranVerseText.ar} ﴾
                  </p>
                  {lang !== 'ar' && (
                    <p className="text-xs sm:text-sm text-ink-2 italic font-serif leading-relaxed border-t border-amber-500/10 pt-2.5">
                      "{lang === 'fr' ? fact.quranVerseText.fr : fact.quranVerseText.en}"
                    </p>
                  )}
                </div>
              )}

              {/* Hadith Citation if present */}
              {fact.hadithRefs && fact.hadithRefs.length > 0 && (
                <div className="mb-6 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-4.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                    <Sparkles className="size-3.5" />
                    <span>{lang === 'ar' ? 'الحديث النبوي الصحيح' : 'Authentic Prophetic Hadith'}</span>
                  </div>
                  {fact.hadithRefs.map((h, idx) => (
                    <div key={idx} className="space-y-1.5 text-xs">
                      <p className="ar-name text-sm sm:text-base text-emerald-100 font-serif leading-relaxed">
                        {h.text.ar}
                      </p>
                      {lang !== 'ar' && (
                        <p className="text-xs text-ink-2 italic">
                          "{lang === 'fr' ? h.text.fr : h.text.en}"
                        </p>
                      )}
                      <div className="text-[0.68rem] text-emerald-400/80 font-mono text-end pt-1">
                        {h.book} ({h.number})
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Historical Context vs Modern Discovery Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-ink-3 uppercase tracking-wider mb-2">
                    <Clock className="size-3.5 text-amber-400" />
                    <span>{lang === 'ar' ? 'المعتقدات السائدة في عصر الرسالة (القرن 7م)' : '7th-Century Historical Beliefs'}</span>
                  </span>
                  <p className="text-ink-2 leading-relaxed">
                    {pick(fact.historicalContext)}
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-500/20 bg-sky-950/20 p-4 text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-sky-400 uppercase tracking-wider mb-2">
                    <CheckCircle className="size-3.5 text-sky-400" />
                    <span>{lang === 'ar' ? 'الاكتشاف العلمي الحديث وتطبيقاته' : 'Modern Scientific Discovery'}</span>
                  </span>
                  <p className="text-ink-1 leading-relaxed">
                    {pick(fact.modernDiscovery)}
                  </p>
                </div>
              </div>

              {/* Peer-Reviewed Research Papers Section */}
              <div className="border-t border-white/10 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-ink-2">
                    <FileText className="size-3.5 text-sky-400" />
                    <span>
                      {lang === 'ar'
                        ? 'الأبحاث العلمية المحكمة والمصادر الدولية المعتمدة'
                        : 'Peer-Reviewed Scientific Papers & Official DOIs'}
                    </span>
                  </div>
                  <span className="text-[0.68rem] font-mono text-ink-3">
                    {fact.papers.length} {fact.papers.length === 1 ? 'Paper' : 'Papers'}
                  </span>
                </div>

                <div className="space-y-3">
                  {fact.papers.map((paper, pIdx) => (
                    <div
                      key={pIdx}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-sky-500/30 hover:bg-white/[0.04]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-ink">
                            {paper.title}
                          </h4>
                          <p className="text-[0.72rem] text-ink-3 font-mono mt-0.5">
                            <span className="text-sky-300 font-semibold">{paper.authors}</span> · <span className="italic">{paper.journal}</span> ({paper.year})
                          </p>
                        </div>
                        <a
                          href={paper.doiOrUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 hover:text-sky-200 transition-colors shrink-0 w-fit"
                        >
                          <span>DOI Link</span>
                          <ExternalLink className="size-3" />
                        </a>
                      </div>

                      <p className="text-xs text-ink-2 leading-relaxed bg-black/20 rounded-xl p-2.5 border border-white/5">
                        <strong className="text-sky-400 font-medium">
                          {lang === 'ar' ? 'الخلاصة العلمية المعتمدة: ' : 'Key Finding: '}
                        </strong>
                        {pick(paper.keyFinding)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
