# LiveData

> lifecycle监听生命周期，LiveData监听数据的变化然后更新界面。

> ViewModel与LiveData好像没有直接关系，LiveData监听并修改数据, ViewModel只是监听onDestroy时执行onCleared

> LiveData就算没有ViewModel也是可以独立使用的，ViewModel仅仅用于destroy

## 接口与类

1. ViewModel

   ``` kotlin
   public abstract class ViewModel {
       protected void onCleared() {}
   }
   ```

2. LiveData       数据监听类

   ```
   // 核心方法:
   public void observe(@NonNull LifecycleOwner owner, @NonNull Observer<T> observer) {
           if (owner.getLifecycle().getCurrentState() == DESTROYED) {
               return;
           }
           // 将回调封装成观察者
           LifecycleBoundObserver wrapper = new LifecycleBoundObserver(owner, observer);
           // 将观察者保存进map
           ObserverWrapper existing = mObservers.putIfAbsent(observer, wrapper);
   				//将观察者注册进LifecycleRegistry，当生命周期触发时会响应
           owner.getLifecycle().addObserver(wrapper);
       }
   ```

3. LifecycleBoundObserver                   观察者(仅在state >= start)时触发更新

   ``` kotlin
   public void onStateChanged(LifecycleOwner source, Lifecycle.Event event) {
     // 如果destroy了就移除该观察者
     if (mOwner.getLifecycle().getCurrentState() == DESTROYED) {
       removeObserver(mObserver);
       return;
     }
     // 判断state >= SARTED, 如果满足就dispatchingValue
     activeStateChanged(shouldBeActive());
   }
   ```

4. AlwaysActiveObserver                      观察者，不管state，总是更新

5. ViewModelProviders                          初始化ViewModel

6. ViewStoreModel                                 存放ViewModel实例

## 流程

1. ViewModelProviders.of().get()

   ``` kotlin
   // ViewModelProviders.of(activity, factory).get(HomeViewModel::class.java)
   public static ViewModelProvider of(@NonNull FragmentActivity activity, @Nullable Factory factory) {
     Application application = checkApplication(activity);
     if (factory == null) {
       factory = ViewModelProvider.AndroidViewModelFactory.getInstance(application);
     }
     // 实例化一个ViewModelProvider，第一个activity有一个
     return new ViewModelProvider(ViewModelStores.of(activity), factory);
   }
   
   // get时会创建ViewModel实例，并将其put进mViewModelStore
   ```

2. ViewModelStores.of

   ``` kotlin
   public static ViewModelStore of(@NonNull FragmentActivity activity) {
     if (activity instanceof ViewModelStoreOwner) {
       // 调用FragmentActivity.getViewModelStore()
       return ((ViewModelStoreOwner) activity).getViewModelStore();
     }
     return holderFragmentFor(activity).getViewModelStore();
   }
   ```

3. getViewModelStore

   ``` kotlin 
   public ViewModelStore getViewModelStore() {
       if (this.mViewModelStore == null) {
   			// 创建一个ViewModelStore实例， 这里面有一个Map,专门用来存放ViewModel
         if (this.mViewModelStore == null) {
           this.mViewModelStore = new ViewModelStore();
         }
       }
   
       return this.mViewModelStore;
   }
   ```

4. FragementActivity在destroy时会调用mViewModelStore.clear()