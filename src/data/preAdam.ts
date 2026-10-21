import type { L3 } from './types'

export interface AngelEntry {
  id: string
  name: L3
  arabicHonorific: string
  role: L3
  quranRefs: string[]
  hadithRefs: string[]
  appearance: L3
}

export interface PreAdamEntity {
  id: string
  name: L3
  subTitle: L3
  nature: L3
  era: L3
  quranRefs: string[]
  scholarlySources: {
    author: L3
    work: L3
    citation: L3
  }[]
  summary: L3
  detailedDescription: L3
  theologicalContext: L3
  scientificCorrelation?: L3
  famousAngels?: AngelEntry[]
}

export const FAMOUS_ANGELS: AngelEntry[] = [
  {
    id: 'jibril',
    name: {
      en: 'Jibril / Gabriel (The Spirit of Truth)',
      fr: 'Jibril / Gabriel (L’Esprit Fidèle)',
      ar: 'جبريل عليه السلام (الروح الأمين والقدس)',
    },
    arabicHonorific: 'عَلَيْهِ ٱلسَّلَامُ',
    role: {
      en: 'Archangel of Divine Revelation (Wahy) to all prophets; Chief and commander of all celestial hosts.',
      fr: 'Archange de la Révélation divine (al-Wahy) à tous les prophètes ; Chef suprême des anges.',
      ar: 'أمين وحي السماء، وحامل رسالة التوحيد إلى جميع الأنبياء والرسل، وسيد الملائكة المقربين.',
    },
    quranRefs: ['2:97-98', '26:193-194', '53:5-18', '81:19-21', '66:4'],
    hadithRefs: ['Sahih al-Bukhari 3232, 4856', 'Sahih Muslim 174, 8'],
    appearance: {
      en: 'Endowed with 600 wings. The Prophet Muhammad ﷺ saw him twice in his true celestial form: his majestic body filled the entire horizon from east to west, blocking out the sky. Showers of rubies, pearls, and iridescent emerald gems scattered from his green wings (Sahih al-Bukhari 3232). In human form, he visited the companions looking like an extraordinarily handsome man with pitch-black hair and dazzling white clothing without travel dust (Hadith Jibril, Sahih Muslim 8), or resembling the noble companion Dihyah al-Kalbi.',
      fr: 'Doté de 600 ailes. Le Prophète ﷺ l’a contemplé à deux reprises sous sa forme céleste originale : son corps colossal emplissait l’horizon d’est en ouest, voilant le ciel. Des perles, des rubis et des gemmes éclatantes tombaient de ses ailes (Sahih al-Bukhari 3232). Sous forme humaine, il apparaissait comme un homme d’une beauté sublime, aux cheveux d’un noir profond et aux vêtements d’une blancheur immaculée (Hadith de Jibril, Sahih Mouslim 8).',
      ar: 'له ستمائة جناح. رآه النبي ﷺ على صورته الملكية الحقيقية مرتين: مرة بالأفق الأعلى وقد سدّ ما بين المشرق والمغرب يملأ عظم خلقه ما بين السماء والأرض، ويتناثر من ريش أجنحته الخضر الدر والياقوت واللؤلؤ المنثور (صحيح البخاري 3232). وعندما ينزل بالوحي بين الصحابة كان يتمثل في هيئة رجل شديد بياض الثياب، شديد سواد الشعر، لا يُرى عليه أثر السفر، وكان يشبه الصحابي الجليل دِحية الكلبي لحسن صورته وجماله (صحيح مسلم 8).',
    },
  },
  {
    id: 'mikail',
    name: {
      en: 'Mikail / Michael (Angel of Provision & Rain)',
      fr: 'Mīkā’īl / Michel (Ange des Pluies et de la Subsistance)',
      ar: 'ميكائيل عليه السلام (موكل الأرزاق والأمطار)',
    },
    arabicHonorific: 'عَلَيْهِ ٱلسَّلَامُ',
    role: {
      en: 'Entrusted with rainfall, moving the clouds, water cycles, vegetation, and natural sustenance of Earth.',
      fr: 'Chargé de la pluie, du mouvement des nuages, de la végétation et de la subsistance terrestre.',
      ar: 'الملَك المقرب الموكل بإنزال الغيث والقطر، وتصريف السحاب، وإنبات الزروع، وأرزاق العباد في الأرض.',
    },
    quranRefs: ['2:98'],
    hadithRefs: ['Musnad Ahmad 13343', 'Sunan at-Tirmidhi 3129'],
    appearance: {
      en: 'A towering celestial archangel of profound reverence. The Prophet Muhammad ﷺ asked Jibril: "Why is it that I never see Mikail smile?" Jibril answered: "Mikail has never once smiled since the Hellfire was created" (Musnad Ahmad 13343). His presence embodies cosmic gravity, commanding storm clouds, river basins, and the nurturing precipitation of the globe.',
      fr: 'Un archange immense d’une révérence solennelle. Le Prophète ﷺ demanda à Jibril : « Pourquoi ne vois-je jamais Mikail sourire ? » Jibril répondit : « Mikail n’a plus jamais souri depuis que l’Enfer a été créé » (Musnad Ahmad 13343). Il dirige les nuages et la pluie par décret divin.',
      ar: 'مَلَك عظيم جليل القدر شديد الهيبة والوقار. سأل النبي ﷺ جبريل عليه السلام: «ما لي لا أرى ميكائيل ضاحكاً قط؟» فقال جبريل: «ما ضحك ميكائيل منذ خُلقت النار» (مسند أحمد 13343). وهو خلق عظيم مهيب يتصرف في السحاب والرياح والأمطار بإذن الله وأمره الكوني الحكيم.',
    },
  },
  {
    id: 'israfil',
    name: {
      en: 'Israfil (The Angel of the Trumpet)',
      fr: 'Isrāfīl (L’Ange du Clairon et de la Résurrection)',
      ar: 'إسرافيل عليه السلام (صاحب الصُّور)',
    },
    arabicHonorific: 'عَلَيْهِ ٱلسَّلَامُ',
    role: {
      en: 'Entrusted with blowing the Trumpet (Sur) for cosmic destruction (Nafkhat as-Sa\'q) and the universal Resurrection (Nafkhat al-Ba\'th).',
      fr: 'Chargé de sonner la Trompe (as-Soûr) pour le cataclysme universel et la Résurrection de toutes les créatures.',
      ar: 'الملَك المقرب الموكل بالنفخ في الصُّور: نفخة الصَّعق لموت الخلائق واندثار الكون، ونفخة البعث والنشور لقيام الناس لرب العالمين.',
    },
    quranRefs: ['39:68', '69:13', '50:41', '20:102'],
    hadithRefs: ['Sunan at-Tirmidhi 2431, 3243 (Sahih)', 'Musnad Ahmad'],
    appearance: {
      en: 'Stands before the Divine Throne in continuous awe and vigilance. The Prophet ﷺ said: "How can I be at ease when the Angel of the Horn has already put the Trumpet to his mouth, tilted his forehead, bent his ear, waiting in rapt attention for the order to blow?" (Sunan at-Tirmidhi 2431). His eyes are like glittering stars, fixed unwaveringly upon the Throne.',
      fr: 'Se tient debout face au Trône Divin dans une vigilance totale. Le Prophète ﷺ a dit : « Comment pourrais-je me réjouir alors que le préposé à la Trompe a déjà embouché le Cor, incliné son front, tendu l’oreille, attendant l’ordre de souffler ? » (at-Tirmidhi 2431).',
      ar: 'واقف في خشوع عظيم تلقاء العرش مهيأ للنفخ. قال رسول الله ﷺ: «كيف أنعمُ وصاحبُ القرنِ قد التقم القرنَ، وحنى جبهتَه، وأصغى سمعَه ينتظرُ أن يُؤمَرَ فينفُخَ؟» (سنن الترمذي 2431). عيناه شاخصتان نحو العرش لا يطرف، كأنهما كوكبان دريان من الخشية والترقب لنداء البعث والنشور.',
    },
  },
  {
    id: 'malak_al_mawt',
    name: {
      en: 'Malak al-Mawt (The Angel of Death)',
      fr: 'Malak al-Mawt (L’Ange de la Mort)',
      ar: 'ملَك الموت عليه السلام (قابض الأرواح)',
    },
    arabicHonorific: 'عَلَيْهِ ٱلسَّلَامُ',
    role: {
      en: 'Entrusted with taking the souls of all human beings, jinn, and creatures at their appointed term.',
      fr: 'Chargé de recueillir les âmes de toutes les créatures à l’instant précis décrété pour leur mort.',
      ar: 'الموكل بقبض أرواح جميع الخلائق والإنس والجن والحيوان عند انقضاء آجالها المحتومة في اللوح المحفوظ.',
    },
    quranRefs: ['32:11', '6:61', '79:1-2', '4:97'],
    hadithRefs: ['Musnad Ahmad 18534 (Sahih)', 'Sunan Abi Dawud 3212'],
    appearance: {
      en: 'Possesses a dual visual appearance corresponding to the soul’s faith. To the righteous, he arrives alongside Angels of Mercy whose faces shine as bright as the sun, carrying silk shrouds and musk from Paradise. To the corrupt and rebellious, he arrives with Angels of Wrath whose faces are dark, grim, and terrifying, carrying coarse sackcloth and pulling out the soul with irresistible force (Musnad Ahmad 18534).',
      fr: 'Son apparence est double : pour le croyant vertueux, il descend avec des anges aux visages lumineux comme le soleil, vêtus de suaires parfumés du Paradis. Pour le transgresseur orgueilleux, il descend avec des anges aux visages ténébreux et effrayants, munis de toiles grossières (Musnad Ahmad 18534).',
      ar: 'يأتي على صورتين بحسب خاتمة العبد: إن كان العبد مؤمناً صالحاً نزل إليه ملائكة بيض الوجوه كأن وجوههم الشمس، معهم كفن وحنوط من الجنة، ويجلس ملك الموت عند رأسه برفق ويبشره برضوان الله. وإن كان العبد فاجراً نزل إليه ملائكة سود الوجوه معهم المسوح الخشنة الشديدة، وينتزع الروح انتزاعاً مهيباً (مسند أحمد 18534).',
    },
  },
  {
    id: 'hamalat_al_arsh',
    name: {
      en: 'Hamalat al-’Arsh (The Bearers of the Throne)',
      fr: 'Hamalat al-’Arsh (Les Porteurs du Trône Suprême)',
      ar: 'حَمَلَة العرش عليهم السلام',
    },
    arabicHonorific: 'عَلَيْهِمُ ٱلسَّلَامُ',
    role: {
      en: 'Colossal beings carrying the Divine Throne (four in number now, eight on Resurrection Day), praising Allah and seeking forgiveness for believers.',
      fr: 'Êtres colossaux portant le Trône Divin (quatre actuellement, huit au Jour Dernier), glorifiant Allah et implorant le pardon pour les croyants.',
      ar: 'الملائكة العظام الذين يحملون عرش الرحمن، أربعة في الدنيا وثمانية يوم القيامة ﴿وَيَحْمِلُ عَرْشَ رَبِّكَ فَوْقَهُمْ يَوْمَئِذٍ ثَمَانِيَةٌ﴾، يسبحون بحمد ربهم ويستغفرون للذين آمنوا.',
    },
    quranRefs: ['40:7-9', '69:17'],
    hadithRefs: ['Sunan Abi Dawud 4727 (Sahih)', 'Al-Mu\'jam al-Awsat'],
    appearance: {
      en: 'Among the largest created entities. The Prophet ﷺ said: "I have been permitted to speak about an angel from the angels of Allah who bear the Throne: the distance between the lobe of his ear and his shoulder is seven hundred years of continuous flight by a bird" (Sunan Abi Dawud 4727). Their feet pierce the deepest foundations of existence while their crowns bear the Throne.',
      fr: 'Parmi les plus gigantesques créatures de l’univers. Le Prophète ﷺ a dit : « Il m’a été permis de décrire un ange porteur du Trône : la distance entre le lobe de son oreille et son épaule équivaut à 700 ans de vol pour un oiseau rapide » (Abou Daoud 4727).',
      ar: 'من أعظم المخلوقات خلقاً وجسامة في الملكوت. قال رسول الله ﷺ: «أُذِنَ لي أن أُحَدِّثَ عن ملَكٍ من ملائكةِ اللهِ من حَمَلةِ العرشِ: إنَّ ما بين شحمةِ أُذُنِه إلى عاتقِه مسيرةُ سبعمائةِ عامٍ» (سنن أبي داود 4727). أقدامهم في تخوم الأرضين والعرش فوق رؤوسهم وهم يسبحون خاشعين لوقار رب العزة.',
    },
  },
  {
    id: 'malik_and_zabaniyah',
    name: {
      en: 'Malik & The Nineteen Zabaniyah',
      fr: 'Mālik & Les Dix-Neuf Zabāniyah',
      ar: 'مالك وخزنة جهنم والزبانية التسعة عشر',
    },
    arabicHonorific: 'عَلَيْهِمُ ٱلسَّلَامُ',
    role: {
      en: 'Chief warden of Hellfire and the 19 severe angelic officers executing divine justice without hesitation.',
      fr: 'Gardien chef de la Géhenne et les 19 officiers angéliques redoutables appliquant la justice divine.',
      ar: 'خازن جهنم ورئيس خزنتها، ومعه تسعة عشر ملَكاً غلاظاً شداداً ﴿لَّا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ﴾.',
    },
    quranRefs: ['43:77', '74:29-31', '66:6', '96:18'],
    hadithRefs: ['Sahih al-Bukhari 3239', 'Sahih Muslim'],
    appearance: {
      en: 'Awe-inspiring and devoid of laughter. The Prophet ﷺ saw Malik during the Night Journey (Isra and Mi\'raj): a stern, unsmiling guardian who has never smiled since the day Hell was ignited (Sahih al-Bukhari 3239). The 19 Zabaniyah possess crushing power, eyes like piercing lightning flashes, and unbending severity.',
      fr: 'D’une sévérité implacable. Le Prophète ﷺ a vu Malik lors de l’Ascension : un gardien farouche dont le visage n’a jamais souri depuis l’allumage du Feu (Sahih al-Bukhari 3239). Les 19 Zabaniyah sont d’une force cosmique écrasante.',
      ar: 'خلق مهيب شديد الصرامة والغلظة، لا يعرف الضحك أو اللين. رآه النبي ﷺ ليلة الإسراء والمعراج: رجلاً كريه المرآة قاطب الجبين لم يضحك قط منذ خُلق النار (صحيح البخاري 3239). والزبانية التسعة عشر ملائكة غلاظ شداد أعينهم كالبرق الخاطف وأفواههم كالشهب، لا يعصون الله ما أمرهم.',
    },
  },
  {
    id: 'ridwan',
    name: {
      en: 'Ridwan (The Keeper of Paradise)',
      fr: 'Ridwān (Le Gardien des Jardins du Paradis)',
      ar: 'رضوان عليه السلام (خازن الجنان)',
    },
    arabicHonorific: 'عَلَيْهِ ٱلسَّلَامُ',
    role: {
      en: 'Chief guardian of Jannah (Paradise), welcoming the righteous through its eight majestic gates.',
      fr: 'Gardien en chef des portes du Paradis, accueillant les bienheureux aux huit portes de félicité.',
      ar: 'خازن دار النعيم والجنان المشرف على أبواب الجنة الثمانية، يستقبل وفود المتقين بالسلام والتكريم ﴿وَقَالَ لَهُمْ خَزَنَتُهَا سَلَامٌ عَلَيْكُمْ طِبْتُمْ فَادْخُلُوهَا خَالِدِينَ﴾.',
    },
    quranRefs: ['39:73', '13:23-24'],
    hadithRefs: ['Sahih Muslim (Shafa\'ah)', 'Tafsir Ibn Kathir'],
    appearance: {
      en: 'Radiant, serene, and beaming with joyful celestial light. His countenance radiates warmth and welcome, greeting the believers with peace and honor as they enter their eternal rewards.',
      fr: 'Radieux, infiniment bienveillant, drapé d’une lumière céleste parfumée. Son visage respire la joie éternelle et la paix sublime.',
      ar: 'مَلَك نوراني طلق الوجه بشوش نضر، يفيض نوره سلاماً وبِشراً وتكريماً، يكسوه بهاء من نور الجنة، يحيي الداخلين بسلام الله وأمنه الأبدي.',
    },
  },
  {
    id: 'munkar_and_nakir',
    name: {
      en: 'Munkar & Nakir (Interrogators of the Grave)',
      fr: 'Mounkar & Nakīr (Les Interrogateurs de la Tombe)',
      ar: 'منكر ونكير عليهما السلام (فتنة القبر)',
    },
    arabicHonorific: 'عَلَيْهِمَا ٱلسَّلَامُ',
    role: {
      en: 'The two angels appointed to question every deceased soul in the grave regarding their Lord, religion, and Prophet.',
      fr: 'Les deux anges préposés à l’interrogatoire dans la tombe concernant le Seigneur, la religion et le Prophète.',
      ar: 'الملكان الموكلان بفتنة القبر وسؤال الميت في البرزخ عن ربه ودينه ونبيه ﷺ.',
    },
    quranRefs: ['14:27', '47:27'],
    hadithRefs: ['Sunan at-Tirmidhi 1071 (Sahih)', 'Musnad Ahmad'],
    appearance: {
      en: 'Described directly by the Prophet ﷺ: "Two angels come to the deceased in the grave, dark-blue and black (azraqān aswadān); one called Munkar and the other Nakir" (Sunan at-Tirmidhi 1071). Their voices echo like thunder, their eyes flash like lightning, and they hold massive iron rods capable of crushing mountains.',
      fr: 'Décrits textuellement par le Messager d’Allah ﷺ : « Deux anges viennent au défunt dans sa tombe, bleu-sombre et noirs (azraqan aswadan) ; l’un s’appelle Munkar et l’autre Nakir » (at-Tirmidhi 1071). Leurs voix grondent comme le tonnerre et leurs regards percent comme l’éclair.',
      ar: 'وصفهما النبي ﷺ وصفاً دقيقاً جلياً: «يأتيه ملَكانِ أسودانِ أزرقانِ، يُقال لأحدِهما المنكَرُ، وللآخَرِ النَّكيرُ» (سنن الترمذي 1071). أصواتهما كالرعد القاصف، وأبصارهما كالبرق الخاطف، ومعهما مرزبة من حديد لو اجتمع عليها أهل الثقلين ما أطاقوا حملها.',
    },
  },
  {
    id: 'kiraman_katibin',
    name: {
      en: 'Kiraman Katibin & Al-Mu’aqqibat',
      fr: 'Les Nobles Scribes & Les Anges Gardiens',
      ar: 'الكرام الكاتبون والمعقِّبات الحفظة',
    },
    arabicHonorific: 'عَلَيْهِمُ ٱلسَّلَامُ',
    role: {
      en: 'Honorable scribes constantly recording words and deeds, along with guardian protectors watching over humankind.',
      fr: 'Les nobles scribes consignant chaque parole et action, accompagnés des anges protecteurs.',
      ar: 'الملائكة الحفظة والكتبة الموكلون بإحصاء وكتابة أقوال العباد وأفعالهم، والمعقبات التي تحفظ الإنسان بأمر الله.',
    },
    quranRefs: ['50:17-18', '82:10-12', '13:11'],
    hadithRefs: ['Sahih al-Bukhari 6491', 'Al-Mu\'jam al-Kabir (Sahih)'],
    appearance: {
      en: 'Immaculate beings of light. The angel on the right records good deeds instantly, while the angel on the left waits six hours before logging a sin to allow time for sincere repentance and Istighfar. They remain unseen to human eyes, creating the faithful record that will be unrolled on Judgment Day.',
      fr: 'Êtres purs de lumière : l’ange à droite inscrit les bonnes actions immédiatement, tandis que l’ange à gauche attend six heures pour permettre le repentir sincère avant de consigner un péché. Invisibles à l’œil nu, ils consignent les registres parfaits.',
      ar: 'ملائكة نورانية نقية طاهرة لا تفارق الإنسان: ملَك اليمين يكتب الحسنات فوراً، وملَك الشمال يمهل العبد ست ساعات رجاء أن يستغفر ويتوب فلا يكتبها عليه. وهم كرام كاتبون يحفظون أعمال العباد في صحف لا تغادر صغيرة ولا كبيرة.',
    },
  },
  {
    id: 'harut_and_marut',
    name: {
      en: 'Harut & Marut (The Test of Babylon)',
      fr: 'Hārūt & Mārūt (L’Épreuve de Babylone)',
      ar: 'هاروت وماروت عليهما السلام',
    },
    arabicHonorific: 'عَلَيْهِمَا ٱلسَّلَامُ',
    role: {
      en: 'Sent to ancient Babylon as a divine test to expose the deception of sorcery and distinguish truth from falsehood.',
      fr: 'Envoyés à Babylone comme test pour distinguer le miracle prophétique de la supercherie occulte.',
      ar: 'ملكان أنزلهما الله ببابل ابتلاءً واختباراً للناس لتمييز السحر والشعوذة عن معجزات الأنبياء، مع تقديم النصح والإرشاد للمتعلمين.',
    },
    quranRefs: ['2:102'],
    hadithRefs: ['Tafsir Ibn Kathir', 'Tafsir at-Tabari'],
    appearance: {
      en: 'Noble angels sent to ancient Mesopotamia; they never taught any secret without explicitly warning beforehand: "We are only a test and trial, so do not disbelieve!" (2:102). They embodied angelic purity, refusing to deceive and laying bare the reality of occult corruptions.',
      fr: 'Deux anges descendus en Mésopotamie qui ne transmettaient rien sans proclamer au préalable : « Nous ne sommes qu’une épreuve : ne sois pas impie ! » (2:102).',
      ar: 'ملكان كريمان نزلا بأرض بابل فتنةً وتمحيصاً، لا يعلمان أحداً حتى يقولا له نصحاً وتذكيراً: ﴿إِنَّمَا نَحْنُ فِتْنَةٌ فَلَا تَكْفُرْ﴾ (البقرة: 102). وهما مظهر للنقاء الملائكي الناصح الصادق.',
    },
  },
]

export const PRE_ADAM_ENTITIES: PreAdamEntity[] = [
  {
    id: 'angels',
    name: {
      en: 'Al-Mala’ikah (The Angels of Light)',
      fr: 'Les Anges (Al-Malā’ikah, Créatures de Lumière)',
      ar: 'الملائكة الكرام (خلق النور والطاعة المطلقة)',
    },
    subTitle: {
      en: 'Created from pure celestial light before Adam; prostrated by divine command',
      fr: 'Créés de pure lumière céleste avant Adam ; prosternés sur ordre divin',
      ar: 'خُلقوا من نور قبل خلق آدم، وسجدوا له طاعةً لأمر الله وإعظاماً لخلافة الإنسان',
    },
    nature: {
      en: 'Noble spiritual beings created from light (Nur), possessing wings, completely devoid of disobedience, executing divine commands perpetually',
      fr: 'Êtres spirituels créés de lumière (Nur), ailés, impeccables et accomplissant sans cesse les décrets divins',
      ar: 'خلق نوراني عظيم لا يعصون الله ما أمرهم ويفعلون ما يؤمرون، يسبحون الليل والنهار لا يفترون (صحيح مسلم 2996)',
    },
    era: {
      en: 'Primordial Eternity Pre-Adam',
      fr: 'Éternité primordiale avant Adam',
      ar: 'الأزلية وسابق الخلق قبل استخلاف آدم',
    },
    quranRefs: ['35:1', '66:6', '2:30-34', '16:49-50', '21:19-20'],
    scholarlySources: [
      {
        author: { en: 'Aisha bint Abi Bakr (ra)', fr: 'Aïcha (ra)', ar: 'أم المؤمنين عائشة رضي الله عنها' },
        work: { en: 'Sahih Muslim (Hadith 2996)', fr: 'Sahih Mouslim (2996)', ar: 'صحيح مسلم (2996)' },
        citation: {
          en: 'The Messenger of Allah ﷺ said: “The Angels were created from light, the Jinn were created from a smokeless flame of fire, and Adam was created from what has been described to you [clay].”',
          fr: 'Le Messager d’Allah ﷺ a dit : « Les anges furent créés de lumière, les djinns furent créés d’une flamme ardente de feu, et Adam fut créé de ce qui vous a été décrit [argile]. »',
          ar: '«خُلِقَتِ الْمَلَائِكَةُ مِنْ نُورٍ، وَخُلِقَ الْجَانُّ مِنْ مَارِجٍ مِنْ نَارٍ، وَخُلِقَ آدَمُ مِمَّا وُصِفَ لَكُمْ.»',
        },
      },
      {
        author: { en: 'Ibn Kathir', fr: 'Ibn Kathir', ar: 'الحافظ ابن كثير' },
        work: { en: 'Al-Bidayah wa-n-Nihayah', fr: 'Al-Bidayah wa-n-Nihayah', ar: 'البداية والنهاية' },
        citation: {
          en: '“Allah created the angels prior to the creation of Adam and prior to the creation of the heavens and the earth. They are honored servants who speak not until He has spoken, and act by His command.”',
          fr: '« Allah créa les anges avant la création d’Adam et avant les cieux et la terre. Ce sont des serviteurs honorés qui ne devancent jamais Sa parole et exécutent Ses ordres. »',
          ar: '«خلق الله الملائكة قبل خلق آدم وقبل خلق السماوات والأرض، وهم عباد مكرمون لا يسبقونه بالقول وهم بأمره يعملون، وكلّف كل طائفة منهم بوظيفة كونية وتشريعية.»',
        },
      },
    ],
    summary: {
      en: 'The Angels were created from pure light long before humankind. When Allah announced the creation of Adam as earthly Khalifah, they inquired out of wonder, witnessed Adam’s divinely taught knowledge, and prostrated in total submission to Allah’s decree.',
      fr: 'Les anges furent créés de pure lumière bien avant l’humanité. Lorsque Dieu annonça la création d’Adam comme Khalife, ils s’enquirent avec déférence, constatèrent le savoir conféré à Adam et se prosternèrent dans une obéissance absolue.',
      ar: 'خلق نوراني طاهر سابق لخلق بني آدم. لما أعلمهم الله باستخلاف آدم استفسروا استعلاماً للحكمة، فشهدوا علمه الذي علمه الله وسجدوا لآدم طاعة لربهم وتكريماً لأبي البشر.',
    },
    detailedDescription: {
      en: 'Belief in the Angels is the second pillar of Islamic faith (Iman). They are vast in number and immense in power: Archangel Jibril (revelation and life of hearts), Mikail (rain and physical sustenance), Israfil (blower of the Horn of Resurrection), and Malak al-Mawt (gatherer of souls). When Allah shaped Adam from clay and breathed into him the divine spirit, He commanded the angels to prostrate to Adam as a gesture of honor and recognition of human potential. All angels bowed instantly without hesitation, embodying supreme obedience in contrast to the arrogance of Iblis.',
      fr: 'La foi aux anges est le second pilier de la foi musulmane. Ils sont d’une force cosmique colossale : Jibril (la révélation), Mikail (la pluie et la subsistance), Israfil (la Trompette de la Résurrection), et Malak al-Mawt (l’ange de la mort). Lorsqu’Allah insuffla Son souffle en Adam, Il ordonna aux anges de se prosterner devant lui par hommage. Tous s’inclinèrent spontanément, illustrant la sainteté et l’obéissance immaculée.',
      ar: 'الإيمان بالملائكة ركن من أركان الإيمان الستة. وهم جند الله الأطهار أولو أجنحة مثنى وثلاث ورباع ويزيد في الخلق ما يشاء: منهم جبريل أمين الوحي، وميكائيل موكل بالقطر والأرزاق، وإسرافيل صاحب الصور، وملك الموت، وحملة العرش. وعندما أمرهم الله بالسجود لآدم ﴿فَسَجَدَ الْمَلَائِكَةُ كُلُّهُمْ أَجْمَعُونَ﴾ امتثالاً خالصاً وتكريماً لعلم آدم وخلافته.',
    },
    theologicalContext: {
      en: 'Angels have no rebellious inclination or pride; their prostration to Adam was pure worship and obedience to Allah, manifesting the distinction between celestial obedience (Light) and demonic rebellion (Fire).',
      fr: 'Les anges ne possèdent nul penchant à la rébellion ; leur prosternation envers Adam était un acte de pure adoration et d’obéissance envers Allah, contrastant la lumière de la dévotion avec le feu de l’orgueil.',
      ar: 'سجود الملائكة لآدم كان سجود تحية وتكريم بأمر الله وطاعة له لا سجود عبادة، مبرهناً على كرامة بني آدم إذا آمنوا واستقاموا.',
    },
    famousAngels: FAMOUS_ANGELS,
  },
  {
    id: 'jinn',
    name: {
      en: 'Al-Jinn (Pre-Adamic Inhabitants)',
      fr: 'Les Djinns (Habitants pré-adamiques)',
      ar: 'الجن (سكان الأرض الأوائل)',
    },
    subTitle: {
      en: 'Created from scorching smokeless fire 2,000 years before humankind',
      fr: 'Créés d’un feu sans fumée 2 000 ans avant l’humanité',
      ar: 'خُلقوا من نار السموم قبل استخلاف بني آدم بألفي عام',
    },
    nature: {
      en: 'Created from a smokeless flame of scorching fire (Mārij min Nār / Nār as-Samūm)',
      fr: 'Créés d’une flamme de feu pur sans fumée (Mārij min Nār / Nār as-Samūm)',
      ar: 'مِن مَّارِجٍ مِّن نَّارٍ، ومِن نَّارِ السَّمُومِ',
    },
    era: {
      en: 'c. 2,000 yrs Pre-Adam',
      fr: 'env. 2 000 ans avant Adam',
      ar: 'نحو 2000 سنة قبل آدم',
    },
    quranRefs: ['15:27', '55:15', '2:30'],
    scholarlySources: [
      {
        author: { en: 'Ibn Kathir', fr: 'Ibn Kathir', ar: 'الحافظ ابن كثير' },
        work: { en: 'Al-Bidayah wa-n-Nihayah', fr: 'Al-Bidayah wa-n-Nihayah', ar: 'البداية والنهاية' },
        citation: {
          en: '“The Jinn inhabited the earth before Adam, peace be upon him, by two thousand years. They spread corruption and shed blood, so Allah sent upon them an army of angels who drove them to the islands of the seas.”',
          fr: '« Les djinns habitaient la terre deux mille ans avant Adam, paix sur lui. Ils y semèrent la corruption et firent couler le sang, alors Allah envoya contre eux une armée d’anges qui les chassèrent vers les îles des mers. »',
          ar: '«كانت الجن تسكن الأرض قبل خلق آدم عليه السلام بألفي عام، فأفسدوا فيها وسفكوا الدماء، فبعث الله إليهم جندًا من الملائكة فأجلوهم إلى جزائر البحار ورؤوس الجبال.»',
        },
      },
      {
        author: { en: 'Abdullah ibn Abbas (ra)', fr: 'Abdallah ibn Abbas (ra)', ar: 'عبد الله بن عباس رضي الله عنهما' },
        work: { en: 'Tafsir al-Tabari (Jami‘ al-Bayan)', fr: 'Tafsir al-Tabari', ar: 'تفسير الطبري (جامع البيان)' },
        citation: {
          en: 'Ibn Abbas said: “When the angels said: ‘Will You place therein one who causes corruption and sheds blood?’, they spoke because they had witnessed the bloodshed and warfare of the Jinn on Earth prior to Adam.”',
          fr: 'Ibn Abbas a dit : « Quand les anges dirent : “Vas-Tu y établir quelqu’un qui y sèmera la corruption et y répandra le sang ?”, ils le dirent car ils avaient constaté les guerres et le sang versé par les djinns sur terre avant Adam. »',
          ar: '«قالت الملائكة ذلك قياسًا على ما رأوه من إفساد الجن وسفكهم الدماء في الأرض قبل خلق آدم، فقالوا: أتجعل فيها من يفسد فيها ويسفك الدماء؟»',
        },
      },
    ],
    summary: {
      en: 'The Jinn inhabited the primordial earth long before the creation of Adam (pbuh). Endowed with free will, they established civilizations but eventually succumbed to warfare and bloodshed, leading to angelic intervention.',
      fr: 'Les Djinns peuplèrent la Terre bien avant la création d’Adam (psl). Dotés de libre arbitre, ils bâtirent des civilisations mais finirent par succomber aux guerres fratricides et au sang versé, provoquant l’intervention des armées célestes.',
      ar: 'أمة مكلّفة سكنت الأرض قبل بني آدم بألفي عام، وكان لهم فيها عمارة وحضارات، حتى فشا فيهم البغي وسفك الدماء، فأرسل الله الملائكة لطردهم إلى أقاصي البحار والقفار.',
    },
    detailedDescription: {
      en: 'According to authenticated Qur’anic text (Surah Al-Hijr 15:27 and Ar-Rahman 55:15), the Jinn were created prior to humankind from a smokeless blaze of intense heat. Classical Islamic historiography (Ibn Kathir, Al-Tabari) records that their society degenerated into chaotic warfare. Allah dispatched angels who subdued their rebellious factions, clearing the earth for the honored arrival of humanity’s father, Adam (pbuh).',
      fr: 'Selon le texte coranique authentique (Al-Hijr 15:27 et Ar-Rahman 55:15), les djinns furent créés avant l’homme à partir d’une flamme ardente sans fumée. L’historiographie islamique classique relate que leur société s’enfonça dans la violence. Allah dépêcha des anges pour repousser les factions rebelles, préparant la Terre pour l’arrivée honorée du père de l’humanité, Adam (psl).',
      ar: 'أخبر القرآن الكريم أن الجان خلقهم الله قبل خلق البشر من نار السموم ومارج من نار. وبيّن المفسرون والمؤرخون كالإمام ابن كثير وابن جرير الطبري أن الجن استخلفوا في الأرض، فلما بغى بعضهم على بعض وسفكوا الدماء، أرسل الله جندًا من الملائكة فأجلوهم إلى البحار، وهيأ الأرض لاستخلاف آدم عليه السلام وبنيه.',
    },
    theologicalContext: {
      en: 'Adam is the first human (Abu al-Bashar) and first prophet. The Jinn belong to an entirely separate metaphysical species (created from fire, possessing free will and moral responsibility).',
      fr: 'Adam est le premier être humain (Abou al-Bashar) et le premier prophète. Les djinns constituent une espèce métaphysique distincte créée de feu, dotée de raison et de responsabilité spirituelle.',
      ar: 'آدم عليه السلام هو أبو البشر قاطبة وأول الأنبياء. أما الجن فهم جنس مغاير خُلقوا من نار، وتسبق خلافتهم للأرض استخلاف بني آدم.',
    },
  },
  {
    id: 'iblis',
    name: {
      en: 'Iblis (Shaytan / Azazil)',
      fr: 'Iblîs (Satan / Azazîl)',
      ar: 'إبليس (الشيطان / عزازيل)',
    },
    subTitle: {
      en: 'From the Jinn; refused to prostrate to Adam out of arrogance and became humankind’s sworn enemy',
      fr: 'Issu des djinns ; refusa de se prosterner devant Adam par orgueil et devint l’ennemi juré de l’homme',
      ar: 'كان من الجن فاستكبر عن السجود لآدم طمعاً وغروراً، وصار العدو المبين لبني آدم',
    },
    nature: {
      en: 'Created from smokeless fire; attained high rank among angels through prior worship, then fell into pride',
      fr: 'Créé de feu sans fumée ; élevé au rang des anges par sa dévotion passée, avant de chuter par orgueil',
      ar: 'مخلوق من النار، بلغ منازل عالية بعبادته السابقة حتى رفع مع الملائكة، ثم سقط بالكبر والحسد',
    },
    era: {
      en: 'Before & during Adam’s creation',
      fr: 'Avant et lors de la création d’Adam',
      ar: 'قبل خلق آدم واستمر عدواً مبيناً',
    },
    quranRefs: ['18:50', '38:76', '7:11-18', '2:34'],
    scholarlySources: [
      {
        author: { en: 'Al-Hasan al-Basri', fr: 'Al-Hasan al-Basri', ar: 'الحسن البصري رحمه الله' },
        work: { en: 'Tafsir Ibn Kathir (Surah Al-Kahf 18:50)', fr: 'Tafsir Ibn Kathir', ar: 'تفسير ابن كثير' },
        citation: {
          en: '“Iblis was not an angel for even a single blink of an eye; he is the origin and progenitor of the Jinn, just as Adam is the progenitor of humankind.”',
          fr: '« Iblîs ne fut pas un ange, ne fût-ce qu’un clin d’œil ; il est la souche des djinns, tout comme Adam est la souche de l’humanité. »',
          ar: '«ما كان إبليس من الملائكة طرفة عين قط، وإنه لأصل الجن كما أن آدم أصل الإنس.»',
        },
      },
      {
        author: { en: 'Ibn Kathir', fr: 'Ibn Kathir', ar: 'الحافظ ابن كثير' },
        work: { en: 'Al-Bidayah wa-n-Nihayah', fr: 'Al-Bidayah wa-n-Nihayah', ar: 'البداية والنهاية' },
        citation: {
          en: '“When Allah commanded the angels and all in their assembly to prostrate to Adam, Iblis said: ‘I am better than him: You created me from fire and created him from clay.’ So his hidden envy and pride were laid bare.”',
          fr: '« Quand Allah ordonna la prosternation devant Adam, Iblîs dit : “Je suis meilleur que lui : Tu m’as créé de feu et Tu l’as créé d’argile.” Son envie et son arrogance secrètes furent ainsi dévoilées. »',
          ar: '«لما أمر الله بالسجود لآدم امتنع إبليس حسداً واستكباراً وقال: أنا خير منه خلقتني من نار وخلقته من طين، فكفر واستحق اللعنة والطرد من رحمة الله.»',
        },
      },
    ],
    summary: {
      en: 'Iblis was an exalted worshipper from the Jinn who dwelled among the angels. When Allah created Adam from clay and commanded prostration in honor, Iblis refused, claiming superiority of fire over clay, and was cast out as Satan (humankind’s open adversary).',
      fr: 'Iblîs était un adorateur issu des djinns, admis parmi les anges. Lorsque Dieu créa Adam d’argile et ordonna la prosternation d’honneur, Iblîs refusa, prétendant la supériorité du feu sur la terre, et fut déchu pour devenir Satan, l’ennemi déclaré de l’humanité.',
      ar: 'كان إبليس من الجن يعبد الله حتى رُفع في الملأ الأعلى، فلما خلق الله آدم من طين ونفخ فيه من روحه وأمر بالسجود له، أبى إبليس واستكبر قائلاً: ﴿أَنَا خَيْرٌ مِّنْهُ خَلَقْتَنِي مِن نَّارٍ وَخَلَقْتَهُ مِن طِينٍ﴾، فحلّت عليه اللعنة وصار إمام الغواية والوسوسة.',
    },
    detailedDescription: {
      en: 'The Qur’an states definitively: "He was of the Jinn and he rebelled against the command of his Lord" (Surah Al-Kahf 18:50). When the angels bowed in obedience to the Divine command, Iblis committed the first sin of cosmic pride (Kibr) and false analogy, judging that fire is superior to clay. Exiled from the heavenly assembly, he asked for respite until the Day of Resurrection, swearing to ambush the descendants of Adam through deception and whispered doubt.',
      fr: 'Le Coran énonce clairement : « Il était du nombre des djinns puis il transgressa le commandement de son Seigneur » (Al-Kahf 18:50). Alors que les anges s’inclinèrent en obéissance, Iblîs commit le premier péché d’orgueil cosmique, arguant que le feu surpasse la glaise. Chassé du sanctuaire céleste, il obtint un répit jusqu’au Jour Dernier et jura de tendre des embuscades aux enfants d’Adam par la ruse et le doute.',
      ar: 'أوضح القرآن الكريم في سورة الكهف: ﴿كَانَ مِنَ الْجِنِّ فَفَسَقَ عَنْ أَمْرِ رَبِّهِ﴾. فارتكب أول ذنب في الملأ الأعلى وهو الكبر والقياس الفاسد بأن النار أشرف من الطين، متجاهلاً فضل الروح الإلهية والعلم والبيان الذي حظي به آدم. وعندما طُرد طلب الإنظار إلى يوم يبعثون، فأُمهل ليفتتن به من يشاء، وأكد الله تعالى أنه ليس له سلطان على عباده المخلصين.',
    },
    theologicalContext: {
      en: 'Iblis is not an independent dualistic "evil god", but a created mortal creature subject to Allah’s decree, whose whispers can be warded off through faith and refuge in Allah (Isti‘adhah).',
      fr: 'Iblîs n’est point une divinité rivale du mal, mais une créature soumise au décret d’Allah, dont les murmures se dissipent par la foi sincère et le refuge auprès de Dieu.',
      ar: 'ليس الشيطان ندّاً لله ولا إلهاً للشر، بل هو مخلوق مقهور بمشيئة الله وقدره، وكيده ضعيف أمام عباد الله المخلصين المستعيذين بربهم.',
    },
  },
  {
    id: 'hinn_binn',
    name: {
      en: 'Al-Hinn & Al-Binn (Primordial Races)',
      fr: 'Al-Hinn & Al-Binn (Races primitives)',
      ar: 'الحِنّ والبِنّ (الأمم الأرضية الأولى)',
    },
    subTitle: {
      en: 'Pre-Adamic earthly creatures recorded in classical Islamic chronicles',
      fr: 'Créatures terrestres pré-adamiques mentionnées dans les chroniques classiques',
      ar: 'أمم سكنت الأرض قبل خلق آدم وقبل استخلاف الجن وسفكت الدماء',
    },
    nature: {
      en: 'Primordial physical terrestrial beings of flesh and blood, formed from earth and water',
      fr: 'Êtres physiques terrestres primitifs de chair et de sang, formés de terre et d’eau',
      ar: 'خلق أرضي مادي من طين وماء، ذوو دماء وأجساد حسية',
    },
    era: {
      en: 'Primordial Earth',
      fr: 'Terre primordiale',
      ar: 'العصور السحيقة للأرض',
    },
    quranRefs: ['2:30'],
    scholarlySources: [
      {
        author: { en: 'Ibn Kathir', fr: 'Ibn Kathir', ar: 'الحافظ ابن كثير' },
        work: { en: 'Al-Bidayah wa-n-Nihayah (Vol 1)', fr: 'Al-Bidayah wa-n-Nihayah', ar: 'البداية والنهاية' },
        citation: {
          en: '“It was narrated from Ibn Abbas: Before the Jinn, there was a creation called Al-Hinn and Al-Binn. When they spread corruption and wickedness upon the earth, the Jinn were empowered over them and banished them.”',
          fr: '« Il est rapporté d’Ibn Abbas : Avant les djinns, il existait une création appelée Al-Hinn et Al-Binn. Lorsqu’ils corrompirent la terre, les djinns prirent le dessus sur eux et les anéantirent. »',
          ar: '«روي عن ابن عباس وغيره: كان قبل الجن خلق يقال لهم الحن والبن، فلما أفسدوا في الأرض سلط الله عليهم الجن فقتلوهم ونفوهم عنها وأسكنوا فيها عوضهم.»',
        },
      },
      {
        author: { en: 'Imam Al-Qurtubi', fr: 'L’Imam Al-Qurtubi', ar: 'الإمام القرطبي' },
        work: { en: 'Al-Jami‘ li-Ahkam al-Qur’an (Tafsir al-Baqarah 2:30)', fr: 'Tafsir al-Qurtubi', ar: 'الجامع لأحكام القرآن' },
        citation: {
          en: '“Scholars cited the Hinn and Binn among the earth’s ancient populations whose bloodshed demonstrated to the angels what earthly physical creatures might do upon the land.”',
          fr: '« Les savants mentionnent les Hinn et Binn parmi les anciennes populations terrestres dont le sang versé fit comprendre aux anges les conséquences des créatures matérielles sur terre. »',
          ar: '«ذكر المفسرون أن الحن والبن كانوا من ساكني الأرض الأولين، وسفكوا فيها الدماء، فاستفادت الملائكة من ذلك علمًا بأن الخلق الأرضي يقع منه الفساد وسفك الدماء.»',
        },
      },
    ],
    summary: {
      en: 'Classical scholars, including Ibn Kathir and Al-Tabari, record that before Adam (and alongside or preceding the Jinn), ancient terrestrial creations named Al-Hinn and Al-Binn inhabited the Earth.',
      fr: 'Les érudits classiques, dont Ibn Kathir et Al-Tabari, rapportent qu’avant Adam (et précédant ou côtoyant les djinns), des créations terrestres primitives nommées Al-Hinn et Al-Binn peuplèrent la Terre.',
      ar: 'أمم وكائنات أرضية وثّقها أئمة التفسير والتاريخ كابن كثير والقرطبي، سكنت البسيطة قبل بني آدم وسفكت الدماء، وهي التي عناها الصحابة والتابعون عند بيان أثر ما شاهده الملائكة.',
    },
    detailedDescription: {
      en: 'In classical Arabic chronicles and exegetical literature, historians record that Earth was inhabited by successive biological creations before human stewardship. Al-Hinn and Al-Binn (and in some narrations Al-Khinn and Al-Dinn) lived upon the land and engaged in warfare. Their extinction or displacement preceded the crowning creation of Prophet Adam (pbuh) as the first morally accountable human Khalifah.',
      fr: 'Dans les chroniques arabes classiques et les textes d’exégèse, les historiens rapportent que la Terre connut des créations biologiques successives avant la royauté humaine. Les Hinn et Binn vécurent sur la terre et s’entretuèrent. Leur disparition précéda la création sanctifiée d’Adam (psl) en tant que premier Khalife doué d’esprit divin et de raison.',
      ar: 'تذكر كتب التواريخ والتفاسير المعتمدة أن الأرض مرت بمراحل خلق متعاقبة قبل استخلاف الإنسان. وجاءت تسمية الحن والبن في مرويات الصحابة والتابعين للدلالة على أجناس أرضية عمرت الأرض ثم بادت بسبب الفساد والحروب قبل اصطفاء أبينا آدم عليه السلام خليفة في الأرض.',
    },
    theologicalContext: {
      en: 'These traditions are categorized in Islamic scholarship as ancient historical narrations (Athār) that shed light on why the angels inquired about bloodshed before Adam’s creation.',
      fr: 'Ces récits sont classés dans l’érudition islamique comme des narrations historiques (Athār) éclairant la question des anges sur le sang versé avant la création d’Adam.',
      ar: 'تُعد هذه الأخبار من الآثار التاريخية التي أوردها المفسرون لتفسير سر قول الملائكة: ﴿أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ﴾.',
    },
  },
  {
    id: 'nasnas',
    name: {
      en: 'Al-Nasnas (Pre-Human Hominids)',
      fr: 'Al-Nasnās (Hominidés pré-humains)',
      ar: 'النَّسْنَاس (الكائنات الشبيهة بالبشر قبل آدم)',
    },
    subTitle: {
      en: 'Upright, bipedal humanoid beings recorded by classical lexicographers and historians',
      fr: 'Créatures humanoïdes bipèdes mentionnées par les lexicographes et historiens classiques',
      ar: 'خلق مستقيم القامة شبيه بالبشر، عاش قبل آدم دون تكليف روحي',
    },
    nature: {
      en: 'Bipedal biological creatures resembling humans physically, but lacking the divine ruh (spirit) and moral accountability (taklif)',
      fr: 'Créatures bipèdes ressemblant physiquement aux hommes, mais dépourvues de l’esprit divin (ruh) et de la responsabilité morale (taklif)',
      ar: 'كائنات حية تمشي على قدمين وتشبه البشر في الخلقة الظاهرة، دون نفخة الروح الإلهية أو التكليف والشرائع',
    },
    era: {
      en: 'Prehistoric Earth',
      fr: 'Terre préhistorique',
      ar: 'عصور ما قبل التاريخ',
    },
    quranRefs: ['2:30', '15:28-29'],
    scholarlySources: [
      {
        author: { en: 'Ibn Manzur', fr: 'Ibn Manzour', ar: 'ابن منظور' },
        work: { en: 'Lisan al-Arab (Lexicon)', fr: 'Lisan al-Arab', ar: 'لسان العرب' },
        citation: {
          en: '“Al-Nasnas: A creation that was upon the earth resembling humans, yet they were not from the descendants of Adam.”',
          fr: '« Le Nasnās : une création qui se trouvait sur terre ressemblant à l’humain, bien qu’ils ne fussent point de la descendance d’Adam. »',
          ar: '«النسناس: خلق في الأرض على صورة الإنسان، وليسوا من بني آدم ولا من ذريته.»',
        },
      },
      {
        author: { en: 'Al-Mas‘udi', fr: 'Al-Mas‘oudi', ar: 'المسعودي' },
        work: { en: 'Muruj adh-Dhahab (Meadows of Gold)', fr: 'Mouroudj adh-Dhahab', ar: 'مروج الذهب ومعادن الجوهر' },
        citation: {
          en: '“Al-Mas‘udi recorded that God created diverse nations of physical creatures upon the Earth prior to Adam, endowed with upright posture and locomotion before the era of humankind began.”',
          fr: '« Al-Mas‘oudi rapporte que Dieu créa diverses nations de créatures physiques sur Terre avant Adam, dotées de stature droite et de locomotion avant l’ère humaine. »',
          ar: '«ذكر المسعودي أن الله تعالى خلق في الأرض أصنافًا من الخلق المنتصب القامة قبل خلق آدم عليه السلام، تداولوا عمارة الأرض في الدهور الخالية.»',
        },
      },
    ],
    summary: {
      en: 'Classical Arabic lexicons and historical texts document "Al-Nasnas" — bipedal, upright humanoid creatures who lived on Earth before Adam. Modern Islamic scholars correlate these accounts with prehistoric hominid fossil records.',
      fr: 'Les lexiques et textes historiques arabes attestent du « Nasnās » — créatures humanoïdes et bipèdes ayant vécu sur Terre avant Adam. Les savants musulmans contemporains rapprochent ces textes des découvertes fossiles d’hominidés préhistoriques.',
      ar: 'كائنات منتصبة القامة وثقتها المعاجم وكتب التاريخ القديمة، عاشت على الأرض قبل اصطفاء آدم عليه السلام. ويوضح العلماء المعاصرون توافق هذا المفهوم مع أحافير أشباه البشر التي سبقت الإنسان العاقل.',
    },
    detailedDescription: {
      en: 'In classical linguistics and scholarship (Lisan al-Arab, Al-Bahr al-Muhit, Al-Mas‘udi), "Al-Nasnas" describes physical organisms that bore physical resemblance to humans but preceded the breath of the divine Spirit (Ruh) bestowed exclusively upon Prophet Adam (pbuh). When modern paleontology uncovered ancient bipedal hominids (e.g. Neanderthals, Homo erectus), prominent Islamic theologians (such as Sheikh Muhammad Abduh and contemporary scholars) highlighted that Islam never denies the biological existence of pre-Adamic humanoid life; rather, Islam affirms that Adam (pbuh) is the first true Human (Bashar) endowed with spiritual consciousness, moral responsibility, language, and prophethood.',
      fr: 'Dans la linguistique et l’érudition classique, « Al-Nasnās » désigne des organismes qui possédaient une ressemblance anatomique avec l’homme, mais vécurent avant que le Souffle divin (Ruh) ne fût insufflé en Adam (psl). Lorsque la paléontologie moderne découvrit les fossiles d’hominidés bipèdes (Néandertal, Homo erectus), de grands théologiens musulmans soulignèrent que la tradition islamique n’exclut nullement l’existence biologique de créatures humanoïdes pré-adamiques, tout en confirmant qu’Adam (psl) est le premier véritable Humain doué de conscience spirituelle, de raison morale, de langage et de prophétie.',
      ar: 'بينت المعاجم كـ«لسان العرب» أن "النسناس" خلق كان على هيئة الإنسان قبل استخلاف آدم عليه السلام دون أن يحملوا نفخة الروح المكلفة أو العقل التشريعي. ومع الاكتشافات الحفرية الحديثة لبقايا أشباه البشر (كالنياندرتال وهومو إريكتوس)، أكد علماء الفكر الإسلامي أن نصوص الشريعة لا تصادم وجود كائنات حية بيولوجية شبيهة بالإنسان قبل آدم، وأن آدم عليه السلام هو أول إنسان حقيقي كُرِّم بنفخة الروح، والعقل، والبيان، وأسجدت له الملائكة وعُلّم الأسماء كلها.',
    },
    theologicalContext: {
      en: 'Adam (peace be upon him) is the unique Father of Humankind (Abu al-Bashar) directly molded by Allah and given the divine spirit. Any pre-Adamic organisms were biologically distinct, non-Adamic fauna without religious accountability.',
      fr: 'Adam (paix sur lui) est l’unique Père de l’Humanité (Abou al-Bashar), façonné par Allah et recevant le souffle divin. Les créatures pré-adamiques étaient une faune distincte, sans responsabilité morale.',
      ar: 'آدم عليه السلام خُلق خلقًا مستقلاً وشرفه الله بنفخة روحه، وهو أبو البشر أجمعين. وأي كائنات سبقت وجوده كانت مجرد خلق أرضي غير مكلّف ولا يتصل به نسب البشر.',
    },
    scientificCorrelation: {
      en: 'Correlates with paleolithic hominid fossils (Neanderthals, Homo erectus) that roamed the Earth prior to modern Homo sapiens endowed with spiritual consciousness.',
      fr: 'Fait écho aux découvertes d’hominidés paléolithiques (Néandertaliens, Homo erectus) ayant parcouru la Terre avant l’avènement de l’Homme doté de conscience morale.',
      ar: 'يتطابق مع ما تكشفه الحفريات الإحاثية لأجناس أشباه البشر المنقرضة التي عاشت على الأرض قبل فجر الإنسانية الواعية.',
    },
  },
  {
    id: 'angels_dialogue',
    name: {
      en: 'The Celestial Dialogue: Why the Angels Inquired (2:30)',
      fr: 'Le Dialogue Céleste : L’interrogation des Anges (2:30)',
      ar: 'الحوار القدسي وسر سؤال الملائكة: ﴿أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا﴾',
    },
    subTitle: {
      en: 'The divine wisdom behind appointing humanity as stewards of Earth',
      fr: 'La sagesse divine derrière l’établissement de l’humanité comme intendante de la Terre',
      ar: 'الحكمة الإلهية في استخلاف الإنسان وأسرار سؤال الملائكة',
    },
    nature: {
      en: 'Sacred Qur’anic proclamation and dialogue between the Lord of the Worlds and the Angels',
      fr: 'Proclamation coranique sacrée et dialogue entre le Seigneur des Mondes et les Anges',
      ar: 'حوار قرآني قدسي بين رب العزة جل وعلا وملائكته المقربين',
    },
    era: {
      en: 'Dawn of Humankind',
      fr: 'Aube de l’humanité',
      ar: 'فجر استخلاف الإنسان',
    },
    quranRefs: ['2:30', '2:31-33'],
    scholarlySources: [
      {
        author: { en: 'Tafsir Ibn Kathir', fr: 'Tafsir Ibn Kathir', ar: 'تفسير ابن كثير' },
        work: { en: 'Surah Al-Baqarah, Ayah 30', fr: 'Sourate Al-Baqarah, verset 30', ar: 'تفسير سورة البقرة، الآية 30' },
        citation: {
          en: '“The angels did not ask out of objection or envy, but rather to seek understanding of the divine wisdom, having witnessed the corruption of the previous inhabitants of Earth.”',
          fr: '« Les anges n’ont point posé cette question par contestation ou jalousie, mais pour comprendre la sagesse divine, ayant constaté la corruption des habitants précédents de la Terre. »',
          ar: '«سؤال الملائكة هذا ليس على وجه الاعتراض على الله، ولا على وجه الحسد لبني آدم، وإنما هو سؤال استعلام واستكشاف عن الحكمة في ذلك، لما شاهدوه من إفساد الأمم التي سبقت في الأرض.»',
        },
      },
    ],
    summary: {
      en: 'When Allah declared "Indeed, I will place upon the earth a successive authority (Khalifah)", the angels asked: "Will You place upon it one who causes corruption therein and sheds blood?" The classical answer lies in what transpired on Earth before Adam.',
      fr: 'Quand Allah déclara : « Je vais établir sur la terre un vicaire (Khalife) », les anges demandèrent : « Vas-Tu y établir quelqu’un qui y sèmera la corruption et y répandra le sang ? » La réponse classique réside dans l’histoire de la Terre avant Adam.',
      ar: 'قول الملائكة لرب العزة: ﴿أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ﴾ يُبين علمهم السابق بما جرى في الأرض من حروب وفساد الأمم السابقة كالجن والحن والبن.',
    },
    detailedDescription: {
      en: 'In Surah Al-Baqarah (2:30), Allah announced the impending creation of the human Khalifah. The angels inquired: "Will You place therein one who causes corruption therein and sheds blood, while we praise and sanctify You?" Allah answered: "Indeed, I know that which you do not know." He then demonstrated Adam’s preeminence by teaching him the names of all things, commanding the angels to prostrate before him.',
      fr: 'Dans la sourate Al-Baqarah (2:30), Allah annonça la création du Khalife humain. Les anges demandèrent : « Vas-Tu y établir quelqu’un qui y sèmera la corruption et y répandra le sang, alors que nous célébrons Tes louanges et Te sanctifions ? » Allah répondit : « En vérité, Je sais ce que vous ne savez pas. » Puis Il manifesta la supériorité d’Adam en lui enseignant les noms de toutes choses et en ordonnant aux anges de se prosterner devant lui.',
      ar: 'عندما أعلم الله الملائكة بأنه جاعل في الأرض خليفة، استعلمت الملائكة عن حكمة استخلاف جنس قد يقع منه ما وقع ممن سبقهم. فأجابهم العليم الحكيم: ﴿إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ﴾، ثم أظهر فضل آدم عليهم بتعليمه الأسماء كلها وأمرهم بالسجود له سجود تحية وتكريم.',
    },
    theologicalContext: {
      en: 'Highlights the supreme honor bestowed upon humankind: humanity is tasked with moral stewardship, intellect, and spiritual ascension, surmounting the primal instincts that doomed earlier earthly creatures.',
      fr: 'Souligne la dignité suprême accordée à l’être humain : investi d’une mission morale, d’intellect et d’élévation spirituelle, surpassant les instincts primaires des créatures terrestres précédentes.',
      ar: 'يُبرز كرامة الإنسان ومسؤولية الاستخلاف في الأرض بعمارة الكون بالحق والعدل وعبادة الله وحده.',
    },
  },
]
