// The story of each Companion, with the trials they faced and what they gave up for their faith.
// Every point cites the hadith or sira it comes from; points from the historians are marked "tradition".
import type { L4, Level, Ref } from './types'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

export interface StoryPoint {
  text: L4
  l: Level
  r: Ref[]
}

export interface SahabiStory {
  story: L4
  challenges: StoryPoint[]
  sacrifices: StoryPoint[]
}

export const SAHABA_STORIES: Record<string, SahabiStory> = {
  abu_bakr: {
    story: t(
      'The Prophet’s ﷺ closest friend, the first free man to believe, and his only companion in the cave during the Hijra. As the first caliph he held the Muslims together after the Prophet’s death and, on ‘Umar’s advice, had the Qur’an gathered into one collection.',
      'L’ami le plus proche du Prophète ﷺ, le premier homme libre à croire, et son seul compagnon dans la grotte pendant l’Hégire. Premier calife, il garda les musulmans unis après la mort du Prophète et, sur le conseil de ‘Umar, fit rassembler le Coran en un seul recueil.',
      'أقرب أصحاب النبي ﷺ إليه، وأول من آمن من الرجال الأحرار، وصاحبه الوحيد في الغار يوم الهجرة. جمع المسلمين بعد وفاة النبي ﷺ وهو أول الخلفاء، وأمر بجمع القرآن في مصحف واحد بإشارة عمر.',
      'El amigo más cercano del Profeta ﷺ, el primer hombre libre en creer y su único compañero en la cueva durante la Hégira. Como primer califa mantuvo unidos a los musulmanes tras la muerte del Profeta y, por consejo de ‘Umar, hizo reunir el Corán en una sola colección.',
    ),
    challenges: [
      {
        text: t(
          'On the day the Prophet ﷺ died, many could not accept it. Abu Bakr stood and said: “Whoever worshipped Muhammad, Muhammad has died; whoever worships Allah, Allah is alive and does not die,” and recited 3:144.',
          'Le jour de la mort du Prophète ﷺ, beaucoup ne pouvaient l’accepter. Abu Bakr se leva et dit : « Quiconque adorait Muhammad, Muhammad est mort ; quiconque adore Allah, Allah est vivant et ne meurt pas », puis récita 3:144.',
          'يوم وفاة النبي ﷺ لم يحتمل كثيرون الخبر، فقام أبو بكر فقال: من كان يعبد محمدًا فإن محمدًا قد مات، ومن كان يعبد الله فإن الله حي لا يموت، وتلا آية آل عمران.',
          'El día en que murió el Profeta ﷺ, muchos no podían aceptarlo. Abu Bakr se levantó y dijo: «Quien adoraba a Muhammad, Muhammad ha muerto; quien adora a Allah, Allah está vivo y no muere», y recitó 3:144.',
        ),
        l: 'hadith',
        r: ['bukhari:3668', '3:144'],
      },
      {
        text: t(
          'Hunted with the Prophet ﷺ during the Hijra, he hid with him in the cave of Thawr while the Quraysh searched the mountain.',
          'Traqué avec le Prophète ﷺ pendant l’Hégire, il se cacha avec lui dans la grotte de Thawr pendant que Quraysh fouillait la montagne.',
          'طاردته قريش مع النبي ﷺ في الهجرة، فاختبأ معه في غار ثور وهم يطلبونهما.',
          'Perseguido con el Profeta ﷺ durante la Hégira, se escondió con él en la cueva de Zawr mientras Quraysh registraba la montaña.',
        ),
        l: 'hadith',
        r: ['bukhari:3653', '9:40'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'When the Prophet ﷺ called for charity, ‘Umar brought half his wealth; Abu Bakr brought everything he had. Asked what he had left for his family, he said: “I left them Allah and His Messenger.”',
          'Quand le Prophète ﷺ appela à l’aumône, ‘Umar apporta la moitié de ses biens ; Abu Bakr apporta tout ce qu’il avait. À la question de ce qu’il avait laissé à sa famille, il répondit : « Je leur ai laissé Allah et Son Messager. »',
          'لما ندب النبي ﷺ إلى الصدقة جاء عمر بنصف ماله وجاء أبو بكر بكل ما عنده، فلما سُئل ما أبقيت لأهلك قال: أبقيت لهم الله ورسوله.',
          'Cuando el Profeta ﷺ pidió limosna, ‘Umar trajo la mitad de sus bienes; Abu Bakr trajo todo lo que tenía. Al preguntarle qué había dejado a su familia, dijo: «Les dejé a Allah y a Su Mensajero».',
        ),
        l: 'hadith',
        r: ['tirmidhi:3675'],
      },
      {
        text: t(
          'He spent his money buying the freedom of persecuted slaves, among them Bilal. ‘Umar said: “Abu Bakr is our master, and he freed our master,” meaning Bilal.',
          'Il dépensa sa fortune pour affranchir des esclaves persécutés, dont Bilal. ‘Umar disait : « Abu Bakr est notre maître, et il a affranchi notre maître », c’est-à-dire Bilal.',
          'أنفق ماله في عتق المستضعفين ومنهم بلال، وكان عمر يقول: أبو بكر سيدنا، وأعتق سيدنا، يعني بلالًا.',
          'Gastó su fortuna en liberar a esclavos perseguidos, entre ellos Bilal. ‘Umar decía: «Abu Bakr es nuestro señor, y liberó a nuestro señor», es decir, a Bilal.',
        ),
        l: 'hadith',
        r: ['bukhari:3754'],
      },
    ],
  },
  umar_ibn_khattab: {
    story: t(
      'Once a fierce opponent of Islam, his conversion gave the persecuted Muslims strength: “We have been strong ever since ‘Umar became Muslim.” As second caliph for ten years he became a byword for justice, and the Muslims began counting years from the Hijra in his time.',
      'D’abord adversaire farouche de l’islam, sa conversion donna de la force aux musulmans persécutés : « Nous sommes restés forts depuis que ‘Umar est devenu musulman. » Deuxième calife pendant dix ans, il devint synonyme de justice, et c’est sous lui que les musulmans commencèrent à compter les années depuis l’Hégire.',
      'كان شديدًا على الإسلام ثم أسلم فأعزّ الله به المسلمين: «ما زلنا أعزّة منذ أسلم عمر». وكان الخليفة الثاني عشر سنين، فضُرب به المثل في العدل، وفي زمانه أُرّخ بالهجرة.',
      'Primero enemigo feroz del islam, su conversión dio fuerza a los musulmanes perseguidos: «Hemos sido fuertes desde que ‘Umar se hizo musulmán». Segundo califa durante diez años, se convirtió en sinónimo de justicia, y en su tiempo los musulmanes empezaron a contar los años desde la Hégira.',
    ),
    challenges: [
      {
        text: t(
          'Before Islam he persecuted the believers; his brother-in-law Sa‘id ibn Zayd later said: “I saw ‘Umar tie me up because of Islam.” He had to turn that same strength to the service of the faith.',
          'Avant l’islam, il persécutait les croyants ; son beau-frère Sa‘id ibn Zayd dira : « J’ai vu ‘Umar me ligoter à cause de l’islam. » Il dut mettre cette même force au service de la foi.',
          'كان قبل إسلامه يؤذي المؤمنين، قال صهره سعيد بن زيد: لقد رأيتني وإن عمر لموثقي على الإسلام، ثم صرف قوته في نصرة الدين.',
          'Antes del islam perseguía a los creyentes; su cuñado Sa‘id ibn Zayd diría: «Vi a ‘Umar atarme por causa del islam». Tuvo que poner esa misma fuerza al servicio de la fe.',
        ),
        l: 'hadith',
        r: ['bukhari:3862'],
      },
      {
        text: t(
          'He was stabbed while leading the dawn prayer. Dying, his concern was for the Muslims; he thanked Allah that his killer was not a man who claimed Islam.',
          'Il fut poignardé alors qu’il dirigeait la prière de l’aube. Mourant, il se souciait des musulmans, et remercia Allah que son meurtrier ne fût pas un homme se réclamant de l’islam.',
          'طُعن وهو يؤمّ الناس في صلاة الفجر، فكان همّه أمر المسلمين، وحمد الله أن لم يجعل منيته بيد رجل يدّعي الإسلام.',
          'Fue apuñalado mientras dirigía la oración del alba. Moribundo, su preocupación eran los musulmanes, y agradeció a Allah que su asesino no fuera un hombre que se dijera musulmán.',
        ),
        l: 'hadith',
        r: ['bukhari:3700'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He brought half of all he owned when the Prophet ﷺ called for charity.',
          'Il apporta la moitié de tout ce qu’il possédait quand le Prophète ﷺ appela à l’aumône.',
          'جاء بنصف ماله لما ندب النبي ﷺ إلى الصدقة.',
          'Trajo la mitad de todo lo que tenía cuando el Profeta ﷺ pidió limosna.',
        ),
        l: 'hadith',
        r: ['tirmidhi:3675'],
      },
      {
        text: t(
          'He gave his most valued land, at Khaybar, as a permanent endowment for the poor, relatives, travellers and guests, on the Prophet’s ﷺ advice: “Keep the land itself and give its fruit in charity.”',
          'Il donna sa terre la plus précieuse, à Khaybar, en fondation perpétuelle pour les pauvres, les proches, les voyageurs et les hôtes, sur le conseil du Prophète ﷺ : « Garde la terre et donne-en les fruits en aumône. »',
          'أوقف أنفس ماله، أرضه بخيبر، على الفقراء والقربى وابن السبيل والضيف، بقول النبي ﷺ: «إن شئت حبست أصلها وتصدقت بها».',
          'Dio su tierra más valiosa, en Jaybar, como fundación perpetua para los pobres, los parientes, los viajeros y los huéspedes, por consejo del Profeta ﷺ: «Conserva la tierra y da sus frutos en limosna».',
        ),
        l: 'hadith',
        r: ['bukhari:2737'],
      },
    ],
  },
  uthman_ibn_affan: {
    story: t(
      'A wealthy, gentle man who married two of the Prophet’s ﷺ daughters, Ruqayyah and then Umm Kulthum. As third caliph he united the Muslims on a single written copy of the Qur’an, the Mushaf still read today.',
      'Un homme riche et doux qui épousa deux filles du Prophète ﷺ, Ruqayya puis Umm Kulthum. Troisième calife, il réunit les musulmans sur une seule copie écrite du Coran, le Mushaf qu’on lit encore aujourd’hui.',
      'رجل غني حيي، تزوج ابنتي النبي ﷺ رقية ثم أم كلثوم، وجمع المسلمين في خلافته على مصحف واحد هو الذي يُقرأ إلى اليوم.',
      'Un hombre rico y bondadoso que se casó con dos hijas del Profeta ﷺ, Ruqayya y luego Umm Kulzum. Como tercer califa unió a los musulmanes en una sola copia escrita del Corán, el Mushaf que aún se lee hoy.',
    ),
    challenges: [
      {
        text: t(
          'The Prophet ﷺ gave him the good news of Paradise “for a trial that will befall him”. Years later rebels besieged him in his house in Madinah and killed him while he was caliph.',
          'Le Prophète ﷺ lui annonça le Paradis « pour une épreuve qui l’atteindra ». Des années plus tard, des rebelles l’assiégèrent dans sa maison à Médine et le tuèrent alors qu’il était calife.',
          'بشّره النبي ﷺ بالجنة «على بلوى ستصيبه»، ثم حاصره الخارجون عليه في داره بالمدينة وقتلوه وهو خليفة.',
          'El Profeta ﷺ le anunció el Paraíso «por una prueba que le alcanzará». Años después, unos rebeldes lo sitiaron en su casa de Medina y lo mataron siendo califa.',
        ),
        l: 'hadith',
        r: ['bukhari:3695'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'When Madinah lacked water, the Prophet ﷺ promised Paradise to whoever provided the well of Rumah, and ‘Uthman did. When he promised Paradise to whoever equipped the army of hardship for Tabuk, ‘Uthman equipped it.',
          'Quand Médine manquait d’eau, le Prophète ﷺ promit le Paradis à qui fournirait le puits de Ruma, et ‘Uthman le fit. Quand il le promit à qui équiperait l’armée de la gêne pour Tabuk, ‘Uthman l’équipa.',
          'وعد النبي ﷺ من حفر بئر رومة بالجنة فحفرها عثمان، ووعد من جهّز جيش العسرة بالجنة فجهّزه عثمان.',
          'Cuando a Medina le faltaba agua, el Profeta ﷺ prometió el Paraíso a quien proveyera el pozo de Ruma, y ‘Uthman lo hizo. Cuando lo prometió a quien equipara el ejército de la penuria para Tabuk, ‘Uthman lo equipó.',
        ),
        l: 'hadith',
        r: ['bukhari:2778'],
      },
    ],
  },
  ali_ibn_abi_talib: {
    story: t(
      'The Prophet’s ﷺ cousin, raised in his house, husband of Fatimah and father of al-Hasan and al-Husayn. At Khaybar the Prophet ﷺ gave him the banner, saying Allah would grant victory through him. He was the fourth caliph.',
      'Le cousin du Prophète ﷺ, élevé dans sa maison, époux de Fatima et père d’al-Hasan et d’al-Husayn. À Khaybar, le Prophète ﷺ lui confia l’étendard, disant qu’Allah donnerait la victoire par ses mains. Il fut le quatrième calife.',
      'ابن عم النبي ﷺ ورُبّي في بيته، زوج فاطمة وأبو الحسن والحسين. أعطاه النبي ﷺ الراية يوم خيبر وقال إن الله يفتح على يديه، وكان رابع الخلفاء.',
      'El primo del Profeta ﷺ, criado en su casa, esposo de Fátima y padre de al-Hasan y al-Husayn. En Jaybar el Profeta ﷺ le dio el estandarte, diciendo que Allah daría la victoria por sus manos. Fue el cuarto califa.',
    ),
    challenges: [
      {
        text: t(
          'At Khaybar his eyes were so sore he could not see well; the Prophet ﷺ prayed for him and he was healed. He told him to invite the enemy to Islam first: “If Allah guides one man through you, it is better for you than red camels.”',
          'À Khaybar, ses yeux le faisaient tant souffrir qu’il voyait mal ; le Prophète ﷺ pria pour lui et il guérit. Il lui recommanda d’inviter d’abord l’ennemi à l’islam : « Qu’Allah guide par toi un seul homme vaut mieux pour toi que des chameaux roux. »',
          'كان يوم خيبر يشتكي عينيه، فدعا له النبي ﷺ فبرأ، وأوصاه أن يدعوهم إلى الإسلام أولًا: «فوالله لأن يهدي الله بك رجلًا واحدًا خير لك من أن يكون لك حمر النعم».',
          'En Jaybar le dolían tanto los ojos que veía mal; el Profeta ﷺ rezó por él y sanó. Le encargó invitar primero al enemigo al islam: «Que Allah guíe por ti a un solo hombre es mejor para ti que camellos rojos».',
        ),
        l: 'hadith',
        r: ['bukhari:3701'],
      },
      {
        text: t(
          'His caliphate fell in the first civil strife among the Muslims, and he was killed in Kufa in 40 AH.',
          'Son califat tomba dans la première guerre civile entre musulmans, et il fut tué à Koufa en 40 H.',
          'وقعت خلافته في أول فتنة بين المسلمين، وقُتل بالكوفة سنة 40 هـ.',
          'Su califato coincidió con la primera guerra civil entre musulmanes, y fue asesinado en Kufa en el año 40 H.',
        ),
        l: 'tradition',
        r: ['book:tabari'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He and Fatimah lived simply. When she asked for a servant because grinding grain had hurt her hands, the Prophet ﷺ taught them instead to glorify Allah before sleep, and they kept to it.',
          'Lui et Fatima vivaient simplement. Quand elle demanda un serviteur parce que la meule lui blessait les mains, le Prophète ﷺ leur enseigna plutôt à glorifier Allah avant de dormir, et ils s’y tinrent.',
          'عاش هو وفاطمة عيشًا بسيطًا، ولما طلبت خادمًا لما أصاب يديها من الرحى علّمهما النبي ﷺ التسبيح عند النوم بدلًا منه.',
          'Él y Fátima vivían con sencillez. Cuando ella pidió un sirviente porque el molino le hería las manos, el Profeta ﷺ les enseñó en su lugar a glorificar a Allah antes de dormir, y lo mantuvieron.',
        ),
        l: 'hadith',
        r: ['bukhari:3705'],
      },
    ],
  },
  fatimah_az_zahra: {
    story: t(
      'The youngest daughter of the Prophet ﷺ and Khadijah. He said: “Fatimah is a part of me,” and told her she would be the leader of the women of Paradise. She was the mother of al-Hasan and al-Husayn.',
      'La plus jeune fille du Prophète ﷺ et de Khadija. Il dit : « Fatima est une partie de moi », et lui annonça qu’elle serait la maîtresse des femmes du Paradis. Elle fut la mère d’al-Hasan et d’al-Husayn.',
      'صغرى بنات النبي ﷺ من خديجة، قال: «فاطمة بضعة مني»، وبشّرها بأنها سيدة نساء أهل الجنة، وهي أم الحسن والحسين.',
      'La hija menor del Profeta ﷺ y de Jadiya. Él dijo: «Fátima es una parte de mí», y le anunció que sería la señora de las mujeres del Paraíso. Fue la madre de al-Hasan y al-Husayn.',
    ),
    challenges: [
      {
        text: t(
          'Her hands were worn from grinding grain at home; she asked her father for a servant, and accepted his remembrance instead.',
          'Ses mains étaient usées par la meule à la maison ; elle demanda un serviteur à son père, et accepta à la place l’invocation qu’il lui enseigna.',
          'أثّرت الرحى في يديها، فسألت أباها خادمًا فرضيت بما علّمها من الذكر بدلًا منه.',
          'Sus manos estaban gastadas por el molino; pidió a su padre un sirviente y aceptó en su lugar el recuerdo que él le enseñó.',
        ),
        l: 'hadith',
        r: ['bukhari:3705'],
      },
      {
        text: t(
          'In his last illness he told her she would be the first of his family to join him, and she smiled. She lived only about six months after him.',
          'Pendant sa dernière maladie, il lui confia qu’elle serait la première de sa famille à le rejoindre, et elle sourit. Elle ne vécut qu’environ six mois après lui.',
          'أسرّ إليها في مرضه أنها أول أهله لحوقًا به فضحكت، وعاشت بعده ستة أشهر.',
          'En su última enfermedad le dijo que sería la primera de su familia en reunirse con él, y ella sonrió. Vivió solo unos seis meses después de él.',
        ),
        l: 'hadith',
        r: ['bukhari:3624', 'bukhari:4240'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'She chose a life of patience and little wealth in the house of ‘Ali, raising the grandsons the Prophet ﷺ called “the leaders of the youth of Paradise”.',
          'Elle choisit une vie de patience et de peu de biens dans la maison de ‘Ali, élevant les petits-fils que le Prophète ﷺ appela « les maîtres des jeunes du Paradis ».',
          'رضيت بعيش الصبر وقلة المال في بيت علي، وربّت سبطي النبي ﷺ اللذين قال فيهما: «سيدا شباب أهل الجنة».',
          'Eligió una vida de paciencia y pocos bienes en la casa de ‘Ali, criando a los nietos que el Profeta ﷺ llamó «los señores de los jóvenes del Paraíso».',
        ),
        l: 'hadith',
        r: ['tirmidhi:3768'],
      },
    ],
  },
  hasan_ibn_ali: {
    story: t(
      'The Prophet’s ﷺ elder grandson. With al-Hasan beside him on the pulpit, the Prophet ﷺ said: “This son of mine is a leader, and perhaps Allah will reconcile two great groups of Muslims through him.”',
      'L’aîné des petits-fils du Prophète ﷺ. Al-Hasan à ses côtés sur la chaire, le Prophète ﷺ dit : « Mon fils que voici est un maître, et peut-être qu’Allah réconciliera par lui deux grands groupes de musulmans. »',
      'السبط الأكبر للنبي ﷺ، قال فيه على المنبر والحسن إلى جنبه: «إن ابني هذا سيد، ولعل الله أن يصلح به بين فئتين عظيمتين من المسلمين».',
      'El nieto mayor del Profeta ﷺ. Con al-Hasan a su lado en el púlpito, el Profeta ﷺ dijo: «Este hijo mío es un señor, y quizá Allah reconcilie por él a dos grandes grupos de musulmanes».',
    ),
    challenges: [
      {
        text: t(
          'After his father’s death he led a great army, and two Muslim armies stood ready to fight.',
          'Après la mort de son père, il conduisit une grande armée, et deux armées musulmanes se tinrent prêtes au combat.',
          'قاد بعد مقتل أبيه جيشًا عظيمًا، ووقف جيشان من المسلمين على شفا القتال.',
          'Tras la muerte de su padre dirigió un gran ejército, y dos ejércitos musulmanes estuvieron a punto de combatir.',
        ),
        l: 'hadith',
        r: ['bukhari:2704'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He gave up the caliphate to Mu‘awiyah to stop Muslim blood from being shed (41 AH), fulfilling the Prophet’s ﷺ words about him.',
          'Il céda le califat à Mu‘awiya pour arrêter l’effusion du sang musulman (41 H), accomplissant les paroles du Prophète ﷺ à son sujet.',
          'تنازل عن الخلافة لمعاوية حقنًا لدماء المسلمين سنة 41 هـ، فصدق فيه قول النبي ﷺ.',
          'Cedió el califato a Mu‘awiya para detener el derramamiento de sangre musulmana (41 H), cumpliendo las palabras del Profeta ﷺ sobre él.',
        ),
        l: 'hadith',
        r: ['bukhari:2704'],
      },
    ],
  },
  husayn_ibn_ali: {
    story: t(
      'The Prophet’s ﷺ younger grandson, of whom he said: “Husayn is from me and I am from Husayn.” With his brother he is one of the two leaders of the youth of Paradise.',
      'Le cadet des petits-fils du Prophète ﷺ, dont il dit : « Husayn est de moi et je suis de Husayn. » Avec son frère, il est l’un des deux maîtres des jeunes du Paradis.',
      'السبط الأصغر للنبي ﷺ، قال فيه: «حسين مني وأنا من حسين»، وهو مع أخيه سيدا شباب أهل الجنة.',
      'El nieto menor del Profeta ﷺ, de quien dijo: «Husayn es de mí y yo soy de Husayn». Con su hermano es uno de los dos señores de los jóvenes del Paraíso.',
    ),
    challenges: [
      {
        text: t(
          'He refused to give allegiance to Yazid and set out for Kufa. At Karbala, on 10 Muharram 61 AH, he was killed with members of his family; his head was brought to ‘Ubaydullah ibn Ziyad.',
          'Il refusa de prêter allégeance à Yazid et partit pour Koufa. À Karbala, le 10 muharram 61 H, il fut tué avec des membres de sa famille ; sa tête fut apportée à ‘Ubaydullah ibn Ziyad.',
          'أبى أن يبايع يزيد وخرج إلى الكوفة، فقُتل بكربلاء يوم العاشر من المحرم سنة 61 هـ مع أهل بيته، وحُمل رأسه إلى عبيد الله بن زياد.',
          'Se negó a jurar lealtad a Yazid y partió hacia Kufa. En Karbala, el 10 de muharram de 61 H, fue asesinado con miembros de su familia; su cabeza fue llevada a ‘Ubaydullah ibn Ziyad.',
        ),
        l: 'tradition',
        r: ['bukhari:3748', 'book:tabari'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He gave his life and those of his family rather than give allegiance he believed wrong.',
          'Il donna sa vie et celles de sa famille plutôt que de prêter une allégeance qu’il jugeait injuste.',
          'بذل نفسه وأهل بيته ولم يعطِ بيعة رآها باطلة.',
          'Dio su vida y las de su familia antes que jurar una lealtad que consideraba injusta.',
        ),
        l: 'tradition',
        r: ['book:tabari'],
      },
    ],
  },
  talhah_ibn_ubaydillah: {
    story: t(
      'One of the earliest Muslims and one of the ten promised Paradise, from the clan of Abu Bakr.',
      'L’un des premiers musulmans et l’un des dix promis au Paradis, du clan d’Abu Bakr.',
      'من السابقين إلى الإسلام وأحد العشرة المبشرين بالجنة، من قوم أبي بكر.',
      'Uno de los primeros musulmanes y uno de los diez prometidos al Paraíso, del clan de Abu Bakr.',
    ),
    challenges: [
      {
        text: t(
          'At Uhud, when the Muslim lines broke and the Prophet ﷺ was exposed, Talhah stayed by him.',
          'À Uhud, quand les rangs musulmans cédèrent et que le Prophète ﷺ fut exposé, Talha resta à ses côtés.',
          'يوم أحد لما انكشف المسلمون وبقي النبي ﷺ مكشوفًا ثبت طلحة إلى جانبه.',
          'En Uhud, cuando las filas musulmanas cedieron y el Profeta ﷺ quedó expuesto, Talha permaneció a su lado.',
        ),
        l: 'hadith',
        r: ['bukhari:3724'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He shielded the Prophet ﷺ with his own hand; a companion said: “I saw Talhah’s hand, paralysed, with which he protected the Prophet ﷺ at Uhud.”',
          'Il protégea le Prophète ﷺ de sa propre main ; un compagnon dit : « J’ai vu la main paralysée de Talha, avec laquelle il protégea le Prophète ﷺ à Uhud. »',
          'وقى النبي ﷺ بيده، قال قيس: رأيت يد طلحة شلّاء وقى بها النبي ﷺ يوم أحد.',
          'Protegió al Profeta ﷺ con su propia mano; un compañero dijo: «Vi la mano paralizada de Talha, con la que protegió al Profeta ﷺ en Uhud».',
        ),
        l: 'hadith',
        r: ['bukhari:3724'],
      },
    ],
  },
  zubayr_ibn_awwam: {
    story: t(
      'The son of the Prophet’s ﷺ aunt Safiyyah, one of the ten promised Paradise. The Prophet ﷺ said: “Every prophet has a disciple, and my disciple is al-Zubayr.”',
      'Le fils de Safiyya, la tante du Prophète ﷺ, l’un des dix promis au Paradis. Le Prophète ﷺ dit : « Chaque prophète a un disciple, et mon disciple est az-Zubayr. »',
      'ابن عمة النبي ﷺ صفية، وأحد العشرة المبشرين بالجنة، قال فيه النبي ﷺ: «إن لكل نبي حواريًّا وإن حواريّ الزبير».',
      'El hijo de Safiyya, la tía del Profeta ﷺ, uno de los diez prometidos al Paraíso. El Profeta ﷺ dijo: «Todo profeta tiene un discípulo, y mi discípulo es al-Zubayr».',
    ),
    challenges: [
      {
        text: t(
          'During the siege of the Trench, the Prophet ﷺ asked three times who would bring news of the enemy, and each time al-Zubayr volunteered.',
          'Pendant le siège de la Tranchée, le Prophète ﷺ demanda trois fois qui lui apporterait des nouvelles de l’ennemi, et chaque fois az-Zubayr se porta volontaire.',
          'يوم الأحزاب سأل النبي ﷺ ثلاثًا من يأتيه بخبر القوم، فقال الزبير في كل مرة: أنا.',
          'Durante el asedio de la Trinchera, el Profeta ﷺ preguntó tres veces quién le traería noticias del enemigo, y cada vez al-Zubayr se ofreció.',
        ),
        l: 'hadith',
        r: ['bukhari:2846'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'For his courage the Prophet ﷺ honoured him with the words: “May my father and mother be your ransom.”',
          'Pour son courage, le Prophète ﷺ l’honora de ces mots : « Que mon père et ma mère te servent de rançon. »',
          'كرّمه النبي ﷺ لشجاعته فقال له: «فداك أبي وأمي».',
          'Por su valor, el Profeta ﷺ lo honró con las palabras: «Que mi padre y mi madre sean tu rescate».',
        ),
        l: 'hadith',
        r: ['bukhari:3720'],
      },
    ],
  },
  abdurrahman_ibn_awf: {
    story: t(
      'An early Muslim who emigrated to Madinah with nothing. The Prophet ﷺ paired him in brotherhood with Sa‘d ibn al-Rabi‘ of the Ansar. He became one of the ten promised Paradise, and once the Prophet ﷺ prayed behind him.',
      'Un des premiers musulmans, arrivé à Médine sans rien. Le Prophète ﷺ le fraternisa avec Sa‘d ibn ar-Rabi‘ des Ansar. Il fut l’un des dix promis au Paradis, et le Prophète ﷺ pria une fois derrière lui.',
      'من السابقين، هاجر إلى المدينة لا يملك شيئًا، فآخى النبي ﷺ بينه وبين سعد بن الربيع الأنصاري، وهو أحد العشرة، وصلى النبي ﷺ خلفه مرة.',
      'Uno de los primeros musulmanes, llegó a Medina sin nada. El Profeta ﷺ lo hermanó con Sa‘d ibn al-Rabi‘ de los Ansar. Fue uno de los diez prometidos al Paraíso, y una vez el Profeta ﷺ rezó detrás de él.',
    ),
    challenges: [
      {
        text: t(
          'Sa‘d offered him half his wealth. He declined with thanks and asked: “Is there a market where people trade?” He started again from nothing with honest work.',
          'Sa‘d lui offrit la moitié de ses biens. Il refusa avec gratitude et demanda : « Y a-t-il un marché où l’on commerce ? » Il repartit de rien par un travail honnête.',
          'عرض عليه سعد نصف ماله فأبى وقال: هل من سوق فيه تجارة؟ فبدأ من لا شيء بالكسب الحلال.',
          'Sa‘d le ofreció la mitad de sus bienes. Lo rechazó agradecido y preguntó: «¿Hay un mercado donde se comercie?». Empezó de nuevo desde cero con trabajo honrado.',
        ),
        l: 'hadith',
        r: ['bukhari:2048'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He left his home and wealth in Makkah for his faith, choosing to depend on his own effort rather than on his brother’s generosity.',
          'Il laissa sa maison et ses biens à La Mecque pour sa foi, préférant compter sur son propre effort plutôt que sur la générosité de son frère.',
          'ترك داره وماله بمكة لأجل دينه، وآثر أن يعتمد على كسبه لا على كرم أخيه.',
          'Dejó su casa y sus bienes en La Meca por su fe, prefiriendo depender de su propio esfuerzo que de la generosidad de su hermano.',
        ),
        l: 'hadith',
        r: ['bukhari:2048', 'muslim:274'],
      },
    ],
  },
  sad_ibn_abi_waqqas: {
    story: t(
      'A young early Muslim from the Prophet’s ﷺ maternal clan, one of the ten promised Paradise, and the first Arab to shoot an arrow in Allah’s cause. He later commanded the Muslims at al-Qadisiyyah.',
      'Un jeune parmi les premiers musulmans, du clan maternel du Prophète ﷺ, l’un des dix promis au Paradis, et le premier Arabe à décocher une flèche dans le sentier d’Allah. Il commanda plus tard les musulmans à al-Qadisiyya.',
      'من السابقين وهو شاب، من أخوال النبي ﷺ، وأحد العشرة، وأول العرب رمى بسهم في سبيل الله، وقاد المسلمين يوم القادسية.',
      'Un joven de los primeros musulmanes, del clan materno del Profeta ﷺ, uno de los diez prometidos al Paraíso y el primer árabe que disparó una flecha por la causa de Allah. Más tarde dirigió a los musulmanes en al-Qadisiyya.',
    ),
    challenges: [
      {
        text: t(
          'His mother swore not to eat or drink until he left Islam. He stayed firm and kind to her, and the verse was revealed: “If they strive to make you associate with Me … do not obey them, but keep company with them in this world kindly.”',
          'Sa mère jura de ne plus manger ni boire tant qu’il ne quitterait pas l’islam. Il resta ferme et bon envers elle, et le verset fut révélé : « Et s’ils te forcent à M’associer … ne leur obéis pas ; mais reste avec eux ici-bas de façon convenable. »',
          'حلفت أمه ألا تأكل ولا تشرب حتى يكفر، فثبت وبرّها، فنزلت: «وإن جاهداك على أن تشرك بي ما ليس لك به علم فلا تطعهما وصاحبهما في الدنيا معروفًا».',
          'Su madre juró no comer ni beber hasta que dejara el islam. Se mantuvo firme y bondadoso con ella, y se reveló el versículo: «Y si se empeñan en que Me asocies … no les obedezcas, pero acompáñalos en esta vida como es debido».',
        ),
        l: 'hadith',
        r: ['muslim:1748', '31:15'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'At Uhud he shot arrow after arrow in the Prophet’s ﷺ defence, and the Prophet ﷺ said to him: “Shoot, may my father and mother be your ransom.”',
          'À Uhud, il tira flèche après flèche pour défendre le Prophète ﷺ, qui lui dit : « Tire, que mon père et ma mère te servent de rançon. »',
          'رمى يوم أحد دون النبي ﷺ فقال له: «ارمِ فداك أبي وأمي».',
          'En Uhud disparó flecha tras flecha defendiendo al Profeta ﷺ, que le dijo: «Dispara, que mi padre y mi madre sean tu rescate».',
        ),
        l: 'hadith',
        r: ['bukhari:4055', 'bukhari:3728'],
      },
    ],
  },
  said_ibn_zayd: {
    story: t(
      'An early Muslim with his wife Fatimah bint al-Khattab, ‘Umar’s sister, and one of the ten promised Paradise.',
      'Musulman de la première heure avec son épouse Fatima bint al-Khattab, sœur de ‘Umar, et l’un des dix promis au Paradis.',
      'أسلم مبكرًا هو وزوجته فاطمة بنت الخطاب أخت عمر، وهو أحد العشرة المبشرين بالجنة.',
      'Musulmán temprano junto con su esposa Fátima bint al-Jattab, hermana de ‘Umar, y uno de los diez prometidos al Paraíso.',
    ),
    challenges: [
      {
        text: t(
          'Before ‘Umar became Muslim, he tied Sa‘id up because of his Islam. Sa‘id held on to his faith.',
          'Avant de devenir musulman, ‘Umar ligota Sa‘id à cause de son islam. Sa‘id garda sa foi.',
          'أوثقه عمر على الإسلام قبل أن يسلم، فثبت سعيد على دينه.',
          'Antes de hacerse musulmán, ‘Umar ató a Sa‘id por causa de su islam. Sa‘id mantuvo su fe.',
        ),
        l: 'hadith',
        r: ['bukhari:3862'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He accepted persecution from his own family for the sake of Islam, and lived to testify that the Prophet ﷺ named him among the ten of Paradise.',
          'Il accepta d’être persécuté par sa propre famille pour l’islam, et vécut pour témoigner que le Prophète ﷺ l’avait nommé parmi les dix du Paradis.',
          'صبر على أذى أهله في سبيل الإسلام، وشهد أن النبي ﷺ ذكره في العشرة المبشرين.',
          'Aceptó la persecución de su propia familia por el islam, y vivió para atestiguar que el Profeta ﷺ lo nombró entre los diez del Paraíso.',
        ),
        l: 'hadith',
        r: ['abudawud:4649'],
      },
    ],
  },
  abu_ubaydah_jarrah: {
    story: t(
      'One of the ten promised Paradise, whom the Prophet ﷺ called “the trustee of this nation”. When the people of Najran asked for a trustworthy man, he sent Abu ‘Ubaydah.',
      'L’un des dix promis au Paradis, que le Prophète ﷺ appela « l’homme de confiance de cette nation ». Quand les gens de Najran demandèrent un homme de confiance, il envoya Abu ‘Ubayda.',
      'أحد العشرة، سمّاه النبي ﷺ «أمين هذه الأمة»، ولما طلب أهل نجران رجلًا أمينًا بعثه إليهم.',
      'Uno de los diez prometidos al Paraíso, a quien el Profeta ﷺ llamó «el hombre de confianza de esta nación». Cuando la gente de Nayran pidió un hombre de confianza, envió a Abu ‘Ubayda.',
    ),
    challenges: [
      {
        text: t(
          'He led the Muslim armies in Syria and died there in the plague of ‘Amwas in 18 AH.',
          'Il commanda les armées musulmanes en Syrie et y mourut pendant la peste d’‘Amwas en 18 H.',
          'قاد جيوش المسلمين في الشام ومات فيها في طاعون عمواس سنة 18 هـ.',
          'Dirigió los ejércitos musulmanes en Siria y murió allí en la peste de ‘Amwas en el año 18 H.',
        ),
        l: 'tradition',
        r: ['book:tabari'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'Trusted with command and wealth, he stayed modest and was chosen by the Prophet ﷺ for his honesty above all.',
          'Investi du commandement et des richesses, il resta modeste et fut choisi par le Prophète ﷺ avant tout pour son honnêteté.',
          'وُلّي القيادة والأموال فبقي متواضعًا، واختاره النبي ﷺ لأمانته.',
          'Con mando y riquezas a su cargo, siguió siendo modesto y fue elegido por el Profeta ﷺ ante todo por su honradez.',
        ),
        l: 'hadith',
        r: ['bukhari:3744', 'bukhari:3745'],
      },
    ],
  },
  hamzah_ibn_abd_muttalib: {
    story: t(
      'The Prophet’s ﷺ paternal uncle and foster brother, a strong and respected man of Quraysh whose Islam protected the Prophet ﷺ in Makkah. At Badr he was among the first three Muslims to step out for single combat.',
      'L’oncle paternel et frère de lait du Prophète ﷺ, homme fort et respecté de Quraysh dont l’islam protégea le Prophète ﷺ à La Mecque. À Badr, il fut parmi les trois premiers musulmans à s’avancer en combat singulier.',
      'عم النبي ﷺ وأخوه من الرضاعة، رجل قوي مهيب في قريش حمى إسلامُه النبيَّ ﷺ بمكة، وكان يوم بدر من الثلاثة الذين برزوا للمبارزة.',
      'El tío paterno y hermano de leche del Profeta ﷺ, hombre fuerte y respetado de Quraysh cuyo islam protegió al Profeta ﷺ en La Meca. En Badr fue de los tres primeros musulmanes en salir a combate singular.',
    ),
    challenges: [
      {
        text: t(
          'At Badr, he, ‘Ali and ‘Ubaydah faced three champions of Quraysh; the Qur’an speaks of “these two opposing groups” about that duel.',
          'À Badr, lui, ‘Ali et ‘Ubayda affrontèrent trois champions de Quraysh ; le Coran parle de « ces deux groupes adverses » à propos de ce duel.',
          'برز يوم بدر هو وعلي وعبيدة لثلاثة من فرسان قريش، وفيهم نزلت: «هذان خصمان اختصموا في ربهم».',
          'En Badr, él, ‘Ali y ‘Ubayda se enfrentaron a tres campeones de Quraysh; el Corán habla de «estos dos grupos adversarios» sobre ese duelo.',
        ),
        l: 'hadith',
        r: ['bukhari:3965', '22:19'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He was killed at Uhud by Wahshi, who later became Muslim and told the story himself.',
          'Il fut tué à Uhud par Wahshi, qui se convertit plus tard et raconta lui-même l’histoire.',
          'استُشهد يوم أحد بحربة وحشي، الذي أسلم بعد ذلك وحدّث بقصته.',
          'Murió en Uhud a manos de Wahshi, que más tarde se hizo musulmán y contó él mismo la historia.',
        ),
        l: 'hadith',
        r: ['bukhari:4072'],
      },
    ],
  },
  khalid_ibn_walid: {
    story: t(
      'A great commander of Quraysh who fought the Muslims before becoming Muslim himself. At Mu’tah, after three commanders fell, he took the banner and the Prophet ﷺ called him “a sword of the swords of Allah”.',
      'Un grand chef de guerre de Quraysh qui combattit les musulmans avant de devenir musulman. À Mu’ta, après la chute de trois commandants, il prit l’étendard, et le Prophète ﷺ l’appela « une épée parmi les épées d’Allah ».',
      'قائد كبير من قريش قاتل المسلمين ثم أسلم، ولما قُتل الأمراء الثلاثة يوم مؤتة أخذ الراية، فقال النبي ﷺ: «حتى أخذ الراية سيف من سيوف الله».',
      'Un gran comandante de Quraysh que combatió a los musulmanes antes de hacerse musulmán. En Mu’ta, tras caer tres comandantes, tomó el estandarte, y el Profeta ﷺ lo llamó «una espada de entre las espadas de Allah».',
    ),
    challenges: [
      {
        text: t(
          'At Mu’tah the Muslims faced a far larger army. Khalid said nine swords broke in his hand that day, and he brought the army back.',
          'À Mu’ta, les musulmans affrontaient une armée bien plus nombreuse. Khalid dit que neuf épées se brisèrent dans sa main ce jour-là, et il ramena l’armée.',
          'لقي المسلمون في مؤتة جيشًا أكبر منهم بكثير، وقال خالد: لقد انقطعت في يدي يوم مؤتة تسعة أسياف.',
          'En Mu’ta los musulmanes se enfrentaron a un ejército mucho mayor. Jalid dijo que ese día se le rompieron nueve espadas en la mano, y trajo de vuelta al ejército.',
        ),
        l: 'hadith',
        r: ['bukhari:4265', 'bukhari:3757'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He left the rank and pride he had in Quraysh to follow the faith he had once fought.',
          'Il quitta le rang et la fierté qu’il avait chez Quraysh pour suivre la foi qu’il avait combattue.',
          'ترك مكانته في قريش واتبع الدين الذي كان يقاتله.',
          'Dejó el rango y el orgullo que tenía en Quraysh para seguir la fe que antes había combatido.',
        ),
        l: 'tradition',
        r: ['book:sira'],
      },
    ],
  },
  bilal_ibn_rabah: {
    story: t(
      'An Abyssinian slave in Makkah who believed early, was tortured for it, and was freed by Abu Bakr. He became the Prophet’s ﷺ muezzin; the Prophet ﷺ heard his footsteps ahead of him in Paradise.',
      'Un esclave abyssin de La Mecque qui crut tôt, fut torturé pour cela, et fut affranchi par Abu Bakr. Il devint le muezzin du Prophète ﷺ, qui entendit ses pas devant lui au Paradis.',
      'عبد حبشي بمكة آمن مبكرًا فعُذّب، فأعتقه أبو بكر، وصار مؤذن النبي ﷺ الذي سمع دفّ نعليه بين يديه في الجنة.',
      'Un esclavo abisinio de La Meca que creyó pronto, fue torturado por ello y liberado por Abu Bakr. Fue el almuédano del Profeta ﷺ, que oyó sus pasos delante de él en el Paraíso.',
    ),
    challenges: [
      {
        text: t(
          'His masters tortured him under the Makkan sun to make him give up Islam; he only repeated: “One, One.”',
          'Ses maîtres le torturaient sous le soleil de La Mecque pour qu’il renie l’islam ; il ne faisait que répéter : « Un, Un. »',
          'عذّبه ساداته في حرّ مكة ليرتدّ، فما زاد على قوله: أحد أحد.',
          'Sus amos lo torturaban bajo el sol de La Meca para que renegara del islam; él solo repetía: «Uno, Uno».',
        ),
        l: 'hadith',
        r: ['ibnmajah:150'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He endured the torture rather than deny his Lord, and after his freedom spent his life calling people to prayer.',
          'Il endura la torture plutôt que de renier son Seigneur, et, une fois libre, passa sa vie à appeler les gens à la prière.',
          'صبر على العذاب ولم يكفر بربه، ثم قضى حياته بعد عتقه يدعو الناس إلى الصلاة.',
          'Soportó la tortura antes que negar a su Señor, y, ya libre, pasó la vida llamando a la gente a la oración.',
        ),
        l: 'hadith',
        r: ['bukhari:3754', 'bukhari:1149'],
      },
    ],
  },
  salman_al_farsi: {
    story: t(
      'A Persian who left his homeland searching for the truth and was sold into slavery on the way, passing “from master to master more than ten times”, until he reached Madinah and believed. The Prophet ﷺ, with his hand on Salman, said that even if faith were at the Pleiades, men of his people would reach it.',
      'Un Perse qui quitta son pays en quête de la vérité et fut vendu comme esclave en chemin, passant « de maître en maître plus de dix fois », jusqu’à atteindre Médine et croire. La main posée sur Salman, le Prophète ﷺ dit que même si la foi était aux Pléiades, des hommes de son peuple l’atteindraient.',
      'فارسي ترك بلده باحثًا عن الحق فبيع في الطريق، فتداوله بضعة عشر من ربّ إلى ربّ حتى بلغ المدينة فآمن، ووضع النبي ﷺ يده عليه وقال: «لو كان الإيمان عند الثريا لناله رجال من هؤلاء».',
      'Un persa que dejó su tierra en busca de la verdad y fue vendido como esclavo en el camino, pasando «de amo en amo más de diez veces», hasta llegar a Medina y creer. Con la mano sobre Salman, el Profeta ﷺ dijo que aunque la fe estuviera en las Pléyades, hombres de su pueblo la alcanzarían.',
    ),
    challenges: [
      {
        text: t(
          'He lost his freedom on the road and was traded more than ten times before he could meet the Prophet ﷺ.',
          'Il perdit sa liberté en chemin et fut vendu plus de dix fois avant de pouvoir rencontrer le Prophète ﷺ.',
          'فقد حريته في الطريق وتداوله أكثر من عشرة أسياد قبل أن يلقى النبي ﷺ.',
          'Perdió su libertad en el camino y fue vendido más de diez veces antes de poder encontrar al Profeta ﷺ.',
        ),
        l: 'hadith',
        r: ['bukhari:3946'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He gave up his family, his country and his comfort for the truth he was seeking.',
          'Il renonça à sa famille, à son pays et à son confort pour la vérité qu’il cherchait.',
          'ترك أهله ووطنه وراحته في طلب الحق.',
          'Renunció a su familia, a su país y a su comodidad por la verdad que buscaba.',
        ),
        l: 'hadith',
        r: ['bukhari:3946', 'bukhari:4897'],
      },
    ],
  },
  abu_hurairah: {
    story: t(
      'He came to Madinah in the last years of the Prophet’s ﷺ life and stayed close to him day and night to learn, which is why he narrated more hadith than any other Companion.',
      'Il arriva à Médine dans les dernières années de la vie du Prophète ﷺ et resta près de lui jour et nuit pour apprendre ; c’est pourquoi il rapporta plus de hadiths que tout autre Compagnon.',
      'قدم المدينة في أواخر حياة النبي ﷺ ولزمه ليلًا ونهارًا يتعلم، ولذلك كان أكثر الصحابة رواية للحديث.',
      'Llegó a Medina en los últimos años de la vida del Profeta ﷺ y permaneció a su lado día y noche para aprender; por eso transmitió más hadices que ningún otro Compañero.',
    ),
    challenges: [
      {
        text: t(
          'He was often so hungry that he pressed his stomach to the ground; he chose this rather than leave the Prophet ﷺ to work in the market.',
          'Il avait souvent si faim qu’il pressait son ventre contre le sol ; il le préférait à quitter le Prophète ﷺ pour travailler au marché.',
          'كان يشتد به الجوع حتى يعتمد بكبده على الأرض، وآثر ذلك على أن يفارق النبي ﷺ للعمل في السوق.',
          'A menudo tenía tanta hambre que apretaba el vientre contra el suelo; lo prefería a dejar al Profeta ﷺ para trabajar en el mercado.',
        ),
        l: 'hadith',
        r: ['bukhari:6452', 'bukhari:118'],
      },
      {
        text: t(
          'His mother refused Islam and spoke badly of the Prophet ﷺ. He came weeping; the Prophet ﷺ prayed “O Allah, guide the mother of Abu Hurairah”, and she became Muslim.',
          'Sa mère refusait l’islam et parlait mal du Prophète ﷺ. Il vint en pleurant ; le Prophète ﷺ pria : « Ô Allah, guide la mère d’Abu Hurayra », et elle devint musulmane.',
          'كانت أمه تأبى الإسلام وتُسمعه في النبي ﷺ ما يكره، فجاء يبكي، فدعا النبي ﷺ: «اللهم اهدِ أم أبي هريرة» فأسلمت.',
          'Su madre rechazaba el islam y hablaba mal del Profeta ﷺ. Él vino llorando; el Profeta ﷺ rezó: «Oh Allah, guía a la madre de Abu Hurayra», y ella se hizo musulmana.',
        ),
        l: 'hadith',
        r: ['muslim:2491'],
      },
    ],
    sacrifices: [
      {
        text: t(
          'He gave up trade and comfort to preserve the Prophet’s ﷺ words, and the Muslims have read them through him ever since.',
          'Il renonça au commerce et au confort pour préserver les paroles du Prophète ﷺ, et les musulmans les lisent par lui depuis.',
          'ترك التجارة والراحة ليحفظ حديث النبي ﷺ، فوصل إلى الأمة عن طريقه.',
          'Renunció al comercio y a la comodidad para preservar las palabras del Profeta ﷺ, y los musulmanes las leen a través de él desde entonces.',
        ),
        l: 'hadith',
        r: ['bukhari:118'],
      },
    ],
  },
}
