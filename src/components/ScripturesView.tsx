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
} from 'lucide-react'
import { useI18n } from '../i18n'
import {
  SCRIPTURES,
  type ProphetBook,
  type ScriptureVersion,
} from '../data/scriptures'
import { hrefOf } from '../lib/router'
import { A } from './ui'

export function ScripturesView({ initialBookId = 'quran' }: { initialBookId?: string }) {
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-amber-50">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
          <BookOpen className="h-4 w-4 text-amber-400" />
          <span>
            {lang === 'ar'
              ? 'الكتب والصحف السماوية المنزلة'
              : 'Divine Scriptures & Manuscript Histories'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-amber-200">
          {lang === 'ar'
            ? 'تاريخ المخطوطات والكتب المنزلة على الأنبياء'
            : 'Manuscript Traditions & Texts of the Prophets'}
        </h1>
        <p className="mx-auto max-w-3xl text-sm sm:text-base text-amber-200/80 leading-relaxed font-sans">
          {lang === 'ar'
            ? 'دراسة وثائقية شاملة تقارن بين حفظ القرآن الكريم المعجز ورسمه العثماني الموحد، وبين التقاليد النصية والمخطوطات التاريخية للتوراة والزبور والإنجيل وصحف الأنبياء الأوائل وعدد رواياتها.'
            : 'A comprehensive documentary investigation comparing the miraculous preservation of the singular Noble Qur’an with the evolving manuscript traditions and textual recensions of the Torah, Psalms, Gospel, and ancient prophetic scrolls.'}
        </p>
      </div>

      {/* Selector Pills - wrapped cleanly, no scrollbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/25 ring-2 ring-amber-300/60'
                  : 'bg-black/40 text-amber-200/80 hover:bg-white/10 hover:text-amber-100 border border-white/10'
              }`}
            >
              <span>{book.title.ar}</span>
              {lang !== 'ar' && (
                <span className="opacity-75 text-[11px] font-sans">
                  ({pick(book.title)})
                </span>
              )}
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  isSelected
                    ? 'bg-black/20 text-slate-950 font-bold'
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

      {/* Main Book Card */}
      <div className="glass-card relative overflow-hidden rounded-3xl border border-amber-500/30 bg-[#0d0918]/90 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Visual Artwork */}
          <div className="relative w-full lg:w-80 h-56 sm:h-72 rounded-2xl overflow-hidden border border-amber-400/40 shadow-xl shrink-0 group">
            <img
              src={imageMap[currentBook.id] || imageMap.quran}
              alt={currentBook.transliteration}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-3 inset-x-3 text-center">
              <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-amber-500 text-slate-950 shadow-md">
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

          {/* Details */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-200">
                  {currentBook.title.ar}
                </h2>
                {lang !== 'ar' ? (
                  <p className="text-base sm:text-lg font-medium text-amber-300/80">
                    {pick(currentBook.title)} · {currentBook.transliteration}
                  </p>
                ) : (
                  <p className="text-base sm:text-lg font-medium text-amber-300/80">
                    {currentBook.preservationStatus === 'divinely_preserved'
                      ? 'وحي الله المعجز المحفوظ بحفظ الله التام في الصدور والمصاحف'
                      : `${currentBook.versionsCount} روايات وتقاليد نصية رئيسية`}
                  </p>
                )}
              </div>
              <A
                href={hrefOf({ name: 'person', id: currentBook.prophetId })}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30 transition-colors shadow-sm"
              >
                <span>{pick(currentBook.prophetName)}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </A>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 rounded-xl bg-black/40 p-3 border border-white/5">
                <Globe className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-amber-200/60 block text-xs">
                    {lang === 'ar' ? 'اللغة الأصلية للوحي' : 'Original Language'}
                  </span>
                  <span className="font-semibold text-amber-100">
                    {pick(currentBook.originalLanguage)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl bg-black/40 p-3 border border-white/5">
                <History className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-amber-200/60 block text-xs">
                    {lang === 'ar' ? 'العصر التاريخي' : 'Revealed Era'}
                  </span>
                  <span className="font-semibold text-amber-100">
                    {pick(currentBook.revealedEra)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl bg-black/40 p-3 border border-white/5">
                <Library className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-amber-200/60 block text-xs">
                    {lang === 'ar' ? 'مكان التنزيل النبوي' : 'Revealed Location'}
                  </span>
                  <span className="font-semibold text-amber-100">
                    {pick(currentBook.revealedLocation)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl bg-black/40 p-3 border border-white/5">
                <Layers className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-amber-200/60 block text-xs">
                    {lang === 'ar'
                      ? 'كم عدد النسخ والروايات؟'
                      : 'How Many Versions Exist?'}
                  </span>
                  <span className="font-semibold text-amber-300">
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

            <p className="text-sm text-amber-100/90 leading-relaxed font-sans pt-1">
              {pick(currentBook.theologicalContext)}
            </p>
          </div>
        </div>

        {/* Quran References */}
        <div className="mt-8 pt-6 border-t border-amber-500/20 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>
              {lang === 'ar'
                ? 'الآيات القرآنية الشريفة في ذكر هذا الكتاب'
                : 'Noble Qur’anic Verses Referencing This Scripture'}
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentBook.quranReferences.map((ref, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-black/50 p-4 border border-amber-500/15 space-y-1.5"
              >
                <div className="text-amber-400 font-mono text-xs">
                  {lang === 'ar' ? 'سورة' : 'Surah'} {ref.surah} : {ref.ayah}
                </div>
                <p className="text-amber-200 font-serif text-base leading-relaxed text-right dir-rtl">
                  {ref.arabicText}
                </p>
                {lang !== 'ar' && (
                  <p className="text-amber-100/75 italic text-xs leading-relaxed">
                    {lang === 'fr' ? ref.translationFr : ref.translationEn}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Versions Breakdown */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-200 flex items-center gap-2">
            <FileText className="h-6 w-6 text-amber-400" />
            <span>
              {lang === 'ar'
                ? `تفصيل النسخ والمخطوطات والتقاليد النصية (${currentBook.versions.length})`
                : `Detailed Textual Traditions & Manuscripts (${currentBook.versions.length})`}
            </span>
          </h2>
          <p className="text-sm text-amber-200/70">
            {pick(currentBook.versionsSummary)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentBook.versions.map((ver) => {
            const isActive = ver.id === activeVersion.id
            return (
              <button
                key={ver.id}
                type="button"
                onClick={() => setSelectedVersionId(ver.id)}
                className={`flex flex-col text-start p-4 rounded-2xl border transition-all min-w-0 ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-400/80 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                    : 'bg-black/40 border-white/10 hover:bg-white/5 hover:border-amber-400/30'
                }`}
              >
                <div className="flex items-start justify-between gap-1.5 w-full">
                  <span className="font-bold text-amber-200 font-serif text-base break-words">
                    {ver.name.ar}
                  </span>
                  {isActive && (
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                </div>
                {lang !== 'ar' && (
                  <span className="text-xs text-amber-100/70 font-sans break-words mt-1">
                    {pick(ver.name)}
                  </span>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-amber-300/80 font-mono">
                  <span className="rounded bg-black/40 px-2 py-0.5 border border-white/5">{pick(ver.language)}</span>
                  <span className="rounded bg-black/40 px-2 py-0.5 border border-white/5">{pick(ver.period)}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Version Detail */}
        {activeVersion && (
          <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-black/80 p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-200 font-serif">
                  {activeVersion.name.ar} {lang !== 'ar' && `· ${pick(activeVersion.name)}`}
                </h3>
                <p className="text-sm text-amber-300 font-sans mt-0.5">
                  {pick(activeVersion.significance)}
                </p>
              </div>
              <span className="rounded-full px-3.5 py-1 text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/40 font-mono">
                {pick(activeVersion.period)}
              </span>
            </div>

            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-sans">
              {pick(activeVersion.description)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
              <div className="rounded-xl bg-black/50 p-3.5 border border-white/5 space-y-1">
                <span className="text-amber-200/60 block font-semibold text-xs">
                  {lang === 'ar' ? 'المخطوطات الباقية' : 'Extant Manuscripts'}
                </span>
                <span className="text-amber-100 font-mono text-xs">
                  {pick(activeVersion.extantManuscripts)}
                </span>
              </div>

              <div className="rounded-xl bg-black/50 p-3.5 border border-white/5 space-y-1">
                <span className="text-amber-200/60 block font-semibold text-xs">
                  {lang === 'ar' ? 'عدد الفروق وحالة النص' : 'Variants / Status'}
                </span>
                <span className="text-amber-300 font-mono text-xs">
                  {pick(activeVersion.variantCountOrStatus)}
                </span>
              </div>

              <div className="rounded-xl bg-black/50 p-3.5 border border-white/5 space-y-1">
                <span className="text-amber-200/60 block font-semibold text-xs">
                  {lang === 'ar'
                    ? 'المنظور العلمي والعقدي'
                    : 'Theological Perspective'}
                </span>
                <span className="text-amber-200/90 text-xs">
                  {pick(activeVersion.theologicalPerspective)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comparative Theological Anchor */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-3 shadow-lg">
        <h3 className="font-bold font-serif text-emerald-300 text-base sm:text-lg flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span>
            {lang === 'ar'
              ? 'القاعدة الإسلامية: حفظ القرآن الكريم المهيمن وسر اختلاف نسخ الكتب السابقة'
              : 'Islamic Doctrine: Preservation of the Qur’an vs. Textual Fluidity of Earlier Scriptures'}
          </span>
        </h3>
        <p className="text-emerald-100/90 leading-relaxed font-sans text-sm sm:text-base">
          {lang === 'ar'
            ? 'استودع الله الأمم السابقة حفظ كتبها فقال ﴿بِمَا اسْتُحْفِظُوا مِن كِتَابِ اللَّهِ﴾، فدخلها النسيان والتبديل البشري وتعددت نسخها ومخطوطاتها المتناقضة. أما القرآن الكريم فقد تولى الله حفظه بنفسه ﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾، فظل نصاً إماماً واحداً ثابتاً في الصدور والمصاحف بحروفه ورسمه عبر أرجاء الأرض قاطبة.'
            : lang === 'fr'
            ? 'Allah avait confié la garde des livres antérieurs aux communautés humaines (« par ce qui leur était confié du Livre d’Allah »), ce qui a conduit à des altérations et à une multiplicité de manuscrits divergents. Pour le Coran, Allah a garanti Sa propre protection directe (« C’est Nous qui avons fait descendre le Rappel, et c’est Nous qui en sommes les gardiens »), assurant l’exactitude intégrale de chaque lettre à travers les âges.'
            : 'Allah entrusted the custody of earlier scriptures to their respective communities ("by that which they were entrusted of the Scripture of Allah"), leading to human redactions, loss, and divergent textual traditions. In contrast, Allah Himself undertook the perpetual preservation of the Qur’an ("Indeed, it is We who sent down the Qur’an and indeed, We will be its guardian"), securing word-for-word identity across all continents and centuries.'}
        </p>
      </div>
    </div>
  )
}
