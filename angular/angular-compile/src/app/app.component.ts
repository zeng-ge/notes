import { Component, AfterViewInit, ViewContainerRef, NgModule, Compiler, Injector, NgModuleRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-compile';

  constructor(
    private viewContainer: ViewContainerRef, 
    private compiler: Compiler, 
    private injector: Injector, 
    private moduleRef: NgModuleRef<any>
    ) {}
  ngAfterViewInit(): void {
    this.createDynamicComponent();
  }

  createDynamicComponent() {
    const dynamicComponent = Component({
      template: '<div class="dynamic-component">{{name}}</div>',
      styles: ['.dynamic-component{color: purple;}']
    })(class DynamicComponent{
      name: string;
    })
    const module = NgModule({declarations: [dynamicComponent ]})(class DynamicModule{})
    
    const moduleFactory = this.compiler.compileModuleAndAllComponentsSync(module)
    const componentFactory = moduleFactory.componentFactories[0]
    const componentRef = this.viewContainer.createComponent(componentFactory)
    setTimeout(() => {
      componentRef.instance.name = 'hello dynamic component'
    })
  }
}
