import { state } from "../redux/decorators/state";
import { action } from '../redux/decorators/action';
import { Store } from '../redux/store';
import { Injectable } from '@angular/core';
import { selector } from '../redux/decorators/selector';

interface IUser{
    name: string;
    age?: number;
}

export namespace UserAction{
    export class GetUser{
        static type = '[UserAction] GetUser'
        constructor(){}
    }
    export class SetUser{
        static type = '[UserAction] SetUser'
        constructor(public name: string, public age: number){}
    }
}

@state<IUser>({
    name: 'user',
    defaultState: {
        name: null,
        age: null
    }
})
@Injectable()
export class UserState{
    constructor(private store: Store) {}

    @selector()
    static User(state) {
        return state.user;
    }

    @action(UserAction.GetUser)
    getUser(state: IUser, action: UserAction.GetUser){
        setTimeout(() => {
            this.store.setState(UserState, {
                name: '小丸子',
                age: 3
            })
        })
    }

    @action(UserAction.SetUser)
    setUser(state: IUser, action: UserAction.SetUser){
        setTimeout(() => {
            this.store.setState(UserState, {
                name: action.name,
                age: action.age
            })
        }, 2000)
    }
}