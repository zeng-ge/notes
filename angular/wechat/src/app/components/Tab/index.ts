import { Component, ContentChildren, QueryList, AfterContentInit, ViewChildren, ContentChild, ViewChild, AfterViewChecked, AfterViewInit, ElementRef, ViewContainerRef, ComponentRef } from "@angular/core";
import Salary from "src/app/services/salary";

@Component({
  selector: 'tab',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
  providers: [Salary]
})
export class Tab implements AfterViewInit {
  @ViewChild('header') header: any;
  @ViewChild('body') body: any;

  constructor(private el: ElementRef, private viewContainer: ViewContainerRef, salary: Salary) {
    console.log(this.el)
    console.log(this.viewContainer)
  }

  ngAfterViewInit() {
    console.log(this.header)
  }
}
