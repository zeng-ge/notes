import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TakeUtilDestroyComponent } from './components/take-util-destroy/take-util-destroy.component';
import { CommonPipe } from './pipe/common.pipe';
import { PurePipe } from './pipe/pure.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TakeUtilDestroyComponent,
    CommonPipe,
    PurePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
