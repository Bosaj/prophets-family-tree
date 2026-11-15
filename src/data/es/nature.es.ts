// Spanish names for the animals and plants, added when the page that shows them loads. Long descriptions still show in English.
import { QURAN_SUNNAH_ANIMALS, QURAN_SUNNAH_PLANTS } from '../nature'
import { addSpanish, type Fields } from './addSpanish'

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

addSpanish(QURAN_SUNNAH_ANIMALS, ANIMALS)
addSpanish(QURAN_SUNNAH_PLANTS, PLANTS)
