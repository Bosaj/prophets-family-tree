import type { L4, Link } from '../data/types'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

/** Women and girls in the prophets' tree, so a line can say "daughter" or "wife" rather than "child". */
const FEMALE = new Set([
  'hawwa', 'sarah', 'hajar', 'safura', 'maryam',
  'khadijah', 'sawdah', 'aisha', 'hafsah', 'zaynab_khuzaymah', 'umm_salamah', 'zaynab_jahsh',
  'juwayriyah', 'umm_habibah', 'safiyyah', 'maymunah', 'mariyah',
  'zaynab_m', 'ruqayyah', 'umm_kulthum', 'fatimah',
])

export const isFemale = (id: string) => FEMALE.has(id)

const SON = t('Son', 'Fils', 'ابنه', 'Hijo')
const SON_OF_MOTHER = t('Son', 'Fils', 'ابنها', 'Hijo')
const DAUGHTER = t('Daughter', 'Fille', 'ابنته', 'Hija')
const DAUGHTER_OF_MOTHER = t('Daughter', 'Fille', 'ابنتها', 'Hija')
const WIFE = t('Wife', 'Épouse', 'زوجته', 'Esposa')
const NEPHEW = t('Nephew', 'Neveu', 'ابن أخيه', 'Sobrino')
const DESCENDANT = t('Descendant', 'Descendant', 'من ذريته', 'Descendiente')
const MAYBE_SON = t('Possibly his son', 'Peut-être son fils', 'قيل: ابنه', 'Posiblemente su hijo')
const BROTHERS = t('Brothers', 'Frères', 'أخوان', 'Hermanos')
const MATERNAL_COUSINS = t('Maternal cousins', 'Cousins maternels', 'ابنا خالة', 'Primos maternos')
const GUARDIAN = t('Her guardian', 'Son tuteur', 'كفيلها', 'Su tutor')

/**
 * The name of a line in the tree, read from `from` to `to`: "Ibrahim → Lut: nephew".
 * Mothers' lines say "her son", fathers' lines "his son", because Arabic marks it.
 */
export function relationLabel(link: Link): L4 {
  const female = isFemale(link.to)
  const fromMother = isFemale(link.from)
  switch (link.type) {
    case 'parent':
    case 'child':
      if (fromMother) return female ? DAUGHTER_OF_MOTHER : SON_OF_MOTHER
      return female ? DAUGHTER : SON
    case 'spouse':
      return WIFE
    case 'nephew':
      return NEPHEW
    case 'descendant':
      return DESCENDANT
    case 'maybe-parent':
      return MAYBE_SON
    case 'sibling':
      return BROTHERS
    case 'cousin':
      return MATERNAL_COUSINS
    case 'guardian':
      return GUARDIAN
  }
}

/**
 * A point along an edge path, `at` = 0 at the parent and 1 at the child. Labels sit a little before the
 * middle (0.42), so the child's name pill does not cover them. Paths are "M x y L x y" or a cubic "M x y C …".
 */
export function pathPoint(d: string, at = 0.42): { x: number; y: number } {
  const n = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
  if (n.length >= 8) {
    const [x0, y0, x1, y1, x2, y2, x3, y3] = n as [number, number, number, number, number, number, number, number]
    const u = 1 - at
    const a = u * u * u, b = 3 * u * u * at, c = 3 * u * at * at, e = at * at * at
    return { x: a * x0 + b * x1 + c * x2 + e * x3, y: a * y0 + b * y1 + c * y2 + e * y3 }
  }
  const [x0 = 0, y0 = 0, x1 = x0, y1 = y0] = n
  return { x: x0 + (x1 - x0) * at, y: y0 + (y1 - y0) * at }
}
