import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { TakeUtilDestroyComponent } from './components/take-util-destroy/take-util-destroy.component';
import { CommonPipe } from './pipe/common.pipe';
import { PurePipe } from './pipe/pure.pipe';
import { ViewParentComponent } from './components/view-parent/view-parent.component';
import { ViewChildComponent } from './components/view-child/view-child.component';
import { ContentChildComponent } from './components/content-child/content-child.component';
import { ViewRootComponent } from './components/view-root/view-root.component';
import { ViewChild2Component } from './components/view-child2/view-child2.component';
import { states } from './ngxs';

@NgModule({
  declarations: [
    AppComponent,
    TakeUtilDestroyComponent,
    CommonPipe,
    PurePipe,
    ViewParentComponent,
    ViewChildComponent,
    ContentChildComponent,
    ViewRootComponent,
    ViewChild2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(states),
    NgxsLoggerPluginModule.forRoot({collapsed: false, disabled: false}),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
