import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-take-util-destroy',
  templateUrl: './take-util-destroy.component.html',
  styleUrls: ['./take-util-destroy.component.less']
})
export class TakeUtilDestroyComponent implements OnInit, OnDestroy {

  subject: Subject<any>;
  constructor() {}

  ngOnInit(): void {
    this.subject = new Subject()
    this.subject.subscribe(() => {
      console.log('subscribe')
    })
    
    timer(10000).pipe(takeUntil(this.subject)).subscribe(() => {
      console.log('TakeUtilDestroyComponent ===>', 'timer')
    })
  }

  ngOnDestroy(): void {
    this.subject.next()
  }

}
