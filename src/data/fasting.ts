// The recommended fasting days a reader can be reminded of, and the days on which fasting is not allowed.
// Every Arabic hadith is copied from the hadith it cites and checked by `npm run verify:duas`.
import type { L4, Level, Ref } from './types'
import type { Supplication } from './duas'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })
const q = (id: string, ar: string, meaning: L4, r: Ref[], extra: Partial<Supplication> = {}): Supplication => ({ id, ar, meaning, r, l: 'hadith', ...extra })

export type FastKind = 'white' | 'tasua' | 'ashura' | 'arafah' | 'ramadan' | 'fitr' | 'adha'

export interface FastInfo {
  kind: FastKind
  /** Fasting is recommended (sunnah), begins (Ramadan), or not allowed (the Eids). */
  rule: 'sunnah' | 'ramadan' | 'forbidden'
  title: L4
  /** One line for the reminder. */
  why: L4
  l: Level
  r: Ref[]
}

export const FAST_INFO: Record<FastKind, FastInfo> = {
  white: {
    kind: 'white',
    rule: 'sunnah',
    title: t('The white days', 'Les jours blancs', 'الأيام البيض', 'Los días blancos'),
    why: t(
      'The 13th, 14th and 15th of each Hijri month: the Prophet ﷺ told Abu Dharr to fast them.',
      'Les 13, 14 et 15 de chaque mois hégirien : le Prophète ﷺ a dit à Abu Dharr de les jeûner.',
      'الثالث عشر والرابع عشر والخامس عشر من كل شهر هجري، أمر النبي ﷺ أبا ذر بصيامها.',
      'Los días 13, 14 y 15 de cada mes hégira: el Profeta ﷺ dijo a Abu Dharr que los ayunara.',
    ),
    l: 'hadith',
    r: ['tirmidhi:761', 'bukhari:1178'],
  },
  tasua: {
    kind: 'tasua',
    rule: 'sunnah',
    title: t('Tasu‘a (9 Muharram)', 'Tasu‘a (9 Mouharram)', 'تاسوعاء (9 محرم)', 'Tasu‘a (9 de Muharram)'),
    why: t(
      'The Prophet ﷺ intended to fast the 9th with ‘Ashura.',
      'Le Prophète ﷺ avait l’intention de jeûner le 9 avec ‘Achoura.',
      'عزم النبي ﷺ على صيام التاسع مع عاشوراء.',
      'El Profeta ﷺ tenía la intención de ayunar el 9 junto con ‘Ashura.',
    ),
    l: 'hadith',
    r: ['muslim:1134'],
  },
  ashura: {
    kind: 'ashura',
    rule: 'sunnah',
    title: t('‘Ashura (10 Muharram)', '‘Achoura (10 Mouharram)', 'عاشوراء (10 محرم)', '‘Ashura (10 de Muharram)'),
    why: t('Fasting it expiates the year before.', 'Son jeûne expie l’année précédente.', 'صيامه يكفّر السنة التي قبله.', 'Ayunarlo expía el año anterior.'),
    l: 'hadith',
    r: ['muslim:1162'],
  },
  arafah: {
    kind: 'arafah',
    rule: 'sunnah',
    title: t('Day of ‘Arafah (9 Dhu al-Hijjah)', 'Jour de ‘Arafa (9 Dhou al-Hijja)', 'يوم عرفة (9 ذو الحجة)', 'Día de ‘Arafa (9 de Dhu al-Hiyya)'),
    why: t(
      'For those not on Hajj, fasting it expiates the year before and the year after.',
      'Pour qui n’est pas au Hajj, son jeûne expie l’année précédente et la suivante.',
      'لغير الحاج، صيامه يكفّر السنة التي قبله والتي بعده.',
      'Para quien no está en el Hayy, ayunarlo expía el año anterior y el siguiente.',
    ),
    l: 'hadith',
    r: ['muslim:1162'],
  },
  ramadan: {
    kind: 'ramadan',
    rule: 'ramadan',
    title: t('First day of Ramadan', 'Premier jour de Ramadan', 'أول أيام رمضان', 'Primer día de Ramadán'),
    why: t(
      'Expected date: the month begins with your country’s announcement of the crescent.',
      'Date attendue : le mois commence avec l’annonce du croissant dans votre pays.',
      'تاريخ متوقع، ويبدأ الشهر بإعلان بلدك ثبوت الهلال.',
      'Fecha prevista: el mes empieza con el anuncio de la luna nueva en tu país.',
    ),
    l: 'quran',
    r: ['2:185'],
  },
  fitr: {
    kind: 'fitr',
    rule: 'forbidden',
    title: t('Eid al-Fitr', 'Aïd al-Fitr', 'عيد الفطر', 'Eid al-Fitr'),
    why: t('A day of Eid: fasting is not allowed.', 'Jour de fête : le jeûne n’y est pas permis.', 'يوم عيد يحرم صومه.', 'Día de Eid: no se permite ayunar.'),
    l: 'hadith',
    r: ['bukhari:1992'],
  },
  adha: {
    kind: 'adha',
    rule: 'forbidden',
    title: t('Eid al-Adha', 'Aïd al-Adha', 'عيد الأضحى', 'Eid al-Adha'),
    why: t(
      'A day of Eid, followed by the three days of tashriq: fasting is not allowed on them.',
      'Jour de fête, suivi des trois jours de tachriq : le jeûne n’y est pas permis.',
      'يوم عيد تليه أيام التشريق الثلاثة، ولا يُصام فيها.',
      'Día de Eid, seguido de los tres días de tashriq: no se permite ayunar en ellos.',
    ),
    l: 'hadith',
    r: ['bukhari:1992', 'muslim:1141'],
  },
}

export const FAST_QUOTES: (Supplication & { where: string })[] = [
  {
    where: 'fasting/white',
    ...q(
      'white',
      'يَا أَبَا ذَرٍّ إِذَا صُمْتَ مِنَ الشَّهْرِ ثَلاَثَةَ أَيَّامٍ فَصُمْ ثَلاَثَ عَشْرَةَ وَأَرْبَعَ عَشْرَةَ وَخَمْسَ عَشْرَةَ',
      t(
        'O Abu Dharr, when you fast three days of the month, fast the thirteenth, the fourteenth and the fifteenth.',
        'Ô Abu Dharr, quand tu jeûnes trois jours du mois, jeûne le treize, le quatorze et le quinze.',
        'وصية النبي ﷺ لأبي ذر في الأيام البيض.',
        'Oh Abu Dharr, cuando ayunes tres días del mes, ayuna el trece, el catorce y el quince.',
      ),
      ['tirmidhi:761'],
      { grade: t('Hasan sahih (al-Albani)', 'Hasan sahih (al-Albani)', 'حسن صحيح (الألباني)', 'Hasan sahih (al-Albani)') },
    ),
  },
  {
    where: 'fasting/tashriq',
    ...q(
      'tashriq',
      'أَيَّامُ التَّشْرِيقِ أَيَّامُ أَكْلٍ وَشُرْبٍ',
      t('The days of tashriq are days of eating and drinking.', 'Les jours de tachriq sont des jours où l’on mange et boit.', 'لذلك لا يُصام الثالث عشر من ذي الحجة.', 'Los días de tashriq son días de comer y beber.'),
      ['muslim:1141'],
    ),
  },
]

export const FAST_REFS: { where: string; r: Ref[] }[] = Object.values(FAST_INFO).map((f) => ({ where: `fasting/${f.kind}`, r: f.r }))

export const FAST_UI = {
  title: t('Fasting reminders', 'Rappels de jeûne', 'تذكير بالصيام', 'Recordatorios de ayuno'),
  lead: t(
    'The next recommended fasting days for your place, and the Eids. Add them to your phone’s calendar: each comes with a reminder at 8 pm the evening before.',
    'Les prochains jours de jeûne recommandés pour votre lieu, et les Aïds. Ajoutez-les au calendrier de votre téléphone : chacun a un rappel à 20 h la veille.',
    'أيام الصيام المستحبة القادمة في مكانك، والعيدان. أضفها إلى تقويم هاتفك: لكل يوم تذكير في الساعة الثامنة مساء اليوم السابق.',
    'Los próximos días de ayuno recomendados para tu lugar, y los Eid. Añádelos al calendario de tu teléfono: cada uno lleva un recordatorio a las 20 h de la víspera.',
  ),
  add: t('Add to my calendar (.ics)', 'Ajouter à mon calendrier (.ics)', 'أضف إلى تقويمي (.ics)', 'Añadir a mi calendario (.ics)'),
  estimate: t('Estimate', 'Estimation', 'تقدير', 'Estimación'),
  estimateNote: t(
    'Dates after the last announced month are computed (Umm al-Qura, or Morocco’s last announcement) and can move by a day: check your country’s announcement. Download the file again after each new month.',
    'Les dates au-delà du dernier mois annoncé sont calculées (Umm al-Qura, ou la dernière annonce du Maroc) et peuvent varier d’un jour : vérifiez l’annonce de votre pays. Retéléchargez le fichier après chaque nouveau mois.',
    'التواريخ بعد آخر شهر معلن محسوبة (أم القرى أو آخر إعلان في المغرب) وقد تختلف يومًا، فراجع إعلان بلدك، وأعد تنزيل الملف بعد كل شهر جديد.',
    'Las fechas posteriores al último mes anunciado se calculan (Umm al-Qura, o el último anuncio de Marruecos) y pueden variar un día: comprueba el anuncio de tu país. Vuelve a descargar el archivo tras cada mes nuevo.',
  ),
  today: t('Today', 'Aujourd’hui', 'اليوم', 'Hoy'),
  tomorrow: t('Tomorrow', 'Demain', 'غدًا', 'Mañana'),
  recommended: t('fasting is recommended', 'le jeûne est recommandé', 'يُستحب صيامه', 'se recomienda ayunar'),
  noFast: t('no fasting', 'pas de jeûne', 'لا يُصام', 'no se ayuna'),
  reminder: t('Reminder', 'Rappel', 'تذكير', 'Recordatorio'),
  calName: t('Shajara: fasting days', 'Shajara : jours de jeûne', 'شجرة: أيام الصيام', 'Shajara: días de ayuno'),
}
