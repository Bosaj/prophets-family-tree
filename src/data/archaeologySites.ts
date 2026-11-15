export type SiteSourceLevel = 'quran' | 'hadith' | 'archaeology' | 'tradition'

export interface SiteSourceText {
  en: string
  fr: string
  ar: string
  es?: string
}

export interface SiteSourceMetadata {
  sourceLevel: SiteSourceLevel
  source: SiteSourceText
}

export const SOURCE_LEVEL_BADGE: Record<
  SiteSourceLevel,
  { en: string; fr: string; ar: string; es: string; colorClass: string }
> = {
  quran: {
    en: 'Qur’anic Text & Toponym',
    fr: 'Texte et toponyme coraniques',
    ar: 'نص وموضع قرآني صريح',
    es: 'Texto y topónimo coránicos',
    colorClass: 'border-gold/40 bg-gold/15 text-gold-2',
  },
  hadith: {
    en: 'Authentic Hadith & Sira',
    fr: 'Hadith authentique et Sîra',
    ar: 'حديث صحيح وسيرة نبوية ثابتة',
    es: 'Hadiz auténtico y Sira',
    colorClass: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200',
  },
  archaeology: {
    en: 'Archaeological & Historical Survey',
    fr: 'Archéologie et sources historiques',
    ar: 'مسح أثري ونقوش وتاريخ موثق',
    es: 'Arqueología y fuentes históricas',
    colorClass: 'border-sky-400/40 bg-sky-500/15 text-sky-200',
  },
  tradition: {
    en: 'Traditional Attribution (Not Certain)',
    fr: 'Attribution traditionnelle (non certaine)',
    ar: 'نسبة تقليدية تاريخية (غير جازمة)',
    es: 'Atribución tradicional (no cierta)',
    colorClass: 'border-amber-400/40 bg-amber-500/15 text-amber-200',
  },
}

export const TRADITION_CAUTION_NOTE: SiteSourceText = {
  en: 'Caution — Traditional attribution: The exact coordinate or shrine is preserved in local geographical lore or classical chronicles, not fixed by an explicit Qur’anic verse or authentic hadith, and must not be treated as certain.',
  fr: 'Prudence — Attribution traditionnelle : L’emplacement exact repose sur la tradition géographique locale ou les chroniques anciennes, sans preuve tranchée du Coran ou de la Sunna authentique ; il n’est jamais présenté comme certain.',
  ar: 'تنبيه منهجي — نسبة تقليدية غير جازمة: تحديد هذا الموضع الجغرافي بعينه يعتمد على الموروث الجغرافي المحلي أو كتب البلدان والتواريخ، ولم يثبت فيه نص صريح من القرآن أو السنة الصحيحة، فلا يُجزم به.',
  es: 'Precaución — Atribución tradicional: La coordenada exacta proviene de la tradición geográfica local o crónicas antiguas, no de un versículo coránico explícito ni de un hadiz auténtico, por lo que no se presenta como segura.',
}

/** Explicit scholarly & archaeological source metadata for all existing SACRED_SITES pins. */
export const SITE_SOURCE_META: Record<string, SiteSourceMetadata> = {
  kaaba: {
    sourceLevel: 'quran',
    source: {
      en: 'Qur’an 2:125–127, 3:96–97; continuously preserved sanctuary at the heart of Masjid al-Haram, Makkah.',
      fr: 'Coran 2:125–127, 3:96–97 ; sanctuaire continuellement préservé au cœur de Masjid al-Haram à La Mecque.',
      ar: 'القرآن الكريم (البقرة 125–127، آل عمران 96–97)؛ البيت العتيق المحفوظ بالتواتر القطعي في قلب المسجد الحرام بمكة.',
      es: 'Corán 2:125–127, 3:96–97; santuario preservado continuamente en La Meca.',
    },
  },
  madinah_rawdah: {
    sourceLevel: 'hadith',
    source: {
      en: 'Sahih al-Bukhari 1195 & Sahih Muslim 1391; historically continuous Mosque and Chamber of the Prophet ﷺ in Madinah.',
      fr: 'Sahih al-Bukhari 1195 et Sahih Muslim 1391 ; mosquée et chambre du Prophète ﷺ transmises sans interruption à Médine.',
      ar: 'صحيح البخاري (1195) وصحيح مسلم (1391)؛ المسجد النبوي الشريف والروضة والحجرة الشريفة المتواترة بالمدينة المنورة.',
      es: 'Sahih al-Bujari 1195 y Sahih Muslim 1391; mezquita y cámara del Profeta ﷺ en Medina.',
    },
  },
  aqsa: {
    sourceLevel: 'quran',
    source: {
      en: 'Qur’an 17:1 (Al-Isra) & Sahih al-Bukhari 3366; the Noble Sanctuary plateau (Al-Haram al-Sharif) in Jerusalem.',
      fr: 'Coran 17:1 (Al-Isra) et Sahih al-Bukhari 3366 ; l’esplanade sacrée d’Al-Quds (Jérusalem).',
      ar: 'القرآن الكريم (الإسراء 1) وصحيح البخاري (3366)؛ المسجد الأقصى المبارك في بيت المقدس.',
      es: 'Corán 17:1 y Sahih al-Bujari 3366; la explanada sagrada de Jerusalén.',
    },
  },
  sinai: {
    sourceLevel: 'tradition',
    source: {
      en: 'Mount Sinai (Tur Sinin) is named in Qur’an 19:52, 28:29, 95:2; the identification with Jabal Musa in southern Sinai dates to 4th-century CE monastic and geographical tradition and remains debated among scholars.',
      fr: 'Le Mont Sinaï (Tour Sinin) est nommé dans le Coran (19:52, 95:2) ; son identification précise avec le Jabal Moussa au Sud-Sinaï relève de la tradition géographique antique et reste débattue.',
      ar: 'طور سيناء ثابت بالقرآن (مريم 52، التين 2)، أما تعيينه في «جبل موسى» بجنوب سيناء فيستند إلى الموروث الجغرافي القديم وهو محل بحث بين العلماء.',
      es: 'El monte Sinaí se nombra en el Corán (95:2); su identificación exacta con Yabal Musa proviene de la tradición geográfica antigua.',
    },
  },
  tuwa: {
    sourceLevel: 'tradition',
    source: {
      en: 'The Sacred Valley of Tuwa is named in Qur’an 20:12 and 79:16; pinning it to the Wadi al-Dayr basin at the foot of Jabal Musa is a traditional topographic identification, not a certain coordinate.',
      fr: 'La vallée sacrée de Touwa est nommée dans le Coran (20:12, 79:16) ; sa localisation au pied du Jabal Moussa est une identification traditionnelle non certaine.',
      ar: 'الوادي المقدس طوى مذكور في القرآن (طه 12، النازعات 16)، وتعيينه بوادي الدير عند جبل موسى تحديد جغرافي تقليدي غير جازم.',
      es: 'El valle de Tuwa se menciona en el Corán (20:12); su ubicación exacta al pie de Yabal Musa es tradicional.',
    },
  },
  judy: {
    sourceLevel: 'tradition',
    source: {
      en: 'Al-Judi is explicitly named in Qur’an 11:44 and attested by early geographers (Ibn Khordadbeh, Yaqut al-Hamawi, Mu‘jam al-Buldan) near Cizre/Şırnak (Cudi Dağı), though the exact summit landing spot cannot be archaeologically verified.',
      fr: 'Le mont Al-Joudi est nommé dans le Coran (11:44) et situé par Yaqout al-Hamawi près de Cizre (Cudi Dağı), mais le point précis de l’accostage demeure non vérifiable.',
      ar: 'استواء السفينة على «الجودي» نص قرآني (هود 44)، وربطه بجبل الجودي قرب جزيرة ابن عمر (شرناق) مشهور عند البلديين كياقوت الحموي، مع عدم الجزم بالنقطة الدقيقة.',
      es: 'Al-Yudi se nombra en el Corán (11:44) y se asocia tradicionalmente con Cudi Dağı en Şırnak.',
    },
  },
  hira: {
    sourceLevel: 'hadith',
    source: {
      en: 'Sahih al-Bukhari 3 (Chapter on How Revelation Began); Jabal an-Nur northeast of Masjid al-Haram, Makkah.',
      fr: 'Sahih al-Bukhari 3 (Début de la Révélation) ; Jabal an-Nour au nord-est de Masjid al-Haram, La Mecque.',
      ar: 'صحيح البخاري (حديث بدء الوحي رقم 3)؛ غار حراء في جبل النور شمال شرق المسجد الحرام بمكة.',
      es: 'Sahih al-Bujari 3; cueva de Hira en Yabal an-Nur, La Meca.',
    },
  },
  thawr: {
    sourceLevel: 'quran',
    source: {
      en: 'Qur’an 9:40 ("when they were in the cave") & Sahih al-Bukhari 3653; Jabal Thawr south of Makkah.',
      fr: 'Coran 9:40 (« quand ils étaient dans la grotte ») et Sahih al-Bukhari 3653 ; Jabal Thawr au sud de La Mecque.',
      ar: 'القرآن الكريم (التوبة 40: ﴿إِذْ هُمَا فِي الْغَارِ﴾) وصحيح البخاري (3653)؛ غار ثور جنوب مكة المكرمة.',
      es: 'Corán 9:40 y Sahih al-Bujari 3653; Yabal Thawr al sur de La Meca.',
    },
  },
  zamzam: {
    sourceLevel: 'hadith',
    source: {
      en: 'Sahih al-Bukhari 3364 (hadith of Ibn ‘Abbas on Hajar and Isma‘il); located 20 meters east of the Ka‘bah inside Masjid al-Haram.',
      fr: 'Sahih al-Bukhari 3364 (récit d’Ibn ‘Abbas sur Hajar et Isma‘il) ; situé à 20 m à l’est de la Ka‘bah.',
      ar: 'صحيح البخاري (3364، حديث ابن عباس في قصة هاجر وإسماعيل)؛ بئر زمزم داخل المسجد الحرام.',
      es: 'Sahih al-Bujari 3364; pozo de Zamzam junto a la Ka‘ba.',
    },
  },
  arafat: {
    sourceLevel: 'quran',
    source: {
      en: 'Qur’an 2:198 & Sahih Muslim 1218 (Farewell Pilgrimage sermon at Arafat); plain of Arafat east of Makkah.',
      fr: 'Coran 2:198 et Sahih Muslim 1218 (Sermon de l’Adieu) ; plaine d’Arafat à l’est de La Mecque.',
      ar: 'القرآن الكريم (البقرة 198) وصحيح مسلم (1218، حديث حجة الوداع)؛ صعيد عرفات وجبل الرحمة شرق مكة.',
      es: 'Corán 2:198 y Sahih Muslim 1218; llanura de Arafat al este de La Meca.',
    },
  },
  quba: {
    sourceLevel: 'quran',
    source: {
      en: 'Qur’an 9:108 & Sahih al-Bukhari 1193, Sahih Muslim 1398; Masjid Quba in southern Madinah.',
      fr: 'Coran 9:108, Sahih al-Bukhari 1193 et Sahih Muslim 1398 ; mosquée de Qouba au sud de Médine.',
      ar: 'القرآن الكريم (التوبة 108) وصحيح البخاري (1193) وصحيح مسلم (1398)؛ مسجد قباء بالمدينة المنورة.',
      es: 'Corán 9:108 y Sahih Muslim 1398; mezquita de Quba en Medina.',
    },
  },
  badr: {
    sourceLevel: 'quran',
    source: {
      en: 'Explicitly named in Qur’an 3:123 & 8:5–19; preserved battlefield and martyrs’ enclosure at Badr Hunayn, Hijaz.',
      fr: 'Nommé explicitement dans le Coran (3:123, 8:5–19) ; vallée historique de Badr dans le Hedjaz.',
      ar: 'منصوص عليه باسمه في القرآن الكريم (آل عمران 123، الأنفال 5–19)؛ وادي بدر ومقبرة الشهداء بالحجاز.',
      es: 'Nombrado explícitamente en el Corán (3:123); valle histórico de Badr.',
    },
  },
  uhud: {
    sourceLevel: 'hadith',
    source: {
      en: 'Qur’an 3:121–179 & Sahih al-Bukhari 2889 ("Uhud is a mountain that loves us and we love it"); north of Madinah.',
      fr: 'Coran 3:121–179 et Sahih al-Bukhari 2889 (« Ouhoud est une montagne qui nous aime ») ; au nord de Médine.',
      ar: 'آل عمران (121–179) وصحيح البخاري (2889: «أُحُدٌ جَبَلٌ يُحِبُّنَا وَنُحِبُّهُ»)؛ شمال المدينة المنورة.',
      es: 'Corán 3:121–179 y Sahih al-Bujari 2889; monte Uhud al norte de Medina.',
    },
  },
  hebron: {
    sourceLevel: 'tradition',
    source: {
      en: 'Herodian stone enclosure in Hebron (Al-Khalil) documented by Josephus and Islamic geographers (Ibn Battuta, Mujir al-Din). While Hebron’s patriarchal link is ancient, individual cenotaphs inside the cave rest on historical tradition rather than prophetic text.',
      fr: 'Enceinte hérodienne d’Hébron (Al-Khalil) décrite par les géographes anciens ; l’attribution des cénotaphes précis repose sur la tradition historique et non sur un texte prophétique.',
      ar: 'البناء الحجري القديم في الخليل معروف تاريخيًا عند المؤرخين والبلديين، غير أن تعيين القبور بعينها داخل المغارة يستند إلى التواريخ المتوارثة لا إلى نص نبوي قاطع.',
      es: 'Recinto antiguo de Hebrón (al-Jalil); la atribución exacta de los cenotafios descansa en la tradición histórica.',
    },
  },
  ur_chaldees: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Excavated by Sir Leonard Woolley (1922–1934, British Museum / Penn Museum) at Tell el-Muqayyar (ancient Sumerian Ur). Its identification with the birthplace of Ibrahim is a widespread historical-archaeological correlation (alongside northern Harran/Urfa), not stated in the Qur’an.',
      fr: 'Fouilles de Sir Leonard Woolley (1922–1934) à Tell el-Muqayyar (Our en Sumer). Son association avec la naissance d’Ibrahim est une corrélation historico-archéologique classique (avec l’hypothèse d’Ourfa/Harran), non nommée dans le Coran.',
      ar: 'تنقيبات السير ليونارد وولي (1922–1934) في «تل المقير» (أور السومرية). وربطها بمولد إبراهيم عليه السلام قول تاريخي وأثري مشهور (إلى جانب قول حران/أورفا) وليس نصًا قرآنيًا.',
      es: 'Excavaciones de Leonard Woolley (1922–1934) en Tell el-Muqayyar (Ur); correlación histórico-arqueológica con la patria de Ibrahim.',
    },
  },
  madyan_well: {
    sourceLevel: 'tradition',
    source: {
      en: 'Madyan is named in Qur’an 28:22–28; the rock-cut Nabataean/Bronze-Age tombs and well at Al-Bad‘ (Mugha’ir Shu‘ayb in Tabuk) are archaeologically surveyed by the Saudi Heritage Commission, while the specific "Well of Musa" pin is local tradition.',
      fr: 'Madyan est nommée dans le Coran (28:22–28) ; le site antique d’Al-Bad‘ (Tabouk) est attesté par l’archéologie, mais le puits précis dit « de Moussa » relève de la tradition locale.',
      ar: '«مدين» ثابتة في القرآن (القصص 22–28)، وآثار البدع (مغائر شعيب بتبوك) موثقة أثريًا، أما تعيين البئر بعينها فموروث محلي تقليدي.',
      es: 'Madyan se nombra en el Corán (28:22–28); el pozo exacto en al-Bad‘ pertenece a la tradición local.',
    },
  },
  al_hijr: {
    sourceLevel: 'quran',
    source: {
      en: 'Qur’an 15:80–84 ("The Companions of Al-Hijr") & Sahih al-Bukhari 3379 (the Prophet ﷺ passing by Al-Hijr on the way to Tabuk); UNESCO World Heritage site of Hegra / Mada’in Salih.',
      fr: 'Coran 15:80–84 (« Les gens d’Al-Hijr ») et Sahih al-Bukhari 3379 (passage du Prophète ﷺ lors de l’expédition de Tabouk) ; site UNESCO de Hégra / Mada’in Salih.',
      ar: 'القرآن الكريم (الحجر 80–84) وصحيح البخاري (3379، مرور النبي ﷺ بالحِجر عام تبوك)؛ موقع الحِجر الأثري الموثق باليونسكو.',
      es: 'Corán 15:80–84 y Sahih al-Bujari 3379; sitio arqueológico UNESCO de Hegra (Mada’in Salih).',
    },
  },
  ahqaf_iram: {
    sourceLevel: 'tradition',
    source: {
      en: 'Al-Ahqaf (Qur’an 46:21) and Iram of the Pillars (89:7) are Qur’anic toponyms broadly associated by classical geographers with southern Arabia (Hadhramaut/Dhofar); the specific Shisr/Ubar coordinate is a modern archaeological hypothesis and not certain.',
      fr: 'Al-Ahqaf (Coran 46:21) et Iram (89:7) désignent le sud de l’Arabie chez les géographes classiques ; les coordonnées précises de Shisr/Oubar restent une hypothèse archéologique non certaine.',
      ar: 'الأحقاف (الأحقاف 21) وإرم ذات العماد (الفجر 7) مواضع قرآنية في جنوب الجزيرة، أما تحديد النقطة بعينها في شصر/أوبار ففرضية أثرية حديثة غير جازمة.',
      es: 'Al-Ahqaf (46:21) e Iram (89:7) son topónimos coránicos; la coordenada exacta en Dhofar/Hadhramaut es aproximada y tradicional.',
    },
  },
  qabr_hud: {
    sourceLevel: 'tradition',
    source: {
      en: 'Reported by al-Hamdani (Sifat Jazirat al-‘Arab) and Yaqut al-Hamawi in Wadi Hadhramaut; Ibn Taymiyyah and critical hadith scholars note that no authentic prophetic narration fixes the grave of Hud.',
      fr: 'Mentionné par al-Hamdani et Yaqout dans le Wadi Hadramaout ; les savants du hadith soulignent qu’aucun texte authentique ne fixe l’emplacement du tombeau de Houd.',
      ar: 'ذكره الهمداني وياقوت الحموي في وادي حضرموت، وقد نص المحققون من أهل الحديث على أنه لا يصح حديث مرفوع في تعيين قبر هود عليه السلام.',
      es: 'Mencionado por geógrafos clásicos en Hadramaut; ningún hadiz auténtico fija la tumba de Hud.',
    },
  },
  dead_sea: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Qur’an 15:76, 37:137–138 ("by a highway that still remains" along theHijaz–Syria caravan corridor) & geological/archaeological surveys of the Dead Sea Lisan basin (Bab edh-Dhra‘ / Numeira).',
      fr: 'Coran 15:76, 37:137–138 (sur la route caravanière du Levant) et relevés géologiques et archéologiques du bassin de la mer Morte (Bab edh-Dhra‘).',
      ar: 'القرآن الكريم (الحجر 76: ﴿وَإِنَّهَا لَبِسَبِيلٍ مُّقِيمٍ﴾، الصافات 137) والمسوحات الجيولوجية والأثرية لحوض البحر الميت (باب الذراع ونميرة).',
      es: 'Corán 15:76, 37:137–138 y estudios geológicos y arqueológicos de la cuenca del Mar Muerto.',
    },
  },
  red_sea_crossing: {
    sourceLevel: 'tradition',
    source: {
      en: 'The parting of the sea (al-yamm / al-bahr) is stated in Qur’an 26:63 and 20:77; whether the crossing occurred at the Gulf of Suez, the Bitter Lakes, or the Gulf of Aqaba is a matter of scholarly and geographical hypothesis.',
      fr: 'La traversée de la mer est affirmée par le Coran (26:63, 20:77) ; le point exact (golfe de Suez, lacs Amers ou golfe d’Aqaba) demeure une hypothèse géographique non tranchée.',
      ar: 'فلق البحر لنجاة موسى وقومه قطعي في القرآن (الشعراء 63، طه 77)، أما تعيين نقطة العبور الجغرافية في خليج السويس أو العقبة فاجتهاد جغرافي غير جازم.',
      es: 'El cruce del mar consta en el Corán (26:63); la coordenada exacta en el Mar Rojo es una hipótesis geográfica.',
    },
  },
  jabal_harun: {
    sourceLevel: 'tradition',
    source: {
      en: 'Surmounted by a 14th-century Mamluk shrine over a Byzantine monastic complex near Petra (Finnish Jabal Harun Project excavations); the association with Harun’s burial rests on Josephus and local tradition, not Qur’an or authentic Sunnah.',
      fr: 'Sanctuaire mamelouk du XIVe siècle sur un complexe byzantin près de Pétra (fouilles du Finnish Jabal Harun Project) ; l’attribution au tombeau de Haroun repose sur Flavius Josèphe et la tradition locale.',
      ar: 'مقام مملوكي من القرن الثامن الهجري فوق آثار بيزنطية قرب البتراء؛ ونسبة القبر إلى هارون عليه السلام مستندة إلى المؤرخين القدماء والموروث المحلي لا إلى نص صحيح.',
      es: 'Santuario mameluco cerca de Petra; la atribución a la tumba de Harún proviene de la tradición local.',
    },
  },
  ayn_ayyub: {
    sourceLevel: 'tradition',
    source: {
      en: 'The miraculous cool spring granted to Ayyub is stated in Qur’an 38:42; identifying it with Jabal Qara near Salalah (Dhofar) vs. Hauran/Al-Shaykh Sa‘d in southern Syria is a regional folk attribution.',
      fr: 'La source fraîche accordée à Ayyoub est mentionnée dans le Coran (38:42) ; sa localisation à Salalah (Dhofar) ou dans le Hauran en Syrie relève de la tradition régionale.',
      ar: 'نبع الماء البارد لأيوب عليه السلام نص قرآني (ص 42)، أما تعيينه في جبال ظفار بصلالة أو في حوران بالشام فنسبة شعبية وتقليدية.',
      es: 'El manantial de Ayyub consta en el Corán (38:42); su ubicación en Salalah o Siria es una tradición regional.',
    },
  },
  jubb_yusuf: {
    sourceLevel: 'tradition',
    source: {
      en: 'The "bottom of the well" (ghayabat al-jubb) is named in Qur’an 12:10, 12:15; associating it with Tel Dothan or Jubb Yusuf near Safed rests on medieval travel chronicles (al-Harawi, Yaqut) and is not certain.',
      fr: 'Le puits (ghayabat al-joubb) est nommé dans le Coran (12:10, 12:15) ; son identification avec Tel Dothan ou Joubb Yousouf repose sur les récits de voyageurs médiévaux.',
      ar: '«غيابت الجب» ثابت بالقرآن (يوسف 10، 15)، أما تعيينه في تل دوثان أو خان جب يوسف فمعتمد على كتب الرحلات والبلدان ولا يُجزم به.',
      es: 'El pozo se menciona en el Corán (12:10); su ubicación exacta en Palestina es tradicional.',
    },
  },
  memphis_yusuf: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Egyptian royal administration is mentioned in Qur’an 12:21, 12:54–56; Memphis (Mit Rahina) and Avaris (Tell el-Dab‘a) are excavated Middle/New Kingdom capitals along the lower Nile.',
      fr: 'L’administration royale d’Égypte est décrite dans le Coran (12:21, 12:54–56) ; Memphis (Mit Rahina) et Avaris sont les capitales antiques attestées par l’archéologie égyptienne.',
      ar: 'مصر وخزائن الأرض مذكورة في سورة يوسف (12: 21، 55)، ومنف (ميت رهينة) وأواريس عواصم أثرية موثقة في مصر القديمة.',
      es: 'Corán 12:21, 12:54–56 y excavaciones arqueológicas de Menfis (Mit Rahina) en el Bajo Egipto.',
    },
  },
  nineveh: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Qur’an 37:147 & classical tafasir (Ibn Kathir, al-Tabari) identifying Yunus’s city as Nineveh; corroborated by excavations at Kuyunjik and Tell Nebi Yunus in Mosul (Layard, Iraqi State Board of Antiquities).',
      fr: 'Coran 37:147 et exégèses classiques (Ibn Kathir, al-Tabari) identifiant la cité de Younous à Ninive ; confirmé par les fouilles de Kuyunjik à Mossoul.',
      ar: 'الصافات (147) وإجماع المفسرين والمؤرخين على أن قرية يونس هي نينوى بالموصل، وتؤيده التنقيبات الأثرية في تل قوينجق وتل التوبة.',
      es: 'Corán 37:147 y excavaciones arqueológicas de Nínive (Kuyunjik) en Mosul.',
    },
  },
  yaqtin_shore: {
    sourceLevel: 'tradition',
    source: {
      en: 'Being cast onto the open shore under the gourd plant (yaqtin) is stated in Qur’an 37:145–146; placing the landing along the eastern Mediterranean / Tigris littoral is a traditional geographical approximation.',
      fr: 'Le rejet sur le rivage nu et le plant de yaqtin sont cités dans le Coran (37:145–146) ; le point côtier exact en Méditerranée orientale est une approximation traditionnelle.',
      ar: 'نبذ يونس بالعراء وإنبات شجرة اليقطين نص قرآني (الصافات 145–146)، أما تحديد الساحل بعينه فتقدير جغرافي تقليدي.',
      es: 'El episodio de la planta de yaqtin consta en el Corán (37:145–146); la coordenada costera es aproximada.',
    },
  },
  mount_carmel: {
    sourceLevel: 'tradition',
    source: {
      en: 'Ilyas’s confrontation with the worshippers of Ba‘l is stated in Qur’an 37:123–132; associating the contest with Mount Carmel (Jabal Mar Ilyas) near Haifa comes from Biblical and Levantine geographical tradition.',
      fr: 'La confrontation d’Ilyas avec le culte de Ba‘l est dans le Coran (37:123–132) ; sa localisation au mont Carmel près de Haïfa provient de la tradition biblique et levantine.',
      ar: 'إنكار إلياس عبادة «بعل» ثابت في القرآن (الصافات 123–132)، وربطه بجبل الكرمل في حيفا مستمد من الموروث التاريخي للشام.',
      es: 'La predicación de Ilyas contra Ba‘l consta en el Corán (37:123–132); su vínculo con el Monte Carmelo es tradicional.',
    },
  },
  bethlehem: {
    sourceLevel: 'tradition',
    source: {
      en: 'Maryam’s withdrawal to an "eastern place" and the palm-trunk spring are stated in Qur’an 19:16–26; identifying the birthplace with Bethlehem (Bayt Lahm) comes from Christian and classical Islamic historical accounts.',
      fr: 'Le retrait de Maryam en un « lieu oriental » est dans le Coran (19:16–26) ; l’identification avec Bethléem (Bayt Lahm) relève de la tradition historique chrétienne et islamique.',
      ar: 'انتباذ مريم مكانًا شرقيًا عند الجذع والسَّري نص قرآني (مريم 16–26)، وتعيينه بمدينة بيت لحم مستند إلى الروايات التاريخية.',
      es: 'El retiro de Maryam consta en el Corán (19:16–26); la identificación con Belén proviene de la tradición histórica.',
    },
  },
  mount_olives: {
    sourceLevel: 'tradition',
    source: {
      en: 'Allah raising ‘Isa to Himself is stated in Qur’an 4:158 and 3:55; associating the site of ascension with Jabal az-Zaytun (Mount of Olives) overlooking Jerusalem rests on historical tradition.',
      fr: 'L’élévation de ‘Isa vers Allah est affirmée par le Coran (4:158, 3:55) ; son association avec le mont des Oliviers à Jérusalem repose sur la tradition historique.',
      ar: 'رفع عيسى عليه السلام إلى الله ثابت بنص القرآن (النساء 158، آل عمران 55)، وتحديد موضعه بجبل الطور (الزيتون) بالقدس رواية تاريخية.',
      es: 'La elevación de ‘Isa consta en el Corán (4:158); su vínculo con el Monte de los Olivos es tradicional.',
    },
  },
  yahya_shrine: {
    sourceLevel: 'tradition',
    source: {
      en: 'Historical tradition recorded by Ibn ‘Asakir (Tarikh Dimashq) and Ibn Kathir when Caliph al-Walid I constructed the Umayyad Mosque in 86–96 AH; attribution of the head relic to Yahya is a medieval chronicle report, not a prophetic hadith.',
      fr: 'Tradition historique rapportée par Ibn ‘Asakir (Tarikh Dimashq) lors de l’édification de la mosquée des Omeyyades par al-Walid Ier ; attribution issue des chroniques et non d’un hadith.',
      ar: 'رواية تاريخية أوردها ابن عساكر في «تاريخ دمشق» عند بناء الوليد بن عبد الملك للجامع الأموي، ولا يثبت فيها حديث مرفوع.',
      es: 'Crónica histórica recogida por Ibn ‘Asakir en Tarikh Dimashq; atribución tradicional.',
    },
  },
  mihrab_dawud: {
    sourceLevel: 'tradition',
    source: {
      en: 'Dawud’s mihrab (sanctuary chamber) is mentioned in Qur’an 38:21; the extant Mamluk/Ottoman Citadel tower in Jerusalem is a medieval monument named in honor of Dawud rather than an Iron Age structure.',
      fr: 'Le mihrab de Dawoud est cité dans le Coran (38:21) ; la tour actuelle de la Citadelle de Jérusalem est un monument médiéval nommé en mémoire de Dawoud.',
      ar: 'محراب داود مذكور في القرآن (ص 21)، أما القلعة القائمة اليوم بالقدس فبناء تاريخي متأخر سُمّي تبركًا باسمه وليس المحراب الأصلي جزماً.',
      es: 'El mihrab de Dawud se cita en el Corán (38:21); la torre actual de la Ciudadela de Jerusalén es una atribución conmemorativa.',
    },
  },
  baqi_madinah: {
    sourceLevel: 'hadith',
    source: {
      en: 'Sahih Muslim 974 (the Prophet ﷺ praying for the inhabitants of Baqi‘ al-Gharqad); historically continuous cemetery immediately east of the Prophet’s Mosque in Madinah.',
      fr: 'Sahih Muslim 974 (invocation du Prophète ﷺ pour les gens de Baqi‘ al-Gharqad) ; cimetière historique contigu à la Mosquée du Prophète à Médine.',
      ar: 'صحيح مسلم (974، استغفار النبي ﷺ لأهل بقيع الغرقد)؛ المقبرة التاريخية المتواترة بجوار المسجد النبوي بالمدينة المنورة.',
      es: 'Sahih Muslim 974; cementerio histórico de al-Baqi‘ junto a la Mezquita del Profeta en Medina.',
    },
  },
  yarmouk_battle: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Al-Baladhuri (Futuh al-Buldan) & al-Tabari (Tarikh, 15 AH / 636 CE); Yarmouk River gorge plateau on the Jordan–Syria border.',
      fr: 'Al-Baladhouri (Foutouh al-Bouldan) et al-Tabari (15 H / 636) ; plateau de la rivière Yarmouk à la frontière jordano-syrienne.',
      ar: 'البلاذري في «فتوح البلدان» والطبري في «تاريخ الرسل والملوك» (سنة 15 هـ / 636 م)؛ وادي اليرموك بين الأردن والشام.',
      es: 'Al-Baladhuri (Futuh al-Buldan) y al-Tabari (15 H / 636); valle del río Yarmuk.',
    },
  },
  kufa_grand_mosque: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Founded in 17 AH (638 CE) by Sa‘d ibn Abi Waqqas (al-Tabari, Tarikh; al-Baladhuri); early Islamic Kufic inscriptions and Umayyad/Abbasid foundations documented by Iraqi archaeological excavations.',
      fr: 'Fondée en 17 H (638) par Sa‘d ibn Abi Waqqas (al-Tabari, al-Baladhouri) ; fondations anciennes documentées par les fouilles archéologiques de Koufa.',
      ar: 'أسسها الصحابي سعد بن أبي وقاص سنة 17 هـ (638 م) كما في تاريخ الطبري وفتوح البلدان، وأسسها الأثرية الأولى موثقة في الكوفة.',
      es: 'Fundada en 17 H (638) por Sa‘d ibn Abi Waqqas; documentada histórica y arqueológicamente en Kufa.',
    },
  },
  amr_mosque_fustat: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Founded in 21 AH (642 CE) by ‘Amr ibn al-‘As at Fustat (Ibn ‘Abd al-Hakam, Futuh Misr; al-Suyuti, Husn al-Muhadarah); standing monument and excavated Fustat urban quarter in Old Cairo.',
      fr: 'Fondée en 21 H (642) par ‘Amr ibn al-‘As à Foussat (Ibn ‘Abd al-Hakam, Foutouh Misr) ; monument historique et fouilles urbaines de Foussat au Vieux Caire.',
      ar: 'أسسها عمرو بن العاص سنة 21 هـ (642 م) بالفسطاط (ابن عبد الحكم في فتوح مصر، والسيوطي في حسن المحاضرة)؛ معلم قائم وموثق أثريًا بالقاهرة.',
      es: 'Fundada en 21 H (642) por ‘Amr ibn al-‘As en Fustat (El Cairo); monumento histórico documentado.',
    },
  },
  damascus_umayyad: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Constructed 86–96 AH (705–715 CE) under Caliph al-Walid I (Ibn ‘Asakir; Ibn Kathir, Al-Bidayah wan-Nihayah); preserved Umayyad mosaics, inscriptions, and UNESCO World Heritage monument in Old Damascus.',
      fr: 'Érigée en 86–96 H (705–715) sous al-Walid Ier (Ibn ‘Asakir, Ibn Kathir) ; mosaïques omeyyades et monument UNESCO de la vieille ville de Damas.',
      ar: 'بناها الوليد بن عبد الملك (86–96 هـ / 705–715 م)؛ صرح أموي قائم بفسيفسائه ونقوشه التاريخية في دمشق القديمة (تراث عالمي باليونسكو).',
      es: 'Construida en 86–96 H (705–715) bajo al-Walid I; monumento histórico UNESCO en Damasco.',
    },
  },
  cordoba_mezquita: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Founded in 170 AH (786 CE) by ‘Abd al-Rahman I with expansions by al-Hakam II (al-Maqqari, Nafh at-Tib); standing UNESCO World Heritage monument with dated Kufic foundation inscriptions in Córdoba.',
      fr: 'Fondée en 170 H (786) par ‘Abd al-Rahman Ier et agrandie par al-Hakam II (al-Maqqari, Nafh at-Tib) ; monument UNESCO avec inscriptions coufiques datées à Cordoue.',
      ar: 'أسسها عبد الرحمن الداخل سنة 170 هـ (786 م) ووسعها الحكم المستنصر (المقري في نفح الطيب)؛ معلم تاريخي قائم بنقوشه الكوفية المؤرخة في قرطبة.',
      es: 'Fundada en 170 H (786) por ‘Abd al-Rahman I; monumento UNESCO con inscripciones cúficas fechadas en Córdoba.',
    },
  },
  baghdad_house_of_wisdom: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Attested by Ibn al-Nadim (Al-Fihrist) and Ibn Khallikan (Wafayat al-A‘yan) in Abbasid Baghdad under Harun al-Rashid and al-Ma’mun; approximate coordinate of the Round City / Rusafa scholarly quarter (destroyed in 656 AH / 1258 CE).',
      fr: 'Attestée par Ibn al-Nadim (Al-Fihrist) et Ibn Khallikan dans la Bagdad abbasside ; coordonnée historique du quartier savant de Bagdad (détruit en 656 H / 1258).',
      ar: 'موثقة عند ابن النديم في «الفهرست» وابن خلكان في «وفيات الأعيان» في بغداد العباسية؛ إحداثيات تقريبية لموقعها التاريخي قبل دمار سنة 656 هـ.',
      es: 'Documentada por Ibn al-Nadim (Al-Fihrist) en la Bagdad abasí; coordenada histórica aproximada.',
    },
  },
  samarkand_bukhari: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Al-Dhahabi (Siyar A‘lam an-Nubala, 12/391) & Ibn Hajar (Hady al-Sari); documented burial site of Imam al-Bukhari (d. 256 AH / 870 CE) at Khartang near Samarkand.',
      fr: 'Al-Dhahabi (Siyar A‘lam an-Noubala) et Ibn Hajar (Hady al-Sari) ; lieu d’inhumation attesté de l’Imam al-Bukhari (m. 256 H / 870) à Khartang près de Samarcande.',
      ar: 'الذهبي في «سير أعلام النبلاء» (12/ 391) وابن حجر في «هدي الساري»؛ موضع دفن الإمام البخاري (ت 256 هـ) في خرتنك بسمرقند.',
      es: 'Al-Dhahabi (Siyar A‘lam an-Nubala); mausoleo histórico del imam al-Bujari (m. 256 H / 870) en Jartang, Samarcanda.',
    },
  },
  nishapur_muslim: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Al-Dhahabi (Tadhkirat al-Huffaz & Siyar A‘lam an-Nubala, 12/557); historical burial ground of Imam Muslim ibn al-Hajjaj (d. 261 AH / 875 CE) at Nasrabad, Nishapur.',
      fr: 'Al-Dhahabi (Tadhkirat al-Houffaz et Siyar) ; sépulture historique de l’Imam Muslim (m. 261 H / 875) à Nasrabad, Nichapour.',
      ar: 'الذهبي في «تذكرة الحفاظ» و«سير أعلام النبلاء» (12/ 557)؛ مرقد الإمام مسلم بن الحجاج (ت 261 هـ) بنصرآباد في نيسابور.',
      es: 'Al-Dhahabi (Tadhkirat al-Huffaz); sepultura histórica del imam Muslim (m. 261 H / 875) en Nishapur.',
    },
  },
  fez_qarawiyyin: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Ibn Abi Zar‘ (Rawd al-Qirtas) & preserved Marinid/Idrisid foundation inscriptions in Fez (founded 245 AH / 859 CE); UNESCO World Heritage Medina of Fez.',
      fr: 'Ibn Abi Zar‘ (Rawd al-Qirtas) et inscriptions historiques conservées à Fès (fondée en 245 H / 859) ; Médina de Fès classée à l’UNESCO.',
      ar: 'ابن أبي زرع في «روض القرطاس» والنقوش الوقفية والتاريخية المحفوظة بجامع القرويين بفاس (تأسس 245 هـ / 859 م).',
      es: 'Ibn Abi Zar‘ (Rawd al-Qirtas) e inscripciones históricas en Fez (fundada en 245 H / 859).',
    },
  },
  istanbul_eyup_hagia: {
    sourceLevel: 'archaeology',
    source: {
      en: 'Musnad Ahmad 18977, Ibn Sa‘d (at-Tabaqat), & Ottoman endowment records of Sultan Mehmed II (863 AH / 1458 CE) at Eyüp Sultan and Hagia Sophia on the Golden Horn.',
      fr: 'Musnad Ahmad 18977, Ibn Sa‘d (at-Tabaqat) et registres de waqf du sultan Mehmed II (863 H / 1458) à Eyüp Sultan et Sainte-Sophie.',
      ar: 'مسند أحمد (18977) وطبقات ابن سعد ووقفيات السلطان محمد الفاتح (863 هـ / 1458 م) في جامع أيوب سلطان وآيا صوفيا بإسطنبول.',
      es: 'Musnad Ahmad 18977 y registros históricos otomanos de Eyüp Sultan y Santa Sofía en Estambul.',
    },
  },
}

/** 10 additional archaeologically & epigraphically documented waypoints enriching /map (#15). */
export const ARCHAEOLOGICAL_WAYPOINTS = [
  {
    id: 'harran_archaeological',
    name: {
      en: 'Harran Archaeological Tell & Astral Sanctuary (Upper Mesopotamia)',
      fr: 'Tell archéologique de Harran (Haute-Mésopotamie)',
      ar: 'تل حرّان الأثري ومعبد الكواكب (أعالي الرافدين)',
      es: 'Tell arqueológico de Harán (Alta Mesopotamia)',
    },
    type: 'city' as const,
    lat: 36.8653,
    lng: 39.0314,
    desc: {
      en: 'Ancient Bronze Age crossroads on the Balikh River famed in cuneiform tablets for the cult of the moon-god Sin and celestial bodies—illuminating the historical backdrop of Ibrahim’s argument against star, moon, and sun worship.',
      fr: 'Carrefour de l’âge du Bronze sur la rivière Balikh, connu par les tablettes cunéiformes pour le culte lunaire et astral, éclairant le contexte du débat d’Ibrahim contre l’adoration des astres.',
      ar: 'حاضرة أثرية من العصر البرونزي على نهر البليخ، اشتهرت في الرقم المسمارية بعبادة القمر والكواكب، مما يجلّي البيئة التاريخية لمحاججة إبراهيم عليه السلام لعبدة الكواكب والشمس والقمر.',
      es: 'Encrucijada de la Edad del Bronce célebre en tablillas cuneiformes por el culto astral, contexto del debate de Ibrahim.',
    },
    prophetId: 'ibrahim',
    quranRef: 'Al-An‘am 6:76-79',
    sourceLevel: 'archaeology' as const,
    source: {
      en: 'Mari Royal Archives (18th c. BCE), Nabonidus Harran Stelae, and D. S. Rice / Seton Lloyd excavations at Harran mound (Şanlıurfa); linkage to Ibrahim’s migration is historical-archaeological.',
      fr: 'Archives royales de Mari (XVIIIe s. av. J.-C.), stèles de Nabonide à Harran et fouilles de D. S. Rice ; le lien avec la halte d’Ibrahim relève de l’histoire ancienne.',
      ar: 'وثائق ماري الملكية ومسلات نبونيد في حران وتنقيبات ديفيد رايس؛ وربطها بمحطة هجرة إبراهيم عليه السلام مستند إلى الدراسات التاريخية والأثرية.',
      es: 'Archivos reales de Mari, estelas de Nabonido en Harán y excavaciones arqueológicas en Şanlıurfa.',
    },
  },
  {
    id: 'tel_beersheba_well',
    name: {
      en: 'Tel Be’er Sheva / Bi’r as-Sab‘ (Negev Bronze & Iron Age Well)',
      fr: 'Tel Be’er Sheva / Bi’r as-Sab‘ (Puits antique du Néguev)',
      ar: 'تل بئر السبع الأثري (جنوب فلسطين / النقب)',
      es: 'Tel Be’er Sheva / Bi’r as-Sab‘ (pozo antiguo del Néguev)',
    },
    type: 'well' as const,
    lat: 31.2447,
    lng: 34.8408,
    desc: {
      en: 'UNESCO-listed archaeological mound at the confluence of Wadi ash-Shari‘ah and Wadi al-Khalil featuring a 69-meter rock-cut shaft well; traditionally linked by Levantine geographers to Ibrahim’s pastoral wells in southern Canaan.',
      fr: 'Tell archéologique classé à l’UNESCO doté d’un puits taillé dans la roche de 69 m de profondeur ; rattaché par la tradition géographique levantine aux puits d’Ibrahim au sud de Canaan.',
      ar: 'تل أثري مسجل باليونسكو يضم بئرًا محفورة في الصخر بعمق 69 مترًا عند ملتقى الأودية في النقب؛ ربطه البلديون تقليديًا بآبار إبراهيم الخليل في جنوب كنعان.',
      es: 'Tell arqueológico UNESCO con un pozo excavado en la roca de 69 m; vinculado tradicionalmente con Ibrahim.',
    },
    prophetId: 'ibrahim',
    quranRef: 'Al-Anbiya 21:71',
    sourceLevel: 'tradition' as const,
    source: {
      en: 'Tel Aviv University excavations (Y. Aharoni & Z. Herzog) & UNESCO Biblical/Archaeological Tells (2005); the specific attribution of the well to Ibrahim is traditional rather than Qur’anic.',
      fr: 'Fouilles de l’Université de Tel Aviv (Aharoni et Herzog) et classement UNESCO (2005) ; l’attribution spécifique du puits à Ibrahim est traditionnelle et non coranique.',
      ar: 'تنقيبات أثرية موثقة باليونسكو (2005) في تل بئر السبع، مع التنبيه إلى أن نسبة البئر بعينها لإبراهيم عليه السلام موروث تقليدي غير منصوص عليه في القرآن.',
      es: 'Excavaciones arqueológicas (UNESCO 2005); la atribución específica del pozo a Ibrahim es tradicional.',
    },
  },
  {
    id: 'tell_el_dabaa_avaris',
    name: {
      en: 'Tell el-Dab‘a & Qantir (Avaris / Pi-Ramesses, Eastern Nile Delta)',
      fr: 'Tell el-Dab‘a et Qantir (Avaris / Pi-Ramsès, Delta oriental)',
      ar: 'تل الضبعة وقنطير (أواريس / بر-رمسيس - شرق دلتا النيل)',
      es: 'Tell el-Dab‘a y Qantir (Avaris / Pi-Ramsés, Delta del Nilo)',
    },
    type: 'city' as const,
    lat: 30.7875,
    lng: 31.8214,
    desc: {
      en: 'Excavated capitals of the eastern Nile Delta (ancient Avaris and Ramesside Pi-Ramesses) revealing Semitic courtyard palaces, granaries, and royal administrative complexes in the land of Goshen.',
      fr: 'Capitales fouillées du delta oriental du Nil (Avaris et Pi-Ramsès) révélant des palais de style levantin, des greniers d’État et des complexes royaux.',
      ar: 'حواضر أثرية مكتشفة في شرق دلتا النيل (أواريس وبر-رمسيس) كشفت عن قصور ومخازن غلال ملكية ومستوطنات سامية قديمة في أرض جاسان.',
      es: 'Capitales excavadas en el Delta oriental del Nilo con palacios, graneros estatales y complejos reales.',
    },
    prophetId: 'yusuf',
    quranRef: 'Yusuf 12:55, 12:99',
    sourceLevel: 'archaeology' as const,
    source: {
      en: 'Austrian Archaeological Institute excavations led by Manfred Bietak (1966–present) at Tell el-Dab‘a and Edgar Pusch at Qantir.',
      fr: 'Fouilles de l’Institut archéologique autrichien dirigées par Manfred Bietak à Tell el-Dab‘a et Edgar Pusch à Qantir.',
      ar: 'تنقيبات المعهد الأثري النمساوي بقيادة مانفريد بيتاك في تل الضبعة وإدغار بوش في قنطير بمحافظة الشرقية.',
      es: 'Excavaciones del Instituto Arqueológico Austríaco dirigidas por Manfred Bietak en Tell el-Dab‘a.',
    },
  },
  {
    id: 'serabit_el_khadim_sinai',
    name: {
      en: 'Serabit el-Khadim (Proto-Sinaitic Inscriptions & Turquoise Plateau)',
      fr: 'Sérabit el-Khadim (Inscriptions proto-sinaïtiques, Sinaï)',
      ar: 'سرابيط الخادم (النقوش السينائية المبكرة في هضبة سيناء)',
      es: 'Serabit el-Jadim (inscripciones protosinaíticas, Sinaí)',
    },
    type: 'mountain' as const,
    lat: 29.0369,
    lng: 33.4592,
    desc: {
      en: 'High sandstone plateau in southwestern Sinai preserving the earliest known Proto-Sinaitic alphabetic inscriptions carved by Semitic workers along the ancient wilderness trails of Sinai.',
      fr: 'Haut plateau de grès au sud-ouest du Sinaï conservant les plus anciennes inscriptions alphabétiques proto-sinaïtiques connues le long des pistes antiques du désert.',
      ar: 'هضبة صخرية في جنوب غرب سيناء تحفظ أقدم النقوش الأبجدية السينائية المبكرة التي خطّها العمال الساميون على دروب سيناء القديمة.',
      es: 'Meseta de arenisca en el suroeste del Sinaí con las inscripciones alfabéticas protosinaíticas más antiguas.',
    },
    prophetId: 'musa',
    quranRef: 'Al-Qasas 28:29',
    sourceLevel: 'archaeology' as const,
    source: {
      en: 'W. M. Flinders Petrie expedition (Researches in Sinai, 1906) & Alan Gardiner (1916) decipherment of Proto-Sinaitic inscriptions.',
      fr: 'Expédition de W. M. Flinders Petrie (Researches in Sinai, 1906) et déchiffrement d’Alan Gardiner (1916).',
      ar: 'بعثة فلندرز بتري الأثرية (1906) ودراسات ألان غاردينر (1916) للنقوش الأبجدية السينائية المبكرة.',
      es: 'Expedición arqueológica de W. M. Flinders Petrie (1906) y estudios epigráficos de Alan Gardiner.',
    },
  },
  {
    id: 'tayma_oasis_haddaj',
    name: {
      en: 'Tayma Oasis & Bi’r Haddaj (Northwestern Arabian Caravan Hub)',
      fr: 'Oasis de Tayma et Bi’r Haddaj (Carrefour caravanier d’Arabie)',
      ar: 'واحة تيماء وبئر هداج التاريخية (شمال غرب الجزيرة)',
      es: 'Oasis de Tayma y Bi’r Hadday (noroeste de Arabia)',
    },
    type: 'well' as const,
    lat: 27.6297,
    lng: 38.5439,
    desc: {
      en: 'Monumental walled oasis northeast of Al-Hijr on the frankincense route, famous for the ancient hydraulic well of Bi’r Haddaj, Bronze Age ramparts, and Aramaic/cuneiform stelae.',
      fr: 'Grande oasis fortifiée au nord-est d’Al-Hijr sur la route de l’encens, célèbre pour le puits monumental de Bi’r Haddaj et ses stèles araméennes et cunéiformes.',
      ar: 'واحة مسوّرة عظيمة شمال شرق الحِجر على طريق البخور والقوافل، تشتهر ببئر هداج الأثرية وأسوار العصر البرونزي والمسلات الآرامية والمسمارية.',
      es: 'Gran oasis amurallado al noreste de al-Hiyr, célebre por el pozo de Bi’r Hadday y sus estelas antiguas.',
    },
    prophetId: 'salih',
    quranRef: 'Sahih al-Bukhari 2268',
    sourceLevel: 'archaeology' as const,
    source: {
      en: 'Saudi Heritage Commission & German Archaeological Institute (DAI) joint excavations at Tayma (Eichmann & Hausleiter); Tayma mentioned in Sahih al-Bukhari 2268.',
      fr: 'Fouilles conjointes de la Commission saoudienne du patrimoine et de l’Institut archéologique allemand (DAI) à Tayma ; mentionnée dans Sahih al-Bukhari 2268.',
      ar: 'تنقيبات هيئة التراث السعودية والمعهد الأثري الألماني في تيماء، وورد ذكر تيماء في صحيح البخاري (2268).',
      es: 'Excavaciones de la Comisión de Patrimonio Saudí y el Instituto Arqueológico Alemán (DAI) en Tayma.',
    },
  },
  {
    id: 'bab_edh_dhra_lisan',
    name: {
      en: 'Bab edh-Dhra‘ & Numeira (Dead Sea Lisan Peninsula Ruins)',
      fr: 'Bab edh-Dhra‘ et Numeira (Ruines de la presqu’île de Lisan)',
      ar: 'تل باب الذراع ونميرة (الأغوار الجنوبية للبحر الميت)',
      es: 'Bab edh-Dhra‘ y Numeira (ruinas de la península de Lisán, Mar Muerto)',
    },
    type: 'city' as const,
    lat: 31.2536,
    lng: 35.5342,
    desc: {
      en: 'Fortified Early Bronze Age settlements overlooking the southeastern Dead Sea basin whose destruction layers show sudden seismic collapse and intense burning along the Dead Sea Transform fault.',
      fr: 'Cités fortifiées du Bronze ancien surplombant le sud-est de la mer Morte, dont les strates montrent un effondrement sismique soudain et un embrasement le long de la faille du Jourdain.',
      ar: 'مستوطنات محصنة من العصر البرونزي المبكر تطل على الحوض الجنوبي الشرقي للبحر الميت، أظهرت طبقاتها الأثرية انهيارًا زلزاليًا مفاجئًا وحرائق هائلة على صدع الغور.',
      es: 'Asentamientos fortificados de la Edad del Bronce Temprano junto al Mar Muerto con estratos de colapso sísmico.',
    },
    prophetId: 'lut',
    quranRef: 'Hud 11:82',
    sourceLevel: 'archaeology' as const,
    source: {
      en: 'Expedition to the Dead Sea Plain excavations by Walter E. Rast & R. Thomas Schaub (1975–1983, ASOR); correlation with the cities of Lut’s plain is archaeological.',
      fr: 'Fouilles de l’Expedition to the Dead Sea Plain par W. E. Rast et R. T. Schaub (1975–1983, ASOR) ; corrélation archéologique avec les cités de la plaine.',
      ar: 'تنقيبات بعثة سهل البحر الميت الأثرية (راست وشاوب، 1975–1983)؛ وربطها بقرى قوم لوط استدلال أثري وجيولوجي.',
      es: 'Excavaciones de W. E. Rast y R. T. Schaub (1975–1983) en la llanura suroriental del Mar Muerto.',
    },
  },
  {
    id: 'marib_dam_saba',
    name: {
      en: 'Great Dam of Ma’rib & Gardens of Saba’ (Ancient Yemen)',
      fr: 'Grand Barrage de Ma’rib et Jardins de Saba’ (Yémen antique)',
      ar: 'سد مأرب العظيم وجنتا سبأ (اليمن القديم)',
      es: 'Gran Presa de Ma’rib y Jardines de Saba’ (Yemen antiguo)',
    },
    type: 'city' as const,
    lat: 15.4017,
    lng: 45.2669,
    desc: {
      en: 'Capital of the Kingdom of Saba’ (Sheba) explicitly commemorated in Surah Saba’ for its two irrigated garden expanses on the right and left, and the catastrophic breach of the Arim dam (Sayl al-‘Arim).',
      fr: 'Capitale du royaume de Saba’ explicitement citée dans la sourate Saba’ pour ses deux jardins irrigués à droite et à gauche et la rupture du barrage d’al-‘Arim (Sayl al-‘Arim).',
      ar: 'حاضرة مملكة سبأ المنصوص عليها في سورة سبأ بآية «جنتين عن يمين وشمال»، والتي شهدت «سيل العرم» وتفرّق القبائل بعد انهيار السد التاريخي.',
      es: 'Capital del reino de Saba’ mencionada en la sura Saba’ por sus dos jardines irrigados y la inundación del dique (Sayl al-‘Arim).',
    },
    prophetId: 'sulayman',
    quranRef: 'Saba 34:15-16',
    sourceLevel: 'quran' as const,
    source: {
      en: 'Qur’an 27:22–44 (An-Naml) & 34:15–17 (Saba’); corroborated by Sabaean Musnad stone inscriptions on the 8th-century BCE North and South Sluices of Ma’rib (UNESCO World Heritage, 2023).',
      fr: 'Coran 27:22–44 (An-Naml) et 34:15–17 (Saba’) ; confirmé par les inscriptions sabéennes en écriture musnad sur les vannes antiques de Ma’rib (UNESCO, 2023).',
      ar: 'القرآن الكريم (النمل 22–44، سبأ 15–17)؛ وتؤيده نقوش المسند السبئية المنحوتة على مصارف سد مأرب القديم (تراث عالمي باليونسكو 2023).',
      es: 'Corán 27:22–44 y 34:15–17; corroborado por inscripciones sabeas en las esclusas de Ma’rib (UNESCO 2023).',
    },
  },
  {
    id: 'tell_balata_yaqub_well',
    name: {
      en: 'Tell Balata & Bi’r Ya‘qub (Ancient Shechem / Nablus)',
      fr: 'Tell Balata et Bi’r Ya‘qub (Sichem antique / Naplouse)',
      ar: 'تل بلاطة وبئر يعقوب (شكيم القديمة - نابلس)',
      es: 'Tell Balata y Bi’r Ya‘qub (antigua Siquem / Nablus)',
    },
    type: 'well' as const,
    lat: 32.2136,
    lng: 35.285,
    desc: {
      en: 'Middle Bronze Age fortified city in the central valley between Mount Ebal and Mount Gerizim, adjacent to the deep limestone well traditionally associated with Ya‘qub and his sons in central Canaan.',
      fr: 'Cité fortifiée du Bronze moyen dans la vallée entre les monts Ébal et Garizim, près du puits profond rattaché par la tradition locale à Ya‘qoub et ses fils.',
      ar: 'مدينة كنعانية محصنة من العصر البرونزي الأوسط بين جبلي عيبال وجرزيم بنابلس، بجوار البئر العميقة المنسوبة في الموروث المحلي ليعقوب وبنيه.',
      es: 'Ciudad fortificada de la Edad del Bronce Medio en Nablus junto al pozo atribuido tradicionalmente a Ya‘qub.',
    },
    prophetId: 'yaqub',
    quranRef: 'Yusuf 12:8-18',
    sourceLevel: 'tradition' as const,
    source: {
      en: 'Ernst Sellin & G. Ernest Wright excavations at Tell Balata (1913–1968); the attribution of the adjacent well to Ya‘qub comes from Levantine and Biblical tradition, not explicit Qur’anic text.',
      fr: 'Fouilles d’Ernst Sellin et G. Ernest Wright à Tell Balata (1913–1968) ; l’attribution du puits voisin à Ya‘qoub provient de la tradition levantine et non d’un texte coranique.',
      ar: 'تنقيبات إرنست سيلين وإرنست رايت في تل بلاطة (1913–1968)؛ ونسبة البئر المجاورة إلى يعقوب عليه السلام مستمدة من الموروث المحلي والتاريخي ولا نص فيها.',
      es: 'Excavaciones de E. Sellin y G. E. Wright en Tell Balata; la atribución del pozo a Ya‘qub es tradicional.',
    },
  },
  {
    id: 'hudaybiyyah_shumaysi',
    name: {
      en: 'Al-Hudaybiyyah / Ash-Shumaysi (Site of the Pledge of Ridwan)',
      fr: 'Al-Houdaybiyyah / Ash-Shoumaysi (Lieu du Serment d’Agrément)',
      ar: 'الحديبية / الشميسي (موضع صلح الحديبية وبيعة الرضوان)',
      es: 'Al-Hudaybiyyah / ash-Shumaysi (lugar del Pacto de Ridwan)',
    },
    type: 'sanctuary' as const,
    lat: 21.4414,
    lng: 39.6083,
    desc: {
      en: 'Historic boundary station of the Haram west of Makkah where over 1,400 Companions pledged allegiance to the Prophet ﷺ beneath the tree (Bay‘at ar-Ridwan) in 6 AH, celebrated in Surah Al-Fath as a "Manifest Victory".',
      fr: 'Station historique à la limite ouest du Haram de La Mecque où plus de 1 400 compagnons prêtèrent serment sous l’arbre (Bay‘at ar-Ridwan) en 6 H, qualifié dans la sourate Al-Fath de « Victoire éclatante ».',
      ar: 'الميقات والحد الغربي للحرم المكي حيث بايع أكثر من 1400 صحابي النبي ﷺ تحت الشجرة (بيعة الرضوان) وعُقد صلح الحديبية سنة 6 هـ، وسماه الله في سورة الفتح «فتحًا مبينًا».',
      es: 'Límite occidental del Haram de La Meca donde más de 1.400 compañeros prestaron el juramento bajo el árbol en 6 H (Corán 48:18).',
    },
    prophetId: 'muhammad',
    quranRef: 'Al-Fath 48:18',
    sourceLevel: 'quran' as const,
    source: {
      en: 'Qur’an 48:1, 48:18 ("Allah was pleased with the believers when they pledged allegiance to you under the tree") & Sahih al-Bukhari 2731–2732, 4150.',
      fr: 'Coran 48:1, 48:18 (« Allah a très certainement agréé les croyants quand ils t’ont prêté serment sous l’arbre ») et Sahih al-Bukhari 2731–2732.',
      ar: 'القرآن الكريم (الفتح 1، 18: ﴿لَّقَدْ رَضِيَ اللَّهُ عَنِ الْمُؤْمِنِينَ إِذْ يُبَايِعُونَكَ تَحْتَ الشَّجَرَةِ﴾) وصحيح البخاري (2731–2732، 4150).',
      es: 'Corán 48:1, 48:18 y Sahih al-Bujari 2731–2732.',
    },
  },
  {
    id: 'al_rabadhah_zubaydah',
    name: {
      en: 'Al-Rabadhah Archaeological Site (Darb Zubaydah Pilgrim Station)',
      fr: 'Site archéologique d’Al-Rabadhah (Station de Darb Zubaydah)',
      ar: 'موقع الربذة الأثري (جادة درب زبيدة ومرقد أبي ذر الغفاري)',
      es: 'Sitio arqueológico de al-Rabadhah (ruta de peregrinación Darb Zubaydah)',
    },
    type: 'city' as const,
    lat: 24.6333,
    lng: 41.2903,
    desc: {
      en: 'Excavated early Islamic settlement 200 km east of Madinah along the Kufa–Makkah pilgrimage highway, preserving Rashidun/Umayyad mosques, water reservoirs, and the residence of the ascetic companion Abu Dharr al-Ghifari (d. 32 AH).',
      fr: 'Ville islamique ancienne fouillée à 200 km à l’est de Médine sur la route de pèlerinage Koufa–La Mecque, conservant mosquées, citernes et demeure du compagnon Abou Dharr al-Ghifari (m. 32 H).',
      ar: 'حاضرة إسلامية مبكرة منقّبة على بعد 200 كم شرق المدينة المنورة على طريق الحج الكوفي، تضم مساجد وبرك مياه أثرية ومقام سكنى الصحابي الجليل أبي ذر الغفاري (ت 32 هـ).',
      es: 'Asentamiento islámico temprano excavado a 200 km al este de Medina con mezquitas, cisternas y residencia de Abu Dharr al-Ghifari.',
    },
    prophetId: 'muhammad',
    quranRef: 'Sahih al-Bukhari 1406',
    sourceLevel: 'archaeology' as const,
    source: {
      en: 'King Saud University excavations directed by Prof. Saad ibn Abdulaziz al-Rashid (Al-Rabadhah: A Portrait of Early Islamic Civilisation in Saudi Arabia, 1986) & Sahih al-Bukhari 1406.',
      fr: 'Fouilles de l’Université du Roi Saoud dirigées par le Pr Saad al-Rashid (Al-Rabadhah, 1986) et Sahih al-Bukhari 1406.',
      ar: 'حفريات جامعة الملك سعود بإشراف أ. د. سعد بن عبد العزيز الراشد (الربذة: صورة للحضارة الإسلامية المبكرة، 1986) وصحيح البخاري (1406).',
      es: 'Excavaciones de la Universidad Rey Saud dirigidas por el Prof. Saad al-Rashid (1986) y Sahih al-Bujari 1406.',
    },
  },
]

/** Classifies and returns trilingual scholarly source attribution for any route waypoint or sacred site. */
export function resolveWaypointSource(item: {
  id?: string
  name: { en: string; fr: string; ar: string; es?: string }
  quranRef?: string
  sourceLevel?: SiteSourceLevel
  source?: SiteSourceText
}): SiteSourceMetadata {
  if (item.sourceLevel && item.source) {
    return { sourceLevel: item.sourceLevel, source: item.source }
  }
  if (item.id && SITE_SOURCE_META[item.id]) {
    return SITE_SOURCE_META[item.id]!
  }
  const ref = (item.quranRef ?? '').trim()
  const nameEn = item.name.en.toLowerCase()

  // Traditional geographic pins even when paired with a Qur'anic narrative verse
  const isTraditionalPin =
    nameEn.includes('ur of the chaldees') ||
    nameEn.includes('babylon') ||
    nameEn.includes('haran') ||
    nameEn.includes('hebron') ||
    nameEn.includes('mount judi') ||
    nameEn.includes('cross') ||
    nameEn.includes('sinai') ||
    nameEn.includes('midian') ||
    nameEn.includes('dothan') ||
    nameEn.includes('canaan') ||
    ref.includes('Qisas') ||
    ref.includes('Isra’iliyyat')

  if (isTraditionalPin) {
    return {
      sourceLevel: 'tradition',
      source: {
        en: ref
          ? `Event cited in ${ref}; the exact waypoint coordinate reflects classical geographical and archaeological tradition rather than a coordinate fixed in revelation.`
          : 'Waypoint coordinate derived from classical geographical tradition; not fixed as certain by prophetic text.',
        fr: ref
          ? `Événement cité dans ${ref} ; la coordonnée géographique précise repose sur la tradition historique et archéologique et non sur un texte révélé.`
          : 'Coordonnée issue de la tradition géographique classique ; non présentée comme certaine.',
        ar: ref
          ? `الحدث مذكور في (${ref})، أما تعيين الإحداثيات الجغرافية الدقيقة لهذه المحطة فيستند إلى الموروث الجغرافي والتاريخي ولا يُجزم به نصًا.`
          : 'إحداثيات مستمدة من الموروث الجغرافي والتاريخي القديم ولا يُجزم بتعيينها.',
        es: ref
          ? `Evento citado en ${ref}; la coordenada exacta proviene de la tradición geográfica e histórica.`
          : 'Coordenada derivada de la tradición geográfica clásica.',
      },
    }
  }

  // Authentic Hadith & Prophetic Sira references
  if (
    /Bukhari|Muslim|Tirmidhi|Ahmad|Dawud|Majah|Nasa|Muwatta|Rahiq|Hisham|Sira/i.test(ref)
  ) {
    return {
      sourceLevel: 'hadith',
      source: {
        en: `Documented in ${ref} and preserved in the biographical geography of the Prophetic Sira.`,
        fr: `Attesté dans ${ref} et conservé dans la géographie historique de la Sîra prophétique.`,
        ar: `موثق في (${ref}) ومحفوظ في المعالم الجغرافية الثابتة للسيرة النبوية الشريفة.`,
        es: `Documentado en ${ref} y preservado en la geografía histórica de la Sira.`,
      },
    }
  }

  // Direct Qur'anic verses with preserved sanctuary / Hijaz / Jerusalem / Ma'rib / Badr geography
  if (/\d+:\d+/.test(ref)) {
    return {
      sourceLevel: 'quran',
      source: {
        en: `Stated in the Noble Qur’an (${ref}) with historically continuous geographical attestation.`,
        fr: `Mentionné dans le Noble Coran (${ref}) avec une attestation géographique historiquement continue.`,
        ar: `منصوص عليه في القرآن الكريم (${ref}) في موضع متواتر المعالم تاريخيًا وجغرافيًا.`,
        es: `Mencionado en el Noble Corán (${ref}) con atestación geográfica histórica continua.`,
      },
    }
  }

  // Historical chronicles & archaeological landmarks (Fustat, Damascus, Córdoba, Samarkand, etc.)
  return {
    sourceLevel: 'archaeology',
    source: {
      en: ref
        ? `Documented in classical historical chronicles (${ref}) and corroborated by standing architectural or archaeological remains.`
        : 'Corroborated by historical chronicles and regional archaeological surveys.',
      fr: ref
        ? `Documenté dans les chroniques historiques (${ref}) et attesté par les vestiges architecturaux et archéologiques.`
        : 'Attesté par les chroniques historiques et les relevés archéologiques.',
      ar: ref
        ? `موثق في المصادر التاريخية (${ref}) وشواهده العمرانية والأثرية قائمة ومعروفة.`
        : 'موثق في المصادر التاريخية والمسوحات الأثرية المعتمدة.',
      es: ref
        ? `Documentado en crónicas históricas (${ref}) y corroborado por restos arquitectónicos y arqueológicos.`
        : 'Corroborado por crónicas históricas y estudios arqueológicos.',
    },
  }
}
