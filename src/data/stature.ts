import type { L3, Ref } from './types'

const t = (en: string, fr: string, ar: string): L3 => ({ en, fr, ar })

export interface StatureComparison {
  id: string
  name: L3
  era: L3
  heightMeters: number
  heightCubits?: number
  scaleRatio: number // Ratio compared to modern human (1.75m)
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
    description: t(
      'Created directly by Allah’s Hand, sixty cubits (~30 meters / 98.4 ft) in height and seven cubits wide. The hadith establishes that humanity has been steadily decreasing in stature since Adam until the modern era.',
      'Créé directement par la Main d’Allah, mesurant soixante coudées (~30 mètres) de haut et sept coudées de large. Le hadith atteste que la taille humaine n’a cessé de décroître depuis.',
      'خلقه الله بيده على طول ستين ذراعاً (نحو 30 متراً) وعرضه سبعة أذرع. وثبت في الصحيحين أن الخلق لم يزل ينقص منذ عهد آدم حتى استقر على ما هو عليه اليوم.'
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
    era: t('Post-Deluge Epoch (c. 2400 BCE)', 'Ère post-diluvienne (env. 2400 av. J.-C.)', 'ما بعد الطوفان وعهد هود (الأحقاف)'),
    heightMeters: 7.5,
    heightCubits: 15,
    scaleRatio: 4.28,
    description: t(
      'Endowed by divine decree with extraordinary physical stature and unmatched strength, building massive monolithic columns across the desert dunes. The Qur’an records: "He increased you in stature extensively."',
      'Dotés d’une corpulence colossale et d’une vigueur physique sans égale, ils érigeaient des cités mégalithiques dans les dunes. Le Coran rappelle : « Il a accru considérablement votre stature physique. »',
      'زادهم الله بسطة عظيمة في الخلق والقوة، فكانوا عمالقة يقطعون صخور الجبال وينصبون الأعمدة الشاهقة في رمال الأحقاف، وقال تعالى: ﴿وَاذْكُرُوا إِذْ جَعَلَكُمْ خُلَفَاءَ مِن بَعْدِ قَوْمِ نُوحٍ وَزَادَكُمْ فِي الْخَلْقِ بَسْطَةً﴾.'
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
    era: t('Ancient Arabian Epoch (c. 2100 BCE)', 'Ère arabe antique (env. 2100 av. J.-C.)', 'عهد صالح (الحِجر ومدائن صالح)'),
    heightMeters: 4.0,
    heightCubits: 8,
    scaleRatio: 2.28,
    description: t(
      'Masters of monolithic masonry who carved palatial residential chambers directly into sheer mountain cliffs. Their size and muscular endurance allowed them to sculpt massive stone façades with precision.',
      'Maîtres maçons de la pierre, ils taillaient des palais somptueux à même les falaises de grès. Leur stature et puissance musculaire leur permettaient de sculpter des montagnes entières.',
      'كانوا ينحتون من الجبال بيوتاً فارهين بصلابة وقوة بدنية هائلة مكنتهم من نقش الصخور الشاهقة في الحِجر.'
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
    era: t('Late Bronze & Iron Age (c. 1300–1000 BCE)', 'Âge du Bronze et du Fer (env. 1300–1000 av. J.-C.)', 'عصر موسى والأنبياء الملوك'),
    heightMeters: 2.1,
    heightCubits: 4.2,
    scaleRatio: 1.2,
    description: t(
      'Musa is described in the authentic hadith as exceptionally tall, muscular, and athletic, resembling the sturdy men of the Shanu‘ah tribe. King Talut was chosen partly for his broad stature and physical presence.',
      'Moïse est décrit dans les hadiths comme très grand, robuste et athlétique, ressemblant aux hommes vigoureux de la tribu de Shanou’ah. Le roi Talout fut élu pour sa science et sa stature.',
      'وُصف موسى عليه السلام بأنه رجل طُوال جعد كأنه من رجال شنوءة شديد البأس، وكان طالوت زادَه الله بسطة في العلم والجسم.'
    ),
    textRef: 'bukhari:3438',
    hadithText: t(
      'The Prophet ﷺ said: "I saw Moses: he was a tall man with wavy hair, looking like one of the men of Shanu‘ah." (Sahih al-Bukhari 3438)',
      'Le Prophète ﷺ a dit : « J’ai vu Moïse : c’était un homme de haute taille, aux cheveux ondulés, semblable aux hommes vigoureux de Shanou’ah. » (Bukhari 3438)',
      'قال النبي ﷺ: «رَأَيْتُ مُوسَى، فَإِذَا هُوَ رَجُلٌ ضَرْبٌ جَعْدٌ، كَأَنَّهُ مِنْ رِجَالِ شَنُوءَةَ» (صحيح البخاري 3438)'
    ),
  },
  {
    id: 'modern_human',
    name: t('Modern Humankind', 'L’Être humain contemporain', 'الإنسان المعاصر'),
    era: t('The Final Prophetic Era to Present', 'Ère prophétique finale à nos jours', 'عصر النبوة الخاتمة والعصر الحاضر'),
    heightMeters: 1.75,
    heightCubits: 3.5,
    scaleRatio: 1.0,
    description: t(
      'The stabilized average human stature today, corresponding to the moderate, balanced height exemplified by the Prophet Muhammad ﷺ (neither excessively tall nor short).',
      'La stature humaine moyenne contemporaine stabilisée, incarnée par la taille modérée et harmonieuse du Prophète Muhammad ﷺ.',
      'المتوسط البشري المستقر للإنسان اليوم (نحو 175 سم)، وهو المقياس المتوازن الذي بُعث عليه النبي المصطفى ﷺ وسطاً لا بالطويل البائن ولا بالقصير.'
    ),
    textRef: 'bukhari:3549',
    hadithText: t(
      'Al-Bara’ ibn ‘Azib narrated: "The Prophet ﷺ was of medium stature, broad-shouldered, with hair reaching the lobes of his ears. I never saw anything more beautiful than him." (Sahih al-Bukhari 3549)',
      'Al-Bara’ ibn ‘Azib a rapporté : « Le Prophète ﷺ était de taille moyenne, large d’épaules, avec des cheveux descendant jusqu’aux lobes des oreilles. Je n’ai jamais rien vu de plus beau que lui. » (Bukhari 3549)',
      'عن البراء بن عازب رضي الله عنه قال: «كَانَ النَّبِيُّ ﷺ مَرْبُوعًا، بَعِيدَ مَا بَيْنَ المَنْكِبَيْنِ، لَهُ شَعَرٌ يَبْلُغُ شَحْمَةَ أُذُنِهِ، مَا رَأَيْتُ شَيْئًا قَطُّ أَحْسَنَ مِنْهُ» (صحيح البخاري 3549)'
    ),
  },
  {
    id: 'jannah_restoration',
    name: t('Believers in Paradise (The Glorious Restoration)', 'Les Croyants au Paradis (Restauration)', 'أهل الجنة (العودة إلى كمال الخلقة)'),
    era: t('The Eternal Hereafter', 'L’Éternité dans l’Au-delà', 'الخلود الأبدي في جنات النعيم'),
    heightMeters: 30.0,
    heightCubits: 60,
    scaleRatio: 17.14,
    description: t(
      'In Paradise, all human believers will be bodily resurrected and elevated to the original stature of Adam: sixty cubits tall, thirty-three years old, without hairiness, imperfection, or aging, glowing with celestial beauty.',
      'Au Paradis, tous les croyants ressusciteront à la stature originelle d’Adam : soixante coudées de hauteur, l’âge de trente-trois ans, d’une splendeur éclatante, sans vieillissement ni décrépitude.',
      'يُبعث أهل الجنة على صورة أبيهم آدم في الطول والجمال: طولهم ستون ذراعاً، في سن ثلاثة وثلاثين سنة، جُرداً مُرداً كحل العينين، في كمال الحسن والشباب الدائم.'
    ),
    textRef: 'tirmidhi:2545',
    hadithText: t(
      'The Prophet ﷺ said: "The people of Paradise will enter Paradise hairless, beardless, with kohl-rimmed eyes, aged thirty-three years, sixty cubits tall upon the stature of Adam." (Sunan at-Tirmidhi 2545)',
      'Le Prophète ﷺ a dit : « Les gens du Paradis y entreront imberbes, sans poils superflus, les yeux rehaussés de khôl, âgés de trente-trois ans, à la stature d’Adam mesurant soixante coudées. » (Tirmidhi 2545)',
      'قال رسول الله ﷺ: «يَدْخُلُ أَهْلُ الجَنَّةِ الجَنَّةَ جُرْدًا مُرْدًا كُحْلًا أَبْنَاءَ ثَلاَثِينَ أَوْ ثَلاَثٍ وَثَلاَثِينَ سَنَةً، عَلَى خَلْقِ آدَمَ طُولُهُ سِتُّونَ ذِرَاعًا» (سنن الترمذي 2545)'
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
    heightEstimate: t('c. 1.75 m (5 ft 9 in) — perfectly proportioned', 'env. 1,75 m — proportions parfaites', 'نحو 175 سم، لا بالطويل البائن ولا بالقصير'),
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
        hadithNumber: '3549',
        text: t(
          'Al-Bara’ reported: "The Messenger of Allah ﷺ was of medium height, with wide shoulders and thick hair reaching his earlobes. Wearing a red cloak, I never saw anything more handsome than him."',
          'Al-Bara’ a rapporté : « Le Messager d’Allah ﷺ était de taille moyenne, large d’épaules, avec des cheveux touchant ses lobes. Dans sa cape rouge, je n’ai jamais rien vu de plus beau que lui. »',
          'عن البراء بن عازب: «كان رسول الله ﷺ مربوعاً، بعيد ما بين المنكبين، له شعر يبلغ شحمة أذنه، رأيته في حلة حمراء لم أر شيئاً قط أحسن منه»'
        ),
      },
      {
        source: 'Shama’il al-Tirmidhi',
        hadithNumber: '1',
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
    statureCategory: t('Tall, Towering & Athletic (Tuwal)', 'Grand, puissant et athlétique (Touwal)', 'طوال القامة عظيم الهامة'),
    heightEstimate: t('c. 1.95–2.05 m (~6 ft 5 in) — imposing athletic frame', 'env. 1,95–2,05 m — stature imposante', 'طويل مفرط في الطول والقوة البدنية'),
    complexion: t(
      'Deep wheat/olive-brown skin (Adam), possessing radiant dignity and sun-weathered majesty.',
      'Peint hâlé et cuivré (Adam), d’une majesté solaire imposante.',
      'آدم اللون (أسمر صافٍ قمحي)، فيه هيبة وجلال ملوك وجبال.'
    ),
    hairAndBeard: t(
      'Thick, textured, wavy dark hair flowing to his shoulders, resembling the warrior tribesmen of Yemen (Shanu‘ah).',
      'Chevelure noire ondulée et abondante tombant sur les épaules, semblable aux guerriers de Shanou’ah.',
      'شعر رأس جعد رَجِل (متموج بكثافة)، يتهدل حول منكبيه كرجال الأزد وشنوءة.'
    ),
    physiqueAndBuild: t(
      'Extremely muscular and robust; famously lifted single-handedly the massive stone well-cover in Midian that required ten shepherds.',
      'Très musclé et robuste ; capable de soulever seul la pierre du puits de Madian requérant dix hommes.',
      'شديد الأيد والقوة، رفع صخرة بئر مدين بمفرده وكانت لا تُرفع إلا بعصبة من الرجال.'
    ),
    facialFeatures: t(
      'Piercing eyes radiating divine awe, strong jawline, illuminated right hand that shone pure white without disease like a celestial beacon.',
      'Regard perçant empreint d’une gravité sacrée, mâchoire ferme, main droite rayonnant d’une blancheur céleste.',
      'حازم الملامح، وله اليد البيضاء المعجزة تخرج من جيبه بيضاء كفلقة قمر ناصعة بلا سوء.'
    ),
    demeanorAndPresence: t(
      'Fierce in justice, courageous before Pharaoh, deeply humble and trembling before the Almighty on Mount Sinai.',
      'Intrépide face aux tyrans, juste, tremblant d’humilité devant le Créateur sur le Sinaï.',
      'صاحب غيرة للحق وبأس على الطغاة، وجل خاشع بين يدي ربه حين نودي في الوادي المقدس طوى.'
    ),
    comparisonWithModern: t(
      'Significantly taller, wider, and physically stronger than the average modern human, built like an ancient desert patriarch.',
      'Bien plus grand et athlétique que l’humain moyen actuel, taillé pour les épreuves de l’Exode.',
      'يفوق الإنسان المعاصر في الطول وعرض الكتفين والقوة العضلية الخارقة التي أيده الله بها.'
    ),
    authenticNarrations: [
      {
        source: 'Sahih al-Bukhari',
        hadithNumber: '3438',
        text: t(
          'The Prophet ﷺ said during the Mi‘raj: "I passed by Moses: he was a tall, athletic man with wavy hair, as if he were of the men of Shanu‘ah."',
          'Le Prophète ﷺ a dit lors du Mi‘raj : « J’ai vu Moïse : c’était un homme de haute taille, aux cheveux ondulés, tel un homme de Shanou’ah. »',
          'قال رسول الله ﷺ: «رَأَيْتُ عِيسَى وَمُوسَى وَإِبْرَاهِيمَ، فَأَمَّا مُوسَى فَرَجُلٌ طُوَالٌ جَعْدٌ، كَأَنَّهُ مِنْ رِجَالِ شَنُوءَةَ»'
        ),
      },
    ],
  },
  {
    id: 'isa_desc',
    prophetId: 'isa',
    name: t('Isa (Jesus)', 'Jésus (Isa)', 'عيسى المسيح عليه السلام'),
    honorific: t('The Messiah, Word of Allah & Spirit from Him', 'Le Messie, Parole et Esprit d’Allah', 'المسيح كلمة الله وروحه'),
    statureCategory: t('Moderate Height, Graceful & Serene (Rab‘ah)', 'Taille moyenne, gracieuse et sereine', 'مربوع القامة رشيق القوام'),
    heightEstimate: t('c. 1.78 m (~5 ft 10 in) — elegant and upright posture', 'env. 1,78 m — posture noble et droite', 'نحو 178 سم، معتدل القامة نضر المحيا'),
    complexion: t(
      'Fair, radiant reddish-white skin, glowing with freshness as though he had just stepped out of a warm private bath (al-Dimas).',
      'Teint clair blanc rosé, resplendissant de fraîcheur comme sortant d’un bain purifiant (Dimas).',
      'أحمر مشرب بالبياض، أبيض ناصع كأنما خرج من ديماس (حمّام ماء نقي) نضارة ونقاءً.'
    ),
    hairAndBeard: t(
      'Sleek, straight reddish-brown hair parted down the middle, falling gently to his earlobes and shoulders with drops of water glistening like pearls.',
      'Cheveux lisses châtain clair descendant aux épaules, perlant de gouttes d’eau comme des perles fines.',
      'سبط الشعر لا جعودة فيه، يضرب بين منكبيه كأنه يقطر ماءً ولؤلؤاً من النضارة والبركة.'
    ),
    physiqueAndBuild: t(
      'Slender, refined, and ascetic frame; light on his feet, radiating spiritual peace rather than heavy armor.',
      'Silhouette fine, ascétique et noble, marchant avec une légèreté spirituelle désarmante.',
      'قوام رشيق زاهد معتدل الخلقة، خفيف الحركة تعلوه السكينة والوقار النبوي.'
    ),
    facialFeatures: t(
      'Merciful and serene gaze, high forehead, face surrounded by an aura of peaceful innocence and prophetic insight.',
      'Regard de pure compassion, visage paisible auréolé de clémence et de lumière spirituelle.',
      'وجه يشع سلاماً وبراءة وطهراً، إذا طأطأ رأسه قطر وإذا رفعه تحدرت منه جمان كاللؤلؤ.'
    ),
    demeanorAndPresence: t(
      'Gentle, speaking with profound wisdom, eating the vegetation of the earth, healing the afflicted with a soft touch.',
      'D’une douceur infinie, guérissant les souffrants d’un effleurement, détaché des biens de ce monde.',
      'سيد الزهاد، رفيق بالمساكين يمسح على المريض فيبرأ بإذن الله، يعلوه النور الإلهي.'
    ),
    comparisonWithModern: t(
      'Very close in stature to a modern tall-average man, distinguished by ethereal biological freshness and radiant skin purity.',
      'Très proche de la taille humaine contemporaine, avec une pureté et un éclat biologique sublimes.',
      'يقارب في الطول الإنسان المعاصر المعتدل، ويتميز بنضارة فائقة وطهارة بشرة تفيض نوراً وندى.'
    ),
    authenticNarrations: [
      {
        source: 'Sahih al-Bukhari',
        hadithNumber: '3440',
        text: t(
          'The Prophet ﷺ said: "I saw Jesus: he was a man of medium stature, of red and white complexion, with straight hair, looking as if he had just come out of a bath."',
          'Le Prophète ﷺ a dit : « J’ai vu Jésus : un homme de taille moyenne, au teint blanc rosé, aux cheveux lisses, comme sortant du bain. »',
          'عن ابن عمر رضي الله عنهما: قال النبي ﷺ: «رَأَيْتُ عِيسَى رَجُلًا مَرْبُوعَ الخَلْقِ، إِلَى الحُمْرَةِ وَالبَيَاضِ، سَبِطَ الرَّأْسِ، كَأَنَّمَا خَرَجَ مِنْ دِيمَاسٍ»'
        ),
      },
    ],
  },
  {
    id: 'ibrahim_desc',
    prophetId: 'ibrahim',
    name: t('Ibrahim (Abraham)', 'Abraham (Ibrahim)', 'إبراهيم خليل الرحمن'),
    honorific: t('Khalilullah & The Father of Prophets', 'L’Ami intime d’Allah et Père des Prophètes', 'خليل الرحمن وإمام الحنفاء'),
    statureCategory: t('Stately, Majestic & Grand (Jalil)', 'Majestueux, noble et imposant', 'جليل القدر عظيم الهيبة'),
    heightEstimate: t('c. 1.82 m (~6 ft) — grand patriarchal carriage', 'env. 1,82 m — port altier patriarcal', 'نحو 182 سم، أشبه الناس خلقاً بمحمد ﷺ'),
    complexion: t(
      'Luminous golden-wheat tone, dignified and radiant with prophetic serenity.',
      'Teint noble doré, rayonnant de sérénité prophétique.',
      'أزهر مشرق كالقمر، تتلألأ في وجهه أنوار التوحيد واليقين.'
    ),
    hairAndBeard: t(
      'Dignified silver-white hair and beard in his elder years; tradition notes he was the first man whose hair turned grey, asking Allah about it and being told: "It is dignity."',
      'Chevelure et barbe blanches majestueuses ; premier homme dont les cheveux blanchirent, Dieu lui disant : « C’est la dignité. »',
      'وقور الشيبة، وهو أول من خطه الشيب في لحيته فقال: يا رب ما هذا؟ قال: وقار، قال: رب زدني وقاراً.'
    ),
    physiqueAndBuild: t(
      'Robust, enduring immense migrations across desert sands, building the foundations of the Ka‘bah with massive granite blocks.',
      'Robuste et endurant, capable d’ériger les fondations de pierre de la Ka‘bah dans les chaleurs de Bakkah.',
      'قوي البنية صبور على الهجرة ورفع قواعد البيت الحرام بصخور مكة الصماء.'
    ),
    facialFeatures: t(
      'Almost identical to Prophet Muhammad ﷺ in facial contours, eye depth, and noble countenance.',
      'Traits faciaux presque identiques à ceux du Prophète Muhammad ﷺ.',
      'أشبه الخلق قاطبة برسول الله محمد ﷺ في تقاسيم الوجه والقامة والطلعة المباركة.'
    ),
    demeanorAndPresence: t(
      'Humble host (*Abu ad-Duyuf*), welcoming travelers with roasted calves, an entire nation within a single man (*Ummah*).',
      'Hôte généreux, accueillant les voyageurs, une nation à lui seul (*Oummah*).',
      'أكرم الناس لضيوفه وأكثرهم إنابة وتضرعاً، ﴿إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِّلَّهِ حَنِيفًا﴾.'
    ),
    comparisonWithModern: t(
      'Exemplified the ancient patriarchal vitality that maintained exceptional stamina and strength into advanced age.',
      'Incarnait la vigueur patriarcale antique conservant force et clarté d’esprit jusqu’à un âge avancé.',
      'أقوى وأصلب من الإنسان العادي، عاش مجاهداً داعياً بجلد وقوة إلى سن متقدمة.'
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
    statureCategory: t('Graceful, Youthful & Radiant (Bahi)', 'Harmonieux, radieux et noble', 'بهي الطلعة رائع القوام'),
    heightEstimate: t('c. 1.80 m (~5 ft 11 in) — balanced royal stature', 'env. 1,80 m — élégance princière', 'نحو 180 سم، كالقمر في تمامه'),
    complexion: t(
      'Flawless radiant complexion, glowing with inner light that caused onlookers to lose their senses in admiration.',
      'Teint sans défaut, resplendissant d’une lumière céleste fascinant ceux qui le contemplaient.',
      'نقي البشرة كالفجر الصادق، يتلألأ وجهه نوراً حتى سحرت نضرته الأبصار.'
    ),
    hairAndBeard: t(
      'Lustrous, wavy black locks framing a serene symmetrical face.',
      'Boucles noires soyeuses encadrant un visage d’une symétrie sublime.',
      'شعر أسود متموج ناعم يحيط بوجهه البهي كتاج نور.'
    ),
    physiqueAndBuild: t(
      'Impeccably proportioned, combining youthful athletic elegance with regal nobility.',
      'Silhouette d’une proportion parfaite, alliant grâce juvénile et prestance royale.',
      'قوام معتدل بديع الصنع، جمع بين خفة الفتوة ووقار الصديقين.'
    ),
    facialFeatures: t(
      'Described as possessing half of all global human beauty created by God, with eyes like luminous stars and an angelic countenance.',
      'Doté de la moitié de toute la beauté humaine créée par Dieu, d’un visage angélique sans égal.',
      'أوتي شطر الحسن كله، وقالت نسوة مصر حين رأينه: ﴿مَا هَٰذَا بَشَرًا إِنْ هَٰذَا إِلَّا مَلَكٌ كَرِيمٌ﴾.'
    ),
    demeanorAndPresence: t(
      'Chaste, modest, deeply dignified; lowering his gaze, combining peerless exterior beauty with immaculate inner piety.',
      'Chaste, modeste et réservé, alliant la beauté physique suprême à une piété immaculée.',
      'عفيف النفس، غضيض الطرف، يجمع بين كمال الظاهر وحسن الباطن والخشية من الله.'
    ),
    comparisonWithModern: t(
      'Far beyond any standard human symmetry; tradition affirms God concentrated half of humanity’s cosmetic beauty into Yusuf alone.',
      'Incomparable à toute beauté humaine ordinaire : la moitié de la beauté universelle lui fut octroyée.',
      'لا يُقاس بالمعايير الجمالية العادية للإنسان، فقد خصه الله بنصف جمال بني آدم أجمعين.'
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
