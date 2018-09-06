import { Directive, ViewContainerRef, TemplateRef, Input, ContentChild, AfterContentInit } from "@angular/core";
import { Indicator } from "../Indicator";

@Directive({
  selector: '[showing]'
})
export class Showing{
  private isRendered: boolean = false
  /**
   * 不使用*showing，通过ng-template的方式来做的话很难得到templateRef
   * <ng-template [showing]="1"></ng-template>
   * 获取templateRef的尝试：
   * 1) @ContentChild('Showing') templateRef: TemplateRef<any>
   * 得到的是Showing对象本身，并且只有在ngAfterContentInit之后才会有值
   * 2) 使用模板引用变量<ng-template [showing]="1" #abc></ng-template>
   * @ContentChild('abc')可以得到templateRef，但是这种方式需要使用者指定特定的变量，不可取
   */
  // @ContentChild(Indicator) templateRef: TemplateRef<any>

  /**
   * 使用*showing时，可以直接注入templateRef来得到ng-template
   * <div *showing="1">showing</div>
   * 相当于:
   * <ng-template *showing="1"><div>showing</div></ng-template>
   *
   * 官方的用法都是直接注入ng-template，并不会使用@ContentChild之类的查找TemplateRef
   * 如:https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts
   * @param viewContainer
   * @param templateRef
   */
  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  @Input() set showing(showing: boolean) {
    if (showing && !this.isRendered) {
      this.viewContainer.createEmbeddedView(this.templateRef)
      this.isRendered = true
    } else {
      this.viewContainer.clear()
      this.isRendered = false
    }
  }

}
