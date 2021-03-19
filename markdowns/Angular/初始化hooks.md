### angualr的初始化hooks

1. APP_INITIALIZER

   > 在模块初始化完成之后，在启动根模块之前执行

   ```
   PlatformRef.bootstrapModule
   PlatformRef.bootstrapModuleFactory
   ApplicationInitStatus.runInitializers会将所有的回调拿出来遍历执行
   PlatformRef.bootstrapModule()
   
   ```

   

2. APP_BOOTSTRAP_LISTENER

   > 在模块启动后，加载根组件之前执行
   
   ```
   PlatformRef.bootstrapModule() => appRef.bootstrap(f)
   	ApplicationRef.bootstrap(componentOrFactory)
   	ApplicationRef._loadComponent
   	
   private _loadComponent(componentRef: ComponentRef<any>): void {
       this.attachView(componentRef.hostView);
       this.tick();
       this.components.push(componentRef);
       // Get the listeners lazily to prevent DI cycles.
       const listeners =
           this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners);
       listeners.forEach((listener) => listener(componentRef));
     }
   ```
   
   
