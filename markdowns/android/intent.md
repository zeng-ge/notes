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

### 传递数据
```kotlin
Intent intent = new Intent()
intent.putExtra("abc", data)//data可以是各种类型

putExta本身是有很多重载的方法的，参数类型不同

在activity中：
Intent intent = getIntent()获取传递过来的intent
intent.getStringExtra("abc")获取字符串参数
```


### back时返回数据

```kotlin
graph LR
ActivityA-->ActivityB
```

```kotlin
在A中:
startActivityForResult(intent, RESULT_CODE)
RESULT_CODE用于标识是谁返回的

onActivityResult(requestCode, resultCode, intent){
    判断resultCode是那一个，并处理
    intent.getStringExtra("abc")//取出数据
}

在B中：
Intent intent = new Intent()
intent.setExtra("abc", data)
setResult(intent, RESULT_CODE)
finish()//关闭当前activity

onBackPressed(){}//实现该方法监听back按钮并处理
```