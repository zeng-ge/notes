<template>
  <div>
    <div>
      <button @click="changeType('list')">list</button>
      <button @click="changeType('detail')">detial</button>
    </div>
    <div>
      <div>
        component的实现原理很简单，就是在编译时直接变成了：
        _c(currentComponent, {tag: 'component'})
        很明显，这是直接用实路的list-component或detail-component来render
      </div>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

Vue.component('list-component', {
  template: '<div>list</div>'
})
Vue.component('detail-component', {
  template: '<div>detail</div>'
})

export default {
  data: function(){
    return {
      type: 'list'
    }
  },
  methods: {
    changeType: function(type){
      this.type = type
    }
  },
  computed: {
    currentComponent: function(){
      return this.type === 'list' ? 'list-component' : 'detail-component'
    }
  }
}
</script>

