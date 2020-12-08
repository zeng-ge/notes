import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ViewParentComponent } from '../view-parent/view-parent.component';

@Component({
  selector: 'app-view-child2',
  templateUrl: './view-child2.component.html',
  styleUrls: ['./view-child2.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewChild2Component implements OnInit, DoCheck {

  count = 0;
  constructor(private changeDefector: ChangeDetectorRef, private parent: ViewParentComponent) { }

  ngOnInit(): void {
   
  }

  ngDoCheck(){
    console.log('view child 2 ==> ngDoCheck')
  }

  increase(){
    this.count++;
  }

}
