// "What is Islam?" — a plain introduction for readers who are not Muslim.
// Each statement cites the Qur'an (read from the Mushaf when opened) or an authentic hadith.
import type { L4, Level, Ref } from './types'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

export interface Point {
  title: L4
  text: L4
  l: Level
  r: Ref[]
  grade?: L4
}

export interface Pillar {
  id: string
  n: number
  name: L4
  arabic: string
  what: L4
  why: L4
  r: Ref[]
}

export const INTRO: Point[] = [
  {
    title: t('One God', 'Un seul Dieu', 'إله واحد', 'Un solo Dios'),
    text: t(
      '“Islam” means submitting oneself to God. Muslims worship one God, the Creator, who has no partner, no child and no equal. “Allah” is the Arabic word for God; Arabic-speaking Christians use it too.',
      '« Islam » signifie se soumettre à Dieu. Les musulmans adorent un Dieu unique, le Créateur, qui n’a ni associé, ni enfant, ni égal. « Allah » est le mot arabe pour Dieu ; les chrétiens arabophones l’emploient aussi.',
      'الإسلام هو الاستسلام لله. يعبد المسلمون إلهًا واحدًا هو الخالق، لا شريك له ولا ولد ولا كفء. و«الله» هو اسم الإله في العربية، ويستعمله المسيحيون العرب أيضًا.',
      '«Islam» significa someterse a Dios. Los musulmanes adoran a un solo Dios, el Creador, que no tiene asociado, ni hijo, ni igual. «Allah» es la palabra árabe para Dios; los cristianos de habla árabe también la usan.',
    ),
    l: 'quran',
    r: ['112:1-4'],
  },
  {
    title: t('One message, many prophets', 'Un message, de nombreux prophètes', 'رسالة واحدة وأنبياء كثيرون', 'Un mensaje, muchos profetas'),
    text: t(
      'Muslims believe God sent prophets to every people with the same message, among them Abraham, Moses and Jesus, and that Muhammad ﷺ is the last of them. A Muslim must believe in all of them.',
      'Les musulmans croient que Dieu a envoyé des prophètes à chaque peuple avec le même message, dont Abraham, Moïse et Jésus, et que Muhammad ﷺ est le dernier d’entre eux. Un musulman doit croire en eux tous.',
      'يؤمن المسلمون بأن الله أرسل إلى كل أمة رسولًا بالرسالة نفسها، منهم إبراهيم وموسى وعيسى، وأن محمدًا ﷺ خاتمهم، ويجب على المسلم الإيمان بهم جميعًا.',
      'Los musulmanes creen que Dios envió profetas a cada pueblo con el mismo mensaje, entre ellos Abraham, Moisés y Jesús, y que Muhammad ﷺ es el último de ellos. Un musulmán debe creer en todos.',
    ),
    l: 'quran',
    r: ['2:136', '21:25', '33:40'],
  },
  {
    title: t('Why we exist', 'Pourquoi nous existons', 'لماذا خُلقنا', 'Por qué existimos'),
    text: t(
      'The Qur’an says people were created to worship God. Worship covers prayer, but also honest work, kindness and justice done for God’s sake. Life is a test, and everyone will answer for their deeds on the Last Day.',
      'Le Coran dit que les humains ont été créés pour adorer Dieu. L’adoration comprend la prière, mais aussi le travail honnête, la bonté et la justice accomplis pour Dieu. La vie est une épreuve, et chacun répondra de ses actes au Jour dernier.',
      'يخبر القرآن أن الناس خُلقوا لعبادة الله، والعبادة تشمل الصلاة، وتشمل العمل الصادق والإحسان والعدل ابتغاء وجه الله. والحياة ابتلاء، وكل إنسان مسؤول عن عمله يوم القيامة.',
      'El Corán dice que las personas fueron creadas para adorar a Dios. La adoración incluye la oración, pero también el trabajo honrado, la bondad y la justicia hechos por Dios. La vida es una prueba, y cada uno responderá de sus actos el Último Día.',
    ),
    l: 'quran',
    r: ['51:56', '67:2'],
  },
  {
    title: t('No compulsion', 'Pas de contrainte', 'لا إكراه', 'Sin coacción'),
    text: t(
      'Faith cannot be forced: “There is no compulsion in religion.” The Prophet ﷺ was sent as a mercy to all the worlds.',
      'La foi ne peut être imposée : « Nulle contrainte en religion. » Le Prophète ﷺ a été envoyé comme miséricorde pour les mondes.',
      'الإيمان لا يُفرض بالإكراه: «لا إكراه في الدين»، وقد أُرسل النبي ﷺ رحمة للعالمين.',
      'La fe no se impone: «No hay coacción en la religión». El Profeta ﷺ fue enviado como misericordia para los mundos.',
    ),
    l: 'quran',
    r: ['2:256', '21:107'],
  },
]

export const PILLARS: Pillar[] = [
  {
    id: 'shahada',
    n: 1,
    name: t('The testimony of faith', 'Le témoignage de foi', 'الشهادتان', 'El testimonio de fe'),
    arabic: 'الشهادتان',
    what: t(
      'To declare with conviction: “There is no god but Allah, and Muhammad is the Messenger of Allah.” Saying it sincerely is how a person becomes Muslim.',
      'Déclarer avec conviction : « Il n’y a de divinité qu’Allah, et Muhammad est le Messager d’Allah. » Le dire sincèrement, c’est ainsi qu’on devient musulman.',
      'أن يشهد عن يقين أن لا إله إلا الله وأن محمدًا رسول الله، وبها يدخل الإنسان في الإسلام.',
      'Declarar con convicción: «No hay más dios que Allah, y Muhammad es el Mensajero de Allah». Decirlo con sinceridad es como uno se hace musulmán.',
    ),
    why: t(
      'It frees a person from serving anything created: money, power, other people or oneself. Every prophet called to this same truth.',
      'Elle libère de l’asservissement à toute chose créée : l’argent, le pouvoir, les autres ou soi-même. Tous les prophètes ont appelé à cette même vérité.',
      'تحرّر الإنسان من التعلق بالمخلوقات: المال والسلطة والناس والنفس، وإليها دعا كل الأنبياء.',
      'Libera de servir a cualquier cosa creada: el dinero, el poder, otras personas o uno mismo. Todos los profetas llamaron a esta misma verdad.',
    ),
    r: ['bukhari:8', '47:19', '21:25'],
  },
  {
    id: 'salah',
    n: 2,
    name: t('Prayer', 'La prière', 'الصلاة', 'La oración'),
    arabic: 'الصلاة',
    what: t(
      'Five prayers a day, at dawn, midday, afternoon, sunset and night, facing the Ka‘bah in Makkah, after washing (ablution). Each prayer takes a few minutes.',
      'Cinq prières par jour, à l’aube, à midi, l’après-midi, au coucher du soleil et la nuit, tourné vers la Ka‘ba à La Mecque, après les ablutions. Chaque prière dure quelques minutes.',
      'خمس صلوات في اليوم: الفجر والظهر والعصر والمغرب والعشاء، باتجاه الكعبة بمكة، بعد الوضوء، وكل صلاة دقائق معدودة.',
      'Cinco oraciones al día, al alba, al mediodía, por la tarde, al ocaso y por la noche, mirando hacia la Kaaba en La Meca, tras la ablución. Cada oración dura unos minutos.',
    ),
    why: t(
      'To remember God through the day and keep close to Him. The Qur’an says prayer “restrains from indecency and wrongdoing”.',
      'Pour se souvenir de Dieu tout au long du jour et rester proche de Lui. Le Coran dit que la prière « préserve de la turpitude et du blâmable ».',
      'لذكر الله طوال اليوم والقرب منه، و«إن الصلاة تنهى عن الفحشاء والمنكر».',
      'Para recordar a Dios a lo largo del día y mantenerse cerca de Él. El Corán dice que la oración «aparta de la indecencia y de lo reprobable».',
    ),
    r: ['bukhari:8', '20:14', '29:45', '2:144'],
  },
  {
    id: 'zakat',
    n: 3,
    name: t('Obligatory charity', 'L’aumône obligatoire', 'الزكاة', 'La limosna obligatoria'),
    arabic: 'الزكاة',
    what: t(
      'Each year, 2.5% (a quarter of a tenth) of savings above a minimum amount, held for a full lunar year, is given to the poor and others in need.',
      'Chaque année, 2,5 % (le quart du dixième) de l’épargne dépassant un minimum et détenue une année lunaire entière sont donnés aux pauvres et aux autres nécessiteux.',
      'ربع العشر (2.5%) من المال إذا بلغ النصاب وحال عليه الحول، يُعطى للفقراء والمستحقين.',
      'Cada año, el 2,5 % (la cuarta parte de un décimo) de los ahorros que superan un mínimo y se poseen un año lunar completo se da a los pobres y otros necesitados.',
    ),
    why: t(
      'Wealth is a trust from God. Zakat purifies it and the giver’s heart from greed, and makes the rich responsible for the poor.',
      'La richesse est un dépôt confié par Dieu. La zakat la purifie, purifie le cœur de l’avarice, et rend le riche responsable du pauvre.',
      'المال أمانة من الله، والزكاة تطهّره وتطهّر القلب من الشح، وتجعل الغني مسؤولًا عن الفقير.',
      'La riqueza es un depósito de Dios. El zakat la purifica, purifica el corazón de la avaricia y hace al rico responsable del pobre.',
    ),
    r: ['bukhari:1454', 'abudawud:1573', '9:103', '9:60'],
  },
  {
    id: 'sawm',
    n: 4,
    name: t('Fasting in Ramadan', 'Le jeûne du ramadan', 'صوم رمضان', 'El ayuno de ramadán'),
    arabic: 'صوم رمضان',
    what: t(
      'During the month of Ramadan, no food, drink or marital relations from dawn until sunset. The sick, travellers and others who cannot fast are excused.',
      'Pendant le mois de ramadan, ni nourriture, ni boisson, ni relations conjugales de l’aube au coucher du soleil. Les malades, les voyageurs et ceux qui ne peuvent pas jeûner en sont dispensés.',
      'الإمساك عن الطعام والشراب والجماع من الفجر إلى غروب الشمس في شهر رمضان، ويُعذر المريض والمسافر ومن لا يطيق.',
      'Durante el mes de ramadán, ni comida, ni bebida, ni relaciones conyugales desde el alba hasta la puesta del sol. Los enfermos, los viajeros y quienes no pueden ayunar están dispensados.',
    ),
    why: t(
      '“So that you may become mindful of God.” Fasting trains self-control, and makes one feel what the hungry feel. Ramadan is the month the Qur’an began to be revealed.',
      '« Afin que vous atteigniez la piété. » Le jeûne exerce la maîtrise de soi et fait ressentir ce que ressent l’affamé. Ramadan est le mois où la révélation du Coran a commencé.',
      '«لعلكم تتقون»: الصوم يربّي ضبط النفس ويُشعر بحال الجائع، ورمضان شهر نزول القرآن.',
      '«Para que seáis temerosos de Dios». El ayuno entrena el dominio de sí y hace sentir lo que siente el hambriento. Ramadán es el mes en que comenzó la revelación del Corán.',
    ),
    r: ['bukhari:8', '2:183', '2:185', '2:187'],
  },
  {
    id: 'hajj',
    n: 5,
    name: t('Pilgrimage to Makkah', 'Le pèlerinage à La Mecque', 'حج البيت', 'La peregrinación a La Meca'),
    arabic: 'الحج',
    what: t(
      'Once in a lifetime, for those who are physically and financially able: a journey to Makkah in the month of Dhu al-Hijjah, retracing the steps of Abraham, Hagar and Ishmael.',
      'Une fois dans la vie, pour qui en a la capacité physique et financière : un voyage à La Mecque au mois de dhou al-hijja, sur les pas d’Abraham, d’Agar et d’Ismaël.',
      'مرة في العمر لمن استطاع إليه سبيلًا بدنًا ومالًا: رحلة إلى مكة في ذي الحجة على خطى إبراهيم وهاجر وإسماعيل.',
      'Una vez en la vida, para quien pueda física y económicamente: un viaje a La Meca en el mes de dhu al-hiyya, siguiendo los pasos de Abraham, Agar e Ismael.',
    ),
    why: t(
      'Millions of people of every colour and country stand together in the same simple clothes, equal before God, answering the call Abraham was told to make.',
      'Des millions de personnes de toutes couleurs et de tous pays se tiennent ensemble dans les mêmes habits simples, égales devant Dieu, répondant à l’appel qu’Abraham reçut l’ordre de lancer.',
      'يقف الملايين من كل لون وبلد في لباس بسيط واحد، سواسية أمام الله، ملبّين النداء الذي أُمر إبراهيم أن يؤذّن به.',
      'Millones de personas de todos los colores y países se reúnen con la misma ropa sencilla, iguales ante Dios, respondiendo a la llamada que Abraham recibió la orden de hacer.',
    ),
    r: ['bukhari:8', 'muslim:1337', '3:97', '22:27'],
  },
]

export const FAITH: { name: L4; text: L4 }[] = [
  { name: t('God', 'Dieu', 'الله', 'Dios'), text: t('One, eternal, the Creator of all.', 'Unique, éternel, Créateur de toute chose.', 'الواحد الأحد، خالق كل شيء.', 'Único, eterno, Creador de todo.') },
  { name: t('His angels', 'Ses anges', 'ملائكته', 'Sus ángeles'), text: t('Beings of light who carry out His commands.', 'Des êtres de lumière qui exécutent Ses ordres.', 'خلق من نور يفعلون ما يؤمرون.', 'Seres de luz que cumplen Sus órdenes.') },
  { name: t('His books', 'Ses livres', 'كتبه', 'Sus libros'), text: t('The scriptures He revealed, including the Torah, the Psalms, the Gospel and the Qur’an.', 'Les Écritures qu’Il a révélées, dont la Torah, les Psaumes, l’Évangile et le Coran.', 'الكتب التي أنزلها، ومنها التوراة والزبور والإنجيل والقرآن.', 'Las Escrituras que reveló, entre ellas la Torá, los Salmos, el Evangelio y el Corán.') },
  { name: t('His messengers', 'Ses messagers', 'رسله', 'Sus mensajeros'), text: t('All the prophets, from Adam to Muhammad ﷺ.', 'Tous les prophètes, d’Adam à Muhammad ﷺ.', 'جميع الأنبياء من آدم إلى محمد ﷺ.', 'Todos los profetas, de Adán a Muhammad ﷺ.') },
  { name: t('The Last Day', 'Le Jour dernier', 'اليوم الآخر', 'El Último Día'), text: t('Resurrection, judgement, Paradise and Hell.', 'La résurrection, le jugement, le Paradis et l’Enfer.', 'البعث والحساب والجنة والنار.', 'La resurrección, el juicio, el Paraíso y el Infierno.') },
  { name: t('Divine decree', 'Le destin', 'القدر', 'El decreto divino'), text: t('Nothing happens outside God’s knowledge and will, the good and the bad.', 'Rien n’arrive hors de la science et de la volonté de Dieu, le bien comme le mal.', 'لا يقع شيء خارج علم الله ومشيئته، خيره وشره.', 'Nada ocurre fuera del conocimiento y la voluntad de Dios, lo bueno y lo malo.') },
]

export const QUESTIONS: Point[] = [
  {
    title: t('What do Muslims believe about Jesus?', 'Que croient les musulmans au sujet de Jésus ?', 'ماذا يعتقد المسلمون في عيسى عليه السلام؟', '¿Qué creen los musulmanes sobre Jesús?'),
    text: t(
      'Jesus (‘Isa) is one of the greatest prophets, born of the Virgin Mary by God’s word, the Messiah who performed miracles by God’s permission. Muslims love and honour him, but do not consider him God or the son of God. The Prophet ﷺ said: “I am the closest of people to Jesus son of Mary.”',
      'Jésus (‘Isa) est l’un des plus grands prophètes, né de la Vierge Marie par la parole de Dieu, le Messie qui accomplit des miracles par la permission de Dieu. Les musulmans l’aiment et l’honorent, mais ne le considèrent ni comme Dieu ni comme fils de Dieu. Le Prophète ﷺ a dit : « Je suis le plus proche des gens de Jésus fils de Marie. »',
      'عيسى عليه السلام من أعظم الأنبياء، وُلد من مريم العذراء بكلمة الله، وهو المسيح الذي أجرى الله على يديه المعجزات، يحبه المسلمون ويوقّرونه، ولا يعتقدون أنه إله أو ابن الله. قال النبي ﷺ: «أنا أولى الناس بعيسى ابن مريم».',
      'Jesús (‘Isa) es uno de los más grandes profetas, nacido de la Virgen María por la palabra de Dios, el Mesías que hizo milagros con el permiso de Dios. Los musulmanes lo aman y lo honran, pero no lo consideran Dios ni hijo de Dios. El Profeta ﷺ dijo: «Soy el más cercano de la gente a Jesús hijo de María».',
    ),
    l: 'quran',
    r: ['3:45-47', '19:30', '5:75', 'bukhari:3443'],
  },
  {
    title: t('Why do Muslims face Makkah?', 'Pourquoi les musulmans se tournent-ils vers La Mecque ?', 'لماذا يتجه المسلمون إلى مكة؟', '¿Por qué los musulmanes se orientan hacia La Meca?'),
    text: t(
      'They face the Ka‘bah, the house of worship the Qur’an says Abraham and Ishmael built. They do not worship the building: it gives all Muslims one direction in prayer.',
      'Ils se tournent vers la Ka‘ba, la maison d’adoration que, selon le Coran, Abraham et Ismaël ont bâtie. Ils n’adorent pas l’édifice : il donne à tous les musulmans une même direction dans la prière.',
      'يتجهون إلى الكعبة التي رفع قواعدها إبراهيم وإسماعيل، ولا يعبدون البناء، وإنما تجمع المسلمين على قبلة واحدة.',
      'Se orientan hacia la Kaaba, la casa de adoración que, según el Corán, construyeron Abraham e Ismael. No adoran el edificio: da a todos los musulmanes una misma dirección en la oración.',
    ),
    l: 'quran',
    r: ['2:127', '2:144'],
  },
  {
    title: t('Are men and women equal before God?', 'Hommes et femmes sont-ils égaux devant Dieu ?', 'هل الرجل والمرأة سواء عند الله؟', '¿Son iguales hombres y mujeres ante Dios?'),
    text: t(
      'Yes, in faith, in deeds and in reward: “Whoever does good, male or female, and is a believer, We will give a good life.” God looks at hearts and deeds, not at appearance or wealth.',
      'Oui, dans la foi, les actes et la récompense : « Quiconque fait le bien, homme ou femme, tout en étant croyant, Nous lui ferons vivre une bonne vie. » Dieu regarde les cœurs et les actes, non l’apparence ni la richesse.',
      'نعم في الإيمان والعمل والجزاء: «من عمل صالحًا من ذكر أو أنثى وهو مؤمن فلنحيينه حياة طيبة»، والله لا ينظر إلى الصور والأموال بل إلى القلوب والأعمال.',
      'Sí, en la fe, en las obras y en la recompensa: «A quien obre bien, hombre o mujer, siendo creyente, le haremos vivir una buena vida». Dios mira los corazones y las obras, no la apariencia ni la riqueza.',
    ),
    l: 'quran',
    r: ['16:97', '33:35', 'muslim:2564'],
  },
  {
    title: t('How should a Muslim treat others?', 'Comment un musulman doit-il traiter les autres ?', 'كيف يعامل المسلم الناس؟', '¿Cómo debe tratar un musulmán a los demás?'),
    text: t(
      'With justice and kindness. “None of you truly believes until he loves for his brother what he loves for himself.” Believers are like one body: when one part suffers, the whole body feels it.',
      'Avec justice et bonté. « Aucun de vous n’a vraiment la foi tant qu’il n’aime pas pour son frère ce qu’il aime pour lui-même. » Les croyants sont comme un seul corps : quand une partie souffre, tout le corps le ressent.',
      'بالعدل والإحسان: «لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه»، و«مثل المؤمنين في توادهم وتراحمهم وتعاطفهم مثل الجسد».',
      'Con justicia y bondad. «Ninguno de vosotros cree de verdad hasta que ama para su hermano lo que ama para sí mismo». Los creyentes son como un solo cuerpo: cuando una parte sufre, todo el cuerpo lo siente.',
    ),
    l: 'hadith',
    r: ['bukhari:13', 'muslim:2586', '16:90'],
  },
]

/** 2.11.0: more for readers who are not Muslim (topics inspired by introductions such as IslamiCity's; the text is our own). */
export const BASICS: Point[] = [
  {
    title: t('The word “Islam”', 'Le mot « islam »', 'كلمة «الإسلام»', 'La palabra «islam»'),
    text: t(
      '“Islam” comes from the Arabic root s-l-m, the root of “salam”, peace. It means giving oneself to God, and with it living at peace with Him, with oneself and with others. “The Peace” (al-Salam) is one of God’s names, and the Prophet ﷺ said: “The Muslim is the one from whose tongue and hand the Muslims are safe.”',
      '« Islam » vient de la racine arabe s-l-m, celle de « salam », la paix. Il signifie se remettre à Dieu, et avec cela vivre en paix avec Lui, avec soi-même et avec les autres. « La Paix » (al-Salam) est l’un des noms de Dieu, et le Prophète ﷺ a dit : « Le musulman est celui dont les musulmans sont à l’abri de la langue et de la main. »',
      'الإسلام من مادة «س ل م» التي منها السلام، ومعناه الاستسلام لله، ومعه أن يعيش المرء في سلام مع ربه ونفسه والناس. و«السلام» من أسماء الله، وقال النبي ﷺ: «المسلم من سلم المسلمون من لسانه ويده».',
      '«Islam» viene de la raíz árabe s-l-m, la de «salam», la paz. Significa entregarse a Dios y, con ello, vivir en paz con Él, con uno mismo y con los demás. «La Paz» (al-Salam) es uno de los nombres de Dios, y el Profeta ﷺ dijo: «El musulmán es aquel de cuya lengua y mano están a salvo los musulmanes».',
    ),
    l: 'hadith',
    r: ['59:23', 'bukhari:10'],
  },
  {
    title: t('Muslims are not only Arabs', 'Les musulmans ne sont pas que des Arabes', 'المسلمون ليسوا العرب وحدهم', 'Los musulmanes no son solo árabes'),
    text: t(
      'Most Muslims are not Arabs: the countries with the most Muslims are Indonesia, Pakistan, India and Bangladesh. And not every Arab is Muslim; there are Arab Christians and Jews. The Qur’an is in Arabic and the prayer is said in Arabic, but a person may call on God in any language. The Qur’an says God made people into nations and tribes so that they may know one another, and that the most honoured of them before God is the most mindful of Him.',
      'La plupart des musulmans ne sont pas arabes : les pays qui comptent le plus de musulmans sont l’Indonésie, le Pakistan, l’Inde et le Bangladesh. Et tout Arabe n’est pas musulman ; il y a des Arabes chrétiens et juifs. Le Coran est en arabe et la prière se dit en arabe, mais on peut invoquer Dieu dans toute langue. Le Coran dit que Dieu a fait des humains des peuples et des tribus pour qu’ils se connaissent, et que le plus noble d’entre eux auprès de Dieu est le plus pieux.',
      'أكثر المسلمين ليسوا عربًا، فأكبر البلدان عددًا من المسلمين إندونيسيا وباكستان والهند وبنغلاديش، وليس كل عربي مسلمًا، ففي العرب نصارى ويهود. والقرآن عربي والصلاة بالعربية، أما الدعاء فبأي لسان. وأخبر القرآن أن الله جعل الناس شعوبًا وقبائل ليتعارفوا، وأن أكرمهم عنده أتقاهم.',
      'La mayoría de los musulmanes no son árabes: los países con más musulmanes son Indonesia, Pakistán, la India y Bangladés. Y no todo árabe es musulmán; hay árabes cristianos y judíos. El Corán está en árabe y la oración se dice en árabe, pero se puede invocar a Dios en cualquier idioma. El Corán dice que Dios hizo de las personas pueblos y tribus para que se conozcan, y que el más noble ante Dios es el más piadoso.',
    ),
    l: 'quran',
    r: ['49:13', '30:22'],
  },
  {
    title: t('Who was Muhammad ﷺ?', 'Qui était Muhammad ﷺ ?', 'من هو محمد ﷺ؟', '¿Quién fue Muhammad ﷺ?'),
    text: t(
      'He was born in Makkah around 570 CE. Revelation came to him at forty; he called people to God in Makkah for thirteen years, then emigrated to Madinah in 622 CE (the Hijra) and lived there ten more years until his death in 632 CE. Muslims believe he is the last of the prophets, sent to all people as a mercy, and his life (the Sunnah) shows how the Qur’an is lived.',
      'Il naquit à La Mecque vers 570. La révélation lui vint à quarante ans ; il appela à Dieu à La Mecque pendant treize ans, puis émigra à Médine en 622 (l’Hégire) et y vécut encore dix ans, jusqu’à sa mort en 632. Les musulmans croient qu’il est le dernier des prophètes, envoyé à tous les humains comme une miséricorde, et sa vie (la Sunna) montre comment le Coran se vit.',
      'وُلد بمكة نحو سنة 570م، وبُعث على رأس الأربعين، فمكث بمكة ثلاث عشرة سنة يدعو إلى الله، ثم هاجر إلى المدينة سنة 622م ومكث بها عشر سنين حتى تُوفي سنة 632م. ويؤمن المسلمون أنه خاتم النبيين، أُرسل إلى الناس كافة رحمةً للعالمين، وأن سنته هي التطبيق العملي للقرآن.',
      'Nació en La Meca hacia el año 570. La revelación le llegó a los cuarenta años; llamó a Dios en La Meca durante trece años, luego emigró a Medina en 622 (la Hégira) y vivió allí diez años más, hasta su muerte en 632. Los musulmanes creen que es el último de los profetas, enviado a toda la humanidad como misericordia, y su vida (la Sunna) muestra cómo se vive el Corán.',
    ),
    l: 'hadith',
    r: ['bukhari:3851', '33:40', '34:28', '21:107'],
  },
  {
    title: t('The two sources: the Qur’an and the Sunnah', 'Les deux sources : le Coran et la Sunna', 'المصدران: القرآن والسنة', 'Las dos fuentes: el Corán y la Sunna'),
    text: t(
      'The Qur’an is God’s word, revealed to the Prophet ﷺ in Arabic over twenty-three years; God promises to preserve it. The Sunnah is what the Prophet ﷺ said, did and approved, reported in the hadith; it explains the Qur’an, and the Qur’an tells believers to take what the Messenger gives them. Scholars check each hadith’s chain of narrators, which is why this site shows where every hadith comes from and how it is graded.',
      'Le Coran est la parole de Dieu, révélée au Prophète ﷺ en arabe pendant vingt-trois ans ; Dieu promet de le préserver. La Sunna est ce que le Prophète ﷺ a dit, fait et approuvé, rapporté dans les hadiths ; elle explique le Coran, et le Coran demande aux croyants de prendre ce que le Messager leur donne. Les savants vérifient la chaîne de transmetteurs de chaque hadith ; c’est pourquoi ce site indique d’où vient chaque hadith et son degré.',
      'القرآن كلام الله، نزل على النبي ﷺ بالعربية في ثلاث وعشرين سنة، وتكفّل الله بحفظه. والسنة ما صدر عن النبي ﷺ من قول أو فعل أو تقرير، وهي في كتب الحديث، تبيّن القرآن، وقد أمر القرآن بأخذ ما آتى الرسول. ويفحص العلماء إسناد كل حديث، ولذلك يذكر هذا الموقع مصدر كل حديث وحكمه.',
      'El Corán es la palabra de Dios, revelada al Profeta ﷺ en árabe durante veintitrés años; Dios promete preservarlo. La Sunna es lo que el Profeta ﷺ dijo, hizo y aprobó, transmitido en los hadices; explica el Corán, y el Corán pide a los creyentes tomar lo que el Mensajero les da. Los sabios examinan la cadena de transmisores de cada hadiz; por eso este sitio indica de dónde viene cada hadiz y su grado.',
    ),
    l: 'quran',
    r: ['15:9', '16:44', '59:7'],
  },
  {
    title: t('Every child is born pure', 'Chaque enfant naît pur', 'كل مولود يولد على الفطرة', 'Todo niño nace puro'),
    text: t(
      'Islam has no inherited sin. The Prophet ﷺ said that every child is born on the natural disposition (fitrah). No soul carries the burden of another, and a person answers only for what they do once old enough to be responsible. The door of repentance stays open: the Qur’an tells people never to despair of God’s mercy.',
      'L’islam ne connaît pas de péché héréditaire. Le Prophète ﷺ a dit que tout enfant naît sur la nature originelle (fitra). Nulle âme ne porte le fardeau d’une autre, et chacun ne répond que de ses actes une fois responsable. La porte du repentir reste ouverte : le Coran dit de ne jamais désespérer de la miséricorde de Dieu.',
      'لا خطيئة موروثة في الإسلام، فقد قال النبي ﷺ: «كل مولود يولد على الفطرة»، و«لا تزر وازرة وزر أخرى»، ولا يُحاسب الإنسان إلا على عمله بعد التكليف. وباب التوبة مفتوح، ونهى القرآن عن القنوط من رحمة الله.',
      'El islam no tiene pecado heredado. El Profeta ﷺ dijo que todo niño nace en la disposición natural (fitra). Ningún alma carga con la carga de otra, y cada uno responde solo de lo que hace una vez responsable. La puerta del arrepentimiento sigue abierta: el Corán dice que nunca se desespere de la misericordia de Dios.',
    ),
    l: 'hadith',
    r: ['bukhari:1385', '6:164', '39:53'],
  },
  {
    title: t('What Muslims eat and drink', 'Ce que mangent et boivent les musulmans', 'طعام المسلم وشرابه', 'Lo que comen y beben los musulmanes'),
    text: t(
      'The Qur’an tells people to eat what is lawful and good. It forbids pork, blood, the meat of animals that died by themselves or were offered to other than God, and it forbids wine and gambling; scholars include every intoxicant.',
      'Le Coran dit de manger ce qui est licite et bon. Il interdit le porc, le sang, la chair des bêtes mortes d’elles-mêmes ou sacrifiées à un autre que Dieu, et il interdit le vin et les jeux de hasard ; les savants y incluent tout ce qui enivre.',
      'أمر القرآن بأكل الحلال الطيب، وحرّم الخنزير والدم والميتة وما أُهلّ لغير الله، وحرّم الخمر والميسر، ويدخل في الخمر عند العلماء كل مسكر.',
      'El Corán dice que se coma lo lícito y bueno. Prohíbe el cerdo, la sangre, la carne de animales muertos por sí mismos o sacrificados a otro que Dios, y prohíbe el vino y los juegos de azar; los sabios incluyen todo lo que embriaga.',
    ),
    l: 'quran',
    r: ['2:168', '5:3', '5:90'],
  },
  {
    title: t('Mosques, and the whole earth', 'Les mosquées, et la terre entière', 'المساجد والأرض كلها', 'Las mezquitas, y toda la tierra'),
    text: t(
      'A Muslim may pray anywhere clean: the Prophet ﷺ said the earth was made a place of prayer for him. Praying together in a mosque is better. Three mosques are visited above all others: the Sacred Mosque in Makkah, the Prophet’s Mosque in Madinah and al-Aqsa in Jerusalem.',
      'Un musulman peut prier en tout lieu propre : le Prophète ﷺ a dit que la terre lui a été faite lieu de prière. Prier ensemble à la mosquée est meilleur. Trois mosquées se visitent avant toutes les autres : la Mosquée sacrée à La Mecque, la Mosquée du Prophète à Médine et al-Aqsa à Jérusalem.',
      'يصلي المسلم في أي مكان طاهر، فقد قال النبي ﷺ: «وجُعلت لي الأرض مسجدًا وطهورًا»، والصلاة في جماعة المسجد أفضل. ولا تُشد الرحال إلا إلى ثلاثة مساجد: المسجد الحرام، ومسجد الرسول ﷺ، والمسجد الأقصى.',
      'Un musulmán puede rezar en cualquier lugar limpio: el Profeta ﷺ dijo que la tierra fue hecha para él lugar de oración. Rezar juntos en la mezquita es mejor. Tres mezquitas se visitan por encima de todas: la Mezquita Sagrada en La Meca, la Mezquita del Profeta en Medina y al-Aqsa en Jerusalén.',
    ),
    l: 'hadith',
    r: ['bukhari:335', 'bukhari:1189'],
  },
  {
    title: t('Friday, the two Eids and the calendar', 'Le vendredi, les deux Aïds et le calendrier', 'الجمعة والعيدان والتقويم', 'El viernes, los dos Eid y el calendario'),
    text: t(
      'Friday is the weekly day of gathering: at midday Muslims leave their work for the sermon and the Friday prayer. There are two Eids: Eid al-Fitr at the end of Ramadan, and Eid al-Adha during the pilgrimage, which recalls Abraham’s readiness to sacrifice his son. The Islamic calendar has twelve lunar months and counts its years from the Hijra.',
      'Le vendredi est le jour de rassemblement de la semaine : à midi, les musulmans quittent leur travail pour le sermon et la prière du vendredi. Il y a deux Aïds : l’Aïd al-Fitr à la fin du Ramadan, et l’Aïd al-Adha pendant le pèlerinage, qui rappelle qu’Abraham était prêt à sacrifier son fils. Le calendrier islamique a douze mois lunaires et compte ses années depuis l’Hégire.',
      'الجمعة عيد الأسبوع، يترك المسلمون أعمالهم ظهرًا للخطبة والصلاة. وللمسلمين عيدان: الفطر بعد رمضان، والأضحى في موسم الحج، ويذكّر بفداء إبراهيم ابنه. والتقويم الهجري اثنا عشر شهرًا قمريًا، تُعدّ سنواته من الهجرة.',
      'El viernes es el día semanal de reunión: a mediodía los musulmanes dejan su trabajo para el sermón y la oración del viernes. Hay dos Eid: el Eid al-Fitr al final del Ramadán, y el Eid al-Adha durante la peregrinación, que recuerda que Abraham estuvo dispuesto a sacrificar a su hijo. El calendario islámico tiene doce meses lunares y cuenta sus años desde la Hégira.',
    ),
    l: 'quran',
    r: ['62:9-10', '37:102-107', '9:36'],
  },
  {
    title: t('Becoming Muslim', 'Devenir musulman', 'الدخول في الإسلام', 'Hacerse musulmán'),
    text: t(
      'A person becomes Muslim by bearing witness, with conviction, that there is no god but God and that Muhammad is His Messenger. No ceremony, clergy or fee is needed. The Qur’an says that what came before is forgiven, and that God turns the misdeeds of those who repent and do good into good deeds.',
      'On devient musulman en attestant, avec conviction, qu’il n’y a de dieu que Dieu et que Muhammad est Son Messager. Aucune cérémonie, aucun clergé, aucun frais n’est nécessaire. Le Coran dit que le passé est pardonné, et que Dieu change en bonnes actions les fautes de ceux qui se repentent et font le bien.',
      'يدخل المرء في الإسلام بشهادة أن لا إله إلا الله وأن محمدًا رسول الله عن يقين، بلا مراسم ولا وسيط ولا رسوم. وأخبر القرآن أن ما سلف يُغفر، وأن الله يبدّل سيئات التائبين حسنات.',
      'Uno se hace musulmán atestiguando, con convicción, que no hay dios sino Dios y que Muhammad es Su Mensajero. No hace falta ceremonia, clero ni pago. El Corán dice que lo pasado se perdona, y que Dios cambia en buenas obras las faltas de quienes se arrepienten y hacen el bien.',
    ),
    l: 'quran',
    r: ['47:19', '8:38', '25:70'],
  },
]
