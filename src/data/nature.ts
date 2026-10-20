import type { L3 } from './types'

const t = (en: string, fr: string, ar: string): L3 => ({ en, fr, ar })

export type AnimalCategory = 'birds' | 'mammals' | 'insects' | 'marine' | 'reptiles'
export type PlantCategory = 'fruits' | 'herbs_medicinal' | 'grains_vegetables' | 'drinks_sustenance' | 'heavenly'
export type ScriptureSource = 'quran_and_sunnah' | 'quran' | 'sunnah'

export interface AnimalMotion {
  animationType: 'walk' | 'fly' | 'swim' | 'slither' | 'hover' | 'gallop' | 'perch'
  strideLength: string
  paceDescription: L3
  soundOrSignal?: L3
}

export interface AnimalEntry {
  id: string
  name: L3
  scientificName: string
  arabicCalligraphy?: string
  category: AnimalCategory
  source: ScriptureSource
  quranRefs: string[]
  hadithRefs: { book: string; number: string; text: L3 }[]
  relatedProphets: string[]
  summary: L3
  whatTheyDid: L3
  physicalTraits: {
    size: L3
    habitat: L3
    uniqueFeature: L3
  }
  motion: AnimalMotion
  benefitsAndWisdom: {
    spiritual: L3
    sunnahGuidance: L3
    scientificEcological: L3
    practicalBenefits: L3
  }
}

export interface PlantFoodEntry {
  id: string
  name: L3
  scientificName: string
  category: PlantCategory
  source: ScriptureSource
  quranRefs: string[]
  hadithRefs: { book: string; number: string; text: L3 }[]
  relatedProphets: string[]
  summary: L3
  scriptureContext: L3
  botanicalTraits: {
    growthForm: L3
    habitat: L3
    tasteAndTexture: L3
  }
  benefits: {
    nutritional: L3
    medicinalProphetic: L3
    spiritualWisdom: L3
    modernScience: L3
  }
}

export const QURAN_SUNNAH_ANIMALS: AnimalEntry[] = [
  {
    id: 'hudhud',
    name: t('Hoopoe', 'Huppe fasciée', 'الهدهد'),
    scientificName: 'Upupa epops',
    arabicCalligraphy: 'وَتَفَقَّدَ الطَّيْرَ فَقَالَ مَا لِيَ لَا أَرَى الْهُدْهُدَ',
    category: 'birds',
    source: 'quran',
    quranRefs: ['27:20-28'],
    hadithRefs: [
      {
        book: 'Abu Dawud',
        number: '5267',
        text: t(
          'The Prophet ﷺ prohibited killing four creatures: the ant, the bee, the hoopoe, and the sparrow-hawk/shrike.',
          'Le Prophète ﷺ a interdit de tuer quatre créatures : la fourmi, l’abeille, la huppe et la pie-grièche.',
          'نَهَى رَسُولُ اللَّهِ ﷺ عَنْ قَتْلِ أَرْبَعٍ مِنَ الدَّوَابِّ: النَّمْلَةِ، وَالنَّحْلَةِ، وَالْهُدْهُدِ، وَالصُّرَدِ.'
        ),
      },
    ],
    relatedProphets: ['sulayman'],
    summary: t(
      'Prophet Sulayman’s royal recon scout who traversed the Arabian desert to discovery the sun-worshipping Kingdom of Sheba and carried the monotheistic letter to Queen Bilqis.',
      'L’éclaireur ailé de Salomon qui découvrit le royaume de Saba et porta le message de foi à la reine Bilqis.',
      'طائر نبي الله سليمان ورسوله الأمين الذي تفقد مملكة سبأ وحمل كتاب التوحيد إلى الملكة بلقيس فكان سبباً في إسلام أمة كاملة.'
    ),
    whatTheyDid: t(
      'The Hoopoe was missed during Sulayman’s inspection of the winged ranks. It returned promptly with certain news: it had flown over Sheba in Yemen, found a queen possessing a majestic throne whose people worshipped the sun instead of Allah. Sulayman dispatched the Hoopoe with a letter commanding: "Be you not arrogant against me, but come to me in submission". The Hoopoe delivered it directly to Bilqis, sparking the peaceful conversion of her entire realm.',
      'Lors de l’inspection des troupes ailées par Salomon, la huppe était absente. Elle revint avec une nouvelle décisive : elle avait découvert la reine de Saba et son trône splendide, adorant le soleil. Salomon lui confia sa lettre royale enjoignant à la foi, que la huppe lâcha directement devant la reine, menant à l’entrée de tout un peuple dans l’Islam.',
      'غاب الهدهد عن تفقد سليمان عليه السلام لجيشه من الطير، ثم عاد بنبأ يقين من سبأ باليمن، حيث وجد امرأة تحكمهم ولها عرش عظيم وقومها يسجدون للشمس من دون الله. كلفه سليمان بحمل رسالته الداعية إلى التوحيد: ﴿أَلَّا تَعْلُوا عَلَيَّ وَأْتُونِي مُسْلِمِينَ﴾، فألقاها إليها بدقة وأمانة، فكان هذا الطائر الصغير مفتاح هداية مملكة سبأ.'
    ),
    physicalTraits: {
      size: t('25–29 cm length, 44–48 cm wingspan', '25–29 cm de long, 44–48 cm d’envergure', 'طوله 25-29 سم، وباع جناحيه نحو 46 سم'),
      habitat: t('Arid savannas, date groves, stony steppe', 'Savanes arides, palmeraies, steppes rocheuses', 'الواحات النخيلية، البوادي، والسهوب الصخرية'),
      uniqueFeature: t('Erectile feathered crest like a golden crown and elongated probing bill', 'Huppe érectile chamoisée couronnée de noir et bec fin arqué', 'تاج ريشي بديع يعلو رأسه كالإكليل ومنقار طويل دقيق للتنقيب'),
    },
    motion: {
      animationType: 'fly',
      strideLength: 'Undulating butterfly-like flight',
      paceDescription: t('Graceful undulating flight with fluttering wingbeats', 'Vol ondulé caractéristique rappelant un grand papillon', 'طيران متموج رشيق يخفق فيه بجناحيه بحركات مدروسة متناغمة'),
      soundOrSignal: t('Rhythmic "oop-oop-oop" call sensing underground water aquifers', 'Chant triphonique « houp-houp-houp »', 'نداء إيقاعي مميز "هدهد" يُعرف به قدرته على استشعار المياه الجوفية'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Demonstrates that even a tiny bird can possess divine jealousy for Tawhid and become a catalyst for the salvation of an empire.',
        'Montre qu’un simple oiseau peut porter un zèle sacré pour l’Unicité et être l’instrument du salut d’une civilisation.',
        'دليل على أن أصغر المخلوقات قد يحمل غيرة عظيمة على التوحيد، وأن الإخلاص في تبليغ الحق يفتح قلوب الملوك ويهدي الأمم.'
      ),
      sunnahGuidance: t(
        'The Prophet ﷺ explicitly forbade killing the Hoopoe, honoring its noble role in prophetic history.',
        'Le Prophète ﷺ a formellement interdit de tuer la huppe en hommage à sa fonction prophétique.',
        'نهى النبي ﷺ عن قتل الهدهد تكريماً لدوره النبيل وخصائصه النافعة.'
      ),
      scientificEcological: t(
        'Pest-control champion consuming beetles, locust larvae, and subterranean insects. Possesses exceptional magnetoreception and geomagnetic orientation across deserts.',
        'Régulateur écologique majeur dévorant courtilières et larves; possède un sens magnétique prodigieux de navigation désertique.',
        'مبيد حيوي طبيعي للآفات الزراعية ويرقات الجراد، ويتميز بقدرة خارقة على استشعار المجالات الكهرومغناطيسية والاهتزازات المائية تحت الأرض.'
      ),
      practicalBenefits: t(
        'Natural bio-indicator of soil health and freshwater reserves in ancient arid caravans.',
        'Indicateur biologique ancestral de nappes phréatiques pour les caravanes.',
        'استرشد به العرب القدماء دليلاً حيوياً على نقاء البيئة وقرب المياه العذبة.'
      ),
    },
  },
  {
    id: 'namlah',
    name: t('The Ant', 'La Fourmi', 'النملة'),
    scientificName: 'Formicidae (Messor / Cataglyphis)',
    arabicCalligraphy: 'قَالَتْ نَمْلَةٌ يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ',
    category: 'insects',
    source: 'quran_and_sunnah',
    quranRefs: ['27:18-19'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '3319',
        text: t(
          'An ant bit a Prophet, so he ordered the ant colony to be burnt. Allah revealed to him: "Because a single ant bit you, you destroyed a community among communities that glorifies Allah?"',
          'Une fourmi piqua un prophète qui ordonna de brûler la fourmilière. Allah lui révéla : « Parce qu’une fourmi t’a piqué, tu anéantis une communauté qui célébrait Mes louanges ? »',
          'قَرَصَتْ نَمْلَةٌ نَبِيًّا مِنَ الأَنْبِيَاءِ، فَأَمَرَ بِقَرْيَةِ النَّمْلِ فَأُحْرِقَتْ، فَأَوْحَى اللَّهُ إِلَيْهِ: «أَنْ قَرَصَتْكَ نَمْلَةٌ أَحْرَقْتَ أُمَّةً مِنَ الأُمَمِ تُسَبِّحُ؟»'
        ),
      },
    ],
    relatedProphets: ['sulayman'],
    summary: t(
      'The sentinel ant who warned her entire colony of Sulayman’s advancing armies, causing the King-Prophet to smile in joyous awe and supplicate in profound gratitude.',
      'La fourmi sentinelle qui alerta sa colonie face à l’armée de Salomon, émouvant le roi-prophète jusqu’aux larmes de gratitude.',
      'النملة الحكيمة التي نادت بني جنسها محذرة من وطء جيش سليمان، فسمع سليمان مقالتها وتبسم ضاحكاً وشكر ربه على نعمة فهم منطق الطير والحيوان.'
    ),
    whatTheyDid: t(
      'As Sulayman marched with his grand armies of Jinn, men, and birds across the Valley of Ants, a single female ant perceived the impending danger. She called out with eloquence: "O ants, enter your dwellings lest Sulayman and his soldiers crush you while they perceive not!" Sulayman heard her warning from afar, smiled at her wisdom, halted his vanguard, and prayed: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents."',
      'Quand Salomon traversa la vallée des fourmis avec ses armées d’hommes, de djinns et d’oiseaux, une fourmi sentinelle lança un appel d’une précision remarquable : « Ô fourmis ! Entrez dans vos demeures, de peur que Salomon et ses armées ne vous écrasent sans s’en apercevoir ! » Salomon sourit de son discernement et rendit grâce à Dieu.',
      'حين أشرف سليمان عليه السلام بجيوشه العظيمة على وادٍ في بلاد الشام أو اليمن، أدركت نملة الخطر ونادت بأسلوب بلاغي جامع جمع النداء والتنبيه والأمر والنهي والتحذير والاعتذار: ﴿يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ﴾، فتبسم سليمان شاكراً ربه وأمر جيشه بالانعطاف حماية للوادي.'
    ),
    physicalTraits: {
      size: t('4–12 mm depending on caste', '4–12 mm selon la caste', 'طولها من 4 إلى 12 مم بحسب الرتبة'),
      habitat: t('Subterranean labyrinths, soil chambers, acacia groves', 'Galeries souterraines complexes, steppes arides', 'أنفاق ومساكن هندسية محكمة تحت الأرض'),
      uniqueFeature: t('Exoskeleton of bioceramic chitin; can carry 50 times its body weight', 'Exosquelette de chitine; porte 50 fois sa masse corporelle', 'هيكل كيتيني صلب فائق القوة، وتستطيع حمل ما يعادل 50 ضعف وزنها'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Rapid tripod coordination (6 legs alternating)',
      paceDescription: t('Swift alternating tripod gait over uneven terrain', 'Marche rapide tripode parfaitement synchronisée', 'حركة سريعة ثلاثية الأرجل متناسقة تجتاز العقبات بمرونة خارقة'),
      soundOrSignal: t('Stridulatory organ vibration & acoustic pheromones', 'Stridulation et phéromones acoustiques', 'أصوات احتكاكية دقيقة واهتزازات كيميائية للتواصل والإنذار'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Exemplifies selfless leadership, community responsibility, and excusing others ("while they perceive not").',
        'Incarne le dévouement altruiste, la prévoyance collective et l’excuse fraternelle (« sans s’en apercevoir »).',
        'قمة الإيثار وتحمل المسؤولية وحسن الظن بالمؤمنين والتماس العذر للغير في قولها ﴿وَهُمْ لَا يَشْعُرُونَ﴾.'
      ),
      sunnahGuidance: t(
        'Forbids destroying ant dwellings; declares ants as praising communities of Allah.',
        'Interdit de brûler ou noyer les fourmilières; atteste qu’elles constituent des nations glorifiant Dieu.',
        'نهي النبي ﷺ عن قتل النمل وإحراق قراهم، وإثبات أن النمل أمة تسبح بحمد ربها.'
      ),
      scientificEcological: t(
        'Aerate soil equal to earthworms, circulate nutrients, disperse seeds, and build temperature-regulated architectural tunnels.',
        'Aèrent les sols, recyclent la biomasse et dispersent les graines avec une ingénierie thermique souterraine avancée.',
        'تهوية التربة الزراعية، تدوير العناصر العضوية، ونشر بذور النباتات بهندسة معمارية تحت أرضية دقيقة.'
      ),
      practicalBenefits: t(
        'Model for distributed swarm intelligence, logistics routing, and ecological soil rejuvenation.',
        'Modèle scientifique pour les algorithmes d’optimisation par essaims et la régénération des sols.',
        'استلهم منها العلم الحديث خوارزميات الذكاء الجمعي وتنظيم المرور وشبكات النقل اللوجستية.'
      ),
    },
  },
  {
    id: 'hut_yunus',
    name: t('The Whale / Great Fish', 'La Baleine / Grand Poisson', 'الحوت (صاحب النون)'),
    scientificName: 'Balaenoptera / Physeter macrocephalus',
    arabicCalligraphy: 'فَالْتَقَمَهُ الْحُوتُ وَهُوَ مُلِيمٌ',
    category: 'marine',
    source: 'quran',
    quranRefs: ['37:142', '21:87', '68:48'],
    hadithRefs: [
      {
        book: 'Tirmidhi',
        number: '3505',
        text: t(
          'The supplication of Dhun-Nun (Yunus) while inside the whale’s belly: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers." No Muslim supplicates with it for anything except Allah answers him.',
          'L’invocation de Dhun-Nûn (Jonas) dans le ventre de la baleine : « Il n’y a point de divinité digne d’adoration en dehors de Toi ! Gloire à Toi ! J’étais au nombre des injustes ! » Nul croyant n’invoque par ces mots sans être exaucé.',
          'دَعْوَةُ ذِي النُّونِ إِذْ دَعَا وَهُوَ فِي بَطْنِ الحُوتِ: ﴿لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ﴾، لَمْ يَدْعُ بِهَا رَجُلٌ مُسْلِمٌ فِي شَيْءٍ قَطُّ إِلَّا اسْتَجَابَ اللَّهُ لَهُ.'
        ),
      },
    ],
    relatedProphets: ['yunus'],
    summary: t(
      'The colossal sea creature commanded by Allah to swallow Prophet Yunus whole without harming a bone or lacerating flesh, acting as a subaquatic sanctuary until his glorification of Allah.',
      'La créature marine colossale ordonnée par Allah d’engloutir Jonas sans briser un seul os, devenue son sanctuaire sous-marin de repentir.',
      'الحوت العظيم المأمور من الله بالتقام نبي الله يونس عليه السلام دون أن يكسر له عظماً أو يخدش له لحماً، ليكون له محراباً وسفينة نجاة في ظلمات البحر.'
    ),
    whatTheyDid: t(
      'When Prophet Yunus departed Nineveh in grief before divine leave, he boarded an overloaded ship tossed by tempestuous waves. Lots were cast three times, and each time the lot fell upon Yunus. Cast into the raging Mediterranean sea, Allah commanded a magnificent whale to swallow him whole. Yunus dwelled safely inside its belly amid three darknesses: the darkness of the belly, the darkness of the ocean abyss, and the darkness of night. Hearing the pebbles and marine creatures glorifying Allah, Yunus made his timeless repentance. Allah commanded the whale to swim to the shore and gently cast him upon the barren land.',
      'Quand Jonas quitta Ninive désemparé, il monta à bord d’un navire pris dans la tempête. Le sort désigna Jonas pour être jeté à la mer. Allah commanda à un grand cétacé de l’engloutir sans le blesser. Dans les trois ténèbres (de la baleine, des abysses et de la nuit), Jonas fit son repentir sublime. Dieu ordonna alors à la baleine de le déposer délicatement sur un rivage désertique où une plante de courge lui donna ombrage.',
      'حين غادر يونس قومه في نينوى قبل إذن ربه، ركب سفينة كادت تغرق في لجج البحر، فاستهموا فوقعت القرعة عليه ثلاثاً، فأُلقي في البحر، فأوحى الله إلى حوت عظيم: "لا تأكل له لحماً ولا تكسر له عظماً". فظل يونس ساجداً في ظلمات ثلاث: ظلمة بطن الحوت، وظلمة البحر، وظلمة الليل، منادياً: ﴿لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ﴾، فأمر الله الحوت أن يلفظه برفق على شاطئ قاحل.'
    ),
    physicalTraits: {
      size: t('18–30 meters, up to 150 metric tons', '18–30 mètres, jusqu’à 150 tonnes', 'طوله من 18 إلى 30 متراً، ووزنه يفوق 100 طن'),
      habitat: t('Abyssal ocean waters, Mediterranean and deep open sea', 'Profondeurs océaniques et Méditerranée orientale', 'أعماق البحار والمحيطات المفتوحة'),
      uniqueFeature: t('Vast cavernous mouth cavity with baleen/expandable throat grooves', 'Gorge expansive capable d’abriter sans mastiquer', 'تجويف بلعومي وفمي عملاق يتسع لكائن حي دون سحق'),
    },
    motion: {
      animationType: 'swim',
      strideLength: 'Deep resonant caudal fin strokes',
      paceDescription: t('Gliding majestically through deep water with massive horizontal tail fluke beats', 'Nage majestueuse et puissante par ondulation verticale de la nageoire caudale', 'سباحة انسيابية مهيبة بتموجات زعنفته الذيلية الضخمة تخترق الأمواج العاتية'),
      soundOrSignal: t('Low-frequency infrasonic whale song traversing hundreds of kilometers', 'Chant sous-marin infrasonore à très longue portée', 'أصوات تسبيح وتواصل تحت مائي بترددات منخفضة تجوب مئات الأميال'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Teaches that sincere glorification and admission of wrong (Tawhid + Istighfar) dissolves the deepest distress and turns punishment into divine protection.',
        'Révèle que la reconnaissance humble de ses fautes et la louange pure transforment l’épreuve la plus sombre en sanctuaire de salut.',
        'أعظم درس في تفريج الكربات؛ وأن التوحيد والاعتراف بالتقصير ينقذ العبد من أشد المهالك ظلمات.'
      ),
      sunnahGuidance: t(
        'The Prophet ﷺ prescribed the Dua of Yunus as the ultimate supplication for removing grief and anxiety.',
        'Le Prophète ﷺ a désigné l’invocation de Jonas comme le remède souverain contre l’angoisse.',
        'حث النبي ﷺ على ملازمة دعاء ذي النون عند الكرب والشدائد مبيناً أنه لم يدعُ به مكروب إلا فرج الله عنه.'
      ),
      scientificEcological: t(
        'Whales maintain the oceanic carbon cycle, pump deep marine nutrients (the whale pump) feeding phytoplankton that generate over 50% of the Earth’s oxygen.',
        'Les baleines stockent des gigatonnes de carbone et fertilisent les océans pour la production d’oxygène planétaire.',
        'المحافظة على التوازن البيئي للمحيطات، وتدوير المغذيات العميقة لإنتاج أكثر من نصف أكسجين كوكب الأرض.'
      ),
      practicalBenefits: t(
        'Whale presence revitalizes fisheries and preserves ocean biodiversity for entire global marine ecosystems.',
        'Maintien indispensable des écosystèmes marins et des pêcheries mondiales.',
        'تنظيم السلسلة الغذائية البحرية ودعم تكاثر الثروة السمكية العالمية.'
      ),
    },
  },
  {
    id: 'naqat_salih',
    name: t('She-Camel of Allah', 'La Chamelle de Dieu', 'ناقة الله (ناقة صالح)'),
    scientificName: 'Camelus dromedarius (Miraculous Archetype)',
    arabicCalligraphy: 'فَقَالَ لَهُمْ رَسُولُ اللَّهِ نَاقَةَ اللَّهِ وَسُقْيَاهَا',
    category: 'mammals',
    source: 'quran',
    quranRefs: ['7:73', '26:155-158', '54:27-31', '91:11-14'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '3379',
        text: t(
          'When the Prophet ﷺ passed by Al-Hijr (the dwellings of Thamud), he veiled his head and quickened his pace, saying: "Do not enter the dwellings of those who wronged themselves unless you are weeping, lest there befall you what befell them."',
          'En passant près d’Al-Hijr (demeures de Thamûd), le Prophète ﷺ couvrit sa tête et hâta le pas en disant : « N’entrez dans ces demeures de ceux qui ont été injustes qu’en pleurant... »',
          'لَمَّا مَرَّ النَّبِيُّ ﷺ بِالْحِجْرِ قَالَ: «لاَ تَدْخُلُوا عَلَى هَؤُلاَءِ الْقَوْمِ الْمُعَذَّبِينَ، إِلاَّ أَنْ تَكُونُوا بَاكِينَ، فَإِنْ لَمْ تَكُونُوا بَاكِينَ فَلاَ تَدْخُلُوا عَلَيْهِمْ، لاَ يُصِيبُكُمْ مَا أَصَابَهُمْ».'
        ),
      },
    ],
    relatedProphets: ['salih'],
    summary: t(
      'The miraculous she-camel brought forth from solid stone as a tangible sign for the ancient civilization of Thamud at Al-Hijr, sharing water by turn and supplying abundant milk for the whole tribe.',
      'La chamelle miraculeuse jaillie d’un rocher pour le peuple de Thamûd, partageant la source d’eau et offrant son lait à toute la cité.',
      'آية الله الخالدة لقوم ثمود، أخرجها الله لهم صخرة صماء حاملة تلد فصيلاً، وجعل لها شرب يوم ولهم شرب يوم معلوم، وكانت تسقيهم لبناً يكفي قبائلهم أجمعين.'
    ),
    whatTheyDid: t(
      'The chiefs of Thamud challenged Prophet Salih to bring forth a pregnant, massive she-camel from a specific solid boulder. Salih took their oaths that they would believe if Allah answered. Allah cleaved the rock and the She-Camel emerged. Salih decreed: "This is the She-Camel of Allah; she has a day to drink, and you have a day to drink of the well." On her day she drank the water source and yielded delicious milk sufficient for the whole city. Driven by haughtiness, the wretched Qudar ibn Salif and his companions hamstrung and slaughtered her, mocking Salih to bring punishment. Three days later, a cataclysmic shriek and earthquake wiped them out in their mountain palaces.',
      'Les notables de Thamûd exigèrent un prodige : faire sortir d’un roc massif une chamelle pleine. Salih pria son Seigneur et le rocher se fendit, donnant naissance à la chamelle d’Allah. Elle partageait la source un jour sur deux et donnait assez de lait pour désaltérer la ville entière. Mais les transgresseurs lui tranchèrent les jarrets et la tuèrent avec défi. Trois jours plus tard, le cri céleste et le séisme foudroyèrent leur cité de pierre.',
      'طالب كبراء ثمود صالحاً بآية حسية تعجيزية: أن تخرج من صخرة صماء ناقة عشراء حمراء، فأخذ عليهم العهود بالإيمان، فدعا ربه فانفلقت الصخرة وخرجت الناقة آية مبصرة. قال لهم صالح: ﴿هَذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً فَذَرُوهَا تَأْكُلْ فِي أَرْضِ اللَّهِ وَلَا تَمَسُّوهَا بِسُوءٍ﴾. فكانت تشرب يوماً فلا يقربون البئر، وتدر عليهم لبناً هنيئاً يشرب منه كل أهل الحجر. لكن شقيّ القوم قدار بن سالف عقرها عتواً واستكباراً، فأمهلهم صالح ثلاثة أيام ثم أخذتهم الرجفة والصيحة فأصبحوا في دارهم جاثمين.'
    ),
    physicalTraits: {
      size: t('Towering majestic scale, exceeding conventional camels', 'Stature imposante et majestueuse surpassant les chamelles ordinaires', 'عظيمة الخلقة فائقة الهيبة تفوق النوق المعتادة حسناً وضخامة'),
      habitat: t('Al-Hijr / Mada’in Salih in the arid northwest Arabian Peninsula', 'Al-Hijr (Mada’in Salih) au nord-ouest de l’Arabie', 'الحجر ومدائن صالح ووادي القرى شمال غرب الجزيرة العربية'),
      uniqueFeature: t('Emerged alive from solid stone; produced endless nourishing milk', 'Sortie vivante d’un roc massif; lactation prodigieuse', 'خروجها حية ولوداً من قلب الصخر الصلد، ودرّها اللبن الوافر لأمة كاملة'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Stately, measured pacing with high-head poise',
      paceDescription: t('Solemn, serene desert stride radiating tranquility and awe', 'Démarche noble et sereine arpentant les défilés rocheux', 'مشي وقور هادئ يخترق جبال الحجر بشموخ وسكينة ربانية'),
      soundOrSignal: t('Gentle resonant bleat heard across the rock-cut valleys', 'Bégaiement grave résonnant dans les canyons', 'حنين عذب كان يتردد صداه في جنبات وادي الحجر'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Warns against contempt for divine signs and transgressing against the defenseless; shows how a single criminal act endorsed by society brings collective ruin.',
        'Met en garde contre le mépris des signes divins et montre comment le crime commis par quelques-uns et toléré par tous attire le châtiment.',
        'التحذير الشديد من الاستهانة بآيات الله وحرماته، وأن الرضا بالظلم وممالأة المجرمين سبب لهلاك المجتمعات.'
      ),
      sunnahGuidance: t(
        'Prophet Muhammad ﷺ warned his followers when traversing ruins of Thamud to reflect with humility and hasten through without drinking contaminated water.',
        'Enseignement prophétique de passer avec gravité et recueillement près des cités des peuples disparus.',
        'أمر النبي ﷺ عند المرور بديار المعذبين بالاعتبار والوجل، وعدم استسقاء مياه آبارهم إلا بئر الناقة.'
      ),
      scientificEcological: t(
        'Camels represent evolutionary zenith in water economy, with red blood cells that swell without bursting and nostrils recycling 60% of respiratory moisture.',
        'Le dromadaire constitue le sommet adaptatif : globules rouges extensibles, économie hydrique absolue et récupération de 60% de l’humidité respiratoire.',
        'الإعجاز الحيوي للإبل في الصبر على العطش، وتحمل درجات حرارة تصل 50°، وخلايا دمها البيضاوية التي تتمدد دون انفجار.'
      ),
      practicalBenefits: t(
        'Camel milk contains high concentrations of vitamin C, lactoferrin, and immunoglobulins without allergenic beta-casein.',
        'Le lait de chamelle est un élixir riche en immunoglobulines, lysozymes et vitamine C, sans caséine allergène.',
        'لبن الإبل صيدلية طبيعية غنية بالأجسام المضادة وفيتامين ج، معزز للمناعة وخافض لمقاومة الأنسولين.'
      ),
    },
  },
  {
    id: 'kalb_kahf',
    name: t('The Dog of the Cave', 'Le Chien des Compagnons de la Caverne', 'كلب أصحاب الكهف (قطمير)'),
    scientificName: 'Canis lupus familiaris (Ancient Shepherd Breed)',
    arabicCalligraphy: 'وَكَلْبُهُم بَاسِطٌ ذِرَاعَيْهِ بِالْوَصِيدِ',
    category: 'mammals',
    source: 'quran',
    quranRefs: ['18:18', '18:22'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '3321',
        text: t(
          'A man saw a dog panting and licking mud because of severe thirst. He descended into a well, filled his shoe with water, held it with his teeth, climbed out, and watered the dog. Allah appreciated his deed and forgave all his sins.',
          'Un homme vit un chien assoiffé léchant la boue. Il descendit dans un puits, remplit sa chaussure d’eau, la tint entre ses dents, remonta et abreuva le chien. Allah loua son geste et lui pardonna.',
          'رَأَى رَجُلٌ كَلْبًا يَأْكُلُ الثَّرَى مِنَ الْعَطَشِ، فَنَزَلَ الرَّجُلُ بِئْرًا فَمَلأَ خُفَّهُ ثُمَّ أَمْسَكَهُ بِفِيهِ حَتَّى رَقِيَ فَسَقَى الْكَلْبَ، فَشَكَرَ اللَّهُ لَهُ فَغَفَرَ لَهُ.'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The devoted loyal dog who accompanied the believing monotheistic youth fleeing persecution, sleeping beside them for 309 lunar years with forelegs stretched at the threshold as a fearsome sentinel.',
      'Le chien loyal qui accompagna les jeunes croyants dans la caverne, veillant à leur seuil durant 309 années de sommeil miraculeux.',
      'الكلب الوفي الذي رافق الفتية المؤمنين الفارين بدينهم من طغيان الملك دقيانوس، فرقد معهم في الكهف باسطاً ذراعيه بالوصيد طيلة 309 سنوات قمرية حارساً لهم بإذن الله.'
    ),
    whatTheyDid: t(
      'When the young believers fled their idolatrous city to preserve their faith in the One True God, a dog followed them loyally. Arriving at the secluded limestone cave, Allah cast a protective deep sleep upon them. The dog stretched out his two forelegs across the cave threshold (al-Waseed), remaining in suspended state alongside them. Any intruder gazing toward the cave entrance would be filled with sheer dread at the sight of the sleeping guardians and their watchful sentinel, protecting the youths for over three centuries until their miraculous reawakening.',
      'Quand les jeunes gens fuirent la persécution pour préserver leur foi, le chien leur emboîta le pas. Réfugiés dans la caverne, Allah fit descendre un sommeil miraculeux sur eux. Le chien s’allongea, pattes déployées sur le seuil, veillant pendant trois siècles. Quiconque les eût aperçus eût été rempli d’effroi devant cette garde providentielle, préservant leur sanctuaire jusqu’au réveil de la foi.',
      'لما فر الفتية بدينهم من الشرك واعتزلوا قومهم إلى الكهف، تبعهم كلبهم بدافع الوفاء. فلما ضرب الله على آذانهم النوم المعجز لثلاثمائة سنين وازدادوا تسعاً، رقد الكلب عند باب الكهف باسطاً ذراعيه بمهابة تحرس مدخلهم، وحماهم الله بالرعب: ﴿لَوِ اطَّلَعْتَ عَلَيْهِمْ لَوَلَّيْتَ مِنْهُمْ فِرَارًا وَلَمُلِئْتَ مِنْهُمْ رُعْبًا﴾، فخلد القرآن ذكره تكريماً لصدق صحبته للصالحين.'
    ),
    physicalTraits: {
      size: t('Medium-large shepherd/guard build, 55–65 cm shoulder height', 'Chien de berger/garde moyen-grand, 60 cm au garrot', 'بنية كلب حراسة متوسط الحجم قوي القوائم عريض الصدر'),
      habitat: t('Limestone highlands, cave threshold at the entrance (Al-Waseed)', 'Hauts plateaux et seuil de la caverne protectrice', 'المرتفعات الجبلية وعتبة الكهف الأمامية'),
      uniqueFeature: t('Impassive watchful posture with paws stretched flat; miraculous longevity', 'Posture sentinelle immobile pattes allongées; longévité miraculeuse', 'هيئته الباسطة ذراعيه المانعة لكل من يدنو بالرعب المهيب'),
    },
    motion: {
      animationType: 'perch',
      strideLength: 'Stretched resting vigilance with steady breathing',
      paceDescription: t('Poised recumbent guard posture with front paws extended along the floor', 'Position allongée sphinx vigilant, pattes avant tendues', 'ربوض مهيب ساكن ومستقر على عتبة الغار تنبعث منه الهيبة والحراسة'),
      soundOrSignal: t('Silent rhythmic breathing protecting the cave sanctity', 'Respiration apaisée et silencieuse', 'صمت مطبق مهيب لا ينبح ولا يتحرك ليلاً ولا نهاراً'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Proves that being in the company of the righteous elevates status; even an animal is immortalized in divine scripture through noble companionship.',
        'Enseigne que la compagnie des vertueux ennoblit l’être; même un animal voit son nom et son rôle gravés dans la Révélation éternelle par fidélité.',
        'بركة مرافقة الصالحين ومحبتهم؛ فإذا نال الكلب شرف الذكر الخالد في كتاب الله بصحبته لأولياء الله، فكيف بالمؤمن الموالي للصالحين؟'
      ),
      sunnahGuidance: t(
        'Affirms compassion toward all living creatures; hadith records that quenching a thirsty dog brought forgiveness of a lifetime of sins.',
        'La tradition prophétique célèbre la compassion envers les animaux comme porte d’accès au pardon divin.',
        'تأكيد الشريعة على الرحمة بالحيوان، وأن في كل كبد رطبة أجراً، وجعل سقي الكلب العطشان سبباً لمغفرة الذنوب.'
      ),
      scientificEcological: t(
        'Canine olfactory system possesses up to 300 million scent receptors (vs. 6 million in humans), sensing pheromones, micro-seismic shifts, and distant movement.',
        'L’odorat canin comporte 300 millions de récepteurs olfactifs détectant les infrasons et les variations hormonales à distance.',
        'الإعجاز الحسي لدى الكلاب في حاسة الشم (300 مليون مستقبل) واستشعار الاهتزازات البعيدة بدقة تفوق الحواس البشرية.'
      ),
      practicalBenefits: t(
        'Supreme guardian fidelity, tracking capability, and protective bio-security for homes, flocks, and dwellings.',
        'Fidélité protectrice, garde des troupeaux et détection olfactive vitale.',
        'الحراسة الأمينة للممتلكات ورعي الماشية والتتبع، والوفاء الفطري المنقطع النظير.'
      ),
    },
  },
  {
    id: 'baqarah',
    name: t('The Yellow Cow of Bani Isra’il', 'La Vache des Enfants d’Israël', 'بقرة بني إسرائيل'),
    scientificName: 'Bos taurus (Bright Golden Heifer)',
    arabicCalligraphy: 'إِنَّهَا بَقَرَةٌ صَفْرَاءُ فَاقِعٌ لَّوْنُهَا تَسُرُّ النَّاظِرِينَ',
    category: 'mammals',
    source: 'quran',
    quranRefs: ['2:67-71', '2:72-73'],
    hadithRefs: [],
    relatedProphets: ['musa'],
    summary: t(
      'The immaculate bright golden heifer commanded by Allah to resolve a murder mystery among Bani Isra’il, striking the deceased to resurrect him and reveal his murderer.',
      'La génisse d’un jaune éclatant demandée par Moïse pour élucider un meurtre chez les Enfants d’Israël en ressuscitant la victime.',
      'البقرة الصفراء الفاقعة الفريدة التي أمر الله بني إسرائيل بذبحها لكشف لغز جريمة قتل غامضة، حيث ضرب الميت ببعضها فقام حياً وأخبر بقاتله.'
    ),
    whatTheyDid: t(
      'A wealthy man among Bani Isra’il was murdered by his nephew for his inheritance, and the culprit threw the body at another clan’s door, almost inciting civil war. They asked Musa to petition Allah to identify the killer. Musa informed them: "Allah commands you to slaughter a cow." Instead of executing the command with simplicity, they questioned repeatedly: What is it? What color? What are its traits? With each question, Allah narrowed the specifications: not old, not young, bright golden yellow delighting all onlookers, unyoked to plow or water the fields, sound without blemish. When they finally found and purchased it at great expense, they slaughtered it, struck the corpse with part of it, and the dead man sat up alive, named his murderer, and passed away again.',
      'Un notable d’Israël fut assassiné pour son héritage par son neveu qui accusa une autre tribu. Ils supplièrent Moïse de solliciter Dieu. Moïse annonça l’ordre divin de sacrifier une vache. Par ergoteur orgueil, ils multiplièrent les questions tatillonnes : son âge, sa couleur, son labeur. Allah restreignit alors le choix : une génisse d’un jaune d’or étincelant, jamais attelée, sans défaut. Ils la sacrifièrent à grand prix, frappèrent le défunt d’un de ses morceaux : l’homme ressuscita instantanément, dénonça son meurtrier et retomba en poussière.',
      'قُتل رجل ثري من بني إسرائيل ولم يُعرف قاتله، فكادت تقع فتنة عظيمة بين القبائل، فسألوا موسى عليه السلام، فقال: ﴿إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تَذْبَحُوا بَقَرَةً﴾. فاستكبروا وسخروا وقالوا أتتخذنا هزواً؟ ثم شددوا على أنفسهم بالسؤال عن سنها ولونها وعملها، فشدد الله عليهم حتى حددها بصفات نادرة: ﴿صَفْرَاءُ فَاقِعٌ لَوْنُهَا تَسُرُّ النَّاظِرِينَ * لَا ذَلُولٌ تُثِيرُ الْأَرْضَ وَلَا تَسْقِي الْحَرْثَ مُسَلَّمَةٌ لَا شِيَةَ فِيهَا﴾. فاشتروها بملء جلدها ذهباً وذبحوها وضربوا الميت ببعضها فقام بإذن الله حياً وأشار إلى قاتله ثم مات.'
    ),
    physicalTraits: {
      size: t('Prime youthful bovine build, 500–600 kg', 'Génisse robuste et vigoureuse, 550 kg', 'بقرة يافعة مكتملة النمو بوزن يتجاوز 500 كجم'),
      habitat: t('Lush fertile river valleys of the Nile and Goshen', 'Vallées fertiles du Nil et oasis de Goshên', 'مروج الدلتا وسهول الرعي الخصبة'),
      uniqueFeature: t('Pure luminous saffron-golden coat, captivating every onlooker', 'Robe d’un jaune d’or intense et pur sans la moindre tache', 'لون أصفر ذهبي فاقع ناصع يبهج قلوب الناظرين ويسرهم'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Free, unblemished pasture walk with untamed grace',
      paceDescription: t('Free, untamed pasture stride never subdued by yoke or plow', 'Marche libre et altière d’un animal jamais soumis au joug', 'مشية رشيقة طليقة لم تذل بالحرث ولا السقاية'),
      soundOrSignal: t('Resonant calm bovine lowing', 'Mugissement clair et serein', 'خوار هادئ عميق يتردد في المرعى'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Warns against excessive questioning and hair-splitting in religion (Tashdid); demonstrates Allah’s absolute power to resurrect the dead on the Day of Judgment.',
        'Met en garde contre le pinaillage religieux stérile; prouve la résurrection physique des corps au Jour Dernier.',
        'التحذير من التنطع والتشديد في الدين وكثرة الأسئلة، وإقامة الحجة الباهرة على قدرة الله على إحياء الموتى كما بدأ أول خلق يعيده.'
      ),
      sunnahGuidance: t(
        'The Prophet ﷺ said: "Leave me as I have left you, for those before you were destroyed by their excessive questioning and disputing with their prophets."',
        'Le Prophète ﷺ a enseigné : « Laissez-moi tant que je vous laisse, car ce qui a causé la perte de vos prédécesseurs, c’est l’abondance de leurs questions... »',
        'قول النبي ﷺ: «ذَرُونِي مَا تَرَكْتُكُمْ، فَإِنَّمَا أَهْلَكَ مَنْ كَانَ قَبْلَكُمْ كَثْرَةُ سُؤَالِهِمْ وَاخْتِلاَفُهُمْ عَلَى أَنْبِيَائِهِمْ».'
      ),
      scientificEcological: t(
        'Bovine rumen hosts trillion-member microbiome breaking down complex cellulose into volatile fatty acids and high-quality milk protein.',
        'Le rumen bovin héberge un écosystème symbiotique transformant la cellulose brute en protéines hautement assimilables.',
        'الإعجاز الهضمي في تخمير الألياف السيلولوزية وتحويلها إلى بروتينات حيوية وألبان نقية سائغة للشاربين.'
      ),
      practicalBenefits: t(
        'Primary source of wholesome milk, dairy fats, clean meat, organic fertilizer, and agricultural vitality.',
        'Source essentielle de lait, beurre clarifié, viande pure et fertilisation des cultures.',
        'إنتاج الألبان والأجبان، واللحوم النقية، وتسميد الأراضي الزراعية عضوياً.'
      ),
    },
  },
  {
    id: 'fil',
    name: t('The Elephant', 'L’Éléphant', 'الفيل (محمود)'),
    scientificName: 'Elephas maximus / Loxodonta africana',
    arabicCalligraphy: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ',
    category: 'mammals',
    source: 'quran',
    quranRefs: ['105:1-5'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '3906',
        text: t(
          'On the Day of Al-Hudaibiyah, when the Prophet’s she-camel knelt down, the people said: "She has become stubborn." The Prophet ﷺ said: "She has not become stubborn, nor is it in her nature, but He Who restrained the Elephant has restrained her."',
          'Le jour d’Al-Houdaybiya, la chamelle du Prophète ﷺ s’agenouilla. Les gens s’écrièrent : « Elle refuse d’avancer ! » Le Prophète ﷺ répondit : « Elle ne refuse pas, mais Celui qui a retenu l’éléphant l’a retenue. »',
          'قَالَ النَّبِيُّ ﷺ يَوْمَ الْحُدَيْبِيَةِ لَمَّا بَرَكَتْ نَاقَتُهُ: «مَا خَلأَتِ الْقَصْوَاءُ وَمَا ذَاكَ لَهَا بِخُلُقٍ، وَلَكِنْ حَبَسَهَا حَابِسُ الْفِيلِ».'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The mighty war elephant of the Abyssinian ruler Abrahah who knelt steadfastly and refused to advance against the Ka’bah in Makkah, protecting the Sanctity of Allah’s Ancient House.',
      'Le puissant éléphant de guerre d’Abrahah qui s’agenouilla et refusa résolument de marcher contre la Ka’ba sacrée à La Mecque.',
      'فيل أبرهة الحبشي الأعظم المسمى "محمود"، الذي برك في وادي المغمس وامتنع عن التقدم لهدم الكعبة المشرفة في عام الفيل، حامياً لحرمة بيت الله الحرام.'
    ),
    whatTheyDid: t(
      'In 570 CE (The Year of the Elephant, the birth year of Prophet Muhammad ﷺ), Abrahah al-Ashram led a massive army with armored war elephants to demolish the Ka’bah. The lead elephant, named Mahmud, marched obediently toward Makkah until reaching the edge of the sacred sanctuary at Wadi Muhassir. There, Nufayl ibn Habib whispered into its ear: "Kneel, Mahmud, and return safely whence you came, for you are in the sacred land of Allah!" The colossal elephant knelt down instantly. When they beat it to stand toward Yemen, Sham, or east, it arose and ran; but whenever faced toward the Ka’bah, it knelt immovably. Soon after, Allah sent swarms of Ababil birds with baked clay stones, annihilating the army like chewed straw.',
      'En 570 ap. J.-C., Abrahah mena son armée pour raser la Ka’ba avec ses éléphants de guerre. Arrivé aux portes du sanctuaire de La Mecque, le grand éléphant Mahmud s’agenouilla obstinément. Qu’on le tournât vers le Yémen ou vers l’Est, il se levait en hâte, mais pointé vers la Ka’ba, il refusait d’avancer d’un pas. Allah envoya alors les volées d’oiseaux Ababil aux pierres d’argile cuite, anéantissant l’armée comme une paille mâchée.',
      'قاد أبرهة الأشرم جيشاً جراراً تقدمته الفيلة لهدم الكعبة لصرف العرب إلى كنيسته "القليس" بصنعاء. فلما وصلوا وادي المغمس بالقرب من مكة، برك الفيل الأكبر "محمود" وأبى أن يتحرك نحو الكعبة قيد أنملة. فإذا وجهوه نحو اليمن أو الشام هرول مسرعاً، وإذا وجهوه نحو البيت الحرام برك في الأرض استسلاماً لحرمة الله. ثم أرسل الله طيراً أبابيل رمتهم بحجارة من سجيل فجعلهم كعصف مأكول، ووُلد النبي ﷺ في ذلك العام المبارك.'
    ),
    physicalTraits: {
      size: t('3.5–4 meters height, 6,000–7,000 kg mass', '3,5–4 mètres au garrot, 6 tonnes', 'ارتفاعه نحو 4 أمتار، وكتلته تتجاوز 6 أطنان'),
      habitat: t('Abyssinian / African savanna and river plains', 'Savanes et forêts d’Abyssinie et d’Afrique orientale', 'سافانا وغابات الهضبة الحبشية الإفريقية'),
      uniqueFeature: t('Prehensile muscular trunk containing 40,000 muscle fascicles; curving ivory tusks', 'Trompe préhensile dotée de 40 000 faisceaux musculaires et défenses d’ivoire', 'خرطوم عضلي فائق الذكاء والقوة يضم أكثر من 40 ألف عضلة وأنياب عاجية هائلة'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Heavy, reverberating quadrupedal pace with silent cushion pad',
      paceDescription: t('Heavy reverberating gait cushioned by thick subcutaneous shock-absorbing heel pads', 'Marche lourde mais silencieuse amortie par un coussinet plantaire élastique', 'مشية ثقيلة مهيبة تهتز لها الأرض وتمتص صدماتها وسائد دهنية في أسفل القدم'),
      soundOrSignal: t('Low infrasound rumble vibrating through ground and trumpet trumpeting', 'Barrissement puissant et grondements infrasonores telluriques', 'نهيم وانفجار صوتي بوقي مهيب وترددات تحت سمعية ترتجف لها الصحراء'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Demonstrates that even wild animals recognize the sanctity of Allah’s signs and refuse to obey tyrant commands against the divine covenant.',
        'Prouve que la création reconnaît la sacralité d’Allah et refuse d’obéir aux tyrans dans la profanation des sanctuaires.',
        'دلالة على أن المخلوقات بفطرتها تعظم شعائر الله وحرماته، وأن القوة المادية العاتية تتلاشى أمام قدرة الجبار سبحانه.'
      ),
      sunnahGuidance: t(
        'The Prophet ﷺ recalled the restraint of the Elephant at Hudaibiyah to teach restraint, diplomacy, and honoring peace treaties.',
        'Rappel prophétique du miracle lors du traité d’Al-Houdaybiya pour privilégier la paix et la retenue.',
        'استشهد النبي ﷺ بحبس الفيل يوم الحديبية دلالة على الحكمة والسكينة وتعظيم حرمات مكة.'
      ),
      scientificEcological: t(
        'Mega-herbivore keystone species clearing overgrown brush, digging subterranean water wells used by other fauna, and dispersing tree seeds over tens of miles.',
        'Espèce clé de voûte façonnant les paysages, creusant des puits d’eau pour toute la faune et dispersant les graines d’arbres séculaires.',
        'مهندس النظام البيئي؛ يفتح مسارات الغابات، ويحفر آبار المياه الجوفية التي تستفيد منها سائر كائنات البرية.'
      ),
      practicalBenefits: t(
        'Vital role in ecological balance, historical heavy conveyance, and symbol of raw power tempered by divine obedience.',
        'Élément majeur de biodiversité mondiale et symbole de force soumise au Créateur.',
        'تجديد الغطاء النباتي وإحياء التنوع الحيوي الصحراوي والإفريقي.'
      ),
    },
  },
  {
    id: 'nahl',
    name: t('The Honeybee', 'L’Abeille', 'النحل'),
    scientificName: 'Apis mellifera',
    arabicCalligraphy: 'وَأَوْحَى رَبُّكَ إِلَى النَّحْلِ أَنِ اتَّخِذِي مِنَ الْجِبَالِ بُيُوتًا',
    category: 'insects',
    source: 'quran_and_sunnah',
    quranRefs: ['16:68-69'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5680',
        text: t(
          'Healing is in three things: a gulp of honey, the cupping incision, and cauterization with fire, but I forbid my Ummah from cauterization.',
          'La guérison repose sur trois choses : la gorgée de miel, l’incision de la ventouse et la cautérisation par le feu, mais j’interdis la cautérisation à ma communauté.',
          'الشِّفَاءُ فِي ثَلاَثَةٍ: شَرْبَةِ عَسَلٍ، وَشَرْطَةِ مِحْجَمٍ، وَكَيَّةِ نَارٍ، وَأَنْهَى أُمَّتِي عَنِ الْكَيِّ.'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The divinely inspired pollinator honored with an entire Quranic Surah (An-Nahl), constructing hexagonal architectural wonders and producing multi-colored honey carrying profound healing for humanity.',
      'L’insecte sublime honoré d’une sourate entière, guidé par inspiration divine pour bâtir des ruches hexagonales et produire un miel guérisseur.',
      'الحشرة المباركة التي أوحى الله إليها إلهاماً وفطرة، وسماها باسم سورة كاملة، تبني صروحاً سداسية هندسية وتخرج من بطونها شراباً مختلفاً ألوانه فيه شفاء للناس.'
    ),
    whatTheyDid: t(
      'Allah singled out the female worker bee with divine inspiration (Wahy al-Ilham): "Take for yourself dwellings in the mountains, in trees, and in what they construct; then eat from all fruits and follow the ways of your Lord made smooth." The worker bees fly kilometers to gather nectar and pollen, navigate using solar polarization, construct mathematically optimal hexagonal combs requiring the least beeswax for maximum volume, and synthesize honey from specialized digestive glands, producing food that never spoils.',
      'Dieu a inspiré à l’abeille femelle : « Établis des demeures dans les montagnes, les arbres et les treillages; puis butine de tous les fruits et suis docilement les chemins de ton Seigneur. » Les abeilles ouvrières communiquent par leur danse frétillante, bâtissent des alvéoles hexagonales parfaites et régurgitent un nectar transformé en miel pur aux vertus antibactériennes universelles.',
      'خاطب الله النحلة بصيغة التأنيث الإعجازية (حيث النحلات العاملات إناث): ﴿وَأَوْحَى رَبُّكَ إِلَى النَّحْلِ أَنِ اتَّخِذِي مِنَ الْجِبَالِ بُيُوتًا وَمِنَ الشَّجَرِ وَمِمَّا يَعْرِشُونَ * ثُمَّ كُلِي مِنْ كُلِّ الثَّمَرَاتِ فَاسْلُكِي سُبُلَ رَبِّكِ ذُلُلًا يَخْرُجُ مِنْ بُطُونِهَا شَرَابٌ مُخْتَلِفٌ أَلْوَانُهُ فِيهِ شِفَاءٌ لِلنَّاسِ﴾. فتسير النحلة على دروب دقيقة وتصنع الخلايا السداسية التي أثبتت الرياضيات أنها أفضل شكل هندسي يوفر الشمع ويحمل أكبر وزن.'
    ),
    physicalTraits: {
      size: t('12–15 mm worker length, 20 mm queen', '12–15 mm ouvrière, 20 mm reine', 'طول العاملة 12-15 مم، والملكة نحو 20 مم'),
      habitat: t('Mountain cliffs, hollow trunks, human apiaries', 'Falaises rocheuses, troncs creux et ruches', 'صدوع الجبال، تجاويف الأشجار، وخلايا النحالين'),
      uniqueFeature: t('Compound eyes sensitive to polarized UV light; pollen baskets; 200 wingbeats/sec', 'Yeux à facettes détectant les ultraviolets et corbeilles à pollen', 'عيون مركبة ترى الضوء فوق البنفسجي، وسلال لحمل حبوب اللقاح، و230 خفقة جناح بالثانية'),
    },
    motion: {
      animationType: 'hover',
      strideLength: 'Rapid oscillating flight with figure-eight wing pattern',
      paceDescription: t('Nimble aerial hover and dynamic waggle communication dance', 'Vol stationnaire ultra-précis et danse en huit codée', 'طيران مروحي دقيق متوازن ورقصة اهتزازية ترشد الخلية لاتجاه الزهور بدقة'),
      soundOrSignal: t('Warm rhythmic buzzing vibration at 200–250 Hz', 'Bourdonnement doux et continu à 250 Hz', 'طنين متناغم دافئ بتردد 200 إلى 250 هرتز يبعث على الراحة'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Metaphor for the true believer: eats only pure things, produces only beneficial goodness, and alights upon fragile blossoms without breaking them.',
        'La parabole du croyant : ne consomme que le pur, ne produit que le bien et se pose sur la fleur sans la flétrir ni la briser.',
        'شبه النبي ﷺ المؤمن بالنحلة: لا تأكل إلا طيباً، ولا تضع إلا طيباً، وإذا سقطت على عود نخر لم تكسره.'
      ),
      sunnahGuidance: t(
        'The Prophet ﷺ prohibited killing the honeybee and praised honey as one of the twin master remedies (along with the Qur’an).',
        'Le Prophète ﷺ a interdit de tuer l’abeille et a qualifié le miel et le Coran de « deux grands guérisseurs ».',
        'نهى النبي ﷺ عن قتل النحلة وأوصى بالاستشفاء بالعسل مبيناً أنه شفاء من كل داء.'
      ),
      scientificEcological: t(
        'Pollinates 75% of global flowering plants and food crops; produces royal jelly, propolis, and beeswax with potent antimicrobial peptides.',
        'Pollinisateur majeur assurant la reproduction de 75% des plantes à fleurs du globe terrestre.',
        'تلقيح أكثر من ثلاثة أرباع المحاصيل الغذائية على وجه الأرض، وإفراز صمغ النحل (البروبوليس) والغذاء الملكي.'
      ),
      practicalBenefits: t(
        'Honey provides enzymatic hydrogen peroxide, flavonoids, anti-burn healing, prebiotics, and natural athletic glycogen recovery.',
        'Le miel offre des enzymes régénératrices, des flavonoïdes anti-inflammatoires et un puissant cicatrisant.',
        'العسل شفاء معقم للجروح والحروق، ومضاد حيوي واسع المدى، ومعزز لمناعة الجهاز التنفسي والهضمي.'
      ),
    },
  },
  {
    id: 'dhib_yusuf',
    name: t('The Wolf of Yusuf & The Speaking Wolf', 'Le Loup de Joseph & Le Loup Parlant', 'ذئب يوسف والذئب المتكلم'),
    scientificName: 'Canis lupus arabs (Arabian Desert Wolf)',
    arabicCalligraphy: 'وَتَرَكْنَا يُوسُفَ عِندَ مَتَاعِنَا فَأَكَلَهُ الذِّئْبُ',
    category: 'mammals',
    source: 'quran_and_sunnah',
    quranRefs: ['12:13', '12:14', '12:17'],
    hadithRefs: [
      {
        book: 'Tirmidhi',
        number: '2181',
        text: t(
          'A wolf seized a sheep, so the shepherd chased it and retrieved the sheep. The wolf sat upon its tail and spoke: "Do you take from me sustenance that Allah provided me?" The shepherd said: "How astonishing, a speaking wolf!" The wolf said: "Shall I tell you of something more astonishing? A Prophet in Yathrib telling people of past news!" The shepherd came to the Prophet ﷺ and embraced Islam.',
          'Un loup ravit une brebis qu’un berger lui reprit. Le loup s’assit et parla : « Me prives-tu d’une subsistance qu’Allah m’a accordée ? » Le berger s’écria : « Un loup qui parle ! » Le loup lui dit : « T’informerai-je d’un prodige plus grand ? Un Prophète à Yathrib vous annonce les récits du passé ! »',
          'عَدَا الذِّئْبُ عَلَى شَاةٍ فَأَخَذَهَا، فَطَلَبَهُ الرَّاعِي حَتَّى انْتَزَعَهَا مِنْهُ، فَقَعَدَ الذِّئْبُ عَلَى ذَنَبِهِ فَقَالَ: «أَلَا تَتَّقِي اللَّهَ، تَنْزِعُ مِنِّي رِزْقًا سَاقَهُ اللَّهُ إِلَيَّ؟» فَقَالَ الرَّاعِي: «يَا عَجَبِي! ذِئْبٌ مُقْعٍ عَلَى ذَنَبِهِ يُكَلِّمُنِي كَلَامَ الإِنْسِ!» فَقَالَ الذِّئْبُ: «أَلَا أُخْبِرُكَ بِأَعْجَبَ مِنْ ذَلِكَ؟ رَسُولُ اللَّهِ ﷺ بَيْنَ الحَرَّتَيْنِ يُخْبِرُ النَّاسَ بِأَنْبَاءِ مَا قَدْ سَبَقَ!» فَأَتَى الرَّاعِي النَّبِيَّ ﷺ فَأَسْلَمَ.'
        ),
      },
    ],
    relatedProphets: ['yusuf', 'yaqub', 'muhammad'],
    summary: t(
      'The desert predator falsely accused by Yusuf’s brothers of devouring him; in the Sunnah, an authentic wolf spoke in clear human tongue testifying to the prophethood of Muhammad ﷺ.',
      'Le loup du désert faussement accusé par les frères de Joseph; dans la Sunnah, un loup s’assit et s’exprima en langage humain pour attester du message prophétique.',
      'الذئب البري الذي لفق له إخوة يوسف تهمة أكله، وهو بريء من دمه، وفي السنة النبوية تكلم ذئب بلسان عربي فصيح مخاطباً الراعي بالشهادة لنبوة محمد ﷺ.'
    ),
    whatTheyDid: t(
      'Yusuf’s brothers plotted against him out of jealousy, cast him into the dark depths of the desert cistern, stained his tunic with false sheep’s blood, and wept before their father Yaqub saying: "O our father, we went racing and left Yusuf with our possessions, and the wolf ate him." Yaqub saw through their deception and declared: "Rather, your souls have enticed you to something, so patience is most fitting." Centuries later in the outskirts of Madinah, a wolf sat upon its tail and addressed a shepherd in plain Arabic, directing him to the final Messenger of Allah in Yathrib.',
      'Les frères jaloux de Joseph le jetèrent dans un puits, souillèrent sa tunique d’un faux sang et dirent à leur père Jacob : « Nous faisions la course et avons laissé Joseph près de nos affaires, et le loup l’a dévoré. » Jacob comprit leur mensonge : « Vos âmes vous ont plutôt suggéré un méfait; belle patience donc ! » Plus tard, aux portes de Médine, un loup parla à un berger pour lui révéler la venue du Prophète ﷺ.',
      'تآمر إخوة يوسف عليه فألقوه في غيابت الجب وجاؤوا أباهم عشاءً يبكون وجاؤوا على قميصه بدم كذب وقالوا: ﴿إِنَّا ذَهَبْنَا نَسْتَبِقُ وَتَرَكْنَا يُوسُفَ عِنْدَ مَتَاعِنَا فَأَكَلَهُ الذِّئْبُ﴾. فعلم يعقوب براءته وقال بل سولت لكم أنفسكم أمراً فصبر جميل. وفي العهد النبوي، نطق الذئب بشهادة التوحيد والنبوة في معجزة باهرة شهدها الصحابة الكرام.'
    ),
    physicalTraits: {
      size: t('Slim desert build, 65–70 cm shoulder height, 18–25 kg', 'Silhouette élancée adaptée au désert, 20 kg', 'بنية صحراوية رشيقة ونحيفة تناسب بيئة الرمال والصخور'),
      habitat: t('Arid plateaus, limestone wadis of Canaan and Hijaz', 'Plateaux arides et oueds de Canaan et du Hedjaz', 'أودية كنعان وهضاب الحجاز الصخرية'),
      uniqueFeature: t('Tawny-grey camouflage fur; piercing amber nocturnal eyes', 'Pelage sable camouflé et yeux d’ambre perçants', 'فراء ترابي يندمج مع الرمال، وعيون عسلية خارقة الرؤية ليلاً'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Silent stealth trot pacing tens of miles',
      paceDescription: t('Enduring desert trot covering vast territory effortlessly', 'Trot économique et furtif couvrant des dizaines de kilomètres', 'خبب صحراوي متزن طويل النفس يقطع به مسافات شاسعة بصمت'),
      soundOrSignal: t('Haunting low nocturnal pack howl across desert canyons', 'Hurlement nocturne résonnant dans les défilés', 'عواء عميق شجي يتردد صداه في سكون الصحراء ليلاً'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Illustrates the innocence of the falsely accused and reminds believers that false pretexts are easily exposed by divine wisdom.',
        'Illustre l’innocence des accusés à tort et rappelle que les faux prétextes s’effondrent devant la vérité divine.',
        'براءة المظلوم وظهور الحق؛ وأن الكذب لا يثبت أمام نور الحقيقة مهما لُفقت له الأدلة المزورة كدم القميص.'
      ),
      sunnahGuidance: t(
        'The speaking wolf incident is an authentic miracle (Karamah / Prophetic Sign) recorded in Sahih Sunan testifying to the Prophet’s mission.',
        'Le miracle du loup doué de parole constitue un signe éclatant de la véracité prophétique.',
        'معجزة نطق الحيوان بالشهادة للرسول ﷺ وصدق نبوته وإخباره بالغيب.'
      ),
      scientificEcological: t(
        'Apex carnivore preventing deer and rodent overpopulation, preventing overgrazing of desert saplings and preserving fragile flora.',
        'Prédateur régulateur empêchant le surpâturage des rongeurs et protégeant les jeunes pousses du désert.',
        'حماية التوازن البيئي من خلال الحد من تكاثر القوارض والحيوانات التي تجور على المراعي الصحراوية.'
      ),
      practicalBenefits: t(
        'Ecological keystone maintaining wild herd health by removing weak and diseased individuals.',
        'Maintien de la vitalité génétique des hardes sauvages.',
        'تطهير البيئة الفطرية باصطياد الحيوانات المريضة والهرمة ومنع انتشار الأوبئة بين قطعان البرية.'
      ),
    },
  },
  {
    id: 'ghurab',
    name: t('The Raven / Crow', 'Le Corbeau', 'الغراب (معلم قابيل)'),
    scientificName: 'Corvus corax / Corvus corone',
    arabicCalligraphy: 'فَبَعَثَ اللَّهُ غُرَابًا يَبْحَثُ فِي الْأَرْضِ لِيُرِيَهُ كَيْفَ يُوَارِي سَوْءَةَ أَخِيهِ',
    category: 'birds',
    source: 'quran',
    quranRefs: ['5:31'],
    hadithRefs: [],
    relatedProphets: ['adam'],
    summary: t(
      'The intelligent black raven dispatched by Allah to scratch the soil and teach Qabil (Cain) how to bury and honor the body of his murdered brother Habil (Abel).',
      'Le corbeau sagace envoyé par Allah pour creuser la terre et enseigner à Caïn comment inhumer le corps d’Abel.',
      'الغراب الحكيم الذي بعثه الله ليعلم قابيل كيف يحفر الأرض ويواري جثمان أخيه هابيل، فكان أول معلم للبشرية في دفن الموتى وإكرام الجسد الإنساني.'
    ),
    whatTheyDid: t(
      'After Qabil murdered his pious brother Habil in the first murder of human history, he wandered tormented and bewildered, not knowing what to do with his brother’s lifeless corpse. Allah sent a raven that began excavating the earth with its beak and talons to bury another deceased raven. Witnessing this instinctive instruction, Qabil cried out in deep remorse: "Woe to me! Have I failed to be like this raven and conceal the body of my brother?" And he became of the regretful, learning human burial from a bird.',
      'Après avoir tué son frère pieux Abel, Caïn resta désemparé, portant le corps sans savoir comment l’ensevelir. Allah dépêcha alors un corbeau qui se mit à creuser le sol avec son bec et ses serres pour y enfouir la dépouille d’un congénère. Témoin de cette leçon instinctive, Caïn s’écria de remords : « Malheur à moi ! Suis-je incapable d’être comme ce corbeau pour ensevelir mon frère ? » et il fut envahi de regrets.',
      'لما قتل قابيل أخاه هابيل ظل حائراً حزيناً يحمل جثمانه لا يدري ما يصنع به، فبعث الله غرابين فاقتتلا فقتل أحدهما الآخر، ثم حفر الغراب الحي بمنقاره ومخالبه في التراب حتى أحدث حفرة ثم وقى جثة صاحبه بالتراب. فرأى قابيل ذلك فصاح نادماً: ﴿يَا وَيْلَتَا أَعَجَزْتُ أَنْ أَكُونَ مِثْلَ هَذَا الْغُرَابِ فَأُوَارِيَ سَوْءَةَ أَخِي فَأَصْبَحَ مِنَ النَّادِمِينَ﴾، فتعلمت الإنسانية دفن الموتى.'
    ),
    physicalTraits: {
      size: t('55–65 cm length, 115–130 cm wingspan', '60 cm de long, 120 cm d’envergure', 'طوله 55-65 سم، وامتداد جناحيه نحو 120 سم'),
      habitat: t('Rocky highlands, desert oases, temperate forests', 'Falaises rocheuses et plateaux arides', 'الجبال الصخرية والسهوب المفتوحة وضفاف الأودية'),
      uniqueFeature: t('Glossy jet-black plumage with iridescent blue/violet sheen; massive stout bill', 'Plumage noir corbeau aux reflets métalliques violacés et bec robuste', 'ريش أسود فاحم ببريق بنفسجي، ومنقار قوي صلب للتنقيب والحفر'),
    },
    motion: {
      animationType: 'fly',
      strideLength: 'Soaring glide punctuated by deep wingbeats and grounded digging hops',
      paceDescription: t('Majestic thermals soaring interspersed with deliberate ground hopping', 'Vol plané imposant et sauts au sol précis pour creuser la terre', 'تحليق انسيابي شاهق وقفزات أرضية مدروسة للحفر والتنقيب'),
      soundOrSignal: t('Deep guttural "croak-croak" echo carrying across miles', 'Croassement rauque et puissant résonnant au loin', 'نعيق جهوري عميق يتردد صداه عبر الأودية والجبال'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Teaches humanity the sacred dignity of burying the dead (Takreem al-Mayyit) and reveals how arrogance blinds man while instinctive creatures obey natural order.',
        'Consacre la sacralité de l’inhumation humaine et rappelle que l’orgueil aveugle l’homme là où l’animal suit la sagesse naturelle.',
        'تقرير حرمة جسد الميت ووجوب مواراته إكراماً للإنسان، وأن الكبر يعمي البصيرة حتى يحتاج الإنسان إلى طائر ليعلمه.'
      ),
      sunnahGuidance: t(
        'Islamic jurisprudence established burial in earth as obligatory practice based on this Quranic foundation.',
        'La jurisprudence musulmane a codifié l’obligation de l’inhumation d’après cette référence coranique fondamentale.',
        'تأصيل شريعة دفن الموتى في التراب وتكريم الجنائز في الإسلام.'
      ),
      scientificEcological: t(
        'Corvids possess the highest encephalization quotient among birds, equivalent to chimpanzees; solve multi-stage puzzle tasks and teach social mourning behaviors.',
        'Les corvidés possèdent une intelligence égale aux grands primates : usage d’outils, mémoire faciale et rites de deuil collectifs.',
        'الإعجاز العلمي في ذكاء الغراب؛ حيث أثبتت الدراسات أنه يمتلك أعلى نسبة ذكاء بين الطيور، ويستخدم الأدوات، ويواري موتاه.'
      ),
      practicalBenefits: t(
        'Natural ecosystem undertaker removing carrion swiftly and recycling organic matter to prevent disease outbreaks.',
        'Éboueur naturel éliminant les carcasses et enrayant les zoonoses.',
        'تنظيف البيئة من الجيف والقضاء على مسببات الأوبئة والأمراض البيئية.'
      ),
    },
  },
  {
    id: 'ankabut',
    name: t('The Spider', 'L’Araignée', 'العنكبوت'),
    scientificName: 'Araneae (Neoscona / Latrodectus)',
    arabicCalligraphy: 'مَثَلُ الَّذِينَ اتَّخَذُوا مِن دُونِ اللَّهِ أَوْلِيَاءَ كَمَثَلِ الْعَنكَبُوتِ اتَّخَذَتْ بَيْتًا',
    category: 'insects',
    source: 'quran_and_sunnah',
    quranRefs: ['29:41'],
    hadithRefs: [
      {
        book: 'Ahmad',
        number: '3251',
        text: t(
          'During the Hijrah, the Prophet ﷺ and Abu Bakr took refuge in the Cave of Thawr; Allah commanded a spider to spin its web across the cave entrance, confounding the search party of Quraysh.',
          'Durant l’Hégire, le Prophète ﷺ et Abou Bakr s’abritèrent dans la grotte de Thawr; Allah commanda à l’araignée de tisser sa toile à l’entrée, déroutant les poursuivants de Quraych.',
          'لَمَّا دَخَلَ النَّبِيُّ ﷺ وَأَبُو بَكْرٍ غَارَ ثَوْرٍ، بَعَثَ اللَّهُ الْعَنكَبُوتَ فَنَسَجَتْ عَلَى بَابِ الْغَارِ سِتْرًا، فَلَمَّا وَقَفَ مُشْرِكُو قُرَيْشٍ قَالُوا: مَا دَخَلَ هُنَا أَحَدٌ!'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The arachnid architect honored with Surah Al-Ankabut, weaving geometrically intricate webs whose fragility illustrates false idols; in the Hijrah, its gossamer web shielded the Prophet ﷺ in the Cave of Thawr.',
      'La tisseuse émérite honorée d’une sourate, dont la toile fragile symbolise l’illusion des idoles et qui protégea le Prophète ﷺ à la grotte de Thawr.',
      'الحشرة الناسجة التي ضرب الله ببيتها مثلاً في سورة العنكبوت لبيان وهن الشرك، والتي نسجت خيوطها بأمر الله على فم غار ثور حماية لرسول الله ﷺ وصاحبه أبي بكر.'
    ),
    whatTheyDid: t(
      'Allah struck a profound parable: "The example of those who take protectors other than Allah is like that of the spider who builds a house; and indeed, the frailest of houses is the house of the spider, if they only knew." The Quran specifies "built [fem.] a house" matching modern biology which discovered that female spiders exclusively spin webs. During the perilous night of the Hijrah, Quraysh trackers climbed Mount Thawr seeking the Prophet ﷺ. Arriving at the cave mouth, they saw a fresh, intact spider’s web glistening across the aperture and concluded no human could have entered without breaking it, turning back in frustration.',
      'Dieu a formulé une parabole saisissante : « L’exemple de ceux qui prennent des protecteurs en dehors d’Allah est tel celui de l’araignée qui s’est donné une demeure; et certes, la plus fragile des demeures est bien celle de l’araignée. » Le verbe au féminin concorde avec la découverte que seules les femelles tissent ces toiles. Lors de l’Hégire, une toile tissée devant la grotte de Thawr fit rebrousser chemin aux traqueurs mecquois.',
      'ضرب الله بها مثلاً للمشركين الذين يعتمدون على غير الله: ﴿مَثَلُ الَّذِينَ اتَّخَذُوا مِنْ دُونِ اللَّهِ أَوْلِيَاءَ كَمَثَلِ الْعَنْكَبُوتِ اتَّخَذَتْ بَيْتًا وَإِنَّ أَوْهَنَ الْبُيُوتِ لَبَيْتُ الْعَنْكَبُوتِ لَوْ كَانُوا يَعْلَمُونَ﴾، وجاء التعبير بالفعل المؤنث ﴿اتَّخَذَتْ﴾ لأن أنثى العنكبوت هي التي تنسج البيت وتقتل ذكره بعد التلقيح. كما كانت خيوطها أرق جند حَمَى النبي ﷺ في الغار وصرف عنه أعين الكفار.'
    ),
    physicalTraits: {
      size: t('5–30 mm body length, orb web up to 1 meter wide', '5–30 mm, toile circulaire jusqu’à 1 m', 'طول جسمها 5-30 مم، وباع شبكتها يتجاوز متراً كاملاً'),
      habitat: t('Cave crevices, stone walls, vegetation, rock shelters', 'Parois rocheuses, crevasses de grottes et arbustes', 'شروخ الصخور، مداخل الكهوف، والأغصان النامية'),
      uniqueFeature: t('Spinneret glands synthesizing liquid protein that solidifies into silk stronger than steel', 'Filières filant une soie liquide se solidifiant en fils plus résistants que l’acier', 'غدد حريرية تفرز بروتيناً سائلاً يتحول إلى خيوط أقوى من الفولاذ وأكثر مرونة'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Precise 8-legged radial web traverse without sticking',
      paceDescription: t('Delicate non-stick walking along non-adhesive radial silk strands', 'Marche millimétrée évitant les spirales adhésives de son propre piège', 'حركة محكمة دقيقة على الخيوط الشعاعية غير اللاصقة بمهارة متناهية'),
      soundOrSignal: t('Micro-vibrations across web detecting struggling prey', 'Transmission vibratoire soyeuse captant les micro-oscillations', 'استشعار الاهتزازات الترددية الدقيقة عبر شبكة الخيوط'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Teaches that relying on created beings instead of the Creator is as fragile as a cobweb; proves that the smallest fragile means can achieve divine victory.',
        'Révèle la précarité de l’associationnisme et montre que les moyens les plus infimes triomphent des plus grands complots sous la garde divine.',
        'بيان وهن الشرك وعجز الآلهة الباطلة، وأن جند الله أضعف من خيط العنكبوت ولكنها تصنع المعجزات بتأييد الله.'
      ),
      sunnahGuidance: t(
        'The Sunnah honors the spider’s web as a peaceful protective veil during the critical hour of the Islamic mission.',
        'La tradition honore le rôle salvateur de la toile de Thawr dans l’épopée de l’Hégire.',
        'تقدير دور جند الله الصغار في نصرة النبي ﷺ وحماية دعوة الإسلام.'
      ),
      scientificEcological: t(
        'Spider silk possesses tensile strength of 1.3 GPa (comparable to high-grade steel alloy) with triple elasticity; primary controller of mosquito and insect populations.',
        'La soie d’araignée égale la résistance des meilleurs aciers avec une élasticité triple; consomme des milliards d’insectes nuisibles.',
        'الإعجاز الحيوي في خيوط العنكبوت الفائقة القوة والمرونة، ودورها في افتراس مليارات الحشرات الضارة والبعوض سنوياً.'
      ),
      practicalBenefits: t(
        'Biomimetic research for biodegradable surgical sutures, ultra-light armor cables, and ecological mosquito suppression.',
        'Applications biomimétiques : fils chirurgicaux biodégradables et textiles haute résistance.',
        'أبحاث الخيوط الجراحية القابلة للتحلل، وصناعة السترات الخفيفة الفائقة القوة.'
      ),
    },
  },
  {
    id: 'khayl_adiyat',
    name: t('The Charging Steeds & War Horses', 'Les Coursiers & Chevaux de Bataille', 'الخيل والعاديات والجياد'),
    scientificName: 'Equus caballus (Arabian Purebred)',
    arabicCalligraphy: 'وَالْعَادِيَاتِ ضَبْحًا * فَالْمُورِيَاتِ قَدْحًا',
    category: 'mammals',
    source: 'quran_and_sunnah',
    quranRefs: ['100:1-5', '38:31-33', '16:8', '8:60', '3:14'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '2849',
        text: t(
          'Goodness is tied to the forelocks of horses until the Day of Resurrection: reward and spoils.',
          'Le bien reste attaché au toupet des chevaux jusqu’au Jour de la Résurrection : la rétribution et le butin.',
          'الْخَيْلُ مَعْقُودٌ فِي نَوَاصِيهَا الخَيْرُ إِلَى يَوْمِ القِيَامَةِ: الأَجْرُ وَالمَغْنَمُ.'
        ),
      },
    ],
    relatedProphets: ['sulayman', 'muhammad'],
    summary: t(
      'The noble steeds honored with divine oaths in Surah Al-Adiyat, panting in dawn charges and striking fire with their hooves; beloved to Sulayman and blessed in the Sunnah until the End of Time.',
      'Les coursiers d’élite chantés dans la sourate Al-Adiyat, jaillissant à l’aube et faisant jaillir des étincelles sous leurs sabots, bénis jusqu’à la fin des temps.',
      'الخيل العربية الأصيلة التي أقسم الله بها في سورة العاديات: تضبح أنفاسها في الكرّ، وتقدح بحوافرها الشرر، والتي شغف بها سليمان حباً في سبيل ربه، وعقد النبي ﷺ الخير في نواصيها إلى يوم القيامة.'
    ),
    whatTheyDid: t(
      'Allah swore by the charging war horses: "By the racers panting, and the producers of sparks striking, and the chargers at dawn, stirring up thereby clouds of dust, penetrating into the center of the gathering." Prophet Sulayman inspected his parade of noble pedigree steeds (As-Safinat al-Jiyad) standing poised on three legs with the toe of the fourth tipped, praising their beauty and dedicating them for defending the faith. In the Sunnah, the horse is celebrated for courage, loyalty, and companionship in defending justice.',
      'Allah jura par la fougue des coursiers : « Par les coursiers haletants, qui font jaillir des étincelles, qui attaquent au matin, soulevant un nuage de poussière, et fendent le centre de l’ennemi ! » Salomon passa en revue ses purs-sangs d’exception (As-Safinat al-Jiyad) dressés sur trois membres et caressa leurs crinières en hommage à leur noblesse.',
      'أقسم الله بالخيل العادية في سبيله قسماً يخلع القلوب: ﴿وَالْعَادِيَاتِ ضَبْحًا * فَالْمُورِيَاتِ قَدْحًا * فَالْمُغِيرَاتِ صُبْحًا * فَأَثَرْنَ بِهِ نَقْعًا * فَوَسَطْنَ بِهِ جَمْعًا﴾. وعرضت على سليمان عليه السلام الخيل الصافنات الجياد العظيمة الحُسن، فمسح على أعناقها وسوقها تكرماً وحباً للجهاد في سبيل الله، وجعلها النبي ﷺ علامة العزة والرباط.'
    ),
    physicalTraits: {
      size: t('145–155 cm wither height, 400–500 kg', '1,50 m au garrot, 450 kg', 'ارتفاعها نحو 150 سم، ووزنها من 400 إلى 500 كجم'),
      habitat: t('Arabian desert pastures, steppes, open plains', 'Déserts arabiques et vastes plaines steppiques', 'السهول والصحارى العربية والمروج المفتوحة'),
      uniqueFeature: t('High-set arched tail carriage, dished facial profile, deep lung capacity', 'Port de queue en panache, profil concave raffiné et souffle puissant', 'رأس مقعر منحوت، رقبة مقوسة، ذيل مرفوع كالشعلة، وسعة رئوية خارقة'),
    },
    motion: {
      animationType: 'gallop',
      strideLength: 'Thundering 4-beat gallop with spark-striking hoof strike',
      paceDescription: t('Explosive 4-beat full gallop reaching 60 km/h with sparks flying from stony hooves', 'Galop à quatre temps foudroyant faisant jaillir le feu des silex', 'عدو سريع رباعي الضربات يبلغ 60 كم/ساعة تقدح حوافره الشرر في الصخور'),
      soundOrSignal: t('Deep rhythmic "Dabh" breath sound of exertion and piercing neigh', 'Dabh (souffle haletant héroïque) et hennissement perçant', 'الضبح: صوت أنفاسها الشجاعة عند العدو الشديد والصلصلة المهيبة'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Embodies loyalty, courage in the face of danger, and devotion to duty; symbol of power consecrated entirely for righteous causes.',
        'Incarne le courage indomptable, la fidélité héroïque et le dévouement désintéressé pour la justice.',
        'رمز الشهامة والعزة والوفاء؛ وبذل القوة في نصرة الحق، وعقد الخير في نواصيها ثواباً وبطولة.'
      ),
      sunnahGuidance: t(
        'The Prophet ﷺ encouraged horseback riding and archery, stating that feeding and caring for a horse in Allah’s path weighs heavy on the scales on Judgment Day.',
        'Le Prophète ﷺ a encouragé l’équitation et a promis une récompense pour chaque grain d’avoine offert à un cheval.',
        'حث النبي ﷺ على ركوب الخيل وإكرامها، وجعل روثها وبولها وأجر علفها حسنات في ميزان صاحبها يوم القيامة.'
      ),
      scientificEcological: t(
        'Large splenic reservoir releasing stored red blood cells during exertion, boosting oxygen-carrying hematocrit by 50% without fatigue.',
        'Réservoir splénique unique libérant instantanément des globules rouges lors de l’effort pour une endurance aérobie maximale.',
        'الإعجاز الفسيولوجي في طحال الحصان الذي يضخ مليارات كرات الدم الحمراء عند العدو لرفع طاقة الأكسجين تلقائياً.'
      ),
      practicalBenefits: t(
        'Therapeutic equine therapy (hippotherapy) for motor and sensory neurological rehab; supreme agility and transport in rough terrain.',
        'Hippothérapie rééducative neuro-motrice, sport d’élite et déplacement tout-terrain.',
        'العلاج بركوب الخيل لتأهيل الأعصاب والعمود الفقري، وركوب العزة والتريض البدني المتكامل.'
      ),
    },
  },
  {
    id: 'buraq',
    name: t('Al-Buraq (The Celestial Mount)', 'Al-Bourâq (La Monture Céleste)', 'البراق (مركب الإسراء والمعراج)'),
    scientificName: 'Creature of Light (Celestial Trans-Dimensional Mount)',
    arabicCalligraphy: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى',
    category: 'mammals',
    source: 'sunnah',
    quranRefs: ['17:1'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '3207',
        text: t(
          'I was brought Al-Buraq, a white animal, larger than a donkey and smaller than a mule, whose step reaches as far as its sight can see. I mounted it until I arrived at Jerusalem, and tied it to the ring which the Prophets used to tie to.',
          'On m’amena Al-Bourâq, un animal blanc, plus grand qu’un âne et plus petit qu’un mulet, dont chaque foulée atteint l’horizon de son regard. Je le montai jusqu’à Jérusalem et l’attachai à l’anneau où s’attachaient les prophètes.',
          'أُتِيتُ بِالْبُرَاقِ، وَهُوَ دَابَّةٌ أَبْيَضُ طَوِيلٌ، فَوْقَ الحِمَارِ وَدُونَ البَغْلِ، يَضَعُ حَافِرَهُ عِنْدَ مُنْتَهَى طَرْفِهِ، فَرَكِبْتُهُ حَتَّى أَتَيْتُ بَيْتَ المَقْدِسِ، فَرَبَطْتُهُ بِالحَلْقَةِ الَّتِي يَرْبِطُ بِهِ الأَنْبِيَاءُ.'
        ),
      },
      {
        book: 'Muslim',
        number: '164',
        text: t(
          'Jibril accompanied the Prophet ﷺ upon Al-Buraq during the miraculous Night Journey (Isra’) from Makkah to Al-Quds and up into the Seven Heavens.',
          'Gabriel accompagna le Prophète ﷺ sur Al-Bourâq lors du Voyage Nocturne de La Mecque à Jérusalem puis aux Cieux.',
          'صَحِبَ جِبْرِيلُ عَلَيْهِ السَّلَامُ النَّبِيَّ ﷺ عَلَى الْبُرَاقِ فِي لَيْلَةِ الْإِسْرَاءِ وَالْمِعْرَاجِ.'
        ),
      },
    ],
    relatedProphets: ['muhammad', 'ibrahim'],
    summary: t(
      'The luminous, white celestial steed of the Prophets whose stride reaches the furthest horizon of its gaze, carrying the Prophet Muhammad ﷺ across the deserts from Makkah to Jerusalem in a fraction of a night.',
      'La monture céleste immaculée dont chaque foulée atteint l’horizon de sa vue, portant le Prophète ﷺ de La Mecque à Jérusalem en un instant de la nuit.',
      'دابة الإسراء النورانية البيضاء ذات الخطو الإعجازي الذي يقع حافرها عند منتهى بصرها، حملت خير خلق الله ﷺ بصحبة جبريل من المسجد الحرام إلى المسجد الأقصى.'
    ),
    whatTheyDid: t(
      'On the momentous night of Al-Isra’ wal-Mi’raj, Angel Jibril brought Al-Buraq to the Prophet ﷺ at the Ka’bah. The creature shied slightly in awe of the Master of the First and the Last, until Jibril said to it: "Are you shying from Muhammad? None more honored by Allah has ever mounted you!" Al-Buraq sweat in reverent awe. The Prophet mounted it and in seconds it traversed the ancient caravan route, placing each hoof at the ultimate vanishing point of its vision. Upon reaching Bayt al-Maqdis, the Prophet ﷺ tied it to the historic ring at the Western Wall of the sanctuary, where earlier prophets had tied it, before leading all 124,000 prophets in prayer.',
      'Lors de la nuit d’Al-Isra, Gabriel amena Al-Bourâq au Prophète ﷺ près de la Ka’ba. L’animal frémit de majesté, jusqu’à ce que Gabriel lui dise : « Te cabres-tu devant Muhammad ? Nul n’a été plus noble auprès d’Allah à te monter ! » Al-Bourâq transpira de vénération. Le Prophète le monta et franchit la péninsule arabique à la vitesse du regard, avant de l’attacher à l’anneau sacré du mont du Temple.',
      'في ليلة الإسراء والمعراج، أتى جبريل عليه السلام بالبراق إلى النبي ﷺ، فاستصعبت الدابة هيبة وجلالاً، فقال لها جبريل: «أَبِمُحَمَّدٍ تَفْعَلِينَ هَذَا؟ فَمَا رَكِبَكِ أَحَدٌ أَكْرَمُ عَلَى اللَّهِ مِنْهُ!» ففاضت عرقاً خجلاً. فركبها النبي ﷺ وسار بها بسرعة تفوق سرعة الضوء، يضع حافره عند منتهى طرفه، حتى وافى بيت المقدس فربطه بالحلقة التي يربط بها الأنبياء وصلى بهم إماماً.'
    ),
    physicalTraits: {
      size: t('Intermediate scale between a donkey and a mule, glowing white luminosity', 'Taille intermédiaire entre l’âne et le mulet, éclat blanc pur', 'بين الحمار والبغل، أبيض ناصع يشع نوراً وسكينة'),
      habitat: t('Celestial realms; traversed terrestrial space from Makkah to Jerusalem', 'Royaumes célestes; a traversé l’espace terrestre de La Mecque à Jérusalem', 'الملأ الأعلى وعوالم القدس والسماء'),
      uniqueFeature: t('Stride equivalent to the speed of vision; instantaneous trans-spatial travel', 'Foulée atteignant instantanément le point ultime du regard', 'خطوه عند منتهى طرف عينه، وسرعته الإعجازية الخارقة لقوانين الزمان والمكان'),
    },
    motion: {
      animationType: 'gallop',
      strideLength: 'Speed-of-vision horizon jump (instantaneous displacement)',
      paceDescription: t('Supersonic instantaneous spatial translation placing hoof at horizon edge', 'Translation spatiale instantanée à la vitesse de la perception visuelle', 'طيران وانتقال فوري يطوي الأرض طياً عند منتهى البصر'),
      soundOrSignal: t('Silent luminous glide accompanied by celestial serenity', 'Glissement silencieux de lumière pure', 'حركة نورانية صامتة لا صوت لها تخترق آفاق السماء'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Affirms that the physical laws of this universe are submissive servants to Allah’s divine will and that miracles transcend material spacetime.',
        'Prouve la transcendance divine sur les lois physiques du temps et de l’espace au service du sceau des prophètes.',
        'الإيمان بقدرة الله المطلقة التي تفوق قوانين الفيزياء، وتكريم النبي ﷺ بركوب مراكب الأنبياء المقربين.'
      ),
      sunnahGuidance: t(
        'Tying Al-Buraq to the wall ring teaches the fundamental Sunnah principle of "Tying the Camel" (taking practical precautions alongside trusting Allah).',
        'Le fait d’attacher Al-Bourâq enseigne le principe prophétique fondamental de joindre les causes matérielles à la confiance en Dieu.',
        'ربط البراق بالحلقة درس عملي نبوي في الأخذ بالأسباب مع كمال التوكل على مسبب الأسباب.'
      ),
      scientificEcological: t(
        'Parallels modern relativistic physics and quantum teleportation concepts where distance collapses under non-local divine commands.',
        'Fait écho aux concepts de physique quantique et de courbure de l’espace-temps relativiste.',
        'التقاء الإعجاز النبوي مع مفاهيم طي الأبعاد ونسف حواجز الزمكان في الفيزياء الحديثة.'
      ),
      practicalBenefits: t(
        'Symbolizes the eternal bond connecting the Two Holy Sanctuaries: Al-Masjid al-Haram in Makkah and Al-Masjid al-Aqsa in Jerusalem.',
        'Symbole éternel liant le sanctuaire de La Mecque à celui de Jérusalem.',
        'تأكيد الرابطة العقدية والتاريخية الأبدية بين المسجد الحرام والمسجد الأقصى المبارك.'
      ),
    },
  },
  {
    id: 'tayr_ababil',
    name: t('The Ababil Flocks', 'Les Oiseaux Ababil', 'طير أبابيل'),
    scientificName: 'Aves Caelestes (Divine Flocks of Retribution)',
    arabicCalligraphy: 'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ * تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ',
    category: 'birds',
    source: 'quran',
    quranRefs: ['105:3-4'],
    hadithRefs: [],
    relatedProphets: ['muhammad'],
    summary: t(
      'The dense airborne squadrons sent by Allah over Makkah to defend the Ka’bah against the army of the Elephant, pelting the aggressors with clay pellets that reduced them to chewed straw.',
      'Les volées d’oiseaux dépêchées par Allah sur l’armée d’Abrahah, bombardant les envahisseurs de pierres d’argile cuite pour protéger la Ka’ba.',
      'أسراب الطير المتتابعة التي أرسلها الله جنداً من السماء على جيش أبرهة، ترميهم بحجارة من سجيل منضود، فجعلتهم كأوراق الشجر اليابسة الممضوغة.'
    ),
    whatTheyDid: t(
      'When Abrahah’s elephant army refused to turn back from attacking the Ka’bah and the people of Makkah took refuge in the mountain peaks placing trust in Allah, Allah unleashed swarms of birds from the sea in dense, successive squadrons (Ababil). Each bird carried three pebbles of baked clay (Sijjil)—one in its beak and two in its talons. Flying over the armored battalions, they dropped the stones with pinpoint kinetic devastation, piercing shields, armor, and flesh, annihilating the invaders and preserving the sanctuary for the impending advent of the Prophet of Islam.',
      'Quand Abrahah s’obstina à détruire le sanctuaire, des nuées d’oiseaux parvinrent de la mer par vagues successives. Chaque oiseau portait trois cailloux d’argile pétrifiée : un au bec et deux aux serres. Ils lâchèrent leurs projectiles avec une force foudroyante qui traversa armures et montures, réduisant cette armée surpuissante à l’état de paille broyée.',
      'حين احتشد جيش أبرهة واعتصم أهل مكة برؤوس الجبال سائلين رب البيت حماية بيته، أرسل الله طيراً جاءت من قِبل البحر جماعات متتابعة في أثر بعض كالإبل المؤبلة، مع كل طائر ثلاثة أحجار: حجر في منقاره وحجران في رجليه، أمثال الحمص والعدس. فحلقت فوقهم وقذفتهم بها، فما أصاب أحداً منهم حجر إلا نفذ من رأسه وخرق درعه وجسده حتى جعلهم الله كزرع أكلته الدواب وتفتت.'
    ),
    physicalTraits: {
      size: t('Swallow/swift-like swift tactical flight profile, 18–25 cm', 'Profil agile d’hirondelle ou de martinet, 20 cm', 'طير سريعة رشيقة تشبه الخطاطيف أو السنونوات البحرية'),
      habitat: t('Coastal marine skies of the Red Sea converging on Makkah', 'Ciels côtiers de la Mer Rouge convergeant vers La Mecque', 'سماء البحر الأحمر ومشارف مكة والوادي المقدس'),
      uniqueFeature: t('Coordinated aerial squadron formation carrying kinetic Sijjil projectiles', 'Formation militaire aérienne parfaite larguant des projectiles d’argile', 'طيران جماعي منظم مأمور يحمل حجارة السجيل بدقة بالغة'),
    },
    motion: {
      animationType: 'fly',
      strideLength: 'High-speed coordinated dive-bombing vector',
      paceDescription: t('Precision high-speed formation dive release with synchronized bombing', 'Plongeon synchronisé à haute vitesse larguant leurs projectiles', 'انقضاض جوي سريع منسق برمي دقيق متتابع لا يخطئ هدفه'),
      soundOrSignal: t('Rushing aerial wind vortex of synchronized wings', 'Vortex sonore des ailes fendant l’atmosphère', 'حفيف أجنحة كثيفة يملأ الأفق رعباً على المعتدين'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Proves that Allah alone defends His sacred symbols; no terrestrial armor can withstand the simplest aerial creation empowered by divine command.',
        'Démontre que Dieu protège souverainement Ses sanctuaires et que la plus formidable armée s’effondre devant Sa volonté.',
        'يقين المؤمن بأن لله جنود السماوات والأرض، وأن البيت الحرام محفوظ بحفظ الله القاهر فوق عباده.'
      ),
      sunnahGuidance: t(
        'A foundational historical sign (Ayah) paving the way for the Prophet’s mission in the very year of his birth.',
        'Événement fondateur préparant l’avènement de la mission prophétique à La Mecque.',
        'إرهاصات النبوة الكبرى التي مهدت لبعثة النبي ﷺ في قلب مكة المعظمة.'
      ),
      scientificEcological: t(
        'Demonstrates bird aerodynamic ballistics and kinetic velocity transfer in avian physics.',
        'Balistique physique et transfert d’énergie cinétique en aérodynamique aviaire.',
        'الإعجاز الفيزيائي في السرعة الحدية وسقوط المقذوفات الدقيقة وتأثيرها الميكانيكي الخارق.'
      ),
      practicalBenefits: t(
        'Saved the central spiritual cradle of monotheism from desecration for all subsequent generations of humanity.',
        'Préservation historique de la Ka’ba pour l’humanité entière.',
        'صيانة مركز التوحيد العالمي والكعبة المشرفة لتظل قبلة المسلمين إلى قيام الساعة.'
      ),
    },
  },
  {
    id: 'qittah',
    name: t('The Cat in the Sunnah', 'Le Chat dans la Sunnah', 'الهرة والقط في السنة النبوية'),
    scientificName: 'Felis catus',
    arabicCalligraphy: 'إِنَّهَا لَيْسَتْ بِنَجَسٍ، إِنَّهَا مِنَ الطَّوَّافِينَ عَلَيْكُمْ',
    category: 'mammals',
    source: 'sunnah',
    quranRefs: [],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '3318',
        text: t(
          'A woman was punished on account of a cat which she confined until it died of hunger. She entered the Fire because of it: she neither fed it nor gave it water while confining it, nor did she let it free to eat from the creatures of the earth.',
          'Une femme fut châtiée en Enfer à cause d’une chatte qu’elle avait enfermée jusqu’à ce qu’elle meure de faim. Elle ne l’avait ni nourrie ni abreuvée, ni laissée libre de manger les bestioles de la terre.',
          'عُذِّبَتِ امْرَأَةٌ فِي هِرَّةٍ سَجَنَتْهَا حَتَّى مَاتَتْ، فَدَخَلَتْ فِيهَا النَّارَ، لاَ هِيَ أَطْعَمَتْهَا وَلاَ سَقَتْهَا إِذْ حَبَسَتْهَا، وَلاَ هِيَ تَرَكَتْهَا تَأْكُلُ مِنْ خَشَاشِ الأَرْضِ.'
        ),
      },
      {
        book: 'Abu Dawud',
        number: '75',
        text: t(
          'The Prophet ﷺ said regarding the cat: "It is not impure; it is merely one of those who roam around among you (dwelling with you)." He performed ablution from water a cat had drunk from.',
          'Le Prophète ﷺ a dit du chat : « Il n’est pas impur; il fait partie de ceux qui circulent constamment parmi vous. » Il fit ses ablutions dans l’eau où une chatte avait bu.',
          'قَالَ رَسُولُ اللَّهِ ﷺ فِي الْهِرَّةِ: «إِنَّهَا لَيْسَتْ بِنَجَسٍ، إِنَّهَا مِنَ الطَّوَّافِينَ عَلَيْكُمْ وَالطَّوَّافَاتِ».'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The pure domestic companion praised by the Prophet ﷺ as ritually clean (Tahira), where cruelty toward it brought Hellfire and compassion reflected the highest ethical ideals of Islam.',
      'Le compagnon domestique rituellement pur honoré par la Sunnah, dont la maltraitance valut l’Enfer et dont la bienveillance est un devoir sacré.',
      'الحيوان الأليف الطاهر الذي بيّن النبي ﷺ طهارة سؤره وأنه من الطوافين في البيوت، وجعل حبسها وتعذيبها موجباً للنار والرحمة بها من شيم الأبرار.'
    ),
    whatTheyDid: t(
      'The Prophet ﷺ elevated animal rights 1,400 years ago by delivering two monumental judgments regarding the cat. In the first, he revealed the divine punishment of a woman who cruelly imprisoned a cat until it starved. In the second, when a cat drank from his ablution vessel, he paused, let it quench its thirst fully, and made Wudu with the remaining water, declaring cats pure and cherished companions. The venerable companion Abd al-Rahman ibn Sakhr was famously nicknamed "Abu Hurairah" (Father of the Kitten) by the Prophet ﷺ because he cradled a small kitten in his sleeve.',
      'Le Prophète ﷺ révolutionna l’éthique animale : il annonça la damnation d’une femme pour avoir affamé une chatte, et inversa les préjugés d’impureté en déclarant l’eau bue par un chat licite pour les ablutions. Le célèbre compagnon Abu Huraira reçut son surnom affectueux du Prophète lui-même pour avoir abrité un chaton sous sa manche.',
      'أعلى النبي ﷺ من شأن الرحمة بالحيوان؛ فبين خطورة حبس الهرة حتى الموت واعتبره جريمة تدخل النار، وفي المقابل لما ولغت هرة في إناء وضوئه أمال لها الإناء حتى شربت ثم توضأ من سؤرها معلناً طهارتها. وأقر الصحابي الجليل أبا هريرة على كنيته لحمله قطة صغيرة في كمه وحنوّه عليها.'
    ),
    physicalTraits: {
      size: t('25 cm height, 3–5 kg, flexible spine', '25 cm au garrot, 4 kg, colonne ultra-souple', 'طوله نحو 45 سم، ووزنه 3-5 كجم، وعموده الفقري فائق المرونة'),
      habitat: t('Homes, courtyards, oasis dwellings across the Islamic world', 'Maisons, cours intérieures et ruelles paisibles', 'البيوت والرياض والساحات السكنية المأهولة'),
      uniqueFeature: t('Barbed tongue for grooming; retractable claws; purring mechanism', 'Langue râpeuse auto-nettoyante; griffes rétractiles et ronronnement apaisant', 'لسان خشن معقم ينظف به بدنه، ومخالب مرتدة، وخرخرة تبعث على الاسترخاء'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Silent direct-register velvet pacing',
      paceDescription: t('Silent padded velvet gait with rear paws stepping into front paw prints', 'Démarche feutrée quasi-silencieuse et bonds d’une prodigieuse agilité', 'مشية مخملية صامتة تضع فيها رجلها في موضع يدها بانسيابية مذهلة'),
      soundOrSignal: t('Therapeutic low purr at 25–150 Hz promoting tissue healing', 'Ronronnement apaisant à 25-150 Hz favorisant la régénération tissulaire', 'خرخرة متواترة هادئة بتردد 25 إلى 140 هرتز ثبت علمياً أنها تخفف التوتر'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Teaches universal compassion (Rahmah) to all living souls; shows that entering Paradise or Hell can hinge upon our conduct toward a helpless creature.',
        'Révèle que le salut spirituel peut dépendre de la bienveillance envers les êtres sans défense.',
        'ميزان الرحمة الربانية؛ وأن الإحسان إلى مخلوق ضعيف قد ينجي صاحبه، وأن القسوة عليه تجلب سخط الله.'
      ),
      sunnahGuidance: t(
        'Established ritual purity (Taharah) of cat saliva/drinking water; prohibits confining or starving domestic animals.',
        'Établit la pureté rituelle de la salive féline et interdit la captivité sans soins.',
        'طهارة سؤر القطة وجواز الوضوء بفضل مائها، وتحريم تعذيب الحيوانات الأليفة.'
      ),
      scientificEcological: t(
        'Saliva contains natural lysozymes that disinfect its fur; keeps residential dwellings free from venomous scorpions, snakes, and disease-carrying rodents.',
        'Salive antiseptique riche en lysozymes; protège les foyers contre les scorpions, serpents et rongeurs.',
        'لعاب الهر يحوي مادة مطهرة معقمة، وهي حارس طبيعي للمنازل يقضي على الفئران والعقارب والثعابين.'
      ),
      practicalBenefits: t(
        'Natural rodent pest suppression; feline purring lowers human systolic blood pressure and reduces cardiovascular risk by 30%.',
        'Abaissement de la tension artérielle humaine par le contact félin et protection des greniers.',
        'حماية مخازن الحبوب والبيوت من الآفات، وتخفيف الضغط النفسي والاكتئاب لدى الإنسان.'
      ),
    },
  },
]

export const QURAN_SUNNAH_PLANTS: PlantFoodEntry[] = [
  {
    id: 'nakhl_tamr',
    name: t('Date Palm & Dates', 'Palmier dattier & Dattes', 'النخيل والتمر والرطب والعجوة'),
    scientificName: 'Phoenix dactylifera',
    category: 'fruits',
    source: 'quran_and_sunnah',
    quranRefs: ['19:25', '55:68', '50:10', '6:99', '16:11', '16:67', '23:19'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5445',
        text: t(
          'Whoever eats seven Ajwa dates in the morning, neither poison nor magic will harm him on that day.',
          'Quiconque mange chaque matin sept dattes ‘Ajwa ne sera atteint ce jour-là ni par le poison ni par la sorcellerie.',
          'مَنْ تَصَبَّحَ كُلَّ يَوْمٍ سَبْعَ تَمَرَاتٍ عَجْوَةً، لَمْ يَضُرَّهُ فِي ذَلِكَ اليَوْمِ سُمٌّ وَلاَ سِحْرٌ.'
        ),
      },
      {
        book: 'Abu Dawud',
        number: '2356',
        text: t(
          'The Messenger of Allah ﷺ used to break his fast with fresh ripe dates (Rutab) before praying; if there were no fresh dates, then with dry dates (Tamr); if there were none, he took a few sips of water.',
          'Le Messager d’Allah ﷺ rompait son jeûne avec des dattes fraîches avant de prier; à défaut, avec des dattes sèches; à défaut, par quelques gorgées d’eau.',
          'كَانَ رَسُولُ اللَّهِ ﷺ يُفْطِرُ عَلَى رُطَبَاتٍ قَبْلَ أَنْ يُصَلِّيَ، فَإِنْ لَمْ تَكُنْ رُطَبَاتٌ فَعَلَى تَمَرَاتٍ، فَإِنْ لَمْ تَكُنْ حَسَا حَسَوَاتٍ مِنْ مَاءٍ.'
        ),
      },
    ],
    relatedProphets: ['maryam', 'isa', 'muhammad'],
    summary: t(
      'The most frequently mentioned plant in the Holy Qur’an (over 20 times), provided miraculously to Maryam during childbirth, and celebrated in the Sunnah as the crown of wholesome foods and the daily protection of Ajwa.',
      'L’arbre le plus cité du Saint Coran (plus de 20 fois), offert à Marie pour son accouchement, et parure de la table prophétique.',
      'أكثر النباتات ذكراً في القرآن الكريم (أكثر من عشرين موضعاً)، رزق الله به مريم عليها السلام عند المخاض، وجعله النبي ﷺ طعام الإفطار المبارك ووقاية بالعجوة.'
    ),
    scriptureContext: t(
      'When labor pains gripped Maryam alone beside a dry date palm trunk, she cried out in agony. An angel called to her: "Grieve not; your Lord has placed beneath you a stream. And shake toward you the trunk of the palm tree; it will drop upon you ripe, fresh dates (Rutab). So eat and drink and be contented." The divine instruction delivered instant natural glucose, potassium, and oxytocin-mimicking compounds to relieve labor and stop postpartum hemorrhage.',
      'Dans la douleur de l’enfantement au désert, Marie s’abrita sous un palmier desséché. L’ange la réconforta : « Ne t’afflige pas... Secoue vers toi le tronc du palmier : il fera tomber sur toi des dattes fraîches et mûres. Mange donc et bois et réjouis-toi ! » Ce fruit lui apporta l’énergie vitale et les molécules nécessaires pour réguler les contractions et stopper les hémorragies.',
      'لما ألجأ المخاض مريم العذراء إلى جذع النخلة ونادت من شدة الكرب: ﴿يَا لَيْتَنِي مِتُّ قَبْلَ هَذَا وَكُنْتُ نَسْيًا مَنْسِيًّا﴾، ناداها الملك ألا تحزن، وقال لها: ﴿وَهُزِّي إِلَيْكِ بِجِذْعِ النَّخْلَةِ تُسَاقِطْ عَلَيْكِ رُطَبًا جَنِيًّا * فَكُلِي وَاشْرَبِي وَقَرِّي عَيْنًا﴾. فأطعمها الله الرطب لما فيه من سكريات أحادية سهلة الامتصاص ومواد قابضة للرحم تخفف آلام الولادة وتمنع النزيف.'
    ),
    botanicalTraits: {
      growthForm: t('Towering unbranched dioecious palm, 15–25 m height with feather fronds', 'Grand palmier dioïque couronné de palmes pennées de 4 mètres', 'شجرة باسقة معمرة يصل ارتفاعها إلى 25 متراً تعلوها قمة خضراء نضرة'),
      habitat: t('Arid desert oases with deep root access to groundwater', 'Oasis sahariennes aux racines plongeant vers les nappes phréatiques', 'واحات الصحراء ذات المياه الجوفية العميقة والحرارة المرتفعة'),
      tasteAndTexture: t('Rich caramel sweetness, melting soft flesh in Rutab and chewy firm in Tamr', 'Douceur miellée fondante pour le Rutab, chair charnue pour le Tamr', 'حلاوة عسلية غنية وملمس لين ذائب في الرطب ومتماسك مغذٍ في التمر'),
    },
    benefits: {
      nutritional: t(
        'Dense natural simple sugars (fructose & glucose) requiring no metabolic digestion, 15+ minerals (high potassium, magnesium, iron, calcium), and insoluble dietary fiber.',
        'Sucres simples directement assimilables, 15 minéraux majeurs (potassium, magnésium, fer, zinc) et fibres solubles bienfaisantes.',
        'سكريات أحادية سريعة الامتصاص تعيد توازن سكر الدم فوراً، وأكثر من 15 معدناً وفيتاميناً أهمها البوتاسيوم والمغنيسيوم والحديد.'
      ),
      medicinalProphetic: t(
        'Prophetic remedy of 7 Ajwa dates for hepatic detoxification and protection against cellular toxins; natural oxytocic activity facilitating safe childbirth.',
        'L’Ajwa de Médine offre un bouclier hépato-protecteur unique; stimule les contractions utérines naturelles et accélère la délivrance.',
        'عجوة المدينة تقي من السموم وتنشط وظائف الكبد، ويحتوي الرطب على مادة تماثل هرمون الأوكسيتوسين المساعد على انقباض الرحم وتسهيل الولادة.'
      ),
      spiritualWisdom: t(
        'The Prophet ﷺ compared the faithful believer to the date palm: its leaves never fall, every part yields benefit, and it remains steadfast through storms.',
        'Le Prophète ﷺ a comparé le croyant au palmier : ses feuilles ne tombent jamais et toute sa substance est bénédiction.',
        'شبه النبي ﷺ المؤمن بالنخلة؛ لا يسقط ورقها، وبركتها دائمة في ثمرها وجذعها وخوصها وظلها.'
      ),
      modernScience: t(
        'Rich in polyphenolic antioxidants, reducing vascular inflammation, supporting healthy gut microbiome, and preventing post-exercise glycogen depletion.',
        'Abondance d’antioxydants phénoliques réduisant l’inflammation artérielle et soutenant la flore digestive.',
        'مضاد قوي للأكسدة يقي من تصلب الشرايين ويعدل حموضة المعدة ويمد الجهاز العصبي بالطاقة الحيوية.'
      ),
    },
  },
  {
    id: 'zaytun_zayt',
    name: t('Olive & Blessed Olive Oil', 'L’Olivier & L’Huile Bénie', 'الزيتون وزيت الزيتون المبارك'),
    scientificName: 'Olea europaea',
    category: 'fruits',
    source: 'quran_and_sunnah',
    quranRefs: ['24:35', '95:1', '23:20', '6:99', '16:11', '80:29'],
    hadithRefs: [
      {
        book: 'Tirmidhi',
        number: '1851',
        text: t(
          'Eat olive oil and massage yourselves with it, for it is from a blessed tree.',
          'Consommez de l’huile d’olive et oignez-vous-en, car elle provient d’un arbre béni.',
          'كُلُوا الزَّيْتَ وَادَّهِنُوا بِهِ، فَإِنَّهُ مِنْ شَجَرَةٍ مُبَارَكَةٍ.'
        ),
      },
    ],
    relatedProphets: ['muhammad', 'isa', 'musa'],
    summary: t(
      'The "Blessed Tree" (Shajarah Mubarakah) praised in Surah An-Nur whose oil almost glows with divine light; sworn by in Surah At-Tin; the gold standard of longevity and cardiovascular healing in the Sunnah.',
      'L’Arbre Béni célébré dans le Verset de la Lumière, dont l’huile pure semble rayonner sans feu, pilier de la médecine prophétique.',
      'الشجرة المباركة المذكورة في آية النور، لا شرقية ولا غربية يكاد زيتها يضيء ولو لم تمسسه نار، أقسم الله بها في سورة التين، وأمر النبي ﷺ بأكل زيتها والادهان به.'
    ),
    scriptureContext: t(
      'Allah set the parable of His Divine Light as an oil lamp burning from a blessed tree: "The lamp is in glass, the glass as if it were a pearly white star lit from a blessed tree, an olive, neither of the east nor of the west, whose oil would almost glow even if untouched by fire. Light upon light." In Surah Al-Mu’minun, Allah describes it emerging from Mount Sinai producing oil and relish for those who eat.',
      'Dieu a comparé Sa Lumière à une lampe alimentée par l’huile d’un olivier béni : « ...allumée à un arbre béni, un olivier ni oriental ni occidental, dont l’huile semble éclairer sans même que le feu ne l’ait touchée. Lumière sur Lumière ! » Il est aussi décrit comme l’arbre du Mont Sinaï offrant huile et nourriture aux hommes.',
      'ضرب الله مثل نوره بنور مصباح يوقد من زيت شجرة مباركة زيتونة: ﴿يُوقَدُ مِنْ شَجَرَةٍ مُبَارَكَةٍ زَيْتُونَةٍ لَا شَرْقِيَّةٍ وَلَا غَرْبِيَّةٍ يَكَادُ زَيْتُهَا يُضِيءُ وَلَوْ لَمْ تَمْسَسْهُ نَارٌ نُورٌ عَلَى نُورٍ﴾، وبيّن في سورة المؤمنون أنها: ﴿تَخْرُجُ مِنْ طُورِ سَيْنَاءَ تَنْبُتُ بِالدُّهْنِ وَصِبْغٍ لِلْآكِلِينَ﴾، وأقسم بها في سورة التين: ﴿وَالتِّينِ وَالزَّيْتُونِ﴾.'
    ),
    botanicalTraits: {
      growthForm: t('Gnarled, resilient evergreen tree living for over a thousand years', 'Arbre millénaire au tronc noueux et feuillage persistant argenté', 'شجرة معمرة مباركة ذات جذع ملتوٍ تعيش آلاف السنين وأوراقها دائمة الخضرة'),
      habitat: t('Mediterranean limestone terraces and sunny mountain slopes', 'Collines calcaires ensoleillées et versants méditerranéens', 'سفوح جبال فلسطين وبلاد الشام وحوض البحر الأبيض المتوسط'),
      tasteAndTexture: t('Velvety golden-green oil with peppery polyphenol back-throat finish', 'Huile soyeuse verte-dorée aux arômes d’herbe fraîche et note poivrée', 'زيت حريري زبرجدي ذو نكهة عطرية دافئة وحرقة محببة في الحلق تدل على غناه'),
    },
    benefits: {
      nutritional: t(
        'Supreme source of monounsaturated oleic acid (Omega-9), natural vitamin E (alpha-tocopherol), squalene, and fat-soluble carotenoids.',
        'Acides gras mono-insaturés (acide oléique Oméga-9), vitamine E et squalène protecteur.',
        'أعلى المصادر الطبيعية بحمض الأوليك (أوميغا 9)، وفيتامين هـ، ومضادات الأكسدة الذائبة في الدهون.'
      ),
      medicinalProphetic: t(
        'The Prophet ﷺ prescribed both internal consumption and topical massage; rejuvenates skin barrier, lowers blood pressure, and soothes inflammatory arthritis.',
        'Usage interne et externe recommandé : protège l’endothélium cardiovasculaire, assouplit la peau et soulage les articulations.',
        'أوصى النبي ﷺ بالادهان به لعلاج جفاف البشرة والتهابات المفاصل، وأكله لحماية الشرايين والقلب والجهاز الهضمي.'
      ),
      spiritualWisdom: t(
        'Represents pure, luminous sincerity: its oil gives light without smoke, thriving in moderate exposure ("neither eastern nor western").',
        'Symbole de pureté lumineuse et de droiture tempérée, rayonnant sans fumée.',
        'رمز لصفاء الإخلاص ونقاء التوحيد، ونمو الشجرة في الوسط المبارك المعتدل المعرض لنور الشمس طوال النهار.'
      ),
      modernScience: t(
        'Oleocanthal acts as a natural COX-1/COX-2 anti-inflammatory equivalent to ibuprofen; hydroxytyrosol protects LDL cholesterol from oxidation and protects neurons.',
        'L’oléocanthal exerce une action anti-inflammatoire naturelle identique à l’ibuprofène; l’hydroxytyrosol préserve les neurones.',
        'مادة الأوليوكانثال تعمل كمضاد التهاب طبيعي مماثل للإيبوبروفين، والهيدروكسي تيروسول يحمي شرايين القلب وخلايا المخ.'
      ),
    },
  },
  {
    id: 'tin',
    name: t('The Fig', 'Le Figue', 'التين'),
    scientificName: 'Ficus carica',
    category: 'fruits',
    source: 'quran',
    quranRefs: ['95:1-3'],
    hadithRefs: [],
    relatedProphets: ['adam', 'isa', 'muhammad'],
    summary: t(
      'Honored with the opening divine oath of Surah At-Tin ("By the Fig and the Olive!"), revered as a complete, seedless-flesh fruit packing dense prebiotic fiber and bone-building minerals.',
      'Honoré par le serment divin inaugural de la sourate At-Tîn, fruit complet gorgé de minéraux et de fibres prébiotiques.',
      'الفاكهة الكريمة التي استفتح الله بها القسم في سورة التين: ﴿وَالتِّينِ وَالزَّيْتُونِ﴾، تمتاز بلحمها النقي الذي لا قشر له ولا نوى مهدورة، وتعد صيدلية غنية بالألياف والمعادن.'
    ),
    scriptureContext: t(
      'Allah opens Surah 95 swearing by two sacred fruits and two sacred locations: "By the Fig and the Olive, and Mount Sinai, and this secure city [Makkah]—We have certainly created man in the best of stature." Early Quranic commentators noted that the fig represents the lands of Damascus, Canaan, and northern holy sanctuaries, while the olive represents Jerusalem and Palestine.',
      'Dieu ouvre la sourate 95 par un quadruple serment grandiose : « Par le Figuier et l’Olivier ! Et par le Mont Sinaï ! Et par cette Cité sûre [La Mecque] ! Nous avons certes créé l’homme dans la forme la plus parfaite. » Les exégètes ont souligné le lien entre ces arbres nourriciers et les terres bénies de la prophétie.',
      'أقسم الله سبحانه بالتين والزيتون مقترنين بطور سينين والبلد الأمين، دلالة على عظيم بركتهما وأرض الأنبياء في الشام وفلسطين: ﴿وَالتِّينِ وَالزَّيْتُونِ * وَطُورِ سِينِينَ * وَهَذَا الْبَلَدِ الْأَمِينِ * لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ﴾.'
    ),
    botanicalTraits: {
      growthForm: t('Spreading deciduous tree with broad multi-lobed leaves, 6–10 m', 'Arbre caduc à larges feuilles lobées rugueuses, 7 m', 'شجرة نفضية وارفة الظلال ذات أوراق خماسية عريضة تفوح بعبق مميز'),
      habitat: t('Limestone valleys, sunny arid terraces, stony slopes', 'Plateaux calcaires et terrasses ensoleillées du Proche-Orient', 'الأراضي الكلسية والمنحدرات الجبلية المشمسة في بلاد الشام'),
      tasteAndTexture: t('Delicately sweet honeyed flesh with pleasant crunchy micro-seeds', 'Chair confite mielleuse semée de petits grains croquants', 'مذاق سكري عسلي رقيق مع قرمشة لطيفة من الحبيبات الدقيقة المنعشة'),
    },
    benefits: {
      nutritional: t(
        'Highest plant source of bioavailable calcium and potassium; rich in pectin soluble fiber, copper, vitamin B6, and prebiotic polyphenols.',
        'Remarquable teneur en calcium végétal, potassium, pectine digestive et cuivre.',
        'من أعلى الفواكه احتواءً على الكالسيوم والبوتاسيوم، وغني بألياف البكتين الذائبة وفيتامين ب6.'
      ),
      medicinalProphetic: t(
        'Cleanses digestive tract, relieves chronic constipation, dissolves urinary gravel, and relieves joint aches and gout.',
        'Régulateur intestinal puissant, soulage les rhumatismes et dissout les calculs.',
        'ينقي الكلى والمثانة، ويلين الأمعاء، ويخفف آلام النقرس والمفاصل وينقي الصدر.'
      ),
      spiritualWisdom: t(
        'Symbol of divine perfection in design: a whole fruit with no unedible pit, mirroring how man was fashioned in the finest stature (Ahsan Taqwim).',
        'Miroir de la perfection créée : un fruit sans déchet, reflétant l’harmonie de l’homme créé dans la plus noble stature.',
        'آية في الإتقان الرباني؛ ثمرة تؤكل كلها ظاهراً وباطناً بلا هدر، وتوافق خلقة الإنسان في أحسن تقويم.'
      ),
      modernScience: t(
        'Ficin enzyme assists protein breakdown; high antioxidant polyphenol content mitigates oxidative stress and protects vascular elasticity.',
        'L’enzyme ficine facilite la digestion des protéines; protège la souplesse artérielle.',
        'إنزيم الفيسين يحلل البروتينات المعقدة ويسهل الهضم، ومضادات الأكسدة تقي من ارتفاع ضغط الدم.'
      ),
    },
  },
  {
    id: 'rumman',
    name: t('The Pomegranate', 'La Grenade', 'الرمان'),
    scientificName: 'Punica granatum',
    category: 'fruits',
    source: 'quran_and_sunnah',
    quranRefs: ['55:68', '6:99', '6:141'],
    hadithRefs: [
      {
        book: 'Ahmad',
        number: '1287',
        text: t(
          'Ali (ra) said: "Eat the pomegranate with its inner membrane, for indeed it tans (tones and cleanses) the stomach."',
          'Ali (qu’Allah l’agrée) a dit : « Mangez la grenade avec sa pulpe blanche interne, car elle tanne l’estomac. »',
          'عَنْ عَلِيٍّ رَضِيَ اللَّهُ عَنْهُ قَالَ: «كُلُوا الرُّمَّانَ بِشَحْمِهِ، فَإِنَّهُ دِبَاغُ الْمَعِدَةِ».'
        ),
      },
    ],
    relatedProphets: ['muhammad', 'sulayman'],
    summary: t(
      'The crowned ruby fruit of the Gardens of Paradise, celebrated twice in Surah Al-An’am and once in Ar-Rahman; a therapeutic powerhouse for cardiovascular integrity and gastric lining.',
      'Le fruit royal des jardins du Paradis aux joyaux de rubis, protecteur universel du cœur et de la muqueuse gastrique.',
      'فاكهة الجنات العالية المتوجة بالجمال، ذُكرت في سورة الرحمن وسورة الأنعام، حبها كالياقوت الأحمر، ودباغ شافٍ لجدار المعدة والقلب.'
    ),
    scriptureContext: t(
      'In Surah Ar-Rahman, Allah describes the lush twin Gardens of Paradise reserved for the righteous: "In both of them are fruit, and date palms, and pomegranates." In Surah Al-An’am, Allah invites reflection upon the orchards of similar and dissimilar pomegranates emerging from the same soil and water, showcasing miraculous diversity in creation.',
      'Dans la sourate Ar-Rahmân, Dieu dépeint les délices du Paradis : « Dans les deux, il y aura des fruits, des palmiers et des grenadiers. » Dans la sourate Al-An’âm, Il nous convie à contempler les vergers de grenadiers semblables et dissemblables abreuvés de la même eau.',
      'وصف الله تعالى نعيم الجنة في سورة الرحمن فقال: ﴿فِيهِمَا فَاكِهَةٌ وَنَخْلٌ وَرُمَّانٌ﴾، وأمر بالتدبر في خلقه في سورة الأنعام: ﴿وَالزَّيْتُونَ وَالرُّمَّانَ مُشْتَبِهًا وَغَيْرَ مُتَشَابِهٍ انْظُرُوا إِلَى ثَمَرِهِ إِذَا أَثْمَرَ وَيَنْعِهِ إِنَّ فِي ذَلِكُمْ لَآيَاتٍ لِقَوْمٍ يُؤْمِنُونَ﴾.'
    ),
    botanicalTraits: {
      growthForm: t('Bushy deciduous shrub or small tree with vibrant scarlet blossoms, 4–6 m', 'Arbuste élégant aux fleurs écarlates flamboyant au printemps, 5 m', 'شجرة جميلة مزهرة بأزهار حمراء نارية براقة يصل طولها إلى 5 أمتار'),
      habitat: t('Subtropical Mediterranean gardens, fertile oases, riverbanks', 'Vergers subtropicaux et oasis arrosées du Proche-Orient', 'البساتين المروية وضفاف الأودية في بلاد الشام وإيران ومصر'),
      tasteAndTexture: t('Bursting juicy tart-sweet ruby arils encapsulating soft edible seeds', 'Grains rubis croquants éclatant en jus acidulé et rafraîchissant', 'حبات ياقوتية ممتلئة بعصير حلو حامض منعش ينفجر في الفم بحيوية'),
    },
    benefits: {
      nutritional: t(
        'Exceptional punicalagins, ellagic acid, vitamin C, anthocyanins, and dietary tannins.',
        'Punicalagines exceptionnelles, acide ellagique, vitamine C et flavonoïdes antioxydants.',
        'غني بمركبات البونيكالاجين وحمض الإيلاجيك والأنثوسيانين وفيتامين ج والألياف.'
      ),
      medicinalProphetic: t(
        'Tones and strengthens stomach lining ("Dabagh al-Ma’idah"), stops ulcer inflammation, improves cardiac circulation, and prevents arterial plaque buildup.',
        'Régénère la muqueuse stomacale, combat les ulcères et fluidifie la microcirculation cardiaque.',
        'يدبغ المعدة ويقوي بطانتها الداخلية، ويقاوم قرحة المعدة والجرثومة، ويطهر الجهاز الهضمي.'
      ),
      spiritualWisdom: t(
        'Each ruby aril packed symmetrically within white parchment chambers reflects divine geometry and harmonious unity in diversity.',
        'L’agencement millimétré des graines dans leurs loges blanches reflète l’ordre divin parfait.',
        'هندسة الحبات المتراصة بإحكام داخل الغرف البيضاء مظهر من مظاهر بديع صنع الخالق وتناسق الكون.'
      ),
      modernScience: t(
        'Clinical studies prove punicalagins reverse carotid artery stenosis, lower systolic blood pressure, and inhibit prostate and breast cellular proliferation.',
        'Prouvé cliniquement pour réduire la plaque d’athérome carotidienne et stabiliser la tension artérielle.',
        'أثبتت الأبحاث السريرية قدرة عصيره على خفض ضغط الدم، وإذابة الدهون المتراكمة في الشرايين، ومقاومة الأورام.'
      ),
    },
  },
  {
    id: 'asal',
    name: t('Pure Honey', 'Le Miel Pur', 'العسل النقي (شفاء للناس)'),
    scientificName: 'Mel (Apis mellifera Nectar)',
    category: 'drinks_sustenance',
    source: 'quran_and_sunnah',
    quranRefs: ['16:69', '47:15'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5684',
        text: t(
          'A man came to the Prophet ﷺ and said: "My brother has abdominal trouble." The Prophet said: "Give him honey." The man returned twice saying it had not cured him. The Prophet ﷺ said: "Allah has spoken the truth, and your brother’s abdomen has lied! Give him honey." So he gave him honey and he was cured.',
          'Un homme vint au Prophète ﷺ : « Mon frère se plaint du ventre. » Le Prophète dit : « Donne-lui du miel. » L’homme revint deux fois sans succès. Le Prophète dit : « Allah a dit vrai et le ventre de ton frère a menti ! Donne-lui du miel. » Il lui en donna et il guérit.',
          'جَاءَ رَجُلٌ إِلَى النَّبِيِّ ﷺ فَقَالَ: «إِنَّ أَخِي اسْتَطْلَقَ بَطْنُهُ»، فَقَالَ: «اسْقِهِ عَسَلًا»، فَسَقَاهُ ثُمَّ جَاءَ فَقَالَ: «إِنِّي سَقَيْتُهُ فَلَمْ يَزِدْهُ إِلَّا اسْتِطْلَاقًا»، فَقَالَ لَهُ ثَلَاثَ مَرَّاتٍ، ثُمَّ قَالَ فِي الرَّابِعَةِ: «صَدَقَ اللَّهُ وَكَذَبَ بَطْنُ أَخِيكَ، اسْقِهِ عَسَلًا»، فَسَقَاهُ فَبَرَأَ.'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The golden elixir explicitly declared by the Qur’an to contain "healing for humanity" (Shifa’ lin-Nas); flowing in rivers through Paradise; the ultimate antibiotic, wound healer, and digestive tonic in the Sunnah.',
      'L’élixir d’or explicitement proclamé par le Coran comme « une guérison pour les hommes », fleuve du Paradis et reine des remèdes prophétiques.',
      'الشراب الإلهي الذي نص القرآن على أن فيه ﴿شِفَاءٌ لِلنَّاسِ﴾، تجري به أنهار الجنة مصفى من الشوائب، سيد الأغذية والأدوية النبوية لتعقيم الجروح وشفاء الأسقام.'
    ),
    scriptureContext: t(
      'In Surah An-Nahl (The Bee), Allah states: "There emerges from their bellies a drink, varying in colors, in which there is healing for people. Indeed in that is a sign for a people who give thought." In Surah Muhammad, Allah promises the righteous in Paradise: "Rivers of strained, clarified honey." The Prophet ﷺ paired it with the Qur’an as the twin cures for body and soul.',
      'Dans la sourate Les Abeilles, Dieu proclame : « De leurs ventres sort un liquide aux couleurs variées, dans lequel il y a une guérison pour les gens. » Et dans la sourate Muhammad : « ...des ruisseaux d’un miel pur et clarifié. » Le Prophète ﷺ l’a uni au Coran : « Usez des deux guérisseurs : le miel et le Coran. »',
      'قال تعالى في سورة النحل: ﴿يَخْرُجُ مِنْ بُطُونِهَا شَرَابٌ مُخْتَلِفٌ أَلْوَانُهُ فِيهِ شِفَاءٌ لِلنَّاسِ إِنَّ فِي ذَلِكَ لَآيَةً لِقَوْمٍ يَتَفَكَّرُونَ﴾، ووعد أهل الجنة في سورة محمد بـ ﴿أَنْهَارٌ مِنْ عَسَلٍ مُصَفًّى﴾. وكان النبي ﷺ يشربه على الريق مع الماء البارد فيجمع بين الغذاء والشفاء.'
    ),
    botanicalTraits: {
      growthForm: t('Liquid nectar enzyme-transformed and dehydrated by honeybees into viscous gold', 'Nectar floral concentré et mûri par les abeilles dans les alvéoles', 'رحيق أزهار نقي تحوله بطون النحل بإنزيمات حيوية إلى سائل ذهبي صافٍ لا يفسد'),
      habitat: t('Mountain hives, tree cavities, wild flower valleys across the globe', 'Ruches de montagne, gorges sauvages et vergers fleuris', 'خلايا جبال السراة واليمن وبساتين الزهور البرية'),
      tasteAndTexture: t('Velvety warm sweetness ranging from light floral amber to dark molasses depth', 'Douceur dorée onctueuse aux arômes floraux complexes', 'حلاوة عسلية دافئة تتنوع ألوانها من الأبيض العنبري إلى الأسود الداكن حسب الزهور'),
    },
    benefits: {
      nutritional: t(
        'Natural bioavailable sugars, 180+ bioactive constituents, inhibines, inhibine hydrogen peroxide, defensin-1 peptide, amino acids, and minerals.',
        'Plus de 180 composants bioactifs, enzymes vivantes, défensine-1 antibactérienne et oligo-éléments.',
        'يحوي أكثر من 180 مركباً حيوياً، وإنزيمات هاضمة، وببتيدات مناعية طبيعية تعقم الجسم وتغذيه.'
      ),
      medicinalProphetic: t(
        'Prophetic first-line treatment for gastrointestinal disorders, throat inflammation, chronic cough, and infected burns; consumed with cold water on an empty stomach.',
        'Remède souverain des maux digestifs, des toux rebelles et de la cicatrisation cutanée; bu à jeun délayé dans l’eau.',
        'علاج نبوي لاضطرابات المعدة والأمعاء، وتطهير القصبات الهوائية، وشفاء الحروق والجروح دون ترك ندبات.'
      ),
      spiritualWisdom: t(
        'Unites sweetness with healing: reminding believers that divine truth is both delicious to the soul and curative to moral ailments.',
        'Unit la douceur au pouvoir guérisseur, à l’image de la Révélation douce au cœur et guérisseuse des maux.',
        'يجمع بين لذة الطعم وشفاء الداء؛ مثلاً لنور القرآن الذي هو شفاء لما في الصدور ولذة لأرواح العارفين.'
      ),
      modernScience: t(
        'Broad-spectrum antimicrobial efficacy against antibiotic-resistant MRSA; high osmolarity and low pH inhibit bacterial reproduction; accelerates fibroblast tissue regeneration.',
        'Antibactérien puissant actif contre le SARM; stimule la prolifération des fibroblastes et la régénération tissulaire.',
        'أثبت الطب الحديث فاعليته ضد البكتيريا المقاومة للمضادات الحيوية (MRSA)، وخصائصه الأسموزية التي تمنع نمو الميكروبات.'
      ),
    },
  },
  {
    id: 'habbah_sawda',
    name: t('The Black Seed (Nigella Sativa)', 'La Graine Noire (Nigelle)', 'الحبة السوداء (حبة البركة)'),
    scientificName: 'Nigella sativa',
    category: 'herbs_medicinal',
    source: 'sunnah',
    quranRefs: [],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5688',
        text: t(
          'The Prophet ﷺ said: "In the black seed there is healing for every disease except death."',
          'Le Prophète ﷺ a dit : « Il y a dans la graine noire une guérison pour toute maladie, sauf la mort. »',
          'قَالَ رَسُولُ اللَّهِ ﷺ: «إِنَّ فِي الحَبَّةِ السَّوْدَاءِ شِفَاءً مِنْ كُلِّ دَاءٍ، إِلَّا السَّامَ»، وَالسَّامُ: المَوْتُ.'
        ),
      },
      {
        book: 'Muslim',
        number: '2215',
        text: t(
          'Hold onto the black seed, for indeed it is a healing for every ailment except death.',
          'Attachez-vous à la graine noire, car elle recèle une guérison pour chaque maladie, excepté la mort.',
          'عَلَيْكُمْ بِهَذِهِ الحَبَّةِ السَّوْدَاءِ، فَإِنَّ فِيهَا شِفَاءً مِنْ كُلِّ دَاءٍ إِلَّا السَّامَ.'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The legendary "seed of blessing" (Habbat al-Barakah) extolled in Sahih hadith as containing a cure for every affliction except death; modern clinical science identifies its star molecule, Thymoquinone (TQ), as a master immunomodulator.',
      'La graine bénie célébrée dans le hadith comme panacée universelle; la science moderne y a découvert la thymoquinone, puissant modulateur immunitaire.',
      'حبة البركة التي خلدت السنة النبوية فضلها كشفاء من كل داء إلا السام، كنز الطب النبوي الذي أثبت العلم الحديث أن مادته الفعالة (الثيموكينون) معجزة علاجية شاملة.'
    ),
    scriptureContext: t(
      'The Prophet Muhammad ﷺ delivered this sweeping, universal medical statement recorded in both Sahih al-Bukhari and Sahih Muslim. Aisha (ra) related that when someone fell ill, she would crush black seed, blend it with honey or oil, and administer it into the nostrils or mouth, achieving rapid recovery by Allah’s will.',
      'Cette déclaration médicale prophétique solennelle est consignée dans les deux recueils authentiques de Boukhari et Muslim. Aïcha l’administrait pilée avec de l’huile ou du miel pour soulager les malades de son entourage.',
      'أطلق النبي ﷺ هذه القاعدة الطبية الشاملة في صحيحي البخاري ومسلم، وكانت أم المؤمنين عائشة رضي الله عنها تطحنها وتخلطها بزيت أو عسل وتصفها للمحموم والمريض فيبرأ بإذن الله.'
    ),
    botanicalTraits: {
      growthForm: t('Delicate annual flowering herb with finely divided leaves and pale blue blossoms, 30–60 cm', 'Plante annuelle gracieuse aux fleurs bleu ciel pâle, 40 cm', 'عشبة حولية رقيقة ذات أزهار زرقاء مبيضة وثمار كبسولية تضم بذيرات سوداء فاحمة'),
      habitat: t('Arid Mediterranean soils, Arabian borders, Upper Egypt', 'Terres sablonneuses méditerranéennes et Proche-Orient', 'الأراضي الجافة في حوض المتوسط والجزيرة العربية وصعيد مصر'),
      tasteAndTexture: t('Pungent, slightly bitter, aromatic peppery taste with warm herbal scent', 'Goût aromatique piquant, subtilement poivré et chaud', 'طعم حار لاذع مميز برائحة عطرية كافورية تدفئ الحلق والجسم'),
    },
    benefits: {
      nutritional: t(
        'Rich in Thymoquinone (TQ), thymohydroquinone, dithymoquinone, essential nigellone, Omega-6 linoleic acid, and phytosterols.',
        'Concentration unique en Thymoquinone (TQ), acide linoléique et flavonoïdes.',
        'مادة الثيموكينون الفائقة الفاعلية، والنيجلون، وحمض اللينوليك الدهني، ومضادات الأكسدة النادرة.'
      ),
      medicinalProphetic: t(
        'Strengthens respiratory system against asthma, relieves allergic rhinitis, dissolves kidney crystals, stimulates pancreatic beta cells, and supports deep sleep.',
        'Soulage l’asthme et les allergies respiratoires, stimule l’immunité globale et équilibre la glycémie.',
        'علاج فعال للربو والتهابات الصدر والحساسية، ومقوٍ لجهاز المناعة، ومخفض لضغط الدم وسكر الدم.'
      ),
      spiritualWisdom: t(
        'A humble tiny seed reminding humanity that divine cure does not require costly alchemy; Allah hid universal protection in the smallest creation.',
        'Rappelle que les plus puissants secrets de la guérison se cachent dans les graines les plus humbles de la création.',
        'تذكير بأن الشفاء يودعه الله في أصغر خلقه، وأن بركة التوكل تكمن في اتباع الهدي النبوي الشريف.'
      ),
      modernScience: t(
        'Over 1,200 peer-reviewed studies validate Thymoquinone’s potent anti-inflammatory, bronchodilatory, anti-tumorigenic, and hepatoprotective properties.',
        'Plus de 1 200 études scientifiques confirment son action anticancéreuse, bronchodilatatrice et protectrice cellulaire.',
        'أكثر من 1200 بحث علمي محكم يثبت قدرة الثيموكينون على تثبيط الخلايا السرطانية وتوسيع الشعب الهوائية وحماية خلايا الكبد.'
      ),
    },
  },
  {
    id: 'yaqtin_dubba',
    name: t('The Gourd / Pumpkin', 'Le Gourde / Citrouille', 'اليقطين والدباء والقرع'),
    scientificName: 'Cucurbita pepo / Lagenaria siceraria',
    category: 'grains_vegetables',
    source: 'quran_and_sunnah',
    quranRefs: ['37:146'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5433',
        text: t(
          'Anas ibn Malik reported: A tailor invited the Messenger of Allah ﷺ to a meal he had prepared. I saw the Prophet ﷺ looking for the pieces of gourd (Dubba’) from around the plate, so I have loved gourd ever since.',
          'Anas ibn Malik rapporte : Un tailleur invita le Messager d’Allah ﷺ. Je vis le Prophète rechercher les morceaux de courge autour du plat; depuis ce jour, je n’ai cessé d’aimer la courge.',
          'عَنْ أَنَسِ بْنِ مَالِكٍ قَالَ: إِنَّ خَيَّاطًا دَعَا رَسُولَ اللَّهِ ﷺ لِطَعَامٍ صَنَعَهُ... فَرَأَيْتُ النَّبِيَّ ﷺ يَتَتَبَّعُ الدُّبَّاءَ مِنْ حَوَالَيِ القَصْعَةِ، فَلَمْ أَزَلْ أُحِبُّ الدُّبَّاءَ مِنْ يَوْمِئِذٍ.'
        ),
      },
    ],
    relatedProphets: ['yunus', 'muhammad'],
    summary: t(
      'The miraculous plant grown by Allah over Prophet Yunus on the barren shore to provide soothing shade, cooling hydration, and insect-repellent foliage for his sun-blistered skin; deeply cherished by Prophet Muhammad ﷺ.',
      'La plante miraculeuse qu’Allah fit croître pour ombrager et soigner la peau meurtrie de Jonas rejeté sur le rivage; mets favori du Prophète ﷺ.',
      'الشجرة المباركة التي أنبتها الله فوق نبي الله يونس حين لفظه الحوت بالعراء سقيماً رقيق الجلد، فظللته ورطبته ومنعت عنه الذباب، وكان النبي ﷺ يحب أكلها ويتتبعها في الإناء.'
    ),
    scriptureContext: t(
      'When the whale cast Prophet Yunus onto the desolate coastal desert, his skin was peeling, raw, and vulnerable as a newborn infant. Allah says: "And We cast him onto the open shore while he was ill. And We caused to grow over him a gourd vine (Shajaratan min Yaqtin)." Its broad tender leaves provided soothing shade, flies and insects naturally shunned its scent, and its nourishing watery fruit healed his parched body until he recovered.',
      'Rejeté affaibli sur un rivage brûlant, Jonas avait la peau à vif. Allah fit jaillir au-dessus de lui une plante de courge : ses larges feuilles l’ombragèrent, son odeur écarta les mouches et insectes, et sa chair hydratante restaura sa santé.',
      'لما ألقى الحوت يونس بالعراء وهو كهيئة الفرخ الممعوط ليس عليه ريش ولا شعر من حموضة بطن الحوت، أنبت الله عليه شجرة يقطين تظله وتبرد جلده: ﴿فَنَبَذْنَاهُ بِالْعَرَاءِ وَهُوَ سَقِيمٌ * وَأَنْبَتْنَا عَلَيْهِ شَجَرَةً مِنْ يَقْطِينٍ﴾. وتميزت بأن ورقها عريض يستر، ولا يقربه ذباب، وثمرها يؤكل نيئاً ومطبوخاً.'
    ),
    botanicalTraits: {
      growthForm: t('Vigorous creeping or climbing vine with immense velvety leaves and golden trumpet flowers', 'Vigne rampante vigoureuse aux immenses feuilles veloutées protectrices', 'نبات عشبي زاحف سريع النمو ذو أوراق عريضة كالمظلات وأزهار صفراء كبيرة'),
      habitat: t('Coastal sandy shores, fertile river wadis, sunny garden loam', 'Rivages sablonneux et berges fertiles ensoleillées', 'ضفاف الأنهار والرمال الساحلية الدافئة'),
      tasteAndTexture: t('Delicate, mild, easily digested tender flesh with cooling watery sweetness', 'Chair douce, fondante et très hydratante, d’une digestibilité parfaite', 'لحم خفيف طري هين الهضم ذو طراوة منعشة تبرد حرارة الجوف'),
    },
    benefits: {
      nutritional: t(
        '94% structured cellular water, high beta-carotene (provitamin A), zinc, potassium, lutein, and gentle non-irritating dietary fibers.',
        '94% d’eau cellulaire structurée, bêta-carotène réparateur, zinc et potassium.',
        '94% ماء حيوي نقي، غني بالبيتاكاروتين المرمم للأنسجة، والزنك المعزز للمناعة، والبوتاسيوم.'
      ),
      medicinalProphetic: t(
        'Soothes gastrointestinal ulcers, reduces fever, replenishes depleted electrolytes, supports prostatic tissue health, and repairs damaged epidermal layers.',
        'Apaise les fièvres, régénère l’épiderme brûlé et décongestionne la prostate.',
        'يبرد حرارة المعدة والحمى، ويهدئ الأعصاب، ويرمم الجلد المحترق، وبذوره تحمي البروستاتا وتطرد الطفيليات.'
      ),
      spiritualWisdom: t(
        'A testament to Allah’s gentle care (Al-Lateef): He did not merely save Yunus from the whale, but provided an exact biological canopy suited to his wounded condition.',
        'Témoignage de la délicatesse divine (Al-Latîf) qui prépare un remède végétal sur-mesure pour le serviteur éprouvé.',
        'مظهر لاسم الله اللطيف؛ لم يكتفِ بإخراجه من بطن الحوت حتى أنبت له شجرة تظله وتغذيه وتمنع عنه الأذى رفقاً بضعفه.'
      ),
      modernScience: t(
        'Pumpkin seed oil inhibits 5-alpha reductase to relieve benign prostatic hyperplasia (BPH); pulp cucurbitacins exert potent anti-inflammatory and cellular repair effects.',
        'L’huile de pépins inhibe la 5-alpha-réductase et soulage l’hypertrophie prostatique; régénération tissulaire accélérée.',
        'مستخلص بذور القرع يمنع تضخم البروستاتا الحميد، ومادة الكوكوربيتاسين تكافح الالتهابات وتعجل التئام الأنسجة.'
      ),
    },
  },
  {
    id: 'sidr',
    name: t('The Lote Tree (Sidr)', 'Le Jujubier / Sidr', 'السدر (سدرة المنتهى وشجر الجنة)'),
    scientificName: 'Ziziphus spina-christi',
    category: 'heavenly',
    source: 'quran_and_sunnah',
    quranRefs: ['53:14-16', '56:28', '34:16'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '1253',
        text: t(
          'Wash the deceased with water and Sidr (lote tree leaves), and make the last rinse with camphor.',
          'Lavez le défunt avec de l’eau et des feuilles de jujubier (Sidr), et mettez du camphre au dernier lavage.',
          'اغْسِلُوهُ بِمَاءٍ وَسِدْرٍ، وَاجْعَلُوا فِي الآخِرَةِ كَافُورًا.'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The sacred boundary tree of the Seventh Heaven (Sidrat al-Muntaha) where revelation culminates; thornless lote trees shade the dwellers of Paradise in Surah Al-Waqi’ah; its leaves are the canonical cleanser for ritual washing in the Sunnah.',
      'L’arbre frontière du septième ciel où s’arrête la connaissance des créatures; arbre sans épines du Paradis et purificateur rituel de la Sunnah.',
      'شجرة المنتهى في أعلى السماوات العلى عندها جنة المأوى، وشجر الجنة المخضود بلا شوك، وأوراق الغسل والطهور التي أمر بها النبي ﷺ في غسل الميت والمحرم والتطهر.'
    ),
    scriptureContext: t(
      'In Surah An-Najm, the Prophet’s Mi’raj ascension reached its climax: "At the Lote Tree of the Utmost Boundary (Sidrat al-Muntaha), near it is the Garden of Refuge, when there covered the Lote Tree that which covered it!" In Surah Al-Waqi’ah, the companions of the Right Hand recline: "Amid thornless lote trees (Fi Sidrin Makhdud)." In the Sunnah, crushing green Sidr leaves between two stones produces a foaming lather used for purification.',
      'Dans la sourate An-Najm, le voyage céleste culmine : « Près du Jujubier de la Limite Suprême, près duquel est le Jardin du Refuge, au moment où le Jujubier était recouvert par ce qui le recouvrait ! » Dans la sourate Al-Wâqi’a : « Sous des jujubiers sans épines. » Ses feuilles écrasées moussent naturellement pour purifier les corps.',
      'ارتبط السدر بأعلى مراتب القرب الإلهي في ليلة المعراج: ﴿عِنْدَ سِدْرَةِ الْمُنْتَهَى * عِنْدَهَا جَنَّةُ الْمَأْوَى * إِذْ يَغْشَى السِّدْرَةَ مَا يَغْشَى﴾. وجعله الله من نعيم أهل اليمين منزوع الشوك: ﴿فِي سِدْرٍ مَخْضُودٍ﴾. وفي السنة الشريفة أمر النبي ﷺ بغسل موتى المسلمين والمعتمرين بماء وسدر لتعقيمه وتطييب ريحه.'
    ),
    botanicalTraits: {
      growthForm: t('Thorny, deeply rooted evergreen desert tree yielding small sweet jujube berries (Nabq), 8–15 m', 'Arbre désertique robuste aux fruits doux (Nabq) et racines profondes', 'شجرة شوكية صحراوية صلبة تضرب جذورها في الصخر وتثمر ثمار النبق الحلوة'),
      habitat: t('Arid Arabian wadis, Hijaz mountains, southern deserts', 'Oueds arides d’Arabie, monts du Hedjaz et oasis sahariennes', 'أودية الحجاز وصحارى نجد واليمن وسائر بوادي العرب'),
      tasteAndTexture: t('Small golden-red Nabq berries with crisp apple-like tart-sweet flavor', 'Petites baies de Nabq dorées au goût croquant de pomme sauvage miellée', 'ثمار النبق ذات طعم حلو قابض منعش يجمع بين التفاح والعسل'),
    },
    benefits: {
      nutritional: t(
        'Rich in natural triterpenoid saponins (natural soap lather), betulinic acid, ascorbic acid, flavonoids, and conditioning mucilage.',
        'Saponines moussantes antiseptiques naturelles, acide bétulinique et vitamine C.',
        'صابونيات طبيعية مطهرة ترغو عند الفرك بالماء، وحمض البيتولينيك، وفيتامين ج، وفلافونويدات واقية.'
      ),
      medicinalProphetic: t(
        'Natural antibacterial and antifungal shampoo and body wash; strengthens hair roots, cleanses scalp dandruff, and speeds wound healing.',
        'Shampooing et savon antiseptique naturel; fortifie les racines capillaires et élimine les pellicules.',
        'منظف ومطهر طبيعي للشعر والبشرة، يمنع تساقط الشعر، ويقضي على الفطريات وقشرة الرأس، ويسكن التهاب الحلق.'
      ),
      spiritualWisdom: t(
        'Represents the utmost boundary of created knowledge and divine majesty; purifies the believer entering both this world and the Next.',
        'Borne sacrée de la connaissance créée et symbole de pureté accompagnant l’âme vers l’éternité.',
        'منتهى علوم الخلائق، وشاهد على معراج الحبيب المصطفى، وطهور مبارك يودع به الميت دار الفناء ليستقبل دار البقاء.'
      ),
      modernScience: t(
        'Saponins and cyclopeptide alkaloids show remarkable antimicrobial action against Staphylococcus aureus and fungal dermatophytes.',
        'Action antimicrobienne prouvée contre les dermatophytes et le staphylocoque doré.',
        'أثبتت التحاليل المخبرية فاعلية مستخلص أوراق السدر في القضاء على البكتيريا العنقودية والفطريات الجلدية دون تهييج.'
      ),
    },
  },
  {
    id: 'talbinah',
    name: t('Talbinah (Barley Porridge with Milk & Honey)', 'La Talbina (Bouillie d’Orge au Lait & Miel)', 'التلبينة النبوية (حساء الشعير باللبن والعسل)'),
    scientificName: 'Hordeum vulgare with Milk and Honey',
    category: 'drinks_sustenance',
    source: 'sunnah',
    quranRefs: [],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5689',
        text: t(
          'Aisha (ra) used to recommend Talbinah for the sick and for the grieving over a deceased, saying: "I heard the Messenger of Allah ﷺ say: ‘Talbinah brings comfort to the inner heart of the patient and takes away some of his sorrow and grief.’"',
          'Aïcha recommandait la Talbina pour les malades et les affligés par un deuil, disant : « J’ai entendu le Messager d’Allah ﷺ dire : ‘La Talbina apaise le cœur du malade et dissipe une part de sa tristesse.’ »',
          'كَانَتْ عَائِشَةُ رَضِيَ اللَّهُ عَنْهَا تَأْمُرُ بِالتَّلْبِينَةِ لِلْمَرِيضِ وَلِلْمَحْزُونِ عَلَى الهَالِكِ، وَتَقُولُ: إِنِّي سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ: «إِنَّ التَّلْبِينَةَ تُجِمُّ فُؤَادَ الْمَرِيضِ، وَتَذْهَبُ بِبَعْضِ الْحُزْنِ».'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The soothing, warm prophetic broth made from whole ground barley flour gently cooked with milk and sweetened with pure honey; prescribed by the Prophet ﷺ and Aisha (ra) to relieve sorrow, depression, and mental exhaustion.',
      'La préparation réconfortante d’orge complet mijoté au lait et au miel, prescrite par le Prophète ﷺ pour dissiper la tristesse et l’épuisement moral.',
      'الحساء النبوي الرقيق المصنوع من دقيق الشعير بنخالته المغلي باللبن والمحلى بالعسل، وصفة نبوية معجزة أثبت العلم أنها تذهب الحزن وتريح الفؤاد بما تحويه من مغنيسيوم وتريبتوفان.'
    ),
    scriptureContext: t(
      'Whenever bereavement or illness struck a household in Madinah, Aisha (ra) would order a pot of Talbinah cooked. She would prepare Tharid (bread broth), pour the Talbinah over it, and tell the grieving: "Eat from it, for I heard the Prophet ﷺ testify that it relieves the heart of sorrow." Named "Talbinah" due to its soft white resemblance to milk (Laban).',
      'Lorsqu’un deuil frappait une maisonnée de Médine, Aïcha faisait mijoter de la Talbina et disait aux endeuillés : « Consommez-en, car le Messager d’Allah ﷺ a certifié qu’elle apaise le cœur souffrant et allège le chagrin. » Son nom dérive de sa blancheur semblable au lait.',
      'كانت السيدة عائشة رضي الله عنها إذا مات ميت من أهلها واجتمع النساء ثم تفرقن إلا خاصتها أمرت ببرمة من تلبينة فطُبخت، ثم صبت التلبينة على الثريد، وقالت: «كلن منها، فإني سمعت رسول الله ﷺ يقول إنها تجم فؤاد المريض وتذهب ببعض الحزن». وسُميت تلبينة لتشابه بياضها ورقتها مع اللبن.'
    ),
    botanicalTraits: {
      growthForm: t('Whole grain barley flour (with bran intact) gently simmered with milk and raw honey', 'Farine d’orge complète avec son son, mijotée au lait entier et miel sauvage', 'دقيق الشعير الكامل بنخالته مطبوخ على نار هادئة مع اللبن والعسل النقي'),
      habitat: t('Farmlands of ancient Madinah and Sham; staple prophetic grain', 'Champs d’orge de Médine et hauts plateaux de Syrie antique', 'مزارع المدينة المنورة وسهول حوران والشام الخصيبة'),
      tasteAndTexture: t('Warm, creamy, delicately nutty soup with gentle comforting sweetness', 'Velouté crémeux chaud aux douces notes de céréales et de miel', 'حساء كريمي دافئ ذو نكهة ترابية حليبية مهدئة تملأ النفس سكينة'),
    },
    benefits: {
      nutritional: t(
        'High L-tryptophan (serotonin precursor), beta-glucan soluble fiber, magnesium, zinc, B-complex vitamins, and potassium.',
        'Riche en L-tryptophane (précurseur de la sérotonine), bêta-glucanes, magnésium et vitamines B.',
        'غني بالحمض الأميني التريبتوفان المصنع لهرمون السعادة (السيروتونين)، والمغنيسيوم والبوتاسيوم وفيتامينات ب المركبة.'
      ),
      medicinalProphetic: t(
        'Soothes grief-induced myocardial stress ("Tujimmu Fu’ad al-Marid"), combats clinical depression and melancholia, lowers blood cholesterol, and coats gastric lining.',
        'Dissipe l’anxiété et la dépression, apaise les palpitations cardiaques et régule le cholestérol.',
        'تريح عضلة القلب المجهدة من الحزن، وتعالج الاكتئاب وتوتر الأعصاب، وتخفض الكولسترول الضار وتلين المعدة.'
      ),
      spiritualWisdom: t(
        'Embodies holistic prophetic medicine recognizing the profound psychosomatic link between nutrition, brain chemistry, and spiritual patience during grief.',
        'Démontre la médecine holistique prophétique reliant la biochimie cérébrale à l’apaisement spirituel du deuil.',
        'إعجاز في الطب النفسي الجسدي؛ يربط بين تغذية الجسد وراحة الروح وانشراح الصدر في أوقات المصائب.'
      ),
      modernScience: t(
        'Barley beta-glucans regulate gut-brain axis neurotransmitter synthesis; high magnesium and tryptophan significantly lower depressive rating scores in clinical trials.',
        'Les bêta-glucanes et le tryptophane de l’orge régulent l’axe intestin-cerveau et réduisent les scores d’anxiété.',
        'أثبتت الدراسات العصبية أن الشعير يعزز إفراز السيروتونين والدوبامين في الدماغ، مما يفسر علمياً عبارة ﴿تَذْهَبُ بِبَعْضِ الْحُزْنِ﴾.'
      ),
    },
  },
  {
    id: 'kamah',
    name: t('Desert Truffles (Kam’ah)', 'Les Truffes du Désert (Kam’a)', 'الكمأة (من المَنّ وماؤها شفاء للعين)'),
    scientificName: 'Terfeziaceae (Terfezia / Tirmania)',
    category: 'herbs_medicinal',
    source: 'sunnah',
    quranRefs: [],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5708',
        text: t(
          'The Prophet ﷺ said: "The truffle (Kam’ah) is from the Manna, and its water is a cure for the eyes."',
          'Le Prophète ﷺ a dit : « La truffe fait partie de la Manne, et son suc est une guérison pour les yeux. »',
          'قَالَ رَسُولُ اللَّهِ ﷺ: «الكَمْأَةُ مِنَ المَنِّ، وَمَاؤُهَا شِفَاءٌ لِلْعَيْنِ».'
        ),
      },
      {
        book: 'Muslim',
        number: '2049',
        text: t(
          'The truffles are of the Manna which Allah sent down upon the children of Israel, and their juice cures eye ailments.',
          'La truffe est de la Manne descendue sur les fils d’Israël, et son jus est un remède ophtalmique.',
          'الْكَمْأَةُ مِنَ الْمَنِّ الَّذِي أَنْزَلَ اللَّهُ عَلَى بَنِي إِسْرَائِيلَ، وَمَاؤُهَا شِفَاءٌ لِلْعَيْنِ.'
        ),
      },
    ],
    relatedProphets: ['muhammad', 'musa'],
    summary: t(
      'The subterranean desert delicacy celebrated in authentic Hadith as an offshoot of the divine Manna, whose extracted aqueous juice acts as a miraculous clinical cure for eye infections and corneal trachoma.',
      'Le trésor souterrain du désert issu de la Manne céleste, dont le suc pur guérit miraculeusement les affections oculaires et le trachome.',
      'نبات الصحراء العجيب الذي يخرج من الأرض بلا زرع ولا سقي، وصفه النبي ﷺ بأنه من المن الإلهي وأن ماءه شفاء لأمراض العيون والرمد.'
    ),
    scriptureContext: t(
      'The Prophet ﷺ declared the Kam’ah to be of the "Manna"—the miraculous food provided without human labor, plowing, or sowing, sprouting spontaneously in the desert after autumn thunderstorms. Authentic companions, including Abu Hurairah (ra), extracted its water by boiling or squeezing and applied drops directly into inflamed eyes, achieving total healing.',
      'Le Prophète ﷺ l’a rattachée à la Manne car elle croît sans semence ni labour après les orages d’automne. Abou Hurayra et les médecins musulmans extrayaient son eau distillée pour soigner le trachome et les conjonctivites avec un succès éclatant.',
      'بين النبي ﷺ أنها من المن لأنها تنبت عفواً بفضل الله بالمطر دون تكلف بذر ولا سقاية، وكان الصحابة رضوان الله عليهم يستقطرون ماءها في العين الرمدة فيبرأ بصرها بإذن الله تعالى.'
    ),
    botanicalTraits: {
      growthForm: t('Subterranean mycorrhizal desert fungus growing beneath cracking soil without stem or leaves', 'Champignon hypogé poussant sous la croûte du désert sans tige ni feuilles', 'فطر صحراوي لحمي ينمو متخفياً تحت سطح الرمال بتكافل مع جذور الرقروق'),
      habitat: t('Arid gravel plains of the Arabian Peninsula, Sham, and North Africa after lightning storms', 'Plaines caillouteuses d’Arabie et du Sahara après les pluies d’orage', 'الصحارى العربية وبوادي الشام ونجد بعد أمطار "الوسم" الرعدية'),
      tasteAndTexture: t('Earthy, savory, mushroom-like umami flesh with firm tender texture', 'Saveur umami boisée délicate et texture ferme et fondante', 'طعم غني ترابي شهي يماثل الفطر الفاخر وقوام لحمي متماسك'),
    },
    benefits: {
      nutritional: t(
        '20% high-quality protein containing all essential amino acids, potassium, iron, phosphorus, and immunomodulatory polysaccharides.',
        '20% de protéines complètes, phosphore, fer et polysaccharides immunogènes.',
        '20% بروتين نباتي كامل، غني بالحديد والفسفور والأحماض الأمينية الأساسية.'
      ),
      medicinalProphetic: t(
        'Specific ophthalmic healing ("Shifa’un lil-Ayn"): prevents corneal fibrosis, resolves trachoma, halts optic nerve inflammation, and clears conjunctivitis.',
        'Collyre naturel d’exception : enraye le trachome, prévient la fibrose cornéenne et désinfecte la conjonctive.',
        'قطرة ربانية معقمة للعين؛ تمنع تليف القرنية، وتشفي من الرمد الحبيبي (التراخوما) والتهابات ملتحمة العين.'
      ),
      spiritualWisdom: t(
        'Reminds humanity of pure divine sustenance (Manna) provided entirely free of human toil, and points toward light and clear vision.',
        'Symbole du don pur divin exempt d’effort humain et phare de clarté pour le regard.',
        'برهان على كرم الرزاق الذي يخرج من بطن الرمال القاحلة غذاءً ودواءً خالصاً دون حرث ولا بذر.'
      ),
      modernScience: t(
        'Extensive clinical trials at King Saud University showed sterile aqueous Kam’ah extract completely halted Chlamydia trachomatis bacteria and prevented blindness in trachoma patients.',
        'Les essais cliniques démontrent son efficacité totale contre Chlamydia trachomatis, empêchant la cécité trachomateuse.',
        'أثبتت الأبحاث الإكلينيكية في جامعة الملك سعود أن ماء الكمأة المعقم يقضي تماماً على بكتيريا التراخوما ويمنع عتامة القرنية.'
      ),
    },
  },
  {
    id: 'qist_hindi',
    name: t('Indian Costus & Sea Costus', 'Le Costus Indien & Marin', 'القسط الهندي والقسط البحري'),
    scientificName: 'Saussurea costus / Aucklandia costus',
    category: 'herbs_medicinal',
    source: 'sunnah',
    quranRefs: [],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5692',
        text: t(
          'Use this Indian incense (Al-Qist al-Hindi), for indeed in it are seven cures: among them is sniffing it for tonsillitis/throat swelling (Al-Udhrah) and taking it into the mouth for pleurisy (Dhat al-Janb).',
          'Soignez-vous avec ce bois indien (Al-Qist), car il renferme sept remèdes : on l’aspire par le nez contre le mal de gorge (Al-Udhra) et on l’administre par la bouche contre la pleurésie.',
          'عَلَيْكُمْ بِهَذَا العُودِ الهِنْدِيِّ، فَإِنَّ فِيهِ سَبْعَةَ أَشْفِيَةٍ: يُسْتَعَطُ بِهِ مِنَ العُذْرَةِ، وَيُلَدُّ بِهِ مِنْ ذَاتِ الجَنْبِ.'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The sacred medicinal aromatic root praised by the Prophet ﷺ as containing "seven cures," uniquely effective when inhaled as snuff for throat/tonsil swellings and taken orally for respiratory and pleurisy infections.',
      'La racine aromatique majeure de la pharmacopée prophétique renfermant « sept guérisons », notamment contre les angines et les affections pulmonaires.',
      'العود الطبي المبارك الذي أعلن النبي ﷺ أن فيه سبعة أشفية؛ يفتح انسدادات الجهاز التنفسي، ويعالج التهابات اللوزتين، ويداوي ذات الجنب وأمراض الرئة.'
    ),
    scriptureContext: t(
      'A mother brought her young child to the Prophet ﷺ having compressed his swollen uvula/tonsils painfully with her fingers. The Prophet ﷺ gently reproached her: "Why do you torment your children by pressing their palates? Upon you is this Indian wood (Qist), for in it are seven cures!" Prescribing it as a gentle nasal drops / snuff (Sa’oot) and oral suspension.',
      'Une mère amena son enfant souffrant de la gorge après lui avoir comprimé douloureusement le palais. Le Prophète ﷺ la reprit doucement : « Pourquoi tourmentez-vous vos enfants ? Utilisez ce bois indien (Qist), car il renferme sept remèdes ! »',
      'دخلت امرأة على النبي ﷺ بابن لها قد أعلقت عليه من العذرة (ضغطت على حلقه بأصابعها لعلاج اللوزتين)، فقال: «عَلَامَ تَدْغَرْنَ أَوْلَادَكُنَّ بِهَذَا الدَّغْرِ؟ عَلَيْكُنَّ بِهَذَا الْعُودِ الْهِنْدِيِّ فَإِنَّ فِيهِ سَبْعَةَ أَشْفِيَةٍ». فأرشدهن إلى الاستعاط به رفقاً بالأطفال وعلاجاً جذرياً.'
    ),
    botanicalTraits: {
      growthForm: t('Perennial alpine aromatic herb with robust medicinal rootstocks and purple florets, 1–2 m', 'Plante alpine pérenne aux rhizomes boisés parfumés et fleurs pourpres', 'عشبة جبلية معمرة ذات جذور خشبية عطرية قوية ورائحة زكية كافورية'),
      habitat: t('Sub-alpine valleys of the Himalayas and ancient maritime spice routes', 'Vallées subalpines de l’Himalaya et routes des épices de l’Océan Indien', 'سفوح جبال الهيمالايا ووديان الهند وكشمير العالية'),
      tasteAndTexture: t('Intensely bitter, warm, camphoraceous aromatic wood powder', 'Poudre de racine boisée intensément amère, camphrée et chauffante', 'طعم مر لاذع مع رائحة عطرية نفاذة تبعث الحرارة في الحلق والصدر'),
    },
    benefits: {
      nutritional: t(
        'High sesquiterpene lactones (costunolide, dehydrocostus lactone), essential aromatic terpenes, and inulin prebiotics.',
        'Lactones sesquiterpéniques (costunolide, déhydrocostus lactone) et inuline prébiotique.',
        'مركبات الكوستونويلد، واللاكتونات السيسكويتربينية، والزيوت الطيارة المطهرة للأغشية المخاطية.'
      ),
      medicinalProphetic: t(
        'Proved effective for acute tonsillitis, pharyngitis, pleurisy (Dhat al-Janb), lung phlegm clearing, thyroid regulation, and pelvic inflammatory infections.',
        'Remède d’élite des angines sévères, pleurésies, régulation de la thyroïde et infections respiratoires.',
        'علاج حاسم لالتهاب اللوزتين والحلق بالاستعاط، وتطهير الرئة من البلغم، وتنظيم هرمونات الغدة الدرقية، وعلاج ذات الجنب.'
      ),
      spiritualWisdom: t(
        'Promotes gentle, merciful pediatric care; teaches the Ummah to replace harsh folk procedures with refined botanical remedies.',
        'Incite à la douceur envers les enfants et remplace les pratiques empiriques brutales par la pharmacopée savante.',
        'الرحمة بالأطفال والنهي عن تعذيبهم بالعلاجات الشعبية المؤلمة، والاستعاضة عنها بالطب النبوي الرفيق الفعال.'
      ),
      modernScience: t(
        'Dehydrocostus lactone exhibits potent broad-spectrum antiviral and antibacterial activity against Streptococcus pyogenes, suppressing NF-κB inflammatory pathways.',
        'Action anti-streptococcique majeure et inhibition des cascades inflammatoires NF-κB.',
        'أثبتت التحاليل الطبية احتواءه على مواد مضادة للبكتيريا العقدية المسببة لالتهاب اللوزتين، ومثبطات قوية للالتهاب الرئوي.'
      ),
    },
  },
  {
    id: 'arak_siwak',
    name: t('The Toothpick Tree (Arak & Siwak)', 'L’Arbre à Brosses (Al-Arâk & Miswâk)', 'الأراك والسواك النبوي'),
    scientificName: 'Salvadora persica',
    category: 'herbs_medicinal',
    source: 'sunnah',
    quranRefs: ['34:16'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '887',
        text: t(
          'Were it not that it would be too difficult for my Ummah, I would have ordered them to use the Siwak (tooth-stick) before every prayer.',
          'Si je ne craignais de surcharger ma communauté, je leur aurais ordonné l’usage du Siwâk avant chaque prière.',
          'لَوْلاَ أَنْ أَشُقَّ عَلَى أُمَّتِي، لَأَمَرْتُهُمْ بِالسِّوَاكِ عِنْدَ كُلِّ صَلاَةٍ.'
        ),
      },
      {
        book: 'Nasa’i',
        number: '5',
        text: t(
          'The Siwak is a purification for the mouth and a pleasure to the Lord.',
          'Le Siwâk purifie la bouche et procure l’agrément du Seigneur.',
          'السِّوَاكُ مَطْهَرَةٌ لِلْفَمِ، مَرْضَاةٌ لِلرَّبِّ.'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The sacred dental brush stick cut from the fibrous roots of the Arak desert tree; praised as the supreme mouth cleanser and the Prophet’s very last wish on his deathbed before passing to the Highest Companion.',
      'Le bâtonnet d’hygiène dentaire sacré issu des racines d’Arâk, purificateur de l’haleine et dernier désir du Prophète ﷺ avant son trépas.',
      'شجرة الأراك الصحراوية التي تُقطع من جذورها أعواد السواك، مطهرة الفم ومرضاة الرب، وآخر ما حرص عليه النبي ﷺ في حجر عائشة قبل أن يلحق بالرفيق الأعلى.'
    ),
    scriptureContext: t(
      'Mentioned in the Qur’an in Surah Saba as "Khamt" (Arak trees) yielding bitter fruit. In the Sunnah, the Siwak holds a towering status of daily hygiene: upon waking, before Wudu, before each of the 5 prayers, upon entering home, and before reciting Qur’an. In the final minutes of the Prophet’s earthly life, Abd al-Rahman entered with a fresh Siwak; the Prophet gazed at it longingly, so Aisha softened it with her saliva, and he brushed his teeth with vigor until his breath was clean and fragrant.',
      'Mentionné dans le Coran comme l’arbuste Khamt de Saba. Dans la Sunnah, son usage est constant avant chaque prière, au réveil et au retour au foyer. Sur son lit de mort, le Prophète ﷺ fixa du regard le Siwâk de son beau-frère; Aïcha l’amollit et le lui tendit pour qu’il se purifie les dents une dernière fois avant son élévation.',
      'ذُكرت شجرته في سورة سبأ: ﴿وَبَدَّلْنَاهُمْ بِجَنَّتَيْهِمْ جَنَّتَيْنِ ذَوَاتَيْ أُكُلٍ خَمْطٍ وَأَثْلٍ﴾. وكان النبي ﷺ يستاك إذا قام من النوم وعند كل وضوء وصلاة. وفي سكرات الموت الأخيرة، رأت عائشة رضي الله عنها بصره يرمق سواكاً في يد أخيها عبد الرحمن، فطيبته له واستنّ به أحسن استنان قبل أن يفارق الدنيا.'
    ),
    botanicalTraits: {
      growthForm: t('Evergreen desert shrub with intertwined tortuous branches and fleshy leaves, 2–4 m', 'Arbuste désertique touffu aux branches entrelacées et racines spongieuses', 'شجيرة صحراوية خضراء معمرة ذات جذوع متشابكة وجذور تمتد أفقياً تحت الرمال'),
      habitat: t('Arid coastal lowlands and sandy valleys of Western Arabia and Tihamah', 'Plaines littorales arides de Tihâma et oueds du Hedjaz', 'أودية تهامة وسهول البحر الأحمر وأودية مكة والمدينة'),
      tasteAndTexture: t('Pleasantly peppery and aromatic fibrous brush fibers releasing refreshing cleansing froth', 'Fibres spongieuses libérant une sève piquante fraîche et aromatique', 'ألياف شعيرية لينة تنفرج كالفرشاة تفرز مادة لاذعة معقمة تنعش الفم'),
    },
    benefits: {
      nutritional: t(
        'Natural micro-fine silica abrasives, sodium bicarbonate, salvadorine alkaloid, tannic acid, bioavailable fluoride, and vitamin C.',
        'Silice douce abrasive, salvadorine antibactérienne, fluor naturel et vitamine C.',
        'فلورايد طبيعي، وسيليكا مبيضة للأسنان، ومادة السلفادورين القاتلة للجراثيم، وحمض التانيك المقوي للثة.'
      ),
      medicinalProphetic: t(
        'Prevents dental caries, strengthens and tones gingival margins, eliminates halitosis, inhibits dental plaque formation, and cleanses vocal cords.',
        'Prévient les caries, tonifie les gencives, élimine la plaque dentaire et rafraîchit l’haleine durablement.',
        'يبيض الأسنان طبيعياً، ويشد اللثة المترهلة ويوقف نزيفها، ويقضي على بكتيريا تسوس الأسنان ورائحة الفم الكريهة.'
      ),
      spiritualWisdom: t(
        'Cleanliness elevated to divine worship: pairing oral hygiene directly with prayer and divine remembrance.',
        'Sublime l’hygiène bucco-dentaire en acte d’adoration préparant la bouche à la récitation des paroles sacrées.',
        'الارتقاء بنظافة الجسد وطيب الرائحة لتكون عبادة وقربة إلى الله، وتطييب الفم الذي يتلو كلام الله.'
      ),
      modernScience: t(
        'WHO (World Health Organization) endorsed Salvadora persica miswak as an exceptionally effective alternative to synthetic toothbrushes, yielding superior anti-plaque activity.',
        'Recommandé par l’OMS : action antibactérienne supérieure aux brosses en nylon et baisse drastique de la gingivite.',
        'اعتمدت منظمة الصحة العالمية (WHO) السواك أداة طبية فعالة في مكافحة تسوس الأسنان والتهابات اللثة تفوق الفرشاة البلاستيكية.'
      ),
    },
  },
  {
    id: 'zanjabil',
    name: t('Ginger', 'Le Gingembre', 'الزنجبيل (مزاج شراب الأبرار)'),
    scientificName: 'Zingiber officinale',
    category: 'heavenly',
    source: 'quran',
    quranRefs: ['76:17'],
    hadithRefs: [],
    relatedProphets: ['muhammad'],
    summary: t(
      'The heavenly warming spice mentioned in Surah Al-Insan as the flavor infused into the cups of the Righteous in Paradise; a universal digestive and anti-inflammatory tonic.',
      'L’épice céleste de la sourate Al-Insân infusée dans les calices des Justes au Paradis; tonique digestif et anti-inflammatoire majeur.',
      'نبات الجنة العطر الذي يُخلط به شراب الأبرار في سورة الإنسان: ﴿وَيُسْقَوْنَ فِيهَا كَأْسًا كَانَ مِزَاجُهَا زَنْجَبِيلًا﴾، دواء هاضم مسخن للمعدة ومنقٍ للشرايين.'
    ),
    scriptureContext: t(
      'In Surah Al-Insan (76:17), Allah describes the exalted rewards of the righteous servants: "And they will be given to drink therein a cup whose mixture is of ginger, from a spring therein named Salsabil." The warming, fragrant ginger balance contrasts with the cooling spring of camphor mentioned earlier in the surah, illustrating the perfect equilibrium of heavenly delights.',
      'Dans la sourate Al-Insân, Dieu décrit le breuvage des élus : « Et ils y seront abreuvés d’une coupe dont le mélange sera de gingembre, puisé à une source nommée Salsabîl. » Cette épice chaleureuse équilibre la fraîcheur du camphre céleste.',
      'وصف الله تعالى كرامة الأبرار في جنات النعيم فقال: ﴿وَيُسْقَوْنَ فِيهَا كَأْسًا كَانَ مِزَاجُهَا زَنْجَبِيلًا * عَيْنًا فِيهَا تُسَمَّى سَلْسَبِيلًا﴾، ليمزج لهم بين لذة البرودة ولذة الدفء العطري المنعش.'
    ),
    botanicalTraits: {
      growthForm: t('Perennial reed-like herb with aromatic underground rhizomes and leafy shoots, 1 m', 'Plante vivace aux rhizomes noueux très aromatiques et tiges feuillées', 'عشبة معمرة ذات ريزومات لحمية معقدة تحت الأرض تفوح بعبير عطري نفاذ'),
      habitat: t('Tropical moist soils, warm humid valley basins', 'Sols chauds, humides et riches des vallées subtropicales', 'الأراضي الرطبة الدافئة الغنية بالعناصر العضوية'),
      tasteAndTexture: t('Pungent, zesty, hot aromatic bite with sweet warming citrus undertones', 'Saveur piquante, chaleureuse et citronnée très aromatique', 'طعم حار لاذع ممتع يبعث الدفء والحيوية مع نفحة ليمونية منعشة'),
    },
    benefits: {
      nutritional: t(
        'Abundant gingerols, shogaols, zingerone, paradols, essential zingiberene oils, and digestive enzymes.',
        'Gingérols puissants, shogaols, zangibérène et enzymes digestives.',
        'مركبات الجينجيرول والشوجاول والزنبرين، ومضادات الأكسدة المسخنة للجسم.'
      ),
      medicinalProphetic: t(
        'Stimulates gastric secretion, relieves nausea and morning sickness, soothes throat hoarseness, dispels joint stiffness, and expands peripheral blood flow.',
        'Anti-nauséeux souverain, dégage les voies respiratoires, stimule la digestion et soulage les rhumatismes.',
        'يطرد الغازات، ويسهل الهضم، ويسكن الغثيان ودوار الحركة، ويدفئ الأطراف الباردة، ويسكن آلام المفاصل.'
      ),
      spiritualWisdom: t(
        'Evokes the balance of opposites in Paradise: combining the warmth of ginger with the pristine coolness of Salsabil to represent spiritual wholeness.',
        'Allie la chaleur bienfaisante à la pureté céleste pour évoquer la plénitude de la félicité paradisiaque.',
        'الجمع الإعجازي بين الدفء والانتعاش في نعيم الجنة، رمز لاكتمال اللذة وتمام الصحة في دار الخلود.'
      ),
      modernScience: t(
        'Proven to outperform over-the-counter antiemetics for motion sickness and pregnancy nausea; exerts potent anti-inflammatory effects matching prescription NSAIDs.',
        'Efficacité clinique supérieure aux antiémétiques de synthèse; puissant anti-inflammatoire sans effets secondaires.',
        'أكدت التجارب السريرية تفوقه على الأدوية الكيميائية في علاج الغثيان والقيء وتسكين آلام المفاصل والتهابات القولون.'
      ),
    },
  },
  {
    id: 'battikh',
    name: t('Watermelon with Fresh Dates', 'La Pastèque aux Dattes Fraîches', 'البطيخ بالرطب'),
    scientificName: 'Citrullus lanatus with Phoenix dactylifera',
    category: 'fruits',
    source: 'sunnah',
    quranRefs: [],
    hadithRefs: [
      {
        book: 'Abu Dawud',
        number: '3836',
        text: t(
          'The Messenger of Allah ﷺ used to eat watermelon with fresh ripe dates (Rutab), saying: "We break the heat of this with the coldness of that, and the coldness of that with the heat of this."',
          'Le Messager d’Allah ﷺ mangeait la pastèque avec des dattes fraîches et disait : « Nous brisons la chaleur de celles-ci par la fraîcheur de celle-là, et la fraîcheur de celle-là par la chaleur de celles-ci. »',
          'كَانَ رَسُولُ اللَّهِ ﷺ يَأْكُلُ البِطِّيخَ بِالرُّطَبِ، فَيَقُولُ: «نَكْسِرُ حَرَّ هَذَا بِبَرْدِ هَذَا، وَبَرْدَ هَذَا بِحَرِّ هَذَا».'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The prophetic dietary pairing of cool, hydrating watermelon with warm, nutrient-dense fresh dates, establishing the nutritional principle of thermodynamic metabolic balance.',
      'L’association diététique prophétique harmonieuse de la pastèque désaltérante et des dattes douces, modèle d’équilibre métabolique.',
      'الهدي النبوي الشريف في الجمع بين فاكهتين متكاملتين: البطيخ المرطب البارد والرطب الحار المغذي، لتحقيق التوازن الغذائي والحراري في الجسم.'
    ),
    scriptureContext: t(
      'In the arid climate of Madinah, Prophet Muhammad ﷺ practiced and recommended combining foods of complementary qualities. Fresh ripe dates are warming, calorically dense, and rich in natural sugars, while sweet watermelon is cooling, hydrating, and packed with structured water and electrolytes. By consuming them together, each tempers the potential excess of the other.',
      'Dans le climat désertique de Médine, le Prophète ﷺ unissait la fraîcheur aqueuse de la pastèque à la richesse énergétique des dattes pour une assimilation digestive optimale.',
      'كان النبي ﷺ يعلم أصحابه التوازن الغذائي الطبيعي، فالرطب حار ذو طاقة سريعة، والبطيخ بارد غني بالماء والأملاح، فكان يجمعهما في الأكل ليكسر حرارة هذا برطوبة وبرودة ذاك.'
    ),
    botanicalTraits: {
      growthForm: t('Large sprawling annual desert vine with deeply lobed leaves and massive spherical fruit', 'Vigne rampante du désert portant de lourds fruits sphériques jaspés', 'نبات عشبي زاحف يفرش أغصانه على الرمال وتخرج منه ثمار كروية خضراء مخططة'),
      habitat: t('Sunny desert loam, arid sandy valleys with alluvial deposits', 'Sols sablonneux chauds et plaines alluviales baignées de soleil', 'السهول الرملية الدافئة والأودية المشمسة في يثرب واليمامة'),
      tasteAndTexture: t('Crisp, succulent crimson melon flesh brimming with cold honeyed nectar', 'Chair rouge rubis juteuse, fraîche et désaltérante', 'لحم قرمزي مقرمش يفيض بالعصارة المنعشة الباردة'),
    },
    benefits: {
      nutritional: t(
        '92% cellular structured water, supreme lycopene concentration (higher than raw tomatoes), L-citrulline amino acid, potassium, and vitamin A.',
        '92% d’eau hautement hydratante, lycopène antioxydant record et L-citrulline vasodilatatrice.',
        '92% ماء قلوي مرطب، وأعلى تركيز لمادة الليكوبين الواقية من الأورام، وحمض السيترولين المساعد على تروية الشرايين.'
      ),
      medicinalProphetic: t(
        'Flushes renal tubules, cleanses urinary tract, prevents heat exhaustion and dehydration, and dilates vascular smooth muscle via nitric oxide.',
        'Draine les reins, prévient les coups de chaleur et stimule la synthèse d’oxyde nitrique.',
        'يغسل الكلى والمثانة، ويمنع حصوات البول، ويقي من ضربات الشمس وجفاف الصيف، ويحسن تدفق الدم في الأوعية.'
      ),
      spiritualWisdom: t(
        'Teaches moderation, balance, and the conscious harmony of opposites in nourishing the human vessel.',
        'Inculque la modération et l’harmonie des contraires dans la préservation de la santé du corps.',
        'درس في الاعتدال ومراعاة طبائع الأغذية، وأن الشريعة جاءت لإصلاح الأبدان كما جاءت لإصلاح الأديان.'
      ),
      modernScience: t(
        'L-citrulline converts to L-arginine, boosting endothelial nitric oxide (NO) production to lower arterial stiffness and reduce post-exercise muscle soreness.',
        'La L-citrulline stimule l’oxyde nitrique, détend les parois artérielles et réduit les courbatures musculaires.',
        'أثبتت الدراسات الرياضية أن حمض السيترولين يوسع الشرايين ويخفض ضغط الدم ويمنع الإجهاد العضلي بعد بذل الجهد.'
      ),
    },
  },
]
