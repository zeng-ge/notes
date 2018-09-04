import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomepageModule } from './features/homepage/module';
import { Entry } from './features/entry/containers/Entry';

@NgModule({
  declarations: [
    Entry
  ],
  imports: [
    BrowserModule,
    HomepageModule
  ],
  providers: [],
  bootstrap: [Entry]
})
export class AppModule { }
