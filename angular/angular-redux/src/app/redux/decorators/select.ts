import { SELECTOR_META_KEY } from './selector'
import { getStateClassMeta } from './state'
import { STORE_KEY, Store } from '../store'

export const select = project => (componentClass, key) => {
    const stateClass = project[SELECTOR_META_KEY]
    const selectorFieldKey = `${key}Selector`
    Object.defineProperty(componentClass, selectorFieldKey, {
        enumerable: false,
        configurable: true,
        writable: true,
    })

    Object.defineProperty(componentClass, key, {
        enumerable: true,
        configurable: true,
        get() {
            if(!componentClass[selectorFieldKey]) {
                componentClass[selectorFieldKey] = createSelectObservable(stateClass, project)
            }
            return componentClass[selectorFieldKey]
        }
    })
}

export const createSelectObservable = (stateClass, project) => {
    const meta = getStateClassMeta(stateClass)
    const { instance } = meta
    const store = instance[STORE_KEY];
    return store.select(project)
}