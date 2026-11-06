// Spanish texts for the prophets' main fields. Applied onto people.ts at load time, so the
// English, French and Arabic sources stay untouched. Fields not listed here fall back to English.
import type { Person } from '../types'

interface EsFields {
  name?: string
  alt?: string
  title?: string
  role?: string
  sentTo?: string
  era?: string
  story?: string
}

export const PEOPLE_ES: Record<string, EsFields> = {
  adam: {
    title: 'Padre de la humanidad',
    role: 'El primer ser humano. Los sabios lo cuentan como el primer profeta.',
    sentTo: 'Sus propios hijos y descendientes.',
    era: 'El comienzo de la humanidad.',
    story: 'Allah creó a Adán de barro e insufló en él de Su espíritu. Le enseñó los nombres de todas las cosas y los ángeles se postraron ante él, salvo Iblís. Adán y su esposa vivieron en el Jardín hasta que Iblís los tentó a comer del árbol prohibido. Se arrepintieron, Allah aceptó su arrepentimiento y fueron enviados a la tierra.',
  },
  shith: {
    alt: 'Set',
    title: 'Hijo justo de Adán, dado tras Habil; antepasado de Idris y Nuh',
    role: 'Hijo de Adán. No se nombra en el Corán; algunos sabios lo cuentan como profeta.',
    story: 'Según los historiadores, Shith fue hijo de Adán y antepasado de las generaciones posteriores, entre ellas Idris y Nuh.',
  },
  idris: {
    alt: 'A menudo identificado con Enoc',
    title: 'Un hombre veraz, un profeta',
    role: 'Profeta (nabi).',
    sentTo: 'Los descendientes de Adán de su tiempo (lugar incierto).',
    era: 'Antes de Nuh, según la mayoría de los historiadores; algunos lo sitúan después.',
    story: 'El Corán elogia a Idris como veraz, paciente y elevado a un alto rango, pero no da detalles de su misión. Los historiadores lo sitúan entre los antepasados de Nuh.',
  },
  nuh: {
    alt: 'Noé',
    title: 'El primer mensajero enviado a la gente de la tierra',
    role: 'Mensajero (rasul).',
    sentTo: 'Su pueblo, que adoraba ídolos llamados Wadd, Suwa‘, Yaguz, Ya‘uq y Nasr.',
    story: 'Nuh llamó a su pueblo a adorar solo a Allah, de noche y de día, durante 950 años, pero solo unos pocos creyeron. Allah le ordenó construir el Arca. Cuando llegó el diluvio, los creyentes y parejas de animales se salvaron, y el Arca se posó sobre el monte al-Yudi.',
  },
  hud: {
    role: 'Mensajero (rasul).',
    sentTo: 'El pueblo de ‘Ad, que vivía entre las dunas (al-Ahqaf).',
    era: 'Después del pueblo de Nuh.',
    story: '‘Ad era un pueblo poderoso que levantaba monumentos en cada altura. Hud los llamó a adorar solo a Allah y a pedir Su perdón. Se burlaron de él, y un viento que al principio tomaron por una nube de lluvia los destruyó.',
  },
  salih: {
    role: 'Mensajero (rasul).',
    sentTo: 'El pueblo de Zamud, que excavaba sus casas en las montañas.',
    era: 'Después del pueblo de ‘Ad.',
    story: 'Zamud pidió un signo, y Allah envió una camella con su parte del agua. Salih les advirtió que no le hicieran daño. La desjarretaron y lo desafiaron, y a los tres días el estruendo se apoderó de ellos.',
  },
  azar: {
    role: 'Nombrado en el Corán como padre de Ibrahim. Algunos sabios dicen que Azar era su tío o que su padre se llamaba Tarij (Téraj).',
    story: 'Azar fabricaba y servía ídolos. Ibrahim lo llamó con dulzura a la verdad, y él amenazó con lapidarlo.',
  },
  ibrahim: {
    alt: 'Abraham',
    title: 'Jalil Allah, el amigo íntimo de Allah',
    role: 'Un hombre veraz, un profeta; un guía (imam) para la humanidad.',
    sentTo: 'Su padre y su pueblo, que adoraban ídolos, y un rey que discutió con él.',
    era: 'Hacia el II milenio a. C. (estimación de historiadores, no de fuentes islámicas).',
    story: 'Ibrahim razonó con su pueblo sobre las estrellas, la luna y el sol, y luego rompió sus ídolos. Lo arrojaron a un fuego que Allah hizo fresco y seguro. Emigró, fue puesto a prueba con la orden de sacrificar a su hijo y, con Ismail, levantó los cimientos de la Kaaba y llamó a la gente a la peregrinación.',
  },
  lut: {
    alt: 'Lot',
    role: 'Mensajero (rasul).',
    sentTo: 'Su pueblo, que cometía una indecencia que ningún pueblo antes había cometido.',
    era: 'Contemporáneo de Ibrahim, en quien creyó.',
    story: 'Lut creyó en Ibrahim y emigró con él. Fue enviado a un pueblo que practicaba abiertamente una indecencia y asaltaba a los viajeros. Amenazaron con expulsarlo. Llegaron ángeles como huéspedes, Lut partió de noche con su familia salvo su esposa, y las ciudades fueron volcadas.',
  },
  ismail: {
    alt: 'Ismael',
    title: 'Fiel a su promesa',
    role: 'Mensajero y profeta.',
    sentTo: 'La tribu árabe de Yurhum, que se estableció en La Meca con su madre, y sus descendientes.',
    story: 'Ibrahim dejó al bebé Ismail y a su madre Hayar en el valle árido de La Meca. Hayar corrió entre Safa y Marwa buscando agua hasta que brotó Zamzam. Años después, Ismail se sometió a la orden del sacrificio y fue rescatado, y construyó la Kaaba con su padre.',
  },
  ishaq: {
    alt: 'Isaac',
    role: 'Un profeta de entre los justos.',
    sentTo: 'El pueblo de Canaán (Sham).',
    story: 'Los ángeles que visitaron a Ibrahim dieron la buena nueva de Ishaq a Sara, que rió asombrada porque era anciana. Ishaq fue profeta y padre de Ya‘qub, de quien vinieron los Hijos de Israel.',
  },
  yaqub: {
    alt: 'Jacob',
    title: 'Isra’il: los comentaristas explican que Isra’il es Ya‘qub',
    role: 'Profeta.',
    sentTo: 'Su familia y el pueblo de Canaán.',
    story: 'Ya‘qub amaba profundamente a su hijo Yusuf. Cuando sus hijos afirmaron que un lobo lo había devorado, respondió con una «hermosa paciencia». Lloró hasta que sus ojos se blanquearon, nunca perdió la esperanza en Allah y se reunió con Yusuf en Egipto.',
  },
  yusuf: {
    alt: 'José',
    title: 'As-Siddiq, el veraz',
    role: 'Mensajero: llegó al pueblo de Egipto con pruebas claras.',
    sentTo: 'El pueblo de Egipto, empezando por sus compañeros de prisión.',
    story: 'Yusuf vio once estrellas, el sol y la luna postrarse ante él. Sus hermanos celosos lo arrojaron a un pozo; fue vendido en Egipto, resistió la tentación y fue encarcelado injustamente. Interpretó el sueño del rey de siete vacas gordas y siete flacas, salvó a Egipto del hambre y perdonó a sus hermanos. El Corán la llama la mejor de las historias.',
  },
  ayyub: {
    alt: 'Job',
    title: 'Paciente, un siervo excelente',
    role: 'Profeta: Allah le reveló como a los demás profetas.',
    sentTo: 'Su pueblo en Sham (Hawran), según la tradición.',
    era: 'Entre Yusuf y Musa, según los historiadores.',
    story: 'Ayyub fue probado con la pérdida de su salud, sus bienes y su familia. Permaneció paciente e invocó a su Señor: «El mal me ha tocado, y Tú eres el más Misericordioso de los misericordiosos». Allah lo curó con un manantial y le devolvió a su familia y más.',
  },
  shuayb: {
    role: 'Mensajero (rasul).',
    sentTo: 'Madyan y la gente de la Espesura (al-Ayka). Los sabios discrepan sobre si eran un solo pueblo.',
    era: 'Después de Lut: «el pueblo de Lut no está lejos de vosotros».',
    story: 'Shu‘ayb llamó a Madyan a adorar solo a Allah y a dar la medida y el peso completos, pues engañaban en el comercio y cortaban los caminos. Sus jefes amenazaron con expulsarlo si no volvía a su religión. Fue salvado con los creyentes, y a los demás los tomó el terremoto.',
  },
  musa: {
    alt: 'Moisés',
    title: 'Kalim Allah: Allah le habló directamente',
    role: 'Mensajero y profeta.',
    sentTo: 'Faraón y sus dignatarios, y los Hijos de Israel.',
    era: 'Hacia el siglo XIII a. C. (estimación de historiadores). El Corán lo sitúa después de Yusuf.',
    story: 'Faraón mataba a los hijos de Israel, así que la madre de Musa lo puso en el río, y fue criado en el propio palacio de Faraón. Años después, Allah le habló junto al fuego en Tuwa y lo envió con Harun a Faraón. Tras los signos, Allah abrió el mar para los creyentes y ahogó a Faraón. Musa recibió la Torá y guió a su pueblo por el desierto.',
  },
  harun: {
    alt: 'Aarón',
    role: 'Profeta, y mensajero junto con Musa.',
    sentTo: 'Faraón, con Musa; dirigió a los Hijos de Israel mientras Musa estaba en el monte.',
    story: 'Musa pidió a Allah que hiciera de su hermano Harun su ayudante, y Allah lo hizo profeta. Juntos fueron a Faraón. Cuando el Samiri llevó al pueblo a adorar un becerro en ausencia de Musa, Harun intentó detenerlos y temió dividirlos.',
  },
  dhulkifl: {
    role: 'Nombrado entre los pacientes y los mejores. La mayoría de los sabios lo cuentan como profeta; otros dicen que fue un hombre justo.',
    sentTo: 'Desconocido. Algunos lo identifican con Hizqil (Ezequiel), otros con un hijo de Ayyub.',
    era: 'No consta en las fuentes.',
    story: 'El Corán nombra a Dhul-Kifl dos veces: con Ismail e Idris entre los pacientes, y con al-Yasa‘ entre los mejores. No se dice nada más de su misión, y su identidad se debate.',
  },
  dawud: {
    alt: 'David',
    title: 'Un sucesor (jalifa) en la tierra',
    role: 'Profeta y rey.',
    sentTo: 'Los Hijos de Israel. Mató a Yalut (Goliat) y recibió la realeza y la sabiduría.',
    era: 'Hacia el 1000 a. C. (estimación de historiadores). El Corán sitúa su reinado después de Musa.',
    story: 'Siendo un joven soldado del ejército de Talut, Dawud mató a Yalut. Allah le dio la realeza, la sabiduría y el Zabur. Las montañas y las aves se unían a su alabanza, el hierro se ablandaba en sus manos y juzgaba entre la gente con justicia.',
  },
  sulayman: {
    alt: 'Salomón',
    role: 'Profeta y rey, al que se dio un reino como no tendría nadie después.',
    sentTo: 'Los Hijos de Israel; también llamó a Allah a la reina de Saba’.',
    era: 'Hacia el siglo X a. C. (estimación de historiadores).',
    story: 'Sulayman heredó de Dawud la profecía y la realeza. Mandaba ejércitos de hombres, yinn y aves. La abubilla le habló de la reina de Saba’, que adoraba al sol; su trono le fue traído y, en su palacio con suelo de cristal, ella se sometió a Allah con él. Murió apoyado en su bastón, y los yinn solo lo supieron cuando una termita lo carcomió.',
  },
  ilyas: {
    alt: 'Elías',
    role: 'Mensajero, uno de los enviados.',
    sentTo: 'Su pueblo, que invocaba a Ba‘l. La tradición lo sitúa cerca de Baalbek (Líbano).',
    era: 'Hacia el siglo IX a. C. (estimación de historiadores).',
    story: 'Ilyas preguntó a su pueblo: «¿Invocáis a Ba‘l y abandonáis al Mejor de los creadores?». Lo desmintieron, salvo los siervos sinceros de Allah. El Corán envía la paz sobre él.',
  },
  alyasa: {
    alt: 'Eliseo',
    role: 'Profeta, preferido sobre los mundos.',
    sentTo: 'Los Hijos de Israel, como sucesor de Ilyas.',
    era: 'Hacia el siglo IX a. C. (estimación de historiadores).',
    story: 'El Corán nombra a al-Yasa‘ entre los profetas guiados y preferidos sobre los mundos, y entre los mejores. La tradición dice que sucedió a Ilyas entre los Hijos de Israel.',
  },
  yunus: {
    alt: 'Jonás',
    title: 'Dhun-Nun, el del pez',
    role: 'Mensajero, uno de los enviados.',
    sentTo: 'Un pueblo de cien mil o más, que creyó. La tradición dice Nínive, en Irak.',
    era: 'Hacia el siglo VIII a. C. (estimación de historiadores).',
    story: 'Yunus dejó a su pueblo enfadado antes de que Allah se lo permitiera y subió a un barco cargado. Se echó a suertes y fue arrojado al mar, donde un pez lo tragó. En la oscuridad invocó: «No hay dios sino Tú, gloria a Ti; fui de los injustos». Allah lo salvó, una planta de calabaza le dio sombra y su pueblo creyó.',
  },
  zakariya: {
    alt: 'Zacarías',
    role: 'Profeta, de entre los justos.',
    sentTo: 'Los Hijos de Israel. Fue el tutor de Maryam.',
    era: 'Siglo I a. C. (estimación de historiadores).',
    story: 'Cada vez que Zakariya entraba en el lugar de oración de Maryam encontraba provisión junto a ella, y ella decía que venía de Allah. Conmovido, rezó en secreto por un heredero justo pese a su vejez y a la esterilidad de su esposa. Los ángeles le dieron la buena nueva de Yahya.',
  },
  yahya: {
    alt: 'Juan',
    title: 'Un nombre que Allah no dio a nadie antes que él',
    role: 'Un profeta de entre los justos, al que se dio juicio siendo niño.',
    sentTo: 'Los Hijos de Israel, confirmando una palabra de Allah (‘Isa).',
    era: 'Siglo I a. C. – siglo I d. C. (estimación de historiadores).',
    story: 'Yahya nació del anciano Zakariya. Allah le dio sabiduría de niño, ternura y pureza. Fue bueno con sus padres, nunca arrogante ni desobediente, y confirmó la venida de ‘Isa.',
  },
  imran: {
    title: 'Patriarca justo cuya familia Allah eligió sobre los mundos',
    role: 'Padre de Maryam. Allah eligió a «la familia de ‘Imran» sobre los mundos.',
    story: 'La esposa de ‘Imran consagró al servicio de Allah al hijo que llevaba en el vientre. Dio a luz a Maryam y la puso bajo la protección de Allah.',
  },
  maryam: {
    alt: 'María',
    title: 'La pura y veraz, elegida y purificada sobre las mujeres de los mundos',
    role: 'Elegida y purificada sobre las mujeres de los mundos. Una sura lleva su nombre. La mayoría de los sabios dice que no fue profeta.',
    story: 'Maryam creció dedicada a la adoración al cuidado de Zakariya. Un ángel le trajo la noticia de un hijo, ‘Isa, aunque ningún hombre la había tocado. Se retiró a un lugar lejano, dio a luz bajo una palmera y volvió con el bebé, que habló desde la cuna para defenderla.',
  },
  isa: {
    alt: 'Jesús',
    title: 'Al-Masih, hijo de Maryam: una palabra de Allah y un espíritu procedente de Él',
    role: 'Mensajero de Allah.',
    sentTo: 'Los Hijos de Israel.',
    era: 'Nacido hacia el 4 a. C., según los historiadores.',
    story: '‘Isa nació de Maryam por la palabra de Allah. Habló desde la cuna, llamó a los Hijos de Israel a adorar solo a Allah e hizo signos con el permiso de Allah. Cuando sus enemigos conspiraron para matarlo, Allah lo elevó hacia Sí y no lo mataron. Volverá antes del fin de los tiempos.',
  },
  muhammad: {
    title: 'El Sello de los Profetas, enviado como misericordia para los mundos',
    role: 'Mensajero de Allah y último profeta.',
    sentTo: 'Toda la humanidad.',
    era: 'Nació hacia el 570 d. C. en La Meca; murió en el 632 d. C. (11 H) en Medina.',
    story: 'Muhammad ibn ‘Abdullah nació en La Meca, huérfano y conocido como al-Amin, el digno de confianza. Hacia los cuarenta años le llegó la primera revelación en la cueva de Hira: «¡Lee!». Llamó a la gente a Allah trece años en La Meca, emigró a Medina y en diez años La Meca se abrió al islam. Murió en Medina a los sesenta y tres años, el último de los profetas.',
  },
  hawwa: {
    alt: 'Eva',
    title: 'Madre de la humanidad',
    role: 'Creada como pareja y compañera de Adán.',
    story: 'Hawwa fue creada de Adán como su pareja y compañera. Vivieron juntos en el Jardín, fueron tentados por el árbol prohibido, se arrepintieron juntos y fueron enviados a la tierra como padres de toda la humanidad.',
  },
  qabil: {
    alt: 'Caín',
    role: 'Hijo de Adán que ofreció un sacrificio y mató a su hermano Habil.',
    story: 'Qabil y Habil ofrecieron sacrificios a Allah. Cuando el de Habil fue aceptado y el de Qabil no, Qabil mató a su hermano. Se le envió un cuervo para mostrarle cómo enterrar el cuerpo.',
  },
  habil: {
    alt: 'Abel',
    role: 'Hijo justo de Adán cuyo sacrificio aceptó Allah.',
    story: 'Habil ofreció a Allah un sacrificio sincero y se negó a alzar la mano contra su hermano Qabil, eligiendo temer a Allah, Señor de los mundos.',
  },
  sarah: {
    title: 'Esposa de Ibrahim y madre de Ishaq',
    role: 'Esposa justa de Ibrahim, se alegró con la noticia de Ishaq y de Ya‘qub.',
    story: 'Sara acompañó a Ibrahim en sus emigraciones por Allah. En su vejez, los ángeles visitaron su casa y le dieron la buena nueva de Ishaq, y después de él, de Ya‘qub.',
  },
  hajar: {
    name: 'Hayar',
    alt: 'Agar',
    title: 'Madre de Ismail y de los árabes del Hiyaz',
    role: 'Esposa de Ibrahim; madre de Ismail, que corrió entre Safa y Marwa.',
    story: 'Por orden de Allah, Ibrahim dejó a Hayar y a su bebé Ismail en el valle árido de La Meca. Ella corrió entre Safa y Marwa buscando agua hasta que Yibril hizo brotar el manantial de Zamzam.',
  },
}

/** Adds the Spanish texts to the people records. Called once by people.ts. */
export function applySpanish(people: Person[]) {
  for (const p of people) {
    const es = PEOPLE_ES[p.id]
    if (!es) continue
    if (es.name) p.name.es = es.name
    if (es.alt && p.alt) p.alt.es = es.alt
    if (es.title && p.title) p.title.t.es = es.title
    if (es.role && p.role) p.role.t.es = es.role
    if (es.sentTo && p.sentTo) p.sentTo.t.es = es.sentTo
    if (es.era && p.era) p.era.t.es = es.era
    if (es.story) p.story.es = es.story
  }
}
