# NgModule

### 模块加载（以懒加为线）

```typescript
1. RouterConfigLoader.load 加载bundle
	 const moduleFactory$ = this.loadModuleFactory(route.loadChildren);
	 route.loadChildren就是在路由中配置的加载函数
	 加调函数中：const module = factory.create(parentInjector);根据moduel的工厂方法配和父级Injector(AppModule Injector)创建懒加载模块对应的  		 module实例
2. 创建ModuleRef
	NgModuleFactory$1.create(parentInjector) {
        return new NgModuleRef$1(this.moduleType, parentInjector);
    }
3. 创建模块注入器,在创建moduleRef过程中
   this._r3Injector = createInjectorWithoutInjectorInstances(ngModuleType, _parent, [
            { provide: NgModuleRef, useValue: this }, {
                provide: ComponentFactoryResolver,
                useValue: this.componentFactoryResolver
            }
        ], stringify(ngModuleType));
4. processInjectorType对模块进行处理
5. verifySemanticsOfNgModuleDef对模块进行验证
	 verifyDeclarationIsUnique会验证该模块的declarations是否己经存在了（有一个全局map ownerNgModule记录所有模块的declarations），如果不存在就添加进  		map，如果存在就证明重复了
	 
对于懒加载的模块来说，当一个组件第二次出现时就会验证失败而报错
```



> 同一个component只能出现在一个declarations里面，这是由编译器决定的
>
> component要被render必须在某个declarations里面先声明（entryComponents里面的组件也需要在declarations里面声明）

### share.module

1. 同一个组件只能在一个模块中声明，这是share.module能存在的前提（所以不必担心app模块与router模块用的组件不是同一个，都需要通过share.module来分享）

   ```typescript
   如下面的示例：在share.module与appcomponent中都声明了ModuleComponent,在编译时就报错了
   
   The Component 'ModuleComponent' is declared by more than one NgModule.
   'ModuleComponent' is listed in the declarations of the NgModule 'ShareModule'.
   'ModuleComponent' is listed in the declarations of the NgModule 'AppModule'.
   
   @NgModule({
     declarations: [
         ModuleComponent
     ],
     exports: [
         ModuleComponent
     ]
   })
   export class ShareModule{}
   
   @NgModule({
     declarations: [
       AppComponent,
       ModuleComponent
     ],
     imports: [
       BrowserModule,
       ShareModule
     ],
     providers: [],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   ```

2. 同一个模块在两个懒加载的route中声明，在webpack编译bundle时会报错

   > 在开启aot的情况下，webpack在编译时就会报错
   >
   > 在关闭aot的情况下，当懒加载第二个route时控制台会打印 Error: Type UserComponent is part of the declarations of 2 modules: UserRouting1Module and UserRoutingModule! 

   ```javascript
   src/app/modules/user/user-routing.module.ts:12:20
   12     declarations: [UserComponent],
   ~~~~~~~~~~~~~
   'UserComponent' is listed in the declarations of the NgModule 'UserRoutingModule'.
   src/app/modules/user1/user-routing1.module.ts:12:20
   12     declarations: [UserComponent],
   ~~~~~~~~~~~~~
   'UserComponent' is listed in the declarations of the NgModule 'UserRouting1Module'.
   
   @NgModule({
       declarations: [UserComponent],
       imports: [RouterModule.forChild(routes)],
       exports: [RouterModule]
   })
   export class UserRoutingModule{}
   
   @NgModule({
       declarations: [UserComponent],
       imports: [RouterModule.forChild(routes)],
       exports: [RouterModule]
   })
   export class UserRouting1Module{}
   ```

   