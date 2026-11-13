// Spanish names and short titles for the animals, plants, righteous people, stories, scriptures, pre-Adam
// entries, angels and Sahaba eras. Long descriptions still show in English until they are translated.
import { QURAN_SUNNAH_ANIMALS, QURAN_SUNNAH_PLANTS } from '../nature'
import { QURANIC_STORIES, SALIHIN_DATA } from '../salihin'
import { SCRIPTURES } from '../scriptures'
import { FAMOUS_ANGELS, PRE_ADAM_ENTITIES } from '../preAdam'
import { SAHABA_ERAS } from '../sahaba'
import type { L3 } from '../types'

type Fields = Record<string, string>

const ANIMALS: Record<string, Fields> = {
  hudhud: { name: 'La abubilla' },
  namlah: { name: 'La hormiga' },
  hut_yunus: { name: 'La ballena o gran pez' },
  naqat_salih: { name: 'La camella de Allah' },
  kalb_kahf: { name: 'El perro de la cueva' },
  baqarah: { name: 'La vaca amarilla de los Hijos de Israel' },
  fil: { name: 'El elefante' },
  nahl: { name: 'La abeja' },
  dhib_yusuf: { name: 'El lobo de Yusuf y el lobo que habló' },
  ghurab: { name: 'El cuervo' },
  ankabut: { name: 'La araña' },
  ba_udah: { name: 'El mosquito y los microorganismos' },
  khayl_adiyat: { name: 'Los corceles que galopan' },
  buraq: { name: 'Al-Buraq (la montura del Viaje Nocturno)' },
  tayr_ababil: { name: 'Las bandadas de Ababil' },
  qittah: { name: 'El gato en la Sunna' },
  hamama: { name: 'La paloma' },
}

const PLANTS: Record<string, Fields> = {
  nakhl_tamr: { name: 'La palmera y los dátiles' },
  zaytun_zayt: { name: 'El olivo y el aceite bendito' },
  tin: { name: 'El higo' },
  rumman: { name: 'La granada' },
  asal: { name: 'La miel pura' },
  habbah_sawda: { name: 'La semilla negra (Nigella sativa)' },
  yaqtin_dubba: { name: 'La calabaza' },
  sidr: { name: 'El azufaifo (sidr)' },
  talbinah: { name: 'Talbina (gachas de cebada con leche y miel)' },
  kamah: { name: 'Las trufas del desierto (kam’a)' },
  qist_hindi: { name: 'El costo indio y el costo marino' },
  arak_siwak: { name: 'El árbol del arak (siwak)' },
  zanjabil: { name: 'El jengibre' },
  battikh: { name: 'La sandía con dátiles frescos' },
}

const SALIHIN: Record<string, Fields> = {
  maryam_bint_imran: { name: 'Maryam hija de ‘Imran', title: 'Elegida sobre las mujeres de los mundos' },
  asiya_bint_muzahim: { name: 'Asiya hija de Muzahim (esposa del Faraón)', title: 'La reina que eligió el Paraíso antes que un trono' },
  luqman_al_hakim: { name: 'Luqman el Sabio', title: 'Maestro de sabiduría y gratitud' },
  al_khidr: { name: 'Al-Jidr (el siervo justo)', title: 'El sabio del decreto oculto' },
  dhul_qarnayn: { name: 'Dhul-Qarnayn (el de los dos cuernos)', title: 'El rey justo y constructor de la muralla de hierro' },
  talut: { name: 'Talut (el rey Saúl)', title: 'El jefe elegido por su saber y su fuerza' },
  ashab_al_kahf: { name: 'Los compañeros de la cueva (Ashab al-Kahf)', title: 'Los jóvenes fieles a su conciencia y la resurrección' },
  mumin_al_yasin: { name: 'El creyente de la sura Ya-Sin', title: 'El mártir del consejo sincero' },
  mumin_al_firawn: { name: 'El creyente de la familia del Faraón', title: 'La voz de la verdad en el palacio del tirano' },
  yusha_ibn_nun: { name: 'Yusha‘ ibn Nun (Josué)', title: 'El compañero fiel y conquistador de la Tierra Santa' },
}

const STORIES: Record<string, Fields> = {
  story_ashab_al_kahf: { title: 'Los compañeros de la cueva' },
  story_ashab_al_fil: { title: 'Los compañeros del elefante' },
  story_ashab_al_ukhdud: { title: 'La gente de la zanja' },
  story_qarun: { title: 'Qarun (Coré) y sus tesoros' },
  story_bilqis_sulayman: { title: 'La reina de Saba (Bilqis) y Salomón' },
  story_ashab_al_jannah: { title: 'Los dueños del huerto quemado' },
  story_ashab_al_sabt: { title: 'Los que violaron el sábado junto al mar' },
}

const BOOKS: Record<string, Fields> = {
  quran: { title: 'El Noble Corán' },
  tawrat: { title: 'La Torá (at-Tawrat) y las Tablas' },
  zabur: { title: 'Los Salmos (az-Zabur)' },
  injeel: { title: 'El Evangelio (al-Inyil)' },
  suhuf_ibrahim: { title: 'Las Hojas de Abraham (Suhuf Ibrahim)' },
  suhuf_idris: { title: 'Las 30 Hojas de Idris' },
  suhuf_shith: { title: 'Las 50 Hojas de Set (Suhuf Shith)' },
}

const PRE_ADAM: Record<string, Fields> = {
  angels: { name: 'Al-Mala’ika (los ángeles de luz)', era: 'Antes de Adán' },
  jinn: { name: 'Al-Yinn (habitantes anteriores a Adán)', era: 'Antes de Adán (15:27)' },
  iblis: { name: 'Iblis (Shaytan)', era: 'Antes y durante la creación de Adán' },
  hinn_binn: { name: 'Al-Hinn y Al-Binn (en los relatos de los historiadores)', era: 'Tierra primitiva' },
  nasnas: { name: 'Al-Nasnas (en los léxicos y el folclore)', era: 'No establecida' },
  angels_dialogue: { name: 'El diálogo celestial: por qué preguntaron los ángeles (2:30)', era: 'El comienzo de la humanidad' },
}

const ANGELS: Record<string, Fields> = {
  jibril: { name: 'Yibril / Gabriel (el Espíritu de la Verdad)' },
  mikail: { name: 'Mika’il / Miguel (ángel del sustento y la lluvia)' },
  israfil: { name: 'Israfil (el ángel de la Trompeta)' },
  malak_al_mawt: { name: 'Malak al-Mawt (el ángel de la muerte)' },
  hamalat_al_arsh: { name: 'Hamalat al-‘Arsh (los portadores del Trono)' },
  malik_and_zabaniyah: { name: 'Malik y los diecinueve guardianes' },
  ridwan: { name: 'Ridwan (el guardián del Paraíso)' },
  munkar_and_nakir: { name: 'Munkar y Nakir (los que interrogan en la tumba)' },
  kiraman_katibin: { name: 'Kiraman Katibin y al-Mu‘aqqibat' },
  harut_and_marut: { name: 'Harut y Marut (la prueba de Babilonia)' },
}

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

function add<T extends { id: string }>(list: readonly T[], names: Record<string, Fields>) {
  for (const item of list) {
    const fields = names[item.id]
    if (!fields) continue
    for (const [key, es] of Object.entries(fields)) {
      const v = (item as unknown as Record<string, L3 | undefined>)[key]
      if (v && typeof v === 'object' && !v.es) v.es = es
    }
  }
}

export function applySpanishNames() {
  add(QURAN_SUNNAH_ANIMALS, ANIMALS)
  add(QURAN_SUNNAH_PLANTS, PLANTS)
  add(SALIHIN_DATA, SALIHIN)
  add(QURANIC_STORIES, STORIES)
  add(SCRIPTURES, BOOKS)
  add(PRE_ADAM_ENTITIES, PRE_ADAM)
  add(FAMOUS_ANGELS, ANGELS)
  add(SAHABA_ERAS, ERAS)
}
