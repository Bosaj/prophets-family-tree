// Spanish for the pre-Adam entries and the angels (names, subtitles, nature, era, cautions, roles), added when the
// page that shows them loads. The long descriptions still show in English.
import { FAMOUS_ANGELS, PRE_ADAM_ENTITIES } from '../preAdam'
import { addSpanish, type Fields } from './addSpanish'

const PRE_ADAM: Record<string, Fields> = {
  angels: {
    name: 'Al-Mala’ika (los ángeles de luz)',
    era: 'Antes de Adán',
    subTitle: 'Creados de luz antes de Adán; se postraron por orden de Allah',
    nature: 'Seres nobles creados de luz (nur), con alas, que nunca desobedecen y cumplen sin cesar las órdenes de Allah',
  },
  jinn: {
    name: 'Al-Yinn (habitantes anteriores a Adán)',
    era: 'Antes de Adán (15:27)',
    subTitle: 'Creados de fuego sin humo, antes de la humanidad',
    nature: 'Creados de una llama de fuego sin humo (mariy min nar / nar as-samum)',
    caution: 'Solo su creación de fuego antes del hombre está en el Corán. Los «dos mil años» y los ángeles que los expulsaron vienen de relatos, no del Corán ni de un hadiz auténtico.',
  },
  iblis: {
    name: 'Iblis (Shaytan)',
    era: 'Antes y durante la creación de Adán',
    subTitle: 'De los genios; se negó por soberbia a postrarse ante Adán y se convirtió en enemigo declarado de la humanidad',
    nature: 'Creado de fuego sin humo; según los relatos alcanzó un alto rango por su adoración y luego cayó en la soberbia',
  },
  hinn_binn: {
    name: 'Al-Hinn y Al-Binn (en los relatos de los historiadores)',
    era: 'Tierra primitiva',
    subTitle: 'Un relato de algunas crónicas, no establecido',
    nature: 'Descritos en los relatos como criaturas terrestres que sembraron la corrupción',
    caution: 'Los nombres al-Hinn y al-Binn vienen de relatos tardíos atribuidos a Ibn ‘Abbas y de las isra’iliyyat; no están en el Corán ni en un hadiz auténtico. Los sabios los citan solo como relatos no establecidos.',
  },
  nasnas: {
    name: 'Al-Nasnas (en los léxicos y el folclore)',
    era: 'No establecida',
    subTitle: 'Descrito por los lexicógrafos, nunca por el Corán ni un hadiz auténtico',
    nature: 'Descrito en los léxicos como una criatura con forma humana que no es de la descendencia de Adán',
    caution: 'Los Nasnas aparecen en léxicos y en el folclore, no en el Corán ni en un hadiz auténtico. Vincularlos con homínidos fósiles es una especulación moderna, no un resultado de la ciencia ni de la erudición islámica.',
  },
  angels_dialogue: {
    name: 'El diálogo celestial: por qué preguntaron los ángeles (2:30)',
    era: 'El comienzo de la humanidad',
    subTitle: 'La sabiduría divina de nombrar a la humanidad sucesora en la tierra',
    nature: 'Proclamación coránica y diálogo entre el Señor de los mundos y los ángeles',
  },
}

const ANGELS: Record<string, Fields> = {
  jibril: { name: 'Yibril / Gabriel (el Espíritu de la Verdad)', role: 'Ángel de la Revelación (wahy) a todos los profetas, el más alto de los ángeles.' },
  mikail: { name: 'Mika’il / Miguel (ángel del sustento y la lluvia)', role: 'Encargado de la lluvia, de mover las nubes y del sustento de la tierra.' },
  israfil: { name: 'Israfil (el ángel de la Trompeta)', role: 'Encargado de soplar la Trompeta (as-Sur) para el fin del mundo y para la Resurrección.' },
  malak_al_mawt: { name: 'Malak al-Mawt (el ángel de la muerte)', role: 'Encargado de tomar las almas de los seres humanos, los genios y las criaturas a su término fijado.' },
  hamalat_al_arsh: { name: 'Hamalat al-‘Arsh (los portadores del Trono)', role: 'Portan el Trono divino (ocho el Día de la Resurrección, 69:17), glorifican a Allah y piden perdón para los creyentes.' },
  malik_and_zabaniyah: { name: 'Malik y los diecinueve guardianes', role: 'Guardián del Fuego y los diecinueve ángeles severos que ejecutan la justicia divina (74:30).' },
  ridwan: { name: 'Ridwan (el guardián del Paraíso)', role: 'Guardián del Paraíso, que recibe a los justos por sus ocho puertas.' },
  munkar_and_nakir: { name: 'Munkar y Nakir (los que interrogan en la tumba)', role: 'Los dos ángeles que preguntan al difunto en la tumba por su Señor, su religión y su Profeta.' },
  kiraman_katibin: { name: 'Kiraman Katibin y al-Mu‘aqqibat', role: 'Escribas nobles que registran palabras y obras, y guardianes que protegen a los seres humanos.' },
  harut_and_marut: { name: 'Harut y Marut (la prueba de Babilonia)', role: 'Enviados a la antigua Babilonia como prueba, para mostrar el engaño de la magia.' },
}

addSpanish(PRE_ADAM_ENTITIES, PRE_ADAM)
addSpanish(FAMOUS_ANGELS, ANGELS)
for (const e of PRE_ADAM_ENTITIES) {
  const list = (e as { famousAngels?: { id: string }[] }).famousAngels
  if (list) addSpanish(list, ANGELS)
}
