# keyof/typeof/key in

### keyof

> 取出给定类型或对象里面所有的key, keyof后面只能跟类型

1. keyof枚举

``` typescript
export enum ModuleType {
  NORMAL = "normal",
  DUBBO = "dubbo",
  SPRINGCLOUD = "springCloud",
}
type keyofEnum = keyof ModuleType
/**
 * 得到的是枚举类型里面值对应的方法或属性
  type keyofEnum = number | "link" | "length" | "toString" | "concat" | "slice" | "indexOf" | "lastIndexOf" | "includes" | "charAt" | "charCodeAt" | "localeCompare" | "match" | "replace" | "search" | ... 33 more ... | "replaceAll"
*/
```

2. keyof 接口

``` typescript
interface KeyofInterface {
  name: string;
  hi: () => void;
}
type keyofEnum = keyof KeyofInterface;
/**
 * 得到的是接口里面的key
 * type keyofEnum = "name" | "hi"
 */
```

2. keyof对象

``` typescript
// 这里keyof后面的对象是当作类型用的
type keyofEnum = keyof {
  a: 'aa',
  b: 'bb'
};
/**
 * 得到的是对象的key
 * type keyofEnum = "a" | "b"
 */

//下面这种方式会报错，因为abc是值
const abc = {
  a: 'aa',
  b: 'bb'
}
type keyofEnum = keyof abc; //可以改成 keyof typeof abc，先用typeof将对象转成类型，再用keyof得到key
```

### typeof

> typeof后面的数据必须可以作为值（type或interface定义的类型不能跟在typeof后面）

1. typeof 类

> 没意义的写法，本身类的话一般是直接为变量定义为类了	

``` typescript
class abc{}
type typeofClass = typeof abc;
const c: typeofClass = {}
/**
 * typeof 类得到的是类的原型
 * Property 'prototype' is missing in type '{}' but required in type 'typeof abc'
 */
```

2. typeof 枚举

``` typescript
export enum ModuleType {
  NORMAL = "normal",
  DUBBO = "dubbo",
  SPRINGCLOUD = "springCloud",
}
type typeofEnum = typeof ModuleType;
const c: typeofEnum = []
/**
 * 拿到的是枚举对应的每一项枚举
 * type 'typeof ModuleType': NORMAL, DUBBO, SPRINGCLOUD
 */

type keyofTypeOfEnum = keyof typeof ModuleType
/**
 * 可以拿到以枚举key作为选项
 * type typeofEnum = "NORMAL" | "DUBBO" | "SPRINGCLOUD"
 */

```

3. typeof 对象

``` typescript
如果有一个对象{ a: 'aa', b: 'bb' }

```



### key in

> key用于定义对象类型时限定key的范围
>
> in后面必须是string | number | symbol能作为key的类型
>

1. key in 枚举

> 对于枚举，它的值是能作为key的

``` typescript
export enum ModuleType {
  NORMAL = "normal",
  DUBBO = "dubbo",
  SPRINGCLOUD = "springCloud",
}
const queryMap:{[key in ModuleType]: Function} = {
  [ModuleType.NORMAL]: queryAllModuleDependence,
  [ModuleType.DUBBO]: queryAllModuleDubboDependence,
  [ModuleType.SPRINGCLOUD]: queryAllModuleDubboDependence,
};
// queryMap里面的key必须是枚举的值，并且一个都不能少
```

2. Key in 普通类型

> 对于普通类型，要先将其key取出再key in

``` typescript
export type ModuleItemType = {
  label: string;
  value: ModuleType;
};
const d: { [key in keyof ModuleItemType]: string } = { label: '1', value: ModuleType.NORMAL}
/**
 * 这里是先keyof，再key in
 * 直接key in ModuleItemType会报Type 'ModuleItemType' is not assignable to type 'string | number | symbol'.
 * 意思很明显, key必须是string、number、或symbol，很明显ModuleItemType不满足
 */
// keyof ModuleItemType 得到 'label' | 'value'
// key in表明其为'label'或'value'

```



