import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit
} from "@angular/core";
import { Tab } from '../Tab'

@Component({
  selector: 'tabs',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class Tabs implements AfterContentInit{
  @ContentChildren(Tab) tabItems: QueryList<Tab>;

  ngAfterContentInit() {
    // console.log(this.tabItems)
  }
}
