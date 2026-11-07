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
}
