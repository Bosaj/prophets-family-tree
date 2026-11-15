// Spanish for the Stature page, added when the page loads.
import { PROPHETIC_DESCRIPTIONS, STATURE_SCALE_DATA } from '../stature'
import { addSpanish, type Fields } from './addSpanish'

const SCALE: Record<string, Fields> = {
  adam_primordial: {
    name: 'Adán (la primera creación)',
    era: 'El comienzo de la humanidad',
    description: 'Creado directamente por la Mano de Allah, de sesenta codos (unos 30 metros) de alto (Sahih al-Bujari 3326). El hadiz establece que la estatura humana no ha dejado de disminuir desde Adán hasta hoy.',
    hadithText: 'El Profeta ﷺ dijo: «Allah creó a Adán, y su altura era de sesenta codos… quien entre en el Paraíso tendrá la forma de Adán. La gente no ha dejado de disminuir en estatura desde entonces hasta ahora» (Sahih al-Bujari 3326, Sahih Muslim 2841).',
  },
  people_of_ad: {
    name: 'El pueblo de ‘Ad (gigantes de la Antigüedad)',
    era: 'Después del pueblo de Nuh (Corán 7:69): fecha desconocida',
    description: 'El Corán dice que Allah los aumentó en estatura y fuerza (7:69) y que nunca se creó en la tierra nada semejante a ellos (89:8), pero no da ninguna altura. Las cifras de libros posteriores vienen de relatos isra’iliyyat, así que esta barra solo ilustra «mucho más altos que nosotros».',
    hadithText: 'Versículo coránico: «Y recordad cuando os hizo sucesores después del pueblo de Noé y os aumentó en estatura» (Al-A‘raf 7:69).',
  },
  thamud_ancient: {
    name: 'El pueblo de Zamud',
    era: 'Después de ‘Ad (Corán 7:74): fecha desconocida',
    description: 'Tallaban casas en las montañas (15:82; 26:149). Ningún texto da su altura; la barra solo los sitúa entre ‘Ad y los pueblos posteriores, según el hadiz de que la estatura ha ido disminuyendo desde Adán (Sahih al-Bujari 3326).',
    hadithText: 'Corán: «Y tallaban casas en las montañas, sintiéndose seguros» (Al-Hiyr 15:82).',
  },
  musa_era: {
    name: 'Musa y los reyes de Israel',
    era: 'Musa y los reyes de Israel: fecha desconocida (los historiadores estiman los siglos XIII–X a. C.)',
    description: 'El hadiz auténtico describe a Musa como moreno y alto, como los hombres de Shanu’a (Sahih al-Bujari 3396), y el Corán dice que Talut recibió abundancia de saber y de cuerpo (2:247). No se da ninguna altura en metros; la barra solo indica «alto».',
    hadithText: 'El Profeta ﷺ dijo: «Moisés era moreno, un hombre alto como si fuera de la gente de Shanu’a» (Sahih al-Bujari 3396).',
  },
  modern_human: {
    name: 'La humanidad actual',
    era: 'De la última profecía hasta hoy',
    description: 'La estatura media actual, que corresponde a la altura moderada y equilibrada del Profeta Muhammad ﷺ (ni demasiado alto ni bajo).',
    hadithText: 'Al-Bara’ ibn ‘Azib relató: «El Profeta ﷺ era de estatura media, ancho de hombros, con el cabello hasta los lóbulos de las orejas. Lo vi con un manto rojo y nunca vi a nadie más hermoso» (Sahih al-Bujari 3551).',
  },
  jannah_restoration: {
    name: 'Los creyentes en el Paraíso',
    era: 'La otra vida eterna',
    description: 'En el Paraíso, los creyentes recuperarán la estatura original de Adán: sesenta codos de alto, con treinta y tres años, sin vello, sin defecto ni vejez.',
    hadithText: 'El Profeta ﷺ dijo: «La gente del Paraíso entrará en el Paraíso sin vello corporal, imberbes, con kohl en los ojos, a la edad de treinta o treinta y tres años» (Sunan at-Tirmidi 2545). Que tendrán la forma de Adán, de sesenta codos de alto, está en Sahih al-Bujari 3327.',
  },
  sauropod_diplodocus: {
    name: 'Diplodocus / saurópodo gigante',
    era: 'Época prehistórica (registro fósil)',
    description: 'Uno de los animales terrestres más largos jamás descubiertos (24–27 metros de largo, con la cabeza hasta 12 metros de alto). Junto a los 30 metros de Adán, Adán supera más del doble de su altura.',
  },
  tall_giraffe: {
    name: 'Jirafa (el animal terrestre vivo más alto)',
    era: 'Fauna actual',
    description: 'El animal terrestre vivo más alto, de hasta 5,5 metros. Junto a los sesenta codos de Adán, alcanza menos de una quinta parte de su altura.',
  },
  trex_apex: {
    name: 'Tiranosaurio rex (T-Rex)',
    era: 'Cretácico superior (registro fósil)',
    description: 'El célebre dinosaurio depredador, de unos 4–4,5 metros de alto y 12 metros de largo (registro fósil).',
  },
  african_elephant: {
    name: 'Elefante africano de sabana',
    era: 'Fauna actual',
    description: 'El mayor mamífero terrestre vivo, de 3,5–4 metros a la cruz. Un ser humano actual no llega a la mitad de esa altura.',
  },
}

const DESC: Record<string, Fields> = {
  muhammad_desc: {
    name: 'Muhammad ﷺ',
    honorific: 'Sello de los Profetas',
    statureCategory: 'Estatura media equilibrada (rab‘a)',
    heightEstimate: 'No existe una medida en metros; era de estatura media, ni muy alto ni bajo (Sahih al-Bujari 3547, 3549).',
    complexion: 'Tez clara y luminosa, ni blanca pálida ni morena, que brillaba como la luna llena.',
    hairAndBeard: 'Cabello negro ondulado, ni del todo rizado ni lacio, entre los lóbulos de las orejas y los hombros; barba negra y espesa.',
    physiqueAndBuild: 'Ancho de hombros, pecho y vientre firmes, antebrazos fuertes, con el sello de la profecía entre los omóplatos.',
    facialFeatures: 'Frente amplia, cejas arqueadas, ojos negros de pestañas largas con un toque rojizo, nariz recta y noble.',
    demeanorAndPresence: 'Caminaba con decisión, como quien baja una pendiente; sonreía con suavidad; infundía respeto a primera vista y amor al tratarlo.',
    comparisonWithModern: 'El equilibrio humano natural: estatura moderada, gran resistencia y complexión armoniosa.',
  },
  musa_desc: {
    name: 'Musa (Moisés)',
    honorific: 'Kalimullah (aquel con quien Allah habló directamente)',
    statureCategory: 'Alto (ṭuwāl)',
    heightEstimate: 'No se da en metros; el hadiz solo dice que era alto.',
    complexion: 'Moreno (ādam) (Sahih al-Bujari 3396; Sahih Muslim 165).',
    hairAndBeard: 'Los relatos difieren: uno describe el cabello liso (Sahih al-Bujari 3438), otro rizado (ya‘d). Su barba no se describe.',
    physiqueAndBuild: 'Bien formado, «como uno de los hombres de Shanu’a» (Sahih Muslim 165). La hija del hombre de Madián lo llamó «fuerte y digno de confianza» (28:26). El relato de que levantó solo la piedra del pozo viene del tafsir (tradición).',
    facialFeatures: 'Su rostro no se describe. Como signo, su mano salía blanca sin enfermedad alguna (20:22).',
    demeanorAndPresence: 'Muy pudoroso y tímido, siempre cubierto (Sahih al-Bujari 3404).',
    comparisonWithModern: 'Descrito como alto entre la gente; no existe ninguna medida.',
  },
  isa_desc: {
    name: '‘Isa (Jesús)',
    honorific: 'El Mesías, Palabra de Allah y Espíritu procedente de Él',
    statureCategory: 'Estatura media (marbū‘)',
    heightEstimate: 'No se da en metros; el hadiz dice que era de estatura media.',
    complexion: 'Rojizo, «como si acabara de salir de un baño» (Sahih al-Bujari 3394, 3437; Sahih Muslim 168). En un sueño el Profeta ﷺ lo vio «moreno, el mejor de los morenos» (Sahih al-Bujari 3440).',
    hairAndBeard: 'Cabello largo que caía entre los hombros, peinado y goteando agua (Sahih al-Bujari 3440); otro relato dice rizado (Sahih al-Bujari 3438).',
    physiqueAndBuild: 'Ancho de pecho (Sahih al-Bujari 3438).',
    facialFeatures: 'No se describe en las fuentes auténticas.',
    demeanorAndPresence: 'Bondadoso con su madre, «ni soberbio ni desdichado» (19:32).',
    comparisonWithModern: 'De estatura media; no existe ninguna medida.',
  },
  ibrahim_desc: {
    name: 'Ibrahim (Abraham)',
    honorific: 'Jalilullah y padre de los profetas',
    statureCategory: 'No se describe',
    heightEstimate: 'Las fuentes no la indican.',
    complexion: 'No se describe; el Profeta ﷺ dijo que él se le parecía más que ninguno de sus descendientes (Sahih al-Bujari 3394, 3437).',
    hairAndBeard: 'Un relato de al-Muwatta’ dice que fue el primero en ver canas y que se le dijo «es dignidad»; es un relato mursal (tradición).',
    physiqueAndBuild: 'No se describe. Con Isma‘il levantó los cimientos de la Casa (2:127).',
    facialFeatures: 'El Profeta ﷺ dijo: «Me parezco a Abraham más que ninguno de sus hijos» (Sahih al-Bujari 3437).',
    demeanorAndPresence: 'Indulgente, compasivo y vuelto hacia Allah (11:75); «una comunidad» entregada a Allah (16:120); generoso con sus huéspedes (51:24-27).',
    comparisonWithModern: 'No se describe en las fuentes auténticas.',
  },
  yusuf_desc: {
    name: 'Yusuf (José)',
    honorific: 'El veraz (as-Siddiq)',
    statureCategory: 'No se describe',
    heightEstimate: 'Las fuentes no la indican.',
    complexion: 'Recibió la mitad de la belleza (Sahih Muslim 162). Las mujeres que lo vieron dijeron: «Esto no es un ser humano, es un ángel noble» (12:31).',
    hairAndBeard: 'No se describe en las fuentes auténticas.',
    physiqueAndBuild: 'No se describe en las fuentes auténticas.',
    facialFeatures: 'Solo se transmite su belleza: «la mitad de la belleza» (Sahih Muslim 162).',
    demeanorAndPresence: 'Casto: rechazó a la mujer de al-‘Aziz y prefirió la cárcel (12:23-33). Llamado «el veraz» (12:46).',
    comparisonWithModern: 'No se describe en las fuentes auténticas.',
  },
}

/** The quoted narrations, in their order on each description. */
const NARRATIONS: Record<string, string[]> = {
  muhammad_desc: [
    'Al-Bara’ relató: «El Mensajero de Allah ﷺ era de estatura media, ancho de hombros, con el cabello espeso hasta los lóbulos de las orejas. Con un manto rojo, nunca vi nada más hermoso que él».',
    '‘Ali ibn Abi Talib dijo: «No era ni demasiado alto ni bajo, sino de estatura media entre su gente. Sus manos y pies eran recios. Al caminar se inclinaba hacia delante, como quien baja una pendiente».',
  ],
  musa_desc: ['El Profeta ﷺ dijo: «Moisés era moreno, un hombre alto como si fuera de la gente de Shanu’a».', 'El Profeta ﷺ dijo: «Moisés era muy pudoroso y se cubría todo el cuerpo por su gran pudor».'],
  isa_desc: [
    'El Profeta ﷺ dijo: «Vi a Jesús, de estatura media y rostro rojizo, como si acabara de salir de un baño».',
    'En un sueño: «un hombre moreno, el mejor que puede verse entre los morenos, con el cabello largo que le caía entre los hombros y agua goteándole de la cabeza».',
  ],
  ibrahim_desc: ['El Profeta ﷺ dijo: «En cuanto a Abraham, nunca vi a nadie que se le pareciera más que vuestro compañero [él mismo]».'],
  yusuf_desc: ['En el Viaje Nocturno, el Profeta ﷺ encontró a Yusuf en el tercer cielo y dijo: «Allí encontré a José, a quien se le había dado la mitad de toda la belleza».'],
}

addSpanish(STATURE_SCALE_DATA, SCALE)
addSpanish(PROPHETIC_DESCRIPTIONS, DESC)
for (const d of PROPHETIC_DESCRIPTIONS) {
  const es = NARRATIONS[d.id]
  if (!es) continue
  d.authenticNarrations.forEach((n, i) => {
    const text = n.text as { es?: string }
    if (es[i] && !text.es) text.es = es[i]
  })
}
