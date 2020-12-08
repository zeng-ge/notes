import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-view-parent',
  templateUrl: './view-parent.component.html',
  styleUrls: ['./view-parent.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ViewParentComponent implements OnInit, DoCheck {

  count = 0

  constructor(private changeDefector: ChangeDetectorRef, private applicationRef: ApplicationRef) { }

  ngOnInit(): void {
    window.component = this;
  }

  ngDoCheck(){
    console.log('parent =====> ngDoCheck')
  }

  increase(){
    this.count++
  }

}
