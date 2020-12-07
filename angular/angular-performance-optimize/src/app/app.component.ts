import { Component, DoCheck } from '@angular/core';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements DoCheck{
  title = 'angular-performance-optimize';
  count = 0;
  takeUtilDestroy = true;
  formControl: FormControl;
  constructor(){
    this.formControl = new FormControl()
  }
  
  public ngDoCheck(): void {
    console.log('app component =>', this.count++)
  }

  onClick(){
    this.takeUtilDestroy = false;
  }
}
