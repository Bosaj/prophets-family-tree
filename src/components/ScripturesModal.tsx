import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  History,
  Layers,
  Library,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { useI18n, tx } from '../i18n'
import '../data/es/scriptures.es'
import { WithQuran } from './ui'
import {
  SCRIPTURES,
  type ProphetBook,
  type ScriptureVersion,
} from '../data/scriptures'

export function ScripturesModal({
  initialBookId = 'quran',
  onClose,
  onSelectPerson,
}: {
  initialBookId?: string
  onClose: () => void
  onSelectPerson?: (id: string) => void
}) {
  const { lang, pick } = useI18n()
  const [selectedId, setSelectedId] = useState<string>(initialBookId)
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null)

  const currentBook: ProphetBook =
    SCRIPTURES.find((b) => b.id === selectedId) || SCRIPTURES[0]!

  const activeVersion: ScriptureVersion =
    currentBook.versions.find((v) => v.id === selectedVersionId) ||
    currentBook.versions[0]!

  const imageMap: Record<string, string> = {
    quran: `${import.meta.env.BASE_URL}scriptures/quran.png`,
    tawrat: `${import.meta.env.BASE_URL}scriptures/tawrat.png`,
    zabur: `${import.meta.env.BASE_URL}scriptures/zabur.png`,
    injeel: `${import.meta.env.BASE_URL}scriptures/injeel.png`,
    suhuf_ibrahim: `${import.meta.env.BASE_URL}scriptures/suhuf_ibrahim.png`,
    suhuf_idris: `${import.meta.env.BASE_URL}scriptures/suhuf_idris.png`,
    suhuf_shith: `${import.meta.env.BASE_URL}scriptures/suhuf_shith.png`,
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[2000] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-night/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-card relative flex flex-col w-full max-w-5xl max-h-[90vh] sm:max-h-[88vh] min-h-0 overflow-hidden rounded-2xl border border-gold/30 bg-night-2/95 shadow-2xl text-ink my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="shrink-0 flex items-center justify-between border-b border-gold/20 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-gold/10 via-night-3/40 to-gold/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 border border-gold/40 shadow-inner">
              <BookOpen className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-wide text-gold-2">
                {tx(lang, 'The Divine Scriptures & Textual Manuscript History', 'Les Livres Célestes et l’Histoire des Manuscrits', 'الكتب والصحف السماوية وتاريخ المخطوطات', 'Las Escrituras reveladas y la historia de sus manuscritos')}
              </h2>
              <p className="text-xs text-ink-2 font-sans">
                {tx(lang, 'Documentary comparison: Preservation of the Qur’an & historical manuscript traditions', 'Étude comparative documentaire : Préservation du Coran et manuscrits historiques', 'دراسة وثائقية مقارنة لحفظ القرآن الكريم والمخطوطات التاريخية لرسالات الأنبياء', 'Comparación documental: la preservación del Corán y las tradiciones manuscritas')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-gold/70 hover:bg-gold/20 hover:text-ink transition-colors"
            aria-label={tx(lang, 'Close', 'Fermer', 'إغلاق', 'Cerrar')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Horizontal Scripture Selector Pills - No scrollbar, wrapped cleanly */}
        <div className="shrink-0 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-2.5 border-b border-gold/15 bg-night/50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SCRIPTURES.map((book) => {
            const isSelected = book.id === selectedId
            return (
              <button
                key={book.id}
                type="button"
                onClick={() => {
                  setSelectedId(book.id)
                  setSelectedVersionId(book.versions[0]?.id || null)
                }}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold to-gold-3 text-night font-bold shadow-md shadow-gold/20 ring-2 ring-gold/60'
                    : 'bg-white/5 text-ink-2 hover:bg-white/10 hover:text-ink border border-white/5'
                }`}
              >
                <span>{book.title.ar}</span>
                {lang !== 'ar' && (
                  <span className="opacity-75 text-[11px] font-sans">
                    ({pick(book.title)})
                  </span>
                )}
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isSelected
                      ? 'bg-night/25 text-night font-bold'
                      : 'bg-gold/10 text-gold'
                  }`}
                >
                  {book.id === 'quran'
                    ? tx(lang, '1 Text', '1 texte', '١ نص موحد', '1 texto')
                    : `${book.versionsCount} ${
                        tx(lang, 'traditions', 'versions', 'روايات', 'versiones')
                      }`}
                </span>
              </button>
            )
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 pb-20 space-y-6">
          {/* Main Hero Card for Current Book */}
          <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-night-3/40 to-night/60 p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Image / Artwork */}
              <div className="relative w-full md:w-56 h-44 sm:h-52 rounded-xl overflow-hidden border border-gold/30 shadow-lg shrink-0 group">
                <img
                  src={imageMap[currentBook.id] || imageMap.quran}
                  alt={currentBook.transliteration}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder gradient if image is still generating
                    ;(e.target as HTMLElement).style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />
                <div className="absolute bottom-2 inset-x-2 text-center">
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-gold/90 text-night shadow-sm">
                    {currentBook.preservationStatus === 'divinely_preserved'
                      ? tx(lang, 'Divinely Preserved · 100%', 'Préservé par Allah · 100 %', 'محفوظ بحفظ الله التام', 'Preservado por Allah · 100 %')
                      : lang === 'ar'
                      ? `${currentBook.versionsCount} تقاليد نصية رئيسية`
                      : `${currentBook.versionsCount} Major Textual Traditions`}
                  </span>
                </div>
              </div>

              {/* Information Columns */}
              <div className="flex-1 min-w-0 space-y-3 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gold-2 break-words">
                      {currentBook.title.ar}
                    </h3>
                    {lang !== 'ar' ? (
                      <p className="text-sm sm:text-base font-medium text-gold/80 break-words">
                        {pick(currentBook.title)} · {currentBook.transliteration}
                      </p>
                    ) : (
                      <p className="text-sm sm:text-base font-medium text-gold/80 break-words">
                        {currentBook.preservationStatus === 'divinely_preserved'
                          ? 'وحي الله المعجز المحفوظ بحفظ الله التام في الصدور والمصاحف'
                          : `${currentBook.versionsCount} روايات وتقاليد نصية رئيسية`}
                      </p>
                    )}
                  </div>
                  {onSelectPerson && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        onSelectPerson(currentBook.prophetId)
                      }}
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-gold/20 text-gold-2 border border-gold/40 hover:bg-gold/30 transition-colors"
                    >
                      <span>{pick(currentBook.prophetName)}</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex items-start gap-2.5 rounded-lg bg-night/40 p-2.5 border border-white/5 min-w-0">
                    <Globe className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-ink-2 block text-[11px]">
                        {tx(lang, 'Original Revelation Language', 'Langue de la révélation', 'اللغة الأصلية للوحي', 'Lengua de la revelación')}
                      </span>
                      <span className="font-semibold text-ink break-words leading-tight block">
                        {pick(currentBook.originalLanguage)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-lg bg-night/40 p-2.5 border border-white/5 min-w-0">
                    <History className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-ink-2 block text-[11px]">
                        {tx(lang, 'Revealed Era', 'Époque de la révélation', 'العصر التاريخي', 'Época de la revelación')}
                      </span>
                      <span className="font-semibold text-ink break-words leading-tight block">
                        {pick(currentBook.revealedEra)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-lg bg-night/40 p-2.5 border border-white/5 min-w-0">
                    <Library className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-ink-2 block text-[11px]">
                        {tx(lang, 'Revealed Location', 'Lieu de la révélation', 'مكان التنزيل النبوي', 'Lugar de la revelación')}
                      </span>
                      <span className="font-semibold text-ink break-words leading-tight block">
                        {pick(currentBook.revealedLocation)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-lg bg-night/40 p-2.5 border border-white/5 min-w-0">
                    <Layers className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-ink-2 block text-[11px]">
                        {tx(lang, 'How Many Versions Exist?', 'Combien de versions existent ?', 'كم عدد النسخ والروايات؟', '¿Cuántas versiones existen?')}
                      </span>
                      <span className="font-semibold text-gold break-words leading-tight block">
                        {currentBook.id === 'quran'
                          ? tx(lang, '1 Singular Consonantal Text (10 Qira’at)', 'Un seul texte consonantique (10 lectures)', 'نص إمام واحد (١٠ قراءات متواترة)', 'Un único texto consonántico (10 lecturas)')
                          : `${currentBook.versionsCount} ${
                              tx(lang, 'Major Textual Traditions', 'Grandes traditions textuelles', 'تقاليد ومخطوطات كبرى', 'Grandes tradiciones textuales')
                            }`}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-ink leading-relaxed font-sans pt-1">
                  {pick(currentBook.theologicalContext)}
                </p>
              </div>
            </div>

            {/* Quranic Citations for this Book */}
            <div className="mt-4 pt-4 border-t border-gold/20 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
                <span>
                  {tx(lang, 'Noble Qur’anic Verses Referencing This Scripture', 'Versets du Coran qui citent ce Livre', 'الآيات القرآنية الشريفة في ذكر هذا الكتاب', 'Versículos del Corán que mencionan este Libro')}
                </span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {currentBook.quranReferences.map((ref, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-night/50 p-3 border border-gold/15 text-xs space-y-1.5 min-w-0"
                  >
                    <div className="flex items-center justify-between text-gold font-mono text-[10px]">
                      <span>
                        {tx(lang, 'Surah', 'Sourate', 'سورة', 'Sura')} {ref.surah} : {ref.ayah}
                      </span>
                    </div>
                    <p className="text-gold-2 text-sm leading-relaxed text-right">
                      {ref.arabicText}
                    </p>
                    {lang !== 'ar' && (
                      <p className="text-ink/70 italic text-[11px] leading-normal">
                        {lang === 'fr' ? ref.translationFr : ref.translationEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deep Breakdown: How Many Versions & Textual History */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-gold-2 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gold shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? `تفصيل النسخ والمخطوطات والتقاليد النصية (${currentBook.versions.length})`
                      : `Detailed Textual Traditions & Manuscripts (${currentBook.versions.length})`}
                  </span>
                </h4>
                <p className="text-xs text-ink-2">
                  {pick(currentBook.versionsSummary)}
                </p>
              </div>
            </div>

            {/* Version Pills / Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {currentBook.versions.map((ver) => {
                const isActive = ver.id === activeVersion.id
                return (
                  <button
                    key={ver.id}
                    type="button"
                    onClick={() => setSelectedVersionId(ver.id)}
                    className={`flex flex-col text-start p-3 rounded-xl border transition-all text-xs min-w-0 ${
                      isActive
                        ? 'bg-gold/20 border-gold/80 shadow-md shadow-gold/20 ring-1 ring-gold'
                        : 'bg-night/30 border-white/10 hover:bg-white/5 hover:border-gold/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1.5 w-full">
                      <span className="font-bold text-gold-2 text-sm break-words">
                        {ver.name.ar}
                      </span>
                      {isActive && (
                        <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      )}
                    </div>
                    {lang !== 'ar' && (
                      <span className="text-[11px] text-ink/70 font-sans break-words mt-0.5">
                        {pick(ver.name)}
                      </span>
                    )}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px] text-gold/80 font-mono">
                      <span className="rounded bg-night/40 px-1.5 py-0.5 border border-white/5">
                        {pick(ver.language)}
                      </span>
                      <span className="rounded bg-night/40 px-1.5 py-0.5 border border-white/5">
                        {pick(ver.period)}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Active Selected Version Deep Inspection Panel */}
            {activeVersion && (
              <div className="rounded-xl border border-gold/40 bg-gradient-to-br from-gold/10 via-night-3/60 to-night/80 p-4 sm:p-5 space-y-3 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/20 pb-3">
                  <div className="min-w-0">
                    <h5 className="text-base sm:text-lg font-bold text-gold-2 break-words">
                      {activeVersion.name.ar} {lang !== 'ar' && `· ${pick(activeVersion.name)}`}
                    </h5>
                    <p className="text-xs text-gold font-sans break-words mt-0.5">
                      {pick(activeVersion.significance)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold bg-gold/20 text-gold-2 border border-gold/40 font-mono">
                    {pick(activeVersion.period)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ink leading-relaxed font-sans">
                  {pick(activeVersion.description)}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="rounded-lg bg-night/50 p-3 border border-white/5 min-w-0">
                    <span className="text-ink-2 block font-semibold mb-1 text-[11px]">
                      {tx(lang, 'Extant Manuscripts', 'Manuscrits conservés', 'المخطوطات الباقية', 'Manuscritos conservados')}
                    </span>
                    <span className="text-ink font-mono text-[11px] break-words block leading-relaxed">
                      {pick(activeVersion.extantManuscripts)}
                    </span>
                  </div>

                  <div className="rounded-lg bg-night/50 p-3 border border-white/5 min-w-0">
                    <span className="text-ink-2 block font-semibold mb-1 text-[11px]">
                      {tx(lang, 'Variants / Status', 'Variantes / état', 'عدد الفروق وحالة النص', 'Variantes / estado')}
                    </span>
                    <span className="text-gold font-mono text-[11px] break-words block leading-relaxed">
                      {pick(activeVersion.variantCountOrStatus)}
                    </span>
                  </div>

                  <div className="rounded-lg bg-night/50 p-3 border border-white/5 min-w-0">
                    <span className="text-ink-2 block font-semibold mb-1 text-[11px]">
                      {tx(lang, 'Theological Perspective', 'Point de vue théologique', 'المنظور العلمي والعقدي', 'Perspectiva teológica')}
                    </span>
                    <span className="text-ink-2 text-[11px] break-words block leading-relaxed">
                      {pick(activeVersion.theologicalPerspective)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comparative Doctrine Card: The Singular Qur'an vs Earlier Textual Pluriformity */}
          <div className="rounded-xl border border-lvl-hadith/30 bg-lvl-hadith/10 p-4 sm:p-5 text-xs sm:text-sm space-y-2 mb-2">
            <h4 className="font-bold text-lvl-hadith text-sm sm:text-base flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-lvl-hadith shrink-0" />
              <span>
                {tx(lang, 'Islamic Doctrine: Preservation of the Qur’an vs. Textual Fluidity of Earlier Scriptures', 'Doctrine islamique : la préservation du Coran et l’évolution textuelle des Livres antérieurs', 'القاعدة الإسلامية: حفظ القرآن الكريم المهيمن وسر اختلاف نسخ الكتب السابقة', 'Doctrina islámica: la preservación del Corán y la evolución textual de las Escrituras anteriores')}
              </span>
            </h4>
            <p className="text-ink-2 leading-relaxed font-sans">
              <WithQuran text={tx(lang, 'Allah entrusted the custody of earlier scriptures to their respective communities ("by that which they were entrusted of the Scripture of Allah"), leading to human redactions, loss, and divergent textual traditions. In contrast, Allah Himself undertook the perpetual preservation of the Qur’an ("Indeed, it is We who sent down the Qur’an and indeed, We will be its guardian"), securing word-for-word identity across all continents and centuries.', 'Allah avait confié la garde des livres antérieurs aux communautés humaines (« par ce qui leur était confié du Livre d’Allah »), ce qui a conduit à des altérations et à une multiplicité de manuscrits divergents. Pour le Coran, Allah a garanti Sa propre protection directe (« C’est Nous qui avons fait descendre le Rappel, et c’est Nous qui en sommes les gardiens »), assurant l’exactitude intégrale de chaque lettre à travers les âges.', 'استودع الله الأمم السابقة حفظ كتبها فقال ﴿بِمَا اسْتُحْفِظُوا مِن كِتَابِ اللَّهِ﴾، فدخلها النسيان والتبديل البشري وتعددت نسخها ومخطوطاتها المتناقضة. أما القرآن الكريم فقد تولى الله حفظه بنفسه ﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾، فظل نصاً إماماً واحداً ثابتاً في الصدور والمصاحف بحروفه ورسمه عبر أرجاء الأرض قاطبة.', 'Allah confió la custodia de las Escrituras anteriores a sus comunidades («por lo que se les había confiado del Libro de Allah»), lo que llevó a redacciones humanas, pérdidas y tradiciones textuales divergentes. En cambio, Allah mismo asumió la preservación perpetua del Corán («Somos Nosotros quienes hicimos descender el Recuerdo y somos Nosotros sus custodios»), asegurando que sea idéntico palabra por palabra en todos los continentes y siglos.')} />
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gold/20 px-4 py-3 sm:px-6 flex items-center justify-between bg-night/80 backdrop-blur-sm text-xs text-ink-2">
          <span>
            {tx(lang, 'Prophets Family Tree · Oussama EL HADJI', 'Arbre des prophètes · Oussama EL HADJI', 'مشروع شجرة الأنبياء · أسامة الحاجي', 'Árbol de los profetas · Oussama EL HADJI')}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-1.5 font-medium bg-gold text-night font-bold hover:bg-gold transition-colors"
          >
            {tx(lang, 'Close', 'Fermer', 'إغلاق', 'Cerrar')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
