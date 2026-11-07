// The stories of the righteous told step by step, each step tied to the verses or hadith that tell it.
import type { L4, Level, Ref } from './types'

const t = (en: string, fr: string, ar: string, es: string): L4 => ({ en, fr, ar, es })

export interface StoryStep {
  text: L4
  l: Level
  r: Ref[]
}

export const SALIHIN_STEPS: Record<string, StoryStep[]> = {
  maryam_bint_imran: [
    {
      text: t('Her mother vowed the child in her womb to Allah’s service. She bore a girl, named her Maryam, and asked Allah to protect her and her offspring from Satan.', 'Sa mère voua l’enfant qu’elle portait au service d’Allah. Elle mit au monde une fille, la nomma Maryam, et demanda à Allah de la protéger, elle et sa descendance, contre Satan.', 'نذرت أمها ما في بطنها محررًا لله، فوضعتها أنثى وسمّتها مريم، وأعاذتها وذريتها من الشيطان الرجيم.', 'Su madre consagró al servicio de Allah al hijo que llevaba. Dio a luz a una niña, la llamó Maryam y pidió a Allah que la protegiera a ella y a su descendencia de Satanás.'),
      l: 'quran', r: ['3:35-36'],
    },
    {
      text: t('Allah accepted her and placed her in Zakariya’s care. Whenever he entered her prayer niche he found provision with her; she said: “It is from Allah.”', 'Allah l’agréa et la confia à Zakariya. Chaque fois qu’il entrait dans son sanctuaire, il trouvait chez elle de la nourriture ; elle disait : « Cela vient d’Allah. »', 'تقبّلها ربها وكفّلها زكريا، كلما دخل عليها المحراب وجد عندها رزقًا، فتقول: هو من عند الله.', 'Allah la aceptó y la puso al cuidado de Zakariya. Cada vez que entraba en su lugar de oración encontraba provisión junto a ella; ella decía: «Viene de Allah».'),
      l: 'quran', r: ['3:37'],
    },
    {
      text: t('The angels told her that Allah had chosen her, purified her and chosen her above the women of the worlds. The Prophet ﷺ said she was the best of the women of her time, and one of the two perfect women with Asiya.', 'Les anges lui dirent qu’Allah l’avait élue, purifiée et élue au-dessus des femmes des mondes. Le Prophète ﷺ dit qu’elle fut la meilleure des femmes de son temps, et l’une des deux femmes parfaites avec Asiya.', 'قالت الملائكة: إن الله اصطفاك وطهّرك واصطفاك على نساء العالمين، وقال النبي ﷺ: خير نسائها مريم، ولم يكمل من النساء إلا آسية ومريم.', 'Los ángeles le dijeron que Allah la había elegido, purificado y elegido por encima de las mujeres de los mundos. El Profeta ﷺ dijo que fue la mejor de las mujeres de su tiempo, y una de las dos mujeres perfectas junto con Asiya.'),
      l: 'quran', r: ['3:42', 'bukhari:3432', 'bukhari:3411'],
    },
    {
      text: t('Jibril came to her in the form of a man and announced a pure son. “How can I have a son when no man has touched me?” “So it will be: it is easy for your Lord.”', 'Jibril vint à elle sous la forme d’un homme et lui annonça un fils pur. « Comment aurais-je un fils alors qu’aucun homme ne m’a touchée ? » « C’est ainsi : cela est facile pour ton Seigneur. »', 'أرسل الله إليها روحه فتمثّل لها بشرًا سويًّا، وبشّرها بغلام زكي، فقالت: أنّى يكون لي غلام ولم يمسسني بشر؟ قال: كذلك قال ربك هو عليّ هيّن.', 'Yibril vino a ella en forma de hombre y le anunció un hijo puro. «¿Cómo tendré un hijo si ningún hombre me ha tocado?». «Así será: es fácil para tu Señor».'),
      l: 'quran', r: ['19:16-21'],
    },
    {
      text: t('Labour pains drove her to the trunk of a palm tree. She was told to shake it for fresh dates, to drink from a stream below her, and to keep silent. When her people accused her, the baby spoke from the cradle: “I am the servant of Allah.”', 'Les douleurs l’amenèrent au tronc d’un palmier. On lui dit de le secouer pour des dattes fraîches, de boire au ruisseau à ses pieds et de garder le silence. Quand les siens l’accusèrent, le bébé parla au berceau : « Je suis le serviteur d’Allah. »', 'ألجأها المخاض إلى جذع النخلة، فنوديت أن تهزّه فيتساقط رطبًا جنيًّا، وأن تشرب من السري تحتها وتصوم عن الكلام، فلما اتهمها قومها نطق الصبي في المهد: إني عبد الله.', 'Los dolores del parto la llevaron al tronco de una palmera. Se le dijo que lo sacudiera para obtener dátiles frescos, que bebiera del arroyo a sus pies y que guardara silencio. Cuando su gente la acusó, el bebé habló desde la cuna: «Soy el siervo de Allah».'),
      l: 'quran', r: ['19:22-33'],
    },
  ],
  asiya_bint_muzahim: [
    {
      text: t('When baby Musa was taken from the river into Pharaoh’s palace, his wife pleaded: “A comfort of the eye for me and for you. Do not kill him.”', 'Quand le bébé Musa fut recueilli du fleuve dans le palais de Pharaon, son épouse plaida : « Réjouissance pour moi et pour toi ! Ne le tuez pas. »', 'لما التُقط موسى من اليم إلى قصر فرعون قالت امرأته: قرّت عين لي ولك لا تقتلوه.', 'Cuando el bebé Musa fue sacado del río al palacio de Faraón, su esposa suplicó: «Alegría para mí y para ti. No lo matéis».'),
      l: 'quran', r: ['28:9'],
    },
    {
      text: t('Married to the greatest tyrant of her age, she believed. Her prayer is in the Qur’an: “My Lord, build me a house near You in Paradise, and save me from Pharaoh and his deeds.”', 'Mariée au plus grand tyran de son temps, elle crut. Sa prière est dans le Coran : « Seigneur, construis-moi auprès de Toi une maison au Paradis, et délivre-moi de Pharaon et de ses œuvres. »', 'كانت زوجة أطغى أهل زمانها فآمنت، ودعاؤها في القرآن: رب ابنِ لي عندك بيتًا في الجنة ونجّني من فرعون وعمله.', 'Casada con el mayor tirano de su época, creyó. Su súplica está en el Corán: «Señor, constrúyeme junto a Ti una casa en el Paraíso, y sálvame de Faraón y de sus obras».'),
      l: 'quran', r: ['66:11'],
    },
    {
      text: t('The Prophet ﷺ named her with Maryam as the two women who reached perfection.', 'Le Prophète ﷺ la nomma avec Maryam comme les deux femmes ayant atteint la perfection.', 'ذكرها النبي ﷺ مع مريم فيمن كمل من النساء.', 'El Profeta ﷺ la nombró junto a Maryam como las dos mujeres que alcanzaron la perfección.'),
      l: 'hadith', r: ['bukhari:3411'],
    },
  ],
  luqman_al_hakim: [
    {
      text: t('Allah gave Luqman wisdom: “Be grateful to Allah; whoever is grateful is grateful for his own good.”', 'Allah donna la sagesse à Luqman : « Sois reconnaissant envers Allah ; quiconque est reconnaissant l’est pour lui-même. »', 'آتى الله لقمان الحكمة: أن اشكر لله، ومن يشكر فإنما يشكر لنفسه.', 'Allah dio la sabiduría a Luqman: «Sé agradecido con Allah; quien agradece, agradece para su propio bien».'),
      l: 'quran', r: ['31:12'],
    },
    {
      text: t('His first advice to his son: “Do not associate anything with Allah: that is a great wrong.” The Prophet ﷺ used this verse to explain what “wrong” means in 6:82.', 'Son premier conseil à son fils : « N’associe rien à Allah : c’est une injustice énorme. » Le Prophète ﷺ s’appuya sur ce verset pour expliquer « l’injustice » en 6:82.', 'أول وصيته لابنه: لا تشرك بالله إن الشرك لظلم عظيم، وبهذه الآية فسّر النبي ﷺ الظلم في آية الأنعام.', 'Su primer consejo a su hijo: «No asocies nada a Allah: es una injusticia enorme». El Profeta ﷺ usó este versículo para explicar la «injusticia» de 6:82.'),
      l: 'quran', r: ['31:13', 'bukhari:32'],
    },
    {
      text: t('Even a deed the weight of a mustard seed, hidden in a rock or in the heavens or earth, Allah will bring it forth.', 'Même une action du poids d’un grain de moutarde, cachée dans un rocher, dans les cieux ou sur terre, Allah la fera venir.', 'إنها إن تك مثقال حبة من خردل فتكن في صخرة أو في السماوات أو في الأرض يأت بها الله.', 'Incluso una obra del peso de un grano de mostaza, oculta en una roca, en los cielos o en la tierra, Allah la traerá.'),
      l: 'quran', r: ['31:16'],
    },
    {
      text: t('Establish prayer, command good and forbid wrong, be patient; do not turn your cheek away from people in pride, walk with moderation and lower your voice.', 'Accomplis la prière, ordonne le bien et interdis le mal, sois patient ; ne détourne pas ta joue des gens par orgueil, marche modestement et baisse la voix.', 'أقم الصلاة وأمر بالمعروف وانهَ عن المنكر واصبر، ولا تصعّر خدك للناس، واقصد في مشيك، واغضض من صوتك.', 'Establece la oración, ordena el bien y prohíbe el mal, sé paciente; no apartes la mejilla de la gente con orgullo, camina con moderación y baja la voz.'),
      l: 'quran', r: ['31:17-19'],
    },
  ],
  al_khidr: [
    {
      text: t('Musa said he was the most knowledgeable of people; Allah told him that a servant of His at the meeting of the two seas knew more. Musa set out with his young companion Yusha‘ ibn Nun.', 'Musa dit être le plus savant des hommes ; Allah lui apprit qu’un de Ses serviteurs, à la jonction des deux mers, en savait plus. Musa partit avec son jeune compagnon Yusha‘ ibn Nun.', 'قال موسى إنه أعلم الناس، فأوحى الله إليه أن له عبدًا بمجمع البحرين هو أعلم منه، فخرج مع فتاه يوشع بن نون.', 'Musa dijo que era el más sabio de los hombres; Allah le dijo que un siervo Suyo, en la confluencia de los dos mares, sabía más. Musa partió con su joven compañero Yusha‘ ibn Nun.'),
      l: 'hadith', r: ['bukhari:122', '18:60-65'],
    },
    {
      text: t('Al-Khidr warned him: “You will not be able to be patient with me.” Then he holed a boat, killed a boy, and rebuilt a falling wall without pay, and each time Musa objected.', 'Al-Khidr le prévint : « Tu ne pourras pas être patient avec moi. » Puis il troua un bateau, tua un garçon et redressa un mur sans salaire, et chaque fois Musa protesta.', 'قال له الخضر: إنك لن تستطيع معي صبرًا، ثم خرق السفينة وقتل الغلام وأقام الجدار بلا أجر، وموسى يعترض في كل مرة.', 'Al-Jidr le advirtió: «No podrás tener paciencia conmigo». Luego agujereó una barca, mató a un muchacho y reconstruyó un muro sin cobrar, y cada vez Musa protestó.'),
      l: 'quran', r: ['18:66-77'],
    },
    {
      text: t('Then he explained: the boat belonged to poor people and a king was seizing every sound boat; the boy would have burdened his believing parents with rebellion and disbelief; the wall hid a treasure of two orphans whose father was righteous. “I did not do it of my own accord.”', 'Puis il expliqua : le bateau appartenait à des pauvres et un roi saisissait tout bateau intact ; le garçon aurait accablé ses parents croyants de rébellion et de mécréance ; le mur cachait le trésor de deux orphelins dont le père était vertueux. « Je ne l’ai pas fait de moi-même. »', 'ثم فسّر: السفينة لمساكين وكان وراءهم ملك يأخذ كل سفينة غصبًا، والغلام كان سيرهق أبويه المؤمنين طغيانًا وكفرًا، والجدار تحته كنز ليتيمين كان أبوهما صالحًا، «وما فعلته عن أمري».', 'Luego explicó: la barca era de pobres y un rey se apoderaba de toda barca en buen estado; el muchacho habría abrumado a sus padres creyentes con rebeldía e incredulidad; el muro ocultaba el tesoro de dos huérfanos cuyo padre era justo. «No lo hice por mi cuenta».'),
      l: 'quran', r: ['18:78-82'],
    },
  ],
  dhul_qarnayn: [
    {
      text: t('Allah gave him power on earth and the means to everything. He travelled west and east, and judged justly: the wrongdoer punished, the believer who does good rewarded.', 'Allah lui donna la puissance sur terre et les moyens de toute chose. Il voyagea vers l’ouest et l’est, et jugea avec justice : l’injuste puni, le croyant qui fait le bien récompensé.', 'مكّن الله له في الأرض وآتاه من كل شيء سببًا، فبلغ المغرب والمشرق، وحكم بالعدل: يعذّب الظالم ويجزي المؤمن العامل بالحسنى.', 'Allah le dio poder en la tierra y los medios para todo. Viajó al oeste y al este, y juzgó con justicia: el injusto castigado, el creyente que obra bien recompensado.'),
      l: 'quran', r: ['18:83-91'],
    },
    {
      text: t('A people threatened by Ya’juj and Ma’juj offered him tribute to build a barrier. He refused payment: “What my Lord has given me is better.” He asked only for their labour, and built a wall of iron and molten copper.', 'Un peuple menacé par Ya’juj et Ma’juj lui offrit un tribut pour bâtir une barrière. Il refusa : « Ce que mon Seigneur m’a donné vaut mieux. » Il ne demanda que leur aide, et bâtit un mur de fer et de cuivre fondu.', 'عرض عليه قوم يخافون يأجوج ومأجوج خرجًا ليبني سدًّا، فقال: ما مكّنّي فيه ربي خير، فأعينوني بقوة، وبنى ردمًا من زبر الحديد والقطر.', 'Un pueblo amenazado por Ya’yuy y Ma’yuy le ofreció un tributo para construir una barrera. Lo rechazó: «Lo que mi Señor me ha dado es mejor». Solo pidió su trabajo, y construyó un muro de hierro y cobre fundido.'),
      l: 'quran', r: ['18:92-97'],
    },
    {
      text: t('When it was done he credited Allah, not himself: “This is a mercy from my Lord; when my Lord’s promise comes, He will level it.”', 'Une fois terminé, il en attribua le mérite à Allah, non à lui-même : « C’est une miséricorde de mon Seigneur ; quand viendra la promesse de mon Seigneur, Il le nivellera. »', 'لما أتمّه نسب الفضل لله: هذا رحمة من ربي، فإذا جاء وعد ربي جعله دكّاء.', 'Al terminar, atribuyó el mérito a Allah y no a sí mismo: «Esto es una misericordia de mi Señor; cuando llegue la promesa de mi Señor, lo allanará».'),
      l: 'quran', r: ['18:98'],
    },
  ],
  talut: [
    {
      text: t('The Children of Israel asked their prophet for a king. Allah appointed Talut; they objected that he had no wealth. Their prophet answered that Allah had chosen him and increased him in knowledge and strength.', 'Les Enfants d’Israël demandèrent un roi à leur prophète. Allah désigna Talut ; ils objectèrent qu’il n’avait pas de richesse. Leur prophète répondit qu’Allah l’avait choisi et l’avait accru en savoir et en force.', 'سأل بنو إسرائيل نبيهم ملكًا، فبعث الله طالوت، فاعترضوا بأنه لم يؤتَ سعة من المال، فقال: إن الله اصطفاه عليكم وزاده بسطة في العلم والجسم.', 'Los Hijos de Israel pidieron un rey a su profeta. Allah designó a Talut; objetaron que no tenía riqueza. Su profeta respondió que Allah lo había elegido y le había aumentado en saber y fuerza.'),
      l: 'quran', r: ['2:246-247'],
    },
    {
      text: t('At a river he tested his army: whoever drank his fill was not of him, except a handful. Most drank. The Muslims at Badr were as many as Talut’s companions who crossed: a little over three hundred.', 'À un fleuve, il éprouva son armée : quiconque y boirait à satiété ne serait pas des siens, sauf une gorgée. La plupart burent. Les musulmans de Badr étaient aussi nombreux que les compagnons de Talut qui traversèrent : un peu plus de trois cents.', 'ابتلاهم بنهر: من شرب منه فليس منه إلا من اغترف غرفة بيده، فشربوا منه إلا قليلًا، وكان أهل بدر على عدة أصحاب طالوت الذين جاوزوا النهر، بضعة عشر وثلاثمائة.', 'En un río puso a prueba a su ejército: quien bebiera hasta saciarse no sería de los suyos, salvo un sorbo. La mayoría bebió. Los musulmanes de Badr eran tantos como los compañeros de Talut que cruzaron: algo más de trescientos.'),
      l: 'quran', r: ['2:249', 'bukhari:3958'],
    },
    {
      text: t('Facing Jalut’s army, the few said: “How many a small company has overcome a large one by Allah’s permission.” Dawud killed Jalut.', 'Face à l’armée de Jalut, le petit nombre dit : « Combien de fois une troupe peu nombreuse a vaincu une troupe nombreuse, par la permission d’Allah ! » Dawud tua Jalut.', 'قال القلة أمام جيش جالوت: كم من فئة قليلة غلبت فئة كثيرة بإذن الله، وقتل داود جالوت.', 'Frente al ejército de Yalut, los pocos dijeron: «¡Cuántas veces un grupo pequeño ha vencido a uno grande con el permiso de Allah!». Dawud mató a Yalut.'),
      l: 'quran', r: ['2:249-251'],
    },
  ],
  ashab_al_kahf: [
    {
      text: t('Young men who believed in their Lord among a people who worshipped others. Allah increased them in guidance; they stood and declared: “Our Lord is the Lord of the heavens and the earth.”', 'Des jeunes gens qui crurent en leur Seigneur parmi un peuple qui adorait d’autres que Lui. Allah les fit croître en guidée ; ils se levèrent et déclarèrent : « Notre Seigneur est le Seigneur des cieux et de la terre. »', 'فتية آمنوا بربهم في قوم يعبدون غيره، فزادهم الله هدى، فقاموا فقالوا: ربنا رب السماوات والأرض.', 'Jóvenes que creyeron en su Señor entre un pueblo que adoraba a otros. Allah los aumentó en guía; se levantaron y declararon: «Nuestro Señor es el Señor de los cielos y la tierra».'),
      l: 'quran', r: ['18:13-15'],
    },
    {
      text: t('They took refuge in a cave. Allah made them sleep; the sun turned away from them morning and evening, their dog lay at the entrance, and they stayed three hundred years and nine more.', 'Ils se réfugièrent dans une grotte. Allah les fit dormir ; le soleil s’écartait d’eux matin et soir, leur chien était couché à l’entrée, et ils y restèrent trois cents ans et neuf de plus.', 'أووا إلى الكهف فضرب الله على آذانهم، تزاور الشمس عن كهفهم إذا طلعت وتقرضهم إذا غربت، وكلبهم باسط ذراعيه بالوصيد، ولبثوا ثلاثمائة سنين وازدادوا تسعًا.', 'Se refugiaron en una cueva. Allah los hizo dormir; el sol se apartaba de ellos al salir y al ponerse, su perro yacía a la entrada, y permanecieron trescientos años y nueve más.'),
      l: 'quran', r: ['18:16-18', '18:25'],
    },
    {
      text: t('They woke thinking they had slept a day, and sent one of them with a silver coin to buy pure food, telling him to be discreet. Their discovery became a sign that Allah’s promise of resurrection is true.', 'Ils se réveillèrent croyant avoir dormi un jour, et envoyèrent l’un d’eux avec une pièce d’argent acheter une nourriture pure, en lui recommandant la discrétion. Leur découverte devint un signe que la promesse de résurrection est vraie.', 'استيقظوا يظنون أنهم لبثوا يومًا، فبعثوا أحدهم بورِقهم ليأتيهم بأزكى طعام وليتلطف، فكان العثور عليهم آية على أن وعد الله بالبعث حق.', 'Despertaron creyendo haber dormido un día, y enviaron a uno de ellos con una moneda de plata a comprar comida pura, pidiéndole discreción. Su hallazgo fue un signo de que la promesa de resurrección es verdad.'),
      l: 'quran', r: ['18:19-21'],
    },
  ],
  mumin_al_yasin: [
    {
      text: t('When a town rejected its messengers, a man came running from its far end: “My people, follow the messengers, follow those who ask no reward of you and are rightly guided.”', 'Quand une cité rejeta ses messagers, un homme accourut de l’extrémité de la ville : « Mon peuple, suivez les messagers, suivez ceux qui ne vous demandent aucun salaire et qui sont bien guidés. »', 'لما كذّبت القرية رسلها جاء رجل من أقصى المدينة يسعى: يا قوم اتبعوا المرسلين، اتبعوا من لا يسألكم أجرًا وهم مهتدون.', 'Cuando una ciudad rechazó a sus mensajeros, un hombre llegó corriendo desde su extremo: «Pueblo mío, seguid a los mensajeros, seguid a quienes no os piden recompensa y están bien guiados».'),
      l: 'quran', r: ['36:20-21'],
    },
    {
      text: t('“Why should I not worship the One who created me, to whom you will all return?” His people killed him. He was told: “Enter Paradise.” He said: “If only my people knew how my Lord has forgiven me.”', '« Pourquoi n’adorerais-je pas Celui qui m’a créé et vers qui vous serez ramenés ? » Les siens le tuèrent. On lui dit : « Entre au Paradis. » Il dit : « Si seulement mon peuple savait comment mon Seigneur m’a pardonné ! »', 'وما لي لا أعبد الذي فطرني وإليه ترجعون؟ فقتله قومه، فقيل: ادخل الجنة، قال: يا ليت قومي يعلمون بما غفر لي ربي.', '«¿Por qué no habría de adorar a Quien me creó y hacia Quien seréis devueltos?». Su pueblo lo mató. Se le dijo: «Entra en el Paraíso». Dijo: «¡Ojalá mi pueblo supiera cómo me ha perdonado mi Señor!».'),
      l: 'quran', r: ['36:22-27'],
    },
  ],
  mumin_al_firawn: [
    {
      text: t('A believing man of Pharaoh’s own family, who hid his faith, spoke up when Pharaoh wanted to kill Musa: “Will you kill a man because he says ‘My Lord is Allah’?” Abu Bakr later used the same words to defend the Prophet ﷺ in Makkah.', 'Un homme croyant de la famille même de Pharaon, qui cachait sa foi, prit la parole quand Pharaon voulut tuer Musa : « Tuerez-vous un homme parce qu’il dit : “Mon Seigneur est Allah” ? » Abu Bakr reprit ces mots pour défendre le Prophète ﷺ à La Mecque.', 'رجل مؤمن من آل فرعون يكتم إيمانه قال لما أراد فرعون قتل موسى: أتقتلون رجلًا أن يقول ربي الله؟ وقالها أبو بكر بعده دفاعًا عن النبي ﷺ بمكة.', 'Un hombre creyente de la propia familia de Faraón, que ocultaba su fe, habló cuando Faraón quiso matar a Musa: «¿Mataréis a un hombre porque dice: “Mi Señor es Allah”?». Abu Bakr usó luego esas palabras para defender al Profeta ﷺ en La Meca.'),
      l: 'quran', r: ['40:28', 'bukhari:3678'],
    },
    {
      text: t('He reminded them of the peoples of Nuh, ‘Ad and Thamud, and called them from the Fire to salvation. Then: “I entrust my affair to Allah.” Allah protected him from their plots.', 'Il leur rappela les peuples de Nuh, de ‘Ad et de Thamud, et les appela du Feu vers le salut. Puis : « Je confie mon sort à Allah. » Allah le protégea de leurs ruses.', 'ذكّرهم بقوم نوح وعاد وثمود، ودعاهم إلى النجاة وهم يدعونه إلى النار، ثم قال: وأفوّض أمري إلى الله، فوقاه الله سيئات ما مكروا.', 'Les recordó a los pueblos de Nuh, ‘Ad y Zamud, y los llamó del Fuego a la salvación. Luego: «Encomiendo mi asunto a Allah». Allah lo protegió de sus intrigas.'),
      l: 'quran', r: ['40:30-31', '40:41-45'],
    },
  ],
  yusha_ibn_nun: [
    {
      text: t('The young man who travelled with Musa to meet al-Khidr and forgot to mention the fish, as the Qur’an tells; the hadith names him Yusha‘ ibn Nun.', 'Le jeune homme qui accompagna Musa à la rencontre d’al-Khidr et oublia de parler du poisson, comme le raconte le Coran ; le hadith le nomme Yusha‘ ibn Nun.', 'فتى موسى في رحلته إلى الخضر الذي نسي الحوت كما في القرآن، وسمّاه الحديث يوشع بن نون.', 'El joven que acompañó a Musa al encuentro de al-Jidr y olvidó mencionar el pez, como cuenta el Corán; el hadiz lo llama Yusha‘ ibn Nun.'),
      l: 'hadith', r: ['18:60-64', 'bukhari:122'],
    },
    {
      text: t('When the Israelites refused to enter the holy land, two God-fearing men urged them: “Enter upon them through the gate.” The commentators say these were Yusha‘ and Kalib.', 'Quand les Israélites refusèrent d’entrer en terre sainte, deux hommes craignant Allah les exhortèrent : « Entrez chez eux par la porte. » Les commentateurs disent qu’il s’agissait de Yusha‘ et Kalib.', 'لما أبى بنو إسرائيل دخول الأرض المقدسة قال رجلان من الذين يخافون: ادخلوا عليهم الباب، وذكر المفسرون أنهما يوشع وكالب.', 'Cuando los israelitas se negaron a entrar en la tierra santa, dos hombres temerosos de Allah los exhortaron: «Entrad por la puerta». Los comentaristas dicen que eran Yusha‘ y Kalib.'),
      l: 'tradition', r: ['5:23', 'book:qisas'],
    },
    {
      text: t('The Prophet ﷺ told of a prophet who led an army and asked Allah to hold back the setting sun until victory came; other narrations name him Yusha‘.', 'Le Prophète ﷺ raconta qu’un prophète, menant une armée, demanda à Allah de retenir le soleil couchant jusqu’à la victoire ; d’autres récits le nomment Yusha‘.', 'أخبر النبي ﷺ عن نبي غزا فقال للشمس: اللهم احبسها علينا، فحُبست حتى فتح الله عليه، وسمّته روايات أخرى يوشع.', 'El Profeta ﷺ contó que un profeta que dirigía un ejército pidió a Allah que detuviera el sol poniente hasta la victoria; otros relatos lo llaman Yusha‘.'),
      l: 'tradition', r: ['bukhari:3124'],
    },
  ],
}
