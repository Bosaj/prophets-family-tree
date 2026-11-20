// How to make du‘a and when it is answered (v2.14.0). Each point quotes the hadith it rests on, copied from the
// source and checked by `npm run verify:duas`. The day of ‘Arafah is on the Hijri page (Tirmidhi 3585).
import type { L4, Level, Ref } from './types'
import type { Supplication } from './duas'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })
const SAHIH_ALBANI = t('Sahih (al-Albani)', 'Sahih (al-Albani)', 'صحيح (الألباني)', 'Sahih (al-Albani)')
const HASAN_ALBANI = t('Hasan (al-Albani)', 'Hasan (al-Albani)', 'حسن (الألباني)', 'Hasan (al-Albani)')
const HASAN_SPLIT = t('Hasan (al-Albani); some graded its chain weak', 'Hasan (al-Albani) ; certains ont jugé sa chaîne faible', 'حسّنه الألباني، وضعّف بعضهم إسناده', 'Hasan (al-Albani); algunos juzgaron débil su cadena')

export interface AdabPoint {
  id: string
  title: L4
  text: L4
  l: Level
  r: Ref[]
  quotes: Supplication[]
}

export const DUA_ADAB: AdabPoint[] = [
  {
    id: "praise",
    title: t("Begin with praise and blessings", "Commencer par la louange et la prière sur le Prophète", "ابدأ بحمد الله والصلاة على النبي ﷺ", "Empieza con la alabanza y la bendición"),
    text: t("He heard a man ask in his prayer without praising Allah or sending blessings, and said he had been hasty; then he taught the order: praise Allah, send blessings on the Prophet ﷺ, then ask.", "Il entendit un homme invoquer dans sa prière sans louer Allah ni prier sur lui, et dit qu’il s’était hâté ; puis il enseigna l’ordre : louer Allah, prier sur le Prophète ﷺ, puis demander.", "سمع رجلًا يدعو في صلاته لم يحمد الله ولم يصلّ على النبي ﷺ فقال: عجل هذا، ثم علّم الترتيب: الحمد ثم الصلاة ثم السؤال.", "Oyó a un hombre pedir en su oración sin alabar a Allah ni bendecir al Profeta, y dijo que se había apresurado; luego enseñó el orden: alabar a Allah, bendecir al Profeta ﷺ y después pedir."),
    l: 'hadith',
    r: ["tirmidhi:3477"],
    quotes: [
      {
        id: "adab-salawat",
        ar: "إِذَا صَلَّى أَحَدُكُمْ فَلْيَبْدَأْ بِتَحْمِيدِ اللَّهِ وَالثَّنَاءِ عَلَيْهِ ثُمَّ لِيُصَلِّ عَلَى النَّبِيِّ صلى الله عليه وسلم ثُمَّ لِيَدْعُ بَعْدُ بِمَا شَاءَ",
        meaning: t("When one of you prays, let him begin by praising Allah and extolling Him, then send blessings on the Prophet ﷺ, then ask for whatever he wishes.", "Quand l’un de vous invoque, qu’il commence par louer Allah et Le glorifier, puis qu’il prie sur le Prophète ﷺ, puis qu’il demande ce qu’il veut.", "الحمد والثناء ثم الصلاة على النبي ﷺ ثم الدعاء.", "Cuando uno de vosotros suplique, que empiece alabando y ensalzando a Allah, luego bendiga al Profeta ﷺ y después pida lo que quiera."),
        r: ["tirmidhi:3477"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
    ],
  },
  {
    id: "hands",
    title: t("Raise your hands", "Lever les mains", "ارفع يديك", "Levanta las manos"),
    text: t("Raising the hands in du‘a is from the Sunnah; Allah is too generous to send them back empty.", "Lever les mains dans l’invocation fait partie de la Sunna ; Allah est trop généreux pour les renvoyer vides.", "رفع اليدين في الدعاء من السنة.", "Levantar las manos en la súplica es Sunna; Allah es demasiado generoso para devolverlas vacías."),
    l: 'hadith',
    r: ["abudawud:1488"],
    quotes: [
      {
        id: "adab-hands",
        ar: "إِنَّ رَبَّكُمْ تَبَارَكَ وَتَعَالَى حَيِيٌّ كَرِيمٌ يَسْتَحْيِي مِنْ عَبْدِهِ إِذَا رَفَعَ يَدَيْهِ إِلَيْهِ أَنْ يَرُدَّهُمَا صِفْرًا",
        meaning: t("Your Lord, blessed and exalted, is shy and generous: He is shy, when His servant raises his hands to Him, to return them empty.", "Votre Seigneur, béni et exalté, est pudique et généreux : Il a honte, quand Son serviteur lève les mains vers Lui, de les lui rendre vides.", "إن الله حيي كريم يستحيي أن يرد يدي عبده صفرًا.", "Vuestro Señor, bendito y exaltado, es pudoroso y generoso: Le da pudor, cuando Su siervo alza las manos hacia Él, devolvérselas vacías."),
        r: ["abudawud:1488"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
    ],
  },
  {
    id: "certain",
    title: t("Be certain, with a present heart", "Avec certitude et un cœur présent", "ادعُ موقنًا حاضر القلب", "Con certeza y el corazón presente"),
    text: t("Ask expecting to be answered, and mean what you say.", "Demande en attendant d’être exaucé, et pense ce que tu dis.", "ادعُ وأنت موقن بالإجابة، حاضر القلب.", "Pide esperando ser respondido, y piensa lo que dices."),
    l: 'hadith',
    r: ["tirmidhi:3479"],
    quotes: [
      {
        id: "adab-yaqin",
        ar: "ادْعُوا اللَّهَ وَأَنْتُمْ مُوقِنُونَ بِالإِجَابَةِ وَاعْلَمُوا أَنَّ اللَّهَ لاَ يَسْتَجِيبُ دُعَاءً مِنْ قَلْبٍ غَافِلٍ لاَهٍ",
        meaning: t("Call on Allah while certain of being answered, and know that Allah does not answer a prayer from a heedless, distracted heart.", "Invoquez Allah avec la certitude d’être exaucés, et sachez qu’Allah n’exauce pas l’invocation d’un cœur distrait et insouciant.", "اليقين بالإجابة وحضور القلب.", "Invocad a Allah con la certeza de ser respondidos, y sabed que Allah no responde la súplica de un corazón distraído e indiferente."),
        r: ["tirmidhi:3479"],
        l: 'hadith',
        grade: HASAN_SPLIT,
      },
    ],
  },
  {
    id: "firm",
    title: t("Ask firmly", "Demander avec résolution", "اعزم المسألة", "Pide con firmeza"),
    text: t("Do not say “if You will”: ask decisively, for no one can compel Him.", "Ne dis pas « si Tu veux » : demande avec résolution, car nul ne peut Le contraindre.", "لا تقل: إن شئت، بل اعزم.", "No digas «si quieres»: pide con decisión, porque nadie puede obligarle."),
    l: 'hadith',
    r: ["bukhari:6339"],
    quotes: [
      {
        id: "adab-azm",
        ar: "لاَ يَقُولَنَّ أَحَدُكُمُ اللَّهُمَّ اغْفِرْ لِي، اللَّهُمَّ ارْحَمْنِي، إِنْ شِئْتَ. لِيَعْزِمِ الْمَسْأَلَةَ، فَإِنَّهُ لاَ مُكْرِهَ لَهُ",
        meaning: t("None of you should say: O Allah, forgive me if You will; O Allah, have mercy on me if You will. Let him be firm in his asking, for no one can compel Him.", "Que nul d’entre vous ne dise : Ô Allah, pardonne-moi si Tu veux ; Ô Allah, fais-moi miséricorde si Tu veux. Qu’il soit résolu dans sa demande, car nul ne peut Le contraindre.", "النهي عن تعليق الدعاء بالمشيئة.", "Que ninguno de vosotros diga: Oh Allah, perdóname si quieres; oh Allah, ten misericordia de mí si quieres. Que pida con firmeza, porque nadie puede obligarle."),
        r: ["bukhari:6339"],
        l: 'hadith',
      },
    ],
  },
  {
    id: "patient",
    title: t("Do not give up", "Ne pas abandonner", "لا تستعجل", "No te rindas"),
    text: t("An answer may be given, delayed, or exchanged for something better; the du‘a is lost only when one stops.", "La réponse peut être donnée, retardée ou remplacée par mieux ; l’invocation n’est perdue que lorsqu’on s’arrête.", "لا يزال يستجاب للعبد ما لم يستعجل فيترك الدعاء.", "La respuesta puede llegar, retrasarse o cambiarse por algo mejor; la súplica solo se pierde cuando uno deja de pedir."),
    l: 'hadith',
    r: ["bukhari:6340"],
    quotes: [
      {
        id: "adab-ajal",
        ar: "يُسْتَجَابُ لأَحَدِكُمْ مَا لَمْ يَعْجَلْ يَقُولُ دَعَوْتُ فَلَمْ يُسْتَجَبْ لِي",
        meaning: t("One of you is answered as long as he is not hasty, saying: I prayed and was not answered.", "L’un de vous est exaucé tant qu’il ne s’impatiente pas en disant : j’ai invoqué et je n’ai pas été exaucé.", "الاستعجال وترك الدعاء.", "A uno de vosotros se le responde mientras no se impaciente diciendo: supliqué y no se me respondió."),
        r: ["bukhari:6340"],
        l: 'hadith',
      },
    ],
  },
  {
    id: "absent",
    title: t("Pray for others when they are absent", "Prier pour les autres en leur absence", "ادعُ لأخيك بظهر الغيب", "Pide por otros en su ausencia"),
    text: t("When you pray for your brother or sister in their absence, the angels say “Amin, and the same for you.”", "Quand tu invoques pour ton frère ou ta sœur en leur absence, les anges disent « Amin, et à toi de même ».", "دعاء المسلم لأخيه بظهر الغيب مستجاب.", "Cuando pides por tu hermano o hermana en su ausencia, los ángeles dicen «Amín, y lo mismo para ti»."),
    l: 'hadith',
    r: ["abudawud:1534"],
    quotes: [
      {
        id: "adab-ghayb",
        ar: "إِذَا دَعَا الرَّجُلُ لأَخِيهِ بِظَهْرِ الْغَيْبِ قَالَتِ الْمَلاَئِكَةُ آمِينَ وَلَكَ بِمِثْلٍ",
        meaning: t("When a man prays for his brother in his absence, the angels say: Amin, and the same for you.", "Quand un homme invoque pour son frère en son absence, les anges disent : Amin, et à toi de même.", "تؤمّن الملائكة وتقول: ولك بمثل.", "Cuando un hombre pide por su hermano en su ausencia, los ángeles dicen: Amín, y lo mismo para ti."),
        r: ["abudawud:1534"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
    ],
  },
]

export const DUA_TIMES: AdabPoint[] = [
  {
    id: "night",
    title: t("The last third of the night", "Le dernier tiers de la nuit", "ثلث الليل الآخر", "El último tercio de la noche"),
    text: t("The best time of the night to ask.", "Le meilleur moment de la nuit pour demander.", "أرجى أوقات الليل.", "El mejor momento de la noche para pedir."),
    l: 'hadith',
    r: ["bukhari:1145"],
    quotes: [
      {
        id: "time-night",
        ar: "يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الآخِرُ يَقُولُ مَنْ يَدْعُونِي فَأَسْتَجِيبَ لَهُ مَنْ يَسْأَلُنِي فَأُعْطِيَهُ مَنْ يَسْتَغْفِرُنِي فَأَغْفِرَ لَهُ",
        meaning: t("Our Lord descends every night to the lowest heaven when the last third of the night remains, and says: Who calls on Me, that I may answer him? Who asks of Me, that I may give him? Who seeks My forgiveness, that I may forgive him?", "Notre Seigneur descend chaque nuit au ciel le plus proche quand il reste le dernier tiers de la nuit, et dit : Qui M’invoque, que Je l’exauce ? Qui Me demande, que Je lui donne ? Qui Me demande pardon, que Je lui pardonne ?", "النزول الإلهي في ثلث الليل الآخر.", "Nuestro Señor desciende cada noche al cielo más cercano cuando queda el último tercio de la noche, y dice: ¿Quién Me invoca para que le responda? ¿Quién Me pide para que le dé? ¿Quién Me pide perdón para que le perdone?"),
        r: ["bukhari:1145"],
        l: 'hadith',
      },
    ],
  },
  {
    id: "adhan",
    title: t("Between the adhan and the iqamah", "Entre l’adhan et l’iqama", "بين الأذان والإقامة", "Entre el adán y la iqama"),
    text: t("The minutes before the prayer begins.", "Les minutes avant que la prière ne commence.", "الدقائق التي تسبق إقامة الصلاة.", "Los minutos antes de que empiece la oración."),
    l: 'hadith',
    r: ["abudawud:521"],
    quotes: [
      {
        id: "time-adhan",
        ar: "لاَ يُرَدُّ الدُّعَاءُ بَيْنَ الأَذَانِ وَالإِقَامَةِ",
        meaning: t("A du‘a made between the adhan and the iqamah is not turned back.", "L’invocation entre l’adhan et l’iqama n’est pas rejetée.", "الدعاء بين الأذان والإقامة لا يُرد.", "La súplica entre el adán y la iqama no es rechazada."),
        r: ["abudawud:521"],
        l: 'hadith',
        grade: SAHIH_ALBANI,
      },
    ],
  },
  {
    id: "sujud",
    title: t("In prostration", "En prosternation", "في السجود", "En la postración"),
    text: t("The servant is closest to his Lord with his forehead on the ground.", "Le serviteur est au plus près de son Seigneur le front au sol.", "أقرب ما يكون العبد من ربه وهو ساجد.", "El siervo está más cerca de su Señor con la frente en el suelo."),
    l: 'hadith',
    r: ["muslim:482"],
    quotes: [
      {
        id: "time-sujud",
        ar: "أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ فَأَكْثِرُوا الدُّعَاءَ",
        meaning: t("The servant is closest to his Lord when he is prostrating, so make much du‘a.", "Le serviteur est au plus près de son Seigneur quand il est prosterné ; multipliez donc les invocations.", "فأكثروا الدعاء في السجود.", "El siervo está más cerca de su Señor cuando se postra, así que suplicad mucho."),
        r: ["muslim:482"],
        l: 'hadith',
      },
    ],
  },
  {
    id: "friday",
    title: t("The hour on Friday", "L’heure du vendredi", "ساعة الجمعة", "La hora del viernes"),
    text: t("A short hour on Friday in which du‘a is answered; scholars differ on when it is, and many hold it is the last hour before sunset.", "Une courte heure du vendredi où l’invocation est exaucée ; les savants divergent sur son moment, et beaucoup la situent dans la dernière heure avant le coucher du soleil.", "ساعة يسيرة يوم الجمعة، اختُلف في تعيينها، وكثير من العلماء على أنها آخر ساعة بعد العصر.", "Una breve hora del viernes en la que se responde la súplica; los sabios discrepan sobre cuándo es, y muchos la sitúan en la última hora antes del ocaso."),
    l: 'hadith',
    r: ["bukhari:935"],
    quotes: [
      {
        id: "time-friday",
        ar: "فِيهِ سَاعَةٌ لاَ يُوَافِقُهَا عَبْدٌ مُسْلِمٌ، وَهْوَ قَائِمٌ يُصَلِّي، يَسْأَلُ اللَّهَ تَعَالَى شَيْئًا إِلاَّ أَعْطَاهُ إِيَّاهُ",
        meaning: t("In it there is an hour in which no Muslim servant stands in prayer asking Allah for something without Allah giving it to him.", "Il y a en lui une heure où aucun serviteur musulman, debout en prière, ne demande quelque chose à Allah sans qu’Allah le lui accorde.", "وأشار بيده يقلّلها.", "En él hay una hora en la que ningún siervo musulmán, de pie en oración, pide algo a Allah sin que Allah se lo conceda."),
        r: ["bukhari:935"],
        l: 'hadith',
      },
    ],
  },
  {
    id: "three",
    title: t("A parent, a traveller and the wronged", "Un parent, un voyageur et l’opprimé", "الوالد والمسافر والمظلوم", "Un padre, un viajero y el oprimido"),
    text: t("Three prayers he said are answered without doubt.", "Trois invocations dont il dit qu’elles sont exaucées sans aucun doute.", "ثلاث دعوات مستجابات لا شك فيهن.", "Tres súplicas que dijo que se responden sin duda."),
    l: 'hadith',
    r: ["abudawud:1536"],
    quotes: [
      {
        id: "time-three",
        ar: "ثَلاَثُ دَعَوَاتٍ مُسْتَجَابَاتٌ لاَ شَكَّ فِيهِنَّ دَعْوَةُ الْوَالِدِ وَدَعْوَةُ الْمُسَافِرِ وَدَعْوَةُ الْمَظْلُومِ",
        meaning: t("Three prayers are answered, there is no doubt about them: the prayer of a parent, the prayer of a traveller and the prayer of one who is wronged.", "Trois invocations sont exaucées, sans aucun doute : celle du parent, celle du voyageur et celle de l’opprimé.", "دعوة الوالد والمسافر والمظلوم.", "Tres súplicas son respondidas sin duda: la del padre, la del viajero y la del oprimido."),
        r: ["abudawud:1536"],
        l: 'hadith',
        grade: HASAN_ALBANI,
      },
    ],
  },
]

export const DUA_ADAB_QUOTES: (Supplication & { where: string })[] = [...DUA_ADAB, ...DUA_TIMES].flatMap((p) => p.quotes.map((d) => ({ where: `duas/adab/${p.id}`, ...d })))
