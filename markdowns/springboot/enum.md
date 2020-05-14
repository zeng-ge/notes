# Enum

> Enum和普通的类区别不大，都可以定义构造器，方法，只不过它默认可以给定几个实例，toString默认是得到name, 而name就是枚举的名字（如这里的Android与IOS)

> 两个枚举比较可以用 ==， 如PlatformType.IOS == a.getPlatformType

```java
package com.mckinsey.business.school.domain;

public enum PlatformType {
    Android("hello android"), IOS("hello ios");

    private String desc;

    private PlatformType(String desc){
        this.desc = desc;
    }

    public String getDesc(){
        return desc;
    }

    @Override
    public String toString() {
        return name().toUpperCase();
    }
}



System.out.println("=======>" + PlatformType.Android);// ANDROID
//枚举默认得到的是toString返回的值

System.out.println("=======>" + PlatformType.Android.name());//得到Android

System.out.println("=======>" + PlatformType.Android.ordinal());//得到序号，第一个为0

System.out.println("=======>" + PlatformType.Android.getDesc());//得到hello android
```
