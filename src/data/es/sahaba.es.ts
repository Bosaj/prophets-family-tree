// Spanish names for the Sahaba eras, added when the page that shows them loads. Long descriptions still show in English.
import { SAHABA_ERAS } from '../sahaba'
import { addSpanish, type Fields } from './addSpanish'

const ERAS: Record<string, Fields> = {
  all: { label: 'Todos los personajes y dinastías' },
  rashidun: { label: 'Califas bien guiados' },
  mubasharun: { label: 'Los diez prometidos al Paraíso' },
  prophetic_ahlulbayt: { label: 'El Profeta y su familia' },
  sahaba_luminaries: { label: 'Compañeros eminentes' },
  hadith_scholars: { label: 'Maestros y guardianes del hadiz' },
  umayyad: { label: 'Califato omeya' },
  cordoba: { label: 'Califato de Córdoba' },
  abbasid: { label: 'Califato abasí' },
  ottoman: { label: 'Califato otomano' },
  alaouite_morocco: { label: 'Alauíes de Marruecos (hoy)' },
  hashemite_jordan: { label: 'Hachemíes de Jordania (hoy)' },
}

addSpanish(SAHABA_ERAS, ERAS)
