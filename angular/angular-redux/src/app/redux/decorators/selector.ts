export const SELECTOR_META_KEY = 'SELECTOR_META_KEY'
export const selector = () => (stateClass, key, describer) => {
    describer.value[SELECTOR_META_KEY] = stateClass
    return describer
}