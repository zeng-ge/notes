import { Component, Input, DoCheck, ChangeDetectorRef, OnInit } from "@angular/core";

@Component({
  selector: 'app-module-component',
  // template: '<div>module component</div>'
  templateUrl: './module.component.html'
})
export class ModuleComponent implements OnInit, DoCheck{
  @Input() hello = ""
  title = '111'
  constructor(private cdr: ChangeDetectorRef){
    
  }
  ngOnInit(): void {
    this.cdr.detach()
  }
  onClick(){
    this.title = '456'
    this.cdr.detectChanges()
  }
  ngDoCheck(): void {
    console.log('do check')
  }
}