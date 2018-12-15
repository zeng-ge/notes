import Vue from 'vue'
import Entry from './containers/entry'
new Vue({
  render: createElment => createElment(Entry)
}).$mount(document.getElementById('app'))
