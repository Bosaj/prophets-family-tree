// Authentic Genealogical and Succession Dataset of Sahaba, Khulafa', Caliphates, and Continuous Prophetic Lineages
// Covering from the Messenger of Allah ﷺ and Ahl al-Bayt through Khulafa' ar-Rashidun, the 10 Promised Paradise,
// Umayyads, Abbasids, Ottomans, down to modern unbroken Sharifi lineages (Moroccan Alaouites & Jordanian Hashemites).

import type { L3 } from './types'

export type SahabaEra =
  | 'prophetic_ahlulbayt'
  | 'rashidun'
  | 'mubasharun'
  | 'sahaba_luminaries'
  | 'hadith_scholars'
  | 'umayyad'
  | 'cordoba'
  | 'abbasid'
  | 'ottoman'
  | 'idrisid'
  | 'alaouite_morocco'
  | 'hashemite_jordan'

export interface SahabaFigure {
  id: string
  name: L3
  title: L3
  honorific?: string
  era: SahabaEra
  roleCategory:
    | 'prophet'
    | 'rashidun_caliph'
    | 'mubashar'
    | 'caliph_dynasty'
    | 'ahlulbayt_imam'
    | 'sahabi_leader'
    | 'modern_monarch'
    | 'hadith_master'
  reignDates?: {
    ah: string
    ce: string
  }
  lifeDates: {
    birth?: { ah?: string; ce?: string }
    death: { ah: string; ce: string }
  }
  lineage: L3
  fatherId?: string
  mother?: L3
  mentorId?: string
  burialPlace: L3
  biography: L3
  achievements: L3[]
  propheticPraise?: {
    ar: string
    en: string
    fr: string
    hadithSource: string
  }
  symbolColor: string
  tags: string[]
  hadithsNarrated?: number
  works?: L3[]
  teachers?: L3[]
  students?: L3[]
  famousQuotes?: { ar: string; en: string; fr: string }[]
  milestones?: { yearAH: string; yearCE?: string; title: L3; desc: L3 }[]
}

function t(en: string, fr: string, ar: string): L3 {
  return { en, fr, ar }
}

export const SAHABA_ERAS: {
  id: SahabaEra | 'all'
  label: L3
  description: L3
  badgeColor: string
}[] = [
  {
    id: 'all',
    label: t('All Figures & Dynasties', 'Toutes les figures & dynasties', 'الكل: الصحابة والخلفاء والسلالات'),
    description: t(
      'Complete panoramic view from Prophet Muhammad ﷺ across 14 centuries to the modern era.',
      'Vue panoramique complète depuis le Prophète ﷺ à travers 14 siècles jusqu’à l’époque moderne.',
      'مشهد بانورامي شامل من النبي ﷺ وآل بيته وصحابته وخلفائه عبر 14 قرناً إلى العصر الحديث.'
    ),
    badgeColor: '#eab308',
  },
  {
    id: 'rashidun',
    label: t('Rightly Guided Caliphs', 'Califes Bien Guidés (Rachidoune)', 'الخلفاء الراشدون المهديون'),
    description: t(
      'The 5 Rightly Guided Caliphs who upheld pure Prophetic governance (11–41 AH / 632–661 CE).',
      'Les 5 Califes bien guidés qui ont perpétué la gouvernance prophétique (11–41 H / 632–661).',
      'الخلفاء الخمسة الراشدون الذين ساروا على نهج النبوة الصافي (11–41 هـ / 632–661 م).'
    ),
    badgeColor: '#10b981',
  },
  {
    id: 'mubasharun',
    label: t('Ten Promised Paradise', 'Les Dix Promis au Paradis', 'العشرة المبشرون بالجنة'),
    description: t(
      'The ten illustrious companions explicitly promised Paradise in a single authentic Hadith.',
      'Les dix compagnons éminents promis au Paradis dans un Hadith prophétique authentique.',
      'الصحابة العشرة الكرام الذين بشّرهم رسول الله ﷺ بالجنة في حديث واحد ثابت.'
    ),
    badgeColor: '#38bdf8',
  },
  {
    id: 'prophetic_ahlulbayt',
    label: t('Prophet & Ahl al-Bayt', 'Le Prophète ﷺ & Ahl al-Bayt', 'النبي ﷺ وآل البيت الأطهار'),
    description: t(
      'The Noble Household of the Prophet ﷺ: Sayyidah Fatimah, Sayyiduna Ali, Al-Hasan, and Al-Husayn.',
      'La noble famille du Prophète ﷺ : Sayyida Fatima, Ali, Al-Hassan et Al-Hussein.',
      'النبي الخاتم ﷺ وأهل بيته الأطهار: السيدة فاطمة الزهراء، الإمام علي، والسبطان الحسن والحسين.'
    ),
    badgeColor: '#f59e0b',
  },
  {
    id: 'sahaba_luminaries',
    label: t('Eminent Companions', 'Compagnons Éminents', 'أكابر الصحابة والفرسان'),
    description: t(
      'Great commanders, scholars, and early converts (Hamzah, Bilal, Salman, Khalid, Ibn Abbas).',
      'Grands commandants et savants parmi les premiers musulmans (Hamza, Bilal, Salman, Khalid).',
      'أبطال الإسلام وسادته: حمزة، بلال، سلمان الفارسي، خالد بن الوليد، وابن عباس.'
    ),
    badgeColor: '#a855f7',
  },
  {
    id: 'hadith_scholars',
    label: t('Hadith Masters & Preservers', 'Maîtres du Hadith & Transmetteurs', 'أئمة الحديث وحفظة السنة'),
    description: t(
      'The greatest narrators and Hadith compilers: Abu Hurairah, Imam al-Bukhari, and Imam Muslim.',
      'Les plus illustres rapporteurs et compilateurs : Abou Hourayra, l’Imam al-Bukhari et l’Imam Muslim.',
      'أعظم رواة ومدوني الحديث النبوي الشريف: راوية الإسلام أبو هريرة، وأمير المؤمنين في الحديث الإمام البخاري، والإمام الحجة مسلم بن الحجاج.'
    ),
    badgeColor: '#06b6d4',
  },
  {
    id: 'umayyad',
    label: t('Umayyad Caliphate', 'Califat Omeyyade (Damas)', 'الدولة الأموية (دمشق)'),
    description: t(
      'First hereditary Islamic caliphate in Damascus (41–132 AH / 661–750 CE).',
      'Premier califat héréditaire établi à Damas (41–132 H / 661–750).',
      'الخلافة الأموية بدمشق التي بلغت حدود فرنسا والصين، وبنت قبة الصخرة وجامع دمشق (41–132 هـ).'
    ),
    badgeColor: '#f97316',
  },
  {
    id: 'cordoba',
    label: t('Caliphate of Cordoba', 'Califat de Cordoue (Al-Andalus)', 'خلافة قرطبة (الأندلس)'),
    description: t(
      'The Umayyad golden age of science, philosophy, and arts in Al-Andalus (138–422 AH / 756–1031 CE).',
      'L’âge d’or omeyyade des sciences et des arts en Andalousie (138–422 H / 756–1031).',
      'الصقر القرشي عبد الرحمن الداخل وأحفاده في قرطبة، منارة العلم والحضارة في أوروبا.'
    ),
    badgeColor: '#14b8a6',
  },
  {
    id: 'abbasid',
    label: t('Abbasid Caliphate', 'Califat Abbasside (Bagdad)', 'الدولة العباسية (بغداد)'),
    description: t(
      'Descendants of Al-Abbas; the Islamic Golden Age and House of Wisdom in Baghdad (132–656 AH).',
      'Descendants d’Al-Abbas; âge d’or islamique et Maison de la Sagesse (132–656 H).',
      'بنو العباس في دار السلام بغداد، عصر الترجمة والعلوم والحكمة مع الرشيد والمأمون.'
    ),
    badgeColor: '#6366f1',
  },
  {
    id: 'ottoman',
    label: t('Ottoman Caliphate', 'Califat Ottoman (Istanbul)', 'الخلافة العثمانية (إسطنبول)'),
    description: t(
      'Conquerors of Constantinople and custodians of the Two Holy Mosques (699–1342 AH / 1299–1924 CE).',
      'Conquérants de Constantinople et gardiens des Lieux Saints (699–1342 H / 1299–1924).',
      'سلاطين بني عثمان وخلفاء المسلمين الذين فتحوا القسطنطينية وحفظوا مقدسات الأمة لأكثر من 600 عام.'
    ),
    badgeColor: '#ec4899',
  },
  {
    id: 'alaouite_morocco',
    label: t('Alaouites of Morocco (Today)', 'Dynastie Alaouite (Maroc)', 'الدولة العلوية الشريفة (المغرب)'),
    description: t(
      'Direct Hasanid Sharifi lineage ruling Morocco continuously since 1631 CE to King Mohammed VI.',
      'Lignée chérifienne hassanienne directe régnant sur le Maroc depuis 1631 jusqu’au Roi Mohammed VI.',
      'سلالة الأشراف العلويين الحسنيين المتصلة النسب برسول الله ﷺ، والمستمرة في المغرب إلى الملك محمد السادس.'
    ),
    badgeColor: '#ef4444',
  },
  {
    id: 'hashemite_jordan',
    label: t('Hashemites of Jordan (Today)', 'Hachémites (Jordanie)', 'المملكة الهاشمية (الأردن)'),
    description: t(
      'Direct Hasanid Sharifi dynasty of Hejaz and Jordan to King Abdullah II.',
      'Dynastie chérifienne hassanienne directe du Hedjaz et de Jordanie jusqu’au Roi Abdallah II.',
      'بنو هاشم أحفاد الشريف حسين بن علي المستمرون في المملكة الأردنية الهاشمية حتى الملك عبد الله الثاني.'
    ),
    badgeColor: '#8b5cf6',
  },
]

export const SAHABA_FIGURES: SahabaFigure[] = [
  // ==========================================
  // 1. PROPHET MUHAMMAD ﷺ & AHL AL-BAYT
  // ==========================================
  {
    id: 'prophet_muhammad',
    name: t('Muhammad ﷺ', 'Mouhammad ﷺ', 'محمد رسول الله ﷺ'),
    title: t('The Seal of the Prophets & Mercy to the Worlds', 'Le Sceau des Prophètes et Miséricorde pour l’Univers', 'خاتم الأنبياء والمرسلين ورحمة الله للعالمين'),
    honorific: 'ﷺ',
    era: 'prophetic_ahlulbayt',
    roleCategory: 'prophet',
    reignDates: {
      ah: '1–11 AH',
      ce: '622–632 CE',
    },
    lifeDates: {
      birth: { ah: '53 BH', ce: '571 CE' },
      death: { ah: '11 AH (12 Rabi al-Awwal)', ce: '632 CE (8 June)' },
    },
    lineage: t(
      'Muhammad ibn Abdallah ibn Abd al-Muttalib ibn Hashim ibn Abd Manaf ibn Qusayy ibn Kilab ... reaching Adnan and Prophet Ismail and Ibrahim (peace be upon them).',
      'Mouhammad ibn Abdallah ibn Abd al-Mouttalib ibn Hachim ibn Abd Manaf ... remontant à Adnan et aux prophètes Ismaël et Abraham.',
      'محمد بن عبد الله بن عبد المطلب بن هاشم بن عبد مناف بن قصي بن كلاب بن مرة... ينتهي نسبه الشريف إلى عدنان من ولد إسماعيل بن إبراهيم عليهما السلام.'
    ),
    mother: t('Aminah bint Wahb', 'Amina bint Wahb', 'آمنة بنت وهب الزهرية'),
    burialPlace: t('Al-Hujrah ash-Sharifah, Al-Masjid an-Nabawi, Madinah', 'Al-Houjra ash-Charifa, Médine', 'الحجرة النبوية الشريفة في المسجد النبوي بالمدينة المنورة'),
    biography: t(
      'The final messenger sent by God Almighty to all humanity, who brought the Holy Qur\'an, established the first Islamic state in Madinah, united Arabia upon pure monotheism (Tawhid), and whose pristine Sunnah and ethics transformed world history.',
      'L’ultime messager envoyé à l’humanité entière, ayant révélé le Noble Coran, unifié l’Arabie sous le Tawhid et établi les bases spirituelles et morales de la civilisation islamique.',
      'نبي الرحمة والهدى وخاتم رسل الله، بعثه الله هادياً ومبشراً ونذيراً وداعياً إلى الله بإذنه وسراجاً منيراً، أخرج الناس من الظلمات إلى النور، وأرسى دعائم دولة العدل والرحمة بالمدينة المنورة.'
    ),
    achievements: [
      t('Delivery of the final revelation: The Holy Qur\'an', 'Transmission du Coran sacré', 'تبليغ الرسالة العظمى وإنزال القرآن الكريم المحفوظ بحفظ الله'),
      t('Establishment of the Constitution of Madinah (first pluralistic civil charter)', 'Constitution de Médine (première charte plurielle)', 'إرساء صحيفة المدينة النبوية (أول وثيقة دستورية للحقوق والتعايش)'),
      t('Farewell Pilgrimage and universal declaration of human equality', 'Pèlerinage d’Adieu et sermon universel', 'خطبة حجة الوداع وإعلان المساواة الإنسانية وحرمة الدماء والأموال'),
    ],
    symbolColor: '#eab308',
    tags: ['Rasulullah', 'Khatam an-Nabiyyin', 'Ahl al-Bayt'],
  },
  {
    id: 'fatimah_az_zahra',
    name: t('Fatimah az-Zahra', 'Fatima az-Zahra', 'فاطمة الزهراء'),
    title: t('Mistress of the Women of Paradise & Mother of the Imams', 'Maîtresse des Femmes du Paradis & Mère des Imams', 'سيدة نساء أهل الجنة وبضعة المصطفى ﷺ وأم السبطين'),
    honorific: 'رضي الله عنها',
    era: 'prophetic_ahlulbayt',
    roleCategory: 'ahlulbayt_imam',
    lifeDates: {
      birth: { ah: '18 BH', ce: '605 CE' },
      death: { ah: '11 AH (3 Jumada al-Thani)', ce: '632 CE' },
    },
    lineage: t(
      'Daughter of Prophet Muhammad ﷺ and Sayyidah Khadijah bint Khuwaylid; wife of Ali ibn Abi Talib; mother of Al-Hasan, Al-Husayn, and Zaynab.',
      'Fille du Prophète ﷺ et de Khadija bint Khouwaylid; épouse de Ali ibn Abi Talib; mère d’Al-Hassan et Al-Hussein.',
      'بنت رسول الله ﷺ وأمها خديجة بنت خويلد رضي الله عنها، زوجة أمير المؤمنين علي بن أبي طالب، وأم سيدي شباب أهل الجنة الحسن والحسين والسيدة زينب.'
    ),
    fatherId: 'prophet_muhammad',
    burialPlace: t('Jannat al-Baqi\', Madinah', 'Jannat al-Baqi, Médine', 'جنة البقيع الطاهر بالمدينة المنورة'),
    biography: t(
      'The beloved youngest daughter of the Prophet ﷺ, termed "Umm Abiha" (the mother of her father) for her tender care. The sole child through whom the continuous biological lineage of the Prophet ﷺ survived down through the centuries via Al-Hasan and Al-Husayn.',
      'La fille bien-aimée du Prophète ﷺ, surnommée « Oumm Abiha » (la mère de son père). Seule enfant par laquelle la descendance biologique du Prophète ﷺ a subsisté à travers Al-Hassan et Al-Hussein.',
      'بضعة رسول الله ﷺ وقرة عينه، الملقبة بـ "أم أبيها" لبرّها ورعايتها لرسول الله ﷺ، ومنها وحدها انحدر النسل النبوي الشريف والمبارك إلى يوم القيامة عبر ولديها الحسن والحسين.'
    ),
    achievements: [
      t('Preservation of the direct Prophetic lineage (Ahl al-Bayt)', 'Préservation de la descendance prophétique', 'استمرار النسل النبوي الشريف الطاهر في الأمة إلى قيام الساعة'),
      t('Model of ascetic piety, profound patience, and eloquence', 'Modèle de piété et d’éloquence', 'القدوة العظمى في الزهد والصبر والورع وعفة القول والعمل'),
    ],
    propheticPraise: {
      ar: '«فَاطِمَةُ بَضْعَةٌ مِنِّي، فَمَنْ أَغْضَبَهَا أَغْضَبَنِي، وَهِيَ سَيِّدَةُ نِسَاءِ أَهْلِ الْجَنَّةِ»',
      en: '"Fatimah is a part of me; whoever angers her angers me, and she is the leader of the women of Paradise."',
      fr: '« Fatima est une partie de moi-même; ce qui l’irrite m’irrite, et elle est la maîtresse des femmes du Paradis. »',
      hadithSource: 'Sahih al-Bukhari (3714, 3767), Sahih Muslim (2449)',
    },
    symbolColor: '#f43f5e',
    tags: ['Ahl al-Bayt', 'Sayyidat Nisa al-Alamin'],
  },
  {
    id: 'ali_ibn_abi_talib',
    name: t('Ali ibn Abi Talib', 'Ali ibn Abi Talib', 'علي بن أبي طالب'),
    title: t('Commander of the Faithful & 4th Rightly Guided Caliph', 'Commandeur des Croyants & 4e Calife Bien Guidé', 'أمير المؤمنين ورابع الخلفاء الراشدين وباب مدينة العلم'),
    honorific: 'كرم الله وجهه ورضي عنه',
    era: 'rashidun',
    roleCategory: 'rashidun_caliph',
    reignDates: {
      ah: '35–40 AH',
      ce: '656–661 CE',
    },
    lifeDates: {
      birth: { ah: '23 BH', ce: '600 CE' },
      death: { ah: '40 AH (21 Ramadan)', ce: '661 CE' },
    },
    lineage: t(
      'Ali ibn Abi Talib (Abd Manaf) ibn Abd al-Muttalib ibn Hashim. First cousin and son-in-law of Prophet Muhammad ﷺ.',
      'Ali ibn Abi Talib ibn Abd al-Mouttalib ibn Hachim. Cousin paternel et gendre du Prophète ﷺ.',
      'علي بن أبي طالب (عبد مناف) بن عبد المطلب بن هاشم بن عبد مناف القرشي الهاشمي، ابن عم رسول الله ﷺ وصهره وزوج سيدة نساء العالمين فاطمة.'
    ),
    burialPlace: t('Najaf, Iraq', 'Nadjaf, Irak', 'النجف الأشرف، العراق'),
    biography: t(
      'First male youth to accept Islam, hero of Badr, Uhud, and Khaybar. Renowned for supreme legal jurisprudence, courage, eloquence (Nahj al-Balaghah), and unyielding justice. Fourth Rightly Guided Caliph whose governance was marked by scrupulous equality and profound wisdom.',
      'Premier jeune homme à embrasser l’Islam, héros de Badr et Khaybar. Réputé pour sa science juridique immense, son éloquence et sa justice rigoureuse. Quatrième calife bien guidé.',
      'فارس الإسلام الأول وبطل بدر وأحد وخيبر، وأول من أسلم من الفتيان. قاضي الأمة وحكيمها، ذو البلاغة العالية والشجاعة النادرة والعدل الصارم، ورابع الخلفاء الراشدين المهديين.'
    ),
    achievements: [
      t('Unmatched heroics at Khaybar, carrying the heavy fortress gate', 'Héroïsme légendaire à Khaybar', 'فتح حصن خيبر المنيع وحمل باب الحصن بإذن الله'),
      t('Supreme judicial authority whom Umar consulted: "Without Ali, Umar would have perished"', 'Autorité jurisprudentielle suprême consultée par Umar', 'المرجع الفقهي والقضائي الأعلى (قول عمر: لولا علي لهلك عمر)'),
      t('Codification of Arabic grammar foundation through Abu al-Aswad ad-Du\'ali', 'Fondation des règles de grammaire arabe', 'وضع اللبنة الأولى لعلم النحو لحفظ اللسان العربي والقرآن'),
    ],
    propheticPraise: {
      ar: '«أَنْتَ مِنِّي بِمَنْزِلَةِ هَارُونَ مِنْ مُوسَى إِلَّا أَنَّهُ لَا نَبِيَّ بَعْدِي»، وقال: «أَنَا مَدِينَةُ الْعِلْمِ وَعَلِيٌّ بَابُهَا»',
      en: '"You are to me as Aaron was to Moses, except that there is no prophet after me." And: "I am the city of knowledge and Ali is its gate."',
      fr: '« Tu es pour moi ce que fut Aaron pour Moïse, sauf qu’il n’y a point de prophète après moi. » Et : « Je suis la cité du savoir et Ali en est la porte. »',
      hadithSource: 'Sahih al-Bukhari (3706), Sahih Muslim (2404), Sunan at-Tirmidhi (3723)',
    },
    symbolColor: '#10b981',
    tags: ['Rashidun', 'Mubasharun', 'Ahl al-Bayt', 'Hero of Khaybar'],
  },
  {
    id: 'hasan_ibn_ali',
    name: t('Al-Hasan ibn Ali', 'Al-Hassan ibn Ali', 'الحسن بن علي بن أبي طالب'),
    title: t('5th Rightly Guided Caliph & Peacemaker of the Ummah', '5e Calife Bien Guidé & Pacificateur de la Communauté', 'خامس الخلفاء الراشدين وسيد شباب أهل الجنة ومصلح الأمة'),
    honorific: 'رضي الله عنهما',
    era: 'rashidun',
    roleCategory: 'rashidun_caliph',
    reignDates: {
      ah: '40–41 AH (6 months)',
      ce: '661 CE',
    },
    lifeDates: {
      birth: { ah: '3 AH (Mid-Ramadan)', ce: '625 CE' },
      death: { ah: '50 AH (Rabi al-Awwal)', ce: '670 CE' },
    },
    lineage: t(
      'Al-Hasan ibn Ali ibn Abi Talib and Fatimah az-Zahra bint Muhammad ﷺ. Eldest grandson of the Prophet ﷺ.',
      'Al-Hassan fils de Ali ibn Abi Talib et de Fatima bint Mouhammad ﷺ. Petit-fils aîné du Prophète ﷺ.',
      'الحسن بن علي بن أبي طالب بن عبد المطلب، وأمه سيدة نساء أهل الجنة فاطمة الزهراء، السبط الأكبر لرسول الله ﷺ وشبيهه خلقاً وخُلقاً.'
    ),
    fatherId: 'ali_ibn_abi_talib',
    burialPlace: t('Jannat al-Baqi\', Madinah', 'Jannat al-Baqi, Médine', 'البقيع الغرقد بالمدينة المنورة إلى جوار أمه فاطمة'),
    biography: t(
      'The 5th Rightly Guided Caliph who completed the exact 30-year period of the Prophetic Caliphate. In 41 AH, he voluntarily abdicated political power in the "Year of Unity" (\'Am al-Jama\'ah) to unite the Muslim Ummah and prevent bloodshed, precisely fulfilling the miraculous prophecy of his grandfather ﷺ.',
      '5e Calife Bien Guidé ayant complété exactement les 30 années du califat prophétique. En 41 H, il renonça pacifiquement au pouvoir lors de l’« Année du Rassemblement » pour éviter l’effusion de sang entre musulmans.',
      'خامس الخلفاء الراشدين الذي أكمل مدة ثلاثين سنة من الخلافة النبوية. تنازل طواعية عن الخلافة لمعاوية في عام 41 هـ المسمى "عام الجماعة" حقناً لدماء المسلمين وجمعاً لكلمتهم، مصداقاً لنبوءة جده المصطفى ﷺ.'
    ),
    achievements: [
      t('Voluntary abdication to unify the Ummah in \'Am al-Jama\'ah (41 AH)', 'Pacification de l’Oumma en 41 H', 'إخماد الفتنة الكبرى وتوحيد الأمة في عام الجماعة (41 هـ) حقناً للدماء'),
      t('Completion of the 30-year Rightly Guided Caliphate ordained in Hadith', 'Achèvement des 30 ans de califat prophétique', 'تتميم الثلاثين سنة المنصوص عليها في الحديث النبوي الشريف'),
      t('Progenitor of the Hasanid Sharifi dynasties (Moroccan Alaouites, Jordanian Hashemites, Idrisids)', 'Ancêtre des dynasties chérifiennes', 'الأصل المبارك لجميع السلالات الحسينية والحسنية الشريفة الحاكمة في العالم الإسلامي'),
    ],
    propheticPraise: {
      ar: '«إِنَّ ابْنِي هَذَا سَيِّدٌ، وَلَعَلَّ اللَّهَ أَنْ يُصْلِحَ بِهِ بَيْنَ فِئَتَيْنِ عَظِيمَتَيْنِ مِنَ الْمُسْلِمِينَ»',
      en: '"Indeed, this son of mine is a Sayyid (noble leader), and perhaps Allah will use him to make peace between two great factions of Muslims."',
      fr: '« Certes, mon fils que voici est un chef noble (Sayyid), et il se peut qu’Allah réconcilie par lui deux grands groupes de musulmans. »',
      hadithSource: 'Sahih al-Bukhari (2704, 3746)',
    },
    symbolColor: '#22c55e',
    tags: ['Rashidun', 'Ahl al-Bayt', 'Sayyid Shabab Ahl al-Jannah', 'Peacemaker'],
  },
  {
    id: 'husayn_ibn_ali',
    name: t('Al-Husayn ibn Ali', 'Al-Hussein ibn Ali', 'الحسين بن علي بن أبي طالب'),
    title: t('Master of the Youth of Paradise & Martyr of Karbala', 'Maître de la Jeunesse du Paradis & Martyr de Karbala', 'سيد شباب أهل الجنة وسبط المصطفى وشهيد كربلاء'),
    honorific: 'رضي الله عنهما',
    era: 'prophetic_ahlulbayt',
    roleCategory: 'ahlulbayt_imam',
    lifeDates: {
      birth: { ah: '4 AH (Sha\'ban)', ce: '626 CE' },
      death: { ah: '61 AH (10 Muharram - Ashura)', ce: '680 CE' },
    },
    lineage: t(
      'Al-Husayn ibn Ali ibn Abi Talib and Fatimah az-Zahra bint Muhammad ﷺ. Younger grandson of the Prophet ﷺ.',
      'Al-Hussein fils de Ali ibn Abi Talib et de Fatima bint Mouhammad ﷺ.',
      'الحسين بن علي بن أبي طالب بن عبد المطلب، وأمه فاطمة الزهراء، السبط الأصغر لرسول الله ﷺ وريحانته من الدنيا.'
    ),
    fatherId: 'ali_ibn_abi_talib',
    burialPlace: t('Karbala, Iraq', 'Karbala, Irak', 'كربلاء المقدسة، العراق'),
    biography: t(
      'The younger grandson of the Prophet ﷺ, called "the sweet basil of this world" alongside his brother. Stood heroically at Karbala on the Day of Ashura (61 AH) upholding the principles of justice, moral legitimacy, and integrity against tyrannical rule.',
      'Second petit-fils du Prophète ﷺ. Tombé en martyr héroïque à Karbala le jour d’Achoura (61 H) pour défendre la justice et la légitimité éthique.',
      'ريحانة رسول الله ﷺ وسبطه الأكرم، وقف الموقف التاريخي الخالد في كربلاء يوم عاشوراء دفاعاً عن مبادئ الشورى والعدالة ورفضاً للحكم الجبري، فنال الشهادة العظمى.'
    ),
    achievements: [
      t('Eternal symbol of principled sacrifice and resistance against tyranny', 'Symbole éternel du refus de la tyrannie', 'الرمز الخالد للتضحية المبدئية والثبات على الحق ونصرة المظلومين'),
      t('Progenitor of the Husaynid Sayyid lineages and scholars across the Muslim world', 'Ancêtre des lignées sayyides husseinites', 'أصل السادة الأشراف الحسينيين وعلماء الأمة في الحجاز والشام ومصر واليمن والعراق'),
    ],
    propheticPraise: {
      ar: '«حُسَيْنٌ مِنِّي وَأَنَا مِنْ حُسَيْنٍ، أَحَبَّ اللَّهُ مَنْ أَحَبَّ حُسَيْنًا، حُسَيْنٌ سِبْطٌ مِنَ الْأَسْبَاطِ»',
      en: '"Husayn is from me and I am from Husayn; may Allah love whoever loves Husayn. Husayn is a nation among nations."',
      fr: '« Hussein est de moi et je suis de Hussein; qu’Allah aime celui qui aime Hussein. »',
      hadithSource: 'Sunan at-Tirmidhi (3775), Sunan Ibn Majah (144), Musnad Ahmad (17564)',
    },
    symbolColor: '#ef4444',
    tags: ['Ahl al-Bayt', 'Sayyid Shabab Ahl al-Jannah', 'Shahid Karbala'],
  },

  // ==========================================
  // 2. KHULAFA' AR-RASHIDUN & 10 PROMISED PARADISE
  // ==========================================
  {
    id: 'abu_bakr',
    name: t('Abu Bakr as-Siddiq', 'Abou Bakr as-Siddiq', 'أبو بكر الصديق'),
    title: t('The Truthful & 1st Rightly Guided Caliph', 'Le Véridique & 1er Calife Bien Guidé', 'الصديق الأكبر وأول الخلفاء الراشدين وصاحب الغار'),
    honorific: 'رضي الله عنه',
    era: 'rashidun',
    roleCategory: 'rashidun_caliph',
    reignDates: {
      ah: '11–13 AH',
      ce: '632–634 CE',
    },
    lifeDates: {
      birth: { ah: '51 BH', ce: '573 CE' },
      death: { ah: '13 AH (22 Jumada al-Akhirah)', ce: '634 CE (23 August)' },
    },
    lineage: t(
      'Abdallah ibn Uthman (Abu Quhafah) ibn Amir ibn Amr ibn Ka\'b ibn Sa\'d ibn Taym ibn Murrah al-Qurashi. Meets the Prophet\'s lineage at Murrah.',
      'Abdallah ibn Othman (Abou Qouhafa) ibn Amir ... at-Taymi al-Qourachi. Rejoint la lignée du Prophète à Mourrah.',
      'عبد الله بن عثمان (أبي قحافة) بن عامر بن عمرو بن كعب بن سعد بن تيم بن مرة القرشي التيمي، يلتقي مع النبي ﷺ في جده مرة بن كعب.'
    ),
    burialPlace: t('Next to Prophet Muhammad ﷺ, Al-Masjid an-Nabawi, Madinah', 'Aux côtés du Prophète ﷺ, Médine', 'الحجرة النبوية الشريفة ملاصقاً لكتف رسول الله ﷺ بالمدينة'),
    biography: t(
      'The foremost companion, first adult freeman to embrace Islam, companion of the Prophet ﷺ in the Cave of Thawr during the Hijrah. As the 1st Caliph, he saved the Islamic community during the Apostasy Wars (Hurub ar-Riddah) and ordered the first official compilation of the Qur\'an.',
      'Premier homme libre à embrasser l’Islam, compagnon intime de l’Hégire dans la grotte de Thawr. Premier calife qui préserva l’unité de l’État islamique et ordonna la première compilation du Coran.',
      'أفضل الأمة بعد نبيها وخليفته الأول، صدّق النبي يوم الإسراء والمعراج، وصاحبه في الغار وهجرته إلى المدينة. قاد الأمة بحزم رباني عقب وفاة النبي ﷺ، وأخمد حروب الردة وجمع القرآن الكريم.'
    ),
    achievements: [
      t('Preserved Islamic unity during the Apostasy Wars (Hurub ar-Riddah)', 'Préservation de l’État lors des guerres de Riddah', 'تثبيت أركان الدولة الإسلامية وقمع الردة وتأمين الجزيرة العربية'),
      t('First unified compilation of the Holy Qur\'an overseen by Zayd ibn Thabit', 'Première compilation officielle du Coran', 'الأمر بالجمع الأول للمصحف الشريف في صحف موحدة بإشراف زيد بن ثابت'),
      t('Initiated the opening campaigns toward the Levant and Mesopotamia', 'Lancement des premières expéditions de libération', 'إطلاق جيوش الفتح الإسلامي لتحرير بلاد الشام والعراق من الاستبداد البيزنطي والفارسي'),
    ],
    propheticPraise: {
      ar: '«لَوْ كُنْتُ مُتَّخِذًا خَلِيلًا مِنْ أُمَّتِي لَاتَّخَذْتُ أَبَا بَكْرٍ، وَلَكِنْ أُخُوَّةُ الْإِسْلَامِ وَمَوَدَّتُهُ»',
      en: '"If I were to take an intimate friend (Khalil) from my Ummah, I would have taken Abu Bakr; but there is the brotherhood and affection of Islam."',
      fr: '« Si je devais prendre un ami intime parmi ma communauté, j’aurais choisi Abou Bakr; mais la fraternité de l’Islam demeure. »',
      hadithSource: 'Sahih al-Bukhari (3656), Sahih Muslim (2382)',
    },
    symbolColor: '#10b981',
    tags: ['Rashidun', 'Mubasharun', 'First Caliph', 'Companion of the Cave'],
  },
  {
    id: 'umar_ibn_khattab',
    name: t('Umar ibn al-Khattab', 'Omar ibn al-Khattab', 'عمر بن الخطاب'),
    title: t('Al-Faruq (The Discerner) & 2nd Rightly Guided Caliph', 'Al-Farouq & 2e Calife Bien Guidé', 'الفاروق وأمير المؤمنين وثاني الخلفاء الراشدين ومؤسس الدولة'),
    honorific: 'رضي الله عنه',
    era: 'rashidun',
    roleCategory: 'rashidun_caliph',
    reignDates: {
      ah: '13–23 AH',
      ce: '634–644 CE',
    },
    lifeDates: {
      birth: { ah: '40 BH', ce: '584 CE' },
      death: { ah: '23 AH (26 Dhu al-Hijjah)', ce: '644 CE (3 November)' },
    },
    lineage: t(
      'Umar ibn al-Khattab ibn Nufayl ibn Abd al-Uzza ibn Riyah ibn Abdallah ibn Qurt ibn Razah ibn Adi ibn Ka\'b al-Qurashi al-Adawi.',
      'Omar ibn al-Khattab ibn Noufayl ... al-Qourachi al-Adawi.',
      'عمر بن الخطاب بن نفيل بن عبد العزى بن رياح بن عبد الله بن قرط بن رزاح بن عدي بن كعب القرشي العدوي، يجتمع مع النبي ﷺ في كعب بن لؤي.'
    ),
    burialPlace: t('Next to Abu Bakr, Al-Masjid an-Nabawi, Madinah', 'Aux côtés d’Abou Bakr, Médine', 'الحجرة النبوية الشريفة بجوار أبي بكر ورسول الله ﷺ بالمدينة'),
    biography: t(
      'The architect of the classical Islamic state institutions (Diwan, treasury, postal relays, judicial courts) and the Hijri calendar. Known for legendary justice, humility, and accountability. Personally entered and guaranteed the safety of Jerusalem in the Pact of Umar (637 CE).',
      'Fondateur des institutions administratives de l’État (Diwan, Trésor, justice indépendante) et du calendrier hégirien. Célèbre pour son équité légendaire et le Pacte de Jérusalem (637).',
      'عملاق العدل والتأسيس الإداري، واضع التقويم الهجري ومؤسس الدواوين وبيت المال ونظام العسس والقضاء المستقل. حرر القدس الشريف وكتب لأهلها العهدة العمرية الخالدة.'
    ),
    achievements: [
      t('Establishment of the Hijri Calendar starting from the Prophet\'s migration', 'Création du calendrier hégirien', 'تأسيس التقويم الهجري المعتمد على هجرة المصطفى ﷺ'),
      t('The Pact of Umar (Al-Uhda al-Umariyyah) guaranteeing religious liberty in Jerusalem', 'Pacte d’Omar à Jérusalem garantissant la liberté religieuse', 'تحرير بيت المقدس وكتابة العهدة العمرية الضامنة لحرية الكنائس والعبادة'),
      t('Institutionalization of state administration, public treasury, and social stipends', 'Création des registres publics (Diwan) et des pensions sociales', 'تدوين الدواوين وفرض الأعطيات وتأسيس بيت مال المسلمين والقضاء المالي'),
    ],
    propheticPraise: {
      ar: '«إِنَّ اللَّهَ جَعَلَ الْحَقَّ عَلَى لِسَانِ عُمَرَ وَقَلْبِهِ»، وقال: «لَوْ كَانَ نَبِيٌّ بَعْدِي لَكَانَ عُمَرَ بْنَ الْخَطَّابِ»',
      en: '"Indeed, Allah has placed the truth upon Umar’s tongue and in his heart." And: "If there were to be a prophet after me, it would be Umar ibn al-Khattab."',
      fr: '« Certes, Allah a placé la vérité sur la langue d’Omar et dans son cœur. » Et : « S’il devait y avoir un prophète après moi, ce serait Omar. »',
      hadithSource: 'Sunan at-Tirmidhi (3682, 3686), Sunan Abu Dawud (2961)',
    },
    symbolColor: '#10b981',
    tags: ['Rashidun', 'Mubasharun', 'Second Caliph', 'Al-Faruq'],
  },
  {
    id: 'uthman_ibn_affan',
    name: t('Uthman ibn Affan', 'Othman ibn Affan', 'عثمان بن عفان'),
    title: t('Dhu an-Nurayn (Possessor of Two Lights) & 3rd Caliph', 'Dhou an-Nourayn & 3e Calife Bien Guidé', 'ذو النورين وثالث الخلفاء الراشدين وجامع المصحف الشريف'),
    honorific: 'رضي الله عنه',
    era: 'rashidun',
    roleCategory: 'rashidun_caliph',
    reignDates: {
      ah: '23–35 AH',
      ce: '644–656 CE',
    },
    lifeDates: {
      birth: { ah: '47 BH', ce: '576 CE' },
      death: { ah: '35 AH (18 Dhu al-Hijjah)', ce: '656 CE (17 June)' },
    },
    lineage: t(
      'Uthman ibn Affan ibn Abi al-As ibn Umayyah ibn Abd Shams ibn Abd Manaf al-Qurashi al-Umawi. Meets the Prophet\'s lineage at Abd Manaf.',
      'Othman ibn Affan ibn Abi al-As ibn Oumayya ... al-Qourachi al-Oumawi.',
      'عثمان بن عفان بن أبي العاص بن أمية بن عبد شمس بن عبد مناف القرشي الأموي، يلتقي مع النبي ﷺ في جده عبد مناف.'
    ),
    burialPlace: t('Jannat al-Baqi\', Madinah', 'Jannat al-Baqi, Médine', 'جنة البقيع الطاهر بالمدينة المنورة'),
    biography: t(
      'Called "Dhu an-Nurayn" for marrying two daughters of the Prophet ﷺ (Ruqayyah, then Umm Kulthum). Generous benefactor who bought the Well of Rumah and fully equipped the Army of Usrah. Commissioned the single definitive standardized codex of the Holy Qur\'an (Mushaf Uthmani) sent to major regional capitals.',
      'Surnommé « Dhou an-Nourayn » pour avoir épousé deux filles du Prophète ﷺ. Il équipa l’armée de Tabouk et ordonna la standardisation universelle du Moushaf Othmani pour préserver le texte coranique.',
      'الملقب بذي النورين لزواجه من ابنتي رسول الله ﷺ رقية ثم أم كلثوم. جهّز جيش العسرة في تبوك واشترى بئر رومة وجعلها وقفاً للمسلمين. صاحب المأثرة الكبرى في توحيد رسم المصحف الشريف (المصحف العثماني).'
    ),
    achievements: [
      t('Standardization and universal distribution of the Uthmanic Qur\'an codex', 'Standardisation universelle du Moushaf coranique', 'نسخ المصحف الإمام وتوحيد قراءة الأمة وإرسال النسخ الرسمية للأمصار'),
      t('Construction of the first Islamic naval fleet under Muawiyah and Abdallah ibn Abi Sarh', 'Création de la première flotte navale musulmane', 'بناء أول أسطول بحري إسلامي وخوض معركة ذات الصواري في البحر الأبيض المتوسط'),
      t('Generous endowment: Bought the Well of Rumah and funded the Army of Tabuk', 'Achat du puits de Rouma et équipement de l’armée de Tabouk', 'شراء بئر رومة وتجهيز جيش العسرة كاملاً في غزوة تبوك'),
    ],
    propheticPraise: {
      ar: '«أَلَا أَسْتَحِي مِنْ رَجُلٍ تَسْتَحِي مِنْهُ الْمَلَائِكَةُ؟» وقال: «مَا ضَرَّ عُثْمَانَ مَا عَمِلَ بَعْدَ الْيَوْمِ»',
      en: '"Should I not feel shy before a man whom the angels feel shy before?" And: "Nothing Uthman does after today can harm him."',
      fr: '« Ne devrais-je pas être pudique devant un homme devant qui les anges sont pudiques ? » Et : « Rien de ce que fera Othman après ce jour ne pourra lui nuire. »',
      hadithSource: 'Sahih Muslim (2401), Sunan at-Tirmidhi (3700)',
    },
    symbolColor: '#10b981',
    tags: ['Rashidun', 'Mubasharun', 'Third Caliph', 'Mushaf Uthmani'],
  },
  {
    id: 'talhah_ibn_ubaydillah',
    name: t('Talhah ibn Ubaydillah', 'Talha ibn Oubaydillah', 'طلحة بن عبيد الله'),
    title: t('The Living Martyr & Hero of Uhud', 'Le Martyr Vivant & Héros d’Ouhoud', 'طلحة الخير وشهيد يمشي على وجه الأرض وواقي النبي بأحد'),
    honorific: 'رضي الله عنه',
    era: 'mubasharun',
    roleCategory: 'mubashar',
    lifeDates: {
      birth: { ah: '28 BH', ce: '594 CE' },
      death: { ah: '36 AH (Battle of the Camel)', ce: '656 CE' },
    },
    lineage: t('Talhah ibn Ubaydillah ibn Uthman at-Taymi al-Qurashi. Meets Abu Bakr at Taym and the Prophet at Murrah.', 'Talha at-Taymi al-Qourachi.', 'طلحة بن عبيد الله بن عثمان بن عمرو بن كعب بن سعد بن تيم القرشي التيمي.'),
    burialPlace: t('Basra, Iraq', 'Bassora, Irak', 'البصرة، العراق'),
    biography: t(
      'One of the first eight to embrace Islam and one of the Ten Promised Paradise. At the Battle of Uhud, he shielded the Prophet ﷺ with his own body, receiving over seventy wounds and having his hand permanently paralyzed.',
      'L’un des huit premiers convertis et des Dix Promis au Paradis. À la bataille d’Ouhoud, il protégea le Prophète ﷺ de son propre corps et eut la main paralysée par les flèches.',
      'أحد الثمانية السابقين إلى الإسلام وأحد العشرة المبشرين بالجنة. وقف سداً منيعاً أمام النبال دفاعاً عن رسول الله ﷺ في غزوة أحد حتى شُلّت يده الشريفة، فلقّبه النبي بـ "طلحة الخير" و"طلحة الفياض".'
    ),
    achievements: [
      t('Shielded Prophet Muhammad ﷺ at Uhud, sustaining 70+ wounds', 'Bouclier vivant du Prophète à Ouhoud', 'حماية رسول الله ﷺ ببدنه يوم أحد وتلقي الطعنات والسهام حتى شُلّت يده'),
      t('Famed for extraordinary philanthropy and clearing heavy debts for Muslims', 'Grande philanthropie et générosité légendaire', 'الإنفاق العظيم وقضاء ديون المسلمين وإطعام المعوزين في المدينة'),
    ],
    propheticPraise: {
      ar: '«مَنْ سَرَّهُ أَنْ يَنْظُرَ إِلَى شَهِيدٍ يَمْشِي عَلَى وَجْهِ الْأَرْضِ فَلْيَنْظُرْ إِلَى طَلْحَةَ بْنِ عُبَيْدِ اللَّهِ»',
      en: '"Whoever is pleased to look at a martyr walking on the face of the earth, let him look at Talhah ibn Ubaydillah."',
      fr: '« Quiconque aimerait voir un martyr marchant sur Terre, qu’il regarde Talha ibn Oubaydillah. »',
      hadithSource: 'Sunan at-Tirmidhi (3739), Sunan Ibn Majah (125)',
    },
    symbolColor: '#38bdf8',
    tags: ['Mubasharun', 'Uhud Hero'],
  },
  {
    id: 'zubayr_ibn_awwam',
    name: t('Az-Zubayr ibn al-Awwam', 'Az-Zoubayr ibn al-Awwam', 'الزبير بن العوام'),
    title: t('The Disciple (Hawari) of the Messenger of Allah ﷺ', 'Le Disciple du Messager d’Allah ﷺ', 'حواري رسول الله ﷺ وابن عمته صفية وأول من سل سيفاً في الإسلام'),
    honorific: 'رضي الله عنه',
    era: 'mubasharun',
    roleCategory: 'mubashar',
    lifeDates: {
      birth: { ah: '28 BH', ce: '594 CE' },
      death: { ah: '36 AH', ce: '656 CE' },
    },
    lineage: t('Az-Zubayr ibn al-Awwam ibn Khuwaylid al-Asadi al-Qurashi. Nephew of Sayyidah Khadijah and son of the Prophet\'s aunt Safiyyah.', 'Az-Zoubayr al-Asadi al-Qourachi.', 'الزبير بن العوام بن خويلد القرشي الأسدي، ابن عمة رسول الله ﷺ صفية بنت عبد المطلب وابن أخي أم المؤمنين خديجة.'),
    burialPlace: t('Basra, Iraq', 'Bassora, Irak', 'البصرة، العراق'),
    biography: t(
      'First to unsheathe a sword in defense of Islam. Renowned equestrian and courageous warrior present at Badr, Yarmouk, and the conquest of Egypt, where he scaled the fortress of Babylon to secure victory.',
      'Premier homme à avoir dégainé son épée pour l’Islam. Valeureux cavalier à Badr, Yarmouk et lors de la conquête de la forteresse de Babylone en Égypte.',
      'حواري رسول الله ﷺ وأول من جرّد سيفاً في سبيل الله في مكة، وفارس المسلمين في اليرموك وبدر، وصاحب المأثرة الكبرى في تسلق حصن بابليون لفتح مصر مع عمرو بن العاص.'
    ),
    achievements: [
      t('First Muslim to draw a sword for the defense of the faith in Makkah', 'Premier sabre tiré pour l’Islam', 'أول من سلّ سيفاً لحماية النبي ﷺ في بطحاء مكة'),
      t('Decisive breach of Babylon fortress walls in the conquest of Egypt', 'Escalade décisive de la forteresse de Babylone en Égypte', 'تسلق حصن بابليون المنيع والتكبير على أبراجه مما أدى لفتح مصر'),
    ],
    propheticPraise: {
      ar: '«إِنَّ لِكُلِّ نَبِيٍّ حَوَارِيًّا، وَإِنَّ حَوَارِيَّ الزُّبَيْرُ»',
      en: '"Every prophet has a disciple (Hawari), and my disciple is Az-Zubayr."',
      fr: '« Chaque prophète a un disciple intime (hawari), et mon disciple est Az-Zoubayr. »',
      hadithSource: 'Sahih al-Bukhari (2846, 3719), Sahih Muslim (2415)',
    },
    symbolColor: '#38bdf8',
    tags: ['Mubasharun', 'Hawari', 'Babylon Conqueror'],
  },
  {
    id: 'abdurrahman_ibn_awf',
    name: t('Abd al-Rahman ibn Awf', 'Abd ar-Rahman ibn Awf', 'عبد الرحمن بن عوف'),
    title: t('The Generous Trustee of Trade & Philanthropy', 'Le Généreux Négociant et Mécène', 'أحد الثمانية السابقين وتاجر الإسلام المعطاء وصاحب الشورى'),
    honorific: 'رضي الله عنه',
    era: 'mubasharun',
    roleCategory: 'mubashar',
    lifeDates: {
      birth: { ah: '43 BH', ce: '580 CE' },
      death: { ah: '32 AH', ce: '652 CE' },
    },
    lineage: t('Abd al-Rahman ibn Awf ibn Abd Awf az-Zuhri al-Qurashi. Meets the Prophet\'s maternal clan Banu Zuhrah.', 'Abd ar-Rahman az-Zouhri al-Qourachi.', 'عبد الرحمن بن عوف بن عبد عوف بن عبد بن الحارث بن زهرة القرشي الزهري، يلتقي مع النبي ﷺ في جده كلاب بن مرة ومع بني زهرة أخوال المصطفى ﷺ.'),
    burialPlace: t('Jannat al-Baqi\', Madinah', 'Jannat al-Baqi, Médine', 'البقيع الطاهر بالمدينة المنورة'),
    biography: t(
      'Renowned for arriving in Madinah penniless after migration, asking only "Show me the marketplace!", and building an enormous trading enterprise characterized by absolute honesty and monumental charity, regularly donating entire 700-camel caravans to the poor.',
      'Célèbre pour avoir débuté à Médine sans un sou en demandant « Montrez-moi le marché ! ». Il bâtit une fortune commerciale colossale vouée aux dons caritatifs et aux veuves des compagnons.',
      'أحد الستة أصحاب الشورى، هاجر للمدينة فقيراً وقال: "دلوني على السوق"، فبارك الله في تجارته حتى تصدق بقوافل كاملة بلغت سبعمائة راحلة محملة بالبر والطعام لفقراء المدينة.'
    ),
    achievements: [
      t('Led the voluntary consultative council (Shura) in selecting the 3rd Caliph', 'Médiation magistrale du Conseil de Choura en 23 H', 'إدارة مجلس الشورى الستة بحيادية وحكمة تامة لاختيار الخليفة عثمان بن عفان'),
      t('Massive philanthropic endowments supporting Badr veterans and Prophet\'s widows', 'Grandes donations pour les veuves et vétérans de Badr', 'وقف أربعمائة دينار لكل من بقي من أهل بدر وتكفل بنفقات أمهات المؤمنين'),
    ],
    propheticPraise: {
      ar: 'صلى رسول الله ﷺ خلفه ركعة في غزوة تبوك، وقال: «مَا قُبِضَ نَبِيٌّ قَطُّ حَتَّى يُصَلِّيَ خَلْفَ رَجُلٍ صَالِحٍ مِنْ أُمَّتِهِ»',
      en: 'Prophet Muhammad ﷺ prayed one Rak\'ah behind him during Tabuk expedition and said: "No prophet is taken until he has prayed behind a righteous man from his nation."',
      fr: 'Le Prophète ﷺ pria derrière lui lors de l’expédition de Tabouk.',
      hadithSource: 'Sahih Muslim (274), Musnad Ahmad (18151)',
    },
    symbolColor: '#38bdf8',
    tags: ['Mubasharun', 'Shura Council Leader'],
  },
  {
    id: 'sad_ibn_abi_waqqas',
    name: t('Sa\'d ibn Abi Waqqas', 'Saad ibn Abi Waqqas', 'سعد بن أبي وقاص'),
    title: t('The Conqueror of Qadisiyyah & First Archer of Islam', 'Le Conquérant d’Al-Qadisiyya & Premier Archer de l’Islam', 'فارس القادسية وأول من رمى بسهم في الإسلام ومجاب الدعوة'),
    honorific: 'رضي الله عنه',
    era: 'mubasharun',
    roleCategory: 'mubashar',
    lifeDates: {
      birth: { ah: '23 BH', ce: '600 CE' },
      death: { ah: '55 AH', ce: '674 CE' },
    },
    lineage: t('Sa\'d ibn Abi Waqqas (Malik) az-Zuhri al-Qurashi. Maternal uncle (by clan) of the Prophet ﷺ.', 'Saad az-Zouhri al-Qourachi.', 'سعد بن أبي وقاص (مالك) بن أهيب بن عبد مناف بن زهرة القرشي الزهري، خال النبي ﷺ من بني زهرة.'),
    burialPlace: t('Jannat al-Baqi\', Madinah', 'Jannat al-Baqi, Médine', 'البقيع الطاهر بالمدينة المنورة'),
    biography: t(
      'First to shoot an arrow in the defense of Islam. Supreme commander at the historic Battle of Al-Qadisiyyah (15 AH) which crushed the Sasanian Persian Empire and liberated Iraq. Founder and first governor of Kufa.',
      'Premier à avoir tiré une flèche pour l’Islam. Commandant en chef lors de la bataille décisive d’Al-Qadisiyya (15 H) contre l’empire perse sassanide. Fondateur de la ville de Koufa.',
      'أول من رمى بسهم في سبيل الله ومجاب الدعوة بدعوة النبي له، قائد معركة القادسية التاريخية الفاصلة التي أنهت الإمبراطورية الفارسية الساسانية، وباني مدينة الكوفة بالعراق.'
    ),
    achievements: [
      t('Supreme commander at the Battle of Al-Qadisiyyah (15 AH / 636 CE)', 'Commandement de la bataille d’Al-Qadisiyya', 'قيادة معركة القادسية وفتح المدائن عاصمة الإمبراطورية الساسانية'),
      t('Founded the garrison city of Kufa in Iraq by order of Caliph Umar', 'Fondation de la ville de Koufa', 'تخطيط وبناء مدينة الكوفة لتكون معسكراً ومركزاً حضارياً جديداً'),
    ],
    propheticPraise: {
      ar: '«ارْمِ فِدَاكَ أَبِي وَأُمِّي»، وقال: «اللَّهُمَّ سَدِّدْ رَمْيَتَهُ، وَأَجِبْ دَعْوَتَهُ»',
      en: '"Shoot, Sa\'d, may my father and mother be sacrificed for you!" And: "O Allah, direct his aim and answer his supplication."',
      fr: '« Tire, Sa’d, que mon père et ma mère te soient donnés en rançon ! » Et : « Ô Allah, assure son tir et exauce ses invocations. »',
      hadithSource: 'Sahih al-Bukhari (2905, 4055), Sunan at-Tirmidhi (3751)',
    },
    symbolColor: '#38bdf8',
    tags: ['Mubasharun', 'Qadisiyyah', 'Founder of Kufa'],
  },
  {
    id: 'said_ibn_zayd',
    name: t('Sa\'id ibn Zayd', 'Saïd ibn Zayd', 'سعيد بن زيد'),
    title: t('The Unflinching Believer & Hero of Yarmouk', 'Le Croyant Inébranlable & Héros du Yarmouk', 'أحد العشرة المبشرين بالجنة وبطل معركة اليرموك'),
    honorific: 'رضي الله عنه',
    era: 'mubasharun',
    roleCategory: 'mubashar',
    lifeDates: {
      birth: { ah: '22 BH', ce: '593 CE' },
      death: { ah: '51 AH', ce: '671 CE' },
    },
    lineage: t('Sa\'id ibn Zayd ibn Amr ibn Nufayl al-Adawi al-Qurashi. Cousin and brother-in-law of Umar ibn al-Khattab.', 'Saïd al-Adawi al-Qourachi.', 'سعيد بن زيد بن عمرو بن نفيل العدوي القرشي، ابن عم عمر بن الخطاب وزوج أخته فاطمة بنت الخطاب.'),
    burialPlace: t('Jannat al-Baqi\', Madinah', 'Jannat al-Baqi, Médine', 'البقيع الطاهر بالمدينة المنورة'),
    biography: t(
      'Son of Zayd ibn Amr who rejected idol worship before Islam. Sa\'id embraced Islam very early with his wife Fatimah bint al-Khattab (in whose house Umar accepted Islam). Hero of the Battle of Yarmouk and the siege of Damascus.',
      'Fils de Zayd ibn Amr, hanif monothéiste pré-islamique. L’un des premiers croyants chez qui Omar découvrit le Coran. Combattant émérite à Yarmouk et gouverneur de Damas.',
      'ابن زيد بن عمرو الذي كان حنيفاً على ملة إبراهيم قبل البعثة، وأحد أوائل السابقين للإسلام، كان في بيته سبب إسلام صهره الفاروق عمر. قاد سلاح الفرسان في اليرموك وشارك في فتح دمشق.'
    ),
    achievements: [
      t('Cavalry command at the decisive Battle of Yarmouk', 'Commandement de cavalerie à Yarmouk', 'قيادة كتيبة الفرسان الملحمية في معركة اليرموك الحاسمة في بلاد الشام'),
      t('First governor appointed over Damascus following its liberation', 'Premier gouverneur de Damas libérée', 'تولي أول ولاية إسلامية على مدينة دمشق العريقة بعد فتحها'),
    ],
    propheticPraise: {
      ar: 'ذكره رسول الله ﷺ صراحة في حديث العشرة المبشرين بالجنة: «أَبُو بَكْرٍ فِي الْجَنَّةِ، وَعُمَرُ فِي الْجَنَّةِ... وَسَعِيدُ بْنُ زَيْدٍ فِي الْجَنَّةِ»',
      en: 'Prophet Muhammad ﷺ explicitly named him among the Ten in Paradise: "Abu Bakr is in Paradise, Umar is in Paradise... and Sa\'id ibn Zayd is in Paradise."',
      fr: 'Cité explicitement par le Prophète ﷺ parmi les Dix Promis au Paradis.',
      hadithSource: 'Sunan at-Tirmidhi (3747), Sunan Abu Dawud (4649)',
    },
    symbolColor: '#38bdf8',
    tags: ['Mubasharun', 'Yarmouk', 'Early Convert'],
  },
  {
    id: 'abu_ubaydah_jarrah',
    name: t('Abu Ubaydah ibn al-Jarrah', 'Abou Oubaydallah ibn al-Jarrah', 'أبو عبيدة بن الجراح'),
    title: t('Trustee of the Muslim Nation (Amin al-Ummah)', 'Le Digne de Confiance de la Communauté', 'أمين الأمة وقائد الفتوحات الشامية'),
    honorific: 'رضي الله عنه',
    era: 'mubasharun',
    roleCategory: 'mubashar',
    lifeDates: {
      birth: { ah: '40 BH', ce: '583 CE' },
      death: { ah: '18 AH (Plague of Amwas)', ce: '639 CE' },
    },
    lineage: t('Amir ibn Abdallah ibn al-Jarrah al-Fihri al-Qurashi.', 'Amir ibn Abdallah al-Fihri al-Qourachi.', 'عامر بن عبد الله بن الجراح بن هلال بن أهيب بن ضبة بن الحارث بن فهر القرشي الفهري.'),
    burialPlace: t('Ghor al-Urdun (Jordan Valley), Jordan', 'Vallée du Jourdain, Jordanie', 'غور الأردن، المملكة الأردنية الهاشمية'),
    biography: t(
      'Celebrated by the Prophet ﷺ as the "Trustee of this Nation" (Amin al-Ummah). Supreme commander of the Islamic armies during the liberation of Syria, Jordan, and Palestine. Renowned for supreme selflessness, humility, and military coordination alongside Khalid ibn al-Walid.',
      'Qualifié par le Prophète ﷺ d’« Homme de confiance de cette communauté ». Commandant suprême des armées de libération au Levant et modèle absolu d’humilité.',
      'أمين الأمة بشهادة النبي ﷺ، وقائد جيوش الشام المظفرة في اليرموك ودمشق وفحل، جمع بين التواضع الجم والمهابة والشرف، استشهد في طاعون عمواس رافضاً ترك جنده.'
    ),
    achievements: [
      t('Supreme leadership of the Levant campaigns resulting in peaceful surrender of Jerusalem', 'Direction suprême de la campagne du Levant', 'القيادة العامة لجيوش الشام واستلام مفاتيح بيت المقدس سلمياً'),
      t('Hero of Uhud who pulled the helmet rings from the Prophet\'s wounded cheek with his teeth', 'Dévouement suprême à Ouhoud', 'نزع حلقتي المغفر المغلغلتين في وجنة رسول الله ﷺ يوم أحد بأسنانه'),
    ],
    propheticPraise: {
      ar: '«إِنَّ لِكُلِّ أُمَّةٍ أَمِينًا، وَإِنَّ أَمِينَنَا أَيَّتُهَا الْأُمَّةُ أَبُو عُبَيْدَةَ بْنُ الْجَرَّاحِ»',
      en: '"Indeed, every nation has a trustee (Amin), and the trustee of this nation is Abu Ubaydah ibn al-Jarrah."',
      fr: '« Chaque communauté a un homme de confiance; et l’homme de confiance de notre communauté est Abou Oubayda ibn al-Jarrah. »',
      hadithSource: 'Sahih al-Bukhari (3744, 4382), Sahih Muslim (2419)',
    },
    symbolColor: '#38bdf8',
    tags: ['Mubasharun', 'Amin al-Ummah', 'Levant Supreme Commander'],
  },

  // ==========================================
  // 3. EMINENT SAHABA LUMINARIES
  // ==========================================
  {
    id: 'hamzah_ibn_abd_muttalib',
    name: t('Hamzah ibn Abd al-Muttalib', 'Hamza ibn Abd al-Mouttalib', 'حمزة بن عبد المطلب'),
    title: t('Lion of Allah & Master of the Martyrs (Sayyid ash-Shuhada\')', 'Le Lion d’Allah & Maître des Martyrs', 'أسد الله وأسد رسوله وسيد الشهداء وعم النبي ﷺ'),
    honorific: 'رضي الله عنه',
    era: 'sahaba_luminaries',
    roleCategory: 'sahabi_leader',
    lifeDates: {
      birth: { ah: '54 BH', ce: '570 CE' },
      death: { ah: '3 AH (Battle of Uhud)', ce: '625 CE' },
    },
    lineage: t('Hamzah ibn Abd al-Muttalib ibn Hashim. Paternal uncle and foster brother of Prophet Muhammad ﷺ.', 'Hamza ibn Abd al-Mouttalib. Oncle du Prophète ﷺ.', 'حمزة بن عبد المطلب بن هاشم الهاشمي القرشي، عم رسول الله ﷺ وأخوه من الرضاعة.'),
    burialPlace: t('Martyrs of Uhud Cemetery, Madinah', 'Cimetière des Martyrs d’Ouhoud, Médine', 'مقبرة شهداء أحد عند جبل أحد بالمدينة المنورة'),
    biography: t(
      'The heroic paternal uncle of the Prophet ﷺ. His conversion brought tremendous strength and protection to the vulnerable early Muslim community in Makkah. Fought heroically at Badr and achieved glorious martyrdom at Uhud.',
      'Oncle paternel et protecteur héroïque du Prophète ﷺ. Sa conversion donna un élan majeur aux musulmans opprimés à La Mecque. Tombé en martyr au pied du mont Ouhoud.',
      'عم رسول الله ﷺ وأخوه من الرضاعة، أعز الله بإسلامه المسلمين في مكة المستضعفة، كان رامياً صنديداً وفارساً لا يُشق له غبار في بدر، استشهد في غزوة أحد فلقبه النبي بسيد الشهداء.'
    ),
    achievements: [
      t('Historic public declaration of Islam in Makkah defending the Prophet ﷺ against Abu Jahl', 'Protection publique du Prophète à La Mecque', 'إعلان إسلامه الشجاع في دار الندوة ورد إهانة أبي جهل لرسول الله'),
      t('Decisive heroics in duels and melee at the Battle of Badr', 'Héros des duels de la bataille de Badr', 'المبارزة الحاسمة يوم بدر وقتال شيبة بن ربيعة وصناديد قريش'),
    ],
    propheticPraise: {
      ar: '«سَيِّدُ الشُّهَدَاءِ عِنْدَ اللَّهِ تَعَالَى يَوْمَ الْقِيَامَةِ حَمْزَةُ بْنُ عَبْدِ الْمُطَّلِبِ»',
      en: '"The master of the martyrs before Allah on the Day of Resurrection is Hamzah ibn Abd al-Muttalib."',
      fr: '« Le maître des martyrs auprès d’Allah au Jour de la Résurrection est Hamza ibn Abd al-Mouttalib. »',
      hadithSource: 'Al-Mustadrak \'ala as-Sahihayn (4884), Sahih al-Jami\' (3675)',
    },
    symbolColor: '#a855f7',
    tags: ['Sayyid ash-Shuhada', 'Lion of Allah'],
  },
  {
    id: 'khalid_ibn_walid',
    name: t('Khalid ibn al-Walid', 'Khalid ibn al-Walid', 'خالد بن الوليد'),
    title: t('The Drawn Sword of Allah (Sayf Allah al-Maslul)', 'L’Épée Déguainée d’Allah', 'سيف الله المسلول وقائد المعارك المظفرة'),
    honorific: 'رضي الله عنه',
    era: 'sahaba_luminaries',
    roleCategory: 'sahabi_leader',
    lifeDates: {
      birth: { ah: '30 BH', ce: '592 CE' },
      death: { ah: '21 AH', ce: '642 CE' },
    },
    lineage: t('Khalid ibn al-Walid ibn al-Mughirah al-Makhzumi al-Qurashi.', 'Khalid al-Makhzoumi al-Qourachi.', 'خالد بن الوليد بن المغيرة بن عبد الله بن عمر بن مخزوم القرشي المخزومي.'),
    burialPlace: t('Homs, Syria', 'Homs, Syrie', 'جامع خالد بن الوليد، حمص، سوريا'),
    biography: t(
      'One of the greatest undefeated military geniuses in all human history. Fought over 50 pitched battles without suffering a single defeat. Engineered the legendary 6-day desert march from Iraq to Syria and the tactical masterstroke of Yarmouk.',
      'Génie militaire invaincu de l’histoire universelle, vainqueur de plus de cinquante batailles. Auteur de la traversée audacieuse du désert irakien et de la victoire du Yarmouk.',
      'القائد العسكري الفذ الذي لم يُهزم في أكثر من خمسين معركة قادها، خاض معارك اليمامة وحرر العراق والشام، وصاحب التكتيك العبقري في معركة اليرموك وعبور صحراء السماوة.'
    ),
    achievements: [
      t('Mastermind of the historic victory at the Battle of Yarmouk (15 AH)', 'Stratège magistral de la victoire du Yarmouk', 'التخطيط والقيادة الميدانية العبقرية لمعركة اليرموك التي فتحت الشام'),
      t('Undefeated commander who broke nine swords in personal combat at Mu\'tah', 'Neuf sabres brisés à la bataille de Mou’tah', 'تكسرت في يده تسعة أسياف في غزوة مؤتة دفاعاً عن جيش المسلمين'),
    ],
    propheticPraise: {
      ar: '«أَخَذَ الرَّايَةَ سَيْفٌ مِنْ سُيُوفِ اللَّهِ حَتَّى فَتَحَ اللَّهُ عَلَيْهِمْ»',
      en: '"Then the banner was taken by a sword among the swords of Allah, until Allah granted them victory."',
      fr: '« Puis l’étendard fut pris par une épée parmi les épées d’Allah, jusqu’à ce qu’Allah leur accordât la victoire. »',
      hadithSource: 'Sahih al-Bukhari (3757, 4262)',
    },
    symbolColor: '#a855f7',
    tags: ['Sayf Allah', 'Undefeated General', 'Yarmouk'],
  },
  {
    id: 'bilal_ibn_rabah',
    name: t('Bilal ibn Rabah', 'Bilal ibn Rabah', 'بلال بن رباح'),
    title: t('Mu\'adhin of the Messenger of Allah ﷺ & Symbol of Universal Equality', 'Muezzin du Prophète ﷺ & Symbole d’Égalité Universelle', 'مؤذن رسول الله ﷺ وسيد الأحرار ورمز المساواة في الإسلام'),
    honorific: 'رضي الله عنه',
    era: 'sahaba_luminaries',
    roleCategory: 'sahabi_leader',
    lifeDates: {
      birth: { ah: '42 BH', ce: '580 CE' },
      death: { ah: '20 AH', ce: '640 CE' },
    },
    lineage: t('Bilal ibn Rabah al-Habashi (of Abyssinian origin).', 'Bilal al-Habachi.', 'بلال بن رباح الحبشي القرشي مولى أبي بكر الصديق.'),
    burialPlace: t('Bab as-Saghir Cemetery, Damascus, Syria', 'Cimetière Bab as-Saghir, Damas, Syrie', 'مقبرة باب الصغير بدمشق، سوريا'),
    biography: t(
      'Endured brutal torture beneath scorching boulders in Makkah repeating "Ahad, Ahad" (God is One). Purchased and emancipated by Abu Bakr. Appointed by the Prophet ﷺ as the first caller to prayer (Mu\'adhin) in Islam and climbed atop the Ka\'bah to proclaim the Adhan upon the conquest of Makkah.',
      'Esclave affranchi par Abou Bakr ayant enduré les pires tortures en répétant « Ahad, Ahad » (Dieu est Unique). Premier muezzin de l’Islam ayant proclamé l’appel à la prière du haut de la Kaaba.',
      'رمز الصبر والتوحيد الخالص، عُذب تحت صخور مكة الحارقة فكان ينادي "أحدٌ أحد". أعتقه أبو بكر، واختاره رسول الله ﷺ ليكون أول مؤذن للإسلام وصاحب الأذان فوق سطح الكعبة المشرفة يوم الفتح.'
    ),
    achievements: [
      t('Ascended atop the Ka\'bah to proclaim the historic Adhan at the Conquest of Makkah (8 AH)', 'Appel historique à la prière au sommet de la Kaaba', 'رفع الأذان التاريخي الخالد من فوق ظهر الكعبة المشرفة يوم فتح مكة'),
      t('Living testament to the complete eradication of racial supremacy in Islam', 'Symbole vivant de l’abolition du racisme', 'تجسيد مبدأ الأخوة الإسلامية وسقوط الفوارق الطبقية والعرقية في الإسلام'),
    ],
    propheticPraise: {
      ar: '«يَا بِلَالُ، حَدِّثْنِي بِأَرْجَى عَمَلٍ عَمِلْتَهُ فِي الْإِسْلَامِ، فَإِنِّي سَمِعْتُ دَفَّ نَعْلَيْكَ بَيْنَ يَدَيَّ فِي الْجَنَّةِ»',
      en: '"O Bilal, tell me of the most hopeful deed you have done in Islam, for I heard the sound of your footsteps before me in Paradise."',
      fr: '« Ô Bilal, parle-moi de l’acte dont tu espères le plus de récompense, car j’ai entendu le bruit de tes pas devant moi au Paradis. »',
      hadithSource: 'Sahih al-Bukhari (1149), Sahih Muslim (2458)',
    },
    symbolColor: '#a855f7',
    tags: ['First Muadhin', 'Ahad Ahad', 'Hero of Monotheism'],
  },
  {
    id: 'salman_al_farsi',
    name: t('Salman al-Farsi', 'Salman al-Farsi', 'سلمان الفارسي'),
    title: t('The Seeker of Truth & Strategist of the Trench', 'Le Chercheur de Vérité & Stratège de la Tranchée', 'الباحث عن الحقيقة وصاحب مشورة خندق المدينة وأهل البيت'),
    honorific: 'رضي الله عنه',
    era: 'sahaba_luminaries',
    roleCategory: 'sahabi_leader',
    lifeDates: {
      birth: { ah: '55 BH', ce: '568 CE' },
      death: { ah: '35 AH', ce: '656 CE' },
    },
    lineage: t('Salman al-Farsi (born Ruzbeh in Isfahan, Persia). Traveled through Syria and Arabia in search of the prophesied final prophet.', 'Salman le Persan.', 'سلمان الفارسي (روزبَه بن خشنودان) من أصفهان بفارس، الباحث المخلص عن النبوة.'),
    burialPlace: t('Al-Mada\'in (Ctesiphon), Iraq', 'Al-Mada’in, Irak', 'المدائن، العراق'),
    biography: t(
      'Spent decades traveling across the ancient world studying Zoroastrianism, Christianity, and ancient scriptures until finding Prophet Muhammad ﷺ in Madinah. Proposed digging the protective defensive Trench (Khandaq) in 5 AH, saving the city from the coalition army.',
      'Parcourut le monde antique en quête de la vérité avant de trouver le Prophète ﷺ à Médine. Il suggéra le creusement de la tranchée (Khandaq) qui sauva la cité musulmane de la coalition mecquoise.',
      'عاش رحلة ملحمية بحثاً عن الدين الحق من فارس إلى الشام والجزيرة العربية، صاحب الفكرة العسكرية العبقرية بحفر الخندق حول المدينة المنورة في غزوة الأحزاب، مما شتت جيوش المشركين.'
    ),
    achievements: [
      t('Proposed digging the defensive trench (Al-Khandaq) in 5 AH', 'Stratégie du creusement de la tranchée', 'اقتراح حفر الخندق لحماية المدينة المنورة في غزوة الأحزاب (5 هـ)'),
      t('Governor of Al-Mada\'in who wove palm leaves to earn his own bread despite his high office', 'Gouverneur exemplaire vivant du travail de ses mains', 'ولاية المدائن بنزاهة وزهد أسطوري، حيث كان يأكل من كسب يده بحياكة الخوص'),
    ],
    propheticPraise: {
      ar: '«سَلْمَانُ مِنَّا أَهْلَ الْبَيْتِ»',
      en: '"Salman is of us, the Ahl al-Bayt (Noble Household)."',
      fr: '« Salman fait partie de nous, les gens de la Maison (Ahl al-Bayt). »',
      hadithSource: 'Al-Mustadrak \'ala as-Sahihayn (6539), Tabarani (Kabir 6040)',
    },
    symbolColor: '#a855f7',
    tags: ['Ahl al-Bayt Honor', 'Trench Strategist', 'Seeker of Truth'],
  },

  // ==========================================
  // HADITH MASTERS & SUNNAH PRESERVERS
  // ==========================================
  {
    id: 'abu_hurairah',
    name: t('Abu Hurairah ad-Dawsi', 'Abou Hourayra ad-Dawsi', 'أبو هريرة عبد الرحمن بن صخر الدوسي'),
    title: t('The Foremost Preserver of Prophetic Sunnah & Narrator of Islam', 'Le Premier Mémorisateur de la Sunna & Rapporteur de l’Islam', 'راوية الإسلام الأول وحافظ الصحابة المكثر وصاحب رسول الله ﷺ'),
    honorific: 'رضي الله عنه',
    era: 'hadith_scholars',
    roleCategory: 'hadith_master',
    mentorId: 'prophet_muhammad',
    lifeDates: {
      birth: { ah: '21 BH', ce: '603 CE' },
      death: { ah: '59 AH', ce: '679 CE' },
    },
    lineage: t(
      'Abd al-Rahman ibn Sakhr from the Yamani Azd tribe of Daws. In Jahiliyyah his name was Abd ash-Shams; the Prophet ﷺ named him Abd al-Rahman and nicknamed him Abu Hurairah ("Father of the Kitten") for his kindness to animals.',
      'Abd ar-Rahman ibn Sakhr de la tribu yéménite de Daws. Surnommé Abou Hourayra (« Le père du chaton ») par le Prophète ﷺ en raison de sa bienveillance envers un petit chat.',
      'عبد الرحمن بن صخر الدوسي، من قبيلة دَوْس اليمانية الأزدية العريقة. كان اسمه في الجاهلية عبد شمس فسمّاه رسول الله ﷺ عبد الرحمن، وكنّاه بـ "أبي هريرة" لهرّة صغيرة كان يحملها في كُمّه ويرعاها برحمة.'
    ),
    burialPlace: t('Jannat al-Baqi\', Madinah', 'Jannat al-Baqi, Médine', 'البقيع الطاهر بالمدينة المنورة'),
    hadithsNarrated: 5374,
    biography: t(
      'The most prolific narrator and custodian of the Prophetic Sunnah. Embraced Islam at the hands of At-Tufayl ibn Amr ad-Dawsi and arrived in Madinah in 7 AH during the Battle of Khaybar. For four consecutive years, he never separated from Prophet Muhammad ﷺ, living among Ahl as-Suffah in poverty, choosing hunger and devotion over trade and wealth solely to witness, memorize, and transmit the Prophet’s actions, legal verdicts, and spiritual teachings. When he complained of forgetting, the Prophet ﷺ performed the miraculous "Spreading of the Cloak" (Bast ar-Rida\'), after which he never forgot a single word. He divided every single night into three parts with his family to ensure continuous non-stop worship in his home.',
      'Le plus grand transmetteur et mémorisateur de la Sunna prophétique. Venu du Yémen en l’an 7 de l’Hégire (Khaybar), il vécut sur le banc de la mosquée (Ahl as-Souffa) dans un dénuement complet pour ne jamais quitter le Prophète ﷺ. Il reçut la bénédiction prophétique miraculeuse du manteau étendu lui conférant une mémoire infaillible. Il partageait la nuit en trois veilles avec sa maisonnée pour ne jamais interrompre la prière nocturne.',
      'سيد الحُفّاظ وراوية الإسلام الذي حفظ للأمة معالم دينها وسنة نبيها ﷺ. أسلم عام خيبر (7 هـ) ولزم رسول الله ﷺ لزوم الظل، فكان من أهل الصُّفّة الزاهدين يؤثر الجوع والعلم على متاع الدنيا وتجارة الأسواق. خصه النبي ﷺ بكرامة وبركة إبساط الرداء فلم ينسَ حديثاً سمعه قط، وكان يجزئ الليل ثلاثة أجزاء بينه وبين زوجه وخادمه فلا تنقطع الصلاة والذكر من بيته لحظة واحدة، روى عنه أكثر من 800 من الصحابة والتابعين.'
    ),
    achievements: [
      t('Narrated 5,374 authentic Hadiths, constituting the foundational backbone of Islamic jurisprudence and ethical rulings', 'Transmission de 5 374 Hadiths constituant l’épine dorsale de la Sunna', 'رواية 5374 حديثاً شريفاً عن رسول الله ﷺ حفظت تفاصيل الشريعة والعبادات والأخلاق والمعاملات'),
      t('Trained and transmitted Hadith to over 800 Sahaba and senior Tabi\'in scholars', 'Formation de plus de 800 disciples parmi les compagnons et successeurs', 'تتلمذ على يديه أكثر من ثمانمائة من أعلام الصحابة وكبار التابعين (منهم ابن عباس وابن عمر وسعيد بن المسيب)'),
      t('Served as governor of Bahrain under Umar ibn al-Khattab and governor of Madinah under Muawiyah', 'Gouverneur de Bahreïn sous Omar puis de Médine sous Mouawiya', 'تولي ولاية البحرين في عهد الفاروق عمر وولاية المدينة المنورة في عهد معاوية بنزاهة وعدل'),
    ],
    propheticPraise: {
      ar: '«قُلْتُ: يَا رَسُولَ اللَّهِ، إِنِّي أَسْمَعُ مِنْكَ حَدِيثًا كَثِيرًا أَنْسَاهُ؟ قَالَ: "ابْسُطْ رِدَاءَكَ"، فَبَسَطْتُ رِدَائِي، فَغَرَفَ بِيَدَيْهِ فِيهِ ثُمَّ قَالَ: "اضْمُمْهُ"، فَضَمَمْتُهُ فَمَا نَسِيتُ شَيْئًا بَعْدَهُ!» وقال: «لَقَدْ ظَنَنْتُ يَا أَبَا هُرَيْرَةَ أَنْ لَا يَسْأَلَنِي عَنْ هَذَا الْحَدِيثِ أَحَدٌ أَوَّلُ مِنْكَ لِمَا رَأَيْتُ مِنْ حِرْصِكَ عَلَى الْحَدِيثِ»',
      en: '"I said: O Messenger of Allah, I hear many Hadiths from you but I forget them? He said: "Spread out your cloak." I spread it out, and he scooped into it with both hands, then said: "Fold it to your chest." I folded it, and by Allah, I never forgot anything after that!" And the Prophet ﷺ said: "I knew, O Abu Hurairah, that no one would ask me about this Hadith before you, because of the eagerness for knowledge I have observed in you."',
      fr: '« J’ai dit : Ô Messager d’Allah, j’entends de toi de nombreux récits et je les oublie ? Il dit : "Étends ton manteau." Je l’étendis, il y versa de ses mains invisibles puis dit : "Serre-le contre toi." Je le fis, et par Allah, je n’ai plus jamais rien oublié ! »',
      hadithSource: 'Sahih al-Bukhari (119, 99, 2047, 3648), Sahih Muslim (2492)',
    },
    works: [
      t('The Primary Transmission of the Prophetic Hadith Corpus (5,374 Hadiths)', 'Corpus des 5 374 traditions prophétiques', 'المتون النبوية والأحاديث الصحيحة المسندة (5374 حديثاً)'),
    ],
    teachers: [
      t('Prophet Muhammad ﷺ', 'Le Prophète Mouhammad ﷺ', 'رسول الله محمد ﷺ'),
      t('Abu Bakr as-Siddiq', 'Abou Bakr as-Siddiq', 'أبو بكر الصديق رضي الله عنه'),
      t('Umar ibn al-Khattab', 'Omar ibn al-Khattab', 'عمر بن الخطاب رضي الله عنه'),
      t('Ubayy ibn Ka\'b', 'Oubayy ibn Ka’b', 'أبي بن كعب رضي الله عنه'),
    ],
    students: [
      t('Said ibn al-Musayyib (Master of the Tabi\'in)', 'Saïd ibn al-Mousayyib', 'سعيد بن المسيب سيد التابعين وزوج ابنته'),
      t('Urwah ibn az-Zubayr', 'Ourwah ibn az-Zoubayr', 'عروة بن الزبير فقيه المدينة'),
      t('Hammam ibn Munabbih (compiler of the oldest extant Hadith manuscript)', 'Hammam ibn Mounabbih', 'همام بن منبه صاحب الصحيفة الصحيحة الأقدم تاريخياً'),
      t('Abdallah ibn Abbas and Abdallah ibn Umar', 'Ibn Abbas et Ibn Omar', 'عبد الله بن عباس وعبد الله بن عمر رضي الله عنهما'),
    ],
    famousQuotes: [
      {
        ar: 'إِنِّي لَأُجَزِّئُ اللَّيْلَ ثَلَاثَةَ أَجْزَاءٍ: ثُلُثًا أَنَامُ، وَثُلُثًا أَقُومُ، وَثُلُثًا أَتَذَكَّرُ حَدِيثَ رَسُولِ اللَّهِ ﷺ.',
        en: 'I divide the night into three parts: one third I sleep, one third I stand in prayer, and one third I review the Hadith of the Messenger of Allah ﷺ.',
        fr: 'Je divise la nuit en trois parts : un tiers pour dormir, un tiers pour prier, et un tiers pour réviser le Hadith du Messager d’Allah ﷺ.',
      },
    ],
    milestones: [
      { yearAH: '7 AH', yearCE: '628 CE', title: t('Islam & Migration', 'Conversion & Émigration', 'إسلامه وهجرته في عام خيبر'), desc: t('Embraced Islam and joined the Prophet ﷺ in Madinah during Khaybar.', 'Conversion et installation à Médine.', 'القدوم إلى المدينة المنورة وملازمة النبي ﷺ لزوماً تاماً.') },
      { yearAH: '8 AH', yearCE: '629 CE', title: t('Miracle of the Cloak', 'Miracle du Manteau', 'معجزة إبساط الرداء'), desc: t('Prophet ﷺ blessed his memory so he never forgot a single narration.', 'Bénédiction de la mémoire infaillible.', 'بسط ردائه ببركة دعاء النبي ﷺ ليزول عنه النسيان للأبد.') },
      { yearAH: '21 AH', yearCE: '642 CE', title: t('Governor of Bahrain', 'Gouverneur de Bahreïn', 'ولاية البحرين في عهد عمر'), desc: t('Appointed by Caliph Umar to govern Bahrain with meticulous audit.', 'Nommé gouverneur par le calife Omar.', 'تولي الإمارة والقضاء مع الحساب المالي الدقيق.') },
      { yearAH: '59 AH', yearCE: '679 CE', title: t('Passing in Madinah', 'Décès à Médine', 'وفاته بالمدينة المنورة'), desc: t('Passed away at age 78 and interred in Jannat al-Baqi\'.', 'Inhumé à Jannat al-Baqi à 78 ans.', 'وفاته بالبقيع الطاهر بعد أن أدى أمانة تبليغ السنة كاملة.') },
    ],
    symbolColor: '#06b6d4',
    tags: ['Ahl as-Suffah', 'Foremost Narrator', 'Baqi Burial', 'Hadith Preservation'],
  },
  {
    id: 'imam_bukhari',
    name: t('Imam Muhammad ibn Ismail al-Bukhari', 'L’Imam al-Boukhari', 'الإمام محمد بن إسماعيل البخاري'),
    title: t('Commander of the Faithful in Hadith & Author of Sahih al-Bukhari', 'Commandeur des Croyants dans le Hadith & Auteur du Sahih', 'أمير المؤمنين في الحديث وإمام المحدثين وجامع أصح الكتب بعد كتاب الله'),
    honorific: 'رحمه الله',
    era: 'hadith_scholars',
    roleCategory: 'hadith_master',
    mentorId: 'abu_hurairah',
    lifeDates: {
      birth: { ah: '194 AH (13 Shawwal)', ce: '810 CE (19 July)' },
      death: { ah: '256 AH (1 Shawwal)', ce: '870 CE (1 September)' },
    },
    lineage: t(
      'Abu Abdillah Muhammad ibn Ismail ibn Ibrahim ibn al-Mughirah ibn Bardizbah al-Ju\'fi al-Bukhari. His great-grandfather Bardizbah was a Persian Zoroastrian in Bukhara whose son Al-Mughirah embraced Islam under governor Yaman al-Ju\'fi.',
      'Mouhammad ibn Ismaïl ibn Ibrahim ibn al-Moughira al-Boukhari.',
      'أبو عبد الله محمد بن إسماعيل بن إبراهيم بن المغيرة بن بَرْدِزْبَه الجعفي البخاري. وجده الأكبر بردزبه كان مجوسياً فارسياً في بخارى، وأسلم المغيرة على يد والي بخارى يمان الجعفي فانتسب إليهم بالولاء.'
    ),
    burialPlace: t('Khartank (near Samarkand), Uzbekistan', 'Khartank (près de Samarcande), Ouzbékistan', 'ضريح الإمام البخاري بقرية خَرْتَنْك (قرب سمرقند)، أوزبكستان'),
    biography: t(
      'The undisputed "Commander of the Faithful in Hadith" whose compilation, Sahih al-Bukhari, is recognized unanimously across the Muslim world as the most authentic book after the Holy Qur\'an. Orphaned young, he lost his eyesight in early childhood; his pious mother prayed with intense tears until she saw Prophet Ibrahim (as) in a dream telling her: "Allah has restored your son\'s sight because of your fervent prayers," and he awoke fully sighted. Endowed with a legendary photographic memory, he memorized 70,000 hadiths as a young boy and over 600,000 as an adult. He spent 16 years traveling thousands of miles across Khurasan, Iraq, Hijaz, Syria, and Egypt. Before inscribing any single hadith into his Sahih, he took a ritual bath (ghusl), prayed two rak\'ahs of Istikharah, and rigorously verified that every transmitter in the chain had a proven physical meeting (Thubut al-Liqa\') with their teacher. In Baghdad, ten scholars tested him by scrambling 100 hadith isnads; he recited every single false match from memory and restored the correct isnad and text for all 100 without hesitation.',
      'Le maître incontesté du Hadith dont le Sahih est considéré unanimement comme le livre le plus authentique après le Coran. Devenu aveugle dans son enfance, sa vue lui fut miraculeusement rendue suite aux prières de sa mère. Doté d’une mémoire photographique prodigieuse, il mémorisa plus de 600 000 récits et voyagea 16 ans durant. Il ne transcrivit aucun Hadith sans avoir pris un bain rituel et accompli deux unités de prière d’Istikhara. À Bagdad, il déjoua l’examen public de 100 récits volontairement inversés en les restituant tous avec exactitude.',
      'أمير المؤمنين في الحديث الذي أجمعت الأمة على تلقي كتابه "صحيح البخاري" بالقبول المطلق كأصح كتاب بعد كتاب الله تعالى. وُلد يتيماً في بخارى وكفّ بصره صغيراً، فبكت أمه ودعت الله بقلب محترق حتى رأت الخليل إبراهيم عليه السلام في المنام يبشرها بأن الله رد عليه بصره بكثرة بكائها، فأصبح مبصراً بإذن الله. تمتع بذاكرة فوتوغرافية خارقة، حفظ سبعين ألف حديث وهو صبي، وطاف بلاد الإسلام 16 عاماً مجاهداً صابراً. كان لا يكتب حديثاً في صحيحه حتى يغتسل ويصلي ركعتين استخارة، واشترط ثبوت اللقاء المباشر بين الرواة. اجتاز امتحان بغداد التاريخي حين قلب له عشرة من كبار العلماء مائة حديث إسناداً ومتناً، فردها جميعاً من حفظه وصححها دون تردد، مما أبهر علماء العراق وخراسان.'
    ),
    achievements: [
      t('Authored Sahih al-Bukhari: 7,275 narrations screened rigorously from over 600,000 hadiths over 16 years', 'Composition du Sahih al-Boukhari (sélection rigoureuse de 7 275 récits parmi 600 000)', 'تصنيف الجامع الصحيح المسند (7275 حديثاً بالمكرر و2602 بدون تكرار) مستخلصاً من 600 ألف حديث في 16 عاماً'),
      t('Founded the modern science of biographical narrator evaluation (Ilm al-Rijal) through At-Tarikh al-Kabir', 'Fondation de la critique biographique des transmetteurs (Ilm ar-Rijal)', 'تأسيس علم الجرح والتعديل وتاريخ الرجال في مصنفه العظيم "التاريخ الكبير" الذي استوعب آلاف التراجم'),
      t('Passed the historic Baghdad Examination: Corrected 100 deliberately swapped hadiths flawlessly from memory', 'Succès magistral au test public de Bagdad (100 récits inversés)', 'اجتياز امتحان بغداد الشهير بتصحيح مائة حديث مقلوب الإسناد والمتن ارتجالاً أمام الملأ'),
    ],
    propheticPraise: {
      ar: '«قَالَ أَحْمَدُ بْنُ حَنْبَلٍ: مَا خَرَجَ مِنْ خُرَاسَانَ مِثْلُ مُحَمَّدِ بْنِ إِسْمَاعِيلَ الْبُخَارِيِّ»، وقال مسلم بن الحجاج حين قبّل بين عينيه: «دَعْنِي أُقَبِّلْ رِجْلَيْكَ يَا أُسْتَاذَ الْأُسْتَاذِينَ، وَسَيِّدَ الْمُحَدِّثِينَ، وَطَبِيبَ الْحَدِيثِ فِي عِلَلِهِ!»',
      en: 'Imam Ahmad ibn Hanbal said: "No one comparable to Muhammad ibn Ismail al-Bukhari has ever emerged from Khurasan." And Imam Muslim kissed him between his eyes saying: "Allow me to kiss your feet, O Teacher of Teachers, Master of Muhaddithin, and Physician of Hadith defects!"',
      fr: 'L’Imam Ahmad ibn Hanbal déclara : « Il n’est jamais sorti du Khorassan d’homme semblable à Mouhammad ibn Ismaïl al-Boukhari. » Et l’Imam Muslim l’embrassa en disant : « Laisse-moi embrasser tes pieds, ô Maître des maîtres et Médecin des défauts du Hadith ! »',
      hadithSource: 'Siyar A\'lam an-Nubala (12/436), Tarikh Baghdad (2/20)',
    },
    works: [
      t('Al-Jami\' al-Musnad al-Sahih al-Mukhtasar (Sahih al-Bukhari)', 'Sahih al-Boukhari', 'الجامع المسند الصحيح المختصر من أمور رسول الله ﷺ وسننه وأيامه'),
      t('Al-Adab al-Mufrad (Islamic Ethics & Conduct)', 'Al-Adab al-Moufrad', 'الأدب المفرد في الأخلاق والشمائل النبوية'),
      t('At-Tarikh al-Kabir & At-Tarikh al-Awsat', 'At-Tarikh al-Kabir', 'التاريخ الكبير والتاريخ الأوسط في تراجم الرواة'),
      t('Khalq Af\'al al-Ibad', 'Khalq Af’al al-Ibad', 'خلق أفعال العباد والرد على أهل البدع'),
      t('Raf\' al-Yadayn fi as-Salah', 'Raf’ al-Yadayn', 'جزء رفع اليدين في الصلاة'),
    ],
    teachers: [
      t('Imam Ahmad ibn Hanbal (Imam of Ahl as-Sunnah)', 'L’Imam Ahmad ibn Hanbal', 'الإمام أحمد بن حنبل إمام أهل السنة والجماعة'),
      t('Ishaq ibn Rahwayh (Suggested compiling the Sahih)', 'Ishaq ibn Rahwayh', 'إسحاق بن راهويه الذي ألهم فكرة تدوين الصحيح المجرد'),
      t('Ali ibn al-Madini (Foremost authority in Hadith defects)', 'Ali ibn al-Madini', 'علي بن المديني إمام علل الحديث الذي قال البخاري: ما استصغرت نفسي إلا بين يديه'),
      t('Yahya ibn Ma\'in (Master of Narrator Verification)', 'Yahya ibn Ma’in', 'يحيى بن معين إمام الجرح والتعديل'),
      t('Makki ibn Ibrahim al-Balkhi', 'Makki ibn Ibrahim', 'مكي بن إبراهيم البلخي شيخه في ثلاثيات البخاري العالية'),
    ],
    students: [
      t('Imam Muslim ibn al-Hajjaj (Author of Sahih Muslim)', 'L’Imam Muslim', 'الإمام مسلم بن الحجاج صاحب الصحيح وتلميذه الوفي'),
      t('Imam Abu Isa at-Tirmidhi (Author of the Jami\')', 'L’Imam at-Tirmidhi', 'الإمام أبو عيسى الترمذي صاحب الجامع والسنن والشمائل المحمدية'),
      t('Imam Ahmad ibn Shu\'ayb an-Nasa\'i (Author of Sunan an-Nasa\'i)', 'L’Imam an-Nasa’i', 'الإمام أحمد بن شعيب النسائي صاحب السنن الكبرى والمجتبى'),
      t('Muhammad ibn Yusuf al-Firabri (Transmitter of the primary text)', 'Al-Firabri', 'محمد بن يوسف الفربري الذي سمع الصحيح ورواه للأمة'),
    ],
    famousQuotes: [
      {
        ar: 'مَا وَضَعْتُ فِي كِتَابِ الصَّحِيحِ حَدِيثًا إِلَّا اغْتَسَلْتُ قَبْلَ ذَلِكَ وَصَلَّيْتُ رَكْعَتَيْنِ، وَصَنَّفْتُهُ فِي سِتَّ عَشْرَةَ سَنَةً، وَجَعَلْتُهُ حُجَّةً بَيْنِي وَبَيْنَ اللَّهِ تَعَالَى.',
        en: 'I never placed a single Hadith in the Sahih without first performing a full ritual bath (Ghusl) and praying two Rak\'ahs. I compiled it over sixteen years and made it an argument between myself and Allah Almighty.',
        fr: 'Je n’ai inscrit aucun Hadith dans le Sahih sans avoir préalablement accompli mes ablutions majeures et prié deux unités de prière. Je l’ai composé en seize années pour être mon argument devant Allah.',
      },
      {
        ar: 'مَا اسْتَصْغَرْتُ نَفْسِي عِنْدَ أَحَدٍ إِلَّا عِنْدَ عَلِيِّ بْنِ الْمَدِينِيِّ.',
        en: 'I never felt inferior or small in the presence of anyone, except in the presence of Ali ibn al-Madini.',
        fr: 'Je ne me suis jamais senti inférieur devant quiconque, sauf en présence d’Ali ibn al-Madini.',
      },
    ],
    milestones: [
      { yearAH: '194 AH', yearCE: '810 CE', title: t('Birth in Bukhara', 'Naissance à Boukhara', 'مولده في بخارى في شوال'), desc: t('Born into a pious scholarly family and memorized the Qur\'an.', 'Naissance d’une famille pieuse.', 'نشأته يتيماً وحفظه للقرآن الكريم.') },
      { yearAH: '210 AH', yearCE: '825 CE', title: t('Hajj & Beginning of Rihlah', 'Pèlerinage et Début des Voyages', 'الحج وبدء الرحلة في طلب الحديث'), desc: t('Traveled to Makkah with his mother and brother, staying in Hijaz to collect hadiths.', 'Départ pour La Mecque et 16 ans de voyages.', 'المجاورة في مكة والمدينة والشروع في سماع الحديث النبوي.') },
      { yearAH: '232 AH', yearCE: '846 CE', title: t('Completion of Sahih al-Bukhari', 'Achèvement du Sahih', 'إتمام تصنيف الجامع الصحيح'), desc: t('Completed the Sahih in 16 years and presented it to Ahmad ibn Hanbal and Ibn al-Madini.', 'Présentation du Sahih aux grands maîtres.', 'عرض الصحيح على أئمة العصر أحمد ويحيى وابن المديني فاستحسنوه وشهدوا بصحته.') },
      { yearAH: '256 AH', yearCE: '870 CE', title: t('Passing in Khartank', 'Décès à Khartank', 'وفاته في ليلة عيد الفطر'), desc: t('Passed away on the eve of Eid al-Fitr in Khartank near Samarkand, surrounded by musk-scented soil.', 'Décès la veille de l’Aïd al-Fitr.', 'انتقاله إلى الرفيق الأعلى بقرية خرتنك وفاح من قبره ريح المسك أسابيع طوالاً.') },
    ],
    symbolColor: '#06b6d4',
    tags: ['Amir al-Muminin fil-Hadith', 'Sahih al-Bukhari', 'Photographic Memory', 'Khartank'],
  },
  {
    id: 'imam_muslim',
    name: t('Imam Muslim ibn al-Hajjaj', 'L’Imam Muslim an-Naysabouri', 'الإمام مسلم بن الحجاج النيسابوري'),
    title: t('The Master Hadith Critic & Author of Sahih Muslim', 'Le Maître Critique du Hadith & Auteur du Sahih', 'حجة الإسلام والناقد المتقن وصاحب الجامع الصحيح المرتب'),
    honorific: 'رحمه الله',
    era: 'hadith_scholars',
    roleCategory: 'hadith_master',
    mentorId: 'imam_bukhari',
    lifeDates: {
      birth: { ah: '204 AH', ce: '820 CE' },
      death: { ah: '261 AH (25 Rajab)', ce: '875 CE (6 May)' },
    },
    lineage: t(
      'Abu al-Husayn Muslim ibn al-Hajjaj ibn Muslim ibn Ward al-Qushayri an-Naysaburi. Traces back to the prominent northern Arab tribe of Banu Qushayr of Hawazin and Mudar.',
      'Muslim ibn al-Hajjaj al-Qouchayri an-Naysabouri de la tribu arabe de Qouchayr.',
      'أبو الحسين مسلم بن الحجاج بن مسلم بن وَرْد القشيري النيسابوري، ينتهي نسبه الصريح إلى قبيلة قُشَير بن كعب بن ربيعة بن عامر بن صعصعة الهوازنية المضرية العربية الشريفة.'
    ),
    burialPlace: t('Nishapur (Nasrabad), Khorasan (Iran)', 'Nishapour (Nasrabad), Khorassan (Iran)', 'نصراباد بمدينة نيسابور، خراسان (إيران)'),
    biography: t(
      'The celebrated author of Sahih Muslim and one of the two pre-eminent Hadith authorities in human history. Born in Nishapur into an ancient noble Arab clan, he began his Hadith studies at age twelve and undertook exhaustive scholarship across Iraq, Hijaz, Syria, and Egypt. Unlike many scholars, he was financially independent as a wealthy, scrupulous merchant of fine garments and textiles, never accepting political favors. In Nishapur, he forged a sublime bond of devotion with Imam al-Bukhari, championing him through hardships. He spent fifteen years refining Sahih Muslim from 300,000 narrations, creating an impeccably ordered work where all transmission variants (Turuq) of a single Hadith are clustered seamlessly in one chapter, avoiding fragmentation. His masterpiece is preceded by his world-renowned Introduction (Muqaddimah), the cornerstone of prophetic historiography and scientific isnad verification.',
      'Auteur du prestigieux Sahih Muslim et l’un des plus grands savants de l’Islam. Issu de la tribu arabe de Qushayr, il commença ses études à 12 ans et parcourut l’Orient. Négociant aisé en tissus, il conserva une indépendance totale vis-à-vis du pouvoir. Disciple et fidèle défenseur d’Al-Bukhari, il passa 15 ans à polir son Sahih parmi 300 000 récits, offrant une œuvre à l’agencement thématique et structurel inégalé où toutes les voies de transmission d’un même hadith sont regroupées sans dispersion.',
      'صاحب "صحيح مسلم" وأحد الجبلين الراسخين في حفظ سنة المصطفى ﷺ مع رفيقه البخاري. وُلد في نيسابور لأسرة عربية قشيرية عريقة، وبدأ السماع وهو في الثانية عشرة من عمره، وطاف العراق والحجاز والشام ومصر. كان تاجراً ميسوراً في بزّ الأقمشة والثياب الفاخرة، عفيف النفس زاهداً لم يدخل في أعطيات السلاطين ولا أطماع الدنيا. لازم الإمام البخاري في نيسابور ملازمة التلميذ البارّ ودافع عنه في محنته. ألّف صحيحه في خمسة عشر عاماً من بين 300 ألف حديث، وتميز صحيحه بحسن الترتيب وسياق طرق الحديث في موضع واحد دون تقطيع للمتون، ووضع في صدره "المقدمة" الشهيرة التي تعد أول وأعظم دستور منهجي في نقد أسانيد الحديث وعِلله.'
    ),
    achievements: [
      t('Authored Sahih Muslim: 7,563 narrations organized with unmatched structural precision and variant clustering', 'Composition du Sahih Muslim (7 563 récits organisés avec une rigueur structurelle magistrale)', 'تصنيف المسند الصحيح (صحيح مسلم) المتميز بجمع طرق الحديث وألفاظه في مكان واحد دون تقطيع'),
      t('Pioneered the scientific methodology of Hadith criticism in his legendary Introduction (Muqaddimah Sahih Muslim)', 'Rédaction de la Muqaddima fondatrice des sciences du Hadith', 'كتابة مقدمة صحيح مسلم التي أرست قواعد علم مصطلح الحديث والتمييز بين الثقات والمعلولين'),
      t('Model of ethical scholarly autonomy through self-sustained textile commerce', 'Modèle absolu d’indépendance financière par le commerce du tissu', 'الاستقلال المالي التام بالتجارة الحلال في الأقمشة دون قبول هدايا الحكام والولاة'),
    ],
    propheticPraise: {
      ar: '«قَالَ أَبُو عَلِيٍّ النَّيْسَابُورِيُّ: مَا تَحْتَ أَدِيمِ السَّمَاءِ كِتَابٌ أَصَحُّ مِنْ كِتَابِ مُسْلِمٍ فِي عِلْمِ الْحَدِيثِ» (أي من حيث جمع الطرق وحسن الصنعة)، وقال الحافظ الذهبي: «هُوَ الْإِمَامُ الْكَبِيرُ، الْحَافِظُ الْحُجَّةُ، صَاحِبُ الصَّحِيحِ الَّذِي رَزَقَهُ اللَّهُ فِيهِ السَّعَادَةَ وَالتَّوْفِيقَ»',
      en: 'Abu Ali an-Naysaburi said: "There is no book under the canopy of heaven more sound and well-crafted in the science of Hadith transmission than the book of Muslim." And Imam adh-Dhahabi said: "He is the great Imam, the authoritative proof, the master of the Sahih whom Allah blessed with supreme success."',
      fr: 'Abou Ali an-Naysabouri a dit : « Il n’y a point sous la voûte céleste d’ouvrage plus rigoureux et mieux ordonné dans la science des voies du Hadith que le livre de Muslim. »',
      hadithSource: 'Tadhkirat al-Huffaz (2/588), Siyar A\'lam an-Nubala (12/558)',
    },
    works: [
      t('Al-Musnad al-Sahih (Sahih Muslim)', 'Sahih Muslim', 'المسند الصحيح المختصر بنقل العدل عن العدل إلى رسول الله ﷺ'),
      t('Al-Muqaddimah fi Usul al-Hadith (The Foundational Introduction)', 'Al-Mouqaddima', 'مقدمة صحيح مسلم في أصول علم الرواية والنقد الحديثي'),
      t('Kitab al-Tamyiz (Principles of Hadith Discrepancy & Defects)', 'Kitab at-Tamyiz', 'كتاب التمييز في نقد روايات الحديث وبيان عللها'),
      t('Kitab al-Kuna wal-Asma\'', 'Kitab al-Kouna wal-Asma', 'كتاب الكُنى والأسماء لرجال الحديث'),
      t('Kitab al-Tabaqat', 'Kitab at-Tabaqat', 'كتاب طبقات التابعين ورواة الأثر'),
    ],
    teachers: [
      t('Imam Muhammad ibn Ismail al-Bukhari (Greatest Teacher & Mentor)', 'L’Imam al-Boukhari', 'أمير المؤمنين في الحديث الإمام البخاري (شيخه وقدوته)'),
      t('Imam Ahmad ibn Hanbal', 'L’Imam Ahmad ibn Hanbal', 'الإمام أحمد بن حنبل الشيباني'),
      t('Ishaq ibn Rahwayh', 'Ishaq ibn Rahwayh', 'الإمام إسحاق بن راهويه'),
      t('Yahya ibn Ma\'in', 'Yahya ibn Ma’in', 'الإمام يحيى بن معين'),
      t('Harmalah ibn Yahya (Disciple of Imam ash-Shafi\'i in Egypt)', 'Harmala ibn Yahya', 'حرملة بن يحيى التجيبي صاحب الإمام الشافعي بمصر'),
    ],
    students: [
      t('Imam Abu Isa at-Tirmidhi', 'L’Imam at-Tirmidhi', 'الإمام الحافظ أبو عيسى الترمذي'),
      t('Abu Bakr ibn Khuzaymah (Imam al-A\'immah)', 'Ibn Khouzayma', 'الإمام أبو بكر بن خزيمة إمام الأئمة'),
      t('Abu Hatim ar-Razi', 'Abou Hatim ar-Razi', 'الإمام أبو حاتم الرازي إمام الجرح والتعديل'),
      t('Ibrahim ibn Muhammad ibn Sufyan (Transmitter of Sahih Muslim)', 'Ibrahim ibn Soufyan', 'إبراهيم بن محمد بن سفيان الفاشاني راوية الصحيح'),
    ],
    famousQuotes: [
      {
        ar: 'إِنَّمَا أَرَدْنَا أَنْ نَقْصِدَ إِلَى جَمِيعِ مَا صَحَّ عَنْ رَسُولِ اللَّهِ ﷺ مِمَّا رَوَاهُ الثِّقَاتُ عَنِ الثِّقَاتِ، حَتَّى يَكُونَ مَفْزَعًا لِأَهْلِ الْعِلْمِ وَطَلَبَةِ الْأَثَرِ.',
        en: 'We only intended to compile everything that is authentic from the Messenger of Allah ﷺ transmitted by trustworthy narrators from trustworthy narrators, to serve as an infallible sanctuary for scholars and students of tradition.',
        fr: 'Nous avons uniquement voulu rassembler tout ce qui est authentique du Messager d’Allah ﷺ transmis par des gens fiables, afin de constituer un sanctuaire solide pour les gens de science.',
      },
      {
        ar: 'لَا يَكُونُ حَدِيثُ الرَّجُلِ صَحِيحًا حَتَّى يَكُونَ سَالِمًا مِنَ الْعِلَّةِ وَالشُّذُوذِ.',
        en: 'A man’s Hadith is never sound (Sahih) until it is free from hidden defect and anomaly.',
        fr: 'Le Hadith d’un homme n’est authentique que s’il est exempt de défaut caché et d’anomalie.',
      },
    ],
    milestones: [
      { yearAH: '204 AH', yearCE: '820 CE', title: t('Birth in Nishapur', 'Naissance à Nishapour', 'مولده في نيسابور بخراسان'), desc: t('Born into the noble Arab clan of Qushayr.', 'Naissance au sein de la tribu arabe de Qouchayr.', 'نشأ في بيت علم وفضل بمدينة نيسابور عاصمة العلم بخراسان.') },
      { yearAH: '218 AH', yearCE: '833 CE', title: t('Began Hadith Studies at 14', 'Début des études à 14 ans', 'الشروع في سماع الحديث وهو ابن أربع عشرة سنة'), desc: t('Undertook foundational study in Nishapur and early travels.', 'Premières études et voyages en Orient.', 'بدء طلب العلم والرحلة إلى مراكز العلم الكبرى.') },
      { yearAH: '250 AH', yearCE: '864 CE', title: t('Meeting Al-Bukhari in Nishapur', 'Rencontre avec Al-Boukhari', 'ملازمة الإمام البخاري في نيسابور'), desc: t('Formed an unbreakable bond of loyalty with Imam al-Bukhari.', 'Alliance intellectuelle et dévotion avec Al-Boukhari.', 'الملازمة التاريخية للإمام البخاري والدفاع عنه في نيسابور.') },
      { yearAH: '261 AH', yearCE: '875 CE', title: t('Passing in Nishapur', 'Décès à Nishapour', 'وفاته بنصراباد في نيسابور'), desc: t('Passed away at age 57 and buried in Nasrabad cemetery in Nishapur.', 'Décès à 57 ans à Nishapour.', 'وفاته في شهر رجب ودفنه بمقبرة نصراباد بنيسابور تاركاً أصح كتاب مركب للأمة.') },
    ],
    symbolColor: '#06b6d4',
    tags: ['Author of Sahih Muslim', 'Hadith Critic', 'Structural Precision', 'Nishapur'],
  },

  // ==========================================
  // 4. UMAYYAD CALIPHATE (DAMASCUS)
  // ==========================================
  {
    id: 'muawiyah_i',
    name: t('Mu\'awiyah I ibn Abi Sufyan', 'Mouawiya Ier', 'معاوية بن أبي سفيان'),
    title: t('Founder of the Umayyad Caliphate & Scribe of Revelation', 'Fondateur du Califat Omeyyade & Scribe de la Révélation', 'مؤسس الدولة الأموية وكاتب الوحي وخال المؤمنين'),
    honorific: 'رضي الله عنه',
    era: 'umayyad',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '41–60 AH',
      ce: '661–680 CE',
    },
    lifeDates: {
      birth: { ah: '20 BH', ce: '602 CE' },
      death: { ah: '60 AH', ce: '680 CE' },
    },
    lineage: t('Mu\'awiyah ibn Abi Sufyan (Sakhr) ibn Harb ibn Umayyah al-Qurashi al-Umawi.', 'Mouawiya ibn Abi Soufyan.', 'معاوية بن أبي سفيان (صخر) بن حرب بن أمية بن عبد شمس القرشي الأموي.'),
    burialPlace: t('Damascus, Syria', 'Damas, Syrie', 'مقبرة باب الصغير، دمشق، سوريا'),
    biography: t(
      'Scribe of the Qur\'anic revelation for the Prophet ﷺ. Governor of the Levant for two decades before establishing the Umayyad Caliphate in Damascus following the historic treaty of reconciliation (\'Am al-Jama\'ah) with Sayyiduna Al-Hasan ibn Ali in 41 AH.',
      'Scribe de la Révélation coranique et gouverneur de Syrie. Fondateur du Califat omeyyade à Damas après l’accord de paix conclu avec Al-Hassan ibn Ali en 41 H.',
      'أحد كتاب الوحي لرسول الله ﷺ، تولى إمارة الشام عشرين عاماً ثم أقام الدولة الأموية وجعل عاصمتها دمشق بعد صلح تاريخي مع سبط رسول الله الحسن بن علي في عام الجماعة (41 هـ).'
    ),
    achievements: [
      t('Founded the first Islamic regular postal network (Al-Barid) and unified central chancellery', 'Création du premier réseau postal d’État (Barid)', 'تأسيس نظام البريد الرسمي وديوان الخاتم لتأمين المراسلات الحكومية'),
      t('Built the first large-scale Islamic naval dockyards in the Mediterranean', 'Développement de la première marine militaire islamique', 'تطوير صناعة السفن وإنشاء الأسطول البحري الإسلامي في البحر الأبيض المتوسط'),
    ],
    symbolColor: '#f97316',
    tags: ['Umayyad Founder', 'Damascus', 'Scribe of Revelation'],
  },
  {
    id: 'abdalmalik_marwan',
    name: t('Abd al-Malik ibn Marwan', 'Abd al-Malik ibn Marwan', 'عبد الملك بن مروان'),
    title: t('The Consolidator of the Caliphate & Builder of Dome of the Rock', 'L’Architecte du Califat & Bâtisseur du Dôme du Rocher', 'مجدد ملك بني أمية وباني مسجد قبة الصخرة ومُعرّب الدواوين والنقود'),
    era: 'umayyad',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '65–86 AH',
      ce: '685–705 CE',
    },
    lifeDates: {
      birth: { ah: '26 AH', ce: '646 CE' },
      death: { ah: '86 AH', ce: '705 CE' },
    },
    lineage: t('Abd al-Malik ibn Marwan ibn al-Hakam ibn Abi al-As al-Qurashi al-Umawi.', 'Abd al-Malik ibn Marwan.', 'عبد الملك بن مروان بن الحكم بن أبي العاص القرشي الأموي.'),
    burialPlace: t('Damascus, Syria', 'Damas, Syrie', 'دمشق، سوريا'),
    biography: t(
      'A brilliant administrator and jurist before his accession. Successfully reunited the fractured Islamic empire, mandated Arabic as the sole language of imperial records, minted the first purely epigraphic Islamic gold Dinar, and built the sublime Dome of the Rock in Jerusalem.',
      'Grand réformateur ayant unifié l’Empire, instauré l’arabe comme langue officielle des administrations, frappé les premiers dinars d’or islamiques et érigé le Dôme du Rocher à Jérusalem.',
      'فقيه المدينة قبل خلافته، نجح في إعادة توحيد الدولة الإسلامية، وعرّب الدواوين الرسمية، وسك أول دينار ذهبي إسلامي مستقل خالٍ من الصور الرومانية، وشيّد مسجد قبة الصخرة المشرفة في القدس.'
    ),
    achievements: [
      t('Construction of the Dome of the Rock (Qubbat as-Sakhrah) in Jerusalem (691 CE)', 'Construction du sublime Dôme du Rocher à Jérusalem', 'بناء مسجد قبة الصخرة المشرفة بالمسجد الأقصى في القدس الشريف (72 هـ)'),
      t('Monetary reform: Minting the first autonomous Islamic gold Dinar and Dirham', 'Première monnaie islamique indépendante (Dinar d’or)', 'سك أول عملة إسلامية خالصة بالخط الكوفي وآيات التوحيد'),
      t('Arabization of imperial state registries across Persia, Egypt, and the Levant', 'Arabisation intégrale des administrations publiques', 'تعريب الدواوين والإدارات الحكومية في بلاد فارس والشام ومصر'),
    ],
    symbolColor: '#f97316',
    tags: ['Dome of the Rock', 'Dinar Coinage', 'Arabization'],
  },
  {
    id: 'umar_ibn_abd_al_aziz',
    name: t('Umar ibn Abd al-Aziz', 'Omar ibn Abd al-Aziz', 'عمر بن عبد العزيز'),
    title: t('The 5th Rightly Guided Caliph & Beacon of Justice', 'Le 5e Calife Bien Guidé & Phare de la Justice', 'خامس الخلفاء الراشدين والخليفة الزاهد ومجدد المائة الأولى'),
    era: 'umayyad',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '99–101 AH',
      ce: '717–720 CE',
    },
    lifeDates: {
      birth: { ah: '61 AH', ce: '681 CE' },
      death: { ah: '101 AH (20 Rajab)', ce: '720 CE' },
    },
    lineage: t(
      'Umar ibn Abd al-Aziz ibn Marwan al-Umawi. Great-grandson of Umar ibn al-Khattab through his mother Layla (Umm Asim) bint Asim ibn Umar.',
      'Omar ibn Abd al-Aziz. Arrière-petit-fils d’Omar ibn al-Khattab par sa mère.',
      'عمر بن عبد العزيز بن مروان بن الحكم القرشي الأموي، وأمه ليلى بنت عاصم بن عمر بن الخطاب رضي الله عنه، فهو حفيد الفاروق من جهة أمه.'
    ),
    burialPlace: t('Dayr Sim\'an, Ma\'arrat an-Nu\'man, Syria', 'Deir Sim’an, Syrie', 'دير سمعان، معرة النعمان، سوريا'),
    biography: t(
      'Universally revered across the entire Islamic world as the Fifth Rightly Guided Caliph. Restored rigorous judicial justice, abolished wrongful taxes, emptied state prisons, and established such unmatched economic equity that zakat collectors could not find a single impoverished person across North Africa and the Levant to receive charity.',
      'Considéré universellement comme le cinquième calife bien guidé. Il restaura la justice intégrale, supprima les taxes injustes et instaura une prospérité où nul ne trouvait de pauvre pour recevoir la zakat.',
      'حفيد الفاروق عمر وسيرته صورة طبق الأصل من جده، ساد في عهد القصير العدل المطلق والأمان، وأرجع المظالم والأموال إلى بيت المال، حتى فاض المال في عهده ولم يجد عمال الزكاة فقيراً يأخذ الصدقة.'
    ),
    achievements: [
      t('Commissioned the first official written compilation of the Hadith under Ibn Shihab az-Zuhri', 'Première codification officielle des Hadiths', 'الأمر بتدوين الحديث النبوي الشريف رسمياً على يد الإمام ابن شهاب الزهري'),
      t('Eradication of poverty across the realm: Zakat distributors found zero eligible recipients', 'Élimination historique de la pauvreté', 'القضاء التام على الفقر في الأمة حتى لم يجد ولاة الزكاة من يقبل مال الصدقات'),
      t('Abolished punitive taxes on non-Arab converts (Mawali) and restored equality', 'Abolition des taxes indues et égalité absolue', 'إلغاء الجزية عن المهتدين الجدد وتحقيق المساواة التامة بين العرب والعجم'),
    ],
    symbolColor: '#f97316',
    tags: ['Fifth Rightly Guided', 'Mujaddid', 'Economic Equality'],
  },

  // ==========================================
  // 5. CALIPHATE OF CORDOBA (AL-ANDALUS)
  // ==========================================
  {
    id: 'abdalrahman_i_cordoba',
    name: t('Abd al-Rahman I (Ad-Dakhil)', 'Abd al-Rahman Ier (L’Émigré)', 'عبد الرحمن الداخل (صقر قريش)'),
    title: t('The Falcon of Quraysh & Founder of the Umayyad Realm in Al-Andalus', 'Le Faucon de Qouraych & Fondateur d’Al-Andalus', 'صقر قريش ومؤسس الدولة الأموية بالأندلس وباني جامع قرطبة'),
    era: 'cordoba',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '138–172 AH',
      ce: '756–788 CE',
    },
    lifeDates: {
      birth: { ah: '113 AH', ce: '731 CE' },
      death: { ah: '172 AH', ce: '788 CE' },
    },
    lineage: t('Abd al-Rahman ibn Mu\'awiyah ibn Hisham ibn Abd al-Malik al-Qurashi al-Umawi. Grandson of Caliph Hisham.', 'Petit-fils du calife Hicham.', 'عبد الرحمن بن معاوية بن هشام بن عبد الملك بن مروان القرشي الأموي، حفيد الخليفة هشام.'),
    burialPlace: t('Cordoba, Spain (Al-Andalus)', 'Cordoue, Espagne', 'قصر قرطبة، الأندلس (إسبانيا)'),
    biography: t(
      'Nicknamed "Saqr Quraysh" (Falcon of Quraysh) by his rival Caliph Al-Mansur for his incredible journey: surviving the Abbasid purge, escaping alone across North Africa, swimming the Euphrates, landing in Spain, and founding a brilliant independent dynasty in Cordoba that lasted for centuries.',
      'Surnommé « Le Faucon de Qouraych » pour son épopée extraordinaire : ayant échappé aux Abbassides, il traversa seul l’Afrique du Nord, s’établit en Espagne et fonda l’émirat de Cordoue.',
      'الملقب بـ "صقر قريش"، نجا بمفرده من ملاحقة العباسيين واجتاز الصحاري سباحة وتخفياً حتى وصل إلى الأندلس، فأسس بمفرده دولة إسلامية كبرى وبنى جامع قرطبة الكبير.'
    ),
    achievements: [
      t('Founded the independent Umayyad Emirate of Cordoba (Al-Andalus) in 756 CE', 'Fondation de l’Émirat omeyyade de Cordoue', 'تأسيس الدولة الأموية المستقلة بالأندلس بعد ملحمة لجوء دامت 6 سنوات'),
      t('Initiated construction of the world-famous Great Mosque of Cordoba (Mezquita)', 'Fondation de la Grande Mosquée de Cordoue', 'البدء في تشييد جامع قرطبة الكبير درة العمارة الإسلامية في أوروبا'),
    ],
    symbolColor: '#14b8a6',
    tags: ['Falcon of Quraysh', 'Cordoba Mezquita', 'Al-Andalus'],
  },
  {
    id: 'abdalrahman_iii_cordoba',
    name: t('Abd al-Rahman III (An-Nasir)', 'Abd al-Rahman III an-Nasir', 'عبد الرحمن الثالث (الناصر لدين الله)'),
    title: t('First Caliph of Cordoba & Sovereign of the Andalusian Golden Age', '1er Calife de Cordoue & Âge d’Or Andalou', 'أول خلفاء قرطبة وباني مدينة الزهراء وصاحب أزهى عصور الأندلس'),
    era: 'cordoba',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '300–350 AH (Caliph 316–350 AH)',
      ce: '912–961 CE',
    },
    lifeDates: {
      birth: { ah: '277 AH', ce: '891 CE' },
      death: { ah: '350 AH', ce: '961 CE' },
    },
    lineage: t('Abd al-Rahman ibn Muhammad ibn Abdallah al-Umawi. 8th ruler and 1st Caliph of Cordoba.', 'Huitième émir et premier calife de Cordoue.', 'عبد الرحمن بن محمد بن عبد الله بن عبد الرحمن بن الحكم الأموي القرشي.'),
    burialPlace: t('Cordoba, Spain', 'Cordoue, Espagne', 'قرطبة، الأندلس'),
    biography: t(
      'Proclaimed the Caliphate of Cordoba in 316 AH (929 CE), transforming Cordoba into the cultural, medical, and scientific capital of Europe, rivaling Baghdad and Constantinople. Built the palatial city of Madinat al-Zahra.',
      'Proclama le califat de Cordoue en 929. Sous son règne de cinquante ans, Cordoue devint le phare intellectuel et architectural de l’Occident. Il construisit la cité palatiale de Madinat al-Zahra.',
      'أعلن قيام الخلافة في قرطبة عام 316 هـ، فصارت قرطبة في عهده عاصمة العلم والطب والفلسفة في أوروبا قاطبة، وقصدتها الوفود من ملوك أوروبا طلباً للصلح والعلم، وشيّد مدينة الزهراء الأسطورية.'
    ),
    achievements: [
      t('Proclaimed the Caliphate of Cordoba, unifying Muslim Iberia', 'Proclamation du Califat de Cordoue (929)', 'إعلان خلافة قرطبة وتوحيد الأندلس وصد الأخطار الخارجية'),
      t('Built the majestic palace city of Madinat al-Zahra', 'Construction de la cité de Madinat al-Zahra', 'بناء مدينة الزهراء الملكية كتحفة حضارية ومعمارية فريدة'),
    ],
    symbolColor: '#14b8a6',
    tags: ['Caliph of Cordoba', 'Madinat al-Zahra', 'European Golden Age'],
  },

  // ==========================================
  // 6. ABBASID CALIPHATE (BAGHDAD)
  // ==========================================
  {
    id: 'abu_jafar_mansur',
    name: t('Abu Ja\'far al-Mansur', 'Abou Jaafar al-Mansour', 'أبو جعفر المنصور'),
    title: t('The True Architect of the Abbasid State & Founder of Baghdad', 'Le Bâtisseur de l’État Abbasside & Fondateur de Bagdad', 'المؤسس الحقيقي للدولة العباسية وباني مدينة السلام بغداد'),
    era: 'abbasid',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '136–158 AH',
      ce: '754–775 CE',
    },
    lifeDates: {
      birth: { ah: '95 AH', ce: '714 CE' },
      death: { ah: '158 AH (during Hajj)', ce: '775 CE' },
    },
    lineage: t(
      'Abdallah ibn Muhammad ibn Ali ibn Abdallah ibn al-Abbas ibn Abd al-Muttalib. Paternal descendant of the Prophet\'s uncle Al-Abbas.',
      'Descendant d’Al-Abbas, oncle paternel du Prophète ﷺ.',
      'عبد الله بن محمد بن علي بن عبد الله بن العباس بن عبد المطلب الهاشمي القرشي، ينتهي نسبه إلى عم النبي العباس.'
    ),
    burialPlace: t('Makkah al-Mukarramah', 'La Mecque', 'مكة المكرمة (توفي وهو مُحرم بالحج)'),
    biography: t(
      'The real structural architect of the Abbasid Caliphate. Laid the physical and economic foundations of the empire and in 145 AH (762 CE) personally founded the Round City of Baghdad (Madinat as-Salam), which became the intellectual center of the world.',
      'Véritable architecte du Califat abbasside. Il fonda en 762 la Cité Ronde de Bagdad (Madinat as-Salam) qui devint le carrefour intellectuel et commercial du monde médiéval.',
      'المؤسس الفعلي للإمبراطورية العباسية، عُرف بحزمه ودهائه وإدارته الحكيمة للمال العام، صاحب المأثرة الكبرى في تأسيس مدينة بغداد المدورة (مدينة السلام) عام 145 هـ على نهر دجلة.'
    ),
    achievements: [
      t('Founded the Round City of Baghdad (Madinat as-Salam) in 762 CE', 'Fondation de la Cité Ronde de Bagdad', 'تخطيط وبناء عاصمة الدنيا بغداد على الطراز المعماري الدائري الفريد'),
      t('Institutionalized public translation of scientific works from Sanskrit, Greek, and Persian', 'Lancement des premières traductions scientifiques', 'بدء حركة الترجمة العلمية من اللغات الإغريقية والهندية والفارسية إلى العربية'),
    ],
    symbolColor: '#6366f1',
    tags: ['Founder of Baghdad', 'Abbasid Architect'],
  },
  {
    id: 'harun_al_rashid',
    name: t('Harun al-Rashid', 'Haroun ar-Rachid', 'هارون الرشيد'),
    title: t('The Zenith of the Islamic Golden Age & Patron of House of Wisdom', 'L’Apogée de l’Âge d’Or & Mécène de la Maison de la Sagesse', 'خليفة العصر الذهبي ورائد بيت الحكمة ومجاهد الملوك'),
    era: 'abbasid',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '170–193 AH',
      ce: '786–809 CE',
    },
    lifeDates: {
      birth: { ah: '149 AH', ce: '766 CE' },
      death: { ah: '193 AH', ce: '809 CE' },
    },
    lineage: t('Harun ibn Muhammad al-Mahdi ibn Abi Ja\'far al-Mansur al-Abbasi al-Hashimi.', 'Haroun al-Mahdi.', 'هارون بن محمد المهدي بن أبي جعفر المنصور العباسي الهاشمي.'),
    burialPlace: t('Mashhad (Tus), Khorasan', 'Machhad (Tous), Iran', 'طوس (مشهد الحالية)، إيران'),
    biography: t(
      'Ruler at the apex of the Islamic Golden Age. Established the world-renowned House of Wisdom (Bayt al-Hikmah) in Baghdad, fostered unprecedented advances in medicine, astronomy, mathematics, and optics, and maintained high diplomatic relations with Emperor Charlemagne.',
      'Souverain de l’apogée de l’âge d’or islamique. Il développa la célèbre Maison de la Sagesse (Bayt al-Hikma) à Bagdad et échangea des présents somptueux avec l’empereur Charlemagne.',
      'أشهر خلفاء بني العباس في التاريخ الإنساني، بلغت الدولة في عهده قمة المجد العلمي والثراء الحضاري، أسس مجمع "بيت الحكمة" في بغداد، وعُرف بأنه كان "يحج عاماً ويغزو عاماً".'
    ),
    achievements: [
      t('Establishment and flourishing of Bayt al-Hikmah (House of Wisdom) in Baghdad', 'Essor magistral de la Maison de la Sagesse', 'تطوير بيت الحكمة كأكبر مجمع أكاديمي ومكتبة في العالم الوسيط'),
      t('Creation of the first public psychiatric and general hospitals (Bimaristans) in Baghdad', 'Fondation des premiers hôpitaux publics (Bimaristans)', 'بناء المستشفيات العامة والمجانية (البيمارستانات) والتعليم الطبي المتقدم'),
    ],
    symbolColor: '#6366f1',
    tags: ['Bayt al-Hikmah', 'Golden Age Zenith', 'Baghdad'],
  },
  {
    id: 'al_mamun',
    name: t('Al-Ma\'mun', 'Al-Mamoun', 'عبد الله المأمون'),
    title: t('The Great Scholar-Caliph & Champion of Scientific Translation', 'Le Calife Savant & Champion de la Traduction Scientifique', 'الخليفة العالم وراعي النهضة الفلكية والفلسفية والرياضية'),
    era: 'abbasid',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '198–218 AH',
      ce: '813–833 CE',
    },
    lifeDates: {
      birth: { ah: '170 AH', ce: '786 CE' },
      death: { ah: '218 AH', ce: '833 CE' },
    },
    lineage: t('Abdallah al-Ma\'mun ibn Harun al-Rashid al-Abbasi.', 'Fils de Haroun ar-Rachid.', 'عبد الله المأمون بن هارون الرشيد بن محمد المهدي العباسي الهاشمي.'),
    fatherId: 'harun_al_rashid',
    burialPlace: t('Tarsus, Cilicia', 'Tarse, Turquie', 'طرسوس، تركيا'),
    biography: t(
      'The intellectual caliph who financed astronomical observatories in Baghdad and Damascus, commissioned the measurement of the Earth\'s circumference on the plains of Sinjar, and generously patronized scholars like Al-Khwarizmi (father of Algebra) and Hunayn ibn Ishaq.',
      'Calife érudit qui finança la mesure du méridien terrestre, créa les observatoires de Bagdad et Damas et parraina les travaux d’Al-Khwarizmi (père de l’algèbre).',
      'الخليفة المفكر الذي جعل الترجمة والبحث العلمي قضيته الأولى، موّل مرصدي بغداد ودمشق، وكلّف علماء الفلك بحساب محيط الكرة الأرضية في صحراء سنجار، ورعى الخوارزمي مخترع علم الجبر.'
    ),
    achievements: [
      t('Commissioned measurement of Earth\'s circumference with astonishing modern accuracy', 'Mesure scientifique de la circonférence de la Terre', 'قياس محيط الأرض بدرجة دقة مذهلة مقارنة بالقياسات الحديثة'),
      t('Patron of Al-Khwarizmi, who developed Algebra and introduced decimal positional numerals', 'Parrainage d’Al-Khwarizmi et invention de l’Algèbre', 'رعاية العالم الفذ محمد بن موسى الخوارزمي ووضع أسس علم الجبر والأرقام الخوارزمية'),
    ],
    symbolColor: '#6366f1',
    tags: ['Earth Circumference', 'Al-Khwarizmi Algebra', 'Translation Movement'],
  },

  // ==========================================
  // 7. OTTOMAN CALIPHATE (ISTANBUL)
  // ==========================================
  {
    id: 'osman_i',
    name: t('Osman I Gazi', 'Osman Ier Gazi', 'عثمان بن أرطغرل (الغازي)'),
    title: t('Founder of the Ottoman State & Dynasty', 'Fondateur de l’État Ottoman', 'مؤسس الدولة العثمانية والغازي المجاهد'),
    era: 'ottoman',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '699–726 AH',
      ce: '1299–1326 CE',
    },
    lifeDates: {
      birth: { ah: '656 AH', ce: '1258 CE' },
      death: { ah: '726 AH', ce: '1326 CE' },
    },
    lineage: t('Osman ibn Ertugrul ibn Suleyman Shah of the Kayi tribe of Oghuz Turks.', 'Fils d’Ertugrul de la tribu Kayi.', 'عثمان بن أرطغرل بن سليمان شاه، من قبيلة قايي التركمانية الغزية.'),
    burialPlace: t('Bursa, Turkey', 'Brousse (Bursa), Turquie', 'بورصة، تركيا'),
    biography: t(
      'Founder and namesake of the Ottoman Dynasty. From a modest principality on the Byzantine frontier in Anatolia, his legendary vision, justice, and adherence to Islamic chivalry established an empire that endured for over six centuries.',
      'Fondateur et éponyme de la dynastie ottomane. Parti d’une principauté frontalière en Anatolie, sa vision morale et son sens de la justice posèrent les bases d’un empire de six siècles.',
      'أمير قبيلة قايي ومؤسس السلالة العثمانية التي حكمت العالم الإسلامي أكثر من 600 عام، بدأ بإمارة حدودية صغيرة في سوغوت بالأناضول وأوصى ابنه أورخان بإقامة العدل وحماية الشريعة.'
    ),
    achievements: [
      t('Declaration of Ottoman state independence in 1299 CE', 'Déclaration d’indépendance de la principauté ottomane (1299)', 'إعلان استقلال الإمارة العثمانية وتأسيس النواة الأولى للدولة (699 هـ)'),
      t('The Testament of Osman: Founding political philosophy of justice and tolerance', 'Testament moral sur la justice et la gouvernance', 'وصية عثمان الشهيرة لابنه أورخان التي أصبحت دستور الحكم والعدل للدولة'),
    ],
    symbolColor: '#ec4899',
    tags: ['Ottoman Founder', 'Kayi Tribe'],
  },
  {
    id: 'mehmed_ii_fatih',
    name: t('Mehmed II (Al-Fatih)', 'Mehmed II le Conquérant', 'محمد الثاني (الفاتح)'),
    title: t('The Conqueror of Constantinople & Fulfiller of Prophetic Glad Tidings', 'Le Conquérant de Constantinople', 'فاتح القسطنطينية ومحقق بشارة النبي ﷺ وقاهر الإمبراطورية البيزنطية'),
    era: 'ottoman',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '855–886 AH',
      ce: '1451–1481 CE',
    },
    lifeDates: {
      birth: { ah: '835 AH', ce: '1432 CE' },
      death: { ah: '886 AH', ce: '1481 CE' },
    },
    lineage: t('Mehmed ibn Murad II ibn Mehmed I al-Uthmani. 7th Ottoman Sultan.', 'Fils de Mourad II.', 'محمد بن مراد الثاني بن محمد الأول بن بايزيد الأول العثماني.'),
    burialPlace: t('Fatih Mosque Complex, Istanbul, Turkey', 'Mosquée Fatih, Istanbul', 'جامع الفاتح، إسطنبول، تركيا'),
    biography: t(
      'At age 21, he conquered Constantinople on 20 Jumada al-Ula 857 AH (29 May 1453 CE), transporting warships over land into the Golden Horn and deploying revolutionary giant cannons designed by Urban. Transformed the city into Istanbul, guaranteed religious freedom to the Greek Orthodox Patriarchate, and fulfilled the famous prophecy of Prophet Muhammad ﷺ.',
      'À 21 ans, il conquit Constantinople le 29 mai 1453, réalisant la prophétie du Prophète ﷺ. Il accorda la liberté de culte aux chrétiens et transforma la ville en capitale cosmopolite de l’Empire.',
      'فتح القسطنطينية وعمره 21 عاماً في 20 جمادى الأولى 857 هـ (1453 م) محققاً بشارة النبي ﷺ. أدار نقل السفن الحربية براً فوق التلال إلى القرن الذهبي، وأصدر فرماناً تاريخياً بحرية العبادة للمسيحيين.'
    ),
    achievements: [
      t('Conquest of Constantinople (1453 CE) ending the 1,100-year Byzantine Empire', 'Conquête historique de Constantinople (1453)', 'فتح القسطنطينية وإنهاء الإمبراطورية البيزنطية وتحويل المدينة إلى إسطنبول عاصمة الخلافة'),
      t('Issued the Edict of Tolerance protecting Orthodox Christian and Jewish civil rights', 'Édit historique de tolérance religieuse', 'إصدار فرمان الأمان الديني للبطريركية الأرثوذكسية واليهود وإعمار المدينة'),
    ],
    propheticPraise: {
      ar: '«لَتُفْتَحَنَّ الْقُسْطَنْطِينِيَّةُ، فَلَنِعْمَ الْأَمِيرُ أَمِيرُهَا، وَلَنِعْمَ الْجَيْشُ ذَلِكَ الْجَيْشُ»',
      en: '"Verily, Constantinople shall be conquered: what a wonderful commander is its commander, and what a wonderful army is that army!"',
      fr: '« Certes, Constantinople sera conquise : quel excellent prince que son prince, et quelle excellente armée que cette armée ! »',
      hadithSource: 'Musnad Ahmad (18977), Al-Mustadrak \'ala as-Sahihayn (8300)',
    },
    symbolColor: '#ec4899',
    tags: ['Conqueror of Constantinople', 'Fatih', 'Prophetic Glad Tidings'],
  },
  {
    id: 'selim_i_yavuz',
    name: t('Selim I (Yavuz)', 'Sélim Ier le Résolu', 'سليم الأول (ياووز)'),
    title: t('1st Ottoman Caliph & Protector of the Two Holy Mosques (Khadim al-Haramayn)', '1er Calife Ottoman & Serviteur des Deux Sanctuaires', 'أول خلفاء بني عثمان وخادم الحرمين الشريفين'),
    era: 'ottoman',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '918–926 AH',
      ce: '1512–1520 CE',
    },
    lifeDates: {
      birth: { ah: '875 AH', ce: '1470 CE' },
      death: { ah: '926 AH', ce: '1520 CE' },
    },
    lineage: t('Selim ibn Bayezid II ibn Mehmed the Conqueror al-Uthmani.', 'Fils de Bayézid II.', 'سليم بن بايزيد الثاني بن محمد الفاتح العثماني.'),
    burialPlace: t('Yavuz Selim Mosque, Istanbul, Turkey', 'Mosquée Yavuz Selim, Istanbul', 'جامع ياووز سليم، إسطنبول، تركيا'),
    biography: t(
      'In 923 AH (1517 CE), Selim I integrated Syria, Egypt, Palestine, and the Hejaz into the Ottoman realm. The last Abbasid caliph in Cairo, Al-Mutawakkil III, formally transferred the office of Caliphate to him, along with the Sacred Relics (Amanat Muqaddasa) of the Prophet ﷺ now housed in Topkapi Palace. He was the first to adopt the title "Servant of the Two Holy Mosques".',
      'En 1517, il unifia le Hedjaz, l’Égypte et la Syrie. Le dernier calife abbassade Al-Moutawakkil III lui transféra officiellement le titre de Calife ainsi que les reliques sacrées du Prophète ﷺ (conservées à Topkapi).',
      'وحّد مصر والشام والحجاز تحت راية واحدة عام 923 هـ (1517 م)، وتنازل له آخر الخلفاء العباسيين في القاهرة المتوكل على الله عن الخلافة والآثار النبوية الشريفة المحفوظة في قصر طوب قابي، ولُقب بـ "خادم الحرمين الشريفين".'
    ),
    achievements: [
      t('Assumption of the official Universal Islamic Caliphate in 1517 CE', 'Transfert officiel du Califat aux Ottomans (1517)', 'انتقال الخلافة الإسلامية الكبرى رسمياً لآل عثمان والاعتراف العالمي بها'),
      t('Safeguarded the Holy Relics (Sacred Mantle, Swords, Staff) of Prophet Muhammad ﷺ in Topkapi', 'Protection des reliques sacrées du Prophète à Topkapi', 'حفظ الأمانات النبوية الشريفة (بردة النبي، رايته، وسيوف الصحابة) في إسطنبول'),
    ],
    symbolColor: '#ec4899',
    tags: ['First Ottoman Caliph', 'Sacred Relics', 'Servant of Two Sanctuaries'],
  },
  {
    id: 'suleiman_the_magnificent',
    name: t('Suleiman I (Al-Qanuni / The Magnificent)', 'Soliman le Magnifique (Al-Qanouni)', 'سليمان القانوني (المعظم)'),
    title: t('The Lawgiver & Golden Age of Imperial Ottoman Power', 'Le Législateur & Âge d’Or Impérial', 'القانوني ومجدد العدالة التشريعية وسلطان العصر الذهبي'),
    era: 'ottoman',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '926–974 AH',
      ce: '1520–1566 CE',
    },
    lifeDates: {
      birth: { ah: '900 AH', ce: '1494 CE' },
      death: { ah: '974 AH', ce: '1566 CE' },
    },
    lineage: t('Suleiman ibn Selim I ibn Bayezid II al-Uthmani.', 'Fils de Sélim Ier.', 'سليمان بن سليم الأول بن بايزيد الثاني العثماني.'),
    fatherId: 'selim_i_yavuz',
    burialPlace: t('Süleymaniye Mosque Complex, Istanbul, Turkey', 'Mosquée Süleymaniye, Istanbul', 'مجمع السليمانية، إسطنبول، تركيا'),
    biography: t(
      'Reigned for 46 years over the zenith of Ottoman global power spanning three continents. Known in the East as "Al-Qanuni" (The Lawgiver) for codifying a comprehensive, unified legal system harmonious with the Shariah, and patron of master architect Mimar Sinan.',
      'Régna 46 ans sur l’apogée de l’Empire s’étendant sur trois continents. Surnommé « Le Législateur » pour avoir harmonisé le droit coutumier et la législation religieuse, et mécène du grand architecte Sinan.',
      'أطول سلاطين بني عثمان حكماً (46 عاماً)، امتدت دولته في قارات العالم الثلاث، لُقّب بالقانوني لوضعه منظومة قوانين تشريعية متطورة التزمت بأحكام الشريعة، وشهد عهده روائع المعماري سنان كجامع السليمانية.'
    ),
    achievements: [
      t('Codified the imperial Kanun legal code balancing administrative law with Shariah', 'Codification du droit impérial (Kanun)', 'تقنين القوانين العثمانية وضبط القضاء ومحاربة الرشوة والفساد الإداري'),
      t('Rebuilt the monumental defensive walls of the Old City of Jerusalem (Al-Quds)', 'Reconstruction monumentale des remparts de Jérusalem', 'تجديد وترميم أسوار مدينة القدس الشريف المحيطة بالمسجد الأقصى القائمة حتى اليوم'),
    ],
    symbolColor: '#ec4899',
    tags: ['The Lawgiver', 'Jerusalem Walls', 'Mimar Sinan Patron'],
  },
  {
    id: 'abdulhamid_ii',
    name: t('Abdulhamid II', 'Abdülhamid II', 'عبد الحميد الثاني'),
    title: t('The Staunch Guardian of Jerusalem & Pioneer of Pan-Islamic Solidarity', 'Le Gardien Résolu de Jérusalem & Pionnier du Panislamisme', 'السلطان المظلوم وحامي القدس وفلسطين وباني خط سكة حديد الحجاز'),
    era: 'ottoman',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '1293–1327 AH',
      ce: '1876–1909 CE',
    },
    lifeDates: {
      birth: { ah: '1258 AH', ce: '1842 CE' },
      death: { ah: '1336 AH', ce: '1918 CE' },
    },
    lineage: t('Abdulhamid ibn Abdulmejid I ibn Mahmud II al-Uthmani. 34th Ottoman Sultan.', 'Fils d’Abdülmejid Ier.', 'عبد الحميد الثاني بن عبد المجيد الأول بن محمود الثاني بن عبد الحميد الأول العثماني.'),
    burialPlace: t('Divanyolu Mausoleum, Istanbul, Turkey', 'Mausolée Divanyolu, Istanbul', 'تربة السلطان محمود الثاني بديفانيولو، إسطنبول، تركيا'),
    biography: t(
      'Reigned during a perilous era of European imperial encirclement. Reinvigorated the spiritual leadership of the Caliphate worldwide, firmly rejected all Zionist attempts and financial offers to purchase or colonize Palestine, and built the historic Hejaz Railway connecting Damascus to Madinah.',
      'Souverain intègre qui défendit la Palestine face aux visées sionistes et aux pressions occidentales. Il fit bâtir le chemin de fer du Hedjaz reliant Damas à Médine pour faciliter le pèlerinage.',
      'دافع بشراسة وبصيرة عن الأمة في مرحلة التكالب الاستعماري، رفض إغراءات وضغوط الصهيونية العالمية لبيع أو تفريط شبر واحد من أرض فلسطين والقدس، وشيّد خط سكة حديد الحجاز لربط الشام بالمدينة المنورة ومكة.'
    ),
    achievements: [
      t('Built the Hejaz Railway (1900–1908) financed purely by voluntary Muslim donations worldwide', 'Construction du chemin de fer du Hedjaz', 'إنشاء خط حديد الحجاز بتمويل إسلامي شعبي تبرعي لخدمة حجاج بيت الله الحرام'),
      t('Refused all monetary pressures to open Palestine to Zionist colonization: "I cannot sell even a handspan of soil"', 'Refus historique de céder la Palestine', 'الموقف التاريخي الخالد برفض بيع شبر واحد من فلسطين قائلاً: "عمل المشرط في جسدي أهون عليّ من أن أرى فلسطين قد بُترت من الدولة الإسلامية"'),
    ],
    symbolColor: '#ec4899',
    tags: ['Defender of Palestine', 'Hejaz Railway', 'Pan-Islamism'],
  },

  // ==========================================
  // 8. UNBROKEN SHARIFIAN HASANID DYNASTIES TO TODAY
  // ==========================================
  {
    id: 'idris_i',
    name: t('Moulay Idris I (Al-Akbar)', 'Moulay Idriss Ier', 'مولاي إدريس الأول (الأكبر)'),
    title: t('Founder of the Idrisid Dynasty & First Islamic State in Morocco', 'Fondateur du Premier État Islamique au Maroc', 'مؤسس الدولة الإدريسية بالمغرب وسليل الإمام الحسن'),
    era: 'idrisid',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '172–177 AH',
      ce: '788–793 CE',
    },
    lifeDates: {
      birth: { ah: '127 AH', ce: '745 CE' },
      death: { ah: '177 AH', ce: '793 CE' },
    },
    lineage: t(
      'Idris ibn Abdallah al-Kamil ibn al-Hasan al-Muthanna ibn al-Hasan ibn Ali ibn Abi Talib and Fatimah az-Zahra. Great-grandson of Sayyiduna Al-Hasan.',
      'Arrière-petit-fils d’Al-Hassan ibn Ali et Fatima az-Zahra.',
      'إدريس بن عبد الله الكامل بن الحسن المثنى بن الحسن السبط بن علي بن أبي طالب وفاطمة الزهراء بنت رسول الله ﷺ.'
    ),
    burialPlace: t('Moulay Idriss Zerhoun, Morocco', 'Moulay Idriss Zerhoun, Maroc', 'مولاي إدريس زرهون، المملكة المغربية'),
    biography: t(
      'Fled to the Maghreb after the Battle of Fakhkh (169 AH). The Berber Awraba tribes of Volubilis (Walili) recognized his noble Prophetic lineage and swore allegiance (Bay\'ah) to him in 172 AH, establishing the first independent Islamic Sharifi state in Morocco.',
      'Ayant survécu à la bataille de Fakhkh, il trouva refuge au Maghreb où les tribus berbères Awraba lui prêtèrent serment d’allégeance en 788, fondant le premier État islamique indépendant au Maroc.',
      'أفلت من معركة فخ في الحجاز ولجأ إلى المغرب، فبايعته قبائل الأمازيغ (أوربة) في وليلي عن طيب خاطر لشرفه ونسبه النبوي عام 172 هـ، ليؤسس أول دولة إسلامية شريفة مستقلة بالمغرب الأقصى.'
    ),
    achievements: [
      t('Established the first sovereign Moroccan Islamic monarchy based on allegiance (Bay\'ah)', 'Fondation de la monarchie islamique marocaine', 'تأسيس أول دولة إسلامية مغربية حرة تجمع بين العرب والأمازيغ تحت راية الإسلام'),
      t('Spread Islamic scholarship and Arabic language across the far Maghreb', 'Diffusion de l’enseignement islamique au Maghreb', 'نشر تعاليم الإسلام واللغة العربية وتوحيد القبائل المغربية'),
    ],
    symbolColor: '#ef4444',
    tags: ['First Moroccan Islamic State', 'Hasanid Sharif', 'Zerhoun'],
  },
  {
    id: 'moulay_ali_cherif',
    name: t('Moulay Ali Cherif (Al-Marakshi)', 'Moulay Ali Chérif', 'مولاي علي الشريف'),
    title: t('Founder and Patriarch of the Alaouite Dynasty of Morocco', 'Patriarche de la Dynastie Alaouite du Maroc', 'جد الأسرة العلوية الشريفة بالمغرب وسليل آل البيت بتفيلالت'),
    era: 'alaouite_morocco',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '1041–1045 AH',
      ce: '1631–1636 CE',
    },
    lifeDates: {
      birth: { ah: '998 AH', ce: '1589 CE' },
      death: { ah: '1069 AH', ce: '1659 CE' },
    },
    lineage: t(
      'Direct Hasanid Sharifi descent: Ali Cherif ibn Al-Hasan ibn Muhammad ibn Al-Hasan ad-Dakhil ... reaching Al-Hasan ibn Ali and Fatimah az-Zahra bint Rasulillah ﷺ.',
      'Descendance directe hassanienne depuis Al-Hassan ibn Ali et Fatima az-Zahra.',
      'علي الشريف بن الحسن بن محمد بن علي بن يوسف بن علي بن الحسن الداخل بن محمد بن القاسم بن محمد بن أبي القاسم بن محمد بن الحسن بن عبد الله بن محمد بن علي بن الحسن بن علي بن أبي طالب وفاطمة بنت رسول الله ﷺ.'
    ),
    burialPlace: t('Rissani, Tafilalet, Morocco', 'Rissani, Tafilalet, Maroc', 'ضريح مولاي علي الشريف، الريصاني، تافيلالت، المغرب'),
    biography: t(
      'Patriarch of the Alaouite Dynasty of Morocco. When the Saadian dynasty declined, the people and tribes of Tafilalet came to him in 1631 CE pledging allegiance (Bay\'ah) due to his universally acknowledged noble Prophetic bloodline, deep piety, and moral authority.',
      'Fondateur de la dynastie alaouite régnante au Maroc. Les tribus du Tafilalet lui prêtèrent serment d’allégeance en 1631 pour sa piété et sa descendance prophétique directe.',
      'مؤسس وجد الدولة العلوية الشريفة الحاكمة بالمغرب، بايعه أهل تافيلالت عام 1631 م لمكانته الدينية الرفيعة ونسبه الحسني الشريف الموصول بالنبي ﷺ، فكانت انطلاقة الدولة التي تحكم المغرب إلى اليوم.'
    ),
    achievements: [
      t('Restored regional stability and initiated the Alaouite lineage that rules Morocco unbroken to this day', 'Fondation de la dynastie régnante au Maroc', 'تأسيس السلالة العلوية الشريفة المستمرة في حكم المملكة المغربية دون انقطاع منذ 4 قرون'),
    ],
    symbolColor: '#ef4444',
    tags: ['Alaouite Patriarch', 'Tafilalet', 'Hasanid Sharif'],
  },
  {
    id: 'mohammed_v_morocco',
    name: t('King Mohammed V', 'Roi Mohammed V', 'الملك محمد الخامس'),
    title: t('Father of Moroccan Independence & Hero of the Nation', 'Père de l’Indépendance du Maroc & Héros National', 'بطل التحرير والاستقلال ومحرر المغرب من الاستعمار'),
    era: 'alaouite_morocco',
    roleCategory: 'modern_monarch',
    reignDates: {
      ah: '1346–1380 AH',
      ce: '1927–1961 CE',
    },
    lifeDates: {
      birth: { ah: '1327 AH', ce: '1909 CE' },
      death: { ah: '1380 AH (10 Ramadan)', ce: '1961 CE (26 February)' },
    },
    lineage: t('Mohammed ibn Youssef ibn Hassan I al-Alaoui al-Hasani. Direct Hasanid descendant of Prophet Muhammad ﷺ.', 'Descendant direct d’Al-Hassan ibn Ali.', 'محمد بن يوسف بن الحسن الأول بن محمد بن عبد الرحمن بن هشام العلوي الحسني.'),
    burialPlace: t('Mausoleum of Mohammed V, Rabat, Morocco', 'Mausolée Mohammed V, Rabat', 'ضريح محمد الخامس، الرباط، المملكة المغربية'),
    biography: t(
      'Revered monarch who stood courageously against French colonial authorities, refused anti-Jewish Vichy laws declaring Moroccan Jews equal citizens, was exiled to Madagascar in 1953 triggering the armed Moroccan resistance, and triumphantly returned in 1955 to declare complete independence.',
      'Souverain héroïque qui s’opposa au protectorat français, protégea les citoyens marocains juifs face à Vichy, fut exilé à Madagascar et revint triomphalement pour proclamer l’indépendance en 1955.',
      'بطل التحرير والرمز الخالد للمقاومة الوطنية ضد الاستعمار الفرنسي والإسباني، رفض القوانين العنصرية لحكومة فيشي ضد اليهود المغاربة معلناً أنهم مواطنون كاملو الحقوق، ونُفي إلى مدغشقر فاندلعت ثورة الملك والشعب حتى عاد ظافراً وأعلن الاستقلال.'
    ),
    achievements: [
      t('Achieved complete independence of the Kingdom of Morocco in 1956', 'Proclamation de l’indépendance du Maroc en 1956', 'تحقيق الاستقلال التام للمملكة المغربية وإنهاء عهد الحماية عام 1956'),
      t('Protected Moroccan Jews during WWII: "There are no Jewish citizens, only Moroccans"', 'Protection héroïque des citoyens de confession juive sous Vichy', 'حماية المواطنين المغاربة من الديانة اليهودية من محرقة النازية ورفض تسليمهم لحكومة فيشي'),
    ],
    symbolColor: '#ef4444',
    tags: ['Hero of Independence', 'Protector of Minorities', 'Alaouite Monarch'],
  },
  {
    id: 'king_mohammed_vi',
    name: t('King Mohammed VI', 'Roi Mohammed VI', 'الملك محمد السادس'),
    title: t('King of Morocco & Amir al-Mu\'minin (Commander of the Faithful) — Current', 'Roi du Maroc & Commandeur des Croyants (Actuel)', 'ملك المغرب وأمير المؤمنين وسليل الدوحة النبوية الشريفة (حفظه الله)'),
    era: 'alaouite_morocco',
    roleCategory: 'modern_monarch',
    reignDates: {
      ah: '1420 AH – Present',
      ce: '1999 CE – Present',
    },
    lifeDates: {
      birth: { ah: '1383 AH', ce: '1963 CE' },
      death: { ah: 'Living', ce: 'Current' },
    },
    lineage: t(
      'Mohammed VI ibn Hassan II ibn Mohammed V ibn Youssef al-Alaoui al-Hasani. Direct 36th generation Hasanid descendant of the Messenger of Allah ﷺ through Sayyidah Fatimah az-Zahra and Sayyiduna Al-Hasan ibn Ali.',
      'Descendant direct à la 36e génération du Prophète Mouhammad ﷺ par Al-Hassan ibn Ali et Fatima az-Zahra.',
      'محمد السادس بن الحسن الثاني بن محمد الخامس بن يوسف بن الحسن الأول بن محمد بن عبد الرحمن بن هشام بن محمد بن عبد الله بن إسماعيل بن علي الشريف، ينتهي نسبه الشريف المتصل إلى الإمام الحسن السبط بن علي بن أبي طالب وفاطمة الزهراء ابنة رسول الله ﷺ.'
    ),
    burialPlace: t('Reigning Monarch, Rabat, Kingdom of Morocco', 'Monarque Régnant, Rabat', 'العاهل الحالي للمملكة المغربية، الرباط'),
    biography: t(
      'Reigning King of Morocco and constitutional Amir al-Mu\'minin (Commander of the Faithful). Upholds the continuous 12-century Moroccan Islamic tradition of moderate, tolerant Maliki Islam, Sufi spiritual diplomacy across Africa (via the Mohammed VI Foundation of African Oulema), and leads the Al-Quds Committee protecting Jerusalem\'s religious heritage.',
      'Roi régnant du Maroc et Commandeur des Croyants. Porteur d’une légitimité religieuse et historique directe remontant au Prophète ﷺ. Président du Comité Al-Qods défendant le patrimoine de Jérusalem.',
      'الملك الحالي للمملكة المغربية وأمير المؤمنين، سليل الدوحة النبوية الشريفة، يرعى ثوابت الأمة المغربية في إسلام الاعتدال والتسامح، ورئيس لجنة القدس المنبثقة عن منظمة التعاون الإسلامي لحماية المقدسات الإسلامية والمسيحية في بيت المقدس، ورائد التنمية الاقتصادية الشاملة في المغرب وإفريقيا.'
    ),
    achievements: [
      t('President of the Al-Quds Committee preserving Islamic and Christian heritage in Jerusalem (Bayt Mal Al-Quds)', 'Présidence du Comité Al-Qods préservant Jérusalem', 'رئاسة لجنة القدس ودعم صمود المقدسيين ميدانياً عبر وكالة بيت مال القدس الشريف'),
      t('Established the Mohammed VI Foundation of African Oulema fostering moderation and countering extremism', 'Fondation Mohammed VI des Oulémas Africains', 'تأسيس مؤسسة محمد السادس للعلماء الأفارقة لنشر قيم التسامح ومحاربة التطرف'),
      t('Modern economic transformation: World-class infrastructure (Tanger Med Port, Noor Solar Complex, High-Speed Rail)', 'Transformations économiques majeures', 'قيادة النهضة التنموية الكبرى (ميناء طنجة المتوسط، محطة نور للطاقة الشمسية، والقطار فائق السرعة)'),
    ],
    symbolColor: '#ef4444',
    tags: ['Amir al-Muminin', 'Al-Quds Committee', 'Current Hasanid Monarch'],
  },

  // ==========================================
  // 9. HASHEMITE DYNASTY OF JORDAN TO TODAY
  // ==========================================
  {
    id: 'sharif_hussein_hejaz',
    name: t('Sharif Hussein ibn Ali', 'Chérif Hussein ibn Ali', 'الشريف حسين بن علي'),
    title: t('Grand Sharif of Makkah & King of the Hejaz', 'Grand Chérif de La Mecque & Roi du Hedjaz', 'شريف مكة المكرمة وأميرها وملك الحجاز وسليل بني هاشم'),
    era: 'hashemite_jordan',
    roleCategory: 'caliph_dynasty',
    reignDates: {
      ah: '1326–1343 AH',
      ce: '1908–1924 CE',
    },
    lifeDates: {
      birth: { ah: '1270 AH', ce: '1854 CE' },
      death: { ah: '1350 AH', ce: '1931 CE' },
    },
    lineage: t(
      'Hussein ibn Ali ibn Muhammad ibn Abd al-Mu\'in ibn Awn al-Hashemi. Direct Hasanid descendant of Prophet Muhammad ﷺ through Al-Hasan ibn Ali.',
      'Chérif hassanien descendant direct du Prophète ﷺ par Al-Hassan ibn Ali.',
      'الحسين بن علي بن محمد بن عبد المعين بن عون، ينتهي نسبه إلى الحسن السبط بن علي بن أبي طالب وفاطمة الزهراء بنت رسول الله ﷺ.'
    ),
    burialPlace: t('Al-Aqsa Mosque Compound, Jerusalem', 'Esplanade de la Mosquée Al-Aqsa, Jérusalem', 'رواق المسجد الأقصى المبارك بالقدس الشريف (بناءً على وصيته)'),
    biography: t(
      'Grand Sharif and Emir of Makkah (1908–1916) and King of the Hejaz. Led the Great Arab Renaissance in 1916. He chose to be buried in the compound of Al-Aqsa Mosque in Jerusalem, cementing the historic Hashemite custody over the holy sites of Jerusalem.',
      'Grand Chérif de La Mecque et Roi du Hedjaz. Il initia la Grande Révolte arabe de 1916. Enterré selon son vœu sur l’esplanade d’Al-Aqsa à Jérusalem, scellant la tutelle hachémite sur les lieux saints.',
      'أمير مكة وشريفها الأجل، قاد النهضة العربية الكبرى عام 1916 لجمع شمل العرب واستقلالهم، أوصى بأن يُدفن في رحاب المسجد الأقصى المبارك بالقدس، ليؤسس أمانة الوصاية الهاشمية على المقدسات المقدسة.'
    ),
    achievements: [
      t('Historical establishment of the Hashemite Custodianship over Jerusalem Holy Sites', 'Tutelle historique hachémite sur les lieux saints de Jérusalem', 'تأسيس الوصاية التاريخية للأسرة الهاشمية على المسجد الأقصى وأوقاف القدس'),
      t('Buried in the sacred grounds of Al-Aqsa Mosque in Jerusalem by unanimous public will', 'Inhumé au sein du complexe d’Al-Aqsa', 'الدفن في باحات المسجد الأقصى الشريف تقديراً لمواقفه المشرفة تجاه فلسطين'),
    ],
    symbolColor: '#8b5cf6',
    tags: ['Grand Sharif of Makkah', 'Al-Aqsa Burial', 'Hashemite Patriarch'],
  },
  {
    id: 'king_hussein_jordan',
    name: t('King Hussein bin Talal', 'Roi Hussein bin Talal', 'الملك الحسين بن طلال'),
    title: t('The Builder King of Jordan & Guardian of Holy Places', 'Le Roi Bâtisseur de Jordanie', 'الملك الباني وبطل الصمود وحامي المقدسات'),
    era: 'hashemite_jordan',
    roleCategory: 'modern_monarch',
    reignDates: {
      ah: '1372–1419 AH',
      ce: '1952–1999 CE',
    },
    lifeDates: {
      birth: { ah: '1354 AH', ce: '1935 CE' },
      death: { ah: '1419 AH', ce: '1999 CE (7 February)' },
    },
    lineage: t('Hussein bin Talal bin Abdullah I bin Hussein al-Hashemi. Direct Hasanid descent.', 'Descendant direct d’Al-Hassan ibn Ali.', 'الحسين بن طلال بن عبد الله الأول بن الحسين بن علي الهاشمي.'),
    burialPlace: t('Royal Cemetery, Amman, Jordan', 'Cimetière Royal, Amman', 'الأضرحة الملكية، قصر رغدان، عمّان، الأردن'),
    biography: t(
      'Reigned over Jordan for nearly 47 turbulent years, building modern Jordan\'s educational and health infrastructure. Personally funded the historic re-gilding of the Dome of the Rock in Jerusalem in 1993 by selling his private family home in London.',
      'Régna 47 ans sur la Jordanie. Il finança personnellement la dorure complète du Dôme du Rocher à Jérusalem en vendant sa propre résidence familiale de Londres.',
      'الملك الباني الذي قاد الأردن 47 عاماً بحكمة وشجاعة وسط عواصف الشرق الأوسط، موّل ترميم قبة الصخرة المشرفة في القدس بالذهب الخالص عام 1993 من ماله الخاص ببيع منزله الشخصي في لندن.'
    ),
    achievements: [
      t('Funded the complete re-gilding of Jerusalem\'s Dome of the Rock with 80 kg of pure gold (1993)', 'Restauration complète en or du Dôme du Rocher', 'إعادة تذهيب قبة الصخرة المشرفة في القدس الشريف بثمانين كيلوغراماً من الذهب الخالص'),
      t('Built modern Jordan\'s comprehensive infrastructure, literacy, and medical networks', 'Développement de l’éducation et de la santé en Jordanie', 'بناء النهضة التعليمية والطبية الشاملة في الأردن وجعله واحة للأمن والاستقرار'),
    ],
    symbolColor: '#8b5cf6',
    tags: ['Dome of the Rock Regilding', 'Builder King', 'Hashemite'],
  },
  {
    id: 'king_abdullah_ii',
    name: t('King Abdullah II ibn Al-Hussein', 'Roi Abdallah II de Jordanie', 'الملك عبد الله الثاني بن الحسين'),
    title: t('King of Jordan & Custodian of Jerusalem Holy Sites — Current', 'Roi de Jordanie & Gardien des Lieux Saints (Actuel)', 'ملك المملكة الأردنية الهاشمية وصاحب الوصاية الهاشمية على مقدسات القدس (حفظه الله)'),
    era: 'hashemite_jordan',
    roleCategory: 'modern_monarch',
    reignDates: {
      ah: '1419 AH – Present',
      ce: '1999 CE – Present',
    },
    lifeDates: {
      birth: { ah: '1381 AH', ce: '1962 CE' },
      death: { ah: 'Living', ce: 'Current' },
    },
    lineage: t(
      'Abdullah II ibn Al-Hussein ibn Talal ibn Abdullah I ibn Hussein al-Hashemi. 41st direct Hasanid descendant of Prophet Muhammad ﷺ through Sayyidah Fatimah and Sayyiduna Al-Hasan.',
      '41e descendant direct du Prophète Mouhammad ﷺ par Al-Hassan ibn Ali et Fatima az-Zahra.',
      'عبد الله الثاني بن الحسين بن طلال بن عبد الله الأول بن الحسين بن علي بن محمد بن عبد المعين بن عون، السليل الحادي والأربعون لسيدنا محمد رسول الله ﷺ من نسل السبط الأكبر الإمام الحسن بن علي.'
    ),
    fatherId: 'king_hussein_jordan',
    burialPlace: t('Reigning Monarch, Amman, Hashemite Kingdom of Jordan', 'Monarque Régnant, Amman', 'العاهل الحالي للمملكة الأردنية الهاشمية، عمّان'),
    biography: t(
      'Current reigning King of the Hashemite Kingdom of Jordan and 41st direct descendant of Prophet Muhammad ﷺ. Official Custodian of the Islamic and Christian Holy Sites in Jerusalem (Al-Quds). Author of the Amman Message (2004) promoting interfaith dialogue, compassion, and rejecting all violent extremism.',
      'Roi régnant de Jordanie et 41e descendant direct du Prophète ﷺ. Gardien officiel des lieux saints musulmans et chrétiens de Jérusalem. Initiateur du Message d’Amman (2004) pour la paix interreligieuse.',
      'الملك الحالي للمملكة الأردنية الهاشمية والسليل الـ 41 لرسول الله ﷺ، صاحب الوصاية الهاشمية المعترف بها دولياً على المسجد الأقصى والمقدسات الإسلامية والمسيحية في القدس، ورائد مبادرة "رسالة عمّان" التاريخية لتعزيز التسامح ونبذ التطرف والغلو.'
    ),
    achievements: [
      t('Direct Custodianship over the Holy Sites of Jerusalem (Al-Aqsa Mosque & Church of Holy Sepulchre)', 'Tutelle légale sur les lieux saints de Jérusalem', 'مواصلة الوصاية التاريخية والقانونية الهاشمية على المسجد الأقصى وكنيسة القيامة في القدس'),
      t('Launched the landmark "Amman Message" (2004) endorsed by 500+ global Islamic authorities', 'Lancement du Message d’Amman pour la tolérance (2004)', 'إطلاق "رسالة عمّان" العالمية التي حظيت بإجماع كبار علماء المسلمين لنبذ الغلو وتكريس الوسطية'),
      t('Restoration of the Pulpit of Salahuddin (Minbar Salah ad-Din) installed in Al-Aqsa', 'Reconstitution fidèle du Minbar de Saladin', 'إعادة بناء منبر صلاح الدين الأيوبي التاريخي وتركيبه في محراب المسجد الأقصى الشريف'),
    ],
    symbolColor: '#8b5cf6',
    tags: ['Jerusalem Custodian', 'Amman Message', 'Current Hashemite Monarch'],
  },
]
