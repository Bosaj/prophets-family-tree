import type { Fact, PersonSummary } from './types.ts'
import { f, t } from './people/helpers.ts'

/** Lightweight summary dataset for Home, Tree, Search, and initial route paints (~75% smaller than full narrative people). */
export const peopleCore: PersonSummary[] = [
  {
    "id": "adam",
    "kind": "prophet",
    "name": {
      "en": "Adam",
      "fr": "Adam",
      "ar": "آدم"
    },
    "order": 1,
    "title": {
      "l": "tradition",
      "t": {
        "en": "Father of humankind",
        "fr": "Père de l’humanité",
        "ar": "أبو البشر"
      }
    },
    "era": {
      "l": "quran",
      "t": {
        "en": "The beginning of humankind.",
        "fr": "Le commencement de l’humanité.",
        "ar": "بداية البشرية."
      },
      "r": [
        "2:30"
      ]
    },
    "mentions": 25,
    "sentTo": {
      "l": "tradition",
      "t": {
        "en": "His own children and descendants.",
        "fr": "Ses propres enfants et descendants.",
        "ar": "أبناؤه وذريته."
      }
    },
    "image": "adam",
    "heaven": 1,
    "topography": {
      "region": {
        "en": "Al-Hind (Sarandib) & Al-Hijaz (Makkah Al-Mukarramah)",
        "fr": "Al-Hind (Sarandib) et Al-Hijaz (La Mecque)",
        "ar": "أرض الهند (سرنديب) والحجاز (مكة المكرمة)"
      },
      "modernCountries": {
        "en": "Saudi Arabia, Sri Lanka",
        "fr": "Arabie Saoudite, Sri Lanka",
        "ar": "المملكة العربية السعودية، سريلانكا"
      },
      "mapCoordinates": {
        "lat": 21.3549,
        "lng": 39.9841
      }
    }
  },
  {
    "id": "shith",
    "kind": "family",
    "name": {
      "en": "Shith",
      "fr": "Shith",
      "ar": "شيث"
    },
    "order": 1,
    "alt": {
      "en": "Seth",
      "fr": "Seth",
      "ar": "Seth"
    },
    "title": {
      "l": "tradition",
      "t": {
        "en": "Righteous son of Adam gifted after Habil; forebear of Idris and Nuh",
        "fr": "Fils vertueux d’Adam accordé après Habil ; ancêtre d’Idris et Nuh",
        "ar": "هبة الله الصالح المعطى لآدم بعد هابيل وجد إدريس ونوح"
      },
      "r": [
        "book:qisas"
      ]
    }
  },
  {
    "id": "idris",
    "kind": "prophet",
    "name": {
      "en": "Idris",
      "fr": "Idris",
      "ar": "إدريس"
    },
    "order": 2,
    "alt": {
      "en": "Often identified with Enoch",
      "fr": "Souvent identifié à Hénoch",
      "ar": "يُقال إنه أخنوخ"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "A man of truth, a prophet",
        "fr": "Un homme de vérité, un prophète",
        "ar": "صدّيقًا نبيًّا"
      },
      "r": [
        "19:56"
      ]
    },
    "era": {
      "l": "tradition",
      "t": {
        "en": "Before Nuh, according to most historians; some place him later.",
        "fr": "Avant Nuh selon la plupart des historiens ; certains le placent plus tard.",
        "ar": "قبل نوح عند أكثر المؤرخين، وقيل بعده."
      },
      "r": [
        "book:qisas"
      ]
    },
    "mentions": 2,
    "sentTo": {
      "l": "tradition",
      "t": {
        "en": "The descendants of Adam of his time (place not certain).",
        "fr": "Les descendants d’Adam de son époque (lieu incertain).",
        "ar": "ذرية آدم في زمانه (والمكان غير مؤكد)."
      }
    },
    "image": "idris",
    "heaven": 4,
    "topography": {
      "region": {
        "en": "Southern Mesopotamia (Babylon) & Ancient Egypt (Memphis)",
        "fr": "Basse-Mésopotamie (Babylone) et Égypte Antique (Memphis)",
        "ar": "بلاد الرافدين (بابل) ومصر القديمة (منف)"
      },
      "modernCountries": {
        "en": "Iraq, Egypt",
        "fr": "Irak, Égypte",
        "ar": "العراق، مصر"
      },
      "mapCoordinates": {
        "lat": 32.5363,
        "lng": 44.4209
      }
    }
  },
  {
    "id": "nuh",
    "kind": "prophet",
    "name": {
      "en": "Nuh",
      "fr": "Nuh",
      "ar": "نوح"
    },
    "order": 3,
    "alt": {
      "en": "Noah",
      "fr": "Noé",
      "ar": "Noah"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "The first messenger sent to the people of the earth",
        "fr": "Le premier messager envoyé aux habitants de la terre",
        "ar": "أول الرسل إلى أهل الأرض"
      },
      "r": [
        "bukhari:4712"
      ]
    },
    "mentions": 43,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "His people, who worshipped idols named Wadd, Suwa‘, Yaghuth, Ya‘uq and Nasr.",
        "fr": "Son peuple, qui adorait les idoles Wadd, Suwa‘, Yaghuth, Ya‘uq et Nasr.",
        "ar": "قومه الذين عبدوا ودًّا وسواعًا ويغوث ويعوق ونسرًا."
      },
      "r": [
        "71:1",
        "71:23"
      ]
    },
    "image": "nuh",
    "ululAzm": true,
    "topography": {
      "region": {
        "en": "Southern Mesopotamia (Sumer / Kufa) to Mount Judi",
        "fr": "Basse-Mésopotamie (Sumer / Koufa) au Mont Djoudi",
        "ar": "بلاد الرافدين السفلى (سومر / الكوفة) إلى جبل الجودي"
      },
      "modernCountries": {
        "en": "Iraq, Turkey",
        "fr": "Irak, Turquie",
        "ar": "العراق، تركيا"
      },
      "mapCoordinates": {
        "lat": 37.3775,
        "lng": 42.4939
      }
    }
  },
  {
    "id": "hud",
    "kind": "prophet",
    "name": {
      "en": "Hud",
      "fr": "Hud",
      "ar": "هود"
    },
    "order": 4,
    "era": {
      "l": "quran",
      "t": {
        "en": "After the people of Nuh.",
        "fr": "Après le peuple de Nuh.",
        "ar": "بعد قوم نوح."
      },
      "r": [
        "7:69"
      ]
    },
    "mentions": 7,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "The people of ‘Ad, who lived among the sand dunes (al-Ahqaf).",
        "fr": "Le peuple de ‘Ad, qui vivait parmi les dunes (al-Ahqaf).",
        "ar": "قوم عاد، وكانوا بالأحقاف."
      },
      "r": [
        "7:65",
        "46:21"
      ]
    },
    "image": "hud",
    "topography": {
      "region": {
        "en": "Al-Ahqaf (The Great Winding Sand Dunes) in Hadramawt",
        "fr": "Al-Ahqaf (Les Dunes de Sable) dans le Hadramaout",
        "ar": "الأحقاف (كثبان الرمال الممتدة) في حضرموت"
      },
      "modernCountries": {
        "en": "Yemen, Oman",
        "fr": "Yémen, Oman",
        "ar": "اليمن، عُمان"
      },
      "mapCoordinates": {
        "lat": 16.0333,
        "lng": 49.5333
      }
    }
  },
  {
    "id": "salih",
    "kind": "prophet",
    "name": {
      "en": "Salih",
      "fr": "Salih",
      "ar": "صالح"
    },
    "order": 5,
    "era": {
      "l": "quran",
      "t": {
        "en": "After the people of ‘Ad.",
        "fr": "Après le peuple de ‘Ad.",
        "ar": "بعد عاد."
      },
      "r": [
        "7:74"
      ]
    },
    "mentions": 9,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "The people of Thamud, who carved homes into the mountains.",
        "fr": "Le peuple de Thamud, qui taillait ses demeures dans les montagnes.",
        "ar": "قوم ثمود الذين نحتوا من الجبال بيوتًا."
      },
      "r": [
        "7:73-74",
        "15:80-82"
      ]
    },
    "image": "salih",
    "topography": {
      "region": {
        "en": "Al-Hijr (Mada’in Salih / Hegra) in Northwestern Arabia",
        "fr": "Al-Hijr (Mada’in Salih / Hégra) au nord-ouest de l’Arabie",
        "ar": "الحجر (مدائن صالح / الحِجر) في شمال غرب الجزيرة العربية"
      },
      "modernCountries": {
        "en": "Saudi Arabia",
        "fr": "Arabie Saoudite",
        "ar": "المملكة العربية السعودية"
      },
      "mapCoordinates": {
        "lat": 26.8044,
        "lng": 37.9547
      }
    }
  },
  {
    "id": "azar",
    "kind": "family",
    "name": {
      "en": "Azar",
      "fr": "Azar",
      "ar": "آزر"
    },
    "order": 6
  },
  {
    "id": "ibrahim",
    "kind": "prophet",
    "name": {
      "en": "Ibrahim",
      "fr": "Ibrahim",
      "ar": "إبراهيم"
    },
    "order": 6,
    "alt": {
      "en": "Abraham",
      "fr": "Abraham",
      "ar": "Abraham"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "Khalil Allah — the intimate friend of Allah",
        "fr": "Khalil Allah — l’ami intime d’Allah",
        "ar": "خليل الله"
      },
      "r": [
        "4:125"
      ]
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "About the 2nd millennium BCE (historians’ estimate, not from Islamic sources).",
        "fr": "Vers le IIe millénaire av. J.-C. (estimation des historiens, pas des sources islamiques).",
        "ar": "نحو الألفية الثانية قبل الميلاد (تقدير المؤرخين، لا من المصادر الإسلامية)."
      },
      "r": [
        "book:historians"
      ]
    },
    "mentions": 69,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "His father and his people, who worshipped idols, and a king who argued with him.",
        "fr": "Son père et son peuple, qui adoraient des idoles, et un roi qui argumenta avec lui.",
        "ar": "أبوه وقومه عبّاد الأصنام، والملك الذي حاجّه في ربه."
      },
      "r": [
        "6:74",
        "21:51-57",
        "2:258"
      ]
    },
    "image": "ibrahim",
    "heaven": 7,
    "ululAzm": true,
    "topography": {
      "region": {
        "en": "Mesopotamia (Ur) to Harran, Canaan (Hebron), Egypt, and Al-Hijaz (Makkah)",
        "fr": "Mésopotamie (Ur), Harran, Canaan (Hébron), Égypte et Hedjaz (La Mecque)",
        "ar": "بلاد الرافدين (أور)، حران، كنعان (الخليل)، مصر، والحجاز (مكة المكرمة)"
      },
      "modernCountries": {
        "en": "Iraq, Turkey, Syria, Palestine, Egypt, Saudi Arabia",
        "fr": "Irak, Turquie, Syrie, Palestine, Égypte, Arabie Saoudite",
        "ar": "العراق، تركيا، سوريا، فلسطين، مصر، المملكة العربية السعودية"
      },
      "mapCoordinates": {
        "lat": 31.5247,
        "lng": 35.1107
      }
    }
  },
  {
    "id": "lut",
    "kind": "prophet",
    "name": {
      "en": "Lut",
      "fr": "Lut",
      "ar": "لوط"
    },
    "order": 6,
    "alt": {
      "en": "Lot",
      "fr": "Loth",
      "ar": "Lot"
    },
    "era": {
      "l": "quran",
      "t": {
        "en": "A contemporary of Ibrahim, who believed in him.",
        "fr": "Contemporain d’Ibrahim, en qui il crut.",
        "ar": "معاصر لإبراهيم وقد آمن به."
      },
      "r": [
        "29:26"
      ]
    },
    "mentions": 27,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "His people, who committed an indecency no people before them had committed.",
        "fr": "Son peuple, qui commettait une turpitude que nul peuple n’avait commise avant lui.",
        "ar": "قومه الذين أتوا الفاحشة ما سبقهم بها أحد من العالمين."
      },
      "r": [
        "7:80-81"
      ]
    },
    "image": "lut",
    "topography": {
      "region": {
        "en": "The Jordan Rift Valley & The Dead Sea Basin (Sodom & Gomorrah)",
        "fr": "La vallée du rift jordanien et le bassin de la mer Morte (Sodome et Gomorrhe)",
        "ar": "غور الأردن وحوض البحر الميت (سدوم وعمورة / المؤتفكة)"
      },
      "modernCountries": {
        "en": "Jordan, Palestine",
        "fr": "Jordanie, Palestine",
        "ar": "الأردن، فلسطين"
      },
      "mapCoordinates": {
        "lat": 31.3322,
        "lng": 35.5019
      }
    }
  },
  {
    "id": "ismail",
    "kind": "prophet",
    "name": {
      "en": "Ismail",
      "fr": "Ismaïl",
      "ar": "إسماعيل"
    },
    "order": 7,
    "alt": {
      "en": "Ishmael",
      "fr": "Ismaël",
      "ar": "Ishmael"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "True to his promise",
        "fr": "Fidèle à sa promesse",
        "ar": "صادق الوعد"
      },
      "r": [
        "19:54"
      ]
    },
    "mentions": 12,
    "sentTo": {
      "l": "tradition",
      "t": {
        "en": "The Arab tribe of Jurhum, who settled in Mecca with his mother, and their descendants.",
        "fr": "La tribu arabe de Jurhum, installée à La Mecque auprès de sa mère, et leurs descendants.",
        "ar": "قبيلة جرهم التي نزلت مكة عند أمه، وذريتهم."
      },
      "r": [
        "bukhari:3364"
      ]
    },
    "image": "ismail",
    "topography": {
      "region": {
        "en": "Al-Hijaz (Makkah Al-Mukarramah / The Valley of Paran)",
        "fr": "Le Hedjaz (La Mecque / La Vallée de Paran)",
        "ar": "الحجاز (مكة المكرمة / وادي بكة)"
      },
      "modernCountries": {
        "en": "Saudi Arabia",
        "fr": "Arabie Saoudite",
        "ar": "المملكة العربية السعودية"
      },
      "mapCoordinates": {
        "lat": 21.4225,
        "lng": 39.8262
      }
    }
  },
  {
    "id": "ishaq",
    "kind": "prophet",
    "name": {
      "en": "Ishaq",
      "fr": "Ishaq",
      "ar": "إسحاق"
    },
    "order": 7,
    "alt": {
      "en": "Isaac",
      "fr": "Isaac",
      "ar": "Isaac"
    },
    "mentions": 17,
    "sentTo": {
      "l": "tradition",
      "t": {
        "en": "The people of Canaan (Sham).",
        "fr": "Le peuple de Canaan (Sham).",
        "ar": "أهل كنعان بالشام."
      },
      "r": [
        "book:qisas"
      ]
    },
    "image": "ishaq",
    "topography": {
      "region": {
        "en": "The Highlands of Canaan (Hebron / Beersheba / Southern Levant)",
        "fr": "Les hauteurs de Canaan (Hébron / Beer-Sheva / Levant méridional)",
        "ar": "مرتفعات كنعان (الخليل / بئر السبع / جنوب بلاد الشام)"
      },
      "modernCountries": {
        "en": "Palestine, Jordan",
        "fr": "Palestine, Jordanie",
        "ar": "فلسطين، الأردن"
      },
      "mapCoordinates": {
        "lat": 31.525,
        "lng": 35.111
      }
    }
  },
  {
    "id": "yaqub",
    "kind": "prophet",
    "name": {
      "en": "Ya‘qub",
      "fr": "Ya‘qub",
      "ar": "يعقوب"
    },
    "order": 8,
    "alt": {
      "en": "Jacob",
      "fr": "Jacob",
      "ar": "Jacob"
    },
    "title": {
      "l": "tradition",
      "t": {
        "en": "Isra’il — the commentators explain that Isra’il is Ya‘qub",
        "fr": "Isra’il — les commentateurs expliquent qu’Isra’il est Ya‘qub",
        "ar": "إسرائيل، كما فسّره المفسرون"
      },
      "r": [
        "3:93",
        "19:58"
      ]
    },
    "mentions": 16,
    "sentTo": {
      "l": "tradition",
      "t": {
        "en": "His family and the people of Canaan.",
        "fr": "Sa famille et le peuple de Canaan.",
        "ar": "أهله وأهل كنعان."
      },
      "r": [
        "book:qisas"
      ]
    },
    "image": "yaqub",
    "topography": {
      "region": {
        "en": "Canaan (Hebron, Bethel, Shechem) to Ancient Egypt (The Land of Goshen)",
        "fr": "Canaan (Hébron, Béthel, Sichem) vers l’Égypte Antique (Pays de Gosen)",
        "ar": "أرض كنعان (الخليل، بيت إيل، نابلس) إلى مصر (أرض جاسان)"
      },
      "modernCountries": {
        "en": "Palestine, Egypt",
        "fr": "Palestine, Égypte",
        "ar": "فلسطين، مصر"
      },
      "mapCoordinates": {
        "lat": 31.5255,
        "lng": 35.1115
      }
    }
  },
  {
    "id": "yusuf",
    "kind": "prophet",
    "name": {
      "en": "Yusuf",
      "fr": "Yusuf",
      "ar": "يوسف"
    },
    "order": 9,
    "alt": {
      "en": "Joseph",
      "fr": "Joseph",
      "ar": "Joseph"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "Al-Siddiq — the truthful one",
        "fr": "Al-Siddiq — le véridique",
        "ar": "الصدّيق"
      },
      "r": [
        "12:46"
      ]
    },
    "mentions": 27,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "The people of Egypt, starting with his fellow prisoners.",
        "fr": "Le peuple d’Égypte, à commencer par ses compagnons de prison.",
        "ar": "أهل مصر، وبدأ بصاحبيه في السجن."
      },
      "r": [
        "12:39-40",
        "40:34"
      ]
    },
    "image": "yusuf",
    "heaven": 3,
    "topography": {
      "region": {
        "en": "Canaan (Jubb Yusuf / Dothan) to Ancient Egypt (Memphis / Nile Valley)",
        "fr": "Canaan (Jubb Youssef / Dothan) vers l’Égypte Antique (Memphis / Vallée du Nil)",
        "ar": "أرض كنعان (جب يوسف / دوثان) إلى مصر القديمة (منف / وادي النيل)"
      },
      "modernCountries": {
        "en": "Palestine, Egypt",
        "fr": "Palestine, Égypte",
        "ar": "فلسطين، مصر"
      },
      "mapCoordinates": {
        "lat": 29.8499,
        "lng": 31.2544
      }
    }
  },
  {
    "id": "ayyub",
    "kind": "prophet",
    "name": {
      "en": "Ayyub",
      "fr": "Ayyub",
      "ar": "أيوب"
    },
    "order": 9,
    "alt": {
      "en": "Job",
      "fr": "Job",
      "ar": "Job"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "Patient — an excellent servant",
        "fr": "Endurant — un excellent serviteur",
        "ar": "صابر، نِعم العبد"
      },
      "r": [
        "38:44"
      ]
    },
    "era": {
      "l": "tradition",
      "t": {
        "en": "Between Yusuf and Musa, according to the historians.",
        "fr": "Entre Yusuf et Musa, selon les historiens.",
        "ar": "بين يوسف وموسى عند المؤرخين."
      },
      "r": [
        "book:qisas"
      ]
    },
    "mentions": 4,
    "sentTo": {
      "l": "tradition",
      "t": {
        "en": "His people in Sham (Hawran), according to tradition.",
        "fr": "Son peuple au Sham (Hawran), selon la tradition.",
        "ar": "قومه بالشام (حوران) في الرواية."
      },
      "r": [
        "book:qisas"
      ]
    },
    "image": "ayyub",
    "topography": {
      "region": {
        "en": "The Plain of Bathaniyya / Hauran (Southern Syria) & Edom",
        "fr": "La plaine de Bathaniyya / Hauran (Sud de la Syrie) et Édom",
        "ar": "سهل البثنية / حوران (جنوب الشام) وأرض إدوم"
      },
      "modernCountries": {
        "en": "Syria, Jordan, Oman",
        "fr": "Syrie, Jordanie, Oman",
        "ar": "سوريا، الأردن، عُمان"
      },
      "mapCoordinates": {
        "lat": 32.8333,
        "lng": 36.0333
      }
    }
  },
  {
    "id": "shuayb",
    "kind": "prophet",
    "name": {
      "en": "Shu‘ayb",
      "fr": "Chu‘ayb",
      "ar": "شعيب"
    },
    "order": 9,
    "era": {
      "l": "quran",
      "t": {
        "en": "After Lut: “the people of Lut are not far from you”.",
        "fr": "Après Lut : « le peuple de Lut n’est pas loin de vous ».",
        "ar": "بعد لوط: «وما قوم لوط منكم ببعيد»."
      },
      "r": [
        "11:89"
      ]
    },
    "mentions": 11,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "Madyan, and the Companions of the Thicket (al-Aykah). Scholars differ on whether these were one people.",
        "fr": "Madyan, et les Gens d’al-Aykah. Les savants divergent : un seul peuple ou deux.",
        "ar": "مدين، وأصحاب الأيكة، واختلف العلماء أهم قوم واحد أم اثنان."
      },
      "r": [
        "7:85",
        "26:176-177"
      ]
    },
    "image": "shuayb",
    "topography": {
      "region": {
        "en": "Madyan (Midian / Northwestern Hijaz) & Ashab al-Aykah (Dwellers of the Wood)",
        "fr": "Madyan (Madian / Nord-ouest du Hedjaz) et Ashab al-Aykah",
        "ar": "مدين (شمال غرب الحجاز) وأصحاب الأيكة"
      },
      "modernCountries": {
        "en": "Saudi Arabia, Jordan",
        "fr": "Arabie Saoudite, Jordanie",
        "ar": "المملكة العربية السعودية، الأردن"
      },
      "mapCoordinates": {
        "lat": 28.4897,
        "lng": 35.0118
      }
    }
  },
  {
    "id": "musa",
    "kind": "prophet",
    "name": {
      "en": "Musa",
      "fr": "Moussa",
      "ar": "موسى"
    },
    "order": 10,
    "alt": {
      "en": "Moses",
      "fr": "Moïse",
      "ar": "Moses"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "Kalim Allah — Allah spoke to him directly",
        "fr": "Kalim Allah — Allah lui parla directement",
        "ar": "كليم الله"
      },
      "r": [
        "4:164"
      ]
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "About the 13th century BCE (historians’ estimate). The Qur’an places him after Yusuf.",
        "fr": "Vers le XIIIe siècle av. J.-C. (estimation des historiens). Le Coran le place après Yusuf.",
        "ar": "نحو القرن الثالث عشر قبل الميلاد (تقدير المؤرخين)، والقرآن يجعله بعد يوسف."
      },
      "r": [
        "book:historians",
        "40:34"
      ]
    },
    "mentions": 136,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "Pharaoh and his chiefs, and the Children of Israel.",
        "fr": "Pharaon et ses notables, et les Enfants d’Israël.",
        "ar": "فرعون وملؤه، وبنو إسرائيل."
      },
      "r": [
        "7:103",
        "14:5"
      ]
    },
    "image": "musa",
    "heaven": 6,
    "ululAzm": true,
    "topography": {
      "region": {
        "en": "Ancient Egypt (Nile Delta) to Mount Sinai (Tur Sina), Midian, and The Wilderness (At-Teeh)",
        "fr": "Égypte Antique (Delta du Nil), Mont Sinaï (Tur Sina), Madian et le Désert d’At-Teeh",
        "ar": "مصر القديمة (دلتا النيل)، طور سيناء، مدين، وصحراء التيه"
      },
      "modernCountries": {
        "en": "Egypt, Saudi Arabia, Jordan, Palestine",
        "fr": "Égypte, Arabie Saoudite, Jordanie, Palestine",
        "ar": "مصر، المملكة العربية السعودية، الأردن، فلسطين"
      },
      "mapCoordinates": {
        "lat": 28.5392,
        "lng": 33.975
      }
    }
  },
  {
    "id": "harun",
    "kind": "prophet",
    "name": {
      "en": "Harun",
      "fr": "Haroun",
      "ar": "هارون"
    },
    "order": 10,
    "alt": {
      "en": "Aaron",
      "fr": "Aaron",
      "ar": "Aaron"
    },
    "mentions": 20,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "Pharaoh, with Musa; he led the Children of Israel while Musa was at the mountain.",
        "fr": "Pharaon, avec Musa ; il guida les Enfants d’Israël pendant que Musa était à la montagne.",
        "ar": "فرعون مع موسى، وخلفه في قومه حين ذهب إلى الميقات."
      },
      "r": [
        "20:42-48",
        "7:142"
      ]
    },
    "image": "harun",
    "heaven": 5,
    "topography": {
      "region": {
        "en": "Ancient Egypt (Nile Valley) & The Sinai Wilderness to Mount Hor (Jabal Harun)",
        "fr": "Égypte Antique (Vallée du Nil), Désert du Sinaï et Mont Hor (Jabal Haroun)",
        "ar": "مصر القديمة (وادي النيل)، صحراء سيناء، وجبل هور (جبل هارون)"
      },
      "modernCountries": {
        "en": "Egypt, Jordan",
        "fr": "Égypte, Jordanie",
        "ar": "مصر، الأردن"
      },
      "mapCoordinates": {
        "lat": 30.3167,
        "lng": 35.4056
      }
    }
  },
  {
    "id": "dhulkifl",
    "kind": "prophet",
    "name": {
      "en": "Dhul-Kifl",
      "fr": "Dhul-Kifl",
      "ar": "ذو الكفل"
    },
    "order": 11,
    "era": {
      "l": "disputed",
      "t": {
        "en": "Not stated in the sources.",
        "fr": "Non précisé dans les sources.",
        "ar": "لم تذكره المصادر."
      }
    },
    "mentions": 2,
    "sentTo": {
      "l": "disputed",
      "t": {
        "en": "Unknown. Some identify him with Hizqil (Ezekiel), others with a son of Ayyub.",
        "fr": "Inconnu. Certains l’identifient à Hizqil (Ézéchiel), d’autres à un fils d’Ayyub.",
        "ar": "غير معروف، وقيل هو حزقيل، وقيل ابن لأيوب."
      },
      "r": [
        "book:qisas"
      ]
    },
    "image": "dhulkifl",
    "topography": {
      "region": {
        "en": "Mesopotamia (Al-Kifl / Euphrates River Valley) & The Southern Levant",
        "fr": "Mésopotamie (Al-Kifl / Vallée de l’Euphrate) et le Levant méridional",
        "ar": "بلاد الرافدين (الكفل / وادي الفرات) وجنوب الشام"
      },
      "modernCountries": {
        "en": "Iraq, Syria, Palestine",
        "fr": "Irak, Syrie, Palestine",
        "ar": "العراق، سوريا، فلسطين"
      },
      "mapCoordinates": {
        "lat": 32.2244,
        "lng": 44.3775
      }
    }
  },
  {
    "id": "dawud",
    "kind": "prophet",
    "name": {
      "en": "Dawud",
      "fr": "Dawud",
      "ar": "داود"
    },
    "order": 12,
    "alt": {
      "en": "David",
      "fr": "David",
      "ar": "David"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "A successor (khalifah) upon the earth",
        "fr": "Un successeur (khalifa) sur la terre",
        "ar": "خليفة في الأرض"
      },
      "r": [
        "38:26"
      ]
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "About 1000 BCE (historians’ estimate). The Qur’an places his kingship after Musa.",
        "fr": "Vers l’an 1000 av. J.-C. (estimation des historiens). Le Coran place sa royauté après Musa.",
        "ar": "نحو سنة 1000 قبل الميلاد (تقدير المؤرخين)، والقرآن يجعل ملكه بعد موسى."
      },
      "r": [
        "book:historians",
        "2:246"
      ]
    },
    "mentions": 16,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "The Children of Israel. He killed Jalut (Goliath) and was given kingship and wisdom.",
        "fr": "Les Enfants d’Israël. Il tua Jalut (Goliath) et reçut la royauté et la sagesse.",
        "ar": "بنو إسرائيل، قتل جالوت وآتاه الله الملك والحكمة."
      },
      "r": [
        "2:251"
      ]
    },
    "image": "dawud",
    "topography": {
      "region": {
        "en": "The Holy Land (Al-Quds / Jerusalem, Bethlehem, Valley of Elah)",
        "fr": "La Terre Sainte (Al-Quds / Jérusalem, Bethléem, Vallée d’Elah)",
        "ar": "الأرض المقدسة (بيت المقدس / القدس، بيت لحم، وادي السنط)"
      },
      "modernCountries": {
        "en": "Palestine",
        "fr": "Palestine",
        "ar": "فلسطين"
      },
      "mapCoordinates": {
        "lat": 31.7719,
        "lng": 35.2285
      }
    }
  },
  {
    "id": "sulayman",
    "kind": "prophet",
    "name": {
      "en": "Sulayman",
      "fr": "Soulayman",
      "ar": "سليمان"
    },
    "order": 13,
    "alt": {
      "en": "Solomon",
      "fr": "Salomon",
      "ar": "Solomon"
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "About the 10th century BCE (historians’ estimate).",
        "fr": "Vers le Xe siècle av. J.-C. (estimation des historiens).",
        "ar": "نحو القرن العاشر قبل الميلاد (تقدير المؤرخين)."
      },
      "r": [
        "book:historians"
      ]
    },
    "mentions": 17,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "The Children of Israel; he also called the Queen of Saba’ to Allah.",
        "fr": "Les Enfants d’Israël ; il appela aussi la reine de Saba’ à Allah.",
        "ar": "بنو إسرائيل، ودعا ملكة سبأ إلى الله."
      },
      "r": [
        "27:28-31"
      ]
    },
    "image": "sulayman",
    "topography": {
      "region": {
        "en": "The Kingdom of Israel & Judah (Al-Quds / Jerusalem) extending to Sheba (Yemen)",
        "fr": "Le Royaume d’Israël et Juda (Al-Quds / Jérusalem) s’étendant jusqu’à Saba (Yémen)",
        "ar": "مملكة بيت المقدس وبلاد الشام وامتدادها إلى سبأ (اليمن)"
      },
      "modernCountries": {
        "en": "Palestine, Jordan, Yemen",
        "fr": "Palestine, Jordanie, Yémen",
        "ar": "فلسطين، الأردن، اليمن"
      },
      "mapCoordinates": {
        "lat": 31.778,
        "lng": 35.2354
      }
    }
  },
  {
    "id": "ilyas",
    "kind": "prophet",
    "name": {
      "en": "Ilyas",
      "fr": "Ilyas",
      "ar": "إلياس"
    },
    "order": 14,
    "alt": {
      "en": "Elijah",
      "fr": "Élie",
      "ar": "Elijah"
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "About the 9th century BCE (historians’ estimate).",
        "fr": "Vers le IXe siècle av. J.-C. (estimation des historiens).",
        "ar": "نحو القرن التاسع قبل الميلاد (تقدير المؤرخين)."
      },
      "r": [
        "book:historians"
      ]
    },
    "mentions": 2,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "His people, who called upon Ba‘l. Tradition places them near Ba‘albak (Lebanon).",
        "fr": "Son peuple, qui invoquait Ba‘l. La tradition le situe près de Baalbek (Liban).",
        "ar": "قومه الذين دعوا بعلًا، وتجعلهم الرواية قرب بعلبك."
      },
      "r": [
        "37:123-126"
      ]
    },
    "image": "ilyas",
    "topography": {
      "region": {
        "en": "Baalbek (The Beqaa Valley, Lebanon) & Mount Carmel (Levant)",
        "fr": "Baalbek (Vallée de la Bekaa, Liban) et Mont Carmel (Levant)",
        "ar": "بعلبك (سهل البقاع، لبنان) وجبل الكرمل (بلاد الشام)"
      },
      "modernCountries": {
        "en": "Lebanon, Syria, Palestine",
        "fr": "Liban, Syrie, Palestine",
        "ar": "لبنان، سوريا، فلسطين"
      },
      "mapCoordinates": {
        "lat": 34.0058,
        "lng": 36.2081
      }
    }
  },
  {
    "id": "alyasa",
    "kind": "prophet",
    "name": {
      "en": "Al-Yasa‘",
      "fr": "Al-Yasa‘",
      "ar": "اليسع"
    },
    "order": 15,
    "alt": {
      "en": "Elisha",
      "fr": "Élisée",
      "ar": "Elisha"
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "About the 9th century BCE (historians’ estimate).",
        "fr": "Vers le IXe siècle av. J.-C. (estimation des historiens).",
        "ar": "نحو القرن التاسع قبل الميلاد (تقدير المؤرخين)."
      },
      "r": [
        "book:historians"
      ]
    },
    "mentions": 2,
    "sentTo": {
      "l": "tradition",
      "t": {
        "en": "The Children of Israel, as the successor of Ilyas.",
        "fr": "Les Enfants d’Israël, comme successeur d’Ilyas.",
        "ar": "بنو إسرائيل، خلفًا لإلياس."
      },
      "r": [
        "book:qisas"
      ]
    },
    "image": "alyasa",
    "topography": {
      "region": {
        "en": "The Jordan River Valley & Northern Levant (Pella / Damascus)",
        "fr": "La vallée du Jourdain et le Levant septentrional (Pella / Damas)",
        "ar": "غور نهر الأردن وشمال الشام (بيسان / دمشق)"
      },
      "modernCountries": {
        "en": "Jordan, Palestine, Syria",
        "fr": "Jordanie, Palestine, Syrie",
        "ar": "الأردن، فلسطين، سوريا"
      },
      "mapCoordinates": {
        "lat": 32.4489,
        "lng": 35.6144
      }
    }
  },
  {
    "id": "yunus",
    "kind": "prophet",
    "name": {
      "en": "Yunus",
      "fr": "Younous",
      "ar": "يونس"
    },
    "order": 16,
    "alt": {
      "en": "Jonah",
      "fr": "Jonas",
      "ar": "Jonah"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "Dhun-Nun — the man of the fish",
        "fr": "Dhun-Nun — l’homme du poisson",
        "ar": "ذو النون، صاحب الحوت"
      },
      "r": [
        "21:87",
        "68:48"
      ]
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "About the 8th century BCE (historians’ estimate).",
        "fr": "Vers le VIIIe siècle av. J.-C. (estimation des historiens).",
        "ar": "نحو القرن الثامن قبل الميلاد (تقدير المؤرخين)."
      },
      "r": [
        "book:historians"
      ]
    },
    "mentions": 4,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "A people of a hundred thousand or more, who believed. Tradition says Nineveh, in Iraq.",
        "fr": "Un peuple de cent mille ou plus, qui crut. La tradition dit Ninive, en Irak.",
        "ar": "مئة ألف أو يزيدون فآمنوا، وتذكر الرواية أنهم أهل نينوى بالعراق."
      },
      "r": [
        "37:147-148",
        "10:98"
      ]
    },
    "image": "yunus",
    "topography": {
      "region": {
        "en": "Nineveh (Mosul, Northern Mesopotamia) to the Mediterranean Sea and back",
        "fr": "Ninive (Mossoul, Haute-Mésopotamie) vers la Mer Méditerranée et retour",
        "ar": "نينوى (الموصل، شمال بلاد الرافدين) إلى البحر المتوسط والعودة"
      },
      "modernCountries": {
        "en": "Iraq",
        "fr": "Irak",
        "ar": "العراق"
      },
      "mapCoordinates": {
        "lat": 36.3587,
        "lng": 43.1528
      }
    }
  },
  {
    "id": "zakariya",
    "kind": "prophet",
    "name": {
      "en": "Zakariya",
      "fr": "Zakariya",
      "ar": "زكريا"
    },
    "order": 17,
    "alt": {
      "en": "Zechariah",
      "fr": "Zacharie",
      "ar": "Zechariah"
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "1st century BCE (historians’ estimate).",
        "fr": "Ier siècle av. J.-C. (estimation des historiens).",
        "ar": "القرن الأول قبل الميلاد (تقدير المؤرخين)."
      },
      "r": [
        "book:historians"
      ]
    },
    "mentions": 7,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "The Children of Israel. He was the guardian of Maryam.",
        "fr": "Les Enfants d’Israël. Il fut le tuteur de Maryam.",
        "ar": "بنو إسرائيل، وكفل مريم."
      },
      "r": [
        "3:37"
      ]
    },
    "image": "zakariya",
    "topography": {
      "region": {
        "en": "The Judean Hills & The Sanctuary of Jerusalem (Bayt al-Maqdis)",
        "fr": "Les collines de Judée et le Sanctuaire de Jérusalem (Bayt al-Maqdis)",
        "ar": "مرتفعات يهودا وحرم بيت المقدس (أرض فلسطين)"
      },
      "modernCountries": {
        "en": "Palestine",
        "fr": "Palestine",
        "ar": "فلسطين"
      },
      "mapCoordinates": {
        "lat": 31.7767,
        "lng": 35.2345
      }
    }
  },
  {
    "id": "yahya",
    "kind": "prophet",
    "name": {
      "en": "Yahya",
      "fr": "Yahya",
      "ar": "يحيى"
    },
    "order": 17,
    "alt": {
      "en": "John",
      "fr": "Jean",
      "ar": "John"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "A name given by Allah to no one before him",
        "fr": "Un nom donné par Allah à personne avant lui",
        "ar": "لم يجعل الله له من قبل سميًّا"
      },
      "r": [
        "19:7"
      ]
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "1st century BCE – 1st century CE (historians’ estimate).",
        "fr": "Ier siècle av. – Ier siècle apr. J.-C. (estimation des historiens).",
        "ar": "القرن الأول قبل الميلاد وبعده (تقدير المؤرخين)."
      },
      "r": [
        "book:historians"
      ]
    },
    "mentions": 5,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "The Children of Israel, confirming a word from Allah (‘Isa).",
        "fr": "Les Enfants d’Israël, confirmant une parole d’Allah (‘Isa).",
        "ar": "بنو إسرائيل، مصدّقًا بكلمة من الله (عيسى)."
      },
      "r": [
        "3:39"
      ]
    },
    "image": "yahya",
    "heaven": 2,
    "topography": {
      "region": {
        "en": "The Judean Wilderness, The Jordan River Springs, and Damascus",
        "fr": "Le désert de Judée, les sources du Jourdain et Damas",
        "ar": "برية يهودا، ينابيع نهر الأردن، ودمشق"
      },
      "modernCountries": {
        "en": "Palestine, Jordan, Syria",
        "fr": "Palestine, Jordanie, Syrie",
        "ar": "فلسطين، الأردن، سوريا"
      },
      "mapCoordinates": {
        "lat": 33.5119,
        "lng": 36.3067
      }
    }
  },
  {
    "id": "imran",
    "kind": "family",
    "name": {
      "en": "‘Imran",
      "fr": "‘Imran",
      "ar": "عمران"
    },
    "order": 17,
    "title": {
      "l": "quran",
      "t": {
        "en": "Righteous patriarch whose household Allah chose above the worlds",
        "fr": "Patriarche vertueux dont Allah a élu la famille au-dessus des mondes",
        "ar": "الصالح التقي الذي اصطفى الله آله على العالمين في القرآن الكريم"
      },
      "r": [
        "3:33"
      ]
    }
  },
  {
    "id": "maryam",
    "kind": "family",
    "name": {
      "en": "Maryam",
      "fr": "Maryam",
      "ar": "مريم"
    },
    "order": 17,
    "alt": {
      "en": "Mary",
      "fr": "Marie",
      "ar": "Mary"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "The Pure and Truthful, chosen and purified above the women of the worlds",
        "fr": "La pure et véridique, élue et purifiée au-dessus des femmes des mondes",
        "ar": "الصدّيقة الطاهرة سيدة نساء العالمين التي أحصنت فرجها فنفخ الله فيها من روحه"
      },
      "r": [
        "3:42",
        "66:12"
      ]
    },
    "image": "maryam"
  },
  {
    "id": "isa",
    "kind": "prophet",
    "name": {
      "en": "‘Isa",
      "fr": "‘Issa",
      "ar": "عيسى"
    },
    "order": 18,
    "alt": {
      "en": "Jesus",
      "fr": "Jésus",
      "ar": "Jesus"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "Al-Masih, son of Maryam — a word from Allah and a spirit from Him",
        "fr": "Al-Masih, fils de Maryam — une parole d’Allah et un esprit venant de Lui",
        "ar": "المسيح عيسى ابن مريم، كلمة الله وروح منه"
      },
      "r": [
        "3:45",
        "4:171"
      ]
    },
    "era": {
      "l": "disputed",
      "t": {
        "en": "Born about 4 BCE, according to historians.",
        "fr": "Né vers 4 av. J.-C., selon les historiens.",
        "ar": "وُلد نحو سنة 4 قبل الميلاد عند المؤرخين."
      },
      "r": [
        "book:historians"
      ]
    },
    "mentions": 25,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "The Children of Israel.",
        "fr": "Les Enfants d’Israël.",
        "ar": "بنو إسرائيل."
      },
      "r": [
        "3:49",
        "61:6"
      ]
    },
    "image": "isa",
    "heaven": 2,
    "ululAzm": true,
    "topography": {
      "region": {
        "en": "The Hills of Galilee, Nazareth, Bethlehem (Bayt Lahm), and Jerusalem (Al-Quds)",
        "fr": "Les collines de Galilée, Nazareth, Bethléem (Bayt Lahm) et Jérusalem (Al-Quds)",
        "ar": "جبال الجليل، الناصرة، بيت لحم، والقدس الشريف"
      },
      "modernCountries": {
        "en": "Palestine, Jordan, Syria",
        "fr": "Palestine, Jordanie, Syrie",
        "ar": "فلسطين، الأردن، سوريا"
      },
      "mapCoordinates": {
        "lat": 31.7049,
        "lng": 35.2078
      }
    }
  },
  {
    "id": "muhammad",
    "kind": "prophet",
    "name": {
      "en": "Muhammad ﷺ",
      "fr": "Muhammad ﷺ",
      "ar": "محمد ﷺ"
    },
    "order": 19,
    "title": {
      "l": "quran",
      "t": {
        "en": "The Seal of the Prophets, sent as a mercy to the worlds",
        "fr": "Le Sceau des prophètes, envoyé comme miséricorde pour les mondes",
        "ar": "خاتم النبيين، المبعوث رحمة للعالمين"
      },
      "r": [
        "33:40",
        "21:107"
      ]
    },
    "era": {
      "l": "hadith",
      "t": {
        "en": "Born about 570 CE in Mecca; died in 632 CE (11 AH) in Medina.",
        "fr": "Né vers 570 à La Mecque ; mort en 632 (11 H) à Médine.",
        "ar": "وُلد نحو سنة 570م بمكة، وتوفي سنة 632م (11هـ) بالمدينة."
      },
      "r": [
        "book:sira"
      ]
    },
    "mentions": 4,
    "sentTo": {
      "l": "quran",
      "t": {
        "en": "All of humankind.",
        "fr": "L’humanité entière.",
        "ar": "الناس كافة."
      },
      "r": [
        "34:28",
        "7:158"
      ]
    },
    "image": "muhammad",
    "ululAzm": true,
    "topography": {
      "region": {
        "en": "Al-Hijaz (Makkah Al-Mukarramah & Al-Madinah Al-Munawwarah)",
        "fr": "Le Hedjaz (La Mecque et Médine la Lumineuse)",
        "ar": "الحجاز (مكة المكرمة والمدينة المنورة)"
      },
      "modernCountries": {
        "en": "Saudi Arabia",
        "fr": "Arabie Saoudite",
        "ar": "المملكة العربية السعودية"
      },
      "mapCoordinates": {
        "lat": 24.4686,
        "lng": 39.6108
      }
    }
  },
  {
    "id": "hawwa",
    "kind": "spouse",
    "name": {
      "en": "Hawwa",
      "fr": "Hawwa",
      "ar": "حواء"
    },
    "order": 1,
    "alt": {
      "en": "Eve",
      "fr": "Ève",
      "ar": "Eve"
    },
    "title": {
      "l": "tradition",
      "t": {
        "en": "Mother of humankind",
        "fr": "Mère de l’humanité",
        "ar": "أم البشر"
      }
    },
    "image": "hawwa"
  },
  {
    "id": "qabil",
    "kind": "child",
    "name": {
      "en": "Qabil",
      "fr": "Caïn",
      "ar": "قابيل"
    },
    "order": 1,
    "alt": {
      "en": "Cain",
      "fr": "Caïn",
      "ar": "Cain"
    }
  },
  {
    "id": "habil",
    "kind": "child",
    "name": {
      "en": "Habil",
      "fr": "Abel",
      "ar": "هابيل"
    },
    "order": 1,
    "alt": {
      "en": "Abel",
      "fr": "Abel",
      "ar": "Abel"
    }
  },
  {
    "id": "sam",
    "kind": "child",
    "name": {
      "en": "Sam",
      "fr": "Sem",
      "ar": "سام"
    },
    "order": 3,
    "alt": {
      "en": "Shem",
      "fr": "Sem",
      "ar": "Shem"
    }
  },
  {
    "id": "ham",
    "kind": "child",
    "name": {
      "en": "Ham",
      "fr": "Cham",
      "ar": "حام"
    },
    "order": 3,
    "alt": {
      "en": "Ham",
      "fr": "Cham",
      "ar": "Ham"
    }
  },
  {
    "id": "yafith",
    "kind": "child",
    "name": {
      "en": "Yafith",
      "fr": "Japhet",
      "ar": "يافث"
    },
    "order": 3,
    "alt": {
      "en": "Japheth",
      "fr": "Japhet",
      "ar": "Japheth"
    }
  },
  {
    "id": "yam",
    "kind": "child",
    "name": {
      "en": "Yam (Kan‘an)",
      "fr": "Yam (Canaan)",
      "ar": "يام (كنعان)"
    },
    "order": 3,
    "alt": {
      "en": "Canaan",
      "fr": "Canaan",
      "ar": "كنعان"
    }
  },
  {
    "id": "sarah",
    "kind": "spouse",
    "name": {
      "en": "Sarah",
      "fr": "Sarah",
      "ar": "سارة"
    },
    "order": 6,
    "alt": {
      "en": "Sarah",
      "fr": "Sarah",
      "ar": "Sarah"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Wife of Ibrahim and mother of Ishaq",
        "fr": "Épouse d’Ibrahim et mère d’Ishaq",
        "ar": "أم إسحاق وزوج إبراهيم الخليل"
      },
      "r": [
        "bukhari:3358"
      ]
    },
    "image": "sarah"
  },
  {
    "id": "hajar",
    "kind": "spouse",
    "name": {
      "en": "Hajar",
      "fr": "Hajar",
      "ar": "هاجر"
    },
    "order": 6,
    "alt": {
      "en": "Hagar",
      "fr": "Agar",
      "ar": "Hagar"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Mother of Ismail and mother of the Arabs of Hijaz",
        "fr": "Mère d’Ismail et mère des Arabes du Hedjaz",
        "ar": "أم إسماعيل وأم عرب الحجاز"
      },
      "r": [
        "bukhari:3364"
      ]
    },
    "image": "hajar"
  },
  {
    "id": "binyamin",
    "kind": "family",
    "name": {
      "en": "Binyamin",
      "fr": "Benjamin",
      "ar": "بنيامين"
    },
    "order": 10,
    "alt": {
      "en": "Benjamin",
      "fr": "Benjamin",
      "ar": "Benjamin"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "Full brother of Prophet Yusuf and beloved son of Prophet Ya‘qub",
        "fr": "Frère germain du prophète Yusuf et fils bien-aimé de Ya‘qub",
        "ar": "شقيق يوسف عليه السلام الصابر المحبوب عند أبيه يعقوب"
      },
      "r": [
        "12:69"
      ]
    }
  },
  {
    "id": "safura",
    "kind": "spouse",
    "name": {
      "en": "Safura",
      "fr": "Safura",
      "ar": "صفورة"
    },
    "order": 11,
    "alt": {
      "en": "Zipporah",
      "fr": "Séphora",
      "ar": "Zipporah"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "Righteous daughter of the elder of Madyan who came walking shyly",
        "fr": "Fille vertueuse du sage de Madyan qui vint d’un pas pudique",
        "ar": "ابنة شيخ مدين الصالحة التي جاءت تمشي على استحياء"
      },
      "r": [
        "28:25"
      ]
    },
    "image": "safura"
  },
  {
    "id": "khadijah",
    "kind": "spouse",
    "name": {
      "en": "Khadijah bint Khuwaylid",
      "fr": "Khadija bint Khuwaylid",
      "ar": "خديجة بنت خويلد"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers",
      "fr": "Mère des croyants",
      "ar": "أم المؤمنين رضي الله عنها"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "First to believe in Allah and His Messenger; greeted by Jibril with peace",
        "fr": "Première à croire en Allah et Son Messager ; saluée par Jibril avec la paix",
        "ar": "أول من آمن بالله ورسوله وبشّرها جبريل ببيت في الجنة"
      },
      "r": [
        "bukhari:3818"
      ]
    },
    "image": "khadijah",
    "dates": {
      "hijriBorn": "68 BH",
      "hijriDied": "3 BH",
      "gregorianBorn": "555 CE",
      "gregorianDied": "619 CE"
    }
  },
  {
    "id": "aisha",
    "kind": "spouse",
    "name": {
      "en": "‘A’ishah bint Abi Bakr",
      "fr": "‘Aïcha bint Abi Bakr",
      "ar": "عائشة بنت أبي بكر"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers · Al-Siddiqah",
      "fr": "Mère des croyants · As-Siddiqa",
      "ar": "أم المؤمنين الصدّيقة رضي الله عنها"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "The truthful daughter of the truthful; scholar of the companions",
        "fr": "La véridique fille du véridique ; savante des compagnons",
        "ar": "الصدّيقة بنت الصدّيق وفقيهة الأمة"
      },
      "r": [
        "bukhari:3818"
      ]
    },
    "image": "aisha",
    "dates": {
      "hijriBorn": "9 BH",
      "hijriDied": "58 AH",
      "gregorianBorn": "613 CE",
      "gregorianDied": "678 CE"
    }
  },
  {
    "id": "fatimah",
    "kind": "child",
    "name": {
      "en": "Fatimah al-Zahra",
      "fr": "Fatima az-Zahra",
      "ar": "فاطمة الزهراء"
    },
    "order": 19,
    "alt": {
      "en": "Leader of the women of Paradise",
      "fr": "Maîtresse des femmes du Paradis",
      "ar": "سيدة نساء أهل الجنة رضي الله عنها"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "A part of the Prophet ﷺ; mother of al-Hasan and al-Husayn",
        "fr": "Une part du Prophète ﷺ ; mère d’al-Hassan et al-Hussein",
        "ar": "بضعة من النبي ﷺ وأم سبطَي رسول الله"
      },
      "r": [
        "bukhari:3714"
      ]
    },
    "image": "fatimah",
    "dates": {
      "hijriBorn": "18 BH",
      "hijriDied": "11 AH",
      "gregorianBorn": "605 CE",
      "gregorianDied": "632 CE"
    }
  },
  {
    "id": "sawdah",
    "kind": "spouse",
    "name": {
      "en": "Sawdah bint Zam‘ah",
      "fr": "Sawda bint Zam‘a",
      "ar": "سودة بنت زمعة"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers",
      "fr": "Mère des croyants",
      "ar": "أم المؤمنين رضي الله عنها"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Noble early believer and emigrant; second wife married by the Prophet ﷺ",
        "fr": "Noble croyante de la première heure et émigrée ; deuxième épouse unie au Prophète ﷺ",
        "ar": "أم المؤمنين المهاجرة الصابرة، ثانية زوجات النبي ﷺ"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "sawdah",
    "dates": {
      "hijriBorn": "50 BH",
      "hijriDied": "54 AH",
      "gregorianBorn": "573 CE",
      "gregorianDied": "674 CE"
    }
  },
  {
    "id": "hafsah",
    "kind": "spouse",
    "name": {
      "en": "Hafsah bint ‘Umar",
      "fr": "Hafsa bint ‘Umar",
      "ar": "حفصة بنت عمر بن الخطاب"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers · Guardian of the Mushaf",
      "fr": "Mère des croyants · Gardienne du Moushaf",
      "ar": "أم المؤمنين حارسة المصحف الشريف"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Wife of the Prophet ﷺ and daughter of ‘Umar al-Faruq; keeper of the primary Qur’anic manuscript",
        "fr": "Épouse du Prophète ﷺ et fille d’Oumar al-Faruq ; gardienne du premier manuscrit coranique",
        "ar": "ابنة عمر الفاروق وحارسة الصحف الأولى للقرآن الكريم"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "hafsah",
    "dates": {
      "hijriBorn": "18 BH",
      "hijriDied": "45 AH",
      "gregorianBorn": "605 CE",
      "gregorianDied": "665 CE"
    }
  },
  {
    "id": "zaynab_khuzaymah",
    "kind": "spouse",
    "name": {
      "en": "Zaynab bint Khuzaymah",
      "fr": "Zaynab bint Khouzayma",
      "ar": "زينب بنت خزيمة"
    },
    "order": 19,
    "alt": {
      "en": "Umm al-Masakin (Mother of the Impoverished)",
      "fr": "Oumm al-Masakin (Mère des pauvres)",
      "ar": "أم المساكين رضي الله عنها"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Mother of the Believers celebrated for her limitless compassion toward the destitute",
        "fr": "Mère des croyants renommée pour sa bienfaisance infinie envers les démunis",
        "ar": "أم المؤمنين الجليلة المشهورة بالبر وإطعام الفقراء والمساكين"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "zaynab_khuzaymah",
    "dates": {
      "hijriBorn": "26 BH",
      "hijriDied": "4 AH",
      "gregorianBorn": "597 CE",
      "gregorianDied": "625 CE"
    }
  },
  {
    "id": "umm_salamah",
    "kind": "spouse",
    "name": {
      "en": "Umm Salamah (Hind bint Abi Umayyah)",
      "fr": "Oumm Salama (Hind bint Abi Oumayya)",
      "ar": "أم سلمة (هند بنت أبي أمية)"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers · The Wise Counselor",
      "fr": "Mère des croyants · La sage conseillère",
      "ar": "أم المؤمنين ذات الحكمة والرأي السديد"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Mother of the Believers whose prudent advice resolved the crisis of al-Hudaybiyyah",
        "fr": "Mère des croyants dont le sage conseil dénoua la crise d’al-Houdaybiyya",
        "ar": "أم المؤمنين الصابرة وصاحبة المشورة الحكيمة يوم الحديبية"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "umm_salamah",
    "dates": {
      "hijriBorn": "28 BH",
      "hijriDied": "62 AH",
      "gregorianBorn": "596 CE",
      "gregorianDied": "681 CE"
    }
  },
  {
    "id": "zaynab_jahsh",
    "kind": "spouse",
    "name": {
      "en": "Zaynab bint Jahsh",
      "fr": "Zaynab bint Jahch",
      "ar": "زينب بنت جحش"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers · Married by Divine Decree",
      "fr": "Mère des croyants · Mariée par décret divin",
      "ar": "أم المؤمنين زوّجها الله من فوق سبع سماوات"
    },
    "title": {
      "l": "quran",
      "t": {
        "en": "Whose marriage to the Prophet ﷺ was divinely decreed in the Qur’an to dismantle adoption taboos",
        "fr": "Dont le mariage avec le Prophète ﷺ fut décrété dans le Coran pour abolir les tabous de l’adoption",
        "ar": "التي تولى الله تعالى تزويجها لنبيه بنص قرآني جلي في سورة الأحزاب"
      },
      "r": [
        "33:37"
      ]
    },
    "image": "zaynab_jahsh",
    "dates": {
      "hijriBorn": "33 BH",
      "hijriDied": "20 AH",
      "gregorianBorn": "590 CE",
      "gregorianDied": "641 CE"
    }
  },
  {
    "id": "juwayriyah",
    "kind": "spouse",
    "name": {
      "en": "Juwayriyah bint al-Harith",
      "fr": "Jouwayriya bint al-Harith",
      "ar": "جويرية بنت الحارث"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers · Blessing to Her People",
      "fr": "Mère des croyants · Bénédiction pour son peuple",
      "ar": "أم المؤمنين أعظم النساء بركة على قومها"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Noble chieftain’s daughter whose wedding led to the immediate emancipation of a hundred families",
        "fr": "Fille de chef dont l’union entraîna l’affranchissement immédiat de cent familles de son clan",
        "ar": "ابنة سيد بني المصطلق التي كانت بركة على عشيرتها فأُعتق بها مائة بيت"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "juwayriyah",
    "dates": {
      "hijriBorn": "15 BH",
      "hijriDied": "56 AH",
      "gregorianBorn": "608 CE",
      "gregorianDied": "676 CE"
    }
  },
  {
    "id": "umm_habibah",
    "kind": "spouse",
    "name": {
      "en": "Umm Habibah (Ramlah bint Abi Sufyan)",
      "fr": "Oumm Habiba (Ramla bint Abi Soufyan)",
      "ar": "أم حبيبة (رملة بنت أبي سفيان)"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers · Steadfast Emigrant to Abyssinia",
      "fr": "Mère des croyants · Émigrée héroïque en Abyssinie",
      "ar": "أم المؤمنين الصابرة المهاجرة في أرض الحبشة"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Mother of the Believers who wed the Prophet ﷺ while in Abyssinia, with King Negus delivering the dowry",
        "fr": "Mère des croyants épousée en Abyssinie, le roi Négus lui remettant sa dot",
        "ar": "أم المؤمنين التي تزوّجها النبي ﷺ وهي بأرض الحبشة وأصدقها النجاشي نيابة عنه"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "umm_habibah",
    "dates": {
      "hijriBorn": "35 BH",
      "hijriDied": "44 AH",
      "gregorianBorn": "589 CE",
      "gregorianDied": "664 CE"
    }
  },
  {
    "id": "safiyyah",
    "kind": "spouse",
    "name": {
      "en": "Safiyyah bint Huyayy",
      "fr": "Safiyya bint Houyay",
      "ar": "صفية بنت حيي بن أخطب"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers · Lineage of Harun and Musa",
      "fr": "Mère des croyants · Issue de Haroun et Moussa",
      "ar": "أم المؤمنين الحليمة من سبط هارون عليه السلام"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Descendant of Prophet Harun: “Your father is Harun, your uncle is Musa, and your husband is Muhammad”",
        "fr": "Descendante du prophète Haroun : « Ton père est Haroun, ton oncle Moussa et ton époux Muhammad »",
        "ar": "ابنة نبي وعمها نبي وزوجها نبي: من ذرية هارون بن عمران عليهما السلام"
      },
      "r": [
        "tirmidhi:3894"
      ]
    },
    "image": "safiyyah",
    "dates": {
      "hijriBorn": "9 BH",
      "hijriDied": "50 AH",
      "gregorianBorn": "610 CE",
      "gregorianDied": "670 CE"
    }
  },
  {
    "id": "maymunah",
    "kind": "spouse",
    "name": {
      "en": "Maymunah bint al-Harith",
      "fr": "Maymouna bint al-Harith",
      "ar": "ميمونة بنت الحارث"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers · The Last Wedded",
      "fr": "Mère des croyants · Dernière épouse unie au Prophète",
      "ar": "أم المؤمنين آخر من تزوّج النبي ﷺ"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "The last woman Muhammad ﷺ married, celebrated by ‘A’ishah for her profound God-consciousness",
        "fr": "Dernière femme épousée par Muhammad ﷺ, louée par ‘Aïcha pour sa profonde piété et piété filiale",
        "ar": "أم المؤمنين البرّة التقية، أثنت عليها عائشة بأنها كانت من أتقاهن لله وأوصلهن للرحم"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "maymunah",
    "dates": {
      "hijriBorn": "29 BH",
      "hijriDied": "51 AH",
      "gregorianBorn": "594 CE",
      "gregorianDied": "671 CE"
    }
  },
  {
    "id": "mariyah",
    "kind": "spouse",
    "name": {
      "en": "Mariyah al-Qibtiyyah",
      "fr": "Maria la Copte",
      "ar": "مارية القبطية"
    },
    "order": 19,
    "alt": {
      "en": "Mother of the Believers · Mother of Ibrahim",
      "fr": "Mère des croyants · Mère d’Ibrahim",
      "ar": "أم إبراهيم رضي الله عنها"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Mother of Ibrahim, son of Muhammad ﷺ; honored daughter of Egypt",
        "fr": "Mère d’Ibrahim, fils de Muhammad ﷺ ; noble fille d’Égypte",
        "ar": "أم ولد رسول الله ﷺ إبراهيم ووصية النبي الخالدة بإكرام أهل مصر"
      },
      "r": [
        "muslim:2543"
      ]
    },
    "image": "mariyah",
    "dates": {
      "hijriBorn": "20 BH",
      "hijriDied": "16 AH",
      "gregorianBorn": "602 CE",
      "gregorianDied": "637 CE"
    }
  },
  {
    "id": "qasim",
    "kind": "child",
    "name": {
      "en": "Al-Qasim ibn Muhammad",
      "fr": "Al-Qasim ibn Muhammad",
      "ar": "القاسم بن محمد ﷺ"
    },
    "order": 19,
    "alt": {
      "en": "Eldest son of the Prophet ﷺ",
      "fr": "Fils aîné du Prophète ﷺ",
      "ar": "أكبر أنجال رسول الله ﷺ"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Firstborn son of Muhammad ﷺ and Khadijah, the source of his prophetic Kunya Abu al-Qasim",
        "fr": "Fils aîné de Muhammad ﷺ et Khadija, origine de la kounya prophétique Abou al-Qasim",
        "ar": "بكر أولاد النبي ﷺ ومنه أخذ كنيته الشريفة (أبو القاسم)"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "qasim",
    "dates": {
      "hijriBorn": "24 BH",
      "hijriDied": "22 BH",
      "gregorianBorn": "598 CE",
      "gregorianDied": "600 CE"
    }
  },
  {
    "id": "abdullah_m",
    "kind": "child",
    "name": {
      "en": "‘Abdullah ibn Muhammad",
      "fr": "‘Abdallah ibn Muhammad",
      "ar": "عبد الله بن محمد ﷺ"
    },
    "order": 19,
    "alt": {
      "en": "Al-Tahir · Al-Tayyib",
      "fr": "At-Tahir · At-Tayyib",
      "ar": "الطيب الطاهر رضي الله عنه"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Son of Muhammad ﷺ and Khadijah, nicknamed The Pure and The Wholesome",
        "fr": "Fils de Muhammad ﷺ et Khadija, surnommé le Pur et l’Agréable",
        "ar": "نجل النبي ﷺ الملقب بالطاهر والطيب لطيب ولادته وطهارتها في الإسلام"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "abdullah_m",
    "dates": {
      "hijriBorn": "11 BH",
      "hijriDied": "10 BH",
      "gregorianBorn": "611 CE",
      "gregorianDied": "612 CE"
    }
  },
  {
    "id": "ibrahim_m",
    "kind": "child",
    "name": {
      "en": "Ibrahim ibn Muhammad",
      "fr": "Ibrahim ibn Muhammad",
      "ar": "إبراهيم بن محمد ﷺ"
    },
    "order": 19,
    "alt": {
      "en": "Youngest son of the Prophet ﷺ",
      "fr": "Plus jeune fils du Prophète ﷺ",
      "ar": "آخر أنجال النبي ﷺ"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Son of Muhammad ﷺ and Mariyah, whose parting moved the Messenger to tears of mercy",
        "fr": "Fils de Muhammad ﷺ et Maria, dont le départ émut le Prophète jusqu’aux larmes",
        "ar": "ابن رسول الله ﷺ من مارية القبطية الذي بكى عليه وقال: إن القلب ليحزن"
      },
      "r": [
        "muslim:2315"
      ]
    },
    "image": "ibrahim_m",
    "dates": {
      "hijriBorn": "8 AH",
      "hijriDied": "10 AH",
      "gregorianBorn": "630 CE",
      "gregorianDied": "632 CE"
    }
  },
  {
    "id": "zaynab_m",
    "kind": "child",
    "name": {
      "en": "Zaynab bint Muhammad",
      "fr": "Zaynab bint Muhammad",
      "ar": "زينب بنت محمد ﷺ"
    },
    "order": 19,
    "alt": {
      "en": "Eldest daughter of the Prophet ﷺ",
      "fr": "Fille aînée du Prophète ﷺ",
      "ar": "كبرى بنات رسول الله ﷺ"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Eldest daughter of the Messenger of Allah ﷺ and Khadijah; praised as the best of daughters",
        "fr": "Fille aînée du Messager d’Allah ﷺ et Khadija ; qualifiée de meilleure des filles",
        "ar": "كبرى بنات النبي ﷺ وخديجة الصابرة في هجرتها ودينها"
      },
      "r": [
        "book:sira"
      ]
    },
    "image": "zaynab_m",
    "dates": {
      "hijriBorn": "23 BH",
      "hijriDied": "8 AH",
      "gregorianBorn": "600 CE",
      "gregorianDied": "629 CE"
    }
  },
  {
    "id": "ruqayyah",
    "kind": "child",
    "name": {
      "en": "Ruqayyah bint Muhammad",
      "fr": "Ruqayya bint Muhammad",
      "ar": "رقية بنت محمد ﷺ"
    },
    "order": 19,
    "alt": {
      "en": "Daughter of the Prophet ﷺ · Dhat al-Hijratayn",
      "fr": "Fille du Prophète ﷺ · Dhat al-Hijratayn",
      "ar": "ذات الهجرتين رضي الله عنها"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Daughter of Muhammad ﷺ and Khadijah; wife of ‘Uthman ibn ‘Affan in both emigrations",
        "fr": "Fille de Muhammad ﷺ et Khadija ; compagne d’Othman ibn ‘Affan lors des deux exils",
        "ar": "ابنة النبي ﷺ وزوج عثمان بن عفان رضي الله عنهما والمهاجرة إلى الحبشة والمدينة"
      },
      "r": [
        "bukhari:3698"
      ]
    },
    "image": "ruqayyah",
    "dates": {
      "hijriBorn": "20 BH",
      "hijriDied": "2 AH",
      "gregorianBorn": "603 CE",
      "gregorianDied": "624 CE"
    }
  },
  {
    "id": "umm_kulthum",
    "kind": "child",
    "name": {
      "en": "Umm Kulthum bint Muhammad",
      "fr": "Oumm Koulthoum bint Muhammad",
      "ar": "أم كلثوم بنت محمد ﷺ"
    },
    "order": 19,
    "alt": {
      "en": "Daughter of the Prophet ﷺ · Wife of Dhu al-Nurayn",
      "fr": "Fille du Prophète ﷺ · Épouse de Dhu an-Nourayn",
      "ar": "ابنة رسول الله ﷺ وزوج ذي النورين"
    },
    "title": {
      "l": "hadith",
      "t": {
        "en": "Daughter of Muhammad ﷺ whose marriage to ‘Uthman completed his title Possessor of the Two Lights",
        "fr": "Fille de Muhammad ﷺ dont le mariage avec Othman lui valut le titre du Possesseur des Deux Lumières",
        "ar": "ابنة رسول الله ﷺ التي بزواجها من عثمان لُقّب بذي النورين"
      },
      "r": [
        "bukhari:3698"
      ]
    },
    "image": "umm_kulthum",
    "dates": {
      "hijriBorn": "19 BH",
      "hijriDied": "9 AH",
      "gregorianBorn": "604 CE",
      "gregorianDied": "630 CE"
    }
  }
]

export const coreById = new Map(peopleCore.map((p) => [p.id, p]))
export const coreProphets = peopleCore.filter((p) => p.kind === 'prophet')

/** Ulul ‘Azm: the five messengers of firm resolve, as most scholars read 46:35 with 33:7 and 42:13. */
export const ululAzm: Fact = f(
  'tradition',
  t('The five messengers of firm resolve (Ulul ‘Azm): Nuh, Ibrahim, Musa, ‘Isa and Muhammad ﷺ.', 'Les cinq messagers doués de constance (Ulul ‘Azm) : Nuh, Ibrahim, Musa, ‘Isa et Muhammad ﷺ.', 'أولو العزم من الرسل: نوح وإبراهيم وموسى وعيسى ومحمد ﷺ.'),
  '46:35',
  '33:7',
  '42:13',
)

/** The prophets met in each heaven during the Mi‘raj (Sahih al-Bukhari 3207). */
export const heavens: { n: number; ids: string[] }[] = [
  {
    "n": 1,
    "ids": [
      "adam"
    ]
  },
  {
    "n": 2,
    "ids": [
      "yahya",
      "isa"
    ]
  },
  {
    "n": 3,
    "ids": [
      "yusuf"
    ]
  },
  {
    "n": 4,
    "ids": [
      "idris"
    ]
  },
  {
    "n": 5,
    "ids": [
      "harun"
    ]
  },
  {
    "n": 6,
    "ids": [
      "musa"
    ]
  },
  {
    "n": 7,
    "ids": [
      "ibrahim"
    ]
  }
]

/** Total verified Qur'an and Hadith references across all prophet records and lineage links (checked against allTextRefs().size in data.test.ts). */
export const VERIFIED_REFS = 324
