/**
 * Holy Scriptures (الكتب والصحف السماوية) revealed to the Prophets of Allah.
 * Comprehensive catalog of Divine Books, their Quranic citations,
 * textual preservation history, and manuscript versions / traditions.
 */

export interface ScriptureVersion {
  id: string
  name: {
    en: string
    fr: string
    ar: string
  }
  language: {
    en: string
    fr: string
    ar: string
  }
  period: {
    en: string
    fr: string
    ar: string
  }
  significance: {
    en: string
    fr: string
    ar: string
  }
  description: {
    en: string
    fr: string
    ar: string
  }
  extantManuscripts: {
    en: string
    fr: string
    ar: string
  }
  variantCountOrStatus: {
    en: string
    fr: string
    ar: string
  }
  theologicalPerspective: {
    en: string
    fr: string
    ar: string
  }
}

export interface ProphetBook {
  id: 'quran' | 'tawrat' | 'zabur' | 'injeel' | 'suhuf_ibrahim' | 'suhuf_idris' | 'suhuf_shith'
  prophetId: string
  prophetName: {
    en: string
    fr: string
    ar: string
  }
  title: {
    en: string
    fr: string
    ar: string
  }
  transliteration: string
  originalLanguage: {
    en: string
    fr: string
    ar: string
  }
  revealedEra: {
    en: string
    fr: string
    ar: string
  }
  revealedLocation: {
    en: string
    fr: string
    ar: string
  }
  quranReferences: Array<{
    surah: number
    ayah: string
    arabicText: string
    translationEn: string
    translationFr: string
  }>
  preservationStatus: 'divinely_preserved' | 'partially_extant' | 'historical_recensions' | 'lost_original'
  versionsCount: number
  versionsSummary: {
    en: string
    fr: string
    ar: string
  }
  theologicalContext: {
    en: string
    fr: string
    ar: string
  }
  imagePath?: string
  versions: ScriptureVersion[]
}

export const SCRIPTURES: ProphetBook[] = [
  {
    id: 'quran',
    prophetId: 'muhammad',
    prophetName: {
      en: 'Muhammad ﷺ',
      fr: 'Muhammad ﷺ',
      ar: 'مُحَمَّدٌ ﷺ',
    },
    title: {
      en: 'The Noble Qur’an',
      fr: 'Le Noble Coran',
      ar: 'القرآن الكريم',
    },
    transliteration: 'Al-Qur’ān al-Karīm',
    originalLanguage: {
      en: 'Classical Arabic (Mudari Qurayshite)',
      fr: 'Arabe classique (Quraychite)',
      ar: 'العربية الفصحى (لسان قريش المبين)',
    },
    revealedEra: {
      en: '610 – 632 CE (23-year prophetic mission)',
      fr: '610 – 632 ap. J.-C. (23 ans de mission)',
      ar: '610 – 632 م (على مدى ٢٣ عاماً نبوياً)',
    },
    revealedLocation: {
      en: 'Makkah al-Mukarramah (Cave of Hira) & Madinah al-Munawwarah',
      fr: 'La Mecque (Grotte de Hira) et Médine l’Illuminée',
      ar: 'مكة المكرمة (غار حراء) والمدينة المنورة',
    },
    quranReferences: [
      {
        surah: 15,
        ayah: '9',
        arabicText: '﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾',
        translationEn: 'Indeed, it is We who sent down the Qur’an and indeed, We will be its guardian.',
        translationFr: 'En vérité, c’est Nous qui avons fait descendre le Rappel, et c’est Nous qui en sommes les gardiens.',
      },
      {
        surah: 2,
        ayah: '2',
        arabicText: '﴿ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ﴾',
        translationEn: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.',
        translationFr: 'C’est le Livre au sujet duquel il n’y a aucun doute, un guide pour les pieux.',
      },
      {
        surah: 41,
        ayah: '41-42',
        arabicText: '﴿وَإِنَّهُ لَكِتَابٌ عَزِيزٌ * لَّا يَأْتِيهِ الْبَاطِلُ مِن بَيْنِ يَدَيْهِ وَلَا مِنْ خَلْفِهِ ۖ تَنزِيلٌ مِّنْ حَكِيمٍ حَمِيدٍ﴾',
        translationEn: 'And indeed, it is an unassailable book. Falsehood cannot approach it from before it or from behind it; [it is] a revelation from a [Lord who is] Wise and Praiseworthy.',
        translationFr: 'Et c’est un Livre inattaquable. Le faux ne l’atteint d’aucune part, ni par devant ni par derrière : c’est une révélation émanant d’un Sage, Digne de louange.',
      },
    ],
    preservationStatus: 'divinely_preserved',
    versionsCount: 1, // Singular canonical consonantal rasm preserved identically across 14 centuries
    versionsSummary: {
      en: '1 Singular Consonantal Text (Rasm Uthmani) preserved identically worldwide, accompanied by the 10 Canonical Mutawatir Recitations (Qira’at) which represent phonetic vocalization traditions from the Prophet ﷺ.',
      fr: '1 Texte consonantique unique (Rasm Othmanien) préservé à l’identique dans le monde entier, accompagné des 10 Récitations canoniques (Qira’at) transmises de façon mutawatir.',
      ar: 'نص إمام واحد موحد (الرسم العثماني) محفوظ حرفاً بحرف، تتفرع منه القراءات العشر المتواترة بالأسانيد المتصلة إلى رسول الله ﷺ دون أدنى تناقض أو اختلاف في المعنى.',
    },
    theologicalContext: {
      en: 'The Qur’an is the eternal, inimitable Word of Allah, preserved by Divine promise without alteration. Unlike earlier scriptures whose preservation was entrusted to their religious communities, Allah Himself guaranteed the preservation of the Qur’an. It serves as the Muhaymin (Criterion and Guardian) over all prior revelations.',
      fr: 'Le Coran est la Parole éternelle et inimitable d’Allah, préservée par promesse divine sans altération. Contrairement aux Écritures antérieures dont la garde avait été confiée aux hommes, Allah S’est Lui-même porté garant de la sauvegarde du Coran.',
      ar: 'القرآن الكريم كلام الله المعجز، خاتم الكتب السماوية والمهيمن عليها. تكفل الله سبحانه بحفظه بنفسه فقال ﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾، فلم تمتد إليه يد التحريف ولا التبديل طوال أكثر من ١٤ قرناً.',
    },
    versions: [
      {
        id: 'uthmanic_standard',
        name: {
          en: 'Uthmanic Standard Text (Al-Mushaf Al-Imam)',
          fr: 'Codex Othmanien Officiel (Al-Mushaf Al-Imam)',
          ar: 'المصحف الإمام العثماني الموحد',
        },
        language: {
          en: 'Classical Arabic (Hijazi / Kufic script)',
          fr: 'Arabe classique (écriture hijazi / koufique)',
          ar: 'العربية الفصحى (الخط الحجازي والكوفي المبكر)',
        },
        period: {
          en: '25 – 30 AH (646 – 651 CE) under Caliph Uthman ibn Affan',
          fr: '25 – 30 H (646 – 651 ap. J.-C.) sous le calife Othman',
          ar: '٢٥ – ٣٠ هـ (٦٤٦ – ٦٥١ م) في عهد ذي النورين عثمان بن عفان رضي الله عنه',
        },
        significance: {
          en: 'The singular universal written archetype compiled from Abu Bakr’s codex and direct oral/written witnesses of the Sahaba.',
          fr: 'L’archétype universel unique compilé à partir des feuillets d’Abou Bakr et des témoignages des Compagnons.',
          ar: 'الأصل الإمام الموحد الذي استنسخ منه عثمان المصاحف وأرسلها إلى الأمصار الإسلامية الجامعة.',
        },
        description: {
          en: 'Consonantal skeleton (Rasm) meticulously agreed upon by Zayd ibn Thabit and the Qurayshite scribal committee. It encompasses all authentic dialects revealed under the Ahruf permission.',
          fr: 'Squelette consonantique établi par Zayd ibn Thabit et le comité de scribes quraychites, unifiant la Oumma sur une seule graphie.',
          ar: 'رسم تجرد في أول أمره من النقط والشكل ليحتمل ما صح وتواتر عن النبي ﷺ من وجوه القراءات في الأحرف السبعة.',
        },
        extantManuscripts: {
          en: 'Birmingham Manuscript (568–645 CE), Sana’a Palimpsest (1st c. AH), Topkapi Codex, Samarkand Tashkent Codex, Tübingen Fragment (649–675 CE).',
          fr: 'Manuscrit de Birmingham (568–645), Palimpseste de Sanaa (Ier s. H), Codex de Topkapi, Samarcande/Tachkent, Fragment de Tübingen.',
          ar: 'مخطوطة برمنغهام (٥٦٨–٦٤٥ م)، رقوق صنعاء (القرن الأول هـ)، مصحف طوب قابي، مصحف سمرقند وطشقند، مصحف باريس الوطني.',
        },
        variantCountOrStatus: {
          en: '0 textual divergences; 100% word-for-word identity across all global manuscripts.',
          fr: '0 divergence textuelle ; conformité totale mot pour mot dans le monde.',
          ar: 'صفر تناقض أو اختلاف ؛ تطابق تام بنسبة ١٠٠٪ في سائر مصاحف الأرض.',
        },
        theologicalPerspective: {
          en: 'Divine preservation fulfilled through human rigor, oral memory (Hifdh), and written codification.',
          fr: 'Accomplissement de la promesse divine par la mémorisation orale et la transmission écrite.',
          ar: 'تحقيق الوعد الإلهي بالحفظ عبر الجمع والتدوين والتلقي مشافهة بالسند المتصل.',
        },
      },
      {
        id: 'ten_qiraat',
        name: {
          en: 'The Ten Canonical Mutawatir Qira’at (Recitations)',
          fr: 'Les Dix Récitations Canoniques Mutawatir (Qira’at)',
          ar: 'القراءات العشر المتواترة عن النبي ﷺ',
        },
        language: {
          en: 'Vocalized Arabic with distinct dialectical phonetic inflections',
          fr: 'Arabe vocalisé avec nuances phonétiques authentiques',
          ar: 'العربية الفصحى بأوجه الأداء الصوتي والفصاحة النبوية',
        },
        period: {
          en: 'Transmitted continuously from the Prophet ﷺ through the Sahaba and Tabi’in',
          fr: 'Transmises de façon ininterrompue depuis le Prophète ﷺ',
          ar: 'متواترة بأسانيد كالشمس من رسول الله ﷺ إلى الصحابة ثم القراء العشرة ورواتهم',
        },
        significance: {
          en: 'Divine easement allowing phonetic nuances, vocal inflections (Imalah, Tashil, Idgham) reflecting the seven Ahruf without altering the message.',
          fr: 'Facilité divine offrant des nuances de prononciation et de vocalisation conformes au même Rasm.',
          ar: 'توسعة إلهية ورحمة للأمة في نطق الألفاظ دون تغيير الحقيقة الإيمانية الواحدة.',
        },
        description: {
          en: '10 major Imams: Nafi’ (Warsh & Qalun), Ibn Kathir, Abu ‘Amr, Ibn ‘Amir, ‘Asim (Hafs & Shu’bah), Hamzah, Al-Kisa’i, Abu Ja’far, Ya’qub, Khalaf.',
          fr: '10 grands Imams récitateurs canoniques, chacun avec deux transmetteurs reconnus (ex. Hafs d’après ‘Asim, Warsh d’après Nafi’).',
          ar: 'عشرة أئمة متواترون (نافع، ابن كثير، أبو عمرو، ابن عامر، عاصم، حمزة، الكسائي، أبو جعفر، يعقوب، خلف العاشر) لكل إمام راويان ثبتان.',
        },
        extantManuscripts: {
          en: 'Documented across millions of Mushafs with standard vocalization marks (Dabt). Hafs is recited by ~90% of Muslims, Warsh by ~9% in North/West Africa.',
          fr: 'Fixées dans des millions de manuscrits vocalisés. Hafs récité par ~90% des musulmans, Warsh par ~9% en Afrique du Nord et de l’Ouest.',
          ar: 'مدونة في سائر مصاحف العالم المضبوطة بالشكل. يقرأ برواية حفص نحو ٩٠٪ وبرواية ورش وقالون والدوري في بلاد المغرب وإفريقيا.',
        },
        variantCountOrStatus: {
          en: '10 canonical readings, all mutually complementary and originating from the Prophet’s own recitation.',
          fr: '10 lectures canoniques parfaitement complémentaires et authentifiées.',
          ar: 'عشر قراءات متواترة قطعية الثبوت، يُقرأ بها في الصلاة والتعبد بالإجماع.',
        },
        theologicalPerspective: {
          en: 'Each Qira’ah enriches theological depth and highlights stylistic beauty, proving the verbal miracle of the Qur’an.',
          fr: 'Chaque récitation enrichit le sens sans jamais contredire les autres, illustrant le miracle stylistique.',
          ar: 'كل قراءة تزيد المعنى جلاءً وبياناً، وتبين الإعجاز البياني واللفظي للقرآن العظيم.',
        },
      },
    ],
  },
  {
    id: 'tawrat',
    prophetId: 'musa',
    prophetName: {
      en: 'Musa (Moses) عليه السلام',
      fr: 'Moïse (Moussa) عليه السلام',
      ar: 'مُوسَى كَلِيمُ اللَّهِ عليه السلام',
    },
    title: {
      en: 'The Torah (At-Tawrat) & Tablets',
      fr: 'La Thora (At-Tawrat) et les Tables',
      ar: 'التوراة وصحف موسى عليه السلام',
    },
    transliteration: 'At-Tawrāt wa-Suḥuf Mūsā',
    originalLanguage: {
      en: 'Biblical Hebrew / Paleo-Hebrew (Lashon HaKodesh)',
      fr: 'Hébreu biblique ancien / Paléo-hébraïque',
      ar: 'العبرانية القديمة (الكنعانية/الفينيقية المبكرة)',
    },
    revealedEra: {
      en: '~13th century BCE (Exodus from Egypt, Mount Sinai wilderness)',
      fr: '~XIIIe siècle av. J.-C. (Exode hors d’Égypte, désert du Sinaï)',
      ar: 'حوالي القرن الثالث عشر قبل الميلاد (الخروج من مصر والطور في سيناء)',
    },
    revealedLocation: {
      en: 'Mount Tur (Sinai Peninsula) & the Wilderness of Paran',
      fr: 'Mont Sinaï (Jabal al-Tur) et le désert de Paran',
      ar: 'جبل الطور في شبه جزيرة سيناء وصحراء التيه',
    },
    quranReferences: [
      {
        surah: 5,
        ayah: '44',
        arabicText: '﴿إِنَّا أَنزَلْنَا التَّوْرَاةَ فِيهَا هُدًى وَنُورٌ ۚ يَحْكُمُ بِهَا النَّبِيُّونَ الَّذِينَ أَسْلَمُوا لِلَّذِينَ هَادُوا﴾',
        translationEn: 'Indeed, We sent down the Torah, in which was guidance and light. The prophets who submitted [to Allah] judged by it for the Jews.',
        translationFr: 'Nous avons fait descendre la Thora dans laquelle il y a guide et lumière. C’est sur sa base que les prophètes qui s’étaient soumis à Allah jugeaient pour les Juifs.',
      },
      {
        surah: 7,
        ayah: '144-145',
        arabicText: '﴿وَكَتَبْنَا لَهُ فِي الْأَلْوَاحِ مِن كُلِّ شَيْءٍ مَّوْعِظَةً وَتَفْصِيلًا لِّكُلِّ شَيْءٍ﴾',
        translationEn: 'And We wrote for him on the tablets [something] of all things - instruction and explanation for all things.',
        translationFr: 'Et Nous écrivîmes pour lui, sur les Tables, une exhortation sur toute chose, et un exposé détaillé de toute chose.',
      },
      {
        surah: 2,
        ayah: '75',
        arabicText: '﴿وَقَدْ كَانَ فَرِيقٌ مِّنْهُمْ يَسْمَعُونَ كَلَامَ اللَّهِ ثُمَّ يُحَرِّفُونَهُ مِن بَعْدِ مَا عَقَلُوهُ وَهُمْ يَعْلَمُونَ﴾',
        translationEn: 'While a party of them used to hear the words of Allah and then distort the Torah after they had understood it while they were knowing?',
        translationFr: 'Alors qu’un groupe d’entre eux entendait la parole d’Allah, puis la falsifiait sciemment après l’avoir comprise ?',
      },
    ],
    preservationStatus: 'historical_recensions',
    versionsCount: 6, // 6 major historic recensions / textual traditions
    versionsSummary: {
      en: '6 Major Textual Traditions & Recensions exist today with thousands of divergences: Masoretic Text (Rabbinic), Samaritan Pentateuch (~6,000 differences), Greek Septuagint, Dead Sea Scrolls fragments, Syriac Peshitta, and Aramaic Targums.',
      fr: '6 Traditions textuelles majeures existent aujourd’hui avec des milliers de variantes : Texte massorétique, Pentateuque samaritain (~6 000 variantes), Septante grecque, Manuscrits de la mer Morte, Peshitta syriaque et Targoums araméens.',
      ar: '٦ تقاليد ومخطوطات نصية كبرى موجودة اليوم بينها آلاف الفروق: النص الماسوري الحاخامي، التوراة السامرية (تضم ~٦٠٠٠ فارق)، السبعينية اليونانية، مخطوطات قمران، البشيطا السريانية، والترجوم الآرامي.',
    },
    theologicalContext: {
      en: 'Muslims believe that the original divine Torah revealed to Prophet Musa in the Tablets was authentic, containing divine commandments and prophecies of Prophet Muhammad ﷺ. Following the destruction of the First Temple and Babylonian exile, the text was reconstructed by Ezra (Uzair) and scribes, leading to redactions, human additions, and textual alterations (Tahrif).',
      fr: 'Les musulmans croient que la Thora originelle donnée à Moïse était une révélation divine pure. Cependant, suite aux destructions de Jérusalem et à l’exil à Babylone, le texte a subi des remaniements scribaux, des ajouts et des altérations textuelles (Tahrif).',
      ar: 'يؤمن المسلمون بأن التوراة التي أنزلها الله على كليمه موسى في الألواح حق وهدى ونور وبشارة بخاتم الأنبياء ﷺ. لكن بعد سبي بابل وضياع الأصول، أعاد الكتبة تدوينها فدخلتها الزيادات والتعديلات البشرية والتحريف اللفظي والمعنوي كما نص القرآن الكريم.',
    },
    versions: [
      {
        id: 'masoretic_text',
        name: {
          en: 'Masoretic Text (MT - Rabbinic Hebrew Canon)',
          fr: 'Texte Massorétique (TM - Canon hébraïque rabbinique)',
          ar: 'النص الماسوري العبري الحاخامي',
        },
        language: {
          en: 'Hebrew with Tiberian vocalization and niqqud',
          fr: 'Hébreu avec vocalisation tibérienne',
          ar: 'العبرية مع التنقيط والتشكيل الطبراني',
        },
        period: {
          en: 'Standardized between 7th – 10th centuries CE by the Masoretes',
          fr: 'Fixé entre le VIIe et le Xe siècle ap. J.-C. par les Massorètes',
          ar: 'استقر في القرنين السابع إلى العاشر الميلاديين على يد ماسوريي طبرية',
        },
        significance: {
          en: 'The definitive Hebrew text used in modern Judaism and most Protestant Old Testament translations.',
          fr: 'Texte hébreu de référence du judaïsme rabbinique et de la plupart des Bibles protestantes.',
          ar: 'النص الرسمي المعتمد في اليهودية الحاخامية المعاصرة ومعظم ترجمات العهد القديم.',
        },
        description: {
          en: 'Consists of the 5 books of Moses (Genesis, Exodus, Leviticus, Numbers, Deuteronomy). Scribes inserted vowels and cantillation marks to fix the reading.',
          fr: 'Comprend les cinq livres du Pentateuque avec annotations critiques (Massorah).',
          ar: 'يشتمل على أسفار موسى الخمسة، وضع له اللغويون اليهود علامات الإعراب والترتيل لتثبيت قراءته.',
        },
        extantManuscripts: {
          en: 'Aleppo Codex (ca. 920 CE, partially preserved), Leningrad Codex B19a (1008 CE, oldest complete Hebrew Bible).',
          fr: 'Codex d’Alep (vers 920 ap. J.-C.), Codex de Léningrad B19a (1008 ap. J.-C., plus ancienne Bible hébraïque complète).',
          ar: 'مخطوطة حلب (نحو ٩٢٠ م)، مخطوطة لينينغراد (١٠٠٨ م، أقدم نسخة كاملة للعهد القديم العبري).',
        },
        variantCountOrStatus: {
          en: 'Standardized consonantal text, but differs substantially from ancient Septuagint and Samaritan versions.',
          fr: 'Standardisé tardivement, diverge notablement de la Septante et du texte samaritain.',
          ar: 'نص موحد متأخر، يختلف في مواضع عديدة عن التوراة السامرية والسبعينية القديمة.',
        },
        theologicalPerspective: {
          en: 'Shows clear signs of late post-exilic scribal harmonization and redactive layering.',
          fr: 'Porte les marques évidentes des rédactions et harmonisations scribales post-exiliques.',
          ar: 'يحمل آثار الجمع المتأخر بعد السبي البابلي على يد الأحبار والكتبة.',
        },
      },
      {
        id: 'samaritan_pentateuch',
        name: {
          en: 'Samaritan Pentateuch (SP)',
          fr: 'Pentateuque Samaritain',
          ar: 'التوراة السامرية العبرية',
        },
        language: {
          en: 'Paleo-Hebrew Samaritan script',
          fr: 'Écriture samaritaine (paléo-hébreu)',
          ar: 'العبرانية بالخط السامري الكنعاني القديم',
        },
        period: {
          en: 'Preserved by the Samaritan community since ca. 4th – 2nd century BCE schism',
          fr: 'Préservé par la communauté samaritaine depuis le schisme du IVe–IIe s. av. J.-C.',
          ar: 'محفوظ لدى الطائفة السامرية في نابلس منذ الانفصال في القرن الرابع قبل الميلاد',
        },
        significance: {
          en: 'Contains approximately 6,000 differences from the Masoretic Text, around 1,900 of which agree with the Greek Septuagint against the Masoretic.',
          fr: 'Comporte environ 6 000 divergences avec le Texte massorétique, dont près de 1 900 concordent avec la Septante.',
          ar: 'يحتوي على قرابة ٦٠٠٠ اختلاف مقارنة بالنص الماسوري، منها نحو ١٩٠٠ موضع يتفق فيها مع السبعينية ضد الماسوري.',
        },
        description: {
          en: 'Maintains that Mount Gerizim (near Nablus) is the divine sanctuary chosen by God, rather than Jerusalem (Zion).',
          fr: 'Affirme que le mont Garizim (près de Naplouse) est le lieu sacré choisi par Dieu et non Jérusalem.',
          ar: 'ينص على أن جبل جرزيم في نابلس هو قبلة الصلاة ومكان المذبح المقدس الذي أمر به الله لا أورشليم.',
        },
        extantManuscripts: {
          en: 'Abisha Scroll (Nablus, traditionally claimed to be written by Aaron’s great-grandson, dated by scholars to 12th–14th c. CE), early medieval codices.',
          fr: 'Rouleau d’Abisha (Naplouse), manuscrits médiévaux de Naplouse et de Cambridge.',
          ar: 'سفر أبيشع المحفوظ في جبل جرزيم بنابلس، ومخطوطات مكتبة كامبريدج وباريس.',
        },
        variantCountOrStatus: {
          en: '~6,000 recorded textual differences from the Masoretic Torah, including major doctrinal alterations.',
          fr: '~6 000 variantes enregistrées, incluant des divergences théologiques majeures.',
          ar: 'نحو ٦٠٠٠ فارق مسجل، منها اختلافات عقدية وجغرافية وأسماء الأعلام وأعمار الآباء.',
        },
        theologicalPerspective: {
          en: 'Definitive historical proof of sectarian divergence and redaction in early biblical manuscripts.',
          fr: 'Preuve historique irréfutable de la pluralité textuelle et des altérations des Écritures anciennes.',
          ar: 'شاهد تاريخي قاطع على تحريف النص وتفرعه إلى روايات متضاربة بحسب المذاهب والأهواء.',
        },
      },
      {
        id: 'septuagint_lxx',
        name: {
          en: 'The Greek Septuagint (LXX Pentateuch)',
          fr: 'La Septante Grecque (LXX)',
          ar: 'السبعينية اليونانية (ترجمة الإسكندرية)',
        },
        language: {
          en: 'Koine Greek',
          fr: 'Grec koinè',
          ar: 'اليونانية الكوينية (شائعة الإسكندرية)',
        },
        period: {
          en: '3rd century BCE (~285–247 BCE under Pharaoh Ptolemy II Philadelphus)',
          fr: 'IIIe siècle av. J.-C. sous Ptolémée II Philadelphe à Alexandrie',
          ar: 'القرن الثالث قبل الميلاد (نحو ٢٨٠ ق.م) في عهد بطليموس الثاني بالإسكندرية',
        },
        significance: {
          en: 'Translated by 72 Jewish scholars from Hebrew vorlage centuries older than the Masoretic Text; quoted extensively in the New Testament.',
          fr: 'Traduite par 72 érudits juifs d’Alexandrie à partir d’originaux hébreux plus anciens que le texte massorétique.',
          ar: 'ترجمها ٧٢ حبراً يهودياً من أصول عبرية أقدم بقرون من النص الماسوري، اعتمد عليها النصارى الأوائل.',
        },
        description: {
          en: 'Features drastically different chronologies for the patriarchs before and after the Flood (adding over 1,300 years compared to Masoretic MT).',
          fr: 'Présente des chronologies patriarcales très différentes (ajoute plus de 1 300 ans par rapport au TM).',
          ar: 'تختلف في سلاسل الأنساب وأعمار الأنبياء قبل الطوفان وبعده بفارق يزيد عن ١٣٠٠ عام مقارنة بالنص الماسوري.',
        },
        extantManuscripts: {
          en: 'Codex Vaticanus (4th c.), Codex Sinaiticus (4th c.), Papyrus Rylands 458 (2nd c. BCE), Papyrus Fouad 266.',
          fr: 'Codex Vaticanus (IVe s.), Codex Sinaiticus (IVe s.), Papyrus Rylands 458 (IIe s. av. J.-C.).',
          ar: 'مخطوطة الفاتيكان (القرن الرابع م)، المخطوطة السينائية، بردية رايلاندز ٤٥٨ (القرن الثاني ق.م).',
        },
        variantCountOrStatus: {
          en: 'Over 4,000 notable variations from Masoretic Hebrew; frequently reflects an independent pre-Rabbinic Hebrew Vorlage.',
          fr: 'Plus de 4 000 variantes notables par rapport à l’hébreu massorétique.',
          ar: 'آلاف الفروق النصية والترتيبية والعددية مقارنة بالنص العبري الحاخامي.',
        },
        theologicalPerspective: {
          en: 'Illustrates how translational choices and philosophical Hellenistic terminology transformed Semitic theology.',
          fr: 'Montre comment les concepts grecs ont influencé la théologie sémitique d’origine.',
          ar: 'توضح كيف غيرت الترجمة اليونانية المصطلحات والصفات الإلهية متأثرة بالفلسفة الهلنستية.',
        },
      },
      {
        id: 'dead_sea_scrolls_torah',
        name: {
          en: 'Dead Sea Scrolls (Qumran Biblical Manuscripts)',
          fr: 'Manuscrits de la mer Morte (Qumrân)',
          ar: 'مخطوطات البحر الميت (لفائف قمران)',
        },
        language: {
          en: 'Ancient Hebrew (Biblical and Paleo-Hebrew) & Aramaic',
          fr: 'Hébreu ancien et araméen',
          ar: 'العبرية القديمة والآرامية في القرون السابقة للميلاد',
        },
        period: {
          en: '3rd century BCE – 1st century CE (ca. 250 BCE – 68 CE)',
          fr: 'IIIe siècle av. J.-C. – Ier siècle ap. J.-C.',
          ar: 'القرن الثالث قبل الميلاد إلى القرن الأول الميلادي (٢٥٠ ق.م – ٦٨ م)',
        },
        significance: {
          en: 'Oldest known physical Hebrew biblical fragments found in 11 caves near Khirbet Qumran, revealing pre-standardization pluriformity.',
          fr: 'Plus anciens fragments hébreux connus, découverts dans 11 grottes près de Qumrân, révélant la diversité textuelle antique.',
          ar: 'أقدم شواهد مادية عبرية باقية للأسفار، كشفت عن وجود نصوص متعددة متباينة قبل التوحيد الحاخامي.',
        },
        description: {
          en: 'Includes fragments of every Torah book. Proves that Proto-Masoretic, Proto-Samaritan, and Septuagint-aligned Hebrew texts circulated simultaneously.',
          fr: 'Prouve que coexistaient des textes proto-massorétiques, proto-samaritains et proches de la Septante.',
          ar: 'أثبتت أن نصوصاً أسلافاً للماسوري وللسامري وللسبعينية كانت تتداول جنباً إلى جنب دون قداسة حصرية لأحدها.',
        },
        extantManuscripts: {
          en: '4QpaleoExod^m, 4QExod-Lev^f, 4QDeut^q, 1QpaleoLev (Shrine of the Book, Jerusalem; Rockefeller Museum).',
          fr: 'Rouleaux des grottes 1, 4 et 11 conservés au Sanctuaire du Livre et au Musée Rockefeller.',
          ar: 'لفائف المغارة ٤ والمغارة ١ والمغارة ١١ المحفوظة في متحف القدس ومتحف روكفلر.',
        },
        variantCountOrStatus: {
          en: 'Scores of distinct textual readings, variant paragraph breaks, and non-canonical sectarian additions.',
          fr: 'Nombreuses leçons textuelles uniques et variantes avec la Bible actuelle.',
          ar: 'عشرات القراءات المتباينة التي لا توجد في التوراة المتداولة اليوم.',
        },
        theologicalPerspective: {
          en: 'Archaeological proof that the biblical text was fluid and subject to continuous scribal adaptation in antiquity.',
          fr: 'Preuve archéologique que le texte biblique était fluide et modifiable dans l’Antiquité.',
          ar: 'برهان أثري معاصر على أن نصوص أهل الكتاب لم تكن محفوظة على وتيرة واحدة بل كانت في تبدل دائم.',
        },
      },
      {
        id: 'peshitta_ot',
        name: {
          en: 'Syriac Peshitta Pentateuch',
          fr: 'Peshitta Syriaque de l’Ancien Testament',
          ar: 'البشيطا السريانية (الترجمة البسيطة للتوراة)',
        },
        language: {
          en: 'Classical Classical Syriac (Christian Aramaic dialect of Edessa)',
          fr: 'Syriaque classique d’Édesse',
          ar: 'السريانية الفصحى (آرامية الرها)',
        },
        period: {
          en: '2nd century CE',
          fr: 'IIe siècle ap. J.-C.',
          ar: 'القرن الثاني الميلادي',
        },
        significance: {
          en: 'The standard liturgical biblical text of Syriac, Chaldean, Maronite, and Assyrian Christians throughout the East.',
          fr: 'Texte liturgique traditionnel des Églises syriaques, maronites et assyriennes.',
          ar: 'النص المقدس المعتمد لدى الكنائس السريانية والمارونية والكلدانية والآشورية في المشرق العربي.',
        },
        description: {
          en: 'Translated directly from ancient Hebrew, but influenced in numerous legal and narrative passages by Jewish Aramaic Targums.',
          fr: 'Traduite directement de l’hébreu avec des influences nettes des Targoums juifs.',
          ar: 'ترجمت من أصل عبري مباشرة مع تأثر واضح بالترجوم الآرامي في التفسير والعبارات.',
        },
        extantManuscripts: {
          en: 'London Palimpsest (British Library Add MS 14425, dated 464 CE, one of the oldest dated biblical manuscripts in any language).',
          fr: 'British Library Add MS 14425 (daté de 464 ap. J.-C., l’un des plus anciens manuscrits bibliques datés au monde).',
          ar: 'مخطوطة المتحف البريطاني (Add MS 14425 المؤرخة عام ٤٦٤ م، وهي من أقدم المخطوطات المؤرخة عالمياً).',
        },
        variantCountOrStatus: {
          en: 'Distinct readings harmonizing legal verses with early Mesopotamian Christian theology.',
          fr: 'Nombreuses variantes adaptées à la théologie chrétienne orientale.',
          ar: 'اختلافات في تأويل الأحكام الناموسية وملاءمتها للنظرة المسيحية الشرقية.',
        },
        theologicalPerspective: {
          en: 'Bridges Jewish Semitic roots with early Christian Near-Eastern transmission.',
          fr: 'Témoigne de l’appropriation chrétienne du texte hébraïque dans le monde sémitique.',
          ar: 'حلقة وصل بين الأصول العبرانية والتفسير النصراني الآرامي في بلاد الرافدين والشام.',
        },
      },
      {
        id: 'targumim',
        name: {
          en: 'Aramaic Targumim (Targum Onkelos & Pseudo-Jonathan)',
          fr: 'Targoums Araméens (Onkelos et Pseudo-Jonathan)',
          ar: 'التراجم الآرامية (ترجوم أونكيلوس وترجوم يوناثان)',
        },
        language: {
          en: 'Jewish Palestinian & Babylonian Aramaic',
          fr: 'Araméen judéo-palestinien et babylonien',
          ar: 'الآرامية اليهودية البابلية والفلسطينية',
        },
        period: {
          en: '1st – 5th centuries CE (compiled from centuries of oral synagogue paraphrases)',
          fr: 'Ier – Ve siècle ap. J.-C.',
          ar: 'القرن الأول إلى الخامس الميلادي (نتاج التفسير الشفوي في المجامع)',
        },
        significance: {
          en: 'Official synagogue translations read aloud to Jewish congregations after Hebrew fell out of vernacular use.',
          fr: 'Traductions orales et écrites lues dans les synagogues quand l’hébreu cessa d’être la langue parlée.',
          ar: 'التفاسير المعتمدة التي كانت تتلى في المجامع اليهودية بعد أن هجر العوام الحديث بالعبرية وصارت الآرامية لغتهم.',
        },
        description: {
          en: 'Frequently paraphrases anthropomorphisms (replacing God with Memra / the Word of God) and inserts Aggadic rabbinic expansions directly into the text.',
          fr: 'Remplace les anthropomorphismes par le « Memra » (la Parole) et incorpore des récits midrashiques.',
          ar: 'يتجنب التجسيم بإقحام لفظ "ميمرا" (كلمة الرب أو أمره)، ويدمج الروايات التفسيرية (المدراش) في صلب الآيات.',
        },
        extantManuscripts: {
          en: 'Vatican Neofiti 1, British Library Or. 2228, Cairo Genizah palimpsests.',
          fr: 'Codex Neofiti 1 (Vatican), manuscrits de la Genizah du Caire.',
          ar: 'مخطوطة نيوفيتي في الفاتيكان، ومخطوطات جنيزة القاهرة التاريخية.',
        },
        variantCountOrStatus: {
          en: 'Extensive interpretive additions not found in the Hebrew text.',
          fr: 'Additions exégétiques substantielles insérées dans le texte.',
          ar: 'إضافات مطولة وتغييرات دلالية واضحة عن الأصل العبراني.',
        },
        theologicalPerspective: {
          en: 'Demonstrates how human commentary and oral traditions became fused into written scriptures over time.',
          fr: 'Montre comment les commentaires humains se sont mêlés au texte sacré.',
          ar: 'دليل ملموس على كيفية اختلاط كلام الأحبار بكلام الوحي حتى صار عند القوم كتاباً واحداً.',
        },
      },
    ],
  },
  {
    id: 'zabur',
    prophetId: 'dawud',
    prophetName: {
      en: 'Dawud (David) عليه السلام',
      fr: 'David (Daoud) عليه السلام',
      ar: 'دَاوُودُ نَبِيُّ اللَّهِ وَمَلِكُهُ عليه السلام',
    },
    title: {
      en: 'The Psalms (Az-Zabur)',
      fr: 'Les Psaumes (Az-Zabour)',
      ar: 'الزبور (مزامير داوود عليه السلام)',
    },
    transliteration: 'Az-Zabūr',
    originalLanguage: {
      en: 'Ancient Hebrew poetry (Lashon HaKodesh)',
      fr: 'Hébreu poétique ancien',
      ar: 'العبرانية الشعرية القديمة المقفاة',
    },
    revealedEra: {
      en: '~10th century BCE (United Monarchy of Israel and Judah, Jerusalem)',
      fr: '~Xe siècle av. J.-C. (Royaume de David, Jérusalem)',
      ar: 'حوالي القرن العاشر قبل الميلاد (مملكة داوود في القدس الشريف)',
    },
    revealedLocation: {
      en: 'Al-Quds (Jerusalem / Mount Zion) & the Judean Hills',
      fr: 'Jérusalem (Al-Qods) et les collines de Judée',
      ar: 'القدس الشريف وتلال بيت لحم والخليل',
    },
    quranReferences: [
      {
        surah: 4,
        ayah: '163',
        arabicText: '﴿وَآتَيْنَا دَاوُودَ زَبُورًا﴾',
        translationEn: 'And to David We gave the book of Psalms.',
        translationFr: 'Et à David Nous avons donné le Zabour (les Psaumes).',
      },
      {
        surah: 17,
        ayah: '55',
        arabicText: '﴿وَلَقَدْ فَضَّلْنَا بَعْضَ النَّبِيِّينَ عَلَىٰ بَعْضٍ ۖ وَآتَيْنَا دَاوُودَ زَبُورًا﴾',
        translationEn: 'And We have made some of the prophets exceed others [in various ways], and to David We gave the Psalms.',
        translationFr: 'Et Nous avons préféré certains prophètes à d’autres. Et Nous avons donné à David le Zabour.',
      },
      {
        surah: 21,
        ayah: '105',
        arabicText: '﴿وَلَقَدْ كَتَبْنَا فِي الزَّبُورِ مِن بَعْدِ الذِّكْرِ أَنَّ الْأَرْضَ يَرِثُهَا عِبَادِيَ الصَّالِحُونَ﴾',
        translationEn: 'And We have already written in the book [of Psalms] after the [previous] mention that the land [of Paradise] is inherited by My righteous servants.',
        translationFr: 'Et Nous avons certes écrit dans le Zabour, après le Rappel, que la terre sera héritée par Mes bons serviteurs.',
      },
    ],
    preservationStatus: 'historical_recensions',
    versionsCount: 5, // 5 major historic recensions
    versionsSummary: {
      en: '5 Major Textual Traditions exist with varying psalm counts: Masoretic Tehillim (150 Psalms), Septuagint Psalter (151 Psalms), Dead Sea Scrolls 11QPs^a (contains unique non-canonical hymns), Syriac Peshitta Mazmore (155 Psalms), and Latin Vulgate Psalters.',
      fr: '5 Traditions majeures avec un nombre variable de psaumes : Tehillim massorétique (150 Psaumes), Septante (151 Psaumes), Rouleau 11QPs de Qumrân (hymnes inédits), Peshitta syriaque (155 Psaumes) et Psautiers latins.',
      ar: '٥ تقاليد نصية كبرى تختلف في عدد المزامير وترتيبها: كتاب المزامير الماسوري (١٥٠ مزموراً)، المزامير السبعينية (١٥١ مزموراً)، لفيفة قمران الكبرى ١١QPs، المزامير السريانية (١٥٥ مزموراً)، والمزامير اللاتينية.',
    },
    theologicalContext: {
      en: 'In Islamic belief, the Zabur revealed to Dawud was a divine scripture filled with praises, invocations, glorifications of Allah (Tasbih), and moral wisdom. The mountains and birds echoed his recitations. Over centuries, biblical psalms by multiple different authors (Asaph, sons of Korah, Solomon, Moses) were combined with David’s songs.',
      fr: 'Dans la théologie musulmane, le Zabour était un recueil divin de louanges, d’invocations et d’exhortations que les montagnes et les oiseaux répétaient avec David. Avec le temps, les scribes ont réuni sous ce nom des poèmes de divers auteurs.',
      ar: 'الزبور كتاب سماوي أوتيه داوود عليه السلام، كان فيه تسبيح وتمجيد لله ودعاء ومواعظ، كانت الجبال والطير تؤوب معه إذا رتل. وبمرور القرون جمع اليهود في سفر المزامير نصوصاً لمؤلفين متعددين (كآساف وبني قورح وسليمان وموسى وغيرهم) فاختلطت بمزامير داوود الأصلية.',
    },
    versions: [
      {
        id: 'masoretic_psalms',
        name: {
          en: 'Masoretic Tehillim (150 Psalms)',
          fr: 'Tehillim Hébraïque Massorétique (150 Psaumes)',
          ar: 'المزامير العبرية الماسورية (١٥٠ مزموراً)',
        },
        language: {
          en: 'Biblical Hebrew',
          fr: 'Hébreu biblique',
          ar: 'العبرية التوراتية',
        },
        period: {
          en: 'Compiled between 6th – 2nd c. BCE; vocalized in 8th–10th c. CE',
          fr: 'Compilé entre le VIe et le IIe s. av. J.-C.',
          ar: 'جُمع في حقبة الهيكل الثاني واستقر تشكيله في القرون الوسطى',
        },
        significance: {
          en: 'Canonical Psalter divided into 5 books mirroring the 5 books of Moses.',
          fr: 'Psautier canonique divisé en 5 livres en parallèle avec le Pentateuque.',
          ar: 'مقسم إلى خمسة كتب، يضم ١٥٠ مزموراً نسب اليهود بعضها لداوود وبعضها لغيره.',
        },
        description: {
          en: 'Only 73 psalms carry the superscription "Of David" (L’David); others are explicitly attributed to Asaph, Korahites, Heman, Ethan, and Solomon.',
          fr: 'Seuls 73 psaumes portent le titre « De David » ; d’autres sont attribués à Asaph ou aux fils de Coré.',
          ar: 'يحمل ٧٣ مزموراً فقط عنوان "لداود"، بينما نسبت بقية المزامير لمغنين وكهنة آخرين في المعبد.',
        },
        extantManuscripts: {
          en: 'Aleppo Codex, Leningrad Codex B19a, Cambridge Genizah fragments.',
          fr: 'Codex d’Alep, Codex de Léningrad.',
          ar: 'مخطوطة حلب ومخطوطة لينينغراد وقصاصات جنيزة القاهرة.',
        },
        variantCountOrStatus: {
          en: 'Ends at Psalm 150; rejects Psalm 151 as apocryphal.',
          fr: 'S’arrête au Psaume 150 ; exclut le Psaume 151.',
          ar: 'يتوقف عند المزمور ١٥٠، ويرفض المزمور ١٥١ ويعده غير قانوني.',
        },
        theologicalPerspective: {
          en: 'Evidence that the biblical Psalter is a historical anthology rather than a single uninterrupted revelation.',
          fr: 'Démontre que le recueil actuel est une anthologie poétique composite.',
          ar: 'دليل على أن السفر المتداول اليوم مجموعة شعرية تأليفية لعدة كتاب لا وحياً منزلاً مجرداً.',
        },
      },
      {
        id: 'septuagint_psalter',
        name: {
          en: 'Septuagint Psalter (LXX - 151 Psalms)',
          fr: 'Psautier de la Septante (151 Psaumes)',
          ar: 'مزامير السبعينية اليونانية (١٥١ مزموراً)',
        },
        language: {
          en: 'Koine Greek',
          fr: 'Grec koinè',
          ar: 'اليونانية الكوينية',
        },
        period: {
          en: '2nd century BCE',
          fr: 'IIe siècle av. J.-C.',
          ar: 'القرن الثاني قبل الميلاد',
        },
        significance: {
          en: 'Includes Psalm 151 ("I was small among my brothers...") recounting David’s battle with Goliath; accepted as canonical by Eastern Orthodox and Coptic churches.',
          fr: 'Inclut le Psaume 151 racontant la victoire de David sur Goliath, canonique pour les Églises orthodoxes et coptes.',
          ar: 'يحتوي على المزمور ١٥١ المروي عن داوود وهو يرعى غنم أبيه وقتله لجالوت، وتعتبره الكنائس الأرثوذكسية والقبطية سفراً مقدساً قانونياً.',
        },
        description: {
          en: 'Different numbering scheme from the Hebrew (e.g. Psalms 9 and 10 combined into one, Psalms 114 and 115 combined).',
          fr: 'Numérotation différente de la version hébraïque (psaumes fusionnés ou scindés).',
          ar: 'يختلف في ترقيم المزامير عن العبري حيث يدمج بعض المزامير ويقسم أخرى فيختلف العد التراكمي.',
        },
        extantManuscripts: {
          en: 'Codex Sinaiticus, Codex Alexandrinus, Papyrus Bodmer XXIV.',
          fr: 'Codex Sinaiticus, Codex Alexandrinus.',
          ar: 'المخطوطة السينائية والإسكندرية وبردية بودمير.',
        },
        variantCountOrStatus: {
          en: '1 extra psalm + different structural numbering across 150 psalms.',
          fr: '1 psaume supplémentaire + numérotation divergente.',
          ar: 'مزمور زائد كامل (١٥١) بالإضافة إلى تباين الترقيم والنصوص الداخلية.',
        },
        theologicalPerspective: {
          en: 'Reveals the lack of consensus on canonical boundaries among ancient Jewish and Christian sects.',
          fr: 'Souligne l’absence de consensus historique sur les limites du canon biblique.',
          ar: 'يبرهن على غياب التوافق حول حدود الوحي المقدس بين الطوائف المسيحية واليهودية.',
        },
      },
      {
        id: 'qumran_psalms_scroll',
        name: {
          en: 'Great Psalms Scroll (11QPs^a from Qumran)',
          fr: 'Grand Rouleau des Psaumes de Qumrân (11QPs^a)',
          ar: 'لفيفة المزامير الكبرى من قمران (11QPs^a)',
        },
        language: {
          en: 'Ancient Hebrew',
          fr: 'Hébreu ancien',
          ar: 'العبرية التوراتية القديمة',
        },
        period: {
          en: 'ca. 30 – 50 CE (found in Qumran Cave 11 in 1956)',
          fr: 'vers 30 – 50 ap. J.-C. (découvert en 1956)',
          ar: 'القرن الأول الميلادي (٣٠ – ٥٠ م) عُثر عليها في المغارة ١١ سنة ١٩٥٦ م',
        },
        significance: {
          en: 'Contains 48 compositions in an order radically different from the Masoretic Text, intermingling canonical psalms with non-biblical hymns and prose.',
          fr: 'Contient 48 compositions dans un ordre radicalement différent, mêlant psaumes canoniques et hymnes apocryphes.',
          ar: 'تضم ٤٨ تكويناً شعرياً بترتيب مغاير تماماً للنص الماسوري، ممتزجة بأشعار لم يسمع بها أحد من قبل ونصوص نثرية عن داوود.',
        },
        description: {
          en: 'Claims David composed 3,600 psalms and 450 songs. Contains the original Hebrew of Psalm 151, plus "Psalm 154" and "The Plea for Deliverance".',
          fr: 'Attribue à David 3 600 psaumes et 450 chants. Contient le texte hébreu original du Psaume 151 et du Psaume 154.',
          ar: 'تزعم أن داوود ألف ٣٦٠٠ مزموراً و٤٥٠ ترنيمة للمحرقة، وتتضمن الأصل العبري للمزمور ١٥١ والمزمور ١٥٤ ودعاء النجاة.',
        },
        extantManuscripts: {
          en: 'Scroll 11Q5 (Rockefeller Museum and Israel Museum, Jerusalem).',
          fr: 'Rouleau 11Q5 au Musée d’Israël.',
          ar: 'اللفيفة رقم 11Q5 في متحف القدس.',
        },
        variantCountOrStatus: {
          en: 'Includes 7 non-canonical psalms and a completely rearranged sequence of the last third of the Psalter.',
          fr: 'Comprend 7 psaumes inconnus du canon rabbinique et un ordre inédit.',
          ar: 'تحتوي على ٧ مزامير غير موجودة في كتب اليوم وترتيب متباين جذرياً.',
        },
        theologicalPerspective: {
          en: 'Undeniable physical evidence that the collection of Psalms was still an open, evolving corpus in the 1st century CE.',
          fr: 'Preuve matérielle que le recueil des psaumes était encore en gestation au Ier siècle.',
          ar: 'دليل مادي أثري لا يقبل الشك على أن سفر المزامير كان نصاً مفتوحاً يزاد فيه وينقص حتى القرن الأول الميلادي.',
        },
      },
      {
        id: 'syriac_peshitta_psalms',
        name: {
          en: 'Syriac Peshitta Mazmore (155 Psalms)',
          fr: 'Mazmouré Syriaque de la Peshitta (155 Psaumes)',
          ar: 'المزامير السريانية للبشيطا (١٥٥ مزموراً)',
        },
        language: {
          en: 'Classical Classical Syriac',
          fr: 'Syriaque classique',
          ar: 'السريانية الكنسية',
        },
        period: {
          en: '2nd – 4th centuries CE (Baghdad MS 12th c., Milan Ambrosian MS 6th c.)',
          fr: 'IIe – IVe siècle ap. J.-C.',
          ar: 'القرن الثاني إلى السادس الميلادي',
        },
        significance: {
          en: 'Preserves 5 additional "Apocryphal Psalms" numbered 151 through 155, including the Prayer of Hezekiah and the Thanksgiving of David.',
          fr: 'Préserve 5 psaumes supplémentaires (Psaumes 151 à 155) utilisés dans la tradition syriaque.',
          ar: 'تحفظ خمسة مزامير إضافية مرقمة من ١٥١ إلى ١٥٥، منها صلاة حزقيا وشكر داوود على الخلاص.',
        },
        description: {
          en: 'Used across Eastern Syrian rites. Scholars rediscovered these extra psalms in the 18th and 19th centuries in medieval Syriac codices.',
          fr: 'Utilisé dans la tradition de l’Orient. Psaumes 151–155 redécouverts au XIXe siècle.',
          ar: 'ظلت تتلى في الصلوات السريانية الشرقية حتى أعاد علماء المخطوطات اكتشافها في القرن التاسع عشر.',
        },
        extantManuscripts: {
          en: 'Milan Ambrosian Library MS B. 21 Inf. (6th c. CE), Cambridge University Library MS Oo.1.1.2.',
          fr: 'Manuscrit ambrosien de Milan (VIe s.), Bibliothèque de Cambridge.',
          ar: 'مخطوطة مكتبة أمبروزيانا بميلانو (القرن السادس م) ومخطوطات كامبريدج.',
        },
        variantCountOrStatus: {
          en: '5 entire extra psalms absent from modern Western Bibles.',
          fr: '5 psaumes entiers absents des Bibles occidentales.',
          ar: 'خمسة مزامير كاملة محذوفة من التوراة والإنجيل البروتستانتي والكاثوليكي الغربي.',
        },
        theologicalPerspective: {
          en: 'Demonstrates the regional fragmentation of biblical texts between Eastern and Western Christendom.',
          fr: 'Illustre la fragmentation du canon biblique entre chrétiens d’Orient et d’Occident.',
          ar: 'يبين تباين الكتب المعتمدة بين مسيحيي الشرق ومسيحيي الغرب في عدد الأسفار المنزلة.',
        },
      },
      {
        id: 'latin_vulgate_psalters',
        name: {
          en: 'Jerome’s Latin Psalters (Gallicanum, Romanum, Hebraicum)',
          fr: 'Les Psautiers Latins de Jérôme (Gallican, Romain, Hébraïque)',
          ar: 'مزامير الفولغاتا اللاتينية للقديس جيروم (ثلاث نسخ متضاربة)',
        },
        language: {
          en: 'Classical Latin',
          fr: 'Latin chrétien',
          ar: 'اللاتينية الكنسية',
        },
        period: {
          en: '383 – 405 CE by Jerome of Stridon',
          fr: '383 – 405 ap. J.-C. par saint Jérôme',
          ar: '٣٨٣ – ٤٠٥ م على يد الراهب جيروم في بيت لحم',
        },
        significance: {
          en: 'Jerome produced three distinct versions of the Psalms because the Latin texts circulating in the Roman Church were conflicting and corrupt.',
          fr: 'Jérôme a dû produire trois versions successives distinctes en raison de la corruption des textes latins.',
          ar: 'اضطر جيروم إلى ترجمة المزامير ثلاث مرات مختلفة بسبب تضارب المخطوطات اللاتينية المتداولة في روما.',
        },
        description: {
          en: '1. Roman Psalter (revised from Old Latin/Greek); 2. Gallican Psalter (revised from Origen’s Hexapla Greek); 3. Psalterium iuxta Hebraeos (translated from Hebrew).',
          fr: '1. Psautier romain ; 2. Psautier gallican (d’après Origène) ; 3. D’après l’hébreu.',
          ar: 'النسخة الرومانية (تنقيح للاتينية القديمة)، النسخة الغاليكية (من هيكسابلا أوريجانوس)، والنسخة المباشرة من العبرية.',
        },
        extantManuscripts: {
          en: 'Codex Amiatinus (ca. 700 CE), Codex Sangallensis 18 (9th c.).',
          fr: 'Codex Amiatinus (vers 700), Psautier de Saint-Gall.',
          ar: 'مخطوطة أمياتينوس (أقدم توراة لاتينية كاملة، ٧٠٠ م) ومخطوطات سانت غال.',
        },
        variantCountOrStatus: {
          en: '3 conflicting Latin recensions within the same Catholic Church tradition.',
          fr: '3 recensions latines divergentes au sein de la même Église.',
          ar: 'ثلاث ترجمات لاتينية متباينة في الكلمات والعبارات في كنيسة واحدة.',
        },
        theologicalPerspective: {
          en: 'Jerome himself famously complained about scribal corruption, admitting "Tot sunt exemplaria paene quot codices" (There are almost as many distinct versions as there are codices).',
          fr: 'Jérôme lui-même déplorait : « Il y a presque autant de versions que de manuscrits ».',
          ar: 'سجل جيروم في مقدماته شكواه التاريخية الشهيرة: "إن عدد النسخ المتضاربة يكاد يعادل عدد المخطوطات ذاتها".',
        },
      },
    ],
  },
  {
    id: 'injeel',
    prophetId: 'isa',
    prophetName: {
      en: 'Isa (Jesus) عليه السلام',
      fr: 'Jésus (Aïssa) عليه السلام',
      ar: 'عِيسَى ابْنُ مَرْيَمَ رُوحُ اللَّهِ وَكَلِمَتُهُ عليه السلام',
    },
    title: {
      en: 'The Gospel (Al-Injeel)',
      fr: 'L’Évangile (Al-Injil)',
      ar: 'الإنجيل المنزل على عيسى عليه السلام',
    },
    transliteration: 'Al-Injīl',
    originalLanguage: {
      en: 'Galilean Aramaic (the native mother tongue spoken by Jesus)',
      fr: 'Araméen galiléen (langue maternelle parlée par Jésus)',
      ar: 'الآرامية الجليلية الفلسطينية (لسان المسيح عيسى وتلاميذه)',
    },
    revealedEra: {
      en: '~27 – 33 CE (Jerusalem, Nazareth, Galilee, Judea)',
      fr: '~27 – 33 ap. J.-C. (Jérusalem, Nazareth, Galilée, Judée)',
      ar: 'حوالي ٢٧ – ٣٣ م (القدس الشريف والناصرة وبحيرة طبريا والجليل)',
    },
    revealedLocation: {
      en: 'Jerusalem (Bayt al-Maqdis), Galilee, & the Judean Hills',
      fr: 'Jérusalem, la Galilée et la Judée',
      ar: 'بيت المقدس وقرى الجليل وتلال الخليل',
    },
    quranReferences: [
      {
        surah: 5,
        ayah: '46',
        arabicText: '﴿وَقَفَّيْنَا عَلَىٰ آثَارِهِم بِعِيسَى ابْنِ مَرْيَمَ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ مِنَ التَّوْرَاةِ ۖ وَآتَيْنَاهُ الْإِنجِيلَ فِيهِ هُدًى وَنُورٌ وَمُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ مِنَ التَّوْرَاةِ وَهُدًى وَمَوْعِظَةً لِّلْمُتَّقِينَ﴾',
        translationEn: 'And We sent, following in their footsteps, Jesus, the son of Mary, confirming that which came before him in the Torah; and We gave him the Gospel, in which was guidance and light and confirming that which preceded it of the Torah and as guidance and instruction for the righteous.',
        translationFr: 'Et Nous avons envoyé après eux Jésus, fils de Marie, pour confirmer ce qu’il y avait dans la Thora avant lui. Et Nous lui avons donné l’Évangile, où il y a guide et lumière, confirmant ce qu’il y avait dans la Thora avant lui, et un guide et une exhortation pour les pieux.',
      },
      {
        surah: 57,
        ayah: '27',
        arabicText: '﴿وَقَفَّيْنَا بِعِيسَى ابْنِ مَرْيَمَ وَآتَيْنَاهُ الْإِنجِيلَ وَجَعَلْنَا فِي قُلُوبِ الَّذِينَ اتَّبَعُوهُ رَأْفَةً وَرَحْمَةً﴾',
        translationEn: 'And We sent, following in their footsteps, Jesus, the son of Mary, and gave him the Gospel. And We placed in the hearts of those who followed him compassion and mercy.',
        translationFr: 'Puis Nous fîmes suivre Jésus, fils de Marie, et lui apportâmes l’Évangile, et mîmes dans les cœurs de ceux qui le suivirent douceur et compassion.',
      },
      {
        surah: 7,
        ayah: '157',
        arabicText: '﴿الَّذِينَ يَتَّبِعُونَ الرَّسُولَ النَّبِيَّ الْأُمِّيَّ الَّذِي يَجِدُونَهُ مَكْتُوبًا عِندَهُمْ فِي التَّوْرَاةِ وَالْإِنجِيلِ﴾',
        translationEn: 'Those who follow the Messenger, the unlettered prophet, whom they find written [i.e., described] with them in what they have of the Torah and the Gospel...',
        translationFr: 'Ceux qui suivent le Messager, le Prophète illettré qu’ils trouvent mentionné chez eux dans la Thora et l’Évangile...',
      },
    ],
    preservationStatus: 'historical_recensions',
    versionsCount: 8, // 8 major textual witnesses / traditions
    versionsSummary: {
      en: '8+ Major Historical Textual Witnesses & Collections: The 4 Canonical Gospels (Matthew, Mark, Luke, John in Koine Greek with >500,000 variants across 5,800+ manuscripts), Codex Sinaiticus, Codex Vaticanus, Codex Alexandrinus, Syriac Peshitta, Diatessaron Harmony, Gospel of Barnabas, and Nag Hammadi Gnostic Gospels.',
      fr: '8+ Témoins textuels et collections historiques : Les 4 Évangiles canoniques (en grec avec >500 000 variantes dans 5 800+ manuscrits), Codex Sinaiticus, Vaticanus, Alexandrinus, Peshitta syriaque, Diatessaron, Évangile de Barnabé et textes coptes de Nag Hammadi.',
      ar: 'أكثر من ٨ شواهد ومجموعات نصية تاريخية كبرى: الأناجيل الأربعة القانونية (باليونانية وتضم أكثر من ٥٠٠ ألف اختلاف نصي في ٥٨٠٠ مخطوطة)، المخطوطة السينائية، الفاتيكانية، الإسكندرية، البشيطا السريانية، إنجيل الدياتسارون الموحد، إنجيل برنابا، وأناجيل نجع حمادي القبطية.',
    },
    theologicalContext: {
      en: 'The Quranic Injeel is a singular divine book revealed by Allah directly to Prophet Isa in his spoken language (Aramaic), confirming the Torah and announcing the coming of Prophet Muhammad ﷺ (Ahmad). Today, no single original Aramaic book of Jesus exists. Instead, the Christian Church canonized four anonymous biographical narratives written in Greek decades later by third-party authors, alongside divergent codices.',
      fr: 'L’Évangile selon le Coran est un livre divin unique accordé à Jésus dans sa langue parlée (l’araméen). Aujourd’hui, le livre originel est perdu ; le christianisme a canonisé quatre récits biographiques écrits en grec des décennies plus tard par différents auteurs.',
      ar: 'الإنجيل القرآني كتاب إلهي واحد أنزله الله على عيسى بلسانه الآرامي فيه الهدى والنور والبشارة بنبي يأتي من بعده اسمه أحمد ﷺ. أما الأناجيل الموجودة اليوم فهي أربعة مؤلفات سيرية يونانية كتبها أناس بعد رفع المسيح بعقود، لا تحوي نص الإنجيل المجموع بل ذكريات وروايات شفهية اختلطت فيها العقائد الهلنستية والتثليث.',
    },
    versions: [
      {
        id: 'four_canonical_gospels',
        name: {
          en: 'The Four Canonical Gospels (Matthew, Mark, Luke, John)',
          fr: 'Les Quatre Évangiles Canoniques (Matthieu, Marc, Luc, Jean)',
          ar: 'الأناجيل الأربعة القانونية المعتمدة (متى، مرقس، لوقا، يوحنا)',
        },
        language: {
          en: 'Koine Greek (not Jesus’ native Aramaic tongue)',
          fr: 'Grec koinè (non la langue araméenne de Jésus)',
          ar: 'اليونانية الكوينية (لغة الإمبراطورية الرومانية لا لسان المسيح الآرامي)',
        },
        period: {
          en: 'Written ca. 68 – 100 CE by Greek-speaking authors outside Palestine',
          fr: 'Rédigés entre 68 et 100 ap. J.-C. en dehors de Palestine',
          ar: 'كتبت ما بين ٦٨ – ١٠٠ م على يد كتاب مجهولين في الشتات الروماني خارج فلسطين',
        },
        significance: {
          en: 'Selected at 4th-century church councils (Athanasius Festal Letter 367 CE, Councils of Hippo & Carthage) out of dozens of circulating gospels.',
          fr: 'Fixés au IVe siècle lors des conciles (lettre d’Athanase en 367, conciles d’Hippone et de Carthage).',
          ar: 'اقتصرت الكنيسة عليها في القرن الرابع الميلادي (مجمع قرطاج وهيبو ورسالة أثناسيوس سنة ٣٦٧ م) واستبعدت عشرات الأناجيل الأخرى.',
        },
        description: {
          en: 'Mark (shortest/earliest), Matthew (aimed at Jewish converts), Luke (investigative history for Theophilus), and John (high mystical Christology composed last).',
          fr: 'Comprend 3 évangiles synoptiques (Marc, Matthieu, Luc) et l’évangile théologique de Jean.',
          ar: 'ثلاثة أناجيل إزائية متقاربة في السرد (مرقس ومتى ولوقا) وإنجيل رابع عقدي فلسفي (يوحنا) صاغ عقيدة ألوهية الكلمة واللاهوت.',
        },
        extantManuscripts: {
          en: '>5,800 Greek manuscripts, >10,000 Latin manuscripts, earliest papyrus fragment is P52 (ca. 125–175 CE, size of a credit card).',
          fr: '>5 800 manuscrits grecs, le plus ancien fragment étant P52 (vers 125–175 ap. J.-C., quelques versets de Jean).',
          ar: 'أكثر من ٥٨٠٠ مخطوطة يونانية، أقدمها قصاصة بردية P52 (بحجم بطاقة صغيرة وتضم كلمات معدودة من إنجيل يوحنا).',
        },
        variantCountOrStatus: {
          en: 'Scholars (e.g. Bart Ehrman, Bruce Metzger) document between 400,000 and 500,000 textual variants across Greek manuscripts.',
          fr: 'Entre 400 000 et 500 000 variantes textuelles recensées dans les manuscrits grecs.',
          ar: 'أكثر من ٥٠٠ ألف اختلاف وقراءة نصية متضاربة في المخطوطات اليونانية (أكثر من عدد كلمات العهد الجديد نفسه!).',
        },
        theologicalPerspective: {
          en: 'Includes famous late forged additions like the Johannine Comma (1 John 5:7 inventing the Trinity) and the Long Ending of Mark (Mark 16:9-20).',
          fr: 'Comprend des ajouts tardifs avérés, tels que la finale de Marc (16:9-20) et la péricope de la femme adultère.',
          ar: 'تحتوي على نصوص مزورة أضيفت لاحقاً وحذفتها الترجمات النقدية الحديثة (مثل فاصلة يوحنا التثليثية ونهاية إنجيل مرقس وقصة الزانية).',
        },
      },
      {
        id: 'codex_sinaiticus',
        name: {
          en: 'Codex Sinaiticus (ca. 330–360 CE)',
          fr: 'Codex Sinaiticus (vers 330–360 ap. J.-C.)',
          ar: 'المخطوطة السينائية (القرن الرابع الميلادي)',
        },
        language: {
          en: 'Koine Greek in uncial script',
          fr: 'Grec oncial majuscule',
          ar: 'اليونانية بالخط البوصي الكبير غير المنقوط',
        },
        period: {
          en: 'ca. 330 – 360 CE, reign of Emperor Constantine or Constantius II',
          fr: 'vers 330 – 360 ap. J.-C.',
          ar: 'حوالي ٣٣٠ – ٣٦٠ م، زمن الإمبراطور قسطنطين',
        },
        significance: {
          en: 'The earliest complete manuscript of the New Testament in existence, discovered in 1844 by Constantine von Tischendorf at Saint Catherine’s Monastery, Sinai.',
          fr: 'Le plus ancien manuscrit complet du Nouveau Testament, découvert en 1844 au monastère Sainte-Catherine du Sinaï.',
          ar: 'أقدم مخطوطة كاملة للعهد الجديد باقية في العالم، اكتشفها تشيندروف عام ١٨٤٤ في دير سانت كاترين بسيناء.',
        },
        description: {
          en: 'Contains books that were later rejected as non-canonical (Epistle of Barnabas and the Shepherd of Hermas) and omits the resurrection appearances at the end of Mark 16.',
          fr: 'Comprend des livres apocryphes (Épître de Barnabé, Pasteur d’Hermas) et omet la finale de Marc (16:9-20).',
          ar: 'تضم أسفاراً استبعدتها الكنيسة لاحقاً واعتبرتها محرفة (مثل رسالة برنابا وراعي هرمس)، وتنتهي عند مرقس ١٦: ٨ دون قيامة المسيح!',
        },
        extantManuscripts: {
          en: 'British Library (Add MS 43725), with portions in Leipzig, Saint Petersburg, and Sinai.',
          fr: 'British Library (Londres), parties à Leipzig, Saint-Pétersbourg et au Sinaï.',
          ar: 'المكتبة البريطانية بلندن، وأجزاء في لايبزيغ وسانت بطرسبرغ وسينا.',
        },
        variantCountOrStatus: {
          en: 'Contains thousands of scribal corrections (over 23,000 corrections throughout the codex made by at least 9 different correctors).',
          fr: 'Contient plus de 23 000 corrections manuscrites effectuées par au moins 9 correcteurs successifs.',
          ar: 'تحتوي على أكثر من ٢٣ ألف تصحيح وشطب قام به تسعة نساخ ومصححين تعاقبوا على تبديل كلماتها عبر العصور.',
        },
        theologicalPerspective: {
          en: 'Physical proof that early Christians had differing canons and that the biblical text was constantly amended by scribes.',
          fr: 'Preuve concrète que le canon chrétien primitif n’était pas fixé et était continuellement modifié.',
          ar: 'برهان حسي لا يدحض على أن النص المسيحي تعرض للشطب والإقحام والتصحيح والتعديل بالأقلام عبر القرون.',
        },
      },
      {
        id: 'codex_vaticanus',
        name: {
          en: 'Codex Vaticanus (ca. 300–325 CE, B / 03)',
          fr: 'Codex Vaticanus (vers 300–325 ap. J.-C.)',
          ar: 'المخطوطة الفاتيكانية (مكتبة الفاتيكان Gr. 1209)',
        },
        language: {
          en: 'Koine Greek',
          fr: 'Grec koinè',
          ar: 'اليونانية الكوينية',
        },
        period: {
          en: 'Early 4th century CE',
          fr: 'Début du IVe siècle ap. J.-C.',
          ar: 'أوائل القرن الرابع الميلادي (حوالي ٣٠٠ – ٣٢٥ م)',
        },
        significance: {
          en: 'One of the oldest and most authoritative witnesses to the Alexandrian text-type, preserved in the Vatican Library since at least 1475.',
          fr: 'L’un des plus anciens et prestigieux témoins du texte alexandrin, conservé au Vatican.',
          ar: 'من أقدم المخطوطات اليونانية المعتمدة في النقد النصي، محفوظة في مكتبة الفاتيكان منذ القرن الخامس عشر.',
        },
        description: {
          en: 'Lacks 1 and 2 Timothy, Titus, Philemon, Revelation, and portions of Hebrews and Genesis. Scribes left an empty blank column at the end of Mark, indicating awareness of missing text.',
          fr: 'Omet l’Apocalypse, les épîtres pastorales et la fin de Marc (laissant une colonne vide significative).',
          ar: 'ناقصة الأسفار الرعوية وسفر الرؤيا، وترك الناسخ عموداً فارغاً عمداً عند نهاية إنجيل مرقس دلالة على علمه بأن نهاية الإنجيل مبتورة.',
        },
        extantManuscripts: {
          en: 'Vatican Apostolic Library, Codex Vaticanus Graecus 1209.',
          fr: 'Bibliothèque apostolique vaticane (MS Gr. 1209).',
          ar: 'المكتبة الفاتيكانية، المخطوطة اليونانية ١٢٠٩.',
        },
        variantCountOrStatus: {
          en: 'Differs in thousands of places from the Textus Receptus (King James basis) and from Codex Sinaiticus.',
          fr: 'Diverge en des milliers d’endroits du Textus Receptus et du Sinaiticus.',
          ar: 'تختلف في آلاف الكلمات عن النص البيزنطي الشائع وعن المخطوطة السينائية ذاتها.',
        },
        theologicalPerspective: {
          en: 'Demonstrates the sharp textual disagreements among the earliest surviving Christian bibles.',
          fr: 'Illustre les désaccords textuels majeurs entre les plus anciennes bibles chrétiennes.',
          ar: 'شاهد على التباين العميق بين أقدم نسختين للعهد الجديد في التاريخ المسيحي (السينائية والفاتيكانية).',
        },
      },
      {
        id: 'codex_alexandrinus',
        name: {
          en: 'Codex Alexandrinus (5th century CE, A / 02)',
          fr: 'Codex Alexandrinus (Ve siècle ap. J.-C.)',
          ar: 'المخطوطة الإسكندرانية (المتحف البريطاني)',
        },
        language: {
          en: 'Koine Greek',
          fr: 'Grec koinè',
          ar: 'اليونانية الكوينية',
        },
        period: {
          en: 'ca. 400 – 440 CE, Egypt / Alexandria',
          fr: 'vers 400 – 440 ap. J.-C. en Égypte',
          ar: 'حوالي ٤٠٠ – ٤٤٠ م في الإسكندرية بمصر',
        },
        significance: {
          en: 'First of the great uncial bibles to be studied by European scholars when Patriarch Cyril Lucaris gifted it to King Charles I in 1627.',
          fr: 'Premier grand codex biblique étudié en Europe après son don au roi Charles Ier en 1627.',
          ar: 'أول مخطوطة كبرى درست في أوروبا بعد أن أهداها بطريرك القسطنطينية كيرلس لوكاريس لملك إنجلترا سنة ١٦٢٧ م.',
        },
        description: {
          en: 'Contains the complete Greek Old and New Testaments, plus the 1st and 2nd Epistles of Clement and the Psalms of Solomon.',
          fr: 'Contient la 1ère et 2e Épître de Clément parmi les écrits du Nouveau Testament.',
          ar: 'تتضمن رسالتي كليمنت الروماني ضمن أسفار العهد الجديد الرسمية ومزامير سليمان، مما يثبت عدم استقرار الأسفار.',
        },
        extantManuscripts: {
          en: 'British Library, Royal MS 1 D. VIII.',
          fr: 'British Library (Royal MS 1 D. VIII).',
          ar: 'المكتبة البريطانية بلندن.',
        },
        variantCountOrStatus: {
          en: 'Represents the emerging Byzantine text-type in the Gospels, showing gradual textual expansion and harmonizing.',
          fr: 'Représente le texte byzantin naissant avec ses tendances à l’harmonisation.',
          ar: 'تمثل بداية النص البيزنطي الذي توسع فيه النساخ لدمج الروايات المتضاربة وتنعيم العبارات.',
        },
        theologicalPerspective: {
          en: 'Shows the chronological evolution of the text as scribes smoothed awkward readings across subsequent centuries.',
          fr: 'Témoigne de l’évolution graduelle du texte au cours des siècles.',
          ar: 'تؤكد التطور التاريخي التدريجي لنصوص الإنجيل وتراكم التعديلات بمرور الزمن.',
        },
      },
      {
        id: 'peshitta_nt',
        name: {
          en: 'Syriac Peshitta New Testament',
          fr: 'Peshitta Syriaque du Nouveau Testament',
          ar: 'البشيطا السريانية للعهد الجديد',
        },
        language: {
          en: 'Classical Classical Syriac (Edessan Aramaic)',
          fr: 'Syriaque classique d’Édesse',
          ar: 'السريانية الفصحى (لغة نصارى الشام والعراق)',
        },
        period: {
          en: 'ca. 411 – 435 CE under Rabbula, Bishop of Edessa',
          fr: 'vers 411 – 435 ap. J.-C. sous l’évêque Rabbula',
          ar: 'القرن الخامس الميلادي (حوالي ٤١١ – ٤٣٥ م) في عهد أسقف الرها رابولا',
        },
        significance: {
          en: 'The standard New Testament for the Church of the East and Syrian Orthodox churches, closer geographically and linguistically to Jesus’ Aramaic milieu.',
          fr: 'Texte officiel des Églises syriaques et assyriennes, plus proche géographiquement du milieu sémitique de Jésus.',
          ar: 'النص الرسمي المعتمد في كنائس المشرق العربي، وهو أقرب بيئياً ولغوياً إلى اللسان الآرامي الأصلي ليسوع.',
        },
        description: {
          en: 'Historically rejects and excludes 5 canonical Western books: 2 Peter, 2 John, 3 John, Jude, and Revelation (the Apocalypse).',
          fr: 'Exclut historiquement 5 livres canoniques occidentaux : 2 Pierre, 2 et 3 Jean, Jude et l’Apocalypse.',
          ar: 'تستبعد خمسة أسفار كاملة تعتبرها الكنائس الغربية مقدسة: رسالة بطرس الثانية، ورسالتي يوحنا ٢ و٣، ورسالة يهوذا، وسفر الرؤيا!',
        },
        extantManuscripts: {
          en: 'Over 350 ancient Syriac manuscripts, including British Library Add MS 14470 (5th/6th c.).',
          fr: 'Plus de 350 manuscrits anciens à Londres, Paris, Vatican et Damas.',
          ar: 'أكثر من ٣٥٠ مخطوطة سريانية قديمة في مكتبات باريس ولندن والفاتيكان ودير السريان بوادي النطرون.',
        },
        variantCountOrStatus: {
          en: 'Only 22 books in its traditional canon rather than the 27 books of the Western New Testament.',
          fr: '22 livres dans son canon historique au lieu de 27.',
          ar: 'يقتصر قانونها التاريخي على ٢٢ سفراً فقط بدلاً من ٢٧ سفراً في العهد الجديد الغربي.',
        },
        theologicalPerspective: {
          en: 'Major historical proof that even fundamental book counts of the New Testament differed across ancient Christian geographical centers.',
          fr: 'Preuve irréfutable que le canon variait selon les centres géographiques chrétiens.',
          ar: 'دليل تاريخي باهر على أن عدد أسفار الإنجيل ذاتها لم يكن محل اتفاق بين كنائس الشرق والغرب.',
        },
      },
      {
        id: 'diatessaron_tatian',
        name: {
          en: 'Diatessaron of Tatian (Single Unified Gospel Harmony)',
          fr: 'Le Diatessaron de Tatien (Évangile Unique Harmonisé)',
          ar: 'إنجيل الدياتسارون الموحد (تأليف تاتيان السوري)',
        },
        language: {
          en: 'Old Syriac / Greek',
          fr: 'Syriaque ancien / Grec',
          ar: 'السريانية القديمة واليونانية',
        },
        period: {
          en: 'ca. 160 – 175 CE (composed in Rome/Syria)',
          fr: 'vers 160 – 175 ap. J.-C.',
          ar: 'حوالي ١٦٠ – ١٧٥ م على يد اللاهوتي السوري تاتيان تلميذ يوستينوس الشهيد',
        },
        significance: {
          en: 'Merged all four conflicting Gospels into a single seamless continuous narrative. It served as the official liturgical text of Syrian Christians for over 250 years until banned and burned by Bishop Rabbula in the 5th century.',
          fr: 'A fusionné les 4 évangiles en un récit unique, servant de texte officiel en Syrie pendant plus de deux siècles.',
          ar: 'دمج الأناجيل الأربعة المتناقضة في قصة واحدة متصلة، وكان الإنجيل الرسمي الوحيد المتلو في كنائس سوريا لأكثر من قرنين حتى أحرقه الأسقف رابولا في القرن الخامس لإجبارهم على الأناجيل الأربعة.',
        },
        description: {
          en: 'Synthesized contradictory chronologies and events from the four separate gospels into a single composite work ("Through Four").',
          fr: 'Harmonisait les contradictions flagrantes entre les quatre évangiles séparés.',
          ar: 'أزال التناقضات الصريحة بين الأناجيل في قصة الميلاد والمحاكمة والصلب وجمعها في مصحف إنجيلي واحد.',
        },
        extantManuscripts: {
          en: 'Dura-Europos parchment fragment 0212 (ca. 200–250 CE, found in Syria in 1933), Ephrem the Syrian’s Commentary on the Diatessaron (Chester Beatty MS 709), Arabic Diatessaron (Vatican MS 14).',
          fr: 'Fragment de Doura-Europos (vers 250 ap. J.-C.), Commentaire d’Éphrem le Syrien, Diatessaron arabe.',
          ar: 'رقاقة دورا أوربوس المكتشفة في سوريا (حوالي ٢٥٠ م)، وشرح القديس مار أفرام السرياني، ومخطوطة الدياتسارون العربية بالفاتيكان.',
        },
        variantCountOrStatus: {
          en: 'Eliminated genealogies and resolved divergent trial scenes into a unified hybrid text.',
          fr: 'Supprimait les généalogies divergentes de Matthieu et Luc.',
          ar: 'حذف سلسلتي النسب المتضاربتين في إنجيلي متى ولوقا، وقدم سياقاً موحداً منقحاً.',
        },
        theologicalPerspective: {
          en: 'Shows that early Christians felt the acute problem of four contradictory gospels and attempted to replace them with a single text.',
          fr: 'Prouve que les chrétiens d’Orient ressentaient le besoin d’un évangile unique cohérent.',
          ar: 'يؤكد أن مسيحيي الصدر الأول شعروا بتناقض الأناجيل الأربعة وسعوا إلى استبدالها بإنجيل واحد موحد شبيه بفكرة القرآن.',
        },
      },
      {
        id: 'gospel_of_barnabas',
        name: {
          en: 'Gospel of Barnabas (Apocrypha)',
          fr: 'Évangile de Barnabé (Apocryphe)',
          ar: 'إنجيل برنابا (المخطوطة التاريخية البارزة)',
        },
        language: {
          en: 'Italian & Spanish manuscripts (from earlier Mediterranean traditions)',
          fr: 'Italien et espagnol',
          ar: 'الإيطالية والإسبانية القديمة (عن أصول متوسطية أقدم)',
        },
        period: {
          en: 'Preserved manuscripts dated to 14th – 16th c. CE (contains traditions reflecting ancient Ebionite Judeo-Christian Christology)',
          fr: 'Manuscrits conservés des XIVe–XVIe s.',
          ar: 'المخطوطات الباقية تعود للقرنين الرابع عشر والسادس عشر الميلاديين وتتضمن روايات أبيونية قديمة',
        },
        significance: {
          en: 'Famous for explicitly denying the divinity and crucifixion of Jesus (stating Judas Iscariot was transformed to look like Jesus and crucified in his stead) and announcing the Prophet Muhammad ﷺ by name.',
          fr: 'Célèbre pour nier la divinité et la crucifixion de Jésus, affirmant que Judas a été crucifié à sa place et annonçant le Prophète Muhammad par son nom.',
          ar: 'اشتهر بتوافقه الفريد مع القرآن الكريم في نفي ألوهية المسيح ونفي صلبه (مبيناً أن الشبه ألقي على يهوذا الإسخريوطي فصلب مكانه) وبشارته الصريحة بخاتم المرسلين محمد ﷺ باسمه.',
        },
        description: {
          en: 'Presents Jesus as a prophet of strict monotheism (Tawhid) who rejected worship of himself and corrected the corruptions introduced by Paul.',
          fr: 'Présente Jésus comme un prophète strict monothéiste rejetant toute divinisation.',
          ar: 'يصور عيسى نبياً مرسلاً يدعو إلى التوحيد الخالص، ويحذر من ابتداع بولس في تحريف الدين وإسقاط الشريعة والختان.',
        },
        extantManuscripts: {
          en: 'National Library of Vienna (Cod. 2662, Italian complete MS), Sydney Fisher Library (Spanish fragment transcript).',
          fr: 'Bibliothèque nationale de Vienne (Cod. 2662, en italien), manuscrit espagnol de Sydney.',
          ar: 'المكتبة الوطنية في فيينا (Cod. 2662 باللغة الإيطالية كاملاً) ومخطوطة سيدني باللغة الإسبانية.',
        },
        variantCountOrStatus: {
          en: 'Rejected by mainstream Christianity; highly cited in comparative religion and Islamic apologetics.',
          fr: 'Rejeté par le christianisme traditionnel ; largement discuté en apologétique musulmane.',
          ar: 'مرفوض كلياً لدى الكنائس المسيحية، ويحتج به الباحثون في مقارنة الأديان كشاهد على التيارات النصرانية الموحدة الرافضة للتثليث.',
        },
        theologicalPerspective: {
          en: 'Reflects the survival of early Judeo-Christian monotheistic currents (Ebionites, Nazarenes) that resisted Pauline trinitarian dogma.',
          fr: 'Témoigne de la persistance de courants chrétiens monothéistes sémitiques (Ébionites).',
          ar: 'يعكس استمرار بقايا الأفكار النصرانية الموحدة (كالأبيونيين والنصارى الأوائل) التي صمدت في وجه التثليث البولسي.',
        },
      },
      {
        id: 'nag_hammadi_gospels',
        name: {
          en: 'Nag Hammadi Coptic Gospels (Gospel of Thomas, Philip, Truth)',
          fr: 'Évangiles Coptes de Nag Hammadi (Thomas, Philippe)',
          ar: 'أناجيل نجع حمادي القبطية (إنجيل توما وإنجيل فيلبس ومريم)',
        },
        language: {
          en: 'Sahidic Coptic (translated from early Greek originals)',
          fr: 'Copte sahidique',
          ar: 'القبطية الصعيدية (مترجمة عن أصول يونانية قديمة)',
        },
        period: {
          en: 'Hidden ca. 367 CE in sealed earthenware jars; discovered in Upper Egypt in 1945',
          fr: 'Enterrés vers 367 ap. J.-C. ; découverts en 1945 en Haute-Égypte',
          ar: 'دفنت في جرار فخارية سنة ٣٦٧ م في مغارات جبل الطارف بصعيد مصر، واكتشفت عام ١٩٤٥ م',
        },
        significance: {
          en: '13 leather-bound papyrus codices containing 52 ancient treatises, including the complete Gospel of Thomas (114 secret sayings of Jesus), hidden after Bishop Athanasius ordered the destruction of non-canonical books in 367 CE.',
          fr: '52 traités dont l’Évangile de Thomas, cachés suite au décret d’Athanase ordonnant la destruction des apocryphes en 367.',
          ar: '٥٢ كتاباً وسفراً أثرياً محفوظاً في ١٣ مجلداً جلدياً، خبأها الرهبان بعد أمر أثناسيوس بحرق الأناجيل غير القانونية سنة ٣٦٧ م.',
        },
        description: {
          en: 'Lacks the narrative of the crucifixion as an atonement for sins; focuses instead on divine wisdom, ascetic illumination, and inner light.',
          fr: 'Se concentre sur la sagesse ésotérique et la lumière intérieure plutôt que sur la mort expiatoire.',
          ar: 'تركز على الحكمة والتسبيح والزهد والمعرفة النورانية بدلاً من عقيدة الفداء والصلب والخطيئة الأصلية.',
        },
        extantManuscripts: {
          en: 'Coptic Museum, Cairo, Egypt (Nag Hammadi Codices I through XIII).',
          fr: 'Musée copte du Caire (Codices de Nag Hammadi I à XIII).',
          ar: 'المتحف القبطي في القاهرة، المجلدات من الأول إلى الثالث عشر.',
        },
        variantCountOrStatus: {
          en: 'Entirely independent non-synoptic collections of sayings attributed to Jesus.',
          fr: 'Recueils de paroles de Jésus totalement indépendants des évangiles canoniques.',
          ar: 'مجموعة مستقلة تضم ١١٤ حكمة وقولاً مأثوراً عن المسيح تختلف عن البنية الكنسية التقليدية.',
        },
        theologicalPerspective: {
          en: 'Sensational 20th-century archaeology confirming that earliest Christianity was a mosaic of conflicting gospels and theological visions before imperial Roman enforcement.',
          fr: 'Confirmation archéologique majeure que le christianisme primitif était foisonnant et divisé avant l’imposition du dogme romain.',
          ar: 'أعظم اكتشاف أثري في القرن العشرين أثبت أن القرن الأول والثاني شهدا عشرات الأناجيل المتصارعة قبل أن تفرض الإمبراطورية الرومانية رأيها بالقوة.',
        },
      },
    ],
  },
  {
    id: 'suhuf_ibrahim',
    prophetId: 'ibrahim',
    prophetName: {
      en: 'Ibrahim (Abraham) عليه السلام',
      fr: 'Abraham (Ibrahim) عليه السلام',
      ar: 'إِبْرَاهِيمُ خَلِيلُ الرَّحْمَٰنِ عليه السلام',
    },
    title: {
      en: 'The Scrolls of Abraham (Suhuf Ibrahim)',
      fr: 'Les Feuillets d’Abraham (Suhuf Ibrahim)',
      ar: 'صُحُفُ إِبْرَاهِيمَ عليه السلام',
    },
    transliteration: 'Ṣuḥuf Ibrāhīm',
    originalLanguage: {
      en: 'Ancient Northwest Semitic / Babylonian Aramaic / Early Canaanite',
      fr: 'Sémitique ancien du Nord-Ouest / Araméen babylonien / Cananéen primitif',
      ar: 'السامية القديمة / الآرامية البابلية والكنعانية المبكرة',
    },
    revealedEra: {
      en: '~1900 – 1800 BCE (Patriarchal Bronze Age)',
      fr: '~1900 – 1800 av. J.-C. (Âge du Bronze)',
      ar: 'حوالي القرنين التاسع عشر والثامن عشر قبل الميلاد',
    },
    revealedLocation: {
      en: 'Ur of the Chaldees, Haran, Canaan (Hebron), & Makkah',
      fr: 'Ur des Chaldéens, Haran, Canaan (Hébron) et La Mecque',
      ar: 'أور الكلدانيين في بابل، وحران، وأرض كنعان (الخليل)، ومكة المكرمة',
    },
    quranReferences: [
      {
        surah: 87,
        ayah: '18-19',
        arabicText: '﴿إِنَّ هَٰذَا لَفِي الصُّحُفِ الْأُولَىٰ * صُحُفِ إِبْرَاهِيمَ وَمُوسَىٰ﴾',
        translationEn: 'Indeed, this is in the former scriptures, the scriptures of Abraham and Moses.',
        translationFr: 'Ceci se trouve, certes, dans les Feuilles anciennes, les Feuilles d’Abraham et de Moïse.',
      },
      {
        surah: 53,
        ayah: '36-37',
        arabicText: '﴿أَمْ لَمْ يُنَبَّأْ بِمَا فِي صُحُفِ مُوسَىٰ * وَإِبْرَاهِيمَ الَّذِي وَفَّىٰ﴾',
        translationEn: 'Or has he not been informed of what was in the scriptures of Moses and Abraham, who fulfilled [his obligations]?',
        translationFr: 'Ne lui a-t-on pas annoncé ce qu’il y avait dans les Feuilles de Moïse et d’Abraham qui a tenu sa promesse ?',
      },
    ],
    preservationStatus: 'lost_original',
    versionsCount: 4, // 4 surviving records & pseudepigrapha traditions
    versionsSummary: {
      en: '4 Surviving Historical Traditions & Records: The Lost Divine Original (Al-Asl al-Mafqud), The Testament of Abraham (Greek, Coptic, Arabic recensions), The Apocalypse of Abraham (Old Slavonic from Semitic vorlage), and Prophetic Hadiths recording their moral maxims (Sahih Ibn Hibban).',
      fr: '4 Traditions historiques et témoins : L’Original divin perdu, le Testament d’Abraham (recensions grecque, copte, arabe), l’Apocalypse d’Abraham (slave) et les Hadiths authentiques rapportant leurs maximes morales.',
      ar: '٤ شواهد وتقاليد تاريخية: الأصل الإلهي المفقود، وصية إبراهيم (برواياتها اليونانية والقبطية والعربية)، رؤيا إبراهيم (السلافية عن أصل سامي)، وأحاديث المصطفى ﷺ التي روت حكم تلك الصحف ومواعظها (صحيح ابن حبان).',
    },
    theologicalContext: {
      en: 'The Scrolls of Abraham represent the earliest primordial divine revelation explicitly named in the Qur’an, containing pure monotheistic creed (Hanifiyyah), parables, and ethical wisdom. While the physical scrolls were lost over four millennia of history, authentic Hadith narrations (such as that of Abu Dharr in Sahih Ibn Hibban) preserve their moral precepts.',
      fr: 'Les Feuillets d’Abraham constituent la plus ancienne révélation divine mentionnée nominativement dans le Coran, axée sur le monothéisme pur (Hanifiyya) et la sagesse éthique.',
      ar: 'صحف إبراهيم أول الكتب السماوية المسماة في القرآن الكريم، تضمنت الحنيفية السمحة والمواعظ والحكم والأمثال. ضاعت ألواحها الأصلية بتقادم آلاف السنين، وحفظت لنا السنة النبوية الشريفة في صحيح ابن حبان وجامع الآجري قبسات من حكمها العظيمة.',
    },
    versions: [
      {
        id: 'lost_divine_scrolls',
        name: {
          en: 'The Original Divine Scrolls (Al-Asl al-Mafqud)',
          fr: 'Les Feuillets Révélés Originels (Al-Asl al-Mafqud)',
          ar: 'الصحف الإلهية الأولى المفقودة',
        },
        language: {
          en: 'Ancient Semitic Patriarchal tongue',
          fr: 'Langue sémitique patriarcale antique',
          ar: 'اللسان السامي الإبراهيمي المبكر',
        },
        period: {
          en: '~19th century BCE',
          fr: '~XIXe siècle av. J.-C.',
          ar: 'القرن التاسع عشر قبل الميلاد',
        },
        significance: {
          en: 'The direct revelation inscribed for the Father of the Prophets and Friend of Allah (Khalilullah).',
          fr: 'La révélation directe accordée à l’Ami intime d’Allah (Khalilullah).',
          ar: 'الوحي الإلهي المباشر الذي أوتيه خليل الرحمن وإمام الحنفاء عليه السلام.',
        },
        description: {
          en: 'According to prophetic tradition narrated in Sahih Ibn Hibban (#361), Allah revealed 10 scrolls unto Abraham, filled with proverbs, wisdom for the intellect, and admonitions against tyranny.',
          fr: 'Selon la tradition prophétique (Sahih Ibn Hibban n°361), Allah fit descendre 10 feuillets sur Abraham.',
          ar: 'روى أبو ذر رضي الله عنه في حديث صحيح ابن حبان: "قلت يا رسول الله: فما كانت صحف إبراهيم؟ قال: كانت أمثالاً كلها...".',
        },
        extantManuscripts: {
          en: 'No surviving physical manuscripts from the 2nd millennium BCE.',
          fr: 'Aucun manuscrit matériel préservé du IIe millénaire av. J.-C.',
          ar: 'لا توجد مخطوطات مادية باقية من العصر البرونزي، بل فقدت الأصول بمرور آلاف السنين.',
        },
        variantCountOrStatus: {
          en: 'Extinct as an independent complete book; remembered in scripture and tradition.',
          fr: 'Disparue en tant qu’ouvrage complet autonome.',
          ar: 'مفقودة ككتاب مادي كامل، محفوظة الذكر والمضمون في الوحي الخاتم.',
        },
        theologicalPerspective: {
          en: 'Affirms that divine revelation began with ethical clarity and pure monotheism long before written legal codes.',
          fr: 'Atteste que la révélation a débuté par la pureté éthique et le monothéisme intégral.',
          ar: 'تأكيد قرآني على وحدة الرسالات وأن جوهر الدين واحد: التوحيد والعدل والزهد.',
        },
      },
      {
        id: 'testament_of_abraham',
        name: {
          en: 'Testament of Abraham (Pseudepigrapha)',
          fr: 'Testament d’Abraham (Pseudépigraphe)',
          ar: 'وصية إبراهيم (المخطوطات الأبوكريفية القديمة)',
        },
        language: {
          en: 'Greek, Coptic, Ge’ez (Ethiopic), Arabic recensions',
          fr: 'Grec, copte, guèze et arabe',
          ar: 'اليونانية والقبطية والحبشية والعربية القديمة',
        },
        period: {
          en: '1st – 2nd century CE (from Semitic Vorlage)',
          fr: 'Ier – IIe siècle ap. J.-C.',
          ar: 'القرن الأول إلى الثاني الميلادي عن أصول شرقية',
        },
        significance: {
          en: 'Ancient Jewish-Christian pseudepigraphic text recounting Archangel Michael visiting Abraham and showing him the visions of judgment.',
          fr: 'Récit antique relatant la visite de l’archange Michel à Abraham et la vision du Jugement.',
          ar: 'سفر قديم يروي نزول الملاك جبريل أو ميخائيل على إبراهيم ليريه ملكوت السماوات والأرض والميزان والجنة والنار.',
        },
        description: {
          en: 'Extant in two recensions: Long Recension A and Short Recension B, paralleling Quranic themes of Abraham being shown the dominion of the heavens and the earth (Surah 6:75).',
          fr: 'Existe en deux recensions (longue A et courte B), en résonance avec le Coran (6:75).',
          ar: 'محفوظ في نسختين (المطولة A والموجزة B)، ويتطابق موضوعه مع قول الله تعالى ﴿وَكَذَٰلِكَ نُرِي إِبْرَاهِيمَ مَلَكُوتَ السَّمَاوَاتِ وَالْأَرْضِ﴾.',
        },
        extantManuscripts: {
          en: 'Paris BnF Greek MS 770 (1315 CE), Milan Ambrosian MS, Vatican Arabic MSS.',
          fr: 'BnF Grec 770 (1315), manuscrits arabes de la Bibliothèque vaticane.',
          ar: 'مخطوطة المكتبة الوطنية بباريس (Grec 770) ومخطوطات الفاتيكان العربية.',
        },
        variantCountOrStatus: {
          en: 'Multiple divergent linguistic versions across Eastern Christendom.',
          fr: 'Multiples versions divergentes conservées en Orient.',
          ar: 'روايات لغوية متعددة متقاربة في المضمون الوعظي.',
        },
        theologicalPerspective: {
          en: 'Echoes ancient oral memories of Abraham’s celestial journey and intercession.',
          fr: 'Témoigne de la vivacité des mémoires orales de l’ascension mystique d’Abraham.',
          ar: 'يعكس استمرار الروايات الشفهية التاريخية حول رؤيا إبراهيم لملكوت الله قبل وفاته.',
        },
      },
      {
        id: 'apocalypse_of_abraham',
        name: {
          en: 'Apocalypse of Abraham',
          fr: 'Apocalypse d’Abraham',
          ar: 'رؤيا إبراهيم (الأبوكاليبس الإبراهيمي)',
        },
        language: {
          en: 'Old Church Slavonic (translated from lost Greek/Hebrew text)',
          fr: 'Vieux slave d’église',
          ar: 'السلافية الكنسية القديمة (عن أصل يوناني/عبراني مفقود)',
        },
        period: {
          en: 'Late 1st – 2nd century CE (following the Roman destruction of the Second Temple)',
          fr: 'Fin du Ier – IIe siècle ap. J.-C.',
          ar: 'أواخر القرن الأول الميلادي (بعد خراب أورشليم سنة ٧٠ م)',
        },
        significance: {
          en: 'Contains an extraordinary account of young Abraham rejecting the idols carved by his father Terah (Azar) and witnessing their destruction by fire, closely paralleling the Quranic narrative in Surah Al-Anbiya.',
          fr: 'Raconte la jeunesse d’Abraham rejetant les idoles de son père Terah (Azar), en résonance frappante avec le récit coranique.',
          ar: 'يحتوي على قصة إبراهيم في شبابه وتكسيره لأصنام أبيه تارح (آزر) ونفوره من عبادتها واحتراق بيت الأصنام، وهو ما يطابق سورة الأنبياء والأنعام بصورة مذهلة!',
        },
        description: {
          en: 'Preserved exclusively in Old Slavonic manuscripts within the Russian and South Slavic Codex collections (Uspenskij Sbornik).',
          fr: 'Préservé uniquement dans les recueils médiévaux russes et slaves du Sud.',
          ar: 'محفوظ في المخطوطات السلافية الروسية القديمة (مجموعة أوسبنسكي بالموسكوب).',
        },
        extantManuscripts: {
          en: 'Synodal Collection MS 945 (14th c., State Historical Museum, Moscow).',
          fr: 'Collection Synodale MS 945 (XIVe s., Musée historique d’État, Moscou).',
          ar: 'المتحف التاريخي بموسكو (مخطوطة المجمع السينودسي رقم ٩٤٥).',
        },
        variantCountOrStatus: {
          en: 'Single primary textual recension preserved in Slavonic codices.',
          fr: 'Recension slave unique.',
          ar: 'رواية وحيدة محفوظة في المخطوطات السلافية الكنسية.',
        },
        theologicalPerspective: {
          en: 'Extraordinary historical corroboration of the Prophet Ibrahim’s iconoclastic struggle against idolatry recorded in the Qur’an.',
          fr: 'Corrobore de manière saisissante le combat d’Abraham contre les idoles décrit dans le Coran.',
          ar: 'تطابق تاريخي وأثري مدهش مع أحداث تكسير الأصنام ومناظرة قومه المذكورة في القرآن الكريم.',
        },
      },
      {
        id: 'hadith_record_suhuf',
        name: {
          en: 'Prophetic Hadith Record of the Precepts of the Suhuf',
          fr: 'Transmission Prophétique des Maximes des Feuillets (Hadith)',
          ar: 'الرواية النبوية المحفوظة في كتب السنة الشريفة',
        },
        language: {
          en: 'Classical Arabic',
          fr: 'Arabe classique',
          ar: 'العربية الفصحى المسندة',
        },
        period: {
          en: '7th century CE (recorded by Ibn Hibban, Al-Ajurri, Ibn Kathir)',
          fr: 'VIIe siècle ap. J.-C.',
          ar: 'القرن الأول الهجري (مدون في أمهات كتب الحديث والزهد)',
        },
        significance: {
          en: 'The definitive Islamic record preserving the actual ethical contents of the Scrolls of Abraham as described by Prophet Muhammad ﷺ.',
          fr: 'Le témoignage islamique authentique préservant la sagesse morale des Feuillets d’Abraham.',
          ar: 'الأصل الإسلامي الموثوق الذي حفظ لنا المعاني والمواعظ الحقيقية لصحف إبراهيم كما جلاها الصادق المصدوق ﷺ.',
        },
        description: {
          en: 'Quotes the wisdom of the scrolls: "A ruler must not be deceived by power... An intelligent person must divide his day into four hours: an hour to supplicate his Lord, an hour to examine his deeds, an hour to contemplate Allah’s creation, and an hour to earn lawful sustenance."',
          fr: 'Détaille les maximes des feuillets : le sage doit partager son temps entre l’adoration, l’examen de conscience, la méditation et la recherche de subsistance licite.',
          ar: 'تضمنت الحكمة البالغة: "وعلى العاقل ما لم يكن مغلوباً أن يكون له ساعات: ساعة يناجي فيها ربه، وساعة يحاسب فيها نفسه، وساعة يفكر فيها في صنع الله، وساعة يخلو فيها لحاجته من المطعم والمشرب... وعلى العاقل أن يكون بصيراً بزمانه، مقبلاً على شأنه، حافظاً للسانه...".',
        },
        extantManuscripts: {
          en: 'Sahih Ibn Hibban (#361), Kitab al-Arba’in by Al-Ajurri, Shu’ab al-Iman by Al-Bayhaqi, Al-Bidayah wa al-Nihayah by Ibn Kathir.',
          fr: 'Sahih Ibn Hibban, Shu’ab al-Iman d’al-Bayhaqi, Al-Bidayah wa an-Nihaya d’Ibn Kathir.',
          ar: 'صحيح ابن حبان، كتاب الشريعة والزهد للآجري، شعب الإيمان للبيهقي، البداية والنهاية لابن كثير.',
        },
        variantCountOrStatus: {
          en: 'Transmitted with sound continuous chains (Isnad) from Abu Dharr al-Ghifari.',
          fr: 'Transmis par plusieurs chaînes de transmission depuis Abou Dharr.',
          ar: 'حديث مروي بأسانيد حسنة من طرق متعددة عن الصحابي الجليل أبي ذر الغفاري رضي الله عنه.',
        },
        theologicalPerspective: {
          en: 'Reveals that true spiritual wisdom and self-accountability have been universal constants across all prophetic dispensations.',
          fr: 'Prouve que la sagesse spirituelle et la responsabilité individuelle sont universelles dans la prophétie.',
          ar: 'تأكيد على أن جوهر الدين المحمدي هو عين الحكمة التي أوحاها الله إلى أبي الأنبياء إبراهيم عليه السلام.',
        },
      },
    ],
  },
  {
    id: 'suhuf_idris',
    prophetId: 'idris',
    prophetName: {
      en: 'Idris (Enoch) عليه السلام',
      fr: 'Idris (Hénoch) عليه السلام',
      ar: 'إِدْرِيسُ نَبِيُّ اللَّهِ عليه السلام',
    },
    title: {
      en: 'The 30 Scrolls of Idris',
      fr: 'Les 30 Feuillets d’Idris (Hénoch)',
      ar: 'صُحُفُ إِدْرِيسَ عليه السلام (٣٠ صحيفة)',
    },
    transliteration: 'Ṣuḥuf Idrīs',
    originalLanguage: {
      en: 'Primordial Ancient Semitic / Archaic Mesopotamian',
      fr: 'Sémitique archaïque / Mésopotamien primitif',
      ar: 'السامية البدائية الأولى (لسان بابل القديم)',
    },
    revealedEra: {
      en: 'Antediluvian Era (Prior to the Great Flood of Nuh)',
      fr: 'Ère antédiluvienne (avant le Déluge de Noé)',
      ar: 'ما قبل الطوفان (العصر الإدريسي الأول)',
    },
    revealedLocation: {
      en: 'Mesopotamia (Babil / Iraq) & the Nile Valley',
      fr: 'Mésopotamie (Babylone) et vallée du Nil',
      ar: 'أرض بابل وسواد العراق وقيل منف بمصر',
    },
    quranReferences: [
      {
        surah: 19,
        ayah: '56-57',
        arabicText: '﴿وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا * وَرَفَعْنَاهُ مَكَانًا عَلِيًّا﴾',
        translationEn: 'And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. And We raised him to a high station.',
        translationFr: 'Et mentionne Idris, dans le Livre. C’était un véridique et un prophète. Et Nous l’élevâmes à un haut rang.',
      },
    ],
    preservationStatus: 'lost_original',
    versionsCount: 3,
    versionsSummary: {
      en: '3 Historical Records: The 30 Divine Scrolls recorded in Sahih Hadith (Sahih Ibn Hibban #361), Ethiopic 1 Enoch (Book of the Watchers and Astronomical Book), and Slavonic 2 Enoch (Secrets of Enoch).',
      fr: '3 Témoins historiques : Les 30 feuillets rapportés par le Hadith (Ibn Hibban), le Livre d’Hénoch éthiopien (1 Hénoch) et le Livre des secrets d’Hénoch slave (2 Hénoch).',
      ar: '٣ شواهد تاريخية: ٣٠ صحيفة سماوية نص عليها الحديث الصحيح (ابن حبان)، سفر أخنوخ الحبشي الأول (١ أخنوخ)، وسفر أسرار أخنوخ السلافي الثاني (٢ أخنوخ).',
    },
    theologicalContext: {
      en: 'Prophet Idris (identified traditionally with Enoch) was the first human being granted the art of writing with the pen (Al-Khatt bil-Qalam) and the knowledge of astronomy and celestial orbits. According to Sahih Hadith, Allah revealed 30 scrolls unto him.',
      fr: 'Idris (Hénoch) est traditionnellement reconnu comme le premier homme à avoir écrit avec la plume et reçu la science des astres. 30 feuillets lui furent révélés.',
      ar: 'إدريس عليه السلام أول من خط بالقلم في تاريخ البشرية وأول من درس النجوم وحساب الفلك. أنزل الله عليه ثلاثين صحيفة جامعة لأصول التوحيد والشريعة ومحاربة طغيان قابيل، ورفعه الله مكاناً علياً في السماء الرابعة.',
    },
    versions: [
      {
        id: 'hadith_idris_scrolls',
        name: {
          en: 'The 30 Divine Scrolls (Sahih Hadith Record)',
          fr: 'Les 30 Feuillets Révélés (Hadith d’Ibn Hibban)',
          ar: 'الصحف الثلاثون المنزلة (الرواية النبوية الصحيحة)',
        },
        language: {
          en: 'Classical Arabic (reporting the ancient revelation)',
          fr: 'Arabe classique',
          ar: 'العربية الفصحى المسندة',
        },
        period: {
          en: 'Transmitted from the Prophet Muhammad ﷺ to Abu Dharr',
          fr: 'Transmis par le Prophète ﷺ',
          ar: 'عن النبي ﷺ في بيان عدد الكتب المنزلة على الأنبياء',
        },
        significance: {
          en: 'Confirmed in Sahih Ibn Hibban (#361): "How many books did Allah reveal? He said: 104 books... upon Idris 30 scrolls."',
          fr: 'Confirmé dans Sahih Ibn Hibban : 104 livres révélés, dont 30 sur Idris.',
          ar: 'ثبت في صحيح ابن حبان: "قلت يا رسول الله كم كتاباً أنزل الله؟ قال: مائة كتاب وأربعة كتب، أنزل الله على شيث خمسين صحيفة، وأنزل على إخنوخ - وهو إدريس - ثلاثين صحيفة...".',
        },
        description: {
          en: 'First written codices of divine guidance, establishing writing, measurement, and moral limits against pre-Flood transgressions.',
          fr: 'Premiers textes écrits de l’humanité, fixant les lois morales contre la décadence antédiluvienne.',
          ar: 'أول تدوين كتابي شرعي لتوحيد الله ونهي ولد آدم عن الفواحش التي أحدثها نسل قابيل.',
        },
        extantManuscripts: {
          en: 'Recorded across Hadith and historical works (Ibn Hibban, Al-Tabari, Ibn al-Athir).',
          fr: 'Rapporté dans les traités de Hadith.',
          ar: 'مدون في كتب السنن والآثار وتاريخ الرسل والملوك للطبري وابن الأثير.',
        },
        variantCountOrStatus: {
          en: 'Authentic prophetic attestation of its existence.',
          fr: 'Attestation prophétique authentique.',
          ar: 'ثابت بالرواية النبوية الصحيحة المستفيضة.',
        },
        theologicalPerspective: {
          en: 'Affirms that literacy and writing are divinely revealed blessings bestowed upon humanity.',
          fr: 'Souligne que l’écriture est un don divin accordé à l’homme pour préserver la vérité.',
          ar: 'تأكيد على أن الكتابة ونقل العلم فضل رباني بدأه إدريس لتثبيت الحجة على بني الإنسان.',
        },
      },
      {
        id: 'ethiopic_1_enoch',
        name: {
          en: 'Ethiopic Book of Enoch (1 Enoch)',
          fr: 'Livre d’Hénoch Éthiopien (1 Hénoch)',
          ar: 'سفر أخنوخ الحبشي الأول (١ أخنوخ)',
        },
        language: {
          en: 'Ge’ez (Ethiopic) translated from Aramaic and Greek',
          fr: 'Guèze (éthiopien ancien)',
          ar: 'الجعزية (الحبشية القديمة) عن الآرامية واليونانية',
        },
        period: {
          en: '3rd century BCE – 1st century CE; Dead Sea Scrolls fragments found in Qumran Cave 4',
          fr: 'IIIe s. av. J.-C. – Ier s. ap. J.-C. (fragments à Qumrân)',
          ar: 'القرن الثالث قبل الميلاد وعثر على أصوله الآرامية في مغارات قمران',
        },
        significance: {
          en: 'Canonical scripture in the Ethiopian and Eritrean Orthodox Tewahedo Church; details Enoch’s ascension and celestial journeys.',
          fr: 'Canonique dans l’Église orthodoxe d’Éthiopie ; décrit l’ascension d’Hénoch et les secrets des corps célestes.',
          ar: 'سفر قانوني معتمد في الكنيسة الإثيوبية الأرثوذكسية، يصف معراج إدريس إلى السموات السبع وأسرار الفلك.',
        },
        description: {
          en: 'Divided into 5 sections: Book of the Watchers, Book of Parables, Astronomical Book, Book of Dream Visions, and Epistle of Enoch.',
          fr: 'Comprend le Livre des Veilleurs, le Livre astronomique et les Paraboles.',
          ar: 'يشتمل على خمسة أقسام كبرى منها كتاب الفلك وكتاب الرؤى وكتاب العقاب ومصير الجبابرة.',
        },
        extantManuscripts: {
          en: 'Aramaic fragments from Qumran Caves (4Q201–212), complete Ge’ez manuscripts in British Library and Bodleian Library.',
          fr: 'Fragments araméens de Qumrân, manuscrits guèzes complets à Oxford et Londres.',
          ar: 'لفائف قمران الآرامية (4Q201)، ومخطوطات مكتبة بودلي بأكسفورد والمتحف البريطاني.',
        },
        variantCountOrStatus: {
          en: 'Preserves ancient traditions overlapping with Islamic accounts of Idris’ astronomical and celestial rank.',
          fr: 'Partage de nombreuses correspondances avec la tradition islamique d’Idris.',
          ar: 'يتطابق في مواضع كثيرة مع المأثور الإسلامي عن مكانة إدريس وعلمه بحركات النجوم.',
        },
        theologicalPerspective: {
          en: 'Echoes the ancient pre-Islamic reverence for Idris as a recipient of celestial wisdom.',
          fr: 'Témoigne de la vénération antique portée au patriarche Hénoch.',
          ar: 'شاهد على المكانة الرفيعة التي حظي بها إدريس في تراث شعوب الشرق القديم.',
        },
      },
      {
        id: 'slavonic_2_enoch',
        name: {
          en: 'Slavonic Book of the Secrets of Enoch (2 Enoch)',
          fr: 'Livre des Secrets d’Hénoch (2 Hénoch)',
          ar: 'سفر أسرار أخنوخ السلافي الثاني (٢ أخنوخ)',
        },
        language: {
          en: 'Old Church Slavonic',
          fr: 'Vieux slave',
          ar: 'السلافية الكنسية القديمة',
        },
        period: {
          en: 'Late 1st century CE',
          fr: 'Fin du Ier siècle ap. J.-C.',
          ar: 'أواخر القرن الأول الميلادي',
        },
        significance: {
          en: 'Details the elevation of Enoch through the celestial spheres, where he is commanded to record 360 books of divine secrets.',
          fr: 'Détaille l’élévation d’Hénoch à travers les sphères célestes.',
          ar: 'يصف بالتفصيل ارتقاء إدريس في السموات العلى حتى أمره الله بتدوين كتب الأسرار والحكمة.',
        },
        description: {
          en: 'Emphasizes kindness, avoidance of bloodguilt, and charity, paralleling the Quranic description of Idris as "a man of truth and a prophet".',
          fr: 'Met l’accent sur la miséricorde, la prière et la droiture morale.',
          ar: 'يركز على الصدق والعدل والإحسان، مؤكداً وصف القرآن لإدريس بأنه ﴿كَانَ صِدِّيقًا نَّبِيًّا﴾.',
        },
        extantManuscripts: {
          en: 'Belgrade National Library MS (destroyed in WWII), South Slavic and Russian codices.',
          fr: 'Codex slaves conservés en Russie et en Serbie.',
          ar: 'مخطوطات كنسية جنوب سلافية وروسية قديمة.',
        },
        variantCountOrStatus: {
          en: 'Preserved in longer and shorter recensions in Slavic literature.',
          fr: 'Deux recensions slaves connues.',
          ar: 'محفوظ في نسختين مطولة وموجزة في الأدب السلافي.',
        },
        theologicalPerspective: {
          en: 'Corroborates the exalted station (Makan ‘Aliyya) granted by Allah to Prophet Idris.',
          fr: 'Fait écho au verset coranique : « Et Nous l’élevâmes à un haut rang ».',
          ar: 'مصداق لقول الله تعالى في سورة مريم: ﴿وَرَفَعْنَاهُ مَكَانًا عَلِيًّا﴾.',
        },
      },
    ],
  },
  {
    id: 'suhuf_shith',
    prophetId: 'shith',
    prophetName: {
      en: 'Shith (Seth) عليه السلام',
      fr: 'Seth (Chith) عليه السلام',
      ar: 'شِيثُ هِبَةُ اللَّهِ عليه السلام',
    },
    title: {
      en: 'The 50 Scrolls of Seth (Suhuf Shith)',
      fr: 'Les 50 Feuillets de Seth (Suhuf Chith)',
      ar: 'صُحُفُ شِيثَ عليه السلام (٥٠ صحيفة)',
    },
    transliteration: 'Ṣuḥuf Shīth',
    originalLanguage: {
      en: 'Primordial Tongue of Adam',
      fr: 'Langue adamique primordiale',
      ar: 'لسان آدم عليه السلام الأول في الأرض',
    },
    revealedEra: {
      en: 'Primordial Post-Adamic Era (1st generation after Adam)',
      fr: 'Ère primordiale post-adamique',
      ar: 'الجيل الأول المباشر بعد هبوط آدم عليه السلام إلى الأرض',
    },
    revealedLocation: {
      en: 'Makkah / Mount Abu Qubays & the Sacred Valley',
      fr: 'La Mecque (Mont Abou Qoubeys) et les vallées sacrées',
      ar: 'مكة المكرمة وجبل أبي قبيس والهند',
    },
    quranReferences: [
      {
        surah: 4,
        ayah: '163',
        arabicText: '﴿إِنَّا أَوْحَيْنَا إِلَيْكَ كَمَا أَوْحَيْنَا إِلَىٰ نُوحٍ وَالنَّبِيِّينَ مِن بَعْدِهِ﴾',
        translationEn: 'Indeed, We have revealed to you, [O Muhammad], as We revealed to Noah and the prophets after him.',
        translationFr: 'Nous t’avons fait une révélation comme Nous fîmes à Noé et aux prophètes après lui.',
      },
    ],
    preservationStatus: 'lost_original',
    versionsCount: 2,
    versionsSummary: {
      en: '2 Historical Records: The 50 Divine Scrolls attested in Sahih Hadith (Sahih Ibn Hibban #361) and ancient Near-Eastern Sethian traditions.',
      fr: '2 Témoins historiques : Les 50 feuillets attestés par le Hadith (Ibn Hibban) et les traditions séthiennes antiques.',
      ar: 'شاهدان تاريخيان: ٥٠ صحيفة سماوية نص عليها الحديث الصحيح في صحيح ابن حبان، وموروثات الكتب الشيثية القديمة.',
    },
    theologicalContext: {
      en: 'Prophet Shith (Seth, "Gift of Allah") was born to Adam and Hawwa after the murder of Habil (Abel). He succeeded his father as spiritual leader of humanity. According to Sahih Hadith, Allah revealed fifty scrolls unto him—the largest number of scrolls granted to any single prophet.',
      fr: 'Seth (« Don de Dieu ») succéda à Adam pour guider l’humanité. Allah lui révéla 50 feuillets selon le Hadith authentique.',
      ar: 'شيث هبة الله عليه السلام، رزقه الله لآدم وحواء بعد مقتل هابيل، وصار وصي أبيه وإمام أهل الإيمان. خصّه الله بإنزال خمسين صحيفة—وهو أكثر عدد صحف نزل على نبي واحد—ليؤسس بها أول مجتمع عابد موحد على ظهر البسيطة.',
    },
    versions: [
      {
        id: 'hadith_shith_50_scrolls',
        name: {
          en: 'The 50 Divine Scrolls (Sahih Ibn Hibban)',
          fr: 'Les 50 Feuillets Révélés (Sahih Ibn Hibban)',
          ar: 'الصحف الخمسون لشيث هبة الله (صحيح ابن حبان)',
        },
        language: {
          en: 'Classical Arabic (attesting the primordial revelation)',
          fr: 'Arabe classique',
          ar: 'العربية الفصحى المسندة',
        },
        period: {
          en: 'Prophetic narration in Sahih Ibn Hibban (#361)',
          fr: 'Rapporté dans Sahih Ibn Hibban',
          ar: 'عن رسول الله ﷺ في حديث أبي ذر الغفاري رضي الله عنه',
        },
        significance: {
          en: 'Explicit statement: "Allah revealed upon Shith fifty scrolls", constituting the foundational canon of post-Adamic humanity.',
          fr: 'Déclaration prophétique explicite confirmant la révélation de 50 feuillets sur Seth.',
          ar: 'قول النبي ﷺ الصريح: "وأنزل على شيث خمسين صحيفة"، وهي أكبر حصة من الصحف المنزلة.',
        },
        description: {
          en: 'Prescribed pure monotheism, marriage sanctity, prohibition of incest among parallel siblings, and separation from the decadent camp of Qabil.',
          fr: 'Réglementait le culte pur, le mariage et la séparation d’avec la lignée de Caïn.',
          ar: 'نظمت عبادة التوحيد، وأحكام الطهارة، وحرمت الاختلاط بقبائل قابيل الباغية في السهول.',
        },
        extantManuscripts: {
          en: 'Transmitted in Sahih Ibn Hibban, Al-Tabari, and Ibn Kathir.',
          fr: 'Consigné dans les recueils islamiques classiques.',
          ar: 'مدونة في كتب الصحاح والآثار والتاريخ الإسلامي المعتمد.',
        },
        variantCountOrStatus: {
          en: 'Authentically documented prophetic narrative.',
          fr: 'Documenté par la tradition prophétique.',
          ar: 'رواية نبوية صحيحة مسندة.',
        },
        theologicalPerspective: {
          en: 'Demonstrates that early human civilization was founded upon divine law and enlightenment, not lawless barbarism.',
          fr: 'Prouve que l’humanité première a été fondée sur la révélation et non la barbarie.',
          ar: 'رد قاطع على النظريات المادية، وإثبات أن البشرية بدأت بالتوحيد والمدنية النبوية.',
        },
      },
      {
        id: 'ancient_sethian_texts',
        name: {
          en: 'Ancient Sethian Traditions & Nag Hammadi Treatise',
          fr: 'Traditions Séthiennes Antiques et Traités de Nag Hammadi',
          ar: 'المأثورات الشيثية التاريخية وأسفار نجع حمادي',
        },
        language: {
          en: 'Coptic (translated from ancient Greek/Aramaic texts)',
          fr: 'Copte',
          ar: 'القبطية واليونانية القديمة',
        },
        period: {
          en: '2nd – 4th centuries CE (reflecting ancient Near-Eastern Sethian communities)',
          fr: 'IIe – IVe siècle ap. J.-C.',
          ar: 'القرن الثاني إلى الرابع الميلادي',
        },
        significance: {
          en: 'Ancient Near Eastern religious groups ("The Sons of Seth") who maintained that Seth was given celestial tablets preserving the true primordial wisdom.',
          fr: 'Groupes antiques vénérant Seth comme le dépositaire de la sagesse primordiale.',
          ar: 'طوائف مشرقية قديمة ("بنو شيث") اعتقدت أن شيث تلقى ألواح الحكمة الأولى التي لا تبلى.',
        },
        description: {
          en: 'Includes The Second Treatise of the Great Seth and The Three Steles of Seth, describing the righteous generation who preserved the truth.',
          fr: 'Textes décrivant la génération juste ayant préservé la lumière adamique.',
          ar: 'تصف الجيل الصالح الذي حفظ العهد ولم ينجرف وراء مفاسد الأرض.',
        },
        extantManuscripts: {
          en: 'Nag Hammadi Codex VII (Coptic Museum, Cairo).',
          fr: 'Codex VII de Nag Hammadi (Le Caire).',
          ar: 'مخطوطة نجع حمادي رقم ٧ بالمتحف القبطي بالقاهرة.',
        },
        variantCountOrStatus: {
          en: 'Apocryphal historical remnants confirming the ancient memory of Seth’s scriptures.',
          fr: 'Témoignages apocryphes confirmant la mémoire des Écritures de Seth.',
          ar: 'شواهد تاريخية أثرية تؤكد بقاء ذكر صحف شيث في ذاكرة الحضارات القديمة.',
        },
        theologicalPerspective: {
          en: 'Independent historical corroboration of the prophetic role of Seth in early human antiquity.',
          fr: 'Corroboration historique indépendante du rôle prophétique de Seth.',
          ar: 'شاهد أثري مستقل على أصالة النبوة لشيث عليه السلام.',
        },
      },
    ],
  },
]

export const SCRIPTURES_BY_PROPHET = new Map<string, ProphetBook>(
  SCRIPTURES.map((b) => [b.prophetId, b])
)

export const SCRIPTURES_BY_ID = new Map<string, ProphetBook>(
  SCRIPTURES.map((b) => [b.id, b])
)
