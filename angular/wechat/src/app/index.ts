import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomepageModule } from './features/homepage/module';
import { Hidden } from './components/Hidden';
import { Tabs } from './components/Tabs';
import { Tab } from './components/Tab';
import { Entry } from './features/entry/containers/Entry';
import { Showing } from './components/Showing';
import { Indicator } from './components/Indicator';

@NgModule({
  declarations: [
    Tabs,
    Tab,
    Entry,
    Hidden,
    Showing,
    Indicator
  ],
  imports: [
    BrowserModule,
    HomepageModule
  ],
  providers: [],
  bootstrap: [Entry]
})
export class AppModule { }
