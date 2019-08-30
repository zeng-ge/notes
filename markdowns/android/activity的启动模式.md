# 启动模式

## 返回栈
> anroid使用Task管理Activity, 一个Task就是一组存放在栈里面的Activity集合，这个集合称为返回栈(Back Stack)
```kotlin
在Activity里面，getTaskId()可以获取其当前所在Task的Id
```

## 启动模式
1. standard
> 每次都实例化一个新的Activity，同一个返回栈里可以有多个
2. singleTop
> 启动Activity时，查看栈顶是不是同一个Activity，如果是就直接用
3. singleTask
> 启动Activity时，查看整个栈里面有没有Activity，如果有就将其上的Activity全部出栈，并restart它
4. singleInstance
> 开启一个新的Task来入栈该Activity
> 每个APP有一个自己的返回栈，不同APP打开同一个Activity时一般会新在它自己的返回栈里入栈一个新的实例，只有singleInstance不同，所有的APP共用同一个Activity

```kotlin
A => B(singleInstance) => C

两个栈：
第一个：A, C
第二个：B

C点回退，看到A， A点回退看到B

C点回退时在栈1，此时1里面只有A，就显示了A，退出A栈1就空了，接着显示栈2里面的B
```

