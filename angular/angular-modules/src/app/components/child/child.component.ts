import { Component, OnInit, Input, AfterViewInit, ViewContainerRef, Host, Attribute } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.less']
})
export class ChildComponent implements OnInit, AfterViewInit {

  changed = false;
  @Input() parent: any;

  @Input() abc = false;
  constructor(@Host() private el: ViewContainerRef) { // 只有构造器的参数用参数注解有效，所有的参数注解都放在__parameters__里面，并没有用key区分
    this.props(null, null)
  }

  props(@Attribute('a') a, @Attribute('b') b) {
    console.log(a)
  }

  props123(@Attribute('a1') a1, @Attribute('b1') b1) {
    console.log(a1)
  }

  /***
   * 对于组件自身而言，
   * init, changes, docheck发生在模板函数执行之前，所以在这些生命周期里面可以改变属性的值
   * 对于viewinit, viewcheck, content init, content check发生在模板函数执行之后,改变属性就会倒致脏数据
   */
  ngAfterViewInit(): void {
    this.parent.name = 'ddd'
    // this.changed = true; 
  }

  ngOnInit(): void {
    console.log(this.parent)
  }

}
