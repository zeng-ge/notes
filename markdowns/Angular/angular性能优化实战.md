### angular性能优化

1. 路由延迟预加载

   ```
   路由监听angular初始化事件，它的初始化等级很高
   preload是很早就开始执行了，如果预加载的文件较多，会卡住ajax请求
   ```

2. 路由守卫

   ```
   路由守卫在准备数据时对应组件是不会render的，会形成明显的卡顿
   除非必不得己，尽量在组件内部加载数据，加载一部分显示一部分
   ```

3. 动画

```
zorro组件中用了大量angular的animation，这些动画都是通过事件触发的，会倒致大量的重复render
尽量不要使用angular本身的animation, 尽量用css3的动画

倒入NoopAnimationsModule可以禁用animation(代替BrowserAnimationsModule)
```

4. nz-tyography

   ```
   内部使用了requestAnimation来触发计算ellipsis，
   在ngOnChanges与ngAfterViewInit都会触发计算，如果在列表中使用会倒致大量的requestAnimation callback的调用，直接阻塞render,界面会卡死
   ```

5. popover与modal

   ```
   popover与modal在封装时尽量在使用的地方用ng-if来控制是否展示
   如下面的形式在外部组件更新时也会更新，造成不必要的性能浪费（当前项目中大量的这种写法造成每个tick都有明显的卡顿）
   <custom-modal visible="a" ...props></custom-modal>
   ```

6. try/catch

   ```
   不要用try/catch来控制流程, 它本身的性能会较差
   ```

7. 11