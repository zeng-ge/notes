/**
 * ? 问号表示类型可以为undefined, 如name?: string表明name是string|undefined
 * 问号只能用于函数的参数或类的成员属性，const与let声明的变量是不能加？的
 */
class People{
  name?: string;
  say(): void{
    console.log(this.name!.length)
  }
}

function abc(name?: string): void{
  let age: number = 20
}

(function(){
  const rootElement: HTMLElement | null = document.querySelector('#app')
  rootElement!.innerHTML = '<h1>hello world</h1>'
})()

window.ddd = 123;

$('#abc')