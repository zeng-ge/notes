# Chreographer

> 在下一个frame被渲染时触发回调

``` kotlin
val choreographer = Choreographer.getInstance()
// 事件在下一帧渲染时会触发
// 事件只会触发一次，根requestAnimiationFrame很像，再下一桢里面干一些事
choreographer.postFrameCallback {
  Log.i("ChoreographerActivity", "trigger post frame callback")
}
```

