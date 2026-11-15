// Adds the Spanish texts to the shared data once, when the app loads. Kept out of people.ts so the
// Node scripts in scripts/ can import the datasets without resolving this module.
import { people, ululAzm } from '../people'
import { applySpanish } from './people.es'

applySpanish(people)
ululAzm.t.es ??= 'Los cinco mensajeros de firme resolución (Ulul ‘Azm): Nuh, Ibrahim, Musa, ‘Isa y Muhammad ﷺ.'
