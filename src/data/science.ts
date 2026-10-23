import type { L3 } from './types'

const t = (en: string, fr: string, ar: string): L3 => ({ en, fr, ar })

export type ScienceCategory =
  | 'cosmology'
  | 'embryology'
  | 'oceanography'
  | 'geology'
  | 'physics_atmosphere'
  | 'neuroscience'
  | 'medicine'
  | 'biology'

export interface ResearchPaper {
  title: string
  authors: string
  journal: string
  year: number
  doiOrUrl: string
  keyFinding: L3
}

export interface ScientificFact {
  id: string
  category: ScienceCategory
  title: L3
  subtitle: L3
  quranRefs?: string[]
  hadithRefs?: { book: string; number: string; text: L3 }[]
  quranVerseText?: { ar: string; en: string; fr: string; surahName: L3; ayah: string }
  historicalContext: L3
  modernDiscovery: L3
  scientificConsensus: L3
  papers: ResearchPaper[]
  diagramType:
    | 'expanding_universe'
    | 'embryo_stages'
    | 'deep_ocean_waves'
    | 'sea_barrier'
    | 'mountain_roots'
    | 'iron_supernova'
    | 'skin_pain_receptors'
    | 'prefrontal_cortex'
    | 'altitude_hypoxia'
    | 'black_seed_thymoquinone'
    | 'honey_antimicrobial'
    | 'water_origin'
    | 'mosquito_microorganisms'
}

export const SCIENCE_CATEGORIES: { id: ScienceCategory | 'all'; label: L3; icon: string }[] = [
  { id: 'all', label: t('All Scientific Facts', 'Tous les Faits Scientifiques', 'جميع الحقائق العلمية'), icon: '🌌' },
  { id: 'cosmology', label: t('Cosmology & Space', 'Cosmologie et Espace', 'الكون والفلك'), icon: '🔭' },
  { id: 'embryology', label: t('Embryology & Human Genesis', 'Embryologie et Genèse Humaine', 'تخليق الأجنة'), icon: '🧬' },
  { id: 'oceanography', label: t('Oceanography & Seas', 'Océanographie et Mers', 'علوم البحار والمحيطات'), icon: '🌊' },
  { id: 'geology', label: t('Geology & Mountains', 'Géologie et Montagnes', 'الجيولوجيا وتضاريس الأرض'), icon: '⛰️' },
  { id: 'physics_atmosphere', label: t('Atmosphere & Iron', 'Atmosphère et Métaux', 'الغلاف الجوي والمعادن'), icon: '⚡' },
  { id: 'neuroscience', label: t('Neuroscience & Frontal Lobe', 'Neurosciences et Cerveau', 'علوم الدماغ والأعصاب'), icon: '🧠' },
  { id: 'medicine', label: t('Medicine & Healing', 'Médecine et Pharmacologie', 'الطب النبوي والعلاجات'), icon: '🌿' },
  { id: 'biology', label: t('Biology & Microscopic Wonders', 'Biologie et Merveilles Microscopiques', 'الأحياء والكائنات الدقيقة'), icon: '🔬' },
]

export const SCIENTIFIC_FACTS: ScientificFact[] = [
  {
    id: 'expanding_universe',
    category: 'cosmology',
    title: t('The Expanding Universe', 'L’Univers en Expansion', 'اتساع السماء والكون المستمر'),
    subtitle: t(
      'Commentators read “We are its expander” (51:47) alongside the expansion of space measured by modern astrophysics.',
      'Les commentateurs lisent « Nous l’étendons » (51:47) à la lumière de l’expansion de l’espace mesurée par l’astrophysique moderne.',
      'يقرأ بعض المفسرين ﴿وَإِنَّا لَمُوسِعُونَ﴾ (الذاريات 47) مع ما قاسه علم الفلك الحديث من تمدد الكون.'
    ),
    quranRefs: ['51:47'],
    quranVerseText: {
      ar: 'وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ',
      en: 'And the heaven We constructed with strength, and indeed, We are [its] expander.',
      fr: 'Le ciel, Nous l’avons construit par Notre puissance et Nous l’étendons [constamment] dans l’immensité.',
      surahName: t('Adh-Dhariyat (The Winnowing Winds)', 'Adh-Dhariyat (Les Éparpilleurs)', 'الذاريات'),
      ayah: '51:47',
    },
    historicalContext: t(
      'Until the early 20th century, universal static equilibrium was the undisputed scientific orthodoxy. Isaac Newton and even Albert Einstein initially believed the cosmos was fixed, static, and immutable, prompting Einstein to introduce the "Cosmological Constant" (which he later called his greatest blunder) to prevent his equations from predicting cosmic expansion.',
      'Jusqu’au début du XXe siècle, le consensus scientifique professait un univers statique et éternel. Newton et même Einstein croyaient en un cosmos immuable, poussant ce dernier à inventer sa « constante cosmologique » pour masquer l’expansion.',
      'ساد الاعتقاد في الحضارات القديمة وحتى مطلع القرن العشرين بأن الكون ثابت ساكن أزلي لا يتغير، لدرجة أن ألبرت أينشتاين أضاف "الثابت الكوني" في نسبيته العامة ليمنع معادلاته من التنبؤ بتمدد الكون، قبل أن يعترف لاحقاً بأنه أكبر خطأ في مسيرته.'
    ),
    modernDiscovery: t(
      'In 1929, Edwin Hubble observed galactic redshift through the 100-inch Hooker telescope at Mount Wilson, demonstrating that galaxies are receding from one another at speeds proportional to their distance. In 1998, high-z supernova search teams discovered that cosmic expansion is not only continuous, but accelerating under dark energy, awarded the 2011 Nobel Prize in Physics.',
      'En 1929, Edwin Hubble observa le décalage vers le rouge des galaxies lointaines, prouvant qu’elles s’éloignent à des vitesses proportionnelles à leur distance. En 1998, la découverte de l’accélération de cette expansion valut le prix Nobel de Physique 2011.',
      'في عام 1929، اكتشف عالم الفلك إدوين هابل عبر تلسكوب مرصد ماونت ويلسون الانزياح نحو الأحمر للضوء الصادر عن المجرات، مبرهناً أن الكون في حالة اتساع وتمدد دائم، وأكدت أبحاث المستعرات العظمى سنة 1998 تسارع هذا التمدد وحازت جائزة نوبل للفيزياء عام 2011.'
    ),
    scientificConsensus: t(
      'Space-time metric expansion is the bedrock of the standard Lambda-CDM cosmological model confirmed by COBE, WMAP, and Planck satellite data.',
      'L’expansion métrique de l’espace est le fondement du modèle cosmologique standard validé par Planck et WMAP.',
      'حقيقة علمية يقينية مؤكدة ببيانات أقمار بلانك وWMAP وخرائط إشعاع الخلفية الكونية الميكروي.'
    ),
    papers: [
      {
        title: 'A relation between distance and radial velocity among extra-galactic nebulae',
        authors: 'Hubble, Edwin',
        journal: 'Proceedings of the National Academy of Sciences (PNAS)',
        year: 1929,
        doiOrUrl: 'https://doi.org/10.1073/pnas.15.3.168',
        keyFinding: t(
          'First empirical evidence that the universe is dynamically expanding.',
          'Première preuve empirique que l’univers est en expansion dynamique.',
          'أول برهان رصدي تجريبي على أن الكون يتمدد ويتسع بصورة منتظمة.'
        ),
      },
      {
        title: 'Measurements of Omega and Lambda from 42 High-Redshift Supernovae',
        authors: 'Perlmutter, S., et al. (The Supernova Cosmology Project)',
        journal: 'The Astrophysical Journal',
        year: 1999,
        doiOrUrl: 'https://doi.org/10.1086/307221',
        keyFinding: t(
          'Confirmed the accelerating expansion of the universe (Nobel Prize in Physics 2011).',
          'Confirmation de l’expansion accélérée de l’univers (Prix Nobel de physique 2011).',
          'إثبات التسارع الكوني في التمدد، ونيل جائزة نوبل في الفيزياء لعام 2011.'
        ),
      },
    ],
    diagramType: 'expanding_universe',
  },
  {
    id: 'embryo_stages',
    category: 'embryology',
    title: t('Human Embryogenesis Stages', 'Les Étapes de l’Embryogenèse Humaine', 'أطوار تخليق الجنين البشري'),
    subtitle: t(
      'Precision descriptions of Nutfa, Alaqa (clinging clot), Mudghah (chewed lump), and bone-flesh clothing.',
      'Description chronologique rigoureuse : Noutfa, Alaqa (adhérence), Moudghah (mâchure), puis ossification et myogenèse.',
      'الوصف الدقيق لنطفة الأمشاج، والعلقة المعلقة، والمضغة مخلقة وغير مخلقة، وكسوة العظام باللحم.'
    ),
    quranRefs: ['23:12-14', '22:5', '75:37-39'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '3208',
        text: t(
          'The Prophet ﷺ said: "The creation of each one of you is assembled in the womb of his mother for forty days as a drop (nutfa), then he becomes a clinging clot (alaqa) for a like period, then a chewed lump of flesh (mudghah) for a like period..."',
          'Le Prophète ﷺ a dit : « La création de chacun d’entre vous est rassemblée dans le ventre de sa mère pendant quarante jours sous forme de goutte... »',
          'إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ أَرْبَعِينَ يَوْمًا، ثُمَّ يَكُونُ عَلَقَةً مِثْلَ ذَلِكَ، ثُمَّ يَكُونُ مُضْغَةً مِثْلَ ذَلِكَ...'
        ),
      },
    ],
    quranVerseText: {
      ar: 'ثُمَّ خَلَقْنَا النُّطْفَةَ عَلَقَةً فَخَلَقْنَا الْعَلَقَةَ مُضْغَةً فَخَلَقْنَا الْمُضْغَةَ عِظَامًا فَكَسَوْنَا الْعِظَامَ لَحْمًا ثُمَّ أَنشَأْنَاهُ خَلْقًا آخَرَ ۚ فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ',
      en: 'Then We made the sperm-drop into a clinging clot, and We made the clot into a lump [of flesh], and We made [from] the lump, bones, and We covered the bones with flesh; then We developed him into another creation. So blessed is Allah, the best of creators.',
      fr: 'Ensuite, Nous avons fait du sperme une adhérence; et de l’adhérence Nous avons créé un embryon; puis, de cet embryon Nous avons créé des os et Nous avons revêtu les os de chair. Ensuite, Nous l’avons transformé en une tout autre création. Gloire soit à Allah le Meilleur des créateurs !',
      surahName: t('Al-Mu\'minun (The Believers)', 'Al-Mu\'minun (Les Croyants)', 'المؤمنون'),
      ayah: '23:14',
    },
    historicalContext: t(
      'Ancient Greco-Roman medical philosophy (Aristotle and Galen) taught either preformationism (a fully formed homunculus miniature inside the sperm) or spontaneous menstrual blood curdling. The cellular stages, implantation, and precise sequence of bone formation preceding muscular covering were entirely unknowable before optical microscopes in the 17th century.',
      'L’Antiquité croyait au préformationnisme (homoncule miniature) ou au caillage sanguin aristotélicien. La succession cellulaire et l’ostéogenèse précédant la myogenèse étaient inconcevables sans microscopie moderne.',
      'سادت في العصور القديمة نظريات أرسطو وجالينوس القائلة بأن الجنين إما كائن مصغر كامل داخل النطفة (Preformationism) أو تخثر دم الطمث. ولم يُعرف تتابع التطور الخلوي والتعشيش وانقسام الطبقات الجنينية إلا بعد اختراع المجاهر في القرون المتأخرة.'
    ),
    modernDiscovery: t(
      'Modern embryology recognizes Carnegie Stages: 1) Zygote/Blastocyst (Nutfa), 2) Day 15–24: Implantation and somite formation resembling a leech/hanging clot (Alaqa), 3) Day 24–32: Somite segments resembling teeth-imprinted chewed substance (Mudghah), 4) Week 7: Chondrification and osteogenesis (bone framework), followed immediately by 5) Week 8: Myogenesis (muscular flesh clothing).',
      'L’embryologie moderne (stades de Carnegie) valide exactement cette séquence : blastocyste, fixation en sangsue/caillot (Alaqa), somites en empreinte dentaire (Moudghah), squelette cartilagineux/osseux, puis myogenèse enveloppante.',
      'أثبتت المجهريات الجنينية ومراحل كارنيجي أن الجنين في اليوم 15-24 يعلق بجدار الرحم كالعلقة شكلاً ووظيفة، ثم تتكون الفلقات الجسدية (Somites) في اليوم 24-32 فتبدو كقطعة لحم معلوكة، ثم يتمايز الهيكل العظمي في الأسبوع السابع، لتعقبه في الأسبوع الثامن كسوة العضلات والألياف اللحمية.'
    ),
    scientificConsensus: t(
      'Reviewed by Professor Keith L. Moore (Founding Chair of Anatomy, University of Toronto), stating that modern terminology matches the Quranic staging sequence.',
      'Attesté par le Pr Keith L. Moore, sommité mondiale de l’embryologie, confirmant l’exactitude saisissante de la nomenclature coranique.',
      'أكد البروفيسور كيث مور (رئيس قسم التشريح بجامعة تورنتو) في أبحاثه الموثقة أن الوصف القرآني يتطابق بدقة متناهية مع أدق أطوار علم الأجنة الحديث.'
    ),
    papers: [
      {
        title: 'A Scientist\'s Interpretation of References to Embryology in the Qur\'an',
        authors: 'Moore, Keith L.',
        journal: 'Journal of the Islamic Medical Association of North America',
        year: 1986,
        doiOrUrl: 'https://doi.org/10.5915/18-1-8693',
        keyFinding: t(
          'Demonstrated the anatomical correlation between Quranic descriptive terms and human Carnegie stages.',
          'Démonstration de la corrélation anatomique entre les termes coraniques et les stades de Carnegie.',
          'البرهان التشريحي على مطابقة المصطلحات القرآنية لمراحل النمو الجنيني المجهري.'
        ),
      },
      {
        title: 'The Developing Human: Clinically Oriented Embryology (11th Edition)',
        authors: 'Moore, K. L., Persaud, T. V. N., & Torchia, M. G.',
        journal: 'Elsevier Health Sciences',
        year: 2019,
        doiOrUrl: 'https://openlibrary.org/isbn/9780323611541',
        keyFinding: t(
          'Standard global textbook detailing the precise timeline of human embryonic tissue development.',
          'Ouvrage de référence mondial détaillant la chronologie du développement embryonnaire.',
          'المرجع الطبي الأكاديمي العالمي المعتمد لبيان تتابع عظام الجنين وكسوة العضلات اللحمية.'
        ),
      },
    ],
    diagramType: 'embryo_stages',
  },
  {
    id: 'deep_ocean_waves',
    category: 'oceanography',
    title: t('Internal Waves & Deep Sea Darkness', 'Ondes Internes et Ténèbres Abyssales', 'الأمواج العميقة وظلمات البحار اللجية'),
    subtitle: t(
      'Subsurface internal waves beneath the surface and total photon extinction in the deep ocean.',
      'Découverte des ondes sous-marines internes superposées aux vagues de surface et obscurité abyssale totale.',
      'كشف القرآن عن الأمواج الداخلية العميقة والظلمات التراكمية في قيعان المحيطات اللجية.'
    ),
    quranRefs: ['24:40'],
    quranVerseText: {
      ar: 'أَوْ كَظُلُمَاتٍ فِي بَحْرٍ لُّجِّيٍّ يَغْشَاهُ مَوْجٌ مِّن فَوْقِهِ مَوْجٌ مِّن فَوْقِهِ سَحَابٌ ۚ ظُلُمَاتٌ بَعْضُهَا فَوْقَ بَعْضٍ إِذَا أَخْرَجَ يَدَهُ لَمْ يَكَدْ يَرَاهَا',
      en: 'Or [they are] like darknesses within an unfathomable sea which is covered by waves, upon which are waves, over which are clouds - darknesses, some of them upon others. When one puts out his hand, he can hardly see it.',
      fr: '[Les actions des mécréants] sont encore semblables à des ténèbres sur une mer profonde : des vagues la recouvrent, sur lesquelles s’élèvent d’autres vagues, surmontées de nuages. Ténèbres superposées les unes aux autres. Quand on étend la main, on ne la distingue presque pas.',
      surahName: t('An-Nur (The Light)', 'An-Nur (La Lumière)', 'النور'),
      ayah: '24:40',
    },
    historicalContext: t(
      'Until submersibles and bathyscaphes reached deep ocean trenches in the 20th century, humans believed the sea was uniformly lit near the top and simply uniform water below. The concept that deep oceans harbor massive subsurface waves (internal waves hundreds of meters tall) breaking between stratified density layers was completely unknown in antiquity.',
      'Jusqu’à l’avènement des bathyscaphes au XXe siècle, nul ne soupçonnait l’existence de vagues internes géantes enfouies sous la surface, ni l’extinction totale des photons dès 200–1000 m.',
      'لم يكن باستطاعة إنسان الغوص إلى أعماق تزيد عن 20-30 متراً دون معدات، وكان يُظن أن أمواج البحر سطحية فقط. ولم تُكتشف الأمواج الداخلية الضخمة التي تتحرك في باطن البحر اللجي على الحد الفاصل بين طبقات الكثافة المختلفة إلا بأجهزة قياس المحيطات الحديثة.'
    ),
    modernDiscovery: t(
      'Oceanographers discovered "Internal Waves" at the pycnocline/thermocline boundary between water masses of different densities. These submarine waves can reach amplitudes over 100 meters, concealed beneath calm surface waves ("waves upon waves"). Simultaneously, optical oceanography confirmed that seawater absorbs solar spectrum wavelengths sequentially: red is absorbed within 10 m, yellow in 50 m, green in 100 m, blue in 200 m, leaving absolute pitch-black aphotic darkness below 1,000 m ("darknesses upon darknesses").',
      'L’océanographie a mis en évidence les « ondes internes » à l’interface pycnocline, hautes de dizaines de mètres sous les vagues de surface. De plus, l’absorption spectrale sélective éteint les couleurs jusqu’à l’obscurité totale sous 200 m.',
      'كشفت أبحاث علم المحيطات الفيزيائي عن ظاهرة الأمواج الداخلية (Internal Waves) التي تنشأ في أعماق البحار على السطح الفاصل بين طبقتين مائيتين مختلفتي الكثافة، ويعلوها موج السطح وتحتها ظلام دامس ناتج عن الامتصاص التدريجي لأطياف الضوء السبعة حتى ينعدم الضوء كلياً في المنطقة العميقة.'
    ),
    scientificConsensus: t(
      'Universally recognized in physical oceanography. Documented extensively by satellite radar altimetry and oceanographic deep mooring arrays.',
      'Fait universellement validé par altimétrie radar satellitaire et balises océanographiques profondes.',
      'حقيقة علمية معتمدة في الفيزياء البحرية ومثبتة برادارات الأقمار الصناعية ومجسات قياس التيارات العميقة.'
    ),
    papers: [
      {
        title: 'The formation and fate of internal waves in the South China Sea',
        authors: 'Alford, M. H., Peacock, T., MacKinnon, J. A., et al.',
        journal: 'Nature',
        year: 2015,
        doiOrUrl: 'https://doi.org/10.1038/nature14399',
        keyFinding: t(
          'Documented massive internal oceanic waves exceeding 200 m height propagating beneath the sea surface.',
          'Observation d’ondes océaniques internes géantes de plus de 200 m de haut sous la surface.',
          'توثيق وجود أمواج محيطية عملاقة في باطن البحر يتجاوز ارتفاعها 200 متر تتحرك تحت سطح الماء.'
        ),
      },
      {
        title: 'Light and Photosynthesis in Aquatic Ecosystems',
        authors: 'Kirk, John T. O.',
        journal: 'Cambridge University Press',
        year: 2011,
        doiOrUrl: 'https://doi.org/10.1017/CBO9781139168212',
        keyFinding: t(
          'Comprehensive measurement of spectral photon extinction and cumulative darkness layers in marine depth.',
          'Mesure de l’extinction spectrale des photons et des couches de ténèbres marines.',
          'القياس الكمي الدقيق لامتصاص طبقات المياه لأطياف الضوء وتكون الظلمات التراكمية في الأعماق.'
        ),
      },
    ],
    diagramType: 'deep_ocean_waves',
  },
  {
    id: 'sea_barrier',
    category: 'oceanography',
    title: t('The Barrier Between Two Waters', 'Le Barrière Entre Deux Mers', 'البرزخ المائي والحاجز بين البحرين'),
    subtitle: t(
      'Thermohaline boundaries and estuarine pycnoclines maintaining distinct salinity, density, and ecosystems.',
      'Frontières thermohalines empêchant le mélange brutal des eaux de salinité et densité différentes.',
      'البرزخ والحجر المحجور بين المياه العذبة والمالحة، وتمايز الخصائص المائية عند المضايق البحرية.'
    ),
    quranRefs: ['25:53', '55:19-20', '27:61'],
    quranVerseText: {
      ar: 'وَهُوَ الَّذِي مَرَجَ الْبَحْرَيْنِ هَٰذَا عَذْبٌ فُرَاتٌ وَهَٰذَا مِلْحٌ أُجَاجٌ وَجَعَلَ بَيْنَهُمَا بَرْزَخًا وَحِجْرًا مَّحْجُورًا',
      en: 'And it is He who has released the two bodies of water, one fresh and sweet and one salty and bitter, and He placed between them a barrier and an inviolable obstruction.',
      fr: 'Et c’est Lui qui a donné libre cours aux deux mers : l’une douce, rafraîchissante, l’autre salée, amère. Et Il a assigné entre les deux une barrière et un barrage infranchissable.',
      surahName: t('Al-Furqan (The Criterion)', 'Al-Furqan (Le Discernement)', 'الفرقان'),
      ayah: '25:53',
    },
    historicalContext: t(
      'To the naked eye, adjacent marine bodies appear to merge immediately into a uniform liquid. Ancient sailors had no knowledge that surface tension, salinity gradients, and density variations create an invisible physical dynamic boundary (pycnocline/halocline) preventing wholesale rapid homogenization.',
      'À l’œil nu, les masses d’eau adjacentes semblent se confondre instantanément. L’existence d’un plan d’eau frontal préservant salinité et faune distinctes était inconnu des marins antiques.',
      'كان الإنسان يرى المياه تلتقي فيظن أنها تختلط مباشرة وتتمازج تماماً. ولم يكن لأحد دراية بأن الفروق في الكثافة والملوحة والحرارة تنشئ حواجز هيدروديناميكية ملموسة تسمى الجبهات المائية (Oceanic Fronts).'
    ),
    modernDiscovery: t(
      'Physical oceanographers in the Strait of Gibraltar and major estuaries demonstrated that the Atlantic and Mediterranean waters maintain distinct temperature, salinity, and biological profiles for hundreds of nautical miles. Similarly, estuaries feature a "pycnocline zone" with a distinct circulation cell called "halocline barrier" (the Qur\'an\'s "barzakh and hijran mahjura") where fresh river water flows seaward over the denser saltwater wedge without immediate mixing.',
      'Les océanographes ont mesuré au détroit de Gibraltar la séparation nette entre les eaux atlantiques et méditerranéennes. Dans les estuaires, la pycnocline forme une zone de confinement préservant la faune estuarienne.',
      'أثبتت المسوح الأوقيانوغرافية عند مضيق جبل طارق وفي مصبات الأنهار الكبرى وجود جبهات مائية فاصلة (Barriers/Pycnoclines) تمنع التمازج الفوري، فتحافظ مياه البحر الأبيض المتوسط الأكثر ملوحة وحرارة على هويتها وتتدفق تحت مياه الأطلسي عبر لسان مائي ممتد لمئات الكيلومترات دون أن تطغى إحداهما على الأخرى.'
    ),
    scientificConsensus: t(
      'Thermohaline frontal dynamics and estuarine salinity wedges are textbook physical oceanography.',
      'Dynamique thermohaline et coins salins d’estuaire sont des principes physiques fondamentaux.',
      'حقيقة فيزيائية مقررة في ديناميكا موائع المحيطات ومصائد الرواسب النهرية.'
    ),
    papers: [
      {
        title: 'The flow of Atlantic water through the Strait of Gibraltar',
        authors: 'Farmer, David M., & Armi, Laurence',
        journal: 'Progress in Oceanography',
        year: 1988,
        doiOrUrl: 'https://doi.org/10.1016/0079-6611(88)90055-9',
        keyFinding: t(
          'High-resolution acoustics mapped the distinct two-layer exchange flow and interface boundary in the Strait.',
          'Cartographie acoustique de l’interface séparatrice entre les deux couches d’eau du détroit.',
          'التخطيط الصوتي عالي الدقة للحد الفاصل الحرج بين المياه الأطلسية والمتوسطية دون اختلاط فوري.'
        ),
      },
      {
        title: 'Estuarine and Coastal Hydrography and Sediment Transport',
        authors: 'Uncles, R. J., & Mitchell, S. B.',
        journal: 'Cambridge University Press',
        year: 2017,
        doiOrUrl: 'https://doi.org/10.1017/9781139644426',
        keyFinding: t(
          'Documented the pycnocline barrier and partitioned salt-wedge dynamics in fresh-salt water junctions.',
          'Documentation de la pycnocline et de la dynamique du coin salé dans les estuaires.',
          'توثيق حاجز التدرج الكثافي والبرزخ الهيدرولوجي بين مصبات المياه العذبة ومياه البحر المالحة.'
        ),
      },
    ],
    diagramType: 'sea_barrier',
  },
  {
    id: 'mountain_roots',
    category: 'geology',
    title: t('Mountains as Pegs with Deep Crustal Roots', 'Les Montagnes comme Piquets Enracinés', 'الجبال أوتاداً وجذور القشرة الصخرية'),
    subtitle: t(
      'The Qur’an calls mountains “pegs” (78:7); geophysics finds that large mountain belts have deep crustal roots (Airy isostasy).',
      'La théorie de l’isostasie démontre que les montagnes possèdent des racines profondes ancrées dans le manteau lithosphérique.',
      'الجبال كأوتاد الخيمة تمتلك جذوراً عميقة في طبقة الوشاح تصل إلى أضعاف ارتفاعها الظاهر لتثبيت القشرة الأرضية.'
    ),
    quranRefs: ['78:6-7', '21:31', '31:10', '16:15'],
    quranVerseText: {
      ar: 'أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا * وَالْجِبَالَ أَوْتَادًا',
      en: 'Have We not made the earth a resting place? And the mountains as stakes?',
      fr: 'N’avons-Nous pas fait de la terre un berceau ? Et des montagnes des piquets de tente ?',
      surahName: t('An-Naba (The Tidings)', 'An-Naba (La Nouvelle)', 'النبأ'),
      ayah: '78:6-7',
    },
    historicalContext: t(
      'Ancient cultures viewed mountains as surface boulders or pyramids sitting atop flat land. The concept of "roots" beneath the crust (like pegs holding a tent firm into the soil) was completely unobservable until seismic profiling and gravitational anomaly measurements in the mid-19th century.',
      'L’Antiquité voyait les montagnes comme de simples tas de roche posés en surface. L’idée de « piquets » dotés de racines profondes stabilisant la lithosphère ne fut conceptualisée qu’avec l’isostasie au XIXe siècle.',
      'كان القدماء يظنون أن الجبال مجرد كتل صخرية مستقرة على سطح الأرض كالأهرامات. ولم يُعرف أن للجبال امتدادات عميقة مغروسة في الوشاح كأوتاد الخيمة إلا مع وضع نظرية التوازن التضاغطي (Isostasy) على يد جورج إيري في منتصف القرن التاسع عشر.'
    ),
    modernDiscovery: t(
      'Geophysicists discovered the Mohorovičić discontinuity (Moho). Under plains, crustal thickness is 30–35 km; under high mountain chains (like the Himalayas, Alps, and Rockies), the crust plunges into a deep "mountain root" up to 70–80 km into the asthenosphere. Like an iceberg or a stake/peg, the visible portion is only the top 10–15%, while the deep root supplies buoyancy and lithospheric mechanical stability preventing tectonic sliding ("lest it shake with you").',
      'Les géophysiciens ont prouvé que sous les chaînes montagneuses, la croûte plonge jusqu’à 70–80 km de profondeur. Ce piquet lithosphérique assure la stabilité isostatique et prévient les glissements tectoniques majeurs.',
      'أثبتت الدراسات السيزمية أن القشرة الأرضية تحت السلاسل الجبلية تغوص في الوشاح الصخري لتشكل جذوراً عملاقة تصل أعماقها إلى 70-80 كم (كما في جبال الهيمالايا)، وتعمل هذه الجذور كأوتاد حقيقية توفر التوازن الطافي وتثبت الصفائح التكتونية من الاضطراب.'
    ),
    scientificConsensus: t(
      'Airy-Heiskanen isostasy is universally taught in all university geophysics and plate tectonics curricula.',
      'L’isostasie d’Airy est un principe fondamental enseigné dans toutes les facultés de géophysique.',
      'مبدأ علمي ثابت في الجيوفيزياء التكتونية وعلوم القشرة الأرضية.'
    ),
    papers: [
      {
        title: 'Isostasy and Flexure of the Lithosphere',
        authors: 'Watts, A. B.',
        journal: 'Cambridge University Press',
        year: 2001,
        doiOrUrl: 'https://doi.org/10.1017/CBO9780511600074',
        keyFinding: t(
          'Detailed physical analysis of crustal roots acting as stabilizing mechanical anchors for continental mountain belts.',
          'Analyse physique des racines crustales ancrant mécaniquement les chaînes montagneuses.',
          'التحليل الفيزيائي والجيولوجي الشامل لجذور الجبال العميقة ودورها في موازنة وتثبيت القشرة القارية.'
        ),
      },
      {
        title: 'Crustal structure of the Himalayas and Tibet: New constraints from seismic imaging',
        authors: 'Kind, R., et al.',
        journal: 'Science',
        year: 2002,
        doiOrUrl: 'https://doi.org/10.1126/science.1078115',
        keyFinding: t(
          'Seismic images mapped the Indian continental plate dipping deep beneath Tibet as an immense crustal peg.',
          'Images sismiques démontrant l’enfoncement profond de la plaque indienne sous le Tibet comme un piquet colossal.',
          'تصوير سيزمي ثلاثي الأبعاد يُثبت غوص صفيحة الهند تحت التبت كوتد ضخم يرسخ السلسلة الجبلية.'
        ),
      },
    ],
    diagramType: 'mountain_roots',
  },
  {
    id: 'iron_supernova',
    category: 'physics_atmosphere',
    title: t('Iron Sent Down from Cosmic Supernovae', 'Le Fer Envoyé des Supernovas Cosmiques', 'إنزال الحديد من المستعرات النجمية'),
    subtitle: t(
      'The Qur\'an states iron was "sent down"; astrophysics shows that iron is forged in massive stars and supernovae.',
      'Le Coran emploie le terme précis « Nous avons fait descendre le fer »; l’astrophysique confirme que le fer terrestre est né d’explosions stellaires extraterrestres.',
      'التعبير القرآني الإعجازي ﴿وَأَنزَلْنَا الْحَدِيدَ﴾؛ والفيزياء الفلكية تثبت أن طاقة تكوين ذرة الحديد لا تتوفر إلا في نوى النجوم العملاقة المستعرة خارج المجموعة الشمسية.'
    ),
    quranRefs: ['57:25'],
    quranVerseText: {
      ar: 'وَأَنزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ',
      en: 'And We sent down iron, wherein is great military might and benefits for the people.',
      fr: 'Et Nous avons fait descendre le fer, dans lequel il y a une force redoutable, aussi bien que des utilités pour les gens.',
      surahName: t('Al-Hadid (Iron)', 'Al-Hadid (Le Fer)', 'الحديد'),
      ayah: '57:25',
    },
    historicalContext: t(
      'Ancient metallurgists viewed iron as an indigenous ore originating from native earth sediments, like stone and clay. No human could fathom that the iron inside Earth\'s core and our blood hemoglobin was forged in cosmic thermonuclear furnaces billions of miles outside the solar system.',
      'Les forgerons antiques considéraient le fer comme un minerai terrestre indigène. Personne n’imaginait que le fer de notre sang et du noyau terrestre provenait d’étoiles géantes disparues.',
      'كان القدماء يظنون أن الحديد معدن أرضي نبت وتكون في طبقات الأرض كالحجارة والصلصال، ولم يخطر ببال بشر أن الحديد لم يُخلق على كوكب الأرض بل أنزل إليها إنزالاً من الفضاء الخارجي.'
    ),
    modernDiscovery: t(
      'Nuclear astrophysics proved that terrestrial planets could never reach the temperatures required to synthesize iron (Fe-56). The synthesis of iron requires stellar core temperatures exceeding 3 to 4 billion Kelvin, achieved only during silicon-burning in supergiant stars and Type Ia / core-collapse Supernovae. When these giant stars exploded, billions of tons of iron were blasted into space and eventually rained down onto the forming proto-Earth ("sent down iron").',
      'La nucléosynthèse stellaire prouve que le fer-56 ne peut être synthétisé que dans des cœurs stellaires à plusieurs milliards de degrés. L’explosion de ces supernovas a littéralement précipité le fer sur la Terre primitive.',
      'أثبتت الفيزياء النووية الفلكية أن طاقة الربط النووي للحديد هي الأعلى بين جميع العناصر، وأن المجموعة الشمسية عاجزة عن إنتاجه لأن تصنيعه يتطلب درجات حرارة هائلة (تتجاوز 3 مليارات كلفن) لا توجد إلا في قلوب النجوم العملاقة المنفجرة (Supernovae)، والتي قذفت بالحديد في الفضاء ليهبط على الأرض أثناء تشكلها مصداقاً لقوله تعالى: ﴿وَأَنزَلْنَا الْحَدِيدَ﴾.'
    ),
    scientificConsensus: t(
      'Stellar nucleosynthesis and cosmic abundance of iron is undisputed in modern astrophysics (Burbidge et al., Hoyle).',
      'La nucléosynthèse stellaire du fer est un pilier incontestable de l’astrophysique contemporaine.',
      'حقيقة فلكية وفيزيائية معتمدة حائزة على إجماع مجتمع الفيزياء الفلكية العالمي.'
    ),
    papers: [
      {
        title: 'Synthesis of the Elements in Stars',
        authors: 'Burbidge, E. M., Burbidge, G. R., Fowler, W. A., & Hoyle, F.',
        journal: 'Reviews of Modern Physics',
        year: 1957,
        doiOrUrl: 'https://doi.org/10.1103/RevModPhys.29.547',
        keyFinding: t(
          'Landmark "B2FH" paper proving iron is the ultimate nuclear endpoint of stellar nucleosynthesis.',
          'Article historique prouvant que le fer est le produit ultime de la fusion au cœur des étoiles.',
          'البحث التاريخي المعتمد المؤسس لعلم التخليق النووي النجمي وتكون عنصر الحديد خارج كوكب الأرض.'
        ),
      },
      {
        title: 'Astrophysics with Presolar Stardust',
        authors: 'Clayton, Donald D., & Nittler, Larry R.',
        journal: 'Annual Review of Astronomy and Astrophysics',
        year: 2004,
        doiOrUrl: 'https://doi.org/10.1146/annurev.astro.42.053102.134022',
        keyFinding: t(
          'Demonstrated isotopic signatures of iron injected into the early Solar nebula from supernovae.',
          'Démonstration des signatures isotopiques du fer injecté dans la nébuleuse solaire par des supernovas.',
          'التحليل النظائري لغبار النيازك الذي يثبت هبوط الحديد الفضائي واستقراره في باطن الأرض.'
        ),
      },
    ],
    diagramType: 'iron_supernova',
  },
  {
    id: 'skin_pain_receptors',
    category: 'neuroscience',
    title: t('Skin Nociceptors and Pain Sensation', 'Nocicepteurs Cutanés et Sensation de Douleur', 'مستقبلات الألم في الجلد وتجدد الإحساس'),
    subtitle: t(
      'The Qur\'an specifically correlates burning of the skin with loss of pain, requiring fresh skin replacement.',
      'Le Coran relie la sensation douloureuse à l’intégrité cutanée, nécessitant le renouvellement de la peau pour ressentir le tourment.',
      'ربط القرآن الكريم بين الإحساس بالألم وسلامة طبقات الجلد، والحاجة لتبديل الجلود لإدامة الإحساس بالعذاب.'
    ),
    quranRefs: ['4:56'],
    quranVerseText: {
      ar: 'إِنَّ الَّذِينَ كَفَرُوا بِآيَاتِنَا سَوْفَ نُصْلِيهِمْ نَارًا كُلَّمَا نَضِجَتْ جُلُودُهُم بَدَّلْنَاهُمْ جُلُودًا غَيْرَهَا لِيَذُوقُوا الْعَذَابَ',
      en: 'Indeed, those who disbelieve in Our verses - We will drive them into a Fire. Every time their skins are roasted through We will replace them with other skins so they may taste the punishment.',
      fr: 'Certes, ceux qui ne croient pas à Nos versets, Nous les brûlerons bientôt dans le Feu. Chaque fois que leurs peaux auront été consumées, Nous leur donnerons d’autres peaux en échange afin qu’ils goûtent au châtiment.',
      surahName: t('An-Nisa (The Women)', 'An-Nisa (Les Femmes)', 'النساء'),
      ayah: '4:56',
    },
    historicalContext: t(
      'Ancient physiology (Aristotle and medieval medicine) believed the heart or liver was the universal sensorium of pain. People assumed that burning deeper into internal organs produced more intense pain, unaware that deep 3rd-degree burns destroy cutaneous sensory nerves, rendering burned tissue painless.',
      'Aristote croyait que le cœur était le centre unique des sensations. L’Antiquité ignorait que la destruction des couches épidermiques et dermiques abolit la sensation nociceptive.',
      'كان الشائع في الطب القديم أن القلب هو مركز الإحساس بالألم، وأن تعمق الحرق في الأحشاء الداخلية يزيد الألم شدة. ولم يكن معلوماً أن الحروق العميقة من الدرجة الثالثة تدمر النهايات العصبية فيفقد المصاب الإحساس بالألم تماماً.'
    ),
    modernDiscovery: t(
      'Dermatological neuroscience proved that pain receptors (nociceptive free nerve endings and TRPV1 channels) are concentrated exclusively in the epidermis and dermis of the skin. Once full-thickness burns roast and destroy the dermal layer, the patient enters painless nerve necrosis; pain can only be perceived again if healthy, unburned skin replete with intact receptors is present ("We will replace them with other skins so they may taste the punishment").',
      'La neurodermatologie a démontré que les récepteurs nociceptifs sont concentrés dans le derme. La brûlure au 3e degré détruit ces récepteurs, rendant la zone insensible. Seule une peau renouvelée peut éprouver la douleur.',
      'أثبت علم الأعصاب والجلد الحديث أن مستقبلات الألم المتخصصة (Nociceptors وقنوات TRPV1) تتمركز بكثافة في طبقتي البشرة والأدمة بالجلد، فإذا احترق الجلد تماماً ونضج تلفت نهايات الأعصاب ولم يعد الشخص يشعر بالألم، مما يفسر الإعجاز القرآني في ضرورة تبديل الجلود بجلود جديدة سليمة ليستشعر الإنسان ألم العذاب باستمرار.'
    ),
    scientificConsensus: t(
      'Award of the 2021 Nobel Prize in Physiology or Medicine to David Julius and Ardem Patapoutian for discovering temperature and touch receptors.',
      'Attribution du Prix Nobel 2021 de Médecine pour la découverte des récepteurs cutanés de la température et de la douleur.',
      'حقيقة طبية مؤكدة بنيل جائزة نوبل في الطب والفيزيولوجيا لعام 2021 لاكتشاف مستقبلات الحرارة واللمس والألم في الجلد.'
    ),
    papers: [
      {
        title: 'Molecular mechanisms of nociception',
        authors: 'Julius, David, & Basbaum, Allan I.',
        journal: 'Nature',
        year: 2001,
        doiOrUrl: 'https://doi.org/10.1038/35093019',
        keyFinding: t(
          'Identified the capsaicin/heat receptor TRPV1 located in cutaneous sensory nerve endings.',
          'Identification du récepteur thermique et nociceptif TRPV1 localisé dans les terminaisons nerveuses cutanées.',
          'اكتشاف المستقبل الجزيئي للألم والحرارة الشديدة TRPV1 في النهايات العصبية لطبقات الجلد.'
        ),
      },
      {
        title: 'Pathophysiology of the Burn Wound and Local and Systemic Effects',
        authors: 'Evers, L. H., Bhavsar, D., & Mailänder, P.',
        journal: 'Journal of Burn Care & Research',
        year: 2010,
        doiOrUrl: 'https://doi.org/10.1097/BCR.0b013e3181f93583',
        keyFinding: t(
          'Confirmed loss of sensation following full-thickness dermal necrosis in third-degree burns.',
          'Confirmation de la perte totale de sensibilité suite à la nécrose dermique des brûlures profondes.',
          'التوثيق الإكلينيكي لفقدان الإحساس التام بالألم عند تفحم الجلد وتلف الأدمة في الحروق العميقة.'
        ),
      },
    ],
    diagramType: 'skin_pain_receptors',
  },
  {
    id: 'prefrontal_cortex',
    category: 'neuroscience',
    title: t('The Frontal Lobe (Nasiyah): Center of Decision & Lying', 'Le Lobe Frontal : Siège de la Décision et du Mensonge', 'الناصية ومركز التوجيه والقرار والكذب'),
    subtitle: t(
      'The Qur\'an attributes lying and sin to the "forelock" (an-Nasiyah); fMRI studies link the prefrontal cortex with deception.',
      'Le Coran désigne la « Nasiyah » (front) comme responsable du mensonge; l’IRMf démontre que le cortex préfrontal médial contrôle la tromperie.',
      'وصف القرآن الناصية بأنها ﴿نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ﴾؛ وتصوير الرنين المغناطيسي الوظيفي يثبت أن قشرة الفص الجبهي هي المسؤولة عن الكذب والتخطيط الأخلاقي.'
    ),
    quranRefs: ['96:15-16', '11:56'],
    quranVerseText: {
      ar: 'كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ * نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ',
      en: 'No! If he does not desist, We will surely drag him by the forelock - A lying, sinning forelock.',
      fr: 'Mais non ! S’il ne cesse pas, Nous le saisirons certes par le toupet, le toupet d’un menteur, d’un pécheur.',
      surahName: t('Al-Alaq (The Clot)', 'Al-Alaq (L’Adhérence)', 'العلق'),
      ayah: '96:15-16',
    },
    historicalContext: t(
      'In pre-modern anatomical thought, the human forehead was regarded merely as protective cranial bone. Aristotle placed rational thought in the heart, while Galen had no concept that the frontmost part of the cerebrum uniquely orchestrated deliberate deceit, moral impulse inhibition, and active fabrication.',
      'Pour les Anciens, le front n’était qu’un os crânien. Nul ne soupçonnait que l’encéphale antérieur abrite les fonctions exécutives et le contrôle de la tromperie.',
      'كان يُنظر إلى جبهة الرأس ومقدمته على أنها مجرد عظم صلب لحماية الدماغ، أو موضع نمو الشعر. ولم يكن يخطر في عقل طبيب أن المنطقة الكائنة خلف الجبهة مباشرة هي المحرك الرئيسي لقرارات الصدق والكذب والخطأ المتعمد.'
    ),
    modernDiscovery: t(
      'Functional neuroimaging (fMRI and PET) demonstrated that the Prefrontal Cortex (specifically the dorsolateral and ventromedial prefrontal areas located directly behind the forelock) is the executive brain region commanding decision-making, goal planning, moral volition, and active deceit. When an individual fabricates a lie or engages in intentional sinful misconduct, the prefrontal cortex lights up with hyper-metabolic activation to suppress the truth.',
      'L’IRM fonctionnelle démontre que le cortex préfrontal, situé immédiatement sous le front, est le centre exécutif commandant la prise de décision, la planification et la fabrication active du mensonge.',
      'أثبتت دراسات الرنين المغناطيسي الوظيفي (fMRI) أن القشرة الجبهية الأمامية (Prefrontal Cortex) الكائنة في الناصية هي المسؤولة عن الوظائف التنفيذية العليا، كالتخطيط، والمبادرة، واختيار الكذب، وتثبيط قول الصدق، مما يجعل وصف القرآن للناصية بأنها كاذبة خاطئة في منتهى الدقة التشريحية والوظيفية.'
    ),
    scientificConsensus: t(
      'Established cognitive neuroscience of executive functioning and neuroimaging of deception.',
      'Principe fondamental des neurosciences cognitives et de la détection neurofonctionnelle du mensonge.',
      'حقيقة علمية معتمدة في علوم الأعصاب الإدراكية والتصوير الوظيفي للدماغ.'
    ),
    papers: [
      {
        title: 'Brain activity during simulated deception: an event-related functional magnetic resonance study',
        authors: 'Langleben, D. D., et al.',
        journal: 'NeuroImage',
        year: 2002,
        doiOrUrl: 'https://doi.org/10.1006/nimg.2001.1003',
        keyFinding: t(
          'Demonstrated localized prefrontal cortex activation specifically during deliberate lying.',
          'Démonstration de l’activation préfrontale spécifique lors du mensonge délibéré.',
          'البرهان بالتصوير الوظيفي على تنشط خلايا الفص الجبهي بالناصية عند تعمد الكذب.'
        ),
      },
      {
        title: 'The prefrontal cortex and the executive control of behavior',
        authors: 'Miller, Earl K., & Cohen, Jonathan D.',
        journal: 'Annual Review of Neuroscience',
        year: 2001,
        doiOrUrl: 'https://doi.org/10.1146/annurev.neuro.24.1.167',
        keyFinding: t(
          'Established the prefrontal cortex as the command center for cognitive control, choice, and volition.',
          'Établissement du cortex préfrontal comme centre de commandement de la volonté et du choix.',
          'تأكيد أن قشرة الفص الجبهي هي المركز القيادي المسؤول عن التوجيه الإرادي والسلوك الأخلاقي.'
        ),
      },
    ],
    diagramType: 'prefrontal_cortex',
  },
  {
    id: 'altitude_hypoxia',
    category: 'physics_atmosphere',
    title: t('Atmospheric Thinning & Chest Constriction', 'Raréfaction de l’Air et Oppression Respiratoire en Altitude', 'ضيق الصدر ونقص الأكسجين عند التصعد في السماء'),
    subtitle: t(
      'The Qur\'an portrays ascending into the sky as causing painful chest constriction (hypobaric hypoxia).',
      'Le Coran compare l’égarement à la constriction thoracique éprouvée lors de l’ascension céleste.',
      'الوصف البلاغي الإعجازي لضيق الصدر الحرج عند الارتفاع الشاهق في طبقات الجو العليا.'
    ),
    quranRefs: ['6:125'],
    quranVerseText: {
      ar: 'فَمَن يُرِدِ اللَّهُ أَن يَهْدِيَهُ يَشْرَحْ صَدْرَهُ لِلْإِسْلَامِ ۖ وَمَن يُرِدْ أَن يُضِلَّهُ يَجْعَلْ صَدْرَهُ ضَيِّقًا حَرَجًا كَأَنَّمَا يَصَّعَّدُ فِي السَّمَاءِ',
      en: 'So whoever Allah wants to guide - He expands his breast to [contain] Islam; and whoever He wants to misguide - He makes his breast tight and constricted as though he were climbing into the sky.',
      fr: 'Et puis, quiconque Allah veut guider, Il lui ouvre la poitrine à l’Islam. Et quiconque Il veut égarer, Il rend sa poitrine étroite et gênée, comme s’il s’efforçait de monter vers le ciel.',
      surahName: t('Al-An\'am (The Cattle)', 'Al-An\'am (Les Bestiaux)', 'الأنعام'),
      ayah: '6:125',
    },
    historicalContext: t(
      'In the 7th-century Arabian desert, mountains reached at most 2,000–3,000 meters, where acute hypobaric hypoxia does not induce suffocating chest constriction. Ancient beliefs assumed the sky was pure, divine ether where breathing would be effortless. No human had ever ascended into the stratosphere in aircraft or balloons to experience barometric pressure drop.',
      'Dans l’Antiquité, on imaginait l’éther céleste pur et vivifiant. Personne n’avait expérimenté la chute barométrique au-delà de 3000–8000 m causant l’hypoxie et la dyspnée sévère.',
      'لم يكن الإنسان في عصر الرسالة قادراً على الارتفاع في طبقات الجو، وكان المعتقد السائد أن الهواء في السماء أصفى وأسهل تنفساً. ولم تكن أعراض نقص الضغط الجوي ونقص التأكسج الحاد (Hypoxia) معروفة قبل عصر الطيران والمناطيد.'
    ),
    modernDiscovery: t(
      'Aviation medicine proved that as altitude increases, atmospheric barometric pressure drops exponentially (from 760 mmHg at sea level down to less than 250 mmHg above 8,000 m). This sudden drop in partial pressure of oxygen ($pO_2$) impairs pulmonary alveolar gas diffusion, inducing hypobaric hypoxia, chest tightness, severe dyspnea, and pulmonary vasoconstriction ("tight and constricted as though he were climbing into the sky").',
      'La médecine aéronautique démontre que l’altitude entraîne une baisse exponentielle de la pression partielle d’oxygène, provoquant dyspnée étouffante, constriction thoracique et détresse respiratoire aiguë.',
      'أثبت طب الطيران والفضاء أن الصعود في طبقات الجو العليا يصحبه هبوط حاد في الضغط الجوي وتناقص في الضغط الجزئي للأكسجين، مما يؤدي إلى صعوبة تبادل الغازات في الحويصلات الرئوية، فيشعر الإنسان بضيق شديد في التنفس وانقباض في عضلات الصدر (Dyspnea) وغثيان الارتفاعات.'
    ),
    scientificConsensus: t(
      'Fundamental law of respiratory physiology and high-altitude aerospace medicine.',
      'Loi établie de la physiologie respiratoire et de la médecine aérospatiale.',
      'حقيقة فسيولوجية وطبية قطعية في طب الطيران والفضاء.'
    ),
    papers: [
      {
        title: 'The Physiologic Basis of High-Altitude Diseases',
        authors: 'West, John B.',
        journal: 'Annals of Internal Medicine',
        year: 2004,
        doiOrUrl: 'https://doi.org/10.7326/0003-4819-141-10-200411160-00010',
        keyFinding: t(
          'Documented the physiological mechanics of hypobaric hypoxia, alveolar gas drop, and acute dyspnea during high altitude ascent.',
          'Documentation de l’hypoxie hypobarique et de la dyspnée aiguë lors de l’ascension en altitude.',
          'التوثيق الفسيولوجي المعتمد لنقص الضغط الجوي وتضيق الصدر الحاد عند التصعد في الارتفاعات.'
        ),
      },
    ],
    diagramType: 'altitude_hypoxia',
  },
  {
    id: 'black_seed_thymoquinone',
    category: 'medicine',
    title: t('Nigella Sativa (Black Seed): Broad-Spectrum Panacea', 'Nigella Sativa (Graine Noire) : Panacée Pharmacologique', 'الحبة السوداء (الشونيز) ومركب الثيموكينون الشافي'),
    subtitle: t(
      'Prophetic Hadith declared black seed a cure for all diseases; modern pharmacology reveals thymoquinone’s multi-target efficacy.',
      'Le Hadith prophétique affirme que la graine noire guérit de tout mal; la recherche moderne isole la thymoquinone comme régulateur immunitaire universel.',
      'الحديث النبوي الصحيح: «إِنَّ فِي الْحَبَّةِ السَّوْدَاءِ شِفَاءً مِنْ كُلِّ دَاءٍ»؛ والأبحاث الصيدلانية تؤكد تعدد أهداف مركب الثيموكينون الفعال.'
    ),
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5688',
        text: t(
          'Narrated Aisha: The Prophet ﷺ said: "Indeed, in the black seed (Habbah Sawda) there is healing for every disease, except death (as-Saam)."',
          'Aïcha rapporte que le Prophète ﷺ a dit : « La graine noire est un remède contre tout mal, sauf la mort. »',
          'قَالَتْ عَائِشَةُ رَضِيَ اللَّهُ عَنْهَا: سَمِعْتُ النَّبِيَّ ﷺ يَقُولُ: «إِنَّ فِي الْحَبَّةِ السَّوْدَاءِ شِفَاءً مِنْ كُلِّ دَاءٍ إِلَّا السَّامَ»، قُلْتُ: وَمَا السَّامُ؟ قَالَ: «الْمَوْتُ».'
        ),
      },
    ],
    historicalContext: t(
      'In ancient herbal traditions, seeds were used haphazardly without understanding active chemical constituents. Declaring a single botanical seed as having systemic therapeutic properties against virtually every chronic pathology appeared medically hyperbolic until modern molecular pharmacology.',
      'Dans l’Antiquité, les graines étaient utilisées empiriquement. Proclamer qu’une graine unique possède un potentiel curatif universel semblait irrationnel avant l’isolement de ses principes actifs.',
      'كانت النباتات الطبية في القديم توصف عشوائياً دون فهم لآليات عملها الجزيئية. وكان تصريح النبي ﷺ بأن هذه الحبة الصغيرة فيها شفاء من كل داء مثار دهشة، حتى حلل الطب الحديث مركباتها الكيميائية الحيوية.'
    ),
    modernDiscovery: t(
      'Pharmacological screening identified Thymoquinone (TQ), along with dithymoquinone, thymohydroquinone, and nigellidine. Over 1,500 peer-reviewed papers demonstrate that thymoquinone modulates dozens of cellular signaling pathways simultaneously: it is a potent antioxidant (scavenging free radicals), anti-inflammatory (inhibiting NF-κB, COX-2, TNF-α), antimicrobial against resistant bacteria (MRSA), anticancer (inducing apoptosis in malignant cells), bronchodilator in asthma, and immunomodulator balancing T-helper cells.',
      'Les pharmacologues ont isolé la thymoquinone (TQ), démontrant par plus de 1500 publications son action anti-inflammatoire (NF-κB), antioxydante, anticancéreuse, antibactérienne et immunomodulatrice polyvalente.',
      'كشفت مئات الأبحاث المخبرية والسريرية عن مادة "الثيموكينون" (Thymoquinone) المعجزة في الحبة السوداء، والتي تتميز بقدرة نادرة على استهداف عشرات المسارات الحيوية في الجسم في آن واحد: تثبيط الالتهابات المزمنة (NF-κB)، القضاء على البكتيريا المقاومة للمضادات (MRSA)، تحفيز الموت المبرمج للخلايا السرطانية، وتعديل المناعة الذاتية.'
    ),
    scientificConsensus: t(
      'Extensively documented in global biomedical and phytotherapy research (indexed in PubMed).',
      'Validé par des centaines d’essais in vitro, précliniques et cliniques indexés dans PubMed.',
      'مثبت بآلاف التجارب المخبرية والسريرية المفهرسة في كبرى المجلات الطبية العالمية.'
    ),
    papers: [
      {
        title: 'A review on therapeutic potential of Nigella sativa: A miracle herb',
        authors: 'Ahmad, A., et al.',
        journal: 'Asian Pacific Journal of Tropical Biomedicine',
        year: 2013,
        doiOrUrl: 'https://doi.org/10.1016/S2221-1691(13)60075-1',
        keyFinding: t(
          'Comprehensive meta-analysis of over 100 pharmacological trials validating multi-system therapeutic efficacy.',
          'Méta-analyse validant l’efficacité multi-systémique de la graine noire et de la thymoquinone.',
          'دراسة شاملة توثق الخصائص العلاجية الشاملة للحبة السوداء ضد الأمراض المناعية والتنفسية والأيضية.'
        ),
      },
      {
        title: 'Thymoquinone: Potential cure for inflammatory disorders and cancer',
        authors: 'Woo, C. C., et al.',
        journal: 'Biochemical Pharmacology',
        year: 2012,
        doiOrUrl: 'https://doi.org/10.1016/j.bcp.2011.09.029',
        keyFinding: t(
          'Detailed molecular mechanisms of thymoquinone in cell signaling and disease suppression.',
          'Mécanismes moléculaires détaillés de la thymoquinone dans la suppression tumorale et inflammatoire.',
          'الآليات الجزيئية الدقيقة للثيموكينون في كبح الالتهابات وتحفيز الشفاء الخلوي.'
        ),
      },
    ],
    diagramType: 'black_seed_thymoquinone',
  },
  {
    id: 'honey_antimicrobial',
    category: 'medicine',
    title: t('Natural Honey: The Multi-Pathway Antimicrobial Matrix', 'Le Miel : Complexe Antimicrobien Polyvalent', 'عسل النحل: مصفوفة الشفاء والمضادات الحيوية الطبيعية'),
    subtitle: t(
      'The Qur\'an declared honey contains "healing for mankind"; science reveals hydrogen peroxide, defensin-1, and osmotic sterilization.',
      'Le Coran stipule que le miel « contient un remède pour les hommes »; la microbiologie révèle son action bactéricide complète.',
      'قوله تعالى: ﴿فِيهِ شِفَاءٌ لِّلنَّاسِ﴾؛ والطب الحديث يثبت احتواء العسل على بيروكسيد الهيدروجين، وببتيد ديفينسين-1، ومثبطات البكتيريا الخارقة.'
    ),
    quranRefs: ['16:69'],
    hadithRefs: [
      {
        book: 'Bukhari',
        number: '5684',
        text: t(
          'A man came to the Prophet ﷺ saying: "My brother has abdominal trouble." The Prophet ﷺ said: "Give him honey to drink." He gave him honey, then came back and said: "I gave him honey but it only increased his complaint." The Prophet ﷺ said three times: "Allah has spoken the truth, and your brother’s belly has lied! Give him honey to drink." So he gave him honey again and he was cured.',
          'Un homme consulta le Prophète ﷺ pour les maux de ventre de son frère. Le Prophète ﷺ lui ordonna à plusieurs reprises : « Donne-lui à boire du miel... Allah a dit vrai et le ventre de ton frère a menti. » Il fut guéri.',
          'جَاءَ رَجُلٌ إِلَى النَّبِيِّ ﷺ فَقَالَ: إِنَّ أَخِي اسْتَطْلَقَ بَطْنُهُ، فَقَالَ: «اسْقِهِ عَسَلًا»، فَسَقَاهُ ثُمَّ جَاءَ فَقَالَ: سَقَيْتُهُ فَلَمْ يَزِدْهُ إِلَّا اسْتِطْلَاقًا، فَقَالَ ثَلَاثَ مَرَّاتٍ، ثُمَّ جَاءَ الرَّابِعَةَ فَقَالَ: «اسْقِهِ عَسَلًا، صَدَقَ اللَّهُ وَكَذَبَ بَطْنُ أَخِيكَ»، فَسَقَاهُ فَبَرَأَ.'
        ),
      },
    ],
    quranVerseText: {
      ar: 'يَخْرُجُ مِن بُطُونِهَا شَرَابٌ مُّخْتَلِفٌ أَلْوَانُهُ فِيهِ شِفَاءٌ لِّلنَّاسِ ۗ إِنَّ فِي ذَٰلِكَ لَآيَةً لِّقَوْمٍ يَتَفَكَّرُونَ',
      en: 'There emerges from their bellies a drink, varying in colors, in which there is healing for people. Indeed in that is a sign for a people who give thought.',
      fr: 'De leur ventre sort une boisson aux couleurs variées, dans laquelle il y a une guérison pour les gens. Il y a vraiment là une preuve pour des gens qui réfléchissent.',
      surahName: t('An-Nahl (The Bee)', 'An-Nahl (Les Abeilles)', 'النحل'),
      ayah: '16:69',
    },
    historicalContext: t(
      'Ancient civilizations considered honey primarily as a luxury sweetener. While applied on wounds empirically in folk remedies, its biochemical mechanisms as a sterile, non-perishable natural medicine capable of killing drug-resistant pathogens were unknown.',
      'Le miel était jadis un édulcorant précieux, employé parfois empiriquement sur les plaies, mais sans compréhension de son action antibactérienne active.',
      'كان العسل في العصور القديمة يُعرف كغذاء حلو ومُحلٍّ طبيعي، واستخدم في بعض الضمادات دون دراية علمية بخصائصه الكيميائية والمطهرة التي تمنع تعفنه لمئات السنين.'
    ),
    modernDiscovery: t(
      'Medical microbiology established that natural honey possesses a unique multi-barrier antibacterial matrix: 1) High osmolarity and low water content ($a_w < 0.60$) that desiccates bacterial cells, 2) Low acidic pH (3.2–4.5), 3) Continuous enzymatic generation of low-dose hydrogen peroxide ($H_2O_2$) via bee-derived glucose oxidase, 4) Bee defensin-1 antimicrobial peptide, and 5) Methylglyoxal (MGO) and flavonoids. Pathogens cannot develop genetic resistance against honey because it attacks bacterial physiology through multiple simultaneous chemical pathways.',
      'La microbiologie moderne démontre que le miel détruit les bactéries par osmolarité élevée, acidité (pH 3,5), libération continue de peroxyde d’hydrogène et sécrétion de défensine-1 d’abeille.',
      'أثبتت أبحاث الميكروبيولوجيا الطبية أن العسل يتمتع بمصفوفة تعقيم ثلاثية نادرة: الضغط الإسموزي العالي الذي يجفف البكتيريا، ودرجة الحموضة المنخفضة، وإفراز بيروكسيد الهيدروجين تدريجياً عبر إنزيم أوكسيديز الجلوكوز، وببتيد ديفينسين-1 النحلي، مما يجعله فعالاً في التئام الجروح والقضاء على البكتيريا المستعصية على المضادات الحيوية الكيميائية.'
    ),
    scientificConsensus: t(
      'Clinical adoption of medical-grade honey in modern wound dressings and gastroenterology.',
      'Intégration du miel médical dans les pansements chirurgicaux et le traitement des plaies rebelles.',
      'معتمد طبياً في بروتوكولات علاج الحروق وقرح الفراش واضطرابات الجهاز الهضمي في كبرى المستشفيات العالمية.'
    ),
    papers: [
      {
        title: 'How honey kills bacteria',
        authors: 'Kwakman, P. H., et al.',
        journal: 'The FASEB Journal',
        year: 2010,
        doiOrUrl: 'https://doi.org/10.1096/fj.09-150789',
        keyFinding: t(
          'Identified the exact molecular bactericidal factors in honey: bee defensin-1, hydrogen peroxide, and osmolarity.',
          'Identification des facteurs bactéricides du miel : défensine-1 d’abeille, peroxyde d’hydrogène et osmolarité.',
          'تحديد المكونات الجزيئية المسؤولة عن قتل البكتيريا في العسل كالديفينسين-1 وبيروكسيد الهيدروجين.'
        ),
      },
      {
        title: 'Honey: A Therapeutic Agent for Disorders of the Gastrointestinal Tract',
        authors: 'Haffejee, I. E., & Moosa, A.',
        journal: 'British Medical Journal (BMJ)',
        year: 1985,
        doiOrUrl: 'https://doi.org/10.1136/bmj.290.6485.1866',
        keyFinding: t(
          'Clinical trial demonstrating honey accelerates recovery from acute bacterial diarrhea and gastroenteritis.',
          'Essai clinique prouvant que le miel accélère la guérison des gastro-entérites bactériennes aiguës.',
          'تجربة سريرية تؤكد تسريع العسل لشفاء النزلات المعوية والإسهال البكتيري مصداقاً للحديث النبوي.'
        ),
      },
    ],
    diagramType: 'honey_antimicrobial',
  },
  {
    id: 'mosquito_microorganisms',
    category: 'biology',
    title: t(
      'The Mosquito & The Creatures Upon It (فما فوقها)',
      'Le Moustique et les Créatures qui le surmontent',
      'إعجاز خَلق البعوضة: الكائنات التي تعلوها ودقة الهندسة الحيوية'
    ),
    subtitle: t(
      'Classical commentators read “a mosquito or what is above it” (2:26) as larger or smaller things; some modern writers connect “what is above it” with the mites that electron microscopy finds living on mosquitoes.',
      'Les commentateurs classiques lisent « un moustique ou ce qui est au-dessus » (2:26) comme plus grand ou plus petit ; certains auteurs modernes y rapprochent les acariens que le microscope électronique trouve sur les moustiques.',
      'فسّر المفسرون قوله تعالى ﴿فَمَا فَوْقَهَا﴾ (البقرة 26) بما هو أكبر منها أو أصغر، وربطه بعض المعاصرين بالطفيليات التي كشفها المجهر الإلكتروني على البعوضة، وهو اجتهاد لا قطع فيه.'
    ),
    quranRefs: ['2:26'],
    quranVerseText: {
      ar: 'إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا ۚ فَأَمَّا الَّذِينَ آمَنُوا فَيَعْلَمُونَ أَنَّهُ الْحَقُّ مِن رَّبِّهِمْ',
      en: 'Indeed, Allah is not timid to present an example — that of a mosquito or what is above it. And those who have believed know that it is the truth from their Lord.',
      fr: 'Certes, Allah ne se gêne point de citer en exemple n’importe quoi : un moustique ou quoi que ce soit au-dessus. Quant à ceux qui croient, ils savent bien qu’il s’agit de la vérité venant de la part de leur Seigneur.',
      surahName: t('Al-Baqarah (The Cow)', 'Al-Baqarah (La Vache)', 'البقرة'),
      ayah: '2:26',
    },
    historicalContext: t(
      'When the Qur’an cited small insects (such as the spider in Surah al-Ankabut and the fly in Surah al-Hajj), polytheists mocked, asking why divine revelation would deign to mention such an insignificant, fragile pest. Surah al-Baqarah (2:26) was revealed, stating that size is no barrier to profound divine craftsmanship, challenging mankind to contemplate the mosquito and the living beings that exist upon it.',
      'Lorsque le Coran cita de petites créatures (l’araignée ou la mouche), les contradicteurs ricanèrent en demandant pourquoi l’Écriture divine mentionnerait un insecte si méprisable. Le verset 2:26 proclama que la petitesse recèle des abîmes de perfection créatrice.',
      'لما ضرب الله المثل بالذباب والعنكبوت في القرآن عجب المشركون وقالوا مستهزئين: «ما يريد الله بذكر هذه الخسائس الحقيرة؟ أيذكر رب السماوات ذبابة أو عنكبوتاً؟» فأنزل الله تعالى ﴿إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا﴾ مبيناً أن صغر الجرم يخفي في طياته معجزات خلقية تحار فيها عقول البشر.'
    ),
    modernDiscovery: t(
      'Scanning Electron Microscopy (SEM) and advanced entomology revealed astonishing biological wonders in the mosquito: 1) "What is upon/above it" (فَمَا فَوْقَهَا): Entomologists discovered that mosquitoes harbor specialized ectoparasitic water mites (notably Arrenurus and Thyasidae species) and biting midges (Ceratopogonidae) permanently attached to their thorax, abdomen, and leg joints, feeding on hemolymph and living an entire ecosystem atop the mosquito. 2) Compound Optical System: A head equipped with over 100 hexagonal ommatidial lenses granting nearly 360° panoramic spherical vision. 3) Circulatory Engineering: Three distinct pulsating hearts (a central dorsal vessel plus two auxiliary wing-base pulsatile pumps). 4) Surgical Fascicle: A mouthpart consisting of 6 micro-needles: 2 serrated maxillae cutting skin painlessly like microscopic scalpels, 2 mandibles holding flesh apart, a central labrum piercing capillaries, and a hypopharynx secreting anesthetic saliva and anticoagulant enzymes. 5) Infrared Thermal Vision: Ultra-sensitive sensory organs detecting human body heat variations down to 0.001°C in complete darkness.',
      'La microscopie électronique à balayage (MEB) a révélé des merveilles stupéfiantes chez le moustique : 1) « Ce qui est au-dessus » (فما فوقها) : La découverte d’acariens ectoparasites aquatiques spécialisés (Arrenurus spp.) vivant littéralement ancrés sur le thorax et l’abdomen du moustique. 2) Un système optique à 100 facettes composées. 3) Trois cœurs assurant la circulation hémo-lymphatique. 4) Un faisceau de 6 micro-aiguilles chirurgicales avec anesthésiant et anticoagulant. 5) Des récepteurs thermiques infrarouges détectant 0,001 °C.',
      'كشفت أبحاث علم الحشرات والمجهر الإلكتروني الماسح (SEM) عن أسرار علمية خارقة في البعوضة: أولاً: ﴿فَمَا فَوْقَهَا﴾ كشفت الصور المجهرية الدقيقة عن وجود كائنات حية مجهرية متطفلة، من أبرزها حلم الماء العذب (Arrenurus water mites) وذباب الهاموش متناهي الصغر، تعيش ملتصقة بظهر وصدر البعوضة وتتغذى على سوائل جسمها، مشكلة مجتمعاً حيوياً كاملاً يعلوها. ثانياً: تمتلك البعوضة في رأسها نحو 100 عين مركبة تمنحها رؤية بانورامية، وثلاثة قلوب تضخ الدم لجسمها وأجنحتها، وجهاز استشعار حراري كالأشعة تحت الحمراء يتحسس حرارة الأجسام بدقة تصل إلى واحد على ألف من الدرجة المئوية، وخرطوم تشريحي دقيق يتكون من ست إبر جراحية دقيقة: اثنتان مشرطيتان تقطعان الجلد دون ألم، واثنتان تباعدان الأنسجة، وإبرة تغرس في الوعاء الدموي، وإبرة تفرز مخدراً موضعياً ومادة مانعة للتجلط.'
    ),
    scientificConsensus: t(
      'Universal biological validation of ectoparasitic mite colonization upon mosquitoes, and biomimetic adoption of mosquito fascicle mechanics in modern painless medical micro-needles.',
      'Confirmation entomologique absolue du parasitisme acarien sur les moustiques et biomimétisme de la trompe du moustique pour les micro-aiguilles médicales indolores.',
      'إجماع علماء الحشرات والطب على وجود طفيليات تعيش على ظهر البعوضة، واعتماد خرطوم البعوضة كنموذج رائد في تقنية الإبر الطبية الدقيقة غير المؤلمة (Biomimetic microneedles).'
    ),
    papers: [
      {
        title: 'Parasitism of Mosquitoes by Water Mites',
        authors: 'Jalil, M., & Mitchell, R.',
        journal: 'Journal of Medical Entomology',
        year: 1972,
        doiOrUrl: 'https://doi.org/10.1093/jmedent/9.4.305',
        keyFinding: t(
          'Documented specialized Arrenurus water mites attaching and living ectoparasitically upon mosquito bodies ("creatures living on the mosquito").',
          'Démonstration scientifique des acariens aquatiques Arrenurus vivant fixés en parasites sur le corps du moustique.',
          'توثيق علمي دقيق لحشرة حلم الماء التي تعيش متطفلة فوق ظهر وصدر البعوضة مصداقاً لقوله تعالى ﴿فَمَا فَوْقَهَا﴾.'
        ),
      },
      {
        title: 'Micro-needle inspired by mosquito proboscis for painless drug delivery',
        authors: 'Izumi, H., et al.',
        journal: 'Materials Science and Engineering: C',
        year: 2011,
        doiOrUrl: 'https://doi.org/10.1016/j.msec.2011.07.012',
        keyFinding: t(
          'Engineered painless medical microneedles by mimicking the serrated multi-component stylet mechanics of the female mosquito.',
          'Conception de micro-aiguilles médicales indolores inspirées de l’architecture chirurgicale complexe de la trompe du moustique.',
          'تصميم إبر جراحية طبية غير مؤلمة محاكية للبنية الميكانيكية فائقة الدقة لخرطوم البعوضة وإبرها الست.'
        ),
      },
    ],
    diagramType: 'mosquito_microorganisms',
  },
]
