# hooks问题

### hooks只能共享数据逻辑（并不是共享数据）

1. 两个组件共享数据

   > useState, useReducer都只能更新数据，不能触发引用了该数据的组件更新
   >
   > 如果组件A与组件B是独立的，A.setState的调用只会更新A，并不会触发B的重新煊染

``` javascript
/**
 * 组件A与组件B是独立的，A.setState的调用只会更新A，并不会触发B的重新煊染
 * useState, useReducer都只能更新数据，不能触发引用了该数据的组件更新
 * 
 *
 * 就是提取一个createGlobalState的hook也解决不了问题：
 * 如下面的hook，它能让两个组件共享数据，但是当A更新后B并不会更新，
 * 只能通过函数的方式获取到最新的值(对于事件而言可以取到最新值，但是对于组件而言数据还是老的)
 * const createGlobalState = (defaultValue) => {
    const store = {
      state: defaultValue,
    };
    return () => {
      const [state, setState] = useState(store.state);
      const getState = () => {
        return store.state;
      };
      const updateState = (value) => {
        setState(value);
        store.state = value;
      };
      return [getState, updateState];
    };
  };
 */
function ChildA() {
  console.log("render A");
  const [state, setState] = useState(0);
  return <div onClick={() => setState(state => state + 1)}>A {state}</div>;
}

function ChildB() {
  console.log("render B");
  const [state, setState] = useState(0);
  return <div onClick={() => setState(state => state + 1)}>B {state}</div>;
}

export default function App() {
  return (
    <div className="App">
      <ChildA />
      <ChildB />
    </div>
  );
}
```

