import { StateToken, State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { System } from './action';

export interface SystemStateModel{
    name?: string;
    age?: number
}
export const SYSTEM_TOKEN = new StateToken<SystemStateModel>('system')

@State<SystemStateModel>({
    name: SYSTEM_TOKEN,
    defaults: {
        name: '',
        age: null
    }
})
@Injectable({
    providedIn: 'root'
})
export class SystemState{
    @Selector()
    static user(state: SystemStateModel): SystemStateModel {
        return state;
    }
    @Action(System.User)
    getUser(context: StateContext<SystemStateModel>, action: System.User) {
        setTimeout(() => {
            context.patchState({name: 'hello', age: 20})
        })
    }
}