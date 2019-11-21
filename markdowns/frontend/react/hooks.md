# Hooks

> hooks只能在函数式组件中调用
>
> 只能在顶级函数中调用hooks，不要在循环、条件判断、内嵌函数中调用hooks。(hooks调用时，没有任何的标记产生，react只能根据hook调用的index来记录值，如果有判断之类的发生，顺序就会乱从而倒致数据混乱)

### useEffect

``` typescript
定义：
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
type EffectCallback = () => (void | (() => void | undefined));

effect为副作用函数,可以返回一个函数用来cleanup
依赖列表可以指定一系列的值，如果值没有变化的话，effect函数在re-render时不会执行

```

#### 调用时机

> useEffect在render方法调用后执行
>
> useEffect返回值是函数时，返回的是clean up函数。（当unmount时会执行，在re-render时，先于useEffect执行）
>
> 等效于Class情形下在componentDidMount、componentDidUpdate、 componentWillUnmount里面进行的操作
#### 示例

``` javascript
useEffect(() => {
  console.log('effect')
  setCount(1)
  return () => {
    /**
     * 执行时机：
     * 1) unmount时
     * 2) re-render时先执行clean up函数，再执行useEffect函数
    */
    console.log('clear up effect');
  }
}, [props.id, stateCount])
```

