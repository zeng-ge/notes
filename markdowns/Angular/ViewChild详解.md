ViewChild参数详解

1. selector

   ```
   1. 组件或指令类名 如@ViewChild(Tab, { read: ComponentRef, static: true })
   2. 模版引用变量 如@ViewChild('#abc')
   3. 在view对应的组件中定义的provider
   如下面的FormGroupName就提供了一个provider，所以可以用@ChildView(ControlContainer)来获取FormGroupName
   export const formGroupNameProvider: any = {
     provide: ControlContainer,
     useExisting: forwardRef(() => FormGroupName)
   };
   @Directive({selector: '[formGroupName]', providers: [formGroupNameProvider]})
   export class FormGroupName extends AbstractFormGroupDirective implements OnInit, OnDestroy {}
   4. 通过token提供的provider	@ChildView(NG_VALUE_ACCESSOR)
   export const NUMBER_VALUE_ACCESSOR: any = {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => NumberValueAccessor),
     multi: true
   };
   @Directive({
     selector:
         'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
     host: {'(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()'},
     providers: [NUMBER_VALUE_ACCESSOR]
   })
   export class NumberValueAccessor implements ControlValueAccessor {}
   5. 模板相用
   @ChildView(TemplateRef)
   ```

2. read

   一个元素上通常会绑定多种实例，如ComponentRef, ContainerRef, TemplateRef, ElementRef, 各种指令....，read用于指定取出什么类型的实例

3. static

   用于指定查询结果的生成时间

   { static: false }表示在ngAfterViewInit之前初始化好, anglar9 默认{ static: false }

   { static: true }表示在第一次change detection之前执行，即在onInit里面就能取到值，问题在于它的值不会随之后change detection触发后改变，基本不会用到

```
View queries are set before the ngAfterViewInit callback is called.

Metadata Properties:

selector - The directive type or the name used for querying.
read - Used to read a different token from the queried elements.
static - True to resolve query results before change detection runs, false to resolve after change detection. Defaults to false.
The following selectors are supported.

Any class with the @Component or @Directive decorator
A template reference variable as a string (e.g. query <my-component #cmp></my-component> with @ViewChild('cmp'))
Any provider defined in the child component tree of the current component (e.g. @ViewChild(SomeService) someService: SomeService)
Any provider defined through a string token (e.g. @ViewChild('someToken') someTokenVal: any)
A TemplateRef (e.g. query <ng-template></ng-template> with @ViewChild(TemplateRef) template;)
```

