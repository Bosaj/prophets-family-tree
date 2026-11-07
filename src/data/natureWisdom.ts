// Why each animal is mentioned in the Qur'an or the Sunnah: the lesson the text itself draws, with its
// source. Where the lesson comes from the commentators rather than the text, the level says so.
import type { L4, Level, Ref } from './types'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

export interface Wisdom {
  text: L4
  l: Level
  r: Ref[]
}

export const WHY_MENTIONED: Record<string, Wisdom> = {
  hudhud: {
    text: t(
      'A small bird brought a great king news of a people who worshipped the sun instead of Allah. Sulayman did not dismiss it, nor accept it blindly: “We will see whether you have told the truth or are a liar.” Truth can come from the humblest messenger, and news must be checked.',
      'Un petit oiseau apporta à un grand roi la nouvelle d’un peuple qui adorait le soleil au lieu d’Allah. Sulayman ne l’écarta pas et ne l’accepta pas aveuglément : « Nous allons voir si tu dis la vérité ou si tu es menteur. » La vérité peut venir du plus humble messager, et une nouvelle doit être vérifiée.',
      'جاء طائر صغير ملكًا عظيمًا بخبر قوم يسجدون للشمس من دون الله، فلم يردّه سليمان ولم يقبله دون تثبت: «سننظر أصدقت أم كنت من الكاذبين». فالحق قد يأتي على لسان أضعف الخلق، والخبر يُتثبّت منه.',
      'Un pequeño pájaro trajo a un gran rey la noticia de un pueblo que adoraba al sol en lugar de Allah. Sulayman no la descartó ni la aceptó a ciegas: «Veremos si dices la verdad o mientes». La verdad puede venir del mensajero más humilde, y las noticias deben comprobarse.',
    ),
    l: 'quran',
    r: ['27:20-28'],
  },
  namlah: {
    text: t(
      'One ant warned her whole colony so that Sulayman’s army would not crush them unaware. The prophet-king smiled and thanked Allah for His favour. A whole surah carries her name: care for one’s community, and gratitude that power does not make deaf. In the Sunnah, a prophet who burned an ant colony after one ant stung him was reproached: “Why not just the one ant?”',
      'Une fourmi avertit toute sa colonie pour que l’armée de Sulayman ne l’écrase pas sans le savoir. Le roi-prophète sourit et remercia Allah de Son bienfait. Une sourate entière porte son nom : souci des siens, et gratitude que le pouvoir ne rend pas sourde. Dans la Sunna, un prophète qui brûla une fourmilière après la piqûre d’une seule fourmi fut repris : « Pourquoi pas seulement cette fourmi ? »',
      'نبّهت نملة قومها لئلا يحطمهم جيش سليمان وهم لا يشعرون، فتبسم ضاحكًا وشكر نعمة ربه، وسُمّيت بها سورة كاملة: رعاية الجماعة، وشكرٌ لا تُصمّه القوة. وفي السنة عوتب نبي أحرق قرية نمل لأن نملة قرصته: «فهلّا نملة واحدة».',
      'Una hormiga avisó a toda su colonia para que el ejército de Sulayman no la aplastara sin darse cuenta. El rey profeta sonrió y agradeció a Allah Su favor. Una sura entera lleva su nombre: cuidado de los suyos y gratitud que el poder no ensordece. En la Sunna, un profeta que quemó un hormiguero tras la picadura de una sola hormiga fue reprendido: «¿Por qué no solo esa hormiga?».',
    ),
    l: 'quran',
    r: ['27:18-19', 'bukhari:3319'],
  },
  hut_yunus: {
    text: t(
      'In the belly of the fish, in layers of darkness, Yunus called: “There is no god but You, glory be to You; I was among the wrongdoers.” Allah answered him, and “thus do We save the believers”. Had he not been of those who glorify Allah, he would have stayed there until the Day of Resurrection.',
      'Dans le ventre du poisson, dans les ténèbres, Yunus appela : « Pas de divinité à part Toi, gloire à Toi ; j’ai été parmi les injustes. » Allah lui répondit, « et c’est ainsi que Nous sauvons les croyants ». S’il n’avait pas été de ceux qui glorifient Allah, il y serait resté jusqu’au Jour de la Résurrection.',
      'نادى يونس في الظلمات: «لا إله إلا أنت سبحانك إني كنت من الظالمين»، فاستجاب الله له، «وكذلك ننجي المؤمنين»، ولولا أنه كان من المسبّحين للبث في بطنه إلى يوم يُبعثون.',
      'En el vientre del pez, en las tinieblas, Yunus llamó: «No hay dios sino Tú, gloria a Ti; fui de los injustos». Allah le respondió, «y así salvamos a los creyentes». Si no hubiera sido de los que glorifican a Allah, habría permanecido allí hasta el Día de la Resurrección.',
    ),
    l: 'quran',
    r: ['21:87-88', '37:139-148'],
  },
  naqat_salih: {
    text: t(
      'The she-camel was a clear sign sent to Thamud, with a share of water on alternate days. They hamstrung her and were destroyed. “We sent the she-camel to Thamud as a visible sign, but they wronged her”: a sign seen and then rejected brings judgement.',
      'La chamelle était un signe évident envoyé aux Thamud, avec un tour d’eau un jour sur deux. Ils lui coupèrent les jarrets et furent anéantis. « Nous avons apporté aux Thamud la chamelle, signe visible, mais ils lui firent du tort » : un signe vu puis rejeté attire le châtiment.',
      'كانت الناقة آية بيّنة لثمود، لها شِرب يوم ولهم شرب يوم، فعقروها فأُهلكوا: «وآتينا ثمود الناقة مبصرة فظلموا بها»؛ فمن رأى الآية ثم ردّها حلّ به العقاب.',
      'La camella fue un signo evidente enviado a Zamud, con su turno de agua un día de cada dos. La desjarretaron y fueron destruidos. «Dimos a Zamud la camella como signo visible, pero fueron injustos con ella»: un signo visto y luego rechazado trae el castigo.',
    ),
    l: 'quran',
    r: ['17:59', '26:155-158', '91:11-14'],
  },
  kalb_kahf: {
    text: t(
      'The dog lay at the mouth of the cave, stretching its forelegs, and the Qur’an counts it with the young believers. The commentators drew the lesson that the company of righteous people honours even those who simply stay with them.',
      'Le chien était couché à l’entrée de la grotte, les pattes étendues, et le Coran le compte avec les jeunes croyants. Les commentateurs en ont tiré que la compagnie des gens de bien honore même ceux qui ne font que rester avec eux.',
      'كان كلبهم باسطًا ذراعيه بالوصيد، وذكره القرآن معدودًا معهم. واستنبط المفسرون أن صحبة الصالحين يشرف بها حتى من لزمهم.',
      'El perro yacía a la entrada de la cueva con las patas extendidas, y el Corán lo cuenta junto a los jóvenes creyentes. Los comentaristas extrajeron que la compañía de la gente de bien honra incluso a quien solo permanece con ella.',
    ),
    l: 'tradition',
    r: ['18:18', '18:22', 'book:qisas'],
  },
  baqarah: {
    text: t(
      'The Children of Israel were told to slaughter a cow so that a murder could be solved. They kept asking for details and made it hard for themselves, “and they nearly did not do it”. Obey a clear command without hunting for excuses; and Allah shows how He brings the dead to life.',
      'Il fut ordonné aux Enfants d’Israël d’égorger une vache pour élucider un meurtre. Ils multiplièrent les questions et se compliquèrent la tâche, « et ils faillirent ne pas le faire ». Obéir à un ordre clair sans chercher d’échappatoires ; et Allah montre comment Il redonne vie aux morts.',
      'أُمر بنو إسرائيل بذبح بقرة ليُكشف القاتل، فأكثروا السؤال وشدّدوا على أنفسهم، «وما كادوا يفعلون». فامتثل الأمر الواضح دون تعنّت، وكذلك يحيي الله الموتى.',
      'Se ordenó a los Hijos de Israel sacrificar una vaca para resolver un asesinato. Multiplicaron las preguntas y se lo complicaron, «y poco faltó para que no lo hicieran». Obedecer una orden clara sin buscar evasivas; y Allah muestra cómo devuelve la vida a los muertos.',
    ),
    l: 'quran',
    r: ['2:67-73'],
  },
  fil: {
    text: t(
      'An army with an elephant marched to destroy the Ka‘bah, and Allah turned its plan into ruin with flocks of birds. Allah protects His House, and the mightiest force is nothing against Him. Years later, when the Prophet’s ﷺ camel knelt at al-Hudaybiyah, he said she was held back by “the One who held back the elephant”.',
      'Une armée accompagnée d’un éléphant marcha pour détruire la Ka‘ba, et Allah fit échouer son plan par des nuées d’oiseaux. Allah protège Sa Maison, et la plus grande force n’est rien face à Lui. Des années plus tard, quand la chamelle du Prophète ﷺ s’agenouilla à al-Hudaybiya, il dit qu’elle était retenue par « Celui qui a retenu l’éléphant ».',
      'سار جيش معه فيل لهدم الكعبة، فجعل الله كيدهم في تضليل بطير أبابيل؛ فالله حافظ بيته، ولا تغني القوة شيئًا أمامه. ولما بركت ناقة النبي ﷺ بالحديبية قال: «حبسها حابس الفيل».',
      'Un ejército con un elefante marchó para destruir la Kaaba, y Allah desbarató su plan con bandadas de pájaros. Allah protege Su Casa, y la mayor fuerza no es nada ante Él. Años después, cuando la camella del Profeta ﷺ se arrodilló en al-Hudaybiya, dijo que la retenía «Quien retuvo al elefante».',
    ),
    l: 'quran',
    r: ['105:1-5', 'bukhari:2731'],
  },
  nahl: {
    text: t(
      'Allah “inspired the bee” to build its homes and to follow the paths of its Lord, and from its belly comes a drink of many colours, “in which there is healing for people”. A surah carries its name: order and benefit in creation are signs “for people who reflect”.',
      'Allah « a inspiré l’abeille » à bâtir ses demeures et à suivre les chemins de son Seigneur, et de son ventre sort une boisson aux couleurs variées, « où il y a une guérison pour les gens ». Une sourate porte son nom : l’ordre et le bienfait de la création sont des signes « pour des gens qui réfléchissent ».',
      '«وأوحى ربك إلى النحل» أن تتخذ بيوتها وتسلك سبل ربها، فيخرج من بطونها شراب مختلف ألوانه «فيه شفاء للناس»، وسُمّيت بها سورة؛ فنظام الخلق ونفعه آيات «لقوم يتفكرون».',
      'Allah «inspiró a la abeja» a construir sus moradas y a seguir los caminos de su Señor, y de su vientre sale una bebida de colores variados «en la que hay curación para la gente». Una sura lleva su nombre: el orden y el beneficio de la creación son signos «para gente que reflexiona».',
    ),
    l: 'quran',
    r: ['16:68-69'],
  },
  dhib_yusuf: {
    text: t(
      'Yusuf’s brothers claimed a wolf had eaten him and brought his shirt with false blood. The wolf was innocent of their lie. Ya‘qub saw through it and answered with “beautiful patience”, seeking Allah’s help: the story teaches patience under betrayal.',
      'Les frères de Yusuf prétendirent qu’un loup l’avait dévoré et rapportèrent sa chemise tachée d’un faux sang. Le loup était innocent de leur mensonge. Ya‘qub ne s’y trompa pas et répondit par une « belle patience », en demandant l’aide d’Allah : l’histoire enseigne la patience face à la trahison.',
      'زعم إخوة يوسف أن الذئب أكله وجاؤوا على قميصه بدم كذب، والذئب بريء من كذبهم؛ ففطن يعقوب وقال: «فصبر جميل والله المستعان»، فهي درس في الصبر على الخيانة.',
      'Los hermanos de Yusuf afirmaron que un lobo lo había devorado y trajeron su camisa con sangre falsa. El lobo era inocente de su mentira. Ya‘qub no se dejó engañar y respondió con una «hermosa paciencia», pidiendo la ayuda de Allah: la historia enseña paciencia ante la traición.',
    ),
    l: 'quran',
    r: ['12:13-18'],
  },
  ghurab: {
    text: t(
      'After the first murder, Allah sent a raven scratching the ground to show Adam’s son how to bury his brother. He cried: “Woe to me! Could I not even be like this raven?” and became one of the regretful. Right after, the Qur’an says that killing one soul unjustly is like killing all mankind.',
      'Après le premier meurtre, Allah envoya un corbeau gratter la terre pour montrer au fils d’Adam comment ensevelir son frère. Il s’écria : « Malheur à moi ! Suis-je incapable d’être comme ce corbeau ? » et devint de ceux qui regrettent. Aussitôt après, le Coran dit que tuer une âme injustement revient à tuer tous les hommes.',
      'بعد أول جريمة قتل بعث الله غرابًا يبحث في الأرض ليُري ابن آدم كيف يواري سوأة أخيه، فقال: «يا ويلتا أعجزت أن أكون مثل هذا الغراب» فأصبح من النادمين، وعقّب القرآن بأن من قتل نفسًا بغير حق فكأنما قتل الناس جميعًا.',
      'Tras el primer asesinato, Allah envió un cuervo que escarbaba la tierra para mostrar al hijo de Adán cómo enterrar a su hermano. Exclamó: «¡Ay de mí! ¿No soy capaz de ser como este cuervo?» y fue de los arrepentidos. Justo después, el Corán dice que matar a un alma injustamente es como matar a toda la humanidad.',
    ),
    l: 'quran',
    r: ['5:27-32'],
  },
  ankabut: {
    text: t(
      'Those who take protectors other than Allah are like the spider that builds a house, “and the frailest of houses is the spider’s house, if they only knew”. A surah carries its name: whatever one relies on besides Allah gives no real shelter.',
      'Ceux qui prennent des protecteurs en dehors d’Allah ressemblent à l’araignée qui se bâtit une maison, « et la plus fragile des maisons est celle de l’araignée, s’ils savaient ». Une sourate porte son nom : ce sur quoi l’on s’appuie en dehors d’Allah n’offre aucun véritable abri.',
      'مثل الذين اتخذوا من دون الله أولياء كمثل العنكبوت اتخذت بيتًا، «وإن أوهن البيوت لبيت العنكبوت لو كانوا يعلمون»، وسُمّيت بها سورة: كل ما يُعتمد عليه من دون الله لا يحمي.',
      'Los que toman protectores fuera de Allah son como la araña que se construye una casa, «y la más frágil de las casas es la de la araña, si supieran». Una sura lleva su nombre: aquello en que uno se apoya fuera de Allah no da verdadero refugio.',
    ),
    l: 'quran',
    r: ['29:41'],
  },
  ba_udah: {
    text: t(
      'Allah is not shy to give an example of a gnat, or of something above it. Believers know it is the truth from their Lord; others ask what Allah means by such an example. Nothing in creation is too small to teach, and how one receives Allah’s examples shows what is in the heart.',
      'Allah n’a pas honte de donner en exemple un moustique, ou ce qui est au-dessus. Les croyants savent que c’est la vérité venant de leur Seigneur ; les autres demandent ce qu’Allah veut dire par là. Rien dans la création n’est trop petit pour enseigner, et la façon de recevoir les exemples d’Allah révèle le cœur.',
      'إن الله لا يستحيي أن يضرب مثلًا بعوضة فما فوقها؛ فالمؤمنون يعلمون أنه الحق من ربهم، والآخرون يقولون ماذا أراد الله بهذا مثلًا. فلا شيء في الخلق أصغر من أن يكون عبرة، وطريقة تلقي أمثال الله تكشف ما في القلب.',
      'Allah no se avergüenza de poner como ejemplo un mosquito, o algo mayor. Los creyentes saben que es la verdad de su Señor; otros preguntan qué quiere decir Allah con ello. Nada en la creación es demasiado pequeño para enseñar, y cómo se reciben los ejemplos de Allah revela el corazón.',
    ),
    l: 'quran',
    r: ['2:26'],
  },
  khayl_adiyat: {
    text: t(
      'Allah swears by the charging horses that pant and strike sparks at dawn, then says: “Indeed, man is ungrateful to his Lord.” The horse gives all its strength to its rider; the oath sets that loyalty against human ingratitude. Horses were created “for you to ride and as adornment”.',
      'Allah jure par les coursiers haletants qui font jaillir des étincelles à l’aube, puis dit : « L’homme est très ingrat envers son Seigneur. » Le cheval donne toute sa force à son cavalier ; le serment oppose cette fidélité à l’ingratitude humaine. Les chevaux ont été créés « pour que vous les montiez, et pour l’apparat ».',
      'أقسم الله بالعاديات ضبحًا الموريات قدحًا ثم قال: «إن الإنسان لربه لكنود»؛ فالفرس يبذل كل قوته لصاحبه، والقسم يقابل وفاءه بجحود الإنسان، والخيل خُلقت «لتركبوها وزينة».',
      'Allah jura por los corceles que galopan jadeantes y sacan chispas al alba, y luego dice: «El hombre es ingrato con su Señor». El caballo da toda su fuerza a su jinete; el juramento opone esa lealtad a la ingratitud humana. Los caballos fueron creados «para que los montéis y como adorno».',
    ),
    l: 'quran',
    r: ['100:1-6', '16:8'],
  },
  buraq: {
    text: t(
      'The Buraq is the mount of the Night Journey: a white animal, its stride reaching as far as its sight. The Qur’an tells of the journey from the Sacred Mosque to al-Aqsa; the hadith describes the mount. It shows the honour given to the Prophet ﷺ and that the journey was real.',
      'Le Buraq est la monture du Voyage nocturne : un animal blanc dont le pas atteint aussi loin que porte son regard. Le Coran relate le voyage de la Mosquée sacrée à al-Aqsa ; le hadith décrit la monture. Il montre l’honneur fait au Prophète ﷺ et la réalité du voyage.',
      'البراق دابة الإسراء، أبيض، يضع حافره عند منتهى طرفه. ذكر القرآن الإسراء من المسجد الحرام إلى المسجد الأقصى، ووصفت السنة الدابة، وفي ذلك تكريم للنبي ﷺ وبيان أن الرحلة حقيقة.',
      'El Buraq es la montura del Viaje nocturno: un animal blanco cuyo paso llega tan lejos como su vista. El Corán relata el viaje de la Mezquita Sagrada a al-Aqsa; el hadiz describe la montura. Muestra el honor dado al Profeta ﷺ y que el viaje fue real.',
    ),
    l: 'hadith',
    r: ['17:1', 'bukhari:3207', 'muslim:162'],
  },
  tayr_ababil: {
    text: t(
      'Flocks of birds pelted the army of the Elephant with stones of baked clay and left them like eaten straw. Allah’s soldiers can be the smallest creatures; no army is safe when it sets out against Him.',
      'Des nuées d’oiseaux bombardèrent l’armée de l’Éléphant de pierres d’argile cuite et la laissèrent comme de la paille mâchée. Les soldats d’Allah peuvent être les plus petites créatures ; aucune armée n’est à l’abri quand elle se dresse contre Lui.',
      'أرسل الله على أصحاب الفيل طيرًا أبابيل ترميهم بحجارة من سجيل فجعلهم كعصف مأكول؛ فجنود الله قد تكون أصغر الخلق، ولا جيش يأمن إذا خرج لحربه.',
      'Bandadas de pájaros lanzaron al ejército del Elefante piedras de arcilla cocida y lo dejaron como paja comida. Los soldados de Allah pueden ser las criaturas más pequeñas; ningún ejército está a salvo cuando se levanta contra Él.',
    ),
    l: 'quran',
    r: ['105:3-5'],
  },
  qittah: {
    text: t(
      'A woman entered the Fire because of a cat she locked up, neither feeding it nor letting it eat from the earth. The Prophet ﷺ said cats are not impure, “they are among those who go around among you”, and that there is a reward for kindness to every living creature. Mercy to animals is part of faith.',
      'Une femme entra en Enfer à cause d’une chatte qu’elle avait enfermée, sans la nourrir ni la laisser manger ce qu’offre la terre. Le Prophète ﷺ a dit que le chat n’est pas impur, « il fait partie de ceux qui circulent parmi vous », et qu’il y a une récompense pour la bonté envers tout être vivant. La miséricorde envers les animaux fait partie de la foi.',
      'دخلت امرأة النار في هرة حبستها فلم تطعمها ولم تدعها تأكل من خشاش الأرض، وقال النبي ﷺ في الهرة: «إنها ليست بنجس، إنها من الطوافين عليكم»، و«في كل كبد رطبة أجر»؛ فالرحمة بالحيوان من الدين.',
      'Una mujer entró en el Fuego por una gata que encerró, sin alimentarla ni dejarla comer de lo que da la tierra. El Profeta ﷺ dijo que el gato no es impuro, «es de los que andan entre vosotros», y que hay recompensa por la bondad con todo ser vivo. La misericordia con los animales es parte de la fe.',
    ),
    l: 'hadith',
    r: ['bukhari:3318', 'abudawud:75', 'bukhari:2363'],
  },
  hamama: {
    text: t(
      'The dove is not named in the Qur’an. The Sunnah makes the game of Makkah inviolable: it may not be hunted or even chased away, so the pigeons of the Sacred Mosque live in safety. The sanctuary is a place of peace for every creature in it.',
      'La colombe n’est pas nommée dans le Coran. La Sunna rend inviolable le gibier de La Mecque : on ne peut ni le chasser ni même l’effaroucher, et les pigeons de la Mosquée sacrée y vivent en sécurité. Le sanctuaire est un lieu de paix pour toute créature qui s’y trouve.',
      'لم تُذكر الحمامة في القرآن، وفي السنة أن صيد مكة لا يُنفّر، فحمام الحرم آمن فيه؛ فالحرم أمان لكل من فيه من الخلق.',
      'La paloma no se nombra en el Corán. La Sunna hace inviolable la caza de La Meca: no se puede cazar ni siquiera espantar, y las palomas de la Mezquita Sagrada viven seguras. El santuario es un lugar de paz para toda criatura que hay en él.',
    ),
    l: 'hadith',
    r: ['bukhari:1833', '3:97'],
  },
  // ---- Added in 2.6.0 ----
  ibil: {
    text: t(
      'The Qur’an names the camel first among the signs people see every day, before the sky, the mountains and the earth (88:17-20): a creature made for the desert that carried people where they could not go. Looking with reflection at ordinary things leads to their Creator.',
      'Le Coran cite le chameau en premier parmi les signes vus chaque jour, avant le ciel, les montagnes et la terre (88:17-20) : une créature faite pour le désert, qui portait les gens là où ils ne pouvaient aller. Regarder avec réflexion les choses ordinaires mène à leur Créateur.',
      'بدأ القرآن بالإبل قبل السماء والجبال والأرض (88:17-20): مخلوق صُنع للصحراء يحمل الناس إلى حيث لا يبلغون، والتأمل في المألوف يدل على الخالق.',
      'El Corán nombra al camello primero entre los signos que se ven cada día, antes del cielo, las montañas y la tierra (88:17-20): una criatura hecha para el desierto que llevaba a la gente adonde no podía llegar. Mirar con reflexión lo ordinario lleva a su Creador.',
    ),
    l: 'quran',
    r: ['88:17-20', '16:7'],
  },
  himar: {
    text: t(
      'Three lessons: Allah revives the dead, as the man of 2:259 watched his donkey brought back to life; knowledge must be lived, not carried like books on a donkey’s back (62:5); and good manners lower the voice (31:19).',
      'Trois leçons : Allah ressuscite les morts, comme l’homme de 2:259 vit son âne revenir à la vie ; le savoir doit être vécu, non porté comme des livres sur le dos d’un âne (62:5) ; et la bonne éducation baisse la voix (31:19).',
      'ثلاثة دروس: الله يحيي الموتى كما رأى صاحب القرية حماره يُحيا (2:259)، والعلم للعمل لا للحمل كالحمار يحمل أسفارًا (62:5)، والأدب خفض الصوت (31:19).',
      'Tres lecciones: Allah resucita a los muertos, como el hombre de 2:259 vio volver a la vida a su asno; el saber debe vivirse, no cargarse como libros sobre un asno (62:5); y la buena educación baja la voz (31:19).',
    ),
    l: 'quran',
    r: ['2:259', '62:5', '31:19'],
  },
  jarad: {
    text: t(
      'Locusts were one of the signs sent to Pharaoh’s people, who promised to believe each time a plague lifted and then broke their word (7:133-135). The Qur’an also likens people rising from their graves to scattered locusts (54:7): countless, confused, hurrying to the call.',
      'Les sauterelles furent l’un des signes envoyés au peuple de Pharaon, qui promettait de croire chaque fois qu’un fléau cessait puis rompait sa parole (7:133-135). Le Coran compare aussi les gens sortant des tombes à des sauterelles éparpillées (54:7) : innombrables, désemparés, pressés vers l’appel.',
      'كان الجراد من الآيات على قوم فرعون، يعدون بالإيمان كلما رُفع البلاء ثم ينكثون (7:133-135)، وشبّه القرآن الخارجين من القبور بالجراد المنتشر (54:7): كثرة وحيرة وإسراعًا إلى الداعي.',
      'Las langostas fueron uno de los signos enviados al pueblo de Faraón, que prometía creer cada vez que cesaba una plaga y luego rompía su palabra (7:133-135). El Corán compara también a quienes salen de las tumbas con langostas dispersas (54:7): incontables, confusos, apresurándose a la llamada.',
    ),
    l: 'quran',
    r: ['7:133-135', '54:7'],
  },
  dafda: {
    text: t(
      'Frogs filled the homes of Pharaoh’s people as one of the signs (7:133): the weakest creature can humble the strongest king. The Sunnah forbids killing them without need.',
      'Les grenouilles envahirent les maisons du peuple de Pharaon comme l’un des signes (7:133) : la plus faible créature peut humilier le roi le plus fort. La Sunna interdit de les tuer sans nécessité.',
      'ملأت الضفادع بيوت قوم فرعون آيةً (7:133): أضعف المخلوقات يذل أقوى الملوك، وقد نهت السنة عن قتلها بلا حاجة.',
      'Las ranas llenaron las casas del pueblo de Faraón como uno de los signos (7:133): la criatura más débil puede humillar al rey más fuerte. La Sunna prohíbe matarlas sin necesidad.',
    ),
    l: 'quran',
    r: ['7:133', 'abudawud:5269'],
  },
  salwa: {
    text: t(
      'Quails were provision sent down in the wilderness (2:57). The story then shows ingratitude: some asked for onions and lentils instead, and Musa asked: “Would you exchange what is better for what is lesser?” (2:61).',
      'Les cailles furent une subsistance envoyée dans le désert (2:57). L’histoire montre ensuite l’ingratitude : certains demandèrent des oignons et des lentilles, et Musa demanda : « Voulez-vous échanger le meilleur contre le moins bon ? » (2:61).',
      'كان السلوى رزقًا أُنزل في التيه (2:57)، ثم ظهر كفران النعمة حين طلبوا البصل والعدس، فقال موسى: «أتستبدلون الذي هو أدنى بالذي هو خير» (2:61).',
      'Las codornices fueron sustento enviado en el desierto (2:57). La historia muestra luego la ingratitud: algunos pidieron cebollas y lentejas, y Musa preguntó: «¿Queréis cambiar lo mejor por lo inferior?» (2:61).',
    ),
    l: 'quran',
    r: ['2:57', '2:61'],
  },
  dhubab: {
    text: t(
      'The fly is the Qur’an’s measure of power: all false gods together could not create one, nor recover what it takes from them (22:73). Something that small shows the gap between the Creator and anything worshipped besides Him.',
      'La mouche est la mesure coranique de la puissance : tous les faux dieux réunis ne pourraient en créer une, ni reprendre ce qu’elle leur enlève (22:73). Une chose si petite montre l’écart entre le Créateur et tout ce qu’on adore en dehors de Lui.',
      'الذباب مقياس القرآن للقدرة: لو اجتمعت الآلهة الباطلة لم تخلقه ولم تستنقذ ما يسلبها (22:73)، فهذا المخلوق الصغير يبين الفرق بين الخالق وما يُعبد من دونه.',
      'La mosca es la medida coránica del poder: todos los falsos dioses juntos no podrían crear una, ni recuperar lo que les quita (22:73). Algo tan pequeño muestra la distancia entre el Creador y todo lo que se adora fuera de Él.',
    ),
    l: 'quran',
    r: ['22:73'],
  },
  farash: {
    text: t(
      'The Qur’an compares people on the Day of Judgement to scattered moths (101:4), weak and confused. The Prophet ﷺ compared himself to a man holding people back from a fire into which moths throw themselves (Bukhari 6483).',
      'Le Coran compare les gens au Jour du Jugement à des papillons éparpillés (101:4), faibles et désemparés. Le Prophète ﷺ s’est comparé à un homme qui retient les gens loin d’un feu où se jettent les papillons (Bukhari 6483).',
      'شبّه القرآن الناس يوم القيامة بالفراش المبثوث (101:4) ضعفًا وحيرة، وشبّه النبي ﷺ نفسه برجل يذبّ الفراش عن النار ويأخذ بحُجَز الناس عنها (البخاري 6483).',
      'El Corán compara a la gente en el Día del Juicio con polillas dispersas (101:4), débiles y confusas. El Profeta ﷺ se comparó con un hombre que aparta a la gente de un fuego en el que se arrojan las polillas (Bujari 6483).',
    ),
    l: 'quran',
    r: ['101:4', 'bukhari:6483'],
  },
  ghanam: {
    text: t(
      'Every prophet herded sheep (Bukhari 2262): guiding a flock teaches patience, gentleness and responsibility for the weak, the qualities of one who guides people. In the case of the flock that ate a field, Allah gave Sulayman understanding (21:79).',
      'Tous les prophètes ont gardé des moutons (Bukhari 2262) : guider un troupeau forme à la patience, à la douceur et à la responsabilité envers les faibles, qualités de celui qui guide les hommes. Dans l’affaire du troupeau qui mangea un champ, Allah donna la compréhension à Sulayman (21:79).',
      'ما من نبي إلا رعى الغنم (البخاري 2262)، فرعيها يربي الصبر والرفق والمسؤولية عن الضعيف، وهي صفات من يقود الناس، وفي قضية الغنم التي نفشت في الحرث فهّمها الله سليمان (21:79).',
      'Todos los profetas pastorearon ovejas (Bujari 2262): guiar un rebaño enseña paciencia, dulzura y responsabilidad por el débil, cualidades de quien guía a la gente. En el caso del rebaño que se comió un campo, Allah dio a Sulayman la comprensión (21:79).',
    ),
    l: 'hadith',
    r: ['bukhari:2262', '21:78-79'],
  },
  hayyah: {
    text: t(
      'The snake was the first sign Musa was shown, and he fled from it until Allah said “do not fear” (20:21). Before Pharaoh the same sign exposed the magicians’ tricks, and they bowed down in faith (7:117-122).',
      'Le serpent fut le premier signe montré à Musa, qui s’enfuit jusqu’à ce qu’Allah lui dise « n’aie pas peur » (20:21). Devant Pharaon, le même signe démasqua les tours des magiciens, qui se prosternèrent en croyants (7:117-122).',
      'كانت الحية أول آية أُريها موسى فولّى حتى قيل له «ولا تخف» (20:21)، وأمام فرعون كشفت الآية سحر السحرة فخرّوا ساجدين مؤمنين (7:117-122).',
      'La serpiente fue el primer signo mostrado a Musa, que huyó hasta que Allah le dijo «no temas» (20:21). Ante Faraón el mismo signo desenmascaró los trucos de los magos, que se postraron creyendo (7:117-122).',
    ),
    l: 'quran',
    r: ['20:17-21', '7:117-122'],
  },
  inab: {
    text: t(
      'Grapes appear among Allah’s provisions that differ in taste though watered by one water, “signs for people who understand” (13:4). Their mention with intoxicants before wine was forbidden (16:67, 5:90) also shows how the law came step by step.',
      'Le raisin figure parmi les dons d’Allah qui diffèrent au goût bien qu’arrosés d’une même eau, « des signes pour des gens qui comprennent » (13:4). Sa mention avec la boisson enivrante avant l’interdiction du vin (16:67, 5:90) montre aussi la progression de la Loi.',
      'العنب من الرزق الذي يُسقى بماء واحد ويختلف طعمه، «إن في ذلك لآيات لقوم يعقلون» (13:4)، وذكره مع السكر قبل تحريم الخمر (16:67، 5:90) يبين تدرج التشريع.',
      'La uva está entre los dones de Allah que difieren en sabor aunque se rieguen con una misma agua, «signos para gente que entiende» (13:4). Su mención con la bebida embriagante antes de prohibirse el vino (16:67, 5:90) muestra también la progresión de la Ley.',
    ),
    l: 'quran',
    r: ['13:4', '16:67', '5:90'],
  },
  khardal: {
    text: t(
      'The mustard seed is the Qur’an’s unit for the smallest deed: hidden in a rock, the heavens or the earth, Allah will bring it out (31:16), and it will be weighed on the Day of Judgement (21:47). No good deed is too small to do, and no sin too small to avoid.',
      'La graine de moutarde est l’unité coranique de la plus petite action : cachée dans un rocher, les cieux ou la terre, Allah la fera venir (31:16), et elle sera pesée au Jour du Jugement (21:47). Aucune bonne action n’est trop petite pour être faite, aucun péché trop petit pour être évité.',
      'حبة الخردل وحدة القرآن لأصغر عمل، يأتي بها الله ولو في صخرة أو في السماوات أو في الأرض (31:16)، وتوزن يوم القيامة (21:47)، فلا يُحقر خير ولا يُستهان بذنب.',
      'El grano de mostaza es la unidad coránica de la obra más pequeña: oculta en una roca, los cielos o la tierra, Allah la traerá (31:16), y se pesará en el Día del Juicio (21:47). Ninguna buena obra es demasiado pequeña, ningún pecado demasiado pequeño para evitarlo.',
    ),
    l: 'quran',
    r: ['31:16', '21:47'],
  },
  sunbulah: {
    text: t(
      'A grain that becomes seven ears of a hundred grains is the Qur’an’s picture of charity: what is given in Allah’s way grows, and He multiplies for whom He wills (2:261). In Yusuf’s story, ears of grain teach planning in years of plenty for years of need (12:47-48).',
      'Un grain qui devient sept épis de cent grains est l’image coranique de l’aumône : ce qui est donné pour Allah fructifie, et Il multiplie pour qui Il veut (2:261). Dans l’histoire de Yusuf, les épis enseignent à prévoir dans l’abondance pour les années de besoin (12:47-48).',
      'الحبة التي تصير سبع سنابل في كل سنبلة مائة حبة مثل الصدقة، يربو ما يُنفق في سبيل الله ويضاعف الله لمن يشاء (2:261)، وفي قصة يوسف تعلّم السنابل التدبير في الرخاء لسنين الشدة (12:47-48).',
      'Un grano que se vuelve siete espigas de cien granos es la imagen coránica de la caridad: lo que se da por Allah crece, y Él multiplica para quien quiere (2:261). En la historia de Yusuf, las espigas enseñan a prever en la abundancia para los años de necesidad (12:47-48).',
    ),
    l: 'quran',
    r: ['2:261', '12:47-48'],
  },
  baql: {
    text: t(
      'These vegetables are named in a story of ingratitude: offered manna and quails, some asked for what the earth grows in Egypt, and Musa asked: “Would you exchange what is better for what is lesser?” (2:61). The lesson is gratitude for what Allah gives.',
      'Ces légumes sont cités dans un récit d’ingratitude : alors qu’ils recevaient la manne et les cailles, certains demandèrent ce que la terre produit en Égypte, et Musa demanda : « Voulez-vous échanger le meilleur contre le moins bon ? » (2:61). La leçon est la gratitude pour ce qu’Allah donne.',
      'ذُكرت هذه البقول في قصة كفران النعمة: رُزقوا المن والسلوى فطلبوا ما تنبت الأرض بمصر، فقال موسى: «أتستبدلون الذي هو أدنى بالذي هو خير» (2:61)، والعبرة شكر ما يرزق الله.',
      'Estas hortalizas se nombran en un relato de ingratitud: recibiendo maná y codornices, algunos pidieron lo que da la tierra en Egipto, y Musa preguntó: «¿Queréis cambiar lo mejor por lo inferior?» (2:61). La lección es la gratitud por lo que Allah da.',
    ),
    l: 'quran',
    r: ['2:61'],
  },
  rayhan: {
    text: t(
      'Fragrant plants are named among the favours of the earth in Surah al-Rahman, each followed by “Which of your Lord’s favours will you deny?” (55:12-13), and as the reward of those brought near at death (56:89). Even a pleasant scent is a blessing to thank Allah for.',
      'Les plantes odorantes sont citées parmi les bienfaits de la terre dans la sourate ar-Rahman, suivies de « Lequel des bienfaits de votre Seigneur nierez-vous ? » (55:12-13), et comme récompense des rapprochés à la mort (56:89). Même un parfum agréable est un bienfait dont il faut remercier Allah.',
      'عُدّ الريحان من نعم الأرض في سورة الرحمن، يتبعه «فبأي آلاء ربكما تكذبان» (55:12-13)، وجعله الله للمقربين عند الموت (56:89)؛ فالرائحة الطيبة نعمة تُشكر.',
      'Las plantas aromáticas se nombran entre los favores de la tierra en la sura ar-Rahman, seguidas de «¿Cuál de los favores de vuestro Señor negaréis?» (55:12-13), y como recompensa de los cercanos al morir (56:89). Incluso un buen aroma es un favor que agradecer a Allah.',
    ),
    l: 'quran',
    r: ['55:12-13', '56:88-89'],
  },
  kafur: {
    text: t(
      'Kafur describes the drink of the righteous in Paradise (76:5-6), named with something people knew as pure and cooling while being far beyond it. In this world it is used in the last washing of the dead (Bukhari 1253): a reminder of the meeting it leads to.',
      'Le kafur décrit la boisson des vertueux au Paradis (76:5-6), nommée par une chose que les gens connaissaient comme pure et rafraîchissante tout en la dépassant de loin. Ici-bas, il sert au dernier lavage des morts (Bukhari 1253) : un rappel de la rencontre vers laquelle on va.',
      'وُصف شراب الأبرار في الجنة بالكافور (76:5-6) بما عرفه الناس طيبًا باردًا وهو فوق ذلك، وفي الدنيا يُجعل في غسل الميت (البخاري 1253) تذكيرًا بلقاء الله.',
      'El kafur describe la bebida de los justos en el Paraíso (76:5-6), nombrada con algo que la gente conocía como puro y refrescante, aunque muy por encima. En este mundo se usa en el último lavado de los difuntos (Bujari 1253): un recordatorio del encuentro al que conduce.',
    ),
    l: 'quran',
    r: ['76:5-6', 'bukhari:1253'],
  },
}
