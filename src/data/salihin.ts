import type { L3, Ref } from './types'

const t = (en: string, fr: string, ar: string): L3 => ({ en, fr, ar })

export type SalihinCategory = 'women_of_faith' | 'sages_and_rulers' | 'believers_under_trials' | 'companions'

export interface RighteousFigure {
  id: string
  name: L3
  title: L3
  category: SalihinCategory
  quranRefs: Ref[]
  era: L3
  keyVirtue: L3
  summary: L3
  story: L3
  lessons: L3[]
}

export type StoryTheme = 'faith_vs_tyranny' | 'wisdom_and_counsel' | 'miracles_and_signs' | 'warnings_and_retribution' | 'covenants'

export interface QuranStory {
  id: string
  title: L3
  surahName: L3
  verses: Ref[]
  theme: StoryTheme
  summary: L3
  historicalSetting: L3
  coreLessons: L3[]
}

export const SALIHIN_DATA: RighteousFigure[] = [
  {
    id: 'maryam_bint_imran',
    name: t('Maryam bint ‘Imran', 'Marie fille d’Imran (Maryam)', 'مريم ابنة عمران عليها السلام'),
    title: t('Chosen Above the Women of All Worlds', 'Élue au-dessus des femmes de l’univers', 'سيدة نساء العالمين والصديقة'),
    category: 'women_of_faith',
    quranRefs: ['3:35-47', '19:16-34', '66:12'],
    era: t('1st Century BCE / Judea', 'Ier siècle av. J.-C. / Judée', 'القرن الأول قبل الميلاد / بيت المقدس'),
    keyVirtue: t('Absolute Chaste Devotion & Sincere Faith (Siddiqah)', 'Chasteté absolue et foi inébranlable (Siddiqa)', 'الصدق التام والعفة والتبتل لعبادة الله'),
    summary: t(
      'The only woman mentioned by name in the Holy Qur’an, dedicated before birth to divine service, nourished with miraculous fruits, and honored with the virgin birth of Prophet Isa.',
      'La seule femme mentionnée par son nom dans le Coran, consacrée avant sa naissance, miraculeusement nourrie au temple et mère virginale de Jésus.',
      'المرأة الوحيدة التي سُميت باسمها في القرآن، نذرتها أمها محررة لله، وكفلها زكريا، وبشرتها الملائكة باصطفائها على نساء العالمين وحملها بعيسى بكلمة من الله.'
    ),
    story: t(
      'Dedicated to the temple sanctuary by her pious mother Hannah, Maryam grew under the guardianship of Zakariya. She secluded herself in intense prayer where angels provided her unseasonal celestial fruits. When Jibril announced a pure son, she surrendered to the divine decree, enduring the pain of childbirth beneath a palm tree with angelic reassurance, and presenting her baby who spoke from the cradle to vindicate her honor.',
      'Vouée au sanctuaire par sa pieuse mère, Marie grandit sous la garde de Zacharie. Elle se retirait en dévotion pure où les anges la comblaient de fruits hors saison. Lorsque Gabriel lui annonça un enfant sans père, elle s’abandonna à la volonté divine, enfantant sous un palmier béni avant que Jésus ne parle au berceau pour attester de son innocence.',
      'نشأت مريم في محراب العبادة يتنزل عليها رزق الله غضاً، فبشرها الروح الأمين جبريل بغلام زكي، فحملت به واعتزلت في مكان قصي، فلما فاجأها المخاض إلى جذع النخلة تلقت العناية الإلهية رطباً جنياً وسرياً ماءً، وعادت بقومها تحمله فنطق عيسى في المهد صبياً مبرئاً أمه ومعلناً نبوته.'
    ),
    lessons: [
      t('Chastity and pure devotion elevate a servant above worldly ranks.', 'La chasteté et la dévotion sincère élèvent l’âme au plus haut rang.', 'العفة والصدق مع الله يبلغان العبد أعلى المقامات.'),
      t('Reliance upon Allah brings ease in the most agonizing trials.', 'La confiance en Dieu apporte le secours dans les plus dures épreuves.', 'التوكل على الله يُبدل الخوف أمناً والألم سكينة.'),
    ],
  },
  {
    id: 'asiya_bint_muzahim',
    name: t('Asiya bint Muzahim (Wife of Pharaoh)', 'Asiya fille de Muzahim (Épouse de Pharaon)', 'آسية بنت مزاحم (امرأة فرعون)'),
    category: 'women_of_faith',
    title: t('The Queen Who Chose Paradise over a Throne', 'La reine qui préféra le Paradis au trône terrestre', 'المؤمنة الصابرة وشهيدة التوحيد في قصر الطغيان'),
    quranRefs: ['28:9', '66:11'],
    era: t('c. 1300 BCE / Ancient Egypt', 'Env. 1300 av. J.-C. / Égypte Antique', 'القرن الثالث عشر قبل الميلاد / مصر القديمة'),
    keyVirtue: t('Steadfast Faith in the Depths of Tyranny', 'Foi inébranlable au cœur même de la tyrannie', 'الثبات على الإيمان في عقر دار الكفر'),
    summary: t(
      'The royal queen of Egypt who rescued infant Musa from the Nile, embraced monotheism despite Pharaoh’s oppression, and prayed for a house with Allah in Paradise.',
      'La reine d’Égypte qui sauva Moïse nourrisson des eaux du Nil, embrassa le Monothéisme et défia la cruauté de Pharaon pour une demeure au Paradis.',
      'زوجة فرعون التي أنقذت موسى رضيعاً وقالت قرة عين لي ولك، فآمنت بالله لما ظهر الحق، فصبرت على بطش فرعون وعذابه واشترت جوار الله وجنته بملك الدنيا.'
    ),
    story: t(
      'When the floating reed chest containing baby Musa touched the palace watergates, Asiya’s heart was filled with tender affection, staying Pharaoh’s executioners. When Musa returned victorious with the divine signs, Asiya openly declared her monotheism. Tortured by Pharaoh under the blazing sun, she looked up to heaven smiling as she beheld her luminous palace being constructed in Jannah, praying: "My Lord, build for me near You a house in Paradise and save me from Pharaoh and his deeds."',
      'Quand le berceau de Moïse aborda les jardins royaux, Asiya fut saisie d’un amour maternel providentiel et empêcha sa mort. Quand Moïse défia les magiciens avec la vérité, elle proclama sa foi. Torturée sans pitié sous le soleil de plomb, elle sourit en apercevant son palais au Paradis, suppliant : « Seigneur, bâtis-moi auprès de Toi une maison au Paradis et sauve-moi de Pharaon et de ses méfaits. »',
      'وقفت آسية في قصر فرعون موقف البطولة حين التقطت موسى وحمته من الذبح، فلما كبر موسى وصدع بالرسالة آمنت برب العالمين، فأذاقها فرعون سوء العذاب وأوتد لها الأوتاد لتتراجع عن دينها، فما زادها إلا ثباتاً وهي تدعو: ﴿رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ وَنَجِّنِي مِن فِرْعَوْنَ وَعَمَلِهِ وَنَجِّنِي مِنَ الْقَوْمِ الظَّالِمِينَ﴾ فكشف الله لها عن بيتها في الجنة فضحكت وفارقت روحها الطاهرة الجسد.'
    ),
    lessons: [
      t('Faith is a sovereign personal choice untouched by the tyranny of one’s surroundings.', 'La foi est un choix souverain qu’aucune tyrannie extérieure ne peut briser.', 'الإيمان حرية باطنية لا تملك قوة في الأرض قهرها.'),
      t('True royalty is closeness to Allah in the eternal realm, not worldly palaces.', 'La véritable noblesse réside dans la proximité divine, non dans les trônes éphémères.', 'شرف القرب من الله أعظم من كل عروش الأرض وزخرفها.'),
    ],
  },
  {
    id: 'luqman_al_hakim',
    name: t('Luqman the Wise', 'Luqman le Sage', 'لقمان الحكيم'),
    title: t('The Teacher of Moral Wisdom & Gratitude', 'Le Maître de la Sagesse morale et de la Gratitude', 'الحكيم المعلم ورمز الشكر والأدب'),
    category: 'sages_and_rulers',
    quranRefs: ['31:12-19'],
    era: t('Ancient Antiquity / Nubia & Arabia', 'Antiquité / Nubie et Arabie', 'العصور القديمة / أرض النوبة والجزيرة'),
    keyVirtue: t('Profound Divine Wisdom (*Hikmah*) & Holistic Parental Mentorship', 'Profonde sagesse divine (*Hikmah*) et éducation bienveillante', 'الحكمة وشكر نعم الله وتربية الأبناء على المراقبة'),
    summary: t(
      'A pious sage granted divine wisdom by Allah, whose profound moral injunctions to his son on Tawhid, prayer, humility, and speech are immortalized across Surah Luqman.',
      'Un sage inspiré comblé de clairvoyance par Allah, dont les recommandations éducatives sur le Monothéisme, l’humilité et la prière forment un trésor éternel.',
      'رجل صالح آتاه الله الحكمة وشكر النعمة، خلّد القرآن وصاياه الخالدة لابنه في التوحيد، وبر الوالدين، ومراقبة الله، وإقامة الصلاة، والأمر بالمعروف، والتواضع في المشي والحديث.'
    ),
    story: t(
      'Scholars record Luqman was a humble, reflective man who was asked: "What elevated you to this wisdom?" He replied: "Truthfulness in speech, fulfilling the trust, and leaving that which does not concern me." In tender conversation with his son, he cautioned that even a mustard-seed of deed hidden within a solid rock or in the heavens will be brought forward by Allah, instructing him to walk gently without insolence and lower his voice.',
      'Les historiens décrivent Luqman comme un homme humble et méditatif. Interrogé sur le secret de sa sagesse, il répondit : « La véracité des propos, le respect des dépôts et le délaissement de ce qui ne me regarde pas. » Il enseigna à son fils que la moindre action, fût-elle du poids d’un grain de moutarde caché au cœur d’un roc, sera dévoilée par Dieu, lui intimant de marcher avec humilité et modérer sa voix.',
      'أوتي لقمان الحكمة فقال: من يشكر فإنما يشكر لنفسه، وجلس إلى ولده يعظه بأعظم المواعظ: حذره من الشرك لأنه ظلم عظيم، وذكره بإحسان الوالدين، وبيّن له سعة علم الله ودقته ﴿إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ فَتَكُن فِي صَخْرَةٍ أَوْ فِي السَّمَاوَاتِ أَوْ فِي الْأَرْضِ يَأْتِ بِهَا اللَّهُ﴾، وأمره بالصبر على ما أصابه والتواضع في مشيه وخفض صوته.'
    ),
    lessons: [
      t('True wisdom begins with gratitude to the Creator and humility among people.', 'La vraie sagesse commence par la gratitude envers le Créateur et l’humilité envers les hommes.', 'رأس الحكمة شكر المنعم والتواضع لعباد الله.'),
      t('God’s omniscience encompasses the smallest atom across all creation.', 'L’omniscience divine embrasse le moindre atome dans tout l’univers.', 'علم الله محيط بدقائق الذر في ظلمات الصخور والسماوات.'),
    ],
  },
  {
    id: 'al_khidr',
    name: t('Al-Khidr (The Verdant Servant of God)', 'Al-Khidr (Le Serviteur vertueux et savant)', 'الخضر عليه السلام (العبد الصالح)'),
    title: t('The Scholar of Inner Realities & Divine Decrees', 'L’initié aux réalités cachées et aux décrets divins', 'صاحب العلم اللدني ومرافق موسى'),
    category: 'sages_and_rulers',
    quranRefs: ['18:65-82'],
    era: t('Mosaic Era / Junction of the Two Seas', 'Époque de Moïse / Confluent des deux mers', 'عصر موسى / مجمع البحرين'),
    keyVirtue: t('Esoteric Divine Insight (*‘Ilm Ladunni*) & Compassionate Justice', 'Science intuitive divine (*‘Ilm Ladunni*) et justice bienveillante', 'العلم اللدني وفهم أسرار الأقدار والرحمة بالضعفاء'),
    summary: t(
      'The righteous servant whom Musa was commanded to seek at the confluence of the two seas, revealing that apparent calamities often conceal supreme divine mercies.',
      'Le serviteur doué d’une science cachée que Moïse rejoignit au confluent des mers, révélant que les épreuves apparentes dissimulent souvent des grâces divines.',
      'العبد الصالح الذي آتاه الله رحمة من عنده وعلمه من لدنه علماً، سافر معه موسى ليتعلم منه، فخرق السفينة رحمة بأهلها، وقتل الغلام حماية لوالديه، وبنى الجدار حفظاً لكنز اليتيمين.'
    ),
    story: t(
      'When Musa was asked whether anyone on earth possessed more knowledge, he answered no; whereupon Allah directed him to the junction of the seas to learn from Al-Khidr. Journeying together on condition of silent patience, Al-Khidr scuttled the ship of poor fishermen to prevent its confiscation by a tyrannical king, terminated a destined corrupted youth to save his righteous parents’ faith, and restored a crumbling wall in a hostile town to protect an orphan inheritance left by a pious father.',
      'Lorsque Moïse fut interrogé sur l’homme le plus savant, il crut l’être ; Dieu le guida alors vers Al-Khidr. Voyageant ensemble sous condition d’abstention de tout jugement prématuré, Al-Khidr endommagea le bateau de pauvres pêcheurs pour le sauver d’un roi spoliateur, ôta la vie à un jeune voué à la tyrannie pour préserver la foi de ses parents pieux, et rebâtit bénévolement un mur dans un village hostile pour préserver le trésor de deux orphelins vertueux.',
      'التقى موسى بالخضر عند مجمع البحرين بعد فقد الحوت، واشترط عليه الخضر ألا يسأله عن شيء حتى يُحدث له منه ذكراً. فوقعت الأمور الثلاثة المحيرة لعقل الشريعة الظاهر حتى كشف الخضر عن تأويلها برحمة من ربه: إنقاذ سفينة المساكين من ملك غاصب، ووقاية الأبوين الصالحين من طغيان ولدهما، وحفظ كنز الغلامين اليتيمين لبر والدهما ﴿وَمَا فَعَلْتُهُ عَنْ أَمْرِي ذَٰلِكَ تَأْوِيلُ مَا لَمْ تَسْطِع عَّلَيْهِ صَبْرًا﴾.'
    ),
    lessons: [
      t('Behind every painful divine decree lies hidden wisdom and profound mercy.', 'Derrière chaque épreuve amère se cache une sagesse divine et une infinie miséricorde.', 'وراء كل قدر مؤلم حكمة إلهية خفية تؤول إلى الخير والرحمة.'),
      t('Parental righteousness preserves children across generations.', 'La piété des parents protège les enfants au fil des générations.', 'صلاح الآباء يحفظ الأبناء ويرعاهم ببركة الله.'),
    ],
  },
  {
    id: 'dhul_qarnayn',
    name: t('Dhul-Qarnayn (The Two-Horned King)', 'Dhul-Qarnayn (Le Souverain aux deux cornes)', 'ذو القرنين'),
    title: t('The Just Monotheist Emperor & Builder of the Iron Wall', 'L’Empereur monothéiste équitable et bâtisseur du rempart de fer', 'الملك الصالح العادل وباني سد يأجوج ومأجوج'),
    category: 'sages_and_rulers',
    quranRefs: ['18:83-98'],
    era: t('Ancient Antiquity / Global Expeditions', 'Haute Antiquité / Expéditions mondiales', 'القرون القديمة / مشارق الأرض ومغاربها'),
    keyVirtue: t('Just Governance, Engineering Excellence & Incorruptible Public Duty', 'Gouvernance juste, génie d’ingénierie et refus de corruption', 'العدل والتمكين واستخدام القوة في إعانة الضعفاء بلا مقابل'),
    summary: t(
      'A great and righteous monarch endowed with immense power and knowledge, who marched east and west establishing justice, and forged the legendary iron-and-copper rampart against Gog and Magog.',
      'Un illustre souverain guidé par la foi, voyageant d’est en ouest pour punir les oppresseurs et protégeant les faibles en érigeant une muraille de fer contre Gog et Magog.',
      'ملك صالح آتاه الله الأسباب والتمكين في الأرض، سار إلى مغرب الشمس ومشرقها ناشراً للعدل، وبلغ بين السدين فأعان قوماً ضعفاء وصنع لهم ردماً عظيماً من زبر الحديد والنحاس المذاب حماية من يأجوج ومأجوج دون أن يطلب منهم أجراً.'
    ),
    story: t(
      'Endowed by Allah with command over material resources, Dhul-Qarnayn traveled to the setting sun, where he governed with equity—punishing the wicked and honoring the righteous. Reaching the eastern frontiers and later the mountain pass between two cliffs, he found a defenseless people terrorized by the ravages of Gog and Magog (Ya’juj wa-Ma’juj). Refusing their monetary tribute, he rallied their collective labor, forging massive blocks of iron and pouring molten copper over them, declaring: "This is a mercy from my Lord."',
      'Bénéficiant de moyens matériels et militaires considérables, Dhul-Qarnayn sillonna la terre, imposant la justice aux confins du couchant et du levant. Arrivé entre deux montagnes où des peuples vivaient sous la terreur des hordes de Gog et Magog, il refusa tout paiement et érigea avec eux une colossale digue de blocs de fer soudés au cuivre fondu, proclamant : « Ceci est une miséricorde de mon Seigneur. »',
      'طاف الأرض فاتحاً عادلاً، فلما استنصره المستضعفون بين السدين وبذلوا له خراجاً، عَفّ عن أموالهم وقال: ﴿مَا مَكَّنِّي فِيهِ رَبِّي خَيْرٌ فَأَعِينُونِي بِقُوَّةٍ﴾، فأمرهم برص أطنان زبر الحديد ثم نفخوا فيها حتى صارت ناراً، وأفرغ عليها القطر (النحاس المذاب) فصار سداً أملس منيعاً عجزت عنه أمم الفساد، ورد الفضل لله قائلاً: ﴿هَٰذَا رَحْمَةٌ مِّن رَّبِّي﴾.'
    ),
    lessons: [
      t('Power and technology must be consecrated to protecting the vulnerable without extortion.', 'Le pouvoir et la technologie doivent servir à défendre les opprimés sans exaction financière.', 'تسخير القوة والعلم لحماية الضعفاء لوجه الله شكر للنعمة.'),
      t('Public leadership is an ethical trust that refuses bribes and personal enrichment.', 'La responsabilité publique est un dépôt moral qui rejette pots-de-vin et profits égoïstes.', 'الحاكم العادل يترفع عن أخذ أموال الرعية في سبيل أداء واجبه.'),
    ],
  },
  {
    id: 'talut',
    name: t('Talut (King Saul)', 'Talout (Le Roi Saül)', 'طالوت (الملك الصالح)'),
    title: t('The Anointed Commander of Knowledge and Physique', 'Le Commandant élu pour son savoir et sa vigueur', 'الملك المصطفى بعلمه وبسطة جسمه'),
    category: 'sages_and_rulers',
    quranRefs: ['2:246-249'],
    era: t('c. 1020 BCE / Levant', 'Env. 1020 av. J.-C. / Levant', 'القرن الحادي عشر قبل الميلاد / أرض فلسطين'),
    keyVirtue: t('Military Discipline, Spiritual Reliance & Pure Sincerity', 'Discipline de foi et triomphe des minorités sincères', 'الانضباط واليقين بأن النصر من عند الله لا بكثرة العدد'),
    summary: t(
      'Chosen by Allah over wealthy claimants to lead the Israelites against Goliath (Jalut), testing his troops at the river and prevailing with a small, steadfast minority.',
      'Désigné par Dieu pour mener les Enfants d’Israël contre Goliath, éprouvant son armée au fleuve et triomphant avec une petite troupe inébranlable.',
      'ملَك اصطفاه الله على بني إسرائيل وزاده بسطة في العلم والجسم وحملت الملائكة تابوت عهده، اختبر جنوده بنهر الأردن فثبت معه الصفوة الصابرة الذين قالوا: كم من فئة قليلة غلبت فئة كثيرة بإذن الله.'
    ),
    story: t(
      'When the elders of Israel demanded a king to lead them into battle, their prophet appointed Talut. Though the wealthy questioned his lineage, the prophet affirmed: "Indeed, Allah has chosen him over you and increased him extensively in knowledge and stature." Mobilizing his army, Talut tested them at a desert river: only those who took no more than a single handful of water passed. With a faithful small minority facing Goliath’s armored hordes, they prayed: "Our Lord, pour upon us patience and plant our feet firmly," triumphing as Dawud felled the giant.',
      'Quand les notables réclamèrent un roi guerrier, le prophète désigna Talout, soulignant sa science et sa force physique. Avant le combat décisif contre Goliath, Talout éprouva la discipline de ses soldats en leur interdisant de boire à longs traits dans une rivière. Seule une infime fraction résista à la soif. Face à l’armée ennemie géante, cette élite s’écria : « Combien de fois une troupe peu nombreuse a-t-elle vaincu une troupe nombreuse par la permission d’Allah ! »',
      'اعترض أشراف بني إسرائيل على ملكه لفقره فقال نبيهم: ﴿إِنَّ اللَّهَ اصْطَفَاهُ عَلَيْكُمْ وَزَادَهُ بَسْطَةً فِي الْعِلْمِ وَالجِسْمِ﴾، وجاءت الملائكة بتابوت السكينة آية لملكه. واختبر جيشه بنهر الشريعة ففشل الأكثرون وشربوا منه، وثبتت قلة مؤمنة عبرت معه النهر واستعانت بالصبر حتى مكن الله للشاب داود من قتل جالوت.'
    ),
    lessons: [
      t('Leadership is measured by competence, knowledge, and character, not inherited wealth.', 'Le mérite de gouverner repose sur la compétence et la science, non sur la richesse.', 'معيار القيادة الأهلية والعلم والقوة، لا المال والجاه.'),
      t('Small disciplined groups of conviction regularly overcome numerically superior forces.', 'Une minorité spirituellement résolue triomphe des multitudes sans foi.', 'كم من فئة قليلة صابرة غلبت فئات كثيرة بعون الله وتوفيقه.'),
    ],
  },
  {
    id: 'ashab_al_kahf',
    name: t('The Companions of the Cave (Ashab al-Kahf)', 'Les Gens de la Caverne (Ashab al-Kahf)', 'أصحاب الكهف (الفتية المؤمنون)'),
    title: t('The Youthful Champions of Conscience & Resurrection', 'Les Jeunes héros de la conscience et du réveil divin', 'فتية الإيمان وأبطال التوحيد واليقين بالبعث'),
    category: 'believers_under_trials',
    quranRefs: ['18:9-26'],
    era: t('Late Antiquity / Ephesus / Levant', 'Antiquité tardive / Éphèse / Levant', 'القرون الميلادية الأولى / أرض الروم'),
    keyVirtue: t('Sacrificing Worldly Comforts for Integrity of Faith', 'Renoncement aux privilèges pour préserver l’intégrité spirituelle', 'الفرار بالدين من بطش الطواغيت والاعتصام بالكهف'),
    summary: t(
      'A band of noble aristocratic youths who fled imperial pagan tyranny to preserve their monotheistic faith, preserved asleep by Allah in a hidden cave for 309 lunar years alongside their dog.',
      'Un groupe de jeunes nobles qui fuirent les persécutions d’un empereur païen pour adorer le Dieu Unique, endormis miraculeusement dans une grotte pendant 309 années.',
      'فتية آمنوا بربهم وزادهم الله هدى، فروا بدينهم من طغيان ملك جبار معتزلين إلى كهف في الجبل، فضرب الله على آذانهم سنين عدداً، وقلّبهم ذات اليمين وذات الشمال وكلبهم باسط ذراعيه بالوصيد، فاستيقظوا بعد 309 سنوات حجة على البعث بعد الموت.'
    ),
    story: t(
      'Standing courageously in the imperial court, these young men affirmed: "Our Lord is the Lord of the heavens and the earth; never will we invoke besides Him any deity." Escaping into the mountain cave with their faithful dog, Allah caused a deep sleep to envelop them. The sun was commanded to turn aside from their cave at rising and setting, while angels turned their bodies right and left to preserve their flesh. Awakening centuries later in an empire transformed to monotheism, their miracle stands as an eternal witness that the Resurrection is absolute truth.',
      'Proclamant leur foi devant le tribunal païen, ces jeunes gens trouvèrent refuge dans une grotte isolée avec leur chien de garde. Allah les plongea dans un profond sommeil : le soleil modifiait sa course pour ne point brûler leur peau et leurs corps tournaient alternativement. À leur réveil plus de trois siècles après, ils découvrirent une société convertie, offrant la preuve irréfutable de la résurrection des corps.',
      'أعلنوا التوحيد الصادق في وجه الشرك: ﴿رَبُّنَا رَبُّ السَّمَاوَاتِ وَالْأَرْضِ لَن نَّدْعُوَ مِن دُونِهِ إِلَٰهًا﴾، وأووا إلى الكهف فنشر الله لهم من رحمته وهيأ لهم من أمرهم مرفقاً، وحفظهم 309 سنين قمرية تقلبهم أيدي العناية الإلهية، فلما بعثهم أرسلوا أحدهم بورقهم إلى المدينة فظهر أمرهم دليلاً قاطعاً على أن وعد الله حق وأن الساعة آتية لا ريب فيها.'
    ),
    lessons: [
      t('Youthful courage and integrity are capable of sparking historical transformations.', 'Le courage de la jeunesse et la clarté morale peuvent transformer l’histoire.', 'فتوة الإيمان وشجاعة الشباب قادرة على تغيير مجرى التاريخ.'),
      t('Bodily resurrection and divine preservation are effortless realities for the Creator.', 'La résurrection corporelle et la protection divine sont des vérités éclatantes.', 'البعث بعد الموت حق، وحفظ أولياء الله كائن بقدرته المطلقة.'),
    ],
  },
  {
    id: 'mumin_al_yasin',
    name: t('The Believer of Surah Ya-Sin (Habib al-Najjar)', 'Le Croyant de Sourate Ya-Sin (Habib al-Najjar)', 'مؤمن آل ياسين (حبيب النجار)'),
    title: t('The Martyr of Sincere Advice & Compassion', 'Le Martyr du conseil sincère et de la bienveillance', 'الرجل الصالح الساعي بالخير والشهيد الشفيق'),
    category: 'believers_under_trials',
    quranRefs: ['36:20-27'],
    era: t('1st Century CE / Antioch (Antakya)', 'Ier siècle / Antioche (Antakya)', 'القرن الأول الميلادي / أنطاكية'),
    keyVirtue: t('Courageous Public Witness & Loving Forgiveness even in Martyrdom', 'Témoignage public héroïque et pardon magnifique envers ses bourreaux', 'بذل النفس في نصح القوم والشفقة عليهم حتى بعد استشهاده'),
    summary: t(
      'The heroic citizen who sprinted from the far end of the city to defend three divine messengers from violence, martyred for his faith and entering Paradise while wishing his killers could understand his reward.',
      'Le citoyen généreux accourant du bout de la ville pour défendre les envoyés divins, lynché par la foule et entrant au Paradis en souhaitant le pardon et la guidée de ses meurtriers.',
      'رجل صالح جاء من أقصى المدينة يسعى لينقذ رسل الله وينصح قومه باتباعهم، فتكالبوا عليه وقتلوه، فبشره الله بالجنة فور موته فتمنى لو أن قومه يعلمون برحمة ربه ومغفرته ليؤمنوا.'
    ),
    story: t(
      'When the inhabitants of Antioch rejected and threatened three prophetic envoys, this humble carpenter ran from the furthest quarter of the city, pleading: "O my people, follow the messengers! Follow those who ask of you no payment and are rightly guided." Enraged by his public defense of Tawhid, the mob stoned him to death. At the moment of transition, angels welcomed him: "Enter Paradise!" Even as a martyr in bliss, his heart held no malice, exclaiming: "Ah, if only my people knew of how my Lord has forgiven me and placed me among the honored!"',
      'Quand les citadins menacèrent de lapider trois envoyés de Dieu, cet humble artisan traversa la métropole pour s’interposer : « Ô mon peuple, suivez les messagers ! Suivez ceux qui ne vous demandent aucun salaire et sont bien guidés. » Massacré par la foule haineuse, il entendit aussitôt l’appel divin : « Entre au Paradis ! » Ébloui par la gloire éternelle, il s’écria avec une compassion désarmante : « Si seulement mon peuple savait que mon Seigneur m’a pardonné et m’a comblé d’honneurs ! »',
      'جاء يسعى حاملاً همّ الحق، فقال لقومه: ﴿يَا قَوْمِ اتَّبِعُوا الْمُرْسَلِينَ * اتَّبِعُوا مَن لَّا يَسْأَلُكُمْ أَجْرًا وَهُم مُّهْتَدُونَ﴾، فوثب عليه القوم ورجموه بأرجلهم وحجارتهم حتى فاضت روحه، فقيل له ادخل الجنة، ففاض قلبه بالشفقة والنبل وقال: ﴿قَالَ يَا لَيْتَ قَوْمِي يَعْلَمُونَ * بِمَا غَفَرَ لِي رَبِّي وَجَعَلَنِي مِنَ الْمُكْرَمِينَ﴾.'
    ),
    lessons: [
      t('Sincere concern for humanity transcends hatred, even toward one’s persecutors.', 'La bienveillance sincère envers autrui transcende la haine, même face à la violence.', 'سلامة الصدر والحرص على هداية الناس شيمة الأولياء حتى عند الشهادة.'),
      t('A single individual taking action can leave an eternal light across generations.', 'L’engagement héroïque d’un seul homme éclaire les générations futures.', 'مبادرة الفرد الصادق وسعيه لنصرة الحق يخلدها الله في أقدس كتاب.'),
    ],
  },
  {
    id: 'mumin_al_firawn',
    name: t('The Believer of Pharaoh’s Family (Hizqil)', 'Le Croyant de la cour de Pharaon (Hizqil)', 'مؤمن آل فرعون (حزقيل)'),
    title: t('The Eloquent Statesman of Truth in Tyranny’s Citadel', 'L’homme d’État éloquent défendant la vérité au palais', 'صاحب الحجة البالغة وكاتم إيمانه في بلاط الملك'),
    category: 'believers_under_trials',
    quranRefs: ['40:28-44'],
    era: t('c. 1300 BCE / Nile Delta', 'Env. 1300 av. J.-C. / Delta du Nil', 'القرن الثالث عشر قبل الميلاد / عاصمة الفراعنة بمصر'),
    keyVirtue: t('Masterful Logical Persuasion, Moral Courage & Trust in Allah', 'Rhétorique brillante, bravoure intellectuelle et confiance absolue en Dieu', 'البلاغة والحكمة والجرأة في قول كلمة الحق عند سلطان جائر'),
    summary: t(
      'A royal kinsman of Pharaoh who concealed his faith until the death plot against Musa was hatched, rising in the grand assembly with immortal arguments to defend the prophet’s life.',
      'Un prince de la cour de Pharaon cachant sa foi, qui s’interposa avec une logique foudroyante lorsque Pharaon complota d’assassiner Moïse.',
      'رجل من أشراف قصر فرعون كان يكتم إيمانه، فلما رأى فرعون يجمع ملأه لقتل موسى صدع بالحق وقال: أتقتلون رجلاً أن يقول ربي الله؟ وساق لهم الحجج العقلية والتحذير من مصير الأمم السابقة حتى نجاه الله من مكرهم.'
    ),
    story: t(
      'When Pharaoh declared: "Let me kill Musa, and let him call upon his Lord!" this high-ranking courtier intervened with supreme rhetorical genius: "Would you kill a man merely because he says, ‘My Lord is Allah,’ when he has brought you clear proofs from your Lord? If he is lying, upon him is his lie; but if he is truthful, some of that which he threatens you will afflict you!" He recalled the devastating fates of ‘Ad, Thamud, and the people of Nuh, concluding: "I entrust my affair to Allah; indeed, Allah is watchful over His servants." Allah shielded him from their murderous plots.',
      'Tandis que Pharaon décrétait l’exécution de Moïse, ce dignitaire secret se leva avec une diplomatie et une force d’argumentation magistrales : « Allez-vous tuer un homme parce qu’il proclame ‘Mon Seigneur est Allah’, alors qu’il vous a apporté les preuves éclatantes de votre Seigneur ? » Il leur rappela la ruine des civilisations rebelles passées, concluant par un acte de remise totale à Dieu. Allah le protégea des complots d’assassinat.',
      'وقف هذا المؤمن الشجاع في مجلس فرعون حين عزم على اغتيال موسى، فجادلهم بحكمة سياسية ومنطق عقلي باهر: ﴿أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ وَقَدْ جَاءَكُم بِالْبَيِّنَاتِ مِن رَّبِّكُمْ﴾، وذكرهم بمصارع عاد وثمود وخوف زوال ملكهم، فلما تآمروا عليه فوّض أمره لله ﴿وَأُفَوِّضُ أَمْرِي إِلَى اللَّهِ إِنَّ اللَّهَ بَصِيرٌ بِالْعِبَادِ * فَوَقَاهُ اللَّهُ سَيِّئَاتِ مَا مَكَرُوا﴾.'
    ),
    lessons: [
      t('Speaking truth to oppressive power with articulated wisdom is among the highest deeds.', 'Parler avec sagesse et courage devant les despotes est l’acte le plus noble.', 'كلمة الحق عند سلطان جائر جهاد عظيم يستوجب نصرة الله وحفظه.'),
      t('Entrusting one’s life to Allah dismantles the conspiracies of tyrants.', 'Remettre son sort à Dieu pulvérise les machinations des oppresseurs.', 'تفويض الأمر لله أمن وأمان ووقاية من كل كيد ومكر.'),
    ],
  },
  {
    id: 'yusha_ibn_nun',
    name: t('Yusha‘ ibn Nun (Joshua)', 'Josué fils de Noun (Yusha‘)', 'يوشع بن نون عليه السلام'),
    title: t('The Faithful Companion & Conqueror of the Holy Land', 'Le fidèle disciple et conquérant de la Terre Sainte', 'فتى موسى وخليفته وفاتح الأرض المقدسة'),
    category: 'companions',
    quranRefs: ['5:23', '18:60'],
    era: t('c. 1250 BCE / Sinai & Canaan', 'Env. 1250 av. J.-C. / Sinaï et Canaan', 'القرن الثالث عشر قبل الميلاد / سيناء والقدس'),
    keyVirtue: t('Unwavering Strategic Faith & Halting the Sun by Divine Command', 'Courage stratégique inébranlable et prière miraculeuse arrêtant le soleil', 'اليقين بالفتح وحبس الشمس له بكرامة نبوية عظيمة'),
    summary: t(
      'The devoted youth who accompanied Musa to the junction of the seas, stood firmly when others refused to enter Canaan, and succeeded Musa to lead the faithful into the conquest of Jericho and the Holy Land.',
      'Le jeune assistant fidèle de Moïse lors de sa quête, qui l’exhorta à entrer vaillamment en Terre Sainte et dirigea plus tard la libération victorieuse de Jéricho.',
      'فتى موسى ورفيقه في رحلة مجمع البحرين، وأحد الرجلين اللذين قالا لقومهما ادخلوا عليهم الباب فإذا دخلتموه فإنكم غالبون، تولى قيادة بني إسرائيل بعد موسى ففتح الأرض المقدسة، وحُبست له الشمس حتى أتم الفتح.'
    ),
    story: t(
      'Yusha‘ served Musa with pure loyalty throughout the Exodus and the wandering wilderness. When the faint-hearted Israelites hesitated at the borders of the Holy Land, Yusha‘ and Caleb stepped forward, crying: "Enter upon them through the gate; for when you enter it, you will surely be victorious, and upon Allah rely if you are believers!" Following Musa and Harun’s deaths, Yusha‘ was commissioned as leader and prophet. In the decisive siege on a Friday evening, he prayed: "O Sun, you are commanded and I am commanded; O Allah, halt it for us!" The sun stood still in the sky until the conquest was finalized.',
      'Serviteur dévoué de Moïse dans le désert, Josué fut l’un des deux héros qui osèrent défier la lâcheté générale en s’écriant : « Entrez par la porte ! Dès que vous l’aurez franchie, vous serez vainqueurs ! » Succédant à Moïse, il mena les armées croyantes. Lors d’une bataille décisive à la veille du Sabbat, il pria le Créateur d’interrompre la course du soleil : l’astre s’immobilisa jusqu’à la victoire complète.',
      'رافق موسى صابراً متعلماً، وحين نكص بنو إسرائيل عن دخول الأرض المقدسة جبناً، كان يوشع وكالب الرجلين اللذين خافا الله فقالا: ﴿ادْخُلُوا عَلَيْهِمُ الْبَابَ فَإِذَا دَخَلْتُمُوهُ فَإِنَّكُمْ غَالِبُونَ وَعَلَى اللَّهِ فَتَوَكَّلُوا إِن كُنتُم مُّؤْمِنِينَ﴾، وتولى أمر النبوة بعد موسى فقاد الجيل الجديد، ودعا الله يوم الجمعة عند دنو الغروب: «إنكِ مأمورة وأنا مأمور، اللهم احبسها علينا»، فوقفت الشمس حتى فتح الله عليه بيت المقدس.'
    ),
    lessons: [
      t('Faithful discipleship under prophetic teachers produces legendary leadership.', 'La fidélité et le dévouement auprès des maîtres forgent les grands guides.', 'صحبة العلماء والأنبياء بوفاء تورث الحكمة والقيادة المباركة.'),
      t('When righteous purpose aligns with sincere prayer, nature itself yields by Allah’s command.', 'Quand la cause juste s’unit à la prière fervente, les lois de la nature fléchissent par la volonté divine.', 'إذا صدقت العزيمة وأخلص القائد حبس الله له الكون ونزل نصره المؤزر.'),
    ],
  },
]

export const QURANIC_STORIES: QuranStory[] = [
  {
    id: 'story_ashab_al_kahf',
    title: t('The Companions of the Cave', 'Les Gens de la Caverne', 'قصة أصحاب الكهف'),
    surahName: t('Surah Al-Kahf (18:9-26)', 'Sourate Al-Kahf (18:9-26)', 'سورة الكهف (18: 9-26)'),
    verses: ['18:9-26'],
    theme: 'faith_vs_tyranny',
    historicalSetting: t('Roman Empire / Ephesus / 3rd Century CE', 'Empire Romain / Éphèse / IIIe siècle', 'بلاد الروم / أفسس / القرون الميلادية الأولى'),
    summary: t(
      'Youths escaping religious persecution by a pagan emperor take refuge in a mountain cave, where Allah causes them to sleep for 309 years as a manifest proof of the Day of Resurrection.',
      'Des jeunes croyants fuyant un empereur païen s’endorment miraculeusement dans une grotte pendant 309 ans, illustrant la résurrection des âmes.',
      'فتية من أشراف الروم اعتزلوا الشرك وفروا بدينهم إلى غار في جبل، فناموا وحفظهم الله ثلاثمائة وتسع سنين، ليكونوا آية للناس في قدرة الله على إحياء الموتى.'
    ),
    coreLessons: [
      t('Fleeing with one’s faith from corrupt societies invites divine protection and expansion of mercy.', 'Fuir les environnements corrompus attire la grâce et la protection divine.', 'الاعتصام بالله والفرار بالدين يفتح أبواب الرحمة واللطف الإلهي.'),
      t('Time and matter are effortless instruments under the sovereign will of Allah.', 'Le temps et la matière obéissent docilement aux desseins du Créateur.', 'الزمان والأسباب خاضعة لأمر الله ومشيئته النافذة.'),
    ],
  },
  {
    id: 'story_ashab_al_fil',
    title: t('The Companions of the Elephant', 'Les Gens de l’Éléphant', 'قصة أصحاب الفيل'),
    surahName: t('Surah Al-Fil (105:1-5)', 'Sourate Al-Fil (105:1-5)', 'سورة الفيل (105: 1-5)'),
    verses: ['105:1-5'],
    theme: 'warnings_and_retribution',
    historicalSetting: t('Makkah Al-Mukarramah / Year of the Elephant (c. 570 CE)', 'La Mecque / Année de l’Éléphant (env. 570)', 'مكة المكرمة / عام الفيل (570 م)'),
    summary: t(
      'The Abyssinian viceroy Abrahah marched upon Makkah with a formidable war elephant to demolish the Ka‘bah, but Allah annihilated his legions through miraculous flocks of flying birds hurling stones of clay.',
      'Le gouverneur Abrahah marcha sur La Mecque avec un éléphant pour détruire la Ka‘bah ; Allah anéantit son armée par des nuées d’oiseaux lançant des pierres cuites.',
      'خرج أبرهة الحبشي بجيش جرار تتقدمه الفيلة لهدم الكعبة المشرفة وتحويل الحج لكنيسته، فرد الله كيده وأرسل عليهم طيراً أبابيل ترميهم بحجارة من سجيل فجعلهم كعصف مأكول.'
    ),
    coreLessons: [
      t('The Holy Sanctuary of Allah is protected by divine decree against imperial aggression.', 'Le Sanctuaire sacré de Dieu est inviolable face aux tyrannies du monde.', 'بيت الله الحرام محفوظ بحفظ الله ولن يغلبه جبار قط.'),
      t('Arrogant military might can be utterly decimated by the smallest of God’s airborne creatures.', 'La plus fière armée peut être anéantie par les plus humbles créatures divines.', 'أعتى جيوش الأرض تهزمها أصغر جنود الله من الطير والحجارة.'),
    ],
  },
  {
    id: 'story_ashab_al_ukhdud',
    title: t('The People of the Trench', 'Les Martyrs du Fossé', 'قصة أصحاب الأخدود'),
    surahName: t('Surah Al-Buruj (85:4-9)', 'Sourate Al-Bourouj (85:4-9)', 'سورة البروج (85: 4-9)'),
    verses: ['85:4-9'],
    theme: 'faith_vs_tyranny',
    historicalSetting: t('Najran (Southern Arabia) / 6th Century CE', 'Najran (Arabie du Sud) / VIe siècle', 'نجران (جنوب الجزيرة العربية) / عهد ذي نواس'),
    summary: t(
      'A monotheistic boy taught an entire city the truth of Allah; the enraged tyrant dug flaming trenches and cast believers alive into the fire, yet they chose the flames over apostasy.',
      'Un jeune croyant illumina sa cité de la foi ; le roi sanguinaire creusa des tranchées enflammées pour y brûler vifs les fidèles qui préférèrent le martyre au renoncement.',
      'آمن أهل نجران جميعاً ببركة صدق غلام مؤمن علّمهم التوحيد وضحى بنفسه، فغضب الملك الظالم وخدّ أخدوداً عظيماً من النار وألقى فيه المؤمنين والمؤمنات، فثبتوا على دينهم ونالوا الفوز الكبير.'
    ),
    coreLessons: [
      t('Ultimate spiritual victory belongs to those who maintain faith, even when outwardly martyred.', 'La victoire suprême appartient à la fidélité de l’âme, même au cœur du martyre.', 'الفوز الكبير في ثبات المبدأ والإيمان ولو أُحرقت الأجساد.'),
      t('Tyrants who burn believers face the inescapable torment of Hellfire.', 'Les tyrans tortionnaires s’exposent au châtiment inéluctable de la Géhenne.', 'ظلم الطواغيت للشهداء له حساب عسير وعذاب الحريق في الآخرة.'),
    ],
  },
  {
    id: 'story_qarun',
    title: t('Qarun (Korah) and His Buried Treasures', 'Qaroun (Coré) et ses Trésors engloutis', 'قصة قارون وخسف الأرض بكنوزه'),
    surahName: t('Surah Al-Qasas (28:76-82)', 'Sourate Al-Qasas (28:76-82)', 'سورة القصص (28: 76-82)'),
    verses: ['28:76-82'],
    theme: 'warnings_and_retribution',
    historicalSetting: t('Ancient Egypt / Nile Valley / Mosaic Era', 'Égypte Antique / Vallée du Nil / Époque de Moïse', 'مصر القديمة / عهد خروج بني إسرائيل مع موسى'),
    summary: t(
      'An Israelite noble bestowed with unimaginable wealth whose keys alone burdened a troop of strong men; when he boasted that his wealth was earned solely by his intellect, the earth opened and swallowed him and his palace.',
      'Un noble comblé de trésors dont les clés pesaient sur dix hommes forts ; prétendant devoir sa fortune à son seul génie, la terre s’ouvrit et l’engloutit avec son palais.',
      'رجل من قوم موسى آتاه الله من الكنوز ما إن مفاتحه لتنوء بالعصبة أولي القوة، فبغى وطغى وقال إنما أوتيته على علم عندي، فخسف الله به وبداره الأرض فما كان له من فئة ينصرونه.'
    ),
    coreLessons: [
      t('Wealth is an entrusted blessing from Allah, not a validation of self-righteous entitlement.', 'La richesse est un dépôt divin, jamais la preuve d’un mérite arrogant.', 'المال مال الله يُستعان به على الدار الآخرة ولا يُفخر به بطراً.'),
      t('Arrogant hoarders of gold are vulnerable to catastrophic divine disposal in seconds.', 'L’orgueil matériel s’effondre en un éclair sous les décrets divins.', 'الكبر والغرور بالمال عاقبته الخسف والهلاك ولا يغني عن صاحبه شيئاً.'),
    ],
  },
  {
    id: 'story_bilqis_sulayman',
    title: t('The Queen of Sheba (Bilqis) & Solomon', 'La Reine de Saba (Bilqis) et Salomon', 'قصة بلقيس ملكة سبأ مع سليمان'),
    surahName: t('Surah An-Naml (27:20-44)', 'Sourate An-Naml (27:20-44)', 'سورة النمل (27: 20-44)'),
    verses: ['27:20-44'],
    theme: 'wisdom_and_counsel',
    historicalSetting: t('Jerusalem & Marib (Yemen) / 10th Century BCE', 'Jérusalem et Marib (Yémen) / Xe siècle av. J.-C.', 'بيت المقدس ومملكة سبأ باليمن / القرن العاشر قبل الميلاد'),
    summary: t(
      'A wise queen who worshiped the sun receives a letter from Prophet Sulayman; visiting his crystal palace and witnessing the transportation of her throne, she submits her heart to the Lord of the worlds.',
      'Une souveraine idolâtre d’Arabie du Sud visite le palais de cristal de Salomon et embrasse la foi monothéiste devant la splendeur des signes divins.',
      'ملكة حكيمة كانت تعبد وقومها الشمس من دون الله، أرسل إليها سليمان كتاباً يدعوها للإسلام، فقدمت بيت المقدس وشاهدت إحضار عرشها بطرفة عين ودخلت الصرح الممرّد من قوارير فأسلمت مع سليمان لله رب العالمين.'
    ),
    coreLessons: [
      t('Intellectual wisdom and consultative deliberation lead seekers of truth to monotheism.', 'La sagesse d’esprit et la concertation conduisent les cœurs lucides au Monothéisme.', 'شورى الحكام ورجاحة العقل تقود أصحابها إلى الإذعان للحق.'),
      t('True splendor in technology and architecture is consecrated to glorifying the Creator.', 'La splendeur architecturale n’a de valeur que tournée vers la louange de Dieu.', 'عظمة الملك والصروح المعمارية تسخير لبيان قدرة الله وهداية العباد.'),
    ],
  },
  {
    id: 'story_ashab_al_jannah',
    title: t('The Entitled Owners of the Burned Garden', 'Les Propriétaires du Jardin calciné', 'قصة أصحاب الجنة (سورة القلم)'),
    surahName: t('Surah Al-Qalam (68:17-33)', 'Sourate Al-Qalam (68:17-33)', 'سورة القلم (68: 17-33)'),
    verses: ['68:17-33'],
    theme: 'warnings_and_retribution',
    historicalSetting: t('Yemen / Near Sana‘a (Dharwan)', 'Yémen / Environs de Sanaa (Dharwan)', 'اليمن / قرية ضروان قرب صنعاء'),
    summary: t(
      'Heirs to a lush orchard swore to harvest all fruit at dawn to deprive the poor of their rightful charity; while they slept, a celestial tempest consumed the orchard, leaving it black ashes.',
      'Des héritiers cupides jurèrent de cueillir leurs fruits à l’aube pour priver les indigents ; pendant leur sommeil, un feu céleste réduisit le verger en cendres.',
      'أبناء ورثوا بستاناً عظيماً من والدهم الصالح الذي كان يتصدق منه، فأجمعوا أمرهم على جذاذه مصبحين ومنع الفقراء والمساكين، فطاف عليها طائف من ربك وهم نائمون فأصبحت كالصريم.'
    ),
    coreLessons: [
      t('Denying the rightful share of orphans and the destitute invites devastating ruin.', 'Priver les nécessiteux de leur part légitime détruit les richesses.', 'منع حق الفقراء والزكاة سبب لمحاق البركة ونزول البلاء.'),
      t('Immediate repentance upon witnessing loss opens the door of divine restitution.', 'Le repentir sincère après la faute permet d’espérer la grâce réparatrice.', 'الرجوع إلى الله والاعتراف بالظلم سبيل التعويض والخير في الآخرة.'),
    ],
  },
  {
    id: 'story_ashab_al_sabt',
    title: t('The Sabbath-Breakers of the Seashore', 'Les Transgresseurs du Sabbat', 'قصة أصحاب السبت'),
    surahName: t('Surah Al-A‘raf (7:163-166)', 'Sourate Al-A‘raf (7:163-166)', 'سورة الأعراف (7: 163-166)'),
    verses: ['7:163-166'],
    theme: 'covenants',
    historicalSetting: t('Red Sea Coast / Aylah (Gulf of Aqaba)', 'Côte de la mer Rouge / Aylah (Golfe d’Aqaba)', 'ساحل البحر الأحمر / قرية أيلة على خليج العقبة'),
    summary: t(
      'Coastal fishermen forbidden from fishing on Saturdays were tested by swarming fish on the Sabbath; they devised deceitful canal traps, leading to divine retribution upon the transgressors while righteous denouncers were saved.',
      'Des pêcheurs mis à l’épreuve par des bancs de poissons le samedi contournèrent le tabou par ruse ; les transgresseurs furent punis tandis que ceux qui avertissaient furent épargnés.',
      'أهل قرية ساحلية من بني إسرائيل حُرّم عليهم الصيد يوم السبت، فابتلاهم الله بحيتان تشرع على الماء سبتاً وتغيب غيره، فنصبوا الشباك يوم الجمعة وأخذوها يوم الأحد احتيالاً، فأنجى الله الذين ينهون عن السوء وأخذ الظالمين بعذاب بئيس.'
    ),
    coreLessons: [
      t('Legalistic ruses to bypass divine prohibitions are an affront to the All-Seeing Creator.', 'Les ruses hypocrites pour contourner les lois divines outragent le Créateur omniscient.', 'التحايل على محارم الله خِداع لله وهو مطلع على السرائر.'),
      t('Actively forbidding wrongdoing is mandatory; silence when injustice reigns leads to shared peril.', 'Exhorter au bien est un devoir sacré qui sauve de la punition collective.', 'الأمر بالمعروف والنهي عن المنكر صمام أمان الأمة وسبيل النجاة.'),
    ],
  },
]
