/**
 * 为window添加自定义的属性，如window.ddd = 123
 * 以前的定义方式(最新的ts好像不需要外面的global了)：
 * declare global{
 *  interfalce Window{
 *    ddd: number;
 *  }
 * }
 */
interface Window{
  ddd: number;
}

/**
 * 类型声明文件一般为没有定义类型的第三方库服务，
 * 如项目引入jQuery后，在使用$('#app')时由于ts找不到对应的类型就会报错
 * 此时可以在.d.ts中为jQuery声明对应的类型
 * 
 * 声明文件中只能包含类型声明，不能包含实现
 * 
 * 声明全局变量
 * 这样在代码中使用$('#app')就不会后错了
 * 
 * declare var与declare let没什么区别
 * declare const声明的类型不能在使用过程中重新賦值，如 $ = selector: string => {} 为$赋值时会报错
 */
declare var $: (selector: string) => any;

/**
 * 声明全局函数，同declare var的差别在于它声明的只能是函数
 * 声明的函数类型不能作为类型引用，如const declareFunction: $$  = (name: string) =>{}会报错
 */
declare function $$(selector: string): void;

/**
 * 放在.d.ts中的接口声明对所有.ts文件都有效
 * 如functions/b.ts中没有import GlobalFunction也能正常的引用该类型
 * 
 * 声明在.ts文件中的类型在其它文件中使用时需要显示的导入，如a.ts必须显示的import functions/type.ts中的LocalFunction
 */
interface GlobalFunction {
  (name: string): void;
}