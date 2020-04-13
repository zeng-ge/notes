setTimeout(() => {
  console.log('A')
}, 0)
requestAnimationFrame(() => {
  console.log('B')
  Promise.resolve().then(() => {
    console.log('C')
  })
})
function init(){
  const root = document.getElementById('root')
  /**
   * root发生变化时调用,可以看到每次root.innerHTML调用都会触发它，不要在它内部改DOM，会造成死循环
   */
  const observer = new MutationObserver(function(mutationRecords, observer) {    
    console.log('observer')
  })
  observer.observe(root, {
    attributes: true, 
    childList: true, 
    subtree: true
  })
}
init()
function test() {  
  const channel = new MessageChannel()
  /**
   * 回调的执行顺序：
   * 1) promise                 在task里面执行回调，render发生在下一次task
   * #下面几个为macrotask
   * 2) MessageChannel          在回调的下一次task时render
   * 3) requestAnimationFrame   在回调的task中re-calculate-style=> layout => update layout tree => paint => composite layout
   * 4) requestIdleCallback     在回调的task的下一task时render
   * 5) DOM操作影响到UI的也会放在下一个loop
   * 如插入一个元素，body.append(div)或body.style.background = 'red'导致的render都是在下一个loop执行的render
   * 
   * promise、channel、idle都是在下一次loop才执行的render，requestAnimationFrame有点例外，感觉像是合并了操作
   * 
   * 实际只有两次render
   * 1) animation，本次loop
   * 2) idle回调后的下一次loop
   * 
   * 只有promise时会在下一次的loop中render promise
   * 
   * requestAnimationFrame callback 是 UI Render 的其中一步
   * 并不是每一次loop都会执行render
   * 
   */
  channel.port2.onmessage = function(){ //macro task
    console.log('H')
    root.innerHTML = 'hello channel'//render发生在下一次loop，如果有animation同时存在的话animation的内容会生效
  }
  requestAnimationFrame(() => {//macro task，在下一次loop最前面执行
    console.log('D')
    root.innerHTML = 'hello animation'//执行后会接着layout => update layout tree => paint => composite layers
  })
  requestIdleCallback(() => {//idle是在新的task中执行的，说明它也是个macro task
    console.log('E')
    root.innerHTML = 'hello idle'//实际render发生在下一次loop，即执行后并没有立刻render
  })
  Promise.resolve().then(() => {
    console.log('G')
    root.innerHTML = 'hello promise'  //render发生在下一次loop，会被animation的render覆盖
  })
  channel.port1.postMessage('channel')
  root.innerHTML = 'hello test'
}

test();