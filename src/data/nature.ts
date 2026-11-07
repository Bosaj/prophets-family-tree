import type { L3 } from './types'

const t = (en: string, fr: string, ar: string): L3 => ({ en, fr, ar })
const t4 = (en: string, fr: string, ar: string, es: string): L3 => ({ en, fr, ar, es })

export type AnimalCategory = 'birds' | 'mammals' | 'insects' | 'marine' | 'reptiles' | 'amphibians'
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
        number: '3380',
        text: t(
          'When the Prophet ﷺ passed by Al-Hijr (the dwellings of Thamud), he said: "Do not enter the houses of those who were unjust to themselves unless you enter weeping, lest you suffer what they suffered." Then he covered his face with his sheet and hastened on.',
          'En passant près d’Al-Hijr (demeures de Thamûd), le Prophète ﷺ dit : « N’entrez dans les demeures de ceux qui ont été injustes envers eux-mêmes qu’en pleurant, de peur de subir ce qu’ils ont subi. » Puis il se couvrit le visage et hâta le pas.',
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
      'قُتل رجل ثري من بني إسرائيل ولم يُعرف قاتله، فكادت تقع فتنة عظيمة بين القبائل، فسألوا موسى عليه السلام، فقال: ﴿إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تَذْبَحُوا بَقَرَةً﴾. فاستكبروا وسخروا وقالوا أتتخذنا هزواً؟ ثم شددوا على أنفسهم بالسؤال عن سنها ولونها وعملها، فشدد الله عليهم حتى حددها بصفات نادرة: ﴿صَفْرَاءُ فَاقِعٌ لَوْنُهَا تَسُرُّ النَّاظِرِينَ﴾ (البقرة 69) و﴿لَا ذَلُولٌ تُثِيرُ الْأَرْضَ وَلَا تَسْقِي الْحَرْثَ مُسَلَّمَةٌ لَا شِيَةَ فِيهَا﴾ (البقرة 71). فاشتروها بملء جلدها ذهباً وذبحوها وضربوا الميت ببعضها فقام بإذن الله حياً وأشار إلى قاتله ثم مات.'
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
        book: 'Musnad Ahmad 11792 (graded sahih by al-Albani); a shorter account of a speaking wolf is in Sahih al-Bukhari',
        number: '3471',
        text: t(
          'A wolf seized a sheep, so the shepherd chased it and retrieved the sheep. The wolf sat upon its tail and spoke: "Do you take from me sustenance that Allah provided me?" The shepherd said: "How astonishing, a speaking wolf!" The wolf said: "Shall I tell you of something more astonishing? A Prophet in Yathrib telling people of past news!" The shepherd came to the Prophet ﷺ and embraced Islam. (Wording of Musnad Ahmad.)',
          'Un loup ravit une brebis qu’un berger lui reprit. Le loup s’assit et parla : « Me prives-tu d’une subsistance qu’Allah m’a accordée ? » Le berger s’écria : « Un loup qui parle ! » Le loup lui dit : « T’informerai-je d’un prodige plus grand ? Un Prophète à Yathrib vous annonce les récits du passé ! » (Version du Musnad Ahmad.)',
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
    id: 'ba_udah',
    name: t('The Mosquito & Micro-Organisms', 'Le Moustique et Micro-organismes', 'البعوضة وما فوقها'),
    scientificName: 'Culicidae (Culex / Anopheles)',
    arabicCalligraphy: 'إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا',
    category: 'insects',
    source: 'quran_and_sunnah',
    quranRefs: ['2:26'],
    hadithRefs: [
      {
        book: 'Tirmidhi',
        number: '2320',
        text: t(
          'If this worldly life were worth the wing of a mosquito to Allah, He would not have granted a disbeliever even a single sip of water from it.',
          'Si ce bas-monde valait auprès d’Allah ne serait-ce que l’aile d’un moustique, Il n’aurait pas abreuvé un mécréant d’une seule gorgée d’eau.',
          'لَوْ كَانَتِ الدُّنْيَا تَعْدِلُ عِنْدَ اللَّهِ جَنَاحَ بَعُوضَةٍ، مَا سَقَى كَافِراً مِنْهَا شَرْبَةَ مَاءٍ.'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The diminutive insect cited in Surah Al-Baqarah (2:26) whose micro-engineering astounds science: carrying ectoparasitic water mites living upon its body, equipped with 100 compound eyes, 3 hearts, 6 surgical micro-blades, and infrared thermoreception.',
      'L’insecte mentionné dans la sourate Al-Baqarah (2:26) dont la biomécanique prodigieuse recèle des acariens parasites vivant sur son corps, 100 yeux composés, 3 cœurs et 6 micro-aiguilles chirurgicales.',
      'الحشرة المعجزة المذكورة في سورة البقرة التي كشف العلم عن تعقيدها المجهري الفائق: طفيليات ميكروسكوبية تعيش فوق ظهرها، و100 عين مركبة، و3 قلوب، و6 إبر جراحية دقيقة، ومستقبلات حرارية ترصد 0.001 درجة.'
    ),
    whatTheyDid: t(
      'When polytheists questioned why the Creator would cite small insects, Allah revealed: "Indeed, Allah is not timid to present an example — that of a mosquito or what is above it (فما فوقها)." Modern electron microscopy confirmed that adult mosquitoes carry specialized ectoparasitic water mites (Arrenurus spp.) firmly anchored atop their thorax and abdomen, sucking their fluids — a whole living ecosystem thriving upon the mosquito.',
      'Face aux moqueries des mécréants sur la petitesse des insectes, Allah révéla : « Certes, Allah ne se gêne point de citer en exemple un moustique ou quoi que ce soit au-dessus. » La microscopie électronique confirma que des acariens parasites vivent littéralement ancrés au-dessus du moustique.',
      'عندما استنكر المشركون ذكر الذباب والعنكبوت في القرآن نزل قوله تعالى: ﴿إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا﴾. وكشف المجهر الإلكتروني الحديث عن وجود كائنات دقيقة وحشرات طفيلية من حلم الماء (Arrenurus) تعيش متطفلة ملتصقة بظهر وصدر البعوضة وتتغذى عليها، محققة الإعجاز اللفظي الدقيق للآية.'
    ),
    physicalTraits: {
      size: t('3–6 mm body length, 1.5–2.5 mg weight', '3–6 mm de long, 1,5–2,5 mg', 'طول 3-6 مم، ووزن لا يتجاوز 2 مليغرام'),
      habitat: t('Freshwater pools, marshes, vegetation, urban basins', 'Eaux stagnantes, marais et zones végétalisées', 'المياه الراكدة، البرك العذبة، والمستنقعات'),
      uniqueFeature: t('Ectoparasitic mites living on its back; 6-needle proboscis, 3 hearts, 100 compound eye lenses', 'Acariens parasites sur son dos, trompe à 6 micro-bistouris, 3 cœurs et 100 facettes optiques', 'طفيليات مجهرية تعلو ظهرها، وخرطوم بـ 6 إبر جراحية دقيقة، و3 قلوب، و100 عين مركبة'),
    },
    motion: {
      animationType: 'fly',
      strideLength: 'Rapid wingbeat at 400–600 Hz producing characteristic acoustic pitch',
      paceDescription: t('Ultralight aerodynamic hovering and precision skin landing without tactile detection', 'Vol stationnaire ultra-léger et atterrissage indolore', 'طيران انسيابي خفيف بسرعة خفقان أجنحة 600 هرتز وهبوط غير محسوس على الجلد'),
      soundOrSignal: t('Auditory flight hum and antenna pheromone/CO2 chemical tracking', 'Bourdonnement acoustique caractéristique et thermoréception infrarouge', 'طنين خفقان الأجنحة واستشعار غاز ثاني أكسيد الكربون وحرارة الأجسام'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Teaches that divine grandeur is revealed in the smallest creations; illustrates the insignificance of worldly pride compared to eternity.',
        'Montre que la grandeur divine éclate dans l’infiniment petit et rappelle la vanité des illusions terrestres.',
        'برهان على عظمة الخالق في أدق المخلوقات، وتذكير بحقارة الدنيا وزوالها وأنها لا تزن عند الله جناح بعوضة.'
      ),
      sunnahGuidance: t(
        'The Prophet ﷺ used the wing of a mosquito as an eloquent metaphor for the absolute insignificance of worldly vanity without faith.',
        'Le Prophète ﷺ prit l’aile de moustique comme parabole de l’insignifiance de l’orgueil matériel.',
        'ضرب النبي ﷺ جناح البعوضة مثلاً بليغاً لهوان الدنيا الزائلة عند الله تعالى.'
      ),
      scientificEcological: t(
        'Micro-engineering wonder: host to specialized Arrenurus parasites; aquatic larvae serve as foundation for freshwater ecosystems; males act as essential plant pollinators.',
        'Merveille biomécanique : hôte d’acariens parasites, base trophique aquatique et pollinisation par les mâles.',
        'معجزة في الهندسة الحيوية: كائنات تعلو ظهرها، ويرقاتها أساس للسلسلة الغذائية في المياه العذبة، وذكورها ملقحات هامة للنباتات.'
      ),
      practicalBenefits: t(
        'Biomimetic design of painless micro-needles and surgical micro-injectors based on the serrated mosquito proboscis.',
        'Conception de micro-aiguilles indolores et de scalpels chirurgicaux inspirés de la trompe du moustique.',
        'تصميم إبر طبية دقيقة غير مؤلمة للحقن وسحب الدم مستوحاة من التركيب المشرطي لخرطوم البعوضة.'
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
        number: '2849, 2852',
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
  {
    id: 'hamama',
    name: t('Dove & Pigeon', 'Colombe et Pigeon', 'الحمامة واليمامة'),
    scientificName: 'Columba livia',
    category: 'birds',
    source: 'sunnah',
    quranRefs: [],
    hadithRefs: [
      {
        book: 'Musnad Ahmad',
        number: '3251',
        text: t(
          'During the Hijrah, the Quraysh trackers reached Cave Thawr but saw a spider’s web over its mouth and turned back (Musnad Ahmad 3251; scholars differ on its grade). The report that two doves also nested there comes from weaker narrations and is not established.',
          'Lors de l’Hégire, les poursuivants de Quraych arrivèrent à la grotte de Thawr mais virent une toile d’araignée à l’entrée et rebroussèrent chemin (Musnad Ahmad 3251 ; son degré est discuté). Le récit des deux colombes qui y auraient niché vient de narrations plus faibles et n’est pas établi.',
          'فَأَمَرَ اللَّهُ تَعَالَى شَجَرَةً فَنَبَتَتْ، وَأَمَرَ الْعَنْكَبُوتَ فَنَسَجَتْ، وَأَمَرَ حَمَامَتَيْنِ فَبَاضَتَا عَلَى فَمِ الْغَارِ، فَصَرَفَ اللَّهُ بِذَلِكَ أَعْيُنَ الْمُشْرِكِينَ عَنْهُمَا.'
        ),
      },
      {
        book: 'Bukhari',
        number: '1833',
        text: t(
          'The Prophet ﷺ said regarding Mecca: "Allah made this city sacred... its game (including the sanctuary pigeons) shall not be chased or frightened, and its thorny trees shall not be cut."',
          'Le Prophète ﷺ déclara au sujet de La Mecque : « Allah a sanctifié cette cité... son gibier ne doit point être pourchassé ou effrayé. »',
          'إِنَّ هَذَا الْبَلَدَ حَرَّمَهُ اللَّهُ يَوْمَ خَلَقَ السَّمَاوَاتِ وَالأَرْضَ... لاَ يُنَفَّرُ صَيْدُهُ، وَلاَ يُعْضَدُ شَوْكُهُ.'
        ),
      },
      {
        book: 'Abu Dawud',
        number: '2675',
        text: t(
          'Companions took the two young of a small bird (ḥummarah — not a dove), and she fluttered over them in distress. The Prophet ﷺ said: "Who has distressed this bird by taking her young? Return her young to her." The lesson is mercy to all birds.',
          'Des compagnons prirent les deux petits d’un petit oiseau (ḥummarah — pas une colombe) qui voletait de détresse. Le Prophète ﷺ dit : « Qui a affligé cet oiseau en prenant ses petits ? Rendez-les-lui. » La leçon : la miséricorde envers tous les oiseaux.',
          'مَنْ فَجَعَ هَذِهِ بِوَلَدِهَا؟ رُدُّوا وَلَدَهَا إِلَيْهَا.'
        ),
      },
    ],
    relatedProphets: ['muhammad'],
    summary: t(
      'The dove is not named in the Qur’an. In the Sunnah, the game of the Sacred Mosque — including its pigeons — may not be chased or frightened. The dove of Noah’s Ark with an olive leaf comes from the Biblical account (Genesis 8), not from Islamic sources.',
      'La colombe n’est pas nommée dans le Coran. Dans la Sunna, le gibier du territoire sacré de La Mecque — dont ses pigeons — ne doit être ni chassé ni effrayé. La colombe de l’Arche avec un rameau d’olivier vient du récit biblique (Genèse 8), non des sources islamiques.',
      'لم تُذكر الحمامة في القرآن. وفي السنة أن صيد الحرم — ومنه حمامه — لا يُنفَّر ولا يُصاد. أما حمامة سفينة نوح وغصن الزيتون فمن الرواية التوراتية (سفر التكوين 8) لا من المصادر الإسلامية.',
    ),
    whatTheyDid: t(
      'Pigeons of the Haram in Mecca live under the sanctity the Prophet ﷺ declared for the city: its game is not to be frightened. Popular stories add doves nesting at Cave Thawr during the Hijrah and Noah’s dove after the Flood; the first rests on weak narrations and the second on the Bible, so they are shown here only as tradition.',
      'Les pigeons du Haram de La Mecque vivent sous l’inviolabilité que le Prophète ﷺ a déclarée pour la cité : on n’effraie pas son gibier. Des récits populaires ajoutent des colombes nichant à la grotte de Thawr et la colombe de Noé après le Déluge ; le premier repose sur des narrations faibles, le second sur la Bible : ils ne sont présentés ici que comme tradition.',
      'حمام الحرم بمكة في حمى الحرمة التي أعلنها النبي ﷺ للبلد، فلا يُنفَّر صيده. وتضيف القصص الشائعة حمامتين عششتا على غار ثور، وحمامة نوح بعد الطوفان؛ والأولى روايات ضعيفة والثانية من التوراة، فتُذكران هنا على أنهما رواية لا أكثر.',
    ),
    physicalTraits: {
      size: t('32–37 cm length, 64–72 cm wingspan', '32–37 cm de long, 64–72 cm d’envergure', 'طولها 32-37 سم، وامتداد جناحيها 64-72 سم'),
      habitat: t('Rocky cliffs, ancient sanctuaries, desert oases, and mountain clefts', 'Falaises rocheuses, sanctuaires anciens, oasis désertiques', 'المنحدرات الصخرية، واحات النخيل، وجنبات الحرمين الشريفين'),
      uniqueFeature: t('Iridescent neck plumage, incredible homing compass, and production of antioxidant crop milk', 'Plumage irisé au cou, compas magnétique inné et sécrétion de lait de jabot protecteur', 'ريش عنق قزحي متلألئ، بوصلة مغناطيسية فطرية، وإفراز لبن الحوصلة الغني بالمناعة'),
    },
    motion: {
      animationType: 'fly',
      strideLength: 'Swift direct clapping flight up to 80 km/h',
      paceDescription: t('Graceful wing clapping and gliding with rapid horizontal speed', 'Vol battu direct et rapide avec d’amples planés', 'طيران سريع مستقيم مع رفرفة قوية وانزلاق هوائي انسيابي رشيق'),
      soundOrSignal: t('Gentle repetitive "coo-coo-roo" cooing inspiring tranquility', 'Roucoulement doux et apaisant', 'هديل عذب رقيق "هدل" يبعث على الطمأنينة والسكينة'),
    },
    benefitsAndWisdom: {
      spiritual: t(
        'Teaches trust in Allah (Tawakkul) and divine security; the Prophet ﷺ said: "If you trusted in Allah with true reliance, He would provide for you as He provides for the birds: they go out hungry in the morning and return full at evening."',
        'Incarne la confiance totale en Allah (Tawakkul) : « Si vous vous en remettiez à Allah d’une confiance véritable, Il vous pourvoirait comme Il pourvoit aux oiseaux... »',
        'رمز التوكل على الله وحسن الظن به؛ قال النبي ﷺ: «لَوْ أَنَّكُمْ كُنْتُمْ تَوَكَّلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرُزِقْتُمْ كَمَا تُرْزَقُ الطَّيْرُ تَغْدُو خِمَاصًا وَتَرُوحُ بِطَانًا».'
      ),
      sunnahGuidance: t(
        'Prophetic prohibition against harming nesting birds or separating a mother bird from her young; strict legal inviolability of birds within the sacred precincts of Mecca and Medina.',
        'Interdiction formelle de séparer une mère oiseau de ses petits et protection légale absolue dans les Sanctuaires sacrés.',
        'النهي النبوي المشدد عن فجع الطير في فراخه أو صيد حمام الحرم، وتكريس مبدأ الرحمة الشاملة بكافة الكائنات الحية.'
      ),
      scientificEcological: t(
        'Advanced magnetoreception utilizing cryptochrome retinal pigments and atmospheric infrasound mapping for homing precision over thousands of kilometers; rich seed disperser regenerating desert flora.',
        'Sens magnétique fondé sur les cryptochromes rétiniens permettant un retour au nid sur des milliers de kilomètres; disséminateur végétal clé.',
        'تمتلك بوصلة بصرية مغناطيسية تعتمد على صبغات الكريبتوكروم وشبكة استشعار الموجات تحت الصوتية، مع إفراز لبن الحوصلة الفريد الغني بمضادات الأكسدة والأجسام المضادة.'
      ),
      practicalBenefits: t(
        'Ancient long-distance carrier messaging system (Al-Hammam az-Zajil) trusted for centuries across the Islamic realm for urgent communication and relief.',
        'Réseau postal aérien historique (Pigeon voyageur) utilisé pendant des siècles à travers les califats islamiques.',
        'أساس البريد الجوي السريع في الحضارة الإسلامية (الحمام الزاجل)، ومصدر طبيعي لتخصيب التربة وتكاثر الغطاء النباتي.'
      ),
    },
  },
  // ---- Added in 2.6.0: more animals named in the Qur'an ----
  {
    id: 'ibil',
    name: t4('Camels', 'Les chameaux', 'الإبل', 'Los camellos'),
    scientificName: 'Camelus dromedarius',
    category: 'mammals',
    source: 'quran_and_sunnah',
    quranRefs: ['88:17-20', '16:5-7'],
    hadithRefs: [
      { book: 'Bukhari', number: '2731', text: t4('At al-Hudaybiyah the Prophet’s ﷺ camel al-Qaswa’ knelt; he said she was held back by the One who held back the elephant.', 'À al-Hudaybiya, la chamelle du Prophète ﷺ, al-Qaswa’, s’agenouilla ; il dit qu’elle était retenue par Celui qui avait retenu l’éléphant.', 'بركت القصواء ناقة النبي ﷺ بالحديبية فقال: حبسها حابس الفيل.', 'En al-Hudaybiya la camella del Profeta ﷺ, al-Qaswa’, se arrodilló; dijo que la retenía Quien retuvo al elefante.') },
    ],
    relatedProphets: ['salih', 'muhammad'],
    summary: t4(
      'The Qur’an asks: “Do they not look at the camels, how they were created?” (88:17). Camels carried the Arabs, their trade, and the Prophet ﷺ on the Hijra.',
      'Le Coran demande : « Ne regardent-ils pas les chameaux, comment ils ont été créés ? » (88:17). Les chameaux portaient les Arabes, leur commerce, et le Prophète ﷺ lors de l’Hégire.',
      'يقول الله تعالى: «أفلا ينظرون إلى الإبل كيف خُلقت» (88:17). حملت الإبل العرب وتجارتهم، وحملت النبي ﷺ في هجرته.',
      'El Corán pregunta: «¿No miran a los camellos, cómo fueron creados?» (88:17). Los camellos llevaban a los árabes, su comercio y al Profeta ﷺ en la Hégira.',
    ),
    whatTheyDid: t4(
      'The verse names the camel first among four signs seen every day: the camel, the sky, the mountains and the earth (88:17-20). Livestock also carry loads “to a land you could not reach except with great hardship” (16:7).',
      'Le verset cite le chameau en premier parmi quatre signes vus chaque jour : le chameau, le ciel, les montagnes et la terre (88:17-20). Les bestiaux portent aussi les charges « vers un pays que vous n’atteindriez qu’avec peine » (16:7).',
      'ذكرت الآية الإبل أولًا بين أربع آيات تُرى كل يوم: الإبل والسماء والجبال والأرض (88:17-20)، والأنعام تحمل الأثقال «إلى بلد لم تكونوا بالغيه إلا بشق الأنفس» (16:7).',
      'El versículo nombra al camello primero entre cuatro signos que se ven cada día: el camello, el cielo, las montañas y la tierra (88:17-20). El ganado también lleva cargas «a una tierra a la que no llegaríais sino con gran esfuerzo» (16:7).',
    ),
    physicalTraits: {
      size: t('1.8–2 m at the shoulder; 400–600 kg', '1,8 à 2 m au garrot ; 400 à 600 kg', 'ارتفاعه 1.8-2 م، ووزنه 400-600 كغ'),
      habitat: t('Deserts of Arabia and North Africa', 'Déserts d’Arabie et d’Afrique du Nord', 'صحاري الجزيرة العربية وشمال أفريقيا'),
      uniqueFeature: t('A hump of fat, wide padded feet, and nostrils and eyelashes that keep out sand', 'Une bosse de graisse, de larges pieds coussinés, des narines et des cils qui arrêtent le sable', 'سنام من الشحم، وخفاف عريضة، ومناخر وأهداب تمنع الرمل'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Long pacing gait: both legs of one side move together',
      paceDescription: t('A swaying, unhurried walk across the sand', 'Une marche ondulante et tranquille sur le sable', 'مشية متمايلة هادئة على الرمل'),
      soundOrSignal: t('Deep rumbling grunts', 'Grognements sourds', 'رغاء عميق'),
    },
    benefitsAndWisdom: {
      spiritual: t('Looking with reflection at ordinary things leads to their Creator: the Qur’an starts with the camel.', 'Regarder avec réflexion les choses ordinaires mène à leur Créateur : le Coran commence par le chameau.', 'التأمل في المألوف يدل على خالقه، وقد بدأ القرآن بالإبل.'),
      sunnahGuidance: t('The Prophet’s ﷺ camel al-Qaswa’ carried him; at al-Hudaybiyah he said she was held back by the One who held back the elephant (Bukhari 2731).', 'Sa chamelle al-Qaswa’ le portait ; à al-Hudaybiya il dit qu’elle était retenue par Celui qui avait retenu l’éléphant (Bukhari 2731).', 'كانت القصواء ناقته ﷺ، وقال يوم الحديبية: حبسها حابس الفيل (البخاري 2731).'),
      scientificEcological: t('A camel can lose about a quarter of its body water and recover by drinking quickly; its body temperature rises during the day to save water.', 'Un chameau peut perdre environ un quart de l’eau de son corps et la récupérer en buvant vite ; sa température monte le jour pour économiser l’eau.', 'يتحمل الجمل فقدان نحو ربع ماء جسمه ثم يعوّضه سريعًا، وترتفع حرارته نهارًا ليقتصد في الماء.'),
      practicalBenefits: t('Milk, meat, wool, leather and transport where few animals survive.', 'Lait, viande, laine, cuir et transport là où peu d’animaux survivent.', 'اللبن واللحم والوبر والجلد والركوب حيث لا يعيش غيره.'),
    },
  },
  {
    id: 'himar',
    name: t4('The donkey', 'L’âne', 'الحمار', 'El asno'),
    scientificName: 'Equus asinus',
    category: 'mammals',
    source: 'quran_and_sunnah',
    quranRefs: ['2:259', '62:5', '31:19', '16:8'],
    hadithRefs: [
      { book: 'Bukhari', number: '3303', text: t4('When you hear a donkey bray, seek refuge in Allah from Satan, for it has seen a devil.', 'Quand vous entendez un âne braire, cherchez refuge auprès d’Allah contre Satan, car il a vu un diable.', 'إذا سمعتم نهيق الحمار فتعوّذوا بالله من الشيطان فإنه رأى شيطانًا.', 'Cuando oigáis rebuznar a un asno, buscad refugio en Allah de Satanás, pues ha visto a un demonio.') },
    ],
    relatedProphets: [],
    summary: t4(
      'Mentioned in three lessons: a sign of resurrection (2:259), the likeness of carrying scripture without living by it (62:5), and the harshest of voices (31:19).',
      'Cité dans trois leçons : un signe de la résurrection (2:259), l’image de qui porte l’Écriture sans la vivre (62:5), et la plus détestable des voix (31:19).',
      'ورد في ثلاثة دروس: آية على البعث (2:259)، ومثل من حمل الكتاب ولم يعمل به (62:5)، وأنكر الأصوات (31:19).',
      'Aparece en tres lecciones: un signo de la resurrección (2:259), la imagen de quien lleva la Escritura sin vivirla (62:5) y la más fea de las voces (31:19).',
    ),
    whatTheyDid: t4(
      'A man passed a ruined town and wondered how Allah would revive it. Allah made him die for a hundred years, then raised him and told him to look at his donkey: its bones were put together and clothed with flesh before his eyes (2:259).',
      'Un homme passa près d’une cité en ruine et se demanda comment Allah la ferait revivre. Allah le fit mourir cent ans, puis le ressuscita et lui dit de regarder son âne : ses os furent assemblés et revêtus de chair sous ses yeux (2:259).',
      'مرّ رجل على قرية خاوية فقال: أنّى يحيي هذه الله بعد موتها؟ فأماته الله مائة عام ثم بعثه، وقال له: انظر إلى حمارك، فرأى عظامه تُنشز ثم تُكسى لحمًا (2:259).',
      'Un hombre pasó junto a una ciudad en ruinas y se preguntó cómo la revivirá Allah. Allah lo hizo morir cien años, luego lo resucitó y le dijo que mirara a su asno: sus huesos se unieron y se cubrieron de carne ante sus ojos (2:259).',
    ),
    physicalTraits: {
      size: t('1–1.4 m at the shoulder', '1 à 1,4 m au garrot', 'ارتفاعه 1-1.4 م'),
      habitat: t('Domesticated worldwide; common in rural Morocco', 'Domestiqué partout ; courant dans le Maroc rural', 'مستأنس في كل مكان، وكثير في البوادي المغربية'),
      uniqueFeature: t('Long ears, sure-footed, hardy on little water and poor grazing', 'Longues oreilles, pied sûr, résistant avec peu d’eau et de pâture', 'أذنان طويلتان وخطو ثابت، يصبر على قلة الماء والكلأ'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Short, sure-footed steps',
      paceDescription: t('A steady, patient walk under heavy loads', 'Une marche régulière et patiente sous de lourdes charges', 'مشي ثابت صبور تحت الأحمال'),
      soundOrSignal: t('A loud bray', 'Un braiment sonore', 'نهيق عالٍ'),
    },
    benefitsAndWisdom: {
      spiritual: t('Knowledge is for living: those who carry the scripture without acting on it are “like a donkey carrying books” (62:5).', 'Le savoir est fait pour être vécu : qui porte l’Écriture sans l’appliquer est « comme l’âne qui porte des livres » (62:5).', 'العلم للعمل، ومن حمل الكتاب ولم يعمل به «كمثل الحمار يحمل أسفارًا» (62:5).'),
      sunnahGuidance: t('Luqman’s advice: lower your voice (31:19). When a donkey brays, seek refuge in Allah from Satan (Bukhari 3303).', 'Conseil de Luqman : baisse ta voix (31:19). Quand un âne brait, cherche refuge auprès d’Allah contre Satan (Bukhari 3303).', 'من وصية لقمان: واغضض من صوتك (31:19)، وإذا نهق الحمار فتعوّذ بالله من الشيطان (البخاري 3303).'),
      scientificEcological: t('Donkeys work on less water and poorer food than horses and remember routes for years.', 'L’âne travaille avec moins d’eau et une nourriture plus pauvre que le cheval, et retient des chemins pendant des années.', 'يعمل الحمار بماء وعلف أقل من الخيل، ويحفظ الطرق سنين.'),
      practicalBenefits: t('Transport and farm work, especially in mountains and villages.', 'Transport et travaux des champs, surtout en montagne et dans les villages.', 'النقل والعمل في الحقول، خاصة في الجبال والقرى.'),
    },
  },
  {
    id: 'jarad',
    name: t4('Locusts', 'Les sauterelles', 'الجراد', 'Las langostas'),
    scientificName: 'Schistocerca gregaria',
    category: 'insects',
    source: 'quran_and_sunnah',
    quranRefs: ['7:133-135', '54:7'],
    hadithRefs: [
      { book: 'Bukhari', number: '5495', text: t4('We went on seven expeditions with the Prophet ﷺ, eating locusts with him.', 'Nous avons fait sept expéditions avec le Prophète ﷺ, en mangeant avec lui des sauterelles.', 'غزونا مع النبي ﷺ سبع غزوات نأكل معه الجراد.', 'Hicimos siete expediciones con el Profeta ﷺ, comiendo langostas con él.') },
    ],
    relatedProphets: ['musa'],
    summary: t4(
      'Sent with the flood, lice, frogs and blood as signs to Pharaoh’s people (7:133). People will come out of their graves “like scattered locusts” (54:7).',
      'Envoyées avec l’inondation, les poux, les grenouilles et le sang comme signes au peuple de Pharaon (7:133). Les gens sortiront des tombes « comme des sauterelles éparpillées » (54:7).',
      'أُرسل مع الطوفان والقمل والضفادع والدم آيات على قوم فرعون (7:133)، ويخرج الناس من الأجداث «كأنهم جراد منتشر» (54:7).',
      'Enviadas con la inundación, los piojos, las ranas y la sangre como signos al pueblo de Faraón (7:133). La gente saldrá de las tumbas «como langostas dispersas» (54:7).',
    ),
    whatTheyDid: t4(
      'Each time a plague struck, Pharaoh’s people asked Musa to pray for relief and promised to believe; each time it lifted, they broke their word (7:133-135).',
      'À chaque fléau, le peuple de Pharaon demandait à Musa de prier pour être soulagé et promettait de croire ; dès qu’il cessait, il rompait sa parole (7:133-135).',
      'كلما نزل بهم البلاء سألوا موسى أن يدعو ربه ووعدوا بالإيمان، فلما كُشف عنهم نكثوا (7:133-135).',
      'Cada vez que llegaba una plaga, el pueblo de Faraón pedía a Musa que rezara por alivio y prometía creer; cuando cesaba, rompía su palabra (7:133-135).',
    ),
    physicalTraits: {
      size: t('6–8 cm', '6 à 8 cm', '6-8 سم'),
      habitat: t('Deserts from the Sahara to India; swarms reach Morocco', 'Déserts du Sahara à l’Inde ; les essaims atteignent le Maroc', 'الصحاري من الصحراء الكبرى إلى الهند، وتبلغ أسرابه المغرب'),
      uniqueFeature: t('Turns from a solitary insect into a swarming one when crowded', 'Passe d’une forme solitaire à une forme grégaire quand il est en foule', 'يتحول من الطور المنفرد إلى طور الأسراب عند الازدحام'),
    },
    motion: {
      animationType: 'fly',
      strideLength: 'Swarms travel with the wind, up to about 150 km a day',
      paceDescription: t('Dense moving clouds that strip fields bare', 'Des nuées denses qui dénudent les champs', 'أسراب كثيفة تجرد الحقول'),
      soundOrSignal: t('The roar of millions of wings', 'Le grondement de millions d’ailes', 'هدير ملايين الأجنحة'),
    },
    benefitsAndWisdom: {
      spiritual: t('A promise made in hardship must be kept after relief (7:135).', 'Une promesse faite dans l’épreuve doit être tenue après le soulagement (7:135).', 'العهد الذي يُعطى في الشدة يجب الوفاء به بعد الفرج (7:135).'),
      sunnahGuidance: t('Locusts are lawful to eat: the Companions ate them on seven expeditions with the Prophet ﷺ (Bukhari 5495).', 'Les sauterelles sont licites : les Compagnons en mangeaient lors de sept expéditions avec le Prophète ﷺ (Bukhari 5495).', 'الجراد حلال، أكله الصحابة مع النبي ﷺ في سبع غزوات (البخاري 5495).'),
      scientificEcological: t('A swarm can hold tens of millions of locusts per square kilometre, each eating about its own weight in plants a day.', 'Un essaim compte des dizaines de millions d’individus au kilomètre carré, chacun mangeant environ son poids de plantes par jour.', 'يضم السرب عشرات الملايين في الكيلومتر المربع، ويأكل الواحد قدر وزنه من النبات كل يوم.'),
      practicalBenefits: t('Eaten in parts of Arabia and Africa; swarms are tracked by the FAO Desert Locust Watch.', 'Mangées dans certaines régions d’Arabie et d’Afrique ; les essaims sont suivis par la FAO.', 'يؤكل في بعض بلاد العرب وأفريقيا، وتتابع منظمة الأغذية والزراعة أسرابه.'),
    },
  },
  {
    id: 'dafda',
    name: t4('Frogs', 'Les grenouilles', 'الضفادع', 'Las ranas'),
    scientificName: 'Pelophylax saharicus',
    category: 'amphibians',
    source: 'quran_and_sunnah',
    quranRefs: ['7:133'],
    hadithRefs: [
      { book: 'Abu Dawud', number: '5269', text: t4('A doctor asked the Prophet ﷺ about putting a frog in a medicine, and he forbade killing it. Graded sahih by al-Albani.', 'Un médecin interrogea le Prophète ﷺ sur l’emploi d’une grenouille dans un remède, et il interdit de la tuer. Jugé sahih par al-Albani.', 'سأل طبيب النبيَّ ﷺ عن ضفدع يجعلها في دواء فنهاه عن قتلها. صححه الألباني.', 'Un médico preguntó al Profeta ﷺ sobre usar una rana en un remedio, y prohibió matarla. Calificado sahih por al-Albani.') },
    ],
    relatedProphets: ['musa'],
    summary: t4(
      'One of the signs sent upon Pharaoh’s people (7:133). The Prophet ﷺ forbade killing frogs.',
      'L’un des signes envoyés au peuple de Pharaon (7:133). Le Prophète ﷺ a interdit de tuer les grenouilles.',
      'من الآيات التي أُرسلت على قوم فرعون (7:133)، ونهى النبي ﷺ عن قتل الضفدع.',
      'Uno de los signos enviados al pueblo de Faraón (7:133). El Profeta ﷺ prohibió matar ranas.',
    ),
    whatTheyDid: t4(
      'Frogs came upon Pharaoh’s people as a distinct sign among the plagues, after they had refused Musa (7:133).',
      'Les grenouilles vinrent sur le peuple de Pharaon comme un signe distinct parmi les fléaux, après leur refus de Musa (7:133).',
      'أُرسلت الضفادع على قوم فرعون آية مفصلة بعد أن كذبوا موسى (7:133).',
      'Las ranas llegaron al pueblo de Faraón como un signo distinto entre las plagas, tras rechazar a Musa (7:133).',
    ),
    physicalTraits: {
      size: t('5–10 cm', '5 à 10 cm', '5-10 سم'),
      habitat: t('Ponds, wadis and oases; the Sahara frog lives across North Africa', 'Mares, oueds et oasis ; la grenouille saharienne vit dans toute l’Afrique du Nord', 'البرك والأودية والواحات، وضفدع الصحراء منتشر في شمال أفريقيا'),
      uniqueFeature: t('Breathes partly through its moist skin; begins life as a tadpole', 'Respire en partie par sa peau humide ; commence sa vie en têtard', 'يتنفس جزئيًا عبر جلده الرطب، ويبدأ حياته شرغوفًا'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Leaps many times its body length',
      paceDescription: t('Sudden, powerful hops', 'Des bonds soudains et puissants', 'قفزات مفاجئة قوية'),
      soundOrSignal: t('Croaking choruses at night', 'Des chœurs de coassements la nuit', 'نقيق جماعي في الليل'),
    },
    benefitsAndWisdom: {
      spiritual: t('The weakest creature can humble the strongest king.', 'La plus faible créature peut humilier le roi le plus fort.', 'أضعف المخلوقات قد يذل أقوى الملوك.'),
      sunnahGuidance: t('Do not kill frogs without need (Abu Dawud 5269).', 'Ne tuez pas les grenouilles sans nécessité (Abu Dawud 5269).', 'لا يُقتل الضفدع بلا حاجة (أبو داود 5269).'),
      scientificEcological: t('Frogs absorb pollutants through their skin, so their health shows the health of the water.', 'Les grenouilles absorbent les polluants par la peau ; leur santé reflète celle de l’eau.', 'يمتص الضفدع الملوثات بجلده، فصحته دليل على سلامة الماء.'),
      practicalBenefits: t('They eat many insects around fields and water.', 'Elles mangent beaucoup d’insectes autour des champs et de l’eau.', 'تأكل كثيرًا من الحشرات حول الحقول والمياه.'),
    },
  },
  {
    id: 'salwa',
    name: t4('Quails (al-salwa)', 'Les cailles (as-salwa)', 'السلوى (السمّان)', 'Las codornices (as-salwa)'),
    scientificName: 'Coturnix coturnix',
    category: 'birds',
    source: 'quran',
    quranRefs: ['2:57', '7:160', '20:80', '2:61'],
    hadithRefs: [],
    relatedProphets: ['musa'],
    summary: t4(
      'Allah sent down manna and quails to the Children of Israel in the wilderness (2:57).',
      'Allah fit descendre la manne et les cailles pour les Enfants d’Israël dans le désert (2:57).',
      'أنزل الله المنّ والسلوى على بني إسرائيل في التيه (2:57).',
      'Allah hizo descender el maná y las codornices para los Hijos de Israel en el desierto (2:57).',
    ),
    whatTheyDid: t4(
      'After the Exodus, Allah shaded them with clouds and gave them manna and quails: “Eat of the good things We have provided you.” Some later asked for vegetables instead (2:61).',
      'Après l’Exode, Allah les ombragea de nuages et leur donna la manne et les cailles : « Mangez des bonnes choses que Nous vous avons attribuées. » Certains demandèrent ensuite des légumes à la place (2:61).',
      'بعد الخروج ظلّل الله عليهم الغمام وأنزل عليهم المن والسلوى: «كلوا من طيبات ما رزقناكم»، ثم طلب بعضهم البقل بدلًا منه (2:61).',
      'Tras el Éxodo, Allah los cubrió con nubes y les dio el maná y las codornices: «Comed de las cosas buenas que os hemos dado». Luego algunos pidieron verduras en su lugar (2:61).',
    ),
    physicalTraits: {
      size: t('16–18 cm; about 100 g', '16 à 18 cm ; environ 100 g', '16-18 سم، ونحو 100 غ'),
      habitat: t('Fields and grasslands; migrates between Europe and Africa across the Mediterranean and Sinai', 'Champs et prairies ; migre entre l’Europe et l’Afrique par la Méditerranée et le Sinaï', 'الحقول والمراعي، يهاجر بين أوروبا وأفريقيا عبر المتوسط وسيناء'),
      uniqueFeature: t('A small ground bird that migrates at night in large numbers', 'Petit oiseau terrestre qui migre de nuit en grand nombre', 'طائر أرضي صغير يهاجر ليلًا بأعداد كبيرة'),
    },
    motion: {
      animationType: 'fly',
      strideLength: 'Short low flights; long night migrations',
      paceDescription: t('Runs through grass, bursts into flight when startled', 'Court dans l’herbe et s’envole brusquement quand on le surprend', 'يجري في العشب ويطير فجأة إذا فزع'),
      soundOrSignal: t('A repeated three-note call', 'Un chant répété de trois notes', 'صياح متكرر من ثلاثة مقاطع'),
    },
    benefitsAndWisdom: {
      spiritual: t('Provision comes from Allah even in a desert; gratitude is being content with what He gives.', 'La subsistance vient d’Allah même au désert ; la gratitude, c’est se contenter de ce qu’Il donne.', 'الرزق من الله ولو في الصحراء، والشكر رضا بما يعطي.'),
      sunnahGuidance: t4('“Eat of the good things We have provided you” (2:57): eat what is lawful and wholesome.', '« Mangez des bonnes choses que Nous vous avons attribuées » (2:57) : mangez ce qui est licite et sain.', '«كلوا من طيبات ما رزقناكم» (2:57).', '«Comed de las cosas buenas que os hemos dado» (2:57): comed lo lícito y sano.'),
      scientificEcological: t('Common quails cross the Mediterranean and Sinai on migration and often land exhausted on the coast.', 'Les cailles traversent la Méditerranée et le Sinaï en migration et se posent souvent épuisées sur la côte.', 'يعبر السمّان المتوسط وسيناء في هجرته، وكثيرًا ما يحط منهكًا على الساحل.'),
      practicalBenefits: t('Quail meat and eggs are nutritious and are farmed today.', 'La viande et les œufs de caille sont nutritifs et élevés aujourd’hui.', 'لحم السمّان وبيضه مغذيان ويُربّى اليوم.'),
    },
  },
  {
    id: 'dhubab',
    name: t4('The fly', 'La mouche', 'الذباب', 'La mosca'),
    scientificName: 'Musca domestica',
    category: 'insects',
    source: 'quran_and_sunnah',
    quranRefs: ['22:73'],
    hadithRefs: [
      { book: 'Bukhari', number: '3320', text: t4('If a fly falls into the drink of one of you, let him dip it fully, then remove it, for one wing has disease and the other a cure.', 'Si une mouche tombe dans la boisson de l’un de vous, qu’il l’y plonge entièrement puis la retire, car une aile porte une maladie et l’autre un remède.', 'إذا وقع الذباب في شراب أحدكم فليغمسه ثم لينزعه، فإن في إحدى جناحيه داء والأخرى شفاء.', 'Si una mosca cae en la bebida de uno de vosotros, que la sumerja del todo y luego la saque, pues un ala tiene enfermedad y la otra remedio.') },
    ],
    relatedProphets: [],
    summary: t4(
      'All the false gods together could not create a fly, and if a fly snatched something from them they could not take it back (22:73).',
      'Tous les faux dieux réunis ne pourraient créer une mouche, et si une mouche leur enlevait quelque chose, ils ne pourraient le reprendre (22:73).',
      'لو اجتمعت الآلهة الباطلة لم تخلق ذبابًا، وإن يسلبها الذباب شيئًا لا تستنقذه منه (22:73).',
      'Todos los falsos dioses juntos no podrían crear una mosca, y si una mosca les quitara algo no podrían recuperarlo (22:73).',
    ),
    whatTheyDid: t4(
      '“O people, a parable is set forth, so listen to it”: those worshipped besides Allah cannot create a fly. “Weak are the seeker and the sought” (22:73).',
      '« Ô gens, une parabole vous est proposée, écoutez-la » : ceux qu’on adore en dehors d’Allah ne sauraient créer une mouche. « Faibles sont le solliciteur et le sollicité » (22:73).',
      '«يا أيها الناس ضُرب مثل فاستمعوا له»: من يُدعون من دون الله لن يخلقوا ذبابًا، «ضعف الطالب والمطلوب» (22:73).',
      '«Oh gente, se os propone una parábola, escuchadla»: los que se adoran fuera de Allah no pueden crear una mosca. «Débiles son el que pide y el pedido» (22:73).',
    ),
    physicalTraits: {
      size: t('6–7 mm', '6 à 7 mm', '6-7 مم'),
      habitat: t('Worldwide, wherever people live', 'Partout où vivent les hommes', 'في كل مكان يسكنه الناس'),
      uniqueFeature: t('Compound eyes and very fast reflexes', 'Yeux composés et réflexes très rapides', 'عينان مركبتان وردود أفعال سريعة جدًا'),
    },
    motion: {
      animationType: 'fly',
      strideLength: 'Darting zigzag flight',
      paceDescription: t('Rapid, sudden changes of direction', 'Changements de direction rapides et soudains', 'تغير مفاجئ سريع في الاتجاه'),
      soundOrSignal: t('Buzzing', 'Bourdonnement', 'طنين'),
    },
    benefitsAndWisdom: {
      spiritual: t('The smallest creature shows the gap between the Creator and anything worshipped besides Him.', 'La plus petite créature montre l’écart entre le Créateur et tout ce qu’on adore en dehors de Lui.', 'أصغر المخلوقات يبيّن الفرق بين الخالق وكل ما يُعبد من دونه.'),
      sunnahGuidance: t('If a fly falls into a drink, dip it fully and remove it (Bukhari 3320).', 'Si une mouche tombe dans une boisson, la plonger entièrement puis la retirer (Bukhari 3320).', 'إذا وقع الذباب في الشراب يُغمس ثم يُنزع (البخاري 3320).'),
      scientificEcological: t('Flies carry many microbes; antimicrobial substances made by insects and their microbes are an active field of research.', 'Les mouches portent de nombreux microbes ; les substances antimicrobiennes produites par les insectes sont un domaine de recherche actif.', 'يحمل الذباب ميكروبات كثيرة، والمواد المضادة للميكروبات التي تفرزها الحشرات مجال بحث قائم.'),
      practicalBenefits: t('Fly larvae break down waste and are studied as animal feed.', 'Les larves décomposent les déchets et sont étudiées comme aliment pour animaux.', 'تحلل اليرقات الفضلات وتُدرس علفًا للحيوانات.'),
    },
  },
  {
    id: 'farash',
    name: t4('Moths', 'Les papillons de nuit', 'الفراش', 'Las polillas'),
    scientificName: 'Lepidoptera (e.g. Autographa gamma)',
    category: 'insects',
    source: 'quran_and_sunnah',
    quranRefs: ['101:4'],
    hadithRefs: [
      { book: 'Bukhari', number: '6483', text: t4('My example and yours is like a man who lit a fire, and moths and insects began to fall into it, and I hold you back from the Fire.', 'Mon exemple et le vôtre est celui d’un homme qui alluma un feu ; les papillons et les insectes s’y jetaient, et moi je vous retiens loin du Feu.', 'مثلي ومثلكم كمثل رجل استوقد نارًا فجعل الفراش والجنادب يقعن فيها وهو يذبهن عنها، وأنا آخذ بحُجَزكم عن النار.', 'Mi ejemplo y el vuestro es como un hombre que encendió un fuego y las polillas e insectos caían en él, y yo os retengo del Fuego.') },
    ],
    relatedProphets: ['muhammad'],
    summary: t4(
      'On the Day of the Striking Calamity, people will be “like scattered moths” (101:4).',
      'Le Jour du Fracas, les gens seront « comme des papillons éparpillés » (101:4).',
      '«يوم يكون الناس كالفراش المبثوث» (101:4).',
      'El Día del Golpe, la gente será «como polillas dispersas» (101:4).',
    ),
    whatTheyDid: t4(
      'Surah al-Qari‘ah describes that Day: people like scattered moths, mountains like carded wool; then the scales of deeds decide each fate (101:4-9).',
      'La sourate al-Qari‘a décrit ce Jour : les gens comme des papillons éparpillés, les montagnes comme de la laine cardée ; puis la balance des œuvres décide du sort de chacun (101:4-9).',
      'تصف سورة القارعة ذلك اليوم: الناس كالفراش المبثوث والجبال كالعهن المنفوش، ثم توزن الأعمال (101:4-9).',
      'La sura al-Qari‘a describe ese Día: la gente como polillas dispersas, las montañas como lana cardada; luego la balanza de las obras decide la suerte de cada uno (101:4-9).',
    ),
    physicalTraits: {
      size: t('Wingspan from about 1 to 30 cm by species', 'Envergure d’environ 1 à 30 cm selon l’espèce', 'امتداد الجناحين بين 1 و30 سم بحسب النوع'),
      habitat: t('Worldwide; mostly active at night', 'Partout ; surtout actifs la nuit', 'في كل مكان، ونشاطه غالبًا في الليل'),
      uniqueFeature: t('Drawn to lights at night, circling them without direction', 'Attirés par la lumière la nuit, ils tournent autour sans direction', 'ينجذب إلى الضوء ليلًا ويدور حوله بلا هدى'),
    },
    motion: {
      animationType: 'fly',
      strideLength: 'Fluttering, erratic flight',
      paceDescription: t('Circles lights, then falls into them', 'Tourne autour des lumières puis s’y jette', 'يدور حول الضوء ثم يقع فيه'),
    },
    benefitsAndWisdom: {
      spiritual: t('A picture of that Day: people scattered and confused, each with only his deeds.', 'Une image de ce Jour : des gens éparpillés et désemparés, chacun avec ses seules œuvres.', 'صورة ذلك اليوم: ناس متفرقون حيارى، لا يملك كل منهم إلا عمله.'),
      sunnahGuidance: t('The Prophet ﷺ holds people back from the Fire as a man drives moths away from a flame (Bukhari 6483).', 'Le Prophète ﷺ retient les gens loin du Feu comme un homme écarte les papillons d’une flamme (Bukhari 6483).', 'النبي ﷺ يأخذ بحُجَز الناس عن النار كما يذبّ الرجل الفراش عن اللهب (البخاري 6483).'),
      scientificEcological: t('Many moths steer by keeping a light at a fixed angle; a nearby lamp makes them circle.', 'Beaucoup de papillons de nuit s’orientent en gardant une lumière à angle fixe ; une lampe proche les fait tourner.', 'يهتدي كثير من الفراش بإبقاء الضوء في زاوية ثابتة، فالمصباح القريب يجعله يدور.'),
      practicalBenefits: t('Moths pollinate many night-flowering plants.', 'Ils pollinisent de nombreuses fleurs nocturnes.', 'يلقّح كثيرًا من الأزهار الليلية.'),
    },
  },
  {
    id: 'ghanam',
    name: t4('Sheep', 'Les moutons', 'الغنم', 'Las ovejas'),
    scientificName: 'Ovis aries',
    category: 'mammals',
    source: 'quran_and_sunnah',
    quranRefs: ['21:78-79', '20:18'],
    hadithRefs: [
      { book: 'Bukhari', number: '2262', text: t4('Allah sent no prophet who did not herd sheep. I herded them for the people of Makkah for a few qirats.', 'Allah n’a envoyé aucun prophète qui n’ait gardé des moutons. Je les ai gardés pour les Mecquois contre quelques qirats.', 'ما بعث الله نبيًّا إلا رعى الغنم، وكنت أرعاها على قراريط لأهل مكة.', 'Allah no envió profeta que no pastoreara ovejas. Yo las pastoreé para la gente de La Meca por unos qirats.') },
    ],
    relatedProphets: ['dawud', 'sulayman', 'musa', 'muhammad'],
    summary: t4(
      'Sheep appear in the judgement of Dawud and Sulayman (21:78-79) and with Musa’s staff (20:18). Every prophet herded sheep (Bukhari 2262).',
      'Les moutons apparaissent dans le jugement de Dawud et Sulayman (21:78-79) et avec le bâton de Musa (20:18). Tous les prophètes ont gardé des moutons (Bukhari 2262).',
      'وردت الغنم في حكم داود وسليمان (21:78-79) ومع عصا موسى (20:18)، وما من نبي إلا رعى الغنم (البخاري 2262).',
      'Las ovejas aparecen en el juicio de Dawud y Sulayman (21:78-79) y con el bastón de Musa (20:18). Todos los profetas pastorearon ovejas (Bujari 2262).',
    ),
    whatTheyDid: t4(
      'A flock strayed into a field at night and ate its crop. Dawud and Sulayman judged the case, and Allah gave Sulayman understanding of it (21:78-79). Musa beat down leaves for his sheep with his staff (20:18).',
      'Un troupeau entra de nuit dans un champ et en mangea la récolte. Dawud et Sulayman jugèrent l’affaire, et Allah en donna la compréhension à Sulayman (21:78-79). Musa abattait avec son bâton des feuilles pour ses moutons (20:18).',
      'نفشت غنم القوم في حرث ليلًا، فحكم فيه داود وسليمان، ففهّمها الله سليمان (21:78-79)، وكان موسى يهش بعصاه على غنمه (20:18).',
      'Un rebaño entró de noche en un campo y se comió la cosecha. Dawud y Sulayman juzgaron el caso, y Allah dio a Sulayman su comprensión (21:78-79). Musa hacía caer hojas para sus ovejas con su bastón (20:18).',
    ),
    physicalTraits: {
      size: t('Up to about 1 m at the shoulder', 'Jusqu’à environ 1 m au garrot', 'حتى نحو 1 م'),
      habitat: t('Domesticated worldwide; central to Morocco’s mountains and plains', 'Domestiqués partout ; essentiels dans les montagnes et plaines du Maroc', 'مستأنسة في كل مكان، وأساسية في جبال المغرب وسهوله'),
      uniqueFeature: t('A flock animal that follows a leader; thick wool', 'Animal de troupeau qui suit un meneur ; laine épaisse', 'حيوان قطيع يتبع قائده، كثيف الصوف'),
    },
    motion: {
      animationType: 'walk',
      strideLength: 'Steady grazing walk in a flock',
      paceDescription: t('Moves together and follows the shepherd', 'Se déplace ensemble et suit le berger', 'يمشي جماعة ويتبع الراعي'),
      soundOrSignal: t('Bleating', 'Bêlement', 'ثغاء'),
    },
    benefitsAndWisdom: {
      spiritual: t('Herding trains patience, gentleness and care for the weak, the qualities of one who guides people.', 'Garder un troupeau forme à la patience, à la douceur et au soin des faibles, qualités de celui qui guide les hommes.', 'رعي الغنم يربي الصبر والرفق والعناية بالضعيف، وهي صفات من يقود الناس.'),
      sunnahGuidance: t('The Prophet ﷺ herded sheep for the people of Makkah (Bukhari 2262).', 'Le Prophète ﷺ a gardé des moutons pour les Mecquois (Bukhari 2262).', 'رعى النبي ﷺ الغنم لأهل مكة (البخاري 2262).'),
      scientificEcological: t('Sheep can recognise dozens of faces, of sheep and people, and remember them for years.', 'Les moutons reconnaissent des dizaines de visages, de moutons et d’humains, et s’en souviennent des années.', 'تميّز الأغنام عشرات الوجوه من الغنم والبشر وتتذكرها سنين.'),
      practicalBenefits: t('Milk, meat, wool and the sacrifice of Eid al-Adha.', 'Lait, viande, laine et le sacrifice de l’Aïd al-Adha.', 'اللبن واللحم والصوف وأضحية العيد.'),
    },
  },
  {
    id: 'hayyah',
    name: t4('The snake of Musa’s staff', 'Le serpent du bâton de Musa', 'الحية (عصا موسى)', 'La serpiente del bastón de Musa'),
    scientificName: 'Serpentes (desert species such as Cerastes cerastes)',
    category: 'reptiles',
    source: 'quran',
    quranRefs: ['20:17-21', '7:107', '7:117-122', '27:10'],
    hadithRefs: [],
    relatedProphets: ['musa'],
    summary: t4(
      'By Allah’s command Musa’s staff became a moving snake, a sign shown to him and then to Pharaoh (20:20, 7:107).',
      'Par l’ordre d’Allah, le bâton de Musa devint un serpent qui se mouvait, un signe montré à lui puis à Pharaon (20:20, 7:107).',
      'صارت عصا موسى بأمر الله حية تسعى، آية أُريها ثم أُريها فرعون (20:20، 7:107).',
      'Por orden de Allah el bastón de Musa se convirtió en una serpiente que se movía, un signo mostrado a él y luego a Faraón (20:20, 7:107).',
    ),
    whatTheyDid: t4(
      'At the valley of Tuwa, Allah told Musa to throw his staff; it became a snake moving swiftly and he turned to flee. “Take it and do not fear.” Before Pharaoh it swallowed what the magicians had faked, and the magicians fell down in prostration (20:17-21, 7:117-122).',
      'Dans la vallée de Tuwa, Allah dit à Musa de jeter son bâton ; il devint un serpent rapide et Musa voulut fuir. « Saisis-le et n’aie pas peur. » Devant Pharaon, il engloutit ce que les magiciens avaient truqué, et les magiciens tombèrent prosternés (20:17-21, 7:117-122).',
      'في وادي طوى أُمر موسى أن يلقي عصاه فإذا هي حية تسعى فولّى، فقيل: خذها ولا تخف. وأمام فرعون تلقفت ما يأفكون، فأُلقي السحرة ساجدين (20:17-21، 7:117-122).',
      'En el valle de Tuwa, Allah dijo a Musa que arrojara su bastón; se convirtió en una serpiente veloz y él quiso huir. «Tómala y no temas». Ante Faraón se tragó lo que los magos habían fingido, y los magos cayeron postrados (20:17-21, 7:117-122).',
    ),
    physicalTraits: {
      size: t('Desert horned viper: 30–60 cm', 'Vipère à cornes du désert : 30 à 60 cm', 'الأفعى القرناء: 30-60 سم'),
      habitat: t('Sandy and rocky deserts, including Sinai and southern Morocco', 'Déserts de sable et de pierre, dont le Sinaï et le sud du Maroc', 'الصحاري الرملية والصخرية ومنها سيناء وجنوب المغرب'),
      uniqueFeature: t('Moves sideways on loose sand (sidewinding)', 'Se déplace de côté sur le sable meuble', 'تتحرك جانبيًا على الرمل الرخو'),
    },
    motion: {
      animationType: 'slither',
      strideLength: 'Sidewinding S-curves',
      paceDescription: t('Sideways loops leaving parallel tracks', 'Boucles latérales laissant des traces parallèles', 'حلقات جانبية تترك آثارًا متوازية'),
      soundOrSignal: t('Rasping scales as a warning', 'Frottement des écailles en guise d’avertissement', 'حك الحراشف إنذارًا'),
    },
    benefitsAndWisdom: {
      spiritual: t('Miracles belong to Allah alone; the magicians knew a trick from the truth and believed (7:120-122).', 'Les miracles appartiennent à Allah seul ; les magiciens distinguèrent le truc de la vérité et crurent (7:120-122).', 'المعجزة من الله وحده، وقد عرف السحرة الفرق بين السحر والحق فآمنوا (7:120-122).'),
      sunnahGuidance: t('“Take it and do not fear” (20:21): trust Allah when facing what frightens you.', '« Saisis-le et n’aie pas peur » (20:21) : confie-toi à Allah face à ce qui t’effraie.', '«خذها ولا تخف» (20:21): الثقة بالله عند الخوف.'),
      scientificEcological: t('Sidewinding lets desert vipers cross hot, loose sand while touching it as little as possible.', 'La progression latérale permet aux vipères du désert de traverser le sable chaud en le touchant le moins possible.', 'تتيح الحركة الجانبية للأفاعي عبور الرمل الحار بأقل ملامسة.'),
      practicalBenefits: t('Snakes control rodents, and antivenoms are made from their venom.', 'Les serpents régulent les rongeurs, et les antivenins sont tirés de leur venin.', 'تحد الأفاعي من القوارض، ويُصنع الترياق من سمّها.'),
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
        'أثبتت الدراسات العصبية أن الشعير يعزز إفراز السيروتونين والدوبامين في الدماغ، مما يقرّب معنى قوله ﷺ: «تَذْهَبُ بِبَعْضِ الْحُزْنِ» (صحيح البخاري 5417).'
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
  // ---- Added in 2.6.0: more plants named in the Qur'an ----
  {
    id: 'inab',
    name: t4('Grapes and vines', 'Le raisin et la vigne', 'العنب والأعناب', 'Las uvas y la vid'),
    scientificName: 'Vitis vinifera',
    category: 'fruits',
    source: 'quran',
    quranRefs: ['13:4', '16:11', '16:67', '80:28', '6:99'],
    hadithRefs: [],
    relatedProphets: [],
    summary: t4(
      'Named again and again with date palms among Allah’s provisions, in this world and in Paradise.',
      'Cité à maintes reprises avec les palmiers parmi les dons d’Allah, ici-bas et au Paradis.',
      'ذُكر العنب مرارًا مع النخيل من نعم الله في الدنيا والجنة.',
      'Nombrado una y otra vez junto a las palmeras entre los dones de Allah, en este mundo y en el Paraíso.',
    ),
    scriptureContext: t4(
      'Gardens of vines, crops and palms are watered by one water, yet Allah makes some better to eat than others: signs for people who understand (13:4). From the fruit of palms and vines people make intoxicants and good provision (16:67); wine was later forbidden (5:90).',
      'Des jardins de vignes, de cultures et de palmiers sont arrosés de la même eau, et pourtant Allah rend certains meilleurs que d’autres au goût : des signes pour qui comprend (13:4). Des fruits des palmiers et des vignes on tire une boisson enivrante et une bonne nourriture (16:67) ; le vin fut ensuite interdit (5:90).',
      'جنات من أعناب وزرع ونخيل تُسقى بماء واحد ويُفضّل بعضها على بعض في الأكل (13:4)، ومن ثمرات النخيل والأعناب يتخذون سكرًا ورزقًا حسنًا (16:67)، ثم حُرّمت الخمر (5:90).',
      'Jardines de vides, cultivos y palmeras se riegan con una misma agua, y Allah hace unos mejores que otros al gusto: signos para quien entiende (13:4). Del fruto de palmeras y vides se hace bebida embriagante y buen sustento (16:67); el vino fue prohibido después (5:90).',
    ),
    botanicalTraits: {
      growthForm: t('Woody climbing vine', 'Liane ligneuse grimpante', 'كرمة متسلقة خشبية'),
      habitat: t('Mediterranean climates; Meknès and Benslimane in Morocco', 'Climats méditerranéens ; Meknès et Benslimane au Maroc', 'المناخ المتوسطي، ومكناس وبنسليمان في المغرب'),
      tasteAndTexture: t('Sweet to tart juicy berries', 'Baies juteuses, sucrées à acidulées', 'حبات عصيرية حلوة إلى حامضة'),
    },
    benefits: {
      nutritional: t('Water, natural sugars, fibre and vitamin K; polyphenols in the skin.', 'Eau, sucres naturels, fibres et vitamine K ; polyphénols dans la peau.', 'ماء وسكريات طبيعية وألياف وفيتامين ك، ومركبات متعددة الفينول في القشرة.'),
      medicinalProphetic: t('No authentic hadith prescribes grapes as a remedy; they are a provision to eat with thanks.', 'Aucun hadith authentique ne prescrit le raisin comme remède ; c’est une nourriture à manger avec gratitude.', 'لم يصح حديث في العنب دواءً، وهو رزق يؤكل بشكر.'),
      spiritualWisdom: t('Different fruits from one water show Allah’s power (13:4).', 'Des fruits différents nés d’une même eau montrent la puissance d’Allah (13:4).', 'اختلاف الثمار من ماء واحد آية على قدرة الله (13:4).'),
      modernScience: t('Grape skins contain polyphenols such as resveratrol, which are still being studied for health.', 'La peau du raisin contient des polyphénols comme le resvératrol, encore étudiés pour la santé.', 'تحتوي قشرة العنب مركبات مثل الريسفيراترول ما زالت قيد الدراسة.'),
    },
  },
  {
    id: 'khardal',
    name: t4('The mustard seed', 'La graine de moutarde', 'حبة الخردل', 'El grano de mostaza'),
    scientificName: 'Brassica nigra',
    category: 'herbs_medicinal',
    source: 'quran',
    quranRefs: ['31:16', '21:47'],
    hadithRefs: [],
    relatedProphets: [],
    summary: t4(
      'The Qur’an’s measure of the smallest deed: even the weight of a mustard seed will be brought forth (31:16, 21:47).',
      'La mesure coranique de la plus petite action : même le poids d’une graine de moutarde sera produit (31:16, 21:47).',
      'مقياس القرآن لأصغر عمل: ولو كان مثقال حبة من خردل أتى بها الله (31:16، 21:47).',
      'La medida coránica de la obra más pequeña: incluso el peso de un grano de mostaza será presentado (31:16, 21:47).',
    ),
    scriptureContext: t4(
      'Luqman tells his son that a deed the weight of a mustard seed, hidden in a rock or in the heavens or the earth, Allah will bring it out (31:16). On the scales of the Day of Judgement no soul is wronged at all (21:47).',
      'Luqman dit à son fils qu’une action du poids d’une graine de moutarde, cachée dans un rocher, dans les cieux ou sur la terre, Allah la fera venir (31:16). Sur la balance du Jour du Jugement, aucune âme ne sera lésée (21:47).',
      'قال لقمان لابنه: إنها إن تك مثقال حبة من خردل فتكن في صخرة أو في السماوات أو في الأرض يأت بها الله (31:16)، وتوضع الموازين القسط فلا تُظلم نفس شيئًا (21:47).',
      'Luqman dice a su hijo que una obra del peso de un grano de mostaza, oculta en una roca, en los cielos o en la tierra, Allah la traerá (31:16). En la balanza del Día del Juicio nadie será perjudicado (21:47).',
    ),
    botanicalTraits: {
      growthForm: t('Annual herb 1–2 m tall with yellow flowers', 'Herbe annuelle de 1 à 2 m aux fleurs jaunes', 'عشبة حولية ارتفاعها 1-2 م بأزهار صفراء'),
      habitat: t('Fields and roadsides around the Mediterranean', 'Champs et bords de route autour de la Méditerranée', 'الحقول وجوانب الطرق حول المتوسط'),
      tasteAndTexture: t('Tiny, pungent, hot seeds', 'Graines minuscules, piquantes', 'بذور دقيقة حادة لاذعة'),
    },
    benefits: {
      nutritional: t('The seeds are rich in oil, protein and minerals, used as a spice.', 'Les graines sont riches en huile, protéines et minéraux ; on les utilise comme épice.', 'البذور غنية بالزيت والبروتين والمعادن وتُستعمل تابلًا.'),
      medicinalProphetic: t('No hadith prescribes it; its mention is about the weight of deeds.', 'Aucun hadith ne la prescrit ; sa mention concerne le poids des actions.', 'لم يرد فيها حديث دواء، وذكرها لبيان وزن الأعمال.'),
      spiritualWisdom: t('No good or bad deed is too small to count.', 'Aucune bonne ou mauvaise action n’est trop petite pour compter.', 'لا يُستصغر عمل خير ولا شر.'),
      modernScience: t('A black mustard seed is about 1 mm across and weighs about a milligram.', 'Une graine de moutarde noire mesure environ 1 mm et pèse environ un milligramme.', 'حبة الخردل الأسود نحو 1 مم ووزنها نحو مليغرام.'),
    },
  },
  {
    id: 'sunbulah',
    name: t4('Ears of grain', 'Les épis', 'السنابل', 'Las espigas'),
    scientificName: 'Triticum aestivum and other cereals',
    category: 'grains_vegetables',
    source: 'quran',
    quranRefs: ['2:261', '12:43-49'],
    hadithRefs: [],
    relatedProphets: ['yusuf'],
    summary: t4(
      'A grain that grows seven ears with a hundred grains in each: the Qur’an’s picture of charity multiplied (2:261), and the seven green ears of the king’s dream that Yusuf interpreted (12:43-49).',
      'Un grain qui produit sept épis de cent grains chacun : l’image coranique de l’aumône multipliée (2:261), et les sept épis verts du songe du roi interprété par Yusuf (12:43-49).',
      'حبة أنبتت سبع سنابل في كل سنبلة مائة حبة: مثل الإنفاق المضاعف (2:261)، والسنابل السبع الخضر في رؤيا الملك التي عبّرها يوسف (12:43-49).',
      'Un grano que da siete espigas con cien granos cada una: la imagen coránica de la caridad multiplicada (2:261), y las siete espigas verdes del sueño del rey que interpretó Yusuf (12:43-49).',
    ),
    scriptureContext: t4(
      'Those who spend in Allah’s way are like a grain that grows seven ears, each with a hundred grains, and Allah multiplies for whom He wills (2:261). Yusuf advised farming seven years and leaving the harvest in its ears, except a little to eat, for the seven hard years to come (12:47-48).',
      'Ceux qui dépensent dans le sentier d’Allah ressemblent à un grain qui produit sept épis de cent grains chacun, et Allah multiplie pour qui Il veut (2:261). Yusuf conseilla de semer sept ans et de laisser la récolte dans ses épis, sauf un peu pour manger, en vue des sept années dures (12:47-48).',
      'مثل المنفقين في سبيل الله كمثل حبة أنبتت سبع سنابل في كل سنبلة مائة حبة والله يضاعف لمن يشاء (2:261)، وأشار يوسف بالزرع سبع سنين وترك الحصاد في سنبله إلا قليلًا مما يؤكل للسنين الشداد (12:47-48).',
      'Los que gastan por la causa de Allah son como un grano que da siete espigas con cien granos cada una, y Allah multiplica para quien quiere (2:261). Yusuf aconsejó sembrar siete años y dejar la cosecha en sus espigas, salvo un poco para comer, para los siete años duros (12:47-48).',
    ),
    botanicalTraits: {
      growthForm: t('Annual grass whose ear holds rows of grains', 'Graminée annuelle dont l’épi porte des rangées de grains', 'نبات عشبي حولي تحمل سنبلته صفوفًا من الحب'),
      habitat: t('Cultivated worldwide; the plains of the Chaouia and Saïs in Morocco', 'Cultivé partout ; plaines de la Chaouia et du Saïs au Maroc', 'يُزرع في كل مكان، ومنه سهول الشاوية وسايس في المغرب'),
      tasteAndTexture: t('Grain ground into flour for bread and couscous', 'Grain moulu en farine pour le pain et le couscous', 'حب يُطحن دقيقًا للخبز والكسكس'),
    },
    benefits: {
      nutritional: t('Carbohydrates, protein, fibre and B vitamins, most in whole grain.', 'Glucides, protéines, fibres et vitamines B, surtout dans le grain entier.', 'نشويات وبروتين وألياف وفيتامينات ب، وأكثرها في الحب الكامل.'),
      medicinalProphetic: t('For barley broth in the Sunnah, see Talbinah.', 'Pour le bouillon d’orge de la Sunna, voir la Talbina.', 'وفي السنة حساء الشعير، انظر التلبينة.'),
      spiritualWisdom: t('Charity grows: one grain becomes seven hundred (2:261). Plan in years of plenty for years of need (12:47).', 'L’aumône fructifie : un grain en donne sept cents (2:261). Prévoir dans l’abondance pour les années de besoin (12:47).', 'الصدقة تنمو، فالحبة تصير سبعمائة (2:261)، والتدبير في الرخاء لسنين الشدة (12:47).'),
      modernScience: t('Keeping grain in its ear, as Yusuf advised, is a traditional way of storing it for years.', 'Garder le grain dans son épi, comme le conseilla Yusuf, est une manière traditionnelle de le conserver des années.', 'ترك الحب في سنبله كما أشار يوسف طريقة تقليدية لحفظه سنين.'),
    },
  },
  {
    id: 'baql',
    name: t4('Herbs, cucumbers, garlic, lentils and onions', 'Légumes, concombres, ail, lentilles et oignons', 'البقل والقثاء والفوم والعدس والبصل', 'Hortalizas, pepinos, ajo, lentejas y cebollas'),
    scientificName: 'Lens culinaris, Allium cepa, Allium sativum, Cucumis',
    category: 'grains_vegetables',
    source: 'quran_and_sunnah',
    quranRefs: ['2:61'],
    hadithRefs: [
      { book: 'Bukhari', number: '855', text: t4('Whoever eats garlic or onion should keep away from us, or from our mosque.', 'Que celui qui mange de l’ail ou de l’oignon s’écarte de nous, ou de notre mosquée.', 'من أكل ثومًا أو بصلًا فليعتزلنا، أو فليعتزل مسجدنا.', 'Quien coma ajo o cebolla, que se aparte de nosotros, o de nuestra mezquita.') },
    ],
    relatedProphets: ['musa'],
    summary: t4(
      'What some of the Children of Israel asked for instead of manna and quails (2:61). Scholars differ on whether fum means garlic or wheat.',
      'Ce que certains Enfants d’Israël demandèrent à la place de la manne et des cailles (2:61). Les savants divergent : fum désigne l’ail ou le blé.',
      'ما طلبه بعض بني إسرائيل بدل المن والسلوى (2:61)، واختلف العلماء في الفوم: الثوم أو الحنطة.',
      'Lo que algunos Hijos de Israel pidieron en lugar del maná y las codornices (2:61). Los sabios discrepan sobre si fum es ajo o trigo.',
    ),
    scriptureContext: t4(
      '“We cannot bear one kind of food; ask your Lord to bring us what the earth grows: its herbs, cucumbers, fum, lentils and onions.” Musa answered: “Would you exchange what is better for what is lesser?” (2:61).',
      '« Nous ne supporterons plus une seule nourriture ; demande à ton Seigneur de nous faire sortir ce que la terre produit : légumes, concombres, fum, lentilles et oignons. » Musa répondit : « Voulez-vous échanger le meilleur contre le moins bon ? » (2:61).',
      '«لن نصبر على طعام واحد فادع لنا ربك يخرج لنا مما تنبت الأرض من بقلها وقثائها وفومها وعدسها وبصلها»، قال: «أتستبدلون الذي هو أدنى بالذي هو خير» (2:61).',
      '«No soportaremos un solo alimento; pide a tu Señor que nos saque lo que da la tierra: hortalizas, pepinos, fum, lentejas y cebollas». Musa respondió: «¿Queréis cambiar lo mejor por lo inferior?» (2:61).',
    ),
    botanicalTraits: {
      growthForm: t('Garden vegetables and pulses', 'Légumes du potager et légumineuses', 'خضر وبقول'),
      habitat: t('Gardens and fields, the everyday food of Egypt then and of Morocco today', 'Potagers et champs, nourriture quotidienne de l’Égypte d’alors et du Maroc d’aujourd’hui', 'البساتين والحقول، طعام مصر يومها والمغرب اليوم'),
      tasteAndTexture: t('Everyday staples: sharp onion and garlic, earthy lentils, fresh cucumber', 'Aliments de base : oignon et ail piquants, lentilles terreuses, concombre frais', 'بصل وثوم حادان، وعدس، وقثاء طري'),
    },
    benefits: {
      nutritional: t('Dry lentils give about 25 g of protein per 100 g, with iron and fibre.', 'Les lentilles sèches apportent environ 25 g de protéines pour 100 g, avec du fer et des fibres.', 'يعطي العدس الجاف نحو 25 غ بروتين لكل 100 غ مع الحديد والألياف.'),
      medicinalProphetic: t('Whoever has eaten raw garlic or onion should keep away from the mosque so as not to bother people (Bukhari 855).', 'Qui a mangé de l’ail ou de l’oignon cru doit s’écarter de la mosquée pour ne pas gêner les gens (Bukhari 855).', 'من أكل الثوم أو البصل فليعتزل المسجد لئلا يؤذي الناس (البخاري 855).'),
      spiritualWisdom: t('Gratitude: do not trade Allah’s better provision for a lesser one out of habit or desire.', 'Gratitude : ne pas échanger le meilleur don d’Allah contre un moindre par habitude ou désir.', 'الشكر ألا تستبدل الأدنى بالذي هو خير من رزق الله عادةً أو شهوة.'),
      modernScience: t('Lentils, onions and garlic are among the oldest cultivated foods, grown in Egypt since antiquity.', 'Lentilles, oignons et ail sont parmi les plus anciens aliments cultivés, présents en Égypte dès l’Antiquité.', 'العدس والبصل والثوم من أقدم الأغذية المزروعة، عرفتها مصر منذ القدم.'),
    },
  },
  {
    id: 'rayhan',
    name: t4('Fragrant plants (al-rayhan)', 'Les plantes odorantes (ar-rayhan)', 'الريحان', 'Las plantas aromáticas (ar-rayhan)'),
    scientificName: 'Ocimum basilicum and other aromatic plants',
    category: 'herbs_medicinal',
    source: 'quran_and_sunnah',
    quranRefs: ['55:12', '56:88-89'],
    hadithRefs: [
      { book: 'Muslim', number: '2253', text: t4('Whoever is offered fragrant herbs should not refuse them, for they are light to carry and of pleasant scent.', 'Celui à qui l’on offre du rayhan ne doit pas le refuser, car il est léger à porter et d’odeur agréable.', 'من عُرض عليه ريحان فلا يردّه، فإنه خفيف المحمل طيب الريح.', 'A quien se le ofrezcan plantas aromáticas, que no las rechace, pues son ligeras de llevar y de olor agradable.') },
    ],
    relatedProphets: [],
    summary: t4(
      '“Grain with its husks, and fragrant plants” (55:12); for those brought near to Allah: “rest, fragrance and a garden of bliss” (56:89).',
      '« Les grains en leurs enveloppes et les plantes odorantes » (55:12) ; pour les rapprochés : « repos, parfum et jardin de délices » (56:89).',
      '«والحب ذو العصف والريحان» (55:12)، وللمقربين «فروح وريحان وجنة نعيم» (56:89).',
      '«El grano con su cáscara y las plantas aromáticas» (55:12); para los cercanos: «descanso, fragancia y un jardín de delicias» (56:89).',
    ),
    scriptureContext: t4(
      'In Surah al-Rahman fragrant plants are listed among the favours of the earth, followed by “Which of your Lord’s favours will you deny?” (55:12-13). At death, those brought near receive rest and fragrance (56:88-89).',
      'Dans la sourate ar-Rahman, les plantes odorantes figurent parmi les bienfaits de la terre, suivies de « Lequel des bienfaits de votre Seigneur nierez-vous ? » (55:12-13). À la mort, les rapprochés reçoivent repos et parfum (56:88-89).',
      'في سورة الرحمن عُدّ الريحان من نعم الأرض ثم «فبأي آلاء ربكما تكذبان» (55:12-13)، وعند الموت للمقربين روح وريحان (56:88-89).',
      'En la sura ar-Rahman las plantas aromáticas están entre los favores de la tierra, seguidas de «¿Cuál de los favores de vuestro Señor negaréis?» (55:12-13). Al morir, los cercanos reciben descanso y fragancia (56:88-89).',
    ),
    botanicalTraits: {
      growthForm: t('Aromatic herb 30–60 cm tall', 'Herbe aromatique de 30 à 60 cm', 'عشبة عطرية ارتفاعها 30-60 سم'),
      habitat: t('Warm regions; grown in pots in Moroccan homes', 'Régions chaudes ; cultivée en pot dans les maisons marocaines', 'المناطق الدافئة، ويُزرع في أصص البيوت المغربية'),
      tasteAndTexture: t('Fragrant leaves', 'Feuilles parfumées', 'أوراق عطرة'),
    },
    benefits: {
      nutritional: t('Leaves contain vitamin K and aromatic oils; used fresh in food and tea.', 'Les feuilles contiennent de la vitamine K et des huiles aromatiques ; utilisées fraîches dans les plats et le thé.', 'تحتوي الأوراق فيتامين ك وزيوتًا عطرية، وتُستعمل طازجة في الطعام والشاي.'),
      medicinalProphetic: t('Do not refuse fragrant herbs when offered (Muslim 2253).', 'Ne pas refuser le rayhan quand on l’offre (Muslim 2253).', 'لا يُرد الريحان إذا عُرض (مسلم 2253).'),
      spiritualWisdom: t('Good scent is among the blessings of this life and of Paradise.', 'Le bon parfum compte parmi les bienfaits de cette vie et du Paradis.', 'الطيب من نعم الدنيا والجنة.'),
      modernScience: t('Basil’s scent comes from essential oils such as linalool and eugenol.', 'Le parfum du basilic vient d’huiles essentielles comme le linalol et l’eugénol.', 'رائحة الريحان من زيوت عطرية كاللينالول والأوجينول.'),
    },
  },
  {
    id: 'kafur',
    name: t4('Camphor (kafur)', 'Le camphre (kafur)', 'الكافور', 'El alcanfor (kafur)'),
    scientificName: 'Cinnamomum camphora',
    category: 'heavenly',
    source: 'quran_and_sunnah',
    quranRefs: ['76:5-6'],
    hadithRefs: [
      { book: 'Bukhari', number: '1253', text: t4('When the Prophet’s ﷺ daughter died, he told the women washing her to put camphor in the last washing.', 'À la mort de sa fille, le Prophète ﷺ dit aux femmes qui la lavaient de mettre du camphre au dernier lavage.', 'لما توفيت ابنته ﷺ قال للنساء اللاتي يغسلنها: واجعلن في الآخرة كافورًا.', 'Cuando murió su hija, el Profeta ﷺ dijo a las mujeres que la lavaban que pusieran alcanfor en el último lavado.') },
    ],
    relatedProphets: ['muhammad'],
    summary: t4(
      'The righteous in Paradise drink from a cup mixed with kafur, from a spring the servants of Allah make gush forth (76:5-6).',
      'Les vertueux boivent au Paradis d’une coupe mélangée de kafur, d’une source que les serviteurs d’Allah font jaillir (76:5-6).',
      'يشرب الأبرار في الجنة من كأس كان مزاجها كافورًا، عينًا يشرب بها عباد الله يفجرونها تفجيرًا (76:5-6).',
      'Los justos beben en el Paraíso de una copa mezclada con kafur, de una fuente que los siervos de Allah hacen brotar (76:5-6).',
    ),
    scriptureContext: t4(
      'Surah al-Insan describes the drink of the righteous mixed with kafur. Paradise shares only names with this world: the camphor known on earth is not what is meant.',
      'La sourate al-Insan décrit la boisson des vertueux mêlée de kafur. Le Paradis ne partage que des noms avec ce monde : le camphre d’ici-bas n’est pas ce qui est visé.',
      'وصفت سورة الإنسان شراب الأبرار ممزوجًا بالكافور، وليس في الجنة مما في الدنيا إلا الأسماء.',
      'La sura al-Insan describe la bebida de los justos mezclada con kafur. El Paraíso solo comparte nombres con este mundo: no se trata del alcanfor terrenal.',
    ),
    botanicalTraits: {
      growthForm: t('Evergreen tree up to 30 m', 'Arbre à feuillage persistant jusqu’à 30 m', 'شجرة دائمة الخضرة حتى 30 م'),
      habitat: t('East Asia; planted in warm regions', 'Asie de l’Est ; plantée dans les régions chaudes', 'شرق آسيا، وتُزرع في المناطق الدافئة'),
      tasteAndTexture: t('Strong, cooling scent; not a food', 'Parfum fort et rafraîchissant ; ce n’est pas un aliment', 'رائحة قوية باردة، وليس طعامًا'),
    },
    benefits: {
      nutritional: t('Not a food: camphor is toxic if swallowed.', 'Ce n’est pas un aliment : le camphre est toxique s’il est avalé.', 'ليس طعامًا، والكافور سام إذا ابتُلع.'),
      medicinalProphetic: t('Put in the last washing of the dead (Bukhari 1253).', 'Mis dans le dernier lavage du défunt (Bukhari 1253).', 'يُجعل في الغسلة الأخيرة للميت (البخاري 1253).'),
      spiritualWisdom: t('Paradise is described with what people knew as pure and cooling, while being beyond it.', 'Le Paradis est décrit par ce que les gens connaissaient de pur et de rafraîchissant, tout en le dépassant.', 'وُصفت الجنة بما عرفه الناس من الطيب البارد، وهي فوق ذلك.'),
      modernScience: t('Camphor is a terpene used in balms; it must be kept away from children.', 'Le camphre est un terpène utilisé dans les baumes ; il doit être tenu hors de portée des enfants.', 'الكافور من التربينات ويُستعمل في المراهم، ويجب إبعاده عن الأطفال.'),
    },
  },
]
