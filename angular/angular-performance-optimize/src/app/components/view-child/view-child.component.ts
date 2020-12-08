import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { timer } from 'rxjs';
import { ViewParentComponent } from '../view-parent/view-parent.component';

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styleUrls: ['./view-child.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewChildComponent implements OnInit, DoCheck {

  count = 0;
  constructor(private changeDefector: ChangeDetectorRef, private parent: ViewParentComponent) { }

  ngOnInit(): void {
    // timer(2000).subscribe(()=>{
    //   this.count++;
    //   this.parent.count++; //父组件会更新
      /**
       * 在tick之前先标示需要更新
       * this.changeDefector.markForCheck()
       */
      // this.changeDefector.markForCheck()

      /**
       * 更新组件及其子组件(如果子组件本身是onPush，且input不变的话是不会触发子组件更新的)
       */
      // this.changeDefector.detectChanges()
    // })
  }

  ngDoCheck(){
    console.log('view child ==> ngDoCheck')
    this.count++ // ngDoCheck由父组件触发，所以它在子组件render之前运行，改变数据会倒致结果更新
    /**
     * 这只是标示组件及其父组件需要更新，而ngDoCheck己经属于tick的一部分，所以不会触发更新
     */
    // this.changeDefector.markForCheck()
  }

  increase(){
    this.count++;
  }

}
