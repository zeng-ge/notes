export interface IStateOption<T>{
    name: string;
    defaultState: T;
}

export const STATE_CLASS_META = Symbol('STATE_CLASS_META');

export const getStateClassMeta = (targetClass) => {
    if(!targetClass[STATE_CLASS_META]) {
        targetClass[STATE_CLASS_META] = {
            name: null,
            defaultState: null,
            instance: null,
            actions: {}
        };
    }
    return targetClass[STATE_CLASS_META];
}

export const state = <T>(option: IStateOption<T>) => {
    return (targetClass) => {
        const meta = getStateClassMeta(targetClass)
        meta.name = option.name;
        meta.defaultState = option.defaultState;
        return targetClass
    }
}