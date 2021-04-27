import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { states } from './ngxs'
import { ReduxModule } from './redux/redux.module';
import { states as reduxStates} from './states'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReduxModule.forRoot(reduxStates),
    NgxsModule.forRoot(states),
    NgxsLoggerPluginModule.forRoot({collapsed: false, disabled: false}),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
