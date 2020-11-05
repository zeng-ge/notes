import { Component, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef } from "@angular/core";

@Component({
  selector: "template-ref-test",
  templateUrl: "./index.html",
})
export default class TemplateRefTest implements AfterViewInit {
  @ViewChild("abc") contentTemplateRef!: TemplateRef<{}>;
  @ViewChild("abc") contentContainerRef!: ViewContainerRef;

  ngAfterViewInit() {
    console.log('template ref', this.contentTemplateRef);
    console.log('container ref', this.contentContainerRef);
  }
}
