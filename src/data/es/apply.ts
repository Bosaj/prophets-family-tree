// Adds the Spanish texts to the shared data once, when the app loads. Kept out of people.ts so the
// Node scripts in scripts/ can import the datasets without resolving this module.
import { people } from '../people'
import { applySpanish } from './people.es'
import { applySpanishNames } from './names.es'

applySpanish(people)
applySpanishNames()
