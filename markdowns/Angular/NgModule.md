# NgModule

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

   