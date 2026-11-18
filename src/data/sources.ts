import type { L3, Level, Ref } from './types'

export const BOOKS: Record<string, L3> = {
  muslimintro: {
    en: "Sahih Muslim, Introduction (al-Muqaddimah)",
    fr: "Sahih Muslim, Introduction (al-Muqaddima)",
    ar: "صحيح مسلم، المقدمة",
    es: "Sahih Muslim, Introducción (al-Muqaddima)",
  },
  bukhariilm: {
    en: "Sahih al-Bukhari, Book of Knowledge (chapter headings)",
    fr: "Sahih al-Bukhari, Livre de la science (titres de chapitres)",
    ar: "صحيح البخاري، كتاب العلم (تراجم الأبواب)",
    es: "Sahih al-Bujari, Libro del conocimiento (títulos de capítulos)",
  },
  hammam: {
    en: "Sahifat Hammam ibn Munabbih, ed. Muhammad Hamidullah (1953)",
    fr: "Sahifat Hammam ibn Munabbih, éd. Muhammad Hamidullah (1953)",
    ar: "صحيفة همام بن منبه، تحقيق محمد حميد الله (1953)",
    es: "Sahifat Hammam ibn Munabbih, ed. Muhammad Hamidullah (1953)",
  },
  azami: {
    en: "M. M. al-A‘zami, Studies in Early Hadith Literature (1968)",
    fr: "M. M. al-A‘zami, Studies in Early Hadith Literature (1968)",
    ar: "محمد مصطفى الأعظمي، دراسات في الحديث النبوي وتاريخ تدوينه",
    es: "M. M. al-A‘zami, Studies in Early Hadith Literature (1968)",
  },
  hadysari: {
    en: "Ibn Hajar, Hady al-Sari (introduction to Fath al-Bari)",
    fr: "Ibn Hajar, Hady as-Sari (introduction de Fath al-Bari)",
    ar: "ابن حجر، هدي الساري مقدمة فتح الباري",
    es: "Ibn Hayar, Hady as-Sari (introducción de Fath al-Bari)",
  },
  rijal: {
    en: "The books of narrators: Ibn Sa‘d, al-Bukhari’s al-Tarikh al-Kabir, Ibn Abi Hatim, al-Mizzi, al-Dhahabi, Ibn Hajar",
    fr: "Les livres des transmetteurs : Ibn Sa‘d, al-Tarikh al-Kabir d’al-Bukhari, Ibn Abi Hatim, al-Mizzi, adh-Dhahabi, Ibn Hajar",
    ar: "كتب الرجال: طبقات ابن سعد، التاريخ الكبير للبخاري، الجرح والتعديل، تهذيب الكمال، ميزان الاعتدال، تهذيب التهذيب",
    es: "Los libros de transmisores: Ibn Sa‘d, al-Tarij al-Kabir de al-Bujari, Ibn Abi Hatim, al-Mizzi, adh-Dhahabi, Ibn Hayar",
  },
  mawduat: {
    en: "Ibn al-Jawzi, al-Mawdu‘at; al-Suyuti, al-La’ali’ al-Masnu‘a; al-Shawkani, al-Fawa’id al-Majmu‘a",
    fr: "Ibn al-Jawzi, al-Mawdu‘at ; as-Suyuti, al-La’ali’ al-Masnu‘a ; ash-Shawkani, al-Fawa’id al-Majmu‘a",
    ar: "ابن الجوزي، الموضوعات؛ السيوطي، اللآلئ المصنوعة؛ الشوكاني، الفوائد المجموعة",
    es: "Ibn al-Yawzi, al-Mawdu‘at; as-Suyuti, al-La’ali’ al-Masnu‘a; ash-Shawkani, al-Fawa’id al-Maymu‘a",
  },
  ibnsalah: {
    en: "Ibn al-Salah, Muqaddimah (‘Ulum al-Hadith)",
    fr: "Ibn as-Salah, Muqaddima (‘Ulum al-Hadith)",
    ar: "ابن الصلاح، معرفة أنواع علوم الحديث (المقدمة)",
    es: "Ibn as-Salah, Muqaddima (‘Ulum al-Hadiz)",
  },
  khatib: {
    en: "Al-Khatib al-Baghdadi, al-Kifayah fi ‘Ilm al-Riwayah and Tarikh Baghdad",
    fr: "Al-Khatib al-Baghdadi, al-Kifaya fi ‘Ilm ar-Riwaya et Tarikh Baghdad",
    ar: "الخطيب البغدادي، الكفاية في علم الرواية وتاريخ بغداد",
    es: "Al-Jatib al-Bagdadi, al-Kifaya fi ‘Ilm ar-Riwaya y Tarij Bagdad",
  },
  motzki: {
    en: "Harald Motzki, The Origins of Islamic Jurisprudence (Brill, 2002)",
    fr: "Harald Motzki, The Origins of Islamic Jurisprudence (Brill, 2002)",
    ar: "هارالد موتسكي، بدايات الفقه الإسلامي (بريل، 2002)",
    es: "Harald Motzki, The Origins of Islamic Jurisprudence (Brill, 2002)",
  },
  mukhtalif: {
    en: "Al-Shafi‘i, Ikhtilaf al-Hadith; Ibn Qutaybah, Ta’wil Mukhtalif al-Hadith",
    fr: "Ash-Shafi‘i, Ikhtilaf al-Hadith ; Ibn Qutayba, Ta’wil Mukhtalif al-Hadith",
    ar: "الشافعي، اختلاف الحديث؛ ابن قتيبة، تأويل مختلف الحديث",
    es: "Ash-Shafi‘i, Ijtilaf al-Hadiz; Ibn Qutayba, Ta’wil Mujtalif al-Hadiz",
  },
  qisas: {
    en: 'Ibn Kathir, Qisas al-Anbiya (Stories of the Prophets), and the classical commentaries',
    fr: 'Ibn Kathir, Qisas al-Anbiya (Histoires des prophètes), et les commentaires classiques',
    ar: 'ابن كثير، قصص الأنبياء، وكتب التفسير',
    es: 'Ibn Kazir, Qisas al-Anbiya (Historias de los profetas), y los comentarios clásicos',
  },
  tabari: {
    en: 'Al-Tabari, Tarikh al-Rusul wa al-Muluk (History of Prophets and Kings)',
    fr: 'Al-Tabari, Tarikh al-Rusul wa al-Muluk (Histoire des prophètes et des rois)',
    ar: 'الطبري، تاريخ الرسل والملوك',
    es: 'At-Tabari, Tarij ar-Rusul wa al-Muluk (Historia de los profetas y los reyes)',
  },
  sira: {
    en: 'Ibn Hisham, al-Sira al-Nabawiyya, and the hadith collections',
    fr: 'Ibn Hicham, al-Sira al-Nabawiyya, et les recueils de hadiths',
    ar: 'ابن هشام، السيرة النبوية، وكتب الحديث',
    es: 'Ibn Hisham, as-Sira an-Nabawiyya, y las colecciones de hadices',
  },
  bible: {
    en: 'The Biblical account, as reported by historians — not an Islamic source',
    fr: 'Le récit biblique, rapporté par les historiens — pas une source islamique',
    ar: 'الرواية التوراتية كما ينقلها المؤرخون — ليست مصدرًا إسلاميًّا',
    es: 'El relato bíblico, tal como lo transmiten los historiadores; no es una fuente islámica',
  },
  ibnkathir: {
    en: 'Ibn Kathir, Tafsir al-Qur’an al-‘Azim',
    fr: 'Ibn Kathir, Tafsir al-Qur’an al-‘Azim',
    ar: 'ابن كثير، تفسير القرآن العظيم',
    es: 'Ibn Kazir, Tafsir al-Qur’an al-‘Azim',
  },
  qurtubi: {
    en: 'Al-Qurtubi, al-Jami‘ li-Ahkam al-Qur’an',
    fr: 'Al-Qurtubi, al-Jami‘ li-Ahkam al-Qur’an',
    ar: 'القرطبي، الجامع لأحكام القرآن',
    es: 'Al-Qurtubi, al-Yami‘ li-Ahkam al-Qur’an',
  },
  historians: {
    en: 'Estimates of modern historians — not from Islamic sources',
    fr: 'Estimations des historiens modernes — pas des sources islamiques',
    ar: 'تقديرات المؤرخين المعاصرين — لا من المصادر الإسلامية',
    es: 'Estimaciones de historiadores modernos; no proceden de fuentes islámicas',
  },
}

const HADITH_BOOK: Record<string, L3> = {
  bukhari: { en: 'Sahih al-Bukhari', fr: 'Sahih al-Bukhari', ar: 'صحيح البخاري', es: 'Sahih al-Bujari' },
  muslim: { en: 'Sahih Muslim', fr: 'Sahih Muslim', ar: 'صحيح مسلم', es: 'Sahih Muslim' },
  tirmidhi: { en: 'Jami‘ al-Tirmidhi', fr: 'Jami‘ at-Tirmidhi', ar: 'جامع الترمذي', es: 'Yami‘ at-Tirmidi' },
  abudawud: { en: 'Sunan Abi Dawud', fr: 'Sunan Abi Dawud', ar: 'سنن أبي داود', es: 'Sunan Abi Dawud' },
  nasai: { en: 'Sunan al-Nasa’i', fr: 'Sunan an-Nasa’i', ar: 'سنن النسائي', es: 'Sunan an-Nasa’i' },
  ibnmajah: { en: 'Sunan Ibn Majah', fr: 'Sunan Ibn Majah', ar: 'سنن ابن ماجه', es: 'Sunan Ibn Mayah' },
}

export type ParsedRef =
  | { kind: 'quran'; s: number; a: number; to: number; raw: Ref }
  | { kind: 'hadith'; book: string; n: number; raw: Ref }
  | { kind: 'book'; key: string; raw: Ref }

export function parseRef(raw: Ref): ParsedRef {
  const q = /^(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?$/.exec(raw)
  if (q) {
    const a = Number(q[2])
    return { kind: 'quran', s: Number(q[1]), a, to: q[3] ? Number(q[3]) : a, raw }
  }
  const h = /^(bukhari|muslim|tirmidhi|abudawud|nasai|ibnmajah):(\d+)$/.exec(raw)
  if (h) return { kind: 'hadith', book: h[1]!, n: Number(h[2]), raw }
  const b = /^book:([a-z]+)$/.exec(raw)
  if (b && BOOKS[b[1]!]) return { kind: 'book', key: b[1]!, raw }
  throw new Error(`Bad source reference: ${raw}`)
}

export function refLabel(raw: Ref, lang: keyof L3): string {
  const p = parseRef(raw)
  if (p.kind === 'quran') {
    // Isolate the numbers left-to-right so "20:9–98" never flips inside Arabic text.
    const span = `⁦${p.to > p.a ? `${p.s}:${p.a}–${p.to}` : `${p.s}:${p.a}`}⁩`
    return lang === 'ar' ? `القرآن ${span}` : lang === 'fr' ? `Coran ${span}` : lang === 'es' ? `Corán ${span}` : `Qur’an ${span}`
  }
  if (p.kind === 'hadith') return `${HADITH_BOOK[p.book]![lang] ?? HADITH_BOOK[p.book]!.en} ⁦${p.n}⁩`
  return BOOKS[p.key]![lang] ?? BOOKS[p.key]!.en
}

export function refUrl(raw: Ref): string | null {
  const p = parseRef(raw)
  if (p.kind === 'quran') return `https://quran.com/${p.s}/${p.a}${p.to > p.a ? `-${p.to}` : ''}`
  if (p.kind === 'hadith') return `https://sunnah.com/${p.book}:${p.n}`
  return null
}

export const LEVELS: Level[] = ['quran', 'hadith', 'tradition', 'disputed']
