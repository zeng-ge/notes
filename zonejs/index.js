/**
 * fork会创建一个新的zone
 */
const syncZone = Zone.current.fork({
  name: 'sync',
  onInvoke: function(parentZoneDelegate, currentZone, targetZone,
    callback, applyThis, applyArgs, source){
      console.log(Zone.current.name, 'before onInvoke')
      parentZoneDelegate.invoke(
        targetZone, callback, applyThis, applyArgs, source);
      console.log(Zone.current.name, 'after onInvoke')
    }
})

/**
 * zone.run的内容在运行之前都会生成一个新的_currentZoneFrame,如下
 *  _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
 * 它里面包含一个指向上一个_currentZoneFrame的引用
 * 当run里面的内容执行完成后，会用_currentZoneFrame = _currentZoneFrame.parent来恢复
 */
syncZone.run(function(){
  console.log(Zone.current.name, 'start')
  Zone.root.run(function(){
    console.log(Zone.current.name)
  })
  console.log(Zone.current.name, 'end')
})

console.log(Zone.current.name)
