// How the hadith were preserved: the chain of narrators, the history of the collection, how a report is tested,
// what made forgery hard, and how this differs from the Qur'an. Written for readers who are not Muslim.
// Arabic quotes are copied from the hadith they cite and checked by `npm run verify:duas`.
// Historical facts that come from the classical books (not from a numbered hadith) cite those books (`book:…`).
import type { L4, Level, Ref } from './types'
import type { Supplication } from './duas'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

export interface HsPoint {
  id: string
  title: L4
  text: L4
  l: Level
  r: Ref[]
  /** Hadith quoted in full, checked against the source. */
  quotes?: Supplication[]
}

export interface ChainLink {
  name: L4
  note: L4
}

const Q = (id: string, ar: string, r: Ref, meaning: L4): Supplication => ({ id, ar, r: [r], l: 'hadith', meaning })

/** The chain of the first hadith of Sahih al-Bukhari, from the Prophet ﷺ to al-Bukhari. */
export const CHAIN: ChainLink[] = [
  { name: t('The Prophet Muhammad ﷺ', 'Le Prophète Muhammad ﷺ', 'النبي محمد ﷺ', 'El Profeta Muhammad ﷺ'), note: t('Madinah, d. 11 AH (632)', 'Médine, m. 11 H (632)', 'المدينة، تُوفي 11هـ', 'Medina, m. 11 H (632)') },
  { name: t('‘Umar ibn al-Khattab', '‘Umar ibn al-Khattab', 'عمر بن الخطاب', '‘Umar ibn al-Jattab'), note: t('Madinah, d. 23 AH; heard it and repeated it from the pulpit', 'Médine, m. 23 H ; l’entendit et le répéta en chaire', 'المدينة، ت 23هـ؛ سمعه وحدّث به على المنبر', 'Medina, m. 23 H; lo oyó y lo repitió en el púlpito') },
  { name: t('‘Alqamah ibn Waqqas al-Laythi', '‘Alqama ibn Waqqas al-Laythi', 'علقمة بن وقاص الليثي', '‘Alqama ibn Waqqas al-Laizi'), note: t('Madinah, late 1st century AH', 'Médine, fin du Ier siècle H', 'المدينة، أواخر القرن الأول', 'Medina, finales del siglo I H') },
  { name: t('Muhammad ibn Ibrahim al-Taymi', 'Muhammad ibn Ibrahim at-Taymi', 'محمد بن إبراهيم التيمي', 'Muhammad ibn Ibrahim at-Taymi'), note: t('Madinah, d. 120 AH', 'Médine, m. 120 H', 'المدينة، ت 120هـ', 'Medina, m. 120 H') },
  { name: t('Yahya ibn Sa‘id al-Ansari', 'Yahya ibn Sa‘id al-Ansari', 'يحيى بن سعيد الأنصاري', 'Yahya ibn Sa‘id al-Ansari'), note: t('Madinah, a judge, d. 143/144 AH; from him many students in many cities narrated it', 'Médine, juge, m. 143/144 H ; de lui, de nombreux élèves de nombreuses villes l’ont transmis', 'المدينة، قاضٍ، ت 143/144هـ؛ رواه عنه خلق كثير من أمصار شتى', 'Medina, juez, m. 143/144 H; de él lo transmitieron muchos alumnos de muchas ciudades') },
  { name: t('Sufyan ibn ‘Uyaynah', 'Sufyan ibn ‘Uyayna', 'سفيان بن عيينة', 'Sufyan ibn ‘Uyayna'), note: t('Makkah, d. 198 AH', 'La Mecque, m. 198 H', 'مكة، ت 198هـ', 'La Meca, m. 198 H') },
  { name: t('al-Humaydi', 'al-Humaydi', 'الحميدي', 'al-Humaydi'), note: t('Makkah, d. 219 AH, al-Bukhari’s teacher', 'La Mecque, m. 219 H, maître d’al-Bukhari', 'مكة، ت 219هـ، شيخ البخاري', 'La Meca, m. 219 H, maestro de al-Bujari') },
  { name: t('al-Bukhari', 'al-Bukhari', 'البخاري', 'al-Bujari'), note: t('d. 256 AH; placed it first in his Sahih', 'm. 256 H ; le plaça en tête de son Sahih', 'ت 256هـ؛ جعله أول حديث في صحيحه', 'm. 256 H; lo puso al principio de su Sahih') },
]

export const CHAIN_TEXT = Q('intention', "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", 'bukhari:1', t(
  'Actions are only by intentions, and each person has only what he intended.',
  'Les actes ne valent que par les intentions, et chacun n’a que ce qu’il a eu l’intention de faire.',
  'هذا متن الحديث، وما قبله إسناده.',
  'Las obras solo valen por las intenciones, y cada uno tiene solo lo que se propuso.',
))

export const TIMELINE: (HsPoint & { when: L4 })[] = [
  {
    id: 'lifetime',
    when: t('His lifetime, until 11 AH (632)', 'De son vivant, jusqu’en 11 H (632)', 'في حياته ﷺ حتى 11هـ', 'En vida del Profeta, hasta 11 H (632)'),
    title: t('Memorised, practised and written', 'Mémorisé, pratiqué et écrit', 'حِفظٌ وعمل وكتابة', 'Memorizado, practicado y escrito'),
    text: t(
      'The Companions learned his words by heart, and much of the Sunnah was practised in front of everyone every day: the prayer five times, the fast, the pilgrimage. Some also wrote: ‘Abdullah ibn ‘Amr wrote down what he heard, ‘Ali kept a written sheet, and the Prophet ﷺ had a sermon written for a man from Yemen. At first he told them not to write anything from him except the Qur’an, so the two would never be mixed, while telling them to narrate from him; the reports of writing show that this was later allowed.',
      'Les Compagnons apprenaient ses paroles par cœur, et une grande part de la Sunna se pratiquait devant tous chaque jour : la prière cinq fois, le jeûne, le pèlerinage. Certains écrivaient aussi : ‘Abdullah ibn ‘Amr notait ce qu’il entendait, ‘Ali gardait une feuille écrite, et le Prophète ﷺ fit écrire un sermon pour un homme du Yémen. Au début, il leur dit de ne rien écrire de lui sauf le Coran, pour que les deux ne se mélangent jamais, tout en leur disant de transmettre ses paroles ; les récits d’écriture montrent que cela fut ensuite permis.',
      'حفظ الصحابة كلامه، وكانت السنة العملية تُؤدّى أمام الناس كل يوم: الصلوات الخمس والصيام والحج. وكتب بعضهم: كان عبد الله بن عمرو يكتب ما يسمع، وكانت عند علي صحيفة، وأمر النبي ﷺ أن يُكتب لأبي شاه من اليمن. وفي أول الأمر نهى عن كتابة غير القرآن لئلا يختلط به، مع أمره بالتحديث عنه، ثم دلّت أخبار الكتابة على الإذن بها.',
      'Los Compañeros aprendían sus palabras de memoria, y gran parte de la Sunna se practicaba ante todos cada día: la oración cinco veces, el ayuno, la peregrinación. Algunos también escribían: ‘Abdullah ibn ‘Amr anotaba lo que oía, ‘Ali guardaba una hoja escrita, y el Profeta ﷺ hizo escribir un sermón para un hombre del Yemen. Al principio les dijo que no escribieran nada de él salvo el Corán, para que nunca se mezclaran, a la vez que les decía que transmitieran sus palabras; los relatos de escritura muestran que después se permitió.',
    ),
    l: 'hadith',
    r: ['bukhari:113', 'bukhari:111', 'bukhari:112', 'muslim:3004'],
    quotes: [
      Q('writing', "مَا مِنْ أَصْحَابِ النَّبِيِّ صلى الله عليه وسلم أَحَدٌ أَكْثَرَ حَدِيثًا عَنْهُ مِنِّي، إِلاَّ مَا كَانَ مِنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو فَإِنَّهُ كَانَ يَكْتُبُ وَلاَ أَكْتُبُ", 'bukhari:113', t(
        'Abu Hurayrah: “None of the Prophet’s Companions narrated more from him than I did, except ‘Abdullah ibn ‘Amr, for he used to write and I did not.”',
        'Abu Hurayra : « Aucun des Compagnons du Prophète ne rapporta de lui plus que moi, sauf ‘Abdullah ibn ‘Amr, car il écrivait et moi non. »',
        'قول أبي هريرة في كتابة عبد الله بن عمرو.',
        'Abu Hurayra: «Ninguno de los Compañeros del Profeta transmitió de él más que yo, salvo ‘Abdullah ibn ‘Amr, porque él escribía y yo no».',
      )),
      Q('abushah', "اكْتُبُوا لأَبِي فُلاَنٍ", 'bukhari:112', t(
        '“Write it down for Abu so-and-so” (Abu Shah, who had asked for the sermon in writing).',
        '« Écrivez-le pour Abu Untel » (Abu Shah, qui avait demandé le sermon par écrit).',
        'أمر النبي ﷺ بكتابة خطبته لأبي شاه.',
        '«Escribídselo a Abu Fulano» (Abu Shah, que había pedido el sermón por escrito).',
      )),
    ],
  },
  {
    id: 'companions',
    when: t('The Companions, 11 to about 100 AH', 'Les Compagnons, de 11 à environ 100 H', 'عصر الصحابة، من 11 إلى نحو 100هـ', 'Los Compañeros, de 11 a hacia 100 H'),
    title: t('Caution from the very start', 'La prudence dès le début', 'التثبّت منذ البداية', 'Prudencia desde el principio'),
    text: t(
      'The Companions spread to Makkah, Kufa, Basra, Damascus and Egypt, each city keeping what it had heard. They were careful: ‘Umar asked Abu Musa to bring a witness for a hadith he had not heard himself, and al-Zubayr, who never left the Prophet ﷺ, narrated little for fear of saying something wrong. Their students began to write notebooks; one of them, the sheet of Hammam ibn Munabbih from Abu Hurayrah, survives to this day.',
      'Les Compagnons se répandirent à La Mecque, Koufa, Bassora, Damas et en Égypte, chaque ville gardant ce qu’elle avait entendu. Ils étaient prudents : ‘Umar demanda à Abu Musa d’apporter un témoin pour un hadith qu’il n’avait pas entendu lui-même, et al-Zubayr, qui ne quitta jamais le Prophète ﷺ, rapportait peu de peur de se tromper. Leurs élèves commencèrent à tenir des cahiers ; l’un d’eux, la feuille de Hammam ibn Munabbih d’après Abu Hurayra, existe encore aujourd’hui.',
      'تفرّق الصحابة في مكة والكوفة والبصرة ودمشق ومصر، وحفظت كل مدينة ما سمعت. وكانوا يتثبّتون: طلب عمر من أبي موسى بيّنة على حديث لم يسمعه، وكان الزبير الذي لم يفارق النبي ﷺ يُقلّ الرواية خشية الخطأ. وبدأ تلاميذهم يكتبون الصحف، ومنها صحيفة همام بن منبه عن أبي هريرة، وهي محفوظة إلى اليوم.',
      'Los Compañeros se repartieron por La Meca, Kufa, Basora, Damasco y Egipto, y cada ciudad guardó lo que había oído. Eran prudentes: ‘Umar pidió a Abu Musa un testigo para un hadiz que él no había oído, y al-Zubayr, que nunca se separó del Profeta ﷺ, transmitía poco por miedo a equivocarse. Sus alumnos empezaron a escribir cuadernos; uno de ellos, la hoja de Hammam ibn Munabbih según Abu Hurayra, se conserva hasta hoy.',
    ),
    l: 'hadith',
    r: ['bukhari:6245', 'bukhari:107', 'book:hammam'],
    quotes: [
      Q('witness', "وَاللَّهِ لَتُقِيمَنَّ عَلَيْهِ بِبَيِّنَةٍ", 'bukhari:6245', t(
        '‘Umar to Abu Musa: “By Allah, you will bring proof for it.” Abu Sa‘id al-Khudri then testified that he too had heard it.',
        '‘Umar à Abu Musa : « Par Allah, tu en apporteras la preuve. » Abu Sa‘id al-Khudri témoigna alors qu’il l’avait entendu aussi.',
        'قاله عمر لأبي موسى، فشهد له أبو سعيد الخدري.',
        '‘Umar a Abu Musa: «Por Allah, traerás una prueba de ello». Abu Sa‘id al-Judri atestiguó entonces que él también lo había oído.',
      )),
      Q('zubayr', "أَمَا إِنِّي لَمْ أُفَارِقْهُ وَلَكِنْ سَمِعْتُهُ يَقُولُ، مَنْ كَذَبَ عَلَىَّ فَلْيَتَبَوَّأْ مَقْعَدَهُ مِنَ النَّارِ", 'bukhari:107', t(
        'Al-Zubayr, asked by his son why he narrated so little: “I never left him, but I heard him say: Whoever lies about me, let him take his seat in the Fire.”',
        'Al-Zubayr, à son fils qui lui demandait pourquoi il rapportait si peu : « Je ne l’ai jamais quitté, mais je l’ai entendu dire : Quiconque ment sur moi, qu’il prenne sa place dans le Feu. »',
        'جواب الزبير لابنه حين سأله عن قلة تحديثه.',
        'Al-Zubayr, cuando su hijo le preguntó por qué transmitía tan poco: «Nunca me separé de él, pero le oí decir: Quien mienta sobre mí, que ocupe su lugar en el Fuego».',
      )),
    ],
  },
  {
    id: 'isnad',
    when: t('Late 1st century AH', 'Fin du Ier siècle H', 'أواخر القرن الأول', 'Finales del siglo I H'),
    title: t('“Name your men”', '« Nommez vos hommes »', '«سمّوا لنا رجالكم»', '«Nombrad a vuestros hombres»'),
    text: t(
      'After the civil strife (fitnah), people with political and sectarian motives began to invent sayings. The answer was the chain of narrators. Muhammad ibn Sirin (d. 110 AH) said that people used not to ask about the chain, but after the fitnah they said: name your men to us, so the reports of the people of the Sunnah were taken and those of the people of innovation were not. ‘Abdullah ibn al-Mubarak said: the chain is part of the religion; without it, anyone could say whatever he wished.',
      'Après la guerre civile (fitna), des gens aux motifs politiques et sectaires se mirent à inventer des paroles. La réponse fut la chaîne de transmetteurs. Muhammad ibn Sirin (m. 110 H) dit qu’on ne demandait pas la chaîne autrefois, mais qu’après la fitna on dit : nommez-nous vos hommes, et l’on prit les récits des gens de la Sunna et non ceux des gens de l’innovation. ‘Abdullah ibn al-Mubarak dit : la chaîne fait partie de la religion ; sans elle, chacun dirait ce qu’il veut.',
      'لما وقعت الفتنة ظهر من يضع الحديث لأغراض سياسية ومذهبية، فكان الجواب هو الإسناد. قال محمد بن سيرين (ت 110هـ): «لم يكونوا يسألون عن الإسناد، فلما وقعت الفتنة قالوا: سمّوا لنا رجالكم، فيُنظر إلى أهل السنة فيؤخذ حديثهم، ويُنظر إلى أهل البدع فلا يؤخذ حديثهم». وقال عبد الله بن المبارك: «الإسناد من الدين، ولولا الإسناد لقال من شاء ما شاء».',
      'Tras la guerra civil (fitna), gente con motivos políticos y sectarios empezó a inventar dichos. La respuesta fue la cadena de transmisores. Muhammad ibn Sirin (m. 110 H) dijo que antes no se preguntaba por la cadena, pero después de la fitna se dijo: nombradnos a vuestros hombres, y se tomaron los relatos de la gente de la Sunna y no los de la gente de la innovación. ‘Abdullah ibn al-Mubarak dijo: la cadena es parte de la religión; sin ella, cualquiera diría lo que quisiera.',
    ),
    l: 'tradition',
    r: ['book:muslimintro'],
  },
  {
    id: 'official',
    when: t('About 100 AH', 'Vers 100 H', 'نحو سنة 100هـ', 'Hacia 100 H'),
    title: t('The first official collection', 'La première collecte officielle', 'أول تدوين رسمي', 'La primera recopilación oficial'),
    text: t(
      'The caliph ‘Umar ibn ‘Abd al-‘Aziz (d. 101 AH) wrote to Abu Bakr ibn Hazm in Madinah to write down the hadith of the Prophet ﷺ, fearing that knowledge would disappear with the scholars. Ibn Shihab al-Zuhri (d. 124 AH) is counted as the first to collect them on a large scale. Students travelled for months to hear a single report from the person who held it: Jabir ibn ‘Abdullah travelled a month to Syria for one hadith.',
      'Le calife ‘Umar ibn ‘Abd al-‘Aziz (m. 101 H) écrivit à Abu Bakr ibn Hazm à Médine de mettre par écrit les hadiths du Prophète ﷺ, craignant que le savoir ne disparaisse avec les savants. Ibn Shihab az-Zuhri (m. 124 H) est compté comme le premier à les rassembler à grande échelle. Des élèves voyageaient des mois pour entendre un seul récit de celui qui le détenait : Jabir ibn ‘Abdullah voyagea un mois jusqu’en Syrie pour un hadith.',
      'كتب الخليفة عمر بن عبد العزيز (ت 101هـ) إلى أبي بكر بن حزم بالمدينة: انظر ما كان من حديث رسول الله ﷺ فاكتبه، فإني خفت دروس العلم وذهاب العلماء. ويُعدّ ابن شهاب الزهري (ت 124هـ) أول من دوّن الحديث على نطاق واسع. وكان الطلاب يرحلون الشهور لسماع حديث واحد: رحل جابر بن عبد الله مسيرة شهر إلى الشام في حديث واحد.',
      'El califa ‘Umar ibn ‘Abd al-‘Aziz (m. 101 H) escribió a Abu Bakr ibn Hazm en Medina que pusiera por escrito los hadices del Profeta ﷺ, temiendo que el saber desapareciera con los sabios. Ibn Shihab az-Zuhri (m. 124 H) se considera el primero en reunirlos a gran escala. Los alumnos viajaban meses para oír un solo relato de quien lo tenía: Yabir ibn ‘Abdullah viajó un mes hasta Siria por un hadiz.',
    ),
    l: 'tradition',
    r: ['book:bukhariilm'],
  },
  {
    id: 'books2',
    when: t('2nd century AH', 'IIe siècle H', 'القرن الثاني', 'Siglo II H'),
    title: t('The first books arranged by subject', 'Les premiers livres classés par thème', 'أول الكتب المصنّفة على الأبواب', 'Los primeros libros ordenados por temas'),
    text: t(
      'Collections were arranged by topic: Ma‘mar ibn Rashid’s Jami‘, Malik’s al-Muwatta’ in Madinah, and later ‘Abd al-Razzaq’s Musannaf in Yemen. Malik’s book survives through many students who copied it independently in different countries, and their copies can be compared to this day.',
      'Les recueils furent classés par thème : le Jami‘ de Ma‘mar ibn Rashid, al-Muwatta’ de Malik à Médine, puis le Musannaf de ‘Abd ar-Razzaq au Yémen. Le livre de Malik nous est parvenu par de nombreux élèves qui l’ont copié séparément dans différents pays, et leurs copies peuvent encore être comparées aujourd’hui.',
      'رُتّبت المصنفات على الأبواب: جامع معمر بن راشد، وموطأ مالك بالمدينة، ثم مصنّف عبد الرزاق باليمن. ووصلنا الموطأ بروايات تلاميذ كثيرين نسخوه مستقلين في بلدان مختلفة، ويمكن مقابلة رواياتهم إلى اليوم.',
      'Las colecciones se ordenaron por temas: el Yami‘ de Ma‘mar ibn Rashid, al-Muwatta’ de Malik en Medina y, después, el Musannaf de ‘Abd ar-Razzaq en Yemen. El libro de Malik nos llegó por muchos alumnos que lo copiaron por separado en distintos países, y sus copias pueden compararse todavía hoy.',
    ),
    l: 'tradition',
    r: ['book:azami'],
  },
  {
    id: 'books3',
    when: t('3rd century AH', 'IIIe siècle H', 'القرن الثالث', 'Siglo III H'),
    title: t('The great collections', 'Les grands recueils', 'دواوين السنة الكبرى', 'Las grandes colecciones'),
    text: t(
      'Ahmad ibn Hanbal (d. 241) gathered his Musnad. Al-Bukhari (d. 256) spent about sixteen years choosing the hadith of his Sahih, about 7,500 with repetitions and about 2,600 without, out of a far larger number of chains he knew. Muslim (d. 261), Abu Dawud (d. 275), al-Tirmidhi (d. 279), Ibn Majah (d. 273) and al-Nasa’i (d. 303) completed the six books. Al-Tirmidhi gives his verdict after many hadith, and Abu Dawud points out weaknesses.',
      'Ahmad ibn Hanbal (m. 241) réunit son Musnad. Al-Bukhari (m. 256) passa environ seize ans à choisir les hadiths de son Sahih, environ 7 500 avec les répétitions et 2 600 sans, parmi un nombre bien plus grand de chaînes qu’il connaissait. Muslim (m. 261), Abu Dawud (m. 275), at-Tirmidhi (m. 279), Ibn Maja (m. 273) et an-Nasa’i (m. 303) complètent les six livres. At-Tirmidhi donne son jugement après de nombreux hadiths, et Abu Dawud signale les faiblesses.',
      'جمع أحمد بن حنبل (ت 241) مسنده، وأمضى البخاري (ت 256) نحو ست عشرة سنة ينتقي أحاديث صحيحه: نحو 7500 بالمكرر ونحو 2600 بغير تكرار، من أسانيد أكثر بكثير كان يحفظها. ثم مسلم (ت 261) وأبو داود (ت 275) والترمذي (ت 279) وابن ماجه (ت 273) والنسائي (ت 303). ويحكم الترمذي على كثير من الأحاديث عقبها، ويبيّن أبو داود الضعف.',
      'Ahmad ibn Hanbal (m. 241) reunió su Musnad. Al-Bujari (m. 256) pasó unos dieciséis años eligiendo los hadices de su Sahih, unos 7.500 con repeticiones y unos 2.600 sin ellas, entre un número mucho mayor de cadenas que conocía. Muslim (m. 261), Abu Dawud (m. 275), at-Tirmidi (m. 279), Ibn Mayah (m. 273) y an-Nasa’i (m. 303) completan los seis libros. At-Tirmidi da su juicio tras muchos hadices, y Abu Dawud señala las debilidades.',
    ),
    l: 'tradition',
    r: ['book:hadysari'],
  },
  {
    id: 'rijal',
    when: t('3rd to 9th century AH', 'Du IIIe au IXe siècle H', 'من القرن الثالث إلى التاسع', 'De los siglos III al IX H'),
    title: t('Books about the narrators themselves', 'Des livres sur les transmetteurs eux-mêmes', 'كتب الرجال', 'Libros sobre los propios transmisores'),
    text: t(
      'A whole literature records the narrators: Ibn Sa‘d’s Tabaqat, al-Bukhari’s al-Tarikh al-Kabir, Ibn Abi Hatim’s al-Jarh wa al-Ta‘dil, al-Mizzi’s Tahdhib al-Kamal, al-Dhahabi’s Mizan al-I‘tidal and Ibn Hajar’s Tahdhib al-Tahdhib. For tens of thousands of people they give teachers, students, cities, dates of birth and death, and what the critics said about their honesty and their memory.',
      'Toute une littérature recense les transmetteurs : les Tabaqat d’Ibn Sa‘d, al-Tarikh al-Kabir d’al-Bukhari, al-Jarh wa at-Ta‘dil d’Ibn Abi Hatim, Tahdhib al-Kamal d’al-Mizzi, Mizan al-I‘tidal d’adh-Dhahabi et Tahdhib at-Tahdhib d’Ibn Hajar. Pour des dizaines de milliers de personnes, ils donnent les maîtres, les élèves, les villes, les dates de naissance et de mort, et ce que les critiques ont dit de leur honnêteté et de leur mémoire.',
      'نشأ علم كامل لتراجم الرواة: طبقات ابن سعد، والتاريخ الكبير للبخاري، والجرح والتعديل لابن أبي حاتم، وتهذيب الكمال للمزي، وميزان الاعتدال للذهبي، وتهذيب التهذيب لابن حجر. وفيها لعشرات الآلاف من الرواة: الشيوخ والتلاميذ والبلدان والمواليد والوفيات وأقوال النقاد في عدالتهم وضبطهم.',
      'Toda una literatura registra a los transmisores: las Tabaqat de Ibn Sa‘d, al-Tarij al-Kabir de al-Bujari, al-Yarh wa at-Ta‘dil de Ibn Abi Hatim, Tahdib al-Kamal de al-Mizzi, Mizan al-I‘tidal de adh-Dhahabi y Tahdib at-Tahdib de Ibn Hayar. Para decenas de miles de personas dan maestros, alumnos, ciudades, fechas de nacimiento y muerte, y lo que los críticos dijeron de su honradez y su memoria.',
    ),
    l: 'tradition',
    r: ['book:rijal'],
  },
  {
    id: 'mawduat',
    when: t('From the 6th century AH', 'À partir du VIe siècle H', 'من القرن السادس', 'Desde el siglo VI H'),
    title: t('Books of the forged reports', 'Des livres sur les récits forgés', 'كتب الموضوعات', 'Libros de los relatos falsos'),
    text: t(
      'Scholars collected the invented sayings into their own books so that people would know them: Ibn al-Jawzi’s al-Mawdu‘at, al-Suyuti’s al-La’ali’ al-Masnu‘a and al-Shawkani’s al-Fawa’id al-Majmu‘a. Some forgers even confessed, and their names are recorded.',
      'Les savants rassemblèrent les paroles inventées dans des livres à part, pour qu’on les connaisse : al-Mawdu‘at d’Ibn al-Jawzi, al-La’ali’ al-Masnu‘a d’as-Suyuti et al-Fawa’id al-Majmu‘a d’ash-Shawkani. Certains faussaires ont même avoué, et leurs noms sont consignés.',
      'جمع العلماء الأحاديث المكذوبة في كتب خاصة ليعرفها الناس: الموضوعات لابن الجوزي، واللآلئ المصنوعة للسيوطي، والفوائد المجموعة للشوكاني. واعترف بعض الوضّاعين بوضعهم، وأسماؤهم مدوّنة.',
      'Los sabios reunieron los dichos inventados en libros aparte para que se conocieran: al-Mawdu‘at de Ibn al-Yawzi, al-La’ali’ al-Masnu‘a de as-Suyuti y al-Fawa’id al-Maymu‘a de ash-Shawkani. Algunos falsificadores incluso confesaron, y sus nombres constan.',
    ),
    l: 'tradition',
    r: ['book:mawduat'],
  },
]

/** The five conditions of an authentic (sahih) hadith, as defined by Ibn al-Salah. */
export const CONDITIONS: HsPoint[] = [
  {
    id: 'connected',
    title: t('An unbroken chain', 'Une chaîne sans rupture', 'اتصال السند', 'Una cadena sin cortes'),
    text: t('Each narrator heard it from the one before him. Dates, cities and journeys are checked: a man who died before his student was born, or never met him, breaks the chain.', 'Chaque transmetteur l’a entendu de celui qui le précède. Dates, villes et voyages sont vérifiés : un homme mort avant la naissance de son élève, ou qui ne l’a jamais rencontré, rompt la chaîne.', 'أن يكون كل راوٍ قد سمعه ممن فوقه، وتُفحص المواليد والوفيات والبلدان والرحلات، فمن مات قبل مولد تلميذه أو لم يلقه انقطع السند.', 'Cada transmisor lo oyó del anterior. Se comprueban fechas, ciudades y viajes: quien murió antes de que naciera su alumno, o nunca lo conoció, rompe la cadena.'),
    l: 'tradition',
    r: ['book:ibnsalah'],
  },
  {
    id: 'adl',
    title: t('Upright narrators', 'Des transmetteurs intègres', 'عدالة الرواة', 'Transmisores íntegros'),
    text: t('Every narrator is known to be honest and to fear God. Someone known to lie in ordinary speech is rejected, even if he never lied about the Prophet ﷺ.', 'Chaque transmetteur est connu pour son honnêteté et sa crainte de Dieu. Celui qu’on sait menteur dans la vie courante est rejeté, même s’il n’a jamais menti sur le Prophète ﷺ.', 'أن يكون كل راوٍ معروفًا بالصدق والتقوى، ويُردّ من عُرف بالكذب في حديث الناس ولو لم يكذب على النبي ﷺ.', 'Cada transmisor es conocido por su honradez y su temor de Dios. Quien miente en la vida corriente es rechazado, aunque nunca haya mentido sobre el Profeta ﷺ.'),
    l: 'tradition',
    r: ['book:ibnsalah'],
  },
  {
    id: 'dabt',
    title: t('Precise memory or careful writing', 'Une mémoire précise ou une écriture soignée', 'ضبط الرواة', 'Memoria precisa o escritura cuidadosa'),
    text: t('Honesty is not enough. A narrator’s reports are compared with those of his peers who heard the same teachers; if he often differs from them, he is judged weak, however pious he is.', 'L’honnêteté ne suffit pas. Les récits d’un transmetteur sont comparés à ceux de ses pairs qui ont entendu les mêmes maîtres ; s’il diffère souvent d’eux, il est jugé faible, quelle que soit sa piété.', 'لا يكفي الصدق؛ تُقارن مرويات الراوي بمرويات أقرانه الذين سمعوا من الشيوخ أنفسهم، فإن كثرت مخالفته ضُعّف مهما كان صالحًا.', 'La honradez no basta. Los relatos de un transmisor se comparan con los de sus compañeros que oyeron a los mismos maestros; si difiere a menudo, se le juzga débil, por piadoso que sea.'),
    l: 'tradition',
    r: ['book:ibnsalah'],
  },
  {
    id: 'shadh',
    title: t('No contradiction of stronger narrators', 'Pas de contradiction avec plus fiables', 'السلامة من الشذوذ', 'Sin contradecir a otros más fiables'),
    text: t('Even a reliable narrator is not followed when he contradicts narrators more reliable or more numerous than him.', 'Même un transmetteur fiable n’est pas suivi quand il contredit des transmetteurs plus fiables ou plus nombreux que lui.', 'لا يُقبل ما خالف فيه الثقةُ من هو أوثق منه أو أكثر عددًا.', 'Ni siquiera un transmisor fiable es seguido cuando contradice a otros más fiables o más numerosos.'),
    l: 'tradition',
    r: ['book:ibnsalah'],
  },
  {
    id: 'illa',
    title: t('No hidden defect', 'Pas de défaut caché', 'السلامة من العلة', 'Sin defecto oculto'),
    text: t('Specialists gather every chain of a hadith to find hidden faults: a name confused with another, a saying of a Companion turned into a saying of the Prophet ﷺ, a missing link that only shows when all the chains are laid side by side.', 'Les spécialistes rassemblent toutes les chaînes d’un hadith pour trouver les défauts cachés : un nom confondu avec un autre, la parole d’un Compagnon devenue parole du Prophète ﷺ, un maillon manquant qui n’apparaît qu’en mettant toutes les chaînes côte à côte.', 'يجمع النقاد طرق الحديث كلها ليكشفوا العلل الخفية: اسم اشتبه بآخر، أو قول صحابي رُفع إلى النبي ﷺ، أو سقط لا يظهر إلا بمقابلة الطرق.', 'Los especialistas reúnen todas las cadenas de un hadiz para hallar fallos ocultos: un nombre confundido con otro, un dicho de un Compañero convertido en dicho del Profeta ﷺ, un eslabón que falta y solo se ve al poner todas las cadenas juntas.'),
    l: 'tradition',
    r: ['book:ibnsalah'],
  },
]

export const GRADES: { name: L4; text: L4 }[] = [
  { name: t('Mutawatir', 'Mutawatir', 'متواتر', 'Mutawatir'), text: t('Reported by so many in every generation that they could not have agreed on a lie. As certain as the Qur’an’s transmission.', 'Rapporté par tant de gens à chaque génération qu’ils n’auraient pu s’entendre sur un mensonge. Aussi certain que la transmission du Coran.', 'رواه في كل طبقة جمع يستحيل تواطؤهم على الكذب، ويفيد اليقين كنقل القرآن.', 'Transmitido por tantos en cada generación que no pudieron ponerse de acuerdo en una mentira. Tan cierto como la transmisión del Corán.') },
  { name: t('Sahih', 'Sahih', 'صحيح', 'Sahih'), text: t('Meets the five conditions. Accepted and acted upon.', 'Remplit les cinq conditions. Accepté et mis en pratique.', 'استوفى الشروط الخمسة، فيُقبل ويُعمل به.', 'Cumple las cinco condiciones. Se acepta y se practica.') },
  { name: t('Hasan', 'Hasan', 'حسن', 'Hasan'), text: t('The same, with a narrator whose memory is a little less strong. Accepted.', 'Pareil, avec un transmetteur à la mémoire un peu moins forte. Accepté.', 'مثله لكن في رواته من خفّ ضبطه قليلًا، ويُقبل.', 'Igual, con un transmisor de memoria algo menos firme. Se acepta.') },
  { name: t('Da‘if', 'Da‘if', 'ضعيف', 'Da‘if'), text: t('A condition is missing. Not used to establish belief or law.', 'Une condition manque. Pas utilisé pour établir la croyance ou la loi.', 'اختلّ فيه شرط، فلا تثبت به عقيدة ولا حكم.', 'Le falta una condición. No se usa para fijar creencia ni ley.') },
  { name: t('Mawdu‘', 'Mawdu‘', 'موضوع', 'Mawdu‘'), text: t('Forged. It may not be quoted as the Prophet’s words except to warn against it.', 'Forgé. On ne peut le citer comme parole du Prophète que pour mettre en garde.', 'مكذوب، ولا تحلّ روايته إلا مع بيان وضعه.', 'Falso. Solo puede citarse como palabra del Profeta para advertir contra él.') },
]

/** What made it hard to invent a hadith, or to get one wrong, without being found out. */
export const SAFEGUARDS: HsPoint[] = [
  {
    id: 'many-chains',
    title: t('Many chains, many cities', 'Beaucoup de chaînes, beaucoup de villes', 'طرق كثيرة في مدن كثيرة', 'Muchas cadenas, muchas ciudades'),
    text: t('A well-known hadith reached the collectors through different students in Madinah, Kufa, Basra, Damascus and Egypt, people who often never met. A forger in one city could change his own copy, but not the others; laying the chains side by side shows at once the one that differs.', 'Un hadith connu parvenait aux compilateurs par différents élèves à Médine, Koufa, Bassora, Damas et en Égypte, des gens qui souvent ne se sont jamais rencontrés. Un faussaire dans une ville pouvait changer sa propre copie, pas les autres ; mettre les chaînes côte à côte montre aussitôt celle qui diffère.', 'يصل الحديث المشهور إلى المصنّفين من تلاميذ مختلفين في المدينة والكوفة والبصرة ودمشق ومصر لم يلتقِ كثير منهم، فإن غيّر وضّاع في بلد نسخته لم يستطع تغيير غيرها، وتكشف مقابلة الطرق المخالفَ فورًا.', 'Un hadiz conocido llegaba a los compiladores por distintos alumnos en Medina, Kufa, Basora, Damasco y Egipto, gente que a menudo nunca se conoció. Un falsificador en una ciudad podía cambiar su copia, no las demás; poner las cadenas juntas muestra enseguida la que difiere.'),
    l: 'tradition',
    r: ['book:ibnsalah'],
  },
  {
    id: 'history',
    title: t('History checks the chain', 'L’histoire vérifie la chaîne', 'التاريخ يكشف الكذّاب', 'La historia comprueba la cadena'),
    text: t('Sufyan al-Thawri said: “When the narrators used lies, we used history against them.” A man who claimed to have heard a scholar in a city he never visited, or after that scholar’s death, was exposed by the dates.', 'Sufyan ath-Thawri dit : « Quand les transmetteurs ont usé du mensonge, nous avons usé contre eux de l’histoire. » Celui qui prétendait avoir entendu un savant dans une ville où il n’était jamais allé, ou après la mort de ce savant, était démasqué par les dates.', 'قال سفيان الثوري: «لما استعمل الرواة الكذب استعملنا لهم التاريخ». فمن ادّعى السماع من شيخ في بلد لم يدخله أو بعد موته فضحته التواريخ.', 'Sufyan az-Zawri dijo: «Cuando los transmisores usaron la mentira, usamos contra ellos la historia». Quien afirmaba haber oído a un sabio en una ciudad que nunca visitó, o después de su muerte, quedaba descubierto por las fechas.'),
    l: 'tradition',
    r: ['book:khatib'],
  },
  {
    id: 'no-favours',
    title: t('No favours, even for a father', 'Pas de faveur, même pour un père', 'لا محاباة ولو للآباء', 'Sin favores, ni siquiera para un padre'),
    text: t('Critics judged their own relatives. ‘Ali ibn al-Madini, asked about his father, first said “ask someone else”, then, when pressed: “This is the religion: my father is weak.” Pious ascetics were also rejected when they were careless: Yahya ibn Sa‘id al-Qattan said that he saw the righteous err in nothing more than in hadith, meaning by carelessness.', 'Les critiques jugeaient leurs propres proches. ‘Ali ibn al-Madini, interrogé sur son père, dit d’abord « demandez à un autre », puis, pressé : « C’est la religion : mon père est faible. » Des ascètes pieux étaient aussi rejetés quand ils étaient négligents : Yahya ibn Sa‘id al-Qattan dit qu’il n’avait vu les gens pieux se tromper en rien plus que dans le hadith, par négligence.', 'حكم النقاد على أقاربهم: سُئل علي بن المديني عن أبيه فقال: سلوا غيري، فلما ألحّوا قال: «هو الدين، إنه ضعيف». ورُدّت رواية بعض الزهاد لغفلتهم، وقال يحيى بن سعيد القطان: «لم نر الصالحين في شيء أكذب منهم في الحديث»، يريد الخطأ عن غفلة.', 'Los críticos juzgaban a sus propios parientes. ‘Ali ibn al-Madini, preguntado por su padre, dijo primero «preguntad a otro» y luego, insistido: «Es la religión: mi padre es débil». También se rechazaba a ascetas piadosos cuando eran descuidados: Yahya ibn Sa‘id al-Qattan dijo que no había visto a los piadosos errar en nada más que en el hadiz, por descuido.'),
    l: 'tradition',
    r: ['book:rijal', 'book:muslimintro'],
  },
  {
    id: 'warning',
    title: t('The heaviest warning against lying', 'La plus lourde mise en garde contre le mensonge', 'أشدّ الوعيد على الكذب', 'La advertencia más grave contra la mentira'),
    text: t('“Whoever lies about me deliberately, let him take his seat in the Fire” is reported from dozens of Companions, one of the most widely transmitted hadith. For believers it made narrating a matter of the afterlife. For a sceptic, the point is that the system did not rely on trust: every report still had to pass the tests.', '« Quiconque ment sur moi délibérément, qu’il prenne sa place dans le Feu » est rapporté par des dizaines de Compagnons, l’un des hadiths les plus largement transmis. Pour les croyants, transmettre devenait une affaire d’au-delà. Pour un sceptique, le fait est que le système ne reposait pas sur la confiance : chaque récit devait quand même passer les tests.', 'حديث «من كذب عليّ متعمدًا فليتبوأ مقعده من النار» رواه عشرات الصحابة، وهو من أشهر المتواتر. فصارت الرواية عند المؤمن أمرَ آخرة، ومع ذلك لم يقم النظام على الثقة وحدها، بل خضع كل حديث للفحص.', '«Quien mienta sobre mí deliberadamente, que ocupe su lugar en el Fuego» se transmite de decenas de Compañeros, uno de los hadices más difundidos. Para los creyentes, transmitir se volvió asunto del más allá. Para un escéptico, lo importante es que el sistema no se basaba en la confianza: cada relato debía pasar las pruebas igualmente.'),
    l: 'hadith',
    r: ['bukhari:110', 'bukhari:107'],
    quotes: [
      Q('lie', "مَنْ كَذَبَ عَلَىَّ مُتَعَمِّدًا فَلْيَتَبَوَّأْ مَقْعَدَهُ مِنَ النَّارِ", 'bukhari:110', t(
        'Whoever lies about me deliberately, let him take his seat in the Fire.',
        'Quiconque ment sur moi délibérément, qu’il prenne sa place dans le Feu.',
        'من أشهر الأحاديث المتواترة.',
        'Quien mienta sobre mí deliberadamente, que ocupe su lugar en el Fuego.',
      )),
    ],
  },
  {
    id: 'tested',
    title: t('Narrators were tested', 'Les transmetteurs étaient mis à l’épreuve', 'امتحان الرواة', 'Los transmisores eran puestos a prueba'),
    text: t('Critics swapped chains and texts on purpose to see whether a narrator noticed. Al-Khatib al-Baghdadi reports that the scholars of Baghdad gave al-Bukhari a hundred hadith with their chains mixed up, and he put every chain back with its text.', 'Les critiques échangeaient exprès chaînes et textes pour voir si le transmetteur s’en apercevait. Al-Khatib al-Baghdadi rapporte que les savants de Bagdad présentèrent à al-Bukhari cent hadiths aux chaînes mélangées, et qu’il remit chaque chaîne à son texte.', 'كان النقاد يقلبون الأسانيد والمتون عمدًا ليختبروا الراوي، وروى الخطيب البغدادي أن علماء بغداد قلبوا للبخاري مئة حديث، فردّ كل متن إلى إسناده.', 'Los críticos intercambiaban a propósito cadenas y textos para ver si el transmisor lo notaba. Al-Jatib al-Bagdadi cuenta que los sabios de Bagdad dieron a al-Bujari cien hadices con las cadenas mezcladas, y él devolvió cada cadena a su texto.'),
    l: 'tradition',
    r: ['book:khatib'],
  },
  {
    id: 'hammam',
    title: t('A test anyone can check: the sheet of Hammam', 'Un test vérifiable par tous : la feuille de Hammam', 'اختبار يمكن لكل أحد: صحيفة همام', 'Una prueba que cualquiera puede comprobar: la hoja de Hammam'),
    text: t('Hammam ibn Munabbih (d. about 131 AH) wrote down about 138 hadith from his teacher Abu Hurayrah. Manuscripts of his sheet were found and published by Muhammad Hamidullah in 1953. The same hadith, passed down separately through Ma‘mar and ‘Abd al-Razzaq, are in the Musnad of Ahmad and in al-Bukhari and Muslim a century later, and they agree with the manuscript.', 'Hammam ibn Munabbih (m. vers 131 H) mit par écrit environ 138 hadiths de son maître Abu Hurayra. Des manuscrits de sa feuille furent retrouvés et publiés par Muhammad Hamidullah en 1953. Les mêmes hadiths, transmis séparément par Ma‘mar et ‘Abd ar-Razzaq, figurent dans le Musnad d’Ahmad et chez al-Bukhari et Muslim un siècle plus tard, et ils concordent avec le manuscrit.', 'كتب همام بن منبه (ت نحو 131هـ) نحو 138 حديثًا عن شيخه أبي هريرة، وعُثر على مخطوطات صحيفته ونشرها محمد حميد الله سنة 1953. والأحاديث نفسها رُويت مستقلة من طريق معمر وعبد الرزاق في مسند أحمد وعند البخاري ومسلم بعد قرن، وهي موافقة للمخطوطة.', 'Hammam ibn Munabbih (m. hacia 131 H) escribió unos 138 hadices de su maestro Abu Hurayra. Se hallaron manuscritos de su hoja y Muhammad Hamidullah los publicó en 1953. Los mismos hadices, transmitidos por separado a través de Ma‘mar y ‘Abd ar-Razzaq, están en el Musnad de Ahmad y en al-Bujari y Muslim un siglo después, y concuerdan con el manuscrito.'),
    l: 'tradition',
    r: ['book:hammam', 'bukhari:113'],
  },
  {
    id: 'research',
    title: t('What modern research found', 'Ce qu’a trouvé la recherche moderne', 'ما وجده البحث الحديث', 'Lo que halló la investigación moderna'),
    text: t('In the 19th and 20th centuries some Western scholars, such as Goldziher and Schacht, argued that much of the hadith was put into circulation later. Later studies of the earliest sources, by M. M. al-A‘zami and by Harald Motzki on the Musannaf of ‘Abd al-Razzaq, dated a large part of the material to the first century AH and found the chains far more reliable than the sceptics had assumed. The debate continues; the evidence is in the manuscripts, and anyone can read it.', 'Aux XIXe et XXe siècles, des savants occidentaux comme Goldziher et Schacht ont soutenu qu’une grande partie des hadiths avait été mise en circulation plus tard. Des études ultérieures des sources les plus anciennes, par M. M. al-A‘zami et par Harald Motzki sur le Musannaf de ‘Abd ar-Razzaq, ont daté une grande part du matériau du Ier siècle H et trouvé les chaînes bien plus fiables que ne le supposaient les sceptiques. Le débat continue ; les preuves sont dans les manuscrits, et chacun peut les lire.', 'في القرنين التاسع عشر والعشرين رأى بعض المستشرقين كغولدتسيهر وشاخت أن كثيرًا من الحديث وُضع متأخرًا، ثم أرّخت دراسات لاحقة للمصادر المبكرة، كدراسات محمد مصطفى الأعظمي ودراسة هارالد موتسكي لمصنّف عبد الرزاق، جزءًا كبيرًا من المادة بالقرن الأول، ووجدت الأسانيد أوثق بكثير مما ظنّ المشككون. والنقاش قائم، والأدلة في المخطوطات لمن شاء أن يقرأ.', 'En los siglos XIX y XX algunos estudiosos occidentales, como Goldziher y Schacht, sostuvieron que gran parte de los hadices se puso en circulación más tarde. Estudios posteriores de las fuentes más antiguas, de M. M. al-A‘zami y de Harald Motzki sobre el Musannaf de ‘Abd ar-Razzaq, dataron gran parte del material en el siglo I H y hallaron las cadenas mucho más fiables de lo que suponían los escépticos. El debate sigue; las pruebas están en los manuscritos y cualquiera puede leerlas.'),
    l: 'tradition',
    r: ['book:azami', 'book:motzki'],
  },
]

/** The Qur'an and the hadith: what is the same and what is not. */
export const COMPARE: { topic: L4; quran: L4; hadith: L4 }[] = [
  {
    topic: t('How it was passed on', 'Comment il a été transmis', 'طريقة النقل', 'Cómo se transmitió'),
    quran: t('Every word, by whole communities in every generation (tawatur), recited aloud and written; gathered in one book under Abu Bakr, copies sent out under ‘Uthman.', 'Chaque mot, par des communautés entières à chaque génération (tawatur), récité à voix haute et écrit ; réuni en un livre sous Abu Bakr, copies envoyées sous ‘Uthman.', 'كل كلمة نقلها الجمع عن الجمع في كل جيل (التواتر) تلاوةً وكتابة، وجُمع في مصحف في عهد أبي بكر، ونُسخت المصاحف وأُرسلت في عهد عثمان.', 'Cada palabra, por comunidades enteras en cada generación (tawatur), recitada en voz alta y escrita; reunido en un libro con Abu Bakr y copias enviadas con ‘Uzman.'),
    hadith: t('Report by report, each with its own chain; a few by tawatur, most by fewer narrators (ahad).', 'Récit par récit, chacun avec sa chaîne ; quelques-uns par tawatur, la plupart par moins de transmetteurs (ahad).', 'حديثًا حديثًا، لكلٍّ إسناده؛ بعضه متواتر وأكثره آحاد.', 'Relato a relato, cada uno con su cadena; unos pocos por tawatur, la mayoría por menos transmisores (ahad).'),
  },
  {
    topic: t('Certainty', 'Certitude', 'درجة الثبوت', 'Certeza'),
    quran: t('All of it is certain, word for word.', 'Tout est certain, mot pour mot.', 'كله قطعي الثبوت حرفًا حرفًا.', 'Todo es cierto, palabra por palabra.'),
    hadith: t('Graded one by one: mutawatir is certain; sahih and hasan are accepted; da‘if and mawdu‘ are labelled and set aside.', 'Jugé un à un : le mutawatir est certain ; sahih et hasan sont acceptés ; da‘if et mawdu‘ sont signalés et écartés.', 'يُحكم على كل حديث: المتواتر قطعي، والصحيح والحسن مقبولان، والضعيف والموضوع مبيّنان مردودان.', 'Se juzga uno a uno: el mutawatir es cierto; sahih y hasan se aceptan; da‘if y mawdu‘ se señalan y se apartan.'),
  },
  {
    topic: t('Wording', 'Formulation', 'اللفظ', 'Redacción'),
    quran: t('The exact words of God; recited in the prayer.', 'Les mots exacts de Dieu ; récités dans la prière.', 'كلام الله بلفظه، ويُتعبَّد بتلاوته في الصلاة.', 'Las palabras exactas de Dios; se recitan en la oración.'),
    hadith: t('The meaning is preserved; narrators sometimes reported it in their own words, which is why versions can differ slightly.', 'Le sens est préservé ; les transmetteurs l’ont parfois rapporté avec leurs propres mots, d’où de légères différences entre versions.', 'المعنى محفوظ، وربما رواه الراوي بالمعنى، ولذلك تختلف الألفاظ يسيرًا بين الروايات.', 'El sentido se conserva; a veces los transmisores lo contaron con sus palabras, por eso las versiones pueden variar un poco.'),
  },
]

export const COMPARE_REFS: Ref[] = ['15:9', '16:44', 'bukhari:4986', 'bukhari:4987']

export const OBJECTIONS: HsPoint[] = [
  {
    id: 'late',
    title: t('“Weren’t the hadith written two hundred years after the Prophet?”', '« Les hadiths n’ont-ils pas été écrits deux cents ans après le Prophète ? »', '«أليس الحديث قد كُتب بعد النبي بمئتي سنة؟»', '«¿No se escribieron los hadices doscientos años después del Profeta?»'),
    text: t('No. Writing began in his lifetime, notebooks existed in the first century, and an official collection was ordered around 100 AH. Al-Bukhari’s book is a selection from earlier written and memorised material, and some of his chains have only three people between him and the Prophet ﷺ.', 'Non. L’écriture a commencé de son vivant, des cahiers existaient au Ier siècle, et une collecte officielle fut ordonnée vers 100 H. Le livre d’al-Bukhari est une sélection de matériaux antérieurs écrits et mémorisés, et certaines de ses chaînes n’ont que trois personnes entre lui et le Prophète ﷺ.', 'لا. بدأت الكتابة في حياته ﷺ، ووُجدت الصحف في القرن الأول، وأُمر بالتدوين الرسمي نحو سنة 100هـ. وصحيح البخاري انتقاء من مادة مكتوبة ومحفوظة قبله، وفيه أسانيد ليس بينه وبين النبي ﷺ فيها إلا ثلاثة رواة.', 'No. La escritura empezó en vida del Profeta, había cuadernos en el siglo I y se ordenó una recopilación oficial hacia 100 H. El libro de al-Bujari es una selección de material anterior escrito y memorizado, y algunas de sus cadenas solo tienen tres personas entre él y el Profeta ﷺ.'),
    l: 'tradition',
    r: ['bukhari:113', 'book:hammam', 'book:hadysari'],
  },
  {
    id: 'forged',
    title: t('“People forged hadith for politics, so how can any be trusted?”', '« Des gens ont forgé des hadiths pour la politique ; comment en croire un seul ? »', '«وُضعت أحاديث لأغراض سياسية، فكيف يُوثق بشيء منها؟»', '«Se falsificaron hadices por política; ¿cómo fiarse de alguno?»'),
    text: t('Yes, some did, and Muslim scholars were the first to say so: the chain of narrators was demanded precisely because of it, the forgers were named, and their reports were collected in books of fabrications. A forged banknote does not make all money fake; it means that money is checked.', 'Oui, certains l’ont fait, et les savants musulmans ont été les premiers à le dire : la chaîne de transmetteurs fut exigée justement pour cela, les faussaires furent nommés et leurs récits rassemblés dans des livres de faux. Un faux billet ne rend pas toute la monnaie fausse ; il montre qu’il faut la vérifier.', 'نعم وُضع بعضها، وكان علماء المسلمين أول من بيّن ذلك: طُلب الإسناد لأجله، وسُمّي الوضّاعون، وجُمعت موضوعاتهم في كتب. والورقة النقدية المزوّرة لا تجعل النقود كلها مزوّرة، بل توجب فحصها.', 'Sí, algunos lo hicieron, y los sabios musulmanes fueron los primeros en decirlo: la cadena de transmisores se exigió precisamente por eso, se nombró a los falsificadores y sus relatos se reunieron en libros de falsedades. Un billete falso no hace falso todo el dinero; obliga a comprobarlo.'),
    l: 'tradition',
    r: ['book:muslimintro', 'book:mawduat'],
  },
  {
    id: 'circular',
    title: t('“Isn’t it circular for Muslims to judge Muslim narrators?”', '« N’est-ce pas circulaire que des musulmans jugent des transmetteurs musulmans ? »', '«أليس حكم المسلمين على رواة مسلمين دورًا؟»', '«¿No es circular que musulmanes juzguen a transmisores musulmanes?»'),
    text: t('The tests are external and can be checked: dates, places, and whether independent students of the same teacher agree. The critics disagreed openly and wrote down their reasons, and they judged their own relatives. The data is published; anyone can trace a chain today.', 'Les tests sont externes et vérifiables : dates, lieux, et accord entre élèves indépendants d’un même maître. Les critiques étaient ouvertement en désaccord et écrivaient leurs raisons, et ils jugeaient leurs propres proches. Les données sont publiées ; chacun peut suivre une chaîne aujourd’hui.', 'المعايير خارجية قابلة للفحص: التواريخ والأماكن واتفاق تلاميذ الشيخ المستقلين. واختلف النقاد علنًا ودوّنوا أسبابهم، وحكموا على أقاربهم. والمادة منشورة، ويمكن لأي أحد تتبّع الإسناد اليوم.', 'Las pruebas son externas y comprobables: fechas, lugares y si coinciden alumnos independientes del mismo maestro. Los críticos discrepaban abiertamente y escribían sus razones, y juzgaban a sus propios parientes. Los datos están publicados; cualquiera puede seguir una cadena hoy.'),
    l: 'tradition',
    r: ['book:rijal'],
  },
  {
    id: 'contradict',
    title: t('“Some hadith contradict others.”', '« Certains hadiths en contredisent d’autres. »', '«بعض الأحاديث يعارض بعضًا»', '«Algunos hadices contradicen a otros»'),
    text: t('Scholars collected the apparent conflicts and explained them: often one abrogated the other, or they speak of different situations or people. Al-Shafi‘i (Ikhtilaf al-Hadith) and Ibn Qutaybah (Ta’wil Mukhtalif al-Hadith) wrote whole books on this.', 'Les savants ont rassemblé les contradictions apparentes et les ont expliquées : souvent l’un abroge l’autre, ou ils parlent de situations ou de personnes différentes. Ash-Shafi‘i (Ikhtilaf al-Hadith) et Ibn Qutayba (Ta’wil Mukhtalif al-Hadith) y ont consacré des livres entiers.', 'جمع العلماء ما ظاهره التعارض وبيّنوه: فقد يكون أحدهما ناسخًا، أو يكونان في حالين أو شخصين مختلفين. وصنّف الشافعي «اختلاف الحديث» وابن قتيبة «تأويل مختلف الحديث».', 'Los sabios reunieron las contradicciones aparentes y las explicaron: a menudo uno abroga al otro, o hablan de situaciones o personas distintas. Ash-Shafi‘i (Ijtilaf al-Hadiz) e Ibn Qutayba (Ta’wil Mujtalif al-Hadiz) dedicaron libros enteros a ello.'),
    l: 'tradition',
    r: ['book:mukhtalif'],
  },
  {
    id: 'quran-only',
    title: t('“Why not follow the Qur’an alone?”', '« Pourquoi ne pas suivre le Coran seul ? »', '«لماذا لا نكتفي بالقرآن؟»', '«¿Por qué no seguir solo el Corán?»'),
    text: t('The Qur’an itself tells believers to take what the Messenger gives them, says that obeying him is obeying God, and that he was sent to explain it. How to pray, how much zakat to give and how to perform the pilgrimage are known from the Sunnah.', 'Le Coran lui-même demande aux croyants de prendre ce que le Messager leur donne, dit que lui obéir c’est obéir à Dieu, et qu’il a été envoyé pour l’expliquer. Comment prier, combien donner en zakat et comment accomplir le pèlerinage se savent par la Sunna.', 'القرآن نفسه يأمر بأخذ ما آتى الرسول، ويجعل طاعته طاعة لله، ويخبر أنه بُعث ليبيّن للناس ما نُزّل إليهم. وصفة الصلاة ومقادير الزكاة ومناسك الحج إنما عُرفت بالسنة.', 'El propio Corán pide a los creyentes tomar lo que el Mensajero les da, dice que obedecerle es obedecer a Dios y que fue enviado para explicarlo. Cómo rezar, cuánto dar de zakat y cómo hacer la peregrinación se saben por la Sunna.'),
    l: 'quran',
    r: ['59:7', '4:80', '16:44'],
  },
]

/** The hadith quoted on this page, for the checker. */
export const HADITH_SCIENCE_QUOTES: (Supplication & { where: string })[] = [
  { where: 'hadith/chain', ...CHAIN_TEXT },
  ...[...TIMELINE, ...SAFEGUARDS].flatMap((p) => (p.quotes ?? []).map((d) => ({ where: `hadith/${p.id}/${d.id}`, ...d }))),
]

/** References with no quote, for the checker. */
export const HADITH_SCIENCE_REFS: { where: string; r: Ref[] }[] = [
  ...[...TIMELINE, ...CONDITIONS, ...SAFEGUARDS, ...OBJECTIONS].map((p) => ({ where: `hadith/${p.id}`, r: p.r.filter((r) => !r.startsWith('book:')) })),
  { where: 'hadith/compare', r: COMPARE_REFS },
]
