> hooks定义必须以use开头
>
> hooks只能写在函数式组件或自定义hook函数内部

1. useState

   ```javascript
   //两种初始化方式
   const [count, setCount] = useState(0)//第一次初始化时将值填入队列，之后只取值，函数的引用不会变化
   const [count, setCount] = useState(() => 0)//初始化函数只执行一次
   
   setCount(1)
   setCount(count => count + 1)//两种设置方式
   
   setCount执行后，1）更新队列里面count的值 2)将更新操作添加到更新队列里面 3）如果数据本身没有变化children不会更新
   ```

2. useEffect

   > useEffect是在render之后的下一次DOM煊染之前执行，相当于requestAnimationFrame，useEffect本质是个异步操作
   >
   > useLayoutEffect也是在render之后执行，但是它是同步的，相当于在didMount、didUpdate的函数体内操作DOM

   ```javascript
   render之后执行（等效componentDidMount、componentDidUpdate, componentWillUnmount)
   useEffect(() => {
     const timer = setTimeout(() => {}, 1000)
     return () => {clearTimeout(timer)}//clear函数 
   })
   //每一次在didMount后执行，之后每次执行都会先执行clear函数，然后用新的effect函数代替老的
   //willUnmount时也会执行clear函数
   
   //添加依赖
   useEffect(() => {}, []) //什么都不依赖，也就是只初始化一次
   useEffect(() => {}, [id, name]) //依赖变化了才会更新effect函数
   
   //由于useEffect函数引用的值都是来自闭包，如果函数内部用了id, name, age三个字段，而依赖里只加了id, name，那么age变化倒致的更新不会更新effect函数，此时函数引用的age就是老的
   ```

3. useContext

   ```javascript
     // const UserContext = React.createContext(null)
   const context = useContext(UserContext)//获取context
   ```

   

4. useReducer

   ```javascript
   const [state, dispatch] = userReduct(rootReducer, initialState, initFunction)
   //只初始化一次，之后取state都是最新的
   // initFunction可以没有，有的话初始化值相当于initFunction(initialState)
   ```

   

5. useCallback

   ```javascript
   const onClick = useCallback(() => {}, [id])
   //缓存一个函数，这样在id不变的情况下函数的引用是不变的
   
   //相当于
   const onClick = useMemo(() => callback, [id])
   ```

6. useMemo

   ``` javascript
   //用于缓存数据，对于复杂的计算结果进行缓存
   const result = useMemo(() => {好复杂的计处;return result}， [id, name])//依赖的id, name不变就不会重新计算
   //它在render之前执行，所以不能干更新状态这种事
   
   // 可以用useMemo来包装组件
   const Input = useMemo(() => <input/>, [id, name])//依赖项不变返回的组件就不会变
   ```

   

7. useRef

   ```javascript
   //相当于类的实例变量，用它可以holder住一个数据
   const inputRef = useRef(null)
   //inputRef.current会holder住值, inputRef的引用不会变
   useEffect(() => {
     inputRef.current = input
   })
   ```

8. useImperativeHandle

   ``` javascript
   // 用于给父组件
   function FancyInput(props, ref) {
     const inputRef = useRef();
     useImperativeHandle(ref, () => ({
       focus: () => {
         inputRef.current.focus();
       }
     }));
     return <input ref={inputRef} ... />;
   }
   FancyInput = forwardRef(FancyInput);
   
   const ref = createRef() 
   <FancyInput ref={ref} /> 的父组件可以调用 inputRef.current.focus()。
   
   效果等同于<input ref={ref}/>这样父组件就拿到了子组件对应的数据
   ```

   

