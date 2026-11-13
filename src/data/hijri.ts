// The Hijri calendar: what it is, who decides each month in each country, the twelve months, the two Eids,
// and the 300 / 309 years of the Companions of the Cave (18:25).
// Every Arabic hadith is copied from the hadith it cites and checked by `npm run verify:duas`.
// Qur'an verses are cited, never typed: they open in the Mushaf.
import type { L4, Level, Ref } from './types'
import type { Supplication } from './duas'
import type { HourStep } from './hour'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })
const q = (id: string, ar: string, meaning: L4, r: Ref[], extra: Partial<Supplication> = {}): Supplication => ({ id, ar, meaning, r, l: 'hadith', ...extra })
const SAHIH_ALBANI = t('Sahih (al-Albani)', 'Sahih (al-Albani)', 'صحيح (الألباني)', 'Sahih (al-Albani)')

/* ------------------------------------------------------------------ what the calendar is */

export const HIJRI_INTRO: HourStep[] = [
  {
    id: 'lunar',
    title: t('Twelve months of the moon', 'Douze mois de la lune', 'اثنا عشر شهرًا قمريًّا', 'Doce meses de la luna'),
    text: t(
      'Allah set the year at twelve months, four of them sacred, and made the crescents a measure of time for people and for the Hajj. Each month follows the moon from one crescent to the next.',
      'Allah a fixé l’année à douze mois, dont quatre sacrés, et a fait des croissants une mesure du temps pour les gens et pour le Hajj. Chaque mois suit la lune d’un croissant au suivant.',
      'جعل الله السنة اثني عشر شهرًا منها أربعة حرم، وجعل الأهلة مواقيت للناس والحج، فكل شهر يتبع القمر من هلال إلى هلال.',
      'Allah fijó el año en doce meses, cuatro de ellos sagrados, e hizo de las lunas nuevas una medida del tiempo para la gente y para el Hayy. Cada mes sigue a la luna de una luna nueva a la siguiente.',
    ),
    l: 'quran',
    r: ['9:36', '2:189', '10:5'],
  },
  {
    id: 'hijra-year',
    title: t('Year one is the Hijra', 'L’an un est l’Hégire', 'السنة الأولى سنة الهجرة', 'El año uno es la Hégira'),
    text: t(
      'The years are counted from the Prophet’s emigration from Makkah to Madinah (622 CE). The Companions chose that event over his birth, his mission or his death.',
      'Les années se comptent depuis l’émigration du Prophète de La Mecque à Médine (622). Les Compagnons ont choisi cet événement plutôt que sa naissance, sa mission ou sa mort.',
      'تُعدّ السنون من هجرة النبي ﷺ من مكة إلى المدينة (622م)، واختارها الصحابة على مولده ومبعثه ووفاته.',
      'Los años se cuentan desde la emigración del Profeta de La Meca a Medina (622). Los Compañeros eligieron ese hecho antes que su nacimiento, su misión o su muerte.',
    ),
    l: 'hadith',
    r: ['book:tabari'],
    quotes: [
      q(
        'count-hijra',
        'مَا عَدُّوا مِنْ مَبْعَثِ النَّبِيِّ صلى الله عليه وسلم وَلاَ مِنْ وَفَاتِهِ، مَا عَدُّوا إِلاَّ مِنْ مَقْدَمِهِ الْمَدِينَةَ',
        t(
          'They did not count from the Prophet’s mission, nor from his death; they counted only from his arrival in Madinah.',
          'Ils ne comptèrent ni depuis la mission du Prophète, ni depuis sa mort ; ils ne comptèrent que depuis son arrivée à Médine.',
          'قاله سهل بن سعد في أول التأريخ.',
          'No contaron desde la misión del Profeta ni desde su muerte; contaron solo desde su llegada a Medina.',
        ),
        ['bukhari:3934'],
      ),
    ],
    note: t(
      'The historians (al-Tabari and others) report that ‘Umar ibn al-Khattab set the calendar around 16–17 AH after consulting the Companions, and that Muharram was kept as its first month because the pilgrims return from Hajj then.',
      'Les historiens (at-Tabari et d’autres) rapportent que ‘Umar ibn al-Khattab fixa le calendrier vers 16–17 H après avoir consulté les Compagnons, et que Muharram resta le premier mois car les pèlerins reviennent alors du Hajj.',
      'ذكر المؤرخون (كالطبري) أن عمر بن الخطاب وضع التأريخ نحو سنة 16 أو 17 هـ بعد مشاورة الصحابة، وجُعل المحرم أول الشهور لأنه منصرف الناس من الحج.',
      'Los historiadores (at-Tabari y otros) relatan que ‘Umar ibn al-Jattab fijó el calendario hacia el 16–17 H tras consultar a los Compañeros, y que Muharram quedó como primer mes porque entonces vuelven los peregrinos del Hayy.',
    ),
  },
  {
    id: 'sighting',
    title: t('A month starts with the crescent', 'Le mois commence avec le croissant', 'يبدأ الشهر برؤية الهلال', 'El mes empieza con la luna nueva'),
    text: t(
      'A month has 29 or 30 days. On the evening of the 29th people look for the new crescent: if it is seen, the next month begins; if not, the month is completed to 30.',
      'Un mois compte 29 ou 30 jours. Le soir du 29, on cherche le nouveau croissant : s’il est vu, le mois suivant commence ; sinon, on complète le mois à 30.',
      'الشهر تسعة وعشرون يومًا أو ثلاثون. يُتحرّى الهلال مساء التاسع والعشرين: فإن رُئي دخل الشهر الجديد، وإلا أُكمل الشهر ثلاثين.',
      'Un mes tiene 29 o 30 días. La tarde del 29 se busca la nueva luna: si se ve, empieza el mes siguiente; si no, el mes se completa a 30.',
    ),
    l: 'hadith',
    r: [],
    quotes: [
      q(
        'sight',
        'صُومُوا لِرُؤْيَتِهِ، وَأَفْطِرُوا لِرُؤْيَتِهِ، فَإِنْ غُبِّيَ عَلَيْكُمْ فَأَكْمِلُوا عِدَّةَ شَعْبَانَ ثَلاَثِينَ',
        t(
          'Fast when you see it, and break the fast when you see it; and if it is hidden from you, complete Sha‘ban as thirty days.',
          'Jeûnez quand vous le voyez, et rompez le jeûne quand vous le voyez ; s’il vous est caché, complétez Cha‘ban à trente jours.',
          'رواه أبو هريرة.',
          'Ayunad cuando la veáis y romped el ayuno cuando la veáis; y si se os oculta, completad Sha‘ban en treinta días.',
        ),
        ['bukhari:1909'],
      ),
      q(
        'ummi',
        'إِنَّا أُمَّةٌ أُمِّيَّةٌ، لاَ نَكْتُبُ وَلاَ نَحْسُبُ الشَّهْرُ هَكَذَا وَهَكَذَا',
        t(
          'We are an unlettered nation: we neither write nor calculate. The month is like this and like this (twenty-nine or thirty days).',
          'Nous sommes une communauté illettrée : nous n’écrivons ni ne calculons. Le mois est ainsi et ainsi (vingt-neuf ou trente jours).',
          'وأشار بيديه: تسعة وعشرون مرة، وثلاثون مرة.',
          'Somos una comunidad iletrada: no escribimos ni calculamos. El mes es así y así (veintinueve o treinta días).',
        ),
        ['bukhari:1913'],
      ),
    ],
  },
  {
    id: 'sunset',
    title: t('The day begins at sunset', 'Le jour commence au coucher du soleil', 'يبدأ اليوم بغروب الشمس', 'El día empieza al ponerse el sol'),
    text: t(
      'In the Hijri reckoning the night comes before its day: the date changes at Maghrib, not at midnight. The first night of Ramadan is the evening before the first fast, and the Eid crescent is looked for on the evening before Eid.',
      'Dans le comput hégirien, la nuit précède son jour : la date change au Maghrib, pas à minuit. La première nuit de Ramadan est la veille du premier jeûne, et le croissant de l’Aïd se cherche la veille de l’Aïd.',
      'في الحساب الهجري تسبق الليلة يومها: يتغير التاريخ عند المغرب لا عند منتصف الليل. فأول ليالي رمضان ليلة أول صيام، ويُتحرّى هلال العيد مساء ليلته.',
      'En el cómputo hégira la noche va antes que su día: la fecha cambia en el Magrib, no a medianoche. La primera noche de Ramadán es la víspera del primer ayuno, y la luna del Eid se busca la víspera del Eid.',
    ),
    l: 'hadith',
    r: [],
    quotes: [
      q('nights', 'الشَّهْرُ تِسْعٌ وَعِشْرُونَ لَيْلَةً', t('The month is twenty-nine nights.', 'Le mois est de vingt-neuf nuits.', 'عدّ الشهر بالليالي.', 'El mes es de veintinueve noches.'), ['bukhari:1907']),
    ],
  },
  {
    id: 'shorter',
    title: t('Eleven days shorter than the solar year', 'Onze jours de moins que l’année solaire', 'أقصر من السنة الشمسية بأحد عشر يومًا', 'Once días más corto que el año solar'),
    text: t(
      'Twelve lunar months last about 354 days, about 11 days fewer than the solar year. So Ramadan and the Eids move back through the seasons and come round to the same season after about 33 years.',
      'Douze mois lunaires durent environ 354 jours, soit environ 11 jours de moins que l’année solaire. Ramadan et les Aïds reculent donc à travers les saisons et reviennent à la même saison en environ 33 ans.',
      'اثنا عشر شهرًا قمريًّا نحو 354 يومًا، أقل من السنة الشمسية بنحو أحد عشر يومًا، فيتنقل رمضان والعيدان في الفصول ويعودان إلى الفصل نفسه في نحو 33 سنة.',
      'Doce meses lunares duran unos 354 días, unos 11 días menos que el año solar. Así Ramadán y los Eid retroceden por las estaciones y vuelven a la misma estación en unos 33 años.',
    ),
    l: 'tradition',
    r: ['10:5'],
  },
  {
    id: 'differ',
    title: t('Why countries differ by a day', 'Pourquoi les pays diffèrent d’un jour', 'لماذا تختلف البلدان يومًا', 'Por qué los países difieren en un día'),
    text: t(
      'The crescent can be visible in one land and not yet in another. In Madinah, Ibn ‘Abbas did not follow the sighting reported from Damascus and said the Prophet ﷺ had ordered them so. Some countries follow their own sighting, some a sighting anywhere, and some a calendar calculated in advance.',
      'Le croissant peut être visible dans un pays et pas encore dans un autre. À Médine, Ibn ‘Abbas ne suivit pas l’observation rapportée de Damas et dit que le Prophète ﷺ le leur avait ordonné ainsi. Certains pays suivent leur propre observation, d’autres une observation où qu’elle soit, d’autres un calendrier calculé à l’avance.',
      'قد يُرى الهلال في بلد ولا يُرى في آخر. وفي المدينة لم يأخذ ابن عباس برؤية أهل الشام وقال: هكذا أمرنا رسول الله ﷺ. فمن البلدان من يتبع رؤيته المحلية، ومنها من يأخذ بأي رؤية، ومنها من يعتمد تقويمًا محسوبًا مسبقًا.',
      'La luna nueva puede verse en una tierra y aún no en otra. En Medina, Ibn ‘Abbas no siguió el avistamiento comunicado desde Damasco y dijo que el Profeta ﷺ así se lo había ordenado. Unos países siguen su propio avistamiento, otros un avistamiento en cualquier lugar, y otros un calendario calculado de antemano.',
    ),
    l: 'hadith',
    r: [],
    quotes: [
      q(
        'kurayb',
        'لاَ هَكَذَا أَمَرَنَا رَسُولُ اللَّهِ صلى الله عليه وسلم',
        t('No: this is how the Messenger of Allah ﷺ ordered us.', 'Non : c’est ainsi que le Messager d’Allah ﷺ nous l’a ordonné.', 'جواب ابن عباس لكريب لما أخبره برؤية أهل الشام.', 'No: así nos lo ordenó el Mensajero de Allah ﷺ.'),
        ['muslim:1087'],
      ),
    ],
    note: t(
      'Scholars differ: many hold that a sighting in one land binds all Muslims; others, citing this hadith, give each region its own sighting; many today also use calculation to reject reports of a crescent that cannot yet be seen.',
      'Les savants divergent : beaucoup estiment qu’une observation dans un pays engage tous les musulmans ; d’autres, citant ce hadith, donnent à chaque région sa propre observation ; beaucoup aujourd’hui utilisent aussi le calcul pour écarter les témoignages d’un croissant encore invisible.',
      'اختلف العلماء: فكثير منهم يرى أن رؤية بلد تلزم سائر المسلمين، ويرى آخرون استنادًا إلى هذا الحديث أن لكل بلد رؤيته، ويستعمل كثيرون اليوم الحساب لرد شهادة من ادعى رؤية هلال لا يمكن رؤيته.',
      'Los sabios difieren: muchos sostienen que un avistamiento en una tierra obliga a todos los musulmanes; otros, citando este hadiz, dan a cada región su propio avistamiento; muchos hoy usan además el cálculo para rechazar testimonios de una luna que aún no puede verse.',
    ),
  },
]

/* ------------------------------------------------------------------ who decides, country by country */

export interface CountryRule {
  id: string
  flag: string
  name: L4
  authority: L4
  method: L4
}

export const OTHER_COUNTRIES: CountryRule[] = [
  { id: 'eg', flag: '🇪🇬', name: t('Egypt', 'Égypte', 'مصر', 'Egipto'), authority: t('Dar al-Ifta', 'Dar al-Ifta', 'دار الإفتاء المصرية', 'Dar al-Ifta'), method: t('Sighting, checked against astronomical calculation', 'Observation, contrôlée par le calcul astronomique', 'الرؤية مع مراجعة الحساب الفلكي', 'Avistamiento, contrastado con el cálculo astronómico') },
  { id: 'dz', flag: '🇩🇿', name: t('Algeria', 'Algérie', 'الجزائر', 'Argelia'), authority: t('Ministry of Religious Affairs', 'Ministère des Affaires religieuses', 'وزارة الشؤون الدينية والأوقاف', 'Ministerio de Asuntos Religiosos'), method: t('National crescent committee (sighting)', 'Commission nationale du croissant (observation)', 'اللجنة الوطنية للأهلة (الرؤية)', 'Comisión nacional de la luna (avistamiento)') },
  { id: 'tn', flag: '🇹🇳', name: t('Tunisia', 'Tunisie', 'تونس', 'Túnez'), authority: t('Mufti of the Republic', 'Mufti de la République', 'مفتي الجمهورية', 'Muftí de la República'), method: t('Sighting, with calculation', 'Observation, avec le calcul', 'الرؤية مع الحساب', 'Avistamiento, con el cálculo') },
  { id: 'ae', flag: '🇦🇪', name: t('United Arab Emirates', 'Émirats arabes unis', 'الإمارات', 'Emiratos Árabes Unidos'), authority: t('Moon-sighting committee', 'Comité d’observation du croissant', 'لجنة تحري الأهلة', 'Comité de avistamiento'), method: t('Sighting', 'Observation', 'الرؤية', 'Avistamiento') },
  { id: 'jo', flag: '🇯🇴', name: t('Jordan', 'Jordanie', 'الأردن', 'Jordania'), authority: t('General Iftaa’ Department', 'Département général de l’Ifta’', 'دائرة الإفتاء العام', 'Departamento General de Iftaa’'), method: t('Sighting', 'Observation', 'الرؤية', 'Avistamiento') },
  { id: 'id', flag: '🇮🇩', name: t('Indonesia', 'Indonésie', 'إندونيسيا', 'Indonesia'), authority: t('Ministry of Religious Affairs', 'Ministère des Affaires religieuses', 'وزارة الشؤون الدينية', 'Ministerio de Asuntos Religiosos'), method: t('Sighting with the MABIMS criterion (crescent at least 3° high, 6.4° from the sun)', 'Observation avec le critère MABIMS (croissant d’au moins 3° de hauteur, à 6,4° du soleil)', 'الرؤية بمعيار ماباليمس (ارتفاع الهلال 3° واستطالته 6.4° على الأقل)', 'Avistamiento con el criterio MABIMS (luna de al menos 3° de altura, a 6,4° del sol)') },
  { id: 'my', flag: '🇲🇾', name: t('Malaysia', 'Malaisie', 'ماليزيا', 'Malasia'), authority: t('Keeper of the Rulers’ Seal', 'Gardien du sceau des souverains', 'حافظ أختام الحكام', 'Guardián del sello de los soberanos'), method: t('Sighting with the MABIMS criterion', 'Observation avec le critère MABIMS', 'الرؤية بمعيار ماباليمس', 'Avistamiento con el criterio MABIMS') },
  { id: 'pk', flag: '🇵🇰', name: t('Pakistan', 'Pakistan', 'باكستان', 'Pakistán'), authority: t('Ruet-e-Hilal Committee', 'Comité Ruet-e-Hilal', 'لجنة رؤية الهلال', 'Comité Ruet-e-Hilal'), method: t('Local sighting', 'Observation locale', 'الرؤية المحلية', 'Avistamiento local') },
  { id: 'fr', flag: '🇫🇷', name: t('France', 'France', 'فرنسا', 'Francia'), authority: t('Grand Mosque of Paris', 'Grande Mosquée de Paris', 'مسجد باريس الكبير', 'Gran Mezquita de París'), method: t('Announced on the “night of doubt”, from calculation and reported sightings', 'Annoncé lors de la « nuit du doute », d’après le calcul et les observations signalées', 'يُعلن في «ليلة الشك» بناء على الحساب والرؤى الواردة', 'Se anuncia en la «noche de la duda», según el cálculo y los avistamientos comunicados') },
  { id: 'gb', flag: '🇬🇧', name: t('United Kingdom', 'Royaume-Uni', 'المملكة المتحدة', 'Reino Unido'), authority: t('No single authority', 'Pas d’autorité unique', 'لا توجد جهة واحدة', 'Sin autoridad única'), method: t('Mosques follow Saudi Arabia, Morocco or a local sighting', 'Les mosquées suivent l’Arabie saoudite, le Maroc ou une observation locale', 'تتبع المساجد السعودية أو المغرب أو الرؤية المحلية', 'Las mezquitas siguen a Arabia Saudí, a Marruecos o un avistamiento local') },
  { id: 'us', flag: '🇺🇸', name: t('United States', 'États-Unis', 'الولايات المتحدة', 'Estados Unidos'), authority: t('Fiqh Council of North America (and others)', 'Conseil du fiqh d’Amérique du Nord (et d’autres)', 'المجلس الفقهي لأمريكا الشمالية وغيره', 'Consejo de Fiqh de Norteamérica (y otros)'), method: t('Calculation set in advance; some communities wait for a sighting', 'Calcul fixé à l’avance ; certaines communautés attendent une observation', 'حساب مسبق، وبعض الجاليات تنتظر الرؤية', 'Cálculo fijado de antemano; algunas comunidades esperan un avistamiento') },
]

/* ------------------------------------------------------------------ the twelve months */

export interface MonthDay {
  title: L4
  text: L4
  l: Level
  r: Ref[]
  quote?: Supplication
}

export interface HijriMonth {
  n: number
  ar: string
  name: L4
  meaning: L4
  sacred?: boolean
  days: MonthDay[]
}

const SACRED_NOTE = t('Sacred month', 'Mois sacré', 'شهر حرام', 'Mes sagrado')
export { SACRED_NOTE }

export const MONTHS: HijriMonth[] = [
  {
    n: 1,
    ar: 'مُحَرَّم',
    name: t('Muharram', 'Mouharram', 'محرم', 'Muharram'),
    meaning: t('“Made sacred”: fighting was forbidden in it.', '« Rendu sacré » : on y interdisait le combat.', 'سُمّي لتحريم القتال فيه.', '«Hecho sagrado»: en él se prohibía combatir.'),
    sacred: true,
    days: [
      {
        title: t('The best fasting after Ramadan', 'Le meilleur jeûne après Ramadan', 'أفضل الصيام بعد رمضان', 'El mejor ayuno después de Ramadán'),
        text: t('He called Muharram “the month of Allah”.', 'Il appela Mouharram « le mois d’Allah ».', 'سماه شهر الله.', 'Llamó a Muharram «el mes de Allah».'),
        l: 'hadith',
        r: [],
        quote: q('muharram', 'أَفْضَلُ الصِّيَامِ بَعْدَ رَمَضَانَ شَهْرُ اللَّهِ الْمُحَرَّمُ', t('The best fasting after Ramadan is in Allah’s month, al-Muharram.', 'Le meilleur jeûne après Ramadan est celui du mois d’Allah, al-Muharram.', 'رواه أبو هريرة.', 'El mejor ayuno después de Ramadán es el del mes de Allah, al-Muharram.'), ['muslim:1163']),
      },
      {
        title: t('‘Ashura, the 10th (with the 9th)', '‘Achoura, le 10 (avec le 9)', 'عاشوراء، العاشر (مع التاسع)', '‘Ashura, el día 10 (con el 9)'),
        text: t('Fasting it expiates the past year; he intended to fast the 9th as well.', 'Le jeûner expie l’année passée ; il voulait jeûner aussi le 9.', 'صيامه يكفّر السنة الماضية، وعزم على صيام التاسع معه.', 'Ayunarlo expía el año anterior; quiso ayunar también el día 9.'),
        l: 'hadith',
        r: ['muslim:1134'],
        quote: q('ashura', 'صِيَامُ يَوْمِ عَاشُورَاءَ أَحْتَسِبُ عَلَى اللَّهِ أَنْ يُكَفِّرَ السَّنَةَ الَّتِي قَبْلَهُ', t('Fasting the day of ‘Ashura, I hope from Allah, expiates the year before it.', 'Le jeûne du jour de ‘Achoura, j’espère d’Allah, expie l’année qui le précède.', 'رواه أبو قتادة.', 'Ayunar el día de ‘Ashura, espero de Allah, expía el año anterior.'), ['muslim:1162']),
      },
    ],
  },
  {
    n: 2,
    ar: 'صَفَر',
    name: t('Safar', 'Safar', 'صفر', 'Safar'),
    meaning: t('Said to come from ṣifr, “empty”: homes emptied when people set out.', 'Viendrait de ṣifr, « vide » : les maisons se vidaient quand les gens partaient.', 'قيل: من الصِّفر، لخلوّ البيوت إذا خرج أهلها.', 'Vendría de ṣifr, «vacío»: las casas se vaciaban cuando la gente partía.'),
    days: [
      {
        title: t('No bad omen in Safar', 'Pas de mauvais présage en Safar', 'لا شؤم في صفر', 'Ningún mal augurio en Safar'),
        text: t('The Arabs held Safar to be unlucky; the Prophet ﷺ rejected that belief.', 'Les Arabes tenaient Safar pour néfaste ; le Prophète ﷺ rejeta cette croyance.', 'كان العرب يتشاءمون بصفر، فأبطل النبي ﷺ ذلك.', 'Los árabes tenían Safar por nefasto; el Profeta ﷺ rechazó esa creencia.'),
        l: 'hadith',
        r: [],
        quote: q('safar', 'لاَ عَدْوَى وَلاَ طِيَرَةَ وَلاَ هَامَةَ وَلاَ صَفَرَ', t('No contagion (by itself), no bird omen, no owl omen, and no Safar.', 'Pas de contagion (par elle-même), pas de présage d’oiseau, pas de hibou, et pas de Safar.', 'رواه أبو هريرة.', 'Ni contagio (por sí mismo), ni augurio de aves, ni búho, ni Safar.'), ['bukhari:5707']),
      },
    ],
  },
  {
    n: 3,
    ar: 'رَبِيع الأَوَّل',
    name: t('Rabi‘ al-Awwal', 'Rabi‘ al-Awwal', 'ربيع الأول', 'Rabi‘ al-Awwal'),
    meaning: t('“First spring”: named when it fell in spring.', '« Premier printemps » : nommé quand il tombait au printemps.', 'سُمّي لوقوعه في الربيع حين سُمّي.', '«Primera primavera»: así llamado cuando caía en primavera.'),
    days: [
      {
        title: t('His birth, the Hijra and his death', 'Sa naissance, l’Hégire et sa mort', 'مولده وهجرته ووفاته', 'Su nacimiento, la Hégira y su muerte'),
        text: t('He was born on a Monday; most historians place it in Rabi‘ al-Awwal (the 12th per Ibn Ishaq, other dates are also reported). He reached Madinah in this month, and died in it in 11 AH.', 'Il naquit un lundi ; la plupart des historiens le placent en Rabi‘ al-Awwal (le 12 selon Ibn Ishaq, d’autres dates sont rapportées). Il arriva à Médine ce mois-là, et y mourut en 11 H.', 'وُلد يوم الاثنين، وجعله أكثر المؤرخين في ربيع الأول (الثاني عشر عند ابن إسحاق، ورويت تواريخ أخرى)، وفيه قدم المدينة، وفيه توفي سنة 11 هـ.', 'Nació en lunes; la mayoría de los historiadores lo sitúan en Rabi‘ al-Awwal (el 12 según Ibn Ishaq; se citan otras fechas). Llegó a Medina en este mes, y en él murió en el 11 H.'),
        l: 'tradition',
        r: ['book:sira'],
        quote: q('monday', 'ذَاكَ يَوْمٌ وُلِدْتُ فِيهِ', t('Asked about fasting on Monday: “That is the day on which I was born.”', 'Interrogé sur le jeûne du lundi : « C’est le jour où je suis né. »', 'جوابه حين سئل عن صوم يوم الاثنين.', 'Preguntado por el ayuno del lunes: «Es el día en que nací».'), ['muslim:1162']),
      },
    ],
  },
  {
    n: 4,
    ar: 'رَبِيع الآخِر',
    name: t('Rabi‘ al-Akhir', 'Rabi‘ al-Akhir', 'ربيع الآخر', 'Rabi‘ al-Ajir'),
    meaning: t('“Second spring”, also called Rabi‘ ath-Thani.', '« Second printemps », dit aussi Rabi‘ ath-Thani.', 'ويقال: ربيع الثاني.', '«Segunda primavera», también llamado Rabi‘ az-Zani.'),
    days: [],
  },
  {
    n: 5,
    ar: 'جُمَادَى الأُولَى',
    name: t('Jumada al-Ula', 'Joumada al-Oula', 'جمادى الأولى', 'Yumada al-Ula'),
    meaning: t('From jamad, “frozen” or “dry”: named in a cold, dry season.', 'De jamad, « gelé » ou « sec » : nommé à une saison froide et sèche.', 'من الجَمَد، لجمود الماء فيه حين سُمّي.', 'De yamad, «helado» o «seco»: así llamado en una estación fría y seca.'),
    days: [],
  },
  {
    n: 6,
    ar: 'جُمَادَى الآخِرَة',
    name: t('Jumada al-Akhirah', 'Joumada al-Akhira', 'جمادى الآخرة', 'Yumada al-Ajira'),
    meaning: t('The second Jumada, also called Jumada ath-Thaniyah.', 'Le second Joumada, dit aussi Joumada ath-Thaniya.', 'ويقال: جمادى الثانية.', 'El segundo Yumada, también llamado Yumada az-Zaniya.'),
    days: [],
  },
  {
    n: 7,
    ar: 'رَجَب',
    name: t('Rajab', 'Rajab', 'رجب', 'Rayab'),
    meaning: t('From tarjib, “to honour”: they honoured it by laying down arms.', 'De tarjib, « honorer » : on l’honorait en déposant les armes.', 'من الترجيب وهو التعظيم.', 'De taryib, «honrar»: lo honraban dejando las armas.'),
    sacred: true,
    days: [
      {
        title: t('A sacred month, without invented rites', 'Un mois sacré, sans rites inventés', 'شهر حرام بلا عبادات مخصوصة', 'Un mes sagrado, sin ritos inventados'),
        text: t('It is one of the four sacred months. Ibn Hajar wrote that no authentic hadith gives a special fast or prayer for Rajab; the Isra’ and Mi‘raj is often dated to its 27th, but that date is not established.', 'C’est l’un des quatre mois sacrés. Ibn Hajar écrit qu’aucun hadith authentique ne donne de jeûne ou de prière propre à Rajab ; l’Isra’ et le Mi‘raj est souvent daté du 27, mais cette date n’est pas établie.', 'هو أحد الأشهر الحرم. وذكر ابن حجر أنه لم يصح في فضل صيام رجب أو صلاة مخصوصة فيه حديث، ويُؤرَّخ الإسراء والمعراج كثيرًا بالسابع والعشرين منه، ولا يثبت ذلك.', 'Es uno de los cuatro meses sagrados. Ibn Hayar escribió que ningún hadiz auténtico da un ayuno u oración propios de Rayab; el Isra’ y el Mi‘ray suele fecharse el 27, pero esa fecha no está establecida.'),
        l: 'disputed',
        r: ['9:36'],
      },
    ],
  },
  {
    n: 8,
    ar: 'شَعْبَان',
    name: t('Sha‘ban', 'Cha‘ban', 'شعبان', 'Sha‘ban'),
    meaning: t('From tasha‘‘ub, “branching out”: the tribes dispersed in it.', 'De tasha‘‘ub, « se ramifier » : les tribus s’y dispersaient.', 'من التشعب، لتشعب القبائل فيه.', 'De tasha‘‘ub, «ramificarse»: las tribus se dispersaban en él.'),
    days: [
      {
        title: t('The month he fasted most outside Ramadan', 'Le mois où il jeûnait le plus hors Ramadan', 'أكثر شهر صامه بعد رمضان', 'El mes en que más ayunaba fuera de Ramadán'),
        text: t('‘A’isha said she never saw him fast more in any month than in Sha‘ban.', '‘A’icha dit ne l’avoir jamais vu jeûner davantage qu’en Cha‘ban.', 'قالت عائشة: ما رأيته أكثر صيامًا منه في شعبان.', '‘A’isha dijo que nunca lo vio ayunar más que en Sha‘ban.'),
        l: 'hadith',
        r: [],
        quote: q('shaban', 'وَمَا رَأَيْتُهُ أَكْثَرَ صِيَامًا مِنْهُ فِي شَعْبَانَ', t('And I never saw him fast more in any month than in Sha‘ban.', 'Et je ne l’ai jamais vu jeûner davantage qu’en Cha‘ban.', 'من حديث عائشة.', 'Y nunca lo vi ayunar más que en Sha‘ban.'), ['bukhari:1969']),
      },
    ],
  },
  {
    n: 9,
    ar: 'رَمَضَان',
    name: t('Ramadan', 'Ramadan', 'رمضان', 'Ramadán'),
    meaning: t('From ramaḍ, “scorching heat”: named in a hot season.', 'De ramaḍ, « chaleur brûlante » : nommé à une saison chaude.', 'من الرَّمَض، لشدة الحر حين سُمّي.', 'De ramaḍ, «calor abrasador»: así llamado en una estación calurosa.'),
    days: [
      {
        title: t('The month of the Qur’an, and the Night of Decree', 'Le mois du Coran, et la Nuit du Destin', 'شهر القرآن وليلة القدر', 'El mes del Corán, y la Noche del Decreto'),
        text: t('The Qur’an was sent down in it, and its fast is a pillar of Islam. Laylat al-Qadr is sought in the odd nights of its last ten.', 'Le Coran y fut descendu, et son jeûne est un pilier de l’islam. Laylat al-Qadr se cherche dans les nuits impaires de ses dix dernières.', 'فيه أُنزل القرآن، وصيامه ركن من أركان الإسلام، وتُتحرّى ليلة القدر في الوتر من عشره الأواخر.', 'En él descendió el Corán, y su ayuno es un pilar del islam. Laylat al-Qadr se busca en las noches impares de sus diez últimas.'),
        l: 'quran',
        r: ['2:185', '97:1-5'],
        quote: q('qadr', 'تَحَرَّوْا لَيْلَةَ الْقَدْرِ فِي الْوِتْرِ مِنَ الْعَشْرِ الأَوَاخِرِ مِنْ رَمَضَانَ', t('Seek the Night of Decree in the odd nights of the last ten of Ramadan.', 'Cherchez la Nuit du Destin dans les nuits impaires des dix dernières de Ramadan.', 'رواه عائشة.', 'Buscad la Noche del Decreto en las noches impares de las diez últimas de Ramadán.'), ['bukhari:2017']),
      },
    ],
  },
  {
    n: 10,
    ar: 'شَوَّال',
    name: t('Shawwal', 'Chawwal', 'شوال', 'Shawwal'),
    meaning: t('From shawl, “lifting”: said of she-camels raising their tails in that season.', 'De shawl, « lever » : se dit des chamelles levant la queue à cette saison.', 'من شَوَلان الإبل بأذنابها.', 'De shawl, «levantar»: se dice de las camellas que alzan la cola en esa estación.'),
    days: [
      {
        title: t('Eid al-Fitr, then six days', 'L’Aïd al-Fitr, puis six jours', 'عيد الفطر ثم ست من شوال', 'El Eid al-Fitr, y luego seis días'),
        text: t('Its first day is Eid al-Fitr. Fasting six days of it after Ramadan is like fasting the whole year.', 'Son premier jour est l’Aïd al-Fitr. Jeûner six de ses jours après Ramadan équivaut à jeûner toute l’année.', 'أوله عيد الفطر، وصيام ست منه بعد رمضان كصيام الدهر.', 'Su primer día es el Eid al-Fitr. Ayunar seis de sus días tras Ramadán es como ayunar todo el año.'),
        l: 'hadith',
        r: [],
        quote: q('six', 'مَنْ صَامَ رَمَضَانَ ثُمَّ أَتْبَعَهُ سِتًّا مِنْ شَوَّالٍ كَانَ كَصِيَامِ الدَّهْرِ', t('Whoever fasts Ramadan and follows it with six days of Shawwal, it is as if he fasted for a lifetime.', 'Quiconque jeûne Ramadan puis le fait suivre de six jours de Chawwal, c’est comme s’il avait jeûné toute sa vie.', 'رواه أبو أيوب الأنصاري.', 'Quien ayune Ramadán y lo siga con seis días de Shawwal, es como si ayunara toda la vida.'), ['muslim:1164']),
      },
    ],
  },
  {
    n: 11,
    ar: 'ذُو القَعْدَة',
    name: t('Dhu al-Qa‘dah', 'Dhou al-Qa‘da', 'ذو القعدة', 'Dhu al-Qa‘da'),
    meaning: t('“The one of sitting”: they sat back from fighting.', '« Celui où l’on s’assoit » : on s’abstenait de combattre.', 'لقعودهم فيه عن القتال.', '«El de sentarse»: se abstenían de combatir.'),
    sacred: true,
    days: [
      {
        title: t('The month of his ‘Umrahs', 'Le mois de ses ‘Omra', 'شهر عُمَره', 'El mes de sus ‘Umra'),
        text: t('All his ‘Umrahs were in Dhu al-Qa‘dah, except the one he made with his Hajj.', 'Toutes ses ‘Omra eurent lieu en Dhou al-Qa‘da, sauf celle accomplie avec son Hajj.', 'كانت عُمَره كلها في ذي القعدة إلا التي مع حجته.', 'Todas sus ‘Umra fueron en Dhu al-Qa‘da, salvo la que hizo con su Hayy.'),
        l: 'hadith',
        r: [],
        quote: q('umrah', 'اعْتَمَرَ أَرْبَعَ عُمَرٍ فِي ذِي الْقَعْدَةِ إِلاَّ الَّتِي اعْتَمَرَ مَعَ حَجَّتِهِ', t('He made four ‘Umrahs, in Dhu al-Qa‘dah, except the one he made with his Hajj.', 'Il accomplit quatre ‘Omra, en Dhou al-Qa‘da, sauf celle accomplie avec son Hajj.', 'رواه أنس بن مالك.', 'Hizo cuatro ‘Umra, en Dhu al-Qa‘da, salvo la que hizo con su Hayy.'), ['bukhari:1780']),
      },
    ],
  },
  {
    n: 12,
    ar: 'ذُو الحِجَّة',
    name: t('Dhu al-Hijjah', 'Dhou al-Hijja', 'ذو الحجة', 'Dhu al-Hiyya'),
    meaning: t('“The one of the pilgrimage”.', '« Celui du pèlerinage ».', 'لوقوع الحج فيه.', '«El de la peregrinación».'),
    sacred: true,
    days: [
      {
        title: t('The ten best days', 'Les dix meilleurs jours', 'العشر الأوائل', 'Los diez mejores días'),
        text: t('Good deeds in its first ten days are dearer to Allah than in any other days.', 'Les bonnes œuvres de ses dix premiers jours sont plus aimées d’Allah qu’en tout autre jour.', 'العمل الصالح في عشره الأوائل أحب إلى الله من غيرها.', 'Las buenas obras de sus diez primeros días son más amadas por Allah que en cualquier otro día.'),
        l: 'hadith',
        r: [],
        quote: q('ten-days', 'مَا الْعَمَلُ فِي أَيَّامِ الْعَشْرِ أَفْضَلَ مِنَ الْعَمَلِ فِي هَذِهِ', t('No deeds in other days are better than deeds in these ten days.', 'Aucune œuvre en d’autres jours n’est meilleure que l’œuvre en ces dix jours.', 'رواه ابن عباس.', 'Ninguna obra en otros días es mejor que la obra en estos diez días.'), ['bukhari:969']),
      },
      {
        title: t('‘Arafah, the 9th', '‘Arafa, le 9', 'يوم عرفة، التاسع', '‘Arafa, el día 9'),
        text: t('For those not on Hajj, fasting the day of ‘Arafah expiates two years.', 'Pour qui n’est pas au Hajj, jeûner le jour de ‘Arafa expie deux années.', 'لغير الحاج: صيام يوم عرفة يكفّر سنتين.', 'Para quien no está en el Hayy, ayunar el día de ‘Arafa expía dos años.'),
        l: 'hadith',
        r: [],
        quote: q('arafah', 'صِيَامُ يَوْمِ عَرَفَةَ أَحْتَسِبُ عَلَى اللَّهِ أَنْ يُكَفِّرَ السَّنَةَ الَّتِي قَبْلَهُ وَالسَّنَةَ الَّتِي بَعْدَهُ', t('Fasting the day of ‘Arafah, I hope from Allah, expiates the year before it and the year after it.', 'Le jeûne du jour de ‘Arafa, j’espère d’Allah, expie l’année qui le précède et celle qui le suit.', 'رواه أبو قتادة.', 'Ayunar el día de ‘Arafa, espero de Allah, expía el año anterior y el siguiente.'), ['muslim:1162']),
      },
      {
        title: t('Eid al-Adha, the 10th, and the days of Tashriq', 'L’Aïd al-Adha, le 10, et les jours de Tachriq', 'عيد الأضحى، العاشر، وأيام التشريق', 'El Eid al-Adha, el día 10, y los días de Tashriq'),
        text: t('The 11th, 12th and 13th are days of eating, drinking and remembering Allah; fasting them is not allowed.', 'Les 11, 12 et 13 sont des jours où l’on mange, boit et invoque Allah ; on ne les jeûne pas.', 'الحادي عشر والثاني عشر والثالث عشر أيام أكل وشرب وذكر لله، لا يُصام فيها.', 'Los días 11, 12 y 13 son días de comer, beber y recordar a Allah; no se ayunan.'),
        l: 'hadith',
        r: ['2:203'],
        quote: q('tashriq', 'أَيَّامُ التَّشْرِيقِ أَيَّامُ أَكْلٍ وَشُرْبٍ', t('The days of Tashriq are days of eating and drinking.', 'Les jours de Tachriq sont des jours où l’on mange et boit.', 'رواه نبيشة الهذلي، وتمامه: «وذكر لله».', 'Los días de Tashriq son días de comer y beber.'), ['muslim:1141']),
      },
    ],
  },
]

/** The four sacred months, named by the Prophet ﷺ. */
export const SACRED_MONTHS_QUOTE = q(
  'twelve',
  'السَّنَةُ اثْنَا عَشَرَ شَهْرًا، مِنْهَا أَرْبَعَةٌ حُرُمٌ، ثَلاَثَةٌ مُتَوَالِيَاتٌ ذُو الْقَعْدَةِ وَذُو الْحِجَّةِ وَالْمُحَرَّمُ، وَرَجَبُ مُضَرَ الَّذِي بَيْنَ جُمَادَى وَشَعْبَانَ',
  t(
    'The year is twelve months, four of them sacred: three in a row, Dhu al-Qa‘dah, Dhu al-Hijjah and al-Muharram, and the Rajab of Mudar, which is between Jumada and Sha‘ban.',
    'L’année compte douze mois, dont quatre sacrés : trois consécutifs, Dhou al-Qa‘da, Dhou al-Hijja et al-Mouharram, et le Rajab de Moudar, entre Joumada et Cha‘ban.',
    'من خطبته في حجة الوداع، رواه أبو بكرة.',
    'El año tiene doce meses, cuatro de ellos sagrados: tres seguidos, Dhu al-Qa‘da, Dhu al-Hiyya y al-Muharram, y el Rayab de Mudar, entre Yumada y Sha‘ban.',
  ),
  ['bukhari:3197'],
)

/* ------------------------------------------------------------------ occasions, with a countdown */

export interface Occasion {
  id: string
  m: number
  d: number
  title: L4
  note?: L4
  l: Level
  r: Ref[]
}

export const OCCASIONS: Occasion[] = [
  { id: 'new-year', m: 1, d: 1, title: t('Islamic New Year (1 Muharram)', 'Nouvel an hégirien (1er Mouharram)', 'رأس السنة الهجرية (1 محرم)', 'Año Nuevo islámico (1 de Muharram)'), note: t('A date in the calendar; no special worship is prescribed for it.', 'Une date du calendrier ; aucun culte particulier n’y est prescrit.', 'تاريخ في التقويم، لم تُشرع له عبادة مخصوصة.', 'Una fecha del calendario; no se prescribe un culto especial para ella.'), l: 'tradition', r: [] },
  { id: 'ashura', m: 1, d: 10, title: t('‘Ashura (10 Muharram)', '‘Achoura (10 Mouharram)', 'عاشوراء (10 محرم)', '‘Ashura (10 de Muharram)'), l: 'hadith', r: ['muslim:1162', 'muslim:1134'] },
  { id: 'mawlid', m: 3, d: 12, title: t('12 Rabi‘ al-Awwal', '12 Rabi‘ al-Awwal', '12 ربيع الأول', '12 de Rabi‘ al-Awwal'), note: t('The date of the Prophet’s birth per Ibn Ishaq, a public holiday in Morocco and elsewhere; other dates are reported, and scholars differ on celebrating it.', 'Date de naissance du Prophète selon Ibn Ishaq, jour férié au Maroc et ailleurs ; d’autres dates sont rapportées, et les savants divergent sur sa célébration.', 'تاريخ مولد النبي ﷺ عند ابن إسحاق، وهو عطلة رسمية في المغرب وغيره، ورويت تواريخ أخرى، واختلف العلماء في الاحتفال به.', 'Fecha del nacimiento del Profeta según Ibn Ishaq, festivo en Marruecos y otros países; se citan otras fechas, y los sabios difieren sobre celebrarlo.'), l: 'disputed', r: ['book:sira'] },
  { id: 'ramadan', m: 9, d: 1, title: t('First day of Ramadan', 'Premier jour de Ramadan', 'أول رمضان', 'Primer día de Ramadán'), l: 'quran', r: ['2:185'] },
  { id: 'qadr', m: 9, d: 27, title: t('27th night of Ramadan', '27e nuit de Ramadan', 'ليلة 27 رمضان', 'Noche 27 de Ramadán'), note: t('One of the odd nights of the last ten in which Laylat al-Qadr is sought; it is not fixed to the 27th.', 'L’une des nuits impaires des dix dernières où l’on cherche Laylat al-Qadr ; elle n’est pas fixée au 27.', 'إحدى ليالي الوتر من العشر الأواخر التي تُتحرّى فيها ليلة القدر، ولا تختص بالسابع والعشرين.', 'Una de las noches impares de las diez últimas en que se busca Laylat al-Qadr; no está fijada en el 27.'), l: 'hadith', r: ['bukhari:2017'] },
  { id: 'fitr', m: 10, d: 1, title: t('Eid al-Fitr (1 Shawwal)', 'Aïd al-Fitr (1er Chawwal)', 'عيد الفطر (1 شوال)', 'Eid al-Fitr (1 de Shawwal)'), l: 'hadith', r: ['abudawud:1134'] },
  { id: 'arafah', m: 12, d: 9, title: t('Day of ‘Arafah (9 Dhu al-Hijjah)', 'Jour de ‘Arafa (9 Dhou al-Hijja)', 'يوم عرفة (9 ذو الحجة)', 'Día de ‘Arafa (9 de Dhu al-Hiyya)'), l: 'hadith', r: ['muslim:1162'] },
  { id: 'adha', m: 12, d: 10, title: t('Eid al-Adha (10 Dhu al-Hijjah)', 'Aïd al-Adha (10 Dhou al-Hijja)', 'عيد الأضحى (10 ذو الحجة)', 'Eid al-Adha (10 de Dhu al-Hiyya)'), l: 'hadith', r: ['abudawud:1134'] },
]

/* ------------------------------------------------------------------ the two Eids */

export const EID_STEPS: HourStep[] = [
  {
    id: 'two-eids',
    title: t('Two days Allah gave in place of others', 'Deux jours donnés par Allah à la place d’autres', 'يومان أبدل الله بهما', 'Dos días que Allah dio en lugar de otros'),
    text: t(
      'When he came to Madinah, its people had two days of play from before Islam. He told them Allah had replaced them with better: the day of al-Adha and the day of al-Fitr.',
      'À son arrivée à Médine, ses habitants avaient deux jours de jeux hérités d’avant l’islam. Il leur dit qu’Allah les avait remplacés par mieux : le jour d’al-Adha et le jour d’al-Fitr.',
      'لما قدم المدينة كان لأهلها يومان يلعبون فيهما في الجاهلية، فأخبرهم أن الله أبدلهم خيرًا منهما: يوم الأضحى ويوم الفطر.',
      'Cuando llegó a Medina, su gente tenía dos días de juego de antes del islam. Les dijo que Allah los había cambiado por algo mejor: el día de al-Adha y el día de al-Fitr.',
    ),
    l: 'hadith',
    r: [],
    quotes: [
      q('two-eids', 'إِنَّ اللَّهَ قَدْ أَبْدَلَكُمْ بِهِمَا خَيْرًا مِنْهُمَا يَوْمَ الأَضْحَى وَيَوْمَ الْفِطْرِ', t('Allah has given you in their place something better: the day of al-Adha and the day of al-Fitr.', 'Allah vous a donné à leur place mieux qu’eux : le jour d’al-Adha et le jour d’al-Fitr.', 'رواه أنس بن مالك.', 'Allah os ha dado en su lugar algo mejor: el día de al-Adha y el día de al-Fitr.'), ['abudawud:1134'], { grade: SAHIH_ALBANI }),
    ],
  },
  {
    id: 'fitr',
    title: t('Eid al-Fitr', 'L’Aïd al-Fitr', 'عيد الفطر', 'El Eid al-Fitr'),
    text: t(
      'It ends Ramadan. The charity of al-Fitr is paid before the prayer, and he ate a few dates before going out to pray. Allah is magnified for having guided us.',
      'Il clôt Ramadan. L’aumône d’al-Fitr se donne avant la prière, et il mangeait quelques dattes avant de sortir prier. On magnifie Allah de nous avoir guidés.',
      'يختم رمضان، وتُخرج زكاة الفطر قبل الصلاة، وكان يأكل تمرات قبل أن يغدو إلى المصلى، ويُكبَّر الله على ما هدانا.',
      'Cierra Ramadán. La limosna de al-Fitr se da antes de la oración, y él comía unos dátiles antes de salir a rezar. Se engrandece a Allah por habernos guiado.',
    ),
    l: 'hadith',
    r: ['2:185'],
    quotes: [
      q('zakat-fitr', 'أَمَرَ بِزَكَاةِ الْفِطْرِ قَبْلَ خُرُوجِ النَّاسِ إِلَى الصَّلاَةِ', t('He ordered the charity of al-Fitr to be given before people go out to the prayer.', 'Il ordonna que l’aumône d’al-Fitr soit donnée avant que les gens sortent pour la prière.', 'رواه ابن عمر.', 'Ordenó dar la limosna de al-Fitr antes de que la gente saliera a la oración.'), ['bukhari:1509']),
      q('dates', 'لاَ يَغْدُو يَوْمَ الْفِطْرِ حَتَّى يَأْكُلَ تَمَرَاتٍ', t('He would not go out on the day of al-Fitr until he had eaten some dates.', 'Il ne sortait pas le jour d’al-Fitr avant d’avoir mangé quelques dattes.', 'رواه أنس، وتمامه: «ويأكلهن وترًا».', 'No salía el día de al-Fitr sin haber comido unos dátiles.'), ['bukhari:953']),
    ],
  },
  {
    id: 'adha',
    title: t('Eid al-Adha', 'L’Aïd al-Adha', 'عيد الأضحى', 'El Eid al-Adha'),
    text: t(
      'It falls on the day after ‘Arafah, at the heart of the Hajj, and recalls Ibrahim’s sacrifice. Those who can offer a sacrifice; the Prophet ﷺ sacrificed two rams. What reaches Allah is the devotion, not the meat or the blood.',
      'Il tombe le lendemain de ‘Arafa, au cœur du Hajj, et rappelle le sacrifice d’Ibrahim. Ceux qui le peuvent sacrifient ; le Prophète ﷺ sacrifia deux béliers. Ce qui parvient à Allah, c’est la piété, non la chair ni le sang.',
      'يكون بعد يوم عرفة في قلب الحج، ويذكّر بفداء إبراهيم، ويضحّي القادر، وقد ضحّى النبي ﷺ بكبشين، ولن ينال الله لحومها ولا دماؤها ولكن يناله التقوى.',
      'Cae el día siguiente a ‘Arafa, en el corazón del Hayy, y recuerda el sacrificio de Ibrahim. Quien puede ofrece un sacrificio; el Profeta ﷺ sacrificó dos carneros. Lo que llega a Allah es la piedad, no la carne ni la sangre.',
    ),
    l: 'quran',
    r: ['37:102-107', '22:37'],
    quotes: [
      q('rams', 'ضَحَّى النَّبِيُّ صلى الله عليه وسلم بِكَبْشَيْنِ أَمْلَحَيْنِ', t('The Prophet ﷺ sacrificed two black-and-white rams.', 'Le Prophète ﷺ sacrifia deux béliers blancs tachetés de noir.', 'رواه أنس بن مالك.', 'El Profeta ﷺ sacrificó dos carneros blancos y negros.'), ['bukhari:5558']),
    ],
  },
  {
    id: 'eid-ways',
    title: t('On both Eids', 'Pour les deux Aïds', 'في العيدين', 'En los dos Eid'),
    text: t(
      'He went to the prayer by one road and came back by another, and he forbade fasting on the two days of Eid.',
      'Il allait à la prière par un chemin et revenait par un autre, et il interdit de jeûner les deux jours d’Aïd.',
      'كان يذهب إلى المصلى من طريق ويرجع من آخر، ونهى عن صيام يومي العيد.',
      'Iba a la oración por un camino y volvía por otro, y prohibió ayunar los dos días de Eid.',
    ),
    l: 'hadith',
    r: [],
    quotes: [
      q('route', 'إِذَا كَانَ يَوْمُ عِيدٍ خَالَفَ الطَّرِيقَ', t('On the day of Eid, he would take a different road (back).', 'Le jour de l’Aïd, il changeait de chemin (au retour).', 'رواه جابر بن عبد الله.', 'El día del Eid, cambiaba de camino (al volver).'), ['bukhari:986']),
      q(
        'no-fast',
        'هَذَانِ يَوْمَانِ نَهَى رَسُولُ اللَّهِ صلى الله عليه وسلم عَنْ صِيَامِهِمَا يَوْمُ فِطْرِكُمْ مِنْ صِيَامِكُمْ، وَالْيَوْمُ الآخَرُ تَأْكُلُونَ فِيهِ مِنْ نُسُكِكُمْ',
        t('These are two days the Messenger of Allah ﷺ forbade fasting: the day you break your fast, and the other day on which you eat from your sacrifices.', 'Voici deux jours dont le Messager d’Allah ﷺ interdit le jeûne : le jour où vous rompez votre jeûne, et l’autre jour où vous mangez de vos sacrifices.', 'قاله عمر بن الخطاب في خطبة العيد.', 'Estos son dos días en que el Mensajero de Allah ﷺ prohibió ayunar: el día en que rompéis vuestro ayuno, y el otro en que coméis de vuestros sacrificios.'),
        ['bukhari:1990'],
      ),
    ],
  },
]

/* ------------------------------------------------------------------ al-Kahf: 300 years and nine */

export const KAHF = {
  title: t('Three hundred years, and nine more', 'Trois cents ans, et neuf de plus', 'ثلاث مائة سنين وازدادوا تسعًا', 'Trescientos años, y nueve más'),
  lead: t(
    'Of the young believers asleep in the cave, the Qur’an says: “And they remained in their cave three hundred years and added nine” (18:25).',
    'Des jeunes croyants endormis dans la caverne, le Coran dit : « Et ils demeurèrent dans leur caverne trois cents ans, et en ajoutèrent neuf » (18:25).',
    'قال تعالى عن الفتية المؤمنين في الكهف: ولبثوا في كهفهم ثلاث مائة سنين وازدادوا تسعًا (18:25).',
    'De los jóvenes creyentes dormidos en la cueva, el Corán dice: «Y permanecieron en su cueva trescientos años, y añadieron nueve» (18:25).',
  ),
  explain: t(
    'Ibn Kathir explains in his tafsir: three hundred years by the sun are three hundred and nine by the moon, because a hundred solar years exceed a hundred lunar years by about three. The arithmetic agrees: 300 solar years are 109,573 days, and 109,573 days are 309.2 lunar years.',
    'Ibn Kathir explique dans son tafsir : trois cents ans selon le soleil font trois cent neuf selon la lune, car cent années solaires dépassent cent années lunaires d’environ trois. Le calcul concorde : 300 années solaires font 109 573 jours, et 109 573 jours font 309,2 années lunaires.',
    'قال ابن كثير في تفسيره: هي ثلاثمائة سنة بالشمسية وثلاثمائة وتسع بالقمرية، لأن التفاوت بين كل مائة سنة شمسية ومائة قمرية نحو ثلاث سنين. والحساب يوافق ذلك: 300 سنة شمسية = 109573 يومًا = 309.2 سنة قمرية.',
    'Ibn Kazir explica en su tafsir: trescientos años según el sol son trescientos nueve según la luna, porque cien años solares superan a cien lunares en unos tres. La aritmética concuerda: 300 años solares son 109.573 días, y 109.573 días son 309,2 años lunares.',
  ),
  note: t(
    'This reading is the commentators’ observation, not stated in the verse. Qatada, quoted by al-Qurtubi and al-Tabari, held instead that verse 25 reports what the People of the Book said, answered by the next verse: “Say: Allah knows best how long they remained” (18:26). Most commentators read verse 25 as Allah’s own statement.',
    'Cette lecture est une observation des exégètes, non énoncée par le verset. Qatada, cité par al-Qurtubi et at-Tabari, estimait au contraire que le verset 25 rapporte ce que disaient les gens du Livre, à quoi répond le verset suivant : « Dis : Allah sait mieux combien de temps ils demeurèrent » (18:26). La plupart des exégètes lisent le verset 25 comme la parole d’Allah Lui-même.',
    'هذا استنباط من المفسرين لا نص في الآية. ورأى قتادة، كما نقل القرطبي والطبري، أن الآية 25 حكاية لقول أهل الكتاب، رد عليها قوله: قل الله أعلم بما لبثوا (18:26). وجمهور المفسرين على أن الآية 25 خبر من الله تعالى.',
    'Esta lectura es una observación de los exégetas, no está dicha en el versículo. Qatada, citado por al-Qurtubi y at-Tabari, sostuvo en cambio que el versículo 25 relata lo que decía la Gente del Libro, respondido por el siguiente: «Di: Allah sabe mejor cuánto permanecieron» (18:26). La mayoría de los exégetas leen el versículo 25 como palabra de Allah mismo.',
  ),
  r: ['18:9-26', 'book:ibnkathir', 'book:qurtubi'] as Ref[],
}

/** Every quote of the page, for the checker. */
export const HIJRI_QUOTES: (Supplication & { where: string })[] = [
  ...HIJRI_INTRO.flatMap((s) => (s.quotes ?? []).map((d) => ({ where: `hijri/intro/${s.id}/${d.id}`, ...d }))),
  { where: 'hijri/sacred', ...SACRED_MONTHS_QUOTE },
  ...MONTHS.flatMap((mo) => mo.days.filter((d) => d.quote).map((d) => ({ where: `hijri/month/${mo.n}/${d.quote!.id}`, ...d.quote! }))),
  ...EID_STEPS.flatMap((s) => (s.quotes ?? []).map((d) => ({ where: `hijri/eid/${s.id}/${d.id}`, ...d }))),
]

/** References with no quote, for the checker. */
export const HIJRI_REFS: { where: string; r: Ref[] }[] = [
  ...HIJRI_INTRO.map((s) => ({ where: `hijri/intro/${s.id}`, r: s.r })),
  ...MONTHS.flatMap((mo) => mo.days.map((d, i) => ({ where: `hijri/month/${mo.n}/${i}`, r: d.r }))),
  ...OCCASIONS.map((o) => ({ where: `hijri/occasion/${o.id}`, r: o.r })),
  ...EID_STEPS.map((s) => ({ where: `hijri/eid/${s.id}`, r: s.r })),
  { where: 'hijri/kahf', r: KAHF.r.filter((r) => !r.startsWith('book:')) },
]
