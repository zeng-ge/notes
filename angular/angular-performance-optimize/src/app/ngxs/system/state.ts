import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { System } from './action';

export interface SystemStateModel{
    name?: string;
}
export const SYSTEM_TOKEN = new StateToken<SystemStateModel>('system')

@State<SystemStateModel>({
    name: SYSTEM_TOKEN,
    defaults: {
        name: ''
    }
})
@Injectable({
    providedIn: 'root'
})
export class SystemState{
    @Action(System.MergeMacroTasks)
    mergeMacroTasks(ctx: StateContext<SystemStateModel>, action: System.MergeMacroTasks){
        return this.sendRequests().then(() => {
            ctx.patchState({
                name: '123'
            })
        })    
    }

    async sendRequests() {
        await this.httpRequest()
        await this.httpRequest()
        await this.httpRequest()
    }

    httpRequest() {
        return new Promise((resole,reject) => {
          setTimeout(() => {
            resole()
          }, 10)
        })
      }
}