<script>
export default {
  bind: function(el, binding, vnode, oldVnode) {
    console.log(arguments)
    console.log('bind')//指令绑定时调用
  },
  inserted: function(el) {
    console.log('inserted')//元素插入父节点时调用
  },
  update: function(el) {
    console.log('update')//VNode更新前调用
  },
  componentUpdated: function(el) {
    console.log('componentUpdated')//VNode更新后调用
  },
  unbind: function(el) {
    console.log('unbind')//解绑时调用
  },
}
</script>
