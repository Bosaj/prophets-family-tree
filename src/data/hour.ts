// From the beginning of creation to the Hour and what follows it.
// Every Arabic quote is copied from the hadith it cites (fawazahmed0/hadith-api, the edition's own vowels) and
// checked by `npm run verify:duas`. Qur'an verses are never typed here: they are cited and open in the Mushaf.
// Where scholars differ, the step says so in `note` and never presents one reading as the only one.
import type { L4, Level, Ref } from './types'
import type { Supplication } from './duas'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

const SAHIH_ALBANI = t('Sahih (al-Albani)', 'Sahih (al-Albani)', 'صحيح (الألباني)', 'Sahih (al-Albani)')
const HASAN_SAHIH_ALBANI = t('Hasan sahih (al-Albani)', 'Hasan sahih (al-Albani)', 'حسن صحيح (الألباني)', 'Hasan sahih (al-Albani)')

/** Where a sign of the Hour stands, as the scholars read it. Only Allah knows the Hour. */
export type SignStatus = 'past' | 'now' | 'future'

export interface HourStep {
  id: string
  title: L4
  text: L4
  /** Level of the step's main statement. */
  l: Level
  r: Ref[]
  /** Exact words of the hadith, in the order shown. */
  quotes?: Supplication[]
  /** Where the scholars differ, or how a sign was identified. */
  note?: L4
  status?: SignStatus
}

export interface HourPart {
  id: 'beginning' | 'minor' | 'major' | 'end'
  title: L4
  lead: L4
  steps: HourStep[]
}

const q = (id: string, ar: string, meaning: L4, r: Ref[], extra: Partial<Supplication> = {}): Supplication => ({ id, ar, meaning, r, l: 'hadith', ...extra })

/** The Prophet ﷺ told the whole story, from the first creation to the last home. */
export const HOUR_FRAME = q(
  'frame',
  'قَامَ فِينَا النَّبِيُّ صلى الله عليه وسلم مَقَامًا، فَأَخْبَرَنَا عَنْ بَدْءِ الْخَلْقِ حَتَّى دَخَلَ أَهْلُ الْجَنَّةِ مَنَازِلَهُمْ، وَأَهْلُ النَّارِ مَنَازِلَهُمْ',
  t(
    '‘Umar said: The Prophet ﷺ stood among us and told us about the beginning of creation, until the people of Paradise entered their places and the people of the Fire entered theirs.',
    '‘Umar a dit : Le Prophète ﷺ se tint parmi nous et nous parla du commencement de la création, jusqu’à ce que les gens du Paradis entrent dans leurs demeures et les gens du Feu dans les leurs.',
    'قاله عمر بن الخطاب: حدّثهم النبي ﷺ في مقام واحد من أول الخلق إلى آخر المصير.',
    '‘Umar dijo: El Profeta ﷺ se puso de pie entre nosotros y nos habló del comienzo de la creación, hasta que la gente del Paraíso entró en sus moradas y la gente del Fuego en las suyas.',
  ),
  ['bukhari:3192'],
)

export const HOUR_PARTS: HourPart[] = [
  {
    id: 'beginning',
    title: t('The beginning of creation', 'Le commencement de la création', 'بدء الخلق', 'El comienzo de la creación'),
    lead: t(
      'What the Qur’an and the authentic hadith say about how everything began, and nothing more: they give no date in years.',
      'Ce que disent le Coran et les hadiths authentiques sur le commencement de toute chose, et rien de plus : ils ne donnent aucune date en années.',
      'ما ذكره القرآن والحديث الصحيح عن بدء كل شيء، دون زيادة، ولم يذكرا لذلك تاريخًا بالسنين.',
      'Lo que dicen el Corán y los hadices auténticos sobre el comienzo de todo, y nada más: no dan ninguna fecha en años.',
    ),
    steps: [
      {
        id: 'before',
        title: t('Allah, before everything', 'Allah, avant toute chose', 'كان الله ولا شيء غيره', 'Allah, antes de todo'),
        text: t(
          'Allah is the First: nothing was before Him. His Throne was over the water, and He wrote everything in the Record before He created the heavens and the earth.',
          'Allah est le Premier : rien n’était avant Lui. Son Trône était sur l’eau, et Il écrivit toute chose dans le Registre avant de créer les cieux et la terre.',
          'الله هو الأول ليس قبله شيء، وكان عرشه على الماء، وكتب كل شيء في الذكر قبل أن يخلق السماوات والأرض.',
          'Allah es el Primero: nada existía antes de Él. Su Trono estaba sobre el agua, y Él escribió todo en el Registro antes de crear los cielos y la tierra.',
        ),
        l: 'quran',
        r: ['57:3', '11:7'],
        quotes: [
          q(
            'before',
            'كَانَ اللَّهُ وَلَمْ يَكُنْ شَىْءٌ غَيْرُهُ، وَكَانَ عَرْشُهُ عَلَى الْمَاءِ، وَكَتَبَ فِي الذِّكْرِ كُلَّ شَىْءٍ، وَخَلَقَ السَّمَوَاتِ وَالأَرْضَ',
            t(
              'Allah was, and there was nothing other than Him. His Throne was over the water. He wrote everything in the Record, and created the heavens and the earth.',
              'Allah était, et rien d’autre que Lui n’était. Son Trône était sur l’eau. Il écrivit toute chose dans le Registre, et créa les cieux et la terre.',
              'جواب النبي ﷺ لأهل اليمن حين سألوه عن أول هذا الأمر.',
              'Allah era, y no había nada aparte de Él. Su Trono estaba sobre el agua. Escribió todo en el Registro, y creó los cielos y la tierra.',
            ),
            ['bukhari:3191'],
          ),
        ],
      },
      {
        id: 'decree',
        title: t('The decree is written', 'Le décret est écrit', 'كتابة المقادير', 'El decreto queda escrito'),
        text: t(
          'Fifty thousand years before the heavens and the earth, Allah wrote the measure of every created thing. The Pen was told: “Write.”',
          'Cinquante mille ans avant les cieux et la terre, Allah écrivit la mesure de toute chose créée. Il fut dit au Calame : « Écris. »',
          'كتب الله مقادير الخلائق قبل خلق السماوات والأرض بخمسين ألف سنة، وقال للقلم: اكتب.',
          'Cincuenta mil años antes de los cielos y la tierra, Allah escribió la medida de todo lo creado. Al Cálamo se le dijo: «Escribe».',
        ),
        l: 'hadith',
        r: ['muslim:2653', 'abudawud:4700'],
        quotes: [
          q(
            'decrees',
            'كَتَبَ اللَّهُ مَقَادِيرَ الْخَلاَئِقِ قَبْلَ أَنْ يَخْلُقَ السَّمَوَاتِ وَالأَرْضَ بِخَمْسِينَ أَلْفَ سَنَةٍ، قَالَ: وَعَرْشُهُ عَلَى الْمَاءِ',
            t(
              'Allah wrote the measures of all creatures fifty thousand years before He created the heavens and the earth. And he said: His Throne was over the water.',
              'Allah écrivit les mesures de toutes les créatures cinquante mille ans avant de créer les cieux et la terre. Et il dit : Son Trône était sur l’eau.',
              'كتابة القدر سابقة لخلق السماوات والأرض.',
              'Allah escribió las medidas de todas las criaturas cincuenta mil años antes de crear los cielos y la tierra. Y dijo: Su Trono estaba sobre el agua.',
            ),
            ['muslim:2653'],
          ),
          q(
            'pen',
            'إِنَّ أَوَّلَ مَا خَلَقَ اللَّهُ الْقَلَمَ فَقَالَ لَهُ اكْتُبْ',
            t('The first thing Allah created was the Pen, and He said to it: Write.', 'La première chose qu’Allah créa fut le Calame, et Il lui dit : Écris.', 'رواه عبادة بن الصامت.', 'Lo primero que Allah creó fue el Cálamo, y le dijo: Escribe.'),
            ['abudawud:4700'],
            { grade: SAHIH_ALBANI },
          ),
        ],
        note: t(
          'Scholars differ on whether the Throne or the Pen came first. Since the Throne was already over the water when the decrees were written, Ibn Taymiyya and Ibn al-Qayyim read “first” as the first thing created and told to write.',
          'Les savants divergent : le Trône ou le Calame, lequel vint en premier ? Comme le Trône était déjà sur l’eau quand les décrets furent écrits, Ibn Taymiyya et Ibn al-Qayyim comprennent « premier » comme la première chose créée à qui il fut ordonné d’écrire.',
          'اختلف العلماء: أيهما خُلق أولًا، العرش أم القلم؟ ولأن العرش كان على الماء حين كُتبت المقادير، حمل ابن تيمية وابن القيم الأولية على أن القلم أول ما خُلق وأُمر بالكتابة.',
          'Los sabios difieren sobre si fue primero el Trono o el Cálamo. Como el Trono ya estaba sobre el agua cuando se escribieron los decretos, Ibn Taymiyya e Ibn al-Qayyim entienden «primero» como lo primero creado a lo que se ordenó escribir.',
        ),
      },
      {
        id: 'six-days',
        title: t('The heavens and the earth in six days', 'Les cieux et la terre en six jours', 'السماوات والأرض في ستة أيام', 'Los cielos y la tierra en seis días'),
        text: t(
          'The heavens and the earth were one mass, then parted, and every living thing was made from water. The heaven was smoke. The earth was made in two days, its mountains and provisions in four, the seven heavens in two: six days in all, with no weariness touching Him.',
          'Les cieux et la terre formaient une masse, puis furent séparés, et tout être vivant fut fait d’eau. Le ciel était fumée. La terre fut faite en deux jours, ses montagnes et ses subsistances en quatre, les sept cieux en deux : six jours en tout, sans qu’aucune fatigue ne L’atteigne.',
          'كانت السماوات والأرض رتقًا ففتقهما الله، وجعل من الماء كل شيء حي، وكانت السماء دخانًا. خلق الأرض في يومين، وقدّر فيها أقواتها في تمام أربعة أيام، وقضى السماوات سبعًا في يومين: ستة أيام، وما مسّه من لغوب.',
          'Los cielos y la tierra eran una masa, luego fueron separados, y todo ser vivo se hizo de agua. El cielo era humo. La tierra se hizo en dos días, sus montañas y sustentos en cuatro, los siete cielos en dos: seis días en total, sin que Le tocara cansancio alguno.',
        ),
        l: 'quran',
        r: ['21:30', '41:9-12', '7:54', '50:38'],
        note: t(
          'The Qur’an gives no age in years. Readings that match 21:30 or 51:47 with modern cosmology are interpretations, not the stated meaning of the verses.',
          'Le Coran ne donne aucun âge en années. Les lectures qui rapprochent 21:30 ou 51:47 de la cosmologie moderne sont des interprétations, non le sens énoncé des versets.',
          'لم يذكر القرآن عمرًا بالسنين. وربط الآيتين 21:30 و51:47 بعلم الكون الحديث اجتهاد في التفسير، لا نصّ الآيتين.',
          'El Corán no da ninguna edad en años. Las lecturas que vinculan 21:30 o 51:47 con la cosmología moderna son interpretaciones, no el sentido declarado de los versículos.',
        ),
      },
      {
        id: 'days-report',
        title: t('A report on the days, and its weakness', 'Un récit sur les jours, et sa faiblesse', 'رواية في أيام الخلق وعلّتها', 'Un relato sobre los días, y su debilidad'),
        text: t(
          'A report in Muslim (2789) gives one creation to each of seven days, starting with the soil on Saturday. Al-Bukhari, Ibn Taymiyya and Ibn Kathir held that Abu Hurayra took it from Ka‘b al-Ahbar, not from the Prophet ﷺ, because the Qur’an speaks of six days.',
          'Un récit de Muslim (2789) attribue une création à chacun de sept jours, en commençant par la terre le samedi. Al-Bukhari, Ibn Taymiyya et Ibn Kathir estiment qu’Abu Hurayra le tenait de Ka‘b al-Ahbar, non du Prophète ﷺ, car le Coran parle de six jours.',
          'في صحيح مسلم (2789) رواية تجعل لكل يوم من سبعة أيام خلقًا، أولها التربة يوم السبت. وأعلّها البخاري وابن تيمية وابن كثير بأن أبا هريرة أخذها عن كعب الأحبار لا عن النبي ﷺ، لأن القرآن ذكر ستة أيام.',
          'Un relato de Muslim (2789) asigna una creación a cada uno de siete días, empezando por la tierra el sábado. Al-Bujari, Ibn Taymiyya e Ibn Kazir sostuvieron que Abu Hurayra lo tomó de Ka‘b al-Ahbar, no del Profeta ﷺ, porque el Corán habla de seis días.',
        ),
        l: 'disputed',
        r: ['muslim:2789'],
      },
      {
        id: 'angels',
        title: t('Angels, jinn and Adam', 'Les anges, les djinns et Adam', 'الملائكة والجن وآدم', 'Ángeles, genios y Adán'),
        text: t(
          'Angels were created from light, the jinn before man from smokeless fire, and Adam from clay.',
          'Les anges furent créés de lumière, les djinns avant l’homme d’un feu sans fumée, et Adam d’argile.',
          'خُلقت الملائكة من نور، والجن قبل الإنسان من مارج من نار، وآدم من طين.',
          'Los ángeles fueron creados de luz, los genios antes del hombre de fuego sin humo, y Adán de arcilla.',
        ),
        l: 'hadith',
        r: ['15:26-27', '55:14-15'],
        quotes: [
          q(
            'angels',
            'خُلِقَتِ الْمَلاَئِكَةُ مِنْ نُورٍ وَخُلِقَ الْجَانُّ مِنْ مَارِجٍ مِنْ نَارٍ وَخُلِقَ آدَمُ مِمَّا وُصِفَ لَكُمْ',
            t(
              'The angels were created from light, the jinn from a smokeless flame of fire, and Adam from what has been described to you.',
              'Les anges furent créés de lumière, les djinns d’une flamme de feu sans fumée, et Adam de ce qui vous a été décrit.',
              'وما وُصف لنا: الطين، كما في القرآن.',
              'Los ángeles fueron creados de luz, los genios de una llama de fuego sin humo, y Adán de lo que se os ha descrito.',
            ),
            ['muslim:2996'],
          ),
        ],
      },
      {
        id: 'adam',
        title: t('Adam, on a Friday', 'Adam, un vendredi', 'آدم يوم الجمعة', 'Adán, un viernes'),
        text: t(
          'Allah told the angels He would place a successor on earth, taught Adam the names, and the angels bowed down to him. Adam was created on a Friday, sixty cubits tall, and the Hour will also come on a Friday.',
          'Allah annonça aux anges qu’Il placerait un successeur sur terre, enseigna les noms à Adam, et les anges se prosternèrent devant lui. Adam fut créé un vendredi, haut de soixante coudées, et l’Heure viendra aussi un vendredi.',
          'أخبر الله الملائكة أنه جاعل في الأرض خليفة، وعلّم آدم الأسماء، وسجدت له الملائكة. خُلق آدم يوم الجمعة وطوله ستون ذراعًا، ولا تقوم الساعة إلا يوم الجمعة.',
          'Allah anunció a los ángeles que pondría un sucesor en la tierra, enseñó a Adán los nombres, y los ángeles se postraron ante él. Adán fue creado un viernes, de sesenta codos de alto, y la Hora también llegará un viernes.',
        ),
        l: 'quran',
        r: ['2:30-34', '38:71-76'],
        quotes: [
          q(
            'friday',
            'خَيْرُ يَوْمٍ طَلَعَتْ عَلَيْهِ الشَّمْسُ يَوْمُ الْجُمُعَةِ فِيهِ خُلِقَ آدَمُ وَفِيهِ أُدْخِلَ الْجَنَّةَ وَفِيهِ أُخْرِجَ مِنْهَا وَلاَ تَقُومُ السَّاعَةُ إِلاَّ فِي يَوْمِ الْجُمُعَةِ',
            t(
              'The best day on which the sun rises is Friday: on it Adam was created, on it he was brought into Paradise, on it he was sent out of it, and the Hour will come on no day but Friday.',
              'Le meilleur jour où se lève le soleil est le vendredi : ce jour-là Adam fut créé, ce jour-là il entra au Paradis, ce jour-là il en sortit, et l’Heure ne viendra qu’un vendredi.',
              'يجمع يوم الجمعة بداية البشر ونهاية الدنيا.',
              'El mejor día en que sale el sol es el viernes: en él fue creado Adán, en él entró en el Paraíso, en él salió de él, y la Hora no llegará sino en viernes.',
            ),
            ['muslim:854'],
          ),
          q(
            'adam60',
            'خَلَقَ اللَّهُ آدَمَ وَطُولُهُ سِتُّونَ ذِرَاعًا',
            t('Allah created Adam sixty cubits tall.', 'Allah créa Adam haut de soixante coudées.', 'وتمام الحديث: فلم يزل الخلق ينقص بعدُ حتى الآن.', 'Allah creó a Adán de sesenta codos de alto.'),
            ['bukhari:3326'],
          ),
        ],
      },
      {
        id: 'covenant',
        title: t('The covenant', 'Le pacte', 'الميثاق', 'El pacto'),
        text: t(
          'Allah brought forth the descendants of Adam and made them bear witness: “Am I not your Lord?” They said: “Yes, we bear witness.”',
          'Allah fit sortir la descendance d’Adam et la fit témoigner : « Ne suis-Je pas votre Seigneur ? » Ils dirent : « Si, nous en témoignons. »',
          'أخرج الله ذرية بني آدم وأشهدهم على أنفسهم: ألست بربكم؟ قالوا: بلى شهدنا.',
          'Allah hizo salir a la descendencia de Adán y la hizo atestiguar: «¿No soy Yo vuestro Señor?». Dijeron: «Sí, lo atestiguamos».',
        ),
        l: 'quran',
        r: ['7:172-173'],
      },
      {
        id: 'earth',
        title: t('Down to the earth, for a test', 'Sur la terre, pour une épreuve', 'الهبوط إلى الأرض للابتلاء', 'A la tierra, para una prueba'),
        text: t(
          'Adam and his wife were sent down to the earth with a promise: guidance would come, and whoever follows it shall not fear. Life and death were created to see who does best, and the prophets came one after another, from Adam to Muhammad ﷺ.',
          'Adam et son épouse furent descendus sur terre avec une promesse : une guidée viendrait, et quiconque la suit n’aura pas à craindre. La vie et la mort furent créées pour voir qui agit le mieux, et les prophètes vinrent l’un après l’autre, d’Adam à Muhammad ﷺ.',
          'أُهبط آدم وزوجه إلى الأرض بوعد: سيأتيكم مني هدى، فمن تبعه فلا خوف عليه. وخلق الله الموت والحياة ليبلوكم أيكم أحسن عملًا، وتتابع الأنبياء من آدم إلى محمد ﷺ.',
          'Adán y su esposa fueron enviados a la tierra con una promesa: llegaría una guía, y quien la siga no tendrá temor. La vida y la muerte se crearon para ver quién obra mejor, y los profetas vinieron uno tras otro, de Adán a Muhammad ﷺ.',
        ),
        l: 'quran',
        r: ['2:36-38', '67:2', '51:56'],
      },
    ],
  },
  {
    id: 'minor',
    title: t('The signs of the Hour', 'Les signes de l’Heure', 'أشراط الساعة الصغرى', 'Los signos de la Hora'),
    lead: t(
      'The “minor” signs: events the Prophet ﷺ foretold before the Hour. Some came long ago, many scholars see others in our time, and some are still to come. Which is which is the scholars’ reading; only Allah knows the Hour.',
      'Les « petits » signes : des événements annoncés par le Prophète ﷺ avant l’Heure. Certains sont venus il y a longtemps, beaucoup de savants en voient d’autres à notre époque, et certains sont encore à venir. Ce classement est la lecture des savants ; seul Allah connaît l’Heure.',
      'الأشراط الصغرى: أمور أخبر بها النبي ﷺ قبل الساعة. منها ما وقع قديمًا، ومنها ما يراه كثير من العلماء في زماننا، ومنها ما لم يقع بعد. وهذا التصنيف اجتهاد العلماء، والساعة لا يعلمها إلا الله.',
      'Los signos «menores»: hechos que el Profeta ﷺ anunció antes de la Hora. Algunos llegaron hace mucho, muchos sabios ven otros en nuestro tiempo, y algunos están por venir. Esta clasificación es la lectura de los sabios; solo Allah conoce la Hora.',
    ),
    steps: [
      {
        id: 'unknown',
        title: t('No one knows when', 'Nul ne sait quand', 'لا يعلم وقتها إلا الله', 'Nadie sabe cuándo'),
        text: t(
          'When the angel Jibril asked about the Hour, the Prophet ﷺ answered that he knew no more than the one asking, then gave its signs. The Qur’an says the Hour comes suddenly, and that its signs have already come.',
          'Quand l’ange Jibril l’interrogea sur l’Heure, le Prophète ﷺ répondit qu’il n’en savait pas plus que celui qui demandait, puis en donna les signes. Le Coran dit que l’Heure vient soudainement, et que ses signes sont déjà venus.',
          'لما سأله جبريل عن الساعة قال: ما المسؤول عنها بأعلم من السائل، ثم ذكر أماراتها. وفي القرآن أنها لا تأتي إلا بغتة، وأنه قد جاء أشراطها.',
          'Cuando el ángel Yibril le preguntó por la Hora, el Profeta ﷺ respondió que no sabía más que quien preguntaba, y luego dio sus signos. El Corán dice que la Hora llega de repente, y que sus signos ya han llegado.',
        ),
        l: 'quran',
        r: ['7:187', '31:34', '47:18'],
        quotes: [
          q(
            'jibril-q',
            'مَا الْمَسْئُولُ عَنْهَا بِأَعْلَمَ مِنَ السَّائِلِ',
            t('The one asked about it knows no more than the one asking.', 'Celui qui est interrogé n’en sait pas plus que celui qui interroge.', 'من حديث جبريل الطويل.', 'El preguntado no sabe más que quien pregunta.'),
            ['muslim:8'],
          ),
        ],
      },
      {
        id: 'two-fingers',
        status: 'past',
        title: t('His own coming', 'Sa propre venue', 'بعثته ﷺ', 'Su propia llegada'),
        text: t(
          'The first sign is the Prophet ﷺ himself: he held up his index and middle fingers side by side, to show how close the Hour is to his mission.',
          'Le premier signe est le Prophète ﷺ lui-même : il leva l’index et le majeur côte à côte, pour montrer combien l’Heure est proche de sa mission.',
          'أول الأشراط بعثة النبي ﷺ نفسها، وقد قرن بين إصبعيه السبابة والوسطى.',
          'El primer signo es el propio Profeta ﷺ: levantó el índice y el corazón juntos, para mostrar cuán cerca está la Hora de su misión.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q('two-fingers', 'بُعِثْتُ أَنَا وَالسَّاعَةَ كَهَاتَيْنِ', t('I was sent, and the Hour, like these two.', 'J’ai été envoyé, et l’Heure, comme ces deux-là.', 'وأشار بإصبعيه.', 'Fui enviado, y la Hora, como estos dos.'), ['bukhari:6504']),
        ],
      },
      {
        id: 'moon',
        status: 'past',
        title: t('The moon split', 'La lune fendue', 'انشقاق القمر', 'La luna partida'),
        text: t(
          'In Makkah the moon split in two, and the Prophet ﷺ said: “Bear witness.” The Qur’an links it to the Hour drawing near.',
          'À La Mecque la lune se fendit en deux, et le Prophète ﷺ dit : « Soyez témoins. » Le Coran le lie à l’approche de l’Heure.',
          'انشق القمر بمكة فرقتين، فقال النبي ﷺ: «اشهدوا»، وقرنه القرآن باقتراب الساعة.',
          'En La Meca la luna se partió en dos, y el Profeta ﷺ dijo: «Sed testigos». El Corán lo une a la cercanía de la Hora.',
        ),
        l: 'quran',
        r: ['54:1-2'],
        quotes: [
          q(
            'moon',
            'انْشَقَّ الْقَمَرُ عَلَى عَهْدِ رَسُولِ اللَّهِ صلى الله عليه وسلم شِقَّتَيْنِ، فَقَالَ النَّبِيُّ صلى الله عليه وسلم: «اشْهَدُوا»',
            t(
              'The moon split into two in the time of the Messenger of Allah ﷺ, and the Prophet ﷺ said: “Bear witness.”',
              'La lune se fendit en deux du temps du Messager d’Allah ﷺ, et le Prophète ﷺ dit : « Soyez témoins. »',
              'رواه عبد الله بن مسعود.',
              'La luna se partió en dos en tiempos del Mensajero de Allah ﷺ, y el Profeta ﷺ dijo: «Sed testigos».',
            ),
            ['bukhari:3636'],
          ),
        ],
      },
      {
        id: 'six',
        status: 'past',
        title: t('Six before the Hour', 'Six avant l’Heure', 'ستٌّ بين يدي الساعة', 'Seis antes de la Hora'),
        text: t(
          'He counted six. The first three came to pass in the Companions’ generation: his death (11 AH), the conquest of Jerusalem (under ‘Umar), and a plague that scholars identify with the plague of ‘Amwas (18 AH).',
          'Il en compta six. Les trois premiers se réalisèrent dans la génération des Compagnons : sa mort (11 H), la conquête de Jérusalem (sous ‘Umar), et une épidémie que les savants identifient à la peste d’‘Amwas (18 H).',
          'عدّ ستًّا، وقع أولها في جيل الصحابة: موته ﷺ (11 هـ)، وفتح بيت المقدس في عهد عمر، وموتان يحمله العلماء على طاعون عمواس (18 هـ).',
          'Contó seis. Los tres primeros se cumplieron en la generación de los Compañeros: su muerte (11 H), la conquista de Jerusalén (bajo ‘Umar) y una epidemia que los sabios identifican con la peste de ‘Amwas (18 H).',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'six',
            'اعْدُدْ سِتًّا بَيْنَ يَدَىِ السَّاعَةِ، مَوْتِي، ثُمَّ فَتْحُ بَيْتِ الْمَقْدِسِ، ثُمَّ مُوتَانٌ يَأْخُذُ فِيكُمْ كَقُعَاصِ الْغَنَمِ، ثُمَّ اسْتِفَاضَةُ الْمَالِ حَتَّى يُعْطَى الرَّجُلُ مِائَةَ دِينَارٍ فَيَظَلُّ سَاخِطًا، ثُمَّ فِتْنَةٌ لاَ يَبْقَى بَيْتٌ مِنَ الْعَرَبِ إِلاَّ دَخَلَتْهُ',
            t(
              'Count six before the Hour: my death; then the conquest of Jerusalem; then a death that will take you like the disease of sheep; then wealth so abundant that a man given a hundred dinars stays displeased; then a trial that leaves no Arab house unentered…',
              'Compte six avant l’Heure : ma mort ; puis la conquête de Jérusalem ; puis une mortalité qui vous emportera comme la maladie des moutons ; puis une telle abondance de richesse qu’un homme recevant cent dinars restera mécontent ; puis une épreuve qui n’épargnera aucune maison arabe…',
              'قاله في غزوة تبوك لعوف بن مالك، والسادسة هدنة مع بني الأصفر.',
              'Cuenta seis antes de la Hora: mi muerte; luego la conquista de Jerusalén; luego una mortandad que os llevará como la enfermedad de las ovejas; luego tanta riqueza que un hombre al que se den cien dinares seguirá descontento; luego una prueba que no dejará casa árabe sin entrar…',
            ),
            ['bukhari:3176'],
          ),
        ],
      },
      {
        id: 'fire-hijaz',
        status: 'past',
        title: t('A fire in the Hijaz', 'Un feu au Hedjaz', 'نار الحجاز', 'Un fuego en el Hiyaz'),
        text: t(
          'A fire would come out of the land of the Hijaz and light up the necks of camels as far as Busra in Syria.',
          'Un feu sortirait de la terre du Hedjaz et éclairerait le cou des chameaux jusqu’à Bosra en Syrie.',
          'نار تخرج من أرض الحجاز تضيء أعناق الإبل ببصرى في الشام.',
          'Un fuego saldría de la tierra del Hiyaz e iluminaría el cuello de los camellos hasta Bosra, en Siria.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'fire-hijaz',
            'لاَ تَقُومُ السَّاعَةُ حَتَّى تَخْرُجَ نَارٌ مِنْ أَرْضِ الْحِجَازِ، تُضِيءُ أَعْنَاقَ الإِبِلِ بِبُصْرَى',
            t(
              'The Hour will not come until a fire comes out of the land of the Hijaz that lights up the necks of the camels at Busra.',
              'L’Heure ne viendra pas avant qu’un feu sorte de la terre du Hedjaz, éclairant le cou des chameaux à Bosra.',
              'بُصرى مدينة بحوران في الشام.',
              'La Hora no llegará hasta que salga un fuego de la tierra del Hiyaz que ilumine el cuello de los camellos en Bosra.',
            ),
            ['bukhari:7118'],
          ),
        ],
        note: t(
          'An-Nawawi and Ibn Kathir held that this fire appeared in 654 AH, when lava burned for weeks east of Madinah; Abu Shama recorded it as it happened.',
          'An-Nawawi et Ibn Kathir estiment que ce feu apparut en 654 H, quand la lave brûla des semaines à l’est de Médine ; Abu Shama le consigna au moment même.',
          'رأى النووي وابن كثير أنها النار التي ظهرت سنة 654 هـ شرقي المدينة وبقيت أسابيع، ودوّنها أبو شامة في حينها.',
          'An-Nawawi e Ibn Kazir sostuvieron que este fuego apareció en el 654 H, cuando la lava ardió semanas al este de Medina; Abu Shama lo registró al ocurrir.',
        ),
      },
      {
        id: 'liars',
        status: 'past',
        title: t('Liars claiming prophethood', 'Des menteurs se disant prophètes', 'الكذابون مدّعو النبوة', 'Mentirosos que se dicen profetas'),
        text: t(
          'Nearly thirty liars would each claim to be a messenger of Allah. The first, Musaylima and al-Aswad al-‘Ansi, appeared in his own lifetime.',
          'Près de trente menteurs prétendraient chacun être messager d’Allah. Les premiers, Musaylima et al-Aswad al-‘Ansi, parurent de son vivant.',
          'يخرج قرابة ثلاثين كذّابًا كلهم يزعم أنه رسول الله، وأولهم مسيلمة والأسود العنسي في حياته ﷺ.',
          'Cerca de treinta mentirosos dirían cada uno ser mensajero de Allah. Los primeros, Musaylima y al-Aswad al-‘Ansi, aparecieron en vida suya.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'liars',
            'دَجَّالُونَ كَذَّابُونَ قَرِيبًا مِنْ ثَلاَثِينَ، كُلُّهُمْ يَزْعُمُ أَنَّهُ رَسُولُ اللَّهِ',
            t('Impostors and liars, close to thirty, each claiming to be the messenger of Allah.', 'Des imposteurs menteurs, près de trente, chacun prétendant être le messager d’Allah.', 'من حديث أبي هريرة.', 'Impostores mentirosos, cerca de treinta, cada uno afirmando ser el mensajero de Allah.'),
            ['bukhari:3609'],
          ),
        ],
      },
      {
        id: 'shepherds',
        status: 'now',
        title: t('Shepherds competing in tall buildings', 'Des bergers rivalisant de hauts bâtiments', 'التطاول في البنيان', 'Pastores compitiendo en edificios altos'),
        text: t(
          'Barefoot, poor shepherds would compete in raising tall buildings, and a slave woman would give birth to her mistress. Many scholars see the first in our age of towers.',
          'Des bergers pieds nus et pauvres rivaliseraient à élever de hauts bâtiments, et une esclave enfanterait sa maîtresse. Beaucoup de savants voient le premier à notre époque de tours.',
          'يتطاول رعاء الشاء الحفاة العراة في البنيان، وتلد الأمة ربتها. ويرى كثير من العلماء الأول في زمن الأبراج هذا.',
          'Pastores descalzos y pobres competirían en levantar edificios altos, y una esclava daría a luz a su señora. Muchos sabios ven lo primero en nuestra época de torres.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'jibril-signs',
            'أَنْ تَلِدَ الأَمَةُ رَبَّتَهَا وَأَنْ تَرَى الْحُفَاةَ الْعُرَاةَ الْعَالَةَ رِعَاءَ الشَّاءِ يَتَطَاوَلُونَ فِي الْبُنْيَانِ',
            t(
              'That the slave woman gives birth to her mistress, and that you see barefoot, naked, destitute shepherds competing in tall buildings.',
              'Que l’esclave enfante sa maîtresse, et que tu voies des bergers pieds nus, dénudés et démunis rivaliser de hauts bâtiments.',
              'جواب النبي ﷺ لجبريل عن أمارات الساعة.',
              'Que la esclava dé a luz a su señora, y que veas a pastores descalzos, desnudos y pobres competir en edificios altos.',
            ),
            ['muslim:8'],
          ),
        ],
      },
      {
        id: 'trust',
        status: 'now',
        title: t('Trust lost', 'La confiance perdue', 'تضييع الأمانة', 'La confianza perdida'),
        text: t(
          'Trust is lost when authority is handed to those not fit for it.',
          'La confiance est perdue quand l’autorité est confiée à ceux qui n’en sont pas dignes.',
          'تضيع الأمانة إذا أُسند الأمر إلى غير أهله.',
          'La confianza se pierde cuando la autoridad se entrega a quien no es apto para ella.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'trust',
            'فَإِذَا ضُيِّعَتِ الأَمَانَةُ فَانْتَظِرِ السَّاعَةَ … إِذَا وُسِّدَ الأَمْرُ إِلَى غَيْرِ أَهْلِهِ فَانْتَظِرِ السَّاعَةَ',
            t(
              'When trust is lost, wait for the Hour… When authority is given to those not fit for it, wait for the Hour.',
              'Quand la confiance est perdue, attends l’Heure… Quand l’autorité est confiée à qui n’en est pas digne, attends l’Heure.',
              'سئل: كيف إضاعتها؟ فأجاب بالجملة الثانية.',
              'Cuando se pierda la confianza, espera la Hora… Cuando la autoridad se dé a quien no es apto, espera la Hora.',
            ),
            ['bukhari:59'],
            { src: ['فَإِذَا ضُيِّعَتِ الأَمَانَةُ فَانْتَظِرِ السَّاعَةَ', 'إِذَا وُسِّدَ الأَمْرُ إِلَى غَيْرِ أَهْلِهِ فَانْتَظِرِ السَّاعَةَ'] },
          ),
        ],
      },
      {
        id: 'knowledge',
        status: 'now',
        title: t('Knowledge lifted, ignorance spread', 'Le savoir enlevé, l’ignorance répandue', 'رفع العلم وظهور الجهل', 'El saber retirado, la ignorancia extendida'),
        text: t(
          'Religious knowledge is taken away with the death of scholars, ignorance settles, wine is drunk and fornication becomes open.',
          'Le savoir religieux s’en va avec la mort des savants, l’ignorance s’installe, le vin est bu et la fornication devient publique.',
          'يُرفع العلم بموت العلماء، ويثبت الجهل، ويُشرب الخمر، ويظهر الزنا.',
          'El saber religioso se retira con la muerte de los sabios, la ignorancia se asienta, se bebe vino y la fornicación se hace pública.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'knowledge',
            'إِنَّ مِنْ أَشْرَاطِ السَّاعَةِ أَنْ يُرْفَعَ الْعِلْمُ، وَيَثْبُتَ الْجَهْلُ، وَيُشْرَبَ الْخَمْرُ، وَيَظْهَرَ الزِّنَا',
            t(
              'Among the signs of the Hour: knowledge is lifted, ignorance settles, wine is drunk, and fornication becomes open.',
              'Parmi les signes de l’Heure : le savoir est enlevé, l’ignorance s’installe, le vin est bu, et la fornication devient publique.',
              'رواه أنس بن مالك.',
              'Entre los signos de la Hora: se retira el saber, se asienta la ignorancia, se bebe vino y la fornicación se hace pública.',
            ),
            ['bukhari:80'],
          ),
        ],
      },
      {
        id: 'killing',
        status: 'now',
        title: t('Earthquakes, trials and killing', 'Séismes, épreuves et tueries', 'الزلازل والفتن والهرج', 'Terremotos, pruebas y matanzas'),
        text: t(
          'Earthquakes multiply, time seems to shrink, trials appear and killing becomes common, until wealth overflows.',
          'Les séismes se multiplient, le temps semble rétrécir, les épreuves apparaissent et les tueries deviennent courantes, jusqu’à ce que la richesse déborde.',
          'تكثر الزلازل، ويتقارب الزمان، وتظهر الفتن، ويكثر القتل، حتى يفيض المال.',
          'Se multiplican los terremotos, el tiempo parece encogerse, aparecen las pruebas y las matanzas se vuelven comunes, hasta que la riqueza desborda.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'quakes',
            'لاَ تَقُومُ السَّاعَةُ حَتَّى يُقْبَضَ الْعِلْمُ، وَتَكْثُرَ الزَّلاَزِلُ، وَيَتَقَارَبَ الزَّمَانُ، وَتَظْهَرَ الْفِتَنُ، وَيَكْثُرَ الْهَرْجُ ـ وَهْوَ الْقَتْلُ الْقَتْلُ ـ حَتَّى يَكْثُرَ فِيكُمُ الْمَالُ فَيَفِيضُ',
            t(
              'The Hour will not come until knowledge is taken away, earthquakes multiply, time draws close, trials appear and harj increases (it is killing, killing), until wealth becomes plentiful among you and overflows.',
              'L’Heure ne viendra pas avant que le savoir soit retiré, que les séismes se multiplient, que le temps se rapproche, que les épreuves apparaissent et que le harj augmente (c’est le meurtre, le meurtre), jusqu’à ce que la richesse abonde chez vous et déborde.',
              'الهرج: القتل، كما فسّره النبي ﷺ.',
              'La Hora no llegará hasta que se retire el saber, se multipliquen los terremotos, el tiempo se acorte, aparezcan las pruebas y aumente el harj (es la matanza, la matanza), hasta que la riqueza abunde entre vosotros y desborde.',
            ),
            ['bukhari:1036'],
          ),
        ],
      },
      {
        id: 'euphrates',
        status: 'future',
        title: t('Gold under the Euphrates', 'De l’or sous l’Euphrate', 'جبل الذهب في الفرات', 'Oro bajo el Éufrates'),
        text: t(
          'The Euphrates will uncover a treasure of gold, and the Prophet ﷺ told whoever is present not to take any of it.',
          'L’Euphrate découvrira un trésor d’or, et le Prophète ﷺ dit à quiconque sera présent de n’en rien prendre.',
          'يحسر الفرات عن كنز من ذهب، ونهى النبي ﷺ من حضره أن يأخذ منه شيئًا.',
          'El Éufrates descubrirá un tesoro de oro, y el Profeta ﷺ dijo a quien esté presente que no tome nada de él.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'euphrates',
            'يُوشِكُ الْفُرَاتُ أَنْ يَحْسِرَ عَنْ كَنْزٍ مِنْ ذَهَبٍ، فَمَنْ حَضَرَهُ فَلاَ يَأْخُذْ مِنْهُ شَيْئًا',
            t('The Euphrates is about to uncover a treasure of gold: whoever is there, let him take nothing of it.', 'L’Euphrate est sur le point de découvrir un trésor d’or : que celui qui sera là n’en prenne rien.', 'رواه أبو هريرة.', 'El Éufrates está a punto de descubrir un tesoro de oro: quien esté allí, que no tome nada de él.'),
            ['bukhari:7119'],
          ),
        ],
      },
    ],
  },
  {
    id: 'major',
    title: t('The ten great signs', 'Les dix grands signes', 'أشراط الساعة الكبرى', 'Los diez grandes signos'),
    lead: t(
      'Signs that change the world itself, close to the end. The Prophet ﷺ named ten in one hadith; others give the details.',
      'Des signes qui changent le monde lui-même, peu avant la fin. Le Prophète ﷺ en nomma dix dans un hadith ; d’autres en donnent les détails.',
      'علامات تغيّر حال العالم قرب النهاية، ذكر النبي ﷺ عشرًا منها في حديث واحد، وفصّلتها أحاديث أخرى.',
      'Signos que cambian el mundo mismo, cerca del final. El Profeta ﷺ nombró diez en un hadiz; otros dan los detalles.',
    ),
    steps: [
      {
        id: 'ten',
        title: t('The ten, in one hadith', 'Les dix, dans un hadith', 'العشر في حديث واحد', 'Los diez, en un hadiz'),
        text: t(
          'The smoke, the Dajjal, the beast, the sun rising from the west, the descent of ‘Isa son of Maryam, Gog and Magog, three collapses of the earth, and last a fire that drives people to their gathering.',
          'La fumée, le Dajjal, la bête, le soleil se levant à l’ouest, la descente de ‘Isa fils de Maryam, Gog et Magog, trois effondrements de la terre, et enfin un feu qui pousse les gens vers leur rassemblement.',
          'الدخان، والدجال، والدابة، وطلوع الشمس من مغربها، ونزول عيسى ابن مريم، ويأجوج ومأجوج، وثلاثة خسوف، وآخرها نار تطرد الناس إلى محشرهم.',
          'El humo, el Dajjal, la bestia, el sol saliendo por el oeste, el descenso de ‘Isa hijo de Maryam, Gog y Magog, tres hundimientos de la tierra y, por último, un fuego que empuja a la gente a su reunión.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'ten',
            'إِنَّهَا لَنْ تَقُومَ حَتَّى تَرَوْنَ قَبْلَهَا عَشْرَ آيَاتٍ. فَذَكَرَ: الدُّخَانَ، وَالدَّجَّالَ، وَالدَّابَّةَ، وَطُلُوعَ الشَّمْسِ مِنْ مَغْرِبِهَا، وَنُزُولَ عِيسَى ابْنِ مَرْيَمَ صلى الله عليه وسلم، وَيَأْجُوجَ وَمَأْجُوجَ، وَثَلاَثَةَ خُسُوفٍ: خَسْفٌ بِالْمَشْرِقِ، وَخَسْفٌ بِالْمَغْرِبِ، وَخَسْفٌ بِجَزِيرَةِ الْعَرَبِ، وَآخِرُ ذَلِكَ نَارٌ تَخْرُجُ مِنَ الْيَمَنِ تَطْرُدُ النَّاسَ إِلَى مَحْشَرِهِمْ',
            t(
              'It will not come until you see ten signs before it. He named: the smoke, the Dajjal, the beast, the rising of the sun from its setting place, the descent of ‘Isa son of Maryam ﷺ, Gog and Magog, and three collapses of the earth, one in the east, one in the west and one in the Arabian Peninsula; and the last of them is a fire that comes out of Yemen and drives people to their place of gathering.',
              'Elle ne viendra pas avant que vous ne voyiez dix signes. Il cita : la fumée, le Dajjal, la bête, le lever du soleil à son couchant, la descente de ‘Isa fils de Maryam ﷺ, Gog et Magog, et trois effondrements, un à l’est, un à l’ouest et un dans la péninsule Arabique ; et le dernier est un feu qui sort du Yémen et pousse les gens vers leur lieu de rassemblement.',
              'رواه حذيفة بن أسيد الغفاري.',
              'No llegará hasta que veáis diez signos antes de ella. Nombró: el humo, el Dajjal, la bestia, la salida del sol por su ocaso, el descenso de ‘Isa hijo de Maryam ﷺ, Gog y Magog, y tres hundimientos, uno en el este, uno en el oeste y uno en la península arábiga; y el último es un fuego que sale del Yemen y empuja a la gente a su lugar de reunión.',
            ),
            ['muslim:2901'],
          ),
        ],
        note: t(
          'This hadith joins the ten with “and”, not in sequence. Muslim 2937 gives one sequence: the Dajjal, then ‘Isa, then Gog and Magog, then the wind that takes the believers. Muslim 2941 calls the sun rising from the west and the beast “the first signs”; Ibn Hajar reads it as the first signs that change the order of the heavens. The rest of the order is debated.',
          'Ce hadith relie les dix par « et », sans ordre. Muslim 2937 donne une séquence : le Dajjal, puis ‘Isa, puis Gog et Magog, puis le vent qui emporte les croyants. Muslim 2941 appelle le soleil levant à l’ouest et la bête « les premiers signes » ; Ibn Hajar y voit les premiers signes qui changent l’ordre des cieux. Le reste de l’ordre est discuté.',
          'عطف الحديث العشر بالواو دون ترتيب. وفي مسلم 2937 ترتيب: الدجال، ثم عيسى، ثم يأجوج ومأجوج، ثم الريح التي تقبض المؤمنين. وفي مسلم 2941 أن طلوع الشمس من مغربها والدابة أول الآيات، وحمله ابن حجر على أول الآيات المغيّرة لنظام السماء. وما سوى ذلك من الترتيب محل اجتهاد.',
          'Este hadiz une los diez con «y», sin orden. Muslim 2937 da una secuencia: el Dajjal, luego ‘Isa, luego Gog y Magog, luego el viento que se lleva a los creyentes. Muslim 2941 llama al sol que sale por el oeste y a la bestia «los primeros signos»; Ibn Hajar lo entiende como los primeros signos que cambian el orden de los cielos. El resto del orden se debate.',
        ),
      },
      {
        id: 'mahdi',
        title: t('The Mahdi', 'Le Mahdi', 'المهدي', 'El Mahdi'),
        text: t(
          'A man of the Prophet’s family, bearing his name and his father’s name, who fills the earth with justice as it was filled with injustice.',
          'Un homme de la famille du Prophète, portant son nom et le nom de son père, qui remplit la terre de justice comme elle fut remplie d’injustice.',
          'رجل من آل بيت النبي ﷺ يواطئ اسمه اسمه واسم أبيه اسم أبيه، يملأ الأرض عدلًا كما مُلئت ظلمًا.',
          'Un hombre de la familia del Profeta, con su nombre y el de su padre, que llena la tierra de justicia como fue llenada de injusticia.',
        ),
        l: 'hadith',
        r: ['muslim:156'],
        quotes: [
          q(
            'mahdi',
            'لَوْ لَمْ يَبْقَ مِنَ الدُّنْيَا إِلاَّ يَوْمٌ لَطَوَّلَ اللَّهُ ذَلِكَ الْيَوْمَ حَتَّى يَبْعَثَ فِيهِ رَجُلاً مِنِّي - أَوْ مِنْ أَهْلِ بَيْتِي - يُوَاطِئُ اسْمُهُ اسْمِي وَاسْمُ أَبِيهِ اسْمَ أَبِي، يَمْلأُ الأَرْضَ قِسْطًا وَعَدْلاً كَمَا مُلِئَتْ ظُلْمًا وَجَوْرًا',
            t(
              'If only one day of this world remained, Allah would lengthen that day until He sends a man from me, or from my family, whose name matches mine and whose father’s name matches my father’s, who will fill the earth with fairness and justice as it was filled with oppression and injustice.',
              'S’il ne restait de ce monde qu’un seul jour, Allah allongerait ce jour jusqu’à envoyer un homme de moi, ou de ma famille, dont le nom est le mien et le nom du père celui de mon père, qui remplira la terre d’équité et de justice comme elle fut remplie d’oppression et d’injustice.',
              'رواه عبد الله بن مسعود.',
              'Si solo quedara un día de este mundo, Allah alargaría ese día hasta enviar a un hombre de mí, o de mi familia, cuyo nombre coincide con el mío y el de su padre con el de mi padre, que llenará la tierra de equidad y justicia como fue llenada de opresión e injusticia.',
            ),
            ['abudawud:4282'],
            {
              grade: HASAN_SAHIH_ALBANI,
              src: [
                'لَوْ لَمْ يَبْقَ مِنَ الدُّنْيَا إِلاَّ يَوْمٌ',
                'لَطَوَّلَ اللَّهُ ذَلِكَ الْيَوْمَ',
                'حَتَّى يَبْعَثَ فِيهِ رَجُلاً مِنِّي',
                'مِنْ أَهْلِ بَيْتِي يُوَاطِئُ اسْمُهُ اسْمِي وَاسْمُ أَبِيهِ اسْمَ أَبِي',
                'يَمْلأُ الأَرْضَ قِسْطًا وَعَدْلاً كَمَا مُلِئَتْ ظُلْمًا وَجَوْرًا',
              ],
            },
          ),
        ],
        note: t(
          'He is not named in al-Bukhari or Muslim; Muslim 156 speaks only of the Muslims’ leader who asks ‘Isa to lead the prayer. The hadith describing him are in Abu Dawud and at-Tirmidhi, and most Sunni scholars accept them.',
          'Il n’est nommé ni chez al-Bukhari ni chez Muslim ; Muslim 156 parle seulement du chef des musulmans qui demande à ‘Isa de diriger la prière. Les hadiths qui le décrivent sont chez Abu Dawud et at-Tirmidhi, et la plupart des savants sunnites les acceptent.',
          'لم يُسمَّ في الصحيحين، وفي مسلم 156 ذكر أمير المسلمين الذي يقدّم عيسى للصلاة. وأحاديث صفته في سنن أبي داود والترمذي، وقبلها جمهور علماء أهل السنة.',
          'No se le nombra en al-Bujari ni en Muslim; Muslim 156 habla solo del líder de los musulmanes que pide a ‘Isa dirigir la oración. Los hadices que lo describen están en Abu Dawud y at-Tirmidhi, y la mayoría de los sabios suníes los aceptan.',
        ),
      },
      {
        id: 'dajjal',
        title: t('The Dajjal', 'Le Dajjal', 'المسيح الدجال', 'El Dajjal'),
        text: t(
          'The greatest trial: a one-eyed liar who claims to be God, with “kafir” written between his eyes. Every prophet warned his people of him. He stays forty days, the first like a year, and enters every land except Makkah and Madinah.',
          'La plus grande épreuve : un menteur borgne qui se prétend Dieu, avec « kafir » écrit entre les yeux. Chaque prophète en a averti son peuple. Il reste quarante jours, le premier comme une année, et entre dans tout pays sauf La Mecque et Médine.',
          'أعظم فتنة: كذّاب أعور يدّعي الربوبية، مكتوب بين عينيه كافر، ما من نبي إلا أنذر أمته منه. يلبث أربعين يومًا أولها كسنة، ويطأ كل بلد إلا مكة والمدينة.',
          'La mayor prueba: un mentiroso tuerto que dice ser Dios, con «kafir» escrito entre los ojos. Todos los profetas advirtieron a su pueblo de él. Permanece cuarenta días, el primero como un año, y entra en toda tierra salvo La Meca y Medina.',
        ),
        l: 'hadith',
        r: [],
        quotes: [
          q(
            'dajjal',
            'مَا بُعِثَ نَبِيٌّ إِلاَّ أَنْذَرَ أُمَّتَهُ الأَعْوَرَ الْكَذَّابَ، أَلاَ إِنَّهُ أَعْوَرُ، وَإِنَّ رَبَّكُمْ لَيْسَ بِأَعْوَرَ، وَإِنَّ بَيْنَ عَيْنَيْهِ مَكْتُوبٌ كَافِرٌ',
            t(
              'No prophet was sent without warning his nation of the one-eyed liar. He is one-eyed, and your Lord is not one-eyed, and between his eyes is written: kafir (unbeliever).',
              'Aucun prophète ne fut envoyé sans avertir sa communauté du menteur borgne. Il est borgne, et votre Seigneur n’est pas borgne, et entre ses yeux est écrit : kafir (mécréant).',
              'رواه أنس بن مالك.',
              'Ningún profeta fue enviado sin advertir a su comunidad del mentiroso tuerto. Él es tuerto, y vuestro Señor no es tuerto, y entre sus ojos está escrito: kafir (incrédulo).',
            ),
            ['bukhari:7131'],
          ),
          q(
            'days40',
            'أَرْبَعُونَ يَوْمًا يَوْمٌ كَسَنَةٍ وَيَوْمٌ كَشَهْرٍ وَيَوْمٌ كَجُمُعَةٍ وَسَائِرُ أَيَّامِهِ كَأَيَّامِكُمْ',
            t(
              'Forty days: a day like a year, a day like a month, a day like a week, and the rest of his days like your days.',
              'Quarante jours : un jour comme une année, un jour comme un mois, un jour comme une semaine, et le reste de ses jours comme vos jours.',
              'وسأله الصحابة عن الصلاة في اليوم الذي كسنة، فقال: «اقدروا له قدره».',
              'Cuarenta días: un día como un año, un día como un mes, un día como una semana, y el resto de sus días como vuestros días.',
            ),
            ['muslim:2937'],
          ),
          q(
            'dajjal-cities',
            'لَيْسَ مِنْ بَلَدٍ إِلاَّ سَيَطَؤُهُ الدَّجَّالُ، إِلاَّ مَكَّةَ وَالْمَدِينَةَ',
            t('There is no land the Dajjal will not tread, except Makkah and Madinah.', 'Il n’est pas de pays que le Dajjal ne foulera, sauf La Mecque et Médine.', 'تحرسهما الملائكة، كما في تمام الحديث.', 'No hay tierra que el Dajjal no pise, salvo La Meca y Medina.'),
            ['bukhari:1881'],
          ),
        ],
      },
      {
        id: 'protection',
        title: t('Protection from the Dajjal', 'Se protéger du Dajjal', 'العصمة من الدجال', 'Protegerse del Dajjal'),
        text: t(
          'The Prophet ﷺ taught two protections: learning the first ten verses of Surat al-Kahf, and seeking refuge from his trial at the end of every prayer.',
          'Le Prophète ﷺ enseigna deux protections : apprendre les dix premiers versets de la sourate al-Kahf, et chercher refuge contre son épreuve à la fin de chaque prière.',
          'علّم النبي ﷺ عصمتين: حفظ عشر آيات من أول سورة الكهف، والاستعاذة من فتنته في آخر كل صلاة.',
          'El Profeta ﷺ enseñó dos protecciones: aprender los diez primeros versículos de la sura al-Kahf, y buscar refugio de su prueba al final de cada oración.',
        ),
        l: 'hadith',
        r: ['18:1-10'],
        quotes: [
          q(
            'kahf',
            'مَنْ حَفِظَ عَشْرَ آيَاتٍ مِنْ أَوَّلِ سُورَةِ الْكَهْفِ عُصِمَ مِنَ الدَّجَّالِ',
            t('Whoever memorises ten verses from the beginning of Surat al-Kahf is protected from the Dajjal.', 'Quiconque apprend par cœur dix versets du début de la sourate al-Kahf est protégé du Dajjal.', 'رواه أبو الدرداء.', 'Quien memorice diez versículos del comienzo de la sura al-Kahf queda protegido del Dajjal.'),
            ['muslim:809'],
            { verse: '18:1-10' },
          ),
          q(
            'refuge',
            'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
            t(
              'O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the trial of the False Messiah.',
              'Ô Allah, je cherche refuge auprès de Toi contre le châtiment de l’Enfer, le châtiment de la tombe, les épreuves de la vie et de la mort, et le mal de l’épreuve du faux Messie.',
              'يقولها المصلي بعد التشهد الأخير.',
              'Oh Allah, busco refugio en Ti del castigo del Infierno, del castigo de la tumba, de las pruebas de la vida y la muerte, y del mal de la prueba del falso Mesías.',
            ),
            ['muslim:588'],
          ),
        ],
      },
      {
        id: 'isa',
        title: t('‘Isa son of Maryam descends', '‘Isa fils de Maryam descend', 'نزول عيسى ابن مريم', 'Desciende ‘Isa hijo de Maryam'),
        text: t(
          '‘Isa ﷺ, who was not killed but raised, descends at the white minaret east of Damascus, finds the Dajjal at the gate of Lud and kills him, then rules justly by the law of Islam.',
          '‘Isa ﷺ, qui ne fut pas tué mais élevé, descend près du minaret blanc à l’est de Damas, rattrape le Dajjal à la porte de Lod et le tue, puis gouverne avec justice selon la loi de l’islam.',
          'ينزل عيسى ﷺ، الذي لم يُقتل بل رُفع، عند المنارة البيضاء شرقي دمشق، فيدرك الدجال بباب لُدّ فيقتله، ثم يحكم بالعدل بشريعة الإسلام.',
          '‘Isa ﷺ, que no fue matado sino elevado, desciende junto al minarete blanco al este de Damasco, alcanza al Dajjal en la puerta de Lod y lo mata, y luego gobierna con justicia según la ley del islam.',
        ),
        l: 'hadith',
        r: ['4:157-159', '43:61'],
        quotes: [
          q(
            'isa',
            'لَيُوشِكَنَّ أَنْ يَنْزِلَ فِيكُمُ ابْنُ مَرْيَمَ حَكَمًا عَدْلاً، فَيَكْسِرَ الصَّلِيبَ، وَيَقْتُلَ الْخِنْزِيرَ، وَيَضَعَ الْجِزْيَةَ، وَيَفِيضَ الْمَالُ حَتَّى لاَ يَقْبَلَهُ أَحَدٌ',
            t(
              'The son of Maryam will soon descend among you as a just judge. He will break the cross, kill the swine, abolish the jizya, and wealth will overflow until no one accepts it.',
              'Le fils de Maryam descendra bientôt parmi vous en juge équitable. Il brisera la croix, tuera le porc, supprimera la jizya, et la richesse débordera au point que personne ne l’acceptera.',
              'رواه أبو هريرة.',
              'El hijo de Maryam descenderá pronto entre vosotros como juez justo. Romperá la cruz, matará al cerdo, abolirá la yizia, y la riqueza desbordará hasta que nadie la acepte.',
            ),
            ['bukhari:3448'],
          ),
          q('minaret', 'فَيَنْزِلُ عِنْدَ الْمَنَارَةِ الْبَيْضَاءِ شَرْقِيَّ دِمَشْقَ', t('He descends at the white minaret, east of Damascus.', 'Il descend près du minaret blanc, à l’est de Damas.', 'من حديث النواس بن سمعان.', 'Desciende junto al minarete blanco, al este de Damasco.'), ['muslim:2937']),
          q('ludd', 'فَيَطْلُبُهُ حَتَّى يُدْرِكَهُ بِبَابِ لُدٍّ فَيَقْتُلُهُ', t('He pursues him until he catches him at the gate of Lud, and kills him.', 'Il le poursuit jusqu’à le rattraper à la porte de Lod, et le tue.', 'لُدّ بلدة في فلسطين.', 'Lo persigue hasta alcanzarlo en la puerta de Lod, y lo mata.'), ['muslim:2937']),
        ],
        note: t(
          'Most commentators read 43:61 (“he is a sign of the Hour”) as his descent; the meaning of 4:159 is discussed among the commentators.',
          'La plupart des exégètes lisent 43:61 (« il est un signe de l’Heure ») comme sa descente ; le sens de 4:159 est discuté entre exégètes.',
          'حمل أكثر المفسرين قوله تعالى: «وإنه لعلم للساعة» (43:61) على نزوله، واختلفوا في معنى الآية 4:159.',
          'La mayoría de los exégetas leen 43:61 («él es un signo de la Hora») como su descenso; el sentido de 4:159 se discute entre los exégetas.',
        ),
      },
      {
        id: 'gog',
        title: t('Gog and Magog', 'Gog et Magog', 'يأجوج ومأجوج', 'Gog y Magog'),
        text: t(
          'After the Dajjal, Allah releases Gog and Magog, held back behind the barrier of Dhul-Qarnayn. ‘Isa and the believers take refuge on Mount Tur; they pray, and Allah destroys them.',
          'Après le Dajjal, Allah libère Gog et Magog, retenus derrière la barrière de Dhul-Qarnayn. ‘Isa et les croyants se réfugient sur le mont Tur ; ils prient, et Allah les anéantit.',
          'بعد الدجال يبعث الله يأجوج ومأجوج المحبوسين وراء ردم ذي القرنين، فيتحصّن عيسى والمؤمنون بالطور، ويدعون الله فيهلكهم.',
          'Tras el Dajjal, Allah libera a Gog y Magog, retenidos tras la barrera de Dhul-Qarnayn. ‘Isa y los creyentes se refugian en el monte Tur; rezan, y Allah los aniquila.',
        ),
        l: 'quran',
        r: ['18:94-99', '21:96-97'],
        quotes: [
          q(
            'gog',
            'وَيَبْعَثُ اللَّهُ يَأْجُوجَ وَمَأْجُوجَ وَهُمْ مِنْ كُلِّ حَدَبٍ يَنْسِلُونَ',
            t('And Allah sends Gog and Magog, and they swarm down from every height.', 'Et Allah envoie Gog et Magog, et ils dévalent de chaque hauteur.', 'من حديث النواس بن سمعان، وفيه لفظ الآية 21:96.', 'Y Allah envía a Gog y Magog, y descienden en masa desde cada altura.'),
            ['muslim:2937'],
          ),
        ],
      },
      {
        id: 'smoke',
        title: t('The smoke', 'La fumée', 'الدخان', 'El humo'),
        text: t(
          'A smoke that covers the people, named among the ten signs.',
          'Une fumée qui couvre les gens, citée parmi les dix signes.',
          'دخان يغشى الناس، ذُكر في الآيات العشر.',
          'Un humo que cubre a la gente, citado entre los diez signos.',
        ),
        l: 'disputed',
        r: ['44:10-11', 'muslim:2901', 'bukhari:4821'],
        note: t(
          'Ibn Mas‘ud held that the verse described a famine in Makkah, when hungry men saw something like smoke between them and the sky (Bukhari 4821). Ibn ‘Abbas and others held it is a smoke still to come, as the hadith of the ten signs lists it.',
          'Ibn Mas‘ud estimait que le verset décrit une famine à La Mecque, quand les affamés voyaient comme une fumée entre eux et le ciel (Bukhari 4821). Ibn ‘Abbas et d’autres y voient une fumée encore à venir, comme le cite le hadith des dix signes.',
          'رأى ابن مسعود أن الآية في قحط أصاب قريشًا حتى رأى الجائع بينه وبين السماء كهيئة الدخان (البخاري 4821)، ورأى ابن عباس وغيره أنه دخان لم يأت بعد، كما في حديث الآيات العشر.',
          'Ibn Mas‘ud sostuvo que el versículo describe una hambruna en La Meca, cuando los hambrientos veían como un humo entre ellos y el cielo (Bujari 4821). Ibn ‘Abbas y otros sostuvieron que es un humo aún por venir, como lo cita el hadiz de los diez signos.',
        ),
      },
      {
        id: 'west',
        title: t('The sun rises from the west', 'Le soleil se lève à l’ouest', 'طلوع الشمس من مغربها', 'El sol sale por el oeste'),
        text: t(
          'When the sun rises from the west, everyone believes, but faith no longer helps a soul that did not believe before: the door of repentance closes.',
          'Quand le soleil se lève à l’ouest, tous croient, mais la foi ne sert plus à l’âme qui ne croyait pas auparavant : la porte du repentir se ferme.',
          'إذا طلعت الشمس من مغربها آمن الناس كلهم، ولا ينفع نفسًا إيمانها لم تكن آمنت من قبل، ويُغلق باب التوبة.',
          'Cuando el sol salga por el oeste, todos creerán, pero la fe ya no servirá al alma que no creyó antes: se cierra la puerta del arrepentimiento.',
        ),
        l: 'quran',
        r: ['6:158'],
        quotes: [
          q(
            'west',
            'لاَ تَقُومُ السَّاعَةُ حَتَّى تَطْلُعَ الشَّمْسُ مِنْ مَغْرِبِهَا، فَإِذَا رَآهَا النَّاسُ آمَنَ مَنْ عَلَيْهَا، فَذَاكَ حِينَ لاَ يَنْفَعُ نَفْسًا إِيمَانُهَا، لَمْ تَكُنْ آمَنَتْ مِنْ قَبْلُ',
            t(
              'The Hour will not come until the sun rises from the west. When people see it, all on earth will believe; and that is when faith will not benefit a soul that had not believed before.',
              'L’Heure ne viendra pas avant que le soleil se lève à l’ouest. Quand les gens le verront, tous sur terre croiront ; et c’est alors que la foi ne profitera pas à une âme qui n’avait pas cru auparavant.',
              'رواه أبو هريرة، وهو في تفسير الآية 6:158.',
              'La Hora no llegará hasta que el sol salga por el oeste. Cuando la gente lo vea, todos en la tierra creerán; y entonces la fe no servirá a un alma que no había creído antes.',
            ),
            ['bukhari:4635'],
          ),
          q('repent', 'مَنْ تَابَ قَبْلَ أَنْ تَطْلُعَ الشَّمْسُ مِنْ مَغْرِبِهَا تَابَ اللَّهُ عَلَيْهِ', t('Whoever repents before the sun rises from the west, Allah accepts his repentance.', 'Quiconque se repent avant que le soleil se lève à l’ouest, Allah accepte son repentir.', 'باب التوبة مفتوح إلى ذلك اليوم.', 'Quien se arrepienta antes de que el sol salga por el oeste, Allah acepta su arrepentimiento.'), ['muslim:2703']),
        ],
      },
      {
        id: 'beast',
        title: t('The beast', 'La bête', 'الدابة', 'La bestia'),
        text: t(
          'A beast comes out of the earth and speaks to people. It and the sun rising from the west come close together, one soon after the other.',
          'Une bête sort de la terre et parle aux gens. Elle et le soleil levant à l’ouest viennent rapprochés, l’un peu après l’autre.',
          'دابة تخرج من الأرض تكلّم الناس، وتكون هي وطلوع الشمس من مغربها متقاربتين، إحداهما على إثر الأخرى.',
          'Una bestia sale de la tierra y habla a la gente. Ella y el sol que sale por el oeste llegan juntos, uno poco después del otro.',
        ),
        l: 'quran',
        r: ['27:82'],
        quotes: [
          q(
            'first',
            'إِنَّ أَوَّلَ الآيَاتِ خُرُوجًا طُلُوعُ الشَّمْسِ مِنْ مَغْرِبِهَا وَخُرُوجُ الدَّابَّةِ عَلَى النَّاسِ ضُحًى وَأَيُّهُمَا مَا كَانَتْ قَبْلَ صَاحِبَتِهَا فَالأُخْرَى عَلَى إِثْرِهَا قَرِيبًا',
            t(
              'The first of the signs to appear are the rising of the sun from its setting place and the coming out of the beast before the people in the forenoon. Whichever comes before the other, the other follows soon after.',
              'Les premiers signes à paraître sont le lever du soleil à son couchant et la sortie de la bête devant les gens en matinée. Quel que soit celui qui précède, l’autre suit de près.',
              'رواه عبد الله بن عمرو.',
              'Los primeros signos en aparecer son la salida del sol por su ocaso y la salida de la bestia ante la gente por la mañana. Sea cual sea el primero, el otro le sigue de cerca.',
            ),
            ['muslim:2941'],
          ),
        ],
      },
      {
        id: 'last-fire',
        title: t('Three collapses, then the fire', 'Trois effondrements, puis le feu', 'الخسوف الثلاثة ثم النار', 'Tres hundimientos, luego el fuego'),
        text: t(
          'Three collapses of the earth, in the east, the west and the Arabian Peninsula, and last of all a fire from Yemen that drives people to the land of their gathering.',
          'Trois effondrements de la terre, à l’est, à l’ouest et dans la péninsule Arabique, et en dernier un feu venu du Yémen qui pousse les gens vers la terre de leur rassemblement.',
          'ثلاثة خسوف: بالمشرق، وبالمغرب، وبجزيرة العرب، وآخر ذلك نار تخرج من اليمن تطرد الناس إلى محشرهم.',
          'Tres hundimientos de la tierra, en el este, el oeste y la península arábiga, y por último un fuego del Yemen que empuja a la gente a la tierra de su reunión.',
        ),
        l: 'hadith',
        r: ['muslim:2901'],
      },
    ],
  },
  {
    id: 'end',
    title: t('The end of the world, and what follows', 'La fin du monde, et ce qui suit', 'نهاية العالم وما بعدها', 'El fin del mundo, y lo que sigue'),
    lead: t(
      'How the world ends, and how creation is brought back: “As We began the first creation, We will repeat it” (21:104).',
      'Comment le monde finit, et comment la création est ramenée : « Comme Nous avons commencé la première création, Nous la répéterons » (21:104).',
      'كيف ينتهي العالم، وكيف يُعاد الخلق كما بدأه الله أول مرة (21:104).',
      'Cómo termina el mundo, y cómo vuelve la creación: «Como comenzamos la primera creación, la repetiremos» (21:104).',
    ),
    steps: [
      {
        id: 'wind',
        title: t('A gentle wind takes the believers', 'Un vent doux emporte les croyants', 'ريح طيبة تقبض المؤمنين', 'Un viento suave se lleva a los creyentes'),
        text: t(
          'After Gog and Magog, a gentle wind takes the soul of every believer. Only the worst people remain, and no one on earth says “Allah, Allah” any more. On them the Hour comes.',
          'Après Gog et Magog, un vent doux emporte l’âme de chaque croyant. Ne restent que les pires des gens, et plus personne sur terre ne dit « Allah, Allah ». C’est sur eux que l’Heure arrive.',
          'بعد يأجوج ومأجوج تقبض ريح طيبة روح كل مؤمن، ويبقى شرار الناس، ولا يقال في الأرض: الله الله، فعليهم تقوم الساعة.',
          'Tras Gog y Magog, un viento suave se lleva el alma de cada creyente. Solo quedan los peores, y nadie en la tierra dice ya «Allah, Allah». Sobre ellos llega la Hora.',
        ),
        l: 'hadith',
        r: ['muslim:2949'],
        quotes: [
          q(
            'wind',
            'إِذْ بَعَثَ اللَّهُ رِيحًا طَيِّبَةً فَتَأْخُذُهُمْ تَحْتَ آبَاطِهِمْ فَتَقْبِضُ رُوحَ كُلِّ مُؤْمِنٍ وَكُلِّ مُسْلِمٍ وَيَبْقَى شِرَارُ النَّاسِ يَتَهَارَجُونَ فِيهَا تَهَارُجَ الْحُمُرِ فَعَلَيْهِمْ تَقُومُ السَّاعَةُ',
            t(
              'Allah sends a pleasant wind that takes them under their armpits and takes the soul of every believer and every Muslim. The worst people remain, mating openly like donkeys, and upon them the Hour comes.',
              'Allah envoie un vent agréable qui les saisit sous les aisselles et emporte l’âme de chaque croyant et de chaque musulman. Restent les pires des gens, s’accouplant en public comme des ânes, et c’est sur eux que l’Heure arrive.',
              'من حديث النواس بن سمعان.',
              'Allah envía un viento agradable que los toma bajo las axilas y se lleva el alma de cada creyente y de cada musulmán. Quedan los peores, apareándose en público como asnos, y sobre ellos llega la Hora.',
            ),
            ['muslim:2937'],
          ),
          q('allah', 'لاَ تَقُومُ السَّاعَةُ حَتَّى لاَ يُقَالَ فِي الأَرْضِ اللَّهُ اللَّهُ', t('The Hour will not come while anyone on earth still says: Allah, Allah.', 'L’Heure ne viendra pas tant que quelqu’un sur terre dira : Allah, Allah.', 'رواه أنس بن مالك.', 'La Hora no llegará mientras alguien en la tierra diga: Allah, Allah.'), ['muslim:148']),
        ],
      },
      {
        id: 'sudden',
        title: t('Suddenly, on a Friday', 'Soudain, un vendredi', 'بغتةً يوم الجمعة', 'De repente, un viernes'),
        text: t(
          'The Hour comes suddenly, in the middle of ordinary life, and on a Friday.',
          'L’Heure vient soudainement, au milieu de la vie ordinaire, et un vendredi.',
          'تقوم الساعة بغتة والناس في شؤونهم، ولا تقوم إلا يوم الجمعة.',
          'La Hora llega de repente, en medio de la vida diaria, y en viernes.',
        ),
        l: 'quran',
        r: ['7:187', 'muslim:854'],
        quotes: [
          q(
            'sudden',
            'وَلَتَقُومَنَّ السَّاعَةُ وَقَدْ نَشَرَ الرَّجُلاَنِ ثَوْبَهُمَا بَيْنَهُمَا فَلاَ يَتَبَايَعَانِهِ وَلاَ يَطْوِيَانِهِ، وَلَتَقُومَنَّ السَّاعَةُ وَقَدِ انْصَرَفَ الرَّجُلُ بِلَبَنِ لِقْحَتِهِ فَلاَ يَطْعَمُهُ، وَلَتَقُومَنَّ السَّاعَةُ وَهْوَ يَلِيطُ حَوْضَهُ فَلاَ يَسْقِي فِيهِ، وَلَتَقُومَنَّ السَّاعَةُ وَقَدْ رَفَعَ أُكْلَتَهُ إِلَى فِيهِ فَلاَ يَطْعَمُهَا',
            t(
              'The Hour will come while two men have spread out a cloth between them, and they will neither complete the sale nor fold it; while a man carries away the milk of his camel and does not drink it; while one is plastering his water trough and does not water from it; while one has raised a morsel to his mouth and does not eat it.',
              'L’Heure viendra alors que deux hommes ont déplié une étoffe entre eux, sans conclure la vente ni la replier ; alors qu’un homme emporte le lait de sa chamelle sans le boire ; alors qu’un autre enduit son abreuvoir sans y abreuver ; alors qu’un autre a porté une bouchée à sa bouche sans la manger.',
              'رواه أبو هريرة.',
              'La Hora llegará mientras dos hombres han extendido una tela entre ellos, y no cerrarán la venta ni la doblarán; mientras un hombre se lleva la leche de su camella y no la bebe; mientras otro enluce su abrevadero y no da de beber en él; mientras otro ha llevado un bocado a la boca y no lo come.',
            ),
            ['bukhari:6506'],
          ),
        ],
      },
      {
        id: 'trumpet',
        title: t('The Trumpet', 'La Trompe', 'النفخ في الصور', 'La Trompeta'),
        text: t(
          'The Trumpet is blown and all in the heavens and the earth fall dead, except whom Allah wills. It is blown again, and they stand, looking on. Between the two blasts: forty. Abu Hurayra refused to say forty of what.',
          'On souffle dans la Trompe et tous dans les cieux et sur la terre tombent foudroyés, sauf qui Allah veut. On y souffle de nouveau, et les voilà debout, regardant. Entre les deux souffles : quarante. Abu Hurayra refusa de dire quarante de quoi.',
          'يُنفخ في الصور فيصعق من في السماوات والأرض إلا من شاء الله، ثم يُنفخ فيه أخرى فإذا هم قيام ينظرون. وبين النفختين أربعون، وأبى أبو هريرة أن يحددها.',
          'Se sopla la Trompeta y todos en los cielos y la tierra caen fulminados, salvo quien Allah quiera. Se sopla de nuevo, y se ponen de pie, mirando. Entre los dos soplos: cuarenta. Abu Hurayra se negó a decir cuarenta de qué.',
        ),
        l: 'quran',
        r: ['39:68', '36:49-53'],
        quotes: [
          q(
            'forty',
            'مَا بَيْنَ النَّفْخَتَيْنِ أَرْبَعُونَ. قَالَ: أَرْبَعُونَ يَوْمًا؟ قَالَ: أَبَيْتُ',
            t('“Between the two blasts are forty.” He was asked: Forty days? He said: I refuse (to say).', '« Entre les deux souffles, quarante. » On lui demanda : Quarante jours ? Il dit : Je refuse (de le dire).', 'أبى أبو هريرة أن يزيد على ما سمع.', '«Entre los dos soplos hay cuarenta». Le preguntaron: ¿Cuarenta días? Dijo: Me niego (a decirlo).'),
            ['bukhari:4935'],
          ),
        ],
      },
      {
        id: 'undone',
        title: t('The world undone', 'Le monde défait', 'انفطار الكون', 'El mundo deshecho'),
        text: t(
          'The sun is wrapped up, the stars fall, the mountains are blown away like dust, the seas are set ablaze, the sky splits open, and the earth is replaced by another earth. Allah grips the earth and folds the heavens in His right hand.',
          'Le soleil est enroulé, les étoiles tombent, les montagnes sont dispersées comme poussière, les mers sont embrasées, le ciel se fend, et la terre est remplacée par une autre terre. Allah saisit la terre et plie les cieux de Sa main droite.',
          'تُكوَّر الشمس، وتنكدر النجوم، وتُنسف الجبال، وتُسجَّر البحار، وتنفطر السماء، وتُبدَّل الأرض غير الأرض، ويقبض الله الأرض ويطوي السماوات بيمينه.',
          'El sol se enrolla, caen las estrellas, las montañas se dispersan como polvo, los mares arden, el cielo se abre, y la tierra se cambia por otra tierra. Allah toma la tierra y pliega los cielos con Su mano derecha.',
        ),
        l: 'quran',
        r: ['81:1-14', '82:1-5', '20:105-107', '14:48', '39:67'],
        quotes: [
          q(
            'grip',
            'يَقْبِضُ اللَّهُ الأَرْضَ، وَيَطْوِي السَّمَوَاتِ بِيَمِينِهِ، ثُمَّ يَقُولُ أَنَا الْمَلِكُ، أَيْنَ مُلُوكُ الأَرْضِ',
            t('Allah will grip the earth and fold the heavens in His right hand, then say: I am the King; where are the kings of the earth?', 'Allah saisira la terre et pliera les cieux de Sa main droite, puis dira : Je suis le Roi ; où sont les rois de la terre ?', 'رواه أبو هريرة، وهو في تفسير الآية 39:67.', 'Allah tomará la tierra y plegará los cielos con Su mano derecha, y dirá: Yo soy el Rey; ¿dónde están los reyes de la tierra?'),
            ['bukhari:4812'],
          ),
        ],
      },
      {
        id: 'rise',
        title: t('Brought back from one small bone', 'Ramené d’un petit os', 'البعث من عجب الذنب', 'Devuelto desde un pequeño hueso'),
        text: t(
          'Everything of the human body decays except the tailbone, from which creation is rebuilt. Allah sends down rain and people grow back like plants. “He who produced them the first time will give them life.”',
          'Tout le corps humain se décompose sauf le coccyx, à partir duquel la création est reconstruite. Allah fait descendre une pluie et les gens repoussent comme des plantes. « Celui qui les a créés une première fois leur redonnera vie. »',
          'يبلى كل شيء من الإنسان إلا عجب الذنب، ومنه يُركّب الخلق. ينزل الله ماء فينبتون كما ينبت البقل، ويحييها الذي أنشأها أول مرة (36:79).',
          'Todo el cuerpo humano se descompone salvo el coxis, desde el que se reconstruye la creación. Allah hace descender lluvia y la gente vuelve a crecer como las plantas. «Quien los creó la primera vez les dará vida».',
        ),
        l: 'hadith',
        r: ['36:78-79', '30:27'],
        quotes: [
          q(
            'tailbone',
            'ثُمَّ يُنْزِلُ اللَّهُ مِنَ السَّمَاءِ مَاءً فَيَنْبُتُونَ كَمَا يَنْبُتُ الْبَقْلُ. لَيْسَ مِنَ الإِنْسَانِ شَىْءٌ إِلاَّ يَبْلَى إِلاَّ عَظْمًا وَاحِدًا وَهْوَ عَجْبُ الذَّنَبِ، وَمِنْهُ يُرَكَّبُ الْخَلْقُ يَوْمَ الْقِيَامَةِ',
            t(
              'Then Allah sends down water from the sky and they grow as vegetables grow. Nothing of the human being remains without decaying except one bone, the tailbone, and from it creation is reassembled on the Day of Resurrection.',
              'Puis Allah fait descendre du ciel une eau et ils poussent comme pousse la verdure. Rien de l’être humain ne subsiste sans se décomposer, sauf un os, le coccyx, et c’est à partir de lui que la création est recomposée au Jour de la Résurrection.',
              'تكملة حديث ما بين النفختين.',
              'Luego Allah hace descender agua del cielo y brotan como brota la verdura. Nada del ser humano queda sin descomponerse salvo un hueso, el coxis, y desde él se recompone la creación el Día de la Resurrección.',
            ),
            ['bukhari:4935'],
          ),
        ],
      },
      {
        id: 'gathered',
        title: t('Gathered as at first', 'Rassemblés comme au premier jour', 'الحشر كما بدأ الخلق', 'Reunidos como al principio'),
        text: t(
          'People are gathered barefoot, naked and uncircumcised, as they were first created, and presented to their Lord in rows. The sun comes close; seven are shaded by Allah on a day with no shade but His.',
          'Les gens sont rassemblés pieds nus, nus et incirconcis, tels qu’ils furent créés la première fois, et présentés à leur Seigneur en rangs. Le soleil s’approche ; sept seront ombragés par Allah un jour où il n’y a d’ombre que la Sienne.',
          'يُحشر الناس حفاة عراة غرلًا كما خُلقوا أول مرة، ويُعرضون على ربهم صفًّا، وتدنو الشمس، ويظل الله سبعة في ظله يوم لا ظل إلا ظله.',
          'La gente es reunida descalza, desnuda e incircuncisa, como fue creada la primera vez, y presentada a su Señor en filas. El sol se acerca; siete serán cobijados por Allah en un día sin más sombra que la Suya.',
        ),
        l: 'hadith',
        r: ['21:104', '18:48'],
        quotes: [
          q('barefoot', 'تُحْشَرُونَ حُفَاةً عُرَاةً غُرْلاً', t('You will be gathered barefoot, naked and uncircumcised.', 'Vous serez rassemblés pieds nus, nus et incirconcis.', 'قالت عائشة: الرجال والنساء ينظر بعضهم إلى بعض؟ فقال: «الأمر أشد من أن يهمهم ذاك».', 'Seréis reunidos descalzos, desnudos e incircuncisos.'), ['bukhari:6527']),
          q('sun-near', 'تُدْنَى الشَّمْسُ يَوْمَ الْقِيَامَةِ مِنَ الْخَلْقِ حَتَّى تَكُونَ مِنْهُمْ كَمِقْدَارِ مِيلٍ', t('On the Day of Resurrection the sun will be brought near the creatures, until it is about a mile from them.', 'Au Jour de la Résurrection le soleil sera rapproché des créatures, jusqu’à être à environ un mille d’elles.', 'رواه المقداد بن الأسود.', 'El Día de la Resurrección el sol se acercará a las criaturas, hasta estar a cerca de una milla de ellas.'), ['muslim:2864']),
          q('shade', 'سَبْعَةٌ يُظِلُّهُمُ اللَّهُ فِي ظِلِّهِ يَوْمَ لاَ ظِلَّ إِلاَّ ظِلُّهُ', t('Seven will be shaded by Allah in His shade on the day when there is no shade but His.', 'Sept seront ombragés par Allah en Son ombre le jour où il n’y aura d’ombre que la Sienne.', 'منهم: إمام عادل، وشاب نشأ في عبادة الله، ورجل قلبه معلق بالمساجد.', 'Siete serán cobijados por Allah en Su sombra el día en que no haya más sombra que la Suya.'), ['bukhari:660']),
        ],
      },
      {
        id: 'intercession',
        title: t('The great intercession', 'La grande intercession', 'الشفاعة العظمى', 'La gran intercesión'),
        text: t(
          'In the distress of that day people go to Adam, then Nuh, Ibrahim, Musa and ‘Isa, asking them to intercede. Each excuses himself, until they come to Muhammad ﷺ, who prostrates and is allowed to intercede: the praised station.',
          'Dans la détresse de ce jour, les gens vont à Adam, puis Nuh, Ibrahim, Musa et ‘Isa, leur demandant d’intercéder. Chacun s’excuse, jusqu’à Muhammad ﷺ, qui se prosterne et reçoit la permission d’intercéder : la station louée.',
          'يأتي الناس في كرب ذلك اليوم آدم ثم نوحًا وإبراهيم وموسى وعيسى يطلبون الشفاعة، فيعتذر كل منهم، حتى يأتوا محمدًا ﷺ فيسجد ويُؤذن له في الشفاعة: المقام المحمود.',
          'En la angustia de ese día la gente acude a Adán, luego a Nuh, Ibrahim, Musa e ‘Isa, pidiéndoles que intercedan. Cada uno se excusa, hasta llegar a Muhammad ﷺ, que se postra y recibe permiso para interceder: la estación alabada.',
        ),
        l: 'hadith',
        r: ['17:79'],
        quotes: [
          q('master', 'أَنَا سَيِّدُ النَّاسِ يَوْمَ الْقِيَامَةِ', t('I will be the master of the people on the Day of Resurrection.', 'Je serai le maître des gens au Jour de la Résurrection.', 'أول حديث الشفاعة الطويل.', 'Seré el señor de la gente el Día de la Resurrección.'), ['bukhari:4712']),
        ],
      },
      {
        id: 'scales',
        title: t('The record, the scales, the bridge, the pool', 'Le registre, la balance, le pont, le bassin', 'الكتاب والميزان والصراط والحوض', 'El registro, la balanza, el puente, el estanque'),
        text: t(
          'Each person receives the record of his deeds, deeds are weighed on just scales, the bridge is laid over Hell, and the Prophet ﷺ waits at his pool for his community.',
          'Chacun reçoit le registre de ses actes, les actes sont pesés sur des balances justes, le pont est tendu au-dessus de l’Enfer, et le Prophète ﷺ attend sa communauté à son bassin.',
          'يُعطى كل إنسان كتاب عمله، وتوزن الأعمال بموازين القسط، ويُضرب الصراط على متن جهنم، وينتظر النبي ﷺ أمته على حوضه.',
          'Cada persona recibe el registro de sus actos, los actos se pesan en balanzas justas, el puente se tiende sobre el Infierno, y el Profeta ﷺ espera a su comunidad en su estanque.',
        ),
        l: 'quran',
        r: ['17:13-14', '21:47', '101:6-9', '69:19-26', 'bukhari:806'],
        quotes: [
          q(
            'pool',
            'حَوْضِي مَسِيرَةُ شَهْرٍ، مَاؤُهُ أَبْيَضُ مِنَ اللَّبَنِ، وَرِيحُهُ أَطْيَبُ مِنَ الْمِسْكِ، وَكِيزَانُهُ كَنُجُومِ السَّمَاءِ، مَنْ شَرِبَ مِنْهَا فَلاَ يَظْمَأُ أَبَدًا',
            t(
              'My pool is a month’s journey across. Its water is whiter than milk, its scent sweeter than musk, its cups as many as the stars of the sky. Whoever drinks from it will never thirst again.',
              'Mon bassin s’étend sur un mois de marche. Son eau est plus blanche que le lait, son parfum meilleur que le musc, ses coupes nombreuses comme les étoiles du ciel. Qui en boit n’aura plus jamais soif.',
              'رواه عبد الله بن عمرو.',
              'Mi estanque mide un mes de camino. Su agua es más blanca que la leche, su aroma mejor que el almizcle, sus copas como las estrellas del cielo. Quien beba de él jamás volverá a tener sed.',
            ),
            ['bukhari:6579'],
          ),
        ],
      },
      {
        id: 'forever',
        title: t('Forever, with no more death', 'Pour toujours, sans plus de mort', 'خلود فلا موت', 'Para siempre, sin más muerte'),
        text: t(
          'The people of Paradise and of the Fire reach their homes. Death is brought in the form of a ram and slaughtered between them, and it is called out: eternity, with no more death. So the story the Prophet ﷺ told from the beginning of creation ends.',
          'Les gens du Paradis et du Feu rejoignent leurs demeures. La mort est amenée sous la forme d’un bélier et égorgée entre eux, et il est proclamé : l’éternité, sans plus de mort. Ainsi s’achève le récit que le Prophète ﷺ fit depuis le commencement de la création.',
          'يصير أهل الجنة وأهل النار إلى منازلهم، ويُؤتى بالموت كهيئة كبش فيُذبح، ويُنادى: خلود فلا موت. وبهذا يتم ما حدّث به النبي ﷺ من بدء الخلق.',
          'La gente del Paraíso y del Fuego llega a sus moradas. La muerte es traída en forma de carnero y degollada entre ellos, y se proclama: eternidad, sin más muerte. Así termina el relato que el Profeta ﷺ contó desde el comienzo de la creación.',
        ),
        l: 'hadith',
        r: ['19:39', '39:73-74'],
        quotes: [
          q('death2', 'يَا أَهْلَ الْجَنَّةِ، خُلُودٌ فَلاَ مَوْتَ', t('O people of Paradise: eternity, and no death.', 'Ô gens du Paradis : éternité, et plus de mort.', 'ثم يقال لأهل النار مثل ذلك، وتلا الآية 19:39.', 'Oh gente del Paraíso: eternidad, y no hay muerte.'), ['bukhari:4730']),
        ],
      },
    ],
  },
]

/** The answer to “When is the Hour?”: what matters is what one prepares. */
export const HOUR_CLOSE = q(
  'prepare',
  'مَتَى السَّاعَةُ؟ قَالَ: «وَمَاذَا أَعْدَدْتَ لَهَا؟». قَالَ: لاَ شَىْءَ إِلاَّ أَنِّي أُحِبُّ اللَّهَ وَرَسُولَهُ صلى الله عليه وسلم. فَقَالَ: «أَنْتَ مَعَ مَنْ أَحْبَبْتَ»',
  t(
    'A man asked: When is the Hour? He said: “What have you prepared for it?” The man said: Nothing, except that I love Allah and His Messenger ﷺ. He said: “You will be with those you love.”',
    'Un homme demanda : Quand est l’Heure ? Il répondit : « Qu’as-tu préparé pour elle ? » L’homme dit : Rien, sinon que j’aime Allah et Son Messager ﷺ. Il dit : « Tu seras avec ceux que tu aimes. »',
    'قال أنس: فما فرحنا بشيء فرحنا بقول النبي ﷺ: «أنت مع من أحببت».',
    'Un hombre preguntó: ¿Cuándo es la Hora? Respondió: «¿Qué has preparado para ella?». El hombre dijo: Nada, salvo que amo a Allah y a Su Mensajero ﷺ. Dijo: «Estarás con quienes amas».',
  ),
  ['bukhari:3688'],
)

/** Every quote of the page, for the checker. */
export const HOUR_QUOTES: (Supplication & { where: string })[] = [
  { where: 'hour/frame', ...HOUR_FRAME },
  ...HOUR_PARTS.flatMap((p) => p.steps.flatMap((s) => (s.quotes ?? []).map((d) => ({ where: `hour/${p.id}/${s.id}/${d.id}`, ...d })))),
  { where: 'hour/close', ...HOUR_CLOSE },
]
