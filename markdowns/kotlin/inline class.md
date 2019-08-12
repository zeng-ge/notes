# inline class

## 特性
1. 不会被实例化，所以不会有额外的堆内存分配
2. 不能继承类，只能继承接口
3. 不能有init代码块，不能有幕后字段

## 只能有唯一的属性在主构造器中初始化（该属性本质上代表了实例）
> 对于Hours(5)而言，最重要的是5这个值(相当于原生类型的包装器，如Long(4))

## 内联类并不会被实例化

> 可以看出Hours(5)被编译成Hours.constructor-impl(5)，成了一个静态方法调用

> 属性调用也被编译成了静态方法的调用
```
package org.gzeng

inline class Hours(val number: Int){
    val length: Int
        get() = number
    fun toMinutes() = number * 60
}

fun main() {
    Hours(5).toMinutes()
    println(Hours(6).length)
}

编译结果：
public final class HoursKt {
   public static final void main() {
      Hours.toMinutes-impl(Hours.constructor-impl(5));
      int var0 = Hours.getLength-impl(Hours.constructor-impl(6));
      boolean var1 = false;
      System.out.println(var0);
   }

   // $FF: synthetic method
   public static void main(String[] var0) {
      main();
   }
}
// Hours.java
package org.gzeng;

import kotlin.Metadata;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public final class Hours {
   private final int number;

   public final int getNumber() {
      return this.number;
   }

   // $FF: synthetic method
   private Hours(int number) {
      this.number = number;
   }

   public static final int getLength_impl/* $FF was: getLength-impl*/(int $this) {
      return $this;
   }

   public static final int toMinutes_impl/* $FF was: toMinutes-impl*/(int $this) {
      return $this * 60;
   }

   public static int constructor_impl/* $FF was: constructor-impl*/(int number) {
      return number;
   }

   // $FF: synthetic method
   @NotNull
   public static final Hours box_impl/* $FF was: box-impl*/(int v) {
      return new Hours(v);
   }

   @NotNull
   public static String toString_impl/* $FF was: toString-impl*/(int var0) {
      return "Hours(number=" + var0 + ")";
   }

   public static int hashCode_impl/* $FF was: hashCode-impl*/(int var0) {
      return var0;
   }

   public static boolean equals_impl/* $FF was: equals-impl*/(int var0, @Nullable Object var1) {
      if (var1 instanceof Hours) {
         int var2 = ((Hours)var1).unbox-impl();
         if (var0 == var2) {
            return true;
         }
      }

      return false;
   }

   public static final boolean equals_impl0/* $FF was: equals-impl0*/(int p1, int p2) {
      throw null;
   }

   // $FF: synthetic method
   public final int unbox_impl/* $FF was: unbox-impl*/() {
      return this.number;
   }

   public String toString() {
      return toString-impl(this.number);
   }

   public int hashCode() {
      return hashCode-impl(this.number);
   }

   public boolean equals(Object var1) {
      return equals-impl(this.number, var1);
   }
}
```