// Adds the Spanish texts to the lightweight core dataset when the app loads; full era chunks apply Spanish lazily inside people/loader.ts.
import { peopleCore, ululAzm } from '../peopleCore'
import { applySpanish } from './people.es'

applySpanish(peopleCore)
ululAzm.t.es ??= 'Los cinco mensajeros de firme resolución (Ulul ‘Azm): Nuh, Ibrahim, Musa, ‘Isa y Muhammad ﷺ.'
