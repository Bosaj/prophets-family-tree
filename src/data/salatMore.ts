// The prayer, continued: fixing a prayer (sujud al-sahw), praying behind an imam, and the other prayers
// (funeral, istikharah, the Eids, Friday, travelling, the eclipse).
// Every Arabic hadith is copied from the hadith it cites and checked by `npm run verify:duas`.
import type { L4, Ref } from './types'
import type { Supplication } from './duas'
import type { SalatStep } from './salat'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })
const q = (id: string, ar: string, meaning: L4, r: Ref[], extra: Partial<Supplication> = {}): Supplication => ({ id, ar, meaning, r, l: 'hadith', ...extra })

/* ------------------------------------------------------------------ fixing the prayer */

export const SAHW_STEPS: SalatStep[] = [
  {
    id: 'sahw-what',
    title: t('Two prostrations of forgetfulness', 'Deux prosternations de l’oubli', 'سجدتا السهو', 'Dos postraciones del olvido'),
    text: t(
      'Whoever forgets something in the prayer, adds to it or is unsure makes two prostrations (sujud al-sahw), with “Allahu akbar” before each and a short sitting between them, like the prostrations of the prayer. The cases below are the ones the Prophet ﷺ himself met.',
      'Celui qui oublie quelque chose dans la prière, y ajoute ou doute fait deux prosternations (sujud as-sahw), avec « Allahu akbar » avant chacune et une courte position assise entre elles, comme celles de la prière. Les cas ci-dessous sont ceux que le Prophète ﷺ a lui-même vécus.',
      'من نسي شيئًا في صلاته أو زاد فيها أو شكّ سجد سجدتين للسهو، يكبّر لكل سجدة ويجلس بينهما كسجود الصلاة. والحالات الآتية وقعت للنبي ﷺ نفسه.',
      'Quien olvida algo en la oración, añade algo o duda hace dos postraciones (suyud as-sahw), con «Allahu akbar» antes de cada una y una breve posición sentada entre ellas, como las de la oración. Los casos de abajo son los que vivió el propio Profeta ﷺ.',
    ),
    l: 'hadith',
    r: ['bukhari:401', 'bukhari:1224', 'bukhari:1226', 'muslim:571'],
    note: t(
      'The schools differ on the place of these prostrations. The Maliki rule followed in Morocco: before the salam when something was left out, after it when something was added (then the tashahhud is said again and the salam given). If both happened, before the salam.',
      'Les écoles divergent sur la place de ces prosternations. La règle malikite suivie au Maroc : avant le salam en cas d’omission, après en cas d’ajout (on refait alors le tachahhud et le salam). Si les deux se sont produits, avant le salam.',
      'اختلفت المذاهب في موضعهما، والقاعدة عند المالكية المعمول بها في المغرب: السجود قبل السلام للنقص، وبعده للزيادة ثم يتشهد ويسلم، وإن اجتمعا فقبل السلام.',
      'Las escuelas difieren sobre el lugar de estas postraciones. La regla malikí seguida en Marruecos: antes del salam si se omitió algo, después si se añadió algo (y se repiten el tashahhud y el salam). Si ocurrieron ambas cosas, antes del salam.',
    ),
  },
  {
    id: 'sahw-missed',
    title: t('You forgot the first tashahhud', 'Vous avez oublié le premier tachahhud', 'نسيت التشهد الأول', 'Olvidaste el primer tashahhud'),
    text: t(
      'If you stood up after two rak‘ahs without sitting, do not go back once you are fully standing: complete the prayer and make the two prostrations before the salam.',
      'Si vous vous êtes levé après deux rak‘as sans vous asseoir, ne revenez pas une fois bien debout : terminez la prière et faites les deux prosternations avant le salam.',
      'إذا قمت بعد ركعتين ولم تجلس، فلا ترجع بعد أن تستوي قائمًا، بل أتمّ صلاتك واسجد سجدتين قبل السلام.',
      'Si te levantaste tras dos rak‘as sin sentarte, no vuelvas atrás una vez de pie: termina la oración y haz las dos postraciones antes del salam.',
    ),
    l: 'hadith',
    r: ['bukhari:1224'],
    quotes: [
      q(
        'forgot-tashahhud',
        'صَلَّى لَنَا رَسُولُ اللَّهِ صلى الله عليه وسلم رَكْعَتَيْنِ مِنْ بَعْضِ الصَّلَوَاتِ ثُمَّ قَامَ فَلَمْ يَجْلِسْ، فَقَامَ النَّاسُ مَعَهُ، فَلَمَّا قَضَى صَلاَتَهُ وَنَظَرْنَا تَسْلِيمَهُ كَبَّرَ قَبْلَ التَّسْلِيمِ فَسَجَدَ سَجْدَتَيْنِ وَهُوَ جَالِسٌ ثُمَّ سَلَّمَ',
        t(
          'The Messenger of Allah ﷺ led us in two rak‘ahs of one of the prayers, then stood up without sitting, and the people stood with him. When he had finished his prayer and we were waiting for his salam, he said “Allahu akbar” before the salam, made two prostrations while sitting, then gave the salam.',
          'Le Messager d’Allah ﷺ nous dirigea dans deux rak‘as de l’une des prières, puis se leva sans s’asseoir, et les gens se levèrent avec lui. Quand il eut fini et que nous attendions son salam, il dit « Allahu akbar » avant le salam, fit deux prosternations assis, puis fit le salam.',
          'رواه عبد الله ابن بحينة.',
          'El Mensajero de Allah ﷺ nos dirigió en dos rak‘as de una de las oraciones, luego se levantó sin sentarse, y la gente se levantó con él. Cuando terminó y esperábamos su salam, dijo «Allahu akbar» antes del salam, hizo dos postraciones sentado y luego dio el salam.',
        ),
        ['bukhari:1224'],
      ),
    ],
  },
  {
    id: 'sahw-added',
    title: t('You added a rak‘ah', 'Vous avez ajouté une rak‘a', 'زدت ركعة', 'Añadiste una rak‘a'),
    text: t(
      'If you prayed an extra rak‘ah or another addition by mistake, make the two prostrations after the salam, even if you learn of it only after finishing.',
      'Si vous avez prié une rak‘a de trop ou ajouté autre chose par erreur, faites les deux prosternations après le salam, même si vous ne l’apprenez qu’à la fin.',
      'إذا زدت ركعة أو غيرها سهوًا فاسجد سجدتين بعد السلام، ولو لم تعلم إلا بعد الفراغ.',
      'Si rezaste una rak‘a de más o añadiste otra cosa por error, haz las dos postraciones después del salam, aunque te enteres solo al terminar.',
    ),
    l: 'hadith',
    r: ['bukhari:1226'],
    quotes: [
      q(
        'prayed-five',
        'صَلَّى الظُّهْرَ خَمْسًا فَقِيلَ لَهُ أَزِيدَ فِي الصَّلاَةِ؟ فَقَالَ: وَمَا ذَاكَ؟ قَالَ: صَلَّيْتَ خَمْسًا، فَسَجَدَ سَجْدَتَيْنِ بَعْدَ مَا سَلَّمَ',
        t(
          'He prayed Dhuhr as five rak‘ahs. He was asked: “Has the prayer been increased?” He said: “What is that?” Someone said: “You prayed five.” So he made two prostrations after he had given the salam.',
          'Il pria le Dhuhr en cinq rak‘as. On lui demanda : « La prière a-t-elle été augmentée ? » Il dit : « De quoi s’agit-il ? » On dit : « Tu as prié cinq. » Il fit alors deux prosternations après le salam.',
          'رواه عبد الله بن مسعود.',
          'Rezó el Duhr con cinco rak‘as. Le preguntaron: «¿Se ha aumentado la oración?». Dijo: «¿Qué ocurre?». Le dijeron: «Has rezado cinco». E hizo dos postraciones después del salam.',
        ),
        ['bukhari:1226'],
      ),
    ],
  },
  {
    id: 'sahw-doubt',
    title: t('You are unsure how many you prayed', 'Vous doutez du nombre de rak‘as', 'شككت في عدد الركعات', 'Dudas de cuántas rezaste'),
    text: t(
      'If you do not know whether you prayed three or four, take the smaller number, which you are sure of, complete the prayer on it, and make the two prostrations before the salam.',
      'Si vous ne savez pas si vous avez prié trois ou quatre, retenez le plus petit nombre, dont vous êtes sûr, complétez la prière sur cette base et faites les deux prosternations avant le salam.',
      'إذا لم تدرِ أصليت ثلاثًا أم أربعًا فابنِ على الأقل وهو اليقين، وأتمّ صلاتك، واسجد سجدتين قبل السلام.',
      'Si no sabes si rezaste tres o cuatro, quédate con el número menor, del que estás seguro, completa la oración sobre él y haz las dos postraciones antes del salam.',
    ),
    l: 'hadith',
    r: ['muslim:571'],
    quotes: [
      q(
        'doubt-certainty',
        'إِذَا شَكَّ أَحَدُكُمْ فِي صَلاَتِهِ فَلَمْ يَدْرِ كَمْ صَلَّى ثَلاَثًا أَمْ أَرْبَعًا فَلْيَطْرَحِ الشَّكَّ وَلْيَبْنِ عَلَى مَا اسْتَيْقَنَ ثُمَّ يَسْجُدُ سَجْدَتَيْنِ قَبْلَ أَنْ يُسَلِّمَ',
        t(
          'If one of you is unsure in his prayer and does not know whether he prayed three or four, let him cast the doubt aside, build on what he is certain of, then make two prostrations before the salam.',
          'Si l’un de vous doute dans sa prière et ne sait pas s’il a prié trois ou quatre, qu’il écarte le doute, se fonde sur ce dont il est certain, puis fasse deux prosternations avant le salam.',
          'رواه أبو سعيد الخدري.',
          'Si uno de vosotros duda en su oración y no sabe si rezó tres o cuatro, que deje la duda, se base en lo que es seguro y luego haga dos postraciones antes del salam.',
        ),
        ['muslim:571'],
      ),
    ],
  },
]

/* ------------------------------------------------------------------ behind an imam */

export const JAMAA_STEPS: SalatStep[] = [
  {
    id: 'follow',
    title: t('Follow the imam, never go ahead of him', 'Suivre l’imam, ne jamais le devancer', 'اتّبع الإمام ولا تسبقه', 'Sigue al imam, nunca te adelantes'),
    text: t(
      'Move after the imam, not with him and not before him: bow when he has bowed, rise when he has risen, prostrate when he has prostrated. Going ahead of the imam on purpose is a grave fault; if you did so by mistake, go back to his position and follow him.',
      'Bougez après l’imam, ni avec lui ni avant lui : inclinez-vous quand il s’est incliné, redressez-vous quand il s’est redressé, prosternez-vous quand il s’est prosterné. Le devancer volontairement est une faute grave ; si vous l’avez fait par erreur, revenez à sa position et suivez-le.',
      'تحرّك بعد الإمام لا معه ولا قبله: اركع إذا ركع، وارفع إذا رفع، واسجد إذا سجد. ومسابقته عمدًا ذنب عظيم، ومن سبقه سهوًا رجع إلى حاله وتابعه.',
      'Muévete después del imam, ni con él ni antes que él: inclínate cuando él se haya inclinado, incorpórate cuando se haya incorporado, postrate cuando se haya postrado. Adelantarse a propósito es una falta grave; si lo hiciste por error, vuelve a su posición y síguelo.',
    ),
    l: 'hadith',
    r: ['bukhari:722', 'bukhari:691'],
    quotes: [
      q(
        'imam-follow',
        'إِنَّمَا جُعِلَ الإِمَامُ لِيُؤْتَمَّ بِهِ فَلاَ تَخْتَلِفُوا عَلَيْهِ، فَإِذَا رَكَعَ فَارْكَعُوا، وَإِذَا قَالَ سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، فَقُولُوا رَبَّنَا لَكَ الْحَمْدُ، وَإِذَا سَجَدَ فَاسْجُدُوا',
        t(
          'The imam is there to be followed, so do not differ from him: when he bows, bow; when he says “Allah hears whoever praises Him”, say “Our Lord, to You is the praise”; and when he prostrates, prostrate.',
          'L’imam n’est là que pour être suivi, ne vous écartez donc pas de lui : quand il s’incline, inclinez-vous ; quand il dit « Allah entend celui qui Le loue », dites « Notre Seigneur, à Toi la louange » ; et quand il se prosterne, prosternez-vous.',
          'رواه أبو هريرة.',
          'El imam está para ser seguido, así que no os apartéis de él: cuando se incline, inclinaos; cuando diga «Allah oye a quien Le alaba», decid «Señor nuestro, a Ti la alabanza»; y cuando se postre, postraos.',
        ),
        ['bukhari:722'],
      ),
      q(
        'imam-precede',
        'أَمَا يَخْشَى أَحَدُكُمْ ـ أَوْ لاَ يَخْشَى أَحَدُكُمْ ـ إِذَا رَفَعَ رَأْسَهُ قَبْلَ الإِمَامِ أَنْ يَجْعَلَ اللَّهُ رَأْسَهُ رَأْسَ حِمَارٍ أَوْ يَجْعَلَ اللَّهُ صُورَتَهُ صُورَةَ حِمَارٍ',
        t(
          'Does one of you not fear, when he raises his head before the imam, that Allah will turn his head into a donkey’s head, or his form into a donkey’s form?',
          'L’un de vous ne craint-il pas, quand il relève la tête avant l’imam, qu’Allah fasse de sa tête une tête d’âne, ou de son apparence celle d’un âne ?',
          'تحذير شديد من مسابقة الإمام.',
          '¿No teme uno de vosotros, cuando levanta la cabeza antes que el imam, que Allah convierta su cabeza en la de un asno, o su forma en la de un asno?',
        ),
        ['bukhari:691'],
      ),
    ],
  },
  {
    id: 'late',
    title: t('Joining late', 'Arriver en retard', 'إذا أدركت بعض الصلاة', 'Si llegas tarde'),
    text: t(
      'Walk to the prayer calmly, do not run. Join the imam in whatever position he is in, with the opening “Allahu akbar” said standing. What you pray with him counts; after his salam, stand up and complete what you missed. A rak‘ah counts if you reach the imam in the bowing (the majority of scholars); joining him in prostration does not count a rak‘ah, but you still join.',
      'Marchez vers la prière calmement, sans courir. Rejoignez l’imam dans la position où il est, en disant debout le « Allahu akbar » d’ouverture. Ce que vous priez avec lui compte ; après son salam, levez-vous et complétez ce que vous avez manqué. Une rak‘a compte si vous rejoignez l’imam dans l’inclinaison (avis de la majorité) ; le rejoindre en prosternation ne compte pas une rak‘a, mais on le rejoint quand même.',
      'امشِ إلى الصلاة بسكينة ولا تسرع، وادخل مع الإمام على أي حال هو، بتكبيرة الإحرام قائمًا. ما أدركته معه فهو لك، فإذا سلّم قمت فأتممت ما فاتك. وتُدرك الركعة بإدراك الركوع مع الإمام عند الجمهور، ومن أدركه ساجدًا دخل معه ولا يعتدّ بها ركعة.',
      'Camina hacia la oración con calma, sin correr. Únete al imam en la posición en que esté, diciendo de pie el «Allahu akbar» de apertura. Lo que reces con él cuenta; tras su salam, levántate y completa lo que te faltó. Una rak‘a cuenta si alcanzas al imam en la inclinación (opinión de la mayoría); alcanzarlo en la postración no cuenta como rak‘a, pero igualmente te unes.',
    ),
    l: 'hadith',
    r: ['bukhari:636', 'bukhari:783'],
    quotes: [
      q(
        'masbuq',
        'إِذَا سَمِعْتُمُ الإِقَامَةَ فَامْشُوا إِلَى الصَّلاَةِ، وَعَلَيْكُمْ بِالسَّكِينَةِ وَالْوَقَارِ وَلاَ تُسْرِعُوا، فَمَا أَدْرَكْتُمْ فَصَلُّوا وَمَا فَاتَكُمْ فَأَتِمُّوا',
        t(
          'When you hear the iqamah, walk to the prayer with calm and dignity, and do not hurry. Pray what you catch, and complete what you missed.',
          'Quand vous entendez l’iqama, marchez vers la prière avec calme et dignité, sans vous presser. Priez ce que vous rattrapez et complétez ce que vous avez manqué.',
          'رواه أبو هريرة.',
          'Cuando oigáis la iqama, caminad hacia la oración con calma y dignidad, sin apresuraros. Rezad lo que alcancéis y completad lo que os falte.',
        ),
        ['bukhari:636'],
      ),
      q(
        'abu-bakra',
        'زَادَكَ اللَّهُ حِرْصًا وَلاَ تَعُدْ',
        t(
          'Abu Bakrah reached the Prophet ﷺ while he was bowing and bowed before reaching the row. The Prophet ﷺ said: “May Allah increase your eagerness, but do not do it again.”',
          'Abou Bakra rejoignit le Prophète ﷺ alors qu’il était incliné et s’inclina avant d’atteindre le rang. Le Prophète ﷺ dit : « Qu’Allah augmente ton zèle, mais ne recommence pas. »',
          'قالها لأبي بكرة لما ركع دون الصف ليدرك الركوع.',
          'Abu Bakra alcanzó al Profeta ﷺ cuando estaba inclinado y se inclinó antes de llegar a la fila. El Profeta ﷺ dijo: «Que Allah aumente tu afán, pero no lo repitas».',
        ),
        ['bukhari:783'],
      ),
    ],
  },
]

/* ------------------------------------------------------------------ the other prayers */

export const OTHER_PRAYERS: SalatStep[] = [
  {
    id: 'janaza',
    title: t('The funeral prayer (janazah)', 'La prière funéraire (janaza)', 'صلاة الجنازة', 'La oración fúnebre (yanaza)'),
    text: t(
      'Prayed standing, with no bowing or prostration: four takbirs. After the first, al-Fatihah; after the second, the prayer on the Prophet ﷺ (the Ibrahimi prayer); after the third, supplication for the deceased; after the fourth, a short pause, then the salam. Whoever attends until the prayer has a reward like a mountain (a qirat), and two if he stays until the burial.',
      'Elle se prie debout, sans inclinaison ni prosternation : quatre takbirs. Après le premier, al-Fatiha ; après le deuxième, la prière sur le Prophète ﷺ (la prière abrahamique) ; après le troisième, l’invocation pour le défunt ; après le quatrième, une courte pause, puis le salam. Qui y assiste jusqu’à la prière a une récompense grande comme une montagne (un qirat), et deux s’il reste jusqu’à l’enterrement.',
      'تُصلّى قيامًا بلا ركوع ولا سجود: أربع تكبيرات؛ بعد الأولى الفاتحة، وبعد الثانية الصلاة على النبي ﷺ، وبعد الثالثة الدعاء للميت، وبعد الرابعة سكتة يسيرة ثم التسليم. ومن شهدها حتى يصلي فله قيراط، ومن شهدها حتى تدفن فله قيراطان.',
      'Se reza de pie, sin inclinación ni postración: cuatro takbirs. Tras el primero, al-Fátiha; tras el segundo, la oración por el Profeta ﷺ (la oración abrahámica); tras el tercero, la súplica por el difunto; tras el cuarto, una breve pausa y luego el salam. Quien asiste hasta la oración tiene una recompensa como una montaña (un qirat), y dos si se queda hasta el entierro.',
    ),
    l: 'hadith',
    r: ['bukhari:1333', 'bukhari:1335', 'muslim:963', 'bukhari:1325'],
    quotes: [
      q(
        'janaza-four',
        'نَعَى النَّجَاشِيَّ فِي الْيَوْمِ الَّذِي مَاتَ فِيهِ، وَخَرَجَ بِهِمْ إِلَى الْمُصَلَّى فَصَفَّ بِهِمْ، وَكَبَّرَ عَلَيْهِ أَرْبَعَ تَكْبِيرَاتٍ',
        t(
          'He announced the death of the Negus on the day he died, went out with them to the prayer ground, lined them up and said four takbirs over him.',
          'Il annonça la mort du Négus le jour même, sortit avec eux à l’oratoire, les aligna en rangs et prononça sur lui quatre takbirs.',
          'رواه أبو هريرة في صلاة النبي ﷺ على النجاشي.',
          'Anunció la muerte del Negus el mismo día, salió con ellos al oratorio, los puso en filas y pronunció sobre él cuatro takbirs.',
        ),
        ['bukhari:1333'],
      ),
      q(
        'janaza-fatiha',
        'فَقَرَأَ بِفَاتِحَةِ الْكِتَابِ قَالَ لِيَعْلَمُوا أَنَّهَا سُنَّةٌ',
        t(
          'Talhah prayed behind Ibn ‘Abbas over a funeral: he recited the Opening of the Book and said: “So that they know it is the Sunnah.”',
          'Talha pria derrière Ibn ‘Abbas sur un mort : il récita l’Ouverture du Livre et dit : « Pour qu’ils sachent que c’est la Sunna. »',
          'قراءة الفاتحة في صلاة الجنازة.',
          'Talha rezó tras Ibn ‘Abbas por un difunto: recitó la Apertura del Libro y dijo: «Para que sepan que es la Sunna».',
        ),
        ['bukhari:1335'],
      ),
      q(
        'janaza-dua',
        'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الأَبْيَضَ مِنَ الدَّنَسِ وَأَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ وَأَهْلاً خَيْرًا مِنْ أَهْلِهِ وَزَوْجًا خَيْرًا مِنْ زَوْجِهِ وَأَدْخِلْهُ الْجَنَّةَ وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ أَوْ مِنْ عَذَابِ النَّارِ',
        t(
          'O Allah, forgive him and have mercy on him, keep him safe and pardon him, honour his arrival and widen his entry, wash him with water, snow and hail, cleanse him of sins as a white garment is cleansed of dirt, give him a home better than his home, a family better than his family and a spouse better than his spouse, admit him to Paradise and protect him from the punishment of the grave, or from the punishment of the Fire.',
          'Ô Allah, pardonne-lui et fais-lui miséricorde, préserve-le et efface ses fautes, honore son accueil et élargis son entrée, lave-le avec l’eau, la neige et la grêle, purifie-le des péchés comme on purifie le vêtement blanc de la saleté, donne-lui une demeure meilleure que sa demeure, une famille meilleure que sa famille et un conjoint meilleur que son conjoint, fais-le entrer au Paradis et protège-le du châtiment de la tombe, ou du châtiment du Feu.',
          'حفظه عوف بن مالك من دعاء النبي ﷺ على جنازة، وقال: حتى تمنيت أن أكون ذلك الميت.',
          'Oh Allah, perdónalo y ten misericordia de él, presérvalo y bórrale sus faltas, honra su llegada y ensancha su entrada, lávalo con agua, nieve y granizo, límpialo de los pecados como se limpia de la suciedad la ropa blanca, dale una morada mejor que su morada, una familia mejor que su familia y un cónyuge mejor que su cónyuge, hazlo entrar en el Paraíso y protégelo del castigo de la tumba, o del castigo del Fuego.',
        ),
        ['muslim:963'],
      ),
      q(
        'janaza-qirat',
        'مَنْ شَهِدَ الْجَنَازَةَ حَتَّى يُصَلِّيَ عَلَيْهَا فَلَهُ قِيرَاطٌ، وَمَنْ شَهِدَ حَتَّى تُدْفَنَ كَانَ لَهُ قِيرَاطَانِ',
        t(
          'Whoever attends a funeral until the prayer over it has a qirat, and whoever attends until the burial has two qirats. (He was asked what the two qirats are and said: like two great mountains.)',
          'Qui assiste aux funérailles jusqu’à la prière a un qirat, et qui y assiste jusqu’à l’enterrement a deux qirats. (On lui demanda ce que sont les deux qirats ; il dit : comme deux grandes montagnes.)',
          'فضل شهود الجنازة.',
          'Quien asiste al funeral hasta la oración tiene un qirat, y quien asiste hasta el entierro tiene dos. (Le preguntaron qué son los dos qirats y dijo: como dos grandes montañas.)',
        ),
        ['bukhari:1325'],
      ),
    ],
    note: t(
      'In the Maliki school al-Fatihah is not recited in the funeral prayer: one praises Allah and sends blessings on the Prophet ﷺ, then supplicates after each takbir, and gives a single salam. The other schools recite al-Fatihah after the first takbir, as Ibn ‘Abbas did.',
      'Dans l’école malikite, on ne récite pas al-Fatiha dans la prière funéraire : on loue Allah, prie sur le Prophète ﷺ puis invoque après chaque takbir, et on fait un seul salam. Les autres écoles récitent al-Fatiha après le premier takbir, comme Ibn ‘Abbas.',
      'لا يقرأ المالكية الفاتحة في صلاة الجنازة، بل يحمد ويصلي على النبي ﷺ ويدعو بعد كل تكبيرة، ويسلّم تسليمة واحدة. وتقرأها المذاهب الأخرى بعد التكبيرة الأولى كما فعل ابن عباس.',
      'En la escuela malikí no se recita al-Fátiha en la oración fúnebre: se alaba a Allah, se pide por el Profeta ﷺ y se suplica tras cada takbir, y se da un solo salam. Las demás escuelas recitan al-Fátiha tras el primer takbir, como hizo Ibn ‘Abbas.',
    ),
  },
  {
    id: 'istikhara',
    title: t('The prayer of seeking guidance (istikharah)', 'La prière de consultation (istikhara)', 'صلاة الاستخارة', 'La oración de consulta (istijara)'),
    text: t(
      'Before a decision, pray two voluntary rak‘ahs, then say this supplication, naming the matter where it says “this matter”. Then go ahead with what seems best; the answer is what Allah makes easy, not necessarily a dream.',
      'Avant une décision, priez deux rak‘as surérogatoires, puis dites cette invocation en nommant l’affaire là où il est dit « cette affaire ». Puis faites ce qui vous semble le mieux ; la réponse est ce qu’Allah facilite, pas forcément un rêve.',
      'إذا هممت بأمر فصلِّ ركعتين من غير الفريضة، ثم ادعُ بهذا الدعاء وسمِّ حاجتك مكان «هذا الأمر»، ثم امضِ فيما ينشرح له صدرك، والجواب ما ييسّره الله لا رؤيا بالضرورة.',
      'Antes de una decisión, reza dos rak‘as voluntarias y luego di esta súplica, nombrando el asunto donde dice «este asunto». Después actúa como te parezca mejor; la respuesta es lo que Allah facilita, no necesariamente un sueño.',
    ),
    l: 'hadith',
    r: ['bukhari:6382'],
    quotes: [
      q(
        'istikhara',
        'إِذَا هَمَّ بِالأَمْرِ فَلْيَرْكَعْ رَكْعَتَيْنِ، ثُمَّ يَقُولُ: اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلاَ أَقْدِرُ، وَتَعْلَمُ وَلاَ أَعْلَمُ، وَأَنْتَ عَلاَّمُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي ـ أَوْ قَالَ عَاجِلِ أَمْرِي وَآجِلِهِ ـ فَاقْدُرْهُ لِي، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي ـ أَوْ قَالَ فِي عَاجِلِ أَمْرِي وَآجِلِهِ ـ فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ، ثُمَّ رَضِّنِي بِهِ. وَيُسَمِّي حَاجَتَهُ',
        t(
          'When one of you is concerned about a matter, let him pray two rak‘ahs and then say: O Allah, I seek Your choice by Your knowledge and Your power by Your power, and I ask You from Your great bounty, for You are able and I am not, You know and I do not, and You are the Knower of the unseen. O Allah, if You know that this matter is good for me in my religion, my livelihood and the outcome of my affairs (or he said: in my affairs now and later), then decree it for me; and if You know that this matter is bad for me in my religion, my livelihood and the outcome of my affairs (or: now and later), then turn it away from me and turn me away from it, and decree good for me wherever it is, then make me content with it. And he names what he needs.',
          'Quand l’un de vous projette une affaire, qu’il prie deux rak‘as puis dise : Ô Allah, je Te demande de choisir pour moi par Ta science et de m’en donner la capacité par Ta puissance, et je Te demande de Ta grâce immense, car Tu peux et je ne peux pas, Tu sais et je ne sais pas, et Tu es le Connaisseur de l’invisible. Ô Allah, si Tu sais que cette affaire est un bien pour moi dans ma religion, ma vie et l’issue de mes affaires (ou : dans mes affaires présentes et futures), décrète-la pour moi ; et si Tu sais que cette affaire est un mal pour moi dans ma religion, ma vie et l’issue de mes affaires (ou : présentes et futures), écarte-la de moi et écarte-moi d’elle, décrète pour moi le bien où qu’il soit, puis rends-moi satisfait de lui. Et il nomme son besoin.',
          'دعاء الاستخارة كما علّمه النبي ﷺ أصحابه، رواه جابر.',
          'Cuando uno de vosotros tenga un asunto en mente, que rece dos rak‘as y luego diga: Oh Allah, Te pido que elijas por mí con Tu conocimiento y que me des capacidad con Tu poder, y Te pido de Tu inmenso favor, pues Tú puedes y yo no, Tú sabes y yo no, y Tú conoces lo oculto. Oh Allah, si sabes que este asunto es bueno para mí en mi religión, mi vida y el desenlace de mis asuntos (o dijo: ahora y después), decrétalo para mí; y si sabes que este asunto es malo para mí en mi religión, mi vida y el desenlace de mis asuntos (o: ahora y después), apártalo de mí y apártame de él, decreta para mí el bien dondequiera que esté y luego hazme estar satisfecho con él. Y nombra lo que necesita.',
        ),
        ['bukhari:6382'],
      ),
    ],
  },
  {
    id: 'eid',
    title: t('The two Eid prayers', 'Les prières des deux Aïds', 'صلاة العيدين', 'Las oraciones de los dos Eid'),
    text: t(
      'Two rak‘ahs in the morning of Eid, with no adhan or iqamah, followed by the sermon. Extra takbirs are said before the recitation: seven in the first rak‘ah and five in the second. On Eid al-Fitr, eat a few dates before going out; on Eid al-Adha, eat after the prayer, from the sacrifice.',
      'Deux rak‘as le matin de l’Aïd, sans adhan ni iqama, suivies du sermon. Des takbirs supplémentaires sont dits avant la récitation : sept à la première rak‘a et cinq à la seconde. À l’Aïd al-Fitr, manger quelques dattes avant de sortir ; à l’Aïd al-Adha, manger après la prière, du sacrifice.',
      'ركعتان صباح العيد بلا أذان ولا إقامة ثم الخطبة، ويكبّر قبل القراءة سبعًا في الأولى وخمسًا في الثانية. ويأكل في الفطر تمرات قبل الخروج، وفي الأضحى بعد الصلاة من أضحيته.',
      'Dos rak‘as la mañana del Eid, sin adán ni iqama, seguidas del sermón. Se dicen takbirs adicionales antes de la recitación: siete en la primera rak‘a y cinco en la segunda. En el Eid al-Fitr, comer unos dátiles antes de salir; en el Eid al-Adha, comer después de la oración, del sacrificio.',
    ),
    l: 'hadith',
    r: ['bukhari:957', 'abudawud:1151', 'bukhari:953'],
    quotes: [
      q(
        'eid-before',
        'كَانَ يُصَلِّي فِي الأَضْحَى وَالْفِطْرِ، ثُمَّ يَخْطُبُ بَعْدَ الصَّلاَةِ',
        t('He used to pray on al-Adha and al-Fitr, then give the sermon after the prayer.', 'Il priait à l’Aïd al-Adha et al-Fitr, puis faisait le sermon après la prière.', 'الصلاة قبل الخطبة في العيدين.', 'Rezaba en al-Adha y al-Fitr y luego daba el sermón después de la oración.'),
        ['bukhari:957'],
      ),
      q(
        'eid-takbir',
        'التَّكْبِيرُ فِي الْفِطْرِ سَبْعٌ فِي الأُولَى وَخَمْسٌ فِي الآخِرَةِ وَالْقِرَاءَةُ بَعْدَهُمَا كِلْتَيْهِمَا',
        t(
          'The takbirs on al-Fitr are seven in the first rak‘ah and five in the last, and the recitation comes after them in both.',
          'Les takbirs de l’Aïd al-Fitr sont sept à la première rak‘a et cinq à la dernière, et la récitation vient après eux dans les deux.',
          'عدد تكبيرات صلاة العيد.',
          'Los takbirs del Fitr son siete en la primera rak‘a y cinco en la última, y la recitación va después de ellos en ambas.',
        ),
        ['abudawud:1151'],
        { grade: t('Hasan (al-Albani)', 'Hasan (al-Albani)', 'حسن (الألباني)', 'Hasan (al-Albani)') },
      ),
      q(
        'eid-dates',
        'لاَ يَغْدُو يَوْمَ الْفِطْرِ حَتَّى يَأْكُلَ تَمَرَاتٍ',
        t('He did not go out on the day of al-Fitr until he had eaten some dates.', 'Il ne sortait pas le jour de l’Aïd al-Fitr avant d’avoir mangé quelques dattes.', 'رواه أنس بن مالك.', 'No salía el día del Fitr hasta haber comido unos dátiles.'),
        ['bukhari:953'],
      ),
    ],
    note: t(
      'In the Maliki school the first rak‘ah has six takbirs after the opening one (seven in all) and the second has five after the takbir of standing up.',
      'Dans l’école malikite, la première rak‘a a six takbirs après celui d’ouverture (sept en tout) et la seconde cinq après le takbir du redressement.',
      'عند المالكية في الأولى ست تكبيرات بعد تكبيرة الإحرام (فهي سبع)، وفي الثانية خمس بعد تكبيرة القيام.',
      'En la escuela malikí la primera rak‘a tiene seis takbirs tras el de apertura (siete en total) y la segunda cinco tras el takbir de levantarse.',
    ),
  },
  {
    id: 'jumua',
    title: t('Friday (Jumu‘ah)', 'Le vendredi (Joumou‘a)', 'صلاة الجمعة', 'El viernes (Yumu‘a)'),
    text: t(
      'At the time of Dhuhr, two sermons then two rak‘ahs recited aloud, in place of Dhuhr. It is an obligation for resident adult men; women and travellers may attend, and then it replaces their Dhuhr. Take a bath, wear clean clothes and come early; listen in silence while the imam speaks.',
      'À l’heure du Dhuhr, deux sermons puis deux rak‘as récitées à voix haute, à la place du Dhuhr. C’est une obligation pour les hommes adultes résidents ; les femmes et les voyageurs peuvent y assister, et elle remplace alors leur Dhuhr. Se laver, porter des vêtements propres et venir tôt ; écouter en silence pendant que l’imam parle.',
      'في وقت الظهر: خطبتان ثم ركعتان جهريتان بدل الظهر، وهي واجبة على الرجال البالغين المقيمين، ومن حضرها من النساء والمسافرين أجزأته عن الظهر. ويُسنّ الغسل والتطيب ولبس النظيف والتبكير، والإنصات للخطبة.',
      'A la hora del Duhr, dos sermones y luego dos rak‘as recitadas en voz alta, en lugar del Duhr. Es obligatoria para los hombres adultos residentes; las mujeres y los viajeros pueden asistir, y entonces sustituye su Duhr. Lavarse, vestir ropa limpia y llegar temprano; escuchar en silencio mientras habla el imam.',
    ),
    l: 'quran',
    r: ['62:9-10', 'bukhari:877', 'bukhari:934', 'muslim:875'],
    quotes: [
      q('jumua-ghusl', 'إِذَا جَاءَ أَحَدُكُمُ الْجُمُعَةَ فَلْيَغْتَسِلْ', t('When one of you comes to the Jumu‘ah, let him take a bath.', 'Quand l’un de vous vient au Joumou‘a, qu’il se lave.', 'غسل الجمعة.', 'Cuando uno de vosotros venga al Yumu‘a, que se lave.'), ['bukhari:877']),
      q(
        'jumua-silent',
        'إِذَا قُلْتَ لِصَاحِبِكَ يَوْمَ الْجُمُعَةِ: أَنْصِتْ، وَالإِمَامُ يَخْطُبُ فَقَدْ لَغَوْتَ',
        t('If you say to your companion “Be quiet!” on Friday while the imam is giving the sermon, you have spoken idly.', 'Si tu dis à ton compagnon « Tais-toi ! » le vendredi pendant que l’imam prêche, tu as parlé en vain.', 'وجوب الإنصات للخطبة.', 'Si dices a tu compañero «¡Calla!» el viernes mientras el imam predica, has hablado en vano.'),
        ['bukhari:934'],
      ),
      q(
        'jumua-tahiyya',
        'إِذَا جَاءَ أَحَدُكُمْ يَوْمَ الْجُمُعَةِ وَالإِمَامُ يَخْطُبُ فَلْيَرْكَعْ رَكْعَتَيْنِ وَلْيَتَجَوَّزْ فِيهِمَا',
        t('When one of you comes on Friday while the imam is giving the sermon, let him pray two rak‘ahs and keep them short.', 'Quand l’un de vous vient le vendredi pendant que l’imam prêche, qu’il prie deux rak‘as et les abrège.', 'رواه جابر بن عبد الله.', 'Cuando uno de vosotros llegue el viernes mientras el imam predica, que rece dos rak‘as y las haga breves.'),
        ['muslim:875'],
      ),
    ],
    note: t(
      'The Maliki school holds that one who arrives during the sermon sits and listens without praying the two rak‘ahs; the Shafi‘i and Hanbali schools follow the hadith of Jabir above.',
      'L’école malikite estime que celui qui arrive pendant le sermon s’assoit et écoute sans prier les deux rak‘as ; les écoles chaféite et hanbalite suivent le hadith de Jabir ci-dessus.',
      'يرى المالكية أن من دخل والإمام يخطب يجلس وينصت ولا يصلي التحية، ويأخذ الشافعية والحنابلة بحديث جابر أعلاه.',
      'La escuela malikí sostiene que quien llega durante el sermón se sienta y escucha sin rezar las dos rak‘as; las escuelas shafi‘í y hanbalí siguen el hadiz de Yabir de arriba.',
    ),
  },
  {
    id: 'travel',
    title: t('The traveller’s prayer', 'La prière du voyageur', 'صلاة المسافر', 'La oración del viajero'),
    text: t(
      'On a journey, the four-rak‘ah prayers (Dhuhr, ‘Asr, ‘Isha) are shortened to two; Fajr and Maghrib stay as they are. Dhuhr can be joined with ‘Asr, and Maghrib with ‘Isha, at the time of either. The Prophet ﷺ called the shortening a charity from Allah.',
      'En voyage, les prières de quatre rak‘as (Dhuhr, ‘Asr, ‘Isha) sont raccourcies à deux ; le Fajr et le Maghrib restent tels quels. On peut joindre le Dhuhr à l’‘Asr et le Maghrib à l’‘Isha, au temps de l’une ou de l’autre. Le Prophète ﷺ a appelé ce raccourcissement une aumône d’Allah.',
      'في السفر تُقصر الرباعية (الظهر والعصر والعشاء) إلى ركعتين، ويبقى الفجر والمغرب على حالهما، ويجوز الجمع بين الظهر والعصر وبين المغرب والعشاء في وقت إحداهما، وسمّى النبي ﷺ القصر صدقة من الله.',
      'De viaje, las oraciones de cuatro rak‘as (Duhr, ‘Asr, ‘Isha) se acortan a dos; el Fayr y el Magrib quedan igual. Se puede juntar el Duhr con el ‘Asr y el Magrib con el ‘Isha, a la hora de una u otra. El Profeta ﷺ llamó a este acortamiento una caridad de Allah.',
    ),
    l: 'hadith',
    r: ['4:101', 'muslim:686', 'bukhari:1107'],
    quotes: [
      q(
        'travel-qasr',
        'صَدَقَةٌ تَصَدَّقَ اللَّهُ بِهَا عَلَيْكُمْ فَاقْبَلُوا صَدَقَتَهُ',
        t('A charity Allah has given you, so accept His charity.', 'Une aumône qu’Allah vous a faite ; acceptez donc Son aumône.', 'قالها النبي ﷺ لعمر حين سأله عن القصر في الأمن.', 'Una caridad que Allah os ha dado; aceptad, pues, Su caridad.'),
        ['muslim:686'],
      ),
    ],
  },
  {
    id: 'eclipse',
    title: t('The eclipse prayer', 'La prière de l’éclipse', 'صلاة الكسوف', 'La oración del eclipse'),
    text: t(
      'When the sun or the moon is eclipsed, pray, make takbir, supplicate and give charity until it clears. The Prophet ﷺ prayed two long rak‘ahs, each with two standings and two bowings.',
      'Lors d’une éclipse du soleil ou de la lune, priez, dites le takbir, invoquez et donnez l’aumône jusqu’à ce qu’elle cesse. Le Prophète ﷺ pria deux longues rak‘as, chacune avec deux stations debout et deux inclinaisons.',
      'إذا كسفت الشمس أو خسف القمر فصلِّ وكبّر وادعُ وتصدّق حتى ينجلي، وقد صلى النبي ﷺ ركعتين طويلتين في كل ركعة قيامان وركوعان.',
      'Cuando se eclipsa el sol o la luna, reza, di el takbir, suplica y da caridad hasta que pase. El Profeta ﷺ rezó dos rak‘as largas, cada una con dos posiciones de pie y dos inclinaciones.',
    ),
    l: 'hadith',
    r: ['bukhari:1044'],
    quotes: [
      q(
        'eclipse',
        'إِنَّ الشَّمْسَ وَالْقَمَرَ آيَتَانِ مِنْ آيَاتِ اللَّهِ، لاَ يَنْخَسِفَانِ لِمَوْتِ أَحَدٍ وَلاَ لِحَيَاتِهِ، فَإِذَا رَأَيْتُمْ ذَلِكَ فَادْعُوا اللَّهَ وَكَبِّرُوا، وَصَلُّوا وَتَصَدَّقُوا',
        t(
          'The sun and the moon are two of the signs of Allah; they are not eclipsed for anyone’s death or life. When you see that, call upon Allah, say “Allahu akbar”, pray and give charity.',
          'Le soleil et la lune sont deux signes d’Allah ; ils ne s’éclipsent pour la mort ni la vie de personne. Quand vous voyez cela, invoquez Allah, dites « Allahu akbar », priez et faites l’aumône.',
          'رواه عائشة رضي الله عنها.',
          'El sol y la luna son dos de los signos de Allah; no se eclipsan por la muerte ni por la vida de nadie. Cuando lo veáis, invocad a Allah, decid «Allahu akbar», rezad y dad caridad.',
        ),
        ['bukhari:1044'],
      ),
    ],
  },
]

const ALL: [string, SalatStep[]][] = [
  ['sahw', SAHW_STEPS],
  ['jamaa', JAMAA_STEPS],
  ['other', OTHER_PRAYERS],
]

/** Every quote, for the checker. */
export const SALAT_MORE_QUOTES: (Supplication & { where: string })[] = ALL.flatMap(([part, steps]) =>
  steps.flatMap((s) => (s.quotes ?? []).map((d) => ({ where: `salat/${part}/${s.id}/${d.id}`, ...d }))),
)

/** References with no quote, for the checker. */
export const SALAT_MORE_REFS: { where: string; r: Ref[] }[] = ALL.flatMap(([part, steps]) => steps.map((s) => ({ where: `salat/${part}/${s.id}`, r: s.r })))
