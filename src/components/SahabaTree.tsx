import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import {
  Search,
  Crown,
  Sparkles,
  MapPin,
  X,
  ChevronRight,
  GitCommit,
  CheckCircle2,
  Award,
  Layers,
  Clock,
  BookOpen,
  Users,
  Quote,
  Milestone,
  Plus,
  Minus,
  RotateCcw,
} from 'lucide-react'
import { useI18n } from '../i18n'
import { pathPoint } from '../lib/relations'
import { SAHABA_STORIES, type StoryPoint } from '../data/sahabaStories'
import { LevelChip, RefChip } from './ui'
import type { L4, Lang } from '../data/types'
import {
  SAHABA_FIGURES,
  SAHABA_ERAS,
  type SahabaEra,
  type SahabaFigure,
} from '../data/sahaba'

interface TreeLink {
  from: string
  to: string
  /** Short name of the relation, shown on the line. */
  label: L4
  /** The full relation, shown in the figure's card. */
  note?: L4
  type: 'lineage' | 'succession' | 'hadith' | 'mentorship' | 'era'
}

interface View {
  k: number
  x: number
  y: number
}

// Celestial Node Coordinates in a balanced, wide 2D SVG canvas (Layout: width 2400, height 1850)
const SAHABA_NODE_COORDS: Record<string, { x: number; y: number }> = {
  // Tier 0: Root - The Noble Messenger of Allah ﷺ (Top-Center)
  prophet_muhammad: { x: 1200, y: 100 },

  // Tier 1: Core Household, Rashidun Caliph, Chief Hadith Narrator, Early Champions (Y: 280)
  bilal_ibn_rabah: { x: 150, y: 280 },
  khalid_ibn_walid: { x: 340, y: 280 },
  hamzah_ibn_abd_muttalib: { x: 530, y: 280 },
  fatimah_az_zahra: { x: 920, y: 280 },
  abu_bakr: { x: 1280, y: 280 },
  abu_hurairah: { x: 2150, y: 280 },

  // Tier 2: Grandsons, Ali, Umar, Mubasharun, Imam al-Bukhari (Y: 460-500)
  salman_al_farsi: { x: 150, y: 460 },
  talhah_ibn_ubaydillah: { x: 340, y: 460 },
  zubayr_ibn_awwam: { x: 530, y: 460 },
  husayn_ibn_ali: { x: 740, y: 460 },
  hasan_ibn_ali: { x: 920, y: 460 },
  ali_ibn_abi_talib: { x: 1100, y: 460 },
  umar_ibn_khattab: { x: 1280, y: 460 },
  imam_bukhari: { x: 2150, y: 500 },

  // Tier 3: Mubasharun, Idrisids, Uthman, Umayyad Founder, Imam Muslim (Y: 640-720)
  abdurrahman_ibn_awf: { x: 340, y: 640 },
  sad_ibn_abi_waqqas: { x: 530, y: 640 },
  idris_i: { x: 920, y: 640 },
  uthman_ibn_affan: { x: 1280, y: 640 },
  muawiyah_i: { x: 1520, y: 640 },
  imam_muslim: { x: 2150, y: 720 },

  // Tier 4: Sa'id, Abu Ubaydah, Sharif Hussein, Moulay Ali Cherif, High Umayyads, Cordoba (Y: 820-840)
  said_ibn_zayd: { x: 340, y: 820 },
  abu_ubaydah_jarrah: { x: 530, y: 820 },
  sharif_hussein_hejaz: { x: 740, y: 840 },
  moulay_ali_cherif: { x: 920, y: 840 },
  abdalmalik_marwan: { x: 1520, y: 820 },
  abdalrahman_i_cordoba: { x: 1750, y: 820 },

  // Tier 5: Umar II, Abd al-Rahman III of Cordoba (Y: 1000)
  umar_ibn_abd_al_aziz: { x: 1520, y: 1000 },
  abdalrahman_iii_cordoba: { x: 1750, y: 1000 },

  // Tier 6: Modern Royal Dynasties Roots, Abbasids, Ottoman Origins (Y: 1180)
  king_hussein_jordan: { x: 740, y: 1180 },
  mohammed_v_morocco: { x: 920, y: 1180 },
  abu_jafar_mansur: { x: 1520, y: 1180 },
  osman_i: { x: 1750, y: 1180 },

  // Tier 7: Living Hasanid Monarchs, High Abbasid & Ottoman Fatih (Y: 1360)
  king_abdullah_ii: { x: 740, y: 1360 },
  king_mohammed_vi: { x: 920, y: 1360 },
  harun_al_rashid: { x: 1520, y: 1360 },
  mehmed_ii_fatih: { x: 1750, y: 1360 },

  // Tier 8: Golden Age Translation & Caliphate Translatio (Y: 1540)
  al_mamun: { x: 1520, y: 1540 },
  selim_i_yavuz: { x: 1750, y: 1540 },

  // Tier 9: Zenith & Late Ottoman Caliphate (Y: 1720)
  suleiman_the_magnificent: { x: 1750, y: 1720 },
  abdulhamid_ii: { x: 1950, y: 1720 },
}

const r = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

/** Labels of the figure card, in the four site languages. */
const UI = {
  reign: r('Reign: ', 'Règne : ', 'الخلافة: ', 'Reinado: '),
  passed: r('Passed: ', 'Décès : ', 'الوفاة: ', 'Falleció: '),
  hadiths: r('Hadiths', 'hadiths', 'حديثاً مسنداً', 'hadices'),
  lineage: r('Lineage', 'Lignée', 'النسب الشريف والأصل', 'Linaje'),
  mother: r('Mother: ', 'Mère : ', 'الأم الكريمة: ', 'Madre: '),
  biography: r('Summary', 'Résumé', 'نبذة عن حياته', 'Resumen'),
  works: r('Works', 'Œuvres', 'المصنفات والمؤلفات الخالدة', 'Obras'),
  teachers: r('Teachers', 'Maîtres', 'كبار الشيوخ والأساتذة', 'Maestros'),
  students: r('Students and narrators', 'Élèves et transmetteurs', 'كبار التلاميذ والرواة', 'Alumnos y transmisores'),
  quotes: r('Sayings', 'Paroles', 'من درر أقوالهم ووصاياهم', 'Dichos'),
  milestones: r('Milestones', 'Étapes de sa vie', 'محطات تاريخية فارقة في حياته', 'Etapas de su vida'),
  achievements: r('Achievements', 'Réalisations', 'المآثر والإنجازات الكبرى', 'Logros'),
  burial: r('Burial place:', 'Lieu de sépulture :', 'المرقد الشريف:', 'Lugar de sepultura:'),
  viewMap: r('View on map', 'Voir sur la carte', 'عرض على الخريطة', 'Ver en el mapa'),
  close: r('Close', 'Fermer', 'إغلاق', 'Cerrar'),
  relations: r('Relations', 'Liens', 'صلاته في الشجرة', 'Relaciones'),
  story: r('His story', 'Son histoire', 'قصته', 'Su historia'),
  storyHer: r('Her story', 'Son histoire', 'قصتها', 'Su historia'),
  challenges: r('Trials he faced', 'Les épreuves', 'المحن التي واجهها', 'Las pruebas'),
  challengesHer: r('Trials she faced', 'Les épreuves', 'المحن التي واجهتها', 'Las pruebas'),
  sacrifices: r('What he gave up', 'Ses sacrifices', 'ما ضحّى به', 'Sus sacrificios'),
  sacrificesHer: r('What she gave up', 'Ses sacrifices', 'ما ضحّت به', 'Sus sacrificios'),
  readStory: r('Read the story', 'Lire l’histoire', 'اقرأ القصة', 'Leer la historia'),
  zoomHint: r('Zoom in to read every relation', 'Zoomez pour lire chaque lien', 'كبّر الشجرة لقراءة كل الصلات', 'Acerca para leer cada relación'),
}

/**
 * Lines of the tree, each with the name of the relation, read from `from` to `to`.
 * - lineage: blood or marriage, stated in the hadith collections or the standard genealogies
 * - succession: who held the caliphate after whom (not a blood link unless the label says so)
 * - hadith / mentorship: teaching, companionship and transmission
 * - era: two dynasties joined by a handover of the caliphate title, not by blood
 */
const TREE_LINKS: TreeLink[] = [
  // The Prophet's ﷺ household
  { from: 'prophet_muhammad', to: 'fatimah_az_zahra', type: 'lineage', label: r('Daughter', 'Fille', 'ابنته', 'Hija') },
  { from: 'prophet_muhammad', to: 'ali_ibn_abi_talib', type: 'lineage', label: r('Cousin & son-in-law', 'Cousin et gendre', 'ابن عمه وصهره', 'Primo y yerno') },
  { from: 'fatimah_az_zahra', to: 'hasan_ibn_ali', type: 'lineage', label: r('Son', 'Fils', 'ابنها', 'Hijo') },
  { from: 'fatimah_az_zahra', to: 'husayn_ibn_ali', type: 'lineage', label: r('Son', 'Fils', 'ابنها', 'Hijo') },
  {
    from: 'ali_ibn_abi_talib', to: 'hasan_ibn_ali', type: 'lineage', label: r('Son · caliph after him', 'Fils · calife après lui', 'ابنه وخليفته', 'Hijo · califa tras él'),
    note: r('Son · caliph after him (about 6 months)', 'Fils · calife après lui (environ 6 mois)', 'ابنه · خليفته نحو ستة أشهر', 'Hijo · califa tras él (unos 6 meses)'),
  },
  { from: 'ali_ibn_abi_talib', to: 'husayn_ibn_ali', type: 'lineage', label: r('Son', 'Fils', 'ابنه', 'Hijo') },

  // The Rightly Guided Caliphs
  {
    from: 'prophet_muhammad', to: 'abu_bakr', type: 'succession', label: r('1st caliph', '1er calife', 'الخليفة الأول', '1.er califa'),
    note: r('Closest companion, father-in-law, first caliph', 'Compagnon intime, beau-père, premier calife', 'صاحبه وصهره، والخليفة الأول', 'Compañero íntimo, suegro, primer califa'),
  },
  {
    from: 'abu_bakr', to: 'umar_ibn_khattab', type: 'succession', label: r('2nd caliph', '2e calife', 'الخليفة الثاني', '2.º califa'),
    note: r('Second caliph, named by Abu Bakr', 'Deuxième calife, désigné par Abou Bakr', 'الخليفة الثاني باستخلاف أبي بكر', 'Segundo califa, designado por Abu Bakr'),
  },
  {
    from: 'umar_ibn_khattab', to: 'uthman_ibn_affan', type: 'succession', label: r('3rd caliph', '3e calife', 'الخليفة الثالث', '3.er califa'),
    note: r('Third caliph, chosen by the council of six', 'Troisième calife, choisi par le conseil des six', 'الخليفة الثالث باختيار أهل الشورى الستة', 'Tercer califa, elegido por el consejo de los seis'),
  },
  { from: 'uthman_ibn_affan', to: 'ali_ibn_abi_talib', type: 'succession', label: r('4th caliph', '4e calife', 'الخليفة الرابع', '4.º califa') },

  // Hadith: the companion who narrated most, and the two great compilers
  {
    from: 'prophet_muhammad', to: 'abu_hurairah', type: 'hadith', label: r('Companion · narrator', 'Compagnon · rapporteur', 'صحابي وراوية', 'Compañero · transmisor'),
    note: r('Companion who narrated the most hadith', 'Compagnon qui a rapporté le plus de hadiths', 'صحابي، أكثر الصحابة رواية للحديث', 'Compañero que más hadices transmitió'),
  },
  {
    from: 'abu_hurairah', to: 'imam_bukhari', type: 'hadith', label: r('Chains of narration', 'Chaînes de transmission', 'بالأسانيد', 'Cadenas de transmisión'),
    note: r('His narrations reached al-Bukhari by chains of narrators', 'Ses récits parvinrent à al-Bukhari par des chaînes de transmetteurs', 'وصلت مروياته إلى البخاري بالأسانيد', 'Sus relatos llegaron a al-Bujari por cadenas de transmisores'),
  },
  {
    from: 'imam_bukhari', to: 'imam_muslim', type: 'mentorship', label: r('Teacher', 'Maître', 'شيخه', 'Maestro'),
    note: r('Teacher of Imam Muslim', 'Maître de l’imam Muslim', 'شيخ الإمام مسلم', 'Maestro del imam Muslim'),
  },

  // Hasanid lines that still rule today
  { from: 'hasan_ibn_ali', to: 'idris_i', type: 'lineage', label: r('Great-grandson', 'Arrière-petit-fils', 'ابن حفيده', 'Bisnieto') },
  {
    from: 'hasan_ibn_ali', to: 'moulay_ali_cherif', type: 'lineage', label: r('Descendant', 'Descendant', 'من ذريته', 'Descendiente'),
    note: r('Descendant (Hasanid sharifs of Tafilalt)', 'Descendant (chérifs hassanides du Tafilalet)', 'من ذريته (الشرفاء الحسنيون بتافيلالت)', 'Descendiente (jerifes hasaníes de Tafilalt)'),
  },
  {
    from: 'moulay_ali_cherif', to: 'mohammed_v_morocco', type: 'lineage', label: r('Descendant', 'Descendant', 'من ذريته', 'Descendiente'),
    note: r('Descendant (Alaouite sultans)', 'Descendant (sultans alaouites)', 'من ذريته (السلاطين العلويون)', 'Descendiente (sultanes alauíes)'),
  },
  {
    from: 'mohammed_v_morocco', to: 'king_mohammed_vi', type: 'lineage', label: r('Grandson', 'Petit-fils', 'حفيده', 'Nieto'),
    note: r('Grandson (son of Hassan II)', 'Petit-fils (fils de Hassan II)', 'حفيده (ابن الحسن الثاني)', 'Nieto (hijo de Hasán II)'),
  },
  {
    from: 'hasan_ibn_ali', to: 'sharif_hussein_hejaz', type: 'lineage', label: r('Descendant', 'Descendant', 'من ذريته', 'Descendiente'),
    note: r('Descendant (sharifs of Makkah)', 'Descendant (chérifs de La Mecque)', 'من ذريته (أشراف مكة)', 'Descendiente (jerifes de La Meca)'),
  },
  { from: 'sharif_hussein_hejaz', to: 'king_hussein_jordan', type: 'lineage', label: r('Great-grandson', 'Arrière-petit-fils', 'ابن حفيده', 'Bisnieto') },
  { from: 'king_hussein_jordan', to: 'king_abdullah_ii', type: 'lineage', label: r('Son', 'Fils', 'ابنه', 'Hijo') },

  // Umayyads, in Damascus then in Cordoba
  {
    from: 'hasan_ibn_ali', to: 'muawiyah_i', type: 'succession', label: r('Ceded the caliphate', 'Cession du califat', 'تنازل له عن الخلافة', 'Cesión del califato'),
    note: r('Al-Hasan gave up the caliphate to him (41 AH)', 'Al-Hasan lui céda le califat (41 H)', 'تنازل له الحسن عن الخلافة (41 هـ)', 'Al-Hasan le cedió el califato (41 H)'),
  },
  {
    from: 'uthman_ibn_affan', to: 'muawiyah_i', type: 'lineage', label: r('Kinsman', 'Parent', 'من قرابته', 'Pariente'),
    note: r('Kinsman (Banu Umayyah)', 'Parent (Banou Omeyya)', 'من قرابته (بنو أمية)', 'Pariente (Banu Umayya)'),
  },
  {
    from: 'muawiyah_i', to: 'abdalmalik_marwan', type: 'succession', label: r('Umayyad caliphs', 'Califes omeyyades', 'خلفاء بني أمية', 'Califas omeyas'),
    note: r('Umayyad caliphate (Marwanid branch)', 'Califat omeyyade (branche marwanide)', 'الخلافة الأموية (الفرع المرواني)', 'Califato omeya (rama marwaní)'),
  },
  { from: 'abdalmalik_marwan', to: 'umar_ibn_abd_al_aziz', type: 'lineage', label: r('Nephew & son-in-law', 'Neveu et gendre', 'ابن أخيه وصهره', 'Sobrino y yerno') },
  { from: 'abdalmalik_marwan', to: 'abdalrahman_i_cordoba', type: 'lineage', label: r('Great-grandson', 'Arrière-petit-fils', 'ابن حفيده', 'Bisnieto') },
  {
    from: 'abdalrahman_i_cordoba', to: 'abdalrahman_iii_cordoba', type: 'lineage', label: r('Descendant', 'Descendant', 'من ذريته', 'Descendiente'),
    note: r('Descendant · caliph of Cordoba (316 AH)', 'Descendant · calife de Cordoue (316 H)', 'من ذريته · خليفة قرطبة (316 هـ)', 'Descendiente · califa de Córdoba (316 H)'),
  },

  // Abbasids
  { from: 'prophet_muhammad', to: 'abu_jafar_mansur', type: 'lineage', label: r('From his uncle al-‘Abbas', 'Par son oncle al-‘Abbas', 'من ذرية عمه العباس', 'Por su tío al-‘Abbas') },
  { from: 'abu_jafar_mansur', to: 'harun_al_rashid', type: 'lineage', label: r('Grandson', 'Petit-fils', 'حفيده', 'Nieto') },
  { from: 'harun_al_rashid', to: 'al_mamun', type: 'lineage', label: r('Son', 'Fils', 'ابنه', 'Hijo') },

  // Ottomans: a separate family. The caliphate title passed to them from the Abbasids of Cairo in 1517.
  {
    from: 'al_mamun', to: 'selim_i_yavuz', type: 'era', label: r('Caliphate title, 1517', 'Titre de calife, 1517', 'لقب الخلافة 1517م', 'Título de califa, 1517'),
    note: r('Caliphate title passed from the Abbasids to the Ottomans (923 AH / 1517)', 'Le titre de calife passa des Abbassides aux Ottomans (923 H / 1517)', 'انتقل لقب الخلافة من العباسيين إلى العثمانيين (923 هـ / 1517 م)', 'El título de califa pasó de los abasíes a los otomanos (923 H / 1517)'),
  },
  { from: 'osman_i', to: 'mehmed_ii_fatih', type: 'lineage', label: r('Descendant', 'Descendant', 'من ذريته', 'Descendiente') },
  { from: 'mehmed_ii_fatih', to: 'selim_i_yavuz', type: 'lineage', label: r('Grandson', 'Petit-fils', 'حفيده', 'Nieto') },
  { from: 'selim_i_yavuz', to: 'suleiman_the_magnificent', type: 'lineage', label: r('Son', 'Fils', 'ابنه', 'Hijo') },
  { from: 'suleiman_the_magnificent', to: 'abdulhamid_ii', type: 'lineage', label: r('Descendant', 'Descendant', 'من ذريته', 'Descendiente') },

  // Companions
  { from: 'prophet_muhammad', to: 'hamzah_ibn_abd_muttalib', type: 'lineage', label: r('Uncle & milk-brother', 'Oncle et frère de lait', 'عمه وأخوه من الرضاعة', 'Tío y hermano de leche') },
  {
    from: 'prophet_muhammad', to: 'zubayr_ibn_awwam', type: 'lineage', label: r('Aunt’s son · disciple', 'Fils de sa tante · disciple', 'ابن عمته وحواريّه', 'Hijo de su tía · discípulo'),
    note: r('Son of his aunt Safiyyah · his disciple (hawari)', 'Fils de sa tante Safiyya · son disciple (hawari)', 'ابن عمته صفية · حواريّه', 'Hijo de su tía Safiyya · su discípulo (hawari)'),
  },
  {
    from: 'prophet_muhammad', to: 'sad_ibn_abi_waqqas', type: 'mentorship', label: r('Maternal kin', 'Parent maternel', 'من أخواله', 'Pariente materno'),
    note: r('His maternal kin (Banu Zuhrah) · one of the Ten', 'Parent maternel (Banou Zouhra) · l’un des Dix', 'من أخواله (بنو زهرة) · أحد العشرة', 'Pariente materno (Banu Zuhra) · uno de los Diez'),
  },
  {
    from: 'prophet_muhammad', to: 'talhah_ibn_ubaydillah', type: 'mentorship', label: r('One of the Ten', 'L’un des Dix', 'أحد العشرة', 'Uno de los Diez'),
    note: r('Companion · one of the Ten', 'Compagnon · l’un des Dix', 'صحابي · أحد العشرة', 'Compañero · uno de los Diez'),
  },
  {
    from: 'prophet_muhammad', to: 'abdurrahman_ibn_awf', type: 'mentorship', label: r('One of the Ten', 'L’un des Dix', 'أحد العشرة', 'Uno de los Diez'),
    note: r('Companion · one of the Ten', 'Compagnon · l’un des Dix', 'صحابي · أحد العشرة', 'Compañero · uno de los Diez'),
  },
  {
    from: 'prophet_muhammad', to: 'said_ibn_zayd', type: 'mentorship', label: r('One of the Ten', 'L’un des Dix', 'أحد العشرة', 'Uno de los Diez'),
    note: r('Companion · one of the Ten', 'Compagnon · l’un des Dix', 'صحابي · أحد العشرة', 'Compañero · uno de los Diez'),
  },
  {
    from: 'prophet_muhammad', to: 'abu_ubaydah_jarrah', type: 'mentorship', label: r('Trustee of the nation', 'Homme de confiance', 'أمين الأمة', 'Hombre de confianza'),
    note: r('“The trustee of this nation” · one of the Ten', '« L’homme de confiance de cette nation » · l’un des Dix', 'أمين هذه الأمة · أحد العشرة', '«El hombre de confianza de esta nación» · uno de los Diez'),
  },
  {
    from: 'prophet_muhammad', to: 'khalid_ibn_walid', type: 'mentorship', label: r('Sword of Allah', 'Épée d’Allah', 'سيف الله', 'Espada de Allah'),
    note: r('Companion · “a sword of Allah”', 'Compagnon · « une épée d’Allah »', 'صحابي · سيف من سيوف الله', 'Compañero · «una espada de Allah»'),
  },
  {
    from: 'prophet_muhammad', to: 'bilal_ibn_rabah', type: 'mentorship', label: r('His muezzin', 'Son muezzin', 'مؤذنه', 'Su almuédano'),
    note: r('Companion · his muezzin', 'Compagnon · son muezzin', 'صحابي · مؤذنه', 'Compañero · su almuédano'),
  },
  { from: 'prophet_muhammad', to: 'salman_al_farsi', type: 'mentorship', label: r('Companion', 'Compagnon', 'صحابي', 'Compañero') },
]

// Date localization & BiDi protection helpers
function formatDeathDate(death: { ah: string; ce: string }, lang: Lang): string {
  if (death.ah === 'Living' || death.ce === 'Current') {
    return lang === 'ar' ? 'معاصر' : lang === 'fr' ? 'Actuel' : 'Living'
  }
  let s = death.ah
  if (lang === 'ar') {
    s = s
      .replace(/\bAH\b/g, 'هـ')
      .replace(/\bBattle of Uhud\b/gi, 'غزوة أحد')
      .replace(/\bBattle of the Camel\b/gi, 'وقعة الجمل')
      .replace(/\bPlague of Amwas\b/gi, 'طاعون عمواس')
      .replace(/\bduring Hajj\b/gi, 'في الحج')
      .replace(/\bAshura\b/gi, 'عاشوراء')
      .replace(/\b12 Rabi al-Awwal\b/gi, '12 ربيع الأول')
      .replace(/\b3 Jumada al-Thani\b/gi, '3 جمادى الآخرة')
      .replace(/\b21 Ramadan\b/gi, '21 رمضان')
      .replace(/\bRabi al-Awwal\b/gi, 'ربيع الأول')
      .replace(/\b10 Muharram\b/gi, '10 محرم')
      .replace(/\b22 Jumada al-Akhirah\b/gi, '22 جمادى الآخرة')
      .replace(/\b26 Dhu al-Hijjah\b/gi, '26 ذو الحجة')
      .replace(/\b18 Dhu al-Hijjah\b/gi, '18 ذو الحجة')
      .replace(/\b1 Shawwal\b/gi, '1 شوال')
      .replace(/\b25 Rajab\b/gi, '25 رجب')
      .replace(/\b20 Rajab\b/gi, '20 رجب')
      .replace(/\b10 Ramadan\b/gi, '10 رمضان')
  } else if (lang === 'fr') {
    s = s.replace(/\bAH\b/g, 'H')
  }
  return s
}

function formatReignDate(reign: { ah?: string; ce?: string } | undefined, lang: Lang): string {
  if (!reign?.ah) return ''
  let s = reign.ah
  if (lang === 'ar') {
    s = s.replace(/\bAH\b/g, 'هـ').replace(/\bto\b/g, 'إلى')
  } else if (lang === 'fr') {
    s = s.replace(/\bAH\b/g, 'H').replace(/\bto\b/g, 'à')
  }
  return s
}

export function SahabaTree({ focus }: { focus?: string }) {
  const { lang, pick } = useI18n()
  const [selectedEra, setSelectedEra] = useState<SahabaEra | 'all'>('all')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState<'tree' | 'timeline' | 'cards'>('tree')
  const [activeFigure, setActiveFigure] = useState<SahabaFigure | null>(() => {
    if (focus) {
      return SAHABA_FIGURES.find((f) => f.id === focus) ?? null
    }
    return null
  })

  // Canvas Pan & Zoom State for the Interactive Pure SVG Tree View (exact architecture as Tree.tsx)
  const box = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [view, setView] = useState<View>({ k: 0.45, x: 0, y: 0 })
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ d: number; k: number } | null>(null)
  const moved = useRef(false)
  const downNode = useRef<string | null>(null)

  // Auto-fit function that centers the entire tree symmetrically into the viewport
  const fit = useCallback((centerId?: string) => {
    const el = box.current
    if (!el) return
    const cw = el.clientWidth
    const ch = el.clientHeight
    const layoutW = 2400
    const layoutH = 1850

    if (centerId && SAHABA_NODE_COORDS[centerId]) {
      const target = SAHABA_NODE_COORDS[centerId]
      const k = 0.75
      setView({ k, x: cw / 2 - target.x * k, y: ch / 2.6 - target.y * k })
      return
    }

    const k = Math.min(1.0, Math.min(cw / layoutW, ch / layoutH) * 0.94)
    setView({
      k: Math.max(0.3, k),
      x: (cw - layoutW * k) / 2,
      y: Math.max(20, (ch - layoutH * k) / 2),
    })
  }, [])

  // Auto-focus camera on figures matching a specific selected era
  const focusEra = useCallback(
    (eraId: SahabaEra | 'all') => {
      if (eraId === 'all') {
        fit()
        return
      }
      const el = box.current
      if (!el) return
      const cw = el.clientWidth || 1000
      const ch = el.clientHeight || 780

      const matching = SAHABA_FIGURES.filter((f) => f.era === eraId)
        .map((f) => SAHABA_NODE_COORDS[f.id])
        .filter((c): c is { x: number; y: number } => !!c)

      if (matching.length === 0) {
        fit()
        return
      }

      const minX = Math.min(...matching.map((c) => c.x))
      const maxX = Math.max(...matching.map((c) => c.x))
      const minY = Math.min(...matching.map((c) => c.y))
      const maxY = Math.max(...matching.map((c) => c.y))

      const spanX = Math.max(500, maxX - minX + 280)
      const spanY = Math.max(400, maxY - minY + 280)
      const midX = (minX + maxX) / 2
      const midY = (minY + maxY) / 2

      const k = Math.max(0.4, Math.min(1.0, Math.min(cw / spanX, ch / spanY) * 0.85))
      setView({
        k,
        x: cw / 2 - midX * k,
        y: ch / 2 - midY * k,
      })
    },
    [fit]
  )

  useEffect(() => {
    fit()
    const handleResize = () => fit()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [fit])

  // Gestures for SVG tree: Pan, multi-touch pinch-to-zoom, and wheel zoom
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    // Only primary button (left click) or touch should initiate drag
    if (e.pointerType === 'mouse' && e.button !== 0) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 1) {
      moved.current = false
      const target = (e.target as HTMLElement).closest('[data-node]')
      downNode.current = target ? target.getAttribute('data-node') : null
    } else if (pointers.current.size === 2) {
      const pList = Array.from(pointers.current.values())
      if (pList.length >= 2) {
        const p1 = pList[0]!
        const p2 = pList[1]!
        const d = Math.hypot(p2.x - p1.x, p2.y - p1.y)
        pinch.current = { d, k: view.k }
      }
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const prev = pointers.current.get(e.pointerId)
    // CRITICAL: If the pointer was NOT registered in handlePointerDown, DO NOT PAN!
    if (!prev) return

    // If mouse button is not currently pressed, clean up and do not pan
    if (e.pointerType === 'mouse' && e.buttons === 0) {
      pointers.current.delete(e.pointerId)
      return
    }

    const next = { x: e.clientX, y: e.clientY }
    pointers.current.set(e.pointerId, next)

    if (pointers.current.size === 1) {
      const dx = next.x - prev.x
      const dy = next.y - prev.y
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved.current = true
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }))
    } else if (pointers.current.size === 2 && pinch.current) {
      moved.current = true
      const pList = Array.from(pointers.current.values())
      if (pList.length >= 2) {
        const p1 = pList[0]!
        const p2 = pList[1]!
        const d = Math.hypot(p2.x - p1.x, p2.y - p1.y)
        const ratio = d / pinch.current.d
        const newK = Math.max(0.2, Math.min(2.0, pinch.current.k * ratio))
        setView((v) => ({ ...v, k: newK }))
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    const hadPointer = pointers.current.has(e.pointerId)
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
    } catch {
      // ignore
    }
    if (hadPointer && !moved.current && downNode.current) {
      const fig = SAHABA_FIGURES.find((f) => f.id === downNode.current)
      if (fig) setActiveFigure(fig)
    }
    downNode.current = null
  }

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault()
    const factor = e.deltaY < 0 ? 1.08 : 0.92
    const el = box.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    setView((v) => {
      const nextK = Math.max(0.2, Math.min(2.2, v.k * factor))
      const scale = nextK / v.k
      return {
        k: nextK,
        x: mx - (mx - v.x) * scale,
        y: my - (my - v.y) * scale,
      }
    })
  }

  // Filtered Figures
  const filteredFigures = useMemo(() => {
    return SAHABA_FIGURES.filter((fig) => {
      if (selectedEra !== 'all' && fig.era !== selectedEra) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        fig.name.en.toLowerCase().includes(q) ||
        fig.name.fr.toLowerCase().includes(q) ||
        fig.name.ar.includes(q) ||
        fig.title.en.toLowerCase().includes(q) ||
        fig.title.ar.includes(q) ||
        fig.lineage.en.toLowerCase().includes(q) ||
        fig.lineage.ar.includes(q) ||
        fig.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [selectedEra, query])

  // Active Lineage Highlight Set (traces ancestry chain to the Prophet ﷺ)
  const activeLineageIds = useMemo(() => {
    if (!activeFigure) return new Set<string>()
    const set = new Set<string>()
    set.add(activeFigure.id)

    // Traverse upwards to root
    const queue = [activeFigure.id]
    while (queue.length > 0) {
      const curr = queue.shift()!
      for (const l of TREE_LINKS) {
        if (l.to === curr && !set.has(l.from)) {
          set.add(l.from)
          queue.push(l.from)
        }
      }
    }
    return set
  }, [activeFigure])

  // Chronologically Sorted Figures for the Timeline
  const chronologicalFigures = useMemo(() => {
    return [...filteredFigures].sort((a, b) => {
      const getYear = (fig: SahabaFigure) => {
        const b = fig.lifeDates.birth?.ah
        if (b) {
          if (b.includes('BH')) return -(parseInt(b, 10) || 50)
          return parseInt(b, 10) || 2000
        }
        const d = fig.lifeDates.death.ah
        if (d === 'Living' || d === 'Current') return 2000
        if (d.includes('BH')) return -(parseInt(d, 10) || 50)
        return parseInt(d, 10) || 100
      }
      return getYear(a) - getYear(b)
    })
  }, [filteredFigures])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-950/30 via-night-2 to-night-1 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -end-16 -top-16 size-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -start-16 -bottom-16 size-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3 shadow-sm">
              <Crown className="size-3.5 text-amber-400" />
              <span>
                {lang === 'ar'
                  ? 'شجرة الصحابة والخلافة وحفظة الحديث والسلالات النبوية إلى اليوم'
                  : 'Tree of Companions, Caliphs, Hadith Masters & Living Prophetic Dynasties'}
              </span>
            </div>
            <h1 className="ar-name text-3xl sm:text-5xl font-extrabold tracking-tight text-ink mb-3 gold-text">
              {lang === 'ar'
                ? 'شجرة الصحابة والخلفاء وأئمة الحديث وسلالات النبي ﷺ'
                : lang === 'fr'
                ? 'Arbre des Sahaba, Califes, Maîtres du Hadith & Descendance Prophétique'
                : 'Tree of Sahaba, Caliphs, Hadith Masters & Prophetic Lineage to Present'}
            </h1>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              {lang === 'ar'
                ? 'شجرة تفاعلية جامعة لنسب وسيرة رسول الله ﷺ، والخلفاء الراشدين، والعشرة المبشرين بالجنة، وأكابر حفظة السُنّة وأئمة الحديث (أبو هريرة، البخاري، ومسلم)، والدول الإسلامية الكبرى، مع سلالات آل البيت المستمرة حتى ملك المغرب محمد السادس وملك الأردن عبد الله الثاني.'
                : lang === 'fr'
                ? 'Arbre généalogique interactif reliant le Prophète ﷺ, les 5 Califes bien guidés, les Dix Promis au Paradis, les maîtres du Hadith (Abou Hourayra, Al-Boukhari, Muslim) et les dynasties chérifiennes régnantes.'
                : 'Interactive genealogical and succession star tree spanning from Prophet Muhammad ﷺ, the Rightly Guided Caliphs, the Hadith Masters (Abu Hurairah, Al-Bukhari, Muslim), historic empires, down to living Hasanid monarchs in Morocco and Jordan.'}
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-row md:flex-col gap-2 shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-center">
              <div className="text-xl font-extrabold text-gold font-mono">1,446+</div>
              <div className="text-[0.68rem] text-ink-3">
                {lang === 'ar' ? 'سنة من التاريخ المتصل' : 'Years of Lineage'}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-center">
              <div className="text-xl font-extrabold text-cyan-400 font-mono">41+</div>
              <div className="text-[0.68rem] text-ink-3">
                {lang === 'ar' ? 'شخصية موثقة ومعتمدة' : 'Documented Figures'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher & Search Bar */}
      <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* View Mode Tabs */}
        <div className="inline-flex max-w-full overflow-x-auto no-scrollbar rounded-2xl border border-white/10 bg-night-2 p-1 text-xs font-semibold shadow-inner">
          <button
            type="button"
            onClick={() => setViewMode('tree')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all cursor-pointer ${
              viewMode === 'tree'
                ? 'bg-emerald-500 text-night font-bold shadow-md'
                : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Layers className="size-4" />
            <span>{lang === 'ar' ? 'الشجرة النجمية التفاعلية' : 'Interactive Tree'}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-cyan-500 text-night font-bold shadow-md'
                : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Clock className="size-4" />
            <span>{lang === 'ar' ? 'الخط الزمني المتسلسل' : 'Chronological Timeline'}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-amber-500 text-night font-bold shadow-md'
                : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Users className="size-4" />
            <span>{lang === 'ar' ? 'بطاقات السِّيَر المفصلة' : 'Detailed Cards'}</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'ابحث بالاسم، اللقب، النسب، أو الحقبة...'
                : 'Search by name, title, lineage, or era...'
            }
            className="w-full rounded-2xl border border-white/10 bg-night-2 ps-10 pe-4 py-2.5 text-xs text-ink placeholder:text-ink-3 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Era Filter Chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SAHABA_ERAS.map((era) => {
          const count =
            era.id === 'all'
              ? SAHABA_FIGURES.length
              : SAHABA_FIGURES.filter((f) => f.era === era.id).length
          const isActive = selectedEra === era.id
          return (
            <button
              key={era.id}
              type="button"
              onClick={() => {
                setSelectedEra(era.id)
                if (era.id === 'all') {
                  fit()
                } else {
                  focusEra(era.id)
                }
              }}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-emerald-500 text-night font-bold shadow-md ring-2 ring-emerald-400/50 scale-[1.03]'
                  : 'border border-white/10 bg-night-2 text-ink-3 hover:text-ink hover:border-white/20'
              }`}
            >
              <span
                className="size-2 rounded-full shrink-0"
                style={{ backgroundColor: era.badgeColor }}
              />
              <span>{pick(era.label)}</span>
              <span className="opacity-80 text-[0.65rem] font-mono">({count})</span>
            </button>
          )
        })}
      </div>

      {/* 1. INTERACTIVE 2D PURE SVG CONSTELLATION CANVAS TREE (LIKE TREE OF PROPHETS) */}
      {viewMode === 'tree' && (
        <div
          ref={box}
          className="relative w-full h-[780px] rounded-3xl border border-white/10 bg-[#070b18] overflow-hidden select-none shadow-2xl"
        >
          {/* Floating Canvas Controls */}
          <div className="absolute top-4 end-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-night-2/95 backdrop-blur-md px-3 py-1.5 shadow-xl">
            <button
              type="button"
              onClick={() => setView((v) => ({ ...v, k: Math.min(2.0, v.k * 1.15) }))}
              className="p-1 text-ink-3 hover:text-ink transition-colors cursor-pointer"
              title="Zoom In"
            >
              <Plus className="size-4" />
            </button>
            <span className="font-mono text-xs text-gold px-1">{Math.round(view.k * 100)}%</span>
            <button
              type="button"
              onClick={() => setView((v) => ({ ...v, k: Math.max(0.2, v.k * 0.85) }))}
              className="p-1 text-ink-3 hover:text-ink transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="size-4" />
            </button>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <button
              type="button"
              onClick={() => fit()}
              className="p-1 text-ink-3 hover:text-ink transition-colors cursor-pointer"
              title="Center & Fit Tree"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
          {view.k < 0.5 && (
            <p className="pointer-events-none absolute top-16 end-4 z-20 rounded-full bg-night-2/90 px-3 py-1 text-[0.7rem] text-ink-3">
              {pick(UI.zoomHint)}
            </p>
          )}

          {/* Active Era Filter Banner or Interactive Legend Pill */}
          {selectedEra !== 'all' ? (
            <div className="absolute top-4 start-4 z-20 flex items-center gap-2 rounded-full border border-emerald-500/50 bg-night-2/95 backdrop-blur-md px-4 py-1.5 text-xs text-ink shadow-xl animate-fadeIn">
              <span
                className="size-2.5 rounded-full animate-ping shrink-0"
                style={{
                  backgroundColor:
                    SAHABA_ERAS.find((e) => e.id === selectedEra)?.badgeColor ?? '#10b981',
                }}
              />
              <span className="font-bold text-emerald-300">
                {lang === 'ar' ? 'تصفية محددة:' : 'Active Filter:'}{' '}
                {pick(SAHABA_ERAS.find((e) => e.id === selectedEra)?.label ?? { en: '', fr: '', ar: '' })} (
                {SAHABA_FIGURES.filter((f) => f.era === selectedEra).length})
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedEra('all')
                  fit()
                }}
                className="ms-2 text-[0.7rem] bg-white/10 hover:bg-emerald-500 hover:text-night text-ink-2 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer font-medium"
              >
                {lang === 'ar' ? 'إلغاء التصفية وعرض الكل ✕' : 'Clear & Show All ✕'}
              </button>
            </div>
          ) : (
            <div className="absolute top-4 start-4 z-20 hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-night-2/95 backdrop-blur-md px-4 py-1.5 text-xs text-ink-2 shadow-xl">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-emerald-400" />
                <span>{lang === 'ar' ? 'الخلفاء الراشدون' : 'Rashidun'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-cyan-400" />
                <span>{lang === 'ar' ? 'أئمة الحديث' : 'Hadith Masters'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span>{lang === 'ar' ? 'آل البيت والنسب الشريف' : 'Prophetic Lineage'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-purple-400" />
                <span>{lang === 'ar' ? 'المبشرون وكبار الصحابة' : 'Promised Paradise'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-indigo-400" />
                <span>{lang === 'ar' ? 'الخلافات الإسلامية' : 'Caliphates'}</span>
              </span>
            </div>
          )}

          {/* Pure SVG Drag & Zoom Canvas Surface */}
          <svg
            ref={svgRef}
            className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onWheel={handleWheel}
          >
            <defs>
              <radialGradient id="starNebula" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#070b18" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="haloProphet" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="haloRashidun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="haloHadith" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="haloMubashar" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="haloCaliph" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
              {/* Background Celestial Stars */}
              <circle cx="1200" cy="500" r="900" fill="url(#starNebula)" />

              {/* Connecting Curved Lines */}
              {TREE_LINKS.map((link, idx) => {
                const from = SAHABA_NODE_COORDS[link.from]
                const to = SAHABA_NODE_COORDS[link.to]
                if (!from || !to) return null

                const isGlowing =
                  (activeLineageIds.has(link.from) && activeLineageIds.has(link.to)) ||
                  activeFigure?.id === link.from ||
                  activeFigure?.id === link.to

                const fromFig = SAHABA_FIGURES.find((f) => f.id === link.from)
                const toFig = SAHABA_FIGURES.find((f) => f.id === link.to)
                const lineMatchesEra =
                  selectedEra === 'all' ||
                  fromFig?.era === selectedEra ||
                  toFig?.era === selectedEra

                const midY = (from.y + to.y) / 2
                const d = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`

                let stroke = 'rgba(255, 255, 255, 0.16)'
                if (isGlowing) stroke = '#facc15'
                else if (link.type === 'hadith' || link.type === 'mentorship') stroke = '#38bdf8'
                else if (link.type === 'lineage') stroke = '#fbbf24'
                else if (link.type === 'era') stroke = '#94a3b8'
                else stroke = '#34d399'

                return (
                  <path
                    key={idx}
                    d={d}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={isGlowing ? 3.6 : 1.7}
                    strokeDasharray={link.type === 'mentorship' ? '5 5' : link.type === 'era' ? '2 7' : undefined}
                    opacity={isGlowing ? 1 : lineMatchesEra ? 0.85 : 0.12}
                    className={isGlowing ? 'drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]' : ''}
                  />
                )
              })}

              {/* Celestial Nodes (Exact Style & Interaction as Tree of Prophets) */}
              {SAHABA_FIGURES.map((fig) => {
                const coord = SAHABA_NODE_COORDS[fig.id]
                if (!coord) return null

                const isProphet = fig.roleCategory === 'prophet'
                const isRashidun = fig.roleCategory === 'rashidun_caliph'
                const isHadithMaster = fig.roleCategory === 'hadith_master'
                const isMubashar = fig.roleCategory === 'mubashar'
                const isAhlulBayt = fig.roleCategory === 'ahlulbayt_imam'

                const isActive = activeFigure?.id === fig.id
                const isConnected = activeLineageIds.has(fig.id)

                const isMatchEra = selectedEra === 'all' || fig.era === selectedEra
                const isSearchMatch = !query.trim() || filteredFigures.some((ff) => ff.id === fig.id)
                const isHighlighted = isMatchEra && isSearchMatch
                const isDimmed = !isHighlighted || (activeFigure && !isConnected && !isActive)

                const r = isProphet ? 22 : isRashidun ? 18 : isHadithMaster ? 17 : 14
                const haloFill = isProphet
                  ? 'url(#haloProphet)'
                  : isRashidun
                  ? 'url(#haloRashidun)'
                  : isHadithMaster
                  ? 'url(#haloHadith)'
                  : isMubashar
                  ? 'url(#haloMubashar)'
                  : 'url(#haloCaliph)'

                const orbFill = isProphet
                  ? '#064e3b'
                  : isRashidun
                  ? '#065f46'
                  : isHadithMaster
                  ? '#0e7490'
                  : isMubashar
                  ? '#581c87'
                  : '#1e1b4b'

                const dateText = formatDeathDate(fig.lifeDates.death, lang)
                const pillW = Math.max(68, dateText.length * 6.5 + 16)

                return (
                  <g
                    key={fig.id}
                    data-node={fig.id}
                    transform={`translate(${coord.x},${coord.y})`}
                    className="cursor-pointer transition-all duration-300 group"
                    opacity={isDimmed ? 0.22 : 1}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveFigure(fig)}
                  >
                    {/* Outer Glow Halo */}
                    <circle
                      r={r * 3.2}
                      fill={haloFill}
                      opacity={isActive ? 0.95 : isConnected ? 0.75 : isMatchEra && selectedEra !== 'all' ? 0.7 : 0.3}
                    />

                    {/* Active Pulsating Ring */}
                    {isActive && (
                      <circle
                        r={r + 8}
                        fill="none"
                        stroke="#facc15"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ animationDuration: '6s' }}
                      />
                    )}

                    {/* Filter Matching Beacon Ring */}
                    {!isActive && selectedEra !== 'all' && isMatchEra && (
                      <circle
                        r={r + 7}
                        fill="none"
                        stroke="#34d399"
                        strokeWidth={1.8}
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ animationDuration: '8s' }}
                      />
                    )}

                    {/* Core Celestial Orb */}
                    <circle
                      r={r}
                      fill={orbFill}
                      stroke={isActive ? '#facc15' : '#ffffff'}
                      strokeWidth={isActive ? 2.2 : 1.5}
                      strokeOpacity={0.9}
                    />

                    {/* Central Heraldic Symbol */}
                    <text
                      y={4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={isProphet ? 14 : 11}
                      fontWeight="bold"
                    >
                      {isProphet ? 'ﷺ' : isHadithMaster ? '📜' : isRashidun ? '👑' : isMubashar ? '🌟' : '★'}
                    </text>

                    {/* Arabic Calligraphy Name */}
                    <text
                      y={r + 20}
                      textAnchor="middle"
                      fontFamily="Reem Kufi Variable, serif"
                      fontSize={isProphet ? 20 : 15}
                      fill={isProphet ? '#fbe6b0' : isAhlulBayt ? '#fef08a' : isHadithMaster ? '#67e8f9' : '#ffffff'}
                      fontWeight={700}
                      className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                    >
                      {fig.name.ar}
                    </text>

                    {/* Subtitle Name (Latin) */}
                    {lang !== 'ar' && (
                      <text
                        y={r + 35}
                        textAnchor="middle"
                        fontFamily="Sora Variable, Reem Kufi Variable, sans-serif"
                        fontSize={10.5}
                        fill="#cbd5e1"
                        fontWeight={500}
                        className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                      >
                        {pick(fig.name)}
                      </text>
                    )}

                    {/* Date Pill Badge */}
                    {dateText && (
                      <g transform={`translate(0, ${r + (lang !== 'ar' ? 48 : 34)})`}>
                        <rect
                          x={-pillW / 2}
                          y="-7.5"
                          width={pillW}
                          height="15"
                          rx="7.5"
                          fill="rgba(10, 15, 29, 0.9)"
                          stroke={isProphet ? 'rgba(234, 179, 8, 0.5)' : 'rgba(255, 255, 255, 0.2)'}
                          strokeWidth="0.8"
                        />
                        <text
                          y="3"
                          textAnchor="middle"
                          fontSize="8.5"
                          fill={isProphet ? '#fde047' : isHadithMaster ? '#7dd3fc' : '#94a3b8'}
                          fontFamily="Sora Variable, Reem Kufi Variable, sans-serif"
                          fontWeight={600}
                        >
                          {dateText}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}

              {/* Relationship names, drawn above the nodes. The text keeps the same size on screen at any zoom, so
                  every label is shown once zoomed in, and only the selected figure's labels when zoomed out. */}
              {TREE_LINKS.map((link, idx) => {
                const from = SAHABA_NODE_COORDS[link.from]
                const to = SAHABA_NODE_COORDS[link.to]
                if (!from || !to) return null
                const touchesActive = activeFigure?.id === link.from || activeFigure?.id === link.to
                if (view.k < 0.5 && !touchesActive) return null
                const fromFig = SAHABA_FIGURES.find((f) => f.id === link.from)
                const toFig = SAHABA_FIGURES.find((f) => f.id === link.to)
                if (selectedEra !== 'all' && fromFig?.era !== selectedEra && toFig?.era !== selectedEra && !touchesActive) return null
                const midY = (from.y + to.y) / 2
                const p = pathPoint(`M ${from.x} ${from.y} C ${from.x} ${midY} ${to.x} ${midY} ${to.x} ${to.y}`, 0.5)
                const text = pick(link.label)
                const s = 1 / Math.max(view.k, 0.35)
                const fs = 10.5
                const w = text.length * (lang === 'ar' ? 5.4 : 5.6) + 14
                return (
                  <g key={`label-${idx}`} transform={`translate(${p.x},${p.y}) scale(${s})`} className="pointer-events-none select-none">
                    <rect x={-w / 2} y={-9} width={w} height={18} rx={9} fill="rgba(6, 8, 20, 0.92)" stroke={touchesActive ? '#facc15' : 'rgba(255,255,255,0.18)'} strokeWidth={0.9} />
                    <text y={3.6} textAnchor="middle" fontSize={fs} fontWeight={600} fill={touchesActive ? '#fde68a' : '#e2e8f0'} fontFamily={lang === 'ar' ? 'Reem Kufi Variable, serif' : 'Sora Variable, Reem Kufi Variable, sans-serif'}>
                      {text}
                    </text>
                  </g>
                )
              })}
            </g>
          </svg>

          {/* Bottom Historical Epoch Ruler (BiDi & RTL Protected) */}
          <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-night-2/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-gold font-bold shrink-0">{lang === 'ar' ? 'الحقب التاريخية:' : 'Epochs:'}</span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 inline-flex items-center gap-1.5 whitespace-nowrap">
                <span dir="ltr" className="font-mono font-bold">{lang === 'ar' ? '1 – 11 هـ' : lang === 'fr' ? '1 – 11 H' : '1–11 AH'}</span>
                <span>{lang === 'ar' ? '(عصر النبوة)' : lang === 'fr' ? '(Prophétie)' : '(Prophethood)'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 inline-flex items-center gap-1.5 whitespace-nowrap">
                <span dir="ltr" className="font-mono font-bold">{lang === 'ar' ? '11 – 41 هـ' : lang === 'fr' ? '11 – 41 H' : '11–41 AH'}</span>
                <span>{lang === 'ar' ? '(الخلفاء الراشدون)' : lang === 'fr' ? '(Califes bien guidés)' : '(Rashidun)'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 inline-flex items-center gap-1.5 whitespace-nowrap">
                <span dir="ltr" className="font-mono font-bold">{lang === 'ar' ? '59 – 261 هـ' : lang === 'fr' ? '59 – 261 H' : '59–261 AH'}</span>
                <span>{lang === 'ar' ? '(أئمة الحديث والسنة)' : lang === 'fr' ? '(Maîtres du Hadith)' : '(Hadith Masters)'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300 inline-flex items-center gap-1.5 whitespace-nowrap">
                <span dir="ltr" className="font-mono font-bold">{lang === 'ar' ? '41 – 132 هـ' : lang === 'fr' ? '41 – 132 H' : '41–132 AH'}</span>
                <span>{lang === 'ar' ? '(الدولة الأموية)' : lang === 'fr' ? '(Omeyyades)' : '(Umayyads)'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 inline-flex items-center gap-1.5 whitespace-nowrap">
                <span dir="ltr" className="font-mono font-bold">{lang === 'ar' ? '132 – 656 هـ' : lang === 'fr' ? '132 – 656 H' : '132–656 AH'}</span>
                <span>{lang === 'ar' ? '(الدولة العباسية)' : lang === 'fr' ? '(Abbassides)' : '(Abbasids)'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 inline-flex items-center gap-1.5 whitespace-nowrap">
                <span dir="ltr" className="font-mono font-bold">{lang === 'ar' ? '699 – 1342 هـ' : lang === 'fr' ? '699 – 1342 H' : '699–1342 AH'}</span>
                <span>{lang === 'ar' ? '(الخلافة العثمانية)' : lang === 'fr' ? '(Ottomans)' : '(Ottomans)'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 inline-flex items-center gap-1.5 whitespace-nowrap">
                <span dir="ltr" className="font-mono font-bold">{lang === 'ar' ? '1041 هـ – اليوم' : lang === 'fr' ? '1041 H – Présent' : '1041 AH – Present'}</span>
                <span>{lang === 'ar' ? '(السلالات الشريفة الحية)' : lang === 'fr' ? '(Dynasties Chérifiennes)' : '(Living Dynasties)'}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. CHRONOLOGICAL TIMELINE VIEW */}
      {viewMode === 'timeline' && (
        <div data-testid="sahaba-timeline" className="relative rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-10 shadow-2xl">
          <div className="mb-8 pb-4 border-b border-white/10">
            <h2 className="ar-name text-2xl font-bold text-ink gold-text mb-1">
              {lang === 'ar' ? 'الخط الزمني الموثق للصحابة والخلفاء وأئمة الحديث' : 'Chronological Timeline of Companions, Caliphs & Hadith Masters'}
            </h2>
            <p className="text-xs text-ink-3">
              {lang === 'ar'
                ? 'تسلسل زمني دقيق يبين ولادة ووفاة وأهم أحداث وسير قادة الأمة وحفظة الحديث'
                : 'Exact chronological milestones across 14 centuries of Islamic history'}
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-y-0 before:start-6 before:w-0.5 before:bg-gradient-to-b before:from-gold via-cyan-500 to-purple-500">
            {chronologicalFigures.map((fig, idx) => (
              <div
                key={fig.id}
                data-testid={`sahaba-timeline-${fig.id}`}
                onClick={() => setActiveFigure(fig)}
                className="relative ps-14 group cursor-pointer"
              >
                {/* Timeline Dot */}
                <div
                  className="absolute start-3 top-3.5 -translate-x-1/2 size-7 rounded-full border-2 border-white/80 flex items-center justify-center text-[0.65rem] font-bold shadow-lg transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: fig.symbolColor,
                    color: '#fff',
                  }}
                >
                  {idx + 1}
                </div>

                {/* Timeline Item Box */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all group-hover:border-cyan-500/50 group-hover:bg-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="ar-name text-base font-bold text-ink group-hover:text-gold transition-colors">
                        {pick(fig.name)}
                      </span>
                      {fig.honorific && (
                        <span className="text-[0.68rem] text-emerald-400">
                          {fig.honorific}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {fig.reignDates && (
                        <span dir="ltr" className="text-amber-300 rounded-full bg-amber-500/10 px-2.5 py-0.5 border border-amber-500/20">
                          {formatReignDate(fig.reignDates, lang)}
                        </span>
                      )}
                      <span dir="ltr" className="text-ink-3 rounded-full bg-white/5 px-2.5 py-0.5 border border-white/10">
                        {formatDeathDate(fig.lifeDates.death, lang)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-ink-3 font-medium mb-3">
                    {pick(fig.title)}
                  </p>

                  <p className="text-xs text-ink-2 leading-relaxed mb-3 line-clamp-2">
                    {pick(fig.biography)}
                  </p>

                  {/* Highlights Bar */}
                  <div className="flex flex-wrap items-center gap-3 text-[0.7rem] pt-2 border-t border-white/5 text-ink-3">
                    {fig.hadithsNarrated && (
                      <span className="text-cyan-300 font-semibold flex items-center gap-1 font-mono">
                        <BookOpen className="size-3" />
                        <span>{fig.hadithsNarrated.toLocaleString()} {lang === 'ar' ? 'حديثاً مروياً ومسنداً' : 'Hadiths'}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-emerald-400" />
                      <span>{pick(fig.burialPlace)}</span>
                    </span>
                    <span className="text-cyan-400 font-semibold group-hover:underline ms-auto">
                      {lang === 'ar' ? 'الملف الكامل ←' : 'Full Dossier →'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. BIOGRAPHICAL CARDS VIEW */}
      {viewMode === 'cards' && (
        <div data-testid="sahaba-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFigures.map((fig) => (
            <div
              key={fig.id}
              data-testid={`sahaba-card-${fig.id}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveFigure(fig)
                }
              }}
              onClick={() => setActiveFigure(fig)}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/[0.07] hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md shrink-0 border border-white/20"
                      style={{
                        backgroundColor: `${fig.symbolColor}25`,
                        color: fig.symbolColor,
                      }}
                    >
                      {fig.roleCategory === 'prophet' ? (
                        'ﷺ'
                      ) : fig.roleCategory === 'hadith_master' ? (
                        '📜'
                      ) : fig.roleCategory === 'rashidun_caliph' ? (
                        '👑'
                      ) : fig.roleCategory === 'mubashar' ? (
                        '🌟'
                      ) : (
                        '★'
                      )}
                    </div>
                    <div>
                      <h3 className="ar-name text-lg font-bold text-ink group-hover:text-gold transition-colors flex items-center gap-1.5">
                        <span>{pick(fig.name)}</span>
                        {fig.honorific && (
                          <span className="text-[0.68rem] font-normal text-emerald-400">
                            {fig.honorific}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-ink-3 font-medium line-clamp-1">
                        {pick(fig.title)}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-ink-3 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1 rtl:rotate-180" />
                </div>

                {/* Dates & Narrations Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-3 text-[0.7rem] font-mono text-ink-3">
                  {fig.reignDates && (
                    <span dir="ltr" className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-emerald-300 flex items-center gap-1">
                      <Crown className="size-3 text-amber-400" />
                      <span>{formatReignDate(fig.reignDates, lang)}</span>
                    </span>
                  )}
                  {fig.hadithsNarrated && (
                    <span className="rounded-full bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 text-cyan-300 font-bold">
                      {fig.hadithsNarrated.toLocaleString()} {lang === 'ar' ? 'حديث' : 'Hadiths'}
                    </span>
                  )}
                  <span dir="ltr" className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-ink-3">
                    {formatDeathDate(fig.lifeDates.death, lang)}
                  </span>
                </div>

                <p className="text-xs text-ink-2 leading-relaxed line-clamp-3 mb-4">
                  {pick(fig.biography)}
                </p>
              </div>

              {/* Bottom Burial Site & Action */}
              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[0.7rem] text-ink-3">
                <span className="flex items-center gap-1 truncate max-w-[65%]">
                  <MapPin className="size-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{pick(fig.burialPlace)}</span>
                </span>
                <span className="text-emerald-400 font-semibold group-hover:underline">
                  {lang === 'ar' ? 'الملف والسيرة الكاملة ←' : 'Full Dossier →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EXPANSIVE PROPHET-LIKE FULL DOSSIER DRAWER / MODAL */}
      {activeFigure && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveFigure(null)}
        >
          <div
            className="relative flex flex-col w-full max-w-3xl max-h-[92vh] rounded-3xl border border-emerald-500/30 bg-night-1 shadow-2xl text-ink overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Sticky Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 sm:px-9 py-5 shrink-0 bg-night-surface/95 backdrop-blur-xl z-10">
              <div className="flex items-center gap-4">
                <div
                  className="size-14 sm:size-16 rounded-2xl flex items-center justify-center text-2xl font-bold border-2 border-white/20 shadow-xl shrink-0"
                  style={{
                    backgroundColor: `${activeFigure.symbolColor}25`,
                    color: activeFigure.symbolColor,
                  }}
                >
                  {activeFigure.roleCategory === 'prophet' ? (
                    'ﷺ'
                  ) : activeFigure.roleCategory === 'hadith_master' ? (
                    '📜'
                  ) : activeFigure.roleCategory === 'rashidun_caliph' ? (
                    '👑'
                  ) : activeFigure.roleCategory === 'mubashar' ? (
                    '🌟'
                  ) : (
                    '★'
                  )}
                </div>
                <div>
                  <h2 className="ar-name text-2xl sm:text-3xl font-bold text-ink gold-text flex items-center gap-2">
                    <span>{pick(activeFigure.name)}</span>
                    {activeFigure.honorific && (
                      <span className="text-sm font-normal text-emerald-400">
                        {activeFigure.honorific}
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-ink-2 font-medium">
                    {pick(activeFigure.title)}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-ink-3 font-mono">
                    {activeFigure.reignDates && (
                      <span className="text-amber-400 font-semibold inline-flex items-center gap-1">
                        <span>{pick(UI.reign)}</span>
                        <span dir="ltr">{formatReignDate(activeFigure.reignDates, lang)}</span>
                      </span>
                    )}
                    {activeFigure.reignDates && <span>·</span>}
                    <span className="inline-flex items-center gap-1">
                      <span>{pick(UI.passed)}</span>
                      <span dir="ltr">{formatDeathDate(activeFigure.lifeDates.death, lang)}</span>
                    </span>
                    {activeFigure.hadithsNarrated && (
                      <>
                        <span>·</span>
                        <span className="text-cyan-300 font-bold font-mono">
                          {activeFigure.hadithsNarrated.toLocaleString()} {pick(UI.hadiths)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveFigure(null)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-ink-3 hover:text-ink hover:border-white/30 transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable Body with Custom Gold Scrollbar */}
            <div className="overflow-y-auto px-6 sm:px-9 py-6 space-y-6 flex-1">

            {SAHABA_STORIES[activeFigure.id] && (
              <button
                type="button"
                onClick={() => document.getElementById('sahabi-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
              >
                <BookOpen className="size-4" /> {pick(UI.readStory)}
              </button>
            )}

            {/* Noble Lineage Block */}
            <div className="mb-6 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1.5 uppercase tracking-wider">
                <GitCommit className="size-3.5" />
                <span>{pick(UI.lineage)}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-1 leading-relaxed font-serif">
                {pick(activeFigure.lineage)}
              </p>
              {activeFigure.mother && (
                <p className="text-xs text-ink-3 mt-2 border-t border-emerald-500/10 pt-2">
                  <strong className="text-ink-2">{pick(UI.mother)}</strong>
                  {pick(activeFigure.mother)}
                </p>
              )}
            </div>

            {/* Relations: every line of the tree that touches this figure, with its full name */}
            {(() => {
              const rels = TREE_LINKS.filter((l) => l.from === activeFigure.id || l.to === activeFigure.id)
              if (rels.length === 0) return null
              return (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Users className="size-3.5" /> {pick(UI.relations)}
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {rels.map((l) => {
                      const otherId = l.from === activeFigure.id ? l.to : l.from
                      const other = SAHABA_FIGURES.find((f) => f.id === otherId)
                      if (!other) return null
                      const outgoing = l.from === activeFigure.id
                      return (
                        <li key={`${l.from}-${l.to}`}>
                          <button
                            type="button"
                            onClick={() => setActiveFigure(other)}
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-start transition-colors hover:border-gold/40 hover:bg-gold/5 cursor-pointer"
                          >
                            <span className="block text-sm font-semibold text-ink">{pick(other.name)}</span>
                            <span className="block text-xs text-ink-3">
                              {outgoing ? `${pick(activeFigure.name)} → ${pick(other.name)}` : `${pick(other.name)} → ${pick(activeFigure.name)}`}
                              {' · '}
                              <span className="text-gold-2">{pick(l.note ?? l.label)}</span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })()}

            {/* Biography */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2">
                {pick(UI.biography)}
              </h4>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                {pick(activeFigure.biography)}
              </p>
            </div>

            {/* Story: the narrative, the trials and the sacrifices, each point with its source */}
            {SAHABA_STORIES[activeFigure.id] && (() => {
              const st = SAHABA_STORIES[activeFigure.id]!
              const her = activeFigure.id === 'fatimah_az_zahra'
              const list = (items: StoryPoint[], title: L4, tone: string) => (
                <div className="mt-4">
                  <h5 className={`text-xs font-bold uppercase tracking-wider ${tone}`}>{pick(title)}</h5>
                  <ul className="mt-2 space-y-3">
                    {items.map((p, i) => (
                      <li key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                        <p className="text-xs sm:text-sm leading-relaxed text-ink-2">{pick(p.text)}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <LevelChip level={p.l} />
                          {p.r.map((ref) => <RefChip key={ref} r={ref} />)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
              return (
                <section id="sahabi-story" className="mb-6 rounded-2xl border border-gold/25 bg-gold/[0.04] p-4 sm:p-5">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-gold">
                    <BookOpen className="size-4" /> {pick(her ? UI.storyHer : UI.story)}
                  </h4>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink">{pick(st.story)}</p>
                  {list(st.challenges, her ? UI.challengesHer : UI.challenges, 'text-lvl-disputed')}
                  {list(st.sacrifices, her ? UI.sacrificesHer : UI.sacrifices, 'text-lvl-hadith')}
                </section>
              )
            })()}

            {/* Authentic Hadith Praise / Scholarly Testimony */}
            {activeFigure.propheticPraise && (
              <div className="mb-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 p-4.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
                  <Sparkles className="size-3.5 text-amber-400" />
                  <span>
                    {lang === 'ar'
                      ? 'الثناء النبوي الشريف وشهادة أئمة الإسلام'
                      : 'Prophetic Praise & Scholarly Testimony'}
                  </span>
                </div>
                <p lang="ar" dir="rtl" className="font-hadith text-base sm:text-lg text-amber-100 leading-loose mb-2 text-center sm:text-start">
                  {activeFigure.propheticPraise.ar}
                </p>
                {lang !== 'ar' && (
                  <p className="text-xs text-ink-2 italic mb-2">
                    "{lang === 'fr' ? activeFigure.propheticPraise.fr : activeFigure.propheticPraise.en}"
                  </p>
                )}
                <div className="text-[0.7rem] text-amber-400/80 font-mono text-end">
                  {activeFigure.propheticPraise.hadithSource}
                </div>
              </div>
            )}

            {/* Authored Works / Masterpieces (For Bukhari, Muslim, etc.) */}
            {activeFigure.works && activeFigure.works.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="size-3.5 text-cyan-400" />
                  <span>{pick(UI.works)}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeFigure.works.map((w, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs text-cyan-200 font-medium flex items-center gap-2"
                    >
                      <span className="size-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{pick(w)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teachers & Students Grid (For Hadith Masters) */}
            {(activeFigure.teachers || activeFigure.students) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {activeFigure.teachers && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-ink-3 uppercase tracking-wider mb-2">
                      <Users className="size-3.5 text-amber-400" />
                      <span>{pick(UI.teachers)}</span>
                    </span>
                    <ul className="space-y-1.5 text-ink-2">
                      {activeFigure.teachers.map((t, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-amber-400 shrink-0" />
                          <span>{pick(t)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeFigure.students && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-ink-3 uppercase tracking-wider mb-2">
                      <Users className="size-3.5 text-cyan-400" />
                      <span>{pick(UI.students)}</span>
                    </span>
                    <ul className="space-y-1.5 text-ink-2">
                      {activeFigure.students.map((s, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-cyan-400 shrink-0" />
                          <span>{pick(s)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Golden Quotes / Maxims */}
            {activeFigure.famousQuotes && activeFigure.famousQuotes.length > 0 && (
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-gold mb-2">
                  <Quote className="size-3.5" />
                  <span>{pick(UI.quotes)}</span>
                </div>
                {activeFigure.famousQuotes.map((q, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <p className="ar-name text-sm text-ink-1 font-serif leading-relaxed">
                      "{q.ar}"
                    </p>
                    {lang !== 'ar' && (
                      <p className="text-xs text-ink-3 italic">
                        "{lang === 'fr' ? q.fr : q.en}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Milestones Timeline */}
            {activeFigure.milestones && activeFigure.milestones.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Milestone className="size-3.5 text-emerald-400" />
                  <span>{pick(UI.milestones)}</span>
                </h4>
                <div className="space-y-2">
                  {activeFigure.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-ink-2 flex items-start gap-3"
                    >
                      <span className="font-mono text-emerald-400 font-bold shrink-0 mt-0.5">
                        {m.yearAH}
                      </span>
                      <div>
                        <div className="font-semibold text-ink-1">{pick(m.title)}</div>
                        <p className="text-ink-3 text-[0.72rem] mt-0.5">{pick(m.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Major Achievements */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="size-3.5 text-emerald-400" />
                <span>{pick(UI.achievements)}</span>
              </h4>
              <ul className="space-y-2">
                {activeFigure.achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-ink-2 leading-relaxed"
                  >
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pick(ach)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Burial Place Footer with Map navigation */}
            <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-3">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-emerald-400 shrink-0" />
                <span>{pick(UI.burial)}</span>
                <strong className="text-ink-2 font-medium">{pick(activeFigure.burialPlace)}</strong>
              </span>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href="#/map"
                  className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
                >
                  <MapPin className="size-3" />
                  <span>{pick(UI.viewMap)}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveFigure(null)}
                  className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-night hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  {pick(UI.close)}
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
