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
