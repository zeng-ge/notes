# lifecycle详解

> android里面，  activy与fragement天生可以监听生命周期并作出反应。其它实例是无法感知生命周期的。在实际工作中，好多组件需要在生命周期回调时干一些事，比如在onDestroy时销毁。在没有lifecycle之前，只能在activity与fragment里面一个一个组件今次去销毁，就是要人工关心什么那些组件需要销毁。

> lifecycle可以让组件或工具类也能监听到生命周期，它们自己管理生命周其逻辑。比如该实例需要在destroy时销毁，就让它本身监听onDestroy就行了。

## 相关接口

1. LifecycleObserver	观察者

2. LifecycleOwner        生命周期的宿主，如Activity, 它可以将生命周期向下传递

   ```kotlin
   专明方法getLifecycle, 对于SupportActivity，返回的是LifecycleRegistry实例
   ```

   

3. Lifycycle                    相当于被观察者，可以add或remove observer观察者

4. GenericLifecycle     继承LifecycleObserver

   ``` kotlin
   public interface GenericLifecycleObserver extends LifecycleObserver {
   void onStateChanged(LifecycleOwner source, Lifecycle.Event event);
   }
   ```

   

## 类

1. SingleGeneratedAdapterObserver              实现GenericLifecycle

   ``` kotlin
   lifecycleRegistry.addObserver对于非LivingData类，会封装成这个Observer
   // 对于用@OnLifecycleEvent(Lifecycle.Event.ON_事件)注解过的类，会编译成GeneratedAdapter的子类，里面的callMethods会根据event的类型调用具体回调
   
   public void onStateChanged(LifecycleOwner source, Lifecycle.Event event) {
     mGeneratedAdapter.callMethods(source, event, false, null);
     mGeneratedAdapter.callMethods(source, event, true, null);
   }
   
   // 如下面是注解生成的类
   public class BaseExecutor_LifecycleAdapter implements GeneratedAdapter {
     @Override
     public void callMethods(LifecycleOwner owner, Lifecycle.Event event, boolean onAny,
         MethodCallsLogger logger) {
   		// 判断事件类型
       if (event == Lifecycle.Event.ON_CREATE) {
         if (!hasLogger || logger.approveCall("onCreate", 1)) {
           mReceiver.onCreate();
         }
         return;
       }
   ```

2. LifecycleBoundObserver             服务于LiveData

3. AlwaysAactiveObserver              服务于LiveData

## 相关类

> AppCompatActivity间接实现了LifecycleOwner。SupportActivity持有一个LifecycleRegistry实例，

1. AppCompatActivity
2. FragmentActivity
3. SupportActivity implements LifecycleOwner     持有被观察者LifecycleRegistry   
4. LifecycleRegistry extends Lifycycle                      被观察者

## 原理

> 实现观察者，然后将观察者注册到LifecycleRegistry里面

### 生命周期如何触发？

> 主要依赖SupportActivity里面的ReportFragment实例监听生命周期，并用LifecycleRegistry实例dispatch事件

> ReportFragment没有view，它只监听事件。
>
> ReportFragment监听了所有生命周期事件，在触发时调用dispatch进行分发。

```kotlin
// ReportFragment文件, 以onDestroy为例
public void onDestroy() {
  super.onDestroy();
	// 分发destroy事件
  dispatch(Lifecycle.Event.ON_DESTROY);
  mProcessListener = null;
}

private void dispatch(Lifecycle.Event event) {
  Activity activity = getActivity();
  if (activity instanceof LifecycleOwner) {
    //获取LifecycleRegistry实例
    Lifecycle lifecycle = ((LifecycleOwner) activity).getLifecycle();
    if (lifecycle instanceof LifecycleRegistry) {
      // 分发事件
      ((LifecycleRegistry) lifecycle).handleLifecycleEvent(event);
    }
  }
}
```

```kotlin
// LifecycleRegistry
public void handleLifecycleEvent(@NonNull Lifecycle.Event event) {
  State next = getStateAfter(event);//获取事件对应的状态
  moveToState(next);// 迁移状态
}

private void moveToState(State next) {
  // 状态没变就直接返回
  if (mState == next) {
    return;
  }
  mState = next;
  mHandlingEvent = true;
  sync(); // 同步状态
  mHandlingEvent = false;
}

// 最终触发更新的是forwardPass或backwardPass，遍历注册的observer，并分发
observer.dispatchEvent(lifecycleOwner, event);
```



## 示例

```kotlin
// 实现观察者基类
// 实现lifecycleObserver并注解关心的生命周期事件，它的子类可以其关心的事件
internal abstract class BaseExecutor : LifecycleObserver {

    @OnLifecycleEvent(Lifecycle.Event.ON_CREATE)
    open fun onCreate() {
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_START)
    open fun onStart() {

    }

    @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    open fun onStop() {

    }

    @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
    open fun onResume() {
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_PAUSE)
    open fun onPause() {
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_DESTROY)
    open fun onDestroy() {
        d("Executor@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        System.gc()
        d("Executor$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    }
}
```

``` kotlin
// 注册观察者
getLifecycle().addObserver(object: BaseExecutor{
  override fun onDestroy(){
    
  }
})
```

