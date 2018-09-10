import { Component, Input, Output, EventEmitter } from "@angular/core";


@Component({
  selector: 'form-button',
  template: `<button (click)="onClick($event)">{{content}}</button>`
})
export class FormButton{
  @Input('text') content: String;
  /**
   * 这里不能直接用click，会与DOM本身的click事件重名，
   * 会倒致事件触发两次，组件内触发一次，外部引用的地方触发一次，都是由DOM本身触发，
   * 即自定义事件emit的值上层得不到，上层得到的是event
   * 如<form-button (click)="abc($event)"></form-button>
   * 这个$event会是DOM本身的事件
   *
   * 换成form-click就不一样了
   * 组件内部由DOM触发
   * 父级由自定义事件emit触发
   * EventEmitter本质上是个Subject，emit时可以相当于执行next()
   *
   */
  @Output('formClick') clickEvent: EventEmitter<String> = new EventEmitter<String>()

  onClick(event): void {
    console.log('native click', event)
    this.clickEvent.emit('click button')
  }
}
