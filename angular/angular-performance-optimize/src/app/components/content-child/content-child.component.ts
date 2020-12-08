import { Component, OnInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-content-child',
  templateUrl: './content-child.component.html',
  styleUrls: ['./content-child.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentChildComponent implements OnInit, DoCheck {

  count = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    console.log('content child ==> ngDoCheck')
  }

  increase(){
    this.count++
  }

}
