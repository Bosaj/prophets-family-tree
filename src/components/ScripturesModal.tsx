import { useState } from 'react'
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
import { useI18n } from '../i18n'
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-card relative flex flex-col w-full max-w-5xl max-h-[92vh] min-h-0 overflow-hidden rounded-2xl border border-amber-500/30 bg-[#0d0918]/95 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-amber-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="shrink-0 flex items-center justify-between border-b border-amber-500/20 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-amber-950/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/40 shadow-inner">
              <BookOpen className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif tracking-wide text-amber-200">
                {lang === 'ar'
                  ? 'الكتب والصحف السماوية وتاريخ المخطوطات'
                  : lang === 'fr'
                  ? 'Les Livres Célestes et l’Histoire des Manuscrits'
                  : 'The Divine Scriptures & Textual Manuscript History'}
              </h2>
              <p className="text-xs text-amber-200/70 font-sans">
                {lang === 'ar'
                  ? 'دراسة وثائقية مقارنة لحفظ القرآن الكريم والمخطوطات التاريخية لرسالات الأنبياء'
                  : lang === 'fr'
                  ? 'Étude comparative documentaire : Préservation du Coran et manuscrits historiques'
                  : 'Documentary comparison: Preservation of the Qur’an & historical manuscript traditions'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-amber-300/70 hover:bg-amber-500/20 hover:text-amber-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Horizontal Scripture Selector Pills - No scrollbar, wrapped cleanly */}
        <div className="shrink-0 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-2.5 border-b border-amber-500/15 bg-black/50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/30 ring-2 ring-amber-300/60'
                    : 'bg-white/5 text-amber-200/80 hover:bg-white/10 hover:text-amber-100 border border-white/5'
                }`}
              >
                <span>{book.title.ar}</span>
                <span className="opacity-75 text-[11px] font-sans">
                  ({pick(book.title)})
                </span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isSelected
                      ? 'bg-black/25 text-slate-950 font-bold'
                      : 'bg-amber-400/10 text-amber-300'
                  }`}
                >
                  {book.id === 'quran'
                    ? lang === 'ar'
                      ? '١ نص موحد'
                      : '1 Text'
                    : `${book.versionsCount} ${
                        lang === 'ar'
                          ? 'روايات'
                          : lang === 'fr'
                          ? 'versions'
                          : 'traditions'
                      }`}
                </span>
              </button>
            )
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 pb-20 space-y-6">
          {/* Main Hero Card for Current Book */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-purple-950/20 to-black/60 p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Image / Artwork */}
              <div className="relative w-full md:w-56 h-44 sm:h-52 rounded-xl overflow-hidden border border-amber-400/30 shadow-lg shrink-0 group">
                <img
                  src={imageMap[currentBook.id] || imageMap.quran}
                  alt={currentBook.transliteration}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder gradient if image is still generating
                    ;(e.target as HTMLElement).style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-2 inset-x-2 text-center">
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-amber-500/90 text-slate-950 shadow-sm">
                    {currentBook.preservationStatus === 'divinely_preserved'
                      ? lang === 'ar'
                        ? 'محفوظ بحفظ الله التام'
                        : 'Divinely Preserved · 100%'
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
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-amber-200 break-words">
                      {currentBook.title.ar}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-amber-300/80 break-words">
                      {pick(currentBook.title)} · {currentBook.transliteration}
                    </p>
                  </div>
                  {onSelectPerson && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        onSelectPerson(currentBook.prophetId)
                      }}
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30 transition-colors"
                    >
                      <span>{pick(currentBook.prophetName)}</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex items-start gap-2.5 rounded-lg bg-black/40 p-2.5 border border-white/5 min-w-0">
                    <Globe className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-amber-200/60 block text-[11px]">
                        {lang === 'ar'
                          ? 'اللغة الأصلية للوحي'
                          : 'Original Revelation Language'}
                      </span>
                      <span className="font-semibold text-amber-100 break-words leading-tight block">
                        {pick(currentBook.originalLanguage)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-lg bg-black/40 p-2.5 border border-white/5 min-w-0">
                    <History className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-amber-200/60 block text-[11px]">
                        {lang === 'ar' ? 'العصر التاريخي' : 'Revealed Era'}
                      </span>
                      <span className="font-semibold text-amber-100 break-words leading-tight block">
                        {pick(currentBook.revealedEra)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-lg bg-black/40 p-2.5 border border-white/5 min-w-0">
                    <Library className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-amber-200/60 block text-[11px]">
                        {lang === 'ar'
                          ? 'مكان التنزيل النبوي'
                          : 'Revealed Location'}
                      </span>
                      <span className="font-semibold text-amber-100 break-words leading-tight block">
                        {pick(currentBook.revealedLocation)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-lg bg-black/40 p-2.5 border border-white/5 min-w-0">
                    <Layers className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-amber-200/60 block text-[11px]">
                        {lang === 'ar'
                          ? 'كم عدد النسخ والروايات؟'
                          : 'How Many Versions Exist?'}
                      </span>
                      <span className="font-semibold text-amber-300 break-words leading-tight block">
                        {currentBook.id === 'quran'
                          ? lang === 'ar'
                            ? 'نص إمام واحد (١٠ قراءات متواترة)'
                            : '1 Singular Consonantal Text (10 Qira’at)'
                          : `${currentBook.versionsCount} ${
                              lang === 'ar'
                                ? 'تقاليد ومخطوطات كبرى'
                                : 'Major Textual Traditions'
                            }`}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans pt-1">
                  {pick(currentBook.theologicalContext)}
                </p>
              </div>
            </div>

            {/* Quranic Citations for this Book */}
            <div className="mt-4 pt-4 border-t border-amber-500/20 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'الآيات القرآنية الشريفة في ذكر هذا الكتاب'
                    : 'Noble Qur’anic Verses Referencing This Scripture'}
                </span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {currentBook.quranReferences.map((ref, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-black/50 p-3 border border-amber-500/15 text-xs space-y-1.5 min-w-0"
                  >
                    <div className="flex items-center justify-between text-amber-400 font-mono text-[10px]">
                      <span>
                        {lang === 'ar' ? 'سورة' : 'Surah'} {ref.surah} : {ref.ayah}
                      </span>
                    </div>
                    <p className="text-amber-200 font-serif text-sm leading-relaxed text-right">
                      {ref.arabicText}
                    </p>
                    <p className="text-amber-100/70 italic text-[11px] leading-normal">
                      {lang === 'fr' ? ref.translationFr : ref.translationEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deep Breakdown: How Many Versions & Textual History */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base sm:text-lg font-bold font-serif text-amber-200 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? `تفصيل النسخ والمخطوطات والتقاليد النصية (${currentBook.versions.length})`
                      : `Detailed Textual Traditions & Manuscripts (${currentBook.versions.length})`}
                  </span>
                </h4>
                <p className="text-xs text-amber-200/70">
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
                        ? 'bg-amber-500/20 border-amber-400/80 shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                        : 'bg-black/30 border-white/10 hover:bg-white/5 hover:border-amber-400/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1.5 w-full">
                      <span className="font-bold text-amber-200 font-serif text-sm break-words">
                        {ver.name.ar}
                      </span>
                      {isActive && (
                        <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <span className="text-[11px] text-amber-100/70 font-sans break-words mt-0.5">
                      {pick(ver.name)}
                    </span>
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px] text-amber-300/80 font-mono">
                      <span className="rounded bg-black/40 px-1.5 py-0.5 border border-white/5">
                        {pick(ver.language)}
                      </span>
                      <span className="rounded bg-black/40 px-1.5 py-0.5 border border-white/5">
                        {pick(ver.period)}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Active Selected Version Deep Inspection Panel */}
            {activeVersion && (
              <div className="rounded-xl border border-amber-400/40 bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-black/80 p-4 sm:p-5 space-y-3 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
                  <div className="min-w-0">
                    <h5 className="text-base sm:text-lg font-bold text-amber-200 font-serif break-words">
                      {activeVersion.name.ar} · {pick(activeVersion.name)}
                    </h5>
                    <p className="text-xs text-amber-300 font-sans break-words mt-0.5">
                      {pick(activeVersion.significance)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/40 font-mono">
                    {pick(activeVersion.period)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
                  {pick(activeVersion.description)}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="rounded-lg bg-black/50 p-3 border border-white/5 min-w-0">
                    <span className="text-amber-200/60 block font-semibold mb-1 text-[11px]">
                      {lang === 'ar' ? 'المخطوطات الباقية' : 'Extant Manuscripts'}
                    </span>
                    <span className="text-amber-100 font-mono text-[11px] break-words block leading-relaxed">
                      {pick(activeVersion.extantManuscripts)}
                    </span>
                  </div>

                  <div className="rounded-lg bg-black/50 p-3 border border-white/5 min-w-0">
                    <span className="text-amber-200/60 block font-semibold mb-1 text-[11px]">
                      {lang === 'ar'
                        ? 'عدد الفروق وحالة النص'
                        : 'Variants / Status'}
                    </span>
                    <span className="text-amber-300 font-mono text-[11px] break-words block leading-relaxed">
                      {pick(activeVersion.variantCountOrStatus)}
                    </span>
                  </div>

                  <div className="rounded-lg bg-black/50 p-3 border border-white/5 min-w-0">
                    <span className="text-amber-200/60 block font-semibold mb-1 text-[11px]">
                      {lang === 'ar'
                        ? 'المنظور العلمي والعقدي'
                        : 'Theological Perspective'}
                    </span>
                    <span className="text-amber-200/90 text-[11px] break-words block leading-relaxed">
                      {pick(activeVersion.theologicalPerspective)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comparative Doctrine Card: The Singular Qur'an vs Earlier Textual Pluriformity */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:p-5 text-xs sm:text-sm space-y-2 mb-2">
            <h4 className="font-bold font-serif text-emerald-300 text-sm sm:text-base flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'القاعدة الإسلامية: حفظ القرآن الكريم المهيمن وسر اختلاف نسخ الكتب السابقة'
                  : 'Islamic Doctrine: Preservation of the Qur’an vs. Textual Fluidity of Earlier Scriptures'}
              </span>
            </h4>
            <p className="text-emerald-100/90 leading-relaxed font-sans">
              {lang === 'ar'
                ? 'استودع الله الأمم السابقة حفظ كتبها فقال ﴿بِمَا اسْتُحْفِظُوا مِن كِتَابِ اللَّهِ﴾، فدخلها النسيان والتبديل البشري وتعددت نسخها ومخطوطاتها المتناقضة. أما القرآن الكريم فقد تولى الله حفظه بنفسه ﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾، فظل نصاً إماماً واحداً ثابتاً في الصدور والمصاحف بحروفه ورسمه عبر أرجاء الأرض قاطبة.'
                : lang === 'fr'
                ? 'Allah avait confié la garde des livres antérieurs aux communautés humaines (« par ce qui leur était confié du Livre d’Allah »), ce qui a conduit à des altérations et à une multiplicité de manuscrits divergents. Pour le Coran, Allah a garanti Sa propre protection directe (« C’est Nous qui avons fait descendre le Rappel, et c’est Nous qui en sommes les gardiens »), assurant l’exactitude intégrale de chaque lettre à travers les âges.'
                : 'Allah entrusted the custody of earlier scriptures to their respective communities ("by that which they were entrusted of the Scripture of Allah"), leading to human redactions, loss, and divergent textual traditions. In contrast, Allah Himself undertook the perpetual preservation of the Qur’an ("Indeed, it is We who sent down the Qur’an and indeed, We will be its guardian"), securing word-for-word identity across all continents and centuries.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-amber-500/20 px-4 py-3 sm:px-6 flex items-center justify-between bg-black/80 backdrop-blur-sm text-xs text-amber-200/70">
          <span>
            {lang === 'ar'
              ? 'مشروع شجرة الأنبياء · أسامة الحاجي'
              : 'Prophets Family Tree · Oussama EL HADJI'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-1.5 font-medium bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
          >
            {lang === 'ar' ? 'إغلاق' : lang === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}
