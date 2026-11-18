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
import { useI18n, tx } from '../i18n'
import '../data/es/scriptures.es'
import {
  SCRIPTURES,
  type ProphetBook,
  type ScriptureVersion,
} from '../data/scriptures'
import { hrefOf } from '../lib/router'
import { A, q, WithQuran } from './ui'

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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-ink">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold">
          <BookOpen className="h-4 w-4 text-gold" />
          <span>
            {tx(lang, 'Divine Scriptures & Manuscript Histories', 'Les Livres révélés et l’histoire de leurs manuscrits', 'الكتب والصحف السماوية المنزلة', 'Las Escrituras reveladas y la historia de sus manuscritos')}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-2">
          {tx(lang, 'Manuscript Traditions & Texts of the Prophets', 'Traditions manuscrites et textes des prophètes', 'تاريخ المخطوطات والكتب المنزلة على الأنبياء', 'Tradiciones manuscritas y textos de los profetas')}
        </h1>
        <p className="mx-auto max-w-3xl text-sm sm:text-base text-ink-2 leading-relaxed font-sans">
          {tx(lang, 'A comprehensive documentary investigation comparing the miraculous preservation of the singular Noble Qur’an with the evolving manuscript traditions and textual recensions of the Torah, Psalms, Gospel, and ancient prophetic scrolls.', 'Une étude documentaire qui compare la préservation du Coran, texte unique, avec l’évolution des manuscrits et des recensions de la Torah, des Psaumes, de l’Évangile et des anciennes Feuilles des prophètes.', 'دراسة وثائقية شاملة تقارن بين حفظ القرآن الكريم المعجز ورسمه العثماني الموحد، وبين التقاليد النصية والمخطوطات التاريخية للتوراة والزبور والإنجيل وصحف الأنبياء الأوائل وعدد رواياتها.', 'Un estudio documental que compara la preservación del Corán, texto único, con la evolución de los manuscritos y las recensiones de la Torá, los Salmos, el Evangelio y las antiguas Hojas de los profetas.')}
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
                  ? 'bg-gradient-to-r from-gold to-gold-3 text-night font-bold shadow-lg shadow-gold/20 ring-2 ring-gold/60'
                  : 'bg-night/40 text-ink-2 hover:bg-white/10 hover:text-ink border border-white/10'
              }`}
            >
              <span>{book.title.ar}</span>
              {lang !== 'ar' && (
                <span className="opacity-75 text-[11px] font-sans">
                  ({q(pick(book.title))})
                </span>
              )}
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  isSelected
                    ? 'bg-night/20 text-night font-bold'
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

      {/* Main Book Card */}
      <div className="glass-card relative overflow-hidden rounded-3xl border border-gold/30 bg-night-2/90 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Visual Artwork */}
          <div className="relative w-full lg:w-80 h-56 sm:h-72 rounded-2xl overflow-hidden border border-gold/40 shadow-xl shrink-0 group">
            <img
              src={imageMap[currentBook.id] || imageMap.quran}
              alt={currentBook.transliteration}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-transparent" />
            <div className="absolute bottom-3 inset-x-3 text-center">
              <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-gold text-night shadow-md">
                {currentBook.preservationStatus === 'divinely_preserved'
                  ? tx(lang, 'Divinely Preserved · 100%', 'Préservé par Allah · 100 %', 'محفوظ بحفظ الله التام', 'Preservado por Allah · 100 %')
                  : tx(lang, `${currentBook.versionsCount} Major Textual Traditions`, `${currentBook.versionsCount} grandes traditions textuelles`, `${currentBook.versionsCount} تقاليد نصية رئيسية`, `${currentBook.versionsCount} grandes tradiciones textuales`)}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gold-2">
                  {currentBook.title.ar}
                </h2>
                {lang !== 'ar' ? (
                  <p className="text-base sm:text-lg font-medium text-gold/80">
                    {q(pick(currentBook.title))} · {currentBook.transliteration}
                  </p>
                ) : (
                  <p className="text-base sm:text-lg font-medium text-gold/80">
                    {currentBook.preservationStatus === 'divinely_preserved'
                      ? 'وحي الله المعجز المحفوظ بحفظ الله التام في الصدور والمصاحف'
                      : `${currentBook.versionsCount} روايات وتقاليد نصية رئيسية`}
                  </p>
                )}
              </div>
              <A
                href={hrefOf({ name: 'person', id: currentBook.prophetId })}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold bg-gold/20 text-gold-2 border border-gold/40 hover:bg-gold/30 transition-colors shadow-sm"
              >
                <span>{q(pick(currentBook.prophetName))}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </A>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 rounded-xl bg-night/40 p-3 border border-white/5">
                <Globe className="h-5 w-5 text-gold shrink-0" />
                <div>
                  <span className="text-ink-2 block text-xs">
                    {tx(lang, 'Original Language', 'Langue d’origine', 'اللغة الأصلية للوحي', 'Lengua original')}
                  </span>
                  <span className="font-semibold text-ink">
                    {q(pick(currentBook.originalLanguage))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl bg-night/40 p-3 border border-white/5">
                <History className="h-5 w-5 text-gold shrink-0" />
                <div>
                  <span className="text-ink-2 block text-xs">
                    {tx(lang, 'Revealed Era', 'Époque de la révélation', 'العصر التاريخي', 'Época de la revelación')}
                  </span>
                  <span className="font-semibold text-ink">
                    {q(pick(currentBook.revealedEra))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl bg-night/40 p-3 border border-white/5">
                <Library className="h-5 w-5 text-gold shrink-0" />
                <div>
                  <span className="text-ink-2 block text-xs">
                    {tx(lang, 'Revealed Location', 'Lieu de la révélation', 'مكان التنزيل النبوي', 'Lugar de la revelación')}
                  </span>
                  <span className="font-semibold text-ink">
                    {q(pick(currentBook.revealedLocation))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl bg-night/40 p-3 border border-white/5">
                <Layers className="h-5 w-5 text-gold shrink-0" />
                <div>
                  <span className="text-ink-2 block text-xs">
                    {tx(lang, 'How Many Versions Exist?', 'Combien de versions existent ?', 'كم عدد النسخ والروايات؟', '¿Cuántas versiones existen?')}
                  </span>
                  <span className="font-semibold text-gold">
                    {currentBook.id === 'quran'
                      ? tx(lang, '1 Singular Consonantal Text (10 Qira’at)', 'Un seul texte consonantique (10 lectures)', 'نص إمام واحد (١٠ قراءات متواترة)', 'Un único texto consonántico (10 lecturas)')
                      : `${currentBook.versionsCount} ${
                          tx(lang, 'Major Textual Traditions', 'Grandes traditions textuelles', 'تقاليد ومخطوطات كبرى', 'Grandes tradiciones textuales')
                        }`}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-ink leading-relaxed font-sans pt-1">
              {q(pick(currentBook.theologicalContext))}
            </p>
          </div>
        </div>

        {/* Quran References */}
        <div className="mt-8 pt-6 border-t border-gold/20 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <span>
              {tx(lang, 'Noble Qur’anic Verses Referencing This Scripture', 'Versets du Coran qui citent ce Livre', 'الآيات القرآنية الشريفة في ذكر هذا الكتاب', 'Versículos del Corán que mencionan este Libro')}
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentBook.quranReferences.map((ref, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-night/50 p-4 border border-gold/15 space-y-1.5"
              >
                <div className="text-gold font-mono text-xs">
                  {tx(lang, 'Surah', 'Sourate', 'سورة', 'Sura')} {ref.surah} : {ref.ayah}
                </div>
                <p className="text-gold-2 text-base leading-relaxed text-right dir-rtl">
                  {ref.arabicText}
                </p>
                {lang !== 'ar' && (
                  <p className="text-ink/75 italic text-xs leading-relaxed">
                    {lang === 'fr' ? ref.translationFr : lang === 'es' ? (ref.translationEs ?? ref.translationEn) : ref.translationEn}
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
          <h2 className="text-xl sm:text-2xl font-bold text-gold-2 flex items-center gap-2">
            <FileText className="h-6 w-6 text-gold" />
            <span>
              {tx(lang, `Detailed Textual Traditions & Manuscripts (${currentBook.versions.length})`, `Traditions textuelles et manuscrits en détail (${currentBook.versions.length})`, `تفصيل النسخ والمخطوطات والتقاليد النصية (${currentBook.versions.length})`, `Tradiciones textuales y manuscritos en detalle (${currentBook.versions.length})`)}
            </span>
          </h2>
          <p className="text-sm text-ink-2">
            {q(pick(currentBook.versionsSummary))}
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
                    ? 'bg-gold/20 border-gold/80 shadow-lg shadow-gold/20 ring-1 ring-gold'
                    : 'bg-night/40 border-white/10 hover:bg-white/5 hover:border-gold/30'
                }`}
              >
                <div className="flex items-start justify-between gap-1.5 w-full">
                  <span className="font-bold text-gold-2 text-base break-words">
                    {ver.name.ar}
                  </span>
                  {isActive && (
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  )}
                </div>
                {lang !== 'ar' && (
                  <span className="text-xs text-ink/70 font-sans break-words mt-1">
                    {q(pick(ver.name))}
                  </span>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-gold/80 font-mono">
                  <span className="rounded bg-night/40 px-2 py-0.5 border border-white/5">{q(pick(ver.language))}</span>
                  <span className="rounded bg-night/40 px-2 py-0.5 border border-white/5">{q(pick(ver.period))}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Version Detail */}
        {activeVersion && (
          <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 via-night-3/60 to-night/80 p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/20 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gold-2">
                  {activeVersion.name.ar} {lang !== 'ar' && `· ${pick(activeVersion.name)}`}
                </h3>
                <p className="text-sm text-gold font-sans mt-0.5">
                  {q(pick(activeVersion.significance))}
                </p>
              </div>
              <span className="rounded-full px-3.5 py-1 text-xs font-semibold bg-gold/20 text-gold-2 border border-gold/40 font-mono">
                {q(pick(activeVersion.period))}
              </span>
            </div>

            <p className="text-sm sm:text-base text-ink leading-relaxed font-sans">
              {q(pick(activeVersion.description))}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
              <div className="rounded-xl bg-night/50 p-3.5 border border-white/5 space-y-1">
                <span className="text-ink-2 block font-semibold text-xs">
                  {tx(lang, 'Extant Manuscripts', 'Manuscrits conservés', 'المخطوطات الباقية', 'Manuscritos conservados')}
                </span>
                <span className="text-ink font-mono text-xs">
                  {q(pick(activeVersion.extantManuscripts))}
                </span>
              </div>

              <div className="rounded-xl bg-night/50 p-3.5 border border-white/5 space-y-1">
                <span className="text-ink-2 block font-semibold text-xs">
                  {tx(lang, 'Variants / Status', 'Variantes / état', 'عدد الفروق وحالة النص', 'Variantes / estado')}
                </span>
                <span className="text-gold font-mono text-xs">
                  {q(pick(activeVersion.variantCountOrStatus))}
                </span>
              </div>

              <div className="rounded-xl bg-night/50 p-3.5 border border-white/5 space-y-1">
                <span className="text-ink-2 block font-semibold text-xs">
                  {tx(lang, 'Theological Perspective', 'Point de vue théologique', 'المنظور العلمي والعقدي', 'Perspectiva teológica')}
                </span>
                <span className="text-ink-2 text-xs">
                  {q(pick(activeVersion.theologicalPerspective))}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comparative Theological Anchor */}
      <div className="rounded-2xl border border-lvl-hadith/30 bg-lvl-hadith/10 p-6 space-y-3 shadow-lg">
        <h3 className="font-bold text-lvl-hadith text-base sm:text-lg flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-lvl-hadith" />
          <span>
            {tx(lang, 'Islamic Doctrine: Preservation of the Qur’an vs. Textual Fluidity of Earlier Scriptures', 'Doctrine islamique : la préservation du Coran et l’évolution textuelle des Livres antérieurs', 'القاعدة الإسلامية: حفظ القرآن الكريم المهيمن وسر اختلاف نسخ الكتب السابقة', 'Doctrina islámica: la preservación del Corán y la evolución textual de las Escrituras anteriores')}
          </span>
        </h3>
        <p className="text-ink-2 leading-relaxed font-sans text-sm sm:text-base">
          <WithQuran text={tx(lang, 'Allah entrusted the custody of earlier scriptures to their respective communities ("by that which they were entrusted of the Scripture of Allah"), leading to human redactions, loss, and divergent textual traditions. In contrast, Allah Himself undertook the perpetual preservation of the Qur’an ("Indeed, it is We who sent down the Qur’an and indeed, We will be its guardian"), securing word-for-word identity across all continents and centuries.', 'Allah avait confié la garde des livres antérieurs aux communautés humaines (« par ce qui leur était confié du Livre d’Allah »), ce qui a conduit à des altérations et à une multiplicité de manuscrits divergents. Pour le Coran, Allah a garanti Sa propre protection directe (« C’est Nous qui avons fait descendre le Rappel, et c’est Nous qui en sommes les gardiens »), assurant l’exactitude intégrale de chaque lettre à travers les âges.', 'استودع الله الأمم السابقة حفظ كتبها فقال ﴿بِمَا اسْتُحْفِظُوا مِن كِتَابِ اللَّهِ﴾، فدخلها النسيان والتبديل البشري وتعددت نسخها ومخطوطاتها المتناقضة. أما القرآن الكريم فقد تولى الله حفظه بنفسه ﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾، فظل نصاً إماماً واحداً ثابتاً في الصدور والمصاحف بحروفه ورسمه عبر أرجاء الأرض قاطبة.', 'Allah confió la custodia de las Escrituras anteriores a sus comunidades («por lo que se les había confiado del Libro de Allah»), lo que llevó a redacciones humanas, pérdidas y tradiciones textuales divergentes. En cambio, Allah mismo asumió la preservación perpetua del Corán («Somos Nosotros quienes hicimos descender el Recuerdo y somos Nosotros sus custodios»), asegurando que sea idéntico palabra por palabra en todos los continentes y siglos.')} />
        </p>
      </div>
    </div>
  )
}
