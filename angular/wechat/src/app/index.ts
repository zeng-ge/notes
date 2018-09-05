import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomepageModule } from './features/homepage/module';
import { Tabs } from './components/Tabs';
import { Tab } from './components/Tab';
import { Entry } from './features/entry/containers/Entry';

@NgModule({
  declarations: [
    Tabs,
    Tab,
    Entry,
  ],
  imports: [
    BrowserModule,
    HomepageModule
  ],
  providers: [],
  bootstrap: [Entry]
})
export class AppModule { }
