import type { L3 } from './types'

export interface PreAdamEntity {
  id: string
  name: L3
  subTitle: L3
  nature: L3
  era: L3
  quranRefs: string[]
  scholarlySources: {
    author: L3
    work: L3
    citation: L3
  }[]
  summary: L3
  detailedDescription: L3
  theologicalContext: L3
  scientificCorrelation?: L3
}

export const PRE_ADAM_ENTITIES: PreAdamEntity[] = [
  {
    id: 'jinn',
    name: {
      en: 'Al-Jinn (The Pre-Adamic Inhabitants)',
      fr: 'Les Djinns (Habitants pré-adamiques)',
      ar: 'الجن (سكان الأرض قبل آدم)',
    },
    subTitle: {
      en: 'Created from smokeless fire 2,000 years before humankind',
      fr: 'Créés d’un feu pur et sans fumée 2 000 ans avant l’humanité',
      ar: 'خُلقوا من نار السموم قبل بني آدم بألفي عام',
    },
    nature: {
      en: 'Created from a smokeless flame of scorching fire (Mārij min Nār / Nār as-Samūm)',
      fr: 'Créés d’une flamme de feu pur sans fumée (Mārij min Nār / Nār as-Samūm)',
      ar: 'مِن مَّارِجٍ مِّن نَّارٍ، ومِن نَّارِ السَّمُومِ',
    },
    era: {
      en: 'Approx. 2,000 years before Prophet Adam (pbuh)',
      fr: 'Environ 2 000 ans avant le Prophète Adam (psl)',
      ar: 'نحو ألفي عام قبل هبوط آدم عليه السلام',
    },
    quranRefs: ['15:27', '55:15', '2:30'],
    scholarlySources: [
      {
        author: { en: 'Ibn Kathir', fr: 'Ibn Kathir', ar: 'الحافظ ابن كثير' },
        work: { en: 'Al-Bidayah wa-n-Nihayah', fr: 'Al-Bidayah wa-n-Nihayah', ar: 'البداية والنهاية' },
        citation: {
          en: '“The Jinn inhabited the earth before Adam, peace be upon him, by two thousand years. They spread corruption and shed blood, so Allah sent upon them an army of angels who drove them to the islands of the seas.”',
          fr: '« Les djinns habitaient la terre deux mille ans avant Adam, paix sur lui. Ils y semèrent la corruption et firent couler le sang, alors Allah envoya contre eux une armée d’anges qui les chassèrent vers les îles des mers. »',
          ar: '«كانت الجن تسكن الأرض قبل خلق آدم عليه السلام بألفي عام، فأفسدوا فيها وسفكوا الدماء، فبعث الله إليهم جندًا من الملائكة فأجلوهم إلى جزائر البحار ورؤوس الجبال.»',
        },
      },
      {
        author: { en: 'Abdullah ibn Abbas (ra)', fr: 'Abdallah ibn Abbas (ra)', ar: 'عبد الله بن عباس رضي الله عنهما' },
        work: { en: 'Tafsir al-Tabari (Jami‘ al-Bayan)', fr: 'Tafsir al-Tabari', ar: 'تفسير الطبري (جامع البيان)' },
        citation: {
          en: 'Ibn Abbas said: “When the angels said: ‘Will You place therein one who causes corruption and sheds blood?’, they spoke because they had witnessed the bloodshed and warfare of the Jinn on Earth prior to Adam.”',
          fr: 'Ibn Abbas a dit : « Quand les anges dirent : “Vas-Tu y établir quelqu’un qui y sèmera la corruption et y répandra le sang ?”, ils le dirent car ils avaient constaté les guerres et le sang versé par les djinns sur terre avant Adam. »',
          ar: '«قالت الملائكة ذلك قياسًا على ما رأوه من إفساد الجن وسفكهم الدماء في الأرض قبل خلق آدم، فقالوا: أتجعل فيها من يفسد فيها ويسفك الدماء؟»',
        },
      },
    ],
    summary: {
      en: 'The Jinn inhabited the primordial earth long before the creation of Adam (pbuh). Endowed with free will, they established civilizations but eventually succumbed to warfare and bloodshed, leading to angelic intervention.',
      fr: 'Les Djinns peuplèrent la Terre bien avant la création d’Adam (psl). Dotés de libre arbitre, ils bâtirent des civilisations mais finirent par succomber aux guerres fratricides et au sang versé, provoquant l’intervention des armées célestes.',
      ar: 'أمة مكلّفة سكنت الأرض قبل بني آدم بألفي عام، وكان لهم فيها عمارة وحضارات، حتى فشا فيهم البغي وسفك الدماء، فأرسل الله الملائكة لطردهم إلى أقاصي البحار والقفار.',
    },
    detailedDescription: {
      en: 'According to authenticated Qur’anic text (Surah Al-Hijr 15:27 and Ar-Rahman 55:15), the Jinn were created prior to humankind from a smokeless blaze of intense heat. Classical Islamic historiography (Ibn Kathir, Al-Tabari) records that their society degenerated into chaotic warfare. Allah dispatched angels who subdued their rebellious factions, clearing the earth for the honored arrival of humanity’s father, Adam (pbuh).',
      fr: 'Selon le texte coranique authentique (Al-Hijr 15:27 et Ar-Rahman 55:15), les djinns furent créés avant l’homme à partir d’une flamme ardente sans fumée. L’historiographie islamique classique relate que leur société s’enfonça dans la violence. Allah dépêcha des anges pour repousser les factions rebelles, préparant la Terre pour l’arrivée honorée du père de l’humanité, Adam (psl).',
      ar: 'أخبر القرآن الكريم أن الجان خلقهم الله قبل خلق البشر من نار السموم ومارج من نار. وبيّن المفسرون والمؤرخون كالإمام ابن كثير وابن جرير الطبري أن الجن استخلفوا في الأرض، فلما بغى بعضهم على بعض وسفكوا الدماء، أرسل الله جندًا من الملائكة فأجلوهم إلى البحار، وهيأ الأرض لاستخلاف آدم عليه السلام وبنيه.',
    },
    theologicalContext: {
      en: 'Adam is the first human (Abu al-Bashar) and first prophet. The Jinn belong to an entirely separate metaphysical species (created from fire, possessing free will and moral responsibility).',
      fr: 'Adam est le premier être humain (Abou al-Bashar) et le premier prophète. Les djinns constituent une espèce métaphysique distincte créée de feu, dotée de raison et de responsabilité spirituelle.',
      ar: 'آدم عليه السلام هو أبو البشر قاطبة وأول الأنبياء. أما الجن فهم جنس مغاير خُلقوا من نار، وتسبق خلافتهم للأرض استخلاف بني آدم.',
    },
  },
  {
    id: 'hinn_binn',
    name: {
      en: 'Al-Hinn & Al-Binn (The Primordial Earthly Races)',
      fr: 'Al-Hinn et Al-Binn (Les races terrestres primitives)',
      ar: 'الحِنّ والبِنّ (الأمم الأرضية الأولى)',
    },
    subTitle: {
      en: 'Pre-Adamic earthly creatures recorded in classical Islamic historiography',
      fr: 'Créatures terrestres pré-adamiques mentionnées dans les chroniques islamiques classiques',
      ar: 'أمم سكنت الأرض قبل خلق آدم وقبل استخلاف الجن',
    },
    nature: {
      en: 'Primordial physical terrestrial beings of flesh and blood, formed from earth and water',
      fr: 'Êtres physiques terrestres primitifs de chair et de sang, formés de terre et d’eau',
      ar: 'خلق أرضي مادي من طين وماء، ذوو دماء وأجساد حسية',
    },
    era: {
      en: 'Primordial Earth, preceding Adam and concurrent with ancient Jinn epochs',
      fr: 'Terre primordiale, précédant Adam et concomitante aux époques archaïques des djinns',
      ar: 'العصور السحيقة للأرض، قبل خلق آدم ومع بواكير وجود الجن',
    },
    quranRefs: ['2:30'],
    scholarlySources: [
      {
        author: { en: 'Ibn Kathir', fr: 'Ibn Kathir', ar: 'الحافظ ابن كثير' },
        work: { en: 'Al-Bidayah wa-n-Nihayah (Vol 1)', fr: 'Al-Bidayah wa-n-Nihayah', ar: 'البداية والنهاية' },
        citation: {
          en: '“It was narrated from Ibn Abbas: Before the Jinn, there was a creation called Al-Hinn and Al-Binn. When they spread corruption and wickedness upon the earth, the Jinn were empowered over them and banished them.”',
          fr: '« Il est rapporté d’Ibn Abbas : Avant les djinns, il existait une création appelée Al-Hinn et Al-Binn. Lorsqu’ils corrompirent la terre, les djinns prirent le dessus sur eux et les anéantirent. »',
          ar: '«روي عن ابن عباس وغيره: كان قبل الجن خلق يقال لهم الحن والبن، فلما أفسدوا في الأرض سلط الله عليهم الجن فقتلوهم ونفوهم عنها وأسكنوا فيها عوضهم.»',
        },
      },
      {
        author: { en: 'Imam Al-Qurtubi', fr: 'L’Imam Al-Qurtubi', ar: 'الإمام القرطبي' },
        work: { en: 'Al-Jami‘ li-Ahkam al-Qur’an (Tafsir al-Baqarah 2:30)', fr: 'Tafsir al-Qurtubi', ar: 'الجامع لأحكام القرآن' },
        citation: {
          en: '“Scholars cited the Hinn and Binn among the earth’s ancient populations whose bloodshed demonstrated to the angels what earthly physical creatures might do upon the land.”',
          fr: '« Les savants mentionnent les Hinn et Binn parmi les anciennes populations terrestres dont le sang versé fit comprendre aux anges les conséquences des créatures matérielles sur terre. »',
          ar: '«ذكر المفسرون أن الحن والبن كانوا من ساكني الأرض الأولين، وسفكوا فيها الدماء، فاستفادت الملائكة من ذلك علمًا بأن الخلق الأرضي يقع منه الفساد وسفك الدماء.»',
        },
      },
    ],
    summary: {
      en: 'Classical scholars, including Ibn Kathir and Al-Tabari, record that before Adam (and alongside or preceding the Jinn), ancient terrestrial creations named Al-Hinn and Al-Binn inhabited the Earth.',
      fr: 'Les érudits classiques, dont Ibn Kathir et Al-Tabari, rapportent qu’avant Adam (et précédant ou côtoyant les djinns), des créations terrestres primitives nommées Al-Hinn et Al-Binn peuplèrent la Terre.',
      ar: 'أمم وكائنات أرضية وثّقها أئمة التفسير والتاريخ كابن كثير والقرطبي، سكنت البسيطة قبل بني آدم وسفكت الدماء، وهي التي عناها الصحابة والتابعون عند بيان أثر ما شاهده الملائكة.',
    },
    detailedDescription: {
      en: 'In classical Arabic chronicles and exegetical literature, historians record that Earth was inhabited by successive biological creations before human stewardship. Al-Hinn and Al-Binn (and in some narrations Al-Khinn and Al-Dinn) lived upon the land and engaged in warfare. Their extinction or displacement preceded the crowning creation of Prophet Adam (pbuh) as the first morally accountable human Khalifah.',
      fr: 'Dans les chroniques arabes classiques et les textes d’exégèse, les historiens rapportent que la Terre connut des créations biologiques successives avant la royauté humaine. Les Hinn et Binn vécurent sur la terre et s’entretuèrent. Leur disparition précéda la création sanctifiée d’Adam (psl) en tant que premier Khalife doué d’esprit divin et de raison.',
      ar: 'تذكر كتب التواريخ والتفاسير المعتمدة أن الأرض مرت بمراحل خلق متعاقبة قبل استخلاف الإنسان. وجاءت تسمية الحن والبن في مرويات الصحابة والتابعين للدلالة على أجناس أرضية عمرت الأرض ثم بادت بسبب الفساد والحروب قبل اصطفاء أبينا آدم عليه السلام خليفة في الأرض.',
    },
    theologicalContext: {
      en: 'These traditions are categorized in Islamic scholarship as ancient historical narrations (Athār) that shed light on why the angels inquired about bloodshed before Adam’s creation.',
      fr: 'Ces récits sont classés dans l’érudition islamique comme des narrations historiques (Athār) éclairant la question des anges sur le sang versé avant la création d’Adam.',
      ar: 'تُعد هذه الأخبار من الآثار التاريخية التي أوردها المفسرون لتفسير سر قول الملائكة: ﴿أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ﴾.',
    },
  },
  {
    id: 'nasnas',
    name: {
      en: 'Al-Nasnas (Pre-Human Hominids)',
      fr: 'Al-Nasnās (Hominidés pré-humains)',
      ar: 'النَّسْنَاس (الكائنات الشبيهة بالبشر قبل آدم)',
    },
    subTitle: {
      en: 'Upright, bipedal humanoid beings recorded by classical lexicographers and historians',
      fr: 'Créatures humanoïdes bipèdes mentionnées par les lexicographes et historiens classiques',
      ar: 'خلق مستقيم القامة شبيه بالبشر، عاش قبل آدم دون تكليف روحي',
    },
    nature: {
      en: 'Bipedal biological creatures resembling humans physically, but lacking the divine ruh (spirit) and moral accountability (taklif)',
      fr: 'Créatures bipèdes ressemblant physiquement aux hommes, mais dépourvues de l’esprit divin (ruh) et de la responsabilité morale (taklif)',
      ar: 'كائنات حية تمشي على قدمين وتشبه البشر في الخلقة الظاهرة، دون نفخة الروح الإلهية أو التكليف والشرائع',
    },
    era: {
      en: 'Prehistoric epochs of Earth, prior to the descent of Prophet Adam (pbuh)',
      fr: 'Époques préhistoriques de la Terre, avant la descente du Prophète Adam (psl)',
      ar: 'عصور الأرض السحيقة وما قبل التاريخ البشري',
    },
    quranRefs: ['2:30', '15:28-29'],
    scholarlySources: [
      {
        author: { en: 'Ibn Manzur', fr: 'Ibn Manzour', ar: 'ابن منظور' },
        work: { en: 'Lisan al-Arab (Lexicon)', fr: 'Lisan al-Arab', ar: 'لسان العرب' },
        citation: {
          en: '“Al-Nasnas: A creation that was upon the earth resembling humans, yet they were not from the descendants of Adam.”',
          fr: '« Le Nasnās : une création qui se trouvait sur terre ressemblant à l’humain, bien qu’ils ne fussent point de la descendance d’Adam. »',
          ar: '«النسناس: خلق في الأرض على صورة الإنسان، وليسوا من بني آدم ولا من ذريته.»',
        },
      },
      {
        author: { en: 'Al-Mas‘udi', fr: 'Al-Mas‘oudi', ar: 'المسعودي' },
        work: { en: 'Muruj adh-Dhahab (Meadows of Gold)', fr: 'Mouroudj adh-Dhahab', ar: 'مروج الذهب ومعادن الجوهر' },
        citation: {
          en: '“Al-Mas‘udi recorded that God created diverse nations of physical creatures upon the Earth prior to Adam, endowed with upright posture and locomotion before the era of humankind began.”',
          fr: '« Al-Mas‘oudi rapporte que Dieu créa diverses nations de créatures physiques sur Terre avant Adam, dotées de stature droite et de locomotion avant l’ère humaine. »',
          ar: '«ذكر المسعودي أن الله تعالى خلق في الأرض أصنافًا من الخلق المنتصب القامة قبل خلق آدم عليه السلام، تداولوا عمارة الأرض في الدهور الخالية.»',
        },
      },
    ],
    summary: {
      en: 'Classical Arabic lexicons and historical texts document "Al-Nasnas" — bipedal, upright humanoid creatures who lived on Earth before Adam. Modern Islamic scholars correlate these accounts with prehistoric hominid fossil records.',
      fr: 'Les lexiques et textes historiques arabes attestent du « Nasnās » — créatures humanoïdes et bipèdes ayant vécu sur Terre avant Adam. Les savants musulmans contemporains rapprochent ces textes des découvertes fossiles d’hominidés préhistoriques.',
      ar: 'كائنات منتصبة القامة وثقتها المعاجم وكتب التاريخ القديمة، عاشت على الأرض قبل اصطفاء آدم عليه السلام. ويوضح العلماء المعاصرون توافق هذا المفهوم مع أحافير أشباه البشر التي سبقت الإنسان العاقل.',
    },
    detailedDescription: {
      en: 'In classical linguistics and scholarship (Lisan al-Arab, Al-Bahr al-Muhit, Al-Mas‘udi), "Al-Nasnas" describes physical organisms that bore physical resemblance to humans but preceded the breath of the divine Spirit (Ruh) bestowed exclusively upon Prophet Adam (pbuh). When modern paleontology uncovered ancient bipedal hominids (e.g. Neanderthals, Homo erectus), prominent Islamic theologians (such as Sheikh Muhammad Abduh and contemporary scholars) highlighted that Islam never denies the biological existence of pre-Adamic humanoid life; rather, Islam affirms that Adam (pbuh) is the first true Human (Bashar) endowed with spiritual consciousness, moral responsibility, language, and prophethood.',
      fr: 'Dans la linguistique et l’érudition classique, « Al-Nasnās » désigne des organismes qui possédaient une ressemblance anatomique avec l’homme, mais vécurent avant que le Souffle divin (Ruh) ne fût insufflé en Adam (psl). Lorsque la paléontologie moderne découvrit les fossiles d’hominidés bipèdes (Néandertal, Homo erectus), de grands théologiens musulmans soulignèrent que la tradition islamique n’exclut nullement l’existence biologique de créatures humanoïdes pré-adamiques, tout en confirmant qu’Adam (psl) est le premier véritable Humain doué de conscience spirituelle, de raison morale, de langage et de prophétie.',
      ar: 'بينت المعاجم كـ«لسان العرب» أن "النسناس" خلق كان على هيئة الإنسان قبل استخلاف آدم عليه السلام دون أن يحملوا نفخة الروح المكلفة أو العقل التشريعي. ومع الاكتشافات الحفرية الحديثة لبقايا أشباه البشر (كالنياندرتال وهومو إريكتوس)، أكد علماء الفكر الإسلامي أن نصوص الشريعة لا تصادم وجود كائنات حية بيولوجية شبيهة بالإنسان قبل آدم، وأن آدم عليه السلام هو أول إنسان حقيقي كُرِّم بنفخة الروح، والعقل، والبيان، وأسجدت له الملائكة وعُلّم الأسماء كلها.',
    },
    theologicalContext: {
      en: 'Adam (peace be upon him) is the unique Father of Humankind (Abu al-Bashar) directly molded by Allah and given the divine spirit. Any pre-Adamic organisms were biologically distinct, non-Adamic fauna without religious accountability.',
      fr: 'Adam (paix sur lui) est l’unique Père de l’Humanité (Abou al-Bashar), façonné par Allah et recevant le souffle divin. Les créatures pré-adamiques étaient une faune distincte, sans responsabilité morale.',
      ar: 'آدم عليه السلام خُلق خلقًا مستقلاً وشرفه الله بنفخة روحه، وهو أبو البشر أجمعين. وأي كائنات سبقت وجوده كانت مجرد خلق أرضي غير مكلّف ولا يتصل به نسب البشر.',
    },
    scientificCorrelation: {
      en: 'Correlates with paleolithic hominid fossils (Neanderthals, Homo erectus) that roamed the Earth prior to modern Homo sapiens endowed with spiritual consciousness.',
      fr: 'Fait écho aux découvertes d’hominidés paléolithiques (Néandertaliens, Homo erectus) ayant parcouru la Terre avant l’avènement de l’Homme doté de conscience morale.',
      ar: 'يتطابق مع ما تكشفه الحفريات الإحاثية لأجناس أشباه البشر المنقرضة التي عاشت على الأرض قبل فجر الإنسانية الواعية.',
    },
  },
  {
    id: 'angels_dialogue',
    name: {
      en: 'The Celestial Dialogue: Why the Angels Inquired (2:30)',
      fr: 'Le Dialogue Céleste : L’interrogation des Anges (2:30)',
      ar: 'الحوار الملائكي وسر التساؤل: ﴿أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا﴾',
    },
    subTitle: {
      en: 'The divine wisdom behind appointing humanity as stewards of Earth',
      fr: 'La sagesse divine derrière l’établissement de l’humanité comme intendante de la Terre',
      ar: 'الحكمة الإلهية في استخلاف الإنسان وأسرار سؤال الملائكة',
    },
    nature: {
      en: 'Sacred Qur’anic proclamation and dialogue between the Lord of the Worlds and the Angels',
      fr: 'Proclamation coranique sacrée et dialogue entre le Seigneur des Mondes et les Anges',
      ar: 'حوار قرآني قدسي بين رب العزة جل وعلا وملائكته المقربين',
    },
    era: {
      en: 'At the dawn of the creation of Prophet Adam (pbuh)',
      fr: 'À l’aube de la création du Prophète Adam (psl)',
      ar: 'بواكير خلق آدم عليه السلام قبل هبوطه إلى الأرض',
    },
    quranRefs: ['2:30', '2:31-33'],
    scholarlySources: [
      {
        author: { en: 'Tafsir Ibn Kathir', fr: 'Tafsir Ibn Kathir', ar: 'تفسير ابن كثير' },
        work: { en: 'Surah Al-Baqarah, Ayah 30', fr: 'Sourate Al-Baqarah, verset 30', ar: 'تفسير سورة البقرة، الآية 30' },
        citation: {
          en: '“The angels did not ask out of objection or envy, but rather to seek understanding of the divine wisdom, having witnessed the corruption of the previous inhabitants of Earth.”',
          fr: '« Les anges n’ont point posé cette question par contestation ou jalousie, mais pour comprendre la sagesse divine, ayant constaté la corruption des habitants précédents de la Terre. »',
          ar: '«سؤال الملائكة هذا ليس على وجه الاعتراض على الله، ولا على وجه الحسد لبني آدم، وإنما هو سؤال استعلام واستكشاف عن الحكمة في ذلك، لما شاهدوه من إفساد الأمم التي سبقت في الأرض.»',
        },
      },
    ],
    summary: {
      en: 'When Allah declared "Indeed, I will place upon the earth a successive authority (Khalifah)", the angels asked: "Will You place upon it one who causes corruption therein and sheds blood?" The classical answer lies in what transpired on Earth before Adam.',
      fr: 'Quand Allah déclara : « Je vais établir sur la terre un vicaire (Khalife) », les anges demandèrent : « Vas-Tu y établir quelqu’un qui y sèmera la corruption et y répandra le sang ? » La réponse classique réside dans l’histoire de la Terre avant Adam.',
      ar: 'قول الملائكة لرب العزة: ﴿أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ﴾ يُبين علمهم السابق بما جرى في الأرض من حروب وفساد الأمم السابقة كالجن والحن والبن.',
    },
    detailedDescription: {
      en: 'In Surah Al-Baqarah (2:30), Allah announced the impending creation of the human Khalifah. The angels inquired: "Will You place therein one who causes corruption therein and sheds blood, while we praise and sanctify You?" Allah answered: "Indeed, I know that which you do not know." He then demonstrated Adam’s preeminence by teaching him the names of all things, commanding the angels to prostrate before him.',
      fr: 'Dans la sourate Al-Baqarah (2:30), Allah annonça la création du Khalife humain. Les anges demandèrent : « Vas-Tu y établir quelqu’un qui y sèmera la corruption et y répandra le sang, alors que nous célébrons Tes louanges et Te sanctifions ? » Allah répondit : « En vérité, Je sais ce que vous ne savez pas. » Puis Il manifesta la supériorité d’Adam en lui enseignant les noms de toutes choses et en ordonnant aux anges de se prosterner devant lui.',
      ar: 'عندما أعلم الله الملائكة بأنه جاعل في الأرض خليفة، استعلمت الملائكة عن حكمة استخلاف جنس قد يقع منه ما وقع ممن سبقهم. فأجابهم العليم الحكيم: ﴿إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ﴾، ثم أظهر فضل آدم عليهم بتعليمه الأسماء كلها وأمرهم بالسجود له سجود تحية وتكريم.',
    },
    theologicalContext: {
      en: 'Highlights the supreme honor bestowed upon humankind: humanity is tasked with moral stewardship, intellect, and spiritual ascension, surmounting the primal instincts that doomed earlier earthly creatures.',
      fr: 'Souligne la dignité suprême accordée à l’être humain : investi d’une mission morale, d’intellect et d’élévation spirituelle, surpassant les instincts primaires des créatures terrestres précédentes.',
      ar: 'يُبرز كرامة الإنسان ومسؤولية الاستخلاف في الأرض بعمارة الكون بالحق والعدل وعبادة الله وحده.',
    },
  },
]
