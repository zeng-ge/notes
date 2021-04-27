import { getStateClassMeta } from './state';
export interface ActionType{
    type: string;
}

export const action = (actionType: ActionType) => {
    return (stateClassPrototype, key) => {
        const stateClass = stateClassPrototype.constructor;
        const meta = getStateClassMeta(stateClass);
        meta.actions[actionType.type] = {
            type: actionType.type,
            methodName: key
        }
    }
}