# forRoot与forChild

[别再对 Angular Modules 感到迷惑](https://zhuanlan.zhihu.com/p/97298969)

> forRoot与forChild本质没区别，都只是为module指定依赖而己

```
为module指定依赖有两种形式：
@NgModule({
	providers: [AService]
})
class AModule{}

1)直接导入module
@NgModule({
	imports: [AModule]
})
class BModule{}

2)导入模块并指定依赖
@NgModule({
	imports: [
		{
			ngModule: AModule,
			providers: [AService]
		}
	]
})
class BModule()

第二种形式的导入可以根据条件为不同module导入不同的依赖

forRoot与forChild本身就是根据条件提供不同的模块依赖（方法名目前看来只是一种约定）
```

### 导步加载模块

> 异步加载的模块生创建一个新的injector（父injector是root)，如果导步模块与主模块都依赖同一个service，在不特殊处理的情况下就会产生两个实例。

```
解决方案：
主模块依赖该Service
异步模块不依赖该Service，这样子injector在找不到的情况下会去父injector里面查找对应实例
如下面的router在forRoot里面提供了大量的provider，而大forChild里面只提供了最基本的provider，这样相关的provider都会在根injector实例化
```

### router示例：

> 区别很明显，forRoot提供了更多的providers

```
static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders<RouterModule> {
    return {
      ngModule: RouterModule,
      providers: [
        ROUTER_PROVIDERS,
        provideRoutes(routes),
        {
          provide: ROUTER_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[Router, new Optional(), new SkipSelf()]]
        },
        {provide: ROUTER_CONFIGURATION, useValue: config ? config : {}},
        {
          provide: LocationStrategy,
          useFactory: provideLocationStrategy,
          deps:
              [PlatformLocation, [new Inject(APP_BASE_HREF), new Optional()], ROUTER_CONFIGURATION]
        },
        {
          provide: RouterScroller,
          useFactory: createRouterScroller,
          deps: [Router, ViewportScroller, ROUTER_CONFIGURATION]
        },
        {
          provide: PreloadingStrategy,
          useExisting: config && config.preloadingStrategy ? config.preloadingStrategy :
                                                             NoPreloading
        },
        {provide: NgProbeToken, multi: true, useFactory: routerNgProbeToken},
        provideRouterInitializer(),
      ],
    };
  }
  static forChild(routes: Routes): ModuleWithProviders<RouterModule> {
    return {ngModule: RouterModule, providers: [provideRoutes(routes)]};
  }
```

