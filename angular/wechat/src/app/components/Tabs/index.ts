import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit
} from "@angular/core";
import { Tab } from '../Tab'
import Salary from "src/app/services/salary";

@Component({
  selector: 'tabs',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
  providers: [Salary]
})
export class Tabs implements AfterContentInit{
  @ContentChildren(Tab) tabItems: QueryList<Tab>;

  constructor(salary: Salary){}
  ngAfterContentInit() {
    // console.log(this.tabItems)
  }
}
