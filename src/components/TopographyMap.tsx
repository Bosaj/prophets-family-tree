import { useEffect, useRef, useState, useMemo } from 'react'
import {
  Compass,
  ExternalLink,
  MapPin,
  Mountain,
  Navigation,
  RotateCcw,
  Search,
  Sparkles,
  X,
  Droplets,
  Landmark,
  Castle,
  Waypoints,
  Maximize2,
  Footprints,
} from 'lucide-react'
import type L from 'leaflet'
import { useI18n } from '../i18n'
import { byId, prophets } from '../data/people'
import type { Person } from '../data/types'
import { hrefOf } from '../lib/router'
import { A, FactText, Scene } from './ui'

type MapStyle = 'satellite' | 'dark' | 'terrain'
type SiteCategory = 'all' | 'sanctuary' | 'mountain' | 'well' | 'city'

export interface SacredSitePin {
  id: string
  name: { en: string; fr: string; ar: string }
  type: 'mountain' | 'sanctuary' | 'well' | 'city'
  lat: number
  lng: number
  desc: { en: string; fr: string; ar: string }
  prophetId?: string
  quranRef?: string
}

export interface RouteWaypoint {
  name: { en: string; fr: string; ar: string }
  lat: number
  lng: number
  desc: { en: string; fr: string; ar: string }
  quranRef?: string
}

export interface PropheticRoute {
  id: string
  name: { en: string; fr: string; ar: string }
  color: string
  prophetId: string
  period: { en: string; fr: string; ar: string }
  desc: { en: string; fr: string; ar: string }
  coords: [number, number][]
  stops: RouteWaypoint[]
}

export const SACRED_SITES: SacredSitePin[] = [
  {
    id: 'kaaba',
    name: { en: 'Al-Ka‘bah & The Sacred Sanctuary', fr: 'La Ka‘bah et le Sanctuaire Sacré', ar: 'الكعبة المشرفة والمسجد الحرام' },
    type: 'sanctuary',
    lat: 21.4225,
    lng: 39.8262,
    desc: { en: 'The first sanctuary appointed for mankind; its foundations were raised by Ibrahim and Ismail (Qur’an 2:127, 3:96).', fr: 'Premier sanctuaire édifié pour l’humanité, élevé par Ibrahim et Ismail (Coran 2:127, 3:96).', ar: 'أول بيت وُضع للناس في بكة مباركًا وهدى للعالمين، رفع قواعده إبراهيم وإسماعيل عليهما السلام.' },
    prophetId: 'ibrahim',
    quranRef: 'Al-Baqarah 2:127',
  },
  {
    id: 'madinah_rawdah',
    name: { en: 'The Prophet’s Mosque & Rawdah', fr: 'La Mosquée du Prophète et la Rawdah', ar: 'المسجد النبوي الشريف والروضة' },
    type: 'sanctuary',
    lat: 24.4686,
    lng: 39.6108,
    desc: { en: 'Sanctuary of Prophet Muhammad ﷺ in Madinah, containing the noble Rawdah: "Between my house and my pulpit is a garden from Paradise".', fr: 'Le sanctuaire du Prophète Muhammad ﷺ à Médine, abritant la noble Rawdah.', ar: 'مسجد رسول الله ﷺ ومرقده الشريف، وفيه الروضة الشريفة: «ما بين بيتي ومنبري روضة من رياض الجنة».' },
    prophetId: 'muhammad',
    quranRef: 'Sahih al-Bukhari 1195',
  },
  {
    id: 'aqsa',
    name: { en: 'Al-Masjid al-Aqsa (Jerusalem)', fr: 'Al-Masjid al-Aqsa (Jérusalem)', ar: 'المسجد الأقصى المبارك (القدس)' },
    type: 'sanctuary',
    lat: 31.7761,
    lng: 35.2358,
    desc: { en: 'The second mosque placed on earth, sanctuary of the Prophets of Israel, and destination of the Night Journey (Al-Isra).', fr: 'Deuxième mosquée sur terre, destination du Voyage nocturne (Isra) et sanctuaire des Prophètes.', ar: 'ثاني مسجد وُضع في الأرض، وقبلة الأنبياء الأولى، ومسرى النبي ﷺ في ليلة الإسراء والمعراج.' },
    prophetId: 'isa',
    quranRef: 'Al-Isra 17:1',
  },
  {
    id: 'sinai',
    name: { en: 'Mount Sinai (Jabal Musa / At-Tur)', fr: 'Mont Sinaï (Jabal Moussa / At-Tour)', ar: 'طور سيناء (جبل موسى)' },
    type: 'mountain',
    lat: 28.5394,
    lng: 33.9753,
    desc: { en: 'Sacred peak where Allah spoke directly to Musa without intermediary, sanctified by divine oath (Qur’an 95:2).', fr: 'Sommet sacré où Allah s’adressa directement à Moïse sans intermédiaire, sanctifié par serment divin (Coran 95:2).', ar: 'الجبل الأشم الذي كلّم الله عنده موسى تكليمًا، وأقسم به في محكم التنزيل ﴿وَطُورِ سِينِينَ﴾.' },
    prophetId: 'musa',
    quranRef: 'At-Tin 95:2',
  },
  {
    id: 'tuwa',
    name: { en: 'The Sacred Valley of Tuwa', fr: 'La Vallée Sacrée de Touwa', ar: 'الوادي المقدس طُوى' },
    type: 'sanctuary',
    lat: 28.5560,
    lng: 33.9740,
    desc: { en: 'The holy valley at the foot of Mount Sinai where Musa was commanded: "Take off your sandals, indeed you are in the sacred valley of Tuwa" (Qur’an 20:12).', fr: 'La vallée bénie au pied du Sinaï où Musa reçut l’ordre de retirer ses sandales (Coran 20:12).', ar: 'الوادي المبارك أسفل جبل الطور حيث نودي موسى: ﴿فَاخْلَعْ نَعْلَيْكَ إِنَّكَ بِالْوَادِ الْمُقَدَّسِ طُوًى﴾.' },
    prophetId: 'musa',
    quranRef: 'Taha 20:12',
  },
  {
    id: 'judy',
    name: { en: 'Mount Judy (Jabal Judi)', fr: 'Mont Djoudi', ar: 'جبل الجودي' },
    type: 'mountain',
    lat: 37.3800,
    lng: 42.4500,
    desc: { en: 'The mountain in southeastern Anatolia overlooking the Tigris where Nuh’s Ark rested after the Great Deluge (Qur’an 11:44).', fr: 'Montagne où s’est posée l’Arche de Nuh après le grand déluge (Coran 11:44).', ar: 'الموضع الذي استوت عليه سفينة نوح بعد الطوفان العظيم: ﴿وَاسْتَوَتْ عَلَى الْجُودِيِّ وَقِيلَ بُعْدًا لِّلْقَوْمِ الظَّالِمِينَ﴾.' },
    prophetId: 'nuh',
    quranRef: 'Hud 11:44',
  },
  {
    id: 'hira',
    name: { en: 'Cave of Hira (Jabal an-Nur)', fr: 'Grotte de Hira (Mont de la Lumière)', ar: 'غار حراء (جبل النور)' },
    type: 'mountain',
    lat: 21.4583,
    lng: 39.8583,
    desc: { en: 'The mountain cave northeast of Makkah where the Archangel Jibril descended with the first revelation of the Qur’an: Iqra.', fr: 'La grotte où l’ange Jibril descendit avec les premiers versets du Coran (Iqra).', ar: 'الغار في قمة جبل النور حيث كان يتحنث النبي ﷺ وهبط عليه الروح الأمين جبريل بأول الوحي ﴿اقْرَأْ﴾.' },
    prophetId: 'muhammad',
    quranRef: 'Al-Alaq 96:1-5',
  },
  {
    id: 'thawr',
    name: { en: 'Cave of Thawr (Jabal Thawr)', fr: 'Grotte de Thawr', ar: 'غار ثور' },
    type: 'mountain',
    lat: 21.3786,
    lng: 39.8497,
    desc: { en: 'Sanctuary where the Prophet ﷺ and Abu Bakr hid for three nights during the historic Hijrah: "Grieve not, Allah is with us" (Qur’an 9:40).', fr: 'Refuge où le Prophète ﷺ et Abou Bakr s’abritèrent lors de l’Hégire (Coran 9:40).', ar: 'الغار المنيع جنوب مكة الذي لجأ إليه النبي ﷺ وأبو بكر في طريق الهجرة ﴿إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾.' },
    prophetId: 'muhammad',
    quranRef: 'At-Tawbah 9:40',
  },
  {
    id: 'zamzam',
    name: { en: 'The Spring of Zamzam', fr: 'Le Puits de Zamzam', ar: 'بئر زمزم المبارك' },
    type: 'well',
    lat: 21.4226,
    lng: 39.8264,
    desc: { en: 'Miraculous freshwater spring that gushed forth in the arid valley for Hajar and infant Ismail.', fr: 'Source miraculeuse qui jaillit sous les pieds du nourrisson Ismail et de sa mère Hajar.', ar: 'النبع المبارك الذي فجّره جبريل لهاجر وطفلها إسماعيل في وادٍ غير ذي زرع.' },
    prophetId: 'ismail',
    quranRef: 'Sahih al-Bukhari 3364',
  },
  {
    id: 'arafat',
    name: { en: 'Mount Arafat & Jabal ar-Rahmah', fr: 'Mont Arafat & Jabal ar-Rahmah', ar: 'جبل عرفات وجبل الرحمة' },
    type: 'mountain',
    lat: 21.3549,
    lng: 39.9841,
    desc: { en: 'Pinnacle of Hajj ("Al-Hajju Arafah") and hill of divine mercy where the Prophet ﷺ delivered the Farewell Sermon.', fr: 'Pilier suprême du pèlerinage où le Prophète ﷺ prononça le sermon d’adieu.', ar: 'ركن الحج الأعظم «الحج عرفة»، وموقف الرحمة والضراعة وموضع خطبة الوداع لرسول الله ﷺ.' },
    prophetId: 'muhammad',
    quranRef: 'Al-Baqarah 2:198',
  },
  {
    id: 'quba',
    name: { en: 'Masjid Quba', fr: 'Mosquée de Quba', ar: 'مسجد قباء' },
    type: 'sanctuary',
    lat: 24.4392,
    lng: 39.6172,
    desc: { en: 'The first mosque erected in Islam during the Hijrah: "A mosque founded on righteousness from the first day" (Qur’an 9:108).', fr: 'Première mosquée érigée en Islam dès l’arrivée de l’Hégire, fondée sur la piété (Coran 9:108).', ar: 'أول مسجد أُسس في الإسلام عند مطلع الهجرة النبوية ﴿لَّمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ﴾.' },
    prophetId: 'muhammad',
    quranRef: 'At-Tawbah 9:108',
  },
  {
    id: 'badr',
    name: { en: 'The Plain of Badr (Yawm al-Furqan)', fr: 'La Plaine de Badr', ar: 'بدر (يوم الفرقان)' },
    type: 'city',
    lat: 23.7822,
    lng: 38.7903,
    desc: { en: 'The historic battlefield and caravan wells where the decisive Day of Criterion occurred, aided by descending angels (Qur’an 3:123).', fr: 'Plaine historique et puits où se déroula la bataille décisive du Jour du Discernement (Coran 3:123).', ar: 'أرض المعركة الفاصلة بين الحق والباطل، ويوم الفرقان الذي نصر الله فيه رسوله والمؤمنين.' },
    prophetId: 'muhammad',
    quranRef: 'Ali \'Imran 3:123',
  },
  {
    id: 'uhud',
    name: { en: 'Mount Uhud', fr: 'Mont Ouhoud', ar: 'جبل أحد' },
    type: 'mountain',
    lat: 24.5034,
    lng: 39.6120,
    desc: { en: 'Red granite mountain north of Madinah: "Uhud is a mountain that loves us and we love it" (Sahih Bukhari), sanctuary of the martyrs.', fr: 'Mont emblématique au nord de Médine abritant les tombes des martyrs.', ar: 'الجبل العظيم المحبوب الذي قال فيه ﷺ: «أحد جبل يحبنا ونحبه»، ومرقد سيد الشهداء حمزة والصحب الكرام.' },
    prophetId: 'muhammad',
    quranRef: 'Sahih al-Bukhari 4083',
  },
  {
    id: 'hebron',
    name: { en: 'Cave of the Patriarchs (Al-Khalil)', fr: 'Tombeau des Patriarches (Hébron)', ar: 'الحرم الإبراهيمي الشريف (الخليل)' },
    type: 'city',
    lat: 31.5247,
    lng: 35.1107,
    desc: { en: 'The ancient stone sanctuary and cave resting place of Ibrahim, Sarah, Ishaq, and Ya‘qub in Palestine.', fr: 'Lieu d’inhumation d’Ibrahim, Sarah, Ishaq et Ya‘qub en Palestine.', ar: 'الحرم المبارك في مدينة الخليل ببيت المقدس، مدفن خليل الله إبراهيم وزوجه سارة وإسحاق ويعقوب عليهم السلام.' },
    prophetId: 'ibrahim',
    quranRef: 'Scholarly consensus',
  },
  {
    id: 'ur_chaldees',
    name: { en: 'Ur of the Chaldees (Mesopotamia)', fr: 'Our des Chaldéens (Mésopotamie)', ar: 'أور الكلدانيين (العراق)' },
    type: 'city',
    lat: 30.9628,
    lng: 46.1030,
    desc: { en: 'The ancient Sumerian metropolis where Ibrahim was born, debated Nimrud, and emerged unharmed from the fire (Qur’an 21:69).', fr: 'Métropole antique de Mésopotamie où Ibrahim naquit et triompha de la fournaise.', ar: 'موطن ولادة الخليل إبراهيم ومحاجته لقومه ونمرود، وموقع النار التي جعلها الله بردًا وسلامًا عليه.' },
    prophetId: 'ibrahim',
    quranRef: 'Al-Anbiya 21:69',
  },
  {
    id: 'madyan_well',
    name: { en: 'The Well of Midian (Al-Bad‘)', fr: 'Le Puits de Madyan (Al-Bad‘)', ar: 'ماء مدين وبئرها (البدع)' },
    type: 'well',
    lat: 28.4833,
    lng: 35.0167,
    desc: { en: 'The freshwater well where Musa watered the flocks for the two daughters of the righteous elder of Midian (Qur’an 28:23-28).', fr: 'Le puits où Musa abreuva le troupeau pour les filles du sage de Madyan.', ar: 'ماء مدين حيث سقى موسى لابنتي الشيخ الصالح ﴿فَسَقَىٰ لَهُمَا ثُمَّ تَوَلَّىٰ إِلَى الظِّلِّ﴾.' },
    prophetId: 'shuayb',
    quranRef: 'Al-Qasas 28:23',
  },
  {
    id: 'al_hijr',
    name: { en: 'Al-Hijr / Mada’in Salih (AlUla)', fr: 'Al-Hijr / Mada’in Salih (AlUla)', ar: 'الحِجر ومدائن صالح (العلا)' },
    type: 'city',
    lat: 26.8044,
    lng: 37.9547,
    desc: { en: 'Monumental rock-hewn dwellings carved into sandstone mountains, site of the miraculous She-Camel of Allah (Qur’an 15:80-84).', fr: 'Cité troglodytique taillée dans les falaises, patrie de Salih et de la Chamelle miraculeuse.', ar: 'ديار ثمود المنحوتة في الصخر ﴿وَكَانُوا يَنْحِتُونَ مِنَ الْجِبَالِ بُيُوتًا آمِنِينَ﴾ وموطن معجزة الناقة.' },
    prophetId: 'salih',
    quranRef: 'Al-Hijr 15:80-84',
  },
  {
    id: 'ahqaf_iram',
    name: { en: 'Al-Ahqaf & Iram of the Pillars', fr: 'Al-Ahqaf & Iram aux colonnes', ar: 'الأحقاف وإرم ذات العماد' },
    type: 'city',
    lat: 18.2547,
    lng: 53.6489,
    desc: { en: 'Vast sand dunes between Oman and Hadramawt where Prophet Hud called the powerful nation of ‘Ad (Qur’an 46:21, 89:7).', fr: 'Désert méridional d’Arabie où le prophète Houd avertit le puissant peuple de ‘Ad.', ar: 'مملكة عاد العظيمة في رمال الربع الخالي والأحقاف ﴿إِرَمَ ذَاتِ الْعِمَادِ الَّتِي لَمْ يُخْلَقْ مِثْلُهَا فِي الْبِلَادِ﴾.' },
    prophetId: 'hud',
    quranRef: 'Al-Ahqaf 46:21, Al-Fajr 89:7',
  },
  {
    id: 'qabr_hud',
    name: { en: 'Shrine of Prophet Hud (Wadi Hadramawt)', fr: 'Mausolée du Prophète Houd (Hadramaout)', ar: 'شعب ومقام نبي الله هود (حضرموت)' },
    type: 'sanctuary',
    lat: 16.0333,
    lng: 49.5333,
    desc: { en: 'Sacred mountain ravine in Hadramawt, Yemen, revered since early antiquity as the resting place of Hud.', fr: 'Gorge sacrée au Yémen vénérée depuis des siècles comme le sanctuaire du prophète Houd.', ar: 'الشعب الشريف في وادي حضرموت باليمن المتوارث أنه مدفن نبي الله هود عليه السلام بعد نجاة المؤمنين.' },
    prophetId: 'hud',
    quranRef: 'Mu‘jam al-Buldan',
  },
  {
    id: 'dead_sea',
    name: { en: 'The Inverted Lands (Dead Sea / Bahr Lut)', fr: 'Les Cités Renversées (Mer Morte / Bahr Lout)', ar: 'المؤتفكات وبحر لوط (البحر الميت)' },
    type: 'city',
    lat: 31.3322,
    lng: 35.5000,
    desc: { en: 'The sunken valley where the corrupt cities of Sodom were turned upside down and rained upon with stones (Qur’an 11:82).', fr: 'Fossé tectonique où furent renversées les cités corrompues de Sodome (Coran 11:82).', ar: 'أرض المؤتفكات في غور الأردن التي جعل الله عاليها سافلها وأمطر عليها حجارة من سجيل.' },
    prophetId: 'lut',
    quranRef: 'Hud 11:82',
  },
  {
    id: 'red_sea_crossing',
    name: { en: 'Red Sea Parting & Crossing Site', fr: 'Le Passage de la Mer Rouge', ar: 'موضع فلق البحر الأحمر' },
    type: 'sanctuary',
    lat: 29.0000,
    lng: 34.6667,
    desc: { en: 'Where Musa struck the sea with his staff, splitting the waters into two towering walls of safety for the believers (Qur’an 26:63).', fr: 'Lieu où Musa frappa la mer de son bâton, créant un passage à sec à travers les flots (Coran 26:63).', ar: 'الموضع المهيب حيث ضرب موسى البحر بعصاه فانفلق فكان كل فِرق كالطود العظيم ونجّى الله بني إسرائيل.' },
    prophetId: 'musa',
    quranRef: 'Ash-Shu‘ara 26:63',
  },
  {
    id: 'jabal_harun',
    name: { en: 'Mount Hor (Jabal Harun, Petra)', fr: 'Mont Hor (Jabal Haroun, Pétra)', ar: 'جبل هارون (البتراء)' },
    type: 'mountain',
    lat: 30.3167,
    lng: 35.4056,
    desc: { en: 'Towering red sandstone mountain near Petra, Jordan, bearing the historic sanctuary and tomb of Prophet Harun.', fr: 'Sommet gréseux de Jordanie abritant le sanctuaire historique du prophète Haroun.', ar: 'أعلى قمم البتراء في الأردن، يعلوه المسجد الأبيض ذو القبة المؤرخ أنه مدفن نبي الله هارون عليه السلام.' },
    prophetId: 'harun',
    quranRef: 'Classical geography',
  },
  {
    id: 'ayn_ayyub',
    name: { en: 'Ayn Ayyub (The Healing Spring)', fr: 'Ayn Ayyub (La Source de Guérison)', ar: 'عين أيوب (المغتسل البارد)' },
    type: 'well',
    lat: 32.8333,
    lng: 36.0333,
    desc: { en: 'The miraculous spring in Hauran, Syria, where Ayyub struck the ground to bathe and drink, fully healed (Qur’an 38:42).', fr: 'Source jaillie sous le pas d’Ayyub pour le purifier et le guérir miraculeusement (Coran 38:42).', ar: 'النبع الذي انبجس حين ضرب أيوب الأرض برجله بأمر الله: ﴿ارْكُضْ بِرِجْلِكَ هَذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ﴾.' },
    prophetId: 'ayyub',
    quranRef: 'Sad 38:42',
  },
  {
    id: 'jubb_yusuf',
    name: { en: 'Jubb Yusuf (The Well / Pit of Joseph)', fr: 'Joub Youssouf (Le Puits de Joseph)', ar: 'جُبّ يوسف عليه السلام' },
    type: 'well',
    lat: 32.9667,
    lng: 35.5333,
    desc: { en: 'The ancient stone cistern in Dothan / Galilee where young Yusuf was cast by his brothers before being rescued by a caravan.', fr: 'Citerne antique où les frères jaloux jetèrent le jeune Youssouf avant qu’une caravane ne le recueille.', ar: 'البئر العتيق الذي ألقى فيه إخوة يوسف أخاهم حسدًا، ثم استنقذته سيارة التجار وباعوه بمصر.' },
    prophetId: 'yusuf',
    quranRef: 'Yusuf 12:10, 15',
  },
  {
    id: 'memphis_yusuf',
    name: { en: 'Memphis & The Royal Granaries of Egypt', fr: 'Memphis et les Greniers d’Égypte', ar: 'منف وخزائن مصر العزيز' },
    type: 'city',
    lat: 29.8499,
    lng: 31.2544,
    desc: { en: 'Ancient capital of Egypt where Yusuf interpreted the King’s dream, was made keeper of the storehouses, and welcomed his family.', fr: 'Capitale antique où Youssouf interpréta le rêve royal et fut établi intendant des trésors.', ar: 'عاصمة مصر القديمة حيث فوّض الملك ليوسف إدارة خزائن الأرض لإنقاذ العباد من القحط.' },
    prophetId: 'yusuf',
    quranRef: 'Yusuf 12:55',
  },
  {
    id: 'nineveh',
    name: { en: 'Nineveh & Tell Nabi Yunus (Mosul)', fr: 'Ninive & Tell Nabi Younous (Mossoul)', ar: 'نينوى وتل النبي يونس (الموصل)' },
    type: 'city',
    lat: 36.3587,
    lng: 43.1528,
    desc: { en: 'Metropolis on the Tigris where Yunus preached to over one hundred thousand people, the only entire nation whose faith averted doom.', fr: 'Capitale assyrienne sur le Tigre où le peuple entier de Younous se repentit et fut épargné.', ar: 'عاصمة الآشوريين على دجلة، المدينة الوحيدة التي آمن أهلها جميعًا فكشف الله عنهم عذاب الخزي.' },
    prophetId: 'yunus',
    quranRef: 'Yunus 10:98, As-Saffat 37:148',
  },
  {
    id: 'yaqtin_shore',
    name: { en: 'Shore of Deliverance & The Gourd Tree', fr: 'Rivage de la Délivrance & Le Gourde', ar: 'شاطئ النجاة وشجرة اليقطين' },
    type: 'sanctuary',
    lat: 32.0536,
    lng: 34.7567,
    desc: { en: 'The Mediterranean coast where the whale cast Yunus ashore exhausted, and Allah caused a gourd vine to shelter him (Qur’an 37:145-146).', fr: 'Rivage où la baleine rejeta Younous, et où Allah fit pousser un arbre de courge pour l’ombrager.', ar: 'الساحل الذي لفظ فيه الحوت يونس بالعراء وهو سقيم، فأنبت الله عليه شجرة من يقطين تظله وتشفيه.' },
    prophetId: 'yunus',
    quranRef: 'As-Saffat 37:145-146',
  },
  {
    id: 'mount_carmel',
    name: { en: 'Mount Carmel (Jabal Mar Ilyas)', fr: 'Mont Carmel (Jabal Mar Ilyas)', ar: 'جبل الكرمل (مار إلياس)' },
    type: 'mountain',
    lat: 32.8167,
    lng: 34.9833,
    desc: { en: 'Coastal mountain ridge overlooking Haifa where Prophet Ilyas confronted the worshippers of the idol Ba‘l (Qur’an 37:123-125).', fr: 'Crête montagneuse côtière où le prophète Élie défia les adorateurs de l’idole Ba‘l.', ar: 'سلسلة الجبال المطلة على البحر المتوسط حيث جاهد نبي الله إلياس عباد الصنم «بعل».' },
    prophetId: 'ilyas',
    quranRef: 'As-Saffat 37:123-125',
  },
  {
    id: 'bethlehem',
    name: { en: 'Bethlehem (Bayt Lahm)', fr: 'Bethléem (Bayt Lahm)', ar: 'بيت لحم (مولد المسيح عيسى)' },
    type: 'city',
    lat: 31.7049,
    lng: 35.2078,
    desc: { en: 'The tranquil birthplace of Isa (Jesus) under the ripe date palm tree: "Shake toward yourself the trunk of the palm tree" (Qur’an 19:22-25).', fr: 'Lieu saint où naquit Isa sous le palmier mûrissant (Coran 19:22-25).', ar: 'المكان القَصِيّ المبارك الذي ولدت فيه مريم ابنها المسيح عيسى تحت جذع النخلة ﴿وَهُزِّي إِلَيْكِ بِجِذْعِ النَّخْلَةِ﴾.' },
    prophetId: 'isa',
    quranRef: 'Maryam 19:22-25',
  },
  {
    id: 'mount_olives',
    name: { en: 'Mount of Olives (Jabal az-Zaytun)', fr: 'Mont des Oliviers', ar: 'جبل الزيتون (الطور بالقدس)' },
    type: 'mountain',
    lat: 31.7781,
    lng: 35.2444,
    desc: { en: 'Sacred ridge rising east of Jerusalem where Isa prayed and from which Allah raised him physically to heaven (Qur’an 4:158).', fr: 'Colline sainte à l’est de Jérusalem d’où Allah éleva Isa vers Lui.', ar: 'الجبل المشرف على المسجد الأقصى من جهة الشرق، موضع دعاء المسيح ورفعه إلى السماء ﴿بَل رَّفَعَهُ اللَّهُ إِلَيْهِ﴾.' },
    prophetId: 'isa',
    quranRef: 'An-Nisa 4:158',
  },
  {
    id: 'yahya_shrine',
    name: { en: 'Shrine of Yahya (Umayyad Sanctuary, Damascus)', fr: 'Mausolée de Yahya (Damas)', ar: 'مقام ورأس النبي يحيى (الجامع الأموي بدمشق)' },
    type: 'sanctuary',
    lat: 33.5119,
    lng: 36.3067,
    desc: { en: 'Grand architectural sanctuary in ancient Damascus housing the revered tomb and head of Prophet Yahya (John the Baptist).', fr: 'Merveille architecturale de Damas abritant le tombeau vénéré du prophète Yahya.', ar: 'المقام الجليل داخل الجامع الأموي الكبير بدمشق، المحفوظ فيه مرقد ورأس نبي الله يحيى بن زكريا.' },
    prophetId: 'yahya',
    quranRef: 'Tarikh Dimashq',
  },
  {
    id: 'mihrab_dawud',
    name: { en: 'Mihrab of Dawud (Citadel of Jerusalem)', fr: 'Mihrab de Daoud (Jérusalem)', ar: 'محراب داود عليه السلام (القدس)' },
    type: 'sanctuary',
    lat: 31.7765,
    lng: 35.2285,
    desc: { en: 'The secluded chamber in Jerusalem where Dawud retired for prayer and psalm chanting, where the litigants entered (Qur’an 38:21).', fr: 'Sanctuaire retiré à Jérusalem où Daoud priait quand les deux plaideurs escaladèrent le mur.', ar: 'المحراب والخلوة التعبدية التي اعتزل فيها داود عليه السلام للتسبيح ﴿إِذْ تَسَوَّرُوا الْمِحْرَابَ﴾.' },
    prophetId: 'dawud',
    quranRef: 'Sad 38:21',
  },
]

export const ROUTES: PropheticRoute[] = [
  {
    id: 'ibrahim_path',
    name: { en: 'Migration Path of Ibrahim عليه السلام', fr: 'Itinéraire d’Ibrahim عليه السلام', ar: 'مسار هجرة إبراهيم الخليل عليه السلام' },
    color: '#e9c67b',
    prophetId: 'ibrahim',
    period: { en: 'c. 1900–1800 BCE', fr: 'env. 1900–1800 av. J.-C.', ar: 'حوالي 1900–1800 ق.م' },
    desc: {
      en: 'The momentous journey of faith spanning four ancient civilisations: from Ur and Babylon across Haran and Damascus to Canaan, Egypt, and founding the sanctuary of Makkah.',
      fr: 'Le grand périple de la foi traversant quatre empires antiques : de la Mésopotamie au Levant, à l’Égypte et à La Mecque.',
      ar: 'رحلة التوحيد الكبرى عبر أربع حضارات عريقة: من أور وبابل إلى حران ودمشق، ثم كنعان ومصر وبناء قواعد الكعبة بمكة.',
    },
    coords: [
      [30.9628, 46.1030], // Ur
      [32.5422, 44.4210], // Babylon
      [36.8667, 39.0333], // Haran
      [33.5138, 36.2765], // Damascus
      [31.5247, 35.1107], // Hebron
      [30.0444, 31.2357], // Egypt
      [21.4225, 39.8262], // Makkah
    ],
    stops: [
      {
        name: { en: 'Ur of the Chaldees', fr: 'Our des Chaldéens', ar: 'أور الكلدانيين' },
        lat: 30.9628,
        lng: 46.1030,
        desc: { en: 'Birthplace of Ibrahim and confrontation with idolaters; delivered from the blazing fire.', fr: 'Lieu de naissance d’Ibrahim et sauvetage de la fournaise.', ar: 'موطن مولده ومحاجته لقومه ونجاته من النار العظيمة.' },
        quranRef: 'Al-Anbiya 21:69',
      },
      {
        name: { en: 'Babylon', fr: 'Babylone', ar: 'بابل' },
        lat: 32.5422,
        lng: 44.4210,
        desc: { en: 'Shattering the idols and philosophical dispute with King Nimrud on life and death.', fr: 'Destruction des idoles et débat avec le roi Nemrod.', ar: 'تكسير الأصنام ومحاججة الملك نمرود في الإحياء والإماتة.' },
        quranRef: 'Al-Baqarah 2:258',
      },
      {
        name: { en: 'Haran (Upper Mesopotamia)', fr: 'Haran', ar: 'حرّان' },
        lat: 36.8667,
        lng: 39.0333,
        desc: { en: 'Dawah to heavenly body worshippers (sun, moon, stars).', fr: 'Prédication auprès des adorateurs des astres.', ar: 'دعوة قومه المنشغلين بعبادة الكواكب والشمس والقمر.' },
        quranRef: 'Al-An‘am 6:76-79',
      },
      {
        name: { en: 'Damascus (Sham)', fr: 'Damas', ar: 'دمشق' },
        lat: 33.5138,
        lng: 36.2765,
        desc: { en: 'Gateway of migration into the blessed Levant.', fr: 'Porte d’entrée vers les terres bénies du Levant.', ar: 'محطة العبور نحو الأرض المباركة في بلاد الشام.' },
        quranRef: 'Al-Anbiya 21:71',
      },
      {
        name: { en: 'Hebron (Al-Khalil)', fr: 'Hébron (Al-Khalil)', ar: 'الخليل (كنعان)' },
        lat: 31.5247,
        lng: 35.1107,
        desc: { en: 'Settlement in the land of Canaan and announcement of the birth of Ishaq.', fr: 'Établissement en terre de Canaan et annonce d’Ishaq.', ar: 'الاستقرار في أرض كنعان وبشارة الملائكة بإسحاق.' },
        quranRef: 'Hud 11:69-71',
      },
      {
        name: { en: 'Nile Delta (Egypt)', fr: 'Delta du Nil (Égypte)', ar: 'مصر ووادي النيل' },
        lat: 30.0444,
        lng: 31.2357,
        desc: { en: 'Journey during famine where Sarah and Hajar joined the prophetic household.', fr: 'Voyage durant la famine ; Hajar rejoint le foyer prophétique.', ar: 'الرحيل أثناء القحط ومجيء هاجر أم إسماعيل.' },
        quranRef: 'Sahih al-Bukhari 3358',
      },
      {
        name: { en: 'Valley of Bakkah (Makkah)', fr: 'Vallée de Bakkah (La Mecque)', ar: 'وادي مكة المكرمة' },
        lat: 21.4225,
        lng: 39.8262,
        desc: { en: 'Leaving Hajar and Ismail in the uncultivated valley, raising the foundations of the Ka‘bah.', fr: 'Installation de Hajar et Ismail, élévation de la Ka‘bah.', ar: 'إسكان هاجر وإسماعيل بوادٍ غير ذي زرع ورفع قواعد البيت العتيق.' },
        quranRef: 'Ibrahim 14:37, Al-Baqarah 2:127',
      },
    ],
  },
  {
    id: 'musa_exodus',
    name: { en: 'The Exodus & Wandering of Musa عليه السلام', fr: 'L’Exode de Musa عليه السلام', ar: 'مسار الخروج لموسى وبني إسرائيل' },
    color: '#38bdf8',
    prophetId: 'musa',
    period: { en: 'c. 13th Century BCE', fr: 'env. XIIIe siècle av. J.-C.', ar: 'حوالي القرن 13 ق.م' },
    desc: {
      en: 'From royal upbringing in Pharaoh’s court to refuge in Midian, receiving divine speech at Mount Sinai, the miraculous parting of the sea, and guidance in the desert.',
      fr: 'De la cour de Pharaon à l’exil à Madyan, la théophanie au mont Sinaï et la traversée de la mer Rouge.',
      ar: 'من قصر فرعون إلى الهروب لمدين، ثم تكليم الله له بالطور وفلق البحر الأحمر وتيه بني إسرائيل.'
    },
    coords: [
      [30.5852, 31.5035], // Goshen / Nile Delta
      [28.4833, 35.0167], // Midian
      [28.5394, 33.9753], // Mount Sinai / Tuwa
      [29.9668, 32.5498], // Red Sea Crossing
      [31.7683, 35.7253], // Mount Nebo / Jordan Valley
    ],
    stops: [
      {
        name: { en: 'Goshen / Nile Delta', fr: 'Goshên / Delta du Nil', ar: 'أرض جاسان (دلتا مصر)' },
        lat: 30.5852,
        lng: 31.5035,
        desc: { en: 'Cast as an infant into the Nile, raised in Pharaoh’s court.', fr: 'Recueilli des flots du Nil et élevé au palais de Pharaon.', ar: 'إلقاؤه في التابوت في اليم ونشأته في قصر فرعون.' },
        quranRef: 'Al-Qasas 28:7-9',
      },
      {
        name: { en: 'Midian (Al-Bad‘)', fr: 'Madyan (Al-Bad‘)', ar: 'مدين (البدع)' },
        lat: 28.4833,
        lng: 35.0167,
        desc: { en: 'Ten years refuge, watering flocks for the daughters of the righteous elder.', fr: 'Dix années d’exil et mariage avec la fille du sage.', ar: 'عشر سنوات من الرعاية والخدمة ومصاهرة الشيخ الصالح.' },
        quranRef: 'Al-Qasas 28:22-28',
      },
      {
        name: { en: 'Mount Sinai & Valley of Tuwa', fr: 'Mont Sinaï & Vallée de Touwa', ar: 'طور سيناء والوادي المقدس' },
        lat: 28.5394,
        lng: 33.9753,
        desc: { en: 'Direct speech with Allah at the burning bush and reception of the Tablets.', fr: 'Parole divine directe et don des Tables de la Loi.', ar: 'تكليم الله له بالأمر بالرسالة ونزول ألواح التوراة.' },
        quranRef: 'Taha 20:10-14',
      },
      {
        name: { en: 'Red Sea Crossing', fr: 'Passage de la Mer Rouge', ar: 'موضع فلق البحر' },
        lat: 29.9668,
        lng: 32.5498,
        desc: { en: 'Parting of the sea with his staff; salvation of the believers and drowning of Pharaoh.', fr: 'Ouverture miraculeuse des eaux et noyade de Pharaon.', ar: 'انفلاق البحر بعصا موسى وغرق فرعون وجنوده.' },
        quranRef: 'Ash-Shu‘ara 26:63-66',
      },
      {
        name: { en: 'Mount Nebo & Jordan Valley', fr: 'Mont Nébo & Vallée du Jourdain', ar: 'جبل نيبو وغور الأردن' },
        lat: 31.7683,
        lng: 35.7253,
        desc: { en: 'Overlooking the Holy Land after forty years in the wilderness.', fr: 'Regard sur la Terre Sainte au terme des quarante années d’errance.', ar: 'الإشراف على الأرض المقدسة بعد أربعين سنة من التيه.' },
        quranRef: 'Al-Ma’idah 5:21-26',
      },
    ],
  },
  {
    id: 'muhammad_hijrah',
    name: { en: 'The Blessed Hijrah of Muhammad ﷺ', fr: 'La sainte Hégire vers Médine', ar: 'طريق الهجرة النبوية الشريفة' },
    color: '#4ade80',
    prophetId: 'muhammad',
    period: { en: '622 CE / 1 AH', fr: '622 ap. J.-C. / 1 H', ar: '622 م / 1 هـ' },
    desc: {
      en: 'The watershed exodus from persecution in Makkah to sovereignty in Madinah: departing secretly, sheltering in Cave Thawr, and traversing the harsh coastal trail.',
      fr: 'Le grand tournant de l’Islam : départ clandestin de La Mecque, halte dans la grotte de Thawr et traversée côtière vers Médine.',
      ar: 'الهجرة النبوية المباركة: الخروج المستور من مكة والغار ثم المسار الساحلي وصولًا لقباء وتأسيس دولة المدينة.'
    },
    coords: [
      [21.4225, 39.8262], // Makkah
      [21.3786, 39.8497], // Cave of Thawr
      [21.9167, 39.3167], // Usfan / Qudayd
      [22.8000, 39.0000], // Coastal Track
      [24.4392, 39.6172], // Quba
      [24.4686, 39.6108], // Al-Masjid an-Nabawi
    ],
    stops: [
      {
        name: { en: 'Dar al-Arqam (Makkah)', fr: 'Dar al-Arqam (La Mecque)', ar: 'دار الأرقم (مكة)' },
        lat: 21.4225,
        lng: 39.8262,
        desc: { en: 'Secret departure under the cover of night while Ali lay in the Prophet’s bed.', fr: 'Départ secret de nuit pendant qu’Ali occupait son lit.', ar: 'الخروج الحذر في جنح الظلام ومبيت علي بن أبي طالب في فراشه الشريف.' },
        quranRef: 'Al-Anfal 8:30',
      },
      {
        name: { en: 'Cave of Thawr', fr: 'Grotte de Thawr', ar: 'غار ثور' },
        lat: 21.3786,
        lng: 39.8497,
        desc: { en: 'Three days refuge with Abu Bakr while Quraysh searchers stood outside.', fr: 'Trois nuits de halte avec Abou Bakr protégé par la providence divine.', ar: 'المقام ثلاث ليالٍ مع الصديق أبي بكر ﴿لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾.' },
        quranRef: 'At-Tawbah 9:40',
      },
      {
        name: { en: 'Tent of Umm Ma‘bad (Qudayd)', fr: 'Tente d’Oumm Ma‘bad', ar: 'خيمة أم معبد (قديد)' },
        lat: 21.9167,
        lng: 39.3167,
        desc: { en: 'Miracle of the dry ewe overflowing with milk for the travelers.', fr: 'Miracle de la brebis tarie qui donna du lait en abondance.', ar: 'معجزة الشاة الهزيلة التي درّت اللبن وسقيا الركب المهاجر.' },
        quranRef: 'Zad al-Ma‘ad',
      },
      {
        name: { en: 'Coastal Track (Rabigh)', fr: 'Piste côtière de Rabigh', ar: 'طريق الساحل (رابغ)' },
        lat: 22.8000,
        lng: 39.0000,
        desc: { en: 'Navigating untracked desert paths guided by expert tracker Abdullah ibn Urayqit.', fr: 'Navigation dans les sables côtiers guidée par Ibn Ourayqit.', ar: 'سلوك مسالك وعرة غير مألوفة بقيادة الدليل عبد الله بن أريقط.' },
        quranRef: 'Sirat Ibn Hisham',
      },
      {
        name: { en: 'Quba Oasis', fr: 'Oasis de Quba', ar: 'واحة قباء' },
        lat: 24.4392,
        lng: 39.6172,
        desc: { en: 'Joyous reception by the early emigrants and erection of the first mosque in Islam.', fr: 'Accueil triomphal et édification de la première mosquée de l’Islam.', ar: 'نزوله ﷺ بقباء وتأسيس أول مسجد أُسس على التقوى.' },
        quranRef: 'At-Tawbah 9:108',
      },
      {
        name: { en: 'Al-Masjid an-Nabawi (Madinah)', fr: 'Médine l’Illuminée', ar: 'المسجد النبوي (طيبة)' },
        lat: 24.4686,
        lng: 39.6108,
        desc: { en: 'Halting of the camel Qaswa, welcomed by the Ansar singing Tala‘a al-Badru ‘Alayna.', fr: 'Arrivée triomphale à Médine et arrêt de la chamelle Qaswa.', ar: 'بروك ناقته القصواء وبناء المسجد النبوي الشريف والمؤاخاة بين المهاجرين والأنصار.' },
        quranRef: 'Al-Hashr 59:9',
      },
    ],
  },
  {
    id: 'isra_miraj',
    name: { en: 'Al-Isra: The Miraculous Night Journey', fr: 'Al-Isra : Le Voyage nocturne', ar: 'رحلة الإسراء الأرضية المباركة' },
    color: '#c084fc',
    prophetId: 'muhammad',
    period: { en: 'c. 621 CE (Pre-Hijrah)', fr: 'env. 621 ap. J.-C.', ar: 'حوالي 621 م / قبل الهجرة' },
    desc: {
      en: 'The miraculous terrestrial night passage from the Sacred Mosque in Makkah to Al-Aqsa in Jerusalem aboard Al-Buraq, stopping to pray at prophetic milestones.',
      fr: 'Le voyage nocturne miraculeux de La Mecque à Jérusalem sur Al-Bouraq avec prière aux étapes prophétiques.',
      ar: 'الرحلة الإعجازية الليلية من المسجد الحرام إلى المسجد الأقصى على البراق، وصلاة النبي ﷺ في المحطات المباركة.'
    },
    coords: [
      [21.4225, 39.8262], // Makkah
      [24.4686, 39.6108], // Yathrib / Madinah
      [28.5394, 33.9753], // Mount Sinai
      [31.7049, 35.2078], // Bethlehem
      [31.7761, 35.2358], // Al-Aqsa / Jerusalem
    ],
    stops: [
      {
        name: { en: 'Al-Masjid al-Haram (Makkah)', fr: 'Al-Masjid al-Haram (La Mecque)', ar: 'المسجد الحرام (مكة)' },
        lat: 21.4225,
        lng: 39.8262,
        desc: { en: 'Starting point of the nocturnal journey from the Hijr Ismail aboard Al-Buraq.', fr: 'Point de départ sur Al-Bouraq depuis le Hijr d’Ismail.', ar: 'انطلاق الرحلة من الحِجر عند الكعبة المشرفة بصحبة جبريل على البراق.' },
        quranRef: 'Al-Isra 17:1',
      },
      {
        name: { en: 'Taybah (Madinah)', fr: 'Taybah (Médine)', ar: 'طيبة (المدينة المنورة)' },
        lat: 24.4686,
        lng: 39.6108,
        desc: { en: 'First prayer station at the future land of migration.', fr: 'Première halte de prière sur la terre de la future émigration.', ar: 'الهبوط والصلاة بأمر جبريل بأرض النخيل وطيبة موضع الهجرة.' },
        quranRef: 'Sunan an-Nasa’i 450',
      },
      {
        name: { en: 'Mount Sinai (Tur Sina)', fr: 'Mont Sinaï (Tour Sina)', ar: 'طور سيناء' },
        lat: 28.5394,
        lng: 33.9753,
        desc: { en: 'Halting to pray where Allah spoke directly to Prophet Musa.', fr: 'Prière à l’endroit où Allah s’adressa à Musa.', ar: 'الصلاة عند الجبل الأشم حيث كلّم الله موسى تكليمًا.' },
        quranRef: 'Sunan an-Nasa’i 450',
      },
      {
        name: { en: 'Bayt Lahm (Bethlehem)', fr: 'Bayt Lahm (Bethléem)', ar: 'بيت لحم' },
        lat: 31.7049,
        lng: 35.2078,
        desc: { en: 'Halting to pray where Isa ibn Maryam was born under the palm tree.', fr: 'Prière au lieu de naissance béni d’Isa.', ar: 'الصلاة في موضع ولادة المسيح عيسى بن مريم عليه السلام.' },
        quranRef: 'Sunan an-Nasa’i 450',
      },
      {
        name: { en: 'Al-Masjid al-Aqsa (Jerusalem)', fr: 'Al-Masjid al-Aqsa (Jérusalem)', ar: 'المسجد الأقصى المبارك' },
        lat: 31.7761,
        lng: 35.2358,
        desc: { en: 'Leading all Prophets in congregation in prayer, followed by the ascension (Al-Mi‘raj).', fr: 'Prière collective guidée devant tous les prophètes, suivie du Mi‘raj.', ar: 'إمامة الأنبياء والمرسلين جميعًا في الصلاة ثم العروج إلى السماوات السبع.' },
        quranRef: 'Al-Isra 17:1',
      },
    ],
  },
  {
    id: 'yusuf_journey',
    name: { en: 'The Odyssey of Yusuf عليه السلام', fr: 'L’Épopée de Yusuf عليه السلام', ar: 'مسار رحلة يوسف الصديق عليه السلام' },
    color: '#fbbf24',
    prophetId: 'yusuf',
    period: { en: 'c. 17th Century BCE', fr: 'env. XVIIe siècle av. J.-C.', ar: 'حوالي القرن 17 ق.م' },
    desc: {
      en: 'From pastoral boyhood in Canaan to the dark cistern of Dothan, crossing the Sinai desert into Egyptian slavery, rising to minister of the storehouses.',
      fr: 'De l’enfance en Canaan au puits de Dothan, à l’esclavage en Égypte puis au trône de ministre des trésors.',
      ar: 'من بادية كنعان إلى ظلمة الجب ثم رحلة القافلة عبر سيناء، ومن السجن إلى عرش خزائن مصر وعناق الأبوين.'
    },
    coords: [
      [31.5247, 35.1107], // Hebron / Canaan
      [32.9667, 35.5333], // Well of Dothan (Jubb Yusuf)
      [31.2589, 34.7997], // Beersheba / Negev
      [31.0500, 33.8000], // Northern Sinai Desert Track
      [29.8499, 31.2544], // Memphis / Egypt
    ],
    stops: [
      {
        name: { en: 'Canaan (Hebron)', fr: 'Canaan (Hébron)', ar: 'أرض كنعان (الخليل)' },
        lat: 31.5247,
        lng: 35.1107,
        desc: { en: 'Childhood home of Yusuf and his eleven brothers, and his vision of the eleven stars.', fr: 'Foyer d’enfance et vision prophétique des onze étoiles.', ar: 'موطن صباه وحلم سجود الأحد عشر كوكبًا والشمس والقمر له.' },
        quranRef: 'Yusuf 12:4',
      },
      {
        name: { en: 'Well of Dothan (Jubb Yusuf)', fr: 'Puits de Dothan (Joub Youssouf)', ar: 'جُبّ يوسف (دوثان)' },
        lat: 32.9667,
        lng: 35.5333,
        desc: { en: 'Cast down the dark cistern by envious brothers and sold to a passing caravan for dirhams.', fr: 'Jeté au fond du puits puis vendu à une caravane pour quelques pièces.', ar: 'إلقاؤه في قعر الجب حسدًا وبيعه لقافلة تجار بثمن بخس دراهم معدودة.' },
        quranRef: 'Yusuf 12:15-20',
      },
      {
        name: { en: 'Beersheba (Negev Caravan Highway)', fr: 'Beer-Sheva (Piste du Néguev)', ar: 'بئر السبع (طريق القوافل)' },
        lat: 31.2589,
        lng: 34.7997,
        desc: { en: 'Caravan junction crossing southward towards the borders of Egypt.', fr: 'Croisée caravanière menant vers le sud et la frontière égyptienne.', ar: 'محطة مسير القافلة التجارية باتجاه صحراء سيناء ووادي النيل.' },
        quranRef: 'Yusuf 12:19',
      },
      {
        name: { en: 'Northern Sinai Desert Track', fr: 'Piste du Nord-Sinaï', ar: 'درب شمال سيناء' },
        lat: 31.0500,
        lng: 33.8000,
        desc: { en: 'The grueling trade highway across the sands between the Levant and Egypt.', fr: 'La route aride du commerce reliant le Levant aux portes du Nil.', ar: 'طريق التجارة القديم عبر رمال سيناء الفاصلة بين الشام ومصر.' },
        quranRef: 'Yusuf 12:21',
      },
      {
        name: { en: 'Memphis & Egyptian Royal Court', fr: 'Memphis et Palais Royal', ar: 'منف وقصر العزيز بمصر' },
        lat: 29.8499,
        lng: 31.2544,
        desc: { en: 'From the mansion of Al-Aziz and prison to stewardship of all Egyptian granaries.', fr: 'De la demeure d’Al-Aziz et la prison jusqu’à l’intendance des greniers.', ar: 'التمكين في الأرض بعد محنة السجن، وحفظ خزائن مصر، وجمع شمل أهله.' },
        quranRef: 'Yusuf 12:54-56, 12:100',
      },
    ],
  },
  {
    id: 'yunus_mission',
    name: { en: 'Mission, Ordeal & Return of Yunus عليه السلام', fr: 'Mission et Épreuve de Yunus عليه السلام', ar: 'مسار دعوة ومحنة يونس عليه السلام' },
    color: '#2dd4bf',
    prophetId: 'yunus',
    period: { en: 'c. 8th Century BCE', fr: 'env. VIIIe siècle av. J.-C.', ar: 'حوالي القرن 8 ق.م' },
    desc: {
      en: 'Sent to the mighty Assyrian capital Nineveh, departing in distress across the desert to Jaffa port, swallowed by the great fish at sea, and returned to a saved nation.',
      fr: 'Envoyé à Ninive, embarqué à Jaffa, englouti par la baleine puis ramené vers un peuple sauvé.',
      ar: 'من نينوى العظيمة إلى ميناء يافا، والتقام الحوت في لجج البحر، ثم النجاة بشجرة اليقطين والعودة لقومه المؤمنين.'
    },
    coords: [
      [36.3587, 43.1528], // Nineveh
      [34.8021, 38.9968], // Syrian Desert Route
      [32.0536, 34.7567], // Jaffa Sea Port
      [32.5000, 33.5000], // Mediterranean Sea
      [32.1000, 34.8000], // Shore of Deliverance
      [36.3587, 43.1528], // Return to Nineveh
    ],
    stops: [
      {
        name: { en: 'Nineveh (Mosul)', fr: 'Ninive (Mossoul)', ar: 'نينوى (الموصل)' },
        lat: 36.3587,
        lng: 43.1528,
        desc: { en: 'Calling 100,000+ souls to monotheism before leaving in grievance.', fr: 'Prédication auprès de plus de 100 000 habitants.', ar: 'دعوة قومه البالغين مائة ألف أو يزيدون ثم خروجه مغاضبًا.' },
        quranRef: 'Al-Anbiya 21:87, Yunus 10:98',
      },
      {
        name: { en: 'Syrian Desert Trail (Tadmur)', fr: 'Piste du Désert de Syrie', ar: 'بادية الشام (طريق تدمر)' },
        lat: 34.8021,
        lng: 38.9968,
        desc: { en: 'Journeying westward towards Mediterranean maritime ports.', fr: 'Traversée vers les ports marchands de la Méditerranée.', ar: 'المسير غربًا نحو الموانئ البحرية على الساحل الشامي.' },
        quranRef: 'As-Saffat 37:139-140',
      },
      {
        name: { en: 'Jaffa Port (Levant Coast)', fr: 'Port de Jaffa', ar: 'ميناء يافا القديم' },
        lat: 32.0536,
        lng: 34.7567,
        desc: { en: 'Boarding the fully-laden vessel into open tempestuous waters.', fr: 'Embarquement à bord du navire surchargé.', ar: 'ركوب السفينة المشحونة في البحر الهائج ﴿إِذْ أَبَقَ إِلَى الْفُلْكِ الْمَشْحُونِ﴾.' },
        quranRef: 'As-Saffat 37:140',
      },
      {
        name: { en: 'Deep Mediterranean Waters', fr: 'Abysses de la Méditerranée', ar: 'لجج البحر الأبيض المتوسط' },
        lat: 32.5000,
        lng: 33.5000,
        desc: { en: 'Drawing lots and swallowed by the whale in the three depths of darkness: "La ilaha illa Anta subhanaka".', fr: 'Tirage au sort et engloutissement dans les trois ténèbres.', ar: 'المساهمة والتقام الحوت له وهو مليم ونداؤه في الظلمات: ﴿لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ﴾.' },
        quranRef: 'Al-Anbiya 21:87, As-Saffat 37:141-144',
      },
      {
        name: { en: 'Shore of Deliverance', fr: 'Rivage de la Délivrance', ar: 'ساحل النجاة واليقطين' },
        lat: 32.1000,
        lng: 34.8000,
        desc: { en: 'Cast onto the open strand; sheltered by the miraculously growing gourd tree.', fr: 'Rejeté sur la rive et protégé par le plant de courge.', ar: 'طرحه بالعراء وهو سقيم وإنبات شجرة اليقطين ظلالًا وغذاءً له.' },
        quranRef: 'As-Saffat 37:145-146',
      },
      {
        name: { en: 'Return to Nineveh', fr: 'Retour à Ninive', ar: 'الرجوع إلى نينوى' },
        lat: 36.3587,
        lng: 43.1528,
        desc: { en: 'Returning to find all one hundred thousand had repented and were granted mercy.', fr: 'Retour triomphal auprès de son peuple entièrement croyant.', ar: 'العودة لقومه فوجدهم قد أنابوا وآمنوا فمتعهم الله إلى حين.' },
        quranRef: 'Yunus 10:98, As-Saffat 37:147-148',
      },
    ],
  },
  {
    id: 'nuh_deluge',
    name: { en: 'The Great Deluge & Ark of Nuh عليه السلام', fr: 'Le Déluge et l’Arche de Nuh عليه السلام', ar: 'طوفان نوح ومسار الفلك إلى الجودي' },
    color: '#818cf8',
    prophetId: 'nuh',
    period: { en: 'Primordial Era', fr: 'Ère primordiale', ar: 'العصر الأول' },
    desc: {
      en: 'Building the Ark upon the Mesopotamian plain, the gushing of subterranean springs and heavens bursting with rain, sailing over mountainous waves to rest on Mount Judy.',
      fr: 'Construction de l’Arche en Mésopotamie, déluge universel et amarrage sur le mont Djoudi.',
      ar: 'صنع الفلك في أرض الرافدين، وفوران التنور وسير السفينة في موج كالجبال حتى استوت بسلام على جبل الجودي.'
    },
    coords: [
      [32.0300, 44.4000], // Plains of Kufa / Mesopotamia
      [31.0000, 47.4000], // Alluvial Flood Confluence
      [34.5000, 44.0000], // Central Mesopotamian Sea
      [36.5000, 42.8000], // Northern Mountain Gorges
      [37.3800, 42.4500], // Mount Judy
    ],
    stops: [
      {
        name: { en: 'Plains of Mesopotamia (Kufa)', fr: 'Plaines de Mésopotamie (Koufa)', ar: 'أرض الكوفة وسهل السواد' },
        lat: 32.0300,
        lng: 44.4000,
        desc: { en: 'Centuries of preaching and construction of the immense timber Ark by divine guidance.', fr: 'Siècles de prédication et construction de l’Arche colossale.', ar: 'صناعة الفلك بأعين الله ووحيه وتحمل سخرية الملأ من قومه.' },
        quranRef: 'Hud 11:37-38',
      },
      {
        name: { en: 'Eruption of the Oven (Tannur)', fr: 'Fureur du Tannour', ar: 'فوران التنور وتفجر الأرض' },
        lat: 31.0000,
        lng: 47.4000,
        desc: { en: 'The opening of heaven’s gates with pouring rain and bursting of earth’s springs.', fr: 'Ouverture des vannes célestes et jaillissement des sources terrestres.', ar: '﴿حَتَّىٰ إِذَا جَاءَ أَمْرُنَا وَفَارَ التَّنُّورُ قُلْنَا احْمِلْ فِيهَا مِن كُلٍّ زَوْجَيْنِ اثْنَيْنِ﴾.' },
        quranRef: 'Hud 11:40, Al-Qamar 54:11-12',
      },
      {
        name: { en: 'Waves Like Mountains', fr: 'Flots comme des montagnes', ar: 'موج كالجبال ومصير الكافرين' },
        lat: 34.5000,
        lng: 44.0000,
        desc: { en: 'The vessel sailing on boundless waters; plea of Nuh to his drowning son Yam.', fr: 'L’Arche fendant les vagues géantes et noyade du fils rebelle.', ar: 'جريان السفينة في موج كالجبال ونداء نوح لابنه: ﴿يَا بُنَيَّ ارْكَب مَّعَنَا وَلَا تَكُن مَّعَ الْكَافِرِينَ﴾.' },
        quranRef: 'Hud 11:42-43',
      },
      {
        name: { en: 'Upper Tigris Mountain Gorges', fr: 'Gorges du Haut-Tigre', ar: 'مضائق جبال أعالي دجلة' },
        lat: 36.5000,
        lng: 42.8000,
        desc: { en: 'Waters commanded to recede: "O Earth swallow your water, and O Sky withhold!".', fr: 'Ordre divin intimé aux cieux et à la terre d’apaiser les flots.', ar: 'الأمر الإلهي: ﴿وَقِيلَ يَا أَرْضُ ابْلَعِي مَاءَكِ وَيَا سَمَاءُ أَقْلِعِي وَغِيضَ الْمَاءُ﴾.' },
        quranRef: 'Hud 11:44',
      },
      {
        name: { en: 'Mount Judy (Cizre / Şırnak)', fr: 'Mont Djoudi', ar: 'جبل الجودي' },
        lat: 37.3800,
        lng: 42.4500,
        desc: { en: 'Resting in peace upon Mount Judy; descent with blessings upon the believing survivors.', fr: 'L’Arche s’arrête en paix au sommet du mont Djoudi.', ar: '﴿وَاسْتَوَتْ عَلَى الْجُودِيِّ وَقِيلَ بُعْدًا لِّلْقَوْمِ الظَّالِمِينَ﴾ ونزول نوح والمؤمنين بسلام وبركات.' },
        quranRef: 'Hud 11:44, 11:48',
      },
    ],
  },
]

const ERAS = [
  { id: 'all', label: { en: 'All Eras', fr: 'Toutes époques', ar: 'جميع العصور' } },
  { id: 'primordial', label: { en: 'Primordial', fr: 'Origines', ar: 'البدايات الأولى' }, ids: ['adam', 'idris', 'nuh'] },
  { id: 'arabia', label: { en: 'Ancient Arabia', fr: 'Arabie antique', ar: 'العرب القدماء' }, ids: ['hud', 'salih'] },
  { id: 'abrahamic', label: { en: 'Abrahamic', fr: 'Abrahamique', ar: 'العهد الإبراهيمي' }, ids: ['ibrahim', 'lut', 'ismail', 'ishaq', 'yaqub', 'yusuf'] },
  { id: 'israelite', label: { en: 'Mosaic & Israelite', fr: 'Mosaïque et Rois', ar: 'موسى وملوك إسرائيل' }, ids: ['ayyub', 'shuayb', 'musa', 'harun', 'dhulkifl', 'dawud', 'sulayman', 'ilyas', 'alyasa', 'yunus'] },
  { id: 'prophetic', label: { en: 'Messianic & Seal', fr: 'Messianique et Sceau', ar: 'المسيح وخاتم النبيين' }, ids: ['zakariya', 'yahya', 'isa', 'muhammad'] },
]

export function TopographyMap({ focus }: { focus?: string }) {
  const { t, pick, lang } = useI18n()
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const layersRef = useRef<{ [key: string]: L.Layer }>({})

  const [mapStyle, setMapStyle] = useState<MapStyle>('satellite')
  const [selectedId, setSelectedId] = useState<string | null>(focus ?? null)
  const [selectedSite, setSelectedSite] = useState<SacredSitePin | null>(null)
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null)
  const [siteCategory, setSiteCategory] = useState<SiteCategory>('all')
  const [activeEra, setActiveEra] = useState<string>('all')
  const [showSites, setShowSites] = useState(true)
  const [showRoutes, setShowRoutes] = useState(true)
  const [showRouteList, setShowRouteList] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mapReady, setMapReady] = useState(false)

  const activeProphetIds = useMemo(() => {
    if (activeEra === 'all') return new Set(prophets.map((p) => p.id))
    const eraObj = ERAS.find((e) => e.id === activeEra)
    return new Set(eraObj?.ids ?? [])
  }, [activeEra])

  const selectedPerson = selectedId ? byId.get(selectedId) : undefined
  const selectedRoute = useMemo(() => ROUTES.find((r) => r.id === selectedRouteId), [selectedRouteId])

  // Filtered sacred sites according to category
  const filteredSites = useMemo(() => {
    if (siteCategory === 'all') return SACRED_SITES
    return SACRED_SITES.filter((s) => s.type === siteCategory)
  }, [siteCategory])

  // Counts for each site category
  const siteCounts = useMemo(() => {
    return {
      all: SACRED_SITES.length,
      sanctuary: SACRED_SITES.filter((s) => s.type === 'sanctuary').length,
      mountain: SACRED_SITES.filter((s) => s.type === 'mountain').length,
      well: SACRED_SITES.filter((s) => s.type === 'well').length,
      city: SACRED_SITES.filter((s) => s.type === 'city').length,
    }
  }, [])

  // Comprehensive Search across Prophets, Sacred Sites, and Routes
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return { prophets: [], sites: [], routes: [] }

    const matchedProphets = prophets.filter((p) => {
      const matchName =
        p.name.en.toLowerCase().includes(q) ||
        p.name.fr.toLowerCase().includes(q) ||
        p.name.ar.includes(q) ||
        (p.alt?.en && p.alt.en.toLowerCase().includes(q))
      const matchRegion =
        p.topography?.region &&
        (p.topography.region.en.toLowerCase().includes(q) ||
          p.topography.region.ar.includes(q))
      return matchName || matchRegion
    })

    const matchedSites = SACRED_SITES.filter((s) => {
      return (
        s.name.en.toLowerCase().includes(q) ||
        s.name.fr.toLowerCase().includes(q) ||
        s.name.ar.includes(q) ||
        s.desc.en.toLowerCase().includes(q) ||
        s.desc.ar.includes(q)
      )
    })

    const matchedRoutes = ROUTES.filter((r) => {
      return (
        r.name.en.toLowerCase().includes(q) ||
        r.name.fr.toLowerCase().includes(q) ||
        r.name.ar.includes(q)
      )
    })

    return { prophets: matchedProphets, sites: matchedSites, routes: matchedRoutes }
  }, [searchQuery])

  const hasSearchResults =
    searchResults.prophets.length > 0 ||
    searchResults.sites.length > 0 ||
    searchResults.routes.length > 0

  // Initialize Leaflet Map Dynamically (Safe for SSR and JSDOM)
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return

    let isMounted = true
    import('leaflet').then((leafletModule) => {
      if (!isMounted || !mapContainer.current) return
      const Leaflet = leafletModule.default || leafletModule

      const initialCenter: [number, number] = [27.0, 39.5]
      const initialZoom = 5

      const map = Leaflet.map(mapContainer.current, {
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 3,
        maxZoom: 17,
        zoomControl: false,
        attributionControl: false,
      })

      // Custom zoom control in bottom-end
      Leaflet.control.zoom({ position: 'bottomright' }).addTo(map)

      mapInstance.current = map
      setMapReady(true)
    })

    return () => {
      isMounted = false
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  // Update Base Tile Layer when mapStyle changes
  useEffect(() => {
    const map = mapInstance.current
    if (!map) return

    import('leaflet').then((leafletModule) => {
      const Leaflet = leafletModule.default || leafletModule

      if (layersRef.current.tileLayer) {
        map.removeLayer(layersRef.current.tileLayer)
      }

      let tileUrl = ''
      let attribution = ''

      if (mapStyle === 'satellite') {
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        attribution = 'Tiles &copy; Esri, Maxar, Earthstar Geographics'
      } else if (mapStyle === 'terrain') {
        tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
        attribution = 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
      } else {
        // Dark theme
        tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution = '&copy; OpenStreetMap contributors &copy; CARTO'
      }

      const tileLayer = Leaflet.tileLayer(tileUrl, {
        maxZoom: 18,
        subdomains: 'abcd',
        attribution,
      }).addTo(map)

      layersRef.current.tileLayer = tileLayer
    })
  }, [mapStyle, mapReady])

  // Update Prophet Markers, Sacred Sites & Prophetic Routes
  useEffect(() => {
    const map = mapInstance.current
    if (!map || !mapReady) return

    import('leaflet').then((leafletModule) => {
      const Leaflet = leafletModule.default || leafletModule

      // Remove existing marker layer groups
      if (layersRef.current.markersGroup) {
        map.removeLayer(layersRef.current.markersGroup)
      }
      if (layersRef.current.sitesGroup) {
        map.removeLayer(layersRef.current.sitesGroup)
      }
      if (layersRef.current.routesGroup) {
        map.removeLayer(layersRef.current.routesGroup)
      }

      const markersGroup = Leaflet.layerGroup()
      const sitesGroup = Leaflet.layerGroup()
      const routesGroup = Leaflet.layerGroup()

      // 1. Draw Routes and Waypoints
      if (showRoutes) {
        ROUTES.forEach((r) => {
          const isSelected = selectedRouteId === r.id
          const opacity = isSelected ? 1 : selectedRouteId ? 0.35 : 0.85
          const weight = isSelected ? 5 : 3.5

          // Active route glow background line
          if (isSelected) {
            Leaflet.polyline(r.coords, {
              color: '#ffffff',
              weight: 8,
              opacity: 0.3,
            }).addTo(routesGroup)
          }

          const polyline = Leaflet.polyline(r.coords, {
            color: r.color,
            weight,
            opacity,
            dashArray: isSelected ? undefined : '6, 8',
          })

          polyline.bindTooltip(
            `<div style="font-family: inherit; font-size: 11px; font-weight: bold; padding: 2px 4px; color: ${r.color};">${r.name[lang]}</div>`,
            { sticky: true, className: 'leaflet-tooltip-dark' }
          )

          polyline.on('click', () => {
            handleSelectRoute(r)
          })

          polyline.addTo(routesGroup)
        })

        // Draw interactive numbered waypoints if a route is selected
        if (selectedRoute) {
          selectedRoute.stops.forEach((stop, index) => {
            const stopIcon = Leaflet.divIcon({
              html: `
                <div style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 26px;
                  height: 26px;
                  border-radius: 50%;
                  background: #080b1c;
                  border: 2px solid ${selectedRoute.color};
                  color: #ffffff;
                  font-family: ui-sans-serif, system-ui;
                  font-size: 11px;
                  font-weight: 800;
                  box-shadow: 0 0 14px ${selectedRoute.color};
                  cursor: pointer;
                ">
                  ${index + 1}
                </div>
              `,
              className: 'route-stop-pin',
              iconSize: [26, 26],
              iconAnchor: [13, 13],
            })

            const marker = Leaflet.marker([stop.lat, stop.lng], { icon: stopIcon })
            marker.bindTooltip(
              `<div style="font-family: inherit; font-size: 11px; font-weight: 700; padding: 3px 6px;">${index + 1}. ${stop.name[lang]}</div>`,
              { direction: 'top', offset: [0, -12] }
            )
            marker.on('click', () => {
              map.flyTo([stop.lat, stop.lng], Math.max(map.getZoom(), 8), { duration: 1 })
            })
            marker.addTo(routesGroup)
          })
        }
      }

      // 2. Sacred Sites Markers
      if (showSites) {
        filteredSites.forEach((site) => {
          const isMountain = site.type === 'mountain'
          const isSanctuary = site.type === 'sanctuary'
          const isWell = site.type === 'well'
          const bgCol = isSanctuary
            ? '#e9c67b'
            : isMountain
              ? '#38bdf8'
              : isWell
                ? '#34d399'
                : '#f472b6'

          const isSelected = selectedSite?.id === site.id

          const iconHtml = `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: ${isSelected ? '28px' : '22px'};
              height: ${isSelected ? '28px' : '22px'};
              border-radius: 50%;
              background: #080b1c;
              border: 1.5px solid ${bgCol};
              box-shadow: 0 0 ${isSelected ? '18px 4px' : '10px 1px'} ${bgCol};
              cursor: pointer;
              transition: all 0.25s ease;
            ">
              <div style="width: ${isSelected ? '10px' : '7px'}; height: ${isSelected ? '10px' : '7px'}; border-radius: 50%; background: ${bgCol};"></div>
            </div>
          `

          const siteIcon = Leaflet.divIcon({
            html: iconHtml,
            className: 'site-pin-glow',
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          })

          const marker = Leaflet.marker([site.lat, site.lng], { icon: siteIcon })
          marker.on('click', () => {
            setSelectedSite(site)
            setSelectedId(null)
            setSelectedRouteId(null)
            map.flyTo([site.lat, site.lng], Math.max(map.getZoom(), 8), { duration: 1 })
          })
          marker.bindTooltip(
            `<div style="font-family: inherit; font-size: 11px; font-weight: bold; padding: 2px 4px;">${site.name[lang]}</div>`,
            { direction: 'top', offset: [0, -10] },
          )
          marker.addTo(sitesGroup)
        })
      }

      // 3. Prophet Markers
      prophets.forEach((p) => {
        if (!p.topography?.mapCoordinates) return
        const isVisible = activeProphetIds.has(p.id)
        if (!isVisible) return

        const { lat, lng } = p.topography.mapCoordinates
        const isSelected = selectedId === p.id
        const isUlul = p.ululAzm

        const orbColor = isSelected ? '#ffffff' : '#e9c67b'
        const borderColor = isUlul ? '#fbe6b0' : 'rgba(233, 198, 123, 0.8)'
        const pulseAnim = isSelected ? 'animation: pulse-ring 2s infinite;' : ''

        const iconHtml = `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; user-select: none;">
            <div style="
              position: relative;
              width: ${isSelected ? '32px' : '26px'};
              height: ${isSelected ? '32px' : '26px'};
              border-radius: 50%;
              background: radial-gradient(circle at 35% 35%, #fff, ${orbColor} 60%, #8a6327 100%);
              border: 2px solid ${borderColor};
              box-shadow: 0 0 ${isSelected ? '24px 6px' : '12px 2px'} rgba(233, 198, 123, 0.85);
              transition: all 0.3s ease;
              ${pulseAnim}
            "></div>
            <div style="
              margin-top: 4px;
              background: rgba(8, 11, 28, 0.88);
              border: 1px solid rgba(233, 198, 123, 0.35);
              backdrop-filter: blur(8px);
              padding: 2px 8px;
              border-radius: 12px;
              color: #fbe6b0;
              font-family: 'Reem Kufi Variable', serif;
              font-size: 13px;
              font-weight: 600;
              white-space: nowrap;
              box-shadow: 0 4px 12px rgba(0,0,0,0.7);
            ">
              ${p.name.ar}
            </div>
          </div>
        `

        const markerIcon = Leaflet.divIcon({
          html: iconHtml,
          className: 'prophet-pin-glow',
          iconSize: [80, 50],
          iconAnchor: [40, 15],
        })

        const marker = Leaflet.marker([lat, lng], { icon: markerIcon })
        marker.on('click', () => {
          setSelectedId(p.id)
          setSelectedSite(null)
          setSelectedRouteId(null)
          map.flyTo([lat, lng], Math.max(map.getZoom(), 7), { duration: 1.2 })
        })
        marker.addTo(markersGroup)
      })

      markersGroup.addTo(map)
      sitesGroup.addTo(map)
      routesGroup.addTo(map)

      layersRef.current.markersGroup = markersGroup
      layersRef.current.sitesGroup = sitesGroup
      layersRef.current.routesGroup = routesGroup
    })
  }, [activeProphetIds, selectedId, selectedSite, selectedRouteId, filteredSites, showSites, showRoutes, mapReady, lang, selectedRoute])

  // Center on initial focus if provided
  useEffect(() => {
    if (!focus || !mapInstance.current || !mapReady) return
    const p = byId.get(focus)
    if (p?.topography?.mapCoordinates) {
      mapInstance.current.flyTo(
        [p.topography.mapCoordinates.lat, p.topography.mapCoordinates.lng],
        7,
        { duration: 1.5 },
      )
    }
  }, [focus, mapReady])

  const flyToProphet = (p: Person) => {
    setSelectedId(p.id)
    setSelectedSite(null)
    setSelectedRouteId(null)
    setSearchQuery('')
    if (p.topography?.mapCoordinates && mapInstance.current) {
      mapInstance.current.flyTo(
        [p.topography.mapCoordinates.lat, p.topography.mapCoordinates.lng],
        7,
        { duration: 1.2 },
      )
    }
  }

  const flyToSite = (site: SacredSitePin) => {
    setSelectedSite(site)
    setSelectedId(null)
    setSelectedRouteId(null)
    setSearchQuery('')
    if (mapInstance.current) {
      mapInstance.current.flyTo([site.lat, site.lng], 8, { duration: 1.2 })
    }
  }

  const handleSelectRoute = (r: PropheticRoute) => {
    setSelectedRouteId(r.id)
    setSelectedId(null)
    setSelectedSite(null)
    setShowRouteList(false)
    setSearchQuery('')

    if (mapInstance.current) {
      import('leaflet').then((leafletModule) => {
        const Leaflet = leafletModule.default || leafletModule
        const bounds = Leaflet.latLngBounds(r.coords)
        mapInstance.current?.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 })
      })
    }
  }

  const flyToWaypoint = (wp: RouteWaypoint) => {
    if (mapInstance.current) {
      mapInstance.current.flyTo([wp.lat, wp.lng], 9, { duration: 1 })
    }
  }

  const resetView = () => {
    setSelectedId(null)
    setSelectedSite(null)
    setSelectedRouteId(null)
    if (mapInstance.current) {
      mapInstance.current.flyTo([27.0, 39.5], 5, { duration: 1 })
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-night">
      {/* Map Target Container */}
      <div ref={mapContainer} className="h-full w-full outline-none" tabIndex={0} />

      {/* Floating Header Controls */}
      <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-center justify-between gap-2.5 sm:inset-x-6 sm:top-4">
        {/* Style & Layer Toggles */}
        <div className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5 shadow-xl">
          <button
            type="button"
            onClick={() => setMapStyle('satellite')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              mapStyle === 'satellite'
                ? 'bg-gold/30 text-gold-2 shadow-sm'
                : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Compass className="size-3.5" />
            <span>Satellite</span>
          </button>
          <button
            type="button"
            onClick={() => setMapStyle('dark')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              mapStyle === 'dark'
                ? 'bg-gold/30 text-gold-2 shadow-sm'
                : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Sparkles className="size-3.5" />
            <span>Dark</span>
          </button>
          <button
            type="button"
            onClick={() => setMapStyle('terrain')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              mapStyle === 'terrain'
                ? 'bg-gold/30 text-gold-2 shadow-sm'
                : 'text-ink-3 hover:text-ink'
            }`}
          >
            <Mountain className="size-3.5" />
            <span>Terrain</span>
          </button>
        </div>

        {/* Feature Toggles (Sites, Routes, Route Picker) */}
        <div className="glass pointer-events-auto flex items-center gap-1.5 rounded-full p-1.5 text-xs shadow-xl">
          <button
            type="button"
            onClick={() => setShowSites((v) => !v)}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              showSites ? 'bg-sky-400/20 text-sky-200' : 'text-ink-3 hover:text-ink'
            }`}
            title="Toggle Sacred Sites"
          >
            <MapPin className="me-1 inline size-3" />
            <span>{t('sacredSites')}</span>
            <span className="ms-1.5 rounded-full bg-sky-400/30 px-1.5 py-0.2 text-[0.65rem] font-bold">
              {filteredSites.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowRoutes((v) => !v)}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              showRoutes ? 'bg-emerald-400/20 text-emerald-200' : 'text-ink-3 hover:text-ink'
            }`}
            title="Toggle Routes"
          >
            <Navigation className="me-1 inline size-3" />
            <span>{t('missionRoute')}</span>
            <span className="ms-1.5 rounded-full bg-emerald-400/30 px-1.5 py-0.2 text-[0.65rem] font-bold">
              {ROUTES.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowRouteList((v) => !v)}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              showRouteList || selectedRouteId
                ? 'bg-gold/30 text-gold-2 shadow-sm'
                : 'text-ink-3 hover:text-ink'
            }`}
            title="Browse Prophetic Journeys"
          >
            <Waypoints className="me-1 inline size-3" />
            <span>{t('routesTitle')}</span>
          </button>

          <button
            type="button"
            onClick={resetView}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-ink-3 hover:text-gold transition-colors"
            title={t('resetView')}
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Filter Bars: Eras & Sacred Site Categories */}
      <div className="pointer-events-none absolute inset-x-3 top-14 z-10 flex flex-col items-center gap-2 sm:inset-x-6 sm:top-16">
        {/* Era Filter Bar */}
        <div className="glass pointer-events-auto flex flex-wrap items-center justify-center gap-1 rounded-2xl p-1 shadow-xl max-w-2xl">
          {ERAS.map((era) => (
            <button
              key={era.id}
              type="button"
              onClick={() => setActiveEra(era.id)}
              className={`rounded-xl px-2.5 py-0.5 text-xs transition-colors ${
                activeEra === era.id
                  ? 'border border-gold/40 bg-gold/20 text-gold-2 font-medium shadow-sm'
                  : 'text-ink-3 hover:text-ink hover:bg-white/5'
              }`}
            >
              {era.label[lang]}
            </button>
          ))}
        </div>

        {/* Sacred Site Category Bar (When Sites Enabled) */}
        {showSites && (
          <div className="glass pointer-events-auto flex flex-wrap items-center justify-center gap-1 rounded-2xl p-1 shadow-lg text-[0.7rem] max-w-xl">
            <button
              type="button"
              onClick={() => setSiteCategory('all')}
              className={`rounded-lg px-2.5 py-0.5 transition-colors ${
                siteCategory === 'all'
                  ? 'bg-white/20 text-ink font-semibold'
                  : 'text-ink-3 hover:text-ink'
              }`}
            >
              {t('siteCategoryAll')} ({siteCounts.all})
            </button>
            <button
              type="button"
              onClick={() => setSiteCategory('sanctuary')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-0.5 transition-colors ${
                siteCategory === 'sanctuary'
                  ? 'bg-amber-400/20 text-amber-200 font-semibold'
                  : 'text-ink-3 hover:text-ink'
              }`}
            >
              <Landmark className="size-3 text-amber-300" />
              <span>{t('siteCategorySanctuary')}</span> ({siteCounts.sanctuary})
            </button>
            <button
              type="button"
              onClick={() => setSiteCategory('mountain')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-0.5 transition-colors ${
                siteCategory === 'mountain'
                  ? 'bg-sky-400/20 text-sky-200 font-semibold'
                  : 'text-ink-3 hover:text-ink'
              }`}
            >
              <Mountain className="size-3 text-sky-300" />
              <span>{t('siteCategoryMountain')}</span> ({siteCounts.mountain})
            </button>
            <button
              type="button"
              onClick={() => setSiteCategory('well')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-0.5 transition-colors ${
                siteCategory === 'well'
                  ? 'bg-emerald-400/20 text-emerald-200 font-semibold'
                  : 'text-ink-3 hover:text-ink'
              }`}
            >
              <Droplets className="size-3 text-emerald-300" />
              <span>{t('siteCategoryWell')}</span> ({siteCounts.well})
            </button>
            <button
              type="button"
              onClick={() => setSiteCategory('city')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-0.5 transition-colors ${
                siteCategory === 'city'
                  ? 'bg-pink-400/20 text-pink-200 font-semibold'
                  : 'text-ink-3 hover:text-ink'
              }`}
            >
              <Castle className="size-3 text-pink-300" />
              <span>{t('siteCategoryCity')}</span> ({siteCounts.city})
            </button>
          </div>
        )}
      </div>

      {/* Prophetic Journeys Modal / Dropdown Picker */}
      {showRouteList && (
        <div className="glass-strong absolute inset-x-4 top-28 z-30 mx-auto max-w-xl rounded-3xl border border-gold/40 p-4 shadow-2xl backdrop-blur-xl sm:top-32">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Waypoints className="size-4 text-gold" />
              <h3 className="text-sm font-bold text-ink">{t('routesTitle')}</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowRouteList(false)}
              className="rounded-full p-1 text-ink-3 hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="mt-3 max-h-[60vh] space-y-2 overflow-y-auto pe-1">
            {ROUTES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRoute(r)}
                className={`flex w-full flex-col items-start rounded-2xl border p-3 text-start transition-all ${
                  selectedRouteId === r.id
                    ? 'border-gold bg-gold/15 shadow-md'
                    : 'border-white/5 bg-white/[0.02] hover:border-gold/40 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-3 shrink-0 rounded-full"
                      style={{ backgroundColor: r.color, boxShadow: `0 0 8px ${r.color}` }}
                    />
                    <span className="text-xs font-bold text-ink">{r.name[lang]}</span>
                  </div>
                  <span className="ar-name text-sm text-gold">{r.name.ar}</span>
                </div>
                <p className="mt-1.5 text-[0.7rem] leading-relaxed text-ink-3 line-clamp-2">
                  {r.desc[lang]}
                </p>
                <div className="mt-2 flex items-center justify-between w-full text-[0.65rem] text-ink-3">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-gold-2">
                    {r.period[lang]}
                  </span>
                  <span>{r.stops.length} waypoints</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Universal Search Widget */}
      <div className="pointer-events-none absolute start-3 top-36 z-20 w-72 sm:start-6 sm:top-40">
        <div className="glass pointer-events-auto relative rounded-2xl p-1.5 shadow-xl">
          <div className="relative flex items-center">
            <Search className="size-4 absolute start-3 text-ink-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-xl bg-black/40 py-1.5 ps-9 pe-3 text-xs text-ink placeholder:text-ink-3 focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute end-2 text-ink-3 hover:text-ink"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Unified Search Dropdown Results */}
          {hasSearchResults && (
            <div className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-night-2/95 p-1.5 backdrop-blur shadow-2xl space-y-2">
              {/* Prophets */}
              {searchResults.prophets.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-gold">
                    {t('statProphets')}
                  </div>
                  {searchResults.prophets.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => flyToProphet(p)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-start text-xs text-ink hover:bg-gold/15 transition-colors"
                    >
                      <span className="font-semibold text-gold-2">{pick(p.name)}</span>
                      <span className="ar-name text-sm text-gold">{p.name.ar}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Sacred Sites */}
              {searchResults.sites.length > 0 && (
                <div className="border-t border-white/5 pt-1.5">
                  <div className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-sky-400">
                    {t('sacredSites')}
                  </div>
                  {searchResults.sites.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => flyToSite(s)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-start text-xs text-ink hover:bg-sky-400/15 transition-colors"
                    >
                      <span className="font-semibold text-sky-200">{s.name[lang]}</span>
                      <span className="text-[0.65rem] uppercase text-ink-3">{s.type}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Routes */}
              {searchResults.routes.length > 0 && (
                <div className="border-t border-white/5 pt-1.5">
                  <div className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-400">
                    {t('routesTitle')}
                  </div>
                  {searchResults.routes.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleSelectRoute(r)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-start text-xs text-ink hover:bg-emerald-400/15 transition-colors"
                    >
                      <span className="font-semibold text-emerald-200">{r.name[lang]}</span>
                      <span className="ar-name text-xs text-gold">{r.name.ar}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Route Drawer */}
      {selectedRoute && !selectedPerson && (
        <aside className="glass-strong absolute inset-x-3 bottom-3 z-30 flex max-h-[82vh] flex-col overflow-hidden rounded-3xl border border-emerald-400/40 p-4 shadow-2xl sm:inset-x-auto sm:end-6 sm:top-20 sm:bottom-6 sm:w-[420px]">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: selectedRoute.color, boxShadow: `0 0 8px ${selectedRoute.color}` }}
                />
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-emerald-300">
                  {selectedRoute.period[lang]}
                </span>
              </div>
              <h3 className="mt-1 text-base font-bold text-ink sm:text-lg">{selectedRoute.name[lang]}</h3>
              <p className="ar-name text-xl font-bold text-gold">{selectedRoute.name.ar}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedRouteId(null)}
              className="rounded-full p-1 text-ink-3 hover:bg-white/10 hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-ink-2">
            {selectedRoute.desc[lang]}
          </p>

          {/* Associated Prophet Jump Button */}
          {byId.get(selectedRoute.prophetId) && (
            <div className="mt-3 flex items-center justify-between rounded-xl border border-gold/30 bg-gold/10 p-2.5">
              <div className="flex items-center gap-2">
                <Footprints className="size-4 text-gold" />
                <span className="text-xs font-semibold text-gold-2">
                  {t('relatedProphet')}: {pick(byId.get(selectedRoute.prophetId)!.name)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const p = byId.get(selectedRoute.prophetId)!
                  setSelectedId(p.id)
                  setSelectedRouteId(null)
                }}
                className="rounded-lg bg-gold/20 px-2 py-1 text-[0.65rem] font-bold text-gold hover:bg-gold/30"
              >
                {t('openProfile')}
              </button>
            </div>
          )}

          {/* Chronological Waypoints List */}
          <div className="mt-4 flex-1 overflow-y-auto pe-1 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-gold">
              <div className="flex items-center gap-1.5">
                <Waypoints className="size-3.5" />
                <span>{t('routeWaypoints')}</span>
              </div>
              <span className="text-ink-3 text-[0.7rem]">{selectedRoute.stops.length} stations</span>
            </div>

            {selectedRoute.stops.map((stop, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-emerald-400/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-[0.65rem] font-extrabold text-emerald-300">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-ink">{stop.name[lang]}</span>
                  </div>
                  <span className="ar-name text-xs text-gold">{stop.name.ar}</span>
                </div>

                <p className="mt-1.5 ps-7 text-[0.7rem] leading-relaxed text-ink-3">
                  {stop.desc[lang]}
                </p>

                <div className="mt-2 flex items-center justify-between ps-7 text-[0.65rem]">
                  {stop.quranRef ? (
                    <span className="rounded bg-white/5 px-1.5 py-0.5 text-sky-300 font-mono">
                      {stop.quranRef}
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => flyToWaypoint(stop)}
                    className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-medium"
                  >
                    <span>{t('flyToWaypoint')}</span>
                    <Maximize2 className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Selected Sacred Site Drawer */}
      {selectedSite && !selectedPerson && (
        <aside className="glass-strong absolute inset-x-3 bottom-3 z-30 flex flex-col rounded-3xl border border-sky-400/30 p-5 shadow-2xl sm:inset-x-auto sm:end-6 sm:top-20 sm:bottom-6 sm:w-[380px]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-sky-400/20 px-2.5 py-0.5 text-[0.65rem] font-bold text-sky-200 uppercase tracking-wider">
                  {selectedSite.type}
                </span>
                {selectedSite.quranRef && (
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[0.65rem] font-mono text-gold-2">
                    {selectedSite.quranRef}
                  </span>
                )}
              </div>
              <h3 className="mt-1.5 text-lg font-bold text-ink sm:text-xl">{selectedSite.name[lang]}</h3>
              <p className="ar-name text-2xl font-bold text-gold">{selectedSite.name.ar}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSite(null)}
              className="rounded-full p-1 text-ink-3 hover:bg-white/10 hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-ink-2">{selectedSite.desc[lang]}</p>

          {/* Associated Prophet link if present */}
          {selectedSite.prophetId && byId.get(selectedSite.prophetId) && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-gold/30 bg-gold/10 p-2.5">
              <span className="text-xs font-semibold text-gold-2">
                {t('relatedProphet')}: {pick(byId.get(selectedSite.prophetId)!.name)}
              </span>
              <button
                type="button"
                onClick={() => {
                  const p = byId.get(selectedSite.prophetId!)!
                  setSelectedId(p.id)
                  setSelectedSite(null)
                }}
                className="rounded-lg bg-gold/20 px-2 py-1 text-[0.65rem] font-bold text-gold hover:bg-gold/30"
              >
                {t('openProfile')}
              </button>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-ink-3">
            <span>
              <span className="font-medium text-ink-2">Coordinates:</span> {selectedSite.lat.toFixed(4)}° N, {selectedSite.lng.toFixed(4)}° E
            </span>
            <button
              type="button"
              onClick={() => {
                if (mapInstance.current) {
                  mapInstance.current.flyTo([selectedSite.lat, selectedSite.lng], 12, { duration: 1 })
                }
              }}
              className="flex items-center gap-1 text-sky-300 hover:text-sky-200 font-medium"
            >
              <span>Zoom</span>
              <Maximize2 className="size-3" />
            </button>
          </div>
        </aside>
      )}

      {/* Selected Prophet Detail Drawer */}
      {selectedPerson && (
        <aside className="glass-strong absolute inset-x-3 bottom-3 z-30 flex max-h-[82vh] flex-col overflow-hidden rounded-3xl border border-gold/40 shadow-2xl sm:inset-x-auto sm:end-6 sm:top-20 sm:bottom-6 sm:w-[420px]">
          {/* Header Image Scene */}
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-night-2">
            <Scene image={selectedPerson.image} sizes="420px" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="absolute end-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-ink-2 backdrop-blur hover:text-ink"
            >
              <X className="size-4" />
            </button>
            <div className="absolute inset-x-4 bottom-3">
              <p className="ar-name gold-text text-3xl font-bold">{selectedPerson.name.ar}</p>
              <h2 className="text-base font-semibold text-ink">
                {pick(selectedPerson.name)}
                {selectedPerson.alt && lang !== 'ar' && (
                  <span className="text-xs text-ink-3 ms-2">· {pick(selectedPerson.alt)}</span>
                )}
              </h2>
            </div>
          </div>

          {/* Drawer Body Scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* Historical Region & Modern Countries */}
            {selectedPerson.topography && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
                <div>
                  <span className="text-[0.65rem] tracking-wider uppercase text-gold font-semibold">
                    {t('region')}
                  </span>
                  <p className="text-ink font-medium">{pick(selectedPerson.topography.region)}</p>
                </div>
                <div>
                  <span className="text-[0.65rem] tracking-wider uppercase text-sky-300 font-semibold">
                    {t('modernCountries')}
                  </span>
                  <p className="text-ink-2">{pick(selectedPerson.topography.modernCountries)}</p>
                </div>
              </div>
            )}

            {/* Mission Route */}
            {selectedPerson.topography?.missionRoute && (
              <div>
                <h4 className="font-semibold text-gold mb-1">{t('missionRoute')}</h4>
                <p className="text-ink-2 leading-relaxed">{pick(selectedPerson.topography.missionRoute)}</p>
              </div>
            )}

            {/* Burial Site */}
            {selectedPerson.topography?.burialSite && (
              <div>
                <h4 className="font-semibold text-gold mb-1">{t('burialSite')}</h4>
                <FactText fact={selectedPerson.topography.burialSite} />
              </div>
            )}

            {/* Sacred Sites List */}
            {selectedPerson.topography?.sacredSites && selectedPerson.topography.sacredSites.length > 0 && (
              <div>
                <h4 className="font-semibold text-gold mb-2">{t('sacredSites')}</h4>
                <ul className="space-y-1.5">
                  {selectedPerson.topography.sacredSites.map((s, idx) => (
                    <li key={idx} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <span className="font-semibold text-ink">{pick(s.name)}</span>
                      {s.desc && <p className="text-ink-3 mt-0.5 leading-snug">{pick(s.desc)}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Biography Snippet */}
            {selectedPerson.biography && selectedPerson.biography.length > 0 && (
              <div className="border-t border-white/5 pt-3">
                <h4 className="font-semibold text-gold mb-1">{t('fullBiography')}</h4>
                <p className="text-ink-3 leading-relaxed line-clamp-4">{pick(selectedPerson.biography[0]!)}</p>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div className="border-t border-white/10 bg-night-2 p-3 flex items-center justify-between">
            <A
              href={hrefOf({ name: 'person', id: selectedPerson.id })}
              className="btn btn-gold text-xs py-2 px-4"
            >
              <span>{t('openProfile')}</span>
              <ExternalLink className="size-3.5 ms-1" />
            </A>
            <A
              href={hrefOf({ name: 'tree', focus: selectedPerson.id })}
              className="btn btn-ghost text-xs py-2 px-3.5"
            >
              <span>{t('treeView')}</span>
            </A>
          </div>
        </aside>
      )}
    </div>
  )
}
