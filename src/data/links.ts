import type { L3, Link } from './types'

const t = (en: string, fr: string, ar: string): L3 => ({ en, fr, ar })

const GENERATIONS = t(
  'Descendant — the generations in between are not known for certain.',
  'Descendant — les générations intermédiaires ne sont pas connues avec certitude.',
  'من ذريته — والأجيال بينهما غير معروفة على وجه اليقين.',
)
const AFTER_FLOOD = t(
  'All later people descend from Nuh (37:77); the exact chain comes from the genealogists.',
  'Tous les hommes après lui descendent de Nuh (37:77) ; la chaîne exacte vient des généalogistes.',
  'كل من جاء بعده من ذرية نوح (37:77)، والسلسلة نفسها من كتب النسّابين.',
)
const ISRAEL = t(
  'From the Children of Israel (descendants of Ya‘qub); the exact chain comes from tradition.',
  'Parmi les Enfants d’Israël (descendants de Ya‘qub) ; la chaîne exacte vient de la tradition.',
  'من بني إسرائيل (ذرية يعقوب)، والسلسلة نفسها من الروايات.',
)

/**
 * Relationships. The first incoming parent/descendant/nephew/maybe-parent link of each person
 * is the one used to draw the tree; sibling, cousin and guardian links are drawn as arcs.
 */
export const links: Link[] = [
  { from: 'adam', to: 'shith', type: 'parent', l: 'tradition', r: ['book:qisas'] },
  { from: 'shith', to: 'idris', type: 'descendant', l: 'tradition', r: ['book:qisas'], note: GENERATIONS },
  { from: 'idris', to: 'nuh', type: 'descendant', l: 'tradition', r: ['book:qisas', '19:58'], note: GENERATIONS },
  { from: 'nuh', to: 'hud', type: 'descendant', l: 'tradition', r: ['37:77', '7:69'], note: AFTER_FLOOD },
  { from: 'nuh', to: 'salih', type: 'descendant', l: 'tradition', r: ['37:77'], note: AFTER_FLOOD },
  { from: 'nuh', to: 'azar', type: 'descendant', l: 'tradition', r: ['37:77', '19:58'], note: AFTER_FLOOD },
  {
    from: 'azar', to: 'ibrahim', type: 'parent', l: 'quran', r: ['6:74'],
    note: t('The Qur’an calls Azar his father; some scholars say Azar was his uncle.', 'Le Coran appelle Azar son père ; certains savants disent qu’Azar était son oncle.', 'سمّاه القرآن أباه، وقال بعض العلماء إنه عمّه.'),
  },
  { from: 'ibrahim', to: 'ismail', type: 'parent', l: 'quran', r: ['14:39'] },
  { from: 'ibrahim', to: 'ishaq', type: 'parent', l: 'quran', r: ['14:39', '11:71'] },
  {
    from: 'ibrahim', to: 'lut', type: 'nephew', l: 'tradition', r: ['29:26', 'book:qisas'],
    note: t('Lut believed in Ibrahim (29:26); tradition says he was his nephew.', 'Lut crut en Ibrahim (29:26) ; la tradition dit qu’il était son neveu.', 'آمن لوط لإبراهيم (29:26)، وتذكر الرواية أنه ابن أخيه.'),
  },
  {
    from: 'ibrahim', to: 'shuayb', type: 'descendant', l: 'tradition', r: ['book:qisas'],
    note: t('Through Madyan, a son of Ibrahim, according to the genealogists.', 'Par Madyan, fils d’Ibrahim, selon les généalogistes.', 'من ولد مدين بن إبراهيم عند النسّابين.'),
  },
  {
    from: 'ismail', to: 'muhammad', type: 'descendant', l: 'hadith', r: ['muslim:2276'],
    note: t('Through Kinanah, Quraysh and Banu Hashim.', 'Par Kinana, Quraysh et Banu Hachim.', 'من كنانة ثم قريش ثم بني هاشم.'),
  },
  { from: 'ishaq', to: 'yaqub', type: 'parent', l: 'quran', r: ['11:71', '21:72'] },
  {
    from: 'ishaq', to: 'ayyub', type: 'descendant', l: 'tradition', r: ['6:84', 'book:qisas'],
    note: t('Listed among the descendants (6:84); tradition traces him through ‘Is (Esau).', 'Cité parmi la descendance (6:84) ; la tradition le rattache à ‘Is (Ésaü).', 'ذُكر في الذرية (6:84)، وتنسبه الرواية إلى العيص.'),
  },
  {
    from: 'ayyub', to: 'dhulkifl', type: 'maybe-parent', l: 'disputed', r: ['book:qisas'],
    note: t('Some say Dhul-Kifl was a son of Ayyub; his identity is debated.', 'Certains disent que Dhul-Kifl était un fils d’Ayyub ; son identité est débattue.', 'قيل إن ذا الكفل ابن أيوب، واختُلف في هويته.'),
  },
  { from: 'yaqub', to: 'yusuf', type: 'parent', l: 'quran', r: ['12:4', '12:38'] },
  { from: 'yaqub', to: 'musa', type: 'descendant', l: 'tradition', r: ['book:qisas'], note: ISRAEL },
  { from: 'yaqub', to: 'harun', type: 'descendant', l: 'tradition', r: ['book:qisas'], note: ISRAEL },
  { from: 'yaqub', to: 'dawud', type: 'descendant', l: 'tradition', r: ['6:84', 'book:qisas'], note: ISRAEL },
  { from: 'dawud', to: 'sulayman', type: 'parent', l: 'quran', r: ['27:16', '38:30'] },
  { from: 'harun', to: 'ilyas', type: 'descendant', l: 'tradition', r: ['book:qisas'], note: GENERATIONS },
  { from: 'yaqub', to: 'alyasa', type: 'descendant', l: 'tradition', r: ['book:qisas'], note: ISRAEL },
  { from: 'yaqub', to: 'yunus', type: 'descendant', l: 'tradition', r: ['book:qisas'], note: ISRAEL },
  { from: 'yaqub', to: 'zakariya', type: 'descendant', l: 'tradition', r: ['book:qisas'], note: ISRAEL },
  { from: 'zakariya', to: 'yahya', type: 'parent', l: 'quran', r: ['19:7', '3:39'] },
  { from: 'yaqub', to: 'imran', type: 'descendant', l: 'tradition', r: ['3:33', 'book:qisas'], note: ISRAEL },
  { from: 'imran', to: 'maryam', type: 'parent', l: 'quran', r: ['66:12', '3:35-36'] },
  {
    from: 'maryam', to: 'isa', type: 'parent', l: 'quran', r: ['19:22-34', '3:45'],
    note: t('Born to Maryam without a father (3:47).', 'Né de Maryam sans père (3:47).', 'وُلد من مريم بلا أب (3:47).'),
  },
  { from: 'musa', to: 'harun', type: 'sibling', l: 'quran', r: ['20:29-30', '19:53'] },
  { from: 'yahya', to: 'isa', type: 'cousin', l: 'hadith', r: ['bukhari:3430'] },
  { from: 'zakariya', to: 'maryam', type: 'guardian', l: 'quran', r: ['3:37'] },
]

/** The link that places a person in the tree (its parent in the drawing). */
export const treeParent = new Map<string, Link>()
for (const k of links) {
  if (['sibling', 'cousin', 'guardian'].includes(k.type)) continue
  if (!treeParent.has(k.to)) treeParent.set(k.to, k)
}
