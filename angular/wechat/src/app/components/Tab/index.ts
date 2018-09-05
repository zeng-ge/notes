import { Component, ContentChildren, QueryList, AfterContentInit, ViewChildren, ContentChild, ViewChild, AfterViewChecked, AfterViewInit } from "@angular/core";

@Component({
  selector: 'tab',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class Tab implements AfterViewInit{
  @ViewChild('header') header: any;
  @ViewChild('body') body: any;

  ngAfterViewInit() {
    console.log(this.header)
  }
}
