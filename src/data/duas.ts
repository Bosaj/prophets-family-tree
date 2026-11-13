// Supplications of the Prophet ﷺ at moments of his life.
// Every Arabic text is copied from the hadith it cites, with that edition's vowels, and checked by
// `npm run verify:duas` (scripts/verify-duas.mjs). Qur'an verses are never typed here: they are listed in
// `verse` and loaded from the Mushaf when read.
import type { L4, Level, Ref } from './types'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

export interface Supplication {
  id: string
  /** The words, as in the first hadith of `r`. */
  ar: string
  /** Meaning in the reader's language; in Arabic, a short explanation. */
  meaning: L4
  r: Ref[]
  l: Level
  /** Grade, for collections other than al-Bukhari and Muslim. */
  grade?: L4
  /** Times to say it, when the hadith gives a number. */
  count?: number
  /** A Qur'an passage that belongs to this moment, read from the Mushaf. */
  verse?: Ref
  /**
   * Exact fragments of the source, when the shown text joins two narrations of the same hadith.
   * The checker looks for these instead of `ar`.
   */
  src?: string[]
}

export type LifeEra = 'makkah' | 'hijra' | 'madinah' | 'final'

export interface LifeMoment {
  id: string
  era: LifeEra
  when: L4
  title: L4
  story: L4
  duas: Supplication[]
}

export const LIFE_ERAS: { id: LifeEra; label: L4 }[] = [
  { id: 'makkah', label: t('Makkah', 'La Mecque', 'مكة', 'La Meca') },
  { id: 'hijra', label: t('The Hijra', 'L’Hégire', 'الهجرة', 'La Hégira') },
  { id: 'madinah', label: t('Madinah', 'Médine', 'المدينة', 'Medina') },
  { id: 'final', label: t('The last year', 'La dernière année', 'العام الأخير', 'El último año') },
]

const SAHIH_ALBANI = t('Sahih (al-Albani)', 'Sahih (al-Albani)', 'صحيح (الألباني)', 'Sahih (al-Albani)')
const HASAN_ALBANI = t('Hasan (al-Albani)', 'Hasan (al-Albani)', 'حسن (الألباني)', 'Hasan (al-Albani)')

export const LIFE_MOMENTS: LifeMoment[] = [
  {
    id: 'umar',
    era: 'makkah',
    when: t('Makkah, the early years of the call', 'La Mecque, les premières années', 'مكة، السنوات الأولى من الدعوة', 'La Meca, los primeros años'),
    title: t('Asking for a strong man for Islam', 'Demander un homme fort pour l’islam', 'دعاؤه أن يعزّ الله الإسلام', 'Pedir un hombre fuerte para el islam'),
    story: t(
      'The Muslims of Makkah were few and mocked. He asked Allah to strengthen Islam through one of two of its fiercest opponents. ‘Umar ibn al-Khattab became Muslim, and Ibn Mas‘ud later said: “We have been strong ever since ‘Umar became Muslim” (Bukhari 3684).',
      'Les musulmans de La Mecque étaient peu nombreux et raillés. Il demanda à Allah de fortifier l’islam par l’un de ses deux plus farouches adversaires. ‘Umar ibn al-Khattab se convertit, et Ibn Mas‘ud dira : « Nous sommes restés forts depuis que ‘Umar est devenu musulman » (Bukhari 3684).',
      'كان المسلمون بمكة قلّة مستضعفين، فدعا الله أن يعزّ الإسلام بأحد رجلين من أشد خصومه، فأسلم عمر بن الخطاب. قال ابن مسعود: «ما زلنا أعزّة منذ أسلم عمر» (البخاري 3684).',
      'Los musulmanes de La Meca eran pocos y objeto de burla. Pidió a Allah que fortaleciera el islam con uno de sus dos adversarios más duros. ‘Umar ibn al-Jattab se hizo musulmán, e Ibn Mas‘ud diría: «Hemos sido fuertes desde que ‘Umar se hizo musulmán» (Bujari 3684).',
    ),
    duas: [
      {
        id: 'umar-1',
        ar: 'اللَّهُمَّ أَعِزَّ الإِسْلاَمَ بِأَحَبِّ هَذَيْنِ الرَّجُلَيْنِ إِلَيْكَ بِأَبِي جَهْلٍ أَوْ بِعُمَرَ بْنِ الْخَطَّابِ',
        meaning: t(
          'O Allah, strengthen Islam with whichever of these two men is dearer to You: Abu Jahl or ‘Umar ibn al-Khattab.',
          'Ô Allah, fortifie l’islam par celui de ces deux hommes que Tu aimes le plus : Abu Jahl ou ‘Umar ibn al-Khattab.',
          'دعا أن يعزّ الله الإسلام بأحبّ الرجلين إليه، فكان عمر.',
          'Oh Allah, fortalece el islam con el que más ames de estos dos hombres: Abu Yahl o ‘Umar ibn al-Jattab.',
        ),
        r: ['tirmidhi:3681', 'bukhari:3684'],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
    ],
  },
  {
    id: 'taif',
    era: 'makkah',
    when: t('Ta’if, about three years before the Hijra', 'Ta’if, environ trois ans avant l’Hégire', 'الطائف، قبل الهجرة بنحو ثلاث سنين', 'Ta’if, unos tres años antes de la Hégira'),
    title: t('Mercy for the people who hurt him', 'Miséricorde pour ceux qui l’ont blessé', 'الرحمة بمن آذاه', 'Misericordia para quienes lo hirieron'),
    story: t(
      'He went to the chiefs of Ta’if to call them to Allah, and they turned him away. He walked off in grief, and came to himself only at Qarn al-Tha‘alib. Jibril brought the angel of the mountains, who offered to crush the town between its two mountains. He refused, and said:',
      'Il alla appeler les chefs de Ta’if à Allah, et ils le repoussèrent. Il s’éloigna accablé et ne reprit ses esprits qu’à Qarn ath-Tha‘alib. Jibril lui amena l’ange des montagnes, qui offrit d’écraser la ville entre ses deux montagnes. Il refusa et dit :',
      'دعا سادة الطائف إلى الله فردّوه، فانطلق مهمومًا فلم يستفق إلا بقرن الثعالب. فجاءه جبريل ومعه ملك الجبال يعرض عليه أن يُطبق عليهم الأخشبين، فأبى وقال:',
      'Fue a llamar a los jefes de Ta’if a Allah y lo rechazaron. Se alejó abatido y solo volvió en sí en Qarn al-Za‘alib. Yibril le trajo al ángel de las montañas, que le ofreció aplastar la ciudad entre sus dos montañas. Se negó y dijo:',
    ),
    duas: [
      {
        id: 'taif-1',
        ar: 'بَلْ أَرْجُو أَنْ يُخْرِجَ اللَّهُ مِنْ أَصْلاَبِهِمْ مَنْ يَعْبُدُ اللَّهَ وَحْدَهُ لاَ يُشْرِكُ بِهِ شَيْئًا',
        meaning: t(
          'No. I hope that Allah will bring from their descendants people who worship Allah alone and associate nothing with Him.',
          'Non. J’espère qu’Allah fera sortir de leur descendance des gens qui adoreront Allah seul, sans rien Lui associer.',
          'بل يرجو أن يُخرج الله من ذريتهم من يوحّده، فاختار الصبر والرجاء على الانتقام.',
          'No. Espero que Allah saque de su descendencia a gente que adore solo a Allah sin asociarle nada.',
        ),
        r: ['bukhari:3231'],
        l: 'hadith',
      },
      {
        id: 'taif-2',
        ar: 'اللَّهُمَّ إِلَيْكَ أَشْكُو ضَعْفَ قُوَّتِي، وَقِلَّةَ حِيلَتِي، وَهَوَانِي عَلَى النَّاسِ، يَا أَرْحَمَ الرَّاحِمِينَ، أَنْتَ رَبُّ الْمُسْتَضْعَفِينَ وَأَنْتَ رَبِّي، إِلَى مَنْ تَكِلُنِي؟ إِلَى بَعِيدٍ يَتَجَهَّمُنِي، أَمْ إِلَى عَدُوٍّ مَلَّكْتَهُ أَمْرِي؟ إِنْ لَمْ يَكُنْ بِكَ عَلَيَّ غَضَبٌ فَلَا أُبَالِي، وَلَكِنَّ عَافِيَتَكَ هِيَ أَوْسَعُ لِي، أَعُوذُ بِنُورِ وَجْهِكَ الَّذِي أَشْرَقَتْ لَهُ الظُّلُمَاتُ، وَصَلُحَ عَلَيْهِ أَمْرُ الدُّنْيَا وَالْآخِرَةِ، مِنْ أَنْ تُنْزِلَ بِي غَضَبَكَ، أَوْ يَحِلَّ عَلَيَّ سُخْطُكَ، لَكَ الْعُتْبَى حَتَّى تَرْضَى، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِكَ',
        meaning: t(
          'O Allah, to You I complain of my weakness, my lack of means and my lowliness before people. O Most Merciful of the merciful, You are the Lord of the oppressed, and You are my Lord. To whom do You entrust me? To a stranger who frowns at me, or to an enemy You have given power over me? If You are not angry with me, I do not care; yet Your well-being is wider for me. I seek refuge in the light of Your Face, by which the darkness is lit and the affairs of this world and the next are set right, from Your anger falling on me or Your displeasure descending on me. To You belongs reproach until You are pleased, and there is no power and no strength except through You. This well-known supplication comes from the sira of Ibn Ishaq. Its chain is weak: al-Albani (al-Silsila al-Da‘ifa 2933) and the Permanent Committee graded it weak.',
          'Ô Allah, c’est à Toi que je me plains de ma faiblesse, de mon manque de moyens et de mon peu de valeur aux yeux des gens. Ô le plus Miséricordieux des miséricordieux, Tu es le Seigneur des opprimés, et Tu es mon Seigneur. À qui me confies-Tu ? À un étranger qui me fait grise mine, ou à un ennemi à qui Tu as donné pouvoir sur moi ? Si Tu n’es pas en colère contre moi, peu m’importe ; mais Ta protection m’est plus large. Je cherche refuge dans la lumière de Ta Face, par laquelle les ténèbres s’illuminent et les affaires de ce monde et de l’au-delà sont réglées, contre Ta colère qui tomberait sur moi ou Ton mécontentement qui descendrait sur moi. À Toi de me reprendre jusqu’à ce que Tu sois satisfait, et il n’y a de force ni de puissance qu’en Toi. Cette invocation célèbre vient de la sira d’Ibn Ishaq. Sa chaîne est faible : al-Albani (al-Silsila ad-Da‘ifa 2933) et le Comité permanent l’ont jugée faible.',
          'دعاء مشهور في سيرة ابن إسحاق، وإسناده ضعيف: ضعّفه الألباني في السلسلة الضعيفة (2933) واللجنة الدائمة.',
          'Oh Allah, a Ti me quejo de mi debilidad, de mi falta de recursos y de mi poco valor ante la gente. Oh el más Misericordioso de los misericordiosos, Tú eres el Señor de los oprimidos, y Tú eres mi Señor. ¿A quién me confías? ¿A un extraño que me mira con desagrado, o a un enemigo al que has dado poder sobre mí? Si no estás enojado conmigo, no me importa; pero Tu bienestar es más amplio para mí. Me refugio en la luz de Tu Rostro, por la que se iluminan las tinieblas y se ordenan los asuntos de este mundo y del otro, de que Tu ira caiga sobre mí o Tu enojo descienda sobre mí. A Ti el reproche hasta que estés satisfecho, y no hay fuerza ni poder sino en Ti. Esta súplica célebre viene de la sira de Ibn Ishaq. Su cadena es débil: al-Albani (al-Silsila ad-Da‘ifa 2933) y el Comité Permanente la consideraron débil.',
        ),
        r: ['book:sira'],
        l: 'disputed',
        grade: t('Weak chain', 'Chaîne faible', 'إسناده ضعيف', 'Cadena débil'),
      },
    ],
  },
  {
    id: 'cave',
    era: 'hijra',
    when: t('The cave of Thawr, 1 AH / 622 CE', 'La grotte de Thawr, 1 H / 622', 'غار ثور، سنة 1 هـ / 622 م', 'La cueva de Zawr, 1 H / 622'),
    title: t('Two in the cave, and Allah the third', 'Deux dans la grotte, et Allah le troisième', 'اثنان في الغار والله ثالثهما', 'Dos en la cueva, y Allah el tercero'),
    story: t(
      'On the Hijra, he hid in the cave of Thawr with Abu Bakr while the Quraysh searched for them. Abu Bakr said: “If one of them looked down at his feet, he would see us.” He answered:',
      'Pendant l’Hégire, il se cacha dans la grotte de Thawr avec Abu Bakr pendant que Quraysh les cherchait. Abu Bakr dit : « Si l’un d’eux regardait sous ses pieds, il nous verrait. » Il répondit :',
      'في الهجرة اختبأ مع أبي بكر في غار ثور وقريش تطلبهما، فقال أبو بكر: لو أن أحدهم نظر تحت قدميه لأبصرنا، فقال:',
      'Durante la Hégira se escondió con Abu Bakr en la cueva de Zawr mientras Quraysh los buscaba. Abu Bakr dijo: «Si uno de ellos mirara bajo sus pies, nos vería». Él respondió:',
    ),
    duas: [
      {
        id: 'cave-1',
        ar: 'مَا ظَنُّكَ يَا أَبَا بَكْرٍ بِاثْنَيْنِ اللَّهُ ثَالِثُهُمَا',
        meaning: t(
          'What do you think, Abu Bakr, of two whose third is Allah?',
          'Que penses-tu, Abu Bakr, de deux dont Allah est le troisième ?',
          'طمأن صاحبه بأن الله معهما.',
          '¿Qué piensas, Abu Bakr, de dos cuyo tercero es Allah?',
        ),
        r: ['bukhari:3653'],
        l: 'hadith',
        verse: '9:40',
      },
    ],
  },
  {
    id: 'mosque',
    era: 'madinah',
    when: t('Madinah, 1 AH', 'Médine, 1 H', 'المدينة، سنة 1 هـ', 'Medina, 1 H'),
    title: t('Building the mosque with his own hands', 'Bâtir la mosquée de ses mains', 'بناء المسجد بيديه', 'Construir la mezquita con sus manos'),
    story: t(
      'When he reached Madinah, he carried the mud bricks of his mosque with his companions, and said while working:',
      'Arrivé à Médine, il porta les briques de sa mosquée avec ses compagnons, et disait en travaillant :',
      'لما قدم المدينة كان ينقل اللبِن مع أصحابه لبناء مسجده، ويقول:',
      'Al llegar a Medina, cargó los ladrillos de su mezquita con sus compañeros y decía mientras trabajaba:',
    ),
    duas: [
      {
        id: 'mosque-1',
        ar: 'اللَّهُمَّ لاَ خَيْرَ إِلاَّ خَيْرُ الآخِرَهْ فَاغْفِرْ لِلأَنْصَارِ وَالْمُهَاجِرَهْ',
        meaning: t(
          'O Allah, there is no good except the good of the Hereafter, so forgive the Ansar and the Muhajirun.',
          'Ô Allah, il n’est de bien que le bien de l’au-delà : pardonne aux Ansar et aux Muhajirun.',
          'لا خير يبقى إلا خير الآخرة، فاغفر للأنصار والمهاجرين.',
          'Oh Allah, no hay bien sino el bien de la otra vida: perdona a los Ansar y a los Muhayirun.',
        ),
        r: ['bukhari:428'],
        l: 'hadith',
      },
      {
        id: 'mosque-2',
        ar: 'اللَّهُمَّ اجْعَلْ بِالْمَدِينَةِ ضِعْفَىْ مَا جَعَلْتَ بِمَكَّةَ مِنَ الْبَرَكَةِ',
        meaning: t(
          'O Allah, put in Madinah twice the blessing You put in Makkah.',
          'Ô Allah, mets à Médine le double de la bénédiction que Tu as mise à La Mecque.',
          'دعا للمدينة بضعفي بركة مكة.',
          'Oh Allah, pon en Medina el doble de la bendición que pusiste en La Meca.',
        ),
        r: ['bukhari:1885'],
        l: 'hadith',
      },
    ],
  },
  {
    id: 'badr',
    era: 'madinah',
    when: t('Badr, 17 Ramadan 2 AH / 624 CE', 'Badr, 17 ramadan 2 H / 624', 'بدر، 17 رمضان 2 هـ / 624 م', 'Badr, 17 de ramadán de 2 H / 624'),
    title: t('The night before Badr', 'Avant la bataille de Badr', 'ليلة بدر', 'Antes de Badr'),
    story: t(
      'He looked at the idolaters, about a thousand, and at his companions, three hundred and nineteen. He faced the qibla, raised his hands and kept calling on his Lord until his cloak fell from his shoulders. Abu Bakr put it back and said: “That is enough, Messenger of Allah; He will fulfil what He promised you.”',
      'Il regarda les polythéistes, environ mille, et ses compagnons, trois cent dix-neuf. Il se tourna vers la qibla, leva les mains et ne cessa d’implorer son Seigneur jusqu’à ce que son manteau tombe de ses épaules. Abu Bakr le remit et dit : « Cela suffit, Messager d’Allah : Il tiendra ce qu’Il t’a promis. »',
      'نظر إلى المشركين وهم ألف، وأصحابه ثلاثمائة وتسعة عشر، فاستقبل القبلة ومدّ يديه يهتف بربه حتى سقط رداؤه عن منكبيه، فردّه أبو بكر وقال: كفاك مناشدتك ربك فإنه سينجز لك ما وعدك.',
      'Miró a los idólatras, unos mil, y a sus compañeros, trescientos diecinueve. Se volvió hacia la alquibla, alzó las manos y no dejó de invocar a su Señor hasta que el manto le cayó de los hombros. Abu Bakr se lo devolvió y dijo: «Basta, Mensajero de Allah: Él cumplirá lo que te prometió».',
    ),
    duas: [
      {
        id: 'badr-1',
        ar: 'اللَّهُمَّ أَنْجِزْ لِي مَا وَعَدْتَنِي، اللَّهُمَّ آتِ مَا وَعَدْتَنِي، اللَّهُمَّ إِنْ تَهْلِكْ هَذِهِ الْعِصَابَةُ مِنْ أَهْلِ الإِسْلاَمِ لاَ تُعْبَدْ فِي الأَرْضِ',
        meaning: t(
          'O Allah, fulfil for me what You promised me. O Allah, give what You promised me. O Allah, if this band of the people of Islam perishes, You will not be worshipped on earth.',
          'Ô Allah, accomplis pour moi ce que Tu m’as promis. Ô Allah, donne ce que Tu m’as promis. Ô Allah, si cette troupe des gens de l’islam périt, Tu ne seras plus adoré sur terre.',
          'ناشد ربه وعده بالنصر، فإن هلكت هذه الفئة المؤمنة لم يبق من يعبد الله في الأرض.',
          'Oh Allah, cumple lo que me prometiste. Oh Allah, da lo que me prometiste. Oh Allah, si este grupo de la gente del islam perece, no serás adorado en la tierra.',
        ),
        r: ['muslim:1763'],
        l: 'hadith',
        verse: '8:9',
      },
    ],
  },
  {
    id: 'khandaq',
    era: 'madinah',
    when: t('The Trench, 5 AH / 627 CE', 'La Tranchée, 5 H / 627', 'الخندق، سنة 5 هـ / 627 م', 'La Trinchera, 5 H / 627'),
    title: t('Digging in the cold, then facing the Confederates', 'Creuser dans le froid, puis faire face aux Coalisés', 'حفر الخندق ثم لقاء الأحزاب', 'Cavar en el frío y luego enfrentar a los Coligados'),
    story: t(
      'An army of the tribes marched on Madinah. On cold mornings, hungry, the Muslims dug a trench around the city, and he dug with them, saying the first words below. When the Confederates laid siege, he prayed against them with the second.',
      'Une armée de tribus marcha sur Médine. Par des matins froids, affamés, les musulmans creusèrent une tranchée autour de la ville, et il creusait avec eux en disant les premières paroles ci-dessous. Quand les Coalisés assiégèrent la ville, il invoqua contre eux par la seconde.',
      'زحفت الأحزاب على المدينة، فحفر المسلمون الخندق في غداة باردة وهم جياع، وكان يحفر معهم ويقول الدعاء الأول، فلما حاصرتهم الأحزاب دعا عليهم بالثاني.',
      'Un ejército de tribus marchó sobre Medina. En mañanas frías y con hambre, los musulmanes cavaron una trinchera alrededor de la ciudad, y él cavaba con ellos diciendo las primeras palabras. Cuando los Coligados sitiaron la ciudad, invocó contra ellos con la segunda.',
    ),
    duas: [
      {
        id: 'khandaq-1',
        ar: 'اللَّهُمَّ إِنَّ الْعَيْشَ عَيْشُ الآخِرَهْ فَاغْفِرْ لِلأَنْصَارِ وَالْمُهَاجِرَهْ',
        meaning: t(
          'O Allah, true life is the life of the Hereafter, so forgive the Ansar and the Muhajirun.',
          'Ô Allah, la vraie vie est celle de l’au-delà : pardonne aux Ansar et aux Muhajirun.',
          'العيش الحق عيش الآخرة، فاغفر للأنصار والمهاجرين.',
          'Oh Allah, la verdadera vida es la de la otra vida: perdona a los Ansar y a los Muhayirun.',
        ),
        r: ['bukhari:2834'],
        l: 'hadith',
      },
      {
        id: 'khandaq-2',
        ar: 'اللَّهُمَّ مُنْزِلَ الْكِتَابِ سَرِيعَ الْحِسَابِ، اللَّهُمَّ اهْزِمِ الأَحْزَابَ، اللَّهُمَّ اهْزِمْهُمْ وَزَلْزِلْهُمْ',
        meaning: t(
          'O Allah, Revealer of the Book, swift in reckoning, defeat the Confederates. O Allah, defeat them and shake them.',
          'Ô Allah, Toi qui as révélé le Livre, prompt dans le compte, défais les Coalisés. Ô Allah, défais-les et ébranle-les.',
          'توسّل إلى الله بإنزاله الكتاب وسرعة حسابه أن يهزم الأحزاب.',
          'Oh Allah, que revelaste el Libro, rápido en la cuenta, derrota a los Coligados. Oh Allah, derrótalos y sacúdelos.',
        ),
        r: ['bukhari:2933'],
        l: 'hadith',
        verse: '33:9',
      },
    ],
  },
  {
    id: 'daws',
    era: 'madinah',
    when: t('Madinah', 'Médine', 'المدينة', 'Medina'),
    title: t('Guidance, not a curse', 'La guidée, pas la malédiction', 'الدعاء بالهداية لا باللعن', 'Guía, no maldición'),
    story: t(
      'Al-Tufayl ibn ‘Amr came and said: “Messenger of Allah, the tribe of Daws has disobeyed and refused; pray against them.” People said: “Daws is finished.” Instead he said:',
      'At-Tufayl ibn ‘Amr vint dire : « Messager d’Allah, la tribu de Daws a désobéi et refusé ; invoque contre elle. » Les gens dirent : « C’en est fini de Daws. » Il dit au contraire :',
      'قدم الطفيل بن عمرو فقال: إن دوسًا عصت وأبت فادع الله عليها، فقيل: هلكت دوس، فقال:',
      'Al-Tufayl ibn ‘Amr vino a decir: «Mensajero de Allah, la tribu de Daws ha desobedecido y se ha negado; invoca contra ella». La gente dijo: «Daws está perdida». Él dijo en cambio:',
    ),
    duas: [
      {
        id: 'daws-1',
        ar: 'اللَّهُمَّ اهْدِ دَوْسًا وَائْتِ بِهِمْ',
        meaning: t(
          'O Allah, guide Daws and bring them.',
          'Ô Allah, guide Daws et amène-les.',
          'دعا لهم بالهداية وأن يأتوا مسلمين.',
          'Oh Allah, guía a Daws y tráelos.',
        ),
        r: ['bukhari:2937'],
        l: 'hadith',
      },
    ],
  },
  {
    id: 'young',
    era: 'madinah',
    when: t('Madinah', 'Médine', 'المدينة', 'Medina'),
    title: t('Prayers for two young companions', 'Pour deux jeunes compagnons', 'دعاؤه لغلامين من أصحابه', 'Por dos jóvenes compañeros'),
    story: t(
      'Ibn ‘Abbas, still a boy, put out water for his ablution, and he prayed for him with the first words. Umm Sulaym asked him to pray for her son Anas, who served him, and he said the second.',
      'Ibn ‘Abbas, encore enfant, lui prépara l’eau de ses ablutions, et il invoqua pour lui par les premières paroles. Umm Sulaym lui demanda de prier pour son fils Anas, qui le servait, et il dit les secondes.',
      'وضع له ابن عباس وهو غلام وَضوءه فدعا له بالأول، وسألته أم سليم أن يدعو لابنها أنس خادمه فدعا بالثاني.',
      'Ibn ‘Abbas, aún niño, le preparó el agua de la ablución, y él rezó por él con las primeras palabras. Umm Sulaym le pidió que rezara por su hijo Anas, que lo servía, y dijo las segundas.',
    ),
    duas: [
      {
        id: 'young-1',
        ar: 'اللَّهُمَّ فَقِّهْهُ فِي الدِّينِ',
        meaning: t('O Allah, give him understanding of the religion.', 'Ô Allah, donne-lui la compréhension de la religion.', 'دعا لابن عباس بالفقه في الدين، فصار حبر الأمة.', 'Oh Allah, dale comprensión de la religión.'),
        r: ['bukhari:143'],
        l: 'hadith',
      },
      {
        id: 'young-2',
        ar: 'اللَّهُمَّ أَكْثِرْ مَالَهُ وَوَلَدَهُ، وَبَارِكْ لَهُ فِيمَا أَعْطَيْتَهُ',
        meaning: t(
          'O Allah, increase his wealth and his children, and bless him in what You give him.',
          'Ô Allah, augmente ses biens et ses enfants, et bénis-le dans ce que Tu lui donnes.',
          'دعا لأنس بكثرة المال والولد والبركة فيهما.',
          'Oh Allah, aumenta sus bienes y sus hijos, y bendícelo en lo que le das.',
        ),
        r: ['bukhari:6334'],
        l: 'hadith',
      },
    ],
  },
  {
    id: 'fath',
    era: 'madinah',
    when: t('The conquest of Makkah, Ramadan 8 AH / 630 CE', 'La conquête de La Mecque, ramadan 8 H / 630', 'فتح مكة، رمضان 8 هـ / 630 م', 'La conquista de La Meca, ramadán de 8 H / 630'),
    title: t('The truth has come', 'La vérité est venue', 'جاء الحق', 'Ha llegado la verdad'),
    story: t(
      'He entered Makkah, where he had been driven out eight years before. Three hundred and sixty idols stood around the Ka‘bah. He struck them with a stick in his hand, reciting the verse below.',
      'Il entra à La Mecque, d’où on l’avait chassé huit ans plus tôt. Trois cent soixante idoles entouraient la Ka‘ba. Il les frappait d’un bâton en récitant le verset ci-dessous.',
      'دخل مكة التي أُخرج منها قبل ثماني سنين، وحول الكعبة ثلاثمائة وستون نصبًا، فجعل يطعنها بعود في يده ويتلو الآية.',
      'Entró en La Meca, de donde lo habían expulsado ocho años antes. Trescientos sesenta ídolos rodeaban la Kaaba. Los golpeaba con un palo recitando el versículo de abajo.',
    ),
    duas: [
      {
        id: 'fath-1',
        ar: '',
        meaning: t(
          'He recited: “The truth has come and falsehood has vanished” (Qur’an 17:81).',
          'Il récitait : « La vérité est venue et le faux s’est dissipé » (Coran 17:81).',
          'كان يتلو آية الإسراء (17:81).',
          'Recitaba: «Ha llegado la verdad y se ha disipado la falsedad» (Corán 17:81).',
        ),
        r: ['bukhari:4287'],
        l: 'hadith',
        verse: '17:81',
      },
    ],
  },
  {
    id: 'ibrahim',
    era: 'final',
    when: t('Madinah, 10 AH / 632 CE', 'Médine, 10 H / 632', 'المدينة، سنة 10 هـ / 632 م', 'Medina, 10 H / 632'),
    title: t('The death of his son Ibrahim', 'La mort de son fils Ibrahim', 'وفاة ابنه إبراهيم', 'La muerte de su hijo Ibrahim'),
    story: t(
      'As his infant son Ibrahim was dying, his eyes filled with tears. ‘Abd al-Rahman ibn ‘Awf asked: “You too, Messenger of Allah?” He said it was mercy, and then:',
      'Alors que son fils Ibrahim, nourrisson, rendait l’âme, ses yeux se remplirent de larmes. ‘Abd ar-Rahman ibn ‘Awf demanda : « Toi aussi, Messager d’Allah ? » Il répondit que c’était de la miséricorde, puis :',
      'كان ابنه إبراهيم صغيرًا يجود بنفسه فذرفت عيناه، فقال له عبد الرحمن بن عوف: وأنت يا رسول الله؟ فقال إنها رحمة، ثم قال:',
      'Mientras su hijo Ibrahim, bebé, agonizaba, sus ojos se llenaron de lágrimas. ‘Abd al-Rahman ibn ‘Awf preguntó: «¿Tú también, Mensajero de Allah?». Dijo que era misericordia, y luego:',
    ),
    duas: [
      {
        id: 'ibrahim-1',
        ar: 'إِنَّ الْعَيْنَ تَدْمَعُ، وَالْقَلْبَ يَحْزَنُ، وَلاَ نَقُولُ إِلاَّ مَا يَرْضَى رَبُّنَا، وَإِنَّا بِفِرَاقِكَ يَا إِبْرَاهِيمُ لَمَحْزُونُونَ',
        meaning: t(
          'The eye weeps and the heart grieves, but we say only what pleases our Lord. We are saddened by your parting, Ibrahim.',
          'L’œil pleure et le cœur s’attriste, mais nous ne disons que ce qui plaît à notre Seigneur. Ta séparation nous attriste, Ibrahim.',
          'الحزن والدمع رحمة، والصبر ألا يقول إلا ما يرضي الله.',
          'El ojo llora y el corazón se entristece, pero solo decimos lo que agrada a nuestro Señor. Tu partida nos entristece, Ibrahim.',
        ),
        r: ['bukhari:1303'],
        l: 'hadith',
      },
    ],
  },
  {
    id: 'arafah',
    era: 'final',
    when: t('‘Arafah, 9 Dhu al-Hijjah 10 AH', '‘Arafat, 9 dhou al-hijja 10 H', 'عرفة، 9 ذي الحجة 10 هـ', '‘Arafat, 9 de dhu al-hiyya de 10 H'),
    title: t('The best supplication', 'La meilleure invocation', 'خير الدعاء', 'La mejor súplica'),
    story: t(
      'On his only Hajj, the Farewell Pilgrimage, he stood at ‘Arafah. He taught that the best supplication is that of the day of ‘Arafah, and the best words he and the prophets before him said are these:',
      'Lors de son unique pèlerinage, le Pèlerinage d’adieu, il se tint à ‘Arafat. Il enseigna que la meilleure invocation est celle du jour de ‘Arafat, et que les meilleures paroles que lui et les prophètes avant lui ont dites sont celles-ci :',
      'في حجة الوداع، حجته الوحيدة، وقف بعرفة، وعلّم أن خير الدعاء دعاء يوم عرفة، وخير ما قاله هو والنبيون قبله:',
      'En su única peregrinación, la Peregrinación de despedida, estuvo en ‘Arafat. Enseñó que la mejor súplica es la del día de ‘Arafat, y que las mejores palabras que él y los profetas anteriores dijeron son estas:',
    ),
    duas: [
      {
        id: 'arafah-1',
        ar: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        meaning: t(
          'There is no god but Allah alone, with no partner. His is the dominion and His the praise, and He has power over all things.',
          'Il n’y a de divinité qu’Allah, Seul, sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose.',
          'كلمة التوحيد: لا معبود بحق إلا الله وحده، له الملك والحمد، وهو على كل شيء قدير.',
          'No hay más dios que Allah, solo, sin asociado. Suyo es el dominio y Suya la alabanza, y Él tiene poder sobre todas las cosas.',
        ),
        r: ['tirmidhi:3585'],
        l: 'hadith',
        grade: HASAN_ALBANI,
      },
    ],
  },
  {
    id: 'last',
    era: 'final',
    when: t('Madinah, Rabi‘ al-Awwal 11 AH / 632 CE', 'Médine, rabi‘ al-awwal 11 H / 632', 'المدينة، ربيع الأول 11 هـ / 632 م', 'Medina, rabi‘ al-awwal de 11 H / 632'),
    title: t('His last words', 'Ses dernières paroles', 'آخر كلماته', 'Sus últimas palabras'),
    story: t(
      'In his last illness he rested against ‘A’ishah. She heard him say the first words below; his very last words were the second.',
      'Pendant sa dernière maladie, il reposait contre ‘A’icha. Elle l’entendit dire les premières paroles ci-dessous ; ses toutes dernières furent les secondes.',
      'في مرضه الأخير كان مستندًا إلى عائشة، فسمعته يقول الدعاء الأول، وكان آخر ما تكلم به الثاني.',
      'En su última enfermedad descansaba apoyado en ‘A’isha. Ella le oyó decir las primeras palabras; las últimas de todas fueron las segundas.',
    ),
    duas: [
      {
        id: 'last-1',
        ar: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي، وَأَلْحِقْنِي بِالرَّفِيقِ',
        meaning: t(
          'O Allah, forgive me, have mercy on me, and join me to the Companion on high.',
          'Ô Allah, pardonne-moi, fais-moi miséricorde et réunis-moi au Compagnon suprême.',
          'سأل الله المغفرة والرحمة واللحاق بالرفيق الأعلى.',
          'Oh Allah, perdóname, ten misericordia de mí y úneme al Compañero supremo.',
        ),
        r: ['bukhari:4440'],
        l: 'hadith',
      },
      {
        id: 'last-2',
        ar: 'اللَّهُمَّ الرَّفِيقَ الأَعْلَى',
        meaning: t('O Allah, the Companion on high.', 'Ô Allah, le Compagnon suprême.', 'آخر كلمة قالها ﷺ.', 'Oh Allah, el Compañero supremo.'),
        r: ['bukhari:4463'],
        l: 'hadith',
      },
    ],
  },
]

/** What he said in hardship, taught for anyone in the same situation. */
export const HARDSHIP_DUAS: (Supplication & { when: L4 })[] = [
  {
    id: 'distress',
    when: t('In distress', 'Dans l’angoisse', 'عند الكرب', 'En la angustia'),
    ar: 'لاَ إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ السَّمَوَاتِ، وَرَبُّ الأَرْضِ، وَرَبُّ الْعَرْشِ الْكَرِيمِ',
    meaning: t(
      'There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the mighty Throne. There is no god but Allah, Lord of the heavens, Lord of the earth and Lord of the noble Throne.',
      'Il n’y a de divinité qu’Allah, l’Immense, le Longanime. Il n’y a de divinité qu’Allah, Seigneur du Trône immense. Il n’y a de divinité qu’Allah, Seigneur des cieux, Seigneur de la terre et Seigneur du noble Trône.',
      'كان يقوله عند الكرب.',
      'No hay más dios que Allah, el Inmenso, el Indulgente. No hay más dios que Allah, Señor del Trono inmenso. No hay más dios que Allah, Señor de los cielos, Señor de la tierra y Señor del noble Trono.',
    ),
    r: ['bukhari:6346'],
    l: 'hadith',
  },
  {
    id: 'fear',
    when: t('When afraid of a people', 'Quand on craint des gens', 'إذا خاف قومًا', 'Cuando se teme a un grupo'),
    ar: 'اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ',
    meaning: t(
      'O Allah, we place You before them, and seek refuge in You from their evil.',
      'Ô Allah, nous Te plaçons face à eux, et nous cherchons refuge auprès de Toi contre leur mal.',
      'يستكفي الله شرهم ويستعيذ به منه.',
      'Oh Allah, te ponemos frente a ellos y buscamos refugio en Ti de su mal.',
    ),
    r: ['abudawud:1537'],
    l: 'hadith',
    grade: SAHIH_ALBANI,
  },
  {
    id: 'rain',
    when: t('When it rains', 'Quand il pleut', 'عند نزول المطر', 'Cuando llueve'),
    ar: 'صَيِّبًا نَافِعًا',
    meaning: t('A beneficial rain.', 'Une pluie bienfaisante.', 'يسأل الله أن يكون المطر نافعًا.', 'Una lluvia beneficiosa.'),
    r: ['bukhari:1032'],
    l: 'hadith',
  },
]
