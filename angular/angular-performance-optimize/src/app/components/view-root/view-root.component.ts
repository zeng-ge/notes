import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-view-root',
  templateUrl: './view-root.component.html',
  styleUrls: ['./view-root.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewRootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
