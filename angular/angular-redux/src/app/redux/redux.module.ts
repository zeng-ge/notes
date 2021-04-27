import { NgModule, ModuleWithProviders, APP_INITIALIZER} from '@angular/core';
import { Store } from './store';

export const STATE_CLASSES = 'STATE_CLASSES'

@NgModule({})
export class ReduxModule {
  static forRoot(stateClasses: Array<any>): ModuleWithProviders<any> {
    return {
      ngModule: ReduxModule,
      providers: [
        Store,
        ...stateClasses,
        {
          provide: STATE_CLASSES,
          useValue: stateClasses
        },
        {
          provide: APP_INITIALIZER,
          useFactory: (store: Store) => () => store.initStates(),
          multi: true,
          deps: [Store]
        },
      ]
    }
  }
}
