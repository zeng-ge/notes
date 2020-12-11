import { enableProdMode, ApplicationRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableDebugTools } from '@angular/platform-browser'

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule).then(moduleRef => {
  const applicationRef = moduleRef.injector.get(ApplicationRef)
  const appComponentRef = applicationRef.components[0]
  enableDebugTools(appComponentRef)//ng.profiler.timeChangeDetection({record: true})
})
  .catch(err => console.error(err));
