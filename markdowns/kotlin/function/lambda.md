# lambda

>  kotlin中函数被当作[头等公民](https://zh.wikipedia.org/wiki/头等公民)。这意味着，函数可以作为别的函数的参数、函数的返回值，赋值给变量或存储在数据结构中
>
> lambda 表达式与匿名函数是“函数字面值”，即未声明的函数， 但立即做为表达式传递

``` kotlin
//这里的lambda表达示没有声明，以表达示的形式传递，它会被编译成一个Function的实例的形式
//可以参考reduce示例里面调用处的编译结果
max(strings, { a, b -> a.length < b.length })
```

## lambda的定义

1. lambda表达示括在花括号里面
2. 参数声明（包括参数类型）放在花括号内部, 多个参数不能用()括起来, 要解构的参数用()包起来
3. 函数体跟在->后面
4. 如果推断出lambda有返回值，那么最后一个表达示会作为返回值（如lambda赋值时的变量定义了返回类型）
5. lambda内部带return时必须配合标记使用，否则编译器会报错（如return@wholeLambdaExpression）
6. 调用lambda时，第一个参数可以用it代替
7. 如果函数的最后一个参数是函数，那么作为相应参数传入的 lambda 表达式可以放在圆括号之外
8. 参数占位符_(下划线)，当有很多参数时，在lambda内一个一个声明好麻烦的{ _, _ , name: String ->}

### lambda定义示例

> 定义时声明了函数类型，明确了参数及返回值类型
>
> 参数类型明确了，lambda内部的参数类型可以省略
>
> 返回类型明确了，最后了字符串成了返回值

``` kotlin
val wholeLambdaExpression: (name: String, callback: (String) -> Unit) -> String = { name: String, callback: (String) -> Unit ->
    println("name: name")
    callback("hello lambda")
    "whole lambda expression"
}

//调用，这里的str可以不用定义，直接用it来引用
val lambdaReturn: String = wholeLambdaExpression("sky") { str: String ->
  println("lambda callback, it: $str")
	// return@wholeLambdaExpression想return的话可以这样
}

//编译结果
lambdaReturn = (String)LambdaKt.getWholeLambdaExpression().invoke("sky", null.INSTANCE);
System.out.println(lambdaReturn);
```

### 匿名函数的意义

> lambda只可以在声明函数类型时指定返回类型，以表达式的形式直接作为参数时无法指定参数类型。
>
> 匿名函数可以显示的指定返回类型。

``` kotlin
//匿名函数直接指定参数及返回值类型，还可以直接return
wholeLambdaExpression("sky", fun (str: String): String {
  println("anonymous callback, it: $str")
  return "hello world"
})
```



## 函数字面量



> 函数的定义里面用fun来定义函数，如果想将函数作为值赋值给变量，有两种形式：

1. lambda
2. 匿名函数

### lambda形式

#### 示例

``` kotlin
val lambdaFn: (str: String) -> Unit = {
    println("lambdaFn: $it")
}

//编译结果：从编译结果看不到方法体了，调用时会正常执行
@NotNull
public static final Function1 getLambdaFn() {
  return lambdaFn;//这个是Function的实例
}
```

#### 调用

> 调用时先拿到函数引用，再调用其invoke

``` java
lambdaFn("hello")
//编译结果：
LambdaKt.getLambdaFn().invoke("hello");
```



### 匿名函数形式

#### 示例

``` kotlin
val anonymousFn: (str: String) -> Unit = fun(str: String): Unit {
    println("anonymousFn $str")
}
//编译结果：
@NotNull
public static final Function1 getAnonymousFn() {
  return anonymousFn;
}
static {
  lambdaFn = (Function1)null.INSTANCE;
  anonymousFn = (Function1)null.INSTANCE;
}
```

#### 调用

```java
anonymousFn("world")
//编译结果：
LambdaKt.getAnonymousFn().invoke("world");
```

## 函数类型

> kotlin的函数类型类似于typescript，由参数类型及返回值类型组成，typescript用=>来连接，kotlin用的是->

### 定义函数类型

> 用定面量定义函数时，变量后面的() -> Unit之类的就是函数类型，只不过没法重用。

> 用typealias关键字来定义函数类型

``` kotlin
typealias compareType = (first: Int, last: Int) -> Boolean
```

### 带有接收者的函数类型

> 普通函数在调用时无法指定this, 所谓的接收者相当于为函数指定this

``` kotlin
// 接收者为String，所以闭包里面的this为调用它的String
val receiverFn: String.(str: String) -> Unit = { str: String ->
    println(this.plus(str))
}
//编译结果: 根普通的函数编译出来的结果没什么区别
//Function2 表明函数接收两个参数，而函数类型里面明确只有一个参数。所以第一个参数表示this
@NotNull
public static final Function2 getReceiverFn() {
  return receiverFn;
}

static {
  receiverFn = (Function2)null.INSTANCE;
}

/**
* kotlin自带的编译缺了很多信息，下面是用jd-gui反编译的结果：
* receiverFn是LambdaKt$receiverFn$1的实例
* receiverFn("receiverFn hello", " world")与receiverFn.invoke("receiverFn hello", " world")都是调用的LambdaKt$receiverFn$1的invoke方法
* invoke是一个操作符，在Function里面有用operator来标识，方法的调用本质是调用invoke
* 可以看出this直接变成了$receiver，即在还有接收者时，接收者会作为this
*/
private static final Function2<String, String, Unit> receiverFn = (Function2)LambdaKt$receiverFn$1.INSTANCE; 
@NotNull public static final Function2<String, String, Unit> getReceiverFn() { 
  return receiverFn; 
} 
static final class LambdaKt$receiverFn$1 extends Lambda implements Function2<String, String, Unit> { 
  public static final LambdaKt$receiverFn$1 INSTANCE = new LambdaKt$receiverFn$1(); 
  public final void invoke(@NotNull String $receiver, @NotNull String str) { 
    Intrinsics.checkParameterIsNotNull($receiver, "$receiver"); 
    Intrinsics.checkParameterIsNotNull(str, "str"); 
    String str1 = $receiver + str; 
    boolean bool = false; System.out.println(str1); 
  }
  
  LambdaKt$receiverFn$1() {
    super(2); 
  } 
}
```

``` java
调用：
receiverFn("receiverFn hello", " world")
receiverFn.invoke("receiverFn hello", " world")
//两种调用方式的结果是一样的, 第一个参数是调用者，第二个参数是参数
LambdaKt.getReceiverFn().invoke("receiverFn hello", " world");
LambdaKt.getReceiverFn().invoke("receiverFn hello", " world");
```

## 高阶函数

>  高阶函数是将函数用作参数或返回值的函数

### 返回函数示例

```kotlin
fun lodash(str: String): () -> Int{
    val length = {
        str.length
    }
    return length;
}
```

``` java
// 编译结果：
public final class LambdaKt {
   @NotNull
   public static final Function0 lodash(@NotNull final String str) {
      Intrinsics.checkParameterIsNotNull(str, "str");
      Function0 length = (Function0)(new Function0() {
         // $FF: synthetic method
         // $FF: bridge method
         public Object invoke() {
            return this.invoke();
         }

         public final int invoke() {
            return str.length();
         }
      });
      return length;
   }
}
```

### reduce示例

> 实现js中的reduce函数。由于kotlin在调用一个函数时，如果最后一个参数为函数，可以将函数移到()外面，用lambda的形式调用

#### 代码

``` kotlin
fun <T, R> reduce(collection: Collection<T>, accumulator: R, reducer: (accumulator: R, item: T) -> R): R {
    var result: R = accumulator;
    for(collectionItem in collection) {
        result  = reducer(result, collectionItem)
    }
    return result;
}
// 编译结果：就是一个普通的函数的样子
public static final Object reduce(@NotNull Collection collection, Object accumulator, @NotNull Function2 reducer) {
      Intrinsics.checkParameterIsNotNull(collection, "collection");
      Intrinsics.checkParameterIsNotNull(reducer, "reducer");
      Object result = accumulator;

      Object collectionItem;
      for(Iterator var5 = collection.iterator(); var5.hasNext(); result = reducer.invoke(result, collectionItem)) {// reducer是函数，它的调用转变成了invoke的方式
         collectionItem = var5.next();
      }

      return result;
   }
```

#### 调用

``` kotlin
val result: Int = reduce(listOf<Int>(1, 2, 3), 0) { accumulator: Int, item: Int ->
  /***
   * lambda直接return的话会跳出外层的函数
   * lambda会跟据返回类型将最后的表达示作为返回值
  */
  	accumulator + item
}
println("reduce result: $result")
//编译结果：
result = ((Number)LambdaKt.reduce((Collection)CollectionsKt.listOf(new Integer[]{1, 2, 3}), 0, (Function2)null.INSTANCE)).intValue();
var10 = "reduce result: " + result;
var3 = false;
System.out.println(var10);
```





