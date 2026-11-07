// The times of the day: the five prayers, what the Sunnah teaches for each part of the day and night,
// and the morning, evening and bedtime remembrances. Arabic texts are copied from the hadith they cite
// and checked by `npm run verify:duas`. Qur'an passages are listed in `verse` and read from the Mushaf.
import type { L4, Level, Ref } from './types'
import type { Supplication } from './duas'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

export type PrayerId = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'

export interface PrayerInfo {
  id: PrayerId
  name: L4
  /** Obligatory rak‘ahs; the sunrise is not a prayer. */
  fard?: number
  sunnah?: L4
  r?: Ref[]
}

export const PRAYERS: PrayerInfo[] = [
  {
    id: 'fajr', name: t('Fajr', 'Fajr (aube)', 'الفجر', 'Fayr (alba)'), fard: 2,
    sunnah: t('2 rak‘ahs before: “better than the world and all it holds”', '2 rak‘as avant : « meilleures que ce bas monde et ce qu’il contient »', 'ركعتان قبلها: «خير من الدنيا وما فيها»', '2 rak‘as antes: «mejores que el mundo y lo que contiene»'),
    r: ['muslim:725'],
  },
  { id: 'sunrise', name: t('Sunrise', 'Lever du soleil', 'الشروق', 'Salida del sol') },
  {
    id: 'dhuhr', name: t('Dhuhr', 'Dhuhr (midi)', 'الظهر', 'Duhr (mediodía)'), fard: 4,
    sunnah: t('4 rak‘ahs before and 2 after', '4 rak‘as avant et 2 après', 'أربع قبلها وركعتان بعدها', '4 rak‘as antes y 2 después'),
    r: ['tirmidhi:415'],
  },
  { id: 'asr', name: t('‘Asr', '‘Asr (après-midi)', 'العصر', '‘Asr (tarde)'), fard: 4, r: ['bukhari:553'] },
  {
    id: 'maghrib', name: t('Maghrib', 'Maghrib (coucher)', 'المغرب', 'Magrib (ocaso)'), fard: 3,
    sunnah: t('2 rak‘ahs after', '2 rak‘as après', 'ركعتان بعدها', '2 rak‘as después'),
    r: ['tirmidhi:415'],
  },
  {
    id: 'isha', name: t('‘Isha', '‘Isha (nuit)', 'العشاء', '‘Isha (noche)'), fard: 4,
    sunnah: t('2 rak‘ahs after, then witr before sleeping or at the end of the night', '2 rak‘as après, puis le witr avant de dormir ou en fin de nuit', 'ركعتان بعدها، ثم الوتر قبل النوم أو آخر الليل', '2 rak‘as después, y luego el witr antes de dormir o al final de la noche'),
    r: ['tirmidhi:415', 'bukhari:998'],
  },
]

export interface GuideItem {
  text: L4
  l: Level
  r: Ref[]
  grade?: L4
}

export type DayPartId = 'lastThird' | 'adhan' | 'fajr' | 'sunrise' | 'duha' | 'zenith' | 'dhuhr' | 'asr' | 'sunset' | 'maghrib' | 'isha' | 'sleep' | 'waking'

export interface DayPart {
  id: DayPartId
  title: L4
  /** When it is, in words. */
  span: L4
  /** Prayer whose time starts this part, used to light the part that is now. */
  from?: PrayerId | 'lastThird'
  guide: GuideItem[]
  /** Remembrances that belong to this time, by id (see ADHKAR). */
  adhkar?: string[]
}

const SAHIH_ALBANI = t('Sahih (al-Albani)', 'Sahih (al-Albani)', 'صحيح (الألباني)', 'Sahih (al-Albani)')
const HASAN_ALBANI = t('Hasan (al-Albani)', 'Hasan (al-Albani)', 'حسن (الألباني)', 'Hasan (al-Albani)')

export const DAY_PARTS: DayPart[] = [
  {
    id: 'lastThird',
    title: t('The last third of the night', 'Le dernier tiers de la nuit', 'الثلث الأخير من الليل', 'El último tercio de la noche'),
    span: t('From the last third of the night until Fajr', 'Du dernier tiers de la nuit jusqu’au Fajr', 'من ثلث الليل الآخر إلى الفجر', 'Del último tercio de la noche hasta el Fayr'),
    from: 'lastThird',
    guide: [
      {
        text: t(
          'Allah descends to the nearest heaven and says: “Who is calling on Me, that I may answer him? Who is asking of Me, that I may give him? Who is asking My forgiveness, that I may forgive him?” Pray at night, ask and seek forgiveness.',
          'Allah descend au ciel le plus proche et dit : « Qui M’invoque, que Je lui réponde ? Qui Me demande, que Je lui donne ? Qui implore Mon pardon, que Je lui pardonne ? » Prie la nuit, demande et implore le pardon.',
          'ينزل ربنا كل ليلة إلى السماء الدنيا حين يبقى ثلث الليل الآخر فيقول: من يدعوني فأستجيب له، من يسألني فأعطيه، من يستغفرني فأغفر له. فقم وادعُ واستغفر.',
          'Allah desciende al cielo más cercano y dice: «¿Quién Me invoca para que le responda? ¿Quién Me pide para que le dé? ¿Quién Me pide perdón para que le perdone?». Reza de noche, pide y busca el perdón.',
        ),
        l: 'hadith', r: ['bukhari:1145'],
      },
      {
        text: t('End your night prayer with witr.', 'Termine ta prière de nuit par le witr.', 'اجعل آخر صلاتك بالليل وترًا.', 'Termina tu oración nocturna con el witr.'),
        l: 'hadith', r: ['bukhari:998'],
      },
    ],
  },
  {
    id: 'adhan',
    title: t('At every call to prayer', 'À chaque appel à la prière', 'عند كل أذان', 'En cada llamada a la oración'),
    span: t('When you hear the adhan, and until the iqamah', 'Quand tu entends l’adhan, et jusqu’à l’iqama', 'عند سماع الأذان وإلى الإقامة', 'Al oír el adán y hasta la iqama'),
    guide: [
      {
        text: t('Repeat what the muezzin says.', 'Répète ce que dit le muezzin.', 'قل مثل ما يقول المؤذن.', 'Repite lo que dice el almuédano.'),
        l: 'hadith', r: ['muslim:384'],
      },
      {
        text: t('A supplication between the adhan and the iqamah is not turned back.', 'L’invocation entre l’adhan et l’iqama n’est pas rejetée.', 'الدعاء لا يُرد بين الأذان والإقامة.', 'La súplica entre el adán y la iqama no es rechazada.'),
        l: 'hadith', r: ['tirmidhi:212', 'abudawud:521'], grade: SAHIH_ALBANI,
      },
    ],
    adhkar: ['after-adhan'],
  },
  {
    id: 'fajr',
    title: t('Fajr until sunrise', 'Du Fajr au lever du soleil', 'من الفجر إلى الشروق', 'Del Fayr a la salida del sol'),
    span: t('From true dawn until the sun rises', 'De l’aube vraie jusqu’au lever du soleil', 'من طلوع الفجر الصادق إلى طلوع الشمس', 'Del alba verdadera hasta que sale el sol'),
    from: 'fajr',
    guide: [
      {
        text: t('Pray the two rak‘ahs before Fajr: they are better than the world and all it holds.', 'Prie les deux rak‘as avant le Fajr : elles valent mieux que ce bas monde et ce qu’il contient.', 'صلّ ركعتي الفجر، فهما خير من الدنيا وما فيها.', 'Reza las dos rak‘as antes del Fayr: son mejores que el mundo y lo que contiene.'),
        l: 'hadith', r: ['muslim:725'],
      },
      {
        text: t('After Fajr he would stay in his place of prayer until the sun had risen.', 'Après le Fajr, il restait à sa place de prière jusqu’au lever du soleil.', 'كان لا يقوم من مصلاه الذي صلى فيه الصبح حتى تطلع الشمس.', 'Tras el Fayr se quedaba en su lugar de oración hasta que salía el sol.'),
        l: 'hadith', r: ['muslim:670'],
      },
      {
        text: t('The morning remembrances are said now.', 'C’est le moment des invocations du matin.', 'وهذا وقت أذكار الصباح.', 'Es el momento de los recuerdos de la mañana.'),
        l: 'hadith', r: ['muslim:2723', 'abudawud:5068'],
      },
    ],
    adhkar: ['after-prayer', 'tasbih-after-prayer', 'morning-evening-1', 'sayyid-istighfar', 'three-quls', 'bismillah', 'bika-asbahna', 'afiya', 'subhan-100', 'tahlil-100'],
  },
  {
    id: 'sunrise',
    title: t('As the sun rises', 'Au lever du soleil', 'عند طلوع الشمس', 'Al salir el sol'),
    span: t('From sunrise until the sun has risen a little', 'Du lever du soleil jusqu’à ce qu’il soit un peu haut', 'من طلوع الشمس حتى ترتفع', 'Desde la salida del sol hasta que se eleva un poco'),
    from: 'sunrise',
    guide: [
      {
        text: t(
          'Do not pray voluntary prayers while the sun is rising until it is up, at midday until it passes the zenith, or while it is setting. These three moments are not times of prayer.',
          'Ne fais pas de prière surérogatoire pendant que le soleil se lève jusqu’à ce qu’il soit haut, à midi jusqu’à ce qu’il dépasse le zénith, ni pendant qu’il se couche.',
          'نهى عن الصلاة في ثلاث ساعات: حين تطلع الشمس حتى ترتفع، وحين يقوم قائم الظهيرة حتى تميل، وحين تتضيّف للغروب حتى تغرب.',
          'No reces oraciones voluntarias mientras sale el sol hasta que esté alto, a mediodía hasta que pase el cénit, ni mientras se pone.',
        ),
        l: 'hadith', r: ['muslim:831'],
      },
    ],
  },
  {
    id: 'duha',
    title: t('The forenoon (Duha)', 'La matinée (Duha)', 'وقت الضحى', 'La mañana (Duha)'),
    span: t('From when the sun is up until shortly before Dhuhr', 'Du moment où le soleil est haut jusqu’un peu avant le Dhuhr', 'من ارتفاع الشمس إلى قبيل الظهر', 'Desde que el sol está alto hasta poco antes del Duhr'),
    guide: [
      {
        text: t(
          'Every joint of the body owes a charity each day; two rak‘ahs of Duha are enough for all of it.',
          'Chaque articulation du corps doit une aumône chaque jour ; deux rak‘as de Duha suffisent pour tout cela.',
          'يصبح على كل سُلامى من أحدكم صدقة، ويجزئ من ذلك ركعتان يركعهما من الضحى.',
          'Cada articulación del cuerpo debe una limosna cada día; dos rak‘as de Duha bastan para todo ello.',
        ),
        l: 'hadith', r: ['muslim:720'],
      },
    ],
  },
  {
    id: 'zenith',
    title: t('At the zenith', 'Au zénith', 'عند الزوال', 'En el cénit'),
    span: t('A few minutes before Dhuhr', 'Quelques minutes avant le Dhuhr', 'دقائق قبل الظهر', 'Unos minutos antes del Duhr'),
    guide: [
      {
        text: t('A short time when voluntary prayer is not offered, until the sun passes the zenith.', 'Un court moment sans prière surérogatoire, jusqu’à ce que le soleil passe le zénith.', 'وقت قصير لا يُتنفّل فيه حتى تميل الشمس.', 'Un breve momento sin oración voluntaria, hasta que el sol pasa el cénit.'),
        l: 'hadith', r: ['muslim:831'],
      },
    ],
  },
  {
    id: 'dhuhr',
    title: t('Dhuhr', 'Dhuhr', 'الظهر', 'Duhr'),
    span: t('From just after midday until ‘Asr', 'De juste après midi jusqu’au ‘Asr', 'من زوال الشمس إلى العصر', 'Desde justo después del mediodía hasta el ‘Asr'),
    from: 'dhuhr',
    guide: [
      {
        text: t(
          'Whoever prays twelve rak‘ahs a day besides the obligatory ones has a house built for him in Paradise: 4 before Dhuhr and 2 after, 2 after Maghrib, 2 after ‘Isha and 2 before Fajr.',
          'Celui qui prie douze rak‘as par jour en plus des obligatoires, une maison lui est bâtie au Paradis : 4 avant le Dhuhr et 2 après, 2 après le Maghrib, 2 après le ‘Isha et 2 avant le Fajr.',
          'من صلى في يوم وليلة ثنتي عشرة ركعة بُني له بيت في الجنة: أربعًا قبل الظهر وركعتين بعدها، وركعتين بعد المغرب، وركعتين بعد العشاء، وركعتين قبل الفجر.',
          'Quien reza doce rak‘as al día además de las obligatorias, se le construye una casa en el Paraíso: 4 antes del Duhr y 2 después, 2 después del Magrib, 2 después del ‘Isha y 2 antes del Fayr.',
        ),
        l: 'hadith', r: ['tirmidhi:415'], grade: SAHIH_ALBANI,
      },
    ],
  },
  {
    id: 'asr',
    title: t('‘Asr until sunset', 'Du ‘Asr au coucher du soleil', 'من العصر إلى الغروب', 'Del ‘Asr a la puesta del sol'),
    span: t('The afternoon, and the time of the evening remembrances', 'L’après-midi, et le temps des invocations du soir', 'العصر، ووقت أذكار المساء', 'La tarde, y el tiempo de los recuerdos del atardecer'),
    from: 'asr',
    guide: [
      {
        text: t('Guard the ‘Asr prayer: “Whoever leaves the ‘Asr prayer, his deeds are lost.”', 'Préserve la prière du ‘Asr : « Celui qui délaisse la prière du ‘Asr, ses œuvres sont perdues. »', 'حافظ على صلاة العصر: «من ترك صلاة العصر فقد حبط عمله».', 'Cuida la oración del ‘Asr: «Quien abandona la oración del ‘Asr, sus obras se pierden».'),
        l: 'hadith', r: ['bukhari:553'],
      },
      {
        text: t('The evening remembrances are said from now until night.', 'Les invocations du soir se disent maintenant, jusqu’à la nuit.', 'وتُقال أذكار المساء من الآن إلى الليل.', 'Los recuerdos del atardecer se dicen ahora, hasta la noche.'),
        l: 'hadith', r: ['muslim:2723'],
      },
    ],
    adhkar: ['morning-evening-1', 'sayyid-istighfar', 'three-quls', 'bismillah', 'bika-asbahna', 'afiya', 'subhan-100'],
  },
  {
    id: 'sunset',
    title: t('Dusk', 'Le crépuscule', 'عند الغروب', 'El anochecer'),
    span: t('As the sun sets and night begins', 'Quand le soleil se couche et que la nuit tombe', 'حين تغرب الشمس ويقبل الليل', 'Cuando se pone el sol y llega la noche'),
    guide: [
      {
        text: t('When night falls, keep your children inside for a while, then let them out.', 'Quand la nuit tombe, garde tes enfants à l’intérieur un moment, puis laisse-les sortir.', 'إذا كان جنح الليل فكفّوا صبيانكم، ثم خلّوهم بعد ساعة.', 'Cuando cae la noche, mantén a tus hijos dentro un rato y luego déjalos salir.'),
        l: 'hadith', r: ['bukhari:3304'],
      },
    ],
  },
  {
    id: 'maghrib',
    title: t('Maghrib', 'Maghrib', 'المغرب', 'Magrib'),
    span: t('From sunset until the red twilight disappears', 'Du coucher du soleil jusqu’à la disparition du crépuscule rouge', 'من الغروب إلى مغيب الشفق', 'Desde la puesta del sol hasta que desaparece el crepúsculo'),
    from: 'maghrib',
    guide: [
      {
        text: t('Pray two rak‘ahs after Maghrib.', 'Prie deux rak‘as après le Maghrib.', 'صلّ ركعتين بعد المغرب.', 'Reza dos rak‘as después del Magrib.'),
        l: 'hadith', r: ['tirmidhi:415'], grade: SAHIH_ALBANI,
      },
    ],
    adhkar: ['after-prayer', 'tasbih-after-prayer'],
  },
  {
    id: 'isha',
    title: t('‘Isha', '‘Isha', 'العشاء', '‘Isha'),
    span: t('The night, until the last third', 'La nuit, jusqu’au dernier tiers', 'الليل، إلى ثلثه الأخير', 'La noche, hasta el último tercio'),
    from: 'isha',
    guide: [
      {
        text: t('He disliked sleeping before ‘Isha and talking after it: sleep early, to wake for the night and for Fajr.', 'Il n’aimait pas dormir avant le ‘Isha ni parler après : dors tôt, pour te lever la nuit et pour le Fajr.', 'كان يكره النوم قبل العشاء والحديث بعدها: فبكّر بالنوم لتقوم الليل والفجر.', 'No le gustaba dormir antes del ‘Isha ni conversar después: duerme temprano para levantarte de noche y para el Fayr.'),
        l: 'hadith', r: ['bukhari:568'],
      },
    ],
  },
  {
    id: 'sleep',
    title: t('Before sleeping', 'Avant de dormir', 'قبل النوم', 'Antes de dormir'),
    span: t('In bed, before sleep', 'Au lit, avant le sommeil', 'عند أخذ المضجع', 'En la cama, antes de dormir'),
    guide: [
      {
        text: t(
          'Make ablution as for prayer, lie on your right side, and make the supplication below your last words.',
          'Fais tes ablutions comme pour la prière, couche-toi sur le côté droit, et que l’invocation ci-dessous soit tes dernières paroles.',
          'توضأ وضوءك للصلاة، ثم اضطجع على شقك الأيمن، واجعل الدعاء التالي آخر ما تتكلم به.',
          'Haz la ablución como para la oración, acuéstate sobre el lado derecho y que la súplica de abajo sean tus últimas palabras.',
        ),
        l: 'hadith', r: ['bukhari:247'],
      },
      {
        text: t('Read the Verse of the Throne (2:255): a guardian from Allah stays with you until morning.', 'Lis le Verset du Trône (2:255) : un gardien d’Allah reste avec toi jusqu’au matin.', 'اقرأ آية الكرسي، فلا يزال عليك من الله حافظ حتى تصبح.', 'Lee el Versículo del Trono (2:255): un guardián de Allah permanece contigo hasta la mañana.'),
        l: 'hadith', r: ['bukhari:2311', '2:255'],
      },
      {
        text: t(
          'Each night he joined his palms, blew into them, read Al-Ikhlas, Al-Falaq and Al-Nas, and wiped over his body, three times.',
          'Chaque nuit, il joignait ses paumes, soufflait dedans, lisait Al-Ikhlas, Al-Falaq et An-Nas, et passait ses mains sur son corps, trois fois.',
          'كان إذا أوى إلى فراشه كل ليلة جمع كفيه ثم نفث فيهما فقرأ الإخلاص والمعوذتين ثم مسح بهما ما استطاع من جسده، ثلاث مرات.',
          'Cada noche juntaba las palmas, soplaba en ellas, leía Al-Ijlas, Al-Falaq y An-Nas, y se pasaba las manos por el cuerpo, tres veces.',
        ),
        l: 'hadith', r: ['bukhari:5017'],
      },
      {
        text: t(
          'He taught ‘Ali and Fatimah, instead of a servant: say Allahu akbar 34 times, Subhan Allah 33 times and al-hamdu lillah 33 times.',
          'Il enseigna à ‘Ali et Fatima, au lieu d’un serviteur : dire Allahu akbar 34 fois, Subhan Allah 33 fois et al-hamdu lillah 33 fois.',
          'علّم عليًّا وفاطمة بدل الخادم: تكبّرا أربعًا وثلاثين، وتسبّحا ثلاثًا وثلاثين، وتحمدا ثلاثًا وثلاثين.',
          'Enseñó a ‘Ali y Fátima, en lugar de un sirviente: decir Allahu akbar 34 veces, Subhan Allah 33 veces y al-hamdu lillah 33 veces.',
        ),
        l: 'hadith', r: ['bukhari:3705'],
      },
    ],
    adhkar: ['sleep-1', 'sleep-2'],
  },
  {
    id: 'waking',
    title: t('On waking', 'Au réveil', 'عند الاستيقاظ', 'Al despertar'),
    span: t('When you wake up', 'Quand tu te réveilles', 'إذا استيقظت', 'Cuando despiertas'),
    guide: [],
    adhkar: ['waking'],
  },
]

/** Friday, the weekly day, with its hour of answered prayer. */
export const FRIDAY: GuideItem = {
  text: t(
    'On Friday there is an hour in which no Muslim stands in prayer asking Allah for something but He gives it to him.',
    'Le vendredi, il y a une heure où aucun musulman debout en prière ne demande quelque chose à Allah sans qu’Il le lui accorde.',
    'في يوم الجمعة ساعة لا يوافقها عبد مسلم وهو قائم يصلي يسأل الله شيئًا إلا أعطاه إياه.',
    'El viernes hay una hora en la que ningún musulmán que esté rezando pide algo a Allah sin que Él se lo conceda.',
  ),
  l: 'hadith',
  r: ['bukhari:935'],
}

/** Remembrances, by id. `count` is the number given in the hadith. */
export const ADHKAR: Record<string, Supplication & { title: L4 }> = {
  'after-adhan': {
    id: 'after-adhan',
    title: t('After the adhan', 'Après l’adhan', 'بعد الأذان', 'Después del adán'),
    ar: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلاَةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    meaning: t(
      'O Allah, Lord of this perfect call and of the prayer about to be established, give Muhammad al-Wasilah and excellence, and raise him to the praised station You promised him.',
      'Ô Allah, Seigneur de cet appel parfait et de la prière qui va être accomplie, accorde à Muhammad al-Wasila et l’excellence, et élève-le au rang louable que Tu lui as promis.',
      'من قالها حين يسمع النداء حلّت له شفاعة النبي ﷺ يوم القيامة.',
      'Oh Allah, Señor de esta llamada perfecta y de la oración que va a establecerse, concede a Muhammad al-Wasila y la excelencia, y elévalo a la posición loable que le prometiste.',
    ),
    r: ['bukhari:614'],
    l: 'hadith',
  },
  'after-prayer': {
    id: 'after-prayer',
    title: t('After each prayer', 'Après chaque prière', 'بعد كل صلاة', 'Después de cada oración'),
    ar: 'اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ تَبَارَكْتَ ذَا الْجَلاَلِ وَالإِكْرَامِ',
    meaning: t(
      'After saying “astaghfirullah” three times: O Allah, You are Peace and from You is peace. Blessed are You, Owner of majesty and honour.',
      'Après avoir dit « astaghfirullah » trois fois : Ô Allah, Tu es la Paix et de Toi vient la paix. Béni sois-Tu, Détenteur de la majesté et de la générosité.',
      'كان إذا انصرف من صلاته استغفر ثلاثًا ثم قال هذا.',
      'Tras decir «astaghfirullah» tres veces: Oh Allah, Tú eres la Paz y de Ti viene la paz. Bendito seas, Dueño de la majestad y la generosidad.',
    ),
    r: ['muslim:591'],
    l: 'hadith',
  },
  'tasbih-after-prayer': {
    id: 'tasbih-after-prayer',
    title: t('33 + 33 + 33, then 1', '33 + 33 + 33, puis 1', 'ثلاث وثلاثون ثلاثًا ثم تمام المائة', '33 + 33 + 33, y luego 1'),
    ar: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَىْءٍ قَدِيرٌ',
    meaning: t(
      'Say Subhan Allah 33 times, al-hamdu lillah 33 times and Allahu akbar 33 times, and complete the hundred with these words: his sins are forgiven, even if they are like the foam of the sea.',
      'Dis Subhan Allah 33 fois, al-hamdu lillah 33 fois et Allahu akbar 33 fois, et complète la centaine par ces paroles : ses péchés sont pardonnés, fussent-ils comme l’écume de la mer.',
      'سبّح ثلاثًا وثلاثين، واحمد ثلاثًا وثلاثين، وكبّر ثلاثًا وثلاثين، وتمام المائة هذه الكلمة؛ تُغفر خطاياه وإن كانت مثل زبد البحر.',
      'Di Subhan Allah 33 veces, al-hamdu lillah 33 veces y Allahu akbar 33 veces, y completa el cien con estas palabras: sus pecados son perdonados aunque sean como la espuma del mar.',
    ),
    r: ['muslim:597'],
    l: 'hadith',
  },
  'morning-evening-1': {
    id: 'morning-evening-1',
    title: t('Evening (in the morning: “asbahna”)', 'Le soir (le matin : « asbahna »)', 'في المساء (وفي الصباح: أصبحنا)', 'Al atardecer (por la mañana: «asbahna»)'),
    ar: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَىْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    meaning: t(
      'We have reached the evening, and the dominion belongs to Allah; praise is to Allah. There is no god but Allah alone, with no partner; His is the dominion and His the praise, and He has power over all things. My Lord, I ask You for the good of this night and what follows it, and seek refuge in You from the evil of this night and what follows it. My Lord, I seek refuge in You from laziness and the misery of old age; my Lord, from punishment in the Fire and punishment in the grave. In the morning he said the same, beginning “We have reached the morning…”.',
      'Nous voici au soir, et la royauté appartient à Allah ; louange à Allah. Il n’y a de divinité qu’Allah, Seul, sans associé ; à Lui la royauté et la louange, et Il est capable de toute chose. Seigneur, je Te demande le bien de cette nuit et de ce qui la suit, et je cherche refuge auprès de Toi contre le mal de cette nuit et de ce qui la suit. Seigneur, je cherche refuge auprès de Toi contre la paresse et les maux de la vieillesse ; Seigneur, contre le châtiment du Feu et celui de la tombe. Le matin, il disait la même chose en commençant par « Nous voici au matin… ».',
      'كان يقوله إذا أمسى، وإذا أصبح قال ذلك أيضًا: «أصبحنا وأصبح الملك لله».',
      'Hemos llegado al atardecer y el dominio pertenece a Allah; alabado sea Allah. No hay más dios que Allah, solo, sin asociado; Suyo es el dominio y Suya la alabanza, y Él tiene poder sobre todas las cosas. Señor mío, te pido el bien de esta noche y de lo que le sigue, y me refugio en Ti del mal de esta noche y de lo que le sigue. Señor mío, me refugio en Ti de la pereza y de los males de la vejez; Señor mío, del castigo del Fuego y del castigo de la tumba. Por la mañana decía lo mismo, empezando por «Hemos llegado a la mañana…».',
    ),
    r: ['muslim:2723'],
    l: 'hadith',
    src: [
      'أمسينا وأمسى الملك لله والحمد لله لا إله إلا الله وحده لا شريك له',
      'له الملك وله الحمد وهو على كل شيء قدير رب أسألك خير ما في هذه الليلة وخير ما بعدها وأعوذ بك من شر ما في هذه الليلة وشر ما بعدها رب أعوذ بك من الكسل وسوء الكبر رب أعوذ بك من عذاب في النار وعذاب في القبر',
      'وإذا أصبح قال ذلك أيضا أصبحنا وأصبح الملك لله',
    ],
  },
  'sayyid-istighfar': {
    id: 'sayyid-istighfar',
    title: t('The master of seeking forgiveness', 'Le maître de la demande de pardon', 'سيد الاستغفار', 'El señor de las peticiones de perdón'),
    ar: 'اللَّهُمَّ أَنْتَ رَبِّي، لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَىَّ وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
    meaning: t(
      'O Allah, You are my Lord; there is no god but You. You created me and I am Your servant, and I keep Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favour upon me and I acknowledge my sin, so forgive me, for none forgives sins but You. Whoever says it with certainty in the day and dies before evening, or in the night and dies before morning, is of the people of Paradise.',
      'Ô Allah, Tu es mon Seigneur ; il n’y a de divinité que Toi. Tu m’as créé et je suis Ton serviteur, et je respecte Ton pacte et Ta promesse autant que je peux. Je cherche refuge auprès de Toi contre le mal de ce que j’ai fait. Je reconnais Ton bienfait sur moi et je reconnais mon péché : pardonne-moi, car nul ne pardonne les péchés sauf Toi. Celui qui le dit avec certitude le jour et meurt avant le soir, ou la nuit et meurt avant le matin, est des gens du Paradis.',
      'من قالها موقنًا بها في النهار فمات قبل أن يمسي، أو في الليل فمات قبل أن يصبح، فهو من أهل الجنة.',
      'Oh Allah, Tú eres mi Señor; no hay más dios que Tú. Me creaste y soy Tu siervo, y cumplo Tu pacto y Tu promesa en lo que puedo. Me refugio en Ti del mal de lo que he hecho. Reconozco Tu favor sobre mí y reconozco mi pecado: perdóname, pues nadie perdona los pecados sino Tú. Quien lo dice con certeza de día y muere antes del atardecer, o de noche y muere antes de la mañana, es de la gente del Paraíso.',
    ),
    r: ['bukhari:6306'],
    l: 'hadith',
  },
  'three-quls': {
    id: 'three-quls',
    title: t('Al-Ikhlas, Al-Falaq and Al-Nas, three times', 'Al-Ikhlas, Al-Falaq et An-Nas, trois fois', 'الإخلاص والمعوذتان، ثلاث مرات', 'Al-Ijlas, Al-Falaq y An-Nas, tres veces'),
    ar: '',
    meaning: t(
      'Read the last three surahs three times in the evening and in the morning: “they will suffice you against everything.”',
      'Lis les trois dernières sourates trois fois le soir et le matin : « elles te suffiront contre toute chose ».',
      'قل هو الله أحد والمعوذتين حين تمسي وحين تصبح ثلاث مرات تكفيك من كل شيء.',
      'Lee las tres últimas suras tres veces al atardecer y por la mañana: «te bastarán contra todo».',
    ),
    count: 3,
    r: ['abudawud:5082', 'tirmidhi:3575', '112:1-4', '113:1-5', '114:1-6'],
    l: 'hadith',
    grade: HASAN_ALBANI,
    verse: '112:1-4',
  },
  bismillah: {
    id: 'bismillah',
    title: t('Three times, morning and evening', 'Trois fois, matin et soir', 'ثلاث مرات صباحًا ومساءً', 'Tres veces, mañana y tarde'),
    ar: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَىْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    meaning: t(
      'In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing. Whoever says it three times is not struck by sudden affliction.',
      'Au nom d’Allah, avec le nom de qui rien sur terre ni au ciel ne peut nuire, et Il est l’Audient, l’Omniscient. Celui qui le dit trois fois n’est pas frappé d’un malheur soudain.',
      'من قالها ثلاث مرات لم تصبه فجأة بلاء.',
      'En el nombre de Allah, con cuyo nombre nada en la tierra ni en el cielo puede dañar, y Él es el que todo lo oye, el que todo lo sabe. Quien lo dice tres veces no es alcanzado por una desgracia repentina.',
    ),
    count: 3,
    r: ['abudawud:5088', 'tirmidhi:3388'],
    l: 'hadith',
    grade: t('Sahih (al-Albani); hasan sahih (al-Tirmidhi)', 'Sahih (al-Albani) ; hasan sahih (at-Tirmidhi)', 'صحيح (الألباني)، حسن صحيح (الترمذي)', 'Sahih (al-Albani); hasan sahih (at-Tirmidi)'),
  },
  'bika-asbahna': {
    id: 'bika-asbahna',
    title: t('In the morning', 'Le matin', 'في الصباح', 'Por la mañana'),
    ar: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    meaning: t(
      'O Allah, by You we reach the morning and by You the evening, by You we live and by You we die, and to You is the resurrection. In the evening: “O Allah, by You we reach the evening, by You we live and by You we die, and to You is the resurrection.”',
      'Ô Allah, par Toi nous atteignons le matin et par Toi le soir, par Toi nous vivons et par Toi nous mourons, et vers Toi est la résurrection. Le soir : « Ô Allah, par Toi nous atteignons le soir, par Toi nous vivons et par Toi nous mourons, et vers Toi est la résurrection. »',
      'كان يقوله إذا أصبح، وإذا أمسى قال: «اللهم بك أمسينا وبك نحيا وبك نموت وإليك النشور».',
      'Oh Allah, por Ti llegamos a la mañana y por Ti al atardecer, por Ti vivimos y por Ti morimos, y hacia Ti es la resurrección. Al atardecer: «Oh Allah, por Ti llegamos al atardecer, por Ti vivimos y por Ti morimos, y hacia Ti es la resurrección».',
    ),
    r: ['abudawud:5068'],
    l: 'hadith',
    grade: SAHIH_ALBANI,
  },
  afiya: {
    id: 'afiya',
    title: t('Morning and evening: asking for well-being', 'Matin et soir : demander le salut', 'صباحًا ومساءً: سؤال العافية', 'Mañana y tarde: pedir el bienestar'),
    ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَاىَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَىَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    meaning: t(
      'O Allah, I ask You for well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly life, my family and my wealth. O Allah, cover my faults and calm my fears. O Allah, guard me from in front of me and behind me, from my right and my left and from above me, and I seek refuge in Your greatness from being seized from beneath me. He never left these words, morning and evening.',
      'Ô Allah, je Te demande le salut dans ce monde et dans l’au-delà. Ô Allah, je Te demande le pardon et le salut dans ma religion, ma vie, ma famille et mes biens. Ô Allah, couvre mes défauts et apaise mes craintes. Ô Allah, protège-moi devant moi et derrière moi, à ma droite, à ma gauche et au-dessus de moi, et je cherche refuge en Ta grandeur pour ne pas être saisi par en dessous. Il ne délaissait jamais ces paroles, matin et soir.',
      'لم يكن رسول الله ﷺ يدع هؤلاء الدعوات حين يمسي وحين يصبح.',
      'Oh Allah, te pido bienestar en este mundo y en la otra vida. Oh Allah, te pido perdón y bienestar en mi religión, mi vida, mi familia y mis bienes. Oh Allah, cubre mis faltas y calma mis temores. Oh Allah, protégeme por delante y por detrás, por mi derecha, por mi izquierda y por encima, y me refugio en Tu grandeza de ser atrapado por debajo. Nunca dejaba estas palabras, mañana y tarde.',
    ),
    r: ['abudawud:5074'],
    l: 'hadith',
    grade: SAHIH_ALBANI,
    src: [
      'اللهم إني أسألك العافية في الدنيا والآخرة اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي اللهم استر عورتي',
      'عوراتي وآمن روعاتي اللهم احفظني من بين يدي ومن خلفي وعن يميني وعن شمالي ومن فوقي وأعوذ بعظمتك أن أغتال من تحتي',
    ],
  },
  'subhan-100': {
    id: 'subhan-100',
    title: t('100 times, morning and evening', '100 fois, matin et soir', 'مائة مرة صباحًا ومساءً', '100 veces, mañana y tarde'),
    ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    meaning: t(
      'Glory be to Allah, and praise be to Him. No one brings anything better on the Day of Resurrection, except one who said the same or more.',
      'Gloire à Allah, et louange à Lui. Personne n’apportera mieux le Jour de la Résurrection, sauf celui qui en a dit autant ou plus.',
      'من قالها حين يصبح وحين يمسي مائة مرة لم يأت أحد يوم القيامة بأفضل مما جاء به إلا أحد قال مثل ما قال أو زاد.',
      'Gloria a Allah, y alabado sea. Nadie traerá nada mejor el Día de la Resurrección, salvo quien haya dicho lo mismo o más.',
    ),
    count: 100,
    r: ['muslim:2692'],
    l: 'hadith',
  },
  'tahlil-100': {
    id: 'tahlil-100',
    title: t('100 times a day', '100 fois par jour', 'مائة مرة في اليوم', '100 veces al día'),
    ar: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَىْءٍ قَدِيرٌ',
    meaning: t(
      'There is no god but Allah alone, with no partner; His is the dominion and His the praise, and He has power over all things. Said a hundred times in a day, it equals freeing ten slaves, a hundred good deeds are written, a hundred sins erased, and it protects from Satan until evening.',
      'Il n’y a de divinité qu’Allah, Seul, sans associé ; à Lui la royauté, à Lui la louange, et Il est capable de toute chose. Dit cent fois par jour, cela équivaut à affranchir dix esclaves, cent bonnes actions sont inscrites, cent péchés effacés, et cela protège de Satan jusqu’au soir.',
      'من قالها في يوم مائة مرة كانت له عدل عشر رقاب، وكُتبت له مائة حسنة، ومُحيت عنه مائة سيئة، وكانت له حرزًا من الشيطان يومه ذلك حتى يمسي.',
      'No hay más dios que Allah, solo, sin asociado; Suyo es el dominio y Suya la alabanza, y Él tiene poder sobre todas las cosas. Dicho cien veces al día, equivale a liberar diez esclavos, se escriben cien buenas obras, se borran cien pecados y protege de Satanás hasta el atardecer.',
    ),
    count: 100,
    r: ['bukhari:3293'],
    l: 'hadith',
  },
  'sleep-1': {
    id: 'sleep-1',
    title: t('Lying on your right side', 'Couché sur le côté droit', 'على الشق الأيمن', 'Acostado sobre el lado derecho'),
    ar: 'اللَّهُمَّ أَسْلَمْتُ وَجْهِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لاَ مَلْجَأَ وَلاَ مَنْجَا مِنْكَ إِلاَّ إِلَيْكَ، اللَّهُمَّ آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
    meaning: t(
      'O Allah, I submit myself to You, entrust my affairs to You and lean on You, in hope and in awe of You. There is no refuge or escape from You except to You. O Allah, I believe in Your Book which You revealed and in Your Prophet whom You sent. If you die that night, you die upon the fitrah.',
      'Ô Allah, je me soumets à Toi, je Te confie mes affaires et je m’appuie sur Toi, par désir et par crainte de Toi. Il n’y a de refuge ni de salut contre Toi qu’auprès de Toi. Ô Allah, je crois en Ton Livre que Tu as révélé et en Ton Prophète que Tu as envoyé. Si tu meurs cette nuit, tu meurs sur la fitra.',
      'إن مات من ليلته مات على الفطرة، فليجعلهن آخر ما يتكلم به.',
      'Oh Allah, me someto a Ti, Te confío mis asuntos y me apoyo en Ti, con deseo y temor de Ti. No hay refugio ni salvación de Ti sino en Ti. Oh Allah, creo en Tu Libro que revelaste y en Tu Profeta que enviaste. Si mueres esa noche, mueres sobre la fitra.',
    ),
    r: ['bukhari:247'],
    l: 'hadith',
  },
  'sleep-2': {
    id: 'sleep-2',
    title: t('Last words before sleep', 'Dernières paroles avant de dormir', 'عند النوم', 'Últimas palabras antes de dormir'),
    ar: 'بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    meaning: t('In Your name I die and I live.', 'En Ton nom je meurs et je vis.', 'كان يقولها إذا أوى إلى فراشه.', 'En Tu nombre muero y vivo.'),
    r: ['bukhari:6312'],
    l: 'hadith',
  },
  waking: {
    id: 'waking',
    title: t('On waking', 'Au réveil', 'عند الاستيقاظ', 'Al despertar'),
    ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    meaning: t(
      'Praise be to Allah who gave us life after He had caused us to die, and to Him is the resurrection.',
      'Louange à Allah qui nous a rendu la vie après nous avoir fait mourir, et vers Lui est la résurrection.',
      'كان يقوله إذا قام من نومه.',
      'Alabado sea Allah, que nos devolvió la vida después de hacernos morir, y hacia Él es la resurrección.',
    ),
    r: ['bukhari:6312'],
    l: 'hadith',
  },
}
