# addOnAttachStateChangeListener

> 监听View attach与detach到window的状态

```kotlin
attachStateBtn.addOnAttachStateChangeListener(object: View.OnAttachStateChangeListener{
  // removeView => removeViewInternal => dispatchDetachedFromWindow
  // removeView时会触发
  override fun onViewDetachedFromWindow(v: View?) {
    Log.i("ChoreographerActivity", "button detach from window")
  }

  // ViewGroup.addViewInner -> View.dispatchAttachedToWindow会触发该事件
  // 也就是说在addView时会触发
  override fun onViewAttachedToWindow(v: View?) {
    Log.i("ChoreographerActivity", "button attach to window")
  }
})
```

