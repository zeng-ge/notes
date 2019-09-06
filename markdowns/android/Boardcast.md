# Boardcast

## 定义广播接收者
```kotlin
class MyBoardcastReceiver: BroadcastReceiver() {
    override fun onReceiver(context: Context?, intent: Intent?) {
        
    }
}
```

## 发送广播
```kotlin
sendBroadcast(Intent("com.example.session.Broadcase"))
intent的action会用来和接收器中的intent-filter的action来匹配
```

## 动态注册与静态注册

> 动态注册
```kotlin
intentFilter = IntentFitler()
intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE")
registerReceiver(MyBoardcastReceiver(), intentFilter)

缺点：
只能在APP启动后才能监听广播

取消注册：
unRegisterReciver(receiverInstance)
```

> 静态注册
```kotlin
在AndroidManifest.xml里面，在application下添加receiver:
<receiver android:name=".receiver.BroadcastReceiver" android:exported="true" android:enabled="true">
        <intent-filter>
            <action android:name="com.example.session.Broadcast"></action>
        </intent-filter>
    </receiver>
exported表示是否接收本程序以外的广播
enabled表示开启广播接收器
```

## 系统广播与本地广播
```kotlin
系统广播所有的APP都能接收
    调用activity的sendBroadcast(Intent)发送广播
    调用resigerReceiver(Receiver, IntentFilter)注册广播

本地广播：
通过LocalBroadcastManager来管理广播接收者的注册及发送广播
localBroadcastManager.registerReceiver(Receiver, IntentFilter)
localBroadcastManager.sendBroadcast(Intent("action"))

```

## 标准广播与有序广播
```kotlin
区别有二：
1） 发送方式
sendBroadcast(Intent) 与sendOrderedBroadcast(Intent, null)
2) 有序广播需要在intent-filter上配置priority来决定优先级
<receiver android:name=".receiver.BootReceiver" android:exported="true" android:enabled="true">
            <intent-filter android:priority="100">
                <action android:name="com.example.session.Broadcast"></action>
            </intent-filter>
        </receiver>
优先级越高，越先执行，先接收消息的receiver可以有onReceive里调用abortBroadcast()停止广播向下传递
```

