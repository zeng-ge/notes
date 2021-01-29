import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.less']
})
export class ParentComponent implements OnInit {
  instance: any;
  name = 'abc'

  constructor() { 
    this.instance = this;
  }

  ngOnInit(): void {
  }

}
