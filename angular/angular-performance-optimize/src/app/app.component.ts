import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements DoCheck{
  title = 'angular-performance-optimize';
  count = 0;
  takeUtilDestroy = true;
  
  public ngDoCheck(): void {
    console.log('app component =>', this.count++)
  }

  onClick(){
    this.takeUtilDestroy = false;
  }
}
