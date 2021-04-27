import { Injectable, Injector, Inject, NgZone } from '@angular/core';
import { BehaviorSubject, of, Observable, from, Observer } from 'rxjs';
import { STATE_CLASSES } from './redux.module';
import { getStateClassMeta } from './decorators/state';
import { set, assign, find } from 'lodash';
import { map, distinctUntilChanged } from 'rxjs/operators';
export const STORE_KEY = 'STORE_KEY'

@Injectable({
    providedIn: 'root'
})
export class Store {
    public valueEmitter = new BehaviorSubject({});
    private rootValue = {};
  
    constructor(
      private _injector: Injector,
      @Inject(STATE_CLASSES) private stateClasses: [],
      private ngzone: NgZone
    ) {
    }
  
    initStates() {
      this.stateClasses.forEach(stateClass => this.createStateInstance(stateClass))
    }
  
    createStateInstance(stateClass) {
      const meta = getStateClassMeta(stateClass);
      const { name, defaultState } = meta
      meta.instance = this._injector.get(stateClass)
      meta.instance[STORE_KEY] = this;
      this.rootValue[name] = defaultState
    }

    setState(stateClass, values) {
        const meta = getStateClassMeta(stateClass);
        set(this.rootValue, meta.name, values)
        this.leave(() => this.valueEmitter.next(this.rootValue))
    }

    patchState(stateClass, values) {
        const meta = getStateClassMeta(stateClass);
        assign(this.rootValue[meta.name], values)
        this.leave(() => this.valueEmitter.next(this.rootValue))
    }

    dispatch(action){
        const dispatchResult = this.executeDistach(action);
        dispatchResult.subscribe({error: () => {}})
        return dispatchResult.pipe(this.leaveOperator());
    }

    executeDistach(action) {
        const actionType = action.constructor.type;
        const actionStateClass = find(this.stateClasses, stateClass => {
            const meta = getStateClassMeta(stateClass);
            return meta.actions[actionType]
        })
        if(!actionStateClass) {
            throw new Error('not state matched the action')
        }
        return this.executeAction(action, actionStateClass);
    }

    executeAction(action, actionStateClass) {
        const actionType = action.constructor.type;
        const meta = getStateClassMeta(actionStateClass);
        const { methodName } = meta.actions[actionType];

        const result = this.entry(() => {
            return meta.instance[methodName](this.rootValue[meta.name], action)
        })
        let observableResult = result;
        if(result instanceof Promise) {
            observableResult = from(result)
        }
        if(!(observableResult instanceof Observable)) {
            observableResult = of(result)
        }
        return observableResult
    }

    leaveOperator<T>() {
        return (source: Observable<T>) => {
            return new Observable((sink: Observer<T>) => {
                return source.subscribe({
                    next: (value) => {
                        this.leave(() => sink.next(value));
                    },
                    error: (error) => {
                        this.leave(() => sink.error(error));
                    },
                    complete: () => {
                        this.leave(() => sink.complete());
                    }
                });
            });
        };
    }

    entry(fn) {
        if(NgZone.isInAngularZone()) {
            return this.ngzone.runOutsideAngular(fn)
        }
        return fn();
    }

    leave(fn) {
        if(NgZone.isInAngularZone()) {
            return fn()
        }
        return this.ngzone.run(fn)
    }

    select(project){
        return this.valueEmitter.pipe(
            map(project),
            distinctUntilChanged(),
            this.leaveOperator()
        )
    }

    selectSnapshot(project) {
        return project(this.rootValue)
    }
}