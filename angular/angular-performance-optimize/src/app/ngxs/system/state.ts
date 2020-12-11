import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { Injectable, ApplicationRef } from '@angular/core';
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

    @Action(System.SingleMacroTask)
    singleMacroTask(ctx: StateContext<SystemStateModel>, action: System.MergeMacroTasks){
        /***
         * 触发两次tick:
         * patchState执行完后在setState时会通过_executionStrategy.leave退出, leave会通过ngzone.run触发tick
         */
        return this.httpRequest()
        .then(() => { 
            ctx.patchState({ //每调用一次patchState就触发一次tick,调多次会触发多次tick
                name: Math.random() + ''
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