import { Directive, ViewContainerRef, TemplateRef, Input } from "@angular/core";

@Directive({
  selector: '[hidden]'
})
export class Hidden{
  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  @Input() set hidden(hidden: boolean) {
    if (hidden) {
      this.viewContainer.clear()
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }
}
