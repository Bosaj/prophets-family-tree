// Supplications for the moments of every day, by occasion (in the manner of the classic "fortress of the Muslim" collections).
// Generated from the hadith texts; every Arabic text is copied from the hadith it cites and checked by `npm run verify:duas`.
// Morning, evening, sleep and prayer remembrances already in awqat.ts and the hardship supplications in duas.ts are listed by id
// and resolved by the page, so this file has no value imports (the checker imports it directly).
import type { L4 } from './types'
import type { Supplication } from './duas'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })
const SAHIH_ALBANI = t('Sahih (al-Albani)', 'Sahih (al-Albani)', 'صحيح (الألباني)', 'Sahih (al-Albani)')
const HASAN_ALBANI = t('Hasan (al-Albani)', 'Hasan (al-Albani)', 'حسن (الألباني)', 'Hasan (al-Albani)')
const SAHIH_SPLIT = t(
  'Sahih (al-Albani, Ahmad Shakir); some graded its chain weak',
  'Sahih (al-Albani, Ahmad Shakir) ; certains ont jugé sa chaîne faible',
  'صححه الألباني وأحمد شاكر، وضعّف بعضهم إسناده',
  'Sahih (al-Albani, Ahmad Shakir); algunos juzgaron débil su cadena',
)

export type HisnDua = Supplication & { when: L4 }
export type HisnItem = HisnDua | { from: 'adhkar' | 'hardship'; id: string }
export interface HisnCategory {
  id: string
  title: L4
  items: HisnItem[]
}

export const HISN: HisnCategory[] = [
  {
    id: "morning",
    title: t("Morning and evening", "Matin et soir", "أذكار الصباح والمساء", "Mañana y tarde"),
    items: [
      { from: "adhkar", id: "morning-evening-1" },
      { from: "adhkar", id: "sayyid-istighfar" },
      { from: "adhkar", id: "three-quls" },
      { from: "adhkar", id: "bismillah" },
      { from: "adhkar", id: "bika-asbahna" },
      { from: "adhkar", id: "afiya" },
      { from: "adhkar", id: "subhan-100" },
      { from: "adhkar", id: "tahlil-100" },
    ],
  },
  {
    id: "sleep",
    title: t("Sleep and waking", "Le sommeil et le réveil", "النوم والاستيقاظ", "El sueño y el despertar"),
    items: [
      { from: "adhkar", id: "sleep-1" },
      { from: "adhkar", id: "sleep-2" },
      { from: "adhkar", id: "waking" },
    ],
  },
  {
    id: "home",
    title: t("Home, clothes and the toilet", "La maison, les vêtements et les toilettes", "البيت واللباس والخلاء", "La casa, la ropa y el baño"),
    items: [
      {
        id: "leave-home",
        when: t("Leaving home", "En sortant de chez soi", "عند الخروج من البيت", "Al salir de casa"),
        ar: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
        meaning: t("In the name of Allah, I rely on Allah; there is no might and no power except through Allah. The hadith says that the one who says it is guided, sufficed and protected.", "Au nom d’Allah, je m’en remets à Allah ; il n’y a de force ni de puissance qu’en Allah. Le hadith dit que celui qui le dit est guidé, suffi et protégé.", "يقال له حينئذ: هُديت وكُفيت ووُقيت، كما في الحديث.", "En el nombre de Allah, me encomiendo a Allah; no hay fuerza ni poder sino en Allah. El hadiz dice que quien lo dice es guiado, protegido y le basta."),
        r: ["abudawud:5095"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
      {
        id: "clothes",
        when: t("Putting on a new garment", "En mettant un nouveau vêtement", "عند لبس الثوب", "Al ponerse una prenda"),
        ar: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
        meaning: t("Praise be to Allah who clothed me with this garment and provided it for me, with no might or power from me.", "Louange à Allah qui m’a vêtu de ce vêtement et me l’a accordé sans force ni puissance de ma part.", "حمدٌ لله على نعمة اللباس، واعترافٌ بأنها من فضله لا من حول العبد وقوته.", "Alabado sea Allah, que me vistió con esta prenda y me la concedió sin fuerza ni poder de mi parte."),
        r: ["abudawud:4023"],
        l: 'hadith',
        grade: HASAN_ALBANI,
      },
      {
        id: "toilet-in",
        when: t("Entering the toilet", "En entrant aux toilettes", "عند دخول الخلاء", "Al entrar al baño"),
        ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        meaning: t("O Allah, I seek refuge in You from the male and female devils. He said it before entering.", "Ô Allah, je cherche refuge auprès de Toi contre les démons mâles et femelles. Il le disait avant d’entrer.", "الخُبُث والخبائث: ذكور الشياطين وإناثهم. كان يقوله قبل الدخول.", "Oh Allah, me refugio en Ti de los demonios, machos y hembras. Lo decía antes de entrar."),
        r: ["bukhari:142"],
        l: 'hadith',
      },
      {
        id: "toilet-out",
        when: t("Leaving the toilet", "En sortant des toilettes", "عند الخروج من الخلاء", "Al salir del baño"),
        ar: "غُفْرَانَكَ",
        meaning: t("(I ask) Your forgiveness.", "(Je demande) Ton pardon.", "أي: أسألك غفرانك.", "(Te pido) Tu perdón."),
        r: ["abudawud:30"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
    ],
  },
  {
    id: "prayer",
    title: t("The mosque and the prayer", "La mosquée et la prière", "المسجد والصلاة", "La mezquita y la oración"),
    items: [
      { from: "adhkar", id: "after-adhan" },
      {
        id: "mosque-in",
        when: t("Entering the mosque", "En entrant à la mosquée", "عند دخول المسجد", "Al entrar en la mezquita"),
        ar: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        meaning: t("O Allah, open for me the gates of Your mercy.", "Ô Allah, ouvre-moi les portes de Ta miséricorde.", "سؤالُ الله أن يفتح أبواب رحمته عند دخول بيته.", "Oh Allah, ábreme las puertas de Tu misericordia."),
        r: ["muslim:713"],
        l: 'hadith',
      },
      {
        id: "mosque-out",
        when: t("Leaving the mosque", "En sortant de la mosquée", "عند الخروج من المسجد", "Al salir de la mezquita"),
        ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        meaning: t("O Allah, I ask You of Your bounty.", "Ô Allah, je Te demande de Ta grâce.", "سؤالُ الله من فضله عند الخروج إلى طلب الرزق.", "Oh Allah, Te pido de Tu favor."),
        r: ["muslim:713"],
        l: 'hadith',
      },
      {
        id: "istiftah",
        when: t("Opening the prayer", "En ouvrant la prière", "دعاء الاستفتاح", "Al abrir la oración"),
        ar: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَاىَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْ خَطَايَاىَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
        meaning: t("O Allah, put as much distance between me and my sins as You have put between the east and the west. O Allah, cleanse me of sins as a white garment is cleansed of dirt. O Allah, wash away my sins with water, snow and hail. He said it silently between the opening takbir and the recitation. The Maliki school does not say it in the obligatory prayers.", "Ô Allah, éloigne-moi de mes péchés comme Tu as éloigné l’orient de l’occident. Ô Allah, purifie-moi des péchés comme on nettoie le vêtement blanc de la saleté. Ô Allah, lave mes péchés avec l’eau, la neige et la grêle. Il le disait à voix basse entre le takbir d’ouverture et la récitation. L’école malikite ne le dit pas dans les prières obligatoires.", "كان يقوله سرًّا بين تكبيرة الإحرام والقراءة. والمالكية لا يستفتحون في الفريضة.", "Oh Allah, aléjame de mis pecados como alejaste el oriente del occidente. Oh Allah, límpiame de los pecados como se limpia de suciedad la ropa blanca. Oh Allah, lava mis pecados con agua, nieve y granizo. Lo decía en voz baja entre el takbir de apertura y la recitación. La escuela malikí no lo dice en las oraciones obligatorias."),
        r: ["bukhari:744"],
        l: 'hadith',
      },
      {
        id: "ruku-sujud",
        when: t("In bowing and prostration", "En inclinaison et en prosternation", "في الركوع والسجود", "En la inclinación y la postración"),
        ar: "سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ، اللَّهُمَّ اغْفِرْ لِي",
        meaning: t("Glory be to You, O Allah, our Lord, and with Your praise. O Allah, forgive me. ‘A’ishah reports that he said it often in his bowing and his prostration.", "Gloire à Toi, ô Allah, notre Seigneur, et par Ta louange. Ô Allah, pardonne-moi. ‘A’icha rapporte qu’il le disait souvent en inclinaison et en prosternation.", "قالت عائشة: كان يكثر أن يقول ذلك في ركوعه وسجوده.", "Gloria a Ti, oh Allah, Señor nuestro, y con Tu alabanza. Oh Allah, perdóname. ‘A’isha cuenta que lo decía a menudo al inclinarse y al postrarse."),
        r: ["bukhari:794"],
        l: 'hadith',
      },
      { from: "adhkar", id: "after-prayer" },
      { from: "adhkar", id: "tasbih-after-prayer" },
    ],
  },
  {
    id: "food",
    title: t("Food and fasting", "Le repas et le jeûne", "الطعام والصيام", "La comida y el ayuno"),
    items: [
      {
        id: "eat-start",
        when: t("Before eating", "Avant de manger", "قبل الطعام", "Antes de comer"),
        ar: "يَا غُلاَمُ سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ",
        meaning: t("“Boy, say the name of Allah, eat with your right hand and eat from what is in front of you.” He said it to ‘Umar ibn Abi Salamah, a child in his house. The words are “Bismillah”.", "« Garçon, prononce le nom d’Allah, mange de ta main droite et mange de ce qui est devant toi. » Il le dit à ‘Umar ibn Abi Salama, un enfant de sa maison. La parole est « Bismillah ».", "قاله لعمر بن أبي سلمة وهو غلام في حجره. والتسمية: بسم الله.", "«Muchacho, di el nombre de Allah, come con la mano derecha y come de lo que tienes delante.» Se lo dijo a ‘Umar ibn Abi Salama, un niño de su casa. Las palabras son «Bismillah»."),
        r: ["bukhari:5376"],
        l: 'hadith',
      },
      {
        id: "eat-forgot",
        when: t("If you forgot to say it", "Si on a oublié de le dire", "إذا نسي التسمية", "Si olvidaste decirlo"),
        ar: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
        meaning: t("In the name of Allah, at its beginning and at its end.", "Au nom d’Allah, au début et à la fin.", "يقوله من نسي التسمية في أول طعامه ثم ذكرها.", "En el nombre de Allah, al principio y al final."),
        r: ["abudawud:3767"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
      {
        id: "eat-after",
        when: t("After eating", "Après le repas", "بعد الطعام", "Después de comer"),
        ar: "الْحَمْدُ لِلَّهِ كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ، غَيْرَ مَكْفِيٍّ، وَلاَ مُوَدَّعٍ وَلاَ مُسْتَغْنًى عَنْهُ، رَبَّنَا",
        meaning: t("Praise be to Allah, much praise, good and blessed; praise that is never enough, never left and never done without, our Lord.", "Louange à Allah, une louange abondante, bonne et bénie ; une louange qui ne suffit jamais, qu’on ne délaisse pas et dont on ne se passe pas, ô notre Seigneur.", "حمدٌ لا يُكتفى به ولا يُترك ولا يُستغنى عنه. كان يقوله إذا رُفعت مائدته.", "Alabado sea Allah, con alabanza abundante, buena y bendita; alabanza que nunca basta, que no se abandona y de la que no se prescinde, Señor nuestro."),
        r: ["bukhari:5458"],
        l: 'hadith',
      },
      {
        id: "iftar",
        when: t("Breaking the fast", "À la rupture du jeûne", "عند الإفطار", "Al romper el ayuno"),
        ar: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
        meaning: t("The thirst has gone, the veins are moistened, and the reward is certain, if Allah wills.", "La soif est partie, les veines sont humectées et la récompense est acquise, si Allah le veut.", "كان يقوله إذا أفطر.", "La sed se ha ido, las venas se han humedecido y la recompensa es segura, si Allah quiere."),
        r: ["abudawud:2357"],
        l: 'hadith',
        grade: HASAN_ALBANI,
      },
      {
        id: "qadr",
        when: t("On the Night of Decree", "Pendant la Nuit du Destin", "في ليلة القدر", "En la Noche del Decreto"),
        ar: "اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        meaning: t("O Allah, You are Pardoning and Generous, You love to pardon, so pardon me. He taught it to ‘A’ishah when she asked what to say if she knew which night it was.", "Ô Allah, Tu es Celui qui efface, le Généreux, Tu aimes effacer, alors efface mes fautes. Il l’enseigna à ‘A’icha quand elle demanda que dire si elle savait quelle nuit c’était.", "علّمه عائشة حين سألته: إن علمتُ أيّ ليلةٍ ليلةُ القدر ما أقول فيها؟", "Oh Allah, Tú eres el que perdona, el Generoso, amas perdonar, así que perdóname. Se lo enseñó a ‘A’isha cuando preguntó qué decir si sabía qué noche era."),
        r: ["tirmidhi:3513"],
        l: 'hadith',
        grade: SAHIH_SPLIT,
      },
    ],
  },
  {
    id: "travel",
    title: t("Travel", "Le voyage", "السفر", "El viaje"),
    items: [
      {
        id: "travel",
        when: t("Setting out on a journey", "En partant en voyage", "دعاء السفر", "Al emprender un viaje"),
        ar: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الأَهْلِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَآبَةِ الْمَنْظَرِ وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالأَهْلِ",
        meaning: t("Glory to Him who has made this serve us, though we could not have done it ourselves; and to our Lord we shall return. O Allah, we ask You on this journey of ours for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and fold up its distance for us. O Allah, You are the Companion on the journey and the One who looks after the family. O Allah, I seek refuge in You from the hardship of travel, from a sad sight, and from an evil return in wealth and family. He said it after saying “Allahu akbar” three times on his mount; on return he said the same and added: “We return, repenting, worshipping and praising our Lord.”", "Gloire à Celui qui a mis ceci à notre service alors que nous n’aurions pu le maîtriser ; et c’est vers notre Seigneur que nous retournerons. Ô Allah, nous Te demandons dans ce voyage la bonté et la piété, et des œuvres qui Te plaisent. Ô Allah, facilite-nous ce voyage et raccourcis-en la distance. Ô Allah, Tu es le Compagnon du voyage et Celui qui veille sur la famille. Ô Allah, je cherche refuge auprès de Toi contre la fatigue du voyage, un spectacle affligeant et un mauvais retour dans les biens et la famille. Il le disait après avoir dit trois fois « Allahu akbar » sur sa monture ; au retour il disait de même en ajoutant : « Nous revenons, repentants, adorant et louant notre Seigneur. »", "كان يقوله إذا استوى على بعيره بعد ثلاث تكبيرات، وإذا رجع قالهن وزاد: آيبون تائبون عابدون لربنا حامدون.", "Gloria a Quien ha puesto esto a nuestro servicio, pues nosotros no habríamos podido; y a nuestro Señor hemos de volver. Oh Allah, Te pedimos en este viaje bondad y piedad, y obras que Te complazcan. Oh Allah, haznos fácil este viaje y acórtanos su distancia. Oh Allah, Tú eres el Compañero en el viaje y Quien cuida de la familia. Oh Allah, me refugio en Ti de la fatiga del viaje, de una visión triste y de un mal regreso en los bienes y la familia. Lo decía tras decir tres veces «Allahu akbar» sobre su montura; al volver decía lo mismo y añadía: «Volvemos arrepentidos, adorando y alabando a nuestro Señor»."),
        r: ["muslim:1342"],
        l: 'hadith',
      },
    ],
  },
  {
    id: "sick",
    title: t("Sickness, loss and the graves", "La maladie, le deuil et les tombes", "المرض والمصيبة والقبور", "La enfermedad, el duelo y las tumbas"),
    items: [
      {
        id: "sick-visit",
        when: t("Visiting the sick", "En rendant visite à un malade", "عند عيادة المريض", "Al visitar a un enfermo"),
        ar: "لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
        meaning: t("No harm: it is a purification, if Allah wills. He said this when he visited a sick person.", "Pas de mal : c’est une purification, si Allah le veut. Il le disait en rendant visite à un malade.", "أي: المرض مطهِّر من الذنوب. كان يقوله إذا دخل على مريض.", "No pasa nada: es una purificación, si Allah quiere. Lo decía al visitar a un enfermo."),
        r: ["bukhari:3616"],
        l: 'hadith',
      },
      {
        id: "sick-seven",
        when: t("For the sick, seven times", "Pour le malade, sept fois", "للمريض سبع مرات", "Por el enfermo, siete veces"),
        ar: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
        meaning: t("I ask Allah the Mighty, Lord of the mighty Throne, to heal you. The hadith says that a sick person whose time has not come is healed when this is said seven times.", "Je demande à Allah l’Immense, Seigneur du Trône immense, de te guérir. Le hadith dit qu’un malade dont le terme n’est pas venu guérit quand on le dit sept fois.", "في الحديث: ما من مسلم يعود مريضًا لم يحضر أجله فيقوله سبع مرات إلا عوفي.", "Pido a Allah el Inmenso, Señor del Trono inmenso, que te cure. El hadiz dice que el enfermo cuyo plazo no ha llegado se cura cuando se dice siete veces."),
        r: ["abudawud:3106"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
        count: 7,
      },
      {
        id: "calamity",
        when: t("When struck by a loss", "Lors d’un malheur", "عند المصيبة", "Ante una desgracia"),
        ar: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
        meaning: t("We belong to Allah and to Him we return. O Allah, reward me in my loss and give me something better in its place. Umm Salamah said it when Abu Salamah died, and Allah gave her the Prophet ﷺ.", "Nous sommes à Allah et vers Lui nous retournons. Ô Allah, récompense-moi dans mon malheur et donne-moi mieux en échange. Umm Salama le dit à la mort d’Abu Salama, et Allah lui donna le Prophète ﷺ.", "قالته أم سلمة حين مات أبو سلمة، فأخلف الله لها رسولَ الله ﷺ.", "A Allah pertenecemos y a Él volvemos. Oh Allah, recompénsame en mi desgracia y dame algo mejor a cambio. Umm Salama lo dijo al morir Abu Salama, y Allah le dio al Profeta ﷺ."),
        r: ["muslim:918"],
        l: 'hadith',
      },
      {
        id: "condolence",
        when: t("Consoling the bereaved", "Pour consoler une famille en deuil", "في التعزية", "Al dar el pésame"),
        ar: "إِنَّ لِلَّهِ مَا أَخَذَ وَلَهُ مَا أَعْطَى وَكُلٌّ عِنْدَهُ بِأَجَلٍ مُسَمًّى، فَلْتَصْبِرْ وَلْتَحْتَسِبْ",
        meaning: t("To Allah belongs what He took and to Him belongs what He gave, and everything has an appointed term with Him; so be patient and hope for the reward. He sent this to his daughter when her son was dying.", "À Allah appartient ce qu’Il a pris et ce qu’Il a donné, et toute chose a auprès de Lui un terme fixé ; alors patiente et espère la récompense. Il l’envoya à sa fille quand son fils agonisait.", "أرسل به إلى ابنته حين كان ابنها في الموت.", "A Allah pertenece lo que tomó y lo que dio, y todo tiene ante Él un plazo fijado; así que ten paciencia y espera la recompensa. Se lo envió a su hija cuando su hijo agonizaba."),
        r: ["bukhari:1284"],
        l: 'hadith',
      },
      {
        id: "graves",
        when: t("Visiting the graves", "En visitant les tombes", "عند زيارة القبور", "Al visitar las tumbas"),
        ar: "السَّلاَمُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ وَإِنَّا إِنْ شَاءَ اللَّهُ لَلَاحِقُونَ أَسْأَلُ اللَّهَ لَنَا وَلَكُمْ الْعَافِيَةَ",
        meaning: t("Peace be upon you, people of these dwellings, believers and Muslims. We will join you, if Allah wills. I ask Allah for well-being for us and for you. He taught it to his Companions for when they went out to the graves.", "Paix sur vous, habitants de ces demeures, croyants et musulmans. Nous vous rejoindrons, si Allah le veut. Je demande à Allah le salut pour nous et pour vous. Il l’enseigna à ses Compagnons pour leurs visites aux tombes.", "كان يعلّمهم إذا خرجوا إلى المقابر أن يقولوه.", "La paz sea con vosotros, habitantes de estas moradas, creyentes y musulmanes. Nos uniremos a vosotros, si Allah quiere. Pido a Allah bienestar para nosotros y para vosotros. Se lo enseñó a sus Compañeros para cuando visitaran las tumbas."),
        r: ["muslim:975"],
        l: 'hadith',
      },
    ],
  },
  {
    id: "worry",
    title: t("Worry, fear and anger", "Le souci, la peur et la colère", "الهم والخوف والغضب", "La preocupación, el miedo y el enfado"),
    items: [
      {
        id: "worry",
        when: t("Against worry and debt", "Contre le souci et la dette", "من الهم والدَّين", "Contra la preocupación y la deuda"),
        ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
        meaning: t("O Allah, I seek refuge in You from worry and grief, from weakness and laziness, from cowardice and miserliness, from the burden of debt and from being overpowered by men. Anas heard him say it often.", "Ô Allah, je cherche refuge auprès de Toi contre le souci et la tristesse, l’incapacité et la paresse, la lâcheté et l’avarice, le poids de la dette et la domination des hommes. Anas l’entendait souvent le dire.", "قال أنس: كنت أسمعه كثيرًا يقول ذلك.", "Oh Allah, me refugio en Ti de la preocupación y la tristeza, de la incapacidad y la pereza, de la cobardía y la avaricia, del peso de la deuda y de ser dominado por los hombres. Anas le oía decirlo a menudo."),
        r: ["bukhari:6369"],
        l: 'hadith',
      },
      { from: "hardship", id: "distress" },
      { from: "hardship", id: "fear" },
      {
        id: "anger",
        when: t("When angry", "Dans la colère", "عند الغضب", "Al enfadarse"),
        ar: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ",
        meaning: t("I seek refuge in Allah from Satan. Two men were insulting each other; he said that if the angry one said these words, his anger would leave him.", "Je cherche refuge auprès d’Allah contre Satan. Deux hommes s’insultaient ; il dit que si celui qui était en colère disait ces mots, sa colère le quitterait.", "استبّ رجلان عنده، فقال: لو قال هذه الكلمة ذهب عنه ما يجد.", "Me refugio en Allah de Satanás. Dos hombres se insultaban; dijo que si el enfadado dijera estas palabras, se le iría el enfado."),
        r: ["bukhari:3282"],
        l: 'hadith',
      },
    ],
  },
  {
    id: "sky",
    title: t("The sky and the weather", "Le ciel et le temps", "السماء والمطر والريح", "El cielo y el tiempo"),
    items: [
      {
        id: "new-moon",
        when: t("Seeing the new crescent", "En voyant le croissant", "عند رؤية الهلال", "Al ver la luna nueva"),
        ar: "اللَّهُمَّ أَهْلِلْهُ عَلَيْنَا بِالْيُمْنِ وَالإِيمَانِ وَالسَّلاَمَةِ وَالإِسْلاَمِ رَبِّي وَرَبُّكَ اللَّهُ",
        meaning: t("O Allah, let it rise over us with blessing and faith, with safety and Islam. My Lord and your Lord is Allah.", "Ô Allah, fais-le se lever sur nous avec bénédiction et foi, avec sécurité et islam. Mon Seigneur et ton Seigneur est Allah.", "كان يقوله إذا رأى الهلال، ويخاطب الهلال: ربي وربك الله.", "Oh Allah, haz que salga sobre nosotros con bendición y fe, con seguridad e islam. Mi Señor y tu Señor es Allah."),
        r: ["tirmidhi:3451"],
        l: 'hadith',
        grade: SAHIH_SPLIT,
      },
      {
        id: "wind",
        when: t("When the wind blows hard", "Quand le vent souffle fort", "عند هبوب الريح", "Cuando sopla el viento fuerte"),
        ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ",
        meaning: t("O Allah, I ask You for its good, the good of what it carries and the good of what it was sent with; and I seek refuge in You from its evil, the evil of what it carries and the evil of what it was sent with.", "Ô Allah, je Te demande son bien, le bien de ce qu’il porte et le bien de ce avec quoi il a été envoyé ; et je cherche refuge auprès de Toi contre son mal, le mal de ce qu’il porte et le mal de ce avec quoi il a été envoyé.", "قالت عائشة: كان إذا عصفت الريح قال ذلك.", "Oh Allah, Te pido su bien, el bien de lo que lleva y el bien de aquello con lo que fue enviado; y me refugio en Ti de su mal, del mal de lo que lleva y del mal de aquello con lo que fue enviado."),
        r: ["muslim:899"],
        l: 'hadith',
      },
      { from: "hardship", id: "rain" },
    ],
  },
  {
    id: "people",
    title: t("With other people", "Avec les autres", "مع الناس", "Con los demás"),
    items: [
      {
        id: "sneeze",
        when: t("Sneezing", "En éternuant", "عند العطاس", "Al estornudar"),
        ar: "إِذَا عَطَسَ أَحَدُكُمْ فَلْيَقُلِ الْحَمْدُ لِلَّهِ‏.‏ وَلْيَقُلْ لَهُ أَخُوهُ أَوْ صَاحِبُهُ يَرْحَمُكَ اللَّهُ‏.‏ فَإِذَا قَالَ لَهُ يَرْحَمُكَ اللَّهُ‏.‏ فَلْيَقُلْ يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ",
        meaning: t("When one of you sneezes, let him say “Praise be to Allah”, and let his brother or companion say to him “May Allah have mercy on you”. When he says it, let him reply: “May Allah guide you and set your affairs right.”", "Quand l’un de vous éternue, qu’il dise « Louange à Allah », et que son frère ou son compagnon lui dise « Qu’Allah te fasse miséricorde ». Quand il le lui dit, qu’il réponde : « Qu’Allah vous guide et améliore votre état. »", "أدب العطاس: الحمد، ثم التشميت، ثم الرد بالدعاء.", "Cuando uno de vosotros estornude, que diga «Alabado sea Allah», y que su hermano o compañero le diga «Que Allah tenga misericordia de ti». Cuando se lo diga, que responda: «Que Allah os guíe y mejore vuestro estado»."),
        r: ["bukhari:6224"],
        l: 'hadith',
      },
      {
        id: "marriage",
        when: t("Congratulating a newly married person", "Pour féliciter un marié", "تهنئة المتزوج", "Al felicitar a un recién casado"),
        ar: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
        meaning: t("May Allah bless you, and bless it for you, and bring you both together in goodness.", "Qu’Allah te bénisse, qu’Il répande Sa bénédiction sur toi et vous unisse dans le bien.", "كان يقوله إذا رفّأ الإنسانَ إذا تزوج.", "Que Allah te bendiga, que derrame Su bendición sobre ti y os una en el bien."),
        r: ["abudawud:2130"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
      {
        id: "majlis",
        when: t("Leaving a gathering", "En quittant une assemblée", "كفارة المجلس", "Al dejar una reunión"),
        ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
        meaning: t("Glory be to You, O Allah, and with Your praise. I bear witness that there is no god but You. I ask Your forgiveness and turn to You in repentance. The hadith says that whatever idle talk happened in the gathering is forgiven.", "Gloire à Toi, ô Allah, et par Ta louange. J’atteste qu’il n’y a de dieu que Toi. Je Te demande pardon et je me repens à Toi. Le hadith dit que les paroles vaines dites dans l’assemblée sont pardonnées.", "في الحديث: من جلس مجلسًا كثر فيه لغطه فقاله قبل أن يقوم غُفر له ما كان في مجلسه ذلك.", "Gloria a Ti, oh Allah, y con Tu alabanza. Atestiguo que no hay dios sino Tú. Te pido perdón y me vuelvo a Ti arrepentido. El hadiz dice que se perdona la palabrería de la reunión."),
        r: ["tirmidhi:3433"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
    ],
  },
]

/** The new supplications of this page, for the checker. */
export const HISN_QUOTES: (Supplication & { where: string })[] = HISN.flatMap((c) =>
  c.items.filter((d): d is HisnDua => 'ar' in d).map((d) => ({ where: `hisn/${c.id}/${d.id}`, ...d })),
)


