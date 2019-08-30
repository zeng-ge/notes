# intent-filter

## 子元素类型
1. action
```kotlin
action只能有一个，表明动作类型
<action android:name="android.intent.action.MAIN"/> //主activity
```
2. category
```kotlin
category为分类，可以有多个
<category android:name="android.intent.category.LAUNCHER"/> //标识其为启动activity

自定义：
<category android:name="org.gzeng.TEST"/>

intent会自带一个默认category: android.intent.category.DEFAULT
有些行为需要用默认的activity处理，如url需要用brower来找开，
如果两个activity都能片理一个intent，那么default的会优先，如果都是default的，就会弹出让用户选的框
```
3. data
> 指定activity能响应什么类型的数据

> 只有data标签指定的内容与intent中data完全一致，该activity才会响应此intent

```kotlin
data有以下几个可选属性：
<data
    android:schema=""
    android:host=""
    android:port=""
    android:path=""
    android:mimeType=""
/>
如<data android:schema="http"/>
```

## Intent
1.显示
```kotlin
Intent intent = new Intent(A.this, B.class)
startActivity(intnet)
显示的打开B
```
2.隐式
```kotlin
Intent intent = new Intent("android.intent.action.ACTION_START")//显示的action
intent.addCategory("org.gzeng.TEST")
startActivity(intent)
会查找category为org.gzeng.TEST的activity并打开

只有action与category都匹配上的activity才会打开

Intent.ACTION_VIEW对应android.intent.action.VIEW
Intent intent = new Intent(Intent.ACTION_VIEW)//定义好的action，用浏览器展示
Intent.setData(Uri.parse("https://www.google.com"))


打电话：
Intent intent = new Intent(Intent.ACTION_DIAL)
intent.setData(Uri.parse("tel:10086"))//拔打10086
```