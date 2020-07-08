# kotlin常用语法
> var与val用来声明变量，var相当于let， val相当于const
>
> val的属性编译出来是final的，不能修改

1. 定义类时，如果没加open，编译出来的结果是final类，不能继承。在kotlin中类默认是final的
```java
构造器参数没加val与var的话是构造器的参数，但不会赋值
init里面代码块会抽到构造器里面 
```
2. open class，编译出来的结果没有final，可以继承。
```kotlin
class Fruit(val name:String)
编译结果为：如果加上open，编译结果没有final
只生成get方法，构造器用了var或val时为实例属性
public final class Fruit {

   @NotNull
   private final String name;

   @NotNull
   public final String getName() {
      return this.name;
   }

   public Product(@NotNull String name, @NotNull String details) {
      Intrinsics.checkParameterIsNotNull(name, "name");
      Intrinsics.checkParameterIsNotNull(details, "details");
      super();
      this.details = details;
      boolean var3 = false;
      System.out.print(name);//name只是参数，并不会赋值
   }
}

继承时的参数：
class CustomizeView(context: Context, attrs: AttributeSet): View(context, attrs)
编译结果：
//可见参数是用来调用super的
public CustomizeView(@NotNull Context context, @NotNull AttributeSet attrs) {
  Intrinsics.checkParameterIsNotNull(context, "context");
  Intrinsics.checkParameterIsNotNull(attrs, "attrs");
  super(context, attrs);
}

构造器参数可以用来构造实例属性：
class test(name: String) {
    val length = name.length;
}
编译后为：
public final class test {
   private final int length;

   public final int getLength() {
      return this.length;
   }

   public test(@NotNull String name) {
      super();
      this.length = name.length();
   }
}

从上面两个例子来看，实例属性会被收集到构造器中时行初始化
```

3. object类
> object定义了一个单例类,方法加上@JvmStatic后方法为静态方法
>
> 函数会转成public final，字段会转成private static final通过一个public final方法来获取值
>
> 字段的获取与函数的调用最终会转成ObjectClass.INSTANCE的调用，即实例调用

```kotlin
object StringUtils {
    @JvmStatic
    fun toUpperCase(str: String): String{
        return str.toUpperCase()
    }
}
编译结果：
public final class StringUtils {
   public static final StringUtils INSTANCE;

   @JvmStatic
   @NotNull
   public static final String toUpperCase(@NotNull String str) {
      Intrinsics.checkParameterIsNotNull(str, "str");
      boolean var2 = false;
      String var10000 = str.toUpperCase();
      Intrinsics.checkExpressionValueIsNotNull(var10000, "(this as java.lang.String).toUpperCase()");
      return var10000;
   }

   private StringUtils() {
   }

   static {
      StringUtils var0 = new StringUtils();
      INSTANCE = var0;
   }
}
```

4. data类
> 参数必须为实例属性，定义时必须有var或val。自动生成get, set, copy, toString, hashCode方法。
>
> 每个字段除了get、 set方法外，还对应一个component方法（在解构时会用到）
```kotlin
data class User(var name: String, var age: Int?, var address: String)
编译结果:
public final class User {
   @NotNull
   private String name;
   @Nullable
   private Integer age;
   @NotNull
   private String address;

   @NotNull
   public final String getName() {
      return this.name;
   }

   public final void setName(@NotNull String var1) {
      Intrinsics.checkParameterIsNotNull(var1, "<set-?>");
      this.name = var1;
   }

   @Nullable
   public final Integer getAge() {
      return this.age;
   }

   public final void setAge(@Nullable Integer var1) {
      this.age = var1;
   }

   @NotNull
   public final String getAddress() {
      return this.address;
   }

   public final void setAddress(@NotNull String var1) {
      Intrinsics.checkParameterIsNotNull(var1, "<set-?>");
      this.address = var1;
   }

   public User(@NotNull String name, @Nullable Integer age, @NotNull String address) {
      Intrinsics.checkParameterIsNotNull(name, "name");
      Intrinsics.checkParameterIsNotNull(address, "address");
      super();
      this.name = name;
      this.age = age;
      this.address = address;
   }

   @NotNull
   public final String component1() {
      return this.name;
   }

   @Nullable
   public final Integer component2() {
      return this.age;
   }

   @NotNull
   public final String component3() {
      return this.address;
   }

   @NotNull
   public final User copy(@NotNull String name, @Nullable Integer age, @NotNull String address) {
      Intrinsics.checkParameterIsNotNull(name, "name");
      Intrinsics.checkParameterIsNotNull(address, "address");
      return new User(name, age, address);
   }

   // $FF: synthetic method
   public static User copy$default(User var0, String var1, Integer var2, String var3, int var4, Object var5) {
      if ((var4 & 1) != 0) {
         var1 = var0.name;
      }

      if ((var4 & 2) != 0) {
         var2 = var0.age;
      }

      if ((var4 & 4) != 0) {
         var3 = var0.address;
      }

      return var0.copy(var1, var2, var3);
   }

   @NotNull
   public String toString() {
      return "User(name=" + this.name + ", age=" + this.age + ", address=" + this.address + ")";
   }

   public int hashCode() {
      String var10000 = this.name;
      int var1 = (var10000 != null ? var10000.hashCode() : 0) * 31;
      Integer var10001 = this.age;
      var1 = (var1 + (var10001 != null ? var10001.hashCode() : 0)) * 31;
      String var2 = this.address;
      return var1 + (var2 != null ? var2.hashCode() : 0);
   }

   public boolean equals(@Nullable Object var1) {
      if (this != var1) {
         if (var1 instanceof User) {
            User var2 = (User)var1;
            if (Intrinsics.areEqual(this.name, var2.name) && Intrinsics.areEqual(this.age, var2.age) && Intrinsics.areEqual(this.address, var2.address)) {
               return true;
            }
         }

         return false;
      } else {
         return true;
      }
   }
}
```

5. class里面定义companion object

>companion object会编译成一个public static final class，字段会提供一个public final方法来访问，方法转成public final的，调用如a.abc会转成a.Companion.abc即由实例来调用


```
class a {
    companion object{
        fun abc(){
            println(b)
        }
        val b = 123
    }
}
编译结果：
属性直接提到外部成为静态实例属性，方法没有提出来，可是a.abc()是可以直接调用的
Companion内部类
public final class a {
   private static final int b = 123;
   public static final a.Companion Companion = new a.Companion((DefaultConstructorMarker)null);

   public static final class Companion {
      public final void abc() {
         int var1 = ((a.Companion)this).getB();
         boolean var2 = false;
         System.out.println(var1);
      }

      public final int getB() {
         return a.b;
      }

      private Companion() {
      }

      // $FF: synthetic method
      public Companion(DefaultConstructorMarker $constructor_marker) {
         this();
      }
   }
}
```
6. 扩展方法
```
class Fruit(val name:String)

//扩展方法
fun Fruit.abc(str: String){
    println(str)
}

//扩展属性
val Fruit.length: Int
    get() = name.length
编译结果：
生成了一个新的类，并且是静态方法，当Fruit().abc()调用时，能调到它，第一个参数默认是调用者。扩展属性同方法差不多，也是个静态方法
public final class FruitKt {
   public static final void abc(@NotNull Fruit $this$abc, @NotNull String str) {
      Intrinsics.checkParameterIsNotNull($this$abc, "$this$abc");
      Intrinsics.checkParameterIsNotNull(str, "str");
      boolean var2 = false;
      System.out.println(str);
   }

   public static final int getLength(@NotNull Fruit $this$length) {
      Intrinsics.checkParameterIsNotNull($this$length, "$this$length");
      return $this$length.getName().length();
   }
}
```
7. 代理
```
/***
 * 相当于代理模式
 * 假定MutableList的add方法需要增强，但是又不能改源码，怎么办？
 * 传统的代理模式是这样干的：
 * class MyMutableList extends MutableListInterface{//代理类需要实现相同的接口
 * //这种写法有个很弱智的地方，接口里面定义了大量的方法，需要实现一大堆，太麻烦了，而kotlin代理可以自动生成没有实现的方法
 *  public boolean add(){ //重写这个方法
 *      new MutableList().add()//调用己有的MutableList的方法，然后在前面或后面添加新的功能
 *      println("proxy add")
 *  }
 * }
 */
class MutableListDelegate<T>(val myCollection: MutableList<T>): MutableList<T> by myCollection{
    override fun add(element: T): Boolean {
        return myCollection.add(element)
    }
}
编译结果：
可以看出所有的方法都由myCollection这个正常的MutableList在调用，重写的方法中加入了增强代码
public final class MutableListDelegate implements List, KMutableList {
   @NotNull
   private final List myCollection;

   public boolean add(Object element) {
      String var2 = "proxy add";
      boolean var3 = false;
      System.out.println(var2);
      return this.myCollection.add(element);
   }

   @NotNull
   public final List getMyCollection() {
      return this.myCollection;
   }

   public MutableListDelegate(@NotNull List myCollection) {
      Intrinsics.checkParameterIsNotNull(myCollection, "myCollection");
      super();
      this.myCollection = myCollection;
   }

   public boolean contains(Object element) {
      return this.myCollection.contains(element);
   }

   public boolean containsAll(@NotNull Collection elements) {
      Intrinsics.checkParameterIsNotNull(elements, "elements");
      return this.myCollection.containsAll(elements);
   }

   public Object get(int index) {
      return this.myCollection.get(index);
   }
```
8. 内部类
```
内部类要用inner标识，不然报错
class A{
    inner class B{ //没加open，所以是final的类，它可以引用外部类的属性
        println(this@A)//引用A
    }
}
匿名内部类：要用object：标识
guestureDetectorButton.setOnTouchListener(object: View.OnTouchListener{
    override fun onTouch(v: View?, event: MotionEvent?): Boolean {
        return gestureDetector.onTouchEvent(event)
    }
})
编译结果：
从结果来看object:与对象类是完全不一样的，结果就是JAVA匿名类的结果
.setOnTouchListener((OnTouchListener)(new OnTouchListener() {
     public boolean onTouch(@Nullable View v, @Nullable MotionEvent event) {
        ...
        return false;
     }
  }));
```

9. 单继承
> kotlin同java一样是单继承，继承一个类，实现多个接口