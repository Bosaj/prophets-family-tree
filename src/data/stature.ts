import type { L3, Level, Ref } from './types'

const t = (en: string, fr: string, ar: string): L3 => ({ en, fr, ar })

export interface StatureComparison {
  id: string
  name: L3
  era: L3
  heightMeters: number
  heightCubits?: number
  scaleRatio: number // Ratio compared to modern human (1.75m)
  /** Source level of the text behind this entry. Undefined for animals and other measured references. */
  level?: Level
  /** True when the number itself comes from a text or a measurement; false when the bar is only illustrative. */
  heightStated: boolean
  description: L3
  textRef?: Ref
  hadithText?: L3
}

export interface PhysicalDescription {
  id: string
  prophetId: string
  name: L3
  honorific: L3
  statureCategory: L3
  heightEstimate: L3
  complexion: L3
  hairAndBeard: L3
  physiqueAndBuild: L3
  facialFeatures: L3
  demeanorAndPresence: L3
  comparisonWithModern: L3
  authenticNarrations: {
    source: string
    hadithNumber?: string
    text: L3
  }[]
}

/**
 * Historical scale benchmarks across human history according to authentic Hadith and Quranic texts.
 */
export const STATURE_SCALE_DATA: StatureComparison[] = [
  {
    id: 'adam_primordial',
    name: t('Adam (Primordial Creation)', 'Adam (Création primordiale)', 'آدم عليه السلام (بدء الخلق)'),
    era: t('The Beginning of Mankind', 'Aux origines de l’humanité', 'بداية البشرية والجنة'),
    heightMeters: 30.0,
    heightCubits: 60,
    scaleRatio: 17.14,
    level: 'hadith',
    heightStated: true,
    description: t(
      'Created directly by Allah’s Hand, sixty cubits (~30 meters / 98.4 ft) in height (Sahih al-Bukhari 3326). The hadith establishes that humanity has been steadily decreasing in stature since Adam until the modern era.',
      'Créé directement par la Main d’Allah, mesurant soixante coudées (~30 mètres) de haut (Sahih al-Bukhari 3326). Le hadith atteste que la taille humaine n’a cessé de décroître depuis.',
      'خلقه الله بيده على طول ستين ذراعاً (نحو 30 متراً) (صحيح البخاري 3326). وثبت في الصحيحين أن الخلق لم يزل ينقص منذ عهد آدم حتى استقر على ما هو عليه اليوم.'
    ),
    textRef: 'bukhari:3326',
    hadithText: t(
      'The Prophet ﷺ said: "Allah created Adam, and his height was sixty cubits... whoever enters Paradise will be in the form of Adam. People have been decreasing in stature since then until now." (Sahih al-Bukhari 3326, Sahih Muslim 2841)',
      'Le Prophète ﷺ a dit : « Allah a créé Adam à Sa forme, d’une taille de soixante coudées... Quiconque entrera au Paradis sera à la stature d’Adam. Depuis lors, la taille des êtres humains n’a cessé de diminuer jusqu’à aujourd’hui. » (Bukhari 3326, Muslim 2841)',
      'قال رسول الله ﷺ: «خَلَقَ اللَّهُ آدَمَ عَلَى صُورَتِهِ، طُولُهُ سِتُّونَ ذِرَاعًا... فَكُلُّ مَنْ يَدْخُلُ الْجَنَّةَ عَلَى صُورَةِ آدَمَ، فَلَمْ يَزَلِ الْخَلْقُ يَنْقُصُ بَعْدُ حَتَّى الآنَ» (صحيح البخاري 3326، صحيح مسلم 2841)'
    ),
  },
  {
    id: 'people_of_ad',
    name: t('The People of ‘Ad (Giants of Antiquity)', 'Le Peuple de ‘Ad (Géants de l’Antiquité)', 'قوم عاد (العمالقة الأوائل)'),
    era: t('After the people of Nuh (Qur’an 7:69) — date unknown', 'Après le peuple de Nuh (Coran 7:69) — date inconnue', 'بعد قوم نوح (الأعراف 69) — والتاريخ غير معروف'),
    heightMeters: 7.5,
    heightCubits: 15,
    scaleRatio: 4.28,
    level: 'tradition',
    heightStated: false,
    description: t(
      'The Qur’an says Allah increased them in stature and strength (7:69) and that their like was never created in the land (89:8), but it gives no height. Figures quoted in later books come from Isra’iliyyat reports, so this bar is only an illustration of “much taller than us”.',
      'Le Coran dit qu’Allah les a dotés d’une stature et d’une force accrues (7:69) et que nul peuple pareil ne fut créé dans le pays (89:8), sans donner de taille. Les chiffres cités dans des livres plus tardifs viennent des Isra’iliyyat : cette barre n’illustre que « bien plus grands que nous ».',
      'ذكر القرآن أن الله زادهم بسطة في الخلق والقوة (الأعراف 69) وأنه لم يُخلق مثلها في البلاد (الفجر 8)، ولم يذكر طولًا. والأرقام المنقولة في الكتب المتأخرة من الإسرائيليات، فهذا الشريط توضيح فقط لمعنى «أطول منا بكثير». وقال تعالى: ﴿وَاذْكُرُوا إِذْ جَعَلَكُمْ خُلَفَاءَ مِن بَعْدِ قَوْمِ نُوحٍ وَزَادَكُمْ فِي الْخَلْقِ بَسْطَةً﴾.'
    ),
    textRef: '7:69',
    hadithText: t(
      'Quranic verse: "And remember when He made you successors after the people of Noah and increased you extensively in stature." (Surah Al-A‘raf 7:69)',
      'Verset coranique : « Et rappelez-vous quand Il a fait de vous les successeurs du peuple de Noé et vous a accordé une stature physique impressionnante. » (Sourate Al-A‘raf 7:69)',
      'قوله تعالى: ﴿وَاذْكُرُوا إِذْ جَعَلَكُمْ خُلَفَاءَ مِن بَعْدِ قَوْمِ نُوحٍ وَزَادَكُمْ فِي الْخَلْقِ بَسْطَةً فَاذْكُرُوا آلَاءَ اللَّهِ لَعَلَّكُمْ تُفْلِحُونَ﴾ (الأعراف: 69)'
    ),
  },
  {
    id: 'thamud_ancient',
    name: t('The People of Thamud', 'Le Peuple de Thamoud', 'قوم ثمود (أصحاب الحِجر)'),
    era: t('After ‘Ad (Qur’an 7:74) — date unknown', 'Après ‘Ad (Coran 7:74) — date inconnue', 'بعد عاد (الأعراف 74) — والتاريخ غير معروف'),
    heightMeters: 4.0,
    heightCubits: 8,
    scaleRatio: 2.28,
    level: 'tradition',
    heightStated: false,
    description: t(
      'They carved houses out of the mountains (15:82; 26:149). No text gives their height; the bar only places them between ‘Ad and later peoples, following the hadith that people have kept decreasing in stature since Adam (Sahih al-Bukhari 3326).',
      'Ils taillaient des demeures dans les montagnes (15:82 ; 26:149). Aucun texte ne donne leur taille ; la barre les place seulement entre ‘Ad et les peuples ultérieurs, selon le hadith disant que la stature des hommes n’a cessé de diminuer depuis Adam (Sahih al-Bukhari 3326).',
      'كانوا ينحتون من الجبال بيوتًا (الحجر 82؛ الشعراء 149)، ولم يذكر نصٌّ طولهم؛ والشريط يضعهم بين عاد ومن بعدهم فقط، أخذًا بحديث: «فلم يزل الخلق ينقص حتى الآن» (صحيح البخاري 3326).'
    ),
    textRef: '15:82',
    hadithText: t(
      'Qur’an: "And they used to carve from the mountains houses, feeling secure." (Surah Al-Hijr 15:82)',
      'Coran : « Et ils taillaient des demeures dans les montagnes en toute sécurité. » (Sourate Al-Hijr 15:82)',
      'قوله تعالى: ﴿وَكَانُوا يَنحِتُونَ مِنَ الْجِبَالِ بُيُوتًا آمِنِينَ﴾ (الحجر: 82)'
    ),
  },
  {
    id: 'musa_era',
    name: t('Musa & The Israelite Kings', 'Moïse et les Rois d’Israël', 'موسى وداود والملوك (العهد الموسوي)'),
    era: t('Musa and the kings of Israel — date unknown (historians estimate c. 13th–10th c. BCE)', 'Moïse et les rois d’Israël — date inconnue (les historiens estiment XIIIe–Xe s. av. J.-C.)', 'موسى وملوك بني إسرائيل — والتاريخ غير معروف (يقدّره المؤرخون بين القرن 13 و10 ق.م)'),
    heightMeters: 2.1,
    heightCubits: 4.2,
    scaleRatio: 1.2,
    level: 'hadith',
    heightStated: false,
    description: t(
      'The authentic hadith describes Musa as brown and tall, like the men of Shanu’ah (Sahih al-Bukhari 3396), and the Qur’an says Talut was given abundance in knowledge and in body (2:247). No height in metres is given; the bar only shows “tall”.',
      'Le hadith authentique décrit Moïse comme brun et grand, tel les hommes de Shanou’a (Sahih al-Bukhari 3396), et le Coran dit que Talut reçut une ampleur de savoir et de corps (2:247). Aucune taille en mètres n’est donnée ; la barre illustre seulement « grand ».',
      'وُصف موسى عليه السلام في الحديث الصحيح بأنه آدم طُوال كأنه من رجال شنوءة (صحيح البخاري 3396)، وقال تعالى في طالوت: ﴿وَزَادَهُ بَسْطَةً فِي الْعِلْمِ وَالْجِسْمِ﴾ (البقرة 247)، ولا يُعرف طوله بالأمتار، فالشريط توضيح لمعنى «طويل» فقط.'
    ),
    textRef: 'bukhari:3396',
    hadithText: t(
      'The Prophet ﷺ said: "Moses was brown, a tall man as if from the people of Shanu’a." (Sahih al-Bukhari 3396)',
      'Le Prophète ﷺ a dit : « Moïse était brun, un homme grand comme s’il était des gens de Shanou’a. » (Sahih al-Bukhari 3396)',
      'قال النبي ﷺ: «مُوسَى آدَمُ طُوَالٌ كَأَنَّهُ مِنْ رِجَالِ شَنُوءَةَ» (صحيح البخاري 3396)'
    ),
  },
  {
    id: 'modern_human',
    name: t('Modern Humankind', 'L’Être humain contemporain', 'الإنسان المعاصر'),
    era: t('The Final Prophetic Era to Present', 'Ère prophétique finale à nos jours', 'عصر النبوة الخاتمة والعصر الحاضر'),
    heightMeters: 1.75,
    heightCubits: 3.5,
    scaleRatio: 1.0,
    level: 'hadith',
    heightStated: true,
    description: t(
      'The stabilized average human stature today, corresponding to the moderate, balanced height exemplified by the Prophet Muhammad ﷺ (neither excessively tall nor short).',
      'La stature humaine moyenne contemporaine stabilisée, incarnée par la taille modérée et harmonieuse du Prophète Muhammad ﷺ.',
      'المتوسط البشري المستقر للإنسان اليوم (نحو 175 سم)، وهو المقياس المتوازن الذي بُعث عليه النبي المصطفى ﷺ وسطاً لا بالطويل البائن ولا بالقصير.'
    ),
    textRef: 'bukhari:3551',
    hadithText: t(
      'Al-Bara’ ibn ‘Azib narrated: "The Prophet ﷺ was of moderate height, broad-shouldered, with hair reaching his ear-lobes. I saw him in a red cloak and never saw anyone more handsome." (Sahih al-Bukhari 3551)',
      'Al-Bara’ ibn ‘Azib a rapporté : « Le Prophète ﷺ était de taille moyenne, large d’épaules, avec des cheveux descendant jusqu’aux lobes des oreilles. Je n’ai jamais rien vu de plus beau que lui. » (Sahih al-Bukhari 3551)',
      'عن البراء بن عازب رضي الله عنه قال: «كَانَ النَّبِيُّ ﷺ مَرْبُوعًا، بَعِيدَ مَا بَيْنَ المَنْكِبَيْنِ، لَهُ شَعَرٌ يَبْلُغُ شَحْمَةَ أُذُنِهِ، مَا رَأَيْتُ شَيْئًا قَطُّ أَحْسَنَ مِنْهُ» (صحيح البخاري 3551)'
    ),
  },
  {
    id: 'jannah_restoration',
    name: t('Believers in Paradise (The Glorious Restoration)', 'Les Croyants au Paradis (Restauration)', 'أهل الجنة (العودة إلى كمال الخلقة)'),
    era: t('The Eternal Hereafter', 'L’Éternité dans l’Au-delà', 'الخلود الأبدي في جنات النعيم'),
    heightMeters: 30.0,
    heightCubits: 60,
    scaleRatio: 17.14,
    level: 'hadith',
    heightStated: true,
    description: t(
      'In Paradise, all human believers will be bodily resurrected and elevated to the original stature of Adam: sixty cubits tall, thirty-three years old, without hairiness, imperfection, or aging, glowing with celestial beauty.',
      'Au Paradis, tous les croyants ressusciteront à la stature originelle d’Adam : soixante coudées de hauteur, l’âge de trente-trois ans, d’une splendeur éclatante, sans vieillissement ni décrépitude.',
      'يُبعث أهل الجنة على صورة أبيهم آدم في الطول والجمال: طولهم ستون ذراعاً، في سن ثلاثة وثلاثين سنة، جُرداً مُرداً كحل العينين، في كمال الحسن والشباب الدائم.'
    ),
    textRef: 'tirmidhi:2545',
    hadithText: t(
      'The Prophet ﷺ said: "The people of Paradise shall enter Paradise without body hair, beardless, with kohl on their eyes, aged thirty or thirty-three years." (Sunan at-Tirmidhi 2545). That they will be in the form of Adam, sixty cubits tall, is in Sahih al-Bukhari 3327.',
      'Le Prophète ﷺ a dit : « Les gens du Paradis y entreront imberbes, sans poils superflus, les yeux rehaussés de khôl, âgés de trente ou trente-trois ans. » (Tirmidhi 2545 ; les soixante coudées : Sahih al-Bukhari 3327)',
      'قال رسول الله ﷺ: «يَدْخُلُ أَهْلُ الجَنَّةِ الجَنَّةَ جُرْدًا مُرْدًا كُحْلًا أَبْنَاءَ ثَلاَثِينَ أَوْ ثَلاَثٍ وَثَلاَثِينَ سَنَةً» (سنن الترمذي 2545)، وكونهم على صورة آدم طوله ستون ذراعًا في صحيح البخاري 3327'
    ),
  },
  {
    id: 'sauropod_diplodocus',
    name: t('Diplodocus / Sauropod Titan', 'Diplodocus / Titanosaure', 'الديناصور العملاق (سوروبود / ديبلودوكس)'),
    era: t('Prehistoric Epoch (Fossil Record)', 'Ère préhistorique (Mésozoïque)', 'عصور ما قبل التاريخ (الحفريات الجيولوجية)'),
    heightMeters: 12.0,
    heightCubits: 24,
    scaleRatio: 6.86,
    heightStated: true,
    description: t(
      'One of the longest land animals ever discovered (reaching 24–27 meters in total length, with its head towering up to 12 meters). Placed next to Adam’s 30-meter stature, Adam stands more than double the vertical height of this massive sauropod.',
      'L’un des plus gigantesques dinosaures sauropodes découverts (24 à 27 m de longueur totale et une tête culminant à 12 m). Comparé à la stature de 30 mètres d’Adam, ce dernier le dépasse de plus du double en hauteur.',
      'أحد أضخم الحيوانات البرية المكتشفة في تاريخ الأرض (يصل طوله إلى 26 متراً وارتفاع رأسه لنحو 12 متراً). وبمقارنته مع قامة آدم (30 متراً) يظهر أن آدم أطول منه بمرتين ونصف، مما يوضح عظمة خلق الله للأولين.'
    ),
  },
  {
    id: 'tall_giraffe',
    name: t('Giraffe (Tallest Living Land Animal)', 'Girafe (Plus grand animal terrestre vivant)', 'الزرافة (أطول الكائنات البرية الحية)'),
    era: t('Extant Modern Fauna', 'Faune terrestre moderne', 'الحياة البرية المعاصرة'),
    heightMeters: 5.5,
    heightCubits: 11,
    scaleRatio: 3.14,
    heightStated: true,
    description: t(
      'The tallest living land animal, reaching up to 5.5 metres (18 ft). Placed next to Adam’s sixty cubits, it reaches less than a fifth of his height.',
      'Le plus grand animal terrestre vivant, jusqu’à 5,5 mètres. À côté des soixante coudées d’Adam, elle n’atteint pas le cinquième de sa taille.',
      'أطول كائن بري حي اليوم (نحو 5.5 متر)، ولا تبلغ خُمس طول آدم عليه السلام (ستين ذراعًا).'
    ),
  },
  {
    id: 'trex_apex',
    name: t('Tyrannosaurus Rex (T-Rex)', 'Tyrannosaure Rex (T-Rex)', 'ديناصور تي-ريكس (المفترس العملاق)'),
    era: t('Late Cretaceous (Fossil Record)', 'Crétacé supérieur (paléontologie)', 'العصر الطباشيري المتأخر (حفريات)'),
    heightMeters: 4.5,
    heightCubits: 9,
    scaleRatio: 2.57,
    heightStated: true,
    description: t(
      'The iconic predatory dinosaur, about 4–4.5 metres tall and 12 metres long (fossil record).',
      'Le célèbre dinosaure prédateur, environ 4 à 4,5 mètres de haut et 12 mètres de long (fossiles).',
      'أشهر الديناصورات المفترسة، يبلغ ارتفاعه نحو 4 إلى 4.5 أمتار وطوله 12 مترًا (من الحفريات).'
    ),
  },
  {
    id: 'african_elephant',
    name: t('African Bush Elephant', 'Éléphant de savane d’Afrique', 'الفيل الإفريقي (أضخم ثدييات اليابسة)'),
    era: t('Extant Modern Fauna', 'Faune terrestre moderne', 'الحياة البرية المعاصرة'),
    heightMeters: 3.5,
    heightCubits: 7,
    scaleRatio: 2.0,
    heightStated: true,
    description: t(
      'The largest living land mammal, reaching up to 3.5–4.0 meters at the shoulder. Modern humans reach less than half its shoulder height.',
      'Le plus grand mammifère terrestre vivant, atteignant 3,5 à 4 mètres au garrot. L’humain moderne atteint à peine le bas de son flanc.',
      'أضخم الثدييات البرية على قيد الحياة اليوم، يصل ارتفاع كتفه إلى 3.5 متر، ويعادل تقريباً ضعف طول الإنسان المعاصر.'
    ),
  },
]

/**
 * Authentic textual physical descriptions of the Prophets from Sahih al-Bukhari, Sahih Muslim,
 * and the Shama'il of Imam at-Tirmidhi.
 */
export const PROPHETIC_DESCRIPTIONS: PhysicalDescription[] = [
  {
    id: 'muhammad_desc',
    prophetId: 'muhammad',
    name: t('Muhammad ﷺ', 'Muhammad ﷺ', 'محمد ﷺ'),
    honorific: t('Seal of the Prophets & Master of Creation', 'Le Sceau des Prophètes et Maître de la Création', 'خاتم الأنبياء والمرسلين'),
    statureCategory: t('Balanced Medium Height (Rab‘ah)', 'Taille moyenne et harmonieuse (Rab‘ah)', 'مربوع القامة متناسب الأعضاء'),
    heightEstimate: t(
      'No measurement in metres exists; he was of medium height, neither very tall nor short (Sahih al-Bukhari 3547, 3549).',
      'Aucune mesure en mètres n’existe ; il était de taille moyenne, ni très grand ni petit (Sahih al-Bukhari 3547, 3549).',
      'لا يوجد قياس بالأمتار؛ كان ربعةً ليس بالطويل البائن ولا بالقصير (صحيح البخاري 3547، 3549).'
    ),
    complexion: t(
      'Luminous wheat-rose color, neither chalky pale nor tanned, radiating light like the full moon.',
      'Teint éclatant blanc rosé, ni trop pâle ni hâlé, rayonnant comme la pleine lune.',
      'أزهر اللون، مشرباً بحمرة ناصعة، يتلألأ وجهه تلألؤ القمر ليلة البدر.'
    ),
    hairAndBeard: t(
      'Wavy black hair, neither completely curly nor limp, resting between his earlobes and shoulders; thick, dense black beard.',
      'Cheveux noirs souples et ondulés descendant jusqu’aux lobes des oreilles ; barbe fournie et soignée.',
      'رَجِل الشعر جعداً وسطاً يصل إلى شحمة أذنيه وإلى منكبيه، كثّ اللحية وسيم الوجه.'
    ),
    physiqueAndBuild: t(
      'Broad between the shoulders, athletic chest and abdomen, powerful forearms, firm limbs, seal of prophecy between his shoulder blades.',
      'Large de carrure, poitrine et ventre alignés, articulations fortes, sceau prophétique entre les épaules.',
      'عريض المنكبين، جليل الكتد، ضخم الكراديس، متماسك البدن، بين كتفيه خاتم النبوة كهيئة بيضة الحمامة.'
    ),
    facialFeatures: t(
      'Broad forehead, arched eyebrows, deep dark eyes with long lashes and a hint of redness, straight noble nose with light upon it.',
      'Front large, sourcils arqués, yeux noirs profonds aux cils allongés, nez aquilin d’une noblesse éclatante.',
      'واسع الجبين، أزجّ الحواجب سوابغ، أدعج العينين أهدب الأشفار، في عينيه شكلة حمراء خفيفة، أقنى الأنف.'
    ),
    demeanorAndPresence: t(
      'Walked with purpose as if descending a slope, smiled gently with pearl-white teeth, inspiring supreme reverence at first glance and deep love upon acquaintance.',
      'Démarche vive et digne, sourire doux révélant des dents éclatantes, inspirant le respect immédiat et l’amour.',
      'إذا مشى تقلع كأنما ينحدر من صبب، جلّ ضحكه التبسم، من رآه بديهة هابه ومن خالطه معرفة أحبه.'
    ),
    comparisonWithModern: t(
      'Represents the pinnacle of natural human equilibrium: moderate stature, exceptional stamina, symmetrical build, and unparalleled luminous charisma.',
      'Incarne la perfection de l’équilibre humain : stature moyenne, endurance admirable et charisme pur.',
      'يمثل كمال التوازن البشري والاعتدال الطبيعي في الطول والبنية والقوة والجمال، لا إفراط فيه ولا تفريط.'
    ),
    authenticNarrations: [
      {
        source: 'Sahih al-Bukhari',
        hadithNumber: '3551',
        text: t(
          'Al-Bara’ reported: "The Messenger of Allah ﷺ was of medium height, with wide shoulders and thick hair reaching his earlobes. Wearing a red cloak, I never saw anything more handsome than him."',
          'Al-Bara’ a rapporté : « Le Messager d’Allah ﷺ était de taille moyenne, large d’épaules, avec des cheveux touchant ses lobes. Dans sa cape rouge, je n’ai jamais rien vu de plus beau que lui. »',
          'عن البراء بن عازب: «كان رسول الله ﷺ مربوعاً، بعيد ما بين المنكبين، له شعر يبلغ شحمة أذنه، رأيته في حلة حمراء لم أر شيئاً قط أحسن منه»'
        ),
      },
      {
        source: 'Jami‘ at-Tirmidhi',
        hadithNumber: '3637, 3638',
        text: t(
          'Ali ibn Abi Talib said: "He was neither excessively tall nor short, but of medium stature among his people. His hands and feet were thick and strong. When he walked, he leaned forward as if descending a hill."',
          'Ali a dit : « Il n’était ni trop grand ni court, mais d’une taille moyenne. Ses paumes et pieds étaient vigoureux. En marchant, il avançait d’un pas décidé. »',
          'عن علي رضي الله عنه: «لم يكن رسول الله ﷺ بالطويل الممغط، ولا بالقصير المتردد، وكان ربعة من القوم... ضخم الكراديس، إذا مشى تقلع كأنما ينحط من صبب»'
        ),
      },
    ],
  },
  {
    id: 'musa_desc',
    prophetId: 'musa',
    name: t('Musa (Moses)', 'Moïse (Musa)', 'موسى عليه السلام'),
    honorific: t('Kalimullah (The One with Whom Allah Spoke Directly)', 'Celui à qui Allah s’adressa directement', 'كليم الله'),
    statureCategory: t(
      'Tall (ṭuwāl)',
      'Grand (ṭuwāl)',
      'طُوال'
    ),
    heightEstimate: t(
      'Not stated in metres; the hadith only says he was tall.',
      'Non précisée en mètres ; le hadith dit seulement qu’il était grand.',
      'لم يُذكر طوله بالأمتار، وإنما ورد أنه طُوال.'
    ),
    complexion: t(
      'Brown (ādam) (Sahih al-Bukhari 3396; Sahih Muslim 165).',
      'Brun (ādam) (Sahih al-Bukhari 3396 ; Sahih Muslim 165).',
      'آدَم اللون (صحيح البخاري 3396؛ صحيح مسلم 165).'
    ),
    hairAndBeard: t(
      'Narrations differ: one describes straight hair (Sahih al-Bukhari 3438), another curly (ja‘d). His beard is not described.',
      'Les récits divergent : l’un décrit des cheveux lisses (Sahih al-Bukhari 3438), un autre bouclés (ja‘d). Sa barbe n’est pas décrite.',
      'اختلفت الروايات: في بعضها سَبط الشعر (صحيح البخاري 3438) وفي بعضها جَعد، ولم تُوصف لحيته.'
    ),
    physiqueAndBuild: t(
      'Well-built, “as if one of the men of Shanu’a” (Sahih Muslim 165). The daughter of the man of Madyan called him “strong and trustworthy” (28:26). The story that he lifted the well stone alone comes from tafsir (tradition).',
      'Bien bâti, « comme s’il était des hommes de Shanou’a » (Sahih Muslim 165). La fille du vieillard de Madyan le dit « fort et digne de confiance » (28:26). Le récit selon lequel il souleva seul la pierre du puits vient du tafsir (tradition).',
      'ضَرْبٌ من الرجال كأنه من رجال شنوءة (صحيح مسلم 165)، وقالت ابنة شيخ مدين: ﴿إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ﴾ (القصص 26). وأما رفعه حجر البئر وحده فمن روايات التفسير.'
    ),
    facialFeatures: t(
      'His face is not described. As a sign, his hand came out white without any disease (20:22).',
      'Son visage n’est pas décrit. Comme signe, sa main sortait blanche sans aucun mal (20:22).',
      'لم يُوصف وجهه، ومن آياته أن يده تخرج بيضاء من غير سوء (طه 22).'
    ),
    demeanorAndPresence: t(
      'Very modest and shy, always keeping himself covered (Sahih al-Bukhari 3404).',
      'Très pudique et réservé, toujours couvert (Sahih al-Bukhari 3404).',
      'كان حييًّا ستِّيرًا لا يُرى من جلده شيء استحياءً (صحيح البخاري 3404).'
    ),
    comparisonWithModern: t(
      'Described as tall among people; no measurement exists.',
      'Décrit comme grand parmi les gens ; aucune mesure n’existe.',
      'وُصف بالطول بين الناس، ولا يوجد قياس.'
    ),
    authenticNarrations: [
      {
        source: 'Sahih al-Bukhari',
        hadithNumber: '3396',
        text: t(
          'The Prophet ﷺ said: "Moses was brown, a tall man as if from the people of Shanu’a."',
          'Le Prophète ﷺ a dit : « Moïse était brun, un homme grand comme s’il était des gens de Shanou’a. »',
          'قال النبي ﷺ: «مُوسَى آدَمُ طُوَالٌ كَأَنَّهُ مِنْ رِجَالِ شَنُوءَةَ».'
        ),
      },
      {
        source: 'Sahih al-Bukhari',
        hadithNumber: '3404',
        text: t(
          'The Prophet ﷺ said: "Moses was a shy person and used to cover his body completely because of his extensive shyness."',
          'Le Prophète ﷺ a dit : « Moïse était pudique et se couvrait entièrement à cause de sa grande pudeur. »',
          'قال النبي ﷺ: «إِنَّ مُوسَى كَانَ رَجُلًا حَيِيًّا سِتِّيرًا، لاَ يُرَى مِنْ جِلْدِهِ شَيْءٌ اسْتِحْيَاءً مِنْهُ».'
        ),
      },
    ],
  },
  {
    id: 'isa_desc',
    prophetId: 'isa',
    name: t('Isa (Jesus)', 'Jésus (Isa)', 'عيسى المسيح عليه السلام'),
    honorific: t('The Messiah, Word of Allah & Spirit from Him', 'Le Messie, Parole et Esprit d’Allah', 'المسيح كلمة الله وروحه'),
    statureCategory: t(
      'Medium height (marbū‘)',
      'Taille moyenne (marbū‘)',
      'مربوع القامة'
    ),
    heightEstimate: t(
      'Not stated in metres; the hadith says he was of medium height.',
      'Non précisée en mètres ; le hadith dit qu’il était de taille moyenne.',
      'لم يُذكر طوله بالأمتار، وورد أنه مربوع.'
    ),
    complexion: t(
      'Reddish, “as if he had just come out of a bath” (Sahih al-Bukhari 3394, 3437; Sahih Muslim 168). In a dream the Prophet ﷺ saw him “brown, the best of brown” (Sahih al-Bukhari 3440).',
      'Rougeâtre, « comme s’il sortait du bain » (Sahih al-Bukhari 3394, 3437 ; Sahih Muslim 168). En rêve, le Prophète ﷺ le vit « brun, du plus beau brun » (Sahih al-Bukhari 3440).',
      'أحمر كأنما خرج من ديماس (صحيح البخاري 3394، 3437؛ صحيح مسلم 168)، ورآه النبي ﷺ في المنام آدم كأحسن ما يُرى من أُدم الرجال (صحيح البخاري 3440).'
    ),
    hairAndBeard: t(
      'Long hair falling between his shoulders, combed, with water dripping from it (Sahih al-Bukhari 3440); another narration says curly (Sahih al-Bukhari 3438).',
      'Cheveux longs tombant entre les épaules, peignés, d’où l’eau gouttait (Sahih al-Bukhari 3440) ; un autre récit dit bouclés (Sahih al-Bukhari 3438).',
      'له لِمّة قد رجّلها تضرب بين منكبيه تقطر ماءً (صحيح البخاري 3440)، وفي رواية جَعد (صحيح البخاري 3438).'
    ),
    physiqueAndBuild: t(
      'Broad-chested (Sahih al-Bukhari 3438).',
      'Large de poitrine (Sahih al-Bukhari 3438).',
      'عريض الصدر (صحيح البخاري 3438).'
    ),
    facialFeatures: t(
      'Not described in the authentic sources.',
      'Non décrit dans les sources authentiques.',
      'لم تصفه المصادر الصحيحة.'
    ),
    demeanorAndPresence: t(
      'Dutiful to his mother, “not arrogant or wretched” (19:32).',
      'Bon envers sa mère, « ni arrogant ni malheureux » (19:32).',
      '﴿وَبَرًّا بِوَالِدَتِي وَلَمْ يَجْعَلْنِي جَبَّارًا شَقِيًّا﴾ (مريم 32).'
    ),
    comparisonWithModern: t(
      'Of medium height; no measurement exists.',
      'De taille moyenne ; aucune mesure n’existe.',
      'مربوع القامة، ولا يوجد قياس.'
    ),
    authenticNarrations: [
      {
        source: 'Sahih al-Bukhari',
        hadithNumber: '3394',
        text: t(
          'The Prophet ﷺ said: "I saw Jesus, who was of average height with a red face as if he had just come out of a bath."',
          'Le Prophète ﷺ a dit : « J’ai vu Jésus, de taille moyenne, au visage rouge comme s’il sortait du bain. »',
          'قال النبي ﷺ: «وَرَأَيْتُ عِيسَى، فَإِذَا هُوَ رَجُلٌ رَبْعَةٌ أَحْمَرُ كَأَنَّمَا خَرَجَ مِنْ دِيمَاسٍ».'
        ),
      },
      {
        source: 'Sahih al-Bukhari',
        hadithNumber: '3440',
        text: t(
          'In a dream: "a man of brown colour, the best one can see among brown men, his hair long so that it fell between his shoulders, water dripping from his head."',
          'En rêve : « un homme brun, du plus beau brun que l’on puisse voir, les cheveux longs tombant entre les épaules, l’eau gouttant de sa tête. »',
          'في المنام: «فَإِذَا رَجُلٌ آدَمُ كَأَحْسَنِ مَا يُرَى مِنْ أُدْمِ الرِّجَالِ، تَضْرِبُ لِمَّتُهُ بَيْنَ مَنْكِبَيْهِ، يَقْطُرُ رَأْسُهُ مَاءً».'
        ),
      },
    ],
  },
  {
    id: 'ibrahim_desc',
    prophetId: 'ibrahim',
    name: t('Ibrahim (Abraham)', 'Abraham (Ibrahim)', 'إبراهيم خليل الرحمن'),
    honorific: t('Khalilullah & The Father of Prophets', 'L’Ami intime d’Allah et Père des Prophètes', 'خليل الرحمن وإمام الحنفاء'),
    statureCategory: t(
      'Not described',
      'Non décrite',
      'لم تُوصف'
    ),
    heightEstimate: t(
      'Not stated in the sources.',
      'Non précisée dans les sources.',
      'لم تذكره المصادر.'
    ),
    complexion: t(
      'Not described; the Prophet ﷺ said he resembled him more than any of his descendants (Sahih al-Bukhari 3394, 3437).',
      'Non décrit ; le Prophète ﷺ a dit lui ressembler plus que tous ses descendants (Sahih al-Bukhari 3394, 3437).',
      'لم يُوصف، وقال النبي ﷺ: «وأنا أشبه ولد إبراهيم به» (صحيح البخاري 3394، 3437).'
    ),
    hairAndBeard: t(
      'A report in al-Muwatta’ says he was the first to see grey hair and was told “it is dignity”; it is a mursal report (tradition).',
      'Un récit du Muwatta’ dit qu’il fut le premier à voir des cheveux blancs et qu’on lui dit « c’est la dignité » ; c’est un récit mursal (tradition).',
      'في الموطأ أنه أول من رأى الشيب فقيل له: «وقار»، وهو أثر مرسل.'
    ),
    physiqueAndBuild: t(
      'Not described. With Isma‘il he raised the foundations of the House (2:127).',
      'Non décrit. Avec Ismaïl, il éleva les fondations de la Maison (2:127).',
      'لم يُوصف، ورفع القواعد من البيت مع إسماعيل (البقرة 127).'
    ),
    facialFeatures: t(
      'The Prophet ﷺ said: “I resemble Abraham more than any of his children” (Sahih al-Bukhari 3437).',
      'Le Prophète ﷺ a dit : « Je ressemble à Abraham plus que tous ses enfants » (Sahih al-Bukhari 3437).',
      'قال النبي ﷺ: «وَرَأَيْتُ إِبْرَاهِيمَ وَأَنَا أَشْبَهُ وَلَدِهِ بِهِ» (صحيح البخاري 3437).'
    ),
    demeanorAndPresence: t(
      'Forbearing, tender-hearted and turning to Allah (11:75); “a nation” devoted to Allah (16:120); a generous host to his guests (51:24-27).',
      'Longanime, au cœur tendre, revenant sans cesse à Allah (11:75) ; « une communauté » à lui seul (16:120) ; hôte généreux (51:24-27).',
      '﴿إِنَّ إِبْرَاهِيمَ لَحَلِيمٌ أَوَّاهٌ مُنِيبٌ﴾ (هود 75)، و﴿كَانَ أُمَّةً قَانِتًا لِلَّهِ﴾ (النحل 120)، وأكرم ضيفه (الذاريات 24-27).'
    ),
    comparisonWithModern: t(
      'Not described in the authentic sources.',
      'Non décrit dans les sources authentiques.',
      'لم تصفه المصادر الصحيحة.'
    ),
    authenticNarrations: [
      {
        source: 'Sahih al-Bukhari',
        hadithNumber: '3437',
        text: t(
          'The Prophet ﷺ said: "As for Abraham, I have never seen a man who resembles him more closely than your companion [himself]."',
          'Le Prophète ﷺ a dit : « Quant à Abraham, je n’ai jamais vu un homme lui ressembler plus que votre compagnon [lui-même]. »',
          'قال رسول الله ﷺ: «وَأَمَّا إِبْرَاهِيمُ فَلَمْ أَرَ رَجُلًا أَشْبَهَ بِهِ مِنْ صَاحِبِكُمْ [يعني نفسه ﷺ]»'
        ),
      },
    ],
  },
  {
    id: 'yusuf_desc',
    prophetId: 'yusuf',
    name: t('Yusuf (Joseph)', 'Joseph (Yusuf)', 'يوسف الصديق عليه السلام'),
    honorific: t('The Truthful (As-Siddiq) & Paragon of Beauty', 'Le Véridique et Sommet de la Beauté', 'الصديق الكريم ابن الكريم'),
    statureCategory: t(
      'Not described',
      'Non décrite',
      'لم تُوصف'
    ),
    heightEstimate: t(
      'Not stated in the sources.',
      'Non précisée dans les sources.',
      'لم تذكره المصادر.'
    ),
    complexion: t(
      'He was given half of beauty (Sahih Muslim 162). The women who saw him said: “This is not a man, this is a noble angel” (12:31).',
      'Il reçut la moitié de la beauté (Sahih Muslim 162). Les femmes qui le virent dirent : « Ce n’est pas un être humain, c’est un ange noble » (12:31).',
      'أُعطي شطر الحُسن (صحيح مسلم 162)، وقالت النسوة: ﴿مَا هَٰذَا بَشَرًا إِنْ هَٰذَا إِلَّا مَلَكٌ كَرِيمٌ﴾ (يوسف 31).'
    ),
    hairAndBeard: t(
      'Not described in the authentic sources.',
      'Non décrit dans les sources authentiques.',
      'لم تصفه المصادر الصحيحة.'
    ),
    physiqueAndBuild: t(
      'Not described in the authentic sources.',
      'Non décrit dans les sources authentiques.',
      'لم تصفه المصادر الصحيحة.'
    ),
    facialFeatures: t(
      'Only his beauty is reported: “half of beauty” (Sahih Muslim 162).',
      'Seule sa beauté est rapportée : « la moitié de la beauté » (Sahih Muslim 162).',
      'لم يرد إلا وصف حسنه: «أُعطي شطر الحسن» (صحيح مسلم 162).'
    ),
    demeanorAndPresence: t(
      'Chaste: he refused the wife of al-‘Aziz and preferred prison (12:23-33). Called “the truthful one” (12:46).',
      'Chaste : il repoussa l’épouse d’al-‘Aziz et préféra la prison (12:23-33). Appelé « le véridique » (12:46).',
      'عفيف: أبى امرأة العزيز وآثر السجن (يوسف 23-33)، ووُصف بالصدّيق (يوسف 46).'
    ),
    comparisonWithModern: t(
      'Not described in the authentic sources.',
      'Non décrit dans les sources authentiques.',
      'لم تصفه المصادر الصحيحة.'
    ),
    authenticNarrations: [
      {
        source: 'Sahih Muslim',
        hadithNumber: '162',
        text: t(
          'During the Night Journey, the Prophet ﷺ met Yusuf in the third heaven and remarked: "There I met Joseph, and he had been granted half of all beauty."',
          'Lors du Mi‘raj, le Prophète ﷺ rencontra Joseph au troisième ciel et dit : « J’ai rencontré Joseph : il lui avait été donné la moitié de toute la beauté. »',
          'عن أنس رضي الله عنه أن رسول الله ﷺ قال في حديث الإسراء: «فَفُتِحَ لَنَا، فَإِذَا أَنَا بِيُوسُفَ ﷺ، إِذَا هُوَ قَدْ أُعْطِيَ شَطْرَ الحُسْنِ»'
        ),
      },
    ],
  },
]
