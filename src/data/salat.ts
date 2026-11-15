// The prayer (salat): what it is, what comes before it, the ablution (wudu), how to pray step by step,
// the voluntary prayers of the Sunnah, and the remembrance after it.
// Every Arabic hadith is copied from the hadith it cites and checked by `npm run verify:duas`.
// Qur'an verses are cited, never typed: they open in the Mushaf.
// The steps follow the hadith; where the four schools differ, the note gives the Maliki practice followed in Morocco.
import type { L4, Ref } from './types'
import type { Supplication } from './duas'
import type { HourStep } from './hour'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })
const q = (id: string, ar: string, meaning: L4, r: Ref[], extra: Partial<Supplication> = {}): Supplication => ({ id, ar, meaning, r, l: 'hadith', ...extra })
const SAHIH_ALBANI = t('Sahih (al-Albani)', 'Sahih (al-Albani)', 'صحيح (الألباني)', 'Sahih (al-Albani)')
const HASAN_SAHIH_ALBANI = t('Hasan sahih (al-Albani)', 'Hasan sahih (al-Albani)', 'حسن صحيح (الألباني)', 'Hasan sahih (al-Albani)')

/** The body's position in a step, drawn as a small figure. */
export type Pose = 'stand' | 'bow' | 'prostrate' | 'sit' | 'salam'

export interface SalatStep extends HourStep {
  pose?: Pose
}

/** One obligatory prayer: how many rak‘ahs, how many of them are recited aloud, where the first sitting comes. */
export interface PrayerPlan {
  id: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'
  rakahs: number
  /** The first rak‘ahs whose recitation is aloud (0 = all silent). */
  aloud: number
}

export const PRAYER_PLAN: PrayerPlan[] = [
  { id: 'fajr', rakahs: 2, aloud: 2 },
  { id: 'dhuhr', rakahs: 4, aloud: 0 },
  { id: 'asr', rakahs: 4, aloud: 0 },
  { id: 'maghrib', rakahs: 3, aloud: 2 },
  { id: 'isha', rakahs: 4, aloud: 2 },
]

/* ------------------------------------------------------------------ what the prayer is */

export const SALAT_WHAT: SalatStep[] = [
  {
    id: 'pillar',
    title: t('The second pillar of Islam', 'Le deuxième pilier de l’islam', 'الركن الثاني من أركان الإسلام', 'El segundo pilar del islam'),
    text: t(
      'After the testimony of faith, the prayer is the first pillar a Muslim lives every day. In Arabic, salat first means supplication; in the Shari‘ah it is a worship of set words and movements that begins with “Allahu akbar” and ends with the salam.',
      'Après l’attestation de foi, la prière est le premier pilier que le musulman vit chaque jour. En arabe, salat signifie d’abord invocation ; dans la Charia, c’est une adoration faite de paroles et de gestes définis, qui commence par « Allahu akbar » et se termine par le salam.',
      'الصلاة بعد الشهادتين أول ركن يعيشه المسلم كل يوم. وهي في اللغة الدعاء، وفي الشرع عبادة ذات أقوال وأفعال مخصوصة، مفتتحة بالتكبير مختتمة بالتسليم.',
      'Tras el testimonio de fe, la oración es el primer pilar que el musulmán vive cada día. En árabe, salat significa ante todo súplica; en la Sharía es una adoración de palabras y gestos fijados que empieza con «Allahu akbar» y termina con el salam.',
    ),
    l: 'hadith',
    r: ['bukhari:8', '2:43', '20:14'],
    quotes: [
      q(
        'islam-five',
        'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ',
        t(
          'Islam is built on five: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, giving the zakat, the Hajj, and fasting Ramadan.',
          'L’islam est bâti sur cinq : attester qu’il n’y a de dieu qu’Allah et que Muhammad est le Messager d’Allah, accomplir la prière, donner la zakat, le Hajj et le jeûne de Ramadan.',
          'الصلاة ثاني ما بُني عليه الإسلام بعد الشهادتين.',
          'El islam está construido sobre cinco: atestiguar que no hay dios sino Allah y que Muhammad es el Mensajero de Allah, establecer la oración, dar el zakat, el Hayy y ayunar Ramadán.',
        ),
        ['bukhari:8'],
      ),
    ],
  },
  {
    id: 'miraj',
    title: t('Given in the Night Journey', 'Prescrite lors du Voyage nocturne', 'فُرضت ليلة المعراج', 'Prescrita en el Viaje nocturno'),
    text: t(
      'Allah prescribed the prayer directly, without an angel between, on the night of the Ascension (al-Mi‘raj): first fifty prayers, lightened to five that weigh as fifty.',
      'Allah a prescrit la prière directement, sans ange intermédiaire, la nuit de l’Ascension (al-Mi‘raj) : d’abord cinquante prières, allégées à cinq qui en valent cinquante.',
      'فرضها الله ليلة المعراج دون واسطة ملك: خمسين صلاة ثم خُففت إلى خمس بأجر خمسين.',
      'Allah prescribió la oración directamente, sin ángel intermediario, en la noche de la Ascensión (al-Mi‘ray): primero cincuenta oraciones, aligeradas a cinco que valen por cincuenta.',
    ),
    l: 'hadith',
    r: ['bukhari:349', '17:1'],
    quotes: [
      q(
        'fifty-five',
        'هِيَ خَمْسٌ وَهْىَ خَمْسُونَ، لاَ يُبَدَّلُ الْقَوْلُ لَدَىَّ',
        t(
          'They are five, and they are fifty: My word does not change.',
          'Elles sont cinq, et elles sont cinquante : Ma parole ne change pas.',
          'خمس في العدد، خمسون في الأجر.',
          'Son cinco, y son cincuenta: Mi palabra no cambia.',
        ),
        ['bukhari:349'],
      ),
    ],
  },
  {
    id: 'five',
    title: t('Five prayers, at their times', 'Cinq prières, à leurs heures', 'خمس صلوات في أوقاتها', 'Cinco oraciones, a su hora'),
    text: t(
      'Fajr (2 rak‘ahs), Dhuhr (4), ‘Asr (4), Maghrib (3) and ‘Isha (4), each within its own time. ‘A’ishah explains that the prayer was first two rak‘ahs; the traveller’s prayer stayed so and the resident’s was increased.',
      'Fajr (2 rak‘as), Dhuhr (4), ‘Asr (4), Maghrib (3) et ‘Isha (4), chacune dans son temps. ‘A’icha explique que la prière fut d’abord de deux rak‘as ; celle du voyageur resta ainsi et celle du résident fut augmentée.',
      'الفجر ركعتان، والظهر أربع، والعصر أربع، والمغرب ثلاث، والعشاء أربع، كلٌّ في وقتها. وبيّنت عائشة أنها فُرضت ركعتين فأُقرّت صلاة السفر وزيد في صلاة الحضر.',
      'Fayr (2 rak‘as), Duhr (4), ‘Asr (4), Magrib (3) e ‘Isha (4), cada una en su tiempo. ‘A’isha explica que la oración fue primero de dos rak‘as; la del viajero quedó así y la del residente se aumentó.',
    ),
    l: 'quran',
    r: ['4:103', '11:114', '17:78', 'bukhari:350'],
    quotes: [
      q(
        'two-two',
        'فَرَضَ اللَّهُ الصَّلاَةَ حِينَ فَرَضَهَا رَكْعَتَيْنِ رَكْعَتَيْنِ فِي الْحَضَرِ وَالسَّفَرِ، فَأُقِرَّتْ صَلاَةُ السَّفَرِ، وَزِيدَ فِي صَلاَةِ الْحَضَرِ',
        t(
          'When Allah prescribed the prayer, He prescribed it as two rak‘ahs and two rak‘ahs, at home and on a journey. The traveller’s prayer was kept so, and the resident’s prayer was increased.',
          'Quand Allah a prescrit la prière, Il l’a prescrite par deux rak‘as et deux rak‘as, chez soi comme en voyage. La prière du voyageur fut maintenue ainsi, et celle du résident fut augmentée.',
          'أصل الصلاة ركعتان، وزيد في صلاة المقيم.',
          'Cuando Allah prescribió la oración, la prescribió de dos en dos rak‘as, en casa y de viaje. La oración del viajero se mantuvo así y la del residente se aumentó.',
        ),
        ['bukhari:350'],
      ),
    ],
  },
  {
    id: 'virtue',
    title: t('The deed Allah loves most', 'L’œuvre qu’Allah aime le plus', 'أحب الأعمال إلى الله', 'La obra que Allah más ama'),
    text: t(
      'The prayer on time is the deed Allah loves most. It keeps from indecency and wrong, and the five prayers wash away sins as a river at the door washes a body five times a day.',
      'La prière à son heure est l’œuvre qu’Allah aime le plus. Elle préserve de la turpitude et du blâmable, et les cinq prières effacent les péchés comme une rivière devant la porte lave le corps cinq fois par jour.',
      'الصلاة على وقتها أحب الأعمال إلى الله، تنهى عن الفحشاء والمنكر، والصلوات الخمس يمحو الله بها الخطايا كالنهر يغتسل فيه المرء خمس مرات.',
      'La oración a su hora es la obra que Allah más ama. Aparta de la indecencia y de lo reprobable, y las cinco oraciones borran los pecados como un río a la puerta lava el cuerpo cinco veces al día.',
    ),
    l: 'hadith',
    r: ['bukhari:527', 'bukhari:528', '29:45'],
    quotes: [
      q(
        'best-deed',
        'أَيُّ الْعَمَلِ أَحَبُّ إِلَى اللَّهِ؟ قَالَ: الصَّلاَةُ عَلَى وَقْتِهَا',
        t(
          '“Which deed does Allah love most?” He said: “The prayer at its time.”',
          '« Quelle œuvre Allah aime-t-Il le plus ? » Il dit : « La prière à son heure. »',
          'سأله ابن مسعود فقدّم الصلاة في وقتها على سائر الأعمال.',
          '«¿Qué obra ama Allah más?» Dijo: «La oración a su hora.»',
        ),
        ['bukhari:527'],
      ),
      q(
        'river',
        'أَرَأَيْتُمْ لَوْ أَنَّ نَهَرًا بِبَابِ أَحَدِكُمْ، يَغْتَسِلُ فِيهِ كُلَّ يَوْمٍ خَمْسًا، مَا تَقُولُ ذَلِكَ يُبْقِي مِنْ دَرَنِهِ؟ قَالُوا: لاَ يُبْقِي مِنْ دَرَنِهِ شَيْئًا. قَالَ: فَذَلِكَ مِثْلُ الصَّلَوَاتِ الْخَمْسِ، يَمْحُو اللَّهُ بِهَا الْخَطَايَا',
        t(
          '“If there were a river at the door of one of you and he bathed in it five times every day, would any dirt remain on him?” They said: “No dirt would remain.” He said: “That is the likeness of the five prayers: through them Allah wipes out sins.”',
          '« Si une rivière coulait à la porte de l’un de vous et qu’il s’y lavait cinq fois par jour, lui resterait-il de la saleté ? » Ils dirent : « Il ne lui en resterait rien. » Il dit : « Tel est l’exemple des cinq prières : par elles Allah efface les péchés. »',
          'مثلٌ ضربه النبي ﷺ لتكفير الصلوات الخمس للخطايا.',
          '«Si hubiera un río a la puerta de uno de vosotros y se bañara en él cinco veces al día, ¿le quedaría suciedad?» Dijeron: «No le quedaría nada.» Dijo: «Así son las cinco oraciones: con ellas Allah borra los pecados.»',
        ),
        ['bukhari:528'],
      ),
    ],
  },
  {
    id: 'leaving',
    title: t('Not to be left', 'À ne pas délaisser', 'لا تُترك', 'No se abandona'),
    text: t(
      'The Prophet ﷺ made leaving the prayer the line between a person and disbelief. The scholars differ on whether this means one who denies it or also one who neglects it out of laziness; all agree it is among the gravest of sins.',
      'Le Prophète ﷺ a fait de l’abandon de la prière la limite entre l’homme et la mécréance. Les savants divergent : vise-t-il celui qui la nie ou aussi celui qui la délaisse par paresse ? Tous s’accordent à en faire l’un des plus graves péchés.',
      'جعل النبي ﷺ ترك الصلاة فاصلًا بين المرء والكفر، واختلف العلماء أيُراد الجاحد وحده أم التارك كسلًا أيضًا، واتفقوا على أنه من أعظم الكبائر.',
      'El Profeta ﷺ hizo del abandono de la oración la línea entre la persona y la incredulidad. Los sabios difieren sobre si se refiere a quien la niega o también a quien la descuida por pereza; todos coinciden en que es de los pecados más graves.',
    ),
    l: 'hadith',
    r: ['muslim:82', '19:59'],
    quotes: [
      q(
        'kufr',
        'إِنَّ بَيْنَ الرَّجُلِ وَبَيْنَ الشِّرْكِ وَالْكُفْرِ تَرْكَ الصَّلاَةِ',
        t(
          'Between a man and associating partners and disbelief is leaving the prayer.',
          'Entre l’homme et l’associationnisme et la mécréance, il y a l’abandon de la prière.',
          'ترك الصلاة هو الحدّ الفاصل.',
          'Entre el hombre y la idolatría y la incredulidad está el abandono de la oración.',
        ),
        ['muslim:82'],
      ),
    ],
  },
]

/* ------------------------------------------------------------------ before the prayer */

export const SALAT_BEFORE: SalatStep[] = [
  {
    id: 'purity',
    title: t('Purity', 'La pureté', 'الطهارة', 'La pureza'),
    text: t(
      'The prayer needs purity: the ablution (wudu) after going to the toilet, passing wind or deep sleep, and the full bath (ghusl) after intercourse, menstruation or childbirth bleeding. With no water, or when water would harm, the dry ablution (tayammum) with clean earth replaces them.',
      'La prière exige la pureté : les ablutions (wudu) après être allé aux toilettes, un vent ou un sommeil profond, et le bain complet (ghusl) après les rapports, les menstrues ou les lochies. Sans eau, ou si l’eau nuit, l’ablution sèche (tayammum) avec une terre propre les remplace.',
      'لا تصح الصلاة إلا بطهارة: الوضوء من الحدث الأصغر (كالبول والغائط والريح والنوم المستغرق)، والغسل من الجنابة والحيض والنفاس، ويقوم التيمم بالصعيد الطيب مقامهما عند فقد الماء أو الضرر باستعماله.',
      'La oración exige pureza: la ablución (wudu) tras ir al baño, una ventosidad o un sueño profundo, y el baño completo (gusl) tras las relaciones, la menstruación o el sangrado del parto. Sin agua, o si el agua daña, la ablución seca (tayammum) con tierra limpia los sustituye.',
    ),
    l: 'quran',
    r: ['5:6', '4:43', 'muslim:224', 'bukhari:135'],
    quotes: [
      q(
        'no-purity',
        'لاَ تُقْبَلُ صَلاَةٌ بِغَيْرِ طُهُورٍ وَلاَ صَدَقَةٌ مِنْ غُلُولٍ',
        t(
          'No prayer is accepted without purification, and no charity from stolen spoils.',
          'Aucune prière n’est acceptée sans purification, ni aucune aumône issue d’un butin détourné.',
          'الطهارة شرط لقبول الصلاة.',
          'No se acepta oración sin purificación, ni limosna de un botín robado.',
        ),
        ['muslim:224'],
      ),
      q(
        'hadath',
        'لاَ تُقْبَلُ صَلاَةُ مَنْ أَحْدَثَ حَتَّى يَتَوَضَّأَ',
        t(
          'The prayer of one who has broken his ablution is not accepted until he performs it again.',
          'La prière de celui qui a rompu ses ablutions n’est pas acceptée tant qu’il ne les refait pas.',
          'من انتقض وضوؤه لم تصح صلاته حتى يتوضأ.',
          'No se acepta la oración de quien ha roto su ablución hasta que la repita.',
        ),
        ['bukhari:135'],
      ),
    ],
  },
  {
    id: 'clean',
    title: t('Clean body, clothes and place', 'Corps, vêtements et lieu propres', 'طهارة البدن والثوب والمكان', 'Cuerpo, ropa y lugar limpios'),
    text: t(
      'Remove any impurity (urine, blood and the like) from the body, the clothes and the place of prayer. Any clean ground is a place of prayer.',
      'Enlever toute impureté (urine, sang, etc.) du corps, des vêtements et du lieu de prière. Toute terre propre est un lieu de prière.',
      'إزالة النجاسة (كالبول والدم) عن البدن والثوب ومكان الصلاة، وكل أرض طاهرة مسجد.',
      'Quitar toda impureza (orina, sangre y similares) del cuerpo, la ropa y el lugar de oración. Toda tierra limpia es lugar de oración.',
    ),
    l: 'quran',
    r: ['74:4', '2:222'],
  },
  {
    id: 'cover',
    title: t('Covered', 'Être couvert', 'ستر العورة', 'Cubierto'),
    text: t(
      'Wear clothes that cover what must be covered: for a man at least from the navel to the knees, for a woman the whole body except the face and the hands, according to the majority of scholars.',
      'Porter des vêtements qui couvrent ce qui doit l’être : pour l’homme au moins du nombril aux genoux, pour la femme tout le corps sauf le visage et les mains, selon la majorité des savants.',
      'لبس ما يستر العورة: للرجل من السرة إلى الركبة على الأقل، وللمرأة جميع البدن إلا الوجه والكفين عند جمهور العلماء.',
      'Vestir ropa que cubra lo que debe cubrirse: para el hombre al menos del ombligo a las rodillas, para la mujer todo el cuerpo salvo el rostro y las manos, según la mayoría de los sabios.',
    ),
    l: 'quran',
    r: ['7:31'],
  },
  {
    id: 'time',
    title: t('The time has come in', 'L’heure est entrée', 'دخول الوقت', 'Ha entrado la hora'),
    text: t(
      'Each prayer has a time that begins and ends. A prayer before its time is not valid; delaying it past its time without an excuse is a sin. The times for your place are on the prayer times page.',
      'Chaque prière a un temps qui commence et finit. Une prière avant son temps n’est pas valide ; la retarder au-delà sans excuse est un péché. Les horaires de votre lieu sont sur la page des horaires.',
      'لكل صلاة وقت له أول وآخر، فلا تصح قبل وقتها، وتأخيرها عنه بلا عذر إثم. ومواقيت مكانك في صفحة المواقيت.',
      'Cada oración tiene un tiempo que empieza y acaba. Una oración antes de su tiempo no es válida; retrasarla más allá sin excusa es pecado. Los horarios de tu lugar están en la página de horarios.',
    ),
    l: 'quran',
    r: ['4:103'],
  },
  {
    id: 'qibla',
    title: t('Facing the Ka‘bah', 'Face à la Ka‘ba', 'استقبال القبلة', 'Frente a la Ka‘ba'),
    text: t(
      'Face the direction of the Sacred Mosque in Makkah (the qiblah) from wherever you are.',
      'Se tourner vers la Mosquée sacrée de La Mecque (la qibla) où que l’on soit.',
      'التوجه إلى المسجد الحرام حيثما كنت.',
      'Orientarse hacia la Mezquita Sagrada de La Meca (la alquibla) desde donde se esté.',
    ),
    l: 'quran',
    r: ['2:144'],
  },
  {
    id: 'niyya',
    title: t('The intention', 'L’intention', 'النية', 'La intención'),
    text: t(
      'Know in your heart which prayer you are about to pray. The intention is in the heart; no words need to be said for it.',
      'Savoir dans son cœur quelle prière on va accomplir. L’intention est dans le cœur ; aucune parole n’est nécessaire.',
      'أن يعلم بقلبه أيّ صلاة يصلي، ومحل النية القلب فلا يلزم التلفظ بها.',
      'Saber en el corazón qué oración se va a rezar. La intención está en el corazón; no hace falta decir nada.',
    ),
    l: 'hadith',
    r: ['bukhari:1'],
    quotes: [
      q(
        'niyya',
        'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
        t(
          'Deeds are only by intentions, and each person has only what he intended.',
          'Les actes ne valent que par les intentions, et chacun n’a que ce qu’il a eu l’intention de faire.',
          'أول حديث في صحيح البخاري، وعليه مدار الأعمال.',
          'Las obras solo valen por las intenciones, y cada uno tiene solo lo que pretendió.',
        ),
        ['bukhari:1'],
      ),
    ],
  },
  {
    id: 'exempt',
    title: t('Who does not pray', 'Qui ne prie pas', 'من لا تجب عليه', 'Quién no reza'),
    text: t(
      'The prayer is due from every Muslim who is sane and has reached puberty. A woman does not pray during menstruation or the bleeding after childbirth, and does not make those prayers up afterwards. A sick person prays as he can: standing, sitting, or lying down.',
      'La prière est due par tout musulman sain d’esprit et pubère. La femme ne prie pas pendant les menstrues ou les lochies, et ne rattrape pas ces prières ensuite. Le malade prie comme il peut : debout, assis ou couché.',
      'تجب على كل مسلم بالغ عاقل. ولا تصلي الحائض والنفساء ولا تقضيان الصلاة، ويصلي المريض بحسب استطاعته قائمًا أو قاعدًا أو على جنب.',
      'La oración es obligatoria para todo musulmán cuerdo y púber. La mujer no reza durante la menstruación ni el sangrado del parto, y no recupera después esas oraciones. El enfermo reza como puede: de pie, sentado o tumbado.',
    ),
    l: 'hadith',
    r: ['bukhari:304', 'bukhari:1117', '2:286'],
    quotes: [
      q(
        'hayd',
        'أَلَيْسَ إِذَا حَاضَتْ لَمْ تُصَلِّ وَلَمْ تَصُمْ',
        t(
          'Is it not so that when she menstruates she neither prays nor fasts?',
          'N’est-il pas vrai que, lorsqu’elle a ses règles, elle ne prie pas et ne jeûne pas ?',
          'الحائض لا تصلي ولا تصوم، وتقضي الصوم دون الصلاة.',
          '¿No es cierto que, cuando menstrúa, no reza ni ayuna?',
        ),
        ['bukhari:304'],
      ),
    ],
  },
]

/* ------------------------------------------------------------------ the ablution */

export const WUDU_STEPS: SalatStep[] = [
  {
    id: 'hands',
    title: t('Wash the hands', 'Laver les mains', 'غسل الكفين', 'Lavar las manos'),
    text: t(
      'With the intention in your heart, pour water over both hands and wash them three times. This is how ‘Uthman showed the Prophet’s ablution, and he gave its reward.',
      'Avec l’intention dans le cœur, verser de l’eau sur les deux mains et les laver trois fois. C’est ainsi que ‘Uthman a montré les ablutions du Prophète, et il en a donné la récompense.',
      'مع النية في القلب، يُفرغ الماء على كفيه فيغسلهما ثلاثًا. هكذا وصف عثمان وضوء النبي ﷺ وذكر ثوابه.',
      'Con la intención en el corazón, verter agua sobre ambas manos y lavarlas tres veces. Así mostró ‘Uzmán la ablución del Profeta, y transmitió su recompensa.',
    ),
    l: 'hadith',
    r: ['bukhari:159', '5:6'],
    quotes: [
      q(
        'uthman-wudu',
        'دَعَا بِإِنَاءٍ، فَأَفْرَغَ عَلَى كَفَّيْهِ ثَلاَثَ مِرَارٍ فَغَسَلَهُمَا، ثُمَّ أَدْخَلَ يَمِينَهُ فِي الإِنَاءِ فَمَضْمَضَ، وَاسْتَنْشَقَ، ثُمَّ غَسَلَ وَجْهَهُ ثَلاَثًا، وَيَدَيْهِ إِلَى الْمِرْفَقَيْنِ ثَلاَثَ مِرَارٍ، ثُمَّ مَسَحَ بِرَأْسِهِ، ثُمَّ غَسَلَ رِجْلَيْهِ ثَلاَثَ مِرَارٍ إِلَى الْكَعْبَيْنِ، ثُمَّ قَالَ: قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم: مَنْ تَوَضَّأَ نَحْوَ وُضُوئِي هَذَا، ثُمَّ صَلَّى رَكْعَتَيْنِ، لاَ يُحَدِّثُ فِيهِمَا نَفْسَهُ، غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
        t(
          '‘Uthman called for a vessel of water. He poured it over his hands three times and washed them, then put his right hand in the vessel, rinsed his mouth and his nose, then washed his face three times and his arms up to the elbows three times, then wiped his head, then washed his feet up to the ankles three times. Then he said: the Messenger of Allah ﷺ said: “Whoever makes an ablution like this ablution of mine, then prays two rak‘ahs without letting his mind wander, his past sins are forgiven.”',
          '‘Uthman demanda un récipient d’eau. Il en versa sur ses mains trois fois et les lava, puis mit sa main droite dans le récipient, se rinça la bouche et le nez, puis se lava le visage trois fois et les bras jusqu’aux coudes trois fois, puis s’essuya la tête, puis se lava les pieds jusqu’aux chevilles trois fois. Puis il dit : le Messager d’Allah ﷺ a dit : « Quiconque fait des ablutions comme mes ablutions que voici, puis prie deux rak‘as sans se laisser distraire, ses péchés passés lui sont pardonnés. »',
          'وصف عثمان رضي الله عنه وضوء النبي ﷺ عمليًّا وذكر فضله.',
          '‘Uzmán pidió un recipiente de agua. Vertió agua sobre sus manos tres veces y las lavó, luego metió la mano derecha en el recipiente, se enjuagó la boca y la nariz, luego se lavó la cara tres veces y los brazos hasta los codos tres veces, luego se pasó la mano por la cabeza, luego se lavó los pies hasta los tobillos tres veces. Después dijo: el Mensajero de Allah ﷺ dijo: «Quien haga una ablución como esta mía y luego rece dos rak‘as sin distraerse, se le perdonan sus pecados pasados.»',
        ),
        ['bukhari:159'],
      ),
    ],
  },
  {
    id: 'mouth-nose',
    title: t('Mouth and nose', 'La bouche et le nez', 'المضمضة والاستنشاق', 'Boca y nariz'),
    text: t(
      'Take water in the right hand, rinse the mouth, breathe water into the nose and blow it out with the left hand: three handfuls.',
      'Prendre de l’eau dans la main droite, se rincer la bouche, aspirer l’eau par le nez et la rejeter avec la main gauche : trois poignées.',
      'يأخذ الماء بيمينه فيتمضمض ويستنشق ويستنثر بيساره، ثلاث غرفات.',
      'Tomar agua con la mano derecha, enjuagar la boca, aspirar agua por la nariz y expulsarla con la mano izquierda: tres puñados.',
    ),
    l: 'hadith',
    r: ['bukhari:186'],
    quotes: [
      q(
        'mouth-nose',
        'فَمَضْمَضَ وَاسْتَنْشَقَ وَاسْتَنْثَرَ ثَلاَثَ غَرَفَاتٍ',
        t(
          'He rinsed his mouth, breathed water into his nose and blew it out, with three handfuls.',
          'Il se rinça la bouche, aspira l’eau par le nez et la rejeta, en trois poignées.',
          'من وصف عبد الله بن زيد لوضوء النبي ﷺ.',
          'Se enjuagó la boca, aspiró agua por la nariz y la expulsó, con tres puñados.',
        ),
        ['bukhari:186'],
      ),
    ],
  },
  {
    id: 'face',
    title: t('The face', 'Le visage', 'غسل الوجه', 'La cara'),
    text: t(
      'Wash the face three times, from the hairline to the chin and from one ear to the other.',
      'Laver le visage trois fois, de la naissance des cheveux au menton et d’une oreille à l’autre.',
      'يغسل وجهه ثلاثًا، من منابت شعر الرأس إلى الذقن طولًا، ومن الأذن إلى الأذن عرضًا.',
      'Lavar la cara tres veces, del nacimiento del pelo a la barbilla y de una oreja a la otra.',
    ),
    l: 'quran',
    r: ['5:6', 'bukhari:159'],
  },
  {
    id: 'arms',
    title: t('The arms, with the elbows', 'Les bras, coudes compris', 'غسل اليدين إلى المرفقين', 'Los brazos, con los codos'),
    text: t(
      'Wash the right arm from the fingertips up to and including the elbow, three times, then the left.',
      'Laver le bras droit du bout des doigts jusqu’au coude compris, trois fois, puis le gauche.',
      'يغسل يده اليمنى من أطراف الأصابع إلى المرفق مع المرفق ثلاثًا، ثم اليسرى.',
      'Lavar el brazo derecho desde la punta de los dedos hasta el codo incluido, tres veces, y luego el izquierdo.',
    ),
    l: 'quran',
    r: ['5:6', 'bukhari:159'],
  },
  {
    id: 'head',
    title: t('Wipe the head and the ears', 'S’essuyer la tête et les oreilles', 'مسح الرأس والأذنين', 'Pasar las manos por la cabeza y las orejas'),
    text: t(
      'With wet hands, wipe the head once: from the front to the nape, then back to where you began. Then wipe the ears: the inside with the index fingers and the back with the thumbs.',
      'Avec les mains mouillées, s’essuyer la tête une fois : du front à la nuque, puis retour au point de départ. Puis les oreilles : l’intérieur avec les index et l’arrière avec les pouces.',
      'يمسح رأسه بيديه المبلولتين مرة: يبدأ بمقدم رأسه إلى قفاه ثم يردهما إلى حيث بدأ، ثم يمسح أذنيه: باطنهما بالسبابتين وظاهرهما بالإبهامين.',
      'Con las manos mojadas, pasarlas una vez por la cabeza: de la frente a la nuca y de vuelta al punto de partida. Luego las orejas: el interior con los índices y la parte de atrás con los pulgares.',
    ),
    l: 'hadith',
    r: ['bukhari:185', 'nasai:102', '5:6'],
    quotes: [
      q(
        'head-wipe',
        'فَأَقْبَلَ بِهِمَا وَأَدْبَرَ، بَدَأَ بِمُقَدَّمِ رَأْسِهِ، حَتَّى ذَهَبَ بِهِمَا إِلَى قَفَاهُ، ثُمَّ رَدَّهُمَا إِلَى الْمَكَانِ الَّذِي بَدَأَ مِنْهُ',
        t(
          'He moved his hands from front to back and back again: he began at the front of his head, took them to the nape, then brought them back to where he began.',
          'Il passa ses mains d’avant en arrière et retour : il commença par le devant de la tête, les mena jusqu’à la nuque, puis les ramena au point de départ.',
          'صفة مسح الرأس في حديث عبد الله بن زيد.',
          'Pasó las manos de delante atrás y de vuelta: empezó por la parte delantera de la cabeza, las llevó hasta la nuca y las devolvió al punto de partida.',
        ),
        ['bukhari:185'],
      ),
      q(
        'ears',
        'ثُمَّ مَسَحَ بِرَأْسِهِ وَأُذُنَيْهِ بَاطِنِهِمَا بِالسَّبَّاحَتَيْنِ وَظَاهِرِهِمَا بِإِبْهَامَيْهِ',
        t(
          'Then he wiped his head and his ears: their inside with his index fingers and their back with his thumbs.',
          'Puis il s’essuya la tête et les oreilles : l’intérieur avec les index et l’arrière avec les pouces.',
          'صفة مسح الأذنين في حديث ابن عباس.',
          'Luego se pasó las manos por la cabeza y las orejas: el interior con los índices y la parte de atrás con los pulgares.',
        ),
        ['nasai:102'],
        { grade: HASAN_SAHIH_ALBANI },
      ),
    ],
  },
  {
    id: 'feet',
    title: t('The feet, with the ankles', 'Les pieds, chevilles comprises', 'غسل الرجلين إلى الكعبين', 'Los pies, con los tobillos'),
    text: t(
      'Wash the right foot up to and including the ankle, three times, between the toes too, then the left.',
      'Laver le pied droit jusqu’à la cheville comprise, trois fois, entre les orteils aussi, puis le gauche.',
      'يغسل رجله اليمنى إلى الكعبين مع الكعبين ثلاثًا ويخلل أصابعه، ثم اليسرى.',
      'Lavar el pie derecho hasta el tobillo incluido, tres veces, también entre los dedos, y luego el izquierdo.',
    ),
    l: 'quran',
    r: ['5:6', 'bukhari:159'],
  },
  {
    id: 'after-wudu',
    title: t('The testimony after it', 'L’attestation après', 'الشهادة بعده', 'El testimonio después'),
    text: t(
      'When the ablution is complete, bear witness to the faith: the eight gates of Paradise are opened for whoever says it.',
      'Les ablutions achevées, attester la foi : les huit portes du Paradis s’ouvrent pour qui le dit.',
      'إذا أتم وضوءه شهد الشهادتين، فتُفتح له أبواب الجنة الثمانية.',
      'Acabada la ablución, dar testimonio de la fe: se abren las ocho puertas del Paraíso para quien lo dice.',
    ),
    l: 'hadith',
    r: ['muslim:234'],
    quotes: [
      q(
        'after-wudu',
        'مَا مِنْكُمْ مِنْ أَحَدٍ يَتَوَضَّأُ فَيُبْلِغُ - أَوْ فَيُسْبِغُ - الْوُضُوءَ ثُمَّ يَقُولُ أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا عَبْدُ اللَّهِ وَرَسُولُهُ إِلاَّ فُتِحَتْ لَهُ أَبْوَابُ الْجَنَّةِ الثَّمَانِيَةُ يَدْخُلُ مِنْ أَيِّهَا شَاءَ',
        t(
          'None of you makes the ablution and completes it well, then says “I bear witness that there is no god but Allah and that Muhammad is the servant of Allah and His Messenger”, without the eight gates of Paradise being opened for him, to enter by whichever he wishes.',
          'Nul d’entre vous ne fait ses ablutions en les complétant bien, puis dit « J’atteste qu’il n’y a de dieu qu’Allah et que Muhammad est le serviteur d’Allah et Son Messager », sans que les huit portes du Paradis ne s’ouvrent pour lui, pour entrer par celle qu’il veut.',
          'فضل الشهادتين بعد الوضوء.',
          'Ninguno de vosotros hace la ablución completándola bien y luego dice «Atestiguo que no hay dios sino Allah y que Muhammad es el siervo de Allah y Su Mensajero» sin que se le abran las ocho puertas del Paraíso, para entrar por la que quiera.',
        ),
        ['muslim:234'],
      ),
    ],
  },
]

/* ------------------------------------------------------------------ how to pray */

/** How the Prophet ﷺ taught the prayer: shown before the steps. */
export const HOW_MODEL: SalatStep = {
    id: 'model',
    title: t('“Pray as you have seen me pray”', '« Priez comme vous m’avez vu prier »', '«صلوا كما رأيتموني أصلي»', '«Rezad como me habéis visto rezar»'),
    text: t(
      'The steps below follow how the Companions described the Prophet’s prayer. When a man prayed hastily, the Prophet ﷺ taught him its core: each position done calmly, until the body is at rest.',
      'Les étapes ci-dessous suivent la description que les Compagnons ont faite de la prière du Prophète. Quand un homme pria à la hâte, le Prophète ﷺ lui enseigna l’essentiel : chaque position faite calmement, jusqu’à ce que le corps soit au repos.',
      'الخطوات الآتية على ما وصفه الصحابة من صلاة النبي ﷺ. ولما صلى رجل مستعجلًا علّمه النبي ﷺ أصلها: الطمأنينة في كل ركن.',
      'Los pasos siguientes siguen la descripción que los Compañeros hicieron de la oración del Profeta. Cuando un hombre rezó con prisa, el Profeta ﷺ le enseñó lo esencial: cada postura hecha con calma, hasta que el cuerpo repose.',
    ),
    l: 'hadith',
    r: ['bukhari:631', 'bukhari:757'],
    quotes: [
      q(
        'as-you-saw',
        'وَصَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي',
        t('And pray as you have seen me pray.', 'Et priez comme vous m’avez vu prier.', 'الأصل في صفة الصلاة.', 'Y rezad como me habéis visto rezar.'),
        ['bukhari:631'],
      ),
      q(
        'bad-prayer',
        'إِذَا قُمْتَ إِلَى الصَّلاَةِ فَكَبِّرْ، ثُمَّ اقْرَأْ مَا تَيَسَّرَ مَعَكَ مِنَ الْقُرْآنِ، ثُمَّ ارْكَعْ حَتَّى تَطْمَئِنَّ رَاكِعًا، ثُمَّ ارْفَعْ حَتَّى تَعْتَدِلَ قَائِمًا، ثُمَّ اسْجُدْ حَتَّى تَطْمَئِنَّ سَاجِدًا، ثُمَّ ارْفَعْ حَتَّى تَطْمَئِنَّ جَالِسًا، وَافْعَلْ ذَلِكَ فِي صَلاَتِكَ كُلِّهَا',
        t(
          'When you stand for the prayer, say Allahu akbar, then recite what is easy for you of the Qur’an, then bow until you are at rest bowing, then rise until you stand straight, then prostrate until you are at rest prostrating, then rise until you are at rest sitting, and do this in all of your prayer.',
          'Quand tu te lèves pour la prière, dis Allahu akbar, puis récite ce qui t’est facile du Coran, puis incline-toi jusqu’à être au repos incliné, puis redresse-toi jusqu’à te tenir droit, puis prosterne-toi jusqu’à être au repos prosterné, puis relève-toi jusqu’à être au repos assis, et fais ainsi dans toute ta prière.',
          'حديث المسيء صلاته: الطمأنينة ركن في كل موضع.',
          'Cuando te levantes para la oración, di Allahu akbar, luego recita lo que te sea fácil del Corán, luego inclínate hasta reposar inclinado, luego levántate hasta estar erguido, luego prostérnate hasta reposar prosternado, luego levántate hasta reposar sentado, y haz así en toda tu oración.',
        ),
        ['bukhari:757'],
      ),
    ],
}

export const HOW_STEPS: SalatStep[] = [
  {
    id: 'takbir',
    pose: 'stand',
    title: t('Allahu akbar', 'Allahu akbar', 'تكبيرة الإحرام', 'Allahu akbar'),
    text: t(
      'Stand facing the qiblah, raise your hands to the level of the shoulders and say “Allahu akbar”. This opening takbir makes everything outside the prayer forbidden until the salam.',
      'Debout face à la qibla, lever les mains à hauteur des épaules et dire « Allahu akbar ». Ce takbir d’ouverture interdit tout ce qui est étranger à la prière jusqu’au salam.',
      'يقف مستقبل القبلة ويرفع يديه حذو منكبيه ويقول «الله أكبر»، وبهذه التكبيرة يحرم عليه ما كان مباحًا خارج الصلاة حتى يسلم.',
      'De pie frente a la alquibla, levantar las manos a la altura de los hombros y decir «Allahu akbar». Este takbir de apertura prohíbe todo lo ajeno a la oración hasta el salam.',
    ),
    l: 'hadith',
    r: ['bukhari:735', 'abudawud:61'],
    quotes: [
      q(
        'key',
        'مِفْتَاحُ الصَّلاَةِ الطُّهُورُ وَتَحْرِيمُهَا التَّكْبِيرُ وَتَحْلِيلُهَا التَّسْلِيمُ',
        t(
          'The key to the prayer is purification; it is entered with the takbir and left with the salam.',
          'La clé de la prière est la purification ; on y entre par le takbir et on en sort par le salam.',
          'تبدأ الصلاة بالتكبير وتنتهي بالتسليم.',
          'La llave de la oración es la purificación; se entra en ella con el takbir y se sale con el salam.',
        ),
        ['abudawud:61'],
        { grade: HASAN_SAHIH_ALBANI },
      ),
      q(
        'raise-hands',
        'كَانَ يَرْفَعُ يَدَيْهِ حَذْوَ مَنْكِبَيْهِ إِذَا افْتَتَحَ الصَّلاَةَ، وَإِذَا كَبَّرَ لِلرُّكُوعِ، وَإِذَا رَفَعَ رَأْسَهُ مِنَ الرُّكُوعِ',
        t(
          'He raised his hands to the level of his shoulders when he began the prayer, when he said the takbir for bowing, and when he raised his head from bowing.',
          'Il levait les mains à hauteur des épaules quand il commençait la prière, quand il disait le takbir pour s’incliner et quand il se redressait de l’inclinaison.',
          'رواه ابن عمر في مواضع رفع اليدين.',
          'Levantaba las manos a la altura de los hombros al empezar la oración, al decir el takbir para inclinarse y al levantar la cabeza de la inclinación.',
        ),
        ['bukhari:735'],
      ),
    ],
    note: t(
      'The Maliki school, followed in Morocco, raises the hands only at the opening takbir, as Ibn al-Qasim reported from Malik in al-Mudawwana; the other schools also raise them before and after bowing, after Ibn ‘Umar’s hadith.',
      'L’école malikite, suivie au Maroc, ne lève les mains qu’au takbir d’ouverture, comme Ibn al-Qasim l’a rapporté de Malik dans al-Mudawwana ; les autres écoles les lèvent aussi avant et après l’inclinaison, d’après le hadith d’Ibn ‘Umar.',
      'المشهور في المذهب المالكي المعمول به في المغرب رفع اليدين عند تكبيرة الإحرام فقط، كما في المدونة من رواية ابن القاسم عن مالك، وترفعهما المذاهب الأخرى أيضًا عند الركوع والرفع منه لحديث ابن عمر.',
      'La escuela malikí, seguida en Marruecos, solo levanta las manos en el takbir de apertura, como Ibn al-Qasim transmitió de Malik en al-Mudawwana; las demás escuelas las levantan también antes y después de la inclinación, según el hadiz de Ibn ‘Umar.',
    ),
  },
  {
    id: 'standing',
    pose: 'stand',
    title: t('Standing: al-Fatihah', 'Debout : al-Fatiha', 'القيام والفاتحة', 'De pie: al-Fátiha'),
    text: t(
      'Recite al-Fatihah in every rak‘ah: there is no prayer without it. In the first two rak‘ahs add a surah or some verses after it; in the third and fourth, al-Fatihah alone. In Fajr, Maghrib and ‘Isha the first two rak‘ahs are recited aloud; Dhuhr and ‘Asr are silent.',
      'Réciter al-Fatiha à chaque rak‘a : pas de prière sans elle. Aux deux premières rak‘as, ajouter une sourate ou quelques versets ; aux troisième et quatrième, al-Fatiha seule. Au Fajr, au Maghrib et à l’‘Isha, les deux premières rak‘as sont récitées à voix haute ; le Dhuhr et l’‘Asr sont silencieux.',
      'يقرأ الفاتحة في كل ركعة فلا صلاة إلا بها، ويزيد سورة أو آيات في الركعتين الأوليين، ويقتصر على الفاتحة في الثالثة والرابعة. ويجهر في الأوليين من الفجر والمغرب والعشاء، ويُسرّ في الظهر والعصر.',
      'Recitar al-Fátiha en cada rak‘a: no hay oración sin ella. En las dos primeras rak‘as añadir una sura o algunas aleyas; en la tercera y la cuarta, al-Fátiha sola. En el Fayr, el Magrib y el ‘Isha las dos primeras rak‘as se recitan en voz alta; el Duhr y el ‘Asr son en silencio.',
    ),
    l: 'hadith',
    r: ['1:1-7', 'bukhari:756', 'bukhari:776', 'bukhari:765', 'bukhari:740'],
    quotes: [
      q(
        'fatiha',
        'لاَ صَلاَةَ لِمَنْ لَمْ يَقْرَأْ بِفَاتِحَةِ الْكِتَابِ',
        t('There is no prayer for whoever does not recite the Opening of the Book.', 'Pas de prière pour qui ne récite pas l’Ouverture du Livre.', 'الفاتحة ركن في كل ركعة.', 'No hay oración para quien no recita la Apertura del Libro.'),
        ['bukhari:756'],
      ),
      q(
        'abu-qatada',
        'كَانَ يَقْرَأُ فِي الظُّهْرِ فِي الأُولَيَيْنِ بِأُمِّ الْكِتَابِ وَسُورَتَيْنِ، وَفِي الرَّكْعَتَيْنِ الأُخْرَيَيْنِ بِأُمِّ الْكِتَابِ',
        t(
          'In Dhuhr he recited, in the first two rak‘ahs, the Mother of the Book and two surahs, and in the last two rak‘ahs the Mother of the Book.',
          'Au Dhuhr, il récitait aux deux premières rak‘as la Mère du Livre et deux sourates, et aux deux dernières la Mère du Livre.',
          'رواه أبو قتادة: سورة مع الفاتحة في الأوليين، والفاتحة وحدها في الأخريين.',
          'En el Duhr recitaba, en las dos primeras rak‘as, la Madre del Libro y dos suras, y en las dos últimas la Madre del Libro.',
        ),
        ['bukhari:776'],
      ),
      q(
        'right-on-left',
        'كَانَ النَّاسُ يُؤْمَرُونَ أَنْ يَضَعَ الرَّجُلُ الْيَدَ الْيُمْنَى عَلَى ذِرَاعِهِ الْيُسْرَى فِي الصَّلاَةِ',
        t(
          'People were commanded to place the right hand on the left forearm in the prayer.',
          'On ordonnait aux gens de poser la main droite sur l’avant-bras gauche dans la prière.',
          'رواه سهل بن سعد في وضع اليمنى على اليسرى.',
          'Se ordenaba a la gente poner la mano derecha sobre el antebrazo izquierdo en la oración.',
        ),
        ['bukhari:740'],
      ),
    ],
    note: t(
      'In Morocco most people follow the Maliki practice of letting the arms hang at the sides (sadl) in the obligatory prayers, reported from Malik in al-Mudawwana; placing the right hand on the left (Sahl’s hadith above) is the practice of the other schools and is also held by many Maliki scholars. The well-known Maliki position also begins al-Fatihah right after the takbir, without an opening supplication or the basmalah, in the obligatory prayers; the other schools say both.',
      'Au Maroc, la plupart suivent la pratique malikite de laisser les bras le long du corps (sadl) dans les prières obligatoires, rapportée de Malik dans al-Mudawwana ; poser la main droite sur la gauche (hadith de Sahl ci-dessus) est la pratique des autres écoles et l’avis de nombreux malikites. La position malikite connue commence aussi al-Fatiha juste après le takbir, sans invocation d’ouverture ni basmala, dans les prières obligatoires ; les autres écoles disent les deux.',
      'أكثر أهل المغرب على السدل في الفريضة، وهو المروي عن مالك في المدونة، والقبض (حديث سهل أعلاه) قول بقية المذاهب وقال به كثير من المالكية. والمشهور عند المالكية أن يبدأ بالفاتحة بعد التكبير مباشرة دون دعاء الاستفتاح ولا البسملة في الفريضة، وتقولهما المذاهب الأخرى.',
      'En Marruecos la mayoría sigue la práctica malikí de dejar los brazos a los lados (sadl) en las oraciones obligatorias, transmitida de Malik en al-Mudawwana; poner la mano derecha sobre la izquierda (hadiz de Sahl, arriba) es la práctica de las demás escuelas y la opinión de muchos malikíes. La postura malikí conocida empieza también al-Fátiha justo tras el takbir, sin súplica de apertura ni basmala, en las oraciones obligatorias; las demás escuelas dicen ambas.',
    ),
  },
  {
    id: 'ruku',
    pose: 'bow',
    title: t('Bowing (ruku‘)', 'L’inclinaison (ruku‘)', 'الركوع', 'La inclinación (ruku‘)'),
    text: t(
      'Say “Allahu akbar” and bow: hands on the knees, back straight, until the body is at rest. Say “Subhana rabbiya l-‘azim” (glory to my Lord the Most Great), repeating it.',
      'Dire « Allahu akbar » et s’incliner : mains sur les genoux, dos droit, jusqu’à ce que le corps soit au repos. Dire « Subhana rabbiya l-‘azim » (gloire à mon Seigneur le Très-Grand), en le répétant.',
      'يكبّر ويركع واضعًا يديه على ركبتيه مستوي الظهر حتى يطمئن، ويقول «سبحان ربي العظيم» ويكررها.',
      'Decir «Allahu akbar» e inclinarse: manos en las rodillas, espalda recta, hasta que el cuerpo repose. Decir «Subhana rabbiya l-‘azim» (gloria a mi Señor el Grandioso), repitiéndolo.',
    ),
    l: 'hadith',
    r: ['muslim:772', 'bukhari:789', 'bukhari:757'],
    quotes: [
      q(
        'ruku-tasbih',
        'ثُمَّ رَكَعَ فَجَعَلَ يَقُولُ: سُبْحَانَ رَبِّيَ الْعَظِيمِ',
        t('Then he bowed and began to say: “Glory to my Lord, the Most Great.”', 'Puis il s’inclina et se mit à dire : « Gloire à mon Seigneur, le Très-Grand. »', 'من حديث حذيفة في صلاة النبي ﷺ بالليل.', 'Luego se inclinó y empezó a decir: «Gloria a mi Señor, el Grandioso.»'),
        ['muslim:772'],
      ),
    ],
  },
  {
    id: 'rise',
    pose: 'stand',
    title: t('Rising', 'Le redressement', 'الرفع من الركوع', 'Al incorporarse'),
    text: t(
      'Rise saying “Sami‘a llahu liman hamidah” (Allah hears whoever praises Him), stand straight and still, and say “Rabbana laka l-hamd” (our Lord, to You is the praise).',
      'Se redresser en disant « Sami‘a llahu liman hamidah » (Allah entend celui qui Le loue), se tenir droit et immobile, et dire « Rabbana laka l-hamd » (notre Seigneur, à Toi la louange).',
      'يرفع قائلًا «سمع الله لمن حمده» حتى يعتدل قائمًا ويطمئن، ثم يقول «ربنا لك الحمد».',
      'Incorporarse diciendo «Sami‘a llahu liman hamidah» (Allah oye a quien Le alaba), quedarse erguido y quieto, y decir «Rabbana laka l-hamd» (Señor nuestro, a Ti la alabanza).',
    ),
    l: 'hadith',
    r: ['bukhari:789', 'bukhari:757'],
    quotes: [
      q(
        'takbir-a',
        'يُكَبِّرُ حِينَ يَقُومُ، ثُمَّ يُكَبِّرُ حِينَ يَرْكَعُ، ثُمَّ يَقُولُ: سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، حِينَ يَرْفَعُ صُلْبَهُ مِنَ الرَّكْعَةِ، ثُمَّ يَقُولُ وَهُوَ قَائِمٌ: رَبَّنَا لَكَ الْحَمْدُ',
        t(
          'He said the takbir when he stood, then the takbir when he bowed, then said “Allah hears whoever praises Him” as he raised his back from bowing, then said, standing: “Our Lord, to You is the praise.”',
          'Il disait le takbir en se levant, puis le takbir en s’inclinant, puis « Allah entend celui qui Le loue » en relevant le dos de l’inclinaison, puis disait, debout : « Notre Seigneur, à Toi la louange. »',
          'وصف أبي هريرة لتكبيرات الانتقال.',
          'Decía el takbir al ponerse de pie, luego el takbir al inclinarse, luego «Allah oye a quien Le alaba» al levantar la espalda de la inclinación, y luego decía, de pie: «Señor nuestro, a Ti la alabanza.»',
        ),
        ['bukhari:789'],
      ),
    ],
  },
  {
    id: 'sujud',
    pose: 'prostrate',
    title: t('Prostration (sujud)', 'La prosternation (sujud)', 'السجود', 'La postración (suyud)'),
    text: t(
      'Say “Allahu akbar” and prostrate on seven bones: the forehead with the nose, both hands, both knees and the toes. Say “Subhana rabbiya l-a‘la” (glory to my Lord the Most High), repeating it. A servant is nearest to his Lord in prostration, so supplicate there too.',
      'Dire « Allahu akbar » et se prosterner sur sept os : le front avec le nez, les deux mains, les deux genoux et les orteils. Dire « Subhana rabbiya l-a‘la » (gloire à mon Seigneur le Très-Haut), en le répétant. Le serviteur n’est jamais aussi proche de son Seigneur que prosterné : on y invoque aussi.',
      'يكبّر ويسجد على سبعة أعظم: الجبهة مع الأنف، واليدين، والركبتين، وأطراف القدمين، ويقول «سبحان ربي الأعلى» ويكررها، ويكثر الدعاء فيه فأقرب ما يكون العبد من ربه وهو ساجد.',
      'Decir «Allahu akbar» y postrarse sobre siete huesos: la frente con la nariz, ambas manos, ambas rodillas y los dedos de los pies. Decir «Subhana rabbiya l-a‘la» (gloria a mi Señor el Altísimo), repitiéndolo. El siervo nunca está tan cerca de su Señor como postrado: se suplica también ahí.',
    ),
    l: 'hadith',
    r: ['bukhari:812', 'muslim:772', 'muslim:482'],
    quotes: [
      q(
        'seven-bones',
        'أُمِرْتُ أَنْ أَسْجُدَ عَلَى سَبْعَةِ أَعْظُمٍ عَلَى الْجَبْهَةِ ـ وَأَشَارَ بِيَدِهِ عَلَى أَنْفِهِ ـ وَالْيَدَيْنِ، وَالرُّكْبَتَيْنِ وَأَطْرَافِ الْقَدَمَيْنِ',
        t(
          'I was commanded to prostrate on seven bones: the forehead — and he pointed with his hand to his nose — the two hands, the two knees and the ends of the feet.',
          'Il m’a été ordonné de me prosterner sur sept os : le front — et il montra de la main son nez —, les deux mains, les deux genoux et l’extrémité des pieds.',
          'أعضاء السجود السبعة.',
          'Se me ordenó postrarme sobre siete huesos: la frente —y señaló con la mano su nariz—, las dos manos, las dos rodillas y las puntas de los pies.',
        ),
        ['bukhari:812'],
      ),
      q(
        'sujud-tasbih',
        'ثُمَّ سَجَدَ فَقَالَ: سُبْحَانَ رَبِّيَ الأَعْلَى',
        t('Then he prostrated and said: “Glory to my Lord, the Most High.”', 'Puis il se prosterna et dit : « Gloire à mon Seigneur, le Très-Haut. »', 'من حديث حذيفة.', 'Luego se postró y dijo: «Gloria a mi Señor, el Altísimo.»'),
        ['muslim:772'],
      ),
    ],
  },
  {
    id: 'between',
    pose: 'sit',
    title: t('Sitting between the two prostrations', 'Assis entre les deux prosternations', 'الجلسة بين السجدتين', 'Sentado entre las dos postraciones'),
    text: t(
      'Rise saying “Allahu akbar” and sit until the body is at rest, saying “Rabbi ghfir li” (my Lord, forgive me).',
      'Se relever en disant « Allahu akbar » et s’asseoir jusqu’à être au repos, en disant « Rabbi ghfir li » (mon Seigneur, pardonne-moi).',
      'يرفع مكبّرًا ويجلس حتى يطمئن، ويقول «رب اغفر لي».',
      'Incorporarse diciendo «Allahu akbar» y sentarse hasta reposar, diciendo «Rabbi gfir li» (Señor mío, perdóname).',
    ),
    l: 'hadith',
    r: ['ibnmajah:897', 'bukhari:757'],
    quotes: [
      q(
        'between-sajdas',
        'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
        t('My Lord, forgive me. My Lord, forgive me.', 'Mon Seigneur, pardonne-moi. Mon Seigneur, pardonne-moi.', 'كان النبي ﷺ يقولها بين السجدتين.', 'Señor mío, perdóname. Señor mío, perdóname.'),
        ['ibnmajah:897'],
        { grade: SAHIH_ALBANI },
      ),
    ],
  },
  {
    id: 'sujud-2',
    pose: 'prostrate',
    title: t('The second prostration', 'La deuxième prosternation', 'السجدة الثانية', 'La segunda postración'),
    text: t(
      'Say “Allahu akbar” and prostrate again as the first time. That completes one rak‘ah. Rise with “Allahu akbar” for the next and repeat steps 2 to 7.',
      'Dire « Allahu akbar » et se prosterner à nouveau comme la première fois. Cela complète une rak‘a. Se lever avec « Allahu akbar » pour la suivante et refaire les étapes 2 à 7.',
      'يكبّر ويسجد الثانية كالأولى، وبها تتم الركعة، ثم ينهض مكبّرًا للتي تليها ويعيد الخطوات من 2 إلى 7.',
      'Decir «Allahu akbar» y postrarse de nuevo como la primera vez. Así se completa una rak‘a. Levantarse con «Allahu akbar» para la siguiente y repetir los pasos 2 a 7.',
    ),
    l: 'hadith',
    r: ['bukhari:789', 'bukhari:757'],
    quotes: [
      q(
        'takbir-b',
        'ثُمَّ يُكَبِّرُ حِينَ يَهْوِي، ثُمَّ يُكَبِّرُ حِينَ يَرْفَعُ رَأْسَهُ، ثُمَّ يُكَبِّرُ حِينَ يَسْجُدُ، ثُمَّ يُكَبِّرُ حِينَ يَرْفَعُ رَأْسَهُ، ثُمَّ يَفْعَلُ ذَلِكَ فِي الصَّلاَةِ كُلِّهَا حَتَّى يَقْضِيَهَا، وَيُكَبِّرُ حِينَ يَقُومُ مِنَ الثِّنْتَيْنِ بَعْدَ الْجُلُوسِ',
        t(
          'Then he said the takbir as he went down, the takbir as he raised his head, the takbir as he prostrated, and the takbir as he raised his head; he did this in all of the prayer until he finished it, and said the takbir when he stood up after sitting at the end of two rak‘ahs.',
          'Puis il disait le takbir en descendant, le takbir en relevant la tête, le takbir en se prosternant et le takbir en relevant la tête ; il faisait ainsi dans toute la prière jusqu’à la finir, et disait le takbir en se levant après s’être assis au bout de deux rak‘as.',
          'التكبير عند كل خفض ورفع إلى آخر الصلاة.',
          'Luego decía el takbir al bajar, el takbir al levantar la cabeza, el takbir al postrarse y el takbir al levantar la cabeza; hacía así en toda la oración hasta acabarla, y decía el takbir al levantarse tras sentarse al final de dos rak‘as.',
        ),
        ['bukhari:789'],
      ),
    ],
  },
  {
    id: 'tashahhud',
    pose: 'sit',
    title: t('Sitting for the tashahhud', 'Assis pour le tachahhud', 'الجلوس للتشهد', 'Sentado para el tashahhud'),
    text: t(
      'After every two rak‘ahs, sit and say the tashahhud. In Fajr this is the last sitting. In Dhuhr, ‘Asr, Maghrib and ‘Isha, stand up with “Allahu akbar” after this first tashahhud and pray the remaining rak‘ahs, then sit again for the last one.',
      'Après chaque deux rak‘as, s’asseoir et dire le tachahhud. Au Fajr, c’est la dernière position assise. Au Dhuhr, à l’‘Asr, au Maghrib et à l’‘Isha, se lever avec « Allahu akbar » après ce premier tachahhud et prier les rak‘as restantes, puis s’asseoir de nouveau pour le dernier.',
      'يجلس بعد كل ركعتين ويقرأ التشهد. وهو في الفجر الجلوس الأخير، وفي الظهر والعصر والمغرب والعشاء ينهض بعد التشهد الأول مكبّرًا فيتم ما بقي ثم يجلس للأخير.',
      'Tras cada dos rak‘as, sentarse y decir el tashahhud. En el Fayr es la última posición sentada. En el Duhr, el ‘Asr, el Magrib y el ‘Isha, levantarse con «Allahu akbar» tras este primer tashahhud y rezar las rak‘as que quedan, y sentarse de nuevo para el último.',
    ),
    l: 'hadith',
    r: ['bukhari:831', 'bukhari:828'],
    quotes: [
      q(
        'tashahhud',
        'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        t(
          'All greetings are for Allah, and the prayers and the good things. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and His Messenger.',
          'Les salutations sont à Allah, ainsi que les prières et les bonnes choses. Que la paix soit sur toi, ô Prophète, ainsi que la miséricorde d’Allah et Ses bénédictions. Que la paix soit sur nous et sur les vertueux serviteurs d’Allah. J’atteste qu’il n’y a de dieu qu’Allah, et j’atteste que Muhammad est Son serviteur et Son Messager.',
          'تشهد ابن مسعود الذي علّمه النبي ﷺ.',
          'Los saludos son para Allah, y las oraciones y las cosas buenas. La paz sea contigo, oh Profeta, y la misericordia de Allah y Sus bendiciones. La paz sea con nosotros y con los siervos rectos de Allah. Atestiguo que no hay dios sino Allah, y atestiguo que Muhammad es Su siervo y Su Mensajero.',
        ),
        ['bukhari:831'],
      ),
      q(
        'sitting',
        'فَإِذَا جَلَسَ فِي الرَّكْعَتَيْنِ جَلَسَ عَلَى رِجْلِهِ الْيُسْرَى وَنَصَبَ الْيُمْنَى، وَإِذَا جَلَسَ فِي الرَّكْعَةِ الآخِرَةِ قَدَّمَ رِجْلَهُ الْيُسْرَى وَنَصَبَ الأُخْرَى وَقَعَدَ عَلَى مَقْعَدَتِهِ',
        t(
          'When he sat after two rak‘ahs, he sat on his left foot and kept the right one upright; when he sat in the last rak‘ah, he put his left foot forward, kept the other upright and sat on his seat.',
          'Quand il s’asseyait après deux rak‘as, il s’asseyait sur le pied gauche et redressait le droit ; quand il s’asseyait à la dernière rak‘a, il avançait le pied gauche, redressait l’autre et s’asseyait sur son séant.',
          'وصف أبي حميد الساعدي لجلستي التشهد.',
          'Cuando se sentaba tras dos rak‘as, se sentaba sobre el pie izquierdo y mantenía el derecho erguido; cuando se sentaba en la última rak‘a, adelantaba el pie izquierdo, mantenía el otro erguido y se sentaba sobre las nalgas.',
        ),
        ['bukhari:828'],
      ),
    ],
    note: t(
      'Malik chose the tashahhud that ‘Umar taught from the pulpit (al-Muwatta’), with slightly different words, and the Maliki school sits on the left hip with the left foot under the right leg in both sittings. Every authentic tashahhud is valid.',
      'Malik a retenu le tachahhud que ‘Umar enseignait du haut du minbar (al-Muwatta’), aux mots légèrement différents, et l’école malikite s’assoit sur la hanche gauche, le pied gauche sous la jambe droite, dans les deux positions assises. Tout tachahhud authentique est valable.',
      'اختار مالك تشهد عمر الذي كان يعلّمه على المنبر (الموطأ) وألفاظه قريبة، والمالكية يتوركون في الجلستين. وكل تشهد صحّ عن النبي ﷺ مجزئ.',
      'Malik eligió el tashahhud que ‘Umar enseñaba desde el púlpito (al-Muwatta’), con palabras algo distintas, y la escuela malikí se sienta sobre la cadera izquierda, con el pie izquierdo bajo la pierna derecha, en ambas posiciones sentadas. Todo tashahhud auténtico es válido.',
    ),
  },
  {
    id: 'last-sitting',
    pose: 'sit',
    title: t('The last sitting: blessings and refuge', 'La dernière position assise : prière sur le Prophète et protection', 'الجلوس الأخير: الصلاة على النبي والاستعاذة', 'La última posición sentada: bendiciones y refugio'),
    text: t(
      'In the last sitting, after the tashahhud, send blessings on the Prophet ﷺ with the Ibrahimi prayer, then seek refuge in Allah from four things, then ask Allah for what you wish.',
      'À la dernière position assise, après le tachahhud, prier sur le Prophète ﷺ avec la prière abrahamique, puis demander à Allah protection contre quatre choses, puis Lui demander ce que l’on veut.',
      'في الجلوس الأخير بعد التشهد يصلي على النبي ﷺ بالصلاة الإبراهيمية، ثم يستعيذ بالله من أربع، ثم يدعو بما شاء.',
      'En la última posición sentada, tras el tashahhud, pedir bendiciones sobre el Profeta ﷺ con la oración abrahámica, luego refugiarse en Allah de cuatro cosas, y luego pedir a Allah lo que se quiera.',
    ),
    l: 'hadith',
    r: ['bukhari:3370', 'muslim:588'],
    quotes: [
      q(
        'ibrahimiyya',
        'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ، وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
        t(
          'O Allah, send prayers on Muhammad and on the family of Muhammad as You sent prayers on Ibrahim and on the family of Ibrahim; You are Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad as You blessed Ibrahim and the family of Ibrahim; You are Praiseworthy, Glorious.',
          'Ô Allah, prie sur Muhammad et sur la famille de Muhammad comme Tu as prié sur Ibrahim et sur la famille d’Ibrahim ; Tu es Digne de louange, Glorieux. Ô Allah, bénis Muhammad et la famille de Muhammad comme Tu as béni Ibrahim et la famille d’Ibrahim ; Tu es Digne de louange, Glorieux.',
          'الصلاة الإبراهيمية التي علّمها النبي ﷺ أصحابه.',
          'Oh Allah, bendice a Muhammad y a la familia de Muhammad como bendijiste a Ibrahim y a la familia de Ibrahim; Tú eres Digno de alabanza, Glorioso. Oh Allah, bendice a Muhammad y a la familia de Muhammad como bendijiste a Ibrahim y a la familia de Ibrahim; Tú eres Digno de alabanza, Glorioso.',
        ),
        ['bukhari:3370'],
      ),
      q(
        'four-refuges',
        'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
        t(
          'O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the trial of the False Messiah.',
          'Ô Allah, je cherche refuge auprès de Toi contre le châtiment de l’Enfer, le châtiment de la tombe, les épreuves de la vie et de la mort, et le mal de l’épreuve du faux Messie.',
          'أمر النبي ﷺ بها بعد التشهد الأخير.',
          'Oh Allah, me refugio en Ti del castigo del Infierno, del castigo de la tumba, de las pruebas de la vida y de la muerte, y del mal de la prueba del falso Mesías.',
        ),
        ['muslim:588'],
      ),
    ],
  },
  {
    id: 'salam',
    pose: 'salam',
    title: t('The salam', 'Le salam', 'التسليم', 'El salam'),
    text: t(
      'End the prayer by turning the head to the right saying “As-salamu ‘alaykum wa rahmatu llah”, then to the left saying the same.',
      'Terminer la prière en tournant la tête à droite en disant « As-salamu ‘alaykum wa rahmatu llah », puis à gauche en disant de même.',
      'يختم صلاته بالالتفات يمينًا قائلًا «السلام عليكم ورحمة الله» ثم يسارًا كذلك.',
      'Terminar la oración girando la cabeza a la derecha diciendo «As-salamu ‘alaykum wa rahmatu llah», y luego a la izquierda diciendo lo mismo.',
    ),
    l: 'hadith',
    r: ['muslim:582', 'abudawud:61'],
    quotes: [
      q(
        'salam',
        'كُنْتُ أَرَى رَسُولَ اللَّهِ صلى الله عليه وسلم يُسَلِّمُ عَنْ يَمِينِهِ وَعَنْ يَسَارِهِ حَتَّى أَرَى بَيَاضَ خَدِّهِ',
        t(
          'I used to see the Messenger of Allah ﷺ give the salam to his right and to his left, until I could see the whiteness of his cheek.',
          'Je voyais le Messager d’Allah ﷺ faire le salam à sa droite et à sa gauche, au point que je voyais la blancheur de sa joue.',
          'رواه سعد بن أبي وقاص.',
          'Veía al Mensajero de Allah ﷺ dar el salam a su derecha y a su izquierda, hasta que veía la blancura de su mejilla.',
        ),
        ['muslim:582'],
      ),
    ],
    note: t(
      'In the Maliki school the imam and one praying alone say a single salam, beginning facing forward and turning slightly to the right; one praying behind an imam adds a salam to return the imam’s.',
      'Dans l’école malikite, l’imam et celui qui prie seul font un seul salam, en commençant face à l’avant et en tournant légèrement à droite ; celui qui prie derrière un imam ajoute un salam pour lui rendre le sien.',
      'المالكية يسلّم الإمام والفذّ تسليمة واحدة تلقاء وجهه يتيامن بها قليلًا، ويزيد المأموم تسليمة يرد بها على الإمام.',
      'En la escuela malikí, el imam y quien reza solo dan un único salam, empezando de frente y girando un poco a la derecha; quien reza tras un imam añade un salam para devolver el del imam.',
    ),
  },
  {
    id: 'forgot',
    title: t('If you forget or are unsure', 'En cas d’oubli ou de doute', 'إذا نسي أو شكّ', 'Si se olvida o se duda'),
    text: t(
      'If you are unsure how many rak‘ahs you have prayed, build on what you are sure of, complete the prayer, then make two prostrations of forgetfulness (sujud al-sahw).',
      'Si l’on doute du nombre de rak‘as accomplies, on se fonde sur ce dont on est sûr, on complète la prière, puis on fait deux prosternations de l’oubli (sujud as-sahw).',
      'إذا شكّ في عدد الركعات بنى على اليقين وأتم صلاته ثم سجد سجدتي السهو.',
      'Si se duda de cuántas rak‘as se han rezado, se parte de lo que es seguro, se completa la oración y luego se hacen dos postraciones del olvido (suyud as-sahw).',
    ),
    l: 'hadith',
    r: ['bukhari:401'],
    quotes: [
      q(
        'forgot',
        'إِذَا شَكَّ أَحَدُكُمْ فِي صَلاَتِهِ فَلْيَتَحَرَّى الصَّوَابَ، فَلْيُتِمَّ عَلَيْهِ ثُمَّ يُسَلِّمْ، ثُمَّ يَسْجُدْ سَجْدَتَيْنِ',
        t(
          'If one of you is unsure in his prayer, let him seek what is right and complete the prayer on that basis, then give the salam, then make two prostrations.',
          'Si l’un de vous doute dans sa prière, qu’il cherche ce qui est juste et complète sa prière sur cette base, puis fasse le salam, puis deux prosternations.',
          'من حديث ابن مسعود في سجود السهو.',
          'Si uno de vosotros duda en su oración, que busque lo correcto y complete la oración sobre esa base, luego dé el salam y luego haga dos postraciones.',
        ),
        ['bukhari:401'],
      ),
    ],
    note: t(
      'The schools differ on whether these two prostrations come before or after the salam. The Maliki rule: before the salam when something was left out, after it when something was added.',
      'Les écoles divergent : ces deux prosternations viennent-elles avant ou après le salam ? La règle malikite : avant le salam en cas d’omission, après en cas d’ajout.',
      'اختلفت المذاهب في موضع سجود السهو، وقاعدة المالكية: القبلي للنقص والبعدي للزيادة.',
      'Las escuelas difieren sobre si estas dos postraciones van antes o después del salam. La regla malikí: antes del salam si se omitió algo, después si se añadió algo.',
    ),
  },
]

/* ------------------------------------------------------------------ the voluntary prayers */

export const SUNNAH_STEPS: SalatStep[] = [
  {
    id: 'rawatib',
    title: t('Twelve rak‘ahs a day', 'Douze rak‘as par jour', 'اثنتا عشرة ركعة في اليوم', 'Doce rak‘as al día'),
    text: t(
      'Whoever prays twelve voluntary rak‘ahs in a day and night has a house built for him in Paradise: four before Dhuhr and two after it, two after Maghrib, two after ‘Isha and two before Fajr.',
      'Celui qui prie douze rak‘as surérogatoires en un jour et une nuit, une maison lui est bâtie au Paradis : quatre avant le Dhuhr et deux après, deux après le Maghrib, deux après l’‘Isha et deux avant le Fajr.',
      'من صلى اثنتي عشرة ركعة تطوعًا في يوم وليلة بُني له بيت في الجنة: أربعًا قبل الظهر وركعتين بعدها، وركعتين بعد المغرب، وركعتين بعد العشاء، وركعتين قبل الفجر.',
      'A quien reza doce rak‘as voluntarias en un día y una noche se le construye una casa en el Paraíso: cuatro antes del Duhr y dos después, dos después del Magrib, dos después del ‘Isha y dos antes del Fayr.',
    ),
    l: 'hadith',
    r: ['muslim:728', 'tirmidhi:415', 'bukhari:1180'],
    quotes: [
      q(
        'twelve',
        'مَنْ صَلَّى اثْنَتَىْ عَشْرَةَ رَكْعَةً فِي يَوْمٍ وَلَيْلَةٍ بُنِيَ لَهُ بِهِنَّ بَيْتٌ فِي الْجَنَّةِ',
        t(
          'Whoever prays twelve rak‘ahs in a day and night, a house is built for him in Paradise for them.',
          'Celui qui prie douze rak‘as en un jour et une nuit, une maison lui est bâtie au Paradis grâce à elles.',
          'رواه أم حبيبة رضي الله عنها.',
          'A quien rece doce rak‘as en un día y una noche se le construye por ellas una casa en el Paraíso.',
        ),
        ['muslim:728'],
      ),
      q(
        'twelve-detail',
        'مَنْ صَلَّى فِي يَوْمٍ وَلَيْلَةٍ ثِنْتَىْ عَشْرَةَ رَكْعَةً بُنِيَ لَهُ بَيْتٌ فِي الْجَنَّةِ أَرْبَعًا قَبْلَ الظُّهْرِ وَرَكْعَتَيْنِ بَعْدَهَا وَرَكْعَتَيْنِ بَعْدَ الْمَغْرِبِ وَرَكْعَتَيْنِ بَعْدَ الْعِشَاءِ وَرَكْعَتَيْنِ قَبْلَ صَلاَةِ الْفَجْرِ',
        t(
          'Whoever prays twelve rak‘ahs in a day and night has a house built for him in Paradise: four before Dhuhr and two after it, two after Maghrib, two after ‘Isha and two before the Fajr prayer.',
          'Celui qui prie douze rak‘as en un jour et une nuit, une maison lui est bâtie au Paradis : quatre avant le Dhuhr et deux après, deux après le Maghrib, deux après l’‘Isha et deux avant la prière du Fajr.',
          'تفصيل الرواتب في رواية الترمذي.',
          'A quien rece doce rak‘as en un día y una noche se le construye una casa en el Paraíso: cuatro antes del Duhr y dos después, dos después del Magrib, dos después del ‘Isha y dos antes de la oración del Fayr.',
        ),
        ['tirmidhi:415'],
        { grade: SAHIH_ALBANI },
      ),
    ],
    note: t(
      'Ibn ‘Umar counted ten, with two rak‘ahs before Dhuhr (al-Bukhari 1180); both reports are authentic. The Maliki school encourages voluntary prayers before and after the obligatory ones without fixing their number, and holds the two rak‘ahs before Fajr (al-raghibah) as the most stressed.',
      'Ibn ‘Umar en a compté dix, avec deux rak‘as avant le Dhuhr (al-Bukhari 1180) ; les deux récits sont authentiques. L’école malikite encourage les prières surérogatoires avant et après les obligatoires sans en fixer le nombre, et tient les deux rak‘as avant le Fajr (ar-raghiba) pour les plus appuyées.',
      'عدّها ابن عمر عشرًا بركعتين قبل الظهر (البخاري 1180)، وكلا الروايتين صحيح. ويستحب المالكية التنفل قبل الفرائض وبعدها دون تحديد عدد، وآكدها ركعتا الفجر (الرغيبة).',
      'Ibn ‘Umar contó diez, con dos rak‘as antes del Duhr (al-Bujari 1180); ambos relatos son auténticos. La escuela malikí anima a las oraciones voluntarias antes y después de las obligatorias sin fijar su número, y considera las dos rak‘as antes del Fayr (ar-ragiba) las más recomendadas.',
    ),
  },
  {
    id: 'fajr-two',
    title: t('The two rak‘ahs before Fajr', 'Les deux rak‘as avant le Fajr', 'ركعتا الفجر', 'Las dos rak‘as antes del Fayr'),
    text: t(
      'Two short rak‘ahs between the dawn adhan and the Fajr prayer. The Prophet ﷺ never left them, at home or travelling.',
      'Deux rak‘as courtes entre l’adhan de l’aube et la prière du Fajr. Le Prophète ﷺ ne les délaissait jamais, chez lui comme en voyage.',
      'ركعتان خفيفتان بين أذان الفجر والصلاة، لم يكن النبي ﷺ يدعهما حضرًا ولا سفرًا.',
      'Dos rak‘as breves entre el adán del alba y la oración del Fayr. El Profeta ﷺ nunca las dejaba, en casa ni de viaje.',
    ),
    l: 'hadith',
    r: ['muslim:725'],
    quotes: [
      q(
        'fajr-two',
        'رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا',
        t('The two rak‘ahs of Fajr are better than the world and all it holds.', 'Les deux rak‘as du Fajr valent mieux que ce bas monde et ce qu’il contient.', 'فضل سنة الفجر.', 'Las dos rak‘as del Fayr son mejores que el mundo y lo que contiene.'),
        ['muslim:725'],
      ),
    ],
    note: t(
      'In the Maliki school a silent supplication (qunut) is recommended in the second rak‘ah of the Fajr prayer itself, before bowing; the Hanafi and Hanbali schools do not make it a regular practice.',
      'Dans l’école malikite, une invocation silencieuse (qunut) est recommandée à la deuxième rak‘a de la prière du Fajr elle-même, avant l’inclinaison ; les écoles hanafite et hanbalite n’en font pas une pratique régulière.',
      'يستحب المالكية القنوت سرًّا في الركعة الثانية من صلاة الصبح قبل الركوع، ولا يداوم عليه الحنفية والحنابلة.',
      'En la escuela malikí se recomienda una súplica en silencio (qunut) en la segunda rak‘a de la propia oración del Fayr, antes de inclinarse; las escuelas hanafí y hanbalí no la hacen práctica habitual.',
    ),
  },
  {
    id: 'witr',
    title: t('The witr', 'Le witr', 'الوتر', 'El witr'),
    text: t(
      'An odd number of rak‘ahs, at least one, prayed after ‘Isha and before Fajr: the last prayer of the night.',
      'Un nombre impair de rak‘as, au moins une, prié après l’‘Isha et avant le Fajr : la dernière prière de la nuit.',
      'ركعات وتر، أقلها ركعة، تُصلّى بعد العشاء وقبل الفجر، وهي آخر صلاة الليل.',
      'Un número impar de rak‘as, al menos una, rezado después del ‘Isha y antes del Fayr: la última oración de la noche.',
    ),
    l: 'hadith',
    r: ['bukhari:998'],
    quotes: [
      q(
        'witr',
        'اجْعَلُوا آخِرَ صَلاَتِكُمْ بِاللَّيْلِ وِتْرًا',
        t('Make the last of your prayer at night an odd number.', 'Faites de la dernière de vos prières de la nuit un nombre impair.', 'الوتر خاتمة صلاة الليل.', 'Haced que la última de vuestras oraciones de la noche sea impar.'),
        ['bukhari:998'],
      ),
    ],
    note: t(
      'In the Maliki school the witr is one rak‘ah, prayed after two rak‘ahs (al-shaf‘) separated from it by a salam.',
      'Dans l’école malikite, le witr est une rak‘a, priée après deux rak‘as (ash-shaf‘) séparées d’elle par un salam.',
      'الوتر عند المالكية ركعة واحدة يسبقها شفع يُفصل بينهما بسلام.',
      'En la escuela malikí el witr es una rak‘a, rezada tras dos rak‘as (ash-shaf‘) separadas de ella por un salam.',
    ),
  },
  {
    id: 'duha',
    title: t('The forenoon prayer (duha)', 'La prière du matin (duha)', 'صلاة الضحى', 'La oración de media mañana (duha)'),
    text: t(
      'At least two rak‘ahs, once the sun has risen well and before noon. The Prophet ﷺ advised Abu Hurayrah never to leave it.',
      'Au moins deux rak‘as, une fois le soleil bien levé et avant midi. Le Prophète ﷺ a recommandé à Abu Hurayra de ne jamais la délaisser.',
      'ركعتان فأكثر بعد ارتفاع الشمس وقبل الزوال، وأوصى بها النبي ﷺ أبا هريرة.',
      'Al menos dos rak‘as, cuando el sol ya ha subido y antes del mediodía. El Profeta ﷺ aconsejó a Abu Hurayra no dejarla nunca.',
    ),
    l: 'hadith',
    r: ['bukhari:1178'],
    quotes: [
      q(
        'duha',
        'أَوْصَانِي خَلِيلِي بِثَلاَثٍ لاَ أَدَعُهُنَّ حَتَّى أَمُوتَ صَوْمِ ثَلاَثَةِ أَيَّامٍ مِنْ كُلِّ شَهْرٍ، وَصَلاَةِ الضُّحَى، وَنَوْمٍ عَلَى وِتْرٍ',
        t(
          'My close friend advised me of three things I will not leave until I die: fasting three days of every month, the duha prayer, and sleeping after the witr.',
          'Mon ami intime m’a recommandé trois choses que je ne délaisserai pas jusqu’à ma mort : jeûner trois jours chaque mois, la prière du duha, et dormir après le witr.',
          'وصية النبي ﷺ لأبي هريرة.',
          'Mi amigo íntimo me aconsejó tres cosas que no dejaré hasta morir: ayunar tres días cada mes, la oración del duha y dormir tras el witr.',
        ),
        ['bukhari:1178'],
      ),
    ],
  },
  {
    id: 'night',
    title: t('The night prayer', 'La prière de la nuit', 'قيام الليل', 'La oración de la noche'),
    text: t(
      'After the obligatory prayers, the best prayer is the one at night, above all in its last third, when Allah descends to the lowest heaven.',
      'Après les prières obligatoires, la meilleure prière est celle de la nuit, surtout dans son dernier tiers, quand Allah descend au ciel le plus bas.',
      'أفضل الصلاة بعد الفريضة صلاة الليل، ولا سيما ثلثه الأخير حين ينزل الله إلى السماء الدنيا.',
      'Tras las oraciones obligatorias, la mejor oración es la de la noche, sobre todo en su último tercio, cuando Allah desciende al cielo más bajo.',
    ),
    l: 'hadith',
    r: ['muslim:1163', '17:79', 'bukhari:1145'],
    quotes: [
      q(
        'night',
        'أَفْضَلُ الصَّلاَةِ بَعْدَ الْفَرِيضَةِ صَلاَةُ اللَّيْلِ',
        t('The best prayer after the obligatory one is the prayer at night.', 'La meilleure prière après l’obligatoire est la prière de la nuit.', 'فضل قيام الليل.', 'La mejor oración después de la obligatoria es la oración de la noche.'),
        ['muslim:1163'],
      ),
    ],
  },
  {
    id: 'mosque',
    title: t('Greeting the mosque', 'Saluer la mosquée', 'تحية المسجد', 'Saludar a la mezquita'),
    text: t(
      'On entering a mosque, pray two rak‘ahs before sitting down.',
      'En entrant dans une mosquée, prier deux rak‘as avant de s’asseoir.',
      'إذا دخل المسجد صلى ركعتين قبل أن يجلس.',
      'Al entrar en una mezquita, rezar dos rak‘as antes de sentarse.',
    ),
    l: 'hadith',
    r: ['bukhari:444'],
    quotes: [
      q(
        'mosque',
        'إِذَا دَخَلَ أَحَدُكُمُ الْمَسْجِدَ فَلْيَرْكَعْ رَكْعَتَيْنِ قَبْلَ أَنْ يَجْلِسَ',
        t('When one of you enters the mosque, let him pray two rak‘ahs before he sits.', 'Quand l’un de vous entre à la mosquée, qu’il prie deux rak‘as avant de s’asseoir.', 'تحية المسجد.', 'Cuando uno de vosotros entre en la mezquita, que rece dos rak‘as antes de sentarse.'),
        ['bukhari:444'],
      ),
    ],
  },
  {
    id: 'jamaa',
    title: t('In congregation, and on Friday', 'En assemblée, et le vendredi', 'الجماعة والجمعة', 'En congregación, y el viernes'),
    text: t(
      'The prayer in congregation is worth twenty-seven times the prayer alone. On Friday, the Jumu‘ah prayer with its sermon replaces Dhuhr for men.',
      'La prière en assemblée vaut vingt-sept fois la prière seule. Le vendredi, la prière du Jumu‘a avec son sermon remplace le Dhuhr pour les hommes.',
      'صلاة الجماعة تفضل صلاة الفرد بسبع وعشرين درجة، ويوم الجمعة تقوم صلاة الجمعة بخطبتها مقام الظهر للرجال.',
      'La oración en congregación vale veintisiete veces la oración a solas. El viernes, la oración del Yumu‘a con su sermón sustituye al Duhr para los hombres.',
    ),
    l: 'hadith',
    r: ['bukhari:645', '62:9'],
    quotes: [
      q(
        'jamaa',
        'صَلاَةُ الْجَمَاعَةِ تَفْضُلُ صَلاَةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً',
        t('The prayer in congregation surpasses the prayer alone by twenty-seven degrees.', 'La prière en assemblée dépasse la prière seule de vingt-sept degrés.', 'فضل صلاة الجماعة.', 'La oración en congregación supera a la oración a solas en veintisiete grados.'),
        ['bukhari:645'],
      ),
    ],
  },
]

const ALL: [string, SalatStep[]][] = [
  ['what', SALAT_WHAT],
  ['before', SALAT_BEFORE],
  ['wudu', WUDU_STEPS],
  ['how', [HOW_MODEL, ...HOW_STEPS]],
  ['sunnah', SUNNAH_STEPS],
]

/** Every quote, for the checker. */
export const SALAT_QUOTES: (Supplication & { where: string })[] = ALL.flatMap(([part, steps]) =>
  steps.flatMap((s) => (s.quotes ?? []).map((d) => ({ where: `salat/${part}/${s.id}/${d.id}`, ...d }))),
)

/** References with no quote, for the checker. */
export const SALAT_REFS: { where: string; r: Ref[] }[] = ALL.flatMap(([part, steps]) => steps.map((s) => ({ where: `salat/${part}/${s.id}`, r: s.r })))
